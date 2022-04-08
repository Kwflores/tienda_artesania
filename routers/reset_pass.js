const express = require('express');
const conexion = require("mysql");

const crypto = require("crypto");
const nodemailer = require('nodemailer');
const { time } = require('console');
const { DATETIME2 } = require('mysql/lib/protocol/constants/types');

const app = express();



require('dotenv').config();

//Conexion a la base de datos
var conn = conexion.createConnection(
    {
        host: process.env.SERVER,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DB,
    }
);
app.post('/token', (req, res) => {
    try {
        const { CLAVE } = req.body;
        const consulta = `call OBTENER_TOKEN('${CLAVE}')`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results);
            }
        })
    } catch (error) {
        res.send("0")
    }
        
});


// Registro actualizar datos de usuarios
app.put('/clave', (req, res) => {
    try {
        const { CLAVE, NOM_USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call ACTUALIZAR_CLAVE('${CLAVE}','${NOM_USUARIO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, error => {
            if (error) throw error;
            res.json({Message:"Actualizacion de Clave por medio del nombre de usuario"});
        });
    } catch (error) {
        res.send("0");

    }

});

app.post('/', (req, res) => {

    try {
        const { USUARIO, COD_USUARIO, COD_MODULO } = req.body;
        const consulta = `call BUSCAR_USUARIOS('${USUARIO}',${COD_USUARIO},${COD_MODULO})`;
        conn.query(consulta, (error, results) => {
            if (error) throw error;
            if (results[0][0]) {
                if (results[0][0].Usuario === USUARIO) {
                    var TOKEN = crypto.randomBytes(4).toString("hex");
                    var USUARIO_ID = results[0][0].COD_USUARIO
                    console.log(results[0][0]);
                    var today = new Date();
                    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var FECHA = date + ' ' + time;
                    const consulta = `call 	CLAVE_TEMPORAL('${TOKEN}','${FECHA}','${USUARIO}',${USUARIO_ID},${COD_MODULO})`;
                    conn.query(consulta, (error, results) => {

                    })
                    const contenidohtml = `
                    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                    <head><META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW"><META NAME="referrer" CONTENT="no-referrer">
                    <!--[if gte mso 9]><xml>  <o:OfficeDocumentSettings>   <o:AllowPNG/>   <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings> </xml><![endif]-->
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <meta name="format-detection" content="telephone=no">
                    <meta name="format-detection" content="date=no">
                    <meta name="format-detection" content="address=no">
                    <meta name="format-detection" content="email=no">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="x-apple-disable-message-reformatting">
                    <title>Tienda Artesania Bendición</title>
                    <!--[if mso]>  <style type="text/css">  body, table, td, h1, h2, h3, a, span {font-family: Helvetica, Arial, sans-serif !important;}  </style>  <![endif]-->
                    <style type="text/css">
                    u + #body a {
                        color: #4C7AF1;
                        text-decoration: none;
                        font-size: inherit;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                    }
                       @media only screen and (max-width: 480px) {
                       div > u + #body .stylingblock-content-wrapper.camarker-inner {padding:0px 16px !important;}
                      div > u + #body .stylingblock-content-wrapper.camarker-inner table {min-width:100% !important;}}
                    </style>
                    <style type="text/css">
                    /*Font Settings*/
                     
                     
                    ReadMsgBody{ width: 100%;}
                    .ExternalClass {width: 100%;}
                    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
                    body {-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;margin:0 !important;}
                    * {padding: 0px;margin: 0px;}
                    html {-webkit-text-size-adjust: none;-webkit-font-smoothing: antialiased;}
                    a {outline: 0;}
                    img {display: block;outline:0;}
                    a img {border:none;}
                    /*td {mso-line-height-rule: exactly;}*/
                    table td {border-collapse: collapse;}
                    a[x-apple-data-detectors] {
                     color: #4C7AF1 !important;
                     text-decoration: none !important;
                     font-size: inherit !important;
                     font-family: inherit !important;
                     font-weight: inherit !important;
                     line-height: inherit !important;
                    }
                    /**Template CSS**/
                    /* TYPOGRAPHY */
                    h1 {
                     font-family: 'Circular', Helvetica, Arial, sans-serif;
                     font-weight: bold;
                     font-size:32px;
                     line-height: 48px;
                     color:#2E3543;} 
                    h2 {
                     font-family: 'Circular', Helvetica, Arial, sans-serif;
                     font-weight: bold;
                     font-size:24px;
                     line-height: 32px;
                     color:#2E3543;} 
                    h3 {
                     font-family: 'Inter', Helvetica, Arial, sans-serif;
                     font-weight: bold;
                     font-size:18px;
                     line-height: 24px;
                     color:#2E3543;}
                     
                    td, p, li {
                     font-family: 'Inter', Helvetica, Arial, sans-serif;
                     font-weight: normal;
                     font-size:16px;
                     line-height: 24px;
                     color:#60657B;}
                    a {
                     font-family: 'Inter', Helvetica, Arial, sans-serif;
                     font-weight: normal;
                     font-size:16px;
                     line-height: 24px;
                     color:#4C7AF1;
                     text-decoration:none;}
                    .cta {
                     font-family: 'Inter', Helvetica, Arial, sans-serif;
                     font-weight: normal;
                     font-size:18px;
                     line-height: 24px;
                     color:#ffffff;}
                    
                    </style>
                    <style type="text/css">
                    @media only screen and (max-width: 480px) {
                    /*CB STYLES*/
                     .container {width: 100% !important;}
                     .footer { width:auto !important; margin-left:0; }
                     .mobile-hidden { display:none !important; }
                     .logo { display:block !important; padding:0 !important; }
                     img { max-width:100% !important; height:auto !important; max-height:auto !important;}
                     .header img{max-width:100% !important;height:auto !important; max-height:auto !important;}
                     .photo img { width:100% !important; max-width:100% !important; height:auto !important;}
                     .drop { display:block !important; width: 100% !important; float:left; clear:both;}
                     .footerlogo { display:block !important; width: 100% !important; padding-top:15px; float:left; clear:both;}
                     .nav4, .nav5, .nav6 { display: none !important; }
                     .tableBlock {width:100% !important;}
                     .responsive-td {width:100% !important; display:block !important; padding:0 !important; }
                     .fluid, .fluid-centered {
                       width: 100% !important;
                       max-width: 100% !important;
                       height: auto !important;
                       margin-left: auto !important;
                       margin-right: auto !important;
                     }
                     .fluid-centered {
                       margin-left: auto !important;
                       margin-right: auto !important;
                     }
                     * { -webkit-text-size-adjust: none; -ms-text-size-adjust: none; -webkit-font-smoothing: antialiased;}/*Stop iproducts from auto-resizing text*/
                     .height {height:auto !important;}
                     .hide {display:none !important;}
                     .stack  {display:block !important;width:100% !important;}
                     .w100P {width:100% !important; height:auto !important;}
                     .blockOnly {display:block !important;}
                     .w95P {width:95% !important;}
                     .textC {text-align:center !important;}
                     .stylingblock-content-wrapper.camarker-inner {padding:0px 16px !important;}
                     .sp4024 {height:24px !important;line-height:24px !important;font-size:24px !important;}
                      }
                     .sp4032 {height:32px !important;line-height:32px !important;font-size:32px !important;}
                      }
                        </style>
                    </head>
                    
                    <body id="body" bgcolor="#f4f5fb" style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; -webkit-font-smoothing: antialiased; padding:0;"><style type="text/css">
                    div.preheader 
                    { display: none !important; } 
                    </style>
                    <div class="preheader" style="font-size: 1px; display: none !important;">Tienda de Artesania la Bendición</div>
                        <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" bgcolor="#f4f5fb">
                            <tr>
                                <td align="center" valign="top">
                                    <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" bgcolor="#f4f5fb" class="container" style="margin:0 auto;">
                                        <tr>
                                            <td valign="top">
                    
                                             <!--Body-->
                                             <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                             <td height="23" style="mso-line-height-rule: exactly;line-height:23px; font-size:23px;">&nbsp;</td>
                        </tr>
                    </table>  
                        <tr>
                             <td height="23" style="mso-line-height-rule: exactly;line-height:23px; font-size:23px;">&nbsp;</td>
                        </tr>
                    </table><table cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; min-width: 100%; " class="stylingblock-content-wrapper"><tr><td style="padding: 0px; " class="stylingblock-content-wrapper camarker-inner"><table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                             <td style="mso-line-height-rule: exactly;line-height:32px; font-size:32px;" height="32" bgcolor="#ffffff">&nbsp;</td>
                        </tr>
                    </table></td></tr></table> <table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                             <td style="mso-line-height-rule: exactly;line-height:32px; font-size:32px;" height="32" bgcolor="#ffffff">&nbsp;</td>
                        </tr>
                    </table></td></tr></table><table cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; min-width: 100%; " class="stylingblock-content-wrapper"><tr><td style="padding: 0px 60px; " class="stylingblock-content-wrapper camarker-inner"><h1 style="text-align: center;mso-line-height-rule: exactly;font-family: 'Circular', Helvetica, Arial, sans-serif;  font-weight: bold;  font-size:32px;  line-height: 48px;  color:#2E3543;margin:0px;">
                        Recuperación de Contraseña por Email</h1></td></tr></table><table cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; min-width: 100%; " class="stylingblock-content-wrapper"><tr><td style="padding: 0px; " class="stylingblock-content-wrapper camarker-inner"><table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                             <td style="mso-line-height-rule: exactly;line-height:32px; font-size:32px;" height="32" bgcolor="#ffffff">&nbsp;</td>
                        </tr>
                    </table></td></tr></table><table cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; min-width: 100%; " class="stylingblock-content-wrapper"><tr><td style="padding: 0px 80px; " class="stylingblock-content-wrapper camarker-inner">Estimado Usuario ${results[0][0].Usuario}, recien a solicitado recuperar su contraseña por este medio, por lo tanto se le proporciona el siguiente codigo de recuperacion: ${TOKEN} <br> con el cual debera hacer login ingresando su nombre de usuario y codigo proporcionado.<br><br>
                                              
                                              Si Usted no a solicitado restablecer contraseña haga caso omiso a este correo.! <br><br>
                                              Saludos Atte. <br> Tienda de Artesania la Bendición </td></tr></table><table cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; min-width: 100%; " class="stylingblock-content-wrapper"><tr><td style="padding: 0px; " class="stylingblock-content-wrapper camarker-inner"><table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                             <td style="mso-line-height-rule: exactly;line-height:32px; font-size:32px;" height="32" bgcolor="#ffffff">&nbsp;</td>
                        </tr>
                    </table></td></tr></table><table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff">
                            <tr>
                             <td align="center" class="stylingblock-content-wrapper">
                              <table cellpadding="0" cellspacing="0" border="0" width="300" class="w95P">
                                <tr>
                               <td align="center" style="-webkit-border-radius: 25px; -moz-border-radius: 25px; border-radius: 25px;" bgcolor="#15C39A"><a href="https://click.send.grammarly.com/?qs=bc8ade9243115a16b9c1b3e3ecbe20c29ee7315c983540556c752a7d753ae7dc578dd628d48678e390290240c180fa54" target="_blank" style="font-size: 18px; font-family:'Inter', Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; -webkit-border-radius: 25px; -moz-border-radius: 25px; border-radius: 25px; padding: 10px 12px; border: 1px solid #15C39A; display: inline-block;font-weight:normal;width:300px;" class="cta">Click para ir a la Tienda</a>
                                 
                               </td>
                                </tr>
                              </table>
                               <br><br>
                             </td>
                            </tr>
                           </table> <br> 
                                         
                        
                         
                      `;
    
                        res.json({ message: 'Contraseña enviada al Correo' });
                        async function correo() {
    
                            let transportador = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'artesaniafuentedebendicion@gmail.com',
                                    pass: 'Matematicas1234'
                                }
                            });

    
                            let respuesta = await transportador.sendMail({
                                from: 'Artesania Fuente de Bendicion <artesaniafuentedebendicion@gmail.com>',
                                to: results[0][0].Correo,
                                subject: "Recuperacion de Contraseña - ARTESANIA FUENTA DE BENDICION",
                                html: contenidohtml,
                            });
    
    
                            console.log("Correo enviado en texto html: %s", respuesta.messageId);
    
    
                        }
                        correo().catch(console.error)

                }
            }else {
                res.send("0")
        }
        })
    } catch (error) {
        res.send("0")
    }

});

 

module.exports = app;

