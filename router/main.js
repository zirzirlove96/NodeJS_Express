var express = require('express')
var app = express()
var router = express.Router();
var path = require('path');

router.get("/",(req,res)=>{
    //serialize로 인해 객체를 사용할 수 있다.
    console.log(req.user);
    //res.sendFile(path.join(__dirname,'../public/main.html'));
    //serialize로 인해 id를 사용할 수 있다.
    //done(null, {id:user.userId})
    if(!req.user){
        res.render('index.ejs');
    }
    res.render('main.ejs',{'id':req.user});
});



module.exports = router;