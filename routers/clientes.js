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

// Registro de usuarios en la ruta agregar
app.post("/", (req, res) => {
    try {
        const { NOM_PERSONA, USER_EMAIL, NUM_CEL, NOM_USUARIO, CLAVE, NOM_IDENTIFICACION, COD_IDENTIFICACION, DIRECCION, COD_ROL,
            COD_MODULO } = req.body;
        var conteoExistencia = `call CONTEO_USUARIO('${NOM_USUARIO}','${USER_EMAIL}');`;
        conn.query(conteoExistencia, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                if (results[0][0].numero_usuario > 0) {
                    res.json({Message:`El usuario ${NOM_USUARIO} ya existe, favor registra uno nuevo.!` });
                }
                else {
                    const consulta = `call NUEVO_USUARIO('${NOM_PERSONA}','${USER_EMAIL}',${NUM_CEL},'${NOM_USUARIO}','${CLAVE}','${NOM_IDENTIFICACION}','${COD_IDENTIFICACION}','${DIRECCION}',${COD_ROL},${COD_MODULO})`;
                    conn.query(consulta, (error, nuevo_usuario) => {
                        if (error) throw error;
                        if (nuevo_usuario.length > 0) {
                            res.json(nuevo_usuario[0]);
                        } else {
                            res.send("0")
                        }
                    });
                }
            }
        })
    } catch (error) {
        res.send("0");
    }

});
module.exports = app;