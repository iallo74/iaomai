var lastSync = 0;
var BACKUPS = {
	//
	cont: null,
	titleProvv: '',
	fileProvv: '',
	bkpProvv: null,
	maxBackups: 5,
	totBackups: 0,
	car_backups: function(){ // scarica l'elenco dei backups dal cloud
		document.getElementById("contBackups").classList.remove("noConn");
		document.getElementById("contBackups").classList.remove("dbBig");
		document.getElementById("toolsBackups").style.display = 'block';
		document.getElementById("titBackups").style.display = 'none';
		applicaLoading(document.getElementById("contBackups"));
		if(CONN.getConn()){
			CONN.caricaUrl(	"sincro_backups_elenco.php",
							"",
							"BACKUPS.caricaBackups",
							CONN.APIfilesFolder );
		}else{
			BACKUPS.caricaBackups('[]');
		}
	},
	caricaBackups: function( bkps ){ // scrive l'elenco dei backups
		BACKUPS.bkpProvv = null;
		let HTML = '';
		if(CONN.getConn()){
			if(!bkps)bkps = [];
			else bkps = JSON.parse(bkps);
			BACKUPS.totBackups = bkps.length;
			if(BACKUPS.totBackups){
				for(let n in bkps){
					let title = bkps[n].title,
						file = bkps[n].name.split(".")[0],
						d = file.split("-")[1]*1;
					
					HTML += '<div class="elsBackups"' +
							'	  onClick="BACKUPS.downloadBackup(\''+file+'\');">';
					HTML += getFullDataTS(d)+" - "+getOraTS(d);
					if(title)HTML += " ("+htmlEntities(title)+")";
					HTML += '</div>';
				}
			}else HTML += '<div class="noResults">'+htmlEntities(TXT("BackupsNessuno"))+'</div>';
		}else{
			document.getElementById("contBackups").classList.add("noConn");
		}
		document.getElementById("contBackups").innerHTML = HTML;
	},
	downloadBackup: function( file ){ // scarica il backup
		BACKUPS.fileProvv = file;
		applicaLoading(document.getElementById("contBackups"));
		CONN.caricaUrl(	"sincro_backups_download.php",
						"f="+encodeURIComponent(file),
						"BACKUPS.vis_backup",
						CONN.APIfilesFolder );
	},
	vis_backup: function( bkp ){ // visualizza la scheda del backup
		document.getElementById("contBackups").classList.remove("noConn");
		document.getElementById("contBackups").classList.add("dbBig");
		document.getElementById("toolsBackups").style.display = 'none';
		document.getElementById("titBackups").style.display = 'block';
		
		BACKUPS.bkpProvv = JSON.parse(bkp);
		BACKUPS.bkpProvv.JSNPOST = JSON.parse(decodeURIComponent(window.atob( BACKUPS.bkpProvv.JSNPOST )));
		
		let d = BACKUPS.fileProvv.split(".")[0].split("-")[1]*1,
			HTML = 
				'<h1>'+BACKUPS.bkpProvv.title+'</h1>' +
				'<p>'+getFullDataTS(d)+" - "+getOraTS(d)+'</p>' +
				'<div>' +
				'	<div class="btn_annulla" onClick="BACKUPS.el_backup();">' +
				'		<img src="img/ico_cestino.png" style="vertical-align:middle;"> ' +
						htmlEntities(TXT("EliminaBackup")) +
				'	</div>' +
				'	<div class="btn_invia" onClick="BACKUPS.ripristinaBackup_pre();">' +
						htmlEntities(TXT("RipristinaBackup")) +
				'	</div>' +
				'</div>';
		
		rimuoviLoading(document.getElementById("contBackups"));
		document.getElementById("contBackups").innerHTML = HTML;
	},
	conf_backup: function( txt ){ // conferma o errore nella creazione del backup
		if(txt.substr(0,3) == '404'){
			ALERT(TXT("BackupErrore"));
			return false;
		}else{
			//console.log(txt)
			ALERT(TXT("BackupCreato"));
			BACKUPS.car_backups();
		}
	},
	
	creaBackup: function(){ // scrive la scheda di creazione di un backup
		if(BACKUPS.totBackups >= BACKUPS.maxBackups){
			ALERT(TXT("maxBackups").replace("[n]",BACKUPS.maxBackups));
			return;
		}
		if(CONN.retNoConn()){
			document.getElementById("contBackups").classList.remove("noConn");
			document.getElementById("contBackups").classList.add("dbBig");
			document.getElementById("toolsBackups").style.display = 'none';
			document.getElementById("titBackups").style.display = 'block';
			
			let HTML = 
					'<h1>'+htmlEntities(TXT("CreaBackup"))+'</h1>' +
					'<div>' +
					'	<div>' +
					'		<input type="text"' +
					'			   name="nomeBackup"' +
					'			   id="nomeBackup"' +
					'			   placeholder="'+htmlEntities(TXT("NomeBackup"))+'">' +
					'	</div>' +
					'	<div class="btn_invia" onClick="BACKUPS.inviaBackup();">' +
							htmlEntities(TXT("CreaBackup")) +
					'	</div>' +
					'</div>';
			
			
			rimuoviLoading(document.getElementById("contBackups"));
			document.getElementById("contBackups").innerHTML = HTML;
			if(mouseDetect)document.getElementById("nomeBackup").focus();
		}
	},
	
	inviaBackup: function(){ // invia il backup al cloud
		if(CONN.retNoConn()){
			BACKUPS.titleProvv = document.getElementById("nomeBackup").value.trim();
			if(BACKUPS.titleProvv=='')return;
			document.getElementById("contBackups").classList.add("dbBig");
			applicaLoading(document.getElementById("contBackups"));
			SYNCRO.globalSync('remoto');
		}
	},
	
	el_backup: function(){ // elimina un backup
		CONFIRM.vis( TXT("ChiediEliminaBackup") ).then(function(pass){if(pass){
			applicaLoading(document.getElementById("contBackups"));
			if(CONN.retNoConn()){
				CONN.caricaUrl(	"sincro_backups_elimina.php",
								"f="+BACKUPS.fileProvv,
								"BACKUPS.car_backups",
								CONN.APIfilesFolder );
			}
		}});
	},
	
	ripristinaBackup_pre: function(){ // avvia il ripristino di un backup
		CONFIRM.vis(	TXT("ChiediRipristinaBackup") ).then(function(pass){if(pass){
			setTimeout( function(){
				CONFIRM.vis(	TXT("SicuroRipristinaBackup") ).then(function(pass){if(pass){
					// prima di ripristinare il backup sincronizzo con il server per verificare l'ultimo lastSync e salvare la versione attuale
					applicaLoading(document.getElementById("contBackups"));
					SYNCRO.sincronizza(	'BACKUPS.ripristinaBackup()' );
					
				}});
			},500 );
		}});
	},
	ripristinaBackup: function(){ // ripristina un backup
		DB.pazienti.lastSync = 0;
		DB.note.lastSync = 0;
		DB.procedure.lastSync = 0;
		DB.ricerche.lastSync = 0;
		BACKUPS.bkpProvv.JSNPOST.lastSync = lastSync;
		let txt = JSON.stringify(BACKUPS.bkpProvv.JSNPOST);
		SYNCRO.globalSync(txt);
	},
	ripristinoTerminato: function(){ // avverte che il ripristino è terminato
		localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".note")).then(function(dbCont){ // leggo il DB
			DB.note = IMPORTER.DECOMPR(dbCont);
			try{
				SET.leggiNote();
			}catch(err){}
			MENU.chiudiMenu();
			ALERT(TXT("BackupRipristinato"));
		});
	},

	// scheda visiva del backup
	dwnlMakeRow: function( PZ, el, addTxt = '' ){ // crea una riga della scheda
		let html = '';
		if(PZ[el])html += "<i>"+TXT(el)+":</i> "+htmlEntities(addTxt+PZ[el])+"<br>";
		return html;
	},
	download: function( backup, data ){ // compone l'html per il backup visivo
		let HTML = '',
			addShiatsu = globals.set.cartella=='meridiani_shiatsu'?'Shiatsu' : '';
		HTML += '<style type="text/css">*{font-family:Verdana, Geneva, sans-serif;font-size:12px;line-height:20px;}.rientro{padding-left:20px;}.tits{font-size:14px;}h1, h1 *{font-size:24px;}h2, h2 *{font-size:20px;}h3, h3 *{font-size:16px;}i{color:#999;}</style>';
		HTML += TXT("Backup")+": <b>"+DB.login.data.Nominativo+"</b><br>";
		HTML += "<i>"+TXT("DataCreazione")+":</i> <b>"+getFullDataTS(data)+" ore "+getOraTS(data)+"</b><hr>";
		
		HTML += "<h1>"+TXT("Pazienti").toUpperCase()+"</h1><div class=\"rientro\">";
		for(let p in backup.pazienti){
			backup.pazienti[p].Nome=backup.pazienti[p].Nome;
			backup.pazienti[p].Cognome=backup.pazienti[p].Cognome;
			backup.pazienti[p].p=p;
		}
		backup.pazienti.sort(sort_by("Cognome" ));
		backup.pazienti.sort(sort_by("Nome" ));
		let nr = 0;
		for(let p in backup.pazienti){
			let PZ = backup.pazienti[p];
			if((PZ.Nome || PZ.Cognome) && PZ.Cancellato!='1'){
				nr++;

				etichette = JSON.parse(PZ.etichette);
				
				HTML += "<h2>"+htmlEntities(PZ.Nome)+" "+htmlEntities(PZ.Cognome)+"</h2><div class=\"rientro\">";

				let htmlProvv = '';
				if(PZ.sesso)htmlProvv += "<i>"+TXT("Sesso")+":</i> "+sessi[PZ.sesso]+"<br>";
				if(PZ.DataNascita!='0000-00-00')htmlProvv += "<i>"+TXT("DataNascita")+":</i> "+htmlEntities(getDataTS(new Date(PZ.DataNascita)*.001))+"<br>";
				if(PZ.LuogoNascita)htmlProvv += "<i>"+TXT("LuogoNascita")+":</i> "+htmlEntities(PZ.LuogoNascita)+"<br>";
				htmlProvv += H.scriviEtichette('anagrafici');
				if(htmlProvv)HTML += "<i><b>"+TXT("LabelAnagrafici")+"</b></i><br>"+htmlProvv+"<br>";
				
				htmlProvv = BACKUPS.dwnlMakeRow(PZ,"Indirizzo") +
							BACKUPS.dwnlMakeRow(PZ,"Citta") +
							BACKUPS.dwnlMakeRow(PZ,"Provincia") +
							BACKUPS.dwnlMakeRow(PZ,"CAP") +
							BACKUPS.dwnlMakeRow(PZ,"Stato") +
							H.scriviEtichette('indirizzo');
				if(htmlProvv)HTML += "<i><b>"+TXT("LabelIndirizzo")+"</b></i><br>"+htmlProvv+"<br>";
				
				htmlProvv = BACKUPS.dwnlMakeRow(PZ,"Telefono") +
							BACKUPS.dwnlMakeRow(PZ,"Telefono", PZ.paeseCellulare ? DB.INT.paesi[PZ.paeseCellulare].prefisso : '' ) +
							BACKUPS.dwnlMakeRow(PZ,"Email") +
							H.scriviEtichette('contatti');
				if(htmlProvv)HTML += "<i><b>"+TXT("LabelContatti")+"</b></i><br>"+htmlProvv+"<br>";
				
				htmlProvv = BACKUPS.dwnlMakeRow(PZ,"Intestazione") +
							BACKUPS.dwnlMakeRow(PZ,"CodiceFiscale") +
							BACKUPS.dwnlMakeRow(PZ,"PartitaIva") +
							H.scriviEtichette('fatturazione');
				if(htmlProvv)HTML += "<i><b>"+TXT("LabelFatturazione")+"</b></i><br>"+htmlProvv+"<br>";
				
				htmlProvv = BACKUPS.dwnlMakeRow(PZ,"Provenienza") +
							BACKUPS.dwnlMakeRow(PZ,"Professione") +
							BACKUPS.dwnlMakeRow(PZ,"Social") +
							H.scriviEtichette('aggiuntive');
				if(htmlProvv)HTML += "<i><b>"+TXT("LabelAggiuntive")+"</b></i><br>"+htmlProvv+"<br>";

				
				htmlProvv = '';
				let tags = JSON.parse(PZ.tags);
				if(tags.length>0){
					HTML += "<br><i><b>"+TXT("Tags")+"</b></i><br>";
					for(let j in tags){
						HTML += '- ' +htmlEntities(tags[j].NomeTag) +'<br>';
					}
					HTML += "<br>";
				}
				
				htmlProvv = BACKUPS.dwnlMakeRow(PZ,"Altezza") +
							BACKUPS.dwnlMakeRow(PZ,"Peso") +
							H.scriviEtichette('biometrici');
				if(htmlProvv)HTML += "<i><b>"+TXT("LabelBiometrici")+"</b></i><br>"+htmlProvv+"<br>";

				let medicine = JSON.parse(PZ.medicine);
				if(medicine.length>0){
					HTML += "<br><i><b>"+TXT("Medicine")+"</b></i><br>";
					for(let j in medicine){
						HTML += '- ' +htmlEntities(medicine[j].NomeMedicina) +'<br>';
					}
					HTML += "<br>";
				}

				let allergie = JSON.parse(PZ.allergie);
				if(allergie.length>0){
					HTML += "<br><i><b>"+TXT("Allergie")+"</b></i><br>";
					for(let j in allergie){
						HTML += '- ' +htmlEntities(allergie[j].NomeAllergia) +'<br>';
					}
					HTML += "<br>";
				}

				let patologie = JSON.parse(PZ.patologie);
				if(patologie.length>0){
					HTML += "<br><i><b>"+TXT("Patologie")+"</b></i><br>";
					for(let j in patologie){
						HTML += '- ' +htmlEntities(patologie[j].NomePatologie) +'<br>';
					}
					HTML += "<br>";
				}

				let interventi = JSON.parse(PZ.interventi);
				if(interventi.length>0){
					HTML += "<br><i><b>"+TXT("Intervento")+"</b></i><br>";
					for(let j in interventi){
						HTML += '- ' +htmlEntities(interventi[j].NomeIntervento) +'<br>';
					}
					HTML += "<br>";
				}

				htmlProvv = '';
				if(PZ.NotePaziente)htmlProvv += "<i>"+TXT("Note")+":</i> "+htmlEntities(PZ.NotePaziente)+"</div>";
				if(htmlProvv)HTML += "<i><b>"+TXT("LabelAnnotazioni")+"</b></i><br>"+htmlProvv+"<br>";
	

				if(PZ.trattamenti.length>0){
					HTML += "<br><div>";
					
					
					let cicli=[],
						n=0;
					for(let i in PZ.trattamenti){
						esiste=false;
						for(let c in cicli){
							if(cicli[c].NomeCiclo==PZ.trattamenti[i].LabelCiclo)esiste=true;
						}
						if(!esiste)cicli[n++]={"NomeCiclo": PZ.trattamenti[i].LabelCiclo, "UltimaModifica": PZ.trattamenti[i].TimeTrattamento*1, "p": i*1 };
					}
					for(let c in cicli){
						for(let i in PZ.trattamenti){
							if(PZ.trattamenti[i].TimeTrattamento*1>cicli[c].UltimaModifica*1){
								cicli[c].UltimaModifica=PZ.trattamenti[i].TimeTrattamento*1;
							}
						}
					}
					cicli.sort(sort_by("ordine", false, parseInt));
					let vuoto=true;
					for(let c in cicli){
						vuoto=false;
						//let noName=false;
						NomeCiclo=cicli[c].NomeCiclo;
						if(NomeCiclo=='0' || NomeCiclo=='')NomeCiclo=TXT("CicloSenzaNome");
						
						let trattamenti=[];
						for(t in PZ.trattamenti){
							if(PZ.trattamenti[t].LabelCiclo==cicli[c].NomeCiclo && PZ.trattamenti[t].Cancellato!='1'){
								trattamenti.push(PZ.trattamenti[t]);
							}
						}
						trattamenti.sort(sort_by("TimeTrattamento" , false, parseInt));
						trattamenti.sort(sort_by("TipoTrattamento" ));
						
						HTML += "<h3><i style=\"font-weight:normal;color:#666;\">"+TXT("CicloTrattamenti")+":</i> "+NomeCiclo+"</h3><div class=\"rientro\">";
						let isCiclo = false;
						for(t in trattamenti){
							let oI=trattamenti[t].oraInizio,
								oF=trattamenti[t].oraFine,
								orario=txtOrario='';
							if(oI*1>0 || oF*1>0){
								if(oI.toString().indexOf(".")>-1){
									let pO=oI.toString().split(".");
									oI=pO[0]+":30";
								}else oI+=":00";
								if(oF.toString().indexOf(".")>-1){
									let pO=oF.toString().split(".");
									oF=pO[0]+":30";
								}else oF+=":00";
								orario=oI+"-"+oF;
								txtOrario=TXT("eOra");
							}
							
							let titoletto = TXT("ModificaTrattamento")+" "+((isCiclo)?(t*1):(t*1)+1);
							if(trattamenti[t].TipoTrattamento=='A'){
								titoletto = TXT("Anamnesi"+addShiatsu);
								isCiclo = true;
							}

							HTML += "<b class=\"tits\" style=\"color:#666;\">"+titoletto+"</b><br>";
							if(trattamenti[t].TimeTrattamento)HTML += "<i>"+TXT("Data")+txtOrario+": </i> "+getFullDataTS(trattamenti[t].TimeTrattamento)+" "+orario+"<br>";
							HTML += "<i>"+TXT("Titolo")+":</i> <b>"+trattamenti[t].TitoloTrattamento+"</b><br>";
							HTML += "<i>"+TXT("Costo")+":</i> <b>"+ArrotondaEuro(trattamenti[t].CostoTrattamento)+"</b><br>";
							let TT=trattamenti[t].TestoTrattamento;
							if(trattamenti[t].TipoTrattamento=='A'){
								//console.log(TT)
								if(TT){
									TT=JSON.parse(TT);
									if(TT.AnamnesiMotivo)HTML += "<i>"+TXT("AnamnesiMotivo"+addShiatsu)+":</i> "+TT.AnamnesiMotivo+"<br>";
									if(TT.AnamnesiDiagnosiOccidentale)HTML += "<i>"+TXT("AnamnesiDiagnosiOccidentale"+addShiatsu)+":</i> "+TT.AnamnesiDiagnosiOccidentale+"<br>";
									if(TT.AnamnesiDiagnosiMTC)HTML += "<i>"+TXT("AnamnesiDiagnosiMTC"+addShiatsu)+":</i> "+TT.AnamnesiDiagnosiMTC+"<br>";
								}
							}else{
								if(TT)HTML += "<i>"+TXT("Descrizione")+":</i> "+TT.replace(/\n/gi,"<br>")+"<br>";
							}
							
							let sintomi = JSON.parse(trattamenti[t].sintomi);
							if(sintomi.length==0 && trattamenti[t].LabelCiclo){
								sintomi = PAZIENTI.getSintomiCiclo(trattamenti[t].LabelCiclo,PZ.p);
							}
							if(sintomi.length>0){
								let txtSintomi='';
								for(let s in sintomi){
									txtSintomi+="- "+sintomi[s].NomeSintomo+" <b> (";
									if(sintomi[s].score>-1)txtSintomi+=sintomi[s].score;
									else txtSintomi+='-';
									txtSintomi+=")</b><br>";
								}
								txtSintomi=txtSintomi.substr(0,txtSintomi.length-2);
								HTML += "<i>"+TXT("Sintomi")+":</i> <div class=\"rientro\">"+txtSintomi+"<br></div><br>";
							}
							if(trattamenti[t].puntiMTC){
								let punti=JSON.parse(trattamenti[t].puntiMTC),
									txtPunti='';
								for(let f in punti){
									nPunto=punti[f].n;
									siglaMeridiano=punti[f].m;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									siglaPunto=__(punti[f].s);
									txtPunti+="<b><font color=\"#999999\">•</font> ";
									if(!siglaPunto)txtPunti+=siglaMeridiano+"."+nPunto;
									else txtPunti+=siglaPunto;
									txtPunti += "</b>";
									if(valutazione=='V')txtPunti+=' (vuoto)';
									if(valutazione=='P')txtPunti+=' (pieno)';
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo+' - ';
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+="<br>";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)HTML += "<i>"+TXT("PuntiTrattamento")+":</i> <div class=\"rientro\">"+txtPunti+"<br></div><br>";
							}
							if(trattamenti[t].puntiNamikoshi){
								let punti=JSON.parse(trattamenti[t].puntiNamikoshi),
									txtPunti='';
								for(let f in punti){
									siglaPunto=punti[f].s;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									txtPunti+="<b><font color=\"#999999\">•</font> "+siglaPunto+"</b>";
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo+' - ';
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+="<br>";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)HTML += "<i>"+TXT("PuntiNamikoshi")+":</i> <div class=\"rientro\">"+txtPunti+"<br></div><br>";
							}
							if(trattamenti[t].meridiani){
								let meridiani=JSON.parse(trattamenti[t].meridiani),
									txtMeridiani='';
								for(let m in meridiani){
									siglaMeridiano=meridiani[m].siglaMeridiano;
									NomeMeridiano=__(meridiani[m].NomeMeridiano);
									valEnergetica=__(meridiani[m].valEnergetica);
									descrizione=__(meridiani[m].descrizione);
									txtMeridiani+="<b><font color=\"#999999\">•</font> "+NomeMeridiano+"</b>";
									if(valEnergetica=='V')txtMeridiani+=' (vuoto)';
									if(valEnergetica=='P')txtMeridiani+=' (pieno)';
									if(valEnergetica=='D')txtMeridiani+=' (dolorante)';
									if(descrizione)txtMeridiani+=' '+descrizione;
									txtMeridiani+="<br>";
								}
								txtMeridiani=txtMeridiani.substr(0,txtMeridiani.length-2);
								if(txtMeridiani)HTML += "<i>"+TXT("MeridianiTrattamento")+":</i> <div class=\"rientro\">"+txtMeridiani+"<br></div><br>";
							}
							if(trattamenti[t].puntiAuricolari){
								let punti=JSON.parse(trattamenti[t].puntiAuricolari),
									txtPunti='';
								for(let f in punti){
									siglaPunto=punti[f].s;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									txtPunti+="<b><font color=\"#999999\">•</font> "+punti[f].n+"</b>";
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo+' - ';
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+="<br> ";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)HTML += "<i>"+TXT("PuntiAuriculo")+":</i> <div class=\"rientro\">"+txtPunti+"<br></div><br>";
							}
							if(trattamenti[t].puntiPlantari){
								let punti=JSON.parse(trattamenti[t].puntiPlantari),
									txtPunti='';
								for(let f in punti){
									siglaPunto=punti[f].s;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									txtPunti+="<b><font color=\"#999999\">•</font> "+punti[f].n+"</b>";
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo+' - ';
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+="<br> ";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)HTML += "<i>"+TXT("PuntiReflex")+":</i> <div class=\"rientro\">"+txtPunti+"<br></div><br>";
							}
							if(trattamenti[t].puntiTrigger){
								let punti=JSON.parse(trattamenti[t].puntiTrigger),
									txtPunti='';
								for(let f in punti){
									siglaPunto=punti[f].s;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									txtPunti+="<b><font color=\"#999999\">•</font> "+punti[f].n+"</b>";
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo+' - ';
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+="<br> ";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)HTML += "<i>"+TXT("PuntiTrigger")+":</i> <div class=\"rientro\">"+txtPunti+"<br></div><br>";
							}
							HTML += "<br>";
						}
						HTML += "</div>";
					}
					
					HTML += "</div>";
				}
				
				
				if(PZ.saldi.length>0){
					HTML += "<br><i>"+TXT("ElSaldi").toUpperCase()+":</i><br><div class=\"rientro\">";
					let saldi=JSON.parse(JSON.stringify(PZ.saldi));
					saldi.sort(sort_by("DataSaldo", true, parseInt ));
					for(let s in saldi){
						if(saldi[s].Cancellato!='1')HTML += "<i>"+getFullDataTS(saldi[s].DataSaldo)+"</i>: <b>"+getValuta()+" "+ArrotondaEuro(saldi[s].ValoreSaldo)+"</b><br>";
					}
					HTML += "</div>";
				}
				
				let note=[];
				for(let n in backup.note){
					if(	backup.note[n].TestoAnnotazione && 
						backup.note[n].idPaziente==PZ.idPaziente && 
						backup.note[n].Cancellato!='1'){
						note.push(backup.note[n]);
					}
				}
				
				if(note.length>0){
					HTML += "<br><i>"+TXT("ANNOTAZIONI")+":</i><br><div class=\"rientro\">";
					for(let n in note){
						HTML += "<b>"+note[n].meridiano+" "+note[n].numeroPunto+"</b>: "+note[n].TestoAnnotazione.replace(/\n/gi,"<br>")+"<br>";
					}
					HTML += "</div>";
				}
				
				HTML += "</div><br><hr>";
				
			}
		}
		HTML += "</div>";

		htmlProvv = '';
		for(let n in backup.procedure){
			if(backup.procedure[n].NomeProcedura && backup.procedure[n].Cancellato!='1'){
				htmlProvv += "<b class=\"tits\">"+backup.procedure[n].NomeProcedura+"</b><div class=\"rientro\">" +
							 "<i>"+TXT("Data")+": </i> "+getFullDataTS(backup.procedure[n].DataCreazione)+"<br>";
				for(let d in backup.procedure[n].dettagliProcedura){
					let TD=backup.procedure[n].dettagliProcedura[d].TipoDettaglio;
					if(TD=='P')htmlProvv += "<i>"+TXT("Punti")+": </i>";
					if(TD=='M')htmlProvv += "<i>"+TXT("AggiungiMeridiano"+": </i>");
					if(TD=='T' || TD=='P' || TD=='M')htmlProvv += "<b>";
					let descrizione = backup.procedure[n].dettagliProcedura[d].DescrizioneDettaglio.replace(/\n/gi,"<br>");
					htmlProvv += descrizione;
					if(TD=='T' || TD=='P' || TD=='M')htmlProvv += "</b>";
					htmlProvv += "<br>";
				}
				htmlProvv += "<i>"+TXT("Condiviso")+": </i> ";
				if(backup.procedure[n].Condiviso=='1')htmlProvv += "<b>"+TXT("si")+"</b>";
				else htmlProvv += "<b>"+TXT("no")+"</b>";
				htmlProvv += "<br>" +
							 "</div>"+
							 "<hr>";
			}
		}
		if(htmlProvv)HTML += "<h1>"+TXT("PROCEDURE")+"</h1><div class=\"rientro\">"+htmlProvv+"</div>";
	
		htmlProvv = '';
		for(let n in backup.note){
			if(	backup.note[n].TestoAnnotazione && 
				backup.note[n].idPaziente==-1 && 
				backup.note[n].Cancellato!='1'){
					htmlProvv += "<b class=\"tits\">"+backup.note[n].meridiano+" "+backup.note[n].numeroPunto+"</b>: "+ backup.note[n].TestoAnnotazione.replace(/\n/gi,"<br>")+"<br>";
				
					htmlProvv += "<hr>";
			}
		}

		if(htmlProvv)HTML += "<h1>"+TXT("ANNOTAZIONI_GENERICO")+"</h1><div class=\"rientro\">"+htmlProvv+"</div>";

		// eseguo il download
		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(HTML));
		element.setAttribute('download', "dati personali "+getFullDataTS(data)+" ("+data+").htm");	
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
	
}