//Carregando os módulo
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
    res.render("usuario/login", { layout: "login.handlebars" });
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/usuario/login",
        passReqToCallback: true,
        failureFlash: true
    })(req, res, next);
});

router.get("/signup", (req, res) => {
    res.render("usuario/signup", { layout: "login.handlebars" });
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "Deslogado com sucesso!");
    res.redirect("/usuario/login");
});

module.exports = router;
