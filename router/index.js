var express=require('express')
var app = express()
var router = express.Router()

var email = require('./email');
var main = require('./main');
var join = require('./join/register');
var login = require('./login/login');
var logout = require('./logout/logout');
var index = require('./index/index');
var movie = require('./movie/movie');

router.use('/email',email);
router.use('/main',main);
router.use('/join',join);
router.use('/login',login);
router.use('/logout',logout);
router.use('/index',index);
router.use('/movie',movie);

module.exports = router;