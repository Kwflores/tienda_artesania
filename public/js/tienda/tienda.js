var api = "http://localhost:3000/"
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJDT0RfVVNVQVJJT1MiOjM1LCJOT01fVVNVQVJJTyI6IldQRVJFWiIsIkNMQVZFIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjpbNzIsMTExLDEwOCw5Nyw0NCw0OSw1MCw1MV19LCJDT0RfRVNUQURPIjoxLCJDT0RfUk9MIjoyfV0sImlhdCI6MTY1MDQ4NjcxOSwiZXhwIjoxNjU0MDg2NzE5fQ.j9JPGsmVi4mm8MF8aSsu5gg7B7EyoQhgpWdpaaLrKyI";
var user_logeado = 'INVITADO';

function mostrar_categorias_tienda() {

    var myHeader = new Headers({
        'Authorization': token
    });
    url_actualizar_permisos = api + "categorias";
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
                div_col.classList = "col-md-6 col-lg-3";
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
                div_col.classList = "col-md-6 col-lg-3";
                div_card.classList = "bg-white shadow mb-5 mb-lg-0";
                div_Art.classList = "hover-item hover-flip-img";
                imagen.classList = "img-fluid";
                div_conte.classList = "text-center p-4";
                nombre.classList = "font-weight-700 mt-2"
                var boton_cliente = document.createElement("div");
                a.classList = "text-dark-gray"
                a1.classList = "ext-dark-gray"
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

            document.getElementById("seccion_productos_mas_consumidos").style.display = "none";
            document.getElementById("carrucel").style.display = "none";
            document.getElementById("seccion_informativa").style.display = "none";
            document.getElementById("titulo_categoria").style.display = "none";

            document.getElementById("seccion_productos_promo").style.display = "none";
            document.getElementById("categorias").style.display = "none";
            document.getElementById("boton_todo_producto").style.display = "none";

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
                img = '<img class="img-fluid rounded-xl shadow-sm mb-4" src="/public/img/categorias/' + producto.URL_IMAGEN + '" alt="image">'

                document.getElementById("img_producto").innerHTML = img;
                document.getElementById("nombre_producto").innerHTML = producto.NOM_PRODUCTO;
                document.getElementById("descripcion_producto").innerHTML = producto.DES_PRODUCTO;
                document.getElementById("stok_disponible").innerHTML = 'STOCK DISPONIBLE: ' + producto.STOCK;
                document.getElementById("precio_producto").innerHTML = 'Lps. ' + producto.PR_PRODUCTO;
                var boton_cliente = document.createElement("div");
                //   $("#code_producto").val(producto.COD_PRODUCTO)
                var parametros_cliente = "'" + producto.SKU + "','" + producto.NOM_PRODUCTO + "','" + producto.DES_PRODUCTO + "','" + producto.PR_PRODUCTO + "'";
                boton_cliente.innerHTML = ' <button type="button"  onclick="agregar_carrito(' + parametros_cliente + ')"   class="btn btn-lg btn-secondary mx-2 mx-lg-3 mb-4"><i class="fas fa-shopping-cart"></i> Agregar al Carrito</button>';
                boton_agregar_carrito.appendChild(boton_cliente);

            })

            document.getElementById("seccion_productos_mas_consumidos").style.display = "none";
            document.getElementById("carrucel").style.display = "none";
            document.getElementById("seccion_informativa").style.display = "none";
            document.getElementById("titulo_categoria").style.display = "none";

            document.getElementById("seccion_productos_promo").style.display = "none";
            document.getElementById("categorias").style.display = "none";
            document.getElementById("boton_todo_producto").style.display = "none";
            document.getElementById("productos_categorias").style.display = "none";
            document.getElementById("detalle_producto").style.display = "block";

        })
        .catch(function (err) {
            console.log(err);
        });
}


function get_detalle_carrito() {
    var lista_registros = [];
    var lista_string = localStorage.getItem("detalle_carrito");
    if (lista_string) {
        lista_registros = JSON.parse(lista_string);
    }

    return lista_registros;
}
function q_carrito_cliente(sku, nombre, descripcion, precio) {
    var arreglo_registros = get_detalle_carrito();
    var cantidad = 1;
    var total_cliente = precio;
    var producto = {
        code: sku,
        nom_producto: nombre,
        des_producto: descripcion,
        p: precio,
        q: cantidad,
        tt: total_cliente
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

function agregar_carrito(sku, nombre, descripcion, precio) {
    var arreglo_registros = get_detalle_carrito();
    var cantidad = 1;
    var total = precio;
    var producto = {
        code: sku,
        nom_producto: nombre,
        des_producto: descripcion,
        p: precio,
        q: cantidad,
        tt: total
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
    localStorage.setItem("mostrar_carrito", 1)
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
            var fila_cliente = document.createElement("tr");
            var celda_sku_cliente = document.createElement("td");
            var celda_nombre_producto = document.createElement("td");
            var celda_descripcion_producto = document.createElement("td");
            var celda_precio_cliente = document.createElement("td");
            var celda_cantidad_cliente = document.createElement("td");
            var celda_total_cliente = document.createElement("td");
            var boton_cliente = document.createElement("td");
            var parametros_cliente = "'" + producto.code + "','" + producto.nom_producto + "','" + producto.des_producto + "','" + producto.p + "'";
            boton_cliente.innerHTML = '<button type="input" class="btn btn-success"onclick="agregar_carrito(' + parametros_cliente + ')">+</button><button type="input" class="btn btn-danger" style=" text-align: center;"onclick="q_carrito_cliente(' + parametros_cliente + ')">-</button>  <button type="input" class="btn btn-danger" style=" text-align: center;"onclick="borrarItemCarrito(' + producto.code + ')">x</button>'

            celda_sku_cliente.innerHTML = producto.code;
            celda_nombre_producto.innerHTML = producto.nom_producto;
            celda_descripcion_producto.innerHTML = producto.des_producto;
            celda_precio_cliente.innerHTML = producto.p;

            celda_cantidad_cliente.innerHTML = producto.q;
            celda_total_cliente.innerHTML = producto.tt;

            fila_cliente.appendChild(celda_sku_cliente);
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
llenar_tabla_carrito_cliente();



function total_cliente_carrito_cliente() {
    var productosLS;
    var total_cliente = 0;
    productosLS = get_detalle_carrito();
    for (var i = 0; i < productosLS.length; i++) {
        var element = Number(productosLS[i].p * productosLS[i].q);
        total_cliente = total_cliente + element;
        localStorage.setItem("total_acumulado", total_cliente);
    }

    document.getElementById("detalle_carrito_total").innerHTML = total_cliente;
}
mostrar_categorias_tienda();