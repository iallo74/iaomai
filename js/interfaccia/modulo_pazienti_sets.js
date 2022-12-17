
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
		"sferetta_metallicha": TXT("MezzoSferettaMetallica"),
		"elettro_agopuntura": TXT("MezzoElettroAgopuntura"),
		"ago_semipermanente": TXT("MezzoAgoSemipermanente"),
		"crio": TXT("MezzoCrio"),
		"salasso": TXT("MezzoSalasso"),
		"infiltrazione": TXT("MezzoInfiltrazione")
	},
	elencoGruppoPunti: {},
	elencoGruppoAtt: {},
	tipoGruppo: '', // M (meridiani) - P (punti) - A (auricolo-punti)
	
	// tsubo
	modNumPunti: function( frm, n ){ // al cambio di tsubo o meridiano
		var mr=eval("document."+frm+".mr_"+n);
		if(typeof(DB.set.meridiani[mr])!='undefined'){
			var punto=eval("document."+frm+".pt_"+n);
			var maxL=punto.options.length;
			for(a=maxL;a>=0;a--){
				punto.options[a]=null;
			}
			var mrProc=new Array();
			for(k in DB.set.meridiani){
				mrProc[k]=DB.set.meridiani[k].tsubo.length;
			}
			for(a=mrProc[mr.value];a>=1;a--){
				punto.options[a]=new Option('',encodeURIComponent(a),false,false);
				var siglaTsubo = a;
				if(DB.set.meridiani[mr.value].tsubo[a-1].siglaTsubo){
					siglaTsubo = DB.set.meridiani[mr.value].tsubo[a-1].siglaTsubo;
					siglaTsubo = siglaTsubo.substr(3,siglaTsubo.length-3);
				}
				punto.options[a].innerHTML=siglaTsubo;
			}
			punto.options[0]=null;
			if(mr.options[0].value=='')mr.options[0]=null;
			document.getElementById("ico_vis"+n).style.display="inline";
		}
		PAZIENTI.ricGroup(frm,n);
	},
	ricGroup: function( frm, n ){
		var mr=eval("document."+frm+".mr_"+n+".value");
		var pt=eval("document."+frm+".pt_"+n+".value");
		var de=eval("document."+frm+".de_"+n+".value");
		if(DB.set.meridiani[mr]){
			var siglaTsubo = __(DB.set.meridiani[mr].tsubo[pt*1-1].siglaTsubo, pt+"."+mr);
			eval("document."+frm+".hd_"+n+'.value="'+siglaTsubo+'"');
		}
		
		var hd=eval("document."+frm+".hd_"+n+".value");
		if(pt.length == 1)pt = "0"+pt;
		var elenco = '';
		for(p in PAZIENTI.puntiProvvisori){
			if(p*1 == n*1){
				PAZIENTI.puntiProvvisori[p].n = pt*1;
				PAZIENTI.puntiProvvisori[p].m = mr;
				PAZIENTI.puntiProvvisori[p].t = de;
				PAZIENTI.puntiProvvisori[p].s = siglaTsubo;
			}
			elenco += PAZIENTI.puntiProvvisori[p].n+'.'+PAZIENTI.puntiProvvisori[p].m;
			if(PAZIENTI.puntiProvvisori[p].e)elenco += '.'+PAZIENTI.puntiProvvisori[p].e;
			elenco += '|';
		}
		
		try{
			//startAnimate();
			SET.evidenziaTsuboMod(elenco.substr(0,elenco.length-1).split("|"));
			//stopAnimate(true);
		}catch(err){}
	},
	caricaPuntiTrattamento: function(){ // carica i punti del trattamento
		document.getElementById('puntiTsuboMap').style.display = 'block';
		document.getElementById('label_puntiTsuboMap').style.display = 'block';
		var elenco = '';
		var HTML = '<div></div>'; // serve lasciarlo per il drag&drop
		var totTsubo = 0;
		if( globals.set.cartella == 'meridiani_cinesi' || 
			globals.set.cartella == 'meridiani_shiatsu' ){
			if(PAZIENTI.puntiProvvisori.length){
				for(p in PAZIENTI.puntiProvvisori){
					totTsubo++;
					nTsubo=PAZIENTI.puntiProvvisori[p].n*1;
					siglaMeridiano=PAZIENTI.puntiProvvisori[p].m;
					valutazione=__(PAZIENTI.puntiProvvisori[p].e);
					mezzo=__(PAZIENTI.puntiProvvisori[p].z);
					descrizione=__(PAZIENTI.puntiProvvisori[p].t);
					siglaTsubo=__(PAZIENTI.puntiProvvisori[p].s);
					if(!siglaTsubo)siglaTsubo = nTsubo+'.'+siglaMeridiano;
					
					totPunti=0;
					HTML += '<div class="rgProcMod rgMod dettPunto"' +
							'	  id="rg_'+p+'"';
					if(mouseDetect)HTML += 	' onMouseOver="SET.overTsubo(this,true);"' +
											' onMouseOut="SET.overTsubo(this,false);"';
					HTML += '><div class="grabElement"' +
							'	   data-drag-class="lbTsubo"' +
							'	   data-drag-family="tsubo"' +
							'	   data-drag-type="move">' +
							
							'	<div class="grabBtn"' +
							'	     onMouseDown="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaTsubo\');"' +
							'	     onTouchStart="DRAGGER.startDrag(this.parentElement,\'PAZIENTI.spostaTsubo\');"></div>' +
							
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
							'	      onClick="PAZIENTI.selPZ('+p+');">' +
							'		<img src="img/mezzo_'+mezzo+'.png"' +
							'	  	     width="20"' +
							'	  	     height="20"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PZDett"))+'"'+
							'	  	     class="occhio valEn"> ' +
							'	</span>';
							
					
					
					// siglaTsubo (.s in puntiProvvisori)
					HTML += '<input type="hidden" id="hd_'+p+'" name="hd_'+p+'" value="'+siglaTsubo+'">';
					
					// verifico che esista il meridiano (es. EX su ShiatsuMap)
					if(typeof(DB.set.meridiani[siglaMeridiano])=='undefined'){
						HTML += '<span class="ptNo">'+siglaTsubo+'</span>' +
								'<input type="hidden" id="mr_'+p+'" name="mr_'+p+'" value="'+siglaMeridiano+'">' +
								'<input type="hidden" id="pt_'+p+'" name="pt_'+p+'" value="'+nTsubo+'">';
					}else{
						// meridiano
						HTML += '	<select name="mr_'+p+'"' +
								'	     	 id="mr_'+p+'"' +
								'	     	 onChange="this.blur();' +
								'	     	 		   PAZIENTI.modNumPunti(\'formMod\','+p+');"' +
								'	     	 class="selectTratt">' +
								'<option value="">' +
								'</option>';
						for(k in DB.set.meridiani){
							HTML+='<option value="'+k+'"';
							if(siglaMeridiano==k){
								HTML+=' SELECTED';
								totPunti=DB.set.meridiani[k].tsubo.length;
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
						for(n=1;n<=totPunti;n++){
							var siglaTsubo = n;
							if(DB.set.meridiani[siglaMeridiano].tsubo[n-1].siglaTsubo){
								siglaTsubo = DB.set.meridiani[siglaMeridiano].tsubo[n-1].siglaTsubo;
								siglaTsubo = siglaTsubo.substr(3,siglaTsubo.length-3);
							}
							HTML += '<option value="'+n+'"';
							if(nTsubo==n)HTML += ' SELECTED';
							HTML += '>'+siglaTsubo+'</option>';
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
								'		 onClick="SET.selTsuboMod('+p+');">';
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
					elenco += PAZIENTI.puntiProvvisori[p].n+'.'+PAZIENTI.puntiProvvisori[p].m;
					if(PAZIENTI.puntiProvvisori[p].e)elenco += '.'+PAZIENTI.puntiProvvisori[p].e;
					elenco += '|';
				}
				HTML +=	'<div style="clear:both;height:1px;"></div>';
			}
		}else{
			if( PAZIENTI.puntiProvvisori.length ){
				var HTML_noMod = '';
				for(p in PAZIENTI.puntiProvvisori){
					nTsubo=PAZIENTI.puntiProvvisori[p].n*1;
					siglaMeridiano=PAZIENTI.puntiProvvisori[p].m;
					valutazione=__(PAZIENTI.puntiProvvisori[p].e);
					mezzo=__(PAZIENTI.puntiProvvisori[p].z);
					descrizione=__(PAZIENTI.puntiProvvisori[p].t);
					siglaTsubo=__(PAZIENTI.puntiProvvisori[p].s);
					if(!siglaTsubo)siglaTsubo = nTsubo+'.'+siglaMeridiano;
					HTML_noMod += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
					HTML_noMod += '<b>'+siglaTsubo+'</b>';
					if(valutazione)HTML_noMod += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
					if(descrizione)HTML_noMod += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
					HTML_noMod += '</span> ';
					elenco += nTsubo+'.'+siglaMeridiano;
					if(valutazione)elenco += '.'+valutazione;
					elenco += '|';
				}
				totTsubo = PAZIENTI.puntiProvvisori.length;
				HTML = '<span style="margin-bottom: 15px;display: inline-block;">'+HTML_noMod+'</span>';
			}
		}
		if(!totTsubo){
			totTsubo=0;
			
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes") +'...' +
					'</div>';
		}
		document.getElementById('totTsubo').innerHTML = totTsubo;
		document.getElementById('puntiTsuboMap').innerHTML=HTML;
		
		
		
		
		try{
			SET.evidenziaTsuboMod(elenco.substr(0,elenco.length-1).split("|"));
		}catch(err){}
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	ricPuntiTratt: function(){ // ricarica i punti del trattamento (dopo un'azione es. elimina o nuovo)
		if(	PAZIENTI.puntiProvvisori.length && 
			(globals.set.cartella == 'meridiani_cinesi' || globals.set.cartella == 'meridiani_shiatsu') ){
			var puntiProvvisori='';
			for(p in PAZIENTI.puntiProvvisori){
				var im=document.getElementById("ico_PV"+p).getElementsByTagName("img")[0].src;
				if(im.indexOf("ico_PV.")!==-1)imPV='';
				else if(im.indexOf("ico_PVV.")!==-1)imPV='V';
				else if(im.indexOf("ico_PVP.")!==-1)imPV='P';
				else imPV='D';
				PAZIENTI.puntiProvvisori[p].n = document.getElementById('pt_'+p).value*1;
				PAZIENTI.puntiProvvisori[p].m = document.getElementById('mr_'+p).value;
				PAZIENTI.puntiProvvisori[p].s = document.getElementById('hd_'+p).value;
				PAZIENTI.puntiProvvisori[p].e = imPV;
				var n=0;
				for(m in DB.set.meridiani){
					if(DB.set.meridiani[m].siglaMeridiano==document.getElementById('mr_'+p).value){
						n=(document.getElementById('pt_'+p).value*1+DB.set.meridiani[m].iniMerid*1)-1;
					}
				}
			}
		}
	},
	aggiungiPuntoTrattamento: function( PT ){ // aggiunge un singolo punto al trattamento
		if(typeof(PT)=='undefined')var PT='0.';
		PAZIENTI.ricPuntiTratt();
		var n = PT.split(".")[0]*1;
		var siglaMeridiano = PT.split(".")[1];
		var siglaTsubo = __(DB.set.meridiani[siglaMeridiano].tsubo[n-1].siglaTsubo, PT);
		PAZIENTI.puntiProvvisori.push({
			n: n,
			m: siglaMeridiano,
			e: '',
			z: '',
			t: '',
			s: siglaTsubo
		});
		PAZIENTI.caricaPuntiTrattamento();
		SCHEDA.formModificato = true;
	},
	aggiungiGruppoTrattamento: function( punti ){ // importa un gruppo di punti
		PAZIENTI.topAdd = tCoord(document.getElementById("p_add_dett"),'y');
		SCHEDA.formModificato=true;
		if(PAZIENTI.tipoGruppo=='P')PAZIENTI.ricPuntiTratt();
		var pP=punti.split("|");
		var presenti=false;
		var pass=true;
		var totAggiunti = 0;
		for(var p=0;p<pP.length-1;p++){
			// verifico che non ci sia già
			pass=true;
			if(PAZIENTI.tipoGruppo=='P'){
				for(k in PAZIENTI.puntiProvvisori){
					if(	PAZIENTI.puntiProvvisori[k].n == pP[p].split(".")[0]*1 && 
						PAZIENTI.puntiProvvisori[k].m == pP[p].split(".")[1]){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					var n = pP[p].split(".")[0]*1;
					var siglaMeridiano = pP[p].split(".")[1];
					var siglaTsubo = __(DB.set.meridiani[siglaMeridiano].tsubo[n-1].siglaTsubo, pP[p]);
					var descrTsubo = __(DB.set.meridiani[siglaMeridiano].tsubo[n-1].ChiaviTsubo, '');
					PAZIENTI.puntiProvvisori.push({
						n: n,
						m: siglaMeridiano,
						e: '',
						z: '',
						t: descrTsubo,
						s: siglaTsubo
					});
					totAggiunti++;
				}
			}
			if(PAZIENTI.tipoGruppo=='M'){
				for(k in PAZIENTI.meridianiProvvisori){
					if(PAZIENTI.meridianiProvvisori[k].siglaMeridiano == pP[p]){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					PAZIENTI.aggiungiMeridianoTrattamento(pP[p]);
					totAggiunti++;
				}
			}
			if(PAZIENTI.tipoGruppo=='A'){
				for(k in PAZIENTI.auriculoProvvisori){
					if(PAZIENTI.auriculoProvvisori[k].siglaMeridiano == pP[p]){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					PAZIENTI.aggiungiAuriculoTrattamento(pP[p]);
					totAggiunti++;
				}
			}
		}
		if(presenti){
			if(PAZIENTI.tipoGruppo=='P')ALERT(TXT("PuntiPresenti"));
			if(PAZIENTI.tipoGruppo=='M')ALERT(TXT("MeridianiPresenti"));
			if(PAZIENTI.tipoGruppo=='A')ALERT(TXT("PuntiPresenti"));
		}
		if(totAggiunti){
			if(PAZIENTI.tipoGruppo=='P'){
				PAZIENTI.caricaPuntiTrattamento();
				PAZIENTI.evidenziaAggiunti(document.getElementById('puntiTsuboMap'),totAggiunti);
			}
			if(PAZIENTI.tipoGruppo=='M'){
				PAZIENTI.caricaMeridianiTrattamento();
				PAZIENTI.evidenziaAggiunti(document.getElementById('meridianiTsuboMap'),totAggiunti);
			}
			if(PAZIENTI.tipoGruppo=='A'){
				PAZIENTI.caricaAuriculoTrattamento();
				PAZIENTI.evidenziaAggiunti(document.getElementById('puntiAuriculoMap'),totAggiunti);
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
		SET.overTsubo(document.getElementById("pt_"+n).parentElement,false);
		PAZIENTI.puntiProvvisori[n].e = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricGroup("formMod",n);
		SET.overTsubo(document.getElementById("pt_"+n).parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	cambiaPZ: function( n, m ){ // cambia il mezzo su un punto
		var el = document.getElementById("ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		if(globals.modello.cartella)SET.overTsubo(document.getElementById("pt_"+n).parentElement,false);
		PAZIENTI.puntiProvvisori[n].z = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricGroup("formMod",n);
		if(globals.modello.cartella)SET.overTsubo(document.getElementById("pt_"+n).parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
		PAZIENTI.verMezzo(m);
	},
	selPV: function( n ){
		var html = '';
		var pvs = [ '', 'V', 'P', 'D' ];
		for(m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaPV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'"></span>';
		}
		H.selTT(n,"ico_PV",html);
	},
	selPZ: function( n ){
		var html = '';
		var mzs = [ 
			'', 
			'ago', 
			'moxa', 
			'coppetta', 
			'diapason', 
			'luce', 
			'dito' ];
		for(m in mzs){
			html += '<span style="background-image:url(img/mezzo_'+mzs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaPZ('+n+',\''+mzs[m]+'\');"' +
					'	   title="'+htmlEntities(PAZIENTI.mezzi[mzs[m]])+'"></span>';
		}
		H.selTT(n,"ico_PZ",html);
	},
	spostaTsubo: function( elMove, elTarget ){
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		var fromIndex = parseInt(elMove.parentElement.id.split("_")[1]);
		var toIndex = parseInt(elTarget.id.split("_")[1]);
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		var arr2 = PAZIENTI.puntiProvvisori.splice(fromIndex, 1)[0];
		PAZIENTI.puntiProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaPuntiTrattamento();
		SCHEDA.formModificato = true;
	},
	
	// meridiani
	caricaMeridianiTrattamento: function(){ // carica i punti del trattamento
		document.getElementById('meridianiTsuboMap').style.display = 'block';
		document.getElementById('label_meridianiTsuboMap').style.display = 'block';
		var modificabile = false;
		if( globals.set.cartella == 'meridiani_cinesi' ||
			globals.set.cartella == 'meridiani_shiatsu' ){
			modificabile = true;
		}
		var HTML = '<div></div>'; // serve lasciarlo per il drag&drop
		var elenco = [];
		if(PAZIENTI.meridianiProvvisori.length){
			var p = -1;
			for(m in PAZIENTI.meridianiProvvisori){
				p++;
				elenco.push(PAZIENTI.meridianiProvvisori[m].siglaMeridiano);
				var m2 = __(PAZIENTI.meridianiProvvisori[m].valEnergetica);
				var descrizione = __(PAZIENTI.meridianiProvvisori[m].descrizione);
				HTML += '<div class="rgProcMod ';
				if(modificabile)HTML += 'rgMod ';
				HTML += 'dettMeridiano';
				if(typeof(MERIDIANI) != 'undefined'){
					if(MERIDIANI[PAZIENTI.meridianiProvvisori[m].siglaMeridiano].meridianoAcceso){
						HTML += ' p_'+MERIDIANI[PAZIENTI.meridianiProvvisori[m].siglaMeridiano].elemento;
					}
				}
				HTML += '" id="tr_p'+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'">';
				if(modificabile){
					HTML +=
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
						'		 class="cestino">';
				}
				HTML += '	<span';
				if(modificabile){
					HTML += ' class="meridModif"' +
							' style="cursor:pointer;"' +
							' onClick="if(!PAZIENTI.overCestino)SET.accendiMeridiano(\''+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\',true);"';
					if(mouseDetect){
						HTML += ' onMouseOver="SET.eviMeridiano(\''+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\',true);"' +
								' onMouseOut="SET.eviMeridiano(\''+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\',false);"';
					}
				}
				HTML += '>' +
								PAZIENTI.meridianiProvvisori[m].NomeMeridiano;
				if(descrizione && !modificabile)HTML += ', <font style="font-style:italic;">'+htmlEntities(descrizione)+'</font>';
				HTML += '		<span id="ico_MV'+m+'"' +
						'		      class="valPunto valMerid"';
				if(modificabile)HTML +=
						'			  onMouseOver="PAZIENTI.overCestino=true;"' +
						'			  onMouseOut="PAZIENTI.overCestino=false;"' +
						'		      onClick="PAZIENTI.selMV('+m+',\'tr_p'+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\');"';
				else HTML += '		  style="cursor:default !important;"';
				HTML += '>' +
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
						'	</span>';
					
				if(modificabile)HTML +=
						'	<input id="dm_'+m+'"' +
						'	 		name="dm_'+m+'"' +
						'	 		class="textMeridianoTratt okPlaceHolder"' +
						'	 		value="'+htmlEntities(descrizione)+'"' +
						'	 		placeholder="'+htmlEntities(TXT("SpiegazioneMeridianoTratt"))+'"' +
						'			onBlur="PAZIENTI.meridianiProvvisori['+m+'].descrizione=this.value;"'+H.noAutoGen+'>' +
						'</div>';
				
				HTML += '</div>';
			}
			if(!modificabile)HTML +='<p style="height:5px;"></p>';
		}else{
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes") +'...' +
					'</div>';
		}
		document.getElementById('totMeridiani').innerHTML = PAZIENTI.meridianiProvvisori.length;
		document.getElementById('meridianiTsuboMap').innerHTML=HTML;
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
		for(m in PAZIENTI.meridianiProvvisori){
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
	selMV: function( n ){
		var html = '';
		var pvs = [ '', 'V', 'P', 'D' ];
		for(m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaMV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'"></span>';
		}
		H.selTT(n,"ico_MV",html);
	},
	spostaMeridiano: function( elMove, elTarget ){
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		var fromIndex = parseInt(elMove.dataset.dragEl);
		var toIndex = parseInt(elTarget.getElementsByTagName("div")[0].dataset.dragEl);
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		var arr2 = PAZIENTI.meridianiProvvisori.splice(fromIndex, 1)[0];
		PAZIENTI.meridianiProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaMeridianiTrattamento();
		SCHEDA.formModificato = true;
	},
	
	// auriculo-punti
	ricAuriculo: function( frm, n ){
		var siglaTsubo=eval("document."+frm+".pt_"+n+".value");
		var de=eval("document."+frm+".de_"+n+".value");
		var elenco = [];
		for(p in PAZIENTI.auriculoProvvisori){
			if(p*1 == n*1){
				PAZIENTI.auriculoProvvisori[p].s = siglaTsubo;
				PAZIENTI.auriculoProvvisori[p].n = DB.set.punti[siglaTsubo].NomeTsubo;
				PAZIENTI.auriculoProvvisori[p].t = de;
			}
			elenco.push(siglaTsubo);
		}
		try{
			SET.evidenziaTsuboMod(elenco.substr(0,elenco.length-1).split("|"));
		}catch(err){}
	},
	caricaAuriculoTrattamento: function(){ // carica i punti del trattamento
		document.getElementById('puntiAuriculoMap').style.display = 'block';
		document.getElementById('label_puntiAuriculoMap').style.display = 'block';
		var modificabile = false;
		if( globals.set.cartella == 'auricologia' ){
			modificabile = true;
		}
		
		var HTML = '<div></div>'; // serve lasciarlo per il drag&drop
		var totTsubo = 0;
		var elenco = [];
		if( globals.set.cartella == 'auricologia' ){
			var puntiElenco = [];
			for(siglaTsubo in DB.set.punti){
				if(__(DB.set.punti[siglaTsubo])){
					puntiElenco.push({
						siglaTsubo: siglaTsubo,
						NomeTsubo: DB.set.punti[siglaTsubo].NomeTsubo
					});
				}
			}
			puntiElenco.sort(sort_by("NomeTsubo", false));
			
			if(PAZIENTI.auriculoProvvisori.length){
				for(p in PAZIENTI.auriculoProvvisori){
					totTsubo++;
					
					valutazione=__(PAZIENTI.auriculoProvvisori[p].e);
					mezzo=__(PAZIENTI.auriculoProvvisori[p].z);
					descrizione=__(PAZIENTI.auriculoProvvisori[p].t);
					siglaTsubo=__(PAZIENTI.auriculoProvvisori[p].s);
					nomeTsubo=__(PAZIENTI.auriculoProvvisori[p].n);
					elenco.push(siglaTsubo);
					
					HTML += '<div class="rgProcMod rgMod dettAuriculo"' +
							'	  id="rg_'+p+'"';
					if(mouseDetect && siglaTsubo){
						HTML += 	' onMouseOver="SET.overTsubo(\'PT'+siglaTsubo+'\',true);"' +
									' onMouseOut="SET.overTsubo(\'PT'+siglaTsubo+'\',false);"';
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
							'	      onClick="PAZIENTI.selAZ('+p+');">' +
							'		<img src="img/mezzo_'+mezzo+'.png"' +
							'	  	     width="20"' +
							'	  	     height="20"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PZDett"))+'"'+
							'	  	     class="occhio valEn"> ' +
							'	</span>';
							
					
					
					// siglaTsubo (.s in puntiProvvisori)
					HTML += '<input type="hidden" id="hd_'+p+'" name="hd_'+p+'" value="'+siglaTsubo+'">';
					
					// verifico che esista il punto
					if(globals.set.cartella != 'auricologia'){
						HTML += '<span class="ptNo" style="text-align:left">'+nomeTsubo+'</span>' +
								'<input type="hidden" id="pt_'+p+'" name="pt_'+p+'" value="'+siglaTsubo+'">';
					}else{
						// punto
						HTML +=	'	<select class="numPoints"' +
								'	     	 name="pt_'+p+'"' +
								'	     	 id="pt_'+p+'"' +
								'	     	 onChange="this.blur();' +
								'	     	 		   PAZIENTI.ricAuriculo(\'formMod\','+p+');' +
								'	     	 		   SCHEDA.formModificato=true;">' +
								'		<option></option>';
						for(n in puntiElenco){
							HTML += '<option value="'+puntiElenco[n].siglaTsubo+'"';
							if(siglaTsubo==puntiElenco[n].siglaTsubo)HTML += ' SELECTED';
							HTML += '>'+puntiElenco[n].NomeTsubo+'</option>';
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
								'		 onClick="SET.selTsuboMod(\''+siglaTsubo+'\','+p+');">';
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
				
			}
		}else{
			if( PAZIENTI.auriculoProvvisori.length ){
				var HTML_noMod = '';
				for(p in PAZIENTI.auriculoProvvisori){
					valutazione=__(PAZIENTI.auriculoProvvisori[p].e);
					mezzo=__(PAZIENTI.auriculoProvvisori[p].z);
					descrizione=__(PAZIENTI.auriculoProvvisori[p].t);
					siglaTsubo=__(PAZIENTI.auriculoProvvisori[p].s);
					NomeTsubo=__(PAZIENTI.auriculoProvvisori[p].n);
					HTML_noMod += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
					HTML_noMod += NomeTsubo;
					if(valutazione)HTML_noMod += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
					if(descrizione)HTML_noMod += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
					HTML_noMod += '</span> ';
					elenco.push(siglaTsubo);
				}
				totTsubo = PAZIENTI.auriculoProvvisori.length;
				HTML = '<span style="margin-bottom: 15px;display: inline-block;">'+HTML_noMod+'</span>';
			}
		}
		
		if(!totTsubo){
			totTsubo=0;
			
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes") +'...' +
					'</div>';
		}
		document.getElementById('totAuriculo').innerHTML = PAZIENTI.auriculoProvvisori.length;
		document.getElementById('puntiAuriculoMap').innerHTML=HTML;
		try{
			SET.evidenziaTsuboMod(elenco);
		}catch(err){}
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	aggiungiAuriculoTrattamento: function( PT ){ // aggiunge un singolo punto al trattamento;
		JSNPUSH = {
			s: PT,
			n: DB.set.punti[PT].NomeTsubo,
			z: "",
			e: "",
			t: ""
		}
		PAZIENTI.auriculoProvvisori.push(JSNPUSH);
		SCHEDA.formModificato = true;
		PAZIENTI.caricaAuriculoTrattamento();
		document.getElementById("grpAur").selectedIndex = 0;
	},
	eliminaAuriculoTrattamento: function( n ){ // elimina un punto del trattamento
		PAZIENTI.auriculoProvvisori.splice(n, 1); 
		PAZIENTI.caricaAuriculoTrattamento();
		SCHEDA.formModificato = true;
	},
	selAV: function( n ){
		var html = '';
		var pvs = [ '', 'D' ];
		for(m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaAV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(TXT("Valutazione"+pvs[m]))+'"></span>';
		}
		H.selTT(n,"ico_PV",html);
	},
	cambiaAV: function( n, m ){ // cambia la valutazione energetica su un punto
		var el = document.getElementById("ico_PV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		//SET.overTsubo(document.getElementById("pt_"+n).parentElement,false);
		PAZIENTI.auriculoProvvisori[n].e = m;
		SCHEDA.formModificato = true;
		//PAZIENTI.ricGroup("formMod",n);
		//SET.overTsubo(document.getElementById("pt_"+n).parentElement,true);
		//document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	selAZ: function( n ){
		var html = '';
		var mzs = [
			"",
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
			"infiltrazione" ];
		for(m in mzs){
			html += '<span style="background-image:url(img/mezzo_'+mzs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaAZ('+n+',\''+mzs[m]+'\');"' +
					'	   title="'+htmlEntities(PAZIENTI.mezzi[mzs[m]])+'"></span>';
		}
		H.selTT(n,"ico_PZ",html);
	},
	cambiaAZ: function( n, m ){ // cambia il mezzo su un punto
		var el = document.getElementById("ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		//if(globals.modello.cartella)SET.overTsubo(document.getElementById("pt_"+n).parentElement,false);
		PAZIENTI.auriculoProvvisori[n].z = m;
		SCHEDA.formModificato = true;
		//PAZIENTI.ricGroup("formMod",n);
		//if(globals.modello.cartella)SET.overTsubo(document.getElementById("pt_"+n).parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
		PAZIENTI.verMezzo(m);
	},
	spostaAuriculo: function( elMove, elTarget ){
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		var fromIndex = parseInt(elMove.parentElement.id.split("_")[1]);
		var toIndex = parseInt(elTarget.id.split("_")[1]);
		if(DRAGGER.pushPos=='after')toIndex++;
		if(toIndex>fromIndex)toIndex--;
		var arr2 = PAZIENTI.auriculoProvvisori.splice(fromIndex, 1)[0];
		PAZIENTI.auriculoProvvisori.splice(toIndex,0,arr2);
		PAZIENTI.caricaAuriculoTrattamento();
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
	gruppoPunti: function( tipo ){ // costruisce il JSON dei gruppi punti (all'apertura del trattamento)
		if(typeof(tipo)=='undefined')var tipo = 'P';
		PAZIENTI.tipoGruppo = tipo;
		applicaLoading(document.getElementById("scheda_testo"));
		document.getElementById("LL").onclick = function(){PAZIENTI.swGruppoPunti();};
		
		PAZIENTI.elencoGruppoPunti = {};
		PAZIENTI.elencoGruppoPunti.titolo = "";
		PAZIENTI.elencoGruppoPunti.contenuto = [];
		PAZIENTI.elencoGruppoPunti.livello = 1;
		var presenti = false;
		
		// punti da MERIDIANI
		EL = {};
		EL.contenuto = [];
		if(PAZIENTI.tipoGruppo=='P')EL.livello = 2;
		else EL.livello = 3;
		EL.parent = PAZIENTI.elencoGruppoPunti;
		var n = -1;
		if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='M'){
			EL.titolo = TXT("MeridianiTrattamento");
			for(i in DB.set.meridiani){
				n++;
				if(PAZIENTI.tipoGruppo=='P'){ // punti
					EL.contenuto[n] = {};
					EL.contenuto[n].titolo = DB.set.meridiani[i].NomeMeridiano;
					EL.contenuto[n].contenuto = [];
					EL.contenuto[n].livello = 3;
					EL.contenuto[n].parent = EL;
					for(pm in DB.set.meridiani[i].tsubo){
						if(DB.set.meridiani[i].tsubo[pm].NomeTsubo){
							var pP=DB.set.meridiani[i].tsubo[pm].NomeTsubo.split(". ");
							EL.contenuto[n].contenuto.push(pP[0]);
						}
					}	
				}
				if(PAZIENTI.tipoGruppo=='M'){ // meridiani
					if(i!='EX')EL.contenuto.push(i);
				}
			}
		}
		if(PAZIENTI.tipoGruppo=='A'){ // auricolo-punti
		
			var puntiElenco = [];
			for(siglaTsubo in DB.set.punti){
				if(__(DB.set.punti[siglaTsubo])){
					puntiElenco.push({
						siglaTsubo: siglaTsubo,
						NomeTsubo: DB.set.punti[siglaTsubo].NomeTsubo
					});
				}
			}
			puntiElenco.sort(sort_by("NomeTsubo", false));
			
			EL.titolo = TXT("PuntiAuriculo");
			for(a in puntiElenco){
				if(puntiElenco[a].NomeTsubo){
					EL.contenuto.push(puntiElenco[a].siglaTsubo);
				}
			}
		}
		PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
		
		// punti da TEORIA
		for(t in DB.set.teoria){
			if(!__(DB.set.teoria[t].noList)){
				EL = {};
				EL.titolo = DB.set.teoria[t].TitoloSezione;
				EL.contenuto = [];
				EL.livello = 2;
				EL.parent = PAZIENTI.elencoGruppoPunti;
				for(i in DB.set.teoria[t].contenuti){
					EL2 = {};
					EL2.titolo = DB.set.teoria[t].contenuti[i].TitoloTeoria;
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					// scansiono il testo
					var txtTeo=DB.set.teoria[t].contenuti[i].TestoTeoria;
					
					if(PAZIENTI.tipoGruppo=='P')re = /\[\.[0-9]{1,2}\.[A-Z]{2}\.\]/ig;
					if(PAZIENTI.tipoGruppo=='M')re = /\[\.[A-Z]{2}\.\]/ig;
					if(PAZIENTI.tipoGruppo=='A')re = /\[\.[0-9]{3}\.\]/ig;
					var result = txtTeo.match(re);
					for(k in result){
						var pP = result[k].split(".");
						PT=pP[1];
						if(PAZIENTI.tipoGruppo=='P')PT += '.'+pP[2];
						if(EL2.contenuto.indexOf(PT)===-1){
							EL2.contenuto.push(PT);
							presenti = true;
						}
					}
					if(PAZIENTI.tipoGruppo=='A'){
						var gr = DB.set.teoria[t].contenuti[i].gruppo;
						if(gr){
							var punti = GEOMETRIE.gruppi[gr].punti;
							for(k in punti){
								var PT = punti[k];
								if(EL2.contenuto.indexOf(PT)===-1){
									EL2.contenuto.push(PT);
									presenti = true;
								}
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
			for(p in PRS){
				if(!PRS[p].Cancellato){
					EL2 = {};
					EL2.titolo = PRS[p].NomeProcedura;
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					// scansiono i dettagli
					for(i in PRS[p].dettagliProcedura){
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
			if(CONN.getConn()){
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
			
			
			if(PAZIENTI.tipoGruppo=='P'){ // DA RIVEDERE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<|!!!!!!!!!!!!!!!!
				
				
				EL = {};
				EL.titolo = TXT("CommunityPreferiti");
				EL.contenuto = [];
				EL.livello = 2;
				EL.parent = PAZIENTI.elencoGruppoPunti;
				var presenti = false;
				var preferiti = JSON.parse(txt);
				for(p in preferiti.dati){
					EL2 = {};
					EL2.titolo = preferiti.dati[p].NomeProcedura+' ('+htmlEntities(preferiti.dati[p].Pseudonimo);
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					if(preferiti.dati[p].elencoPunti.length>1){
						var elenco = preferiti.dati[p].elencoPunti.split("|");
						if(PAZIENTI.tipoGruppo=='M')elenco = preferiti.dati[p].elencoMeridiani.split("|");
						for(pr in elenco){
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
		EL = {};
		EL.titolo = TXT("Patologie");
		EL.contenuto = [];
		EL.livello = 2;
		EL.parent = PAZIENTI.elencoGruppoPunti;
		for(i in DB.set.patologie){
			EL2 = {};
			EL2.titolo = DB.set.patologie[i].NomePatologia;
			EL2.contenuto = [];
			EL2.livello = 3;
			EL2.parent = EL;
			// scansiono il testo
			var txtPat=DB.set.patologie[i].TestoPatologia;
			if(PAZIENTI.tipoGruppo=='P')re = /\[\.[0-9]{1,2}\.[A-Z]{2}\.\]/ig;
			if(PAZIENTI.tipoGruppo=='M')re = /\[\.[A-Z]{2}\.\]/ig;
			if(PAZIENTI.tipoGruppo=='A')re = /\[\.[0-9]{3}\.\]/ig;
			var result = txtPat.match(re);
			for(k in result){
				var pP = result[k].split(".");
				PT = pP[1];
				if(PAZIENTI.tipoGruppo=='P')PT += '.'+pP[2];
				if(EL2.contenuto.indexOf(PT)==-1){
					EL2.contenuto.push(PT);
				}
			}
			if(EL2.contenuto.length){
				EL.contenuto[i] = EL2; 
			}
		}
		PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
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
		for(k in PAZIENTI.elencoGruppoAtt.contenuto){
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
					'	<span onClick="PAZIENTI.ptGruppoSelAll(this);">' +
							htmlEntities(TXT("SelezionaTutti")) +
					'	</span>' +
					'	<span onClick="PAZIENTI.ptGruppoImporta();">' +
							htmlEntities(TXT("Importa")) +
					'	</span>' +
					'</div>';
		}
		document.getElementById("gruppoPunti_cont").innerHTML = HTML;
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
		var HTML = 	
				'<label class="gr_3"' +
				'		for="'+n+'">' +
				'	<input type="checkbox"' +
				'		   id="'+n+'"' +
				'		   value="'+PT+'">';
		if(PAZIENTI.tipoGruppo=='P'){
			var siglaPT = __(DB.set.meridiani[pP[1]].tsubo[pP[0]*1-1].siglaTsubo,pP[0]+"."+SET.convSigla(pP[1]));
			HTML +=	'<b>'+siglaPT+'.</b>' +
					'<i>'+DB.set.meridiani[pP[1]].tsubo[pP[0]*1-1].NomeTsubo.replace(PT+".","")+'</i>';
		}
		if(PAZIENTI.tipoGruppo=='M'){
			HTML +=	DB.set.meridiani[PT].NomeMeridiano;
		}
		if(PAZIENTI.tipoGruppo=='A'){
			HTML +=	DB.set.punti[PT].NomeTsubo;
		}
		HTML +=	'</label>';
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
		var els = document.getElementById("gruppoPunti_cont").getElementsByTagName("input");
		var punti = '';
		for(e in els){
			if(els[e].checked && els[e].type=='checkbox')punti += els[e].value+"|";
		}
		if(punti){
			if(!document.getElementById("scheda").classList.contains("scheda_procedura")){
				PAZIENTI.aggiungiGruppoTrattamento(punti);
			}else SET.aggiungiGruppoProcedura(punti);
			PAZIENTI.swGruppoPunti();
			PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoPunti;
		}else ALERT(TXT("ErroreImportaPunti"));
	},
	evidenziaAggiunti: function( cont, n ){
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
	}
}