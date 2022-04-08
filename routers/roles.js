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
 
// Obenter todo los roles 
app.get("/", (req, res) => {
  try {
    const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call OBTENER_ROLES('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
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

app.post("/", (req, res) => {
    try {
      const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
      const consulta = `call OBTENER_ROLES('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
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
  


//nuevo rol
app.post("/nuevo", (req, res) => {
    try {
        const { NOM_ROL,COD_USUARIO, COD_MODULO } = req.body;
        var conteoExistencia = `call CONTEO_ROL('${NOM_ROL}');`;
        conn.query(conteoExistencia, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                if (results[0][0].numero_rol > 0) {
                    res.send(`El Rol: ${NOM_ROL} ya existe, favor registra uno nuevo.!`);
                }
                else {
                    const consulta = `call 	NUEVO_ROL('${NOM_ROL}',1,${COD_USUARIO},${COD_MODULO})`;
                    conn.query(consulta, error => {
                        if (error) throw error;
                        res.json({
                            message : "Rol creado Con Exito",
                            Rol: NOM_ROL
                        })
                         
                    });
                }
            }   
        })
    } catch (error) {
        console.log(error);
        res.json({
            message : "Verificar los parametros solicitados",
            parametros_solicitados: {
                "NOM_ROL":"",
                "COD_USUARIO":"",
                "COD_MODULO":"",
            }
        });
    }
   
});



// Registro actualizar datos del rol
app.put('/actualizar', (req, res) => {
    try {
        const { NOM_ROL,NOM_USUARIO,COD_ESTADO,COD_USUARIO, COD_MODULO,COD_ROL } = req.body;
        const consulta = `call 	ACTUALIZAR_ROLES('${NOM_ROL}','${NOM_USUARIO}',${COD_ESTADO},${COD_USUARIO},${COD_MODULO},${COD_ROL})`;
    
        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message : "Actualización se realizo Con Exito",
                Rol: NOM_ROL
            })
        }); 
    } catch (error) {
        console.log(error);
        res.json({
            message : "Verificar los parametros solicitados",
            parametros_solicitados: {
                "NOM_ROL":"",
                "NOM_USUARIO":"",
                "COD_ESTADO":"",
                "COD_USUARIO":"",
                "COD_MODULO":"",
                "COD_ROL":""
            }
        });
    }
    
});

  


module.exports = app;