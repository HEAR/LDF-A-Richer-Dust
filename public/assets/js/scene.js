
var typoToAnim;
var animOnfreq;
var lastUpdatedVariant;


function loadPrototypo(email,password, fontName, fontVariant, sock){

	console.log("loadPrototypo ok");

	
	console.log(email,password);

	// Permet de récupérer les projets d'un compte prototypo
	window['prototypo-projects'].getProjects(email, password).then(function (fonts) {

		// console.log("fonts",fonts);

	    // Recherche la famille dans la liste de projets
	    var family = fonts.find(function (font) {
	    	console.log(font);

	        return font.name === fontName; //'test-richer-dust';
	    });
	    // Recherche la variante dans les variantes de la famille
	    var variantRegular = family && family.variants.find(function (variant) {
	        return variant.name === "Regular"; //'Regular';
	    });

	    // var variantThin = family && family.variants.find(function (variant) {
	    //     return variant.name === "Thin";
	    // });

	    var variantBold = family && family.variants.find(function (variant) {
	        return variant.name === "Bold";
	    });

	    var variantSlanted = family && family.variants.find(function (variant) {
	        return variant.name === "Slanted";
	    });

	    // var variantSerif = family && family.variants.find(function (variant) {
	    //     return variant.name === "Serif";
	    // });

	    var variantLarge = family && family.variants.find(function (variant) {
	        return variant.name === "Large";
	    });

	    // Récupère les valeurs nécessaires à initialiser la police
		var template 		= family.template;

		var valuesRegular   = variantRegular.values;
		// var valuesThin	    = variantThin.values;
		var valuesBold	    = variantBold.values;
		var valuesSlanted   = variantSlanted.values;
		// var valuesSerif	    = variantSerif.values;
		var valuesLarge	    = variantLarge.values;

		console.log("valuesRegular",valuesRegular);


	    // var ptypoFont;
	    var ptypoFontRegular/*, ptypoFontThin*/, ptypoFontBold, ptypoFontSlanted/*, ptypoFontSerif*/, ptypoFontLarge;

	 	// unique subset
	 	// var nonUnique = "ababdefegg";
		// var unique = nonUnique.split('').filter(function(item, i, ar){ return ar.indexOf(item) === i; }).join('');


	 	const prototypoFontFactory = new Ptypo.default('b1f4fb23-7784-456e-840b-f37f5a647b1c');

	 	prototypoFontFactory
	 	.init(undefined, undefined, 'https://e4jpj60rk8.execute-api.eu-west-1.amazonaws.com/prod/fonts/')
	 	.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Regular', Ptypo.templateNames.GROTESK, true)
			.then(function (font) {
				ptypoFontRegular = font;
				// console.log("font", font);
				ptypoFontRegular.changeParams(valuesRegular);
			})
			.catch(error => console.log(error));

		})
/*		.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Thin', Ptypo.templateNames.GROTESK, true)
			.then(function (font) {
				ptypoFontThin = font;
				// console.log("font", font);
				ptypoFontThin.changeParams(valuesThin);
			})
			.catch(error => console.log(error));

		})*/
		.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Bold', Ptypo.templateNames.GROTESK, true)
			.then(function (font) {
				ptypoFontBold = font;
				// console.log("font", font);
				ptypoFontBold.changeParams(valuesBold);
			})
			.catch(error => console.log(error));

		})
		.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Slanted', Ptypo.templateNames.GROTESK, true)
			.then(function (font) {
				ptypoFontSlanted = font;
				// console.log("font", font);
				ptypoFontSlanted.changeParams(valuesSlanted);
			})
			.catch(error => console.log(error));

		})
