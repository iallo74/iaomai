/*

	CONTROLLO INIZIALE DI TUTTA L'APP
	Vanno inserire qui tutte le funzioni di inizializzazione dell'app
	N.B. non inserire dichiarazioni di variabili globali in altri files
	
	
	variabili globali assegnate in altri files (quindi da non usare):
	
	TXT - I testi dell'interfaccia nelle varie lingue
	LINGUE - Gestione della lingua
	SCHEDA - Schede dei contenuti
	MENU - Pulsanti e menu generici dell'interfaccia
	SET - Il set scelto (all'interno ci saranno i sotto moduli)
	MODELLO - Il modello scelto
	DB - I contenuti testuali dei sets
	 // STAGE - Lo stage 3D di ThreeJs con tutti gli oggetti
	CONSOLE - LA console di test su mobile
	
	 - moduli -
	PAZIENTI
	PROCEDURE
 
*/

var debug=false;
//debug=true;


var globals = {
	siglaLingua: 'ita',
	memorizza: false,
	open3d: true,
	openMap: false,
	mapOpened: '',
	AnatomyFREE: true, // settiamo l'anatomia libera per tutti
	modello: null,
	set: null,
	pezziSelezionati: [],
	initModello: function(){
		globals.modello = {
			cartella: '',
			muscoli:true
		}
		if(localStorage.open3d=='true')globals.open3d = true;
		if(localStorage.open3d=='false')globals.open3d = false;
		if(localStorage.openMap=='true')globals.openMap = true;
		if(localStorage.openMap=='false')globals.openMap = false;
		globals.mapOpened = localStorage.mapOpened;
	},
	initSet: function(){
		globals.set = {
			cartella: '',
			setSel: null
		}
	}
	
}


var forzalogin = false;
var sessi = {
	"f": "donna",
	"m": "uomo",
	"a": "altro"
}
var oggi=new Date(),
oggi=new Date(oggi.getFullYear(),oggi.getMonth(),oggi.getDate(),0,0,0,0);
var elTXprovv=null;
var overChiudiProva = false;


	
// OPERAZIONI AL CARICAMENTO DELLA PAGINA
function INIT(){
	
	
	// unisco i moduli
	Object.assign(PAZIENTI, PAZIENTI_TRATTAMENTI);
	Object.assign(PAZIENTI, PAZIENTI_SALDI);
	Object.assign(PAZIENTI, PAZIENTI_FILTRI);
	// svuoto la memoria
	PAZIENTI_TRATTAMENTI = null;
	PAZIENTI_SALDI = null;
	PAZIENTI_FILTRI = null;
	// elimino gli scripts
	document.head.removeChild(document.getElementById("js_interfaccia_modulo_pazienti_trattamenti_js"));
	document.head.removeChild(document.getElementById("js_interfaccia_modulo_pazienti_saldi_js"));
	document.head.removeChild(document.getElementById("js_interfaccia_modulo_pazienti_filtri_js"));
	
	DB._reset(); // lasciare qui
	LOGIN.verLogin();
	
	globals.initModello();
	globals.initSet();
	
	if(touchable && !mouseDetect){
		smothingView=false;
		document.getElementById("p_stampa").style.display = 'none';
	}
	if(touchable && debug){
		CONSOLE.crea();
	}
	LINGUE.init();
	visLoader();
	MENU.init();
	
	init();
	animate();
	
	SCHEDA.initScheda();
	SCHEDA.initElenco();
	GUIDA.init('');
	GUIDA.init('_modello');
	
	//DB._reset();
	LOGIN.avviaVerToken();
	document.getElementById("logoSovra").style.opacity = 1;
	window.addEventListener("resize",function(){
		SCHEDA.verPosScheda();
	},false);
	
	// DEMO
	if(onlineVersion){
		setTimeout( function(){
			if(getVar('demo') && !LOGIN.reg()){
				
				var boxProva = document.createElement('div');
				boxProva.onclick = function(){
					if(!overChiudiProva)MENU.visRegistrazione();
					document.body.removeChild(boxProva);
				};
				boxProva.id = 'boxProvaDemo';
				boxProva.innerHTML = 
							'	<div onMouseOver="overChiudiProva=true;"' +
							'		 onMouseOut="overChiudiProva=false;"></div>' +
							'	<b>Prova GRATUITA di tutte le app per 30 giorni.</b><br>Clicca qui per registrarti e iniziare subito!';
				document.body.appendChild(boxProva);
				
			}
		},2000);
	}
	
	console.log('\n \n  .------------------------------------------.\n  |                                          |\n  |     SE STAI VEDENDO QUESTA SCHERMATA     |\n  |     PER MODIFICARE IL CODICE             |\n  |     VERRAI FULMINATO!!!!        ]o:      |\n  |                                          |\n  *------------------------------------------*\n  ');
}
window.addEventListener("load",function(){INIT();},false);

/*var prss_Z = false;
var prss_X = false;
var prss_C = false;
var prss_P = false;
function tasti2(e){
	if(window.event)tasto=window.event.keyCode;
	else tasto=e.keyCode;
	console.log(tasto)
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
function tastiUp2(e){
	if(window.event)tasto=window.event.keyCode;
	else tasto=e.keyCode;
	console.log(tasto)
	if(tasto == 90)prss_Z=false;
	if(tasto == 88)prss_X=false;
	if(tasto == 67)prss_C=false;
	if(tasto == 80)prss_P=false;
}
if(!touchable){	
	window.addEventListener("keydown",function(){ tasti2(); }, false);
	window.addEventListener("keyup",function(){ tastiUp2(); }, false);
}*/
