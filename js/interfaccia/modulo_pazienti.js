
var PAZIENTI = {
	idCL: -1,
	idPaziente: -1,
	cicli: [],
	pazOp: false,
	trattOp: false,
	cicOp: false,
	saldoOp: false,
	aperture: [],
	puntiProvvisori: "",
	sintomiProvvisori: [],
	meridianiProvvisori: [],
	tagsProvvisori: [],
	medicineProvvisorie: [],
	allergieProvvisorie: [],
	galleryProvvisoria: [],
	sintomiModello: [],
	pazSelMD5: '',
	overCestino: false,
	mnMobileOpened: null,
	pazientiFiltrati: [],
	maxFoto: 15,
		
	caricaPazienti: function(){ // carica l'elenco dei pazienti
		var HTML = '';
		
		// pulsante aggiungi paziente
		HTML += '<div class="menuElenchi"' +
				'	  onClick="MENU.visMM(\'add_paz\');">' +
				'</div>' +
				'<p id="add_paz">' +
				'	<input id="paz_ricerca"' +
				'		   onKeyUp="PAZIENTI.filtra();"' +
				'		   class="okPlaceHolder"' +
				'		   placeholder="'+htmlEntities(Lingua(TXT_CercaCliente))+'"'+H.noAutoGen+'>' +
				'	<i class="elMenu"' +
				'	   id="filtroPazienti"' +
				'	   onclick="PAZIENTI.car_filtri();">' +
				'		<span>'+Lingua(TXT_FiltroPazienti)+'</span>' +
				'	</i>' +
				'	<i class="elMenu"' +
				'	   id="marketingPazienti"' +
				'	   onclick="PAZIENTI.car_marketing();">' +
				'		<span>'+Lingua(TXT_StrumentiMarketing)+'</span>' +
				'	</i>' +
				'	<i class="elMenu"' +
				'	   id="addPaziente"' +
				'	   onclick="PAZIENTI.car_paziente();"' +
				'	   title="'+Lingua(TXT_AggiungiPaziente)+'">' +
				'		<span>'+Lingua(TXT_AggiungiPaziente)+'</span>' +
				'	</i>' +
				'</p>' +
				'<div class="lista listaPazienti">' +
				'	<div id="paz_filtrati"' +
						 (!PAZIENTI.pazientiFiltrati.length ? ' style="display:none;"' : '') + 
				'		 onClick="PAZIENTI.car_filtri();">' +
							htmlEntities(Lingua(TXT_PazientiFiltrati)) +
				'	</div>';
		var noPaz = true;
		if(DB.pazienti.data.length){
			var clonePAZIENTI = clone(DB.pazienti.data);
			for(p in clonePAZIENTI){
				clonePAZIENTI[p].p = p;
			}
			clonePAZIENTI.sort(sort_by("Cognome", false));
			clonePAZIENTI.sort(sort_by("Nome", false));
			for(p in clonePAZIENTI){
				var PZ = clonePAZIENTI[p];
				
				if(!PZ.Cancellato){
					noPaz = false;
					HTML +=
					'	<div class="frdx'+((PAZIENTI.pazientiFiltrati.length && PAZIENTI.pazientiFiltrati.indexOf(PZ.p*1)==-1) ? ' nasPaz' : '')+'"' +
					'		 id="paziente_'+PZ.p+'"' +
					'		 onClick="PAZIENTI.selPaziente('+PZ.p+');">';
						
						// AVATAR
						if(PZ.avatar){ // foto del cliente
							HTML +=
					'		<img src="'+PZ.avatar+'"' +
					'			 class="avatarList">';
						}else if(PZ.sesso){ // oppure avatar generico
							HTML += 
					'		<img src="img/ico_cliente_'+sessi[PZ.sesso]+'.png"' +
					'			 class="imgList">';
					}
					// verifico se è stato modificato e non sincronizzato
					var mdT=false;
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
						Lingua(TXT_NoResPaziente) +
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
		var parola = document.getElementById("paz_ricerca").value;
		for(p in DB.pazienti.data){
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
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
				
			if(SCHEDA.formModificato){
				SCHEDA.formModificato = false;
				endChangeDetection();
			}		
			if( SCHEDA.classeAperta == 'scheda_A' ||
				SCHEDA.classeAperta == 'scheda_B' ||
				SCHEDA.classeAperta == 'scheda_paziente' ||
				SCHEDA.classeAperta == 'scheda_Riepi' || 
				SCHEDA.classeAperta == 'tab_tsubo' )SCHEDA.scaricaScheda();
				
			PAZIENTI.idCL = n*1;
			PAZIENTI.idPaziente = DB.pazienti.data[PAZIENTI.idCL].idPaziente;
			var sesso = sessi[DB.pazienti.data[PAZIENTI.idCL].sesso];
			document.getElementById("p_cartella").classList.add("clientAtt");
			//document.getElementById("elenchi_titolo").classList.add("clientAtt");
			document.getElementById("ico_cliente").style.backgroundImage = "url(img/ico_cliente_"+sesso+"B.png)";
			document.getElementById("ico_cliente").getElementsByTagName("i")[0].innerHTML = DB.pazienti.data[PAZIENTI.idCL].Nome+" "+DB.pazienti.data[PAZIENTI.idCL].Cognome;
			
			// cambio sesso al manichino
			/*
			
				TOLTO PER RENDERLO PIU' smart
			
			*/
			/*var pass = true;
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
			
			var d=new Date();
			pazSelMD5=MD5("P"+d);
			PAZIENTI.caricaTrattamenti();
			try{
				SET.leggiNote();
			}catch(err){}
			SCHEDA.setTriploLivello('pazienti');
			//if(SCHEDA.classeAperta == 'tab_tsubo')SCHEDA.scaricaScheda();
		}});
	},
	deselPaziente: function(){ // deseleziona il paziente su cui si sta lavorando
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			
			endChangeDetection();
			if( SCHEDA.classeAperta == 'scheda_A' ||
				SCHEDA.classeAperta == 'scheda_B' ||
				SCHEDA.classeAperta == 'scheda_paziente' ||
				SCHEDA.classeAperta == 'scheda_Riepi' ||
				SCHEDA.classeAperta == 'scheda_saldo' ||
				SCHEDA.classeAperta == 'tab_tsubo' )SCHEDA.scaricaScheda();
			PAZIENTI.trattSel = null;
			PAZIENTI.trattOp = false;
			PAZIENTI.cicli = [];
			PAZIENTI.idCL = -1;
			PAZIENTI.idPaziente = -1;
			PAZIENTI.caricaPazienti();
			PAZIENTI.aperture = [];
			document.getElementById("p_cartella").classList.remove("clientAtt");
			//document.getElementById("elenchi_titolo").classList.remove("clientAtt");
			document.getElementById("p_cartella").getElementsByTagName("i")[0].innerHTML = Lingua(TXT_ElGestionale);
			try{
				SET.leggiNote();
			}catch(err){}
			SCHEDA.setTriploLivello('pazienti');
			//if(mouseDetect)document.getElementById("paz_ricerca").focus();
		}});
	},
	chiudiPaziente: function(){ // chiude la scheda anagrafica
		SCHEDA.formModificato = false;
		PAZIENTI.pazOp = false;
	},
	intestazionePaziente: function( tipo ){ // nome e pulsanti in alto quando il paziente e selezionato
		var PZ = DB.pazienti.data[PAZIENTI.idCL];
		var HTML='';
		
		// nome cliente
		HTML += '<p class="trattNomeCliente' + ( PZ.avatar ? ' conAvatar' : '' ) + '"';
		if(PZ.sesso){
			HTML += ' style="background-image:url(img/ico_cliente_'+sessi[PZ.sesso]+'.png);"';
		}
		HTML += '><span id="nomeCliente" onClick="PAZIENTI.vis_paziente();" title="'+Lingua(TXT_Anagrafica)+'">'+htmlEntities(PZ.Nome)+"<br>"+htmlEntities(PZ.Cognome);
		if(PZ.DataModifica > DB.pazienti.lastSync)HTML += H.imgSyncro();
		HTML += '</span>';
		
		HTML += '<span id="btnAnagraficaCliente" onClick="PAZIENTI.vis_paziente();" title="'+Lingua(TXT_Anagrafica)+'"></span>' +
				'<span id="esciCliente" onClick="PAZIENTI.deselPaziente();" title="'+Lingua(TXT_Chiudi)+'"></span>';
		if(PZ.avatar){
			HTML += '<span onClick="PAZIENTI.vis_paziente();" class="avatarMini" style="background-image:url(\''+PZ.avatar+'\');"></span>';
		}
		HTML += '</p>';
		
		// pulsanti trattamenti e saldi
		HTML += '<p class="trattBtns"><span id="pazBtnTratt" ';
		if(tipo == 't')HTML += 'class="selBtn" ';
		else HTML += 'onClick="PAZIENTI.caricaTrattamenti();"';
		HTML += '>'+Lingua(TXT_ElTrattamenti).toUpperCase()+'</span> <span id="pazBtnSaldi" ';
		if(tipo == 's')HTML += 'class="selBtn" ';
		else HTML += 'onClick="PAZIENTI.caricaSaldi();"';
		HTML += '>'+Lingua(TXT_ElSaldi).toUpperCase()+'</span></p>';
		
		return HTML;
	},
	riselSex: function(){
		var newSex = 'uomo';
		var sesso = document.getElementById("sesso").value;
		if(sesso)newSex = sessi[sesso];
		document.getElementById("avatarPaziente").style.backgroundImage = 'url(img/avatar_'+newSex+'.jpg)';
	},
	car_paziente: function( salvato ){ // carica la scheda anagrafica del paziente
		// verifico le autorizzazioni
		var maxClienti = 1;
		if(LOGIN.reg() && LOGIN.logedin()){
			if(DB.login.data.auths.indexOf("clients_full")>-1)maxClienti = -1;
			else maxClienti = 15;
		}
		if(maxClienti>-1 && PAZIENTI.idCL==-1){
			var tPaz = 0;
			for(c in DB.pazienti.data){
				if(DB.pazienti.data[c].Cancellato*1==0)tPaz++;
			}
			if(tPaz >= maxClienti){
				ALERT(Lingua(eval("TXT_MsgMaxPazienti"+maxClienti)));
				return;
			}
		}
		// --------------------------
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			
			MENU.nasMM();
			var idPaziente=0;
			var Nome='';
			var Cognome='';
			var Indirizzo='';
			var CAP='';
			var Citta='';
			var Provincia='';
			var Stato='';
			var Telefono='';
			var Cellulare='';
			var paeseCellulare='';
			var Email='';
			var sesso='';
			var NotePaziente='';
			var DataNascita=0;
			var LuogoNascita='';
			var tags=[];
			var etichette=[];
			var medicine=[];
			var allergie=[];
			var patologie=[];
			var interventi=[];
			var Provenienza='';
			var Professione='';
			var Social='';
			var Intestazione='';
			var CodiceFiscale='';
			var PartitaIva='';
			var avatar='';
			var Altezza='';
			var Peso='';
			if(PAZIENTI.idCL>-1){
				var PZ = DB.pazienti.data[PAZIENTI.idCL];
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
			
			var HTML = '';
			HTML += '<form id="formMod"' +
					'	   name="formMod"' +
					'	   method="post"' +
					'	   onSubmit="return false;">';
					
			// Campi nascosti
			HTML += H.r({	t: "h", name: "stessa",	value: "1" });
			HTML += H.r({	t: "h", name: "idPaziente",	value: idPaziente*1 });
			
			// avatar
			var sessoAvatar = 'uomo';
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
					'				   title="'+htmlEntities(Lingua(TXT_CaricaImmagine))+'" />' +
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
			var cont = '';
			cont += H.r({	t: "s", 
							name: "sesso",
							value: sesso,
							opts: { "m": Lingua(TXT_Maschio), "f": Lingua(TXT_Femmina), "a": Lingua(TXT_Altro) },
							label: Lingua(TXT_Sesso),
							id: "selectPaz",
							classRiga: "labelSx",
							onChange: 'PAZIENTI.riselSex();' });
					
			cont += H.r({	t: "d",
							name: "DataNascita",
							value: DataNascita,
							classRiga: "labelSx" });
							
			cont += H.r({	t: "r", name: "LuogoNascita",	value: LuogoNascita,	classCampo: 'styled' });
							
			HTML += H.sezione({
				label: Lingua(TXT_LabelAnagrafici),
				nome: 'anagrafici',
				html: cont,
				etichette: true
						});	
					
			// sezione INDIRIZZO
			var cont = '';
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
							label: Lingua(TXT_Stato),
							classRiga: 'contStato',
							classCampo: "selectLargo" });
			cont += '</div>';
							
			HTML += H.sezione({
				label: Lingua(TXT_LabelIndirizzo),
				nome: 'indirizzo',
				html: cont,
				etichette: true
						});		
			
			// sezione CONTATTI
			var cont = '';	
			cont += H.r({	t: "r",
							name: "Telefono",
							value: Telefono,
							classCampo: 'styled',
							ver: '0|0|tel'});
			
			
			cont += '		<div>' +
					'			<i>'+htmlEntities(Lingua(TXT_Cellulare))+'</i>' +
					'			<select name="paeseCellulare"' +
					'					id="paeseCellulare"' +
					'					class="prefisso">' +
					'				<option></option>';
					
				for(p in paesi){
					var isSelected = '';
					if(paeseCellulare == p)isSelected = ' SELECTED';
					cont += '		<option'+isSelected +
							'				value="'+p+'">'	+
								paesi[p].prefisso +
								' &nbsp; &nbsp; &nbsp; (' +
								htmlEntities(paesi[p][globals.siglaLingua])+')' +
							'		</option>'+H.chr10;
				}
			cont += '			</select>' +
					'			<input  id="@|Cellulare|0|0|tel"' +
					'					type="text"' +
					'					name="Cellulare"' +
					'					placeholder="'+htmlEntities(Lingua(TXT_Cellulare))+'"' +
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
				label: Lingua(TXT_LabelContatti),
				nome: 'contatti',
				html: cont,
				etichette: true
						});	
										
			
			// sezione FATTURAZIONE
			var cont = '';	
			cont += H.r({	t: "t", 
							name: "Intestazione",
							classCampo: "Intestazione",
							value: Intestazione,
							label: Lingua(TXT_IntestazioneSpiegazione),
							noLabel: true,
							classCampo: "okPlaceHolder" });
			cont += H.r({	t: "r", name: "CodiceFiscale",	value: CodiceFiscale,	classCampo: 'styled' });
			cont += H.r({	t: "r", name: "PartitaIva",	value: PartitaIva,	classCampo: 'styled' });
			
			HTML += H.sezione({
				label: Lingua(TXT_LabelFatturazione),
				nome: 'azienda',
				html: cont,
				etichette: true
						});	
								
			
			// sezione INFO AGGIUNTIVE
			var cont = '';
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
							
			/*9cont += H.r({	t: "s", 
							name: "Social",
							value: Social,
							opts: DB.socials,
							label: Lingua(TXT_Social),
							classCampo: "selectLargo" });*/
			HTML += H.sezione({
				label: Lingua(TXT_LabelAggiuntive),
				nome: 'aggiuntive',
				html: cont,
				etichette: true
						});	
			
			// sezione TAGS
			var cont = '';
			cont += '		<div id="contTags">' +
					'		</div>' +
					'		<div id="cont_tag_add">' +
					'			<input type="text"' +
					'				   id="tag_add"' +
					'				   placeholder="'+htmlEntities(Lingua(TXT_TagsSpiegazione))+'"' +
					'				   onKeyup="PAZIENTI.filtraTag(this);"'+H.noAutoGen+'/>' +
					'			<span id="tag_col"' +
					'				  onClick="PAZIENTI.cambiaColTag(this);"' +
					'				  data-colore="FFFFFF"' +
					'				  style="background-color:#FFFFFF;"/>' +
					'			</span>' +
					'			<div class="p_tag_ann"' +
					'				 onClick="PAZIENTI.annullaTag();">' +
									Lingua(TXT_Annulla) +
					'			</div>' +
					'			<div class="p_tag_add"' +
					'				 onClick="PAZIENTI.aggiungiTag(this);">' +
									Lingua(TXT_Nuovo) +
					'			</div>' +
					'			<div id="elencoTags">' +
					'			</div>' +
					'			<div class="l"></div>' +
					'		</div>';
			
			HTML += H.sezione({
				label: Lingua(TXT_Tags),
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
			var cont = '';
			cont += H.r({	t: "r", name: "Altezza",	value: Altezza,	classCampo: 'styled', ver: '0|0|num' });
			cont += H.r({	t: "r", name: "Peso",	value: Peso,	classCampo: 'styled', ver: '0|0|num' });
							
			HTML += H.sezione({
				label: Lingua(TXT_LabelBiometrici),
				nome: 'biometrici',
				html: cont,
				etichette: true
						});	
			
			// sezione MEDICINE
			var cont = '';
			cont += '		<div id="contMedicine">' +
					'		</div>' +
					'		<div id="cont_medicina_add">' +
					'			<input type="text"' +
					'				   id="medicina_add"' +
					'				   placeholder="'+htmlEntities(Lingua(TXT_MedicineSpiegazione))+'"' +
					'				   onKeyup="PAZIENTI.filtraElemento(\'medicine\',this);"'+H.noAutoGen+'/>' +
					'			<div class="p_medicina_ann"' +
					'				 onClick="PAZIENTI.annullaElemento(\'medicine\');">' +
									Lingua(TXT_Annulla) +
					'			</div>' +
					'			<div class="p_medicina_add"' +
					'				 onClick="PAZIENTI.aggiungiElemento(\'medicine\',this);">' +
									Lingua(TXT_Nuova) +
					'			</div>' +
					'			<div id="elencoMedicine">' +
					'			</div>' +
					'			<div class="l"></div>' +
					'		</div>';
			HTML += H.sezione({
				label: Lingua(TXT_Medicine),
				nome: 'medicine',
				html: cont
						});	
					
			// sezione ALLERGIE
			var cont = '';
			cont += '		<div id="contAllergie">' +
					'		</div>' +
					'		<div id="cont_allergia_add">' +
					'			<input type="text"' +
					'				   id="allergia_add"' +
					'				   placeholder="'+htmlEntities(Lingua(TXT_AllergieSpiegazione))+'"' +
					'				   onKeyup="PAZIENTI.filtraElemento(\'allergie\',this);"'+H.noAutoGen+'/>' +
					'			<div class="p_allergia_ann"' +
					'				 onClick="PAZIENTI.annullaElemento(\'allergie\');">' +
									Lingua(TXT_Annulla) +
					'			</div>' +
					'			<div class="p_allergia_add"' +
					'				 onClick="PAZIENTI.aggiungiElemento(\'allergie\',this);">' +
									Lingua(TXT_Nuova) +
					'			</div>' +
					'			<div id="elencoAllergie">' +
					'			</div>' +
					'			<div class="l"></div>' +
					'		</div>';
			HTML += H.sezione({
				label: Lingua(TXT_Allergie),
				nome: 'allergie',
				html: cont
						});	
			
			// sezione PATOLOGIE
			var  cont = '';
			cont += '		<div id="contPatologie">' +
					'		</div>' +
					'		<div id="cont_patologia_add">' +
					'			<input type="text"' +
					'				   id="patologia_add"' +
					'				   placeholder="'+htmlEntities(Lingua(TXT_PatologieSpiegazione))+'"' +
					'				   onKeyup="PAZIENTI.filtraElemento(\'patologie\',this);"'+H.noAutoGen+'/>' +
					'			<div class="p_patologia_ann"' +
					'				 onClick="PAZIENTI.amnnullaElemento(\'patologie\');">' +
									Lingua(TXT_Annulla) +
					'			</div>' +
					'			<div class="p_patologia_add"' +
					'				 onClick="PAZIENTI.aggiungiElemento(\'patologie\',this);">' +
									Lingua(TXT_Nuova) +
					'			</div>' +
					'			<div id="elencoPatologie">' +
					'			</div>' +
					'			<div class="l"></div>' +
					'		</div>';
			HTML += H.sezione({
				label: Lingua(TXT_Patologie),
				nome: 'patologie',
				img: 'patologie2',
				html: cont
						});
			
			// sezione INTERVENTI
			var cont = '';
			cont += '		<div id="contInterventi">' +
					'		</div>' +
					'		<div id="cont_intervento_add">' +
					'			<input type="text"' +
					'				   id="intervento_add"' +
					'				   placeholder="'+htmlEntities(Lingua(TXT_InterventiSpiegazione))+'"' +
					'				   onKeyup="PAZIENTI.filtraElemento(\'interventi\',this);"'+H.noAutoGen+'/>' +
					'			<div class="p_intervento_ann"' +
					'				 onClick="PAZIENTI.annullaElemento(\'interventi\');">' +
									Lingua(TXT_Annulla) +
					'			</div>' +
					'			<div class="p_intervento_add"' +
					'				 onClick="PAZIENTI.aggiungiElemento(\'interventi\',this);">' +
									Lingua(TXT_Nuovo) +
					'			</div>' +
					'			<div id="elencoInterventi">' +
					'			</div>' +
					'			<div class="l"></div>' +
					'		</div>';
			HTML += H.sezione({
				label: Lingua(TXT_Interventi),
				nome: 'interventi',
				html: cont
						});	
						
			HTML += '<div class="sezioneTrattamenti divEspansa "' +
					'	  style="' +
					'	  border-top: none !important;' +
					'	  height:20px;' +
					'	  padding: 0px;' +
					'	  background-color: rgba(0,0,0,0.15);"></div>';
					
			// sezione ANNOTAZIONI
			var cont = '';
			cont += H.r({	t: "t", 
							name: "NotePaziente",
							value: NotePaziente,
							label: Lingua(TXT_InserisciNote),
							noLabel: true,
							classCampo: "okPlaceHolder" });
					
			HTML += H.sezione({
				label: Lingua(TXT_LabelAnnotazioni),
				nome: 'annotazioni',
				html: cont
						});		
			
			var azAnnulla = "SCHEDA.scaricaScheda();";
			if(PAZIENTI.idCL>-1)azAnnulla = "PAZIENTI.vis_paziente();";
			//if(PAZIENTI.idCL>-1)azAnnulla = "SCHEDA.scaricaScheda();";
			var azElimina = PAZIENTI.idCL>-1 ? "PAZIENTI.el_paziente("+PAZIENTI.idCL+");":"";
			var btnAdd = '';
			if(azElimina){
				btnAdd = '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+Lingua(TXT_EliminaScheda)+'</div>';
			}
			
			HTML += SCHEDA.pulsantiForm(
									azElimina,
									azAnnulla, 
									"if(H.verData(\'DataNascita\'))PAZIENTI.mod_paziente();" );
			
			HTML += '</form>';
			
			
			var titoloDef=TXT_ModificaPaziente;
			if(PAZIENTI.idCL==-1)titoloDef=TXT_CreaPaziente;
			
			SCHEDA.caricaScheda(	stripslashes(Lingua(titoloDef)),
									HTML,
									'',
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
			
			if(salvato)SCHEDA.msgSalvataggio();
		}});
	},
	vis_paziente: function( salvato ){ // carica la scheda anagrafica del paziente
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
						
			SCHEDA.espandiElenco();
			
			if(typeof(salvato) == 'undefined')var salvato = false;
			endChangeDetection( "formMod" );
			SCHEDA.formModificato = false;
						
			var PZ = DB.pazienti.data[PAZIENTI.idCL];
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
		
			var eta = '';
			if(DataNascita)eta = oggi.getFullYear() - DataNascita.getFullYear();
			
			var HTML = '';
			
			// avatar
			var sessoAvatar = 'uomo';
			if(sesso)sessoAvatar = sessi[sesso];
			HTML += '<div id="pazienti_vis">' +
					'	<div>' +
					'		<div onClick="this.classList.toggle(\'avatarBig\');"' +
					'		   	 id="avatarPaziente"' +
					'		   	 class="avatar"'+
					'			 style="background-image:url(img/avatar_'+sessoAvatar+'.jpg);">' +
					'			<div style="background-image:url(\''+avatar+'\')">';
			/*if(sesso)HTML += '		<img src="img/p_'+sessi[sesso]+'.png"' +
							 '			 style="margin-top: 5px;">';*/
			HTML += '			</div>' +
					'		</div>' +
					'		<div id="pazienti_head">' +
					'			<h1>'+htmlEntities(Nome+" "+Cognome)+'</h1>' +
					'			<p>';
			if(Telefono.trim()){
				HTML += '			<i>'+htmlEntities(Lingua(TXT_Telefono))+':</i> ' +
									htmlEntities(Telefono)+'<br>';
			}
			if(Cellulare.trim()){
				HTML += '			<i>'+htmlEntities(Lingua(TXT_Cellulare))+':</i> ' +
									htmlEntities(paesi[paeseCellulare].prefisso + " " +Cellulare)+'<br>';
			}
			if(Email.trim()){
				HTML += '			<i>'+htmlEntities(Lingua(TXT_Email))+':</i> ' +
									htmlEntities(Email)+'<br>';
			}
			if(DataNascita){
				HTML += '			<i>'+htmlEntities(Lingua(TXT_Eta))+':</i> ' +
									eta+' '+htmlEntities(Lingua(TXT_Anni))+'<br>';
			}
			HTML += '			</p>' +
					'		</div>' +
					'		<span id="modAnag"' +
					'			  onClick="PAZIENTI.car_paziente();"' +
					'			  class="noPrint">' +
								htmlEntities(Lingua(TXT_modifica)) +
					'		</span>' +
					'	</div>';
			// TAGS	
			if(tags.length){
				
				HTML +=	'<div class="contAnag tags_head">';
						
				for(p in tags){
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
			
			
			var H__1 = '';
			
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
					if(Stato.length==2)H__1 +=		htmlEntities(paesi[Stato][globals.siglaLingua]);
					else H__1 +=		htmlEntities(Stato);
					H__1 +=		')';
				}
				H__1 += H.scriviEtichette('indirizzo');
				H__1 += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
			}
			
			// ANAGRAFICA
			var HTML_provv = '';
			if(	DataNascita ){
				HTML_provv += '<div><i>'+htmlEntities(Lingua(TXT_DataNascita))+':</i> ' + getDataTS(DataNascita*.001)+ '</div>';
			}
			if(LuogoNascita.trim()){
				HTML_provv += '<div><i>'+htmlEntities(Lingua(TXT_LuogoNascita))+':</i> ' + htmlEntities(LuogoNascita) + '</div>';
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
			var HTML_provv = '';
			HTML_provv += H.scriviEtichette('contatti');
			if(	HTML_provv )H__1 +=
					'	<div class="rgAnag rgContatti">' +
					'		<div class="contAnag">' +
								HTML_provv +
					'		</div>' +
					'		<div class="l"></div>' +
					'	</div>';
			
			// AZIENDA
			var HTML_provv = '';
			if(	Intestazione.trim() ){
				HTML_provv += '<div>' + htmlEntities(Intestazione).replace(/\n/g, '<br>')+ '</div>';
			}
			if(PartitaIva.trim()){
				HTML_provv += '<div><i>'+htmlEntities(Lingua(TXT_PartitaIva))+':</i> ' + htmlEntities(PartitaIva) + '</div>';
			}
			if(CodiceFiscale.trim()){
				HTML_provv += '<div><i>'+htmlEntities(Lingua(TXT_CodiceFiscale))+':</i> ' + htmlEntities(CodiceFiscale) + '</div>';
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
			var HTML_provv = '';
			if(Professione.trim()){
				HTML_provv += '<div><i>'+htmlEntities(Lingua(TXT_Professione))+':</i> ' + htmlEntities(Professione) + '</div>';
			}
			if(Provenienza.trim()){
				HTML_provv += '<div><i>'+htmlEntities(Lingua(TXT_Provenienza))+':</i> ' + htmlEntities(Provenienza) + '</div>';
			}
			if(Social.trim()){
				HTML_provv += '<div><i>'+htmlEntities(Lingua(TXT_Social))+':</i> ' + htmlEntities(Social) + '</div>';
			}
			HTML_provv += H.scriviEtichette('aggiuntive');
			if(HTML_provv)H__1 +=
					'	<div class="rgAnag rgAggiuntive">' +
					'			<div class="contAnag">' +
								HTML_provv +
					'			</div>' +
					'		<div class="l"></div>' +
					'	</div>';
					
			/*// TAGS	
			if(tags.length){
				
				H__1 +=	'	<div class="rgAnag rgTags">' +
						'			<div class="contAnag">';
						
				for(p in tags){
					H__1 += '<span class="tag"' +
							'	   style="background-color:#'+tags[p].colore+';">' +
								htmlEntities(tags[p].NomeTag) +
							'</span>';
				}	
				H__1 += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
				
			}*/
			
			// scheda medica
			var H__2 = '';
			
			// BIOMETRICI
			var HTML_provv = '';
			if(Altezza.trim()){
				HTML_provv += '<div><i>'+htmlEntities(Lingua(TXT_Altezza))+':</i> ' + htmlEntities(Altezza) + '</div>';
			}
			if(Peso.trim()){
				HTML_provv += '<div><i>'+htmlEntities(Lingua(TXT_Peso))+':</i> ' + htmlEntities(Peso) + '</div>';
			}
			HTML_provv += H.scriviEtichette('biometrici');
			
			
			if(HTML_provv)H__2 +=
					'	<div class="rgAnag rgBiometrici">' +
					'		<div class="etRgAnag">' + htmlEntities(Lingua(TXT_LabelBiometrici)) + '</div>' +
					'		<div style="padding-left:6px;padding-bottom:10px;">' +
								HTML_provv +
					'		</div>' +
					'		<div class="l"></div>' +
					'	</div>';
			
			
			obj = PAZIENTI.defElemento( 'medicine' );
			if(obj.ELS.length>0){
				
				H__2 +=	'	<div class="rgAnag rgMedicine">' +
						'			<div>';
				for(p in obj.ELS){
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
				for(p in obj.ELS){
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
				for(p in obj.ELS){
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
				for(p in obj.ELS){
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
					
			SCHEDA.caricaScheda(	stripslashes(Lingua(TXT_Anagrafica)),
									HTML,
									'PAZIENTI.chiudiPaziente();',
									'scheda_paziente',
									false,
									true );
			
			if(salvato)SCHEDA.msgSalvataggio();
		}});
	},
	mod_paziente: function(){ //salva l'anagrafica paziente
		if(!verifica_form(document.getElementById("formMod")))return;
		if(document.formMod.Cellulare.value && !document.formMod.paeseCellulare.value){
			ALERT(stripslashes(Lingua(TXT_ErrorePrefisso)));
			return;
		}
		var DataModifica = DB.pazienti.lastSync+1;
		var d=new Date();
		var md5=MD5("P"+d);
		var postAction = '';
		var avatar = document.getElementById("avatarPaziente").getElementsByTagName("div")[0].style.backgroundImage;
		if(avatar)avatar = avatar.split(avatar[4])[1].replace(location.origin+location.pathname,'');
		if(typeof(avatar) == 'undefined')avatar = '';
		
		GiornoNascita = document.formMod.giornoDataNascita.value;
		MeseNascita = document.formMod.meseDataNascita.value;
		AnnoNascita = document.formMod.annoDataNascita.value;
		DataNascita = '0000-00-00';
		if(GiornoNascita && MeseNascita && AnnoNascita){
			DataNascita=AnnoNascita+"-"+MeseNascita+"-"+GiornoNascita;
		}
		
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
			for(p in DB.pazienti.data){
				DB.pazienti.data[p].id_interno=p;
				if(md5==DB.pazienti.data[p].md5)PAZIENTI.idCL=p;
			}
			postAction = 'PAZIENTI.selPaziente('+p+');';
		}
		
		endChangeDetection();
		SCHEDA.formModificato = false;
		applicaLoading(document.getElementById("scheda_testo"));
		applicaLoading(document.getElementById("elenchi_lista"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
			LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'rimuoviLoading(document.getElementById("elenchi_lista"));' +
								'PAZIENTI.vis_paziente(true);' +
								/*'PAZIENTI.car_paziente(true);' +*/
								/*'SCHEDA.scaricaScheda(true);' +*/
								postAction );
		});
		return false;
	},
	el_paziente: function( Q_idPaz ){ // elimina la scheda del paziente
		CONFIRM.vis(	Lingua(TXT_ChiediEliminaPaziente),
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			
			if(Q_idPaz>-1){
				var DataModifica = DB.pazienti.lastSync+1;
				DB.pazienti.data[Q_idPaz].DataModifica=parseInt(DataModifica);
				DB.pazienti.data[Q_idPaz].Cancellato=1;
				DB.pazienti.data[Q_idPaz].md5='';
				PAZIENTI.pazSelMD5='';
				// cancello anche le note
				//cancellaNoteInutilizzate();
			}
			
			for(n in DB.note.data){
				if(PAZIENTI.idCL == DB.note.data[n].idCL){
					DB.note.data[n].Cancellato = 1;
				}
			}
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				LOGIN.sincronizza();
				PAZIENTI.idCL = -1;
				PAZIENTI.idPaziente = -1;
				PAZIENTI.chiudiPaziente();
				PAZIENTI.caricaPazienti();
				SCHEDA.scaricaScheda();
				try{
					SET.leggiNote();
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note)).then(function(){
						// salvo il DB
					});
				}catch(err){}
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
	salvaAvatar: function( obj ){
		obj = JSON.parse(obj);
		document.getElementById('avatarPaziente').getElementsByTagName('div')[0].style.backgroundImage="url('"+obj.imgMini+"')";
		document.getElementById('delAvatarPaziente').style.display = 'block';
		SCHEDA.formModificato = true;
	},
	deleteAvatar: function(){
		document.getElementById('avatarPaziente').getElementsByTagName('div')[0].style.backgroundImage="";
		document.getElementById('delAvatarPaziente').style.display = 'none';
		SCHEDA.formModificato = true;
	},
	
	// tags
	caricaTags: function(){ // carica i tags del paziente
		var HTML='';
		if(PAZIENTI.tagsProvvisori.length>0){
			for(p in PAZIENTI.tagsProvvisori){
				HTML += '<div class="rgTagsMod"' +
						'	  data-id="'+PAZIENTI.tagsProvvisori[p].idTag+'">' +
						'	<span class="tag"' +
						'		  style="background-color:#'+PAZIENTI.tagsProvvisori[p].colore+';">' +
								htmlEntities(PAZIENTI.tagsProvvisori[p].NomeTag) +
						'		<img src="img/ico_modifica_mini.png"' +
						'			 width="22"' +
						'			 height="22"' +
						'			 style="margin-right: -5px;' +
						'		  		    margin-top: -2px;' +
						'		  		    cursor: pointer;"' +
						'			 align="absmiddle"' +
						'			 onClick="PAZIENTI.modificaTag(this);"' +
						'			 data-value="'+htmlEntities(PAZIENTI.tagsProvvisori[p].NomeTag)+'"' +
						'			 data-colore="'+PAZIENTI.tagsProvvisori[p].colore+'"' +
						'			 class="occhio">' +
						'	</span>' +
						'	<img src="img/ico_cestino.png"' +
						'		 width="16"' +
						'		 height="16"' +
						'		 align="absmiddle"' +
						'		 style="float:right;' +
						'		 		margin:11px;' +
						'		 		cursor:pointer;' +
						'		 		opacity:0.5;"' +
						'		 title="'+Lingua(TXT_DelDett)+'"' +
						'		 onClick="PAZIENTI.eliminaTag('+p+');"' +
						'		 class="occhio">' +
						'</div>';
			}
		}else{
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						Lingua(TXT_NoRes)+'...' +
					'</div>';
		}
		document.getElementById('contTags').innerHTML = HTML;
	},
	aggiungiTag: function( el ){ // aggiunge un tag al paziente
		var txt = document.getElementById("tag_add").value;
		var colore = document.getElementById("tag_col").dataset.colore;
		var globalTags = PAZIENTI.getTags();
		var pass = true;
		if(txt.trim()=='')pass=false;
		var oldValue = oldColor = '';
		if(el.parentElement.getElementsByTagName("input")[0].dataset.oldValue){ // verifico se è in modifica con oldValue
			oldValue = el.parentElement.getElementsByTagName("input")[0].dataset.oldValue;
			oldColor = document.getElementById("tag_col").dataset.oldColor;
		}
		var els = document.getElementById("elencoTags").getElementsByClassName("elMod");
		for(e in els){
			if(els[e].dataset){
				var val = els[e].dataset.value.toLowerCase();
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
					ALERT(Lingua(TXT_erroreDuplicazioneElemento))
					return;
				}
			}
		}
		var id = 0;
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
					var DataModifica = DB.pazienti.lastSync+1;
					var PZ = DB.pazienti.data;
					var modificato = false;
					for(p in PZ){
						var tags = toJson(PZ[p].tags);
						var tgMod = false;
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
					for(p in PAZIENTI.tagsProvvisori){
						if(PAZIENTI.tagsProvvisori[p].NomeTag == oldValue){
							PAZIENTI.tagsProvvisori[p] = JSNPUSH;
						}
					}
					PAZIENTI.popolaTags();
					PAZIENTI.caricaTags();
					//console.log(modificato)
					if(modificato){
						applicaLoading(document.getElementById("scheda_testo"));
						applicaLoading(document.getElementById("elenchi_lista"));
						localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
							LOGIN.sincronizza(	'/*noRic*/' +
												'rimuoviLoading(document.getElementById("scheda_testo"));' +
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
		var oldCol = el.dataset.colore;
		var cSel = -1;
		for(c=0;c<DB.coloriTags.length;c++){
			if(DB.coloriTags[c]==oldCol)cSel = c+1;
		}
		if(cSel==DB.coloriTags.length)cSel = 0;
		newCol = DB.coloriTags[cSel];
		el.dataset.colore = newCol;
		el.style.backgroundColor = "#"+newCol;
	},
	getTags: function(){ // restituisce l'elenco globale dei tags
		var TAGS = [];
		var PZ = DB.pazienti.data;
		for(p in PZ){
			var tags = toJson(PZ[p].tags);
			if(tags.length){
				for(t in tags){
				   var pass = true;
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
	selezionaTag: function( t ){
		if(typeof(id)=='undefined')var id=0;
		var globalTags = PAZIENTI.getTags();
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
		var HTML = '';
		var globalTags = PAZIENTI.getTags();
		for(t in globalTags){
			var pass = true;
			for(e in PAZIENTI.tagsProvvisori){
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
		var pulsanteModifica = document.getElementById("cont_tag_add").getElementsByTagName("div")[1];
		var pulsanteAnnulla = document.getElementById("cont_tag_add").getElementsByTagName("div")[0];
		pulsanteModifica.dataset.oldName = pulsanteModifica.innerHTML;
		pulsanteModifica.innerText = htmlEntities(Lingua(TXT_Modifica));
		document.getElementById("tag_col").style.backgroundColor = '#'+el.dataset.colore;
		document.getElementById("tag_col").dataset.colore = el.dataset.colore;
		document.getElementById("tag_col").dataset.oldColor = el.dataset.colore;
		document.getElementById("cont_tag_add").classList.add("modEl");
		document.getElementById('tag_add').focus();
		pulsanteAnnulla.classList.add("visBtn");
	},
	annullaTag: function(){
		var pulsanteModifica = document.getElementById("cont_tag_add").getElementsByTagName("div")[1];
		var pulsanteAnnulla = document.getElementById("cont_tag_add").getElementsByTagName("div")[0];
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
			var elenco = document.getElementById("elencoTags");
			var els = elenco.getElementsByClassName("elMod");
			var campo = document.getElementById("tag_add");
			var oldValue = campo.dataset.oldValue;
			if(typeof(oldValue)=='undefined')oldValue = '';
			if(oldValue==''){
				var txt = campo.value.toLowerCase().trim();
				var presenti = false;
				for(e in els){
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
		var obj = {};
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
		var HTML ='';
		if(obj.ELS.length>0){
			for(p in obj.ELS){
				HTML += '<div class="rg'+obj.els+'Mod"' +
						'	  data-id="'+obj.ELS[p]["id"+obj.el]+'">' +
						'	<span class="'+obj.el.toLowerCase()+'">' +
								htmlEntities(obj.ELS[p]["Nome"+obj.el]) +
						'		<img src="img/ico_modifica_mini.png"' +
						'			 width="22"' +
						'			 height="22"' +
						'			 style="margin-right: -5px;' +
						'		  		    margin-top: -2px;' +
						'		  		    cursor: pointer;"' +
						'			 align="absmiddle"' +
						'			 onClick="PAZIENTI.modificaElemento(this,\''+tipo+'\');"' +
						'			 data-value="'+htmlEntities(obj.ELS[p]["Nome"+obj.el])+'"' +
						'			 class="occhio">' +
						'	</span>' +
						'	<img src="img/ico_cestino.png"' +
						'		 width="16"' +
						'		 height="16"' +
						'		 align="absmiddle"' +
						'		 style="float:right;' +
						'		 		margin:11px;' +
						'		 		cursor:pointer;' +
						'		 		opacity:0.5;"' +
						'		 title="'+Lingua(TXT_DelDett)+'"' +
						'		 onClick="PAZIENTI.eliminaElemento('+p+',\''+tipo+'\');"' +
						'		 class="occhio">' +
						'</div>';
			}
		}else{
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						Lingua(TXT_NoRes)+'...' +
					'</div>';
		}
		document.getElementById('cont'+obj.els).innerHTML = HTML;
	},
	aggiungiElemento: function( tipo, el ){ // aggiunge un elemento a un elenco
		obj = PAZIENTI.defElemento( tipo );
		
		var txt=document.getElementById(obj.el.toLowerCase()+"_add").value;
		var global = PAZIENTI.getElementi(tipo);
		var pass = true;
		if(txt.trim()=='')pass=false;
		var oldValue = '';
		if(el.parentElement.getElementsByTagName("div")[1].dataset.oldName){ // verifico se è in modifica con oldValue
			oldValue = el.parentElement.getElementsByTagName("input")[0].dataset.oldValue;
		}
		var els = document.getElementById("elenco"+obj.els).getElementsByClassName("elMod");
		for(e in els){
			if(els[e].dataset){
				var val = els[e].dataset.value.toLowerCase();
				if(	val.trim() == txt.toLowerCase().trim() && !oldValue){
					PAZIENTI.selezionaElemento(e, tipo);
					return;
				}
			}
		}
		var id = 0;
		if(pass){
			JSNPUSH={};
			JSNPUSH["id"+obj.el] = id*1;
			JSNPUSH["Nome"+obj.el] = txt.trim();
			
			var EL = null;
			if(tipo=='medicine')EL = PAZIENTI.medicineProvvisorie;
			if(tipo=='allergie')EL = PAZIENTI.allergieProvvisorie;
			if(tipo=='patologie')EL = PAZIENTI.patologieProvvisorie;
			if(tipo=='interventi')EL = PAZIENTI.interventiProvvisori;
			// verifico doppione
			if(!oldValue){
				for(e in EL){
					if(txt.trim() == EL[e]["Nome"+obj.el]){
						ALERT(Lingua(TXT_erroreDuplicazioneElemento))
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
					var DataModifica = DB.pazienti.lastSync+1;
					var modificato = false;
					obj = PAZIENTI.defElemento( tipo );
					var PZ = DB.pazienti.data;
					for(p in PZ){
						var elenco = toJson(PZ[p][tipo]);
						var pzMod = false;
						if(elenco.length){
							for(e in elenco){
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
					for(p in EL){
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
							LOGIN.sincronizza(	'/*noRic*/' +
												'rimuoviLoading(document.getElementById("scheda_testo"));' +
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
		var LISTA = [];
		var PZ = DB.pazienti.data;
		for(p in PZ){
			var elenco = toJson(PZ[p][tipo]);
			if(elenco.length){
				for(e in elenco){
				   var pass = true;
				   for(M in LISTA){
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
		obj = PAZIENTI.defElemento( tipo );
		if(typeof(id)=='undefined')var id=0;
		var global = PAZIENTI.getElementi(tipo);
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
		obj = PAZIENTI.defElemento( tipo );
		var HTML = '';
		var global = PAZIENTI.getElementi(tipo);
		for(m in global){
			var pass = true;
			for(e in obj.ELS){
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
		obj = PAZIENTI.defElemento( tipo );
		var valore = el.dataset.value;
		var cont = document.getElementById("cont_"+obj.el.toLowerCase()+"_add");
		var campo = cont.getElementsByTagName("input")[0];
		var pulsanteAnnulla = cont.getElementsByTagName("div")[0];
		var pulsanteModifica = cont.getElementsByTagName("div")[1];
		campo.value = valore;
		campo.dataset.oldValue = valore;
		pulsanteModifica.dataset.oldName = pulsanteModifica.innerHTML;
		pulsanteModifica.innerHTML = htmlEntities(Lingua(TXT_Modifica));
		pulsanteAnnulla.classList.add("visBtn");
		cont.classList.add("modEl");
		campo.focus();
	},
	annullaElemento: function( tipo ){
		obj = PAZIENTI.defElemento( tipo );
		var cont = document.getElementById("cont_"+obj.el.toLowerCase()+"_add");
		var campo = document.getElementById(obj.el.toLowerCase()+"_add");
		var pulsanteAnnulla = campo.parentElement.getElementsByTagName("div")[0];
		var pulsanteModifica = campo.parentElement.getElementsByTagName("div")[1];
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
			obj = PAZIENTI.defElemento( tipo );
			var elenco = document.getElementById("elenco"+obj.els);
			var els = elenco.getElementsByClassName("elMod");
			var campo = document.getElementById(obj.el.toLowerCase()+"_add");
			var oldValue = campo.dataset.oldValue;
			if(typeof(oldValue)=='undefined')oldValue = '';
			if(oldValue==''){
				var txt = campo.value.toLowerCase().trim();
				var presenti = false;
				for(e in els){
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
		if(typeof(data) == 'undefined')var data = oggi;
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
		
		SCHEDA.caricaScheda( stripslashes(Lingua(TXT_Agenda)), HTML, '', 'scheda_agenda', false, true );
		
		agenda.apri(data,document.getElementById("agendaPlaceHolder"),null,document.getElementById("agendaPlaceHolder"));
		MENU.comprimiIcone(true);
	}
}