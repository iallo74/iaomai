var ANNOTAZIONI = {
	annOp: false,
		
	caricaAnnotazioni: function(){ // carica l'elenco delle annotazioni
		let HTML = '';
		
		// pulsante aggiungi un appunto
		HTML += '<div class="menuElenchi"' +
				'	  onClick="MENU.visMM(\'add_ann\');">' +
				'</div>' +
				'<p id="add_ann">' +
				'	<input id="ann_ricerca"' +
				'		   onKeyUp="ANNOTAZIONI.filtra();"' +
				'		   class="okPlaceHolder"' +
				'		   placeholder="'+htmlEntities(TXT("CercaAnnotazione"))+'"'+H.noAutoGen+'>' +
				'	<i class="elMenu"' +
				'	   id="addAnnotazione"' +
				'	   title="'+TXT("AggiungiAnnotazione")+'"' +
				'	   onclick="ANNOTAZIONI.car_annotazione();">' +
				/*'		<span>'+TXT("AggiungiAnnotazione")+'</span>' +*/
				'	</i>' +
				'</p>' +
				'<div class="lista listaAnnotazioni">';
		let noAnn = true;
		if(DB.annotazioni.data.length){
			let clonaANNOTAZIONI = clone(DB.annotazioni.data);
			for(let p in clonaANNOTAZIONI){
				clonaANNOTAZIONI[p].p = p;
			}
			clonaANNOTAZIONI.sort(sort_by("TitoloAnnotazione", false));
			for(let p in clonaANNOTAZIONI){
				let AN = clonaANNOTAZIONI[p];
				
				if(!AN.Cancellato){
					noAnn = false;
					HTML +=
					'	<div class="base"' +
					'		 id="annotazione_'+AN.p+'"' +
					'		 onClick="ANNOTAZIONI.car_annotazione('+AN.p+');">' +
					htmlEntities(AN.TitoloAnnotazione) +
					'	</div>';
				}
			}
		}
		if(noAnn){
			HTML += 
				'	<span class="noResults"' +
				'		  style="display:inline-block;' +
				'				 vertical-align: top;">' +
						TXT("NoResAnnotazione") +
				'	</span>';
		}

		HTML += MENU.cestinoScrivi('annotazioni') +
				'</div>';

		// scrivo l'elenco
		document.getElementById("lista_annotazioni").innerHTML = HTML;
	},
	filtra: function( event ){ // filtra l'elenco delle annotazioni
		let parola = document.getElementById("ann_ricerca").value;
		for(let p in DB.annotazioni.data){
			if(!DB.annotazioni.data[p].Cancellato*1){
				if(DB.annotazioni.data[p].TitoloAnnotazione.toLowerCase().indexOf(parola.toLowerCase()) == -1){
					document.getElementById("annotazione_"+p).classList.add("nasPazRic");
				}else{
					document.getElementById("annotazione_"+p).classList.remove("nasPazRic");
				}
			}
		}
		if(parola)document.getElementById("ann_ricerca").classList.add("filtro_attivo");
		else document.getElementById("ann_ricerca").classList.remove("filtro_attivo");
	},
	car_annotazione: function( Q_idAnn, salvato ){ // carica la scheda dell'annotazione
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			Q_idAnn = __(Q_idAnn, -1);
			salvato = __(salvato, false);
			MENU.nasMM();
			let idAnnotazione=0,
				TitoloAnnotazione='',
				TestoAnnotazione='';
			if(Q_idAnn>-1){
				let AN = DB.annotazioni.data[Q_idAnn];
				idAnnotazione = AN.idAnnotazione;
				TitoloAnnotazione = AN.TitoloAnnotazione;
				TestoAnnotazione = AN.TestoAnnotazione;
			}
			
			let HTML = '',
				cont = '';
			HTML += '<form id="formMod"' +
					'	   name="formMod"' +
					'	   method="post"' +
					'	   onSubmit="return false;">' +
					
					// Campi hascosti
					H.r({	t: "h", name: "stessa",	value: "1" }) +
					H.r({	t: "h", name: "idAnnotazione",	value: idAnnotazione*1 }) +
			
			
			
					// Campi
					H.r({	t: "r",
							name: "TitoloAnnotazione",
							value: TitoloAnnotazione,
							noLabel: true,
							label: TXT("Titolo"),
							classCampo: "okPlaceHolder",
							ver: "1|0" }) +
			
					H.r({	t: "t", 
							name: "TestoAnnotazione",
							value: TestoAnnotazione,
							label: TXT("InserisciNote"),
							noLabel: true,
							classCampo: "okPlaceHolder txtFull",
							styleCampo: "width: calc(100% - 68px) !important;" });
							
			let azAnnulla = Q_idAnn>-1 ? "SCHEDA.scaricaScheda();" : "SCHEDA.scaricaScheda();",
				azElimina = Q_idAnn>-1 ? "ANNOTAZIONI.el_annotazione("+Q_idAnn+");" : "",
				btnAdd = '';
			if(azElimina){
				btnAdd += '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+TXT("EliminaScheda")+'</div>';
			}
			btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.notes\')">' +
							TXT("ReferenceGuide") +
						'</div>';
			
			HTML += SCHEDA.pulsantiForm(
						Q_idAnn>-1 ? "ANNOTAZIONI.el_annotazione("+Q_idAnn+");":"",
						azAnnulla, 
						"ANNOTAZIONI.mod_annotazione("+Q_idAnn+");" ) +
					'</form>';
			
			
			let titoloDef=TXT("ModificaAnnotazione");
			if(Q_idAnn==-1)titoloDef=TXT("CreaAnnotazione");
			
			SCHEDA.caricaScheda(	stripslashes(titoloDef),
									HTML,
									'ANNOTAZIONI.chiudiAnnotazione('+idAnnotazione+');',
									'scheda_annotazione',
									false,
									true,
									document.getElementById("annotazione_"+Q_idAnn),
									btnAdd );
									
			initChangeDetection( "formMod" );
			
			if(mouseDetect)document.formMod.TitoloAnnotazione.focus();
	
			SCHEDA.formModificato = false;
			
			if(salvato)SCHEDA.msgSalvataggio();
			
			// verifico che non sia già aperta da qualcun altro e intanto la blocco
			LOGIN.verifyLocked("annotazioni",idAnnotazione);
			
		}});
	},
	chiudiAnnotazione: function( idAnnotazione ){ // chiude l'annotazione
		SCHEDA.formModificato = false;
		ANNOTAZIONI.annOp = false;
			
		// tolgo il blocco online dall'elemento
		if(typeof(idAnnotazione)!='undefined')LOGIN.closeLocked("annotazioni",idAnnotazione);
	},
	mod_annotazione: function( Q_idAnn ){ //salva l'annotazione
		if(!verifica_form(document.getElementById("formMod")))return;
		let DataModifica = DB.annotazioni.lastSync+1;
		if(document.formMod.idAnnotazione.value*1>-1)DataCreazione=DataModifica;
		else DataCreazione = DB.annotazioni.data[Q_idAnn].DataCreazione;
		
		JSNPUSH={ 	"idAnnotazione": document.formMod.idAnnotazione.value*1,
					"TitoloAnnotazione": document.formMod.TitoloAnnotazione.value,
					"TestoAnnotazione": document.formMod.TestoAnnotazione.value,
					"DataModifica": parseInt(DataModifica),
					"DataCreazione": parseInt(DataCreazione),
					"Cancellato": 0,
					"frv": (LOGIN._frv()!='') };
					
		if(Q_idAnn*1>-1){
			// annotazione esistente
			DB.annotazioni.data[Q_idAnn]=JSNPUSH;
		}else{
			// nuova annotazione
			DB.annotazioni.data.push(JSNPUSH);
			Q_idAnn = DB.annotazioni.data.length-1;
		}
		
		let postAction = !LOGIN.logedin() ? 'ANNOTAZIONI.caricaAnnotazioni()' : '';
		endChangeDetection();
		SCHEDA.formModificato = false;
		applicaLoading(document.getElementById("scheda_testo"));
		applicaLoading(document.getElementById("elenchi_lista"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".annotazioni"), IMPORTER.COMPR(DB.annotazioni)).then(function(){ // salvo il DB
			SYNCRO.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'rimuoviLoading(document.getElementById("elenchi_lista"));' +
								'ANNOTAZIONI.car_annotazione('+Q_idAnn+',true);' +
								'if(smartMenu)SCHEDA.scaricaScheda(true);' +/* CHIUSURA DOPO SALVATAGGIO*/
								postAction );
		});
		return false;
	},
	el_annotazione: function( Q_idAnn ){ // elimina l'annotazione'
		CONFIRM.vis(	TXT("ChiediEliminaAnnotazione"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			if(Q_idAnn>-1){
				let DataModifica = DB.annotazioni.lastSync+1;
				DB.annotazioni.data[Q_idAnn].DataModifica=parseInt(DataModifica);
				DB.annotazioni.data[Q_idAnn].Cancellato=1;
				idAnnotazione = __(DB.annotazioni.data[Q_idAnn].idAnnotazione,0);
			}
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".annotazioni"), IMPORTER.COMPR(DB.annotazioni)).then(function(){ // salvo il DB
				SYNCRO.sincronizza( 'ANNOTAZIONI.chiudiAnnotazione('+idAnnotazione+');' +
									'ANNOTAZIONI.caricaAnnotazioni();' );
				
				SCHEDA.scaricaScheda();
			});
		}});
	},
	azRicercaAnnotazioni: function( p ){ // clic sul risultato della ricerca
		ANNOTAZIONI.car_annotazione(p);
		SCHEDA.apriElenco('base');
		SCHEDA.selElenco('annotazioni');
		RICERCHE.nascondiGlobal();
	}
}