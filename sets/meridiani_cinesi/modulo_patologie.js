
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
				let categoria = DB_patologie[p].categoria;
				for(let n in nomi){
					let sinonimi = clone(nomi),
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
						categoria: categoria,
						siglaPatologia: p,
						TestoPatologia: TestoSinonimi+TestoPatologia,
						sessoPatologia: __(DB_patologie[p].sesso),
						chiaviPatologia: __(DB_patologie[p].chiavi)
					});
				}
			}
		}
		DB.set.patologie.sort(sort_by("NomePatologia"));
		SET.caricaPatologie();
	},
	caricaPatologie: function(){
		let contPatologie = 
					'<div id="add_pat"' +
					((__(localStorage.listPatType)=='category')?' class="category"':'') +
					'>';
		if(__(localStorage.listPatType)!='category'){
		contPatologie +=
					'	<input id="pat_ricerca"' +
					'		   onKeyUp="SET.filtraPatologie();"' +
					'		   class="okPlaceHolder"' +
					'		   placeholder="'+htmlEntities(TXT("CercaPatologia"))+'"'+H.noAutoGen+'>';
		}else{
		contPatologie +=
					'	<span id="labelSequenze">'+TXT("Apparati")+'</span>';
		}
		contPatologie +='	<span id="categoryBtn" onClick="SET.swListType();"></span>' +
			'</div>' +
			'<div class="lista listaPatologie">';

			
		let elenco = [1];
		if(__(localStorage.listPatType)=='category')elenco = clone(DB_categorie_patologie);
		for(a in elenco){
			let contCartella = 	'';
			if(__(localStorage.listPatType)=='category')contCartella = 	
							'<div class="cartella" onTouchStart="SCHEDA.setCartella(this);">' +
							'	<span id="btn_apparati_cart_'+a+'" onClick="SCHEDA.swCartella(this);">' +
							DB_categorie_patologie[a] +
							'	</span>' +
							'	<div>';
			let vuota = true;				
			for(let p in DB.set.patologie){
				
				if(DB.set.patologie[p].categoria == a || __(localStorage.listPatType)!='category'){
		
					// verifico le autorizzazioni
					let addLock =	(!SET.verFreePatologia(DB.set.patologie[p].siglaPatologia) && !globals.allowFreeVer) ? ' lockedItem' : '';
					// --------------------------
					vuota = false;		
					contCartella +=	'<div id="btn_patologia_'+p+'"' +
										'     class="'+((__(localStorage.listPatType)=='category')?'cart_els':'base')+' '+addLock+'"' +
										'     onClick="SET.apriPatologia(\''+p+'\',this);">' +
										DB.set.patologie[p].NomePatologia +
										'</div>';
					
				}
			}
			contCartella += '</div>';
			if(__(localStorage.listPatType)=='category')contCartella += '</div>';
			if(!vuota)contPatologie += contCartella;
		}
		
		
		
		
		
		document.getElementById("lista_patologie").innerHTML = contPatologie;
	},
	apriPatologia: function( n, btn ){
		// apre la scheda della patologia
		let siglaPatologia = DB.set.patologie[n].siglaPatologia;
		// verifico le autorizzazioni
		if(!SET.verFreePatologia(siglaPatologia)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		SET.patOp = n;
		let titolo = DB.set.patologie[n].NomePatologia,
			html = 	"<h1>"+htmlEntities(titolo)+"</h1>" +
					// aggiungo contenuto custom
					CUSTOMS.addContent("patologie_"+n,SET.convPuntiScheda(DB.set.patologie[n].TestoPatologia));
		
		// sesso
		if(DB.set.patologie[n].sessoPatologia){
			html = 	'<img 	src="sets/meridiani_cinesi/img/sesso_'+DB.set.patologie[n].sessoPatologia+'.png"' +
					'		class="simboliPatologia">'+html;
		}
		
		let ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_patologia')";
		
		let btnAdd = 	'';
		SCHEDA.caricaScheda(	titolo,
								html,
								'SET.chiudiPatologia();' +
								'SET.annullaEvidenziaPunto();' +
								'SET.spegniMeridiani(true);',
								'scheda_patologia',
								ritorno,
								true,
								btn,
								btnAdd,
								globals.set.cartella+'_patologie_'+siglaPatologia );
		if(!SET.blur){
			SCHEDA.gestVisAnatomia(true);
			SET.convSigleScheda();
			SET.evidenziaPunto();
			SET.evidenziaMeridiani(html);
		}
		if(SET.blur){
			SCHEDA.addSblocca(	[document.getElementsByClassName("ideogrammaPuntoChar")[0]],
								['h1'] );
		}
	},
	chiudiPatologia: function(){
		SET.patOp = -1;
	},
	filtraPatologie: function( event ){
		// filtra le patologie con il campo testuale
		let parola = document.getElementById("pat_ricerca").value.trim();
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
	swListType: function(){
		if(__(localStorage.listPatType)!='category')localStorage.listPatType = 'category';
		else localStorage.listPatType = 'list';
		SET.caricaPatologie();
		if(SET.patOp && SCHEDA.btnSel){
			SCHEDA.btnSel = document.getElementById("btn_patologia_"+SET.patOp);//.classList.add("elencoSel");
			SCHEDA.btnSel.classList.add("elencoSel");
		}
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
		if(globals.allowFreeVer)return true;
		let pass = true;
		for(t in DB.set.patologie){
			if(DB.set.patologie[t].siglaPatologia == p){
				pass = SET.PATOLOGIE_free.indexOf(DB.set.patologie[t].siglaPatologia)==-1;
			}
		}
		return !(pass && (SET.blur || !LOGIN.logedin()));
	}
}