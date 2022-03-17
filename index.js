const express = require('express');
const conexion = require("mysql");
const jwt = require("jsonwebtoken");
var router = express.Router();
const RutaUsuarios = require("./routers/usuarios");
const RutaContacto = require("./routers/contacto");
const RutaRoles = require("./routers/roles");
const RutaPermiso = require("./routers/permisos");
const RutaModulo = require("./routers/modulos");
const RutaCategoria = require("./routers/categorias");
const RutaProductos = require("./routers/productos");
const RutaProveedores = require("./routers/proveedores");
const RutaPagos = require("./routers/metodo_pago");
const RutaFacturacion = require("./routers/facturacion");
const validartoken = require("./Middleware/validar_token");
const app = express();
require('dotenv').config();
//ultilizo el urlencoded con la propiedad extended para que el servidor pueda entender los datos del htmls
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//requerimos o importamos el validar_token y admin para poder hacer uso de las funciones y rutas creadas en los mismos. 


var conn = conexion.createConnection(
    {
        host: process.env.SERVER,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DB,
    }
);

app.use("/public", express.static(__dirname + "/public"))

//Ruta Raiz
app.use(express.static(__dirname + '/views'));


//ruta login permite acceder a la aplicacion 
app.post('/login', async (req, res) => {
    // 
    try {
        const { NOM_USUARIO, CLAVE, COD_USUARIO, COD_MODULO } = req.body;
        var existe = false;
          var conteoExistencia = `call OBTENER_USUARIOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(conteoExistencia, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                if (results.length > 0) {
                    if (results[0][0].Usuario == NOM_USUARIO && results[0][0].clave == CLAVE ) {
                        existe = true;
                        const consulta = `call LOGIN('${NOM_USUARIO}','${CLAVE}',${COD_USUARIO},${COD_MODULO})`;
                        conn.query(consulta, (error, results) => {
                            if (results.length > 0) {
                                let user = results[0];
                                const accesstoken = generarAccessToken(user)
                                //le enviamos al usuario un mensaje y el token, el cual sera utilizado para logearse
                                res.header('authorization', accesstoken).json({
                                    message: "Bienvenido: " + NOM_USUARIO,
                                    token: accesstoken
                                });
                            }
                        });
                    }
                    else{
                         res.send("0");
                    }
                  
                }
            }
           
        });
    } catch (e) {
        res.send("0");
    }
});



function generarAccessToken(user) {
    //se crea un token y por medio del sing enviamos un objeto de usuario
    return jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '30m' })
}

//Rutas
app.use("/usuarios",validartoken, RutaUsuarios);
app.use("/contactos", validartoken, RutaContacto);
app.use("/roles", validartoken, RutaRoles);
app.use("/permisos", validartoken, RutaPermiso);
app.use("/modulos", validartoken, RutaModulo);
app.use("/categorias", validartoken, RutaCategoria);
app.use("/productos", validartoken, RutaProductos);
app.use("/proveedores", validartoken, RutaProveedores);
app.use("/pagos", validartoken, RutaPagos);
app.use("/pedidos", validartoken, RutaFacturacion);


app.listen(process.env.PUERTO, () => {
    console.log('Servidor corriendo con exito!');
});




//Run app, then load http://localhost:3000 in a browser to see the output.