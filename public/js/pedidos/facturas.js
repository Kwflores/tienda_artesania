var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");
var variableAcumuladora = 0
$(document).ready(function () {
    $("#registro_factura").click(function () {
        cliente = $("#RCliente").val();
        sku = $("#FSKU").val();
        direccion = $("#FDireccionEntrega").val();
        pago = $("#forma_pago").val();
        cat_envio= $("#FEnvio").val();
        cod_persona = document.getElementById("Fcod_persona");
        cod_direccion = document.getElementById("cod_direccion");
        Cliente_nom = document.getElementById("Fnomb_completo")
        detallefactura = get_detalle_factura()
        if (pago == "" || direccion == "" || Cliente_nom == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Complete los campos vacios.!',
            })
            return;
        }
        var settings = {
            "url": api + "pedidos/nuevo_encabezado",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                'Authorization': token
            },
            "data": JSON.stringify({ "COD_PERSONA": cod_persona.innerHTML, "COD_USUARIO": id_user, "DIRECCION": direccion, "COD_MODULO": 8 ,"COS_ENVIO": cat_envio}),
        };
        $.ajax(settings).done(function (response) {
            //  console.log(response[0][0].COD_ENCABEZADO)
            encabezado = response[0][0].COD_ENCABEZADO
            detallefactura.forEach(element => {
                //  console.log(element.code)
                cantidad = element.q;
                precio = element.p;
                costo_envio = 0;
                monto_envio = element.tt;
                cod_producto = element.id_producto
                cod_inventario = element.id_inventario
                stock = element.s
                stock_disponible = parseInt(stock) - parseInt(cantidad)
                cod_pago = $("#forma_pago").val();
                var settings = {
                    "url": api + "pedidos/nuevo",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json",
                        'Authorization': token
                    },

                    "data": JSON.stringify({
                        "CANT_PRODUCTO": cantidad, "PR_PRODUCTO": precio, "MON_PEDIDO": monto_envio, "COS_ENVIO": costo_envio, "COD_PRODUCTO": cod_producto, "COD_PAGO": cod_pago,
                        "COD_MODULO": 8, "COD_USUARIO": id_user, "COD_ENCABEZADO": encabezado, "COD_INVENTARIO": cod_inventario, "STOCK": stock_disponible
                    }),
                };







                $.ajax(settings).done(function (response) {
                    //   console.log(response)
                    // document.getElementById("detalle_total").innerHTML = ""
                    vaciarcliente();
                    limpiar()
                    document.frm_categoria.submit();
                    $('#table_facturas').dataTable().fnDestroy();
                    cargar_facturas();
                    localStorage.removeItem("detalle_factura");
                    document.getElementById("nuevo_factura").style.display = "none"
                    document.getElementById("facturas_sistema").style.display = "block"
                });



            });
        });



    });


});
function limpiar() {
    $("#Fnom_completo").val("")
    $("#FTIdentificacion").val("")
    $("#FIdentificacion").val("")
    $("#Fcorreo").val("")
    $("#FTelefono").val("")
    $("#FDireccion").val("")
    $("#Fproducto").val("")
    $("#Fstock").val("")
    $("#Fprecio").val("")
    $("#Fdetalle").val("")
    $("#FCOD_PRODUCTO").val("")
    $("#RCliente").val("");
    $("#FSKU").val("");
    $("#FDireccionEntrega").val("");
    total = document.getElementById("detalle_total")
    total.innerHTML = ""
}
function get_detalle_factura() {
    var lista_registros = [];
    var lista_string = localStorage.getItem("detalle_factura");
    if (lista_string) {
        lista_registros = JSON.parse(lista_string);
    }

    return lista_registros;
}

function existe_sku(el_arreglo, el_sku) {
    var existe = false;
    el_arreglo.forEach(
        prod => {
            if (prod.code == el_sku) {
                existe = true;
                return existe;
            }
        }
    );

    return existe;
}

function total_cliente_facturado() {
    var productosLS;
    var total_cliente = 0;
    var costo_envio = $("#FEnvio").val();
    productosLS = get_detalle_factura();
    for (var i = 0; i < productosLS.length; i++) {
        var element = Number(productosLS[i].p * productosLS[i].q);
        total_cliente = total_cliente + element;
        localStorage.setItem("total_factura", total_cliente);
    }

    document.getElementById("detalle_total").innerHTML = parseInt(costo_envio) + parseInt(total_cliente) + '.00';
}


