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

// Obenter todo las categorias 
app.get("/", (req, res) => {
    try {
        const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call 	OBTENER_CATEGORIAS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
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

// Obenter productos por categoria
app.get("/productos_categoria", (req, res) => {
    try {
        const { COD_CATEGORIA, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call OBTENER_PRODUCTOS_CATEGORIA(${COD_CATEGORIA},${COD_USUARIO},${COD_MODULO})`;
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

// Agregar nueva categoria 
app.post("/nuevo", (req, res) => {
    try {
        const { NOM_CATEGORIA, DES_CATEGORIA, URL_IMG, COD_MODULO, COD_USUARIO } = req.body;
        var conteoExistencia = `call CONTEO_CATEGORIA('${NOM_CATEGORIA}');`;
        conn.query(conteoExistencia, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                if (results[0][0].numero_categoria > 0) {
                    res.send(`La categoria: ${NOM_CATEGORIA} ya existe, favor registra una nueva.!`);
                }
                else {
                    const consulta = `call NUEVA_CATEGORIA('${NOM_CATEGORIA}','${DES_CATEGORIA}','${URL_IMG}',1,${COD_MODULO},${COD_USUARIO})`;
                    conn.query(consulta, (error) => {
                        if (error) {
                            res.json({
                                message: "Verificar los parametros solicitados",
                                parametros_solicitados: {
                                    "NOM_CATEGORIA": "",
                                    "DES_CATEGORIA": "",
                                    "URL_IMG": "",
                                    "COD_MODULO": "",
                                    "COD_USUARIO": ""

                                }
                            });
                        }
                        else {
                            res.json({
                                message: "Categoría creada Con Exito",
                                Categoría: NOM_CATEGORIA
                            })
                        }

                    });
                }
            }
        })

    } catch (error) {
        res.send("0")
    }
});


// Actualizar Categoria
app.put('/actualizar', (req, res) => {
    try {
        const { COD_CATEGORIA, NOM_CATEGORIA, DES_CATEGORIA, URL_IMG, COD_ESTADO, COD_MODULO, COD_USUARIO } = req.body;
        const consulta = `call 	ACTUALIZAR_CATEGORIA(${COD_CATEGORIA},'${NOM_CATEGORIA}','${DES_CATEGORIA}','${URL_IMG}',${COD_ESTADO},${COD_MODULO},${COD_USUARIO})`;

        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message: "Categoría actualizada Con Exito",
                Categoría: NOM_CATEGORIA
            })
        });
    } catch (error) {
        res.send("0")
    }

});

//eliminar Categoria 
app.delete('/eliminar', async (req, res) => {
    try {
        const { COD_CATEGORIA, NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        var existe = false;
        var conteoExistencia = `call OBTENER_PRODUCTOS_CATEGORIA(${COD_CATEGORIA},${COD_USUARIO},${COD_MODULO})`;
        conn.query(conteoExistencia, (error, results) => {
            if (error) throw error;
            if (results[0][0]) {
                console.log(results[0][0].COD_CATEGORIA == COD_CATEGORIA);
                if (results[0][0].COD_CATEGORIA == COD_CATEGORIA) {
                    return res.json({
                        message: "Registro No puede eliminarse, contiene productos asociados",
                        COD_CATEGORIA: COD_CATEGORIA

                    });
                }
            } else {
                const consulta = `call 	OBTENER_CATEGORIAS_CODIGO(${COD_CATEGORIA},'${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
                conn.query(consulta, (error, results) => {
                    if (results[0][0]) {
                        console.log(results[0][0].COD_CATEGORIA == COD_CATEGORIA)
                        if (results[0][0].COD_CATEGORIA == COD_CATEGORIA) {
                            const consulta = `call 	ELIMINAR_CATEGORIA(${COD_CATEGORIA},'${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
                            conn.query(consulta, (error, results) => {
                                res.json({
                                    message: "Registro se elimino correctamente",
                                    COD_CATEGORIA: COD_CATEGORIA
                                });
                            })
                        }

                    } else {
                        res.json({ message: "Categoria No valida" });
                    }

                })
            }
        });
    } catch (e) {
        res.send("0");
    }
});



module.exports = app;