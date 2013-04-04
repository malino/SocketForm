
var Client = function(server){
	this.io = require("socket.io").listen(server);
}

Client.prototype.createForm = function(config){
	this.io.sockets.on('connection', function(socket){
		
	})
}