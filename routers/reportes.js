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

app.get("/tota_productos", (req, res) => {
    try {
        const consulta = `call total_productos()`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
               
            }
        })
    } catch (error) {
        res.send("0")
    }

});

app.get("/tota_ventas", (req, res) => {
    try {
        const consulta = `call total_ventas()`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
                console.log(results[0][0].Usuario);
            }
        })
    } catch (error) {
        res.send("0")
    }

});

app.get("/tota_clientes", (req, res) => {
    try {
        const consulta = `call CONTEO_CLIENTES()`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
                console.log(results[0][0].Usuario);
            }
        })
    } catch (error) {
        res.send("0")
    }

});

app.get("/tota_usuarios", (req, res) => {
    try {
        const consulta = `call CONTEO_USUARIO_SYS()`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
                console.log(results[0][0].Usuario);
            }
        })
    } catch (error) {
        res.send("0")
    }

});

app.get("/total_categoria", (req, res) => {
    try {
        const consulta = `call TOTAL_CATEGORIA()`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
                console.log(results[0][0].Usuario);
            }
        })
    } catch (error) {
        res.send("0")
    }

});

app.get("/producto_vendidos", (req, res) => {
    try {
       
        const consulta = `call PRODUCTO_VENDIDO()`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
                 
            }
        })
    } catch (error) {
        res.send("0")
    }

});

module.exports = app;