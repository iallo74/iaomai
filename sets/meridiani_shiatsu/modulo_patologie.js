
var MODULO_PATOLOGIE = { // extend SET

	PATOLOGIE_free: [ "012", "018", "026", "046", "104", "1000" ],
	
	componiPatologie: function(){
		DB.set.patologie = [];

		for(let p in DB.set.protocolliMTC){
			for(let m in DB.set.protocolliMTC[p].patologie){
				let pat = DB_patologie[DB.set.protocolliMTC[p].patologie[m]];
				if(!__(pat.mtc))pat.mtc = [];
				if(pat.mtc.indexOf(p)===-1)pat.mtc.push(p);
			}
		}
		for(let p in DB.set.protocolliNMK){
			for(let m in DB.set.protocolliNMK[p].patologie){
				let pat = DB_patologie[DB.set.protocolliNMK[p].patologie[m]];
				if(!__(pat.nmk))pat.nmk = [];
				if(pat.nmk.indexOf(p)===-1)pat.nmk.push(p);
			}
		}

		for(let p in DB_patologie){
			if(__(DB_patologie[p].mtc) || __(DB_patologie[p].nmk)){
				let TestoPatologia = '';
				if(__(DB_patologie[p].descrizione))TestoPatologia += '<div class="schedaDescrittiva">'+DB_patologie[p].descrizione+"</div>";
				
				if(__(DB_patologie[p].mtc)){
					var txtMTC = '';
					let addClass = '';
					if(DB_patologie[p].mtc.length==1)addClass = ' noOcchio';
					for(let m in DB_patologie[p].mtc){
						let schedaMtc = __(DB.set.protocolliMTC[DB_patologie[p].mtc[m]]);
						let protAdd = '',
							mas = false,
							cin = false;
						try{ 
							regexp = /\[\.[0-9]{1,2}\.[A-Z]{2}[\.*]+\]/ig;
							pts = schedaMtc.scheda.match(regexp);
							if(pts.length){
								for(let n in pts){
									cin = true;
								}
							}
						}catch(err){}
						try{ 
							regexp = /\[\.[A-Z]{2}\.\]/ig;
							pts = schedaMtc.scheda.match(regexp);
							if(pts.length)mas = true;
						}catch(err){}
						if(cin)protAdd += ' protCIN';
						if(mas)protAdd += ' protMAS';
						txtMTC += '<div class="schedaSpecifica'+protAdd+addClass+'" data-sistema=""><p>'+TXT("ProtocolloTrattamento")+'<span class="eviPtsBtn" onclick="SET.evidenziaPat(this.parentElement.parentElement);"></span></p>'+schedaMtc.scheda+'</div>';
					}
					if(txtMTC){
						TestoPatologia += txtMTC
					}
				}
				if(__(DB_patologie[p].nmk)){
					var txtNMK = '';
					let addClass = '';
					if(DB_patologie[p].nmk.length==1)addClass = ' noOcchio';
					for(let m in DB_patologie[p].nmk){
						let PRT = __(DB.set.protocolliNMK[DB_patologie[p].nmk[m]]);
						txtNMK += '<div class="schedaSpecifica protNMK'+addClass+'" data-sistema="NMK"><p>'+TXT("ProtocolloTrattamento")+'<span class="eviPtsBtn" onclick="SET.evidenziaPat(this.parentElement.parentElement);"></span></p>'+PRT.TestoProtocollo+'</div>';
						nmk = true;
					}
					if(txtNMK){


						TestoPatologia += txtNMK
					}
				}

				if(__(DB_patologie[p].consigli)){
					if(TestoPatologia)TestoPatologia += "<br>";
					TestoPatologia += '<b>'+TXT("Consigli")+'</b><br>'+DB_patologie[p].consigli;
				}
				let nomi = clone(DB_patologie[p].nomi);
				let categoria = DB_patologie[p].categoria;
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
						categoria: categoria,
						siglaPatologia: p,
						evi: (p=='1000')?"1":"0",
						TestoPatologia: TestoSinonimi+TestoPatologia,
						sessoPatologia: __(DB_patologie[p].sesso),
						chiaviPatologia: __(DB_patologie[p].chiavi)
					});
				}
			}
		}
		DB.set.patologie.sort(sort_by("NomePatologia"));
		DB.set.patologie.sort(sort_by("evi",true));
		//DB_patologie = null;
		SET.caricaPatologie();
		SET.componiMeridiani();
	},
	caricaPatologie: function(){
		// carica la lista delle patologie
		var contPatologie = 
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
		contPatologie +=	'	<span id="categoryBtn" onClick="SET.swListType();"></span>' +
							'</div>' +
							'<div class="lista listaPatologie">';

		let elenco = [1];
		if(__(localStorage.listPatType)=='category')elenco = clone(DB_categorie_patologie);
		for(a in elenco){
			let vuota = true;
			let contCartella = 	'';
			if(__(localStorage.listPatType)=='category')contCartella = 	
				'<div class="cartella" onTouchStart="SCHEDA.setCartella(this);">' +
				'	<span id="btn_apparati_cart_'+a+'" onClick="SCHEDA.swCartella(this);">' +
				DB_categorie_patologie[a] +
				'	</span>' +
				'	<div>';
							
			for(let p in DB.set.patologie){
				if(DB.set.patologie[p].categoria == a || __(localStorage.listPatType)!='category'){	
					var nmk = false;
					var mas = false;
					var cin = false;
					


					
					if(DB.set.patologie[p].TestoPatologia.indexOf('data-sistema="NMK"')>-1)nmk = true;
					if(DB.set.patologie[p].TestoPatologia.indexOf('data-sistema=""')>-1)cin = true;
					try{ 
						regexp = /\[\.[A-Z]{2}\.\]/ig;
						pts = DB.set.patologie[p].TestoPatologia.match(regexp);
						if(pts.length)mas = true;
					}catch(err){}
					
					var addSys = '';
					if(nmk)addSys += ' patsNMK';
					if(mas)addSys += ' patsMAS';
					if(cin)addSys += ' patsCIN';
					
					// verifico le autorizzazioni
					var addLock =	(	!SET.verFreePatologia(DB.set.patologie[p].siglaPatologia) || (SET.PATOLOGIE_free.indexOf(DB.set.patologie[p].siglaPatologia)==-1 && !SET.verAttModule()) ) ? ' lockedItem' : '';
					if(SET.verAttModule())addLock = '';
					// --------------------------
					
					vuota = false;
					if(__(DB.set.patologie[p].evi)=='1')addSys += " patEvi";
					contCartella +=	'<div id="btn_patologia_'+p+'"' +
										'     class="'+((__(localStorage.listPatType)=='category')?'cart_els':'base')+' '+addLock+addSys+'"' +
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
		//SET.caricaMeridiani();
	},
	apriPatologia: function( n, btn ){
		// apre la scheda della patologia
		var siglaPatologia = DB.set.patologie[n].siglaPatologia;
		
		// verifico le autorizzazioni
		var pass = false;
		if(	!SET.verFreePatologia(siglaPatologia) ||
			(SET.PATOLOGIE_free.indexOf(siglaPatologia)==-1 && !SET.verAttModule()) )pass = true;
		if(SET.verAttModule())pass = false;
		if(	pass ){
			if(SET.verLicenses())ALERT(TXT("MsgContSoloLicensed"));
			else ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		
		var titolo = DB.set.patologie[n].NomePatologia;
		var html = 	"<h1>"+htmlEntities(titolo)+"</h1>" +
					// aggiungo contenuto custom
					CUSTOMS.addContent("patologie_"+n,SET.convPuntiScheda(DB.set.patologie[n].TestoPatologia));
					//SET.convPuntiScheda(DB.set.patologie[n].TestoPatologia);
		
		// sesso
		if(DB.set.patologie[n].sessoPatologia){
			html = 	'<img 	src="sets/meridiani_shiatsu/img/sesso_'+DB.set.patologie[n].sessoPatologia+'.png"' +
					'		class="simboliPatologia">'+html;
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
	swListType: function(){
		if(__(localStorage.listPatType)!='category')localStorage.listPatType = 'category';
		else localStorage.listPatType = 'list';
		SET.componiPatologie();
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