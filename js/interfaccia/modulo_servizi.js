
var SERVIZI = {
	caricaServizi: function(){ // carica l'elenco dei servizi
		var HTML = '';
		
		// pulsante aggiungi servizio
		HTML += '<div class="menuElenchi"' +
				'	  onClick="MENU.visMM(\'add_serv\');">' +
				'</div>' +
				'<p id="add_serv">' +
				'	<input id="serv_ricerca"' +
				'		   onKeyUp="SERVIZI.filtra();"' +
				'		   class="okPlaceHolder"' +
				'		   placeholder="'+htmlEntities(Lingua(TXT_CercaCliente))+'"'+H.noAutoGen+'>' +
				'	<i class="elMenu"' +
				'	   onclick="SERVIZI.car_servizio();"' +
				'	   id="addServizio"' +
				'	   title="'+Lingua(TXT_AggiungiServizio)+'">' +
				'		<span>'+Lingua(TXT_AggiungiServizio)+'</span>' +
				'		<img src="img/piu.png" align="absmiddle">' +
				'	</i>' +
				'</p>' +
				'<div class="lista listaServizi">';
		var noServ = true;
		if(DB.servizi.data.length){
			var cloneSERVIZI = clone(DB.servizi.data);
			for(p in cloneSERVIZI){
				cloneSERVIZI[p].p = p;
			}
			cloneSERVIZI.sort(sort_by("NomeServizio", false));
			for(p in cloneSERVIZI){
				var SR = cloneSERVIZI[p];
				
				if(!SR.Cancellato){
					noServ = false;
					/*HTML +=
					'	<div class="frdx"' +
					'		 id="servizio_'+SR.p+'"' +
					'		 onClick="SERVIZI.car_servizio('+SR.p+');">';*/
					HTML +=
					'	<div class="base"' +
					'		 id="servizio_'+SR.p+'"' +
					'		 onClick="SERVIZI.car_servizio('+SR.p+');">';
					
							/*HTML += 
					'		<img src="img/ico_servizio.png"' +
					'			 class="imgList">';*/
					// verifico se è stato modificato e non sincronizzato
					var mdT=false;
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
						Lingua(TXT_NoResServizio) +
				'	</span>';
		}
		HTML += '</div>';
		// scrivo l'elenco
		document.getElementById("lista_servizi").innerHTML = HTML;
	},
	filtra: function( event ){
		var parola = document.getElementById("serv_ricerca").value;
		for(p in DB.servizi.data){
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
	chiudiServizio: function(){ // chiude la scheda servizio
		SCHEDA.formModificato = false;
	},
	car_servizio: function( Q_idServ, salvato ){ // carica la scheda del servizio
		// verifico le autorizzazioni
		if(__(Q_idServ,-1)==-1){
			var maxServizi = 1;
			if(LOGIN.reg() && LOGIN.logedin()){
				if(DB.login.data.auths.indexOf("clients_full")>-1)maxServizi = -1;
				else maxServizi = 5;
			}
			if(maxServizi>-1){
				var tServ = 0;
				for(c in DB.servizi.data){
					if(DB.servizi.data[c].Cancellato*1==0)tServ++;
				}
				if(tServ >= maxServizi){
					ALERT(Lingua(eval("TXT_MsgMaxServizi"+maxServizi)));
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
			
			var Q_idServ = __(Q_idServ, -1);
			var salvato = __(salvato, false);
			MENU.nasMM();
			var idServizio=0;
			var NomeServizio='';
			var CostoServizio=0;
			var NumeroSedute=1;
			var DescrizioneServizio='';
			console.log(Q_idServ)
			if(Q_idServ>-1){
				var SR = DB.servizi.data[Q_idServ];
				idServizio = SR.idServizio;
				NomeServizio = SR.NomeServizio;
				CostoServizio = SR.CostoServizio*1;
				NumeroSedute = __(SR.NumeroSedute,1)*1;
				DescrizioneServizio = SR.DescrizioneServizio;
			}
			
			var HTML = '';
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
							label: Lingua(TXT_DescrizioneServizio),
							classCampo: 'okPlaceHolder' });
							
			HTML += H.r({	t: "r",	
								name: "CostoServizio",	
								value: (CostoServizio) ? ArrotondaEuro(CostoServizio) : '',
								ver: '1|0|num',
								label: Lingua(TXT_CostoServizio)+' €',
								keyupCampo: "H.keyPrezzo(this);",
								classCampo: 'CostoTrattDx prezzi',
								classRiga: "labelSx",
								styleRiga: "text-align:right;" });
							
			HTML += H.r({	t: "r",	
								name: "NumeroSedute",	
								value: NumeroSedute,
								ver: '1|2|int',
								label: Lingua(TXT_NumeroSedute),
								keyupCampo: "H.keyIntero(this);",
								maxChars: 2,
								classCampo: 'CostoTrattDx prezzi numSedute',
								classRiga: "labelSx",
								styleRiga: "text-align:right;" });
								
			HTML += SCHEDA.pulsantiForm(
									Q_idServ>-1 ? "SERVIZI.el_servizio("+Q_idServ+");":"",
									"SCHEDA.scaricaScheda();", 
									"SERVIZI.mod_servizio("+Q_idServ+");" );
			
			HTML += '</form>';
			
			
			var titoloDef=TXT_ModificaServizio;
			if(Q_idServ==-1)titoloDef=TXT_CreaServizio;
			
			SCHEDA.caricaScheda(	stripslashes(Lingua(titoloDef)),
									HTML,
									'SERVIZI.chiudiServizio();',
									'scheda_servizio',
									false,
									true );
									
			initChangeDetection( "formMod" );
			
			if(mouseDetect)document.formMod.NomeServizio.focus();
	
			SCHEDA.formModificato = false;
			
			if(salvato)SCHEDA.msgSalvataggio();
		}});
	},
	mod_servizio: function( Q_idServ ){ //salva il servizio
		if(document.formMod.NumeroSedute.value*1==0 || document.formMod.NumeroSedute.value*1>20){
			ALERT(stripslashes(Lingua(TXT_ErroreNumeroSedute)))
			return;
		}
		if(!verifica_form(document.getElementById("formMod")))return;
		var DataModifica = DB.servizi.lastSync+1;
		if(document.formMod.idServizio.value*1>-1)DataCreazione=DataModifica;
		else DataCreazione = DB.servizi.data[Q_idServ].DataCreazione;
		var d=new Date();
		
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
		var postAction = '';
		if(!LOGIN.logedin())postAction = 'SERVIZI.caricaServizi()';
		endChangeDetection();
		SCHEDA.formModificato = false;
		applicaLoading(document.getElementById("scheda_testo"));
		applicaLoading(document.getElementById("elenchi_lista"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi)).then(function(){ // salvo il DB
			LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'rimuoviLoading(document.getElementById("elenchi_lista"));' +
								'SERVIZI.car_servizio('+Q_idServ+',true);' +
								'SCHEDA.scaricaScheda(true);' +
								postAction/* +
								'SERVIZI.caricaServizi();'*/ );
		});
		return false;
	},
	el_servizio: function( Q_idServ ){ // elimina la scheda del serizio
		CONFIRM.vis(	Lingua(TXT_ChiediEliminaServizio),
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			
			if(Q_idServ>-1){
				var DataModifica = DB.servizi.lastSync+1;
				DB.servizi.data[Q_idServ].DataModifica=parseInt(DataModifica);
				DB.servizi.data[Q_idServ].Cancellato=1;
			}
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi)).then(function(){ // salvo il DB
				LOGIN.sincronizza();
				SERVIZI.chiudiServizio();
				SERVIZI.caricaServizi();
				SCHEDA.scaricaScheda();
			});
		}});
	},
	
	sel_servizi: function(){
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
		
			var HTML = '';
			HTML += '<div id="serv_spiegazione">' +
						htmlEntities(Lingua(TXT_AddServiziSpiegazione1)+" "+DB.pazienti.data[PAZIENTI.idCL].Nome+" "+DB.pazienti.data[PAZIENTI.idCL].Cognome) +
					'</div>' +
					'<div id="app_elenco"' +
					'	  class="serv_elenco">';
			var noServ = true;
			for(p in DB.servizi.data){
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
							Lingua(TXT_NoResServizio) +
							'<br><br>' +
							'<span style="cursor:pointer;"' +
							'	   onClick="SCHEDA.selElenco(\'servizi\');SERVIZI.car_servizio();">' +
							'<img src="img/frDxB.png" style="width:30px;vertical-align:middle;">' +
								Lingua(TXT_AggiungiServizio) +
							'</span>' +
					'	</span>';
			}
			HTML += '</div>';
			
			SCHEDA.formModificato = false;
			endChangeDetection();
			SCHEDA.caricaScheda(	stripslashes(Lingua(TXT_ScegliServizio)),
									HTML,
									'',
									'scheda_servizio',
									false,
									true );
		}});
	},
	sel_cartella: function( p ){
		var HTML = '';
		HTML += '<div id="serv_spiegazione">' +
					htmlEntities(Lingua(TXT_AddServiziSpiegazione2)) +
				'</div>' +
				'<div id="serv_torna"' +
				'	  onClick="SERVIZI.sel_servizi();">' +
					htmlEntities(Lingua(TXT_TornaServizi)) +
				'</div>' +
				'<div id="serv_titolo">' +
					htmlEntities(DB.servizi.data[p].NomeServizio) +
				'</div>';
		if(DB.servizi.data[p].DescrizioneServizio.trim())HTML += 
				'<div id="serv_descr">' +
					htmlEntities(DB.servizi.data[p].DescrizioneServizio) +
				'</div>';
		HTML += '<div id="serv_sedute">';
		if(DB.servizi.data[p].NumeroSedute==1)HTML += htmlEntities(Lingua(TXT_SedutaSingola));
		else HTML += DB.servizi.data[p].NumeroSedute+' '+htmlEntities(Lingua(TXT_sedute));
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
					htmlEntities(Lingua(TXT_Aggiungi_a))+"..." +
				'</span></div>';
			}
		}
		if(DB.servizi.data[p].NumeroSedute>1){
			HTML += '<p class="btnApp">' +
					'	<span class="btn_invia"' +
					'		  onClick="SERVIZI.aggiungi('+p+',-1);">' +
							htmlEntities(Lingua(TXT_AggiungiCartella)) +
					'	</span>' +
					'</p>';
		}else{
			HTML += '<p class="btnApp">' +
					'	<span class="btn_invia"' +
					'		  onClick="SERVIZI.aggiungi('+p+',-2);">' +
							htmlEntities(Lingua(TXT_Aggiungi)) +
					'	</span>' +
					'</p>';
		}
		HTML += '</div>';
		
		
		
		SCHEDA.caricaScheda(	stripslashes(Lingua(TXT_ScegliServizio)),
								HTML,
								'',
								'scheda_servizio',
								false,
								true );
	},
	aggiungi: function( p, t ){
		var ConfermaAddServizio = Lingua(TXT_ConfermaAddServizio1);
		if(DB.servizi.data[p].NumeroSedute>1)ConfermaAddServizio = Lingua(TXT_ConfermaAddServizio2).replace("[n]",DB.servizi.data[p].NumeroSedute);
		CONFIRM.vis(	ConfermaAddServizio,
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
						
			var NomeServizio = DB.servizi.data[p].NomeServizio;
			var CostoServizio = DB.servizi.data[p].CostoServizio;
			var DataModifica = DB.pazienti.lastSync+1;
			var NomeSeduta = Lingua(TXT_Seduta);
			
			if(t<0){ // se creo una cartella nuova
				
				if(t==-1){
					// verifico che non ne esista già una con nome uguale
					for(t in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
						if(DB.pazienti.data[PAZIENTI.idCL].trattamenti[t].TipoTrattamento == 'A'){
							if(DB.pazienti.data[PAZIENTI.idCL].trattamenti[t].LabelCiclo == NomeServizio){
								NomeServizio = Lingua(TXT_CopiaDi)+' '+NomeServizio;
							}
						}
					}
				
					JSNPUSH={	"idTrattamento": 0,
								"TitoloTrattamento": Lingua(TXT_Anamnesi),
								"TimeTrattamento": new Date(oggi/1000),
								"oraInizio": -1,
								"oraFine": -1,
								"TestoTrattamento": "",
								"Prescrizione": "",
								"puntiTsuboMap": "",
								"sintomi": "[]",
								"meridiani": "[]",
								"gallery": "[]",
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
			
			
			for(s=0;s<DB.servizi.data[p].NumeroSedute;s++){
				var TitoloTrattamento = NomeSeduta;
				if(DB.servizi.data[p].NumeroSedute>1)TitoloTrattamento += " "+(s+1)
				JSNPUSH={	"idTrattamento": 0,
							"TitoloTrattamento": TitoloTrattamento,
							"TimeTrattamento": 0,
							"oraInizio": -1,
							"oraFine": -1,
							"TestoTrattamento": "",
							"Prescrizione": "",
							"puntiTsuboMap": "",
							"sintomi": "[]",
							"meridiani": "[]",
							"gallery": "[]",
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