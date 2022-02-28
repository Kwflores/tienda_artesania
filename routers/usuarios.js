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

// Obenter todo los usuarios 
app.get("/", (req, res) => {
    const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call OBTENER_USUARIOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("0")
        }
    })

});


// Obenter  usuario por nombre
app.get("/buscar_usuario", (req, res) => {
    const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call BUSCAR_USUARIOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.send("0")
        }
    })

});

// Registro de usuarios en la ruta agregar
app.post("/nuevo", (req, res) => {
    const { NOM_PERSONA, USER_EMAIL, NUM_CEL, NOM_USUARIO, CLAVE, NOM_IDENTIFICACION, COD_IDENTIFICACION, DIRECCION, COD_ROL,
        COD_ESTADO, COD_MODULO } = req.body;
    const consulta = `call NUEVO_USUARIO('${NOM_PERSONA}','${USER_EMAIL}',${NUM_CEL},'${NOM_USUARIO}','${CLAVE}','${NOM_IDENTIFICACION}','${COD_IDENTIFICACION}','${DIRECCION}',${COD_ROL},${COD_ESTADO},${COD_MODULO})`;
    conn.query(consulta, error => {
        if (error) throw error;
        res.send("1")
    });

})

// Registro actualizar datos de usuarios
app.put('/actualizar', (req, res) => {
    const { COD_PERSONA, NOM_PERSONA, USER_EMAIL, NUM_CEL, NOM_USUARIO, NOM_IDENTIFICACION, COD_IDENTIFICACION, DIRECCION, COD_ROL,
        COD_ESTADO, COD_DIRECCION, COD_TIP_IDENTIFICACION, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call 	ACTUALIZAR_USUARIO(${COD_PERSONA},'${NOM_PERSONA}','${USER_EMAIL}',${NUM_CEL},'${NOM_USUARIO}','${NOM_IDENTIFICACION}','${COD_IDENTIFICACION}','${DIRECCION}',${COD_ROL},${COD_ESTADO},${COD_DIRECCION},${COD_TIP_IDENTIFICACION},${COD_USUARIO},${COD_MODULO})`;

    conn.query(consulta, error => {
        if (error) throw error;
        res.send("1")
    });
});

module.exports = app;