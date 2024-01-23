const fs = require("fs");
const path = require("path");
const { validarArticulo } = require("../helpers/validar")
const Articulo = require('../modelos/Articulo');
const { error } = require("console");

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

    //Validar datos
    try {
        validarArticulo(parametros)
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
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

    if (req.params.ultimos) {
        consulta.limit(3);
    }

    consulta.sort({ fecha: -1 }).then((articulos) => {

        return res.status(200).send({
            status: "success",
            // parametro: req.params.ultimos,
            contador: articulos.length,
            articulos
        })
    }).catch((error) => {
        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado artículos"
        });
    });
}

const uno = (req, res) => {
    let id = req.params.id;
    Articulo.findById(id).then((Articulo) => {
        return res.status(200).json({
            status: "success",
            Articulo
        })
    }).catch((error) => {
        return res.status(404).json({
            status: "error",
            error,
            message: `No se han encontrado el articulo con id ${id}`,
        });
    });
};

const borrar = (req, res) => {

    let articulo_id = req.params.id;

    Articulo.findOneAndDelete({ _id: articulo_id }).then((articuloBorrado) => {
        return res.status(200).json({
            status: "success",
            articulo: articuloBorrado,
            mensaje: "Metodo de borrar"
        })
    }).catch((error) => {
        if (error) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al borrar el artículo"
            });
        }
    });
}

const editar = (req, res) => {
    //Recoger id articulo a editar
    let articuloId = req.params.id;

    //Recoger datos del body
    let parametros = req.body;

    //Validar datos
    try {
        validarArticulo(parametros)
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    //Buscar y actualizar el artículo
    Articulo.findOneAndUpdate({ _id: articuloId }, req.body, { new: true }).then((articuloActualizado) => {

        //Devolver respuestas
        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado,
            mensaje: "Metodo de editar"
        })
    }).catch((error) => {
        if (error) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al editar el artículo"
            });
        }
    });
}

const subir = (req, res) => {

    // Configurar multer

    // Recoger el fichero de imagen subido
    // console.log(req.file)
    if(!req.file && !req.files){
        return res.status(404).json({
            status: "error",
            mensaje: "Petición invalida"
        })
    }

    // Nombre del archivo
    let archivo = req.file.originalname;

    // Extension del archivo
    let archivo_split = archivo.split("\.");
    let extension = archivo_split[1];

    // Comprobar extension correcta
    if (extension != "png" && extension != "jpg" &&
        extension != "jpeg" && extension != "gif") {

        //Borrar archivo y dar una respuesta
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                mensaje: "Imagen invalida"
            })
        })
    } else {

         //Recoger id articulo a editar
    let articuloId = req.params.id;


    //Buscar y actualizar el artículo
    Articulo.findOneAndUpdate({ _id: articuloId }, {imagen: req.file.filename}, { new: true }).then((articuloActualizado) => {

        //Devolver respuestas
        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado,
            fichero:  req.file
        })
    }).catch((error) => {
        if (error) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al editar el artículo"
            });
        }
    });

    }

}

const imagen = (req,res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = "./imagenes/articulos/"+fichero;

    // GET http....api/imagen/nombre_del_fichero.jpg
    fs.access(ruta_fisica, (existe) => {
        if(existe){
            return res.sendFile(path.resolve(ruta_fisica))
        }else{
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe",
                existe,
                fichero,
                ruta_fisica
            });
        }
    })
}

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen
}