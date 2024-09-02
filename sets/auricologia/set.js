
var SET = {
	
	// VARIABILI
	INTERSECTED: null,
	P: [],
	PT: [],
	LN: [],
	PN: [],
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
	risTest:{
		dipendenza: {
			tot: -1,
			vals: {}
		},
		motivazione: {
			tot: -1,
			vals: {}
		}
	},
	test: '',
	groupSel: {
		type: '',
		val: '',
		id: ''
	},
	frequenze: [	"1168",
					"18688",
					"9334",
					"584",
					"4672",
					"2336",
					"292" ],
	phase: '',
	PH_full: false,
	PH2_full: false,
	PH3_full: false,
	
	idTeoAnatomia: 0,
	idTeoLM: '0_2',
	idTeoCategorie: 2,
	idTeoTests: 3,
	
	// FUNZIONI
	_init: function(){
		if(!__(localStorage.imgMappa))localStorage.imgMappa = 'BN';
		if(!__(localStorage.listPatType))localStorage.listPatType = 'category';
		
		SETS = new THREE.Group();
		SETS.name = "SETS";
		
		let facce = 10,
			facceTrasp = 14;
		if(isTablet){
			facce = 8;
			facceTrasp = 12;
		}
		let modelloAperto = globals.modello.cartella;
		if(!modelloAperto)modelloAperto='orecchio';
		this.geometryPallino = new THREE.SphereGeometry( 0.04, facce, facce );
		this.geometryPallinoTrasp = new THREE.SphereGeometry( 0.08, facceTrasp, facceTrasp );
			
		
		let sysMesh = new THREE.Group();
		sysMesh.name = "GEO";
		sysMesh.visible = true;
		
		// guide (se ci sono)
		let n=-1,
			GDS=GEOMETRIE.guide;
		if(GDS){
			if(GDS.length){
				let GD = new THREE.Group();
				GD.name="GDs";
				for(l in GDS){ // aggiungo le guide
					
					let loader = new THREE.ObjectLoader(),
						mesh =  loader.parse(JSON.parse(LZString.decompressFromBase64(GDS[l].obj)));
					mesh.material = this.MAT.lineGuide;
					GD.add( mesh );
					
				}
				sysMesh.add( GD );
			}
		}
		
		// linee di conterno
		let LNS=GEOMETRIE.linee;
		if(LNS){
			if(LNS.length){
				let LN = new THREE.Group(),
					LN2 = new THREE.Group(),
					LN3 = new THREE.Group(),
					LM = new THREE.Group();
				LN.name="LNs";
				LN2.name="LNs2";
				LN3.name="LNs3";
				LM.name="LMs";
				LN.visible=true;
				LN2.visible=false;
				LN3.visible=false;
				LM.visible=false;
				for(l in LNS){ // aggiungo le guide
					let loader = new THREE.ObjectLoader(),
						mesh =  loader.parse(JSON.parse(LZString.decompressFromBase64(LNS[l].obj))),
						name = mesh.name.split(" ")[0],
						orName = mesh.name,
						vis = true,
						PH = '',
						type = '';
					mesh.name = name;
					if(	orName.indexOf("AG")==0 ||
						orName.indexOf("(GRUPPO)")>-1){
						mesh.visible = false;
						if(mesh.name.indexOf("AG")==0){
							mesh.material = this.MAT.lineNeedle;
							if(mesh.name.indexOf("PH2")>-1){
								vis = false;
								PH = '2';
							}
							if(mesh.name.indexOf("PH3")>-1){
								vis = false;
								PH = '3';
							}
							let lato = "";
							if(orName.indexOf("SX")>-1)lato = "SX";
							if(orName.indexOf("DX")>-1)lato = "DX";
							mesh.userData.lato = lato;
							if(	(MODELLO.flip && lato == 'DX') ||
								(!MODELLO.flip && lato == 'SX') )mesh.visible = false;
						}
						if(orName.indexOf("(GRUPPO)")>-1)mesh.material = this.MAT.lineGroup;
						if(orName.indexOf("HIDE")>-1){
							mesh.visible = false;
							mesh.userData.hidden = true;
						}
						mesh.userData.gruppo = true;
						mesh.PH = PH;
						SET["PH"+PH+"_full"] = true;
						eval("LN"+PH+".add( mesh )");
					}else if( orName.indexOf("LM")==0 ){
						mesh.material = this.MAT.lineLM;
						LM.add( mesh );
					}else{
						mesh.material = this.MAT.line;
					}
				}
				sysMesh.add( LN );
				sysMesh.add( LN2 );
				sysMesh.add( LN3 );
				sysMesh.add( LM );
			}
		}
		
		// aree
		let ARS = GEOMETRIE.aree;
		if(ARS){
			n=-1;
			let AR = new THREE.Group(),
				AR2 = new THREE.Group(),
				AR3 = new THREE.Group();
			AR.name="ARs";
			AR2.name="ARs2";
			AR3.name="ARs3";
			AR.visible = true;
			AR2.visible = false;
			AR3.visible = false;
			let area = GEOMETRIE.areaBase;
			for(a in ARS){ // aggiungo le aree
				let loader = new THREE.ObjectLoader(),
					mesh = loader.parse(JSON.parse(LZString.decompressFromBase64(ARS[a].obj))),
					name = mesh.name.split("_")[0];
				
				
				let system = "";
				if(mesh.name.indexOf("EUR")>-1)system = "EUR";
				if(mesh.name.indexOf("CIN")>-1)system = "CIN";
				if(mesh.name.indexOf("INT")>-1)system = "";
				let lato = "";
				if(mesh.name.indexOf("SX")>-1)lato = "SX";
				if(mesh.name.indexOf("DX")>-1)lato = "DX";
				
				let PH = '';
				if(mesh.name.indexOf("PH2")>-1)PH = '2';
				if(mesh.name.indexOf("PH3")>-1)PH = '3';
				
				let FN = (GEOMETRIE.gruppi.FN.punti.indexOf(name.substr(2,3))>-1),
					master = (GEOMETRIE.gruppi.MASTER.punti.indexOf(name.substr(2,3))>-1),
					freq = [];
				for(let f in SET.frequenze){
					if(mesh.name.indexOf("_"+SET.frequenze[f])>-1)freq.push( SET.frequenze[f] );
				}
				if(PH){
					system = 'EUR';
					if(PH=='2')DB.set.punti[name.substr(2,3)].PH2 = true;
					if(PH=='3')DB.set.punti[name.substr(2,3)].PH3 = true;
				}
				let mat = this.MAT["areaBase"+system];
				
				mesh.material = cloneMAT(mat);
				if(mesh.name.indexOf("HIDE")>-1){
					mesh.visible = false;
					mesh.userData.hidden = true;
				}
				if(	(MODELLO.flip && lato == 'DX') ||
					(!MODELLO.flip && lato == 'SX') )mesh.visible = false;
				mesh.name = name;
				mesh.userData.area = area;
				mesh.userData.system = system;
				mesh.userData.freq = freq;
				mesh.userData.master = master;
				mesh.userData.FN = FN;
				mesh.userData.lato = lato;
				mesh.userData.raycastable = true;
				mesh.userData.type = 'area';
				mesh.userData.PH = PH;
				SET["PH"+PH+"_full"] = true;
				eval("AR"+PH+".add( mesh )");
			}
			sysMesh.add( AR );
			sysMesh.add( AR2 );
			sysMesh.add( AR3 );
		}
		
		// pins delle aree
		let PN = new THREE.Group();
		PN.name="PNs";
		n=-1;
		let PNS=GEOMETRIE.pins;
		for(let p in PNS){
			if(PNS[p]!=''){
				let x = PNS[p].array[0],
					y = PNS[p].array[1],
					z = PNS[p].array[2];
					
				// pallino trasparente
				n++;
				this.P[n] = new THREE.Mesh( this.geometryPallinoTrasp, this.MAT.pointTrasp ); 
				this.P[n].position.set(x,y,z);
				this.P[n].name=PNS[p].nome
				this.P[n].visible=false
				PN.add( this.P[n] );
			}
		}
		sysMesh.add( PN );
		
		// PUNTI
		let PT = new THREE.Group(),
			PT2 = new THREE.Group(),
			PT3 = new THREE.Group();
		PT.name="PTs";
		PT2.name="PTs2";
		PT3.name="PTs3";
		PT.visible = true;
		PT2.visible = false;
		PT3.visible = false;
		// carico i punti parametrizzati
		n=-1;
		let PTS=GEOMETRIE.punti;
		for(let p in PTS){
			if(PTS[p]!=''){
				let x = PTS[p].array[0],
					y = PTS[p].array[1],
					z = PTS[p].array[2],
					name = PTS[p].nome.split("(")[0].trim(),
					system = "";
				if(PTS[p].nome.indexOf("EUR")>-1)system = "EUR";
				if(PTS[p].nome.indexOf("CIN")>-1)system = "CIN";
				if(PTS[p].nome.indexOf("INT")>-1)system = "";
				let lato = "";
				if(PTS[p].nome.indexOf("SX")>-1)lato = "SX";
				if(PTS[p].nome.indexOf("DX")>-1)lato = "DX";
				
				let PH = '';
				if(PTS[p].nome.indexOf("PH2")>-1)PH = '2';
				if(PTS[p].nome.indexOf("PH3")>-1)PH = '3';
				
				let freq = [];
				for(let f in SET.frequenze){
					if(PTS[p].nome.indexOf(" "+SET.frequenze[f])>-1)freq.push( SET.frequenze[f] );
				}
				
				
				let FN = (GEOMETRIE.gruppi.FN.punti.indexOf(name.substr(2,3))>-1),
					master = (GEOMETRIE.gruppi.MASTER.punti.indexOf(name.substr(2,3))>-1);
				
				
				// pallino colorato
				n++;
				if(PH){
					system = 'EUR';
					if(PH=='2')DB.set.punti[name.substr(2,3)].PH2 = true;
					if(PH=='3')DB.set.punti[name.substr(2,3)].PH3 = true;
				}
				let mat = this.MAT["pointBase"+system];
				
				this.P[n] = new THREE.Mesh( this.geometryPallino, cloneMAT(mat) );
				
				this.P[n].position.set(x,y,z);
				this.P[n].name=name;
				if(PTS[p].nome.indexOf("HIDE")>-1){
					this.P[n].visible = false;
					this.P[n].userData.hidden = true;
				}
				if(	(MODELLO.flip && lato == 'DX') ||
					(!MODELLO.flip && lato == 'SX') )this.P[n].visible = false;
				this.P[n].userData.type = 'point';
				this.P[n].userData.system = system;
				this.P[n].userData.freq = freq;
				this.P[n].userData.master = master;
				this.P[n].userData.FN = FN;
				this.P[n].userData.lato = lato;
				this.P[n].userData.PH = PH;
				SET["PH"+PH+"_full"] = true;
				eval("PT"+PH+".add( this.P[n] )");
					
				// pallino trasparente
				n++;
				this.P[n] = new THREE.Mesh( this.geometryPallinoTrasp, this.MAT.pointTrasp ); 
				this.P[n].position.set(x,y,z);
				this.P[n].name='_'+name;
				if(PTS[p].nome.indexOf("HIDE")>-1){
					this.P[n].visible = false;
					this.P[n].userData.hidden = true;
				}
				if(	(MODELLO.flip && lato == 'DX') ||
					(!MODELLO.flip && lato == 'SX') )this.P[n].visible = false;
				this.P[n].userData.raycastable = true;
				this.P[n].userData.nota = false;
				this.P[n].userData.type = 'point';
				this.P[n].userData.system = system;
				this.P[n].userData.freq = freq;
				this.P[n].userData.master = master;
				this.P[n].userData.FN = FN;
				this.P[n].userData.lato = lato;
				this.P[n].userData.PH = PH;
				SET["PH"+PH+"_full"] = true;
				eval("PT"+PH+".add( this.P[n] )");
			}
		}
		sysMesh.add( PT );
		sysMesh.add( PT2 );
		sysMesh.add( PT3 );
		SETS.add( sysMesh );
		
		SET.MAT.mappaAree(true);
		
		let contPulsanti = 	'<span class="menuElenchi" onclick="MENU.visMM(\'btnCarMapMenu\');"></span>' +
							'<span id="btnCarMapMenu" class="btn_meridiani_shiatsu titolo_set">' +
							'<span onMouseDown="SCHEDA.iniziaMoveScheda(event);"' +
								 ' onTouchStart="SCHEDA.iniziaMoveScheda(event);">AuriculoMap</span>' +
							/* '<i class="elMenu" id="chiudiSet" onClick="chiudiSet();" title="'+htmlEntities(TXT("ChiudiSet"))+'"><span>' +
								htmlEntities(TXT("ChiudiSet")) +
							'</span></i>' + */
							'<span id="mappe_titolo_freccia" onclick="MENU.visSets();" class="btn_altri_archivi"><i>'+TXT("AltreMappe")+'</i></span>' +
							'<i class="elMenu" id="impostazioniSet" onClick="MENU.visImpset();" title="'+htmlEntities(TXT("ImpostazioniSet"))+'"><span>' +
								htmlEntities(TXT("ImpostazioniSet")) +
							'</span></i>' +
							'<i class="elMenu" id="help_set" onClick="GUIDA.visFumetto(\'guida_set\',true,true);">?</i></span>';
		let contElenco = '';
		
		contPulsanti += '<div id="pulsante_modello" onClick="cambiaModello(\'orecchio\');">'+TXT("ApriModello3D")+'</div>';

		contPulsanti += '<span id="noLicenze" onClick="MENU.visLicenze();">'+TXT("noLicenze")+'</span>';
		contPulsanti += '<span id="demoVersion" onClick="MENU.visLogin();">'+TXT("demoVersion")+'</span>';


		// punti
		contPulsanti += '<div id="pulsante_punti" class="frdx" onClick="SCHEDA.selElenco(\'punti\');">'+TXT("Mappa")+'</div>';
		contElenco += '<div id="lista_punti"></div>';
		
		// patologie
		contPulsanti += '<div id="pulsante_patologie" class="frdx" onClick="SCHEDA.selElenco(\'patologie\');">'+TXT("Patologie")+'</div>';
		contElenco += '<div id="lista_patologie"></div>';
		
		// procedure personalizzare
		let contProcedure = '';
		contPulsanti += '<div id="pulsante_procedure" class="frdx" onClick="SCHEDA.selElenco(\'procedure\');">'+TXT("Procedure")+'</div>';
		contElenco += '<div id="lista_procedure"></div>';
		
		// teoria
		contPulsanti += '<div id="pulsante_teoria" class="frdx" onClick="SCHEDA.selElenco(\'teoria\');">'+TXT("Approfondimenti")+'</div>';
		contElenco += '<div id="lista_teoria"></div>';
		
		contPulsanti += '<span id="quitSet" onClick="chiudiSet();">'+TXT("EsciDa")+' AuriculoMap</span>';
		
		//contPulsanti += '<span id="tueLicenzeMappa" class="tueLicenze"><span onClick="MENU.visLicenze();">'+TXT("TueLicenze")+'</span></span>';
		
		let contBtns = 	'<div id="p_contrasto" class="p_noTxt" onClick="SET.swContrastMethod();"></div>' +
						'<div id="p_lms" class="p_noTxt" onClick="SET.swLM();" title="'+htmlEntities(TXT("MostraLM"))+'"></div>';
		
		let contIcona = '<div id="p_set" onClick="SCHEDA.apriElenco(\'set\',true);"><svg viewBox="0 0 12 48"><polygon points="5,24 12,13 12,35"></polygon></svg><i>'+htmlEntities(TXT("AuriculoMap"))+'</i></div>';;
		
		let preElenco = SCHEDA.elencoSel;
		SCHEDA.caricaElenco(globals.set.nome,contElenco);
		SCHEDA.caricaPulsanti(contPulsanti);
		SCHEDA.caricaBtns(contBtns,contIcona);
		SCHEDA.swPulsanti(true);
		
		if(preElenco)SCHEDA.selElenco(preElenco);
		
		// pallini di evidenza
		let geoPoint =  new THREE.SphereGeometry( 0.11, 16, 16 );
		this.eviPoint =  new THREE.Mesh( geoPoint, this.MAT.pointSel2.clone() );
		this.eviPoint.name='Selected point 1';
		this.eviPoint.userData.categoria='';
		SETS.add( this.eviPoint );
		manichino.add( SETS );
		
		if(MODELLO.flip)SETS.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
		
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
		Object.assign(SET, MODULO_PROCEDURE_COMMUNITY);
		
		// svuoto la memoria
		MODULO_PATOLOGIE = null;
		MODULO_PUNTI = null;
		MODULO_PUNTO = null;
		MODULO_TEORIA = null;
		MODULO_PROCEDURE = null;
		MODULO_PROCEDURE_COMMUNITY = null;
		
		
		
		centro();
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
					SCHEDA.classeAperta != 'scheda_B' ){
						if(!smartMenu)SCHEDA.apriElenco('set');
				}else{
					SCHEDA.apriElenco('base');
					PAZIENTI.caricaDettagliSet();
				}
				
			}else{
				//if(!SET.ptSel && !smart)MenuGUIDA.visFumetto("guida_set_mini",false,true);
				SCHEDA.chiudiElenco();
				MENU.chiudiMenu();
			}
		}
		/* if(!globals.modello.cartella){
			GUIDA.visFumetto("guida_generica");
		} */
		postApreSet = false;
		if(scene.getObjectByName('pins_aree') && areasView){
			scene.getObjectByName('pins_aree').visible = false;
		}
		if(__(localStorage.risTest))SET.risTest = JSON.parse(localStorage.risTest);

		if(smartMenu)overInterfaccia=true;
		SET.chiudiPunto(false,true); // riapre il punto se è aperto
		CUSTOMS._init();
		SET.verSistema();
		
		/*
		Decommentare per salvare in localSorage.POS la posizione del manichino
		Per settare le rotazioni automatiche sui un punto premere il pulsante "q"
		*/
		//SET.iniPos();
		
	},
	
	iniPos: function(){
		SET.POS = JSON.parse(__(localStorage.POS,'{}'));
		for(let e in SET.POS){
			//SET.nasELS(e);
		}
		document.addEventListener("keyup", SET.keyUpPos, false );
	},
	keyUpPos: function(event){
		if(event.keyCode==81){
			normalizeRotation();
			let el = {x: manichinoCont.rotation.x, y: manichinoCont.rotation.y };
			if(SET.ptSel){
				let name = SET.ptSel.name.substr(2,3);
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
		let make = true;
		if(manichinoCaricato && !raycastDisable && !controlsM._ZPR && !controlsM._premuto){
			camera.updateMatrixWorld();
			raycaster.setFromCamera( mouse, camera );
			raycaster.params.Points.threshold = 20;
			
			let objOver='',
				ints = [];
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
								let intersects = raycaster.intersectObjects( SETS.children[i].children[ii].children );
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
						let intersects = raycaster.intersectObject( ANATOMIA.children[i] );
						if ( intersects.length > 0 ){
							for(l in intersects)ints.push(intersects[l]);
						}
						if(ANATOMIA.children[i].type=='Group'){
							for(let g in ANATOMIA.children[i].children){
								let intersects = raycaster.intersectObject( ANATOMIA.children[i].children[g] );
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
				let near = ints[0];
				for(l in ints){
					if(ints[l].distance<near.distance)near=ints[l];
				}
				if(near.object.userData.raycastable!=true)objOver='';
				else objOver=near.object;
			}
			/* let n1 = '',
				n2 = ''; */
			SET.desIntersected(objOver);
			if(objOver){
				this.INTERSECTED = objOver;
				if(this.INTERSECTED.userData.raycastable){
					let name=this.INTERSECTED.name;
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
				let op=1.8-this.pulse;
				
				SET.setPulsePt( this.ptSel, this.pulse, op );
				
				make=true;
			}
		}
		
		if(SET.lmVis){
			// mostro/nascondo i landmarks
			let nascosto = (manichinoCont.rotation.x>1.5 || 
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
		let phs = ["","2","3"];
		for(let ph in phs){
			let els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(let e in els){
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
			let name=this.INTERSECTED.name;
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
		if(MENU.modelExclusive())return;
		let btn=0;
		if(!touchable)btn=e.button;
		if(!btn && !raycastDisable && ((controlsM.xIni==controlsM.xEnd && controlsM.yIni==controlsM.yEnd) || touchable)){
			if(this.INTERSECTED){
				if(!touchable && this.INTERSECTED.userData.type == 'point'){
					controlsM._inMovimento=true;
					controlsM._ZPR=true;
					controlsM._MM=false;
				}
				if(this.INTERSECTED.userData.raycastable){
					let name=this.INTERSECTED.name;
					if(name.substr(0,1)=='_')name = name.substr(1,name.length-1);
					let ritorno = '';
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
		let PT=scene.getObjectByName( PT_name ),
			mat;
		if(typeof(PT)=='undefined')PT = scene.getObjectByName( PT_name.replace("PT","AR") );
		let type = (PT.userData.type == 'point')?"punti":"aree";
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
			mat = SET.MAT["pointBase"+system];
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			SET.setPulsePt( this.ptSel, 1, 1, mat );
			if(document.getElementById("ts_"+this.ptSel.name.substr(2,3)))document.getElementById("ts_"+this.ptSel.name.substr(2,3)).classList.remove("selElPt");
			SET.chiudiPunto(true);
		}
		
		this.ptSel=PT;
		
		if(document.getElementById("ts_"+name))document.getElementById("ts_"+name).classList.add("selElPt");
		
		let PT_name_first= null,
			AR_name_first= null;
		mat = this.MAT.pointSel;
		if(PT.userData.nota)mat = this.MAT.pointSelNote;
		let phs = ["","2","3"];
		for(let ph in phs){
			let els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(let e in els){
				if(els[e].name.indexOf("PT"+name)==0){
					els[e].visible = true;
					els[e].material=mat;
					if(!PT_name_first && els[e].userData.PH == SET.phase){
						PT_name_first = "PT"+name;
						this.ptSel = els[e];
					}
				}
			}
			els = scene.getObjectByName("LNs"+phs[ph]).children;
			for(let e in els){
				if(els[e].name.indexOf("AG"+name)==0){
					els[e].visible=true;
				}
			}
			mat = this.MAT.areaSel;
			els = scene.getObjectByName("ARs"+phs[ph]).children;
			for(let e in els){
				if(els[e].name.indexOf("AR"+name)==0){
					els[e].visible = true;
					els[e].material=mat;
					if(els[e].userData.PH == SET.phase)AR_name_first = "AR"+name;
				}
			}
		}
		
		let elPin = this.ptSel;
		if(el)elPin = el;
		
		if(!PT.parent.visible){
			if(PT_name_first)PT = scene.getObjectByName(PT_name_first); 
			if(AR_name_first)PT = scene.getObjectByName(AR_name_first); 
		}
		
		let x2 = 0,
			y2 = 0,
			z2 = 0,
			vector = null;
		if(PT.userData.type == 'area'){
			elPin = scene.getObjectByName( "AR"+name );
			let center = getCenterPoint(elPin);
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
			vector = elPin.geometry.vertices[0].clone();
			vector.applyMatrix4( elPin.matrixWorld );
		}
		panEndZero = { x: x2, y: y2, z: z2 };
		
		if(SCHEDA.aggancio.tipo=='libera' && el){
			panEnd = { x: vector.x, y: vector.y, z: vector.z };
		}else panEnd = { x: 0, y: 0, z: 0 };
		
		
		
		if(!el){
			// posiziono
			if(GEOMETRIE.posizioni[name] && !SET.phase){
				let pos = GEOMETRIE.posizioni[name];

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
		let mat;
		if(this.ptSel.userData.type == 'point'){
			this.eviPoint.material.visible = false;
			this.pulse=0;
			mat = cloneMAT(SET.MAT["pointBase"+this.ptSel.userData.system]);
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			this.ptSel.material=mat;
			this.ptSel.material.opacity=1;
			
			SET.delEviPalls(this.ptSel.name,'Select');
			SET.delEviPalls("_"+this.ptSel.name,'Over');
		}
		exPt = SET.ptSel;
			
		// coloro tutti gli altri punti
		mat = cloneMAT(SET.MAT["pointBase"+this.ptSel.userData.system]);
		if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
		let phs = ["","2","3"];
		for(let ph in phs){
			let els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(let e in els){
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
			els = scene.getObjectByName("LNs"+phs[ph]).children;
			for(let e in els){
				if(els[e].name.indexOf("AG")==0){
					els[e].visible=false;
				}
			}
			els = scene.getObjectByName("ARs"+phs[ph]).children;
			for(let e in els){
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
		let vector,
			vector2,
			center;
		if(exPt.userData.type == 'area'){
			center = getCenterPoint(exPt);
			vector = new THREE.Vector3( ((MODELLO.flip) ? center.x*1 : 0-center.x*1), 0-center.y*1, 0-center.z*1 );
		}else{
			vector = exPt.geometry.vertices[0].clone();
		}
		vector.applyMatrix4( exPt.matrixWorld );
		manichino.position.set( 0, 0, 0 );
		render();
		exPt.updateMatrixWorld();
		if(exPt.userData.type == 'area'){
			center = getCenterPoint(exPt);
			vector2 = new THREE.Vector3( ((MODELLO.flip) ? center.x*1 : 0-center.x*1), 0-center.y*1, 0-center.z*1 );
		}else{
			vector2 = exPt.geometry.vertices[0].clone();
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
				//if(nascosta)SCHEDA.nascondiScheda();
				if(smartMenu)SCHEDA.apriElenco('set',true);
			},500);
		}
	},
	_applyLineMethod: function(){
		//
	},
	scriviPunto: function( siglaPunto, esteso=false, noRet=false, col ){
		
		let nomePunto = DB.set.punti[siglaPunto].NomePunto;
		let EL = null;
		if(scene.getObjectByName( "PT"+siglaPunto ))EL=scene.getObjectByName( "PT"+siglaPunto );
		if(scene.getObjectByName( "AR"+siglaPunto ))EL=scene.getObjectByName( "AR"+siglaPunto );
		
		let html = '<a class="pallinoPat';
		if(esteso)html += ' pallinoPatEsteso';
		if(col)html += ' noPall';
		if(__(EL.userData.locked,false))html+=' lockedItem';
		let ret = '';
		if(!noRet)ret = SET.chiudiPunto(true);
		html += '"';
		if(col)html+= ' style="border-left:6px solid #'+col+'"';
		html+= ' onClick="SET.apriPunto(\''+EL.name+'\',\''+ret+'\');"';
		if(noRet)html += '  onMouseOver="SET.overPunto(\''+EL.name+'\',true);"' +
						 '  onMouseOut="SET.overPunto(\''+EL.name+'\',false);"' +
						 '	id="ts_'+siglaPunto.replace('.','_')+'"';
		html += '>';
		let system = EL.userData.system;
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
		let ptP = SET.ptSel.name;
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
		if(!el || typeof(el)=='undefined')el = document.getElementById("scheda_testo");
		let html = el.innerHTML;
		SET.annullaEvidenziaPunto(true);
		let re = /selPunto\([^\)]+\)/ig;
		
		let result = html.match(re);
		for(let k in result){
			let pT=result[k].split("'"),
				siglaPunto = pT[1];
			
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
		let re = /data-tri="[^"]+"/ig;
		let result = html.match(re);
		for(let k in result){
			let pT=result[k].split('"');
			let gruppo = pT[1];
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
			let pp=elenco[k].split(".");
			if(scene.getObjectByName("_PT"+pp[0])){
				let mat = SET.MAT.pointEvi
				scene.getObjectByName("_PT"+pp[0]).userData.val = '';
				if(pp[1]=='D'){
					mat = SET.MAT.pointDolore;
					scene.getObjectByName("_PT"+pp[0]).userData.val = 'D';
				}
				if(scene.getObjectByName("_PT"+pp[0])){
					scene.getObjectByName("_PT"+pp[0]).material=mat;
					siglaPunto = elenco[k].split(".")[0];
					SET.puntiEvidenziati.push(siglaPunto);
				}
			}
			if(scene.getObjectByName("AR"+pp[0])){
				let mat = SET.MAT.areaEvi
				scene.getObjectByName("AR"+pp[0]).userData.val = '';
				if(pp[1]=='D'){
					mat = SET.MAT.areaDolore;
					scene.getObjectByName("AR"+pp[0]).userData.val = 'D';
				}
				if(scene.getObjectByName("AR"+pp[0])){
					scene.getObjectByName("AR"+pp[0]).material=mat;
					siglaPunto = elenco[k].split(".")[0];
					SET.puntiEvidenziati.push(siglaPunto);
				}
			}
		}
		SET.applicaEvidenziaPunto();
	},
	applicaEvidenziaPunto: function( anatomia, mappa, lm='' ){
		if(SET.puntiEvidenziati.length || anatomia){
			let phs = ["","2","3"];
			for(let ph in phs){
				let els = scene.getObjectByName("PTs"+phs[ph]).children;
				for(let e in els){
					let siglaPunto = els[e].name.replace("_","").substr(2,3);
					if(SET.puntiEvidenziati.indexOf(siglaPunto)>-1){
						let mat = (els[e].userData.val=='D') ? SET.MAT.pointDolore : SET.MAT.pointEvi;
						if(els[e].name.substr(0,1)=='_')els[e].material=mat;
						else els[e].material.opacity = 1;
						els[e].visible = true;
					}else{
						if(els[e].name.substr(0,1)!='_')els[e].material.opacity = 0.5;
					}
				}
				els = scene.getObjectByName("ARs"+phs[ph]).children;
				for(let e in els){
					let siglaPunto = els[e].name.substr(2,3);
					if(SET.puntiEvidenziati.indexOf(siglaPunto)>-1){
						let mat = (els[e].userData.val=='D') ? SET.MAT.areaDolore : SET.MAT.areaEvi;
						els[e].material=mat;
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
					"Vasi": localStorage.opVasi
				};
				MODELLO.op("Pelle",parseFloat(anatomia.Pelle));
				MODELLO.op("Ossa",parseFloat(anatomia.Ossa));
				MODELLO.op("Vasi",parseFloat(anatomia.Vasi));
				SET.puntiEvidenziati.push("999"); // evita l'illuminazione dei punti al passaggio del mouse
			}, 500, anatomia);
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
			let phs = ["","2","3"];
			for(let ph in phs){
				
				let els = scene.getObjectByName("PTs"+phs[ph]).children;
				for(let e in els){
					let siglaPunto = els[e].name.replace("_","").substr(2,3),
						vis = !__(DB.set.punti[siglaPunto].hidden,false) && __(els[e].userData.hidePunto,'0')=='0';
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
				els = scene.getObjectByName("ARs"+phs[ph]).children;
				for(let e in els){
					let siglaPunto = els[e].name.substr(2,3);
					let vis = !__(DB.set.punti[siglaPunto].hidden,false) && __(els[e].userData.hidePunto,'0')=='0';
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
				MODELLO.op("Vasi",SET.forzaDissolve.Vasi);
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
			let els = document.getElementById("scheda_testo").getElementsByClassName("pallinoPat");
			for(let e=0;e<els.length;e++){
				let onclick = els[e].onclick.toString();
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
		let el = document.getElementById("pt_"+p),
			siglaPunto = el.value;
		SET.overPunto("PT"+siglaPunto,false);
		let elenco = [],
			els = document.getElementById(id).getElementsByClassName("dettPunto"),
			tot = els.length;
		for(let e=0;e<tot;e++){
			let sl = els[e].getElementsByTagName("select");
			elenco.push(sl[0].value);
		}
		SET.evidenziaPuntoMod(elenco);
		SET.aggiornaDettaglio(el);
	},
	coloraPunti: function( PT_name, tipo ){
		if(touchable)return;
		let els = scene.getObjectByName("PTs"+SET.phase).children;
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
		els = scene.getObjectByName("ARs"+SET.phase).children;
		for(let e in els){
			if(	els[e].name.indexOf("AR"+PT_name) == 0 && 
				els[e].material.name.indexOf("SEL") == -1 && 
				SET.note.indexOf(PT_name) == -1  ){
				system = els[e].userData.system;
				if(els[e].material.name.indexOf('EVI')>-1){
					system = 'Evi';
					if(els[e].userData.val=='D')system='Dolore';
					if(tipo=='Base')tipo='';
				}
				if(SET.MAT["area"+tipo+system].name != els[e].material.name){
					els[e].material = cloneMAT(SET.MAT["area"+tipo+system]);
					/* if(SET.puntiEvidenziati.length){
						if(SET.puntiEvidenziati.indexOf(PT_name)>-1)els[e].material.opacity = 0.7;
						else els[e].material.opacity = 0.2;
					} */
					if(SET.puntiEvidenziati.indexOf(PT_name)==-1 && tipo!='Over'){
						els[e].material.opacity = 0.2;
					}
				}
			}
		}
	},
	overPunto: function( PT_name, over ){
		let name = PT_name.split(".")[0];
		if(name.substr(0,1)=='_')name = name.substr(3,name.length-3);
		else name = name.substr(2,name.length-2);
		if(touchable || !name)return;
		
		// verifico le autorizzazioni
		if(!SET.verFreePunti(name)){
			return;
		}
		// --------------------------
		
		let phs = ["","2","3"];
		for(let ph in phs){
			let els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(let e in els){
				if(els[e].name.indexOf("_PT"+name)==0 && els[e].material.name.indexOf("SEL")==-1){
					if(over)SET.addEviPalls("_PT"+name,'Over');
					else SET.delEviPalls("_PT"+name,'Over');
				}
			}
			let tipo = (over) ? "Over" : "";
			els = scene.getObjectByName("ARs"+phs[ph]).children;
			for(let e in els){
				if(els[e].name.indexOf("AR"+name)==0 && els[e].material.name.indexOf("SEL")==-1){
					system = els[e].userData.system;
					if(els[e].material.name.indexOf('EVI')>-1){
						system = 'Evi';
						if(els[e].userData.val=='D')system='Dolore';
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
		let nScheda = '';
		if(SCHEDA.scheda2Aperta)nScheda='2';
		let regexp = /\[\.[^\]]+\.\]/ig,
			pts = html.match(regexp);
		for(let p in pts){
			let siglaPunto = pts[p].split(".")[1],
				NomePunto = DB.set.punti[siglaPunto].NomePunto,
				EL = null;
			if(scene.getObjectByName( "PT"+siglaPunto ))EL=scene.getObjectByName( "PT"+siglaPunto );
			if(scene.getObjectByName( "AR"+siglaPunto ))EL=scene.getObjectByName( "AR"+siglaPunto );
			let system = EL.userData.system;
			if(!system)system = 'INT';
			let pallClass = 'pallinoPat',
				addClick = '';
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
		let mzs = PAZIENTI.mezziSet.A,
			HTML_imp = 
			'<div><i>'+htmlEntities(TXT("MezzoDefault"))+':</i></div><div id="tt_mezzival2">';
		for(let m in mzs){
			HTML_imp += '<span style="background-image:url(img/mezzo_'+mzs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaGZ(\''+mzs[m]+'\',false);"' +
					'	   data-mezzo="'+mzs[m]+'"';
			if(!__(localStorage["mezzoDefault"+globals.set.cartella]) && m==0)HTML_imp += ' class="mzSel"';
			if(localStorage["mezzoDefault"+globals.set.cartella]==mzs[m])HTML_imp += ' class="mzSel"';
			HTML_imp += '	   title="'+htmlEntities(PAZIENTI.mezzi[mzs[m]])+'">' +
			(smartMenu ? htmlEntities(PAZIENTI.mezzi[mzs[m]]).toUpperCase() : '') +
			'</span>';
		}
		HTML_imp += 
			'</div>' +
			'<div style="margin-top:30px;margin-bottom:30px;">' +
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
		let els = scene.getObjectByName("PTs"+SET.phase).children;
		for(let e in els){
			if(els[e].name.indexOf(PT_name)==0){
				let name = ' point: '+els[e].name+"_"+e;
				if(!scene.getObjectByName(tipo+name)){
					let geoPoint =  new THREE.SphereGeometry( 0.11, 16, 16 ),
						eviPoint;
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
		let els = SETS.children;
		for(let e=els.length-1;e>=0;e--){
			if(els[e].name.indexOf(tipo+' point: '+PT_name)==0){
				SETS.remove( els[e] );
			}
		}
	},
	delAllEviPalls: function(tipo){_
		let els = SETS.children;
		for(let e=els.length-1;e>=0;e--){
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
		let lms = scene.getObjectByName("LMs");
		for(let l in lms.children){
			let leg = document.createElement('div'),
				l2 = l.toString();
			if(l2.length==1)l2="0"+l2;
			leg.id = 'LM'+l2;
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
		let lms = scene.getObjectByName("LMs");
		for(let l in lms.children){
			let l2 = l.toString();
			if(l2.length==1)l2="0"+l2;
			document.getElementById("legende").removeChild(document.getElementById('LM'+l2));
		}
		document.getElementById("legende").classList.remove("noLms");
		lms.visible = false;
		SET.lmVis = false;
	},
	verSistema: function(){
		document.getElementById("noLicenze").classList.toggle("vis",LOGIN.logedin() && DB.login.data.auths.indexOf("auricologia")==-1);
		document.getElementById("demoVersion").classList.toggle("vis",!LOGIN.logedin());
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
		let opposite = (MODELLO.flip) ? 'DX' : 'SX',
			phs = ["","2","3"];
		for(let ph in phs){
			let els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(let e in els){
				let name = els[e].name.replace("_","").substr(2,3);
				if(DB.set.punti[name].hidden || __(els[e].userData.hidePunto,'0')=='1')els[e].visible = false;
				else if(els[e].userData.lato == opposite)els[e].visible = false;
				else if(!els[e].visible && !__(els[e].userData.locked,false))els[e].visible = true;
			}
			els = scene.getObjectByName("ARs"+phs[ph]).children;
			for(let e in els){
				let name = els[e].name.replace("_","").substr(2,3);
				if(DB.set.punti[name].hidden || __(els[e].userData.hidePunto,'0')=='1')els[e].visible = false;
				else if(els[e].userData.lato == opposite)els[e].visible = false;
				else if(!els[e].visible && !__(els[e].userData.locked,false))els[e].visible = true;
			}
			els = scene.getObjectByName("LNs"+phs[ph]).children;
			for(let e in els){
				let name = els[e].name.substr(2,3);
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
	_gestVisSmart: function( add ){
		if(smartMenu){
			document.getElementById("filtriSmart_ico").classList.toggle("nas",add);
			document.getElementById("filtriSmart_cont").classList.toggle("nas",add);
		}
	},
	filtraSet: function( togliLoader=false ){
		let vis = true;
		if(	DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())vis = false;
		for(let c in SETS.children[0].children){
			let gruppo = SETS.children[0].children[c].children;
			for(let g in gruppo){
				let name = gruppo[g].name.replace("_","");
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