var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");


$(document).ready(function () {
    $("#table_proveedores").change(function () {
        cargar_proveedores_sys();
    });

    $("#registro_proveedor").click(function () {
        nom_proveedor = $("#RNom_proveedor").val();
        correo = $("#RCorreo_proveedor").val();
        direccion = $("#Rdireccion_proveedor").val();
        telefono = $("#RTelefono_proveedor").val();
        if (nom_proveedor == "" || correo == "" || direccion == "" || telefono == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe completar todo los campos.!',

            })
            return;
        }
        valido = document.getElementById("Correo_proveedor").textContent

        if (valido != "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe Proporcionar un correo valid.!',
            })
            return;
        }
        var settings = {
            "url": api + "proveedores/nuevo",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                'Authorization': token
            },
            "data": JSON.stringify({ "NOM_PROVEEDOR": nom_proveedor, "DIRECCION": direccion, "NUM_CEL": telefono, "USER_EMAIL": correo, "COD_MODULO": 4, "COD_USUARIO": id_user }),
        };
        $.ajax(settings).done(function (response) {
            if (response.message) {

                Swal.fire(
                    'Registro Completo!',
                    'Se registro correctamente!',
                    'success'
                )

                nom_proveedor = "";
                correo = "";
                direccion = "";
                telefono = "";
                $('#table_proveedores').dataTable().fnDestroy();
                cargar_proveedores_sys();
                document.getElementById("nuevo_proveedor").style.display = "none"
                document.getElementById("proveedores_sistema").style.display = "block"
            }

        });

    });





});

function cargar_proveedores_sys() {
    $("#contenido_proveedores").empty();
    var settings = {
        "url": api + "proveedores",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 4 }),
    };

    

    $.ajax(settings).done(function (response) {
      //  console.log(response);

        $.each(response[0], function (key, val) {
            var estado
            if (val.ESTADO == 1) {
                estado = '<div class=" custom-control custom-switch"><input type="checkbox" class=" custom-control-input" id="estado_proveedor' + val.COD_PROVEEDORES + '" checked><label class="custom-control-label" for="estado_proveedor' + val.COD_PROVEEDORES + '"></label></div>'
            } else {
                estado = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input"id="estado_proveedor' + val.COD_PROVEEDORES + '"  ><label class="custom-control-label" for="estado_proveedor' + val.COD_PROVEEDORES + '"></label></div>'
            }
            // console.log(val.NOM_ROL)
            editar = "<button type='input' id='editar" + val.COD_PROVEEDORES + "' onclick='mostrar_actualizar_proveedores()' class='btn btn-round btn-lg btn-icon-only btn-secondary mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Editar Proveedor'><i class='fas fa-pencil-alt' aria-hidden='true'></i> <button type='input' id='refresh" + val.COD_PROVEEDORES + "' onclick='eliminar_proveedor(" + val.COD_PROVEEDORES + ")' class='btn btn-round btn-lg btn-icon-only btn-danger mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Eliminar Proveedores'><i class='fa fa-trash' aria-hidden='true'></i>"
            $("#contenido_proveedores").append("<tr><td>" + editar + "</td><td>" + val.proveedor + "</td><td>" + val.correo + "</td><td>" + val.telefono + "</td><td>" + val.DIRECCION + "</td><td>" + estado + "</td><td style='display: none; '>" + val.COD_PROVEEDORES + "</td></tr>");
        });
        $('#table_proveedores').dataTable().fnDestroy();
        var table = $('#table_proveedores').DataTable({
            "bLengthChange": false,
            "bInfo": true,
            "pageLength": 5,
            "orderable": true,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            "dom": 'Blfrtip',

            "buttons": [
                {
                    text: '<button class="btn btn-primary"><i class="fa fa-user"></i> Nuevo Proveedor</button>',
                    action: function (e, dt, node, config) {
                        mostrar_registro_proveedores();
                    },

                },

                {
                    //Botón para Excel
                    extend: 'excel',
                    title: 'Archivo',
                    filename: 'Export_File',

                    //Aquí es donde generas el botón personalizado
                    text: '<button class="btn btn-success"><i class="fas fa-file-excel"></i> Exportar a Excel </button>',
                    exportOptions: {
                        columns: [1, 2, 3, 4]
                    }
                },
                //Botón para PDF
                {
                    extend: 'pdf',
                    title: 'Reporte de Proveedores',
                    filename: 'Reporte de Proveedores',
                    //orientation: 'landscape',//landscape give you more space
                    pageSize: 'A4',//A0 is the largest A5 smallest(A0,A1,A2,A3,legal,A4,A5,letter))
                    text: '<button class="btn btn-danger"><i class="far fa-file-pdf"></i> Exportar a PDF </button>',
                    exportOptions: {
                        columns: [2, 3]
                    },


                },
            ]

        });
        $('.dataTables_filter input').attr("placeholder", "Buscar datos en la tabla")
        $('#table_proveedores tbody').on('click', 'tr', function () {
            var data = table.row(this).data();
            console.log(data)

            id_estado_proveedor = document.getElementById("estado_proveedor" + data[6])
            var estado
            if (id_estado_proveedor.checked) {
                estado = 1
                document.getElementById("estado_proveedor").innerHTML = estado
                console.log(estado);

            }
            else {
                estado = 2
                document.getElementById("estado_proveedor").innerHTML = estado
                console.log(estado);

            }

            document.getElementById("estado_proveedor").innerHTML = estado

            actualizar_proveedor_estado(data[1], data[4], data[3], data[4], estado, data[6]);
            document.getElementById("cod_proveedor").innerHTML = data[6]
            document.getElementById("id_estado_proveedor").innerHTML = estado
            $("#ANom_proveedor").val(data[1]);
            $("#ACorreo_proveedor").val(data[2]);
            $("#Adireccion_proveedor").val(data[4]);
            $("#ATelefono_proveedor").val(data[3]);

        });



    });



}
function eliminar_proveedor(cod_proveedor) {
    var myHeader = new Headers({
        'Authorization': token
    });
    url_eliminar = api + "proveedores/eliminar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "COD_PROVEEDOR": cod_proveedor, "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 13
    });
    var requestOptions = {
        method: 'DELETE',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrás revertir esto.!",
        icon: 'Advertencia',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(url_eliminar, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log( result)
                    if (result=='{"message":"Registro No puede eliminarse, contiene productos asociados","COD_PROVEEDOR":2}') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '¡Registro No puede eliminarse, contiene productos asociados.!',

                        })
                    }
                    else{
                        Swal.fire(
                            'Registro Eliminado!',
                            'Registro Eliminado, correctamente.',
                            'success'
                          )
                    }
                    $('#table_proveedores').dataTable().fnDestroy();
                    cargar_proveedores_sys();
                })
                .catch(error => console.log('error', error));
        }
    })

}

