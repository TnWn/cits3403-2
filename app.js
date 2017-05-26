var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mongo = require('mongodb').MongoClient;

var index = require('./routes/index');
var about = require('./routes/about');
var login = require('./routes/login');
var register = require('./routes/register');
var user = require('./routes/user');
var matches = require('./routes/matches');
var update = require('./routes/update');
var dog1 = require('./routes/5927b9dd9321749530da4658');
var dog2 = require('./routes/5927cdb446d8f07c903c8c38');
var dog3 = require('./routes/5927d09a62baeb9cf83f9ffe');
var dog4 = require('./routes/5927d1ef688552ae648665ec');
var dog5 = require('./routes/5927d3d54f0f6a7610ebdb87');
var dog6 = require('./routes/5927d418a0f8159e24807502');
var dog7 = require('./routes/5927d46af64644aeac5d2b3f');
var dog8 = require('./routes/5927d4c7ac7181a718902d8d');
var dog9 = require('./routes/5927d521f6ba43ae9079719e');
var dog10 = require('./routes/5927d558a48c8a27acf16467');
var dog11 = require('./routes/5927d59e593185accc037b2f');


var changepass = require('./routes/changepass');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/about', about);
app.use('/login', login);
app.use('/register', register);
app.use('/user', user);
app.use('/matches', matches);
app.use('/update', update);
app.use('/dogs/5927b9dd9321749530da4658', dog1);
app.use('/dogs/5927cdb446d8f07c903c8c38', dog2);
app.use('/dogs/5927d09a62baeb9cf83f9ffe', dog3);
app.use('/dogs/5927d1ef688552ae648665ec', dog4);
app.use('/dogs/5927d3d54f0f6a7610ebdb87', dog5);
app.use('/dogs/5927d418a0f8159e24807502', dog6);
app.use('/dogs/5927d46af64644aeac5d2b3f', dog7);
app.use('/dogs/5927d4c7ac7181a718902d8d', dog8);
app.use('/dogs/5927d521f6ba43ae9079719e', dog9);
app.use('/dogs/5927d558a48c8a27acf16467', dog10);
app.use('/dogs/5927d59e593185accc037b2f', dog11);


app.use('/changepass', changepass);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:password@ds143081.mlab.com:43081/cits3403-project');
//mongoose.connect('mongodb://admin:password@ds143081.mlab.com:43081/21503781');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* manual function to add a dog to the db
var Dog = require('./models/dog');
var addDog = new Dog({
    name: '',
    breed: '',
    gender: , // (1) male, (0) female
    age: , //years
    size: '',    //small, medium, large
    vaccination: , //boolean true false
    desex: ,
    deworm: ,
    heartworm: ,
    location: '',
    Phone: '',
    email: '',
    energy: ,
    confidence: ,
    focus: ,
    independence: ,
});
addDog.save(function (err) {
    if (err) return handleError(err);
    console.log('Added new dog');
})
*/

module.exports = app;
