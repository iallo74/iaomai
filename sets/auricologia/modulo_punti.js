
var MODULO_PUNTI = { // extend SET
	
	PUNTI_free: [ "000","001","254","003","291","192","165","067","177","060","054","018","093","056","121","111","117","261","151" ],
	
	caricaPunti: function(){ // carica l'elenco dei punti e delle aree
		var n = 0;
		var contElenco = '';
		var elencoTsubo = '';
		var puntiElenco = [];
		for(siglaTsubo in DB.set.punti){
			if(__(DB.set.punti[siglaTsubo])){
				if(!__(DB.set.punti[siglaTsubo].hidden,false)){
					puntiElenco.push({
						siglaTsubo: siglaTsubo,
						NomeTsubo: DB.set.punti[siglaTsubo].NomeTsubo
					});
				}
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
							'	<div id="groupsList">' +
							
							'	<p id="f_INT"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'system\',\'\',\'INT\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_INT"))+'</i></a></p>' +
							
							'	<p id="f_EUR"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'system\',\'EUR\',\'EUR\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_EUR"))+'</i></a></p>' +
							
							'	<p id="f_CIN"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'system\',\'CIN\',\'CIN\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_CIN"))+'</i></a></p>' +
							
							'	<p id="f_MASTER"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'master\',true,\'MASTER\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_MASTER"))+'</i></a></p>' +
							
							'	<p id="f_FN"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'FN\',true,\'FN\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_FN"))+'</i></a></p>' +
							
							'	<p id="f_NR"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'FN\',false,\'NR\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_NR"))+'</i></a></p>';
							
							
			var groups = [	"BACK_TORSO",
							"HEAD_FACE",
							"LOWER_LIMBS",
							"UPPER_LIMBS",
							"SENSORY_ORGANS",
							"DIGESTIVE_SYSTEM",
							"THORACIC_ORGANS",
							"ABDOMINAL_ORGANS",
							"UROGENITAL_ORGANS",
							"PERIPHERAL_ENDOCRINE_GLANDS",
							"CRANIAL_ENDOCRINE_GLANDS",
							"PERIPHERAL_NERVOUS_SYSTEM",
							"BRAIN_SPINAL_CORD",
							"CEREBRAL_CORTEX" ];
			for(a in groups){
				contFiltri +=	'	<p id="f_'+groups[a]+'"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
								'					onclick="SET.filtraGruppo(\'group\',\''+groups[a]+'\',\''+groups[a]+'\');">'+
								'			<i>'+htmlEntities(TXT("Gruppi_"+groups[a]))+'</i></a></p>';
			}
							
							
			contFiltri +=	'	<p id="f_292"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'292\',\'292\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_292"))+'</i></a></p>' +
							
							'	<p id="f_584"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'584\',\'584\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_584"))+'</i></a></p>' +
							
							'	<p id="f_1168"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'1168\',\'1168\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_1168"))+'</i></a></p>' +
							
							'	<p id="f_2336"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'2336\',\'2336\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_2336"))+'</i></a></p>' +
							
							'	<p id="f_4672"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'4672\',\'4672\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_4672"))+'</i></a></p>' +
							
							'	<p id="f_9334"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'9334\',\'9334\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_9334"))+'</i></a></p>' +
							
							'	<p id="f_18688"><a class="pallinoPat pallinoPatEsteso pallinoGroup" '+
							'					onclick="SET.filtraGruppo(\'freq\',\'18688\',\'18688\');">'+
							'			<i>'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_18688"))+'</i></a></p>' +
							
							'</div></span>';
						
						
		if(elencoTsubo){
			contElenco +=	'<div onClick="SET.swElencoPt(this,\'punti\');"' +
							'     id="p_punti"' +
							'     class="p_punti">'+htmlEntities(TXT("ElencoPunti"))+'<strong></strong></div>' +
							'<span id="e_punti"' +
							'	   class="elencoPunti">'+
							
							contFiltri +
							'<div id="elencoTsubo">' + elencoTsubo + '</div></span>';
		}
		
		var legenda = [];	
		var sceltaPuntiTag = 	'<div class="menuElenchi"' +
								'	  onClick="MENU.visMM(\'sistemaPunti_p\');">' +
								'</div><p id="sistemaPunti_p"><span id="selectCambioMappa">';
			
		//sceltaPuntiTag += 	'<i>'+htmlEntities(TXT("PhaseAttiva"))+':</i>';
		
		sceltaPuntiTag += 	'<select id="sceltaPhaseElenco" onChange="SET.setPhase(this.value);">';
		var phases = [	"",
						"2",
						"3" ];
		for(h in phases){
			sceltaPuntiTag += 	'  <option value="'+phases[h]+'"';
			if(SET.phase == phases[h])sceltaPuntiTag += ' SELECTED';
			sceltaPuntiTag += 	'>'+htmlEntities(TXT("Phase_"+phases[h]))+'</option>';
		}
		sceltaPuntiTag += '</select>';
				
		if(GEOMETRIE.mappe.length>1){		
			//sceltaPuntiTag += 	'<i>'+htmlEntities(TXT("MappaAttiva"))+':</i>';
			
			sceltaPuntiTag += 	'<select id="sceltaMappaElenco"';
			if(!globals.modello.cartella)sceltaPuntiTag +=
								'		 onClick="this.blur();ALERT(TXT(\'alertApriModello\'));return;"' +
								'		 style="opacity:0.5;"';
			sceltaPuntiTag += 	'		 onChange="SET.cambiaMappa(this.value);">';
			for(m in GEOMETRIE.mappe){
				var name = GEOMETRIE.mappe[m].name;
				sceltaPuntiTag += 	'  <option value="'+name+'"';
				if(localStorage.imgMappa == name)sceltaPuntiTag += ' SELECTED';
				sceltaPuntiTag += 	'>'+htmlEntities(TXT("Mappa_"+name))+'</option>';
				if(name == localStorage.imgMappa){
					legenda = GEOMETRIE.mappe[m].legenda;
				}
			}
			sceltaPuntiTag += 	'</select>';
		}
		sceltaPuntiTag += 	'</select>';
		sceltaPuntiTag += 	'</span><i class="elMenu" id="cambioSistemaPunti" onClick="MENU.visImpset();"><span>'+htmlEntities(TXT("SistemaPuntiEuropeo"))+'</span></i></p>';
		
		
		
		
		
		
		// LEGENDA
		var elencoLegenda = '';
		for(l=0;l<legenda.length;l++){
			if(legenda[l].name=='settings'){
				settings = legenda[l];
			}else if(legenda[l].type=='dida'){
				elencoLegenda+='<p class="legendaDida italic">'+htmlEntities(TXT("Legenda_"+legenda[l].name))+'</p>';
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
				elencoLegenda+=htmlEntities(TXT("Legenda_"+legenda[l].name))+'</p>';
			}
		}
		elencoLegenda+=	'<p class="legendaDida points">'+
						'<i>' + htmlEntities(TXT("Legenda_DidaPunti_tit")) + '</i>' +
						'<br><span class="pINT"></span>' + htmlEntities(TXT("Legenda_DidaPunti_INT")) + 
						'<br><span class="pEUR"></span>' + htmlEntities(TXT("Legenda_DidaPunti_EUR")) + 
						'<br><span class="pCIN"></span>' + htmlEntities(TXT("Legenda_DidaPunti_CIN")) + 
						'</p>';
		if(elencoLegenda){
			contElenco +=	'<div id="p_legenda"';
			if(!globals.modello.cartella)contElenco +=	
							'	  onClick="ALERT(TXT(\'alertApriModello\'));return;"' +
							'	  style="opacity:0.5;"';
			else contElenco +=	
							'	  onClick="SET.swElencoPt(this,\'legenda\');"';
			contElenco +=	'     class="p_punti">'+htmlEntities(TXT("Legenda"))+'<strong></strong></div>' +
							'<span id="e_legenda"' +
							'	   class="elencoPunti">'+
							elencoLegenda +
							'</span>';
		}
		
		document.getElementById("lista_punti").innerHTML = sceltaPuntiTag+'<div class="lista listaPunti">'+contElenco+'</div>';
		
		var pass = false;
		for(e in localStorage){
			if(typeof(e)!='undefined'){
				if(e.indexOf("auricolo_mn_")==0){
					if(localStorage[e]!='' && globals.modello.cartella)document.getElementById("p_"+e.replace("auricolo_mn_","")).click();
					pass = true;
				}
			}
		}
		if(!pass && globals.modello.cartella)document.getElementById("p_legenda").click();
		if(SET.groupSel.id)SET.filtraGruppo( SET.groupSel.type, SET.groupSel.val, SET.groupSel.id, true );
	},
	swElencoPt: function( el, m ){ // mostra/nasconde un elenco (punti e aree, legenda, ecc...)
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
	filtraPunti: function(){ // filtra i punti per testo
		if(SET.groupSel.id)SET.filtraGruppo();
		var el = document.getElementById("punti_ricerca");
		el.classList.toggle("filtro_attivo_bordo",(el.value.trim()!=''));
		var els = document.getElementById("elencoTsubo").getElementsByTagName("p");
		for(e=0;e<els.length;e++){
			var i = els[e].getElementsByTagName("i")[0];
			var a = els[e].getElementsByTagName("a")[0];
			var siglaTsubo = a.id.replace("ts_","");
			var pass = false;
			if(	DB.set.punti[siglaTsubo].NomeTsubo.toLowerCase().indexOf(el.value.toLowerCase())==-1 &&
				DB.set.punti[siglaTsubo].AzioniTsubo.toLowerCase().indexOf(el.value.toLowerCase())==-1 &&
				DB.set.punti[siglaTsubo].ChiaviTsubo.toLowerCase().indexOf(el.value.toLowerCase())==-1 ){
					pass = true;
			}
			if(!__(DB.set.punti[siglaTsubo]["PH"+SET.phase],false) && SET.phase)pass = true;
			if(!document.getElementById("ts_"+siglaTsubo))pass = true;
			els[e].classList.toggle("nasPT",pass);
		}
	},
	filtraGruppo: function( type, val, id , forza){ // filtra i punti pruppo
		if(typeof(type)=='undefined')var type = '';
		if(typeof(val)=='undefined')var val = '';
		if(typeof(id)=='undefined')var id = '';
		if(typeof(forza)=='undefined')var forza = false;
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
					if(!type)vis = true;
				}
				var visEl = vis;
				if(DB.set.punti[name].hidden)visEl = false;
				if(__(els[e].userData.locked,false))visEl = false;
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
							
							'<span>'+htmlEntities(TXT("FiltriSmart")) + '</span>' +
							
							'<i>'+htmlEntities(TXT("LabelSmart_Sistema")) + '</i>' +
							
							'	<div id="sf_INT" onClick="SET.filtraGruppo(\'system\',\'\',\'INT\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_INT.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_INT")) + '"></div>' +
							
							'	<div id="sf_EUR" onClick="SET.filtraGruppo(\'system\',\'EUR\',\'EUR\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_EUR.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_EUR")) + '"></div>' +
							
							'	<div id="sf_CIN" onClick="SET.filtraGruppo(\'system\',\'CIN\',\'CIN\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_CIN.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_CIN")) + '"></div>' +
							
							'<i>'+htmlEntities(TXT("LabelSmart_Tipologie")) + '</i>' +
							
							'	<div id="sf_MASTER" onClick="SET.filtraGruppo(\'master\',true,\'MASTER\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_MASTER.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_MASTER")) + '"></div>' +
							
							'	<div id="sf_FN" onClick="SET.filtraGruppo(\'FN\',true,\'FN\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_FN.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_FN")) + '"></div>' +
							
							'	<div id="sf_NR" onClick="SET.filtraGruppo(\'FN\',false,\'NR\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_NR.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_NR")) + '"></div>' +
							
							'<i>'+htmlEntities(TXT("LabelSmart_Anatomia")) + '</i>';
							
		var groups = [	"BACK_TORSO",
						"HEAD_FACE",
						"LOWER_LIMBS",
						"UPPER_LIMBS",
						"SENSORY_ORGANS",
						"DIGESTIVE_SYSTEM",
						"THORACIC_ORGANS",
						"ABDOMINAL_ORGANS",
						"UROGENITAL_ORGANS",
						"PERIPHERAL_ENDOCRINE_GLANDS",
						"CRANIAL_ENDOCRINE_GLANDS",
						"PERIPHERAL_NERVOUS_SYSTEM",
						"BRAIN_SPINAL_CORD",
						"CEREBRAL_CORTEX" ];
		for(a in groups){
			contFiltri +=	'	<div id="sf_'+groups[a]+'" '+
							'        onClick="SET.filtraGruppo(\'group\',\''+groups[a]+'\',\''+groups[a]+'\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_'+groups[a]+'.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_"+groups[a])) + '"></div>';
		}
						
		contFiltri +=		'<i>'+htmlEntities(TXT("LabelSmart_Frequenze")) + '</i>' +
							
							'	<div id="sf_292" onClick="SET.filtraGruppo(\'freq\',\'292\',\'292\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_292.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_292")) + '"></div>' +
							
							'	<div id="sf_584" onClick="SET.filtraGruppo(\'freq\',\'584\',\'584\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_584.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_584")) + '"></div>' +
							
							'	<div id="sf_1168" onClick="SET.filtraGruppo(\'freq\',\'1168\',\'1168\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_1168.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_1168")) + '"></div>' +
							
							'	<div id="sf_2336" onClick="SET.filtraGruppo(\'freq\',\'2336\',\'2336\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_2336.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_2336")) + '"></div>' +
							
							'	<div id="sf_4672" onClick="SET.filtraGruppo(\'freq\',\'4672\',\'4672\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_4672.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_4672")) + '"></div>' +
							
							'	<div id="sf_9334" onClick="SET.filtraGruppo(\'freq\',\'9334\',\'9334\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_9334.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_9334")) + '"></div>' +
							
							'	<div id="sf_18688" onClick="SET.filtraGruppo(\'freq\',\'18688\',\'18688\');"'+
							'		 style="background-image:url(sets/'+globals.set.cartella+'/img/sf_18688.png);"'+
							'		 title="'+htmlEntities(TXT("Gruppi_Frequenza"))+' '+htmlEntities(TXT("Legenda_18688")) + '"></div>' +
							
							'</div>';
		document.getElementById("divs").innerHTML = contFiltri;
	},
	
	swFiltriSmart: function(){ // visualizza/nasconde il menu rapido dei filtri (in alto a SX)
		document.getElementById("filtriSmart_cont").classList.toggle("visSch");
	},
	setPhase: function( ph ){ // seleziona la fase di Nogier
		var PT_name = "";
		if(SET.ptSel)PT_name = SET.ptSel.name;
		SET.chiudiTsubo(true);
		scene.getObjectByName("PTs").visible = false;
		scene.getObjectByName("LNs").visible = false;
		scene.getObjectByName("ARs").visible = false;
		scene.getObjectByName("PTs2").visible = false;
		scene.getObjectByName("LNs2").visible = false;
		scene.getObjectByName("ARs2").visible = false;
		scene.getObjectByName("PTs3").visible = false;
		scene.getObjectByName("LNs3").visible = false;
		scene.getObjectByName("ARs3").visible = false;
		
		scene.getObjectByName("PTs"+ph).visible = true;
		scene.getObjectByName("LNs"+ph).visible = true;
		scene.getObjectByName("ARs"+ph).visible = true;
		
		SET.phase = ph;
		SET.filtraPunti();
		if(PT_name){
			setTimeout( function(){
				SET.apriTsubo(PT_name);
			}, 200, PT_name );
		}
	}
}