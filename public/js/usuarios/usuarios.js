var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");


$(document).ready(function () {
    $("#table_id").change(function () {
        cargar_usuarios();
    });
    //registro de usuarios 
    $("#registro-usuarios").click(function () {
        cliente = $("#nom_usuario").val();
        correo = $("#email").val();
        usuario = $("#usuario").val();
        clave = $("#Contraseña").val();
        confi_clave = $("#confirmar_contraseña").val();
        telefono = $("#telefono").val();
        idenficacion = $("#identificacion").val();
        no_identificacion = $("#cod_identificacion").val();
        direccion = $("#direccion").val();
        rol = $("#rol").val();
        valido = document.getElementById("contraseñaOK").textContent
        correovalido = document.getElementById("UcorreoOK").textContent
      

        if (cliente == "" || correo == "" || usuario == "" || clave == "" || telefono == "" || idenficacion == "" || no_identificacion == "" || direccion == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe completar todo los campos.!',
            })
            return;
        }
        if (valido != "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe Proporcionar una contraseña Valida.!',
            })
            return;
        }

        if (correovalido != "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe Proporcionar un correo valido.!',
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
            "url": api + "usuarios/nuevo",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                'Authorization': token
            },
            "data": JSON.stringify({ "NOM_PERSONA": cliente, "USER_EMAIL": correo, "NUM_CEL": telefono, "NOM_USUARIO": usuario, "CLAVE": clave, "NOM_IDENTIFICACION": idenficacion, "COD_IDENTIFICACION": no_identificacion, "DIRECCION": direccion, "COD_ROL": rol, "COD_MODULO": 1 }),
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
                get_lista_usuarios()
                limpiar();
                document.getElementById("nuevo_usuario").style.display = "none"
                document.getElementById("usuarios").style.display = "block"
            }

        });

    });

});

