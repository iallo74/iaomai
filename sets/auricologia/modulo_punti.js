
var MODULO_PUNTI = { // extend SET
	PUNTI_free: [ "000","001","002","003","004" ],
	caricaPunti: function(){
		var n = 0;
		var contElenco = '';
		var elencoTsubo = '';
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
		for(a=0;a<puntiElenco.length;a++){
			var siglaTsubo = puntiElenco[a].siglaTsubo;
			n++;
			
			// verifico le autorizzazioni
			var addLock =	SET.PUNTI_free.indexOf(p)==-1 && 
							(DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()) ? ' lockedItem' : '';
			// --------------------------
			elencoTsubo+='<p>'+this.scriviTsubo(siglaTsubo,true,true,'')+'</p>';
		}
		
		// FILTRI
		var contFiltri =	'<div onClick="SET.swFiltri();"' +
							'     id="p_filtri">'+htmlEntities(Lingua(TXT_Filtri))+'</div>' +
							'<span id="f_filtri"' +
							'	   class="elencoFiltri">'+
							'	<input id="punti_ricerca"' +
							'		   onKeyUp="SET.filtraPunti();"' +
							'		   class="okPlaceHolder"' +
							'		   placeholder="'+htmlEntities(Lingua(TXT_CercaPunti))+'"'+H.noAutoGen+'>' +
							'	<div id="groupsList">' +
							
							'	<p id="f_INT"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'system\',\'\',\'INT\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_INT))+'</i></a></p>' +
							
							'	<p id="f_EUR"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'system\',\'EUR\',\'EUR\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_EUR))+'</i></a></p>' +
							
							'	<p id="f_CIN"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'system\',\'CIN\',\'CIN\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_CIN))+'</i></a></p>' +
							
							'	<p id="f_MASTER"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'master\',true,\'MASTER\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_MASTER))+'</i></a></p>' +
							
							'	<p id="f_FN"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'FN\',true,\'FN\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_FN))+'</i></a></p>' +
							
							'	<p id="f_NR"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'FN\',false,\'NR\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_NR))+'</i></a></p>' +
							
							'	<p id="f_292"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'292\',\'292\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_Frequenza))+' '+htmlEntities(Lingua(TXT_Legenda_292))+'</i></a></p>' +
							
							'	<p id="f_584"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'584\',\'584\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_Frequenza))+' '+htmlEntities(Lingua(TXT_Legenda_584))+'</i></a></p>' +
							
							'	<p id="f_1168"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'1168\',\'1168\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_Frequenza))+' '+htmlEntities(Lingua(TXT_Legenda_1168))+'</i></a></p>' +
							
							'	<p id="f_2336"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'2336\',\'2336\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_Frequenza))+' '+htmlEntities(Lingua(TXT_Legenda_2336))+'</i></a></p>' +
							
							'	<p id="f_4672"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'4672\',\'4672\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_Frequenza))+' '+htmlEntities(Lingua(TXT_Legenda_4672))+'</i></a></p>' +
							
							'	<p id="f_9334"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'9334\',\'9334\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_Frequenza))+' '+htmlEntities(Lingua(TXT_Legenda_9334))+'</i></a></p>' +
							
							'	<p id="f_18688"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'18688\',\'18688\');">'+
							'			<i>'+htmlEntities(Lingua(TXT_Gruppi_Frequenza))+' '+htmlEntities(Lingua(TXT_Legenda_18688))+'</i></a></p>' +
							
							'</div></span>';
						
						
		if(elencoTsubo){
			contElenco +=	'<div onClick="SET.swElencoPt(this,\'punti\');"' +
							'     id="p_punti"' +
							'     class="p_punti">'+htmlEntities(Lingua(TXT_ElencoPunti))+'<strong></strong></div>' +
							'<span id="e_punti"' +
							'	   class="elencoPunti">'+
							
							contFiltri +
							'<div id="elencoTsubo">' + elencoTsubo + '</div></span>';
		}
		
		var sceltaPuntiTag = 	'<div class="menuElenchi"' +
								'	  onClick="MENU.visMM(\'sistemaPunti_p\');">' +
								'</div>';
				
		var legenda = [];		
		if(GEOMETRIE.mappe.length>1){		
			sceltaPuntiTag += 	'<p id="sistemaPunti_p"><span id="selectCambioMappa"><i>'+htmlEntities(Lingua(TXT_MappaAttiva))+':</i><select id="sceltaMappaElenco" onChange="SET.cambiaMappa(this.value);">';
			for(m in GEOMETRIE.mappe){
				var name = GEOMETRIE.mappe[m].name;
				sceltaPuntiTag += 	'  <option value="'+name+'"';
				if(localStorage.imgMappa == name)sceltaPuntiTag += ' SELECTED';
				sceltaPuntiTag += 	'>'+htmlEntities(Lingua(eval("TXT_Mappa_"+name)))+'</option>';
				if(name == localStorage.imgMappa){
					legenda = GEOMETRIE.mappe[m].legenda;
				}
			}
			sceltaPuntiTag += 	'</select>';
		}
		sceltaPuntiTag += 	'</span><i class="elMenu" id="cambioSistemaPunti" onClick="MENU.visImpset();"><span>'+htmlEntities(Lingua(TXT_SistemaPuntiEuropeo))+'</span></i></p>';
		
		
		
		
		
		
		// LEGENDA
		var elencoLegenda = '';
		for(l=0;l<legenda.length;l++){
			if(legenda[l].name=='settings'){
				settings = legenda[l];
			}else if(legenda[l].type=='dida'){
				elencoLegenda+='<p class="legendaDida italic">'+htmlEntities(Lingua(eval("TXT_Legenda_"+legenda[l].name)))+'</p>';
			}else{
				elencoLegenda+='<p';
				if(settings.maskable){
					elencoLegenda+=' id="zone_'+legenda[l].name+'"' +
								   ' onClick="SET.eviZone(\''+legenda[l].name+'\',\'clic\');"' +
								   ' onMouseOver="SET.eviZone(\''+legenda[l].name+'\',\'over\');"' +
								   ' onMouseOut="SET.eviZone(\''+legenda[l].name+'\',\'out\');"';
				}
				elencoLegenda+=	'><span class="legendaColor" style="background-color:#';
				if(__(legenda[l].color,''))elencoLegenda+=legenda[l].color;
				else elencoLegenda+='fff;color:#000;';
				elencoLegenda+=';">';
				if(settings.nameInside)elencoLegenda+=legenda[l].name;
				elencoLegenda+='</span>';
				elencoLegenda+=htmlEntities(Lingua(eval("TXT_Legenda_"+legenda[l].name)))+'</p>';
			}
		}
		elencoLegenda+=	'<p class="legendaDida points">'+
						'<i>' + htmlEntities(Lingua(eval("TXT_Legenda_DidaPunti_tit"))) + '</i>' +
						'<br><span class="pINT"></span>' + htmlEntities(Lingua(eval("TXT_Legenda_DidaPunti_INT"))) + 
						'<br><span class="pEUR"></span>' + htmlEntities(Lingua(eval("TXT_Legenda_DidaPunti_EUR"))) + 
						'<br><span class="pCIN"></span>' + htmlEntities(Lingua(eval("TXT_Legenda_DidaPunti_CIN"))) + 
						'</p>';
		if(elencoLegenda)contElenco +=	'<div onClick="SET.swElencoPt(this,\'legenda\');"' +
										'     id="p_legenda"' +
										'     class="p_punti">'+htmlEntities(Lingua(TXT_Legenda))+'<strong></strong></div>' +
										'<span id="e_legenda"' +
										'	   class="elencoPunti">'+
										elencoLegenda +
										'</span>';
		
		document.getElementById("lista_punti").innerHTML = sceltaPuntiTag+'<div class="lista listaPunti">'+contElenco+'</div>';
		
		var pass = false;
		for(e in localStorage){
			if(typeof(e)!='undefined'){
				if(e.indexOf("auricolo_mn_")==0){
					if(localStorage[e]!='')document.getElementById("p_"+e.replace("auricolo_mn_","")).click();
					pass = true;
				}
			}
		}
		if(!pass)document.getElementById("p_legenda").click();
	},
	swElencoPt: function( el, m ){
		if(!document.getElementById("e_"+m).classList.contains("visElPt")){
			document.getElementById("e_"+m).classList.add("visElPt");
			el.classList.add("frSw");
			localStorage["auricolo_mn_"+m] = 'true';
		}else{
			document.getElementById("e_"+m).classList.remove("visElPt")
			el.classList.remove("frSw");
			localStorage["auricolo_mn_"+m] = '';
		}
	},
	filtraPunti: function(){ // filtra i punti
		if(SET.groupSel)SET.filtraGruppo();
		var el = document.getElementById("punti_ricerca");
		el.classList.toggle("filtro_attivo_bordo",(el.value.trim()!=''));
		var els = document.getElementById("elencoTsubo").getElementsByTagName("p");
		for(e=0;e<els.length;e++){
			var i = els[e].getElementsByTagName("i")[0];
			var a = els[e].getElementsByTagName("a")[0];
			var siglaTsubo = a.id.replace("pt_","");
			var pass = false;
			//if(i.innerHTML.toLowerCase().indexOf(el.value.toLowerCase())==-1)pass = true;
			if(	DB.set.punti[siglaTsubo].NomeTsubo.toLowerCase().indexOf(el.value.toLowerCase())==-1 &&
				DB.set.punti[siglaTsubo].AzioniTsubo.toLowerCase().indexOf(el.value.toLowerCase())==-1 &&
				DB.set.punti[siglaTsubo].ChiaviTsubo.toLowerCase().indexOf(el.value.toLowerCase())==-1 ){
					pass = true;
			}
			els[e].classList.toggle("nasPT",pass);
		}
	},
	filtraGruppo: function( type, val, id ){
		if(typeof(type)=='undefined')var type = '';
		if(typeof(val)=='undefined')var val = '';
		if(typeof(id)=='undefined')var id = '';
		if(document.getElementById("punti_ricerca").value.trim()!='' && id){
			document.getElementById("punti_ricerca").value = '';
			document.getElementById("punti_ricerca").classList.remove("filtro_attivo_bordo");
		}
		if(SET.groupSel == id){
			type = '';
			val = '';
			id = '';
		}
		var elenchi = ["PTs","ARs"];
		for(a in elenchi){
			var els = scene.getObjectByName(elenchi[a]).children;
			for(e in els){
				var name = els[e].name;
				if(name.indexOf("_")==0)name = name.substr(3,3);
				else name = name.substr(2,3);
				var vis = (els[e].userData[type]==val || !type);
				els[e].visible = vis;
				if(document.getElementById("pt_"+name)){
					document.getElementById("pt_"+name).parentElement.classList.toggle("nasPT",!vis);
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
		SET.groupSel = id;
	},
	swFiltri: function(){
		document.getElementById("p_filtri").classList.toggle("op");
		document.getElementById("f_filtri").classList.toggle("visElPt");
	}
}