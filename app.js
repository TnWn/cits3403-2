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

/* MANUALLY ADD DOGS
var Dog = require('./models/dog');
var small = new Dog({
    name: 'testdog4',
    breed: 'bob',
    gender: 1, // (1) male, (0) female
    age: 1,
    size: 'bob',
    vaccination: 1,
    desex: 1,
    deworm: 1,
    heartworm: 1,
    location: 'bob',
    Phone: 'bob',
    email: 'bob',
    password: 'bob',
    energy: 4,
    confidence: 4,
    focus: 4,
    independence: 4,
});
small.save(function (err) {
    if (err) return handleError(err);
    console.log('SAVED');
})
*/

module.exports = app;
