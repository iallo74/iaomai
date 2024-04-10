var SYNCRO = {
	 
	afterFunct: null,
	nSinc: 0,
	totSinc: 0,
	
	// SINCRONIZZAZIONE
	sincronizza: function( funct, bkp = false){ // sincronizza i DB locali con quelli remoti (quando modifico)
		DB._verDbSize();
		if(typeof(funct)!='undefined')SYNCRO.afterFunct=funct;
		else if(!SYNCRO.afterFunct)SYNCRO.afterFunct=null;
		
		if(CONN.getConn() && LOGIN.logedin()!=''){
			SYNCRO.globalSync( false, bkp );
		}else if(SYNCRO.afterFunct){
			eval(SYNCRO.afterFunct);
			SYNCRO.afterFunct = null;
		}
	},
	globalSync: function( dwnl = false, bkp = false, Nuovo = false ){ // sincro globale up e down
		// da controllare all'avvio dell'app e ogni volta che riprende la connessione
		// invio i lastSync delle tabelle
		if(CONN.getConn() || dwnl){
			SYNCRO.totSinc = 0;
			Promise.all([
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".procedure")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".note")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".pazienti")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".fornitori")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".servizi")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".appuntamenti")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".annotazioni")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".ricerche")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".files"))
			]).then(function( dbs ){
				DB.procedure=IMPORTER.DECOMPR(dbs[0]);
				DB.note=IMPORTER.DECOMPR(dbs[1]);
				DB.pazienti=IMPORTER.DECOMPR(dbs[2]);
				DB.fornitori=IMPORTER.DECOMPR(dbs[3]);
				DB.servizi=IMPORTER.DECOMPR(dbs[4]);
				DB.appuntamenti=IMPORTER.DECOMPR(dbs[5]);
				DB.annotazioni=IMPORTER.DECOMPR(dbs[6]);
				DB.ricerche=IMPORTER.DECOMPR(dbs[7]);
				DB.files=IMPORTER.DECOMPR(dbs[8]);
				
				SYNCRO.totSinc = dbs.length-1; /* i files non contano perché sono solo in upload */
				
				let elenco='';				
				if(Nuovo){ // se è un account nuovo popolo i DB con quelli DEMO
					DB.pazienti.data = DB._pulisciFRV(archiviDemo.pazienti);
					DB.fornitori.data = DB._pulisciFRV(archiviDemo.fornitori);
					DB.servizi.data = DB._pulisciFRV(archiviDemo.servizi);
					DB.files.data = DB._pulisciFRV(archiviDemo.files);
				}
				
				let elencoFiles='';
				for(let k in DB.files.data){
					if(DB.files.data[k]){
						if(	!__(DB.files.data[k].frv) && 
							__(DB.files.data[k].imgBig) && 
							DB.files.data[k].imgBig!='404'){
								elencoFiles+=JSON.stringify(DB.files.data[k])+", ";
							}
					}
				}
				if(elencoFiles)elenco+='"files": ['+elencoFiles.substr(0,elencoFiles.length-2)+'], ';
				
				let elencoRicerche='';
				for(let k in DB.ricerche.data){
					if(DB.ricerche.data[k].DataModifica*1>DB.ricerche.lastSync*1 || dwnl || bkp){
						elencoRicerche+=JSON.stringify(DB.ricerche.data[k])+", ";
					}
				}
				if(elencoRicerche)elenco+='"ricerche": ['+elencoRicerche.substr(0,elencoRicerche.length-2)+'], ';
				
				let elencoNote='';
				for(let k in DB.note.data){
					if(DB.note.data[k].DataModifica*1>DB.note.lastSync*1 || dwnl || bkp){
						elencoNote+=JSON.stringify(DB.note.data[k])+", ";
					}
				}
				if(elencoNote)elenco+='"note": ['+elencoNote.substr(0,elencoNote.length-2)+'], ';

				let elencoProcedure='';
				for(let k in DB.procedure.data){
					let db={ 	"idProcedura": DB.procedure.data[k].idProcedura*1,
								"NomeProcedura": DB.procedure.data[k].NomeProcedura,
								"app": DB.procedure.data[k].app,
								"idLinguaProcedura": DB.procedure.data[k].idLinguaProcedura*1,
								"dettagliProcedura": DB.procedure.data[k].dettagliProcedura,
								"gallery": JSON.stringify(DB.procedure.data[k].gallery),
								"DataModifica":DB.procedure.data[k].DataModifica*1,
								"DataCreazione":DB.procedure.data[k].DataCreazione*1,
								"Condiviso": DB.procedure.data[k].Condiviso*1,
								"Cancellato": DB.procedure.data[k].Cancellato*1 };

					let aggiungere=false;
					if((DB.procedure.data[k].DataModifica*1>DB.procedure.lastSync*1 || dwnl || bkp) && !__(DB.procedure.data[k].frv)){
						aggiungere=true;
					}
					if(aggiungere){
						DB.procedure.data[k].id_interno=k;
						elencoProcedure+=JSON.stringify(db)+", ";
					}
					
					/* if(DB.procedure.data[k].DataModifica*1>DB.procedure.lastSync*1 || dwnl || bkp){
						DB.procedure.data[k].id_interno=k;
						elencoProcedure+=JSON.stringify(DB.procedure.data[k])+", ";
					} */
				}
				if(elencoProcedure)elenco+='"procedure": ['+elencoProcedure.substr(0,elencoProcedure.length-2)+'], ';
				
				let elencoAppuntamenti='';
				for(let k in DB.appuntamenti.data){
					let db={ 	"idAppuntamento": DB.appuntamenti.data[k].idAppuntamento*1,
								"TestoAppuntamento": DB.appuntamenti.data[k].TestoAppuntamento,
								"TimeAppuntamento": DB.appuntamenti.data[k].TimeAppuntamento*1,
								"oraInizio": DB.appuntamenti.data[k].oraInizio*1,
								"oraFine": DB.appuntamenti.data[k].oraFine*1,
								"idPaziente": DB.appuntamenti.data[k].idPaziente*1,
								"idCli": DB.appuntamenti.data[k].idCli*1,
								"DataModifica":DB.appuntamenti.data[k].DataModifica*1,
								"DataCreazione":DB.appuntamenti.data[k].DataCreazione*1,
								"Cancellato": DB.appuntamenti.data[k].Cancellato*1 };

					let aggiungere=false;
					
					if((DB.appuntamenti.data[k].DataModifica*1>DB.appuntamenti.lastSync*1 || dwnl || bkp) && !__(DB.appuntamenti.data[k].frv))aggiungere=true;
					if(aggiungere){
						elencoAppuntamenti+=JSON.stringify(db)+", ";
					}
				}
				if(elencoAppuntamenti)elenco+='"appuntamenti": ['+elencoAppuntamenti.substr(0,elencoAppuntamenti.length-2)+'], ';
				
				let elencoAnnotazioni='';
				for(let k in DB.annotazioni.data){
					let db={ 	"idAnnotazione": DB.annotazioni.data[k].idAnnotazione*1,
								"TitoloAnnotazione": DB.annotazioni.data[k].TitoloAnnotazione,
								"TestoAnnotazione": DB.annotazioni.data[k].TestoAnnotazione,
								"DataModifica":DB.annotazioni.data[k].DataModifica*1,
								"DataCreazione":DB.annotazioni.data[k].DataCreazione*1,
								"Cancellato": DB.annotazioni.data[k].Cancellato*1 };
					
					let aggiungere=false;
					
					if((DB.annotazioni.data[k].DataModifica*1>DB.annotazioni.lastSync*1 || dwnl || bkp) && !__(DB.annotazioni.data[k].frv))aggiungere=true;
					if(aggiungere){
						elencoAnnotazioni+=JSON.stringify(db)+", ";
					}
				}
				if(elencoAnnotazioni)elenco+='"annotazioni": ['+elencoAnnotazioni.substr(0,elencoAnnotazioni.length-2)+'], ';
				
				let elencoServizi='';
				for(let k in DB.servizi.data){
					let db={ 	"idServizio": DB.servizi.data[k].idServizio*1,
								"NomeServizio": DB.servizi.data[k].NomeServizio,
								"DescrizioneServizio": DB.servizi.data[k].DescrizioneServizio,
								"CostoServizio": DB.servizi.data[k].CostoServizio*1,
								"NumeroSedute": DB.servizi.data[k].NumeroSedute*1,
								"DataModifica":DB.servizi.data[k].DataModifica*1,
								"DataCreazione":DB.servizi.data[k].DataCreazione*1,
								"Cancellato": DB.servizi.data[k].Cancellato*1 };
					
					let aggiungere=false;
					
					if((DB.servizi.data[k].DataModifica*1>DB.servizi.lastSync*1 || dwnl || bkp) && !__(DB.servizi.data[k].frv))aggiungere=true;
					if(aggiungere){
						elencoServizi+=JSON.stringify(db)+", ";
					}
				}
				if(elencoServizi)elenco+='"servizi": ['+elencoServizi.substr(0,elencoServizi.length-2)+'], ';
				
				let elencoFornitori='';
				for(let k in DB.fornitori.data){
					let db={ 	"idFornitore": DB.fornitori.data[k].idFornitore*1,
								"RagioneSociale": DB.fornitori.data[k].RagioneSociale,
								"Intestazione": DB.fornitori.data[k].Intestazione,
								"PartitaIva": DB.fornitori.data[k].PartitaIva,
								"CodiceFiscale": DB.fornitori.data[k].CodiceFiscale,
								"Indirizzo": DB.fornitori.data[k].Indirizzo,
								"CAP": DB.fornitori.data[k].CAP,
								"Citta": DB.fornitori.data[k].Citta,
								"Provincia": DB.fornitori.data[k].Provincia,
								"Stato": DB.fornitori.data[k].Stato,
								"Telefono": DB.fornitori.data[k].Telefono,
								"Email": DB.fornitori.data[k].Email,
								"NoteFornitore": DB.fornitori.data[k].NoteFornitore,
								"etichette": JSON.stringify(DB.fornitori.data[k].etichette),
								"DataModifica":DB.fornitori.data[k].DataModifica*1,
								"DataCreazione":DB.fornitori.data[k].DataCreazione*1,
								"Cancellato": DB.fornitori.data[k].Cancellato*1 };
					
					let aggiungere=false;
					
					if((DB.fornitori.data[k].DataModifica*1>DB.fornitori.lastSync*1 || dwnl || bkp) && !__(DB.fornitori.data[k].frv))aggiungere=true;
					if(aggiungere){
						elencoFornitori+=JSON.stringify(db)+", ";
					}
				}
				if(elencoFornitori)elenco+='"fornitori": ['+elencoFornitori.substr(0,elencoFornitori.length-2)+'], ';

				let elencoPazienti='';
				for(let k in DB.pazienti.data){
					let db={ 	"idPaziente": DB.pazienti.data[k].idPaziente*1,
								"Nome": DB.pazienti.data[k].Nome,
								"Cognome": DB.pazienti.data[k].Cognome,
								"Indirizzo": DB.pazienti.data[k].Indirizzo,
								"CAP": DB.pazienti.data[k].CAP,
								"Citta": DB.pazienti.data[k].Citta,
								"Provincia": DB.pazienti.data[k].Provincia,
								"Stato": DB.pazienti.data[k].Stato,
								"Telefono": DB.pazienti.data[k].Telefono,
								"Cellulare": DB.pazienti.data[k].Cellulare,
								"paeseCellulare": DB.pazienti.data[k].paeseCellulare,
								"Email": DB.pazienti.data[k].Email,
								"sesso": DB.pazienti.data[k].sesso,
								"NotePaziente": DB.pazienti.data[k].NotePaziente,
								"DataNascita": DB.pazienti.data[k].DataNascita,
								"LuogoNascita": DB.pazienti.data[k].LuogoNascita,
								"tags": JSON.stringify(DB.pazienti.data[k].tags),
								"etichette": JSON.stringify(DB.pazienti.data[k].etichette),
								"medicine": JSON.stringify(DB.pazienti.data[k].medicine),
								"allergie": JSON.stringify(DB.pazienti.data[k].allergie),
								"patologie": JSON.stringify(DB.pazienti.data[k].patologie),
								"interventi": JSON.stringify(DB.pazienti.data[k].interventi),
								"gallery": JSON.stringify(DB.pazienti.data[k].gallery),
								"Provenienza": DB.pazienti.data[k].Provenienza,
								"Professione": DB.pazienti.data[k].Professione,
								"Intestazione": DB.pazienti.data[k].Intestazione,
								"CodiceFiscale": DB.pazienti.data[k].CodiceFiscale,
								"PartitaIva": DB.pazienti.data[k].PartitaIva,
								"Social": DB.pazienti.data[k].Social,
								"avatar": DB.pazienti.data[k].avatar,
								"Altezza": DB.pazienti.data[k].Altezza,
								"Peso": DB.pazienti.data[k].Peso,
								"DataModifica":DB.pazienti.data[k].DataModifica*1,
								"trattamenti": [],
								"saldi": [],
								"Cancellato": DB.pazienti.data[k].Cancellato*1,
								"id_interno": k*1 };
					
					let aggiungere=false;
					
					db.trattamenti=[];
					let n=-1,
						aggiungereTrattamenti=false,
						elencoTrattamenti=[];
					for(t in DB.pazienti.data[k].trattamenti){
						if(DB.pazienti.data[k].trattamenti[t].DataModifica*1>DB.pazienti.lastSync*1 || dwnl || bkp){
							DB.pazienti.data[k].trattamenti[t].id_interno=t*1;
							n++;elencoTrattamenti[n]=clone(DB.pazienti.data[k].trattamenti[t]);
							elencoTrattamenti[n].gallery = JSON.stringify(elencoTrattamenti[n].gallery);
							elencoTrattamenti[n].meridiani = JSON.stringify(elencoTrattamenti[n].meridiani);
							elencoTrattamenti[n].sintomi = JSON.stringify(elencoTrattamenti[n].sintomi);
							elencoTrattamenti[n].puntiMTC = JSON.stringify(elencoTrattamenti[n].puntiMTC);
							elencoTrattamenti[n].puntiAuricolari = JSON.stringify(elencoTrattamenti[n].puntiAuricolari);
							elencoTrattamenti[n].puntiPlantari = JSON.stringify(elencoTrattamenti[n].puntiPlantari);
							elencoTrattamenti[n].puntiNamikoshi = JSON.stringify(elencoTrattamenti[n].puntiNamikoshi);
							aggiungereTrattamenti=true;
						}
					}
					if(aggiungereTrattamenti && !__(DB.pazienti.data[k].frv)){
						db.trattamenti=elencoTrattamenti;
						aggiungere=true;
					}
					
					db.saldi=[];
					n=-1;
					let	aggiungereSaldi=false,
						elencoSaldi=[];
					for(t in DB.pazienti.data[k].saldi){
						if(DB.pazienti.data[k].saldi[t].DataModifica*1>DB.pazienti.lastSync*1 || dwnl || bkp){
							DB.pazienti.data[k].saldi[t].id_interno=t*1;
							n++;elencoSaldi[n]=DB.pazienti.data[k].saldi[t];
							aggiungereSaldi=true;
						}
					}
					if(aggiungereSaldi && !__(DB.pazienti.data[k].frv)){
						db.saldi=elencoSaldi;
						aggiungere=true;
					}
					
					
					if((DB.pazienti.data[k].DataModifica*1>DB.pazienti.lastSync*1 || dwnl || bkp) && !__(DB.pazienti.data[k].frv))aggiungere=true;
					if(aggiungere){
						elencoPazienti+=JSON.stringify(db)+", ";
					}
				}
				if(elencoPazienti)elenco+='"pazienti": ['+elencoPazienti.substr(0,elencoPazienti.length-2)+'], ';
				if(elenco)elenco='{'+elenco.substr(0,elenco.length-2)+'}';	
			
				if(typeof(DB.note)=='undefined'){
					DB.note=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note));
				}
				if(typeof(DB.procedure)=='undefined'){
					DB.procedure=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure));
				}
				if(typeof(DB.servizi)=='undefined'){
					DB.servizi=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi));
				}	
				if(typeof(DB.fornitori)=='undefined'){
					DB.fornitori=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori));
				}	
				if(typeof(DB.pazienti)=='undefined'){
					DB.pazienti=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti));
				}	
				if(typeof(DB.ricerche)=='undefined'){
					DB.ricerche=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche));
				}
				if(typeof(DB.files)=='undefined'){
					DB.files=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files));
				}	
				if(typeof(DB.cicli)=='undefined'){
					DB.cicli=[];
					DB.cicli.lastSync=0;
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".cicli"), IMPORTER.COMPR(DB.cicli));
				}
				let syncJSN = '{';
				if(BACKUPS.titleProvv){
					syncJSN += '"title":"'+BACKUPS.titleProvv.replace(/"/,'\"')+'",' +
							   '"verApp": "'+verApp+'",'
				}
				
				syncJSN += 	'"note":"'+DB.note.lastSync+'",' +
							'"procedure":"'+DB.procedure.lastSync+'",' +
							'"servizi":"'+DB.servizi.lastSync+'",' +
							'"fornitori":"'+DB.fornitori.lastSync+'",' +
							'"pazienti":"'+DB.pazienti.lastSync+'",' +
							'"ricerche":"'+DB.ricerche.lastSync+'",' +
							'"cicli":"'+DB.cicli.lastSync+'",' +
							'"appuntamenti":"'+DB.appuntamenti.lastSync+'",' +
							'"annotazioni":"'+DB.annotazioni.lastSync+'",' +
							'"JSNPOST":';
				if(!BACKUPS.titleProvv)syncJSN += elenco;
				else syncJSN += '"'+window.btoa(encodeURIComponent(elenco))+'"';
				
				syncJSN += '}';
				//if(elenco)console.log(JSON.parse(syncJSN))
				if(!dwnl){
					CONN.caricaUrl(	"sincro_GLOBAL.php",
									"b64=1&JSNPOST="+window.btoa(encodeURIComponent(syncJSN)), 
									"SYNCRO.retGlobalSyncro");
				}else{
					let dateNow = new Date();
					dateNow=dateNow.getTime()/1000;
					dateNow=parseInt(dateNow);
					
					if(dwnl == 'locale')BACKUPS.download(JSON.parse(elenco), dateNow);
					else{
						if(CONN.retNoConn()){
							
							CONN.caricaUrl(	"sincro_backups_crea.php",
											"b64=1&JSNPOST="+window.btoa(encodeURIComponent(syncJSN)),
											"BACKUPS.conf_backup"
											);
						}
						return false;
					}
				}
			});
		}
	},
	retGlobalSyncro: function( txt ){ // chiamato da "globalSync" o da "ripristinaBackup"
		if(txt.substr(0,3)+""=='404'){
			if(debug)console.log(txt);
			return;
		}
		if(SCHEDA.btnSel)SCHEDA.btnSel_id = SCHEDA.btnSel.id;
		SYNCRO.nSinc = 0;
		let syncUp = false,
			passato,
			elenco = JSON.parse(txt);
		
		lastSync = elenco.lastSync;
		
		DB.ricerche.lastSync=lastSync;
		DB.note.lastSync=lastSync;
		DB.procedure.lastSync=lastSync;
		DB.servizi.lastSync=lastSync;
		DB.fornitori.lastSync=lastSync;
		DB.pazienti.lastSync=lastSync;
		DB.appuntamenti.lastSync=lastSync;
		DB.annotazioni.lastSync=lastSync;
		//console.log(DB.annotazioni);
		
		// RICERCHE
		if(elenco.ricerche){
			syncUp=true;
			for(let p in elenco.ricerche){
				// per ogni novità verifico l'esistenza
				esiste=false;
				if(BACKUPS.bkpProvv)elenco.ricerche[p].DataModifica = lastSync*1+1;
				JSNPUSH={	"TestoRicerca": elenco.ricerche[p].TestoRicerca,
							"DataModifica": elenco.ricerche[p].DataModifica*1 };
				for(let k in DB.ricerche.data){
					if(DB.ricerche.data[k].TestoRicerca==elenco.ricerche[p].TestoRicerca){
						// se esiste non lo inserisco
						esiste=true;
					}
				}
				if(!esiste){
					// se non esiste aggiungo
					DB.ricerche.data.push(JSNPUSH);
				}
			}
			DB.ricerche.lastSync=lastSync;
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.ricerche.data){
					let trovato = false,
						RC = DB.ricerche.data[k];
					for(let p in elenco.ricerche){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	RC.TestoRicerca==elenco.ricerche[p].TestoRicerca){
							trovato = true;
						}
					}
					if(!trovato){
						DB.ricerche.data[k].TestoRicerca = '';
						DB.ricerche.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche)).then(function(){ // salvo il DB
				SYNCRO.verSincro('ricerche');
			});
		}else SYNCRO.verSincro('ricerche');
	
		// NOTE
		if(elenco.note){
			syncUp=true;
			for(let p in elenco.note){
				// per ogni novità verifico l'esistenza
				passato=false;
				let id_interno=-1;
				if(BACKUPS.bkpProvv)elenco.note[p].DataModifica = lastSync*1;
				JSNPUSH={	"TestoAnnotazione": elenco.note[p].TestoAnnotazione,
							"hidePunto": elenco.note[p].hidePunto,
							"meridiano": elenco.note[p].meridiano,
							"numeroPunto": elenco.note[p].numeroPunto+'',//*1,
							"idPaziente": elenco.note[p].idPaziente*1,
							"idCL": id_interno,
							"app": __(elenco.note[p].app,''),
							"DataModifica": elenco.note[p].DataModifica*1 };
							
				for(let k in DB.note.data){
					let NT = DB.note.data[k];
					if(	NT.meridiano==elenco.note[p].meridiano && 
						NT.numeroPunto+''==elenco.note[p].numeroPunto+'' && 
						NT.idPaziente==elenco.note[p].idPaziente){
						// se esiste aggiorna
						DB.note.data[k]=JSNPUSH;
						passato=true;
					}
				}
				
				
				if(!passato){
					// se non esiste aggiungo
					DB.note.data.push(JSNPUSH);
				}
			}
			DB.note.lastSync=lastSync;
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.note.data){
					let trovato = false,
						NT = DB.note.data[k];
					for(let p in elenco.note){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	NT.meridiano==elenco.note[p].meridiano && 
							NT.numeroPunto+''==elenco.note[p].numeroPunto+'' && 
							NT.idPaziente==elenco.note[p].idPaziente){
							trovato = true;
						}
					}
					if(!trovato){
						DB.note.data[k].TestoAnnotazione = '';
						DB.note.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note)).then(function(){ // salvo il DB
				SYNCRO.verSincro('note');
			});
		}else SYNCRO.verSincro('note');
		
		// PROCEDURE
		if(elenco.procedure){
			syncUp=true;
			for(let p in elenco.procedure){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.procedure[p].DataModifica = lastSync*1;
				JSNPUSH={	"idProcedura": elenco.procedure[p].idProcedura*1,
							"idLinguaProcedura": elenco.procedure[p].idLinguaProcedura*1,
							"gallery": toJson(elenco.procedure[p].gallery),
							"NomeProcedura": elenco.procedure[p].NomeProcedura,
							"DataModifica": elenco.procedure[p].DataModifica*1,
							"DataCreazione": elenco.procedure[p].DataCreazione*1,
							"Condiviso": elenco.procedure[p].Condiviso*1,
							"app": __(elenco.procedure[p].app,''),
							"dettagliProcedura": elenco.procedure[p].dettagliProcedura,
							"Cancellato": elenco.procedure[p].Cancellato*1,
							"frv": false };
				
				for(let k in elenco.procedure[p].dettagliProcedura){
					elenco.procedure[p].dettagliProcedura[k].DataModifica*=1;
					elenco.procedure[p].dettagliProcedura[k].OrdineDettaglio*=1;
					elenco.procedure[p].dettagliProcedura[k].Cancellato*=1;
				}
				
				for(let k in DB.procedure.data){
					let PR = DB.procedure.data[k];
					if(	( PR.idProcedura*1>0 && PR.idProcedura*1==elenco.procedure[p].idProcedura*1 ) || 
						(	PR.idProcedura*1==0 &&
							PR.NomeProcedura==elenco.procedure[p].NomeProcedura && 
							PR.DataCreazione*1==elenco.procedure[p].DataCreazione*1)	){ // se esiste aggiorna
							
						DB.procedure.data[k] = JSNPUSH;
						passato=true;
					}
				}
				if(!passato){ // se non esiste aggiungo
					DB.procedure.data.push(JSNPUSH);
				}
			}
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.procedure.data){
					let trovato = false,
						PR = DB.procedure.data[k];
					for(let p in elenco.procedure){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(PR.idProcedura*1>0 && elenco.procedure[p].idProcedura*1==PR.idProcedura*1) ||
							PR.idProcedura*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						DB.procedure.data[k].Cancellato = 1;
						DB.procedure.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			DB.procedure.lastSync=lastSync;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure)).then(function(){ // salvo il DB
				SYNCRO.verSincro('procedure');
			});
		}else SYNCRO.verSincro('procedure');
		
		// SERVIZI
		if(elenco.servizi){
			syncUp=true;
			for(let p in elenco.servizi){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.servizi[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idServizio": elenco.servizi[p].idServizio*1,
							"NomeServizio": elenco.servizi[p].NomeServizio+"",
							"DescrizioneServizio": elenco.servizi[p].DescrizioneServizio+"",
							"CostoServizio": elenco.servizi[p].CostoServizio*1,
							"NumeroSedute": elenco.servizi[p].NumeroSedute*1,
							"DataModifica": elenco.servizi[p].DataModifica*1,
							"DataCreazione": elenco.servizi[p].DataCreazione*1,
							"Cancellato": elenco.servizi[p].Cancellato*1,
							"frv": false };
				
				for(let k in DB.servizi.data){
					let SR = DB.servizi.data[k];
					if(	( SR.idServizio*1>0 && SR.idServizio*1==elenco.servizi[p].idServizio*1 ) || 
						(	SR.idServizio*1==0 &&
							SR.NomeServizio==elenco.servizi[p].NomeServizio && 
							SR.DataCreazione*1==elenco.servizi[p].DataCreazione*1)	){ // se esiste aggiorna
							
						DB.servizi.data[k] = JSNPUSH;
						passato=true;
					}
				}
				if(!passato){ // se non esiste aggiungo
					DB.servizi.data.push(JSNPUSH);
				}
			}
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.servizi.data){
					let trovato = false,
						SR = DB.servizi.data[k];
					for(let p in elenco.servizi){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(SR.idServizio*1>0 && elenco.servizi[p].idServizio*1==SR.idServizio*1) ||
							SR.idServizio*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						DB.servizi.data[k].Cancellato = 1;
						DB.servizi.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			DB.servizi.lastSync=lastSync;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi)).then(function(){ // salvo il DB
				SYNCRO.verSincro('servizi');
			});
		}else SYNCRO.verSincro('servizi');
		
		// FORNITORI
		if(elenco.fornitori){
			syncUp=true;
			for(let p in elenco.fornitori){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.fornitori[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idFornitore": elenco.fornitori[p].idFornitore*1,
							"RagioneSociale": elenco.fornitori[p].RagioneSociale+"",
							"Intestazione": elenco.fornitori[p].Intestazione+"",
							"PartitaIva": elenco.fornitori[p].PartitaIva,
							"CodiceFiscale": elenco.fornitori[p].CodiceFiscale,
							"Indirizzo": elenco.fornitori[p].Indirizzo,
							"CAP": elenco.fornitori[p].CAP,
							"Citta": elenco.fornitori[p].Citta,
							"Provincia": elenco.fornitori[p].Provincia,
							"Stato": elenco.fornitori[p].Stato,
							"Telefono": elenco.fornitori[p].Telefono,
							"Email": elenco.fornitori[p].Email,
							"NoteFornitore": elenco.fornitori[p].NoteFornitore,
							"etichette": toJson(elenco.fornitori[p].etichette),
							"DataModifica": elenco.fornitori[p].DataModifica*1,
							"DataCreazione": elenco.fornitori[p].DataCreazione*1,
							"Cancellato": elenco.fornitori[p].Cancellato*1,
							"frv": false };
				
				for(let k in DB.fornitori.data){
					let FR = DB.fornitori.data[k];
					if(	( FR.idFornitore*1>0 && FR.idFornitore*1==elenco.fornitori[p].idFornitore*1 ) || 
						(	FR.idFornitore*1==0 &&
							FR.RagioneSociale==elenco.fornitori[p].RagioneSociale && 
							FR.DataCreazione*1==elenco.fornitori[p].DataCreazione*1)	){ // se esiste aggiorna
							
						DB.fornitori.data[k] = JSNPUSH;
						passato=true;
					}
				}
				if(!passato){ // se non esiste aggiungo
					DB.fornitori.data.push(JSNPUSH);
				}
			}
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.fornitori.data){
					let trovato = false,
						FR = DB.fornitori.data[k];
					for(let p in elenco.fornitori){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(FR.idFornitore*1>0 && elenco.fornitori[p].idFornitore*1==FR.idFornitore*1) ||
							FR.idFornitore*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						DB.fornitori.data[k].Cancellato = 1;
						DB.fornitori.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			DB.fornitori.lastSync=lastSync;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)).then(function(){ // salvo il DB
				SYNCRO.verSincro('fornitori');
			});
		}else SYNCRO.verSincro('fornitori');
		
		// APPUNTAMENTI
		if(elenco.appuntamenti){
			syncUp=true;
			for(let p in elenco.appuntamenti){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.appuntamenti[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idAppuntamento": elenco.appuntamenti[p].idAppuntamento*1,
							"TestoAppuntamento": elenco.appuntamenti[p].TestoAppuntamento+"",
							"TimeAppuntamento": elenco.appuntamenti[p].TimeAppuntamento*1,
							"oraInizio": elenco.appuntamenti[p].oraInizio*1,
							"oraFine": elenco.appuntamenti[p].oraFine*1,
							"idPaziente": elenco.appuntamenti[p].idPaziente*1,
							"DataModifica": elenco.appuntamenti[p].DataModifica*1,
							"DataCreazione": elenco.appuntamenti[p].DataCreazione*1,
							"Cancellato": elenco.appuntamenti[p].Cancellato*1,
							"frv": false };
							
				for(let k in DB.appuntamenti.data){
					let AP = DB.appuntamenti.data[k];
					if(	( AP.idAppuntamento*1>-1 && AP.idAppuntamento*1==elenco.appuntamenti[p].idAppuntamento*1 ) || 
						(	AP.idAppuntamento*1==-1 &&
							AP.TestoAppuntamento==elenco.appuntamenti[p].TestoAppuntamento && 
							AP.DataCreazione*1==elenco.appuntamenti[p].DataCreazione*1)	){ // se esiste aggiorna
							
						DB.appuntamenti.data[k] = JSNPUSH;
						passato=true;
					}
				}
				if(!passato){ // se non esiste aggiungo
					DB.appuntamenti.data.push(JSNPUSH);
				}
			}
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.appuntamenti.data){
					let trovato = false,
						AP = DB.appuntamenti.data[k];
					for(let p in elenco.appuntamenti){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(AP.idAppuntamento*1>0 && elenco.appuntamenti[p].idAppuntamento*1==AP.idAppuntamento*1) ||
							AP.idAppuntamento*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						DB.appuntamenti.data[k].Cancellato = 1;
						DB.appuntamenti.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			DB.appuntamenti.lastSync=lastSync;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)).then(function(){ // salvo il DB
				SYNCRO.verSincro('appuntamenti');
			});
		}else SYNCRO.verSincro('appuntamenti');
		
		
		// ANNOTAZIONI
		if(elenco.annotazioni){
			syncUp=true;
			for(let p in elenco.annotazioni){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.annotazioni[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idAnnotazione": elenco.annotazioni[p].idAnnotazione*1,
							"TitoloAnnotazione": elenco.annotazioni[p].TitoloAnnotazione+"",
							"TestoAnnotazione": elenco.annotazioni[p].TestoAnnotazione+"",
							"DataModifica": elenco.annotazioni[p].DataModifica*1,
							"DataCreazione": elenco.annotazioni[p].DataCreazione*1,
							"Cancellato": elenco.annotazioni[p].Cancellato*1,
							"frv": false };
				
				for(let k in DB.annotazioni.data){
					let AN = DB.annotazioni.data[k];
					if(	( AN.idAnnotazione*1>0 && AN.idAnnotazione*1==elenco.annotazioni[p].idAnnotazione*1 ) || 
						(	AN.idAnnotazione*1==0 &&
							AN.TitoloAnnotazione==elenco.annotazioni[p].TitoloAnnotazione && 
							AN.DataCreazione*1==elenco.annotazioni[p].DataCreazione*1)	){ // se esiste aggiorna
							
						DB.annotazioni.data[k] = JSNPUSH;
						passato=true;
					}
				}
				if(!passato){ // se non esiste aggiungo
					DB.annotazioni.data.push(JSNPUSH);
				}
			}
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.annotazioni.data){
					let trovato = false,
						AN = DB.annotazioni.data[k];
					for(let p in elenco.annotazioni){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(AN.idAnnotazione*1>0 && elenco.annotazioni[p].idAnnotazione*1==AN.idAnnotazione*1) ||
							AN.idAnnotazione*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						DB.annotazioni.data[k].Cancellato = 1;
						DB.annotazioni.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			DB.annotazioni.lastSync=lastSync;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".annotazioni"), IMPORTER.COMPR(DB.annotazioni)).then(function(){ // salvo il DB
				SYNCRO.verSincro('annotazioni');
			});
		}else SYNCRO.verSincro('annotazioni');
		
		// PAZIENTI
		if(elenco.pazienti){
			syncUp=true;
			for(let p in elenco.pazienti){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.pazienti[p].DataModifica = lastSync*1;
				
				JSNPUSH={ 	"idPaziente": elenco.pazienti[p].idPaziente*1,
							"Nome": elenco.pazienti[p].Nome+"",
							"Cognome": elenco.pazienti[p].Cognome+"",
							"Indirizzo": elenco.pazienti[p].Indirizzo,
							"CAP": elenco.pazienti[p].CAP,
							"Citta": elenco.pazienti[p].Citta,
							"Provincia": elenco.pazienti[p].Provincia,
							"Stato": elenco.pazienti[p].Stato,
							"Telefono": elenco.pazienti[p].Telefono,
							"Cellulare": __(elenco.pazienti[p].Cellulare),
							"paeseCellulare": __(elenco.pazienti[p].paeseCellulare),
							"Email": elenco.pazienti[p].Email,
							"sesso": elenco.pazienti[p].sesso,
							"NotePaziente": elenco.pazienti[p].NotePaziente,
							"DataNascita": elenco.pazienti[p].DataNascita,
							"LuogoNascita": __(elenco.pazienti[p].LuogoNascita),
							"tags": toJson(elenco.pazienti[p].tags),
							"etichette": toJson(elenco.pazienti[p].etichette),
							"medicine": toJson(elenco.pazienti[p].medicine),
							"allergie": toJson(elenco.pazienti[p].allergie),
							"patologie": toJson(elenco.pazienti[p].patologie),
							"interventi": toJson(elenco.pazienti[p].interventi),
							"gallery": toJson(elenco.pazienti[p].gallery),
							"Provenienza": elenco.pazienti[p].Provenienza,
							"Professione": elenco.pazienti[p].Professione,
							"Intestazione": elenco.pazienti[p].Intestazione,
							"CodiceFiscale": elenco.pazienti[p].CodiceFiscale,
							"PartitaIva": elenco.pazienti[p].PartitaIva,
							"Social": elenco.pazienti[p].Social,
							"avatar": elenco.pazienti[p].avatar,
							"Altezza": elenco.pazienti[p].Altezza,
							"Peso": elenco.pazienti[p].Peso,
							"DataModifica": elenco.pazienti[p].DataModifica*1,
							"trattamenti": [],
							"saldi": [],
							"Cancellato": elenco.pazienti[p].Cancellato*1,
							"frv": false };
	
				let trattamentiProvvisori=[],
					saldiProvvisori=[];
				kDef=-1; // il paziente di riferimento su cui lavorare per i trattamenti
				for(let k in DB.pazienti.data){
					PZ = DB.pazienti.data[k];
					if( ( PZ.idPaziente*1>0 && PZ.idPaziente*1==elenco.pazienti[p].idPaziente*1 ) || 
						( PZ.idPaziente*1==0 && PZ.Nome==elenco.pazienti[p].Nome && PZ.Cognome==elenco.pazienti[p].Cognome ) || 
						( PZ.idPaziente*1==0 && k==elenco.pazienti[p].p) ){
							
						// se esiste aggiorna
						if(typeof(PZ.trattamenti)=='undefined')PZ.trattamenti=[];
						if(typeof(PZ.saldi)=='undefined')PZ.saldi=[];
						trattamentiProvvisori=JSON.parse(JSON.stringify(PZ.trattamenti));
						saldiProvvisori=JSON.parse(JSON.stringify(PZ.saldi));
						let md5 = '';
						if(typeof(DB.pazienti.data[k].md5)!='undefined')md5=PZ.md5;
						DB.pazienti.data[k] = JSNPUSH;
						DB.pazienti.data[k].md5=md5;
						kDef=k;
						passato=true;
					}
					
				}
				if(!passato){
					// se non esiste aggiungo
					DB.pazienti.data.push(JSNPUSH);
					kDef=DB.pazienti.data.length-1;
				}
				
				// TRATTAMENTI x ogni paziente
				if(elenco.pazienti[p].Cancellato*1!=1){ // se il paziente NON è cancellato
					let trattamenti=JSON.parse(JSON.stringify(elenco.pazienti[p].trattamenti)); // elenco trattamenti arrivati nuovi
					
					for(t in trattamenti){ // in tutti i trattamenti arrivati
						passato=false;
						
						let puntiMTC = trattamenti[t].puntiMTC;
						
						if(puntiMTC.substr(0,1)!="["){ // per i dati che arrivano da TM15
							if(puntiMTC.indexOf(".")>-1){
								let puntiProvvisori = [],
									parti = puntiMTC.split("|");
								for(let pt in parti){
									let ppp = parti[pt].split(".");
									puntiProvvisori.push({
										n: ppp[0],
										m: ppp[1],
										e: ppp[2]
									});
								}
								puntiMTC = JSON.stringify(puntiProvvisori);
							}else puntiMTC = '[]';
						} //-------------------------------------------------------------
						
						if(BACKUPS.bkpProvv)trattamenti[t].DataModifica = lastSync*1;
						JSNPUSH={ 	"idTrattamento": trattamenti[t].idTrattamento*1,
									"idPaziente": DB.pazienti.data[kDef].idPaziente*1,
									"TitoloTrattamento": trattamenti[t].TitoloTrattamento,
									"TestoTrattamento": trattamenti[t].TestoTrattamento,
									"Prescrizione": trattamenti[t].Prescrizione,
									"puntiMTC": toJson(puntiMTC),
									"puntiAuricolari": toJson(__(trattamenti[t].puntiAuricolari,'')),
									"puntiPlantari": toJson(__(trattamenti[t].puntiPlantari,'')),
									"puntiNamikoshi": toJson(__(trattamenti[t].puntiNamikoshi,'')),
									"meridiani": toJson(trattamenti[t].meridiani),
									"sintomi": toJson(trattamenti[t].sintomi),
									"gallery": toJson(trattamenti[t].gallery),
									"TimeTrattamento": trattamenti[t].TimeTrattamento*1,
									"oraInizio": trattamenti[t].oraInizio*1,
									"oraFine": trattamenti[t].oraFine*1,
									"DataModifica": trattamenti[t].DataModifica*1,
									"LabelCiclo": trattamenti[t].LabelCiclo,
									"TipoTrattamento": trattamenti[t].TipoTrattamento,
									"CostoTrattamento": trattamenti[t].CostoTrattamento*1,
									"ordine": trattamenti[t].ordine*1,
									"Cancellato": trattamenti[t].Cancellato*1,
									"frv": false };		
						for(let g in trattamentiProvvisori){ // in quelli esistenti ...
							let TR = trattamentiProvvisori[g],
								md5='';
							if(typeof(trattamentiProvvisori[g].md5)!='undefined')md5=trattamentiProvvisori[g].md5;
							//console.log(md5)
							if(	(TR.idTrattamento*1>0 && TR.idTrattamento*1==trattamenti[t].idTrattamento*1) ||
								(TR.idTrattamento*1==0 && TR.id_interno*1==trattamenti[t].p*1)){ // verifico l'esistenza
								
								// se esiste aggiorna
								trattamentiProvvisori[g]=JSNPUSH;
								trattamentiProvvisori[g].md5=md5;
								passato=true;
							}
						}
						if(!passato){ // se non esiste aggiungo
							trattamentiProvvisori.push(JSNPUSH);
						}
					}
					
					if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
						for(let g in trattamentiProvvisori){ 
							let trovato = false,
								TR = trattamentiProvvisori[g];
							for(t in trattamenti){
								/*
									se sto ripristinando un backup
									se non trovo l'elemento del DB locale nel DB backuppato
									oppure non è mai stato backuppato
									cancello l'elemento locale
								*/
								if(	(TR.idTrattamento*1>0 && trattamenti[t].idTrattamento*1==TR.idTrattamento*1) ||
									TR.idTrattamento*1 == 0){
									trovato = true;
								}
							}
							if(!trovato){
								trattamentiProvvisori[g].Cancellato = 1;
								trattamentiProvvisori[g].DataModifica = lastSync + 1;
							}
						}
					}
					DB.pazienti.data[kDef].trattamenti=trattamentiProvvisori;
					
				}
				// SALDI x ogni paziente
				if(elenco.pazienti[p].Cancellato*1!=1){ // se il paziente NON è cancellato
					let saldi=JSON.parse(JSON.stringify(elenco.pazienti[p].saldi)); // elenco trattamenti arrivati nuovi
					
					for(t in saldi){ // in tutti i trattamenti arrivati
						passato=false;
						if(BACKUPS.bkpProvv)saldi[t].DataModifica = lastSync*1;
						JSNPUSH={ 	"idSaldo": saldi[t].idSaldo*1,
									"idPaziente": DB.pazienti.data[kDef].idPaziente*1,
									"MotivoSaldo": saldi[t].MotivoSaldo,
									"RicevutaSaldo": __(saldi[t].RicevutaSaldo),
									"ValoreSaldo": saldi[t].ValoreSaldo*1,
									"DataSaldo": saldi[t].DataSaldo*1,
									"DataModifica": saldi[t].DataModifica*1,
									"Cancellato": saldi[t].Cancellato*1,
									"frv": false };		
									
						if(debug)console.log(JSNPUSH);
						for(let g in saldiProvvisori){ // in quelli esistenti ...
							let SL = saldiProvvisori[g];
							if(	( SL.idSaldo*1>0 && SL.idSaldo*1==saldi[t].idSaldo*1) ||
								  SL.id_interno*1==saldi[t].p*1 ){ // verifico l'esistenza
								
								// se esiste aggiorna
								let md5='';
								if(typeof(saldi[t].md5)!='undefined')md5=saldi[t].md5;
								saldiProvvisori[g]=JSNPUSH;
								saldiProvvisori[g].md5=md5;
								passato=true;
							}
						}
						
						if(!passato){ // se non esiste aggiungo
							saldiProvvisori.push(JSNPUSH);
						}
					}
					
					if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
						for(let g in saldiProvvisori){ 
							let trovato = false,
								SA = saldiProvvisori[g];
							for(t in saldi){
								/*
									se sto ripristinando un backup
									se non trovo l'elemento del DB locale nel DB backuppato
									oppure non è mai stato backuppato
									cancello l'elemento locale
								*/
								if(	(SA.idSaldo*1>0 && saldi[t].idSaldo*1==SA.idSaldo*1) ||
									SA.idSaldo*1 == 0){
									trovato = true;
								}
							}
							if(!trovato){
								saldiProvvisori[g].Cancellato = 1;
								saldiProvvisori[g].DataModifica = lastSync + 1;
							}
						}
					}
					
					DB.pazienti.data[kDef].saldi=saldiProvvisori;
				}
			}
			DB.pazienti.lastSync=lastSync;
			
			
				
			
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.pazienti.data){
					let trovato = false,
						PZ = DB.pazienti.data[k];
					for(let p in elenco.pazienti){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(PZ.idPaziente*1>0 && elenco.pazienti[p].idPaziente*1==PZ.idPaziente*1) ||
							PZ.idPaziente*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						PZ.Cancellato = 1;
						PZ.DataModifica = lastSync + 1;
					}
				}
			}
			
			
			// elimino i pazienti con idPaziente = 0 dopo la sincronizzazione
			for(let p in DB.pazienti.data){
				if(DB.pazienti.data[p].idPaziente*1==0){
					if(p>0)DB.pazienti.data.splice(p,1);
					else DB.pazienti.data.shift();
				}
			}
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				SYNCRO.verSincro('pazienti'); 
			});
		}else SYNCRO.verSincro('pazienti');

		LOGIN.daSync = false;
		LINGUE.getGoogleLanguages();
	},
	verSincro: function ( txt ){ // verifica la sincronizzazione della tabella txt
		SYNCRO.nSinc++;
		if(SYNCRO.afterFunct && SYNCRO.afterFunct.indexOf('/*noRic*/')==-1) {
			switch(txt){
				
				case "appuntamenti":
					if(agenda.opened){
						agenda.apri(agenda.DataPartenza,agenda.elemento,null,agenda.elemento);
					}
					break;
				
				case "annotazioni":
					ANNOTAZIONI.caricaAnnotazioni();
					break;
				
				case "servizi":
					SERVIZI.caricaServizi();
					break;
				
				case "fornitori":
					FORNITORI.caricaFornitori();
					break;
				
				case "pazienti":
					if(PAZIENTI.idCL == -1)PAZIENTI.caricaPazienti();
					else{
						if(PAZIENTI.trattOp)PAZIENTI.caricaTrattamenti();
						if(PAZIENTI.saldoOp)PAZIENTI.caricaSaldi();
					}
					break;
				
				case "procedure":
					if(globals.set.cartella){
						try{
							SET.car_procedure('',true);
						}catch(err){}
					}
					break;
					
			}
		}
		if(SYNCRO.nSinc == SYNCRO.totSinc){ // pazienti | procedure | note | ricerche
			SYNCRO.pulisciTabelle();
			DB._verDbSize();
		}
	},
	pulisciTabelle: function(){ // elimina gli elementi "Cancellati"
		if(!BACKUPS.bkpProvv){
			DB.pazienti.data = __(DB.pazienti.data,[]);
			let PZS = DB.pazienti.data,
				tot,
				tot2;
			tot = PZS.length;
			for(let p=tot-1;p>=0;p--){
				if(PZS[p].Cancellato=='1' || __(PZS[p].frv))PZS.splice(p, 1)
			}
			tot = PZS.length;
			for(let p=tot-1;p>=0;p--){
				let TRS = DB.pazienti.data[p].trattamenti;
				tot2 = TRS.length;
				for(t=tot2-1;t>=0;t--){
					if(TRS[t].Cancellato=='1' || __(TRS[t].frv))TRS.splice(t, 1);
				}
			}
			for(let p=tot-1;p>=0;p--){
				let SAS = DB.pazienti.data[p].saldi;
				tot2 = SAS.length;
				for(let s=tot2-1;s>=0;s--){
					if(SAS[s].Cancellato=='1' || __(SAS[s].frv))SAS.splice(s, 1);
				}
			}
			DB.fornitori.data = __(DB.fornitori.data,[]);
			let FRS = DB.fornitori.data;
			tot = FRS.length;
			for(let p=tot-1;p>=0;p--){
				if(FRS[p].Cancellato=='1' || __(FRS[p].frv))FRS.splice(p, 1)
			}
			DB.servizi.data = __(DB.servizi.data,[]);
			let SRS = DB.servizi.data;
			tot = SRS.length;
			for(let p=tot-1;p>=0;p--){
				if(SRS[p].Cancellato=='1' || __(SRS[p].frv))SRS.splice(p, 1)
			}
			DB.appuntamenti.data = __(DB.appuntamenti.data,[]);
			let APS = DB.appuntamenti.data;
			tot = APS.length;
			for(let p=tot-1;p>=0;p--){
				if(APS[p].Cancellato=='1' || __(APS[p].frv))APS.splice(p, 1)
			}
			DB.annotazioni.data = __(DB.annotazioni.data,[]);
			let ANS = DB.annotazioni.data;
			tot = ANS.length;
			for(let p=tot-1;p>=0;p--){
				if(ANS[p].Cancellato=='1' || __(ANS[p].frv))ANS.splice(p, 1)
			}
			DB.procedure.data = __(DB.procedure.data,[]);
			let PRS = DB.procedure.data;
			tot = PRS.length;
			for(let p=tot-1;p>=0;p--){
				if(PRS[p].Cancellato=='1' || __(PRS[p].frv))PRS.splice(p, 1)
			}
			PRS = DB.procedure.data;
			tot = PRS.length;
			for(let p=tot-1;p>=0;p--){
				let DTS = DB.procedure.data[p].dettagliProcedura;
				tot2 = DTS.length;
				for(let d=tot2-1;d>=0;d--){
					if(DTS[d].Cancellato=='1' || __(DTS[d].frv))DTS.splice(d, 1);
				}
			}
		}
		//DB.files = { data: [], lastSync: 0 };
		for(let f in DB.files.data){
			DB.files.data[f].imgBig = '';
		}
		Promise.all([
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".annotazioni"), IMPORTER.COMPR(DB.annotazioni)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files))
		]).then(function( dbs ){
			if(SYNCRO.afterFunct){
				eval(SYNCRO.afterFunct);
				if(SYNCRO.afterFunct && SYNCRO.afterFunct.indexOf('/*noRic*/')>=-1){
					SYNCRO.afterFunct = null;
					return;
				}
				SYNCRO.afterFunct = null;
			}else{
				try{
					SET.car_procedure(-1,1);
					SET.leggiNote();
				}catch(err){}
			}
			if(PAZIENTI.idCL == -1)PAZIENTI.caricaPazienti();
			else{
				try{document.getElementById("lista_pazienti").querySelector(".alertMini").style.display='none';}catch(err){}
			}
			FORNITORI.caricaFornitori();
			SERVIZI.caricaServizi();
			ANNOTAZIONI.caricaAnnotazioni();
			
			if(agenda.opened){
				agenda.apri(agenda.DataPartenza,agenda.elemento,null,agenda.elemento);
			}
			if(	SCHEDA.elencoSel == 'pazienti'){	
				let lista = document.getElementById("lista_pazienti").querySelector(".lista");
				if(lista.classList.contains("listaTrattamenti"))PAZIENTI.caricaTrattamenti( true ); // true serve per ...
				if(lista.classList.contains("listaSaldi"))PAZIENTI.caricaSaldi( true ); //    ... riaccendere il pulsante
			}
			if(BACKUPS.bkpProvv){
				BACKUPS.bkpProvv = null;
				SYNCRO.sincronizza( 'BACKUPS.ripristinoTerminato();', true );
				visLoader("");
				SCHEDA.scaricaScheda();
				if(PAZIENTI.idCL > -1){
					PAZIENTI.deselPaziente();
				}
			}
			if(DB.__sizeDb<40*1000*1000)SYNCRO.updateGallery(); // limite a 40MB (circa 1000 file)
		});
	},
	updateGallery: function(){ // aggiorna la Gallery e richiama l'API url
		if(CONN.getConn() && LOGIN.logedin()!=''){
			let elenco = [];
			for(let p in DB.pazienti.data){
				// verifico nel paziente
				let gallery =  __(DB.pazienti.data[p].gallery,[]);
				if(gallery.length){
					for(let g in gallery){
						if(!__(gallery[g].imgMini)){
							let add = true;
							for(let f in DB.files.data){
								if(DB.files.data[f].idFile==gallery[g].idFile && __(DB.files.data[f].imgMini))add = false;
							}
							if(add)elenco.push(gallery[g].idFile);
						}
					}
				}
				// verifico nei trattamenti
				for(t in DB.pazienti.data[p].trattamenti){
					if(DB.pazienti.data[p].trattamenti[t].gallery){
						let gallery =  DB.pazienti.data[p].trattamenti[t].gallery;
						if(gallery.length){
							for(let g in gallery){
								if(!__(gallery[g].imgMini)){
									let add = true;
									for(let f in DB.files.data){
										if(DB.files.data[f].idFile==gallery[g].idFile && __(DB.files.data[f].imgMini))add = false;
									}
									if(add)elenco.push(gallery[g].idFile);
								}
							}
						}
					}
				}
			}
			for(let p in DB.procedure.data){
				// verifico nella procedura
				let gallery =  __(DB.procedure.data[p].gallery,[]);
				if(gallery.length){
					for(let g in gallery){
						if(!__(gallery[g].imgMini)){
							let add = true;
							for(let f in DB.files.data){
								if(DB.files.data[f].idFile==gallery[g].idFile && __(DB.files.data[f].imgMini))add = false;
							}
							if(add)elenco.push(gallery[g].idFile);
						}
					}
				}
			}
			CONN.caricaUrl(	'getImgGallery_GLOBAL.php','b64=1&iU='+DB.login.data.idUtente+'&JSNPOST='+window.btoa(encodeURIComponent(JSON.stringify(elenco))),'SYNCRO.updateGallery_save');
		}
	},
	updateGallery_save: function( res ){ // risposta dall'API url dell'aggiornamento gallery
		if(res){
			let modificato = false,
				files = JSON.parse(res);
			for(let f in files){
				let presente = false;
				for(let g in DB.files.data){
					if(DB.files.data[g].idFile == files[f].idFile){
						DB.files.data[g].imgMini = files[f].imgMini;
						presente = true;
					}
				}
				if(!presente){
					DB.files.data.push(files[f]);
					modificato = true;
				}
			}
			if(modificato){
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files));
			}
		}
	},
	pulisciGallery: function(){ // pulisce la gallery
		for(let f=DB.files.data.length-1;f>=0;f--){
			presente = false;
			for(let p in DB.pazienti.data){
				// verifico nel paziente
				let gallery =  __(DB.pazienti.data[p].gallery,[]);
				if(gallery.length){
					for(let g in gallery){
						if(DB.files.data[f].idFile == gallery[g].idFile)presente = true;
					}
				}
				// verifico nei trattamenti
				for(t in DB.pazienti.data[p].trattamenti){
					if(DB.pazienti.data[p].trattamenti[t].gallery){
						let gallery =  DB.pazienti.data[p].trattamenti[t].gallery;
						if(gallery.length){
							for(let g in gallery){
								if(DB.files.data[f].idFile == gallery[g].idFile)presente = true;
							}
						}
					}
				}
			}
			for(let p in DB.procedure.data){
				// verifico nella procedura
				let gallery =  __(DB.procedure.data[p].gallery,[]);
				if(gallery.length){
					for(let g in gallery){
						if(DB.files.data[f].idFile == gallery[g].idFile)presente = true;
					}
				}
			}
			if(!presente)DB.files.data.splice(f,1);
		}
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files));
	}
	
};