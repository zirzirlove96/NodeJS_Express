var express = require('express');
var app = express()
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'jsonman'
});

connection.connect();


router.get('/', function(request, response){
    //response.sendFile(path.join(__dirname, '../public/join.html'));
    var msg;
    var errMsg = request.flash('error');
    if(errMsg) msg = errMsg;
    response.render('login.ejs', {'message': msg});
  });
  
  //session에 id값을 저장한다.
passport.serializeUser(function(user, done){
    console.log('passport session save : ',user.id);
    done(null, user.id);
});
  
  //session의 값을 뽑아서 전달하는 역할을 한다.
  //deserializeUser를 통해 id값이 user라는 객체에 저장된다.
passport.deserializeUser(function(id, done){
    done(null, id);
});
  
  //passport에 전략을 세운다음 router에 등록시켜줘야 한다.
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
      //console.log(password);
    console.log(email);
    console.log(password);
    var query = connection.query('select * from user where email=? and pw=?', [email, password],
    function(err, rows){
  
      if(err) throw done(err);
  
      if(rows.length){//로그인 정보가 있다면 처리
        console.log('existed user');
        return done(null, {'email':email, 'id':rows[0].userId});
      }else{//로그인 정보가 없을 때
        console.log('없음');
        return done(null, false, {'message': 'your login info is not found'});
        //router.post의 info인자에 message가 들어가게 된다.
      }
    });
  }
  ));
  
  //json응답을 주기 위해 custom callback 내장 콜백을 이용하면 된다.
  router.post('/', function(req, res, next){
    passport.authenticate('local-login', function(err,user,info){
      if(err) res.status(500).json(err);
      if(!user) return res.status(401).json(info.message);
  
      req.logIn(user, function(err){//req.logIn을 해야 정상적인 처리가 된다.
        if(err) {return next(err);}
        return res.json(user);
      });
    })(req, res, next);//authenticate가 이 인자들을 반환한다.
  });

module.exports=router;