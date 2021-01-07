var express = require('express');
var app = express()
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password: 'root',
    database : 'jsonman'
});

connection.connect();

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/form.html"));
});

router.post('/form',(req,res)=>{
    res.render('email.ejs',{'email':req.body.email});
})

router.post('/ajax',(req,res)=>{
    var email = req.body.email;
    var responseData = {};

    var query = connection.query('select name from user where email="'+email+'"',(err,rows)=>{
        if(err) throw err
        if(rows[0]){
            responseData.result = 'ok';
            responseData.name=rows[0].name;
        }
        else{
            responseData.result = 'none';
            responseData.name='This name is not contains in the DB';
        }
    res.json(responseData);
    });

});



module.exports=router;