function q_carrito(sku, nombre, descripcion, precio, stok, codi_producto, cod_inventario) {
    var arreglo_registros = get_detalle_factura();
    var cantidad = 1;
    var total_cliente = precio;
    var producto = {
        code: sku,
        nom_producto: nombre,
        des_producto: descripcion,
        p: precio,
        q: cantidad,
        tt: total_cliente,
        s: stok,
        cp: codi_producto,
        ci: cod_inventario
    }



    if (existe_sku(arreglo_registros, sku)) {
        arreglo_registros.forEach(
            carro => {
                if (carro.code == sku) {
                    carro.q -= 1;
                    carro.tt = carro.p * carro.q;
                }

            });

    } else {
        arreglo_registros.push(producto);

    }
    localStorage.setItem("id_producto", sku)
    localStorage.setItem("detalle_factura", JSON.stringify(arreglo_registros));
    llenar_tabla_factura();
    total_cliente_facturado();
}


function borrarItem(sku) {
    var arreglo_registros = get_detalle_factura();

    arreglo_registros.forEach(
        carro => {
            if (carro.code == sku) {
                let idPersonaDelete = carro.code;

                var index = arreglo_registros.map(function (item) {
                    return item.id;
                }).indexOf(idPersonaDelete);
                arreglo_registros.splice(index, 1);
                localStorage.setItem("detalle_factura", JSON.stringify(arreglo_registros));
                llenar_tabla_factura();
                total_cliente_facturado()

                return;
            }

        });

}


function agregar_detalle(sku, nombre, descripcion, precio, cant_producto, stock, cod_producto, cod_inventario) {
    var arreglo_registros = get_detalle_factura();
    var cantidad = 1;
    var total = parseInt(precio) * parseInt(cant_producto);
    var producto = {
        code: sku,
        nom_producto: nombre,
        des_producto: descripcion,
        p: precio,
        q: parseInt(cantidad) + parseInt(cant_producto) - parseInt(1),
        tt: total,
        s: stock,
        id_inventario: cod_inventario,
        id_producto: cod_producto
    }



    if (existe_sku(arreglo_registros, sku)) {
        arreglo_registros.forEach(
            carro => {
                if (carro.code == sku) {
                    carro.q += 1;
                    carro.tt = carro.p * carro.q;
                }

            });

    } else {
        arreglo_registros.push(producto);

    }
    localStorage.setItem("detalle_factura", JSON.stringify(arreglo_registros));
    //localStorage.setItem("mostrar_carrito", 1)

    llenar_tabla_factura();
    total_cliente_facturado()
}


