
var MODULO_TEORIA = { // extend SET

	TEORIA_free: [
		"0_0",
		"0_1",
		"0_2",
		"0_3",
		"0_4",
		"0_5",
		"0_6",
		"0_7",
		"0_8",
		"0_9",
		"0_10",
		"1_3",
		"2_0",
		"3_0"
	],
	
	caricaApprofondimenti: function(){
		// carica la lista degli approfondimenti
		var contTeoria = '';
		var contCanali = '';
		for(p in DB.set.teoria){
			
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
				funct = 'Teoria';
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
	caricaTeoria: function( p, t, btn ){
		// apre la scheda di un approfondimento
		// verifico le autorizzazioni
		if(!SET.verFreeTeoria(p+"_"+t)){
			ALERT(TXT("MsgContSoloPay"));
			return;
		}
		// --------------------------
		var titolo = DB.set.teoria[p].contenuti[t].TitoloTeoria;
		var occhiello = __(DB.set.teoria[p].contenuti[t].OcchielloTeoria);
		var html = '';
		if(occhiello)html += "<i>"+htmlEntities(occhiello)+"</i>";
		html += "<h1>"+htmlEntities(titolo)+"</h1>";
		var html_cont = SET.convPuntiScheda(DB.set.teoria[p].contenuti[t].TestoTeoria);
		var meridianiSecondari = __(DB.set.teoria[p].contenuti[t].meridianiSecondari)
		/*
		// SCRIVE L'ELENCO DEGLI TSUBO DEL MERIDIANO
		if(p==1 || meridianiSecondari.indexOf("CV")>-1 || meridianiSecondari.indexOf("GV")>-1){
			var mAtt=DB.set.teoria[1].contenuti[t].sigla;
			var elencoTsubo='<b>Elenco degli tsubo</b>';
			for(s in DB.set.meridiani[mAtt].tsubo){
				var TS = DB.set.meridiani[mAtt].tsubo[s];
				elencoTsubo+='<p>'+this.scriviTsubo(TS.NomeTsubo,true)+'</p>';
			}
			html_cont = '<div class="col50">'+html_cont+'</div>' +
						'<div class="col50 elencoTsubo">' +
							elencoTsubo +
						'</div>';
		}*/
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
								"SET.annullaEvidenziaTsubo();" +
								"SET.spegniMeridiani(true);" +
								"SET.spegniMeridianoSecondario('',true);" +
								"SET.spegniMeridiani(true);",
								'scheda_teoria',
								ritorno,
								espansa,
								btn,
								btnAdd );
		SET.convSigleScheda();
		SET.evidenziaTsubo(html);
		
		SET.spegniMeridianoSecondario();
		setTimeout( function(meridianiSecondari){
			if(meridianiSecondari){
				for(m in meridianiSecondari){
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
			ALERT(TXT("MsgContSoloPay"));
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
								'SET.annullaEvidenziaTsubo();SET.spegniMeridiani(true);',
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
		SET.caricaTeoria( i, p, document.getElementById('btn_teoria_'+i+'_'+p));
		evidenziaParola();
		RICERCHE.nascondiGlobal();	
		SCHEDA.individuaElemento( 'btn_teoria_cart_'+i, "listaTeoria" );
	},
	verFreeTeoria: function( t ){
		return !(SET.TEORIA_free.indexOf(t)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	}
}