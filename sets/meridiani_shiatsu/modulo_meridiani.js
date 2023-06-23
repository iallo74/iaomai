
var MODULO_MERIDIANI = { // extend SET
	
	MERIDIANI_free: [ "LR" ],
	
	caricaMeridiani: function(){
		// carica la lista dei meridiani
		var contElencoMeridiani = contSmart = '';
		var n = 0;
		for(let m in DB.set.meridiani){
			n++;
			var addClass = addClassEl = '';
				
			
			// verifico le autorizzazioni
			var addLock =	(!SET.verFreeMeridiani(m)) ? ' lockedItem' : '';
			// --------------------------
			
			if(n==2 || n==4 || n==6 || n==8 || n==10 || n==12 || n==14){
				addClass = ' spazioDopo';
				addClassEl = ' spazioPrima';
			}
			
			var elencoTsubo = '';
			if(m=='CV' || m=='GV' || m=='NK')addClass +=	' noMAS';
			if(m!='NK')addClass +=	' noNMK';
			else{
				addClass +=	' NMK';
				elencoTsubo += '<p id="titNMK">'+TXT("Zone anatomiche")+'</p>';
			}
			for(let s in DB.set.meridiani[m].tsubo){
				if(!DB.set.meridiani[m].tsubo[s].siglaTsubo){
					let n = DB.set.meridiani[m].tsubo[s].NomeTsubo.split(".")[0]+"";
					if(n.length==1)n = '0'+n;
					DB.set.meridiani[m].tsubo[s].siglaTsubo = m+"."+n;
				}
				var TS = DB.set.meridiani[m].tsubo[s];
				if(m!='NK' || __(TS.apparato,-1)>-1){
					var addNMK = (m=='NK')? (s*1+1)+'.NK. ' : '';
					var elemento = (!__(DB.set.meridiani[m].tsubo[s].nascosto,false)) ? '<p>'+this.scriviTsubo(addNMK+TS.NomeTsubo,true,true,__(TS.siglaTsubo),m)+'</p>' : "";
					if(m=='NK'){
						// verifico le autorizzazioni
						var pT = addNMK.split(".");
						if(!SET.verFreePunti(pT[1]+"."+((pT[0].length==1)?"0":"")+pT[0])){
							elemento = elemento.replace("pallinoPat","pallinoPat lockedItem");
						}
						// --------------------------
						DB.set.apparati[TS.apparato].html += elemento;
					}else elencoTsubo += elemento;
				}
			}
			if(m=='NK'){
				for(a in DB.set.apparati){
					elencoTsubo += '<div class="apparati_nmk" id="apr_'+a+'"><p class="labelApparato" onClick="SET.swApparati(this);">'+DB.set.apparati[a].tit+'</p>'+DB.set.apparati[a].html+'</div>';
				}
			}
			var siglaPunto = m;
			//if(m!='EX')siglaPunto = SET.convSigla(m);
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
									'	   class="';
			if(m!='NK')contElencoMeridiani +=	'noMAS';	
			else contElencoMeridiani +=	'NMK visElPt';	
			contElencoMeridiani +=	' elencoPunti '+addClassEl+'">'+elencoTsubo+'</span>';

									
			if(m!='NK')contSmart += '<div onMouseOver="SET.eviMeridiano(\''+m+'\',true);"' +
									'     onMouseOut="SET.eviMeridiano(\''+m+'\',false);"' +
									'     onClick="SET.accendiMeridiano(\''+m+'\',true);"' + // elenco dei punti
									'	   id="sm'+m+'"' +
									'     class="sm_'+MERIDIANI[m].elemento+addClass+addLock+'">'+SET.convSigla(m)+'</div>';
		}
		sceltaSistemaTag = 	'<div class="menuElenchi"' +
								'	  onClick="MENU.visMM(\'sistemaMeridiani_p\');">' +
								'</div>' +		
							 	'<p id="sistemaMeridiani_p"><span id="selectCambioMeridiani"><i>'+htmlEntities(TXT("SistemaMeridiani"))+':</i><select id="sceltaMeridianiElenco" onChange="SET.cambiaSistema(this.value,true);">'+
								'  <option value=""';
		if(localStorage.sistemaMeridiani == '' || !__(localStorage.sistemaMeridiani) )sceltaSistemaTag += ' SELECTED';
		sceltaSistemaTag += 	'>'+htmlEntities(TXT("MeridianiCinesi"))+'</option>' +
								'  <option value="MAS"';
		if(localStorage.sistemaMeridiani == 'MAS')sceltaSistemaTag += ' SELECTED';
		sceltaSistemaTag += 	'>'+htmlEntities(TXT("MeridianiGiapponesi"))+'</option>' +
								'  <option value="NMK"';
		if(localStorage.sistemaMeridiani == 'NMK')sceltaSistemaTag += ' SELECTED';
		sceltaSistemaTag += 	'>'+htmlEntities(TXT("SistemaNamikoshi"))+'</option>' +
								'</select></span><i class="elMenu" id="cambioSistemaMeridiani" onClick="MENU.visImpset();"><span>'+htmlEntities(TXT("SistemaMeridiani2"))+'</span></i></p>';
		
		document.getElementById("lista_meridiani").innerHTML = sceltaSistemaTag+'<div class="lista listaMeridiani">'+contElencoMeridiani+'</div>';
		document.getElementById("meridianiSmart_cont").innerHTML = '<select id="sceltaMeridianiElenco_smart" onMouseOver="overInterfaccia=true;" onMouseOut="overInterfaccia=false;this.blur();" onchange="SET.cambiaSistema(this.value,true,true);"><option value="">Meridiani cinesi</option><option value="MAS">Estensioni Masunaga</option><option value="NMK">Sistema Namikoshi</option></select>'+contSmart;
		document.getElementById("sceltaMeridianiElenco_smart").value = localStorage.sistemaMeridiani;
		SET.filtraMeridiani();
	},
	eviMeridiano: function( m, b ){
		// evidenzia il meridiano al passaggio
		if(localStorage.sistemaMeridiani=='NMK')return;
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
	swApparati: function( el ){
		el.parentElement.classList.toggle("vis_apparati");
	},
	filtraMeridiani: function(){
		// filtra i meridiani negli elenchi (per masunaga che non ha CV e GV)
		document.querySelector(".listaMeridiani").classList.toggle("onlyCIN", (!localStorage.sistemaMeridiani));
		document.getElementById("meridianiSmart_cont").classList.toggle("onlyCIN", (!localStorage.sistemaMeridiani));
		document.getElementById("meridianiSmart_cont").classList.toggle("onlyNMK", (localStorage.sistemaMeridiani=='NMK'));
		document.querySelector(".listaMeridiani").classList.toggle("onlyNMK", (localStorage.sistemaMeridiani=='NMK'));
		document.querySelector(".listaPatologie").classList.toggle("onlyNMK", (localStorage.sistemaMeridiani=='NMK'));
		document.querySelector(".listaPatologie").classList.toggle("onlyMAS", (localStorage.sistemaMeridiani=='MAS'));
		document.querySelector(".listaPatologie").classList.toggle("onlyCIN", (localStorage.sistemaMeridiani==''));
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
		return !(SET.TSUBO_free.indexOf(siglaTsubo)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	}
	
}