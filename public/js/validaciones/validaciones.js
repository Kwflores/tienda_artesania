

$(document).ready(function () {
    //validar no espacios
    $("#NOM_USUARIO").keyup(function () {
        var ta = $("#NOM_USUARIO");
        letras = ta.val().replace(/ /g, "");
        ta.val(letras)
    });
   
    $("#Rusuario").keyup(function () {
        var ta = $("#Rusuario");
        letras = ta.val().replace(/ /g, "");
        ta.val(letras)
    });
    $("#RCliente").keyup(function () {
      var ta = $("#RCliente");
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
    $('#RNom_proveedor').on('input', function () { 
      this.value = this.value.replace(/\d/g,'');
  });
  $('#RCliente').on('input', function () { 
    this.value = this.value.replace(/\d/g,'');
});
  $('#ANom_proveedor').on('input', function () { 
    this.value = this.value.replace(/\d/g,'');
});
    
    $('#Rnom_usuario').on('input', function () { 
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
    
    $('#Rusuario').on('input', function () { 
        this.value = this.value.replace(/\d/g,'');
    });
    $('#Rusuario').on('keyup', function(){
      $(this).val(validarTexto($('#Rusuario').val()));
    });
    $('#NOM_USUARIO').on('keyup', function(){
      $(this).val(validarTexto($('#NOM_USUARIO').val()));
    });
    $('#A_nom_usuario').on('keyup', function(){
      $(this).val(validarTexto_sin_carateres($('#A_nom_usuario').val()));
    });
    $('#Rnom_usuario').on('keyup', function(){
      $(this).val(validarTexto_sin_carateres($('#Rnom_usuario').val()));
    });
    $('#USUARIO').on('keyup', function(){
      $(this).val(validarTexto($('#USUARIO').val()));
    });
    $('#USER').on('keyup', function(){
      $(this).val(validarTexto($('#USER').val()));
    });
 
    $('#Rnom_producto').on('keyup', function(){
      $(this).val(validarTexto($('#Rnom_producto').val()));
    });
    $('#NOM_CLIENTE').on('keyup', function(){
      $(this).val(validarTexto($('#NOM_CLIENTE').val()));
    });
    $('#RNom_proveedor').on('keyup', function(){
      $(this).val(validarTexto($('#RNom_proveedor').val()));
    });
    $('#ANom_proveedor').on('keyup', function(){
      $(this).val(validarTexto($('#ANom_proveedor').val()));
    });
    $('#RCliente').on('keyup', function(){
      $(this).val(validarTexto($('#RCliente').val()));
    });
    $('#Nom_categoria').on('keyup', function(){
      $(this).val(validarTexto($('#Nom_categoria').val()));
    });
    $('#FDireccionEntrega').on('keyup', function(){
      $(this).val(validarTexto_may_min($('#FDireccionEntrega').val()));
    });
    $('#Rdireccion_proveedor').on('keyup', function(){
      $(this).val(validarTexto_may_min($('#Rdireccion_proveedor').val()));
    });
    $('#Adireccion_proveedor').on('keyup', function(){
      $(this).val(validarTexto_may_min($('#Adireccion_proveedor').val()));
    });
    $('#Adescripcion').on('keyup', function(){
      $(this).val(validarTexto_may_min($('#Adescripcion').val()));
    });
    $('#Rdescripcion').on('keyup', function(){
      $(this).val(validarTexto_may_min($('#Rdescripcion').val()));
    });
    $('#des_categoria').on('keyup', function(){
      $(this).val(validarTexto_may_min($('#des_categoria').val()));
    });
    $('#Ades_categoria').on('keyup', function(){
      $(this).val(validarTexto_may_min($('#Ades_categoria').val()));
    });
    function validarTexto(texto) {
      return texto.replace(/[^A-Z]+/g, "");
    }
    function validarTexto_sin_carateres(texto) {
      return texto.replace(/[^A-Z-a-z]+/g, " ");
    }
    function validarTexto_may_min(texto) {
      return texto.replace(/[^A-Z-a-z-0-99]+/g, " ");
    }
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
 

const contenedor = document.getElementById('IAcentrada');

contenedor.addEventListener('keydown', function(evento) {
  const elemento = evento.target;
  if (elemento.className === 'campo-numerico') {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
      Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida = 
      teclaPresionada != 'ArrowDown' &&
      teclaPresionada != 'ArrowUp' &&
      teclaPresionada != 'ArrowLeft' &&
      teclaPresionada != 'ArrowRight' &&
      teclaPresionada != 'Backspace' &&
      teclaPresionada != 'Delete' &&
      teclaPresionada != 'Enter' &&
      !teclaPresionadaEsUnNumero;
    const comienzaPorCero = 
      elemento.value.length === 0 &&
      teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
      evento.preventDefault(); 
    }
  }
});

const contenedor1 = document.getElementById('Fcantidad');

contenedor1.addEventListener('keydown', function(evento) {
  const elemento = evento.target;
  if (elemento.className === 'campo-numerico') {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
      Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida = 
      teclaPresionada != 'ArrowDown' &&
      teclaPresionada != 'ArrowUp' &&
      teclaPresionada != 'ArrowLeft' &&
      teclaPresionada != 'ArrowRight' &&
      teclaPresionada != 'Backspace' &&
      teclaPresionada != 'Delete' &&
      teclaPresionada != 'Enter' &&
      !teclaPresionadaEsUnNumero;
    const comienzaPorCero = 
      elemento.value.length === 0 &&
      teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
      evento.preventDefault(); 
    }
  }
});

const contenedor2 = document.getElementById('FEnvio');
contenedor2.addEventListener('keydown', function(evento) {
  const elemento = evento.target;
  if (elemento.className === 'campo-numerico') {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
      Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida = 
      teclaPresionada != 'ArrowDown' &&
      teclaPresionada != 'ArrowUp' &&
      teclaPresionada != 'ArrowLeft' &&
      teclaPresionada != 'ArrowRight' &&
      teclaPresionada != 'Backspace' &&
      teclaPresionada != 'Delete' &&
      teclaPresionada != 'Enter' &&
      !teclaPresionadaEsUnNumero;
    const comienzaPorCero = 
      elemento.value.length === 0 &&
      teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
      evento.preventDefault(); 
    }
  }
});

const contenedor10 = document.getElementById('Rprecio');

contenedor10.addEventListener('keydown', function(evento) {
  const elemento = evento.target;
  if (elemento.className === 'campo-numerico') {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
      Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida = 
      teclaPresionada != 'ArrowDown' &&
      teclaPresionada != 'ArrowUp' &&
      teclaPresionada != 'ArrowLeft' &&
      teclaPresionada != 'ArrowRight' &&
      teclaPresionada != 'Backspace' &&
      teclaPresionada != 'Delete' &&
      teclaPresionada != 'Enter' &&
      !teclaPresionadaEsUnNumero;
    const comienzaPorCero = 
      elemento.value.length === 0 &&
      teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
      evento.preventDefault(); 
    }
  }
});

const contenedor7 = document.getElementById('Rcentrada');

contenedor7.addEventListener('keydown', function(evento) {
  const elemento = evento.target;
  if (elemento.className === 'campo-numerico') {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
      Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida = 
      teclaPresionada != 'ArrowDown' &&
      teclaPresionada != 'ArrowUp' &&
      teclaPresionada != 'ArrowLeft' &&
      teclaPresionada != 'ArrowRight' &&
      teclaPresionada != 'Backspace' &&
      teclaPresionada != 'Delete' &&
      teclaPresionada != 'Enter' &&
      !teclaPresionadaEsUnNumero;
    const comienzaPorCero = 
      elemento.value.length === 0 &&
      teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
      evento.preventDefault(); 
    }
  }
});
const contenedor6 = document.getElementById('Rcinicial');

contenedor6.addEventListener('keydown', function(evento) {
  const elemento = evento.target;
  if (elemento.className === 'campo-numerico') {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
      Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida = 
      teclaPresionada != 'ArrowDown' &&
      teclaPresionada != 'ArrowUp' &&
      teclaPresionada != 'ArrowLeft' &&
      teclaPresionada != 'ArrowRight' &&
      teclaPresionada != 'Backspace' &&
      teclaPresionada != 'Delete' &&
      teclaPresionada != 'Enter' &&
      !teclaPresionadaEsUnNumero;
    const comienzaPorCero = 
      elemento.value.length === 0 &&
      teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
      evento.preventDefault(); 
    }
  }
});

