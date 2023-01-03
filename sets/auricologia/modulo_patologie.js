
var MODULO_PATOLOGIE = { // extend SET
	
	PATOLOGIE_free: [ 12, 18, 26, 46, 104 ],
	
	caricaPatologie: function(){ // carica l'elenco delle patologie
		var crtOp = -1;
		var contPatologie = 
						'<div id="add_pat"' +
						((__(localStorage.listPatType)=='category')?' class="category"':'') +
						'>';
		if(__(localStorage.listPatType)!='category'){
			contPatologie +=
						'	<input id="pat_ricerca"' +
						'		   onKeyUp="SET.filtraPatologie();"' +
						'		   class="okPlaceHolder"' +
						'		   placeholder="'+htmlEntities(TXT("CercaPatologia"))+'"'+H.noAutoGen+'>';
		}else{
			contPatologie +=
						'	<span id="labelApparati">'+TXT("Apparati")+'</span>';
		}
		contPatologie +='	<span id="categoryBtn" onClick="SET.swListType();"></span>' +
						'</div>' +
						'<div class="lista listaPatologie">';
		
		if(__(localStorage.listPatType)=='category'){	
			// cartelle
			for(a in DB.set.apparati){
				contPatologie += 	'<div class="cartella" onTouchStart="SCHEDA.setCartella(this);">' +
								'	<span id="btn_apparati_cart_'+a+'" onClick="SCHEDA.swCartella(this);">' +
										DB.set.apparati[a] +
								'	</span>' +
								'	<div>';
								
				for(p in DB.set.patologie){
					
					if(DB.set.patologie[p].apparato == a){
						// verifico le autorizzazioni
						var addLock =	SET.PATOLOGIE_free.indexOf(p*1)==-1 && 
										(DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()) ? ' lockedItem' : '';
						// --------------------------
						
						var addClass = '';
						if(p==SET.patOp){
							addClass=' elencoSel';
							crtOp = a;
						}
						contPatologie +=	'<div id="btn_patologia_'+p+'"' +
											'     class="cart_els '+addLock+addClass+'"' +
											'     onClick="SET.apriPatologia(\''+p+'\',this);">' +
												DB.set.patologie[p].NomePatologia +
											'</div>';
					}
				}
				contPatologie += '</div></div>';
			}
		}else{
			// lista				
			for(p in DB.set.patologie){
				
				// verifico le autorizzazioni
				var addLock =	SET.PATOLOGIE_free.indexOf(p*1)==-1 && 
								(DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()) ? ' lockedItem' : '';
				// --------------------------
							
				contPatologie +=	'<div id="btn_patologia_'+p+'"' +
									'     class="base'+addLock+((p==SET.patOp)?' elencoSel':'')+'"' +
									'     onClick="SET.apriPatologia(\''+p+'\',this);">' +
										DB.set.patologie[p].NomePatologia +
									'</div>';
			}
		}
		
		
		contPatologie += '</div>';
		document.getElementById("lista_patologie").innerHTML = contPatologie;
		if(crtOp>-1){
			document.getElementById("btn_apparati_cart_"+crtOp).parentElement.classList.add("cartellaAperta");
		}
	},
	getPointPat: function( el ){
		var ST = '';
		if(typeof(el)=='object'){
			if(typeof(el.length)=='undefined'){
				ST += '<div class="ptTr"><div>';
				for(j=0;j<el.p.length;j++){
					if(el.p[j].length==3)ST += '[.'+el.p[j]+'.]';
					else ST += '<span class="etPoints">'+el.p[j].replace('[]','<span class="pNUL"></span>')+'</span>';
					if(j<el.p.length-1)ST += '<br>';
				}
				ST += '</div><div>'+el.t+'</div></div>';
			}else{
				ST += '<p class="ptLk">';
				for(j=0;j<el.length;j++){
					ST += '[.'+el[j]+'.]';
					if(j<el.length-1)ST += '<br>';
				}
				ST += '</p>';
			}
		}else if(el.length==3)ST += '[.'+el+'.]<br>';
		else if(el)ST += '<span class="etPoints">'+el.replace('[]','<span class="pNUL"></span>')+'</span><br>';
		else ST += '<span class="sepPoints"></span>';
		return ST;
	},
	apriPatologia: function( n, btn ){ // apre la scheda della patologia
		// verifico le autorizzazioni
		if(SET.PATOLOGIE_free.indexOf(n*1)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(TXT("MsgContSoloPay"));
			return;
		}
		// --------------------------
		
		SET.hideHiddenPoints();
		
		SET.patOp = n;
		SET.schEvi = null;
		
		var objTer = DB.set.schede[DB.set.patologie[n].scheda];
		var ST = '';
		if(Object.keys(objTer).length){
			var titGen = TXT("TrattamentoGenerico");
			if(__(objTer.tit))titGen = htmlEntities(objTer.tit)
			ST +=
			'<br>' +
			'<div id="schedaTerapeutica">' +
			'	<p><span class="eviPtsBtn" onClick="SET.eviPointsPat(this.parentElement.parentElement);"></span><b>'+titGen+'</b>' +
			'<div id="padDom">';
			
			if(!__(objTer.g.sx,'')){
				ST += '	<strong>'+TXT("PadiglioneDominante")+'</strong><br><br>';
				if(__(objTer.g.ds))ST += '<em>'+TXT("PuntiPrincipali")+'</em>';
				for(p in objTer.g.dp.p){
					ST += SET.getPointPat(objTer.g.dp.p[p]);
				}
				if(__(objTer.g.dp.a))ST += ''+objTer.g.dp.a+'<br>';
				if(__(objTer.g.ds)){
					ST += '<br><em>'+TXT("PuntiSecondari")+'</em>';
					for(p in objTer.g.ds.p){
						ST += SET.getPointPat(objTer.g.ds.p[p]);
					}
					if(__(objTer.g.ds.a))ST += ''+objTer.g.ds.a+'<br>';
				}
			}else{
				ST += '	<strong>'+TXT("PadiglioneSinistro")+'</strong><br><br>';
				for(p in objTer.g.sx.p){
					ST += SET.getPointPat(objTer.g.sx.p[p]);
				}
				if(__(objTer.g.sx.a))ST += ''+objTer.g.sx.a+'<br>';
			}
			ST += '</div><div id="padNoDom">';
			if(!__(objTer.g.dx,'')){
				ST += '<strong>'+TXT("PadiglioneNonDominante")+'</strong><br><br>';
				if(__(objTer.g.ns))ST += '<em>'+TXT("PuntiPrincipali")+'</em>';
				for(p in objTer.g.np.p){
					ST += SET.getPointPat(objTer.g.np.p[p]);
				}
				if(__(objTer.g.np.a))ST += ''+objTer.g.np.a+'<br>';
				if(__(objTer.g.ns)){
					ST += '<br><em>'+TXT("PuntiSecondari")+'</em>';
					for(p in objTer.g.ns.p){
						ST += SET.getPointPat(objTer.g.ns.p[p]);
					}
					if(__(objTer.g.ns.a))ST += ''+objTer.g.ns.a+'<br>';
				}
			}else{
				ST +=
				'	<strong>'+TXT("PadiglioneDestro")+'</strong><br><br>';
				for(p in objTer.g.dx.p){
					ST += SET.getPointPat(objTer.g.dx.p[p]);
				}
				if(__(objTer.g.dx.a))ST += ''+objTer.g.dx.a+'<br>';
			}
			ST += '</div>';
			if(__(objTer.g.d))ST += '<p class="schDescr">'+objTer.g.d+'</p>';
			ST += '</div>';
			if(__(objTer.s,[]).length){
				if(!__(objTer.tit))ST += '<div class="lineaSu" id="causeSpecifiche"><p><b>'+TXT("CauseSpecifiche")+'</b></p>';
				for(s in objTer.s){
					ST += '<div class="schedaSpecifica"><p><span class="eviPtsBtn" onClick="SET.eviPointsPat(this.parentElement.parentElement);"></span>'+objTer.s[s].t+'</p>';
					if(__(objTer.s[s].d))ST += ''+objTer.s[s].d+'<br>';
					for(p in objTer.s[s].p){
						ST += SET.getPointPat(objTer.s[s].p[p]);
					}
					if(__(objTer.s[s].a))ST += ''+objTer.s[s].a+'<br>';
					ST += '</div>';
				}
				ST += '</div>';
			}
			if(__(objTer.d))ST += '<br><div>'+htmlEntities(objTer.d)+'</div>';
			if(__(objTer.t)){
				ST += '<div id="patologieTests"><div>' +
					  '<p onClick="SET.caricaTest(0);"><span>&raquo; '+htmlEntities(DB.set.teoria[3].TitoloSezione)+'</span></p>' +
					  '</div></div>';
			}
		}
		var elencoAltre = '';
		for(p in DB.set.patologie){
			if(p != n && DB.set.patologie[p].scheda == DB.set.patologie[n].scheda){
				elencoAltre += '<p onClick="SET.apriPatologia(\''+p+'\',document.getElementById(\'btn_patologia_'+p+'\'));"><span>• '+DB.set.patologie[p].NomePatologia+'</span></p>';
			}
		}
		if(elencoAltre){
			ST += 	'<p class="lineaSu"><strong>'+TXT("AltrePatologie")+'</strong></p>' +
					'<div id="patologieTsubo" class="vis">' +
					elencoAltre +
					'</div>';
		}
		
		var op_descrizione = true;
		if(typeof(localStorage.op_descrizione)!='undefined')op_descrizione = (__(localStorage.op_descrizione)=='1');
		var op_protocollo = true;
		if(typeof(localStorage.op_protocollo)!='undefined')op_protocollo = (__(localStorage.op_protocollo)=='1');
		var labelDescrizione = TXT("DescrizionePatologia");
		if(DB.set.patologie[n].apparato==11)labelDescrizione = TXT("DescrizioneProtocollo");
		var TestoPatologia = H.sezione({
			label: labelDescrizione,
			nome: 'descrizione',
			aperta: op_descrizione,
			html: "<br>"+SET.convPuntiScheda(DB.set.patologie[n].TestoPatologia)
					}) +
			H.sezione({
			label: TXT("SchedaTerapeutica"),
			nome: 'protocollo',
			aperta: op_protocollo,
			html: SET.convPuntiScheda(ST)
					});
		
		var titolo = DB.set.patologie[n].NomePatologia;
		var html = 	"<h1>"+htmlEntities(titolo)+"</h1>" + TestoPatologia;
		
		// sesso
		if(DB.set.patologie[n].sessoPatologia){
			html = 	'<img 	src="sets/meridiani_shiatsu/img/sesso_'+DB.set.patologie[n].sessoPatologia+'.png"' +
					'		class="ideogrammaTsubo">'+html;
		}
		
		var ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_patologia')";
		
		var btnAdd = 	'';/*'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.auricologia.pathologies\')">' +
							TXT("ReferenceGuide") +
						'</div>';*/
		var addClose = '';
		
		if(__(objTer.hiddenPoints,[])){
			SET.showHiddenPoints(objTer.hiddenPoints);
			addClose = 'SET.hideHiddenPoints();';
		}
						
		SCHEDA.caricaScheda(	titolo,
								html,
								'SET.chiudiPatologia();SET.annullaEvidenziaTsubo();'+addClose,
								'scheda_patologia',
								ritorno,
								true,
								btn,
								btnAdd );
		//SET.evidenziaTsubo(html);
		SET.eviPointsPat(document.getElementById("schedaTerapeutica"));
	},
	getPatFromScheda: function( scheda ){
		for(p in DB.set.patologie){
			if(DB.set.patologie[p].scheda == scheda)return p;
		}
	},
	chiudiPatologia: function(){
		var phs = ["","2","3"];
		for(ph in phs){
			var pts = scene.getObjectByName("PTs"+phs[ph]).children;
			for(p in pts){
				if(pts[p].name.substr(0,1)!='_')pts[p].material.opacity = 1;
			}
			var pts = scene.getObjectByName("ARs"+phs[ph]).children;
			for(p in pts){
				pts[p].material.opacity = 0.4;
			}
		}
		SET.patOp = -1;
		SET.schEvi = null;
	},
	eviPointsPat: function( el ){
		if(!el.innerHTML)return;
		SET.evidenziaTsubo(el.innerHTML);
		if(SET.schEvi)SET.schEvi.classList.remove("eviPoints");
		el.classList.add("eviPoints");
		SET.schEvi = el;
		var phs = ["","2","3"];
		for(ph in phs){
			var pts = scene.getObjectByName("PTs"+phs[ph]).children;
			for(p in pts){
				if(pts[p].name.substr(0,1)!='_'){
					if(SET.tsuboEvidenziati.indexOf(pts[p].name.substr(2,3))==-1)pts[p].material.opacity = 0.5;
					else if(pts[p].material.opacity != 1)pts[p].material.opacity = 1;
				}
			}
			var pts = scene.getObjectByName("ARs"+phs[ph]).children;
			for(p in pts){
				if(SET.tsuboEvidenziati.indexOf(pts[p].name.substr(2,3))==-1)pts[p].material.opacity = 0.2;
				else if(pts[p].material.opacity != 0.4)pts[p].material.opacity = 0.4;
			}
		}
	},
	showHiddenPoints: function( elenco ){
		SET.hiddenPoints = elenco;
		if(!elenco)return;
		var phs = ["","2","3"];
		for(ph in phs){
			var pts = scene.getObjectByName("PTs"+phs[ph]).children;
			for(p in pts){
				if(SET.hiddenPoints.indexOf(pts[p].name.replace("_","").substr(2,3))==0){
					pts[p].visible = true;
				}
			}
			var pts = scene.getObjectByName("ARs"+phs[ph]).children;
			for(p in pts){
				if(SET.hiddenPoints.indexOf(pts[p].name.substr(2,3))==0){
					pts[p].visible = true;
				}
			}
		}
	},
	hideHiddenPoints: function(){
		if(!SET.hiddenPoints)return;
		var phs = ["","2","3"];
		for(ph in phs){
			var pts = scene.getObjectByName("PTs"+phs[ph]).children;
			for(p in pts){
				if(SET.hiddenPoints.indexOf(pts[p].name.replace("_","").substr(2,3))==0){
					pts[p].visible = false;
				}
			}
			var pts = scene.getObjectByName("ARs"+phs[ph]).children;
			for(p in pts){
				if(SET.hiddenPoints.indexOf(pts[p].name.substr(2,3))==0){
					pts[p].visible = false;
				}
			}
		}
		SET.hiddenPoints = [];
	},
	filtraPatologie: function( event ){ // filtra le patologie tramite campo di testo
		var parola = document.getElementById("pat_ricerca").value.trim();
		for(p in DB.set.patologie){
			if(DB.set.patologie[p].NomePatologia.toLowerCase().indexOf(parola.toLowerCase()) == -1){
				document.getElementById("btn_patologia_"+p).classList.add("nasPazRic");
			}else{
				document.getElementById("btn_patologia_"+p).classList.remove("nasPazRic");
			}
		}
		if(parola)document.getElementById("pat_ricerca").classList.add("filtro_attivo");
		else document.getElementById("pat_ricerca").classList.remove("filtro_attivo");
	},
	swListType: function(){
		if(__(localStorage.listPatType)!='category')localStorage.listPatType = 'category';
		else localStorage.listPatType = 'list';
		SET.caricaPatologie();
	},
	azRicercaPatologie: function( p ){ // apre la scheda della patologia dalla ricerca globale
		SCHEDA.apriElenco('set');
		SET.apriPatologia( p, document.getElementById('btn_patologia_'+p));
		SCHEDA.selElenco('patologie');
		evidenziaParola();
		RICERCHE.nascondiGlobal();
		SCHEDA.individuaElemento( "btn_patologia_"+p, "listaPatologie" );
	}
}