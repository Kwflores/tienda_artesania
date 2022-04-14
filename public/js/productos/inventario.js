var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");



function enviar_formulario() {
    document.frm_categoria.submit()
}

function cargar_inventario_sys() {
    $("#contenido_inventario").empty();
    var settings = {
        "url": api + "productos/inventario",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 3 }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        $.each(response[0], function (key, val) {
            nuevo_movimiento = "<button type='input' id='editar" + val.COD_INVENTARIO + "' onclick='mostrar_actualizar_inventario()' class='btn btn-round btn-lg btn-icon-only btn-primary mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Nuevo Movimiento'><i class='fa fa-plus-circle' aria-hidden='true'></i> "

            $("#contenido_inventario").append("<tr><td>" + nuevo_movimiento + "</td><td>" + val.SKU + "</td><td>" + val.NOM_PRODUCTO + "</td><td>" + val.CAN_INICIAL + "</td><td>" + val.CAN_ENTRADAS + "</td><td  '>" + val.CAN_SALIDAS + "</td><td>" + val.STOCK + "</td><td>" + val.PR_PRODUCTO + "</td><td>" + val.TOTAL + "</td><td style='display: none; '>" + val.COD_INVENTARIO + "</td></tr>");
        });
        $('#table_inventario').dataTable().fnDestroy();
        var table = $('#table_inventario').DataTable({
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
                    text: '<button class="btn btn-primary"><i class="fa fa-arrow-left"></i>Productos</button>',
                    action: function (e, dt, node, config) {
                        mostrar_productos();
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
        $('#table_inventario tbody').on('click', 'tr', function () {
            var data = table.row(this).data();
            console.log(data)
            $("#ISKU").val(data[1]);
            $("#Icinicial").val(data[3]);
            $("#IAcentrada").val(data[4]);
            $("#IAsalida").val(data[5]);
            $("#IAstock").val(data[6]);
            document.getElementById("cod_inventario").innerHTML = data[9]


        });



    });


}

function actualizar_inventario() {
    sku = $("#ISKU").val();
    c_inicial = $("#Icinicial").val();
    c_entrada = $("#IAcentrada").val();
    c_salida = $("#IAsalida").val();
    c_stock = $("#IAstock").val();
    cod_inventario =document.getElementById("cod_inventario")

    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_inventario= api + "productos/actualizar_inventario";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "COD_INVENTARIO":cod_inventario.innerHTML,"ENTRADAS":c_inicial,"SALIDAS":c_salida,"STOCK":c_stock,"COD_MODULO":3,"COD_USUARIO":id_user
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_inventario, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result) {
                console.log(result)
                Swal.fire(
                    'Cambios Completados!',
                    'Se modificaron los datos correctamente!',
                    'success'
                )
                document.Afrm_producto.submit();
            }
        }) 

        .catch(error => console.log('error', error));
}

function mostrar_actualizar_inventario() {

    document.getElementById("actualizar_inventario").style.display = "block"
    document.getElementById("inventario_sistema").style.display = "none"
}

function limpiar_data_Inventario() {
    $("#IAcentrada").val("");
    $("#IAsalida").val("");
    $("#IAstock").val("");
}

 
function operacion() {
    var cc = document.getElementById('Icinicial').value;
    var dd = document.getElementById('IAcentrada').value;
    if (cc == null || cc == "") cc = 0;
    if (dd == null || dd == "") dd = 0;
    var ee = document.getElementById('IAsalida').value;
    var rf = (parseInt(cc) + parseInt(dd)) - parseInt(ee);
    document.getElementById('IAstock').value = rf;

    if(cc ==""|| dd=="" || ee == "" ){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Debe completar todo los campos.!',

        })
        return;
    }
    boton= document.getElementById("habilitar_guardar") 
    boton.removeAttribute('disabled')
}

 
function cancelar_actualizacion_inventario() {
    document.getElementById("actualizar_inventario").style.display = "none"
    document.getElementById("inventario_sistema").style.display = "block"
}

cargar_inventario_sys();