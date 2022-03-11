
var MODULO_MERIDIANI = { // extend SET
	MERIDIANI_free: [ "LR" ],
	caricaMeridiani: function(){
		// meridiani
		var contElencoMeridiani = contSmart = '';
		var n = 0;
		for(m in DB.set.meridiani){
			n++;
			var addClass = addClassEl = '';
			
			// verifico le autorizzazioni
			var addLock =	SET.MERIDIANI_free.indexOf(m)==-1 && 
							(DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()) ? ' lockedItem' : '';
			// --------------------------
			
			if(n==2 || n==4 || n==6 || n==8 || n==10 || n==12 || n==14){
				addClass = ' spazioDopo';
				addClassEl = ' spazioPrima';
			}
			var elencoTsubo = '';
			for(s in DB.set.meridiani[m].tsubo){
				var TS = DB.set.meridiani[m].tsubo[s];
				elencoTsubo+='<p>'+this.scriviTsubo(TS.NomeTsubo,true,true,__(TS.siglaTsubo))+'</p>';
			}
			var siglaPunto = m;
			if(m!='EX')siglaPunto = SET.convSigla(m);
			//else siglaPunto = m;
			
			contElencoMeridiani +=	'<div onMouseEnter="SET.eviMeridiano(\''+m+'\',true);"' +
									'     onMouseLeave="SET.eviMeridiano(\''+m+'\',false);"' +
									'     onClick="if(!SET.onElencoPt)SET.swElencoPt(this,\''+m+'\');"' + // elenco dei punti
									'	  id="p'+m+'"' +
									'     class="p_'+MERIDIANI[m].elemento+addClass+addLock+'">';
			if(m!='EX')contElencoMeridiani +=
									'	<span title="'+htmlEntities(Lingua(TXT_AccendiMeridiano))+'"' +
									'		  onMouseOver="SET.onElencoPt=true;this.parentElement.classList.add(\'overLight\');"' +
									'		  onMouseOut="SET.onElencoPt=false;this.parentElement.classList.remove(\'overLight\');"' +
									'		  onClick="SET.accendiMeridiano(\''+m+'\',true);"></span>';
			contElencoMeridiani +=	'	<b>'+siglaPunto+'</b>' +
										DB.set.meridiani[m].NomeMeridiano +
										' <strong title="'+htmlEntities(Lingua(TXT_ElencoPunti))+'"></strong>' +
									'</div>' +
									'<span id="e_'+m+'"' +
									'	   class="elencoPunti '+addClassEl+'">'+elencoTsubo+'</span>';
									
			if(m!='EX')contSmart += '<div onMouseOver="SET.eviMeridiano(\''+m+'\',true);"' +
									'     onMouseOut="SET.eviMeridiano(\''+m+'\',false);"' +
									'     onClick="SET.accendiMeridiano(\''+m+'\',true);"' + // elenco dei punti
									'	  id="sm'+m+'"' +
									'     class="sm_'+MERIDIANI[m].elemento+addClass+addLock+'">'+siglaPunto+'</div>';
		}
									
		document.getElementById("lista_meridiani").innerHTML = '<div class="lista listaMeridiani">'+contElencoMeridiani+'</div>';
		document.getElementById("meridianiSmart_cont").innerHTML = contSmart;
	},
	eviMeridiano: function(m,b){
		if(!MERIDIANI[m].meridianoAcceso){
			if(b)SET.coloraMeridiano(m,'Over','Over');
			else SET.coloraMeridiano(m,'','Base');
		}
	},
	swMeridianiSmart: function(){ // visualizza/nasconde il menu rapido dei meridiani (in alto a SX)
		document.getElementById("meridianiSmart_cont").classList.toggle("visSch");
	},
	swElencoPt: function( el, m ){
		//if(!smartMenu){
			if(!document.getElementById("e_"+m).classList.contains("visElPt")){
				document.getElementById("e_"+m).classList.add("visElPt");
				el.classList.add("frSw");
			}else{
				document.getElementById("e_"+m).classList.remove("visElPt")
				el.classList.remove("frSw");
			}
		//}else SET.accendiMeridiano(m,true);
	}
}