const express = require("express")
const connMySql = require("../../config/connMySql")

module.exports = {

    atualizaOperacao: (idCliente, mes) => {
        mes = parseInt(mes) - 1;
        var d = new Date();
        var ano = d.getFullYear(); //Ano Corrente

        let dtInicio, dtFim;
        let nomeMes, vlOperado;
        let count;
        let msg;

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

        try {
            dtFim = dtFim.toLocaleDateString();    
        } catch (error) {
            console.log("Erro de conversao de Data");
        }
        


        //Funcao Verifica se ja possui registro
        let sqlconsulta = "select * from operacaomes where (idCliente = " + idCliente + ") and (mes = '" + nomeMes + "')";

        //Função Insere
        let sqlinserir = " insert into operacaomes (idCliente, mes, valorOperado) " +
            " SELECT idCliente, '" + nomeMes + "', sum(valorOperado) as valorOperado FROM lancamentodiario where " +
            " (idCliente = " + idCliente + ") and  (dataMovimentacao >= '" + dtInicio + "') and (dataMovimentacao <= '" + dtFim + "')";

        //Funcao Atualiza
        let sqlatualiza = "UPDATE operacaomes set valorOperado = ? where (idCliente = " + idCliente + ") and (mes = '" + nomeMes + "')";

        //Verifica se possui registro
        connMySql.query(sqlconsulta, async (err, result) => {
            if (err) {
                throw err;
            }

            for (var i in result) {
                count = await result[i].idCliente;
                
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
                            console.log("Erro ao tentar atualizar Grafico");
                            msg = "Erro ao tentar Atualizar Grafico!!";
                        } else {
                            console.log("Atualização Grafico com sucesso");
                            msg = "Registro Atualizado com sucesso!!";
                        }
                    });
                })

            } else {
                connMySql.query(sqlinserir, (err, result) => {
                    if (err && err.code === 'ER_BAD_FIELD_ERROR') {
                        //         req.flash("error_msg", "Não possui lançamento para o mês informado!!");
                    } else {
                        //       req.flash("success_msg", "Registro Inserido com sucesso!!");
                    }

                });
            }
        })

        return msg;
    },

    calculaComissao(valor, swap, comissao) {

        /***** Valor da Comissao ta fixa porvisoriamente ******/
        //  var valorOperacao = document.getElementById('valorOperado').value;

        var valorOperacao = parseFloat(valor);
        var swap = parseFloat(swap);
        var valorComissao = 0;
        var pComissao = parseFloat(comissao);

        //Inserindo Registro    
        
        if (swap < 0) {
            swap = swap * (-1);
            valorComissao = ((valorOperacao - swap) * (pComissao / 100));
            
            /* Independente do valor da comissão*/
            return valorComissao;
            
            /* Funcao calcula quando a camissão for negativo zera a comissao
            if (valorComissao < 0) {
                document.getElementById('valorComissao').value = 0.00;
            } else {
                document.getElementById('valorComissao').value = valorComissao;
            }
            */

        } else {
            valorComissao = (valorOperacao + swap) * (pComissao / 100);
            return valorComissao;

            /* Valida se a comissao for negativo nao calcaula comissao
            if (valorComissao < 0) {
                document.getElementById('valorComissao').value = 0.00;
            } else {
                document.getElementById('valorComissao').value = valorComissao;
            }
            */
        }

    }

};