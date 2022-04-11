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
        document.getElementById("perfil_data").style.display="none"
        document.getElementById("perfil_data_contraseña").style.display="none"
    }

    if(localStorage.getItem("mostrar_roles")== "1"){
        document.getElementById("roles_sistema").style.display="block";
    }
    if(localStorage.getItem("mostrar_usuarios")== "1"){
        document.getElementById("usuarios").style.display="block";
    }
}

function cerrar_sesion(){
    localStorage.setItem("logeado", "0");
    localStorage.removeItem("id_usuario");
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("rol");

    mostrarlogin();
    if(localStorage.getItem("logeado")== "0"){
        mostrarlogin();
    }else{
        document.getElementById("perfil_data").style.display="none"
        document.getElementById("perfil_data_contraseña").style.display="none"
    }
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
    document.getElementById("dash").style.display = "none"
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
    document.getElementById("usuarios").style.display="none"
    
}

function mostrar_usuarios(){
    localStorage.setItem("mostrar_usuarios",1);
    localStorage.removeItem("mostrar_roles");
    localStorage.removeItem("mostrar_categprias");
    document.getElementById("usuarios").style.display="block"
    document.getElementById("nuevo_usuario").style.display="none"
    document.getElementById("perfil_usuario").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
}

function mostrar_categorias(){
    localStorage.setItem("mostrar_categprias",1)
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    document.getElementById("categorias_sistema").style.display="block"
    document.getElementById("perfil_usuario").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
}

function mostrar_perfl(){
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    document.getElementById("perfil_usuario").style.display="block"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("categorias_sistema").style.display="none"
}

function perfil_user(){
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    document.getElementById("perfil_data").style.display="block"
    document.getElementById("perfil_data_contraseña").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("categorias_sistema").style.display="none"

}

function mostrar_pass_perfil(){
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    document.getElementById("perfil_data").style.display="none"
    document.getElementById("perfil_data_contraseña").style.display="block"
    document.getElementById("permisos").style.display="none"
    document.getElementById("categorias_sistema").style.display="none"

}

function mostrar_permisos(){
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    document.getElementById("permisos").style.display="block"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("categorias_sistema").style.display="none"

}

function registro_permisos(){
   
    document.getElementById("nuevo_permiso").style.display="block"
    document.getElementById("permisos").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
}

function mostrar_roles(){
    localStorage.setItem("mostrar_roles",1)
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias"); 
    document.getElementById("roles_sistema").style.display="block";
    document.getElementById("usuarios").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("categorias_sistema").style.display="none"

}

function mostrar_registro_rol(){
    document.getElementById("Nuevo_rol").style.display="block";
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("usuarios").style.display="none"
    document.getElementById("permisos").style.display="none"
}

 
logeado();




