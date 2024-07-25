var LOGIN = {
	retIni: false,
	logedout: false,
	connAssente: false,
	tmVerT: null,
	tmAttesaLogin: null,
	HTML: '',
	daSync: false,
	attesaVer: false,
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
				"rated": "",
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
	getDB: function( syncro = false ){ // carica i DB da pouch
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
				else{
					SYNCRO.globalSync();
					LOGIN.verAuthSet();
				}
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
		let url=convLangPath(CONN.linkReqPwd);
		if(isCordova)window.open(url,'_system');
		else window.open(url,'_blank');
	},
	swVisPwd: function( forza = false ){
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
	getLogin: function( p5 = '' ){ // avviato quando si preme il pulsante Accedi nel popup LOGIN
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
	autoLogin: function(){ // autologin quando si accede da WEBAPP e si è già loggati sul sito web
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
	setLogin: function(txt){ // la risposta di getLogin() e autoLogin()
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
			//if(__(jsn.nuova_versione_presente))LOGIN.showUpgradeBox();
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
			applicaLoading(document.querySelector(".listaAnnotazioni"));
			localStorage.RimaniConnesso = document.getElementById("stayConnected").checked;
			
			LOGIN.salvaToken(txt);
			LOGIN.tmAttesaLogin = 	setInterval( function(){
										if(LOGIN.logedin()){
											clearInterval(LOGIN.tmAttesaLogin);
											LOGIN.tmAttesaLogin = null;
											//DB._reset();
											if(!LOGIN.retIni)SYNCRO.globalSync(false,false,Nuovo);
											setTimeout(function(){LOGIN.scriviUtente();},1000);
											document.getElementById("login").classList.remove("popup_back");
											
											document.getElementById("notLogged").classList.remove("visSch");
											MENU.chiudiMenu();
											MODELLO.filtraAnatomia();
											try{ SET.filtraSet(); }catch(err){}
											PAZIENTI.deselPaziente();
											
											LOGIN.attesaVer = true;
											let auths = LOGIN.verMonoApp(),
												selSet = false;
											if(globals.set.cartella && !auths.length){
												/* let vSet = globals.set.cartella;
												scaricaSet();
												caricaSet(vSet); */
											}else{
												if(auths.length>1 && !__(localStorage.set)){
													selSet = true
												}
											}
											

											PAZIENTI.cancellaFiltri(true);
											SCHEDA.scaricaScheda();
											if(!selSet || !smartMenu){
												/*LOGIN.verSets();
												if(!globals.modello.cartella){
													inizio=true;
													caricaModello('donna');
												}*/
												LOGIN.verAuthSet();
											}else{
												MENU.visSplashMaps();
												LOGIN.attesaVer = false;
											}
											LOGIN.avviaVerToken();
											APP_RATING.update();
										}
									}, 500);
		}
	},
	verLogin: function( funct = '' ){ // verifica se si è loggati (solo all'inizio)
		localPouchDB.getItem(MD5("DB.login")).then(function(dbCont){ // leggo il DB
			let loginProvv = IMPORTER.DECOMPR(dbCont);
			if(loginProvv!=null){
				DB.login = loginProvv;
				localStorage.UniqueId = __(localStorage.UniqueId,LOGIN.getUniqueId());
				let dateStored=DB.login.data.ExpDate*1,
					dateNow = new Date();
				dateNow=dateNow.getTime()/1000;
				dateNow=parseInt(dateNow);
				LOGIN.attesaVer = true;
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
					//console.log("2")
					//if(!LOGIN.verSets()/*  && smartMenu */){
						
						/* if(LOGIN.verMonoApp().indexOf(localStorage.set)==-1){
							
						}else */
						/* if(!localStorage.modello)localStorage.modello = 'donna';
						caricaModello(localStorage.modello); */
					//}
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
				if(/* onlineVersion &&  */!LOGIN.logedin() && inizio){
					//console.log("MOSTRO LOGIN INIZIALE")
					// se è un'app installata e non ancora loggata e su smartphone
					// presento la schermata di login con opzioni iniziali
					MENU.visLogin(true);
				}
				APP_RATING.init();
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
		document.getElementById("icone").classList.toggle("noMaps",LOGIN.verMonoApp().length==0);
		//document.getElementById("js_interfaccia_modulo_customs_js").src = __(localStorage.customScript)?eval(atob(localStorage.customScript)):eval('CUSTOMS._init=function(){};CUSTOMS._end=function(){};CUSTOMS._conts={};');
	},
	attivaX: function(){ // attiva il pulsante X nel login
		let USRprovv = __(DB.login.data.UsernameU);
		if(USRprovv.trim()!=''){
			document.getElementById("USR").type='hidden';
			document.getElementById("USR").value=DB.login.data.UsernameU;
			document.getElementById("btnRegistrazione").style.display='none';
			document.getElementById("USRlabel").style.display="block";
			document.getElementById("USRlabel").getElementsByTagName("span")[0].innerHTML=DB.login.data.UsernameU;
		}else{
			document.getElementById("USR").type='text';
			document.getElementById("btnRegistrazione").style.display='block';
			document.getElementById("USRlabel").style.display="none";
			document.getElementById("USRlabel").getElementsByTagName("span")[0].innerHTML="";
		}
	},
	aggiornaToken: function( ret ){ // richiama l'url per aggiornare il token
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
	salvaToken: function( txt ){ // salva il TOKEN in DB.login
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
					SYNCRO.globalSync();
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
				//if(__(elenco.nuova_versione_presente))LOGIN.showUpgradeBox();
				if(__(elenco.upgrade_info,false))MENU.visFeatures();
				NOTIFICHE.aggiornaIcona(elenco.notificheDaleggere*1);
				if(LOGIN.connAssente){
					LOGIN.connAssente=false;
				}
				if(LOGIN.daSync)SYNCRO.globalSync();
				
				// se ci sono elementi modificati sincronizza
				if(__(elenco.modificati,false)){
					SYNCRO.sincronizza();
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
		if(globals.set.cartella){
			scaricaSet();
		}
		PAZIENTI.cancellaFiltri(true);
		SCHEDA.scaricaScheda();
		//if(smartMenu){
			scaricaModello();
			MENU.visLogin(true);
		//}
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
			if(globals.set.cartella){
				if(smartMenu)scaricaSet();
			}
			document.getElementById("btnRegistrazione").style.display="block";	
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
	
	verMonoApp: function(){
		let auths = [];
		for(a in DB.login.data.auths){
			if(DB.login.data.auths[a]!='anatomy_full' && DB.login.data.auths[a]!='clients_full')auths.push(DB.login.data.auths[a]);
		}
		return auths;
	},
	verSets: function(){
		let licenze = __(LOGIN.verMonoApp(),[]);
		if(licenze.length==1){
			let mono_app = licenze[0];
			localStorage.openMap = 'false';
			localStorage.open3d = 'false';
			localStorage.modello = sets[mono_app].modelli[0];
			localStorage.set = mono_app;
			globals.openMap = false;
			globals.open3d = false;
			globals.mapOpened = mono_app;
			document.getElementById("memorizzaOpen3d").style.display = 'none';
			document.getElementById("memorizzaOpenMap").style.display = 'none';
			setTimeout(function(){
				caricaSet(mono_app,document.getElementById("p_"+mono_app),sets[mono_app].modelli[0]);
			},700);
			return true;
		}else return false;
	},
	selMap: function( el ){
		if(el.classList.contains("nasMap"))return;
		let mappa = el.dataset.value;
		localStorage.set = mappa;
		localStorage.openMap = 'true';
		globals.set.cartella = mappa;
		MENU.chiudiMenu();
		LOGIN.verSets();
		inizio=true;
		if(!globals.modello.cartella){
			caricaModello('donna');
		}else{
			caricaSet(mappa);
		}

	},
	verAuthSet: function(){
		if(!LOGIN.attesaVer)return;
		if(inizio){
			let noOpen = !LOGIN.logedin() && smartMenu && inizio;
			if(localStorage.modello && globals.open3d && !getVar("demo") && !noOpen){}
			else if(globals.openMap && globals.mapOpened && !noOpen){}
			else{
				if(!getVar("demo")){
					setTimeout( function(){
						if(LOGIN.verMonoApp().length!=1 && !smartMenu && !__(localStorage.set))GUIDA.visFumetto("guida_generica");
					}, 1000 );
					if(mouseDetect && touchDetect && !__(localStorage.pointerType,"")){
						setTimeout( function(){
							ALERT(TXT("PointerTypeAlert")+"\n\n"+TXT("noVisPiu")+'<input type="checkbox" id="no_guida" name="no_guida" value="1" onclick="setPointerType((this.checked) ? \'TOUCH\' : \'\' );">' );
						}, 3000 );
					}
				}
			}
		}
		LOGIN.attesaVer = false;
		if(!__(localStorage.firstAccess)){
			if(smartMenu){
				localStorage.modello = 'donna';
				localStorage.open3d = 'true';
			}else{
				nasLoader();
			}
			/* localStorage.set = LOGIN.verMonoApp()[0];
			localStorage.openMap = 'true'; */
		}
		let licenze = __(LOGIN.verMonoApp(),[]);
		if(licenze.length==1){
			let mono_app = licenze[0];
			localStorage.openMap = 'false';
			localStorage.open3d = 'false';
			localStorage.modello = sets[mono_app].modelli[0];
			localStorage.set = mono_app;
			globals.openMap = false;
			globals.open3d = false;
			globals.mapOpened = mono_app;
			document.getElementById("memorizzaOpen3d").style.display = 'none';
			document.getElementById("memorizzaOpenMap").style.display = 'none';
		}
		if(LOGIN.verMonoApp().indexOf(localStorage.set)==-1){
			scaricaSet();
			localStorage.set = '';
		}
		if(LOGIN.verMonoApp().length){
			if(!__(localStorage.set) && smartMenu)localStorage.set = LOGIN.verMonoApp()[0];
			if(__(localStorage.set)){
				postApreSet = true;
				let modello = sets[localStorage.set].modelli[0];
				if(!smartMenu && !__(localStorage.modello))modello = '';
				caricaSet(localStorage.set,null,modello);
			}
		}
		if(!__(localStorage.set) || !LOGIN.verMonoApp().length){
			if(!__(localStorage.modello) && smartMenu)localStorage.modello = 'donna';
			if(__(localStorage.modello) && localStorage.open3d == 'true')caricaModello(localStorage.modello)
		}
		inizio = false;
	},
	
	// GESTIONE UTENTE
	registrazione: function(){ // registra l'utente su server
		if(CONN.retNoConn()){
			if(document.registrazioneForm.StatoRegistrazione.value==''){
				ALERT(TXT("selezionareValore").replace("[1]"," '"+TXT("Stato")+"' "));
				return;
			}
			if(document.registrazioneForm.PWD.value!=document.registrazioneForm.PWD2.value){
				ALERT(TXT("erroreRipetiPassword"));
				return;
			}
			if(verifica_form(document.registrazioneForm)){

				let JSNPOST={	"Nominativo": document.registrazioneForm.Cognome.value+" "+document.registrazioneForm.Nome.value,
								"Email": document.registrazioneForm.Email.value,
								"Telefono": document.registrazioneForm.Telefono.value,
								"USR": document.registrazioneForm.USR.value,
								"PWD": document.registrazioneForm.PWD.value,
								"Indirizzo": document.registrazioneForm.Indirizzo.value,
								"CAP": document.registrazioneForm.CAP.value,
								"Citta": document.registrazioneForm.Citta.value,
								"Provincia": document.registrazioneForm.Provincia.value,
								"Stato": document.registrazioneForm.StatoRegistrazione.value,
								"Professione": document.registrazioneForm.Professione.value,
								"Interessi": document.registrazioneForm.Interessi.value,
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
			document.getElementById("loader").classList.remove("overPopup");
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
							"LOGIN.car_utente" );
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
	deleteAvatar: function( n ){ // cancella l'avatar o il logo
		document.getElementById(n).getElementsByTagName('div')[0].style.backgroundImage="";
		SCHEDA.formModificato = true;
	},
	
	
	// GESTORE APERTURE
	verifyLocked: function( tab, n ){ // Verifica se l'elemento "n" della tabella "tab" è già stato aperto da un altro dispositivo e se non è aperto lo blocca
		if(n){
			SCHEDA.locked.tab = tab;
			SCHEDA.locked.idEl = n;
			CONN.caricaUrl(	"lockedVerifica.php",
							"tab=" +tab+"&idEl="+n,
							"LOGIN.manageLocked");
		}
	},
	manageLocked: function( txt ){ // risposta da verifyLocked: gestisce la chiusura della scheda in caso sia già aperto
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

	/* UPGRADE */
	checkNewVersion: function(){ // verifica online se c'è una nuova versione
		CONN.caricaUrl(	"check_new_version.php",
						"TK=D6G-w34rgV",
						"LOGIN.resNewVersion");
	},
	resNewVersion: function( res ){ // la risposta del check sulla nuova versione
		let jsn = JSON.parse(res);
		if(__(jsn.nuova_versione_presente))LOGIN.showUpgradeBox();
	},
	showUpgradeBox: function(){ // mostra il box di UPGRADE quando gestito da API (per blocco su nuove versioni)
		if(document.getElementById("upgrade_box"))return;
		let dvUpdate = document.createElement('div');
		dvUpdate.id = 'upgrade_box';
		document.body.appendChild(dvUpdate);
		let html = '<div id=upgrade_content">'+stripslashes(TXT("UpgradeIntro"))+'<br><br>',
			txtClick = TXT("ScaricaOra"),
			langWeb = LINGUE.getSigla2(),
			UA=navigator.userAgent,
			isMacUA = 0;
		
		if(langWeb=='pt')langWeb = 'it';
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
	verAuth: function( n ){ // verifica se si è in possesso di una licenza per una mappa
		return DB.login.data.auths.indexOf(n)>-1;
	},
	verModule: function( n ){ // verifica se si è in possesso di una licenza per un modulo
		return DB.login.data.modls.indexOf(n)>-1;
	}
	
};
