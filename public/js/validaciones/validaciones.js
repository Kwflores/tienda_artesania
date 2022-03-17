

$(document).ready(function () {
    $("#NOM_USUARIO").keyup(function () {
        var ta = $("#NOM_USUARIO");
        letras = ta.val().replace(/ /g, "");
        ta.val(letras)
    });

    $("#CLAVE").keyup(function () {
        var ta = $("#CLAVE");
        letras = ta.val().replace(/ /g, "");
        ta.val(letras)
    });
})

function mostrarContrasena() {
    var tipo = document.getElementById("CLAVE");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}

function soloLetras(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for(var i in especiales){
         if(key == especiales[i]){
             tecla_especial = true;
             break;
         }
     }

     if(letras.indexOf(tecla)==-1 && !tecla_especial){
         return false;
     }
 }

 