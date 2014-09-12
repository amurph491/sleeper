var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req,res){
	var db = req.db;
	var collection = db.get('nightcollection');
	collection.find({},{},function(e,docs){
		res.render('nightlist', {
			"nightlist" : docs
		});
	});
});

router.get('/:nid/up', function(req, res) {
	var db = req.db;
	var collection = db.get('nightcollection');
	var nid = req.param("nid");

	if(nid){
		var t = new Date().getTime();
		var temp = req.query.temp;
		var light = req.query.light;
		var sound = req.query.sound;
		collection.update(
			{_id : nid},
			{$push: {"measurements": {
						"timestamp" : t,
     					"temp" : temp,
     					"light": light,
     					"sound": sound
     				}
    			}
    		}
    	);
	}
	res.send();
});

router.get('/:nid/s', function(req, res) {
	var db = req.db;
	var collection = db.get('nightcollection');
	var nid = req.param("nid");

	collection.findById(nid, function(err, doc){
		res.send(doc);
	});
});

router.get('/:nid/view', function(req, res) {
	var db = req.db;
	var collection = db.get('nightcollection');

	var nid = req.param("nid");

	collection.findById(nid, function(err, doc) {
		console.log("doc=" + doc)
		res.render('viewmeasure', { title: 'View Measurement', doc: doc});
	})
});

router.get('/new', function(req, res){
	var collection = req.db.get('nightcollection');
	var week_id = "30";
	var user_id = "53f91adf5a980b0000e187bd";
	var doc = collection.insert({
		"week_id": week_id,
		"user_id" : user_id,
		"rating" : "0",
  		"measurements" : []
		});
	console.log(doc.query._id);
	// and forward to success page
	res.redirect('/m/' + doc.query._id + '/view');
});


module.exports = router;