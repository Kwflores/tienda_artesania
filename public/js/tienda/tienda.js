var api = "http://localhost:3000/"
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJDT0RfVVNVQVJJT1MiOjM1LCJOT01fVVNVQVJJTyI6IldQRVJFWiIsIkNMQVZFIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjpbNzIsMTExLDEwOCw5Nyw0NCw0OSw1MCw1MV19LCJDT0RfRVNUQURPIjoxLCJDT0RfUk9MIjoyfV0sImlhdCI6MTY1MDQ4NjcxOSwiZXhwIjoxNjU0MDg2NzE5fQ.j9JPGsmVi4mm8MF8aSsu5gg7B7EyoQhgpWdpaaLrKyI";
var user_logeado = 'INVITADO';
$(document).ready(function () {
    $("#registrar_compra").click(function () {
        var id_user = localStorage.getItem("id_usuario");
        var token = localStorage.getItem("token");
        direccion = $("#direccion_entrega_cliente").val();
        pago = $("#forma_pago_cliente").val();
        cliente_logeado = localStorage.getItem("usuario");
        cod_persona = document.getElementById("cliente_cod");
        detallefactura = get_detalle_carrito()
        if (pago == "" || direccion == "") {
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
            "data": JSON.stringify({ "COD_PERSONA": cod_persona.innerHTML, "COD_USUARIO": id_user, "DIRECCION": direccion, "COD_MODULO": 8 }),
        };

        $.ajax(settings).done(function (response) {
            //  console.log(response[0][0].COD_ENCABEZADO)
            encabezado = response[0][0].COD_ENCABEZADO
            factura = api + "send-email/factura_digital"
            var MyHeaders = new Headers({
                'Authorization': token
            });

            MyHeaders.append("Content-Type", "application/json",);
            raw = JSON.stringify({ "USUARIO": cliente_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, })
            var settings = {
                method: 'POST',
                headers: MyHeaders,
                body: raw,
                redirect: 'follow'
            };
            if (cliente_logeado) {
                fetch(factura, settings)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        if (data) {
                            Swal.fire(
                                'Gracias por su Compra!',
                                'Se envio confirmación del pedido via correo!',
                                'success'
                            )
                           
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: '¡Nombre de Usuario Invalido.!',
                            })
                        }
                        console.log(data)

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
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
                cod_pago = $("#forma_pago_cliente").val();
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
                   
                    vaciarcarrito_cliente();
                });



            });
        });



    });



});


function mostrar_categorias_tienda() {

    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "categorias/activas";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_USUARIO": user_logeado, "COD_USUARIO": 2, "COD_MODULO": 2
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_permisos, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            var contenido = document.getElementById("categorias");
            console.log(contenido);
            //var contenido_cliente = document.getElementById("lista_categorias_clientes");

            data[0].forEach(categoria => {

                var div_col = document.createElement("div");
                var div_card = document.createElement("div");
                var div_Art = document.createElement("div");
                var figure = document.createElement("figure");
                var imagen = document.createElement("img");
                var div_producto = document.createElement("div");
                var div_conte = document.createElement("div");
                var nombre = document.createElement("h5");
                var a = document.createElement("a");
                var br = document.createElement("br");
                div_col.classList = "col-md-6 col-lg-3  py-3";
                div_card.classList = "bg-white shadow mb-5 mb-lg-0";
                div_Art.classList = "hover-item hover-flip-img";
                imagen.classList = "img-fluid";
                div_conte.classList = "text-center p-4";
                nombre.classList = "font-weight-700 mt-2"
                var boton_cliente = document.createElement("div");
                a.classList = "text-dark-gray"
                a.innerHTML = categoria.NOM_CATEGORIA;
                boton_cliente.innerHTML = '<button type="button" class="btn btn-lg btn-outline-warning mx-2 mx-lg-3 mb-4" onclick=" categoria_producto(' + categoria.COD_CATEGORIA + ')">' + categoria.NOM_CATEGORIA + '</button>';

                a.href = "#"
                imagen.src = "/public/img/categorias/" + categoria.URL_IMG;


                div_Art.appendChild(br);
                figure.appendChild(imagen);
                div_Art.appendChild(figure);
                div_conte.appendChild(nombre);
                div_conte.appendChild(boton_cliente);
                div_card.appendChild(div_Art);
                div_card.appendChild(div_conte);
                div_col.appendChild(div_card);
                div_Art.appendChild(br);
                contenido.appendChild(div_col);

            })



        })
        .catch(function (err) {
            console.log(err);
        });

}

