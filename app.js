
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , io = require('socket.io')
  , check = require('validator').check
  , sanitize = require('validator').sanitize
  , path = require('path');

var app = express();
var server = http.createServer(app);

app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require("socket.io").listen(server)

io.sockets.on('connection', function (socket) {
  
  socket.on('initialization', function(names){
    for (i=0; i<names.length; i++){
      socket.on(names[i], function(data){
        try {
          eval(data.fn);
          socket.volatile.emit(data.name + 'Response', {res: data.successMessage} )
        } catch (e) {
          if(e.message!==null){
            socket.volatile.emit(data.name+ 'Response', {res: e.message} )
          }
        }
      });
    }
  })
});
