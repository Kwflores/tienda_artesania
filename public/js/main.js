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
    if(localStorage.getItem("mostrar_login")== "1"){
        document.getElementById("login").style.display="block";
    }
    if(localStorage.getItem("mostrar_categprias")== "1"){
        document.getElementById("categorias_sistema").style.display="block";
    }
    if(localStorage.getItem("mostrar_usuarios")== "1"){
        document.getElementById("usuarios").style.display="block";
    }
    if(localStorage.getItem("mostrarr_proveedores")== "1"){
        document.getElementById("proveedores_sistema").style.display="block";
    }
    if(localStorage.getItem("productos_sistema")== "1"){
        document.getElementById("productos_sistema").style.display="block";
    }
    if(localStorage.getItem("inventario_sistema")== "1"){
        document.getElementById("inventario_sistema").style.display="block";
    }
    
    if(localStorage.getItem("pedidos_sistema")== "1"){
        document.getElementById("pedidos_sistema").style.display="block";
    }
    if(localStorage.getItem("facturas_sistema")== "1"){
        document.getElementById("facturas_sistema").style.display="block";
    }
    if(localStorage.getItem("sugerencias")== "1"){
        document.getElementById("sugerencias").style.display="block";
    }
    if(localStorage.getItem("permisos_sys")== "1"){
        document.getElementById("permisos").style.display="block";
    } 
    if(localStorage.getItem("mostra_reportes")== "1"){
        document.getElementById("mostra_reportes").style.display="block";
    } 
    if(localStorage.getItem("tiendita")== "1"){
        document.getElementById("tiendita").style.display="block";
        document.getElementById("iniciar_sesion").style.display="none"
        document.getElementById("cerrar_sesion").style.display="block"
        document.getElementById("bienvenido_usuario").style.display="block"

    }
    document.getElementById("usuario").innerHTML = user_logeado
}

function cerrar_sesion(){
    localStorage.setItem("logeado", "0");
    localStorage.removeItem("id_usuario");
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("tiendita");
    if(localStorage.getItem("logeado")== "0"){
        mostrarlogin()
        document.getElementById("bienvenido_usuario").style.display="none"
    }else{
        document.getElementById("perfil_data").style.display="none"
        document.getElementById("perfil_data_contraseña").style.display="none"
    }
}

function cerrar_sesion_tiendita(){
    localStorage.setItem("logeado", "0");
    localStorage.removeItem("id_usuario");
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("tiendita");
    if(localStorage.getItem("logeado")== "0"){
        document.getElementById("tiendita").style.display = "block"
        document.getElementById("bienvenido_usuario").style.display="none"
    }else{
        document.getElementById("perfil_data").style.display="none"
        document.getElementById("perfil_data_contraseña").style.display="none"
    }
}


function mostrarlogin() {
    localStorage.setItem("mostrar_login",1)
    document.getElementById("login").style.display = "block";
    document.getElementById("registro").style.display = "none";
    document.getElementById("resetear-clave").style.display = "none";
    document.getElementById("clave").style.display = "none";
    document.getElementById("tiendita").style.display = "none";
    document.getElementById("inicio_sesion").style.display = "block";
    document.getElementById("dash").style.display = "none"
    document.getElementById("facturas_sistema").style.display="none"
    

}


function mostrar_tienda(){
    document.getElementById("tiendita").style.display = "block"
    document.getElementById("inicio_sesion").style.display = "none";
    document.getElementById("dash").style.display = "none"
    
    
}

function mostrar_dash(){
    localStorage.removeItem("mostrar_login");
    localStorage.removeItem("tiendita");
    document.getElementById("dash").style.display = "block"
    document.getElementById("tiendita").style.display = "none"
    document.getElementById("inicio_sesion").style.display = "none";
    localStorage.removeItem("mostra_reportes");

}
 

function mostrarregistro(){
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "block";
    document.getElementById("resetear-clave").style.display = "none";
    document.getElementById("clave").style.display = "none";
    document.getElementById("tiendita").style.display = "none";
    document.getElementById("inicio_sesion").style.display = "block";
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
     

}

function mostrar_reset_clave(){
    document.getElementById("resetear-clave").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "none";
    document.getElementById("clave").style.display = "none";
    document.getElementById("banner").style.display = "block";
    document.getElementById("login_banner").style.display = "block";
    document.getElementById("inicio_sesion").style.display = "block";
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    
}

function mostrar_registro(){
    document.getElementById("nuevo_usuario").style.display="block"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    localStorage.removeItem("facturas_sistema")
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    
}

function mostrar_usuarios(){
    localStorage.setItem("mostrar_usuarios",1);
    
    localStorage.removeItem("mostrar_roles");
    localStorage.removeItem("permisos_sys");
    localStorage.removeItem("pedidos_sistema");
    document.getElementById("mostra_reportes").style.display = "none"

    localStorage.removeItem("mostrarr_proveedores"); 
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    localStorage.removeItem("inventario_sistema");
    localStorage.removeItem("mostrar_categprias");
    document.getElementById("usuarios").style.display="block"
    document.getElementById("sugerencias").style.display="none"
    document.getElementById("nuevo_usuario").style.display="none"
    document.getElementById("perfil_usuario").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    localStorage.removeItem("facturas_sistema")
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    localStorage.removeItem("mostra_reportes");

}


