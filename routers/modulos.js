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

// Obenter todo los Modulos 
app.get("/", (req, res) => {
  try {
    const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call 	OBTENER_MODULOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        }  
    })
  } catch (error) {
      console.log(error);
    res.json({
        message : "Verificar los parametros solicitados",
        parametros_solicitados: {
            "NOM_USUARIO":"",
            "COD_USUARIO":"",
            "COD_MODULO":"",
        }
    });
  }

});


//nuevo Modulo
app.post("/nuevo", (req, res) => {
    try {
        const { NOM_MODULO,COD_USUARIO } = req.body;
        const consulta = `call 	NUEVO_MODULO('${NOM_MODULO}',${COD_USUARIO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message : "Modulo Creado Con Exito",
                Modulo: NOM_MODULO
            })
             
        });
    } catch (error) {
        console.log(error);
        res.json({
            message : "Verificar los parametros solicitados",
            parametros_solicitados: {
                "NOM_MODULO":"",
                "COD_USUARIO":""
            }
        });
    } 
});



// Registro actualizar datos del modulo
app.put('/actualizar', (req, res) => {
    try {
        const { NOM_MODULO,NOM_USUARIO,COD_USUARIO, COD_MODULO} = req.body;
        const consulta = `call 	ACTUALIZAR_MODULOS('${NOM_MODULO}','${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message : "La Actualización se realizo Con Exito",
                Modulo: NOM_MODULO
            })
        }); 
    } catch (error) {
        console.log(error);
        res.json({
            message : "Verificar los parametros solicitados",
            parametros_solicitados: {
                "NOM_MODULO":"",
                "COD_USUARIO":"",
                "NOM_USUARIO":"",
                "COD_MODULO":""
            }
        });
    }
          
});

  


module.exports = app;