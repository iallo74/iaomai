

var LOGIN = {
	retIni: false,
	//loginVerificato: false,
	logedout: false,
	connAssente: false,
	tmVerT: null,
	afterFunct: null,
	nSinc: 0,
	totSinc: 0,
	v_cartCicloOpened: '',
	v_elCartCicloOp: null,
	tmAttesaLogin: null,
	HTML: '',
	daSync: false,
	getUniqueId: function(){ // restituisce un ID unico come 1234-1234567890123
		let t = new Date().getTime()+"",
			r = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000)+"";
		return(r+"-"+t);
	},
	_init: function(){ // inizializza il DB.login
		DB.login={	"lastSync": 0,
			"data": {
				"idUtente": 0,
				"Nominativo": "",
				"UsernameU": "",
				"PasswordU:": "",
				"Pseudonimo": "",
				"Intestazione": "",
				"Stato": "",
				"siglaPaese": "",
				"CondizioniCommunity": 0,
				"Email": "",
				"ExpDate": 0,
				"TOKEN": "",
				"LastVer": CONN.VERSIONE,
				"imgAvatar": "",
				"logoAzienda": "",
				"logoConv": "",
				"customScript": "",
				"password_pazienti": "",
				"valuta": "EUR",
				"sistema_misure": "",
				"auths": [],
				"modls": []
			}
		};
		localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login));
		localStorage.logoConv = '';
		localStorage.customScript = '';
	},
	
	_frv: function(){ // restituisce 'frv' se non si è loggati
		let str = '';
		if(!LOGIN.logedin())str = 'frv';
		return str;
	},
	getDB: function( syncro=false ){ // carica i DB da pouch
		Promise.all([
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".procedure")),
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".note")),
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".pazienti")),
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".fornitori")),
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".servizi")),
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".appuntamenti")),
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".annotazioni")),
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".ricerche")),
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".files"))
		]).then(function( dbs ){
			DB.procedure=IMPORTER.DECOMPR(dbs[0]);
			DB.note=IMPORTER.DECOMPR(dbs[1]);
			DB.pazienti=IMPORTER.DECOMPR(dbs[2]);
			DB.fornitori=IMPORTER.DECOMPR(dbs[3]);
			DB.servizi=IMPORTER.DECOMPR(dbs[4]);
			DB.appuntamenti=IMPORTER.DECOMPR(dbs[5]);
			DB.annotazioni=IMPORTER.DECOMPR(dbs[6]);
			DB.ricerche=IMPORTER.DECOMPR(dbs[7]);
			DB.files=IMPORTER.DECOMPR(dbs[8]);
			
			if(PAZIENTI.idCL == -1)PAZIENTI.caricaPazienti();
			FORNITORI.caricaFornitori();
			SERVIZI.caricaServizi();
			ANNOTAZIONI.caricaAnnotazioni();
			if(syncro){
				if(CONN.getConn())LOGIN.aggiornaToken(true);
				else LOGIN.globalSync();
			}
		});
	},
	resetDB: function(){ //salva tutto il DB locale in pouchDB
		localPouchDB.setItem(MD5("DB.procedure"), IMPORTER.COMPR(DB.procedure));
		localPouchDB.setItem(MD5("DB.note"), IMPORTER.COMPR(DB.note));
		localPouchDB.setItem(MD5("DB.pazienti"), IMPORTER.COMPR(DB.pazienti));
		localPouchDB.setItem(MD5("DB.fornitori"), IMPORTER.COMPR(DB.fornitori));
		localPouchDB.setItem(MD5("DB.servizi"), IMPORTER.COMPR(DB.servizi));
		localPouchDB.setItem(MD5("DB.appuntamenti"), IMPORTER.COMPR(DB.appuntamenti));
		localPouchDB.setItem(MD5("DB.ricerche"), IMPORTER.COMPR(DB.ricerche));
		localPouchDB.setItem(MD5("DB.files"), IMPORTER.COMPR(DB.files));
	},
	
	
	getLS: function(k){ // restituisce l'oggetto utente
		if(typeof(DB.login)=='undefined'){
			localPouchDB.getItem(MD5("DB.login")).then(function(dbCont){ // leggo il DB
				DB.login=IMPORTER.DECOMPR(dbCont);
				return DB.login.data[k];
			});
		}else return DB.login.data[k];
	},
	setLS: function(k,v){ // salva il valore v nell'elemento k di DB.login
		DB.login.data[k]=v;
		localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login));
		return;
	},
	recuperaPwd: function(){ // apre il link di recuper password (INSERIRE NELL'APP)
		let url=CONN.linkReqPwd+'?l='+globals.siglaLingua.toLowerCase()+"&app="+tipoApp;
		//if(window.cordova && window.cordova.platformId !== 'windows')window.open(url,'_system');
		if(isCordova)window.open(url,'_system');
		else window.open(url,'_blank');
	},
	swVisPwd: function( forza=false ){
		if(document.getElementById("PWD").type=='text' || forza){
			document.getElementById("PWD").type = 'password';
			document.getElementById("visPwd").classList.remove("hide");
		}else{
			document.getElementById("PWD").type = 'text';
			document.getElementById("visPwd").classList.add("hide");
		}
	},
	logedin: function(){ // restituisce il TOKEN, indicando che si è connessi
		return __(DB.login.data.TOKEN);
	},
	reg: function(){ // restituisce l'idUtente
		return __(DB.login.data.idUtente);
	},
	getOS: function() { // restituisce il sistema operativo
		let userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;
		
		if(!platform)platform = window.navigator.userAgentData.platform;
		
		if (macosPlatforms.indexOf(platform) !== -1) {
			os = 'Mac OS';
		} else if (iosPlatforms.indexOf(platform) !== -1) {
			os = 'iOS';
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			os = 'Windows';
		} else if (/Android/.test(userAgent)) {
			os = 'Android';
		} else if (!os && /Linux/.test(platform)) {
			os = 'Linux';
		}
		return os;
	},
	getDeviceInfo: function(){ // restituisce un array con le caratteristiche del dispositivo
		let device = {};
		device.platform = "Unknown OS";
		if (navigator.userAgent.indexOf("Win") != -1) device.platform = "Windows";
		if (navigator.userAgent.indexOf("Mac") != -1) device.platform = "Macintosh";
		if (navigator.userAgent.indexOf("Linux") != -1) device.platform = "Linux";
		if (navigator.userAgent.indexOf("Android") != -1) device.platform = "Android";
		if (navigator.userAgent.indexOf("like Mac") != -1) device.platform = "iOS";
		
		device.type = 'Computer';
		device.appType = 'APP';
		if(smartphone)device.type = 'Smartphone';
		if(isTablet)device.type = 'Tablet';
		if(onlineVersion)device.appType = 'ONLINE';
		
		if(brw_chrome)device.browser = 'Chrome';
		if(brw_IE)device.browser = 'Explorer';
		if(brw_OPERA)device.browser = 'Opera';
		if(brw_edge)device.browser = 'Edge';
		if(brw_firefox)device.browser = 'Firefox';
		if(brw_safari)device.browser = 'Safari';
		
		return JSON.stringify(device);
	},
	getLogin: function( p5='' ){ // avviato quando si preme il pulsante Accedi nel popup LOGIN
		if(CONN.retNoConn() && document.getElementById("USR").value.trim()!='' && document.getElementById("PWD").value.trim()!=''){
			document.getElementById("login").classList.add("popup_back");
			document.loginFrom.PWD.blur();
			CONN.caricaUrl(	"login.php",
							"USR="+encodeURIComponent(document.loginFrom.USR.value)+
							"&PWD="+encodeURIComponent(document.loginFrom.PWD.value)+
							"&p5="+p5+
							"&DVI="+encodeURIComponent(window.btoa(LOGIN.getDeviceInfo())),
							"LOGIN.setLogin");
		}
		return false;
	},
	autoLogin: function(){ // avviato quando si preme il pulsante Accedi nel popup LOGIN
		arr_decpy = decLG();
		if(CONN.retNoConn() && arr_decpy[0].trim()!='' && (arr_decpy[1].trim()!='' || arr_decpy[2].trim()!='')){
			document.getElementById("stayConnected").checked = true;
			CONN.caricaUrl(	"login.php",
							"USR="+encodeURIComponent(arr_decpy[0]) +
							"&PWD="+encodeURIComponent(arr_decpy[2] ? arr_decpy[2] : arr_decpy[1]) +
							(arr_decpy[2] ? "&p5=1" : "") +
							"&DVI="+encodeURIComponent(window.btoa(LOGIN.getDeviceInfo())),
							"LOGIN.setLogin");
		}
		return false;
	},
	setLogin: function(txt){ // la risposta di getLogin()
		if(!txt || txt.substr(0,3)=='404'){
			if(!LOGIN.logedout){
				ALERT(TXT("ErroreLogin"));
			}else{
				LOGIN.logedout=false;
			}
			document.getElementById("login").classList.remove("popup_back");
			document.getElementById("btnRecupero").style.display='block';
		}else{
			let jsn = JSON.parse(txt);
			if(__(jsn.nuova_versione_presente))LOGIN.showUpgradeBox();
			let Nuovo = jsn.data.Nuovo;
			if(__(jsn.upgrade_info,false))MENU.visFeatures();
			delete jsn.data.Nuovo;
			if(__(jsn.errConn)){
				MENU.chiudiMenu();
				SCHEDA.scaricaScheda();
				MENU.visDispositivi(JSON.stringify(jsn.data));
				return;
			}
			txt = JSON.stringify(jsn);
			DB._reset();
			if(document.querySelector(".listaPazienti"))applicaLoading(document.querySelector(".listaPazienti"));
			applicaLoading(document.querySelector(".listaFornitori"));
			applicaLoading(document.querySelector(".listaServizi"));
			localStorage.RimaniConnesso = document.getElementById("stayConnected").checked;
			LOGIN.salvaToken(txt);
			LOGIN.tmAttesaLogin = 	setInterval( function(){
										if(LOGIN.logedin()){
											clearInterval(LOGIN.tmAttesaLogin);
											LOGIN.tmAttesaLogin = null;
											//DB._reset();
											if(!LOGIN.retIni)LOGIN.globalSync(false,false,Nuovo);
											setTimeout(function(){LOGIN.scriviUtente();},1000);
											document.getElementById("login").classList.remove("popup_back");
											MENU.chiudiMenu();
											MODELLO.filtraAnatomia();
											try{ SET.filtraSet(); }catch(err){}
											PAZIENTI.deselPaziente();
											if(globals.set.cartella){
												let vSet = globals.set.cartella;
												scaricaSet();
												caricaSet(vSet);
											}
											PAZIENTI.cancellaFiltri(true);
											SCHEDA.scaricaScheda();
										}
									}, 500);
		}
	},
	verLogin: function( funct='' ){ // verifica se si è loggati (solo all'inizio)
		localPouchDB.getItem(MD5("DB.login")).then(function(dbCont){ // leggo il DB
			let loginProvv = IMPORTER.DECOMPR(dbCont);
			if(loginProvv!=null){
				DB.login = loginProvv;
				localStorage.UniqueId = __(localStorage.UniqueId,LOGIN.getUniqueId());
				let dateStored=DB.login.data.ExpDate*1,
					dateNow = new Date();
				dateNow=dateNow.getTime()/1000;
				dateNow=parseInt(dateNow);
				if((dateStored<dateNow || dateStored==0 || isNaN(dateStored) || !eval(__(localStorage.RimaniConnesso,'false')))){
					if(!LOGIN.logedin() || !eval(__(localStorage.RimaniConnesso,'false'))){
						DB.login.data.TOKEN='';
						DB.login.data.ExpDate=0;
						if(!DB.login.data.auths)DB.login.data.auths = [];
						if(!DB.login.data.modls)DB.login.data.modls = [];
						if(typeof(DB.login.data)=='undefined'){
							DB.login.data.auths=[];
							DB.login.data.modls=[];
						}
						LOGIN.getDB();
					}
				}else{
					LOGIN.getDB(true);
					MENU.visFeatures();
				}
				LOGIN.scriviUtente();
				if(funct)eval(funct);
				if(location.href.indexOf("https://www.iaomai.app")==0 && getVar("aL") && (!DB.login.data.idUtente || !LOGIN.logedin()))LOGIN.autoLogin();
				if(onlineVersion){
					setTimeout( function(){
						if(getVar('demo') && !LOGIN.reg()){
							
							let boxProva = document.createElement('div');
							boxProva.onclick = function(){
								if(!overChiudiProva)MENU.visRegistrazione();
								document.body.removeChild(boxProva);
							};
							boxProva.id = 'boxProvaDemo';
							boxProva.innerHTML = 
										'	<div onMouseOver="overChiudiProva=true;"' +
										'		 onMouseOut="overChiudiProva=false;"></div>' +
										'	<b>Prova GRATUITA di tutte le app per 10 giorni.</b><br>Clicca qui per registrarti e iniziare subito!';
							document.body.appendChild(boxProva);
							
						}
					},2000);
				}
				/* if(location.href.indexOf("https://www.iaomai.app")==0 && !LOGIN.logedin()){
					// autologin
					if(!DB.login.data.UsernameU || DB.login.data.UsernameU==localStorage.getItem("u4ia")){
						document.loginFrom.USR.value = localStorage.getItem("u4ia");
						document.loginFrom.PWD.value = localStorage.getItem("p4ia");
						LOGIN.getLogin('1');
					}
				} */
			}
		});
	},
	scriviUtente: function(){ // scrive il nome utente nel menu impostazioni
		let NN = LOGIN.getLS("Nominativo")/* ,
			EE=LOGIN.getLS("Email") */;
		if(typeof(NN)=='undefined')NN='';
		document.getElementById("p_reg").style.display = 'none';
		document.getElementById("btn_login").classList.remove("btn_login_mini");
		document.getElementById("btn_logout").classList.remove("btn_logout_mini");
		document.getElementById("btn_login").title='';
		document.getElementById("btn_logout").title='';
		if(LOGIN.logedin()){
			document.getElementById("utDisc").style.display = 'none';
			document.getElementById("btn_modut").style.display = 'inline-block';
			document.getElementById("btn_login").style.display = 'none';
			document.getElementById("btn_logout").style.display = 'inline-block';
			document.getElementById("btn_logout").classList.add("btn_logout_mini");
			document.getElementById("btn_logout").title='LOGOUT';
			//document.getElementById("btn_loginGuida").classList.add("nasBtnLogin");
			document.getElementById("notLogged").classList.remove("visSch");
			CUSTOMS._init();
		}else{
			if(NN){
				document.getElementById("utDisc").style.display = 'block';
				document.getElementById("btn_login").classList.add("btn_login_mini");
				document.getElementById("btn_login").title='LOGIN';
				//document.getElementById("btn_loginGuida").classList.add("nasBtnLogin");
				CUSTOMS._init();
			}else{
				document.getElementById("p_reg").style.display = 'block';
				document.getElementById("utDisc").style.display = 'none';
				NN=TXT("NessunUtente");
				document.getElementById("btn_modut").style.display = 'none';
				//document.getElementById("btn_loginGuida").classList.remove("nasBtnLogin");
				CUSTOMS._end();
			}
			document.getElementById("p_cartella").classList.remove("clientAtt");
			document.getElementById("btn_login").style.display = 'inline-block';
			document.getElementById("btn_logout").style.display = 'none';
			document.getElementById("notLogged").classList.add("visSch");
		}
		document.getElementById("btn_loginGuida").classList.toggle("nasBtnLogin",LOGIN.logedin());
		document.getElementById("nomeUtente").innerHTML=NN;
		let lg = document.getElementById("logoSovra"),
			lp = document.getElementById("logoPartner");
		if(__(DB.login.data.logoConv)){
			lg.classList.add("logoConv");
			lg.style.backgroundImage = "url(img/logoPartner_iaomai.png), url('"+DB.login.data.logoConv+"')";
			lp.classList.add("logoPartner_on");
			lp.style.backgroundImage = "url('"+DB.login.data.logoConv+"')";
		}else{
			lg.classList.remove("logoConv");
			lg.style.backgroundImage = "";
			lp.classList.remove("logoPartner_on");
			lp.style.backgroundImage = "";
		}
		//document.getElementById("js_interfaccia_modulo_customs_js").src = __(localStorage.customScript)?eval(atob(localStorage.customScript)):eval('CUSTOMS._init=function(){};CUSTOMS._end=function(){};CUSTOMS._conts={};');
	},
	attivaX: function(){ // attiva il pulsante X nel login
		let USRprovv = __(DB.login.data.UsernameU);
		if(USRprovv.trim()!=''){
			document.getElementById("USR").type='hidden';
			document.getElementById("USR").value=DB.login.data.UsernameU;
			document.getElementById("USRlabel").style.display="block";
			document.getElementById("USRlabel").getElementsByTagName("span")[0].innerHTML=DB.login.data.UsernameU;
		}else{
			document.getElementById("USR").type='text';
			document.getElementById("USRlabel").style.display="none";
			document.getElementById("USRlabel").getElementsByTagName("span")[0].innerHTML="";
		}
	},
	aggiornaToken: function(ret){ // richiama l'url per aggiornare il token
		LOGIN.retIni=ret;
		if(CONN.getConn()){
			/*DB.login.data.ExpDate = parseInt(new Date().getTime()/1000)+(60*60*24*90);
			localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login)).then(function(){ // salvo il DB
				CONN.caricaUrl(	"testauth.php",
								"ExpDate="+DB.login.data.ExpDate,
								"LOGIN.salvaToken");
				
			});*/
			CONN.caricaUrl(	"testauth.php",
			"",
			"LOGIN.salvaToken");
			return false;
		}
	},
	salvaToken: function(txt){ // salva il TOKEN in DB.login
		if(txt.substr(0,3)!='404'){
			localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(JSON.parse(txt))).then(function(){ // salvo il DB
				DB.login=JSON.parse(txt);
				localStorage.logoConv = DB.login.data.logoConv;
				if(typeof(DB.login.data.customScript)!='undefined')localStorage.customScript = DB.login.data.customScript;
				document.getElementById("js_interfaccia_modulo_customs_js").src = __(localStorage.customScript)?eval(atob(localStorage.customScript)):eval('CUSTOMS._init=function(){};CUSTOMS._end=function(){};CUSTOMS._conts={};');
				MODELLO.filtraAnatomia();
				try{ SET.filtraSet(); }catch(err){}
				if(LOGIN.retIni){
					LOGIN.retIni=false;
					LOGIN.globalSync();
					LOGIN.scriviUtente();
					LOGIN.verInternationals();
				}
			});
		}else{
			LOGIN.logout();
		}
	},
	verificaToken: function(){ // Verifico che il token sia valido
		if(CONN.getConn() && LOGIN.logedin()){
			// se c'è connessione e ho il TOKEN
			
			// invio di dati di sincro per verificare modifiche
			let JSNPOST = {
				"note": DB.note.lastSync,
				"procedure": DB.procedure.lastSync,
				"servizi": DB.servizi.lastSync,
				"fornitori": DB.fornitori.lastSync,
				"pazienti": DB.pazienti.lastSync,
				"ricerche": DB.ricerche.lastSync,
				//"cicli": DB.cicli.lastSync, // SERVE SOLO IN UPLOAD
				"appuntamenti": DB.appuntamenti.lastSync,
				"annotazioni": DB.annotazioni.lastSync
			};
			if(LOGIN.logedin())CONN.caricaUrl(	"vertoken.php",
												"SL="+globals.siglaLingua.toUpperCase() +
												"&tab="+SCHEDA.locked.tab +
												"&idEl="+SCHEDA.locked.idEl +
												"&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
												"LOGIN.resToken");
			return false;
		}else{
			// se non c'è connessione o non ho il token
			LOGIN.connAssente=true;
			// verifico se ci sono elementi da sincronizzare
			//!!!!! POTREBBE ESSERE ESCLUSA LA FUNZIONE in quanto abbiamo tolto la visualizzazione del loghino
			LOGIN.daSync=false;
			for(let p in DB.pazienti.data){
				if(DB.pazienti.data[p].DataModifica>DB.pazienti.lastSync)LOGIN.daSync=true;
				for(t in DB.pazienti.data[p].trattamenti){
					if(DB.pazienti.data[p].trattamenti[t].DataModifica>DB.pazienti.lastSync)LOGIN.daSync=true;
				}
				for(t in DB.pazienti.data[p].saldi){
					if(DB.pazienti.data[p].saldi[t].DataModifica>DB.pazienti.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.fornitori){
				for(let p in DB.fornitori.data){
					if(DB.fornitori.data[p].DataModifica>DB.fornitori.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.servizi){
				for(let p in DB.servizi.data){
					if(DB.servizi.data[p].DataModifica>DB.servizi.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.appuntamenti){
				for(let p in DB.appuntamenti.data){
					if(DB.appuntamenti.data[p].DataModifica>DB.appuntamenti.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.annotazioni){
				for(let p in DB.annotazioni.data){
					if(DB.annotazioni.data[p].DataModifica>DB.annotazioni.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.procedure){
				for(let p in DB.procedure.data){
					if(DB.procedure.data[p].DataModifica>DB.procedure.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.note){
				for(let p in DB.note.data){
					if(DB.note.data[p].DataModifica>DB.note.lastSync)LOGIN.daSync=true;
				}
			}
		}
		LINGUE.getGoogleLanguages();
	},
	avviaVerToken: function(){ // Avvia la verifica del TOKEN ogni 10 secondi
		LOGIN.tmVerT = setInterval(function(){LOGIN.verificaToken();},10000); // verifico ogni 10 secondi
	},
	resToken: function(txt){ // Risposta dalla verifica del TOKEN
		if(typeof(txt) != 'undefined'){;
			if(txt.substr(0,3)=='404'){
				SCHEDA.scaricaScheda();
				LOGIN.logout();
				setTimeout( function(){
					ALERT(TXT("MsgConnMultipla"));
				}, 800 );
			}else if(txt){
				// se c'è una notifica la gestisco
				elenco=JSON.parse(txt);
				if(__(elenco.nuova_versione_presente))LOGIN.showUpgradeBox();
				if(__(elenco.upgrade_info,false))MENU.visFeatures();
				NOTIFICHE.aggiornaIcona(elenco.notificheDaleggere*1);
				if(LOGIN.connAssente){
					LOGIN.connAssente=false;
				}
				if(LOGIN.daSync)LOGIN.globalSync();
				
				// se ci sono elementi modificati sincronizza
				if(__(elenco.modificati,false)){
					LOGIN.sincronizza();
				}
				
				// se ci sono autorizzazioni nuove
				if(__(elenco.auths,false)){
					if(elenco.auths.indexOf("anatomy_full")==-1)elenco.auths.push("anatomy_full");
					DB.login.data.auths.sort();
					elenco.auths.sort();
					if(!(JSON.stringify(DB.login.data.auths) === JSON.stringify(elenco.auths))){
						DB.login.data.auths = elenco.auths;
						PURCHASES.updateProducts();
					}
				}
				// se ci sono moduli nuovi
				if(__(elenco.modls,false)){
					DB.login.data.modls.sort();
					elenco.modls.sort();
					if(!(JSON.stringify(DB.login.data.modls) === JSON.stringify(elenco.modls))){
						DB.login.data.modls = elenco.modls;
						//PURCHASES.updateProducts();
					}
				}
			}
		}
	},
	logout: function(){ // effettua il logout
		// IMPORTANTE! tolto perché se uno non si connette perché ad esempio va in vacanza, poi perde tutti i dati
		// non togliere per ricordarsi
		//localStorage.removeItem('DB.note');
		//localStorage.removeItem('DB.procedure');
		//localStorage.removeItem('DB.pazienti');
		//localStorage.removeItem('DB.fornitori');
		//localStorage.removeItem('DB.servizi');
		//localStorage.removeItem('DB.appuntamenti');
		//localStorage.removeItem('DB.annotazioni');
		//localStorage.removeItem('DB.login');
		
		//inizializzaLogin();
		
		CONN.caricaUrl(	"logout.php",
						"USR="+encodeURIComponent(DB.login.data.UsernameU),
						"");
						
		clearInterval(LOGIN.tmVerT);
		LOGIN.tmVerT = null;
		DB.login.data.TOKEN = '';
		DB.login.data.ExpDate = 0;
		DB.login.data.auths = [];
		DB.login.data.modls = [];
			
		LOGIN.scriviUtente();
		
		localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login)).then(function(){ // salvo il DB
			LOGIN.logedout=true;
		});
		DB._reset(); // <<<<<<<< FRV
		LOGIN.getDB();
		scaricaSet();
		PAZIENTI.cancellaFiltri(true);
		SCHEDA.scaricaScheda();
	},
	annullaUtente: function(){ // cancella tutti i dati utente in locale
		CONFIRM.vis(	TXT("ChiediAnnullaUtente")+'<br>'+
						TXT("AttenzioneAnnullaUtente") ).then(function(pass){if(pass){
		
			MENU.chiudiAllSelected();
			setTimeout( function(){
				localPouchDB.setItem(MD5("FILES"), IMPORTER.COMPR(JSON.stringify(FILES)));
			},500);
			DB._reset();
			LOGIN.resetDB(); // lasciare dopo DB._reset();
			LOGIN._init();
			LOGIN.getDB();
			document.getElementById("USR").value='';
			document.getElementById("PWD").value='';
			document.getElementById("USR").type='text';
			document.getElementById("USRlabel").style.display="none";
			document.getElementById("utDisc").style.display = 'none';
			LOGIN.scriviUtente();
			SCHEDA.scaricaScheda();
			MODELLO.filtraAnatomia();
			try{ SET.filtraSet(); }catch(err){}
			if(globals.set.cartella)caricaSet(globals.set.cartella,document.getElementById('p_'+globals.set.cartella));
		}});
	},
	verInternationals: function(){
		let mod = false;
		if(!DB.login.data.valuta){
			DB.login.data.valuta = DB.INT.paesi[DB.login.data.siglaPaese].valuta;
			mod = true;
		}
		if(!DB.login.data.sistema_misure){
			DB.login.data.sistema_misure = __(DB.INT.paesi[DB.login.data.siglaPaese].sistema_misure,'i');
			mod = true;
		}
		if(mod){
			let JSNPOST = {
				password_pazienti: DB.login.data.password_pazienti,
				valuta: DB.login.data.valuta,
				sistema_misure: DB.login.data.sistema_misure
			}
			if(CONN.getConn() && LOGIN.logedin()!=''){
				CONN.caricaUrl(	"utente_parametri_up.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								"console.log");
			}
		}
	},
	
	
	// GESTIONE UTENTE
	registrazione: function(){ // registra l'utente su server
		if(CONN.retNoConn()){
			if(verifica_form(document.registrazioneForm)){

				let JSNPOST={	"Nominativo": document.registrazioneForm.Cognome.value+" "+document.registrazioneForm.Nome.value,
								"Email": document.registrazioneForm.Email.value,
								"Telefono": document.registrazioneForm.Telefono.value,
								"USR": document.registrazioneForm.USR.value,
								"PWD": document.registrazioneForm.PWD.value,
								"app": document.registrazioneForm.app.value,
								"siglaLingua": globals.siglaLingua };
								
				document.getElementById("registrazione").classList.add("popup_back");
				CONN.caricaUrl(	"utente_registrazione.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								"LOGIN.retRegistrazione");	
			}
		}
	},
	retRegistrazione: function( txt ){ // risposta dalla registrazione utente sul server (registrazione)
		if(typeof(txt)=='undefined' || txt=='404'){
			// si è verificato un errore generico
			ALERT(TXT("ErroreGenerico"));
		}else if(txt=='404-1'){
			// errore email duplicata
			ALERT(TXT("ErroreEmailDuplicato"));
		}else if(txt=='404-2'){
			// errore username duplicata
			ALERT(TXT("ErroreUsernameDuplicato"));
		}else{
			// ok
			//LERT(TXT("ConfermareRegistrazione"));
			ALERT(TXT("ConfermaRegistrazione"));
			document.loginFrom.USR.value = document.registrazioneForm.USR.value;
			document.loginFrom.PWD.value = document.registrazioneForm.PWD.value;
			LOGIN.getLogin();
			MENU.chiudiMenu();
			GUIDA.visFumetto("guida_generica");
		}
		document.getElementById("registrazione").classList.remove("popup_back");
		return;
	},
	modUtente: function(){ // scarica le modifiche dell'utente dal server
		if(!LOGIN.logedin()){
			ALERT(TXT("ErroreUtenteNonConnesso"));
			return;
		}
		if(CONN.retNoConn()){
			
			let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'feature.login\')">' +
								TXT("ReferenceGuide") +
							'</div>';
						
			SCHEDA.caricaScheda(	stripslashes(TXT("ModificaUtente")),
									'',
									'',
									'scheda_utente',
									false,
									true,
									'',
									btnAdd );
			MENU.chiudiMenu();
			applicaLoading(document.getElementById("scheda_testo"));
			
			/* let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'feature.login\')">' +
								TXT("ReferenceGuide") +
							'</div>'; */
							
			CONN.caricaUrl(	"utente_dati.php",
							"b64=1",
							"LOGIN.car_utente",
							'',
							'',
							'',
							'',
							btnAdd );
		}
	},
	car_utente: function( txt ){ // risposta da modUtente: carica i dati dell'utente nella scheda
		if(txt.substr(0,3)=='404'){
			
		}else{
			CONFIRM.vis(	TXT("UscireSenzaSalvare"),
							!SCHEDA.verificaSchedaRet(),
							arguments ).then(function(pass){if(pass){
							let v = getParamNames(CONFIRM.args.callee.toString());
							for(let i in v)eval(getArguments(v,i));
				
				if(typeof(txt)=='undefined')txt = '';		
				rimuoviLoading(document.getElementById("scheda_testo"));
				let UT = JSON.parse(txt),
					DataNascita = 0,
					HTML = '';
				if(UT.DataNascita!='0000-00-00')DataNascita = new Date(UT.DataNascita);
				HTML += '<form id="formMod"' +
						'	   name="formMod"' +
						'	   method="post"' +
						'	   onSubmit="return false;">';
						
				// Campi hascosti
				HTML += H.r({	t: "h", name: "stessa",	value: "1" });
				
				// avatar
				HTML += '	<div>' +
						'		<div onClick="this.classList.toggle(\'avatarBig\');"' +
						'		   	 id="avatarUtente"' +
						'		   	 class="avatar">' +
						'			<div style="background-image:url(\''+UT.imgAvatar+'\')"></div>' +
						'		</div>' +
						'		<div style="float:left;height: 120px;">' +
						'			<input class="ico_foto"' +
						'				   id="avatarUtente_FL"' +
						'				   type="file"' +
						'				   onchange="PH.encodeImageFileAsURL(this, true, false, \'LOGIN.salvaAvatar\');"' +
						'				   title="'+htmlEntities(TXT("CaricaImmagine"))+'" />' +
						'			<div class="ico_del"' +
						'			   	 onClick="LOGIN.deleteAvatar(\'avatarUtente\');"></div>' +
						'		</div>' +
						'	</div>' +
						'	<div class="l"></div>';
				
				// Campi
				HTML += H.r({	t: "r", name: "Nominativo",	value: UT.Nominativo,	classCampo: 'styled',	ver: "1|0" });
				HTML += H.r({	t: "r", name: "Indirizzo",	value: UT.Indirizzo,	classCampo: 'styled' });
				HTML += H.r({	t: "r", name: "CAP",		value: UT.CAP,			classCampo: 'styled'});
				HTML += H.r({	t: "r", name: "Citta",		value: UT.Citta,		classCampo: 'styled' });
				HTML += H.r({	t: "r", name: "Provincia",	value: UT.Provincia,	classCampo: 'styled' });
				//HTML += H.r({	t: "r", name: "Stato",		value: UT.Stato,		classCampo: 'styled' });
				
				
				HTML += H.r({	t: "s", 
								name: "Stato",
								value: UT.Stato,
								opts: elencaPaesi(),
								label: TXT("Stato"),
								classCampo: "selectLargo" });	
					
				HTML += '	<div style="margin-top: 30px;' +
						'	   			margin-left: 5px;">' +
						'		<b>'+ htmlEntities(TXT("LabelAnagrafica"))+'</b>' +
						'	</div>';
				HTML += H.r({	t: "s", 
								name: "Sesso",
								value: UT.Sesso.toLowerCase(),
								opts: { "":"", "m": TXT("Maschio"), "f": TXT("Femmina") },
								label: TXT("Sesso"),
								id: "selectPaz",
								classRiga: "labelSx" });
							
				HTML += H.r({	t: "d",
								name: "DataNascita",
								value: DataNascita,
								classRiga: "labelSx" });
				HTML += H.r({	t: "r", name: "LuogoNascita",		value: UT.LuogoNascita,		classCampo: 'styled' });
				HTML += H.r({	t: "r", name: "ProvinciaNascita",	value: UT.ProvinciaNascita,	classCampo: 'styled' });
							
					
				HTML += '	<div style="margin-top: 30px;' +
						'	   			margin-left: 5px;">' +
						'	   	<b>'+ htmlEntities(TXT("LabelContatti"))+'</b>' +
						'	</div>';
							
				HTML += H.r({	t: "r",
									name: "Telefono",
									value: UT.Telefono,
									classCampo: 'styled',
									ver: '0|0|tel' });

				HTML += H.r({	t: "r",
								name: "Email",
								value: UT.Email,
								classCampo: 'styled',
								ver: '1|0|@' });
								
				HTML += '	<div style="margin-top: 30px;' +
						'		   		margin-left: 5px;">' +
						'	   	<b>'+htmlEntities(TXT("LabelFatturazione"))+'</b>' +
						'	</div>';
				
				// logoAzienda
				HTML += '	<div>' +
						'		<div onClick="this.classList.toggle(\'avatarBig\');"' +
						'		   	 id="logoAzienda"' +
						'		   	 class="logo_az">' +
						'			<div style="background-image:url(\''+UT.logoAzienda+'\')"></div>' +
						'		</div>' +
						'		<div style="float:left;height: 120px;">' +
						'			<input class="ico_foto"' +
						'				   id="logoAzienda_FL"' +
						'				   type="file"' +
						'				   onchange="PH.encodeImageFileAsURL(this, true, false, \'LOGIN.salvaLogo\');"' +
						'				   title="'+htmlEntities(TXT("CaricaImmagine"))+'" />' +
						'			<div class="ico_del"' +
						'			   	 onClick="LOGIN.deleteAvatar(\'logoAzienda\');"></div>' +
						'		</div>' +
						'	</div>' +
						'	<div class="l"></div>';
							
				HTML += H.r({	t: "t", 
									name: "DescrizionePersonale",
									value: UT.DescrizionePersonale,
									label: '' });
					
				HTML += '	<div style="margin-top: 30px;' +
						'	   			margin-left: 5px;">' +
						'		<b>'+ htmlEntities(TXT("LabelPrefessione"))+'</b>' +
						'	</div>';
							
				//HTML += H.r({	t: "r", name: "tags",			value: tags });
				HTML += H.r({	t: "r", name: "Web",			value: UT.Web,			classCampo: 'styled' });
				HTML += H.r({	t: "r", name: "Professione",	value: UT.Professione,	classCampo: 'styled' });
	
					
					
				HTML += H.r({	t: "t", 
								name: "Curriculum",
								value: UT.Curriculum,
								label: TXT("Curriculum") });
								
								
	
				if(LOGIN.getLS("Pseudonimo")=='' || LOGIN.getLS("CondizioniCommunity")!='1'){
					HTML += '	<div style="margin-top: 30px;' +
							'	   			margin-left: 5px;">' +
							'		<b>'+ htmlEntities(TXT("LabelImpostazioniCommunity"))+'</b>' +
							'	</div>';
							
					HTML += H.r({	t: "r", name: "Pseudonimo",	value: UT.Pseudonimo,	classCampo: 'styled' });
					
					HTML += H.r({	t: "c", 
									name: "CondizioniCommunity",
									value: UT.CondizioniCommunity,
									label: TXT("RegoleCommunityTxt") });	
									
					HTML += '	<div id="regoleCommunity">' +
									TXT("TestoRegoleCommunity") +
							'	</div>';
				}else{
					HTML += H.r({	t: "h", name: "Pseudonimo",	value: UT.Pseudonimo });
					HTML += H.r({	t: "h", name: "CondizioniCommunity",	value: UT.CondizioniCommunity });
				}
				
				HTML += '	<div style="text-align:right;padding-top:30px;">' +
						'		<div class="link_del" onClick="LOGIN.el_utente();">'+stripslashes(TXT("EliminaAccount"))+'</div>' +
						'	</div>' +
						'	<div class="l"></div>';
				
				HTML += SCHEDA.pulsantiForm(
										"",
										"SCHEDA.scaricaScheda();", 
										"if(H.verData(\'DataNascita\'))LOGIN.mod_utente();" );
				
				HTML += '</form>';
				
				let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'feature.login\')">' +
									TXT("ReferenceGuide") +
								'</div>';
				
				SCHEDA.caricaScheda(	stripslashes(TXT("ModificaUtente")),
										HTML,
										'SCHEDA.formModificato = false;',
										'scheda_utente',
										false,
										true,'',
										btnAdd );
										
				initChangeDetection( "formMod" );
				
				if(!touchable)document.formMod.Nominativo.focus();
		
				SCHEDA.formModificato = false;
			}});
		}
	},
	el_utente: function(){ // elimina l'utente (richiesto da apple)
		CONFIRM.vis(	TXT("ChiediEliminaAccount"), false, arguments, "warning" ).then(function(pass){if(pass){
			CONFIRM.vis(	TXT("ConfermaEliminaAccount"), false, arguments, "warning", TXT("EliminaAccount") ).then(function(pass){if(pass){
				CONN.caricaUrl(	"utente_elimina.php",
								"siglaLingua="+globals.siglaLingua,
								'LOGIN.retElUtente;'  );
			}});			
		}});
	},
	retElUtente: function( txt ){ // risposta el_utente
		if(txt=='404'){
			ALERT(TXT("ErroreGenerico"));
		}else{
			ALERT(TXT("MsgEliminaAccount"));
		}
	},
	mod_utente: function(){ // salva i dati dell'utente e li carica sul server
		if(!verifica_form(document.getElementById("formMod")))return;
		stopAnimate(true);
		visLoader(TXT("SalvataggioInCorso"),'loadingLight');
		
		let imgAvatar = document.getElementById("avatarUtente").getElementsByTagName("div")[0].style.backgroundImage;
		if(imgAvatar)imgAvatar = imgAvatar.split(imgAvatar[4])[1].replace(location.origin+location.pathname,'');
		if(typeof(imgAvatar) == 'undefined')imgAvatar = '';
		
		let logoAzienda = document.getElementById("logoAzienda").getElementsByTagName("div")[0].style.backgroundImage;
		if(logoAzienda)logoAzienda = logoAzienda.split(logoAzienda[4])[1];
		if(typeof(logoAzienda) == 'undefined')logoAzienda = '';
		
		let aaaa = document.formMod.annoDataNascita.value,
			mm = document.formMod.meseDataNascita.value,
			gg = document.formMod.giornoDataNascita.value;
		if(aaaa.length<4){
			let l = aaaa.length;
			for(let n=l;n<4;n++)aaaa='0'+aaaa;
		}
		if(mm.length<2){
			let l = mm.length;
			for(let n=l;n<2;n++)mm='0'+mm;
		}
		if(gg.length<2){
			let l = gg.length;
			for(let n=l;n<2;n++)gg='0'+gg;
		}
		DataNascita = aaaa+"-"+mm+"-"+gg;
		
		JSNPOST={ 	"imgAvatar": imgAvatar,
					"logoAzienda": logoAzienda,
					
					"Nominativo": document.formMod.Nominativo.value,
					"Indirizzo": document.formMod.Indirizzo.value,
					"CAP": document.formMod.CAP.value,
					"Citta": document.formMod.Citta.value,
					"Provincia": document.formMod.Provincia.value,
					"Stato": document.formMod.Stato.value,
					
					"Sesso": document.formMod.Sesso.value,
					"DataNascita": DataNascita,
					"LuogoNascita": document.formMod.LuogoNascita.value,
					"ProvinciaNascita": document.formMod.ProvinciaNascita.value,
					
					"Telefono": document.formMod.Telefono.value,
					"Email": document.formMod.Email.value,
					
					"Web": document.formMod.Web.value,
					"Professione": document.formMod.Professione.value,
					"DescrizionePersonale": document.formMod.DescrizionePersonale.value,
					"Curriculum": document.formMod.Curriculum.value,
					
					"Pseudonimo": document.formMod.Pseudonimo.value,
					"CondizioniCommunity": document.formMod.CondizioniCommunity.checked ? '1' : '0' };

		endChangeDetection();
		SCHEDA.formModificato = false;
		//applicaLoading(document.getElementById("scheda_testo"));
		CONN.caricaUrl(	"utente_dati_up.php",
						"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
						'LOGIN.retModUtente;'  );
		return false;
	},
	retModUtente: function( txt ){ // risposta dal caricamento dell'utente (mod_utente)
		if(txt=='404'){
			ALERT(TXT("ErroreGenerico"));
			//rimuoviLoading(document.getElementById("scheda_testo"));
			startAnimate();
			nasLoader();
		}else if(txt=='404-1'){
			ALERT(TXT("ErroreEmailDuplicato"));
			//rimuoviLoading(document.getElementById("scheda_testo"));
			startAnimate();
			nasLoader();
		}else{
			let UT = JSON.parse(txt);
			DB.login.data.Nominativo=UT.Nominativo;
			DB.login.data.Email=UT.Email;
			DB.login.data.Pseudonimo=UT.Pseudonimo;
			DB.login.data.Intestazione=UT.Intestazione;
			DB.login.data.imgAvatar=UT.imgAvatar;
			DB.login.data.logoAzienda=UT.logoAzienda;
			localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login)).then(function(){ // salvo il DB
				//rimuoviLoading(document.getElementById("scheda_testo"));
				startAnimate();
				nasLoader();
				SCHEDA.noChiudi = false;
				SCHEDA.msgSalvataggio();
			});
		}
	},
	salvaAvatar: function( obj, n = 'avatarUtente' ){ // sostituisce l'avatar provvisorio nella scheda
		obj = JSON.parse(obj);
		document.getElementById(n).getElementsByTagName('div')[0].style.backgroundImage="url('"+obj.imgMini+"')";
		SCHEDA.formModificato = true;
	},
	salvaLogo: function( obj ){ // sostituisce il logo aziendale provvisorio nella scheda
		LOGIN.salvaAvatar( obj, 'logoAzienda');
	},
	deleteAvatar: function( n ){ // cancella l'avatar o il loso
		document.getElementById(n).getElementsByTagName('div')[0].style.backgroundImage="";
		SCHEDA.formModificato = true;
	},
		
				
	// SINCRONIZZAZIONE
	sincronizza: function(funct, bkp=false){ // sincronizza i DB locali con quelli remoti (quando modifico)
		DB._verDbSize();
		if(typeof(funct)!='undefined')LOGIN.afterFunct=funct;
		else if(!LOGIN.afterFunct)LOGIN.afterFunct=null;
		
		if(CONN.getConn() && LOGIN.logedin()!=''){
			LOGIN.globalSync( false, bkp );
		}else if(LOGIN.afterFunct){
			eval(LOGIN.afterFunct);
			LOGIN.afterFunct = null;
		}
	},
	globalSync: function(dwnl=false, bkp=false, Nuovo=false){ // sincro globale up e down
		// da controllare all'avvio dell'app e ogni volta che riprende la connessione
		// invio i lastSync delle tabelle
		if(CONN.getConn() || dwnl){
			LOGIN.totSinc = 0;
			Promise.all([
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".procedure")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".note")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".pazienti")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".fornitori")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".servizi")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".appuntamenti")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".annotazioni")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".ricerche")),
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".files"))
			]).then(function( dbs ){
				DB.procedure=IMPORTER.DECOMPR(dbs[0]);
				DB.note=IMPORTER.DECOMPR(dbs[1]);
				DB.pazienti=IMPORTER.DECOMPR(dbs[2]);
				DB.fornitori=IMPORTER.DECOMPR(dbs[3]);
				DB.servizi=IMPORTER.DECOMPR(dbs[4]);
				DB.appuntamenti=IMPORTER.DECOMPR(dbs[5]);
				DB.annotazioni=IMPORTER.DECOMPR(dbs[6]);
				DB.ricerche=IMPORTER.DECOMPR(dbs[7]);
				DB.files=IMPORTER.DECOMPR(dbs[8]);
				
				LOGIN.totSinc = dbs.length-1; /* i files non contano perché sono solo in upload */
				
				let elenco='';				
				if(Nuovo){ // se è un account nuovo popolo i DB con quelli DEMO
					DB.pazienti.data = DB._pulisciFRV(archiviDemo.pazienti);
					DB.fornitori.data = DB._pulisciFRV(archiviDemo.fornitori);
					DB.servizi.data = DB._pulisciFRV(archiviDemo.servizi);
					DB.files.data = DB._pulisciFRV(archiviDemo.files);
				}
				
				let elencoFiles='';
				for(let k in DB.files.data){
					if(DB.files.data[k]){
						if(	!__(DB.files.data[k].frv) && 
							__(DB.files.data[k].imgBig) && 
							DB.files.data[k].imgBig!='404'){
								elencoFiles+=JSON.stringify(DB.files.data[k])+", ";
							}
					}
				}
				if(elencoFiles)elenco+='"files": ['+elencoFiles.substr(0,elencoFiles.length-2)+'], ';
				
				let elencoRicerche='';
				for(let k in DB.ricerche.data){
					if(DB.ricerche.data[k].DataModifica*1>DB.ricerche.lastSync*1 || dwnl || bkp){
						elencoRicerche+=JSON.stringify(DB.ricerche.data[k])+", ";
					}
				}
				if(elencoRicerche)elenco+='"ricerche": ['+elencoRicerche.substr(0,elencoRicerche.length-2)+'], ';
				
				let elencoNote='';
				for(let k in DB.note.data){
					if(DB.note.data[k].DataModifica*1>DB.note.lastSync*1 || dwnl || bkp){
						elencoNote+=JSON.stringify(DB.note.data[k])+", ";
					}
				}
				if(elencoNote)elenco+='"note": ['+elencoNote.substr(0,elencoNote.length-2)+'], ';

				let elencoProcedure='';
				for(let k in DB.procedure.data){
					let db={ 	"idProcedura": DB.procedure.data[k].idProcedura*1,
								"NomeProcedura": DB.procedure.data[k].NomeProcedura,
								"app": DB.procedure.data[k].app,
								"idLinguaProcedura": DB.procedure.data[k].idLinguaProcedura*1,
								"dettagliProcedura": DB.procedure.data[k].dettagliProcedura,
								"gallery": JSON.stringify(DB.procedure.data[k].gallery),
								"DataModifica":DB.procedure.data[k].DataModifica*1,
								"DataCreazione":DB.procedure.data[k].DataCreazione*1,
								"Condiviso": DB.procedure.data[k].Condiviso*1,
								"Cancellato": DB.procedure.data[k].Cancellato*1 };

					let aggiungere=false;
					if((DB.procedure.data[k].DataModifica*1>DB.procedure.lastSync*1 || dwnl || bkp) && !__(DB.procedure.data[k].frv)){
						aggiungere=true;
					}
					if(aggiungere){
						DB.procedure.data[k].id_interno=k;
						elencoProcedure+=JSON.stringify(db)+", ";
					}
					
					/* if(DB.procedure.data[k].DataModifica*1>DB.procedure.lastSync*1 || dwnl || bkp){
						DB.procedure.data[k].id_interno=k;
						elencoProcedure+=JSON.stringify(DB.procedure.data[k])+", ";
					} */
				}
				if(elencoProcedure)elenco+='"procedure": ['+elencoProcedure.substr(0,elencoProcedure.length-2)+'], ';
				
				let elencoAppuntamenti='';
				for(let k in DB.appuntamenti.data){
					let db={ 	"idAppuntamento": DB.appuntamenti.data[k].idAppuntamento*1,
								"TestoAppuntamento": DB.appuntamenti.data[k].TestoAppuntamento,
								"TimeAppuntamento": DB.appuntamenti.data[k].TimeAppuntamento*1,
								"oraInizio": DB.appuntamenti.data[k].oraInizio*1,
								"oraFine": DB.appuntamenti.data[k].oraFine*1,
								"idPaziente": DB.appuntamenti.data[k].idPaziente*1,
								"idCli": DB.appuntamenti.data[k].idCli*1,
								"DataModifica":DB.appuntamenti.data[k].DataModifica*1,
								"DataCreazione":DB.appuntamenti.data[k].DataCreazione*1,
								"Cancellato": DB.appuntamenti.data[k].Cancellato*1 };
								
					let aggiungere=false;
					
					if((DB.appuntamenti.data[k].DataModifica*1>DB.appuntamenti.lastSync*1 || dwnl || bkp) && !__(DB.appuntamenti.data[k].frv))aggiungere=true;
					if(aggiungere){
						elencoAppuntamenti+=JSON.stringify(db)+", ";
					}
				}
				if(elencoAppuntamenti)elenco+='"appuntamenti": ['+elencoAppuntamenti.substr(0,elencoAppuntamenti.length-2)+'], ';
				
				let elencoAnnotazioni='';
				for(let k in DB.annotazioni.data){
					let db={ 	"idAnnotazione": DB.annotazioni.data[k].idAnnotazione*1,
								"TitoloAnnotazione": DB.annotazioni.data[k].TitoloAnnotazione,
								"TestoAnnotazione": DB.annotazioni.data[k].TestoAnnotazione,
								"DataModifica":DB.annotazioni.data[k].DataModifica*1,
								"DataCreazione":DB.annotazioni.data[k].DataCreazione*1,
								"Cancellato": DB.annotazioni.data[k].Cancellato*1 };
					
					let aggiungere=false;
					
					if((DB.annotazioni.data[k].DataModifica*1>DB.annotazioni.lastSync*1 || dwnl || bkp) && !__(DB.annotazioni.data[k].frv))aggiungere=true;
					if(aggiungere){
						elencoAnnotazioni+=JSON.stringify(db)+", ";
					}
				}
				if(elencoAnnotazioni)elenco+='"annotazioni": ['+elencoAnnotazioni.substr(0,elencoAnnotazioni.length-2)+'], ';
				
				let elencoServizi='';
				for(let k in DB.servizi.data){
					let db={ 	"idServizio": DB.servizi.data[k].idServizio*1,
								"NomeServizio": DB.servizi.data[k].NomeServizio,
								"DescrizioneServizio": DB.servizi.data[k].DescrizioneServizio,
								"CostoServizio": DB.servizi.data[k].CostoServizio*1,
								"NumeroSedute": DB.servizi.data[k].NumeroSedute*1,
								"DataModifica":DB.servizi.data[k].DataModifica*1,
								"DataCreazione":DB.servizi.data[k].DataCreazione*1,
								"Cancellato": DB.servizi.data[k].Cancellato*1 };
					
					let aggiungere=false;
					
					if((DB.servizi.data[k].DataModifica*1>DB.servizi.lastSync*1 || dwnl || bkp) && !__(DB.servizi.data[k].frv))aggiungere=true;
					if(aggiungere){
						elencoServizi+=JSON.stringify(db)+", ";
					}
				}
				if(elencoServizi)elenco+='"servizi": ['+elencoServizi.substr(0,elencoServizi.length-2)+'], ';
				
				let elencoFornitori='';
				for(let k in DB.fornitori.data){
					let db={ 	"idFornitore": DB.fornitori.data[k].idFornitore*1,
								"RagioneSociale": DB.fornitori.data[k].RagioneSociale,
								"Intestazione": DB.fornitori.data[k].Intestazione,
								"PartitaIva": DB.fornitori.data[k].PartitaIva,
								"CodiceFiscale": DB.fornitori.data[k].CodiceFiscale,
								"Indirizzo": DB.fornitori.data[k].Indirizzo,
								"CAP": DB.fornitori.data[k].CAP,
								"Citta": DB.fornitori.data[k].Citta,
								"Provincia": DB.fornitori.data[k].Provincia,
								"Stato": DB.fornitori.data[k].Stato,
								"Telefono": DB.fornitori.data[k].Telefono,
								"Email": DB.fornitori.data[k].Email,
								"NoteFornitore": DB.fornitori.data[k].NoteFornitore,
								"etichette": JSON.stringify(DB.fornitori.data[k].etichette),
								"DataModifica":DB.fornitori.data[k].DataModifica*1,
								"DataCreazione":DB.fornitori.data[k].DataCreazione*1,
								"Cancellato": DB.fornitori.data[k].Cancellato*1 };
					
					let aggiungere=false;
					
					if((DB.fornitori.data[k].DataModifica*1>DB.fornitori.lastSync*1 || dwnl || bkp) && !__(DB.fornitori.data[k].frv))aggiungere=true;
					if(aggiungere){
						elencoFornitori+=JSON.stringify(db)+", ";
					}
				}
				if(elencoFornitori)elenco+='"fornitori": ['+elencoFornitori.substr(0,elencoFornitori.length-2)+'], ';

				let elencoPazienti='';
				for(let k in DB.pazienti.data){
					let db={ 	"idPaziente": DB.pazienti.data[k].idPaziente*1,
								"Nome": DB.pazienti.data[k].Nome,
								"Cognome": DB.pazienti.data[k].Cognome,
								"Indirizzo": DB.pazienti.data[k].Indirizzo,
								"CAP": DB.pazienti.data[k].CAP,
								"Citta": DB.pazienti.data[k].Citta,
								"Provincia": DB.pazienti.data[k].Provincia,
								"Stato": DB.pazienti.data[k].Stato,
								"Telefono": DB.pazienti.data[k].Telefono,
								"Cellulare": DB.pazienti.data[k].Cellulare,
								"paeseCellulare": DB.pazienti.data[k].paeseCellulare,
								"Email": DB.pazienti.data[k].Email,
								"sesso": DB.pazienti.data[k].sesso,
								"NotePaziente": DB.pazienti.data[k].NotePaziente,
								"DataNascita": DB.pazienti.data[k].DataNascita,
								"LuogoNascita": DB.pazienti.data[k].LuogoNascita,
								"tags": JSON.stringify(DB.pazienti.data[k].tags),
								"etichette": JSON.stringify(DB.pazienti.data[k].etichette),
								"medicine": JSON.stringify(DB.pazienti.data[k].medicine),
								"allergie": JSON.stringify(DB.pazienti.data[k].allergie),
								"patologie": JSON.stringify(DB.pazienti.data[k].patologie),
								"interventi": JSON.stringify(DB.pazienti.data[k].interventi),
								"gallery": JSON.stringify(DB.pazienti.data[k].gallery),
								"Provenienza": DB.pazienti.data[k].Provenienza,
								"Professione": DB.pazienti.data[k].Professione,
								"Intestazione": DB.pazienti.data[k].Intestazione,
								"CodiceFiscale": DB.pazienti.data[k].CodiceFiscale,
								"PartitaIva": DB.pazienti.data[k].PartitaIva,
								"Social": DB.pazienti.data[k].Social,
								"avatar": DB.pazienti.data[k].avatar,
								"Altezza": DB.pazienti.data[k].Altezza,
								"Peso": DB.pazienti.data[k].Peso,
								"DataModifica":DB.pazienti.data[k].DataModifica*1,
								"trattamenti": [],
								"saldi": [],
								"Cancellato": DB.pazienti.data[k].Cancellato*1,
								"id_interno": k*1 };
					
					let aggiungere=false;
					
					db.trattamenti=[];
					let n=-1,
						aggiungereTrattamenti=false,
						elencoTrattamenti=[];
					for(t in DB.pazienti.data[k].trattamenti){
						if(DB.pazienti.data[k].trattamenti[t].DataModifica*1>DB.pazienti.lastSync*1 || dwnl || bkp){
							DB.pazienti.data[k].trattamenti[t].id_interno=t*1;
							n++;elencoTrattamenti[n]=clone(DB.pazienti.data[k].trattamenti[t]);
							elencoTrattamenti[n].gallery = JSON.stringify(elencoTrattamenti[n].gallery);
							elencoTrattamenti[n].meridiani = JSON.stringify(elencoTrattamenti[n].meridiani);
							elencoTrattamenti[n].sintomi = JSON.stringify(elencoTrattamenti[n].sintomi);
							elencoTrattamenti[n].puntiMTC = JSON.stringify(elencoTrattamenti[n].puntiMTC);
							elencoTrattamenti[n].puntiAuricolari = JSON.stringify(elencoTrattamenti[n].puntiAuricolari);
							elencoTrattamenti[n].puntiPlantari = JSON.stringify(elencoTrattamenti[n].puntiPlantari);
							elencoTrattamenti[n].puntiNamikoshi = JSON.stringify(elencoTrattamenti[n].puntiNamikoshi);
							aggiungereTrattamenti=true;
						}
					}
					if(aggiungereTrattamenti && !__(DB.pazienti.data[k].frv)){
						db.trattamenti=elencoTrattamenti;
						aggiungere=true;
					}
					
					db.saldi=[];
					n=-1;
					let	aggiungereSaldi=false,
						elencoSaldi=[];
					for(t in DB.pazienti.data[k].saldi){
						if(DB.pazienti.data[k].saldi[t].DataModifica*1>DB.pazienti.lastSync*1 || dwnl || bkp){
							DB.pazienti.data[k].saldi[t].id_interno=t*1;
							n++;elencoSaldi[n]=DB.pazienti.data[k].saldi[t];
							aggiungereSaldi=true;
						}
					}
					if(aggiungereSaldi && !__(DB.pazienti.data[k].frv)){
						db.saldi=elencoSaldi;
						aggiungere=true;
					}
					
					
					if((DB.pazienti.data[k].DataModifica*1>DB.pazienti.lastSync*1 || dwnl || bkp) && !__(DB.pazienti.data[k].frv))aggiungere=true;
					if(aggiungere){
						elencoPazienti+=JSON.stringify(db)+", ";
					}
				}
				if(elencoPazienti)elenco+='"pazienti": ['+elencoPazienti.substr(0,elencoPazienti.length-2)+'], ';
				if(elenco)elenco='{'+elenco.substr(0,elenco.length-2)+'}';	
			
				if(typeof(DB.note)=='undefined'){
					DB.note=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note));
				}
				if(typeof(DB.procedure)=='undefined'){
					DB.procedure=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure));
				}
				if(typeof(DB.servizi)=='undefined'){
					DB.servizi=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi));
				}	
				if(typeof(DB.fornitori)=='undefined'){
					DB.fornitori=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori));
				}	
				if(typeof(DB.pazienti)=='undefined'){
					DB.pazienti=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti));
				}	
				if(typeof(DB.ricerche)=='undefined'){
					DB.ricerche=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche));
				}
				if(typeof(DB.files)=='undefined'){
					DB.files=[];
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files));
				}	
				if(typeof(DB.cicli)=='undefined'){
					DB.cicli=[];
					DB.cicli.lastSync=0;
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".cicli"), IMPORTER.COMPR(DB.cicli));
				}
				let syncJSN = '{';
				if(BACKUPS.titleProvv)syncJSN += '"title":"'+BACKUPS.titleProvv.replace(/"/,'\"')+'",';
				syncJSN += 	'"note":"'+DB.note.lastSync+'",' +
							'"procedure":"'+DB.procedure.lastSync+'",' +
							'"servizi":"'+DB.servizi.lastSync+'",' +
							'"fornitori":"'+DB.fornitori.lastSync+'",' +
							'"pazienti":"'+DB.pazienti.lastSync+'",' +
							'"ricerche":"'+DB.ricerche.lastSync+'",' +
							'"cicli":"'+DB.cicli.lastSync+'",' +
							'"appuntamenti":"'+DB.appuntamenti.lastSync+'",' +
							'"annotazioni":"'+DB.annotazioni.lastSync+'",' +
							'"JSNPOST":';
				if(!BACKUPS.titleProvv)syncJSN += elenco;
				else syncJSN += '"'+window.btoa(encodeURIComponent(elenco))+'"';
				
				syncJSN += '}';
				if(elenco)console.log(JSON.parse(syncJSN))
				if(!dwnl){
					CONN.caricaUrl(	"sincro_GLOBAL.php",
									"b64=1&JSNPOST="+window.btoa(encodeURIComponent(syncJSN)), 
									"LOGIN.retGlobalSyncro");
				}else{
					let dateNow = new Date();
					dateNow=dateNow.getTime()/1000;
					dateNow=parseInt(dateNow);
					
					if(dwnl == 'locale')LOGIN.componi(JSON.parse(elenco), dateNow);
					else{
						if(CONN.retNoConn()){
							
							CONN.caricaUrl(	"sincro_backups_crea.php",
											"b64=1&JSNPOST="+window.btoa(encodeURIComponent(syncJSN)),
											"BACKUPS.conf_backup"
											);
						}
						return false;
					}
				}
			});
		}
	},
	retGlobalSyncro: function( txt ){ // chiamato da "globalSync" o da "ripristinaBackup"
		if(txt.substr(0,3)+""=='404'){
			if(debug)console.log(txt);
			return;
		}
		if(SCHEDA.btnSel)SCHEDA.btnSel_id = SCHEDA.btnSel.id;
		LOGIN.nSinc=0;
		let syncUp=false,
			passato;
		elenco=JSON.parse(txt);
		
		lastSync=elenco.lastSync;
		
		DB.ricerche.lastSync=lastSync;
		DB.note.lastSync=lastSync;
		DB.procedure.lastSync=lastSync;
		DB.servizi.lastSync=lastSync;
		DB.fornitori.lastSync=lastSync;
		DB.pazienti.lastSync=lastSync;
		DB.appuntamenti.lastSync=lastSync;
		DB.annotazioni.lastSync=lastSync;
		//console.log(DB.annotazioni);
		
		// RICERCHE
		if(elenco.ricerche){
			syncUp=true;
			for(let p in elenco.ricerche){
				// per ogni novità verifico l'esistenza
				esiste=false;
				if(BACKUPS.bkpProvv)elenco.ricerche[p].DataModifica = lastSync*1+1;
				JSNPUSH={	"TestoRicerca": elenco.ricerche[p].TestoRicerca,
							"DataModifica": elenco.ricerche[p].DataModifica*1 };
				for(let k in DB.ricerche.data){
					if(DB.ricerche.data[k].TestoRicerca==elenco.ricerche[p].TestoRicerca){
						// se esiste non lo inserisco
						esiste=true;
					}
				}
				if(!esiste){
					// se non esiste aggiungo
					DB.ricerche.data.push(JSNPUSH);
				}
			}
			DB.ricerche.lastSync=lastSync;
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.ricerche.data){
					let trovato = false,
						RC = DB.ricerche.data[k];
					for(let p in elenco.ricerche){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	RC.TestoRicerca==elenco.ricerche[p].TestoRicerca){
							trovato = true;
						}
					}
					if(!trovato){
						DB.ricerche.data[k].TestoRicerca = '';
						DB.ricerche.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche)).then(function(){ // salvo il DB
				LOGIN.verSincro('ricerche');
			});
		}else LOGIN.verSincro('ricerche');
	
		// NOTE
		if(elenco.note){
			syncUp=true;
			for(let p in elenco.note){
				// per ogni novità verifico l'esistenza
				passato=false;
				let id_interno=-1;
				if(BACKUPS.bkpProvv)elenco.note[p].DataModifica = lastSync*1;
				JSNPUSH={	"TestoAnnotazione": elenco.note[p].TestoAnnotazione,
							"hidePunto": elenco.note[p].hidePunto,
							"meridiano": elenco.note[p].meridiano,
							"numeroPunto": elenco.note[p].numeroPunto+'',//*1,
							"idPaziente": elenco.note[p].idPaziente*1,
							"idCL": id_interno,
							"app": __(elenco.note[p].app,''),
							"DataModifica": elenco.note[p].DataModifica*1 };
							
				for(let k in DB.note.data){
					let NT = DB.note.data[k];
					if(	NT.meridiano==elenco.note[p].meridiano && 
						NT.numeroPunto+''==elenco.note[p].numeroPunto+'' && 
						NT.idPaziente==elenco.note[p].idPaziente){
						// se esiste aggiorna
						DB.note.data[k]=JSNPUSH;
						passato=true;
					}
				}
				
				
				if(!passato){
					// se non esiste aggiungo
					DB.note.data.push(JSNPUSH);
				}
			}
			DB.note.lastSync=lastSync;
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.note.data){
					let trovato = false,
						NT = DB.note.data[k];
					for(let p in elenco.note){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	NT.meridiano==elenco.note[p].meridiano && 
							NT.numeroPunto+''==elenco.note[p].numeroPunto+'' && 
							NT.idPaziente==elenco.note[p].idPaziente){
							trovato = true;
						}
					}
					if(!trovato){
						DB.note.data[k].TestoAnnotazione = '';
						DB.note.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note)).then(function(){ // salvo il DB
				LOGIN.verSincro('note');
			});
		}else LOGIN.verSincro('note');
		
		// PROCEDURE
		if(elenco.procedure){
			syncUp=true;
			for(let p in elenco.procedure){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.procedure[p].DataModifica = lastSync*1;
				JSNPUSH={	"idProcedura": elenco.procedure[p].idProcedura*1,
							"idLinguaProcedura": elenco.procedure[p].idLinguaProcedura*1,
							"gallery": toJson(elenco.procedure[p].gallery),
							"NomeProcedura": elenco.procedure[p].NomeProcedura,
							"DataModifica": elenco.procedure[p].DataModifica*1,
							"DataCreazione": elenco.procedure[p].DataCreazione*1,
							"Condiviso": elenco.procedure[p].Condiviso*1,
							"app": __(elenco.procedure[p].app,''),
							"dettagliProcedura": elenco.procedure[p].dettagliProcedura,
							"Cancellato": elenco.procedure[p].Cancellato*1,
							"frv": false };
				
				for(let k in elenco.procedure[p].dettagliProcedura){
					elenco.procedure[p].dettagliProcedura[k].DataModifica*=1;
					elenco.procedure[p].dettagliProcedura[k].OrdineDettaglio*=1;
					elenco.procedure[p].dettagliProcedura[k].Cancellato*=1;
				}
				
				for(let k in DB.procedure.data){
					let PR = DB.procedure.data[k];
					if(	( PR.idProcedura*1>0 && PR.idProcedura*1==elenco.procedure[p].idProcedura*1 ) || 
						(	PR.idProcedura*1==0 &&
							PR.NomeProcedura==elenco.procedure[p].NomeProcedura && 
							PR.DataCreazione*1==elenco.procedure[p].DataCreazione*1)	){ // se esiste aggiorna
							
						DB.procedure.data[k] = JSNPUSH;
						passato=true;
					}
				}
				if(!passato){ // se non esiste aggiungo
					DB.procedure.data.push(JSNPUSH);
				}
			}
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.procedure.data){
					let trovato = false,
						PR = DB.procedure.data[k];
					for(let p in elenco.procedure){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(PR.idProcedura*1>0 && elenco.procedure[p].idProcedura*1==PR.idProcedura*1) ||
							PR.idProcedura*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						DB.procedure.data[k].Cancellato = 1;
						DB.procedure.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			DB.procedure.lastSync=lastSync;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure)).then(function(){ // salvo il DB
				LOGIN.verSincro('procedure');
			});
		}else LOGIN.verSincro('procedure');
		
		// SERVIZI
		if(elenco.servizi){
			syncUp=true;
			for(let p in elenco.servizi){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.servizi[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idServizio": elenco.servizi[p].idServizio*1,
							"NomeServizio": elenco.servizi[p].NomeServizio+"",
							"DescrizioneServizio": elenco.servizi[p].DescrizioneServizio+"",
							"CostoServizio": elenco.servizi[p].CostoServizio*1,
							"NumeroSedute": elenco.servizi[p].NumeroSedute*1,
							"DataModifica": elenco.servizi[p].DataModifica*1,
							"DataCreazione": elenco.servizi[p].DataCreazione*1,
							"Cancellato": elenco.servizi[p].Cancellato*1,
							"frv": false };
				
				for(let k in DB.servizi.data){
					let SR = DB.servizi.data[k];
					if(	( SR.idServizio*1>0 && SR.idServizio*1==elenco.servizi[p].idServizio*1 ) || 
						(	SR.idServizio*1==0 &&
							SR.NomeServizio==elenco.servizi[p].NomeServizio && 
							SR.DataCreazione*1==elenco.servizi[p].DataCreazione*1)	){ // se esiste aggiorna
							
						DB.servizi.data[k] = JSNPUSH;
						passato=true;
					}
				}
				if(!passato){ // se non esiste aggiungo
					DB.servizi.data.push(JSNPUSH);
				}
			}
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.servizi.data){
					let trovato = false,
						SR = DB.servizi.data[k];
					for(let p in elenco.servizi){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(SR.idServizio*1>0 && elenco.servizi[p].idServizio*1==SR.idServizio*1) ||
							SR.idServizio*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						DB.servizi.data[k].Cancellato = 1;
						DB.servizi.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			DB.servizi.lastSync=lastSync;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi)).then(function(){ // salvo il DB
				LOGIN.verSincro('servizi');
			});
		}else LOGIN.verSincro('servizi');
		
		// FORNITORI
		if(elenco.fornitori){
			syncUp=true;
			for(let p in elenco.fornitori){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.fornitori[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idFornitore": elenco.fornitori[p].idFornitore*1,
							"RagioneSociale": elenco.fornitori[p].RagioneSociale+"",
							"Intestazione": elenco.fornitori[p].Intestazione+"",
							"PartitaIva": elenco.fornitori[p].PartitaIva,
							"CodiceFiscale": elenco.fornitori[p].CodiceFiscale,
							"Indirizzo": elenco.fornitori[p].Indirizzo,
							"CAP": elenco.fornitori[p].CAP,
							"Citta": elenco.fornitori[p].Citta,
							"Provincia": elenco.fornitori[p].Provincia,
							"Stato": elenco.fornitori[p].Stato,
							"Telefono": elenco.fornitori[p].Telefono,
							"Email": elenco.fornitori[p].Email,
							"NoteFornitore": elenco.fornitori[p].NoteFornitore,
							"etichette": toJson(elenco.fornitori[p].etichette),
							"DataModifica": elenco.fornitori[p].DataModifica*1,
							"DataCreazione": elenco.fornitori[p].DataCreazione*1,
							"Cancellato": elenco.fornitori[p].Cancellato*1,
							"frv": false };
				
				for(let k in DB.fornitori.data){
					let FR = DB.fornitori.data[k];
					if(	( FR.idFornitore*1>0 && FR.idFornitore*1==elenco.fornitori[p].idFornitore*1 ) || 
						(	FR.idFornitore*1==0 &&
							FR.RagioneSociale==elenco.fornitori[p].RagioneSociale && 
							FR.DataCreazione*1==elenco.fornitori[p].DataCreazione*1)	){ // se esiste aggiorna
							
						DB.fornitori.data[k] = JSNPUSH;
						passato=true;
					}
				}
				if(!passato){ // se non esiste aggiungo
					DB.fornitori.data.push(JSNPUSH);
				}
			}
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.fornitori.data){
					let trovato = false,
						FR = DB.fornitori.data[k];
					for(let p in elenco.fornitori){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(FR.idFornitore*1>0 && elenco.fornitori[p].idFornitore*1==FR.idFornitore*1) ||
							FR.idFornitore*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						DB.fornitori.data[k].Cancellato = 1;
						DB.fornitori.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			DB.fornitori.lastSync=lastSync;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)).then(function(){ // salvo il DB
				LOGIN.verSincro('fornitori');
			});
		}else LOGIN.verSincro('fornitori');
		
		// APPUNTAMENTI
		if(elenco.appuntamenti){
			syncUp=true;
			for(let p in elenco.appuntamenti){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.appuntamenti[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idAppuntamento": elenco.appuntamenti[p].idAppuntamento*1,
							"TestoAppuntamento": elenco.appuntamenti[p].TestoAppuntamento+"",
							"TimeAppuntamento": elenco.appuntamenti[p].TimeAppuntamento*1,
							"oraInizio": elenco.appuntamenti[p].oraInizio*1,
							"oraFine": elenco.appuntamenti[p].oraFine*1,
							"idPaziente": elenco.appuntamenti[p].idPaziente*1,
							"DataModifica": elenco.appuntamenti[p].DataModifica*1,
							"DataCreazione": elenco.appuntamenti[p].DataCreazione*1,
							"Cancellato": elenco.appuntamenti[p].Cancellato*1,
							"frv": false };
				
				for(let k in DB.appuntamenti.data){
					let AP = DB.appuntamenti.data[k];
					if(	( AP.idAppuntamento*1>-1 && AP.idAppuntamento*1==elenco.appuntamenti[p].idAppuntamento*1 ) || 
						(	AP.idAppuntamento*1==-1 &&
							AP.TestoAppuntamento==elenco.appuntamenti[p].TestoAppuntamento && 
							AP.DataCreazione*1==elenco.appuntamenti[p].DataCreazione*1)	){ // se esiste aggiorna
							
						DB.appuntamenti.data[k] = JSNPUSH;
						passato=true;
					}
				}
				if(!passato){ // se non esiste aggiungo
					DB.appuntamenti.data.push(JSNPUSH);
				}
			}
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.appuntamenti.data){
					let trovato = false,
						AP = DB.appuntamenti.data[k];
					for(let p in elenco.appuntamenti){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(AP.idAppuntamento*1>0 && elenco.appuntamenti[p].idAppuntamento*1==AP.idAppuntamento*1) ||
							AP.idAppuntamento*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						DB.appuntamenti.data[k].Cancellato = 1;
						DB.appuntamenti.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			DB.appuntamenti.lastSync=lastSync;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)).then(function(){ // salvo il DB
				LOGIN.verSincro('appuntamenti');
			});
		}else LOGIN.verSincro('appuntamenti');
		
		
		// ANNOTAZIONI
		if(elenco.annotazioni){
			syncUp=true;
			for(let p in elenco.annotazioni){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.annotazioni[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idAnnotazione": elenco.annotazioni[p].idAnnotazione*1,
							"TitoloAnnotazione": elenco.annotazioni[p].TitoloAnnotazione+"",
							"TestoAnnotazione": elenco.annotazioni[p].TestoAnnotazione+"",
							"DataModifica": elenco.annotazioni[p].DataModifica*1,
							"DataCreazione": elenco.annotazioni[p].DataCreazione*1,
							"Cancellato": elenco.annotazioni[p].Cancellato*1,
							"frv": false };
				
				for(let k in DB.annotazioni.data){
					let AN = DB.annotazioni.data[k];
					if(	( AN.idAnnotazione*1>0 && AN.idAnnotazione*1==elenco.annotazioni[p].idAnnotazione*1 ) || 
						(	AN.idAnnotazione*1==0 &&
							AN.TitoloAnnotazione==elenco.annotazioni[p].TitoloAnnotazione && 
							AN.DataCreazione*1==elenco.annotazioni[p].DataCreazione*1)	){ // se esiste aggiorna
							
						DB.annotazioni.data[k] = JSNPUSH;
						passato=true;
					}
				}
				if(!passato){ // se non esiste aggiungo
					DB.annotazioni.data.push(JSNPUSH);
				}
			}
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.annotazioni.data){
					let trovato = false,
						AN = DB.annotazioni.data[k];
					for(let p in elenco.annotazioni){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(AN.idAnnotazione*1>0 && elenco.annotazioni[p].idAnnotazione*1==AN.idAnnotazione*1) ||
							AN.idAnnotazione*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						DB.annotazioni.data[k].Cancellato = 1;
						DB.annotazioni.data[k].DataModifica = lastSync + 1;
					}
				}
			}
			
			DB.annotazioni.lastSync=lastSync;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".annotazioni"), IMPORTER.COMPR(DB.annotazioni)).then(function(){ // salvo il DB
				LOGIN.verSincro('annotazioni');
			});
		}else LOGIN.verSincro('annotazioni');
		
		// PAZIENTI
		if(elenco.pazienti){
			syncUp=true;
			for(let p in elenco.pazienti){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.pazienti[p].DataModifica = lastSync*1;
				
				JSNPUSH={ 	"idPaziente": elenco.pazienti[p].idPaziente*1,
							"Nome": elenco.pazienti[p].Nome+"",
							"Cognome": elenco.pazienti[p].Cognome+"",
							"Indirizzo": elenco.pazienti[p].Indirizzo,
							"CAP": elenco.pazienti[p].CAP,
							"Citta": elenco.pazienti[p].Citta,
							"Provincia": elenco.pazienti[p].Provincia,
							"Stato": elenco.pazienti[p].Stato,
							"Telefono": elenco.pazienti[p].Telefono,
							"Cellulare": __(elenco.pazienti[p].Cellulare),
							"paeseCellulare": __(elenco.pazienti[p].paeseCellulare),
							"Email": elenco.pazienti[p].Email,
							"sesso": elenco.pazienti[p].sesso,
							"NotePaziente": elenco.pazienti[p].NotePaziente,
							"DataNascita": elenco.pazienti[p].DataNascita,
							"LuogoNascita": __(elenco.pazienti[p].LuogoNascita),
							"tags": toJson(elenco.pazienti[p].tags),
							"etichette": toJson(elenco.pazienti[p].etichette),
							"medicine": toJson(elenco.pazienti[p].medicine),
							"allergie": toJson(elenco.pazienti[p].allergie),
							"patologie": toJson(elenco.pazienti[p].patologie),
							"interventi": toJson(elenco.pazienti[p].interventi),
							"gallery": toJson(elenco.pazienti[p].gallery),
							"Provenienza": elenco.pazienti[p].Provenienza,
							"Professione": elenco.pazienti[p].Professione,
							"Intestazione": elenco.pazienti[p].Intestazione,
							"CodiceFiscale": elenco.pazienti[p].CodiceFiscale,
							"PartitaIva": elenco.pazienti[p].PartitaIva,
							"Social": elenco.pazienti[p].Social,
							"avatar": elenco.pazienti[p].avatar,
							"Altezza": elenco.pazienti[p].Altezza,
							"Peso": elenco.pazienti[p].Peso,
							"DataModifica": elenco.pazienti[p].DataModifica*1,
							"trattamenti": [],
							"saldi": [],
							"Cancellato": elenco.pazienti[p].Cancellato*1,
							"frv": false };
	
				let trattamentiProvvisori=[],
					saldiProvvisori=[];
				kDef=-1; // il paziente di riferimento su cui lavorare per i trattamenti
				for(let k in DB.pazienti.data){
					PZ = DB.pazienti.data[k];
					if( ( PZ.idPaziente*1>0 && PZ.idPaziente*1==elenco.pazienti[p].idPaziente*1 ) || 
						( PZ.idPaziente*1==0 && PZ.Nome==elenco.pazienti[p].Nome && PZ.Cognome==elenco.pazienti[p].Cognome ) || 
						( PZ.idPaziente*1==0 && k==elenco.pazienti[p].p) ){
							
						// se esiste aggiorna
						if(typeof(PZ.trattamenti)=='undefined')PZ.trattamenti=[];
						if(typeof(PZ.saldi)=='undefined')PZ.saldi=[];
						trattamentiProvvisori=JSON.parse(JSON.stringify(PZ.trattamenti));
						saldiProvvisori=JSON.parse(JSON.stringify(PZ.saldi));
						let md5 = '';
						if(typeof(DB.pazienti.data[k].md5)!='undefined')md5=PZ.md5;
						DB.pazienti.data[k] = JSNPUSH;
						DB.pazienti.data[k].md5=md5;
						kDef=k;
						passato=true;
					}
					
				}
				if(!passato){
					// se non esiste aggiungo
					DB.pazienti.data.push(JSNPUSH);
					kDef=DB.pazienti.data.length-1;
				}
				
				// TRATTAMENTI x ogni paziente
				if(elenco.pazienti[p].Cancellato*1!=1){ // se il paziente NON è cancellato
					let trattamenti=JSON.parse(JSON.stringify(elenco.pazienti[p].trattamenti)); // elenco trattamenti arrivati nuovi
					
					for(t in trattamenti){ // in tutti i trattamenti arrivati
						passato=false;
						
						let puntiMTC = trattamenti[t].puntiMTC;
						
						if(puntiMTC.substr(0,1)!="["){ // per i dati che arrivano da TM15
							if(puntiMTC.indexOf(".")>-1){
								let puntiProvvisori = [],
									parti = puntiMTC.split("|");
								for(let pt in parti){
									let ppp = parti[pt].split(".");
									puntiProvvisori.push({
										n: ppp[0],
										m: ppp[1],
										e: ppp[2]
									});
								}
								puntiMTC = JSON.stringify(puntiProvvisori);
							}else puntiMTC = '[]';
						} //-------------------------------------------------------------
						
						if(BACKUPS.bkpProvv)trattamenti[t].DataModifica = lastSync*1;
						JSNPUSH={ 	"idTrattamento": trattamenti[t].idTrattamento*1,
									"idPaziente": DB.pazienti.data[kDef].idPaziente*1,
									"TitoloTrattamento": trattamenti[t].TitoloTrattamento,
									"TestoTrattamento": trattamenti[t].TestoTrattamento,
									"Prescrizione": trattamenti[t].Prescrizione,
									"puntiMTC": toJson(puntiMTC),
									"puntiAuricolari": toJson(__(trattamenti[t].puntiAuricolari,'')),
									"puntiPlantari": toJson(__(trattamenti[t].puntiPlantari,'')),
									"puntiNamikoshi": toJson(__(trattamenti[t].puntiNamikoshi,'')),
									"meridiani": toJson(trattamenti[t].meridiani),
									"sintomi": toJson(trattamenti[t].sintomi),
									"gallery": toJson(trattamenti[t].gallery),
									"TimeTrattamento": trattamenti[t].TimeTrattamento*1,
									"oraInizio": trattamenti[t].oraInizio*1,
									"oraFine": trattamenti[t].oraFine*1,
									"DataModifica": trattamenti[t].DataModifica*1,
									"LabelCiclo": trattamenti[t].LabelCiclo,
									"TipoTrattamento": trattamenti[t].TipoTrattamento,
									"CostoTrattamento": trattamenti[t].CostoTrattamento*1,
									"ordine": trattamenti[t].ordine*1,
									"Cancellato": trattamenti[t].Cancellato*1,
									"frv": false };		
						for(let g in trattamentiProvvisori){ // in quelli esistenti ...
							let TR = trattamentiProvvisori[g],
								md5='';
							if(typeof(trattamentiProvvisori[g].md5)!='undefined')md5=trattamentiProvvisori[g].md5;
							//console.log(md5)
							if(	(TR.idTrattamento*1>0 && TR.idTrattamento*1==trattamenti[t].idTrattamento*1) ||
								(TR.idTrattamento*1==0 && TR.id_interno*1==trattamenti[t].p*1)){ // verifico l'esistenza
								
								// se esiste aggiorna
								trattamentiProvvisori[g]=JSNPUSH;
								trattamentiProvvisori[g].md5=md5;
								passato=true;
							}
						}
						if(!passato){ // se non esiste aggiungo
							trattamentiProvvisori.push(JSNPUSH);
						}
					}
					
					if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
						for(let g in trattamentiProvvisori){ 
							let trovato = false,
								TR = trattamentiProvvisori[g];
							for(t in trattamenti){
								/*
									se sto ripristinando un backup
									se non trovo l'elemento del DB locale nel DB backuppato
									oppure non è mai stato backuppato
									cancello l'elemento locale
								*/
								if(	(TR.idTrattamento*1>0 && trattamenti[t].idTrattamento*1==TR.idTrattamento*1) ||
									TR.idTrattamento*1 == 0){
									trovato = true;
								}
							}
							if(!trovato){
								trattamentiProvvisori[g].Cancellato = 1;
								trattamentiProvvisori[g].DataModifica = lastSync + 1;
							}
						}
					}
					DB.pazienti.data[kDef].trattamenti=trattamentiProvvisori;
					
				}
				// SALDI x ogni paziente
				if(elenco.pazienti[p].Cancellato*1!=1){ // se il paziente NON è cancellato
					let saldi=JSON.parse(JSON.stringify(elenco.pazienti[p].saldi)); // elenco trattamenti arrivati nuovi
					
					for(t in saldi){ // in tutti i trattamenti arrivati
						passato=false;
						if(BACKUPS.bkpProvv)saldi[t].DataModifica = lastSync*1;
						JSNPUSH={ 	"idSaldo": saldi[t].idSaldo*1,
									"idPaziente": DB.pazienti.data[kDef].idPaziente*1,
									"MotivoSaldo": saldi[t].MotivoSaldo,
									"RicevutaSaldo": __(saldi[t].RicevutaSaldo),
									"ValoreSaldo": saldi[t].ValoreSaldo*1,
									"DataSaldo": saldi[t].DataSaldo*1,
									"DataModifica": saldi[t].DataModifica*1,
									"Cancellato": saldi[t].Cancellato*1,
									"frv": false };		
									
						if(debug)console.log(JSNPUSH);
						for(let g in saldiProvvisori){ // in quelli esistenti ...
							let SL = saldiProvvisori[g];
							if(	( SL.idSaldo*1>0 && SL.idSaldo*1==saldi[t].idSaldo*1) ||
								  SL.id_interno*1==saldi[t].p*1 ){ // verifico l'esistenza
								
								// se esiste aggiorna
								let md5='';
								if(typeof(saldi[t].md5)!='undefined')md5=saldi[t].md5;
								saldiProvvisori[g]=JSNPUSH;
								saldiProvvisori[g].md5=md5;
								passato=true;
							}
						}
						
						if(!passato){ // se non esiste aggiungo
							saldiProvvisori.push(JSNPUSH);
						}
					}
					
					if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
						for(let g in saldiProvvisori){ 
							let trovato = false,
								SA = saldiProvvisori[g];
							for(t in saldi){
								/*
									se sto ripristinando un backup
									se non trovo l'elemento del DB locale nel DB backuppato
									oppure non è mai stato backuppato
									cancello l'elemento locale
								*/
								if(	(SA.idSaldo*1>0 && saldi[t].idSaldo*1==SA.idSaldo*1) ||
									SA.idSaldo*1 == 0){
									trovato = true;
								}
							}
							if(!trovato){
								saldiProvvisori[g].Cancellato = 1;
								saldiProvvisori[g].DataModifica = lastSync + 1;
							}
						}
					}
					
					DB.pazienti.data[kDef].saldi=saldiProvvisori;
				}
			}
			DB.pazienti.lastSync=lastSync;
			
			
				
			
			
			if(BACKUPS.bkpProvv){ // <<<<<<< per il backup
				for(let k in DB.pazienti.data){
					let trovato = false,
						PZ = DB.pazienti.data[k];
					for(let p in elenco.pazienti){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	(PZ.idPaziente*1>0 && elenco.pazienti[p].idPaziente*1==PZ.idPaziente*1) ||
							PZ.idPaziente*1 == 0){
							trovato = true;
						}
					}
					if(!trovato){
						PZ.Cancellato = 1;
						PZ.DataModifica = lastSync + 1;
					}
				}
			}
			
			
			// elimino i pazienti con idPaziente = 0 dopo la sincronizzazione
			for(let p in DB.pazienti.data){
				if(DB.pazienti.data[p].idPaziente*1==0){
					if(p>0)DB.pazienti.data.splice(p,1);
					else DB.pazienti.data.shift();
				}
			}
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				LOGIN.verSincro('pazienti'); 
			});
		}else LOGIN.verSincro('pazienti');
		LOGIN.daSync = false;
		LINGUE.getGoogleLanguages();
	},
	verSincro: function ( txt ){ // verifica la sincronizzazione della tabella txt
		LOGIN.nSinc++;
		if(LOGIN.afterFunct && LOGIN.afterFunct.indexOf('/*noRic*/')==-1) {
			switch(txt){
				
				case "appuntamenti":
					//
					break;
				
				case "annotazioni":
					ANNOTAZIONI.caricaAnnotazioni();
					break;
				
				case "servizi":
					SERVIZI.caricaServizi();
					break;
				
				case "fornitori":
					FORNITORI.caricaFornitori();
					break;
				
				case "pazienti":
					if(PAZIENTI.idCL == -1)PAZIENTI.caricaPazienti();
					else{
						if(PAZIENTI.trattOp)PAZIENTI.caricaTrattamenti();
						if(PAZIENTI.saldoOp)PAZIENTI.caricaSaldi();
					}
					break;
				
				case "procedure":
					//if(globals.set.cartella == 'meridiani_cinesi'){
					if(globals.set.cartella){
						try{
							SET.car_procedure('',true);
						}catch(err){}
					}
					break;
					
			}
		}
		if(LOGIN.nSinc == LOGIN.totSinc){ // pazienti | procedure | note | ricerche
			LOGIN.pulisciTabelle();
			DB._verDbSize();
		}
	},
	pulisciTabelle: function(){ // elimina gli elementi "Cancellati"
		if(!BACKUPS.bkpProvv){
			DB.pazienti.data = __(DB.pazienti.data,[]);
			let PZS = DB.pazienti.data,
				tot,
				tot2;
			tot = PZS.length;
			for(let p=tot-1;p>=0;p--){
				if(PZS[p].Cancellato=='1' || __(PZS[p].frv))PZS.splice(p, 1)
			}
			tot = PZS.length;
			for(let p=tot-1;p>=0;p--){
				let TRS = DB.pazienti.data[p].trattamenti;
				tot2 = TRS.length;
				for(t=tot2-1;t>=0;t--){
					if(TRS[t].Cancellato=='1' || __(TRS[t].frv))TRS.splice(t, 1);
				}
			}
			for(let p=tot-1;p>=0;p--){
				let SAS = DB.pazienti.data[p].saldi;
				tot2 = SAS.length;
				for(let s=tot2-1;s>=0;s--){
					if(SAS[s].Cancellato=='1' || __(SAS[s].frv))SAS.splice(s, 1);
				}
			}
			DB.fornitori.data = __(DB.fornitori.data,[]);
			let FRS = DB.fornitori.data;
			tot = FRS.length;
			for(let p=tot-1;p>=0;p--){
				if(FRS[p].Cancellato=='1' || __(FRS[p].frv))FRS.splice(p, 1)
			}
			DB.servizi.data = __(DB.servizi.data,[]);
			let SRS = DB.servizi.data;
			tot = SRS.length;
			for(let p=tot-1;p>=0;p--){
				if(SRS[p].Cancellato=='1' || __(SRS[p].frv))SRS.splice(p, 1)
			}
			DB.appuntamenti.data = __(DB.appuntamenti.data,[]);
			let APS = DB.appuntamenti.data;
			tot = APS.length;
			for(let p=tot-1;p>=0;p--){
				if(APS[p].Cancellato=='1' || __(APS[p].frv))APS.splice(p, 1)
			}
			DB.annotazioni.data = __(DB.annotazioni.data,[]);
			let ANS = DB.annotazioni.data;
			tot = ANS.length;
			for(let p=tot-1;p>=0;p--){
				if(ANS[p].Cancellato=='1' || __(ANS[p].frv))ANS.splice(p, 1)
			}
			DB.procedure.data = __(DB.procedure.data,[]);
			let PRS = DB.procedure.data;
			tot = PRS.length;
			for(let p=tot-1;p>=0;p--){
				if(PRS[p].Cancellato=='1' || __(PRS[p].frv))PRS.splice(p, 1)
			}
			PRS = DB.procedure.data;
			tot = PRS.length;
			for(let p=tot-1;p>=0;p--){
				let DTS = DB.procedure.data[p].dettagliProcedura;
				tot2 = DTS.length;
				for(let d=tot2-1;d>=0;d--){
					if(DTS[d].Cancellato=='1' || __(DTS[d].frv))DTS.splice(d, 1);
				}
			}
		}
		//DB.files = { data: [], lastSync: 0 };
		for(let f in DB.files.data){
			DB.files.data[f].imgBig = '';
		}
		Promise.all([
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".annotazioni"), IMPORTER.COMPR(DB.annotazioni)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche)),
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files))
		]).then(function( dbs ){
			if(LOGIN.afterFunct){
				eval(LOGIN.afterFunct);
				if(LOGIN.afterFunct && LOGIN.afterFunct.indexOf('/*noRic*/')>=-1){
					LOGIN.afterFunct = null;
					return;
				}
				LOGIN.afterFunct = null;
			}else{
				try{
					SET.car_procedure(-1,1);
					SET.leggiNote();
				}catch(err){}
			}
			if(PAZIENTI.idCL == -1)PAZIENTI.caricaPazienti();
			else{
				try{document.getElementById("lista_pazienti").querySelector(".alertMini").style.display='none';}catch(err){}
			}
			FORNITORI.caricaFornitori();
			SERVIZI.caricaServizi();
			ANNOTAZIONI.caricaAnnotazioni();
			if(	SCHEDA.elencoSel == 'pazienti'){	
				let lista = document.getElementById("lista_pazienti").querySelector(".lista");
				if(lista.classList.contains("listaTrattamenti"))PAZIENTI.caricaTrattamenti( true ); // true serve per ...
				if(lista.classList.contains("listaSaldi"))PAZIENTI.caricaSaldi( true ); //    ... riaccendere il pulsante
			}
			if(BACKUPS.bkpProvv){
				BACKUPS.bkpProvv = null;
				LOGIN.sincronizza( 'BACKUPS.ripristinoTerminato();', true );
				visLoader("");
				SCHEDA.scaricaScheda();
				if(PAZIENTI.idCL > -1){
					PAZIENTI.deselPaziente();
				}
			}
			if(DB.__sizeDb<40*1000*1000)LOGIN.updateGallery(); // limite a 40MB (circa 1000 file)
		});
	},
	download:function( filename, text ){ // scarica un file
		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);	
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	},
	slugify: function(s){ // NON UTILIZZATA
		_slugify_strip_re = /[^\w\s-]/g;
		_slugify_hyphenate_re = /[-\s]+/g;
		s = s.replace(_slugify_strip_re, '').trim().toLowerCase();
		s = s.replace(_slugify_hyphenate_re, '-');
		return s;
	},
	updateGallery: function(){ // aggiorna la Gallery e richiama l'API url
		if(CONN.getConn() && LOGIN.logedin()!=''){
			let elenco = [];
			for(let p in DB.pazienti.data){
				// verifico nel paziente
				let gallery =  __(DB.pazienti.data[p].gallery,[]);
				if(gallery.length){
					for(let g in gallery){
						if(!__(gallery[g].imgMini)){
							let add = true;
							for(let f in DB.files.data){
								if(DB.files.data[f].idFile==gallery[g].idFile && __(DB.files.data[f].imgMini))add = false;
							}
							if(add)elenco.push(gallery[g].idFile);
						}
					}
				}
				// verifico nei trattamenti
				for(t in DB.pazienti.data[p].trattamenti){
					if(DB.pazienti.data[p].trattamenti[t].gallery){
						let gallery =  DB.pazienti.data[p].trattamenti[t].gallery;
						if(gallery.length){
							for(let g in gallery){
								if(!__(gallery[g].imgMini)){
									let add = true;
									for(let f in DB.files.data){
										if(DB.files.data[f].idFile==gallery[g].idFile && __(DB.files.data[f].imgMini))add = false;
									}
									if(add)elenco.push(gallery[g].idFile);
								}
							}
						}
					}
				}
			}
			for(let p in DB.procedure.data){
				// verifico nella procedura
				let gallery =  __(DB.procedure.data[p].gallery,[]);
				if(gallery.length){
					for(let g in gallery){
						if(!__(gallery[g].imgMini)){
							let add = true;
							for(let f in DB.files.data){
								if(DB.files.data[f].idFile==gallery[g].idFile && __(DB.files.data[f].imgMini))add = false;
							}
							if(add)elenco.push(gallery[g].idFile);
						}
					}
				}
			}
			CONN.caricaUrl(	'getImgGallery_GLOBAL.php','b64=1&iU='+DB.login.data.idUtente+'&JSNPOST='+window.btoa(encodeURIComponent(JSON.stringify(elenco))),'LOGIN.updateGallery_save');
		}
	},
	updateGallery_save: function( res ){ // risposta dall'API url dell'aggiornamento gallery
		if(res){
			let modificato = false,
				files = JSON.parse(res);
			for(let f in files){
				let presente = false;
				for(let g in DB.files.data){
					if(DB.files.data[g].idFile == files[f].idFile){
						DB.files.data[g].imgMini = files[f].imgMini;
						presente = true;
					}
				}
				if(!presente){
					DB.files.data.push(files[f]);
					modificato = true;
				}
			}
			if(modificato){
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files));
			}
		}
	},
	pulisciGallery: function(){ // pulisce la gallery
		for(let f=DB.files.data.length-1;f>=0;f--){
			presente = false;
			for(let p in DB.pazienti.data){
				// verifico nel paziente
				let gallery =  __(DB.pazienti.data[p].gallery,[]);
				if(gallery.length){
					for(let g in gallery){
						if(DB.files.data[f].idFile == gallery[g].idFile)presente = true;
					}
				}
				// verifico nei trattamenti
				for(t in DB.pazienti.data[p].trattamenti){
					if(DB.pazienti.data[p].trattamenti[t].gallery){
						let gallery =  DB.pazienti.data[p].trattamenti[t].gallery;
						if(gallery.length){
							for(let g in gallery){
								if(DB.files.data[f].idFile == gallery[g].idFile)presente = true;
							}
						}
					}
				}
			}
			for(let p in DB.procedure.data){
				// verifico nella procedura
				let gallery =  __(DB.procedure.data[p].gallery,[]);
				if(gallery.length){
					for(let g in gallery){
						if(DB.files.data[f].idFile == gallery[g].idFile)presente = true;
					}
				}
			}
			if(!presente)DB.files.data.splice(f,1);
		}
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files));
	},
	
	
	// GESTORE APERTURE
	verifyLocked: function( tab, n ){// Verifica se l'elemento "n" della tabella "tab" è già stato aperto da un altro dispositivo e se non è aperto lo blocca
		if(n){
			SCHEDA.locked.tab = tab;
			SCHEDA.locked.idEl = n;
			CONN.caricaUrl(	"lockedVerifica.php",
							"tab=" +tab+"&idEl="+n,
							"LOGIN.manageLocked");
		}
	},
	manageLocked: function( txt ){// risposta da verifyLocked: gestisce la chiusura della scheda in caso sia già aperto
		if(txt == 'locked'){
			ALERT(TXT("ElementoGiaAperto"));
			SCHEDA.scaricaScheda();
		}
	},
	closeLocked: function( tab, n ){ // Chiude l'elemento "n" della tabella "tab" aperto sul server
		if(n){
			CONN.caricaUrl(	"lockedChiudi.php",
							"tab=" +tab+"&idEl="+n,
							"__");
			SCHEDA.locked.tab = '';
			SCHEDA.locked.idEl = 0;
		}
	},
	
	// funzioni generiche
	componi: function( backup, data ){ // compone l'html per il backup visivo
		let addShiatsu = globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'';
		LOGIN.addHTML('<style type="text/css">*{font-family:Verdana, Geneva, sans-serif;font-size:12px;line-height:20px;}.rientro{padding-left:20px;}.tits{font-size:14px;}h1, h1 *{font-size:24px;}h2, h2 *{font-size:20px;}h3, h3 *{font-size:16px;}i{color:#999;}</style>')
		LOGIN.addHTML(TXT("Backup")+": <b>"+DB.login.data.Nominativo+"</b><br>");
		LOGIN.addHTML("<i>"+TXT("DataCreazione")+":</i> <b>"+getFullDataTS(data)+" ore "+getOraTS(data)+"</b><hr>");
		
		LOGIN.addHTML("<h1>"+TXT("Pazienti").toUpperCase()+"</h1><div class=\"rientro\">");
		for(let p in backup.pazienti){
			backup.pazienti[p].Nome=backup.pazienti[p].Nome;
			backup.pazienti[p].Cognome=backup.pazienti[p].Cognome;
			backup.pazienti[p].p=p;
		}
		backup.pazienti.sort(sort_by("Cognome" ));
		backup.pazienti.sort(sort_by("Nome" ));
		let nr = 0;
		for(let p in backup.pazienti){
			let PZ = backup.pazienti[p];
			if((PZ.Nome || PZ.Cognome) && PZ.Cancellato!='1'){
				nr++;

				etichette = JSON.parse(PZ.etichette);
				
				LOGIN.addHTML("<h2>"+htmlEntities(PZ.Nome)+" "+htmlEntities(PZ.Cognome)+"</h2><div class=\"rientro\">");

				let htmlProvv = '';
				if(PZ.sesso)htmlProvv += "<i>"+TXT("Sesso")+":</i> "+sessi[PZ.sesso]+"<br>";
				if(PZ.DataNascita!='0000-00-00')htmlProvv += "<i>"+TXT("DataNascita")+":</i> "+htmlEntities(getDataTS(new Date(PZ.DataNascita)*.001))+"<br>";
				if(PZ.LuogoNascita)htmlProvv += "<i>"+TXT("LuogoNascita")+":</i> "+htmlEntities(PZ.LuogoNascita)+"<br>";
				htmlProvv += H.scriviEtichette('anagrafici');
				if(htmlProvv)LOGIN.addHTML("<i><b>"+TXT("LabelAnagrafici")+"</b></i><br>"+htmlProvv+"<br>");
				
				htmlProvv = '';
				if(PZ.Indirizzo)htmlProvv += "<i>"+TXT("Indirizzo")+":</i> "+htmlEntities(PZ.Indirizzo)+"<br>";
				if(PZ.Citta)htmlProvv += "<i>"+TXT("Citta")+":</i> "+htmlEntities(PZ.Citta)+"<br>";
				if(PZ.Provincia)htmlProvv += "<i>"+TXT("Provincia")+":</i> "+htmlEntities(PZ.Provincia)+"<br>";
				if(PZ.CAP)htmlProvv += "<i>"+TXT("CAP")+":</i> "+htmlEntities(PZ.CAP)+"<br>";
				if(PZ.Stato)htmlProvv += "<i>"+TXT("Stato")+":</i> "+htmlEntities(PZ.Stato)+"<br>";
				htmlProvv += H.scriviEtichette('indirizzo');
				if(htmlProvv)LOGIN.addHTML("<i><b>"+TXT("LabelIndirizzo")+"</b></i><br>"+htmlProvv+"<br>");
				
				htmlProvv = '';
				if(PZ.Telefono)htmlProvv += "<i>"+TXT("Telefono")+":</i> "+htmlEntities(PZ.Telefono)+"<br>";
				let prefisso = (PZ.paeseCellulare)?DB.INT.paesi[PZ.paeseCellulare].prefisso:'';
				if(PZ.Cellulare)htmlProvv += "<i>"+TXT("Cellulare")+":</i> "+prefisso+PZ.Cellulare+"<br>";
				if(PZ.Email)htmlProvv += "<i>"+TXT("Email")+":</i> "+htmlEntities(PZ.Email)+"<br>";
				htmlProvv += H.scriviEtichette('contatti');
				if(htmlProvv)LOGIN.addHTML("<i><b>"+TXT("LabelContatti")+"</b></i><br>"+htmlProvv+"<br>");
				
				htmlProvv = '';
				if(PZ.Intestazione)htmlProvv += "<i>"+TXT("Intestazione")+":</i> "+htmlEntities(PZ.Intestazione)+"<br>";
				if(PZ.CodiceFiscale)htmlProvv += "<i>"+TXT("CodiceFiscale")+":</i> "+htmlEntities(PZ.CodiceFiscale)+"<br>";
				if(PZ.PartitaIva)htmlProvv += "<i>"+TXT("PartitaIva")+":</i> "+htmlEntities(PZ.PartitaIva)+"<br>";
				htmlProvv += H.scriviEtichette('fatturazione');
				if(htmlProvv)LOGIN.addHTML("<i><b>"+TXT("LabelFatturazione")+"</b></i><br>"+htmlProvv+"<br>");
				
				htmlProvv = '';
				if(PZ.Provenienza)htmlProvv += "<i>"+TXT("Provenienza")+":</i> "+htmlEntities(PZ.Provenienza)+"<br>";
				if(PZ.Professione)htmlProvv += "<i>"+TXT("Professione")+":</i> "+htmlEntities(PZ.Professione)+"<br>";
				if(PZ.Social)htmlProvv += "<i>"+TXT("Social")+":</i> "+htmlEntities(PZ.Social)+"<br>";
				htmlProvv += H.scriviEtichette('aggiuntive');
				if(htmlProvv)LOGIN.addHTML("<i><b>"+TXT("LabelAggiuntive")+"</b></i><br>"+htmlProvv+"<br>");

				
				htmlProvv = '';
				let tags = JSON.parse(PZ.tags);
				if(tags.length>0){
					LOGIN.addHTML("<br><i><b>"+TXT("Tags")+"</b></i><br>");
					for(let j in tags){
						htmlProvv += '- ' +htmlEntities(tags[j].NomeTag) +'<br>';
					}
				}
				if(htmlProvv)LOGIN.addHTML(htmlProvv+"<br>");
				
				htmlProvv = '';
				if(PZ.Altezza)htmlProvv += "<i>"+convertMisure(TXT("Altezza"))+":</i> "+htmlEntities(PZ.Altezza)+"<br>";
				if(PZ.Peso)htmlProvv += "<i>"+convertMisure(TXT("Peso"))+":</i> "+htmlEntities(PZ.Peso)+"<br>";
				htmlProvv += H.scriviEtichette('biometrici');
				if(htmlProvv)LOGIN.addHTML("<i><b>"+TXT("LabelBiometrici")+"</b></i><br>"+htmlProvv+"<br>");

				htmlProvv = '';
				let medicine = JSON.parse(PZ.medicine);
				if(medicine.length>0){
					LOGIN.addHTML("<br><i><b>"+TXT("Medicine")+"</b></i><br>");
					for(let j in medicine){
						htmlProvv += '- ' +htmlEntities(medicine[j].NomeMedicina) +'<br>';
					}
				}
				if(htmlProvv)LOGIN.addHTML(htmlProvv+"<br>");

				htmlProvv = '';
				let allergie = JSON.parse(PZ.allergie);
				if(allergie.length>0){
					LOGIN.addHTML("<br><i><b>"+TXT("Allergie")+"</b></i><br>");
					for(let j in allergie){
						htmlProvv += '- ' +htmlEntities(allergie[j].NomeAllergia) +'<br>';
					}
				}
				if(htmlProvv)LOGIN.addHTML(htmlProvv+"<br>");

				htmlProvv = '';
				let patologie = JSON.parse(PZ.patologie);
				if(patologie.length>0){
					LOGIN.addHTML("<br><i><b>"+TXT("Patologie")+"</b></i><br>");
					for(let j in patologie){
						htmlProvv += '- ' +htmlEntities(patologie[j].NomePatologie) +'<br>';
					}
				}
				if(htmlProvv)LOGIN.addHTML(htmlProvv+"<br>");

				htmlProvv = '';
				let interventi = JSON.parse(PZ.interventi);
				if(interventi.length>0){
					LOGIN.addHTML("<br><i><b>"+TXT("Intervento")+"</b></i><br>");
					for(let j in interventi){
						htmlProvv += '- ' +htmlEntities(interventi[j].NomeIntervento) +'<br>';
					}
				}
				if(htmlProvv)LOGIN.addHTML(htmlProvv+"<br>");

				htmlProvv = '';
				if(PZ.NotePaziente)htmlProvv += "<i>"+TXT("Note")+":</i> "+htmlEntities(PZ.NotePaziente)+"</div>";
				if(htmlProvv)LOGIN.addHTML("<i><b>"+TXT("LabelAnnotazioni")+"</b></i><br>"+htmlProvv+"<br>");
	

				if(PZ.trattamenti.length>0){
					LOGIN.addHTML("<br><div>");
					
					
					let cicli=[],
						n=0;
					for(let i in PZ.trattamenti){
						esiste=false;
						for(let c in cicli){
							if(cicli[c].NomeCiclo==PZ.trattamenti[i].LabelCiclo)esiste=true;
						}
						if(!esiste)cicli[n++]={"NomeCiclo": PZ.trattamenti[i].LabelCiclo, "UltimaModifica": PZ.trattamenti[i].TimeTrattamento*1, "p": i*1 };
					}
					for(let c in cicli){
						for(let i in PZ.trattamenti){
							if(PZ.trattamenti[i].TimeTrattamento*1>cicli[c].UltimaModifica*1){
								cicli[c].UltimaModifica=PZ.trattamenti[i].TimeTrattamento*1;
							}
						}
					}
					cicli.sort(sort_by("ordine", false, parseInt));
					let vuoto=true;
					for(let c in cicli){
						vuoto=false;
						//let noName=false;
						NomeCiclo=cicli[c].NomeCiclo;
						if(NomeCiclo=='0' || NomeCiclo=='')NomeCiclo=TXT("CicloSenzaNome");
						
						let trattamenti=[];
						for(t in PZ.trattamenti){
							if(PZ.trattamenti[t].LabelCiclo==cicli[c].NomeCiclo && PZ.trattamenti[t].Cancellato!='1'){
								trattamenti.push(PZ.trattamenti[t]);
							}
						}
						trattamenti.sort(sort_by("TimeTrattamento" , false, parseInt));
						trattamenti.sort(sort_by("TipoTrattamento" ));
						
						LOGIN.addHTML("<h3><i style=\"font-weight:normal;color:#666;\">"+TXT("CicloTrattamenti")+":</i> "+NomeCiclo+"</h3><div class=\"rientro\">");
						let isCiclo = false;
						for(t in trattamenti){
							let oI=trattamenti[t].oraInizio,
								oF=trattamenti[t].oraFine,
								orario=txtOrario='';
							if(oI*1>0 || oF*1>0){
								if(oI.toString().indexOf(".")>-1){
									let pO=oI.toString().split(".");
									oI=pO[0]+":30";
								}else oI+=":00";
								if(oF.toString().indexOf(".")>-1){
									let pO=oF.toString().split(".");
									oF=pO[0]+":30";
								}else oF+=":00";
								orario=oI+"-"+oF;
								txtOrario=TXT("eOra");
							}
							
							let titoletto = TXT("ModificaTrattamento")+" "+((isCiclo)?(t*1):(t*1)+1);
							if(trattamenti[t].TipoTrattamento=='A'){
								titoletto = TXT("Anamnesi"+addShiatsu);
								isCiclo = true;
							}

							LOGIN.addHTML("<b class=\"tits\" style=\"color:#666;\">"+titoletto+"</b><br>");
							if(trattamenti[t].TimeTrattamento)LOGIN.addHTML("<i>"+TXT("Data")+txtOrario+": </i> "+getFullDataTS(trattamenti[t].TimeTrattamento)+" "+orario+"<br>");
							LOGIN.addHTML("<i>"+TXT("Titolo")+":</i> <b>"+trattamenti[t].TitoloTrattamento+"</b><br>");
							LOGIN.addHTML("<i>"+TXT("Costo")+":</i> <b>"+ArrotondaEuro(trattamenti[t].CostoTrattamento)+"</b><br>");
							let TT=trattamenti[t].TestoTrattamento;
							if(trattamenti[t].TipoTrattamento=='A'){
								//console.log(TT)
								if(TT){
									TT=JSON.parse(TT);
									if(TT.AnamnesiMotivo)LOGIN.addHTML("<i>"+TXT("AnamnesiMotivo"+addShiatsu)+":</i> "+TT.AnamnesiMotivo+"<br>");
									if(TT.AnamnesiDiagnosiOccidentale)LOGIN.addHTML("<i>"+TXT("AnamnesiDiagnosiOccidentale"+addShiatsu)+":</i> "+TT.AnamnesiDiagnosiOccidentale+"<br>");
									if(TT.AnamnesiDiagnosiMTC)LOGIN.addHTML("<i>"+TXT("AnamnesiDiagnosiMTC"+addShiatsu)+":</i> "+TT.AnamnesiDiagnosiMTC+"<br>");
								}
							}else{
								if(TT)LOGIN.addHTML("<i>"+TXT("Descrizione")+":</i> "+TT.replace(/\n/gi,"<br>")+"<br>");
							}
							
							let sintomi = JSON.parse(trattamenti[t].sintomi);
							if(sintomi.length==0 && trattamenti[t].LabelCiclo){
								sintomi = PAZIENTI.getSintomiCiclo(trattamenti[t].LabelCiclo,PZ.p);
							}
							if(sintomi.length>0){
								let txtSintomi='';
								for(let s in sintomi){
									txtSintomi+="- "+sintomi[s].NomeSintomo+" <b> (";
									if(sintomi[s].score>-1)txtSintomi+=sintomi[s].score;
									else txtSintomi+='-';
									txtSintomi+=")</b><br>";
								}
								txtSintomi=txtSintomi.substr(0,txtSintomi.length-2);
								LOGIN.addHTML("<i>"+TXT("Sintomi")+":</i> <div class=\"rientro\">"+txtSintomi+"<br></div><br>");
							}
							if(trattamenti[t].puntiMTC){
								let punti=JSON.parse(trattamenti[t].puntiMTC),
									txtPunti='';
								for(let f in punti){
									nPunto=punti[f].n;
									siglaMeridiano=punti[f].m;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									siglaPunto=__(punti[f].s);
									txtPunti+="<b><font color=\"#999999\">•</font> ";
									if(!siglaPunto)txtPunti+=siglaMeridiano+"."+nPunto;
									else txtPunti+=siglaPunto;
									txtPunti += "</b>";
									if(valutazione=='V')txtPunti+=' (vuoto)';
									if(valutazione=='P')txtPunti+=' (pieno)';
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo+' - ';
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+="<br>";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)LOGIN.addHTML("<i>"+TXT("PuntiTrattamento")+":</i> <div class=\"rientro\">"+txtPunti+"<br></div><br>");
							}
							if(trattamenti[t].puntiNamikoshi){
								let punti=JSON.parse(trattamenti[t].puntiNamikoshi),
									txtPunti='';
								for(let f in punti){
									siglaPunto=punti[f].s;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									txtPunti+="<b><font color=\"#999999\">•</font> "+siglaPunto+"</b>";
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo+' - ';
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+="<br>";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)LOGIN.addHTML("<i>"+TXT("PuntiNamikoshi")+":</i> <div class=\"rientro\">"+txtPunti+"<br></div><br>");
							}
							if(trattamenti[t].meridiani){
								let meridiani=JSON.parse(trattamenti[t].meridiani),
									txtMeridiani='';
								for(let m in meridiani){
									siglaMeridiano=meridiani[m].siglaMeridiano;
									NomeMeridiano=__(meridiani[m].NomeMeridiano);
									valEnergetica=__(meridiani[m].valEnergetica);
									descrizione=__(meridiani[m].descrizione);
									txtMeridiani+="<b><font color=\"#999999\">•</font> "+NomeMeridiano+"</b>";
									if(valEnergetica=='V')txtMeridiani+=' (vuoto)';
									if(valEnergetica=='P')txtMeridiani+=' (pieno)';
									if(valEnergetica=='D')txtMeridiani+=' (dolorante)';
									if(descrizione)txtMeridiani+=' '+descrizione;
									txtMeridiani+="<br>";
								}
								txtMeridiani=txtMeridiani.substr(0,txtMeridiani.length-2);
								if(txtMeridiani)LOGIN.addHTML("<i>"+TXT("MeridianiTrattamento")+":</i> <div class=\"rientro\">"+txtMeridiani+"<br></div><br>");
							}
							if(trattamenti[t].puntiAuricolari){
								let punti=JSON.parse(trattamenti[t].puntiAuricolari),
									txtPunti='';
								for(let f in punti){
									siglaPunto=punti[f].s;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									txtPunti+="<b><font color=\"#999999\">•</font> "+punti[f].n+"</b>";
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo+' - ';
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+="<br> ";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)LOGIN.addHTML("<i>"+TXT("PuntiAuriculo")+":</i> <div class=\"rientro\">"+txtPunti+"<br></div><br>");
							}
							if(trattamenti[t].puntiPlantari){
								let punti=JSON.parse(trattamenti[t].puntiPlantari),
									txtPunti='';
								for(let f in punti){
									siglaPunto=punti[f].s;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									txtPunti+="<b><font color=\"#999999\">•</font> "+punti[f].n+"</b>";
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo+' - ';
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+="<br> ";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)LOGIN.addHTML("<i>"+TXT("PuntiReflex")+":</i> <div class=\"rientro\">"+txtPunti+"<br></div><br>");
							}
							LOGIN.addHTML("<br>");
						}
						LOGIN.addHTML("</div>");
					}
					
					LOGIN.addHTML("</div>");
				}
				
				
				if(PZ.saldi.length>0){
					LOGIN.addHTML("<br><i>"+TXT("ElSaldi").toUpperCase()+":</i><br><div class=\"rientro\">");
					let saldi=JSON.parse(JSON.stringify(PZ.saldi));
					saldi.sort(sort_by("DataSaldo", true, parseInt ));
					for(let s in saldi){
						if(saldi[s].Cancellato!='1')LOGIN.addHTML("<i>"+getFullDataTS(saldi[s].DataSaldo)+"</i>: <b>"+getValuta()+" "+ArrotondaEuro(saldi[s].ValoreSaldo)+"</b><br>");
					}
					LOGIN.addHTML("</div>");
				}
				
				let note=[];
				for(let n in backup.note){
					if(	backup.note[n].TestoAnnotazione && 
						backup.note[n].idPaziente==PZ.idPaziente && 
						backup.note[n].Cancellato!='1'){
						note.push(backup.note[n]);
					}
				}
				
				if(note.length>0){
					LOGIN.addHTML("<br><i>"+TXT("ANNOTAZIONI")+":</i><br><div class=\"rientro\">");
					for(let n in note){
						LOGIN.addHTML("<b>"+note[n].meridiano+" "+note[n].numeroPunto+"</b>: "+note[n].TestoAnnotazione.replace(/\n/gi,"<br>")+"<br>");
					}
					LOGIN.addHTML("</div>");
				}
				
				LOGIN.addHTML("</div><br><hr>");
				
			}
		}
		LOGIN.addHTML("</div>");

		htmlProvv = '';
		for(let n in backup.procedure){
			if(backup.procedure[n].NomeProcedura && backup.procedure[n].Cancellato!='1'){
				htmlProvv += "<b class=\"tits\">"+backup.procedure[n].NomeProcedura+"</b><div class=\"rientro\">";
				htmlProvv += "<i>"+TXT("Data")+": </i> "+getFullDataTS(backup.procedure[n].DataCreazione)+"<br>";
				for(let d in backup.procedure[n].dettagliProcedura){
					let TD=backup.procedure[n].dettagliProcedura[d].TipoDettaglio;
					if(TD=='P')htmlProvv += "<i>"+TXT("Punti")+": </i>";
					if(TD=='M')htmlProvv += "<i>"+TXT("AggiungiMeridiano"+": </i>");
					if(TD=='T' || TD=='P' || TD=='M')htmlProvv += "<b>";
					let descrizione = backup.procedure[n].dettagliProcedura[d].DescrizioneDettaglio.replace(/\n/gi,"<br>");
					htmlProvv += descrizione;
					if(TD=='T' || TD=='P' || TD=='M')htmlProvv += "</b>";
					htmlProvv += "<br>";
				}
				htmlProvv += "<i>"+TXT("Condiviso")+": </i> ";
				if(backup.procedure[n].Condiviso=='1')htmlProvv += "<b>"+TXT("si")+"</b>";
				else htmlProvv += "<b>"+TXT("no")+"</b>";
				htmlProvv += "<br>";
				htmlProvv += "</div>";
				
				htmlProvv += "<hr>";
			}
		}
		if(htmlProvv)LOGIN.addHTML("<h1>"+TXT("PROCEDURE")+"</h1><div class=\"rientro\">"+htmlProvv+"</div>");
	
		htmlProvv = '';
		for(let n in backup.note){
			if(	backup.note[n].TestoAnnotazione && 
				backup.note[n].idPaziente==-1 && 
				backup.note[n].Cancellato!='1'){
					htmlProvv += "<b class=\"tits\">"+backup.note[n].meridiano+" "+backup.note[n].numeroPunto+"</b>: "+ backup.note[n].TestoAnnotazione.replace(/\n/gi,"<br>")+"<br>";
				
					htmlProvv += "<hr>";
			}
		}

		if(htmlProvv)LOGIN.addHTML("<h1>"+TXT("ANNOTAZIONI_GENERICO")+"</h1><div class=\"rientro\">"+htmlProvv+"</div>");

		LOGIN.download("dati personali "+getFullDataTS(data)+" ("+data+").htm",LOGIN.HTML);
	},
	addHTML: function(txt){
		LOGIN.HTML+=txt;
	},

	/* UPGRADE */
	showUpgradeBox: function(){ // mostra il box di UPGRADE quando gestito da API (per blocco su nuove versioni)
		if(document.getElementById("upgrade_box"))return;
		let dvUpdate = document.createElement('div');
		dvUpdate.id = 'upgrade_box';
		document.body.appendChild(dvUpdate);
		let html = '<div id=upgrade_content">'+stripslashes(TXT("UpgradeIntro"))+'<br><br>',
			txtClick = TXT("CliccaQui"),
			langWeb = (langWeb!='it' && langWeb!='en' && langWeb!='es') ? 'it' : LINGUE.getSigla2(),
			UA=navigator.userAgent,
			isMacUA = 0;
		if(UA.toLowerCase().indexOf("mac")>-1)isMacUA=1;
		if(android)html += stripslashes(TXT("UpgradeInfoAndroid")) + '<br><a id="upgrade_button" href="https://play.google.com/store/apps/details?id=app.iaomai.app&pli=1" target="_system">'+txtClick+'</a>';
		else if((iPad || iPhone || isMacUA) && touchable)html += stripslashes(TXT("UpgradeInfoApple"))+'<br><a id="upgrade_button" href="https://apps.apple.com/it/app/i%C3%A1omai/id1588705898?ign-mpt=uo%3D4" target="_system">'+txtClick+'</a>';
		else html += stripslashes(TXT("UpgradeInfoPC"))+'<br><a id="upgrade_button" href="https://www.iaomai.app/'+langWeb+'/iaomai/download.php" target="_blank">'+txtClick+'</a>';
		html += '</div>';
		document.getElementById("upgrade_box").innerHTML = html;
		localStorage.modello = '';
		localStorage.set= '';
		localStorage.open3d= 'false';
		localStorage.openMap= 'false';

	},

	/* MODULI */
	verAuth: function( n ){
		return DB.login.data.auths.indexOf(n)>-1;
	},
	verModule: function( n ){
		return DB.login.data.modls.indexOf(n)>-1;
	}
	
};
