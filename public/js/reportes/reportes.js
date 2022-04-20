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
            //console.log(data)
            data[0].forEach(element => {
                myChart.data['labels'].push(element.producto)
                myChart.data['datasets'][0].data.push(element.num_productos)

            });
            // console.log(myChart.data)
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

function obtener_tipos_categorias() {

    var myHeader = new Headers({
        'Authorization': token
    });
    url = api + "reportes/categorias";
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
                console.log(element.NOM_CATEGORIA)
                oilData['labels'].push(element.NOM_CATEGORIA)
                oilData['datasets'][0].data.push(element.COD_CATEGORIA)

            });
            console.log(oilData)
        })
        .catch(function (err) {
            console.log(err);
        });

}

obtener_tipos_categorias()
 
 
var oilCanvas = document.getElementById("oilChart");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 12;
 

var oilData = {
    
    datasets: [
        {   
            data:[],
            backgroundColor: [
                "#FF6384",
                "#63FF84",
                "#84FF63",
                "#8463FF",
                "#6384FF"
            ]
        }]
};

var pieChart = new Chart(oilCanvas, {
  type: 'pie',
  data: oilData
});

function obtener_tipos_pagos() {

    var myHeader = new Headers({
        'Authorization': token
    });
    url = api + "reportes/pagos";
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
              
                barChart.data['labels'].push(element.TIP_PAGO)
                densityData.data.push(element.pago)

            });
           
        })
        .catch(function (err) {
            console.log(err);
        });

}

obtener_tipos_pagos()
var densityCanvas = document.getElementById("densityChart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 12;

var densityData = {
  label: 'Tipo de Pagos',
  data: [],
  backgroundColor: [
    'rgba(0, 99, 132, 0.6)',
    'rgba(30, 99, 132, 0.6)',
    'rgba(60, 99, 132, 0.6)',
    'rgba(90, 99, 132, 0.6)',
    'rgba(120, 99, 132, 0.6)',
    'rgba(150, 99, 132, 0.6)',
    'rgba(180, 99, 132, 0.6)',
    'rgba(210, 99, 132, 0.6)',
    'rgba(240, 99, 132, 0.6)'
  ],
  borderColor: [
    'rgba(0, 99, 132, 1)',
    'rgba(30, 99, 132, 1)',
    'rgba(60, 99, 132, 1)',
    'rgba(90, 99, 132, 1)',
    'rgba(120, 99, 132, 1)',
    'rgba(150, 99, 132, 1)',
    'rgba(180, 99, 132, 1)',
    'rgba(210, 99, 132, 1)',
    'rgba(240, 99, 132, 1)'
  ],
  borderWidth: 2,
  hoverBorderWidth: 0
};

var chartOptions = {
  scales: {
    yAxes: [{
      barPercentage: 0.10
    }]
  },
  elements: {
    rectangle: {
      borderSkipped: 'left',
    }
  }
};

var barChart = new Chart(densityCanvas, {
  type: 'horizontalBar',
  data: {
    labels: [],
    datasets: [densityData],
  },
  options: chartOptions
});
obtener_total_clientes()
obtener_total_usuarios()
obtener_total_categorias()
obtener_total_productos()
obtener_total_ventas()
