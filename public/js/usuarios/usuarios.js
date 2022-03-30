//variables globales
var api = "http://localhost:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");
$(document).ready(function () {
    //login del sistema 
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
                if (!data) {
                    console.log(data)
                    url_tokens = api + "send-email/token";
                    raw = JSON.stringify({ "CLAVE": password })
                    var MyHeaders = new Headers();
                    MyHeaders.append("Content-Type", "application/json",);
                    var requestOptions = {
                        method: 'POST',
                        headers: MyHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(url_tokens, requestOptions)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data)
                            hoy = new Date()
                            fecha_actual = hoy.toISOString()
                            data[0].forEach(element => {
                                fecha_vencimiento = element.FECHA_VENCIMIENTO
                                tokens = element.TOKEN

                                if (password = element.TOKEN && fecha_vencimiento >= fecha_actual) {
                                    username = "";
                                    password = "";
                                    localStorage.setItem('id_user', element.COD_USUARIO);
                                    localStorage.setItem('usuario_reset_clave', username)
                                    document.getElementById("clave").style.display = "block";
                                    document.getElementById("login").style.display = "none";
                                    document.getElementById("registro").style.display = "none";
                                    document.getElementById("resetear-clave").style.display = "none";

                                }
                                else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: '¡El Codigo Proporcionado ya caduco.!',
                                    })
                                }

                            });

                        })

                }


                if (data != 0) {

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('id_usuario', data.cod_usuario);
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
                    localStorage.setItem('usuario', username);
                    window.location.href = "/";
                }
                if (data == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '¡Usuario o Contraseña incorrecta.!',
                    })
                }

                else {
                    //consultar usuarios
                    var id_user = localStorage.getItem("id_usuario");
                    var token = localStorage.getItem("token");
                    var myHeader = new Headers({
                        'Authorization': token
                    });
                    url_usuarios = api + "usuarios";
                    console.log(url_usuarios);
                    myHeader.append("Content-Type", "application/json",);
                    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 1, });
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
                                if (user.Usuario != username) {
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

    });

    //envia una contrasena temporal via correo al usuario
    $("#reset-pass").click(function () {
        user = $("#USUARIO").val();

        var existe = false;
        url_reset_pass = api + "send-email/"
        var MyHeaders = new Headers({
            'Authorization': token
        });
        MyHeaders.append("Content-Type", "application/json",);
        raw = JSON.stringify({ "USUARIO": user, "COD_USUARIO": id_user, "COD_MODULO": 1, })
        var settings = {
            method: 'POST',
            headers: MyHeaders,
            body: raw,
            redirect: 'follow'
        };
        if (user) {
            fetch(url_reset_pass, settings)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data) {
                        Swal.fire(
                            'Correo Enviado!',
                            'Se envio su contraseña via correo!',
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



    });

    //actualiza la nueva contrasena del usuario
    $("#modificar-clave").click(function () {
        password = $("#pass").val();
        confi_password = $("#pass_conf").val();
        var id_codigo_user = localStorage.getItem("id_user");
        var user_reset = localStorage.getItem("usuario_reset_clave");

        url_pass = api + "send-email/clave"
        var MyHeaders = new Headers({
            'Authorization': token
        });
        MyHeaders.append("Content-Type", "application/json",);
        raw = JSON.stringify({ "CLAVE": password, "USUARIO": user_reset, "COD_USUARIO": id_codigo_user, "COD_MODULO": 2, })
        var settings = {
            method: 'PUT',
            headers: MyHeaders,
            body: raw,
            redirect: 'follow'
        };
        valido= document.getElementById("campoOK").val 
        if(valido == ""){
            
        }
        if (password == confi_password ) {
            fetch(url_pass, settings)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                 
                    if (data) {
                        Swal.fire(
                            'Contraseña Actualizada!',
                            'favor iniciar sesión de nuevo.!',
                            'success'
                        )  
                    }
                    document.getElementById("clave").style.display = "none";
                    document.getElementById("login").style.display = "block";
                    document.getElementById("registro").style.display = "none";
                    document.getElementById("resetear-clave").style.display = "none";
                })
                .catch(function (err) {
                    console.log(err);
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡La Contraseña no Coinciden o no es Valida.!',
            })
        }

    });



});

