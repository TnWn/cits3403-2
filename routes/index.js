var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Dog = require('../models/dog');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ firstName : req.body.firstName,
                                   lastName : req.body.lastName,
                                   username : req.body.username,
                                   email : req.body.email,
                                   energy: req.body.energy,
                                   confidence : req.body.confidence,
                                   focus : req.body.focus,
                                   independence : req.body.independence }), req.body.password, function(err, account) {
        if(err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/user', function(req, res) {
    res.render('user', { user : req.user });
});

router.get('/update/:id', function(req, res) {
    res.render('update', { user: req.user });
});

router.post('/update/:id', function(req, res) {
    Account.findOne({_id: req.session.passport.user.id}, {
        username: req.body.username
    }, function(err) {
        if(err) console.log(err);
        res.redirect('/');
    });
});
                    
router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
});

module.exports = router;

