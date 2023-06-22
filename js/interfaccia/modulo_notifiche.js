
var NOTIFICHE = {

	aggiornaIcona: function( daleggere ){ // aggiorna l'icona delle notifiche
		if(daleggere){
			document.getElementById("notificaGenerale").classList.add("pallinoNotifica");
			document.getElementById("notificaMenu").classList.add("pallinoNotifica");
		}else{
			document.getElementById("notificaGenerale").classList.remove("pallinoNotifica");
			document.getElementById("notificaMenu").classList.remove("pallinoNotifica");
		}
	},
	
	dwnl_notifiche: function(){ // scarica le notifiche
		if(!LOGIN.logedin()){
			ALERT(TXT("ErroreUtenteNonConnesso"), true );
			return;
		}
		if(CONN.retNoConn()){
			applicaLoading(document.getElementById("contNotifiche"));
			CONN.caricaUrl(	"sincro_notifiche_elenco.php",
							"b64=1&SL="+globals.siglaLingua.toUpperCase(),
							"NOTIFICHE.car_notifiche");
		}
	},
	car_notifiche: function( txt ){ // carica la lista delle notifiche
		if(txt)DB.notifiche = JSON.parse(txt).notifiche;
		var HTML = '';
		if(!DB.notifiche)DB.notifiche = [];
		//console.log(DB.notifiche);
		if(DB.notifiche.length){
			DB.notifiche.sort(sort_by("DataModifica", true, parseInt));
			for(let n in DB.notifiche){
				HTML += '<div class="elsNotifiche" onClick="NOTIFICHE.car_notifica('+n+');">';
				if(DB.notifiche[n].letta*1 == 0)HTML += '<span class="pallinoNotifica"></span>';
				HTML += htmlEntities(DB.notifiche[n].NomeNotifica);
				HTML += '</div>';
			}
		}else HTML += '<div class="noResults">'+htmlEntities(TXT("NotificheNessuna"))+'</div>';
		document.getElementById("contNotifiche").innerHTML = HTML;
		rimuoviLoading(document.getElementById("contNotifiche"));
	},
	
	car_notifica: function( n ){ // apre una notifica
		var HTML = 	'<span id="elNotifica"' +
					'	   onClick="CONFIRM.vis( TXT(\'EliminaNotifica\') ).then(function(pass){' +
					'	   				if(pass){' +
					'	   					NOTIFICHE.el_notifica('+n+');' +
					'	   				}' +
					'	   			});">' +
					'</span>' +
					'<div onClick="NOTIFICHE.dwnl_notifiche();"' +
					'	  id="notificheTorna">' +
						htmlEntities(TXT("NotificheTorna")) +
					'</div>' +
					'<div id="notificheMsg">' +
					'	<h1>' +
							htmlEntities(DB.notifiche[n].NomeNotifica) +
					'	</h1>';
		
		var TestoNotifica = DB.notifiche[n].TestoNotifica;
		
		var pattern = /(\[proceduraPriv:)([0-9]+)(\])/;
		var sost='';
		if(	globals.set.cartella == 'meridiani_cinesi' ||
			globals.set.cartella == 'meridiani_shiatsu'){
			sost = 	'<div class="submitBtn"' +
					'	  onClick="	MENU.chiudiMenu();' +
					'	  			SET.azRicercaProcedure(-1,$2);"' +
					'	  style="width:200px;">' +
						htmlEntities(TXT("ApriScheda")) + 
					'</div>';
		}
		TestoNotifica = TestoNotifica.replace(pattern, sost);
		
		var pattern = /(\[proceduraComm:)([0-9]+)(\])/;
		var sost='';
		if(	globals.set.cartella == 'meridiani_cinesi' || 
			globals.set.cartella == 'meridiani_shiatsu' ){
			sost = 	'<div class="submitBtn"' +
					'	  onClick="	MENU.chiudiMenu();' +
					'	  			SET.azRicercaProcedure(-1,$2,true);"' +
					'	  style="width:200px;">' +
						htmlEntities(TXT("ApriScheda")) + 
					'</div>';
		}
		TestoNotifica = TestoNotifica.replace(pattern, sost);
		
		
		HTML += TestoNotifica;
		
		HTML += '</div>';
		document.getElementById("contNotifiche").innerHTML = HTML;
		DB.notifiche[n].letta = 1;
		CONN.caricaUrl(	"sincro_notifiche_letture.php",
						"idNotifica="+DB.notifiche[n].idNotifica,
						"NOTIFICHE.aggiornaIcona");
	},
	
	el_notifica: function( n ){ // elimina una notifica
		applicaLoading(document.getElementById("contNotifiche"));
		CONN.caricaUrl(	"sincro_notifiche_elimina.php",
						"idNotifica="+DB.notifiche[n].idNotifica,
						"DB.notifiche.splice("+n+",1);NOTIFICHE.aggiornaIcona();NOTIFICHE.dwnl_notifiche");
	}
	
}