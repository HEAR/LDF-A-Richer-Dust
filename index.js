// https://socket.io/get-started/chat/
// https://github.com/russellmcc/node-osc-min

const express 	= require('express')
const app  		= require('express')();

const http 		= require('http').Server(app);
const io   		= require('socket.io')(http);

const osc 		= require('osc-min');
const udp 		= require('dgram');



// https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js#8440736
function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    	// console.log(alias, alias.adress);
    }
  }

  return '0.0.0.0';
}

// console.log( getIPAddress() );


var port 	= 3000;
var portOSC = 4000;


console.log("~ OSC listener running at http://"+ getIPAddress() +":" + portOSC)


app.use( express.static('public') )

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/public/index.html');
// });

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});


// https://github.com/russellmcc/node-osc-min
var sock = udp.createSocket("udp4", function(msg, rinfo) {
	var error;
	try {
		
		io.emit('chat message', osc.fromBuffer(msg));


		return console.log(osc.fromBuffer(msg));
	} catch (error1) {
		error = error1;
		return console.log("invalid OSC packet");
	}
});



sock.bind(portOSC);


http.listen(port, function(){
	console.log('listening on *:'+port);
});


