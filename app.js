// modules
var config       = require('config');
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var swig         = require('swig');
var session      = require('cookie-session');
var passport     = require('passport');

// routes
var home = require('./routes/home');
var auth = require('./routes/auth');
var user = require('./routes/user');

var app = express();

// env
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
app.engine('swig', swig.renderFile);
app.set('view cache', config.get('cache.view'));
swig.setDefaults({ cache: config.get('cache.view') });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: config.get('session.secret') }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', home);
app.use('/auth', auth);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

module.exports = app;
