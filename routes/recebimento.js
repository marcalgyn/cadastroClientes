//Carregando os módulo
const express = require('express');
const router = express.Router();
const connMySql = require("../config/connMySql");
const { eAdmin } = require("../helpers/eAdmin");

router.get('/', eAdmin, (req, res) => {
    let usuario = res.locals.user;

    let sqlCliente = "SELECT * FROM cliente where (ativo = 'S') ORDER BY nome";

    connMySql.query(sqlCliente, (err, cliente) => {

        res.render("recebimento/recebimento", {
            layout: "adm.handlebars",
            usuario,
            cliente
        });

    });
})

router.post("/save-recebimento", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let sql, data, msg;
    let idCliente = req.body.idCliente;
    let idRecebimento = req.body.idRecebimento;

    let dataInsert = {
        idCliente: idCliente,
        dataLancamento: req.body.dataLancamento,
        dataInicio: req.body.dataInicio,
        dataFim: req.body.dataFim,
        valorUs: req.body.valorUs,
        cambio: req.body.cambio,
        valorRs: req.body.valorRs,
        valorPago: 0.00,
        dataPagamento: req.body.dataPagamento
    };

    let dataUpdate = [
        req.body.idCliente,
        req.body.dataLancamento,
        req.body.dataInicio,
        req.body.dataFim,
        req.body.valorUs,
        req.body.cambio,
        req.body.valorRs,
        req.body.valorPago,
        req.body.dataPagamento,
        idRecebimento
    ];

    let sqlInsert = "INSERT INTO recebimento SET ?";
    let sqlUpdate =
        "UPDATE recebimento SET idCliente=?, dataLancamento, dataInicio=?, dataFim=?, " +
        "valorUs=?, cambio=?, valorRs=?, valorPago=?, dataPagamento=? WHERE idRecebimento = ? ";

    if (idRecebimento === "") {
        sql = sqlInsert;
        data = dataInsert;
        console.log("sql " + sql);
        msg = "Recebimento Cadastrado com Sucesso!";
    } else {
        sql = sqlUpdate;
        data = dataUpdate;
        msg = "Recebimento Atualizado com Sucesso!";
    }

    let query = connMySql.query(sql, data, (err, results) => {
        if (err) {
            throw err;
        }
        req.flash("success_msg", msg);

        if (usuario.usuario) {
            res.redirect("/recebimento")
        }
    });
});

router.get("/list-pagamento", eAdmin, (req, res) =>{
    let usuario = res.locals.user;
    let idCliente = usuario.idCliente;
    let sqlPagamento;
    
    console.log("IdCliente " + idCliente);

    sqlPagamento = "SELECT cl.nome, re.* FROM recebimento as re inner join cliente as cl on re.idCliente = cl.idCliente " +
    " where (cl.idCliente = " + idCliente +") ";

    connMySql.query(sqlPagamento, (erro, listagem) => {
        res.render("recebimento/baixapagamento", {
            layout: "adm.handlebars",
            usuario,
            listagem
        });
    });




})

router.get("/list-recebimento", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let id = req.params.id;
        sqlRecebimento = "SELECT cl.nome, re.* FROM recebimento as re inner join cliente as cl on re.idCliente = cl.idCliente where (re.valorPago is null or re.valorPago < re.valorRs) ";

    connMySql.query(sqlRecebimento, (erro, listagem) => {
        res.render("recebimento/baixarecebimento", {
            layout: "adm.handlebars",
            usuario,
            listagem
        });
    });

})


router.post("/baixa-recebimento", (req, res) => {
    let usuario = res.locals.user;
    let errors = []
    let datalancamento = req.body.datalancamento_modal;
    let novadata = datalancamento.split("/");
    datalancamento = new Date(novadata[2]+'-'+ novadata[1]+ '-' +novadata[0]);
    let valorRecebido =  req.body.valorrs_modal;

    valorRecebido = parseFloat(req.body.valorPago_modal) - parseFloat(valorRecebido);

    let sqlUpdate = "update recebimento set valorRs=?, valorPago =?, dataPagamento=? where idRecebimento =?";
    
    let dataUpdate = [
        valorRecebido,
        req.body.valorPago_modal,
        req.body.dataPagamento_modal,
        req.body.id_modal
    ]
    
     if (!req.body.dataPagamento_modal || typeof req.body.dataPagamento_modal == undefined || req.body.dataPagamento_modal == null) {
        errors.push({ error: "Necessário preencher a data de Recebimento!" })
    }

    if (req.body.dataPagamento_modal < datalancamento) {
        errors.push({ error: "Data de Pagamento não pode ser menor que a data de Lançamento" })
    }
   
    
    if (req.body.valorPago_modal < req.body.valorrs_modal) {
        errors.push({ error: "Valor do Pagamento menor que valor de recebimento!!" })
    }

     
    if (errors.length > 0) {
        //res.render("recebimento/baixarecebimento", { layout: "adm.handlebars", errors, usuario })
        errors = Object.values(errors)[0]

        req.flash("error_msg", errors.error)
        res.redirect("/recebimento/list-recebimento")
    }else {
        connMySql.query(sqlUpdate, dataUpdate, (erro, resultado) => {
            let usuario = res.locals.user;
            if (erro) {
                req.flash("error_msg", "Erro na Baixa do Recebimento: " + erro)
                console.log("erro" + erro);
            } else {
                req.flash("success_msg", "Alterado com sucesso");
                res.redirect("/recebimento/list-recebimento")
                console.log("Sucesso");
            }
            
        })
    }
})

module.exports = router
