var SET = {
	// VARIABILI
	INTERSECTED: null,
	P: [],
	PT: null,
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
	preCM: false, // memorizza il contrast method prima di attivarlo su un punto interno
	eviPalls: [],
	geometryPallino: null,
	geometryPallinoTrasp: null,
	snd: null,
	areas50: false,
	smActive: false,
	smPressed: false,
	memPos: {
		position: null,
		rotation: null
	},
	wVideo: 0,
	tmResVideo: null,
	
	// FUNZIONI
	_init: function(){

		/* if(navigator.userAgent.indexOf("Macintosh")>-1 || iPhone || iPad){
			SET.MAT.lineWidth = 0.003;
		} */
		//SET.MAT.lineWidth = 0.005;
		//if(window.devicePixelRatio!=1)SET.MAT.lineWidth *= (window.devicePixelRatio*.5);

		SETS = new THREE.Group();
		SETS.name = "SETS";
		
		/*let facce = 6,
			facceTrasp = 8;*/
		let facce = 5,
			facceTrasp = 7;
		if(isTablet){
			facce = 4;
			facceTrasp = 6;
		}
		let modelloAperto = globals.modello.cartella;
		if(!modelloAperto)modelloAperto='donna';
		this.geometryPallino = new THREE.SphereGeometry( 0.04, facce, facce );
		this.geometryPallinoTrasp = new THREE.SphereGeometry( 0.07, facceTrasp, facceTrasp );
		
		this.PT = new THREE.Group();
		this.PT.name="PT";
		// carico i punti parametrizzati
		n=-1;
		let PTS=MAPPA.punti[modelloAperto],
			ptAdd = false;
		
		for(let p in PTS){
			if(PTS[p]!=''){
				let x = PTS[p].array[0],
					y = PTS[p].array[1],
					z = PTS[p].array[2],
					pP = PTS[p].nome.trim().split(" "),
					nomePunto = pP[0],
					muscolo = pP[1].substr(1,pP[1].length-2);
				
				
				// pallino colorato
				n++;
				this.P[n] = new THREE.Mesh( this.geometryPallino, this.MAT.pointBase );
				this.P[n].position.set(x,y,z);
				this.P[n].name=nomePunto;
				this.P[n].userData.muscolo=muscolo;
				this.PT.add( this.P[n] );
					
				// pallino trasparente
				n++;
				this.P[n] = new THREE.Mesh( this.geometryPallinoTrasp, this.MAT.pointTrasp ); 
				this.P[n].position.set(x,y,z);
				this.P[n].name='_'+nomePunto;
				this.P[n].userData.muscolo=muscolo;
				this.PT.add( this.P[n] );
				ptAdd = true;
			}
		}
		if(ptAdd)SETS.add( this.PT );

		if(globals.modello.cartella){
			if(!areasView){
				MODELLO.swArea(2);
				MODELLO.swArea(1);
			}
			setTimeout(function(){MODELLO.op('Pelle',1);},200);
			SET.MAT.iniMappeMuscoli();
		}

		let contPulsanti = 	'<span class="menuElenchi" onclick="MENU.visMM(\'btnCarMapMenu\');"></span>' +
							'<span id="btnCarMapMenu" class="btn_meridiani_cinesi titolo_set">' +
							'<span onMouseDown="SCHEDA.iniziaMoveScheda(event);"' +
								 ' onTouchStart="SCHEDA.iniziaMoveScheda(event);">TriggerpointsMap</span>' +
							'<span id="mappe_titolo_freccia" onclick="MENU.visSets();" class="btn_altri_archivi"><i>'+TXT("AltreMappe")+'</i></span>' +
							'<i class="elMenu" id="impostazioniSet" onClick="MENU.visImpset();" title="'+htmlEntities(TXT("ImpostazioniSet"))+'"><span>' +
								htmlEntities(TXT("ImpostazioniSet")) +
							'</span></i>' +
							'<i class="elMenu" id="help_set" onClick="GUIDA.visFumetto(\'guida_set\',true,true);">?</i></span>';
		let contElenco = '';
		
		contPulsanti += '<div id="pulsante_modello" onClick="cambiaModello(\'donna\');">'+TXT("ApriModello3D")+'</div>';

		contPulsanti += '<span id="noLicenze" onClick="MENU.visLicenze();">'+TXT("noLicenze")+'</span>';
		contPulsanti += '<span id="demoVersion" onClick="MENU.visLogin();">'+TXT("demoVersion")+'</span>';

		// mappa punti
		contPulsanti += '<div id="pulsante_punti" class="frdx" onClick="SCHEDA.selElenco(\'punti\');">'+TXT("MappaPunti")+'</div>';
		contElenco += '<div id="lista_punti"></div>';
		
		// patologie
		contPulsanti += '<div id="pulsante_patologie" class="frdx" onClick="SCHEDA.selElenco(\'patologie\');">'+TXT("Patologie")+'</div>';
		contElenco += '<div id="lista_patologie"></div>';
		
		// procedure personalizzare
		contPulsanti += '<div id="pulsante_procedure" class="frdx" onClick="SCHEDA.selElenco(\'procedure\');">'+TXT("Procedure")+'</div>';
		contElenco += '<div id="lista_procedure"></div>';
		
		// teoria
		contPulsanti += '<div id="pulsante_teoria" class="frdx" onClick="SCHEDA.selElenco(\'teoria\');">'+TXT("Approfondimenti")+'</div>';
		contElenco += '<div id="lista_teoria"></div>';

		contPulsanti += '<span id="quitSet" onClick="chiudiSet();">'+TXT("EsciDa")+' TriggerpointsMap</span>';
		
		let contBtns = '';
		
		let contIcona = '<div id="p_set" onClick="SCHEDA.apriElenco(\'set\',true);"><svg viewBox="0 0 12 48"><polygon points="5,24 12,13 12,35"></polygon></svg><i>'+htmlEntities(TXT("TriggerPoints"))+'</i></div>';;
		
		let preElenco = SCHEDA.elencoSel;
		SCHEDA.caricaElenco(globals.set.nome,contElenco);
		SCHEDA.caricaPulsanti(contPulsanti);
		SCHEDA.caricaBtns(contBtns,contIcona);
		SCHEDA.swPulsanti(true);
		
		//document.getElementById("divs").innerHTML = '';
		
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
		
		SET.leggiNote();
		nasLoader();
		if(postApreSet){
			if(	SCHEDA.livelloApertura!=3 ){
				
				if(	SCHEDA.classeAperta != 'scheda_A' &&
					SCHEDA.classeAperta != 'scheda_B' ){
						if(!smartMenu)SCHEDA.apriElenco('set');
				}else{
					SCHEDA.apriElenco('base');
					PAZIENTI.caricaDettagliSet();
				}
				
			}else{
				//if(!SET.ptSel && !smartMenu)GUIDA.visFumetto("guida_set_mini",false,true);
				SCHEDA.chiudiElenco();
				MENU.chiudiMenu();
			}
		}
		/*if(!globals.modello.cartella){
			GUIDA.visFumetto("guida_generica");
		}*/
		
		postApreSet = false;
		if(smartMenu)overInterfaccia=true;
		SET.riapriPunto();
		CUSTOMS._init();
		SET.verSistema();
		
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
			let el = {x: manichinoCont.rotation.x, y: manichinoCont.rotation.y };
			if(SET.ptSel){
				let name = SET.ptSel.name;
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
		for(let i in MAPPA.posizioni){
			if(scene.getObjectByName(i))scene.getObjectByName(i).visible = false;
			if(scene.getObjectByName("_"+i))scene.getObjectByName("_"+i).visible = false;
		}
	},
	makeUnique: function(){
		let els = [];
		let posizioni = {};
		for(let i in MAPPA.posizioni){
			if(els.indexOf(i)==-1){
				posizioni[i] = MAPPA.posizioni[i];
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


		let make = true;
	 	if(manichinoCaricato && !raycastDisable && !controlsM._ZPR && !controlsM._premuto){ // roll-over sui punti
			
			camera.updateMatrixWorld();
			raycaster.setFromCamera( mouse, camera );
			raycaster.params.Points.threshold = 20;
			
			let objOver='',
				ints = [];
			if(SETS){
				for(let i in SETS.children){
					if(	SETS.children[i].visible &&
						SETS.children[i].isGroup){
						let intersects = raycaster.intersectObjects( SETS.children[i].children );
						if ( intersects.length > 0 ) { // roll-over
							for(l in intersects){
								ints.push(intersects[l]);
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
						let intersects = raycaster.intersectObject( ANATOMIA.children[i] );
						if ( intersects.length > 0 ){
							for(l in intersects)ints.push(intersects[l]);
						}
						if(ANATOMIA.children[i].type=='Group'){
							for(let g in ANATOMIA.children[i].children){
								let intersects = raycaster.intersectObject( ANATOMIA.children[i].children[g] );
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
				let near = ints[0];
				for(l in ints){
					if(ints[l].distance<near.distance)near=ints[l];
				}
				if(near.object.name.substr(0,1)!='_')objOver='';
				else objOver=near.object;
			}
			SET.desIntersected();
			if(objOver){
				this.INTERSECTED = objOver;
				let nPunto = this.INTERSECTED.name.split("_")[1],
					muscolo = SET.getMuscle(nPunto),
					labelPunto = DB.set.punti[muscolo]?.NomePunto;
				if(!labelPunto)labelPunto = muscolo;
				// #### gestire i nomi da DB
				SET.coloraGruppo(nPunto,'Over');
				visToolTip(labelPunto);
				renderer.domElement.style.cursor='pointer';
			}else{
				this.INTERSECTED=null;
				nasToolTip();
				renderer.domElement.style.cursor='default';
			}
			make = true;
		}
		if(this.ptSel){ // pulse del pallino selezionato
			this.pulse+=0.01;
			if(this.pulse>=1.6)this.pulse=1;
			let op = 1.8-this.pulse;
			SET.setPulsePt( this.ptSel, this.pulse, op );
			make = true;
		}
		return make;
	},
	setPulsePt: function( pt, pulse, op, mat='' ){
		let pp = SET.splitPoint(pt.name),
			els = scene.getObjectByName("PT").children;
		for(let e in els){
			if(els[e].name.indexOf(pp.nPunto)==0){
				els[e].scale.set(pulse,pulse,pulse);
				if(mat)els[e].material=mat;
			}
		}
		SET.MAT.pointSel.setValues( { opacity: op } );
	},
	desIntersected: function(){
		if(this.INTERSECTED){
			if(this.INTERSECTED.name.substr(0,1)=='_'){
				let nPunto = this.INTERSECTED.name.split("_")[1];
				SET.coloraGruppo(nPunto,'Base',true);
			}
			this.INTERSECTED = null;
		}
	},
	// ANIMATE SET
	_animate: function(){
		
	},
	
	// CLICK sul punto
	_onClick: function(e){
		if(MENU.modelExclusive())return;
		let btn=0;
		if(!touchable)btn=e.button;
		if(!btn && !raycastDisable && ((controlsM.xIni==controlsM.xEnd && controlsM.yIni==controlsM.yEnd) || touchable)){
			if(this.INTERSECTED){
				if(!touchable){
					controlsM._inMovimento=true;
					controlsM._ZPR=true;
					controlsM._MM=false;
				}
				let PT_name=this.INTERSECTED.name.substr(1,this.INTERSECTED.name.length-1),
					ritorno = '';
					
				if(SCHEDA.classeAperta && SCHEDA.classeAperta!='tab_punti')ritorno = 'SET.chiudiPunto(true)';
				SET.apriPunto(PT_name,ritorno,this.INTERSECTED);
			}
		}
		controlsM.xIni=-1;
		controlsM.xEnd=-1;
		controlsM.yIni=-1;
		controlsM.yEnd=-1;
	},
	apriPunto: function( PT_name, ritorno='', el='' ){

		// verifico le autorizzazioni
		if(!SET.verFreePunti(PT_name)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------

		if(DB.set.punti[PT_name]){
			PT_name = SET.getFirstPoint(PT_name);
		}
		if(this.ptSel){
			let mat=this.MAT.pointOn;
			if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
			SET.setPulsePt( this.ptSel, 1, 1, mat );
			let pp = SET.splitPoint(this.ptSel.name);
			document.getElementById("pt_"+this.ptSel.userData.muscolo).classList.remove("selElPt");
		}
		if(this.MAT.pointSel)SET.chiudiPunto(true,true);
		if(!scene.getObjectByName( PT_name )){
			let els = this.PT.children;
			for(v in els){
				if(	els[v].name.substr(0,3)==PT_name){
					PT = els[v];
				}
				
			}
		}else PT=scene.getObjectByName( PT_name );
		if(this.ptSel && !SCHEDA.schedaAperta)this.chiudiPunto();
		this.ptSel = PT;
		let pp = SET.splitPoint(this.ptSel.name.substr(0,5));	
		
		document.getElementById("pt_"+this.ptSel.userData.muscolo).classList.add("selElPt");
		let matTxt = "this.MAT.pointSel";
		if(PT.userData.nota)matTxt = "this.MAT.pointSelNote";
		if(this.ptSel.userData.interno)matTxt += "Int";
		let mat = eval(matTxt);
		this.diffX = this.ptSel.position.x*1;
		this.diffY = this.ptSel.position.y*1;
		
		
		let els = scene.getObjectByName("PT").children;
		for(let e in els){
			if(els[e].name.indexOf(pp.nPunto)==0)els[e].material=mat;
		}
		
		
		SET.memPos.position = {
			x: manichinoCont.position.x,
			y: manichinoCont.position.y,
			z: manichinoCont.position.z
		}
		SET.memPos.rotation = {
			x: manichinoCont.rotation.x,
			y: manichinoCont.rotation.y,
			z: manichinoCont.rotation.z
		}
		let autoRotated = false;
		if(!el){
			// posiziono
			if(MAPPA.posizioni[SET.ptSel.name.split("_")[0]]){
				//centro();
				let pos = MAPPA.posizioni[SET.ptSel.name.split("_")[0]];
				centro();
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
				autoRotated = true;
				zoomEnd = 0.0001;
			}
			//if(manichinoCont.position.z<15 || !zoomEnd || !smothingView)zoomEnd = 15;
			normalizeRotation();
		}
		if(!autoRotated){

			centro()
			rotateEnd = { x:0, y:manichinoCont.rotation.y, z:0 };

		}


		// SOLO ROTAZIONE AUTOMATICA
		/* let x2 = 0-this.ptSel.position.x,
			y2 = 0-this.ptSel.position.y,
			z2 = 0-this.ptSel.position.z;
		panEndZero = { x: x2, y: y2, z: z2 };
		
		if(SCHEDA.aggancio.tipo=='libera' && el){
			this.ptSel.updateMatrixWorld();
			let vector = this.ptSel.geometry.vertices[0].clone();
			vector.applyMatrix4( this.ptSel.matrixWorld );
			panEnd = { x: vector.x, y: vector.y, z: vector.z };
		}else if(smartMenu){
			panEnd = { x: 0, y: 0.25, z: 0 };
		}else panEnd = { x: 0, y: 0, z: 0 };
		
		*/
		
		
		SET.delEviPalls(pp.nPunto,'Over');
		SET.addEviPalls(pp.nPunto,'Select');
		this.pulse = 1;
		
		// ---------------------
		SET.MAT.applicaMappa(pp.nPunto);
		SET.caricaPunto( pp.nPunto, ritorno );
	},
	chiudiPunto: function( nonChiudereScheda=false, cambiaPunto=false ){
		document.getElementById("scheda").classList.remove("tab_punti");
		document.getElementById("scheda").classList.remove("schForm");
		if(!globals.modello.cartella)return;
		if(!nonChiudereScheda){
			endChangeDetection();
			SCHEDA.formModificato = false;
		}
		SET.MAT.applicaMappa();
		if(this.ptSel){
			if(this.ptSel.userData.interno){
				this.preCM = false;
				let evidenziati = this.ptSel.userData.evidenziati;
				if(evidenziati){
					for(let e in evidenziati){
						for(let i in evidenziati[e]){
							let tipo = scene.getObjectByName( evidenziati[e][i] ).parent.name;
							scene.getObjectByName( evidenziati[e][i] ).material = MODELLO.MAT["material"+tipo];
						}
					}
				}
			}
		}
		if(SET.memPos.position){
			normalizeRotation();
			rotateEnd = { x:SET.memPos.rotation.x, y:SET.memPos.rotation.y, z:0 };
			//panEndZero = { x: manichinoCont.position.x, y: manichinoCont.position.y, z: manichinoCont.position.z };
			panEndZero = { x: 0, y: 0, z: 0 };
			panEnd = { x: SET.memPos.position.x, y: SET.memPos.position.y, z: SET.memPos.position.z };
			zoomEnd = SET.memPos.position.z;
			normalizeRotation();
			SET.memPos.position = null;
			SET.memPos.rotation = null;
		}
		
		let exPt = SET.ptSel;
		
		if(!this.ptSel)return;
		let pp = SET.splitPoint(this.ptSel.name);
		this.pulse=0;
		let mat=this.MAT.pointBase;
		//if(MAPPA[pp.siglaMeridiano].meridianoAcceso)mat=this.MAT.pointOn;
		if(this.ptSel.userData.nota)mat=this.MAT.pointNote;
		SET.delEviPalls(pp.nPunto,'Select');
		
		// coloro tutti gli altri punti non SX o DX o CC
		let els = scene.getObjectByName("PT").children;
		for(let e in els){
			if(els[e].name.indexOf(pp.nPunto)==0){
				els[e].material=mat;
				els[e].material.opacity=1;
				els[e].scale.set(1,1,1);
			}
		}
		
		document.getElementById("pt_"+this.ptSel.userData.muscolo).classList.remove("selElPt");
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
		let vector = exPt.geometry.vertices[0].clone();
		vector.applyMatrix4( exPt.matrixWorld );
		manichino.position.set( 0, 0, 0 );
		
		render();
		exPt.updateMatrixWorld();
		let vector2 = exPt.geometry.vertices[0].clone();
		vector2.applyMatrix4( exPt.matrixWorld );
		manichinoCont.position.x = manichinoCont.position.x - (vector2.x-vector.x);
		manichinoCont.position.y = manichinoCont.position.y - (vector2.y-vector.y);
		manichinoCont.position.z = manichinoCont.position.z - (vector2.z-vector.z);
		render();
	},
	riapriPunto: function(){
		if(!SET.ptSel)return;
		MENU.visModello();
		if(smartMenu)SCHEDA.apriElenco('set',true);
		SET.apriPunto(SET.ptSel.name,'','','');
	},
	coloraGruppo: function( nPunto, matPoint, forza=false ){
		if(matPoint=='Base' && SET.ptSel && !forza)return;
		if(controlsM._premuto && !forza)return;
		let els = this.PT.children;
		for(v in els){
			if(	els[v].name.substr(0,3)==nPunto && 
				els[v].name.substr(0,1)!='_' && 
				(!SET.ptSel || els[v].name.substr(0,3)!=SET.ptSel.name.substr(0,3))){
				let mat = matPoint;
				try{
					if(els[v].userData.nota)mat="Note";
				}catch(err){}
				els[v].material = this.MAT['point'+mat]; // cambiare se NOTA
				els[v].scale.set(1,1,1);
			}
		}
	},
	_applyLineMethod: function(){
		// lasciare perché viene richiamato da slider
	},
	scriviPunto: function( siglaPunto, esteso=false, noRet=false, sigla=false ){
		let nomePunto = DB.set.punti[siglaPunto].NomePunto,
			html = '<a class="pallinoPat',
			ret = '';
		if(esteso)html += ' pallinoPatEsteso';
		if(!noRet)ret = SET.chiudiPunto(true);
		html += '" onClick="SET.apriPunto(\''+siglaPunto+'\',\''+ret+'\');"';
		if(noRet)html += '  onMouseOver="SET.overPunto(\''+siglaPunto+'\',true);"' +
						 '  onMouseOut="SET.overPunto(\''+siglaPunto+'\',false);"' +
						 '	id="pt_'+siglaPunto+'"';
		html += '> <i>'+nomePunto+'</i></a>';
		return html;
	},
	selPunto: function( nPunto ){
		// verifico le autorizzazioni
		if(!SET.verFreePunti(nPunto)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		SET.apriPunto(nPunto,'SET.chiudiPunto(true);');
	},
	selPuntoMod: function( nPunto, p ){
		SET.pMod = p;
		SET.selPunto( nPunto );
	},
	setPuntoFrm: function(){
		let pp = SET.splitPoint(SET.ptSel.name);
		if( SCHEDA.classeAperta == 'scheda_procedura' ){
			SET.dettagliProvvisori[SET.pMod].DescrizioneDettaglio = pp.nPunto;
			SET.caricaDettagli();
		}
		if( SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B' ){
			PAZIENTI.puntiProvvisori[SET.pMod].n = pp.nPunto;
			PAZIENTI.caricaPuntiTrattamento();
		}
		SET.pMod = -1;
		SCHEDA.torna();
		SCHEDA.formModificato = true;
	},
	evidenziaPunto: function( el = document.getElementById("scheda_testo") ){
		SET.annullaEvidenziaPunto();
		let els = el.getElementsByClassName("pallinoPat");
		for(let p=0;p<els.length;p++){
			let nPunto = els[p].dataset.nPunto,
				el = scene.getObjectByName("PT");
			for(let e in el.children){
				if(el.children[e].name.indexOf("_"+nPunto)==0)el.children[e].material=SET.MAT.pointEvi;
			}
			SET.puntiEvidenziati.push(nPunto);
		}
		SET.settaOverPunto();
	},
	evidenziaPuntoMod: function( elenco ){ 
		SET.annullaEvidenziaPunto();
		for(let k in elenco){
			let pp=elenco[k].split("."),
				nPunto = pp[0],
				mat = SET.MAT.pointEvi,
				el = scene.getObjectByName("PT");
			if(pp[1]=='D')mat = SET.MAT.pointDolore;
			for(let e in el.children){
				if(el.children[e].name.indexOf("_"+nPunto)==0 && nPunto){
					el.children[e].material=mat;
					siglaPunto = elenco[k].split(".")[0];
					SET.puntiEvidenziati.push(siglaPunto);
				}
			}
		}
		SET.applicaEvidenziaPunto();
	},
	applicaEvidenziaPunto: function( anatomia ){
		if(SET.puntiEvidenziati.length || anatomia){
			let els = scene.getObjectByName("PT").children;
			for(let e in els){
				let siglaPunto = els[e].name.replace("_","").substr(0,3);
				if(SET.puntiEvidenziati.indexOf(siglaPunto)>-1){
					if(els[e].name.substr(0,1)=='_')els[e].material=SET.MAT.pointEvi;
					else els[e].material.opacity = 1;
					els[e].visible = true;
				}else{
					if(els[e].name.substr(0,1)!='_')els[e].material.opacity = 0.25;
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
			}, 500, anatomia);
		}
	},
	annullaEvidenziaPunto: function(){
		if(SET.puntiEvidenziati.length){
			for(let k in SET.puntiEvidenziati){
				let pT=SET.puntiEvidenziati[k],
					pp=SET.splitPoint(pT),
					el = scene.getObjectByName("PT")
				if(el){
					for(let e in el.children){
						if(el.children[e].name.indexOf("_"+pp.nPunto)==0)el.children[e].material=SET.MAT.pointTrasp;
						el.children[e].material.opacity = 1;
					}
				}
			}
			SET.puntiEvidenziati = [];
		}
	},
	settaOverPunto: function(){
		if(!touchable){
			let els = document.getElementById("scheda_testo").getElementsByClassName("pallinoPat");
			for(let e=0;e<els.length;e++){
				els[e].onmouseover = function(){
					SET.overPunto(this.dataset.nPunto,true);
				}
				els[e].onmouseout = function(){
					SET.overPunto(this.dataset.nPunto,false);
				}
			}
		}
	},
	ritOverPunto: function( id, p ){
		if(!touchable){
			SET.delAllEviPalls('Over');
			let elenco = [],
				els = document.getElementById(id).getElementsByClassName("dettPunto"),
				tot = els.length;
			for(let e=0;e<tot;e++){
				if(nPunto = els[e].getElementsByClassName("numPoints")[0]){
					nPunto = nPunto.value;
					elenco.push(nPunto);
				}
			}
			SET.evidenziaPuntoMod(elenco);
			SET.aggiornaDettaglio(document.getElementById("pt_"+p));
		}
	},
	overPunto: function( PT_name, over ){
		let name = PT_name.split("_")[0];
		if(touchable || !name)return;
		// verifico le autorizzazioni
		if(!SET.verFreePunti(name)){
			return;
		}
		// --------------------------
		
		let els = scene.getObjectByName("PT").children;
		for(let e in els){
			if(els[e].name.indexOf("_"+name)==0 && els[e].material.name.indexOf("SEL")==-1){
				if(over)SET.addEviPalls("_"+name,'Over');
				else SET.delEviPalls("_"+name,'Over');
			}
		}
	},
	convPuntiScheda: function( html, noPall=false ){
		let pallClass = noPall ? ' pallinoPunto' : 'pallinoPat',
			regexp = /\[\.[^\]]+\.\]/ig,
			pts = html.match(regexp);
		for(let p in pts){
			let pp = SET.splitPoint(pts[p].substr(2,pts[p].length-4)),
			muscolo = SET.getMuscle(pp.nPunto),
			NomePunto = DB.set.punti[muscolo].NomePunto,
			addClick = (noPall)?'return':'';
				
			if(DB.set.punti[muscolo].punti[pp.nPunto])NomePunto += ' - '+DB.set.punti[muscolo].punti[pp.nPunto];

			let sost = '<span class="'+pallClass+'" data-n-punto="'+pp.nPunto+'" onClick="'+addClick+'SET.selPunto(\''+pp.nPunto+'\');">'+ NomePunto+'</span>'
			html = html.replace(pts[p], sost);
		}
		return html;
	},
	salvaImpSet: function(){
		PAZIENTI.cambiaGZ(PAZIENTI.mezzoProvvisorio,true);
		MENU.chiudiImpSet();
	},
	popolaImpSet: function(){
		let mzs = PAZIENTI.mezziSet.O,
			HTML_imp = 
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
	
	
	
	addEviPalls: function( nPunto, tipo ){
		if(!scene.getObjectByName("PT"))return;
		let els = scene.getObjectByName("PT").children;
		for(let e in els){
			if(els[e].name.indexOf(nPunto)==0){
				let geoPoint =  new THREE.SphereGeometry( 0.11, 16, 16 ),
					eviPoint;
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
	delEviPalls: function( nPunto, tipo ){
		let els = SETS.children;
		for(let e=els.length-1;e>=0;e--){
			if(els[e].name.indexOf(tipo+' point: '+nPunto)==0){
				SETS.remove( els[e] );
			}
		}
	},
	delAllEviPalls: function(tipo){
		let els = SETS.children;
		for(let e=els.length-1;e>=0;e--){
			if(els[e].name.indexOf(tipo+' point: ')==0){
				SETS.remove( els[e] );
			}
		}
	},
	verSistema: function(){
		document.getElementById("noLicenze").classList.toggle("vis",LOGIN.logedin() && DB.login.data.auths.indexOf("trigger_points")==-1);
		document.getElementById("demoVersion").classList.toggle("vis",!LOGIN.logedin());
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
	},
	_gestVisSmart: function(){
		//
	},
	filtraSet: function(){
		let vis = true;
		if(DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())vis = false;
		for(let m in SETS.children){
			if(SET.PUNTI_free.indexOf(SETS.children[m].name.split("_")[1])==-1)SETS.children[m].visible = vis;
		}
	}
}