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
            //   console.log(data)
            document.getElementById("ventas_t").innerHTML = "L." + data[0][0].ventas + ".00"

        })
        .catch(function (err) {
            console.log(err);
        });

}
function obtener_productos_vendidos() {

    var myHeader = new Headers({
        'Authorization': token
    });
    url = api + "reportes/producto_vendidos";
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
            data[0].forEach(element => {
                myChart.data['labels'].push(element.producto)
                myChart.data['datasets'][0].data.push(element.num_productos)

            }); 
            console.log(myChart.data)
        })
        .catch(function (err) {
            console.log(err);
        });

}
 
obtener_productos_vendidos() 
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Productos mas Vendidos',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

 



obtener_total_clientes()
obtener_total_usuarios()
obtener_total_categorias()
obtener_total_productos()
obtener_total_ventas()
