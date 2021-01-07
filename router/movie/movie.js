var express =require('express');
var app = express();
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('movie.ejs');
});

module.exports = router;