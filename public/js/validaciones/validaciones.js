

$(document).ready(function () {
    //validar no espacios
    $("#NOM_USUARIO").keyup(function () {
        var ta = $("#NOM_USUARIO");
        letras = ta.val().replace(/ /g, "");
        ta.val(letras)
    });
    $("#usuario").keyup(function () {
        var ta = $("#usuario");
        letras = ta.val().replace(/ /g, "");
        ta.val(letras)
    });

    $("#CLAVE").keyup(function () {
        var ta = $("#CLAVE");
        letras = ta.val().replace(/ /g, "");
        ta.val(letras)
    });
    $("#pass").keyup(function () {
        var ta = $("#pass");
        letras = ta.val().replace(/ /g, "");
        ta.val(letras)
    });
    $("#Password").keyup(function () {
        var ta = $("#pass");
        letras = ta.val().replace(/ /g, "");
        ta.val(letras)
    });
    $("#Contraseña").keyup(function () {
        var ta = $("#pass");
        letras = ta.val().replace(/ /g, "");
        ta.val(letras)
    });
    //validar solo letras 
    
    $('#A_nom_usuario').on('input', function () { 
        this.value = this.value.replace(/\d/g,'');
    });
    $('#nom_usuario').on('input', function () { 
        this.value = this.value.replace(/\d/g,'');
    });
    $('#USUARIO').on('input', function () { 
        this.value = this.value.replace(/\d/g,'');
    });
    $('#NOM_USUARIO').on('input', function () { 
        this.value = this.value.replace(/\d/g,'');
    });
    $('#USER').on('input', function () { 
        this.value = this.value.replace(/\d/g,'');
    });
    $('#NOM_CLIENTE').on('input', function () { 
        this.value = this.value.replace(/\d/g,'');
    });
    $('#usuario').on('input', function () { 
        this.value = this.value.replace(/\d/g,'');
    });
})  
$('#Contraseña').keyup(function(e) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    if (false == enoughRegex.test($(this).val())) {
            $('#passstrength1').html('Más caracteres.');
    } else if (strongRegex.test($(this).val())) {
            $('#passstrength1').className = 'ok';
            $('#passstrength1').html('Fuerte!');
    } else if (mediumRegex.test($(this).val())) {
            $('#passstrength1').className = 'alert';
            $('#passstrength1').html('Media!');
    } else {
            $('#passstrength1').className = 'error';
            $('#passstrength1').html('Débil!');
    }
    return true;
});
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
$('#A_pass').keyup(function(e) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    if (false == enoughRegex.test($(this).val())) {
            $('#Apassstrengths').html('Más caracteres.');
    } else if (strongRegex.test($(this).val())) {
            $('#Apassstrengths').className = 'ok';
            $('#Apassstrengths').html('Fuerte!');
    } else if (mediumRegex.test($(this).val())) {
            $('#Apassstrengths').className = 'alert';
            $('#Apassstrengths').html('Media!');
    } else {
            $('#Apassstrengths').className = 'error';
            $('#Apassstrengths').html('Débil!');
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
  

  document
  .getElementById('Contraseña')
  .addEventListener('input', function(evt) {
    const campo = evt.target,
          valido = document.getElementById('contraseñaOK'),
        
          regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;

    //Se muestra un texto válido/inválido a modo de ejemplo
    if (regex.test(campo.value)) {
      valido.innerText = "";
    } else {
      valido.innerText = "Debe tener al menos una mayúscula, una minúscula y un dígito";
    }
  });

  document
  .getElementById('A_pass')
  .addEventListener('input', function(evt) {
    const campo = evt.target,
          valido = document.getElementById('ApassOK'),
        
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
function mostrarContrasena_registro() {
    var tipo = document.getElementById("Contraseña");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}
function mostrarConfiContrasena_registro() {
    var tipo = document.getElementById("confirmar_contraseña");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}
function mostrarConfiContrasena_Actualizar() {
    var tipo = document.getElementById("A_pass_conf");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}
function mostrarContrasena_Actualizar() {
    var tipo = document.getElementById("A_pass");
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

document
.getElementById('RCorreo_proveedor')
.addEventListener('input', function(evt) {
  const campo = evt.target,
        valido = document.getElementById('Correo_proveedor'),
      
        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //Se muestra un texto válido/inválido a modo de ejemplo
  if (expr.test(campo.value)) {
    valido.innerText = "";
  } else {
    valido.innerText =  "Error: La dirección de correo es incorrecta.";
  }
});

document
.getElementById('ACorreo_proveedor')
.addEventListener('input', function(evt) {
  const campo = evt.target,
        valido = document.getElementById('A_Correo_proveedor'),
      
        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //Se muestra un texto válido/inválido a modo de ejemplo
  if (expr.test(campo.value)) {
    valido.innerText = "";
  } else {
    valido.innerText =  "Error: La dirección de correo es incorrecta.";
  }
});
document
.getElementById('email')
.addEventListener('input', function(evt) {
  const campo = evt.target,
        valido = document.getElementById('UcorreoOK'),
      
        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //Se muestra un texto válido/inválido a modo de ejemplo
  if (expr.test(campo.value)) {
    valido.innerText = "";
  } else {
    valido.innerText =  "Error: La dirección de correo es incorrecta.";
  }
});

document
.getElementById('A_email')
.addEventListener('input', function(evt) {
  const campo = evt.target,
        valido = document.getElementById('AcorreoOK'),
      
        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //Se muestra un texto válido/inválido a modo de ejemplo
  if (expr.test(campo.value)) {
    valido.innerText = "";
  } else {
    valido.innerText =  "Error: La dirección de correo es incorrecta.";
  }
});


document
.getElementById('Perfil_Correo')
.addEventListener('input', function(evt) {
  const campo = evt.target,
        valido = document.getElementById('PcorreoOK'),
      
        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //Se muestra un texto válido/inválido a modo de ejemplo
  if (expr.test(campo.value)) {
    valido.innerText = "";
  } else {
    valido.innerText =  "Error: La dirección de correo es incorrecta.";
  }
});
 


 

