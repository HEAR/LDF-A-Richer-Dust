


function loadPrototypo(email,password, sock){

	console.log(email,password);

	// Permet de récupérer les projets d'un compte prototypo
	window['prototypo-projects'].getProjects(email, password).then(function (fonts) {

		// console.log("fonts",fonts);

	    // Recherche la famille dans la liste de projets
	    var family = fonts.find(function (font) {
	        return font.name === 'test-richer-dust';
	    });
	    // Recherche la variante dans les variantes de la famille
	    var variant = family && family.variants.find(function (variant) {
	        return variant.name === 'Regular';
	    });
	    // Récupère les valeurs nécessaires à initialiser la police
		var template = family.template;
		var values   = variant.values;
	    var ptypoFont;

	    var prototypo = new Ptypo.default('b1f4fb23-7784-456e-840b-f37f5a647b1c');
	 	// var prototypo = new Ptypo.default();

	    // Crée une font 'testfont' en utilisant le template récupéré
	    // la font 'testfont' a étée ajoutée à la page en css via une font-family
	    prototypo.createFont('a-richer-dust-font', template).then(function(createdFont){
	        ptypoFont = createdFont;
	        // Change les paramètres de la font créée en utilisant les valeurs récupérées du compte
	        createdFont.changeParams(values);
	    });

	    $(".message").css("font-family","a-richer-dust-font");

	    // Deux évènements de tests lancés va des boutons sur la page et récupérés en jquery
	    $('.js-button-changeparam').on('click', function(){
	        // Changement de paramètre simple de la thickness vers 200, en utilisant le texte de la page comme subset
	        ptypoFont.changeParam('thickness', 200, $('.text p').text());
	    });


	    $('.js-button-tween').on('click', function(){
	        // Anime la width vers 1.4 sur 10 étapes pendant 0.3 secondes en utilisant le texte de la page comme subset
	        ptypoFont.tween('width', 1.4, 10, 0.3, function(){}, $('.text p').text());
	    });

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

		var email = data.prototypoEmail;
		var password = data.prototypoPassword;


		loadPrototypo(email,password, socket);

	});

});