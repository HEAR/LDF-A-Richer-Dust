$(function () {

	var chronometre;
	var startDate, pauseDate, prevDate;
	var pauseDuration = 0;
	var isPlaying = false;
	var isPaused;

	


	var socket = io();
	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	socket.on('chat message', function(msg){
		// $('#messages').append($('<li>').text(msg));
	});


	Papa.parse("assets/csv/a-richer-dust-conducteur.csv", {
		// delimiter: ",",
		download: true,
		header:true,
		complete: function(results){
			console.log(results);


			for(var i = 0; i< results.data.length; i++){

				console.log( timestamp(results.data[i].from) );

				let elem = $("<li>")
				.text( results.data[i].texte )
				.data("from", timestamp(results.data[i].from))
				.data("to", timestamp(results.data[i].to));

				elem.click(function(event){
					$(this).addClass("activated");
					console.log( $(this).data("from") , $(this).data("to") );

					socket.emit('chat message', $(this).text() );
				});

				$("#messages").append( elem );

			}
		}
	});

	


	/* CHRONOMETRE */

	$("#pause").hide();

	$("#play").click(function(){
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
	});
	
	$("#pause").click(function(){
		isPaused 		= true;
		pauseDate 		= new Date();
		$("#pause").hide();
		$("body").addClass("pause");
		$("#play").show();


		console.log( timestamp( $("#chrono").text() ) );

		sendOSC("/composition/tempocontroller/pause",1);
	});

	$("#stop").click(function(){
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
	});

	
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

});


function evenements(millis, socket){


	// console.log(millis);

	let time = millis.millis + millis.seconds *1000 + millis.minutes * 60000;

	$("#messages li").not(".activated").each(function(elem){
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
