$(function () {

	var chronometre;
	var startDate, pauseDate, prevDate;
	var pauseDuration = 0;
	var isPlaying = false;
	var isPaused;

	var shortcuts = new Array();


	var dataConducteur;

	var light = {
		value:0
	};



	var socket = io();
	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	socket.on('chat message', function(msg){
		// $('#messages').append($('<li>').text(msg));
	});


	$.ajax({
		url: "assets/data/a-richer-dust-conducteur.json",
		// beforeSend: function( xhr ) {
		// 	xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
		// }
	})
	.done(function( data ) {

		dataConducteur = data;
		
		for(var i = 0; i< data.length; i++){

			// console.log( timestamp(data[i].from) );

			let elem;

			switch(data[i].type){

				case "part" :

					elem = $("<li>")
						.text( data[i].texte )
						.data("from", timestamp(data[i].from))
						.data("to", timestamp(data[i].to))
						.data("id", data[i].part) ;

					elem.click(function(event){

						loadPart( $(this).data("id") );

						$(this).addClass("activated");
					});

					$("#parties").append( elem );

				break;

				default :
					// RIEN
				break;
			}
		}
	});


	$("body").keyup(function(event){
		// console.log(event.key, shortcuts);

		// console.log(shortcuts.hasOwnProperty(event.key));

		if( shortcuts.hasOwnProperty(event.key) ){
			console.log("raccourci trouvé => " + shortcuts[event.key] );

			jump( shortcuts[event.key] );
		}else{
			console.log("pas de raccourci");
		}
	});


	/* CHRONOMETRE */

	$("#pause").hide();

	$("#play").click( function(){
		play();
	});
	
	$("#pause").click( function(){
		pause();
	});

	$("#stop").click( function(){
		stop();
	});


	function play(){
		if(isPlaying === false){
			startDate = new Date();
			chronometre = setInterval(function(){ myTimer() }, 1000/25);
		}
		isPaused = false;
		isPlaying = true;
		$("#pause").show();
		$("body").removeClass("pause");
		$("#play").hide();

		sendOSC("/composition/tempocontroller/pause",0);
	}

	function pause(){
		isPaused 		= true;
		pauseDate 		= new Date();
		$("#pause").hide();
		$("body").addClass("pause");
		$("#play").show();


		console.log( timestamp( $("#chrono").text() ) );

		sendOSC("/composition/tempocontroller/pause",1);
	}

	function switchPlayState(){
		
	}

	
	function myTimer() {
	    let currentDate = new Date();
	    if(isPaused === true){
	    	pauseDuration += currentDate - prevDate;
	    }
	    if(isPaused !== true){
		    d =  getDuration( currentDate - startDate - pauseDuration);
		    $("#chrono").html( timecode(d) );

		    evenements( d, socket );
		}
	    prevDate = new Date();
	}

	function stop(){
		isPaused		= true;
		isPlaying 		= false;
		pauseDuration 	= 0;
		clearInterval( chronometre );
		$("#chrono").html( '<span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>.<span class="millis">000</span>' );
		$("#pause").hide();
		$("body").removeClass("pause");
		$("#play").show();
		$("#messages li").removeClass('activated').removeClass('stacked');

		socket.emit('chat message', "");

		sendOSC("/composition/tempocontroller/pause",1);
	}

	/**
	 * 
	 * fonction pour gérer les sautes lorsque l'on clique sur un raccourci clavier
	 * 
	 **/
	function jump(millis){

		console.log("jump",millis, "pauseDuration", pauseDuration);


		let wasPaused = isPaused ? true : false;

		if(isPaused !== false){
			play();
		}

		console.log(wasPaused);

		pauseDuration = 0;
		let now = new Date();
		startDate = new Date(now.getTime() - millis);

		if(wasPaused === false){
			pause();
		}
	}



	function sendOSC(command,value){
		// /composition/layers/1/clips/1/connect
		// /composition/layers/1/clips/4/connect

		socket.emit('osc message', {
			path: command,
			val : value
		});
	}	

	$("#clip1").click(function(){
		sendOSC("/composition/layers/1/clips/1/connect",1);
	})

	$("#clip2").click(function(){
		sendOSC("/composition/layers/1/clips/4/connect",1);
	})

	var testID = 0;

	$("#tests").click(function(){

		testID = (testID +1)%60 +1;

		console.log("/composition/layers/2/clips/"+testID+"/connect");

		sendOSC("/composition/layers/2/clips/"+testID+"/connect",1);
	})


	/**
	 *
	 *
	 */
	function loadPart(_id){

		$("#messages").empty();
		$("#videos").empty();
		$("#lights").empty();


		console.log( "PARTIE n°"+ _id );

		// console.log(dataConducteur);

		shortcuts = new Object();

		// shortcuts.a = "test";


		for(var i = 0; i< dataConducteur.length; i++){

			if(dataConducteur[i].part == _id){

				// console.log( timestamp(dataConducteur[i].from) );
				// console.log(dataConducteur[i].type);
				let elem;

				switch(dataConducteur[i].type){

					case "text" :
						elem = $("<li>")
							.text( dataConducteur[i].texte )
							.data("from", timestamp(dataConducteur[i].from))
							.data("to", timestamp(dataConducteur[i].to))
							.data("param", {
								target 	: dataConducteur[i].target,
								colonne : dataConducteur[i].colonne,
								rang 	: dataConducteur[i].rang,
								width 	: dataConducteur[i].width,
								height 	: dataConducteur[i].height,
							}) ;

						elem.click(function(event){
							$(this).addClass("activated");
							console.log( $(this).data("from") , $(this).data("to") );

							socket.emit('text message', {
								text:$(this).text(), 
								param:$(this).data("param")
							} );
						});

						$("#messages").append( elem );

					break;

					case "video" :

						var picture = "part-" + dataConducteur[i].part + "-" + dataConducteur[i].movie + ".jpg";

						// console.log("icone : " ,picture);



						elem = $("<li>")
							.html( "<img src='assets/images/" + picture + "'>" )
							.data("from", timestamp(dataConducteur[i].from))
							.data("to", timestamp(dataConducteur[i].to))
							.data("movie", dataConducteur[i].movie)
							.data("part",dataConducteur[i].part);


						elem.click(function(event){
							$(this).addClass("activated");
							console.log( $(this).data("from") , $(this).data("to") );

							var command = "/composition/layers/" + $(this).data("part") +"/clips/"+ $(this).data("movie") + "/connect";

							sendOSC( command ,1);

							socket.emit('text message', {
								text:$(this).text(), 
								param:$(this).data("param")
							} );
						});

						$("#videos").append( elem );

					break;

					case "light" :

						elem = $("<li>")
							.text( dataConducteur[i].texte )
							.data("from", timestamp(dataConducteur[i].from))
							.data("to", timestamp(dataConducteur[i].to))
							.data("param", {
								target 	: dataConducteur[i].target,
								from : dataConducteur[i].param.from,
								to 	: dataConducteur[i].param.to
							}) ;

						// https://jsfiddle.net/mcLecfud/7/
						// https://github.com/tweenjs/tween.js
						elem.click(function(event){
							$(this).addClass("activated");
							console.log( $(this).data("param").from , $(this).data("param").to );


							var tween = new TWEEN.Tween(light) // Create a new tween that modifies 'light'.
								.to({
									value: $(this).data("param").to
								}, 1000) // Move to (300, 200) in 1 second.
								.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
								.onUpdate(function() { // Called after tween.js updates 'coords'.
									console.log(light.value);

									socket.emit('light message', {
										value: light.value
									});
								})
								.start();

							// socket.emit('light message', {
							// 	text:$(this).text(),
							// 	param:{ from :$(this).data("param").from , to : $(this).data("param").to }
							// });
						});

						$("#lights").append( elem );


					break;


					case "key" :

						// console.log( "raccourci", dataConducteur[i].param, timestamp(dataConducteur[i].from) );

						shortcuts[ dataConducteur[i].param ] = timestamp(dataConducteur[i].from);

					break;

					default :


					break;
				}
			}
		}
	}	// fin loadPart

});



