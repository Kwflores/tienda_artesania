var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");


$(document).ready(function () {
    $("#table_productos").change(function () {
        cargar_productos_sys();
    });


    $("#registro_productos").click(function () {
        sku = $("#RSKU").val();
        producto = $("#Rnom_producto").val();
        descripcion = $("#Rdescripcion").val();
        precio = $("#Rprecio").val();
        url = $("#Rm1").val();
        categoria = $("#Rcategoria").val();
        proveedor = $("#Rproveedores").val();
        c_inicial = $("#Rcinicial").val();
        c_entrada = $("#Rcentrada").val();
        c_salida = $("#Rsalida").val();
        stock = $("#Rstock").val();

        if (sku == "" || producto == "" || descripcion == "" || url == "" || categoria == "" || proveedor == "" || precio == ""
            || c_inicial == "" || c_entrada == "" || c_salida == "" || stock == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe completar todo los campos.!',

            })
            return;
        }
        var settings = {
            "url": api + "productos/nuevo",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                'Authorization': token
            },


            "data": JSON.stringify({
                "SKU": sku, "NOM_PRODUCTO": producto, "DES_PRODUCTO": descripcion, "URL_IMG": url, "COD_CATEGORIA": categoria, "COD_PROVEEDOR": proveedor,
                "CAN_INICIAL": c_inicial, "CAN_ENTRADAS": c_entrada, "CAN_SALIDAS": c_salida, "STOCK": stock,
                "PR_PRODUCTO": precio, "COD_USUARIO": id_user, "COD_MODULO": 3
            })
        };


        $.ajax(settings).done(function (response) {
            if (response.Message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡El No. de SKU ya existe, favor ingresar uno nuevo.!',

                })
            }



            if (response.message) {

                Swal.fire(
                    'Registro Completo!',
                    'Se registro correctamente!',
                    'success'
                )
                document.frm_producto.submit();
                $('#table_productos').dataTable().fnDestroy();
                cargar_productos_sys();
                sku = ""
                producto = ""
                descripcion = ""
                precio = ""
                url = ""
                categoria = ""
                proveedor = ""
                c_inicial = ""
                c_entrada = ""
                c_salida = ""
                stock = ""
                document.getElementById("nuevo_producto").style.display = "none"
                document.getElementById("productos_sistema").style.display = "block"
            }


        });

    });







});

function actualiza_producto(nombre) {
    console.log(nombre);
    document.getElementById('Rm1').value = nombre;
}

function actualiza_producto_A(nombre) {
    console.log(nombre);
    document.getElementById('Am1').value = nombre;
}

function limpiar_dataInventario() {
    $("#Rcinicial").val("");
    $("#Rcentrada").val("");
    $("#Rsalida").val("");
    $("#Rstock").val("");
}

 
 
function operacion_inventario() {

    var cc = document.getElementById('Rcinicial').value;
    var dd = document.getElementById('Rcentrada').value;
    if (cc == null || cc == "") cc = 0;
    if (dd == null || dd == "") dd = 0;
    var ee = document.getElementById('Rsalida').value;
    var rf = (parseInt(cc) + parseInt(dd)) - parseInt(ee);
    document.getElementById('Rstock').value = rf;
    if(cc ==""|| dd=="" || ee == "" ){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Debe completar todo los campos.!',

        })
        return;
    }
    boton= document.getElementById("registro_productos") 
    boton.removeAttribute('disabled')
} 

