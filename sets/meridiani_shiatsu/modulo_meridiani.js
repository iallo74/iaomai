
var MODULO_MERIDIANI = { // extend SET
	
	MERIDIANI_free: [ "LR" ],
	
	caricaMeridiani: function(){
		// carica la lista dei meridiani
		var contElencoMeridiani = contSmart = '';
		var n = 0;
		for(m in DB.set.meridiani){
			n++;
			var addClass = addClassEl = '';
				
			
			// verifico le autorizzazioni
			var addLock =	(!SET.verFreeMeridiani(m)) ? ' lockedItem' : '';
			// --------------------------
			
			if(n==2 || n==4 || n==6 || n==8 || n==10 || n==12 || n==14){
				addClass = ' spazioDopo';
				addClassEl = ' spazioPrima';
			}
			if(m=='CV' || m=='GV')addClass +=	' noMAS';
			var elencoTsubo = '';
			for(s in DB.set.meridiani[m].tsubo){
				var TS = DB.set.meridiani[m].tsubo[s];
				elencoTsubo+='<p>'+this.scriviTsubo(TS.NomeTsubo,true,true,__(TS.siglaTsubo))+'</p>';
			}
			var siglaPunto = m;
			if(m!='EX')siglaPunto = SET.convSigla(m);
			
			contElencoMeridiani +=	'<div onMouseOver="SET.eviMeridiano(\''+m+'\',true);"' +
									'     onMouseOut="SET.eviMeridiano(\''+m+'\',false);"' +
									'     onClick="SET.clickMeridiano(\''+m+'\',this);"' +
									'     id="p'+m+'"' +
									'     class="p_'+MERIDIANI[m].elemento+addClass+addLock;
									
			contElencoMeridiani +=	'">' +
									'	<span class="noMAS"' +
									'		  title="'+htmlEntities(TXT("AccendiMeridiano"))+'"' +
									'		  onMouseOver="SET.onElencoPt=true;this.parentElement.classList.add(\'overLight\');"' +
									'		  onMouseOut="SET.onElencoPt=false;this.parentElement.classList.remove(\'overLight\');"' +
									'		  onClick="SET.accendiMeridiano(\''+m+'\',true);"></span>';
			
			contElencoMeridiani +=	'	<b>'+siglaPunto+'</b>' +
										DB.set.meridiani[m].NomeMeridiano +
									'	<span class="noCIN"></span>' +
									'	<strong class="noMAS" title="'+htmlEntities(TXT("ElencoPunti"))+'"></strong>' +
									'</div>' +
									'<span id="e_'+m+'"' +
									'	   class="noMAS elencoPunti '+addClassEl+'">'+elencoTsubo+'</span>';

									
			contSmart += '<div onMouseOver="SET.eviMeridiano(\''+m+'\',true);"' +
						 '     onMouseOut="SET.eviMeridiano(\''+m+'\',false);"' +
						 '     onClick="SET.accendiMeridiano(\''+m+'\',true);"' + // elenco dei punti
						 '	   id="sm'+m+'"' +
						 '     class="sm_'+MERIDIANI[m].elemento+addClass+addLock+'">'+SET.convSigla(m)+'</div>';
		}
		sceltaMeridianiTag = 	'<div class="menuElenchi"' +
								'	  onClick="MENU.visMM(\'sistemaMeridiani_p\');">' +
								'</div>' +		
							 	'<p id="sistemaMeridiani_p"><span id="selectCambioMeridiani"><i>'+htmlEntities(TXT("SistemaMeridiani"))+':</i><select id="sceltaMeridianiElenco" onChange="SET.cambiaSistema(this.value,true);">'+
								'  <option value=""';
		if(localStorage.sistemaMeridiani == '' || !__(localStorage.sistemaMeridiani) )sceltaMeridianiTag += ' SELECTED';
		sceltaMeridianiTag += 	'>'+htmlEntities(TXT("MeridianiCinesi"))+'</option>' +
								'  <option value="MAS"';
		if(localStorage.sistemaMeridiani == 'MAS')sceltaMeridianiTag += ' SELECTED';
		sceltaMeridianiTag += 	'>'+htmlEntities(TXT("MeridianiGiapponesi"))+'</option>' +
								'</select></span><i class="elMenu" id="cambioSistemaMeridiani" onClick="MENU.visImpset();"><span>'+htmlEntities(TXT("SistemaMeridiani2"))+'</span></i></p>';
		
		document.getElementById("lista_meridiani").innerHTML = sceltaMeridianiTag+'<div class="lista listaMeridiani">'+contElencoMeridiani+'</div>';
		document.getElementById("meridianiSmart_cont").innerHTML = contSmart;
		SET.filtraMeridiani();
	},
	eviMeridiano: function( m, b ){
		// evidenzia il meridiano al passaggio
		if(!MERIDIANI[m+localStorage.sistemaMeridianiAdd].meridianoAcceso){
			if(b)SET.coloraMeridiano(m,'Over','Over');
			else SET.coloraMeridiano(m,'','Base');
		}
	},
	swMeridianiSmart: function(){
		// visualizza/nasconde il menu rapido dei meridiani (in alto a SX)
		document.getElementById("meridianiSmart_cont").classList.toggle("visSch");
	},
	swElencoPt: function( el, m ){
		// mostra/nasconde l'elenco dei punti di un meridiano
		if(!document.getElementById("e_"+m).classList.contains("visElPt")){
			document.getElementById("e_"+m).classList.add("visElPt");
			el.classList.add("frSw");
		}else{
			document.getElementById("e_"+m).classList.remove("visElPt")
			el.classList.remove("frSw");
		}
	},
	filtraMeridiani: function(){
		// filtra i meridiani negli elenchi (per masunaga che non ha CV e GV)
		var vis = 'none';
		if(!localStorage.sistemaMeridiani)vis = 'block';
		
		document.querySelector(".listaMeridiani").classList.toggle("onlyCIN", (!localStorage.sistemaMeridiani));
		document.getElementById("meridianiSmart_cont").classList.toggle("onlyCIN", (!localStorage.sistemaMeridiani));
	},
	clickMeridiano: function( m, el ){
		//
		if(localStorage.sistemaMeridiani == 'MAS'){
			SET.accendiMeridiano(m,true);
		}else{
			if(!SET.onElencoPt)SET.swElencoPt(el,m);
		}
	},
	verFreeMeridiani: function( m ){
		return !(SET.MERIDIANI_free.indexOf(m)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	},
	verFreePunti: function( siglaTsubo ){
		var siglaMeridiano = siglaTsubo.split(".")[1];
		return SET.verFreeMeridiani(siglaMeridiano);
	}
	
}