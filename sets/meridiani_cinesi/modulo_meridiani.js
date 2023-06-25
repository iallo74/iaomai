
var MODULO_MERIDIANI = { // extend SET

	MERIDIANI_free: [ "LR" ],
	
	caricaMeridiani: function(){
		// carica i meridiani nell'elenco del menu
		var contElencoMeridiani = '',
			contSmart = '',
			n = 0;
		for(let m in DB.set.meridiani){
			n++;
			var addClass = '',
				addClassEl = '';
			
			// verifico le autorizzazioni
			var addLock =	(!SET.verFreeMeridiani(m)) ? ' lockedItem' : '';
			// --------------------------
			
			if(n==2 || n==4 || n==6 || n==8 || n==10 || n==12 || n==14){
				addClass = ' spazioDopo';
				addClassEl = ' spazioPrima';
			}
			var elencoPunti = '';
			let myObj = DB.set.meridiani[m].punti,
				keys = 	Object.keys(myObj),
				len = keys.length;
			keys.sort();		
			//for(let s in DB.set.meridiani[m].punti){
				for (let i=0; i<len; i++) {	
					let s = keys[i];
				var TS = DB.set.meridiani[m].punti[s];
				elencoPunti+='<p>'+this.scriviPunto(TS.NomePunto,true,true,__(TS.siglaPunto))+'</p>';
			}
			var siglaPunto = m;
			if(m!='EX')siglaPunto = SET.convSigla(m);
			
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
				'	<b>'+siglaPunto+'</b>' +
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
				'     class="sm_'+MERIDIANI[m].elemento+addClass+addLock+'">'+siglaPunto+'</div>';
		}
									
		document.getElementById("lista_meridiani").innerHTML = '<div class="lista listaMeridiani">'+contElencoMeridiani+'</div>';
		document.getElementById("meridianiSmart_cont").innerHTML = contSmart;
	},
	eviMeridiano: function( m, b ){
		// evidenzia il meridiano al passaggio del mouse
		if(!MERIDIANI[m].meridianoAcceso){
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
	verFreeMeridiani: function( m ){
		return !(SET.MERIDIANI_free.indexOf(m)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	},
	verFreePunti: function( siglaPunto ){
		var siglaMeridiano = siglaPunto.split(".")[1];
		return SET.verFreeMeridiani(siglaMeridiano);
	}
	
}