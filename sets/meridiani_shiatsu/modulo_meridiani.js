
var MODULO_MERIDIANI = { // extend SET
	MERIDIANI_free: [ "LR" ],
	caricaMeridiani: function(){
		// meridiani
		var contElencoMeridiani = contSmart = '';
		var n = 0;
		for(m in DB.set.meridiani){
			var addStyle = '';
			if(	localStorage.sistemaMeridiani == "MAS" && 
				(m=='CV' || m=='GV') )addStyle = ' style="display:none;"';
				
			n++;
			var addClass = '';
			
			// verifico le autorizzazioni
			var addLock =	SET.MERIDIANI_free.indexOf(m)==-1 && 
							(DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()) ? ' lockedItem' : '';
			// --------------------------
			
			if(n==2 || n==4 || n==6 || n==8 || n==10 || n==12)addClass = ' spazioDopo';
			contElencoMeridiani +=	'<div onMouseOver="SET.eviMeridiano(\''+m+'\',true);"' +
									'     onMouseOut="SET.eviMeridiano(\''+m+'\',false);"' +
									'     onClick="SET.accendiMeridiano(\''+m+'\',true);"' +
									'     id="p'+m+'"' +
									'     class="p_'+MERIDIANI[m].elemento+addClass+addLock+'"'+addStyle+'>' +
									'	<span></span>' +
										DB.set.meridiani[m].NomeMeridiano+' <b>'+SET.convSigla(m)+'</b>' +
									'</div>';
									
			contSmart += '<div onMouseOver="SET.eviMeridiano(\''+m+'\',true);"' +
						 '     onMouseOut="SET.eviMeridiano(\''+m+'\',false);"' +
						 '     onClick="SET.accendiMeridiano(\''+m+'\',true);"' + // elenco dei punti
						 '	   id="sm'+m+'"' +
						 '     class="sm_'+MERIDIANI[m].elemento+addClass+addLock+'"'+addStyle+'>'+SET.convSigla(m)+'</div>';
		}
		sceltaMeridianiTag = 	'<div class="menuElenchi"' +
								'	  onClick="MENU.visMM(\'sistemaMeridiani_p\');">' +
								'</div>' +		
							 	'<p id="sistemaMeridiani_p"><span id="selectCambioMeridiani"><i>'+htmlEntities(Lingua(TXT_SistemaMeridiani))+':</i><select id="sceltaMeridianiElenco" onChange="SET.cambiaSistema(this.value,true);">'+
								'  <option value=""';
		if(localStorage.sistemaMeridiani == '' || !__(localStorage.sistemaMeridiani) )sceltaMeridianiTag += ' SELECTED';
		sceltaMeridianiTag += 	'>'+htmlEntities(Lingua(TXT_MeridianiCinesi))+'</option>' +
								'  <option value="MAS"';
		if(localStorage.sistemaMeridiani == 'MAS')sceltaMeridianiTag += ' SELECTED';
		sceltaMeridianiTag += 	'>'+htmlEntities(Lingua(TXT_MeridianiGiapponesi))+'</option>' +
								'</select></span><i class="elMenu" id="cambioSistemaMeridiani" onClick="MENU.visImpset();"><span>'+htmlEntities(Lingua(TXT_SistemaMeridiani2))+'</span></i></p>';
		
		document.getElementById("lista_meridiani").innerHTML = sceltaMeridianiTag+'<div class="lista listaMeridiani">'+contElencoMeridiani+'</div>';
		document.getElementById("meridianiSmart_cont").innerHTML = contSmart;
	},
	eviMeridiano: function( m, b ){
		if(!MERIDIANI[m+localStorage.sistemaMeridianiAdd].meridianoAcceso){
			if(b)SET.coloraMeridiano(m,'Over','Over');
			else SET.coloraMeridiano(m,'','Base');
		}
	},
	/*elencoMeridiani: function( label ){ // elenca i meridiani per la select di trattamenti e procedure
		var HTML = '<option>'+htmlEntities(label)+'</option>';
		var presenti = false;
		for(i in DB.set.meridiani){
			HTML+='<option value="'+i+'">'+DB.set.meridiani[i].NomeMeridiano+'</option>';
		}
		return HTML;
	},*/
	swMeridianiSmart: function(){ // visualizza/nasconde il menu rapido dei meridiani (in alto a SX)
		document.getElementById("meridianiSmart_cont").classList.toggle("visSch");
	},
	filtraMeridiani: function(){ // filtra i meridiani negli elenchi (per masunaga che non ha CV e GV)
		var vis = 'none';
		if(!localStorage.sistemaMeridiani)vis = 'block';
		document.getElementById("pGV").style.display = vis;
		document.getElementById("pCV").style.display = vis;
		document.getElementById("smGV").style.display = vis;
		document.getElementById("smCV").style.display = vis;
	}
}