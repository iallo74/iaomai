
var APP_RATING = {
	
	init: function(){
		let time = new Date().getTime();
		if(!__(localStorage.ratedFirstAccess))localStorage.ratedFirstAccess = time;
		if(!__(localStorage.rated))localStorage.rated = '';
		if(!__(localStorage.rateLater))localStorage.rateLater = 0;
		setTimeout(function(){
			if(time > parseInt(localStorage.ratedFirstAccess)+(60*60*24*5*1000))APP_RATING.ver(); // 5 giorni dopo il primo utilizzo
		},20000);
	},
	ver: function(){
		if(isCordova){
			let time = new Date().getTime();
			if(!localStorage.rated && time > parseInt(localStorage.rateLater)){ // dopo 5 giorni
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
	rate: function(){
		CONN.openUrl(android?CONN.linkPlayStore:CONN.linkAppStore);
		APP_RATING.later();
	},
	already: function(){
		localStorage.rated = 'true';
		APP_RATING.nas();
	},
	later: function(){
		let time = new Date().getTime();
		localStorage.rateLater = time+(60*60*24*5*1000);
		APP_RATING.nas();
	}
}