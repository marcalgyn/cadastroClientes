const express = require("express");
const router = express.Router();
const connMySql = require("../config/connMySql");
const { eAdmin } = require("../helpers/eAdmin");
const bcrypt = require("bcryptjs");

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "public/images/clientes")

    },

    filename: function (req, file, cb) {

        console.log("Original Name " + file.originalname)

        cb(null, req.body.idCliente + "_" + `${file.originalname}`)
        console.log("Possivel nome: " + req.body.idCliente + "_" + file.originalname)
    }
})

var limits = { fileSize: 5 * 1024 * 1024 };

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            cb(null, true)
        } else {
            //cb(null, false)
            cb(new Error("Formato do Arquivo Invalido. Diferente de JPEG e PNG"), false)
        }
    }, limits: limits

}).single('file');


router.get("/", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let sql = "SELECT * FROM empresa ORDER BY razaoSocial";
    let sqlCorretor = "SELECT * FROM corretor ORDER BY nome";
    connMySql.query(sql, (err, empresas) => {
        connMySql.query(sqlCorretor, (err, corretores) => {
            res.render("cliente/cad-cliente", {
                layout: "adm.handlebars",
                usuario,
                empresas,
                corretores
            });
        });
    });
});

router.get("/list-clientes", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let sql = "";
    if (usuario.tipoUsuario === "A") {
        sql = "SELECT * FROM cliente ORDER BY nome";
    } else {
        sql = "SELECT * FROM cliente WHERE idCliente = " + usuario.idCliente;
    }
    connMySql.query(sql, (err, clientes) => {
        res.render("cliente/list-clientes", {
            layout: "adm.handlebars",
            usuario,
            clientes
        });
    });
});

router.post("/save-cliente", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let sql, data, msg;
    let idCliente = req.body.idCliente;
    let ativo = req.body.ativo == 'on' ? 'S' : 'N';
    let errors = []


    upload(req, res, function (erro) {

    let senhaCrypt = req.body.senha;
    if (senhaCrypt.length < 50) {
        senhaCrypt = encryptPassword(senhaCrypt);
    }

    if (!req.body.valorInvestido || typeof req.body.valorInvestido == undefined || req.body.valorInvestido == null) {
        req.body.valorInvestido = 0;
    }
    if (!req.body.valorComissao || typeof req.body.valorComissao == undefined || req.body.valorComissao == null) {
        req.body.valorComissao = 0;
    }


   

        if (erro) {
            console.log(erro);
            erro.message = erro.code == 'LIMIT_FILE_SIZE' ? "Arquivo ultrapassou 5MB, Muito grande" : erro.message;
            req.flash("error_msg", "" + erro);
            res.redirect("/cliente/" + req.body.idCliente);
            return
        }

        const file = req.file;

        console.log("Arquivo " + file.originalname);


        var valor = "/images/clientes/" + req.body.idCliente + "_" + file.originalname;
        console.log("Nome do Arquivo: /images/clientes/" + req.body.idCliente + "_" + file.originalname)


        let dataInsert = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            identidade: req.body.identidade,
            dtNascimento: req.body.dtNascimento,
            telefone: req.body.telefone,
            email: req.body.email,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep,
            dtCadastro: new Date(),
            usuario: req.body.usuario,
            senha: senhaCrypt,
            tipoConta: req.body.tipoConta,
            valorInvestido: req.body.valorInvestido,
            idEmpresa: req.body.idEmpresa,
            valorComissao: req.body.valorComissao,
            tipoUsuario: "U",
            ativo: req.body.ativo.value,
            idCorretor: req.body.idCorretor,
            logo: valor,
            fantasia: req.body.fantasia
        };

        let dataUpdate = [
            req.body.nome,
            req.body.cpf,
            req.body.identidade,
            req.body.dtNascimento,
            req.body.telefone,
            req.body.email,
            req.body.endereco,
            req.body.bairro,
            req.body.cidade,
            req.body.estado,
            req.body.cep,
            req.body.usuario,
            senhaCrypt,
            req.body.tipoConta,
            req.body.valorInvestido,
            req.body.idEmpresa,
            req.body.valorComissao,
            req.body.tipoUsuario,
            req.body.idCorretor,
            req.body.ativo.value,
            valor,
            req.body.fantasia,
            req.body.idCliente
        ];
    


        let sqlInsert = "INSERT INTO cliente SET ?";
        let sqlUpdate =
            "UPDATE cliente SET nome=?, cpf=?, identidade=?, " +
            "dtNascimento=?, telefone=?, email=?, endereco=?, bairro=?, " +
            "cidade=?, estado=?, cep=?, usuario=?, senha=?, " +
            "tipoConta=?, valorInvestido=?, idEmpresa=?, valorComissao=?, " +
            "tipoUsuario=?, idCorretor=?, ativo=?, logo=?, fantasia=? WHERE idCliente =? ";

        if (idCliente === "") {
            sql = sqlInsert;
            data = dataInsert;
            msg = "Cliente Cadastrado com Sucesso!";
        } else {
            sql = sqlUpdate;
            data = dataUpdate;
            msg = "Cliente Atualizado com Sucesso!";
        }

        let query = connMySql.query(sql, data, (err, results) => {
            if (err) {
                throw err;
            }
            req.flash("success_msg", msg);
            if (usuario.usuario) {
                res.redirect("/cliente")
            } else {
                res.redirect("/cliente/list-clientes")
            }

        });
    });

});

