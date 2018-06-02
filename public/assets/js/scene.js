


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

	    var variantThin = family && family.variants.find(function (variant) {
	        return variant.name === "Thin";
	    });

	    var variantBold = family && family.variants.find(function (variant) {
	        return variant.name === "Bold";
	    });

	    var variantSlanted = family && family.variants.find(function (variant) {
	        return variant.name === "Slanted";
	    });

	    var variantSerif = family && family.variants.find(function (variant) {
	        return variant.name === "Serif";
	    });

	    var variantLarge = family && family.variants.find(function (variant) {
	        return variant.name === "Large";
	    });

	    // Récupère les valeurs nécessaires à initialiser la police
		var template 		= family.template;

		var valuesRegular   = variantRegular.values;
		var valuesThin	    = variantThin.values;
		var valuesBold	    = variantBold.values;
		var valuesSlanted   = variantSlanted.values;
		var valuesSerif	    = variantSerif.values;
		var valuesLarge	    = variantLarge.values;


	    // var ptypoFont;
	    var ptypoFontRegular, ptypoFontThin, ptypoFontBold, ptypoFontSlanted, ptypoFontSerif, ptypoFontLarge;


	 	// unique subset
	 	// var nonUnique = "ababdefegg";
		// var unique = nonUnique.split('').filter(function(item, i, ar){ return ar.indexOf(item) === i; }).join('');


	 	const prototypoFontFactory = new Ptypo.default('b1f4fb23-7784-456e-840b-f37f5a647b1c');

	 	prototypoFontFactory
	 	.init(undefined, undefined, 'https://e4jpj60rk8.execute-api.eu-west-1.amazonaws.com/prod/fonts/')
	 	.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Regular', Ptypo.templateNames.GROTESK)
			.then(function (font) {
				// console.log("font", font);
				font.changeParams(valuesRegular);
			})
			.catch(error => console.log(error));

		})
		.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Thin', Ptypo.templateNames.GROTESK)
			.then(function (font) {
				// console.log("font", font);
				font.changeParams(valuesThin);
			})
			.catch(error => console.log(error));

		})
		.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Bold', Ptypo.templateNames.GROTESK)
			.then(function (font) {
				// console.log("font", font);
				font.changeParams(valuesBold);
			})
			.catch(error => console.log(error));

		})
		.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Slanted', Ptypo.templateNames.GROTESK)
			.then(function (font) {
				// console.log("font", font);
				font.changeParams(valuesSlanted);
			})
			.catch(error => console.log(error));

		})
		.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Serif', Ptypo.templateNames.GROTESK)
			.then(function (font) {
				// console.log("font", font);
				font.changeParams(valuesSerif);
			})
			.catch(error => console.log(error));

		})
		.then(function () {
		//All the code using the prototypoFontFactory should be done there

			return prototypoFontFactory
			.createFont('a-richer-dust-Large', Ptypo.templateNames.GROTESK)
			.then(function (font) {
				// console.log("font", font);
				font.changeParams(valuesLarge);
			})
			.catch(error => console.log(error));

		})
		.then(function () {

			createCSSSelector('.regular', 	'font-family:"a-richer-dust-Regular"');
			createCSSSelector('.thin', 		'font-family:"a-richer-dust-Thin"');
			createCSSSelector('.bold', 		'font-family:"a-richer-dust-Bold"');
			createCSSSelector('.slanted', 	'font-family:"a-richer-dust-Slanted"');
			createCSSSelector('.serif', 	'font-family:"a-richer-dust-Serif"');
			createCSSSelector('.large', 	'font-family:"a-richer-dust-Large"');

			sock.emit('prototypo message', {
				prototypoReady:true
			} );


			sock.on('abbleton message', function(msg){

				// console.log(msg);
				console.log(msg.args[0].value * 2000000);
				// $('#bloc1').text( msg.text );	
				ptypoFontRegular.changeParam('thickness', (2 * 1000000 * msg.args[0].value), $('.scene').text());
				// console.log(msg.param);
			});

		})
		.catch(error => console.log(error));
				


	    // // Deux évènements de tests lancés va des boutons sur la page et récupérés en jquery
	    // $('.js-button-changeparam').on('click', function(){
	    //     // Changement de paramètre simple de la thickness vers 200, en utilisant le texte de la page comme subset
	    //     ptypoFont.changeParam('thickness', 200, $('.text p').text());
	    // });


	    // $('.js-button-tween').on('click', function(){
	    //     // Anime la width vers 1.4 sur 10 étapes pendant 0.3 secondes en utilisant le texte de la page comme subset
	    //     ptypoFont.tween('width', 1.4, 10, 0.3, function(){}, $('.text p').text());
	    // });

	   
	});


	//--------------------- Librairie Prototypo ---------------------//

	// createFont(fontName, fontTemplate)
	// crée une fonte 'fontName' utilisable en CSS via une balise font-family en utilisant le template 'fontTemplate'


	// ptypofont.changeParam(paramName, paramValue, subset)
	// Change le paramètre 'paramname' de la font 'ptypofont' en lui donnant la valeur 'paramValue';
	// Possibilité de limiter les caractères modifiés en donnant un 'subset' : chaîne de caractères, pas besoin que ça soit unique

	// ptypofont.changeParams(paramObj, subset)
	// Change les paramètres de la font 'ptypofont' selon l'objet de paramètres donné
	// {'thickness': 110, 'width': 1}
	// Possibilité de limiter les caractères modifiés en donnant un 'subset' : chaîne de caractères, pas besoin que ça soit unique


	// ptypofont.tween(paramName, paramValue, steps, aDuration, cb, subset)
	// Anime la fonte 'ptypofont' pendant 'aDuration' secondes en faisant varier 'steps' fois le 'paramName' jusqu'à 'paramValue'
	// Renvoie 'cb' (fonction) quand terminé
	// Possibilité de limiter les caractères modifiés en donnant un 'subset' : chaîne de caractères, pas besoin que ça soit unique

	// ptypofont.getArrayBuffer()
	// Renvoie l'arrayBufer de la font 'ptypofont'

	// ptypofont.reset(subset)
	// Réinitialise la font 'ptypofont' en lui redonnant les valeurs du template de base
	// Possibilité de limiter les caractères modifiés en donnant un 'subset' : chaîne de caractères, pas besoin que ça soit unique
	// 

	

}



