var express = require('express');
var bcrypt = require('bcrypt');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req,res){
	res.render('helloworld',{ title: 'Hello, world!'})
});


module.exports = router;
