var MENU = {
	wheeling: false,
	tmW: null,
	mnMobOp: null,
	setSel: null,
	icoSelected: null,
	tmIcone: null,
	inizio: true,
	pwdOK: false,
	init: function(){
		MENU.setOp('Pelle',1);
		MENU.setOp('Muscoli',1);
		MENU.setOp('Ossa',1);
		MENU.setOp('Visceri',0.8);
		document.getElementById("pulsanti_modello").addEventListener( 'wheel', function(){
			MENU.wheeling = true;
			MENU.tmW = setTimeout( function(){
				MENU.wheeling = false;
				MENU.tmW = null;
			},500);
		}, false );
		window.addEventListener( 'keydown', MENU.pulsanti, false );
		if(localStorage.modello && globals.memorizza)MENU.comprimiIcone(true);
	},
	pulsanti: function(event){
		if(touchable)return;
		if(event.keyCode==27){ // ESC
			if(document.getElementById("stampa").className.indexOf("visSch") == -1)MENU.chiudiMenu();
		}
	},
	aggiornaIconeModello: function(){
		var els = document.getElementById("p1").getElementsByTagName("div");
		for(let e=0;e<els.length;e++){
			var pass = true;
			if(globals.set.cartella){
				modello = els[e].id.replace("p_","");
				if(globals.set.modelli.indexOf(modello) == -1)pass = false;
			}
			if(els[e].id!="scarica_modello"){
				if(pass)els[e].classList.remove("disModello");
				else els[e].classList.add("disModello");
			}
		}
		try{
			if(globals.modello.livelli.indexOf("muscoli") > -1){
				document.getElementById("p_muscoli").classList.add("visBtn");
				document.getElementById("slideMuscles").classList.add("visSlide");
			}else{
				document.getElementById("p_muscoli").classList.remove("visBtn");
				document.getElementById("slideMuscles").classList.remove("visSlide");
			}
			if(globals.modello.rifletti){
				document.getElementById("p_rifletti").classList.add("visBtn");
			}else{
				document.getElementById("p_rifletti").classList.remove("visBtn");
			}
			var els = document.getElementById("livelli_cont").getElementsByTagName("div");
			for(let e=0;e<els.length;e++){
				var preVis = document.getElementById("pulsanti_modello").classList.contains("visSch");
				if(!preVis)document.getElementById("pulsanti_modello").classList.add("visSch");
				if(els[e].id.indexOf("p_")>-1){
					var livello=els[e].id.replace("p_","");
					if(globals.modello.livelli.indexOf(livello) > -1){
						document.getElementById("p_liv_"+livello).classList.add("visBtn");
						els[e].getElementsByClassName("slider_btn")[0].style.marginLeft='0px';
						livello=livello.substr(0,1).toUpperCase()+livello.substr(1,livello.length-1);
						els[e].classList.add("visSch");
						var perc = MENU.getOp(livello);
						var maxVal = els[e].getElementsByClassName("slider")[0].scrollWidth-els[e].getElementsByClassName("slider_btn")[0].scrollWidth;
						mL=perc*maxVal;
						els[e].getElementsByClassName("slider_btn")[0].style.marginLeft=mL+'px';
					}else{
						els[e].classList.remove("visSch");
						document.getElementById("p_liv_"+livello).classList.remove("visBtn");
					}
				}
				if(!preVis)document.getElementById("pulsanti_modello").classList.remove("visSch");
			}
		}catch(err){}
	},
	verOp: function (){
		//return (SCHEDA.classeAperta == 'scheda_A' ||SCHEDA.classeAperta == 'scheda_B');
		return document.getElementById("scheda").classList.contains("visSch") && SCHEDA.aggancio.tipo=="lato";
	},
	chiudiMenu: function( n, stage=false ){
		if(stage && !CONN.online)return;
		if(n!="pulsanti_modello")document.getElementById("pulsanti_modello").classList.remove("visSch");
		if(n!="sets")document.getElementById("sets").classList.remove("visSch");
		if(n!="elencoSelected")document.getElementById("elencoSelected").classList.remove("visSch");
		if(n!="impostazioni")document.getElementById("impostazioni").classList.remove("visSch");
		if(n!="stampa")document.getElementById("stampa").classList.remove("visSch");
		if(n!="feedback")document.getElementById("feedback").classList.remove("visSch");
		if(n!="colori")document.getElementById("colori").classList.remove("visSch");
		if(n!="versione")document.getElementById("versione").classList.remove("visSch");
		if(n!="login")document.getElementById("login").classList.remove("visSch");
		if(n!="registrazione")document.getElementById("registrazione").classList.remove("visSch");
		if(n!="notifiche")document.getElementById("notifiche").classList.remove("visSch");
		if(n!="backups")document.getElementById("backups").classList.remove("visSch");
		if(n!="impset")document.getElementById("impset").classList.remove("visSch");
		if(n!="community")document.getElementById("community").classList.remove("visSch");
		if(n!="dispositivi")document.getElementById("dispositivi").classList.remove("visSch");
		if(n!="features")document.getElementById("features").classList.remove("visSch");
		if(n!="archives")document.getElementById("archives").classList.remove("visSch");
		if(n!="purchases")document.getElementById("purchases").classList.remove("visSch");
		if(n!="infolingue")document.getElementById("infolingue").classList.remove("visSch");
		if(n!="ag")document.getElementById("ag").classList.remove("visSch");
		if( n=='pulsanti_modello' ||
			n=='impostazioni' ||
			n=='sets' ||
			n=='ricerche' ||
			n=='elencoSelected' ||
			n=='ag' ){
			SCHEDA.chiudiElenco();
		}
		rimuoviLoading( document.getElementById("elenchi_cont"));
		if(MENU.icoSelected){
			if(	MENU.icoSelected.id!='p_cartella' && 
				MENU.icoSelected.id!='p_set' )MENU.desIcona();
		}
		MENU.nasTT();
		RICERCHE.nascondiGlobal();
		BACKUPS.bkpProvv = null;
		nasLoader();
		
		// recupero il focus sul pulsante degli archivi
		if(	MENU.verOp() && 
			!document.getElementById("p_cartella").classList.contains("p_sel") &&
			!document.getElementById("scheda").classList.contains("scheda_utente") &&
			!n &&
			!smartMenu &&
			document.getElementById("elenchi").classList.contains("vis_base")){
			MENU.icoSelected = document.getElementById("p_cartella");
			MENU.icoSelected.classList.add("p_sel");
			MENU.comprimiIcone(true);
		}
		//verAnimate();
	},
	visModello: function( forza=false ){
		var daScheda = (MENU.verOp() && !smartMenu);
						
		if(!daScheda){
			if(!document.getElementById("pulsanti_modello").classList.contains("visSch") && !globals.modello.cartella){
				GUIDA.visFumetto("guida_anatomia");
			}else{
				GUIDA.nasFumetto();
			}
			this.chiudiMenu("pulsanti_modello");
		}else document.getElementById("p_cartella").classList.remove("p_sel");
		
		if(!forza)document.getElementById("pulsanti_modello").classList.toggle("visSch");
		else document.getElementById("pulsanti_modello").classList.add("visSch");
		this.aggiornaIconeModello();
		if(!globals.modello.cartella && document.getElementById("pulsanti_modello").classList.contains("visSch")){
			var mods = ['donna','uomo','piedi','orecchio'];
			var vel = 3.5;
			for(let m=0;m<mods.length;m++){
				setTimeout( function(g) {
					document.getElementById("p_"+mods[g]).classList.add("pModsEvi");
				}, (m+1)*2 * 100, m );
				setTimeout( function(g) {
					document.getElementById("p_"+mods[g]).classList.remove("pModsEvi");
				}, ((m+1)*2 + vel) * 100, m );
			}
		}
		//if(!smartMenu){
			if(document.getElementById("pulsanti_modello").classList.contains("visSch")){
				MENU.icoSelected = document.getElementById("p_modello");
				MENU.icoSelected.classList.add("p_sel");
			}else MENU.desIcona();
		//}
		MENU.comprimiIcone(true);
		if(daScheda){
			if(document.getElementById("pulsanti_modello").classList.contains("visSch")){
				applicaLoading( document.getElementById("elenchi_cont"));
			}else{
				var classList = document.getElementById("elenchi").classList;
				if(classList.contains("visSch")){
					if(classList.contains("vis_base"))SCHEDA.apriElenco('base');
					if(classList.contains("vis_set"))SCHEDA.apriElenco('set');
				}
				rimuoviLoading( document.getElementById("elenchi_cont"));
			}
			document.getElementById("p_sets").classList.remove("p_sel");
			document.getElementById("sets").classList.remove("visSch");
		}
		get_memOpen3d();
		MENU.nasTT();
	},
	visSets: function(){
		var daScheda = (MENU.verOp() && !smartMenu);

		if(!daScheda)MENU.chiudiMenu("sets");
		else document.getElementById("p_cartella").classList.remove("p_sel");
		document.getElementById("sets").classList.toggle("visSch");
		if(document.getElementById("sets").classList.contains("visSch")){
			CATALOGO.scriviListaSets();
		}
		if(document.getElementById("sets").classList.contains("visSch")){
			MENU.icoSelected = document.getElementById("p_sets");
			MENU.icoSelected.classList.add("p_sel");
			
		}else MENU.desIcona();
		MENU.comprimiIcone(true);
		if(daScheda){
			if(document.getElementById("sets").classList.contains("visSch")){
				applicaLoading( document.getElementById("elenchi_cont"));
			}else{
				SCHEDA.apriElenco('base');
			}
			document.getElementById("p_modello").classList.remove("p_sel");
			document.getElementById("pulsanti_modello").classList.remove("visSch");
		}
		MENU.nasTT();
		get_memOpenMap();
	},
	
	desIcona: function(){
		if(MENU.icoSelected){
			MENU.icoSelected.classList.remove("p_sel");
			MENU.icoSelected = null;
		}
	},
	
	chEls: function(n){
		if(n != 'ossa'){
			document.getElementById("fr_ossa").classList.remove("frOpened");
			document.getElementById("el_ossa_cont").classList.remove("elOpened");
		}
		if(n != 'visceri'){
			document.getElementById("fr_visceri").classList.remove("frOpened");
			document.getElementById("el_visceri_cont").classList.remove("elOpened");
		}
		if(n != 'muscoli'){
			document.getElementById("fr_muscoli").classList.remove("frOpened");
			document.getElementById("el_muscoli_cont").classList.remove("elOpened");
		}
	},
	swElOssa: function(){
		this.chEls('ossa');
		document.getElementById("fr_ossa").classList.toggle("frOpened");
		document.getElementById("el_ossa_cont").classList.toggle("elOpened");
	},
	swElVisceri: function(){
		this.chEls('visceri');
		document.getElementById("fr_visceri").classList.toggle("frOpened");
		document.getElementById("el_visceri_cont").classList.toggle("elOpened");
	},
	swElMuscoli: function(forza=false){
		if(!muscleView && !forza)MODELLO.swMuscle(1);
		this.chEls('muscoli');
		document.getElementById("fr_muscoli").classList.toggle("frOpened");
		document.getElementById("el_muscoli_cont").classList.toggle("elOpened");
	},
	
	setOp: function(livello, op){
		return document.getElementById("p_"+livello.toLowerCase()).dataset.op = op * 1;
	},
	getOp: function(livello){
		return document.getElementById("p_"+livello.toLowerCase()).dataset.op * 1;
	},
	
	filtra: function(el){
		var t = el.id.replace("filtro_","");
		var d = el.value.trim().toLowerCase();
		var els = document.getElementById("el_"+t).getElementsByTagName("p");
		
		for(let p=0;p<els.length;p++){
			if(els[p].innerText.toLowerCase().indexOf(d)>-1 || d=='')els[p].classList.remove("elNasc");
			else els[p].classList.add("elNasc");
		}
		if(d!='')document.getElementById("ch_"+t).classList.add("visChFiltro");
		else document.getElementById("ch_"+t).classList.remove("visChFiltro");
	},
	annullaFiltro: function(el){
		var t = el.id.replace("ch_","");
		document.getElementById("filtro_"+t).value='';
		MENU.filtra(document.getElementById("filtro_"+t));
	},
	addSelected: function(el,C){
		globals.pezziSelezionati.push(el.id);
		var html = document.getElementById("contSelected").innerHTML;
		html += '<p id="SEL_'+el.id+'" class="sel'+C+'" onClick="document.getElementById(\''+el.id+'\').click();">'+stripslashes(TXT(""+el.id))+'</p>';
		document.getElementById("contSelected").innerHTML = html;
	},
	removeSelected: function(el){
		var element = document.getElementById("SEL_"+el.id);
		element.parentNode.removeChild(element);
		removeA(globals.pezziSelezionati, el.id);
		if(!globals.pezziSelezionati.length)document.getElementById("elencoSelected").classList.remove("visSch");
	},
	verSelected: function(){
		if(globals.pezziSelezionati.length){
			document.getElementById("p_selected").classList.add("visBtn");
			document.getElementById("p_pins").classList.add("visBtn");
		}else{
			document.getElementById("p_selected").classList.remove("visBtn");
			document.getElementById("p_pins").classList.remove("visBtn");
		}
	},
	visSelected: function(){
		this.chiudiMenu("elencoSelected");
		document.getElementById("elencoSelected").classList.toggle("visSch");
		MENU.comprimiIcone(true);
	},
	chiudiAllSelected: function(){
		var els = document.getElementById("elencoSelected").getElementsByTagName("p");
		var tot = els.length;
		var e = 0;
		for(let p=0;p<tot;p++){
			if(els[e].id.indexOf("SEL_Muscolo_") == -1)document.getElementById(els[e].id).click();
			else{
				document.getElementById(els[e].id.replace("SEL_","")).classList.remove("p_viscSel");
				e++;
			}
		}
		try{ if(globals.modello.livelli.indexOf("muscoli") > -1)MODELLO.tuttiMuscoli(); }catch(err){}
		document.getElementById("contSelected").innerHTML='';
		globals.pezziSelezionati = [];
		if(document.getElementById("elencoSelected").className.indexOf("visSch") > -1)MENU.visSelected();
		MENU.verSelected();
	},
	attBtnCentro: function(){
		document.getElementById("p_centro").classList.add("centroAtt");
	},
	disBtnCentro: function(){
		document.getElementById("p_centro").classList.remove("centroAtt");
	},
	visImpostazioni: function(){
		if(smartMenu)SCHEDA.chiudiElenco();
		MENU.chiudiMenu("impostazioni");
		document.getElementById("impostazioni").classList.toggle("visSch");
		//document.getElementById("lingueSelect").value = globals.siglaLingua;
		if(document.getElementById("impostazioni").classList.contains("visSch")){
			MENU.icoSelected = document.getElementById("p_impostazioni");
			MENU.icoSelected.classList.add("p_sel");
		}else MENU.desIcona();
		MENU.comprimiIcone(true);
	},
	visInfolingue: function(){
		MENU.chiudiMenu("infolingue");
		visLoader("");
		document.getElementById("infolingue").classList.toggle("visSch");
		if(document.getElementById("infolingue").className.indexOf("visSch") > -1){
			visLoader('');
		}else{
			nasLoader();
		}
	},
	visStampa: function(){
		MENU.chiudiMenu("stampa");
		document.getElementById("stampa").classList.toggle("visSch");
	},
	visFeedback: function(){
		MENU.chiudiMenu("feedback");
		document.getElementById("feedback").classList.toggle("visSch");
		if(document.getElementById("feedback").className.indexOf("visSch") > -1){
			document.feedbackForm.Nominativo.value = "";
			document.feedbackForm.Email.value = "";
			document.feedbackForm.Oggetto.value = "";
			document.feedbackForm.Messaggio.value = "";
			if(LOGIN.logedin()){
				document.feedbackForm.Nominativo.value = DB.login.data.Nominativo;
				document.feedbackForm.Email.value = DB.login.data.Email;
			}
			visLoader('');
		}else{
			nasLoader();
		}
	},
	visColori: function(){
		MENU.chiudiMenu("colori");
		visLoader("");
		document.getElementById("colori").classList.toggle("visSch");
		var els = document.getElementById("colSel").getElementsByTagName("span");
		for(let i = 0; i<els.length; i++){
			if(localStorage.colore == 2-i)els[i].classList.add("cSel");
			else els[i].classList.remove("cSel");
		}
		var els = document.getElementById("skinSel").getElementsByTagName("span");
		for(let i = 0; i<els.length; i++){
			els[i].classList.remove("cSel");
		}
		if(localStorage.tipoPelle == '')els[0].classList.add("cSel");
		if(localStorage.tipoPelle == '_mulatta')els[1].classList.add("cSel");
		if(localStorage.tipoPelle == '_nera')els[2].classList.add("cSel");
		
		var els = document.getElementById("sizeSel").getElementsByTagName("b");
		for(let i = 0; i<els.length; i++){
			if(localStorage.textSize == els[i].dataset.value)els[i].classList.add("a_SEL");
			else els[i].classList.remove("a_SEL");
		}
		
		var els = document.getElementById("pointerSel").getElementsByTagName("b");
		for(let i = 0; i<els.length; i++){
			els[i].classList.remove("a_SEL");
			els[i].classList.remove("t_DES");
		}
		if(!mouseDetect)els[0].classList.add("t_DES");
		if(!touchDetect)els[1].classList.add("t_DES");
		if(mouseDetect && touchDetect){
			if(__(localStorage.pointerType,'') == 'MOUSE')els[0].classList.add("a_SEL");
			else els[1].classList.add("a_SEL");
		}else{
			if(mouseDetect)els[0].classList.add("a_SEL");
			else els[1].classList.add("a_SEL");
		}
		
		if(document.getElementById("colori").className.indexOf("visSch") > -1)visLoader('');
		else nasLoader();
	},
	visNotifiche: function(){
		if(!LOGIN.logedin()){
			ALERT(TXT("ErroreUtenteNonConnesso"));
			return false;
		}else{
			MENU.chiudiMenu("notifiche");
			visLoader("");
			document.getElementById("notifiche").classList.toggle("visSch");
			if(document.getElementById("notifiche").className.indexOf("visSch") > -1){
				visLoader('');
				NOTIFICHE.dwnl_notifiche();
			}else{
				nasLoader();
			}
		}
	},
	visDispositivi: function( jsn ){
		visLoader("");
		document.getElementById("dispositivi").classList.add("visSch");
		document.getElementById("dispositivi").classList.remove("blur");
		visLoader('');
		DISPOSITIVI.carica(jsn);
	},
	visFeatures: function( forza=false ){
		var maxDate = new Date("2023-09-01").getTime();
		var now = new Date().getTime();
		if(	(!__(localStorage.getItem("no_info_features_"+verApp.replace(".","_")),'') &&
			!__(MENU["no_info_features_"+verApp.replace(".","_")],false) &&
			LOGIN.logedin() &&
			maxDate>now) || forza ){
			document.getElementById("contFeatures").innerHTML = stripslashes(TXT("features"));
			if(forza){
				visLoader("");
				MENU.chiudiMenu("features");
			}
			var tmRit = 6500;
			if(forza)tmRit = 10;
			setTimeout(function(){
				visLoader("");
				document.getElementById("features").classList.add("visSch");
				setTimeout(function(){document.getElementById("features").style.opacity = 1;},200);
			},tmRit);
			MENU["no_info_features_"+verApp.replace(".","_")] = true;
		}
	},
	visBackups: function(){
		if(!LOGIN.logedin()){
			ALERT(TXT("ErroreUtenteNonConnesso"));
			return false;
		}else{
			MENU.chiudiMenu("backups");
			visLoader("");
			document.getElementById("backups").classList.toggle("visSch");
			if(document.getElementById("backups").className.indexOf("visSch") > -1){
				visLoader('');
				BACKUPS.car_backups();
			}else{
				nasLoader();
			}
		}
	},
	visCommunity: function(){
		if(!LOGIN.logedin()){
			ALERT(TXT("ErroreUtenteNonConnesso"));
			return false;
		}else{
			MENU.chiudiMenu("community");
			visLoader("");
			document.getElementById("community").classList.toggle("visSch");
			if(document.getElementById("community").className.indexOf("visSch") > -1){
				visLoader('');
			}else{
				nasLoader();
			}
		}
	},
	visAgenda: function( data, mantieni ){
		if(typeof(mantieni) == 'undefined')var mantieni = false;
		var mod = SCHEDA.verificaSchedaRet();
		if(!document.getElementById("ag").classList.contains("visSch") || mantieni){
			CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!mod,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
				var tm=10;
				if(mod)tm=200;
				if(smartMenu)SCHEDA.chiudiElenco();
				MENU.chiudiMenu("ag");
				endChangeDetection();
				SCHEDA.scaricaScheda();	
				setTimeout( function(data){
					document.getElementById("ag").classList.add("visSch");
					MENU.icoSelected = document.getElementById("p_agenda");
					MENU.icoSelected.classList.add("p_sel");
					if(typeof(data) == 'undefined')var data = oggi;
					else data = new Date(data);
					HTML = 	'<div id="cont_sceltaAppuntamento">' +
							'</div>' +
							'<div id="agendaPlaceHolder">' +
							'</div>' +
							'<div class="l"' +
							'	 style="height:1px !important;"' +
							'	 data-d="'+(data*1)+'">' +
							'</div>';
					document.getElementById("agTesto").innerHTML = HTML;
					agenda.apri(data,document.getElementById("agendaPlaceHolder"),null,document.getElementById("agendaPlaceHolder"));
					MENU.comprimiIcone(true);
					rimuoviLoading(document.getElementById("ag"));
				}, 10, data );
			}});
		}else{
			SWIPE.dismis();
			if(smartMenu)SCHEDA.chiudiElenco();
			MENU.chiudiMenu("ag");
			document.getElementById("ag").classList.remove("visSch");
			MENU.desIcona();
			MENU.comprimiIcone(true);
			rimuoviLoading(document.getElementById("ag"));
			document.getElementById("agTesto").innerHTML = '';
		}
	},
	setNotLogged: function(){
		setTimeout( function(){
			if(document.getElementById("notLogged").classList.contains("visSch")){
				MENU.visLogin();
			}
		}, 200 );
	},
	closeNotLogged: function(){
		document.getElementById("notLogged").classList.remove("visSch");
	},
	
	visVersione: function(){
		MENU.chiudiMenu("versione");
		visLoader("");
		document.getElementById("versione").classList.toggle("visSch");
		if(document.getElementById("versione").className.indexOf("visSch") > -1){
			visLoader('');
			//document.getElementById("loader").addEventListener("mouseup",MENU.visVersione,false);
		}else{
			nasLoader();
			//document.getElementById("loader").removeEventListener("mouseup",MENU.visVersione,false);
		}
	},
	visLogin: function(){
		MENU.chiudiMenu("login");
		visLoader("");
		document.getElementById("login").classList.toggle("visSch");
		document.getElementById("login").classList.remove("popup_back");
		document.getElementById("stayConnected").checked = eval(__(localStorage.RimaniConnesso,'false'));
		LOGIN.swVisPwd(true);
		LOGIN.attivaX();
		var USRprovv=DB.login.data.UsernameU;
		if(typeof(USRprovv)=='undefined')USRprovv='';
		if(!USRprovv.trim() && mouseDetect && !touchable)document.getElementById("USR").focus();
	},
	visRegistrazione: function(){
		if(!onlineVersion && (iPad || iPhone))return;
		MENU.chiudiMenu("registrazione");
		visLoader("");
		document.getElementById("registrazione").classList.toggle("visSch");
		var A = document.getElementById("divTrattamentoDati").getElementsByTagName("a")[0];
		A.href=CONN.linkPrivacy+"?siglaLingua="+globals.siglaLingua;
		A.target = H.target;
		if(mouseDetect && !touchable)document.registrazioneForm.Nominativo.focus();
	},
	visImpset: function( archivi=false ){
		MENU.chiudiMenu("impset");
		visLoader("");
		document.getElementById("impset").classList.toggle("visSch");
		document.getElementById("impset").classList.toggle("impSet",!archivi);
		if(!archivi){
			try{ SET.popolaImpSet(); }catch(err){}
		}else{
			MENU.popolaImpSet();
		}
	},
	salvaImpSet: function(){
		var pass = true;
		if(LOGIN.logedin()){
			// se NON è una versione FREE
			var pwd = document.getElementById("patientPwdField");
			if(pwd.classList.contains("visSch")){ // se è presente il campo PWD
				if(!pwd.value.trim()){ // se è vuota
					ALERT(TXT("PatientPwdAlert"));
					return;
				}
				if(MD5(pwd.value)!=DB.login.data.PasswordU){ // verifico che la password corrisponda
					ALERT(TXT("PatientPwdError"));
					return;
				}
			}
		}
		// confirm per salvare
		if(!LOGIN._frv()){
			DB.login.data.password_pazienti = '0';
			if(document.getElementById("patientPwdCheck").checked)DB.login.data.password_pazienti = '1';
		}
		var naming = '';
		if(document.getElementById("t_OLISTICO").classList.contains("a_SEL"))naming = 'O';
		if(document.getElementById("t_SHIATSU").classList.contains("a_SEL"))naming = 'S';
		localStorage.tipo_utilizzo = naming;
		DB.login.data.valuta = document.getElementById("valuta").value;
		DB.login.data.sistema_misure = document.getElementById("sistema_misure").value;
		
		var JSNPOST = {
			password_pazienti: DB.login.data.password_pazienti,
			valuta: DB.login.data.valuta,
			sistema_misure: DB.login.data.sistema_misure
		}
		document.getElementById("impset").classList.add("popup_back");
		if(CONN.getConn() && LOGIN.logedin()!=''){
			CONN.caricaUrl(	"utente_parametri_up.php",
							"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
							"MENU.ret_salvaImpSet");
		}else MENU.ret_salvaImpSet('OK');

	},
	ret_salvaImpSet: function( txt ){
		document.getElementById("impset").classList.remove("popup_back");
		MENU.chiudiImpSet();
		if(txt!='OK'){
			ALERT(TXT("ErroreGenerico"));
			return;
		}
		MENU.updateNaming();
		localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login)).then(function(){ // salvo il DB
			
		});
	},
	updateNaming: function(){
		document.getElementById("pulsante_pazienti").innerHTML = LINGUE.convPaziente(TXT("ElPazienti"));
		PAZIENTI.caricaPazienti();
	},
	chiudiImpSet: function(){
		document.getElementById("contImpset").innerHTML = '';
		document.getElementById("labelImpset").getElementsByTagName("b")[0].innerHTML = '';
		MENU.chiudiMenu();
	},
	popolaImpSet: function(){
		var HTML_imp = 
			'<p id="patientSel">' +
            '	<i>'+TXT("PatientType")+':</i>' +
            '	<span>' +
            '		<b id="t_MEDICO" onClick="MENU.setPatientType(\'M\');"' +
			((!__(localStorage.tipo_utilizzo))?' class="a_SEL"':'') +
			'>'+TXT("_UTILIZZO_P")+'</b>' +
            '		<b id="t_OLISTICO" onClick="MENU.setPatientType(\'O\');"' +
			((__(localStorage.tipo_utilizzo=='O'))?' class="a_SEL"':'') +
			'>'+TXT("_UTILIZZO_C")+'</b>' +
            '		<b id="t_SHIATSU" onClick="MENU.setPatientType(\'S\');"' +
			((__(localStorage.tipo_utilizzo=='S'))?' class="a_SEL"':'') +
			'>'+TXT("_UTILIZZO_S")+'</b>' +
            '	</span>' +
            '</p>';

			

		var valuta = __(DB.login.data.valuta,'EUR');
		var sistema_misure = __(DB.login.data.sistema_misure,'i');
		var elenco = {};
		for(v in DB.INT.valute){
			elenco[v] = DB.INT.valute[v].simbolo+" ("+DB.INT.valute[v][globals.siglaLingua]+")";
		}
		HTML_imp += H.r({	t: "s", 
							name: "valuta",
							value: valuta,
							opts: elenco,
							label: TXT("Valuta"),
							classRiga: "patientValuta" });

		HTML_imp += H.r({	t: "s", 
							name: "sistema_misure",
							value: sistema_misure,
							opts: { "i":TXT("SistemaMisureMetrico"), "a":TXT("SistemaMisureImperiale") },
							label: TXT("SistemaMisure"),
							classRiga: "patientMisura" });
							
		if(LOGIN.logedin() && DB.login.data.PasswordU)HTML_imp += 
			'<p id="patientPwd">' +
            '	<i>'+TXT("PatientPwd")+':</i>' +
            '	<span>' +
            '		<input type="checkbox" id="patientPwdCheck" onClick="MENU.checkPatientPwd(this);"' +
			((__(DB.login.data.password_pazienti,'0')=='1')?' checked':'') +
			'> '+ stripslashes(TXT("PatientPwdTxt"))+
            '		<input type="password" id="patientPwdField" disabled="true">' +
            '	</span>' +
            '</p>';

		HTML_imp += 
			'<div style="margin-top:30px;">' +
			'	<span class="annullaBtn" onclick="MENU.chiudiImpSet();">'+TXT("Annulla")+'</span>' +
			'	<span class="submitBtn" onclick="MENU.salvaImpSet();">'+TXT("Salva")+'</span>' +
			'</div>';
		document.getElementById("labelImpset").getElementsByTagName("b")[0].innerHTML = TXT("ImpostazioniArchivi");
		document.getElementById("contImpset").innerHTML = HTML_imp;
	},
	checkPatientPwd: function( el ){
		if(el.checked != (__(DB.login.data.password_pazienti,'0')=='1')){
			document.getElementById("patientPwdField").classList.add("visSch");
			document.getElementById("patientPwdField").focus();
			document.getElementById("patientPwdField").disabled = false;
		}else{
			document.getElementById("patientPwdField").classList.remove("visSch");
			document.getElementById("patientPwdField").disabled = true;
		}
	},
	setPatientType: function( type ){
		var contr = '';
		if(type=='M'){
			document.getElementById("t_OLISTICO").classList.remove("a_SEL");
			document.getElementById("t_MEDICO").classList.add("a_SEL");
			document.getElementById("t_SHIATSU").classList.remove("a_SEL");
			contr = '';
		}
		if(type=='O'){
			document.getElementById("t_OLISTICO").classList.add("a_SEL");
			document.getElementById("t_MEDICO").classList.remove("a_SEL");
			document.getElementById("t_SHIATSU").classList.remove("a_SEL");
			contr = 'true';
		}
		if(type=='S'){
			document.getElementById("t_OLISTICO").classList.remove("a_SEL");
			document.getElementById("t_MEDICO").classList.remove("a_SEL");
			document.getElementById("t_SHIATSU").classList.add("a_SEL");
			contr = 'shiatsu';
		}
		//if(__(localStorage.tipo_utilizzo) != contr)ALERT(TXT("AlertNecessarioRiavvio"));
	},
	patientPwdConf: function(){
		var pwd = document.getElementById("patientPwdRequest");
		if(!pwd.value.trim()){ // se è vuota
			ALERT(TXT("PatientPwdAlert"));
			return;
		}
		if(MD5(pwd.value)!=DB.login.data.PasswordU){ // verifico che la password corrisponda
			ALERT(TXT("PatientPwdError"));
			return;
		}
		MENU.pwdOK = true;
		document.getElementById("lista_base").classList.remove("noPwd");
		document.getElementById("patientPwdRequest").type = 'text';
	},
	
	visArchives: function(){
		// verifico le autorizzazioni
		if(!DB.login.data.auths.length){
			setTimeout(function(){
				ALERT(TXT("MsgFunzioneSoloPay"));
			},100);
			return;
		}
		// --------------------------
		MENU.chiudiMenu("archives");
		visLoader("");
		document.getElementById("archives").classList.toggle("visSch");
		if(document.getElementById("archives").className.indexOf("visSch") > -1){
			visLoader('');
			PH.apriArchives();
		}else{
			PH.chiudiArchives();
			nasLoader();
		}
	},
	
	visPurchases: function(){
		if(!PURCHASES.initiated)PURCHASES.init();
		MENU.chiudiMenu("purchases");
		visLoader("");
		document.getElementById("purchases").classList.toggle("visSch");
		if(document.getElementById("purchases").className.indexOf("visSch") > -1){
			visLoader('');
		}else{
			nasLoader();
		}
	},
	
	stampaStage: function(){
		if(!DB.login.data.auths.length){
			setTimeout(function(){
				ALERT(TXT("MsgFunzioneSoloPay"));
			},100);
			return;
		}
		// --------------------------
		MENU.visStampa();
		document.body.classList.add("bodyStampa");
		var rapp = window.innerWidth / window.innerHeight;
		var bw = 28;
		var bh = 21;
		if(rapp > bw/bh ){
			var w = window.innerWidth;
			var h = (window.innerWidth * bh ) / (bw+2);
		}else{
			var h = window.innerHeight+210;
			var w = (window.innerHeight * (bw+10) ) / bh;
		}
		camera.aspect =  w / h;
		camera.updateProjectionMatrix();
		renderer.setSize( w, h );
		render();
		setTimeout(function(){
			//console.log(Canvas2Img());
			document.getElementById("container").getElementsByTagName("canvas")[0].style.marginLeft = '-400px';
			if(isMac)document.documentElement.style.position = 'relative'; // aggiunto per MAC
			window.print();
			if(isMac)document.documentElement.style.position = 'fixed';
			document.body.classList.remove("bodyStampa");
			onWindowResize();
			setTimeout(function(){MENU.chiudiMenu();},500);
		},500);
	},
	
	visMM: function( id ){
		MENU.mnMobOp = document.getElementById(id)
		MENU.mnMobOp.classList.toggle("visSch");
	},
	nasMM: function(){
		if(MENU.mnMobOp)MENU.mnMobOp.classList.remove("visSch");
		MENU.mnMobOp = null;
	},
	
	espandiIcone: function(){
		var schedaModificaLato = false;
		if(	document.getElementById("scheda").classList.contains("schLato") &&
			document.getElementById("scheda_testo").querySelector(".formBtn") )schedaModificaLato = true;
		if(!MENU.icoSelected && !schedaModificaLato && !document.getElementById("scheda").classList.contains("visSch")){
			MENU.tmIcone = setTimeout( function(){
				document.getElementById("icone").classList.add("iconeTrans");
				document.getElementById("icone").classList.add("iconeEspanse");
			}, 700 );
		}
	},
	comprimiIcone: function( netto=false ){
		if(netto){
			MENU.inizio = false;
			MENU.setTT();
		}
		if(!MENU.inizio){
			var tm = 0;
			if(!netto)tm = 300;
			clearTimeout(MENU.tmIcone);
			document.getElementById("icone").classList.remove("iconeEspanse");
			setTimeout( function(){
				document.getElementById("icone").classList.remove("iconeTrans");
			}, tm );
		}
	},
	setTT: function(){
		// verifico i tooltips del menu
		var divs = document.getElementById("icone").getElementsByTagName("div");
		for(let i=0;i<divs.length;i++){
			var labels = divs[i].getElementsByTagName("i");
			if(labels.length){
				if((MENU.icoSelected || document.getElementById("scheda").classList.contains("visSch")) && MENU.icoSelected!=divs[i]){
					divs[i].onmouseenter = function(){
						MENU.visTT(this);
					}
					divs[i].onmouseleave = function(){
						MENU.nasTT();
					}
				}else{
					divs[i].onmouseenter = '';
					divs[i].onmouseleave = '';
				}
			}
		}
	},
	visTT: function( el ){
		if(touchable)return;
		if(!MENU.icoSelected &&  !document.getElementById("scheda").classList.contains("visSch"))return;
		txt = el.getElementsByTagName('i')[0].innerHTML;
		if(!txt && el.getElementsByTagName('i'))txt = el.getElementsByTagName('i')[1].innerHTML;
		document.getElementById("tooltipmenu_txt").innerHTML = txt;
		document.getElementById("tooltipmenu").classList.add("tooltipmenuVis");
		document.getElementById("tooltipmenu").style.left='48px';
		document.getElementById("tooltipmenu").style.top=(tCoord(el,'y')+15)+'px';
	},
	nasTT: function(){
		document.getElementById("tooltipmenu").classList.remove("tooltipmenuVis");
		document.getElementById("tooltipmenu_txt").innerHTML='';
		document.getElementById("tooltipmenu").style.left='-500px';
		document.getElementById("tooltipmenu").style.top='-500px';
	}
}


