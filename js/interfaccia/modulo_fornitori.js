var FORNITORI = {
	fornOp: false,
	maxFornitoriFree: 1,
	maxFornitoriLogged: 5,
		
	caricaFornitori: function(){ // carica l'elenco dei fornitori
		let HTML = '';
		
		// pulsante aggiungi fornitore
		HTML += '<div class="menuElenchi"' +
				'	  onClick="MENU.visMM(\'add_forn\');">' +
				'</div>' +
				'<p id="add_forn">' +
				'	<input id="forn_ricerca"' +
				'		   onKeyUp="FORNITORI.filtra();"' +
				'		   class="okPlaceHolder"' +
				'		   placeholder="'+htmlEntities(TXT("CercaFornitore"))+'"'+H.noAutoGen+'>' +
				'	<i class="elMenu"' +
				'	   id="addFornitore"' +
				'	   title="'+TXT("AggiungiFornitore")+'"' +
				'	   onclick="FORNITORI.car_fornitore();">' +
				/*'		<span>'+TXT("AggiungiFornitore")+'</span>' +*/
				'	</i>' +
				'</p>' +
				'<div class="lista listaFornitori">';
		let noForn = true;
		if(DB.fornitori.data.length){
			let cloneFORNITORI = clone(DB.fornitori.data);
			for(let p in cloneFORNITORI){
				cloneFORNITORI[p].p = p;
			}
			cloneFORNITORI.sort(sort_by("RagioneSociale", false));
			for(let p in cloneFORNITORI){
				let FR = cloneFORNITORI[p];
				
				if(!FR.Cancellato){
					noForn = false;
					HTML +=
					'	<div class="base"' +
					'		 id="fornitore_'+FR.p+'"' +
					'		 onClick="FORNITORI.car_fornitore('+FR.p+');">' +
					htmlEntities(FR.RagioneSociale) +
					'	</div>';
				}
			}
		}
		if(noForn){
			HTML += 
				'	<span class="noResults"' +
				'		  style="display:inline-block;' +
				'				 vertical-align: top;">' +
						TXT("NoResFornitore") +
				'	</span>';
		}

		HTML += MENU.cestinoScrivi('fornitori') +
				'</div>';

		// scrivo l'elenco
		document.getElementById("lista_fornitori").innerHTML = HTML;
	},
	filtra: function( event ){ // filtra l'elenco dei fornitori
		let parola = document.getElementById("forn_ricerca").value;
		for(let p in DB.fornitori.data){
			if(!DB.fornitori.data[p].Cancellato*1){
				if(DB.fornitori.data[p].RagioneSociale.toLowerCase().indexOf(parola.toLowerCase()) == -1){
					document.getElementById("fornitore_"+p).classList.add("nasPazRic");
				}else{
					document.getElementById("fornitore_"+p).classList.remove("nasPazRic");
				}
			}
		}
		if(parola)document.getElementById("forn_ricerca").classList.add("filtro_attivo");
		else document.getElementById("forn_ricerca").classList.remove("filtro_attivo");
	},
	car_fornitore: function( Q_idForn, salvato ){ // carica la scheda anagrafica del fornitore
		// verifico le autorizzazioni
		if(__(Q_idForn,-1)==-1){
			let maxFornitori = FORNITORI.maxFornitoriFree,
				addMaxTxt = 'Free',
				tForn = 0;
			if(LOGIN.reg() && LOGIN.logedin()){
				if(DB.login.data.auths.indexOf("clients_full")>-1)maxFornitori = -1;
				else{
					maxFornitori = FORNITORI.maxFornitoriLogged;
					addMaxTxt = 'Logged';
				}
			}
			if(maxFornitori>-1){
				for(let c in DB.fornitori.data){
					if(DB.fornitori.data[c].Cancellato*1==0)tForn++;
				}
				if(tForn >= maxFornitori && !document.body.classList.contains("pplhd")){
					ALERT(TXT("MsgMaxFornitori"+addMaxTxt).replace("[n]",FORNITORI.maxFornitoriLogged));
					return;
				}
			}
		}
		// --------------------------
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			Q_idForn = __(Q_idForn, -1);
			salvato = __(salvato, false);
			MENU.nasMM();
			let idFornitore=0,
				RagioneSociale='',
				Intestazione='',
				PartitaIva='',
				CodiceFiscale='',
				Indirizzo='',
				CAP='',
				Citta='',
				Provincia='',
				Stato='',
				Telefono='',
				Email='',
				NoteFornitore='',
				etichette=[];
			if(Q_idForn>-1){
				let FR = DB.fornitori.data[Q_idForn];
				idFornitore = FR.idFornitore;
				RagioneSociale = FR.RagioneSociale;
				Intestazione = __(FR.Intestazione);
				PartitaIva = __(FR.PartitaIva);
				CodiceFiscale = __(FR.CodiceFiscale);
				Indirizzo = FR.Indirizzo;
				CAP = FR.CAP;
				Citta = FR.Citta;
				Provincia = FR.Provincia;
				Stato = FR.Stato;
				Telefono = FR.Telefono;
				Email = FR.Email;
				NoteFornitore = __(FR.NoteFornitore);
				etichette = toJson(__(FR.etichette,[]));
			}
			H.etichetteProvvisorie = clone(etichette);
			
			let HTML = '',
				cont = '';
			HTML += '<form id="formMod"' +
					'	   name="formMod"' +
					'	   method="post"' +
					'	   onSubmit="return false;">' +
					
					// Campi hascosti
					H.r({	t: "h", name: "stessa",	value: "1" }) +
					H.r({	t: "h", name: "idFornitore",	value: idFornitore*1 }) +
			
			
			
					// Campi
					H.r({	t: "r",
							name: "RagioneSociale",
							value: RagioneSociale,
							noLabel: true,
							label: TXT("RagioneSociale"),
							classCampo: "okPlaceHolder",
							ver: "1|0" }) +
					
					'<div class="sezioneTrattamenti divEspansa "' +
					'	  style="background:transparent !important;' +
					'	  border-top:none !important;' +
					'	  padding: 8px;"></div>';
					
			// sezione INDIRIZZO
			cont = 	H.r({	t: "r", name: "Indirizzo",	value: Indirizzo,	classCampo: 'styled' }) +
			
					'<div>' +
					H.r({	t: "r",
							name: "Citta",
							value: Citta,
							classRiga: 'contCitta',
							classCampo: 'styled' }) +
					H.r({	t: "r",
							name: "Provincia",
							value: Provincia,
							classRiga: 'contProvincia',
							classCampo: 'styled' }) +
					'</div><div>' +
					H.r({	t: "r", name: "CAP",
							value: CAP,
							classRiga: 'contCAP',
							classCampo: 'styled' }) +
					H.r({	t: "s", 
							name: "Stato",
							value: Stato,
							opts: elencaPaesi(),
							label: TXT("Stato"),
							classRiga: 'contStato',
							classCampo: "selectLargo" }) +
					'</div>';
							
			HTML += H.sezione({
				label: TXT("LabelIndirizzo"),
				nome: 'indirizzo',
				html: cont,
				etichette: true
						});
			
			// sezione CONTATTI
			cont = 	H.r({	t: "r",
							name: "Telefono",
							value: Telefono,
							classCampo: 'styled',
							ver: '0|0|tel'}) +
			
					H.r({	t: "r",
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
			cont = 	H.r({	t: "t", 
							name: "Intestazione",
							classCampo: "Intestazione",
							value: Intestazione,
							label: TXT("IntestazioneSpiegazione"),
							noLabel: true,
							classCampo: "okPlaceHolder" }) +
					H.r({	t: "r", name: "CodiceFiscale",	value: CodiceFiscale,	classCampo: 'styled' }) +
					H.r({	t: "r", name: "PartitaIva",	value: PartitaIva,	classCampo: 'styled' });
			
			HTML += H.sezione({
				label: TXT("LabelFatturazione"),
				nome: 'azienda',
				html: cont,
				etichette: true
						});	
					
			// sezione ANNOTAZIONI
			cont = 	H.r({	t: "t", 
							name: "NoteFornitore",
							value: NoteFornitore,
							label: TXT("InserisciNote"),
							noLabel: true,
							classCampo: "okPlaceHolder" });
					
			HTML += H.sezione({
				label: TXT("LabelAnnotazioni"),
				nome: 'annotazioni',
				html: cont
						});
			
			let azAnnulla = Q_idForn>-1 ? "SCHEDA.scaricaScheda();" : "SCHEDA.scaricaScheda();",
				azElimina = Q_idForn>-1 ? "FORNITORI.el_fornitore("+Q_idForn+");" : "",
				btnAdd = '';
			if(azElimina){
				btnAdd += '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+TXT("EliminaScheda")+'</div>';
			}
			btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.suppliers\')">' +
							TXT("ReferenceGuide") +
						'</div>';
			
			HTML += SCHEDA.pulsantiForm(
									Q_idForn>-1 ? "FORNITORI.el_fornitore("+Q_idForn+");":"",
									azAnnulla, 
									"FORNITORI.mod_fornitore("+Q_idForn+");" ) +
					'</form>';
			
			
			let titoloDef=TXT("ModificaFornitore");
			if(Q_idForn==-1)titoloDef=TXT("CreaFornitore");
			
			SCHEDA.caricaScheda(	stripslashes(titoloDef),
									HTML,
									'FORNITORI.chiudiFornitore('+idFornitore+');',
									'scheda_fornitore',
									false,
									true,
									document.getElementById("fornitore_"+Q_idForn),
									btnAdd );
									
			initChangeDetection( "formMod" );
			
			if(mouseDetect)document.formMod.RagioneSociale.focus();
	
			SCHEDA.formModificato = false;
			
			// CARICA  e POPOLA ETICHETTE
			H.caricaEtichette('indirizzo');
			H.caricaEtichette('contatti');
			H.caricaEtichette('azienda');
			
			if(salvato)SCHEDA.msgSalvataggio();
			
			// verifico che non sia già aperta da qualcun altro e intanto la blocco
			LOGIN.verifyLocked("fornitori",idFornitore);
			
		}});
	},
	chiudiFornitore: function( idFornitore ){ // chiude la scheda anagrafica
		SCHEDA.formModificato = false;
		FORNITORI.fornOp = false;
			
		// tolgo il blocco online dall'elemento
		if(typeof(idFornitore)!='undefined')LOGIN.closeLocked("fornitori",idFornitore);
	},
	mod_fornitore: function( Q_idForn ){ //salva l'anagrafica fornitore
		if(!verifica_form(document.getElementById("formMod")))return;
		let DataModifica = DB.fornitori.lastSync+1;
		if(document.formMod.idFornitore.value*1>-1)DataCreazione=DataModifica;
		else DataCreazione = DB.fornitori.data[Q_idForn].DataCreazione;
		
		JSNPUSH={ 	"idFornitore": document.formMod.idFornitore.value*1,
					"RagioneSociale": document.formMod.RagioneSociale.value,
					"Intestazione": document.formMod.Intestazione.value,
					"PartitaIva": document.formMod.PartitaIva.value,
					"CodiceFiscale": document.formMod.CodiceFiscale.value,
					"Indirizzo": document.formMod.Indirizzo.value,
					"CAP": document.formMod.CAP.value,
					"Citta": document.formMod.Citta.value,
					"Provincia": document.formMod.Provincia.value,
					"Stato": document.formMod.Stato.value,
					"Telefono": document.formMod.Telefono.value,
					"Email": document.formMod.Email.value,
					"NoteFornitore": document.formMod.NoteFornitore.value,
					"etichette": H.etichetteProvvisorie,
					"DataModifica": parseInt(DataModifica),
					"DataCreazione": parseInt(DataCreazione),
					"Cancellato": 0,
					"frv": (LOGIN._frv()!='') };
					
		if(Q_idForn*1>-1){
			// fornitore esistente
			DB.fornitori.data[Q_idForn]=JSNPUSH;
		}else{
			// nuovo fornitore
			DB.fornitori.data.push(JSNPUSH);
			Q_idForn = DB.fornitori.data.length-1;
		}
		
		let postAction = !LOGIN.logedin() ? 'FORNITORI.caricaFornitori()' : '';
		endChangeDetection();
		SCHEDA.formModificato = false;
		applicaLoading(document.getElementById("scheda_testo"));
		applicaLoading(document.getElementById("elenchi_lista"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)).then(function(){ // salvo il DB
			SYNCRO.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'rimuoviLoading(document.getElementById("elenchi_lista"));' +
								'FORNITORI.car_fornitore('+Q_idForn+',true);' +
								'if(smartMenu)SCHEDA.scaricaScheda(true);' +/* CHIUSURA DOPO SALVATAGGIO*/
								postAction );
		});
		return false;
	},
	el_fornitore: function( Q_idForn ){ // elimina la scheda del fornitore
		CONFIRM.vis(	TXT("ChiediEliminaFornitore"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			if(Q_idForn>-1){
				let DataModifica = DB.fornitori.lastSync+1;
				DB.fornitori.data[Q_idForn].DataModifica=parseInt(DataModifica);
				DB.fornitori.data[Q_idForn].Cancellato=1;
				idFornitore = __(DB.fornitori.data[Q_idForn].idFornitore,0);
			}
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)).then(function(){ // salvo il DB
				SYNCRO.sincronizza( 	'FORNITORI.chiudiFornitore('+idFornitore+');' +
									'FORNITORI.caricaFornitori();' );
				
				SCHEDA.scaricaScheda();
			});
		}});
	},
	azRicercaFornitori: function( p ){ // clic sul risultato della ricerca
		FORNITORI.car_fornitore(p);
		SCHEDA.apriElenco('base');
		SCHEDA.selElenco('fornitori');
		RICERCHE.nascondiGlobal();
	}
}