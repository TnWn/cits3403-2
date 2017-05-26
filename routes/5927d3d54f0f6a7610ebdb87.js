var express = require('express');
var Dog = require('../models/dog');
var router = express.Router();
var test;

/* GET home page. */
router.get('/', function(req, res) {
    Dog.find( {'_id' : '5927d3d54f0f6a7610ebdb87'}, function(err, docs){
        console.log(docs);
        res.render('dogs/5927d3d54f0f6a7610ebdb87', {dog: docs, user : req.user })
    });
});

module.exports = router;

