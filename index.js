const {conexion} = require("./basedatos/conexion");
const express = require("express")
const cors = require("cors")

//Iniciar app
console.log("App de node arrancada");

//Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// Convertir body a objeto js
app.use(express.json())

//RUTAS

//Rutas de prueba
app.get("/probando",(req,res) => {

    console.log("Se ha ejecutado el endpoint probando")

    return res.status(200).send({
        curso: "Master en React",
        autor: "Victor Robles WEB",
        url: "victorroblesweb.es/master-react"
    })

})

app.get("/",(req,res) => {

    console.log("Se ha ejecutado el endpoint probando")

    return res.status(200).send(
        "<h1>Empezando a crear una api rest con node</h1>"
    )

})

//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto "+puerto)
})