const express = require("express");
const router = express.Router();
const pdf = require("html-pdf");
const PDFDocument = require('pdfkit');
const PdfTable = require('voilab-pdf-table');
const fs = require('fs');

const connMySql = require("../config/connMySql");
const { eAdmin } = require("../helpers/eAdmin");
const funcoes = require("../public/js/funcoes");


/*Prepara Documento PDF
,
    size: "A4",
    margins: {
        left: 5,
        right: 5
    }
*/

/* Relaotrio Gera Valores por periodo e por cliente*/
router.get("/rel-periodo", (req, res) => {
    
    console.log(req.body);

    let usuario = res.locals.user;
    let dtInicio = req.query.dataInicio;
    let dtFim = req.query.dataFim;
    let ativo = req.query.ativo;
    let sqlCliente;
    let idCliente;
    let txCambio = parseFloat(req.query.txcambio);
    let totalReceber, totalComissao, recordSet;
    

    if (usuario.tipoUsuario === "A") {
        usuario.usuario = true;
    } else {
        usuario.usuario = false;
    }
    /*
        var obj = {
            init: function () {
                this.minhafuncao;
            },
            minhafuncao: function () {
                console.log("oi");
            }
        }
    */
    let pagina = {
        format: 'Letter', //Letter, A4
        orientation: 'landscape', // portrait or landscape
        margin: '1.0px',
        fontSize: 10,
        border: {
            top: '0.5px',
            left: '5px',
            right: '5px',
            bottom: '5px'
        },

        paginationOffset: 1,
        header: {
            height: '0.5px',
            left: '0px',
            right: '0px',
            margin: '0px',
            border: '2px'

        },
        footer: {
            height: "28mm",
            contents: {
                first: '',
                2: '',
            }
        },
        type: "pdf",
        renderDelay: 1000,
        timeout: 40000,

        directory: '/temp'
    }

    if (usuario.usuario) {
        idCliente = req.query.idCliente;
    } else {
        idCliente = usuario.idCliente;
    }

    sqlCliente = "SELECT * FROM cliente where (ativo = 'S') and (idCliente = " + idCliente + ") ";

    sqlLancamento = "select  cl.nome, lan.dataMovimentacao, lan.ativo, lan.valorOperado, lan.swap, lan.valorComissao, lan.percentual from " +
        " lancamentodiario as lan inner join cliente as cl on lan.idCliente = cl.idCliente  " +
        " where (upper(lan.ativo) like ('%"+ ativo + "')) and (lan.idCliente = " + idCliente + ")  and (dataMovimentacao >= '" + dtInicio + "' and dataMovimentacao <= '" + dtFim + "') ORDER BY lan.idLancamento";

    let sqlTotal = "select sum(lan.valorOperado) as totalOperado, sum(lan.valorComissao) as totalComissao, sum(swap) as totalSwap from " +
        " lancamentodiario as lan inner join cliente as cl on lan.idCliente = cl.idCliente, empresa as emp " +
        " where (upper(lan.ativo) like ('%"+ ativo + "')) and ((lan.idCliente = " + idCliente + ") ) and (dataMovimentacao >= '" + dtInicio + "' and dataMovimentacao <= '" + dtFim + "') ";


    connMySql.query(sqlCliente, (erro, cliente) => {
        connMySql.query(sqlLancamento, (erro, dados) => {
            connMySql.query(sqlTotal, (erro, total) => {

                if (erro) {
                    req.flash("error_msg", "Erro ao tentar Gerar Relatorio." + erro)
                   // res.sendStatus(500).send(erro);
                    //res.redirect("/lancamento/movimentacao")
                    console.log(erro);
                } else {

                    totalComissao = Object.values(total)[0]
                    totalReceber = totalComissao.totalComissao * (txCambio + parseFloat(0.07));
                    totalReceber = parseFloat(totalReceber);

                    recordSet = Object.values(dados)[0];

                    //Verifica antes se tem dados
                    if (typeof recordSet != 'undefined') {
                        //formataMoeda(totalReceber)
                        res.render("relatorio/relperiodo", { usuario, cliente, dados, dtInicio, dtFim, total, txCambio, totalReceber }, (erro, html) => {
                            // pdf.create(html, pagina).toBuffer(function (erro, buffer) {
                            pdf.create(html, pagina).toFile("./public/pdf/" + idCliente + 'relatorio.pdf', function (erro, data, callback) {
                                if (erro) return console.log(erro);
                                // return callback(config.get('AdminBaseURL') + ':' + config.get('server.port') + '/pdf/' + 'temp.pdf');
                                fs.readFile('./public/pdf/' + idCliente + 'relatorio.pdf', function (erro, data) {
                                    if (erro) {
                                        console.log("Erro nao foi possivel abrir o arquivo", erro);
                                        process.exit(1);
                                    }

                                    res.type('application/pdf');
                                    res.send(data);
                                    console.log('Arquivo Gerado com sucesso');
                                    fs.unlinkSync('./public/pdf/' + idCliente + 'relatorio.pdf');
                                    console.log("arquivo Removido");
                                })

                            });

                            /* if (erro) {
                                        console.log("Erro na criação do Buffer: " + err.stack);
                                    }
                                    res.type('application/pdf');
                                    res.send(buffer);
                                    if (erro) {
                                        console.log("Erro ao tentar gerar PDF:" + erro.stack)
                                    } else {
                                        console.log("Relatorio Gerado com Sucesso");
                                        buffer.write;
                                    }
                                });
                                */

                        });
                    } else {
                        req.flash("error_msg", "Nenhum registro encontrado!");
                        res.redirect("/lancamento/rel-periodo")
                    }
                }
            })
        })
    })

})


