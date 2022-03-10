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

// Obenter todo las proveedors 
app.get("/", (req, res) => {
    try {
        const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call  OBTENER_PROVEEDORES	('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
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


// Agregar nueva proveedor 
app.post("/nuevo", (req, res) => {
    try {
        const { NOM_PROVEEDOR, DIRECCION, NUM_CEL, USER_EMAIL, COD_MODULO, COD_USUARIO } = req.body;

        const consulta = `call 	NUEVO_PROVEEDOR('${NOM_PROVEEDOR}','${DIRECCION}',${NUM_CEL},'${USER_EMAIL}',1,${COD_MODULO},${COD_USUARIO})`;
        conn.query(consulta, (error) => {
            if (error) {
                res.json({
                    message: "Verificar los parametros solicitados",
                    parametros_solicitados: {
                        "NOM_PROVEEDOR": "",
                        "DIRECCION": "",
                        "NUM_CEL": "",
                        "USER_EMAIL": "",
                        "COD_MODULO": "",
                        "COD_USUARIO": ""

                    }
                });
            }
            else {
                res.json({
                    message: "Proveedor creada Con Exito",
                    Proveedor: NOM_PROVEEDOR
                });
            }
        });

    } catch (error) {
        res.send("0")
    }
});


// Actualizar proveedor
app.put('/actualizar', (req, res) => {
    try {
        const { NOM_USUARIO, NOM_PROVEEDOR, DIRECCION, NUM_CEL, USER_EMAIL, COD_ESTADO, COD_MODULO, COD_USUARIO, COD_PROVEEDOR } = req.body;
        const consulta = `call 	ACTUALIZAR_PROVEEDOR(${NOM_USUARIO},'${NOM_PROVEEDOR}','${DIRECCION}',${NUM_CEL},'${USER_EMAIL}',${COD_ESTADO},${COD_MODULO},${COD_USUARIO},${COD_PROVEEDOR})`;

        conn.query(consulta, error => {
            if (error) {
                res.json({
                    message: "Verificar los parametros solicitados",
                    parametros_solicitados: {
                        "NOM_USUARIO": "",
                        "NOM_PROVEEDOR": "",
                        "DIRECCION": "",
                        "NUM_CEL": "",
                        "USER_EMAIL": "",
                        "COD_ESTADO": "",
                        "COD_MODULO": "",
                        "COD_USUARIO": "",
                        "COD_PROVEEDOR": ""

                    }
                });
            }
            else {
                res.json({
                    message: "Categoría actualizada Con Exito",
                    Categoría: NOM_PROVEEDOR
                });
            }
        });
    } catch (error) {
        res.send("0")
    }

});

//eliminar proveedor
app.delete('/eliminar', async (req, res) => {
    try {
        const { COD_PROVEEDOR, NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const productos = `call 	OBTENER_PRODUCTO('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(productos, (error, results) => {
            // console.log(results[0][0].COD_PROVEEDORES);
            if (results[0][0].COD_PROVEEDORES == COD_PROVEEDOR) {
                res.json({
                    message: "Registro No Eliminado, este proveedor esta asociado con productos de inventario",
                    NOM_PROVEEDOR: results[0][0].NOM_PROVEEDOR
                })
            }

            // else if (COD_PROVEEDOR) {
            //     const proveedores = `call OBTENER_PROVEEDORES('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
            //     conn.query(proveedores, (error, results) => {
            //        try {
            //         for (const p of results[0]) {
            //             console.log(p.COD_PROVEEDORES)
            //             if (p.COD_PROVEEDORES == COD_PROVEEDOR) {
            //                 console.log(p.COD_PROVEEDORES)
            //                 console.log("si es igual")
            //                 const consulta = `call 	ELIMINAR_PROVEEDOR(${COD_PROVEEDOR},'${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
            //                 conn.query(consulta, () => {
            //                     res.json({
            //                         message: "Registro Eliminado",

            //                     });
            //                     return;
            //                 });
            //             }
                     
                    
            //         }
            //        } catch (error) {
            //         console.log(error)
            //        }
                    
            //     });
            // }   
             else {
                console.log("no existe")
                console.log("no es igual")
                res.send( "Registro no Eliminado, ingrese un COD_PROVEEDOR valido");
                return;
            }        
        })

        } catch (error) {
            res.send("0")
        }
    });


module.exports = app;