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

// Obenter todo los registros de metodos de pago 
app.get("/", (req, res) => {
    const { NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
    const consulta = `call 	OBTENER_METODO_PAGOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
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
        const { TIP_PAGO, DESCRIPCION, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call 	NUEVO_METODO_PAGO('${TIP_PAGO}','${DESCRIPCION}',1,${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, error => {
            if (error) {
                res.json({
                    message: "Verificar los parametros solicitados",
                    parametros_solicitados: {
                        "TIP_PAGO": "",
                        "DESCRIPCION": "",
                        "COD_USUARIO": "",
                        "COD_MODULO": ""
                    }
                });
            };
            res.json({
                message: "Metodo de pago creado Con Exito",
            });
        });
    } catch (error) {
        res.send(0);
    }

})


// Registro actualizar datos de usuarios
app.put('/actualizar', (req, res) => {
    try {


        const { COD_PAGO, TIP_PAGO, DESCRIPCION, NOM_USUARIO, COD_MODULO, COD_USUARIO, COD_ESTADO } = req.body;
        const consulta = `call 	ACTUALIZAR_METODO_PAGO('${TIP_PAGO}','${DESCRIPCION}','${COD_USUARIO}','${COD_MODULO}',${COD_PAGO},'${NOM_USUARIO}',${COD_ESTADO})`;

        conn.query(consulta, error => {
            if (error) {
                res.json({
                    message: "Verificar los parametros solicitados",
                    parametros_solicitados: {
                        "COD_PAGO": "",
                        "TIP_PAGO": "",
                        "DESCRIPCION": "",
                        "NOM_USUARIO": "",
                        "COD_ESTADO": "",
                        "COD_USUARIO": "",
                        "COD_MODULO": "",
                    }
                });
            };
            res.json({
                message: "Metodo de pago Actualizado Con Exito"

            })

        });
    } catch (error) {
        res.send(0);
    }
});


//eliminar contacto 
app.delete('/eliminar', async (req, res) => {
    try {
        const { COD_PAGO, NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const metodos_pago = `call  OBTENER_PEDIDOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(metodos_pago, (error, results) => {
            if (results[0][0].COD_PAGO == COD_PAGO) {
                res.json({
                    message: "Registro No puede eliminarse, esta asociado a un pedido",
                    COD_PAGO: COD_PAGO
                })

            } else {
                const metodos = `call  OBTENER_METODO_PAGOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
                conn.query(metodos, (error, results) => {
                     
                        const consulta = `call 	ELIMINAR_METODO_PAGO(${COD_PAGO},'${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
                        conn.query(consulta, error => {
                            if (error) throw error;
                            
                                return res.json({
                                    message: "Registro Eliminado",
                                })

                           
                        });
                 
                
                })
            }
            
        })
    } catch (error) {
    res.send(0);
}
});




module.exports = app;