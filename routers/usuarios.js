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
app.post("/", (req, res) => {
    try {
        const consulta = `call OBTENER_USUARIOS()`;
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





// Obenter  usuario por nombre
app.get("/buscar_usuario", (req, res) => {
    try {
        const { NOM_USUARIO } = req.body;
        const consulta = `call BUSCAR_USUARIOS('${NOM_USUARIO}')`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.send("0")
            }
        })
    } catch (error) {
        res.send("0")
    }
});


app.post("/buscar", (req, res) => {
    try {
        const { NOM_USUARIO } = req.body;
        const consulta = `call BUSCAR_USUARIOS('${NOM_USUARIO}')`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                pass = results[0][0].Clave
                var clave = pass.toString('utf8');
                res.json({data:results[0],clave: clave });
             
            } else {
                res.send("0")
            }
        })
    } catch (error) {
        res.send("0")
    }
});

// Registro de usuarios en la ruta agregar
app.post("/nuevo", (req, res) => {
    try {
        const { NOM_PERSONA, USER_EMAIL, NUM_CEL, NOM_USUARIO, CLAVE, NOM_IDENTIFICACION, COD_IDENTIFICACION, DIRECCION, COD_ROL,
            COD_MODULO,COD_ESTADO,FECHA_VENCIMIENTO,CAMPO,COD_USUARIO} = req.body;
        var conteoExistencia = `call CONTEO_USUARIO('${NOM_USUARIO}','${USER_EMAIL}');`;
        conn.query(conteoExistencia, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                if (results[0][0].numero_usuario > 0) {
                    res.json({ Message: `El usuario ${NOM_USUARIO} ya existe, favor registra uno nuevo.!` });
                }
                else {
                    const consulta = `call NUEVO_USUARIO('${NOM_PERSONA}','${USER_EMAIL}',${NUM_CEL},'${NOM_USUARIO}','${CLAVE}','${NOM_IDENTIFICACION}','${COD_IDENTIFICACION}','${DIRECCION}',${COD_ROL},${COD_MODULO},${COD_ESTADO},'${FECHA_VENCIMIENTO}','${CAMPO}','${COD_USUARIO}')`;
                    conn.query(consulta, (error, nuevo_usuario) => {
                        if (error) throw error;
                        if (nuevo_usuario.length > 0) {
                            res.json(nuevo_usuario[0]);
                        }
                        
                    });

                }
            }
        })
    } catch (error) {
        res.send("0");
    }

});



// Registro actualizar datos de usuarios
app.put('/actualizar', (req, res) => {
    try {
        const { COD_PERSONA, NOM_PERSONA, USER_EMAIL, NUM_CEL, NOM_IDENTIFICACION, COD_IDENTIFICACION, DIRECCION, COD_ROL,COD_ESTADO,
           COD_USUARIO } = req.body;
        const consulta = `call 	ACTUALIZAR_USUARIO(${COD_PERSONA},'${NOM_PERSONA}','${USER_EMAIL}',${NUM_CEL},'${NOM_IDENTIFICACION}','${COD_IDENTIFICACION}',
        '${DIRECCION}',${COD_ROL},${COD_ESTADO},'${COD_USUARIO}' )`;

        conn.query(consulta, error => {
            if (error) throw error;
            res.send("1");
        });
    } catch (error) {
        res.send("0");
    }

});

app.put("/usuario_bloqueado", (req, res) => {
    try {
        const {NOM_USUARIO} = req.body;
            const consulta = `call BLOQUEAR_ESTADO_USUARIO( '${NOM_USUARIO}' )`;
            conn.query(consulta, error => {
                if (error) throw error;
                res.send("bloqueado");
            });
       
    } catch (error) {
        res.send("0")
    }

});


app.put("/usuario_estado", (req, res) => {
    try {
        const {COD_ESTADO, COD_USUARIO, COD_MODULO, REGISTRO,COD_USUARIOS} = req.body;
        console.log(COD_ESTADO)
        if (COD_ESTADO == 1) {
            INACTIVO=2
            const consulta = `call ACTUALIZAR_ESTADO_USUARIO(${INACTIVO},${COD_USUARIO},${COD_MODULO},'ESTADO DE USUARIO',${REGISTRO},'ACTIVO','INACTIVO',${COD_USUARIOS})`;
            conn.query(consulta, error => {
                if (error) throw error;
                res.send("Inactivo");
            });
           
            
        }
        else {
            ACTIVO= 1
            const consulta = `call ACTUALIZAR_ESTADO_USUARIO(${ACTIVO},${COD_USUARIO},${COD_MODULO},'ESTADO DE USUARIO',${REGISTRO},'INACTIVO','ACTIVO',${COD_USUARIOS})`;
            conn.query(consulta, error => {
                if (error) throw error;
                res.send("Activo");
            });
        }
    } catch (error) {
        res.send("0")
    }

});



// Obenter preguntas y respuestas de  usuarios 
app.get("/seguridad", (req, res) => {
    try {
        const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call OBTENER_PREGUNTAS_SEGURIDAD('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
            }
        })
    } catch (error) {
        res.send("0");
    }

});



// Registro de preguntas de  usuario
app.post("/nueva_pregunta", (req, res) => {
    try {
        const { DES_PREGUNTA, DES_RESPUESTA, NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call 	NUEVA_PREGUNTA_SEGURIDAD('${DES_PREGUNTA}','${DES_RESPUESTA}','${NOM_USUARIO}',1,${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.send("1")
        });
    } catch (error) {
        res.send("0");
    }

})

// Registro actualizar preguntas de  usuario
app.put('/actualizar_pregunta', (req, res) => {
    try {
        const { DES_PREGUNTA, DES_RESPUESTA, NOM_USUARIO, COD_USUARIO, COD_MODULO, COD_PREGUNTAS, COD_RESPUESTA, COD_ESTADO } = req.body;
        const consulta = `call ACTUALIZAR_PREGUNTA_SEGURIDAD('${DES_PREGUNTA}','${DES_RESPUESTA}','${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO},${COD_PREGUNTAS},${COD_RESPUESTA},${COD_ESTADO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.send("1")
        });
    } catch (error) {
        res.send("0");
    }
});

// Registro actualizar datos de usuarios
app.put('/clave', (req, res) => {
    try {
        const { CLAVE, NOM_USUARIO, COD_USUARIO, COD_MODULO,COD_ESTADO,FECHA_VENCIMIENTO} = req.body;
        const consulta = `call ACTUALIZAR_CLAVE('${CLAVE}','${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO},${COD_ESTADO},'${FECHA_VENCIMIENTO}')`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.json({Message:"Actualizacion de Clave por medio del nombre de usuario"});
        });
    } catch (error) {
        res.send("0");

    }

});
module.exports = app;