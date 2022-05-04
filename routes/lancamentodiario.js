const express = require("express")
const router = express.Router()
const connMySql = require("../config/connMySql")
const { eAdmin } = require("../helpers/eAdmin")
const configuracao = require("./configuracao");
const { atualizaOperacao, calculaComissao } = require("../public/js/calculo");



/* Importar arquivo excel */
let upload = require('express-fileupload');
let importExcel = require('convert-excel-to-json');
let del = require('del');
router.use(upload());



router.get("/sel-cliente", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let selCliente = "SELECT idCliente, nome, cpf, tipoConta, valorInvestido, valorComissao, tipoUsuario FROM cliente where ativo = 'S' order by nome"
    // "WHERE idCliente = " + req.query.idCliente + " order by nome";
    console.log("Rota: /sel-cliente");

    connMySql.query(selCliente, (erro, cliente) => {
        res.render("lancamento/sel-cliente", { layout: "adm.handlebars", usuario, cliente })
    })
})

router.get("/", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let idCliente = req.query.idCliente;
    var sql = "select * from lancamentodiario";

    let sqlConsCliente = "select * from cliente WHERE idCliente = " + idCliente;

    let sqlConsulta = " SELECT cl.nome, lan.* FROM lancamentodiario as lan inner join cliente as cl on lan.idCliente = cl.idCliente " +
        "WHERE lan.idCliente = " + idCliente + " order by lan.idLancamento desc, lan.dataMovimentacao desc, cl.nome LIMIT 3000";

    console.log("Rota: /");

    connMySql.query(sql, (erro, lancamentodiario) => {
        connMySql.query(sqlConsulta, (erro, listagemlancamento) => {
            connMySql.query(sqlConsCliente, (erro, cliente, fields) => {
                cliente = Object.values(cliente)[0];
                res.render("lancamento/lancamentodiario", { layout: "adm.handlebars", lancamentodiario, listagemlancamento, usuario, cliente })
            })
        });

    })

})

router.get("/rel-periodo", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let sql, sqlConsCliente;

    console.log("Rota: /rel-periodo");

    if (usuario.usuario) {
        sql = "select * from lancamentodiario order by dataMovimentacao";
        sqlConsCliente = "select * from cliente where not (cpf is null) and (ativo = 'S')  order by nome";
    } else {
        console.log("Usuario " + usuario.idCliente);
        sql = "select * from lancamentodiario where idCliente = " + usuario.idCliente;
        sqlConsCliente = "select * from cliente where idCliente = " + usuario.idCliente;
    }

    connMySql.query(sql, (erro, lancamentodiario) => {
        connMySql.query(sqlConsCliente, (erro, cliente, fields) => {
            res.render("lancamento/rel-periodo", { layout: "adm.handlebars", usuario, lancamentodiario, cliente })
        })
    })
})

router.get("/rel-recebimento", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let sql;
    console.log("Rota: " + "/rel-recebimento");

    if (usuario.usuario) {
        sql = "Select * from recebimento order by dataLancamento desc ";
        connMySql.query(sql, (erro, consulta) => {
            res.render("lancamento/rel-recebimento", { layout: "adm.handlebars", usuario, consulta })
        })
    }

})

router.get("/sel-movimentacao", (req, res) => {
    let usuario = res.locals.user;
    let sqlConsCliente;

    console.log("Rota: /sel-movimentacao");

    if (usuario.usuario) {
        sqlConsCliente = "select * from cliente where (ativo = 'S') order by nome";
    } else {
        sqlConsCliente = "select * from cliente WHERE idCliente = " + usuario.idCliente;
    }

    connMySql.query(sqlConsCliente, (erro, cliente) => {
        res.render('lancamento/movimentacao', { layout: "adm.handlebars", usuario, cliente });
    });

})