function cargar_facturas() {
    $("#contenido_facturas").empty();
    var settings = {
        "url": api + "pedidos/facturas",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 8 }),
    };

    $.ajax(settings).done(function (response) {
        // console.log(response);

        $.each(response[0], function (key, val) {
            botones = "<button type='input' id='editar_factura' onclick=' mostrar_actualizacion_factura()' class='btn btn-round btn-lg btn-icon-only btn-secondary mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Editar Factura'><i class='fas fa-pencil-alt' aria-hidden='true'></i>"
            imprimir = " <button type='input' id='generar_pdf' onclick='generar_pdf()' class='btn btn-round btn-lg btn-icon-only btn-dark  mx-2 mx-lg-3 mb-4'  data-toggle='tooltip' data-placement='left' title='Generar Factura'><i class='fa fa-file-pdf' aria-hidden='true'></i>"

            fecha = moment(val.FEC_PEDIDO).format('DD-MM-YYYY')
            $("#contenido_facturas").append("<tr><td>" + botones + "</td><td>" + imprimir + "</td><td>" + fecha + "</td><td> 000" + val.COD_ENCABEZADO + "</td><td>" + val.NOM_PERSONA + "</td><td>" + val.DIRECCION + "</td><td>" + val.USER_EMAIL + "</td><td>" + val.TIP_PAGO + "</td><td style='display: none;'>" + val.COD_ENCABEZADO + "</td><td style='display: none;'>" + val.COD_DIRECCION + "</td><td style='display: none;'>" + val.NOM_IDENTIFICACION + "</td><td style='display: none;'>" + val.COD_IDENTIFICACION + "</td><td style='display: none;'>" + val.NUM_CEL + "</td><td style='display: none;'>" + val.COD_PAGO + "</td><td style='display: none;'>" + val.COD_PERSONA + "</td></tr>");
        });
        $('#table_facturas').dataTable().fnDestroy();
        var table = $('#table_facturas').DataTable({
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
                    text: '<button id="Mostrar_registro_I"  class="btn btn-primary"><i class="fa fa-plus-circle"></i>NUEVA FACTURA</button>',
                    action: function (e, dt, node, config) {
                        mostrar_nueva_factura();
                    },

                },
                {
                    text: '<button id="Mostrar_registro_editar_facturas"  class="btn btn-secondary" ><i class="fas fa-pencil-alt"></i>Editar Facturas</button>',
                    action: function (e, dt, node, config) {
                        permiso_editar_facturas();
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
                        columns: [6, 1, 2, 3, 4, 5]
                    }
                },
                //Botón para PDF
                {
                    extend: 'pdf',
                    title: 'TIENDA ARTESANÍA FUENTE DE BENDICIÓN',
                    filename: 'Reporte de Factura',
                    //orientation: 'landscape',//landscape give you more space
                    pageSize: 'A4',//A0 is the largest A5 smallest(A0,A1,A2,A3,legal,A4,A5,letter))
                    text: '<button class="btn btn-danger"><i class="far fa-file-pdf"></i> Exportar a PDF </button>',
                    exportOptions: {

                        columns: [6, 1, 2, 3, 4, 5]
                    },
                    customize: function (doc) {
                        doc.content.splice(1, 0, {
                            columns: [{
                                margin: [205, 50],
                                alignment: 'left',
                                image: 'data:image/png;base64,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',
                                width: 100,
                                height: 100
                            }, {
                                margin: [80, 15],
                                text: 'Reporte de Facturas',
                                fontSize: 15
                            }]
                        });
                    }
                },

            ], "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                },

            ]

        });
        $('.dataTables_filter input').attr("placeholder", "Buscar datos en la tabla")
        $('#table_facturas tbody').on('click', 'tr', function () {
            var data = table.row(this).data();
            //   console.log(data)
            $("#Fnom_completo").val(data[4])
            $("#FTIdentificacion").val(data[10])
            $("#FIdentificacion").val(data[11])
            $("#Fcorreo").val(data[6])
            $("#FTelefono").val(data[12])
            $("#FDireccion").val(data[5])
            $("#forma_pago").val(data[13]);
            document.getElementById("Fcod_persona").innerHTML = data[14];
            document.getElementById("cod_direccion").innerHTML = data[9];
            document.getElementById("cod_encabezado").innerHTML = data[3];
            document.getElementById("fecha").innerHTML = data[2];
            document.getElementById("cliente").innerHTML = data[4];
            document.getElementById("identificacion").innerHTML = data[10];
            document.getElementById("codigo_identificacion").innerHTML = data[11];
            $("#FDireccionEntrega").val(data[5]);
            obtener_pedidos(data[3])
        });




    });


}

function permiso_editar_facturas() {
    $('#table_facturas').dataTable().fnDestroy();
    $(document).ready(function () {
        var dt = $('#table_facturas').dataTable({
            "bLengthChange": false,
            "bInfo": true,
            "pageLength": 8,
            "orderable": true,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            "dom": 'Blfrtip',
            "buttons": [
                {
                    text: '<button id="Volver_Lista"  class="btn btn-primary" ><i class="fa fa-archive"></i> Volver a Facturas</button>',
                    action: function (e, dt, node, config) {
                        document.frm_categoria.submit();
                    },

                },

            ],

        });


    });
}

function mostrar_nueva_factura() {
    document.getElementById("nuevo_factura").style.display = "block"
    document.getElementById("facturas_sistema").style.display = "none"
    document.getElementById("modificar_factura").style.display = "none"
    document.getElementById("registrar_factura").style.display = "block"
    document.getElementById("Adetalle_factura").style.display = "none"
    document.getElementById("detalle_factura").style.display = null;
    document.getElementById("btn_agregar").style.display = "block"
    document.getElementById("btn_actualizar_pedido").style.display = "none"
}


