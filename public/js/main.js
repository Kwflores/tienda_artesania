 
$(document).ready(function () {
    $("#registro").click(function () {
        var Frm_registro = document.forms["Frm_registro"];
        var contra = Frm_registro["pass"].value;
        var name_user = Frm_registro["name_user"].value;
        var usu = Frm_registro["user"].value;

        if (name_user == "" || usu == "" || contra == "") {
            alert("Porfavor completa los campos");
            return;
        }
        if (contra != $("#confi_pass").val()) {
            alert("Las contraseñas deben ser iguales");
            return;
        }
        var settings = {
            "url": "http://localhost:3000/usuarios/agregar",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({ "nombre": name_user, "usuario": usu, "clave": contra }),
        };

        $.ajax(settings).done(function (response) {
            if (response === '1') {
                alert("Se Registro Correctamente");
                document.getElementById("F_Registro").style.display = "none";
                document.getElementById("F_login").style.display = "block"

            } else {
                console.log(response);
            }
        });
    });



    $("#login").click(function () {
        username = $("#l_user").val();
        password = $("#l_pass").val();

        var settings = {
            "url": "http://localhost:3000/usuarios/login",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({ "user": username, "pass": password }),
        };

        $.ajax(settings).done(function (response) {
            if (response === '1') {


                document.getElementById("jugador").innerHTML = username;
                document.getElementById("jugador1").innerHTML = username;
                document.getElementById("contenido_login").style.display = "none";
                document.getElementById("sidebar").style.display = "block";
                document.getElementById("content").style.display = "block";
                usuario_logeado(username);
                // var form_login = document.forms["form_login"];
                // var username = form_login["l_user"].value;



            } else {
                alert("Usuario o Constraseña no coinciden");
                // console.log(response);
            }
        });


    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });



});


function motrarF_Registro() {
    document.getElementById("F_Registro").style.display = "block";

    document.getElementById("F_login").style.display = "none";
}

function sala_juego() {
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("jugador1").style.display = "block";
    document.getElementById("contador").style.display = "none";
    document.getElementById("juego").style.display = "none";
    document.getElementById("lista_jugadores").style.display = "block";
    document.getElementById("perfil_usuario").style.display = "none";
    document.getElementById("carrera").style.display = "none";

}

function retar_jugadores(id) {
    document.getElementById("contador").style.display = "block";
    document.getElementById("juego").style.display = "block";
    document.getElementById("perfil_usuario").style.display = "none";
    document.getElementById("lista_jugadores").style.display = "none";
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/usuarios", requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.forEach(user => {
                localStorage.setItem("Oponente", user.usuario);
            })
        })
        .catch(function (err) {
            console.log(err);
        });


}

function mostrar_miperfil() {
    document.getElementById("perfil_usuario").style.display = "block";
    document.getElementById("lista_jugadores").style.display = "none";
    document.getElementById("carrera").style.display = "none";

    document.getElementById("contador").style.display = "none";
    document.getElementById("juego").style.display = "none";
   
}

function actualizar_datos() {
    var Frm_actualizar = document.forms["Frm_actualizar"];
    var usu = Frm_actualizar["U_user"].value;
    var id_user = localStorage.getItem('Ususario_Logeado');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "id": id_user, "user": usu });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/usuarios/actualizar ", requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result == "1") {

                alert("Actualizacion exitosa, debe iniciar sesion de nuevo")
                window.location.href = "/";
            }
        })
        .catch(error => console.log('error', error));


}

function actualizar_contra() {
    var Frm_actualizar = document.forms["Frm_actualizar"];
    var contra = Frm_actualizar["U_pass"].value;
    var confi_contra = Frm_actualizar["conf_pass"].value;
    var id_user = localStorage.getItem('Ususario_Logeado');
    if (contra != confi_contra) {
        alert("Las contraseñas deben ser iguales");
        return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "id": id_user, "pass": contra });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/usuarios/actualizarcontra", requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result == "1") {
                alert("Actualizacion exitosa, debe iniciar sesion de nuevo")
                window.location.href = "/";
            }
        })
        .catch(error => console.log('error', error));


}


function usuarios() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };


    fetch("http://localhost:3000/usuarios", requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("respuesta de la api es ");
            console.log(data);

            var cuerpo = document.getElementById("jugadores");
            cuerpo.innerHTML = "";
            data.forEach(user => {
                var fila = document.createElement("tr");
                var celda_nombre = document.createElement("td");
                var celda_estado = document.createElement("td");
                var celda_retar = document.createElement("td");

                celda_nombre.innerHTML = user.usuario;
                var id = user.id;
                if (user.estado == 1) {
                    celda_estado.innerHTML = '<button type="button" class="btn btn-success", mx-2" style=" text-align: center;" >Linea</button>'
                    celda_retar.innerHTML = '<button type="button" class="btn btn-success", mx-2" style=" text-align: center;"onclick="retar_jugadores(' + id + ')">Reta</button>'

                } else {
                    celda_estado.innerHTML = '<button type="button" class="btn btn-danger", mx-2" style=" text-align: center;">Jugando</button>'
                }


                fila.appendChild(celda_nombre);
                fila.appendChild(celda_estado);
                fila.appendChild(celda_retar);


                cuerpo.appendChild(fila);


            })
        })
        .catch(function (err) {
            console.log(err);
        });
}

usuarios();

function usuario_logeado(user) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/usuarios", requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           
            data.forEach(usu => {
                localStorage.setItem("Ususario_Logeado", usu.id);
                if (usu.usuario == user) {
                    console.log(user);
                    localStorage.setItem("Ususario_Logeado", usu.id);
                }
            });
        })
        .catch(function (err) {
            console.log(err);
        });
}



function mostrar_carreras() {
    document.getElementById("carrera").style.display = "block";
    document.getElementById("perfil_usuario").style.display = "none";
    document.getElementById("lista_jugadores").style.display = "none";
    
    document.getElementById("contador").style.display = "none";
    document.getElementById("juego").style.display = "none";
}
