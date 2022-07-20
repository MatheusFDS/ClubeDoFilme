var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookies = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var logMiddlware = require('./middlewares/logSite');
var methodOverride = require('method-override');
const loggedUserDataMiddleware = require('./middlewares/loggedUserDataMiddleware')

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');



var app = express();

// view engine setup
app.use(session({
  secret: "senhamuitosecreta",
  resave: false,
  saveUninitialized: false,
}));



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookies());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(logMiddlware);
app.use(loggedUserDataMiddleware);
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
