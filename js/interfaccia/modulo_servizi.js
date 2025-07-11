
var SERVIZI = {
	maxServiziFree: 1,
	maxServiziLogged: 5,
	
	caricaServizi: function(){ // carica l'elenco dei servizi
		let HTML = '';
		
		// pulsante aggiungi servizio
		HTML += '<div class="menuElenchi"' +
				'	  onClick="MENU.visMM(\'add_serv\');">' +
				'</div>' +
				'<p id="add_serv">' +
				'	<input id="serv_ricerca"' +
				'		   onKeyUp="SERVIZI.filtra();"' +
				'		   class="okPlaceHolder"' +
				'		   placeholder="'+htmlEntities(TXT("CercaServizio"))+'"'+H.noAutoGen+'>' +
				'	<i class="elMenu"' +
				'	   onclick="SERVIZI.car_servizio();"' +
				'	   id="addServizio"' +
				'	   title="'+TXT("AggiungiServizio")+'">' +
				'	</i>' +
				'</p>' +
				'<div class="lista listaServizi">';
		let noServ = true;
		if(DB.servizi.data.length){
			let cloneSERVIZI = clone(DB.servizi.data);
			for(let p in cloneSERVIZI){
				cloneSERVIZI[p].p = p;
			}
			cloneSERVIZI.sort(sort_by("NomeServizio", false));
			for(let p in cloneSERVIZI){
				let SR = cloneSERVIZI[p];
				
				if(!SR.Cancellato){
					noServ = false;
					HTML +=
					'	<div class="base"' +
					'		 id="servizio_'+SR.p+'"' +
					'		 onClick="SERVIZI.car_servizio('+SR.p+');">';
					
					// verifico se è stato modificato e non sincronizzato
					let mdT=false;
					if(SR.DataModifica > DB.servizi.lastSync)mdT=true;
					
					if(mdT)HTML += H.imgSyncro();
					HTML += htmlEntities(SR.NomeServizio);
					HTML +=
					'	</div>';
				}
			}
		}
		if(noServ){
			HTML += 
				'	<span class="noResults"' +
				'		  style="display:inline-block;' +
				'				 vertical-align: top;">' +
						TXT("NoResServizio") +
				'	</span>';
		}
		HTML += '</div>';
		// scrivo l'elenco
		document.getElementById("lista_servizi").innerHTML = HTML;
	},
	filtra: function( event ){
		let parola = document.getElementById("serv_ricerca").value;
		for(let p in DB.servizi.data){
			if(!DB.servizi.data[p].Cancellato*1){
				if(DB.servizi.data[p].NomeServizio.toLowerCase().indexOf(parola.toLowerCase()) == -1){
					document.getElementById("servizio_"+p).classList.add("nasPazRic");
				}else{
					document.getElementById("servizio_"+p).classList.remove("nasPazRic");
				}
			}
		}
		if(parola)document.getElementById("serv_ricerca").classList.add("filtro_attivo");
		else document.getElementById("serv_ricerca").classList.remove("filtro_attivo");
	},
	car_servizio: function( Q_idServ, salvato ){ // carica la scheda del servizio
		// verifico le autorizzazioni
		if(__(Q_idServ,-1)==-1){
			let maxServizi = SERVIZI.maxServiziFree,
				addMaxTxt = 'Free';
			if(LOGIN.reg() && LOGIN.logedin()){
				if(DB.login.data.auths.indexOf("clients_full")>-1)maxServizi = -1;
				else{
					maxServizi = SERVIZI.maxServiziLogged;
					addMaxTxt = 'Logged';
				}
			}
			if(maxServizi>-1){
				let tServ = 0;
				for(let c in DB.servizi.data){
					if(DB.servizi.data[c].Cancellato*1==0)tServ++;
				}
				if(tServ >= maxServizi && !document.body.classList.contains("pplhd")){
					ALERT(TXT("MsgMaxServizi"+addMaxTxt).replace("[n]",SERVIZI.maxServiziLogged));
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
			
			Q_idServ = __(Q_idServ, -1);
			salvato = __(salvato, false);
			MENU.nasMM();
			let idServizio = 0,
				NomeServizio = '',
				CostoServizio = 0,
				NumeroSedute = 1,
				DescrizioneServizio = '';
			if(Q_idServ>-1){
				let SR = DB.servizi.data[Q_idServ];
				idServizio = SR.idServizio;
				NomeServizio = SR.NomeServizio;
				CostoServizio = SR.CostoServizio*1;
				NumeroSedute = __(SR.NumeroSedute,1)*1;
				DescrizioneServizio = SR.DescrizioneServizio;
			}
			
			let HTML = '';
			HTML += '<form id="formMod"' +
					'	   name="formMod"' +
					'	   method="post"' +
					'	   onSubmit="return false;">';
					
			// Campi hascosti
			HTML += H.r({	t: "h", name: "stessa",	value: "1" });
			HTML += H.r({	t: "h", name: "idServizio",	value: idServizio*1 });
			
			
			
			// Campi
			HTML += H.r({	t: "r", name: "NomeServizio",	value: NomeServizio,	labelOut: true, ver: "1|0" });
					
			HTML += H.r({	t: "t", 
							name: "DescrizioneServizio",
							value: DescrizioneServizio,
							noLabel: true,
							label: TXT("DescrizioneServizio"),
							classCampo: 'okPlaceHolder' });
							
			HTML += H.r({	t: "r",	
								name: "CostoServizio",	
								value: (CostoServizio) ? ArrotondaEuro(CostoServizio) : '',
								ver: '1|0|num',
								label: TXT("CostoServizio")+' '+getValuta(),
								keyupCampo: "H.keyPrezzo(this);",
								classCampo: 'CostoTrattDx prezzi',
								classRiga: "labelSx",
								styleRiga: "text-align:right;" });
							
			HTML += H.r({	t: "r",	
								name: "NumeroSedute",	
								value: NumeroSedute,
								ver: '1|2|int',
								label: TXT("NumeroSedute"),
								keyupCampo: "H.keyIntero(this);",
								maxChars: 2,
								classCampo: 'CostoTrattDx prezzi numSedute',
								classRiga: "labelSx",
								styleRiga: "text-align:right;" });
			
			
			let azElimina = Q_idServ>-1 ? "SERVIZI.el_servizio("+Q_idServ+");" : "",
				btnAdd = '';
			if(azElimina){
				btnAdd += '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+TXT("EliminaScheda")+'</div>';
			}
			btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.services\')">' +
							TXT("ReferenceGuide") +
						'</div>';
								
			HTML += SCHEDA.pulsantiForm(
									Q_idServ>-1 ? "SERVIZI.el_servizio("+Q_idServ+");":"",
									"SCHEDA.scaricaScheda();", 
									"SERVIZI.mod_servizio("+Q_idServ+");" );
			
			HTML += '</form>';
			
			
			let titoloDef=TXT("ModificaServizio");
			if(Q_idServ==-1)titoloDef=TXT("CreaServizio");
			
			SCHEDA.caricaScheda(	stripslashes(titoloDef),
									HTML,
									'SERVIZI.chiudiServizio('+idServizio+');',
									'scheda_servizio',
									false,
									true,
									document.getElementById("servizio_"+Q_idServ),
									btnAdd );
									
			initChangeDetection( "formMod" );
			
			if(mouseDetect)document.formMod.NomeServizio.focus();
	
			SCHEDA.formModificato = false;
			
			if(salvato)SCHEDA.msgSalvataggio();
			
			// verifico che non sia già aperta da qualcun altro e intanto la blocco
			LOGIN.verifyLocked("servizi",idServizio);
		}});
	},
	chiudiServizio: function( idServizio ){ // chiude la scheda servizio
		SCHEDA.formModificato = false;
			
		// tolgo il blocco online dall'elemento
		if(typeof(idServizio)!='undefined')LOGIN.closeLocked("servizi",idServizio);
	},
	mod_servizio: function( Q_idServ ){ //salva il servizio
		if(document.formMod.NumeroSedute.value*1==0 || document.formMod.NumeroSedute.value*1>20){
			ALERT(stripslashes(TXT("ErroreNumeroSedute")))
			return;
		}
		if(!verifica_form(document.getElementById("formMod")))return;
		let DataModifica = DB.servizi.lastSync+1;
		if(document.formMod.idServizio.value*1>-1)DataCreazione=DataModifica;
		else DataCreazione = DB.servizi.data[Q_idServ].DataCreazione;
		/* let d=new Date(); */
		
		JSNPUSH={ 	"idServizio": document.formMod.idServizio.value*1,
					"NomeServizio": document.formMod.NomeServizio.value,
					"CostoServizio": parseFloat(document.formMod.CostoServizio.value.replace(",","."))*1,
					"NumeroSedute": document.formMod.NumeroSedute.value*1,
					"DescrizioneServizio": document.formMod.DescrizioneServizio.value,
					"DataModifica": parseInt(DataModifica),
					"DataCreazione": parseInt(DataCreazione),
					"Cancellato": 0,
					"frv": (LOGIN._frv()!='') };
					
		if(Q_idServ*1>-1){
			// servizio esistente
			DB.servizi.data[Q_idServ]=JSNPUSH;
		}else{
			// nuovo servizio
			DB.servizi.data.push(JSNPUSH);
			Q_idServ = DB.servizi.data.length-1;
		}
		let postAction = '';
		if(!LOGIN.logedin())postAction = 'SERVIZI.caricaServizi()';
		endChangeDetection();
		SCHEDA.formModificato = false;
		applicaLoading(document.getElementById("scheda_testo"));
		applicaLoading(document.getElementById("elenchi_lista"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi)).then(function(){ // salvo il DB
			LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'rimuoviLoading(document.getElementById("elenchi_lista"));' +
								'SERVIZI.car_servizio('+Q_idServ+',true);' +
								'if(smartMenu)SCHEDA.scaricaScheda(true);' +/* CHIUSURA DOPO SALVATAGGIO da SMART*/
								postAction );
		});
		return false;
	},
	el_servizio: function( Q_idServ ){ // elimina la scheda del serizio
		CONFIRM.vis(	TXT("ChiediEliminaServizio"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			if(Q_idServ>-1){
				let DataModifica = DB.servizi.lastSync+1;
				DB.servizi.data[Q_idServ].DataModifica=parseInt(DataModifica);
				DB.servizi.data[Q_idServ].Cancellato=1;
				idServizio = __(DB.servizi.data[Q_idServ].idServizio,0);
			}
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi)).then(function(){ // salvo il DB
				LOGIN.sincronizza();
				SERVIZI.chiudiServizio(idServizio);
				SERVIZI.caricaServizi();
				SCHEDA.scaricaScheda();
			});
		}});
	},
	
	sel_servizi: function(){
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
		
			let HTML = '';
			HTML += '<div id="serv_spiegazione">' +
						htmlEntities(TXT("AddServiziSpiegazione1")+" "+DB.pazienti.data[PAZIENTI.idCL].Nome+" "+DB.pazienti.data[PAZIENTI.idCL].Cognome) +
					'</div>' +
					'<div id="app_elenco"' +
					'	  class="serv_elenco">';
			let noServ = true;
			for(let p in DB.servizi.data){
				if(!DB.servizi.data[p].Cancellato){
					noServ = false;
					HTML += '<div class="app_serv"' +
							'	  onClick="SERVIZI.sel_cartella('+p+');">' +
								htmlEntities(DB.servizi.data[p].NomeServizio) +
							'	<span class="serv_nrsed">x '+DB.servizi.data[p].NumeroSedute+'</span>' +
							'</div>';
				}
			}
			if(noServ){
				HTML += 
					'	<span class="noResults"' +
					'		  style="display:inline-block;' +
					'				 vertical-align: top;' +
					'				 padding-left: 30px;">' +
							TXT("NoResServizio") +
							'<br><br>' +
							'<span style="cursor:pointer;"' +
							'	   onClick="SCHEDA.selElenco(\'servizi\');SERVIZI.car_servizio();">' +
							'<img src="img/frDxB.png" style="width:30px;vertical-align:middle;">' +
								TXT("AggiungiServizio") +
							'</span>' +
					'	</span>';
			}
			HTML += '</div>';
			
			SCHEDA.formModificato = false;
			endChangeDetection();
			SCHEDA.caricaScheda(	stripslashes(TXT("ScegliServizio")),
									HTML,
									'',
									'scheda_servizio',
									false,
									true );
		}});
	},
	sel_cartella: function( p ){
		let HTML = '';
		HTML += '<div id="serv_spiegazione">' +
					htmlEntities(TXT("AddServiziSpiegazione2")) +
				'</div>' +
				'<div id="serv_torna"' +
				'	  onClick="SERVIZI.sel_servizi();">' +
					htmlEntities(TXT("TornaServizi")) +
				'</div>' +
				'<div id="serv_titolo">' +
					htmlEntities(DB.servizi.data[p].NomeServizio) +
				'</div>';
		if(DB.servizi.data[p].DescrizioneServizio.trim())HTML += 
				'<div id="serv_descr">' +
					htmlEntities(DB.servizi.data[p].DescrizioneServizio) +
				'</div>';
		HTML += '<div id="serv_sedute">';
		if(DB.servizi.data[p].NumeroSedute==1)HTML += htmlEntities(TXT("SedutaSingola"));
		else HTML += DB.servizi.data[p].NumeroSedute+' '+htmlEntities(TXT("sedute"));
		HTML += '</div>' +
				'<div id="app_elenco"' +
				'	  class="serv_elenco">';
		for(t in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
			if(	DB.pazienti.data[PAZIENTI.idCL].trattamenti[t].Cancellato*1!=1 && 
				DB.pazienti.data[PAZIENTI.idCL].trattamenti[t].TipoTrattamento == 'A' ){
				HTML += '<div class="app_cart">' +
							htmlEntities(DB.pazienti.data[PAZIENTI.idCL].trattamenti[t].LabelCiclo) +
						'<span class="btn_invia"' +
						'	   onClick="SERVIZI.aggiungi('+p+','+t+');">' +
					htmlEntities(TXT("Aggiungi_a"))+"..." +
				'</span></div>';
			}
		}
		HTML += '	<div class="app_cart">' +
						htmlEntities(TXT("TrattamentiSingoli")) +
				'		<span class="btn_invia"' +
				'		  	  onClick="SERVIZI.aggiungi('+p+',-'+((DB.servizi.data[p].NumeroSedute>1)?'1':'2')+');">' +
							htmlEntities(TXT("Aggiungi_a"))+"..." +
				'		</span>' +
				'	</div>' +
				'</div>';
		
		
		
		SCHEDA.caricaScheda(	stripslashes(TXT("ScegliServizio")),
								HTML,
								'',
								'scheda_servizio',
								false,
								true );
	},
	aggiungi: function( p, t ){
		let ConfermaAddServizio = TXT("ConfermaAddServizio1");
		if(DB.servizi.data[p].NumeroSedute>1)ConfermaAddServizio = TXT("ConfermaAddServizio2").replace("[n]",DB.servizi.data[p].NumeroSedute);
		CONFIRM.vis(	ConfermaAddServizio,
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
						
			let NomeServizio = DB.servizi.data[p].NomeServizio,
				CostoServizio = DB.servizi.data[p].CostoServizio,
				DataModifica = DB.pazienti.lastSync+1,
				NomeSeduta = TXT("Seduta");
			
			if(t<0){ // se creo una cartella nuova
				
				if(t==-1){
					// verifico che non ne esista già una con nome uguale
					for(t in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
						if(DB.pazienti.data[PAZIENTI.idCL].trattamenti[t].TipoTrattamento == 'A'){
							if(DB.pazienti.data[PAZIENTI.idCL].trattamenti[t].LabelCiclo == NomeServizio){
								NomeServizio = TXT("CopiaDi")+' '+NomeServizio;
							}
						}
					}
				
					JSNPUSH={	"idTrattamento": 0,
								"TitoloTrattamento": TXT("Anamnesi"),
								"TimeTrattamento": new Date(oggi/1000),
								"oraInizio": -1,
								"oraFine": -1,
								"TestoTrattamento": "",
								"Prescrizione": "",
								"puntiMTC": [],
								"puntiAuricolari": [],
								"puntiNamikoshi": [],
								"sintomi": [],
								"meridiani": [],
								"gallery": [],
								"DataModifica": parseInt(DataModifica),
								"LabelCiclo": NomeServizio,
								"TipoTrattamento": "A",
								"CostoTrattamento": 0,
								"Cancellato": 0,
								"frv": (LOGIN._frv()!='') };
					DB.pazienti.data[PAZIENTI.idCL].trattamenti.push(JSNPUSH);
				}else{
					NomeSeduta = NomeServizio+" "+NomeSeduta;
					NomeServizio = '';
				}
			}else{
				NomeSeduta = NomeServizio;
				NomeServizio = DB.pazienti.data[PAZIENTI.idCL].trattamenti[t*1].LabelCiclo;
			}
			
			
			for(let s=0;s<DB.servizi.data[p].NumeroSedute;s++){
				let TitoloTrattamento = NomeSeduta;
				if(DB.servizi.data[p].NumeroSedute>1)TitoloTrattamento += " "+(s+1)
				JSNPUSH={	"idTrattamento": 0,
							"TitoloTrattamento": TitoloTrattamento,
							"TimeTrattamento": 0,
							"oraInizio": -1,
							"oraFine": -1,
							"TestoTrattamento": "",
							"Prescrizione": "",
							"puntiMTC": [],
							"puntiAuricolari": [],
							"puntiNamikoshi": [],
							"sintomi": [],
							"meridiani": [],
							"gallery": [],
							"DataModifica": parseInt(DataModifica),
							"LabelCiclo": NomeServizio,
							"TipoTrattamento": "B",
							"CostoTrattamento": CostoServizio,
							"Cancellato": 0,
							"frv": (LOGIN._frv()!='') };
				DB.pazienti.data[PAZIENTI.idCL].trattamenti.push(JSNPUSH);
			}
			applicaLoading(document.querySelector(".listaTrattamenti"));
			applicaLoading(document.getElementById("scheda_testo"));
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				LOGIN.sincronizza(	'rimuoviLoading(document.querySelector(".listaTrattamenti"));'+
									'rimuoviLoading(document.getElementById("scheda_testo"));'+
									'SCHEDA.scaricaScheda();'+
									'PAZIENTI.caricaTrattamenti();' );
				
			});
		}});
	}
}