const mysql = require("mysql2");
"use strict"; // Esto es para ayudarte a exportar las funciones

// Hay 2 formas de realizar una conexión: Pool y Connection
// Yo elijo pool porque creo q era mejor en terminos de memoria y control de cache
const connection = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "proyecto milos",
  });

  // QueryIn es una función que llamas cuando quieras trabajar con la base de datos
  // En caso de no tener esta función, tendrías que poner todo este texto en cada función sql
function QueryIn (string, values){
    return await new Promise ((respuesta, fallo) => {
        connection.Query(string, values, (err, res) => {
            if (err) fallo(err);
            respuesta (res);
        })
    });
}
// Las diferentes funciones que hagas, tenés que 
async function SelId(nombre){
    let consulta = ""; // Acá poné la consulta
    let respuesta = await QueryIn(consulta, [nombre]);
    if (respuesta instanceof Error){
        console.log(respuesta);
    } 
}

module.export = {SelId};