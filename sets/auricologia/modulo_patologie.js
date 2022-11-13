
var MODULO_PATOLOGIE = { // extend SET
	PATOLOGIE_free: [ 12, 18, 26, 46, 104 ],
	caricaPatologie: function(){
		var contPatologie = 
						'<div id="add_pat">'+
						'	<input id="pat_ricerca"' +
						'		   onKeyUp="SET.filtraPatologie();"' +
						'		   class="okPlaceHolder"' +
						'		   placeholder="'+htmlEntities(Lingua(TXT_CercaPatologia))+'"'+H.noAutoGen+'>' +
						'</div>' +
						'<div class="lista listaPatologie">';
		for(p in DB.set.patologie){
			
			// verifico le autorizzazioni
			var addLock =	SET.PATOLOGIE_free.indexOf(p*1)==-1 && 
							(DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()) ? ' lockedItem' : '';
			// --------------------------
						
			contPatologie +=	'<div id="btn_patologia_'+p+'"' +
								'     class="base'+addLock+'"' +
								'     onClick="SET.apriPatologia(\''+p+'\',this);">' +
									DB.set.patologie[p].NomePatologia +
								'</div>';
		}
		contPatologie += '</div>';
		document.getElementById("lista_patologie").innerHTML = contPatologie;
	},
	apriPatologia: function( n, btn ){
		// verifico le autorizzazioni
		if(SET.PATOLOGIE_free.indexOf(n*1)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(Lingua(TXT_MsgContSoloPay));
			return;
		}
		// --------------------------
		
		var titolo = DB.set.patologie[n].NomePatologia;
		var html = 	"<h1>"+htmlEntities(titolo)+"</h1>" +
					SET.convPuntiScheda(DB.set.patologie[n].TestoPatologia);
		
		// sesso
		if(DB.set.patologie[n].sessoPatologia){
			html = 	'<img 	src="sets/meridiani_shiatsu/img/sesso_'+DB.set.patologie[n].sessoPatologia+'.png"' +
					'		class="ideogrammaTsubo">'+html;
		}
		
		var ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_patologia')";
			
		SCHEDA.caricaScheda(	titolo,
								html,
								'SET.annullaEvidenziaTsubo();',
								'scheda_patologia',
								ritorno,
								true,
								btn );
		SET.evidenziaTsubo(html);
	},
	azRicercaPatologie: function( p ){
		SCHEDA.apriElenco('set');
		SET.apriPatologia( p, document.getElementById('btn_patologia_'+p));
		SCHEDA.selElenco('patologie');
		evidenziaParola();
		RICERCHE.nascondiGlobal();
		SCHEDA.individuaElemento( "btn_patologia_"+p, "listaPatologie" );
	},
	filtraPatologie: function( event ){
		var parola = document.getElementById("pat_ricerca").value.trim();
		for(p in DB.set.patologie){
			if(DB.set.patologie[p].NomePatologia.toLowerCase().indexOf(parola.toLowerCase()) == -1){
				document.getElementById("btn_patologia_"+p).classList.add("nasPazRic");
			}else{
				document.getElementById("btn_patologia_"+p).classList.remove("nasPazRic");
			}
		}
		if(parola)document.getElementById("pat_ricerca").classList.add("filtro_attivo");
		else document.getElementById("pat_ricerca").classList.remove("filtro_attivo");
	}
}