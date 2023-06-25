
SET = {
	
	// VARIABILI
	INTERSECTED: null,
	P: [],
	PT: [],
	LN: [],
	AR: [],
	GD: [],
	FR: [],
	time: 0,
	pulse: 1,
	ptSel: null,
	eviPoint1: '',
	eviPoint2: '',
	diffX: 0,
	diffY: 0,
	mAtt: '',
	tmChiusura: null,
	puntiEvidenziati: [],
	pMod: -1,
	pointEvi: '',
	meridianiOn: false,
	geometryPallino: null,
	geometryPallinoTrasp: null,
	idTeoMeridiani: 2,
	allMeridiansFree: true,
	
	// FUNZIONI
	_init: function(){
		if(!localStorage.sistemaMeridiani){
			localStorage.sistemaMeridiani = "";
			localStorage.sistemaMeridianiAdd = "";
		}
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
				
				var categoria=__(MERIDIANI[m].categoria);
				var vis = true;
				if(categoria!=localStorage.sistemaMeridiani)vis = false;
				this.LN[m].userData.categoria=categoria;
				
				var LNS=MERIDIANI[m][modelloAperto].linee;
				if(LNS){
					for(l in LNS){ // aggiungo le linee
						var loader = new THREE.ObjectLoader();
						var mesh =  loader.parse(JSON.parse(LZString.decompressFromBase64(LNS[l].obj)));
						var intAdd='';
						if(LNS[l].interno)intAdd='Int';
						if(!MERIDIANI[m].yin){
							mesh.material=this.MAT["lineYang"+intAdd];
						}else{
							mesh.material=this.MAT["lineYin"+intAdd];
							mesh.computeLineDistances();
						}
						mesh.userData.interno=LNS[l].interno;
						this.LN[m].add( mesh );
					}
				}
				this.LN[m].visible = vis;
				this.LN[m].userData.categoria = categoria;
				SETS.add( this.LN[m] );
				var ARS = MERIDIANI[m][modelloAperto].aree;
				if(ARS){
					var n=-1;
					this.AR[m] = new THREE.Group();
					this.AR[m].name="AR_"+m;
					var elemento = MERIDIANI[m].elemento;
					var col = SET.colsElementi[elemento];
					for(a in ARS){ // aggiungo le aree
						var loader = new THREE.ObjectLoader();
						var mesh = loader.parse(JSON.parse(LZString.decompressFromBase64(ARS[a].obj)));
						mesh.material = cloneMAT(this.MAT.areas);
						mesh.material.emissive = new THREE.Color( col );
						mesh.userData.raycastable = true;
						this.AR[m].add( mesh );
					}
					this.AR[m].visible = vis;
					this.AR[m].userData.categoria = categoria;
					SETS.add( this.AR[m] );
				}
				
				
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
						this.GD[m].visible = vis;
						this.GD[m].userData.categoria = categoria;
						SETS.add( this.GD[m] );
					}
				}
				
				
				var n=-1;
				var FRC = __(MERIDIANI[m][modelloAperto].frecce,[]);
				if(FRC){
					if(FRC.length){
						this.FR[m] = new THREE.Group();
						this.FR[m].name="FR_"+m;
						for(l in FRC){ // aggiungo le guide
							
							var loader = new THREE.ObjectLoader();
							var mesh =  loader.parse(JSON.parse(LZString.decompressFromBase64(FRC[l].obj)));
							mesh.material = this.MAT.lineFrecce;
							mesh.visible = false;
							this.FR[m].add( mesh );
							
						}
						this.FR[m].visible = true;
						SETS.add( this.FR[m] );
					}
				}
				
				this.PT[m] = new THREE.Group();
				this.PT[m].name="PT_"+m;
				// carico i punti parametrizzati
				var n=-1;
				var PTS=MERIDIANI[m][modelloAperto].punti;
				
				for(let p in PTS){
					if(PTS[p]!=''){
						var x=PTS[p].array[0];
						var y=PTS[p].array[1];
						var z=PTS[p].array[2];
						var pN = PTS[p].nome.split(".");
						var N = pN[1];
						
						var nome = PTS[p].nome.split(" ")[0];
						if((pN[0]=='GV' || pN[0]=='CV') && nome.substr(nome.length-1,1)!='.')nome += '.CC';
						// pallino colorato
						n++;
						this.P[n] = new THREE.Mesh( this.geometryPallino, this.MAT.pointBase );
						this.P[n].position.set(x,y,z);
						this.P[n].name=nome;
						this.P[n].userData.hidden = __(PTS[p].hidden,false);
						this.P[n].visible = !__(PTS[p].hidden,false);
						this.PT[m].add( this.P[n] );
							
						// pallino trasparente
						n++;
						this.P[n] = new THREE.Mesh( this.geometryPallinoTrasp, this.MAT.pointTrasp ); 
						this.P[n].position.set(x,y,z);
						this.P[n].name='_'+nome
						this.P[n].userData.raycastable = true;
						this.PT[m].add( this.P[n] );
					}
				}
				this.PT[m].visible=vis;
				this.PT[m].userData.categoria = categoria;
				SETS.add( this.PT[m] );
			}
		}
		
		if(!localStorage.sistemaSigleMeridiani)localStorage.sistemaSigleMeridiani="INT";
		var contPulsanti = 	'<span class="menuElenchi" onclick="MENU.visMM(\'btnCarMapMenu\');"></span>' +
							'<span id="btnCarMapMenu" class="btn_meridiani_shiatsu titolo_set">' +
							'<span>ShiatsuMap</span>' +
							'<i class="elMenu" id="chiudiSet" onClick="chiudiSet();" title="'+htmlEntities(TXT("ChiudiSet"))+'"><span>' +
								htmlEntities(TXT("ChiudiSet")) +
							'</span></i><i class="elMenu" id="impostazioniSet" onClick="MENU.visImpset();" title="'+htmlEntities(TXT("ImpostazioniSet"))+'"><span>' +
								htmlEntities(TXT("ImpostazioniSet")) +
							'</span></i>' +
							'<i class="elMenu" id="help_set" onClick="GUIDA.visFumetto(\'guida_set\',true,true);">?</i></span>';
		var contElenco = '';
		
		contPulsanti += '<div id="pulsante_modello" onClick="cambiaModello(\'donna\');">'+TXT("ApriModello3D")+'</div>';
		// meridiani
		contPulsanti += '<div id="pulsante_meridiani" class="frdx" onClick="SCHEDA.selElenco(\'meridiani\');">'+TXT("Meridiani")+'</div>';
		contElenco += '<div id="lista_meridiani"></div>';
		
		
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
		
		contIcona = '<div id="p_set" onClick="SCHEDA.apriElenco(\'set\',true);"><svg viewBox="0 0 12 48"><polygon points="5,24 12,13 12,35"></polygon></svg><i>'+htmlEntities(TXT("ShiatsuMap"))+'</i></div>';;
		
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
		
		
		
		DB.set.patologie = clone(DB.set.patologie_model);
		
		DB.set.patologie.sort(sort_by("NomePatologia"));
		
		manichinoCaricato = true;
		SET.componiPatologie();
		SET.caricaMeridiani();
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
		if(smartMenu)overInterfaccia=true;
		
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
		if(manichinoCaricato && !raycastDisable && !controlsM._ZPR && !controlsM._premuto){// roll-over sui punti
			SET.meridianiOn = true;
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
						SETS.children[i].name.substr(0,2)!='GD' &&
						SETS.children[i].name.substr(0,2)!='FR'){
						var intersects = raycaster.intersectObjects( SETS.children[i].children );
						if ( intersects.length > 0 ) { // roll-over
							for(l in intersects)ints.push(intersects[l]);
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
							for(l in intersects){
								if(intersects[l].object.name.indexOf("NERVO")==-1){
									ints.push(intersects[l]);
								}
							}
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
			SET.desIntersected();
			if(objOver){
				
				this.INTERSECTED = objOver;
				if(this.INTERSECTED.name.substr(0,1)=='_'){
					var n1=objOver.name.substr(1,2); // meridiano intersecato
					var pt=this.INTERSECTED.name.substr(4,2)
					var pN = this.INTERSECTED.name.split(".");
					var tt = (pN[1]*1)+"."+SET.convSigla(pN[0].substr(1,2));
					if(n1=='NK'){
						tt = DB.set.meridiani.NK.punti[(this.INTERSECTED.name.substr(4,2))*1-1].NomePunto;
					}
					
					visToolTip(tt);
					renderer.domElement.style.cursor='pointer';
					if(	(n1!='NK' && !MERIDIANI[n1].meridianoAcceso) ||
						(n1=='NK' && MERIDIANI[n1].meridianoAcceso!=pt) )this.coloraMeridiano(this.INTERSECTED.name.substr(1,5),'Over','Over');
				}
				if(this.INTERSECTED.name.substr(2,4)=='_mas'){
					var n1 = this.INTERSECTED.name.substr(0,2);
					for(let c in DB.set.teoria[SET.idTeoMeridiani].contenuti){
						if(n1 == DB.set.teoria[SET.idTeoMeridiani].contenuti[c].sigla)visToolTip(DB.set.teoria[SET.idTeoMeridiani].contenuti[c].TitoloTeoria);
					}
					if(!MERIDIANI[n1+"_mas"].meridianoAcceso)this.coloraMeridiano(n1,'Over','Over');
					renderer.domElement.style.cursor='pointer';
				}
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
		}
		return make;
	},
	setPulsePt: function( pt, pulse, op, mat='' ){
		var pP = pt.name.split(".");
		var els = scene.getObjectByName("PT_"+pP[0]).children;
		for(e in els){
			if(els[e].name.indexOf(pP[0]+"."+pP[1]+".")==0){
				els[e].scale.set(pulse,pulse,pulse);
				if(mat)els[e].material=mat;
			}
		}
		SET.MAT.pointSel.setValues( { opacity: op } );
	},
	desIntersected: function(){
		var n='';
		if(this.INTERSECTED){
			if(this.INTERSECTED.name.substr(0,1)=='_'){
				var n=this.INTERSECTED.name.substr(1,2); // meridiano 
				var p=this.INTERSECTED.name.substr(4,2); // punto 
				if( (n!='NK' && !__(MERIDIANI[n].meridianoAcceso,false)) || 
					(n=='NK' && MERIDIANI[n].meridianoAcceso!=p) )this.coloraMeridiano(this.INTERSECTED.name.substr(1,5),'','Base', true);
			}
			if(this.INTERSECTED.name.substr(2,4)=='_mas'){
				n = this.INTERSECTED.name.substr(0,2);
				if(!__(MERIDIANI[n+"_mas"].meridianoAcceso,false))this.coloraMeridiano(n,'','Base', true);
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
	_onClick: function( e ){
		var btn=0;
		if(!touchable)btn=e.button;
		if(!btn && !raycastDisable && ((controlsM.xIni==controlsM.xEnd && controlsM.yIni==controlsM.yEnd) || touchable)){
			
			if(this.INTERSECTED){
				if(!touchable){
					controlsM._inMovimento=true;
					controlsM._ZPR=true;
					controlsM._MM=false;
				}
				if(this.INTERSECTED.name.substr(0,1)=='_'){
					var n=this.INTERSECTED.name.split("_");
					var ritorno = '';
					if(SCHEDA.classeAperta && SCHEDA.classeAperta!='tab_punti')ritorno = 'SET.chiudiPunto(true)';
					SET.apriPunto(n[1],ritorno, this.INTERSECTED);
				}
				if(this.INTERSECTED.name.substr(2,4)=='_mas'){
					var n1 = this.INTERSECTED.name.substr(0,2);
					if(!MERIDIANI[n1].meridianoAcceso)this.accendiMeridiano(n1,true);
					controlsM._ZPR = false;
				}
			}
		}
		controlsM.xIni=-1;
		controlsM.xEnd=-1;
		controlsM.yIni=-1;
		controlsM.yEnd=-1;
	},
	apriPunto: function( PT_name, ritorno='', el='' ){
		if(localStorage.sistemaMeridiani=='MAS'){
			var sm = '';
			if(PT_name.substr(0,2)=='NK')sm = 'NMK';
			SET.cambiaSistema(sm,true);
			localStorage.sistemaMeridiani = sm;
			localStorage.sistemaMeridianiAdd = sm;
		}
		if(this.ptSel){
			var mat=this.MAT.pointOn;
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			SET.setPulsePt( this.ptSel, 1, 1, mat );
			var pP = this.ptSel.name.split(".");		
			var siglaMeridiano = pP[0];
			var nPunto = parseInt(pP[1])-1;
			if(document.getElementById("pt_"+(nPunto+1)+"_"+siglaMeridiano))document.getElementById("pt_"+(nPunto+1)+"_"+siglaMeridiano).classList.remove("selElPt");
		}
		if(this.MAT.pointSel)SET.chiudiPunto(true,true);
		var pP = PT_name.split(".");		
		var siglaMeridiano = pP[0];
		var nPunto = parseInt(pP[1])-1;

		if(!scene.getObjectByName( PT_name )){
			if(scene.getObjectByName( PT_name + "." )){
				PT=scene.getObjectByName( PT_name + "." );
			}else if(scene.getObjectByName( PT_name + ".SX" )){
				PT=scene.getObjectByName( PT_name + ".SX" );
			}else if(scene.getObjectByName( PT_name + ".DX" )){
				PT=scene.getObjectByName( PT_name + ".DX" );
			}else if(scene.getObjectByName( PT_name + ".CC" )){
				PT=scene.getObjectByName( PT_name + ".CC" );
			}
		}else PT=scene.getObjectByName( PT_name );

		if(this.ptSel && !SCHEDA.schedaAperta)this.chiudiPunto();
		this.ptSel=PT;
		var pP = this.ptSel.name.split(".");
		
		if(!ritorno)this.accendiMeridiano(pP[0]);
		if(document.getElementById("pt_"+(nPunto+1)+"_"+siglaMeridiano))document.getElementById("pt_"+(nPunto+1)+"_"+siglaMeridiano).classList.add("selElPt");
		var matTxt = "this.MAT.pointSel";
		if(PT.userData.nota)matTxt = "this.MAT.pointSelNote";
		if(this.ptSel.userData.interno)matTxt += "Int";
		var mat = eval(matTxt);
		this.diffX = this.ptSel.position.x*1;
		this.diffY = this.ptSel.position.y*1;
		
		var els = scene.getObjectByName("PT_"+siglaMeridiano).children;
		for(e in els){
			if(els[e].name.indexOf(pP[0]+"."+pP[1]+".")==0)els[e].material=mat;
		}
		if(frs = scene.getObjectByName("FR_"+siglaMeridiano)){
			var els = frs.children;
			for(e in els){
				if(els[e].name == "FR."+pP[1])els[e].visible = true;
			}
		}

		var x2 = 0-this.ptSel.position.x;
		var y2 = 0-this.ptSel.position.y;
		var z2 = 0-this.ptSel.position.z;
		panEndZero = { x: x2, y: y2, z: z2 };
		
		// panEnd muove manichinoCont
		// panEndZero muove manichino
		
		if(SCHEDA.aggancio.tipo=='libera' && el){
			this.ptSel.updateMatrixWorld();
			var vector = this.ptSel.geometry.vertices[i].clone();
			vector.applyMatrix4( this.ptSel.matrixWorld );
			panEnd = { x: vector.x, y: vector.y, z: vector.z };
		}else panEnd = { x: 0, y: 0, z: 0 };
		
		
		if(!el){
			// posiziono
			if(MERIDIANI.posizioni[SET.ptSel.name]){
				var pos = MERIDIANI.posizioni[SET.ptSel.name];
				normalizeRotation();
				rotateEnd = { x:pos.x, y:pos.y, z:0 };
			}
			if(smothingView){
				if(manichinoCont.position.z<15)zoomEnd = 15;
				normalizeRotation();
			}
		}
		SET.delEviPalls(siglaMeridiano,pP[1],'Over');
		SET.addEviPalls(siglaMeridiano,pP[1],'Select');
		this.pulse = 1;
		
		SET.caricaPunto( siglaMeridiano, nPunto, ritorno );
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
		var pP = this.ptSel.name.split(".");
		var siglaMeridiano = pP[0];
		var nPunto = pP[1];
		if(siglaMeridiano == "NK")MERIDIANI['NK'].meridianoAcceso = false;
		this.pulse=0;
		var mat=this.MAT.pointBase;
		if(MERIDIANI[pP[0]].meridianoAcceso)mat=this.MAT.pointSel;
		if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
		SET.delEviPalls(siglaMeridiano,nPunto,'Select');
		
		// coloro tutti gli altri punti non SX o DX o CC
		var els = scene.getObjectByName("PT_"+siglaMeridiano).children;
		for(e in els){
			if(els[e].name.indexOf(pP[0]+"."+pP[1]+".")==0){
				els[e].material=mat;
				els[e].material.opacity=1;
				els[e].scale.set(1,1,1);
			}
		}
		if(frs = scene.getObjectByName("FR_"+siglaMeridiano)){
			var evids = clone(SET.puntiEvidenziati);
			for(let e in evids){
				evids[e] = evids[e].split(".")[0]+"."+evids[e].split(".")[1];
			}
			var els = frs.children;
			for(let e in els){
				var sigla = els[e].name.split(".")[1]*1+"."+siglaMeridiano;
				if(els[e].name == "FR."+pP[1] && evids.indexOf(sigla)==-1)els[e].visible = false;
			}
		}
		
		this.ptSel=null;
		if(document.getElementById("pt_"+(pP[1]*1)+"_"+pP[0]))document.getElementById("pt_"+(pP[1]*1)+"_"+pP[0]).classList.remove("selElPt");
		if(SCHEDA.scheda2Aperta){
			nonChiudereScheda=true;
			document.getElementById("scheda_ritorno").click();
		}
		if(!nonChiudereScheda){
			SCHEDA.scaricaScheda(); 
		}
		
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
	coloraMeridiano: function( cod, matLine, matPoint, forza=false ){
		var siglaMeridiano = cod.substr(0,2);
		var siglaPunto = cod.split(".")[1];
		if(matPoint=='Base' && SET.ptSel && MERIDIANI[siglaMeridiano].meridianoAcceso && !forza)return;
		if(controlsM._premuto && !forza)return;
		var SM = siglaMeridiano.replace(localStorage.sistemaMeridianiAdd,"") + localStorage.sistemaMeridianiAdd;
		
		if(siglaMeridiano=='NK'){
			var els = this.PT[siglaMeridiano].children;
			for(let v in els){
				if(	els[v].name.substr(3,2)==siglaPunto && 
					(!SET.ptSel || els[v].name.substr(0,5)!=SET.ptSel.name.substr(0,5)) ){
						
					var mat = matPoint;
					try{
						if(els[v].userData.nota)mat="Note";
					}catch(err){}
					els[v].material = this.MAT["point"+mat]; // cambiare se NOTA
					els[v].scale.set(1,1,1);
				}
			}
			return;
		}
		
		if(this.PT[SM]){
			var els = this.PT[SM].children;
			for(let v in els){
				if(els[v].name.substr(0,1)!='_' && 
					(!SET.ptSel || els[v].name.substr(1,5)!=SET.ptSel.name.substr(1,5))){
					var mat = matPoint;
					try{
						if(els[v].userData.nota)mat="Note";
					}catch(err){}
					els[v].material = this.MAT["point"+mat]; // cambiare se NOTA
					els[v].scale.set(1,1,1);
				}
			}
		}
		if(this.AR[SM]){
			var els = this.AR[SM].children;
			for(v in els){
				var op = 0.2;
				if(matPoint=='Over')op = 0.4;
				if(matPoint=='On')op = 0.6;
				els[v].material.opacity = op;	
			}
		}
		
		var els = this.LN[SM].children;
		var Y='Yang';
		if(MERIDIANI[SM].yin)Y='Yin';
		if(matPoint=='On')Y='';
		for(v in els){
			var int='';
			if(els[v].userData.interno)int='Int';
			els[v].material = eval('SET.MAT.line'+Y+int+matLine);
		}
	},
	scoloraMeridiani: function(){
		for(let m in MERIDIANI){
			//if(!__(MERIDIANI[m].meridianoAcceso,false) && m.indexOf("_")==-1){
			pass = false;
			if(!__(MERIDIANI[m].meridianoAcceso,false))pass=true;
			if(localStorage.sistemaMeridiani && m.indexOf(localStorage.sistemaMeridianiAdd)==-1)pass=false;
			if(pass){
				this.coloraMeridiano(m,'','Base');
			}
		}
	},
	accendiMeridiano: function( siglaMeridiano, g=false ){
		// verifico le autorizzazioni
		if(!globals.modello.cartella)return;
		if(!SET.verFreeMeridiani(siglaMeridiano) && !SET.allMeridiansFree){
			ALERT(TXT("MsgFunzioneSoloPay"),true,true);
			controlsM._MM = true;
			return;
		}
		// --------------------------
		if(siglaMeridiano == "NK"){
			MERIDIANI['NK'].meridianoAcceso = this.ptSel.name.split(".")[1];
			return;
		}
		/*if(	g && localStorage.sistemaMeridiani=='NMK' ){
			SET.cambiaSistema( 'MAS', false, true );
			setTimeout(function(){
				SET.evidenziaMeridiani(document.getElementById("scheda_testo").innerHTML,true);
				//SET.accendiMeridiano(siglaMeridiano, g);
			},200,siglaMeridiano,g);
		}*/
		if(localStorage.sistemaMeridiani=='NMK')return;
		var SM = siglaMeridiano + localStorage.sistemaMeridianiAdd;
		if(!g || (g && this.ptSel)){
			for(let m in MERIDIANI){
				if(MERIDIANI[m].categoria = localStorage.sistemaMeridiani){
					var pass=true;
					if(g && this.ptSel){
						if(siglaMeridiano==m)pass=false;
					}
					if(pass){
						document.getElementById("p"+m).classList.remove("elencoSel");
						document.getElementById("sm"+m).classList.remove("elencoSel");
						this.coloraMeridiano(m,'','Base', true);
						MERIDIANI[m+localStorage.sistemaMeridianiAdd].meridianoAcceso=false;
					}
				}
			}
		}
		if(g && this.ptSel)this.chiudiPunto();
		if(!MERIDIANI[SM].meridianoAcceso || !g){
			document.getElementById("p"+siglaMeridiano).classList.add("elencoSel");
			document.getElementById("sm"+siglaMeridiano).classList.add("elencoSel");
			MERIDIANI[SM].meridianoAcceso=true;
			var yinAdd = '';
			if(localStorage.sistemaMeridiani && MERIDIANI[SM].yin)yinAdd = 'Yin';
			this.coloraMeridiano(siglaMeridiano,'On'+localStorage.sistemaMeridiani+yinAdd+'["'+MERIDIANI[SM].elemento+'"]','On');
			if(document.getElementById("tr_p"+siglaMeridiano)){
				document.getElementById("tr_p"+siglaMeridiano).classList.add("p_"+MERIDIANI[SM].elemento);
			}
		}else{
			document.getElementById("p"+siglaMeridiano).classList.remove("elencoSel");
			document.getElementById("sm"+siglaMeridiano).classList.remove("elencoSel");

			if(touchable)this.coloraMeridiano(siglaMeridiano,'', 'Base');
			else this.coloraMeridiano(siglaMeridiano,'Over', 'Over');
			MERIDIANI[SM].meridianoAcceso=false;
			if(document.getElementById("tr_p"+siglaMeridiano)){
				document.getElementById("tr_p"+siglaMeridiano).classList.remove("p_"+MERIDIANI[SM].elemento);
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
			SET.swContrastMethod(true);
		}
	},
	spegniMeridiano: function( siglaMeridiano ){
		var SM = siglaMeridiano + localStorage.sistemaMeridianiAdd;
		if(this.ptSel)this.chiudiPunto();
		document.getElementById("p"+siglaMeridiano).classList.remove("elencoSel");
		document.getElementById("sm"+siglaMeridiano).classList.remove("elencoSel");
		this.coloraMeridiano(siglaMeridiano,'','Base');
		MERIDIANI[SM].meridianoAcceso=false;
	},
	spegniMeridiani: function(forza=false){
		if(SCHEDA.scheda2Aperta || !forza)return;
		if(SCHEDA.scheda2Aperta || forza){
			for(let m in MERIDIANI){
				if(MERIDIANI[m].meridianoAcceso){
					var mer = m.substr(0,2);
					
					SET.accendiMeridiano(mer,true);
					SET.coloraMeridiano(mer,'','Base');
				}
			}
		}
	},
	_applyLineMethod: function(){
		for(let m in MERIDIANI){
			if(MERIDIANI[m].meridianoAcceso && MERIDIANI[m].categoria == localStorage.sistemaMeridiani){
				var yinAdd = '';
				if(localStorage.sistemaMeridiani && MERIDIANI[m].yin)yinAdd = 'Yin';
				this.coloraMeridiano(m,'On'+localStorage.sistemaMeridiani+yinAdd+'["'+MERIDIANI[m].elemento+'"]','On');
			}
		}
	},
	swContrastMethod: function(n=SET.COL.contrastMethod){
		SET.COL.contrastMethod=n ? false : true;
		if(SET.COL.contrastMethod){
			SET.MAT.lineYang.opacity = SET.MAT.opLineContr;
			SET.MAT.lineYin.opacity = SET.MAT.opLineContr;
			SET.MAT.pointBase.opacity = SET.MAT.opPointContr;
		}else{
			SET.MAT.lineYang.opacity = SET.MAT.opLine;
			SET.MAT.lineYin.opacity = SET.MAT.opLine;
			SET.MAT.pointBase.opacity = SET.MAT.opPoint;
		}
		SET._setLineMaterials();
		SET._applyLineMethod();
	 	MODELLO.op('Pelle',MODELLO.opAtt);
		if(SET.COL.contrastMethod)document.getElementById("p_contrasto").classList.add("btnSel");
		else document.getElementById("p_contrasto").classList.remove("btnSel");
	},
	scriviPunto: function( punto, esteso=false, noRet=false, sigla=false, siglaMeridiano=false ){
		var pT = punto.split(".");
		var siglaPunto = pT[0]+"."+pT[1];
		var siglaPuntoOr = siglaPunto;
		var nomePunto = punto.substr(siglaPunto.length+1,Object.keys(punto).length-(siglaPunto.length+1));
		if(sigla)siglaPunto = sigla;
		if(siglaMeridiano=='NK')siglaPunto = '';
		var nPunto = SET.punto2string(pT[0]);
		var html = '<a class="pallinoPat';
		if(esteso)html += ' pallinoPatEsteso';
		var ret = '';
		if(!noRet)ret = SET.chiudiPunto(true);
		html += '" onClick="SET.apriPunto(\''+pT[1]+"."+nPunto+'\',\''+ret+'\');"';
		if(noRet)html += '  onMouseOver="SET.overPunto(this,true);"' +
						 '  onMouseOut="SET.overPunto(this,false);"' +
						 '	id="pt_'+siglaPuntoOr.replace('.','_')+'"';
		html += '> '+siglaPunto;//+' ';
		if(esteso)html+='<i>'+nomePunto;
		html+='</i></a>';
		return html;
	},
	selPunto: function( nPunto, siglaMeridiano, N='', el=null ){
		var rit = 10;
		if(	(siglaMeridiano=='NK' && localStorage.sistemaMeridiani!='NMK') || 
			(siglaMeridiano!='NK' && localStorage.sistemaMeridiani=='NMK') || 
			(localStorage.sistemaMeridiani=='MAS') ){
			if(el){
				while(!el.classList.contains("schedaSpecifica") && el.id!="scheda_testo")el = el.parentElement;
				SET.evidenziaPat(el);
			}else{
				
				SET.cambiaSistema( (siglaMeridiano=='NK')?"NMK":"", true, true );
			}
			rit = 500;
		}
		
		var nPunto = SET.punto2string(nPunto);
		// verifico le autorizzazioni
		if(!SET.verFreeMeridiani(siglaMeridiano)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		setTimeout(function(){
			if(	document.getElementById("scheda").classList.contains("scheda_A") || 
				document.getElementById("scheda").classList.contains("scheda_B")){
				if(!N){
					PAZIENTI.caricaPuntiTrattamento();
					PAZIENTI.caricaMeridianiTrattamento();
				}else PAZIENTI.caricaNamikoshiTrattamento();
			}
			SET.apriPunto(siglaMeridiano+"."+nPunto,'SET.chiudiPunto(true);');
		}, rit, N);
	},
	selPuntoMod: function( p, N='' ){
		SET.pMod = p;
		var nPunto = document.getElementById("formMod")[N+"pt_"+p].value;
		var siglaMeridiano = document.getElementById("formMod")[N+"mr_"+p].value;
		SET.selPunto( nPunto, siglaMeridiano, N );
	},
	setPuntoFrm: function(){
		var ptP = SET.ptSel.name.split(".");
		if( SCHEDA.classeAperta == 'scheda_procedura' ){
			SET.dettagliProvvisori[SET.pMod].DescrizioneDettaglio = (ptP[1]*1)+"."+ptP[0];
			SET.caricaDettagli();
		}
		if( SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B' ){
			PAZIENTI.puntiProvvisori[SET.pMod].n = ptP[1]*1;
			PAZIENTI.puntiProvvisori[SET.pMod].m = ptP[0];
			PAZIENTI.caricaPuntiTrattamento();
		}
		SET.pMod = -1;
		SCHEDA.torna();
		SCHEDA.formModificato = true;
	},
	evidenziaPat: function( el ){
		if(el.classList.contains("eviPoints"))return;
		var elEvi = document.querySelector(".eviPoints");
		if(elEvi)elEvi.classList.remove("eviPoints");
		el.classList.add("eviPoints");
		var sistemaVer = localStorage.sistemaMeridiani;
		if(sistemaVer=='MAS')sistemaVer = '';
		if(sistemaVer != el.dataset.sistema)SET.cambiaSistema( el.dataset.sistema, true, true );
		SET.evidenziaPunto( el/*.innerHTML*/ );
		setTimeout(function(){SET.evidenziaMeridiani( el.innerHTML );},300);
	},
	evidenziaPunto: function( el = document.getElementById("scheda_testo")/*html*/ ){
		SET.annullaEvidenziaPunto();
		var els = el.getElementsByClassName("pallinoPat");
		for(let p=0;p<els.length;p++){
			var siglaMeridiano = els[p].dataset.siglaMeridiano;
			var nPunto = SET.punto2string(els[p].dataset.nPunto);
			var el = scene.getObjectByName("PT_"+siglaMeridiano);
			if(el){
				for(let e in el.children){
					if(el.children[e].name.indexOf("_"+siglaMeridiano+"."+nPunto+".")==0)el.children[e].material=SET.MAT.pointEvi;
				}
			}
			var el = scene.getObjectByName("FR_"+siglaMeridiano);
			if(el){
				for(let e in el.children){
					if(el.children[e].name == "FR."+nPunto )el.children[e].visible=true;
					if(el.children[e].name == "FR."+nPunto )el.children[e].material=SET.MAT.lineFrecceEvi;
				}
			}
			SET.puntiEvidenziati.push(nPunto+"."+siglaMeridiano);
		}
		SET.settaOverPunto();
	},
	evidenziaMeridiani: function( html, noSpegni=false ){
		if(localStorage.sistemaMeridiani == 'NMK')return;
		if(!noSpegni)SET.spegniMeridiani(true);
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
			var pP=elenco[k].split(".");
			var nPunto=SET.punto2string(pP[0]);
			var mat = SET.MAT.pointEvi;
			if(pP[2]){
				if(pP[2]=='V')mat = SET.MAT.pointVuoto;
				if(pP[2]=='P')mat = SET.MAT.pointPieno;
				if(pP[2]=='D')mat = SET.MAT.pointDolore;
			}
			siglaMeridiano = pP[1];
			var el = scene.getObjectByName("PT_"+siglaMeridiano)
			if(el){
				for(e in el.children){
					if(el.children[e].name.indexOf("_"+siglaMeridiano+"."+nPunto+".")==0)el.children[e].material=mat;
				}
			}
			var el = scene.getObjectByName("FR_"+siglaMeridiano);
			if(el){
				for(e in el.children){
					if(el.children[e].name == "FR."+nPunto )el.children[e].visible=true;
					if(el.children[e].name == "FR."+nPunto )el.children[e].material=SET.MAT.lineFrecceEvi;
				}
			}
			SET.puntiEvidenziati.push(elenco[k]);
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
				var pP=pT.split(".");
				var nPunto=SET.punto2string(pP[0]);
				siglaMeridiano = pP[1];
				
				var el = scene.getObjectByName("PT_"+siglaMeridiano)
				if(el){
					for(e in el.children){
						if(el.children[e].name.indexOf("_"+siglaMeridiano+"."+nPunto+".")==0)el.children[e].material=SET.MAT.pointTrasp;
					}
				}
				var el = scene.getObjectByName("FR_"+siglaMeridiano);
				if(el){
					for(e in el.children){
						if(el.children[e].name == "FR."+nPunto )el.children[e].visible=false;
						if(el.children[e].name == "FR."+nPunto )el.children[e].material=SET.MAT.lineFrecce;
					}
				}
			}
			SET.puntiEvidenziati = [];
		}
	},
	settaOverPunto: function(){
		if(!touchable){
			var els = document.getElementById("scheda_testo").getElementsByClassName("pallinoPat");
			for(e in els){
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
			SET.overPunto(document.getElementById("rg"+p),false);
			var elenco = [];
			var els = document.getElementById(id).getElementsByClassName("dettPunto");
			var tot = els.length;
			for(e=0;e<tot;e++){
				var sl = els[e].getElementsByTagName("select");
				if(sl.length){
					var mer = sl[0].value;
					var nPunto = SET.punto2string(sl[1].value);
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
			else nPunto = SET.punto2string(nPunto.value);
			if(mer)mer = mer.value;
			if(!__(DB.set.meridiani[mer]))return; // in caso di EX
			if(typeof(DB.set.meridiani[mer])=='undefined')return;
		}else{
			if(!el.dataset.siglaMeridiano)return;
			var nPunto = SET.punto2string(el.dataset.nPunto);
			var mer = el.dataset.siglaMeridiano;
		}
		
		if(	(mer=='NK' && localStorage.sistemaMeridiani!='NMK') || 
			(mer!='NK' && localStorage.sistemaMeridiani=='NMK') )return;	
		
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
		if(localStorage.sistemaSigleMeridiani=='INT' || !localStorage.sistemaSigleMeridiani)return siglaMeridiano;
		for(let m in DB.mtc.meridiani){
			if(siglaMeridiano == DB.mtc.meridiani[m].sigle[localStorage.sistemaSigleMeridiani])return m;
		}
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
			var pP = pts[p].split(".");
			str = str.replace(pts[p], pP[0]+"."+SET.convSigla(pP[1].substr(0,2))+pP[1].substr(2,1));
		}
		document.getElementById("scheda_testo"+nScheda).innerHTML = str;
		if(!nScheda){
			var str = document.getElementById("scheda_titolo"+nScheda).innerHTML;
			var pts = str.match(regexp);
			for(let p in pts){
				var pP = pts[p].split(".");
				str = str.replace(pts[p], pP[0]+"."+SET.convSigla(pP[1].substr(0,2))+pP[1].substr(2,1));
			}
			document.getElementById("scheda_titolo"+nScheda).innerHTML = str;
		}
	},
	convPuntiScheda: function( html ){
		// converte i punti di html in punti cliccabili e formattati
		var nScheda = '';
		if(SCHEDA.scheda2Aperta)nScheda='2';
		
		var regexp = /\[\.[0-9]{1,2}\.[A-Z]{2}\.\]/ig;
		var pts = html.match(regexp);
		for(let p in pts){
			var pP = pts[p].split(".");
			var siglaMeridiano = pP[2].substr(0,2);
			var n_P = pP[1];
			var n_M = SET.convSigla(siglaMeridiano)+pP[2].substr(2,1);
			var nascPunto = ' style="display:none;"';
			var els = scene.getObjectByName("PT_"+siglaMeridiano).children;
			for(e in els){
				if(els[e].name.indexOf(siglaMeridiano+"."+((n_P.length==1)?"0":"")+n_P+".")==0)nascPunto = '';
			}
			var name = n_P+'.'+n_M;
			if(siglaMeridiano=='NK')name = DB.set.meridiani[n_M].punti[n_P-1].NomePunto;
			html = html.replace(pts[p], '<span'+nascPunto+' class="pallinoPat" data-n-punto="'+n_P+'" data-sigla-meridiano="'+siglaMeridiano+'" onClick="SET.selPunto(\''+n_P+'\',\''+siglaMeridiano+'\',\'\',this);">'+name+'</span>');
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
										'	   data-sigla-meridiano="'+siglaMeridiano+'"' +
										'	   onClick="SET.accendiMeridiano(\''+siglaMeridiano+'\',true);"' +
										'	   onMouseOver="SET.eviMeridiano(\''+siglaMeridiano+'\',true);"' +
										'	   onMouseOut="SET.eviMeridiano(\''+siglaMeridiano+'\',false);">'+htmlEntities(nome)+'</span>');
		}
		
		return html;
	},
	salvaImpSet: function(){
		localStorage.sistemaSigleMeridiani = document.getElementById("sceltaSigle").value;
		SET.cambiaSistema(document.getElementById("sceltaMeridiani").value);
		SET.caricaMeridiani();
		PAZIENTI.cambiaGZ(PAZIENTI.mezzoProvvisorio,true);
		MENU.chiudiImpSet();
	},
	popolaImpSet: function(){
		HTML_imp = 	
		/*
			// sistemi meridiani
			'<p><i>'+htmlEntities(TXT("SistemaMeridiani"))+':</i> ' +
			'<select id="sceltaMeridiani">' +
			'  <option value=""' +
			((localStorage.sistemaMeridiani=='' || !__(localStorage.sistemaMeridiani) )?' SELECTED':'') +
			'>'+htmlEntities(TXT("MeridianiCinesi"))+'</option>'+H.chr10 +
			'  <option value="MAS"' +
			((localStorage.sistemaMeridiani == 'MAS')?' SELECTED':'') +
			'>'+htmlEntities(TXT("MeridianiGiapponesi"))+'</option>'+H.chr10 +
			'  <option value="NMK"' +
			((localStorage.sistemaMeridiani == 'NMK')?' SELECTED':'') +
			'>'+htmlEntities(TXT("SistemaNamikoshi"))+'</option>'+H.chr10 +
			'</select></p>'+H.chr10 +*/
		
			// sistemi sigle
			'<p><i>'+htmlEntities(TXT("SistemaSigle"))+':</i> ' +
			'<select id="sceltaSigle" onChange="SET.popolaSigle();">';
		for(let k in DB.mtc.meridiani["BL"].sigle){
			HTML_imp += '  <option value="'+k+'"';
			if(localStorage.sistemaSigleMeridiani == k)HTML_imp += ' SELECTED';
			HTML_imp += '>'+k+'</option>'+H.chr10;
		}
		HTML_imp +=
			'</select></p>'+H.chr10 +
			'<div id="tbSigleMeridiani"></div>';
		
		var mzs = PAZIENTI.mezziSet.P;
		HTML_imp += '	<span class="separatorePulsanti"></span><div><i>'+htmlEntities(TXT("MezzoDefault"))+':</i></div><div id="tt_mezzival2">';
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
			if(m!='NK'){
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
		}
		HTML += '</table>';
		document.getElementById("tbSigleMeridiani").innerHTML = HTML;
		
		var els = document.getElementById("sceltaMeridiani").options;
		for(e in els){
			if(els[e].value == localStorage.sistemaMeridiani)document.getElementById("sceltaMeridiani").selectedIndex = e;
		}
		var els = document.getElementById("sceltaMeridianiElenco").options;
		for(e in els){
			if(els[e].value == localStorage.sistemaMeridiani){
				document.getElementById("sceltaMeridianiElenco").selectedIndex = e;
				document.getElementById("sceltaMeridianiElenco_smart").selectedIndex = e;
			}
		}
	},
	filtraSet: function( togliLoader=false ){
		var vis = true;
		if(	DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())vis = false;
		for(let m in SETS.children){
			var visMer = vis;
			if(	SET.MERIDIANI_free.indexOf(SETS.children[m].name.split("_")[1])!=-1 )visMer = true;
			if(SET.allMeridiansFree)visMer = true;
			if( SETS.children[m].userData.categoria != localStorage.sistemaMeridiani )visMer = false;
			if(	SETS.children[m].name.substr(0,2)=='AR' &&  localStorage.sistemaMeridiani=='MAS')visMer = true;
			if(	SETS.children[m].name.substr(0,2)=='FR')visMer = true;
			SETS.children[m].visible = visMer;
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
		var titPoints = TXT("Meridiani");
		if(localStorage.sistemaMeridiani=='NMK')titPoints = TXT("MappaPunti");
		document.getElementById("pulsante_meridiani").innerHTML = titPoints;
		if(SCHEDA.elencoSel=='meridiani')document.getElementById("elenchi_titolo").innerHTML = titPoints;
		
		if(togliLoader){
			var els = document.getElementById("sceltaMeridianiElenco").options;
			for(e in els){
				if(els[e].value == localStorage.sistemaMeridiani){
					document.getElementById("sceltaMeridianiElenco").selectedIndex = e;
					document.getElementById("sceltaMeridianiElenco_smart").selectedIndex = e;
				}
			}
			nasLoader();
		}
	},
	swSistemaMeridiani: function( el ){
		SET.cambiaSistema((localStorage.sistemaMeridiani)?"":"MAS",true,true);
		setTimeout(function(){SET.evidenziaMeridiani( el.innerHTML );},300);
	},
	cambiaSistema: function( sistema, loader=false, noClick=false ){
		if(localStorage.sistemaMeridiani == sistema)return;
		var t = t2 = 10;
		if(loader){
			visLoader('');
			t = 400;
			t2 = 200;
		}
		setTimeout(function(sistema){
			if(!noClick)document.getElementById("sc").click();
			SET.spegniMeridiani(true);
			localStorage.sistemaMeridiani = sistema;
			if(localStorage.sistemaMeridiani)localStorage.sistemaMeridianiAdd = "_"+localStorage.sistemaMeridiani.toLowerCase();
			else localStorage.sistemaMeridianiAdd = '';
			SET.filtraMeridiani();
			if(localStorage.sistemaMeridiani!='NMK'){
				var els = scene.getObjectByName("FR_NK").children;
				for(e in els){
					els[e].visible = false;
				}
			}
		},t2,sistema);
		setTimeout(function(loader){SET.filtraSet(loader);},t,loader);
		document.getElementById("sceltaMeridianiElenco").value = sistema;
		document.getElementById("sceltaMeridianiElenco_smart").value = sistema;
		document.getElementById("sceltaMeridianiElenco").blur();
		document.getElementById("sceltaMeridianiElenco_smart").blur();
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
	
	/* FUNZIONI DERIVATE */
	_caricaScheda: function( args ){
		if( args.classe != 'tab_punti' && args.classe != SCHEDA.classeAperta)SET.pMod = -1;
	},
	_scaricaScheda: function(){
		SET.pMod = -1;
	},
	_scaricaSet: function(){
		//
	},
	_scaricaModello: function(){
		//
	},
	_torna: function( args ){
		if(typeof(args.daCarica) == 'undefined')SET.pMod = -1;
	}
}