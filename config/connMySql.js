const mysql = require("mysql");



//Conexao Local
const connMySql = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Marc@lGyn",
    database: "grinvesting-db",
    multipleStatements: false
});

/* Verifica conexao com banco MySQL */
connMySql.getConnection((erro) =>{
    if (erro) {
        console.log("Nao foi possivel conectar ao Banco de Dados MySQL." + erro);
        return
    }
    console.log("Conexão com MySQL Realizada com Sucesso ;)")
}) 

/* Rotina para escutar e finalizar as conexoes com banco de dados apos finaliar o sistema */
process.on("SIGINT", () => {
    
    connMySql.end(err => {
        if (err) return console.log(err);
        console.log("Conexão com o BD mySQL => fechada");
        process.exit(0);
    });
    

});

module.exports = connMySql;


