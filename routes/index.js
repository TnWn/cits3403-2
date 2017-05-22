var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
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

router.get('/update', function(req, res) {
    res.render('update', { user: req.user });
});

router.put('/update', function(req, res) {
    Account.findById(req.params.id, function (err, account) {
        if(!account) { console.log("cannot find account"); }
        if(err) {
            res.status(500).send(err);
        } else {
            account.firstName = req.body.firstName || account.firstName;
            account.lastName = req.body.lastName || account.lastName;
            account.username = req.body.username || account.username;
            account.email = req.body.email || account.email;
            account.energy = req.body.energy || account.energy;
            account.confidence = req.body.confidence || account.confidence;
            account.focus = req.body.focus || account.focus;
            account.independence = req.body.independence || account.independence;

            account.save(function (err, account) {
                if(err) {
                    res.status(500).send(err);
                }
                res.send(account);
            });
        }
    });
});
        

router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
});

module.exports = router;

