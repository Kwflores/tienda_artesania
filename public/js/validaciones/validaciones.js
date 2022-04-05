

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
$('#pass').keyup(function(e) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    if (false == enoughRegex.test($(this).val())) {
            $('#passstrengths').html('Más caracteres.');
    } else if (strongRegex.test($(this).val())) {
            $('#passstrengths').className = 'ok';
            $('#passstrengths').html('Fuerte!');
    } else if (mediumRegex.test($(this).val())) {
            $('#passstrengths').className = 'alert';
            $('#passstrengths').html('Media!');
    } else {
            $('#passstrengths').className = 'error';
            $('#passstrengths').html('Débil!');
    }
    return true;
});
$('#Password').keyup(function(e) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    if (false == enoughRegex.test($(this).val())) {
            $('#passstrength').html('Más caracteres.');
    } else if (strongRegex.test($(this).val())) {
            $('#passstrength').className = 'ok';
            $('#passstrength').html('Fuerte!');
    } else if (mediumRegex.test($(this).val())) {
            $('#passstrength').className = 'alert';
            $('#passstrength').html('Media!');
    } else {
            $('#passstrength').className = 'error';
            $('#passstrength').html('Débil!');
    }
    return true;
});

document
  .getElementById('pass')
  .addEventListener('input', function(evt) {
    const campo = evt.target,
          valido = document.getElementById('passOK'),
        
          regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;

    //Se muestra un texto válido/inválido a modo de ejemplo
    if (regex.test(campo.value)) {
      valido.innerText = "";
    } else {
      valido.innerText = "Debe tener al menos una mayúscula, una minúscula y un dígito";
    }
  });
  document
  .getElementById('Password')
  .addEventListener('input', function(evt) {
    const campo = evt.target,
          valido = document.getElementById('campoOK'),
        
          regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;

    //Se muestra un texto válido/inválido a modo de ejemplo
    if (regex.test(campo.value)) {
      valido.innerText = "";
    } else {
      valido.innerText = "Debe tener al menos una mayúscula, una minúscula y un dígito";
    }
  });

function mostrarContrasenas() {
    var tipo = document.getElementById("CLAVE");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}
function mostrarContrasena() {
    var tipo = document.getElementById("Password");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}

function mostrarContrasenapass() {
    var tipo = document.getElementById("pass");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}
function mostrarContrasenapassconfi() {
    var tipo = document.getElementById("conf_pass");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}
function mostrarContrasenapass_confi() {
    var tipo = document.getElementById("pass_conf");
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
 

document
.getElementById('CORREO')
.addEventListener('input', function(evt) {
  const campo = evt.target,
        valido = document.getElementById('emailOK'),
      
        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //Se muestra un texto válido/inválido a modo de ejemplo
  if (expr.test(campo.value)) {
    valido.innerText = "";
  } else {
    valido.innerText =  "Error: La dirección de correo es incorrecta.";
  }
});




 

