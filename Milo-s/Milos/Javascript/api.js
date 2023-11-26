const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");

const funcs = require("./sql.js");

app.get("/represalia", function (req, res){
    let cuerpo = req.body;
}); 
 
app.post('/RegistrarUsuario', async (req, res) => {
    const { Nombre_Usuario, Contraseña, Email } = req.body;

    try {
        await funcs.RegistrarUsuario(Nombre_Usuario, Contraseña, Email);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(400).send(error.message || "Bad Request");
    }
});

app.post('/RegistrarHijo', (req, res) => {
    const {nombreHijo, generoHijo, edadHijo, idUsuario}= req.body;
    let reg = funcs.RegistrarHijo(req.body.Nombre_Usuario)
    .then((resultado) => {
        console.log(resultado);
        if (resultado instanceof Error){
            res.sendStatus(400);
        }
        else {
            res.sendStatus(200);
        }

    });
});
app.post('/iniciarSesion', (req, res) => {
    const { Nombre_Usuario, Contraseña } = req.body;

    try {
        const resultado = funcs.iniciarSesion(Nombre_Usuario, Contraseña);

        if (resultado.loggedIn) {
            res.status(200).json({ message: resultado.message });
        } else {
            res.status(401).json({ message: resultado.message });
        }
    } catch (error) {
        console.error("Error en la ruta de inicio de sesión:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

app.listen(8080);

// Comando a poner en la consola de powershell: npm init --y
//npm i express/ mysql2.
//para correr la api: npm run dev
//https://expressjs.com/en/api.html#app para las rutas