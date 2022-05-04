const localStrategy = require("passport-local").Strategy;
const connMySql = require("./connMySql");
const bcryptjs = require("bcryptjs");

module.exports = function(passport) {
    passport.use(
        new localStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            (email, password, done) => {
                let sql = "select * from cliente where email = '" + email + "'";
                connMySql.query(sql, (error, usuario) => {
                    
                     if (error) {
                         console.log("Erro ao consultar usuario no banco Mysql: " + error.stack);
                         return;
                     }   

                    if (usuario.length === 0) {
                        return done(null, false, {
                            message:
                                "Não foi encontrado cadastro com este E-mail!"
                        });
                    } else {
                        usuario = Object.values(usuario)[0];
                        if (usuario.tipoUsuario === "A") {
                            usuario.usuario = true;
                        } else {
                            usuario.usuario = false;
                        }
                    }

                    bcryptjs.compare(
                        password,
                        usuario.senha,
                        (error, success) => {
                            if (success) {
                                return done(null, usuario);
                            } else {
                                return done(null, false, {
                                    message: "Dados de acesso incorretos!"
                                });
                            }
                        }
                    );
                });
            }
        )
    );

    // Salvar os dados do usuário na sessão
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};
