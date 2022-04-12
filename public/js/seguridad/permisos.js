var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");
$(document).ready(function () {
    $("#table_Permiso").change(function () {
        cargar_permisos();
    });



    $('#table_crear_permiso').DataTable({
        paging: false,
        searching: false,
        info: false,
    });


    $("#registro_permiso").click(function () {
        leer = $("#leer_permiso");
        crear = $("#crear_permiso");
        modificar = $("#modificar_permiso");
        eliminar = $("#eliminar_permiso");
        modulo = $("#modulos").val();
        rol = $("#roles").val();
        if (modulo == "" || rol == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe completar todo los campos.!',

            })
            return;
        }
        console.log(leer.is(":checked"))
        if (leer.is(":checked")) {
            leer_id = 1
            document.getElementById("leer_id").innerHTML = leer_id
        } else {
            leer_id = 0
            document.getElementById("leer_id").innerHTML = leer_id
        }
        if (crear.is(":checked")) {
            crear_id = 1
            document.getElementById("crear_id").innerHTML = crear_id
        } else {
            crear_id = 0
            document.getElementById("crear_id").innerHTML = crear_id
        }
        if (modificar.is(":checked")) {
            modificar_id = 1
            document.getElementById("modificar_id").innerHTML = modificar_id
        } else {
            modificar_id = 0
            document.getElementById("modificar_id").innerHTML = modificar_id
        }
        if (eliminar.is(":checked")) {
            eliminar_id = 1
            document.getElementById("eliminar_id").innerHTML = eliminar_id
        } else {
            eliminar_id = 0
            document.getElementById("eliminar_id").innerHTML = eliminar_id
        }

        id_leer = document.getElementById("leer_id");
        id_crear = document.getElementById("crear_id");
        id_modificar = document.getElementById("modificar_id");
        id_eliminar = document.getElementById("eliminar_id");
        console.log(id_leer, id_crear, id_modificar, id_eliminar)
        var settings = {
            "url": api + "permisos/nuevo",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                'Authorization': token
            },
            "data": JSON.stringify({ "CREAR": id_crear.innerHTML, "LEER": id_leer.innerHTML, "EDITAR": id_modificar.innerHTML, "BORRAR": id_eliminar.innerHTML, "COD_ROL": rol, "COD_MODULO": modulo }),
        };
        $.ajax(settings).done(function (response) {

            if (response.message) {

                Swal.fire(
                    'Registro Completo!',
                    'Se registro correctamente!',
                    'success'
                )
                id_crear.innerHTML = "";
                id_leer.innerHTML = "";
                id_modificar.innerHTML = "";
                id_eliminar.innerHTML = "";
                modulo = "";
                rol = "";
                $('#table_Permiso').dataTable().fnDestroy();
                cargar_permisos();
                document.getElementById("permisos").style.display = "block"
                document.getElementById("nuevo_permiso").style.display = "none"
            }

        });

    });


});

