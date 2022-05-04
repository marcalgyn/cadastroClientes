const express = require("express");
const router = express.Router();
const connMySql = require("../config/connMySql");
const { eAdmin } = require("../helpers/eAdmin");

router.get("/", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let idEmpresa = req.params.id;
    let sqlConta = "SELECT * FROM conta_empresa ";
    let sqlEmpresa = "SELECT * FROM empresa ";
    connMySql.query(sqlConta, (err, conta) => {
        connMySql.query(sqlEmpresa, (err, empresa) => {
            if (conta !== undefined) {
                conta = Object.values(conta)[0];
            }
            cliente = Object.values(empresa)[0];
            res.render("contaEmpresa/conta", {
                layout: "adm.handlebars",
                usuario,
                empresa,
                conta
            });
        });
    });
});

router.post("/save-conta", eAdmin, (req, res) => {
    let sql, data, msg;
    let idConta = req.body.idConta;
    let idEmpresa = req.body.idEmpresa;

    let dataInsert = {
        nomeBanco: req.body.nomeBanco,
        numeroBanco: req.body.numeroBanco,
        agencia: req.body.agencia,
        operacao: req.body.operacao,
        numeroConta: req.body.numeroConta,
        nome: req.body.nome,
        cpf: req.body.cpf,
        idEmpresa: idEmpresa,
        saldo: 0
    };

    let dataUpdate = [
        req.body.nomeBanco,
        req.body.numeroBanco,
        req.body.agencia,
        req.body.operacao,
        req.body.numeroConta,
        req.body.nome,
        req.body.cpf,
        req.body.idEmpresa,
        req.body.idConta
    ];

    let sqlInsert = "INSERT INTO conta_empresa SET ?";
    let sqlUpdate =
        "UPDATE conta_empresa SET nomeBanco=?, numeroBanco=?, agencia=?, " +
        "operacao=?, numeroConta=?, nome=?, cpf=?, idEmpresa=? WHERE idConta=?";



    if (idConta === "") {
        console.log("Acessou Insert")
        sql = sqlInsert;
        data = dataInsert;
        msg = "Conta Corrente Cadastrada com Sucesso!";
    } else {
        console.log("Acessou update")
        sql = sqlUpdate;
        data = dataUpdate;
        msg = "Conta Corrente Atualizada com Sucesso!";
    }

    console.log("SQL " + sql)
    console.log("Data: " + data)

    let query = connMySql.query(sql, data, (err, results) => {
        if (err) {
            throw err;
        }
        req.flash("success_msg", msg);
        res.redirect("/contaEmpresa/list-contas");
    });
});

router.get("/list-contas", eAdmin, (req, res) => {

    let usuario = res.locals.user;
    let sql = "";

    sql = "SELECT * FROM conta_empresa ORDER BY nome";

    connMySql.query(sql, (err, conta) => {
        res.render("contaEmpresa/list-contas", {
            layout: "adm.handlebars",
            usuario,
            conta
        });
    });
});

router.get("/edit-conta/:id", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let id = req.params.id;





    let sqlConta = "SELECT * FROM conta_empresa WHERE idConta = " + id;

    connMySql.query(sqlConta, (err, conta) => {
        conta = Object.values(conta)[0];
        let sqlEmpresa = "SELECT * FROM empresa where idEmpresa = " + conta.idEmpresa;
        console.log(conta.idEmpresa);
        connMySql.query(sqlEmpresa, (err, empresa) => {
            res.render("contaEmpresa/conta", {
                layout: "adm.handlebars",
                usuario,
                empresa,
                conta
            });
        });
    });
});


module.exports = router;
