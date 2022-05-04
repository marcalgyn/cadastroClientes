const mysql = require('mysql');

module.exports = {
    connection: function () {
        return mysql.createConnection({
            host: "mysql669.umbler.com",
            user: "marcalgyn",
            password: "a1a2a3a4",
            database: "grinvesting-db"
        });
    },
    
    queryParams: function (sql, params, callback) {
        const conn = this.connection();
        console.log("Conectado ao banco de dados MySql grinvesting-db id: " + conn.threadId)
        conn.query(sql, params, (error, results, fields) => {
            callback(error, results, fields);
            conn.end();
        });
    },
    query: function (sql, params, callback) {
        const conn = this.connection();
        console.log("Acessou Banco de Dados MySql ")
        conn.query(sql, params, (error, results, fields) => {
            callback(error, results, fields);
            conn.end();
            console.log("Encerrou conexão com Banco de Dados MySql ")
        });
    }

}