var express = require('express');
var Dog = require('../models/dog');
var router = express.Router();
var test;

/* GET home page. */
router.get('/', function(req, res) {
    Dog.find( {'_id' : '5927d1ef688552ae648665ec'}, function(err, docs){
        console.log(docs);
        res.render('dogs/5927d1ef688552ae648665ec', {dog: docs, user : req.user })
    });
});

module.exports = router;

