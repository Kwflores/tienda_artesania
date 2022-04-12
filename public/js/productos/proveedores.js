var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");


$(document).ready(function () {
    $("#table_proveedores").change(function () {
        cargar_proveedores_sys();
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

                $('#table_proveedores').dataTable().fnDestroy();
                cargar_permisos();
                document.getElementById("roles_sistema").style.display = "block"
                document.getElementById("Nuevo_rol").style.display = "none"
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
        "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 11 }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        $.each(response[0], function (key, val) {
            var estado
            if (val.ESTADO == 1) {
                estado = '<div class=" custom-control custom-switch"><input type="checkbox" class=" custom-control-input" id="estado_proveedor' + val.COD_PROVEEDORES + '" checked><label class="custom-control-label" for="estado_proveedor' + val.COD_PROVEEDORES + '"></label></div>'
            } else {
                estado = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input"id="estado_proveedor' + val.COD_PROVEEDORES + '"  ><label class="custom-control-label" for="estado_proveedor' + val.COD_PROVEEDORES + '"></label></div>'
            }
           // console.log(val.NOM_ROL)
            editar = "<button type='input' id='editar" + val.COD_PROVEEDORES + "' onclick='mostrar_formu_actualizar()' class='btn btn-round btn-lg btn-icon-only btn-secondary mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Editar Proveedor'><i class='fas fa-pencil-alt' aria-hidden='true'></i>"
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
                        mostrar_proveedores();
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
        $('#table_proveedores tbody').on('click', 'tr', function () {
            var data = table.row(this).data();
            console.log(data)
         
            id_estado_proveedor = document.getElementById("estado" + data[6])
            var estado
            if (id_estado_proveedor.checked) {
                estado = 1
                document.getElementById("estado").innerHTML = estado
                console.log(estado);

            }
            else {
                estado = 2
                document.getElementById("estado").innerHTML = estado
                console.log(estado);

            }
             
            document.getElementById("id_rol").innerHTML = id_rol
            document.getElementById("estado_proveedor").innerHTML = estado
            actualizar_proveedor_estado(data[1], data[4], data[3],data[4],estado,data[6]);
            

        });



    });


}

function actualizar_proveedor_estado(nom_proveedor, direccion, telefono,correo,estado,cod_proveedor) {
    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "proveedores/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_USUARIO":user_logeado, "NOM_PROVEEDOR":nom_proveedor, "DIRECCION":direccion, "NUM_CEL":telefono, "USER_EMAIL":correo, "COD_ESTADO":estado, "COD_MODULO":4, "COD_USUARIO":id_user, "COD_PROVEEDO":cod_proveedor
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

cargar_proveedores_sys();