const express = require('express');
const conexion = require("mysql");
const jwt = require("jsonwebtoken");
var router = express.Router();
var cors = require('cors');
const RutaUsuarios = require("./routers/usuarios");
const RutaPass = require("./routers/reset_pass");
const RutaContacto = require("./routers/contacto");
const RutaRoles = require("./routers/roles");
const RutaPermiso = require("./routers/permisos");
const RutaModulo = require("./routers/modulos");
const RutaCategoria = require("./routers/categorias");
const RutaProductos = require("./routers/productos");
const RutaProveedores = require("./routers/proveedores");
const RutaPagos = require("./routers/metodo_pago");
const RutaFacturacion = require("./routers/facturacion");
const RutaCliente = require("./routers/clientes");
const RutaReporte = require("./routers/reportes");
const rutaimg = require('./routers/img');
const ruta_copia_seguridad = require('./routers/backup');
const ruta_bitacora= require('./routers/bitacora');
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
        port: "3306",
        multipleStatements: true
    }
);


app.use(cors({origin:'http://localhost:3000', credentials : true}));

app.use("/public", express.static(__dirname + "/public"))

//Ruta Raiz
app.use(express.static(__dirname + '/views'));

//ruta login permite acceder a la aplicacion 
app.post('/login', async (req, res) => {
     
    try {
        const { NOM_USUARIO, CLAVE, COD_USUARIO, COD_MODULO } = req.body;
        var existe = false;
        var conteoExistencia = `call BUSCAR_USUARIOS('${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(conteoExistencia, (error, results) => {
            if (error) throw error;
            console.log(results[0][0])
            if (results[0][0]) {

               pass = results[0][0].Clave
               var clave = pass.toString('utf8');
               codigo = results[0][0].COD_USUARIO;
               rol = results[0][0].Rol;
               nombre = results[0][0].Nombre;
               console.log(clave) 
               console.log(results[0][0].Usuario ===NOM_USUARIO && clave ===CLAVE)
                if (results[0][0].Usuario ===NOM_USUARIO && clave ===CLAVE) {
                                            
                    const consulta = `call LOGIN('${NOM_USUARIO}','${CLAVE}',${COD_USUARIO},${COD_MODULO})`;
                    conn.query(consulta, (error, results) => {
                        
                        if (results.length > 0) {
                          
                            let user = results[0];
                            const accesstoken = generarAccessToken(user)
                            //le enviamos al usuario un mensaje y el token, el cual sera utilizado para logearse
                            res.header('authorization', accesstoken).json({
                                message: "Bienvenido: " + NOM_USUARIO,
                                Nombre:  nombre,
                                cod_usuario: codigo,
                                token: accesstoken,
                                rol:rol,
                                dt:user
                            });
                        }
                    });
                                      
                } else {
                    res.send("0")
                }
            } else {
                res.send("0")
            }          
        });
    } catch (e) {
        res.send(e);
    }
});
 

function generarAccessToken(user) {
    //se crea un token y por medio del sing enviamos un objeto de usuario
    return jwt.sign({ user }, process.env.TOKEN_SECRET)
}


//Rutas
app.use("/usuarios", validartoken, RutaUsuarios);
app.use("/usuario",RutaUsuarios);
app.use("/contactos", validartoken, RutaContacto);
app.use("/roles", validartoken, RutaRoles);
app.use("/permisos", validartoken, RutaPermiso);
app.use("/modulos", validartoken, RutaModulo);
app.use("/categorias", validartoken, RutaCategoria);
app.use("/categorias_clientes", RutaCategoria);
app.use("/productos", validartoken, RutaProductos);
app.use("/productos_clientes",RutaProductos);
app.use("/proveedores", validartoken, RutaProveedores);
app.use("/pagos",  RutaPagos);
app.use("/pedidos", validartoken, RutaFacturacion);
app.use("/pedidos_clientes", RutaFacturacion);
app.use("/send-email",RutaPass)
app.use("/clientes",RutaCliente)
app.use("/img",rutaimg);
app.use("/backup",validartoken,ruta_copia_seguridad);
app.use("/reportes",validartoken,RutaReporte)
app.use("/bitacora",validartoken,ruta_bitacora)
app.listen(process.env.PUERTO, () => {
    console.log('Servidor corriendo con exito!');
});





//Run app, then load http://localhost:3000 in a browser to see the output.