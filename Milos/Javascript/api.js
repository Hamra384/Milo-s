const express = require("express");
const app = express();
app.use(express.json());

const funcs = require("./sql.js");

app.get("/represalia", function (req, res){
    let cuerpo = req.body;
});

app.get('/InsertarUsuario',async (req, res) => {
    const {Nombre_Usuario, Contraseña, Email}= req.body;

    let reg = funcs.InsertarUsuario(req.body.Nombre_Usuario)
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

app.get('/InsertarHijo',async (req, res) => {
    const {nombreHijo, generoHijo, edadHijo, idUsuario}= req.body;
    let reg = funcs.InsertarHijo(req.body.Nombre_Usuario)
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

app.listen(8080);

// Comando a poner en la consola de powershell: npm init --y
//npm i express/ mysql2.
//para correr la api: npm run dev
//https://expressjs.com/en/api.html#app para las rutas