
SET = {
	
	// VARIABILI
	INTERSECTED: null,
	AR: [],
	GD: [],
	time: 0,
	pulse: 1,
	ptSel: null,
	eviPoint: '',
	diffX: 0,
	diffY: 0,
	mAtt: '',
	tmChiusura: null,
	puntiEvidenziati: [],
	pMod: '',
	pointEvi: '',
	geometryPallino: null,
	geometryPallinoTrasp: null,
	tmZone: null,
	groupSel: '',
	maskAtt: '',
	lmVis: false,
	patOp: -1,
	schEvi: null,
	testTOT: 0,
	forzaDissolve: false,
	mappaOr: '',
	lmOr: '',
	groupSel: {
		type: '',
		val: '',
		id: ''
	},
	
	idTeoAnatomia: 0,
	idTeoLM: '0_2',
	idTeoCategorie: 2,
	
	// FUNZIONI
	_init: function(){
		
		SETS = new THREE.Group();
		SETS.name = "SETS";
		
		var modelloAperto = globals.modello.cartella;
		if(!modelloAperto)modelloAperto='piede';
			
		
		var sysMesh = new THREE.Group();
		sysMesh.name = "GEO";
		sysMesh.visible = true;
		
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
				sysMesh.add( GD );
			}
		}
		
		// aree
		var ARS = GEOMETRIE.aree;
		if(ARS){
			var n=-1;
			var AR = new THREE.Group();
			AR.name="ARs";
			AR.visible = true;
			var area = GEOMETRIE.areaBase;
			for(a in ARS){ // aggiungo le aree
				var loader = new THREE.ObjectLoader();
				var mesh = loader.parse(JSON.parse(LZString.decompressFromBase64(ARS[a].obj)));
				var name = mesh.name.split("_")[0];
				
				var lato = "";
				if(mesh.name.indexOf("SX")>-1)lato = "SX";
				if(mesh.name.indexOf("DX")>-1)lato = "DX";
				
				var mat = this.MAT["areaBase"];
				
				mesh.material = cloneMAT(mat);
				if(mesh.name.indexOf("HIDE")>-1){
					mesh.visible = false;
					mesh.userData.hidden = true;
				}
				if(	(MODELLO.flip && lato == 'DX') ||
					(!MODELLO.flip && lato == 'SX') )mesh.visible = false;
				mesh.name = name;
				mesh.userData.apparato = apparato;
				mesh.userData.lato = lato;
				mesh.userData.raycastable = true;
				mesh.userData.type = 'area';
				AR.add( mesh );
			}
			sysMesh.add( AR );
		}
		
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
		contPulsanti += '<div id="pulsante_modello" onClick="cambiaModello(\'piede\');">'+TXT("ApriModello3D")+'</div>';
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
		
		contIcona = '<div id="p_set" onClick="SCHEDA.apriElenco(\'set\',true);"><svg viewBox="0 0 12 48"><polygon points="5,24 12,13 12,35"></polygon></svg><i>'+htmlEntities(TXT("ReflexologyMap"))+'</i></div>';;
		
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
		SET.componiPatologie();
		SET.caricaApprofondimenti();
		if(DB.procedure)SET.car_procedure(-1,1);
		
		SET.filtraSet();
		SET.popolaFiltri();
		
		SET.leggiNote();
		nasLoader();

		if(postApreSet){
			if(SCHEDA.livelloApertura!=3 ){
				
				if(	SCHEDA.classeAperta != 'scheda_A' &&
					SCHEDA.classeAperta != 'scheda_B' )SCHEDA.apriElenco('set');
				else{
					SCHEDA.apriElenco('base');
					PAZIENTI.caricaDettagliSet();
				}
				
			}else{
				if(!SET.ptSel){
					GUIDA.visFumetto("guida_set_mini",false,true);
					SCHEDA.chiudiElenco();
					MENU.chiudiMenu();
				}
			}
		}
		postApreSet = false;
		if(scene.getObjectByName('pins_aree') && areasView){
			scene.getObjectByName('pins_aree').visible = false;
		}

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
				var name = SET.ptSel.name.substr(2,3);
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
		if(scene.getObjectByName("PT"+name))scene.getObjectByName("PT"+name).visible = false;
		if(scene.getObjectByName("_PT"+name))scene.getObjectByName("_PT"+name).visible = false;
		if(scene.getObjectByName("AR"+name))scene.getObjectByName("AR"+name).visible = false;
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
								SETS.children[i].children[ii].isGroup &&
								SETS.children[i].children[ii].name.substr(0,2)!='LN' &&
								SETS.children[i].children[ii].name.substr(0,2)!='GD' &&
								SETS.children[i].children[ii].name.substr(0,2)!='LM'){
								var intersects = raycaster.intersectObjects( SETS.children[i].children[ii].children );
								if ( intersects.length > 0 ) { // roll-over
									for(l in intersects){
										if(intersects[l].object.name.indexOf("NERVO")==-1){
											ints.push(intersects[l]);
										}
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
						ANATOMIA.children[i].name.toLowerCase()=='vasi' ){
						var intersects = raycaster.intersectObject( ANATOMIA.children[i] );
						if ( intersects.length > 0 ){
							for(l in intersects)ints.push(intersects[l]);
						}
						if(ANATOMIA.children[i].type=='Group'){
							for(let g in ANATOMIA.children[i].children){
								var intersects = raycaster.intersectObject( ANATOMIA.children[i].children[g] );
								if ( intersects.length > 0 ){
									for(l in intersects){
										if(intersects[l].object.name.indexOf("NERVO")==-1){
											ints.push(intersects[l]);
										}
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
					if(name.substr(0,1)=='_')name = name.substr(3,name.length-3);
					else name = name.substr(2,name.length-2);
					visToolTip(DB.set.punti[name].NomePunto);
					renderer.domElement.style.cursor='pointer';
					SET.coloraPunti(name,'Over');
				}
			}else{
				this.INTERSECTED=null;
				nasToolTip();
				renderer.domElement.style.cursor='default';
			}
			make=true;
		}
		
		if(this.ptSel){ // pulse del pallino selezionato
			if(this.ptSel.userData.type == 'point'){
				this.pulse+=0.01;
				if(this.pulse>=1.6)this.pulse=1;
				var op=1.8-this.pulse;
				
				SET.setPulsePt( this.ptSel, this.pulse, op );
				
				make=true;
			}
		}
		
		if(SET.lmVis){
			// mostro/nascondo i landmarks
			var nascosto = (manichinoCont.rotation.x>1.5 || 
							manichinoCont.rotation.x<-1.5 || 
							manichinoCont.rotation.y>1.3 || 
							manichinoCont.rotation.y<-1.8 );
			if(nascosto && !document.getElementById("legende").classList.contains("noLms")){ // nascondo
				document.getElementById("legende").classList.add("noLms");
				scene.getObjectByName("LMs").visible = false;
			}
			if(!nascosto && document.getElementById("legende").classList.contains("noLms")){ // mostro
				document.getElementById("legende").classList.remove("noLms");
				scene.getObjectByName("LMs").visible = true;
			}
		}
		
		return make;
	},
	setPulsePt: function( pt, pulse, op, mat='' ){
		var phs = ["","2","3"];
		for(let ph in phs){
			var els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(e in els){
				if(els[e].name.indexOf(pt.name)==0){
					els[e].scale.set(pulse,pulse,pulse);
					if(mat)els[e].material=mat;
				}
			}
		}
		SET.MAT.pointSel.setValues( { opacity: op } );
	},
	desIntersected: function(objOver){
		if(this.INTERSECTED && this.INTERSECTED!=objOver){
			var name=this.INTERSECTED.name;
			if(name.substr(0,1)=='_')name = name.substr(3,name.length-3);
			else name = name.substr(2,name.length-2);
			SET.coloraPunti(name,'Base');
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
		var PT=scene.getObjectByName( PT_name );
		if(typeof(PT)=='undefined')PT = scene.getObjectByName( PT_name.replace("PT","AR") );
		var type = (PT.userData.type == 'point')?"punti":"aree";
		name = PT_name.substr(PT_name.length-3,3);
		
		// verifico le autorizzazioni
		if(!SET.verFreePunti(name)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------

		if(this.ptSel){
			if(name == this.ptSel.name.substr(2,3))return;
			system = this.ptSel.userData.system;
			var mat = SET.MAT["pointBase"+system];
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			SET.setPulsePt( this.ptSel, 1, 1, mat );
			if(document.getElementById("ts_"+this.ptSel.name.substr(2,3)))document.getElementById("ts_"+this.ptSel.name.substr(2,3)).classList.remove("selElPt");
			SET.chiudiPunto(true);
		}
		
		this.ptSel=PT;
		
		if(document.getElementById("ts_"+name))document.getElementById("ts_"+name).classList.add("selElPt");
		
		var PT_name_first= null;
		var AR_name_first= null;
		
		var mat = this.MAT.pointSel;
		if(PT.userData.nota)mat = this.MAT.pointSelNote;
		var phs = ["","2","3"];
		for(let ph in phs){
			var els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(e in els){
				if(els[e].name.indexOf("PT"+name)==0){
					els[e].visible = true;
					els[e].material=mat;
					if(!PT_name_first && els[e].userData.PH == SET.phase){
						PT_name_first = "PT"+name;
						this.ptSel = els[e];
					}
				}
			}
			var els = scene.getObjectByName("LNs"+phs[ph]).children;
			for(e in els){
				if(els[e].name.indexOf("AG"+name)==0){
					els[e].visible=true;
				}
			}
			var mat = this.MAT.areaSel;
			var els = scene.getObjectByName("ARs"+phs[ph]).children;
			for(e in els){
				if(els[e].name.indexOf("AR"+name)==0){
					els[e].visible = true;
					els[e].material=mat;
					if(els[e].userData.PH == SET.phase)AR_name_first = "AR"+name;
				}
			}
		}
		
		var elPin = this.ptSel;
		if(el)elPin = el;
		
		if(!PT.parent.visible){
			if(PT_name_first)PT = scene.getObjectByName(PT_name_first); 
			if(AR_name_first)PT = scene.getObjectByName(AR_name_first); 
		}
		
		var x2 = 0;
		var y2 = 0;
		var z2 = 0;
		var vector = null;
		if(PT.userData.type == 'area'){
			elPin = scene.getObjectByName( "AR"+name );
			var center = getCenterPoint(elPin);
			this.diffX = center.x*1;
			this.diffY = center.y*1;
			x2 = ((MODELLO.flip) ? center.x*1 : 0-center.x*1);
			y2 = 0-center.y*1;
			z2 = 0-center.z*1;
			elPin.updateMatrixWorld();
			vector = center;
			vector.applyMatrix4( elPin.matrixWorld );
		}else{
			this.diffX = elPin.position.x*1;
			this.diffY = elPin.position.y*1;
			x2 = ((MODELLO.flip) ? elPin.position.x : 0-elPin.position.x);
			y2 = 0-elPin.position.y;
			z2 = 0-elPin.position.z;
			elPin.updateMatrixWorld();
			var vector = elPin.geometry.vertices[0].clone();
			vector.applyMatrix4( elPin.matrixWorld );
		}
		panEndZero = { x: x2, y: y2, z: z2 };
		
		if(SCHEDA.aggancio.tipo=='libera' && el){
			panEnd = { x: vector.x, y: vector.y, z: vector.z };
		}else panEnd = { x: 0, y: 0, z: 0 };
		
		
		
		if(!el){
			// posiziono
			if(GEOMETRIE.posizioni[name] && !SET.phase){
				var pos = GEOMETRIE.posizioni[name];

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
				rotateEnd = { x:pos.x, y: ((MODELLO.flip) ? 0-pos.y : pos.y), z:0 };
			}
			if(manichinoCont.position.z<15 || !zoomEnd || !smothingView)zoomEnd = 15;
			normalizeRotation();
		}
		if(PT_name_first && globals.modello.cartella){
			SET.addEviPalls(PT_name_first,'Select');
			this.pulse = 1;
		}
		
		
		
		SET.caricaPunto( name, ritorno );
	},
	chiudiPunto: function( nonChiudereScheda=false, riapri=false ){
		if(!this.ptSel)return;
		document.getElementById("scheda").classList.remove("tab_punti");
		document.getElementById("scheda").classList.remove("schForm");
		if(document.getElementById("ts_"+this.ptSel.name.substr(2,3)))
			document.getElementById("ts_"+this.ptSel.name.substr(2,3)).classList.remove("selElPt");
		
		if(!nonChiudereScheda){
			endChangeDetection();
			SCHEDA.formModificato = false;
		}
		if(this.ptSel.userData.type == 'point'){
			this.eviPoint.material.visible = false;
			this.pulse=0;
			var mat = cloneMAT(SET.MAT["pointBase"+this.ptSel.userData.system]);
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			this.ptSel.material=mat;
			this.ptSel.material.opacity=1;
			
			SET.delEviPalls(this.ptSel.name,'Select');
			SET.delEviPalls("_"+this.ptSel.name,'Over');
		}
		exPt = SET.ptSel;
			
		// coloro tutti gli altri punti
		var mat = cloneMAT(SET.MAT["pointBase"+this.ptSel.userData.system]);
		if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
		var phs = ["","2","3"];
		for(let ph in phs){
			var els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(e in els){
				if(els[e].name.indexOf("PT"+this.ptSel.name.substr(2,3))==0){
					if(__(els[e].userData.hidePunto,'0')=='1')els[e].visible = false;
					els[e].material=mat;
					els[e].material.opacity = 1;
					els[e].scale.set(1,1,1);
				}
				if(els[e].name.indexOf("_PT"+this.ptSel.name.substr(2,3))==0){
					if(__(els[e].userData.hidePunto,'0')=='1')els[e].visible = false;
				}
			}
			var els = scene.getObjectByName("LNs"+phs[ph]).children;
			for(e in els){
				if(els[e].name.indexOf("AG")==0){
					els[e].visible=false;
				}
			}
			var els = scene.getObjectByName("ARs"+phs[ph]).children;
			for(e in els){
				if(els[e].name.indexOf("AR"+this.ptSel.name.substr(2,3))==0){
					if(__(els[e].userData.hidePunto,'0')=='1')els[e].visible = false;
					system = els[e].userData.system;
					if(SET.puntiEvidenziati.indexOf(this.ptSel.name.substr(2,3))>-1){
						system = 'Evi';
						tipo='';
					}else tipo='Base';
					els[e].material = cloneMAT(SET.MAT["area"+tipo+system]);
				}
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
		}
		
		// ricentro il manichino
		exPt.updateMatrixWorld();
		if(exPt.userData.type == 'area'){
			var center = getCenterPoint(exPt);
			var vector = new THREE.Vector3( ((MODELLO.flip) ? center.x*1 : 0-center.x*1), 0-center.y*1, 0-center.z*1 );
		}else{
			var vector = exPt.geometry.vertices[0].clone();
		}
		vector.applyMatrix4( exPt.matrixWorld );
		manichino.position.set( 0, 0, 0 );
		render();
		exPt.updateMatrixWorld();
		if(exPt.userData.type == 'area'){
			var center = getCenterPoint(exPt);
			var vector2 = new THREE.Vector3( ((MODELLO.flip) ? center.x*1 : 0-center.x*1), 0-center.y*1, 0-center.z*1 );
		}else{
			var vector2 = exPt.geometry.vertices[0].clone();
		}
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
				SET.swElencoPt(document.getElementById("p_punti"),'punti',true);
				let nascosta = document.body.classList.contains("nasSch");
				SET.apriPunto(exPt.name,'');
				if(nascosta)SCHEDA.nascondiScheda();
				if(smartMenu)SCHEDA.apriElenco('set',true);
			},500);
		}
	},
	_applyLineMethod: function(){
		//
	},
	scriviPunto: function( siglaPunto, esteso=false, noRet=false, col ){
		
		var nomePunto = DB.set.punti[siglaPunto].NomePunto;
		var EL = null;
		if(scene.getObjectByName( "PT"+siglaPunto ))EL=scene.getObjectByName( "PT"+siglaPunto );
		if(scene.getObjectByName( "AR"+siglaPunto ))EL=scene.getObjectByName( "AR"+siglaPunto );
		
		var html = '<a class="pallinoPat';
		if(esteso)html += ' pallinoPatEsteso';
		if(col)html += ' noPall';
		if(__(EL.userData.locked,false))html+=' lockedItem';
		var ret = '';
		if(!noRet)ret = SET.chiudiPunto(true);
		html += '"';
		if(col)html+= ' style="border-left:6px solid #'+col+'"';
		html+= ' onClick="SET.apriPunto(\''+EL.name+'\',\''+ret+'\');"';
		if(noRet)html += '  onMouseOver="SET.overPunto(\''+EL.name+'\',true);"' +
						 '  onMouseOut="SET.overPunto(\''+EL.name+'\',false);"' +
						 '	id="ts_'+siglaPunto.replace('.','_')+'"';
		html += '>';
		var system = EL.userData.system;
		if(!system)system = 'INT';
		html += '<span class="p'+system+'"></span>';
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
		SET.apriPunto("PT"+PT,'SET.chiudiPunto(true);');
	},
	selArea: function( PT ){
		SET.selPunto(PT);
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
			PAZIENTI.auriculoProvvisori[SET.pMod].n = ptP;
			PAZIENTI.caricaPuntiTrattamento();
		}
		SET.pMod = '';
		SCHEDA.torna();
		SCHEDA.formModificato = true;
	},
	evidenziaPunto: function( el, anatomia='', mappa='', lm='' ){
		if(!el || typeof(el)=='undefined') var el = document.getElementById("scheda_testo");
		let html = el.innerHTML;
		SET.annullaEvidenziaPunto(true);
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
		SET.applicaEvidenziaPunto(anatomia,mappa,lm);
		/*
		//-------------------- MOSTRA LINEE
		//SET.hideGroupLines();
		var re = /data-tri="[^"]+"/ig;
		var result = html.match(re);
		for(let k in result){
			var pT=result[k].split('"');
			var gruppo = pT[1];
			if(scene.getObjectByName(gruppo)){
				scene.getObjectByName(gruppo).visible = true;
			}
		}
		//----------------*/
		SET.settaOverPunto();
	},
	evidenziaPuntoMod: function( elenco ){
		SET.annullaEvidenziaPunto();
		for(let k in elenco){
			var pp=elenco[k].split(".");
			var mat = SET.MAT.pointEvi;
			if(pp[1]=='D')mat = SET.MAT.pointDolore;
			if(scene.getObjectByName("_PT"+pp[0])){
				scene.getObjectByName("_PT"+pp[0]).material=mat;
				siglaPunto = elenco[k].split(".")[0];
				SET.puntiEvidenziati.push(siglaPunto);
			}
		}
		SET.applicaEvidenziaPunto();
	},
	applicaEvidenziaPunto: function( anatomia, mappa, lm='' ){
		if(SET.puntiEvidenziati.length || anatomia){
			var phs = ["","2","3"];
			for(let ph in phs){
				var els = scene.getObjectByName("PTs"+phs[ph]).children;
				for(e in els){
					var siglaPunto = els[e].name.replace("_","").substr(2,3);
					if(SET.puntiEvidenziati.indexOf(siglaPunto)>-1){
						if(els[e].name.substr(0,1)=='_')els[e].material=SET.MAT.pointEvi;
						else els[e].material.opacity = 1;
						els[e].visible = true;
					}else{
						if(els[e].name.substr(0,1)!='_')els[e].material.opacity = 0.5;
					}
				}
				var els = scene.getObjectByName("ARs"+phs[ph]).children;
				for(e in els){
					var siglaPunto = els[e].name.substr(2,3);
					if(SET.puntiEvidenziati.indexOf(siglaPunto)>-1){
						els[e].material=SET.MAT.areaEvi;
						els[e].material.opacity = 0.7;
						els[e].visible = true;
					}else{
						els[e].material.opacity = 0.2;
					}
				}
			}
		}
		if(anatomia){
			setTimeout( function(){
				SET.forzaDissolve = {
					"Pelle": localStorage.opPelle,
					"Ossa": localStorage.opOssa,
					"Visceri": localStorage.opVisceri
				};
				MODELLO.op("Pelle",parseFloat(anatomia.Pelle));
				MODELLO.op("Ossa",parseFloat(anatomia.Ossa));
				MODELLO.op("Visceri",parseFloat(anatomia.Visceri));
				SET.puntiEvidenziati.push("999"); // evita l'illuminazione dei punti al passaggio del mouse
			}, 200, anatomia);
		}
		if(mappa){
			setTimeout( function(){
				SET.mappaOr = localStorage.imgMappa;
				SET.cambiaMappa(mappa);
			}, 200, mappa);
		}
		if(lm!==''){
			setTimeout( function(){
				SET.lmOr = SET.lmVis;
				if(SET.lmVis != lm && globals.modello.cartella)SET.swLM();
			}, 200, lm);
		}
	},
	annullaEvidenziaPunto: function( forzaDissolve=false ){
		if(SET.puntiEvidenziati.length || forzaDissolve){
			var phs = ["","2","3"];
			for(let ph in phs){
				
				var els = scene.getObjectByName("PTs"+phs[ph]).children;
				for(e in els){
					var siglaPunto = els[e].name.replace("_","").substr(2,3);
					var vis = !__(DB.set.punti[siglaPunto].hidden,false) && __(els[e].userData.hidePunto,'0')=='0';
					if(SET.puntiEvidenziati.indexOf(siglaPunto)>-1){
						if(els[e].name.indexOf("_PT"+siglaPunto)==0){
							els[e].material=SET.MAT.pointTrasp;
							els[e].visible = vis;
						}
						if(els[e].name.indexOf("PT"+siglaPunto)==0){
							els[e].visible = vis;
						}
					}
					if(els[e].name.substr(0,1)!='_'){
						els[e].material.opacity = 1;
					}
				}
				var els = scene.getObjectByName("ARs"+phs[ph]).children;
				for(e in els){
					var siglaPunto = els[e].name.substr(2,3);
					var vis = !__(DB.set.punti[siglaPunto].hidden,false) && __(els[e].userData.hidePunto,'0')=='0';
					if(SET.puntiEvidenziati.indexOf(siglaPunto)>-1){
						if(els[e].name.indexOf("AR"+siglaPunto)==0){
							els[e].material=cloneMAT(SET.MAT["areaBase"+els[e].userData.system]);
							els[e].visible = vis;
						}
					}
					els[e].material.opacity = 0.4;
				}
			}
		}
		if(forzaDissolve){
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
		}
		SET.puntiEvidenziati = [];
	},
	settaOverPunto: function(){
		if(!touchable){
			var els = document.getElementById("scheda_testo").getElementsByClassName("pallinoPat");
			for(e=0;e<els.length;e++){
				var onclick = els[e].onclick.toString();
				if(onclick.indexOf("SET.selPunto('")>-1){
					els[e].dataset.siglaPunto = onclick.split("SET.selPunto('")[1].split("')")[0];
				}
				if(onclick.indexOf("SET.selArea('")>-1){
					els[e].dataset.siglaPunto = onclick.split("SET.selArea('")[1].split("')")[0];
				}
				els[e].onmouseover = function(){
					SET.overPunto("PT"+this.dataset.siglaPunto,true);
				}
				els[e].onmouseout = function(){
					SET.overPunto("PT"+this.dataset.siglaPunto,false);
				}
			}
		}
	},
	ritOverPunto: function( id, p ){
		var el = document.getElementById("pt_"+p);
		var siglaPunto = el.value;
		SET.overPunto("PT"+siglaPunto,false);
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
	coloraPunti: function( PT_name, tipo ){
		if(touchable)return;
		var els = scene.getObjectByName("PTs"+SET.phase).children;
		for(let e in els){
			if(	els[e].name.indexOf("PT"+PT_name) == 0 && 
				els[e].material.name.indexOf("SEL") == -1 && 
				SET.note.indexOf(PT_name) == -1 ){
				system = els[e].userData.system;
				if(SET.MAT["point"+tipo+system].name != els[e].material.name){
					els[e].material = cloneMAT(SET.MAT["point"+tipo+system]);
					if(SET.puntiEvidenziati.length && SET.puntiEvidenziati.indexOf(PT_name)==-1){
						els[e].material.opacity = 0.5;
					}else els[e].material.opacity = 1;
				}
			}
		}
		var els = scene.getObjectByName("ARs"+SET.phase).children;
		for(let e in els){
			if(	els[e].name.indexOf("AR"+PT_name) == 0 && 
				els[e].material.name.indexOf("SEL") == -1 && 
				SET.note.indexOf(PT_name) == -1  ){
				system = els[e].userData.system;
				if(els[e].material.name.indexOf('EVI')>-1){
					system = 'Evi';
					if(tipo=='Base')tipo='';
				}
				if(SET.MAT["area"+tipo+system].name != els[e].material.name){
					els[e].material = cloneMAT(SET.MAT["area"+tipo+system]);
					if(SET.puntiEvidenziati.length){
						if(SET.puntiEvidenziati.indexOf(PT_name)>-1)els[e].material.opacity = 0.7;
						else els[e].material.opacity = 0.2;
					}
				}
			}
		}
	},
	overPunto: function( PT_name, over ){
		var name = PT_name.split(".")[0];
		if(name.substr(0,1)=='_')name = name.substr(3,name.length-3);
		else name = name.substr(2,name.length-2);
		if(touchable || !name)return;
		
		// verifico le autorizzazioni
		if(!SET.verFreePunti(name)){
			return;
		}
		// --------------------------
		
		var phs = ["","2","3"];
		for(let ph in phs){
			var els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(e in els){
				if(els[e].name.indexOf("_PT"+name)==0 && els[e].material.name.indexOf("SEL")==-1){
					if(over)SET.addEviPalls("_PT"+name,'Over');
					else SET.delEviPalls("_PT"+name,'Over');
				}
			}
			var tipo = (over) ? "Over" : "";
			var els = scene.getObjectByName("ARs"+phs[ph]).children;
			for(e in els){
				if(els[e].name.indexOf("AR"+name)==0 && els[e].material.name.indexOf("SEL")==-1){
					system = els[e].userData.system;
					if(els[e].material.name.indexOf('EVI')>-1){
						system = 'Evi';
						tipo = (over) ? "Over" : "";
					}else{
						tipo = (over) ? "Over" : "Base";
					}
					els[e].material = cloneMAT(SET.MAT["area"+tipo+system]);
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
			var EL = null;
			if(scene.getObjectByName( "PT"+siglaPunto ))EL=scene.getObjectByName( "PT"+siglaPunto );
			if(scene.getObjectByName( "AR"+siglaPunto ))EL=scene.getObjectByName( "AR"+siglaPunto );
			var system = EL.userData.system;
			if(!system)system = 'INT';
			var pallClass = 'pallinoPat';
			var addClick = '';
			if(noPall){
				pallClass += ' pallinoPunto';
				addClick = 'return;';
			}
			html = html.replace(pts[p], '<span class="'+pallClass+'" onClick="'+addClick+'SET.selPunto(\''+siglaPunto+'\')"><span class="p'+system+'"></span>'+NomePunto+'</span>');
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
	cambiaMappa: function( name, loader ){
		if(SET.maskAtt){
			SET.MAT.setAlphaMap( SET.maskAtt, 'clic' );
			SET.MAT.setAlphaMap( SET.maskAtt, 'out' );
		}
		localStorage.imgMappa = name;
		SET.MAT.mappaAree( true );
		SET.caricaPunti();
	},
	
	addEviPalls: function( PT_name, tipo ){
		var els = scene.getObjectByName("PTs"+SET.phase).children;
		for(e in els){
			if(els[e].name.indexOf(PT_name)==0){
				var name = ' point: '+els[e].name+"_"+e;
				if(!scene.getObjectByName(tipo+name)){
					var geoPoint =  new THREE.SphereGeometry( 0.11, 16, 16 );
					var eviPoint;
					eviPoint =  new THREE.Mesh( geoPoint, this.MAT.pointSel2.clone() );
					eviPoint.name=tipo+name;
					eviPoint.material.visible=true;
					eviPoint.position.set( els[e].position.x, els[e].position.y, els[e].position.z );
					SETS.add( eviPoint );
				}
			}
		}
	},
	delEviPalls: function( PT_name, tipo ){
		var els = SETS.children;
		for(e=els.length-1;e>=0;e--){
			if(els[e].name.indexOf(tipo+' point: '+PT_name)==0){
				SETS.remove( els[e] );
			}
		}
	},
	delAllEviPalls: function(tipo){_
		var els = SETS.children;
		for(e=els.length-1;e>=0;e--){
			if(els[e].name.indexOf(tipo+' point: ')==0){
				SETS.remove( els[e] );
			}
		}
	},
	
	// LM
	swLM: function(){ // mostra/nasconde i landmarks
		if(SET.lmVis)SET.nasLM();
		else SET.visLM();
	},
	visLM: function(){ // mostra i landmarks
		// verifico le autorizzazioni
		/*if(!SET.verFreePatologia(n*1)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}*/
		// --------------------------
		// verifico le autorizzazioni
		if(!DB.login.data.auths.indexOf("auricologia")==-1){
			ALERT(TXT("MsgFunzioneSoloPay"));
			return;
		}
		// --------------------------
		document.getElementById("p_lms").classList.add("btnSel");
		var lms = scene.getObjectByName("LMs");
		for(l in lms.children){
			var leg = document.createElement('div');
			var l = l.toString();
			if(l.length==1)l="0"+l;
			leg.id = 'LM'+l;
			leg.dataset.idObj = leg.id;
			leg.className = "noFr";
			leg.style.cursor = "pointer";
			leg.innerHTML = leg.id;
			leg.onclick = function(){
				SET.caricaApprofondimento(	parseInt(SET.idTeoLM.split("_")[0]),
									parseInt(SET.idTeoLM.split("_")[1]),
									document.getElementById("btn_teoria_"+SET.idTeoLM));
			}
			document.getElementById("legende").appendChild(leg);
		}
		lms.visible = true;
		SET.lmVis = true;
	},
	nasLM: function(){ // nasconde i landmarks
		document.getElementById("p_lms").classList.remove("btnSel");
		var lms = scene.getObjectByName("LMs");
		for(l in lms.children){
			var l = l.toString();
			if(l.length==1)l="0"+l;
			document.getElementById("legende").removeChild(document.getElementById('LM'+l));
		}
		document.getElementById("legende").classList.remove("noLms");
		lms.visible = false;
		SET.lmVis = false;
	},
	
	
	// EVIDENZIA ZONE
	eviZone: function( zona, act ){
		if(!touchable){
			if(act == 'over' || act == 'clic'){
				clearTimeout(SET.tmZone);
				SET.tmZone = null;
				SET.MAT.setAlphaMap( zona, act );
			}else{
				SET.tmZone = setTimeout(function(){
					SET.MAT.setAlphaMap( zona, act );
				},200, zona, act );
			}
		}
	},
	
	/* FUNZIONI DERIVATE */
	_rifletti: function(){
		if(areasView)SET.MAT.applicaMappa(localStorage.imgMappa);
		var opposite = (MODELLO.flip) ? 'DX' : 'SX';
		var phs = ["","2","3"];
		for(let ph in phs){
			var els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(e in els){
				var name = els[e].name.replace("_","").substr(2,3);
				if(DB.set.punti[name].hidden || __(els[e].userData.hidePunto,'0')=='1')els[e].visible = false;
				else if(els[e].userData.lato == opposite)els[e].visible = false;
				else if(!els[e].visible && !__(els[e].userData.locked,false))els[e].visible = true;
			}
			var els = scene.getObjectByName("ARs"+phs[ph]).children;
			for(e in els){
				var name = els[e].name.replace("_","").substr(2,3);
				if(DB.set.punti[name].hidden || __(els[e].userData.hidePunto,'0')=='1')els[e].visible = false;
				else if(els[e].userData.lato == opposite)els[e].visible = false;
				else if(!els[e].visible && !__(els[e].userData.locked,false))els[e].visible = true;
			}
			var els = scene.getObjectByName("LNs"+phs[ph]).children;
			for(e in els){
				var name = els[e].name.substr(2,3);
				if(els[e].name.substr(0,2)=='AG' && name == SET.ptSel.name.substr(2,3)){
					if(DB.set.punti[name].hidden || __(els[e].userData.hidePunto,'0')=='1')els[e].visible = false;
					else if(els[e].userData.lato == opposite)els[e].visible = false;
					else if(!els[e].visible && !__(els[e].userData.locked,false))els[e].visible = true;
				}
			}
		}
		if(SET.groupSel.id)SET.filtraGruppo( SET.groupSel.type, SET.groupSel.val, SET.groupSel.id, true );
	},
	_caricaScheda: function( args ){
		if( args.classe != 'tab_punti' && args.classe != SCHEDA.classeAperta)SET.pMod = '';
	},
	_scaricaScheda: function(){
		SET.pMod = '';
	},
	_scaricaSet: function(){
		// risetto la mappa delle aree
		MODELLO.MAT.mappaAree();
		if(areasView)MODELLO.meshPelle.children[0].material = MODELLO.MAT.materialAree[0];
		SET.nasLM(); //  nascondo i landmarks
	},
	_scaricaModello: function(){
		SET.nasLM(); //  nascondo i landmarks
	},
	_torna: function( args ){
		if(typeof(args.daCarica) == 'undefined')SET.pMod = '';
	},
	filtraSet: function( togliLoader=false ){
		var vis = true;
		if(	DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())vis = false;
		for(let c in SETS.children[0].children){
			var gruppo = SETS.children[0].children[c].children;
			for(let g in gruppo){
				var name = gruppo[g].name.replace("_","");
				// verifico le autorizzazioni
				if(	!SET.verFreePunti(name.substr(2,3))){
					gruppo[g].visible = vis;
					gruppo[g].userData.locked = true;
					if(document.getElementById("ts_"+name.substr(2,3)))document.getElementById("ts_"+name.substr(2,3)).classList.toggle("lockedItem",!vis);
				}else{
					gruppo[g].userData.locked = false;
				}
			}
		}
		if(togliLoader){
			nasLoader();
		}
	}
}