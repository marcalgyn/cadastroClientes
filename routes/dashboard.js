//Carregando os módulo
const express = require("express");
const router = express.Router();
const { eAdmin } = require("../helpers/eAdmin");
const connMySQl = require("../config/connMySql")

router.get("/", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    /*
     let sqlCliente = "select count(idCliente) as qntClientes from cliente";
     let sqlOperacoes = "select count(idLancamento) as qntOperacoes from lancamentodiario";
     let sqlDeposito = "SELECT sum(valor) AS totalcapital FROM `grinvesting-db`.operacao WHERE tipoOperacao = 'C'";
     let sqlOperacao = 'SELECT dataMovimentacao, sum(valorOperado) as valorOperado FROM `grinvesting-db`.lancamentodiario ' +
                         ' where dataMovimentacao >= CURDATE() - 50 and idCliente = 21 ' +
                         ' group by dataMovimentacao;';
   */
    let sqlCliente = "select idCliente, nome, logo, fantasia, bairro, telefone from cliente";




    connMySQl.query(sqlCliente, (erro, cliente) => {
        let msgBoasVindas;

        if (erro) {
            throw erro;
        }
        if (usuario.cpf == null) {
            msgBoasVindas = "Conclua o seu cadastramento antes de proseguir."
        } else {
            msgBoasVindas = '';
        }
        res.render("dashboard/dashboard", {
            layout: "adm.handlebars",
            usuario,
            cliente,          
            msgBoasVindas
          
        });

    })

});


module.exports = router;
