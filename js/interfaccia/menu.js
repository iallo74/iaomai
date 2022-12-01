var MENU = {
	wheeling: false,
	tmW: null,
	mnMobOp: null,
	setSel: null,
	icoSelected: null,
	tmIcone: null,
	inizio: true,
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
		for(var e=0;e<els.length;e++){
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
			for(var e=0;e<els.length;e++){
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
	chiudiMenu: function(n){
		if(n!="pulsanti_modello")document.getElementById("pulsanti_modello").classList.remove("visSch");
		if(n!="elencoSets")document.getElementById("elencoSets").classList.remove("visSch");
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
		if(n!="ag")document.getElementById("ag").classList.remove("visSch")
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
			!n &&
			!smartMenu ){
			MENU.icoSelected = document.getElementById("p_cartella");
			MENU.icoSelected.classList.add("p_sel");
			MENU.comprimiIcone(true);
		}
		//verAnimate();
	},
	visModello: function( forza ){
		if(typeof(forza) == 'undefined')var forza = false;
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
			for(m=0;m<mods.length;m++){
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
	visElencoSets: function( set ){
		if(typeof(set) == 'undefined')var set = '';
		MENU.chiudiMenu("elencoSets");
		CATALOGO.scriviElencoSets( set );
		SCHEDA.chiudiElenco();
		document.getElementById("elencoSets").classList.toggle("visSch");
		document.getElementById("elencoSets").style.marginTop = '-'+( document.getElementById("elencoSets").scrollHeight / 2 )+'px';
		if(document.getElementById("elencoSets").className.indexOf("visSch") > -1){
			visLoader('');
			//document.getElementById("loader").addEventListener("mouseup",MENU.visElencoSets,false);
		}else{
			nasLoader();
			//document.getElementById("loader").removeEventListener("mouseup",MENU.visElencoSets,false);
		}
		MENU.comprimiIcone(true);
		//verAnimate();
	},
	visSets: function(){
		var daScheda = (MENU.verOp() && !smartMenu);

		if(!daScheda)MENU.chiudiMenu("sets");
		else document.getElementById("p_cartella").classList.remove("p_sel");
		//document.getElementById("elenchi_titolo").classList.remove("clientAtt");
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
		//verAnimate();
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
	swElMuscoli: function(forza){
		if(typeof(forza) == 'undefined')var forza = false;
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
		
		for(p=0;p<els.length;p++){
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
		html += '<p id="SEL_'+el.id+'" class="sel'+C+'" onClick="document.getElementById(\''+el.id+'\').click();">'+stripslashes(Lingua(eval("TXT_"+el.id)))+'</p>';
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
		for(p=0;p<tot;p++){
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
		document.getElementById("lingueSelect").value = globals.siglaLingua;
		if(document.getElementById("impostazioni").classList.contains("visSch")){
			MENU.icoSelected = document.getElementById("p_impostazioni");
			MENU.icoSelected.classList.add("p_sel");
		}else MENU.desIcona();
		MENU.comprimiIcone(true);
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
			//document.getElementById("loader").addEventListener("mouseup",MENU.visFeedback,false);
		}else{
			nasLoader();
			//document.getElementById("loader").removeEventListener("mouseup",MENU.visFeedback,false);
		}
	},
	visColori: function(){
		MENU.chiudiMenu("colori");
		visLoader("");
		document.getElementById("colori").classList.toggle("visSch");
		var els = document.getElementById("colSel").getElementsByTagName("span");
		for(i = 0; i<els.length; i++){
			if(i == localStorage.colore)els[i].classList.add("cSel");
			else els[i].classList.remove("cSel");
		}
		var els = document.getElementById("skinSel").getElementsByTagName("span");
		for(i = 0; i<els.length; i++){
			els[i].classList.remove("cSel");
		}
		if(localStorage.tipoPelle == '')els[0].classList.add("cSel");
		if(localStorage.tipoPelle == '_mulatta')els[1].classList.add("cSel");
		if(localStorage.tipoPelle == '_nera')els[2].classList.add("cSel");
		
		if(document.getElementById("colori").className.indexOf("visSch") > -1){
			visLoader('');
			//document.getElementById("loader").addEventListener("mouseup",MENU.visColori,false);
		}else{
			nasLoader();
			//document.getElementById("loader").removeEventListener("mouseup",MENU.visColori,false);
		}
	},
	visNotifiche: function(){
		if(!LOGIN.logedin()){
			ALERT(Lingua(TXT_ErroreUtenteNonConnesso), true);
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
		visLoader('');
		DISPOSITIVI.carica(jsn);
	},
	visFeatures: function( forza ){
		if(typeof(forza)=='undefined')var forza = false;
		var maxDate = new Date("2022-04-15").getTime();
		var now = new Date().getTime();
		if(	(!__(localStorage.no_info_features,'') &&
			!__(MENU.no_info_features,false) &&
			LOGIN.logedin() &&
			maxDate>now) || forza ){
			if(forza){
				visLoader("");
				MENU.chiudiMenu("features");
			}
			var tmRit = 2500;
			if(forza)tmRit = 10;
			setTimeout(function(){
				visLoader("");
				document.getElementById("features").classList.add("visSch");
				setTimeout(function(){document.getElementById("features").style.opacity = 1;},200);
			},tmRit);
			MENU.no_info_features = true;
		}
	},
	visBackups: function(){
		if(!LOGIN.logedin()){
			ALERT(Lingua(TXT_ErroreUtenteNonConnesso), true);
			return false;
		}else{
			MENU.chiudiMenu("backups");
			visLoader("");
			document.getElementById("backups").classList.toggle("visSch");
			if(document.getElementById("backups").className.indexOf("visSch") > -1){
				visLoader('');
				//document.getElementById("loader").addEventListener("mouseup",MENU.visNotifiche,false);
				BACKUPS.car_backups();
			}else{
				nasLoader();
				//document.getElementById("loader").removeEventListener("mouseup",MENU.visNotifiche,false);
			}
		}
	},
	visCommunity: function(){
		if(!LOGIN.logedin()){
			ALERT(Lingua(TXT_ErroreUtenteNonConnesso), true);
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
			CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!mod,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
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
		LOGIN.attivaX();
		var USRprovv=DB.login.data.UsernameU;
		if(typeof(USRprovv)=='undefined')USRprovv='';
		if(!USRprovv.trim() && mouseDetect && !touchable)document.getElementById("USR").focus();
	},
	visRegistrazione: function(){
		MENU.chiudiMenu("registrazione");
		visLoader("");
		document.getElementById("registrazione").classList.toggle("visSch");
		var A = document.getElementById("divTrattamentoDati").getElementsByTagName("a")[0];
		A.href=CONN.linkPrivacy+"?siglaLingua="+globals.siglaLingua;
		A.target = H.target;
		if(mouseDetect && !touchable)document.registrazioneForm.Nominativo.focus();
	},
	visImpset: function(){
		MENU.chiudiMenu("impset");
		visLoader("");
		document.getElementById("impset").classList.toggle("visSch");
		try{ SET.popolaImpSet(); }catch(err){}
	},
	stampaStage: function(){
		if(!DB.login.data.auths.length){
			setTimeout(function(){
				ALERT(Lingua(TXT_MsgFunzioneSoloPay));
			},100);
			return;
		}
		// --------------------------
		MENU.visStampa();
		//scene.background = scene.userData.BGcolorPrint;
		document.body.classList.add("bodyStampa");
	  	//var bg = getPropCSS(document.body,"background-color");
		//document.body.style.backgroundColor = '#FFF';
		var rapp = window.innerWidth / window.innerHeight;
		var bw = 27;
		var bh = 21;
		if(rapp > bw/bh ){
			var w = window.innerWidth;
			var h = (window.innerWidth * bh ) / bw;
		}else{
			var h = window.innerHeight;
			var w = (window.innerHeight * bw ) / bh;
		}
		camera.aspect =  w / h;
		camera.updateProjectionMatrix();
		renderer.setSize( w, h );
		render();
		setTimeout(function(){
			//console.log(Canvas2Img());
			window.print();
			//scene.background = scene.userData.BGcolorScreen;
			document.body.classList.remove("bodyStampa");
			//document.body.style.backgroundColor = bg;
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
	comprimiIcone: function( netto ){
		if(typeof(netto) == 'undefined')var netto = false;
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
		for(i=0;i<divs.length;i++){
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