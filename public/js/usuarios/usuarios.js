//variables globales
var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");
$(document).ready(function () {
      
    //registro de clientes 
    $("#registro-clientes").click(function () {
        cliente = $("#NOM_CLIENTE").val();
        correo = $("#CORREO").val();
        usuario = $("#USER").val();
        clave = $("#Password").val();
        confi_clave = $("#conf_pass").val();
        telefono = "0";
        idenficacion ="";
        no_identificacion ="";
        direccion="";
        valido = document.getElementById("campoOK").val
        if (valido == "") {
            
        }
        if (cliente == "" || correo == "" || usuario == "" || clave == "" || telefono == ""|| idenficacion == ""|| no_identificacion == ""|| direccion == ""    ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe completar todo los campos.!',

            })
            return;
        }
        if (clave != confi_clave) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡La Contraseña no Coinciden o no es Valida.!',
            })
            return;
        }
        var settings = {
            "url": api + "clientes",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({ "NOM_PERSONA": cliente, "USER_EMAIL": correo, "NUM_CEL": 0, "NOM_USUARIO": usuario, "CLAVE": clave, "NOM_IDENTIFICACION": "NULL", "COD_IDENTIFICACION": "NULL", "DIRECCION": "NULL", "COD_ROL": 2, "COD_MODULO": 1 }),
        };
        $.ajax(settings).done(function (response) {
            if (response == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡No se Registro, Favor verificar los datos introducidos!',
                })
                return;
            }
            if (response.Message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Usuario ya Existe pruebe con otro!',
                })
                return;
            } else {
                Swal.fire(
                    'Registro Completo!',
                    'Se registro correctamente!',
                    'success'
                )
                document.getElementById("clave").style.display = "none";
                document.getElementById("login").style.display = "block";
                document.getElementById("registro").style.display = "none";
                document.getElementById("resetear-clave").style.display = "none";
            }

        });

    });
 
   

});
