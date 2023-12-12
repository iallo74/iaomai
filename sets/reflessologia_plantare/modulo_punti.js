
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
						NomePunto: DB.set.aree[siglaPunto].NomePunto
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
			elencoPunti+='<p>'+this.scriviPunto(siglaPunto,true,true,'')+'</p>';
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
				contFiltri +=	'	<p id="f_'+a+'"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
								'					onclick="SET.filtraGruppo(\''+a+'\');">'+
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
		
		
		if(SET.groupSel.id)SET.filtraGruppo( SET.groupSel.type, SET.groupSel.val, SET.groupSel.id, true );
	},
	filtraPunti: function(){ // filtra i punti per testo
		if(SET.groupSel.id)SET.filtraGruppo();
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
			if(!__(DB.set.punti[siglaPunto]["PH"+SET.phase],false) && SET.phase)pass = true;
			if(!document.getElementById("ts_"+siglaPunto))pass = true;
			els[e].classList.toggle("nasPT",pass);
		}
	},
	filtraGruppo: function( type='', val='', id ='', forza=false){ // filtra i punti pruppo
		if(document.getElementById("punti_ricerca").value.trim()!='' && id){
			document.getElementById("punti_ricerca").value = '';
			document.getElementById("punti_ricerca").classList.remove("filtro_attivo_bordo");
		}
		if(SET.groupSel.id == id && !forza){
			type = '';
			val = '';
			id = '';
		}
		var elenchi = ["PTs"+SET.phase,"ARs"+SET.phase];
		for(a in elenchi){
			var els = scene.getObjectByName(elenchi[a]).children;
			for(e in els){
				var name = els[e].name;
				if(name.indexOf("_")==0)name = name.substr(3,3);
				else name = name.substr(2,3);
				var vis = false;
				if(type=='group'){
					if(typeof(GEOMETRIE.gruppi[val])!='undefined')vis = GEOMETRIE.gruppi[val].punti.indexOf(name)>-1;
				}else{
					if(type=='freq')vis = (els[e].userData[type].indexOf(val)>-1);
					else vis = (els[e].userData[type]==val);
					if(!type && els[e].userData.hidePunto!='1')vis = true;
				}
				var visEl = vis;
				if(	DB.set.punti[name].hidden || 
					__(els[e].userData.locked,false) )visEl = false;
				els[e].visible = visEl;
				if(document.getElementById("ts_"+name)){
					document.getElementById("ts_"+name).parentElement.classList.toggle("nasPT",!vis);
				}
			}
		}
		
		var els = document.getElementById("f_filtri").getElementsByTagName("p");
		for(e=0;e<els.length;e++){
			if(id){
				els[e].classList.toggle("hide",(els[e].id != 'f_'+id));
				els[e].classList.toggle("selected",(els[e].id == 'f_'+id));
			}else{
				els[e].classList.remove("hide");
				els[e].classList.remove("selected");
			}
		}
		SET.groupSel = {
			"type": type,
			"val": val,
			"id": id
		}
		document.getElementById("e_punti").classList.toggle("searched",SET.groupSel.id);
		var els = document.getElementById("filtriSmart_cont").getElementsByTagName("div");
		for(e=0;e<els.length;e++){
			els[e].classList.remove("selected");
		}
		if(SET.groupSel.id){
			document.getElementById("sf_"+SET.groupSel.id).classList.add("selected");
		}
		document.getElementById("filtriSmart_ico").classList.toggle("filtered",(SET.groupSel.id));
		if(!document.getElementById("p_filtri").classList.contains("op"))SET.swFiltri();
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
		for(a in DB.set.apparati)contFiltri += '<i>'+DB.set.apparati[a]+'</i>';
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