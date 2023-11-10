const mysql = require("mysql2");
const bcrypt = require("bcrypt");
"use strict"; // Esto es para ayudarte a exportar las funciones

// Hay 2 formas de realizar una conexión: Pool y Connection
// Yo elijo pool porque creo q era mejor en terminos de memoria y control de cache
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "proyecto milos",
  });

  // QueryIn es una función que llamas cuando quieras trabajar con la base de datos
  // En caso de no tener esta función, tendrías que poner todo este texto en cada función sql
// function QueryIn (string, values){
//     return await new Promise ((respuesta, fallo) => {
//         connection.Query(string, values, (err, res) => {
//             if (err) fallo(err);
//             respuesta (res);
//         })
//     });
// }
// Las diferentes funciones que hagas, tenés que 
async function SelId(nombre){
    let consulta = ""; // Acá poné la consulta
    let respuesta = await QueryIn(consulta, [nombre]);
    if (respuesta instanceof Error){
        console.log(respuesta);
    } 
}
async function QueryIn(string, values) {
    try {
        const [results] = await connection.execute(string, values);
        return results;
    } catch (error) {
        throw error;
    }
}
 
async function RegistrarUsuario(nombre, contraseña, email) {
    const consulta = "INSERT INTO datos_user (Nombre_Usuario, Email, Contraseña) VALUES (?, ?, ?)";
    const values = [nombre, contraseña, email];
    try {
        const respuesta = await QueryIn(consulta, values);
        console.log("Usuario insertado correctamente:", respuesta);
    } catch (error) {
        console.error("Error al insertar usuario:", error);
    }
}
async function RegistrarHijo(nombreHijo, generoHijo, edadHijo, idUsuario) {
    const consulta = "INSERT INTO datos_hijos (Nombre_Hijo, Genero_Hijo, Edad_Hijo) VALUES (?, ?, ?)";
    const values = [nombreHijo, generoHijo, edadHijo, idUsuario];

    try {
        const respuesta = await QueryIn(consulta, values);
        console.log("Hijo insertado correctamente:", respuesta);
    } catch (error) {
        console.error("Error al insertar hijo:", error);
    }
}
async function iniciarSesion(nombreUsuario, contraseña) {
    try {
        // Consulta SQL para obtener el usuario con el nombre proporcionado
        const query = "SELECT * FROM datos_user WHERE Nombre_Usuario = ?";
        const [results] = await connection.execute(query, [nombreUsuario]);

        if (results.length === 0) {
            // El usuario no existe
            return { loggedIn: false, message: "Usuario no encontrado" };
        }

        const usuario = results[0];

        // Comparar la contraseña proporcionada con la almacenada (usando bcrypt)
        const match = await bcrypt.compare(contraseña, usuario.Contraseña);

        if (match) {
            // Usuario autenticado
            return { loggedIn: true, message: "Inicio de sesión exitoso" };
        } else {
            // Contraseña incorrecta
            return { loggedIn: false, message: "Credenciales incorrectas" };
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
}


module.exports = {RegistrarHijo, RegistrarUsuario, iniciarSesion};


// boton iniciar sesion: nombre usuario y contraseña.
// boton registrarse: nombre de usuario, email y contraseña.
//generar perfil nombre de hijo, genero. 
//que emocion: enojado, miedo, tristeza, aburrimiento.
 