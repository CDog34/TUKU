var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var conf=require("./conf");

var routes = require('./routes/index');
var debug = require('./routes/debug');
var ajax = require('./routes/ajax');
var view=require("./routes/viewPic");
var comment=require("./routes/comment");

var mongoose=require("mongoose");

mongoose.connect("mongodb://"+conf.db.host+"/"+conf.db.dbName,{
  user:conf.db.userName,
  pass:conf.db.passwd
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('*',function(req,res,next){
    res.header('X-Powered-By','TAT v0.3.1');
    if (app.get('env') != 'development'){
        res.header('Strict-Transport-Security','max-age=31536000; includeSubDomains');
    }
    next();
})
app.use("/s",express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/d', debug);
app.use('/a',ajax);
app.use('/v',view);
app.use('/c',comment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title:"服务器内部错误",
      message: err.message,
      error: err,
      meta:conf.siteMeta
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title:"服务器内部错误",
    message: err.message,
    error: {},
    meta:conf.siteMeta
  });
});


module.exports = app;
