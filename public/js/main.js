usuario_logeado = document.getElementById("usuario_logeado");
rol_usuario = document.getElementById("rol_usuario");
user_logeado = localStorage.getItem("usuario");
rol_user = localStorage.getItem("rol");
usuario_logeado.innerHTML = user_logeado;
rol_usuario.innerHTML = rol_user;

function logeado(){
    if(localStorage.getItem("logeado")== "1"){
        mostrar_dash()
    }else{

    }
}

function cerrar_sesion(){
    localStorage.setItem("logeado", "0");
    mostrarlogin();
}

function mostrarlogin() {
    document.getElementById("login").style.display = "block";
    document.getElementById("registro").style.display = "none";
    document.getElementById("resetear-clave").style.display = "none";
    document.getElementById("clave").style.display = "none";
    document.getElementById("tiendita").style.display = "none";
    document.getElementById("inicio_sesion").style.display = "block";
    document.getElementById("dash").style.display = "none"

}


function mostrar_tienda(){
    document.getElementById("tiendita").style.display = "block"
    document.getElementById("inicio_sesion").style.display = "none";
}

function mostrar_dash(){
    document.getElementById("dash").style.display = "block"
    document.getElementById("tiendita").style.display = "none"
    document.getElementById("inicio_sesion").style.display = "none";
}
 

function mostrarregistro(){
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "block";
    document.getElementById("resetear-clave").style.display = "none";
    document.getElementById("clave").style.display = "none";
    document.getElementById("tiendita").style.display = "none";
    document.getElementById("inicio_sesion").style.display = "block";
     

}

function mostrar_reset_clave(){
    document.getElementById("resetear-clave").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "none";
    document.getElementById("clave").style.display = "none";
    document.getElementById("banner").style.display = "block";
    document.getElementById("login_banner").style.display = "block";
    document.getElementById("inicio_sesion").style.display = "block";
    
}
 
function mostrar_registro(){
    document.getElementById("nuevo_usuario").style.display="block"
}

logeado();