const contenedor5 = document.getElementById('Aprecio');

contenedor5.addEventListener('keydown', function(evento) {
  const elemento = evento.target;
  if (elemento.className === 'campo-numerico') {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
      Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida = 
      teclaPresionada != 'ArrowDown' &&
      teclaPresionada != 'ArrowUp' &&
      teclaPresionada != 'ArrowLeft' &&
      teclaPresionada != 'ArrowRight' &&
      teclaPresionada != 'Backspace' &&
      teclaPresionada != 'Delete' &&
      teclaPresionada != 'Enter' &&
      !teclaPresionadaEsUnNumero;
    const comienzaPorCero = 
      elemento.value.length === 0 &&
      teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
      evento.preventDefault(); 
    }
  }
});
const contenedor11 = document.getElementById('RSKU');
contenedor11.addEventListener('keydown', function(evento) {
  const elemento = evento.target;
  if (elemento.className === 'campo-numerico') {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
      Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida = 
      teclaPresionada != 'ArrowDown' &&
      teclaPresionada != 'ArrowUp' &&
      teclaPresionada != 'ArrowLeft' &&
      teclaPresionada != 'ArrowRight' &&
      teclaPresionada != 'Backspace' &&
      teclaPresionada != 'Delete' &&
      teclaPresionada != 'Enter' &&
      !teclaPresionadaEsUnNumero;
    const comienzaPorCero = 
      elemento.value.length === 0 &&
      teclaPresionada == 0;

    if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
      evento.preventDefault(); 
    }
  }
});

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

