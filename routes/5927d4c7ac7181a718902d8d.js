var express = require('express');
var Dog = require('../models/dog');
var router = express.Router();
var test;

/* GET home page. */
router.get('/', function(req, res) {
    Dog.find( {'_id' : '5927d4c7ac7181a718902d8d'}, function(err, docs){
        console.log(docs);
        res.render('dogs/5927d4c7ac7181a718902d8d', {dog: docs, user : req.user })
    });
});

module.exports = router;