router.post("/signup", (req, res) => {
    const valSenha = req.body.senha;
    const valConfirmSenha = req.body.confirmeSenha;

    if (valSenha !== valConfirmSenha) {
        req.flash("error_msg", "Senhas não conferem!");
        res.redirect("/usuario/signup");
        return;
    }

    const nome = req.body.nome;
    const email = req.body.email;
    const senha = encryptPassword(req.body.senha);

    let sql =
        "INSERT INTO cliente (nome, email, senha) VALUES('" +
        nome +
        "','" +
        email +
        "','" +
        senha +
        "')";

    let query = connMySql.query(sql, (err, results) => {
        if (err && err.code === "ER_DUP_ENTRY") {
            req.flash("error_msg", "E-mail já cadastrado no nosso sistema.");
            res.redirect("/usuario/signup");
        } else {
            req.flash(
                "success_msg",
                "Cadastro efetuado com sucesso. Favor fazer o Login."
            );
            res.redirect("/usuario/login");
        }
    });

});

router.get("/edit-cliente/:id", eAdmin, (req, res) => {
    let usuario = res.locals.user;
    let id = req.params.id;
    let sqlEmpresa = "SELECT * FROM empresa ORDER BY razaoSocial";
    let sqlCorretor = "SELECT * FROM corretor ORDER BY nome";
    let sqlCliente = "SELECT * FROM cliente WHERE idCliente = " + id;
    connMySql.query(sqlEmpresa, (err, empresas) => {
        connMySql.query(sqlCliente, (err, cliente) => {
            connMySql.query(sqlCorretor, (err, corretores) => {
                cliente = Object.values(cliente)[0];
                if (cliente.dtNascimento !== null) {
                    cliente.dtNascimento = formatDate(cliente.dtNascimento);
                }
                res.render("cliente/cad-cliente", {
                    layout: "adm.handlebars",
                    usuario,
                    empresas,
                    cliente,
                    corretores
                });
            });
        });
    });
});

const formatDate = data => {
    return data.toISOString().substr(0, 10);
};


router.get("/edit-imagens/:id", eAdmin, (req, res) => {
    let usuario = res.locals.user;

    connMySql.query("select * from cliente where idCliente = " + req.params.id, (erro, cliente) => {
        res.render("cliente/edit-imagens", { layout: 'adm.handlebars', usuario, cliente })
    })

})