function cargar_usuarios() {
    $("#contenido_usuarios").empty();
    var settings = {
        "url": api + "usuarios",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, }),
    };

    $.ajax(settings).done(function (response) {


        $.each(response[0], function (key, val) {

            var estado
            if (val.Estado == 1) {
                estado = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input" id="estado_user' + val.COD_USUARIO + '" checked><label class="custom-control-label" for="estado_user' + val.COD_USUARIO + '"></label></div>'
            } else {
                estado = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input"id="estado_user' + val.COD_USUARIO + '"  ><label class="custom-control-label" for="estado_user' + val.COD_USUARIO + '"></label></div>'
            }

            editar = "<button type='input' class='editar btn btn-round btn-lg btn-icon-only btn-secondary mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Editar Datos de Usuario'><i class='fas fa-pencil-alt' aria-hidden='true'></i> <button type='input' class='contraseña btn btn-round btn-lg btn-icon-only btn-warning mx-2 mx-lg-3 mb-4' data-toggle='tooltip' data-placement='left' title='Cambiar Contraseña'><i class='fa fa-unlock-alt' aria-hidden='true'></i>"
            $("#contenido_usuarios").append("<tr><td>" + editar + "</td><td>" + val.Nombre + "</td><td>" + val.Correo + "</td><td>" + val.Telefono + "</td><td>" + val.DIRECCION + "</td><td>" + val.NOM_IDENTIFICACION + "</td><td>" + val.COD_IDENTIFICACION + "</td><td>" + val.Usuario + "</td><td>" + val.Rol + "</td><td>" + estado + "</td><td style='display: none; '>" + val.Estado + "</td><td style='display: none; '>" + val.Cod_Rol + "</td><td style='display: none; '>" + val.COD_USUARIO + "</td><td style='display: none; '>" + val.COD_PERSONA + "</td></tr>");
        });
        $('#table_id').dataTable().fnDestroy();
        var table = $('#table_id').DataTable({
            "bLengthChange": false,
            "bInfo": true,
            "pageLength": 4,
            "orderable": true,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            "dom": 'Blfrtip',
            
            "buttons": [
                {
                    text: '<button class="btn btn-primary"><i class="fa fa-user-plus"></i> Nuevo Usuario</button>',
                    action: function (e, dt, node, config) {
                        mostrar_registro();
                    },
                    
                } ,
                   
            {
                //Botón para Excel
                extend: 'excel',
                title: 'Archivo',
                filename: 'Export_File',

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-success"><i class="fas fa-file-excel"></i> Exportar a Excel </button>',
                exportOptions: {
                    columns: [1, 2, 3,4,5,6,7,8 ]
                }
            },
            //Botón para PDF
            {
                extend: 'pdf',
                title: 'Archivo PDF',
                filename: 'Reporte de Usuarios del Sistema',
                //orientation: 'landscape',//landscape give you more space
                pageSize: 'A3',//A0 is the largest A5 smallest(A0,A1,A2,A3,legal,A4,A5,letter))
                text: '<button class="btn btn-danger"><i class="far fa-file-pdf"></i> Exportar a PDF </button>',
                exportOptions: {
                    columns: [1, 2, 3,4,5,6,7,8 ]
                }
            },
            ]
            


    });
    $('.dataTables_filter input').attr("placeholder", "Buscar datos en la tabla")
    activar_usuario("#table_id tbody", table);
    obtener_data_cod_user("#table_id tbody", table);
    obtener_data_cambiar_clave("#table_id tbody", table);

    //funciones para obtener data especifica de la datatable 
    function obtener_data_cod_user(tbody, table) {
        $(tbody).on("click", "button.editar", function () {
            var data = table.row($(this).parents("tr")).data();
            console.log(data);
            cliente = $("#A_nom_usuario").val(data[1]);
            correo = $("#A_email").val(data[2]);
            usuario = $("#A_Usuario").val(data[7]);
            telefono = $("#A_telefono").val(data[3]);
            idenficacion = $("#A_identificacion").val(data[5]);
            no_identificacion = $("#A_cod_identificacion").val(data[6]);
            direccion = $("#A_direccion").val(data[4]);
            persona = $("#cod_persona").val(data[13]);
            rol = $("#A_rol").val(data[11]);

            estado = $("#A_estado").val(data[10]);
            document.getElementById("actualizar_usuario").style.display = "block"
            document.getElementById("usuarios").style.display = "none"
            document.getElementById("nuevo_usuario").style.display = "none"
        })

    }
    function obtener_data_cambiar_clave(tbody, table) {
        $(tbody).on("click", "button.contraseña", function () {
            var data = table.row($(this).parents("tr")).data();
            console.log(data);
            $("#AP_Usuario").val(data[7]);
            document.getElementById("actualizar_pass_user").style.display = "block"
            document.getElementById("actualizar_usuario").style.display = "none"
            document.getElementById("usuarios").style.display = "none"
            document.getElementById("nuevo_usuario").style.display = "none"
        })

    }
    function activar_usuario(tbody, table) {
        $(tbody).on("click", "input.estado", function () {

            var data = table.row($(this).parents("tr")).data();
            console.log(data);
            id_estado_user = document.getElementById("estado_user" + data[12])
            var estado
            if (id_estado_user.checked) {
                estado = 0
                document.getElementById("id_estado_usuario").innerHTML = estado
                console.log(estado);

            }
            else {
                estado = 1
                document.getElementById("id_estado_usuario").innerHTML = estado
                console.log(estado);

            }


            document.getElementById("id_estado_usuario").innerHTML = estado
            editar_estado_usuario(estado, data[12]);


        })

    }




});
}

function editar_estado_usuario(estado, id_usuario) {
    var tipo = 1
    if (tipo == "1") {
        var myHeader = new Headers({
            'Authorization': token
        });
        url_ususari_estado = api + "usuarios/usuario_estado";
        myHeader.append("Content-Type", "application/json",);

        var raw = JSON.stringify({ "COD_ESTADO": estado, "COD_USUARIO": id_usuario, "COD_MODULO": 10, });
        var requestOptions = {
            method: 'PUT',
            headers: myHeader,
            body: raw,
            redirect: 'follow'
        };
        fetch(url_ususari_estado, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result) {

                }
            })
            .catch(error => console.log('error', error));
    }
}

