var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");


$(document).ready(function () {
    $("#table_categoria").change(function () {
        cargar_categorias_sys();
    });


    $("#registro_categorias").click(function () {
        categoria = $("#Nom_categoria").val();
        descripcion = $("#des_categoria").val();
        url = $("#m1").val();
        console.log(url)
        if (descripcion == "" || descripcion == "" || url == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe completar todo los campos.!',

            })
            return;
        }


        var settings = {
            "url": api + "categorias/nuevo",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                'Authorization': token
            },
            "data": JSON.stringify({ "NOM_CATEGORIA": categoria, "DES_CATEGORIA": descripcion, "URL_IMG": url, "COD_MODULO": 12, "COD_USUARIO": id_user }),
        };
        $.ajax(settings).done(function (response) {
            if (response.categoria) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡La Categoría ingresada ya existe, favor ingresar uno nuevo.!',

                })
            }

            if (response.message) {

                Swal.fire(
                    'Registro Completo!',
                    'Se registro correctamente!',
                    'success'
                )
                document.frm_categoria.submit();
                categoria = "";
                descripcion = "";
                url = "";

                $('#table_categoria').dataTable().fnDestroy();
                cargar_categorias_sys();
                document.getElementById("categorias_sistema").style.display = "block"
                document.getElementById("nueva_categoria").style.display = "none"


            }


        });

    });

});

function enviar_formulario() {
    document.frm_categoria.submit()
}

function cargar_categorias_sys() {
    $("#contenido_categorias").empty();
    var settings = {
        "url": api + "categorias",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 11 }),
    };

    $.ajax(settings).done(function (response) {
        //console.log(response);

        $.each(response[0], function (key, val) {
            var estado
            if (val.ESTADO == 1) {
                estado = '<div class=" custom-control custom-switch"><input type="checkbox" class=" custom-control-input" id="estado_categoria' + val.COD_CATEGORIA + '" checked><label class="custom-control-label" for="estado_categoria' + val.COD_CATEGORIA + '"></label></div>'
            } else {
                estado = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input"id="estado_categoria' + val.COD_CATEGORIA + '"  ><label class="custom-control-label" for="estado_categoria' + val.COD_CATEGORIA + '"></label></div>'
            }
            // console.log(val.NOM_ROL)
            editar = "<button type='input' id='editar" + val.COD_CATEGORIA + "' onclick='mostrar_actualizar()' class='btn btn-round btn-lg btn-icon-only btn-secondary mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Editar Categoria'><i class='fas fa-pencil-alt' aria-hidden='true'></i> <button type='input' id='refresh" + val.COD_CATEGORIA + "' onclick='eliminar(" + val.COD_CATEGORIA + ")' class='btn btn-round btn-lg btn-icon-only btn-danger mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Eliminar Categoria'><i class='fa fa-trash' aria-hidden='true'></i>"
            img = "<img src='/public/img/categorias/" + val.URL_IMG + "' height='100'  alt='" + val.NOM_CATEGORIA + "'>"
            $("#contenido_categorias").append("<tr><td>" + editar + "</td><td>" + img + "</td><td>" + val.NOM_CATEGORIA + "</td><td>" + val.DES_CATEGORIA + "</td><td>" + estado + "</td><td style='display: none; '>" + val.COD_CATEGORIA + "</td><td style='display: none; '>" + val.URL_IMG + "</td></tr>");
        });
        $('#table_categoria').dataTable().fnDestroy();
        var table = $('#table_categoria').DataTable({
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
                    text: '<button class="btn btn-primary"><i class="fa fa-archive"></i> Nueva Categoría</button>',
                    action: function (e, dt, node, config) {
                        mostrar_registro_categoria();
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
                    columns: [1, 2, 3,4 ]
                }
            },
            //Botón para PDF
            {
                extend: 'pdf',
                title: 'Categorias',
                filename: 'Reporte de Usuarios del Sistema',
                //orientation: 'landscape',//landscape give you more space
                pageSize: 'A4',//A0 is the largest A5 smallest(A0,A1,A2,A3,legal,A4,A5,letter))
                text: '<button class="btn btn-danger"><i class="far fa-file-pdf"></i> Exportar a PDF </button>',
                exportOptions: {
                    columns: [2, 3]
                }
            },
            ]

        });
        $('.dataTables_filter input').attr("placeholder", "Buscar datos en la tabla")
        $('#table_categoria tbody').on('click', 'tr', function () {
            var data = table.row(this).data();
            console.log(data)
            nom_rol = data[1];
            id_rol = data[4]
            id_estado_categoria = document.getElementById("estado_categoria" + data[5])
            var estado
            if (id_estado_categoria.checked) {
                estado = 1
                document.getElementById("estado_categoria").innerHTML = estado
                console.log(estado);

            }
            else {
                estado = 2
                document.getElementById("estado_categoria").innerHTML = estado
                console.log(estado);

            }

            // document.getElementById("id_rol").innerHTML = id_rol
            document.getElementById("estado_categoria").innerHTML = estado
            actualizar_permiso_estado(data[5], data[2], data[3], data[6], estado);
            document.getElementById("id_estado_categoria").innerHTML = estado;
            document.getElementById("id_categoria").innerHTML = data[5];
            $("#ANom_categoria").val(data[2]);
            $("#Ades_categoria").val(data[3]);
            $("#Am1").val(data[6]);
            $("#url_img").val(data[6]);
        });



    });


}

