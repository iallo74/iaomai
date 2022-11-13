
SET = {
	
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
	tsuboEvidenziati: [],
	pMod: '',
	pointEvi: '',
	geometryPallino: null,
	geometryPallinoTrasp: null,
	tmZone: null,
	groupSel: '',
	maskAtt: '',
	
	// FUNZIONI
	_init: function(){
		if(!__(localStorage.imgMappa))localStorage.imgMappa = 'BN';
		
		SETS = new THREE.Group();
		SETS.name = "SETS";
		
		/*var facce = 6;
		var facceTrasp = 8;*/
		var facce = 10;
		var facceTrasp = 14;
		if(isTablet){
			facce = 8;
			facceTrasp = 12;
		}
		var modelloAperto = globals.modello.cartella;
		if(!modelloAperto)modelloAperto='orecchio';
		this.geometryPallino = new THREE.SphereGeometry( 0.04, facce, facce );
		this.geometryPallinoTrasp = new THREE.SphereGeometry( 0.08, facceTrasp, facceTrasp );
			
		
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
		
		// linee di conterno
		var LNS=GEOMETRIE.linee;
		if(LNS){
			if(LNS.length){
				var LN = new THREE.Group();
				LN.name="LNs";
				for(l in LNS){ // aggiungo le guide
					var loader = new THREE.ObjectLoader();
					var mesh =  loader.parse(JSON.parse(LZString.decompressFromBase64(LNS[l].obj)));
					
					var name = mesh.name.split(" ")[0];
					if(mesh.name.indexOf("(GRUPPO)")>-1){
						mesh.visible = false;
						mesh.material = this.MAT.lineGroup;
						mesh.userData.gruppo = true;
					}else{
						mesh.material = this.MAT.line;
					}
					mesh.name = name;
					LN.add( mesh );
					
				}
				sysMesh.add( LN );
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
				
				var system = "";
				if(mesh.name.indexOf("EUR")>-1)system = "EUR";
				if(mesh.name.indexOf("CIN")>-1)system = "CIN";
				var lato = "";
				if(mesh.name.indexOf("SX")>-1)lato = "SX";
				if(mesh.name.indexOf("DX")>-1)lato = "DX";
				
				var FN = false;
				if(GEOMETRIE.gruppi.FN.punti.indexOf(name.substr(2,3))>-1)FN = true;
				var master = (GEOMETRIE.gruppi.MASTER.punti.indexOf(name.substr(2,3))>-1);
				
				var pF = mesh.name.split(" ");
				var freq = pF[pF.length-1];
				var mat = 'this.MAT.areaBase'+system;
			
				mesh.material = cloneMAT(eval(mat));
				mesh.userData.area = area;
				mesh.userData.system = system;
				mesh.userData.freq = freq;
				mesh.userData.master = master;
				mesh.userData.FN = FN;
				mesh.userData.lato = lato;
				mesh.userData.raycastable = true;
				mesh.name = name;
				mesh.userData.type = 'area';
				AR.add( mesh );
			}
			sysMesh.add( AR );
		}
		
		// pins delle aree
		var PN = new THREE.Group();
		PN.name="PNs";
		var n=-1;
		var PNS=GEOMETRIE.pins;
		for(p in PNS){
			if(PNS[p]!=''){
				var x=PNS[p].array[0];
				var y=PNS[p].array[1];
				var z=PNS[p].array[2];
					
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
		var PT = new THREE.Group();
		PT.name="PTs";
		PT.visible = true;
		// carico i punti parametrizzati
		var n=-1;
		var PTS=GEOMETRIE.punti;
		for(p in PTS){
			if(PTS[p]!=''){
				var x=PTS[p].array[0];
				var y=PTS[p].array[1];
				var z=PTS[p].array[2];
				var name = PTS[p].nome.split("(")[0].trim();
				
				var system = "";
				if(PTS[p].nome.indexOf("EUR")>-1)system = "EUR";
				if(PTS[p].nome.indexOf("CIN")>-1)system = "CIN";
				var lato = "";
				if(PTS[p].nome.indexOf("SX")>-1)lato = "SX";
				if(PTS[p].nome.indexOf("DX")>-1)lato = "DX";
				var pF = PTS[p].nome.split(" ");
				var freq = pF[pF.length-1];
				
				var FN = false;
				if(GEOMETRIE.gruppi.FN.punti.indexOf(name.substr(2,3))>-1)FN = true;
				var master = (GEOMETRIE.gruppi.MASTER.punti.indexOf(name.substr(2,3))>-1);
				
				
				// pallino colorato
				n++;
				/////var geometry = new THREE.SphereGeometry( 0.02, 6, 6 );
				var mat = 'this.MAT.pointBase'+system;
				
				this.P[n] = new THREE.Mesh( this.geometryPallino, eval(mat) );
				this.P[n].position.set(x,y,z);
				this.P[n].name=name;
				this.P[n].userData.type = 'point';
				this.P[n].userData.system = system;
				this.P[n].userData.freq = freq;
				this.P[n].userData.master = master;
				this.P[n].userData.FN = FN;
				this.P[n].userData.lato = lato;
				PT.add( this.P[n] );
					
				// pallino trasparente
				n++;
				////var geometryTrasp = new THREE.SphereGeometry( 0.07, 8, 8 );
				this.P[n] = new THREE.Mesh( this.geometryPallinoTrasp, this.MAT.pointTrasp ); 
				this.P[n].position.set(x,y,z);
				this.P[n].name='_'+name;
				this.P[n].userData.raycastable = true;
				this.P[n].userData.nota = false;
				this.P[n].userData.type = 'point';
				this.P[n].userData.system = system;
				this.P[n].userData.freq = freq;
				this.P[n].userData.master = master;
				this.P[n].userData.FN = FN;
				this.P[n].userData.lato = lato;
				PT.add( this.P[n] );
			}
		}
		sysMesh.add( PT );
		SETS.add( sysMesh );
		
		SET.MAT.mappaAree(true);
		
		var contPulsanti = 	'<span class="menuElenchi" onclick="MENU.visMM(\'btnCarMapMenu\');"></span>' +
							'<span id="btnCarMapMenu" class="btn_meridiani_shiatsu titolo_set">' +
							'<span>AuriculoMap</span>' +
							'<i class="elMenu" id="chiudiSet" onClick="chiudiSet();" title="'+htmlEntities(Lingua(TXT_ChiudiSet))+'"><span>' +
								htmlEntities(Lingua(TXT_ChiudiSet)) +
							'</span></i>' +
							/*'<i class="elMenu" id="impostazioniSet" onClick="MENU.visImpset();" title="'+htmlEntities(Lingua(TXT_ImpostazioniSet))+'"><span>' +
								htmlEntities(Lingua(TXT_ImpostazioniSet)) +
							'</span></i>' +*/
							'<i class="elMenu" id="help_set" onClick="GUIDA.visFumetto(\'guida_set\',true,true);">?</i></span>';
		var contElenco = '';
		contPulsanti += '<div id="pulsante_modello" onClick="cambiaModello(\'orecchio\');">Apri il modello 3D</div>';
		// punti
		contPulsanti += '<div id="pulsante_punti" class="frdx" onClick="SCHEDA.selElenco(\'punti\');">'+Lingua(TXT_Mappa)+'</div>';
		contElenco += '<div id="lista_punti"></div>';
		
		// patologie
		contPulsanti += '<div id="pulsante_patologie" class="frdx" onClick="SCHEDA.selElenco(\'patologie\');">'+Lingua(TXT_Patologie)+'</div>';
		contElenco += '<div id="lista_patologie"></div>';
		
		// procedure personalizzare
		var contProcedure = '';
		contPulsanti += '<div id="pulsante_procedure" class="frdx" onClick="SCHEDA.selElenco(\'procedure\');">'+Lingua(TXT_Procedure)+'</div>';
		contElenco += '<div id="lista_procedure"></div>';
		
		// teoria
		contPulsanti += '<div id="pulsante_teoria" class="frdx" onClick="SCHEDA.selElenco(\'teoria\');">'+Lingua(TXT_Approfondimenti)+'</div>';
		contElenco += '<div id="lista_teoria"></div>';
		
		contBtns = '<div id="p_contrasto" class="p_noTxt" onClick="SET.swContrastMethod();"></div>';
		
		contIcona = '<div id="p_set" onClick="SCHEDA.apriElenco(\'set\',true);"><svg viewBox="0 0 12 48"><polygon points="5,24 12,13 12,35"></polygon></svg><i>'+htmlEntities(Lingua(TXT_AuriculoMap))+'</i></div>';;
		
		var preElenco = SCHEDA.elencoSel;
		SCHEDA.caricaElenco(globals.set.nome,contElenco);
		SCHEDA.caricaPulsanti(contPulsanti);
		SCHEDA.caricaBtns(contBtns,contIcona);
		SCHEDA.swPulsanti(true);
		
		HTML_imp = ''; // IMPOSTAZIONI DEL SET
		document.getElementById("contImpset").innerHTML = HTML_imp;
		
		//SCHEDA.apriElenco();
		if(preElenco)SCHEDA.selElenco(preElenco);
		
		// pallini di evidenza
		var geoPoint =  new THREE.SphereGeometry( 0.11, 16, 16 );
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
		Object.assign(SET, MODULO_TSUBO);
		Object.assign(SET, MODULO_TEORIA);
		Object.assign(SET, MODULO_PROCEDURE);
		
		// svuoto la memoria
		MODULO_PATOLOGIE = null;
		MODULO_PUNTI = null;
		MODULO_TSUBO = null;
		MODULO_TEORIA = null;
		MODULO_PROCEDURE = null;
		
		manichinoCaricato = true;
		SET.caricaPunti();
		SET.caricaPatologie();
		SET.caricaApprofondimenti();
		if(DB.procedure)SET.car_procedure(-1,1);
		
		SET.filtraSet();
		
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
				GUIDA.visFumetto("guida_set_mini",false,true);
				SCHEDA.chiudiElenco();
				MENU.chiudiMenu();
			}
		}
		postApreSet = false;
		
		
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
		//console.log(manichinoCaricato && !raycastDisable && !controlsM._ZPR && controlsM._MM)
		if(manichinoCaricato && !raycastDisable && !controlsM._ZPR && !controlsM._premuto){//} && controlsM._MM){ // roll-over sui punti
			camera.updateMatrixWorld();
			raycaster.setFromCamera( mouse, camera );
			raycaster.params.Points.threshold = 20;
			
			var objOver='';
			var ints = [];
			if(SETS){
				for(i in SETS.children){
					if(	SETS.children[i].visible &&
						SETS.children[i].name.length==3 ){
						for(ii in SETS.children[i].children){
							if(	SETS.children[i].children[ii].visible &&
								SETS.children[i].children[ii].isGroup &&
								SETS.children[i].children[ii].name.substr(0,2)!='LN' &&
								SETS.children[i].children[ii].name.substr(0,2)!='GD'){
								var intersects = raycaster.intersectObjects( SETS.children[i].children[ii].children );
								if ( intersects.length > 0 ) { // roll-over
									for(l in intersects)ints.push(intersects[l]);
									objOver=intersects[ 0 ].object;
								}
							}
						}
					}
				}
			}
			if(ANATOMIA){
				for(i in ANATOMIA.children){
					if(	ANATOMIA.children[i].name.toLowerCase()=='pelle' ||
						ANATOMIA.children[i].name.toLowerCase()=='ossa' ||
						ANATOMIA.children[i].name.toLowerCase()=='visceri' ){
						var intersects = raycaster.intersectObject( ANATOMIA.children[i] );
						if ( intersects.length > 0 ){
							for(l in intersects)ints.push(intersects[l]);
						}
						if(ANATOMIA.children[i].type=='Group'){
							for(g in ANATOMIA.children[i].children){
								var intersects = raycaster.intersectObject( ANATOMIA.children[i].children[g] );
								if ( intersects.length > 0 ){
									for(l in intersects)ints.push(intersects[l]);
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
			SET.desIntersected();
			if(objOver){
				this.INTERSECTED = objOver;
				if(this.INTERSECTED.userData.raycastable){
					var name=this.INTERSECTED.name;
					if(name.substr(0,1)=='_')name = name.substr(3,name.length-3);
					else name = name.substr(2,name.length-2);
					visToolTip(DB.set.punti[name].NomeTsubo);
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
		return make;
	},
	setPulsePt: function( pt, pulse, op, mat ){
		if(typeof(mat)=='undefined')var mat = '';
		var els = scene.getObjectByName("PTs").children;
		for(e in els){
			if(els[e].name.indexOf(pt.name)==0){
				els[e].scale.set(pulse,pulse,pulse);
				if(mat)els[e].material=mat;
			}
		}
		SET.MAT.pointSel.setValues( { opacity: op } );
	},
	desIntersected: function(){
		if(this.INTERSECTED){
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
		//console.log("!"+btn+" && !"+raycastDisable+" && (("+controlsM.xIni+"=="+controlsM.xEnd+" && "+controlsM.yIni+"=="+controlsM.yEnd+") || "+touchable+")");
		if(!btn && !raycastDisable && ((controlsM.xIni==controlsM.xEnd && controlsM.yIni==controlsM.yEnd) || touchable)){
			//console.log(this.INTERSECTED)
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
					if(SCHEDA.classeAperta && SCHEDA.classeAperta!='tab_tsubo')ritorno = 'SET.chiudiTsubo(true)';
					SET.apriTsubo(name,ritorno,this.INTERSECTED);
				}
			}
		}
		controlsM.xIni=-1;
		controlsM.xEnd=-1;
		controlsM.yIni=-1;
		controlsM.yEnd=-1;
	},
	
	
	apriTsubo: function( PT_name, ritorno, el ){
		var PT=scene.getObjectByName( PT_name );
		var type = (PT.userData.type == 'point')?"punti":"aree";
		name = PT_name.substr(PT_name.length-3,3);
		
		if(typeof(ritorno) == 'undefined')var ritorno = '';

		if(this.ptSel){
			if(name == this.ptSel.name.substr(2,3))return;
			system = this.ptSel.userData.system;
			var mat = eval("SET.MAT.pointBase"+system);
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			SET.setPulsePt( this.ptSel, 1, 1, mat );
			document.getElementById("pt_"+this.ptSel.name.substr(2,3)).classList.remove("selElPt");
			SET.chiudiTsubo(true);
		}
		
		
		this.ptSel=PT;
		
		document.getElementById("pt_"+name).classList.add("selElPt");
		
		var PT_name_first= null;
		var mat = this.MAT.pointSel;
		if(PT.userData.nota)mat = this.MAT.pointSelNote;
		var els = scene.getObjectByName("PTs").children;
		for(e in els){
			if(els[e].name.indexOf("PT"+name)==0){
				els[e].material=mat;
				if(!PT_name_first){
					PT_name_first = "PT"+name;
					this.ptSel = els[e];
				}
			}
		}
		var mat = this.MAT.areaSel;
		var els = scene.getObjectByName("ARs").children;
		for(e in els){
			if(els[e].name.indexOf("AR"+name)==0)els[e].material=mat;
		}
		
		var elPin = this.ptSel;
		if(typeof(el)!='undefined')elPin = el;
		
		
		if(PT.userData.type == 'area'){
			elPin = scene.getObjectByName( "AR"+name );
			var center = getCenterPoint(elPin);
			this.diffX = center.x*1;
			this.diffY = center.y*1;
			panEndZero = { x: ((MODELLO.flip) ? center.x*1 : 0-center.x*1), y: 0-center.y*1, z: 0-center.z*1 };
		}else{
			this.diffX = elPin.position.x*1;
			this.diffY = elPin.position.y*1;
			panEndZero = { x: ((MODELLO.flip) ? elPin.position.x : 0-elPin.position.x), y: 0-elPin.position.y, z: 0-elPin.position.z };
		}
		panEnd = { x: 0, y: 0, z: 0 };
		// posiziono
		if(GEOMETRIE.posizioni[name]){
			var pos = GEOMETRIE.posizioni[name];
			normalizeRotation();
			rotateEnd = { x:pos.x, y: ((MODELLO.flip) ? 0-pos.y : pos.y), z:0 };
		}
		if(smothingView){
			if(manichinoCont.position.z!=15)zoomEnd = 15;
			normalizeRotation();
		}
		if(PT_name_first){
			SET.addEviPalls(PT_name_first,'Select');
			this.pulse = 1;
		}
		
		
		SET.caricaTsubo( name, ritorno );
	},
	chiudiTsubo: function( nonChiudereScheda ){
		if(typeof(nonChiudereScheda)=='undefined')nonChiudereScheda=false;
		if(!this.ptSel)return;
		document.getElementById("scheda").classList.remove("tab_tsubo");
		document.getElementById("scheda").classList.remove("schForm");
		document.getElementById("pt_"+this.ptSel.name.substr(2,3)).classList.remove("selElPt");
		if(!globals.modello.cartella)return;
		if(!nonChiudereScheda){
			endChangeDetection();
			SCHEDA.formModificato = false;
		}
		if(this.ptSel.userData.type == 'point'){
			this.eviPoint.material.visible = false;
			this.pulse=0;
			var mat = eval("SET.MAT.pointBase"+this.ptSel.userData.system);
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			this.ptSel.material=mat;
			this.ptSel.material.opacity=1;
			
			SET.delEviPalls(this.ptSel.name,'Select');
			SET.delEviPalls("_"+this.ptSel.name,'Over');
		}
		exPt = SET.ptSel;
			
		// coloro tutti gli altri punti
		var mat = eval("SET.MAT.pointBase"+this.ptSel.userData.system);
		if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
		var els = scene.getObjectByName("PTs").children;
		for(e in els){
			if(els[e].name.indexOf("PT"+this.ptSel.name.substr(2,3))==0){
				els[e].material=mat;
				els[e].material.opacity=1;
				els[e].scale.set(1,1,1);
			}
		}
		var els = scene.getObjectByName("ARs").children;
		for(e in els){
			if(els[e].name.indexOf("AR"+this.ptSel.name.substr(2,3))==0){
				system = els[e].userData.system;
				if(SET.tsuboEvidenziati.indexOf(this.ptSel.name.substr(2,3))>-1){
					system = 'Evi';
					tipo='';
				}else tipo='Base';
				els[e].material = eval("SET.MAT.area"+tipo+system);
			}
		}
		this.ptSel=null;
		if(SCHEDA.scheda2Aperta){
			nonChiudereScheda=true;
			document.getElementById("scheda_ritorno").click();
		}
		if(!nonChiudereScheda){
			SCHEDA.scaricaScheda(); 
		}
		
		if(exPt.geometry.type == "SphereGeometry"){
			// ricentro il manichino
			exPt.updateMatrixWorld();
			var vector = exPt.geometry.vertices[i].clone();
			vector.applyMatrix4( exPt.matrixWorld );
			manichino.position.set( 0, 0, 0 );
			
			render();
			exPt.updateMatrixWorld();
			var vector2 = exPt.geometry.vertices[i].clone();
			vector2.applyMatrix4( exPt.matrixWorld );
			manichinoCont.position.x = manichinoCont.position.x - (vector2.x-vector.x);
			manichinoCont.position.y = manichinoCont.position.y - (vector2.y-vector.y);
			manichinoCont.position.z = manichinoCont.position.z - (vector2.z-vector.z);
		}
		controlsM._ZPR = false;
		render();
		SET.overTsubo( exPt.name, false );
	},
	_applyLineMethod: function(){
		//
	},
	scriviTsubo: function( siglaTsubo, esteso, noRet, col ){
		if(typeof(esteso)=='undefined')var esteso = false;
		if(typeof(noRet)=='undefined')var noRet = false;
		if(typeof(sigla)=='undefined')var sigla = false;
		
		var nomeTsubo = DB.set.punti[siglaTsubo].NomeTsubo;
		var EL = null;
		if(scene.getObjectByName( "PT"+siglaTsubo ))EL=scene.getObjectByName( "PT"+siglaTsubo );
		if(scene.getObjectByName( "AR"+siglaTsubo ))EL=scene.getObjectByName( "AR"+siglaTsubo );
		
		var html = '<a class="pallinoPat';
		if(esteso)html += ' pallinoPatEsteso';
		if(col)html += ' noPall';
		var ret = '';
		if(!noRet)ret = SET.chiudiTsubo(true);
		html += '"';
		if(col)html+= ' style="border-left:6px solid #'+col+'"';
		html+= ' onClick="SET.apriTsubo(\''+EL.name+'\',\''+ret+'\');"';
		if(noRet)html += '  onMouseOver="SET.overTsubo(\''+EL.name+'\',true);"' +
						 '  onMouseOut="SET.overTsubo(\''+EL.name+'\',false);"' +
						 '	id="pt_'+siglaTsubo.replace('.','_')+'"';
		html += '>';
		var system = EL.userData.system;
		if(!system)system = 'INT';
		html += '<span class="p'+system+'"></span>';
		if(esteso)html+='<i>'+nomeTsubo+'</i>';
		html+='</a>';
		return html;
	},
	selTsubo: function( PT ){
		// verifico le autorizzazioni
		if(SET.PUNTI_free.indexOf(PT)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(Lingua(TXT_MsgContSoloPay));
			return;
		}
		// --------------------------
		SET.apriTsubo("PT"+PT,'SET.chiudiTsubo(true);');
	},
	selArea: function( PT ){
		SET.selTsubo(PT);
	},
	selTsuboMod: function( PT, p ){
		if(!PT)return;
		SET.pMod = PT;
		PT = document.getElementById("formMod")["pt_"+p].value;
		SET.selTsubo( PT );
	},
	setTsuboFrm: function(){
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
	evidenziaTsubo: function( html ){
		SET.annullaEvidenziaTsubo();
		var re = /selTsubo\([^\)]+\)/ig;
		var result = html.match(re);
		for(k in result){
			var pT=result[k].split("'");
			var siglaTsubo = pT[1];
			var ptCc = scene.getObjectByName("_PT"+siglaTsubo);
			if(typeof(ptCc)!='undefined'){
				ptCc.material = SET.MAT.pointEvi;
			}
			var arCc = scene.getObjectByName("AR"+siglaTsubo);
			if(typeof(arCc)!='undefined'){
				arCc.material = SET.MAT.areaEvi;
			}
			SET.tsuboEvidenziati.push(siglaTsubo);
		}
		SET.settaOverTsubo();
	},
	evidenziaTsuboMod: function( elenco ){
		SET.annullaEvidenziaTsubo();
		for(k in elenco){
			siglaTsubo = elenco[k];
			var ptCc = scene.getObjectByName("_PT"+siglaTsubo);
			if(typeof(ptCc)!='undefined'){
				ptCc.material = SET.MAT.pointEvi;
			}
			var arCc = scene.getObjectByName("AR"+siglaTsubo);
			if(typeof(arCc)!='undefined'){
				arCc.material = SET.MAT.areaEvi;
			}
			SET.tsuboEvidenziati.push(siglaTsubo);
		}
	},
	annullaEvidenziaTsubo: function(){
		if(SET.tsuboEvidenziati.length){
			for(k in SET.tsuboEvidenziati){
				var siglaTsubo=SET.tsuboEvidenziati[k];
				var ptCc = scene.getObjectByName("_PT"+siglaTsubo);
				if(typeof(ptCc)!='undefined'){
					ptCc.material = SET.MAT.pointTrasp;
				}
				var arCc = scene.getObjectByName("AR"+siglaTsubo);
				if(typeof(arCc)!='undefined'){
					arCc.material = SET.MAT.areaBase;
				}
			}
			SET.tsuboEvidenziati = [];
		}
	},
	settaOverTsubo: function(){
		if(!touchable){
			var els = document.getElementById("scheda_testo").getElementsByClassName("pallinoPat");
			for(e=0;e<els.length;e++){
				var onclick = els[e].onclick.toString();
				if(onclick.indexOf("SET.selTsubo('")>-1){
					els[e].dataset.siglaTsubo = onclick.split("SET.selTsubo('")[1].split("')")[0];
				}
				if(onclick.indexOf("SET.selArea('")>-1){
					els[e].dataset.siglaTsubo = onclick.split("SET.selArea('")[1].split("')")[0];
				}
				els[e].onmouseover = function(){
					SET.overTsubo("PT"+this.dataset.siglaTsubo,true);
				}
				els[e].onmouseout = function(){
					SET.overTsubo("PT"+this.dataset.siglaTsubo,false);
				}
			}
		}
	},
	ritOverTsubo: function( id, siglaTsubo ){
		if(!touchable){
			SET.overTsubo(siglaTsubo,false);
			var elenco = [];
			var els = document.getElementById(id).getElementsByClassName("dettPunto");
			var tot = els.length;
			for(e=0;e<tot;e++){
				var sl = els[e].getElementsByTagName("select");
				elenco.push(sl[0].value);
			}
			SET.evidenziaTsuboMod(elenco);
		}
	},
	coloraPunti: function( PT_name, tipo ){
		var els = scene.getObjectByName("PTs").children;
		for(e in els){
			if(	els[e].name.indexOf("PT"+PT_name) == 0 && 
				els[e].material.name.indexOf("SEL") == -1 && 
				SET.note.indexOf(PT_name) == -1 ){
				system = els[e].userData.system;
				els[e].material = eval("SET.MAT.point"+tipo+system);
			}
		}
		var els = scene.getObjectByName("ARs").children;
		for(e in els){
			if(	els[e].name.indexOf("AR"+PT_name) == 0 && 
				els[e].material.name.indexOf("SEL") == -1 && 
				SET.note.indexOf(PT_name) == -1  ){
				system = els[e].userData.system;
				if(els[e].material.name.indexOf('EVI')>-1){
					system = 'Evi';
					if(tipo=='Base')tipo='';
				}
				els[e].material = eval("SET.MAT.area"+tipo+system);
			}
		}
	},
	overTsubo: function( PT_name, over ){
		var name = PT_name;
		if(name.substr(0,1)=='_')name = name.substr(3,name.length-3);
		else name = name.substr(2,name.length-2);
		
		var els = scene.getObjectByName("PTs").children;
		for(e in els){
			if(els[e].name.indexOf("_PT"+name)==0 && els[e].material.name.indexOf("SEL")==-1){
				if(over)SET.addEviPalls("_PT"+name,'Over');
				else SET.delEviPalls("_PT"+name,'Over');
			}
		}
		var tipo = (over) ? "Over" : "";
		var els = scene.getObjectByName("ARs").children;
		for(e in els){
			if(els[e].name.indexOf("AR"+name)==0 && els[e].material.name.indexOf("SEL")==-1){
				system = els[e].userData.system;
				if(els[e].material.name.indexOf('EVI')>-1){
					system = 'Evi';
					tipo = (over) ? "Over" : "";
				}else{
					tipo = (over) ? "Over" : "Base";
				}
				els[e].material = eval("SET.MAT.area"+tipo+system);
			}
		}
	},
	convPuntiScheda: function( html, noPall ){
		if(typeof(noPall)=='undefined')var noPall = false;
		var nScheda = '';
		if(SCHEDA.scheda2Aperta)nScheda='2';
		var regexp = /\[\.[^\]]+\.\]/ig;
		var pts = html.match(regexp);
		for(p in pts){
			siglaTsubo = pts[p].split(".")[1];
			NomeTsubo = DB.set.punti[siglaTsubo].NomeTsubo;
			var EL = null;
			if(scene.getObjectByName( "PT"+siglaTsubo ))EL=scene.getObjectByName( "PT"+siglaTsubo );
			if(scene.getObjectByName( "AR"+siglaTsubo ))EL=scene.getObjectByName( "AR"+siglaTsubo );
			var system = EL.userData.system;
			if(!system)system = 'INT';
			var pallClass = 'pallinoPat';
			var addClick = '';
			if(noPall){
				pallClass += ' pallinoTsubo';
				addClick = 'return;';
			}
			html = html.replace(pts[p], '<span class="'+pallClass+'" onClick="'+addClick+'SET.selTsubo(\''+siglaTsubo+'\')"><span class="p'+system+'"></span>'+NomeTsubo+'</span>');
		}
		
		return html;
	},
	salvaImpostazioni: function(){
		//
		MENU.chiudiMenu();
	},
	popolaImpSet: function(){
		//
	},
	filtraSet: function( togliLoader ){
		if(typeof(togliLoader)=='undefined')var togliLoader = false;
		var vis = true;
		if(	DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())vis = false;
		var PT = document.getElementById("lista_punti").getElementsByClassName("listaPunti")[0].getElementsByTagName("div");
		for(p in PT){
			if(PT[p].id){
				if(!vis && PT[p].id!='pLR'){
					PT[p].classList.add("lockedItem");
				}else{
					PT[p].classList.remove("lockedItem");
				}
			}
		}
		if(togliLoader){
			nasLoader();
		}
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
	cambiaSistema: function( sistema, loader ){
		//
	},
	
	addEviPalls: function( PT_name, tipo ){
		var els = scene.getObjectByName("PTs").children;
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
		if(muscleView)SET.MAT.applicaMappa(localStorage.imgMappa);
		var opposite = (MODELLO.flip) ? 'DX' : 'SX';
		var els = scene.getObjectByName("PTs").children;
		for(e in els){
			if(els[e].userData.lato == opposite){
				els[e].visible = false;
			}else if(!els[e].visible)els[e].visible = true;
		}
		var els = scene.getObjectByName("ARs").children;
		for(e in els){
			if(els[e].userData.lato == opposite){
				els[e].visible = false;
			}else if(!els[e].visible)els[e].visible = true;
		}
	},
	_caricaScheda: function( args ){
		if( args.classe != 'tab_tsubo' && args.classe != SCHEDA.classeAperta)SET.pMod = '';
	},
	_scaricaScheda: function(){
		SET.pMod = '';
	},
	_scaricaSet: function(){
		// risetto la mappa dei muscoli
		MODELLO.MAT.mappaMuscoli();
		if(muscleView)MODELLO.meshPelle.children[0].material = MODELLO.MAT.materialMuscoli[0];
	},
	_torna: function( args ){
		if(typeof(args.daCarica) == 'undefined')SET.pMod = '';
	}
}