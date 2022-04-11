var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");


$(document).ready(function () {
    $("#table_rol").change(function () {
        cargar_roles_sys();
    });
    $("#registro_roles").click(function () {
        rol = $("#R_Rol_Nom").val();
        if (estado == "" || rol == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe completar todo los campos.!',

            })
            return;
        }
        var settings = {
            "url": api + "roles/nuevo",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                'Authorization': token
            },
            "data": JSON.stringify({ "NOM_ROL":rol,"COD_USUARIO":id_user, "COD_MODULO":11}),
        };
        $.ajax(settings).done(function (response) {
            if(response.rol_existe){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡El Rol ingresado ya existe, favor ingresar uno nuevo.!',
        
                })
            }
            if (response.message) {

                Swal.fire(
                    'Registro Completo!',
                    'Se registro correctamente!',
                    'success'
                )
                rol = "";

                $('#table_rol').dataTable().fnDestroy();
                cargar_permisos();
                document.getElementById("roles_sistema").style.display = "block"
                document.getElementById("Nuevo_rol").style.display = "none"
            }

        });

    });





});

function cargar_roles_sys() {
    $("#contenido_roles").empty();
    var settings = {
        "url": api + "roles",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 11 }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        $.each(response[0], function (key, val) {
            var estado
            if (val.COD_ESTADO == 1) {
                estado = '<div class=" custom-control custom-switch"><input type="checkbox" class=" custom-control-input" id="estado' + val.COD_ROL + '" checked><label class="custom-control-label" for="estado' + val.COD_ROL + '"></label></div>'
            } else {
                estado = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input"id="estado' + val.COD_ROL + '"  ><label class="custom-control-label" for="estado' + val.COD_ROL + '"></label></div>'
            }
            console.log(val.NOM_ROL)
            editar = "<button type='input' id='editar" + val.COD_ROL + "' onclick='mostrar_formu_actualizar()' class='btn btn-success'  data-toggle='tooltip' data-placement='left' title='Editar Rol'><i class='fas fa-pencil-alt' aria-hidden='true'></i>"
            $("#contenido_roles").append("<tr><td>" + editar + "</td><td>" + val.NOM_ROL + "</td><td>" + estado + "</td><td style='display: none; '>" + val.COD_ESTADO + "</td><td style='display: none; '>" + val.COD_ROL + "</td></tr>");
        });
        $('#table_rol').dataTable().fnDestroy();
        var table = $('#table_rol').DataTable({
            "bLengthChange": false,
            "bInfo": false,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },

        });
        $('.dataTables_filter input').attr("placeholder", "Buscar datos en la tabla")
        $('#table_rol tbody').on('click', 'tr', function () {
            var data = table.row(this).data();
            console.log(data[0])
            nom_rol = data[1];
            id_rol = data[4]
            id_estado_rol = document.getElementById("estado" + data[4])
            var estado
            if (id_estado_rol.checked) {
                estado = 1
                document.getElementById("estado").innerHTML = estado
                console.log(estado);

            }
            else {
                estado = 0
                document.getElementById("estado").innerHTML = estado
                console.log(estado);

            }

            document.getElementById("id_rol").innerHTML = id_rol
            document.getElementById("id_estado").innerHTML = estado
            actualizar_permiso_estado(nom_rol, estado, id_rol);
            

        });



    });


}

function mostrar_formu_actualizar() {
    document.getElementById("actualizar_roles").style.display = "block"
    document.getElementById("roles_sistema").style.display = "none"
}

function actualizar_rol() {
    id_rol = document.getElementById("id_rol");
    id_estado = document.getElementById("id_estado");
    nombre_rol = $("#Anom_rol").val(); 
    if (nombre_rol == "" ) {
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
    url_actualizar_permisos = api + "roles/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_ROL": nombre_rol, "NOM_USUARIO": user_logeado, "COD_ESTADO": id_estado.innerHTML, "COD_USUARIO": id_user, "COD_MODULO": 11, "COD_ROL": id_rol.innerHTML
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_permisos, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result) {

                Swal.fire(
                    'Registro Actualizado!',
                    'Los datos se modificaron correctamente!',
                    'success'
                )
                id_rol.innerHTML = "";
                id_estado.innerHTML = "";
                nombre_rol = "";

                  
                cargar_roles_sys();

                document.getElementById("roles_sistema").style.display = "block"
                document.getElementById("actualizar_roles").style.display = "none"
                document.getElementById("alerta").style.display = "block"
                document.getElementById("cargar_data").style.display = "block"
            }
        })
        .catch(error => console.log('error', error));

       

}

function actualizar_permiso_estado(rol, estado, id_rol) {
    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "roles/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_ROL": rol, "NOM_USUARIO": user_logeado, "COD_ESTADO": estado, "COD_USUARIO": id_user, "COD_MODULO": 11, "COD_ROL": id_rol
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_permisos, requestOptions)
        .then(response => response.text())
        .then(result => {

        })
        .catch(error => console.log('error', error));
}

function cancelar_rol() {
    document.getElementById("actualizar_roles").style.display = "none"
    document.getElementById("roles_sistema").style.display = "block"
}

function cargar_data(){
    $('#table_rol').dataTable().fnDestroy();
    cargar_roles_sys();
    document.getElementById("roles_sistema").style.display = "block"
    document.getElementById("actualizar_roles").style.display = "none"
    
}

function cancelar_registro(){
    document.getElementById("actualizar_roles").style.display = "none"
    document.getElementById("roles_sistema").style.display = "block"
    document.getElementById("Nuevo_rol").style.display = "none"
}


let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
            location.reload();
            document.getElementById("roles_sistema").style.display = "block"
})

cargar_roles_sys();
 