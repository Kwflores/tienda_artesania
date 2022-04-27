var api = "http://31.220.108.62:3000/"
var id_user = localStorage.getItem("id_usuario");
var token = localStorage.getItem("token");
var user_logeado = localStorage.getItem("usuario");

function backup() {
    $("#contenido_backups").empty();
    var settings = {
        "url": api + "backup",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
        // "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 11 }),
    };

    $.ajax(settings).done(function (response) {
        if (response) {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var FECHA = date;
            var settings = {
                "url": api + "backup/nuevo",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json",
                    'Authorization': token
                },
                "data": JSON.stringify({ "RESPALDO": 'tienda_artesania' + FECHA + '.sql', "COD_USUARIO": id_user }),
            };
            $.ajax(settings).done(function (response) {
                if (response.message) {

                    Swal.fire(
                        'Copia de Seguridad Creado!',
                        'Se realizao la Copia de Segurida  con exito.!',
                        'success'
                    )

                }
                document.frm_categoria.submit();
                $('#table_backups').dataTable().fnDestroy();
                obtenercopias()
               

            });
        }




    });


}


function obtenercopias() {
    $("#contenido_roles").empty();
    var settings = {
        "url": api + "backup/consultar",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            'Authorization': token
        },
       // "data": JSON.stringify({ "NOM_USUARIO": user_logeado, "COD_USUARIO": id_user, "COD_MODULO": 11 }),
    };

    $.ajax(settings).done(function (response) {

      //  console.log(response);

        $.each(response[0], function (key, val) {
       //     console.log(val)
            fecha =  moment(val.FECHA_RESPALDO).format('DD-MM-YYYY')
            nombre = val.NOMBRE_RESPALDO
          //  console.log(nombre)
            descarga = '<a href="/public/respaldos/'+nombre+'"  class="btn btn-round btn-lg btn-icon-only btn-primary mx-2 mx-lg-3 mb-4"download="Copia_Seguridad.sql"><i class="fas fa-cloud-download-alt"> </a>'
            $("#contenido_backups").append("<tr><td>" + fecha + "</td><td>" + descarga +  "</td><td>" + val.NOM_USUARIO + "</td></tr>");
        });
        $('#table_backups').dataTable().fnDestroy();
        var table = $('#table_backups').DataTable({
            "bLengthChange": false,
            "bInfo": true,
            "pageLength": 5,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },

        });
    })
}

 
obtenercopias();