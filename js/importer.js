// FILE DI IMPORTAZIONE DEI JS E DEI CSS
/*

	Effettua la verifica iniziale di aggiornamenti degli scripts (se in "produzione" e se connesso)
	Contiene le funzioni per l'importazione dinamica degli script, conforntandoli con la versione aggiornata.
	Se non è in produzione oppure non ci sono gli aggiornamenti, allora carica la versione locale: altrimenti carica la versione aggiornata.

*/

// IMPOSTAZIONI DEL DEVICE
var smartphone = false;
var smartMenu = false;
var touchable = false;
var android = false;
var brw_IE = false;
var brw_OPERA = false;
var brw_edge = false;
var brw_firefox = false;
var iPad = false;
var iPhone = false;
var mouseDetect = false;
var onlineVersion=false;
var isTablet = false;
var globals = {};
var verApp = '1.0.0';

// IMPOSTAZIONI DI APP
var nomeApp = 'Iáomai';
var sloganApp = 'A new vision on health';
var tipoApp = '';
//var tipoApp = 'AM';
//var tipoApp = 'AM_light';
if(location.search){
	var vDef='';
	str=location.search.substr(1,location.search.length-1);
	pQ=str.split("&");
	if(pQ.length>1){
		for(l=0;l<pQ.length;l++){
			pV=pQ[l].split("=");
			if(pV[0]=="app")vDef=pV[1];
		}
	}else{
		pV=str.split("=");
		if(pV[0]=="app")vDef=pV[1];
	}
	if(vDef){
		tipoApp = vDef;
	}
}

var FILES = {};
FILES[verApp]={};

