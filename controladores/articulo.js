const validator = require('validator')
const Articulo = require('../modelos/Articulo')

const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de artículos"
    })
}

const curso = (req,res) => {

        console.log("Se ha ejecutado el endpoint probando")
    
        return res.status(200).send({
            curso: "Master en React",
            autor: "Victor Robles WEB",
            url: "victorroblesweb.es/master-react"
        })
}

const crear = (req,res) => {

    // Recoger parametros por post a guardar
    let parametros = req.body;

    // Validar datos
    try {
        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
                              validator.isLength(parametros.titulo, {min:5, max:undefined});
        let validar_contenido = !validator.isEmpty(parametros.titulo);

        if(!validar_titulo || !validar_contenido){
            throw new Error("Nose ha validado la información !!")
        }

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar",
        })
    }

    // Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    // Asignar valores a objeto basado en el modelo (manual o automatico
    //articulo.titulo = parametros.titulo;

    // Guardar el articulo en la base de datos
    articulo.save((error, articuloGuardado) => {

        if(error || !articulo){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el artículo",
            })
        }

        //Devolver resultado
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo creado con exito!!
        })

    })

    // Devolder resultado

    return res.status(200).json({
        mensaje: "Acción de guardar",
        parametros
    })
}

module.exports = {
    prueba,
    curso,
    crear
}