var DRAGGER = {
	// spostamento elementi
	elDrag: null,
	elCont: null,
	overEl: null,
	moved: false,
	posIni: {x: -1, y: -1},
	posAtt: {x: -1, y: -1},
	diffIni: {x: 0, y: 0},
	funct: '',
	tmAtt: null,
	tmScroll: null,
	att: false,
	pushPos: '',
	overPH: false,
	startDrag: function( el, funct, cont ){
		if(DRAGGER.elDrag){
			DRAGGER.elDrag = null;
			return;
		}
		DRAGGER.posIni.x = touchable ? event.touches[ 0 ].pageX : event.clientX;
		DRAGGER.posIni.y = touchable ? event.touches[ 0 ].pageY : event.clientY;
		var target = el;
		while(target.tagName!='HTML' && target.id!="scheda_testo"){
			target = target.parentElement;
		}
		if(touchable && target.tagName!='HTML'){
			try{
				if(	!document.elementFromPoint(DRAGGER.posIni.x,DRAGGER.posIni.y).classList.contains("grabElement") && 
					!document.elementFromPoint(DRAGGER.posIni.x,DRAGGER.posIni.y).classList.contains("grabBtn")){
					return;
				}
			}catch(error){}
		}
		DRAGGER.posAtt = DRAGGER.posIni;
		document.getElementById("lb_move").classList.add("visSch");
		document.getElementById("lb_move").classList.add(el.dataset.dragClass);
		
		if(!touchable){
			window.addEventListener("mouseup", DRAGGER.stopDrag ,false);
			window.addEventListener("mousemove", DRAGGER.moveDrag ,false);
		}else{
			window.addEventListener("touchend", DRAGGER.stopDrag ,false);
			window.addEventListener("touchmove", DRAGGER.moveDrag ,false);
		}
		DRAGGER.diffIni = {
			x: DRAGGER.posIni.x-(tCoord(el)+(el.scrollWidth*.5)),
			y: DRAGGER.posIni.y-(tCoord(el,'y')+(el.scrollHeight*.5))
		}
		if(touchable){
			DRAGGER.tmAtt = setTimeout(function(){
				DRAGGER.att = true;
				DRAGGER.posLB();
				document.getElementById("scheda_testo").classList.add("noScroll");
			},1000);
		}else DRAGGER.att = true;
		DRAGGER.elDrag = el;
		DRAGGER.funct = funct;
		DRAGGER.elCont = cont;
	},
	moveDrag: function( event ){
		if(!DRAGGER.att){
			if(!touchable)return;
			else{
				clearTimeout(DRAGGER.tmAtt);
				DRAGGER.stopDrag();
				return;
			}
		}
		if(typeof(event)!='undefined'){
			DRAGGER.posAtt = {
				x: touchable ? event.changedTouches[ 0 ].pageX : event.clientX,
				y: touchable ? event.changedTouches[ 0 ].pageY : event.clientY
			}
		}
		if(	!DRAGGER.moved && 
			Math.abs(DRAGGER.posAtt.x-DRAGGER.posIni.x)<10 && 
			Math.abs(DRAGGER.posAtt.y-DRAGGER.posIni.y)<10)return;
		document.getElementById("lb_move").classList.remove("visSch");
		DRAGGER.posLB();
		try{
			if(document.elementFromPoint(DRAGGER.posAtt.x,DRAGGER.posAtt.y).id=='lb_placeholder'){
				document.getElementById("lb_move").classList.add("visSch");
				return;
			}
		}catch(error){ return; }
		if(DRAGGER.elDrag.dataset.dragType=='child')DRAGGER.elDrag.style.opacity = 0.5;
		if(DRAGGER.elDrag.dataset.dragType=='move')DRAGGER.elDrag.parentElement.classList.add("grabed");
		DRAGGER.moved = true;
		DRAGGER.outDrag();
		target = document.elementFromPoint(DRAGGER.posAtt.x,DRAGGER.posAtt.y);
		if(target){
			if(DRAGGER.elDrag.dataset.dragType=='child'){
				while(target.tagName!='HTML' && !(__(target.dataset.dragFamily) == __(DRAGGER.elDrag.dataset.dragFamily) && target.dataset.dragType == 'cont')){
					target = target.parentElement;
				}
			}
			if(DRAGGER.elDrag.dataset.dragType=='move'){
				while(target.tagName!='HTML' && !(__(target.dataset.dragFamily) == __(DRAGGER.elDrag.dataset.dragFamily) && target.dataset.dragType == 'move')){
					target = target.parentElement;
				}
			}
		}
		document.getElementById("lb_move").classList.add("visSch");
		if(target){
			if(target.tagName!='HTML'){
				if(DRAGGER.elDrag.dataset.dragType=='child'){
					DRAGGER.overDrag(target);
				}
				if(DRAGGER.elDrag.dataset.dragType=='move'){
					DRAGGER.pushDrag(target.parentElement);
				}
			}
		}
		if(touchable){
			clearInterval(DRAGGER.tmScoll);
			DRAGGER.tmScoll = null;
			if(DRAGGER.posAtt.y>window.innerHeight-50){
				if(!DRAGGER.tmScoll)DRAGGER.tmScoll = setInterval(function(){
					if(DRAGGER.att){
						document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+20);
						DRAGGER.moveDrag();
					}
				},100);
			}
			if(DRAGGER.posAtt.y<tCoord(document.getElementById("scheda_testo"),'y')+50){
				if(!DRAGGER.tmScoll)DRAGGER.tmScoll = setInterval(function(){
					if(DRAGGER.att){
						document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop-20);
						DRAGGER.moveDrag();
					}
				},100);
			}
		}
	},
	posLB: function(){
		if(!DRAGGER.att)return;
		var l = DRAGGER.posAtt.x-35;
		var t = DRAGGER.posAtt.y-50;
		if(touchable){
			l -= 35;
			t -= 40;
		}
		document.getElementById("lb_move").style.left = l + 'px';
		document.getElementById("lb_move").style.top = t + 'px';
	},
	noScroll: function(e){
		e.preventDefault();
	},
	stopDrag: function( event ){
		if(DRAGGER.att){
			DRAGGER.posAtt = {
				x: touchable ? event.changedTouches[ 0 ].pageX : event.clientX,
				y: touchable ? event.changedTouches[ 0 ].pageY : event.clientY
			}
		}
		if(!touchable){
			window.removeEventListener("mouseup", DRAGGER.stopDrag ,false);
			window.removeEventListener("mousemove", DRAGGER.moveDrag ,false);
		}else{
			clearTimeout(DRAGGER.tmScroll);
			DRAGGER.tmScroll = null;
			document.getElementById("scheda_testo").classList.remove("noScroll");
			window.removeEventListener("touchend", DRAGGER.stopDrag ,false);
			window.removeEventListener("touchmove", DRAGGER.moveDrag ,false);
		}
		document.getElementById("lb_move").classList.remove("visSch");
		document.getElementById("lb_move").classList.remove(DRAGGER.elDrag.dataset.dragClass);
		document.getElementById("lb_move").style.left = '-500px';
		document.getElementById("lb_move").style.top = '-500px';
		if(DRAGGER.elDrag.dataset.dragType=='child')DRAGGER.elDrag.style.opacity = 1;
		if(DRAGGER.elDrag.dataset.dragType=='move')DRAGGER.elDrag.parentElement.classList.remove("grabed");
		clearTimeout(DRAGGER.tmAtt);
		DRAGGER.tmAtt = null;
		if(DRAGGER.moved){
			if(DRAGGER.moved)eval(DRAGGER.funct + "(DRAGGER.elDrag,DRAGGER.overEl)");
			if(DRAGGER.overEl)DRAGGER.overEl.classList.remove("overDrag");
			DRAGGER.outDrag();
			DRAGGER.elDrag = null;
			DRAGGER.elCont = null;
			DRAGGER.overEl = null;
			DRAGGER.att = false;
			DRAGGER.moved = false;
			//DRAGGER.pushPos = '';
			DRAGGER.posIni = {x: -1, y: -1};
			DRAGGER.posAtt = {x: -1, y: -1};
			DRAGGER.diffIni = {x: 0, y: 0};
			DRAGGER.funct = '';
		}
	},
	overDrag: function( el ){
		if(DRAGGER.moved && el!=DRAGGER.elCont){
			DRAGGER.overEl = el;
			DRAGGER.overEl.classList.add("overDrag");
		}
	},
	pushDrag: function( el ){
		if(DRAGGER.moved && el!=DRAGGER.elCont){
			DRAGGER.overEl = el;
			var t = 0;
			var ST = 0;
			var b = 3;
			var a = 1;
			target = DRAGGER.overEl.parentElement;
			while(target.tagName!='HTML' && target.id!="scheda_testo"){
				target = target.parentElement;
			}
			if(target.tagName!='HTML'){
				ST = document.getElementById("scheda_testo").scrollTop;
				t = 1;
				if(target.parentElement.parentElement.classList.contains("scheda_procedura")){
					t = 3;
					b = 8;
					a = 3;
				}
			}else{
				ST = document.querySelector(".listaTrattamenti").scrollTop;
				if(smartphone){
					b += 2;
				}
			}
			if(DRAGGER.posAtt.y < (tCoord(DRAGGER.overEl,'y')+(DRAGGER.overEl.scrollHeight*.5)-ST)){
				DRAGGER.pushPos = 'before';
				t += tCoord(el,'y')-b-ST;
			}else{
				DRAGGER.pushPos = 'after';
				t += tCoord(el,'y')+el.scrollHeight-a-ST;
			}
			DRAGGER.overEl.classList.add("pushDrag_"+DRAGGER.pushPos);
			document.getElementById("lb_placeholder").classList.add("visSch");
			document.getElementById("lb_placeholder").style.left = tCoord(el)+5 + 'px';
			document.getElementById("lb_placeholder").style.top = t + 'px';
			document.getElementById("lb_placeholder").style.width = (el.scrollWidth-10) + 'px';
			if(t<tCoord(document.getElementById("scheda_testo"),'y'))document.getElementById("lb_placeholder").classList.remove("visSch");
		}
	},
	outDrag: function(){
		if(DRAGGER.moved && DRAGGER.overEl && !DRAGGER.overPH){
			DRAGGER.overEl.classList.remove("overDrag");
			DRAGGER.overEl.classList.remove("pushDrag_before");
			DRAGGER.overEl.classList.remove("pushDrag_after");
			DRAGGER.overEl = null;
			document.getElementById("lb_placeholder").classList.remove("visSch");
			document.getElementById("lb_placeholder").style.left = '-500px';
			document.getElementById("lb_placeholder").style.top = '-500px';
		}
	}
}