var IMPORTER = {
	files: [ // i files caricati all'inizio
    	'css/ambiente.css',
    	'css/manichino.css',
    	'css/menu.css',
    	'css/elenchi.css',
    	'css/popup.css',
    	'css/popup_colori.css',
    	'css/popup_community.css',
    	'css/popup_feedback.css',
    	'css/popup_login.css',
    	'css/popup_registrazione.css',
    	'css/popup_notifiche.css',
    	'css/popup_backups.css',
    	'css/popup_sets.css',
    	'css/popup_versione.css',
    	'css/popup_impset.css',
    	'css/popup_photo.css',
    	'css/schede.css',
    	'css/schede_touch.css',
    	'css/moduli.css',
    	'css/modulo_pazienti.css',
    	'css/forms.css',
    	'css/guida.css',
    	'css/agenda.css',
    	'css/ricerche.css',
    	'css/android.css',
    	'css/confirm_alert.css',
		
		'js/connect/login.js',
		'js/inizio.js',
        
		'js/utils/funzioni_generiche.js',
		'js/connect/db.js',
		'js/connect/archiviDemo.js',
        'js/utils/verifica_form.js',
		'js/utils/console.js',
		'js/utils/confirm_alert.js',
		'js/utils/swipe.js',
        
        'js/lingue/etichette.js',
        'js/lingue/paesi.js',
        'js/lingue/frasi.js',
        'js/lingue/frasi2.js',
        'js/lingue/guide.js',
        'modelli/frasi.js',
        'modelli/zone.js',
        'js/lingue/lingue.js',
            
		'js/three/three.js',
        'js/three/ObjectControls.js',
        
        'js/interfaccia/html.js',
        'js/interfaccia/guida.js',
        'js/interfaccia/menu.js',
        'js/interfaccia/schede.js',
        'js/interfaccia/modulo_pazienti.js',
        'js/interfaccia/modulo_pazienti_trattamenti.js',
        'js/interfaccia/modulo_pazienti_saldi.js',
        'js/interfaccia/modulo_pazienti_filtri.js',
        'js/interfaccia/modulo_fornitori.js',
        'js/interfaccia/modulo_servizi.js',
        'js/interfaccia/modulo_annotazioni.js',
        'js/interfaccia/modulo_ricerche.js',
        'js/interfaccia/modulo_notifiche.js',
        'js/interfaccia/modulo_backups.js',
        'js/interfaccia/modulo_feedback.js',
        'js/interfaccia/modulo_catalogo.js',
        'js/interfaccia/modulo_photo.js',
        'js/interfaccia/modulo_community.js',
		'js/utils/agenda.js',
        
		'modelli/modello.js',
		'modelli/materiali.js',
        
        'js/index_contents.js',
        'js/stage/stage.js'
	],
	jss: [],
	produzione: true, // se settato a false carica solo i files locali
	lista: null,
	funct: '',
	dest: null,
	dimProgr: 0,
	

	startSelectable: function(){
		if(event.keyCode==17){
			document.body.classList.add("selectable");
		}
	},
	stopSelectable: function(){
		if(event.keyCode==17){
			document.body.classList.remove("selectable");
		}
	},
	init: function(){
		
		var UA=navigator.userAgent;
		if(UA.toLowerCase().indexOf("ipad")>-1)iPad=1;
		if(UA.toLowerCase().indexOf("iphone")>-1)iPhone=1;
		if(UA.toLowerCase().indexOf("android")>-1)android=1;
		brw_OPERA=(navigator.userAgent.indexOf("Opera") != -1);
		brw_IE = IMPORTER.detectIE();
		brw_firefox=(typeof InstallTrigger !== 'undefined');
		brw_edge=(!(document.documentMode) && window.StyleMedia)
		android=(navigator.userAgent.indexOf("Android") != -1);
		
		if(	tipoApp == 'AM' ||
			tipoApp == 'AM_light' ){
			document.body.classList.add(tipoApp);
			document.getElementById("favicon").href='icons/faviconAM.ico?v='+(new Date()*1000);
			document.getElementById("p_reg").getElementsByTagName("span")[0].innerHTML = '{{TXT_TestoRegistrazioneAM}}';
			document.getElementById("testoRegistrazione").innerHTML = '{{TXT_TestoRegistrazioneEspansoAM}}';
			/*if(iPad && !iPhone)document.getElementById("testoRegistrazione").innerHTML += '{{TXT_TestoRegistrazioneEspansoAM2}}';
			else document.getElementById("testoRegistrazione").innerHTML += '{{TXT_TestoRegistrazioneEspansoAM3}}';*/
			document.getElementById("app").value = tipoApp;
			nomeApp = 'Anatomy Map';
			sloganApp = 'Your pocket body atlas';
			IMPORTER.files.unshift("css/AM.css");
			CONN.linkPrivacy = 'https://www.anatomymap.com/privacy';
		}
		document.title = nomeApp+" - "+sloganApp;
		
		var el = document.getElementById('scripts');
		el.setAttribute('ontouchstart', 'return;');
		if(typeof el.ontouchstart == "function"){
			//if(iPad || iPhone || android)
			touchable = true;
		}
		var userAgent = navigator.userAgent.toLowerCase();
		isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
		mouseDetect = ('ontouchstart' in window ? false : true);
		if(mouseDetect){
			window.addEventListener("keydown", IMPORTER.startSelectable, false);
			window.addEventListener("keyup", IMPORTER.stopSelectable, false);
		}
		if(location.host!='')onlineVersion=true;
		if(this.WFINI()<510)smartphone=true;
		if(!mouseDetect && this.WFINI()<=800 ||	tipoApp == 'AM' || tipoApp == 'AM_light' )smartMenu=true;
		if(smartMenu)document.body.classList.add("smart");
		if(isTablet)document.body.classList.add("tablet");


		localPouchDB.getItem(MD5("FILES")).then(function(dbCont){ // leggo il DB
			if(typeof(dbCont)!='undefined'){
				res=JSON.parse(IMPORTER.DECOMPR(dbCont));
				if(typeof(res)!='undefined')FILES = res;
			}
			IMPORTER.verificaAggiornamenti();
		});
	},
	verificaAggiornamenti: function( ){ // funzione iniziale per aggiornare tutti i files
		if(this.produzione && CONN.getConn()){
			// verifico la presenza di aggiornamenti di versione (solo in "produzione")
			var versioni = {};
			if(!FILES[verApp])FILES[verApp]={};
			for(f in FILES[verApp]){
				versioni[f] = FILES[verApp][f].lastVer;
			}
			var JSNPOST = JSON.stringify( versioni );
			while(JSNPOST.indexOf("/")>-1)JSNPOST=JSNPOST.replace("/","_");
			while(JSNPOST.indexOf(".")>-1)JSNPOST=JSNPOST.replace(".","_");
			console.log("Sto inviando: "+JSNPOST);
			CONN.caricaUrl(	"verificaScripts.php",
							'TK=D6G-w34rgV&b64=1&verApp='+verApp+'&JSNPOST='+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))), 
							"IMPORTER.applicaAggiornamenti" );
		}else IMPORTER.applicaAggiornamenti('');
	},
	applicaAggiornamenti: function( txt ){
		if(txt!='' && txt!='404' && txt!='404-1' && txt!='undefined' && typeof(txt)!='undefined'){
			console.log("Ricevo: "+txt);
			modificati = JSON.parse(txt);
			for(m in modificati)FILES[verApp][m]=modificati[m];
			localPouchDB.setItem(MD5("FILES"), IMPORTER.COMPR(JSON.stringify(FILES))).then(function(){
				// salvo il DB
			});
		}
		if(touchable)document.body.classList.add("touch");
		if(android)document.body.classList.add("android");
		if(mouseDetect)IMPORTER.files.push('css/scrollbars.css');
		IMPORTER.importaFiles( 0, IMPORTER.files, 'INIT();', document.head );
	},
	importaFiles: function( n, lista, funct, dest ){
		if(typeof(n) == 'undefined')var n = 0;
		var file = lista[n];
		
		var isModello = (file.indexOf("modelli/")==0 && typeof(modelli)!='undefined');
		var isSet = (file.indexOf("sets/")==0 && typeof(sets)!='undefined');
		if( isModello || isSet ){
			if(!n)this.dimProgr = 0;
			var totDim = 0;
			var pF = file.split("/");
			if(file.indexOf("common")>-1 && isSet){
				pF[1] = globals.set.cartella;
			}
			if(n < lista.length-1){
				for(l=0;l<lista.length-1;l++){
					var dims = eval(pF[0]+"."+pF[1]+".dims");
					if(globals.set.cartella || pF[0]=='modelli'){
						if(dims){
							totDim += dims[l];
						}
					}
				}
				var dim = eval(pF[0]+"."+pF[1]+".dims["+n+"]");
				this.dimProgr += dim;
				var perc = parseInt((this.dimProgr*100) / totDim);
				if(isModello)visLoader(globals.modello.txtLoading + " " + perc + "%");
				if(isSet)visLoader(globals.set.txtLoading + " " + perc + "%");
			}
		}
		
		var pF = file.split(".");
		var ext = pF[pF.length-1];
		var nomeFile = file;
		while(nomeFile.indexOf("/")>-1)nomeFile=nomeFile.replace("/","_");
		while(nomeFile.indexOf(".")>-1)nomeFile=nomeFile.replace(".","_");
		
		var content = '';
		var pass = true;
		if(this.produzione){
			// verifico la presenza in FILES (solo in versione "produzione")
			if( FILES[verApp][nomeFile] ){
				content = FILES[verApp][nomeFile].content;
			}
		}
		if(!isModello){
			var versionUpdate = (new Date()).getTime();  
			file += '?v='+versionUpdate;
		}
		if(ext=='js'){
			this.jss[n] 	= document.createElement('script');
			this.jss[n].type 	= 'text/javascript';
			if(!content)this.jss[n].src = file;
		}
		if(ext=='css'){
			this.jss[n] 	= document.createElement('link');
			this.jss[n].type 	= 'text/css';
			this.jss[n].rel 	= 'stylesheet';
			if(!content)this.jss[n].href = file;
		}
		this.jss[n].id 	= nomeFile;
		this.jss[n].async = true;
		this.jss[n].charset='UTF-8';
		if(!content){
			this.jss[n].onload = function(){
				n++;
				if(n==lista.length){
					document.getElementById("schermo_nero").style.opacity = 0;
					setTimeout(function(){
						document.getElementById("schermo_nero").style.display = 'none';
					},2000);
					eval(funct);
				}else{
					IMPORTER.importaFiles( n, lista, funct, dest );
				}
			}
		}
		dest.appendChild(this.jss[n]);
		if(content){
			this.jss[n].innerHTML = content;

			n++;
			if(n==lista.length){
				eval(funct);
			}else{
				IMPORTER.importaFiles( n, lista, funct, dest );
			}
		}
	},
	dbArray: function(txt){
		if(typeof(txt)=='undefined')txt='';
		if(txt=='' || txt==null)txt='{"lastSync": 0, "data": []}';
		return JSON.parse(txt);
	},
	COMPR: function(valore){ // comprime per il DB
		if(!touchable){
			if(brw_IE)valore=LZString.compressToBase64(JSON.stringify(valore));
			else valore=LZString.compress(JSON.stringify(valore));
		}else valore=JSON.stringify(valore);
		return valore;
	},
	DECOMPR: function(valore){ // decomprime dal DB
		if(!touchable){
			if(brw_IE)valore=IMPORTER.dbArray(LZString.decompressFromBase64(valore));
			else valore=IMPORTER.dbArray(LZString.decompress(valore));
		}else valore=IMPORTER.dbArray(valore)
		return valore;
	},
	WFINI: function(){
		if(window.innerWidth)return window.innerWidth;
		else return document.body.clientWidth;
	},
	detectIE: function(){ // verifica se il browser è INTERNET EXPLORER
		var ua=window.navigator.userAgent;
		var b=ua.indexOf("MSIE ");
		if(b>0){
			return parseInt(ua.substring(b+5,ua.indexOf(".",b)),10);
		}
		var a=ua.indexOf("Trident/");
		if(a>0){
			var d=ua.indexOf("rv:");
			return parseInt(ua.substring(d+3,ua.indexOf(".",d)),10);
		}
		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}
		return false;
	}
}