router.post("/rel-recebimento", (req, res) => {
    console.log("Rota: /rel-recebimento");

    const doc = new PDFDocument({
        autoFirstPage: false,
        //   onPageAdded: true,
        //    bufferPages: true,
        size: "A4",
        layout: "landscape",
        margins: {
            left: 5,
            right: 5
        }
    }),
        table = new PdfTable(doc, {
            bottomMargim: 15,
        });

    dataInicio = req.body.dataInicio;
    dataFim = req.body.dataFim;
    console.log("Segue datas " + dataInicio + " - " + dataFim)



    var sql = "SELECT  cl.nome, re.* FROM recebimento as re inner join cliente as cl on re.idCliente = cl.idCliente  " +
        " WHERE (dataLancamento >= '" + dataInicio + "' and dataLancamento <= '" + dataFim + "')  order by re.dataLancamento";
    const nome = "Relatorio Recebimento";

    connMySql.query(sql, (erro, consulta) => {
        if (erro) {
            throw erro
        }

        console.log("Inicio");
        res.setHeader(
            "Content-disposition",
            'inline="' + nome + ".pdf" + '"');

        res.setHeader("Content-type", "application/pdf");

        doc.addPage();

        doc.image("public/images/logo_relatorio.jpeg", 0, 0, { width: 850, height: 100 })

        doc.fontSize(22).text("Relatório de Recebimento", { align: "center" }, 130);
        doc.fontSize(10).text("Periodo.: " + dataInicio + " à " + dataFim, 5, 150);
        doc.fontSize(10);

        /* TEXTO, POSICAO HORIZONTAL, POSICAO VERTICAL */
        doc.text("Data Lançamento", 05, 200);
        doc.text("Nome Cliente", 100, 200);
        doc.text("__Periodo Fechamento__", 280, 180);
        doc.text("Dt Inicio", 280, 200);
        doc.text("Dt Fim", 340, 200);
        doc.text("Valor U$", 430, 200);
        doc.text("Câmbio", 500, 200);
        doc.text("___________ Valor R$___________", 560, 180);
        doc.text("A Receber", 570, 200);
        doc.text("Pago", 700, 200);
        doc.text("Data Pagamento", 750, 200);
        doc.moveTo(2, 215).lineTo(850, 215).dash(1, { space: 1 }).stroke();
        doc.fontSize(11);

        doc.text('', 5, 220);

        table
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: "dataLancamento",
                align: 'center',
            }))
            .setColumnsDefaults({
                //                headerBorder: 'B',
                align: 'left',
                padding: [0, 2, 5, 5],
            })
            .addColumns([
                {
                    id: 'dataLancamento',
                    //   header: 'Data Lançamento',
                    align: "right",
                    width: 80,
                },
                {
                    id: 'nome',
                    //   header: 'Nome',
                    align: "left",
                    width: 190,
                },

                {
                    id: 'dataInicio',
                    //   header: 'Data Inicio',
                    align: "right",
                    width: 70,
                },
                {
                    id: 'datafim',
                    //  header: 'Data Fim',
                    align: "left",
                    width: 70,
                },
                {
                    id: 'valorUs',
                    //   header: 'Valor U$',
                    align: "right",
                    width: 70,
                },
                {
                    id: 'cambio',
                    //    header: 'Câmbio',
                    align: "right",
                    width: 70,
                },
                {
                    id: 'valorRs',
                    //   header: 'Valor R$',
                    align: "right",
                    width: 70,
                    renderer: function (tb, data) {
                        return data.valorRs;
                    }
                },
                {
                    id: 'valorPago',
                    //   header: 'Valor Pago',
                    align: "right",
                    width: 130,
                },
                {
                    id: 'dataPagamento',
                    //    header: 'Data Pagamento',
                    align: "center",
                    width: 100,
                }

            ])
            .onPageAdded(function (tb) {
                tb.addHeader();
            });


        var i = 0;
        var j = 20;
        for (var row in consulta) {
            table.addBody([
                {
                    dataLancamento: formatadata(consulta[row]['dataLancamento']),
                    nome: consulta[row]['nome'],
                    dataInicio: formatadata(consulta[row]['dataInicio']),
                    datafim: formatadata(consulta[row]['datafim']),
                    valorUs: moeda(consulta[row]['valorUs']),
                    cambio: moeda(consulta[row]['cambio']),
                    valorRs: moeda(consulta[row]['valorRs']),
                    valorPago: moeda(consulta[row]['valorPago']),
                    dataPagamento: formatadata(consulta[row]['dataPagamento'])
                }

            ]).onPageAdded(function (tb) {
                tb.addHeader();
            });

            i++;
            if (i >= j) {
                doc.addPage({
                    size: "A4", layout: "landscape",
                    margins: {
                        top: 20,
                        bottom: 5,
                        left: 5,
                        right: 5
                    }
                })

                console.log("Nova Pagina");
                i = 0;
                j = 30;
            }
        }

        doc.pipe(res);
        doc.end();

    })
})