router.get("/movimentacao", (req, res) => {
    let usuario = res.locals.user;

    let dtInicio = req.query.dataInicio;
    let dtFim = req.query.dataFim;
    let idCliente = req.query.idCliente;
    let sqlConsCliente, sqlLancamento, sqlTotal;

    console.log("Rota: /movimentacao");

    if (usuario.usuario) {
        sqlConsCliente = "select * from cliente where (ativo= 'S') order by nome";
    } else {
        sqlConsCliente = "select * from cliente WHERE idCliente = " + usuario.idCliente;
    }


    sqlLancamento = "select cl.nome, lan.idCliente, lan.dataMovimentacao, lan.ativo, lan.valorOperado, lan.swap, lan.valorComissao, lan.percentual from " +
        " lancamentodiario as lan inner join cliente as cl on lan.idCliente = cl.idCliente  " +
        " where (lan.idCliente = " + idCliente + ")  and (dataMovimentacao >= '" + dtInicio + "' and dataMovimentacao <= '" + dtFim + "') ORDER BY lan.idLancamento";

    sqlTotal = "select sum(lan.valorOperado) as operacao, sum(swap) as swap, sum(lan.valorComissao) as comissao from " +
        " lancamentodiario as lan inner join cliente as cl on lan.idCliente = cl.idCliente  " +
        " where (lan.idCliente = " + idCliente + ")  and (dataMovimentacao >= '" + dtInicio + "' and dataMovimentacao <= '" + dtFim + "') ";


    console.log("sql: " + sqlTotal);

    connMySql.query(sqlLancamento, (erro, listagemlancamento) => {
        connMySql.query(sqlConsCliente, (erro, cliente) => {
            connMySql.query(sqlTotal, (erro, total, fields) => {
                if (erro) throw erro;

                res.render("lancamento/movimentacao", { layout: "adm.handlebars", usuario, listagemlancamento, cliente, total });
            })

        })
    });

})

router.post("/add-lancamentodiario", (req, res) => {
    let usuario = res.locals.user;
    let sql, data, msg;
    let valorComissao, percentual;
    let idCliente = req.body.idCliente;
    let idLancamento = req.body.idLancamento;

    let mesSelecionado = "'" + req.body.dataMovimentacao + "'";
    mesSelecionado = mesSelecionado.substring(6, 8);

    let sqlInsert = "INSERT INTO lancamentodiario SET ?";

    let sqlConsCliente = "select * from cliente WHERE idCliente = " + idCliente;
    let sqlConsulta = " SELECT cl.nome, lan.* FROM lancamentodiario as lan inner join cliente as cl on lan.idCliente = cl.idCliente " +
        "where lan.idCliente = " + idCliente + "  order by lan.idLancamento desc, lan.dataMovimentacao desc, cl.nome LIMIT 3000";

    console.log("Cliente pego " + req.body.idCliente);
    console.log("Rota: /add-lancamentodiario");
    console.log(req.body);
    /* Valida de comissao for valor negativo 
        if (req.body.valorComissao <= 0) {
            valorComissao = 0.00;
            percentual = 0.00;
        } else {
            valorComissao = req.body.valorComissao;
            percentual = req.body.percentualComissao;
        }
        */
    /* Insere Valor da comissão independente do valor */
    valorComissao = req.body.valorComissao;
    percentual = req.body.percentualComissao;

    let dataInsert = {
        dataMovimentacao: req.body.dataMovimentacao,
        valorOperado: req.body.valorOperado,
        percentual: percentual,
        valorComissao: valorComissao,
        idCliente: req.body.idCliente,
        ativo: req.body.ativo,
        swap: req.body.swap
    }
    let dataUpdate = [
        req.body.dataMovimentacao,
        req.body.ativo,
        req.body.valorOperado,
        percentual,
        valorComissao,
        req.body.swap,
        req.body.idLancamento
    ]


    let sqlUpdate =
        "UPDATE lancamentodiario SET dataMovimentacao =?, ativo=?, valorOperado=?, " +
        "percentual =?, valorComissao=?, swap=? WHERE idLancamento =? ";

    if (idLancamento === "") {
        sql = sqlInsert;
        data = dataInsert;
        msg = "Lançamento Cadastrado com sucesso!";
    } else {
        sql = sqlUpdate;
        data = dataUpdate;
        msg = "Lançamento atualizado com Sucesso!";
    }

    connMySql.query(sql, data, (erro, resultado) => {
        let usuario = res.locals.user;
        if (idLancamento === "") {
            if (erro) {
                req.flash("error_msg", "Erro no Lancamento Diario: " + erro)

                req.flash("success_msg", "Cadastro Realizado com sucesso...")
                connMySql.query(sqlConsulta, (erro, listagemlancamento) => {
                    connMySql.query(sqlConsCliente, (erro, cliente) => {
                        res.render("lancamento/lancamentodiario", { layout: "adm.handlebars", listagemlancamento, usuario, cliente })
                    })
                });

            } else {

                req.flash("success_msg", "Cadastro Realizado com sucesso...")
                connMySql.query(sqlConsulta, (erro, listagemlancamento) => {
                    connMySql.query(sqlConsCliente, (erro, cliente) => {
                        cliente = Object.values(cliente)[0];
                        res.render("lancamento/lancamentodiario", { layout: "adm.handlebars", listagemlancamento, usuario, cliente })
                        let retorno = atualizaOperacao(idCliente, mesSelecionado);
                    })
                });
            }
        } else {
            if (erro) {
                throw erro;
            }
            req.flash("success_msg", msg);
            connMySql.query(sqlConsulta, (erro, listagemlancamento) => {
                connMySql.query(sqlConsCliente, (erro, cliente) => {
                    res.render("/lancamento/lancamentodiario", { layout: "adm.handlebars", listagemlancamento, usuario, cliente })
                    let retorno = atualizaOperacao(idCliente, mesSelecionado);
                })
            });
        }
    })
})

