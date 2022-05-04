//Carregando os módulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

var Handlebars     = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');

HandlebarsIntl.registerWith(Handlebars);

var HandlebarsFormHelpers = require('handlebars-form-helpers');
HandlebarsFormHelpers.register(Handlebars);



//Formatar data
var helpers = require('handlebars-helpers')();


app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
    if (req.headers["x-forwarded-proto"] == "http") //Checa se o protocolo informado nos headers é HTTP 
        res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
    else //Se a requisição já é HTTPS 
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});



//Configuração arquivos para manipulação com banco de dados
const mongoose = require("mongoose");

// Carregando as rotas da aplicação
const home = require("./routes/home");
const sobre = require("./routes/sobre");
const contato = require("./routes/contato");
const usuario = require("./routes/usuario");
const addBD = require("./routes/addBD");
const dashboard = require("./routes/dashboard");
const empresa = require("./routes/empresa");
const cliente = require("./routes/cliente");
const corretora = require("./routes/corretora");
const conta = require("./routes/conta");
const corretor = require("./routes/corretor");
const lancamento = require("./routes/lancamentodiario");
const relatorio = require("./routes/relatorio");
const contaEmpresa = require("./routes/contaEmpresa");
const operacao = require("./routes/operacao");
const recebimento = require("./routes/recebimento");
const configuracao = require("./routes/configuracao");




// constante para uso de arquivo de diretorio da aplicação. Ex: public
const path = require("path");

// controle de Sessão da aplicação
const session = require("express-session");

// controle das mensagens da aplicação
const flash = require("connect-flash");

//Configuração de segurança da aplicação
const passport = require("passport");
require("./config/auth")(passport);

//Configuração
//Sessão
app.use(
    session({
        secret: "marcalgyn",
        resave: true,
        saveUninitialized: true
    })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;

    next();
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handlebars

app.engine("handlebars", handlebars({ 
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");



//arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));




//Conexao Local
mongoose
   .connect("mongodb://localhost/win2tech", {
       useNewUrlParser: true,
       useUnifiedTopology: true
   })
   .then(() => {
       console.log("Conexão com o MongoDB realizada com sucesso!");
   })
   .catch(erro => {
       console.log("Erro: Conexão com o MongoDB NÃO realizada! " + erro);
   });


//Rotas

//app.use("/", home);
app.use("/", home);
app.use("/sobre", sobre);
app.use("/contato", contato);
app.use("/usuario", usuario);
app.use("/addBD", addBD);
app.use("/dashboard", dashboard);
app.use("/empresa", empresa);
app.use("/cliente", cliente);
app.use("/corretora", corretora);
app.use("/conta", conta);
app.use("/corretor", corretor);
app.use("/lancamento", lancamento);
app.use("/relatorio", relatorio);
app.use("/contaEmpresa", contaEmpresa);
app.use("/operacao", operacao);
app.use("/recebimento", recebimento);
app.use("/configuracao", configuracao);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}!`);
 
});
