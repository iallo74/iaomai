
var APP_RATING = {
	onlyCordova: false, //  se false i ratings vengono gestiti anche da browser mobile
	rated: '',
	init: function(){ // inizializzo il rating
		let time = new Date().getTime();
		if(!__(localStorage.ratedFirstAccess))localStorage.ratedFirstAccess = time;
		if(!__(localStorage.rated))localStorage.rated = '';
		
		// a seconda che sia loggato o no leggo se è stato votato
		if(LOGIN.logedin()){
			APP_RATING.rated = DB.login.data.rated;
			if(localStorage.rated || DB.login.data.rated)localStorage.rated = '1';
		}else APP_RATING.rated = __(localStorage.rated,'');
		if(!__(localStorage.rateLater))localStorage.rateLater = 0;
		setTimeout(function(){
			if(time > parseInt(localStorage.ratedFirstAccess)+(60*60*24*5*1000))APP_RATING.ver(); // 5 giorni dopo il primo utilizzo
			//APP_RATING.ver(); // subito (DA TOGLIERE solo test)
		},20000);
	},
	ver: function(){
		if(isCordova || (!APP_RATING.onlyCordova && smartMenu)){
			let time = new Date().getTime();
			if(!APP_RATING.rated && time > parseInt(localStorage.rateLater)){ // dopo 5 giorni
				APP_RATING.vis();
			}
		}
	},
	vis: function(){ // visualizza il box di richiesta rating
		document.getElementById("app_rating_cont").style.display = 'block';
		document.getElementById("app_rating_txt").innerHTML = android?TXT("TapPlayStore"):TXT("TapAppStore");
		setTimeout(function(){
			document.getElementById("app_rating_cont").classList.add("act");
		},300);
	},
	nas: function(){ // nasconde il box di richiesta rating
		document.getElementById("app_rating_cont").classList.remove("act");
		setTimeout(function(){
			document.getElementById("app_rating_cont").style.display = 'none';
		},300);
	},
	rate: function(){ // BTN vota ora
		CONN.openUrl(android?CONN.linkPlayStore:CONN.linkAppStore);
		APP_RATING.later();
	},
	already: function(){ // BTN già fatto
		localStorage.rated = '1';
		APP_RATING.nas();
		APP_RATING.update();
	},
	later: function(){ // BTN più tardi
		let time = new Date().getTime();
		localStorage.rateLater = time+(60*60*24*5*1000);
		APP_RATING.nas();
	},
	update: function(){ // aggiorna la scelta di rating
		if(DB.login.data.rated || localStorage.rated){
			localStorage.rated = '1';
			if(LOGIN.logedin()){
				DB.login.data.rated = '1';
				localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login));
				CONN.caricaUrl(	"utente_rated_up.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify({}))),
								"console.log");		
			}		
		}
	}
}