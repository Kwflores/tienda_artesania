const express = require('express');
const session = require('express-session');
var router=express.Router();
const RutaUsuarios= require("./routers/usuarios");
const app = express();
require('dotenv').config();
//ultilizo el urlencoded con la propiedad extended para que el servidor pueda entender los datos del htmls
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    secret:process.env.SECRETO,
    resave:true,
    saveUninitialized:true
}));


app.use("/public", express.static(__dirname + "/public"))

//Ruta Raiz
app.use(express.static(__dirname + '/views'));
//Ruta Usuarios
app.use("/usuarios",RutaUsuarios);

 

app.listen(process.env.PUERTO, () => {
    console.log('Servidor corriendo con exito!');
});

//Run app, then load http://localhost:3000 in a browser to see the output.