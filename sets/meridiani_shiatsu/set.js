
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
	btnSel: null, 
	grSel: '',
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
	meridianiOn: false,
	geometryPallino: null,
	geometryPallinoTrasp: null,
	allMeridiansFree: true,
	snd: null,
	
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
						if(m=='NK')mesh.material.opacity = 0.45;
						mesh.material.depthWrite = false;
						mesh.userData.hidden = false;
						mesh.userData.sostegno = false;
						if(mesh.name.indexOf("SS.")==0){
							mesh.userData.sostegno = true;
							mesh.material.emissive = new THREE.Color( SET.COL.areaSostegno );
						} 
						if(ARS[a].hidden){
							mesh.visible = false;
							mesh.userData.hidden = true;
						}
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
							mesh.material = cloneMAT(this.MAT.lineFrecce);
							mesh.visible = false;
							mesh.userData.mov = __(FRC[l].mov,false);
							this.FR[m].add( mesh );
							
						}
						this.FR[m].userData.categoria=categoria;
						this.FR[m].visible = vis;
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
						
						var pG = PTS[p].nome.split(" ");
						var nome = pG[0];
						var pN = nome.split(".");
						
						var gruppi = [];
						var label = '';
						if(pG.length>1){
							for(let g=1;g<pG.length;g++){
								let pattern = /\[[a-z]\]/g;	
								if(pattern.test(pG[g])){	
									gruppi.push(pG[g].substr(1,1));
								}
								let pattern2 = /\{[a-zA-Z_]+\}/g;	
								if(pattern2.test(pG[g])){	
									label = pG[g].substr(1,pG[g].length-2);
								}
							}
						}
						
						if(nome.indexOf('.CC')>-1)gruppi.push("z"); // centrale
						if(nome.indexOf('.SX')>-1)gruppi.push("y"); // sinistra
						if(nome.indexOf('.DX')>-1)gruppi.push("x"); // destra
						
						if((pN[0]=='GV' || pN[0]=='CV') && nome.substr(nome.length-1,1)!='.')nome += '.CC';
						// pallino colorato
						n++;
						this.P[n] = new THREE.Mesh( this.geometryPallino, this.MAT.pointBase );
						this.P[n].position.set(x,y,z);
						this.P[n].name=nome;
						this.P[n].userData.gruppi=gruppi;
						this.P[n].userData.hidden = gruppi.indexOf("h")>-1;
						this.P[n].userData.posPoint = gruppi.indexOf("w")>-1;
						this.P[n].visible = gruppi.indexOf("h")===-1;
						this.PT[m].add( this.P[n] );
							
						// pallino trasparente
						n++;
						this.P[n] = new THREE.Mesh( this.geometryPallinoTrasp, this.MAT.pointTrasp ); 
						this.P[n].position.set(x,y,z);
						this.P[n].name='_'+nome
						this.P[n].userData.gruppi=gruppi;
						this.P[n].userData.hidden = gruppi.indexOf("h")>-1;
						this.P[n].userData.raycastable = true;
						if(label)this.P[n].userData.label = label;
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

		// scelta sistema
		contPulsanti += '<p class="sistemaMeridiani_p"><span class="selectCambioMeridiani"><i>'+htmlEntities(TXT("SistemaMeridiani"))+':</i><select class="sceltaMeridianiElenco" onChange="SET.cambiaSistema(this.value,true);">'+
		'  <option value=""';
		if(localStorage.sistemaMeridiani == '' || !__(localStorage.sistemaMeridiani) )contPulsanti += ' SELECTED';
		contPulsanti += 	'>'+htmlEntities(TXT("MeridianiCinesi"))+'</option>' +
							'  <option value="MAS"';
		if(localStorage.sistemaMeridiani == 'MAS')contPulsanti += ' SELECTED';
		contPulsanti += 	'>'+htmlEntities(TXT("MeridianiGiapponesi"))+'</option>' +
							'  <option value="NMK"';
		if(localStorage.sistemaMeridiani == 'NMK')contPulsanti += ' SELECTED';
		contPulsanti += 	'>'+htmlEntities(TXT("SistemaNamikoshi"))+'</option>' +
				'</select></span><i class="elMenu" id="cambioSistemaMeridiani" onClick="MENU.visImpset();"><span>'+htmlEntities(TXT("SistemaMeridiani2"))+'</span></i></p>';


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

		for(let m in DB_addset){
			if(!DB.set[m])DB.set[m] = {};
			for(let e in DB_addset[m]){
				DB.set[m][e] = DB_addset[m][e];
			}
		}
		DB_addset = null;
		
		
		
		//DB.set.patologie = clone(DB.set.patologie_model);
		
		//DB.set.patologie.sort(sort_by("NomePatologia"));
		
		manichinoCaricato = true;
		SET.componiPatologie();
		//SET.componiMeridiani();
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
				if(this.INTERSECTED.name.substr(0,1)=='_' && objOver.name.substr(1,2)!='NK'){
					var n1=objOver.name.substr(1,2); // meridiano intersecato
					var pt=this.INTERSECTED.name.substr(4,2)
					var pN = this.INTERSECTED.name.split(".");
					var tt = (pN[1]*1)+"."+SET.convSigla(pN[0].substr(1,2));
					/*if(n1=='NK'){
						tt = DB.set.meridiani.NK.punti[this.INTERSECTED.name.substr(4,2)].NomePunto;
						if(this.INTERSECTED.userData.label)tt = DB_anatomia["Organo_"+this.INTERSECTED.userData.label].Titolo;
					}*/
					
					visToolTip(tt);
					renderer.domElement.style.cursor='pointer';
					if(	(n1!='NK' && !MERIDIANI[n1].meridianoAcceso) ||
						(n1=='NK' && MERIDIANI[n1].meridianoAcceso!=pt) )this.coloraMeridiano(this.INTERSECTED.name.substr(1,5),'Over','Over');
				}
				if(this.INTERSECTED.name.substr(2,4)=='_mas'){
					var n1 = this.INTERSECTED.name.substr(0,2);
					visToolTip(DB.set.meridiani[n1].NomeMeridiano);
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
		var pp = SET.splitPoint(pt.name);
		var els = scene.getObjectByName("PT_"+pp.siglaMeridiano).children;
		for(e in els){
			if(	els[e].name.indexOf(pp.siglaMeridiano+"."+pp.nPunto+".")==0 && 
				SET.isInGruppo(els[e]) ){
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
				if(this.INTERSECTED.name.substr(0,1)=='_' && this.INTERSECTED.name.indexOf("NK")==-1){
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
	isInGruppo: function( el ){
		if(!SET.grSel)return false;
		let ret = true;
		for(let e=0;e<SET.grSel.length;e++){
			if(el.userData.gruppi.indexOf(SET.grSel[e])===-1)ret = false;
		}
		return ret;
	},
	apriPunto: function( PT_name, ritorno='', el='', gruppo='', btn=null ){
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
			if(this.ptSel.name.indexOf("AR")==-1)SET.setPulsePt( this.ptSel, 1, 1, mat );
			else{
				// disattivo le aree
				if(this.ptSel.userData.hidden)this.ptSel.visible = false;
			}
			var pp = SET.splitPoint(this.ptSel.name.substr(0,5));	

			// spengo il pulsante
			if(this.btnSel)this.btnSel.classList.remove("selElPt");
			else if(document.getElementById("pt_"+pp.nPunto+"_"+pp.siglaMeridiano))document.getElementById("pt_"+pp.nPunto+"_"+pp.siglaMeridiano).classList.remove("selElPt");
			
		}
		if(this.MAT.pointSel)SET.chiudiPunto(true,true);
		//var pp = SET.splitPoint(PT_name);
		let PT='';
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
		let addGr = '';
		if(gruppo){
			if(gruppo.indexOf('x')>-1)addGr = '.DX';
			if(gruppo.indexOf('y')>-1)addGr = '.SX';
			if(gruppo.indexOf('z')>-1)addGr = '.CC';
		}
		
		if(!PT){
			PT=scene.getObjectByName( PT_name.replace("NK.","AR.")+addGr );
			if(PT){
				PT.visible = true;
				setTimeout(function(){SET.ptSel.material.opacity = 0.7;},200);
			}
		}
		if(gruppo){
			if(scene.getObjectByName( PT_name + addGr )){
				PT=scene.getObjectByName( PT_name + addGr );
			}
		}

		// aree di sostegno
		if(SS=scene.getObjectByName( PT_name.replace("NK.","SS.") + addGr ))SS.visible = true;

		if(this.ptSel && !SCHEDA.schedaAperta)this.chiudiPunto();
		this.ptSel = PT;
		this.grSel = gruppo;
		var pp = SET.splitPoint(this.ptSel.name.substr(0,5));
		if(PT_name.indexOf("NK")>-1)pp.siglaMeridiano='NK';
		if(!ritorno)this.accendiMeridiano(pp.siglaMeridiano);

		// accendo il pulsante
		if(btn){ 
			/* NMK
			- btn è valorizzata con l'elemento pulsante solo per i pulsanti della listaMeridiani della mappa NMK
			- setto this.btnSel e lo illuminiamo per poterlo poi spegnere
			- apro la cartella (utile quando uso i pulsanti avanti e indietro della navigazione)
			- centro il pulsante se fuori dallo schermo (utile quando uso i pulsanti avanti e indietro della navigazione)
			*/
			this.btnSel = btn;
			this.btnSel.classList.add("selElPt");
			this.btnSel.parentElement.parentElement.classList.add("vis_apparati");
			let lista = document.querySelector(".listaMeridiani");
			if(tCoord(SET.btnSel,'y')-lista.scrollTop>HF())lista.scrollTo(0,lista.scrollTop+(HF()/2));
			if(tCoord(SET.btnSel,'y')-lista.scrollTop - tCoord(lista,'y')<0)lista.scrollTo(0,lista.scrollTop-(HF()/2)-tCoord(lista,'y'));
		}else if(document.getElementById("pt_"+pp.nPunto+"_"+pp.siglaMeridiano+((gruppo)?"_"+gruppo:""))){
			// CIN e MAS
			document.getElementById("pt_"+pp.nPunto+"_"+pp.siglaMeridiano+((gruppo)?"_"+gruppo:"")).classList.add("selElPt");
		}

		var matTxt = "this.MAT.pointSel";
		if(PT.userData.nota)matTxt = "this.MAT.pointSelNote";
		if(this.ptSel.userData.interno)matTxt += "Int";
		var mat = eval(matTxt);
		this.diffX = this.ptSel.position.x*1;
		this.diffY = this.ptSel.position.y*1;
		
		if(scene.getObjectByName("PT_"+pp.siglaMeridiano)){
			
			var els = scene.getObjectByName("PT_"+pp.siglaMeridiano).children;
			for(e in els){
				if(	els[e].name.indexOf(pp.siglaMeridiano+"."+pp.nPunto+".")==0 &&
					(!gruppo || SET.isInGruppo(els[e])) ){
						els[e].material=mat;
						els[e].visible=true;
					}
			}
			
			if(frs = scene.getObjectByName("FR_"+pp.siglaMeridiano)){
				var els = frs.children;
				for(e in els){
					if(	(gruppo && els[e].name == "FR."+pp.nPunto+"."+gruppo) || 
						(!gruppo && els[e].name == "FR."+pp.nPunto) ){
						//(!gruppo && els[e].name.indexOf("FR."+pp.nPunto)==0) ){
						els[e].visible = true;
						let col = new THREE.Color( SET.COL.baseFR );
						if(SET.ptSel.name.indexOf("AR.")==0)col = new THREE.Color( SET.COL.areaFR );
						if(els[e].userData.mov){
							if(localStorage.colore=='2')col = new THREE.Color( SET.COL.movFR );
							else col = new THREE.Color( SET.COL.movFR_dark );
						}
						if(ritorno)col = new THREE.Color( SET.COL.eviFR );
						els[e].material.color = col;
					}
				}
			}

		}
		
		var x2 = 0;
		var y2 = 0;
		var z2 = 0;
		var vector = null;
		if(this.ptSel.name.indexOf("AR")>-1){
			var center = getCenterPoint(this.ptSel);
			this.diffX = center.x*1;
			this.diffY = center.y*1;
			x2 = 0-center.x*1;
			y2 = 0-center.y*1;
			z2 = 0-center.z*1;
			this.ptSel.updateMatrixWorld();
			vector = center;
			vector.applyMatrix4( this.ptSel.matrixWorld );
		}else{
			x2 = 0-this.ptSel.position.x;
			y2 = 0-this.ptSel.position.y;
			z2 = 0-this.ptSel.position.z;
		}
		panEndZero = { x: x2, y: y2, z: z2 };
		
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
		var pp = SET.splitPoint(this.ptSel.name.substr(0,5));
		if(pp.siglaMeridiano == "NK")MERIDIANI['NK'].meridianoAcceso = false;
		this.pulse=0;
		var mat=this.MAT.pointBase;
		if(MERIDIANI[pp.siglaMeridiano]?.meridianoAcceso)mat=this.MAT.pointSel;
		if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
		SET.delEviPalls(pp.siglaMeridiano,pp.nPunto,'Select');
		
		// coloro tutti gli altri punti non SX o DX o CC
		if(scene.getObjectByName("PT_"+pp.siglaMeridiano)){
			var els = scene.getObjectByName("PT_"+pp.siglaMeridiano).children;
			for(e in els){
				if(els[e].name.indexOf(pp.siglaMeridiano+"."+pp.nPunto+".")==0){
					els[e].material=mat;
					els[e].material.opacity=1;
					els[e].scale.set(1,1,1);
					let ptName = exPt.name.split(".")[1]+"."+exPt.name.split(".")[0];
					if(exPt.userData.hidden && SET.puntiEvidenziati.indexOf(ptName)==-1)els[e].visible = false;
				}
			}
		}
		if(exPt.name.indexOf("AR")>-1){
			var sigla = exPt.name.split(".")[1]+"."+pp.siglaMeridiano;
			if(exPt.userData.hidden && SET.puntiEvidenziati.indexOf(sigla)==-1)exPt.visible = false;
		}
		if(SS=scene.getObjectByName( exPt.name.replace("NK.","SS.") )){
			if(SS.userData.hidden)SS.visible = false;
		}
		if(frs = scene.getObjectByName("FR_"+pp.siglaMeridiano)){
			var evids = clone(SET.puntiEvidenziati);
			for(let e in evids){
				evids[e] = evids[e].split(".")[0]+"."+evids[e].split(".")[1];
			}
			var els = frs.children;
			for(let e in els){
				var sigla = els[e].name.split(".")[1]+"."+pp.siglaMeridiano;
				if(	(this.grSel && els[e].name == "FR."+pp.nPunto+"."+this.grSel) || 
					(!this.grSel && els[e].name.indexOf("FR."+pp.nPunto)==0 )){
					
					if(evids.indexOf(sigla)==-1)els[e].visible = false;
					
					if(SCHEDA.scheda2Aperta){
						let col = new THREE.Color( SET.COL.baseFR );
						if(SET.ptSel.name.indexOf("AR.")==0)col = new THREE.Color( SET.COL.areaFR );
						if(els[e].userData.mov){
							if(localStorage.colore=='2')col = new THREE.Color( SET.COL.movFR );
							else col = new THREE.Color( SET.COL.movFR_dark );
						}
						els[e].material.color = col;
					}
				}
			}
		}

		// spengo il pulsante
		if(this.btnSel)this.btnSel.classList.remove("selElPt");
		else if(document.getElementById("pt_"+pp.nPunto+"_"+pp.siglaMeridiano+((this.grSel)?"_"+this.grSel:"")))document.getElementById("pt_"+pp.nPunto+"_"+pp.siglaMeridiano+((this.grSel)?"_"+this.grSel:"")).classList.remove("selElPt");
		
		this.ptSel=null;
		this.grSel='';

		if(SCHEDA.scheda2Aperta){
			nonChiudereScheda=true;
			document.getElementById("scheda_ritorno").click();
		}
		if(!nonChiudereScheda){
			SCHEDA.scaricaScheda(); 
		}
		
		// ricentro il manichino
		if(exPt.name.indexOf("AR")>-1){
			var center = getCenterPoint(exPt);
			var vector = new THREE.Vector3( ((MODELLO.flip) ? center.x*1 : 0-center.x*1), 0-center.y*1, 0-center.z*1 );
		}else{
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
		}
		
		render();
		
		SET.spegniMeridiani();
	},
	coloraMeridiano: function( cod, matLine, matPoint, forza=false ){
		
		var pp = SET.splitPoint(cod);
		if(matPoint=='Base' && SET.ptSel && MERIDIANI[pp.siglaMeridiano].meridianoAcceso && !forza)return;
		if(controlsM._premuto && !forza)return;
		var SM = pp.siglaMeridiano.replace(localStorage.sistemaMeridianiAdd,"") + localStorage.sistemaMeridianiAdd;
		
		if(localStorage.sistemaMeridiani=='MAS' && (SM=='CV_mas' || SM=='GV_mas'))return;
		if(pp.siglaMeridiano=='NK'){
			var els = this.PT[pp.siglaMeridiano].children;
			for(let v in els){
				if(	els[v].name.substr(3,2)==pp.nPunto && 
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
		if(siglaMeridiano == "NK" && this.ptSel){
			MERIDIANI['NK'].meridianoAcceso = this.ptSel.name.split(".")[1];
			return;
		}
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
	scriviPunto: function( punto, esteso=false, noRet=false, sigla=false, siglaMeridiano=false, gruppo='', seq='' ){
		var pp = SET.splitPoint(punto);
		var siglaPunto = +pp.nPunto+"."+pp.siglaMeridiano;
		if(pp.siglaMeridiano=='NK')siglaPunto = pp.nPunto+"."+pp.siglaMeridiano;
		var nomePunto = punto.substr(siglaPunto.length+1,Object.keys(punto).length-(siglaPunto.length+1));
		if(sigla)siglaPunto = sigla;
		if(siglaMeridiano=='NK')siglaPunto = '';
		var html = '<a class="pallinoPat';
		if(esteso)html += ' pallinoPatEsteso';
		var ret = '';
		if(!noRet)ret = SET.chiudiPunto(true);
		html += '" onClick="SET.apriPunto(\''+pp.siglaMeridiano+"."+pp.nPunto+'\',\''+ret+'\',\'\',\''+gruppo+'\'';
		if(siglaMeridiano=='NK' && seq)html += ',this';
		html += ');"';
		if(noRet){
			let addPT = (siglaMeridiano=='NK')?"_"+((gruppo)?gruppo:"")+"_"+((seq)?seq:""):"";
			html += '  onMouseOver="SET.overPunto(this,true);"' +
					'  onMouseOut="SET.overPunto(this,false);"' +
					'  id="pt_'+pp.nPunto+'_'+pp.siglaMeridiano+addPT+'"';
		}
		html += '> '+siglaPunto;//+' ';
		if(esteso)html += (siglaMeridiano=='NK' ? "":".")+' <i>'+nomePunto+'</i>';
		html+='</a>';
		return html;
	},
	selPunto: function( nPunto, siglaMeridiano, N='', el=null, gruppo='' ){
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
			SET.apriPunto(siglaMeridiano+"."+nPunto,'SET.chiudiPunto(true);','',gruppo);
		}, rit, N);
	},
	selPuntoMod: function( p, N='' ){
		SET.pMod = p;
		var nPunto = document.getElementById("formMod")[N+"pt_"+p].value;
		var siglaMeridiano = document.getElementById("formMod")[N+"mr_"+p].value;
		SET.selPunto( nPunto, siglaMeridiano, N );
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
	evidenziaPat: function( el ){
		if(el.classList.contains("eviPoints"))return;
		var elEvi = document.querySelector(".eviPoints");
		if(elEvi)elEvi.classList.remove("eviPoints");
		el.classList.add("eviPoints");
		var sistemaVer = localStorage.sistemaMeridiani;
		if(sistemaVer=='MAS')sistemaVer = '';
		if(sistemaVer != el.dataset.sistema)SET.cambiaSistema( el.dataset.sistema, true, true );
		SET.evidenziaPunto( el );
		setTimeout(function(){SET.evidenziaMeridiani( el.innerHTML );},300);
	},
	evidenziaPunto: function( el = document.getElementById("scheda_testo")/*html*/ ){
		SET.annullaEvidenziaPunto();
		var els = el.getElementsByClassName("pallinoPat");
		for(let p=0;p<els.length;p++){
			var siglaMeridiano = els[p].dataset.siglaMeridiano;
			var nPunto = els[p].dataset.nPunto;
			var gruppo = __(els[p].dataset.gPunto);
			
			var el = scene.getObjectByName("PT_"+siglaMeridiano);
			if(el){
				for(let e in el.children){
					var pass =  true;
					if(gruppo){
						for(let g=0;g<gruppo.length;g++){
							if(	el.children[e].userData.gruppi.indexOf(gruppo[g])==-1)pass=false;
						}
					}
					if(pass){
						if(	el.children[e].name.indexOf("_"+siglaMeridiano+"."+nPunto+".")==0){
							el.children[e].material=SET.MAT.pointEvi;
							el.children[e].visible = true;
						}
						if(	el.children[e].name.indexOf(siglaMeridiano+"."+nPunto+".")==0){
							el.children[e].visible = true;
						}
					}
				}
			}
			var el = scene.getObjectByName("FR_"+siglaMeridiano);
			if(el){
				for(let e in el.children){
					if(	(!gruppo && el.children[e].name.indexOf("FR."+nPunto)==0) ||
						(gruppo && el.children[e].name=="FR."+nPunto+"."+gruppo) ){
						el.children[e].visible=true;
					
						let col = new THREE.Color( SET.COL.baseFR );
						if(scene.getObjectByName(el.children[e].name.replace("FR","AR")))col = new THREE.Color( SET.COL.areaFR );
						if(el.children[e].userData.mov){
							if(localStorage.colore=='2')col = new THREE.Color( SET.COL.movFR );
							else col = new THREE.Color( SET.COL.movFR_dark );
						}
						el.children[e].material.color = col;
					}
				}
			}
			var el = scene.getObjectByName("AR_"+siglaMeridiano);
			if(el){
				for(let e in el.children){
					if(el.children[e].name.indexOf("AR."+nPunto)>-1 )el.children[e].visible=true;
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
			var pp=SET.splitPoint(elenco[k]);
			var mat = SET.MAT.pointEvi;
			if(pp.valutazione){
				if(pp.valutazione=='V')mat = SET.MAT.pointVuoto;
				if(pp.valutazione=='P')mat = SET.MAT.pointPieno;
				if(pp.valutazione=='D')mat = SET.MAT.pointDolore;
			}
			let gruppo = '';
			if(pp.siglaMeridiano=='NK'){
				if(__(DB.set.meridiani["NK"].punti[pp.nPunto].rif)){
					let pP = DB.set.meridiani["NK"].punti[pp.nPunto].rif.split(".");
					pp.nPunto = pP[0];
					gruppo = pP[1];
				}
			}
			
			var el = scene.getObjectByName("PT_"+pp.siglaMeridiano);
			if(el){
				for(e in el.children){
					if(	el.children[e].name.indexOf("_"+pp.siglaMeridiano+"."+pp.nPunto+".")==0 &&
						(!gruppo || el.children[e].userData.gruppi.indexOf(gruppo)>-1) &&
						(!__(el.children[e].userData.hidden,false) || el.children[e].userData.gruppi.indexOf("v")>-1) )el.children[e].material=mat;
					if(!__(el.children[e].userData.hidden,false) || el.children[e].userData.gruppi.indexOf("v")>-1)el.children[e].visible = true; // mostro tutti i punti selezionabili
				}
			}
			
			var el = scene.getObjectByName("FR_"+pp.siglaMeridiano);
			if(el){
				for(e in el.children){
					if(	(gruppo && el.children[e].name == "FR."+pp.nPunto+"."+gruppo) || 
						(!gruppo && el.children[e].name.indexOf("FR."+pp.nPunto)==0) ){
						el.children[e].visible=true;

						let col = new THREE.Color( SET.COL.baseFR );
						if(el.children[e].name.indexOf("AR.")==0)col = new THREE.Color( SET.COL.areaFR );
						if(el.children[e].userData.mov){
							if(localStorage.colore=='2')col = new THREE.Color( SET.COL.movFR );
							else col = new THREE.Color( SET.COL.movFR_dark );
						}
						el.children[e].material.color = col;
					}
				}
			}


			var el = scene.getObjectByName("AR_"+pp.siglaMeridiano);
			if(el){
				for(let e in el.children){
					if(el.children[e].name.indexOf("AR."+pp.nPunto)>-1 )el.children[e].visible=true;
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
				var pp=SET.splitPoint(pT);

				let gruppo = '';
				if(pp.siglaMeridiano=='NK'){
					if(__(DB.set.meridiani["NK"].punti[pp.nPunto]?.rif)){
						let pP = DB.set.meridiani["NK"].punti[pp.nPunto].rif.split(".");
						pp.nPunto = pP[0];
						gruppo = pP[1];
					}
				}
				
				var el = scene.getObjectByName("PT_"+pp.siglaMeridiano);
				if(el){
					for(e in el.children){
						if(	el.children[e].name.indexOf("_"+pp.siglaMeridiano+"."+pp.nPunto+".")==0 &&
							(!gruppo || el.children[e].userData.gruppi.indexOf(gruppo)>-1) ){
							el.children[e].material=SET.MAT.pointTrasp;
						}
						if(	el.children[e].name.indexOf(pp.siglaMeridiano+"."+pp.nPunto+".")==0 &&
							(!gruppo || el.children[e].userData.gruppi.indexOf(gruppo)>-1) ){
							if(__(el.children[e].userData.hidden,false))el.children[e].visible = false;
						}
						if(__(el.children[e].userData.hidden))el.children[e].visible = false;
					}
				}
				var el = scene.getObjectByName("FR_"+pp.siglaMeridiano);
				if(el){
					for(e in el.children){
						if(el.children[e].name.indexOf("FR."+pp.nPunto)==0){
							el.children[e].visible=false;
							el.children[e].material.color = new THREE.Color( SET.COL.baseFR );
						}
					}
				}
				var el = scene.getObjectByName("AR_"+pp.siglaMeridiano);
				if(el){
					for(let e in el.children){
						if(el.children[e].name.indexOf("AR."+pp.nPunto)>-1 )el.children[e].visible=false;
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
		
		if(	(mer=='NK' && localStorage.sistemaMeridiani!='NMK') || 
			(mer!='NK' && localStorage.sistemaMeridiani=='NMK') )return;	
		
		if(over){
			if(el.dataset.gPunto)SET.grSel = el.dataset.gPunto;
			SET.addEviPalls(mer,nPunto,'Over');
		}else{
			SET.delEviPalls(mer,nPunto,'Over');
			SET.grSel = '';
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
		var regexp = /[\s>\(\.\,]{0,1}[0-9]{1,2}\.[A-Z]{2}[\.*]+[\s<\.,\)]{1}/ig;
		var str = document.getElementById("scheda_testo"+nScheda).innerHTML;
		var pts = str.match(regexp);
		for(let p in pts){
			var pP = pts[p].split(".");
			str = str.replace(pts[p], pP[0]+"."+SET.convSigla(pP[1].substr(0,2))+pP[1].substr(2,1));
		}

		// solo NK in protocolli
		var regexp = /\[\.[A-Z]{1,2}\.[A-Z0-9]{2}[\.]{0,1}[^\]]*\]/ig;
		//	var str = document.getElementById("scheda_testo"+nScheda).innerHTML;
		var pts = str.match(regexp);
		for(let p in pts){
			var pP = pts[p].replace("[.","").replace(".]","").split(".");
			str = str.replace(pts[p], ' class="pallinoPat" data-n-punto="'+pP[1]+'" data-g-punto="'+__(pP[2])+'" data-sigla-meridiano="NK" onclick="SET.selPunto(\''+pP[1]+'\',\'NK\',\'\',this,\''+__(pP[2])+'\');"');
		}
		document.getElementById("scheda_testo"+nScheda).innerHTML = str;

	},
	convPuntiScheda: function( html ){
		// converte i punti di html in punti cliccabili e formattati
		var nScheda = '';
		if(SCHEDA.scheda2Aperta)nScheda='2';

		var regexp = /\[\.[0-9]{1,2}\.[A-Z]{2}[\.]{0,1}[^\]]*\]/ig;
		var pts = html.match(regexp);
		for(let p in pts){
			
			var pp = SET.splitPoint(pts[p].replace("[.","").replace(".]",""));
			var n_M = SET.convSigla(pp.siglaMeridiano);
			var nascPunto = ' style="display:none;"';
			var els = scene.getObjectByName("PT_"+pp.siglaMeridiano).children;
			for(e in els){
				if(els[e].name.indexOf(pp.siglaMeridiano+"."+pp.nPunto+".")==0)nascPunto = '';
			}
			var siglaPunto = +pp.nPunto+'.'+n_M;
			if(pp.siglaMeridiano=='NK')siglaPunto = DB.set.meridiani[pp.siglaMeridiano].punti[pp.nPunto].NomePunto;
			let sost = '<span'+nascPunto+' class="pallinoPat" data-n-punto="'+pp.nPunto+'" data-g-punto="'+pp.gruppo+'" data-sigla-meridiano="'+pp.siglaMeridiano+'" onClick="SET.selPunto(\''+pp.nPunto+'\',\''+pp.siglaMeridiano+'\',\'\',this,\''+pp.gruppo+'\');">'+siglaPunto;
			if(__(pp.pinyin))sost += ' <i>'+pp.pinyin+'</i>';
			sost += '</span>';

			html = html.replace(pts[p], sost);
		}
		
		var regexp = /\[\.[A-Z]{1,2}\.[A-Z0-9]{2}[\.]{0,1}[^\]]*\]/ig;
		var pts = html.match(regexp);
		for(let p in pts){
			let pP = pts[p].replace("[.","").replace(".]","").split(".");
			
			let is_AR_hidden = pP[0]=='AR' && !DB.set.meridiani.NK.punti[pP[1]];
			
			html = html.replace(pts[p], ' class="pallinoPat'+((is_AR_hidden)?" pallinoHidden":"")+'" data-n-punto="'+ pP[1] +'" data-g-punto="'+ __(pP[2]) +'" data-sigla-meridiano="NK" '+((!is_AR_hidden)?'onclick="SET.selPunto(\''+ pP[1] +'\',\'NK\',\'\',this,\''+__(pP[2])+'\');"':''));
		}
		
		var regexp = /\[\.[A-Z]{2}\.\]/ig;
		var pts = html.match(regexp);
		for(let p in pts){
			var pP = pts[p].split(".");
			var siglaMeridiano = pP[1].substr(0,2);
			var n_M = SET.convSigla(siglaMeridiano)+pP[1].substr(2,1);
			var nome = '';
			nome = DB.set.meridiani[siglaMeridiano].NomeMeridiano;	
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
		SET.caricaMeridiani();
		PAZIENTI.cambiaGZ(PAZIENTI.mezzoProvvisorio,true);
		MENU.chiudiImpSet();
	},
	popolaImpSet: function(){
		// sistemi sigle
		HTML_imp = 	'<p><i>'+htmlEntities(TXT("SistemaSigle"))+':</i> ' +
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
		
		var selects = document.getElementsByClassName("sceltaMeridianiElenco");
		var els = selects[0].options;//document.getElementById("sceltaMeridianiElenco").options;
		for(e in els){
			if(els[e].value == localStorage.sistemaMeridiani){
				for(let s in selects){
					selects[s].selectedIndex = e;
				}
			}
		}
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

	filtraSet: function( togliLoader=false ){
		var vis = true;
		if(	DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())vis = false;
		for(let m in SETS.children){
			var visMer = vis;
			if(	SET.MERIDIANI_free.indexOf(SETS.children[m].name.split("_")[1])!=-1 )visMer = true;
			if( SET.allMeridiansFree)visMer = true;
			if( SETS.children[m].userData.categoria != localStorage.sistemaMeridiani )visMer = false;
			if(	SETS.children[m].name.substr(0,2)=='AR' &&  localStorage.sistemaMeridiani=='MAS')visMer = true;
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
		var titPoints = TXT("MeridianiPunti");
		if(localStorage.sistemaMeridiani=='NMK')titPoints = TXT("RegioniAnatomiche");
		if(localStorage.sistemaMeridiani=='MAS')titPoints = TXT("Meridiani");
		document.getElementById("pulsante_meridiani").innerHTML = titPoints;
		if(SCHEDA.elencoSel=='meridiani')document.getElementById("elenchi_titolo").innerHTML = titPoints;
		
		if(togliLoader){
			
			var selects = document.getElementsByClassName("sceltaMeridianiElenco");
			var els = selects[0].options;
			for(e in els){
				if(els[e].value == localStorage.sistemaMeridiani){
					for(let s=0;s<selects.length;s++){
						selects[s].selectedIndex = e;
					}
				}
			}
			nasLoader();
		}
	},
	cambiaSistema: function( sistema, loader=false, noClick=false, funct='' ){
		if(localStorage.sistemaMeridiani == sistema)return;
		SET.btnSel = null;
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
		},t2,sistema);
		setTimeout(function(loader){
			SET.filtraSet(loader);
			eval(funct);
		},t,loader, funct);
		var selects = document.getElementsByClassName("sceltaMeridianiElenco");
		for(let s=0;s<selects.length;s++){
			selects[s].value = sistema;
			selects[s].blur();
		}
	},
	
	addEviPalls: function( siglaMeridiano, nPunto, tipo ){
		if(!scene.getObjectByName("PT_"+siglaMeridiano))return;
		var els = scene.getObjectByName("PT_"+siglaMeridiano).children;
		for(e in els){
			if(	els[e].name.indexOf(siglaMeridiano+"."+nPunto+".")==0 && 
				(	SET.isInGruppo(els[e]) || 
					!SET.grSel || 
					SET.puntiEvidenziati.indexOf(els[e].name.split(".")[1]+"."+els[e].name.split(".")[0])>-1	) &&
				!__(els[e].userData.posPoint,false)){
				
				let d = 16;
				let mat = this.MAT.pointSel2.clone();
				if(siglaMeridiano=='NK' && tipo=='Select'){
					d = 10;
					mat = this.MAT.pointSel2NK.clone();
				}
				var geoPoint =  new THREE.SphereGeometry( 0.11, d, d );
				var eviPoint;
				eviPoint =  new THREE.Mesh( geoPoint, mat );
				eviPoint.name=tipo+' point: '+els[e].name;
				eviPoint.material.visible=true;
				eviPoint.position.set( els[e].position.x, els[e].position.y, els[e].position.z );
				if(	tipo=='Select' || 
					(tipo=='Over' && !scene.getObjectByName('Select point: '+els[e].name))){
						if(SET.grSel || (!__(els[e].userData.hidden,false) || els[e].userData.gruppi.indexOf("v")>-1))SETS.add( eviPoint );
				}
			}
		}
		if(scene.getObjectByName("AR_"+siglaMeridiano)){
			var els = scene.getObjectByName("AR_"+siglaMeridiano).children;
			for(e in els){
				if(	els[e].name.indexOf("AR."+nPunto)==0){
					els[e].material.opacity = 0.7;
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
		if(scene.getObjectByName("AR_"+siglaMeridiano)){
			var els = scene.getObjectByName("AR_"+siglaMeridiano).children;
			for(e in els){
				if(	els[e].name.indexOf("AR."+nPunto)==0){
					els[e].material.opacity = 0.45;
				}
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
		//
	},
	_scaricaModello: function(){
		//
	},
	_torna: function( args ){
		if(typeof(args.daCarica) == 'undefined')SET.pMod = -1;
	}
}