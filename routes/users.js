var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/new', function(req,res){
	res.render('newuser', { title: 'Add New User'});
});

router.get('/list', function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
		res.render('userlist', {
			"userlist" : docs
		});
	});
});


router.get('/:username/view', function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.findOne({username: req.param("username")}).on('success', function (doc){
		res.render('viewuser', { title: 'View User', user: doc});
	});
});

router.post('/adduser',function(req,res){
	// Set internal DB variable
	var db = req.db;


	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(req.body.userpass, salt, function(err, hash) {
	        // Store hash in your password DB.

	        // Get form values
	        var userName = req.body.username;
			var userEmail = req.body.useremail;
			var userPass = hash;

			// set collection
			var collection = db.get('usercollection');

			//Submit to the DB
			collection.insert({
				"username" : userName,
				"email" : userEmail,
				"enpass" : userPass
			}, function (err, doc) {
				if (err) {
					//If write to db failed, return error
					res.send("There was a problem adding the information to the database.");
				}
				else {
					// If successful, set the header so the address bar doesnt still say /adduser
					res.location("list");
					// and forward to success page
					res.redirect("list");
				}
			});

	    });
	});
});

module.exports = router;
