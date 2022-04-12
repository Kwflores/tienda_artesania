const formidable = require('formidable');
const express = require('express');
var fs = require("fs");
const { redirect } = require('express/lib/response');
const app = express();



app.post('/', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(files)
        if(files.img.name){
            var pathTemp = files.img.path;
            var pathNew = __dirname + "../../public/img/categorias/" + files.img.name;
            fs.rename(pathTemp, pathNew, function (err) {
                if (err) throw err;
                res.redirect('/')
     
            });
        }else{
            res.redirect('/')
        }
         
    })
   
});



module.exports = app;
