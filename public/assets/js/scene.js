


function loadPrototypo(email,password, fontName, fontVariant, sock){

	console.log(email,password);

	// Permet de récupérer les projets d'un compte prototypo
	window['prototypo-projects'].getProjects(email, password).then(function (fonts) {

		console.log("fonts",fonts);

	    // Recherche la famille dans la liste de projets
	    var family = fonts.find(function (font) {
	    	console.log(font);

	        return font.name === fontName; //'test-richer-dust';
	    });
	    // Recherche la variante dans les variantes de la famille
	    var variantRegular = family && family.variants.find(function (variant) {
	        return variant.name === "Regular"; //'Regular';
	    });

	    var variantSlanted = family && family.variants.find(function (variant) {
	        return variant.name === "Slanted";
	    });

	    // Récupère les valeurs nécessaires à initialiser la police
		var template 		= family.template;
		var valuesRegular   = variantRegular.values;
		var valuesSlanted   = variantSlanted.values;
	    var ptypoFont;

	    var prototypo = new Ptypo.default('b1f4fb23-7784-456e-840b-f37f5a647b1c');
	 	// var prototypo = new Ptypo.default();	

	    // Crée une font 'testfont' en utilisant le template récupéré
	    // la font 'testfont' a étée ajoutée à la page en css via une font-family
	    prototypo.createFont('a-richer-dust-Regular', template).then(function(createdFont){
	        ptypoFont = createdFont;
	        // Change les paramètres de la font créée en utilisant les valeurs récupérées du compte
	        createdFont.changeParams(valuesRegular);
	    });


	    prototypo.createFont('a-richer-dust-Slanted', template).then(function(createdFont){
	        ptypoFont = createdFont;
	        // Change les paramètres de la font créée en utilisant les valeurs récupérées du compte
	        createdFont.changeParams(valuesSlanted);
	    });



	    $(".message").css("font-family","a-richer-dust-Slanted");

	    // // Deux évènements de tests lancés va des boutons sur la page et récupérés en jquery
	    // $('.js-button-changeparam').on('click', function(){
	    //     // Changement de paramètre simple de la thickness vers 200, en utilisant le texte de la page comme subset
	    //     ptypoFont.changeParam('thickness', 200, $('.text p').text());
	    // });


	    // $('.js-button-tween').on('click', function(){
	    //     // Anime la width vers 1.4 sur 10 étapes pendant 0.3 secondes en utilisant le texte de la page comme subset
	    //     ptypoFont.tween('width', 1.4, 10, 0.3, function(){}, $('.text p').text());
	    // });

	    sock.on('abbleton message', function(msg){

			// console.log(msg);

			console.log(msg.args[0].value * 2000000);

			// $('#bloc1').text( msg.text );	

			ptypoFont.changeParam('thickness', (2 * 1000000 * msg.args[0].value), $('.text p').text());

			// console.log(msg.param);
		});

	});


	/****************Librairie Prototypo **************/

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
	var socket = io();

	var nbrColonnes = 24;
	var nbrLignes = 12;

	var pasX = 1920/nbrColonnes;
	var pasY = 720/nbrLignes;

	console.log(pasX, pasY);
	
	socket.on('text message', function(msg){

		console.log(msg);

		// $('#bloc1').text( msg.text );	

		$( msg.param.target )
			.text(msg.text)
			.attr("class","")
			.addClass("message")
			.addClass(msg.param.classes)
			.css("left", msg.param.colonne * pasX )
			.css("top", msg.param.rang * pasY)
			.css("width", msg.param.width * pasX )
			.css("height", msg.param.height * pasY)
			.css("display", "block"); 

		console.log(msg.param);
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
				.css("display","none");
		}else{

			liste.forEach(function(element) {
				$("#"+element)
					.text("")
					.removeClassStartingWith("size")
					.css("left",0)
					.css("top",0)
					.css("width",0)
					.css("height",0)
					.css("display","none");
			});

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
	$.getJSON( "param.json", function( data ) {  

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
