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
                var div_conte  = document.createElement("div");
                var nombre = document.createElement("h5");
                var a = document.createElement("a");
                var br = document.createElement("br");
                div_col.classList = "col-md-6 col-lg-3";
                div_card.classList = "bg-white shadow mb-5 mb-lg-0";
                div_Art.classList = "hover-item hover-flip-img";
                imagen.classList = "img-fluid";
                div_conte.classList = "text-center p-4";
                nombre.classList="font-weight-700 mt-2"
                var boton_cliente = document.createElement("div");
                a.classList="text-dark-gray"
                a.innerHTML = categoria.NOM_CATEGORIA;
                boton_cliente.innerHTML = '<button type="button" class="btn btn-lg btn-outline-warning mx-2 mx-lg-3 mb-4" onclick=" categoria_producto(' + categoria.COD_CATEGORIA + ')">' + categoria.NOM_CATEGORIA + '</button>';
               
                a.href= "#"
                imagen.src = "/public/img/categorias/"+categoria.URL_IMG;
                 
                
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
                var div_conte  = document.createElement("div");
                var nombre = document.createElement("h5");
                var a = document.createElement("a");
                var a1 = document.createElement("a");
                var br = document.createElement("br");
                div_col.classList = "col-md-6 col-lg-3";
                div_card.classList = "bg-white shadow mb-5 mb-lg-0";
                div_Art.classList = "hover-item hover-flip-img";
                imagen.classList = "img-fluid";
                div_conte.classList = "text-center p-4";
                nombre.classList="font-weight-700 mt-2"
                var boton_cliente = document.createElement("div");
                a.classList="text-dark-gray"
                a1.classList="ext-dark-gray"
                a.innerHTML = producto.NOM_PRODUCTO 
                a1.innerHTML =' Lps. ' + producto.PR_PRODUCTO + '.00'
                boton_cliente.innerHTML = '<button type="button" class="btn btn-lg btn-outline-secondary mx-2 mx-lg-3 mb-4" onclick=" categoria_producto(' + producto.COD_PRODUCTO + ')"><i class="fas fa-shopping-cart"></i> Comprar </button>';
                imagen.src = "/public/img/categorias/"+producto.URL_IMAGEN;
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

function detalle_producto(){

}

mostrar_categorias_tienda();