function mostrar_categorias(){
    localStorage.setItem("mostrar_categprias",1)
    localStorage.setItem("mostrar_moduloCategoria",13)
    localStorage.removeItem("mostrar_modulo_usuario")
    localStorage.removeItem("Mostrar_Modulo_sugerencia");

    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrarr_proveedores"); 
    localStorage.removeItem("productos_sistema")
    localStorage.removeItem("facturas_sistema")
    document.getElementById("inventario_sistema").style.display="none"
    localStorage.removeItem("inventario_sistema");
    document.getElementById("sugerencias").style.display="none"
    localStorage.removeItem("permisos_sys");
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("categorias_sistema").style.display="block"
    document.getElementById("perfil_usuario").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("usuarios").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    localStorage.removeItem("pedidos_sistema");
    localStorage.removeItem("mostra_reportes");
    document.getElementById("mostra_reportes").style.display = "none"

}

function mostrar_registro_categoria(){
    localStorage.removeItem("facturas_sistema")
    document.getElementById("inventario_sistema").style.display="none"
    localStorage.removeItem("inventario_sistema");
    document.getElementById("sugerencias").style.display="none"
    localStorage.removeItem("permisos_sys");

    document.getElementById("nueva_categoria").style.display="block"
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"

}

function mostrar_perfl(){
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("mostrarr_proveedores"); 
    document.getElementById("pedidos_sistema").style.display="none"
    localStorage.removeItem("facturas_sistema")
    localStorage.removeItem("inventario_sistema");
    document.getElementById("sugerencias").style.display="none"
    localStorage.removeItem("permisos_sys");
    document.getElementById("mostra_reportes").style.display = "none"

    document.getElementById("perfil_usuario").style.display="block"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"

}

function perfil_user(){
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("mostrarr_proveedores"); 
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    localStorage.removeItem("facturas_sistema")
    document.getElementById("inventario_sistema").style.display="none"
    localStorage.removeItem("inventario_sistema");
    document.getElementById("sugerencias").style.display="none"
    localStorage.removeItem("permisos_sys");

    document.getElementById("perfil_data").style.display="block"
    document.getElementById("perfil_data_contraseña").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"


}

function mostrar_pass_perfil(){
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("mostrarr_proveedores"); 
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    localStorage.removeItem("facturas_sistema")
    localStorage.removeItem("inventario_sistema");
    document.getElementById("sugerencias").style.display="none"
    localStorage.removeItem("permisos_sys");

    document.getElementById("perfil_data").style.display="none"
    document.getElementById("perfil_data_contraseña").style.display="block"
    document.getElementById("permisos").style.display="none"
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"

    document.getElementById("facturas_sistema").style.display="none"

}

function mostrar_permisos(){
    localStorage.setItem("permisos_sys",1)
    localStorage.removeItem("inventario_sistema");
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("mostrarr_proveedores"); 
    localStorage.removeItem("facturas_sistema")
    localStorage.removeItem("Mostrar_Modulo_sugerencia");
    localStorage.removeItem("productos_sistema");
    localStorage.removeItem("pedidos_sistema");

    document.getElementById("sugerencias").style.display="none"
    document.getElementById("permisos").style.display="block"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    localStorage.removeItem("mostra_reportes");
    document.getElementById("mostra_reportes").style.display = "none"


}

function registro_permisos(){
    localStorage.removeItem("inventario_sistema");
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("mostrarr_proveedores"); 
    localStorage.removeItem("facturas_sistema")
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("nuevo_permiso").style.display="block"
    document.getElementById("permisos").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    document.getElementById("sugerencias").style.display="none"
    document.getElementById("roles_sistema").style.display="none";


}

function mostrar_roles(){
    localStorage.setItem("mostrar_roles",1)
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("inventario_sistema"); 
    localStorage.removeItem("permisos_sys");
    localStorage.removeItem("mostrar_categprias"); 
    localStorage.removeItem("facturas_sistema")
    localStorage.removeItem("Mostrar_Modulo_sugerencia");
    localStorage.removeItem("mostrarr_proveedores"); 
    document.getElementById("roles_sistema").style.display="block";
    document.getElementById("usuarios").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    document.getElementById("sugerencias").style.display="none"
    localStorage.removeItem("pedidos_sistema");
    localStorage.removeItem("mostra_reportes");
    document.getElementById("mostra_reportes").style.display = "none"

    localStorage.removeItem("permisos_sys");


}

function mostrar_registro_rol(){
    document.getElementById("Nuevo_rol").style.display="block";
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("usuarios").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    document.getElementById("sugerencias").style.display="none"

    localStorage.removeItem("permisos_sys");

}

