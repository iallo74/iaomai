
var MODULO_TEORIA = { // extend SET

	TEORIA_free: [
		"0_0",
		"0_1",
		"0_2",
		/*"1_0",
		"2_0",
		"3_0",*/
		"4_3",
		"6_0",
		"6_1"
	],
	
	aggiungiPuntiParticolari: function(){
		var contProvv = document.createElement('div');
		contProvv.id = 'contProvv';
		contProvv.style.display = 'hidden';
		contProvv.innerHTML = DB.set.teoria[1].contenuti[3].TestoTeoria;
		document.body.appendChild(contProvv);
		DB.set.teoria.push({
			TitoloSezione: DB.set.teoria[1].contenuti[3].TitoloTeoria,
			contenuti: [],
			noVis: true
		});
		let re = /\[\.[0-9]{1,2}\.[A-Z]{2}[\.*]+\]/ig;
		for(let t=1;t<=10;t++){
			let testo = '';
			let punti = document.getElementById("sz"+t).innerHTML.match(re);
			for(let p=0;p<punti.length;p++){
				testo += punti[p];
			}
			DB.set.teoria[DB.set.teoria.length-1].contenuti.push({
				TitoloTeoria: document.getElementById("tz"+t).innerText,
				TestoTeoria: testo
			});
		}
		document.body.removeChild(contProvv);
	},
	caricaApprofondimenti: function(){
		// carica la lista degli approfondimenti
		var contTeoria = '';
		for(let p in DB.set.teoria){
			if(!__(DB.set.teoria[p].noVis)){
				if(__(DB.set.teoria[p].label))contTeoria += '<p class="labelCartella">'+DB.set.teoria[p].label+'</p>';
				contTeoria += 	'<div class="cartella" onTouchStart="SCHEDA.setCartella(this);">' +
								'	<span id="btn_teoria_cart_'+p+'" onClick="SCHEDA.swCartella(this);">' +
										DB.set.teoria[p].TitoloSezione +
								'	</span>' +
								'	<div>';
								
				for(t in DB.set.teoria[p].contenuti){
					
					// verifico le autorizzazioni
					var addLock = 	(!SET.verFreeTeoria(p+"_"+t))? ' lockedItem' : '';
					if(	(DB.login.data.modls.indexOf("CIN")==-1 && p==1) ||
						(DB.login.data.modls.indexOf("NMK")==-1 && p==2) ||
						(DB.login.data.modls.indexOf("MAS")==-1 && p==3) )addLock = ' lockedItem';
					// --------------------------
					TitoloTeoria = DB.set.teoria[p].contenuti[t].TitoloTeoria;
					funct = 'Approfondimento';
					addClass = '';
					if(TitoloTeoria.indexOf("[video]")>-1){
						var pT = TitoloTeoria.split("[video]");
						TitoloTeoria = pT[0];
						funct = 'Video';
						addClass = 'cart_video';
					}
					contTeoria += 	'<div id="btn_teoria_'+p+'_'+t+'"' +
									'     class="cart_els '+addClass+addLock+'"' +
									'     onClick="SET.carica'+funct+'('+p+','+t+',this);">' +
										TitoloTeoria +
									'</div>';
				}
				contTeoria += '</div></div>';
			}
		}
		document.getElementById("lista_teoria").innerHTML = '<div class="lista listaTeoria">' +
																contTeoria +
															'</div>';
	},
	caricaApprofondimento: function( p, t, btn ){
		// apre la scheda di un approfondimento
		// verifico le autorizzazioni
		var pass = !SET.verFreeTeoria(p+"_"+t);
		if(	(DB.login.data.modls.indexOf("CIN")==-1 && p==1) ||
			(DB.login.data.modls.indexOf("NMK")==-1 && p==2) ||
			(DB.login.data.modls.indexOf("MAS")==-1 && p==3) )pass = true;
		if( pass ){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		var titolo = DB.set.teoria[p].contenuti[t].TitoloTeoria;
		var subsect = __(DB.set.teoria[p].contenuti[t].subsect);
		var meridianiSecondari = __(DB.set.teoria[p].contenuti[t].meridianiSecondari);
		var html = '';
		var addTabStyle = '';
		
		if(DB.set.teoria[p].contenuti[t].sigla){
			let meridiano = DB.set.teoria[p].contenuti[t].sigla;
			let ideogramma = '';
			let ideogrammaOr = DB.mtc.meridiani[meridiano].ideogramma ;
			lI = ideogrammaOr.length;
			for(let l=0;l<lI;l++){
				ideogramma += ideogrammaOr[l];
				if(l<lI-1)ideogramma += "<br>";
			}
			html += '<div class="ideogrammaMeridianoChar"><img src="img/speach2W.png" onClick="SET.speachName(\''+meridiano+'\');" class="noPrint">'+ideogramma+'</div>';
			addTabStyle = ' scheda_ideogramma';
		}

		html += "<h1>"+htmlEntities(titolo)+"</h1>";
		//var html_cont = SET.convPuntiScheda(DB.set.teoria[p].contenuti[t].TestoTeoria);
		
		// aggiungo contenuto custom
		var html_cont = CUSTOMS.addContent("teoria_"+p+"_"+t,SET.convPuntiScheda(DB.set.teoria[p].contenuti[t].TestoTeoria));

		html += html_cont;
		
		var ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_teoria');document.getElementById('scheda').classList.remove('scheda_ideogramma');";
		
		var btnAdd = 	'';
							
		SCHEDA.caricaScheda( 	titolo,
								html,
								'SET.annullaEvidenziaPunto();SET.spegniMeridiani(true);',
								'scheda_teoria'+addTabStyle,
								ritorno,
								true,
								btn,
								btnAdd,
								globals.set.cartella+'_teoria_'+p+"_"+t );
		SET.convSigleScheda();
		let elsSzTeo = document.getElementById("scheda_testo").getElementsByClassName("szTeo");
		if(elsSzTeo.length == -1)SET.evidenziaPunto();
		
		SET.spegniMeridianoSecondario();
		setTimeout( function(meridianiSecondari){
			if(meridianiSecondari){
				for(let m in meridianiSecondari){
					if(meridianiSecondari[m].indexOf("_")==-1)SET.accendiMeridiano(meridianiSecondari[m],false,true);
					SET.accendiMeridianoSecondario(meridianiSecondari[m],true);
				}
			}
		},250,meridianiSecondari);
	},
	caricaVideo: function( p, t, btn ){
		// carica un approfondimento video
		// verifico le autorizzazioni
		if(!SET.verFreeTeoria(p+"_"+t)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		if(!CONN.getConn()){
			ALERT(TXT("ConnessioneAssente"));
			return;
		}
		var titolo = DB.set.teoria[p].contenuti[t].TitoloTeoria;
		var pT = titolo.split("[video]");
		titolo = pT[0];
		video = pT[1];
		var html = 	'<video controls="controls"' +
					'       width="100%"' +
					'       height="100%"' +
					'       id="VideoID"' +
					'       src="https://www.iaomai.app/app/video/'+video+'.mp4">' +
					'</video>';
		
		var btnAdd = 	'';
		
		SCHEDA.caricaScheda( 	titolo,
								html,
								'SET.annullaEvidenziaPunto();SET.spegniMeridiani(true);',
								'scheda_video',
								false,
								true,
								btn,
								btnAdd );
	},
	swSz: function( el, n ){
		let elsSzVis = document.getElementById("scheda_testo").getElementsByClassName("szVis");
		if(elsSzVis.length > -1){
			for(e=elsSzVis.length-1;e>=0;e--){
				elsSzVis[e].classList.remove("szVis");
			}
		}
		document.getElementById("sz"+n).classList.toggle("szVis");
		el.classList.toggle("szVis");
		SET.evidenziaPunto(document.getElementById("sz"+n));
	},
	azRicercaTeoria: function( i, p ){
		// apre una scheda di approfondimento dalla ricerca globale
		SCHEDA.swCartella( document.getElementById('btn_teoria_cart_'+i),true);
		SCHEDA.selElenco('teoria');
		SET.caricaApprofondimento( i, p, document.getElementById('btn_teoria_'+i+'_'+p));
		evidenziaParola();
		RICERCHE.nascondiGlobal();	
		SCHEDA.individuaElemento( 'btn_teoria_cart_'+i, "listaTeoria" );
	},
	verFreeTeoria: function( t ){
		return !(SET.TEORIA_free.indexOf(t)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	} 
}