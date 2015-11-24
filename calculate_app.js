var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var ejs = require('ejs');
var calc = require('./calculate.js');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3232);

app.get('/',function(req, res){
	var answer1 = 0;
	var answer2 = 0;
	var answer3 = 0;
	var answer4 = 0;
	ejs.renderFile('views/calculate.ejs', {answer1: answer1, answer2: answer2, answer3: answer3, answer4: answer4}, function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}});
});

app.post('/add',function(req, res){
	
	calc.Addition(function(results){
		
			/*console.log("answer:" + results);*/
			ejs.renderFile('views/calculate.ejs',{answer1 : results, answer2: 0, answer3: 0, answer4: 0 },
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		
	},req.param('a1'),req.param('b1'));
});

app.post('/subtract',function(req, res){
	calc.Subtraction(function(results){
		
			/*console.log("answer:" + results);*/
			ejs.renderFile('views/calculate.ejs',{answer2 : results, answer1: 0, answer3: 0, answer4: 0},
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		
	},req.param('a2'),req.param('b2'));
});

app.post('/multiply',function(req, res){
	calc.Multiplication(function(results){
		
			/*console.log("answer:" + results);*/
			ejs.renderFile('views/calculate.ejs',{answer3 : results, answer2: 0, answer1: 0, answer4: 0},
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		
	},req.param('a3'),req.param('b3'));
});

app.post('/divide',function(req, res){
	
	calc.Division(function(results){
		
			/*console.log("answer:" + results);*/
			ejs.renderFile('views/calculate.ejs',{answer4 : results, answer2: 0, answer3: 0, answer1: 0},
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		
	},req.param('a4'),req.param('b4'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
