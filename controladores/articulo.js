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

module.exports = {
    prueba,
    curso
}