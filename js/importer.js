// FILE DI IMPORTAZIONE DEI JS E DEI CSS
/*

	Effettua la verifica iniziale di aggiornamenti degli scripts (se in "produzione" e se connesso)
	Contiene le funzioni per l'importazione dinamica degli script, conforntandoli con la versione aggiornata.
	Se non è in produzione oppure non ci sono gli aggiornamenti, allora carica la versione locale: altrimenti carica la versione aggiornata.

*/

// IMPORTAZIONI DI VERSIONE
var verApp = '1.7.1'; // utilizzata per gli aggiornamenti dei files: FILES[]
					// N.B. Cambia anche il numero in CONN.APIfolder

// IMPOSTAZIONI DEL DEVICE
var	smartphone = false,
	smartMenu = false,
	touchable = false,
	touchDetect = false,
	isCordova = window.usingCordova,
	isElectron = false,
	android = false,
	brw_IE = false,
	brw_OPERA = false,
	brw_edge = false,
	brw_firefox = false,
	brw_safari = false,
	brw_chrome = false,
	iPad = false,
	iPhone = false,
	isMac = false,
	isMacUA = false,
	mouseDetect = false,
	onlineVersion=false,
	isTablet = false,
	globals = {},
	dateEndFeatures = new Date("2024-05-01").getTime();

