var PAZIENTI_SETS = { // extend PAZIENTI
	/*
	Funzioni per importare punti, aree e meridiani dai vari sets
	
	*/
	
	mezzi: {
		"": TXT("Mezzo"),
		"ago": TXT("MezzoAgo"),
		"moxa": TXT("MezzoMoxa"),
		"coppetta": TXT("MezzoCoppetta"),
		"diapason": TXT("MezzoDiapason"),
		"luce": TXT("MezzoLuce"),
		"dito": TXT("MezzoDito"),
		"pauper": TXT("MezzoPauper"),
		"seme_vaccaria": TXT("MezzoSemeVaccaria"),
		"sferetta_metallica": TXT("MezzoSferettaMetallica"),
		"elettro_agopuntura": TXT("MezzoElettroAgopuntura"),
		"ago_semipermanente": TXT("MezzoAgoSemipermanente"),
		"crio": TXT("MezzoCrio"),
		"salasso": TXT("MezzoSalasso"),
		"infiltrazione": TXT("MezzoInfiltrazione")
	},
	mezziSet: {
		P: ['', 
			'ago', 
			'moxa', 
			'coppetta', 
			'diapason', 
			'luce', ,
			"elettro_agopuntura",
			"infiltrazione",
			'dito' ],
		N: ['',
			'moxa', 
			'coppetta', 
			'diapason', 
			'luce', ,
			'dito' ],
		A: ["",
			"ago",
			"moxa",
			"luce",
			"dito",
			"pauper",
			"seme_vaccaria",
			"sferetta_metallica",
			"elettro_agopuntura",
			"ago_semipermanente",
			"crio",
			"salasso",
			"infiltrazione" ],
		R: ["",
			"dito",
			"moxa",
			"pauper" ],
		O: ["",
			"dito",
			"moxa",
			"pauper" ],
		M: []
	},
	mezzoProvvisorio: '',
	elencoGruppoPunti: {},
	elencoGruppoAtt: {},
	tipoGruppo: '', // M (meridiani) - P (punti) - A (auricolo-punti) - R (zone-reflessologia-plantare) - T (trigger-points)
	
	// punti
	modNumPunti: function( frm, n ){ // al cambio di punti o meridiano
		let mr=document[frm]["mr_"+n];
		if(typeof(DB.set.meridiani[mr.value])!='undefined'){
			let punto=document[frm]["pt_"+n],
				preVal = punto.selectedIndex,
				maxL=punto.options.length,
				mrProc=new Array();
			for(a=maxL;a>=0;a--){
				punto.options[a]=null;
			}
			for(let k in DB.set.meridiani){
				mrProc[k]=Object.keys(DB.set.meridiani[k].punti).length;
			}
			for(a=mrProc[mr.value];a>=1;a--){
				punto.options[a]=new Option('',encodeURIComponent(SET.ptToStr(a)),false,false);
				let siglaPunto = a;
				if(DB.set.meridiani[mr.value].punti[SET.ptToStr(a)].siglaPunto){
					siglaPunto = DB.set.meridiani[mr.value].punti[SET.ptToStr(a)].siglaPunto;
					siglaPunto = siglaPunto.substr(3,siglaPunto.length-3);
				}
				punto.options[a].innerHTML=siglaPunto;
			}
			punto.options[0]=null;
			if(mr.options[0].value=='')mr.options[0]=null;
			punto.selectedIndex = preVal;
			document.getElementById("ico_vis"+n).style.display="inline";
		}
		PAZIENTI.ricGroup(frm,n);
	},
	ricGroup: function( frm, n, addN='' ){
		SET.delAllEviPalls("Over");
		let mr=document[frm][addN+"mr_"+n].value,
			pt=document[frm][addN+"pt_"+n].value,
			de=document[frm][addN+"de_"+n].value;
		if(DB.set.meridiani[mr]){
			let siglaPunto = __(DB.set.meridiani[mr].punti[SET.ptToStr(pt)]?.siglaPunto, pt+"."+mr);
			document[frm][addN+"hd_"+n].value=siglaPunto;
		}
		
		/* let hd=document[frm][addN+"hd_"+n].value; */
		let elenco = [];
		for(let p in PAZIENTI.puntiProvvisori){
			if(p == n){
				PAZIENTI.puntiProvvisori[p].n = pt;
				PAZIENTI.puntiProvvisori[p].m = mr;
				PAZIENTI.puntiProvvisori[p].t = de;
				PAZIENTI.puntiProvvisori[p].s = siglaPunto;
			}
			elenco.push(PAZIENTI.puntiProvvisori[p].n+'.'+PAZIENTI.puntiProvvisori[p].m+'.'+PAZIENTI.puntiProvvisori[p].e);
		}
		
		try{
			//startAnimate();
			SET.evidenziaPuntoMod(elenco);
			//stopAnimate(true);
		}catch(err){}
	},
	selMezzo: function( n, tipo, isProc=false ){
		let html = '',
			mzs = PAZIENTI.mezziSet[tipo];
		for(let m in mzs){
			html += '<span style="background-image:url(img/mezzo_'+mzs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambia'+tipo+'Z('+n+',\''+mzs[m]+'\','+isProc+');"' +
					'	   title="'+htmlEntities(PAZIENTI.mezzi[mzs[m]])+'">' +
					(smartMenu ? htmlEntities(PAZIENTI.mezzi[mzs[m]]).toUpperCase() : '') +
					'</span>';
		}
		H.selTT(n,((tipo=='N' && !isProc)?"n-":"")+"ico_PZ",html);
	},
	
	caricaPuntiTrattamento: function( ev = -1 ){ // carica i punti del trattamento
		document.getElementById('puntiMTC').style.display = 'block';
		document.getElementById('label_puntiMTC').style.display = 'block';
		let elenco = [],
			HTML = '<div></div>', // serve lasciarlo per il drag&drop
			HTML_noMod = '';
		
		if(PAZIENTI.puntiProvvisori.length){
			if( globals.set.cartella == 'meridiani_cinesi' || 
				(globals.set.cartella == 'meridiani_shiatsu' && LOGIN.verModule("CIN")) ){
				for(let p in PAZIENTI.puntiProvvisori){
					nPunto=SET.ptToStr(PAZIENTI.puntiProvvisori[p].n);
					siglaMeridiano=PAZIENTI.puntiProvvisori[p].m;
					valutazione=__(PAZIENTI.puntiProvvisori[p].e);
					mezzo=__(PAZIENTI.puntiProvvisori[p].z);
					descrizione=__(PAZIENTI.puntiProvvisori[p].t);
					siglaPunto=__(PAZIENTI.puntiProvvisori[p].s);
					if(!siglaPunto)siglaPunto = nPunto+'.'+siglaMeridiano;
					
					elenco.push(nPunto+'.'+siglaMeridiano+'.'+valutazione);
					
					totPunti=0;
					HTML += '<div class="rgProcMod rgMod dettPunto'+((ev==p)?' eviPunto':'')+'"' +
							'	  id="rg_'+p+'"';
					if(mouseDetect)HTML += 	' onMouseOver="SET.overPunto(this,true);"' +
											' onMouseOut="SET.overPunto(this,false);"';
					HTML += '><div class="grabElement"' +
							'	   data-drag-class="lbPunto"' +
							'	   data-drag-family="punto"' +
							'	   data-drag-type="move">' +
							
							'	<div class="grabBtn"' +
							'	     onMouseDown="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaPunto\');"' +
							'	     onTouchStart="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaPunto\');"></div>' +
							
							'	<img src="img/ico_cestino.png"' +
							'		 width="16"' +
							'		 height="16"' +
							'		 align="absmiddle"' +
							'		 id="ico_vis'+p+'"' +
							'		 title="'+TXT("DelDett")+'"' +
							'		 onClick="PAZIENTI.eliminaPuntoTrattamento('+p+')"' +
							'		 class="cestino">';
					
					// mezzo
					let addMezzoTit = '';
					if(mezzo)addMezzoTit = ': '+PAZIENTI.mezzi[mezzo];
					HTML += '	<span id="ico_PZ'+p+'"' +
							'	      class="mezzoPunto"' +
							'	      onClick="PAZIENTI.selMezzo('+p+',\'P\');">' +
							'		<img src="img/mezzo_'+mezzo+'.png"' +
							'	  	     width="20"' +
							'	  	     height="20"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PZDett"))+'"'+
							'	  	     class="occhio valEn"> ' +
							'	</span>';
							
					
					
					// siglaPunto (.s in puntiProvvisori)
					HTML += '<input type="hidden" id="hd_'+p+'" name="hd_'+p+'" value="'+siglaPunto+'">';
					
					// verifico che esista il meridiano (es. EX su ShiatsuMap)
					//if(typeof(DB.set.meridiani[siglaMeridiano])=='undefined'){
					if(siglaMeridiano=='EX' && globals.set.cartella=='meridiani_shiatsu'){
						HTML += '<span class="ptNo">'+siglaPunto+'</span>' +
								'<input type="hidden" id="mr_'+p+'" name="mr_'+p+'" value="'+siglaMeridiano+'">' +
								'<input type="hidden" id="pt_'+p+'" name="pt_'+p+'" value="'+nPunto+'">';
					}else{
						// meridiano
						HTML += '	<select name="mr_'+p+'"' +
								'	     	 id="mr_'+p+'"' +
								'	     	 onChange="this.blur();' +
								'	     	 		   PAZIENTI.modNumPunti(\'formMod\','+p+');"' +
								'	     	 class="selectTratt">' +
								'<option value="">' +
								'</option>';
						for(let k in DB.set.meridiani){
							if((k!='EX' && k!='NK') || globals.set.cartella=='meridiani_cinesi'){
								HTML+='<option value="'+k+'"';
								if(siglaMeridiano==k){
									HTML+=' SELECTED';
									totPunti= Object.keys(DB.set.meridiani[k].punti).length;
								}
								HTML+=	'>'+SET.convSigla(k) +
										'</option>';
							}
						}
						HTML += '	</select>';
						
						// punto
						HTML +=	'	<select class="numPoints"' +
								'	     	 name="pt_'+p+'"' +
								'	     	 id="pt_'+p+'"' +
								'	     	 onChange="this.blur();' +
								'	     	 		   SCHEDA.formModificato=true;' +
								'	     	 		   PAZIENTI.ricGroup(\'formMod\','+p+');">';
					
						let myObj = DB.set.meridiani[siglaMeridiano].punti,
							keys = 	Object.keys(myObj),
							len = keys.length;
						keys.sort();		
						for (let i=0; i<len; i++) {	
							let s = keys[i],
								siglaPunto = +s;
							/* let TS = DB.set.meridiani[siglaMeridiano].punti[s]; */
							 
							if(DB.set.meridiani[siglaMeridiano].punti[s].siglaPunto){
								siglaPunto = DB.set.meridiani[siglaMeridiano].punti[s].siglaPunto;
								siglaPunto = siglaPunto.substr(3,siglaPunto.length-3);
							}
							HTML += '<option value="'+s+'"';
							if(nPunto==s)HTML += ' SELECTED';
							HTML += '>'+siglaPunto+'</option>';
						}
						HTML += '	</select>';
					
						// icona visualizzazione
						HTML += '	<img src="img/ico_vedi.png"' +
								'	     width="16"' +
								'	     height="16"' +
								'	     align="absmiddle"' +
								'	     id="ico_vis'+p+'"' +
								'	     style="';
						if(siglaMeridiano=='')HTML += '		display:none;';
						HTML += '				margin-left:5px;' +
								'				margin-right:7px;' +
								'				margin-top: -4px;' +
								'				cursor:pointer;"' +
								'		 class="occhio"' +
								'		 title="'+htmlEntities(TXT("VisualizzaPunto"))+'"' +
								'		 onClick="SET.selPuntoMod('+p+');">';
					}
					
					
					
					
					// valutazione energetica
					HTML += '	<span id="ico_PV'+p+'"' +
							'	      class="valPunto"' +
							'	      onClick="PAZIENTI.selPV('+p+');">'+
							'		<img src="img/ico_PV'+valutazione+'.png"' +
							'	  	     width="16"' +
							'	  	     height="16"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PVDett"))+'"' +
							'	  	     class="occhio valEn"> ' +
							'	</span>';
					
					HTML += '<input id="de_'+p+'"' +
							' 		name="de_'+p+'"' +
							' 		class="textPuntoTratt okPlaceHolder"' +
							' 		value="'+htmlEntities(descrizione)+'"' +
							' 		placeholder="'+htmlEntities(TXT("SpiegazionePuntoTratt"))+'"' +
							'		onBlur="PAZIENTI.modNumPunti(\'formMod\','+p+');"'+H.noAutoGen+'>';
					HTML += '</div></div>';
				}
				HTML +=	'<div style="clear:both;height:1px;"></div>';
			}else{
				for(let p in PAZIENTI.puntiProvvisori){
					nPunto=PAZIENTI.puntiProvvisori[p].n;
					siglaMeridiano=PAZIENTI.puntiProvvisori[p].m;
					valutazione=__(PAZIENTI.puntiProvvisori[p].e);
					mezzo=__(PAZIENTI.puntiProvvisori[p].z);
					descrizione=__(PAZIENTI.puntiProvvisori[p].t);
					siglaPunto=__(PAZIENTI.puntiProvvisori[p].s);
					if(!siglaPunto)siglaPunto = nPunto+'.'+siglaMeridiano;
					elenco.push(nPunto+'.'+siglaMeridiano+'.'+valutazione);
					HTML_noMod += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;margin-right: -2px;"> ';
					HTML_noMod += '<b>'+siglaPunto+'</b>';
					if(valutazione)HTML_noMod += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
					if(descrizione)HTML_noMod += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
					HTML_noMod += '</span> ';
				}
				HTML = '<span style="margin-bottom: 15px;display: inline-block;">'+HTML_noMod+'</span>';
			}
		}else{
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes") +'...' +
					'</div>';
		}
		document.getElementById('totPunto').innerHTML = PAZIENTI.puntiProvvisori.length;
		document.getElementById('puntiMTC').innerHTML=HTML;
		PAZIENTI.diagnosi_swPoints();
		PAZIENTI.vis_tabs();
		
		
		if(ev>-1){
			setTimeout(function(){document.getElementById("rg_"+ev)?.classList.remove("eviPunto");},2000);
		}
		
		try{
			if( (globals.set.cartella == 'meridiani_cinesi' || 
				(globals.set.cartella == 'meridiani_shiatsu' && localStorage.sistemaMeridiani!='NMK' && LOGIN.verModule("CIN"))) && 
				elenco)SET.evidenziaPuntoMod(elenco);
		}catch(err){}
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	ricPuntiTratt: function(){ // ricarica i punti del trattamento (dopo un'azione es. elimina o nuovo)
		if(	PAZIENTI.puntiProvvisori.length && 
			(globals.set.cartella == 'meridiani_cinesi' || (globals.set.cartella == 'meridiani_shiatsu') && LOGIN.verModule("CIN")) ){
			/* let puntiProvvisori=''; */
			for(let p in PAZIENTI.puntiProvvisori){
				let im = document.getElementById("ico_PV"+p).getElementsByTagName("img")[0].src;
				if(im.indexOf("ico_PV.")!==-1)imPV='';
				else if(im.indexOf("ico_PVV.")!==-1)imPV='V';
				else if(im.indexOf("ico_PVP.")!==-1)imPV='P';
				else imPV='D';
				PAZIENTI.puntiProvvisori[p].n = document.getElementById('pt_'+p).value;
				PAZIENTI.puntiProvvisori[p].m = document.getElementById('mr_'+p).value;
				PAZIENTI.puntiProvvisori[p].s = document.getElementById('hd_'+p).value;
				PAZIENTI.puntiProvvisori[p].e = imPV;
				/*let n=0;
				for(let m in DB.set.meridiani){
					if(DB.set.meridiani[m].siglaMeridiano==document.getElementById('mr_'+p).value){
						n=(document.getElementById('pt_'+p).value*1+DB.set.meridiani[m].iniMerid*1)-1;
					}
				}*/
			}
		}
	},
	aggiungiPuntoTrattamento: function( PT='0.' ){ // aggiunge un singolo punto al trattamento
		PAZIENTI.ricPuntiTratt();
		let n = PT.split(".")[0],
			siglaMeridiano = PT.split(".")[1],
			siglaPunto = __(DB.set.meridiani[siglaMeridiano].punti[SET.ptToStr(n)].siglaPunto, PT);
		PAZIENTI.puntiProvvisori.push({
			n: n,
			m: siglaMeridiano,
			e: '',
			z: PAZIENTI.mezzoProvvisorio,
			t: '',
			s: siglaPunto
		});
		PAZIENTI.caricaPuntiTrattamento();
		SCHEDA.formModificato = true;
	},
	aggiungiGruppoTrattamento: function( punti ){ // importa un gruppo di punti
		PAZIENTI.topAdd = tCoord(document.getElementById("p_add_dett"),'y');
		SCHEDA.formModificato=true;
		if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N')PAZIENTI.ricPuntiTratt();
		let presenti=false,
			pass=true,
			totAggiunti = 0;
		for(let p in punti){
			// verifico che non ci sia già
			pass=true;
			if(PAZIENTI.tipoGruppo=='P'){
				let n = punti[p].split(".")[0],
					siglaMeridiano = punti[p].split(".")[1];
				for(let k in PAZIENTI.puntiProvvisori){
					if(	PAZIENTI.puntiProvvisori[k].n == n && 
						PAZIENTI.puntiProvvisori[k].m == siglaMeridiano){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					PAZIENTI.aggiungiPuntoTrattamento(n+"."+siglaMeridiano);
					totAggiunti++;
				}
			}
			if(PAZIENTI.tipoGruppo=='M'){
				let siglaMeridiano = punti[p].split(".")[0];
				for(let k in PAZIENTI.meridianiProvvisori){
					if(PAZIENTI.meridianiProvvisori[k].siglaMeridiano == siglaMeridiano){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					PAZIENTI.aggiungiMeridianoTrattamento(siglaMeridiano);
					totAggiunti++;
				}
			}
			if(PAZIENTI.tipoGruppo=='A'){
				let siglaPunto = punti[p].split(".")[0];
				for(let k in PAZIENTI.auriculoProvvisori){
					if(PAZIENTI.auriculoProvvisori[k].siglaMeridiano == siglaPunto){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					PAZIENTI.aggiungiAuriculoTrattamento(siglaPunto);
					totAggiunti++;
				}
			}
			if(PAZIENTI.tipoGruppo=='R'){
				let siglaPunto = punti[p].split(".")[0];
				for(let k in PAZIENTI.reflexProvvisori){
					if(PAZIENTI.reflexProvvisori[k].siglaMeridiano == siglaPunto){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					PAZIENTI.aggiungiReflexTrattamento(siglaPunto);
					totAggiunti++;
				}
			}
			if(PAZIENTI.tipoGruppo=='O'){
				let siglaPunto = punti[p].split(".")[0];
				for(let k in PAZIENTI.triggerProvvisori){
					if(PAZIENTI.triggerProvvisori[k].siglaMeridiano == siglaPunto){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					PAZIENTI.aggiungiTriggerTrattamento(siglaPunto);
					totAggiunti++;
				}
			}
			if(PAZIENTI.tipoGruppo=='N'){
				let siglaPunto = punti[p].split(".")[0];
				for(let k in PAZIENTI.namikoshiProvvisori){
					if(PAZIENTI.namikoshiProvvisori[k].siglaMeridiano == siglaPunto){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					PAZIENTI.aggiungiNamikoshiTrattamento(siglaPunto);
					totAggiunti++;
				}
			}
		}
		if(presenti){
			if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N' || PAZIENTI.tipoGruppo=='A')ALERT(TXT("PuntiPresenti"));
			if(PAZIENTI.tipoGruppo=='M')ALERT(TXT("MeridianiPresenti"));
		}
		if(totAggiunti){
			if(PAZIENTI.tipoGruppo=='P'){
				PAZIENTI.caricaPuntiTrattamento();
				PAZIENTI.evidenziaAggiunti(document.getElementById('puntiMTC'),totAggiunti);
			}
			if(PAZIENTI.tipoGruppo=='M'){
				PAZIENTI.caricaMeridianiTrattamento();
				PAZIENTI.evidenziaAggiunti(document.getElementById('meridianiMTC'),totAggiunti);
			}
			if(PAZIENTI.tipoGruppo=='A'){
				PAZIENTI.caricaAuriculoTrattamento();
				PAZIENTI.evidenziaAggiunti(document.getElementById('puntiAuricolari'),totAggiunti);
			}
			if(PAZIENTI.tipoGruppo=='R'){
				PAZIENTI.caricaReflexTrattamento();
				PAZIENTI.evidenziaAggiunti(document.getElementById('puntiPlantari'),totAggiunti);
			}
			if(PAZIENTI.tipoGruppo=='N'){
				PAZIENTI.caricaNamikoshiTrattamento();
				PAZIENTI.evidenziaAggiunti(document.getElementById('puntiNamikoshi'),totAggiunti);
			}
		}
	},
	eliminaPuntoTrattamento: function( n ){ // elimina un punto del trattamento
		PAZIENTI.ricPuntiTratt();
		PAZIENTI.puntiProvvisori.splice(n,1);
		PAZIENTI.caricaPuntiTrattamento();
		SCHEDA.formModificato = true;
	},
	cambiaPV: function( n, m ){ // cambia la valutazione energetica su un punto
		let el = document.getElementById("ico_PV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		if(globals.modello.cartella)SET.overPunto(document.getElementById("pt_"+n).parentElement,false);
		PAZIENTI.puntiProvvisori[n].e = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricGroup("formMod",n);
		if(globals.modello.cartella)SET.overPunto(document.getElementById("pt_"+n).parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	cambiaPZ: function( n, m, isProc=false ){ // cambia il mezzo su un punto
		let el = document.getElementById("ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		if(globals.modello.cartella)SET.overPunto(document.getElementById("pt_"+n).parentElement.parentElement,false);
		if(!isProc){
			PAZIENTI.puntiProvvisori[n].z = m;
			PAZIENTI.ricGroup("formMod",n);
		}else{
			let pD = SET.dettagliProvvisori[n].DescrizioneDettaglio.split(".");
			SET.dettagliProvvisori[n].DescrizioneDettaglio = __(pD[0])+"."+__(pD[1])+".."+m;
			SET.caricaDettagli();
		}
		SCHEDA.formModificato = true;
		if(globals.modello.cartella)SET.overPunto(document.getElementById("pt_"+n).parentElement.parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
		PAZIENTI.verMezzo(m);
	},
	selPV: function( n ){ // cambia la valutazione energetica
		let html = '',
			pvs = [ '', 'V', 'P', 'D' ];
		for(let m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaPV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'">' +
					(smartMenu ? htmlEntities(TXT("Valutazione"+pvs[m])).toUpperCase() : '') +
					'</span>';
		}
		H.selTT(n,"ico_PV",html);
	},
	spostaPunto: function( elMove, elTarget ){ // sposta dopo il drag&drop
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		let fromIndex = parseInt(elMove.parentElement.id.split("_")[1]),
			toIndex = parseInt(elTarget.id.split("_")[1]),
			arr2 = PAZIENTI.puntiProvvisori.splice(fromIndex, 1)[0]; // l'elemento che tolgo va in arr2
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		PAZIENTI.puntiProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaPuntiTrattamento(toIndex);
		SCHEDA.formModificato = true;
	},
	
	// meridiani
	caricaMeridianiTrattamento: function( ev = -1 ){ // carica i punti del trattamento
		document.getElementById('meridianiMTC').style.display = 'block';
		document.getElementById('label_meridianiMTC').style.display = 'block';
		let HTML = '<div></div>', // serve lasciarlo per il drag&drop
			elenco = [];
		
		if( PAZIENTI.meridianiProvvisori.length ){
			if( globals.set.cartella == 'meridiani_cinesi' || 
				(globals.set.cartella == 'meridiani_shiatsu' && (LOGIN.verModule("CIN") || LOGIN.verModule("MAS"))) ){
				let p = -1;
				for(let m in PAZIENTI.meridianiProvvisori){
					p++;
					elenco.push(PAZIENTI.meridianiProvvisori[m].siglaMeridiano);
					let m2 = __(PAZIENTI.meridianiProvvisori[m].valEnergetica),
						descrizione = __(PAZIENTI.meridianiProvvisori[m].descrizione);
					HTML += '<div class="rgProcMod rgMod dettMeridiano'+((ev==m)?' eviPunto':'');
					if(typeof(MERIDIANI) != 'undefined'){
						if(MERIDIANI[PAZIENTI.meridianiProvvisori[m].siglaMeridiano].meridianoAcceso){
							HTML += ' p_'+MERIDIANI[PAZIENTI.meridianiProvvisori[m].siglaMeridiano].elemento;
						}
					}
					//HTML += '" id="tr_p'+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'">';
					HTML += '" id="tr_p'+m+'">' +
							'<div class="grabElement"' +
							'	   data-drag-class="lbMeridiano"' +
							'	   data-drag-family="meridiano"' +
							'	   data-drag-type="move"' +
							'	   data-drag-el="'+p+'">' +
							
							'	<div class="grabBtn"' +
							'	     onMouseDown="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaMeridiano\');"' +
							'	     onTouchStart="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaMeridiano\');"></div>' +
								
							'	<img src="img/ico_cestino.png"' +
							'		 width="16"' +
							'		 height="16"' +
							'		 align="absmiddle"' +
							'		 id="ico_vis'+m+'"' +
							'		 title="'+TXT("DelDett")+'"' +
							'		 onMouseOver="PAZIENTI.overCestino=true;"' +
							'		 onMouseOut="PAZIENTI.overCestino=false;"' +
							'		 onClick="PAZIENTI.eliminaMeridianoTrattamento('+m+')"' +
							'		 class="cestino">' +
							'	<span';
							' class="meridModif"' +
							' style="cursor:pointer;"' +
							' onClick="if(!PAZIENTI.overCestino)SET.accendiMeridiano(\''+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\',true);"';
					if(mouseDetect)HTML += 
							' onMouseOver="SET.eviMeridiano(\''+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\',true);"' +
							' onMouseOut="SET.eviMeridiano(\''+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\',false);"';
					HTML += '>' +
							PAZIENTI.meridianiProvvisori[m].NomeMeridiano +
							'		<span id="ico_MV'+m+'"' +
							'		      class="valPunto valMerid"' +
							'			  onMouseOver="PAZIENTI.overCestino=true;"' +
							'			  onMouseOut="PAZIENTI.overCestino=false;"' +
							'		      onClick="PAZIENTI.selMV('+m+',\'tr_p'+m+'\');">' +
							'			<img src="img/ico_PV'+m2+'.png"' +
							'		  	     width="16"' +
							'		  	     height="16"' +
							'		  	     align="absmiddle"' +
							'		  	     title="'+ htmlEntities(TXT("PVDett"))+'"' +
							'		  	     class="occhio valEn"> ' +
							'  		 	<b class="noPrint">' +
											TXT("Valutazione"+m2) +
							'			</b>' +
							'		</span>' +
							'	</span>' +
							'	<input id="dm_'+m+'"' +
							'	 		name="dm_'+m+'"' +
							'	 		class="textMeridianoTratt okPlaceHolder"' +
							'	 		value="'+htmlEntities(descrizione)+'"' +
							'	 		placeholder="'+htmlEntities(TXT("SpiegazioneMeridianoTratt"))+'"' +
							'			onBlur="PAZIENTI.meridianiProvvisori['+m+'].descrizione=this.value;"'+H.noAutoGen+'>' +
							'</div>' +
							'</div>';
				}
				HTML +='<p style="height:5px;"></p>';
			}else{
				let HTML_noMod = '';
				for(let m in PAZIENTI.meridianiProvvisori){
					NomeMeridiano=PAZIENTI.meridianiProvvisori[m].NomeMeridiano;
					siglaMeridiano=PAZIENTI.meridianiProvvisori[m].siglaMeridiano;
					m2 = __(PAZIENTI.meridianiProvvisori[m].valEnergetica);
					descrizione = __(PAZIENTI.meridianiProvvisori[m].descrizione);
					HTML_noMod += '<span class="tsb"><img src="img/lineaPat.png" class="noMod" style="vertical-align: middle;margin: -3px 2px 0px 3px;"> ';
					HTML_noMod += '<b>'+NomeMeridiano+'</b>';
					if(m2)HTML_noMod += '<img src="img/ico_PV'+m2+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
					if(descrizione)HTML_noMod += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
					HTML_noMod += '</span> ';
				}
				HTML = '<span style="margin-bottom: 15px;display: inline-block;">'+HTML_noMod+'</span>';
			}
		}else{
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes") +'...' +
					'</div>';
		}
		document.getElementById('totMeridiani').innerHTML = PAZIENTI.meridianiProvvisori.length;
		document.getElementById('meridianiMTC').innerHTML=HTML;
		PAZIENTI.vis_tabs();
		
		if(ev>-1){
			setTimeout(function(){document.getElementById("tr_p"+ev)?.classList.remove("eviPunto");},2000);
		}
		
		try{
			SET.evidenziaMeridianiMod(elenco);
		}catch(err){}
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	aggiungiMeridianoTrattamento: function( siglaMeridiano ){ // aggiunge un singolo punto al trattamento;
		JSNPUSH = {
			siglaMeridiano: siglaMeridiano,
			NomeMeridiano: DB.set.meridiani[siglaMeridiano].NomeMeridiano,
			valEnergetica: ""
		}
		let presente = false;
		for(let m in PAZIENTI.meridianiProvvisori){
			if(PAZIENTI.meridianiProvvisori[m].siglaMeridiano == siglaMeridiano)presente = true;
		}
		if(!presente)PAZIENTI.meridianiProvvisori.push(JSNPUSH);
		SCHEDA.formModificato = true;
		PAZIENTI.caricaMeridianiTrattamento();
		document.getElementById("grpMrd").selectedIndex = 0;
	},
	eliminaMeridianoTrattamento: function( n ){ // elimina un punto del trattamento
		PAZIENTI.meridianiProvvisori.splice(n, 1); 
		PAZIENTI.caricaMeridianiTrattamento();
		SCHEDA.formModificato = true;
	},
	cambiaMV: function( n, m ){ // cambia la valutazione energetica su un punto
		let el = document.getElementById("ico_MV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		PAZIENTI.meridianiProvvisori[n].valEnergetica = m;
		SCHEDA.formModificato = true;
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	selMV: function( n ){ // cambia la valutazione energetica
		let html = '',
			pvs = [ '', 'V', 'P', 'D' ];
		for(let m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaMV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'">' +
					(smartMenu ? htmlEntities(TXT("Valutazione"+pvs[m])).toUpperCase() : '') +
					'</span>';
		}
		H.selTT(n,"ico_MV",html);
	},
	spostaMeridiano: function( elMove, elTarget ){ // sposta dopo il drag&drop
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		let fromIndex = parseInt(elMove.dataset.dragEl),
			toIndex = parseInt(elTarget.getElementsByTagName("div")[0].dataset.dragEl),
			arr2 = PAZIENTI.meridianiProvvisori.splice(fromIndex, 1)[0]; // l'elemento cancellato va in arr2
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		PAZIENTI.meridianiProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaMeridianiTrattamento(toIndex);
		SCHEDA.formModificato = true;
	},
	
	// auriculo-punti
	ricAuriculo: function( frm, n ){ // ricarica tutti i punti
		SET.overPunto("PT"+PAZIENTI.auriculoProvvisori[n].s,false);
		let siglaPunto = document[frm]["pt_"+n].value;
		PAZIENTI.auriculoProvvisori[n].s = siglaPunto;
		PAZIENTI.auriculoProvvisori[n].n = DB.set.punti[siglaPunto].NomePunto;
		PAZIENTI.auriculoProvvisori[n].t = document[frm]["de_"+n].value;
		try{
			PAZIENTI.caricaAuriculoTrattamento();
		}catch(err){}
	},
	caricaAuriculoTrattamento: function( ev = -1 ){ // carica i punti del trattamento
		document.getElementById('puntiAuricolari').style.display = 'block';
		document.getElementById('label_puntiAuricolari').style.display = 'block';
		let HTML = '<div></div>', // serve lasciarlo per il drag&drop
			elenco = [];
		if(PAZIENTI.auriculoProvvisori.length){
			if( globals.set.cartella == 'auricologia' ){
				let puntiElenco = [];
				for(let siglaPunto in DB.set.punti){
					if(__(DB.set.punti[siglaPunto])){
						puntiElenco.push({
							siglaPunto: siglaPunto,
							NomePunto: DB.set.punti[siglaPunto].NomePunto
						});
					}
				}
				puntiElenco.sort(sort_by("NomePunto", false));
				for(let p in PAZIENTI.auriculoProvvisori){
					
					valutazione=__(PAZIENTI.auriculoProvvisori[p].e);
					mezzo=__(PAZIENTI.auriculoProvvisori[p].z);
					descrizione=__(PAZIENTI.auriculoProvvisori[p].t);
					siglaPunto=__(PAZIENTI.auriculoProvvisori[p].s);
					nomePunto=__(PAZIENTI.auriculoProvvisori[p].n);
					elenco.push(siglaPunto+"."+valutazione);
					
					HTML += '<div class="rgProcMod rgMod dettAuriculo'+((ev==p)?' eviPunto':'')+'"' +
							'	  id="rg_'+p+'"';
					if(mouseDetect && siglaPunto){
						HTML += 	' onMouseOver="SET.overPunto(\'PT'+siglaPunto+'\',true);"' +
									' onMouseOut="SET.overPunto(\'PT'+siglaPunto+'\',false);"';
					}
					HTML += '><div class="grabElement"' +
							'	   data-drag-class="lbAuriculo"' +
							'	   data-drag-family="auriculo"' +
							'	   data-drag-type="move">' +
							
							'	<div class="grabBtn"' +
							'	     onMouseDown="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaAuriculo\');"' +
							'	     onTouchStart="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaAuriculo\');"></div>' +
						
						
							'	<img src="img/ico_cestino.png"' +
							'		 width="16"' +
							'		 height="16"' +
							'		 align="absmiddle"' +
							'		 id="ico_vis'+p+'"' +
							'		 title="'+TXT("DelDett")+'"' +
							'		 onClick="PAZIENTI.eliminaAuriculoTrattamento('+p+')"' +
							'		 class="cestino">';
					
					// mezzo
					let addMezzoTit = '';
					if(mezzo)addMezzoTit = ': '+PAZIENTI.mezzi[mezzo];
					HTML += '	<span id="ico_PZ'+p+'"' +
							'	      class="mezzoPunto"' +
							'	      onClick="PAZIENTI.selMezzo('+p+',\'A\');">' +
							'		<img src="img/mezzo_'+mezzo+'.png"' +
							'	  	     width="20"' +
							'	  	     height="20"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PZDett"))+'"'+
							'	  	     class="occhio valEn"> ' +
							'	</span>';
							
					
					
					// siglaPunto (.s in puntiProvvisori)
					HTML += '<input type="hidden" id="hd_'+p+'" name="hd_'+p+'" value="'+siglaPunto+'">';
					
					// verifico che esista il punto
					if(globals.set.cartella != 'auricologia'){
						HTML += '<span class="ptNo" style="text-align:left">'+nomePunto+'</span>' +
								'<input type="hidden" id="pt_'+p+'" name="pt_'+p+'" value="'+siglaPunto+'">';
					}else{
						// punto
						HTML +=	'	<select class="numPoints"' +
								'	     	 name="pt_'+p+'"' +
								'	     	 id="pt_'+p+'"' +
								'	     	 onChange="this.blur();' +
								'	     	 		   PAZIENTI.ricAuriculo(\'formMod\','+p+');' +
								'	     	 		   SCHEDA.formModificato=true;">' +
								'		<option></option>';
						for(let n in puntiElenco){
							// verifico le autorizzazioni
							//if(SET.verFreePunti(puntiElenco[n].siglaPunto)){
								HTML += '<option value="'+puntiElenco[n].siglaPunto+'"';
								if(siglaPunto==puntiElenco[n].siglaPunto)HTML += ' SELECTED';
								HTML += '>'+puntiElenco[n].NomePunto+'</option>';
							//}
							// --------------------------
						}
						HTML += '	</select>';
					
						// icona visualizzazione
						HTML += '	<img src="img/ico_vedi.png"' +
								'	     width="16"' +
								'	     height="16"' +
								'	     align="absmiddle"' +
								'	     id="ico_vis'+p+'"' +
								'	     style="' +
								'				margin-left:5px;' +
								'				margin-right:7px;' +
								'				margin-top: -4px;' +
								'				cursor:pointer;"' +
								'		 class="occhio"' +
								'		 title="'+htmlEntities(TXT("VisualizzaPunto"))+'"' +
								'		 onClick="SET.selPuntoMod(\''+siglaPunto+'\','+p+');">';
					}
					
					
					
					
					// valutazione energetica
					HTML += '	<span id="ico_PV'+p+'"' +
							'	      class="valPunto"' +
							'	      onClick="PAZIENTI.selAV('+p+');">'+
							'		<img src="img/ico_PV'+valutazione+'.png"' +
							'	  	     width="16"' +
							'	  	     height="16"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PVDett"))+'"' +
							'	  	     class="occhio valEn"> ' +
							'	</span>';
					
					HTML += '<input id="de_'+p+'"' +
							' 		name="de_'+p+'"' +
							' 		class="textPuntoTratt okPlaceHolder"' +
							' 		value="'+htmlEntities(descrizione)+'"' +
							' 		placeholder="'+htmlEntities(TXT("SpiegazioneAuriculoTratt"))+'"' +
							'		onBlur="PAZIENTI.auriculoProvvisori['+p+'].t=this.value"' +
							'		'+H.noAutoGen+'>';
					HTML += '</div></div>';
				}
				HTML +=	'<div style="clear:both;height:1px;"></div>';
			}else{
				let HTML_noMod = '';
				for(let p in PAZIENTI.auriculoProvvisori){
					valutazione=__(PAZIENTI.auriculoProvvisori[p].e);
					mezzo=__(PAZIENTI.auriculoProvvisori[p].z);
					descrizione=__(PAZIENTI.auriculoProvvisori[p].t);
					siglaPunto=__(PAZIENTI.auriculoProvvisori[p].s);
					NomePunto=__(PAZIENTI.auriculoProvvisori[p].n);
					HTML_noMod += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
					HTML_noMod += NomePunto;
					if(valutazione)HTML_noMod += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
					if(descrizione)HTML_noMod += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
					HTML_noMod += '</span> ';
					elenco.push(siglaPunto);
				}
				HTML = '<span style="margin-bottom: 15px;display: inline-block;">'+HTML_noMod+'</span>';
			}
		}else{
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes") +'...' +
					'</div>';
		}
		document.getElementById('totAuriculo').innerHTML = PAZIENTI.auriculoProvvisori.length;
		document.getElementById('puntiAuricolari').innerHTML=HTML;
		PAZIENTI.vis_tabs();
		
		if(ev>-1){
			setTimeout(function(){document.getElementById("rg_"+ev)?.classList.remove("eviPunto");},2000);
		}
		try{
			if( globals.set.cartella == 'auricologia' )SET.evidenziaPuntoMod(elenco);
		}catch(err){}
		
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	aggiungiAuriculoTrattamento: function( PT ){ // aggiunge un singolo punto al trattamento;
		JSNPUSH = {
			s: PT,
			n: DB.set.punti[PT].NomePunto,
			z: PAZIENTI.mezzoProvvisorio,
			e: "",
			t: ""
		}
		PAZIENTI.auriculoProvvisori.push(JSNPUSH);
		SCHEDA.formModificato = true;
		PAZIENTI.caricaAuriculoTrattamento();
		document.getElementById("grpAur").selectedIndex = 0;
	},
	eliminaAuriculoTrattamento: function( n ){ // elimina un punto del trattamento
		SET.overPunto("PT"+PAZIENTI.auriculoProvvisori[n].s,false);
		PAZIENTI.auriculoProvvisori.splice(n, 1); 
		PAZIENTI.caricaAuriculoTrattamento();
		SCHEDA.formModificato = true;
	},
	selAV: function( n ){ // cambia la valutazione energetica
		let html = '',
			pvs = [ '', 'D' ];
		for(let m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaAV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'">' +
					(smartMenu ? htmlEntities(TXT("Valutazione"+pvs[m])).toUpperCase() : '') +
					'</span>';
		}
		H.selTT(n,"ico_PV",html);
	},
	cambiaAV: function( n, m ){ // cambia la valutazione energetica su un punto
		let el = document.getElementById("ico_PV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		//SET.overPunto(document.getElementById("pt_"+n).parentElement,false);
		PAZIENTI.auriculoProvvisori[n].e = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricAuriculo("formMod",n);
		//SET.overPunto(document.getElementById("pt_"+n).parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	cambiaAZ: function( n, m, isProc=false ){ // cambia il mezzo su un punto
		let el = document.getElementById("ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		if(globals.modello.cartella)SET.overPunto("_PT"+m,false);
		if(!isProc){
			PAZIENTI.auriculoProvvisori[n].z = m;
		}else{
			let pD = SET.dettagliProvvisori[n].DescrizioneDettaglio.split(".");
			SET.dettagliProvvisori[n].DescrizioneDettaglio = __(pD[0])+"."+__(m);
			SET.caricaDettagli();
		}
		SCHEDA.formModificato = true;
		if(globals.modello.cartella)SET.overPunto("_PT"+m,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
		PAZIENTI.verMezzo(m);
	},
	spostaAuriculo: function( elMove, elTarget ){ // sposta dopo il drag&drop
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		let fromIndex = parseInt(elMove.parentElement.id.split("_")[1]),
			toIndex = parseInt(elTarget.id.split("_")[1]),
			arr2 = PAZIENTI.auriculoProvvisori.splice(fromIndex, 1)[0]; // l'elemento eliminato va in arr2
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		PAZIENTI.auriculoProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaAuriculoTrattamento(toIndex);
		SCHEDA.formModificato = true;
	},
	
	// aree reflessologia plantare
	ricReflex: function( frm, n ){ // ricarica tutti i punti
		SET.overPunto(PAZIENTI.reflexProvvisori[n].s,false);
		let siglaPunto = document[frm]["pt_"+n].value;
		PAZIENTI.reflexProvvisori[n].s = siglaPunto;
		PAZIENTI.reflexProvvisori[n].n = DB.set.punti[siglaPunto].NomePunto;
		PAZIENTI.reflexProvvisori[n].t = document[frm]["de_"+n].value;
		try{
			PAZIENTI.caricaReflexTrattamento();
		}catch(err){}
	},
	caricaReflexTrattamento: function( ev = -1 ){ // carica i punti del trattamento
		document.getElementById('puntiPlantari').style.display = 'block';
		document.getElementById('label_puntiPlantari').style.display = 'block';
		let HTML = '<div></div>', // serve lasciarlo per il drag&drop
			elenco = [];
		if(PAZIENTI.reflexProvvisori.length){
			if( globals.set.cartella == 'reflessologia_plantare' ){
				let puntiElenco = [];
				for(let siglaPunto in DB.set.punti){
					if(__(DB.set.punti[siglaPunto])){
						puntiElenco.push({
							siglaPunto: siglaPunto,
							NomePunto: DB.set.punti[siglaPunto].NomePunto
						});
					}
				}
				puntiElenco.sort(sort_by("NomePunto", false));
				for(let p in PAZIENTI.reflexProvvisori){
					
					valutazione=__(PAZIENTI.reflexProvvisori[p].e);
					mezzo=__(PAZIENTI.reflexProvvisori[p].z);
					descrizione=__(PAZIENTI.reflexProvvisori[p].t);
					siglaPunto=__(PAZIENTI.reflexProvvisori[p].s);
					nomePunto=__(PAZIENTI.reflexProvvisori[p].n);
					elenco.push(siglaPunto+"."+valutazione);
					
					HTML += '<div class="rgProcMod rgMod dettReflex'+((ev==p)?' eviPunto':'')+'"' +
							'	  id="rg_'+p+'"';
					if(mouseDetect && siglaPunto){
						HTML += 	' onMouseOver="SET.overPunto(\''+siglaPunto+'\',true);"' +
									' onMouseOut="SET.overPunto(\''+siglaPunto+'\',false);"';
					}
					HTML += '><div class="grabElement"' +
							'	   data-drag-class="lbReflex"' +
							'	   data-drag-family="reflex"' +
							'	   data-drag-type="move">' +
							
							'	<div class="grabBtn"' +
							'	     onMouseDown="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaReflex\');"' +
							'	     onTouchStart="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaReflex\');"></div>' +
						
						
							'	<img src="img/ico_cestino.png"' +
							'		 width="16"' +
							'		 height="16"' +
							'		 align="absmiddle"' +
							'		 id="ico_vis'+p+'"' +
							'		 title="'+TXT("DelDett")+'"' +
							'		 onClick="PAZIENTI.eliminaReflexTrattamento('+p+')"' +
							'		 class="cestino">';
					
					// mezzo
					let addMezzoTit = '';
					if(mezzo)addMezzoTit = ': '+PAZIENTI.mezzi[mezzo];
					HTML += '	<span id="ico_PZ'+p+'"' +
							'	      class="mezzoPunto"' +
							'	      onClick="PAZIENTI.selMezzo('+p+',\'R\');">' +
							'		<img src="img/mezzo_'+mezzo+'.png"' +
							'	  	     width="20"' +
							'	  	     height="20"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PZDett"))+'"'+
							'	  	     class="occhio valEn"> ' +
							'	</span>';
							
					
					
					// siglaPunto (.s in puntiProvvisori)
					HTML += '<input type="hidden" id="hd_'+p+'" name="hd_'+p+'" value="'+siglaPunto+'">';
					
					// verifico che esista il punto
					if(globals.set.cartella != 'reflessologia_plantare'){
						HTML += '<span class="ptNo" style="text-align:left">'+nomePunto+'</span>' +
								'<input type="hidden" id="pt_'+p+'" name="pt_'+p+'" value="'+siglaPunto+'">';
					}else{
						// punto
						HTML +=	'	<select class="numPoints"' +
								'	     	 name="pt_'+p+'"' +
								'	     	 id="pt_'+p+'"' +
								'	     	 onChange="this.blur();' +
								'	     	 		   PAZIENTI.ricReflex(\'formMod\','+p+');' +
								'	     	 		   SCHEDA.formModificato=true;">' +
								'		<option></option>';
						for(let n in puntiElenco){
							// verifico le autorizzazioni
							//if(SET.verFreePunti(puntiElenco[n].siglaPunto)){
								HTML += '<option value="'+puntiElenco[n].siglaPunto+'"';
								if(siglaPunto==puntiElenco[n].siglaPunto)HTML += ' SELECTED';
								HTML += '>'+puntiElenco[n].NomePunto+'</option>';
							//}
							// --------------------------
						}
						HTML += '	</select>';
					
						// icona visualizzazione
						HTML += '	<img src="img/ico_vedi.png"' +
								'	     width="16"' +
								'	     height="16"' +
								'	     align="absmiddle"' +
								'	     id="ico_vis'+p+'"' +
								'	     style="' +
								'				margin-left:5px;' +
								'				margin-right:7px;' +
								'				margin-top: -4px;' +
								'				cursor:pointer;"' +
								'		 class="occhio"' +
								'		 title="'+htmlEntities(TXT("VisualizzaPunto"))+'"' +
								'		 onClick="SET.selPuntoMod(\''+siglaPunto+'\','+p+');">';
					}
					
					
					
					
					// valutazione energetica
					HTML += '	<span id="ico_PV'+p+'"' +
							'	      class="valPunto"' +
							'	      onClick="PAZIENTI.selRV('+p+');">'+
							'		<img src="img/ico_PV'+valutazione+'.png"' +
							'	  	     width="16"' +
							'	  	     height="16"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PVDett"))+'"' +
							'	  	     class="occhio valEn"> ' +
							'	</span>';
					
					HTML += '<input id="de_'+p+'"' +
							' 		name="de_'+p+'"' +
							' 		class="textPuntoTratt okPlaceHolder"' +
							' 		value="'+htmlEntities(descrizione)+'"' +
							' 		placeholder="'+htmlEntities(TXT("SpiegazioneReflexTratt"))+'"' +
							'		onBlur="PAZIENTI.reflexProvvisori['+p+'].t=this.value"' +
							'		'+H.noAutoGen+'>';
					HTML += '</div></div>';
				}
				HTML +=	'<div style="clear:both;height:1px;"></div>';
			}else{
				let HTML_noMod = '';
				for(let p in PAZIENTI.reflexProvvisori){
					valutazione=__(PAZIENTI.reflexProvvisori[p].e);
					mezzo=__(PAZIENTI.reflexProvvisori[p].z);
					descrizione=__(PAZIENTI.reflexProvvisori[p].t);
					siglaPunto=__(PAZIENTI.reflexProvvisori[p].s);
					NomePunto=__(PAZIENTI.reflexProvvisori[p].n);
					HTML_noMod += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
					HTML_noMod += NomePunto;
					if(valutazione)HTML_noMod += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
					if(descrizione)HTML_noMod += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
					HTML_noMod += '</span> ';
					elenco.push(siglaPunto);
				}
				HTML = '<span style="margin-bottom: 15px;display: inline-block;">'+HTML_noMod+'</span>';
			}
		}else{
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes") +'...' +
					'</div>';
		}
		document.getElementById('totReflex').innerHTML = PAZIENTI.reflexProvvisori.length;
		document.getElementById('puntiPlantari').innerHTML=HTML;
		PAZIENTI.vis_tabs();
		
		if(ev>-1){
			setTimeout(function(){document.getElementById("rg_"+ev)?.classList.remove("eviPunto");},2000);
		}
		try{
			if( globals.set.cartella == 'reflessologia_plantare' )SET.evidenziaPuntoMod(elenco);
		}catch(err){}
		
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	aggiungiReflexTrattamento: function( PT ){ // aggiunge un singolo punto al trattamento;
		JSNPUSH = {
			s: PT,
			n: DB.set.punti[PT].NomePunto,
			z: PAZIENTI.mezzoProvvisorio,
			e: "",
			t: ""
		}
		PAZIENTI.reflexProvvisori.push(JSNPUSH);
		SCHEDA.formModificato = true;
		PAZIENTI.caricaReflexTrattamento();
		document.getElementById("grpRfx").selectedIndex = 0;
	},
	eliminaReflexTrattamento: function( n ){ // elimina un punto del trattamento
		SET.overPunto(PAZIENTI.reflexProvvisori[n].s,false);
		PAZIENTI.reflexProvvisori.splice(n, 1); 
		PAZIENTI.caricaReflexTrattamento();
		SCHEDA.formModificato = true;
	},
	selRV: function( n ){ // cambia la valutazione energetica
		let html = '',
			pvs = [ '', 'D' ];
		for(let m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaRV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'">' +
					(smartMenu ? htmlEntities(TXT("Valutazione"+pvs[m])).toUpperCase() : '') +
					'</span>';
		}
		H.selTT(n,"ico_PV",html);
	},
	cambiaRV: function( n, m ){ // cambia la valutazione energetica su un punto
		let el = document.getElementById("ico_PV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		//SET.overPunto(document.getElementById("pt_"+n).parentElement,false);
		PAZIENTI.reflexProvvisori[n].e = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricReflex("formMod",n);
		//SET.overPunto(document.getElementById("pt_"+n).parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	cambiaRZ: function( n, m, isProc=false ){ // cambia il mezzo su un punto
		let el = document.getElementById("ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		if(globals.modello.cartella)SET.overPunto(document.getElementById("pt_"+n).value,false);
		if(!isProc){
			PAZIENTI.reflexProvvisori[n].z = m;
		}else{
			let pD = SET.dettagliProvvisori[n].DescrizioneDettaglio.split(".");
			SET.dettagliProvvisori[n].DescrizioneDettaglio = __(pD[0])+"."+__(m);
			SET.caricaDettagli();
		}
		SCHEDA.formModificato = true;
		if(globals.modello.cartella)SET.overPunto(document.getElementById("pt_"+n).value,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
		PAZIENTI.verMezzo(m);
	},
	spostaReflex: function( elMove, elTarget ){ // sposta dopo il drag&drop
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		let fromIndex = parseInt(elMove.parentElement.id.split("_")[1]),
			toIndex = parseInt(elTarget.id.split("_")[1]),
			arr2 = PAZIENTI.reflexProvvisori.splice(fromIndex, 1)[0]; // l'elemento eliminato va in arr2
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		PAZIENTI.reflexProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaReflexTrattamento(toIndex);
		SCHEDA.formModificato = true;
	},
	
	// punti-trigger
	ricTrigger: function( frm, n ){ // ricarica tutti i punti
		SET.overPunto("PT"+PAZIENTI.triggerProvvisori[n].s,false);
		let siglaPunto = document[frm]["pt_"+n].value,
			muscolo = SET.getMuscle(siglaPunto),
			NomePunto = DB.set.punti[muscolo].NomePunto;
		if(DB.set.punti[muscolo].punti[siglaPunto])NomePunto += ' - '+DB.set.punti[muscolo].punti[siglaPunto];

		PAZIENTI.triggerProvvisori[n].s = siglaPunto;
		PAZIENTI.triggerProvvisori[n].n = NomePunto;
		PAZIENTI.triggerProvvisori[n].t = document[frm]["de_"+n].value;
		try{
			PAZIENTI.caricaTriggerTrattamento();
		}catch(err){}
	},
	caricaTriggerTrattamento: function( ev = -1 ){ // carica i punti del trattamento
		document.getElementById('puntiTrigger').style.display = 'block';
		document.getElementById('label_puntiTrigger').style.display = 'block';
		let HTML = '<div></div>', // serve lasciarlo per il drag&drop
			elenco = [];
		if(PAZIENTI.triggerProvvisori.length){
			if( globals.set.cartella == 'trigger_points' ){
				let puntiElenco = [];
				for(let muscolo in DB.set.punti){
					if(__(DB.set.punti[muscolo])){
						for(let siglaPunto in DB.set.punti[muscolo].punti){
							let NomePunto = DB.set.punti[muscolo].NomePunto;
							if(DB.set.punti[muscolo].punti[siglaPunto])NomePunto += ' - '+DB.set.punti[muscolo].punti[siglaPunto];
							puntiElenco.push({
								siglaPunto: siglaPunto,
								NomePunto: NomePunto,
								punti: DB.set.punti[muscolo].punti
							});
						}
					}
				}
				puntiElenco.sort(sort_by("NomePunto", false));
				for(let p in PAZIENTI.triggerProvvisori){
					
					valutazione=__(PAZIENTI.triggerProvvisori[p].e);
					mezzo=__(PAZIENTI.triggerProvvisori[p].z);
					descrizione=__(PAZIENTI.triggerProvvisori[p].t);
					siglaPunto=__(PAZIENTI.triggerProvvisori[p].s);
					nomePunto=__(PAZIENTI.triggerProvvisori[p].n);
					elenco.push(siglaPunto+"."+valutazione);
					
					HTML += '<div class="rgProcMod rgMod dettTrigger'+((ev==p)?' eviPunto':'')+'"' +
							'	  id="rg_'+p+'"';
					if(mouseDetect && siglaPunto){
						HTML += 	' onMouseOver="SET.overPunto(\''+siglaPunto+'\',true);"' +
									' onMouseOut="SET.overPunto(\''+siglaPunto+'\',false);"';
					}
					HTML += '><div class="grabElement"' +
							'	   data-drag-class="lbTrigger"' +
							'	   data-drag-family="trigger"' +
							'	   data-drag-type="move">' +
							
							'	<div class="grabBtn"' +
							'	     onMouseDown="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaTrigger\');"' +
							'	     onTouchStart="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaTrigger\');"></div>' +
						
						
							'	<img src="img/ico_cestino.png"' +
							'		 width="16"' +
							'		 height="16"' +
							'		 align="absmiddle"' +
							'		 id="ico_vis'+p+'"' +
							'		 title="'+TXT("DelDett")+'"' +
							'		 onClick="PAZIENTI.eliminaTriggerTrattamento('+p+')"' +
							'		 class="cestino">';
					
					// mezzo
					let addMezzoTit = '';
					if(mezzo)addMezzoTit = ': '+PAZIENTI.mezzi[mezzo];
					HTML += '	<span id="ico_PZ'+p+'"' +
							'	      class="mezzoPunto"' +
							'	      onClick="PAZIENTI.selMezzo('+p+',\'O\');">' +
							'		<img src="img/mezzo_'+mezzo+'.png"' +
							'	  	     width="20"' +
							'	  	     height="20"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PZDett"))+'"'+
							'	  	     class="occhio valEn"> ' +
							'	</span>';
							
					
					
					HTML += '<input type="hidden" id="hd_'+p+'" name="hd_'+p+'" value="'+siglaPunto+'">';
					
					// verifico che esista il punto
					if(globals.set.cartella != 'trigger_points'){
						HTML += '<span class="ptNo" style="text-align:left">'+nomePunto+'</span>' +
								'<input type="hidden" id="pt_'+p+'" name="pt_'+p+'" value="'+siglaPunto+'">';
					}else{
						// punto
						HTML +=	'	<select class="numPoints"' +
								'	     	 name="pt_'+p+'"' +
								'	     	 id="pt_'+p+'"' +
								'	     	 onChange="this.blur();' +
								'	     	 		   PAZIENTI.ricTrigger(\'formMod\','+p+');' +
								'	     	 		   SCHEDA.formModificato=true;">' +
								'		<option></option>';
						for(let n in puntiElenco){
							// verifico le autorizzazioni
							//if(SET.verFreePunti(puntiElenco[n].siglaPunto)){
								HTML += '<option value="'+puntiElenco[n].siglaPunto+'"';
								if(siglaPunto==puntiElenco[n].siglaPunto)HTML += ' SELECTED';
								HTML += '>'+puntiElenco[n].NomePunto+'</option>';
							//}
							// --------------------------
						}
						HTML += '	</select>';
					
						// icona visualizzazione
						HTML += '	<img src="img/ico_vedi.png"' +
								'	     width="16"' +
								'	     height="16"' +
								'	     align="absmiddle"' +
								'	     id="ico_vis'+p+'"' +
								'	     style="' +
								'				margin-left:5px;' +
								'				margin-right:7px;' +
								'				margin-top: -4px;' +
								'				cursor:pointer;"' +
								'		 class="occhio"' +
								'		 title="'+htmlEntities(TXT("VisualizzaPunto"))+'"' +
								'		 onClick="SET.selPuntoMod(\''+siglaPunto+'\','+p+');">';
					}
					
					
					
					
					// valutazione energetica
					HTML += '	<span id="ico_PV'+p+'"' +
							'	      class="valPunto"' +
							'	      onClick="PAZIENTI.selOV('+p+');">'+
							'		<img src="img/ico_PV'+valutazione+'.png"' +
							'	  	     width="16"' +
							'	  	     height="16"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PVDett"))+'"' +
							'	  	     class="occhio valEn"> ' +
							'	</span>';
					
					HTML += '<input id="de_'+p+'"' +
							' 		name="de_'+p+'"' +
							' 		class="textPuntoTratt okPlaceHolder"' +
							' 		value="'+htmlEntities(descrizione)+'"' +
							' 		placeholder="'+htmlEntities(TXT("SpiegazioneTriggerTratt"))+'"' +
							'		onBlur="PAZIENTI.triggerProvvisori['+p+'].t=this.value"' +
							'		'+H.noAutoGen+'>';
					HTML += '</div></div>';
				}
				HTML +=	'<div style="clear:both;height:1px;"></div>';
			}else{
				let HTML_noMod = '';
				for(let p in PAZIENTI.triggerProvvisori){
					valutazione=__(PAZIENTI.triggerProvvisori[p].e);
					mezzo=__(PAZIENTI.triggerProvvisori[p].z);
					descrizione=__(PAZIENTI.triggerProvvisori[p].t);
					siglaPunto=__(PAZIENTI.triggerProvvisori[p].s);
					NomePunto=__(PAZIENTI.triggerProvvisori[p].n);
					HTML_noMod += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
					HTML_noMod += NomePunto;
					if(valutazione)HTML_noMod += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
					if(descrizione)HTML_noMod += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
					HTML_noMod += '</span> ';
					elenco.push(siglaPunto);
				}
				HTML = '<span style="margin-bottom: 15px;display: inline-block;">'+HTML_noMod+'</span>';
			}
		}else{
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes") +'...' +
					'</div>';
		}
		document.getElementById('totTrigger').innerHTML = PAZIENTI.triggerProvvisori.length;
		document.getElementById('puntiTrigger').innerHTML=HTML;
		PAZIENTI.vis_tabs();
		
		if(ev>-1){
			setTimeout(function(){document.getElementById("rg_"+ev)?.classList.remove("eviPunto");},2000);
		}
		try{
			if( globals.set.cartella == 'trigger_points' )SET.evidenziaPuntoMod(elenco);
		}catch(err){}
		
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	aggiungiTriggerTrattamento: function( PT ){ // aggiunge un singolo punto al trattamento;
		let muscolo = SET.getMuscle(PT),
			NomePunto = DB.set.punti[muscolo].NomePunto;
		if(DB.set.punti[muscolo].punti[PT])NomePunto += ' - '+DB.set.punti[muscolo].punti[PT];
		JSNPUSH = {
			s: PT,
			n: NomePunto,
			z: PAZIENTI.mezzoProvvisorio,
			e: "",
			t: ""
		}
		PAZIENTI.triggerProvvisori.push(JSNPUSH);
		SCHEDA.formModificato = true;
		PAZIENTI.caricaTriggerTrattamento();
		document.getElementById("grpTrp").selectedIndex = 0;
	},
	eliminaTriggerTrattamento: function( n ){ // elimina un punto del trattamento
		SET.overPunto("PT"+PAZIENTI.triggerProvvisori[n].s,false);
		PAZIENTI.triggerProvvisori.splice(n, 1); 		PAZIENTI.caricaTriggerTrattamento();
		SCHEDA.formModificato = true;
	},
	selOV: function( n ){ // cambia la valutazione energetica
		let html = '',
			pvs = [ '', 'D' ];
		for(let m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaOV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'">' +
					(smartMenu ? htmlEntities(TXT("Valutazione"+pvs[m])).toUpperCase() : '') +
					'</span>';
		}
		H.selTT(n,"ico_PV",html);
	},
	cambiaOV: function( n, m ){ // cambia la valutazione energetica su un punto
		let el = document.getElementById("ico_PV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		//SET.overPunto(document.getElementById("pt_"+n).parentElement,false);
		PAZIENTI.triggerProvvisori[n].e = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricTrigger("formMod",n);
		//SET.overPunto(document.getElementById("pt_"+n).parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	cambiaOZ: function( n, m, isProc=false ){ // cambia il mezzo su un punto
		let el = document.getElementById("ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		if(globals.modello.cartella)SET.overPunto("_"+document.getElementById("pt_"+n).value,false);
		if(!isProc){
			PAZIENTI.triggerProvvisori[n].z = m;
		}else{
			let pD = SET.dettagliProvvisori[n].DescrizioneDettaglio.split(".");
			SET.dettagliProvvisori[n].DescrizioneDettaglio = __(pD[0])+"."+__(m);
			SET.caricaDettagli();
		}
		SCHEDA.formModificato = true;
		if(globals.modello.cartella)SET.overPunto("_"+document.getElementById("pt_"+n).value,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
		PAZIENTI.verMezzo(m);
	},
	spostaTrigger: function( elMove, elTarget ){ // sposta dopo il drag&drop
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		let fromIndex = parseInt(elMove.parentElement.id.split("_")[1]),
			toIndex = parseInt(elTarget.id.split("_")[1]),
			arr2 = PAZIENTI.triggerProvvisori.splice(fromIndex, 1)[0]; // l'elemento eliminato va in arr2
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		PAZIENTI.triggerProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaTriggerTrattamento(toIndex);
		SCHEDA.formModificato = true;
	},
	
	
	// punti namikoshi
	ricNamikoshi: function( frm, n ){ // ricarica tutti i punti	
		//SET.overPunto(document.getElementById("n-rg_"+n),false);
		SET.delAllEviPalls("Over");
		let nPunto = document[frm]["n-pt_"+n].value;
		PAZIENTI.namikoshiProvvisori[n].n = SET.ptToStr(nPunto);
		PAZIENTI.namikoshiProvvisori[n].s = DB.set.meridiani.NK.punti[nPunto].NomePunto;
		PAZIENTI.namikoshiProvvisori[n].t = document[frm]["n-de_"+n].value;
		try{
			PAZIENTI.caricaNamikoshiTrattamento();
		}catch(err){}
	},
	caricaNamikoshiTrattamento: function( ev = -1 ){ // carica i punti del trattamento
		document.getElementById('puntiNamikoshi').style.display = 'block';
		document.getElementById('label_puntiNamikoshi').style.display = 'block';
		let HTML = '<div></div>', // serve lasciarlo per il drag&drop
			elenco = [];
		if(PAZIENTI.namikoshiProvvisori.length){
			if( globals.set.cartella == 'meridiani_shiatsu' && LOGIN.verModule("NMK") ){
				let puntiElenco = [];
				for(let siglaPunto in DB.set.meridiani.NK.punti){
					if(__(DB.set.meridiani.NK.punti[siglaPunto])){
						if(	DB.set.meridiani.NK.punti[siglaPunto].NomePunto){
							let pP = DB.set.meridiani.NK.punti[siglaPunto].siglaPunto.split("-");
							puntiElenco.push({
								siglaPunto: pP[1],
								NomePunto: DB.set.meridiani.NK.punti[siglaPunto].NomePunto
							});
						}
					}
				}
				puntiElenco.sort(sort_by("NomePunto", false));
				for(let p in PAZIENTI.namikoshiProvvisori){
					valutazione=__(PAZIENTI.namikoshiProvvisori[p].e);
					mezzo=__(PAZIENTI.namikoshiProvvisori[p].z);
					descrizione=__(PAZIENTI.namikoshiProvvisori[p].t);
					siglaPunto=__(PAZIENTI.namikoshiProvvisori[p].s);
					nPunto=SET.ptToStr(PAZIENTI.namikoshiProvvisori[p].n);
					elenco.push(nPunto+".NK."+valutazione);
					
					HTML += '<div class="rgProcMod rgMod dettPunto dettNamikoshi'+((ev==p)?' eviPunto':'')+'"' +
							'	  id="n-rg_'+p+'"';
					if(mouseDetect && nPunto){
						HTML += 	' onMouseOver="SET.overPunto(this,true);"' +
									' onMouseOut="SET.overPunto(this,false);"';
					}
					HTML += '><div class="grabElement"' +
							'	   data-drag-class="lbNamikoshi"' +
							'	   data-drag-family="namikoshi"' +
							'	   data-drag-type="move">' +
							
							'	<div class="grabBtn"' +
							'	     onMouseDown="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaNamikoshi\');"' +
							'	     onTouchStart="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaNamikoshi\');"></div>' +
						
						
							'	<img src="img/ico_cestino.png"' +
							'		 width="16"' +
							'		 height="16"' +
							'		 align="absmiddle"' +
							'		 id="ico_vis'+p+'"' +
							'		 title="'+TXT("DelDett")+'"' +
							'		 onClick="PAZIENTI.eliminaNamikoshiTrattamento('+p+')"' +
							'		 class="cestino">';
					
					// mezzo
					let addMezzoTit = '';
					if(mezzo)addMezzoTit = ': '+PAZIENTI.mezzi[mezzo];
					HTML += '	<span id="n-ico_PZ'+p+'"' +
							'	      class="mezzoPunto"' +
							'	      onClick="PAZIENTI.selMezzo('+p+',\'N\');">' +
							'		<img src="img/mezzo_'+mezzo+'.png"' +
							'	  	     width="20"' +
							'	  	     height="20"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PZDett"))+'"'+
							'	  	     class="occhio valEn"> ' +
							'	</span>';
							
					
					
					// siglaPunto (.s in puntiProvvisori)
					HTML += '<input type="hidden" id="n-hd_'+p+'" name="n-hd_'+p+'" value="'+siglaPunto+'">' +
							'<input type="hidden" id="n-mr_'+p+'" name="n-mr_'+p+'" value="NK" class="selectTratt">';
					
					// verifico che esista il punto
					if( globals.set.cartella != 'meridiani_shiatsu' && LOGIN.verModule("NMK") ){
						HTML += '<span class="ptNo" style="text-align:left">'+nomePunto+'</span>' +
								'<input type="hidden" id="n-pt_'+p+'" name="n-pt_'+p+'" value="'+siglaPunto+'">';
					}else{
						// punto
						HTML +=	'	<select class="numPoints"' +
								'	     	 name="n-pt_'+p+'"' +
								'	     	 id="n-pt_'+p+'"' +
								'	     	 onChange="this.blur();' +
								'	     	 		   PAZIENTI.ricNamikoshi(\'formMod\','+p+');' +
								'	     	 		   SCHEDA.formModificato=true;">' +
								'		<option></option>';
						for(let n in puntiElenco){
							// verifico le autorizzazioni
							if(SET.verFreePunti(puntiElenco[n].siglaPunto)){
								HTML += '<option value="'+puntiElenco[n].siglaPunto+'"';
								if(puntiElenco[n].siglaPunto == nPunto+"")HTML += ' SELECTED';
								HTML += '>'+puntiElenco[n].NomePunto+'</option>';
							}
							// --------------------------
						}
						HTML += '	</select>';
					
						// icona visualizzazione
						HTML += '	<img src="img/ico_vedi.png"' +
								'	     width="16"' +
								'	     height="16"' +
								'	     align="absmiddle"' +
								'	     id="ico_vis'+p+'"' +
								'	     style="' +
								'				margin-left:5px;' +
								'				margin-right:7px;' +
								'				margin-top: -4px;' +
								'				cursor:pointer;"' +
								'		 class="occhio"' +
								'		 title="'+htmlEntities(TXT("VisualizzaPunto"))+'"' +
								'		 onClick="SET.selPuntoMod('+p+',\'n-\');">';
					}
					
					// valutazione energetica
					HTML += '	<span id="n-ico_PV'+p+'"' +
							'	      class="valPunto"' +
							'	      onClick="PAZIENTI.selNV('+p+');">'+
							'		<img src="img/ico_PV'+valutazione+'.png"' +
							'	  	     width="16"' +
							'	  	     height="16"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PVDett"))+'"' +
							'	  	     class="occhio valEn"> ' +
							'	</span>';
					
					HTML += '<input id="n-de_'+p+'"' +
							' 		name="n-de_'+p+'"' +
							' 		class="textPuntoTratt okPlaceHolder"' +
							' 		value="'+htmlEntities(descrizione)+'"' +
							' 		placeholder="'+htmlEntities(TXT("SpiegazionePuntoTratt"))+'"' +
							'		onBlur="PAZIENTI.namikoshiProvvisori['+p+'].t=this.value"' +
							'		'+H.noAutoGen+'>';
					HTML += '</div></div>';
				}
				HTML +=	'<div style="clear:both;height:1px;"></div>';
			}else{
				let HTML_noMod = '';
				for(let p in PAZIENTI.namikoshiProvvisori){
					valutazione=__(PAZIENTI.namikoshiProvvisori[p].e);
					mezzo=__(PAZIENTI.namikoshiProvvisori[p].z);
					descrizione=__(PAZIENTI.namikoshiProvvisori[p].t);
					siglaPunto=__(PAZIENTI.namikoshiProvvisori[p].s);
					nPunto=PAZIENTI.namikoshiProvvisori[p].n;
					
					elenco.push(nPunto+'.NK'+valutazione);
					
					HTML_noMod += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
					HTML_noMod += siglaPunto;
					if(valutazione)HTML_noMod += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
					if(descrizione)HTML_noMod += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
					HTML_noMod += '</span> ';
				}
				HTML = '<span style="margin-bottom: 15px;display: inline-block;">'+HTML_noMod+'</span>';
			}
		}else{
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes") +'...' +
					'</div>';
		}
		document.getElementById('totNamikoshi').innerHTML = PAZIENTI.namikoshiProvvisori.length;
		document.getElementById('puntiNamikoshi').innerHTML=HTML;
		PAZIENTI.vis_tabs();
		
		if(ev>-1){
			setTimeout(function(){document.getElementById("rg_"+ev)?.classList.remove("eviPunto");},2000);
		}
		try{
			if( globals.set.cartella == 'meridiani_shiatsu' && 
			LOGIN.verModule("NMK") &&
				elenco &&
				localStorage.sistemaMeridiani=='NMK')SET.evidenziaPuntoMod(elenco);
		}catch(err){}
		
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	aggiungiNamikoshiTrattamento: function( PT ){ // aggiunge un singolo punto al trattamento;
		JSNPUSH = {
			m: 'NK',
			n: PT,
			s: DB.set.meridiani.NK.punti[SET.ptToStr(PT)].NomePunto,
			z: PAZIENTI.mezzoProvvisorio,
			e: "",
			t: ""
		}
		PAZIENTI.namikoshiProvvisori.push(JSNPUSH);
		SCHEDA.formModificato = true;
		PAZIENTI.caricaNamikoshiTrattamento();
		document.getElementById("grpNmk").selectedIndex = 0;
	},
	eliminaNamikoshiTrattamento: function( n ){ // elimina un punto del trattamento
		SET.overPunto(document.getElementById("n-rg_"+n),false);
		PAZIENTI.namikoshiProvvisori.splice(n, 1); 
		PAZIENTI.caricaNamikoshiTrattamento();
		SCHEDA.formModificato = true;
	},
	selNV: function( n ){ // cambia la valutazione energetica
		let html = '',
			pvs = [ '', 'D' ];
		for(let m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaNV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'">' +
					(smartMenu ? htmlEntities(TXT("Valutazione"+pvs[m])).toUpperCase() : '') +
					'</span>';
		}
		H.selTT(n,"n-ico_PV",html);
	},
	cambiaNV: function( n, m ){ // cambia la valutazione energetica su un punto
		let el = document.getElementById("n-ico_PV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		PAZIENTI.namikoshiProvvisori[n].e = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricNamikoshi("formMod",n,'n-');
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	cambiaNZ: function( n, m, isProc=false ){ // cambia il mezzo su un punto
		let el = document.getElementById((isProc?'':'n-')+"ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		if(globals.modello.cartella)SET.overPunto(el.parentElement.parentElement,false);
		if(!isProc){
			PAZIENTI.namikoshiProvvisori[n].z = m;
		}else{
			let pD = SET.dettagliProvvisori[n].DescrizioneDettaglio.split(".");
			SET.dettagliProvvisori[n].DescrizioneDettaglio = __(pD[0])+"."+__(pD[1])+"."+__(pD[2])+"."+__(m);
			SET.caricaDettagli();
		}
		SCHEDA.formModificato = true;
		if(globals.modello.cartella)SET.overPunto(el.parentElement.parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
		PAZIENTI.verMezzo(m);
	},
	spostaNamikoshi: function( elMove, elTarget ){ // sposta dopo il drag&drop
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		let fromIndex = parseInt(elMove.parentElement.id.split("_")[1]),
			toIndex = parseInt(elTarget.id.split("_")[1]),
			arr2 = PAZIENTI.namikoshiProvvisori.splice(fromIndex, 1)[0]; // l'elemento eliminato va in arr2
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		PAZIENTI.namikoshiProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaNamikoshiTrattamento(toIndex);
		SCHEDA.formModificato = true;
	},
	
	// visualizzazione tabs
	vis_tabs: function(){
		if(	!document.getElementById("scheda").classList.contains("scheda_A") &&
			!document.getElementById("scheda").classList.contains("scheda_B"))return;
		
		document.getElementById('tratt_cont_diagnosi').getElementsByClassName("spiegazioneAI")[0].classList.remove("nasTab");
		document.getElementById('tratt_cont_diagnosi').getElementsByClassName("diagnosiBtns")[0].classList.remove("nasTab");

		let elsTab = [
			'tratt_cont_punti',
			'tratt_cont_meridiani',
			'tratt_cont_auriculo',
			'tratt_cont_reflex',
			'tratt_cont_trigger',
			'tratt_cont_namikoshi'
		];
		for(e in elsTab){
			document.getElementById(elsTab[e]).classList.remove("nasTab");
		}

		if(	!PAZIENTI.puntiProvvisori.length && 
			!( 	globals.set.cartella == 'meridiani_cinesi' || 
				(globals.set.cartella == 'meridiani_shiatsu' && LOGIN.verModule("CIN"))) )document.getElementById('tratt_cont_punti').classList.add("nasTab");
		if(	( 	!(globals.set.cartella == 'meridiani_cinesi' || 
				(globals.set.cartella == 'meridiani_shiatsu' && LOGIN.verModule("CIN")))) ){
					document.getElementById('tratt_cont_diagnosi').getElementsByClassName("spiegazioneAI")[0].classList.add("nasTab");
					document.getElementById('tratt_cont_diagnosi').getElementsByClassName("diagnosiBtns")[0].classList.add("nasTab");
		}
		if(	!PAZIENTI.meridianiProvvisori.length &&
			!(	globals.set.cartella == 'meridiani_cinesi' || 
				(globals.set.cartella == 'meridiani_shiatsu' && (LOGIN.verModule("CIN") || LOGIN.verModule("MAS")))) )document.getElementById('tratt_cont_meridiani').classList.add("nasTab");
		if(	!PAZIENTI.auriculoProvvisori.length &&
			globals.set.cartella != 'auricologia' )document.getElementById('tratt_cont_auriculo').classList.add("nasTab");
		if(	!PAZIENTI.reflexProvvisori.length &&
			globals.set.cartella != 'reflessologia_plantare' )document.getElementById('tratt_cont_reflex').classList.add("nasTab");
		if(	!PAZIENTI.triggerProvvisori.length && 
			globals.set.cartella!='trigger_points')document.getElementById('tratt_cont_trigger').classList.add("nasTab");
		if(	!PAZIENTI.namikoshiProvvisori.length &&
			!(globals.set.cartella == 'meridiani_shiatsu' && LOGIN.verModule("NMK")) )document.getElementById('tratt_cont_namikoshi').classList.add("nasTab");
		/* let numNas = 0
			maxNas = 0;
		for(e in elsTab){
			maxNas++;
			if(document.getElementById(elsTab[e]).classList.contains("nasTab"))numNas++;
		}
		document.getElementById('labelTrattamento').classList.toggle("nasTab",numNas==maxNas); */
	},
	
	// ALERT sui mezzi (anticoagulanti e pace-maker)
	verMezzo: function( m ){
		if(m=='salasso'){
			ALERT(TXT("AlertMezzoSalasso"));
		}
		if(m=='elettro_agopuntura'){
			ALERT(TXT("AlertMezzoElettroAgopuntura"));
		}
	}
	
}