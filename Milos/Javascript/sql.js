const mysql = require("mysql2");
const bcrypt = require("bcrypt");
"use strict";

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "proyecto milos",
});

async function SelId(nombre) {
    let consulta = "";
    let respuesta = await QueryIn(consulta, [nombre]);
    if (respuesta instanceof Error) {
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
        const query = "SELECT * FROM datos_user WHERE Nombre_Usuario = ?";
        const [results] = await connection.execute(query, [nombreUsuario]);

        if (results.length === 0) {
            return { loggedIn: false, message: "Usuario no encontrado" };
        }

        const usuario = results[0];
        const hashedPassword = bcrypt.hashSync(contraseña, 10);

        const match = await bcrypt.compare(hashedPassword, usuario.Contraseña);

        if (match) {
            return { loggedIn: true, message: "Inicio de sesión exitoso" };
        } else {
            return { loggedIn: false, message: "Credenciales incorrectas" };
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
}

module.exports = { RegistrarHijo, RegistrarUsuario, iniciarSesion };
