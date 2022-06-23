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
app.post("/", (req, res) => {
  try {
    const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call 	OBTENER_PERMISOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
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




app.post("/buscar_permiso", (req, res) => {
    const { NOM_PERMISO } = req.body;
    try {
        const permiso =  `call 	CONTEO_PERMISO('${NOM_PERMISO}')`;
        conn.query(permiso,(error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                if (results[0][0].NOM_PERMISO > 0) {
                    res.json({ Message: `${NOM_PERMISO}` });
                }
                else {
                    
        
                }
            }
        
             
        });
    } catch (error) {
        console.log(error);
        res.send("0");
    }
  
});

app.post("/pendientes", (req, res) => {
    try {
      const { NOM_PERMISO, COD_ROL } = req.body;
      const consulta = `call 	OBTENER_PERMISOS_PENDIENTES('${NOM_PERMISO}',${COD_ROL} )`;
      conn.query(consulta, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
              res.json(results);
          }  
      })
    } catch (error) {
        console.log(error);
        res.send("0");
    }
  
});


    
app.post("/roles", (req, res) => {
    try {
      const {ROL } = req.body;
      const consulta = `call 	OBTENER_PERMISOS_ROLES('${ROL}')`;
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

//nuevo Permiso
app.post("/nuevo", (req, res) => {
    try {
        const { CREAR,LEER, EDITAR,BORRAR,COD_ROL, COD_MODULO,NOM_PERMISO  } = req.body;
        const consulta = `call 	NUEVO_PERMISO(${CREAR},${LEER},${EDITAR},${BORRAR},${COD_ROL},${COD_MODULO},'${NOM_PERMISO}')`;
                    conn.query(consulta, error => {
                        if (error) throw error;
                        res.json({
                            message : "Permisos asignado Con Exito",
                            estado: "ok"
                        })
                    });
       
       
    } catch (error) {
        console.log(error);
        res.json({
            message : "Verificar los parametros solicitados",
            parametros_solicitados: {
                "CREAR":"",
                "LEER":"",
                "EDITAR":"",
                "BORRAR":"",
                "COD_ROL":"",
                "COD_MODULO":""
            }
        });
    } 

   
});


// Registro actualizar datos del rol
app.put('/actualizar', (req, res) => {
    try {
        const { CREAR,LEER, EDITAR,BORRAR,COD_ROL, COD_MODULO,COD_PERMISO,COD_USUARIO,NOM_USUARIO,_CODMODULO } = req.body;
       
        const consulta = `call ACTUALIZAR_PERMISO(${CREAR},${LEER},${EDITAR},${BORRAR},${COD_ROL},${COD_MODULO},${COD_PERMISO},${COD_USUARIO},'${NOM_USUARIO}',${_CODMODULO})`;
    
        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message : "La Actualización de permisos se realizo Con Exito",
                estado: "ok"
            })
        }); 
    } catch (error) {
        console.log(error);
        res.json({
            message : "Verificar los parametros solicitados",
            parametros_solicitados: {
                "CREAR":"",
                "LEER":"",
                "EDITAR":"",
                "BORRAR":"",
                "COD_ESTADO":"",
                "COD_ROL":"",
                "COD_MODULO":"",
                "COD_PERMISO":"",
                "COD_USUARIO":"",
                "NOM_USUARIO":"" 
                
            }
        });
    }
    
});

  


module.exports = app;