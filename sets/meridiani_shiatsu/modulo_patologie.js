
var MODULO_PATOLOGIE = { // extend SET

	PATOLOGIE_free: [ "12", "18", "26", "46", "104" ],
	
	componiPatologie: function(){
		for(let p in DB.set.patologie){
			
			var nmk = false;
			var mas = false;
			var cin = false;
			
			
			// carica le schede collegate
			var SCH = DB.set.schede[DB.set.patologie[p].scheda];
			var txtMTC = '';
			for(let s in SCH.mtc){
				txtMTC += '<div class="schedaSpecifica" data-sistema=""><p>'+TXT("MTC")+'<span class="eviPtsBtn" onclick="SET.evidenziaPat(this.parentElement.parentElement);"></span></p>'+SCH.mtc[s]+'<div class="swSistema"><span onClick="SET.swSistemaMeridiani(this.parentElement.parentElement);">'+TXT("CambiaMeridiani")+'</span></div></div>';
			}
			if(txtMTC){
				DB.set.patologie[p].TestoPatologia += '<br><br>'+txtMTC
			}
			var txtNMK = '';
			for(let s in SCH.nmk){
				var PRT = DB.set.protocolli[SCH.nmk[s]];
				txtNMK += '<div class="schedaSpecifica" data-sistema="NMK"><p>'+PRT.TitoloProtocollo+'<span class="eviPtsBtn" onclick="SET.evidenziaPat(this.parentElement.parentElement);"></span></p>'+PRT.TestoProtocollo+'</div>';
				nmk = true;
			}
			if(txtNMK){
				DB.set.patologie[p].TestoPatologia += '<br><br><b>'+TXT("ProtocolloNamikoshi")+'</b><br>'+txtNMK
			}
			DB.set.patologie[p].TestoPatologia += '<br><br>'+SCH.txt;
		}
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
			
			var nmk = false;
			var mas = false;
			var cin = false;
			
			try{ 
				regexp = /\[\.[A-Z]{2}\.\]/ig;
				pts = DB.set.patologie[p].TestoPatologia.match(regexp);
				if(pts.length)mas = true;
			}catch(err){}
			try{ 
				regexp = /\[\.[0-9]{1,2}\.[A-Z]{2}\.\]/ig;
				pts = DB.set.patologie[p].TestoPatologia.match(regexp);
				if(pts.length){
					for(let n in pts){
						if(pts[n].split(".")[2]!='NK')cin = true;
						else nmk = true;
					}
				}
			}catch(err){}
			/*try{ 
				regexp = /\[\.[A-Z]{2}\.NK\.\]/ig;
				pts = DB.set.patologie[p].TestoPatologia.match(regexp);
				if(pts.length)nmk = true;
			}catch(err){}*/
			
			//var addSys = " pats"+__(DB.set.patologie[p].sistema,'');
			var addSys = '';
			if(nmk)addSys += ' patsNMK';
			if(mas)addSys += ' patsMAS';
			if(cin)addSys += ' patsCIN';
			
			// verifico le autorizzazioni
			var addLock =	(!SET.verFreePatologia(DB.set.patologie[p].siglaPatologia)) ? ' lockedItem' : '';
			// --------------------------
			
			if(__(DB.set.patologie[p].evi))addSys += " patEvi";
			contPatologie +=	'<div id="btn_patologia_'+p+'"' +
								'     class="base'+addLock+addSys+'"' +
								'     onClick="SET.apriPatologia(\''+p+'\',this);">' +
								'<span class="pallSYS"></span>' +
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
			html = 	'<img 	src="sets/meridiani_shiatsu/img/sesso_'+DB.set.patologie[n].sessoPatologia+'.png"' +
					'		class="ideogrammaPunto">'+html;
		}
		
		var ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_patologia')";
			
		var btnAdd = 	'';/*'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.meridiani_shiatsu.pathologies\')">' +
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
		
		var els = document.getElementById("scheda_testo").getElementsByClassName("schedaSpecifica");
		var selected = false;
		for(let e=0;e<els.length;e++){
			var sistema = __(els[e].dataset.sistema,'');
			var sistemaVer = localStorage.sistemaMeridiani;
			if(sistemaVer=='MAS')sistemaVer = '';
			if(sistema == sistemaVer && !selected){
				SET.evidenziaPat(els[e]);
				els[e].classList.add("eviPoints");
				selected = true;
			}
		}
		if(!selected){
			SET.annullaEvidenziaPunto();
			SET.spegniMeridiani(true);
		}
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