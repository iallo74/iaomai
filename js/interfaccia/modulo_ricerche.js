
var RICERCHE = { 
	// RICERCHE GLOBALI
	overElRis: false,
	parolaProvv: '',
	globOp: false,
	cSel: -1,
	
	car_global: function( parola=document.getElementById("parolaGlobal").value ){ // ricerca una parola
	
		let parolaOr = parola,
			nRis = 0, // numero di risultati
			nRisBase = 0, // numero di risultati nei testi base dell'app (importante per capire se dobbiamo inserire contenuti)
			HTML = '',
			HTML_index = '',
			HTML_list = '',
			sezioni = 0;
		RICERCHE.cSel = -1;
		
		parola=RICERCHE.pulisciTesto(parola);
		
		
		
		
		// AMap e ShiatsuMap
		if(	globals.set.cartella == 'meridiani_cinesi' ||
			globals.set.cartella == 'meridiani_shiatsu' ){
			let R_parz='',
				nRisParz = 0;
			
			// CERCO nei PUNTI e nei MERIDIANI
			for (k in DB.set.meridiani) {
				if(!(globals.set.cartella == 'meridiani_shiatsu' && k=='EX')){
					for (p in DB.set.meridiani[k].punti) {
						let MER = DB.set.meridiani[k].punti[p],
							testo = MER.AzioniPunto+" "+MER.NomePunto+" "+MER.ChiaviPunto;
							
						testo = RICERCHE.pulisciTesto(testo);
						
						if(	testo.toUpperCase().indexOf(parola.toUpperCase())>-1){
							NT = MER.NomePunto;
							partiNT=NT.split(".");
							siglaPunto = partiNT[0];
							let nomePunto = partiNT[0];
							if(k!='NK')nomePunto += "."+partiNT[1]
							if(globals.set.cartella == 'meridiani_cinesi'){
								if(__(MER.siglaPunto))nomePunto = MER.siglaPunto;
							}
							NT = '<b>'+htmlEntities(nomePunto)+'</b>';
							for(let n=2;n<partiNT.length;n++){
								NT+=partiNT[n];
								if(n<partiNT.length-1)NT+=".";
							}
							if(partiNT[0].length == 1)partiNT[0]='0'+partiNT[0];
							if(k=='NK')partiNT[0] = p;
							R_parz += RICERCHE.wR({
								az: "SET.azRicercaPunto('"+k+'.'+partiNT[0]+"');",//RICERCHE.nascondiGlobal(true);",
								cont: NT,
								bull: '<font style="color:#FF0000;">&#8226;</font>' });
							nRisParz++;
							nRis++;
							nRisBase++;
						}
					}
				}
			}
			if(R_parz){
				sezioni++;
				HTML_index+='<div class="labelGlobal" id="lb'+sezioni+'" onClick="RICERCHE.swCartGlob('+sezioni+');">'+TXT("Punto")+' ('+nRisParz+')</div>';
				HTML_list+='<div class="contRisGlob" id="cr'+sezioni+'">'+R_parz+'</div>';
			}
			
		}
		
		
		// AuriculoMap e ReflexologyMap
		if(	globals.set.cartella == 'auricologia' || globals.set.cartella == 'reflessologia_plantare' ){
			let R_parz='',
				nRisParz = 0;
			// CERCO nei PUNTI AURICOLARI e nei PUNTI PLANTARI
			for (siglaPunto in DB.set.punti) {
				let PT = DB.set.punti[siglaPunto],
					testo = PT.AzioniPunto+" "+PT.NomePunto+" "+PT.ChiaviPunto;
					
				testo = RICERCHE.pulisciTesto(testo);
				
				if(testo.toUpperCase().indexOf(parola.toUpperCase())>-1){
					R_parz += RICERCHE.wR({
						az: "SET.azRicercaPunto('"+siglaPunto+"');RICERCHE.nascondiGlobal();",
						cont: '<b>'+htmlEntities(PT.NomePunto)+'</b>',
						bull: '<font style="color:#FF0000;">&#8226;</font>' });
					nRisParz++;
					nRis++;
					nRisBase++;
				}
			}
			if(R_parz){
				sezioni++;
				HTML_index+='<div class="labelGlobal" id="lb'+sezioni+'" onClick="RICERCHE.swCartGlob('+sezioni+');">'+TXT("Punto")+' ('+nRisParz+')</div>';
				HTML_list+='<div class="contRisGlob" id="cr'+sezioni+'">'+R_parz+'</div>';
			}
			
		}
			
			
			
		// CERCO nelle NOTE
		let R_parz = '',
			nRisParz = 0,
			kS = 0;

		if(DB.note && (	globals.set.cartella == 'meridiani_cinesi' || 
						globals.set.cartella == 'meridiani_shiatsu' || 
						globals.set.cartella == 'auricologia' || 
						globals.set.cartella == 'reflessologia_plantare' ) ){
			for (p in DB.note.data) {
				let NT = DB.note.data[p],
					testo = RICERCHE.pulisciTesto(NT.TestoAnnotazione()),
					NomePunto = siglaPunto = '',
					puntiPass = (globals.set.cartella == 'auricologia' || globals.set.cartella == 'reflessologia_plantare') ? (NT.numeroPunto) : (NT.numeroPunto*1-1>-1);
				if(testo.toUpperCase().indexOf(parola.toUpperCase())>-1 && NT.Cancellato!='1' && puntiPass){
					
					if(	( globals.set.cartella == 'meridiani_cinesi' || 
						  globals.set.cartella == 'meridiani_shiatsu' ) && __(NT.app,'') == ''){
						NomePunto = DB.set.meridiani[SET.leggiSiglaMeridiano(NT.meridiano)].punti[NT.numeroPunto*1-1].NomePunto;
						partiNT=NomePunto.split(".");
						NomePunto='<b>'+htmlEntities(partiNT[0]+"."+partiNT[1])+"</b>";
						for(let n=2;n<partiNT.length;n++){
							NomePunto+=partiNT[n];
							if(n<partiNT.length-1)NomePunto+=".";
						}
						if(partiNT[0].length == 1)partiNT[0]='0'+partiNT[0];
						siglaPunto = partiNT[1]+"."+partiNT[0];
					}
					if(	(globals.set.cartella == 'auricologia' && __(NT.app,'') == 'AUR') ||
						(globals.set.cartella == 'reflessologia_plantare' && __(NT.app,'') == 'RFX')){
						NomePunto='<b>'+htmlEntities(DB.set.punti[NT.numeroPunto].NomePunto)+"</b>";
						siglaPunto = "PT"+NT.numeroPunto;
					}
					
					let pass = true;
					if(DB.note.data[p].idPaziente>-1 && siglaPunto){
						pass = false;
						for(let paz in DB.pazienti.data){
							if(	DB.pazienti.data[paz].idPaziente == DB.note.data[p].idPaziente){
								NomePunto += ' - '+DB.pazienti.data[paz].Nome+" "+DB.pazienti.data[paz].Cognome;
								pass = true;
							}
						}
					}
					if(pass && siglaPunto){
						R_parz += RICERCHE.wR({ az: "SET.apriPunto('"+siglaPunto+"');RICERCHE.nascondiGlobal();",
												cont: NomePunto,
												bull: '<font style="color:#FFCC00;">&#8226;</font>' });
						nRisParz++;
						nRis++;
					}
				}
			}
		}
		if(R_parz){
			sezioni++;
			HTML_index+='<div class="labelGlobal" id="lb'+sezioni+'" onClick="RICERCHE.swCartGlob('+sezioni+');">'+TXT("ElAnnotazioni")+' ('+nRisParz+')</div>';
			HTML_list+='<div class="contRisGlob" id="cr'+sezioni+'">'+R_parz+'</div>';
		}
		
		// CERCO nelle PATOLOGIE
		R_parz='';
		nRisParz = 0;
		kS=0;
		if(DB.set.patologie && (globals.set.cartella == 'meridiani_cinesi' || 
								globals.set.cartella == 'meridiani_shiatsu' || 
								globals.set.cartella == 'auricologia' || 
								globals.set.cartella == 'reflessologia_plantare') ){
			for (p in DB.set.patologie) {
				let PT = DB.set.patologie[p],
					testo=PT.NomePatologia+" "+PT.TestoPatologia+" "+PT.chiaviPatologia;
				testo=RICERCHE.pulisciTesto(testo);
				kS++;
				if(testo.toUpperCase().indexOf(parola.toUpperCase())>-1){
					
					R_parz += RICERCHE.wR({ az: "SET.azRicercaPatologie("+p+");",
											cont: htmlEntities(PT.NomePatologia) });
					nRisParz++;
					nRis++;
					nRisBase++;
				}
			}
		}
		if(R_parz){
			sezioni++;
			HTML_index+='<div class="labelGlobal" id="lb'+sezioni+'" onClick="RICERCHE.swCartGlob('+sezioni+');">'+TXT("Patologie")+' ('+nRisParz+')</div>';
			HTML_list+='<div class="contRisGlob" id="cr'+sezioni+'">'+R_parz+'</div>';
		}
			
		// CERCO negli APPROFONDIMENTI
		R_parz='';
		nRisParz = 0;
		kS=0;
		if(DB.set.teoria && (	globals.set.cartella == 'meridiani_cinesi' || 
								globals.set.cartella == 'meridiani_shiatsu' || 
								globals.set.cartella == 'auricologia' || 
								globals.set.cartella == 'reflessologia_plantare')){
			for (i in DB.set.teoria) {
				for (p in DB.set.teoria[i].contenuti) {
					let TEO = DB.set.teoria[i].contenuti[p],
						testo=TEO.TitoloTeoria+" "+TEO.TestoTeoria;
					testo=RICERCHE.pulisciTesto(testo);
					kS++;
					if(testo.toUpperCase().indexOf(parola.toUpperCase())>-1){
						
						R_parz += RICERCHE.wR({ az: "SET.azRicercaTeoria("+i+","+p+");",
												cont: htmlEntities(TEO.TitoloTeoria) });
						nRisParz++;
						nRis++;
						nRisBase++;
					}
				}
			}
		}
		if(R_parz){
			sezioni++;
			HTML_index+='<div class="labelGlobal" id="lb'+sezioni+'" onClick="RICERCHE.swCartGlob('+sezioni+');">'+TXT("Approfondimenti")+' ('+nRisParz+')</div>';
			HTML_list+='<div class="contRisGlob" id="cr'+sezioni+'">'+R_parz+'</div>';
		}
			
		// CERCO nelle PROCEDURE
		R_parz='';
		nRisParz = 0;
		kS=-1;
		if(DB.procedure && (globals.set.cartella == 'meridiani_cinesi' || 
							globals.set.cartella == 'meridiani_shiatsu' || 
							globals.set.cartella == 'auricologia' || 
							globals.set.cartella == 'reflessologia_plantare') ){
			for (p in DB.procedure.data) {
				let PR = DB.procedure.data[p],
					testo = PR.NomeProcedura;
				for (d in PR.dettagliProcedura){
					testo+=" "+PR.dettagliProcedura[d].DescrizioneDettaglio;
				}
				testo=RICERCHE.pulisciTesto(testo);
				kS++;
				if(testo.toUpperCase().indexOf(parola.toUpperCase())>-1 && PR.Cancellato!='1'){
					R_parz += RICERCHE.wR({ az: "SET.azRicercaProcedure("+p+");",
											cont: htmlEntities(PR.NomeProcedura) });
					nRisParz++;
					nRis++;
				}
			}
		}
		if(R_parz){
			sezioni++;
			HTML_index+='<div class="labelGlobal" id="lb'+sezioni+'" onClick="RICERCHE.swCartGlob('+sezioni+');">'+TXT("ElProcedure")+' ('+nRisParz+')</div>';
			HTML_list+='<div class="contRisGlob" id="cr'+sezioni+'">'+R_parz+'</div>';
		}
			
		// CERCO nei CLIENTI
		R_parz='';
		nRisParz = 0;
		kS=-1;
		if(DB.pazienti){
			for (p in DB.pazienti.data) {
				let PZ = DB.pazienti.data[p],
					testo = RICERCHE.pulisciTesto(PZ.Nome+" "+PZ.Cognome+" "+PZ.NotePaziente);
				kS++;
				if(testo.toUpperCase().indexOf(parola.toUpperCase())>-1 && PZ.Cancellato!='1'){
					if(PZ.sesso=='m')sesso='uomo';
					else sesso='donna';
					R_parz += RICERCHE.wR({ az: "PAZIENTI.azRicercaPazienti("+p+");",
											cont: htmlEntities(PZ.Nome+" "+PZ.Cognome) });
					nRisParz++;
					nRis++;
				}
				
				// CERCO nei TRATTAMENTI
				for (d in PZ.trattamenti){
					let TR = PZ.trattamenti[d],
						testo = RICERCHE.pulisciTesto(TR.TitoloTrattamento+" "+TR.TestoTrattamento+" "+TR.Prescrizione+" "+TR.sintomi);
					kS++;
					if(testo.toUpperCase().indexOf(parola.toUpperCase())>-1 && TR.Cancellato!='1'){
						Titolo = TR.TitoloTrattamento;
						if(TR.TipoTrattamento == 'A')Titolo = TR.LabelCiclo+" ("+TXT("Anamnesi")+")";
						R_parz += RICERCHE.wR({ az: "PAZIENTI.azRicercaTrattamenti("+p+","+d+");",
												cont: htmlEntities(PZ.Nome+" "+PZ.Cognome)+' - '+htmlEntities(Titolo) });
						nRisParz++;
						nRis++;
					}
				}
			}
		}
		if(R_parz){
			sezioni++;
			HTML_index+='<div class="labelGlobal" id="lb'+sezioni+'" onClick="RICERCHE.swCartGlob('+sezioni+');">'+TXT("ElPazienti")+' ('+nRisParz+')</div>';
			HTML_list+='<div class="contRisGlob" id="cr'+sezioni+'">'+R_parz+'</div>';
		}
		
		
		// CERCO nell'ANATOMIA
		if(globals.modello.cartella){
			R_parz='';
			nRisParz = 0;
			kS=0;
			let pAnat = [],
				livs = [0,1,2,3,4,7];
			for (l in livs) {
				let c = livs[l];
				let tipoAnat = '',
					iconaTipo = '';
				if(ANATOMIA.children[c].name == 'Visceri'){
					tipoAnat = 'Organo';
					tipo = tipoAnat;
					iconaTipo = 'V';
				}
				if(ANATOMIA.children[c].name == 'Ossa'){
					tipoAnat = 'Osso';
					tipo = tipoAnat;
					iconaTipo = 'O';
				}
				if(ANATOMIA.children[c].name == 'Muscoli3d'){
					tipoAnat = 'Muscolo';
					tipo = tipoAnat;
					iconaTipo = 'M';
				}
				if(ANATOMIA.children[c].name == 'pins_aree'){
					tipoAnat = 'Muscolo';
					tipo = 'area';
					iconaTipo = 'M';
				}
				if(ANATOMIA.children[c].name == 'Legamenti'){
					tipoAnat = 'Legamento';
					tipo = tipoAnat;
					iconaTipo = 'L';
				}
				if(ANATOMIA.children[c].name == 'Vasi'){
					tipoAnat = 'Vaso';
					tipo = tipoAnat;
					iconaTipo = 'N';
				}
				for (p in ANATOMIA.children[c].children) {
					let pA = ANATOMIA.children[c].children[p].name.split("("),
						txt = pA[0].replace("_SX","").replace("_DX","").split(".")[0];
					if(ANATOMIA.children[c].name == 'pins_aree')txt = txt.replace("PIN_Muscolo_","");
					if(txt.substr(txt.length-1,1)=='_')txt = txt.substr(0,txt.length-1);
					let pass = false,
						ELEM = txt, 
						testo = stripslashes(TXT(tipoAnat+"_"+txt)).toLowerCase();
					if(testo.indexOf(parola.toLowerCase()) > -1)pass = true;
				
					if(pA[1]){
						let txt = pA[1].replace(")","").replace("_SX","").replace("_DX","").split(".")[0];
						if(txt.substr(txt.length-1,1)=='_')txt = txt.substr(0,txt.length-1);
						let testo = stripslashes(TXT(tipoAnat+"_"+txt)).toLowerCase();
						if(testo.indexOf(parola.toLowerCase()) > -1)pass = true;
					}
					// cerco anche nelle schede di DB_anatomia
					if(DB_anatomia[ELEM]){
						if(DB_anatomia[ELEM].Titolo.toLowerCase().indexOf(parola.toLowerCase()) > -1)pass = true;
						if(DB_anatomia[ELEM].Descrizione.toLowerCase().indexOf(parola.toLowerCase()) > -1)pass = true;
					}
					if(pAnat.indexOf(ELEM) >- 1)pass = false;
					if(pass){
						pAnat.push(ELEM);
						//let tipo = ELEM.split("_")[0].toLowerCase();
						//let Tipo = tipo.charAt(0).toUpperCase() + tipo.slice(1);
						R_parz += RICERCHE.wR({ az: "MODELLO.azRicercaAnatomia('"+ELEM+"','"+tipo+"','"+ANATOMIA.children[c].children[p].name+"');",
												cont: htmlEntities(stripslashes(TXT(tipoAnat+"_"+ELEM))),
												class: "sel"+iconaTipo,
												style: "padding-left:30px;" });
						nRisParz++;
						nRis++;
					}
				}
			}
			
			if(R_parz){
				sezioni++;
				HTML_index+='<div class="labelGlobal" id="lb'+sezioni+'" onClick="RICERCHE.swCartGlob('+sezioni+');">'+TXT("Anatomia")+' ('+nRisParz+')</div>';
				HTML_list+='<div class="contRisGlob" id="cr'+sezioni+'">'+R_parz+'</div>';
			}
		}
			
			
		if(!nRis)HTML='<div class="noResGlob" id="noResGlob">'+TXT("NessunRisultato")+'</div>';
		else{
			HTML='<div id="divGlobal">';
			HTML+='<div id="globalIndex">'+HTML_index+'</div>';
			HTML+='<div id="globalList">'+HTML_list+'</div></div><div style="height:1px;clear:both;"></div>';
		}
		
		
		document.getElementById("globalTesto").innerHTML = HTML;
		document.getElementById("globalTesto").style.background='none';
		document.getElementById("globalTesto").classList.remove("globalHistory");
		applicaLoading(document.getElementById("globalTesto"));
		
		if(nRis)RICERCHE.swCartGlob(1);
		
		
		totPuntiRic=kS*1;
		
		RICERCHE.salvaRicerca(parolaOr,nRis,nRisBase);
		setTimeout(function(){rimuoviLoading(document.getElementById("globalTesto"));},300);
	},
	wR: function( obj ){ // scrive un risultato nella ricerca
		if(typeof(obj.bull) == 'undefined')obj.bull = '<b>&raquo;</b>';
		if(typeof(obj.class) == 'undefined')obj.class = '';
		if(typeof(obj.style) == 'undefined')obj.style = '';
		if(obj.style)obj.style = ' style="'+obj.style+'"';
		return '<div class="risGlob '+obj.class+'"'+obj.style+' onClick="'+obj.az+'">'+obj.bull+' '+obj.cont+'</div>';
	},
	swCartGlob: function( n ){
		let pass = true;
		if(WF()<=600 && !document.getElementById("globalIndex").classList.contains("visIndex")){
			document.getElementById("globalIndex").classList.add("visIndex");
			pass = false;
		}
		if(pass){
			if(RICERCHE.cSel>-1){
				document.getElementById("lb"+RICERCHE.cSel).classList.remove("labelSel");
				document.getElementById("cr"+RICERCHE.cSel).classList.remove("contGlobOp");
			}
			document.getElementById("lb"+n).classList.add("labelSel");
			document.getElementById("cr"+n).classList.add("contGlobOp");
			document.getElementById("globalIndex").classList.remove("visIndex");
			RICERCHE.cSel = n;
		}
	},
	car_historyGlobal: function(){ // carica la storia delle ricerche
		let HTML = '';
		RICERCHE.overElRis=false;
		RICERCHE.parolaProvv='';
		DB.ricerche.data.sort(sort_by("DataModifica", true, parseInt));
		let btnSvuota = '';
		for(let k in DB.ricerche.data){
			RICERCHE.parolaProvv=DB.ricerche.data[k].TestoRicerca.replace(/\'/g, '\\\'');
			if(DB.ricerche.data[k].Cancellato!=1){
				if(smartphone)HTML += '<img src="img/chiusuraSmartPhoneBlack.png" align="right" title="'+stripslashes(TXT("EliminaParola"))+'" onClick="RICERCHE.eliminaRicerca('+k+');" class="imgDelRes"/>';
				HTML += '<div ';
				if(smartphone)HTML += 'style="margin-right:30px;"';
				HTML += ' class="risGlob risLente" onClick="if(!RICERCHE.overElRis){document.getElementById(\'parolaGlobal\').value=\''+addslashes(htmlEntities(RICERCHE.parolaProvv))+'\';RICERCHE.globalSubmit();}';
				if(!smartphone)HTML += 'else{RICERCHE.eliminaRicerca('+k+');}';
				HTML += '">';
				if(!smartphone)HTML += '<img src="img/chiusuraSmartPhoneBlack.png" align="right" title="'+stripslashes(TXT("EliminaParola"))+'" onMouseOver="RICERCHE.overElRis=true;" onMouseOut="RICERCHE.overElRis=false;" />';
				HTML += htmlEntities(DB.ricerche.data[k].TestoRicerca)+'</div>';
			}
		}
		if(!HTML)HTML = '<div class="noResGlob" id="noResGlob">'+TXT("NessunRisultato")+'</div>';
		else btnSvuota = '<span onClick="RICERCHE.clear_historyGlobal();">'+TXT("SvuotaCronologia")+'</span>';
		document.getElementById("globalTesto").innerHTML='<p id="titHistoryGlobal"><b>'+TXT("TueRicerche")+'</b>'+btnSvuota+'</p>'+HTML;
		document.getElementById("globalTesto").classList.add("globalHistory");
	},
	clear_historyGlobal: function(){
		CONFIRM.vis(	TXT("ConfSvuotaCronologia"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			DB.ricerche.data=[];
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche)).then(function(){ // salvo il DB
				LOGIN.sincronizza();
			});
			RICERCHE.car_historyGlobal();
		}});
	},
	eliminaRicerca: function( n ){ // elimina una ricerca dalla storia
		let DataModifica = DB.ricerche.lastSync+1;
		JSNPUSH={	"TestoRicerca": DB.ricerche.data[n].TestoRicerca,
					"DataModifica": parseInt(DataModifica),
					"Cancellato": 1,
					"frv": (LOGIN._frv()!='')	};
		DB.ricerche.data[n]=JSNPUSH;
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche)).then(function(){ // salvo il DB
			LOGIN.sincronizza();
		});
		RICERCHE.car_historyGlobal();
	},
	salvaRicerca: function( parola, nRis, nRisBase ){ // salva una ricerca
		// verifico che la parola non esista già
		let nPres=false;
		for(let k in DB.ricerche.data){
			if(DB.ricerche.data[k].TestoRicerca==parola)nPres=k;
		}
		
		let DataModifica = DB.ricerche.lastSync+1;
		JSNPUSH={	"TestoRicerca": parola,
					"DataModifica": parseInt(DataModifica),
					"nRis": parseInt(nRis),
					"nRisBase": parseInt(nRisBase),
					"Nuova": 1 };
	
		if(!nPres){
			DB.ricerche.data.push(JSNPUSH); // se esiste già non la carico sul privato
			pDef=DB.ricerche.data.length-1;
		}else{
			DB.ricerche.data[nPres]=JSNPUSH;
			pDef=nPres;
		}
	
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche)).then(function(){ // salvo il DB
			LOGIN.sincronizza();
		});
		return false;
	},
	pulisciTesto: function( txt ){
		txt=txt.replace(/(<([^>]+)>)/gi, ''); // elimino i tags html
		txt=txt.replace(/&nbsp;/gi,String.fromCharCode(32)); // trasformo gli spazi
		txt=txt.replace(/ /gi, String.fromCharCode(32)); // trasformo gli spazi
		txt=txt.replace(/\-/gi, String.fromCharCode(32)); // trasformo i trattini
		txt=txt.replace(/_/gi, String.fromCharCode(32)); // trasformo i trattini
		return txt;
	},
	historyGlobal: function(){ // ???
		if(document.getElementById("schedaGlobal").classList.contains("visSch")){
			RICERCHE.nascondiGlobal(true);
			return;
		}
		if(document.getElementById("parolaGlobal").value.trim()){
			RICERCHE.apriGlobal();
		}else{
			RICERCHE.globalSubmit(true);
			RICERCHE.car_historyGlobal();
		}
		if(smartMenu && document.getElementById("scheda").classList.contains("scheda_agenda"))SCHEDA.scaricaScheda();
	},
	globalSubmit: function( passa=false ){
		let parola=document.formGlobal.parolaGlobal.value;
		if(parola.length>=3 || passa){
			RICERCHE.apriGlobal(passa);
			document.getElementById("annGlobal").style.display='inline-block';
			if(!passa){
				RICERCHE.car_global(parola);
				if(smartphone){
					if(touchable)document.getElementById("parolaGlobal").blur();
				}
			}else{
				if(parola.length==0)RICERCHE.annullaGlobal();
			}
			return false;
		}else return false;
	},
	apriGlobal: function( passa=false ){
		MENU.chiudiMenu("ricerche");
		document.getElementById("schedaGlobal").classList.add("visSch");
		if(!passa){
			if(!touchable)document.getElementById("globalTesto").style.marginTop='0px';
		}
		RICERCHE.globOp=true;
		MENU.icoSelected = document.getElementById("p_ricerca");
		MENU.icoSelected.classList.add("p_sel");
		MENU.comprimiIcone(true);
	},
	nascondiGlobal: function( forza=false ){
		if(forza)MENU.desIcona();
		document.getElementById("schedaGlobal").classList.remove("visSch");
		RICERCHE.globOp=false;
		document.getElementById("parolaGlobal").blur();
	},
	annullaGlobal: function(){
		document.getElementById("parolaGlobal").value='';
		document.getElementById("annGlobal").style.display='none';
		document.getElementById("parolaGlobal").style.cursor='';
		if(RICERCHE.globOp && !touchable)document.getElementById("parolaGlobal").focus();
		if(!touchable)document.getElementById("globalTesto").style.marginTop='0px';
		document.getElementById("globalTesto").innerHTML='<div class="noResGlob" id="noResGlob"></div>';
		document.getElementById("globalTesto").style.background='none';
		RICERCHE.car_historyGlobal();
	}
}