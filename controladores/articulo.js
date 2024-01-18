const validator = require('validator')
const Articulo = require('../modelos/Articulo')

const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de artículos"
    })
}

const curso = (req, res) => {

    console.log("Se ha ejecutado el endpoint probando")

    return res.status(200).send({
        curso: "Master en React",
        autor: "Victor Robles WEB",
        url: "victorroblesweb.es/master-react"
    })
}

const crear = async (req, res) => {

    let parametros = req.body;

        // Validar datos
        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, { min: 5, max: undefined });
        let validar_contenido = !validator.isEmpty(parametros.titulo);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("Nose ha validado la información !!")
        }

        // Crear el objeto a guardar
        console.log(parametros)
        const articulo = new Articulo(parametros);

        await articulo
        .save()
        .then((articuloGuardado) => {
          // Devolver resultado
          return res.status(200).json({
            status: "Success",
            articulo: articuloGuardado,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: "Error",
            mensaje: "No se ha guardado el artículo",
          });
        });
}

const listar = (req, res) => {
     
    let consulta = Articulo.find({});

    consulta.limit(3);
    
    consulta.sort({ fecha: -1 }).then((articulos) => {

        return res.status(200).send({
            status: "success",
            articulos
        })
    }).catch((error) => {
        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado artículos"
        });
    });
}

module.exports = {
    prueba,
    curso,
    crear,
    listar
}