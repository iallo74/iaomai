
SET = {
	// VARIABILI
	INTERSECTED: null,
	P: [],
	PT: [],
	LN: [],
	GD: [],
	time: 0,
	pulse: 1,
	ptSel: null,
	eviPoint: '',
	eviPoint1: '',
	eviPoint2: '',
	diffX: 0,
	diffY: 0,
	mAtt: '',
	tmChiusura: null,
	puntiEvidenziati: [],
	pMod: -1,
	pointEvi: '',
	meridianiSecondariAccesi: [],
	preCM: false, // memorizza il contrast method prima di attivarlo su un punto interno
	eviPalls: [],
	geometryPallino: null,
	geometryPallinoTrasp: null,
	idTeoMeridiani: 1,
	snd: null,
	
	// FUNZIONI
	_init: function(){
		SETS = new THREE.Group();
		SETS.name = "SETS";
		
		/*var facce = 6;
		var facceTrasp = 8;*/
		var facce = 5;
		var facceTrasp = 7;
		if(isTablet){
			facce = 4;
			facceTrasp = 6;
		}
		var modelloAperto = globals.modello.cartella;
		if(!modelloAperto)modelloAperto='donna';
		this.geometryPallino = new THREE.SphereGeometry( 0.02, facce, facce );
		this.geometryPallinoTrasp = new THREE.SphereGeometry( 0.07, facceTrasp, facceTrasp );
		for(let m in MERIDIANI){ // elenco i meridiani
			if(m!='posizioni'){
				this.LN[m] = new THREE.Group();
				this.LN[m].name="LN_"+m;
				var n=-1;
				var LNS=MERIDIANI[m][modelloAperto].linee;
				if(LNS){
					for(l in LNS){ // aggiungo le linee
						var loader = new THREE.ObjectLoader();
						var mesh =  loader.parse(JSON.parse(LZString.decompressFromBase64(LNS[l].obj)));
						var intAdd='';
						if(LNS[l].interno)intAdd='Int';
							
						if(MERIDIANI[m].categoria != "" ){
							mesh.visible=false;
							var op = 1;
							if(LNS[l].interno)op = 0.3;
							mesh.material=cloneMAT(this.MAT.lineSel), {opacity: op};
							if(!LNS[l].interno)mesh.material.depthFunc = 3;
							mesh.material.opacity = op;
							if(MERIDIANI[m].colore)mesh.material.color = new THREE.Color( SET.COL["sel"+MERIDIANI[m].colore] );
							if(m.indexOf("_MT")>-1){
								mesh.material.color = new THREE.Color( SET.COL.selMT );
							}
							mesh.computeLineDistances();
						}else{
							if(!MERIDIANI[m].yin){
								mesh.material=this.MAT["lineYang"+intAdd];
							}else{
								mesh.material=this.MAT["lineYin"+intAdd];
								mesh.computeLineDistances();
							}
						}
						mesh.userData.interno=LNS[l].interno;
						this.LN[m].add( mesh );
					}
				}
				this.LN[m].userData.evidenziati=MERIDIANI[m].evidenziati;
				SETS.add( this.LN[m] );
				var n=-1;
				var GDS=MERIDIANI[m][modelloAperto].guide;
				if(GDS){
					if(GDS.length){
						this.GD[m] = new THREE.Group();
						this.GD[m].name="GD_"+m;
						for(l in GDS){ // aggiungo le guide
							
							var loader = new THREE.ObjectLoader();
							var mesh =  loader.parse(JSON.parse(LZString.decompressFromBase64(GDS[l].obj)));
							mesh.material = this.MAT.lineGuide;
							this.GD[m].add( mesh );
							
						}
						SETS.add( this.GD[m] );
					}
				}
				
				this.PT[m] = new THREE.Group();
				this.PT[m].name="PT_"+m;
				// carico i punti parametrizzati
				var n=-1;
				var PTS=MERIDIANI[m][modelloAperto].punti;
				var ptAdd = false;
				
				for(let p in PTS){
					if(PTS[p]!=''){
						var x=PTS[p].array[0];
						var y=PTS[p].array[1];
						var z=PTS[p].array[2];
						var interno=__(PTS[p].interno,false);
						var evidenziati=__(PTS[p].evidenziati);
						var pN = PTS[p].nome.split(".");
						var N = pN[1];
						var sigla = '';
						if(PTS[p].or){ // se c'è una sigla (es EX)
							sigla = PTS[p].or.split(".")[0];
						}
							
						// pallino colorato
						n++;
						this.P[n] = new THREE.Mesh( this.geometryPallino, this.MAT.pointBase );
						this.P[n].position.set(x,y,z);
						if(__(PTS[p].dupl))raggio = this.P[n].scale = 0.9;
						this.P[n].name=PTS[p].nome;
						if(sigla)this.P[n].userData.sigla = sigla;
						if(interno)this.P[n].userData.interno = true;
						if(evidenziati)this.P[n].userData.evidenziati = evidenziati;
						this.PT[m].add( this.P[n] );
							
						// pallino trasparente
						n++;
						this.P[n] = new THREE.Mesh( this.geometryPallinoTrasp, this.MAT.pointTrasp ); 
						this.P[n].position.set(x,y,z);
						this.P[n].name='_'+PTS[p].nome;
						if(sigla)this.P[n].userData.sigla = sigla;
						if(interno)this.P[n].userData.interno = true;
						if(evidenziati)this.P[n].userData.evidenziati = evidenziati;
						this.PT[m].add( this.P[n] );
						ptAdd = true;
					}
				}
				if(ptAdd)SETS.add( this.PT[m] );
			}
		}
		
		if(!localStorage.sistemaSigleMeridiani)localStorage.sistemaSigleMeridiani="INT";
		var contPulsanti = 	'<span class="menuElenchi" onclick="MENU.visMM(\'btnCarMapMenu\');"></span>' +
							'<span id="btnCarMapMenu" class="btn_meridiani_cinesi titolo_set">' +
							'<span>AcupointsMap</span>' +
							'<i class="elMenu" id="chiudiSet" onClick="chiudiSet();" title="'+htmlEntities(TXT("ChiudiSet"))+'"><span>' +
								htmlEntities(TXT("ChiudiSet")) +
							'</span></i><i class="elMenu" id="impostazioniSet" onClick="MENU.visImpset();" title="'+htmlEntities(TXT("ImpostazioniSet"))+'"><span>' +
								htmlEntities(TXT("ImpostazioniSet")) +
							'</span></i>' +
							'<i class="elMenu" id="help_set" onClick="GUIDA.visFumetto(\'guida_set\',true,true);">?</i></span>';
		var contElenco = '';
		
		contPulsanti += '<div id="pulsante_modello" onClick="cambiaModello(\'donna\');">'+TXT("ApriModello3D")+'</div>';
		// mappa punti
		contPulsanti += '<div id="pulsante_meridiani" class="frdx" onClick="SCHEDA.selElenco(\'meridiani\');">'+TXT("MeridianiTradizionali")+'</div>';
		contElenco += '<div id="lista_meridiani"></div>';
		
		// meridiani (da teoria)
		contPulsanti += '<div id="pulsante_canali" class="frdx" onClick="SCHEDA.selElenco(\'canali\');">'+TXT("Canali")+'</div>';
		contElenco += '<div id="lista_canali"></div>';
		
		
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
		
		contBtns = '<div id="p_contrasto" class="p_noTxt" onClick="SET.swContrastMethod();"></div>';
		
		contIcona = '<div id="p_set" onClick="SCHEDA.apriElenco(\'set\',true);"><svg viewBox="0 0 12 48"><polygon points="5,24 12,13 12,35"></polygon></svg><i>'+htmlEntities(TXT("AcupointsMap"))+'</i></div>';;
		
		var preElenco = SCHEDA.elencoSel;
		SCHEDA.caricaElenco(globals.set.nome,contElenco);
		SCHEDA.caricaPulsanti(contPulsanti);
		SCHEDA.caricaBtns(contBtns,contIcona);
		SCHEDA.swPulsanti(true);
		
		document.getElementById("divs").innerHTML = '<div id="meridianiSmart_ico" class="noPrint" onClick="SET.swMeridianiSmart();" title="'+htmlEntities(TXT("MeridianiSmart"))+'"></div><div id="meridianiSmart_cont" class="noPrint"></div>';
		//SCHEDA.apriElenco();
		if(preElenco)SCHEDA.selElenco(preElenco);
		
		manichino.add( SETS );
		this._setLineMaterials();
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
		Object.assign(SET, MODULO_MERIDIANI);
		Object.assign(SET, MODULO_PUNTO);
		Object.assign(SET, MODULO_TEORIA);
		Object.assign(SET, MODULO_PROCEDURE);
		
		// svuoto la memoria
		MODULO_PATOLOGIE = null;
		MODULO_MERIDIANI = null;
		MODULO_PUNTO = null;
		MODULO_TEORIA = null;
		MODULO_PROCEDURE = null;

		for(let m in DB_addset){
			if(!DB.set[m])DB.set[m] = {};
			for(let e in DB_addset[m]){
				DB.set[m][e] = DB_addset[m][e];
			}
		}
		DB_addset = null;
		
		
		manichinoCaricato = true;
		SET.componiMeridiani();
		SET.componiPatologie();
		SET.caricaApprofondimenti();
		if(DB.procedure)SET.car_procedure(-1,1);
		
		SET.filtraSet();
		
		SET.leggiNote();
		nasLoader();
		if(postApreSet){
			if(	SCHEDA.livelloApertura!=3 ){
				
				if(	SCHEDA.classeAperta != 'scheda_A' &&
					SCHEDA.classeAperta != 'scheda_B' )SCHEDA.apriElenco('set');
				else{
					SCHEDA.apriElenco('base');
					PAZIENTI.caricaDettagliSet();
				}
				
			}else{
				if(!SET.ptSel)GUIDA.visFumetto("guida_set_mini",false,true);
				SCHEDA.chiudiElenco();
				MENU.chiudiMenu();
			}
		}
		postApreSet = false;
		if(smartMenu)overInterfaccia=true;
		SET.riapriPunto();
		
		/*
		Decommentare per salvare in localSorage.POS la posizione del manichino
		Per settare le rotazioni automatiche sui un punto premere il pulsante "q"
		*/
		//SET.iniPos();
		
	},
	
	// funzioni per settare la posizione dei punti
	iniPos: function( azzera=false ){
		if(azzera)localStorage.POS = '{}';
		SET.POS = JSON.parse(__(localStorage.POS,'{}'));
		SET.hidePlaced();
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
					SET.ptSel.visible = false;
				}
				localStorage.POS = JSON.stringify(SET.POS);
				console.log(SET.POS);
				console.log(el);
			}else{
				console.log(el)
			}
		}
	},
	hidePlaced: function(){
		for(let i in MERIDIANI.posizioni){
			if(scene.getObjectByName(i))scene.getObjectByName(i).visible = false;
			if(scene.getObjectByName("_"+i))scene.getObjectByName("_"+i).visible = false;
		}
	},
	makeUnique: function(){
		var els = [];
		var posizioni = {};
		for(let i in MERIDIANI.posizioni){
			if(els.indexOf(i)==-1){
				posizioni[i] = MERIDIANI.posizioni[i];
				els.push(i);
			}
		}
		const ordered = Object.keys(posizioni).sort().reduce(
			(obj, key) => { 
				obj[key] = posizioni[key]; 
				return obj;
			}, 
			{}
		);
		console.log(ordered);
	},
	
	// RENDER SET
	_render: function(){
		var make=true;
	 	if(manichinoCaricato && !raycastDisable && !controlsM._ZPR && !controlsM._premuto){ // roll-over sui punti
			
			camera.updateMatrixWorld();
			raycaster.setFromCamera( mouse, camera );
			raycaster.params.Points.threshold = 20;
			
			var objOver='';
			var ints = [];
			if(SETS){
				for(let i in SETS.children){
					if(	SETS.children[i].visible &&
						SETS.children[i].isGroup && 
						SETS.children[i].name.substr(0,2)!='LN' && 
						SETS.children[i].name.substr(0,2)!='GD'){
						var intersects = raycaster.intersectObjects( SETS.children[i].children );
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
			if(ANATOMIA){
				for(let i in ANATOMIA.children){
					if(	ANATOMIA.children[i].name.toLowerCase()=='pelle' ||
						ANATOMIA.children[i].name.toLowerCase()=='ossa' ||
						ANATOMIA.children[i].name.toLowerCase()=='visceri' ){
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
				if(near.object.name.substr(0,1)!='_')objOver='';
				else objOver=near.object;
			}
			var n1=n2='';
			SET.desIntersected();
			if(objOver){
				n1=objOver.name.substr(1,2); // meridiano intersecato
				this.INTERSECTED = objOver;
				var pN = this.INTERSECTED.name.split(".");
				var labelPt = (pN[1]*1)+"."+SET.convSigla(pN[0].substr(1,2));
				if(__(this.INTERSECTED.userData.sigla))var labelPt = this.INTERSECTED.userData.sigla; // per i punti EX
				visToolTip(labelPt);
				if(!MERIDIANI[n1].meridianoAcceso)this.coloraMeridiano(this.INTERSECTED.name.substr(1,2),'Over','Over');
				renderer.domElement.style.cursor='pointer';
			}else{
				this.INTERSECTED=null;
				nasToolTip();
				renderer.domElement.style.cursor='default';
			}
			make=true;
		}
		if(this.ptSel){ // pulse del pallino selezionato
		
			this.pulse+=0.01;
			if(this.pulse>=1.6)this.pulse=1;
			var op=1.8-this.pulse;
			
			SET.setPulsePt( this.ptSel, this.pulse, op );
			
			make=true;
		
			if(pP[0]=='EX'){
				var els = scene.getObjectByName("PT_EX").children;
				for(e in els){
					if(els[e].name.indexOf(pP[0]+"."+pP[1]+".")==0){
						els[e].scale.set(this.pulse,this.pulse,this.pulse);
						els[e].material.setValues( { opacity: op } );
					}
				}
			}
		
			make=true;
		}
		return make;
	},
	setPulsePt: function( pt, pulse, op, mat='' ){
		let pp = SET.splitPoint(pt.name);
		let els = scene.getObjectByName("PT_"+pp.siglaMeridiano).children;
		for(let e in els){
			if(els[e].name.indexOf(pp.siglaMeridiano+"."+pp.nPunto+".")==0){
				els[e].scale.set(pulse,pulse,pulse);
				if(mat)els[e].material=mat;
			}
		}
		SET.MAT.pointSel.setValues( { opacity: op } );
	},
	desIntersected: function(){
		if(this.INTERSECTED){
			if(this.INTERSECTED.name.substr(0,1)=='_'){
				var n = this.INTERSECTED.name.substr(1,2); // meridiano 
				if(!__(MERIDIANI[n].meridianoAcceso,false))this.coloraMeridiano(n,'','Base',true);
			}
			this.INTERSECTED = null;
		}
	},
	// ANIMATE SET
	_animate: function(){
		if(typeof(MERIDIANI)!='undefined'){
			for(let m in MERIDIANI){
				if(MERIDIANI[m].meridianoAcceso){
					var els = this.LN[m].children;
					for(v in els){
						line=this.LN[m].children[v];
						if(line.material.uniforms){
							this.time += clock.getDelta();
							line.material.uniforms.time.value = this.time; // using of the time uniform
							line.computeLineDistances();
							line.lineDistancesNeedUpdate = true;
						}
					}
				}
			}
		}
	},
	
	// CLICK sul punto
	_onClick: function(e){
		var btn=0;
		if(!touchable)btn=e.button;
		if(!btn && !raycastDisable && ((controlsM.xIni==controlsM.xEnd && controlsM.yIni==controlsM.yEnd) || touchable)){
			if(this.INTERSECTED){
				if(!touchable){
					controlsM._inMovimento=true;
					controlsM._ZPR=true;
					controlsM._MM=false;
				}
				var n=this.INTERSECTED.name.split("_");
				var ritorno = '';
				if(SCHEDA.classeAperta && SCHEDA.classeAperta!='tab_punti')ritorno = 'SET.chiudiPunto(true)';
				SET.apriPunto(n[1],ritorno,this.INTERSECTED);
			}
		}
		controlsM.xIni=-1;
		controlsM.xEnd=-1;
		controlsM.yIni=-1;
		controlsM.yEnd=-1;
	},
	apriPunto: function( PT_name, ritorno='', el='' ){
		if(this.ptSel){
			var mat=this.MAT.pointOn;
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			SET.setPulsePt( this.ptSel, 1, 1, mat );
			var pp = SET.splitPoint(this.ptSel.name);
			document.getElementById("pt_"+pp.nPunto+"_"+pp.siglaMeridiano).classList.remove("selElPt");
		}
		if(this.MAT.pointSel)SET.chiudiPunto(true,true);
		//var pp = SET.splitPoint(PT_name);	
		if(!scene.getObjectByName( PT_name )){
			if(scene.getObjectByName( PT_name + "." )){
				PT=scene.getObjectByName( PT_name + "." );
			}else if(scene.getObjectByName( PT_name + ".SX" )){
				PT=scene.getObjectByName( PT_name + ".SX" );
			}
		}else PT=scene.getObjectByName( PT_name );
		if(this.ptSel && !SCHEDA.schedaAperta)this.chiudiPunto();
		this.ptSel=PT;
		var pp = SET.splitPoint(this.ptSel.name.substr(0,5));	
		
		if(!ritorno && PT_name.indexOf("EX")==-1)this.accendiMeridiano(pp.siglaMeridiano);
		document.getElementById("pt_"+pp.nPunto+"_"+pp.siglaMeridiano).classList.add("selElPt");
		var matTxt = "this.MAT.pointSel";
		if(PT.userData.nota)matTxt = "this.MAT.pointSelNote";
		if(this.ptSel.userData.interno)matTxt += "Int";
		var mat = eval(matTxt);
		this.diffX = this.ptSel.position.x*1;
		this.diffY = this.ptSel.position.y*1;
		
		
		var els = scene.getObjectByName("PT_"+pp.siglaMeridiano).children;
		for(e in els){
			if(els[e].name.indexOf(pp.siglaMeridiano+"."+pp.nPunto+".")==0)els[e].material=mat;
		}
		
		
		var x2 = 0-this.ptSel.position.x;
		var y2 = 0-this.ptSel.position.y;
		var z2 = 0-this.ptSel.position.z;
		panEndZero = { x: x2, y: y2, z: z2 };
		
		if(SCHEDA.aggancio.tipo=='libera' && el){
			this.ptSel.updateMatrixWorld();
			var vector = this.ptSel.geometry.vertices[0].clone();
			vector.applyMatrix4( this.ptSel.matrixWorld );
			panEnd = { x: vector.x, y: vector.y, z: vector.z };
		}else panEnd = { x: 0, y: 0, z: 0 };
		
		
		
		if(!el){
			// posiziono
			if(MERIDIANI.posizioni[SET.ptSel.name]){
				var pos = MERIDIANI.posizioni[SET.ptSel.name];

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
				rotateEnd = { x:pos.x, y:pos.y, z:0 };
			}
			if(manichinoCont.position.z<15 || !zoomEnd || !smothingView)zoomEnd = 15;
			normalizeRotation();
		}
		
		SET.delEviPalls(pp.siglaMeridiano,pp.nPunto,'Over');
		SET.addEviPalls(pp.siglaMeridiano,pp.nPunto,'Select');
		this.pulse = 1;
		
		
		
		// se è un punto interno evidenzio gli organi o le ossa
		if(this.ptSel.userData.interno && globals.modello.cartella){
			this.preCM = SET.COL.contrastMethod;
			this.swContrastMethod(false);
			
			var evidenziati = this.ptSel.userData.evidenziati;
			if(evidenziati){
				for(e in evidenziati){
					for(let i in evidenziati[e]){
						scene.getObjectByName( evidenziati[e][i] ).material = MODELLO.MAT.materialVisceriEvi;
					}
				}
			}
		}
		// ---------------------
		SET.caricaPunto( pp.siglaMeridiano, pp.nPunto, ritorno );
	},
	chiudiPunto: function( nonChiudereScheda=false, cambiaPunto=false ){
		document.getElementById("scheda").classList.remove("tab_punti");
		document.getElementById("scheda").classList.remove("schForm");
		if(!globals.modello.cartella)return;
		if(!nonChiudereScheda){
			endChangeDetection();
			SCHEDA.formModificato = false;
		}
		if(this.ptSel){
			if(this.ptSel.userData.interno){
				this.preCM = false;
				this.swContrastMethod(true);
				var evidenziati = this.ptSel.userData.evidenziati;
				if(evidenziati){
					for(e in evidenziati){
						for(let i in evidenziati[e]){
							var tipo = scene.getObjectByName( evidenziati[e][i] ).parent.name;
							scene.getObjectByName( evidenziati[e][i] ).material = MODELLO.MAT["material"+tipo];
						}
					}
				}
			}
		}
		
		var exPt = SET.ptSel;
		
		if(!this.ptSel)return;
		var pp = SET.splitPoint(this.ptSel.name);
		this.pulse=0;
		var mat=this.MAT.pointBase;
		if(MERIDIANI[pp.siglaMeridiano].meridianoAcceso)mat=this.MAT.pointSel;
		if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
		SET.delEviPalls(pp.siglaMeridiano,pp.nPunto,'Select');
		
		// coloro tutti gli altri punti non SX o DX o CC
		var els = scene.getObjectByName("PT_"+pp.siglaMeridiano).children;
		for(e in els){
			if(els[e].name.indexOf(pp.siglaMeridiano+"."+pp.nPunto+".")==0){
				els[e].material=mat;
				els[e].material.opacity=1;
				els[e].scale.set(1,1,1);
			}
		}
		
		this.ptSel=null;	
		document.getElementById("pt_"+pp.nPunto+"_"+pp.siglaMeridiano).classList.remove("selElPt");
		if(SCHEDA.scheda2Aperta){
			nonChiudereScheda=true;
			document.getElementById("scheda_ritorno").click();
		}
		if(!nonChiudereScheda){
			SCHEDA.scaricaScheda(); 
		}else if(SET.meridianiSecondariAccesi.length)SET.swContrastMethod(false);
		// ricentro il manichino
		exPt.updateMatrixWorld();
		var vector = exPt.geometry.vertices[0].clone();
		vector.applyMatrix4( exPt.matrixWorld );
		manichino.position.set( 0, 0, 0 );
		
		render();
		exPt.updateMatrixWorld();
		var vector2 = exPt.geometry.vertices[0].clone();
		vector2.applyMatrix4( exPt.matrixWorld );
		manichinoCont.position.x = manichinoCont.position.x - (vector2.x-vector.x);
		manichinoCont.position.y = manichinoCont.position.y - (vector2.y-vector.y);
		manichinoCont.position.z = manichinoCont.position.z - (vector2.z-vector.z);
		render();
		SET.spegniMeridiani();
	},
	riapriPunto: function(){
		if(!SET.ptSel)return;
		MENU.visModello();
		if(smartMenu)SCHEDA.apriElenco('set',true);
		let pt = SET.ptSel.name.split(".")[0]+"."+SET.ptSel.name.split(".")[1];
		let siglaMeridiano = SET.ptSel.name.split(".")[0];
		SET.swElencoPt(document.getElementById("p"+siglaMeridiano),siglaMeridiano);
		let nascosta = document.body.classList.contains("nasSch");
		SET.apriPunto(pt,'','','');
		if(nascosta)SCHEDA.nascondiScheda();
	},
	coloraMeridiano: function( siglaMeridiano, matLine, matPoint, forza=false ){
		if(siglaMeridiano=='EX' && !matLine && matPoint=='Base' && SET.ptSel)return;
		if(matPoint=='Base' && SET.ptSel && MERIDIANI[siglaMeridiano].meridianoAcceso && !forza)return;
		if(SET.meridianiSecondariAccesi.length && matLine.indexOf("On")==-1)return;
		if(controlsM._premuto && !forza)return;
		var els = this.PT[siglaMeridiano].children;
		for(v in els){
			if(	els[v].name.substr(0,1)!='_' && 
				(!SET.ptSel || els[v].name.substr(0,5)!=SET.ptSel.name.substr(0,5))){
				var mat = matPoint;
				try{
					if(els[v].userData.nota)mat="Note";
				}catch(err){}
				var pass = true;
				if(SET.ptSel)pass = false;
				if(pass || matPoint.indexOf("On")>-1 || matPoint.indexOf("Base")>-1)els[v].material = this.MAT['point'+mat]; // cambiare se NOTA
				els[v].scale.set(1,1,1);
			}
		}
		var els = this.LN[siglaMeridiano].children;
		var Y='Yang';
		if(MERIDIANI[siglaMeridiano].yin)Y='Yin';
		if(matPoint=='On')Y='';
		for(v in els){
			var int='';
			if(els[v].userData.interno)int='Int';
			els[v].material = eval('SET.MAT.line'+Y+int+matLine);
		}
	},
	scoloraMeridiani: function(){
		for(let m in MERIDIANI){
			if(!__(MERIDIANI[m].meridianoAcceso,false) && m.indexOf("_")==-1){
				this.coloraMeridiano(m,'','Base');
			}
		}
	},
	accendiMeridiano: function( siglaMeridiano, g=false, noSw=false ){
		if(!globals.modello.cartella)return;
		// verifico le autorizzazioni
		if(!SET.verFreeMeridiani(siglaMeridiano)){
			ALERT(TXT("MsgFunzioneSoloPay"));
			return;
		}
		// --------------------------
		if(SET.meridianiSecondariAccesi.length){
			SCHEDA.scaricaScheda();
		}
		if(!g || (g && this.ptSel)){
			for(let m in MERIDIANI){
				if(MERIDIANI[m].categoria == "" ){
					var pass=true;
					if(g && this.ptSel){
						if(siglaMeridiano==m)pass=false;
					}
					if(pass){
						document.getElementById("p"+m).classList.remove("elencoSel");
						document.getElementById("sm"+m).classList.remove("elencoSel");
						this.coloraMeridiano(m,'','Base',true);
						MERIDIANI[m].meridianoAcceso=false;
					}
				}	
			}
		}
		if(g && this.ptSel)this.chiudiPunto();
		if(!MERIDIANI[siglaMeridiano].meridianoAcceso || !g){
			document.getElementById("p"+siglaMeridiano).classList.add("elencoSel");
			document.getElementById("sm"+siglaMeridiano).classList.add("elencoSel");
			MERIDIANI[siglaMeridiano].meridianoAcceso=true;
			this.coloraMeridiano(siglaMeridiano,'On["'+MERIDIANI[siglaMeridiano].elemento+'"]','On');
			if(document.getElementById("tr_p"+siglaMeridiano)){
				document.getElementById("tr_p"+siglaMeridiano).classList.add("p_"+MERIDIANI[siglaMeridiano].elemento);
			}
		}else{
			document.getElementById("p"+siglaMeridiano).classList.remove("elencoSel");
			document.getElementById("sm"+siglaMeridiano).classList.remove("elencoSel");

			if(touchable)this.coloraMeridiano(siglaMeridiano,'', 'Base');
			else this.coloraMeridiano(siglaMeridiano,'Over', 'Over');
			MERIDIANI[siglaMeridiano].meridianoAcceso=false;
			if(document.getElementById("tr_p"+siglaMeridiano)){
				document.getElementById("tr_p"+siglaMeridiano).classList.remove("p_"+MERIDIANI[siglaMeridiano].elemento);
			}
		}
		if(g){
			var nAccesi=0;
			this.mAtt='';
			for(let m in MERIDIANI){
				if(MERIDIANI[m].meridianoAcceso){
					nAccesi++;
					this.mAtt=m;
				}
			}
		}
		if(nAccesi || !g)document.getElementById("p_contrasto").classList.add("visBtn");
		else{
			document.getElementById("p_contrasto").classList.remove("visBtn");
			if(!noSw)SET.swContrastMethod(true);
		}
	},
	spegniMeridiano: function( siglaMeridiano ){
		if(this.ptSel)this.chiudiPunto();
		document.getElementById("p"+siglaMeridiano).classList.remove("elencoSel");
		document.getElementById("sm"+siglaMeridiano).classList.remove("elencoSel");
		this.coloraMeridiano(siglaMeridiano,'','Base');
		MERIDIANI[siglaMeridiano].meridianoAcceso=false;
	},
	spegniMeridiani: function( forza=false ){
		if(SCHEDA.scheda2Aperta || forza){
			for(let m in MERIDIANI){
				if(MERIDIANI[m].meridianoAcceso){
					var mer = m;
					SET.accendiMeridiano(m,true);
					SET.coloraMeridiano(mer,'','Base');
				}
			}
		}
	},
	_applyLineMethod: function(){
		for(let m in MERIDIANI){
			if(MERIDIANI[m].meridianoAcceso){
				this.coloraMeridiano(m,'On["'+MERIDIANI[m].elemento+'"]','On');
			}
		}
	},
	swContrastMethod: function(n=SET.COL.contrastMethod){
		SET.COL.contrastMethod=n ? false : true;
		if(SET.COL.contrastMethod){
			SET.MAT.lineYang.opacity = SET.MAT.opLineContr;
			SET.MAT.lineYin.opacity = SET.MAT.opLineContr;
			SET.MAT.pointBase.opacity = SET.MAT.opPointContr;
			var muscolare = false;
			if(SET.meridianiSecondariAccesi.length){
				if(SET.meridianiSecondariAccesi[0].indexOf("_MT")>-1){
					muscolare = true;
				}
			}
			if(MODELLO.orOp == -1)MODELLO.orOp = MODELLO.opAtt;
			if(muscolare){
				//muscleView
				MODELLO.swMuscle(true);
				MODELLO.op("Pelle",0.60)  ;  
				MODELLO.op("Visceri",0);
				MODELLO.op("Ossa",1);
				SET.MAT.lineYang.opacity = 0;
				SET.MAT.lineYin.opacity = 0;
				SET.MAT.lineGuide.opacity = 0;
				SET.MAT.pointBase.opacity = 0.4;
			}else{
				if(muscleView)MODELLO.swMuscle();
				MODELLO.op("Pelle",0.40)  ;  
				MODELLO.op("Visceri",0.12);
				MODELLO.op("Ossa",0.23);
				SET.MAT.lineYang.opacity = 0.15;
				SET.MAT.lineYin.opacity = 0.15;
				SET.MAT.lineGuide.opacity = 0.15;
				SET.MAT.pointBase.opacity = 0.15;
			}
		}else{
			if(!SET.meridianiSecondariAccesi.length || (this.ptSel && this.ptSel.userData.evidenziati)){
				if(muscleView)MODELLO.swMuscle();
				SET.MAT.lineYang.opacity = SET.MAT.opLine;
				SET.MAT.lineYin.opacity = SET.MAT.opLine;
				SET.MAT.pointBase.opacity = SET.MAT.opPoint;
				
				if(MODELLO.orOp>-1)MODELLO.op("Pelle",MODELLO.orOp);  
				MODELLO.op("Visceri",1);
				MODELLO.op("Ossa",0.6);
				MODELLO.orOp = -1;
				SET.MAT.lineYang.opacity = 0.6;
				SET.MAT.lineYin.opacity = 0.6;
				SET.MAT.pointBase.opacity = 1;
				SET.MAT.lineGuide.opacity = 0.6;
			}
		}
		SET._setLineMaterials();
		SET._applyLineMethod();
	 	MODELLO.op('Pelle',MODELLO.opAtt);
		if(SET.COL.contrastMethod)document.getElementById("p_contrasto").classList.add("btnSel");
		else document.getElementById("p_contrasto").classList.remove("btnSel");
	},
	scriviPunto: function( punto, esteso=false, noRet=false, sigla=false ){
		var pp = SET.splitPoint(punto);
		var siglaPunto = +pp.nPunto +"."+pp.siglaMeridiano;
		var nomePunto = punto.substr(siglaPunto.length,punto.length-siglaPunto.length);
		if(sigla)siglaPunto = sigla;
		var html = '<a class="pallinoPat';
		if(esteso)html += ' pallinoPatEsteso';
		var ret = '';
		if(!noRet)ret = SET.chiudiPunto(true);
		html += '" onClick="SET.apriPunto(\''+pp.siglaMeridiano+"."+pp.nPunto+'\',\''+ret+'\');"';
		if(noRet)html += '  onMouseOver="SET.overPunto(this,true);"' +
						 '  onMouseOut="SET.overPunto(this,false);"' +
						 '	id="pt_'+pp.nPunto+'_'+pp.siglaMeridiano+'"';
		html += '> '+siglaPunto;//+' ';
		if(esteso)html+='<i>'+nomePunto;
		html+='</i></a>';
		return html;
	},
	selPunto: function( nPunto, siglaMeridiano ){
		// verifico le autorizzazioni
		if(!SET.verFreeMeridiani(siglaMeridiano)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		SET.apriPunto(siglaMeridiano+"."+nPunto,'SET.chiudiPunto(true);');
	},
	selPuntoMod: function( p ){
		SET.pMod = p;
		var nPunto = document.getElementById("formMod")["pt_"+p].value;
		var siglaMeridiano = document.getElementById("formMod")["mr_"+p].value;
		SET.selPunto( nPunto, siglaMeridiano );
	},
	setPuntoFrm: function(){
		var pp = SET.splitPoint(SET.ptSel.name);
		if( SCHEDA.classeAperta == 'scheda_procedura' ){
			SET.dettagliProvvisori[SET.pMod].DescrizioneDettaglio = pp.nPunto+"."+pp.siglaMeridiano;
			SET.caricaDettagli();
		}
		if( SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B' ){
			PAZIENTI.puntiProvvisori[SET.pMod].n = pp.nPunto;
			PAZIENTI.puntiProvvisori[SET.pMod].m = pp.siglaMeridiano;
			PAZIENTI.caricaPuntiTrattamento();
		}
		SET.pMod = -1;
		SCHEDA.torna();
		SCHEDA.formModificato = true;
	},
	evidenziaPunto: function( el = document.getElementById("scheda_testo") ){
		SET.annullaEvidenziaPunto();
		var els = el.getElementsByClassName("pallinoPat");
		for(let p=0;p<els.length;p++){
			var siglaMeridiano = els[p].dataset.siglaMeridiano;
			var nPunto = els[p].dataset.nPunto;
			var el = scene.getObjectByName("PT_"+siglaMeridiano);
			if(el){
				for(e in el.children){
					if(el.children[e].name.indexOf("_"+siglaMeridiano+"."+nPunto+".")==0)el.children[e].material=SET.MAT.pointEvi;
				}
			}
			SET.puntiEvidenziati.push(nPunto+"."+siglaMeridiano);
		}
		SET.settaOverPunto();
	},
	evidenziaMeridiani: function( html ){
		SET.spegniMeridiani(true);
		var re = /accendiMeridiano\([^\)]+\)/ig;
		var result = html.match(re);
		for(let k in result){
			var siglaMeridiano=result[k].split("'")[1];
			SET.accendiMeridiano(siglaMeridiano,true);
		}
	},
	evidenziaPuntoMod: function( elenco ){ 
		SET.annullaEvidenziaPunto();
		for(let k in elenco){
			var pp=SET.splitPoint(elenco[k]);
			var mat = SET.MAT.pointEvi;
			if(pp.valutazione){
				if(pp.valutazione=='V')mat = SET.MAT.pointVuoto;
				if(pp.valutazione=='P')mat = SET.MAT.pointPieno;
				if(pp.valutazione=='D')mat = SET.MAT.pointDolore;
			}
			if(scene.getObjectByName("PT_"+pp.siglaMeridiano)){
				var els = scene.getObjectByName("PT_"+pp.siglaMeridiano).children;
				for(e in els){
					if(els[e].name.indexOf("_"+pp.siglaMeridiano+"."+pp.nPunto+".")==0)els[e].material=mat;
				}
				SET.puntiEvidenziati.push(elenco[k]);
			}
		}
	},
	evidenziaMeridianiMod: function( elenco ){
		SET.spegniMeridiani(true);
		for(let k in elenco){
			SET.accendiMeridiano(elenco[k],true);
		}
	},
	annullaEvidenziaPunto: function(){
		if(SET.puntiEvidenziati.length){
			for(let k in SET.puntiEvidenziati){
				var pT=SET.puntiEvidenziati[k];
				var pp=SET.splitPoint(pT);
				
				var el = scene.getObjectByName("PT_"+pp.siglaMeridiano)
				if(el){
					for(e in el.children){
						if(el.children[e].name.indexOf("_"+pp.siglaMeridiano+"."+pp.nPunto+".")==0)el.children[e].material=SET.MAT.pointTrasp;
					}
				}
			}
			SET.puntiEvidenziati = [];
		}
	},
	settaOverPunto: function(){
		if(!touchable){
			var els = document.getElementById("scheda_testo").getElementsByClassName("pallinoPat");
			for(e=0;e<els.length;e++){
				els[e].onmouseover = function(){
					SET.overPunto(this,true);
				}
				els[e].onmouseout = function(){
					SET.overPunto(this,false);
				}
			}
		}
	},
	ritOverPunto: function( id, p ){
		if(!touchable){
			SET.delAllEviPalls('Over');
			var elenco = [];
			var els = document.getElementById(id).getElementsByClassName("dettPunto");
			var tot = els.length;
			for(let e=0;e<tot;e++){
				if(nPunto = els[e].getElementsByClassName("numPoints")[0]){
					let mer = els[e].getElementsByClassName("selectTratt")[0].value;
					nPunto = nPunto.value;
					elenco.push(nPunto+"."+mer);
				}
			}
			SET.evidenziaPuntoMod(elenco);
			SET.aggiornaDettaglio(document.getElementById("pt_"+p));
		}
	},
	overPunto: function( el, over ){
		if(el.classList.contains("dettPunto")){
			var mer = el.getElementsByClassName("selectTratt")[0];
			var nPunto = el.getElementsByClassName("numPoints")[0];
			if(!nPunto)return;
			else nPunto = SET.ptToStr(nPunto.value);
			if(mer)mer = SET.estraiSigla(mer.value);
			if(!__(DB.set.meridiani[mer]))return; // in caso di EX
			if(typeof(DB.set.meridiani[mer])=='undefined')return;
		}else{
			if(!el.dataset.siglaMeridiano)return;
			var nPunto = el.dataset.nPunto;
			var mer = el.dataset.siglaMeridiano;
		}
		if(over){
			SET.addEviPalls(mer,nPunto,'Over');
		}else{
			SET.delEviPalls(mer,nPunto,'Over');
		}
	},
	convSigla: function( siglaMeridiano ){
		if( localStorage.sistemaSigleMeridiani=='INT' || !__(DB.mtc.meridiani[siglaMeridiano]))return siglaMeridiano;
		else return DB.mtc.meridiani[siglaMeridiano].sigle[localStorage.sistemaSigleMeridiani];
	},
	estraiSigla: function( siglaMeridiano ){
		var siglaDef = siglaMeridiano;
		if(localStorage.sistemaSigleMeridiani=='INT' || !localStorage.sistemaSigleMeridiani)return siglaMeridiano;
		for(let m in DB.mtc.meridiani){
			if(siglaMeridiano == DB.mtc.meridiani[m].sigle[localStorage.sistemaSigleMeridiani])siglaDef = m;
		}
		return siglaDef;
	},
	convSigleScheda: function(){
		if(localStorage.sistemaSigleMeridiani == 'INT' || 
		(!SCHEDA.schedaAperta && !SCHEDA.scheda2Aperta) )return;
		var nScheda = '';
		if(SCHEDA.scheda2Aperta)nScheda='2';
		
		var regexp = /[\s>\(\.\,]{0,1}[0-9]{1,2}\.[A-Z]{2}[\s<\.,\)]{1}/ig;
		var str = document.getElementById("scheda_testo"+nScheda).innerHTML;
		var pts = str.match(regexp);
		for(let p in pts){
			console.log(pts[p])
			var pP = pts[p].split(".");
			str = str.replace(pts[p], pP[0]+"."+SET.convSigla(pP[1].substr(0,2))+pP[1].substr(2,1));
		}
		document.getElementById("scheda_testo"+nScheda).innerHTML = str;
		if(!nScheda){
			var str = document.getElementById("scheda_titolo"+nScheda).innerHTML;
			var pts = str.match(regexp);
			for(let p in pts){
				console.log(pts[p])
				var pP = pts[p].split(".");
				str = str.replace(pts[p], +pP[0] +"."+SET.convSigla(pP[1].substr(0,2))+pP[1].substr(2,1));
			}
			document.getElementById("scheda_titolo"+nScheda).innerHTML = str;
		}
	},
	convPuntiScheda: function( html, noPall=false ){
		var pallClass = 'pallinoPat';
		if(noPall)pallClass += ' pallinoPunto';
		var nScheda = '';
		if(SCHEDA.scheda2Aperta)nScheda='2';
		var regexp = /\[\.[0-9]{1,2}\.[A-Z]{2}[\.*]+\]/ig;
		var pts = html.match(regexp);
		for(let p in pts){
			var pp = SET.splitPoint(pts[p].substr(2,pts[p].length-2));
			var n_M = SET.convSigla(pp.siglaMeridiano);
			var addClick = (noPall)?'return':'';
			let sost = '<span class="'+pallClass+'" data-n-punto="'+pp.nPunto+'" data-sigla-meridiano="'+pp.siglaMeridiano+'" onClick="'+addClick+'SET.selPunto(\''+pp.nPunto+'\',\''+pp.siglaMeridiano+'\');">'+ +pp.nPunto+'.'+n_M;
			if(__(pp.pinyin))sost += ' <i>'+pp.pinyin+'</i>';
			sost += '</span>'
			html = html.replace(pts[p], sost);
		}
		var regexp = /\[\.[A-Z]{2}\.\]/ig;
		var pts = html.match(regexp);
		for(let p in pts){
			var pP = pts[p].split(".");
			var siglaMeridiano = pP[1].substr(0,2);
			var n_M = SET.convSigla(siglaMeridiano)+pP[1].substr(2,1);
			var nome = '';
			for(let m in DB.set.teoria[SET.idTeoMeridiani].contenuti){
				if(m && DB.set.teoria[SET.idTeoMeridiani].contenuti[m].sigla == siglaMeridiano)nome = DB.set.teoria[SET.idTeoMeridiani].contenuti[m].TitoloTeoria;
			}
			html = html.replace(pts[p], '<span class="meridianoPat"' +
										'	   onClick="SET.accendiMeridiano(\''+siglaMeridiano+'\',true);"' +
										'	   onMouseOver="SET.eviMeridiano(\''+siglaMeridiano+'\',true);"' +
										'	   onMouseOut="SET.eviMeridiano(\''+siglaMeridiano+'\',false);">'+htmlEntities(nome)+'</span>');
		}
		return html;
	},
	salvaImpSet: function(){
		localStorage.sistemaSigleMeridiani = document.getElementById("sceltaSigle").value;
		SET.caricaMeridiani();
		PAZIENTI.cambiaGZ(PAZIENTI.mezzoProvvisorio,true);
		MENU.chiudiImpSet();
	},
	popolaImpSet: function(){
		var mzs = PAZIENTI.mezziSet.P;
		var HTML_imp = 
			'<p><i>'+htmlEntities(TXT("SistemaSigle"))+':</i> ' +
			'<select id="sceltaSigle" onChange="SET.popolaSigle();">';
		for(let k in DB.mtc.meridiani["BL"].sigle){
			HTML_imp += '  <option value="'+k+'"';
			if(localStorage.sistemaSigleMeridiani == k)HTML_imp += ' SELECTED';
			HTML_imp += '>'+k+'</option>'+H.chr10;
		}
		HTML_imp += 
			'</select></p>'+H.chr10 +
			'<div id="tbSigleMeridiani"></div>' +
			'	<span class="separatorePulsanti"></span><div><i>'+htmlEntities(TXT("MezzoDefault"))+':</i></div><div id="tt_mezzival2">';
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
		SET.popolaSigle();
	},
	popolaSigle: function(){
		var s = document.getElementById("sceltaSigle").value;
		if(s == '')s='INT';
		var HTML = '';
		HTML += '<table cellpadding="5" cellspacing="0" border="0" id="tbSigleMeridiani_tab">';
		var disp = true;
		for(let m in DB.set.meridiani){
			
			if(disp)HTML +=
					'	<tr>';
			HTML +=
					'		<td class="tbSigleMeridiani_nomi">'+htmlEntities(DB.set.meridiani[m].NomeMeridiano)+'</td>' +
					'		<td class="tbSigleMeridiani_sigle">';
					
			if( s=='INT' )HTML += m;
			else HTML += DB.mtc.meridiani[m].sigle[s];
			
			HTML += '		</td>';
			if(!disp)HTML += 
					'	</tr>';
			disp = !disp;
		}
		HTML += '</table>';
		document.getElementById("tbSigleMeridiani").innerHTML = HTML;
	},
	
	
	accendiMeridianoSecondario: function( sigla, mantieni=false ){
		if(!globals.modello.cartella)return;
		for(let m in MERIDIANI){
			if(MERIDIANI[m].categoria == "" ){
				if(MERIDIANI[m].meridianoAcceso){
					if(m!=sigla)SET.spegniMeridiano(m);
				}
			}	
		}
		SET.meridianiSecondariAccesi.push(sigla);
		
		var meridiano = scene.getObjectByName( "LN_"+sigla );
		var percorsoInterno = false;
		for(let c in meridiano.children){
			if( __(meridiano.children[c].userData.interno) )percorsoInterno = true;
		}
		if(!SET.COL.contrastMethod)SET.swContrastMethod();
		
		var elM = meridiano.children
		for(e in elM){
			elM[e].visible = true
		}
		var evidenziati = meridiano.userData.evidenziati;
		if(meridiano.userData.evidenziati){
			for(e in evidenziati){
				for(let i in evidenziati[e]){
					scene.getObjectByName( evidenziati[e][i] ).material = MODELLO.MAT.materialVisceriEvi;
				}
			}
		}
		if(isTablet){
			SET.MAT.pointBase.visible = false;
			SET.MAT.lineYang.visible = false;
			SET.MAT.lineYin.visible = false;
			MODELLO.MAT.materialVisceri.visible = false;
		}
	},
	spegniMeridianoSecondario: function( sigla='', forza=false ){
		if(!globals.modello.cartella)return;
		var meridianoPrincipale = false;
		for(let m=SET.meridianiSecondariAccesi.length-1;m>-1;m--){
			if(SET.meridianiSecondariAccesi[m] == sigla || !sigla){
				var meridiano = scene.getObjectByName( "LN_"+SET.meridianiSecondariAccesi[m] );
				if(SET.meridianiSecondariAccesi[m].indexOf("_")==-1){
					var mer = SET.meridianiSecondariAccesi[m];
					setTimeout(function(mer){SET.eviMeridiano(mer,false);},200,mer);
					if(forza)SET.accendiMeridiano(SET.meridianiSecondariAccesi[m],true,true);
					meridianoPrincipale = true;
				}else{
					
					var elM = meridiano.children
					for(e in elM){
						elM[e].visible = false
					}
				}
				var evidenziati = meridiano.userData.evidenziati;
				if(evidenziati){
					for(e in evidenziati){
						for(let i in evidenziati[e]){
							var tipo = scene.getObjectByName( evidenziati[e][i] ).parent.name;
							scene.getObjectByName( evidenziati[e][i] ).material = MODELLO.MAT["material"+tipo];
						}
					}
				}
				if(SET.meridianiSecondariAccesi.length>1)SET.meridianiSecondariAccesi.splice(m,1);
				else SET.meridianiSecondariAccesi = [];
			}
		}
		if(!SET.meridianiSecondariAccesi.length){
			if(SET.COL.contrastMethod){
				SET.swContrastMethod();
			}
		}
		if(isTablet){
			SET.MAT.pointBase.visible = true;
			SET.MAT.lineYang.visible = true;
			SET.MAT.lineYin.visible = true;
			MODELLO.MAT.materialVisceri.visible = true;
		}
	},
	
	addEviPalls: function( siglaMeridiano, nPunto, tipo ){
		if(!scene.getObjectByName("PT_"+siglaMeridiano))return;
		var els = scene.getObjectByName("PT_"+siglaMeridiano).children;
		for(e in els){
			if(els[e].name.indexOf(siglaMeridiano+"."+nPunto+".")==0){
				var geoPoint =  new THREE.SphereGeometry( 0.11, 16, 16 );
				var eviPoint;
				eviPoint =  new THREE.Mesh( geoPoint, this.MAT.pointSel2.clone() );
				eviPoint.name=tipo+' point: '+els[e].name;
				eviPoint.material.visible=true;
				eviPoint.position.set( els[e].position.x, els[e].position.y, els[e].position.z );
				if(	tipo=='Select' || 
					(tipo=='Over' && !scene.getObjectByName('Select point: '+els[e].name))){
						SETS.add( eviPoint );
				}
			}
		}
	},
	delEviPalls: function( siglaMeridiano, nPunto, tipo ){
		var els = SETS.children;
		for(e=els.length-1;e>=0;e--){
			if(els[e].name.indexOf(tipo+' point: '+siglaMeridiano+"."+nPunto+".")==0){
				SETS.remove( els[e] );
			}
		}
	},
	delAllEviPalls: function(tipo){
		var els = SETS.children;
		for(e=els.length-1;e>=0;e--){
			if(els[e].name.indexOf(tipo+' point: ')==0){
				SETS.remove( els[e] );
			}
		}
	},
	
	/* FUNZIONI DERIVATE */
	_caricaScheda: function( args ){
		if( args.classe != 'tab_punti' && args.classe != SCHEDA.classeAperta)SET.pMod = -1;
	},
	_scaricaScheda: function(){
		SET.pMod = -1;
	},
	_scaricaSet: function(){
		SET.spegniMeridianoSecondario();
	},
	_scaricaModello: function(){
		//
	},
	_torna: function( args ){
		if(typeof(args.daCarica) == 'undefined')SET.pMod = -1;
	},
	filtraSet: function(){
		var vis = true;
		if(DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())vis = false;
		for(let m in SETS.children){
			if(SET.MERIDIANI_free.indexOf(SETS.children[m].name.split("_")[1])==-1)SETS.children[m].visible = vis;
		}
		var ME = document.getElementById("lista_meridiani").getElementsByClassName("listaMeridiani")[0].getElementsByTagName("div");
		for(let m in ME){
			if(ME[m].id){
				if(!vis && ME[m].id!='pLR'){
					ME[m].classList.add("lockedItem");
				}else{
					ME[m].classList.remove("lockedItem");
				}
			}
		}
	}
}