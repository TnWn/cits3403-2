var express = require('express');
var Dog = require('../models/dog');
var router = express.Router();
var test;

/* GET home page. */
router.get('/', function(req, res) {
    Dog.find( {}, function(err, docs){
        res.render('matches', {dog: docs, user : req.user })
    });
});

module.exports = router;

