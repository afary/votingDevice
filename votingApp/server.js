
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/votingapp', function(req, res){
  
  res.sendfile(__dirname + '/public/index.html');
});

app.listen(3003);

