const express = require("express");
const app = express();
app.use(express.json());
app.get("/represalia", function (req, res){
    let cuerpo = req.body
});