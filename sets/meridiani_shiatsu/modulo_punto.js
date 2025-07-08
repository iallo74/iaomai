
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
		if(SET.verLightVersion())block = false;
		if(	block ){
			if(SET.verLicenses())ALERT(TXT("MsgContSoloLicensed"),false,false,true);
			else ALERT(TXT("MsgContSoloPay"),true,true);
			SET.chiudiPunto();
			return;
		}
		// --------------------------
		let titolo = DB.set.meridiani[siglaMeridiano].punti[nPunto].NomePunto,
			meridiano = DB.set.meridiani[siglaMeridiano],
			coordZoom = [],
			cartella = __(DB.mtc.meridiani[siglaMeridiano].cartella,''),
			imgZoom = "",
			noMoxa = "",
			noGravidanza = "";
		
		if(__(DB.mtc.meridiani[siglaMeridiano].punti)){
			coordZoom = __(DB.mtc.meridiani[siglaMeridiano].punti[nPunto].coordZoom);
			imgZoom = __(DB.mtc.meridiani[siglaMeridiano].punti[nPunto].imgZoom);
			noMoxa = __(DB.mtc.meridiani[siglaMeridiano].punti[nPunto].noMoxa,'');
			noGravidanza = __(DB.mtc.meridiani[siglaMeridiano].punti[nPunto].noGravidanza,'');
		}
		
		let HTML = '',
			HTML_tit='';
		if(siglaMeridiano=='NK'){
			HTML_tit+= "<h1>"+htmlEntities(titolo)+"</h1>";
			cartella = 'namikoshi';
		}else{
			let pattern = /[0-9]{1,2}\.[A-Z]{2}\.\s[^\(]+\(([^\)]+)\)/g;
			HTML_tit += "<h1>"+ +nPunto +"."+siglaMeridiano+". "+htmlEntities(DB.mtc.meridiani[siglaMeridiano].punti[nPunto].pinyin)+"</h1>";
			HTML += "<h1><i";
			//aggiunto per un bug strano su android compilata
			if(android && smartMenu && !onlineVersion)HTML += ' style="font-size:inherit !important;"';
			HTML += ">"+htmlEntities(titolo.replace(pattern,"$1"))+"</i></h1>";
		}
		if(SET.blur)titolo = titolo.replace(/\((.*?)\)/, (_, p1) => '');


		let HTML_simboli = '';
		
		// noMoxa
		if(noMoxa)HTML_simboli += 	'<div style="background-image:url(sets/meridiani_shiatsu/img/nomoxa.png);"' +
										'	  class="simboliPunto"></div>';
		
		// noGravidanza
		if(noGravidanza && globals.modello.cartella == 'donna')HTML_simboli += '<div style="background-image:url(sets/meridiani_shiatsu/img/nogravidanza.png);" class="simboliPunto"></div>';
		
		
		if( ritorno && 
			document.getElementById("scheda_testo").innerHTML.indexOf("formMod") > -1 && 
			SCHEDA.classeAperta != "tab_punti" ){
				
			// pulsante per la scelta del punto su trattamenti e procedure
			let az = '',
				txt = '',
				cls = '',
				stesso = false,
				puntoNuovo = nPunto +"."+siglaMeridiano;
			if( SCHEDA.classeAperta == 'scheda_procedura' ){
				if(SET.pMod > -1){
					let puntoOr = SET.dettagliProvvisori[SET.pMod].DescrizioneDettaglio;
					puntoOr = +puntoOr.split(".")[0]+"."+puntoOr.split(".")[1];
					if(puntoOr == puntoNuovo)stesso = true;
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
			if( (SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B')){
				if(SET.pMod > -1){
					if(siglaMeridiano!='NK')pP = PAZIENTI.puntiProvvisori[SET.pMod];
					else pP = PAZIENTI.namikoshiProvvisori[SET.pMod];
					let puntoOr = +pP.n+"."+pP.m;
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
		if(HTML_simboli)HTML += '<div class="cont_simboliPunto">'+HTML_simboli+'</div>';
		
		HTML += DB.set.meridiani[siglaMeridiano].punti[nPunto].AzioniPunto;
		
		let imgDettaglio='';
		// elenco le patologie incluse
		let elenco = [];
		for(let p in DB.set.patologie){
			let regexp = /[\s>\(\.\,]{0,1}[0-9]{1,2}\.[A-Z]{2}[\s<\.,\)]{1}/ig,
				pts = DB.set.patologie[p].TestoPatologia.match(regexp);
			for(let i in pts){
				if(pts[i]=='.'+nPunto+'.'+siglaMeridiano+'.'){
					let JSNPUSH = {
							"p": p,
							"NomePatologia": DB.set.patologie[p].NomePatologia
						};
					if(elenco.indexOf(JSNPUSH)==-1)elenco.push(JSNPUSH);
				}
			}
		}
		if(elenco.length){
			HTML += '<div id="patologiePunti">' +
					'	<div onClick="this.parentElement.classList.toggle(\'vis\');">'+TXT("Patologie")+'</div>';
			for(let e in elenco){
				HTML += '<p onClick="SET.apriPatologia(\''+elenco[e].p+'\',document.getElementById(\'btn_patologia_'+elenco[e].p+'\'));"><span>• '+elenco[e].NomePatologia+'</span></p>';
			}
			HTML += '</div>';
		}



		imgDettaglio='';
		pointsPositions = [];
		let wCont = 370;
		if(touchable && smartphone){
			wCont = WF()-40;
		}
		let bluring = '',
			addNo = '';
		if(coordZoom.length>1){
			let pC=coordZoom.split("|");
			for(let pu in pC){
				pC2=pC[pu].split(",");
				pointsPositions.push({
					x: parseInt((pC2[0]-7)),
					y: parseInt((pC2[1]-7))
				})
			}
		}
		if(imgZoom){
			imgDettaglio='<div id="cont_imgDettPunto" style="width:'+wCont+'px;"><img border="0" width="'+wCont+'" id="imgDettPunto" style="'+bluring+'"'+addNo+'></div>';
			SET.overlayImages(imgZoom.split(".")[0], pointsPositions,SET.blur);
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
			HTML_ideo = '<div class="ideogrammaPuntoChar" style="';

			//aggiunto per un bug strano su android compilata
			if(android && smartMenu && !onlineVersion)HTML_ideo += 'font-size: 40px !important;line-height:40px !important;';
			if(SET.blur)HTML_ideo += 'filter:blur(5px);cursor:default;';
			HTML_ideo += '"';

			HTML_ideo += '>'+ideogramma+'</div><img src="img/speach2W.png"';
			if(!SET.blur)HTML_ideo += ' onClick="SET.speachName(\''+siglaMeridiano+nPunto+'\');"';
			HTML_ideo += ' class="speach_icon noPrint">';
			HTML = HTML_ideo+HTML;
		}
		

		HTML = '<div id="titPoint">'+HTML_tit+'</div><div class="translatable">'+HTML+'</div>';
		
		if(siglaMeridiano!='NK')HTML += imgDettaglio;
		
		// annotazione
		let TestoAnnotazione = '',
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
					'					onFocus="H.focusTextarea();"' +
					'					onBlur="H.blurTextarea();"' +
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
		
		let ptSel = SET.ptSel;
		SET.ptSel = null;
		
		let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.meridiani_shiatsu.meridians\')">' +
							TXT("ReferenceGuide") +
						'</div>';
		
		let finalFunct = '';
		if(!ritorno || !SCHEDA.formModificato)finalFunct += 'initChangeDetection( "formAnnotazioni");';

		SCHEDA.caricaScheda(	titolo,
								HTML,
								"SWIPE.dismis();if(SET.ptSel)SET.chiudiPunto();",
								"tab_punti",
								ritorno,
								false,
								'',
								btnAdd,
								globals.set.cartella+'_meridiani_'+siglaMeridiano+"_"+nPunto,
								finalFunct );
						
		SCHEDA.gestVisAnatomia(true);		
		SET.convSigleScheda();
		SET.settaOverPunto();
		SET.ptSel = ptSel;
		if(ritorno && !SCHEDA.aggancio.tipo == 'libera')SCHEDA.nasScheda();

		// gestione e visualizzazione delle frecce di navigazione
		document.getElementById("frSchSu").onclick = '';
		document.getElementById("frSchGiu").onclick = '';
		let classFr = '';
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
			let swFnSu = '',
				swFnGiu = '';
			if(nPuntoGiu){ // attiva giù
				classFr += "frGiu ";
				document.getElementById("frSchGiu").onclick = function(){
					SET.apriPunto(siglaMeridiano+"."+nPuntoGiu,'','',gruppoGiu,puntoGiu);
				};
				swFnGiu = 'SET.apriPunto(\''+siglaMeridiano+"."+nPuntoGiu+'\',\'\',\'\',\''+gruppoGiu+'\',document.getElementById(\''+puntoGiu.id+'\'));';
			}
			if(nPuntoSu){ // attiva su
				classFr += "frSu ";
				document.getElementById("frSchSu").onclick = function(){
					SET.apriPunto(siglaMeridiano+"."+nPuntoSu,'','',gruppoSu,puntoSu);
				};
				swFnSu = 'SET.apriPunto(\''+siglaMeridiano+"."+nPuntoSu+'\',\'\',\'\',\''+gruppoSu+'\',document.getElementById(\''+puntoSu.id+'\'));';
			}
			SWIPE.init(	'scheda_testo',
						'scheda_stampa',
						swFnGiu,
						swFnSu,
						'',//'document.getElementById(\'scheda_back\').click();',
						'document.getElementsByClassName("scheda_stampa")[0].getBoundingClientRect().y==document.getElementById("scheda_testo").getBoundingClientRect().y');
		}
		document.getElementById("frSch").className = classFr;
		if(SET.blur){
			SCHEDA.addSblocca(	[document.getElementsByClassName("ideogrammaPuntoChar")[0]],
								[/* 'h1' */] );
		}
	},
	overlayImages: function(bgSrc, overlayPoints, blur = false) {
		// Crea un elemento canvas
		const canvasDett = document.createElement("canvas");
		const ctx = canvasDett.getContext("2d");
	
		const backgroundImage = new Image();
		backgroundImage.src = "data:image/png;base64," + zoom_imgs[bgSrc];
	
		backgroundImage.onload = function () {
			// Imposta le dimensioni del canvas in base all'immagine di sfondo
			canvasDett.width = 370;
			const aspectRatio = backgroundImage.width / backgroundImage.height;
			canvasDett.height = canvasDett.width / aspectRatio;
			if(blur){
				let blurAmount = 15;
				ctx.filter = "blur("+blurAmount+"px)";
				const safeWidth = canvasDett.width - (blurAmount * 3);
				const safeHeight = canvasDett.height - (blurAmount * 3);
				const offsetX = (canvasDett.width - safeWidth) / 2;
				const offsetY = (canvasDett.height - safeHeight) / 2;
				ctx.drawImage(backgroundImage, offsetX, offsetY, safeWidth, safeHeight);
				ctx.filter = "none";
			}else{
				ctx.drawImage(backgroundImage, 0, 0, canvasDett.width, canvasDett.height);
			}
			// Caricare e posizionare ogni overlay
			let loadedImages = 0;
			overlayPoints.forEach(point => {
				const overlayImage = new Image();
				overlayImage.src = "data:image/png;base64," + zoom_imgs.punto;
	
				overlayImage.onload = function () {

					if(blur)ctx.filter = "blur(10px)";
					if(!blur)ctx.drawImage(overlayImage, point.x, point.y, 43, 40);
					if(blur)ctx.filter = "none";
	
					// Assicurati che tutti i punti siano caricati prima di esportare l'immagine
					loadedImages++;
					if (loadedImages === overlayPoints.length) {
						const base64Image = canvasDett.toDataURL("image/jpg", 1);
						document.getElementById("imgDettPunto").src = base64Image;
					}
				};
			});
		};
	},
	mod_nota: function( Q_nome_meridiano, Q_p ){
		// verifico le autorizzazioni
		if(SET.blur){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		// salva la nota di un punto
		let nota_salvata = false,
			DataModifica = DB.note.lastSync+1,
			pDef = -1,
			Q_TestoAnnotazione = document.getElementById("TestoAnnotazione").value;
		for (p in DB.note.data) {
			if(DB.note.data.length && typeof(DB.note.data[p].meridiano)=='undefined')DB.note.data.splice(p,p);
			else if(DB.note.data[p].meridiano==Q_nome_meridiano && +DB.note.data[p].numeroPunto==Q_p && SET.verNotaCli(p)){
				DB.note.data[p].TestoAnnotazione=Q_TestoAnnotazione;
				DB.note.data[p].DataModifica=parseInt(DataModifica);
				nota_salvata=true;
				pDef=p;
			}
		}
		if(!nota_salvata){
			let idPaziente = -1;
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
			SYNCRO.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'document.getElementById("pulsantiAnnotazione").style.display="none";' );
			SET.leggiNote();
		});
	},
	verNotaCli: function( p ){
		// verifica che ci sia una nota per il cliente attivo
		let pass = true;
		if(PAZIENTI.idCL>-1){
			pass=false;
			let idPaziente=DB.pazienti.data[PAZIENTI.idCL].idPaziente*1;
			if(idPaziente){
				if(DB.pazienti.data[PAZIENTI.idCL].Cancellato*1!=1)pass=(DB.note.data[p].idPaziente*1==idPaziente);
				else pass=false;
			}else pass=(PAZIENTI.idCL*1==DB.note.data[p].idCL*1);
		}else pass=(DB.note.data[p].idPaziente*1==-1);
		return pass;
	},
	leggiNota: function( mr, pt ){
		// restituisce il testo della nota
		let TestoAnnotazione = '';
		for(let n in DB.note.data){
			let pass = false;
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
				let pass = false;
				if(DB.note.data[n].idPaziente > -1){
					if(DB.note.data[n].idPaziente == PAZIENTI.idPaziente)pass=true;
				}else{
					if(DB.note.data[n].idCL == PAZIENTI.idCL)pass=true;
				}
				if(pass){
					let mr = '',
						pt = DB.note.data[n].numeroPunto + "";
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
			let pP = SET.note[n].split(".");
			for(let m in SETS.children){
				if(SETS.children[m].name.substr(0,5) == 'PT_'+pP[0]){
					for(let p in SETS.children[m].children){
						if(SETS.children[m].children[p].name.substr(0,5)==SET.note[n]){
							let mr = SETS.children[m].children[p].name.substr(0,2),
								mat = SET.MAT.pointBase;
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
			},
			Filtro;
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
		if(SET.verLightVersion() || (!LOGIN.logedin() && SET.MERIDIANI_free.indexOf(txt.substr(0,2))==-1)){
			if(SET.verLicenses())ALERT(TXT("MsgContSoloLicensed"),false,false,true);
			else ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
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