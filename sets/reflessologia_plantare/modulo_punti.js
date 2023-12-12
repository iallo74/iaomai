
var MODULO_PUNTI = { // extend SET
	
	PUNTI_free: [ "000","001","254","003","291","192","165","067","177","060","054","018","093","056","121","111","117","261","151" ],
	
	caricaPunti: function(){ // carica l'elenco dei punti e delle aree
		var n = 0;
		var contElenco = '';
		var elencoPunti = '';
		var puntiElenco = [];
		for(let siglaPunto in DB.set.aree){
			if(__(DB.set.aree[siglaPunto])){
				if(!__(DB.set.aree[siglaPunto].hidden,false)){
					puntiElenco.push({
						siglaPunto: siglaPunto,
						NomePunto: DB.set.aree[siglaPunto].NomePunto,
						apparato: DB.set.aree[siglaPunto].apparato
					});
				}
			}
		}
		puntiElenco.sort(sort_by("NomePunto", false));
		for(a=0;a<puntiElenco.length;a++){
			var siglaPunto = puntiElenco[a].siglaPunto;
			n++;
			
			// verifico le autorizzazioni
			var addLock =	(!SET.verFreePunti(siglaPunto)) ? ' lockedItem' : '';
			// --------------------------
			elencoPunti+='<p data-apparato="'+puntiElenco[a].apparato+'">'+this.scriviPunto(siglaPunto,true,true,puntiElenco[a].apparato)+'</p>';
		}
		
		// FILTRI
		var contFiltri =	'<div id="p_filtri">' +//+htmlEntities(TXT("Filtri"))+
							'	<input id="punti_ricerca"' +
							'		   onKeyUp="SET.filtraPunti();"' +
							'		   class="okPlaceHolder"' +
							'		   placeholder="'+htmlEntities(TXT("CercaPunti"))+'"'+H.noAutoGen+'>' +
							'	<span id="btnFiltri"' +
							'		  onClick="SET.swFiltri();"></span>' +
							'</div>' +
							'<span id="f_filtri"' +
							'	   class="elencoFiltri">'+
							'	<div id="groupsList">';
							
			for(a in DB.set.apparati){
				contFiltri +=	'	<p id="f_'+a+'" class="pallinoGroup"><a class="pallinoPat pallinoPatEsteso" '+
								'					onclick="SET.swGruppo('+a+');">'+
								'			<i>'+htmlEntities(DB.set.apparati[a])+'</i></a></p>';
			}
							
							
			contFiltri +=	'</div></span>';
						
						
		if(elencoPunti){
			contElenco +=	'<span id="e_punti"' +
							'	   class="elencoPunti">'+
							
							contFiltri +
							'<div id="elencoPunti">' + elencoPunti + '</div></span>';
		}
		
		
		document.getElementById("lista_punti").innerHTML = '<div class="lista listaPunti">'+contElenco+'</div>';
	},
	filtraPunti: function(){ // filtra i punti per testo
		var el = document.getElementById("punti_ricerca");
		el.classList.toggle("filtro_attivo_bordo",(el.value.trim()!=''));
		var els = document.getElementById("elencoPunti").getElementsByTagName("p");
		for(e=0;e<els.length;e++){
			var i = els[e].getElementsByTagName("i")[0];
			var a = els[e].getElementsByTagName("a")[0];
			var siglaPunto = a.id.replace("ts_","");
			var pass = false;
			if(	DB.set.aree[siglaPunto].NomePunto.toLowerCase().indexOf(el.value.toLowerCase())==-1 &&
				DB.set.aree[siglaPunto].AzioniPunto.toLowerCase().indexOf(el.value.toLowerCase())==-1 &&
				DB.set.aree[siglaPunto].ChiaviPunto.toLowerCase().indexOf(el.value.toLowerCase())==-1 ){
					pass = true;
			}
			if(!document.getElementById("ts_"+siglaPunto))pass = true;
			els[e].classList.toggle("nasPT",pass);
		}
	},
	swGruppo: function( app ){
		SET.hiddenGroups[app] = !SET.hiddenGroups[app];
		for(a in DB.set.apparati){
			document.getElementById("f_app"+a).classList.toggle("hideApp",SET.hiddenGroups[a]);
			document.getElementById("f_"+a).classList.toggle("hideApp",SET.hiddenGroups[a]);
		}
		SET.filtraGruppo();
	},
	filtraGruppo: function( type='', val='', id ='', forza=false){ // filtra i punti pruppo
		let els = scene.getObjectByName("ARs").children;
		for(let e in els){
			els[e].visible = !SET.hiddenGroups[els[e].userData.apparato];
		}
		els = document.getElementById("elencoPunti").getElementsByTagName("p");
		for(let e in els){
			if(els[e].dataset?.apparato)els[e].classList.toggle("hideP", SET.hiddenGroups[els[e].dataset.apparato] );
		}
	},
	swFiltri: function(){ // mostra/nasconde i filtri
		document.getElementById("p_filtri").classList.toggle("op");
		document.getElementById("f_filtri").classList.toggle("visElPt");
	},
	popolaFiltri: function(){ // popola il menu rapido dei filtri (in alto a SX)
		var contFiltri =	'<div id="filtriSmart_ico"'+
							'	  onClick="SET.swFiltriSmart();"' +
							'     title="'+htmlEntities(TXT("FiltriSmart"))+'"><span></span></div>' +
							
							'<div id="filtriSmart_cont">'+
							
							'<span>'+htmlEntities(TXT("Apparati")) + '</span>';
		for(a in DB.set.apparati)contFiltri += '<i onClick="SET.swGruppo('+a+');"id="f_app'+a+'">'+DB.set.apparati[a]+'<b class="app'+a+'"></b></i>';
		contFiltri +=		'</div>';
		document.getElementById("divs").innerHTML = contFiltri;
	},
	
	swFiltriSmart: function(){ // visualizza/nasconde il menu rapido dei filtri (in alto a SX)
		document.getElementById("filtriSmart_cont").classList.toggle("visSch");
	},
	verFreePunti: function( siglaPunto ){
		return !(SET.PUNTI_free.indexOf(siglaPunto)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	}
}