telefono.oninput = function () {
  if (this.value.length > 8) {
      this.value = this.value.slice(0,8); 
  }
}

cod_identificacion.oninput = function () {
  if (this.value.length > 13) {
      this.value = this.value.slice(0,13); 
  }
}

A_telefono.oninput = function () {
  if (this.value.length > 8) {
      this.value = this.value.slice(0,8); 
  }
}

A_cod_identificacion.oninput = function () {
  if (this.value.length > 13) {
      this.value = this.value.slice(0,13); 
  }
}

Rprecio.oninput = function () {
  if (this.value.length > 4) {
      this.value = this.value.slice(0,4); 
  }
}

Rcinicial.oninput = function () {
  if (this.value.length > 4) {
      this.value = this.value.slice(0,4); 
  }
}

Rcentrada.oninput = function () {
  if (this.value.length > 4) {
      this.value = this.value.slice(0,4); 
  }
}

FSKU.oninput = function () {
  if (this.value.length > 4) {
      this.value = this.value.slice(0,4); 
  }
}

Aprecio.oninput = function () {
  if (this.value.length > 4) {
      this.value = this.value.slice(0,4); 
  }
}

RSKU.oninput = function () {
  if (this.value.length > 4) {
      this.value = this.value.slice(0,4); 
  }
}

RTelefono_proveedor.oninput = function () {
  if (this.value.length > 8) {
      this.value = this.value.slice(0,8); 
  }
}

Perfil_telefono.oninput = function () {
  if (this.value.length > 8) {
      this.value = this.value.slice(0,8); 
  }
}

Perfil_idenficacion.oninput = function () {
  if (this.value.length > 13) {
      this.value = this.value.slice(0,13); 
  }
}