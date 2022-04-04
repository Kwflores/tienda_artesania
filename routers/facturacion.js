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


// Obenter todo los pedidos facturados 
app.get("/", (req, res) => {
    try {
        const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call 	OBTENER_PEDIDOS_FACTURADOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
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


//nueva facturacion de pedido 
app.post("/nuevo", (req, res) => {
    try {
        const { CANT_PRODUCTO, PR_PRODUCTO, MON_PEDIDO, COS_ENVIO, COD_PRODUCTO, COD_PAGO, COD_USUARIO, COD_MODULO, COD_PERSONA, COD_DIRECCION } = req.body;
        const consulta = `call 	NUEVO_PEDIDO_FACTURADO('${CANT_PRODUCTO}',${PR_PRODUCTO},${MON_PEDIDO},${COS_ENVIO},${COD_PRODUCTO},${COD_PAGO},${COD_MODULO},${COD_USUARIO},${COD_PERSONA},${COD_DIRECCION})`;
        conn.query(consulta, error => {
            if (error) {
                res.json({
                    message: "Verificar los parametros solicitados",
                    parametros_solicitados: {
                        "CANT_PRODUCTO": "",
                        "PR_PRODUCTO": "",
                        "MON_PEDIDO": "",
                        "COS_ENVIO": "",
                        "COD_PRODUCTO": "",
                        "COD_PAGO": "",
                        "COD_MODULO": "",
                        "COD_USUARIO": "",
                        "COD_PERSONA": "",
                        "COD_DIRECCION": ""

                    }
                });
            };
            res.json({
                message: "Pedido Facturado Con Exito",
            })

        });

    } catch (error) {
        res.send(0);

    }

});




// Registro actualizar datos del rol
app.put('/actualizar', (req, res) => {
    try {
        const { NOM_USUARIO, CANT_PRODUCTO, PR_PRODUCTO, MON_PEDIDO, COS_ENVIO, COD_PRODUCTO, COD_PAGO, COD_USUARIO, COD_MODULO, COD_PERSONA, COD_DIRECCION, COD_PEDIDO, COD_DETALLE, COD_ENCABEZADO } = req.body;
        const consulta = `call 	ACTUALIZAR_PEDIDO_FACTURADO	('${NOM_USUARIO}',${CANT_PRODUCTO},${PR_PRODUCTO},${MON_PEDIDO},${COS_ENVIO},${COD_PRODUCTO},${COD_PAGO},${COD_MODULO},${COD_USUARIO},${COD_PERSONA},${COD_DIRECCION},${COD_PEDIDO},${COD_DETALLE},${COD_ENCABEZADO})`;
        conn.query(consulta, error => {
            if (error) {
                res.json({
                    message: "Verificar los parametros solicitados",
                    parametros_solicitados: {
                        "NOM_USUARIO": "",
                        "CANT_PRODUCTO": "",
                        "PR_PRODUCTO": "",
                        "MON_PEDIDO": "",
                        "COS_ENVIO": "",
                        "COD_PRODUCTO": "",
                        "COD_PAGO": "",
                        "COD_MODULO": "",
                        "COD_USUARIO": "",
                        "COD_PERSONA": "",
                        "COD_DIRECCION": "",
                        "COD_PEDIDO": "",
                        "COD_DETALLE": "",
                        "COD_ENCABEZADO": ""
                    }
                });
            };
            res.json({
                message: "Pedido Actualizado Con Exito",
            })

        });

    } catch (error) {
        console.log(error);
        res.send(0);
    }

});




module.exports = app;