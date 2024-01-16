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

    // Validar datos

    // Crear el objeto a guardar

    // Asignar valores a objeto basado en el modelo (manual o automatico
    
    // Guardar el articulo en la base de datos

    // Devolder resultado

    return res.status(200).json({
        mensaje: "Acción de guardar"
    })
}

module.exports = {
    prueba,
    curso,
    crear
}