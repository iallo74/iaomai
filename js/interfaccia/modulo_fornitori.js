
var FORNITORI = {
	fornOp: false,
		
	caricaFornitori: function(){ // carica l'elenco dei fornitori
		var HTML = '';
		
		// pulsante aggiungi fornitore
		HTML += '<div class="menuElenchi"' +
				'	  onClick="MENU.visMM(\'add_forn\');">' +
				'</div>' +
				'<p id="add_forn">' +
				'	<input id="forn_ricerca"' +
				'		   onKeyUp="FORNITORI.filtra();"' +
				'		   class="okPlaceHolder"' +
				'		   placeholder="'+htmlEntities(Lingua(TXT_CercaFornitore))+'"'+H.noAutoGen+'>' +
				'	<i class="elMenu"' +
				'	   id="addFornitore"' +
				'	   title="'+Lingua(TXT_AggiungiFornitore)+'"' +
				'	   onclick="FORNITORI.car_fornitore();">' +
				/*'		<span>'+Lingua(TXT_AggiungiFornitore)+'</span>' +*/
				'	</i>' +
				'</p>' +
				'<div class="lista listaFornitori">';
		var noForn = true;
		if(DB.fornitori.data.length){
			var cloneFORNITORI = clone(DB.fornitori.data);
			for(p in cloneFORNITORI){
				cloneFORNITORI[p].p = p;
			}
			cloneFORNITORI.sort(sort_by("RagioneSociale", false));
			for(p in cloneFORNITORI){
				var FR = cloneFORNITORI[p];
				
				if(!FR.Cancellato){
					noForn = false;
					/*HTML +=
					'	<div class="frdx"' +
					'		 id="fornitore_'+FR.p+'"' +
					'		 onClick="FORNITORI.car_fornitore('+FR.p+');">';*/
					HTML +=
					'	<div class="base"' +
					'		 id="fornitore_'+FR.p+'"' +
					'		 onClick="FORNITORI.car_fornitore('+FR.p+');">';
					
							/*HTML += 
					'		<img src="img/ico_fornitore.png"' +
					'			 class="imgList">';*/
					// verifico se è stato modificato e non sincronizzato
					var mdT=false;
					if(FR.DataModifica > DB.fornitori.lastSync)mdT=true;
					
					if(mdT)HTML += H.imgSyncro();
					HTML += htmlEntities(FR.RagioneSociale);
					HTML +=
					'	</div>';
				}
			}
		}
		if(noForn){
			HTML += 
				'	<span class="noResults"' +
				'		  style="display:inline-block;' +
				'				 vertical-align: top;">' +
						Lingua(TXT_NoResFornitore) +
				'	</span>';
		}
		HTML += '</div>';
		// scrivo l'elenco
		document.getElementById("lista_fornitori").innerHTML = HTML;
	},
	filtra: function( event ){
		var parola = document.getElementById("forn_ricerca").value;
		for(p in DB.fornitori.data){
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
	chiudiFornitore: function(){ // chiude la scheda anagrafica
		SCHEDA.formModificato = false;
		FORNITORI.fornOp = false;
	},
	car_fornitore: function( Q_idForn, salvato ){ // carica la scheda anagrafica del fornitore
		// verifico le autorizzazioni
		if(__(Q_idForn,-1)==-1){
			var maxFornitori = 1;
			if(LOGIN.reg() && LOGIN.logedin()){
				if(DB.login.data.auths.indexOf("clients_full")>-1)maxFornitori = -1;
				else maxFornitori = 5;
			}
			if(maxFornitori>-1){
				var tForn = 0;
				for(c in DB.fornitori.data){
					if(DB.fornitori.data[c].Cancellato*1==0)tForn++;
				}
				if(tForn >= maxFornitori){
					ALERT(Lingua(eval("TXT_MsgMaxFornitori"+maxFornitori)));
					return;
				}
			}
		}
		// --------------------------
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			
			var Q_idForn = __(Q_idForn, -1);
			var salvato = __(salvato, false);
			MENU.nasMM();
			var idFornitore=0;
			var RagioneSociale='';
			var Intestazione='';
			var PartitaIva='';
			var CodiceFiscale='';
			var Indirizzo='';
			var CAP='';
			var Citta='';
			var Provincia='';
			var Stato='';
			var Telefono='';
			var Email='';
			var NoteFornitore='';
			var etichette=[];
			if(Q_idForn>-1){
				var FR = DB.fornitori.data[Q_idForn];
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
			
			var HTML = '';
			HTML += '<form id="formMod"' +
					'	   name="formMod"' +
					'	   method="post"' +
					'	   onSubmit="return false;">';
					
			// Campi hascosti
			HTML += H.r({	t: "h", name: "stessa",	value: "1" });
			HTML += H.r({	t: "h", name: "idFornitore",	value: idFornitore*1 });
			
			
			
			// Campi
			HTML += H.r({	t: "r",
							name: "RagioneSociale",
							value: RagioneSociale,
							noLabel: true,
							label: Lingua(TXT_RagioneSociale),
							classCampo: "okPlaceHolder",
							ver: "1|0" });
					
			
			
			HTML += '<div class="sezioneTrattamenti divEspansa "' +
					'	  style="background:transparent !important;' +
					'	  border-top:none !important;' +
					'	  padding: 8px;"></div>';
					
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
					
			// sezione ANNOTAZIONI
			var cont = '';
			cont += H.r({	t: "t", 
							name: "NoteFornitore",
							value: NoteFornitore,
							label: Lingua(TXT_InserisciNote),
							noLabel: true,
							classCampo: "okPlaceHolder" });
					
			HTML += H.sezione({
				label: Lingua(TXT_LabelAnnotazioni),
				nome: 'annotazioni',
				html: cont
						});	
			
			var azAnnulla = "SCHEDA.scaricaScheda();";
			if(Q_idForn>-1)azAnnulla = "SCHEDA.scaricaScheda();";
			var azElimina = Q_idForn>-1 ? "FORNITORI.el_fornitore("+Q_idForn+");":"";
			var btnAdd = '';
			if(azElimina){
				btnAdd = '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+Lingua(TXT_EliminaScheda)+'</div>';
			}
			
			HTML += SCHEDA.pulsantiForm(
									Q_idForn>-1 ? "FORNITORI.el_fornitore("+Q_idForn+");":"",
									azAnnulla, 
									"FORNITORI.mod_fornitore("+Q_idForn+");" );
			
			HTML += '</form>';
			
			
			var titoloDef=TXT_ModificaFornitore;
			if(Q_idForn==-1)titoloDef=TXT_CreaFornitore;
			
			SCHEDA.caricaScheda(	stripslashes(Lingua(titoloDef)),
									HTML,
									'FORNITORI.chiudiFornitore();',
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
			//H.caricaEtichette('aggiuntive');
			
			if(salvato)SCHEDA.msgSalvataggio();
		}});
	},
	mod_fornitore: function( Q_idForn ){ //salva l'anagrafica fornitore
		if(!verifica_form(document.getElementById("formMod")))return;
		var DataModifica = DB.fornitori.lastSync+1;
		if(document.formMod.idFornitore.value*1>-1)DataCreazione=DataModifica;
		else DataCreazione = DB.fornitori.data[Q_idForn].DataCreazione;
		var d=new Date();
		
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
		
		var postAction = '';
		if(!LOGIN.logedin())postAction = 'FORNITORI.caricaFornitori()';
		endChangeDetection();
		SCHEDA.formModificato = false;
		applicaLoading(document.getElementById("scheda_testo"));
		applicaLoading(document.getElementById("elenchi_lista"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)).then(function(){ // salvo il DB
			LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'rimuoviLoading(document.getElementById("elenchi_lista"));' +
								'FORNITORI.car_fornitore('+Q_idForn+',true);' +
								/*'SCHEDA.scaricaScheda(true);' +/* CHIUSURA DOPO SALVATAGGIO da PC*/
								'if(smartMenu)SCHEDA.scaricaScheda(true);' +/* CHIUSURA DOPO SALVATAGGIO da SMART*/
								postAction/* +
								'FORNITORI.caricaFornitori();'*/ );
		});
		return false;
	},
	el_fornitore: function( Q_idForn ){ // elimina la scheda del fornitore
		CONFIRM.vis(	Lingua(TXT_ChiediEliminaFornitore),
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			
			if(Q_idForn>-1){
				var DataModifica = DB.fornitori.lastSync+1;
				DB.fornitori.data[Q_idForn].DataModifica=parseInt(DataModifica);
				DB.fornitori.data[Q_idForn].Cancellato=1;
			}
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)).then(function(){ // salvo il DB
				LOGIN.sincronizza( 	'FORNITORI.chiudiFornitore();' +
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