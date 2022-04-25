const express = require('express');

const mysqldump = require('mysqldump');
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

// or const mysqldump = require('mysqldump')

// dump the result straight to a file
app.post('/', (req, res) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var FECHA = date;
    mysqldump({

        connection: {
            host: process.env.SERVER,
            user: process.env.USER,
            password: process.env.PASS,
            database: process.env.DB,
        },
        dumpToFile: './public/respaldos/tienda_artesania'+FECHA+'.sql',
    });
   
    res.json({
       message:"respaldo_creado"
    })
})

app.post("/nuevo", (req, res) => {
    try {
        const { RESPALDO, COD_USUARIO} = req.body;
        const consulta = `call 	NUEVO_RESPALDO('${RESPALDO}',${COD_USUARIO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message: "copia creada Con Exito",
            })
        });
    } catch (error) {
        console.log(error);
        res.send(error)
    }

})



app.post("/consultar", (req, res) => {
    try {
        
        const consulta = `call 	OBTENER_RESPALDOS()`;
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