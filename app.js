var express = require('express');
var body = require('body-parser');
var mysql = require('mysql');
var app = express();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
//var main = require('./router/main');
//var email = require('./router/email');
var index = require('./router/index');

app.listen(200, ()=>{
    console.log("nodeJs start!");
});

app.use(express.static("public"));
app.use(body.json());
app.use(body.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '/static')));
app.set('view engine','ejs');
//app.use('/main',main);
//app.use('/email',email);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(index);

var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password: 'root',
    database : 'jsonman'
});

connection.connect();


/*
app.post('/email_post',(req,res)=>{
    res.render('email.ejs', {'email':req.body.email});
});

app.post('/ajax_send_email',(req,res)=>{
    //var responseData = {'result': 'ok', 'email':req.body.email};
    //res.json(responseData);

    var email = req.body.email;
    var responseData = {}

    var query = connection.query('select name from user where email="'+email+'"',function(err,rows){
        if(err) throw err;
        if(rows[0]){
            console.log(rows);
            responseData.result='ok';
            responseData.name=rows[0].name;
        }
        else{
            console.log("This email contains db");
            responseData.result='none';
            responseData.name="";
        }
        res.json(responseData);
    });
});*/