function mostrar_data_perfil() {
    var id_user = localStorage.getItem("id_usuario");
    var token = localStorage.getItem("token");
    var myHeader = new Headers({
        'Authorization': token
    });
    url_usuario = api + "usuarios/buscar";
    myHeader.append("Content-Type", "application/json",);

    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_usuario, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            $("#Perfil_Usuario").val(data.data[0].Nombre);
            $("#Perfil_Correo").val(data.data[0].Correo);
            $("#Perfil_telefono").val(data.data[0].Telefono);
            $("#Perfil_Direccion").val(data.data[0].DIRECCION);
            $("#Perfil_id_tipo_ide").val(data.data[0].identificacion);
            $("#Perfil_idenficacion").val(data.data[0].num_identificacion);
            rol_perfil = document.getElementById("Perfil_id_rol");
            rol_perfil.innerHTML = data.data[0].cod_rol;
            estado = document.getElementById("estado_perfil");
            estado.innerHTML = data.data[0].Estado;
            persona_perfil = document.getElementById("persona_perfil");
            persona_perfil.innerHTML = data.data[0].COD_PERSONA;
            usuario = document.getElementById("usuario_sistema");
            usuario.innerHTML = data.data[0].Usuario;
            rol = document.getElementById("rol_user");
            rol.innerHTML = data.data[0].Rol;
            clave_actual = document.getElementById("clave_actual");
            clave_actual.innerHTML = data.clave;;


        })
        .catch(function (err) {
            console.log(err);
        });

}

mostrar_data_perfil();
obtener_Roles();
function actualizar_datos() {
    cliente = $("#A_nom_usuario").val();
    correo = $("#A_email").val();
    usuario = $("#A_Usuario").val();
    telefono = $("#A_telefono").val();
    idenficacion = $("#A_identificacion").val();
    no_identificacion = $("#A_cod_identificacion").val();
    direccion = $("#A_direccion").val();
    rol = $("#A_rol").val();
    estado = $("#A_estado").val();
    persona = $("#cod_persona").val();
    if (cliente == "" || correo == "" || usuario == "" || telefono == ""
        || idenficacion == "" || no_identificacion == "" || direccion == ""
        || rol == "" || estado == "" || persona == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Debe completar todo los campos.!',

        })
        return;
    }
    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_usuarios = api + "usuarios/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "COD_PERSONA": persona, "NOM_PERSONA": cliente, "USER_EMAIL": correo, "NUM_CEL": telefono, "NOM_USUARIO": usuario,
        "NOM_IDENTIFICACION": idenficacion, "COD_IDENTIFICACION": no_identificacion,
        "DIRECCION": direccion, "COD_ROL": rol, "COD_ESTADO": rol, "COD_USUARIO": estado, "COD_MODULO": 9
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_usuarios, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result == "1") {
                Swal.fire(
                    'Registro Modificado!',
                    'Se Modifico correctamente!',
                    'success'
                )
                document.getElementById("alerta_usuarios").style.display = "block"
                cancelar()
                get_lista_usuarios()


            }
        })
        .catch(error => console.log('error', error));


}