// window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
//                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


// var start = null;

// var d = document.getElementById("scene");

// function step(timestamp) {
// 	var progress;
// 	if (start === null) start = timestamp;
// 	progress = timestamp - start;
// 	d.style.left = Math.min(progress/10, 200) + "px";
	
// 	if (progress < 2000) {
// 		requestAnimationFrame(step);
// 	}
// }



// requestAnimationFrame(step);


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
		for(var i = 0; i < msg.param.params.length; i++){

			console.log("action", msg.param.params[i].action );

			if(msg.param.params[i].action == "delay"){
				delayValue = msg.param.params[i].value;
			}
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
			.text(msg.text)
			.addClass("message")
			.addClass(msg.param.classes)
			.css("left", msg.param.colonne * pasX )
			.css("top", msg.param.rang * pasY)
			.css("width", msg.param.width * pasX )
			.css("height", msg.param.height * pasY)
			.css("display", "block");

	});

	socket.on('generique message', function(msg){

		console.log(msg);

		$(".message")
			.text("")
			.removeClassStartingWith("size")
			.css("left",0)
			.css("top",0)
			.css("width",0)
			.css("height",0)
			.css("animation-delay", "0s")
			.css("display","none");


		$(".generique").load("generique.html #generique", function(){

		})
	});


	socket.on('clear message', function(msg){

		console.log(msg);

		// $('#bloc1').text( msg.text );	
		
		var liste = msg.param.blocs.split(",");

		console.log(liste);

		if( liste.indexOf("all") != -1){
			$(".message")
				.text("")
				.removeClassStartingWith("size")
				.css("left",0)
				.css("top",0)
				.css("width",0)
				.css("height",0)
				.css("animation-delay", "0s")
				.css("display","none");

			$(".generique").empty();
		}else{

			liste.forEach(function(element) {
				$("#"+element)
					.text("")
					.removeClassStartingWith("size")
					.css("left",0)
					.css("top",0)
					.css("width",0)
					.css("height",0)
					.css("animation-delay", "0s")
					.css("display","none");
			});

			$(".generique").empty();
		}

	});



	socket.on('interface message', function(msg){

		if(msg.switchgrid === true){
			$("body").toggleClass("callage");
		}

		if(msg.cleargrid === true){
			$("#scene div")
			.text("")
			.css("display","none")
			.attr("class", "message");
		}

		console.log(msg);
		
	});

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
