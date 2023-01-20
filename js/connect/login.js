
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
	getUniqueId: function(){
		var t = new Date().getTime()+"";
		var r = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000)+"";
		return(r+"-"+t);
	},
	_init: function(){
		DB.login={	"lastSync": 0,
			"data": {
				"idUtente": 0,
				"Nominativo": "",
				"UsernameU": "",
				"PasswordU:": "",
				"Pseudonimo": "",
				"Intestazione": "",
				"Stato": "",
				"CondizioniCommunity": 0,
				"Email": "",
				"ExpDate": 0,
				"TOKEN": "",
				"LastVer": CONN.VERSIONE,
				"imgAvatar": "",
				"logoAzienda": "",
				"auths": []
			}
		};
		localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login)).then(function(){ // salvo il DB
			//
		});
	},
	
	_frv: function(){
		var str = '';
		if(!LOGIN.logedin())str = 'frv';
		return str;
	},
	getDB: function( syncro ){
		if(typeof(syncro) == 'undefined')var syncro = false;
		localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".procedure")).then(function(dbCont){
			DB.procedure=IMPORTER.DECOMPR(dbCont);
			
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".note")).then(function(dbCont){
				DB.note=IMPORTER.DECOMPR(dbCont);
				
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".pazienti")).then(function(dbCont){
					DB.pazienti=IMPORTER.DECOMPR(dbCont);
					if(PAZIENTI.idCL == -1)PAZIENTI.caricaPazienti();
				
					localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".fornitori")).then(function(dbCont){
						DB.fornitori=IMPORTER.DECOMPR(dbCont);
						FORNITORI.caricaFornitori();
				
						localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".servizi")).then(function(dbCont){
							DB.servizi=IMPORTER.DECOMPR(dbCont);
							SERVIZI.caricaServizi();
				
							localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".appuntamenti")).then(function(dbCont){
								DB.appuntamenti=IMPORTER.DECOMPR(dbCont);
					
								localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".annotazioni")).then(function(dbCont){
									DB.annotazioni=IMPORTER.DECOMPR(dbCont);
									ANNOTAZIONI.caricaAnnotazioni();
						
									localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".ricerche")).then(function(dbCont){
										DB.ricerche=IMPORTER.DECOMPR(dbCont);
										
										localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".foto")).then(function(dbCont){
											DB.foto=IMPORTER.DECOMPR(dbCont);
												/*localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".appuntamenti")).then(function(dbCont){
												DB.appuntamenti=IMPORTER.DECOMPR(dbCont);
											
												localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".annotazioni")).then(function(dbCont){
													DB.annotazioni=IMPORTER.DECOMPR(dbCont);*/
													if(syncro){
														if(CONN.getConn())LOGIN.aggiornaToken(true);
														else LOGIN.globalSync();
													}
												/*});
											});*/
										});
									});
								});
							});
						});
					});
				});
			});
		});
	},
	resetDB: function(){
		localPouchDB.setItem(MD5("DB.procedure"), IMPORTER.COMPR(DB.procedure)).then(function(){ // salvo il DB
			localPouchDB.setItem(MD5("DB.note"), IMPORTER.COMPR(DB.note)).then(function(){ // salvo il DB
				localPouchDB.setItem(MD5("DB.pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
					localPouchDB.setItem(MD5("DB.fornitori"), IMPORTER.COMPR(DB.fornitori)).then(function(){ // salvo il DB
						localPouchDB.setItem(MD5("DB.servizi"), IMPORTER.COMPR(DB.servizi)).then(function(){ // salvo il DB
							localPouchDB.setItem(MD5("DB.appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)).then(function(){ // salvo il DB
								localPouchDB.setItem(MD5("DB.ricerche"), IMPORTER.COMPR(DB.ricerche)).then(function(){ // salvo il DB
									localPouchDB.setItem(MD5("DB.foto"), IMPORTER.COMPR(DB.foto)).then(function(){ // salvo il DB
									
									});
								});
							});
						});
					});
				});
			});
		});
	},
	
	
	getLS: function(k){
		if(typeof(DB.login)=='undefined'){
			localPouchDB.getItem(MD5("DB.login")).then(function(dbCont){ // leggo il DB
				DB.login=IMPORTER.DECOMPR(dbCont);
				return DB.login.data[k];
			});
		}else return DB.login.data[k];
	},
	setLS: function(k,v){
		DB.login.data[k]=v;
		localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login)).then(function(){ // salvo il DB
			//
		});
		return;
	},
	recuperaPwd: function(){
		var url='https://www.iaomai.app/account/requestpassword.php?l='+globals.siglaLingua.toLowerCase()+"&app="+tipoApp;
		if(window.cordova && window.cordova.platformId !== 'windows')window.open(url,'_system');
		else window.open(url,'_blank');
	},
	logedin: function(){
		var TOKEN=DB.login.data.TOKEN;
		if(typeof(TOKEN)=='undefined')TOKEN='';
		return TOKEN;
	},
	reg: function(){
		var idUtente=DB.login.data.idUtente;
		if(typeof(idUtente)=='undefined')idUtente='';
		return idUtente;
	},
	getOS: function() {
		var userAgent = window.navigator.userAgent,
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
	getDeviceInfo: function(){
		var device = {};
		/*if(!brw_firefox){
			device.platform = navigator.userAgentData.platform;
			if(navigator.userAgent.indexOf(device.platform)>-1){
				var re = new RegExp(device.platform+"[^;]+;","g");
				var matches = navigator.userAgent.match(re);
				if(matches.length)device.platform = matches[0].substr(0,matches[0].length-1);
			}
		}else if(typeof(navigator.oscpu)!='undefined'){
			device.platform = navigator.oscpu.split(";")[0];
		}else{
			device.platform = LOGIN.getOS();
		}*/
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
	getLogin: function(){
		// avviato quando si preme il pulsante Accedi nel popup LOGIN
		if(CONN.retNoConn() && document.getElementById("USR").value.trim()!='' && document.getElementById("PWD").value.trim()!=''){
			document.getElementById("login").classList.add("popup_back");
			document.loginFrom.PWD.blur();
			CONN.caricaUrl(	"login.php",
							"USR="+encodeURIComponent(document.loginFrom.USR.value)+
							"&PWD="+encodeURIComponent(document.loginFrom.PWD.value)+
							"&DVI="+encodeURIComponent(window.btoa(LOGIN.getDeviceInfo())),
							"LOGIN.setLogin");
		}
		return false;
	},
	setLogin: function(txt){
		// la risposta di getLogin()
		if(!txt || txt.substr(0,3)=='404'){
			if(!LOGIN.logedout){
				ALERT(TXT("ErroreLogin"));
			}else{
				LOGIN.logedout=false;
			}
			document.getElementById("login").classList.remove("popup_back");
			var USRprovv=DB.login.data.UsernameU;
			if(typeof(USRprovv)=='undefined')USRprovv='';
			document.getElementById("btnRecupero").style.display='block';
		}else{
			var jsn = JSON.parse(txt);
			var Nuovo = jsn.data.Nuovo;
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
												var vSet = globals.set.cartella;
												scaricaSet();
												caricaSet(vSet);
											}
											PAZIENTI.cancellaFiltri(true);
											SCHEDA.scaricaScheda();
										}
									}, 500);
		}
	},
	verLogin: function( funct ){ // verifica se si è loggati
		if(typeof(funct) == 'undefined')var funct = '';
		localPouchDB.getItem(MD5("DB.login")).then(function(dbCont){ // leggo il DB
			loginProvv=IMPORTER.DECOMPR(dbCont);
			if(loginProvv!=null){
				DB.login=loginProvv;
				localStorage.UniqueId = __(localStorage.UniqueId,LOGIN.getUniqueId());
				var dateStored=DB.login.data.ExpDate*1;
				var dateNow = new Date();
				dateNow=dateNow.getTime()/1000;
				dateNow=parseInt(dateNow);
				if((dateStored<dateNow || dateStored==0 || isNaN(dateStored))){
					if(!LOGIN.logedin()){
						DB.login.data.TOKEN='';
						DB.login.data.ExpDate=0;
						if(!DB.login.data.auths)DB.login.data.auths = [];
						if(typeof(DB.login.data)=='undefined')DB.login.data.auths=[];
						LOGIN.getDB();
					}
				}else{
					LOGIN.getDB(true);
					MENU.visFeatures();
				}
				LOGIN.scriviUtente();
				if(funct)eval(funct);
			}
		});
	},
	scriviUtente: function(){ // scrive il nome utente nel menu impostazioni
		var NN=LOGIN.getLS("Nominativo");
		var EE=LOGIN.getLS("Email");
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
			document.getElementById("loginGuida").style.display = 'none';
			document.getElementById("notLogged").classList.remove("visSch");
		}else{
			if(NN){
				document.getElementById("utDisc").style.display = 'block';
				document.getElementById("btn_login").classList.add("btn_login_mini");
				document.getElementById("btn_login").title='LOGIN';
				document.getElementById("loginGuida").style.display = 'none';
			}else{
				document.getElementById("p_reg").style.display = 'block';
				document.getElementById("utDisc").style.display = 'none';
				NN=TXT("NessunUtente");
				document.getElementById("btn_modut").style.display = 'none';
				document.getElementById("loginGuida").style.display = 'block';
			}
			document.getElementById("p_cartella").classList.remove("clientAtt");
			document.getElementById("btn_login").style.display = 'inline-block';
			document.getElementById("btn_logout").style.display = 'none';
			document.getElementById("notLogged").classList.add("visSch");
		}
		document.getElementById("nomeUtente").innerHTML=NN;
	},
	attivaX: function(){ // attiva il pulsante X nel login
		var USRprovv=DB.login.data.UsernameU;
		if(typeof(USRprovv)=='undefined')USRprovv='';
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
	aggiornaToken: function(ret){
		LOGIN.retIni=ret;
		if(CONN.getConn()){
			CONN.caricaUrl(	"testauth.php",
							"",
							"LOGIN.salvaToken");
			return false;
		}
	},
	salvaToken: function(txt){
		if(txt.substr(0,3)!='404'){
			localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(JSON.parse(txt))).then(function(){ // salvo il DB
				//
				DB.login=JSON.parse(txt);
				MODELLO.filtraAnatomia();
				try{ SET.filtraSet(); }catch(err){}
				if(LOGIN.retIni){
					LOGIN.retIni=false;
					LOGIN.globalSync();
					LOGIN.scriviUtente();
				}
			});
		}else LOGIN.logout();
	},
	verificaToken: function(){ // verifico il Token e le notifiche
		// Verifico che il token sia valido
		if(CONN.getConn() && LOGIN.logedin()){
			// se c'è connessione e ho il TOKEN
			
			// invio di dati di sincro per verificare modifiche
			var JSNPOST = {
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
			for(p in DB.pazienti.data){
				if(DB.pazienti.data[p].DataModifica>DB.pazienti.lastSync)LOGIN.daSync=true;
				for(t in DB.pazienti.data[p].trattamenti){
					if(DB.pazienti.data[p].trattamenti[t].DataModifica>DB.pazienti.lastSync)LOGIN.daSync=true;
				}
				for(t in DB.pazienti.data[p].saldi){
					if(DB.pazienti.data[p].saldi[t].DataModifica>DB.pazienti.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.fornitori){
				for(p in DB.fornitori.data){
					if(DB.fornitori.data[p].DataModifica>DB.fornitori.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.servizi){
				for(p in DB.servizi.data){
					if(DB.servizi.data[p].DataModifica>DB.servizi.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.appuntamenti){
				for(p in DB.appuntamenti.data){
					if(DB.appuntamenti.data[p].DataModifica>DB.appuntamenti.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.annotazioni){
				for(p in DB.annotazioni.data){
					if(DB.annotazioni.data[p].DataModifica>DB.annotazioni.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.procedure){
				for(p in DB.procedure.data){
					if(DB.procedure.data[p].DataModifica>DB.procedure.lastSync)LOGIN.daSync=true;
				}
			}
			if(DB.note){
				for(p in DB.note.data){
					if(DB.note.data[p].DataModifica>DB.note.lastSync)LOGIN.daSync=true;
				}
			}
		}
	},
	avviaVerToken: function(){
		// Avvia la verifica del TOKEN ogni 10 secondi
		tmVerT=setInterval(function(){LOGIN.verificaToken()},10000); // verifico ogni 10 secondi
	},
	resToken: function(txt){
		// Risposta dalla verifica del TOKEN
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
				
				if(__(elenco.upgrade_info,false))MENU.visFeatures();
				NOTIFICHE.aggiornaIcona(elenco.notificheDaleggere*1);
				if(LOGIN.connAssente){
					LOGIN.connAssente=false;
				}
				if(LOGIN.daSync)LOGIN.globalSync();
				
				// re ci sono elementi modificati sincronizza
				if(__(elenco.modificati,false)){
					LOGIN.sincronizza()
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
	annullaUtente: function(){
		// cancella tutti i dati utente in locale
		CONFIRM.vis(	TXT("ChiediAnnullaUtente")+'<br>'+
						TXT("AttenzioneAnnullaUtente") ).then(function(pass){if(pass){
		
			MENU.chiudiAllSelected();
			//if(globals.set.cartella)caricaSet(globals.set.cartella,document.getElementById('p_'+globals.set.cartella));
			//localPouchDB.clear();
			setTimeout( function(){
				localPouchDB.setItem(MD5("FILES"), IMPORTER.COMPR(JSON.stringify(FILES))).then(function(){
					// salvo il DB
				});
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
	decryptPrivacy: function(txt){		
		if(txt.substr(0,3)=='[@]')txt=LZString.decompressFromUTF16(txt.substr(3,txt.length-3));
		return txt;
	},
	cryptPrivacy: function(txt,i){		
		if(	i!='meridiano' && 
			i!='TipoDettaglio' && 
			i!='TipoTrattamento' && 
			i!='PseudonimoN' && 
			i!='TestoRicerca' && 
			i!='sesso' && 
			i!='prefRic' && 
			i!='parolaRic' && 
			i!='sintomi' && 
			i!='meridiani' && 
			i!='avatar' && 
			i!='gallery' && 
			i!='p' && 
			i!='ordine' && 
			i!='Stato' && 
			i!='DataNascita' && 
			i!='paeseCellulare' &&
			i!='id_interno' &&
			i!='numeroTsubo' &&
			i!='app'){
			if(typeof(txt)=='string' && txt!='')txt='[@]'+LZString.compressToUTF16(txt);
		}
		return txt;
	},
	cryptJSON: function(el){
		// CRYPRT per la PRIVACY: carica i dati testuali criptati sul server
		var dbCAR=clone(el);
		for(i in dbCAR){
			if(typeof(dbCAR[i])!='object'){
				dbCAR[i]=LOGIN.cryptPrivacy(dbCAR[i],i);
			}else{
				for(i2 in dbCAR[i]){
					if(typeof(dbCAR[i][i2])!='object'){
						dbCAR[i][i2]=LOGIN.cryptPrivacy(dbCAR[i][i2],i2);
					}else{
						for(i3 in dbCAR[i][i2]){
							dbCAR[i][i2][i3]=LOGIN.cryptPrivacy(dbCAR[i][i2][i3],i3);
						}
					}
				}
			}
		}
		dbCARstr=JSON.stringify(dbCAR);
		while(dbCARstr.indexOf(H.chr10)>-1)dbCARstr=dbCARstr.replace(H.chr10,'');
		// ------------------------------------------------------------------	
		return dbCARstr;	
	},
	
	
	// GESTIONE UTENTE
	registrazione: function(){
		// registra l'utente su server
		if(CONN.retNoConn()){
			if(verifica_form(document.registrazioneForm)){

				var JSNPOST={	"Nominativo": document.registrazioneForm.Nominativo.value,
								"Email": document.registrazioneForm.Email.value,
								"USR": document.registrazioneForm.USR.value,
								"PWD": document.registrazioneForm.PWD.value,
								"app": document.registrazioneForm.app.value,
								"siglaLingua": globals.siglaLingua };
								
				console.log(JSNPOST)
				document.getElementById("registrazione").classList.add("popup_back");
				CONN.caricaUrl(	"utente_registrazione.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								"LOGIN.retRegistrazione");	
			}
		}
	},
	retRegistrazione: function( txt ){
		// risposta dalla registrazione utente sul server (registrazione)
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
		}
		document.getElementById("registrazione").classList.remove("popup_back");
		return;
	},
	modUtente: function(){
		// scarica le modifiche dell'utente dal server
		if(!LOGIN.logedin()){
			ALERT(TXT("ErroreUtenteNonConnesso"), true);
			return;
		}
		if(CONN.retNoConn()){
			
			var btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'feature.login\')">' +
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
			applicaLoading(document.getElementById("scheda_testo"));
			MENU.chiudiMenu();
			
			var btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'feature.login\')">' +
								TXT("ReferenceGuide") +
							'</div>';
							
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
	car_utente: function( txt ){
		/*
		- risposta dallo scaricamento dati utente (modUtente)
		- carica i dati dell'utente nella scheda
		*/
		if(typeof(txt)=='undefined')var txt = '';
		if(txt.substr(0,3)=='404'){
			
		}else{
			CONFIRM.vis(	TXT("UscireSenzaSalvare"),
							!SCHEDA.verificaSchedaRet(),
							arguments ).then(function(pass){if(pass){
							var v = getParamNames(CONFIRM.args.callee.toString());
							for(i in v)eval(getArguments(v,i));
							
				rimuoviLoading(document.getElementById("scheda_testo"));
				var UT = JSON.parse(txt);
				
				var DataNascita = 0;
				if(UT.DataNascita!='0000-00-00')DataNascita = new Date(UT.DataNascita);
				
				var HTML = '';
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
				
					console.log(UT.logoAzienda)
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
				HTML += '	<div class="l"></div>';
				
				HTML += SCHEDA.pulsantiForm(
										"",
										"SCHEDA.scaricaScheda();", 
										"if(H.verData(\'DataNascita\'))LOGIN.mod_utente();" );
				
				HTML += '</form>';
				
				var btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'feature.login\')">' +
									TXT("ReferenceGuide") +
								'</div>';
				
				SCHEDA.caricaScheda(	stripslashes(TXT("ModificaUtente")),
										HTML,
										'',
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
	mod_utente: function(){
		// salva i dati dell'utente e li carica sul server
		if(!verifica_form(document.getElementById("formMod")))return;
		stopAnimate(true);
		visLoader(TXT("SalvataggioInCorso"),'loadingLight');
		var postAction = '';
		
		var imgAvatar = document.getElementById("avatarUtente").getElementsByTagName("div")[0].style.backgroundImage;
		if(imgAvatar)imgAvatar = imgAvatar.split(imgAvatar[4])[1].replace(location.origin+location.pathname,'');
		if(typeof(imgAvatar) == 'undefined')imgAvatar = '';
		
		var logoAzienda = document.getElementById("logoAzienda").getElementsByTagName("div")[0].style.backgroundImage;
		if(logoAzienda)logoAzienda = logoAzienda.split(logoAzienda[4])[1];
		if(typeof(logoAzienda) == 'undefined')logoAzienda = '';
		
		var aaaa = document.formMod.annoDataNascita.value;
		var mm = document.formMod.meseDataNascita.value;
		var gg = document.formMod.giornoDataNascita.value;
		if(aaaa.length<4){
			var l = aaaa.length;
			for(n=l;n<4;n++)aaaa='0'+aaaa;
		}
		if(mm.length<2){
			var l = mm.length;
			for(n=l;n<2;n++)mm='0'+mm;
		}
		if(gg.length<2){
			var l = gg.length;
			for(n=l;n<2;n++)gg='0'+gg;
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
	retModUtente: function( txt ){
		// risposta dal caricamento dell'utente (mod_utente)
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
			var UT = JSON.parse(txt);
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
	salvaAvatar: function( obj, n ){
		// sostituisce l'avatar provvisorio nella scheda
		if(typeof(n) == 'undefined')var n = 'avatarUtente';
		obj = JSON.parse(obj);
		document.getElementById(n).getElementsByTagName('div')[0].style.backgroundImage="url('"+obj.imgMini+"')";
		SCHEDA.formModificato = true;
	},
	salvaLogo: function( obj ){
		// sostituisce il logo aziendale provvisorio nella scheda
		LOGIN.salvaAvatar( obj, 'logoAzienda');
	},
	deleteAvatar: function( n ){
		// cancella l'avatar o il loso
		document.getElementById(n).getElementsByTagName('div')[0].style.backgroundImage="";
		SCHEDA.formModificato = true;
	},
		
				
	// SINCRONIZZAZIONE
	sincronizza: function(funct, bkp){
		// sincronizza i DB locali con quelli remoti (quando modifico)
		if(typeof(bkp)=='undefined')var bkp=false;
		DB.verDbSize();
		if(typeof(funct)!='undefined')LOGIN.afterFunct=funct;
		else if(!LOGIN.afterFunct)LOGIN.afterFunct=null;
		
		if(CONN.getConn() && LOGIN.logedin()!=''){
			LOGIN.globalSync( false, bkp );
		}else if(LOGIN.afterFunct){
			eval(LOGIN.afterFunct);
			LOGIN.afterFunct = null;
		}
	},
	globalSync: function(dwnl, bkp, Nuovo){
		// sincro globale up e down
		if(typeof(dwnl)=='undefined')var dwnl=false;
		if(typeof(bkp)=='undefined')var bkp=false;
		if(typeof(Nuovo)=='undefined')var Nuovo=false;
		// da controllare all'avvio dell'app e ogni volta che riprende la connessione
		// invio i lastSync delle tabelle
		if(CONN.getConn() || dwnl){
			LOGIN.totSinc = 0;
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".note")).then(function(dbCont){ // leggo il DB NOTE
				DB.note=IMPORTER.DECOMPR(dbCont);
				LOGIN.totSinc++;
				localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".procedure")).then(function(dbCont){ // leggo il DB PROCEDURE
					DB.procedure=IMPORTER.DECOMPR(dbCont);
					LOGIN.totSinc++;
					localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".pazienti")).then(function(dbCont){ // leggo il DB PAZIENTI
						DB.pazienti=IMPORTER.DECOMPR(dbCont);
						LOGIN.totSinc++;
						localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".fornitori")).then(function(dbCont){ // leggo il DB FORNITORI
							DB.fornitori=IMPORTER.DECOMPR(dbCont);
							LOGIN.totSinc++;
							localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".servizi")).then(function(dbCont){ // leggo il DB SERVIZI
								DB.servizi=IMPORTER.DECOMPR(dbCont);
								LOGIN.totSinc++;
								localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".appuntamenti")).then(function(dbCont){ // leggo il DB SERVIZI
									DB.appuntamenti=IMPORTER.DECOMPR(dbCont);
									LOGIN.totSinc++;
									localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".annotazioni")).then(function(dbCont){ // leggo il DB SERVIZI
										DB.annotazioni=IMPORTER.DECOMPR(dbCont);
										LOGIN.totSinc++;
										localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".ricerche")).then(function(dbCont){ // leggo il DB RICERCHE
											DB.ricerche=IMPORTER.DECOMPR(dbCont);
											LOGIN.totSinc++;
											localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".foto")).then(function(dbCont){ // leggo il DB FOTO
											
												DB.foto=IMPORTER.DECOMPR(dbCont);
												//LOGIN.totSinc++; /* le foto non contano perché sono solo in upload */
												var elenco='';
												
												if(Nuovo){ // se è un account nuovo popolo i DB con quelli DEMO
													DB.pazienti.data = DB.pulisciFRV(archiviDemo.pazienti);
													DB.fornitori.data = DB.pulisciFRV(archiviDemo.fornitori);
													DB.servizi.data = DB.pulisciFRV(archiviDemo.servizi);
													DB.foto.data = DB.pulisciFRV(archiviDemo.foto);
												}
												
												elencoFoto='';
												for(k in DB.foto.data){
													if(DB.foto.data[k]){
														if(	!__(DB.foto.data[k].frv) && 
															__(DB.foto.data[k].imgBig) && 
															DB.foto.data[k].imgBig!='404'){
																elencoFoto+=JSON.stringify(DB.foto.data[k])+", ";
															}
													}
												}
												if(elencoFoto)elenco+='"foto": ['+elencoFoto.substr(0,elencoFoto.length-2)+'], ';
												
												elencoRicerche='';
												for(k in DB.ricerche.data){
													if(DB.ricerche.data[k].DataModifica*1>DB.ricerche.lastSync*1 || dwnl || bkp){
														elencoRicerche+=JSON.stringify(DB.ricerche.data[k])+", ";
													}
												}
												if(elencoRicerche)elenco+='"ricerche": ['+elencoRicerche.substr(0,elencoRicerche.length-2)+'], ';
												elencoNote='';
												for(k in DB.note.data){
													if(DB.note.data[k].DataModifica*1>DB.note.lastSync*1 || dwnl || bkp){
														elencoNote+=LOGIN.cryptJSON(DB.note.data[k])+", ";
													}
												}
												if(elencoNote)elenco+='"note": ['+elencoNote.substr(0,elencoNote.length-2)+'], ';		
												elencoProcedure='';
												for(k in DB.procedure.data){
													if(DB.procedure.data[k].DataModifica*1>DB.procedure.lastSync*1 || dwnl || bkp){
														DB.procedure.data[k].id_interno=k;
														elencoProcedure+=JSON.stringify(DB.procedure.data[k])+", ";
													}
												}
												if(elencoProcedure)elenco+='"procedure": ['+elencoProcedure.substr(0,elencoProcedure.length-2)+'], ';
												
												
												
												
												elencoAppuntamenti='';
												for(k in DB.appuntamenti.data){
													var db={ 	"idAppuntamento": DB.appuntamenti.data[k].idAppuntamento*1,
																"TestoAppuntamento": DB.appuntamenti.data[k].TestoAppuntamento,
																"TimeAppuntamento": DB.appuntamenti.data[k].TimeAppuntamento*1,
																"oraInizio": DB.appuntamenti.data[k].oraInizio*1,
																"oraFine": DB.appuntamenti.data[k].oraFine*1,
																"idPaziente": DB.appuntamenti.data[k].idPaziente*1,
																"idCli": DB.appuntamenti.data[k].idCli*1,
																"DataModifica":DB.appuntamenti.data[k].DataModifica*1,
																"DataCreazione":DB.appuntamenti.data[k].DataCreazione*1,
																"Cancellato": DB.appuntamenti.data[k].Cancellato*1 };
																
													var aggiungere=false;
													
													if((DB.appuntamenti.data[k].DataModifica*1>DB.appuntamenti.lastSync*1 || dwnl || bkp) && !__(DB.appuntamenti.data[k].frv))aggiungere=true;
													if(aggiungere){
														elencoAppuntamenti+=LOGIN.cryptJSON(db)+", ";
													}
												}
												if(elencoAppuntamenti)elenco+='"appuntamenti": ['+elencoAppuntamenti.substr(0,elencoAppuntamenti.length-2)+'], ';
												
												elencoAnnotazioni='';
												for(k in DB.annotazioni.data){
													var db={ 	"idAnnotazione": DB.annotazioni.data[k].idAnnotazione*1,
																"TitoloAnnotazione": DB.annotazioni.data[k].TitoloAnnotazione,
																"TestoAnnotazione": DB.annotazioni.data[k].TestoAnnotazione,
																"DataModifica":DB.annotazioni.data[k].DataModifica*1,
																"DataCreazione":DB.annotazioni.data[k].DataCreazione*1,
																"Cancellato": DB.annotazioni.data[k].Cancellato*1 };
													
													var aggiungere=false;
													
													if((DB.annotazioni.data[k].DataModifica*1>DB.annotazioni.lastSync*1 || dwnl || bkp) && !__(DB.annotazioni.data[k].frv))aggiungere=true;
													if(aggiungere){
														elencoAnnotazioni+=LOGIN.cryptJSON(db)+", ";
													}
												}
												if(elencoAnnotazioni)elenco+='"annotazioni": ['+elencoAnnotazioni.substr(0,elencoAnnotazioni.length-2)+'], ';
												
												elencoServizi='';
												for(k in DB.servizi.data){
													var db={ 	"idServizio": DB.servizi.data[k].idServizio*1,
																"NomeServizio": DB.servizi.data[k].NomeServizio,
																"DescrizioneServizio": DB.servizi.data[k].DescrizioneServizio,
																"CostoServizio": DB.servizi.data[k].CostoServizio*1,
																"NumeroSedute": DB.servizi.data[k].NumeroSedute*1,
																"DataModifica":DB.servizi.data[k].DataModifica*1,
																"DataCreazione":DB.servizi.data[k].DataCreazione*1,
																"Cancellato": DB.servizi.data[k].Cancellato*1 };
													
													var aggiungere=false;
													
													if((DB.servizi.data[k].DataModifica*1>DB.servizi.lastSync*1 || dwnl || bkp) && !__(DB.servizi.data[k].frv))aggiungere=true;
													if(aggiungere){
														elencoServizi+=LOGIN.cryptJSON(db)+", ";
													}
												}
												if(elencoServizi)elenco+='"servizi": ['+elencoServizi.substr(0,elencoServizi.length-2)+'], ';
												
												
												elencoFornitori='';
												for(k in DB.fornitori.data){
													var db={ 	"idFornitore": DB.fornitori.data[k].idFornitore*1,
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
													
													var aggiungere=false;
													
													if((DB.fornitori.data[k].DataModifica*1>DB.fornitori.lastSync*1 || dwnl || bkp) && !__(DB.fornitori.data[k].frv))aggiungere=true;
													if(aggiungere){
														elencoFornitori+=LOGIN.cryptJSON(db)+", ";
													}
												}
												if(elencoFornitori)elenco+='"fornitori": ['+elencoFornitori.substr(0,elencoFornitori.length-2)+'], ';
												elencoPazienti='';
												for(k in DB.pazienti.data){
													var db={ 	"idPaziente": DB.pazienti.data[k].idPaziente*1,
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
																"gallery": DB.pazienti.data[k].gallery,
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
													
													var aggiungere=false;
													
													db.trattamenti=[];
													var n=-1;
													var aggiungereTrattamenti=false;
													var elencoTrattamenti=[];
													for(t in DB.pazienti.data[k].trattamenti){
														if(DB.pazienti.data[k].trattamenti[t].DataModifica*1>DB.pazienti.lastSync*1 || dwnl || bkp){
															DB.pazienti.data[k].trattamenti[t].id_interno=t*1;
															n++;elencoTrattamenti[n]=DB.pazienti.data[k].trattamenti[t];
															aggiungereTrattamenti=true;
														}
													}
													if(aggiungereTrattamenti && !__(DB.pazienti.data[k].frv)){
														db.trattamenti=elencoTrattamenti;
														aggiungere=true;
													}
													
													db.saldi=[];
													var n=-1;
													var aggiungereSaldi=false;
													var elencoSaldi=[];
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
														elencoPazienti+=LOGIN.cryptJSON(db)+", ";
													}
												}
												if(elencoPazienti)elenco+='"pazienti": ['+elencoPazienti.substr(0,elencoPazienti.length-2)+'], ';
												if(elenco)elenco='{'+elenco.substr(0,elenco.length-2)+'}';	
											
												if(typeof(DB.note)=='undefined'){
													DB.note=[];
													localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note)).then(function(){
														// salvo il DB
													});
												}
												if(typeof(DB.procedure)=='undefined'){
													DB.procedure=[];
													localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure)).then(function(){
														// salvo il DB
													});
												}
												if(typeof(DB.servizi)=='undefined'){
													DB.servizi=[];
													localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi)).then(function(){
														// salvo il DB
													});
												}	
												if(typeof(DB.fornitori)=='undefined'){
													DB.fornitori=[];
													localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)).then(function(){
														// salvo il DB
													});
												}	
												if(typeof(DB.pazienti)=='undefined'){
													DB.pazienti=[];
													localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){
														// salvo il DB
													});
												}	
												if(typeof(DB.ricerche)=='undefined'){
													DB.ricerche=[];
													localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche)).then(function(){
														// salvo il DB
													});
												}
												if(typeof(DB.foto)=='undefined'){
													DB.foto=[];
													localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".foto"), IMPORTER.COMPR(DB.foto)).then(function(){
														// salvo il DB
													});
												}	
												if(typeof(DB.cicli)=='undefined'){
													DB.cicli=[];
													DB.cicli.lastSync=0;
													localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".cicli"), IMPORTER.COMPR(DB.cicli)).then(function(){
														// salvo il DB
													});
												}
												syncJSN='{';
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
												if(!dwnl){
													CONN.caricaUrl(	"sincro_globale_2_6.php",
																	"b64=1&JSNPOST="+window.btoa(encodeURIComponent(syncJSN)), 
																	"LOGIN.retGlobalSyncro");
												}else{
													var dateNow = new Date();
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
										});
									});
								});
							});
						});
					});
				});
			});
		}
	},
	retGlobalSyncro: function( txt ){
		// chiamato da "globalSync" o da "ripristinaBackup"
		if(txt.substr(0,3)+""=='404'){
			if(debug)console.log(txt);
			return;
		}
		if(SCHEDA.btnSel)SCHEDA.btnSel_id = SCHEDA.btnSel.id;
		nSinc=0;
		var syncUp=false;
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
			for(p in elenco.ricerche){
				// per ogni novità verifico l'esistenza
				esiste=false;
				JSNPUSH={	"TestoRicerca": elenco.ricerche[p].TestoRicerca,
							"DataModifica": elenco.ricerche[p].DataModifica*1 };
				for(k in DB.ricerche.data){
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
			
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".ricerche"), IMPORTER.COMPR(DB.ricerche)).then(function(){ // salvo il DB
				LOGIN.verSincro('ricerche');
			});
		}else LOGIN.verSincro('ricerche');
	
					console.log("SINCRO")	
		// NOTE
		if(elenco.note){
			syncUp=true;
			for(p in elenco.note){
				// per ogni novità verifico l'esistenza
				passato=false;
				var id_interno=-1;
				if(BACKUPS.bkpProvv)elenco.note[p].DataModifica = lastSync*1;
				JSNPUSH={	"TestoAnnotazione": LOGIN.decryptPrivacy(elenco.note[p].TestoAnnotazione),
							"meridiano": elenco.note[p].meridiano,
							"numeroTsubo": elenco.note[p].numeroTsubo+'',//*1,
							"idPaziente": elenco.note[p].idPaziente*1,
							"idCL": id_interno,
							"app": __(elenco.note[p].app,''),
							"DataModifica": elenco.note[p].DataModifica*1 };
					console.log(JSNPUSH)		
				for(k in DB.note.data){
					var NT = DB.note.data[k];
					if(	NT.meridiano==elenco.note[p].meridiano && 
						NT.numeroTsubo+''==elenco.note[p].numeroTsubo+'' && 
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
				for(k in DB.note.data){
					var trovato = false;
					var NT = DB.note.data[k];
					for(p in elenco.note){
						/*
							se sto ripristinando un backup
							se non trovo l'elemento del DB locale nel DB backuppato
							oppure non è mai stato backuppato
							cancello l'elemento locale
						*/
						if(	NT.meridiano==elenco.note[p].meridiano && 
							NT.numeroTsubo+''==elenco.note[p].numeroTsubo+'' && 
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
			for(p in elenco.procedure){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.procedure[p].DataModifica = lastSync*1;
				JSNPUSH={	"idProcedura": elenco.procedure[p].idProcedura*1,
							"idLinguaProcedura": elenco.procedure[p].idLinguaProcedura*1,
							"gallery": elenco.procedure[p].gallery,
							"NomeProcedura": elenco.procedure[p].NomeProcedura,
							"DataModifica": elenco.procedure[p].DataModifica*1,
							"DataCreazione": elenco.procedure[p].DataCreazione*1,
							"Condiviso": elenco.procedure[p].Condiviso*1,
							"app": __(elenco.procedure[p].app,''),
							"dettagliProcedura": elenco.procedure[p].dettagliProcedura,
							"Cancellato": elenco.procedure[p].Cancellato*1,
							"frv": false };
				
				for(k in elenco.procedure[p].dettagliProcedura){
					elenco.procedure[p].dettagliProcedura[k].DataModifica*=1;
					elenco.procedure[p].dettagliProcedura[k].OrdineDettaglio*=1;
					elenco.procedure[p].dettagliProcedura[k].Cancellato*=1;
				}
				
				for(k in DB.procedure.data){
					var PR = DB.procedure.data[k];
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
				for(k in DB.procedure.data){
					var trovato = false;
					var PR = DB.procedure.data[k];
					for(p in elenco.procedure){
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
			for(p in elenco.servizi){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.servizi[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idServizio": elenco.servizi[p].idServizio*1,
							"NomeServizio": LOGIN.decryptPrivacy(elenco.servizi[p].NomeServizio)+"",
							"DescrizioneServizio": LOGIN.decryptPrivacy(elenco.servizi[p].DescrizioneServizio)+"",
							"CostoServizio": elenco.servizi[p].CostoServizio*1,
							"NumeroSedute": elenco.servizi[p].NumeroSedute*1,
							"DataModifica": elenco.servizi[p].DataModifica*1,
							"DataCreazione": elenco.servizi[p].DataCreazione*1,
							"Cancellato": elenco.servizi[p].Cancellato*1,
							"frv": false };
				
				for(k in DB.servizi.data){
					var SR = DB.servizi.data[k];
					if(	( SR.idServizio*1>0 && SR.idServizio*1==elenco.servizi[p].idServizio*1 ) || 
						(	SR.idServizio*1==0 &&
							SR.NomeServizio==LOGIN.decryptPrivacy(elenco.servizi[p].NomeServizio) && 
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
				for(k in DB.servizi.data){
					var trovato = false;
					var SR = DB.servizi.data[k];
					for(p in elenco.servizi){
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
			for(p in elenco.fornitori){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.fornitori[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idFornitore": elenco.fornitori[p].idFornitore*1,
							"RagioneSociale": LOGIN.decryptPrivacy(elenco.fornitori[p].RagioneSociale)+"",
							"Intestazione": LOGIN.decryptPrivacy(elenco.fornitori[p].Intestazione)+"",
							"PartitaIva": LOGIN.decryptPrivacy(elenco.fornitori[p].PartitaIva),
							"CodiceFiscale": LOGIN.decryptPrivacy(elenco.fornitori[p].CodiceFiscale),
							"Indirizzo": LOGIN.decryptPrivacy(elenco.fornitori[p].Indirizzo),
							"CAP": LOGIN.decryptPrivacy(elenco.fornitori[p].CAP),
							"Citta": LOGIN.decryptPrivacy(elenco.fornitori[p].Citta),
							"Provincia": LOGIN.decryptPrivacy(elenco.fornitori[p].Provincia),
							"Stato": LOGIN.decryptPrivacy(elenco.fornitori[p].Stato),
							"Telefono": LOGIN.decryptPrivacy(elenco.fornitori[p].Telefono),
							"Email": LOGIN.decryptPrivacy(elenco.fornitori[p].Email),
							"NoteFornitore": LOGIN.decryptPrivacy(elenco.fornitori[p].NoteFornitore),
							"etichette": toJson(LOGIN.decryptPrivacy(elenco.fornitori[p].etichette)),
							"DataModifica": elenco.fornitori[p].DataModifica*1,
							"DataCreazione": elenco.fornitori[p].DataCreazione*1,
							"Cancellato": elenco.fornitori[p].Cancellato*1,
							"frv": false };
				
				for(k in DB.fornitori.data){
					var FR = DB.fornitori.data[k];
					if(	( FR.idFornitore*1>0 && FR.idFornitore*1==elenco.fornitori[p].idFornitore*1 ) || 
						(	FR.idFornitore*1==0 &&
							FR.RagioneSociale==LOGIN.decryptPrivacy(elenco.fornitori[p].RagioneSociale) && 
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
				for(k in DB.fornitori.data){
					var trovato = false;
					var FR = DB.fornitori.data[k];
					for(p in elenco.fornitori){
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
			for(p in elenco.appuntamenti){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.appuntamenti[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idAppuntamento": elenco.appuntamenti[p].idAppuntamento*1,
							"TestoAppuntamento": LOGIN.decryptPrivacy(elenco.appuntamenti[p].TestoAppuntamento)+"",
							"TimeAppuntamento": elenco.appuntamenti[p].TimeAppuntamento*1,
							"oraInizio": elenco.appuntamenti[p].oraInizio*1,
							"oraFine": elenco.appuntamenti[p].oraFine*1,
							"idPaziente": elenco.appuntamenti[p].idPaziente*1,
							"DataModifica": elenco.appuntamenti[p].DataModifica*1,
							"DataCreazione": elenco.appuntamenti[p].DataCreazione*1,
							"Cancellato": elenco.appuntamenti[p].Cancellato*1,
							"frv": false };
				
				for(k in DB.appuntamenti.data){
					var AP = DB.appuntamenti.data[k];
					if(	( AP.idAppuntamento*1>-1 && AP.idAppuntamento*1==elenco.appuntamenti[p].idAppuntamento*1 ) || 
						(	AP.idAppuntamento*1==-1 &&
							AP.TestoAppuntamento==LOGIN.decryptPrivacy(elenco.appuntamenti[p].TestoAppuntamento) && 
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
				for(k in DB.appuntamenti.data){
					var trovato = false;
					var AP = DB.appuntamenti.data[k];
					for(p in elenco.appuntamenti){
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
			for(p in elenco.annotazioni){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.annotazioni[p].DataModifica = lastSync*1;
				JSNPUSH={ 	"idAnnotazione": elenco.annotazioni[p].idAnnotazione*1,
							"TitoloAnnotazione": LOGIN.decryptPrivacy(elenco.annotazioni[p].TitoloAnnotazione)+"",
							"TestoAnnotazione": LOGIN.decryptPrivacy(elenco.annotazioni[p].TestoAnnotazione)+"",
							"DataModifica": elenco.annotazioni[p].DataModifica*1,
							"DataCreazione": elenco.annotazioni[p].DataCreazione*1,
							"Cancellato": elenco.annotazioni[p].Cancellato*1,
							"frv": false };
				
				for(k in DB.annotazioni.data){
					var AN = DB.annotazioni.data[k];
					if(	( AN.idAnnotazione*1>0 && AN.idAnnotazione*1==elenco.annotazioni[p].idAnnotazione*1 ) || 
						(	AN.idAnnotazione*1==0 &&
							AN.TitoloAnnotazione==LOGIN.decryptPrivacy(elenco.annotazioni[p].TitoloAnnotazione) && 
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
				for(k in DB.annotazioni.data){
					var trovato = false;
					var AN = DB.annotazioni.data[k];
					for(p in elenco.annotazioni){
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
			for(p in elenco.pazienti){
				// per ogni novità verifico l'esistenza
				passato=false;
				if(BACKUPS.bkpProvv)elenco.pazienti[p].DataModifica = lastSync*1;
				
				JSNPUSH={ 	"idPaziente": elenco.pazienti[p].idPaziente*1,
							"Nome": LOGIN.decryptPrivacy(elenco.pazienti[p].Nome)+"",
							"Cognome": LOGIN.decryptPrivacy(elenco.pazienti[p].Cognome)+"",
							"Indirizzo": LOGIN.decryptPrivacy(elenco.pazienti[p].Indirizzo),
							"CAP": LOGIN.decryptPrivacy(elenco.pazienti[p].CAP),
							"Citta": LOGIN.decryptPrivacy(elenco.pazienti[p].Citta),
							"Provincia": LOGIN.decryptPrivacy(elenco.pazienti[p].Provincia),
							"Stato": LOGIN.decryptPrivacy(elenco.pazienti[p].Stato),
							"Telefono": LOGIN.decryptPrivacy(elenco.pazienti[p].Telefono),
							"Cellulare": LOGIN.decryptPrivacy(__(elenco.pazienti[p].Cellulare)),
							"paeseCellulare": __(elenco.pazienti[p].paeseCellulare),
							"Email": LOGIN.decryptPrivacy(elenco.pazienti[p].Email),
							"sesso": LOGIN.decryptPrivacy(elenco.pazienti[p].sesso),
							"NotePaziente": LOGIN.decryptPrivacy(elenco.pazienti[p].NotePaziente),
							"DataNascita": elenco.pazienti[p].DataNascita,
							"LuogoNascita": LOGIN.decryptPrivacy(__(elenco.pazienti[p].LuogoNascita)),
							"tags": toJson(LOGIN.decryptPrivacy(elenco.pazienti[p].tags)),
							"etichette": toJson(LOGIN.decryptPrivacy(elenco.pazienti[p].etichette)),
							"medicine": toJson(LOGIN.decryptPrivacy(elenco.pazienti[p].medicine)),
							"allergie": toJson(LOGIN.decryptPrivacy(elenco.pazienti[p].allergie)),
							"patologie": toJson(LOGIN.decryptPrivacy(elenco.pazienti[p].patologie)),
							"interventi": toJson(LOGIN.decryptPrivacy(elenco.pazienti[p].interventi)),
							"gallery": elenco.pazienti[p].gallery,
							"Provenienza": LOGIN.decryptPrivacy(elenco.pazienti[p].Provenienza),
							"Professione": LOGIN.decryptPrivacy(elenco.pazienti[p].Professione),
							"Intestazione": LOGIN.decryptPrivacy(elenco.pazienti[p].Intestazione),
							"CodiceFiscale": LOGIN.decryptPrivacy(elenco.pazienti[p].CodiceFiscale),
							"PartitaIva": LOGIN.decryptPrivacy(elenco.pazienti[p].PartitaIva),
							"Social": LOGIN.decryptPrivacy(elenco.pazienti[p].Social),
							"avatar": LOGIN.decryptPrivacy(elenco.pazienti[p].avatar),
							"Altezza": LOGIN.decryptPrivacy(elenco.pazienti[p].Altezza),
							"Peso": LOGIN.decryptPrivacy(elenco.pazienti[p].Peso),
							"DataModifica": elenco.pazienti[p].DataModifica*1,
							"trattamenti": [],
							"saldi": [],
							"Cancellato": elenco.pazienti[p].Cancellato*1,
							"frv": false };
	
				var trattamentiProvvisori=[];
				var saldiProvvisori=[];
				kDef=-1; // il paziente di riferimento su cui lavorare per i trattamenti
				for(k in DB.pazienti.data){
					PZ = DB.pazienti.data[k];
					if( ( PZ.idPaziente*1>0 && PZ.idPaziente*1==elenco.pazienti[p].idPaziente*1 ) || 
						( PZ.idPaziente*1==0 && PZ.Nome==elenco.pazienti[p].Nome && PZ.Cognome==elenco.pazienti[p].Cognome ) || 
						( PZ.idPaziente*1==0 && k==elenco.pazienti[p].p) ){
							
						// se esiste aggiorna
						if(typeof(PZ.trattamenti)=='undefined')PZ.trattamenti=[];
						if(typeof(PZ.saldi)=='undefined')PZ.saldi=[];
						trattamentiProvvisori=JSON.parse(JSON.stringify(PZ.trattamenti));
						saldiProvvisori=JSON.parse(JSON.stringify(PZ.saldi));
						var md5='';
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
					var trattamenti=JSON.parse(JSON.stringify(elenco.pazienti[p].trattamenti)); // elenco trattamenti arrivati nuovi
					
					for(t in trattamenti){ // in tutti i trattamenti arrivati
						passato=false;
						
						var puntiTsuboMap = LOGIN.decryptPrivacy(trattamenti[t].puntiTsuboMap);
						
						if(puntiTsuboMap.substr(0,1)!="["){
							if(puntiTsuboMap.indexOf(".")>-1){
								var puntiProvvisori = [];
								var parti=puntiTsuboMap.split("|");
								for(pt in parti){
									var ppp = parti[pt].split(".");
									puntiProvvisori.push({
										n: ppp[0],
										m: ppp[1],
										e: ppp[2]
									});
								}
								puntiTsuboMap = JSON.stringify(puntiProvvisori);
							}else puntiTsuboMap = '[]';
						}
						
						if(BACKUPS.bkpProvv)trattamenti[t].DataModifica = lastSync*1;
						JSNPUSH={ 	"idTrattamento": trattamenti[t].idTrattamento*1,
									"idPaziente": DB.pazienti.data[kDef].idPaziente*1,
									"TitoloTrattamento": LOGIN.decryptPrivacy(trattamenti[t].TitoloTrattamento),
									"TestoTrattamento": LOGIN.decryptPrivacy(trattamenti[t].TestoTrattamento),
									"Prescrizione": LOGIN.decryptPrivacy(trattamenti[t].Prescrizione),
									"puntiTsuboMap": puntiTsuboMap,
									"puntiAuriculoMap": LOGIN.decryptPrivacy(trattamenti[t].puntiAuriculoMap),
									"meridiani": trattamenti[t].meridiani,
									"sintomi": trattamenti[t].sintomi,
									"gallery": trattamenti[t].gallery,
									"TimeTrattamento": trattamenti[t].TimeTrattamento*1,
									"oraInizio": trattamenti[t].oraInizio*1,
									"oraFine": trattamenti[t].oraFine*1,
									"DataModifica": trattamenti[t].DataModifica*1,
									"LabelCiclo": LOGIN.decryptPrivacy(trattamenti[t].LabelCiclo),
									"TipoTrattamento": LOGIN.decryptPrivacy(trattamenti[t].TipoTrattamento),
									"CostoTrattamento": trattamenti[t].CostoTrattamento*1,
									"ordine": trattamenti[t].ordine*1,
									"Cancellato": trattamenti[t].Cancellato*1,
									"frv": false };		
									
						for(g in trattamentiProvvisori){ // in quelli esistenti ...
							var TR = trattamentiProvvisori[g];
							var md5='';
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
						for(g in trattamentiProvvisori){ 
							var trovato = false;
							var TR = trattamentiProvvisori[g];
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
					var saldi=JSON.parse(JSON.stringify(elenco.pazienti[p].saldi)); // elenco trattamenti arrivati nuovi
					
					for(t in saldi){ // in tutti i trattamenti arrivati
						passato=false;
						if(BACKUPS.bkpProvv)saldi[t].DataModifica = lastSync*1;
						JSNPUSH={ 	"idSaldo": saldi[t].idSaldo*1,
									"idPaziente": DB.pazienti.data[kDef].idPaziente*1,
									"MotivoSaldo": LOGIN.decryptPrivacy(saldi[t].MotivoSaldo),
									"RicevutaSaldo": LOGIN.decryptPrivacy(__(saldi[t].RicevutaSaldo)),
									"ValoreSaldo": saldi[t].ValoreSaldo*1,
									"DataSaldo": saldi[t].DataSaldo*1,
									"DataModifica": saldi[t].DataModifica*1,
									"Cancellato": saldi[t].Cancellato*1,
									"frv": false };		
									
						if(debug)console.log(JSNPUSH);
						for(g in saldiProvvisori){ // in quelli esistenti ...
							var SL = saldiProvvisori[g];
							if(	( SL.idSaldo*1>0 && SL.idSaldo*1==saldi[t].idSaldo*1) ||
								  SL.id_interno*1==saldi[t].p*1 ){ // verifico l'esistenza
								
								// se esiste aggiorna
								var md5='';
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
						for(g in saldiProvvisori){ 
							var trovato = false;
							var SA = saldiProvvisori[g];
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
				for(k in DB.pazienti.data){
					var trovato = false;
					var PZ = DB.pazienti.data[k];
					for(p in elenco.pazienti){
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
			for(p in DB.pazienti.data){
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
	},
	verSincro: function ( txt ){
		// verifica la sincronizzazione della tabella txt
		nSinc++;
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
		if(nSinc == LOGIN.totSinc){ // pazienti | procedure | note | ricerche
			LOGIN.pulisciTabelle();
			DB.verDbSize();
		}
	},
	pulisciTabelle: function(){
		// elimina gli elementi "Cancellati"
		if(!BACKUPS.bkpProvv){
			PZS = DB.pazienti.data;
			tot = PZS.length;
			for(p=tot-1;p>=0;p--){
				if(PZS[p].Cancellato=='1' || __(PZS[p].frv))PZS.splice(p, 1)
			}
			tot = PZS.length;
			for(p=tot-1;p>=0;p--){
				TRS = DB.pazienti.data[p].trattamenti;
				tot2 = TRS.length;
				for(t=tot2-1;t>=0;t--){
					if(TRS[t].Cancellato=='1' || __(TRS[t].frv))TRS.splice(t, 1);
				}
			}
			for(p=tot-1;p>=0;p--){
				SAS = DB.pazienti.data[p].saldi;
				tot2 = SAS.length;
				for(s=tot2-1;s>=0;s--){
					if(SAS[s].Cancellato=='1' || __(SAS[s].frv))SAS.splice(s, 1);
				}
			}
			FRS = DB.fornitori.data;
			tot = FRS.length;
			for(p=tot-1;p>=0;p--){
				if(FRS[p].Cancellato=='1' || __(FRS[p].frv))FRS.splice(p, 1)
			}
			SRS = DB.servizi.data;
			tot = SRS.length;
			for(p=tot-1;p>=0;p--){
				if(SRS[p].Cancellato=='1' || __(SRS[p].frv))SRS.splice(p, 1)
			}
			APS = DB.appuntamenti.data;
			tot = APS.length;
			for(p=tot-1;p>=0;p--){
				if(APS[p].Cancellato=='1' || __(APS[p].frv))APS.splice(p, 1)
			}
			ANS = DB.annotazioni.data;
			tot = ANS.length;
			for(p=tot-1;p>=0;p--){
				if(ANS[p].Cancellato=='1' || __(ANS[p].frv))ANS.splice(p, 1)
			}
			PRS = DB.procedure.data;
			tot = PRS.length;
			for(p=tot-1;p>=0;p--){
				if(PRS[p].Cancellato=='1' || __(PRS[p].frv))PRS.splice(p, 1)
			}
			PRS = DB.procedure.data;
			tot = PRS.length;
			for(p=tot-1;p>=0;p--){
				DTS = DB.procedure.data[p].dettagliProcedura;
				tot2 = DTS.length;
				for(d=tot2-1;d>=0;d--){
					if(DTS[d].Cancellato=='1' || __(DTS[d].frv))DTS.splice(d, 1);
				}
			}
		}
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)).then(function(){ // salvo il DB
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".servizi"), IMPORTER.COMPR(DB.servizi)).then(function(){ // salvo il DB
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".annotazioni"), IMPORTER.COMPR(DB.annotazioni)).then(function(){ // salvo il DB
						localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)).then(function(){ // salvo il DB
							localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure)).then(function(){ // salvo il DB
								//DB.foto = { data: [], lastSync: 0 };
								for(f in DB.foto.data){
									DB.foto.data[f].imgBig = '';
								}
								localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".foto"), IMPORTER.COMPR(DB.foto)).then(function(){ // salvo il DB
									if(LOGIN.afterFunct){
										eval(LOGIN.afterFunct);
										if(LOGIN.afterFunct && LOGIN.afterFunct.indexOf('/*noRic*/')>=-1){
											LOGIN.afterFunct = null;
											return;
										}
										LOGIN.afterFunct = null;
									}else{
										try{SET.car_procedure(-1,1);}catch(err){}
									}
									if(PAZIENTI.idCL == -1)PAZIENTI.caricaPazienti();
									else{
										try{document.getElementById("lista_pazienti").querySelector(".alertMini").style.display='none';}catch(err){}
									}
									FORNITORI.caricaFornitori();
									SERVIZI.caricaServizi();
									ANNOTAZIONI.caricaAnnotazioni();
									if(	SCHEDA.elencoSel == 'pazienti'){	
										var lista = document.getElementById("lista_pazienti").querySelector(".lista");
										if(lista.classList.contains("listaTrattamenti"))PAZIENTI.caricaTrattamenti( true ); // true serve per ...
										if(lista.classList.contains("listaSaldi"))PAZIENTI.caricaSaldi( true ); //    ... riaccendere il pulsante
									}
										//try{SET.car_procedure(-1,1);}catch(err){}
									//}
									if(BACKUPS.bkpProvv){
										BACKUPS.bkpProvv = null;
										LOGIN.sincronizza( 'BACKUPS.ripristinoTerminato();', true );
										visLoader("");
										SCHEDA.scaricaScheda();
										if(PAZIENTI.idCL > -1){
											PAZIENTI.deselPaziente();
										}
									}
									if(DB.sizeDb<40*1000*1000)LOGIN.updateGallery(); // limite a 40MB (circa 1000 foto)
								});
							});
						});
					});
				});
			});
		});
	},
	download:function ( filename, text ){
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);	
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	},
	slugify: function(s){
		_slugify_strip_re = /[^\w\s-]/g;
		_slugify_hyphenate_re = /[-\s]+/g;
		s = s.replace(_slugify_strip_re, '').trim().toLowerCase();
		s = s.replace(_slugify_hyphenate_re, '-');
		return s;
	},
	updateGallery: function(){
		if(CONN.getConn() && LOGIN.logedin()!=''){
			var elenco = [];
			for(p in DB.pazienti.data){
				// verifico nel paziente
				var gallery =  __(DB.pazienti.data[p].gallery,'[]');
                if(!gallery)gallery='[]';
                gallery = JSON.parse(gallery);
				if(gallery.length){
					for(g in gallery){
						if(!__(gallery[g].imgMini)){
							var add = true;
							for(f in DB.foto.data){
								if(DB.foto.data[f].idFoto==gallery[g].idFoto && __(DB.foto.data[f].imgMini))add = false;
							}
							if(add)elenco.push(gallery[g].idFoto);
						}
					}
				}
				// verifico nei trattamenti
				for(t in DB.pazienti.data[p].trattamenti){
					if(DB.pazienti.data[p].trattamenti[t].gallery){
						var gallery =  JSON.parse(DB.pazienti.data[p].trattamenti[t].gallery);
						if(gallery.length){
							for(g in gallery){
								if(!__(gallery[g].imgMini)){
									var add = true;
									for(f in DB.foto.data){
										if(DB.foto.data[f].idFoto==gallery[g].idFoto && __(DB.foto.data[f].imgMini))add = false;
									}
									if(add)elenco.push(gallery[g].idFoto);
								}
							}
						}
					}
				}
			}
			for(p in DB.procedure.data){
				// verifico nella procedura
				var gallery =  __(DB.procedure.data[p].gallery,'[]');
                if(!gallery)gallery='[]';
                gallery = JSON.parse(gallery);
				if(gallery.length){
					for(g in gallery){
						if(!__(gallery[g].imgMini)){
							var add = true;
							for(f in DB.foto.data){
								if(DB.foto.data[f].idFoto==gallery[g].idFoto && __(DB.foto.data[f].imgMini))add = false;
							}
							if(add)elenco.push(gallery[g].idFoto);
						}
					}
				}
			}
			CONN.caricaUrl(	'getImgGallery_GLOBAL.php','b64=1&iU='+DB.login.data.idUtente+'&JSNPOST='+window.btoa(encodeURIComponent(JSON.stringify(elenco))),'LOGIN.updateGallery_save');
		}
	},
	updateGallery_save: function( res ){
		if(res){
			var modificato = false;
			var foto = JSON.parse(res);
			for(f in foto){
				var presente = false;
				for(g in DB.foto.data){
					if(DB.foto.data[g].idFoto == foto[f].idFoto){
						DB.foto.data[g].imgMini = foto[f].imgMini;
						presente = true;
					}
				}
				if(!presente){
					DB.foto.data.push(foto[f]);
					modificato = true;
				}
			}
			if(modificato){
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".foto"), IMPORTER.COMPR(DB.foto)).then(function(){ // salvo il DB
				});
			}
		}
	},
	pulisciGallery: function(){
		for(f=DB.foto.data.length-1;f>=0;f--){
			presente = false;
			for(p in DB.pazienti.data){
				// verifico nel paziente
				var gallery =  __(DB.pazienti.data[p].gallery,'[]');
                if(!gallery)gallery='[]';
                gallery = JSON.parse(gallery);
				if(gallery.length){
					for(g in gallery){
						if(DB.foto.data[f].idFoto == gallery[g].idFoto)presente = true;
					}
				}
				// verifico nei trattamenti
				for(t in DB.pazienti.data[p].trattamenti){
					if(DB.pazienti.data[p].trattamenti[t].gallery){
						var gallery =  JSON.parse(DB.pazienti.data[p].trattamenti[t].gallery);
						if(gallery.length){
							for(g in gallery){
								if(DB.foto.data[f].idFoto == gallery[g].idFoto)presente = true;
							}
						}
					}
				}
			}
			for(p in DB.procedure.data){
				// verifico nella procedura
				var gallery =  __(DB.procedure.data[p].gallery,'[]');
                if(!gallery)gallery='[]';
                gallery = JSON.parse(gallery);
				if(gallery.length){
					for(g in gallery){
						if(DB.foto.data[f].idFoto == gallery[g].idFoto)presente = true;
					}
				}
			}
			if(!presente)DB.foto.data.splice(f,1);
		}
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".foto"), IMPORTER.COMPR(DB.foto)).then(function(){ // salvo il DB
		});
	},
	
	
	// GESTORE APERTURE
	verifyLocked: function( tab, n ){
		/*
		- Verifica se l'elemento "n" della tabella "tab" è già stato aperto da un altro dispositivo
		- Se non è già aperto lo blocca
		*/
		if(n){
			SCHEDA.locked.tab = tab;
			SCHEDA.locked.idEl = n;
			CONN.caricaUrl(	"lockedVerifica.php",
							"tab=" +tab+"&idEl="+n,
							"LOGIN.manageLocked");
		}
	},
	manageLocked: function( txt ){
		/*
		- Risposta al controllo se l'elemento è già aperto
		- gestisce la chiusura della schda in caso sia già aperto
		*/
		if(txt == 'locked'){
			ALERT(TXT("ElementoGiaAperto"));
			SCHEDA.scaricaScheda();
		}
	},
	closeLocked: function( tab, n ){
		/*
		- Chiude l'elemento "n" della tabella "tab" aperto sul server
		*/
		if(n){
			CONN.caricaUrl(	"lockedChiudi.php",
							"tab=" +tab+"&idEl="+n,
							"__");
			SCHEDA.locked.tab = '';
			SCHEDA.locked.idEl = 0;
		}
	},
	
	// funzioni generiche
	dataW: function(txt){
		if(typeof(txt)=='string')txt=LOGIN.decryptPrivacy(txt);
		return txt;
	},
	componi: function( backup, data ){
		LOGIN.addHTML('<style type="text/css">*{font-family:Verdana, Geneva, sans-serif;font-size:12px;line-height:20px;}.rientro{padding-left:20px;}.tits{font-size:14px;}h1, h1 *{font-size:24px;}h2, h2 *{font-size:20px;}h3, h3 *{font-size:16px;}i{color:#999;}</style>')
		LOGIN.addHTML(TXT("Backup")+": <b>"+LOGIN.dataW(DB.login.data.Nominativo)+"</b><br>");
		LOGIN.addHTML("<i>"+TXT("DataCreazione")+":</i> <b>"+getFullDataTS(data)+" ore "+getOraTS(data)+"</b><hr>");
		
		LOGIN.addHTML("<h1>"+TXT("Pazienti").toUpperCase()+"</h1><div class=\"rientro\">");
		for(p in backup.pazienti){
			backup.pazienti[p].Nome=LOGIN.dataW(backup.pazienti[p].Nome);
			backup.pazienti[p].Cognome=LOGIN.dataW(backup.pazienti[p].Cognome);
		}
		backup.pazienti.sort(sort_by("Nome" ));
		backup.pazienti.sort(sort_by("Cognome" ));
		var nr = 0;
		for(p in backup.pazienti){
			if((backup.pazienti[p].Nome || backup.pazienti[p].Cognome) && backup.pazienti[p].Cancellato!='1'){
				nr++;
				LOGIN.addHTML("<h2>"+(nr)+") "+backup.pazienti[p].Nome+" "+backup.pazienti[p].Cognome+"</h2><p class=\"rientro\">");
				LOGIN.addHTML("<i>"+TXT("Indirizzo")+":</i> "+LOGIN.dataW(backup.pazienti[p].Indirizzo)+"<br>");
				LOGIN.addHTML("<i>"+TXT("CAP")+":</i> "+LOGIN.dataW(backup.pazienti[p].CAP)+"<br>");
				LOGIN.addHTML("<i>"+TXT("Provincia")+":</i> "+LOGIN.dataW(backup.pazienti[p].Provincia)+"<br>");
				LOGIN.addHTML("<i>"+TXT("Stato")+":</i> "+LOGIN.dataW(backup.pazienti[p].Stato)+"<br>");
				LOGIN.addHTML("<i>"+TXT("Telefono")+":</i> "+LOGIN.dataW(backup.pazienti[p].Telefono)+"<br>");
				var prefisso = '';
				if(backup.pazienti[p].paeseCellulare)prefisso = paesi[backup.pazienti[p].paeseCellulare].prefisso;
				LOGIN.addHTML("<i>"+TXT("Cellulare")+":</i> "+prefisso+LOGIN.dataW(backup.pazienti[p].Cellulare)+"<br>");
				LOGIN.addHTML("<i>"+TXT("Email")+":</i> "+LOGIN.dataW(backup.pazienti[p].Email)+"<br>");
				LOGIN.addHTML("<i>"+TXT("Sesso")+":</i> "+TXT(""+LOGIN.dataW(backup.pazienti[p].sesso))+"<br>");
				LOGIN.addHTML("<i>"+TXT("Note")+":</i> "+LOGIN.dataW(backup.pazienti[p].NotePaziente)+"</p>");
	
	
				if(backup.pazienti[p].trattamenti.length>0){
					LOGIN.addHTML("<br><i>"+TXT("CicloTrattamenti").toUpperCase()+":</i><br><div class=\"rientro\">");
					
					
					var cicli=[];
					var n=0;
					for(i in backup.pazienti[p].trattamenti){
						esiste=false;
						for(c in cicli){
							if(cicli[c].NomeCiclo==backup.pazienti[p].trattamenti[i].LabelCiclo)esiste=true;
						}
						if(!esiste)cicli[n++]={"NomeCiclo": backup.pazienti[p].trattamenti[i].LabelCiclo, "UltimaModifica": backup.pazienti[p].trattamenti[i].TimeTrattamento*1, "p": i*1 };
					}
					for(c in cicli){
						for(i in backup.pazienti[p].trattamenti){
							if(backup.pazienti[p].trattamenti[i].TimeTrattamento*1>cicli[c].UltimaModifica*1){
								cicli[c].UltimaModifica=backup.pazienti[p].trattamenti[i].TimeTrattamento*1;
							}
						}
					}
					cicli.sort(sort_by("UltimaModifica", true, parseInt));
					var vuoto=true;
					for(c in cicli){
						vuoto=false;
						var noName=false;
						NomeCiclo=cicli[c].NomeCiclo;
						if(NomeCiclo=='0' || NomeCiclo=='')NomeCiclo=TXT("CicloSenzaNome");
						
						var trattamenti=[];
						for(t in backup.pazienti[p].trattamenti){
							if(backup.pazienti[p].trattamenti[t].LabelCiclo==cicli[c].NomeCiclo && backup.pazienti[p].trattamenti[t].Cancellato!='1'){
								trattamenti.push(backup.pazienti[p].trattamenti[t]);
							}
						}
						trattamenti.sort(sort_by("TipoTrattamento" ));
						
						LOGIN.addHTML("<h3>- "+LOGIN.dataW(NomeCiclo)+" -</h3><div class=\"rientro\">");
						for(t in trattamenti){
							var oI=LOGIN.dataW(trattamenti[t].oraInizio);
							var oF=LOGIN.dataW(trattamenti[t].oraFine);
							var orario=txtOrario='';
							if(oI*1>0 || oF*1>0){
								if(oI.toString().indexOf(".")>-1){
									var pO=oI.toString().split(".");
									oI=pO[0]+":30";
								}else oI+=":00";
								if(oF.toString().indexOf(".")>-1){
									var pO=oF.toString().split(".");
									oF=pO[0]+":30";
								}else oF+=":00";
								orario=oI+"-"+oF;
								txtOrario=TXT("eOra");
							}
							
							LOGIN.addHTML("<b class=\"tits\"> "+TXT("ModificaTrattamento")+" "+(t*1+1)+"</b><br>");
							if(LOGIN.dataW(trattamenti[t].TimeTrattamento))LOGIN.addHTML("<i>"+TXT("Data")+txtOrario+": </i> "+getFullDataTS(LOGIN.dataW(trattamenti[t].TimeTrattamento))+" "+orario+"<br>");
							LOGIN.addHTML("<i>"+TXT("Titolo")+":</i> <b>"+LOGIN.dataW(trattamenti[t].TitoloTrattamento)+"</b><br>");
							LOGIN.addHTML("<i>"+TXT("Costo")+":</i> <b>"+ArrotondaEuro(trattamenti[t].CostoTrattamento)+"</b><br>");
							var TT=LOGIN.dataW(trattamenti[t].TestoTrattamento);
							if(LOGIN.dataW(trattamenti[t].TipoTrattamento)=='A'){
							TT=JSON.parse(TT);
								LOGIN.addHTML("<i>"+TXT("AnamnesiMotivo")+":</i> "+TT.AnamnesiMotivo+"<br>");
								LOGIN.addHTML("<i>"+TXT("AnamnesiDiagnosiOccidentale")+":</i> "+TT.AnamnesiDiagnosiOccidentale+"<br>");
								LOGIN.addHTML("<i>"+TXT("AnamnesiDiagnosiMTC")+":</i> "+TT.AnamnesiDiagnosiMTC+"<br>");
							}else LOGIN.addHTML("<i>"+TXT("Descrizione")+":</i> "+TT.replace(/\n/gi,"<br>")+"<br>");
							
							sintomi=[];
							if(trattamenti[t].sintomi)var sintomi=JSON.parse(trattamenti[t].sintomi);
							if(sintomi.length>0){
								var txtSintomi='';
								for(s in sintomi){
									txtSintomi+=sintomi[s].NomeSintomo+" <b>(";
									if(sintomi[s].score>-1)txtSintomi+=sintomi[s].score;
									else txtSintomi+='-';
									txtSintomi+=")</b>, ";
								}
								txtSintomi=txtSintomi.substr(0,txtSintomi.length-2);
								LOGIN.addHTML("<i>"+TXT("Sintomi")+":</i> "+txtSintomi+"<br>");
							}
							if(trattamenti[t].puntiTsuboMap){
								var punti=JSON.parse(LOGIN.dataW(trattamenti[t].puntiTsuboMap));
								var txtPunti='';
								for(f in punti){
									nTsubo=punti[f].n*1;
									siglaMeridiano=punti[f].m;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									siglaTsubo=__(punti[f].s);
									if(!siglaTsubo)txtPunti+=siglaMeridiano+"."+nTsubo;
									else txtPunti+=siglaTsubo;
									if(valutazione=='V')txtPunti+=' (vuoto)';
									if(valutazione=='P')txtPunti+=' (pieno)';
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo;
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+=", ";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)LOGIN.addHTML("<i>"+TXT("PuntiTrattamento")+":</i> "+txtPunti+"<br>");
							}
							if(trattamenti[t].meridiani){
								var meridiani=JSON.parse(LOGIN.dataW(trattamenti[t].meridiani));
								var txtMeridiani='';
								for(m in meridiani){
									siglaMeridiano=meridiani[m].siglaMeridiano;
									NomeMeridiano=__(meridiani[m].NomeMeridiano);
									valEnergetica=__(meridiani[m].valEnergetica);
									descrizione=__(meridiani[m].descrizione);
									txtMeridiani+=NomeMeridiano;
									if(valEnergetica=='V')txtMeridiani+=' (vuoto)';
									if(valEnergetica=='P')txtMeridiani+=' (pieno)';
									if(valEnergetica=='D')txtMeridiani+=' (dolorante)';
									if(descrizione)txtMeridiani+=' '+descrizione;
									txtMeridiani+=", ";
								}
								txtMeridiani=txtMeridiani.substr(0,txtMeridiani.length-2);
								if(txtMeridiani)LOGIN.addHTML("<i>"+TXT("MeridianiTrattamento")+":</i> "+txtMeridiani+"<br>");
							}
							if(trattamenti[t].puntiAuriculoMap){
								var punti=JSON.parse(LOGIN.dataW(trattamenti[t].puntiAuriculoMap));
								var txtPunti='';
								for(f in punti){
									siglaTsubo=punti[f].s;
									valutazione=__(punti[f].e);
									mezzo=__(punti[f].z);
									descrizione=__(punti[f].t);
									txtPunti+=punti[f].n;
									if(valutazione=='D')txtPunti+=' (dolorante)';
									if(mezzo)txtPunti+=' '+mezzo;
									if(descrizione)txtPunti+=' '+descrizione;
									txtPunti+=", ";
								}
								txtPunti=txtPunti.substr(0,txtPunti.length-2);
								if(txtPunti)LOGIN.addHTML("<i>"+TXT("PuntiAuriculo")+":</i> "+txtPunti+"<br>");
							}
							LOGIN.addHTML("<br>");
						}
						LOGIN.addHTML("</div>");
					}
					
					LOGIN.addHTML("</div>");
				}
				
				
				if(backup.pazienti[p].saldi.length>0){
					LOGIN.addHTML("<br><i>"+TXT("ElSaldi").toUpperCase()+":</i><br><div class=\"rientro\">");
					var saldi=JSON.parse(JSON.stringify(backup.pazienti[p].saldi));
					saldi.sort(sort_by("DataSaldo", true, parseInt ));
					for(s in saldi){
						if(saldi[s].Cancellato!='1')LOGIN.addHTML("<i>"+getFullDataTS(LOGIN.dataW(saldi[s].DataSaldo))+"</i>: <b>&euro; "+ArrotondaEuro(saldi[s].ValoreSaldo)+"</b><br>");
					}
					LOGIN.addHTML("</div>");
				}
				
				var note=[];
				for(n in backup.note){
					if(backup.note[n].TestoAnnotazione && backup.note[n].idPaziente==backup.pazienti[p].idPaziente && backup.note[n].Cancellato!='1'){
						note.push(backup.note[n]);
					}
				}
				
				if(note.length>0){
					LOGIN.addHTML("<br><i>"+TXT("ANNOTAZIONI")+":</i><br><div class=\"rientro\">");
					for(n in note){
						LOGIN.addHTML("<b>"+note[n].meridiano+" "+LOGIN.decryptPrivacy(LOGIN.decryptPrivacy(LOGIN.dataW(note[n].numeroTsubo)))+"</b>: "+LOGIN.dataW(note[n].TestoAnnotazione.replace(/\n/gi,"<br>"))+"<br>");
					}
					LOGIN.addHTML("</div>");
				}
				
				LOGIN.addHTML("<br><hr>");
				
			}
		}
		LOGIN.addHTML("</div>");
		LOGIN.addHTML("<h1>"+TXT("PROCEDURE")+"</h1><div class=\"rientro\">");
		
		
		for(n in backup.procedure){
			if(backup.procedure[n].NomeProcedura && backup.procedure[n].Cancellato!='1'){
				LOGIN.addHTML("<b class=\"tits\">"+backup.procedure[n].NomeProcedura+"</b><div class=\"rientro\">");
				LOGIN.addHTML("<i>"+TXT("Data")+": </i> "+getFullDataTS(backup.procedure[n].DataCreazione)+"<br>");
				for(d in backup.procedure[n].dettagliProcedura){
					var TD=backup.procedure[n].dettagliProcedura[d].TipoDettaglio;
					if(TD=='P')LOGIN.addHTML("<i>"+TXT("Tsubo")+": </i>");
					if(TD=='M')LOGIN.addHTML("<i>"+TXT("AggiungiMeridiano")+": </i>");
					if(TD=='T' || TD=='P' || TD=='M')LOGIN.addHTML("<b>");
					var descrizione = backup.procedure[n].dettagliProcedura[d].DescrizioneDettaglio.replace(/\n/gi,"<br>");
					LOGIN.addHTML(descrizione);
					if(TD=='T' || TD=='P' || TD=='M')LOGIN.addHTML("</b>");
					LOGIN.addHTML("<br>");
				}
				LOGIN.addHTML("<i>"+TXT("Condiviso")+": </i> ");
				if(backup.procedure[n].Condiviso=='1')LOGIN.addHTML("<b>"+TXT("si")+"</b>");
				else LOGIN.addHTML("<b>"+TXT("no")+"</b>");
				LOGIN.addHTML("<br>");
				LOGIN.addHTML("</div>");
				
				LOGIN.addHTML("<hr>");
			}
		}
		LOGIN.addHTML("</div>");
		LOGIN.addHTML("<h1>"+TXT("ANNOTAZIONI_GENERICO")+"</h1><div class=\"rientro\">");
	
		for(n in backup.note){
			if(backup.note[n].TestoAnnotazione && backup.note[n].idPaziente==-1 && backup.note[n].Cancellato!='1'){
				LOGIN.addHTML("<b class=\"tits\">"+LOGIN.dataW(backup.note[n].meridiano)+" "+LOGIN.dataW(backup.note[n].numeroTsubo)+"</b>: "+ LOGIN.dataW(backup.note[n].TestoAnnotazione.replace(/\n/gi,"<br>"))+"<br>");
				
				LOGIN.addHTML("<hr>");
			}
		}
		LOGIN.addHTML("</div>");
		LOGIN.download("dati personali "+getFullDataTS(data)+" ("+data+").htm",LOGIN.HTML);
	},
	addHTML: function(txt){
		LOGIN.HTML+=txt;
	}
};
