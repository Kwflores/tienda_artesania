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
app.post("/", (req, res) => {
    try {
        const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call OBTENER_PEDIDOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
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

app.post("/pedidos_facturados", (req, res) => {
    try {
        const { ENCABEZADO } = req.body;
        const consulta = `call OBTENER_PEDIDOS_POR_ENCABEZADO(${ENCABEZADO})`;
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


app.post("/facturas", (req, res) => {
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
        const { CANT_PRODUCTO, PR_PRODUCTO, MON_PEDIDO, COS_ENVIO, COD_PRODUCTO, COD_PAGO, COD_USUARIO, COD_MODULO, COD_ENCABEZADO,COD_INVENTARIO,STOCK } = req.body;
        const consulta = `call 	NUEVO_PEDIDO_FACTURADO(${CANT_PRODUCTO},${PR_PRODUCTO},${MON_PEDIDO},${COS_ENVIO},${COD_PRODUCTO},${COD_PAGO},${COD_MODULO},${COD_USUARIO},${COD_ENCABEZADO},${COD_INVENTARIO},${STOCK})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message: "Pedido Facturado Con Exito",
            })

        });

    } catch (error) {
        res.send(0);

    }

});

//nueva facturacion de pedido 
app.post("/nuevo_encabezado", (req, res) => {
    try {
        const { COD_PERSONA, COD_USUARIO, DIRECCION, COD_MODULO,COS_ENVIO } = req.body;
        const consulta = `call 	NUEVO_ENCABEZADO('${COD_PERSONA}',${COD_USUARIO},'${DIRECCION}',${COD_MODULO},${COS_ENVIO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            const consulta = `call 	ULTIMO_REGISTRO()`;
            conn.query(consulta, (error, results)=> {
                if (error) throw error;
                if (results.length > 0) {
                    res.json(results);
                }
            });


        });

    } catch (error) {
        res.send(0);

    }

});




// Registro actualizar datos del rol
app.put('/actualizar', (req, res) => {
    try {
        const {CANT_PRODUCTO, PR_PRODUCTO, MON_PEDIDO, COS_ENVIO, COD_PRODUCTO,  COD_MODULO, COD_USUARIO, COD_PEDIDO, STOCK,COD_INVENTARIO, COD_PAGO,SALIDA} = req.body;
        const consulta = `call 	ACTUALIZAR_PEDIDO_FACTURADO	( ${CANT_PRODUCTO},${PR_PRODUCTO},${MON_PEDIDO},${COS_ENVIO},${COD_PRODUCTO},${COD_MODULO},${COD_USUARIO},${COD_PEDIDO},${STOCK},${COD_INVENTARIO},${COD_PAGO},${SALIDA})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.json({
                message: "Pedido Actualizado Con Exito",
            })

        });

    } catch (error) {
        console.log(error);
        res.send(0);
    }

});


// Registro actualizar datos del rol
app.put('/encabezado', (req, res) => {
    try {
        const {COD_USUARIO, COD_PERSONA, COD_DIRECCION, COD_ENCABEZADO,COD_MODULO,DIRECCION} = req.body;
        const consulta = `call 	ACTUALIZAR_ENCABEZADO(${COD_USUARIO},${COD_PERSONA},${COD_DIRECCION},${COD_ENCABEZADO},${COD_MODULO},'${DIRECCION}')`;
        conn.query(consulta, error => {
            if (error) throw error;
               
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