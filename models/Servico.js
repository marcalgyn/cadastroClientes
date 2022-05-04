const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Servico = new Schema({
    titulo: {
        type: String,
        required: true
    },
    iconServUm: {
        type: String,
        required: true
    },
    tituloServUm: {
        type: String,
        required: true
    },
    descServUm: {
        type: String,
        required: true
    },
    iconServDois: {
        type: String,
        required: true
    },
    tituloServDois: {
        type: String,
        required: true
    },
    descServDois: {
        type: String,
        required: true
    },
    iconServTres: {
        type: String,
        required: true
    },
    tituloServTres: {
        type: String,
        required: true
    },
    descServTres: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        required: false
    }
});

mongoose.model("servicos", Servico);