function cargar_productos_sys() {
    $("#contenido_productos").empty();
    var settings = {
        "url": api + "productos",
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
                estado = '<div class=" custom-control custom-switch"><input type="checkbox" class=" custom-control-input" id="estado_producto' + val.COD_PRODUCTO + '" checked><label class="custom-control-label" for="estado_producto' + val.COD_PRODUCTO + '"></label></div>'
            } else {
                estado = '<div class="estado custom-control custom-switch"><input type="checkbox" class="estado custom-control-input"id="estado_producto' + val.COD_PRODUCTO + '"  ><label class="custom-control-label" for="estado_producto' + val.COD_PRODUCTO + '"></label></div>'
            }
            // console.log(val.NOM_ROL)
            editar = "<button type='input' id='editar" + val.COD_PRODUCTO + "' onclick='mostrar_actualizar_productos()' class='btn btn-round btn-lg btn-icon-only btn-secondary mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Editar Producto'><i class='fas fa-pencil-alt' aria-hidden='true'></i><button type='input' id='refresh_pro" + val.COD_PRODUCTO + "' onclick='eliminar_producto(" + val.SKU + ")' class='btn btn-round btn-lg btn-icon-only btn-danger mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Eliminar Producto'><i class='fa fa-trash' aria-hidden='true'></i>"
            img = "<img src='/public/img/categorias/" + val.URL_IMAGEN + "' height='100'  alt='" + val.NOM_PRODUCTO + "'>"
            $("#contenido_productos").append("<tr><td>" + editar + "</td><td>" + img + "</td><td>" + val.SKU + "</td><td>" + val.NOM_PRODUCTO + "</td><td>" + val.DES_PRODUCTO + "</td><td>" + val.PR_PRODUCTO + "</td><td>" + val.NOM_CATEGORIA + "</td><td>" + val.NOM_PROVEEDOR + "</td><td>" + estado + "</td><td style='display: none; '>" + val.COD_PRODUCTO + "</td><td style='display: none; '>" + val.COD_PROVEEDORES + "</td><td style='display: none; '>" + val.COD_CATEGORIA + "</td><td style='display: none; '>" + val.COD_INVENTARIO + "</td><td style='display: none; '>" + val.URL_IMAGEN + "</td></tr>");
        });
        $('#table_productos').dataTable().fnDestroy();
        var table = $('#table_productos').DataTable({
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
                    text: '<button class="btn btn-primary"><i class="fa fa-briefcase"></i> Nuevo Producto</button>',
                    action: function (e, dt, node, config) {
                        mostrar_registro_productos();
                    },

                },
                {
                    text: '<button class="btn btn-secondary"><i class="fa fa-cube"></i> Inventario</button>',
                    action: function (e, dt, node, config) {
                        mostrar_inventario();
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
        $('#table_productos tbody').on('click', 'tr', function () {
            var data = table.row(this).data();
            console.log(data)

            id_estado_producto = document.getElementById("estado_producto" + data[9])
            var estado
            if (id_estado_producto.checked) {
                estado = 1
                document.getElementById("estado_productos").innerHTML = estado
                console.log(estado);

            }
            else {
                estado = 2
                document.getElementById("estado_productos").innerHTML = estado
                console.log(estado);

            }

            document.getElementById("estado_productos").innerHTML = estado

            actualizar_producto_estado(estado, data[9])
            $("#ASKU").val(data[2]);
            $("#Anom_producto").val(data[3]);
            $("#Adescripcion").val(data[4]);
            $("#Aprecio").val(data[5]);
            $("#Apcategoria").val(data[11]);
            $("#Approveedores").val(data[10]);
            $("#Am1").val(data[13]);
            document.getElementById("id_inventario").innerHTML = data[12]
            document.getElementById("id_producto").innerHTML = data[9]

        });




    });



}

function actualizar_producto_estado(estado, cod_producto) {
    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_estado = api + "productos/productos_estado";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_USUARIO": user_logeado, "COD_ESTADO": estado, "COD_MODULO": 4, "COD_USUARIO": id_user, "COD_PRODUCTO": cod_producto
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_estado, requestOptions)
        .then(response => response.text())
        .then(result => {

        })
        .catch(error => console.log('error', error));
}

