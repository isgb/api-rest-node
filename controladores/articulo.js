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
        const articulo = new Articulo(parametros);

        // Guardar el artículo en la base de datos
        const articuloGuardado = await articulo.save();

        // Devolver resultado
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Artículo creado con éxito",
        });

    // try {
    //     // Recoger parametros por post a guardar
    //     let parametros = req.body;

    //     // Validar datos
    //     let validar_titulo = !validator.isEmpty(parametros.titulo) &&
    //         validator.isLength(parametros.titulo, { min: 5, max: undefined });
    //     let validar_contenido = !validator.isEmpty(parametros.titulo);

    //     if (!validar_titulo || !validar_contenido) {
    //         throw new Error("Nose ha validado la información !!")
    //     }

    //     // Crear el objeto a guardar
    //     const articulo = new Articulo(parametros);

    //     // Guardar el artículo en la base de datos
    //     const articuloGuardado = await articulo.save();

    //     // Devolver resultado
    //     return res.status(200).json({
    //         status: "success",
    //         articulo: articuloGuardado,
    //         mensaje: "Artículo creado con éxito",
    //     });
    // } catch (error) {
    //     return res.status(400).json({
    //         status: "error",
    //         mensaje: "Faltan datos por enviar o los datos no son válidos",
    //         error: error
    //     });
    // }

}

module.exports = {
    prueba,
    curso,
    crear,
}