function mostrar_actualizacion_factura() {
    document.getElementById("nuevo_factura").style.display = "block"
    document.getElementById("facturas_sistema").style.display = "none"
    document.getElementById("modificar_factura").style.display = "block"
    document.getElementById("registrar_factura").style.display = "none"
    document.getElementById("Adetalle_factura").style.display = null;
    document.getElementById("detalle_factura").style.display = "none"
    document.getElementById("btn_agregar").style.display = "none"
    document.getElementById("dato_1").style.display = "none"
    document.getElementById("dato_2").style.display = "none"
    document.getElementById("dato_3").style.display = "none"
    document.getElementById("dato_4").style.display = "none"
    document.getElementById("dato_5").style.display = "none"
    document.getElementById("dato_6").style.display = "none"
    document.getElementById("dato_7").style.display = "none"
    document.getElementById("dato_8").style.display = "none"
    document.getElementById("dato_9").style.display = "none"
    document.getElementById("dato_10").style.display = "block"
    document.getElementById("btn_envio").style.display = "none"
    document.getElementById("dato_11").style.display = "none"
    document.getElementById("btn_actualizar_pedido").style.display = "none"
    document.getElementById("espacio").style.display = "block"
    document.getElementById("nota").style.display = "none"
    varinput = $("#FEnvio").val()
    varinput.setAttribute("disabled", "");
}


function vaciarcliente() {
    //Limpiarlo
    // localStorage.removeItem("mostrar_carrito")

    localStorage.setItem("detalle_factura", "[]");
    localStorage.removeItem("total_factura");

}


function buscar_usuario(cliente) {


    var settings = {
        "url": api + "usuarios/buscar",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        "data": JSON.stringify({ "NOM_USUARIO": cliente, "COD_USUARIO": id_user, "COD_MODULO": 3 }),
    };

    $.ajax(settings).done(function (response) {
        // console.log(response.data[0]);
        $("#Fnom_completo").val(response.data[0].Nombre)
        $("#FTIdentificacion").val(response.data[0].identificacion)
        $("#FIdentificacion").val(response.data[0].num_identificacion)
        $("#Fcorreo").val(response.data[0].Correo)
        $("#FTelefono").val(response.data[0].Telefono)
        $("#FDireccion").val(response.data[0].DIRECCION)
        document.getElementById("Fcod_persona").innerHTML = response.data[0].COD_PERSONA
        document.getElementById("cod_direccion").innerHTML = response.data[0].COD_DIRECCION



    });


}
function obtener_usuarios() {
    cliente = $("#RCliente").val();
    existe = true
    if (cliente == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Complete los campos vacios.!',
        })
        return;
    }
    var myHeader = new Headers({
        'Authorization': token
    });
    usuarios = api + "usuarios";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(usuarios, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data[0])
            data[0].forEach(element => {
                //  console.log(element.Usuario!= cliente)

                if (element.Usuario == cliente) {
                    existe = false;
                    buscar_usuario(cliente)
                    return;
                }

            });
            if (existe) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡El Usuario no es valido, favor introducir el codigo correcto.!',
                })
                return;
            }


        })
        .catch(function (err) {
            console.log(err);
        });

}
function buscar_producto(sku) {

    var settings = {
        "url": api + "productos/sku",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 3, "SKU": sku }),
    };

    $.ajax(settings).done(function (response) {

        //  console.log(response[0][0].COD_PRODUCTO)

        // console.log(response[0][0].SKU);
        $("#Fproducto").val(response[0][0].NOM_PRODUCTO)
        $("#Fstock").val(0 + response[0][0].STOCK)
        $("#Fprecio").val(response[0][0].PR_PRODUCTO)
        $("#Fdetalle").val(response[0][0].DES_PRODUCTO)
        $("#FCOD_PRODUCTO").val(response[0][0].COD_PRODUCTO)
        document.getElementById("sku_producto").innerHTML = sku
        document.getElementById("r_f_cod_inventario").innerHTML = response[0][0].COD_INVENTARIO
        // agregar_detalle(sku, response[0][0].NOM_PRODUCTO, response[0][0].DES_PRODUCTO, response[0][0].PR_PRODUCTO, response[0][0].STOCK, response[0][0].COD_PRODUCTO, response[0][0].COD_INVENTARIO)
        // llenar_tabla_factura();
    });


}