function evenements(millis, socket){


	// console.log(millis);

	let time = millis.millis + millis.seconds *1000 + millis.minutes * 60000;

	$("#flux li").not(".activated").each(function(elem){
		// console.log( $(this) )
		if( $(this).data("from")!= false && $(this).data("from") <= time ){
			// console.log( $(this).data("from") );
			$(this).addClass("stacked");

			// socket.emit('chat message', $(this).text() );
		}
	});

}


/**
 * timecode function
 * pour renvoyer le code HTML afin de formater le timecode
 */
function timecode(millis){
	return "<span class='hours'>"+formatNumberLength(millis.hours,2)+"</span>:<span class='minutes'>"+formatNumberLength(millis.minutes,2)+"</span>:<span class='seconds'>"+formatNumberLength(millis.seconds,2)+"</span>.<span class='millis'>"+formatNumberLength(millis.millis,3)+"</span>";
}

/**
 * getDuration function
 * pour renvoyer un objet convertissant un timestamp en millisecondes en J/H/M/S/m
 * cf https://stackoverflow.com/questions/175554/ how-to-convert-milliseconds-into-human-readable-form
 */
function getDuration(millis){
    let dur = {};
    let units = [
        {label:"millis",    mod:1000},
        {label:"seconds",   mod:60},
        {label:"minutes",   mod:60},
        {label:"hours",     mod:24},
        {label:"days",      mod:31}
    ];
    // calculate the individual unit values...
    units.forEach(function(u){
        millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
    });
    // convert object to a string representation...
    let nonZero = function(u){ return dur[u.label]; };
    dur.toString = function(){
        return units
            .reverse()
            .filter(nonZero)
            .map(function(u){
                return dur[u.label] + " " + (dur[u.label]==1?u.label.slice(0,-1):u.label);
            })
            .join(', ');
    };
    return dur;
};


/**
 * formatNumberLength function
 * pour écrire un nombre avec un zéro initial
 * cf https://stackoverflow.com/questions/1127905/how-can-i-format-an-integer-to-a-specific-length-in-javascript
 */
function formatNumberLength(num, length) {
    let r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

/**
 * timestamp function
 * pour convertire un timecode en millisecondes
 */
function timestamp(timecode){

	let t = timecode.split(":");

	if(timecode !== ""){
		return ( parseInt(t[0])*3600 + parseInt(t[1])*60 + parseInt(t[2]) ) * 1000;
	}else{
		return false;
	}
}


/**
 * setup the animation loop.
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);


