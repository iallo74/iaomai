
var MODULO_PUNTI = { // extend SET
	
	APPARATI_free: [ 1, 2 ],
	PUNTI_free: [ "001","002","003","004","005","006","007","008","009","010","011","012","013","014","015","016","017","018","019" ],
	
	caricaPunti: function(){ // carica l'elenco dei punti e delle aree
		var n = 0;
		var contElenco = '';
		var elencoPunti = '';
		var puntiElenco = [];
		for(let siglaPunto in DB.set.punti){
			if(__(DB.set.punti[siglaPunto])){
				if(!__(DB.set.punti[siglaPunto].hidden,false)){
					puntiElenco.push({
						siglaPunto: siglaPunto,
						NomePunto: DB.set.punti[siglaPunto].NomePunto,
						apparato: DB.set.punti[siglaPunto].apparato
					});
				}
			}
		}
		puntiElenco.sort(sort_by("siglaPunto", false));
		for(a=0;a<puntiElenco.length;a++){
			var siglaPunto = puntiElenco[a].siglaPunto;
			n++;
			
			// verifico le autorizzazioni
			var addLock =	(!SET.verFreePunti(siglaPunto)) ? ' lockedItem' : '';
			// --------------------------
			elencoPunti+='<p class="'+addLock+'" data-apparato="'+puntiElenco[a].apparato+'">'+this.scriviPunto(siglaPunto,true,true,puntiElenco[a].apparato)+'</p>';
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
			if(	DB.set.punti[siglaPunto].NomePunto.toLowerCase().indexOf(el.value.toLowerCase())==-1 &&
				DB.set.punti[siglaPunto].AzioniPunto.toLowerCase().indexOf(el.value.toLowerCase())==-1 &&
				DB.set.punti[siglaPunto].ChiaviPunto.toLowerCase().indexOf(el.value.toLowerCase())==-1 ){
					pass = true;
			}
			if(!document.getElementById("ts_"+siglaPunto))pass = true;
			els[e].classList.toggle("nasPT",pass);
		}
	},
	swGruppo: function( app ){
		SET.hiddenGroups[app] = !SET.hiddenGroups[app];
		for(a in DB.set.apparati){
			if(!document.getElementById("f_app"+a).classList.contains("disabled")){
				document.getElementById("f_app"+a).classList.toggle("hideApp",SET.hiddenGroups[a]);
				document.getElementById("f_"+a).classList.toggle("hideApp",SET.hiddenGroups[a]);
			}
		}
		SET.filtraGruppo();
	},
	filtraGruppo: function(){ // filtra i punti pruppo
		let els = scene.getObjectByName("ARs").children;
		for(let e in els){
			if(!document.getElementById("f_app"+els[e].userData.apparato).classList.contains("disabled"))els[e].visible = !SET.hiddenGroups[els[e].userData.apparato];
		}
		els = document.getElementById("elencoPunti").getElementsByTagName("p");
		for(let e in els){
			if(els[e].dataset?.apparato){
				if(!document.getElementById("f_app"+els[e].dataset.apparato).classList.contains("disabled")){
					els[e].classList.toggle("hideP", SET.hiddenGroups[els[e].dataset.apparato] );
				}
			}
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
							'<span>'+htmlEntities(TXT("FiltriSmart")) + '</span>'/* +
							'<em>'+htmlEntities(TXT("Apparati")) + '</em>' */;
		for(a in DB.set.apparati)contFiltri += '<i onClick="SET.swGruppo('+a+');"id="f_app'+a+'">'+DB.set.apparati[a]+'<b class="app'+a+'"></b></i>';
		contFiltri +=		'</div>';
		document.getElementById("divs").innerHTML = contFiltri;
		SET.filtraSet();
	},
	
	swFiltriSmart: function(){ // visualizza/nasconde il menu rapido dei filtri (in alto a SX)
		document.getElementById("filtriSmart_cont").classList.toggle("visSch");
	},
	verFreePunti: function( siglaPunto ){
		return !(SET.APPARATI_free.indexOf(scene.getObjectByName(siglaPunto).userData.apparato)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	}
}