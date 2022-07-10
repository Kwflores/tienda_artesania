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
    const consulta = `call 	OBTENER_PARAMETROS()`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("0")
        }
    })

});

app.post("/fecha_vencimiento", (req, res) => {
    const consulta = `call 	OBTENER_PARAMETRO_fecha_vencimiento()`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("0")
        }
    })

});

app.post("/empresa", (req, res) => {
    const consulta = `call 	OBTENER_PARAMETRO_empresa()`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("0")
        }
    })

});
app.post("/intentos", (req, res) => {
    const consulta = `call 	OBTENER_PARAMETRO_intento()`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("0")
        }
    })

});


app.put("/nuevo", (req, res) => {
    try {
        const {VALOR, IDPARAMETRO,COD_USUARIO, COD_MODULO, CAMPO,REGISTRO,VALOR_ORIGINAL,VALOR_ACTUAL} = req.body;
        const consulta = `call ACTUALIZAR_PARAMETROS('${VALOR}','${IDPARAMETRO}','${COD_USUARIO}','${COD_MODULO}','${CAMPO}','${REGISTRO}','${VALOR_ORIGINAL}','${VALOR_ACTUAL}')`;
        conn.query(consulta, (error) => {
            if (error)  throw error;
                res.json({
                    PARAMETRO: 'OK'
                })
         

        });

    } catch (error) {
        res.send("0")
    }
});
module.exports = app;