function mostrar_proveedores(){
    localStorage.setItem("mostrarr_proveedores",1);
    document.getElementById("sugerencias").style.display="none"
    localStorage.removeItem("permisos_sys");
    document.getElementById("proveedores_sistema").style.display="block"
    document.getElementById("permisos").style.display="none"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("facturas_sistema")
    localStorage.removeItem("inventario_sistema");
    localStorage.removeItem("permisos_sys");
    localStorage.removeItem("pedidos_sistema");
    document.getElementById("mostra_reportes").style.display = "none"

    localStorage.removeItem("mostra_reportes");


}

function mostrar_registro_proveedores(){
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    document.getElementById("sugerencias").style.display="none"
    
    document.getElementById("nuevo_proveedor").style.display="block"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"

}

function mostrar_productos(){
    localStorage.setItem("productos_sistema",1);
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrarr_proveedores")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("facturas_sistema")
    localStorage.removeItem("inventario_sistema");
    localStorage.removeItem("permisos_sys");
    localStorage.removeItem("pedidos_sistema");

    document.getElementById("productos_sistema").style.display="block"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("sugerencias").style.display="none"
    localStorage.removeItem("mostra_reportes");
    document.getElementById("mostra_reportes").style.display = "none"

}

function mostrar_inventario(){
    localStorage.setItem("inventario_sistema",1);
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("facturas_sistema")
    localStorage.removeItem("mostrarr_proveedores")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("productos_sistema");
    document.getElementById("inventario_sistema").style.display="block"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    localStorage.removeItem("permisos_sys");
    localStorage.removeItem("pedidos_sistema");
    localStorage.removeItem("mostra_reportes");
    document.getElementById("mostra_reportes").style.display = "none"

    document.getElementById("sugerencias").style.display="none"
}

function mostrar_registro_productos(){
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    
    document.getElementById("nuevo_producto").style.display="block"
    document.getElementById("productos_sistema").style.display="none"
}

function mostrar_pedidos(){
    localStorage.setItem("pedidos_sistema",1);
    localStorage.removeItem("facturas_sistema")
    localStorage.removeItem("inventario_sistema")
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrarr_proveedores")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("productos_sistema");
    document.getElementById("pedidos_sistema").style.display="block"
    document.getElementById("inventario_sistema").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("sugerencias").style.display="none"
    localStorage.removeItem("permisos_sys");
    localStorage.removeItem("mostra_reportes");
    document.getElementById("mostra_reportes").style.display = "none"

}

function mostrar_facturas(){
    localStorage.setItem("facturas_sistema",1);
    localStorage.removeItem("pedidos_sistema")
    localStorage.removeItem("inventario_sistema")
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrarr_proveedores")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("productos_sistema");
    document.getElementById("facturas_sistema").style.display="block"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("sugerencias").style.display="none"
    localStorage.removeItem("permisos_sys");
    localStorage.removeItem("pedidos_sistema");
    localStorage.removeItem("mostra_reportes");
    document.getElementById("mostra_reportes").style.display = "none"


}

function mostrar_sugerencias(){
    localStorage.setItem("sugerencias",1);
    localStorage.removeItem("facturas_sistema")
    localStorage.removeItem("pedidos_sistema")
    localStorage.removeItem("inventario_sistema")
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrarr_proveedores")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("productos_sistema");
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("sugerencias").style.display="block"
    localStorage.removeItem("permisos_sys");
    localStorage.removeItem("pedidos_sistema");
    localStorage.removeItem("mostra_reportes");
    document.getElementById("mostra_reportes").style.display = "none"

}

function mostra_reportes(){
    localStorage.setItem("mostra_reportes",1);
    localStorage.removeItem("sugerencias");
    localStorage.removeItem("facturas_sistema")
    localStorage.removeItem("pedidos_sistema")
    localStorage.removeItem("inventario_sistema")
    localStorage.removeItem("mostrar_roles")
    localStorage.removeItem("mostrarr_proveedores")
    localStorage.removeItem("mostrar_usuarios")
    localStorage.removeItem("mostrar_categprias");
    localStorage.removeItem("productos_sistema");
    document.getElementById("mostra_reportes").style.display = "block"
    document.getElementById("facturas_sistema").style.display="none"
    document.getElementById("pedidos_sistema").style.display="none"
    document.getElementById("inventario_sistema").style.display="none"
    document.getElementById("productos_sistema").style.display="none"
    document.getElementById("proveedores_sistema").style.display="none"
    document.getElementById("permisos").style.display="none"
    document.getElementById("usuarios").style.display="none"
    document.getElementById("roles_sistema").style.display="none";
    document.getElementById("categorias_sistema").style.display="none"
    document.getElementById("sugerencias").style.display="block"
    localStorage.removeItem("permisos_sys");
    localStorage.removeItem("pedidos_sistema");
}
logeado();




