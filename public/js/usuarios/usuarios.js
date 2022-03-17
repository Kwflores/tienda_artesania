
var api = "http://localhost:3000/"


$(document).ready(function () {
    $("#inicio").click(function () {
        username = $("#NOM_USUARIO").val();
        password = $("#CLAVE").val();

        var existe = false;
        url_login = api + "login"
        var MyHeaders = new Headers();
        MyHeaders.append("Content-Type", "application/json",);
        raw = JSON.stringify({ "NOM_USUARIO": username, "CLAVE": password, "COD_USUARIO": 1, "COD_MODULO": 1, })
        var settings = {
            method: 'POST',
            headers: MyHeaders,
            body: raw,
            redirect: 'follow'

        };
        fetch(url_login, settings)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                localStorage.setItem('token', data.token);
                if (data != 0) {
                    let timerInterval
                    Swal.fire({
                        title: 'BIENVENIDO!',
                        html: username,
                        timer: 16000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                        }
                    })
                    window.location.href = "/";
                }
                else {
                    //consultar usuarios
                    var token = localStorage.getItem("token");
                    var myHeader = new Headers({
                        'Authorization': token
                    });
                    url_usuarios = api + "usuarios";
                    console.log(url_usuarios);
                    myHeader.append("Content-Type", "application/json",);
                    var raw = JSON.stringify({ "NOM_USUARIO": username, "COD_USUARIO": 1, "COD_MODULO": 1, });
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
                            console.log(data[0])
                            data[0].forEach(user => {
                                if (user.username != username) {
                                    existe = true;
                                }
                                if (existe) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: '¡Usuario o Contraseña incorrecta.!',
                                    })
                                }

                            })
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }

            })
            .catch(function (err) {
                console.log(err);
            });


    });




});