function mostrar_categorias_tienda_list() {

    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "categorias/activas";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_USUARIO": user_logeado, "COD_USUARIO": 2, "COD_MODULO": 2
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_permisos, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            var contenido = document.getElementById("categorias_listadas");
            console.log(contenido);
            //var contenido_cliente = document.getElementById("lista_categorias_clientes");

            data[0].forEach(categoria => {

                var div_col = document.createElement("div");
                var div_card = document.createElement("div");
                var div_Art = document.createElement("div");
                var figure = document.createElement("figure");
                var imagen = document.createElement("img");
                var div_producto = document.createElement("div");
                var div_conte = document.createElement("div");
                var nombre = document.createElement("h5");
                var a = document.createElement("a");
                var br = document.createElement("br");
                div_col.classList = "col-md-6 col-lg-3 mb-3 py-3";
                div_card.classList = "bg-white shadow mb-5 mb-lg-0 ";
                div_Art.classList = "hover-item hover-flip-img";
                imagen.classList = "img-fluid";
                div_conte.classList = "text-center p-4";
                nombre.classList = "font-weight-700 mt-2"
                var boton_cliente = document.createElement("div");
                a.classList = "text-dark-gray"
                a.innerHTML = categoria.NOM_CATEGORIA;
                boton_cliente.innerHTML = '<button type="button" class="btn btn-lg btn-outline-warning mx-2 mx-lg-3 mb-4" onclick=" categoria_producto(' + categoria.COD_CATEGORIA + ')">' + categoria.NOM_CATEGORIA + '</button>';

                a.href = "#"
                imagen.src = "/public/img/categorias/" + categoria.URL_IMG;


                div_Art.appendChild(br);
                figure.appendChild(imagen);
                div_Art.appendChild(figure);
                div_conte.appendChild(nombre);
                div_conte.appendChild(boton_cliente);
                div_card.appendChild(div_Art);
                div_card.appendChild(div_conte);
                div_col.appendChild(div_card);

                contenido.appendChild(div_col);

            })



        })
        .catch(function (err) {
            console.log(err);
        });

}