function eliminar(cod_categoria) {
    var myHeader = new Headers({
        'Authorization': token
    });
    url_eliminar = api + "categorias/eliminar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "COD_CATEGORIA": cod_categoria, "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 13
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
                    console.log( result=='{"Message":"Registro No puede eliminarse, contiene productos asociados","COD_CATEGORIA":2}')
                    if (result=='{"Message":"Registro No puede eliminarse, contiene productos asociados","COD_CATEGORIA":2}') {
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
                    $('#table_categoria').dataTable().fnDestroy();
                    cargar_categorias_sys();
                })
                .catch(error => console.log('error', error));
        }
    })

}

function actualizar_permiso_estado(cod_categoria, categoria, descripcion, url, cod_estado) {
    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "categorias/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "COD_CATEGORIA": cod_categoria, "NOM_CATEGORIA": categoria, "DES_CATEGORIA": descripcion, "URL_IMG": url, "COD_ESTADO": cod_estado, "COD_MODULO": 13, "COD_USUARIO": id_user
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

function actualizar_categoria() {
    categoria = $("#ANom_categoria").val();
    descripcion = $("#Ades_categoria").val();
    url = $("#Am1").val();
    cod_estado = document.getElementById("id_estado_categoria")
    cod_categoria = document.getElementById("id_categoria")
    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "categorias/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "COD_CATEGORIA": cod_categoria.innerHTML, "NOM_CATEGORIA": categoria, "DES_CATEGORIA": descripcion, "URL_IMG": url, "COD_ESTADO": cod_estado.innerHTML, "COD_MODULO": 13, "COD_USUARIO": id_user
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
                console.log(result)
                Swal.fire(
                    'Cambios Completados!',
                    'Se modificaron los datos correctamente!',
                    'success'
                )
                document.frm_Acategoria.submit();
            }
        })
        .catch(error => console.log('error', error));
}

function cancelar_actualizacion_categorias() {
    document.getElementById("actualizar_categorias").style.display = "none"
    document.getElementById("categorias_sistema").style.display = "block"
}

function mostrar_actualizar() {
    document.getElementById("actualizar_categorias").style.display = "block"
    document.getElementById("categorias_sistema").style.display = "none"
}

function cancelar_categorias() {
    document.getElementById("nueva_categoria").style.display = "none"
    document.getElementById("categorias_sistema").style.display = "block"
}


function actualiza(nombre) {
    console.log(nombre);
    document.getElementById('m1').value = nombre;
}

function actualiza_cat(nombre) {
    console.log(nombre);
    document.getElementById('Am1').value = nombre;
}
cargar_categorias_sys();