function mostrarlogin() {
    login = document.getElementById("login").style.display = "block";
    document.getElementById("registro").style.display = "none";
    document.getElementById("resetear-clave").style.display = "none";
    document.getElementById("clave").style.display = "none";
}

mostrarlogin()

function mostrar_registro(){
    document.getElementById("registro").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("resetear-clave").style.display = "none";
    document.getElementById("clave").style.display = "none";
}

function mostrar_reset_clave(){
    document.getElementById("resetear-clave").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "none";
    document.getElementById("clave").style.display = "none";
    
}


