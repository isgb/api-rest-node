const {Schema, model} = require("mongoose");

const ArticuloSchema = Schema({
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
        require: Date.now
    },
    imagen: {
        type: String,
        default: "deafult.png"
    }
});


module.export = model("Articulo",ArticuloSchema,"articulos")