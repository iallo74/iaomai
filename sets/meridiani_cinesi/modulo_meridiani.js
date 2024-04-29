
var MODULO_MERIDIANI = { // extend SET

	MERIDIANI_free: [ "LR" ],
	
	componiMeridiani: function(){
		for(let m in DB.set.meridiani){
			if(!__(DB.set.meridiani[m].composto)){
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
		// carica i meridiani nell'elenco del menu
		let contElencoMeridiani = '',
			contSmart = '',
			n = 0;
		for(let m in DB.set.meridiani){
			n++;
			let addClass = '',
				addClassEl = '';
			
			// verifico le autorizzazioni
			let addLock =	(!SET.verFreeMeridiani(m)) ? ' lockedItem' : '';
			// --------------------------
			
			if(m=='KI' || m=='LR' || m=='SP' || m=='HT' || m=='PC' || m=='LU' || m=='CV'){
				addClass = ' spazioDopo';
				addClassEl = ' spazioPrima';
			}
			let elencoPunti = '';
			let myObj = DB.set.meridiani[m].punti,
				keys = 	Object.keys(myObj),
				len = keys.length;
			keys.sort();		
			//for(let s in DB.set.meridiani[m].punti){
			for (let i=0; i<len; i++) {	
				let s = keys[i];
				let TS = DB.set.meridiani[m].punti[s];
				elencoPunti+='<p>'+this.scriviPunto(TS.NomePunto,true,true,__(TS.siglaPunto))+'</p>';
			}
			let siglaMeridiano = m;
			//if(m!='EX')
			siglaMeridiano = SET.convSigla(m);
			
			contElencoMeridiani +=	
				'<div onMouseEnter="SET.eviMeridiano(\''+m+'\',true);"' +
				'     onMouseLeave="SET.eviMeridiano(\''+m+'\',false);"' +
				'     onClick="if(!SET.onElencoPt)SET.swElencoPt(this,\''+m+'\');"' + // elenco dei punti
				'	  id="p'+m+'"' +
				'     class="p_'+MERIDIANI[m].elemento+addClass+addLock+'">';
			if(m!='EX')contElencoMeridiani +=
				'	<span title="'+htmlEntities(TXT("AccendiMeridiano"))+'"' +
				'		  onMouseOver="SET.onElencoPt=true;this.parentElement.classList.add(\'overLight\');"' +
				'		  onMouseOut="SET.onElencoPt=false;this.parentElement.classList.remove(\'overLight\');"' +
				'		  onClick="SET.accendiMeridiano(\''+m+'\',true);"></span>';
			contElencoMeridiani +=	
				'	<b>'+siglaMeridiano+'</b>' +
					DB.set.meridiani[m].NomeMeridiano +
					' <strong title="'+htmlEntities(TXT("ElencoPunti"))+'"></strong>' +
				'</div>' +
				'<span id="e_'+m+'"' +
				'	   class="elencoPunti '+addClassEl+'">'+elencoPunti+'</span>';
									
			if(m!='EX')contSmart += 
				'<div onMouseOver="SET.eviMeridiano(\''+m+'\',true);"' +
				'     onMouseOut="SET.eviMeridiano(\''+m+'\',false);"' +
				'     onClick="SET.accendiMeridiano(\''+m+'\',true);"' + // elenco dei punti
				'	  id="sm'+m+'"' +
				'     class="sm_'+MERIDIANI[m].elemento+addClass+addLock+'">'+siglaMeridiano+'</div>';
		}
									
		document.getElementById("lista_meridiani").innerHTML = '<div class="lista listaMeridiani">'+contElencoMeridiani+'</div>';
		document.getElementById("meridianiSmart_cont").innerHTML = contSmart;
	},
	eviMeridiano: function( m, b ){
		if(touchable)return;
		// evidenzia il meridiano al passaggio del mouse
		if(!MERIDIANI[m].meridianoAcceso){
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
	verFreeMeridiani: function( m ){
		return !(SET.MERIDIANI_free.indexOf(m)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	},
	verFreePunti: function( siglaPunto ){
		let siglaMeridiano = siglaPunto.split(".")[1];
		return SET.verFreeMeridiani(siglaMeridiano);
	}
	
}