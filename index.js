// http://yeoman.io/generators/

// https://www.codementor.io/codementorteam/how-to-use-json-files-in-node-js-85hndqt32
const param 	= require("./param.json");

const fs		= require('fs');

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
 
const csvjson 	= require('csvjson');


var abbletonJSON = {};


console.log(param);


if(param.isDMX === true){
	const DMX 	= require('dmx');
	const A 	= DMX.Animation;

	var dmx 	= new DMX();
	var universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', '/dev/cu.usbserial-EN187701')
}



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

  return 'localhost';
}

// console.log( getIPAddress() );


var port 	= 3000;
var portOSC = 4000;

console.log("\n");
console.log("OSC~ listener running :  "+ clc.red("http://"+ getIPAddress() +":" + portOSC) );


app.use( express.static('public') )

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/public/index.html');
// });

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	// LORSQUE L'ON RECOIT UN « text message » 
	socket.on('text message', function(msg){
		io.emit('text message', msg);
		console.log('text message', msg);
	});


	// LORSQUE L'ON RECOIT UN « interface message » 
	socket.on("interface message", function(msg){
	
		if(msg.switchgrid === true){
			console.log("switch grid");
		}

		if(msg.refreshjson === true){

			console.log("refresh json");

			let data = fs.readFileSync('./public/assets/csv/conducteur-last.csv',{ encoding : 'utf8'});

			let options = {
				delimiter   : ",",
				quote: '"'
			}

			let jsondata = csvjson.toObject(data, options);

			jsondata = intify(jsondata, ['id','part','colonne','rang','width','height']);

			let json = JSON.stringify(jsondata);
			fs.writeFile('./public/assets/data/a-richer-dust.json', json, (error) => { /* handle error */ console.log("erreur json : ", error) });

		}

		io.emit('interface message', msg);
		console.log('interface message', msg);
	});


	// LORSQUE L'ON RECOIT UN « light message » 
	socket.on('light message', function(msg){
		// io.emit('light message', msg);
		console.log('light message', msg.value);

		if(param.isDMX === true){
			universe.update({1: msg.value, 2: 255})
		}
	});

	// LORSQUE L'ON RECOIT UN « osc message » 
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

// Pour envoyer les messages abbleton à intervale régulier
if(param.isAbbleton !== false){
	abbletonInterval = setInterval(abbletonSender, param.milliAbbleton);
}

function abbletonSender(){
	console.log("socket emit abbleton", abbletonJSON);

	io.emit('abbleton message', abbletonJSON);
}






// https://github.com/russellmcc/node-osc-min
// http://sonicbloom.net/en/livegrabber-to-sendreceive-osc-in-ableton-live/
/**
 * écoute des messages OSC arrivant sur le serveur
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
var sock = udp.createSocket("udp4", function(msg, rinfo) {
	var error;
	try {

		console.log("osc input",osc.fromBuffer(msg));

		let messageOSC = osc.fromBuffer(msg);

		// console.log("osc address",messageOSC.address);		
		

		// if( messageOSC.address.indexOf('/abbleton') !== -1){

		switch(osc.fromBuffer(msg).address){
			case '/abbleton/highfrequency' :
				// console.log( clc.blue('\thighfrequency') );
				abbletonJSON.highfrequency = osc.fromBuffer(msg).args[0].value;
			break;
			case '/abbleton/midfrequency' :
				// console.log( clc.blue('\tmidfrequency') );
				abbletonJSON.midfrequency = osc.fromBuffer(msg).args[0].value;
			break;
			case '/abbleton/lowfrequency' :
				// console.log( clc.blue('\tlowfrequency') );
				abbletonJSON.lowfrequency = osc.fromBuffer(msg).args[0].value;
			break;
			default:

			break;
		}

			// io.emit('abbleton message', messageOSC);
			// console.log('abbleton message');
		// }
		


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
	console.log("HTML server is :         "+clc.blue("http://"+ getIPAddress() +":"+ port) );
	console.log("ADMIN :                  "+clc.cyanBright("http://"+ getIPAddress() +":"+ port + "/admin.html") );
	console.log("TYPO  :                  "+clc.cyanBright("http://"+ getIPAddress() +":"+ port + "/index.html") );
});




// OSC OUTPUT 127.0.0.1:7000


function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}




function intify(obj, fields) {
	if (typeof(obj) == "undefined") return;
	var numFields = fields.length;
	for (var i = 0; i < numFields; i++) {
		var field = fields[i];
		if (typeof(obj[field]) != "undefined") {
			obj[field] = parseInt(obj[field], 10);
		}
	}
	return obj;
}
