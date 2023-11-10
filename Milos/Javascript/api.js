const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");

const funcs = require("./sql.js");

app.get("/represalia", function (req, res){
    let cuerpo = req.body;
});

app.post('/RegistrarUsuario',async (req, res) => {
    const {Nombre_Usuario, Contraseña, Email}= req.body;

    let reg = funcs.RegistrarUsuario(req.body.Nombre_Usuario)
    .then((resultado) => {
        console.log(resultado);
        if (resultado instanceof Error){
            res.send(400);
        }
        else {
            res.send(200);
        }

    });
});

app.post('/RegistrarHijo',async (req, res) => {
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
app.post('/iniciarSesion', async (req, res) => {
    const { Nombre_Usuario, Contraseña } = req.body;

    try {
        const resultado = await funcs.iniciarSesion(Nombre_Usuario, Contraseña);

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