window.addEventListener("load",function(){
	
	IMPORTER.init();
	
},false);

var comb1=comb2=comb3=false;
var prss_Z=prss_X=prss_C=prss_P=false;
function tasti(e){
	if(window.event)tasto=window.event.keyCode;
	else tasto=e.keyCode;
	//alert(tasto)
	if(tasto == 17)comb1=true; // CTRL
	if(tasto == 16)comb2=true; // SHIFT
	if(tasto == 18)comb3=true; // ALT
	if(tasto == 37 && comb3)return false; // FR SX
	if(tasto == 39 && comb3)return false; // FR DX
	if(tasto == 73 && comb1 && comb2)return false; // CTRL + SHIFT + i
	if(tasto == 123)return false; // F12
	if(tasto == 73 && comb1 && comb2)return false; // CTRL + SHIFT + i
	if(tasto == 83 && comb1 && comb2)return false; // CTRL + SHIFT + s
	if(tasto == 74 && comb1 && comb2)return false; // CTRL + SHIFT + j
	if(tasto == 77 && comb1 && comb2)return false; // CTRL + SHIFT + m
	if(tasto == 90)prss_Z=true;
	if(tasto == 88)prss_X=true;
	if(tasto == 67)prss_C=true;
	if(tasto == 80)prss_P=true;
	if(prss_Z && prss_X && prss_C && prss_P){ // CTRL + SHIFT + ALT + x
		CONFIRM.vis(	"Vuoi davvero cancellare tutti i dati in memoria?" ).then(function(pass){if(pass){
			localPouchDB.clear();
			localStorage.clear();
		}});
	}
}
function tastiUp(e){
	if(window.event)tasto=window.event.keyCode;
	else tasto=e.keyCode;
	if(tasto == 17)comb1=false; // CTRL
	if(tasto == 16)comb2=false; // SHIFT
	if(tasto == 18)comb3=false; // ALT
	if(tasto == 90)prss_Z=false;
	if(tasto == 88)prss_X=false;
	if(tasto == 67)prss_C=false;
	if(tasto == 80)prss_P=false;
}
if(!touchable){	
	document.onkeydown = tasti;
	document.onkeyup = tastiUp;
}
document.ondragstart = new Function("return false;");
document.oncontextmenu = new Function("return false;");