var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
const redis = require('redis')
var session = require('express-session');

 
// create and connect redis client to local instance.
const client = redis.createClient({
    port: 6379, 
    host: 'localhost'
})
 
// echo redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err)
});

var RedisStore = require('connect-redis')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tweetsRouter = require('./routes/tweets');
var listsRouter = require('./routes/lists');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
  store               : new RedisStore({client: client}),
  secret              : 'twitter',
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000,
  cookie              : { secure: true }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//All Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);
app.use('/lists', listsRouter);

app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./passport')(passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
