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
app.post("/", (req, res) => {
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


app.post("/sku", (req, res) => {
    try {
        const { SKU } = req.body;
        const consulta = `call 	BUSCAR_PRODUCTO_SKU(${SKU})`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            console.log(results.length > 0)
            if (results[0].length > 0) {
                res.json(results);
            }else{
                res.send("SKU inhabilitado")
            }
        })
    } catch (error) {
        res.send(0);
    }

});


// Obenter inventario de productos
app.post("/inventario", (req, res) => {
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
                    res.json({ Message: `EL SKU: ${SKU} ya existe, favor registra uno nuevo.!` });
                }
                else {
                    const consulta = `call 	NUEVO_INVENTARIO_PRODUCTOS(${SKU},'${NOM_PRODUCTO}','${DES_PRODUCTO}','${URL_IMG}',${COD_CATEGORIA},${COD_PROVEEDOR},${CAN_INICIAL},${CAN_ENTRADAS},${CAN_SALIDAS},${STOCK},${PR_PRODUCTO},${COD_USUARIO},${COD_MODULO})`;
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
                        else {
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




app.put("/productos_estado", (req, res) => {
    try {
        const { NOM_USUARIO, COD_ESTADO, COD_USUARIO, COD_MODULO, COD_PRODUCTO } = req.body;
        console.log(COD_ESTADO)

        const consulta = `call 	ACTUALIZAR_ESTADO_PRODUCTOS('${NOM_USUARIO}',${COD_ESTADO},${COD_USUARIO},${COD_MODULO},${COD_PRODUCTO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.send("Inactivo");
        });

    } catch (error) {
        res.send("0")
    }

});


// Actualizar producto inventariado 
app.put('/actualizar', (req, res) => {
    try {
        const { SKU, NOM_USUARIO, NOM_PRODUCTO, DES_PRODUCTO, URL_IMG, COD_CATEGORIA, COD_PROVEEDOR,
            PR_PRODUCTO, COD_USUARIO, COD_MODULO, COD_INVENTARIO, COD_PRODUCTO } = req.body;
        const consulta = `call 	ACTUALIZAR_DATOS_PRODUCTOS('${SKU}','${NOM_USUARIO}','${NOM_PRODUCTO}','${DES_PRODUCTO}',
        '${URL_IMG}',${COD_CATEGORIA},${COD_PROVEEDOR},${PR_PRODUCTO},${COD_USUARIO},${COD_MODULO},${COD_INVENTARIO},${COD_PRODUCTO})`;

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

//actualizar inventario 
app.put('/actualizar_inventario', (req, res) => {

    try {
        const { COD_INVENTARIO, ENTRADAS, STOCK, COD_MODULO, COD_USUARIO } = req.body;
        const consulta = `call 	ACTUALIZAR_INVENTARIO(${COD_INVENTARIO},${ENTRADAS},${STOCK},${COD_MODULO},${COD_USUARIO})`;

        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message: "Inventario actualizado Con Exito",
            })
        });
    } catch (error) {
        res.send(0);
    }
})
//eliminar producto 
app.delete('/eliminar', async (req, res) => {
    try {
        const { SKU, NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;

        const consulta = `call CONTEO_sku('${SKU}')`;
        conn.query(consulta, (error, results) => {
            if (results.length > 0) {
                const consulta = `call OBTENER_PEDIDOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
                conn.query(consulta, (error, result) => {
                    console.log(result[0][0].SKU)
                    if(result[0][0].SKU == SKU){
                     return  res.json("Registro contiene un historial de pedidos")
                    }
                    

                    if (results[0][0].numero_sku > 0) {
                        const consulta = `call 	ELIMINAR_PRODUCTO(${SKU},'${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
                        conn.query(consulta, (error, results) => {
                            if (error) throw error;

                            res.json({
                                message: "Registro Eliminado",
                            })
                        })
                    } else {

                        res.json({
                            message: "Registro No Eliminado, introduzca un SKU valido",
                            SKU: SKU

                        })

                    }
                })
            }

        })


    } catch (error) {
        res.send(0);
    }
});


module.exports = app;