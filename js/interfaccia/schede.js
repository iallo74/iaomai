var SCHEDA = {
	libera: {
		stato: false,
		x: -1,
		y: -1,
		w: -1,
		h: -1
	},
	xMouseIni: 0,
	yMouseIni: 0,
	xIni: 0,
	yIni: 0,
	wIni: 0,
	hIni: 0,
	tIni: 0,
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
	memY: 0,
	elencoSel: '',
	elencoSelSet: '',
	elencoSelBase: '',
	btnSel: null,
	noChiudi: false,
	formModificato: false,
	form: null,
	versoRedim: '',
	gapScheda: 16, /* 17 */
	livelloApertura: 2,
	ultimaCartella: '', // l'id della sottocartella aperta quando si clicca su una scheda (per smartMenu)
	htmlPallini:	'<div id="btnMenuScheda" onClick="SCHEDA.swMenuScheda();">' +
					'<svg viewBox="0 0 25 36"><circle cy="11"></circle><circle cy="18"></circle>' +
					'<circle cy="25"></circle></svg></div><div id="menuScheda"></div>',
	
	initScheda: function(){
		if(!touchable && localStorage.schedaLibera){
			SCHEDA.libera = JSON.parse(localStorage.schedaLibera);
			if(SCHEDA.libera.stato)SCHEDA.swLibera(true);
		}
		if(localStorage.livelloApertura){
			SCHEDA.livelloApertura = localStorage.livelloApertura*1;
			SCHEDA.fissaMenuEspanso(SCHEDA.livelloApertura);
		}
		SCHEDA.verRedim();
		window.addEventListener("resize",function(){
			SCHEDA.verRedim();
		}, false);
	},
	caricaScheda: function( titolo, html, funct, classe, ritorno, espansa, btn ){
		/*
		titolo: titolo della scheda
		html: contenuto della scheda
		funct: funzione da eseguire alla chiusura della scheda
		classe: la classe della scheda (es. per il colore del titolo)
		ritorno: indica se ci deve essere un ritorno ad un altra scheda (scrive su scheda_testo2 e visualizza il pulsante di ritorno) [ può contenere la funzione di ritorno ]
		espansa: apre la scheda non compressa
		*/
		
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
			try{
				SCHEDA.noChiudi = true;
				eval(document.getElementById("sc").dataset.funct);
				document.getElementById("sc").dataset.funct = '';
				SCHEDA.noChiudi = false;
			}catch(err){};
		}
		
		if(typeof(funct)=='undefined')var funct = '';
		if(typeof(classe)=='undefined')var classe = '';
		if(typeof(ritorno)=='undefined')var ritorno = '';
		if(typeof(espansa)=='undefined')var espansa = false;
		if(typeof(btn)=='undefined')var btn = null;
		
		if(SCHEDA.btnSel && !ritorno){
			SCHEDA.btnSel.classList.remove("elencoSel");
			SCHEDA.btnSel = null;
		}
		
		if(html)html='<div class="scheda_stampa">'+html+'</div>';
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
		if(SCHEDA.classeAperta)document.getElementById("scheda").classList.remove(SCHEDA.classeAperta);
		if(classe)document.getElementById("scheda").classList.add(classe);
		if(!ritorno){
			SCHEDA.classeAperta = classe;
			SCHEDA.torna();
		}
		if(classe != "scheda_agenda" && classe != "scheda_video"  && classe != "scheda_ricerche" )html = SCHEDA.htmlPallini + html;
		document.getElementById("scheda_titolo").innerHTML=htmlEntities(titolo);
		document.getElementById("scheda_testo"+nScheda).innerHTML=html;
		
		document.getElementById("scheda").classList.add("visSch");
		document.getElementById("scheda_cont").classList.add("visSch");
		
		SCHEDA.schedaAperta = true;
		document.getElementById("elenchi").classList.remove("schExp");
		document.getElementById("scheda").classList.remove("schExp");
		document.getElementById("l3").classList.remove("visBtn");
		document.getElementById("elenchi").classList.add("noTesta");
		
		if(!nScheda && funct){ // imposto la funzione alla chiusura della scheda
			document.getElementById("sc").dataset.funct=funct;
		}
		if(espansa){
			if(!SCHEDA.libera.stato){
				if(!SCHEDA.hOpened)SCHEDA.hOpened = 200;
				if(classe.indexOf("scheda_")==-1){
					document.getElementById("scheda_testo").style.height = SCHEDA.hOpened+"px";
				}else{
					document.getElementById("scheda_testo").style.height = (HF()-SCHEDA.getMM()+SCHEDA.gapScheda)+"px";
				}
				document.getElementById("scheda_testo").scrollTop = '0px';
			}
		}
		if(btn && !ritorno){
			SCHEDA.formModificato = false;
			if(SCHEDA.btnSel)SCHEDA.btnSel.classList.remove("elencoSel");
			SCHEDA.btnSel=btn;
			btn.classList.add("elencoSel");	
		}
		SCHEDA.memY = tCoord(document.getElementById("scheda"),'y');
		if(SCHEDA.libera.stato)SCHEDA.verPosScheda();
		SCHEDA.verRedim();
		SCHEDA.setMenuDim(2);
		GUIDA.nasFumetto();
	},
	verificaSchedaRet: function(){
		formHasChanges();
		return SCHEDA.formModificato;
	},
	scaricaScheda: function( salvato ){
		if( SCHEDA.noChiudi )return;
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
						
			try{
				SET._scaricaScheda();
			}catch(err){}
			
			SCHEDA.form = null;
			SCHEDA.torna();
			document.getElementById("scheda").classList.remove("visSch");
			document.getElementById("scheda_cont").classList.remove("visSch");
			document.getElementById("scheda_titolo").innerHTML='';
			document.getElementById("scheda_testo").innerHTML='';
			document.getElementById("scheda_testo2").innerHTML='';
			document.getElementById("elenchi").classList.remove("noTesta");
			if(SCHEDA.classeAperta){
				document.getElementById("scheda").classList.remove(SCHEDA.classeAperta);
				document.getElementById("l2").classList.add("visBtn");
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
			var livello = SCHEDA.livelloApertura;
			if(!document.getElementById("elenchi_cont").classList.contains("visSch") || !document.getElementById("elenchi").classList.contains("LISTE"))livello = 2;
			SCHEDA.setMenuDim(livello);
		}});
	},
	nasScheda: function(){
		document.getElementById("scheda_testo").style.height = '0px';
		document.getElementById("scheda_testo2").style.height = '0px';
	},
	msgSalvataggio: function( generico ){
		var el = document.body;
		if(typeof(generico) == 'undefined')el = document.getElementById("scheda_testo");
		var msg = document.createElement("DIV");
		msg.id='msgScheda';
		if(!document.getElementById('msgScheda'))el.appendChild(msg);
		msg.innerHTML = Lingua(TXT_SchedaSalvata);
		document.getElementById('msgScheda').addEventListener( "mouseup", function(){
			el.removeChild(this);
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
	
	swLibera: function(forza){
		if(typeof(forza) == 'undefined')var forza = false;
		if(forza == 'true')var forza = true;
		if(forza == 'false')var forza = false;
		
		SCHEDA.libera.stato = !SCHEDA.libera.stato;
		if(forza)SCHEDA.libera.stato = true;
		//localStorage.schedaLibera = JSON.stringify(SCHEDA.libera);

		if(SCHEDA.libera.stato){
			// sganciata
			if(SCHEDA.libera.w>-1)
			if(SCHEDA.libera.w == -1){
				if(WF()<550)SCHEDA.libera.w = WF() - 30;
				else SCHEDA.libera.w = 550;
				if(HF()<480)SCHEDA.libera.h = HF() - 30;
				else SCHEDA.libera.h = 480;
				SCHEDA.libera.x = WF() - SCHEDA.libera.w - 30;
				SCHEDA.libera.y = HF() - SCHEDA.libera.h - 30;
			}
			
			document.getElementById("scheda").style.left = SCHEDA.libera.x + "px";
			document.getElementById("scheda").style.top = SCHEDA.libera.y + "px";
			document.getElementById("scheda").style.width = SCHEDA.libera.w + "px";
			document.getElementById("scheda_testo").style.height = SCHEDA.libera.h - SCHEDA.getMM() + "px";
			document.getElementById("scheda_testo2").style.height = SCHEDA.libera.h - SCHEDA.getMM() + "px";
			document.getElementById("scheda").classList.add("schLibera");
		}else{
			// agganciata
			document.getElementById("scheda").style.left = "";
			document.getElementById("scheda").style.top = "";
			document.getElementById("scheda").style.width = "";
			document.getElementById("scheda_testo").style.height = HF() - SCHEDA.getMM() - SCHEDA.memY;
			document.getElementById("scheda_testo2").style.height = HF() - SCHEDA.getMM() - SCHEDA.memY;
			document.getElementById("scheda").classList.remove("schLibera");
		}
		localStorage.schedaLibera = JSON.stringify(SCHEDA.libera);
		SCHEDA.verRedim();
	},
	aggancia: function(tipo){
		/*if(tipo=='0')SCHEDA.swLibera(true);
		else SCHEDA.swLibera();*/
		SCHEDA.swLibera();
	},
	
	iniziaMoveScheda: function( event ){
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
		if(!SCHEDA.libera.stato){
			SCHEDA.tIni = "0"+document.getElementById("scheda_testo").style.height.replace("px","")+"";
		}else{
			SCHEDA.xIni = tCoord(document.getElementById("scheda"));
			SCHEDA.yIni = tCoord(document.getElementById("scheda"),'y');
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
		if(!SCHEDA.libera.stato){
			var h = SCHEDA.tIni-(SCHEDA.yMouseAtt - SCHEDA.yMouseIni);
			if(h<0)h = 0;
			var mm = SCHEDA.getMM()-SCHEDA.gapScheda;
			if(h>HF()-mm)h = HF()-mm;
			if(h>5)SCHEDA.hOpened = h;
			else SCHEDA.hOpened = 200;
			document.getElementById("scheda_testo").style.height = h+'px';
			document.getElementById("scheda_testo2").style.height = h+'px';
			SCHEDA.memHrit = h*1+"px";
			if(h<=150)document.getElementById("scheda").classList.add("h150");
			else document.getElementById("scheda").classList.remove("h150");
		}else{
			var x = SCHEDA.xIni+(SCHEDA.xMouseAtt - SCHEDA.xMouseIni);
			var y = SCHEDA.yIni+(SCHEDA.yMouseAtt - SCHEDA.yMouseIni);
			
			document.getElementById("scheda").style.left = x + 'px';
			document.getElementById("scheda").style.top = y + 'px';
			SCHEDA.verPosScheda();
			SCHEDA.moving = true;
		}
		SCHEDA.verRedim();
	},
	arrestaMoveScheda: function( event ){
		event.preventDefault();
		var x = touchable ? SCHEDA.xMouseAtt : event.clientX;
		var y = touchable ? SCHEDA.yMouseAtt : event.clientY;
		noAnimate = false;
		animate();
		controlsM._MM = true
		if(!SCHEDA.libera.stato){
			if(SCHEDA.yMouseIni == y){
				h = "0"+document.getElementById("scheda_testo").style.height.replace("px","")+"";
				if(h==0)h=SCHEDA.hOpened;
				else h=0;
				document.getElementById("scheda_testo").style.height = h+'px';
				document.getElementById("scheda_testo2").style.height = h+'px';
				if(h<=150)document.getElementById("scheda").classList.add("h150");
				else document.getElementById("scheda").classList.remove("h150");
			}
			SCHEDA.memY = tCoord(document.getElementById("scheda"),'y');
		}else{
			SCHEDA.libera.x = tCoord(document.getElementById("scheda"));
			SCHEDA.libera.y = tCoord(document.getElementById("scheda"),'y');
			localStorage.schedaLibera = JSON.stringify(SCHEDA.libera);
			setTimeout(function(){ SCHEDA.moving = false; },300);
		}
		if(!touchable){
			document.body.removeEventListener("mouseup",SCHEDA.arrestaMoveScheda,false);
			document.body.removeEventListener("mousemove",SCHEDA.moveMoveScheda,false);
			document.body.removeEventListener("mouseleave",SCHEDA.arrestaMoveScheda,false);
		}else{
			document.body.removeEventListener("touchend", SCHEDA.arrestaMoveScheda, false );
			document.body.removeEventListener("touchmove", SCHEDA.moveMoveScheda, false );	
		}
	},
	
	iniziaRedimScheda: function( event, verso ){
		SCHEDA.versoRedim = verso;
		var gapH = 0;
		var gapV = 0;
		
		if(SCHEDA.versoRedim.indexOf("l")>-1 || SCHEDA.versoRedim.indexOf("r")>-1)gapH = 5;
		if(SCHEDA.versoRedim.indexOf("t")>-1 || SCHEDA.versoRedim.indexOf("b")>-1)gapV = 5;
		
		event.preventDefault();
		document.body.addEventListener("mouseup",SCHEDA.arrestaRedimScheda,false);
		document.body.addEventListener("mousemove",SCHEDA.moveRedimScheda,false);
		document.body.addEventListener("mouseleave",SCHEDA.arrestaRedimScheda,false);
		
		SCHEDA.wIni = document.getElementById("scheda").scrollWidth;
		SCHEDA.hIni = document.getElementById("scheda").scrollHeight;
		SCHEDA.xIni = tCoord(document.getElementById("scheda"));
		SCHEDA.yIni = tCoord(document.getElementById("scheda"),'y');
		
		SCHEDA.xMouseIni = event.clientX + gapH;
		SCHEDA.yMouseIni = event.clientY + gapV;
	},
	moveRedimScheda: function( event ){
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
		
		SCHEDA.libera.w = document.getElementById("scheda").scrollWidth;
		SCHEDA.libera.h = document.getElementById("scheda").scrollHeight+SCHEDA.gapScheda;
		
		document.body.removeEventListener("mouseup",SCHEDA.arrestaRedimScheda,false);
		document.body.removeEventListener("mousemove",SCHEDA.moveRedimScheda,false);
		document.body.removeEventListener("mouseleave",SCHEDA.arrestaRedimScheda,false);
		localStorage.schedaLibera = JSON.stringify(SCHEDA.libera);
	},
	
	minimizzaScheda: function(){
		if(SCHEDA.libera.stato)document.getElementById("scheda").classList.toggle("minimized");
	},
	
	
	
	swMenuScheda: function( forza ){
		if(document.getElementById("menuScheda").className.indexOf("visSch")==-1 || forza){
			var txt = '';
			txt += '<div id="btnStampaScheda" onClick="SCHEDA.stampaScheda();">'+Lingua(TXT_StampaScheda)+'</div>';
			document.getElementById("menuScheda").classList.add("visSch");
			document.getElementById("btnMenuScheda").classList.add("btnFix");
			document.getElementById("menuScheda").innerHTML=txt;
		}else{
			document.getElementById("menuScheda").classList.remove("visSch");
			document.getElementById("btnMenuScheda").classList.remove("btnFix");
			document.getElementById("menuScheda").innerHTML="";
		}
	},
	stampaScheda: function( obj ){
		if(typeof(noInt)=='undefined')var noInt = false;
		if(document.getElementById("menuScheda").className.indexOf("visSch")>-1)SCHEDA.swMenuScheda();
		// verifico le autorizzazioni
		if(!DB.login.data.auths.length && tipoApp!='AM'){
			setTimeout(function(){
				ALERT(Lingua(TXT_MsgFunzioneSoloPay));
			},100);
			return;
		}
		// --------------------------
		document.getElementById("stampa").classList.toggle("visSch");
		var d = new Date();
		var annoAtt=d.getFullYear();
		var cartaIntestata = false;
		var TITOLO_PAGINA = htmlEntities(nomeApp)+'&#8482; - '+htmlEntities(sloganApp);
		if(typeof(obj)=='undefined'){
			var titolo = document.getElementById("scheda_titolo").innerHTML;
			var corpo = document.getElementById("scheda_testo").querySelector(".scheda_stampa").outerHTML;
		}else{
			cartaIntestata = true;
			var titolo = '';
			if(JSON.stringify(obj)!='{}')TITOLO_PAGINA = htmlEntities(obj.titolo)+" "+htmlEntities(Lingua(TXT_per))+" "+htmlEntities(obj.intestazione)
			var dati = '<p>'+htmlEntities(Lingua(TXT_per))+' '+htmlEntities(obj.intestazione) + '</p>' + 
						'<p>'+htmlEntities(obj.corpo) + '</p>' + 
						'<p style="padding-left:50px;padding-top:50px;"><i>' + Lingua(TXT_Data) + ':</i> ' + getFullDataTS(d/1000) + '<br><br>' +
						'<i style="font-size:15px;">' + DB.login.data.Nominativo + '</i></p>';
						
			if(JSON.stringify(obj)!='{}')var corpo = dati;
			else{
				var titolo = document.getElementById("scheda_titolo").innerHTML;
				var corpo = document.getElementById("scheda_testo").querySelector(".scheda_stampa").outerHTML;
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
				'<html>' +
				'	<head>' +
				'		<script language="Javascript">' +
				'			setTimeout(function(){' +
				'				parent.document.getElementById("stampa").classList.toggle("visSch");' +
				'				window.print();' +
				'				window.close();' +
				'			},2000);' +
				'		</script>' +
						HTML_styles +
				'		<title>' +
				'			'+TITOLO_PAGINA+'' +
				'		</title>' +
				'	</head>' +
				'	<body style="background:#FFF;">';
		if(!cartaIntestata)HTML += 
				'		<div style="margin-bottom:10px;' +
				'					border-bottom:1px solid #DDD;' +
				'					width:100%;">'+
		 		'			<table width="100%"' +
				'				   id="testataStampa"' +
				'				   cellpadding="10"' +
				'				   cellspacing="0"' +
				'				   border="0">' +
				'				<tr>' +
				'					<td>' +
				'						<img src="img/logo_' +
										(tipoApp=='AM' || tipoApp=='AM_light' ? 'AM' : 'iaomai') +
										'_Bucato_Beige.png"' +
				'				   			 width="125"' +
				'				   			 height="38" />' +
				'				   	</td>' +
				'				   	<td align="right"' +
				'				   		valign="middle"' +
				'				   		style="font-size:11px;">' +
				'				   		&copy;'+annoAtt+' '+htmlEntities(nomeApp)+'&#8482; | All rights reserved' +
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
		if(titolo)HTML +=
				'			<h1 style="font-size: 27px;' +
				'			   		   font-weight: normal;' +
				'			   		   text-align: right;' +
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
				'			   	 	  			padding-left:20px;' +
				'			   	 	  			padding-right:20px;' +
				'			   	 	  			display:block;' +
				'			   	 	  			height:auto;' +
				'			   	 	  			overflow:visible;' +
				'			   	 	  			text-align: left;">' +
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
		document.getElementById("elenchi").classList.add("visSch");
		document.getElementById("elenchi_pulsanti").classList.add("visSch");
		document.getElementById("scheda").classList.add("visSch_1");
		if(!smartMenu)SCHEDA.chiudiElenco();
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
	apriElenco: function( tipo ){
		var visGuida = false;
		if(	!document.getElementById("elenchi_cont").classList.contains("visSch") || 
			!document.getElementById("elenchi").classList.contains("vis_"+tipo))visGuida=true;
		document.getElementById("elenchi_cont").classList.add("visSch");
		var livello = SCHEDA.livelloApertura;
		//if(!document.getElementById("elenchi").classList.contains("LISTE"))livello = 2;
		SCHEDA.setMenuDim(livello);
		MENU.desIcona();
		MENU.chiudiMenu();
		if(typeof(expanded)=='undefined')var expanded = false;
		if(typeof(tipo)=='undefined')var tipo = false;
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
				if(!SCHEDA.elencoSel)GUIDA.visFumetto("guida_archivi");
			}else{
				try{
					if(!SCHEDA.elencoSel)GUIDA.visFumetto("guida_set");
				}catch(err){};
			}
		}
	},
	fissaMenuEspanso: function( tipo ){
		SCHEDA.livelloApertura = tipo;
		localStorage.livelloApertura = tipo;
		if(SCHEDA.livelloApertura==3)document.getElementById("scheda_linguette").classList.add("fixExp");
		else document.getElementById("scheda_linguette").classList.remove("fixExp");
	},
	setMenuDim: function( tipo, daBtn ){
		if(typeof(daBtn) == 'undefined')var daBtn = false;
		
		// forzo l'apertura compressa se c'è una scheda aperta
		if(	SCHEDA.livelloApertura==3 && 
			document.getElementById("scheda").classList.contains("visSch") && 
			tipo==3 )tipo=2;
			
		switch(tipo){
			case 1:
				document.getElementById("l1").classList.add("visBtn");
				document.getElementById("l2").classList.remove("visBtn");
				document.getElementById("l3").classList.remove("visBtn");
				document.getElementById("lF").classList.remove("visBtn");
				document.getElementById("icone").classList.add("iconeNasc");
				document.getElementById("scheda").classList.remove("schRid");
				document.getElementById("scheda").classList.remove("schExp");
				
				document.getElementById("elenchi").classList.remove("schExp");
				document.getElementById("elenchi").classList.add("iconeNasc");
				document.getElementById("icone").classList.remove("iconeHome");
				break;
				
			case 2:
				document.getElementById("l1").classList.remove("visBtn");
				document.getElementById("l2").classList.add("visBtn");
				document.getElementById("l3").classList.remove("visBtn");
				document.getElementById("lF").classList.remove("visBtn");
				document.getElementById("icone").classList.remove("iconeNasc");
				document.getElementById("scheda").classList.add("schRid");
				document.getElementById("scheda").classList.remove("schExp");
				
				document.getElementById("elenchi").classList.remove("schExp");
				document.getElementById("elenchi").classList.remove("iconeNasc");
				document.getElementById("icone").classList.remove("iconeHome");
				//if(daBtn){
				if((document.getElementById("scheda").classList.contains("visSch") || daBtn) && smartMenu){
					var liste = document.getElementById("elenchi").getElementsByClassName("lista");
					for(i=liste.length-1;i>=0;i--){
						var els = liste[i].getElementsByClassName("cartellaAperta");
						var l = els.length;
						var c = 0;
						if(l){
							for(e=l-1;e>=0;e--){
								if(els[e].getElementsByTagName("span")[0].id!=SCHEDA.ultimaCartella){
									els[e].classList.remove("cartellaAperta");
									c++;
								}
							}
							if(c == l && els[0]){
								els[0].parentElement.classList.remove("cont_cartellaAperta");
							}
						}
					}
				}
				break;
				
			case 3:
				document.getElementById("l1").classList.remove("visBtn");
				document.getElementById("l2").classList.remove("visBtn");
				document.getElementById("l3").classList.add("visBtn");
				document.getElementById("lF").classList.add("visBtn");
				document.getElementById("icone").classList.remove("iconeNasc");
				document.getElementById("scheda").classList.remove("schRid");
				document.getElementById("scheda").classList.add("schExp");
				
				if(document.getElementById("elenchi_cont").classList.contains("visSch")){
					document.getElementById("elenchi").classList.add("schExp");
					document.getElementById("elenchi").classList.remove("iconeNasc");
				}else{
					document.getElementById("icone").classList.add("iconeHome");
					MENU.chiudiMenu();
				}
				if(	smartMenu &&
					document.getElementById("elenchi").classList.contains("LISTE") && 
					SCHEDA.livelloApertura == 2 )GUIDA.visFumetto('guida_fix');
				break;
				
		}
		SCHEDA.verPosScheda();
	},
	chiudiElenco: function(){
		var aperto = document.getElementById("elenchi_cont").classList.contains("visSch");
		//console.log(aperto)
		document.getElementById("elenchi_cont").classList.remove("visSch");
		document.getElementById("scheda").classList.remove("schOp");
		MENU.desIcona();
		SCHEDA.setMenuDim(2)
		MENU.setTT();
	},
	torna: function( daCarica ){
		if(document.getElementById("scheda").className.indexOf("schedaRitorno") > -1){
			try{
				SET._torna({
					"daCarica": daCarica
				});
			}catch(err){}
			document.getElementById("scheda").classList.add(SCHEDA.classeAperta);
			document.getElementById("scheda").classList.remove("schedaRitorno");
			document.getElementById("scheda_titolo").innerHTML=document.getElementById("scheda_ritorno").getElementsByTagName("div")[0].innerHTML;
			document.getElementById("scheda_testo").style.height = SCHEDA.memHrit;
			eval(SCHEDA.functRitorno);
			SCHEDA.scheda2Aperta = false;
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
		
		if(document.getElementById("elenchi").classList.contains("LISTE"))SCHEDA.setMenuDim(SCHEDA.livelloApertura);
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
		if(SCHEDA.elencoSelBase=='pazienti' && PAZIENTI.idCL>-1 && !forza){
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
		if(!document.getElementById("elenchi").classList.contains("LISTE"))SCHEDA.setMenuDim(2);
	},
	caricaPulsanti: function(html){
		document.getElementById("pulsanti_set").innerHTML=html;
	},
	scaricaPulsanti: function(){
		document.getElementById("pulsanti_set").innerHTML='';
	},
	swCartella: function( el, forza ){
		if(typeof(forza) == 'undefined')var forza = false;
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
		var mm = 90;
		if(smartMenu)mm += 5 + document.getElementById("elenchi").scrollHeight + document.getElementById("icone").scrollHeight;
		else if(!SCHEDA.libera.stato)mm+=20;
		return mm;
	},
	verPosScheda: function(){
		if(document.getElementById("scheda").classList.contains("visSch")){
			if(!SCHEDA.libera.stato){
				// sgangiata
				var h = 0;
				var mm = 20;
				if(smartMenu)mm = 1;
				//if(!SCHEDA.libera.stato)mm=20;
				if(tCoord(document.getElementById("scheda"),'y') < mm){
					h = (HF()-SCHEDA.getMM()+SCHEDA.gapScheda);
				}else{
					h = (HF()-(SCHEDA.memY-SCHEDA.gapScheda)-SCHEDA.getMM()+mm);
				}
				document.getElementById("scheda_testo").style.height = h+"px";
				SCHEDA.memY = tCoord(document.getElementById("scheda"),'y');
				if(h<=150)document.getElementById("scheda").classList.add("h150");
				else document.getElementById("scheda").classList.remove("h150");
			}else{
				// agganciata
				var limiteW = WF();
				var limiteH = HF()-SCHEDA.gapScheda;
				var limiteXmax = WF()-20;
				var limiteYmax = HF()-63;
				var limiteXmin = 20 - document.getElementById("scheda").scrollWidth;
				if(document.getElementById("scheda").scrollWidth > limiteW){
					document.getElementById("scheda").style.width = limiteW+"px";
					SCHEDA.libera.w = limiteW;
				}
				if(document.getElementById("scheda").scrollWidth < 350){
					document.getElementById("scheda").style.width = "350px";
					SCHEDA.libera.w = 350;
				}
				if(document.getElementById("scheda").scrollHeight < 180){
					document.getElementById("scheda_testo").style.height = (180-SCHEDA.getMM()+13)+"px";
					SCHEDA.libera.h = 180;
				}
				if(document.getElementById("scheda").scrollHeight > limiteH){
					document.getElementById("scheda_testo").style.height = (limiteH-SCHEDA.getMM()+13)+"px";
					SCHEDA.libera.h = limiteH;
				}
				if(tCoord(document.getElementById("scheda")) > limiteXmax){
					document.getElementById("scheda").style.left = limiteXmax + 'px';
					SCHEDA.libera.x = limiteXmax;
				}
				if(tCoord(document.getElementById("scheda"),'y') < -51){
					document.getElementById("scheda").style.top = '-51px';
					SCHEDA.libera.y = -51;
				}
				if(tCoord(document.getElementById("scheda"),'y') > limiteYmax){
					document.getElementById("scheda").style.top = limiteYmax + 'px';
					SCHEDA.libera.y = limiteYmax;
				}
				if(tCoord(document.getElementById("scheda")) < limiteXmin){
					document.getElementById("scheda").style.left = limiteXmin + 'px';
					SCHEDA.libera.x = limiteXmin;
				}
			}
		}
	},
	verRedim: function(){
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
		if(azElimina)HTML += '<div class="p_paz_el" onClick="'+azElimina+'">'+Lingua(TXT_Elimina)+'</div>';
		HTML += '<span id="btn_annulla" class="annullaBtn" onclick="'+azAnnulla+'">'+Lingua(TXT_Annulla)+'</span><span class="submitBtn" onclick="if(verifica_form(document.formMod))'+azSubmit+'">'+Lingua(TXT_Salva)+'</span></div>'+H.chr10;	
		return HTML;
	}
}
