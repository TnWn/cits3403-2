var express = require('express');
var Dog = require('../models/dog');
var router = express.Router();
var test;

/* GET home page. */
router.get('/', function(req, res) {
    Dog.find( {'_id' : '5927b9dd9321749530da4658'}, function(err, docs){
        console.log('__________________________________________');
        console.log(docs);
        res.render('dogs/5927b9dd9321749530da4658', {dog: docs, user : req.user })
    });
});

module.exports = router;

