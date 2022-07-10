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


app.post("/nuevo", (req, res) => {
    try {
        const {COD_USUARIO, COD_MODULO, CAMPO,REGISTRO,VALOR_ORIGINAL,VALOR_ACTUAL} = req.body;
        const consulta = `call NUEVO_BITACORA('${COD_USUARIO}','${COD_MODULO}','${CAMPO}','${REGISTRO}','${VALOR_ORIGINAL}','${VALOR_ACTUAL}')`;
        conn.query(consulta, (error) => {
            if (error)  throw error;
                res.json({
                    BITACORA: 'OK'
                })
         

        });

    } catch (error) {
        res.send("0")
    }
});
module.exports = app;