router.post("/update-lancamentodiario", (req, res) => {
    let usuario = res.locals.user;
    let formulario;
    let valorComissao, percentual;
    let arrnovadata = req.body.datamovimentacao_modal;
    let novadata1 = arrnovadata.split("/");
    let novadata = novadata1[2] + '-' + novadata1[1] + '-' + novadata1[0];
    let idCliente = req.body.idCliente_modal;


    let sqlConsCliente = "select * from cliente WHERE idCliente = " + idCliente;

    let sqlConsulta = " SELECT cl.nome, lan.* FROM lancamentodiario as lan inner join cliente as cl on lan.idCliente = cl.idCliente " +
        " WHERE lan.idCliente = " + idCliente + " order by lan.idLancamento desc LIMIT 3000";

    /* Funcao valida de comissao for negativa nao
    if (req.body.valorcomissao_modal <= 0) {
        valorComissao = 0.00;
        percentual = 0.00;
    } else {
        valorComissao = req.body.valorcomissao_modal;
        percentual = req.body.percentual_modal;
    }
    */

    /* Funcao insere comissao independente do valor */
    valorComissao = req.body.valorcomissao_modal;
    percentual = req.body.percentual_modal;

    let dataUpdate = [
        novadata,
        req.body.ativo_modal,
        req.body.valoroperado_modal,
        percentual,
        valorComissao,
        req.body.swap_modal,
        req.body.id_modal
    ]

    let sqlUpdate =
        "UPDATE lancamentodiario SET dataMovimentacao =?, ativo=?, valorOperado=?, " +
        "percentual =?, valorComissao=?, swap=? WHERE idLancamento =? ";


    connMySql.query(sqlUpdate, dataUpdate, (erro, resultado) => {
        let usuario = res.locals.user;
        if (erro) {
            req.flash("error_msg", "Erro no Lançamento Diario: " + erro)
            console.log("erro" + erro);
        }

        connMySql.query(sqlConsulta, (erro, listagemlancamento) => {
            if (erro) {
                console.log("Erro ao tentar realizar consulta " + erro);
                throw erro;
            } else {

                req.flash("success_msg", "Alterado com sucesso");
                connMySql.query(sqlConsCliente, (erro, cliente) => {
                    if (erro) {
                        req.flash("error_msg", "Erro no Lançamento Diario: " + erro)
                        console.log("erro: " + erro);
                    }
                    cliente = Object.values(cliente)[0];
                    res.render("lancamento/lancamentodiario", { layout: "adm.handlebars", usuario, listagemlancamento, cliente })
                    console.log("Alterado com Sucesso.");

                    let retorno = atualizaOperacao(idCliente, novadata1[1]);
                    console.log(retorno);

                })
            }
        })
    })

})

router.get("/edit-lancamento/:id", (req, res) => {
    let usuario = res.locals.user;
    let id = req.params.id;
    let sqlLancamento = "SELECT cl.nome, la.* FROM lancamentodiario as la inner join cliente as cl on la.idCliente = cl.idCliente where la.idLancamento = " + id;

    connMySql.query(sqlLancamento, (erro, lancamentodiario) => {

        lancamentodiario = Object.values(lancamentodiario)[0];
        if (lancamentodiario.dataMovimentacao !== null) {
            lancamentodiario.dataMovimentacao = formatDate(lancamentodiario.dataMovimentacao);
        }

        res.render("lancamento/lancamentodiario", {
            layout: "adm.handlebars",
            usuario,
            lancamentodiario
        });
    });

})

const formatDate = data => {
    return data.toISOString().substr(0, 10);
};



router.get("/sel-cliente-arquivo", eAdmin, (req, res) => {
    console.log("Rota: /sel-cliente-arquivo");
    let usuario = res.locals.user;
    let selCliente = "SELECT idCliente, nome, cpf, tipoConta, valorInvestido, valorComissao, tipoUsuario FROM cliente where ativo = 'S' order by nome"
    // "WHERE idCliente = " + req.query.idCliente + " order by nome";


    connMySql.query(selCliente, (erro, cliente) => {
        res.render("lancamento/sel-cliente-arquivo", { layout: "adm.handlebars", usuario, cliente })
    })
})


