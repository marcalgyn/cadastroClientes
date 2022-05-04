//Carregando os módulo
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/HomeTopo");
const HomeTopo = mongoose.model("hometopos");
require("../models/Servico");
const Servico = mongoose.model("servicos");
require("../models/Usuario");
const Usuario = mongoose.model("usuario");
const bcryptjs = require("bcryptjs");

router.get("/", (req, res) => {
    /*
    new HomeTopo({
        titulo: "Temos a solução que sua empresa precisa!",
        subTitulo:
            "This example is a quick exercise to illustrate how fixed to top navbar works. As you scroll, it will remain fixed to the top of your browser’s viewport.",
        tituloBtn: "ENTRE EM CONTATO",
        urlBtn: "http://localhost:8083/contato"
    })
        .save()
        .then(() => {
            res.send("Topo cadastrado com sucesso");
        })
        .catch(erro => {
            res.send(erro);
        });
    */
    /*
    new Servico({
        titulo: "Serviços",
        iconServUm: "fas fa-truck-moving",
        tituloServUm: "Serviço Um",
        descServUm:
            "Este é um cartão mais longo, com o texto de suporte abaixo como uma entrada natural para conteúdo adicional. Este conteúdo é um pouco mais longo.",
        iconServDois: "fas fa-truck-loading",
        tituloServDois: "Serviço Dois",
        descServDois:
            "This card has supporting text below as a natural lead-in to additional content.",
        iconServTres: "fas fa-boxes",
        tituloServTres: "Serviço Três",
        descServTres:
            "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."
    })
        .save()
        .then(() => {
            res.send("Serviço cadastrado com sucesso");
        })
        .catch(erro => {
            res.send(erro);
        });
    */
    let senha = "123456";
    bcryptjs.genSalt(10, (error, salt) => {
        bcryptjs.hash(senha, salt, (error, hash) => {
            if (error) {
                res.send("Erro ao critografar a senha");
            } else {
                let senha_cript = hash;
                new Usuario({
                    name: "Mcgill Dias",
                    email: "mcgill@avaloon.com.br",
                    password: senha_cript,
                    admin: false
                })
                    .save()
                    .then(() => {
                        res.send("Usuario cadastrado com sucesso");
                    })
                    .catch(erro => {
                        res.send(erro + " Erro ao cadastrar usuario");
                    });
            }
        });
    });
});

module.exports = router;