function actualizar_perfil() {
    nombre = $("#Perfil_Usuario").val();
    correo = $("#Perfil_Correo").val();
    telefono = $("#Perfil_telefono").val();
    usuario = $("#Perfil_Direccion").val();
    direccion = $("#Perfil_Direccion").val();
    idenficacion = $("#Perfil_id_tipo_ide").val();
    no_identificacion = $("#Perfil_idenficacion").val();
    //ver funcionalidad ------------------------- pendiente 
    rol = document.getElementById("Perfil_id_rol");;
    estado = document.getElementById("estado_perfil");
    persona = document.getElementById("persona_perfil");

    if (nombre == "" || correo == "" || usuario == "" || telefono == ""
        || idenficacion == "" || no_identificacion == "" || direccion == ""
        || rol == "" || estado == "" || persona == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Debe completar todo los campos.!',

        })
        return;
    }
    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_usuarios = api + "usuarios/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "COD_PERSONA": persona.innerHTML, "NOM_PERSONA": nombre, "USER_EMAIL": correo, "NUM_CEL": telefono, "NOM_USUARIO": usuario,
        "NOM_IDENTIFICACION": idenficacion, "COD_IDENTIFICACION": no_identificacion,
        "DIRECCION": direccion, "COD_ROL": rol.innerHTML, "COD_ESTADO": estado.innerHTML, "COD_USUARIO": id_user, "COD_MODULO": 9
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_usuarios, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result == "1") {
                Swal.fire(
                    'Registro Modificado!',
                    'Se Modifico correctamente!',
                    'success'
                )
            }
        })
        .catch(error => console.log('error', error));



}
function actualizar_contraseña_perfil() {

    usuario = document.getElementById("usuario_sistema");
    pass_actual = document.getElementById("clave_actual");

    verificar_clave = $("#contraseña_actual").val();
    clave_nueva = $("#nueva_contraseña_perfil").val();
    confi_clave = $("#confirmar_contraseña_perfil").val();

    if (clave_actual == "" || clave_nueva == "" || confi_clave == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Debe completar todo los campos.!',

        })
        return;
    }
    console.log(pass_actual)
    if (verificar_clave != pass_actual.innerHTML) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡La Contraseña Actual no Coinciden con los datos del sistema.!',
        })
        return;
    }

    if (clave_nueva != confi_clave) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡La Contraseña no Coinciden o no es Valida.!',
        })
        return;
    }
    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_usuarios = api + "usuarios/clave";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "CLAVE": clave_nueva, "NOM_USUARIO": usuario.innerHTML, "COD_USUARIO": id_user, "COD_MODULO": 9 });
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_usuarios, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result) {
                Swal.fire(
                    'Registro Modificado!',
                    'Se Modifico correctamente, favor reinicie sesión!',
                    'success'
                )
                localStorage.setItem("logeado", "0");
                localStorage.removeItem("id_usuario");
                localStorage.removeItem("usuario");
                localStorage.removeItem("token");
                localStorage.removeItem("rol");
                $("#contraseña_actual").val("");
                $("#nueva_contraseña_perfil").val("");
                $("#confirmar_contraseña_perfil").val("");

                mostrarlogin();
            }
        })
        .catch(error => console.log('error', error));


}

function actualizar_contraseña_user() {
    usuario = $("#AP_Usuario").val();
    clave = $("#A_pass").val();
    confi_clave = $("#A_pass_conf").val();

    if (usuario == "" || clave == "") {
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
    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_usuarios = api + "usuarios/clave";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "CLAVE": clave, "NOM_USUARIO": usuario, "COD_USUARIO": id_user, "COD_MODULO": 9 });
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_usuarios, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result) {
                Swal.fire(
                    'Registro Modificado!',
                    'Se Modifico correctamente!',
                    'success'
                )
                cancelar()
            }
        })
        .catch(error => console.log('error', error));


}

function limpiar() {
    cliente = "";
    correo = "";
    usuario = "";
    clave = "";
    telefono = "";
    idenficacion = "";
    no_identificacion = "";
    direccion = "";
}





function cancelar() {
    cliente = "";
    correo = "";
    usuario = "";
    clave = "";
    telefono = "";
    idenficacion = "";
    no_identificacion = "";
    direccion = "";
    document.getElementById("nuevo_usuario").style.display = "none"
    document.getElementById("usuarios").style.display = "block"
    document.getElementById("actualizar_pass_user").style.display = "none"
    document.getElementById("actualizar_usuario").style.display = "none"
}

function obtener_Roles() {
    var roles_usuarios = document.getElementById("rol");
    var id_user = localStorage.getItem("id_usuario");
    var token = localStorage.getItem("token");
    var myHeader = new Headers({
        'Authorization': token
    });
    url_roles = api + "roles";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_roles, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //  console.log(data)
            data[0].forEach(rol => {
                var opcion = document.createElement("option");
                opcion.value = rol.COD_ROL;
                opcion.innerHTML = rol.NOM_ROL;
                roles_usuarios.appendChild(opcion);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

}
function obtener_Roles_A() {
    var roles_usuarios = document.getElementById("A_rol");
    var id_user = localStorage.getItem("id_usuario");
    var token = localStorage.getItem("token");
    var myHeader = new Headers({
        'Authorization': token
    });
    url_roles = api + "roles";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_roles, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data)
            data[0].forEach(rol => {
                var opcion = document.createElement("option");
                opcion.value = rol.COD_ROL;
                opcion.innerHTML = rol.NOM_ROL;
                roles_usuarios.appendChild(opcion);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

}

let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
            location.reload();
            document.getElementById("roles_sistema").style.display = "block"
})
obtener_Roles_A();
cargar_usuarios();