var SLIDER = {
	mIni: 0,
	xIni: 0,
	xAtt: 0,
	maxVal: 0,
	demolt: 1, // demoltiplicatore per il selettore rapido di anatomia
	livelloSel: '',
	slider: null,
	slider_btn: null,
	iniziaSlide: function(event,el){
		event.preventDefault();
		livello=el.parentElement.parentElement.id.replace("p_","");
		if(el.parentElement.parentElement.className.indexOf("disattLiv") > -1){
			if(livello == 'pelle' && muscleView)MODELLO.swMuscle(2);
			if(livello == 'muscoli' && !muscleView)MODELLO.swMuscle(1);
			//return;
		}
		SLIDER.livelloSel = livello;
		SLIDER.slider = document.getElementById("p_"+SLIDER.livelloSel).getElementsByClassName("slider")[0];
		SLIDER.slider_btn = document.getElementById("p_"+SLIDER.livelloSel).getElementsByClassName("slider_btn")[0];
		SLIDER.maxVal = SLIDER.slider.scrollWidth-SLIDER.slider_btn.scrollWidth;
		if(!touchable){
			document.body.addEventListener("mouseup",SLIDER.arrestaSlide,false);
			document.body.addEventListener("mousemove",SLIDER.moveSlider,false);
			document.body.addEventListener("mouseleave",SLIDER.arrestaSlide,false);
		}else{
			document.body.addEventListener("touchend", SLIDER.arrestaSlide, false );
			document.body.addEventListener("touchmove", SLIDER.moveSlider, false );	
		}
		var mL = "0"+SLIDER.slider_btn.style.marginLeft.replace("px","")+"";
		SLIDER.mIni = parseInt(mL);
		if(touchable){
			try{ SLIDER.xIni = event.touches[ 0 ].pageX; }catch(err){};
		}else SLIDER.xIni = event.clientX;
		if(WF()<600)document.getElementById("pulsanti_modello").classList.add("pLight");
		raycastDisable = true;
		if(SET)SET._applyLineMethod();
	},
	moveSlider: function(event){
		event.preventDefault();
		SLIDER.xAtt = touchable ? event.touches[ 0 ].pageX : event.clientX;
		var diffX = SLIDER.xAtt - SLIDER.xIni
		var mL = SLIDER.mIni/SLIDER.demolt + diffX;
		if(mL<0)mL = 0;
		if(mL>SLIDER.maxVal/SLIDER.demolt)mL = SLIDER.maxVal/SLIDER.demolt;
		SLIDER.slider_btn.style.marginLeft = (mL*SLIDER.demolt)+'px';
		var btnSlideAnat = document.getElementById("sliderAnatomia").querySelector(".slider").getElementsByTagName("div")[0];
		btnSlideAnat.style.marginLeft = (mL)+'px';
		perc=(mL/SLIDER.maxVal)*SLIDER.demolt;
		var l = SLIDER.livelloSel.substr(0,1).toUpperCase()+SLIDER.livelloSel.substr(1,SLIDER.livelloSel.length-1);
		MODELLO.op(l,perc);
		raycastDisable = true;
	},
	arrestaSlide: function(){
		if(!touchable){
			document.body.removeEventListener("mouseup",SLIDER.arrestaSlide,false);
			document.body.removeEventListener("mousemove",SLIDER.moveSlider,false);
			document.body.removeEventListener("mouseleave",SLIDER.arrestaSlide,false);
		}else{
			document.body.removeEventListener("touchend", SLIDER.arrestaSlide, false );
			document.body.removeEventListener("touchmove", SLIDER.moveSlider, false );	
		}
		document.getElementById("sliderAnatomia").classList.remove("visSch");
		SLIDER.sliderSel = '';
		SLIDER.slider = null;
		SLIDER.slider_btn = null;
		document.getElementById("pulsanti_modello").classList.remove("pLight");
		raycastDisable = false;
		SLIDER.demolt = 1;
	}
}