/*		.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Serif', Ptypo.templateNames.GROTESK, true)
			.then(function (font) {
				ptypoFontSerif = font;
				// console.log("font", font);
				ptypoFontSerif.changeParams(valuesSerif);
			})
			.catch(error => console.log(error));

		})*/
		.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Large', Ptypo.templateNames.GROTESK, true)
			.then(function (font) {
				ptypoFontLarge = font;
				// console.log("font", font);
				ptypoFontLarge.changeParams(valuesLarge);
			})
			.catch(error => console.log(error));

		})
		.then(function () {

			createCSSSelector('.regular', 	'font-family:"a-richer-dust-Regular"');
			// createCSSSelector('.thin', 		'font-family:"a-richer-dust-Thin"');
			createCSSSelector('.bold', 		'font-family:"a-richer-dust-Bold"');
			createCSSSelector('.slanted', 	'font-family:"a-richer-dust-Slanted"');
			// createCSSSelector('.serif', 	'font-family:"a-richer-dust-Serif"');
			createCSSSelector('.large', 	'font-family:"a-richer-dust-Large"');

			sock.emit('prototypo message', {
				prototypoReady:true
			} );

			//console.log("TEXTE", uniqueText( $('.ableton').text() ) );

			//ptypoFontBold.changeParam('thickness', 300, uniqueText( $('.ableton').text() ));

			var thickness, prevThickness;
			var typoInitiated = false;

			function resetFonts(){

				switch(lastUpdatedVariant){
					case "regular" :
						thicknessRegular 	= valuesRegular.thickness;
						ptypoFontRegular.changeParam('thickness', thicknessBold, uniqueText( $('.ableton').text() ));
					break;

					case "bold" :
						thicknessBold 		= valuesBold.thickness;
						ptypoFontBold.changeParam('thickness', thicknessBold, uniqueText( $('.ableton').text() ));
					break;

					case "slanted" :
						slant 				= valuesSlanted.slant;
						ptypoFontSlanted.changeParam('slant', slant, uniqueText( $('.ableton').text() ));
					break;

					case "large" :
						width 				= valuesLarge.width;
						ptypoFontLarge.changeParam('width', width, uniqueText( $('.ableton').text() ));
					break;


				}
				
				// thicknessThin 		= valuesThin.thickness;
				// serifWidth 			= valuesSerif.serifWidth;
				
				// ptypoFontThin.changeParam('thickness', thicknessThin);
				// ptypoFontSerif.changeParam('serifWidth', serifWidth);
				
		    }

			sock.on('ableton message', function(msg){

				// bold 		125 		>	 	140 		>	 180				=> thickness
				// thin 		115 		>	 	 62 		>	  35.14				=> thickness
				// slanted		  0 		>	 	 13 		>	  30				=> slant
				// serif		 45.42		>	 	112.33 		>	 166				=> serifWidth
				// large 		  1 		>	 	  1.8 		>	   2.7				=> width

				// console.log(msg);
				// console.log(msg.args[0].value * 2000000);
				// $('#bloc1').text( msg.text );	

				// let thickness = 50 + msg.highfrequency * 110;
				// let width = 0.5 + msg.highfrequency * 1.5;
				// 
				// 
				// 
				
				if(typoToAnim !== false && animOnfreq !== false){

					switch(typoToAnim){

						case "regular" :
							thicknessRegular	= remap(msg[animOnfreq].val, msg[animOnfreq].min, msg[animOnfreq].max, 125, 180);
							ptypoFontRegular.changeParam('thickness', thicknessBold , uniqueText( $('.ableton').text() ));
						break;

						case "bold" :
							// thicknessBold		= remap(msg[animOnfreq].val, msg[animOnfreq].min, msg[animOnfreq].max, 125, 180);
							thicknessBold		= remap(msg[animOnfreq].val, msg[animOnfreq].seuilMin, msg[animOnfreq].seuilMax, 125, 180);

							ptypoFontBold.changeParam('thickness', thicknessBold , uniqueText( $('.ableton').text() ));
						break;

						// case "thin" :
						// 	thicknessThin 		= remap(msg[animOnfreq].val, msg[animOnfreq].min, msg[animOnfreq].max, 115, 62);
						// 	ptypoFontThin.changeParam('thickness', thicknessThin, uniqueText( $('.ableton').text() ));
						// break;

						case "slanted" :
							slant 		  		= remap(msg[animOnfreq].val, msg[animOnfreq].min, msg[animOnfreq].max, 0, 30);
							ptypoFontSlanted.changeParam('slant', slant ,uniqueText( $('.ableton').text() ));
						break;

						// case "serif" :
						// 	serifWidth 	  		= remap(msg[animOnfreq].val, msg[animOnfreq].min, msg[animOnfreq].max, 45.42, 166);
						// 	ptypoFontSerif.changeParam('serifWidth', serifWidth, uniqueText( $('.ableton').text() ));
						// break;

						case "large" :
							width 		  		= remap(msg[animOnfreq].val, msg[animOnfreq].min, msg[animOnfreq].max, 1, 2.7);
							ptypoFontLarge.changeParam('width', width , uniqueText( $('.ableton').text() ));
						break;
					}

					lastUpdatedVariant = typoToAnim;
					typoInitiated = true;
				}else{

					if(typoInitiated === true){
						resetFonts();

						typoInitiated = false;
					}
				}

				// console.log(msg.param);
			});

		})
		.catch(error => console.log(error));
			
	});	
}




