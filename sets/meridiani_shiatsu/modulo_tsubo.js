
var MODULO_TSUBO = { // extend SET

	TSUBO_free: [ "NK.01","NK.12","NK.13","NK.27","NK.60",
				  "LR.01","LR.02","LR.03","LR.04","LR.05","LR.06","LR.07",
				  "LR.08","LR.09","LR.10","LR.11","LR.12","LR.13","LR.14" ],
	
	note: [],
	
	caricaTsubo: function( siglaMeridiano, nTsubo, ritorno ){
		// apre la scheda di uno tsubo
		var nTsubo2 = (nTsubo+1)+"";
		if(nTsubo2.length == 1)nTsubo2 = "0"+nTsubo2;
		
		// verifico le autorizzazioni
		//if(!SET.verFreeMeridiani(siglaMeridiano)){
		if(!SET.verFreePunti(siglaMeridiano+"."+nTsubo2)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			SET.chiudiTsubo();
			return;
		}
		// --------------------------
		var titolo = DB.set.meridiani[siglaMeridiano].tsubo[nTsubo].NomeTsubo;
		var meridiano = DB.set.meridiani[siglaMeridiano];
		
		
		var coordZoom = [];
		var cartella = __(DB.mtc.meridiani[siglaMeridiano].cartella,'');
		var imgZoom = "";
		var noMoxa = "";
		var noGravidanza = "";
		
		if(__(DB.mtc.meridiani[siglaMeridiano].tsubo)){
			coordZoom = __(DB.mtc.meridiani[siglaMeridiano].tsubo[nTsubo].coordZoom);
			imgZoom = __(DB.mtc.meridiani[siglaMeridiano].tsubo[nTsubo].imgZoom);
			noMoxa = __(DB.mtc.meridiani[siglaMeridiano].tsubo[nTsubo].noMoxa,'');
			noGravidanza = __(DB.mtc.meridiani[siglaMeridiano].tsubo[nTsubo].noGravidanza,'');
		}
		
		var TS = meridiano.tsubo[nTsubo];
		var HTML = "<h1>"+htmlEntities(titolo)+"</h1>";
		var HTML_simboli = '';
		
		// noMoxa
		if(noMoxa)HTML_simboli += 	'<div style="background-image:url(sets/meridiani_shiatsu/img/nomoxa.png);"' +
										'	  class="simboliTsubo"></div>';
		
		// noGravidanza
		if(noGravidanza && globals.modello.cartella == 'donna')HTML_simboli += '<div style="background-image:url(sets/meridiani_shiatsu/img/nogravidanza.png);" class="simboliTsubo"></div>';
		
		
		if( ritorno && 
			document.getElementById("scheda_testo").innerHTML.indexOf("formMod") > -1 && 
			SCHEDA.classeAperta != "tab_tsubo" ){
				
			// pulsante per la scelta del punto su trattamenti e procedure
			var az = '';
			var txt = '';
			var cls = '';
			var stesso = false;
			var tsuboNuovo = (nTsubo+1)+"."+siglaMeridiano;
			if( SCHEDA.classeAperta == 'scheda_procedura' ){
				if(SET.pMod > -1){
					var tsuboOr = SET.dettagliProvvisori[SET.pMod].DescrizioneDettaglio;
					if( tsuboOr == tsuboNuovo)stesso = true;
					else{
						// cambia il punto
						txt = TXT("SostituisciTsubo").replace("[t]",tsuboOr);
						az = "SET.setTsuboFrm();";
					}
				}else{
					// aggiungi il punto alla procedura
					txt = TXT("AggiungiTsuboProc");
					az = "SET.aggiungiDettaglio('P','"+tsuboNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}
			}
			if( (SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B')/* && siglaMeridiano!='NK'*/){
				if(SET.pMod > -1){
					if(siglaMeridiano!='NK')pP = PAZIENTI.puntiProvvisori[SET.pMod];
					else pP = PAZIENTI.namikoshiProvvisori[SET.pMod];
					var tsuboOr = pP.n+"."+pP.m;
					if(tsuboOr == tsuboNuovo)stesso = true;
					else{
						// cambia il punto
						txt = TXT("SostituisciTsubo").replace("[t]",tsuboOr);
						az = "SET.setTsuboFrm();";
					}
				}else{
					// aggiungi il punto al trattamento
					txt = TXT("AggiungiTsuboTratt");
					if(siglaMeridiano!='NK')az = "PAZIENTI.aggiungiPuntoTrattamento('"+tsuboNuovo+"');SCHEDA.torna();";
					else az = "PAZIENTI.aggiungiNamikoshiTrattamento('"+(nTsubo*1+1)+"');SCHEDA.torna();";
					cls = 'spAdd';
				}
			}
			
			if(!stesso)HTML_simboli += 	'<div id="spSch" class="'+cls+'" onClick="'+az+'">' +
										htmlEntities(txt) +
										'</div>';
										
			else HTML_simboli += 	'<div id="spStesso">'+
									htmlEntities(TXT("TsuboSelezionato")) +
									'</div>';
		}
		if(HTML_simboli)HTML += '<div>'+HTML_simboli+'</div>';
		
		HTML += DB.set.meridiani[siglaMeridiano].tsubo[nTsubo].AzioniTsubo;
		
		// elenco le patolige incluse
		var elenco = [];
		for(let p in DB.set.patologie){
			var regexp = /[\s>\(\.\,]{0,1}[0-9]{1,2}\.[A-Z]{2}[\s<\.,\)]{1}/ig;
			var pts = DB.set.patologie[p].TestoPatologia.match(regexp);
			for(let i in pts){
				if(pts[i]=='.'+(nTsubo+1)+'.'+siglaMeridiano+'.'){
					var JSNPUSH = {"p": p, "NomePatologia": DB.set.patologie[p].NomePatologia} 
					
					if(elenco.indexOf(JSNPUSH)==-1)elenco.push(JSNPUSH);
				}
			}
		}
		if(elenco.length){
			HTML += '<div id="patologieTsubo">' +
					'	<div onClick="this.parentElement.classList.toggle(\'vis\');">'+TXT("Patologie")+'</div>';
			for(e in elenco){
				HTML += '<p onClick="SET.apriPatologia(\''+elenco[e].p+'\',document.getElementById(\'btn_patologia_'+elenco[e].p+'\'));"><span>• '+elenco[e].NomePatologia+'</span></p>';
			}
			HTML += '</div>';
		}
		
		
		imgDettaglio='';
		posPunti='';
		var wCont = 370;
		var marginLeft = 0;
		if(touchable && smartphone){
			wCont = WF()-40;
			//marginLeft = 20;
		}
		var rp = wCont/370;
		if(coordZoom.length>1){
			var pC=coordZoom.split("|");
			for(let pu in pC){
				pC2=pC[pu].split(",");
				posPunti+='<img src="sets/common/mtc/img/zoom/punto.png" width="'+parseInt(43*rp)+'" height="'+parseInt(40*rp)+'" style="position:absolute;left:'+parseInt((pC2[0]-7)*rp-marginLeft)+'px;top:'+parseInt((pC2[1]-7)*rp)+'px;">';
			}
		}
		if(imgZoom)imgDettaglio='<div style="position:relative;width:370px;"><img src="sets/common/mtc/img/zoom/'+imgZoom+'" border="0" width="370" id="imgDettTsubo">'+posPunti+'</div>';
		
		
		
		// ideogramma
		if(siglaMeridiano!='NK'){
			HTML = 	'<img 	src="sets/common/mtc/img/txt_meridiani/'+siglaMeridiano+'/tsubo_'+nTsubo2+'.png"' +
					'		class="ideogrammaTsubo">'+HTML;
		}
		
		HTML = '<div class="translatable">'+HTML+'</div>';
		
		if(siglaMeridiano!='NK')HTML += imgDettaglio;
		
		// annotazione
		var TestoAnnotazione = '';
		if(SET.verificaNota(siglaMeridiano+"."+nTsubo2)){
			TestoAnnotazione += SET.leggiNota( cartella, nTsubo2 );
		}
		HTML +=  '<p id="annotazioni_label"><b>'+htmlEntities(TXT("Note"))+'</b></p>';
		if(!ritorno || !SCHEDA.formModificato){
			// FORM
			HTML += '<div id="annotazioni_cont">' +
					'	<form 	id="formAnnotazioni" name="formAnnotazioni" method="post" onSubmit="return false;">' +
					'		<input name="stessa" type="hidden" id="stessa" value="1" />' +
					'		<input name="siglaMeridiano" type="hidden" id="siglaMeridiano" value="'+siglaMeridiano+'" />' +
					'		<input name="nTsubo" type="hidden" id="nTsubo" value="'+nTsubo+'" />' +
					'		<textarea  	id="TestoAnnotazione"' +
					'					name="TestoAnnotazione"' +
					'					onKeyDown="document.getElementById(\'pulsantiAnnotazione\').style.display=\'block\';"' +
					'					placeholder="'+TXT("Annotazioni")+'">' + TestoAnnotazione + '</textarea>' +
					'	</form>' +
					'</div>' +
					'<div id="pulsantiAnnotazione">' +
					'	<div 	id="p_sch_salva"' +
					'			onClick="if(verifica_form(document.formAnnotazioni))SET.mod_nota( \''+cartella+'\', \''+(nTsubo+1)+'\' );">' +
						TXT("Salva") +
					'	</div>' +
					'</div><div class="l"></div>';
		}else{
			if(TestoAnnotazione){
				HTML += '<div id="nTsubo" style="padding:15px;background-color:#ecdea3;">'+ TestoAnnotazione+'</div>';
			}else{
				HTML += '<div id="nTsubo" class="noResults">'+ htmlEntities(TXT("NessunaAnnotazione"))+'</div>';
			}
		}
		
		if(SCHEDA.classeAperta == 'scheda_meridiano'){
			// verifico che il meridiano aperto sia lo stesso altrimenti cambio la scheda secondaria
			if(SET.mAtt != siglaMeridiano){
				ritorno = '';
			}
		}
		
		var ptSel = SET.ptSel;
		SET.ptSel = null;
		
		var btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.meridiani_shiatsu.meridians\')">' +
							TXT("ReferenceGuide") +
						'</div>';
		
		var finalFunct = '';
		if(!ritorno || !SCHEDA.formModificato)finalFunct += 'initChangeDetection( "formAnnotazioni");';

		SCHEDA.caricaScheda(	titolo,
								HTML,
								"if(SET.ptSel)SET.chiudiTsubo()",
								"tab_tsubo",
								ritorno,
								false,
								'',
								btnAdd,
								globals.set.cartella+'_meridiani_'+siglaMeridiano+"_"+nTsubo,
								finalFunct );
		SET.convSigleScheda();
		SET.settaOverTsubo();
		SET.ptSel = ptSel;
		if(ritorno && !SCHEDA.aggancio.tipo == 'libera')SCHEDA.nasScheda();
		
		document.getElementById("frSchSu").onclick = '';
		document.getElementById("frSchGiu").onclick = '';
		
		
		var classFr = '';
		
		if(!SCHEDA.scheda2Aperta){
			var nTsuboGiu = (nTsubo)+"";
			if(nTsuboGiu.length == 1)nTsuboGiu = "0"+nTsuboGiu;
			var nTsuboSu = (nTsubo+2)+"";
			if(nTsuboSu.length == 1)nTsuboSu = "0"+nTsuboSu;
			// evidenzio i pulsanti su e giù
			
			if(nTsubo*1 > 0){ // attiva giù
				classFr += "frGiu ";
				document.getElementById("frSchGiu").onclick = function(){
					SET.apriTsubo(siglaMeridiano+"."+nTsuboGiu,'');
				};
			}
			if(nTsubo*1 < meridiano.tsubo.length-1){ // attiva su
				classFr += "frSu ";
				document.getElementById("frSchSu").onclick = function(){
					SET.apriTsubo(siglaMeridiano+"."+nTsuboSu,'');
				};
			}
		}
		document.getElementById("frSch").className = classFr;
	},
	mod_nota: function( Q_nome_meridiano, Q_p ){
		// salva la nota di uno tsubo
		var nota_salvata=false;
		var DataModifica = DB.note.lastSync+1;
		var pDef=-1;
		var Q_TestoAnnotazione = document.getElementById("TestoAnnotazione").value;
		for (p in DB.note.data) {
			if(DB.note.data.length && typeof(DB.note.data[p].meridiano)=='undefined')DB.note.data.splice(p,p);
			else if(DB.note.data[p].meridiano==Q_nome_meridiano && DB.note.data[p].numeroTsubo==Q_p && SET.verNotaCli(p)){
				DB.note.data[p].TestoAnnotazione=Q_TestoAnnotazione;
				DB.note.data[p].DataModifica=parseInt(DataModifica);
				nota_salvata=true;
				pDef=p;
			}
		}
		if(!nota_salvata && Q_TestoAnnotazione.trim()!=''){
			var idPaziente=-1;
			if(PAZIENTI.idCL>-1)idPaziente=PAZIENTI.idPaziente;
			JSNPUSH={	"TestoAnnotazione": Q_TestoAnnotazione,
						"meridiano": Q_nome_meridiano,
						"numeroTsubo": Q_p*1,
						"idPaziente": idPaziente*1,
						"idCL": PAZIENTI.idCL*1,
						"DataModifica": parseInt(DataModifica) };
			DB.note.data.push(JSNPUSH);
			pDef=DB.note.data.length-1;
		}
		
		endChangeDetection();
		SCHEDA.formModificato = false;
		applicaLoading(document.getElementById("scheda_testo"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note)).then(function(){ // salvo il DB
			LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'document.getElementById("pulsantiAnnotazione").style.display="none";' );
			SET.leggiNote();
		});
	},
	verNotaCli: function( p ){
		// verifica che ci sia una nota per il cliente attivo
		var pass=true;
		if(PAZIENTI.idCL>-1){
			pass=false;
			var idPaziente=DB.pazienti.data[PAZIENTI.idCL].idPaziente*1;
			if(idPaziente){
				if(DB.pazienti.data[PAZIENTI.idCL].Cancellato*1!=1)pass=(DB.note.data[p].idPaziente*1==idPaziente);
				else pass=false;
			}else pass=(PAZIENTI.idCL*1==DB.note.data[p].idCL*1);
		}else pass=(DB.note.data[p].idPaziente*1==-1);
		return pass;
	},
	leggiNota: function( mr, pt ){
		// restituisce il testo della nota
		var TestoAnnotazione = '';
		for(let n in DB.note.data){
			var pass =false;
			if(DB.note.data[n].idPaziente > -1){
				if(DB.note.data[n].idPaziente == PAZIENTI.idPaziente)pass=true;
			}else{
				if(DB.note.data[n].idCL == PAZIENTI.idCL)pass=true;
			}
			if(pass){
				if( DB.note.data[n].meridiano == mr && DB.note.data[n].numeroTsubo == pt ){
					TestoAnnotazione = DB.note.data[n].TestoAnnotazione;
				}
			}
		}	
		return TestoAnnotazione;
	},
	leggiNote: function(){
		// crea l'elenco delle note e le evidenzia dul modello
		SET.evidenziaNote(false);
		SET.note = [];
		if(DB.note){
			for(let n in DB.note.data){
				var pass =false;
				if(DB.note.data[n].idPaziente > -1){
					if(DB.note.data[n].idPaziente == PAZIENTI.idPaziente)pass=true;
				}else{
					if(DB.note.data[n].idCL == PAZIENTI.idCL)pass=true;
				}
				if(pass){
					var mr ='';
					var pt = DB.note.data[n].numeroTsubo + "";
					if(pt.length == 1)pt='0'+pt;
					mr = SET.leggiSiglaMeridiano(DB.note.data[n].meridiano);
					if(DB.note.data[n].TestoAnnotazione.trim()!='')SET.note.push(mr+"."+pt);
				}
			}	
		}
		SET.evidenziaNote(true);
	},
	evidenziaNote: function( az ){
		// evidenzia le note sul manichino
		for(let n in SET.note){
			var pP = SET.note[n].split(".");
			for(let m in SETS.children){
				if(SETS.children[m].name.substr(0,5) == 'PT_'+pP[0]){
					for(let p in SETS.children[m].children){
						if(SETS.children[m].children[p].name.substr(0,5)==SET.note[n]){
							var mr = SETS.children[m].children[p].name.substr(0,2);
							var mat = SET.MAT.pointBase;
							if(MERIDIANI[mr].meridianoAcceso)mat = SET.MAT.pointSel;
							if(az){
								mat = SET.MAT.pointNote;
								if(MERIDIANI[mr].meridianoAcceso)mat = SET.MAT.pointSelNote;
							}
							
							SETS.children[m].children[p].material = mat;
							SETS.children[m].children[p].userData.nota = az;
						}
					}
				}
			}
		}
	},
	verificaNota: function( n ){
		// verifica che ci sia una nota sullo tsubo
		return SET.note.indexOf(n)>-1;
	},
	leggiSiglaMeridiano: function( cartella ){
		// restituisce la sigla del meridiano
		for(let k in DB.set.meridiani){
			if(DB.mtc.meridiani[k].cartella == cartella)return k;
		}
	},
	azRicercaTsubo: function( pt ){
		// apre la scheda dello tsubo dalla ricerca globale
		SET.apriTsubo(pt);
		evidenziaParola();
	}
}