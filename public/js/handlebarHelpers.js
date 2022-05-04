HandlebarsIntl.registerWith((Handlebars) => {

    var intlData = {
        "locales": "pt-BR"
    };
    
    var html = template(context, {
        data: {intl: intlData}
    });
});


Handlebars.registerHelper("if_eq", function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

Handlebars.registerHelper("formatPhoneNumber", function(propriedade) {
    if (propriedade) {
        var phone = propriedade.toString();
        return "(" + phone.substr(0,3) + ")" + phone.substr(3,3) + "-" + phone.substr(6,4);
    } else {
        return '0';
    }
    
});

module.exports (handlebars);
