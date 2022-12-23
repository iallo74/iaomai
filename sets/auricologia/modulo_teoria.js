
var MODULO_TEORIA = { // extend SET
	
	TEORIA_free: [ "0_0" ],
	
	caricaApprofondimenti: function(){ // carica la lista degli approfondimenti
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
	caricaTeoria: function( p, t, btn ){ // apre la scheda della teoria
		// verifico le autorizzazioni
		if(SET.TEORIA_free.indexOf(p+"_"+t)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(TXT("MsgContSoloPay"));
			return;
		}
		// --------------------------
		var addClose = '';
		var titolo = DB.set.teoria[p].contenuti[t].TitoloTeoria;
		var gruppo = __(DB.set.teoria[p].contenuti[t].gruppo);
		var html = "<h1>"+htmlEntities(titolo)+"</h1>";
		var html_cont = SET.convPuntiScheda(DB.set.teoria[p].contenuti[t].TestoTeoria);
		
		SET.hideGroupLines();
		if(gruppo){
			document.getElementById("sceltaPhaseElenco").selectedIndex = 0;
			SET.setPhase('');
			var mAtt=DB.set.teoria[2].contenuti[t].sigla;
			var elencoTsubo='<br><b>'+htmlEntities(TXT("ElencoPunti"))+'</b>';
			for(g in GEOMETRIE.gruppi[gruppo].punti){
				var TS = GEOMETRIE.gruppi[gruppo].punti[g];
				if(TS.length==3)elencoTsubo+='<p>[.'+TS+'.]</p>';
				else elencoTsubo+='<p><span class="pallinoNul"><span class="pNUL"></span>'+htmlEntities(TXT(""+TS))+'</span></p>';
			}
			html_cont = '<div class="col50">'+html_cont+'</div>' +
						'<div class="col50 elencoTsubo">' +
							SET.convPuntiScheda(elencoTsubo) +
						'</div>';
			if(GEOMETRIE.gruppi[gruppo].posizione){
				var pos = GEOMETRIE.gruppi[gruppo].posizione;
				normalizeRotation();
				rotateEnd = { x:pos.x, y: ((MODELLO.flip) ? 0-pos.y : pos.y), z:0 };
			}
			if(scene.getObjectByName(gruppo)){
				elPin = scene.getObjectByName(gruppo);
				elPin.visible = true;
				var center = getCenterPoint(elPin);
				this.diffX = center.x*1;
				this.diffY = center.y*1;
				panEndZero = { x: ((MODELLO.flip) ? center.x*1 : 0-center.x*1), y: 0-center.y*1, z: 0-center.z*1 };
				panEnd = { x: 0, y: 0, z: 0 };
			}
			addClose = "SET.hideGroupLines();";
		}
		
		html += html_cont;
		
		var ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_teoria')";
			
		var btnAdd = 	'';
							
		SCHEDA.caricaScheda( 	titolo,
								html,
								'SET.annullaEvidenziaTsubo();'+addClose,
								'scheda_teoria',
								ritorno,
								true,
								btn,
								btnAdd );
		SET.evidenziaTsubo(html);
	},
	caricaVideo: function( p, t, btn ){ // apre la scheda del video
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
								'SET.annullaEvidenziaTsubo();',
								'scheda_video',
								false,
								true,
								btn,
								btnAdd );
	},
	hideGroupLines: function(){ // nasconde le linee guida dei gruppi
		var els = scene.getObjectByName("LNs"+SET.phase).children;
		for(e in els){
			if(__(els[e].userData.gruppo,false)){
				els[e].visible = false;
			}
		}
	},
	azRicercaTeoria: function( i, p ){  // apre la scheda della teoria dalla ricerca globale
		SCHEDA.swCartella( document.getElementById('btn_teoria_cart_'+i),true);
		SCHEDA.selElenco('teoria');
		SET.caricaTeoria( i, p, document.getElementById('btn_teoria_'+i+'_'+p));
		evidenziaParola();
		RICERCHE.nascondiGlobal();	
		SCHEDA.individuaElemento( 'btn_teoria_cart_'+i, "listaTeoria" );
	}
}