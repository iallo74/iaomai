
var MODULO_PATOLOGIE = { // extend SET

	PATOLOGIE_free: [ "011", "017", "025", "026", "105" ],
	
	componiPatologie: function(){
		DB.set.patologie = [];

		for(let p in DB.set.protocolliMTC){
			for(let m in DB.set.protocolliMTC[p].patologie){
				let pat = DB_patologie[DB.set.protocolliMTC[p].patologie[m]];
				if(!__(pat.mtc))pat.mtc = [];
				if(pat.mtc.indexOf(p)===-1)pat.mtc.push(p);
			}
		}

		for(let p in DB_patologie){
			if(__(DB_patologie[p].mtc)){
				let TestoPatologia = '';
				if(__(DB_patologie[p].descrizione))TestoPatologia += '<div class="schedaDescrittiva">'+DB_patologie[p].descrizione+"</div>";
				
				
				for(let m in DB_patologie[p].mtc){
					let schedaMtc = __(DB.set.protocolliMTC[DB_patologie[p].mtc[m]]);
					TestoPatologia += '<div class="schedaSpecifica">';

					TestoPatologia += '<b>'+TXT("MTC")+'</b><br>'+schedaMtc.scheda+'</div>';
				}



				if(__(DB_patologie[p].consigli)){
					if(TestoPatologia)TestoPatologia += "<br>";
					TestoPatologia += '<b>'+TXT("Consigli")+'</b><br>'+DB_patologie[p].consigli;
				}
				let nomi = clone(DB_patologie[p].nomi);
				for(let n in nomi){
					sinonimi = clone(nomi);
					TestoSinonimi = '';
					if(sinonimi.length>1){
						TestoSinonimi += '<b>'+TXT("AltriNomi")+'</b><br>';
						for(let s in sinonimi){
							if(sinonimi[s]!=nomi[n])TestoSinonimi += "- "+sinonimi[s]+"<br>";
						}
						TestoSinonimi += '<br>';
					}
					DB.set.patologie.push({
						NomePatologia: nomi[n],
						sinonimi: sinonimi,
						siglaPatologia: p,
						TestoPatologia: TestoSinonimi+TestoPatologia,
						sessoPatologia: __(DB_patologie[p].sesso),
						chiaviPatologia: __(DB_patologie[p].chiavi)
					});
				}
			}
		}
		DB.set.patologie.sort(sort_by("NomePatologia"));
		//DB_patologie = null;
		SET.caricaPatologie();
	},
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
		for(let p in DB.set.patologie){
			
			// verifico le autorizzazioni
			var addLock =	(!SET.verFreePatologia(DB.set.patologie[p].siglaPatologia)) ? ' lockedItem' : '';
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
		var siglaPatologia = DB.set.patologie[n].siglaPatologia;
		// verifico le autorizzazioni
		if(!SET.verFreePatologia(siglaPatologia)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		
		var titolo = DB.set.patologie[n].NomePatologia;
		var html = 	"<h1>"+htmlEntities(titolo)+"</h1>" +
					SET.convPuntiScheda(DB.set.patologie[n].TestoPatologia);
		
		// sesso
		if(DB.set.patologie[n].sessoPatologia){
			html = 	'<img 	src="sets/meridiani_cinesi/img/sesso_'+DB.set.patologie[n].sessoPatologia+'.png"' +
					'		class="simboliPatologia">'+html;
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
								'SET.annullaEvidenziaPunto();SET.spegniMeridiani(true);',
								'scheda_patologia',
								ritorno,
								true,
								btn,
								btnAdd,
								globals.set.cartella+'_patologie_'+siglaPatologia );
		SET.convSigleScheda();
		SET.evidenziaPunto();
		SET.evidenziaMeridiani(html);
	},
	filtraPatologie: function( event ){
		// filtra le patologie con il campo testuale
		var parola = document.getElementById("pat_ricerca").value.trim();
		for(let p in DB.set.patologie){
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
		var pass = true;
		for(t in DB.set.patologie){
			if(DB.set.patologie[t].siglaPatologia == p){
				pass = SET.PATOLOGIE_free.indexOf(DB.set.patologie[t].siglaPatologia)==-1;
			}
		}
		return !(pass && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	}
}