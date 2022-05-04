const express = require("express");
const router = express.Router();
const connMySql = require("../config/connMySql");
const { eAdmin } = require("../helpers/eAdmin");

router.get("/:id", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let idCliente = req.params.id;
    let sqlCorretora =
        "SELECT * FROM conta_corretora WHERE idCliente = " + idCliente;
    let sqlCliente = "SELECT * FROM cliente WHERE idCliente = " + idCliente;
    connMySql.query(sqlCorretora, (err, corretora) => {
        connMySql.query(sqlCliente, (err, cliente) => {
            if (corretora !== undefined) {
                corretora = Object.values(corretora)[0];
            }
            cliente = Object.values(cliente)[0];
            res.render("corretora/corretora", {
                layout: "adm.handlebars",
                usuario,
                cliente,
                corretora
            });
        });
    });
});

router.post("/save-corretora", eAdmin, (req, res) => {
    let sql, data, msg;
    let idCorretora = req.body.idCorretora;

    let dataInsert = {
        nome: req.body.nome,
        agencia: req.body.agencia,
        numero: req.body.numero,
        usuario: req.body.usuario,
        login: req.body.login,
        senha: req.body.senha,
        idCliente: req.body.idCliente,
        loginmt4: req.body.loginmt4,
        senhamt4: req.body.loginmt4,
        servidor: req.body.servidor,
        servidorSinal: req.body.servidorSinal,
        usuarioSinal: req.body.usuarioSinal,
        senhaSinal: req.body.senhaSinal

    };

    let dataUpdate = [
        req.body.nome,
        req.body.agencia,
        req.body.numero,
        req.body.usuario,
        req.body.login,
        req.body.senha,
        req.body.idCliente,
        req.body.loginmt4,
        req.body.senhamt4,
        req.body.servidor,
        req.body.servidorSinal,
        req.body.usuarioSinal,
        req.body.senhaSinal,
        req.body.idCorretora

    ];

    let sqlInsert = "INSERT INTO conta_corretora SET ?";
    let sqlUpdate =
        "UPDATE conta_corretora SET nome=?, agencia=?, numero=?, " +
        "usuario=?, login=?, senha=?, idCliente=?, loginmt4=?, senhamt4=?, servidor=?, servidorSinal=?, usuarioSinal=?, senhaSinal=? WHERE idCorretora=?";

    if (idCorretora === "") {
        sql = sqlInsert;
        data = dataInsert;
        msg = "Corretora Cadastrada com Sucesso!";
    } else {
        sql = sqlUpdate;
        data = dataUpdate;
        msg = "Corretora Atualizada com Sucesso!";
    }
    console.log(sql);
    console.log(data);

    let query = connMySql.query(sql, data, (err, results) => {
        if (err) {
            throw err;
        }
        req.flash("success_msg", msg);
        res.redirect("/cliente/list-clientes");
    });
});

module.exports = router;
