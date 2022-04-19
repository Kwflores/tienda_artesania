var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");

function obtener_total_clientes() {
     
    var myHeader = new Headers({
        'Authorization': token
    });
    url = api + "reportes/tota_clientes";
    myHeader.append("Content-Type", "application/json",);
    var requestOptions = {
        method: 'GET',
        headers: myHeader,
        redirect: 'follow'
    };
    fetch(url, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
              document.getElementById("clientes_t").innerHTML = data[0][0].numero_usuario
            
        })
        .catch(function (err) {
            console.log(err);
        });

}

function obtener_total_usuarios() {
     
    var myHeader = new Headers({
        'Authorization': token
    });
    url = api + "reportes/tota_usuarios";
    myHeader.append("Content-Type", "application/json",);
    var requestOptions = {
        method: 'GET',
        headers: myHeader,
        redirect: 'follow'
    };
    fetch(url, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
              document.getElementById("usuarios_t").innerHTML = data[0][0].numero_usuario
            
        })
        .catch(function (err) {
            console.log(err);
        });

}

function obtener_total_categorias() {
     
    var myHeader = new Headers({
        'Authorization': token
    });
    url = api + "reportes/total_categoria";
    myHeader.append("Content-Type", "application/json",);
    var requestOptions = {
        method: 'GET',
        headers: myHeader,
        redirect: 'follow'
    };
    fetch(url, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
              document.getElementById("categorias_t").innerHTML = data[0][0].numero_categoria
            
        })
        .catch(function (err) {
            console.log(err);
        });

}

function obtener_total_productos() {
     
    var myHeader = new Headers({
        'Authorization': token
    });
    url = api + "reportes/tota_productos";
    myHeader.append("Content-Type", "application/json",);
    var requestOptions = {
        method: 'GET',
        headers: myHeader,
        redirect: 'follow'
    };
    fetch(url, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           
              document.getElementById("productos_t").innerHTML = data[0][0].numero_sku
            
        })
        .catch(function (err) {
            console.log(err);
        });

}
function obtener_total_ventas() {
     
    var myHeader = new Headers({
        'Authorization': token
    });
    url = api + "reportes/tota_ventas";
    myHeader.append("Content-Type", "application/json",);
    var requestOptions = {
        method: 'GET',
        headers: myHeader,
        redirect: 'follow'
    };
    fetch(url, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
              document.getElementById("ventas_t").innerHTML = data[0][0].ventas
            
        })
        .catch(function (err) {
            console.log(err);
        });

}
obtener_total_clientes() 
obtener_total_usuarios()
obtener_total_categorias() 
obtener_total_productos()
obtener_total_ventas()