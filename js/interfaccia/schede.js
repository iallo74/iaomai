var SCHEDA = {
	aggancio: {
		tipo: 'sotto',
		libera: {
			x: -1,
			y: -1,
			w: -1,
			h: -1
		},
		sotto: {
			y: -1
		},
		lato: {
			w: -1
		}
	},
	locked: { // oggetto che memorizza la scheda aperta, per il controllo multidevice
		tab: '',
		idEl: 0
	},
	xMouseIni: 0,
	yMouseIni: 0,
	xIni: 0,
	yIni: 0,
	wIni: 0,
	hIni: 0,
	tIni: 0,
	htmlOr: '',
	htmlOr2: '',
	moving: false,
	xMouseAtt: 0,
	yMouseAtt: 0,
	wLimit: 800,
	hOpened: 200,
	schedaAperta: false,
	scheda2Aperta: false,
	classeAperta: '',
	functRitorno: '',
	memHrit: '',
	elencoSel: '',
	elencoSelSet: '',
	elencoSelBase: '',
	btnSel: null,
	noChiudi: false,
	formModificato: false,
	form: null,
	versoRedim: '',
	gapScheda: 16, /* 17 */
	ultimaCartella: '', // l'id della sottocartella aperta quando si clicca su una scheda (per smartMenu)
	finalFunct: null,
	initScheda: function(){
		if(!localStorage.schedaAggancio && !isTablet){
			SCHEDA.aggancio.tipo = 'lato';
			SCHEDA.aggancia(SCHEDA.aggancio.tipo);
		}
		if(!smartMenu && localStorage.schedaAggancio){
			SCHEDA.aggancio = JSON.parse(localStorage.schedaAggancio);
			SCHEDA.aggancia(SCHEDA.aggancio.tipo);
		}
		SCHEDA.verRedim();
		window.addEventListener("resize",function(){
			SCHEDA.verRedim();
		}, false);
	},
	caricaScheda: function( titolo,  		// titolo della scheda	
							html, 	 		// contenuto della scheda
							funct, 	 		// funzione da eseguire alla chiusura della scheda
							classe,  		// la classe della scheda (es. per il colore del titolo)
							ritorno, 		// indica se ci deve essere un ritorno ad un altra scheda (scrive su scheda_testo2 e visualizza il pulsante di ritorno) [ può contenere la funzione di ritorno ]
							espansa, 		// apre la scheda non compressa
							btn,     		// pulsante da accendere in caso di menu a elenco
							btnAdd,  		// aggiunte al pulsante
							codiceTranslate, // codice per il db traduzioni che visualizza il pulsante di google translate
							finalFunct		// funzione da eseguire alla fine del caricacmento della scheda
						   ){
							   
		/*
		// forzo il ritorno se la scheda principale è una scheda di modifica
		/*if(	document.getElementById("scheda_testo").querySelector(".formBtn") && 
			SCHEDA.schedaAperta ){
			ritorno = true;
			funct = '';
			
		}*/
		try{
			SET._caricaScheda({
				"funct": funct,
				"classe": classe,
				"ritorno": ritorno,
				"espansa": espansa
			});
		}catch(err){}
		
		document.getElementById("frSchSu").onclick = '';
		document.getElementById("frSchGiu").onclick = '';
		document.getElementById("frSch").className = '';
		document.getElementById("scheda").classList.remove("minimized");
		document.getElementById("scheda").classList.remove("schForm");
		
		if(document.getElementById("sc").dataset.funct != funct && !ritorno){ // eseguo la funzione salvata
			SCHEDA.noChiudi = true;
			try{
				eval(document.getElementById("sc").dataset.funct);
				document.getElementById("sc").dataset.funct = '';
			}catch(err){console.log(err);};
			SCHEDA.noChiudi = false;
		}
		
		if(typeof(funct)=='undefined')var funct = '';
		if(typeof(classe)=='undefined')var classe = '';
		if(typeof(ritorno)=='undefined')var ritorno = '';
		if(typeof(espansa)=='undefined')var espansa = false;
		if(typeof(btn)=='undefined')var btn = null;
		if(typeof(btnAdd)=='undefined')var btnAdd = '';
		if(typeof(codiceTranslate)=='undefined')var codiceTranslate = '';
		if(typeof(finalFunct)!='undefined')SCHEDA.finalFunct = finalFunct;
		
		if(SCHEDA.btnSel && !ritorno){
			SCHEDA.btnSel.classList.remove("elencoSel");
			SCHEDA.btnSel = null;
		}
		
		var nScheda='';
		if(ritorno){ // se è una scheda derivata
			
			if(SCHEDA.scheda2Aperta)SCHEDA.torna( true ); // se la scheda 2 è già aperta, prima eseguo il ritorno
			
			SCHEDA.functRitorno = ritorno;
			nScheda='2';
			document.getElementById("scheda").classList.add("schedaRitorno");
			document.getElementById("scheda_ritorno").getElementsByTagName("div")[0].innerHTML=document.getElementById("scheda_titolo").innerHTML;
			SCHEDA.memHrit = document.getElementById("scheda_testo").style.height;
			document.getElementById("scheda_ritorno").onclick = function() {
				if(!SCHEDA.moving)SCHEDA.torna();
			};
			SCHEDA.scheda2Aperta = true;
		}
		if(SCHEDA.classeAperta){
			let pC = SCHEDA.classeAperta.split(" ");
			for(let p in pC)document.getElementById("scheda").classList.remove(pC[p]);
		}
		if(classe){
			let pC = classe.split(" ");
			for(let p in pC)document.getElementById("scheda").classList.add(pC[p]);
		}
		if(!ritorno){
			SCHEDA.classeAperta = classe;
			SCHEDA.torna();
		}
		
		if(html){
			if(html.indexOf(' class="translatable"')==-1)html = '<div class="translatable">'+html+'</div>';
			html = '<div class="scheda_stampa">'+html+'</div>';
		}
		
		if(codiceTranslate && LINGUE.googleLanguages.length && CONN.getConn() && !LINGUE.getAi()){
			var html_langs =
							'<div class="p_translate">' +
							'	<select id="languages" name="languages" onChange="LINGUE.googleTranslate(this.value,\''+codiceTranslate+'\');SCHEDA.swMenuScheda();">';
			var valSel = (LINGUE.googleLangSel)?LINGUE.googleLangSel:LINGUE.getSigla2();
			for(let l in LINGUE.googleLanguages){
				html_langs +=	'<option value="'+LINGUE.googleLanguages[l].sigla+'"';
				if(LINGUE.googleLanguages[l].sigla==valSel)html_langs += ' SELECTED';
				html_langs += '>'+LINGUE.googleLanguages[l].name+'</option>';
			}
			html_langs +=	'</select>' +
							'</div>';
			btnAdd = html_langs + btnAdd;
		}
		if(LINGUE.getAi()){
			var html_langs =
							'<div class="p_translate">' +
							'	<span id="languages" name="languages" onClick="MENU.visFeedback(\''+addslashes(TXT("signAiLang"))+'\',\'\',true);">'+TXT("btnAiLang")+'</span>';
			html_langs +=	'</select>' +
							'</div>';
			btnAdd = html_langs + btnAdd;
		}
		
		// inserisco il pulsante del menu (3 pallini)
		if(classe != "scheda_agenda" && classe != "scheda_video"  && classe != "scheda_ricerche" ){
			html =  '<div id="btnMenuScheda" onClick="SCHEDA.swMenuScheda();">' +
					'	<svg viewBox="0 0 25 36"><circle cy="11"></circle><circle cy="18"></circle>' +
					'	<circle cy="25"></circle></svg>' +
					'</div>' + html;
			document.getElementById("addBtnMenu").innerHTML = btnAdd;
		}
		
		document.getElementById("scheda_titolo").innerHTML=htmlEntities(titolo);
		document.getElementById("scheda_testo"+nScheda).innerHTML=html;
		//document.getElementById("scheda_testo"+nScheda).classList.remove("translated");
		
		if(trans_el = document.getElementById("scheda_testo"+nScheda).querySelector(".translatable")){
			SCHEDA["htmlOr"+nScheda] = trans_el.innerHTML;
		}
		
		document.getElementById("scheda").classList.add("visSch");
		document.getElementById("scheda_cont").classList.add("visSch");
		
		SCHEDA.schedaAperta = true;
		document.getElementById("elenchi").classList.add("noTesta");
		
		// imposto la funzione alla chiusura della scheda
		if(!nScheda && funct){ 
			document.getElementById("sc").dataset.funct=funct;
		}
		
		// imposto l'altezza della scheda
		if(smartMenu){
			SCHEDA.hOpened = window.innerHeight - 45;
			document.getElementById("scheda_testo").style.height = SCHEDA.hOpened+"px";
			document.getElementById("scheda_testo2").style.height = SCHEDA.hOpened+"px";
		}else if(espansa){
			if(SCHEDA.aggancio.tipo == 'sotto'){
				if(!SCHEDA.hOpened)SCHEDA.hOpened = 200;
				document.getElementById("scheda_testo").scrollTop = '0px';
			}
		}
		
		if(btn && !ritorno){
			SCHEDA.formModificato = false;
			if(SCHEDA.btnSel)SCHEDA.btnSel.classList.remove("elencoSel");
			SCHEDA.btnSel=btn;
			btn.classList.add("elencoSel");	
		}
		SCHEDA.verRedim();
		SCHEDA.verPosScheda();
		SCHEDA.setMenuDim();
		GUIDA.nasFumetto();
		SCHEDA.riapriScheda();
		SCHEDA.swMenuScheda('chiudi');
		MENU.comprimiIcone(true);
		if(!ritorno)document.getElementById("scheda_testo").scrollTo(0,0);
		if(codiceTranslate && LINGUE.googleLangSel && LINGUE.googleLangSel!=LINGUE.getSigla2()){
			LINGUE.googleTranslate(LINGUE.googleLangSel,codiceTranslate);
			document.getElementById("scheda_testo"+nScheda).querySelector(".scheda_stampa").style.opacity = 0;
		}else{
			LINGUE.addAiMsg();
			eval(SCHEDA.addFunct);
			SCHEDA.finalFunct = null;
		}
	},
	verificaSchedaRet: function(){
		formHasChanges();
		return SCHEDA.formModificato;
	},
	scaricaScheda: function( salvato ){
		if( SCHEDA.noChiudi )return;
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
						
			try{
				SET._scaricaScheda();
			}catch(err){}
			SCHEDA.addForm = 0;
			SCHEDA.form = null;
			SCHEDA.torna();
			document.getElementById("scheda").classList.remove("visSch");
			document.getElementById("scheda_cont").classList.remove("visSch");
			document.getElementById("scheda_titolo").innerHTML='';
			document.getElementById("scheda_testo").innerHTML='';
			document.getElementById("scheda_testo2").innerHTML='';
			document.getElementById("elenchi").classList.remove("noTesta");
			if(SCHEDA.classeAperta){
				let cls = SCHEDA.classeAperta.split(" ");
				for(let c in cls)document.getElementById("scheda").classList.remove(cls[c]);
			}
			SCHEDA.schedaAperta = false;
			SCHEDA.scheda2Aperta = false;
			SCHEDA.classeAperta = '';
			setTimeout(function(){ // eseguo la funzione salvata
				try{
					eval(document.getElementById("sc").dataset.funct);
					document.getElementById("sc").dataset.funct = '';
				}catch(err){};
			},200);
			if(SCHEDA.btnSel){
				SCHEDA.btnSel.classList.remove("elencoSel");
				SCHEDA.btnSel = null;
			}
			if(salvato)SCHEDA.msgSalvataggio(true);
			
			SCHEDA.espandiElenco();
			livello = 3;
			SCHEDA.setMenuDim();
		}});
	},
	nasScheda: function(){
		document.getElementById("scheda_testo").style.height = '0px';
		document.getElementById("scheda_testo2").style.height = '0px';
	},
	msgSalvataggio: function( generico = document.getElementById("scheda_testo") ){
		var el = document.body;
		var msg = document.createElement("DIV");
		msg.id='msgScheda';
		if(!document.getElementById('msgScheda'))el.appendChild(msg);
		msg.innerHTML = TXT("SchedaSalvata");
		document.getElementById('msgScheda').addEventListener( "mouseup", function(){
			try{el.removeChild(this);}catch(err){};
		}, false, el);
		setTimeout(function(){ msg.className = 'visMsg'; }, 200);
		setTimeout(function(){ msg.className = ''; }, 4000);
		setTimeout(function(){
			if(document.getElementById('msgScheda')){
				try{ el.removeChild(msg); }catch(err){}
			}
		}, 4500, el);
	},
	comprimiElenco: function(){
		document.getElementById("scheda").classList.add("compresso");
		document.getElementById("elenchi").classList.add("compresso");
		SCHEDA.verPosScheda();
	},
	espandiElenco: function(){
		document.getElementById("scheda").classList.remove("compresso");
		document.getElementById("elenchi").classList.remove("compresso");
		SCHEDA.verPosScheda();
	},
	aggancia: function(tipo){
		SCHEDA.aggancio.tipo = tipo;
		if(SCHEDA.aggancio.tipo == 'libera'){
			// sganciata
			if(SCHEDA.aggancio.libera.w == -1){
				if(WF()<550)SCHEDA.aggancio.libera.w = WF() - 30;
				else SCHEDA.aggancio.libera.w = 550;
				if(HF()<480)SCHEDA.aggancio.libera.h = HF() - 30;
				else SCHEDA.aggancio.libera.h = 480;
				SCHEDA.aggancio.libera.x = WF() - SCHEDA.aggancio.libera.w - 30;
				SCHEDA.aggancio.libera.y = HF() - SCHEDA.aggancio.libera.h - 30;
			}
			document.getElementById("scheda").classList.remove("h150")
			document.getElementById("scheda").style.left = SCHEDA.aggancio.libera.x + "px";
			document.getElementById("scheda").style.top = SCHEDA.aggancio.libera.y + "px";
			document.getElementById("scheda").style.width = SCHEDA.aggancio.libera.w + "px";
			document.getElementById("scheda_testo").style.height = (SCHEDA.aggancio.libera.h - SCHEDA.getMM()) + "px";
			document.getElementById("scheda_testo2").style.height = (SCHEDA.aggancio.libera.h - SCHEDA.getMM()) + "px";
			document.getElementById("scheda").classList.add("schLibera");
			document.getElementById("scheda").classList.remove("schLato");
			document.getElementById("elenchi").classList.remove("schLato");
		}
		if(SCHEDA.aggancio.tipo == 'sotto'){
			// agganciata SOTTO
			document.getElementById("scheda").style.left = "";
			document.getElementById("scheda").style.top = "";
			document.getElementById("scheda").style.width = "";
			
			var mm = 20;
			if(smartMenu)mm = 1;
			var h =(HF()-(SCHEDA.aggancio.sotto.y-SCHEDA.gapScheda)-SCHEDA.getMM()+mm);
			
			//document.getElementById("scheda").classList.remove("h150")
			document.getElementById("scheda_testo").style.height = h + 'px';
			document.getElementById("scheda_testo2").style.height = h + 'px';
			document.getElementById("scheda").classList.remove("schLibera");
			document.getElementById("scheda").classList.remove("schLato");
			document.getElementById("elenchi").classList.remove("schLato");
		}
		
		if(SCHEDA.aggancio.tipo == 'lato'){
			// agganciata a LATO
			if(SCHEDA.aggancio.lato.w == -1)SCHEDA.aggancio.lato.w = 500;
			document.getElementById("scheda").style.top = "0px";
			document.getElementById("scheda_testo").style.height = (HF() - SCHEDA.getMM()) + "px";
			document.getElementById("scheda_testo2").style.height = (HF() - SCHEDA.getMM()) + "px";
			document.getElementById("scheda").style.width = SCHEDA.aggancio.lato.w + "px";
			
			document.getElementById("scheda").classList.remove("h150")
			document.getElementById("scheda").classList.remove("schLibera");
			document.getElementById("scheda").classList.add("schLato");
			document.getElementById("elenchi").classList.add("schLato");
		}
		
		localStorage.schedaAggancio = JSON.stringify(SCHEDA.aggancio);
		SCHEDA.verRedim();
		SCHEDA.verPosScheda();
		SCHEDA.swMenuScheda('chiudi');
	},
	nascondiScheda: function(){
		document.getElementById("riapriTit").innerHTML = document.getElementById("scheda_titolo").innerHTML;
		document.body.classList.add("nasSch");
		onWindowResize();
		startAnimate();
		if(!globals.modello.cartella)cambiaModello(globals.set.modelli[0]);
	},
	riapriScheda: function(){
		if(document.body.classList.contains("nasSch")){
			document.body.classList.remove("nasSch");
			document.getElementById("riapriTit").innerHTML = '';
			document.getElementById("scheda_testo").style.height = (HF() - 47) + "px";
			document.getElementById("scheda_testo").style.height = (HF() - 47) + "px";
			onWindowResize();
			stopAnimate();
		}
	},
	
	
	iniziaMoveScheda: function( event, onTitle=false ){ // sposta la scheda libera o ridimansina quella sotto
		if(SCHEDA.aggancio.tipo == 'lato' && !onTitle)SCHEDA.iniziaRedimScheda( event, 'r', true )
		if(SCHEDA.aggancio.tipo == 'lato' || (SCHEDA.aggancio.tipo == 'sotto' && onTitle) || smartMenu)return;
		event.preventDefault();
		noAnimate = true;
		if(!touchable){
			document.body.addEventListener("mouseup",SCHEDA.arrestaMoveScheda,false);
			document.body.addEventListener("mousemove",SCHEDA.moveMoveScheda,false);
			document.body.addEventListener("mouseleave",SCHEDA.arrestaMoveScheda,false);
		}else{
			document.body.addEventListener("touchend", SCHEDA.arrestaMoveScheda, false );
			document.body.addEventListener("touchmove", SCHEDA.moveMoveScheda, false );	
		}
		if(SCHEDA.aggancio.tipo == 'libera'){
			SCHEDA.xIni = tCoord(document.getElementById("scheda"));
			SCHEDA.yIni = tCoord(document.getElementById("scheda"),'y');
		}
		if(SCHEDA.aggancio.tipo == 'sotto'){
			SCHEDA.tIni = parseInt("0"+document.getElementById("scheda_testo").style.height.replace("px","")+"");
		}
		if(SCHEDA.aggancio.tipo == 'lato'){
			SCHEDA.xIni = tCoord(document.getElementById("scheda"));
		}
		if(touchable){
			try{
				SCHEDA.xMouseIni = event.touches[ 0 ].pageX;
				SCHEDA.yMouseIni = event.touches[ 0 ].pageY;
			}catch(err){};
		}else{
			SCHEDA.xMouseIni = event.clientX;
			SCHEDA.yMouseIni = event.clientY;
		}
	},
	moveMoveScheda: function( event ){
		event.preventDefault();
		SCHEDA.xMouseAtt = touchable ? event.touches[ 0 ].pageX : event.clientX;
		SCHEDA.yMouseAtt = touchable ? event.touches[ 0 ].pageY : event.clientY;
		if(SCHEDA.aggancio.tipo == 'libera'){
			var x = SCHEDA.xIni+(SCHEDA.xMouseAtt - SCHEDA.xMouseIni);
			var y = SCHEDA.yIni+(SCHEDA.yMouseAtt - SCHEDA.yMouseIni);
			
			document.getElementById("scheda").style.left = x + 'px';
			document.getElementById("scheda").style.top = y + 'px';
			SCHEDA.verPosScheda();
			SCHEDA.moving = true;
		}
		if(SCHEDA.aggancio.tipo == 'sotto'){
			var h = SCHEDA.tIni-(SCHEDA.yMouseAtt - SCHEDA.yMouseIni);
			var mm = SCHEDA.getMM()-SCHEDA.gapScheda;
			if(h>HF()-mm)h = HF()-mm;
			if(document.getElementById("scheda").scrollHeight<=275){
				document.getElementById("scheda").classList.add("h150");
			}else{
				document.getElementById("scheda").classList.remove("h150");
			}
			
			if(h>5)SCHEDA.hOpened = h;
			else SCHEDA.hOpened = 200;
			document.getElementById("scheda_testo").style.height = h +'px';
			document.getElementById("scheda_testo2").style.height = h +'px';
			SCHEDA.memHrit = h + "px";
		}
		if(SCHEDA.aggancio.tipo == 'lato'){
			// non esiste
		}
		
		SCHEDA.verRedim();
	},
	arrestaMoveScheda: function( event ){
		event.preventDefault();
		var x = touchable ? SCHEDA.xMouseAtt : event.clientX;
		var y = touchable ? SCHEDA.yMouseAtt : event.clientY;
		if(globals.modello.cartella)noAnimate = false;
		animate();
		controlsM._MM = true
		if(SCHEDA.aggancio.tipo == 'libera'){
			SCHEDA.aggancio.libera.x = tCoord(document.getElementById("scheda"));
			SCHEDA.aggancio.libera.y = tCoord(document.getElementById("scheda"),'y');
			setTimeout(function(){ SCHEDA.moving = false; },300);
		}
		if(SCHEDA.aggancio.tipo == 'sotto'){
			if(SCHEDA.yMouseIni == y){
				h = "0"+document.getElementById("scheda_testo").style.height.replace("px","")+"";
				if(h==0)h=SCHEDA.hOpened;
				else h=0;
				document.getElementById("scheda_testo").style.height = h+'px';
				document.getElementById("scheda_testo2").style.height = h+'px';
				document.getElementById("scheda").classList.toggle("h150", (document.getElementById("scheda").scrollHeight<=275));
			}
			SCHEDA.aggancio.sotto.y = tCoord(document.getElementById("scheda"),'y');
		}
		if(SCHEDA.aggancio.tipo == 'lato'){
			// -----------DA FARE--------------
			SCHEDA.aggancio.lato.w = document.getElementById("scheda").scrollWidth;
		}
		localStorage.schedaAggancio = JSON.stringify(SCHEDA.aggancio);
		if(!touchable){
			document.body.removeEventListener("mouseup",SCHEDA.arrestaMoveScheda,false);
			document.body.removeEventListener("mousemove",SCHEDA.moveMoveScheda,false);
			document.body.removeEventListener("mouseleave",SCHEDA.arrestaMoveScheda,false);
		}else{
			document.body.removeEventListener("touchend", SCHEDA.arrestaMoveScheda, false );
			document.body.removeEventListener("touchmove", SCHEDA.moveMoveScheda, false );	
		}
	},
	
	iniziaRedimScheda: function( event, verso, fromMove=false ){
		if(SCHEDA.aggancio.tipo == 'lato')stopOnResize = true;
		SCHEDA.versoRedim = verso;
		var gapH = 0;
		var gapV = 0;
		
		if(SCHEDA.versoRedim.indexOf("l")>-1 || SCHEDA.versoRedim.indexOf("r")>-1)gapH = 5;
		if(SCHEDA.versoRedim.indexOf("t")>-1 || SCHEDA.versoRedim.indexOf("b")>-1)gapV = 5;
		if(SCHEDA.aggancio.tipo == 'lato' && !isTablet){
			stopOnResize = true;
			gapH = 27;
		}
		
		event.preventDefault();
		
		if(!touchable){
			document.body.addEventListener("mouseup",SCHEDA.arrestaRedimScheda,false);
			document.body.addEventListener("mousemove",SCHEDA.moveRedimScheda,false);
			document.body.addEventListener("mouseleave",SCHEDA.arrestaRedimScheda,false);
		}else{
			document.body.addEventListener("touchend", SCHEDA.arrestaRedimScheda, false );
			document.body.addEventListener("touchmove", SCHEDA.moveRedimScheda, false );	
		}
		
		SCHEDA.wIni = document.getElementById("scheda").scrollWidth;
		SCHEDA.hIni = document.getElementById("scheda").scrollHeight;
		SCHEDA.xIni = tCoord(document.getElementById("scheda"));
		SCHEDA.yIni = tCoord(document.getElementById("scheda"),'y');
		
		if(touchable){
			try{
				SCHEDA.xMouseIni = event.touches[ 0 ].pageX;
				if(fromMove)SCHEDA.xMouseIni += 21;
				SCHEDA.yMouseIni = event.touches[ 0 ].pageY;
			}catch(err){};
		}else{
			SCHEDA.xMouseIni = event.clientX + gapH;
			SCHEDA.yMouseIni = event.clientY + gapV;
		}
	},
	moveRedimScheda: function( event ){ // ridimensiona la scheda libera o laterale
		event.preventDefault();
		SCHEDA.xMouseAtt = touchable ? event.touches[ 0 ].pageX : event.clientX;
		SCHEDA.yMouseAtt = touchable ? event.touches[ 0 ].pageY : event.clientY;
		
		var gapX = 0;
		var gapY = 0;
		var mX = 1;
		var mY = 1;
		if(SCHEDA.versoRedim.indexOf("l")>-1){
			mX = -1;
			gapX = 5;
		}
		if(SCHEDA.versoRedim.indexOf("t")>-1){
			mY = -1;
			gapY = 5;
		}
		
		var w = SCHEDA.wIni+(SCHEDA.xMouseAtt - SCHEDA.xMouseIni)*mX  - gapX*2;
		var h = SCHEDA.hIni+(SCHEDA.yMouseAtt - SCHEDA.yMouseIni)*mY + 12  - gapY*2;
		var x = SCHEDA.xIni+(SCHEDA.xMouseAtt - SCHEDA.xMouseIni);
		var y = SCHEDA.yIni+(SCHEDA.yMouseAtt - SCHEDA.yMouseIni);

		if(w<350)w=350;
		if(h<180)h=180;
		
		if(SCHEDA.versoRedim.indexOf("l")>-1 || SCHEDA.versoRedim.indexOf("r")>-1){
			document.getElementById("scheda").style.width = w + 'px';
		}
		if(SCHEDA.versoRedim.indexOf("t")>-1 || SCHEDA.versoRedim.indexOf("b")>-1){
			document.getElementById("scheda_testo").style.height = (h - (SCHEDA.getMM()-SCHEDA.gapScheda+9)) + 'px';
			document.getElementById("scheda_testo2").style.height = (h - (SCHEDA.getMM()-SCHEDA.gapScheda+9)) + 'px';
		}
		if(SCHEDA.versoRedim.indexOf("l")>-1){
			if(w>350){
				document.getElementById("scheda").style.left = (x + gapX) + 'px';
			}else{
				document.getElementById("scheda").style.left = ((SCHEDA.xIni + SCHEDA.wIni) - 350 - gapX) + 'px';
			}
		}
		if(SCHEDA.versoRedim.indexOf("t")>-1){
			if(h>180+gapY){
				document.getElementById("scheda").style.top = (y + gapY) + 'px';
			}else{
				document.getElementById("scheda").style.top = ((SCHEDA.yIni + SCHEDA.hIni) - 179) + 'px';
			}
		}
		
		SCHEDA.verPosScheda();
		SCHEDA.verRedim();
	},
	arrestaRedimScheda: function( event ){
		event.preventDefault();
		var x = touchable ? SCHEDA.xMouseAtt : event.clientX;
		var y = touchable ? SCHEDA.yMouseAtt : event.clientY;
		SCHEDA.verPosScheda();
		if(SCHEDA.aggancio.tipo == 'libera'){
			SCHEDA.aggancio.libera.w = document.getElementById("scheda").scrollWidth;
			SCHEDA.aggancio.libera.h = document.getElementById("scheda").scrollHeight+SCHEDA.gapScheda;
		}
		if(SCHEDA.aggancio.tipo == 'lato'){
			SCHEDA.aggancio.libera.w = document.getElementById("scheda").scrollWidth;
		}
		
		if(!touchable){
			document.body.removeEventListener("mouseup",SCHEDA.arrestaRedimScheda,false);
			document.body.removeEventListener("mousemove",SCHEDA.moveRedimScheda,false);
			document.body.removeEventListener("mouseleave",SCHEDA.arrestaRedimScheda,false);
		}else{
			document.body.removeEventListener("touchend", SCHEDA.arrestaRedimScheda, false );
			document.body.removeEventListener("touchmove", SCHEDA.moveRedimScheda, false );	
		}
		localStorage.schedaAggancio = JSON.stringify(SCHEDA.aggancio);
		if(SCHEDA.aggancio.tipo == 'lato'){
			stopOnResize = false;
			onWindowResize();
		}
	},
	
	minimizzaScheda: function(){
		if(SCHEDA.aggancio.tipo == 'libera')document.getElementById("scheda").classList.toggle("minimized");
	},
	
	
	
	swMenuScheda: function( forza=false ){
		if(!document.getElementById("btnMenuScheda"))return;
		var aperto = (document.getElementById("menuScheda").className.indexOf("visSch")!=-1);
		if(!aperto || forza==true){
			document.getElementById("menuScheda").classList.add("visSch");
		}
		if(aperto || forza=='chiudi'){
			document.getElementById("menuScheda").classList.remove("visSch");
		}
	},
	stampaScheda: function( obj ){
		if(typeof(noInt)=='undefined')var noInt = false;
		if(document.getElementById("menuScheda").className.indexOf("visSch")>-1)SCHEDA.swMenuScheda();
		// verifico le autorizzazioni
		if(!DB.login.data.auths.length){
			setTimeout(function(){
				ALERT(TXT("MsgFunzioneSoloPay"));
			},100);
			return;
		}
		// --------------------------
		document.getElementById("stampa").classList.toggle("visSch");
		var d = new Date();
		var annoAtt=d.getFullYear();
		var cartaIntestata = false;
		var TITOLO_PAGINA = document.title;
		var nScheda = SCHEDA.scheda2Aperta ? "2" : "";
		var sch = document.getElementById("scheda");
		/*if(	sch.classList.contains("scheda_A") || 
			sch.classList.contains("scheda_B") || 
			sch.classList.contains("scheda_Riepi") )obj = {};*/
		if(	typeof(obj)=='undefined'){
			var titolo = document.getElementById("scheda_titolo").innerHTML;
			var corpo = document.getElementById("scheda_testo"+nScheda).querySelector(".scheda_stampa").outerHTML;
		}else{
			cartaIntestata = true;
			var titolo = '';
			console.log(obj)
			if(JSON.stringify(obj)!='{}')TITOLO_PAGINA = htmlEntities(obj.titolo)+" "+htmlEntities(TXT("per"))+" "+htmlEntities(obj.intestazione);
			console.log(TITOLO_PAGINA);
			var dati = '<p>'+htmlEntities(TXT("per"))+' '+htmlEntities(obj.intestazione) + '</p>' + 
						'<p>'+htmlEntities(obj.corpo).replace(/\n/g,'<br>') + '</p>' + 
						'<p style="padding-left:50px;padding-top:50px;"><i>' + TXT("Data") + ':</i> ' + getFullDataTS(d/1000) + '<br><br>' +
						'<i style="font-size:15px;">' + DB.login.data.Nominativo + '</i></p>';
						
			if(JSON.stringify(obj)!='{}'){
				var titolo = TITOLO_PAGINA;
				var corpo = dati;
			}else{
				var titolo = document.getElementById("scheda_titolo").innerHTML;
				var corpo = document.getElementById("scheda_testo"+nScheda).querySelector(".scheda_stampa").outerHTML;
			}
		}
		
		var HTML_styles = '';
		var lks = document.head.getElementsByTagName("link");
		for(l in lks){
			if(lks[l]){
				if(lks[l].type=="text/css")HTML_styles+=lks[l].outerHTML;
			}
		}
		var lks = document.getElementById("scripts").getElementsByTagName("link");
		for(l in lks){
			if(lks[l]){
				if(lks[l].type=="text/css")HTML_styles+=lks[l].outerHTML;
			}
		}
		HTML_styles = HTML_styles.replace(/\?v=[\d]+"/g,'"').replace(/\ id="[^"]+"/g,'');
		
		var HTML = 
				'<html class="htmlStampa">' +
				'	<head>' +
				'		<script language="Javascript">' +
				'			setTimeout(function(){' +
				'				parent.document.getElementById("stampa").classList.toggle("visSch");' +
				'				window.print();' +
				//'				window.close();' +
				'			},2000);' +
				'		</script>' +
						HTML_styles +
				'		<title>' +
				'			'+TITOLO_PAGINA+'' +
				'		</title>' +
				'	</head>' +
				'	<body style="background:#FFF;" class="bodyStampa">';
		if(!cartaIntestata)HTML += 
				'		<div style="margin-bottom:10px;' +
				//'					border-bottom:1px solid #DDD;' +
				'					width:100%;">'+
		 		'			<table width="100%"' +
				'				   id="testataStampa"' +
				'				   cellpadding="10"' +
				'				   cellspacing="0"' +
				'				   border="0">' +
				'				<tr>' +
				/*'					<td>' +
				'						<img src="img/logo_iaomai_Bucato_Beige.png"' +
				'				   			 width="125"' +
				'				   			 height="38" />' +
				'				   	</td>' +*/
				'				   	<td align="right"' +
				'				   		valign="middle"' +
				'				   		style="font-size:11px;opacity:0.7;">' +
				'				   		&copy;'+annoAtt+' iáomai&#8482; | All rights reserved' +
				'				   	</td>' +
				'				</tr>' +
				'			</table>' +
				'		</div>';
		else{
			var logo = __(DB.login.data.logoAzienda);
			//if(!logo)logo = __(DB.login.data.imgAvatar);
			HTML += '<div style="';
			//if(logo)
			HTML += 'text-align:left;';
			HTML += 'border-bottom:1px solid #DDD;margin-bottom:20px;">';
			if(logo)HTML += '<img src="'+logo+'" style="height:80px;float:left;margin-right:10px;">';
			HTML += '<span style="display:inline-block;font-size:11px;">' + DB.login.data.Intestazione.replace(/\n/gi,"<br>") + '</span>';
			HTML += '<div class="l" style="margin-bottom:20px;"></div></div>';
		}
		HTML += '		<div id="cont">';
		if(titolo && corpo.indexOf("<h1")==-1)HTML +=
				'			<h1 style="font-size: 35px;' +
				'			   		   font-weight: normal;' +
				'			   		   text-align: left;' +
				'			   		   margin-top: 0px;' +
				'			   		   display: inline-block;' +
				'			   		   width: calc(100% - 20px);">' +
								titolo +
				'			</h1>';
		HTML +=	'			<div id="scheda"' +
				'			   	 style="display:block;' +
				'			   	 		position:relative;"' +
				'			   	 class="schLibera sch_Max800 scheda_paziente schForm contStampa">' +
				'				<div id="scheda_cont"' +
				'			   	 	 style="display:block;' +
				'			   	 	  		box-shadow:none !important;' +
				'			   	 	  		background-color:#FFF;">' +
				'			   		<div id="scheda_testo"' +
				'			   	 	  	 style="background-color:#FFF;' +
				/* '			   	 	  			padding-left:20px;' +
				'			   	 	  			padding-right:20px;' + */
				'			   	 	  			display:block;' +
				'			   	 	  			height:auto;' +
				'			   	 	  			overflow:visible;' +
				'			   	 	  			text-align: left;' +
				'			   	 	  			border-top: none;">' +
										corpo +
				'					</div>' +
				'				</div>' +
				'			</div>' +
				'		</div>' +
				'	</body>' +
				'</html>';
		frStampa = document.getElementById("stampaFrame").contentWindow;
		frStampa.document.open('text/html');
		frStampa.document.write(HTML);
	},
	
	initElenco: function(){
		//document.getElementById("elenchi").classList.add("visSch");
		document.getElementById("elenchi_pulsanti").classList.add("visSch");
		//document.getElementById("scheda").classList.add("visSch_1");
		if(!smartMenu)SCHEDA.chiudiElenco();
		else onWindowResize();
	},
	caricaElenco: function( titolo, html ){
		document.getElementById("scheda").classList.add("visSch_1");
		document.getElementById("elenchi_titolo").innerHTML=titolo;
		document.getElementById("lista_set").innerHTML=html;
	},
	scaricaElenco: function(){
		document.getElementById("scheda").classList.remove("schOp");
		document.getElementById("elenchi_lista").classList.remove("visSch");
		document.getElementById("elenchi_titolo").innerHTML='';
		document.getElementById("lista_set").innerHTML='';
		if(SCHEDA.elencoSel)SCHEDA.swPulsanti();
		SCHEDA.elencoSel = '';
		SCHEDA.scaricaPulsanti();
	},
	apriElenco: function( tipo=false, daMenu=false ){
		if(	daMenu &&
			document.getElementById("elenchi_cont").classList.contains("visSch") &&
			document.getElementById("elenchi").classList.contains("vis_"+tipo)){
			SCHEDA.chiudiElenco();
			return;
		}
		var visGuida = false;
		if(	!document.getElementById("elenchi_cont").classList.contains("visSch") || 
			!document.getElementById("elenchi").classList.contains("vis_"+tipo))visGuida=true;
		document.getElementById("elenchi_cont").classList.add("visSch");
		
		MENU.desIcona();
		MENU.chiudiMenu();
		SCHEDA.setMenuDim();
		if(typeof(expanded)=='undefined')var expanded = false;
		if(tipo){
			document.getElementById("elenchi").classList.remove("vis_base");
			document.getElementById("elenchi").classList.remove("vis_set");
			document.getElementById("elenchi").classList.add("vis_"+tipo);
			if(tipo == 'base')MENU.icoSelected = document.getElementById("p_cartella");
			else MENU.icoSelected = document.getElementById("p_set");
			if(MENU.icoSelected)MENU.icoSelected.classList.add("p_sel");
			MENU.comprimiIcone(true);
			
			SCHEDA.swPulsanti(true);
			if(tipo == 'base'){
				if(SCHEDA.elencoSelBase){
					SCHEDA.selElenco(SCHEDA.elencoSelBase);
				}
			}
			if(tipo == 'set'){
				if(SCHEDA.elencoSelSet){
					SCHEDA.selElenco(SCHEDA.elencoSelSet);
				}
			}
		}
		document.getElementById("elenchi").classList.add("visSch");
		document.getElementById("elenchi_cont").classList.add("visSch");
		document.getElementById("scheda").classList.add("schOp");
		if(smartMenu)SCHEDA.verPosScheda();
		if(visGuida){
			if(document.getElementById("elenchi").classList.contains("vis_base")){
				if(!SCHEDA.elencoSel)GUIDA.visFumetto("guida_archivi",false,true);
			}else{
				try{
					if(!SCHEDA.elencoSel)GUIDA.visFumetto("guida_set",false,true);
				}catch(err){};
			}
		}
		SCHEDA.setMenuDim();
		SCHEDA.verPosScheda();
		if(tipo=='set' && document.getElementById("scheda").classList.contains("visSch"))document.getElementById("p_cartella").classList.remove("p_sel");
	},
	setMenuDim: function(){
		document.getElementById("scheda").classList.toggle("schRid", document.getElementById("elenchi").classList.contains("visSch"));
	},
	chiudiElenco: function(){
		var aperto = document.getElementById("elenchi_cont").classList.contains("visSch");
		document.getElementById("elenchi_cont").classList.remove("visSch");
		document.getElementById("scheda").classList.remove("schOp");
		document.getElementById("elenchi").classList.remove("visSch");
		MENU.desIcona();
		SCHEDA.setMenuDim();
		MENU.setTT();
		SCHEDA.verPosScheda();
	},
	torna: function( daCarica ){
		if(document.getElementById("scheda").className.indexOf("schedaRitorno") > -1){
			try{
				SET._torna({
					"daCarica": daCarica
				});
			}catch(err){}
			let cls = SCHEDA.classeAperta.split(" ");
			for(let c in cls)document.getElementById("scheda").classList.add(cls[c]);
			document.getElementById("scheda").classList.remove("schedaRitorno");
			document.getElementById("scheda_titolo").innerHTML=document.getElementById("scheda_ritorno").getElementsByTagName("div")[0].innerHTML;
			document.getElementById("scheda_testo").style.height = SCHEDA.memHrit;
			try{
				eval(SCHEDA.functRitorno);
			}catch(err){}
			SCHEDA.scheda2Aperta = false;
			document.getElementById("scheda").classList.toggle("h150", (document.getElementById("scheda").scrollHeight<=275));
			document.getElementById("scheda").classList.toggle("schForm", (document.getElementById("scheda").querySelector(".formBtn")));
			SCHEDA.verPosScheda();
		}
	},
	selElenco: function( elenco, el ){
		var iconaAdd = '';
		//if(elenco == 'pazienti')iconaAdd='<img src="img/ico_cliente.png" id="elenchi_icona">';
		//if(elenco == 'servizi')iconaAdd='<img src="img/ico_servizio.png" id="elenchi_icona">';
		//if(elenco == 'fornitori')iconaAdd='<img src="img/ico_fornitore.png" id="elenchi_icona">';
		//if(elenco == 'teoria')iconaAdd='<img src="img/ico_teoria2.png" id="elenchi_icona">';
		//if(elenco == 'patologie')iconaAdd='<img src="img/ico_patologie2.png" id="elenchi_icona">';
		//if(elenco == 'procedure')iconaAdd='<img src="img/ico_prescrizione.png" id="elenchi_icona">';
		
		document.getElementById("lista_base").classList.remove("noPwd");
		document.getElementById("patientPwdRequest").type = 'text';
		document.getElementById("patientPwdRequest").value = '';
		if(elenco == 'pazienti' && LOGIN.logedin() && __(DB.login.data.password_pazienti,'0')=='1'){
			// verifico se serve la password
			if(!MENU.pwdOK){
				document.getElementById("lista_base").classList.add("noPwd");
				document.getElementById("patientPwdRequest").type = 'password';
			}
		}
		
		if(typeof(el) == 'undefined')var el = document.getElementById('pulsante_'+elenco);
		document.getElementById("elenchi_lista").classList.remove("triplo");
		document.getElementById("scheda").classList.remove("triplo");
		if(SCHEDA.elencoSel){
			document.getElementById("pulsante_"+SCHEDA.elencoSel).classList.remove("elencoSel");
			document.getElementById("lista_"+SCHEDA.elencoSel).classList.remove("visSch");
		}
		document.getElementById("pulsante_"+elenco).classList.add("elencoSel");
		document.getElementById("lista_"+elenco).classList.add("visSch");
		document.getElementById("elenchi_titolo").innerHTML = document.getElementById("pulsante_"+elenco).innerHTML + iconaAdd;
		SCHEDA.setTriploLivello( elenco );
		document.getElementById("elenchi_titolo").classList.add("visSch");
		document.getElementById("elenchi").classList.add("LISTE");
		document.getElementById("scheda").classList.add("LISTE");
		document.getElementById("elenchi_lista").classList.add("visSch");
		document.getElementById("elenchi_pulsanti").classList.remove("visSch");
		document.getElementById("scheda").classList.add("schOp");
		SCHEDA.elencoSel = elenco;
		
		var tipo = el.parentElement.id.split("_")[1];
		if(tipo=='base')SCHEDA.elencoSelBase = elenco;
		if(tipo=='set')SCHEDA.elencoSelSet = elenco;
		SCHEDA.verPosScheda();
		//if(elenco == 'pazienti' && mouseDetect && PAZIENTI.idCL==-1)document.getElementById("paz_ricerca").focus();
		//if(elenco == 'patologie' && mouseDetect)document.getElementById("pat_ricerca").focus();
		//if(elenco == 'procedure' && mouseDetect)document.getElementById("proc_ricerca").focus();
		
		if(document.getElementById("elenchi").classList.contains("LISTE"))SCHEDA.setMenuDim(3);
	},
	setTriploLivello: function( elenco ){
		if(elenco == 'pazienti' || elenco == 'procedure'){
			if(PAZIENTI.idCL >- 1 || elenco == 'procedure'){
				document.getElementById("elenchi_lista").classList.add("triplo");
				document.getElementById("scheda").classList.add("triplo");
			}else{
				document.getElementById("elenchi_lista").classList.remove("triplo");
				document.getElementById("scheda").classList.remove("triplo");
			}
		}
	},
	individuaElemento: function( id, lista ){
		if(!smartMenu){
			var y = tCoord(document.getElementById(id),'y')-tCoord(document.querySelector('.'+lista),'y');
			document.querySelector('.'+lista).scroll(0,y-50);
		}else{
			var x = tCoord(document.getElementById(id))-tCoord(document.querySelector('.'+lista));
			document.querySelector('.'+lista).scroll(x-50,0);
		}
	},
	swPulsanti: function(forza){
		if(	SCHEDA.elencoSelBase=='pazienti' && 
			PAZIENTI.idCL>-1 && 
			!forza && 
			document.getElementById("elenchi").classList.contains("vis_base") ){
			PAZIENTI.deselPaziente();
		}else{
			if(!forza){
				if(document.getElementById("elenchi").classList.contains("vis_base"))SCHEDA.elencoSelBase= '';
				if(document.getElementById("elenchi").classList.contains("vis_set"))SCHEDA.elencoSelSet= '';
			}
			if(document.getElementById("elenchi_pulsanti").className.indexOf("visSch")==-1 || forza){
				// PULSANTI
				document.getElementById("scheda").classList.remove("LISTE");
				document.getElementById("elenchi").classList.remove("LISTE");
				document.getElementById("elenchi_lista").classList.remove("visSch");
				document.getElementById("elenchi_pulsanti").classList.add("visSch");
				document.getElementById("elenchi_titolo").classList.remove("visSch");
				if(SCHEDA.elencoSel){
					try{
						document.getElementById("pulsante_"+SCHEDA.elencoSel).classList.remove("elencoSel");
						document.getElementById("lista_"+SCHEDA.elencoSel).classList.remove("visSch");
					}catch(err){}
				}
				document.getElementById("scheda").classList.remove("triplo");
				SCHEDA.elencoSel = '';
				if(SCHEDA.classeAperta=='scheda_fornitore' || SCHEDA.classeAperta=='scheda_servizio')SCHEDA.scaricaScheda();
				
				document.getElementById("lista_base").classList.remove("noPwd");
				document.getElementById("patientPwdRequest").type = 'text';
			}else{
				// LISTA
				document.getElementById("scheda").classList.add("LISTE");
				document.getElementById("elenchi").classList.add("LISTE");
				document.getElementById("elenchi_lista").classList.add("visSch");
				document.getElementById("elenchi_pulsanti").classList.remove("visSch");
				document.getElementById("elenchi_titolo").classList.remove("titoloAperto");
				document.getElementById("elenchi_titolo").classList.add("visSch");
			}
		}
	},
	caricaPulsanti: function(html){
		document.getElementById("pulsanti_set").innerHTML=html;
	},
	scaricaPulsanti: function(){
		document.getElementById("pulsanti_set").innerHTML='';
	},
	swCartella: function( el, forza=false ){
		MENU.nasMM();
		if(!forza){
			if(el.parentElement.classList.contains("cartellaAperta")){
				el.parentElement.classList.remove("cartellaAperta");
				el.parentElement.parentElement.classList.remove("cont_cartellaAperta");
			}else{
				el.parentElement.classList.add("cartellaAperta");
				el.parentElement.parentElement.classList.add("cont_cartellaAperta");
			}
		}else{
			el.parentElement.classList.add("cartellaAperta");
			el.parentElement.parentElement.classList.add("cont_cartellaAperta");
		}
	},
	setCartella: function( el ){ // setta la cartella che deve restare aperta quando si clicca su un elemento
		SCHEDA.ultimaCartella = el.getElementsByTagName("span")[0].id;
	},
	caricaBtns: function( btns, icona ){
		document.getElementById("btns_set").innerHTML = btns;
		document.getElementById("cartella_set").innerHTML = icona;
		document.getElementById("p_sets").classList.remove("visSch");
	},
	scaricaBtns: function(){
		document.getElementById("btns_set").innerHTML = '';
		document.getElementById("cartella_set").innerHTML = '';
	},
	getCartella: function( el ){
		while(!el.classList.contains("cartella"))el = el.parentElement;
		return el;
	},
	getMM: function(){
		var addForm = 0;
		var mm = 90 + addForm;
		if(smartMenu)mm += 5 + document.getElementById("elenchi").scrollHeight + document.getElementById("icone").scrollHeight;
		else if(SCHEDA.aggancio.tipo == 'sotto')mm+=20;
		else if(SCHEDA.aggancio.tipo == 'lato')mm-=41;
		return mm;
	},
	verPosScheda: function(){
		// effettua i controlli quando si ridimensiona la scheda
		if(document.getElementById("scheda").classList.contains("visSch") && !smartMenu){
			if(SCHEDA.aggancio.tipo == 'libera'){
				var limiteW = WF();
				var limiteH = HF()-SCHEDA.gapScheda;
				var limiteXmax = WF()-20;
				var limiteYmax = HF()-63;
				var limiteXmin = 20 - document.getElementById("scheda").scrollWidth;
				if(document.getElementById("scheda").scrollWidth > limiteW){
					document.getElementById("scheda").style.width = limiteW+"px";
					SCHEDA.aggancio.libera.w = limiteW;
				}
				if(document.getElementById("scheda").scrollWidth < 350){
					document.getElementById("scheda").style.width = "350px";
					SCHEDA.aggancio.libera.w = 350;
				}
				if(document.getElementById("scheda").scrollHeight < 180){
					document.getElementById("scheda_testo").style.height = (180-SCHEDA.getMM()+13)+"px";
					SCHEDA.aggancio.libera.h = 180;
				}
				if(document.getElementById("scheda").scrollHeight > limiteH){
					document.getElementById("scheda_testo").style.height = (limiteH-SCHEDA.getMM()+13)+"px";
					SCHEDA.aggancio.libera.h = limiteH;
				}
				if(tCoord(document.getElementById("scheda")) > limiteXmax){
					document.getElementById("scheda").style.left = limiteXmax + 'px';
					SCHEDA.aggancio.libera.x = limiteXmax;
				}
				if(tCoord(document.getElementById("scheda"),'y') < -51){
					document.getElementById("scheda").style.top = '-51px';
					SCHEDA.aggancio.libera.y = -51;
				}
				if(tCoord(document.getElementById("scheda"),'y') > limiteYmax){
					document.getElementById("scheda").style.top = limiteYmax + 'px';
					SCHEDA.aggancio.libera.y = limiteYmax;
				}
				if(tCoord(document.getElementById("scheda")) < limiteXmin){
					document.getElementById("scheda").style.left = limiteXmin + 'px';
					SCHEDA.aggancio.libera.x = limiteXmin;
				}
			}
			if(SCHEDA.aggancio.tipo == 'sotto'){
				var h = 0;
				var mm = 20;
				if(smartMenu)mm = 1;
				if(tCoord(document.getElementById("scheda"),'y') < mm){
					h = (HF()-SCHEDA.getMM()+SCHEDA.gapScheda);
				}else{
					h = (HF()-(SCHEDA.aggancio.sotto.y-SCHEDA.gapScheda)-SCHEDA.getMM()+mm);
				}
				document.getElementById("scheda_testo").style.height = h + "px";
				document.getElementById("scheda_testo2").style.height = h + "px";
				SCHEDA.aggancio.sotto.y = tCoord(document.getElementById("scheda"),'y');
				document.getElementById("scheda").classList.toggle("h150", (document.getElementById("scheda").scrollHeight<=275));
			}
			if(SCHEDA.aggancio.tipo == 'lato'){
				document.getElementById("scheda_testo").style.height = (HF() - SCHEDA.getMM()) + "px";
				document.getElementById("scheda_testo2").style.height = (HF() - SCHEDA.getMM()) + "px";
				var x = document.getElementById("elenchi_cont").scrollWidth;
				if(!document.getElementById("elenchi_cont").classList.contains("visSch"))x = 0;
				document.getElementById("scheda").style.left = (48 + x) + "px";
				
				if(tCoord(document.getElementById("scheda")) + document.getElementById("scheda").scrollWidth > WF()){
				var w = WF() - tCoord(document.getElementById("scheda"));
				if(w < 350)w = 350;
				document.getElementById("scheda").style.width = (w - 31) + "px";
				
				
				
				}
			}
			localStorage.schedaAggancio = JSON.stringify(SCHEDA.aggancio);
		}
		onWindowResize();
	},
	verRedim: function(){
		// assegna le classi alla scheda in base alla larghezza (per i CSS)
		var W = document.getElementById("scheda").scrollWidth;
		if(	SCHEDA.classeAperta == 'scheda_agenda' || 
			SCHEDA.classeAperta == 'scheda_A' || 
			SCHEDA.classeAperta == 'scheda_B'){
			SCHEDA.setStyle( W>600 && W<=750, "ag600_750");
			SCHEDA.setStyle( W<=940, "ag2cols");
			SCHEDA.setStyle( W>940 && W<=1255, "ag3cols");
			SCHEDA.setStyle( W>1255 && W<=1455, "ag4cols");
		}
		SCHEDA.setStyle( W<=450, "Max450");
		SCHEDA.setStyle( W<=600, "Max600");
		SCHEDA.setStyle( W<=800, "Max800");
	},
	setStyle: function( cond, n ){
		if(cond)document.getElementById("scheda").classList.add("sch_"+n);
		else document.getElementById("scheda").classList.remove("sch_"+n);
	},
	
	pulsantiForm: function( azElimina, azAnnulla, azSubmit ){
		SCHEDA.comprimiElenco();
		HTML = '<div class="formBtn noPrint">';
		//if(azElimina)HTML += '<div class="p_paz_el" onClick="'+azElimina+'">'+TXT("Elimina")+'</div>';
		HTML += '<span id="btn_annulla" class="annullaBtn" onclick="'+azAnnulla+'">'+TXT("Annulla")+'</span><span class="submitBtn" onclick="if(verifica_form(document.formMod))'+azSubmit+'">'+TXT("Salva")+'</span></div>'+H.chr10;	
		return HTML;
	}
}
