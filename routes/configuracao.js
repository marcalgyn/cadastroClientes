const express = require("express")
const router = express.Router()
const connMySql = require("../config/connMySql")
const { eAdmin } = require("../helpers/eAdmin")



router.get("/", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let selCliente = "SELECT idCliente, nome FROM cliente where ativo = 'S' order by nome"

    connMySql.query(selCliente, (erro, cliente) => {
        res.render("configuracao/totaliza", {
            layout: "adm.handlebars",
            usuario,
            cliente
        });

    })

})

router.post("/save-operacao", eAdmin, (req, res) => {
    let idCliente = req.body.idCliente;
    var d = new Date();
    var ano = d.getFullYear(); //Ano Corrente
    let mes = req.body.idMes; //Mes Selecionado
    let dtInicio, dtFim;
    let nomeMes, vlOperado;
    let count;

    switch (parseInt(mes)) {
        case 0:
            nomeMes = 'Janeiro';
            break;
        case 1:
            nomeMes = 'Fevereiro';
            break;
        case 2:
            nomeMes = 'Março';
            break;
        case 3:
            nomeMes = 'Abril';
            break;
        case 4:
            nomeMes = 'Maio';
            break;
        case 5:
            nomeMes = 'Junho';
            break;
        case 6:
            nomeMes = 'Julho';
            break;
        case 7:
            nomeMes = 'Agosto';
            break;
        case 8:
            nomeMes = 'Setembro';
            break;
        case 9:
            nomeMes = 'Outubro';
            break;
        case 10:
            nomeMes = 'Novembro';
            break;
        case 11:
            nomeMes = 'Dezembro';
            break;
    }

    dtInicio = new Date(ano, mes, 1);
    dtInicio = dtInicio.toLocaleDateString();

    if ((mes == 0) || (mes == 2) || (mes == 4) || (mes == 6) || (mes == 7) || (mes == 9) || (mes == 11)) {
        dtFim = new Date(ano, mes, 31);
    }
    if (mes == 1) {
        dtFim = new Date(ano, mes, 29);
    }

    if ((mes == 3) || (mes == 5) || (mes == 8) || (mes == 10)) {
        dtFim = new Date(ano, mes, 30);
    }

    dtFim = dtFim.toLocaleDateString();

    //Funcao Verifica se ja possui registro
    let sqlconsulta = "select * from operacaomes where (idCliente = " + idCliente + ") and (mes = '" + nomeMes + "')";

    //Função Insere
    let sqlinserir = " insert into operacaomes (idCliente, mes, valorOperado) " +
        " SELECT idCliente, '" + nomeMes + "', sum(valorOperado) as valorOperado FROM lancamentodiario where " +
        " (idCliente = " + idCliente + ") and  (dataMovimentacao >= '" + dtInicio + "') and (dataMovimentacao <= '" + dtFim + "')";

    //Funcao Atualiza
    let sqlatualiza = "UPDATE operacaomes set valorOperado = ? where (idCliente = " + idCliente + ") and (mes = '" + nomeMes + "')";


    //Verifica se possui registro
    connMySql.query(sqlconsulta, (err, result) => {
        if (err) {
            throw err;
        }

        for (var i in result) {
            count = result[i].idCliente;
        }

        //Atualiza Dados localizados
        if (count > 0) {

            let findData = " SELECT idCliente, sum(valorOperado) as valorOperado FROM lancamentodiario where " +
                " (idCliente = " + idCliente + ") and  (dataMovimentacao >= '" + dtInicio + "') and (dataMovimentacao <= '" + dtFim + "')";

            //Criar função de wait
            let query = connMySql.query(findData, async (err, result) => {

                if (err) {
                    throw err;
                }

                for (var i in result) {
                    vlOperado = result[i].valorOperado;
                }

                let dataUpdate = await [vlOperado, idCliente, nomeMes];
                let query = connMySql.query(sqlatualiza, dataUpdate, (err, results) => {
                    if (err) {
                        req.flash("error_msg", "Erro ao tentar Atualizar Registro!!");
                        res.redirect("/configuracao");
                    } else {
                        req.flash("success_msg", "Registro Atualizado com sucesso!!");
                        res.redirect("/configuracao");
                    }
                });
            })

        } else {
            connMySql.query(sqlinserir, (err, result) => {
                if (err && err.code === 'ER_BAD_FIELD_ERROR') {
                    req.flash("error_msg", "Não possui lançamento para o mês informado!!");
                    res.redirect("/configuracao");
                } else {
                    req.flash("success_msg", "Registro Inserido com sucesso!!");
                    res.redirect("/configuracao");
                }

            });
        }
    })
})

module.exports = router;