//router.post("/add-imagens", eAdmin, upload.single("file"), (req, res, next) => {
router.post("/add-imagens", eAdmin, (req, res) => {
    var dados_imagem = req.body;
    var errors = [];

    upload(req, res, function (erro) {

        if (erro) {
            console.log(erro);
            erro.message = erro.code == 'LIMIT_FILE_SIZE' ? "Arquivo ultrapassou 5MB, Muito grande" : erro.message;
            req.flash("error_msg", "" + erro);
            res.redirect("/cliente/edit-imagens/" + req.body.idCliente);
            return
        }

        const file = req.file;

        console.log(req.file);

        if (errors.length > 0) {
            res.render("/edit-imagens", { layout: "adm.handlebars", errors: errors, imagem: dados_imagem })
        } else {
            var sql = "insert into imagens (documento, arquivo, idCliente) values "
            var valor = "('" + dados_imagem.documento + "', '/images/clientes/" + req.body.idCliente + "_" + file.originalname + "', " + req.body.idCliente + ") "
            console.log("Nome do Arquivo: /images/clientes/" + req.body.idCliente + "_" + file.originalname)

            try {
                connMySql.query(sql + valor, (erro, resultado) => {
                    if (erro) {
                        req.flash("error_msg", "Imagem muito grande não cadastrada.")
                        res.redirect("/cliente/edit-imagens/" + req.body.idCliente)
                    } else {
                        req.flash("success_msg", "Imagem cadastrada com sucesso.")
                        res.redirect("/cliente/edit-imagens/" + req.body.idCliente)
                    }

                })
            } catch (error) {
                req.flash("error_msg", "Erro ao tentar Cadastrar o cliente." + error)
                res.redirect("/dashboard")
                console.log(error)
            }
        }

    })
})


router.get("/ficha-cliente/:id", (req, res) => {
    let usuario = res.locals.user;
    let id = req.params.id;
    let deposito, saque, operacao, saldo;
    var sqlCliente = "Select * from cliente where idCliente = " + id;
    var sqlImagens = "Select * from imagens where idCliente = " + id;
    var sqlCorretora = "Select * from conta_corretora where idCliente = " + id;
    var sqlConta = "Select * from conta_cliente where idCliente = " + id;

    let sqlconsDeposito = "SELECT sum(valor) totalDeposito FROM operacao where (tipoOperacao = 'C') and (idCliente = " + id + ") ";
    let sqlconsSaque = "SELECT sum(valor) totalSaque FROM operacao where (tipoOperacao = 'D') and (idCliente = " + id + ") ";
    let sqlconsOperacao = "SELECT sum(valorOperado) as TotalOperacao, sum(swap) as swap FROM lancamentodiario WHERE idCliente = " + id;


    /* Consulta em banco de dados os valores */
    connMySql.query(sqlconsDeposito, (erro, consDeposito) => {
        connMySql.query(sqlconsSaque, (erro, consSaque) => {
            connMySql.query(sqlconsOperacao, (erro, consOperacao) => {

                consDeposito = Object.values(consDeposito)[0];
                consSaque = Object.values(consSaque)[0];
                consOperacao = Object.values(consOperacao)[0];


                deposito = parseFloat(consDeposito.totalDeposito);
                if (!parseFloat(consSaque.totalSaque) > 0) {
                    saque = 0
                } else {
                    saque = parseFloat(consSaque.totalSaque);
                }

                operacao = parseFloat(consOperacao.TotalOperacao);
                swap = parseFloat(consOperacao.swap);

                /*
                if (swap < 0) {
                    swap = (swap * (-1))
                }
                */

                connMySql.query(sqlCliente, (erro, cliente) => {
                    connMySql.query(sqlImagens, (erro, imagens) => {
                        connMySql.query(sqlCorretora, (erro, corretora) => {
                            connMySql.query(sqlConta, (erro, contacliente) => {
                                cliente = Object.values(cliente);

                                saldo = parseFloat((deposito + operacao + swap) - saque);

                                if (cliente.dtNascimento != null) {
                                    cliente[0].dtNascimento = formatDate(cliente[0].dtNascimento);
                                }
                                res.render("cliente/ficha-cliente", { layout: "adm.handlebars", usuario, cliente, imagens, corretora, contacliente, deposito, saque, operacao, saldo, swap })
                            })
                        })
                    })
                })

            })
        })
    })

})

module.exports = router;
