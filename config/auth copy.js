const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
require("../models/Usuario");
const Usuario = mongoose.model("usuario");

module.exports = function(passport) {
    passport.use(
        new localStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            (email, password, done) => {
                Usuario.findOne({ email: email }).then(usuario => {
                    if (!usuario) {
                        return done(null, false, {
                            message:
                                "Cadastro com este E-mail não foi encontrado"
                        });
                    }

                    bcryptjs.compare(
                        password,
                        usuario.password,
                        (error, success) => {
                            if (success) {
                                //global.localStorage.setItem("usuario", usuario);
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
    passport.serializeUser((usuario, done) => {
        //console.log(usuario);
        done(null, usuario);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (error, usuario) => {
            done(error, usuario);
        });
    });
};
