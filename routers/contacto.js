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
app.get("/", (req, res) => {
    const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call 	OBTENER_REGISTRO_CONTACTOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send("0")
        }
    })

});

// Registro de usuarios en la ruta agregar
app.post("/nuevo", (req, res) => {
    try {
        const { TIP_ASUNTO, USER_EMAIL, NUM_CEL, DES_MENSAJE, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call 	NUEVO_CONTACTO('${TIP_ASUNTO}','${USER_EMAIL}',${NUM_CEL},'${DES_MENSAJE}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message: "Contacto creado Con Exito",
                email: USER_EMAIL
            })
        });
    } catch (error) {
        res.json({
            message: "Verificar los parametros solicitados",
            parametros_solicitados: {
                "TIP_ASUNTO": "",
                "USER_EMAIL": "",
                "NUM_CEL": "",
                "DES_MENSAJE": "",
                "COD_USUARIO": "",
                "COD_MODULO": "",
            }
        });
    }

})


// Registro actualizar datos de usuarios
app.put('/actualizar', (req, res) => {
    try {

        
        const { COD_CONTACTO, TIP_ASUNTO, USER_EMAIL, NUM_CEL, DES_MENSAJE, NOM_USUARIO, COD_MODULO, COD_USUARIO } = req.body;
        const consulta = `call 	ACTUALIZAR_CONTACTO(${COD_CONTACTO},'${TIP_ASUNTO}','${USER_EMAIL}',${NUM_CEL},'${DES_MENSAJE}','${NOM_USUARIO}',${COD_MODULO},${COD_USUARIO})`;

        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message: "Contacto Actualizado Con Exito",
                email: USER_EMAIL
            })
        });
    } catch (error) {
        res.json({
            message: "Verificar los parametros solicitados",
            parametros_solicitados: {
                "COD_CONTACTO": "",
                "TIP_ASUNTO": "",
                "USER_EMAIL": "",
                "NUM_CEL": "",
                "DES_MENSAJE": "",
                "COD_USUARIO": "",
                "COD_MODULO": "",
            }
        });
    }
});

//eliminar contacto 
app.delete('/eliminar', async (req, res) => {
   try {
    const { COD_CONTACTO, NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call 	OBTENER_REGISTRO_CONTACTOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
    conn.query(consulta, (error, results) => {
        if (error) throw error;
        if (results[0][0].COD_CONTACTO  == COD_CONTACTO) {
            console.log(results[0][0].COD_CONTACTO)
            const consulta = `call 	ELIMINAR_CONTACTO(${COD_CONTACTO},'${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
            conn.query(consulta, error => {
                if (error) throw error;
                res.json({
                    message : "Registro Eliminado",
                })
            });

        } else {
            res.json({
                message: "Registro No Eliminado, introduzca un COD_CONTACTO valido",
                COD_CONTACTO: COD_CONTACTO
            })
        }
    })
   } catch (error) {
       res.send(0);
   }
});


module.exports = app;