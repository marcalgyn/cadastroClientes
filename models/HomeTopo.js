const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeTopo = new Schema({
    titulo: {
        type: String,
        required: true
    },
    subTitulo: {
        type: String,
        required: true
    },
    tituloBtn: {
        type: String,
        required: true
    },
    urlBtn: {
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

mongoose.model("hometopos", HomeTopo);
