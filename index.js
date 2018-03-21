// http://yeoman.io/generators/

// https://socket.io/get-started/chat/
// https://github.com/russellmcc/node-osc-min

// https://expressjs.com/en/starter/generator.html (not used)
// http://expressjs.com/en/starter/hello-world.html
const express 	= require('express')
const app  		= require('express')();

const http 		= require('http').Server(app);
const io   		= require('socket.io')(http);

const osc 		= require('osc-min');
const udp 		= require('dgram');

// https://www.npmjs.com/package/cli-color
const clc 		= require('cli-color');
// console.log(clc.red('Text in red'));
 

var DMX = require('dmx');
var A = DMX.Animation;

var dmx = new DMX();
var universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', '/dev/cu.usbserial-EN187701')



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


console.log("~ OSC listener running : "+ clc.red("http://"+ getIPAddress() +":" + portOSC) );


app.use( express.static('public') )

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/public/index.html');
// });

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('text message', function(msg){
		io.emit('text message', msg);
		console.log('text message', msg);
	});

	socket.on('light message', function(msg){
		// io.emit('light message', msg);
		console.log('light message', msg.value);

		universe.update({1: msg.value, 2: 255})
	});

	socket.on('osc message', function(msg){
		console.log(msg)
		// io.emit('chat message', msg);

		// https://github.com/russellmcc/node-osc-mi
		// https://stackoverflow.com/questions/12438744/node-js-to-osc-via-udp
		// https://resolume.com/manual/en/r4/controlling#open_sound_control_osc


		oscMsg = osc.toBuffer({
			address: msg.path,
				args: [
				{
					type: "integer",
					value: msg.val
				}
			]
		});

		client.send( oscMsg, 0, oscMsg.length, 7000, "127.0.0.1", function(err, bytes) {
			console.log("err : " + err + " | bytes : " + bytes + " | Message : " + oscMsg);
		});
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



// https://stackoverflow.com/questions/12438744/node-js-to-osc-via-udp
var message = new Buffer("5656"); // Whatever the number could be...
var client = udp.createSocket("udp4");

client.on("error", function (err) {

	console.log("Socket error: " + err);

});

// At every second, send a message...
// setInterval(function(){
// 	client.send(message, 0, message.length, 1337, "127.0.0.1", function(err, bytes) {
// 		console.log("err : " + err + " | bytes : " + bytes + " | Message : " + message);
// 	});
// }, 1000);




sock.bind(portOSC);


http.listen(port, function(){
	console.log("HTML server is :         "+clc.cyan("http://"+ getIPAddress() +":"+ port) );
	console.log("ADMIN :                  "+clc.cyanBright("http://"+ getIPAddress() +":"+ port + "/admin.html") );
	console.log("TYPO  :                  "+clc.cyanBright("http://"+ getIPAddress() +":"+ port + "/index.html") );
});





// OSC OUTPUT 127.0.0.1:7000