$(function () {
	const socket = io();

	const nbrColonnes = 24;
	const nbrLignes = 12;

	const pasX = 1920/nbrColonnes;
	const pasY = 720/nbrLignes;

	console.log(pasX, pasY);

	socket.emit('prototypo message', {
		prototypoReady:false
	} );

	
	socket.on('text message', function(msg){

		console.log(msg);

		// $('#bloc1').text( msg.text );	

		let delayValue = 0;
		let couleurValue = "blanc";

		typoToAnim = false;
		animOnfreq = false;

		for(var i = 0; i < msg.param.params.length; i++){

			// console.log("action", msg.param.params[i].action );

			if(msg.param.params[i].action == "delay"){
				delayValue = msg.param.params[i].value;
			}

			if(msg.param.params[i].action == "couleur"){
				couleurValue = msg.param.params[i].value;
			}

			if(msg.param.params[i].action == "typo"){
				let temp = msg.param.params[i].value.split("|");

				typoToAnim = temp[0];
				animOnfreq = temp[1];

				// alert(typoToAnim + " :: " + animOnfreq);
			}

		}

		switch(couleurValue){
			case "blanc" :
				var command = "/composition/layers/1/clips/1/connect";
				sendOSC( command ,1);
			break;

			case "noir" :
				var command = "/composition/layers/1/clips/2/connect";
				sendOSC( command ,1);
			break;

			case "rouge" :
				var command = "/composition/layers/1/clips/3/connect";
				sendOSC( command ,1);
			break;

			default:
				var command = "/composition/layers/1/clips/1/connect";
				sendOSC( command ,1);
			break;
		}


		console.log("delayValue",delayValue);

		// on réinitialise les classes
		$( msg.param.target )
		.attr("class","");


		if(delayValue > 0){
			$( msg.param.target )
			.addClass("delay")
			.css("animation-delay", delayValue+"s");
		}else{
			$( msg.param.target )
			.css("animation-delay", "0s");
		}

		$( msg.param.target )
			.html(msg.text)
			.addClass("message")
			.addClass("ableton")
			.addClass(msg.param.classes)
			.css("left", msg.param.colonne * pasX )
			.css("top", msg.param.rang * pasY)
			.css("width", msg.param.width * pasX )
			.css("height", msg.param.height * pasY)
			.css("display", "flex");

	});

	socket.on('generique message', function(msg){

		console.log(msg);

		$(".message")
			.html("")
			.removeClassStartingWith("size")
			.css("left",0)
			.css("top",0)
			.css("width",0)
			.css("height",0)
			.css("animation-delay", "0s")
			.css("display","none");


		$("#generiqueContainer").load("generique.html #generique", function(){


			$("#generiqueContainer")
			.attr("style","")
			.addClass("fadeIn");

		})
	});


	socket.on('clear message', function(msg){

		console.log(msg);

		// $('#bloc1').text( msg.text );	
		
		var liste = msg.param.blocs.split(",");

		console.log(liste);

		if( liste.indexOf("all") != -1 || msg.param.blocs == ""){ // !!!!!!!!! VERIFIER
			$(".message")
				.html("")
				.removeClassStartingWith("size")
				.css("left",0)
				.css("top",0)
				.css("width",0)
				.css("height",0)
				.css("animation-delay", "0s")
				.css("display","none");

			$("#generiqueContainer").empty();
		}else{

			liste.forEach(function(element) {
				$("#"+element)
					.html("")
					.removeClassStartingWith("size")
					.css("left",0)
					.css("top",0)
					.css("width",0)
					.css("height",0)
					.css("animation-delay", "0s")
					.css("display","none");
			});

			$("#generiqueContainer").empty();
		}

	});



	socket.on('interface message', function(msg){

		if(msg.switchgrid === true){
			$("body").toggleClass("callage");
		}

		if(msg.cleargrid === true){
			$("#scene div")
			.html("")
			.css("display","none")
			.not("#generiqueContainer")
			.attr("class", "message");
		}

		console.log(msg);
		
	});


	/* JUSTE POUR LE TEST */
	// socket.on('ableton message', function(msg){

	// 	// console.log(msg);
	// 	console.log("ableton", msg.highfrequency * 20000 );//msg.args[0].value * 2000000);

	// 	$(".ableton").css("font-size", msg.highfrequency * 200000 );

	// 	// $('#bloc1').text( msg.text );	
	// 	// ptypoFontRegular.changeParam('thickness', (2 * 1000000 * msg.args[0].value), $('.scene').text());
	// 	// console.log(msg.param);
	// });

	// CHARGEMENT DU CODE PROTOTYPO
	// en fonction des paramètres dans param.json (copie de param-sample.json) 
	jQuery.getJSON( "param.json", function( data ) {  

		console.log('ok json AJAX');

		console.log("data",data);

		var email       = data.prototypoEmail;
		var password    = data.prototypoPassword;
		var fontName    = data.fontName;
		var fontVariant = data.fontVariant;


		loadPrototypo(email, password, fontName, fontVariant, socket);

	});


	/**
	 * Pour envoyer une commande OSC au socket
	 * @param  {[type]} command [description]
	 * @param  {[type]} value   [description]
	 * @return {[type]}         [description]
	 */
	function sendOSC(command,value){
		// /composition/layers/1/clips/1/connect
		// /composition/layers/1/clips/4/connect

		socket.emit('osc message', {
			path: command,
			val : value
		});
	}	

});