router.post("/rel-teste", (req, res) => {

    var sql = "Select * from recebimento order by dataLancamento ";
    connMySql.query(sql, (erro, consulta, fields) => {

        table
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'description'
            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'right'
            })
            // add table columns
            .addColumns([
                {
                    id: 'description',
                    header: 'Product',
                    align: 'left'
                },
                {
                    id: 'quantity',
                    header: 'Quantity',
                    width: 50
                },
                {
                    id: 'price',
                    header: 'Price',
                    width: 40
                },
                {
                    id: 'total',
                    header: 'Total',
                    width: 70,
                    renderer: function (tb, data) {
                        return 'CHF ' + data.total;
                    }
                }
            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });

        // if no page already exists in your PDF, do not forget to add one
        doc.addPage();

        // draw content, by passing data to the addBody method
        for (var row in consulta) {

            table.addBody([
                { description: consulta[row]['dataLancamento'], quantity: 1, price: 20.10, total: 20.10 },
                { description: 'Product 2', quantity: 4, price: 4.00, total: 16.00 },
                { description: 'Product 3', quantity: 2, price: 17.85, total: 35.70 }
            ]);
        }
        doc.end();
        doc.pipe(fs.createWriteStream('relatorio1.pdf'))

    })
})


function formatadata(valor) {

    if (valor) {
        if (valor.length <= 10) {

        } else {
            d = new Date(valor);
            dt = d.getDate();
            mn = d.getMonth();
            mn++;
            yy = d.getFullYear();
            return dt + "/" + mn + "/" + yy;

        }
    }
}

function moeda(valor) {
    //Com Cifrão   
    // var valorFormatado = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    //sem R$
    var valorFormatado = valor.toLocaleString('en-us', { minimumFractionDigits: 2 });
    return valorFormatado;
}

module.exports = router;