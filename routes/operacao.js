/* Lança Debitos e Creditos do Cliente */
//Carregando os módulo
const express = require('express');
const router = express.Router();
const connMySql = require("../config/connMySql");
const { eAdmin } = require("../helpers/eAdmin");


router.get('/', eAdmin, (req, res) => {
    let usuario = res.locals.user;

    let sqlCliente = "select cl.idCliente, cl.nome, co.idCliente as idCliCor, co.nome as corretora, " +
        " co.numero from cliente as cl inner join conta_corretora as co on  cl.idCliente = co.idCliente where (cl.ativo = 'S') ORDER BY cl.nome";
    let sqlContaEmpresa = "SELECT * FROM conta_empresa ORDER BY nome";

    connMySql.query(sqlCliente, (err, cliente) => {

        res.render("operacao/operacao", {
            layout: "adm.handlebars",
            usuario,
            cliente
        });

    });
})


router.post("/save-operacao", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let sql, data, msg;
    let idCliente = req.body.idCliente;
    let idOperacao = req.body.idOperacao;

    let dataInsert = {
        idCliente: idCliente,
        tipoOperacao: req.body.tipoOperacao,
        dataOperacao: req.body.dataOperacao,
        valor: req.body.valor,
        idConta: 0
    };

    let dataUpdate = [
        req.body.idCliente,
        req.body.tipoOperacao,
        req.body.dataOperacao,
        req.body.valor,
        0,
        idOperacao
    ];

    let sqlInsert = "INSERT INTO operacao SET ?";
    let sqlUpdate =
        "UPDATE operacao SET idCliente=?, tipoOperacao=?, dataOperacao=?, " +
        "valor=?, idConta=? WHERE idOperacao =? ";

    if (idOperacao === "") {
        sql = sqlInsert;
        data = dataInsert;
        msg = "Operação Cadastrada com Sucesso!";
    } else {
        sql = sqlUpdate;
        data = dataUpdate;
        msg = "Operação Atualizada com Sucesso!";
    }

    let query = connMySql.query(sql, data, (err, results) => {
        if (err) {
            throw err;
        }
        req.flash("success_msg", msg);
        if (usuario.usuario) {
            res.redirect("/operacao")
        } else {
            res.redirect("/operacao")
        }

    });

});


router.get("/lista-operacao", eAdmin, (req, res) => {
    let usuario = res.locals.user;

    const { page = 1 } = req.query
    var sql = 'SELECT op.idOperacao, op.idCliente, cl.nome, op.tipoOperacao, op.dataOperacao, op.valor ' +
    'FROM operacao as op inner join cliente as cl on op.idCliente = cl.idCliente order by idOperacao desc';
    
    
    connMySql.query(sql, (erro, operacao) => {
        res.render("operacao/lista-operacao", { layout: "adm.handlebars", operacao, usuario })
    })
})



router.get("/edit-operacao/:id", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let sql = "select * from operacao where idOperacao = " + req.params.id;
    let sqlCliente = "Select * from cliente where idCliente = " + req.body.idCliente; 
    
    console.log("id " + req.params.id)
    console.log("idCliente " + req.body.idCliente)

    connMySql.query(sql, (erro, operacao) => {
        connMySql.query(sqlCliente, (erro, cliente) =>{
            res.render("operacao/operacao", { layout: 'adm.handlebars', usuario, operacao, cliente })
        } )
    })

})

router.get("/del-operacao/:id", eAdmin, (req, res) =>{
    let usuario = res.locals.user;
    let id = req.params.id;
    let sql = "delete from operacao where idOperacao = " + id;

    connMySql.query(sql, (erro, operacao) =>{
        if (erro) {
            req.flash("error_msg", "Não foi possivél excluir cadastro." + erro)
            res.redirect("/operacao/lista-operacao") 
        } else {
            console.log(sql);
            req.flash("success_msg", "Exclusão realizada com sucesso.")
            res.redirect("/operacao")
        }

    })



})



module.exports = router