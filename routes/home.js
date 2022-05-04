//Carregando os módulo
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/HomeTopo");
const HomeTopo = mongoose.model("hometopos");
require("../models/Servico");
const Servico = mongoose.model("servicos");

//Modificado endereço para ir direto para a pagina de login
router.get("/teste", (req, res) =>{
    HomeTopo.findOne({})
    .then(homeTopo => {
        Servico.findOne({})
            .then(servico => {
                res.render("home/home", {layout: "main.handlebars"
                });
            })
            .catch(erro => {
                res.render("home/home", {layout: "main.handlebars" });
                
                //res.send("Nenhum Serviço encontrado");
            });
    })
    .catch(erro => {
        res.send("Nenhum Topo encontrado");
    });
})
router.get("/", (req, res) => {
    HomeTopo.findOne({})
        .then(homeTopo => {
            Servico.findOne({})
                .then(servico => {
                    res.render("usuario/login", {layout: "login.handlebars",
                        homeTopo: homeTopo.toObject(),
                        servico: servico.toObject()
                    });
                })
                .catch(erro => {
                    console.log("Abrindo tela de login!");
                    res.render("usuario/login", {layout: "login.handlebars" });
                    
                    //res.send("Nenhum Serviço encontrado");
                });
        })
        .catch(erro => {
            res.send("Nenhum Topo encontrado");
        });
});

module.exports = router;