function actualizar_proveedor_estado(nom_proveedor, direccion, telefono, correo, estado, cod_proveedor) {
    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "proveedores/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_USUARIO": user_logeado, "NOM_PROVEEDOR": nom_proveedor, "DIRECCION": direccion, "NUM_CEL": telefono, "USER_EMAIL": correo, "COD_ESTADO": estado, "COD_MODULO": 4, "COD_USUARIO": id_user, "COD_PROVEEDOR": cod_proveedor
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
function mostrar_actualizar_proveedores() {
    document.getElementById("actualizar_proveedor").style.display = "block"
    document.getElementById("proveedores_sistema").style.display = "none"
}

function cancelar_actu_proveedor() {
    document.getElementById("actualizar_proveedor").style.display = "none"
    document.getElementById("proveedores_sistema").style.display = "block"
}

function cancelar_rproveedor() {
    document.getElementById("nuevo_proveedor").style.display = "none"
    document.getElementById("proveedores_sistema").style.display = "block"
}

function actualizar_proveedor() {
    estado = document.getElementById("id_estado_proveedor")
    nom_proveedor = $("#ANom_proveedor").val();
    correo = $("#ACorreo_proveedor").val();
    direccion = $("#Adireccion_proveedor").val();
    telefono = $("#ATelefono_proveedor").val();
    id_proveedor = document.getElementById("cod_proveedor")
    valido = document.getElementById("A_Correo_proveedor").textContent

    if (valido != "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Debe Proporcionar un correo valido.!',
        })
        return;
    }
    var myHeader = new Headers({
        'Authorization': token
    });


    url_actualizar_permisos = api + "proveedores/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_USUARIO": user_logeado, "NOM_PROVEEDOR": nom_proveedor, "DIRECCION": direccion, "NUM_CEL": telefono, "USER_EMAIL": correo, "COD_ESTADO": estado.innerHTML, "COD_MODULO": 4, "COD_USUARIO": id_user, "COD_PROVEEDOR": id_proveedor.innerHTML
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
            console.log(result)
            if (result) {
                Swal.fire(
                    'Cambios Completados!',
                    'Se modificaron los datos correctamente!',
                    'success'
                )
                estado.innerHTML = ""
                nom_proveedor = ""
                correo = ""
                direccion = ""
                telefono = ""
                id_proveedor.innerHTML = ""
                document.getElementById("actualizar_proveedor").style.display = "none"
                document.getElementById("alerta_proveedores").style.display = "block"
                document.getElementById("proveedores_sistema").style.display = "block"
            }
        })

        .catch(error => console.log('error', error));

}


let refresh_proveedores = document.getElementById('refresh_proveedores');
refresh_proveedores.addEventListener('click', _ => {
    location.reload();
})



cargar_proveedores_sys();