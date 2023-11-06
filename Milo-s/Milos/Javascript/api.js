const express = require("express");
const app = express();
app.use(express.json());

const funcs = require("./sql.js");

app.get("/represalia", function (req, res){
    let cuerpo = req.body;
});

app.get('api/InsertarUsuario',async (req, res) => {
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


app.listen("http://localhost:9000");

// Comando a poner en la consola de powershell: npm init --y
//npm i express/ mysql2.
//para correr la api: npm run dev