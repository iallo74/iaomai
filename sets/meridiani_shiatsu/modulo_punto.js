
var MODULO_PUNTO = { // extend SET

	PUNTI_free: [ "NK.01","NK.12","NK.13","NK.27","NK.60",
				  "LR.01","LR.02","LR.03","LR.04","LR.05","LR.06","LR.07",
				  "LR.08","LR.09","LR.10","LR.11","LR.12","LR.13","LR.14" ],
	
	note: [],
	
	caricaPunto: function( siglaMeridiano, nPunto, ritorno ){
		// apre la scheda di un punto
		
		// verifico le autorizzazioni
		let block = (!SET.verFreePunti(siglaMeridiano+"."+nPunto) ||
					(SET.PUNTI_free.indexOf(siglaMeridiano+"."+nPunto)==-1 && !SET.verAttModule()));
		if(SET.verLightVersion() && localStorage.sistemaMeridiani!='NMK')block = false
		if(	block ){
			ALERT(TXT("MsgContSoloPay"),true,true);
			SET.chiudiPunto();
			return;
		}
		// --------------------------
		var titolo = DB.set.meridiani[siglaMeridiano].punti[nPunto].NomePunto;
		var meridiano = DB.set.meridiani[siglaMeridiano];
		
		
		var coordZoom = [];
		var cartella = __(DB.mtc.meridiani[siglaMeridiano].cartella,'');
		var imgZoom = "";
		var noMoxa = "";
		var noGravidanza = "";
		
		if(__(DB.mtc.meridiani[siglaMeridiano].punti)){
			coordZoom = __(DB.mtc.meridiani[siglaMeridiano].punti[nPunto].coordZoom);
			imgZoom = __(DB.mtc.meridiani[siglaMeridiano].punti[nPunto].imgZoom);
			noMoxa = __(DB.mtc.meridiani[siglaMeridiano].punti[nPunto].noMoxa,'');
			noGravidanza = __(DB.mtc.meridiani[siglaMeridiano].punti[nPunto].noGravidanza,'');
		}
		
		var HTML = '',
			HTML_tit='';
		if(siglaMeridiano=='NK'){
			HTML_tit+= "<h1>"+htmlEntities(titolo)+"</h1>";
			cartella = 'namikoshi';
		}else{
			let pattern = /[0-9]{1,2}\.[A-Z]{2}\.\s[^\(]+\(([^\)]+)\)/g;
			HTML_tit += "<h1>"+ +nPunto +"."+siglaMeridiano+". "+htmlEntities(DB.mtc.meridiani[siglaMeridiano].punti[nPunto].pinyin)+"</h1>";
			HTML += "<h1><i>"+htmlEntities(titolo.replace(pattern,"$1"))+"</i></h1>";
		}



		var HTML_simboli = '';
		
		// noMoxa
		if(noMoxa)HTML_simboli += 	'<div style="background-image:url(sets/meridiani_shiatsu/img/nomoxa.png);"' +
										'	  class="simboliPunto"></div>';
		
		// noGravidanza
		if(noGravidanza && globals.modello.cartella == 'donna')HTML_simboli += '<div style="background-image:url(sets/meridiani_shiatsu/img/nogravidanza.png);" class="simboliPunto"></div>';
		
		
		if( ritorno && 
			document.getElementById("scheda_testo").innerHTML.indexOf("formMod") > -1 && 
			SCHEDA.classeAperta != "tab_punti" ){
				
			// pulsante per la scelta del punto su trattamenti e procedure
			var az = '';
			var txt = '';
			var cls = '';
			var stesso = false;
			var puntoNuovo = nPunto +"."+siglaMeridiano;
			if( SCHEDA.classeAperta == 'scheda_procedura' ){
				if(SET.pMod > -1){
					var puntoOr = SET.dettagliProvvisori[SET.pMod].DescrizioneDettaglio;
					if( puntoOr == puntoNuovo)stesso = true;
					else{
						// cambia il punto
						txt = TXT("SostituisciPunto").replace("[t]",puntoOr);
						az = "SET.setPuntoFrm();";
					}
				}else{
					// aggiungi il punto alla procedura
					txt = TXT("AggiungiPProc");
					az = "SET.aggiungiDettaglio('P','"+puntoNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}
			}
			if( (SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B')/* && siglaMeridiano!='NK'*/){
				if(SET.pMod > -1){
					if(siglaMeridiano!='NK')pP = PAZIENTI.puntiProvvisori[SET.pMod];
					else pP = PAZIENTI.namikoshiProvvisori[SET.pMod];
					var puntoOr = pP.n+"."+pP.m;
					if(puntoOr == puntoNuovo)stesso = true;
					else{
						// cambia il punto
						txt = TXT("SostituisciPunto").replace("[t]",puntoOr);
						az = "SET.setPuntoFrm();";
					}
				}else{
					// aggiungi il punto al trattamento
					txt = TXT("AggiungiPuntoTratt");
					if(siglaMeridiano!='NK')az = "PAZIENTI.aggiungiPuntoTrattamento('"+puntoNuovo+"');SCHEDA.torna();";
					else az = "PAZIENTI.aggiungiNamikoshiTrattamento('"+nPunto+"');SCHEDA.torna();";
					cls = 'spAdd';
				}
			}
			
			if(!stesso)HTML_simboli += 	'<div id="spSch" class="'+cls+'" onClick="'+az+'">' +
										htmlEntities(txt) +
										'</div>';
										
			else HTML_simboli += 	'<div id="spStesso">'+
									htmlEntities(TXT("PuntoSelezionato")) +
									'</div>';
		}
		if(HTML_simboli)HTML += '<div>'+HTML_simboli+'</div>';
		
		HTML += DB.set.meridiani[siglaMeridiano].punti[nPunto].AzioniPunto;
		
		let imgDettaglio='';
		// elenco le patologie incluse
		var elenco = [];
		for(let p in DB.set.patologie){
			var regexp = /[\s>\(\.\,]{0,1}[0-9]{1,2}\.[A-Z]{2}[\s<\.,\)]{1}/ig;
			var pts = DB.set.patologie[p].TestoPatologia.match(regexp);
			for(let i in pts){
				if(pts[i]=='.'+nPunto+'.'+siglaMeridiano+'.'){
					var JSNPUSH = {"p": p, "NomePatologia": DB.set.patologie[p].NomePatologia} 
					
					if(elenco.indexOf(JSNPUSH)==-1)elenco.push(JSNPUSH);
				}
			}
		}
		if(elenco.length){
			HTML += '<div id="patologiePunti">' +
					'	<div onClick="this.parentElement.classList.toggle(\'vis\');">'+TXT("Patologie")+'</div>';
			for(e in elenco){
				HTML += '<p onClick="SET.apriPatologia(\''+elenco[e].p+'\',document.getElementById(\'btn_patologia_'+elenco[e].p+'\'));"><span>• '+elenco[e].NomePatologia+'</span></p>';
			}
			HTML += '</div>';
		}
		
		posPunti='';
		var wCont = 370;
		var marginLeft = 0;
		if(touchable && smartphone){
			wCont = WF()-40;
			//marginLeft = 20;
		}
		var rp = wCont/370;
		let bluring = '';
		let onlyForPro = ''
		//if(SET.verLightVersion() && SET.PUNTI_free.indexOf(siglaMeridiano+"."+nPunto)==-1){
		if(SET.verLightVersion()){
			bluring = 'filter: blur(10px);';
			onlyForPro = '<span>Only for the PRO version</span>';
		}
		if(coordZoom.length>1){
			var pC=coordZoom.split("|");
			for(let pu in pC){
				pC2=pC[pu].split(",");
				posPunti+='<img src="sets/common/mtc/img/zoom/punto.png" width="'+parseInt(43*rp)+'" height="'+parseInt(40*rp)+'" style="position:absolute;left:'+parseInt((pC2[0]-7)*rp-marginLeft)+'px;top:'+parseInt((pC2[1]-7)*rp)+'px;'+bluring+'">';
			}
		}
		if(imgZoom){
			imgDettaglio = '<div id="cont_imgDettPunto" style="width:'+wCont+'px;"><img src="sets/common/mtc/img/zoom/'+imgZoom+'" border="0" width="'+wCont+'" id="imgDettPunto" style="'+bluring+'">'+posPunti+onlyForPro+'</div>';
		}
		
		// aggiungo contenuto custom
		HTML = CUSTOMS.addContent("meridiani_"+siglaMeridiano+"_"+nPunto,HTML);
		
		
		// ideogramma
		if(siglaMeridiano!='NK'){
			let ideogramma = '',
				ideogrammaOr = DB.mtc.meridiani[siglaMeridiano].punti[nPunto].ideogramma,
				lI = ideogrammaOr.length;
			for(let l=0;l<lI;l++){
				ideogramma += ideogrammaOr[l];
				if(l<lI-1)ideogramma += "<br>";
			}
			HTML = 	'<div class="ideogrammaPuntoChar">'+ideogramma+'</div><img src="img/speach2W.png" onClick="SET.speachName(\''+siglaMeridiano+nPunto+'\');" class="speach_icon noPrint">'+HTML;
		}
		

		HTML = '<div id="titPoint">'+HTML_tit+'</div><div class="translatable">'+HTML+'</div>';
		
		if(siglaMeridiano!='NK')HTML += imgDettaglio;
		
		// annotazione
		var TestoAnnotazione = '',
			hidePunto;
		if(SET.verificaNota(siglaMeridiano+"."+nPunto)){
			TestoAnnotazione = SET.leggiNota( cartella, +nPunto );
		}
		HTML +=  '<p id="annotazioni_label"><b>'+htmlEntities(TXT("Note"))+'</b></p>';
		if(!ritorno || !SCHEDA.formModificato){
			// FORM
			HTML += '<div id="annotazioni_cont">' +
					'	<form 	id="formAnnotazioni" name="formAnnotazioni" method="post" onSubmit="return false;">' +
					'		<input name="stessa" type="hidden" id="stessa" value="1" />' +
					'		<input name="siglaMeridiano" type="hidden" id="siglaMeridiano" value="'+siglaMeridiano+'" />' +
					'		<input name="nPunto" type="hidden" id="nPunto" value="'+nPunto+'" />' +
					'		<textarea  	id="TestoAnnotazione"' +
					'					name="TestoAnnotazione"' +
					'					onKeyDown="document.getElementById(\'pulsantiAnnotazione\').style.display=\'block\';"' +
					'					placeholder="'+TXT("Annotazioni")+'">' + TestoAnnotazione + '</textarea>' +
					'	</form>' +
					'</div>' +
					'<div id="pulsantiAnnotazione">' +
					'	<div 	id="p_sch_salva"' +
					'			onClick="if(verifica_form(document.formAnnotazioni))SET.mod_nota( \''+cartella+'\', \''+(+nPunto)+'\' );">' +
						TXT("Salva") +
					'	</div>' +
					'</div><div class="l"></div>';
		}else{
			if(TestoAnnotazione){
				HTML += '<div id="nPunto" style="padding:15px;background-color:#ecdea3;">'+ TestoAnnotazione+'</div>';
			}else{
				HTML += '<div id="nPunto" class="noResults">'+ htmlEntities(TXT("NessunaAnnotazione"))+'</div>';
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
								"if(SET.ptSel)SET.chiudiPunto()",
								"tab_punti",
								ritorno,
								false,
								'',
								btnAdd,
								globals.set.cartella+'_meridiani_'+siglaMeridiano+"_"+nPunto,
								finalFunct );
								
		SET.convSigleScheda();
		SET.settaOverPunto();
		SET.ptSel = ptSel;
		if(ritorno && !SCHEDA.aggancio.tipo == 'libera')SCHEDA.nasScheda();
		

		// gestione e visualizzazione delle frecce di navigazione
		document.getElementById("frSchSu").onclick = '';
		document.getElementById("frSchGiu").onclick = '';
		var classFr = '';
		if(!SCHEDA.scheda2Aperta && localStorage.sistemaMeridiani!='MAS'){
			let totPunti = 0,
				nPuntoSu = '',
				nPuntoGiu = '',
				gruppoSu = '',
				gruppoGiu = '',
				puntoSu = '',
				puntoGiu = '';
			
			if(siglaMeridiano!='NK'){
				totPunti = Object.keys(meridiano.punti).length;
				nPuntoGiu = SET.ptToStr(+nPunto - 1);
				nPuntoSu = SET.ptToStr(+nPunto +1 );
				if(+nPuntoGiu==0)nPuntoGiu='';
				if(+nPuntoSu>totPunti)nPuntoSu='';
			}else{
				let els = document.getElementById("e_NK").getElementsByTagName("a");
				totPunti = els.length;
				for(let e=0;e<totPunti;e++){
					if(els[e].id == SET.btnSel.id){
						if(e>0){
							puntoGiu = els[e-1];
							let pP = puntoGiu.id.split("_");
							nPuntoGiu = pP[1];
							if(pP[3])gruppoGiu = pP[3];
						}
						if(e<totPunti-1){
							puntoSu = els[e+1];
							let pP = puntoSu.id.split("_");
							nPuntoSu = pP[1];
							if(pP[3])gruppoSu = pP[3];
						}
					}
				}
			}
			if(nPuntoGiu){ // attiva giù
				classFr += "frGiu ";
				document.getElementById("frSchGiu").onclick = function(){
					SET.apriPunto(siglaMeridiano+"."+nPuntoGiu,'','',gruppoGiu,puntoGiu);
				};
			}
			if(nPuntoSu){ // attiva su
				classFr += "frSu ";
				document.getElementById("frSchSu").onclick = function(){
					SET.apriPunto(siglaMeridiano+"."+nPuntoSu,'','',gruppoSu,puntoSu);
				};
			}
		}
		document.getElementById("frSch").className = classFr;
	},
	mod_nota: function( Q_nome_meridiano, Q_p ){
		// salva la nota di un punto
		var nota_salvata=false;
		var DataModifica = DB.note.lastSync+1;
		var pDef=-1;
		var Q_TestoAnnotazione = document.getElementById("TestoAnnotazione").value;
		for (p in DB.note.data) {
			if(DB.note.data.length && typeof(DB.note.data[p].meridiano)=='undefined')DB.note.data.splice(p,p);
			else if(DB.note.data[p].meridiano==Q_nome_meridiano && DB.note.data[p].numeroPunto==Q_p && SET.verNotaCli(p)){
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
						"numeroPunto": Q_p*1,
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
				if( DB.note.data[n].meridiano == mr && DB.note.data[n].numeroPunto == pt ){
					TestoAnnotazione = DB.note.data[n].TestoAnnotazione;
					hidePunto = DB.note.data[n].hidePunto;
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
					var pt = DB.note.data[n].numeroPunto + "";
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
		// verifica che ci sia una nota sul punto
		return SET.note.indexOf(n)>-1;
	},
	leggiSiglaMeridiano: function( cartella ){
		// restituisce la sigla del meridiano
		for(let k in DB.set.meridiani){
			if(DB.mtc.meridiani[k].cartella == cartella)return k;
		}
	},
	ptToStr: function( nPunto ){
		nPunto = nPunto+"";
		if(nPunto.length == 1)nPunto = "0"+nPunto;
		return nPunto;
	},
	splitPoint: function( siglaPunto ){
		let pP = siglaPunto.split("."),
			el = {
				nPunto: '',
				siglaMeridiano: '',
				valutazione: '',
				pinyin: '',
				gruppo: ''
			};
		Filtro = /[0-9]{1,2}/;
		if (Filtro.test(pP[0]))el.nPunto = pP[0];
		if (Filtro.test(pP[1]))el.nPunto = pP[1];
		if(el.nPunto.length == 1)el.nPunto = "0"+el.nPunto;
		Filtro = /[A-Z]{2}/;
		if (Filtro.test(pP[0]))el.siglaMeridiano = pP[0];
		if (Filtro.test(pP[1]))el.siglaMeridiano = pP[1];
		if(el.siglaMeridiano=='AR')el.siglaMeridiano='NK';
		let contr = __(pP[2],'');
		Filtro = /[a-z]{1,2}}/;
		if(contr!='*')el.valutazione = contr;
		else if(Filtro.test(contr))el.gruppo = contr;
		else el.pinyin = DB.mtc.meridiani[el.siglaMeridiano].punti[el.nPunto].pinyin;
		return el;
	},
	speachName: function( txt ){
		if(	SET.snd &&
			SET.snd.currentTime > 0 &&
			!SET.snd.paused && 
			!SET.snd.ended &&
			SET.snd.readyState > 2)return;
		//if((SET.verLightVersion() || !LOGIN.logedin()) && SET.MERIDIANI_free.indexOf(txt.substr(0,2))==-1)txt='onlyPRO';
		if(SET.verLightVersion() || (!LOGIN.logedin() && SET.MERIDIANI_free.indexOf(txt.substr(0,2))==-1))txt='onlyPRO';
		SET.snd = new Audio("sets/common/mtc/audio/"+txt+".mp3");
		SET.snd.play();
	},
	azRicercaPunto: function( pt ){
		// apre la scheda del punto dalla ricerca globale
		let k = pt.split(".")[0];
		let funct = "SET.apriPunto('"+pt+"');evidenziaParola();RICERCHE.nascondiGlobal(true);";
		if(k=='NK' && localStorage.sistemaMeridiani!='NMK')SET.cambiaSistema('NMK',true,true,funct);
		else if(k!='NK' && localStorage.sistemaMeridiani!='')SET.cambiaSistema('',true,true,funct);
		else eval(funct); // lasciare qui
	}
}