function obtener_producto() {
    sku = $("#FSKU").val();
    existe = true
    if (sku == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Complete los campos vacios.!',
        })
        return;
    }
    var myHeader = new Headers({
        'Authorization': token
    });
    url_roles = api + "productos";
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
            //   console.log(data[0][0])
            data[0].forEach(element => {
                //console.log(element)
                if (element.SKU == sku) {
                    existe = false;
                    buscar_producto(sku)
                    boton = document.getElementById("btn_agregar")
                    boton.removeAttribute('disabled')
                }
                document.getElementById("btn_agregar").style.display = "block"


            });
            if (existe) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡El SKU no es valido, favor introducir el codigo correcto.!',
                })
                return;
            }

        })
        .catch(function (err) {
            console.log(err);
        });

}

function obtener_pagos() {
    var fpagos = document.getElementById("forma_pago");
    var myHeader = new Headers({
        'Authorization': token
    });
    url_pagos = api + "pagos";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_pagos, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            data[0].forEach(Element => {
                var opcion = document.createElement("option");
                opcion.value = Element.COD_PAGO;
                opcion.innerHTML = Element.TIP_PAGO;
                fpagos.appendChild(opcion);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

}

function agregar() {
    stock = $("#Fstock").val()
    cantidad = $("#Fcantidad").val()
    producto = $("#Fproducto").val()
    detalle = $("#Fdetalle").val()
    precio = $("#Fprecio").val()
    costo_envio = $("#FEnvio").val()
    Cod_producto = $("#FCOD_PRODUCTO").val()
    cod_inventario = document.getElementById("r_f_cod_inventario")
    sku = document.getElementById("sku_producto")
    //  agregar_detalle(producto, detalle, precio, stock,costo_envio, Cod_producto, cod_inventario.innerHTML )
    boton = document.getElementById("registro_factura")
    boton.removeAttribute('disabled')
    agregar_detalle(sku.innerHTML, producto, detalle, precio, cantidad, stock, Cod_producto, cod_inventario.innerHTML)
    llenar_tabla_factura();
    total_cliente_facturado();
    $("#Fcantidad").val("");
    $("#FSKU").val("");
}


function llenar_tabla_factura() {
    var cuerpo_cliente = document.getElementById("contenido_detalle");
    cuerpo_cliente.innerHTML = "";
    var lista_productos_cliente = get_detalle_factura();
    console.log(lista_productos_cliente)
    lista_productos_cliente.forEach(
        producto => {
           // console.log(producto)
            if (producto.q == 0) {
                let idPersonaDelete = producto.code;

                var index = lista_productos_cliente.map(function (item) {
                    return item.id;
                }).indexOf(idPersonaDelete);
                lista_productos_cliente.splice(index, 1);
                localStorage.setItem(" detalle_factura", JSON.stringify(lista_productos_cliente));
                llenar_tabla_factura();
                total_cliente_facturado();
                console.log(lista_productos_cliente);
                return;
            }

            if (producto.s < producto.q) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡No se cuenta con la cantidad solicitada.!',
                })
                return;
            }
            var fila_cliente = document.createElement("tr");

            var celda_sku_cliente = document.createElement("td");
            var celda_stock_producto = document.createElement("td");
            var celda_nombre_producto = document.createElement("td");
            var celda_descripcion_producto = document.createElement("td");
            var celda_precio_cliente = document.createElement("td");
            var celda_cantidad_cliente = document.createElement("td");
            var celda_total_cliente = document.createElement("td");
            var boton_cliente = document.createElement("td");
            var addparametros_cliente = "'" + producto.code + "','" + producto.nom_producto + "','" + producto.des_producto + "','" + producto.p + "','" + producto.q + "','" + producto.s + "'";

            var parametros_cliente = "'" + producto.code + "','" + producto.nom_producto + "','" + producto.des_producto + "','" + producto.p + "','" + producto.s + "'";
            boton_cliente.innerHTML = '<button type="input" class="btn btn-success"onclick="agregar_detalle(' + addparametros_cliente + ')">+</button><button type="input" class="btn btn-danger" style=" text-align: center;"onclick="q_carrito(' + parametros_cliente + ')">-</button>  <button type="input" class="btn btn-danger" style=" text-align: center;"onclick="borrarItem(' + producto.code + ')">x</button>'

            celda_sku_cliente.innerHTML = producto.code;
            celda_nombre_producto.innerHTML = producto.nom_producto;
            celda_descripcion_producto.innerHTML = producto.des_producto;
            celda_precio_cliente.innerHTML = producto.p;
            celda_stock_producto.innerHTML = producto.s;
            celda_cantidad_cliente.innerHTML = producto.q;
            celda_total_cliente.innerHTML = producto.tt;

            fila_cliente.appendChild(celda_sku_cliente).style = "display: none;";
            fila_cliente.appendChild(celda_stock_producto).style = "display: none;";
            fila_cliente.appendChild(celda_nombre_producto);
            fila_cliente.appendChild(celda_descripcion_producto);
            fila_cliente.appendChild(celda_cantidad_cliente);
            fila_cliente.appendChild(celda_precio_cliente);
            fila_cliente.appendChild(celda_total_cliente);
            fila_cliente.appendChild(boton_cliente);


            cuerpo_cliente.appendChild(fila_cliente);
        }
    );

}

