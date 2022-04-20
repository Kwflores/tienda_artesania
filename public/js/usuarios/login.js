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
        if (username == "" || password == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Complete los campos vacios.!',
            })
            return;
        }
        var existe = false;


        url_login = api + "login"
        var MyHeaders = new Headers();
        MyHeaders.append("Content-Type", "application/json",);
        raw = JSON.stringify({ "NOM_USUARIO": username, "CLAVE": password, "COD_USUARIO": 1, "COD_MODULO": 9, })
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
                    //restablecer contrase;a
                    fetch(url_tokens, requestOptions)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data[0].length)
                            if (data[0].length == 0) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: '¡Usuario o Contraseña incorrecto.!',
                                })
                            } else {
                                hoy = new Date()
                                let dia = hoy.getDate();
                                let mes = hoy.getMonth() + 1;
                                let ano = hoy.getFullYear();
                                dia = ('0' + dia).slice(-2);
                                mes = ('0' + mes).slice(-2);
                                fecha_actual = ano + '-' + mes + '-' + dia

                                //console.log("Fecha Actual"+fecha_actual)
                                data[0].forEach(element => {
                                    fecha_vencimiento = element.FECHA_VENCIMIENTO

                                    console.log(fecha_vencimiento)
                                    tokens = element.TOKEN
                                    if (password = element.TOKEN && fecha_vencimiento >= fecha_actual) {

                                        Swal.fire(
                                            'Datos Correctos!',
                                            'Favor Modificar Contraseña, y volver a Iniciar Sesión!',
                                            'success'
                                        )


                                        localStorage.setItem('id_user', element.COD_USUARIO);
                                        localStorage.setItem('usuario_reset_clave', username)
                                        document.getElementById("clave").style.display = "block";
                                        document.getElementById("login").style.display = "none";
                                        document.getElementById("registro").style.display = "none";
                                        document.getElementById("resetear-clave").style.display = "none";
                                        password_login = $("#CLAVE").val();
                                        password_login = ""
                                    }
                                    else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: '¡El Codigo Proporcionado ya caduco.!',
                                        })
                                    }



                                });
                            }


                        })
                    return;
                }
                if (data != 0) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('id_usuario', data.cod_usuario);
                
                    localStorage.setItem('usuario', username);
                    localStorage.setItem('rol', data.rol);
                    localStorage.setItem("mostrar_modulo_usuario", 10);
                    localStorage.setItem("mostrar_moduloCategoria", 6);
                    rol_cliente = localStorage.getItem("rol_logeado")
                    rol_usuario = data.rol;

                    if (rol_usuario == 'CLIENTE') {
                        localStorage.setItem('tiendita', 1)
                        localStorage.removeItem("logeado")
                        document.getElementById("inicio_sesion").style.display = "none"
                        document.getElementById("tiendita").style.display = "block"
                        document.getElementById("cerrar_sesion").style.display = "block"
                        document.getElementById("iniciar_sesion").style.display = "none"
                        document.getElementById("bienvenido_usuario").style.display = "block"
                        document.frm_categoria.submit();
                        return;
                    }else{
                        localStorage.setItem('logeado', 1);
                        localStorage.removeItem("tiendita")
                        document.getElementById("dash").style.display = "block"
                        document.getElementById("tiendita").style.display = "none"
                        document.getElementById("inicio_sesion").style.display = "none";
                      
                    }
                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: 'BIENVENIDO, ',
                        html: username,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    document.frm_categoria.submit();
                    //consultar Roles de usuarios
                    var id_user = localStorage.getItem("id_usuario");
                    var token = localStorage.getItem("token");
                    var myHeader = new Headers({
                        'Authorization': token
                    });
                    url_roles = api + "roles";
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
                            data[0].forEach(rol => {

                                if (rol.COD_ROL == '4') {
                                    localStorage.setItem('rol_logeado', rol.NOM_ROL)
                                }


                            });
                        })
                        .catch(function (err) {
                            console.log(err);
                        });


                }
                else {
                    //consultar usuarios
                    var id_user = localStorage.getItem("id_usuario");
                    var token = localStorage.getItem("token");
                    var myHeader = new Headers({
                        'Authorization': token
                    });
                    url_usuarios = api + "usuarios";
                    myHeader.append("Content-Type", "application/json",);
                    var raw = JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 9, });
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
                                console.log(user);
                                sesion = sessionStorage.getItem('token');
                                localStorage.setItem("rol", user.Rol)
                                if (user.Usuario != username) {
                                    existe = true;
                                }
                            })

                            if (existe) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: '¡Usuario o Contraseña incorrecto.!',
                                })
                            }
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
        if (user == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Complete los campos vacios.!',
            })
        }
        var existe = false;
        url_reset_pass = api + "send-email/"
        var MyHeaders = new Headers({
            'Authorization': token
        });

        MyHeaders.append("Content-Type", "application/json",);
        raw = JSON.stringify({ "USUARIO": user, "COD_USUARIO": 1, "COD_MODULO": 9, })
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
        valido = document.getElementById("campoOK").textContent

        if (valido != "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe Proporcionar una contraseña valida.!',
            })
            return;
        }
        if (password == confi_password) {
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
    //registro de clientes 
    $("#registro-clientes").click(function () {
        cliente = $("#NOM_CLIENTE").val();
        correo = $("#CORREO").val();
        usuario = $("#USER").val();
        clave = $("#Password").val();
        confi_clave = $("#conf_pass").val();
        telefono = "0";
        valido = document.getElementById("campoOK").textContent

        if (valido != "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe Proporcionar un correo valid.!',
            })
            return;
        }
        valido = document.getElementById("campoOK").textContent

        if (valido != "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe Proporcionar una contraseña valida.!',
            })
            return;
        }
        if (cliente == "" || correo == "" || usuario == "" || clave == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Debe completar todo los campos.!',

            })
            return;
        }
        if (clave != confi_clave) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡La Contraseña no Coinciden o no es Valida.!',
            })
            return;
        }

        var settings = {
            "url": api + "clientes",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({ "NOM_PERSONA": cliente, "USER_EMAIL": correo, "NUM_CEL": 0, "NOM_USUARIO": usuario, "CLAVE": clave, "NOM_IDENTIFICACION": "NULL", "COD_IDENTIFICACION": "NULL", "DIRECCION": "NULL", "COD_ROL": 4, "COD_MODULO": 1 }),
        };
        $.ajax(settings).done(function (response) {
            if (response == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡No se Registro, Favor verificar los datos introducidos!',
                })
                return;
            }
            if (response.Message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Usuario ya Existe pruebe con otro!',
                })
                return;
            } else {
                Swal.fire(
                    'Registro Completo!',
                    'Se registro correctamente!',
                    'success'
                )
                document.getElementById("clave").style.display = "none";
                document.getElementById("login").style.display = "block";
                document.getElementById("registro").style.display = "none";
                document.getElementById("resetear-clave").style.display = "none";
            }

        });

    });

    $("#cerrar_sesion").click(function () {
        sessionStorage.removeItem('token');
        window.close()
        window.location.href = "/";


    })



});