function categoria_producto(cod_categoria) {
    var tokens = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJDT0RfVVNVQVJJT1MiOjM1LCJOT01fVVNVQVJJTyI6IldQRVJFWiIsIkNMQVZFIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjpbNzIsMTExLDEwOCw5Nyw0NCw0OSw1MCw1MV19LCJDT0RfRVNUQURPIjoxLCJDT0RfUk9MIjoyfV0sImlhdCI6MTY1MDQ4NjcxOSwiZXhwIjoxNjU0MDg2NzE5fQ.j9JPGsmVi4mm8MF8aSsu5gg7B7EyoQhgpWdpaaLrKyI";

    var myHeader = new Headers({
        'Authorization': tokens
    });
    url_actualizar_permisos = api + "categorias/productos_categoria";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "COD_CATEGORIA": cod_categoria, "COD_USUARIO": 2, "COD_MODULO": 2
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_permisos, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            var contenido = document.getElementById("productos_categorias");
            console.log(contenido);
            //var contenido_cliente = document.getElementById("lista_categorias_clientes");
            if (data != 0) {
                data[0].forEach(producto => {

                    var div_col = document.createElement("div");
                    var div_card = document.createElement("div");
                    var div_Art = document.createElement("div");
                    var figure = document.createElement("figure");
                    var imagen = document.createElement("img");
                    var div_producto = document.createElement("div");
                    var div_conte = document.createElement("div");
                    var nombre = document.createElement("h5");
                    var a = document.createElement("a");
                    var a1 = document.createElement("a");
                    var br = document.createElement("br");
                    div_col.classList = "col-md-6 col-lg-3  py-3";
                    div_card.classList = "bg-white shadow mb-5 mb-lg-0";
                    div_Art.classList = "hover-item hover-flip-img";
                    imagen.classList = "img-fluid";
                    div_conte.classList = "text-center p-4";
                    nombre.classList = "font-weight-700 mt-2"
                    var boton_cliente = document.createElement("div");
                    a.classList = "text-dark-gray"
                    a1.classList = "ext-dark-gray"
                    localStorage.setItem("stocK", producto.STOCK)
                    a.innerHTML = producto.NOM_PRODUCTO
                    a1.innerHTML = ' Lps. ' + producto.PR_PRODUCTO + '.00'
                    boton_cliente.innerHTML = '<button type="button" class="btn btn-lg btn-outline-secondary mx-2 mx-lg-3 mb-4" onclick=" detalle_producto(' + producto.SKU + ')"><i class="fas fa-shopping-cart"></i> VER MAS </button>';
                    imagen.src = "/public/img/categorias/" + producto.URL_IMAGEN;
                    div_Art.appendChild(br);
                    div_Art.appendChild(a);
                    div_Art.appendChild(br);
                    figure.appendChild(imagen);
                    div_Art.appendChild(figure);
                    nombre.appendChild(a);
                    nombre.appendChild(br);
                    div_conte.appendChild(nombre);
                    nombre.appendChild(a1);
                    div_conte.appendChild(nombre);
                    div_conte.appendChild(boton_cliente);
                    div_card.appendChild(div_Art);
                    div_card.appendChild(div_conte);
                    div_col.appendChild(div_card);
                    contenido.appendChild(div_col);

                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡La Categoria selecciona no dispone de productos.!',
                })
                return;
            }


            
            document.getElementById("carrucel").style.display = "none";
            document.getElementById("seccion_informativa").style.display = "none";
            document.getElementById("titulo_categoria").style.display = "none";

            document.getElementById("seccion_productos_promo").style.display = "none";
            document.getElementById("lista_categorias").style.display = "none";
            document.getElementById("boton_todo_producto").style.display = "none";
            document.getElementById("listado_productos").style.display = "block";
            document.getElementById("lista_categorias_productos").style.display = "none";
            document.getElementById("lista_categorias_productos").style.display = "none";
            document.getElementById("detalle_producto").style.display = "none";
            document.getElementById("boton_agregar_carrito").innerHTML = "";


            //    document.getElementById("producto_por_categorias").style.display = "block";


        })
        .catch(function (err) {
            console.log(err);
        });

}

