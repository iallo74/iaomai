
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
		var contTeoria = '';
		for(p in DB.set.teoria){
			contTeoria += 	'<div class="cartella" onTouchStart="SCHEDA.setCartella(this);">' +
							'	<span id="btn_teoria_cart_'+p+'" onClick="SCHEDA.swCartella(this);">' +
							 		DB.set.teoria[p].TitoloSezione +
							'	</span>' +
							'	<div>';
							
			for(t in DB.set.teoria[p].contenuti){
				
				// verifico le autorizzazioni
				var addLock = 	SET.TEORIA_free.indexOf(p+"_"+t)==-1 && 
								(DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())? ' lockedItem' : '';
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
				contTeoria += 	'<div id="btn_teoria_'+p+'_'+t+'"' +
								'     class="cart_els '+addClass+addLock+'"' +
								'     onClick="SET.carica'+funct+'('+p+','+t+',this);">' +
									TitoloTeoria +
								'</div>';
			}
			contTeoria += '</div></div>';
		}
		document.getElementById("lista_teoria").innerHTML = '<div class="lista listaTeoria">' +
																contTeoria +
															'</div>';
	},
	caricaTeoria: function( p, t, btn ){
		// verifico le autorizzazioni
		if(SET.TEORIA_free.indexOf(p+"_"+t)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(TXT("MsgContSoloPay"));
			return;
		}
		// --------------------------
		var titolo = DB.set.teoria[p].contenuti[t].TitoloTeoria;
		var html = "<h1>"+htmlEntities(titolo)+"</h1>";
		var html_cont = SET.convPuntiScheda(DB.set.teoria[p].contenuti[t].TestoTeoria);

		/*if(p==1){
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
		
		var ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_teoria')";
		
		var btnAdd = 	'';
							
		SCHEDA.caricaScheda( 	titolo,
								html,
								'SET.annullaEvidenziaTsubo();SET.spegniMeridiani(true);',
								'scheda_teoria',
								ritorno,
								true,
								btn,
								btnAdd );
		SET.convSigleScheda();
		SET.evidenziaTsubo(html);
		//SET.evidenziaMeridiani(html);
	},
	caricaVideo: function( p, t, btn ){
		// verifico le autorizzazioni
		if(SET.TEORIA_free.indexOf(p+"_"+t)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
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
					'       src="https://www.tsubomap.com/app/video/'+video+'.mp4">' +
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
		SCHEDA.swCartella( document.getElementById('btn_teoria_cart_'+i),true);
		SCHEDA.selElenco('teoria');
		SET.caricaTeoria( i, p, document.getElementById('btn_teoria_'+i+'_'+p));
		evidenziaParola();
		RICERCHE.nascondiGlobal();	
		SCHEDA.individuaElemento( 'btn_teoria_cart_'+i, "listaTeoria" );
	}
}