function cargar_permisos() {
    $("#container_contacts").empty();
    var settings = {
        "url": api + "permisos",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 11 }),
    };

    $.ajax(settings).done(function (response) {
       // console.log(response);

        $.each(response[0], function (key, val) {
            var leer
            if (val.LEER == 1) {
                leer = '<div class=" custom-control custom-switch"><input type="checkbox" class=" custom-control-input" id="leer' + val.COD_PERMISOS + '" checked><label class="custom-control-label" for="leer' + val.COD_PERMISOS + '"></label></div>'
                document.getElementById("ver_usuarios").style.display = "block"
                document.getElementById("ver_permisos").style.display = "block"



            } else {
                leer = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input"id="leer' + val.COD_PERMISOS + '"  ><label class="custom-control-label" for="leer' + val.COD_PERMISOS + '"></label></div>'
                document.getElementById("ver_permisos").style.display = "none"
                document.getElementById("ver_usuarios").style.display = "none"
            }

            var crear
            if (val.CREAR == 1) {
                crear = '<div class=" custom-control custom-switch"><input type="checkbox" class=" custom-control-input" id="crear' + val.COD_PERMISOS + '" checked><label class="custom-control-label" for="crear' + val.COD_PERMISOS + '"></label></div>'
                document.getElementById("nuevo_usuario").style.display = "none"
            } else {
                crear = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input" id="crear' + val.COD_PERMISOS + '"" ><label class="custom-control-label" for="crear' + val.COD_PERMISOS + '"></label></div>'
            }

            var modificar
            if (val.MODIFICAR == 1) {
                modificar = '<div class=" custom-control custom-switch"><input type="checkbox" class=" custom-control-input"id="modificar' + val.COD_PERMISOS + '" checked><label class="custom-control-label" for="modificar' + val.COD_PERMISOS + '"></label></div>'

            } else {
                modificar = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input"id="modificar' + val.COD_PERMISOS + '"  ><label class="custom-control-label" for="modificar' + val.COD_PERMISOS + '"></label></div>'
            }

            var eliminar
            if (val.ELIMINAR == 1) {
                eliminar = '<div class=" custom-control custom-switch"><input type="checkbox" class=" custom-control-input"id="eliminar' + val.COD_PERMISOS + '"  checked><label class="custom-control-label" for="eliminar' + val.COD_PERMISOS + '"></label></div>'

            } else {
                eliminar = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input"id="eliminar' + val.COD_PERMISOS + '" ><label class="custom-control-label" for="eliminar' + val.COD_PERMISOS + '"></label></div>'
            }
            $("#container_contacts").append("<tr><td>" + leer + "</td><td>" + crear + "</td><td>" + modificar + "</td><td>" + eliminar + "</td><td>" + val.NOM_MODULO + "</td><td>" + val.NOM_ROL + "</td><td style='display: none; '>" + val.COD_PERMISOS + "</td><td style='display: none; '>" + val.COD_ROL + "</td><td style='display: none; '>" + val.COD_MODULO + "</td></tr>");
        });
        $('#table_Permiso').dataTable().fnDestroy();
        var table = $('#table_Permiso').DataTable({
            "bLengthChange": false,
            "bInfo": false,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },

        });
        $('.dataTables_filter input').attr("placeholder", "Buscar datos en la tabla")
        $('#table_Permiso tbody').on('click', 'tr', function () {
            var data = table.row(this).data();
            id_permiso_leer = document.getElementById("leer" + data[6])
            id_permiso_crear = document.getElementById("crear" + data[6])
            id_permiso_modificar = document.getElementById("modificar" + data[6])
            id_permiso_eliminar = document.getElementById("eliminar" + data[6])
            ld_permiso = data[6];
            ld_rol = data[7];
            ld_modulo = data[8];
            document.getElementById("id_permiso").innerHTML = ld_permiso;
            document.getElementById("id_modulo").innerHTML = ld_modulo;
            document.getElementById("id_rol").innerHTML = ld_modulo;
            console.log(data);

            if (id_permiso_leer.checked) {
                leer = 1
                document.getElementById("leer").innerHTML = leer
                console.log(leer);

            }
            else {
                leer = 0
                document.getElementById("leer").innerHTML = leer
                console.log(leer);

            }

            if (id_permiso_crear.checked) {
                crear = 1
                document.getElementById("crear").innerHTML = crear;
                console.log(leer);

            }
            else {
                crear = 0
                document.getElementById("crear").innerHTML = crear;
                console.log(leer);

            }

            if (id_permiso_modificar.checked) {
                modificar = 1
                document.getElementById("modificar").innerHTML = modificar;
                console.log(leer);

            }
            else {
                modificar = 0
                document.getElementById("modificar").innerHTML = modificar;
                console.log(leer);

            }

            if (id_permiso_eliminar.checked) {
                eliminar = 1
                document.getElementById("eliminar").innerHTML = eliminar;
                console.log(leer);

            }
            else {
                eliminar = 0
                document.getElementById("eliminar").innerHTML = eliminar;
                console.log(leer);

            }
            editar_permiso();
        });



    });


}


function editar_permiso() {
    leer = document.getElementById("leer");
    crear = document.getElementById("crear");
    modificar = document.getElementById("modificar");
    eliminar = document.getElementById("eliminar");
    id_permiso = document.getElementById("id_permiso");
    id_modulo = document.getElementById("id_modulo");
    id_rol = document.getElementById("id_rol");

    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "permisos/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "CREAR": crear.innerHTML, "LEER": leer.innerHTML, "EDITAR": modificar.innerHTML, "BORRAR": eliminar.innerHTML, "COD_ROL": id_rol.innerHTML, "COD_MODULO": id_modulo.innerHTML, "COD_PERMISO": id_permiso.innerHTML, "COD_USUARIO": id_user, "NOM_USUARIO": user_logeado, "_CODMODULO": 11
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

function nuevo_permiso() {

}
function obtener_Roles() {
    var roles_usuarios = document.getElementById("roles");
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
function obtener_modulos() {
    var roles_usuarios = document.getElementById("modulos");
    var id_user = localStorage.getItem("id_usuario");
    var token = localStorage.getItem("token");
    var myHeader = new Headers({
        'Authorization': token
    });
    url_modulos = api + "modulos";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_modulos, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //  console.log(data)
            data[0].forEach(modulo => {
                var opcion = document.createElement("option");
                opcion.value = modulo.COD_MODULO;
                opcion.innerHTML = modulo.NOM_MODULO;
                roles_usuarios.appendChild(opcion);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

}


function cancerlar_permisos() {
    document.getElementById("permisos").style.display = "block"
    document.getElementById("nuevo_permiso").style.display = "none"
}
obtener_Roles();
obtener_modulos();
cargar_permisos();

