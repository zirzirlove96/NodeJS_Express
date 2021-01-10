var express =require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'jsonman'
});

connection.connect();

router.get('/list',(req,res)=>{
    res.render('movie.ejs');
});

router.get('/',(req,res)=>{
    var responseData = {}

    var query = connection.query('select title from movie',(err,rows)=>{
        if(err) throw err;
        if(rows.length){
            console.log(rows);
            responseData.result = 1;
            responseData.data=rows;
        }
        else{
            responseData.result = 0;
        }
        res.json(responseData);
    });
});

router.post('/',(req,res)=>{
    var title = req.body.title;
    var type = req.body.type;
    let grade = req.body.grade;
    var actor = req.body.actor;

    var sql = {title,type,grade,actor};
    var query = connection.query('insert into movie set ?',sql,(err,rows)=>{
        if(err) throw err;
        console.log(sql);
        res.json({'result':1});
    });
});

router.get('/:title',(req,res)=>{
    var title = req.params.title;

    var responseData = {}

    var query = connection.query('select * from movie where title = ?',[title],(err,rows)=>{
        if(err) throw err;
        if(rows[0]){
            console.log(rows);
            responseData.result=1
            responseData.data=rows;
        }
        else{
            responseData.result=0;
        }
        res.json(responseData);
    });
});

router.delete('/:title',(req,res)=>{
    var title = req.params.title;

    var responseData = {}

    var query = connection.query('delete from movie where title = ?',[title],(err,rows)=>{
        if(err) throw err;
        if(rows.affectedRows>0){
            console.log(rows);
            responseData.result=1
            responseData.data=title;
        }
        else{
            responseData.result=0;
        }
        res.json(responseData);
    });
});

module.exports = router;