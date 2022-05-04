const express = require("express");
const router = express.Router();
const connMySql = require("../config/connMySql");
const { eAdmin } = require("../helpers/eAdmin");

router.get("/:id", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let idCliente = req.params.id;
    let sqlConta = "SELECT * FROM conta_cliente WHERE idCliente = " + idCliente;
    let sqlCliente = "SELECT * FROM cliente WHERE idCliente = " + idCliente;
    connMySql.query(sqlConta, (err, conta) => {
        connMySql.query(sqlCliente, (err, cliente) => {
            if (conta !== undefined) {
                conta = Object.values(conta)[0];
            }
            cliente = Object.values(cliente)[0];
            res.render("conta/conta", {
                layout: "adm.handlebars",
                usuario,
                cliente,
                conta
            });
        });
    });
});

router.post("/save-conta", eAdmin, (req, res) => {
    let sql, data, msg;
    let idConta = req.body.idConta;

    let dataInsert = {
        nomeBanco: req.body.nomeBanco,
        agenciaBanco: req.body.agenciaBanco,
        operacao: req.body.operacao,
        numeroConta: req.body.numeroConta,
        idCliente: req.body.idCliente
    };

    let dataUpdate = [
        req.body.nomeBanco,
        req.body.agenciaBanco,
        req.body.operacao,
        req.body.numeroConta,
        req.body.idCliente,
        req.body.idConta
    ];

    let sqlInsert = "INSERT INTO conta_cliente SET ?";
    let sqlUpdate =
        "UPDATE conta_cliente SET nomeBanco=?, agenciaBanco=?, operacao=?, " +
        "numeroConta=?, idCliente=? WHERE idConta=?";

    if (idConta === "") {
        sql = sqlInsert;
        data = dataInsert;
        msg = "Conta Corrente Cadastrada com Sucesso!";
    } else {
        sql = sqlUpdate;
        data = dataUpdate;
        msg = "Conta Corrente Atualizada com Sucesso!";
    }

    let query = connMySql.query(sql, data, (err, results) => {
        if (err) {
            throw err;
        }
        req.flash("success_msg", msg);
        res.redirect("/cliente/list-clientes");
    });
});

module.exports = router;