function actualizar_factura() {
    pago = $("#forma_pago").val();
    cod_persona = document.getElementById("Fcod_persona");
    cod_direccion = document.getElementById("cod_direccion");
    cod_encabezado = document.getElementById("cod_encabezado");
    direccion = $("#FDireccionEntrega").val();
    if (pago == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Complete los campos vacios.!',
        })
        return;
    }

    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "pedidos/encabezado";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "COD_USUARIO": id_user, "COD_PERSONA": cod_persona.innerHTML, "COD_DIRECCION": cod_direccion.innerHTML, "COD_ENCABEZADO": cod_encabezado.innerHTML, "COD_MODULO": 8, "DIRECCION": direccion
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
                // console.log(result)
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

function actualizar_pedido() {

    pago = $("#forma_pago").val();
    cod_persona = document.getElementById("Fcod_persona");
    cod_direccion = document.getElementById("cod_direccion");
    cod_encabezado = document.getElementById("cod_encabezado");
    cod_producto = document.getElementById("cod_producto");
    obtener_pedidos()
    if (pago == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Complete los campos vacios.!',
        })
        return;
    }

    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "pedidos/encabezado";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "COD_USUARIO": id_user, "COD_PERSONA": cod_persona.innerHTML, "COD_DIRECCION": cod_direccion.innerHTML, "COD_ENCABEZADO": cod_encabezado.innerHTML, "COD_MODULO": 8
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
                //   console.log(result)
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

function obtener_pedidos(encabezado) {
    // encabezado =document.getElementById("cod_encabezado")
    $("#Acontenido_detalle").empty();
    var settings = {
        "url": api + "pedidos/pedidos_facturados",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        "data": JSON.stringify({ "ENCABEZADO": encabezado }),
    };

    $.ajax(settings).done(function (response) {
        // console.log(response);

        $.each(response[0], function (key, val) {
            $("#Acontenido_detalle").append("<tr><td>" + val.NOM_PRODUCTO + "</td><td>" + val.DES_PRODUCTO + "</td><td>" + val.CANT_PRODUCTO + "</td><td>" + val.PR_PRODUCTO + "</td><td  style='display: none;' >" + val.COS_ENVIO + "</td><td class='subtotal'>" + val.MON_PEDIDO + "</td><td style='display: none;'>" + val.STOCK + "</td><td style='display: none;'>" + val.COD_PRODUCTO + "</td><td style='display: none;'>" + val.COD_PEDIDO + "</td><td style='display: none;'>" + val.COD_INVENTARIO + "</td></tr>");
            var data = [];
            $("td.subtotal").each(function () {
                data.push(parseFloat($(this).text()));
            });
            var suma = data.reduce(function (a, b) { return a + b; }, 0);

            $("#detalle_total").html(parseInt(suma) + parseInt(val.COS_ENVIO));
            $("#FEnvio").val(val.COS_ENVIO)
            document.getElementById("envio_a_pagar").innerHTML = val.COS_ENVIO;
            $('#Adetalle_factura tbody').on('click', 'tr', function () {
                var data = $(this).children()
                ($(data[7]).text())
                $("#Fstock").val($(data[6]).text())
                $("#Fcantidad").val($(data[2]).text())
                $("#Fproducto").val($(data[0]).text())
                $("#Fdetalle").val($(data[1]).text())
                $("#Fprecio").val($(data[3]).text())
             

                document.getElementById("cod_producto").innerHTML = $(data[7]).text()
                document.getElementById("cod_pedido").innerHTML = $(data[8]).text()
                document.getElementById("cod_inventario").innerHTML = $(data[9]).text()

            });
        });
    })
        .catch(function (err) {
            console.log(err);
        });

}