function actualizar_productos() {
    sku = $("#ASKU").val();
    producto = $("#Anom_producto").val();
    descripcion = $("#Adescripcion").val();
    precio = $("#Aprecio").val();
    url = $("#Am1").val();
    categoria = $("#Apcategoria").val();
    proveedor = $("#Approveedores").val();
    cod_inventario = document.getElementById("id_inventario")
    cod_producto = document.getElementById("id_producto")

    if (sku == "" || producto == "" || descripcion == "" || url == "" || categoria == "" || proveedor == "" 
    || precio == "") {
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
    url_actualizar_producto = api + "productos/actualizar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "SKU":sku, "NOM_USUARIO":user_logeado, "NOM_PRODUCTO":producto, "DES_PRODUCTO":descripcion, "URL_IMG":url,  "COD_CATEGORIA":categoria, "COD_PROVEEDOR":proveedor, 
            "PR_PRODUCTO":precio, "COD_USUARIO":id_user, "COD_MODULO":3, "COD_INVENTARIO": cod_inventario.innerHTML, "COD_PRODUCTO":cod_producto.innerHTML
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_producto, requestOptions)
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

function obtener_categorias() {
    var categorias = document.getElementById("Rcategoria");
    var myHeader = new Headers({
        'Authorization': token
    });
    url_categorias = api + "categorias";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_categorias, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //  console.log(data)
            data[0].forEach(Element => {
                var opcion = document.createElement("option");
                opcion.value = Element.COD_CATEGORIA;
                opcion.innerHTML = Element.NOM_CATEGORIA;
                categorias.appendChild(opcion);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

}
function obtener_proveedores() {
    var categorias = document.getElementById("Rproveedores");
    var myHeader = new Headers({
        'Authorization': token
    });
    url_proveedor = api + "proveedores";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_proveedor, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //  console.log(data)
            data[0].forEach(Element => {

                var opcion = document.createElement("option");
                opcion.value = Element.COD_PROVEEDORES;
                opcion.innerHTML = Element.proveedor;
                categorias.appendChild(opcion);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

}

function eliminar_producto(sku) {
    var myHeader = new Headers({
        'Authorization': token
    });
    url_eliminar = api + "productos/eliminar";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "SKU":sku, "NOM_USUARIO":user_logeado, "COD_USUARIO":id_user, "COD_MODULO":3
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
                    console.log(result)
                    if (result) {
                        Swal.fire(
                            'Registro Eliminado!',
                            'Registro Eliminado, correctamente.',
                            'success'
                          )
                    }
 
                    $('#table_productos').dataTable().fnDestroy();
                    cargar_productos_sys();
                })
                .catch(error => console.log('error', error));
        }
    })

}

function obtener_categorias_A() {
    var categorias = document.getElementById("Apcategoria");
    var myHeader = new Headers({
        'Authorization': token
    });
    url_categorias = api + "categorias";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_categorias, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //  console.log(data)
            data[0].forEach(Element => {
                var opcion = document.createElement("option");
                opcion.value = Element.COD_CATEGORIA;
                opcion.innerHTML = Element.NOM_CATEGORIA;
                categorias.appendChild(opcion);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

}
function obtener_proveedores_A() {
    var categorias = document.getElementById("Approveedores");
    var myHeader = new Headers({
        'Authorization': token
    });
    url_proveedor = api + "proveedores";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_proveedor, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //  console.log(data)
            data[0].forEach(Element => {

                var opcion = document.createElement("option");
                opcion.value = Element.COD_PROVEEDORES;
                opcion.innerHTML = Element.proveedor;
                categorias.appendChild(opcion);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

}

function mostrar_actualizar_productos() {
    document.getElementById("actualizar_producto").style.display = "block"
    document.getElementById("productos_sistema").style.display = "none"
}

function cancelar_rproductos() {
    document.getElementById("nuevo_producto").style.display = "none"
    document.getElementById("productos_sistema").style.display = "block"
}
function cancelar_Aproductos() {
    document.getElementById("actualizar_producto").style.display = "none"
    document.getElementById("productos_sistema").style.display = "block"
}
cargar_productos_sys();
obtener_categorias();
obtener_proveedores();
obtener_proveedores_A();
obtener_categorias_A();