router.get("/envia-arquivo", (req, res) => {
    console.log("Rota: lancamento/envia-arquivo");
    let usuario = res.locals.user;
    let idCliente = req.query.idCliente;


    let sqlConsCliente = "select * from cliente WHERE idCliente = " + idCliente;

    connMySql.query(sqlConsCliente, (erro, cliente, fields) => {
        cliente = Object.values(cliente)[0];
        res.render("lancamento/envia-arquivo", { layout: "adm.handlebars", usuario, cliente })
    });

});

router.post("/send-file", (req, res) => {

    let usuario = res.locals.user;
    let file = req.files.filename;
    let filename = file.name;
    let sqlConsTicket = "select ticket from lancamentodiario where (ticket = ?) and (idCliente = ?)";
    let sqlInsert = "INSERT INTO lancamentodiario SET ?";

    let ativo;

    let valorOperado;
    let percentual = req.body.percentualComissao;
    let idCliente = req.body.idCliente;
    let valorComissao;
    let swap;
    let erro = false;
    let mesSelecionado;
    let novadata;



    file.mv("public/excel/" + filename, (err) => {

        if (err) {
            req.flash("error_msg", "Falha no upload do arquivo! " + erro);
            res.redirect("lacamento/sel-cliente-arquivo");
        } else {

            let result = importExcel({
                sourceFile: 'public/excel/' + filename,
                header: { rows: 1 },
                columnToKey: {
                    A: 'Ticket', B: 'Open Time', C: 'Type', D: 'Size', E: 'Item', F: 'Price', G: 'S/L', H: 'T/P', I: 'Close Time', J: 'Price', K: 'Commission', L: 'Taxes',
                    M: 'Swap', N: 'Profit'
                },
                sheets: ['Plan1']
            });
            for (var i = 0; result.Plan1.length > i; i++) {
                try {
                    novadata = result.Plan1[i]['Close Time'].substring(10, -2);
                    ativo = result.Plan1[i].Item.toUpperCase();
                    mesSelecionado = novadata.substring(5, 7);
                    novadata = novadata.replace(".", "-");
                    novadata = novadata.replace(".", "-");
                    valorOperado = parseFloat(result.Plan1[i].Profit);
                    swap = parseFloat(result.Plan1[i].Swap);
                    valorComissao = calculaComissao(valorOperado, swap, percentual);


                } catch (error) {
                    // ER_BAD_FIELD_ERROR
                    erro = true;
                    console.log("Erro de campo Data " + error + "Registro " + i);
                }
                let ticket = result.Plan1[i].Ticket;

                let sqlInsertData = {
                    dataMovimentacao: novadata,
                    ativo: ativo,
                    valorOperado: valorOperado,
                    percentual: percentual,
                    idCliente: idCliente,
                    valorComissao: parseFloat(valorComissao).toFixed(2),
                    swap: swap,
                    ticket: ticket
                }

                let sqlData = [
                    ticket,
                    idCliente
                ]
                /* Valida se registro possui algum erro, se possuir nao insere */
                if (erro) {
                    erro = false;
                } else {
                    connMySql.query(sqlConsTicket, sqlData, (erro, registro) => {
                        if (erro) {
                            console.log("Erro ao tentar realizar consulta " + erro);
                            throw erro;
                        } else {
                            console.log("Quantidade de registro " + Object.values(registro)[0]);
                            if (registro.length == 1) {
                                console.log("Registro Já lançado Ticket: " + ticket);
                            } else {
                                connMySql.query(sqlInsert, sqlInsertData, (erro, resultado) => {
                                    if (erro) {
                                        console.log("Erro ao tentar inserir registro " + erro);
                                    } else {
                                        const msg = atualizaOperacao(idCliente, mesSelecionado);
                                        console.log("Registro Inserido com sucesso => " + msg);
                                    }
                                });
                            }
                        }
                    });

                };
            }
            //   console.log("Parabens Concluido com sucesso!!");
             del(['public/excel/' + filename]).then(paths => { console.log('file ' + filename) });
        }


        let sqlConsCliente = "select * from cliente WHERE idCliente = " + idCliente;

        req.flash("success_msg", "Atualizado com sucesso");
        connMySql.query(sqlConsCliente, (erro, cliente, fields) => {
            cliente = Object.values(cliente)[0];
            res.render("lancamento/envia-arquivo", { layout: "adm.handlebars", usuario, cliente })
        });


        //res.redirect("/lancamento/sel-cliente-arquivo");

    });

})



module.exports = router