function actualizar_pedido_factura() {
    pago = $("#forma_pago").val();
    cod_persona = document.getElementById("Fcod_persona");
    cod_direccion = document.getElementById("cod_direccion");
    cod_encabezado = document.getElementById("cod_encabezado");
    cod_pedido = document.getElementById("cod_pedido");
    cod_producto = document.getElementById("cod_producto");
    cod_inventario = document.getElementById("cod_inventario");
    cantidad = $("#Fcantidad").val()
    precio = $("#Fprecio").val()
    costo_envio = $("#FEnvio").val()
    monto_envio = (parseInt(precio) * parseInt(cantidad) + parseInt(costo_envio))
    stock_actual = $("#Fstock").val()
    stock_actualizado = (parseInt(stock_actual) - parseInt(cantidad))
    if (stock_actual <= cantidad) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡No se cuenta con la cantidad solicitada.!',
        })
        return;
    }
    url_act_pedido = api + "pedidos/actualizar";
    var myHeader = new Headers({
        'Authorization': token
    });
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "CANT_PRODUCTO": cantidad, "PR_PRODUCTO": precio, "MON_PEDIDO": monto_envio, "COS_ENVIO": costo_envio,
        "COD_PRODUCTO": cod_producto.innerHTML, "COD_MODULO": 8, "COD_USUARIO": id_user, "COD_PEDIDO": cod_pedido.innerHTML,
        "COD_INVENTARIO": cod_inventario.innerHTML, "STOCK": stock_actualizado, "COD_PAGO": pago, "SALIDA": cantidad
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_act_pedido, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result) {
                console.log(result)
                Swal.fire(
                    'Cambios Completados!',
                    'Se modificaron los datos correctamente!',
                    'success'
                )
                document.getElementById("alerta_actializacion").style.display = "block"
            }
        })
        .catch(error => console.log('error', error));

}

function calcular_envio() {
    total_cliente_facturado();
}


function generar_pdf() {

    var doc = new jsPDF();
    var imgData = 'data:image/png;base64,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'
    doc.setFontSize(18)


    Cliente = document.getElementById("cliente")

    identificacion = document.getElementById("identificacion")
    numero_ident = document.getElementById("codigo_identificacion")
    id_encabezado = document.getElementById("cod_encabezado")
    fecha = document.getElementById("fecha")
    total = document.getElementById("detalle_total");
    envio = document.getElementById("envio_a_pagar");
    //  var imgData = 'data: /public/img/logo.svg';
    let pdfName = 'FACTURA' + Cliente.innerHTML;
    doc.setFontSize(16);
    doc.addImage(imgData, 'JPEG', 80, 10, 40, 30)
    doc.text(41, 40, '**** TIENDA ARTESANÍA FUENTE DE BENDICIÓN ****')
    doc.text(50, 50, 'artesaniafuentedebendicion@gmail.com')

    doc.text(110, 10, 'Reporte Generado por: ' + user_logeado)
    doc.text(140, 60, 'Fecha:' + fecha.innerHTML)
    doc.text(140, 70, 'No. Factura: 000' + id_encabezado.innerHTML)
    doc.text(15, 60, 'Nombre del Cliente: ' + Cliente.innerHTML)
    doc.text(15, 70, identificacion.innerHTML + ': ' + numero_ident.innerHTML)

    doc.autoTable({
        margin: { top: 86, bottom: 0 },
        html: '#Adetalle_factura'
    })
    doc.text(120, 240, 'Costo   Envio :     L.' + envio.innerHTML + '.00')
    doc.text(120, 250, 'Total a Pagar :     L.' + total.innerHTML + '.00')
    doc.text(70, 270, 'GRACIAS POR SU COMPRA.!')

    doc.save(pdfName + '.pdf')

}

function cancelar_factura() {
    limpiar();
    localStorage.removeItem("detalle_factura")
    localStorage.removeItem("total_factura");
    document.getElementById("nuevo_factura").style.display = "none"
    document.getElementById("facturas_sistema").style.display = "block"
    document.getElementById("contenido_detalle").innerHTML = ""
}

obtener_pagos()
cargar_facturas();
llenar_tabla_factura()
total_cliente_facturado();
