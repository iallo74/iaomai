var MODELLO = {
		
	INTERSECTED: null,
	meshPelle: null,
	meshMuscoli: null,
	meshOssa: null,
	meshVisceri: null,
	meshGuide: null,
	mask: [],
	imgsAtt: [],
	imgsProvv: [],
	muscleSel: false,
	muscleAtt: null,
	contextOpened: false,
	isolamento: null,
	schSel: '',
	opAtt: 1,
	orOp: -1,
	tipoPelle: '',
	flip: false,
	
	_init: function(modello){
				
		ANATOMIA = new THREE.Group();
		ANATOMIA.name="MODELLO";
		
		this.meshPelle = null;
		this.meshMuscoli = null;
		this.meshOssa = null;
		this.meshVisceri = null;
		this.MAT.materialMuscoli = [];
		
		if(localStorage.tipoPelle)MODELLO.tipoPelle = localStorage.tipoPelle;
		
		if(globals.modello.livelli.indexOf("visceri") > -1){
			obj_visceri = JSON.parse(LZString.decompressFromBase64(obj_visceri));
			var loader = new THREE.ObjectLoader(); // VISCERI
			this.meshVisceri = loader.parse( obj_visceri );
			for(var n=0;n<this.meshVisceri.children.length;n++){
				this.meshVisceri.children[n].material = MODELLO.MAT.materialVisceri;
			}
			this.meshVisceri.name = 'Visceri';
			ANATOMIA.add( this.meshVisceri );
			MODELLO.op('Visceri',MENU.getOp('Visceri')); // ri-setto al cambio del modello
			
			/* elenco organi */
			var arrayVisceri = [];
			if(this.meshVisceri.children.length > 0){
				for(o in MODELLO.meshVisceri.children){
					arrayVisceri.push({
						organo: MODELLO.meshVisceri.children[o].name,
						nome: Lingua(eval("TXT_Organo_"+MODELLO.meshVisceri.children[o].name))
					});
				}
				arrayVisceri.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				})
				var htmlVisceri = '';
				for(o in arrayVisceri){
					htmlVisceri += '<p id="Organo_'+arrayVisceri[o].organo+'" onMouseOver="MODELLO.isolaOrgano(this,\'over\');" onMouseOut="MODELLO.isolaOrgano(this,\'out\');" onClick="MODELLO.isolaOrgano(this)">'+stripslashes(arrayVisceri[o].nome)+'</p>';
				}
				document.getElementById("p_visceri").classList.add("livelli_listed");
			}
			document.getElementById("el_visceri").innerHTML = __(htmlVisceri,'');
		}else{
			visceri = new THREE.Group();
			visceri.name = 'VISCERI';
			ANATOMIA.add( visceri );
		}
		
		if(globals.modello.livelli.indexOf("ossa") > -1){
			obj_ossa = JSON.parse(LZString.decompressFromBase64(obj_ossa));
			var loader = new THREE.ObjectLoader(); // OSSA
			this.meshOssa = loader.parse( obj_ossa );
			for(var n=0;n<this.meshOssa.children.length;n++){
				this.meshOssa.children[n].material = this.MAT.materialOssa;
			}
			this.meshOssa.name = 'Ossa';
			ANATOMIA.add( this.meshOssa ); 
			MODELLO.op('Ossa',MENU.getOp('Ossa')); // ri-setto al cambio del modello
			
			/* elenco ossa */
			var arrayOssa = [];
			if(this.meshOssa.children.length > 0){
				for(o in MODELLO.meshOssa.children){
					
					arrayOssa.push({
						osso: MODELLO.meshOssa.children[o].name,
						nome: Lingua(eval("TXT_Osso_"+MODELLO.meshOssa.children[o].name))
					});
				}
				arrayOssa.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				})
				var htmlOssa = '';
				for(o in arrayOssa){
					htmlOssa += '<p id="Osso_'+arrayOssa[o].osso+'" onMouseOver="MODELLO.isolaOsso(this,\'over\');" onMouseOut="MODELLO.isolaOsso(this,\'out\');" onClick="MODELLO.isolaOsso(this);">'+stripslashes(arrayOssa[o].nome)+'</p>';
				}
				document.getElementById("p_ossa").classList.add("livelli_listed");
			}
			document.getElementById("el_ossa").innerHTML = __(htmlOssa,'');
			
		}else{
			ossa = new THREE.Group();
			ossa.name = 'OSSA';
			ANATOMIA.add( ossa );
		}
		
		if(globals.modello.livelli.indexOf("pelle") > -1){ // lasciare per ultima per le trasparenze
			obj_pelle = JSON.parse(LZString.decompressFromBase64(obj_pelle));
			
			var loader = new THREE.ObjectLoader(); // PELLE
			this.meshPelle = loader.parse( obj_pelle );
			this.meshPelle.name = "PELLE";
			for(var n=0;n<this.meshPelle.children.length;n++){
				this.meshPelle.children[n].material = this.MAT["materialPelle"+MODELLO.tipoPelle];
				this.imgsAtt[n] = null;
			}
			ANATOMIA.add( this.meshPelle );
			MODELLO.op('Pelle',MENU.getOp('Pelle')); // ri-setto al cambio del modello

			if(globals.modello.livelli.indexOf("muscoli") > -1){
				this.MAT.mappaMuscoli();
				if(muscleView){
					muscleView = false;
					MODELLO.swMuscle(2);
				}else{
					MODELLO.precarMuscle();
				}
			}
			/* elenco muscoli */
			var arrayMuscoli_ORECCHIO = [];
			var arrayMuscoli_TESTA = [];
			var arrayMuscoli_COLLO = [];
			var arrayMuscoli_TORSO = [];
			var arrayMuscoli_ARTO_SUPERIORE = [];
			var arrayMuscoli_ARTO_INFERIORE = [];
			if(MODELLO.MAT.masks != null){
				for(o in MODELLO.MAT.masks){
					eval("arrayMuscoli_"+MODELLO.MAT.masks[o].zona).push({
						muscolo: o,
						nome: Lingua(eval("TXT_Muscolo_"+o))
					});
				}
				
				// ordino alfabeticamente
				arrayMuscoli_ORECCHIO.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				arrayMuscoli_TESTA.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				arrayMuscoli_COLLO.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				arrayMuscoli_TORSO.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				arrayMuscoli_ARTO_SUPERIORE.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				arrayMuscoli_ARTO_INFERIORE.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				
				var htmlMuscoli = '';
					
				if(arrayMuscoli_TESTA.length){
					htmlMuscoli += '<i>'+stripslashes(Lingua(TXT_Zona_TESTA))+'</i><div onMouseLeave="MODELLO.isolaMuscolo(this,\'out\');">';
					for(o in arrayMuscoli_TESTA){
						htmlMuscoli += '<p id="Muscolo_'+arrayMuscoli_TESTA[o].muscolo+'" onClick="MODELLO.isolaMuscolo(this)" onMouseOver="MODELLO.isolaMuscolo(this,\'over\');">'+stripslashes(arrayMuscoli_TESTA[o].nome)+'</p>';
					}
					htmlMuscoli += '</div>';
				}
				if(arrayMuscoli_ORECCHIO.length){
					htmlMuscoli += '<i>'+stripslashes(Lingua(TXT_Zona_ORECCHIO))+'</i><div onMouseLeave="MODELLO.isolaMuscolo(this,\'out\');">';
					for(o in arrayMuscoli_ORECCHIO){
						htmlMuscoli += '<p id="Muscolo_'+arrayMuscoli_ORECCHIO[o].muscolo+'" onClick="MODELLO.isolaMuscolo(this)" onMouseOver="MODELLO.isolaMuscolo(this,\'over\');">'+stripslashes(arrayMuscoli_ORECCHIO[o].nome)+'</p>';
					}
					htmlMuscoli += '</div>';
				}
				if(arrayMuscoli_COLLO.length){
					htmlMuscoli += '<i>'+stripslashes(Lingua(TXT_Zona_COLLO))+'</i><div onMouseLeave="MODELLO.isolaMuscolo(this,\'out\');">';
					for(o in arrayMuscoli_COLLO){
						htmlMuscoli += '<p id="Muscolo_'+arrayMuscoli_COLLO[o].muscolo+'" onClick="MODELLO.isolaMuscolo(this)" onMouseOver="MODELLO.isolaMuscolo(this,\'over\');">'+stripslashes(arrayMuscoli_COLLO[o].nome)+'</p>';
					}
					htmlMuscoli += '</div>';
				}
				if(arrayMuscoli_TORSO.length){
					htmlMuscoli += '<i>'+stripslashes(Lingua(TXT_Zona_TORSO))+'</i><div onMouseLeave="MODELLO.isolaMuscolo(this,\'out\');">';
					for(o in arrayMuscoli_TORSO){
						htmlMuscoli += '<p id="Muscolo_'+arrayMuscoli_TORSO[o].muscolo+'" onClick="MODELLO.isolaMuscolo(this)" onMouseOver="MODELLO.isolaMuscolo(this,\'over\');">'+stripslashes(arrayMuscoli_TORSO[o].nome)+'</p>';
					}
					htmlMuscoli += '</div>';
				}
				if(TXT_Zona_ARTO_SUPERIORE.length){
					htmlMuscoli += '<i>'+stripslashes(Lingua(TXT_Zona_ARTO_SUPERIORE))+'</i><div onMouseLeave="MODELLO.isolaMuscolo(this,\'out\');">';
					for(o in arrayMuscoli_ARTO_SUPERIORE){
						htmlMuscoli += '<p id="Muscolo_'+arrayMuscoli_ARTO_SUPERIORE[o].muscolo+'" onClick="MODELLO.isolaMuscolo(this)" onMouseOver="MODELLO.isolaMuscolo(this,\'over\');">'+stripslashes(arrayMuscoli_ARTO_SUPERIORE[o].nome)+'</p>';
					}
					htmlMuscoli += '</div>';
				}
				if(arrayMuscoli_ARTO_INFERIORE.length){
					htmlMuscoli += '<i>'+stripslashes(Lingua(TXT_Zona_ARTO_INFERIORE))+'</i><div onMouseLeave="MODELLO.isolaMuscolo(this,\'out\');">';
					for(o in arrayMuscoli_ARTO_INFERIORE){
						htmlMuscoli += '<p id="Muscolo_'+arrayMuscoli_ARTO_INFERIORE[o].muscolo+'" onClick="MODELLO.isolaMuscolo(this)" onMouseOver="MODELLO.isolaMuscolo(this,\'over\');">'+stripslashes(arrayMuscoli_ARTO_INFERIORE[o].nome)+'</p>';
					}
					htmlMuscoli += '</div>';
				}
				document.getElementById("p_muscoli").classList.add("livelli_listed");
			}
			document.getElementById("el_muscoli").innerHTML = __(htmlMuscoli);
		}else{
			MODELLO.swMuscle(2);
		}
		
		
		
		// GUIDE (legenda e pin muscoli)
		this.meshMuscoli = new THREE.Group();
		this.meshMuscoli.name = "pins_muscoli";
		this.meshMuscoli.visible = (muscleView && !SET) ? true : false;
		if(obj_guide){
			obj_guide = JSON.parse(LZString.decompressFromBase64(obj_guide));
			var loader = new THREE.ObjectLoader();
			this.meshGuide =  loader.parse( obj_guide );
			this.meshGuide.name = 'GUIDE';
			for(var n=0;n<this.meshGuide.children.length;n++){
				this.meshGuide.children[n].material = MODELLO.MAT.lineGuideSel;
				this.meshGuide.children[n].visible = false;
				if(this.meshGuide.children[n].name.indexOf("Muscolo_") > -1){
						
					var array = this.meshGuide.children[n].geometry.attributes.position.array;
					
					var geometry = new THREE.SphereGeometry( 0.05, 8, 8 );
					var pin = new THREE.Mesh( geometry, this.MAT.pinMuscoloTrasp );
					pin.position.set(array[0],array[1],array[2]);
					pin.name="PIN_"+this.meshGuide.children[n].name;
					this.meshMuscoli.add( pin );
					
					var geometry = new THREE.SphereGeometry( 0.01, 8, 8 );
					var pin = new THREE.Mesh( geometry, this.MAT.pinMuscolo );
					pin.position.set(array[0],array[1],array[2]);
					//pin.name="PIN_"+this.meshGuide.children[n].name;
					this.meshMuscoli.add( pin );
					
				}
			}
			ANATOMIA.add( this.meshGuide );
			document.getElementById("legende").classList.add("visSch");
		}else{
			pin = new THREE.Group();
			pin.name = 'PIN';
			ANATOMIA.add( pin );
			document.getElementById("legende").classList.remove("visSch");
		}
		ANATOMIA.add( this.meshMuscoli ); 
		this.removePrecarMuscle();
		
		manichino.add( ANATOMIA );
					
		// scarico la memoria
		obj_pelle=[];
		obj_ossa=[];
		obj_visceri=[];
		Muscle_Head='';
		Muscle_Limbs='';
		Muscle_Torso='';
		for(n=0;n<globals.modello.imports.length;n++){
			document.getElementById("scripts").removeChild(IMPORTER.jss[n]);
		}
		
		
		
		// riseleziono i pezzi (organi e ossa) selezionati su un altro manichino
		var pezziSelezionati = JSON.parse(JSON.stringify(globals.pezziSelezionati));
		globals.pezziSelezionati = [];
		for(e in pezziSelezionati){
			if(document.getElementById(pezziSelezionati[e])){
				if(pezziSelezionati[e].indexOf("Organo_") == 0)MODELLO.isolaOrgano(document.getElementById(pezziSelezionati[e]));
				if(pezziSelezionati[e].indexOf("Osso_") == 0)MODELLO.isolaOsso(document.getElementById(pezziSelezionati[e]));
				if(pezziSelezionati[e].indexOf("Muscolo_") == 0)MODELLO.isolaMuscolo(document.getElementById(pezziSelezionati[e]));
			}
		}
		
		MODELLO.filtraAnatomia();
		
		if(	SCHEDA.classeAperta != 'scheda_A' &&
			SCHEDA.classeAperta != 'scheda_B' ){
				if(!inizio)MENU.visModello(true);
		}else{
			MENU.visModello();
		}
		
		
		if(globals.set.cartella){
			if(SET)SET._init();
			else{
				var cartella = globals.set.cartella;
				globals.set.cartella = '';
				caricaSet( cartella, globals.set.setSel );
				return;
			}
		}else centro();
		
		nasLoader();
		
		manichinoCaricato=true;
		raycastDisable=false;
		if(inizio){
			MODELLO.op('Pelle',1);
			if(globals.openMap && globals.mapOpened && !globals.set.cartella){
				postApreSet = true;
				caricaSet(globals.mapOpened,document.getElementById("p_"+globals.mapOpened)); // riapro il set al caricamento
			}
			/*if(localStorage.set && globals.memorizza){
				caricaSet(localStorage.set,document.getElementById("p_"+localStorage.set));
			}//else postApreSet = false;*/
			//document.getElementById("logo_inizio").style.display = 'none';
			if(getVar("demo")=='anatomymap'){
				visLoader('');
				MODELLO.swMuscle();
				setTimeout(function(){
					nasLoader();
					/*setTimeout(function(){
						GUIDA.visFumetto("guida_anatomia");
					},1200);*/
					
					
				},300);
			}else{
				setTimeout( function(){
					GUIDA.visFumetto("guida_generica");
				}, 1000 );
			}
		}
		document.getElementById("pulsanti_modello").classList.add('modelloScelto');
		inizio = false;
	},
	
	
	// RENDER ANATOMIA (per i rollover sull'anatomia
	_render: function(){
		var make=true;
	 	if(manichinoCaricato && !raycastDisable && !controlsM._ZPR && controlsM._MM && !overInterfaccia && !overLegenda){
			camera.updateMatrixWorld();
			raycaster.setFromCamera( mouse, camera );
			raycaster.params.Points.threshold = 20;
			
			var txtTT = '';
			var objOver='';
			var ints = [];
			if(ANATOMIA){
				for(i in ANATOMIA.children){
					var pass= 0;
					if(MENU.getOp("Ossa") > 0 && ANATOMIA.children[i].name.toLowerCase()=='ossa')pass++;
					if(MENU.getOp("Visceri") > 0 && ANATOMIA.children[i].name.toLowerCase()=='visceri')pass++;
					if(MENU.getOp("Muscoli") > 0.6 && muscleView && !MODELLO.muscleSel)pass = 0;
					if(MENU.getOp("Muscoli") > 0 && muscleView && ANATOMIA.children[i].name.toLowerCase()=='pins_muscoli')pass++;
					//if(MENU.getOp("Muscoli") < 1 && muscleView)pass++;
					if(MENU.getOp("Pelle") == 1 && !muscleView)pass = 0;
					if(ANATOMIA.children[i].name.toLowerCase()=='pelle')pass = 0;
					if(	pass ){
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
			var objOver = null;
			if(ints.length){
				var near = ints[0];
				for(l in ints){
					if(ints[l].distance<near.distance)near=ints[l];
				}
				objOver=near.object;
			}
			if(objOver){
				var addType = '';
				var pass = true;
				var nome = objOver.name
				var gruppo = scene.getObjectByName( nome ).parent.name;
				if(gruppo == 'Visceri')nome = 'Organo_'+nome;
				if(gruppo == 'Ossa')nome = 'Osso_'+nome;
				
				if(MENU.getOp("Pelle") == 1 && !muscleView)pass = false;
				if(MENU.getOp("Muscoli") > 0.6 && muscleView && !MODELLO.muscleSel)pass = false;
				
				if(gruppo == 'pins_muscoli'){				
					nome = nome.replace("PIN_","");		
					nome = nome.replace("_SX","");
					nome = nome.replace("_DX","");
					if(nome.indexOf("_(")){
						pN=nome.split("_(");
						nome = pN[0];
					}
					addType=Lingua(eval("TXT_"+__(globals.modello.areaName,'Muscolo')))+" ";
					pass=true;
				}
				
				txtTT = addType+stripslashes(Lingua(eval("TXT_"+nome)));
				
				// verifico le autorizzazioni
				if((DB.login.data.auths.indexOf("anatomy_full")==-1 || !LOGIN.logedin()) && !globals.AnatomyFREE){
					if(	nome.split("_")[0]!='Osso' ){
						if(	nome.split("_")[0]=='Organo' && 
						nome.substr(7,nome.length-7)!='CUORE' )pass = false;
						if(	nome.split("_")[0]=='Muscolo' && 
						nome.substr(8,nome.length-8)!='PETTORALE' )pass = false;
					}
				}
				// --------------------------
			}
			if(pass && txtTT){
				visToolTip(txtTT);
				this.INTERSECTED = nome;
				renderer.domElement.style.cursor='pointer';
			}else{
				this.INTERSECTED=null;
				nasToolTip();
				renderer.domElement.style.cursor='default';
			}
			make=true;
		}
		return make;
	},
	_onClick: function(event){
		if(event.button != 0 && !touchable)return;
		if(this.INTERSECTED){
			/*if(touchable){
				mouse.x = + (event.targetTouches [0] .pageX / window.innerWidth) * 2 + -1;
				mouse.y = - (event.targetTouches [0] .pageY / window.innerHeight) * 2 + 1;
			}*/
			if(this.INTERSECTED.indexOf("Osso_") > -1)MODELLO.isolaOsso(document.getElementById(this.INTERSECTED),'',true);
			if(this.INTERSECTED.indexOf("Organo_") > -1)MODELLO.isolaOrgano(document.getElementById(this.INTERSECTED),'',true);
			if(this.INTERSECTED.indexOf("Muscolo_") > -1)MODELLO.isolaMuscolo(document.getElementById(this.INTERSECTED),'',true);
		}
	},
	
	
	
	rifletti: function(){ // riflette il manichino
		ANATOMIA.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
		if(SETS)SETS.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
		manichinoCont.rotation.y = 0 - manichinoCont.rotation.y;
		document.getElementById("p_rifletti").classList.toggle("btnSel");
		MODELLO.flip = !MODELLO.flip;
		try{SET._rifletti();}catch(err){}
	},
	precarMuscle: function(){
		for(m=0;m<MODELLO.MAT.materialMuscoli.length;m++){
			var gProvv = new THREE.SphereGeometry( 0.01, 0, 0 );
			var g = new THREE.Mesh( gProvv, MODELLO.MAT.materialMuscoli[m]); 
			g.material.opacity = 0;
			g.name = 'preM'+m;
			g.depthTest = false;
			g.position.y = 1;
			manichino.add( g );
		}
	},
	removePrecarMuscle: function(){
		for(m=0;m<MODELLO.MAT.materialMuscoli.length;m++){
			manichino.remove( manichino.getObjectByName('preM'+m) );
		}
	},
	swMuscle: function(forza){ // cambia la visione pelle/muscoli
		if(typeof(forza) == 'undefined')var forza = false;
		if((forza == '1' && muscleView) || (forza == '2' && !muscleView))return;
		MODELLO.removePrecarMuscle();
		muscleView=!muscleView;
		if(MODELLO.meshPelle.children[0].material.name.indexOf('pelle') > -1 || forza == true){
			for(n=0;n<MODELLO.meshPelle.children.length;n++){
				MODELLO.meshPelle.children[n].material = MODELLO.MAT.materialMuscoli[n];
			}
			document.getElementById("i_muscoli").classList.add("btnSel");
			document.getElementById("p_pelle").classList.add("disattLiv");
			document.getElementById("p_liv_pelle").classList.add("disattLiv");
			document.getElementById("p_muscoli").classList.remove("disattLiv");
			document.getElementById("p_liv_muscoli").classList.remove("disattLiv");
			document.getElementById("slideMuscles").classList.add("slideOn");
			MENU.setOp("Muscoli", MENU.getOp('Muscoli'));
			MODELLO.op("Muscoli",MENU.getOp('Muscoli'));
			if(!SET)this.meshMuscoli.visible = true;
		}else{
			for(n=0;n<MODELLO.meshPelle.children.length;n++){
				MODELLO.meshPelle.children[n].material = MODELLO.MAT["materialPelle"+MODELLO.tipoPelle];
			}
			document.getElementById("i_muscoli").classList.remove("btnSel");
			document.getElementById("p_pelle").classList.remove("disattLiv");
			document.getElementById("p_liv_pelle").classList.remove("disattLiv");
			document.getElementById("p_muscoli").classList.add("disattLiv");
			document.getElementById("p_liv_muscoli").classList.add("disattLiv");
			document.getElementById("slideMuscles").classList.remove("slideOn");
			MENU.setOp("Pelle", MENU.getOp('Pelle'));
			MODELLO.op("Pelle",MENU.getOp('Pelle'));
			this.meshMuscoli.visible = false;
		}
		try{
			SET._setLineMaterials();
		}catch(err){}
		if(!muscleView && document.getElementById("fr_muscoli").className.indexOf("frOpened") > -1){
			MENU.swElMuscoli(true);
		}
		MENU.aggiornaIconeModello();
	},
	
	
	op: function(t,o){ // opacità del livello
		if(manichinoCaricato){
			if(MODELLO.isolamento != null)MODELLO.isolamento = null;
			var t2 = t;
			if(t == 'Pelle' || t == 'Muscoli')MODELLO.opAtt = o;
			if(t == 'Muscoli'){
				t = 'Pelle';
				MODELLO.MAT.pinMuscolo.opacity = o * 0.8;
				MODELLO.MAT.pinMuscoloTrasp.opacity = o * 0.3;
				MODELLO.MAT.pinMuscoloDemo.opacity = o * 0.3;
			}
			var v='true';
			if(o==0)v='false';
			eval("MODELLO.mesh"+t+".visible="+v);
			for(var n=0;n<eval("MODELLO.mesh"+t+".children.length");n++){
				if( eval("MODELLO.mesh"+t+".children["+n+"].material.name")!='materiale visceri evi' &&
					eval("MODELLO.mesh"+t+".children["+n+"].material.name")!='organoSel' &&
					eval("MODELLO.mesh"+t+".children["+n+"].material.name")!='organoDis' )eval("MODELLO.mesh"+t+".children[n].material.opacity = o");
			}
			if(t=='Pelle' && o==1 && (!MODELLO.muscleSel || !MODELLO.muscleAtt)){
				MODELLO.MAT.materialOssa.visible = false;
				MODELLO.MAT.materialVisceri.visible = false;
				MODELLO.MAT.materialOrganoSel.visible = false;
			}else{
				MODELLO.MAT.materialOssa.visible = true;
				MODELLO.MAT.materialVisceri.visible = true;
				MODELLO.MAT.materialOrganoSel.visible = true;
			}
			/*if(t=='Pelle'){
				try{
					var depthFunc = 3;
					if(o<1)depthFunc = 1;
					SET._setLineTrasp(depthFunc);
				}catch(err){if(SET) console.log(err) }
			}*/
			MENU.setOp(t2, o);
			
			// gestisco i pins
			if(globals.pezziSelezionati.length){
				var els = document.getElementById("legende").getElementsByTagName("div");
				for(e=0;e<els.length;e++){
					if( 
						(
							t2 == 'Pelle' && els[e].id.indexOf("Muscolo_") > -1
						) || (
							t2 == 'Muscoli' && els[e].id.indexOf("Muscolo_") > -1 && o < 0.2
						) || (
							( ( t2 == 'Pelle' && o > 0.95 ) || ( t2 == 'Muscoli' && o > 0.6 ) ) &&
							( els[e].id.indexOf("Osso_") > -1 || els[e].id.indexOf("Organo_") > -1)
						) || (
						 	t2 == 'Visceri' && els[e].id.indexOf("Organo_") > -1 && o == 0
						) || (
						 	t2 == 'Ossa' && els[e].id.indexOf("Osso_") > -1 && o == 0
						) || (
						 	t2 == 'Muscoli' && els[e].id.indexOf("Muscolo_") > -1 && o == 0
						)
					){
						els[e].style.display = 'none';
						scene.getObjectByName( els[e].dataset.idObj ).visible = false;
					}else{
						els[e].style.display = 'block';
						scene.getObjectByName( els[e].dataset.idObj ).visible = true;
					}
				}
			}
		}
	},
	opw: function( event, livello ){
		event.stopPropagation();
		var livAtt = MENU.getOp(livello);
		livAtt = Math.round(livAtt*25) / 25;
		if(typeof(livAtt)=='NaN')livaAtt = 0;
		if(livello=='Muscoli')MODELLO.swMuscle(1);
		if(livello=='Pelle')MODELLO.swMuscle(2);
		if ( event.deltaY > 0 ) {
			if(livAtt-0.04 >= 0)MODELLO.op( livello, livAtt-0.04 );
		} else {
			if(livAtt+0.04 <= 1)MODELLO.op( livello, livAtt+0.04 );
		}
		MENU.aggiornaIconeModello();
	},
	slw: function( event, livello ){
		SLIDER.demolt = 2;
		var sliderDest = document.getElementById('s_'+livello).getElementsByTagName('div')[0];
		var modelloAperto = document.getElementById("pulsanti_modello").classList.contains("visSch");
		if(!modelloAperto){
			document.getElementById("pulsanti_modello").style.opacity = 0;
			document.getElementById("pulsanti_modello").classList.add("visSch");
		}
		SLIDER.iniziaSlide(event,sliderDest);
		if(!modelloAperto){
			document.getElementById("pulsanti_modello").classList.remove("visSch");
			document.getElementById("pulsanti_modello").style.opacity = 1;
		}
		
		/*var x = event.pageX;
		var y = event.pageY;*/
		
		var x = touchable ? event.touches[ 0 ].pageX : event.clientX;
		var y = touchable ? event.touches[ 0 ].pageY : event.clientY;
		var w = 210 / SLIDER.demolt;
		if(livello=='pelle' || !document.getElementById("el_"+livello).innerHTML)w = 240 / SLIDER.demolt;
		var posSlider = MENU.getOp(livello)*(w - 12);
		var posCont = MENU.getOp(livello)*(w - 12) + 17;
		document.getElementById("sliderAnatomia").style.width = (w+22) + 'px';
		document.getElementById("sliderAnatomia").classList.add("visSch");
		
		var sliderDiv = document.getElementById("sliderAnatomia").querySelector(".slider");
		var sliderBtn = sliderDiv.getElementsByTagName("div")[0];
		
		sliderBtn.style.marginLeft = posSlider + 'px';
		document.getElementById("sliderAnatomia").style.left = (x - posCont) + 'px';
		document.getElementById("sliderAnatomia").style.top = (y - 16) + 'px';
		if(livello!='pelle' && livello!='muscoli'){
			var l = 'Pelle';
			if(muscleView)l = 'Muscoli';
			if(MENU.getOp(l.toLowerCase()) > 0.6){
				MODELLO.op(l,0.6);
			}
		}
	},
	filtraAnatomia: function(){
		var vis = true;
		var mat = "MODELLO.MAT.pinMuscoloTrasp";
		if((DB.login.data.auths.indexOf("anatomy_full")==-1 || !LOGIN.logedin()) && !globals.AnatomyFREE){
			vis = false;
			mat = "MODELLO.MAT.pinMuscoloDemo";
		}
		
		if(ANATOMIA){
			if(MODELLO.meshVisceri){
				for(o in MODELLO.meshVisceri.children){
					if(MODELLO.meshVisceri.children[o].name != 'CUORE'){
						MODELLO.meshVisceri.children[o].visible = vis;
					}
				}
			}
			if(ANATOMIA.children[4]){
				for(m in ANATOMIA.children[4].children){
					if(ANATOMIA.children[4].children[m].name){
						if(ANATOMIA.children[4].children[m].name.indexOf("PETTORALE")==-1){
							ANATOMIA.children[4].children[m].visible = vis;
							ANATOMIA.children[4].children[m*1+1].visible = vis;
						}else{
							ANATOMIA.children[4].children[m].material = eval(mat);
						}
					}
				}
			}
		}
		var VI = document.getElementById("el_visceri").getElementsByTagName("p");
		for(i in VI){
			if(VI[i].id){
				if(!vis && VI[i].id!='Organo_CUORE'){
					VI[i].classList.add("lockedItem");
				}else{
					VI[i].classList.remove("lockedItem");
				}
			}
		}
		var MU = document.getElementById("el_muscoli").getElementsByTagName("p");
		for(m in MU){
			if(MU[m].id){
				if(!vis && MU[m].id!='Muscolo_PETTORALE'){
					MU[m].classList.add("lockedItem");
				}else{
					MU[m].classList.remove("lockedItem");
				}
			}
		}
	},
	riposLegenda: function(){
		var els = document.getElementById("legende").getElementsByTagName("div");
		for(e=0;e<els.length;e++){
			var obj = scene.getObjectByName( els[e].dataset.idObj );
			var pos1 = toScreenPosition2( obj, 0 );
			var pos2 = toScreenPosition2( obj, 1 );
			
			var centr = true;
			
			if(centr){
				// disposizione CENTRATA
				var spY = 0;
				//if(pos2.y > pos1.y)spY = els[e].scrollHeight;
				spY = els[e].scrollHeight / 2;
				var x = pos2.x - (els[e].scrollWidth / 2);
				var y = (pos2.y + spY )- els[e].scrollHeight;
			}else{
				// disposizione LATERALE
				var x = pos2.x;
				var y = pos2.y - (els[e].scrollHeight / 2 );
				if(pos2.x < pos1.x)x -= els[e].scrollWidth;
			}
			
			els[e].style.left = parseInt(x)+traslStage + 'px';
			els[e].style.top = parseInt(y) + 'px';
		}
	},
	swGuide: function( n, vis, noCentra ){
		if(typeof(noCentra) == 'undefined')var noCentra = false;
		if(MODELLO.meshGuide){
			for(g in MODELLO.meshGuide.children){
				if(MODELLO.meshGuide.children[g].name.indexOf(n) == 0){
					MODELLO.meshGuide.children[g].visible = vis;
					var array = MODELLO.meshGuide.children[g].geometry.attributes.position.array;
					
					var nome = MODELLO.meshGuide.children[g].name;
					var idObj = nome;
					var txt = n;
					if(nome.indexOf("(") > -1){
						var pNome = nome.split("(");
						var pNome2 = pNome[1].split(")");
						nome = pNome2[0];
						txt = nome;
					}
					if(vis){
						
						// aggiungo le legende
						var leg = document.createElement('div');
						leg.id = 'LEG_'+nome;
						leg.dataset.idObj = idObj;
						
						var addTxt = '';
						if(txt.indexOf("_SX") > -1){
							txt = txt.replace("_SX","");
							//addTxt = 'SX';
						}
						if(txt.indexOf("_DX") > -1){
							txt = txt.replace("_DX","");
							//addTxt = 'DX';
						}
						var html = Lingua(eval("TXT_"+txt));
						if(addTxt)html += " ("+Lingua(eval("TXT_"+addTxt))+")";
						leg.innerHTML = stripslashes(html);
						leg.onclick = function(){
							MODELLO.visContextMenu(n,this);
						};
						document.getElementById("legende").appendChild(leg);
						if(typeof(scene.getObjectByName( "centerPoint" )) == 'undefined'){
							if(!noCentra)MODELLO.centraAnatomia(idObj);
						}
					}else{
						var leg = document.getElementById('LEG_'+nome);
						document.getElementById("legende").removeChild(leg);
						overInterfaccia = false;
						overLegenda = false;
						raycastDisable = false;
					}
					
				}
			}
		}
		MODELLO.riposLegenda();
	},
	visContextMenu: function(n,leg){ //  visualizza il menu contestuale dell'anatomia
		if(noAnimate)return;
		MENU.chiudiMenu();
		var txt = '';
		var pN = n.split("_");
		var id = leg.id.substr(4,leg.id.length-4);
		if(id.substr(id.length-3,3)=='_SX' || id.substr(id.length-3,3)=='_DX')id=id.substr(0,id.length-3);
		var p = '';
		var noIsola = true;
		try{
			var els = MODELLO.MAT.masks[ id.substr(id.indexOf("_")+1,id.length-id.indexOf("_")-1) ].masks;
			for(e=0;e<els.length;e++){
				if(els[e] != '')noIsola=false;
			}
		}catch(error){
			noIsola = false;
		};
		//console.log(id);
		if(DB_anatomia[id])txt += '<div class="s" onClick="MODELLO.caricaAnatomia(\''+id+'\',true);">'+Lingua(eval("TXT_ApriScheda"))+'</div>';
		txt += '<div class="c" onClick="MODELLO.centraAnatomia(\''+leg.dataset.idObj+'\');">'+Lingua(eval("TXT_CentraDaQui"))+'</div>';
		var isola = 'MODELLO.isola'+pN[0]+'(document.getElementById(\''+n+'\'))';
		txt += '<div class="d" onClick="'+isola+';">'+Lingua(eval("TXT_Deseleziona"))+'</div>';
		if(globals.pezziSelezionati.length > 1)txt += '<div class="a" onClick="MENU.chiudiAllSelected();'+isola+';">'+Lingua(eval("TXT_DeselezionaAltri"))+'</div>';
		if(MODELLO.isolamento == null && !noIsola)txt += '<div class="i" onClick="MENU.chiudiAllSelected();'+isola+';MODELLO.isolaAnatomia(\''+pN[0]+'\',\''+leg.dataset.idObj+'\');">'+Lingua(eval("TXT_Isola"))+'</div>';
		var x = tCoord(leg);
		document.getElementById("context_menu").classList.add("tooltipVis");
		document.getElementById("context_menu").innerHTML=txt;
		if(x + document.getElementById("context_menu").scrollWidth > WF())x = WF() - document.getElementById("context_menu").scrollWidth;
		if(x < 0)x = 0;
		document.getElementById("context_menu").style.left=x+'px';
		document.getElementById("context_menu").style.top=(tCoord(leg,"y")+leg.scrollHeight)+'px';
		window.addEventListener("mouseup", MODELLO.nasContextMenu, false);
		MODELLO.contextOpened = true;
	},
	nasContextMenu: function(){
		MODELLO.contextOpened = false;
		setTimeout( function(){
			if(!MODELLO.contextOpened){
				document.getElementById("context_menu").classList.remove("tooltipVis");
				document.getElementById("context_menu").classList.remove("menuScheda");
				document.getElementById("context_menu").innerHTML='';
				document.getElementById("context_menu").style.left='-500px';
				document.getElementById("context_menu").style.top='-500px';
				window.removeEventListener("mouseup", MODELLO.nasContextMenu, false);
				overInterfaccia = false;
				overLegenda = false;
				if(!touchable)controlsM._MM = false;
			}
		}, 10 );
	},
	caricaAnatomia: function( n, espansa ){
		var titolo = DB_anatomia[n].Titolo;
		var html = '<div class="descrAnatomia';
		if(!__(DB_anatomia[n].baseImg,false))html += ' noBaseImg';
		html += '"><h1>'+titolo+'</h1>'+DB_anatomia[n].Descrizione+'</div>';
		// dettaglio
		if(__(DB_anatomia[n].baseImg,false)){
			var im = n;
			if(typeof(DB_anatomia[n].baseImg)=='string')im = DB_anatomia[n].baseImg;
			html += '<div class="dettaglioAnatomia" style="background-image:url(img/anatomia/'+im+'.jpg)"><img src="img/anatomia/'+n+'.jpg"></div>';
		}
		raycastDisable = false;
		
		var btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'models.anatomy\')">' +
							Lingua(TXT_ReferenceGuide) +
						'</div>';
						
		SCHEDA.caricaScheda(	titolo,
								html,
								"",
								"tab_anatomia", 
								false, 
								espansa,
								'',
								btnAdd );
		MODELLO.schSel = n;
	},
	centraAnatomia: function(name){
		var pt = scene.getObjectByName( name ).geometry.attributes.position.array;
		MENU.attBtnCentro();
		panEndZero = { x: 0-pt[0], y: 0-pt[1], z: 0-pt[2] };
		panEnd = { x: 0, y: 0, z: 0 };
		if(manichinoCont.position.z<15)zoomEnd = 15;
		normalizeRotation();
		
		var g = new THREE.SphereGeometry( 0.02, 1, 1 );
		var p = new THREE.Mesh( g, MODELLO.MAT.pointTrasp );
		p.position.set(pt[0],pt[1],pt[2]);
		p.name='centerPoint';
		p.userData = { "obj": name };
		manichino.add( p );
		raycastDisable = false;
	},
	isolaAnatomia: function(tipo,idObj){
		var opVisceri = MENU.getOp('Visceri');
		var opOssa = MENU.getOp('Ossa');
		var opPelle = MENU.getOp('Pelle');
		MODELLO.op('Visceri',0.05);
		MODELLO.op('Ossa',0.05);
		if(!muscleView || tipo != 'Muscolo')MODELLO.op('Pelle',0.05);
		else MODELLO.op('Pelle',1);
		MODELLO.isolamento = {
			"idObj": idObj,
			"Visceri": opVisceri,
			"Ossa": opOssa,
			"Pelle": opPelle,
			"muscleView": muscleView
			};
	},
	annullaIsolamento: function(){
		if(typeof(scene.getObjectByName( "centerPoint" )) != 'undefined'){ // ricentro il manichino
			var exPt = scene.getObjectByName( "centerPoint" );
			
			// ricentro il manichino
			exPt.updateMatrixWorld();
			var vector = exPt.geometry.vertices[3].clone();
			vector.applyMatrix4( exPt.matrixWorld );
			manichino.position.set( 0, 0, 0 );
			
			render();
			exPt.updateMatrixWorld();
			var vector2 = exPt.geometry.vertices[3].clone();
			vector2.applyMatrix4( exPt.matrixWorld );
			manichinoCont.position.x = manichinoCont.position.x - (vector2.x-vector.x);
			manichinoCont.position.y = manichinoCont.position.y - (vector2.y-vector.y);
			manichinoCont.position.z = manichinoCont.position.z - (vector2.z-vector.z);
			render();
			manichino.remove( exPt );
		}
		if(MODELLO.isolamento == null)return;
		var opVisceri = MODELLO.isolamento.Visceri;
		var opOssa = MODELLO.isolamento.Ossa;
		var opPelle = MODELLO.isolamento.Pelle;
		if(!muscleView && MODELLO.isolamento.muscleView)MODELLO.swMuscle();
		MODELLO.isolamento = null;
		MODELLO.op('Visceri', opVisceri);
		MODELLO.op('Ossa', opOssa);
		MODELLO.op('Pelle', opPelle);
	},
	eviPin: function( n, vis ){
		for(g in MODELLO.meshGuide.children){
			if(MODELLO.meshGuide.children[g].name.indexOf(n) == 0){
				MODELLO.meshGuide.children[g].visible = vis;
				var array = MODELLO.meshGuide.children[g].geometry.attributes.position.array;
				
				var nome = MODELLO.meshGuide.children[g].name;
				var idObj = nome;
				var txt = n;
				if(nome.indexOf("(") > -1){
					var pNome = nome.split("(");
					var pNome2 = pNome[1].split(")");
					nome = pNome2[0];
					txt = nome;
				}
				
			}
		}
	},
	swPins: function(){
		document.getElementById("legende").classList.toggle("visSch");
		document.getElementById("p_pins").classList.toggle("pinsNo");
		MODELLO.meshGuide.visible = !MODELLO.meshGuide.visible;
	},
	
	isolaOrgano: function( el, modo, noCentra ){
		if(typeof(modo) == 'undefined')var modo = '';
		if(typeof(noCentra) == 'undefined')var noCentra = false;
		if(!modo)MODELLO.annullaIsolamento();
		var organo = el.id.replace("Organo_","");
		
		// verifico le autorizzazioni
		if((DB.login.data.auths.indexOf("anatomy_full")==-1 || !LOGIN.logedin()) && !globals.AnatomyFREE){
			if(	organo != 'CUORE' ){
				if(!modo)ALERT(Lingua(TXT_MsgNoAnatomy));
				return;
			}
		}
		// --------------------------
		
		for(var n=0;n<MODELLO.meshVisceri.children.length;n++){
			if(MODELLO.meshVisceri.children[n].name == organo){
				if(MODELLO.meshVisceri.children[n].material.name != 'organoSel'){
					if(modo == 'over'){
						MODELLO.meshVisceri.children[n].material = MODELLO.MAT.materialVisceriOver;
					}else if(modo == 'out'){
						MODELLO.meshVisceri.children[n].material = MODELLO.MAT.materialVisceri;
					}else{
						MODELLO.meshVisceri.children[n].material = MODELLO.MAT.materialOrganoSel;
						var t = 'Pelle';
						if(muscleView)t = 'Muscoli';
						if(MENU.getOp(t) > 0.8){
							if(MODELLO.muscleSel)MODELLO.op(t,0.95);
							else MODELLO.op(t,0.4);
							MENU.aggiornaIconeModello();
						}
						MENU.addSelected(el,'V');
						MODELLO.swGuide("Organo_"+organo,true, noCentra);
						if(WF() < 600)MENU.chiudiMenu();
						/*if(DB_anatomia[el.id]){
							MODELLO.caricaAnatomia(el.id,false);
						}*/
					}
				}else if(!modo){
					MODELLO.meshVisceri.children[n].material = MODELLO.MAT.materialVisceri;
					MENU.removeSelected(el);
					MODELLO.swGuide("Organo_"+organo,false);
					if(el.id == MODELLO.schSel)SCHEDA.scaricaScheda();
				}
			}
		}
		if(!modo)el.classList.toggle("p_viscSel");
		MENU.verSelected();
	},
	
	isolaOsso: function( el, modo, noCentra ){
		if(typeof(modo) == 'undefined')var modo = '';
		if(typeof(noCentra) == 'undefined')var noCentra = false;
		if(!modo)MODELLO.annullaIsolamento();
		var osso = el.id.replace("Osso_","");
		
		for(var n=0;n<MODELLO.meshOssa.children.length;n++){
			if(MODELLO.meshOssa.children[n].name == osso){
				if(MODELLO.meshOssa.children[n].material.name != 'organoSel'){
					if(modo == 'over'){
						MODELLO.meshOssa.children[n].material = MODELLO.MAT.materialOssaOver;
					}else if(modo == 'out'){
						MODELLO.meshOssa.children[n].material = MODELLO.MAT.materialOssa;
					}else{
						MODELLO.meshOssa.children[n].material = MODELLO.MAT.materialOrganoSel;
						var t = 'Pelle';
						if(muscleView)t = 'Muscoli';
						if(MENU.getOp(t) > 0.8){
							if(MODELLO.muscleSel)MODELLO.op(t,0.95);
							else MODELLO.op(t,0.4);
							MENU.aggiornaIconeModello();
						}
						MENU.addSelected(el,'O');
						MODELLO.swGuide("Osso_"+osso,true, noCentra);
						if(WF() < 600)MENU.chiudiMenu();
						/*if(DB_anatomia[el.id]){
							MODELLO.caricaAnatomia(el.id,false);
						}*/
					}
				}else if(!modo){
					MODELLO.meshOssa.children[n].material = MODELLO.MAT.materialOssa;
					MENU.removeSelected(el);
					MODELLO.swGuide("Osso_"+osso,false);
					if(el.id == MODELLO.schSel)SCHEDA.scaricaScheda();
				}
			}
		}
		if(!modo)el.classList.toggle("p_ossaSel");
		MENU.verSelected();
	},
	
	isolaMuscolo: function( el, modo, noCentra ){
		if(!muscleView || MENU.wheeling || this.muscleBlock)return;
		MODELLO.muscleAtt = el;
		if(typeof(modo) == 'undefined')var modo = '';
		if(typeof(noCentra) == 'undefined')var noCentra = false;
		if(!modo)MODELLO.annullaIsolamento();
		if(!modo)visLoader('');
		if(modo == 'out'){
			if(!MODELLO.muscleSel){
				MODELLO.tuttiMuscoli();
				return;
			}
		}
		var muscolo = '';
		var desel = false;
		if(el.id)muscolo = el.id.replace("Muscolo_","");
		
		// verifico le autorizzazioni
		if((DB.login.data.auths.indexOf("anatomy_full")==-1 || !LOGIN.logedin()) && !globals.AnatomyFREE){
			if(	muscolo != 'PETTORALE' ){
				if(!modo)ALERT(Lingua(TXT_MsgNoAnatomy));
				nasLoader();
				return;
			}
		}
		// --------------------------
		
		if(!modo){
			if(globals.pezziSelezionati.indexOf(el.id) > -1){ // DESELEZIONO
				document.getElementById(el.id).classList.toggle("p_viscSel");
				desel = true;
			}
		}
		MODELLO.MAT.mask = [];
		for(m=0;m<MODELLO.MAT.materialMuscoli.length;m++){
			var IMG = '';
			if(muscolo){
				IMG = decomprA(MODELLO.MAT.masks[muscolo].masks[m]);
				if(!modo && m==0){
					if(!desel)MODELLO.swGuide("Muscolo_"+muscolo,true, noCentra);
					else MODELLO.swGuide("Muscolo_"+muscolo,false);
				}
			}
			if(!IMG)IMG = decomprA(MODELLO.MAT.maskVuota);
			IMG = 'data:image/jpeg;base64,' + IMG;
			if(!modo)MODELLO.muscleBlock = MODELLO.MAT.materialMuscoli.length;
			if(!desel)MODELLO.mergeImages( m, IMG, modo, el );
			else MODELLO.diffImages( m, IMG, modo, el );
		}
		if(!modo){
			if(!desel){
				MENU.addSelected(el,'M');
				el.classList.toggle("p_viscSel");
				/*if(DB_anatomia[el.id]){
					MODELLO.caricaAnatomia(el.id,false);
				}*/
			}else{
				MENU.removeSelected(el);
				if(el.id == MODELLO.schSel)SCHEDA.scaricaScheda();
			}
			MODELLO.muscleSel = false;
			for(m in globals.pezziSelezionati){
				if(globals.pezziSelezionati[m].indexOf("Muscolo_") > -1)MODELLO.muscleSel = true;
			}
		}
		MODELLO.op("Muscoli",MENU.getOp("Muscoli"));
		MENU.verSelected();
		//if(!MODELLO.muscleSel)MODELLO.tuttiMuscoli();
	},
	tuttiMuscoli: function(){
		for(m=0;m<MODELLO.MAT.materialMuscoli.length;m++){
			MODELLO.MAT.materialMuscoli[m].alphaMap = null;
			MODELLO.meshPelle.children[m].material.alphaMap = null;
			MODELLO.meshPelle.children[m].material.needsUpdate = true;
			MODELLO.imgsAtt[m] = null;
		}
		if(MODELLO.muscleSel){
			var tot = globals.pezziSelezionati.length;
			var n=-1;
			for(m=0;m<tot;m++){
				n++;
				if(globals.pezziSelezionati[0].indexOf("Muscolo_") > -1){
					MODELLO.swGuide(globals.pezziSelezionati[n],false);
					MENU.removeSelected(document.getElementById(globals.pezziSelezionati[n]));
					n--;
					if(WF() < 600)MENU.chiudiMenu();
				}
			}
			MODELLO.muscleSel = false;
			MODELLO.muscleAtt = null;
		}
		MENU.verSelected();
	},
	mergeImages: function( m, IMG, modo, el, globalCompositeOperation ){
		if(typeof(globalCompositeOperation) == 'undefined')var globalCompositeOperation = 'lighten';
		var selected = el.className.indexOf("p_viscSel")
		var i2 = MODELLO.imgsAtt[m];
		if(!i2)MODELLO.setAlphaMap( m, IMG, modo ); // se non c'era ancora alphaMap
		else{ // se devo fondere le mappe alpha
			if(!modo || modo == 'over'){
				var c=document.createElement("canvas");
				c.width = 1024;
				c.height = 1024;
				var ctx=c.getContext("2d");
				ctx.globalCompositeOperation = globalCompositeOperation;
				var imageObj1 = new Image();
				imageObj1.src = IMG;
				var imageObj2 = new Image();
				imageObj1.onload = function() {
				   ctx.drawImage(imageObj1, 0, 0, 1024, 1024);
				   imageObj2.src = i2;
				   imageObj2.onload = function() {
					  ctx.drawImage(imageObj2, 0, 0, 1024, 1024);
					  if(MODELLO.muscleAtt == el)MODELLO.setAlphaMap( m, c.toDataURL("image/jpeg"), modo );
				   }
				}
			}else MODELLO.setAlphaMap( m, i2, modo );
		}
	},
	setAlphaMap: function( m, IMG, modo ){
		var imgs = Array();
		imgs[m] = new Image();
		imgs[m].src =  IMG;
		if(!modo)MODELLO.imgsAtt[m] = IMG;
		else MODELLO.imgsProvv[m] = IMG;
		MODELLO.MAT.mask[m] = new THREE.Texture();
		MODELLO.MAT.mask[m].image = imgs[m];
		imgs[m].n = m;
		imgs[m].onload = function() {
			var m = this.n;
			try{
				MODELLO.MAT.mask[m].needsUpdate = true;
				MODELLO.MAT.materialMuscoli[m].alphaMap = MODELLO.MAT.mask[m];
				MODELLO.meshPelle.children[m].material.alphaMap = MODELLO.MAT.mask[m];
				MODELLO.meshPelle.children[m].material.needsUpdate = true;
				if(!modo){
					MODELLO.muscleBlock --;
					if(!MODELLO.muscleBlock)nasLoader();
					if(!MODELLO.muscleSel)MODELLO.tuttiMuscoli();
				}
			} catch(err){};
		};
	},
	diffImages: function( m, IMG, modo, el ){
		var c=document.createElement("canvas");
		c.width = 1024;
		c.height = 1024;
				
		var ctx = c.getContext("2d");
		
		var img = new Image();
		img.src = IMG;
		
		img.onload = function() {
			ctx.drawImage(img, 0, 0, 1024, 1024);
			var imgData = ctx.getImageData(0, 0, c.width, c.height);
			
			var i;
			for (i = 0; i < imgData.data.length; i += 4) {
				imgData.data[i] = (255 - imgData.data[i]) + 72;
				imgData.data[i+1] = (255 - imgData.data[i+1]) + 72;
				imgData.data[i+2] = (255 - imgData.data[i+2]) + 72;
				imgData.data[i+3] = 255;
			}
			ctx.putImageData(imgData, 0, 0);
			MODELLO.mergeImages( m, c.toDataURL("image/jpeg"), modo, el, 'multiply' );
		}
	},
	azRicercaAnatomia: function( ELEM, tipo, pin ){
		if(tipo == 'osso')tipo = 'ossa';
		if(tipo == 'organo')tipo = 'visceri';
		if(tipo == 'muscolo'){
			tipo = 'muscoli';
			if(MODELLO.meshPelle.children[0].material.name.indexOf('pelle') > -1)MODELLO.swMuscle(true);
		}
		if(globals.pezziSelezionati.indexOf(ELEM) == -1){
			document.getElementById("el_"+tipo+"_cont").getElementsByTagName("p")[ELEM].click();
		}
		MODELLO.centraAnatomia( pin );
		RICERCHE.nascondiGlobal();
	},
	cambiaTipoPelle: function( tipo ){
		MODELLO.tipoPelle = tipo;
		localStorage.tipoPelle = tipo;
		var els = document.getElementById("skinSel").getElementsByTagName("span");
		for(i = 0; i<els.length; i++){
			els[i].classList.remove("cSel");
		}
		if(localStorage.tipoPelle == '')els[0].classList.add("cSel");
		if(localStorage.tipoPelle == '_mulatta')els[1].classList.add("cSel");
		if(localStorage.tipoPelle == '_nera')els[2].classList.add("cSel");
		if(globals.modello.cartella){
			for(p in ANATOMIA.children[2].children){
				ANATOMIA.children[2].children[p].material = MODELLO.MAT["materialPelle"+MODELLO.tipoPelle];
			}
		}
	}
	
};

