
var MODULO_TEORIA = { // extend SET
	
	TEORIA_free: [ "0_0", "0_1", "4_0", "4_1", "4_2" ],
	
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
		if(!SET.verFreeTeoria(p+"_"+t)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		var addClose = '';
		var titolo = DB.set.teoria[p].contenuti[t].TitoloTeoria;
		var test = __(DB.set.teoria[p].contenuti[t].test);
		var flowchart = __(DB.set.teoria[p].contenuti[t].flowchart);
		var gruppo = __(DB.set.teoria[p].contenuti[t].gruppo);
		var forzaHidden = __(DB.set.teoria[p].contenuti[t].forzaHidden);
		var html = "<h1>"+htmlEntities(titolo)+"</h1>";
		var html_cont = SET.convPuntiScheda(DB.set.teoria[p].contenuti[t].TestoTeoria);
		var anatomia = __(DB.set.teoria[p].contenuti[t].anatomia,'');
		var mappa = __(DB.set.teoria[p].contenuti[t].mappa,'');
		var lm = __(DB.set.teoria[p].contenuti[t].lm,'');
		if(SET.forzaDissolve){
			MODELLO.op("Pelle",SET.forzaDissolve.Pelle);
			MODELLO.op("Ossa",SET.forzaDissolve.Ossa);
			MODELLO.op("Visceri",SET.forzaDissolve.Visceri);
			SET.forzaDissolve = false;
		}
		if(SET.mappaOr){
			SET.cambiaMappa(SET.mappaOr);
			SET.mappaOr = '';
		}
		if(SET.lmOr!==''){
			if(SET.lmVis != SET.lmOr && globals.modello.cartella)SET.swLM();
			SET.lmOr = '';
		}
		SET.test = '';
		
		SET.hideGroupLines();
		if(gruppo){
			document.getElementById("sceltaPhaseElenco").selectedIndex = 0;
			if(SET.phase)setTimeout(function(){SET.setPhase('');},500);
			var mAtt=DB.set.teoria[SET.idTeoCategorie].contenuti[t].sigla;
			var elencoTsubo='<br><b>'+htmlEntities(TXT("ElencoPunti"))+'</b>';
			var priority = __(GEOMETRIE.gruppi[gruppo].priority,false);
			
			var puntiElenco = [];
			for(g in GEOMETRIE.gruppi[gruppo].punti){
				var siglaTsubo = GEOMETRIE.gruppi[gruppo].punti[g];
				if(siglaTsubo.length==3 && DB.set.punti[siglaTsubo]){
					if(!__(DB.set.punti[siglaTsubo].hidden,false) || forzaHidden){
						var NomeTsubo = siglaTsubo;
						if(siglaTsubo.length==3)NomeTsubo = DB.set.punti[siglaTsubo].NomeTsubo;
						var ordine = NomeTsubo;
						var categoria = '';
						if(priority){
							if(priority.punti.indexOf(siglaTsubo)>-1){
								ordine = siglaTsubo + ": " + ordine;
								categoria = priority.tipoOn;
							}else{
								categoria = priority.tipoOff;
							}
						}
						puntiElenco.push({
							ordine: ordine,
							siglaTsubo: siglaTsubo,
							NomeTsubo: NomeTsubo,
							categoria: categoria
						});
					}
				}
			}
			if(__(GEOMETRIE.gruppi[gruppo].ordine)=='alfabetico')puntiElenco.sort(sort_by("ordine", false));

			var catV = categoria = '';
			for(g in puntiElenco){
				if(puntiElenco[g].categoria && puntiElenco[g].categoria != catV){
					elencoTsubo+='<p class="categoriaGruppo"><i>'+TXT("Gruppi_"+puntiElenco[g].categoria)+'</i></p>';
				}
				catV = puntiElenco[g].categoria;
				var TS = puntiElenco[g].siglaTsubo;
				if(TS.length==3){
					elencoTsubo+='<p>[.'+TS+'.]</p>';
				}
				else elencoTsubo+='<p><span class="pallinoNul"><span class="pNUL"></span>'+htmlEntities(TXT(""+TS))+'</span></p>';
			}
			
			html_cont = '<div>'+html_cont+'</div>' +
						'<div class="elencoTsubo">' +
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
		if(test)html += SET.scriviTest(test);
		if(flowchart)html += SET.scriviFlowChart();
		
		var ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_teoria')";
			
		var btnAdd = 	'';
							
		SCHEDA.caricaScheda( 	titolo,
								html,
								'SET.annullaEvidenziaTsubo(true);'+addClose,
								'scheda_teoria',
								ritorno,
								true,
								btn,
								btnAdd );
		SET.evidenziaTsubo(html,anatomia,mappa,lm);
		if(flowchart){
			if(SET.risTest.dipendenza.tot > -1){
				for(o=0;o<document.getElementById("dipendenze").options.length;o++){
					if(SET.risTest.dipendenza.tot>=parseInt("0"+document.getElementById("dipendenze").options[o].value)){
						document.getElementById("dipendenze").selectedIndex = o;
					}
				}
			}
			if(SET.risTest.motivazione.tot > -1){
				for(o=0;o<document.getElementById("motivazioni").options.length;o++){
					if(SET.risTest.motivazione.tot>=parseInt("0"+document.getElementById("motivazioni").options[o].value)){
						document.getElementById("motivazioni").selectedIndex = o;
					}
				}
			}
			SET.ricalcFlowChart();
		}
		if(test){
			if(SET.risTest[test].tot > -1){
				var els = document.getElementById("test_cont").getElementsByTagName("select");
				for(var e=0;e<els.length;e++){
					var vals = els[e].options;
					for(v=0;v<vals.length;v++){
						if(SET.risTest[test].vals[e] == parseInt("0"+vals[v].value)){
							els[e].selectedIndex = v;
							els[e].parentElement.classList.add("checked");
						}
					}
				}
				SET.setTestVal();
			}
		}
	},
	
	caricaTest: function( n, azzera ){
		if(typeof(azzera)=='undefined')var azzera = false;
		if(azzera){
			SET.risTest = {
				dipendenza: {
					tot: -1,
					vals: {}
				},
				motivazione: {
					tot: -1,
					vals: {}
				}
			}
			delete(localStorage.risTest);
		}
		SET.caricaTeoria(SET.idTeoTests,n,document.getElementById("btn_teoria_"+SET.idTeoTests+"_"+n));
		SCHEDA.selElenco("teoria");
		SCHEDA.swCartella(document.getElementById("btn_teoria_cart_"+SET.idTeoTests),true);
	},
	scriviTest: function( test ){
		SET.testTOT = 0;
		SET.test = test;
		var obj = DB.set.tests[test];
		var html = '<div id="test_cont">';
		
		for(q in obj.q){
			html += '<div class="test_q">'	+
					'	<select onChange="SET.setTestVal(this);">' +
					'		<option></option>';
			for(r in obj.q[q].r){
				html += '	<option value="'+obj.q[q].r[r].v+'">' +
								htmlEntities(obj.q[q].r[r].t)+
						'	</option>';
			}
			html += '	</select>' +
					'	<div class="test_d">'+htmlEntities(obj.q[q].d)+'</div>' +
					'	<div class="l"></div>' +
					'</div>';
		}
		
		html += '	<div id="test_ris">' +
				'		<span>'+TXT("TestRisultati")+'</span>' +
				'		<span id="test_int"></span>' +
				'	</div>' +
				'	<div id="test_save" class="btns"><div class="btn_annulla btn_dis" onClick="SET.azzeraTest();">'+TXT("Azzera")+'</div> <div class="btn_invia btn_dis" onClick="SET.salvaTest();">'+TXT("SalvaProsegui")+'</div></div>';
				
		html += '</div>';
		return html;
	},
	setTestVal: function( el ){
		if(typeof(el)!='undefined')el.parentElement.classList.toggle("checked",(el.selectedIndex>0));
		var pass = true;
		SET.testTOT = 0;
		var els = document.getElementById("test_cont").getElementsByTagName("select");
		for(var e=0;e<els.length;e++){
			SET.testTOT += parseInt("0"+els[e].value);
			if(els[e].selectedIndex<1)pass = false;
		}
		if(pass){
			document.getElementById("test_cont").classList.add("full");
			for(r in DB.set.tests[SET.test].ris){
				if(SET.testTOT>r)document.getElementById("test_int").innerHTML = DB.set.tests[SET.test].ris[r];
			}
			document.getElementById("test_save").getElementsByTagName("div")[0].classList.remove("btn_dis");
			document.getElementById("test_save").getElementsByTagName("div")[1].classList.remove("btn_dis");
		}else{
			document.getElementById("test_cont").classList.remove("full");
			document.getElementById("test_int").innerHTML = '';
			document.getElementById("test_save").getElementsByTagName("div")[0].classList.add("btn_dis");
			document.getElementById("test_save").getElementsByTagName("div")[1].classList.add("btn_dis");
		}
	},
	salvaTest: function(){
		if(!document.getElementById("test_cont").classList.contains("full"))return;
		var valori = {};
		var els = document.getElementById("test_cont").getElementsByTagName("select");
		for(e=0;e<els.length;e++){
			valori[e] = parseInt( els[e].value);
		}
		SET.risTest[SET.test].vals = valori;
		SET.risTest[SET.test].tot = SET.testTOT;
		localStorage.risTest = JSON.stringify(SET.risTest);
		if(SET.test=='motivazione')SET.caricaTeoria(3,2,document.getElementById("btn_teoria_3_2"));
		else if(SET.test=='dipendenza')SET.caricaTeoria(3,3,document.getElementById("btn_teoria_3_3"));
	},
	azzeraTest: function(){
		if(!document.getElementById("test_cont").classList.contains("full"))return;
		SET.testTOT = -1;
		SET.risTest[SET.test].vals = {};
		SET.risTest[SET.test].tot = SET.testTOT;
		localStorage.risTest = JSON.stringify(SET.risTest);
		if(SET.test=='motivazione')SET.caricaTeoria(3,1,document.getElementById("btn_teoria_3_1"));
		else if(SET.test=='dipendenza')SET.caricaTeoria(3,2,document.getElementById("btn_teoria_3_2"));
	},
	
	scriviFlowChart: function(){
		var dipendenze = '';
		for(d in DB.set.tests["dipendenza"].ris){
			dipendenze += '<option value="'+d+'">'+htmlEntities(DB.set.tests["dipendenza"].ris[d])+'</option>';
		}
		
		var motivazioni = '';
		for(d in DB.set.tests["motivazione"].ris){
			motivazioni += '<option value="'+d+'">'+htmlEntities(DB.set.tests["motivazione"].ris[d])+'</option>';
		}
		var html =
			'<div id="flowchart_cont">' +
			'	<div>' +
			'		<span>'+TXT("Obiettivo")+':</span>' +
			'		<span>'+TXT("SmettereDiFumare")+'</span>' +
			'	</div>' +
			'	<div>' +
			'		<span>'+TXT("Dipendenza")+':</span>' +
			'		<span><select id="dipendenze" onChange="SET.ricalcFlowChart();"><option></option>'+dipendenze+'</select></span>' +
			'	</div>' +
			'	<div>' +
			'		<span>'+TXT("Motivazione")+':</span>' +
			'		<span><select id="motivazioni" onChange="SET.ricalcFlowChart();"><option></option>'+motivazioni+'</select></span>' +
			'	</div>' +
			'	<div id="flowchart_prop">' +
			//'		<p><b>'+TXT("ProposteTerapeutiche").toUpperCase()+'</b></p>' +
			'		<div>' +
			'			<div id="props_nocont">' +
							'<i>Indica i gradi di dipendenza e di motivazione</i>' +
			'			</div>' +
			'			<div id="props_noterapia">' +
							'<i>Con motivazione o dipendenza bassa si consiglia di non effettuare alcuna terapia</i>' +
			'			</div>' +
			'			<div id="props_labels">' +
			'				<div>Step 1</div>' +
			'				<div>Step 2</div>' +
			'				<div>Step 3</div>' +
			'			</div>' +
			'			<div id="R1">' +
			'				<p>Proposta 1</p>' +
			'				<div class="props_cont">' +
			'					<div>'+SET.scriviProtocollo("lovato_g")+'</div>'+
			'					<div>'+SET.scriviProtocollo("rossato")+'</div>'+
			'					<div>'+SET.scriviProtocollo("nada")+'</div>'+
			'				</div>' +
			'				<p>Proposta 2</p>' +
			'				<div class="props_cont">' +
			'					<div>'+SET.scriviProtocollo("lovato_g")+'</div>'+
			'					<div>'+SET.scriviProtocollo("lovato_i")+'</div>'+
			'					<div>'+SET.scriviProtocollo("nogier")+'</div>'+
			'				</div>' +
			'				<p>Proposta 3</p>' +
			'				<div class="props_cont">' +
			'					<div>'+SET.scriviProtocollo("nada")+'</div>'+
			'					<div>'+SET.scriviProtocollo("nogier")+'</div>'+
			'					<div>'+SET.scriviProtocollo("lovato_i")+'</div>'+
			'				</div>' +
			'			</div>' +
			'			<div id="R2">' +
			'				<p>Proposta 1</p>' +
			'				<div class="props_cont">' +
			'					<div>'+SET.scriviProtocollo("rossato")+'</div>'+
			'					<div>'+SET.scriviProtocollo("lovato_g")+'</div>'+
			'					<div>'+SET.scriviProtocollo("lovato_i")+'</div>'+
			'				</div>' +
			'				<p>Proposta 2</p>' +
			'				<div class="props_cont">' +
			'					<div>'+SET.scriviProtocollo("lovato_g")+'</div>'+
			'					<div>'+SET.scriviProtocollo("lovato_i")+'</div>'+
			'					<div>'+SET.scriviProtocollo("nada")+'</div>'+
			'				</div>' +
			'			</div>' +
			'			<div id="R3">' +
			'				<div class="props_cont">' +
			'					<div>'+SET.scriviProtocollo("nogier")+'</div>'+
			'					<div>'+SET.scriviProtocollo("rossato")+'</div>'+
			'					<div>'+SET.scriviProtocollo("nada")+'</div>'+
			'				</div>' +
			'			</div>' +
			'			<div id="R4">' +
			'				<div class="props_cont">' +
			'					<div>'+SET.scriviProtocollo("lovato_g")+'</div>'+
			'					<div>'+SET.scriviProtocollo("lovato_i")+'</div>'+
			'					<div>'+SET.scriviProtocollo("rossato")+'</div>'+
			'				</div>' +
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'</div>';
			
		return html;
	},
	ricalcFlowChart: function(){
		for(r=1;r<=4;r++)document.getElementById("R"+r).classList.remove("vis");
		document.getElementById("props_labels").classList.remove("vis");
		document.getElementById("props_noterapia").classList.remove("vis");
		document.getElementById("props_nocont").classList.add("noVis");
		var r = 0;
		var d = parseInt("0"+document.getElementById("dipendenze").value);
		var m = parseInt("0"+document.getElementById("motivazioni").value);
		if(d>=6 && m==16)r = 1;
		if(d>=6 && (m==6 || m==12))r = 2;
		if(d==3 && m==16)r = 3;
		if(d==3 && (m==6 || m==12))r = 4;
		if(	document.getElementById("dipendenze").selectedIndex>0 && 
			document.getElementById("motivazioni").selectedIndex>0 && 
			(d<3 || m<6) ){
			document.getElementById("props_noterapia").classList.add("vis");
		}else if(r){
			document.getElementById("R"+r).classList.add("vis");
			document.getElementById("props_labels").classList.add("vis");
			document.getElementById("props_nocont").classList.add("noVis");
		}else{
			document.getElementById("props_nocont").classList.remove("noVis");
		}
	},
	scriviProtocollo: function( protocollo ){
		var protocolli = {
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
	},
	verFreeTeoria: function( t ){
		return !(SET.TEORIA_free.indexOf(t)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	}
}