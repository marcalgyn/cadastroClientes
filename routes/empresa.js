const express = require("express");
const router = express.Router();
const connMySql = require("../config/connMySql");
const { eAdmin } = require("../helpers/eAdmin");

router.get("/", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    res.render("empresa/cad-empresa", {
        layout: "adm.handlebars",
        usuario
    });
});

router.post("/save-empresa", eAdmin, (req, res) => {
    let sql, data, msg;
    let idEmpresa = req.body.idEmpresa;

    let dataInsert = {
        razaoSocial: req.body.razaoSocial,
        fantasia: req.body.fantasia,
        cnpj: req.body.cnpj,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        complemento: req.body.complemento,
        cidade: req.body.cidade,
        estado: req.body.estado,
        cep: req.body.cep,
        email: req.body.email,
        site: req.body.site,
        telefone: req.body.telefone
    };

    let dataUpdate = [
        req.body.razaoSocial,
        req.body.fantasia,
        req.body.cnpj,
        req.body.endereco,
        req.body.bairro,
        req.body.complemento,
        req.body.cidade,
        req.body.estado,
        req.body.cep,
        req.body.email,
        req.body.site,
        req.body.telefone,
        req.body.idEmpresa
    ];

    let sqlInsert = "INSERT INTO empresa SET ?";
    let sqlUpdate =
        "UPDATE empresa SET razaoSocial=?, fantasia=?, cnpj=?, " +
        "endereco=?, bairro=?, complemento=?, cidade=?, estado=?, " +
        "cep=?, email=?, site=?, telefone=? WHERE idEmpresa=?";

    if (idEmpresa === "") {
        sql = sqlInsert;
        data = dataInsert;
        msg = "Empresa Cadastrada com Sucesso!";
    } else {
        sql = sqlUpdate;
        data = dataUpdate;
        msg = "Empresa Atualizada com Sucesso!";
    }

    let query = connMySql.query(sql, data, (err, results) => {
        if (err) {
            throw err;
        }
        req.flash("success_msg", msg);
        res.redirect("/empresa");
    });
});

router.get("/list-empresas", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let sql = "SELECT * FROM empresa ORDER BY razaoSocial";
    connMySql.query(sql, (err, empresas) => {
        res.render("empresa/list-empresas", {
            layout: "adm.handlebars",
            usuario,
            empresas
        });
    });
});

router.get("/edit-empresa/:id", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let id = req.params.id;
    let sql = "SELECT * FROM empresa WHERE idEmpresa = " + id;
    connMySql.query(sql, (err, empresa) => {
        empresa = Object.values(empresa)[0];
        res.render("empresa/cad-empresa", {
            layout: "adm.handlebars",
            usuario,
            empresa
        });
    });
});

module.exports = router;
