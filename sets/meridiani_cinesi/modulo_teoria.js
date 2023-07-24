
var MODULO_TEORIA = { // extend SET

	TEORIA_free: [
		"0_0", "0_1", "0_2", "0_3", "0_4", "0_5", "0_6", "0_7", "0_8", "0_9", "0_10",
		"1_4", "2_0", "3_0", "4_0", "5_0", "6_0", "7_0", "8_0", "8_1", "8_2", "8_3", "8_4"
	],
	
	caricaApprofondimenti: function(){
		// carica la lista degli approfondimenti
		var contTeoria = '';
		var contCanali = '';
		for(let p in DB.set.teoria){
			
			var CONT = 	'<div class="cartella" onTouchStart="SCHEDA.setCartella(this);">' +
						'	<span id="btn_teoria_cart_'+p+'" onClick="SCHEDA.swCartella(this);">' +
								DB.set.teoria[p].TitoloSezione +
						'	</span>' +
						'	<div>';
							
			for(t in DB.set.teoria[p].contenuti){
				
				// verifico le autorizzazioni
				var addLock = 	(!SET.verFreeTeoria(p+"_"+t))? ' lockedItem' : '';
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
				CONT += '<div id="btn_teoria_'+p+'_'+t+'"' +
						'     class="cart_els '+addClass+addLock+'"' +
						'     onClick="SET.carica'+funct+'('+p+','+t+',this);">' +
							TitoloTeoria +
						'</div>';
			}
			CONT += '</div></div>';
			
			if(!__(DB.set.teoria[p].meridiani))contTeoria += CONT;
			else contCanali += CONT;
		}
		
		document.getElementById("lista_teoria").innerHTML = '<div class="lista listaTeoria">' +
																contTeoria +
															'</div>';
		document.getElementById("lista_canali").innerHTML = '<div class="lista listaTeoria">' +
																contCanali +
															'</div>';
	},
	caricaApprofondimento: function( p, t, btn ){
		// apre la scheda di un approfondimento
		// verifico le autorizzazioni
		if(!SET.verFreeTeoria(p+"_"+t)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		var titolo = DB.set.teoria[p].contenuti[t].TitoloTeoria;
		var occhiello = __(DB.set.teoria[p].contenuti[t].OcchielloTeoria);
		var meridianiSecondari = __(DB.set.teoria[p].contenuti[t].meridianiSecondari);
		var html = '';
		var addTabStyle = '';

		if(meridianiSecondari){
			let meridiano = meridianiSecondari[0].split("_")[0];
			let ideogramma = '';
			let ideogrammaOr = DB.mtc.meridiani?.[meridiano]?.ideogramma || DB.mtc.straordinari?.[meridiano]?.ideogramma;
			lI = ideogrammaOr.length;
			for(let l=0;l<lI;l++){
				ideogramma += ideogrammaOr[l];
				if(l<lI-1)ideogramma += "<br>";
			}
			html += '<div class="ideogrammaMeridianoChar"><img src="img/speach2W.png" onClick="SET.speachName(\''+meridiano+'\');" class="noPrint">'+ideogramma+'</div>';
			addTabStyle = ' scheda_ideogramma';
		}
		


		if(occhiello)html += "<i>"+htmlEntities(occhiello)+"</i>";
		html += "<h1>"+htmlEntities(titolo)+"</h1>";
		var html_cont = SET.convPuntiScheda(DB.set.teoria[p].contenuti[t].TestoTeoria);
		
		html += html_cont;
		var espansa = true;
		if(meridianiSecondari)espansa = false;
		
		var ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_teoria')";
		
		var btnAdd = 	'';
							
		SCHEDA.caricaScheda( 	titolo,
								html,
								"SET.annullaEvidenziaPunto();" +
								"SET.spegniMeridiani(true);" +
								"SET.spegniMeridianoSecondario('',true);" +
								"SET.spegniMeridiani(true);",
								'scheda_teoria'+addTabStyle,
								ritorno,
								espansa,
								btn,
								btnAdd,
								globals.set.cartella+'_teoria_'+p+"_"+t );
		SET.convSigleScheda();
		SET.evidenziaPunto();
		
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
					'       src="https://www.tecnichedelmassaggio.it/video/iaomai/'+video+'.mp4">' +
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