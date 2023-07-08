var PAZIENTI_SETS = {
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
		M: []
	},
	mezzoProvvisorio: '',
	elencoGruppoPunti: {},
	elencoGruppoAtt: {},
	tipoGruppo: '', // M (meridiani) - P (punti) - A (auricolo-punti)
	
	// punti
	modNumPunti: function( frm, n ){ // al cambio di punti o meridiano
		var mr=document[frm][".mr_"+n];
		if(typeof(DB.set.meridiani[mr])!='undefined'){
			var punto=edocument[frm][".pt_"+n];
			var maxL=punto.options.length;
			for(a=maxL;a>=0;a--){
				punto.options[a]=null;
			}
			var mrProc=new Array();
			for(let k in DB.set.meridiani){
				mrProc[k]=Object.keys(DB.set.meridiani[k].punti).length;
			}
			for(a=mrProc[mr.value];a>=1;a--){
				punto.options[a]=new Option('',encodeURIComponent(a),false,false);
				var siglaPunto = a;
				if(DB.set.meridiani[mr.value].punti[SET.ptToStr(a)].siglaPunto){
					siglaPunto = DB.set.meridiani[mr.value].punti[SET.ptToStr(a)].siglaPunto;
					siglaPunto = siglaPunto.substr(3,siglaPunto.length-3);
				}
				punto.options[a].innerHTML=siglaPunto;
			}
			punto.options[0]=null;
			if(mr.options[0].value=='')mr.options[0]=null;
			document.getElementById("ico_vis"+n).style.display="inline";
		}
		PAZIENTI.ricGroup(frm,n);
	},
	ricGroup: function( frm, n, addN='' ){
		SET.delAllEviPalls("Over");
		var mr=document[frm][addN+"mr_"+n].value;
		var pt=document[frm][addN+"pt_"+n].value;
		var de=document[frm][addN+"de_"+n].value;
		if(DB.set.meridiani[mr]){
			var siglaPunto = __(DB.set.meridiani[mr].punti[SET.ptToStr(pt)].siglaPunto, pt+"."+mr);
			document[frm][addN+"hd_"+n].value=siglaPunto;
		}
		
		var hd=document[frm][addN+"hd_"+n].value;
		var elenco = [];
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
		var html = '';
		var mzs = PAZIENTI.mezziSet[tipo];
		for(let m in mzs){
			html += '<span style="background-image:url(img/mezzo_'+mzs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambia'+tipo+'Z('+n+',\''+mzs[m]+'\','+isProc+');"' +
					'	   title="'+htmlEntities(PAZIENTI.mezzi[mzs[m]])+'"></span>';
		}
		H.selTT(n,((tipo=='N' && !isProc)?"n-":"")+"ico_PZ",html);
	},
	
	caricaPuntiTrattamento: function( ev = -1 ){ // carica i punti del trattamento
		document.getElementById('puntiMTC').style.display = 'block';
		document.getElementById('label_puntiMTC').style.display = 'block';
		var elenco = [];
		var HTML = '<div></div>'; // serve lasciarlo per il drag&drop
		var HTML_noMod = '';
		
		if(PAZIENTI.puntiProvvisori.length){
			if( globals.set.cartella == 'meridiani_cinesi' || 
				globals.set.cartella == 'meridiani_shiatsu' ){
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
					var addMezzoTit = '';
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
					if(typeof(DB.set.meridiani[siglaMeridiano])=='undefined'){
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
							HTML+='<option value="'+k+'"';
							if(siglaMeridiano==k){
								HTML+=' SELECTED';
								totPunti= Object.keys(DB.set.meridiani[k].punti).length;
							}
							HTML+=	'>'+SET.convSigla(k) +
									'</option>';
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
							let s = keys[i];
							var TS = DB.set.meridiani[siglaMeridiano].punti[s];
							
							var siglaPunto = +s;
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
		
		
		if(ev>-1){
			setTimeout(function(){document.getElementById("rg_"+ev).classList.remove("eviPunto")},2000);
		}
		
		try{
			if( (globals.set.cartella == 'meridiani_cinesi' || 
				globals.set.cartella == 'meridiani_shiatsu' && localStorage.sistemaMeridiani!='NMK') && 
				elenco)SET.evidenziaPuntoMod(elenco);
		}catch(err){}
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	ricPuntiTratt: function(){ // ricarica i punti del trattamento (dopo un'azione es. elimina o nuovo)
		if(	PAZIENTI.puntiProvvisori.length && 
			(globals.set.cartella == 'meridiani_cinesi' || globals.set.cartella == 'meridiani_shiatsu') ){
			var puntiProvvisori='';
			for(let p in PAZIENTI.puntiProvvisori){
				var im=document.getElementById("ico_PV"+p).getElementsByTagName("img")[0].src;
				if(im.indexOf("ico_PV.")!==-1)imPV='';
				else if(im.indexOf("ico_PVV.")!==-1)imPV='V';
				else if(im.indexOf("ico_PVP.")!==-1)imPV='P';
				else imPV='D';
				PAZIENTI.puntiProvvisori[p].n = document.getElementById('pt_'+p).value;
				PAZIENTI.puntiProvvisori[p].m = document.getElementById('mr_'+p).value;
				PAZIENTI.puntiProvvisori[p].s = document.getElementById('hd_'+p).value;
				PAZIENTI.puntiProvvisori[p].e = imPV;
				/*var n=0;
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
		var n = PT.split(".")[0];
		var siglaMeridiano = PT.split(".")[1];
		var siglaPunto = __(DB.set.meridiani[siglaMeridiano].punti[SET.ptToStr(n)].siglaPunto, PT);
		PAZIENTI.puntiProvvisori.push({
			n: n,
			m: siglaMeridiano,
			e: '',
			z: '',
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
		var presenti=false;
		var pass=true;
		var totAggiunti = 0;
		for(let p in punti){
			// verifico che non ci sia già
			pass=true;
			if(PAZIENTI.tipoGruppo=='P'){
				var n = punti[p].split(".")[0];
				var siglaMeridiano = punti[p].split(".")[1];
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
				var siglaMeridiano = punti[p].split(".")[0];
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
				var siglaPunto = punti[p].split(".")[0];
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
			if(PAZIENTI.tipoGruppo=='N'){
				var siglaPunto = punti[p].split(".")[0];
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
		var el = document.getElementById("ico_PV"+n);
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
		var el = document.getElementById("ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		if(globals.modello.cartella)SET.overPunto(document.getElementById("pt_"+n).parentElement.parentElement,false);
		if(!isProc){
			PAZIENTI.puntiProvvisori[n].z = m;
			PAZIENTI.ricGroup("formMod",n);
		}else{
			var pD = SET.dettagliProvvisori[n].DescrizioneDettaglio.split(".");
			SET.dettagliProvvisori[n].DescrizioneDettaglio = __(pD[0])+"."+__(pD[1])+"."+__(pD[2])+"."+m;
			SET.caricaDettagli();
		}
		SCHEDA.formModificato = true;
		if(globals.modello.cartella)SET.overPunto(document.getElementById("pt_"+n).parentElement.parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
		PAZIENTI.verMezzo(m);
	},
	selPV: function( n ){ // cambia la valutazione energetica
		var html = '';
		var pvs = [ '', 'V', 'P', 'D' ];
		for(let m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaPV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'"></span>';
		}
		H.selTT(n,"ico_PV",html);
	},
	spostaPunto: function( elMove, elTarget ){ // sposta dopo il drag&drop
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		var fromIndex = parseInt(elMove.parentElement.id.split("_")[1]);
		var toIndex = parseInt(elTarget.id.split("_")[1]);
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		var arr2 = PAZIENTI.puntiProvvisori.splice(fromIndex, 1)[0];
		PAZIENTI.puntiProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaPuntiTrattamento(toIndex);
		SCHEDA.formModificato = true;
	},
	
	// meridiani
	caricaMeridianiTrattamento: function( ev = -1 ){ // carica i punti del trattamento
		document.getElementById('meridianiMTC').style.display = 'block';
		document.getElementById('label_meridianiMTC').style.display = 'block';
		var HTML = '<div></div>'; // serve lasciarlo per il drag&drop
		var elenco = [];
		
		if( PAZIENTI.meridianiProvvisori.length ){
			if( globals.set.cartella == 'meridiani_cinesi' || 
				globals.set.cartella == 'meridiani_shiatsu' ){
				var p = -1;
				for(let m in PAZIENTI.meridianiProvvisori){
					p++;
					elenco.push(PAZIENTI.meridianiProvvisori[m].siglaMeridiano);
					var m2 = __(PAZIENTI.meridianiProvvisori[m].valEnergetica);
					var descrizione = __(PAZIENTI.meridianiProvvisori[m].descrizione);
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
				var HTML_noMod = '';
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
		
		if(ev>-1){
			setTimeout(function(){document.getElementById("tr_p"+ev).classList.remove("eviPunto")},2000);
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
		var presente = false;
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
		var el = document.getElementById("ico_MV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		PAZIENTI.meridianiProvvisori[n].valEnergetica = m;
		SCHEDA.formModificato = true;
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	selMV: function( n ){ // cambia la valutazione energetica
		var html = '';
		var pvs = [ '', 'V', 'P', 'D' ];
		for(let m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaMV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'"></span>';
		}
		H.selTT(n,"ico_MV",html);
	},
	spostaMeridiano: function( elMove, elTarget ){ // sposta dopo il drag&drop
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		var fromIndex = parseInt(elMove.dataset.dragEl);
		var toIndex = parseInt(elTarget.getElementsByTagName("div")[0].dataset.dragEl);
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		var arr2 = PAZIENTI.meridianiProvvisori.splice(fromIndex, 1)[0];
		PAZIENTI.meridianiProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaMeridianiTrattamento(toIndex);
		SCHEDA.formModificato = true;
	},
	
	// auriculo-punti
	ricAuriculo: function( frm, n ){ // ricarica tutti i punti
		SET.overPunto("PT"+PAZIENTI.auriculoProvvisori[n].s,false);
		let siglaPunto = document[frm]["pt_"+n].value;
		console.log(siglaPunto)
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
		var HTML = '<div></div>'; // serve lasciarlo per il drag&drop
		var elenco = [];
		if(PAZIENTI.auriculoProvvisori.length){
			if( globals.set.cartella == 'auricologia' ){
				var puntiElenco = [];
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
					elenco.push(siglaPunto);
					
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
					var addMezzoTit = '';
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
							if(SET.verFreePunti(puntiElenco[n].siglaPunto)){
								HTML += '<option value="'+puntiElenco[n].siglaPunto+'"';
								if(siglaPunto==puntiElenco[n].siglaPunto)HTML += ' SELECTED';
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
				var HTML_noMod = '';
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
		
		if(ev>-1){
			setTimeout(function(){document.getElementById("rg_"+ev).classList.remove("eviPunto")},2000);
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
		var html = '';
		var pvs = [ '', 'D' ];
		for(let m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaAV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'"></span>';
		}
		H.selTT(n,"ico_PV",html);
	},
	cambiaAV: function( n, m ){ // cambia la valutazione energetica su un punto
		var el = document.getElementById("ico_PV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		//SET.overPunto(document.getElementById("pt_"+n).parentElement,false);
		PAZIENTI.auriculoProvvisori[n].e = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricGroup("formMod",n);
		//SET.overPunto(document.getElementById("pt_"+n).parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	cambiaAZ: function( n, m, isProc=false ){ // cambia il mezzo su un punto
		var el = document.getElementById("ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		if(globals.modello.cartella)SET.overPunto("_PT"+m,false);
		if(!isProc){
			PAZIENTI.auriculoProvvisori[n].z = m;
		}else{
			var pD = SET.dettagliProvvisori[n].DescrizioneDettaglio.split(".");
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
		var fromIndex = parseInt(elMove.parentElement.id.split("_")[1]);
		var toIndex = parseInt(elTarget.id.split("_")[1]);
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		var arr2 = PAZIENTI.auriculoProvvisori.splice(fromIndex, 1)[0];
		PAZIENTI.auriculoProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaAuriculoTrattamento(toIndex);
		SCHEDA.formModificato = true;
	},
	
	
	// punti namikoshi
	ricNamikoshi: function( frm, n ){ // ricarica tutti i punti	
		//SET.overPunto(document.getElementById("n-rg_"+n),false);
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
		var HTML = '<div></div>'; // serve lasciarlo per il drag&drop
		var elenco = [];
		if(PAZIENTI.namikoshiProvvisori.length){
			if( globals.set.cartella == 'meridiani_shiatsu' ){
				var puntiElenco = [];
				for(let siglaPunto in DB.set.meridiani.NK.punti){
					if(__(DB.set.meridiani.NK.punti[siglaPunto])){
						if(	__(DB.set.meridiani.NK.punti[siglaPunto].apparato,-1)>-1 && 
							DB.set.meridiani.NK.punti[siglaPunto].NomePunto){
							var pP = DB.set.meridiani.NK.punti[siglaPunto].siglaPunto.split("-");
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
					var addMezzoTit = '';
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
					if(globals.set.cartella != 'meridiani_shiatsu'){
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
							' 		placeholder="'+htmlEntities(TXT("SpiegazioneAuriculoTratt"))+'"' +
							'		onBlur="PAZIENTI.namikoshiProvvisori['+p+'].t=this.value"' +
							'		'+H.noAutoGen+'>';
					HTML += '</div></div>';
				}
				HTML +=	'<div style="clear:both;height:1px;"></div>';
			}else{
				var HTML_noMod = '';
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
		
		if(ev>-1){
			setTimeout(function(){document.getElementById("rg_"+ev).classList.remove("eviPunto")},2000);
		}
		try{
			if( globals.set.cartella == 'meridiani_shiatsu' && 
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
		var html = '';
		var pvs = [ '', 'D' ];
		for(let m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaNV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'"></span>';
		}
		H.selTT(n,"n-ico_PV",html);
	},
	cambiaNV: function( n, m ){ // cambia la valutazione energetica su un punto
		var el = document.getElementById("n-ico_PV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		PAZIENTI.namikoshiProvvisori[n].e = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricNamikoshi("formMod",n,'n-');
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	cambiaNZ: function( n, m, isProc=false ){ // cambia il mezzo su un punto
		var el = document.getElementById("n-ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		if(globals.modello.cartella)SET.overPunto(el.parentElement.parentElement,false);
		if(!isProc){
			PAZIENTI.namikoshiProvvisori[n].z = m;
		}else{
			var pD = SET.dettagliProvvisori[n].DescrizioneDettaglio.split(".");
			SET.dettagliProvvisori[n].DescrizioneDettaglio = __(pD[0])+"."+__(m);
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
		var fromIndex = parseInt(elMove.parentElement.id.split("_")[1]);
		var toIndex = parseInt(elTarget.id.split("_")[1]);
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		var arr2 = PAZIENTI.namikoshiProvvisori.splice(fromIndex, 1)[0];
		PAZIENTI.namikoshiProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaNamikoshiTrattamento(toIndex);
		SCHEDA.formModificato = true;
	},
	
	
	// ALERT sui mezzi (anticoagulanti e pace-maker)
	verMezzo: function( m ){
		if(m=='salasso'){
			ALERT(TXT("AlertMezzoSalasso"));
		}
		if(m=='elettro_agopuntura'){
			ALERT(TXT("AlertMezzoElettroAgopuntura"));
		}
	},
	
	
	// importazione GRUPPI di punti, meridiani e auriculopunti
	gruppoPunti: function( tipo = 'P' ){ // costruisce il JSON dei gruppi punti (all'apertura del trattamento)
		PAZIENTI.tipoGruppo = tipo;
		applicaLoading(document.getElementById("scheda_testo"));
		document.getElementById("LL").onclick = function(){PAZIENTI.swGruppoPunti();};
		
		PAZIENTI.elencoGruppoPunti = {};
		PAZIENTI.elencoGruppoPunti.titolo = "";
		PAZIENTI.elencoGruppoPunti.contenuto = [];
		PAZIENTI.elencoGruppoPunti.livello = 1;
		var presenti = false;
		
		// punti da MERIDIANI
		if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='M' || PAZIENTI.tipoGruppo=='A'){
			EL = {};
			EL.contenuto = [];
			if(PAZIENTI.tipoGruppo=='P')EL.livello = 2;
			else EL.livello = 3;
			EL.parent = PAZIENTI.elencoGruppoPunti;
			var n = -1;
			if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='M'){
				EL.titolo = TXT("MeridianiTrattamento");
				for(let m in DB.set.meridiani){
					// verifico le autorizzazioni
					if(SET.verFreeMeridiani(m) && m!='NK'){
						n++;
						if(PAZIENTI.tipoGruppo=='P'){ // punti
							EL.contenuto[n] = {};
							EL.contenuto[n].titolo = DB.set.meridiani[m].NomeMeridiano;
							EL.contenuto[n].contenuto = [];
							EL.contenuto[n].livello = 3;
							EL.contenuto[n].parent = EL;

							let myObj = DB.set.meridiani[m].punti,
								keys = 	Object.keys(myObj),
								len = keys.length;
							keys.sort();		
							for (let i=0; i<len; i++) {	
								let pm = keys[i];
								if(DB.set.meridiani[m].punti[pm].NomePunto){
									var pt = DB.set.meridiani[m].punti[pm].NomePunto.split(". ")[0];
									EL.contenuto[n].contenuto.push(pt);
								}
							}	
						}
						if(PAZIENTI.tipoGruppo=='M'){ // meridiani
							if(m!='EX')EL.contenuto.push(m);
						}
					}
					// --------------------------
				}
			}
			if(PAZIENTI.tipoGruppo=='A'){ // auricolo-punti
				var puntiElenco = [];
				for(let siglaPunto in DB.set.punti){
					// verifico le autorizzazioni
					if(SET.verFreePunti(siglaPunto)){ // verifico le autorizzazioni
						if(__(DB.set.punti[siglaPunto])){
							puntiElenco.push({
								siglaPunto: siglaPunto,
								NomePunto: DB.set.punti[siglaPunto].NomePunto
							});
						}
					}
					// --------------------------
				}
				puntiElenco.sort(sort_by("NomePunto", false));
				
				EL.titolo = TXT("PuntiAuriculo");
				for(a in puntiElenco){
					if(puntiElenco[a].NomePunto){
						EL.contenuto.push(puntiElenco[a].siglaPunto);
					}
				}
			}
			PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
		}
		
		// solo Namikoshi
		if(PAZIENTI.tipoGruppo=='N'){
			EL = {};
			EL.contenuto = [];
			EL.livello = 3;
			EL.parent = PAZIENTI.elencoGruppoPunti;
			var n = -1;
			EL.titolo = TXT("PuntiNamikoshi");

			let myObj = DB.set.meridiani['NK'].punti,
				keys = 	Object.keys(myObj),
				len = keys.length;
			keys.sort();		
			for (let i=0; i<len; i++) {	
				let pm = keys[i];
				if(DB.set.meridiani['NK'].punti[pm].NomePunto && __(DB.set.meridiani['NK'].punti[pm].apparato,-1)>-1){
					var pP = DB.set.meridiani['NK'].punti[pm].siglaPunto.split("-");
					EL.contenuto.push(pP[1]+"."+pP[0]);
				}
			}
			PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
		}
		
		// punti da TEORIA
		for(t in DB.set.teoria){
			if(!__(DB.set.teoria[t].noList)){
				EL = {};
				EL.titolo = DB.set.teoria[t].TitoloSezione;
				EL.contenuto = [];
				EL.livello = 2;
				EL.parent = PAZIENTI.elencoGruppoPunti;
				for(let i in DB.set.teoria[t].contenuti){
					EL2 = {};
					EL2.titolo = DB.set.teoria[t].contenuti[i].TitoloTeoria;
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					// scansiono il testo
					var txtTeo=DB.set.teoria[t].contenuti[i].TestoTeoria;
					
					if(PAZIENTI.tipoGruppo=='P' ||
					   PAZIENTI.tipoGruppo=='N')re = /\[\.[0-9]{1,2}\.[A-Z]{2}\.\]/ig;
					if(PAZIENTI.tipoGruppo=='M')re = /\[\.[A-Z]{2}\.\]/ig;
					if(PAZIENTI.tipoGruppo=='A')re = /\[\.[0-9]{3}\.\]/ig;
					var result = txtTeo.match(re);
					for(let k in result){
						var pP = result[k].split(".");
						PT=pP[1];
						if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N')PT += '.'+pP[2];
						if(EL2.contenuto.indexOf(PT)===-1 && 
						   ((PAZIENTI.tipoGruppo=='P' && pP[2]!='NK') || (PAZIENTI.tipoGruppo=='N' && pP[2]=='NK')) ){
							var pass = true;
							
							// verifico le autorizzazioni
							if(PAZIENTI.tipoGruppo=='M')pass = SET.verFreeMeridiani(PT)
							else pass = SET.verFreePunti(PT);
							// --------------------------
							
							if(pass){
								EL2.contenuto.push(PT);
								presenti = true;
							}
						}
					}
					if(PAZIENTI.tipoGruppo=='A'){
						var gr = DB.set.teoria[t].contenuti[i].gruppo;
						if(gr){
							var punti = GEOMETRIE.gruppi[gr].punti;
							for(let k in punti){
								var PT = punti[k];
								// verifico le autorizzazioni
								if(SET.verFreePunti(PT)){
									if(EL2.contenuto.indexOf(PT)===-1){
										EL2.contenuto.push(PT);
										presenti = true;
									}
								}
								// --------------------------
							}
						}
					}
					//if(puntiTeoGroup){
					if(EL2.contenuto.length){
						EL.contenuto[i] = EL2;
					}
				}
				//if(HTML_provv && t*1>0){
				if(EL.contenuto.length && t*1>0){
					PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
				}
			}
		}
		
		// punti da PROCEDURE
		if(DB.procedure){
			EL = {};
			EL.titolo = TXT("Procedure");
			EL.contenuto = [];
			EL.livello = 2;
			EL.parent = PAZIENTI.elencoGruppoPunti;
			
			var PRS = clone(DB.procedure.data);
			PRS.sort(sort_by("NomeProcedura", false));
			var presenti=false;
			for(let p in PRS){
				if(!PRS[p].Cancellato){
					EL2 = {};
					EL2.titolo = PRS[p].NomeProcedura;
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					// scansiono i dettagli
					for(let i in PRS[p].dettagliProcedura){
						var DT = PRS[p].dettagliProcedura[i];
						if(DT.TipoDettaglio==PAZIENTI.tipoGruppo){
							if(DT.DescrizioneDettaglio.length>1){
								EL2.contenuto.push(DT.DescrizioneDettaglio);
							}
						}
					}
					if(EL2.contenuto.length){
						EL.contenuto[p] = EL2;
						presenti=true;
					}
				}
			}
			if(presenti){
				PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
			}
		}
		setTimeout(function(){
			if(CONN.getConn() && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
				// carico i preferiti della community
				var JSNPOST={	"idLinguaRic": 0,
								"parolaRic": "",
								"parolaRicCrypt": "",
								"prefRic": "1",
								"record": 0 };
				
				CONN.caricaUrl(	"community_elenco.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								"PAZIENTI.caricaPuntiPreferiti" );
			}else PAZIENTI.caricaPuntiPatologie();
		}, 500 );
	},
	caricaPuntiPreferiti: function(txt){ // importa i punti delle procedure preferite nella community
		var err=false;
		var record_tot=0;
		var presente=false;
		if(txt.substr(0,3) != '404' && txt != 'vuoto'){
			
			
			if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N' || PAZIENTI.tipoGruppo=='A'){ // DA RIVEDERE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<|!!!!!!!!!!!!!!!!
				
				
				EL = {};
				EL.titolo = TXT("CommunityPreferiti");
				EL.contenuto = [];
				EL.livello = 2;
				EL.parent = PAZIENTI.elencoGruppoPunti;
				var presenti = false;
				var preferiti = JSON.parse(txt);
				for(let p in preferiti.dati){
					EL2 = {};
					EL2.titolo = preferiti.dati[p].NomeProcedura+' ('+htmlEntities(preferiti.dati[p].Pseudonimo);
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					if(preferiti.dati[p].elencoPunti.length>1){
						var elenco = preferiti.dati[p].elencoPunti.split("|");
						if(PAZIENTI.tipoGruppo=='M')elenco = preferiti.dati[p].elencoMeridiani.split("|");
						for(let pr in elenco){
							var PT = elenco[pr];
							if(PT){
								EL2.contenuto.push(PT);
								presenti=true;
							}
						}
					}
					EL.contenuto[p] = EL2;
				}
				PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
			}
		}
		PAZIENTI.caricaPuntiPatologie();
	},
	caricaPuntiPatologie: function(){ // importa i punti delle schede patologie 
		var totPatologie = 0;
		EL = {};
		EL.titolo = TXT("Patologie");
		EL.contenuto = [];
		EL.livello = 2;
		EL.parent = PAZIENTI.elencoGruppoPunti;
		for(let i in DB.set.patologie){
			// verifico le autorizzazioni
			if(SET.verFreePatologia(i)){
				EL2 = {};
				EL2.titolo = DB.set.patologie[i].NomePatologia;
				EL2.contenuto = [];
				EL2.livello = 3;
				EL2.parent = EL;
				// scansiono il testo
				var txtPat=DB.set.patologie[i].TestoPatologia;
				if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N')re = /\[\.[0-9]{1,2}\.[A-Z]{2}\.\]/ig;
				if(PAZIENTI.tipoGruppo=='M')re = /\[\.[A-Z]{2}\.\]/ig;
				if(PAZIENTI.tipoGruppo=='A'){
					var list = SET.getListPointPat(i);
					for(l in list){
						if(SET.verFreePunti(list[l])){ // verifico le autorizzazioni
							EL2.contenuto.push(list[l]);
						}
					}
					re = /\[\.[0-9]{3}\.\]/ig;
				}
				var result = txtPat.match(re);
				for(let k in result){
					let pP = result[k].split(".");
					let PT = pP[1];
					if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N')PT += '.'+pP[2];
					if(EL2.contenuto.indexOf(PT)==-1){
						var pass = true;
						
						// verifico le autorizzazioni
						if(PAZIENTI.tipoGruppo=='M')pass = SET.verFreeMeridiani(PT)
						else pass = SET.verFreePunti(PT);
						// --------------------------
						if(pass && 
							((PAZIENTI.tipoGruppo=='P' && pP[2]!='NK') ||
							 (PAZIENTI.tipoGruppo=='N' && pP[2]=='NK')))EL2.contenuto.push(PT);
					}
				}
				if(EL2.contenuto.length){
					EL.contenuto[i] = EL2; 
					totPatologie += EL2.contenuto.length;
				}
			}
			// ---------------------------
		}
		if(totPatologie)PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
		PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoPunti;
		PAZIENTI.swGruppoPunti();
	},
	swGruppoPunti: function(){ // visualizza/nasconde il menu del gruppo punti in un trattamento
		if(!document.getElementById("gruppoPunti_cont").classList.contains("visSch")){
			rimuoviLoading(document.getElementById("scheda_testo"));
			applicaLoading(document.getElementById("scheda_testo"),'vuoto');
			document.getElementById("LL").onclick = function(){PAZIENTI.swGruppoPunti();};
			var w = (document.getElementById("scheda_testo").scrollWidth-60);
			var l = 30;
			var maxW = 400;
			if(w>maxW){
				w = maxW;
				l = (document.getElementById("scheda").scrollWidth/2-maxW/2);
			}
			document.getElementById("gruppoPunti_cont").style.left = l+"px";
			document.getElementById("gruppoPunti_cont").style.width = w+"px";
			document.getElementById("gruppoPunti_cont").style.top = '118px';
			document.getElementById("gruppoPunti_cont").classList.add("visSch");
			PAZIENTI.popolaGruppoPunti();
		}else{
			document.getElementById("LL").onclick = '';
			rimuoviLoading(document.getElementById("scheda_testo"));
			document.getElementById("gruppoPunti_cont").classList.remove("visSch");
		}
	},
	popolaGruppoPunti: function(){ // popola il menu dei gruppi di punti in base al JSON creato
		var HTML = '';
		var txt = htmlEntities(TXT("ImportaPunti"));
		if(PAZIENTI.tipoGruppo=='M')txt = htmlEntities(TXT("ImportaMeridiani"));
		HTML += '<div class="gr_tit">' +
					txt +
				'	<span onClick="PAZIENTI.swGruppoPunti();">' +
				'</span>' +
				'</div>';
		if(PAZIENTI.elencoGruppoAtt.livello>1){
			var titRet = htmlEntities(PAZIENTI.elencoGruppoAtt.titolo);
			HTML += '<div class="gr_ret">' +
					'	<div class="gr_ret_img" onClick="PAZIENTI.swGrLabel(-1);"></div>' +
					'	<div class="gr_ret_txt">'+titRet+'</div>' +
					'	<input id="gr_ret_ric" onKeyUp="PAZIENTI.filtraGruppoPunti();">' +
					'</div>';
		}
		HTML += '<div class="gr_'+(PAZIENTI.elencoGruppoAtt.livello-1)+'">';
		for(let k in PAZIENTI.elencoGruppoAtt.contenuto){
			if(PAZIENTI.elencoGruppoAtt.livello<3){
				HTML += '<div class="gr_btn"' +
						'	  id="gr_btn_'+k+'"' +
						'	  onClick="PAZIENTI.swGrLabel('+k+');">' +
							PAZIENTI.elencoGruppoAtt.contenuto[k].titolo +
						'</div>';
			}else{
				HTML += PAZIENTI.ptGruppo(PAZIENTI.elencoGruppoAtt.contenuto[k],'ch_'+k);
			}
		}
		HTML += '</div>';
		if(PAZIENTI.elencoGruppoAtt.livello==3){
			HTML += '<div class="gr_imp">'+
					'	<span id="grSelAll" onClick="PAZIENTI.ptGruppoSelAll(this);">' +
							htmlEntities(TXT("SelezionaTutti")) +
					'	</span>' +
					'	<span id="grImporta" onClick="PAZIENTI.ptGruppoImporta();">' +
							htmlEntities(TXT("Importa")) +
					'	</span>';
			var mzs = [];
			if( globals.set.cartella=='meridiani_cinesi' || 
				globals.set.cartella=='meridiani_shiatsu' )mzs = PAZIENTI.mezziSet.P;
			if(globals.set.cartella=='auricologia')mzs = PAZIENTI.mezziSet.A;
			if(mzs.length && PAZIENTI.mezziSet[PAZIENTI.tipoGruppo].length){
				HTML += '	<span class="separatorePulsanti"></span><div id="tt_mezzival2">';
				for(let m in mzs){
					HTML += '<span style="background-image:url(img/mezzo_'+mzs[m]+'.png);"' +
							'	   onClick="PAZIENTI.cambiaGZ(\''+mzs[m]+'\');"' +
							'	   data-mezzo="'+mzs[m]+'"';
					if(!__(localStorage["mezzoDefault"+globals.set.cartella]) && m==0)HTML += ' class="mzSel"';
					if(localStorage["mezzoDefault"+globals.set.cartella]==mzs[m])HTML += ' class="mzSel"';
					HTML += '	   title="'+htmlEntities(PAZIENTI.mezzi[mzs[m]])+'"></span>';
				}
				HTML += '</div>';
				if(__(localStorage["mezzoDefault"+globals.set.cartella]))PAZIENTI.mezzoProvvisorio = __(localStorage["mezzoDefault"+globals.set.cartella]);
			}
			HTML += '</div>';
		}
		document.getElementById("gruppoPunti_cont").innerHTML = HTML;
		document.getElementById("gruppoPunti_cont").classList.toggle("addOpts",(PAZIENTI.tipoGruppo!='M'));
		document.getElementById("gruppoPunti_cont").scrollTo(0,0);
		if(document.getElementById("gr_ret_ric"))document.getElementById("gr_ret_ric").focus();
	},
	filtraGruppoPunti: function(){
		var tag = 'div';
		var lista = '.gr_1';
		var cont = document.getElementById("gruppoPunti_cont");
		if(cont.getElementsByClassName("gr_2").length){
			tag = 'label';
			lista = '.gr_2';
		}
		var val = document.getElementById("gr_ret_ric").value.toLowerCase().trim();
		var tags = document.querySelector(lista).getElementsByTagName(tag);
		for(t=0;t<tags.length;t++){
			var txt = tags[t].innerText+"";
			if(txt.toLowerCase().indexOf(val)>-1 || !val)tags[t].classList.remove("hide");
			else{
				//if(tag=='label')tags[t].getElementsByTagName("input")[0].checked = false;
				tags[t].classList.add("hide");
			}
		}
	},
	swGrLabel: function( k ){ // cambia il livello di visualizzazione del menu dei gruppi di punti
		if(PAZIENTI.overAll)return;
		if(k>-1)PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoAtt.contenuto[k];
		else PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoAtt.parent;
		PAZIENTI.popolaGruppoPunti();
	},
	ptGruppo: function( PT, n ){ // scrive la riga del punto da selezionare nel menu dei gruppi di punti
		var pP = PT.split(".");
		var HTML = '';
		var nPunto = '';
		var mer = pP[0];
		if(pP[1]){
			mer = pP[1];
			nPunto = SET.ptToStr(pP[0]);
		}
		if((pP[0] && __(DB.set?.meridiani?.[mer])) || !pP[1]){
			HTML += '<label class="gr_3"' +
					'		for="'+n+'">' +
					'	<input type="checkbox"' +
					'		   id="'+n+'"' +
					'		   value="'+PT+'"';
			if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N'){
				var siglaPT = __(DB.set.meridiani[mer].punti[nPunto].siglaPunto,nPunto+"."+SET.convSigla(mer));
				if(mer=='EX')HTML += '		   data-sigla-punto="'+siglaPT+'"';
				if(mer=='NK')HTML += '		   data-sigla-punto="'+DB.set.meridiani[mer].punti[nPunto].NomePunto+'"';
			}
			HTML += '>';
			if(PAZIENTI.tipoGruppo=='P'){
				HTML +=	'<b>'+siglaPT+'.</b>' +
						'<i>'+DB.set.meridiani[mer].punti[nPunto].NomePunto.replace(PT+".","")+'</i>';
			}
			if(PAZIENTI.tipoGruppo=='N'){
				HTML +=	'<b>'+DB.set.meridiani[mer].punti[nPunto].NomePunto+'</b>';
			}
			if(PAZIENTI.tipoGruppo=='M'){
				HTML +=	DB.set.meridiani[PT].NomeMeridiano;
			}
			if(PAZIENTI.tipoGruppo=='A'){
				HTML +=	DB.set.punti[pP[0]].NomePunto;
			}
			HTML +=	'</label>';
		}
		return HTML;
	},
	ptGruppoSelAll: function( el ){ // seleziona tutti i punti visualizzati del menu dei gruppi di punti
		var els = el.parentElement.parentElement.getElementsByTagName("input");
		var sel = '';
		for(e in els){
			if(els[e].type=='checkbox'){
				if(!els[e].parentElement.classList.contains("hide")){
					if(sel==''){
						if(els[e].checked)sel = false;
						else sel = true;
					}
					els[e].checked = sel;
				}else els[e].checked = false;
			}
		}
	},
	ptGruppoImporta: function(){ // importa il gruppo dei punti nel trattamento
		var isProc = (document.getElementById("scheda").classList.contains("scheda_procedura"));
		var els = document.getElementById("gruppoPunti_cont").getElementsByTagName("input");
		let punti = [];
		for(e in els){
			if(els[e].checked && els[e].type=='checkbox'){
				let punto = els[e].value;
				if(	globals.set.cartella == 'meridiani_cinesi' ||
					globals.set.cartella == 'meridiani_shiatsu' ){
						punto += ".";
						if(els[e].dataset.siglaPunto)punto += els[e].dataset.siglaPunto;
					}
				punto += "."+PAZIENTI.mezzoProvvisorio;
				punti.push(punto);
			}
		}
		if(punti.length){
			if(!isProc)PAZIENTI.aggiungiGruppoTrattamento(punti);
			else SET.aggiungiGruppoProcedura(punti);
			PAZIENTI.swGruppoPunti();
			PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoPunti;
		}else ALERT(TXT("ErroreImportaPunti"));
	},
	evidenziaAggiunti: function( cont, n ){ // evidenzia in blu i punti aggiunti
		var els = cont.getElementsByClassName("rgProcMod");
		for(e=els.length-1;e>=0;e--){
			if(n>0){
				els[e].classList.add("aggiunti");
				n--;
			}
		}
		setTimeout(function(cont){
			if(cont){
				var els = cont.getElementsByClassName("rgProcMod");
				for(e=els.length-1;e>=0;e--){
					els[e].classList.remove("aggiunti");
				}
			}
		},4000,cont);
	},
	cambiaGZ: function( mezzo, setDefault=false ){ // cambia il mezzo sui punti aggiunti da popup
		if(setDefault)localStorage["mezzoDefault"+globals.set.cartella] = mezzo;
		else PAZIENTI.mezzoProvvisorio = mezzo;
		var els = document.getElementById("tt_mezzival2").getElementsByTagName("span");
		for(e=0;e<els.length;e++){
			els[e].classList.toggle("mzSel",(els[e].dataset.mezzo == mezzo));
		}
		PAZIENTI.verMezzo(mezzo);
	},
}