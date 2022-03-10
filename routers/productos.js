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

// Obenter todo los productos
app.get("/", (req, res) => {
    try {
        const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call 	OBTENER_PRODUCTO('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, (error, results) => {
            if (error) {
                res.json({
                    message: "Verificar los parametros solicitados",
                    parametros_solicitados: {
                        "NOM_USUARIO": "",
                        "COD_USUARIO": "",
                        "COD_MODULO": ""
                    }
                });
            }
            if (results.length > 0) {
                res.json(results);
            }
        })
    } catch (error) {
        res.send(0);
    }

});




// Obenter inventario de productos
app.get("/inventario", (req, res) => {
    try {
        const { NOM_CATEGORIA, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call 	OBTENER_INVENTARIO('${NOM_CATEGORIA}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, (error, results) => {
            if (error) {
                res.json({
                    message: "Verificar los parametros solicitados",
                    parametros_solicitados: {
                        "NOM_USUARIO": "",
                        "COD_USUARIO": "",
                        "COD_MODULO": ""
                    }
                });
            };
            if (results.length > 0) {
                res.json(results);
            }

        })
    } catch (error) {
        res.send(0);
    }
});

// Agregar nueva producto
app.post("/nuevo", (req, res) => {
    try {
        const { SKU, NOM_PRODUCTO, DES_PRODUCTO, URL_IMG, COD_CATEGORIA, COD_PROVEEDOR, CAN_INICIAL, CAN_ENTRADAS, CAN_SALIDAS, STOCK,
            PR_PRODUCTO, COD_USUARIO, COD_MODULO } = req.body;
        var conteoExistencia = `call CONTEO_sku('${SKU}');`;
        conn.query(conteoExistencia, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                if (results[0][0].numero_sku > 0) {
                    res.send(`EL SKU: ${SKU} ya existe, favor registra uno nuevo.!`);
                }

                else {
                    const consulta = `call 	NUEVO_INVENTARIO_PRODUCTOS(${SKU},'${NOM_PRODUCTO}','${DES_PRODUCTO}','${URL_IMG}',1,${COD_CATEGORIA},${COD_PROVEEDOR},${CAN_INICIAL},${CAN_ENTRADAS},${CAN_SALIDAS},${STOCK},${PR_PRODUCTO},${COD_MODULO},${COD_USUARIO})`;
                    conn.query(consulta, (error) => {
                        if (error) {
                            res.json({
                                message: "Verificar los parametros solicitados",
                                parametros_solicitados: {
                                    "SKU": "",
                                    "NOM_PRODUCTO": "",
                                    "DES_PRODUCTO": "",
                                    "URL_IMG": "",
                                    "COD_CATEGORIA": "",
                                    "COD_PROVEEDOR": "",
                                    "CAN_INICIAL": "",
                                    "CAN_ENTRADAS": "",
                                    "CAN_SALIDAS": "",
                                    "STOCK": "",
                                    "PR_PRODUCTO": "",
                                    "COD_MODULO": "",
                                    "COD_USUARIO": ""

                                }
                            });
                        }
                                                else{
                                res.json({
                                    message: "Inventario de Producto creado Con Exito",
                                    SKU: SKU
                                })
                        }
                    });
                }
            }
        })
    } catch (error) {
        res.send(0)
    }
});


// Actualizar producto inventariado 
app.put('/actualizar', (req, res) => {
    try {
        const { SKU, NOM_USUARIO, NOM_PRODUCTO, DES_PRODUCTO, URL_IMG, COD_ESTADO, COD_CATEGORIA, COD_PROVEEDOR, CAN_INICIAL, CAN_ENTRADAS, CAN_SALIDAS, STOCK,
            PR_PRODUCTO, COD_USUARIO, COD_MODULO, COD_INVENTARIO, COD_PRODUCTO } = req.body;
        const consulta = `call 	ACTUALIZAR_INVENTARIO_PRODUCTOS('${SKU}','${NOM_USUARIO}','${NOM_PRODUCTO}','${DES_PRODUCTO}','${URL_IMG}',${COD_ESTADO},${COD_CATEGORIA},${COD_PROVEEDOR},${CAN_INICIAL},${CAN_ENTRADAS},${CAN_SALIDAS},${STOCK},${PR_PRODUCTO},${COD_MODULO},${COD_USUARIO},${COD_INVENTARIO},${COD_PRODUCTO})`;

        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message: "SKU actualizado Con Exito",
                SKU: SKU
            })
        });
    } catch (error) {
        res.send(0);
    }

});

//eliminar producto 
app.delete('/eliminar', async (req, res) => {
    try {
        const { SKU, NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;

        const consulta = `call CONTEO_sku('${SKU}')`;
        conn.query(consulta, (error, results) => {
            if (results.length > 0) {
                if (results[0][0].numero_sku > 0) {
                    const consulta = `call 	ELIMINAR_PRODUCTO(${SKU},'${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
                    conn.query(consulta, (error, results) => {
                        if (error) {
                            res.json({
                                message: "Verificar los parametros solicitados",
                                parametros_solicitados: {
                                    "COD_PRODUCTO": "",
                                    "NOM_USUARIO": "",
                                    "COD_USUARIO": "",
                                    "COD_MODULO": "",
                                }
                            });
                        };
                      
                        res.json({
                            message: "Registro Eliminado, ",
                        })
    
                    })
                } else {
                      
                    res.json({
                        message: "Registro No Eliminado, introduzca un SKU valido",
                        SKU: SKU
    
                        
                    })
    
                }
            }
            
        })


    } catch (error) {
        res.send(0);
    }
});


module.exports = app;