/*const checkOnlineStatus = async () => {
	try{
		let t = new Date().getTime();
		const online = await fetch("https://www.iaomai.app/app/v1_3/img/checker_di_connessione_non_cancellare.png?v="+t);
		return online.status >= 200 && online.status < 300;
	}catch(err) {
		return false;
	}
};*/

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
    	'css/popup_splashmaps.css',
    	'css/popup_registrazione.css',
    	'css/popup_notifiche.css',
    	'css/popup_backups.css',
    	'css/popup_sets.css',
    	'css/popup_versione.css',
    	'css/popup_impset.css',
    	'css/popup_infolingue.css',
    	'css/popup_photo.css',
    	'css/popup_archives.css',
    	'css/popup_dispositivi.css',
    	'css/popup_features.css',
    	'css/popup_purchases.css',
    	'css/popup_licenze.css',
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
    	'css/addings.css',
    	'css/console.css',
    	'css/pplhd.css',
    	'css/app_rating.css',
		
		'js/connect/login.js',
		'js/connect/syncro.js',
		'js/inizio.js',
        
		'js/utils/funzioni_generiche.js',
		'js/connect/db.js',
		'js/connect/archiviDemo.js',
        'js/utils/verifica_form.js',
		'js/utils/console.js',
		'js/utils/confirm_alert.js',
		'js/utils/swipe.js',
        
        'js/interfaccia/html.js', // lasciare qui

        'js/lingue/etichette.js',
        'js/lingue/TXT.js',
        'js/lingue/paesi.js',
        'js/lingue/valute.js',
        'js/lingue/guide.js',
        'modelli/zone.js',
        'js/lingue/lingue.js',
            
		'js/three/three.js',
        'js/three/ObjectControls.js',
		'js/three/LineSegmentsGeometry.js',
		'js/three/LineGeometry.js',
		'js/three/LineMaterial.js',
		'js/three/LineSegments2.js',
        'js/three/Line2.js',
        
        'js/interfaccia/guida.js',
        'js/interfaccia/reference.js',
        'js/interfaccia/menu.js',
        'js/interfaccia/dragger.js',
        'js/interfaccia/slider.js',
        'js/interfaccia/schede.js',
        'js/interfaccia/modulo_pazienti.js',
        'js/interfaccia/modulo_pazienti_trattamenti.js',
        'js/interfaccia/modulo_pazienti_cicli.js',
        'js/interfaccia/modulo_pazienti_liste.js',
        'js/interfaccia/modulo_pazienti_sets.js',
        'js/interfaccia/modulo_pazienti_sets_gruppi.js',
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
        'js/interfaccia/modulo_draw.js',
        'js/interfaccia/modulo_community.js',
        'js/interfaccia/modulo_dispositivi.js',
		'js/interfaccia/modulo_purchases.js',
		'js/interfaccia/modulo_licenze.js',
		'js/interfaccia/modulo_customs.js',
		'js/interfaccia/modulo_app_rating.js',
		'js/utils/agenda.js',
		'js/utils/decpy.js',
        
		'modelli/modello.js',
		'modelli/materiali.js',
        
        'js/index_contents.js',
        'js/stage/stage.js',
        'js/addings.js'
	],
	importing: false,
	jss: [],
	produzione: true,  	// se settato a false carica solo i files locali (esclusi stores)
						// N.B. se Android, iOs e Electron produzione diventa true in automatico
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
		if(typeof(localStorage.RimaniConnesso)=='undefined')localStorage.RimaniConnesso='true';
		document.getElementById("partner_inizio").style.backgroundImage = "url("+localStorage.logoConv+")";
		//if(window.cordova)this.produzione = true;
		if(isCordova)this.produzione = true;
		let UA=navigator.userAgent;
		if(UA.toLowerCase().indexOf("ipad")>-1)iPad=1;
		if(UA.toLowerCase().indexOf("iphone")>-1)iPhone=1;
		if(UA.toLowerCase().indexOf("mac")>-1)isMacUA=1;
		if(UA.toLowerCase().indexOf("android")>-1)android=1;
		brw_OPERA=(navigator.userAgent.indexOf("Opera") != -1);
		brw_IE = IMPORTER.detectIE();
		brw_firefox=(typeof InstallTrigger !== 'undefined');
		brw_edge=(!(document.documentMode) && window.StyleMedia)
		brw_safari=window.safari !== undefined;
		brw_chrome=(navigator.userAgent.indexOf("Chrome") != -1);
		isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
		isElectron = ver_electron();
		document.title = "iáomai™ - A new vision on health";
		document.getElementById("no_info_features").name = 'no_info_features_'+verApp.replace(".","_");
		document.getElementById("no_info_features").dataset.name = 'no_info_features_'+verApp.replace(".","_");
		/*
		let el = document.getElementById('scripts');
		el.setAttribute('ontouchstart', 'return;');
		if(typeof el.ontouchstart == "function"){
			//if(iPad || iPhone || android)
			touchable = true;
		}*/
		if(	('ontouchstart' in window) ||
    		(navigator.maxTouchPoints > 0) ||
     		(navigator.msMaxTouchPoints > 0) )touchable = true;
		touchDetect = touchable;
		let userAgent = navigator.userAgent.toLowerCase();
		isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
		mouseDetect = ('ontouchstart' in window ? false : true);
		if(mouseDetect){
			window.addEventListener("keydown", IMPORTER.startSelectable, false);
			window.addEventListener("keyup", IMPORTER.stopSelectable, false);
		}
		if(touchable){
			window.addEventListener('orientationchange', function(){
				setTimeout( function(){ SCHEDA.verPosScheda(); }, 1000 );
				setTimeout( function(){ SCHEDA.verPosScheda(); }, 2000 );
			},false);
		}
		//if(location.host!='' && window.location.href.indexOf("localhost")==-1)onlineVersion=true;
		if(window.location.href.indexOf("iaomai.app")>-1)onlineVersion=true;
		if(this.WFINI()<510)smartphone=true;
		if(!mouseDetect && this.WFINI()<=800 )smartMenu=true;
		document.addEventListener('deviceready', function(){
			if((screen.availWidth<510 || screen.availHeight<510) && isCordova){
				window.screen.orientation.lock('portrait');
				smartMenu=true;
				smartphone=true;
			}
		}, false);
		if(userAgent.indexOf("macintosh") && touchable && !smartMenu)isTablet = true;
		if(smartMenu)document.body.classList.add("smart");
		if(isTablet)document.body.classList.add("tablet");
		if(onlineVersion)document.body.classList.add("onlineVersion");
		if(onlineVersion && mouseDetect){
			window.moveTo(0,0);
			window.resizeTo(screen.availWidth,screen.availHeight);
		}
		// blocco IOS
		//let lang = navigator.language || navigator.userLanguage;
		if((iPad || iPhone || isMacUA) && !onlineVersion)document.body.classList.add("ios");
		if(typeof(localStorage.sbl_pplhd)=='undefined')localStorage.sbl_pplhd = 'true';
		if(typeof(localStorage.sbl_pplhd)=='undefined' || localStorage.sbl_pplhd.toString()!='true')document.body.classList.add("pplhd");
		//-----------
		document.getElementById("verApp_imp").innerHTML = verApp;

		// BACK BUTTON Android in app
		document.addEventListener('backbutton', function (e) {
			//uscitaESC();
			//if (window.cordova && window.cordova.platformId !== 'windows'){
			if (isCordova){
				MENU.backButton();
				return;
			}
			//if (window.location.href) {
			if(onlineVersion){
				//window.history.back();
			}else{
				throw new Error('Exit'); // This will suspend the app
			}
		}, false);


		/*if(!touchable){
			history.pushState(null, document.title, location.href)
			window.addEventListener('popstate', function (event){
				uscitaESC();
				history.pushState(null, document.title, location.href);
			});
		}*/
		
		// EVITO LO ZOOM IN TOUCHPAD
		window.addEventListener('wheel', (e) => {
          if(e.ctrlKey)e.preventDefault();
        }, {
            "passive": false
        });
		
		
		
		
		localPouchDB.getItem(MD5("FILES")).then(function(dbCont){ // leggo il DB
			if(typeof(dbCont)!='undefined'){
				let res = JSON.parse(IMPORTER.DECOMPR(dbCont));
				if(typeof(res)!='undefined')FILES = res;
			}
			IMPORTER.verificaAggiornamenti();
		});
	},
	verificaAggiornamenti: function( ){ // funzione iniziale per aggiornare tutti i files
		if(this.produzione && CONN.getConn()){
			// verifico la presenza di aggiornamenti di versione (solo in "produzione")
			let versioni = {};
			if(!FILES[verApp])FILES[verApp]={};
			for(let f in FILES[verApp]){
				versioni[f] = FILES[verApp][f].lastVer;
			}
			let JSNPOST = JSON.stringify( versioni );
			while(JSNPOST.indexOf("/")>-1)JSNPOST=JSNPOST.replace("/","_");
			while(JSNPOST.indexOf(".")>-1)JSNPOST=JSNPOST.replace(".","_");
			console.log("Sto inviando: "+JSNPOST);
			localPouchDB.getItem(MD5("DB.login")).then(function(dbCont){
				let id = IMPORTER.DECOMPR(dbCont).data.idUtente;
				IMPORTER.id = id;
				if(typeof(id)=='undefined')id = '';
				CONN.caricaUrl(	"verificaScripts.php",
								'TK=D6G-w34rgV&b64=1&idUtenteScript='+id+'&verApp='+verApp+'&JSNPOST='+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))), 
								"IMPORTER.applicaAggiornamenti" );
			});
		}else IMPORTER.applicaAggiornamenti('');
	},
	applicaAggiornamenti: function( txt ){
		if(txt!='' && txt!='404' && txt!='404-1' && txt!='undefined' && typeof(txt)!='undefined'){
			
			let modificati = JSON.parse(txt);
			if(modificati){
				if(typeof(modificati["sbl_pplhd"])!='undefined'){
					if(modificati.sbl_pplhd == 'sb'){
						localStorage.sbl_pplhd = 'true';
						document.body.classList.remove("pplhd");
					}
					if(modificati.sbl_pplhd == 'bl'){
						delete(localStorage.sbl_pplhd);
						document.body.classList.add("pplhd");
					}
				}
			}
			
			
			for(let m in modificati){
				if(m!='sbl_pplhd')FILES[verApp][m]=modificati[m];
				//if(IMPORTER.id == 1)alert(modificati[m]);
				
			}
			localPouchDB.setItem(MD5("FILES"), IMPORTER.COMPR(JSON.stringify(FILES)));
		}
		if(touchable)document.body.classList.add("touch");
		if(android)document.body.classList.add("android");
		if(window.hasOwnProperty("cordova"))document.body.classList.add("app_version");
		
		// inserito per bug sui fonts su app android smart
		let dvf = document.createElement('p');
		dvf.id = 'dvf';
		dvf.style.margin = '0px';
		dvf.style.lineHeight = '50px';
		dvf.innerHTML = 'EEEEEEEEE';
		document.body.appendChild(dvf);
		if(document.getElementById("dvf").scrollHeight>50)document.body.classList.add("bug_font");
		document.body.removeChild(dvf);
		
		if(mouseDetect)IMPORTER.files.push('css/scrollbars.css');
		//if(brw_safari)document.getElementById("btnStampaScheda").style.display = 'none';
		IMPORTER.importaFiles( 0, IMPORTER.files, 'INIT();', document.head );
	},
	importaFiles: function( n=0, lista, funct, dest ){
		IMPORTER.importing = true;
		let file = lista[n],
			isModello = (file.indexOf("modelli/")==0 && typeof(modelli)!='undefined'),
			isSet = (file.indexOf("sets/")==0 && typeof(sets)!='undefined');
		
		/* if( (isSet && !globals.set.cartella) ||
			(isModello && !globals.modello.cartella) ){
			funct = '';
			nasLoader();
			return;
		} */
		if( isModello || isSet ){
			if(!n)this.dimProgr = 0;
			let totDim = 0,
				pF = file.split("/");
			if(file.indexOf("common")>-1 && isSet){
				pF[1] = globals.set.cartella;
			}
			if(n < lista.length-1){
				for(l=0;l<lista.length-1;l++){
					let dims = eval(pF[0]+"."+pF[1]+".dims");
					if(globals.set.cartella || pF[0]=='modelli'){
						if(dims){
							totDim += dims[l];
						}
					}
				}
				let dim = eval(pF[0]+"."+pF[1]+".dims["+n+"]");
				this.dimProgr += dim;
				let perc = parseInt((this.dimProgr*100) / totDim);
				if(isModello)visLoader(globals.modello.txtLoading + " " + perc + "%");
				if(isSet)visLoader(globals.set.txtLoading + " " + perc + "%");
			}
		}
		
		let pF = file.split("."),
			ext = pF[pF.length-1],
			nomeFile = file;
		while(nomeFile.indexOf("/")>-1)nomeFile=nomeFile.replace("/","_");
		while(nomeFile.indexOf(".")>-1)nomeFile=nomeFile.replace(".","_");
		let pPth = nomeFile.split("_"),
			path = pPth[pPth.length-2],
			content = ''/* ,
			pass = true */;
		if(path=="addings")content = window.btoa('/* ADDINGS */');
		if(this.produzione){
			// verifico la presenza in FILES (solo in versione "produzione")
			if( FILES[verApp][nomeFile] ){
				content = FILES[verApp][nomeFile].content;
			}
		}
		if(!isModello){
			let versionUpdate = (new Date()).getTime();  
			file += '?v='+versionUpdate;
		}
		if(ext=='js'){
			this.jss[n] 	= document.createElement('script');
			this.jss[n].type 	= 'text/javascript';
			if(!content)this.jss[n].src = file;
		}
		if(ext=='css'){
			if(!content)this.jss[n] = document.createElement('link');
			else this.jss[n] = document.createElement('style');
			this.jss[n].type 	= 'text/css';
			if(!content)this.jss[n].rel 	= 'stylesheet';
			if(!content)this.jss[n].href = file;
		}
		this.jss[n].id 	= nomeFile;
		if(!content)this.jss[n].async = true;
		this.jss[n].charset='UTF-8';
		if(!content){
			this.jss[n].onload = function(){
				n++;
				if(n==lista.length){
					IMPORTER.importing = false;
					eval(funct);
				}else{
					IMPORTER.importaFiles( n, lista, funct, dest );
				}
			}
		}
		dest.appendChild(this.jss[n]);
		if(content){
			if(ext=='js')this.jss[n].src = "data:text/javascript;base64,"+content;
			else this.jss[n].innerHTML = window.atob(content);
			n++;
			if(n==lista.length){
				IMPORTER.importing = false;
				eval(funct);
			}else{
				IMPORTER.importaFiles( n, lista, funct, dest );
			}
		}
	},
	dbArray: function( txt ){
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
		let ua=window.navigator.userAgent,
			b=ua.indexOf("MSIE "),
			a=ua.indexOf("Trident/"),
			edge = ua.indexOf('Edge/');
		if(b>0){
			return parseInt(ua.substring(b+5,ua.indexOf(".",b)),10);
		}
		if(a>0){
			let d=ua.indexOf("rv:");
			return parseInt(ua.substring(d+3,ua.indexOf(".",d)),10);
		}
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
var prss_Z=prss_X=prss_C=prss_P=prss_Q=prss_A=false;
function tasti(e){
	if(window.event)tasto=window.event.keyCode;
	else tasto=e.keyCode;
	//alert(tasto)
	if(tasto == 17)comb1=true; // CTRL
	if(tasto == 16)comb2=true; // SHIFT
	if(tasto == 18)comb3=true; // ALT
	if(tasto == 37 && comb3)return false; // FR SX
	if(tasto == 39 && comb3)return false; // FR DX
	if(tasto == 123)return false; // F12
	if(tasto == 73 && comb1 && comb2)return false; // CTRL + SHIFT + i
	if(tasto == 83 && comb1 && comb2)return false; // CTRL + SHIFT + s
	if(tasto == 74 && comb1 && comb2)return false; // CTRL + SHIFT + j
	if(tasto == 77 && comb1 && comb2)return false; // CTRL + SHIFT + m
	if(tasto == 90)prss_Z=true;
	if(tasto == 88)prss_X=true;
	if(tasto == 67)prss_C=true;
	if(tasto == 80)prss_P=true;
	if(tasto == 81)prss_Q=true;
	if(tasto == 65)prss_A=true;
	if(prss_Z && prss_X && prss_C && prss_P){ // CTRL + SHIFT + ALT + x
		CONFIRM.vis(	"Vuoi davvero cancellare tutti i dati in memoria?" ).then(function(pass){if(pass){
			localPouchDB.clear();
			localStorage.clear();
		}});
	}
	if(prss_Q && prss_A && prss_P){
		resizeTo(1024,768);
		moveTo(10,50);
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
	if(tasto == 81)prss_Q=false;
	if(tasto == 65)prss_A=false;
	if(tasto == 76)prss_L=false;
	if(tasto==88)MODELLO.creaPunto();
}
if(!touchable){	
	document.onkeydown = tasti;
	document.onkeyup = tastiUp;
}
document.ondragstart = new Function("return false;");
document.oncontextmenu = new Function("return false;");
function bringBackDefault(event) {
  event.returnValue = true; 
  (typeof event.stopPropagation === 'function') && 
  event.stopPropagation(); 
  (typeof event.cancelBubble === 'function') && 
  event.cancelBubble(); 
}
function ver_electron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

window.addEventListener('beforeunload', () => {
	fetch(CONN.APIfolder+"close_app.php",{
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			UniqueId: localStorage.UniqueId
		}),
		keepalive: true
	})
	.then(res => res.json())
	.then(data => {});
	return;
});

/*window.onerror = (message, source, lineno, colno, error) => {
	if(error==null)error = '';
	let maxErrors = 10;
	let errori = JSON.parse(__(localStorage.errors,"[]"));
	if(errori.length>=maxErrors)errori.splice(0,errori.length-maxErrors+1);
	d = new Date();
	errori.push({
		message: message,
		source: source,
		lineno: lineno,
		colno: colno,
		error: error.toString(),
		date: d.getTime()
	});
	localStorage.errors = JSON.stringify(errori);
};*/