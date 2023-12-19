
var MODULO_TEORIA = { // extend SET

	TEORIA_free: [
		"0_0", "0_1", "2_1", "4_0", "4_1", "4_2"
	],
	
	caricaApprofondimenti: function(){
		// carica la lista degli approfondimenti
		var contTeoria = '';
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
			
			contTeoria += CONT;
		}
		
		document.getElementById("lista_teoria").innerHTML = '<div class="lista listaTeoria">' +
																contTeoria +
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
		var apparato = __(DB.set.teoria[p].contenuti[t].apparato);
		var anatomia = __(DB.set.teoria[p].contenuti[t].anatomia);
		var meridianiSecondari = __(DB.set.teoria[p].contenuti[t].meridianiSecondari);
		var html = '';
		var addTabStyle = '';
		

		if(occhiello)html += "<i>"+htmlEntities(occhiello)+"</i>";
		html += "<h1>"+htmlEntities(titolo)+"</h1>";

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
								"SET.ripristinaHiddenGroups();SET.ripristinaOpAnatomy();SET.annullaEvidenziaPunto();",
								'scheda_teoria'+addTabStyle,
								ritorno,
								true,
								btn,
								btnAdd,
								globals.set.cartella+'_teoria_'+p+"_"+t );
		SET.evidenziaPunto();
		SET.ripristinaHiddenGroups();
		if(apparato){
			SET.hiddenGroups_safe = clone(SET.hiddenGroups);
			for(let t=1;t<=9;t++)SET.hiddenGroups[t] = true;
			SET.swGruppo(apparato);
			SET.filtraGruppo();
		}
		SET.ripristinaOpAnatomy();
		if(anatomia){
			SET.opAnatomy_safe = {
				pelle: 		MENU.getOp("pelle"),
				ossa: 		MENU.getOp("ossa"),
				vasi: 		MENU.getOp("vasi"),
				muscoli: 	MENU.getOp("muscoli3d"),
				legamenti: 	MENU.getOp("legamenti")
			}
			switch(anatomia){
				case "Vasi":
					MODELLO.op("Pelle",0.166);
					MODELLO.op("Muscoli3d",0);
					MODELLO.op("Ossa",0.5);
					MODELLO.op("Legamenti",0);
					MODELLO.op("Vasi",1);
					break;
				case "Ossa":
					MODELLO.op("Pelle",0.166);
					MODELLO.op("Muscoli3d",0);
					MODELLO.op("Ossa",1);
					MODELLO.op("Legamenti",0);
					MODELLO.op("Vasi",0);
					break;
				case "Muscoli":
					MODELLO.op("Pelle",0.166);
					MODELLO.op("Muscoli3d",1);
					MODELLO.op("Ossa",0.5);
					MODELLO.op("Legamenti",0);
					MODELLO.op("Vasi",0);
					break;
				case "Legamenti":
					MODELLO.op("Pelle",0.166);
					MODELLO.op("Muscoli3d",0);
					MODELLO.op("Ossa",0.5);
					MODELLO.op("Legamenti",1);
					MODELLO.op("Vasi",0);
					break;
			}
			SETS.children[0].visible = false;
			MENU.aggiornaIconeModello();
			ctrl_fixed = true;
			keyDownStage({keyCode:0});
		}
	},
	selAnatomy: function( tipo, ids ){
		if(typeof(ids)!='object')ids = [ids];
		MENU.chiudiAllSelected();
		switch(tipo){
			case "Muscolo":
				for(id in ids){
					MODELLO.isolaMuscolo3d(document.getElementById('Muscolo_'+ids[id]), '', true);
					MODELLO.isolaAnatomia('Muscolo3d','Muscolo_'+ids[id]+'_DX');
				}
				break;
			case "Osso":
				console.log(ids)
				console.log(typeof(ids))
				for(id in ids)MODELLO.isolaOsso(document.getElementById('Osso_'+ids[id]), '', true);
				break;
			case "Legamento":
				for(id in ids)MODELLO.isolaLegamento(document.getElementById('Legamento_'+ids[id]), '', true);
				break;
			case "Vaso":
				for(id in ids)MODELLO.isolaVaso(document.getElementById('Vaso_'+ids[id]), '', true);
				break;
		}
		
	},
	linkTeo: function(s,t){
		SET.caricaApprofondimento(s,t,document.getElementById("btn_teoria_"+s+"_"+t));
		SCHEDA.swCartella(document.getElementById("btn_teoria_cart_"+s),true);
	},
	ripristinaOpAnatomy: function(){
		if(SET.opAnatomy_safe){
			MENU.chiudiAllSelected();
			ctrl_fixed = false;
			keyUpStage({keyCode:17});
			MODELLO.op("Pelle",		SET.opAnatomy_safe["pelle"]);
			MODELLO.op("Muscoli3d",	SET.opAnatomy_safe["muscoli"]);
			MODELLO.op("Ossa",		SET.opAnatomy_safe["ossa"]);
			MODELLO.op("Legamenti",	SET.opAnatomy_safe["legamenti"]);
			MODELLO.op("Vasi",		SET.opAnatomy_safe["vasi"]);
			SET.opAnatomy_safe = null;
			SETS.children[0].visible = true;
			MENU.aggiornaIconeModello();
		}
	},
	ripristinaHiddenGroups: function(){
		if(SET.hiddenGroups_safe){
			for(let t=1;t<=9;t++){
				if(SET.hiddenGroups[t] != SET.hiddenGroups_safe[t])SET.swGruppo(t);
			}
			SET.hiddenGroups_safe = null;
		}
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