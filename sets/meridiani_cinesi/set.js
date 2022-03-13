
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
	tsuboEvidenziati: [],
	pMod: -1,
	pointEvi: '',
	meridianiSecondariAccesi: [],
	preCM: false, // memorizza il contrast method prima di attivarlo su un punto interno
	eviPalls: [],
	geometryPallino: null,
	geometryPallinoTrasp: null,
	
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
		for(m in MERIDIANI){ // elenco i meridiani
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
						if(MERIDIANI[m].colore)mesh.material.color = new THREE.Color( eval("SET.COL.sel"+MERIDIANI[m].colore) );
						if(m.indexOf("_MT")>-1){
							mesh.material.color = new THREE.Color( SET.COL.selMT );
							//if(!LNS[l].interno)mesh.material.depthFunc = 3;
						}
						mesh.computeLineDistances();
					}else{
						if(!MERIDIANI[m].yin){
							mesh.material=eval("this.MAT.lineYang"+intAdd);
						}else{
							mesh.material=eval("this.MAT.lineYin"+intAdd);
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
			
			for(p in PTS){
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
					/////var raggio = 0.02;
					/////if(__(PTS[p].dupl))raggio = 0.018;
					/////var geometry = new THREE.SphereGeometry( raggio, 6, 6 );
					//var geometry = new THREE.BoxGeometry( 0.02, 0.02, 0.02 );
					
					
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
					/////var geometryTrasp = new THREE.SphereGeometry( 0.07, 8, 8 );
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
		
		if(!localStorage.sistemaSigleMeridiani)localStorage.sistemaSigleMeridiani="INT";
		var contPulsanti = 	'<span class="menuElenchi" onclick="MENU.visMM(\'btnCarMapMenu\');"></span>' +
							'<span id="btnCarMapMenu" class="btn_meridiani_cinesi titolo_set">' +
							'<span>TsuboMap</span>' +
							'<i class="elMenu" id="chiudiSet" onClick="chiudiSet();" title="'+htmlEntities(Lingua(TXT_ChiudiSet))+'"><span>' +
								htmlEntities(Lingua(TXT_ChiudiSet)) +
							'</span></i><i class="elMenu" id="impostazioniSet" onClick="MENU.visImpset();" title="'+htmlEntities(Lingua(TXT_ImpostazioniSet))+'"><span>' +
								htmlEntities(Lingua(TXT_ImpostazioniSet)) +
							'</span></i>' +
							'<i class="elMenu" id="help_set" onClick="GUIDA.visFumetto(\'guida_set\',true,true);">?</i></span>';
		var contElenco = '';
		
		// meridiani
		contPulsanti += '<div id="pulsante_meridiani" class="frdx" onClick="SCHEDA.selElenco(\'meridiani\');">'+Lingua(TXT_MeridianiTradizionali)+'</div>';
		contElenco += '<div id="lista_meridiani"></div>';
		
		
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
		
		contBtns = '<div id="p_contrasto" class="p_noTxt" onClick="SET.swContrastMethod();"><i>'+htmlEntities(Lingua(TXT_ContrastoElevato))+'</i></div>';
		
		contIcona = '<div id="p_set" onClick="SCHEDA.apriElenco(\'set\');"><svg viewBox="0 0 12 48"><polygon points="5,24 12,13 12,35"></polygon></svg><i>'+htmlEntities(Lingua(TXT_TsuboMap))+'</i></div>';;
		
		var preElenco = SCHEDA.elencoSel;
		SCHEDA.caricaElenco(globals.set.nome,contElenco);
		SCHEDA.caricaPulsanti(contPulsanti);
		SCHEDA.caricaBtns(contBtns,contIcona);
		SCHEDA.swPulsanti(true);
		
		HTML_imp = '<p><i>'+htmlEntities(Lingua(TXT_SistemaSigle))+':</i> ';
		HTML_imp += '<select id="sceltaSigle" onChange="SET.popolaImpSet();">';
		for(k in DB.mtc.meridiani["BL"].sigle){
			HTML_imp += '  <option value="'+k+'"';
			if(localStorage.sistemaSigleMeridiani == k)HTML_imp += ' SELECTED';
			HTML_imp += '>'+k+'</option>'+H.chr10;
		}
		HTML_imp += '</select></p>'+H.chr10;
		
		HTML_imp += '<div id="tbSigleMeridiani"></div>';
		
		HTML_imp += '<div style="margin-top:30px;"><span class="annullaBtn" onclick="MENU.chiudiMenu();">'+Lingua(TXT_Annulla)+'</span><span class="submitBtn" onclick="SET.salvaImpostazioni();">'+Lingua(TXT_Salva)+'</span></div>';
		
		document.getElementById("contImpset").innerHTML = HTML_imp;
		document.getElementById("divs").innerHTML = '<div id="meridianiSmart_ico" onClick="SET.swMeridianiSmart();" title="'+htmlEntities(Lingua(TXT_MeridianiSmart))+'"></div><div id="meridianiSmart_cont"></div>';
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
		Object.assign(SET, MODULO_TSUBO);
		Object.assign(SET, MODULO_TEORIA);
		Object.assign(SET, MODULO_PROCEDURE);
		
		// svuoto la memoria
		MODULO_PATOLOGIE = null;
		MODULO_MERIDIANI = null;
		MODULO_TSUBO = null;
		MODULO_TEORIA = null;
		MODULO_PROCEDURE = null;
		
		manichinoCaricato = true;
		SET.caricaMeridiani();
		SET.caricaPatologie();
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
				GUIDA.visFumetto("guida_set_mini",false,true);
				SCHEDA.chiudiElenco();
				MENU.chiudiMenu();
			}
		}
		postApreSet = false;
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
						SETS.children[i].isGroup && 
						SETS.children[i].name.substr(0,2)!='LN' && 
						SETS.children[i].name.substr(0,2)!='GD'){
						var intersects = raycaster.intersectObjects( SETS.children[i].children );
						if ( intersects.length > 0 ) { // roll-over
							for(l in intersects)ints.push(intersects[l]);
							objOver=intersects[ 0 ].object;
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
	setPulsePt: function( pt, pulse, op, mat ){
		if(typeof(mat)=='undefined')var mat = '';
		var pP = pt.name.split(".");
		/*var ptCc = manichino.getObjectByName(pP[0]+"."+pP[1]);
		var ptSx = manichino.getObjectByName(pP[0]+"."+pP[1]+".SX");
		var ptDx = manichino.getObjectByName(pP[0]+"."+pP[1]+".DX");
		if(ptCc){
			ptCc.scale.set(pulse,pulse,pulse);
			if(mat)ptCc.material=mat;
		}
		if(ptSx){
			ptSx.scale.set(pulse,pulse,pulse);
			if(mat)ptSx.material=mat;
		}
		if(ptDx){
			ptDx.scale.set(pulse,pulse,pulse);
			if(mat)ptDx.material=mat;
		}*/
		
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
			for(m in MERIDIANI){
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
		//console.log("!"+btn+" && !"+raycastDisable+" && (("+controlsM.xIni+"=="+controlsM.xEnd+" && "+controlsM.yIni+"=="+controlsM.yEnd+") || "+touchable+")");
		if(!btn && !raycastDisable && ((controlsM.xIni==controlsM.xEnd && controlsM.yIni==controlsM.yEnd) || touchable)){
			//console.log(this.INTERSECTED)
			if(this.INTERSECTED){
				if(!touchable){
					controlsM._inMovimento=true;
					controlsM._ZPR=true;
					controlsM._MM=false;
				}
				var n=this.INTERSECTED.name.split("_");
				var ritorno = '';
				if(SCHEDA.classeAperta && SCHEDA.classeAperta!='tab_tsubo')ritorno = 'SET.chiudiTsubo(true)';
				SET.apriTsubo(n[1],ritorno);
			}
		}
		controlsM.xIni=-1;
		controlsM.xEnd=-1;
		controlsM.yIni=-1;
		controlsM.yEnd=-1;
	},
	apriTsubo: function( PT_name, ritorno ){
		if(typeof(ritorno) == 'undefined')var ritorno = '';
		if(this.ptSel){
			var mat=this.MAT.pointOn;
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			SET.setPulsePt( this.ptSel, 1, 1, mat );
			var pP = this.ptSel.name.split(".");		
			var siglaMeridiano = pP[0];
			var nTsubo = parseInt(pP[1])-1;
			document.getElementById("pt_"+(nTsubo+1)+"_"+siglaMeridiano).classList.remove("selElPt");
		}
		if(this.MAT.pointSel)SET.chiudiTsubo(true,true);
		var pP = PT_name.split(".");		
		var siglaMeridiano = pP[0];
		var nTsubo = parseInt(pP[1])-1;
		if(!scene.getObjectByName( PT_name )){
			if(scene.getObjectByName( PT_name + "." )){
				PT=scene.getObjectByName( PT_name + "." );
			}else if(scene.getObjectByName( PT_name + ".SX" )){
				PT=scene.getObjectByName( PT_name + ".SX" );
			}
		}else PT=scene.getObjectByName( PT_name );
		if(this.ptSel && !SCHEDA.schedaAperta)this.chiudiTsubo();
		this.ptSel=PT;
		var pP = this.ptSel.name.split(".");
		
		if(!ritorno && PT_name.indexOf("EX")==-1)this.accendiMeridiano(pP[0]);
		document.getElementById("pt_"+(nTsubo+1)+"_"+siglaMeridiano).classList.add("selElPt");
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
		
		panEndZero = { x: 0-this.ptSel.position.x, y: 0-this.ptSel.position.y, z: 0-this.ptSel.position.z };
		panEnd = { x: 0, y: 0, z: 0 };
		if(smothingView){
			if(manichinoCont.position.z<15)zoomEnd = 15;
			normalizeRotation();
		}
		
		SET.addEviPalls(siglaMeridiano,pP[1],'Select');
		this.pulse = 1;
		
		
		
		// se è un punto interno evidenzio gli organi o le ossa
		if(this.ptSel.userData.interno){
			this.preCM = SET.COL.contrastMethod;
			this.swContrastMethod(false);
			//this.ptSel.material.depthFunc = 1;
			
			var evidenziati = this.ptSel.userData.evidenziati;
			if(evidenziati){
				for(e in evidenziati){
					for(i in evidenziati[e]){
						scene.getObjectByName( evidenziati[e][i] ).material = MODELLO.MAT.materialVisceriEvi;
					}
				}
			}
		}
		// ---------------------
		SET.caricaTsubo( siglaMeridiano, nTsubo, ritorno );
	},
	chiudiTsubo: function( nonChiudereScheda, cambiaPunto ){
		document.getElementById("scheda").classList.remove("tab_tsubo");
		document.getElementById("scheda").classList.remove("schForm");
		if(!globals.modello.cartella)return;
		if(typeof(nonChiudereScheda)=='undefined')nonChiudereScheda=false;
		if(typeof(cambiaPunto)=='undefined')cambiaPunto=false;
		if(!nonChiudereScheda){
			endChangeDetection();
			SCHEDA.formModificato = false;
		}
		if(this.ptSel){
			//this.ptSel.material.depthFunc = 3;
			if(this.ptSel.userData.interno){
				this.preCM = false;
				this.swContrastMethod(true);
				var evidenziati = this.ptSel.userData.evidenziati;
				if(evidenziati){
					for(e in evidenziati){
						for(i in evidenziati[e]){
							var tipo = scene.getObjectByName( evidenziati[e][i] ).parent.name;
							scene.getObjectByName( evidenziati[e][i] ).material = eval("MODELLO.MAT.material"+tipo);
						}
					}
				}
			}
		}
		
		var exPt = SET.ptSel;
		
		if(!this.ptSel)return;
		var pP = this.ptSel.name.split(".");
		var siglaMeridiano = pP[0];
		var nTsubo = pP[1];
		this.pulse=0;
		var mat=this.MAT.pointBase;
		if(MERIDIANI[pP[0]].meridianoAcceso)mat=this.MAT.pointSel;
		if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
		SET.delEviPalls(siglaMeridiano,nTsubo,'Select');
		
		// coloro tutti gli altri punti non SX o DX o CC
		var els = scene.getObjectByName("PT_"+siglaMeridiano).children;
		for(e in els){
			if(els[e].name.indexOf(pP[0]+"."+pP[1]+".")==0){
				els[e].material=mat;
				els[e].material.opacity=1;
				els[e].scale.set(1,1,1);
			}
		}
		
		this.ptSel=null;	
		document.getElementById("pt_"+(pP[1]*1)+"_"+pP[0]).classList.remove("selElPt");
		if(SCHEDA.scheda2Aperta){
			nonChiudereScheda=true;
			document.getElementById("scheda_ritorno").click();
		}
		if(!nonChiudereScheda){
			SCHEDA.scaricaScheda(); 
		}else if(SET.meridianiSecondariAccesi.length)SET.swContrastMethod(false);
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
		render();
		SET.spegniMeridiani();
	},
	coloraMeridiano: function( siglaMeridiano, matLine, matPoint, forza ){
		if(typeof(forza) == 'undefined')var forza = false;
		if(siglaMeridiano=='EX' && !matLine && matPoint=='Base' && SET.ptSel)return;
		if(matPoint=='Base' && SET.ptSel && MERIDIANI[siglaMeridiano].meridianoAcceso && !forza)return;
		if(SET.meridianiSecondariAccesi.length && matLine.indexOf("On")==-1)return;
		if(controlsM._premuto && !forza)return;
		var els = this.PT[siglaMeridiano].children;
		for(v in els){
			if(els[v].name.substr(0,1)!='_'){
				var mat = matPoint;
				try{
					if(els[v].userData.nota)mat="Note";
				}catch(err){}
				var pass = true;
				if(SET.ptSel)pass = false;
				if(pass || matPoint.indexOf("On")>-1 || matPoint.indexOf("Base")>-1)els[v].material = eval('this.MAT.point'+mat); // cambiare se NOTA
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
		for(m in MERIDIANI){
			if(!__(MERIDIANI[m].meridianoAcceso,false) && m.indexOf("_")==-1){
				this.coloraMeridiano(m,'','Base');
			}
		}
	},
	accendiMeridiano: function( siglaMeridiano, g, noSw ){
		if(!globals.modello.cartella)return;
		// verifico le autorizzazioni
		if(SET.MERIDIANI_free.indexOf(siglaMeridiano)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(Lingua(TXT_MsgFunzioneSoloPay));
			return;
		}
		// --------------------------
		if(SET.meridianiSecondariAccesi.length){
			SCHEDA.scaricaScheda();
		}
		if(typeof(noSw) == 'undefined')var noSw = false;
		if(typeof(g)=='undefined')var g = false;
		if(!g || (g && this.ptSel)){
			for(m in MERIDIANI){
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
		if(g && this.ptSel)this.chiudiTsubo();
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
			for(var m in MERIDIANI){
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
		if(this.ptSel)this.chiudiTsubo();
		document.getElementById("p"+siglaMeridiano).classList.remove("elencoSel");
		document.getElementById("sm"+siglaMeridiano).classList.remove("elencoSel");
		this.coloraMeridiano(siglaMeridiano,'','Base');
		MERIDIANI[siglaMeridiano].meridianoAcceso=false;
	},
	spegniMeridiani: function( forza ){
		if(typeof(forza)=='undefined')var forza = false;
		if(SCHEDA.scheda2Aperta || forza){
			for(m in MERIDIANI){
				if(MERIDIANI[m].meridianoAcceso){
					var mer = m;
					SET.accendiMeridiano(m,true);
					SET.coloraMeridiano(mer,'','Base');
				}
			}
		}
	},
	_applyLineMethod: function(){
		for(m in MERIDIANI){
			if(MERIDIANI[m].meridianoAcceso){
				this.coloraMeridiano(m,'On["'+MERIDIANI[m].elemento+'"]','On');
			}
		}
	},
	swContrastMethod: function(n){
		if(typeof(n)=='undefined')var n=SET.COL.contrastMethod;
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
			/*SET.MAT.lineYang.depthTest = false;
			SET.MAT.lineYin.depthTest = false;
			SET.MAT.pointBase.depthTest = false;*/
		}else{
			if(!SET.meridianiSecondariAccesi.length || this.ptSel.userData.evidenziati){
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
				/*SET.MAT.lineYang.depthTest = true;
				SET.MAT.lineYin.depthTest = true;
				SET.MAT.pointBase.depthTest = true;*/
			}
		}
		SET._setLineMaterials();
		SET._applyLineMethod();
	 	MODELLO.op('Pelle',MODELLO.opAtt);
		if(SET.COL.contrastMethod)document.getElementById("p_contrasto").classList.add("btnSel");
		else document.getElementById("p_contrasto").classList.remove("btnSel");
	},
	scriviTsubo: function( tsubo, esteso, noRet, sigla ){
		if(typeof(esteso)=='undefined')var esteso = false;
		if(typeof(noRet)=='undefined')var noRet = false;
		if(typeof(sigla)=='undefined')var sigla = false;
		var pT = tsubo.split(".");
		var siglaTsubo = pT[0]+"."+pT[1];
		var siglaTsuboOr = siglaTsubo;
		var nomeTsubo = tsubo.substr(siglaTsubo.length,tsubo.length-siglaTsubo.length);
		if(sigla)siglaTsubo = sigla;
		var nTsubo = pT[0];
		if(nTsubo.length == 1)nTsubo = '0' + nTsubo;
		var html = '<a class="pallinoPat';
		if(esteso)html += ' pallinoPatEsteso';
		var ret = '';
		if(!noRet)ret = SET.chiudiTsubo(true);
		html += '" onClick="SET.apriTsubo(\''+pT[1]+"."+nTsubo+'\',\''+ret+'\');"';
		if(noRet)html += '  onMouseOver="SET.overTsubo(this,true);"' +
						 '  onMouseOut="SET.overTsubo(this,false);"' +
						 '	id="pt_'+siglaTsuboOr.replace('.','_')+'"';
		html += '> '+siglaTsubo;//+' ';
		if(esteso)html+='<i>'+nomeTsubo;
		html+='</i></a>';
		return html;
	},
	selTsubo: function( PT ){
		var pP = PT.split("|");
		var siglaMeridiano = pP[1]
		var nTsubo = pP[0];
		if(nTsubo.length == 1)nTsubo='0'+nTsubo;
		// verifico le autorizzazioni
		if(SET.MERIDIANI_free.indexOf(siglaMeridiano)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(Lingua(TXT_MsgContSoloPay));
			return;
		}
		// --------------------------
		SET.apriTsubo(siglaMeridiano+"."+nTsubo,'SET.chiudiTsubo(true);');
	},
	selTsuboMod: function( p ){
		SET.pMod = p;
		PT = document.getElementById("formMod")["pt_"+p].value+"|"+document.getElementById("formMod")["mr_"+p].value;
		SET.selTsubo( PT );
	},
	setTsuboFrm: function(){
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
	evidenziaTsubo: function( html ){
		SET.annullaEvidenziaTsubo();
		var re = /selTsubo\([^\)]+\)/ig;
		var result = html.match(re);
		for(k in result){
			var pT=result[k].split("'");
			while(pT[1].indexOf("|")>-1)pT[1]=pT[1].replace("|",".");
			var pP=pT[1].split(".");
			var nTsubo=pP[0];
			if(nTsubo.length == 1)nTsubo = "0"+nTsubo;
			var ptSx = scene.getObjectByName("_"+pP[1]+"."+nTsubo+".SX");
			var ptDx = scene.getObjectByName("_"+pP[1]+"."+nTsubo+".DX");
			var ptCc = scene.getObjectByName("_"+pP[1]+"."+nTsubo+".");
			if(ptSx)ptSx.material=SET.MAT.pointEvi;
			if(ptDx)ptDx.material=SET.MAT.pointEvi;
			if(ptCc)ptCc.material=SET.MAT.pointEvi;
			
			SET.tsuboEvidenziati.push(pT[1]);
		}
		SET.settaOverTsubo();
	},
	evidenziaMeridiani: function( html ){
		SET.spegniMeridiani(true);
		var re = /accendiMeridiano\([^\)]+\)/ig;
		var result = html.match(re);
		for(k in result){
			var siglaMeridiano=result[k].split("'")[1];
			SET.accendiMeridiano(siglaMeridiano,true);
		}
	},
	evidenziaTsuboMod: function( elenco ){
		SET.annullaEvidenziaTsubo();
		for(k in elenco){
			var pP=elenco[k].split(".");
			var nTsubo=pP[0];
			if(nTsubo.length == 1)nTsubo = "0"+nTsubo;
			var mat = SET.MAT.pointEvi;
			if(pP[2]){
				if(pP[2]=='V')mat = SET.MAT.pointVuoto;
				if(pP[2]=='P')mat = SET.MAT.pointPieno;
				if(pP[2]=='D')mat = SET.MAT.pointDolore;
			}
			var ptSx = scene.getObjectByName("_"+pP[1]+"."+nTsubo+".SX");
			var ptDx = scene.getObjectByName("_"+pP[1]+"."+nTsubo+".DX");
			var ptCc = scene.getObjectByName("_"+pP[1]+"."+nTsubo+".");
			if(ptSx)ptSx.material = mat;
			if(ptDx)ptDx.material = mat;
			if(ptCc)ptCc.material = mat;
			
			SET.tsuboEvidenziati.push(elenco[k]);
		}
	},
	evidenziaMeridianiMod: function( elenco ){
		SET.spegniMeridiani(true);
		for(k in elenco){
			SET.accendiMeridiano(elenco[k],true);
		}
	},
	annullaEvidenziaTsubo: function(){
		if(SET.tsuboEvidenziati.length){
			for(k in SET.tsuboEvidenziati){
				var pT=SET.tsuboEvidenziati[k];
				var pP=pT.split(".");
				var nTsubo=pP[0];
				if(nTsubo.length == 1)nTsubo = "0"+nTsubo;
				var ptSx = scene.getObjectByName("_"+pP[1]+"."+nTsubo+".SX");
				var ptDx = scene.getObjectByName("_"+pP[1]+"."+nTsubo+".DX");
				var ptCc = scene.getObjectByName("_"+pP[1]+"."+nTsubo+".");
				if(ptSx)ptSx.material=SET.MAT.pointTrasp;
				if(ptDx)ptDx.material=SET.MAT.pointTrasp;
				if(ptCc)ptCc.material=SET.MAT.pointTrasp;
				
			}
			SET.tsuboEvidenziati = [];
		}
	},
	settaOverTsubo: function(){
		if(!touchable){
			console.log("OK")
			var els = document.getElementById("scheda_testo").getElementsByClassName("pallinoPat");
			for(e=0;e<els.length;e++){
				els[e].onmouseover = function(){
					SET.overTsubo(this,true);
				}
				els[e].onmouseout = function(){
					SET.overTsubo(this,false);
				}
			}
		}
	},
	ritOverTsubo: function( id, p ){
		if(!touchable){
			SET.overTsubo(document.getElementById("rg"+p),false);
			var elenco = [];
			var els = document.getElementById(id).getElementsByClassName("dettPunto");
			var tot = els.length;
			for(e=0;e<tot;e++){
				var sl = els[e].getElementsByTagName("select");
				var mer = SET.estraiSigla(sl[0].value);
				var nTsubo = sl[1].value;
				if(nTsubo.length == 1)nTsubo='0'+nTsubo;
				elenco.push(nTsubo+"."+mer);
			}
			SET.evidenziaTsuboMod(elenco);
		}
	},
	overTsubo: function( el, over ){
		if(el.classList.contains("dettPunto")){
			var sl = el.getElementsByTagName("select");
			if(!sl.length)return;
			var mer = SET.estraiSigla(sl[0].value);
			var nTsubo = sl[1].value;
			if(typeof(DB.set.meridiani[mer])=='undefined')return;
		}else{
			var re = /selTsubo\([^\)]+\)/ig;
			var re2 = /apriTsubo\([^\,]+\,/ig;
			var html = el.onclick.toString();
			var result = html.match(re);
			if(result){
				var pT=result[0].split("'");
				while(pT[1].indexOf("|")>-1)pT[1]=pT[1].replace("|",".");
				var pP=pT[1].split(".");
				var nTsubo=pP[0];
				var mer=SET.estraiSigla(pP[1]);
			}else{
				result = html.match(re2);
				var pT=result[0].split("'");
				var pP=pT[1].split(".");
				var nTsubo=pP[1];
				var mer=SET.estraiSigla(pP[0]);
			}
		}
		if(nTsubo.length == 1)nTsubo = "0"+nTsubo;
		if(over){
			SET.addEviPalls(mer,nTsubo,'Over');
		}else{
			SET.delEviPalls(mer,nTsubo,'Over');
		}
	},
	convSigla: function( siglaMeridiano ){
		if( localStorage.sistemaSigleMeridiani=='INT' || !__(DB.mtc.meridiani[siglaMeridiano]))return siglaMeridiano;
		else return DB.mtc.meridiani[siglaMeridiano].sigle[localStorage.sistemaSigleMeridiani];
	},
	estraiSigla: function( siglaMeridiano ){
		var siglaDef = siglaMeridiano;
		if(localStorage.sistemaSigleMeridiani=='INT' || !localStorage.sistemaSigleMeridiani)return siglaMeridiano;
		for(m in DB.mtc.meridiani){
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
		for(p in pts){
			var pP = pts[p].split(".");
			str = str.replace(pts[p], pP[0]+"."+SET.convSigla(pP[1].substr(0,2))+pP[1].substr(2,1));
		}
		document.getElementById("scheda_testo"+nScheda).innerHTML = str;
		if(!nScheda){
			var str = document.getElementById("scheda_titolo"+nScheda).innerHTML;
			var pts = str.match(regexp);
			for(p in pts){
				var pP = pts[p].split(".");
				str = str.replace(pts[p], pP[0]+"."+SET.convSigla(pP[1].substr(0,2))+pP[1].substr(2,1));
			}
			document.getElementById("scheda_titolo"+nScheda).innerHTML = str;
		}
	},
	convPuntiScheda: function( html, noPall ){
		if(typeof(noPall)=='undefined')var noPall = false;
		var pallClass = 'pallinoPat';
		if(noPall)pallClass += ' pallinoTsubo';
		var nScheda = '';
		if(SCHEDA.scheda2Aperta)nScheda='2';
		var regexp = /\[\.[0-9]{1,2}\.[A-Z]{2}\.\]/ig;
		var pts = html.match(regexp);
		for(p in pts){
			var pP = pts[p].split(".");
			var n_P = pP[1];
			var siglaMeridiano = pP[2].substr(0,2);
			var n_M = SET.convSigla(siglaMeridiano)+pP[2].substr(2,1);
			var addClick = '';
			if(noPall)addClick = 'return;';
			html = html.replace(pts[p], '<span class="'+pallClass+'" onClick="'+addClick+'SET.selTsubo(\''+n_P+'|'+siglaMeridiano+'\');">'+n_P+'.'+n_M+'</span>');
		}
		var regexp = /\[\.[A-Z]{2}\.\]/ig;
		var pts = html.match(regexp);
		for(p in pts){
			var pP = pts[p].split(".");
			var siglaMeridiano = pP[1].substr(0,2);
			var n_M = SET.convSigla(siglaMeridiano)+pP[1].substr(2,1);
			var nome = '';
			for(m in DB.set.teoria[1].contenuti){
				if(m && DB.set.teoria[1].contenuti[m].sigla == siglaMeridiano)nome = DB.set.teoria[1].contenuti[m].TitoloTeoria;
			}
			html = html.replace(pts[p], '<span class="meridianoPat"' +
										'	   onClick="SET.accendiMeridiano(\''+siglaMeridiano+'\',true);"' +
										'	   onMouseOver="SET.eviMeridiano(\''+siglaMeridiano+'\',true);"' +
										'	   onMouseOut="SET.eviMeridiano(\''+siglaMeridiano+'\',false);">'+htmlEntities(nome)+'</span>');
		}
		return html;
	},
	salvaImpostazioni: function(){
		localStorage.sistemaSigleMeridiani = document.getElementById("sceltaSigle").value;
		SET.caricaMeridiani();
		MENU.chiudiMenu();
	},
	popolaImpSet: function(){
		var s = document.getElementById("sceltaSigle").value;
		if(s == '')s='INT';
		var HTML = '';
		HTML += '<table cellpadding="5" cellspacing="0" border="0" id="tbSigleMeridiani_tab">';
		var disp = true;
		for(m in DB.set.meridiani){
			
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
	
	
	accendiMeridianoSecondario: function( sigla, mantieni ){
		for(m in MERIDIANI){
			if(MERIDIANI[m].categoria == "" ){
				if(MERIDIANI[m].meridianoAcceso){
					if(m!=sigla)SET.spegniMeridiano(m);
				}
			}	
		}
		if(typeof(mantieni) == 'undefined')var mantieni = false;
		/*if(SET.meridianiSecondariAccesi.length && !mantieni){
			SET.spegniMeridianoSecondario();
		}*/
		SET.meridianiSecondariAccesi.push(sigla);
		
		var meridiano = scene.getObjectByName( "LN_"+sigla );
		var percorsoInterno = false;
		for(c in meridiano.children){
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
				for(i in evidenziati[e]){
					scene.getObjectByName( evidenziati[e][i] ).material = MODELLO.MAT.materialVisceriEvi;
				}
			}
		}
		if(isTablet){
			SET.MAT.pointBase.visible = false;
			SET.MAT.lineYang.visible = false;
			SET.MAT.lineYin.visible = false;
			MODELLO.MAT.materialVisceri.visible = false;
			/*MODELLO.MAT.materialOssa.visible = false;*/
		}
	},
	spegniMeridianoSecondario: function( sigla, forza ){
		if(typeof(sigla) == 'undefined')var sigla = '';
		if(typeof(forza) == 'undefined')var forza = false;
		var meridianoPrincipale = false;
		for(m=SET.meridianiSecondariAccesi.length-1;m>-1;m--){
			if(SET.meridianiSecondariAccesi[m] == sigla || !sigla){
				var meridiano = scene.getObjectByName( "LN_"+SET.meridianiSecondariAccesi[m] );
				if(SET.meridianiSecondariAccesi[m].indexOf("_")==-1){
					var mer = SET.meridianiSecondariAccesi[m];
					setTimeout(function(mer){SET.eviMeridiano(mer,false);},200,mer);
					//if(SET.meridianiSecondariAccesi[m]!='CV' && SET.meridianiSecondariAccesi[m] != 'GV')
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
						for(i in evidenziati[e]){
							var tipo = scene.getObjectByName( evidenziati[e][i] ).parent.name;
							scene.getObjectByName( evidenziati[e][i] ).material = eval("MODELLO.MAT.material"+tipo);
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
			/*MODELLO.MAT.materialOssa.visible = true;*/
		}
	},
	
	addEviPalls: function( siglaMeridiano, nTsubo, tipo ){
		var els = scene.getObjectByName("PT_"+siglaMeridiano).children;
		for(e in els){
			if(els[e].name.indexOf(siglaMeridiano+"."+nTsubo+".")==0){
				var geoPoint =  new THREE.SphereGeometry( 0.11, 16, 16 );
				var eviPoint;
				eviPoint =  new THREE.Mesh( geoPoint, this.MAT.pointSel2.clone() );
				eviPoint.name=tipo+' point: '+els[e].name;
				eviPoint.material.visible=true;
				eviPoint.position.set( els[e].position.x, els[e].position.y, els[e].position.z )
				SETS.add( eviPoint );
			}
		}
	},
	delEviPalls: function( siglaMeridiano, nTsubo, tipo ){
		var els = SETS.children;
		for(e=els.length-1;e>=0;e--){
			if(els[e].name.indexOf(tipo+' point: '+siglaMeridiano+"."+nTsubo+".")==0){
				SETS.remove( els[e] );
			}
		}
	},
	
	/* FUNZIONI DERIVATE */
	_caricaScheda: function( args ){
		if( args.classe != 'tab_tsubo' && args.classe != SCHEDA.classeAperta)SET.pMod = -1;
	},
	_scaricaScheda: function(){
		SET.pMod = -1;
	},
	_scaricaSet: function(){
		SET.spegniMeridianoSecondario();
	},
	_torna: function( args ){
		if(typeof(args.daCarica) == 'undefined')SET.pMod = -1;
	},
	filtraSet: function(){
		var vis = true;
		if(DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())vis = false;
		for(m in SETS.children){
			if(SET.MERIDIANI_free.indexOf(SETS.children[m].name.split("_")[1])==-1)SETS.children[m].visible = vis;
		}
		var ME = document.getElementById("lista_meridiani").getElementsByClassName("listaMeridiani")[0].getElementsByTagName("div");
		for(m in ME){
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