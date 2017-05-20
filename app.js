var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;

var index = require('./routes/index');
var about = require('./routes/about');
var login = require('./routes/login');
var register = require('./routes/register');

var app = express();

// MongoDB setup
mongo.connect('mongodb://admin:password@ds143081.mlab.com:43081/cits3403-project', function(err, database) {
    if(err) throw err
    db = database
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/about', about);
app.use('/login', login);
app.use('/register', register);

// Add new user to MongoDB from the register page
app.post('/register', function(req, res) {
    db.collection('users').save(req.body, function(err) {
        if(err) throw err
        
        console.log('saved to database')
        res.redirect('/')
    })
})

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

//app.listen(3000) leads to nodemon errors?
app.listen(8080)

module.exports = app;
