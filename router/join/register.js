var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password: 'root',
    database : 'jsonman'
});

connection.connect();

router.get('/',(req,res)=>{
    var esg;
    var errMsg = req.flash('error');
    if(errMsg) msg=errMsg
    res.render('join.ejs', {'message':msg});
})

passport.use('local-join',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req,email,password,done){
    console.log('Success save');
    var query = connection.query('select * from user where email=?',[email],
    function(err,rows){
        if(err) throw done(err);
        if(rows.length){
            console.log('exsited info');
            return done(null,false,{message: 'your email is already used'});
        }
        else{
            console.log('insert db');
            var name = req.body.name;
            var sql = {email:email, name:name, pw:password};
            var query = connection.query('insert into user set ?',sql,function(err,rows){
                if(err) done(err);
                else done(null,{'email':email, 'userId':rows.insertId});
            })
        }
    })
}));

router.post('/',passport.authenticate('local-join',{
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true
}));

passport.serializeUser(function(user, done){
    done(null, user.userId);
});//user를 객체화

passport.deserializeUser(function(id,done){
    done(null, id);
})


module.exports = router;