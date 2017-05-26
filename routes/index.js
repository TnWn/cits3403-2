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
    res.render('register');
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
            console.log(err);
            return res.status(500).send('Validation Error. Please check your email address is correct. You may not have more than one account per email address');
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
    res.render('update', { user: req.user});
});

router.post('/update/:id', function(req, res) {
    Account.update({_id: req.user._id}, { firstName: req.body.firstName || req.user.firstName, 
                                          lastName: req.body.lastName || req.user.lastName,
                                          username: req.body.username || req.user.username,
                                          email: req.body.email || req.user.email,
                                          energy: req.body.energy || req.user.energy,
                                          confidence: req.body.confidence || req.user.confidence,
                                          focus: req.body.focus || req.user.focus,
                                          independence: req.body.independence || req.user.independence }, { runValidators: true }, function(err, account) {
        if(err) {
            console.log(err);
            return res.status(500).send('Email address not valid. Please go back and enter a valid email address.');
        }
        res.redirect('/');
    });
});

router.get('/changepass/:username', function(req, res) {
    res.render('changepass', { user: req.user, msg: null });
});

router.post('/changepass/:username', function(req, res) {
    Account.findByUsername(req.user.username).then(function(sanitizedUser) {
        if(sanitizedUser){
            if(req.body.password != req.body.confirmpassword) {
                res.status(500).send('Passwords do not match. Please go back and try again.');
            } else {
            sanitizedUser.setPassword(req.body.password, function(){
                sanitizedUser.save();
                res.redirect('/');
            }); }
        } else {
            res.status(500).json({message: 'This user does not exist'});
        }
    },function(err) {
        console.error(err);
    });
});
                    
router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
});

module.exports = router;

