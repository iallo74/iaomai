var MODULI = {
	modlOp: false,
	domande: [],
	
	caricaModuli: function(){ // carica l'elenco dei moduli
		let HTML = '';
		
		// pulsante aggiungi un appunto
		HTML += '<div class="menuElenchi"' +
				'	  onClick="MENU.visMM(\'add_modl\');">' +
				'</div>' +
				'<p id="add_modl">' +
				'	<input id="modl_ricerca"' +
				'		   onKeyUp="MODULI.filtra();"' +
				'		   class="okPlaceHolder"' +
				'		   placeholder="'+htmlEntities(TXT("CercaModulo"))+'"'+H.noAutoGen+'>' +
				'	<i class="elMenu"' +
				'	   id="addModulo"' +
				'	   title="'+TXT("AggiungiModulo")+'"' +
				'	   onclick="MODULI.car_modulo();">' +
				'	</i>' +
				'</p>' +
				'<div class="lista listaModuli">';
		let noModl = true;
		if(DB.moduli.data.length){
			let clonaMODULI = clone(DB.moduli.data);
			for(let p in clonaMODULI){
				clonaMODULI[p].p = p;
			}
			clonaMODULI.sort(sort_by("NomeModulo", false));
			for(let p in clonaMODULI){
				let MD = clonaMODULI[p];
				
				if(!MD.Cancellato){
					noModl = false;
					HTML +=
					'	<div class="base"' +
					'		 id="modulo_'+MD.p+'"' +
					'		 onClick="MODULI.car_modulo('+MD.p+');">' +
					htmlEntities(MD.NomeModulo) +
					'	</div>';
				}
			}
		}
		if(noModl){
			HTML += 
				'	<span class="noResults"' +
				'		  style="display:inline-block;' +
				'				 vertical-align: top;">' +
						TXT("NoResModulo") +
				'	</span>';
		}

		HTML += MENU.cestinoScrivi('moduli') +
				'</div>';

		// scrivo l'elenco
		document.getElementById("lista_moduli").innerHTML = HTML;
	},
	filtra: function( event ){ // filtra l'elenco dei moduli
		let parola = document.getElementById("modl_ricerca").value;
		for(let p in DB.moduli.data){
			if(!DB.moduli.data[p].Cancellato*1){
				if(DB.moduli.data[p].NomeModulo.toLowerCase().indexOf(parola.toLowerCase()) == -1){
					document.getElementById("modulo_"+p).classList.add("nasPazRic");
				}else{
					document.getElementById("modulo_"+p).classList.remove("nasPazRic");
				}
			}
		}
		if(parola)document.getElementById("modl_ricerca").classList.add("filtro_attivo");
		else document.getElementById("modl_ricerca").classList.remove("filtro_attivo");
	},
	car_modulo: function( Q_idModl, salvato ){ // carica la scheda del modulo
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			Q_idModl = __(Q_idModl, -1);
			salvato = __(salvato, false);
			MENU.nasMM();
			let idModulo=0,
				NomeModulo='',
				jsonModulo=[];
			if(Q_idModl>-1){
				let MD = DB.moduli.data[Q_idModl];
				idModulo = MD.idModulo;
				NomeModulo = MD.NomeModulo;
				jsonModulo = __(MD.jsonModulo,[]);
			}
			MODULI.domande = clone(jsonModulo);
			let HTML = '',
				cont = '';
			HTML += '<form id="formMod"' +
					'	   name="formMod"' +
					'	   method="post"' +
					'	   onSubmit="return false;">' +
					
					// Campi hascosti
					H.r({	t: "h", name: "stessa",	value: "1" }) +
					H.r({	t: "h", name: "idModulo",	value: idModulo*1 }) +
			
			
			
					// Campi
					H.r({	t: "r",
							name: "NomeModulo",
							value: NomeModulo,
							noLabel: true,
							label: TXT("Titolo"),
							classCampo: "okPlaceHolder",
							ver: "1|0" });
			

			// DETTAGLI DEL MODULO
			HTML += '<div id="dettagli_modulo"></div>'+
					'<div class="p_sch_label">'+TXT("Aggiungi")+':	</div>'+
					'<div id="btns_modulo">'+
						'<div class="p_paz_label p_quesito" onClick="MODULI.aggiungiDomanda(\'d\');">'+TXT("Quesito")+'</div>'+
						'<div class="p_paz_label p_etichetta" onClick="MODULI.aggiungiDomanda(\'e\');">'+TXT("Etichetta")+'</div>'+
					'</div>';	





							
			let azAnnulla = Q_idModl>-1 ? "SCHEDA.scaricaScheda();" : "SCHEDA.scaricaScheda();",
				azElimina = Q_idModl>-1 ? "MODULI.el_modulo("+Q_idModl+");" : "",
				btnAdd = '';
			if(azElimina){
				btnAdd += '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+TXT("EliminaScheda")+'</div>';
			}
			btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'modules.notes\')">' +
							TXT("ReferenceGuide") +
						'</div>';
			
			HTML += SCHEDA.pulsantiForm(
						Q_idModl>-1 ? "MODULI.el_modulo("+Q_idModl+");":"",
						azAnnulla, 
						"MODULI.mod_modulo("+Q_idModl+");" ) +
					'</form>';
			
			
			let titoloDef=TXT("ModificaModulo");
			if(Q_idModl==-1)titoloDef=TXT("CreaModulo");
			
			SCHEDA.caricaScheda(	stripslashes(titoloDef),
									HTML,
									'MODULI.chiudiModulo('+idModulo+');',
									'scheda_modulo',
									false,
									true,
									document.getElementById("modulo_"+Q_idModl),
									btnAdd );
			
			MODULI.caricaDomande();					
			initChangeDetection( "formMod" );
			
			if(mouseDetect)document.formMod.NomeModulo.focus();
	
			SCHEDA.formModificato = false;
			
			if(salvato)SCHEDA.msgSalvataggio();
			
			// verifico che non sia già aperta da qualcun altro e intanto la blocco
			LOGIN.verifyLocked("moduli",idModulo);
			
		}});
	},
	chiudiModulo: function( idModulo ){ // chiude il modulo
		SCHEDA.formModificato = false;
		MODULI.modlOp = false;
			
		// tolgo il blocco online dall'elemento
		if(typeof(idModulo)!='undefined')LOGIN.closeLocked("moduli",idModulo);
	},
	mod_modulo: function( Q_idModl ){ //salva il modulo
		if(!verifica_form(document.getElementById("formMod")))return;
		let DataModifica = DB.moduli.lastSync+1;
		if(document.formMod.idModulo.value*1>-1)DataCreazione=DataModifica;
		else DataCreazione = DB.moduli.data[Q_idModl].DataCreazione;
		
		JSNPUSH={ 	"idModulo": document.formMod.idModulo.value*1,
					"NomeModulo": document.formMod.NomeModulo.value,
					"jsonModulo": clone(MODULI.domande),
					"DataModifica": parseInt(DataModifica),
					"DataCreazione": parseInt(DataCreazione),
					"Cancellato": 0,
					"frv": (LOGIN._frv()!='') };
					
		if(Q_idModl*1>-1){
			// annotazione esistente
			DB.moduli.data[Q_idModl]=JSNPUSH;
		}else{
			// nuova annotazione
			DB.moduli.data.push(JSNPUSH);
			Q_idModl = DB.moduli.data.length-1;
		}
		
		let postAction = !LOGIN.logedin() ? 'MODULI.caricaModuli()' : '';
		endChangeDetection();
		SCHEDA.formModificato = false;
		applicaLoading(document.getElementById("scheda_testo"));
		applicaLoading(document.getElementById("elenchi_lista"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".moduli"), IMPORTER.COMPR(DB.moduli)).then(function(){ // salvo il DB
			SYNCRO.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'rimuoviLoading(document.getElementById("elenchi_lista"));' +
								'MODULI.car_modulo('+Q_idModl+',true);' +
								'if(smartMenu)SCHEDA.scaricaScheda(true);' +/* CHIUSURA DOPO SALVATAGGIO*/
								postAction );
		});
		return false;
	},
	el_modulo: function( Q_idModl ){ // elimina il modulo
		CONFIRM.vis(	TXT("ChiediEliminaModulo"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			if(Q_idModl>-1){
				let DataModifica = DB.moduli.lastSync+1;
				DB.moduli.data[Q_idModl].DataModifica=parseInt(DataModifica);
				DB.moduli.data[Q_idModl].Cancellato=1;
				idModulo = __(DB.moduli.data[Q_idModl].idModulo,0);
			}
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".moduli"), IMPORTER.COMPR(DB.moduli)).then(function(){ // salvo il DB
				SYNCRO.sincronizza( 'MODULI.chiudiModulo('+idModulo+');' +
									'MODULI.caricaModuli();' );
				
				SCHEDA.scaricaScheda();
			});
		}});
	},
	caricaDomande: function(){ // carica l'elenco delle domande
		let HTML = '';
		for(d in MODULI.domande){
			HTML += H.r({	t: "r",
							name: "domanda"+d,
							value: MODULI.domande[d].d,
							noLabel: true,
							classCampo: "okPlaceHolder",
							classRiga: "riga_modulo_"+MODULI.domande[d].t,
							azCancella: "MODULI.eliminaDomanda("+d+");",
							keyupCampo: "MODULI.updateDomanda(this,'"+d+"');",
							ver: "1|0" });
		}
		if(!HTML)HTML = '<div class="noResults">'+TXT("NoRes")+'...</div>';
		document.getElementById("dettagli_modulo").innerHTML = HTML;
	},
	aggiungiDomanda: function( tipo ){ // aggiunge una domanda all'elenco
		MODULI.domande.push({
			d: "",
			t: tipo
		});
		MODULI.caricaDomande();
	},
	eliminaDomanda: function( d ){ // aggiunge una domanda all'elenco
		MODULI.domande.splice(d,1);
		MODULI.caricaDomande();
	},
	updateDomanda: function( el, d ){ // aggiorna le domande alla digitazione
		MODULI.domande[d].d = el.value;
	}
}