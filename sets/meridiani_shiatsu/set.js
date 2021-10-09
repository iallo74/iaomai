
SET = {
	
	// VARIABILI
	INTERSECTED: null,
	P: [],
	PT: [],
	LN: [],
	AR: [],
	GD: [],
	time: 0,
	pulse: 1,
	ptSel: null,
	eviPoint1: '',
	eviPoint2: '',
	diffX: 0,
	diffY: 0,
	mAtt: '',
	tmChiusura: null,
	tsuboEvidenziati: [],
	pMod: -1,
	pointEvi: '',
	meridianiOn: false,
	
	// FUNZIONI
	_init: function(){
		
		if(!localStorage.sistemaMeridiani){
			localStorage.sistemaMeridiani = "";
			localStorage.sistemaMeridianiAdd = "";
		}
		SETS = new THREE.Group();
		SETS.name = "SETS";
		for(m in MERIDIANI){ // elenco i meridiani
			this.LN[m] = new THREE.Group();
			this.LN[m].name="LN_"+m;
			var n=-1;
			
			var categoria=__(MERIDIANI[m].categoria);
			var vis = true;
			if(categoria!=localStorage.sistemaMeridiani)vis = false;
			this.LN[m].userData.categoria=categoria;
			
			var LNS=MERIDIANI[m][globals.modello.cartella].linee;
			if(LNS){
				for(l in LNS){ // aggiungo le linee
					var loader = new THREE.ObjectLoader();
					var mesh =  loader.parse(JSON.parse(LZString.decompressFromBase64(LNS[l].obj)));
					var intAdd='';
					if(LNS[l].interno)intAdd='Int';
					if(!MERIDIANI[m].yin){
						mesh.material=eval("this.MAT.lineYang"+intAdd);
					}else{
						mesh.material=eval("this.MAT.lineYin"+intAdd);
						mesh.computeLineDistances();
					}
					mesh.userData.interno=LNS[l].interno;
					this.LN[m].add( mesh );
				}
			}
			this.LN[m].visible = vis;
			this.LN[m].userData.categoria = categoria;
			SETS.add( this.LN[m] );
			var ARS = MERIDIANI[m][globals.modello.cartella].aree;
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
			var GDS=MERIDIANI[m][globals.modello.cartella].guide;
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
			
			this.PT[m] = new THREE.Group();
			this.PT[m].name="PT_"+m;
			// carico i punti parametrizzati
			var n=-1;
			var PTS=MERIDIANI[m][globals.modello.cartella].punti;
			
			for(p in PTS){
				if(PTS[p]!=''){
					var x=PTS[p].array[0];
					var y=PTS[p].array[1];
					var z=PTS[p].array[2];
					var pN = PTS[p].nome.split(".");
					var N = pN[1];
						
					// pallino colorato
					n++;
					var geometry = new THREE.SphereGeometry( 0.02, 6, 6 );
					this.P[n] = new THREE.Mesh( geometry, this.MAT.pointBase );
					this.P[n].position.set(x,y,z);
					this.P[n].name=PTS[p].nome;
					this.PT[m].add( this.P[n] );
						
					// pallino trasparente
					n++;
					var geometryTrasp = new THREE.SphereGeometry( 0.07, 8, 8 );
					this.P[n] = new THREE.Mesh( geometryTrasp, this.MAT.pointTrasp ); 
					this.P[n].position.set(x,y,z);
					this.P[n].name='_'+PTS[p].nome
					this.P[n].userData.raycastable = true;
					this.PT[m].add( this.P[n] );
				}
			}
			this.PT[m].visible=vis;
			this.PT[m].userData.categoria = categoria;
			SETS.add( this.PT[m] );
		}
		
		if(!localStorage.sistemaSigleMeridiani)localStorage.sistemaSigleMeridiani="INT";
		var contPulsanti = 	'<span class="menuElenchi" onclick="MENU.visMM(\'btnCarMapMenu\');"></span>' +
							'<span id="btnCarMapMenu" class="btn_meridiani_shiatsu titolo_set">' +
							'<span>ShiatsuMap</span>' +
							'<i class="elMenu" id="chiudiSet" onClick="caricaSet(\''+globals.set.cartella+'\',document.getElementById(\'p_'+globals.set.cartella+'\'));" title="'+htmlEntities(Lingua(TXT_ChiudiSet))+'"><span>' +
								htmlEntities(Lingua(TXT_ChiudiSet)) +
							'</span></i><i class="elMenu" id="impostazioniSet" onClick="MENU.visImpset();" title="'+htmlEntities(Lingua(TXT_ImpostazioniSet))+'"><span>' +
								htmlEntities(Lingua(TXT_ImpostazioniSet)) +
							'</span></i>' +
							'<i class="elMenu" id="help_set" onClick="MENU.visElencoSets(\''+globals.set.cartella+'\')"><b style="font-weight:normal;font-style:normal;">?</b><span>' +
								htmlEntities(Lingua(TXT_Help)) +
							'</span></i></span>';
		var contElenco = '';
		
		// meridiani
		contPulsanti += '<div id="pulsante_meridiani" class="frdx" onClick="SCHEDA.selElenco(\'meridiani\');">'+Lingua(TXT_Meridiani)+'</div>';
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
		
		contIcona = '<div id="p_set" onClick="SCHEDA.apriElenco(\'set\');"><svg viewBox="0 0 12 48"><polygon points="5,24 12,13 12,35"></polygon></svg><i>'+htmlEntities(Lingua(TXT_ShiatsuMap))+'</i></div>';;
		
		var preElenco = SCHEDA.elencoSel;
		SCHEDA.caricaElenco(globals.set.nome,contElenco);
		SCHEDA.caricaPulsanti(contPulsanti);
		SCHEDA.caricaBtns(contBtns,contIcona);
		SCHEDA.swPulsanti(true);
		
		HTML_imp = '';
		
		// sistemi meridiani
		HTML_imp += '<p><i>'+htmlEntities(Lingua(TXT_SistemaMeridiani))+':</i> ';
		HTML_imp += '<select id="sceltaMeridiani">';
		HTML_imp += '  <option value=""';
		if(localStorage.sistemaMeridiani == '' || !__(localStorage.sistemaMeridiani) )HTML_imp += ' SELECTED';
		HTML_imp += '>'+htmlEntities(Lingua(TXT_MeridianiCinesi))+'</option>'+H.chr10;
		HTML_imp += '  <option value="MAS"';
		if(localStorage.sistemaMeridiani == 'MAS')HTML_imp += ' SELECTED';
		HTML_imp += '>'+htmlEntities(Lingua(TXT_MeridianiGiapponesi))+'</option>'+H.chr10;
		HTML_imp += '</select></p>'+H.chr10;
		
		
		// sistemi sigle
		HTML_imp += '<p><i>'+htmlEntities(Lingua(TXT_SistemaSigle))+':</i> ';
		HTML_imp += '<select id="sceltaSigle" onChange="SET.popolaImpSet();">';
		for(k in DB.mtc.meridiani["BL"]){
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
		
		// pallini di evidenza
		var geoPoint =  new THREE.SphereGeometry( 0.11, 16, 16 );
		this.eviPoint1 =  new THREE.Mesh( geoPoint, this.MAT.pointSel2.clone() );
		this.eviPoint1.name='Selected point 1';
		this.eviPoint1.userData.categoria='';
		this.eviPoint2 =  new THREE.Mesh( geoPoint, this.MAT.pointSel2.clone() );
		this.eviPoint2.name='Selected point 2';
		this.eviPoint2.userData.categoria='';
		SETS.add( this.eviPoint1 );
		SETS.add( this.eviPoint2 );
		manichino.add( SETS );
		
		this._setLineMaterials();
		raycastDisable=false;
		
		
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
		if(postApreSet)SCHEDA.apriElenco('set');
		postApreSet = false;
	},
	
	// RENDER SET
	_render: function(){
		var make=true;
		//console.log(manichinoCaricato && !raycastDisable && !controlsM._ZPR && controlsM._MM)
		if(manichinoCaricato && !raycastDisable && !controlsM._ZPR && !controlsM._premuto){//} && controlsM._MM){ // roll-over sui punti
			SET.meridianiOn = true;
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
				if(near.object.userData.raycastable!=true)objOver='';
				else objOver=near.object;
			}
			var n1=n2='';
			SET.desIntersected();
			if(objOver){
				
				this.INTERSECTED = objOver;
				if(this.INTERSECTED.name.substr(0,1)=='_'){
					var n1=objOver.name.substr(1,2); // meridiano intersecato
					var pN = this.INTERSECTED.name.split(".");
					visToolTip((pN[1]*1)+"."+SET.convSigla(pN[0].substr(1,2)));
					if(!MERIDIANI[n1].meridianoAcceso)this.coloraMeridiano(this.INTERSECTED.name.substr(1,2),'Over','Over');
					renderer.domElement.style.cursor='pointer';
				}
				if(this.INTERSECTED.name.substr(2,4)=='_mas'){
					var n1 = this.INTERSECTED.name.substr(0,2);
					for(c in DB.set.teoria[1].contenuti){
						if(n1 == DB.set.teoria[1].contenuti[c].sigla)visToolTip(DB.set.teoria[1].contenuti[c].TitoloTeoria);
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
	setPulsePt: function( pt, pulse, op, mat ){
		if(typeof(mat)=='undefined')var mat = '';
		var pP = pt.name.split(".");
		var ptCc = manichino.getObjectByName(pP[0]+"."+pP[1]);
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
		}
		SET.MAT.pointSel.setValues( { opacity: op } );
	},
	desIntersected: function(){
		var n='';
		if(this.INTERSECTED){
			if(this.INTERSECTED.name.substr(0,1)=='_'){
				n=this.INTERSECTED.name.substr(1,2); // meridiano 
				if(!__(MERIDIANI[n].meridianoAcceso,false))this.coloraMeridiano(n,'','Base');
			}
			if(this.INTERSECTED.name.substr(2,4)=='_mas'){
				n = this.INTERSECTED.name.substr(0,2);
				if(!__(MERIDIANI[n+"_mas"].meridianoAcceso,false))this.coloraMeridiano(n,'','Base');
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
	_onClick: function( e ){
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
				if(this.INTERSECTED.name.substr(0,1)=='_'){
					var n=this.INTERSECTED.name.split("_");
					var ritorno = '';
					if(SCHEDA.classeAperta && SCHEDA.classeAperta!='tab_tsubo')ritorno = 'SET.chiudiTsubo(true)';
					SET.apriTsubo(n[1],ritorno);
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
	apriTsubo: function( PT_name, ritorno ){
		if(localStorage.sistemaMeridiani!=''){
			SET.cambiaSistema('',true);
			localStorage.sistemaMeridiani = '';
			localStorage.sistemaMeridianiAdd = '';
		}
		if(typeof(ritorno) == 'undefined')var ritorno = '';
		if(this.ptSel){
			var mat=this.MAT.pointOn;
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			SET.setPulsePt( this.ptSel, 1, 1, mat );
		}
		var pP = PT_name.split(".");		
		var siglaMeridiano = pP[0];
		var nTsubo = parseInt(pP[1])-1;
		if(!scene.getObjectByName( PT_name )){
			if(!(PT=scene.getObjectByName( PT_name + ".SX" ))){
				PT=scene.getObjectByName( PT_name + ".SX" );
			}
		}else PT=scene.getObjectByName( PT_name );
		if(this.ptSel && !SCHEDA.schedaAperta)this.chiudiTsubo();
		this.ptSel=PT;
		var pP = this.ptSel.name.split(".");
		var ptCc = manichino.getObjectByName(pP[0]+"."+pP[1]);
		var ptSx = manichino.getObjectByName(pP[0]+"."+pP[1]+".SX");
		var ptDx = manichino.getObjectByName(pP[0]+"."+pP[1]+".DX");
		if(typeof(ptCc)=='undefined')ptCc=null;
		if(typeof(ptSx)=='undefined')ptSx=null;
		if(typeof(ptDx)=='undefined')ptDx=null;
		this.accendiMeridiano(pP[0]);
		var mat = this.MAT.pointSel;
		if(PT.userData.nota)mat = this.MAT.pointSelNote;
		if(ptCc)ptCc.material=mat;
		if(ptSx)ptSx.material=mat;
		if(ptDx)ptDx.material=mat;
		this.diffX = this.ptSel.position.x*1;
		this.diffY = this.ptSel.position.y*1;
		
		panEndZero = { x: 0-this.ptSel.position.x, y: 0-this.ptSel.position.y, z: 0-this.ptSel.position.z };
		panEnd = { x: 0, y: 0, z: 0 };
		if(smothingView){
			if(manichinoCont.position.z<15)zoomEnd = 15;
			normalizeRotation();
		}
		
		if(ptCc){
			this.eviPoint1.position.set( ptCc.position.x, ptCc.position.y, ptCc.position.z );
			this.eviPoint1.material.visible = true;
			this.eviPoint2.material.visible = false;
		}else{
			if(ptSx){
				this.eviPoint1.position.set( ptSx.position.x, ptSx.position.y, ptSx.position.z );
				this.eviPoint1.material.visible = true;
			}else this.eviPoint1.material.visible = false;
			if(ptDx){
				this.eviPoint2.position.set( ptDx.position.x, ptDx.position.y, ptDx.position.z );
				this.eviPoint2.material.visible = true;
			}else this.eviPoint2.material.visible = false;
		}
		this.pulse = 1;
		
		SET.caricaTsubo( siglaMeridiano, nTsubo, ritorno );
	},
	chiudiTsubo: function( nonChiudereScheda ){
		if(!nonChiudereScheda){
			endChangeDetection();
			SCHEDA.formModificato = false;
		}
		
		var exPt = SET.ptSel;
		
		if(typeof(nonChiudereScheda)=='undefined')nonChiudereScheda=false;
		if(!this.ptSel)return;
		var pP = this.ptSel.name.split(".");
		var ptCc = manichino.getObjectByName(pP[0]+"."+pP[1]);
		var ptSx = manichino.getObjectByName(pP[0]+"."+pP[1]+".SX");
		var ptDx = manichino.getObjectByName(pP[0]+"."+pP[1]+".DX");
		this.eviPoint1.material.visible = false;
		this.eviPoint2.material.visible = false;
		this.pulse=0;
		if(typeof(ptCc)=='undefined')ptCc=null;
		if(typeof(ptSx)=='undefined')ptSx=null;
		if(typeof(ptDx)=='undefined')ptDx=null;
		var mat=this.MAT.pointBase;
		if(MERIDIANI[pP[0]].meridianoAcceso)mat=this.MAT.pointSel;
		if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
		if(ptCc){
			ptCc.material=mat;
			ptCc.material.opacity=1;
			ptCc.scale.set(1,1,1);
		}
		if(ptSx){
			ptSx.material=mat;
			ptSx.material.opacity=1;
			ptSx.scale.set(1,1,1);
		}
		if(ptDx){
			ptDx.material=mat;
			ptDx.material.opacity=1;
			ptDx.scale.set(1,1,1);
 		}
		this.ptSel=null;
		if(SCHEDA.scheda2Aperta){
			nonChiudereScheda=true;
			document.getElementById("scheda_ritorno").click();
		}
		if(!nonChiudereScheda)SCHEDA.scaricaScheda(); 
		
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
	coloraMeridiano: function( siglaMeridiano, matLine, matPoint ){
		var SM = siglaMeridiano.replace(localStorage.sistemaMeridianiAdd,"") + localStorage.sistemaMeridianiAdd;
		if(this.PT[SM]){
			var els = this.PT[SM].children;
			for(v in els){
				if(els[v].name.substr(0,1)!='_'){
					var mat = matPoint;
					try{
						if(els[v].userData.nota)mat="Note";
					}catch(err){}
					els[v].material = eval('this.MAT.point'+mat); // cambiare se NOTA
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
		for(m in MERIDIANI){
			//if(!__(MERIDIANI[m].meridianoAcceso,false) && m.indexOf("_")==-1){
			pass = false;
			if(!__(MERIDIANI[m].meridianoAcceso,false))pass=true;
			if(localStorage.sistemaMeridiani && m.indexOf(localStorage.sistemaMeridianiAdd)==-1)pass=false;
			if(pass){
				this.coloraMeridiano(m,'','Base');
			}
		}
	},
	accendiMeridiano: function( siglaMeridiano, g ){
		// verifico le autorizzazioni
		if(SET.MERIDIANI_free.indexOf(siglaMeridiano)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(Lingua(TXT_MsgFunzioneSoloPay));
			controlsM._MM = true;
			return;
		}
		// --------------------------
		if(typeof(g)=='undefined')var g = false;
		var SM = siglaMeridiano + localStorage.sistemaMeridianiAdd;
		if(!g || (g && this.ptSel)){
			for(m in MERIDIANI){
				if(MERIDIANI[m].categoria = localStorage.sistemaMeridiani){
					var pass=true;
					if(g && this.ptSel){
						if(siglaMeridiano==m)pass=false;
					}
					if(pass){
						document.getElementById("p"+m).classList.remove("elencoSel");
						document.getElementById("sm"+m).classList.remove("elencoSel");
						this.coloraMeridiano(m,'','Base');
						MERIDIANI[m+localStorage.sistemaMeridianiAdd].meridianoAcceso=false;
					}
				}
			}
		}
		if(g && this.ptSel)this.chiudiTsubo();
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
			SET.swContrastMethod(true);
		}
	},
	spegniMeridiano: function( siglaMeridiano ){
		var SM = siglaMeridiano + localStorage.sistemaMeridianiAdd;
		if(this.ptSel)this.chiudiTsubo();
		document.getElementById("p"+siglaMeridiano).classList.remove("elencoSel");
		document.getElementById("sm"+siglaMeridiano).classList.remove("elencoSel");
		this.coloraMeridiano(siglaMeridiano,'','Base');
		MERIDIANI[SM].meridianoAcceso=false;
	},
	spegniMeridiani: function(forza){
		if(typeof(forza)=='undefined')var forza = false;
		if(SCHEDA.scheda2Aperta || forza){
			for(m in MERIDIANI){
				if(MERIDIANI[m].meridianoAcceso){
					var mer = m.substr(0,2);
					SET.accendiMeridiano(mer,true);
					SET.coloraMeridiano(mer,'','Base');
				}
			}
		}
	},
	_applyLineMethod: function(){
		for(m in MERIDIANI){
			if(MERIDIANI[m].meridianoAcceso && MERIDIANI[m].categoria == localStorage.sistemaMeridiani){
				var yinAdd = '';
				if(localStorage.sistemaMeridiani && MERIDIANI[m].yin)yinAdd = 'Yin';
				this.coloraMeridiano(m,'On'+localStorage.sistemaMeridiani+yinAdd+'["'+MERIDIANI[m].elemento+'"]','On');
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
	scriviTsubo: function(tsubo,esteso){
		if(typeof(esteso)=='undefined')var esteso = false;
		var pT = tsubo.split(".");
		var siglaTsubo = pT[0]+"."+pT[1];
		var nTsubo = pT[0];
		if(nTsubo.length == 1)nTsubo = '0' + nTsubo;
		var html = '<a class="pallinoPat';
		if(esteso)html += ' pallinoPatEsteso';
		html += '" onClick="SET.apriTsubo(\''+pT[1]+"."+nTsubo+'\',\'SET.chiudiTsubo(true)\');"> '+siglaTsubo+'';
		if(esteso)html+='<i>'+tsubo.substr(siglaTsubo.length,tsubo.length-siglaTsubo.length);
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
			var ptCc = scene.getObjectByName("_"+pP[1]+"."+nTsubo);
			if(ptSx)ptSx.material=SET.MAT.pointEvi;
			if(ptDx)ptDx.material=SET.MAT.pointEvi;
			if(ptCc)ptCc.material=SET.MAT.pointEvi;
			
			SET.tsuboEvidenziati.push(pT[1]);
		}
		SET.settaOverTsubo();
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
			var ptCc = scene.getObjectByName("_"+pP[1]+"."+nTsubo);
			if(ptSx)ptSx.material = mat;
			if(ptDx)ptDx.material = mat;
			if(ptCc)ptCc.material = mat;
			
			SET.tsuboEvidenziati.push(elenco[k]);
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
				var ptCc = scene.getObjectByName("_"+pP[1]+"."+nTsubo);
				if(ptSx)ptSx.material=SET.MAT.pointTrasp;
				if(ptDx)ptDx.material=SET.MAT.pointTrasp;
				if(ptCc)ptCc.material=SET.MAT.pointTrasp;
				
			}
			SET.tsuboEvidenziati = [];
		}
	},
	settaOverTsubo: function(){
		if(!touchable){
			var els = document.getElementById("scheda_testo").getElementsByClassName("pallinoPat");
			for(e in els){
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
				var mer = sl[0].value;
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
			var mer = sl[0].value;
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
				var mer=pP[1];
			}else{
				result = html.match(re2);
				var pT=result[0].split("'");
				var pP=pT[1].split(".");
				var nTsubo=pP[1];
				var mer=pP[0];
			}
		}
		
		if(nTsubo.length == 1)nTsubo = "0"+nTsubo;
		var pointEvi = mer+"."+nTsubo;
		var ptCc = manichino.getObjectByName(pointEvi);
		var ptSx = manichino.getObjectByName(pointEvi+".SX");
		var ptDx = manichino.getObjectByName(pointEvi+".DX");
		if(typeof(ptCc)=='undefined')ptCc=null;
		if(typeof(ptSx)=='undefined')ptSx=null;
		if(typeof(ptDx)=='undefined')ptDx=null;
		if(over){
			if(ptCc){
				this.eviPoint1.position.set( ptCc.position.x, ptCc.position.y, ptCc.position.z );
				this.eviPoint1.material.visible = true;
				this.eviPoint2.material.visible = false;
			}else{
				if(ptSx){
					this.eviPoint1.position.set( ptSx.position.x, ptSx.position.y, ptSx.position.z );
					this.eviPoint1.material.visible = true;
				}else this.eviPoint1.material.visible = false;
				if(ptDx){
					this.eviPoint2.position.set( ptDx.position.x, ptDx.position.y, ptDx.position.z );
					this.eviPoint2.material.visible = true;
				}else this.eviPoint2.material.visible = false;
			}
		}else if(!this.ptSel || (this.ptSel != ptSx && this.ptSel != ptCc)){
			this.eviPoint1.material.visible = false;
			this.eviPoint2.material.visible = false;
		}
	},
	convSigla: function( siglaMeridiano ){
		if( localStorage.sistemaSigleMeridiani=='INT' )return siglaMeridiano;
		else return DB.mtc.meridiani[siglaMeridiano].sigle[localStorage.sistemaSigleMeridiani];
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
	convPuntiScheda: function( html ){
		var nScheda = '';
		if(SCHEDA.scheda2Aperta)nScheda='2';
		var regexp = /\[\.[0-9]{1,2}\.[A-Z]{2}\.\]/ig;
		var pts = html.match(regexp);
		for(p in pts){
			var pP = pts[p].split(".");
			var n_P = pP[1];
			var n_M = SET.convSigla(pP[2].substr(0,2))+pP[2].substr(2,1);
			html = html.replace(pts[p], '<span class="pallinoPat" onClick="SET.selTsubo(\''+n_P+'|'+n_M+'\')">'+n_P+'.'+n_M+'</span>');
		}
		var regexp = /\[\.[A-Z]{2}\.\]/ig;
		var pts = html.match(regexp);
		for(p in pts){
			var pP = pts[p].split(".");
			var n_M = SET.convSigla(pP[1].substr(0,2))+pP[1].substr(2,1);
			var nome = '';
			for(m in DB.set.teoria[1].contenuti){
				if(DB.set.teoria[1].contenuti[m].sigla == n_M)nome = DB.set.teoria[1].contenuti[m].TitoloTeoria;
			}
			html = html.replace(pts[p], '<span class="meridianoPat"' +
										'	   onClick="SET.accendiMeridiano(\''+n_M+'\',true);"' +
										'	   onMouseOver="SET.eviMeridiano(\''+n_M+'\',true);"' +
										'	   onMouseOut="SET.eviMeridiano(\''+n_M+'\',false);">'+htmlEntities(nome)+'</span>');
		}
		return html;
	},
	salvaImpostazioni: function(){
		localStorage.sistemaSigleMeridiani = document.getElementById("sceltaSigle").value;
		SET.cambiaSistema(document.getElementById("sceltaMeridiani").value);
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
			else HTML += DB.mtc.meridiani[m].sigle[n];
			
			HTML += '		</td>';
			if(!disp)HTML += 
					'	</tr>';
			disp = !disp;
		}
		HTML += '</table>';
		document.getElementById("tbSigleMeridiani").innerHTML = HTML;
		
		var els = document.getElementById("sceltaMeridiani").options;
		for(e in els){
			if(els[e].value == localStorage.sistemaMeridiani)document.getElementById("sceltaMeridiani").selectedIndex = e;
		}
		var els = document.getElementById("sceltaMeridianiElenco").options;
		for(e in els){
			if(els[e].value == localStorage.sistemaMeridiani)document.getElementById("sceltaMeridianiElenco").selectedIndex = e;
		}
	},
	filtraSet: function( togliLoader ){
		if(typeof(togliLoader)=='undefined')var togliLoader = false;
		var vis = true;
		if(	DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())vis = false;
		for(m in SETS.children){
			//if(SETS.children[m].name.indexOf("Selected")==-1){
				var visMer = vis;
				if(	SET.MERIDIANI_free.indexOf(SETS.children[m].name.split("_")[1])!=-1 )visMer = true;
				if( SETS.children[m].userData.categoria != localStorage.sistemaMeridiani )visMer = false;
				if(SETS.children[m].name.substr(0,2)=='AR' && localStorage.sistemaMeridiani=='MAS')visMer = true;
				SETS.children[m].visible = visMer;
			//}
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
		if(togliLoader){
			var els = document.getElementById("sceltaMeridianiElenco").options;
			for(e in els){
				if(els[e].value == localStorage.sistemaMeridiani)document.getElementById("sceltaMeridianiElenco").selectedIndex = e;
			}
			nasLoader();
		}
	},
	cambiaSistema: function( sistema, loader ){
		if(typeof(loader)=='undefined')var loader = false;
		if(localStorage.sistemaMeridiani == sistema)return;
		var t = t2 = 10;
		if(loader){
			visLoader('');
			t = 400;
			t2 = 200;
		}
		setTimeout(function(sistema){
			SET.spegniMeridiani(true);
			localStorage.sistemaMeridiani = sistema;
			if(localStorage.sistemaMeridiani)localStorage.sistemaMeridianiAdd = "_"+localStorage.sistemaMeridiani.toLowerCase();
			else localStorage.sistemaMeridianiAdd = '';
			//SET.caricaMeridiani();
			SET.filtraMeridiani();
		},t2,sistema);
		setTimeout(function(loader){SET.filtraSet(loader);},t,loader);
	},
	
	/* FUNZIONI DERIVATE */
	_caricaScheda: function( args ){
		if( args.classe != 'tab_tsubo' && args.classe != SCHEDA.classeAperta)SET.pMod = -1;
	},
	_scaricaScheda: function(){
		SET.pMod = -1;
	},
	_scaricaSet: function(){
		//
	},
	_torna: function( args ){
		if(typeof(args.daCarica) == 'undefined')SET.pMod = -1;
	}
}