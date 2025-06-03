
var MODULO_TEORIA = { // extend SET
	
	TEORIA_free: [ "0_0", "0_1", "4_0", "4_1", "4_2" ],
	
	caricaApprofondimenti: function(){ // carica la lista degli approfondimenti
		let contTeoria = '';
		for(let p in DB.set.teoria){
			contTeoria += 	'<div class="cartella" onTouchStart="SCHEDA.setCartella(this);">' +
							'	<span id="btn_teoria_cart_'+p+'" onClick="SCHEDA.swCartella(this);">' +
							 		DB.set.teoria[p].TitoloSezione +
							'	</span>' +
							'	<div>';
							
			for(t in DB.set.teoria[p].contenuti){
				
				// verifico le autorizzazioni
				let addLock = 	(!SET.verFreeTeoria(p+"_"+t))? ' lockedItem' : '';
				// --------------------------
				let TitoloTeoria = DB.set.teoria[p].contenuti[t].TitoloTeoria;
				funct = 'Approfondimento';
				let addClass = '';
				if(TitoloTeoria.indexOf("[video]")>-1){
					let pT = TitoloTeoria.split("[video]");
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
	caricaApprofondimento: function( p, t, btn ){ // apre la scheda della teoria
		// verifico le autorizzazioni
		if(!SET.verFreeTeoria(p+"_"+t)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		let addClose = '',
			titolo = DB.set.teoria[p].contenuti[t].TitoloTeoria,
			gruppo = __(DB.set.teoria[p].contenuti[t].gruppo),
			forzaHidden = __(DB.set.teoria[p].contenuti[t].forzaHidden),
			html = "<h1>"+htmlEntities(titolo)+"</h1>",
			html_cont = SET.convPuntiScheda(DB.set.teoria[p].contenuti[t].TestoTeoria),
			anatomia = __(DB.set.teoria[p].contenuti[t].anatomia,''),
			mappa = __(DB.set.teoria[p].contenuti[t].mappa,'');
		if(SET.forzaDissolve){
			MODELLO.op("Pelle",SET.forzaDissolve.Pelle);
			MODELLO.op("Ossa",SET.forzaDissolve.Ossa);
			MODELLO.op("Vasi",SET.forzaDissolve.Vasi);
			SET.forzaDissolve = false;
		}
		if(SET.mappaOr){
			SET.cambiaMappa(SET.mappaOr);
			SET.mappaOr = '';
		}
		
		SET.hideGroupLines();
		if(gruppo){
			let mAtt=DB.set.teoria[SET.idTeoCategorie].contenuti[t].sigla,
				elencoPunti='<br><b>'+htmlEntities(TXT("ElencoPunti"))+'</b>',
				priority = __(GEOMETRIE.gruppi[gruppo].priority,false),
				puntiElenco = [];
			for(let g in GEOMETRIE.gruppi[gruppo].punti){
				let siglaPunto = GEOMETRIE.gruppi[gruppo].punti[g];
				if(siglaPunto.length==3 && DB.set.punti[siglaPunto]){
					if(!__(DB.set.punti[siglaPunto].hidden,false) || forzaHidden){
						let NomePunto = siglaPunto.length==3 ? DB.set.punti[siglaPunto].NomePunto : siglaPunto,
							ordine = NomePunto,
							categoria = '';
						if(priority){
							if(priority.punti.indexOf(siglaPunto)>-1){
								ordine = siglaPunto + ": " + ordine;
								categoria = priority.tipoOn;
							}else{
								categoria = priority.tipoOff;
							}
						}
						puntiElenco.push({
							ordine: ordine,
							siglaPunto: siglaPunto,
							NomePunto: NomePunto,
							categoria: categoria
						});
					}
				}
			}
			if(__(GEOMETRIE.gruppi[gruppo].ordine)=='alfabetico')puntiElenco.sort(sort_by("ordine", false));

			let catV = categoria = '';
			for(let g in puntiElenco){
				if(puntiElenco[g].categoria && puntiElenco[g].categoria != catV){
					elencoPunti+='<p class="categoriaGruppo"><i>'+TXT("Gruppi_"+puntiElenco[g].categoria)+'</i></p>';
				}
				catV = puntiElenco[g].categoria;
				let TS = puntiElenco[g].siglaPunto;
				if(TS.length==3){
					elencoPunti+='<p>[.'+TS+'.]</p>';
				}
				else elencoPunti+='<p><span class="pallinoNul"><span class="pNUL"></span>'+htmlEntities(TXT(""+TS))+'</span></p>';
			}
			
			html_cont = '<div>'+html_cont+'</div>' +
						'<div class="elencoPunti visSch">' +
							SET.convPuntiScheda(elencoPunti) +
						'</div>';
			if(GEOMETRIE.gruppi[gruppo].posizione){
				let pos = GEOMETRIE.gruppi[gruppo].posizione;
				normalizeRotation();
				rotateEnd = { x:pos.x, y: ((MODELLO.flip) ? 0-pos.y : pos.y), z:0 };
			}
			if(scene.getObjectByName(gruppo)){
				elPin = scene.getObjectByName(gruppo);
				elPin.visible = true;
				let center = getCenterPoint(elPin);
				this.diffX = center.x*1;
				this.diffY = center.y*1;
				panEndZero = { x: ((MODELLO.flip) ? center.x*1 : 0-center.x*1), y: 0-center.y*1, z: 0-center.z*1 };
				panEnd = { x: 0, y: 0, z: 0 };
			}
			addClose = "SET.hideGroupLines();";
		}

		// aggiungo contenuto custom
		html_cont = CUSTOMS.addContent("teoria_"+p+"_"+t,html_cont);

		html += html_cont;
		
		let ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_teoria')";
			
		let btnAdd = 	'';
							
		SCHEDA.caricaScheda( 	titolo,
								html,
								'SET.annullaEvidenziaPunto(true);'+addClose,
								'scheda_teoria',
								ritorno,
								true,
								btn,
								btnAdd,
								globals.set.cartella+'_teoria_'+p+"_"+t );
		
		SCHEDA.gestVisAnatomia(true);
		SET.evidenziaPunto(null,anatomia,mappa);
	},
	
	scriviProtocollo: function( protocollo ){
		let protocolli = {
			"lovato_g": {
				t: TXT("ProtocolloLovatoG"),
				p: SET.getPatFromScheda(102)
			},
			"lovato_i": {
				t: TXT("ProtocolloLovatoI"),
				p: SET.getPatFromScheda(102)
			},
			"nada": {
				t: TXT("ProtocolloNada"),
				p: SET.getPatFromScheda(103)
			},
			"rossato": {
				t: TXT("ProtocolloRossato"),
				p: SET.getPatFromScheda(101)
			},
			"nogier": {
				t: TXT("ProtocolloNogier"),
				p: SET.getPatFromScheda(100)
			}
		};
		
		return '<a onClick="SET.apriPatologia('+protocolli[protocollo].p+',document.getElementById(\'btn_patologia_'+protocolli[protocollo].p+'\'));">'+protocolli[protocollo].t+'</a>';
	},
	
	hideGroupLines: function(){ // nasconde le linee guida dei gruppi
		let els = scene.getObjectByName("LNs").children;
		for(let e in els){
			if(__(els[e].userData.gruppo,false)){
				els[e].visible = false;
			}
		}
	},
	azRicercaTeoria: function( i, p ){  // apre la scheda della teoria dalla ricerca globale
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