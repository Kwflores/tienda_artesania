const express = require('express');
const conexion = require("mysql");
const jwt = require("jsonwebtoken");
var router = express.Router();
const RutaUsuarios = require("./routers/usuarios");
const RutaContacto = require("./routers/contacto");
const app = express();
require('dotenv').config();
//ultilizo el urlencoded con la propiedad extended para que el servidor pueda entender los datos del htmls
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//requerimos o importamos el validar_token y admin para poder hacer uso de las funciones y rutas creadas en los mismos. 
const validartoken = require("./Middleware/validar_token");

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

    try {
        const { NOM_USUARIO, CLAVE, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call LOGIN('${NOM_USUARIO}','${CLAVE}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, (error, results) => {

            if (error) throw error;
            if (results.length > 0) {
                let user = results[0];
                const accesstoken = generarAccessToken(user)
                //le enviamos al usuario un mensaje y el token, el cual sera utilizado para logearse
                res.header('authorization',accesstoken).json({
                    message: "Bienvenido: " + user[0].NOM_USUARIO,
                    token: accesstoken
                });
            }
        });
    } catch (e) {
        res.send("0");
    }


});

function generarAccessToken(user){
     //se crea un token y por medio del sing enviamos un objeto de usuario
     return jwt.sign({user}, process.env.TOKEN_SECRET,{expiresIn:'10m'})
}

//Ruta Usuarios
app.use("/usuarios",validartoken, RutaUsuarios);
app.use("/contactos",validartoken, RutaContacto);



app.listen(process.env.PUERTO, () => {
    console.log('Servidor corriendo con exito!');
});

//Run app, then load http://localhost:3000 in a browser to see the output.