function detalle_producto(sku) {
    var tokens = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJDT0RfVVNVQVJJT1MiOjM1LCJOT01fVVNVQVJJTyI6IldQRVJFWiIsIkNMQVZFIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjpbNzIsMTExLDEwOCw5Nyw0NCw0OSw1MCw1MV19LCJDT0RfRVNUQURPIjoxLCJDT0RfUk9MIjoyfV0sImlhdCI6MTY1MDQ4NjcxOSwiZXhwIjoxNjU0MDg2NzE5fQ.j9JPGsmVi4mm8MF8aSsu5gg7B7EyoQhgpWdpaaLrKyI";

    var myHeader = new Headers({
        'Authorization': tokens
    });
    url_actualizar_permisos = api + "productos/sku";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_USUARIO": user_logeado, "COD_USUARIO": 2, "COD_MODULO": 2, "SKU": sku
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_actualizar_permisos, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            boton_agregar_carrito = document.getElementById("boton_agregar_carrito")
            data[0].forEach(producto => {
                console.log(producto.COD_PRODUCTO)
                img = '<img class="img-fluid rounded-xl shadow-sm mb-4" src="/public/img/categorias/' + producto.URL_IMAGEN + '" alt="image">'

                document.getElementById("img_producto").innerHTML = img;
                document.getElementById("nombre_producto").innerHTML = producto.NOM_PRODUCTO;
                document.getElementById("descripcion_producto").innerHTML = producto.DES_PRODUCTO;
                document.getElementById("stok_disponible").innerHTML = 'STOCK DISPONIBLE: ' + producto.STOCK;
                document.getElementById("precio_producto").innerHTML = 'Lps. ' + producto.PR_PRODUCTO;
                document.getElementById("stock_carrito").innerHTML = + producto.STOCK;
                var boton_cliente = document.createElement("div");

                var parametros_cliente = "'" + producto.SKU + "','" + producto.NOM_PRODUCTO + "','" + producto.DES_PRODUCTO + "','" + producto.PR_PRODUCTO + "','" + producto.STOCK + "','" + producto.COD_PRODUCTO + "','" + producto.COD_INVENTARIO + "'";
                boton_cliente.innerHTML = ' <button type="button"  onclick="agregar_carrito(' + parametros_cliente + ')"   class="btn btn-lg btn-secondary mx-2 mx-lg-3 mb-4"><i class="fas fa-shopping-cart"></i> Agregar al Carrito</button>';
                boton_agregar_carrito.appendChild(boton_cliente);




            })

           
            document.getElementById("carrucel").style.display = "none";
            document.getElementById("seccion_informativa").style.display = "none";
            document.getElementById("titulo_categoria").style.display = "none";

            document.getElementById("seccion_productos_promo").style.display = "none";
            document.getElementById("categorias").style.display = "none";
            document.getElementById("boton_todo_producto").style.display = "none";
            document.getElementById("productos_categorias").innerHTML = "";
            document.getElementById("detalle_producto").style.display = "block";
            llenar_tabla_carrito_cliente();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function carrito_compra_logeado() {
 
    document.getElementById("carrucel").style.display = "none";
    document.getElementById("seccion_informativa").style.display = "none";
    document.getElementById("titulo_categoria").style.display = "none";

    document.getElementById("seccion_productos_promo").style.display = "none";
    document.getElementById("categorias").style.display = "none";
    document.getElementById("boton_todo_producto").style.display = "none";
    document.getElementById("productos_categorias").style.display = "none";
    document.getElementById("lista_categorias_productos").style.display = "none";
    document.getElementById("carrito_detalle_compra").style.display = "block";
    llenar_tabla_carrito_cliente();
}

function get_detalle_carrito() {
    var lista_registros = [];
    var lista_string = localStorage.getItem("detalle_carrito");
    if (lista_string) {
        lista_registros = JSON.parse(lista_string);
    }
    document.getElementById("carrito_decompras").innerHTML = '<i class="fas fa-shopping-cart"></i>' + lista_registros.length
    return lista_registros;
}

function q_carrito_cliente(sku, nombre, descripcion, precio, stok, codi_producto, cod_inventario) {
    var arreglo_registros = get_detalle_carrito();
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
    localStorage.setItem("detalle_carrito", JSON.stringify(arreglo_registros));
    llenar_tabla_carrito_cliente();
    total_cliente_carrito_cliente();
}
//funcion que muestra si existe el sku
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

function agregar_carrito(sku, nombre, descripcion, precio, stock, cod_producto, cod_inventario) {
    var arreglo_registros = get_detalle_carrito();
    var cantidad = 01;
    var total = precio;
    var producto = {
        code: sku,
        nom_producto: nombre,
        des_producto: descripcion,
        p: precio,
        q: cantidad,
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
    localStorage.setItem("detalle_carrito", JSON.stringify(arreglo_registros));
    //localStorage.setItem("mostrar_carrito", 1)
    document.getElementById("carrito_detalle_compra").style.display = 'block'
    llenar_tabla_carrito_cliente();
    total_cliente_carrito_cliente();
}

function borrarItemCarrito(sku) {
    var arreglo_registros = get_detalle_carrito();

    arreglo_registros.forEach(
        carro => {
            if (carro.code == sku) {
                let idPersonaDelete = carro.code;

                var index = arreglo_registros.map(function (item) {
                    return item.id;
                }).indexOf(idPersonaDelete);
                arreglo_registros.splice(index, 1);
                localStorage.setItem("detalle_carrito", JSON.stringify(arreglo_registros));
                llenar_tabla_carrito_cliente();
                total_cliente_carrito_cliente()

                return;
            }

        });

}

function llenar_tabla_carrito_cliente() {
    var cuerpo_cliente = document.getElementById("contenido_carrito_detalle");


    cuerpo_cliente.innerHTML = "";
    var lista_productos_cliente = get_detalle_carrito();
    console.log(lista_productos_cliente)
    lista_productos_cliente.forEach(
        producto => {
            console.log(producto)
            if (producto.q == 0) {
                let idPersonaDelete = producto.code;

                var index = lista_productos_cliente.map(function (item) {
                    return item.id;
                }).indexOf(idPersonaDelete);
                lista_productos_cliente.splice(index, 1);
                localStorage.setItem("detalle_carrito", JSON.stringify(lista_productos_cliente));
                llenar_tabla_carrito_cliente();
                total_cliente_carrito_cliente()
                console.log(lista_productos_cliente);
                return;
            }

            if (producto.s <= producto.q) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡No se cuenta con la cantidad solicitada.!',
                })

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
            var parametros_cliente = "'" + producto.code + "','" + producto.nom_producto + "','" + producto.des_producto + "','" + producto.p + "','" + producto.s + "'";
            boton_cliente.innerHTML = '<button type="input" class="btn btn-success"onclick="agregar_carrito(' + parametros_cliente + ')">+</button><button type="input" class="btn btn-danger" style=" text-align: center;"onclick="q_carrito_cliente(' + parametros_cliente + ')">-</button>  <button type="input" class="btn btn-danger" style=" text-align: center;"onclick="borrarItemCarrito(' + producto.code + ')">x</button>'

            celda_sku_cliente.innerHTML = producto.code;
            celda_nombre_producto.innerHTML = producto.nom_producto;
            celda_descripcion_producto.innerHTML = producto.des_producto;
            celda_precio_cliente.innerHTML = producto.p;
            celda_stock_producto.innerHTML = producto.s;
            celda_cantidad_cliente.innerHTML = producto.q;
            celda_total_cliente.innerHTML = producto.tt;

            fila_cliente.appendChild(celda_sku_cliente);
            fila_cliente.appendChild(celda_stock_producto);
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

function obtener_pagos_cliente() {
    var fpagos = document.getElementById("forma_pago_cliente");
    var myHeader = new Headers({
        'Authorization': token
    });
    url_pagos = api + "pagos";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": 2, "COD_MODULO": 9, });
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
obtener_pagos_cliente()

function total_cliente_carrito_cliente() {
    var productosLS;
    var total_cliente = 0;
    var costo_envio = document.getElementById("detalle_costo_envio")
    productosLS = get_detalle_carrito();
    for (var i = 0; i < productosLS.length; i++) {
        var element = Number(productosLS[i].p * productosLS[i].q);
        total_cliente = total_cliente + element + parseInt(costo_envio.innerHTML);
        localStorage.setItem("total_acumulado", total_cliente);
    }

    document.getElementById("detalle_carrito_total").innerHTML = total_cliente + '.00';
}

function vaciarcarrito_cliente() {
    //Limpiarlo
    // localStorage.removeItem("mostrar_carrito")
    document.getElementById("carrito_detalle_compra").style.display = "none";
    document.getElementById("contenido_carrito_detalle").innerHTML = "";
    localStorage.setItem("detalle_carrito", "[]");
    localStorage.removeItem("total_acumulado");
    document.getElementById("detalle_carrito_total").innerHTML = " ";
    document.pago_cliente.submit();
}



function datos_cliente() {
    var usuario_logeado = localStorage.getItem("usuario");
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJDT0RfVVNVQVJJT1MiOjM1LCJOT01fVVNVQVJJTyI6IldQRVJFWiIsIkNMQVZFIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjpbNzIsMTExLDEwOCw5Nyw0NCw0OSw1MCw1MV19LCJDT0RfRVNUQURPIjoxLCJDT0RfUk9MIjoyfV0sImlhdCI6MTY1MDQ4NjcxOSwiZXhwIjoxNjU0MDg2NzE5fQ.j9JPGsmVi4mm8MF8aSsu5gg7B7EyoQhgpWdpaaLrKyI";
    var user_logeado = 'INVITADO';
    nombre_cliente = localStorage.getItem("nombre_usuario")

    var existe = false;
    var myHeader = new Headers({
        'Authorization': token
    });
    url_usuarios = api + "usuarios";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_USUARIO": user_logeado, "COD_USUARIO": 2, "COD_MODULO": 9,
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_usuarios, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data[0].forEach(user => {
               // console.log(user)
                if (user.Usuario == usuario_logeado) {
                    existe = true;
                    document.getElementById("nombre_cliente").value = user.Nombre;
                    document.getElementById("cliente_cod").innerHTML = user.COD_PERSONA;
                    $("#Perfil_Usuario").val(user.Nombre);
                    $("#Perfil_Correo").val(user.Correo);
                    $("#Perfil_telefono").val(user.Telefono);
                    $("#Perfil_Direccion").val(user.DIRECCION);
                    $("#Perfil_id_tipo_ide").val(user.identificacion);
                    $("#Perfil_idenficacion").val(user.num_identificacion);
                    Perfil_id_rol_cliente = document.getElementById("Perfil_id_rol_cliente");
                    Perfil_id_rol_cliente.innerHTML = user.cod_rol;
                    estado_perfil_cliente = document.getElementById("estado_perfil_cliente");
                    estado_perfil_cliente.innerHTML = user.Estado;
                    persona_perfil_cliente = document.getElementById("persona_perfil_cliente");
                    persona_perfil_cliente.innerHTML = user.COD_PERSONA;
                    usuario = document.getElementById("usuario");
                    usuario.innerHTML = user.Usuario;
                    rol = document.getElementById("rol");
                    rol.innerHTML = user.Rol;
                    clave_actual_cliente = document.getElementById("clave_actual_cliente");
                    clave_actual_cliente.innerHTML = data.clave;
                }
            });
            if (existe) {
                document.getElementById("Datos_clientes").style.display = "block";

            } else {
                mostrarlogin()
                document.getElementById("Datos_clientes").style.display = "none";

            }
        })


        .catch(function (err) {
            console.log(err);
        });
}

function perfil_cliente() {
    var usuario_logeado = localStorage.getItem("usuario");
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJDT0RfVVNVQVJJT1MiOjM1LCJOT01fVVNVQVJJTyI6IldQRVJFWiIsIkNMQVZFIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjpbNzIsMTExLDEwOCw5Nyw0NCw0OSw1MCw1MV19LCJDT0RfRVNUQURPIjoxLCJDT0RfUk9MIjoyfV0sImlhdCI6MTY1MDQ4NjcxOSwiZXhwIjoxNjU0MDg2NzE5fQ.j9JPGsmVi4mm8MF8aSsu5gg7B7EyoQhgpWdpaaLrKyI";
    var user_logeado = 'INVITADO';
    nombre_cliente = localStorage.getItem("nombre_usuario")

    var existe = false;
    var myHeader = new Headers({
        'Authorization': token
    });
    url_usuarios = api + "usuarios";
    myHeader.append("Content-Type", "application/json",);
    var raw = JSON.stringify({
        "NOM_USUARIO": user_logeado, "COD_USUARIO": 2, "COD_MODULO": 9,
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: raw,
        redirect: 'follow'
    };
    fetch(url_usuarios, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data[0].forEach(user => {
             //   console.log(user)
                if (user.Usuario == usuario_logeado) {
                    existe = true;
                    $("#perfil_Cliente").val(user.Nombre);
                    $("#Perfil_Correo_cliente").val(user.Correo);
                    $("#Perfil_telefono_cliente").val(user.Telefono);
                    $("#Perfil_Direccion_cliente").val(user.DIRECCION);
                    $("#Perfil_id_tipo_ide_cliente").val(user.NOM_IDENTIFICACION);
                    $("#Perfil_idenficacion_cliente").val(user.COD_IDENTIFICACION);
                    
                    estado_perfil_cliente = document.getElementById("estado_perfil_cliente");
                    estado_perfil_cliente.innerHTML = user.Estado;
                    persona_perfil_cliente = document.getElementById("persona_perfil_cliente");
                    persona_perfil_cliente.innerHTML = user.COD_PERSONA;
                    usuario = document.getElementById("usuario");
                    usuario.innerHTML = user.Usuario;
                    rol = document.getElementById("rol");
                    rol.innerHTML = user.Rol;
                    clave_actual_cliente = document.getElementById("clave_actual_cliente");
                    clave_actual_cliente.innerHTML = data.clave;
                }
            });
            
        })


        .catch(function (err) {
            console.log(err);
        });
}

perfil_cliente();


function actualizar_perfil_cliente() {
    nombre = $("#perfil_Cliente").val();
    correo = $("#Perfil_Correo_cliente").val();
    telefono = $("#Perfil_telefono_cliente").val();
    usuario = $("#Perfil_Direccion_cliente").val();
    direccion = $("#Perfil_Direccion_cliente").val();
    idenficacion = $("#Perfil_id_tipo_ide_cliente").val();
    no_identificacion = $("#Perfil_idenficacion_cliente").val();
   
    estado = document.getElementById("estado_perfil_cliente");
    persona = document.getElementById("persona_perfil_cliente");
    valido = document.getElementById('P_CcorreoOK') 
    if(valido != ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Favor introducir una dirección de correo valida.!',
        })
        return;
    }
    if (nombre == "" || correo == "" || usuario == "" || telefono == ""
        || idenficacion == "" || no_identificacion == "" || direccion == ""
        || estado == "" || persona == "") {
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
        "DIRECCION": direccion, "COD_ROL": 4, "COD_ESTADO": estado.innerHTML, "COD_USUARIO": id_user, "COD_MODULO": 9
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

    usuario = document.getElementById("usuario");
    pass_actual = document.getElementById("clave_actual_cliente");

    verificar_clave = $("#contraseña_actual_cliente").val();
    clave_nueva = $("#nueva_contraseña_perfil_actual").val();
    confi_clave = $("#confirmar_contraseña_perfil_perfil").val();
    valido = document.getElementById('A_C_passOK') 
    if(valido != ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Favor introducir una contraseña valida.!',
        })
        return;
    }
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
                localStorage.removeItem("tiendita")
                $("#contraseña_actual").val("");
                $("#nueva_contraseña_perfil").val("");
                $("#confirmar_contraseña_perfil").val("");

                mostrarlogin();
            }
        })
        .catch(error => console.log('error', error));


}


function continuar_comprando() {
    document.getElementById("listado_productos").style.display = "none";
    document.getElementById("lista_categorias_productos").style.display = "block";

    document.getElementById("detalle_producto").style.display = "none";
    document.getElementById("productos_categorias").style.display = "block";
}

total_cliente_carrito_cliente()
mostrar_categorias_tienda_list()
mostrar_categorias_tienda();
llenar_tabla_carrito_cliente()