/**
 * [removeClassStartingWith description]
 * https://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard#5182103
 * @param  {[type]} filter [description]
 * @return {[type]}        [description]
 */
$.fn.removeClassStartingWith = function (filter) {
    $(this).removeClass(function (index, className) {
        return (className.match(new RegExp("\\S*" + filter + "\\S*", 'g')) || []).join(' ')
    });
    return this;
};


/**
 * [createCSSSelector description]
 * @param  {[type]} selector [description]
 * @param  {[type]} style    [description]
 * @return {[type]}          [description]
 */
function createCSSSelector (selector, style) {
	if (!document.styleSheets) return;
	if (document.getElementsByTagName('head').length == 0) return;

	var styleSheet,mediaType;

	if (document.styleSheets.length > 0) {
		for (var i = 0, l = document.styleSheets.length; i < l; i++) {
			if (document.styleSheets[i].disabled) 
				continue;
			var media = document.styleSheets[i].media;
			mediaType = typeof media;

			if (mediaType === 'string') {
				if (media === '' || (media.indexOf('screen') !== -1)) {
					styleSheet = document.styleSheets[i];
				}
			}
			else if (mediaType=='object') {
				if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
					styleSheet = document.styleSheets[i];
				}
			}

			if (typeof styleSheet !== 'undefined') 
				break;
		}
	}

	if (typeof styleSheet === 'undefined') {
		var styleSheetElement = document.createElement('style');
		styleSheetElement.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

		for (i = 0; i < document.styleSheets.length; i++) {
			if (document.styleSheets[i].disabled) {
				continue;
			}
			styleSheet = document.styleSheets[i];
		}

		mediaType = typeof styleSheet.media;
	}

	if (mediaType === 'string') {
		for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
			if(styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase()==selector.toLowerCase()) {
				styleSheet.rules[i].style.cssText = style;
				return;
			}
		}
		styleSheet.addRule(selector,style);
	}
	else if (mediaType === 'object') {
		var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
		for (var i = 0; i < styleSheetLength; i++) {
			if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
				styleSheet.cssRules[i].style.cssText = style;
				return;
			}
		}
		styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
	}
}


/**
 * [remap description]
 * https://stackoverflow.com/questions/20910091/recreating-the-processing-map-function-in-javascript
 * ou
 * https://stackoverflow.com/questions/5649803/remap-or-map-function-in-javascript#5650012
 * @param  {[type]} value  [description]
 * @param  {[type]} start1 [description]
 * @param  {[type]} stop1  [description]
 * @param  {[type]} start2 [description]
 * @param  {[type]} stop2  [description]
 * @return {[type]}        [description]
 */
function remap(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}


function uniqueText(txt){
	return txt.split('').filter(function(item, i, ar){ return ar.indexOf(item) === i; }).join('');
}


/*

PROTOTYPO REGULAR Values

_contrast: -1
_contrastExtremity: -0.9333333333333333
_scThickness: 0.9
_scWidth: 0.7
aperture: 1.078076923076923
apertureBottom: 1
apertureTop: 1.1017094017094016
ascender: 230
capDelta: 223.076923076923
crossbar: 1
curviness: 0.6
descender: -250
diacriticHeight: 82.6346153846154
midWidth: 1
opticThickness: 0.9469230769230769
overshoot: 8.923076923076922
serifArc: 0
serifBall: 1
serifCurve: -1
serifHeight: 5
serifMedian: 1
serifRotate: 0
serifRoundness: 1
serifTerminal: 0
serifTerminalCurve: 1
serifWidth: 0.01
slant: 0
smallCapDelta: 1
spacing: 0
spurHeight: 0
thickness: 115.69230769230771
width: 1
xHeight: 493.8461538461539

*/