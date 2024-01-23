const {Schema, model} = require("mongoose");

const ArticuloSchema = new Schema({
    titulo:{
        type: String,
        require: true
    },
    contenido:{
        type: String,
        require: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: "deafult.png"
    }
});


module.exports = model("Articulo",ArticuloSchema,"articulos")