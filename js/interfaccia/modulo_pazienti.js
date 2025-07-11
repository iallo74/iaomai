var PAZIENTI = {
	idCL: -1,
	idPaziente: -1,
	cicli: [],
	maxCicli: 3,
	maxPazientiFree: 1,
	maxPazientiLogged: 15,
	pazOp: false,
	trattOp: false,
	cicOp: false,
	saldoOp: false,
	aperture: [],
	puntiProvvisori: "",
	sintomiProvvisori: [],
	sintomiEliminati: [],
	meridianiProvvisori: [],
	tagsProvvisori: [],
	medicineProvvisorie: [],
	allergieProvvisorie: [],
	sintomiModello: [],
	pazSelMD5: '',
	mnMobileOpened: null,
	pazientiFiltrati: [],
		
	caricaPazienti: function(){ // carica l'elenco dei pazienti
		if(PAZIENTI.idCL>-1)return;
		if(PAZIENTI.pazientiFiltrati.length)PAZIENTI.car_filtri(true); // per i cambi di filtri
		let HTML = '';
		// pulsante aggiungi paziente
		HTML += '<div class="menuElenchi"' +
				'	  onClick="MENU.visMM(\'add_paz\');">' +
				'</div>' +
				'<p id="add_paz">' +
				'	<input id="paz_ricerca"' +
				'		   onKeyUp="PAZIENTI.filtra();"' +
				'		   class="okPlaceHolder"' +
				'		   placeholder="'+htmlEntities(TXT("CercaCliente"))+'"'+H.noAutoGen+'>' +
				'	<i class="elMenu"' +
				'	   id="filtroPazienti"' +
				'	   onclick="PAZIENTI.car_filtri();">' +
				'		<span>'+TXT("FiltroPazienti")+'</span>' +
				'	</i>' +
				'	<i class="elMenu"' +
				'	   id="marketingPazienti"' +
				'	   onclick="PAZIENTI.car_marketing();">' +
				'		<span>'+TXT("StrumentiMarketing")+'</span>' +
				'	</i>' +
				'	<i class="elMenu"' +
				'	   id="addPaziente"' +
				'	   onclick="PAZIENTI.car_paziente();"' +
				'	   title="'+TXT("AggiungiPaziente")+'">' +
				'	</i>' +
				'</p>' +
				'<div class="lista listaPazienti">' +
				'	<div id="paz_filtrati"' +
						 (!PAZIENTI.pazientiFiltrati.length ? ' style="display:none;"' : '') + 
				'		 onClick="PAZIENTI.car_filtri();">' +
							htmlEntities(TXT("PazientiFiltrati")) +
				'	</div>';
		let noPaz = true;
		if(DB.pazienti.data.length){
			let clonePAZIENTI = clone(DB.pazienti.data);
			for(let p in clonePAZIENTI){
				clonePAZIENTI[p].p = p;
			}
			clonePAZIENTI.sort(sort_by("Cognome", false));
			clonePAZIENTI.sort(sort_by("Nome", false));
			for(let p in clonePAZIENTI){
				let PZ = clonePAZIENTI[p];
				
				if(!PZ.Cancellato){
					noPaz = false;
					HTML +=
					'	<div class="frdx'+((PAZIENTI.pazientiFiltrati.length && PAZIENTI.pazientiFiltrati.indexOf(PZ.p*1)==-1) ? ' nasPaz' : '')+'"' +
					'		 id="paziente_'+PZ.p+'"' +
					'		 onClick="PAZIENTI.selPaziente('+PZ.p+');">';
						
						// AVATAR
						if(PZ.avatar){ // files del cliente
							HTML +=
					'		<img src="'+PZ.avatar+'"' +
					'			 class="avatarList">';
						}else if(PZ.sesso){ // oppure avatar generico
							HTML += 
					'		<img src="img/ico_cliente_'+sessi[PZ.sesso]+'.png"' +
					'			 class="imgList">';
					}
					// verifico se è stato modificato e non sincronizzato
					let mdT=false;
					if(PZ.DataModifica > DB.pazienti.lastSync)mdT=true;
					for(t in PZ.trattamenti){
						if(PZ.trattamenti[t].DataModifica > DB.pazienti.lastSync)mdT=true;
					}
					for(t in PZ.saldi){
						if(PZ.saldi[t].DataModifica > DB.pazienti.lastSync)mdT=true;
					}
					if(mdT)HTML += H.imgSyncro();
					HTML += htmlEntities(PZ.Nome+" "+PZ.Cognome);
					HTML +=
					'	</div>';
				}
			}
		}
		if(noPaz){
			HTML += 
				'	<span class="noResults"' +
				'		  style="display:inline-block;' +
				'				 vertical-align: top;">' +
						TXT("NoResPaziente") +
				'	</span>';
			if(smartMenu){
				document.getElementById("scheda").classList.remove("triplo");
				document.getElementById("elenchi_lista").classList.remove("triplo");
			}
		}
		HTML += '</div>';
		// scrivo l'elenco
		document.getElementById("lista_pazienti").innerHTML = HTML;
	},
	filtra: function( event ){
		let parola = document.getElementById("paz_ricerca").value;
		for(let p in DB.pazienti.data){
			if(!DB.pazienti.data[p].Cancellato*1){
				if(	DB.pazienti.data[p].Nome.toLowerCase().indexOf(parola.toLowerCase()) == -1 && 
					DB.pazienti.data[p].Cognome.toLowerCase().indexOf(parola.toLowerCase()) == -1){
					document.getElementById("paziente_"+p).classList.add("nasPazRic");
				}else{
					document.getElementById("paziente_"+p).classList.remove("nasPazRic");
				}
			}
		}
		if(parola)document.getElementById("paz_ricerca").classList.add("filtro_attivo");
		else document.getElementById("paz_ricerca").classList.remove("filtro_attivo");
	},
	selPaziente: function( n ){ // seleziona il paziente su cui lavorare
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
				
			if(SCHEDA.formModificato){
				SCHEDA.formModificato = false;
				endChangeDetection();
			}		
			if( SCHEDA.classeAperta == 'scheda_A' ||
				SCHEDA.classeAperta == 'scheda_B' ||
				SCHEDA.classeAperta == 'scheda_paziente' ||
				SCHEDA.classeAperta == 'scheda_Riepi' || 
				SCHEDA.classeAperta == 'tab_punti' )SCHEDA.scaricaScheda();
				
			PAZIENTI.idCL = n*1;
			PAZIENTI.idPaziente = DB.pazienti.data[PAZIENTI.idCL].idPaziente;
			let sesso = sessi[DB.pazienti.data[PAZIENTI.idCL].sesso];
			document.getElementById("p_cartella").classList.add("clientAtt");
			//document.getElementById("elenchi_titolo").classList.add("clientAtt");
			document.getElementById("ico_cliente").style.backgroundImage = "url(img/ico_cliente_"+sesso+"B.png)";
			document.getElementById("ico_cliente").getElementsByTagName("i")[0].innerHTML = DB.pazienti.data[PAZIENTI.idCL].Nome+" "+DB.pazienti.data[PAZIENTI.idCL].Cognome;
			
			// cambio sesso al manichino
			/*
			
				TOLTO PER RENDERLO PIU' smart
			
			*/
			/*let pass = true;
			if(globals.modello.cartella){
				if( sesso == globals.modello.cartella ) pass = false;
				if(typeof(globals.set.modelli)!='undefined'){
					if( globals.set.modelli.indexOf(sesso) == -1 ) pass = false;
				}
			}else pass = false;
			if( pass ){
				if(sesso!='altro')cambiaModello( sesso );
				SCHEDA.selElenco('pazienti');
			}*/
			
			let d=new Date();
			pazSelMD5=MD5("P"+d);
			PAZIENTI.caricaTrattamenti();
			try{
				SET.leggiNote();
			}catch(err){}
			SCHEDA.setTriploLivello('pazienti');
		}});
	},
	deselPaziente: function(){ // deseleziona il paziente su cui si sta lavorando
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			endChangeDetection();
			if( SCHEDA.classeAperta == 'scheda_A' ||
				SCHEDA.classeAperta == 'scheda_B' ||
				SCHEDA.classeAperta == 'scheda_paziente' ||
				SCHEDA.classeAperta == 'scheda_Riepi' ||
				SCHEDA.classeAperta == 'scheda_saldo' ||
				SCHEDA.classeAperta == 'tab_punti' )SCHEDA.scaricaScheda();
			PAZIENTI.trattSel = null;
			PAZIENTI.trattOp = false;
			PAZIENTI.cicli = [];
			PAZIENTI.idCL = -1;
			PAZIENTI.idPaziente = -1;
			PAZIENTI.caricaPazienti();
			PAZIENTI.aperture = [];
			document.getElementById("p_cartella").classList.remove("clientAtt");
			//document.getElementById("elenchi_titolo").classList.remove("clientAtt");
			document.getElementById("p_cartella").getElementsByTagName("i")[0].innerHTML = TXT("ElGestionale");
			try{
				SET.leggiNote();
			}catch(err){}
			SCHEDA.setTriploLivello('pazienti');
			//if(mouseDetect)document.getElementById("paz_ricerca").focus();
		}});
	},
	chiudiPaziente: function( idPaziente ){ // chiude la scheda anagrafica
		SCHEDA.formModificato = false;
		PAZIENTI.pazOp = false;
			
		// tolgo il blocco online dall'elemento
		if(typeof(idPaziente)!='undefined')LOGIN.closeLocked("pazienti",idPaziente);
	},
	intestazionePaziente: function( tipo ){ // nome e pulsanti in alto quando il paziente e selezionato
		let PZ = DB.pazienti.data[PAZIENTI.idCL],
			HTML='';
		
		// nome cliente
		HTML += '<p class="trattNomeCliente' + ( PZ.avatar ? ' conAvatar' : '' ) + '"';
		if(PZ.sesso){
			HTML += ' style="background-image:url(img/ico_cliente_'+sessi[PZ.sesso]+'.png);"';
		}
		HTML += '><span id="nomeCliente" onClick="PAZIENTI.vis_paziente();" title="'+TXT("Anagrafica")+'">'+htmlEntities(PZ.Nome)+"<br>"+htmlEntities(PZ.Cognome);
		if(PZ.DataModifica > DB.pazienti.lastSync)HTML += H.imgSyncro();
		HTML += '</span>';
		
		HTML += '<span id="btnAnagraficaCliente" onClick="PAZIENTI.vis_paziente();" title="'+TXT("Anagrafica")+'"></span>' +
				'<span id="esciCliente" onClick="PAZIENTI.deselPaziente();" title="'+TXT("Chiudi")+'"></span>';
		if(PZ.avatar){
			HTML += '<span onClick="PAZIENTI.vis_paziente();" class="avatarMini" style="background-image:url(\''+PZ.avatar+'\');"></span>';
		}
		HTML += '</p>';
		
		// pulsanti trattamenti e saldi
		HTML += '<p class="trattBtns"><span id="pazBtnTratt" ';
		if(tipo == 't')HTML += 'class="selBtn" ';
		else HTML += 'onClick="PAZIENTI.caricaTrattamenti();"';
		HTML += '>'+TXT("ElTrattamenti").toUpperCase()+'</span> <span id="pazBtnSaldi" ';
		if(tipo == 's')HTML += 'class="selBtn" ';
		else HTML += 'onClick="PAZIENTI.caricaSaldi();"';
		HTML += '>'+TXT("ElSaldi").toUpperCase()+'</span></p>';
		
		return HTML;
	},
	riselSex: function(){
		let newSex = 'uomo',
			sesso = document.getElementById("sesso").value;
		if(sesso)newSex = sessi[sesso];
		document.getElementById("avatarPaziente").style.backgroundImage = 'url(img/avatar_'+newSex+'.jpg)';
	},
	car_paziente: function( salvato ){ // carica la scheda anagrafica del paziente
		// verifico le autorizzazioni
		let maxPazienti = PAZIENTI.maxPazientiFree,
			addMaxTxt = 'Free';
		if(LOGIN.reg() && LOGIN.logedin()){
			if(DB.login.data.auths.indexOf("clients_full")>-1)maxPazienti = -1;
			else{
				maxPazienti = PAZIENTI.maxPazientiLogged;
				addMaxTxt = 'Logged';
			}
		}
		if(maxPazienti>-1 && PAZIENTI.idCL==-1){
			let tPaz = 0;
			for(let c in DB.pazienti.data){
				if(DB.pazienti.data[c].Cancellato*1==0)tPaz++;
			}
			if(tPaz >= maxPazienti && !document.body.classList.contains("pplhd")){
				ALERT(TXT("MsgMaxPazienti"+addMaxTxt).replace("[n]",PAZIENTI.maxPazientiLogged));
				return;
			}
		}
		// --------------------------
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			MENU.nasMM();
			let idPaziente=0,
				Nome='',
				Cognome='',
				Indirizzo='',
				CAP='',
				Citta='',
				Provincia='',
				Stato='',
				Telefono='',
				Cellulare='',
				paeseCellulare='',
				Email='',
				sesso='',
				NotePaziente='',
				DataNascita=0,
				LuogoNascita='',
				tags=[],
				etichette=[],
				medicine=[],
				allergie=[],
				patologie=[],
				interventi=[],
				gallery=[],
				Provenienza='',
				Professione='',
				Social='',
				Intestazione='',
				CodiceFiscale='',
				PartitaIva='',
				avatar='',
				Altezza='',
				Peso='';
			if(PAZIENTI.idCL>-1){
				let PZ = DB.pazienti.data[PAZIENTI.idCL];
				idPaziente = PZ.idPaziente;
				Nome = PZ.Nome;
				Cognome = PZ.Cognome;
				Indirizzo = PZ.Indirizzo;
				CAP = PZ.CAP;
				Citta = PZ.Citta;
				Provincia = PZ.Provincia;
				Stato = PZ.Stato;
				Telefono = PZ.Telefono;
				Cellulare = __(PZ.Cellulare);
				paeseCellulare = __(PZ.paeseCellulare);
				Email = PZ.Email;
				sesso = PZ.sesso;
				NotePaziente = PZ.NotePaziente;
				DataNascita = PZ.DataNascita;
				if(DataNascita!='0000-00-00')DataNascita = new Date(DataNascita)/1000;
				else DataNascita = 0;
				LuogoNascita = __(PZ.LuogoNascita);
				tags = toJson(PZ.tags);
				etichette = toJson(PZ.etichette);
				medicine = toJson(PZ.medicine);
				allergie = toJson(PZ.allergie);
				patologie = toJson(PZ.patologie);
				interventi = toJson(PZ.interventi);
				gallery=__(PZ.gallery,[]);
				Provenienza = PZ.Provenienza;
				Professione = PZ.Professione;
				Social = PZ.Social;
				Intestazione = PZ.Intestazione;
				CodiceFiscale = __(PZ.CodiceFiscale);
				PartitaIva = __(PZ.PartitaIva);
				avatar = PZ.avatar;
				if(typeof(avatar) == 'undefined')avatar = '';
				Altezza = __(PZ.Altezza,'');
				Peso = __(PZ.Peso,'');
			}else{
				if(typeof(DB.login.data.Stato)!='undefined'){
					if(DB.login.data.Stato.trim()){
						Stato = DB.login.data.Stato;
						paeseCellulare = DB.login.data.Stato;
					}
				}
			}
			PAZIENTI.tagsProvvisori = clone(tags);
			H.etichetteProvvisorie = clone(etichette);
			PAZIENTI.medicineProvvisorie = clone(medicine);
			PAZIENTI.allergieProvvisorie = clone(allergie);
			PAZIENTI.patologieProvvisorie = clone(patologie);
			PAZIENTI.interventiProvvisori = clone(interventi);
			PH.galleryProvvisoria=gallery;
			
			let HTML = '';
			HTML += '<form id="formMod"' +
					'	   name="formMod"' +
					'	   method="post"' +
					'	   onSubmit="return false;">';
					
			// Campi nascosti
			HTML += H.r({	t: "h", name: "stessa",	value: "1" });
			HTML += H.r({	t: "h", name: "idPaziente",	value: idPaziente*1 });
			
			// avatar
			let sessoAvatar = 'uomo';
			if(sesso)sessoAvatar = sessi[sesso];
			HTML += '	<div>' +
					'		<div onClick="this.classList.toggle(\'avatarBig\');"' +
					'		   	 id="avatarPaziente"' +
					'		   	 class="avatar"'+
					'			 style="background-image:url(img/avatar_'+sessoAvatar+'.jpg);">' +
					'			<div style="background-image:url(\''+avatar+'\')"></div>' +
					'		</div>' +
					'		<div style="float:left;height: 120px;">' +
					'			<input class="ico_foto"' +
					'				   id="avatarPaziente_FL"' +
					'				   type="file"' +
					'				   onchange="PH.encodeImageFileAsURL(this, true, false, \'PAZIENTI.salvaAvatar\');"' +
					'				   title="'+htmlEntities(TXT("CaricaImmagine"))+'" />' +
					'			<div class="ico_del"' +
					'			   	 id="delAvatarPaziente"' +
					'			   	 onClick="PAZIENTI.deleteAvatar();"' +
					'			   	 style="'+(!avatar ? 'display:none;' : '')+'"></div>' +
					'		</div>' +
					'	</div>' +
					'	<div class="l"></div>';
			
			
			// Campi
			HTML += H.r({	t: "r", name: "Nome",	value: Nome,	classRiga: 'schSx', labelOut: true,	ver: "1|0" });
			HTML += H.r({	t: "r", name: "Cognome",	value: Cognome,	classRiga: 'schDx', labelOut: true });
			HTML += '<div class="l"></div>';
			
			
			HTML += '<div class="sezioneTrattamenti divEspansa "' +
					'	  style="background:transparent !important;' +
					'	  border-top:none !important;' +
					'	  padding: 0px;"></div>';
					
					
					
			
			// sezione ANAGRAFICI
			let cont = '';
			cont += H.r({	t: "s", 
							name: "sesso",
							value: sesso,
							opts: { "m": TXT("Maschio"), "f": TXT("Femmina"), "a": TXT("Altro") },
							label: TXT("Sesso"),
							id: "selectPaz",
							classRiga: "labelSx",
							onChange: 'PAZIENTI.riselSex();' });
					
			cont += H.r({	t: "d",
							name: "DataNascita",
							value: DataNascita,
							classRiga: "labelSx" });
							
			cont += H.r({	t: "r", name: "LuogoNascita",	value: LuogoNascita,	classCampo: 'styled' });
							
			HTML += H.sezione({
				label: TXT("LabelAnagrafici"),
				nome: 'anagrafici',
				html: cont,
				etichette: true
						});	
					
			// sezione INDIRIZZO
			cont = '';
			cont += H.r({	t: "r", name: "Indirizzo",	value: Indirizzo,	classCampo: 'styled' });
			
			cont += '<div>';
			cont += H.r({	t: "r",
							name: "Citta",
							value: Citta,
							classRiga: 'contCitta',
							classCampo: 'styled' });
			cont += H.r({	t: "r",
							name: "Provincia",
							value: Provincia,
							classRiga: 'contProvincia',
							classCampo: 'styled' });
			cont += '</div><div>';
			cont += H.r({	t: "r", name: "CAP",
							value: CAP,
							classRiga: 'contCAP',
							classCampo: 'styled' });
			cont += H.r({	t: "s", 
							name: "Stato",
							value: Stato,
							opts: elencaPaesi(),
							label: TXT("Stato"),
							classRiga: 'contStato',
							classCampo: "selectLargo" });
			cont += '</div>';
							
			HTML += H.sezione({
				label: TXT("LabelIndirizzo"),
				nome: 'indirizzo',
				html: cont,
				etichette: true
						});		
			
			// sezione CONTATTI
			cont = '';	
			cont += H.r({	t: "r",
							name: "Telefono",
							value: Telefono,
							classCampo: 'styled',
							ver: '0|0|tel'});
			
			
			cont += '		<div>' +
					'			<i>'+htmlEntities(TXT("Cellulare"))+'</i>' +
					'			<select name="paeseCellulare"' +
					'					id="paeseCellulare"' +
					'					class="prefisso">' +
					'				<option></option>';
					
				for(let p in DB.INT.paesi){
					let isSelected = '';
					if(paeseCellulare == p)isSelected = ' SELECTED';
					cont += '		<option'+isSelected +
							'				value="'+p+'">'	+
							DB.INT.paesi[p].prefisso +
								' &nbsp; &nbsp; &nbsp; (' +
								htmlEntities(DB.INT.paesi[p][globals.siglaLingua])+')' +
							'		</option>'+H.chr10;
				}
			cont += '			</select>' +
					'			<input  id="@|Cellulare|0|0|tel"' +
					'					type="text"' +
					'					name="Cellulare"' +
					'					placeholder="'+htmlEntities(TXT("Cellulare"))+'"' +
					'					value="'+htmlEntities(Cellulare)+'"' +
					'					data-pre-value="'+htmlEntities(Cellulare)+'"' +
					'					onKeyUp="return H.keyTelefono(this,false);"' +
					'					class="cellulare"' + H.noAutoGen+'>' +
					'		</div>';
							
			cont += H.r({	t: "r",
							name: "Email",
							value: Email,
							classCampo: 'styled',
							ver: '0|0|@' });
			HTML += H.sezione({
				label: TXT("LabelContatti"),
				nome: 'contatti',
				html: cont,
				etichette: true
						});	
										
			
			// sezione FATTURAZIONE
			cont = '';	
			cont += H.r({	t: "t", 
							name: "Intestazione",
							classCampo: "Intestazione",
							value: Intestazione,
							label: TXT("IntestazioneSpiegazione"),
							noLabel: true,
							classCampo: "okPlaceHolder" });
			cont += H.r({	t: "r", name: "CodiceFiscale",	value: CodiceFiscale,	classCampo: 'styled' });
			cont += H.r({	t: "r", name: "PartitaIva",	value: PartitaIva,	classCampo: 'styled' });
			
			HTML += H.sezione({
				label: TXT("LabelFatturazione"),
				nome: 'azienda',
				html: cont,
				etichette: true
						});	
								
			
			// sezione INFO AGGIUNTIVE
			cont = '';
			cont += H.r({	t: "r",
							name: "Provenienza",
							value: Provenienza,
							classCampo: 'styled',
							clickCampo: 'H.creaCombo(this,H.getElencoDB(DB.pazienti.data,this));',
							focusCampo: 'H.creaCombo(this,H.getElencoDB(DB.pazienti.data,this));' });
							
			cont += H.r({	t: "r",
							name: "Professione",
							value: Professione,
							classCampo: 'styled',
							clickCampo: 'H.creaCombo(this,H.getElencoDB(DB.pazienti.data,this));',
							focusCampo: 'H.creaCombo(this,H.getElencoDB(DB.pazienti.data,this));' });
			
							
			cont += H.r({	t: "r",
							name: "Social",
							value: Social,
							classCampo: 'styled',
							clickCampo: 'H.creaCombo(this,H.getElencoDB(DB.pazienti.data,this));',
							focusCampo: 'H.creaCombo(this,H.getElencoDB(DB.pazienti.data,this));' });
							
			HTML += H.sezione({
				label: TXT("LabelAggiuntive"),
				nome: 'aggiuntive',
				html: cont,
				etichette: true
						});	
			
			// sezione TAGS
			cont = '';
			cont += '		<div id="contTags">' +
					'		</div>' +
					'		<div id="cont_tag_add">' +
					'			<input type="text"' +
					'				   id="tag_add"' +
					'				   placeholder="'+htmlEntities(TXT("TagsSpiegazione"))+'"' +
					'				   onKeyup="PAZIENTI.filtraTag(this);"'+H.noAutoGen+'/>' +
					'			<span id="tag_col"' +
					'				  onClick="PAZIENTI.cambiaColTag(this);"' +
					'				  data-colore="FFFFFF"' +
					'				  style="background-color:#FFFFFF;"/>' +
					'			</span>' +
					'			<div class="p_tag_ann"' +
					'				 onClick="PAZIENTI.annullaTag();">' +
									TXT("Annulla") +
					'			</div>' +
					'			<div class="p_tag_add"' +
					'				 onClick="PAZIENTI.aggiungiTag(this);">' +
									TXT("Nuovo") +
					'			</div>' +
					'			<div id="elencoTags">' +
					'			</div>' +
					'			<div class="l"></div>' +
					'		</div>';
			
			HTML += H.sezione({
				label: TXT("Tags"),
				nome: 'tags',
				html: cont
						});	
			
			HTML += '<div class="sezioneTrattamenti divEspansa "' +
					'	  style="' +
					'	  border-top: none !important;' +
					'	  height:20px;' +
					'	  padding: 0px;' +
					'	  background-color: rgba(0,0,0,0.15);"></div>';
						
			// sezione BIOMETRICI
			cont = '';
			cont += H.r({	t: "r", name: "Altezza",	value: Altezza,	classCampo: 'styled', ver: '0|0|num' });
			cont += H.r({	t: "r", name: "Peso",	value: Peso,	classCampo: 'styled', ver: '0|0|num' });
							
			HTML += H.sezione({
				label: TXT("LabelBiometrici"),
				nome: 'biometrici',
				html: cont,
				etichette: true
						});	
			
			// sezione MEDICINE
			cont = '';
			cont += '		<div id="contMedicine">' +
					'		</div>' +
					'		<div id="cont_medicina_add">' +
					'			<input type="text"' +
					'				   id="medicina_add"' +
					'				   placeholder="'+htmlEntities(TXT("MedicineSpiegazione"))+'"' +
					'				   onKeyup="PAZIENTI.filtraElemento(\'medicine\',this);"'+H.noAutoGen+'/>' +
					'			<div class="p_medicina_ann"' +
					'				 onClick="PAZIENTI.annullaElemento(\'medicine\');">' +
									TXT("Annulla") +
					'			</div>' +
					'			<div class="p_medicina_add"' +
					'				 onClick="PAZIENTI.aggiungiElemento(\'medicine\',this);">' +
									TXT("Nuova") +
					'			</div>' +
					'			<div id="elencoMedicine">' +
					'			</div>' +
					'			<div class="l"></div>' +
					'		</div>';
			HTML += H.sezione({
				label: TXT("Medicine"),
				nome: 'medicine',
				html: cont
						});	
					
			// sezione ALLERGIE
			cont = '';
			cont += '		<div id="contAllergie">' +
					'		</div>' +
					'		<div id="cont_allergia_add">' +
					'			<input type="text"' +
					'				   id="allergia_add"' +
					'				   placeholder="'+htmlEntities(TXT("AllergieSpiegazione"))+'"' +
					'				   onKeyup="PAZIENTI.filtraElemento(\'allergie\',this);"'+H.noAutoGen+'/>' +
					'			<div class="p_allergia_ann"' +
					'				 onClick="PAZIENTI.annullaElemento(\'allergie\');">' +
									TXT("Annulla") +
					'			</div>' +
					'			<div class="p_allergia_add"' +
					'				 onClick="PAZIENTI.aggiungiElemento(\'allergie\',this);">' +
									TXT("Nuova") +
					'			</div>' +
					'			<div id="elencoAllergie">' +
					'			</div>' +
					'			<div class="l"></div>' +
					'		</div>';
			HTML += H.sezione({
				label: TXT("Allergie"),
				nome: 'allergie',
				html: cont
						});	
			
			// sezione PATOLOGIE
			cont = '';
			cont += '		<div id="contPatologie">' +
					'		</div>' +
					'		<div id="cont_patologia_add">' +
					'			<input type="text"' +
					'				   id="patologia_add"' +
					'				   placeholder="'+htmlEntities(TXT("PatologieSpiegazione"))+'"' +
					'				   onKeyup="PAZIENTI.filtraElemento(\'patologie\',this);"'+H.noAutoGen+'/>' +
					'			<div class="p_patologia_ann"' +
					'				 onClick="PAZIENTI.annullaElemento(\'patologie\');">' +
									TXT("Annulla") +
					'			</div>' +
					'			<div class="p_patologia_add"' +
					'				 onClick="PAZIENTI.aggiungiElemento(\'patologie\',this);">' +
									TXT("Nuova") +
					'			</div>' +
					'			<div id="elencoPatologie">' +
					'			</div>' +
					'			<div class="l"></div>' +
					'		</div>';
			HTML += H.sezione({
				label: TXT("Malattie"),
				nome: 'patologie',
				img: 'patologie2',
				html: cont
						});
			
			// sezione INTERVENTI
			cont = '';
			cont += '		<div id="contInterventi">' +
					'		</div>' +
					'		<div id="cont_intervento_add">' +
					'			<input type="text"' +
					'				   id="intervento_add"' +
					'				   placeholder="'+htmlEntities(TXT("InterventiSpiegazione"))+'"' +
					'				   onKeyup="PAZIENTI.filtraElemento(\'interventi\',this);"'+H.noAutoGen+'/>' +
					'			<div class="p_intervento_ann"' +
					'				 onClick="PAZIENTI.annullaElemento(\'interventi\');">' +
									TXT("Annulla") +
					'			</div>' +
					'			<div class="p_intervento_add"' +
					'				 onClick="PAZIENTI.aggiungiElemento(\'interventi\',this);">' +
									TXT("Nuovo") +
					'			</div>' +
					'			<div id="elencoInterventi">' +
					'			</div>' +
					'			<div class="l"></div>' +
					'		</div>';
			HTML += H.sezione({
				label: TXT("Interventi"),
				nome: 'interventi',
				html: cont
						});	
						
			HTML += '<div class="sezioneTrattamenti divEspansa "' +
					'	  style="' +
					'	  border-top: none !important;' +
					'	  height:20px;' +
					'	  padding: 0px;' +
					'	  background-color: rgba(0,0,0,0.15);"></div>';
					
			
			
			
			
			
			// GALLERY
			let ext = "",
				listaEstensioni = PH.listaEstensioni;
			if(LOGIN.logedin())listaEstensioni = listaEstensioni.concat(PH.listaEstensioniFiles);
			for(let e in listaEstensioni){
				ext += listaEstensioni[e].toUpperCase().split("/")[1]+", ";
			}
			ext = ext.substr(0,ext.length-2);
			cont = 	'	<div id="contGallery"' +
					'		 class="divEspansa contGallery">' +
					'	</div>' +
					'	<div id="p_add_dett"' +
					'		 style="margin-top: 0px;">' +
					'		<input type="file"' +
					'			   id="fileProvv_FL"' +
					'			   class="p_paz_file"' +
					'		       onChange="PH.selezionaFile(this);">' +
					'		<span id="addFile">' +
								TXT("AggiungiFile") +
					'		</span>' +
					'		<span class="p_paz_choose"' +
					'		      onClick="MENU.visArchives();"></span>' +
					'		<span id="chooFile">' +
								TXT("ScegliFile") +
					'		</span>' +
					'	</div>' +
					'	<div class="allowedFormats">* '+TXT("FormatiConsentiti")+": "+ext+'</div>';
					
			HTML += H.r({	t: "h", name: "totFiles",	value: "0" });
			HTML += H.sezione({
				label: TXT("Gallery"),
				nome: 'files',
				addFunct: 'PH.resizeDida();',
				html: cont
						});	
			
			
			// sezione ANNOTAZIONI
			cont = '';
			cont += H.r({	t: "t", 
							name: "NotePaziente",
							value: NotePaziente,
							label: TXT("InserisciNote"),
							noLabel: true,
							classCampo: "okPlaceHolder" });
					
			HTML += H.sezione({
				label: TXT("LabelAnnotazioni"),
				nome: 'annotazioni',
				html: cont
						});		
			
			let azAnnulla = PAZIENTI.idCL>-1 ? "PAZIENTI.vis_paziente();" : "SCHEDA.scaricaScheda();",
				azElimina = PAZIENTI.idCL>-1 ? "PAZIENTI.el_paziente("+PAZIENTI.idCL+");" : "",
				btnAdd = '';
			if(azElimina){
				btnAdd += '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+TXT("EliminaScheda")+'</div>';
			}
			btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.patients.data\')">' +
							TXT("ReferenceGuide") +
						'</div>';
			
			HTML += SCHEDA.pulsantiForm(
									azElimina,
									azAnnulla, 
									"if(H.verData(\'DataNascita\'))PAZIENTI.mod_paziente();" );
			
			HTML += '</form>';
			
			
			let titoloDef=TXT("ModificaPaziente");
			if(PAZIENTI.idCL==-1)titoloDef=TXT("CreaPaziente");
			
			SCHEDA.caricaScheda(	stripslashes(titoloDef),
									HTML,
									'PAZIENTI.chiudiPaziente('+idPaziente+');',
									'scheda_paziente',
									false,
									true,
									'',
									btnAdd );
									
			initChangeDetection( "formMod" );
			
			if(mouseDetect)document.formMod.Nome.focus();
	
			SCHEDA.formModificato = false;
			PAZIENTI.caricaTags();
			PAZIENTI.popolaTags();
			
			// CARICA  e POPOLA ETICHETTE
			H.caricaEtichette('anagrafici');
			H.caricaEtichette('biometrici');
			H.caricaEtichette('indirizzo');
			H.caricaEtichette('contatti');
			H.caricaEtichette('azienda');
			H.caricaEtichette('aggiuntive');
			
			
			PAZIENTI.caricaElementi('medicine');
			PAZIENTI.popolaElementi('medicine');
			PAZIENTI.caricaElementi('allergie');
			PAZIENTI.popolaElementi('allergie');
			PAZIENTI.caricaElementi('patologie');
			PAZIENTI.popolaElementi('patologie');
			PAZIENTI.caricaElementi('interventi');
			PAZIENTI.popolaElementi('interventi');
			PH.caricaGallery();
			
			if(salvato)SCHEDA.msgSalvataggio();
			
			// verifico che non sia già aperta da qualcun altro e intanto la blocco
			LOGIN.verifyLocked("pazienti",idPaziente);
		}});
	},
	vis_paziente: function( salvato ){ // carica la scheda anagrafica del paziente
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
						
			SCHEDA.espandiElenco();
			
			if(typeof(salvato) == 'undefined')salvato = false;
			endChangeDetection( "formMod" );
			SCHEDA.formModificato = false;
						
			let PZ = DB.pazienti.data[PAZIENTI.idCL];
			idPaziente = PZ.idPaziente;
			Nome = PZ.Nome;
			Cognome = PZ.Cognome;
			Indirizzo = PZ.Indirizzo;
			CAP = PZ.CAP;
			Citta = PZ.Citta;
			Provincia = PZ.Provincia;
			Stato = PZ.Stato;
			Telefono = PZ.Telefono;
			Cellulare = __(PZ.Cellulare);
			paeseCellulare = __(PZ.paeseCellulare);
			Email = PZ.Email;
			sesso = PZ.sesso;
			NotePaziente = PZ.NotePaziente;
			DataNascita = PZ.DataNascita;
			if(DataNascita!='0000-00-00')DataNascita = new Date(DataNascita);
			else DataNascita = 0;
			LuogoNascita = __(PZ.LuogoNascita);
			tags = toJson(PZ.tags);
			etichette = toJson(PZ.etichette);
			medicine = toJson(PZ.medicine);
			allergie = toJson(PZ.allergie);
			patologie = toJson(PZ.patologie);
			interventi = toJson(PZ.interventi);
			gallery=__(PZ.gallery,[]);
			Provenienza = PZ.Provenienza;
			Professione = PZ.Professione;
			Social = PZ.Social;
			Intestazione = PZ.Intestazione;
			CodiceFiscale = __(PZ.CodiceFiscale);
			PartitaIva = __(PZ.PartitaIva);
			avatar = PZ.avatar;
			if(typeof(avatar) == 'undefined')avatar = '';
			Altezza = __(PZ.Altezza,'');
			Peso = __(PZ.Peso,'');
			PAZIENTI.medicineProvvisorie = clone(medicine);
			PAZIENTI.allergieProvvisorie = clone(allergie);
			PAZIENTI.patologieProvvisorie = clone(patologie);
			PAZIENTI.interventiProvvisori = clone(interventi);
			PH.galleryProvvisoria=gallery;
		
			let eta = DataNascita ? oggi.getFullYear() - DataNascita.getFullYear() : '',
				HTML = '';
			
			// avatar
			let sessoAvatar = sesso ? sessi[sesso] : 'uomo';
			HTML += '<div id="pazienti_vis">' +
					'	<div>' +
					'		<div onClick="this.classList.toggle(\'avatarBig\');"' +
					'		   	 id="avatarPaziente"' +
					'		   	 class="avatar"'+
					'			 style="background-image:url(img/avatar_'+sessoAvatar+'.jpg);">' +
					'			<div style="background-image:url(\''+avatar+'\')">';
					
			HTML += '			</div>' +
					'		</div>' +
					'		<div id="pazienti_head">' +
					'			<h1>'+htmlEntities(Nome+" "+Cognome)+'</h1>' +
					'			<p>';
			if(Telefono.trim()){
				HTML += '			<i>'+htmlEntities(TXT("Telefono"))+':</i> ' +
									htmlEntities(Telefono)+'<br>';
			}
			if(Cellulare.trim()){
				HTML += '			<i>'+htmlEntities(TXT("Cellulare"))+':</i> ' +
									htmlEntities(DB.INT.paesi[paeseCellulare].prefisso + " " +Cellulare)+'<br>';
			}
			if(Email.trim()){
				HTML += '			<i>'+htmlEntities(TXT("Email"))+':</i> ' +
									htmlEntities(Email)+'<br>';
			}
			if(DataNascita){
				HTML += '			<i>'+htmlEntities(TXT("Eta"))+':</i> ' +
									eta+' '+htmlEntities(TXT("Anni"))+'<br>';
			}
			HTML += '			</p>' +
					'		</div>' +
					'		<span id="modAnag"' +
					'			  onClick="PAZIENTI.car_paziente();"' +
					'			  class="noPrint">' +
								htmlEntities(TXT("modifica")) +
					'		</span>' +
					'	</div>';
			// TAGS	
			if(tags.length){
				
				HTML +=	'<div class="contAnag tags_head">';
						
				for(let p in tags){
					HTML += '<span class="tag"' +
							'	   style="background-color:#'+tags[p].colore+';">' +
								htmlEntities(tags[p].NomeTag) +
							'</span>';
				}	
				HTML += '	</div>' +
						'<div class="l"></div>';
				
			}
			HTML += '	<div class="l"></div>';
			
			
			if(NotePaziente.trim()){
				HTML += '	<div id="noteAnag">' +
								htmlEntities(NotePaziente).replace(/\n/gi,'<br>') +
						'	</div>';
			}
			
			
			let H__1 = '';
			
			// INDIRIZZO
			if(	Indirizzo.trim() || 
				CAP.trim() ||
				Citta.trim() ||
				Provincia.trim() ||
				Stato.trim() ){
				H__1 +=	'	<div class="rgAnag rgIndirizzo">' +
						'			<div class="contAnag">';
			
				H__1 +=	htmlEntities(Indirizzo)+'<br>' +
						htmlEntities(CAP)+' '+htmlEntities(Citta);
				if(Provincia)H__1 += ' ('+htmlEntities(Provincia)+')';
				if(Stato){
					H__1 += 	'<br>(';
					if(Stato.length==2)H__1 +=		htmlEntities(DB.INT.paesi[Stato][globals.siglaLingua]);
					else H__1 +=		htmlEntities(Stato);
					H__1 +=		')';
				}
				H__1 += H.scriviEtichette('indirizzo');
				H__1 += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
			}
			
			// ANAGRAFICA
			let HTML_provv = '';
			if(	DataNascita ){
				HTML_provv += '<div><i>'+htmlEntities(TXT("DataNascita"))+':</i> ' + getDataTS(DataNascita*.001)+ '</div>';
			}
			if(LuogoNascita.trim()){
				HTML_provv += '<div><i>'+htmlEntities(TXT("LuogoNascita"))+':</i> ' + htmlEntities(LuogoNascita) + '</div>';
			}
			HTML_provv += H.scriviEtichette('anagrafici');
			if(	HTML_provv )H__1 +=
					'	<div class="rgAnag rgAnagrafici">' +
					'		<div class="contAnag">' +
								HTML_provv +
					'		</div>' +
					'		<div class="l"></div>' +
					'	</div>';
			
			// CONTATTI
			HTML_provv = '';
			HTML_provv += H.scriviEtichette('contatti');
			if(	HTML_provv )H__1 +=
					'	<div class="rgAnag rgContatti">' +
					'		<div class="contAnag">' +
								HTML_provv +
					'		</div>' +
					'		<div class="l"></div>' +
					'	</div>';
			
			// AZIENDA
			HTML_provv = '';
			if(	Intestazione.trim() ){
				HTML_provv += '<div>' + htmlEntities(Intestazione).replace(/\n/g, '<br>')+ '</div>';
			}
			if(PartitaIva.trim()){
				HTML_provv += '<div><i>'+htmlEntities(TXT("PartitaIva"))+':</i> ' + htmlEntities(PartitaIva) + '</div>';
			}
			if(CodiceFiscale.trim()){
				HTML_provv += '<div><i>'+htmlEntities(TXT("CodiceFiscale"))+':</i> ' + htmlEntities(CodiceFiscale) + '</div>';
			}
			HTML_provv += H.scriviEtichette('azienda');
			
			if(HTML_provv)H__1 +=
					'	<div class="rgAnag rgAzienda">' +
					'		<div class="contAnag">' +
								HTML_provv +
					'		</div>' +
					'		<div class="l"></div>' +
					'	</div>';
			
			// AGGIUNTIVE
			HTML_provv = '';
			if(Professione.trim()){
				HTML_provv += '<div><i>'+htmlEntities(TXT("Professione"))+':</i> ' + htmlEntities(Professione) + '</div>';
			}
			if(Provenienza.trim()){
				HTML_provv += '<div><i>'+htmlEntities(TXT("Provenienza"))+':</i> ' + htmlEntities(Provenienza) + '</div>';
			}
			if(Social.trim()){
				HTML_provv += '<div><i>'+htmlEntities(TXT("Social"))+':</i> ' + htmlEntities(Social) + '</div>';
			}
			HTML_provv += H.scriviEtichette('aggiuntive');
			if(HTML_provv)H__1 +=
					'	<div class="rgAnag rgAggiuntive">' +
					'			<div class="contAnag">' +
								HTML_provv +
					'			</div>' +
					'		<div class="l"></div>' +
					'	</div>';
			
			// scheda medica
			let H__2 = '';
			
			// BIOMETRICI
			HTML_provv = '';
			if(Altezza.trim()){
				HTML_provv += '<div><i>'+htmlEntities(convertMisure(TXT("Altezza")))+':</i> ' + htmlEntities(Altezza) + '</div>';
			}
			if(Peso.trim()){
				HTML_provv += '<div><i>'+htmlEntities(convertMisure(TXT("Peso")))+':</i> ' + htmlEntities(Peso) + '</div>';
			}
			HTML_provv += H.scriviEtichette('biometrici');
			
			
			if(HTML_provv)H__2 +=
					'	<div class="rgAnag rgBiometrici">' +
					'		<div class="etRgAnag">' + htmlEntities(TXT("LabelBiometrici")) + '</div>' +
					'		<div style="padding-left:6px;padding-bottom:10px;">' +
								HTML_provv +
					'		</div>' +
					'		<div class="l"></div>' +
					'	</div>';
			
			
			obj = PAZIENTI.defElemento( 'medicine' );
			if(obj.ELS.length>0){
				
				H__2 +=	'	<div class="rgAnag rgMedicine">' +
						'			<div>';
				for(let p in obj.ELS){
					H__2 += '<span class="tag" style="background-color:#FFF;">' +
								htmlEntities(obj.ELS[p].NomeMedicina) +
							'</span>';
				}
				H__2 += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
			}
			
			
			obj = PAZIENTI.defElemento( 'allergie' );
			if(obj.ELS.length>0){
				
				H__2+=	'	<div class="rgAnag rgAllergie">' +
						'			<div>';
				for(let p in obj.ELS){
					H__2 += '<span class="tag" style="background-color:#FFF;">' +
								htmlEntities(obj.ELS[p].NomeAllergia) +
							'</span>';
				}
				H__2 += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
			}
			
			
			obj = PAZIENTI.defElemento( 'patologie' );
			if(obj.ELS.length>0){
				
				H__2 +=	'	<div class="rgAnag rgPatologie">' +
						'			<div>';
				for(let p in obj.ELS){
					H__2 += '<span class="tag" style="background-color:#FFF;">' +
								htmlEntities(obj.ELS[p].NomePatologia) +
							'</span>';
				}
				H__2 += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
			}
			
			
			obj = PAZIENTI.defElemento( 'interventi' );
			if(obj.ELS.length>0){
				
				H__2 +=	'	<div class="rgAnag rgInterventi">' +
						'			<div>';
				for(let p in obj.ELS){
					H__2 += '<span class="tag" style="background-color:#FFF;">' +
								htmlEntities(obj.ELS[p].NomeIntervento) +
							'</span>';
				}
				H__2 += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
			}
				
			
			
					
				
			HTML +=	'<div class="schSx">';	
			HTML += H__1;	
			HTML += '	<div class="l"></div>' +
					'</div>';	
			if(H__2){
				HTML += '<div class="schDx schMedica">' +
						H__2 +
						'</div>' +
						'<div class="l"></div>';
			}
					
			
			// GALLERY
			HTML += '<div id="contGallery" class="contGallery"></div>';
			
			
			let azElimina = PAZIENTI.idCL>-1 ? "PAZIENTI.el_paziente("+PAZIENTI.idCL+");" : "",
				btnAdd = '';
			if(azElimina){
				btnAdd += '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+TXT("EliminaScheda")+'</div>';
			}
			btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.patients.data\')">' +
							TXT("ReferenceGuide") +
						'</div>';
			
			SCHEDA.caricaScheda(	stripslashes(TXT("Anagrafica")),
									HTML,
									'PAZIENTI.chiudiPaziente('+idPaziente+');',
									'scheda_paziente',
									false,
									true,
									'',
									btnAdd );
			PH.caricaGallery(true,'',false,true);
			
			if(salvato)SCHEDA.msgSalvataggio();
		}});
	},
	mod_paziente: function(){ //salva l'anagrafica paziente
		if(!verifica_form(document.getElementById("formMod")))return;
		stopAnimate(true);
		if(document.formMod.Cellulare.value && !document.formMod.paeseCellulare.value){
			ALERT(stripslashes(TXT("ErrorePrefisso")));
			return;
		}
		visLoader(TXT("SalvataggioInCorso"),'loadingLight');
		let DataModifica = DB.pazienti.lastSync+1,
			d = new Date(),
			md5 = MD5("P"+d),
			postAction = '',
			avatar = document.getElementById("avatarPaziente").getElementsByTagName("div")[0].style.backgroundImage;
		if(avatar)avatar = avatar.split(avatar[4])[1].replace(location.origin+location.pathname,'');
		if(typeof(avatar) == 'undefined')avatar = '';
		
		GiornoNascita = document.formMod.giornoDataNascita.value;
		MeseNascita = document.formMod.meseDataNascita.value;
		AnnoNascita = document.formMod.annoDataNascita.value;
		DataNascita = '0000-00-00';
		if(GiornoNascita && MeseNascita && AnnoNascita){
			DataNascita=AnnoNascita+"-"+MeseNascita+"-"+GiornoNascita;
		}
		
		
		// salvo le immagini
		//let f = 0;
		let GA = PH.galleryProvvisoria;
		for(let i in GA){
			GA[i].Dida = document.getElementById("Dida"+i).value;
			if(typeof(GA[i].imgMini) != 'undefined' && GA[i]!=null && GA[i].imgMini!=null){
				
				// salvo l'immagine nel DB locale
				DB.files.data.push({
					idFile: GA[i].idFile,
					imgMini: GA[i].imgMini,
					imgBig: GA[i].imgBig,
					frv: (LOGIN._frv()!='')
				});
				let NG = {
					idFile: GA[i].idFile,
					Dida: GA[i].Dida
				}
				GA[i] = NG;
			}
			delete(GA[i].imported);
		}
		
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files)).then(function(){
			JSNPUSH={ 	"idPaziente": document.formMod.idPaziente.value*1,
						"Nome": document.formMod.Nome.value.trim(),
						"Cognome": document.formMod.Cognome.value.trim(),
						"Indirizzo": document.formMod.Indirizzo.value.trim(),
						"CAP": document.formMod.CAP.value.trim(),
						"Citta": document.formMod.Citta.value.trim(),
						"Provincia": document.formMod.Provincia.value.trim(),
						"Stato": document.formMod.Stato.value.trim(),
						"Telefono": document.formMod.Telefono.value.trim(),
						"Cellulare": document.formMod.Cellulare.value.trim(),
						"paeseCellulare": document.formMod.paeseCellulare.value,
						"Email": document.formMod.Email.value.trim(),
						"sesso": document.formMod.sesso.value,
						"NotePaziente": document.formMod.NotePaziente.value,
						
						"DataNascita": DataNascita,
						"LuogoNascita": document.formMod.LuogoNascita.value.trim(),
						"tags": PAZIENTI.tagsProvvisori,
						"etichette": H.etichetteProvvisorie,
						"medicine": PAZIENTI.medicineProvvisorie,
						"allergie": PAZIENTI.allergieProvvisorie,
						"patologie": PAZIENTI.patologieProvvisorie,
						"interventi": PAZIENTI.interventiProvvisori,
						"Provenienza": document.formMod.Provenienza.value.trim(),
						"Professione": document.formMod.Professione.value.trim(),
						"Social": document.formMod.Social.value.trim(),
						"Intestazione": document.formMod.Intestazione.value,
						"avatar": avatar,
						"gallery": GA,
						
						"CodiceFiscale": document.formMod.CodiceFiscale.value.trim(),
						"PartitaIva": document.formMod.PartitaIva.value.trim(),
						"Altezza": document.formMod.Altezza.value.trim(),
						"Peso": document.formMod.Peso.value.trim(),
						
						"DataModifica": parseInt(DataModifica),
						"md5": md5,
						"trattamenti": [],
						"saldi": [],
						"selected": true,
						"Cancellato": 0,
						"frv": (LOGIN._frv()!='') };
				
			if(PAZIENTI.idCL>-1)document.getElementById("nomeCliente").innerHTML = 	htmlEntities(document.formMod.Nome.value)+"<br>" + 
																					htmlEntities(document.formMod.Cognome.value)		
			if(PAZIENTI.idCL*1>-1){
				// paziente esistente
				trattamentiProvvisori=DB.pazienti.data[PAZIENTI.idCL].trattamenti;
				saldiProvvisori=DB.pazienti.data[PAZIENTI.idCL].saldi;
				DB.pazienti.data[PAZIENTI.idCL]=JSNPUSH;
				DB.pazienti.data[PAZIENTI.idCL].trattamenti=trattamentiProvvisori;
				DB.pazienti.data[PAZIENTI.idCL].saldi=saldiProvvisori;
			}else{
				// nuovo paziente
				DB.pazienti.data.push(JSNPUSH);
				for(let p in DB.pazienti.data){
					DB.pazienti.data[p].id_interno=p;
					if(md5==DB.pazienti.data[p].md5)PAZIENTI.idCL=p;
				}
				postAction = 'PAZIENTI.selPaziente('+PAZIENTI.idCL+');';
			}
			
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				LOGIN.sincronizza(	'PAZIENTI.vis_paziente(true);' +
									'startAnimate();' +
									'nasLoader();' +
									'LOGIN.pulisciGallery();' +
									postAction );
			});
		});
		return false;
	},
	el_paziente: function( Q_idPaz ){ // elimina la scheda del paziente
		CONFIRM.vis(	TXT("ChiediEliminaPaziente"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
						
			stopAnimate(true);
			visLoader(TXT("SalvataggioInCorso"),'loadingLight');
			if(Q_idPaz>-1){
				let DataModifica = DB.pazienti.lastSync+1;
				DB.pazienti.data[Q_idPaz].DataModifica=parseInt(DataModifica);
				DB.pazienti.data[Q_idPaz].Cancellato=1;
				DB.pazienti.data[Q_idPaz].md5='';
				idPaziente = __(DB.pazienti.data[Q_idPaz].idPaziente,0);
				PAZIENTI.pazSelMD5='';
			}
			
			for(let n in DB.note.data){
				if(PAZIENTI.idCL == DB.note.data[n].idCL){
					DB.note.data[n].Cancellato = 1;
				}
			}
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				LOGIN.sincronizza( 	'startAnimate();' +
									'nasLoader();' +
									'PAZIENTI.caricaPazienti();' );
				PAZIENTI.idCL = -1;
				PAZIENTI.idPaziente = -1;
				PAZIENTI.chiudiPaziente(idPaziente);
				PAZIENTI.caricaPazienti();
				SCHEDA.scaricaScheda();
				try{
					SET.leggiNote();
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note));
				}catch(err){}
				LOGIN.pulisciGallery();
			});
		}});
	},
	azRicercaPazienti: function( p ){ // clic sul risultato della riceca
		if(PAZIENTI.idCL != -1)PAZIENTI.deselPaziente();
		PAZIENTI.selPaziente(p);
		SCHEDA.apriElenco('base');
		SCHEDA.selElenco('pazienti');
		RICERCHE.nascondiGlobal();
	},
	salvaAvatar: function( obj ){ // salva l'avatar nell'immagine
		obj = JSON.parse(obj);
		document.getElementById('avatarPaziente').getElementsByTagName('div')[0].style.backgroundImage="url('"+obj.imgMini+"')";
		document.getElementById('delAvatarPaziente').style.display = 'block';
		SCHEDA.formModificato = true;
	},
	deleteAvatar: function(){ // cancella l'avatar dall'immagine
		document.getElementById('avatarPaziente').getElementsByTagName('div')[0].style.backgroundImage="";
		document.getElementById('delAvatarPaziente').style.display = 'none';
		SCHEDA.formModificato = true;
	},
	
	// tags
	caricaTags: function(){ // carica i tags del paziente
		let HTML='';
		if(PAZIENTI.tagsProvvisori.length>0){
			for(let p in PAZIENTI.tagsProvvisori){
				HTML += '<div class="rgTagsMod"' +
						'	  data-id="'+PAZIENTI.tagsProvvisori[p].idTag+'">' +
						'	<span class="tag"' +
						'		  style="background-color:#'+PAZIENTI.tagsProvvisori[p].colore+';">' +
						'		<img src="img/ico_modifica_mini.png"' +
						'			 width="22"' +
						'			 height="22"' +
						'			 style="margin-right: -5px;' +
						/* '		  		    margin-top: -2px;' + */
						'		  		    cursor: pointer;"' +
						'			 align="absmiddle"' +
						'			 onClick="PAZIENTI.modificaTag(this);"' +
						'			 data-value="'+htmlEntities(PAZIENTI.tagsProvvisori[p].NomeTag)+'"' +
						'			 data-colore="'+PAZIENTI.tagsProvvisori[p].colore+'"' +
						'			 class="occhio">' +
								htmlEntities(PAZIENTI.tagsProvvisori[p].NomeTag) +
						'	</span>' +
						'	<img src="img/ico_cestino.png"' +
						'		 width="16"' +
						'		 height="16"' +
						'		 align="absmiddle"' +
						'		 style="float:right;' +
						'		 		margin:11px;' +
						'		 		cursor:pointer;' +
						'		 		opacity:0.5;"' +
						'		 title="'+TXT("DelDett")+'"' +
						'		 onClick="PAZIENTI.eliminaTag('+p+');"' +
						'		 class="occhio">' +
						'</div>';
			}
		}else{
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes")+'...' +
					'</div>';
		}
		document.getElementById('contTags').innerHTML = HTML;
	},
	aggiungiTag: function( el ){ // aggiunge un tag al paziente
		let txt = document.getElementById("tag_add").value,
			colore = document.getElementById("tag_col").dataset.colore,
			globalTags = PAZIENTI.getTags(),
			pass = txt.trim()=='' ? false : true,
			oldValue = oldColor = '';
		if(el.parentElement.getElementsByTagName("input")[0].dataset.oldValue){ // verifico se è in modifica con oldValue
			oldValue = el.parentElement.getElementsByTagName("input")[0].dataset.oldValue;
			oldColor = document.getElementById("tag_col").dataset.oldColor;
		}
		let els = document.getElementById("elencoTags").getElementsByClassName("elMod");
		for(let e in els){
			if(els[e].dataset){
				let val = els[e].dataset.value.toLowerCase();
				if(	val.trim() == txt.toLowerCase().trim() && !oldValue ){
					PAZIENTI.selezionaTag(e);
					return;
				}
			}
		}
		// verifico doppione
		if(!oldValue){
			for(t in PAZIENTI.tagsProvvisori){
				if(txt.trim() == PAZIENTI.tagsProvvisori[t]["NomeTag"]){
					ALERT(TXT("erroreDuplicazioneElemento"))
					return;
				}
			}
		}
		let id = 0;
		if(pass){
			
			JSNPUSH={	"idTag": id*1,
						"NomeTag": txt.trim(),
						"colore": colore };
			
			if(!oldValue){
				SCHEDA.formModificato = true;
				
				if(PAZIENTI.tagsProvvisori=='')PAZIENTI.tagsProvvisori=[];
				PAZIENTI.tagsProvvisori.push(JSNPUSH);
				PAZIENTI.caricaTags();
			}else{
				if(oldValue!=txt || oldColor!=colore){
					let DataModifica = DB.pazienti.lastSync+1,
						PZ = DB.pazienti.data,
						modificato = false;
					for(let p in PZ){
						let tags = toJson(PZ[p].tags),
							tgMod = false;
						if(tags.length){
							for(t in tags){
								if(tags[t].NomeTag == oldValue){
									tags[t] = JSNPUSH;
									modificato = true;
									tgMod = true;
								}
							}
						}
						if(tgMod){
							PZ[p].DataModifica = DataModifica;
							PZ[p].tags = tags;
						}
					}
					for(let p in PAZIENTI.tagsProvvisori){
						if(PAZIENTI.tagsProvvisori[p].NomeTag == oldValue){
							PAZIENTI.tagsProvvisori[p] = JSNPUSH;
						}
					}
					PAZIENTI.popolaTags();
					PAZIENTI.caricaTags();
					if(modificato){
						applicaLoading(document.getElementById("scheda_testo"));
						applicaLoading(document.getElementById("elenchi_lista"));
						localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
							LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
												'rimuoviLoading(document.getElementById("elenchi_lista"));' );
						});
					}
				}
			}
			document.getElementById("tag_add").value='';
			document.getElementById("tag_col").style.backgroundColor = '#FFFFFF';
			document.getElementById("tag_col").dataset.colore = 'FFFFFF';
		}
		PAZIENTI.popolaTags();
		PAZIENTI.caricaTags();
		if(oldValue)PAZIENTI.annullaTag();
	},
	eliminaTag: function(n){ // elimina un tag del paziente
		PAZIENTI.tagsProvvisori.splice(n, 1); 
		PAZIENTI.caricaTags();
		PAZIENTI.popolaTags();
		PAZIENTI.annullaTag();
		SCHEDA.formModificato = true;
	},
	cambiaColTag: function( el ){ // elimina un tag del paziente
		let oldCol = el.dataset.colore,
			cSel = -1;
		for(let c=0;c<DB.coloriTags.length;c++){
			if(DB.coloriTags[c]==oldCol)cSel = c+1;
		}
		if(cSel==DB.coloriTags.length)cSel = 0;
		newCol = DB.coloriTags[cSel];
		el.dataset.colore = newCol;
		el.style.backgroundColor = "#"+newCol;
	},
	getTags: function(){ // restituisce l'elenco globale dei tags
		let TAGS = [],
			PZ = DB.pazienti.data;
		for(let p in PZ){
			let tags = toJson(PZ[p].tags);
			if(tags.length){
				for(t in tags){
				   let pass = true;
				   for(T in TAGS){
					   if(TAGS[T].NomeTag==tags[t].NomeTag){
						  pass = false;
					   }
				   }
				   if(pass)TAGS.push(tags[t]);
				}
			}
		}
		return TAGS;
	},
	selezionaTag: function( t=0 ){
		let globalTags = PAZIENTI.getTags();
		JSNPUSH={	"idTag": id*1,
					"NomeTag": globalTags[t].NomeTag.trim(),
					"colore": globalTags[t].colore };
			
		SCHEDA.formModificato = true;
		if(PAZIENTI.tagsProvvisori=='')PAZIENTI.tagsProvvisori=[];
		PAZIENTI.tagsProvvisori.push(JSNPUSH);
		PAZIENTI.caricaTags();
		PAZIENTI.popolaTags();
		PAZIENTI.annullaTag();
	},
	popolaTags: function(){
		let HTML = '',
			globalTags = PAZIENTI.getTags();
		for(t in globalTags){
			let pass = true;
			for(let e in PAZIENTI.tagsProvvisori){
				if(PAZIENTI.tagsProvvisori[e].NomeTag == globalTags[t].NomeTag)pass = false;
			}
			if(pass)HTML += '<div id="tag'+t+'">' +
							'	<div class="tagElenco"' +
							'		 onClick="PAZIENTI.selezionaTag('+t+');">' +
							'		<span class="tag tagMini"' +
							'	   		  style="background-color:#'+globalTags[t].colore+';">' +
							'		</span>' +
									htmlEntities(globalTags[t].NomeTag) +
							'	</div>' +
							'	<div class="elMod"' +
							'		 data-colore="'+globalTags[t].colore+'"' +
							'		 data-value="'+htmlEntities(globalTags[t].NomeTag)+'"' +
							'		 onClick="PAZIENTI.modificaTag(this);"></div>' +
							'</div>';
		}
		document.getElementById("elencoTags").innerHTML = HTML;
		if(HTML)document.getElementById("elencoTags").style.display = 'block';
		else document.getElementById("elencoTags").style.display = 'none';
	},
	modificaTag: function( el ){
		valore = el.dataset.value;
		document.getElementById("tag_add").value = valore;
		document.getElementById("tag_add").dataset.oldValue = valore;
		let pulsanteModifica = document.getElementById("cont_tag_add").getElementsByTagName("div")[1],
			pulsanteAnnulla = document.getElementById("cont_tag_add").getElementsByTagName("div")[0];
		pulsanteModifica.dataset.oldName = pulsanteModifica.innerHTML;
		pulsanteModifica.innerText = htmlEntities(TXT("Modifica"));
		document.getElementById("tag_col").style.backgroundColor = '#'+el.dataset.colore;
		document.getElementById("tag_col").dataset.colore = el.dataset.colore;
		document.getElementById("tag_col").dataset.oldColor = el.dataset.colore;
		document.getElementById("cont_tag_add").classList.add("modEl");
		document.getElementById('tag_add').focus();
		pulsanteAnnulla.classList.add("visBtn");
	},
	annullaTag: function(){
		let pulsanteModifica = document.getElementById("cont_tag_add").getElementsByTagName("div")[1],
			pulsanteAnnulla = document.getElementById("cont_tag_add").getElementsByTagName("div")[0];
		document.getElementById("tag_add").value = '';
		document.getElementById("tag_add").dataset.oldValue = '';
		if(pulsanteModifica.dataset.oldName)pulsanteModifica.innerHTML = pulsanteModifica.dataset.oldName;
		pulsanteModifica.dataset.oldName = '';
		document.getElementById("tag_col").style.backgroundColor = '#FFFFFF';
		document.getElementById("tag_col").dataset.colore = 'FFFFFF';
		document.getElementById("tag_col").dataset.oldColor = '';
		document.getElementById("cont_tag_add").classList.remove("modEl");
		pulsanteAnnulla.classList.remove("visBtn");
	},
	filtraTag: function(el){
		if(event.keyCode==13){
			el.blur();
			PAZIENTI.aggiungiTag(el);
		}else{
			let elenco = document.getElementById("elencoTags"),
				els = elenco.getElementsByClassName("elMod"),
				campo = document.getElementById("tag_add"),
				oldValue = campo.dataset.oldValue;
			if(typeof(oldValue)=='undefined')oldValue = '';
			if(oldValue==''){
				let txt = campo.value.toLowerCase().trim(),
					presenti = false;
				for(let e in els){
					if(els[e].dataset){
						if(els[e].dataset.value.toLowerCase().indexOf(txt)>-1 || txt==''){
							els[e].parentElement.style.display = 'block';
							presenti = true;
						}else{
							els[e].parentElement.style.display = 'none';
						}
					}
				}
				if(presenti)elenco.style.display = 'block';
				else elenco.style.display = 'none';
			}
		}
	},
	
	// elementi (medicine, allergie, patologie e interventi)
	defElemento: function( tipo ){
		let obj = {};
		if(tipo=='medicine'){
			obj.el = "Medicina";
			obj.els = "Medicine";
			obj.ELS = PAZIENTI.medicineProvvisorie;
		}
		if(tipo=='allergie'){
			obj.el = "Allergia";
			obj.els = "Allergie";
			obj.ELS = PAZIENTI.allergieProvvisorie;
		}
		if(tipo=='patologie'){
			obj.el = "Patologia";
			obj.els = "Patologie";
			obj.ELS = PAZIENTI.patologieProvvisorie;
		}
		if(tipo=='interventi'){
			obj.el = "Intervento";
			obj.els = "Interventi";
			obj.ELS = PAZIENTI.interventiProvvisori;
		}
		return obj;
	},
	caricaElementi: function( tipo ){ // carica gli elementi di un elenco
		obj = PAZIENTI.defElemento( tipo );
		let HTML ='';
		if(obj.ELS.length>0){
			for(let p in obj.ELS){
				HTML += '<div class="rg'+obj.els+'Mod"' +
						'	  data-id="'+obj.ELS[p]["id"+obj.el]+'">' +
						'	<span class="'+obj.el.toLowerCase()+'">' +
						'		<img src="img/ico_modifica_mini.png"' +
						'			 width="22"' +
						'			 height="22"' +
						'			 style="margin-right: -5px;' +
						/* '		  		    margin-top: -2px;' + */
						'		  		    float: right;' +
						'		  		    cursor: pointer;"' +
						'			 align="absmiddle"' +
						'			 onClick="PAZIENTI.modificaElemento(this,\''+tipo+'\');"' +
						'			 data-value="'+htmlEntities(obj.ELS[p]["Nome"+obj.el])+'"' +
						'			 class="occhio">' +
								htmlEntities(obj.ELS[p]["Nome"+obj.el]) +
						'	</span>' +
						'	<img src="img/ico_cestino.png"' +
						'		 width="16"' +
						'		 height="16"' +
						'		 align="absmiddle"' +
						'		 style="float:right;' +
						'		 		margin:11px;' +
						'		 		cursor:pointer;' +
						'		 		opacity:0.5;"' +
						'		 title="'+TXT("DelDett")+'"' +
						'		 onClick="PAZIENTI.eliminaElemento('+p+',\''+tipo+'\');"' +
						'		 class="occhio">' +
						'</div>';
			}
		}else{
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes")+'...' +
					'</div>';
		}
		document.getElementById('cont'+obj.els).innerHTML = HTML;
	},
	aggiungiElemento: function( tipo, el ){ // aggiunge un elemento a un elenco
		let obj = PAZIENTI.defElemento( tipo ),
			txt=document.getElementById(obj.el.toLowerCase()+"_add").value,
			/* global = PAZIENTI.getElementi(tipo), */
			pass = txt.trim()=='' ? false : true,
			oldValue = '';
		if(el.parentElement.getElementsByTagName("div")[1].dataset.oldName){ // verifico se è in modifica con oldValue
			oldValue = el.parentElement.getElementsByTagName("input")[0].dataset.oldValue;
		}
		let els = document.getElementById("elenco"+obj.els).getElementsByClassName("elMod");
		for(let e in els){
			if(els[e].dataset){
				let val = els[e].dataset.value.toLowerCase();
				if(	val.trim() == txt.toLowerCase().trim() && !oldValue){
					PAZIENTI.selezionaElemento(e, tipo);
					return;
				}
			}
		}
		let id = 0;
		if(pass){
			JSNPUSH={};
			JSNPUSH["id"+obj.el] = id*1;
			JSNPUSH["Nome"+obj.el] = txt.trim();
			
			let EL = null;
			if(tipo=='medicine')EL = PAZIENTI.medicineProvvisorie;
			if(tipo=='allergie')EL = PAZIENTI.allergieProvvisorie;
			if(tipo=='patologie')EL = PAZIENTI.patologieProvvisorie;
			if(tipo=='interventi')EL = PAZIENTI.interventiProvvisori;
			// verifico doppione
			if(!oldValue){
				for(let e in EL){
					if(txt.trim() == EL[e]["Nome"+obj.el]){
						ALERT(TXT("erroreDuplicazioneElemento"))
						return;
					}
				}
			}
			if(!oldValue){
				SCHEDA.formModificato = true;
				EL.push(JSNPUSH);
				PAZIENTI.caricaElementi(tipo);
			}else{
				if(oldValue!=txt){
					let DataModifica = DB.pazienti.lastSync+1,
						modificato = false,
						PZ = DB.pazienti.data;
					/* obj = PAZIENTI.defElemento( tipo ); */
					for(let p in PZ){
						let elenco = toJson(PZ[p][tipo]),
							pzMod = false;
						if(elenco.length){
							for(let e in elenco){
								if(elenco[e]["Nome"+obj.el] == oldValue){
									elenco[e] = JSNPUSH;
									modificato = true;
									pzMod = true;
								}
							}
						}
						if(pzMod){
							PZ[p].DataModifica = DataModifica;
							PZ[p][tipo] = elenco;
						}
					}
					for(let p in EL){
						if(EL[p]["Nome"+obj.el]== oldValue){
							EL[p] = JSNPUSH;
						}
					}
					PAZIENTI.popolaElementi(tipo);
					PAZIENTI.caricaElementi(tipo);
					if(modificato){
						applicaLoading(document.getElementById("scheda_testo"));
						applicaLoading(document.getElementById("elenchi_lista"));
						localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
							LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
												'rimuoviLoading(document.getElementById("elenchi_lista"));' );
						});
					}
				}
			}
			document.getElementById(obj.el.toLowerCase()+"_add").value='';
		}
		PAZIENTI.popolaElementi(tipo);
		PAZIENTI.caricaElementi(tipo);
		if(oldValue)PAZIENTI.annullaElemento(tipo);
	},
	eliminaElemento: function( n, tipo){ // elimina un elemento da un elenco
		obj = PAZIENTI.defElemento( tipo );
		obj.ELS.splice(n, 1); 
		PAZIENTI.caricaElementi(tipo);
		PAZIENTI.popolaElementi(tipo);
		PAZIENTI.annullaElemento(tipo);
		SCHEDA.formModificato = true;
	},
	getElementi: function( tipo ){ // restituisce l'elenco globale degli elementi di un elenco
		obj = PAZIENTI.defElemento( tipo );
		let LISTA = [],
			PZ = DB.pazienti.data;
		for(let p in PZ){
			let elenco = toJson(PZ[p][tipo]);
			if(elenco.length){
				for(let e in elenco){
				   let pass = true;
				   for(let M in LISTA){
					   if(LISTA[M]["Nome"+obj.el]==elenco[e]["Nome"+obj.el]){
						  pass = false;
					   }
				   }
				   if(pass)LISTA.push(elenco[e]);
				}
			}
		}
		LISTA.sort(sort_by("Nome"+obj.el,false));
		return LISTA;
	},
	selezionaElemento: function( m, tipo ){ // seleziona un elemento dallo storico degli elementi
		let obj = PAZIENTI.defElemento( tipo ),
			global = PAZIENTI.getElementi(tipo),
			id=0;
		JSNPUSH={}
		JSNPUSH["id"+obj.el] = id*1;
		JSNPUSH["Nome"+obj.el] = global[m]["Nome"+obj.el].trim();
		SCHEDA.formModificato = true;
		if(tipo=='medicine')PAZIENTI.medicineProvvisorie.push(JSNPUSH);
		if(tipo=='allergie')PAZIENTI.allergieProvvisorie.push(JSNPUSH);
		if(tipo=='patologie')PAZIENTI.patologieProvvisorie.push(JSNPUSH);
		if(tipo=='interventi')PAZIENTI.interventiProvvisori.push(JSNPUSH);
		PAZIENTI.caricaElementi(tipo);
		PAZIENTI.popolaElementi(tipo);
		PAZIENTI.annullaElemento(tipo);
	},
	popolaElementi: function( tipo ){ // popola lo storico degli elementi
		let obj = PAZIENTI.defElemento( tipo ),
			global = PAZIENTI.getElementi(tipo),
			HTML = '';
		for(let m in global){
			let pass = true;
			for(let e in obj.ELS){
				if(obj.ELS[e]["Nome"+obj.el] == global[m]["Nome"+obj.el])pass = false;
			}
			if(pass)HTML += '<div id="elemento_'+tipo+'_'+m+'">' +
							'	<div class="'+tipo+'Elenco"' +
							'		 onClick="PAZIENTI.selezionaElemento('+m+',\''+tipo+'\');">' +
									htmlEntities(global[m]["Nome"+obj.el]) +
							'	</div>' +
							'	<div class="elMod"' +
							'		 data-value="'+htmlEntities(global[m]["Nome"+obj.el])+'"' +
							'		 onClick="PAZIENTI.modificaElemento(this,\''+tipo+'\');"></div>' +
							'</div>';
		}
		document.getElementById("elenco"+obj.els).innerHTML = HTML;
		if(HTML)document.getElementById("elenco"+obj.els).style.display = 'block';
		else document.getElementById("elenco"+obj.els).style.display = 'none';
	},
	modificaElemento: function( el, tipo ){
		let obj = PAZIENTI.defElemento( tipo ),
			valore = el.dataset.value,
			cont = document.getElementById("cont_"+obj.el.toLowerCase()+"_add"),
			campo = cont.getElementsByTagName("input")[0],
			pulsanteAnnulla = cont.getElementsByTagName("div")[0],
			pulsanteModifica = cont.getElementsByTagName("div")[1];
		campo.value = valore;
		campo.dataset.oldValue = valore;
		pulsanteModifica.dataset.oldName = pulsanteModifica.innerHTML;
		pulsanteModifica.innerHTML = htmlEntities(TXT("Modifica"));
		pulsanteAnnulla.classList.add("visBtn");
		cont.classList.add("modEl");
		campo.focus();
	},
	annullaElemento: function( tipo ){
		let obj = PAZIENTI.defElemento( tipo ),
			cont = document.getElementById("cont_"+obj.el.toLowerCase()+"_add"),
			campo = document.getElementById(obj.el.toLowerCase()+"_add"),
			pulsanteAnnulla = campo.parentElement.getElementsByTagName("div")[0],
			pulsanteModifica = campo.parentElement.getElementsByTagName("div")[1];
		campo.value = '';
		campo.dataset.oldValue = '';
		if(pulsanteModifica.dataset.oldName)pulsanteModifica.innerHTML = pulsanteModifica.dataset.oldName;
		pulsanteModifica.dataset.oldName = '';
		pulsanteAnnulla.classList.remove("visBtn");
		cont.classList.remove("modEl");
	},
	filtraElemento: function(tipo, el){
		if(event.keyCode==13){
			el.blur();
			PAZIENTI.aggiungiElemento(tipo, el);
		}else{
			let obj = PAZIENTI.defElemento( tipo ),
				elenco = document.getElementById("elenco"+obj.els),
				els = elenco.getElementsByClassName("elMod"),
				campo = document.getElementById(obj.el.toLowerCase()+"_add"),
				oldValue = campo.dataset.oldValue;
			if(typeof(oldValue)=='undefined')oldValue = '';
			if(oldValue==''){
				let txt = campo.value.toLowerCase().trim(),
					presenti = false;
				for(let e in els){
					if(els[e].dataset){
						if(els[e].dataset.value.toLowerCase().indexOf(txt)>-1 || txt==''){
							els[e].parentElement.style.display = 'block';
							presenti = true;
						}else{
							els[e].parentElement.style.display = 'none';
						}
					}
				}
				if(presenti)elenco.style.display = 'block';
				else elenco.style.display = 'none';
			}
		}
	},
	
	// AGENDA GENERICA
	car_agenda: function( data ){ // scheda dell'agenda
		if(smartMenu){
			SCHEDA.chiudiElenco();
			MENU.chiudiMenu();
		}
		if(typeof(data) == 'undefined')data = oggi;
		else data = new Date(data);
		
		HTML = 	'<div id="cont_sceltaAppuntamento">' +
				'</div>' +
				'<div id="agendaPlaceHolder">' +
				'</div>' +
				'<div class="l"' +
				'	 style="height:1px !important;"' +
				'	 data-d="'+(data*1)+'">' +
				'</div>';
	
		//data=oggi;
		
		SCHEDA.caricaScheda( stripslashes(TXT("Agenda")), HTML, '', 'scheda_agenda', false, true );
		
		agenda.apri(data,document.getElementById("agendaPlaceHolder"),null,document.getElementById("agendaPlaceHolder"));
		MENU.comprimiIcone(true);
	}
}