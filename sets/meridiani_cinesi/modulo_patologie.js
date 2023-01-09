
var MODULO_PATOLOGIE = { // extend SET

	PATOLOGIE_free: [ 12, 18, 26, 46, 104 ],
	
	caricaPatologie: function(){
		// carica la lista delle patologie
		var contPatologie = 
			'<div id="add_pat">'+
			'	<input id="pat_ricerca"' +
			'		   onKeyUp="SET.filtraPatologie();"' +
			'		   class="okPlaceHolder"' +
			'		   placeholder="'+htmlEntities(TXT("CercaPatologia"))+'"'+H.noAutoGen+'>' +
			'</div>' +
			'<div class="lista listaPatologie">';
		for(p in DB.set.patologie){
			
			// verifico le autorizzazioni
			var addLock =	(!SET.verFreePatologia(p*1)) ? ' lockedItem' : '';
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
		// apre la scheda della patologia
		// verifico le autorizzazioni
		if(!SET.verFreePatologia(n*1)){
			ALERT(TXT("MsgContSoloPay"));
			return;
		}
		// --------------------------
		
		var titolo = DB.set.patologie[n].NomePatologia;
		var html = 	"<h1>"+htmlEntities(titolo)+"</h1>" +
					SET.convPuntiScheda(DB.set.patologie[n].TestoPatologia);
		
		// sesso
		if(DB.set.patologie[n].sessoPatologia){
			html = 	'<img 	src="sets/meridiani_cinesi/img/sesso_'+DB.set.patologie[n].sessoPatologia+'.png"' +
					'		class="ideogrammaTsubo">'+html;
		}
		
		var ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_patologia')";
		
		var btnAdd = 	'';/*'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.meridiani_cinesi.pathologies\')">' +
							TXT("ReferenceGuide") +
						'</div>';*/
		SCHEDA.caricaScheda(	titolo,
								html,
								'SET.annullaEvidenziaTsubo();SET.spegniMeridiani(true);',
								'scheda_patologia',
								ritorno,
								true,
								btn,
								btnAdd );
		SET.convSigleScheda();
		SET.evidenziaTsubo(html);
		SET.evidenziaMeridiani(html);
	},
	filtraPatologie: function( event ){
		// filtra le patologie con il campo testuale
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
	},
	azRicercaPatologie: function( p ){
		// apre una patologia della ricerca globale
		SCHEDA.apriElenco('set');
		SET.apriPatologia( p, document.getElementById('btn_patologia_'+p));
		SCHEDA.selElenco('patologie');
		evidenziaParola();
		RICERCHE.nascondiGlobal();
		SCHEDA.individuaElemento( "btn_patologia_"+p, "listaPatologie" );
	},
	verFreePatologia: function( p ){
		return !(SET.PATOLOGIE_free.indexOf(parseInt(p))==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	}
}