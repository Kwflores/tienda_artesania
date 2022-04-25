const express = require('express');
const app = express();
const conexion = require("mysql");
require('dotenv').config();

//Conexion a la base de datos
var conn = conexion.createConnection(
    {
        host: process.env.SERVER,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DB,
    }
);

// Obenter todo los registros de contactos 
app.post("/", (req, res) => {
    const consulta = `call 	OBTENER_BITACORA()`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("0")
        }
    })

});

module.exports = app;