const express = require("express")
const app = express.Router()
const connMySql = require("../config/connMySql")

const { eAdmin } = require("../helpers/eAdmin")


app.get("/", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    connMySql.query("select * from corretor", (erro, corretor) => {
        res.render("corretor/corretor", { layout: "adm.handlebars", corretor, usuario })
    })



})

app.get("/edit-corretor/:id", eAdmin, (req, res) => {
    let usuario = res.locals.user;

    connMySql.query("select * from corretor where idCorretor = " + req.params.id, (erro, corretor) => {
        corretor = Object.values(corretor)[0];
        res.render("corretor/corretor", {
            layout: 'adm.handlebars',
            corretor, usuario })
    })

})

app.post("/edit-corretor", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    const { page = 1 } = req.query

    var sql = "update corretor set ? where idcorretor = " + req.body.idCorretor;
    console.log(sql)
    connMySql.query(sql, req.body, (erro, atualiza) => {
        connMySql.query("select * from corretor order by nome", (erro, corretor) =>{
            res.render("corretor/lista-corretores", { layout: "adm.handlebars", corretor, usuario })
        })
        

    })
})

app.post("/save-corretor", (req, res) => {
    let usuario = res.locals.user;
    let sql, data, msg;
    let idCorretor = req.body.idCorretor;

    
    let dataInsert = {
        nome: req.body.nome,
        celular: req.body.celular,
        email: req.body.email,
        email: req.body.comissao
    }

    let dataUpdate = [
        req.body.nome,
        req.body.celular,
        req.body.email,
        req.body.comissao
    ]
    let sqlInsert = "insert into corretor set ? ";
    let sqlUpdate = "UPDATE corretor SET nome=?, celular=?, email=?, comissao=?";

    if (idCorretor === "") {
        sql = sqlInsert;
        data = dataInsert;
        msg = "Corretor Cadastrado com Sucesso!";
    } else {
        sql = sqlUpdate;
        data = dataUpdate;
        msg = "Corretor Atualizado com Sucesso!"

    }
    let query = connMySql.query(sql, data, (erro, results) => {
        if (erro) {
            throw erro;
        }
        req.flash("success_msg", msg)
        res.redirect("/corretor/lista-corretores")
        
    })
})


app.get("/lista-corretores", eAdmin, (req, res) => {
    let usuario = res.locals.user;

    const { page = 1 } = req.query
    var sql = "SELECT * FROM corretor";

    connMySql.query(sql, (erro, corretor) => {
        console.log(sql)
        res.render("corretor/lista-corretores", { layout: "adm.handlebars", corretor, usuario })
    })
})

app.get("/deletar-corretor/:id", eAdmin, (req, res) => {
    console.log(req.params.id)
    connMySql.query("select CORRETOR_idcorretor from cliente where CORRETOR_idcorretor = " + req.params.id, (erro, cliente) => {
        if (cliente.length != 0) {
            console.log(erro)
            req.flash("error_msg", "Registro não pode ser excluido, possui Clientes vinculados a este cadastro!")
            res.redirect("/corretor/lista-corretores")

        } else {
            connMySql.query("delete from corretor where idcorretor = " + req.params.id, (erro, corretor) => {
                if (erro) {
                    console.log(erro)
                    req.flash("error_msg", "Não foi possivél excluir cadastro." + erro)
                    res.redirect("/lista-corretores")
                } else {
                    req.flash("success_msg", "Exclusão realizada com sucesso.")
                    res.redirect("/lista-corretores")

                }

            })
        }

    })

})

module.exports = app