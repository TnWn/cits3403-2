var express = require('express');
var Dog = require('../models/dog');
var router = express.Router();
var test;

/* GET home page. */
router.get('/', function(req, res) {
    Dog.find( {'_id' : '5927d59e593185accc037b2f'}, function(err, docs){
        console.log(docs);
        res.render('dogs/5927d59e593185accc037b2f', {dog: docs, user : req.user })
    });
});

module.exports = router;


