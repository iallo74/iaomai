
var MODULO_MERIDIANI = { // extend SET
	
	MERIDIANI_free: [ "LR", "NK" ],
	
	componiMeridiani: function(){
		for(let m in DB.set.meridiani){
			if(m!='NK' && !__(DB.set.meridiani[m].composto)){
				DB.set.meridiani[m].composto = true;
				for(let p in DB.set.meridiani[m].punti){

					DB.set.meridiani[m].punti[p].NomePunto = 
						+p + "." + m + ". " +
						DB.mtc.meridiani[m].punti[p].pinyin + " (" +
						DB.set.meridiani[m].punti[p].NomePunto + ")";

					DB.set.meridiani[m].punti[p].ChiaviPunto += ' '+DB.mtc.meridiani[m].punti[p].pinyin +
																' '+m+"."+p +
																' '+m+"-"+ +p +
																' '+m+"."+ +p +
																' '+m+"-"+ +p +
																' '+p+"."+m +
																' '+p+"-"+m +
																' '+ +p +"."+m; +
																' '+ +p +"-"+m;
				}
			}
		}
		SET.caricaMeridiani();
	},
	caricaMeridiani: function(){
		// carica la lista dei meridiani
		let contElencoMeridiani = contSmart = '';
		for(let a in DB.set.apparatiNMK){
			DB.set.apparatiNMK[a].html = '';
		}
		let n = 0;
		for(let m in DB.set.meridiani){
			if(m!='EX'){
				n++;
				let addClass = '',
					addClassEl = '';
					
				
				// verifico le autorizzazioni
				let addLock =	(	(!SET.verFreeMeridiani(m) || !SET.verAttModule()) && !SET.verLightVersion() ) ? ' lockedItem' : '';
				// --------------------------
				
				if(m=='KI' || m=='LR' || m=='SP' || m=='HT' || m=='PC' || m=='LU' || m=='CV'){
					addClass = ' spazioDopo';
					addClassEl = ' spazioPrima';
				}
				
				let elencoPunti = '';
				if(m=='CV' || m=='GV' || m=='NK')addClass +=	' noMAS';
				if(m!='NK')addClass +=	' noNMK';
				else addClass += ' NMK';
				let myObj = DB.set.meridiani[m].punti,
					keys = 	Object.keys(myObj),
					len = keys.length;
				keys.sort();
				
				if(m!='NK'){
					for (let i=0; i<len; i++) {	
						let nPunto = keys[i],
							TS = DB.set.meridiani[m].punti[nPunto],
							elemento = (!__(DB.set.meridiani[m].punti[nPunto].nascosto,false)) ? '<p>'+this.scriviPunto(TS.NomePunto,true,true,__(TS.siglaPunto),m)+'</p>' : "";
						if(	(!SET.verFreePunti(m+"."+nPunto) || (SET.PUNTI_free.indexOf(m+"."+nPunto)==-1 && !SET.verAttModule())) && !SET.verLightVersion() ){
							elemento = elemento.replace("pallinoPat","pallinoPat lockedItem");
						}
						elencoPunti += elemento;
					}
					
				}
				if(m=='NK'){
					let seq = 0;
					for(a in DB.set.sequenzaNMK){
						if(DB.set.sequenzaNMK[a].label)elencoPunti += '<i class="labelSequenzaNMK">'+DB.set.sequenzaNMK[a].label+'</i>';
						elencoPunti += '<div class="sequenze_nmk" id="apr_'+a+'"><p class="labelSequenza" onClick="SET.swSequenze(this);">'+DB.set.sequenzaNMK[a].tit+'</p>';
						

						for (let i in DB.set.sequenzaNMK[a].punti) {	
							let gruppo = '',
								gruppoForzato = '';

							if(DB.set.sequenzaNMK[a].gruppo)gruppo = DB.set.sequenzaNMK[a].gruppo;
							let nPunto = DB.set.sequenzaNMK[a].punti[i];
							
							if(nPunto.indexOf(".")>-1){
								gruppoForzato = nPunto.split(".")[1];
								gruppo = gruppoForzato;
								nPunto = nPunto.split(".")[0];
							}

							let TS = DB.set.meridiani[m].punti[nPunto];
							if(__(TS.rif,'')){
								nPunto = TS.rif.split(".")[0];
								if(!gruppoForzato)gruppo += TS.rif.split(".")[1];
							}
							seq++;
							let pulsantePunto = (!__(DB.set.meridiani[m].punti[nPunto].nascosto,false)) ? '<p>'+this.scriviPunto(nPunto+'.NK. '+TS.NomePunto,true,true,__(TS.siglaPunto),m,gruppo,seq)+'</p>' : "";
							
							// verifico le autorizzazioni
						
							if(	(!SET.verFreePunti("NK."+nPunto) ||
								(SET.PUNTI_free.indexOf("NK."+nPunto)==-1 && !SET.verAttModule())) && !SET.verLightVersion() ){
								pulsantePunto = pulsantePunto.replace("pallinoPat","pallinoPat lockedItem");
							}
							// --------------------------
							elencoPunti += pulsantePunto;
						}

						elencoPunti += '</div>';
					}
				}
				let siglaMeridiano = m;
				if(m!='NK')siglaMeridiano = SET.convSigla(m);
				
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
				
				contElencoMeridiani +=	'	<b>'+siglaMeridiano+'</b>' +
											DB.set.meridiani[m].NomeMeridiano +
										'	<span class="noCIN"></span>' +
										'	<strong class="noMAS" title="'+htmlEntities(TXT("ElencoPunti"))+'"></strong>' +
										'</div>' +
										'<span id="e_'+m+'"' +
										'	   class="';
				if(m!='NK')contElencoMeridiani +=	'noMAS';	
				else{
					contElencoMeridiani +=	'NMK visElPt';	
					elencoPunti += 	
						'<p id="legendaNMK">' +
						'	<i class="labelSequenzaNMK">'+TXT("Legenda")+'</i>' +
						'	<img src="sets/meridiani_shiatsu/img/legenda_punti.png"> '+TXT("LegendaPunti")+"<br>" +
						'	<img src="sets/meridiani_shiatsu/img/legenda_aree.png"> '+TXT("LegendaAree")+"<br>" +
						'	<img src="sets/meridiani_shiatsu/img/legenda_sostegno.png"> '+TXT("LegendaSostegno")+"<br>" +
						'	<img src="sets/meridiani_shiatsu/img/legenda_direzione.png"> '+TXT("LegendaDirezione")+"<br>" +
						'	<img src="sets/meridiani_shiatsu/img/legenda_stiramenti.png"> '+TXT("LegendaStiramenti")+"<br>" +
						'</p>';
				}
				contElencoMeridiani +=	' elencoPunti '+addClassEl+'">'+elencoPunti+'</span>';

										
				if(m!='NK')contSmart += '<div onMouseOver="SET.eviMeridiano(\''+m+'\',true);"' +
										'     onMouseOut="SET.eviMeridiano(\''+m+'\',false);"' +
										'	  onTouchStart="SET.startSmPress(this);"' +
										'     onClick="SET.accendiMeridiano(\''+m+'\',true);"' + // elenco dei punti
										'	   id="sm'+m+'"' +
										'     class="sm_'+MERIDIANI[m].elemento+addClass+addLock+'">'+SET.convSigla(m)+'</div>';
				
			}
		}
	
		document.getElementById("lista_meridiani").innerHTML = '<div class="lista listaMeridiani">'+contElencoMeridiani+'</div>';
		
		

		document.getElementById("meridianiSmart_cont").innerHTML = contSmart;
		SET.filtraMeridiani();
	},
	startSmPress: function( el ){
		SET.smPressed = el;
		SET.smActive = !el.classList.contains("elencoSel");
		window.addEventListener("touchmove", SET.moveSmPress,{ passive: false });
		window.addEventListener("touchend", SET.endSmPress,true);
	},
	moveSmPress: function( event ){
		event.preventDefault();
		let mX = event.targetTouches[0].pageX,
			mY = event.targetTouches[0].pageY,
			els = document.getElementById("meridianiSmart_cont").getElementsByTagName("div");
		for(e=0;e<els.length;e++){
			let x = tCoord(els[e]),
				y = tCoord(els[e],'y'),
				w = els[e].scrollWidth,
				h = els[e].scrollHeight;
			if(	mX>=x && 
				mX<=x+w && 
				mY>=y && 
				mY<=y+h &&
				els[e]!=SET.smPressed &&
				els[e].classList.contains("elencoSel")!=SET.smActive ){
					SET.accendiMeridiano(els[e].id.replace("sm",""),true);
			}
		}
		if(SET.smPressed.classList.contains("elencoSel")!=SET.smActive){
			SET.accendiMeridiano(SET.smPressed.id.replace("sm",""),true);
		}
	},
	endSmPress: function(){
		window.removeEventListener("touchmove", SET.moveSmPress,{ passive: false });
		window.removeEventListener("touchend", SET.endSmPress,true);
		SET.smPressed=false;
		SET.smActive=false;
	},
	eviMeridiano: function( m, b ){
		if(touchable)return;
		// evidenzia il meridiano al passaggio
		if(localStorage.sistemaMeridiani=='NMK')return;
		if(!MERIDIANI[m+localStorage.sistemaMeridianiAdd].meridianoAcceso){
			if(b)SET.coloraMeridiano(m,'Over','Over');
			else SET.coloraMeridiano(m,'','Base');
		}
	},
	swMeridianiSmart: function(forza){
		// visualizza/nasconde il menu rapido dei meridiani (in alto a SX)
		document.getElementById("meridianiSmart_cont").classList.toggle("visSch",forza);
		document.getElementById("meridianiSmart_ico").classList.toggle("visSch",forza);
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
	swSequenze: function( el ){
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

		document.getElementById("scheda").classList.toggle("onlyNMK", (localStorage.sistemaMeridiani=='NMK'));
		document.getElementById("scheda").classList.toggle("onlyMAS", (localStorage.sistemaMeridiani=='MAS'));
		document.getElementById("scheda").classList.toggle("onlyCIN", (localStorage.sistemaMeridiani==''));

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
		if(globals.allowFreeVer)return true; // bypassato per versione free
		return !(SET.MERIDIANI_free.indexOf(m)==-1 && (SET.blur || !LOGIN.logedin()));
	},
	verFreePunti: function( siglaPunto ){
		if(globals.allowFreeVer)return true; // bypassato per versione free
		return !(SET.PUNTI_free.indexOf(siglaPunto)==-1 && (SET.blur || !LOGIN.logedin()));
	},
	verAttModule: function(){
		if(globals.allowFreeVer)return true; // bypassato per versione free
		return DB.login.data.modls.indexOf(localStorage.sistemaMeridiani==''?'CIN':localStorage.sistemaMeridiani)>-1;
	},
	verLightVersion: function(){
		if(globals.allowFreeVer)return true; // bypassato per versione free
		let ret = DB.login.data.modls.indexOf("light")>-1;
		if(	DB.login.data.modls.indexOf("CIN")>-1 ||
			DB.login.data.modls.indexOf("MAS")>-1/*  ||
			DB.login.data.modls.indexOf("NMK")>-1 */)ret = false;
		if(!LOGIN.logedin())ret = false;
		return ret;
	},
	verLicenses: function(){
		return 	DB.login.data.modls.indexOf("CIN")>-1 || 
				DB.login.data.modls.indexOf("MAS")>-1 || 
				DB.login.data.modls.indexOf("NMK")>-1 || 
				DB.login.data.modls.indexOf("light")>-1;
	}
	
}