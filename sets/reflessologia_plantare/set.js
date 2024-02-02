
SET = {
	
	// VARIABILI
	INTERSECTED: null,
	AR: [],
	GD: [],
	time: 0,
	pulse: 0.7,
	step: 0.01,
	ptSel: null,
	diffX: 0,
	diffY: 0,
	mAtt: '',
	tmChiusura: null,
	puntiEvidenziati: [],
	pMod: '',
	pointEvi: '',
	tmZone: null,
	hiddenGroups: [],
	hiddenGroups_safe: null,
	opAnatomy_safe: null,
	apparatiPats: [],
	patOp: -1,
	schEvi: null,
	forzaDissolve: false,
	
	// FUNZIONI
	_init: function(){
		
		SETS = new THREE.Group();
		SETS.name = "SETS";
		
		var modelloAperto = globals.modello.cartella;
		if(!modelloAperto)modelloAperto='piedi';
		
		// guide (se ci sono)
		var n=-1;
		var GDS=GEOMETRIE.guide;
		if(GDS){
			if(GDS.length){
				var GD = new THREE.Group();
				GD.name="GDs";
				for(l in GDS){ // aggiungo le guide
					
					var loader = new THREE.ObjectLoader();
					
					var mesh =  loader.parse(JSON.parse(LZString.decompressFromBase64(GDS[l].obj)));
					mesh.material = this.MAT.lineGuide;
					GD.add( mesh );
					
				}
				SETS.add( GD );
			}
		}
		
		// aree
		var ARS = GEOMETRIE.aree;
		if(ARS){
			var n=-1;
			var AR = new THREE.Group();
			AR.name="ARs";
			AR.visible = true;
			for(a in ARS){ // aggiungo le aree
				var loader = new THREE.ObjectLoader();
				var mesh = loader.parse(JSON.parse(LZString.decompressFromBase64(ARS[a].obj)));

				var name = mesh.name.substr(0,3);
				var lato = "";
				if(mesh.name.indexOf("_sx")>-1)lato = "SX";
				if(mesh.name.indexOf("_dx")>-1)lato = "DX";
				var apparato = DB.set.punti[name].apparato;
				
				var mat = this.MAT["area"+apparato+"Base"];
				
				mesh.material = mat;

				mesh.name = name;
				mesh.userData.apparato = apparato;
				mesh.userData.lato = lato;
				mesh.userData.raycastable = true;
				AR.add( mesh );
			}
			SETS.add( AR );
		}

		for(a in DB.set.apparati)SET.hiddenGroups[a]=false;
		var contPulsanti = 	'<span class="menuElenchi" onclick="MENU.visMM(\'btnCarMapMenu\');"></span>' +
							'<span id="btnCarMapMenu" class="btn_meridiani_shiatsu titolo_set">' +
							'<span>ReflexologyMap</span>' +
							'<i class="elMenu" id="chiudiSet" onClick="chiudiSet();" title="'+htmlEntities(TXT("ChiudiSet"))+'"><span>' +
								htmlEntities(TXT("ChiudiSet")) +
							'</span></i>' +
							'<i class="elMenu" id="impostazioniSet" onClick="MENU.visImpset();" title="'+htmlEntities(TXT("ImpostazioniSet"))+'"><span>' +
								htmlEntities(TXT("ImpostazioniSet")) +
							'</span></i>' +
							'<i class="elMenu" id="help_set" onClick="GUIDA.visFumetto(\'guida_set\',true,true);">?</i></span>';
		var contElenco = '';
		contPulsanti += '<div id="pulsante_modello" onClick="cambiaModello(\'piedi\');">'+TXT("ApriModello3D")+'</div>';
		// punti
		contPulsanti += '<div id="pulsante_punti" class="frdx" onClick="SCHEDA.selElenco(\'punti\');">'+TXT("Mappa")+'</div>';
		contElenco += '<div id="lista_punti"></div>';
		
		// patologie
		contPulsanti += '<div id="pulsante_patologie" class="frdx" onClick="SCHEDA.selElenco(\'patologie\');">'+TXT("Patologie")+'</div>';
		contElenco += '<div id="lista_patologie"></div>';
		
		// procedure personalizzare
		var contProcedure = '';
		contPulsanti += '<div id="pulsante_procedure" class="frdx" onClick="SCHEDA.selElenco(\'procedure\');">'+TXT("Procedure")+'</div>';
		contElenco += '<div id="lista_procedure"></div>';
		
		// teoria
		contPulsanti += '<div id="pulsante_teoria" class="frdx" onClick="SCHEDA.selElenco(\'teoria\');">'+TXT("Approfondimenti")+'</div>';
		contElenco += '<div id="lista_teoria"></div>';
		
		contBtns = 	'<div id="p_contrasto" class="p_noTxt" onClick="SET.swContrastMethod();"></div>';
		
		contIcona = '<div id="p_set" onClick="SCHEDA.apriElenco(\'set\',true);"><svg viewBox="0 0 12 48"><polygon points="5,24 12,13 12,35"></polygon></svg><i>'+htmlEntities(TXT("ReflessologiaPlantare"))+'</i></div>';
		
		var preElenco = SCHEDA.elencoSel;
		SCHEDA.caricaElenco(globals.set.nome,contElenco);
		SCHEDA.caricaPulsanti(contPulsanti);
		SCHEDA.caricaBtns(contBtns,contIcona);
		SCHEDA.swPulsanti(true);
		
		if(preElenco)SCHEDA.selElenco(preElenco);
		
		manichino.add( SETS );
		
		
		raycastDisable=false;
		if(!globals.modello.cartella){
			SETS.visible = false;
			stopAnimate( true );
		}else{
			SETS.visible = true;
			startAnimate();
		}
		
		// unisco i moduli al set
		Object.assign(SET, MODULO_PATOLOGIE);
		Object.assign(SET, MODULO_PUNTI);
		Object.assign(SET, MODULO_PUNTO);
		Object.assign(SET, MODULO_TEORIA);
		Object.assign(SET, MODULO_PROCEDURE);
		
		// svuoto la memoria
		MODULO_PATOLOGIE = null;
		MODULO_PUNTI = null;
		MODULO_PUNTO = null;
		MODULO_TEORIA = null;
		MODULO_PROCEDURE = null;
		
		
		
		manichinoCaricato = true;
		SET.caricaPunti();
		SET.caricaPatologie();
		SET.caricaApprofondimenti();
		if(DB.procedure)SET.car_procedure(-1,1);
		
		SET.popolaFiltri();
		
		SET.leggiNote();
		nasLoader();

		if(postApreSet){
			if(SCHEDA.livelloApertura!=3 ){
				
				if(	SCHEDA.classeAperta != 'scheda_A' &&
					SCHEDA.classeAperta != 'scheda_B' ){
						if(!smartMenu)SCHEDA.apriElenco('set');
				}else{
					SCHEDA.apriElenco('base');
					PAZIENTI.caricaDettagliSet();
				}
				
			}else{
				if(!SET.ptSel){
					if(!smartMenu)GUIDA.visFumetto("guida_set_mini",false,true);
					SCHEDA.chiudiElenco();
					MENU.chiudiMenu();
				}
			}
		}
		postApreSet = false;

		if(smartMenu)overInterfaccia=true;
		SET.chiudiPunto(false,true); // riapre il punto se è aperto
		CUSTOMS._init();
		
		/*
		Decommentare per salvare in localSorage.POS la posizione del manichino
		Per settare le rotazioni automatiche sui un punto premere il pulsante "q"
		*/
		//SET.iniPos();
		
	},
	
	iniPos: function(){
		SET.POS = JSON.parse(__(localStorage.POS,'{}'));
		for(e in SET.POS){
			//SET.nasELS(e);
		}
		document.addEventListener("keyup", SET.keyUpPos, false );
	},
	keyUpPos: function(event){
		if(event.keyCode==81){
			normalizeRotation();
			var el = {x: manichinoCont.rotation.x, y: manichinoCont.rotation.y };
			if(SET.ptSel){
				var name = SET.ptSel.name;
				if(!SET.POS[name]){
					
					SET.POS[name] = el;
					SET.nasELS(name);
				}
				localStorage.POS = JSON.stringify(SET.POS);
				console.log(SET.POS);
				console.log(el);
			}else{
				console.log(el)
			}
		}
	},
	nasELS: function( name ){
		if(scene.getObjectByName(name))scene.getObjectByName(name).visible = false;
	},
	
	// RENDER SET
	_render: function(){
		var make=true;
		if(manichinoCaricato && !raycastDisable && !controlsM._ZPR && !controlsM._premuto){
			camera.updateMatrixWorld();
			raycaster.setFromCamera( mouse, camera );
			raycaster.params.Points.threshold = 20;
			
			var objOver='';
			var ints = [];
			if(SETS){
				for(let i in SETS.children){
					if(	SETS.children[i].visible &&
						SETS.children[i].name.length==3 ){
						for(let ii in SETS.children[i].children){
							if(	SETS.children[i].children[ii].visible &&
								SETS.children[i].children[ii].name.substr(0,2)!='LN' &&
								SETS.children[i].children[ii].name.substr(0,2)!='GD'){
								var intersects = raycaster.intersectObjects( SETS.children[i].children );
								if ( intersects.length > 0 ) { // roll-over
									for(l in intersects){
										ints.push(intersects[l]);
									}
									objOver=intersects[ 0 ].object;
								}
							}
						}
					}
				}
			}
			if(ANATOMIA){
				for(let i in ANATOMIA.children){
					if(	ANATOMIA.children[i].name.toLowerCase()=='pelle' ||
						ANATOMIA.children[i].name.toLowerCase()=='ossa' ||
						ANATOMIA.children[i].name.toLowerCase()=='vasi' ||
						ANATOMIA.children[i].name.toLowerCase()=='legamenti' ||
						ANATOMIA.children[i].name.toLowerCase()=='muscoli' ){
						var intersects = raycaster.intersectObject( ANATOMIA.children[i] );
						if ( intersects.length > 0 ){
							for(l in intersects)ints.push(intersects[l]);
						}
						if(ANATOMIA.children[i].type=='Group'){
							for(let g in ANATOMIA.children[i].children){
								var intersects = raycaster.intersectObject( ANATOMIA.children[i].children[g] );
								if ( intersects.length > 0 ){
									for(l in intersects){
										ints.push(intersects[l]);
									}
								}
							}
						}
					}
				}
			}
			// impedisco l'attraversamento della pelle
			if(ints.length){
				var near = ints[0];
				for(l in ints){
					if(ints[l].distance<near.distance)near=ints[l];
				}
				if(near.object.userData.raycastable!=true)objOver='';
				else objOver=near.object;
			}
			var n1=n2='';
			SET.desIntersected(objOver);
			if(objOver){
				this.INTERSECTED = objOver;
				if(this.INTERSECTED.userData.raycastable){
					var name=this.INTERSECTED.name;
					visToolTip(DB.set.punti[name].NomePunto);
					renderer.domElement.style.cursor='pointer';
					SET.overPunto(name,true);
				}
			}else{
				this.INTERSECTED=null;
				nasToolTip();
				renderer.domElement.style.cursor='default';
			}
			make=true;
		}
		if(this.ptSel){ // pulse dell'area selezionata
			this.pulse-=this.step;
			if(this.pulse<=0.4 || this.pulse>=0.7)this.step=0-this.step;
			SET.MAT.areaSel.opacity = this.pulse;
			make=true;
		}
		return make;
	},
	desIntersected: function(objOver){
		if(this.INTERSECTED && this.INTERSECTED!=objOver){
			var name=this.INTERSECTED.name;
			SET.overPunto(name,false);
			this.INTERSECTED = null;
		}
	},
	// ANIMATE SET
	_animate: function(){
		//
	},
	
	// CLICK sul punto
	_onClick: function( e ){
		var btn=0;
		if(!touchable)btn=e.button;
		if(!btn && !raycastDisable && ((controlsM.xIni==controlsM.xEnd && controlsM.yIni==controlsM.yEnd) || touchable)){
			if(this.INTERSECTED){
				if(!touchable && this.INTERSECTED.userData.type == 'point'){
					controlsM._inMovimento=true;
					controlsM._ZPR=true;
					controlsM._MM=false;
				}
				if(this.INTERSECTED.userData.raycastable){
					var name=this.INTERSECTED.name;
					if(name.substr(0,1)=='_')name = name.substr(1,name.length-1);
					var ritorno = '';
					if(SCHEDA.classeAperta && SCHEDA.classeAperta!='tab_punti')ritorno = 'SET.chiudiPunto(true)';
					SET.apriPunto(name,ritorno,this.INTERSECTED);
				}
			}
		}
		controlsM.xIni=-1;
		controlsM.xEnd=-1;
		controlsM.yIni=-1;
		controlsM.yEnd=-1;
	},
	
	
	apriPunto: function( PT_name, ritorno='', el='' ){
		var PT = scene.getObjectByName( PT_name );

		// verifico le autorizzazioni
		if(!SET.verFreePunti(PT_name)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------

		if(this.ptSel){
			if(PT_name == this.ptSel.name)return;
			var mat = SET.MAT["area"+this.ptSel.userData.apparato+"Base"];
			//if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			
			if(document.getElementById("ts_"+this.ptSel.name))document.getElementById("ts_"+this.ptSel.name).classList.remove("selElPt");
			SET.chiudiPunto(true);
		}
		
		this.ptSel=PT;
		for(let a in DB.set.apparati){
			SET.MAT["area"+a+"Base"].opacity = SET.apparatiPats.indexOf(parseInt(a))>-1?SET.MAT.opAreaPat:SET.MAT.opAreaWhenSel;
			SET.MAT["area"+a+"Over"].opacity = SET.MAT.opAreaWhenSelOn;
		}
		PT.material = SET.MAT.areaSel;
		
		if(document.getElementById("ts_"+PT_name))document.getElementById("ts_"+PT_name).classList.add("selElPt");
		
		
		var x2 = 0;
		var y2 = 0;
		var z2 = 0;
		var vector = null;

		elPin = scene.getObjectByName( PT_name );
		var center = getCenterPoint(elPin);
		this.diffX = center.x*1;
		this.diffY = center.y*1;
		x2 = 0-center.x*1;
		y2 = 0-center.y*1;
		z2 = 0-center.z*1;
		elPin.updateMatrixWorld();
		vector = center;
		vector.applyMatrix4( elPin.matrixWorld );

		panEndZero = { x: x2, y: y2, z: z2 };
		
		if(SCHEDA.aggancio.tipo=='libera' && el){
			panEnd = { x: vector.x, y: vector.y, z: vector.z };
		}else panEnd = { x: 0, y: 0, z: 0 };
		
		
		
		if(!el){
			// posiziono
			if(GEOMETRIE.posizioni[PT_name]){
				var pos = GEOMETRIE.posizioni[PT_name];

				// cerco la via più breve
				let diffX = manichinoCont.rotation.x-pos.x,
					diffY = manichinoCont.rotation.y-pos.y;
				if(diffX>3){
					if(pos.x>0)pos.x = 6-pos.x;
					else pos.x = pos.x+6;
				}
				if(diffX<-3){
					if(pos.x>0)pos.x = pos.x-6;
					else pos.x = 6-pos.x;
				}
				if(diffY>3){
					if(pos.y>0)pos.y = 6-pos.y;
					else pos.y = pos.y+6;
				}
				if(diffY<-3){
					if(pos.y>0)pos.y = pos.y-6;
					else pos.y = 6-pos.y;
				}

				normalizeRotation();
				rotateEnd = { x:pos.x, y: pos.y, z:0 };
			}
			//if(manichinoCont.position.z<15 || !zoomEnd || !smothingView)zoomEnd = 15;
			normalizeRotation();
		}
		SET.caricaPunto( PT_name, ritorno );
	},
	chiudiPunto: function( nonChiudereScheda=false, riapri=false ){
		if(!this.ptSel)return;
		document.getElementById("scheda").classList.remove("tab_punti");
		document.getElementById("scheda").classList.remove("schForm");
		if(document.getElementById("ts_"+this.ptSel.name))
			document.getElementById("ts_"+this.ptSel.name).classList.remove("selElPt");
		
		if(!nonChiudereScheda){
			endChangeDetection();
			SCHEDA.formModificato = false;
		}
		exPt = SET.ptSel;
		//if(!SET.puntiEvidenziati){
		if(!document.getElementById("puntiPlantari")){
			for(let a in DB.set.apparati){
				SET.MAT["area"+a+"Base"].opacity = SET.apparatiPats.indexOf(parseInt(a))>-1?SET.MAT.opAreaPat:SET.MAT.opArea;
				SET.MAT["area"+a+"Over"].opacity = SET.MAT.opAreaOn;
			}
		}
		// coloro tutti gli altri punti
		var els = scene.getObjectByName("ARs").children;
		for(e in els){
			if(els[e].name==this.ptSel.name){
				/* if(SET.puntiEvidenziati.indexOf(this.ptSel.name)>-1)tipo='';
				else tipo='Base'; */
				els[e].material = SET.MAT["area"+els[e].userData.apparato+"Base"];
			}
		}
			
		if(SET.schEvi)SET.eviPointsPat(SET.schEvi);
		this.ptSel=null;
		if(SCHEDA.scheda2Aperta){
			nonChiudereScheda=true;
			document.getElementById("scheda_ritorno").click();
		}
		if(!nonChiudereScheda){
			SCHEDA.scaricaScheda(); 
		}else{
			if(document.getElementById("puntiPlantari")){
				exPt.material =  SET.MAT.areaEvi;
			}else{
				SET.evidenziaPunto();
			}
		}
		
		// ricentro il manichino
		exPt.updateMatrixWorld();
		var center = getCenterPoint(exPt);
		var vector = new THREE.Vector3( 0-center.x*1, 0-center.y*1, 0-center.z*1 );
		vector.applyMatrix4( exPt.matrixWorld );
		manichino.position.set( 0, 0, 0 );
		render();
		exPt.updateMatrixWorld();
		var center = getCenterPoint(exPt);
		var vector2 = new THREE.Vector3( 0-center.x*1, 0-center.y*1, 0-center.z*1 );
		vector2.applyMatrix4( exPt.matrixWorld );
		manichinoCont.position.x = manichinoCont.position.x - (vector2.x-vector.x);
		manichinoCont.position.y = manichinoCont.position.y - (vector2.y-vector.y);
		manichinoCont.position.z = manichinoCont.position.z - (vector2.z-vector.z);
		controlsM._ZPR = false;
		render();
		SET.overPunto( exPt.name, false );
		if(riapri){
			MENU.visModello();
			setTimeout(function(){
				SET.apriPunto(exPt.name,'');
				if(smartMenu)SCHEDA.apriElenco('set',true);
			},500);
		}
	},
	_applyLineMethod: function(){
		//
	},
	scriviPunto: function( siglaPunto, esteso=false, noRet=false, apparato ){
		var nomePunto = DB.set.punti[siglaPunto].NomePunto;
		var EL = scene.getObjectByName( siglaPunto );
		
		var html = '<a class="pallinoPat';
		if(esteso)html += ' pallinoPatEsteso';
		if(apparato)html += ' noPall';
		if(EL){
			if(__(EL.userData.locked,false))html+=' lockedItem';
		}
		var ret = '';
		if(!noRet)ret = SET.chiudiPunto(true);
		html += '"';
		html+= ' onClick="SET.apriPunto(\''+siglaPunto+'\',\''+ret+'\');"';
		if(noRet)html += '  onMouseOver="SET.overPunto(\''+siglaPunto+'\',true);"' +
						 '  onMouseOut="SET.overPunto(\''+siglaPunto+'\',false);"' +
						 '	id="ts_'+siglaPunto.replace('.','_')+'"';
		html += '>';
		if(apparato)html += '<span class="pApp app'+apparato+'"></span>';
		if(esteso)html+='<i>'+nomePunto+'</i>';
		html+='</a>';
		return html;
	},
	selPunto: function( PT ){
		// verifico le autorizzazioni
		if(!SET.verFreePunti(PT)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		SET.apriPunto(PT,'SET.chiudiPunto(true);');
	},
	selPuntoMod: function( PT, p ){
		if(!PT)return;
		SET.pMod = PT;
		PT = document.getElementById("formMod")["pt_"+p].value;
		SET.selPunto( PT );
	},
	setPuntoFrm: function(){
		var ptP = SET.ptSel.name;
		if( SCHEDA.classeAperta == 'scheda_procedura' ){
			SET.dettagliProvvisori[SET.pMod].DescrizioneDettaglio = ptP;
			SET.caricaDettagli();
		}
		if( SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B' ){
			PAZIENTI.reflexProvvisori[SET.pMod].n = ptP;
			PAZIENTI.caricaPuntiTrattamento();
		}
		SET.pMod = '';
		SCHEDA.torna();
		SCHEDA.formModificato = true;
	},
	evidenziaPunto: function( el ){
		if(!el || typeof(el)=='undefined') var el = document.getElementById("scheda_testo");
		let html = el.innerHTML;
		SET.annullaEvidenziaPunto();
		var re = /selPunto\([^\)]+\)/ig;
		
		var result = html.match(re);
		for(let k in result){
			var pT=result[k].split("'");
			var siglaPunto = pT[1];
			
			// verifico le autorizzazioni
			if(SET.verFreePunti(siglaPunto)){
				SET.puntiEvidenziati.push(siglaPunto);
			}
			// --------------------------
		}
		SET.applicaEvidenziaPunto();
		SET.settaOverPunto();
	},
	evidenziaPuntoMod: function( elenco ){
		SET.annullaEvidenziaPunto();
		for(let k in elenco){
			var pp=elenco[k].split(".");
			var mat = SET.MAT.pointEvi;
			if(pp[1]=='D')mat = SET.MAT.pointDolore;
			if(scene.getObjectByName(pp[0])){
				scene.getObjectByName(pp[0]).material=mat;
				siglaPunto = pp[0];
				SET.puntiEvidenziati.push(siglaPunto);
			}
		}
		SET.applicaEvidenziaPunto();
	},
	applicaEvidenziaPunto: function(){
		if(SET.puntiEvidenziati.length){
			var els = scene.getObjectByName("ARs").children;
			for(e in els){
				var siglaPunto = els[e].name;
				if(SET.puntiEvidenziati.indexOf(siglaPunto)>-1){
					els[e].material=SET.MAT.areaEvi;
				}
			}
			for(let a in DB.set.apparati){
				SET.MAT["area"+a+"Base"].opacity = SET.apparatiPats.indexOf(parseInt(a))>-1?SET.MAT.opAreaPat:SET.MAT.opAreaWhenSel;
				SET.MAT["area"+a+"Over"].opacity = SET.MAT.opAreaWhenSelOn;
			}
		}
	},
	annullaEvidenziaPunto: function(){
		if(SET.puntiEvidenziati.length){
			var els = scene.getObjectByName("ARs").children;
			for(e in els){
				var siglaPunto = els[e].name;
				if(SET.puntiEvidenziati.indexOf(siglaPunto)>-1){
					if(els[e].name == siglaPunto){
						els[e].material=SET.MAT["area"+els[e].userData.apparato+"Base"];
					}
				}
			}
		}
		SET.puntiEvidenziati = [];
		for(let a in DB.set.apparati){
			SET.MAT["area"+a+"Base"].opacity = SET.apparatiPats.indexOf(parseInt(a))>-1?SET.MAT.opAreaPat:SET.MAT.opArea;
			SET.MAT["area"+a+"Over"].opacity = SET.MAT.opAreaOn;
		}
	},
	settaOverPunto: function(){
		if(!touchable){
			var els = document.getElementById("scheda_testo").getElementsByClassName("pallinoPat");
			for(e=0;e<els.length;e++){
				var onclick = els[e].onclick.toString();
				if(onclick.indexOf("SET.selPunto('")>-1){
					els[e].dataset.siglaPunto = onclick.split("SET.selPunto('")[1].split("')")[0];
				}
				els[e].onmouseover = function(){
					SET.overPunto(this.dataset.siglaPunto,true);
				}
				els[e].onmouseout = function(){
					SET.overPunto(this.dataset.siglaPunto,false);
				}
			}
		}
	},
	ritOverPunto: function( id, p ){
		var el = document.getElementById("pt_"+p);
		var siglaPunto = el.value;
		SET.overPunto(siglaPunto,false);
		var elenco = [];
		var els = document.getElementById(id).getElementsByClassName("dettPunto");
		var tot = els.length;
		for(e=0;e<tot;e++){
			var sl = els[e].getElementsByTagName("select");
			elenco.push(sl[0].value);
		}
		SET.evidenziaPuntoMod(elenco);
		SET.aggiornaDettaglio(el);
	},
	overPunto: function( PT_name, over ){
		if(touchable || !PT_name)return;
		
		// verifico le autorizzazioni
		if(!SET.verFreePunti(PT_name)){
			return;
		}
		// --------------------------
		
		var els = scene.getObjectByName("ARs").children;
		for(e in els){
			if(els[e].name==PT_name && els[e].material.name.indexOf("SEL")==-1){
				if(els[e].material.name.indexOf('EVI')==-1){
					tipo = (over) ? "Over" : "Base";
					els[e].material = SET.MAT["area"+els[e].userData.apparato+tipo];
				}
			}
		}
	},
	convPuntiScheda: function( html, noPall=false ){
		var nScheda = '';
		if(SCHEDA.scheda2Aperta)nScheda='2';
		var regexp = /\[\.[^\]]+\.\]/ig;
		var pts = html.match(regexp);
		for(let p in pts){
			siglaPunto = pts[p].split(".")[1];
			NomePunto = DB.set.punti[siglaPunto].NomePunto;
			apparato = DB.set.punti[siglaPunto].apparato;
			var EL = null;
			if(scene.getObjectByName( siglaPunto ))EL=scene.getObjectByName( siglaPunto );
			var pallClass = 'pallinoPat';
			var addClick = '';
			if(noPall){
				pallClass += ' pallinoPunto';
				addClick = 'return;';
			}
			html = html.replace(pts[p], '<span class="'+pallClass+'" onClick="'+addClick+'SET.selPunto(\''+siglaPunto+'\')"><span class="pApp app'+apparato+'"></span>'+NomePunto+'</span>');
		}
		
		return html;
	},
	salvaImpSet: function(){
		PAZIENTI.cambiaGZ(PAZIENTI.mezzoProvvisorio,true);
		MENU.chiudiImpSet();
	},
	popolaImpSet: function(){
		var mzs = PAZIENTI.mezziSet.A;
		var HTML_imp = 
			'<div><i>'+htmlEntities(TXT("MezzoDefault"))+':</i></div><div id="tt_mezzival2">';
		for(let m in mzs){
			HTML_imp += '<span style="background-image:url(img/mezzo_'+mzs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaGZ(\''+mzs[m]+'\',false);"' +
					'	   data-mezzo="'+mzs[m]+'"';
			if(!__(localStorage["mezzoDefault"+globals.set.cartella]) && m==0)HTML_imp += ' class="mzSel"';
			if(localStorage["mezzoDefault"+globals.set.cartella]==mzs[m])HTML_imp += ' class="mzSel"';
			HTML_imp += '	   title="'+htmlEntities(PAZIENTI.mezzi[mzs[m]])+'"></span>';
		}
		HTML_imp += 
			'</div>' +
			'<div style="margin-top:30px;">' +
			'	<span class="annullaBtn" onclick="MENU.chiudiImpSet();">'+TXT("Annulla")+'</span>' +
			'	<span class="submitBtn" onclick="SET.salvaImpSet();">'+TXT("Salva")+'</span>' +
			'</div>';
		document.getElementById("labelImpset").getElementsByTagName("b")[0].innerHTML = TXT("ImpostazioniSet");
		document.getElementById("contImpset").innerHTML = HTML_imp;
	},
	
	/* FUNZIONI DERIVATE */
	_rifletti: function(){
		
	},
	_caricaScheda: function( args ){
		if( args.classe != 'tab_punti' && args.classe != SCHEDA.classeAperta)SET.pMod = '';
	},
	_scaricaScheda: function(){
		SET.pMod = '';
	},
	_scaricaSet: function(){
		// risetto la mappa delle aree

	},
	_scaricaModello: function(){

	},
	_torna: function( args ){
		if(typeof(args.daCarica) == 'undefined')SET.pMod = '';
	}
}