var MODELLO = {
		
	INTERSECTED: null,
	meshPelle: null,
	meshAree: null,
	meshMuscoli3d: null,
	meshOssa: null,
	meshLegamenti: null,
	meshVisceri: null,
	meshVasi: null,
	meshGuide: null,
	mask: [],
	imgsAtt: [],
	imgsProvv: [],
	areaSel: false,
	areaAtt: null,
	contextOpened: false,
	isolamento: null,
	schSel: '',
	opAtt: 1,
	orOp: -1,
	tipoPelle: '',
	flip: false,
	posOver: null, // test per posizione x,y,z su oggetto
	editor: false, // test per editor di punti
	open_x_translate: false,
	
	_init: function(modello){
		
		ANATOMIA = new THREE.Group();
		ANATOMIA.name="MODELLO";
		
		this.meshPelle = null;
		this.meshAree = null;
		this.meshMuscoli3d = null;
		this.meshOssa = null;
		this.meshLegamenti = null;
		this.meshVisceri = null;
		this.meshVasi = null;
		this.MAT.materialAree = [];
		let rgMat = /\[([^\]]+)\]/; // RegularExpression per addMat
		
		if(localStorage.tipoPelle)MODELLO.tipoPelle = localStorage.tipoPelle;
		if(!globals.modello.areaName)localStorage.areasView = '';
		
		if(globals.modello.livelli.indexOf("visceri") > -1){
			obj_visceri = JSON.parse(LZString.decompressFromBase64(obj_visceri));
			
			let loader = new THREE.ObjectLoader(); // VISCERI
			this.meshVisceri = loader.parse( obj_visceri );
			for(let n=0;n<this.meshVisceri.children.length;n++){
				this.meshVisceri.children[n].userData.matAdd = '';
				let mat = MODELLO.MAT.materialVisceri;
				if(eval("MODELLO.MAT.material"+this.meshVisceri.children[n].name.replace(rgMat,""))){
					mat = eval("MODELLO.MAT.material"+this.meshVisceri.children[n].name);
				}
				let matches = this.meshVisceri.children[n].name.match(rgMat);
				if(matches){
					mat = eval("MODELLO.MAT.materialVisceri"+matches[1]);
					this.meshVisceri.children[n].userData.matAdd = matches[1];
				}
				this.meshVisceri.children[n].material = mat;
				this.meshVisceri.children[n].name = this.meshVisceri.children[n].name.replace(rgMat,"");
			}
			this.meshVisceri.name = 'Visceri';
			ANATOMIA.add( this.meshVisceri );

			MODELLO.op('Visceri',MENU.getOp('Visceri')); // ri-setto al cambio del modello
			
			/* elenco organi */
			let arrayVisceri = [],
				htmlVisceri = '';
			if(this.meshVisceri.children.length > 0){
				for(let o in MODELLO.meshVisceri.children){
					arrayVisceri.push({
						organo: MODELLO.meshVisceri.children[o].name,
						nome: TXT("Organo_"+MODELLO.meshVisceri.children[o].name)
					});
				}
				arrayVisceri.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				for(let o in arrayVisceri){
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
			let loader = new THREE.ObjectLoader(); // OSSA
			this.meshOssa = loader.parse( obj_ossa );
			for(let n=0;n<this.meshOssa.children.length;n++){
				this.meshOssa.children[n].userData.matAdd = '';
				let mat = this.MAT.materialOssa;
				let matches = this.meshOssa.children[n].name.match(rgMat);
				if(matches){
					mat = eval("MODELLO.MAT.materialOssa"+matches[1]);
					this.meshOssa.children[n].userData.matAdd = matches[1];
				}
				this.meshOssa.children[n].material = mat;
				this.meshOssa.children[n].name = this.meshOssa.children[n].name.replace(rgMat,"");
			}
			this.meshOssa.name = 'Ossa';
			ANATOMIA.add( this.meshOssa );
			MODELLO.op('Ossa',MENU.getOp('Ossa')); // ri-setto al cambio del modello
			
			/* elenco ossa */
			let arrayOssa = [],
				htmlOssa = '';
			if(this.meshOssa.children.length > 0){
				for(let o in MODELLO.meshOssa.children){
					arrayOssa.push({
						osso: MODELLO.meshOssa.children[o].name,
						nome: TXT("Osso_"+MODELLO.meshOssa.children[o].name)
					});
				}
				arrayOssa.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				for(let o in arrayOssa){
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


		
		if(globals.modello.livelli.indexOf("muscoli3d") > -1){
			obj_muscoli3d = JSON.parse(LZString.decompressFromBase64(obj_muscoli3d));
			let loader = new THREE.ObjectLoader(); // MUSCOLI 3D
			this.meshMuscoli3d = loader.parse( obj_muscoli3d );
			for(let n=0;n<this.meshMuscoli3d.children.length;n++){
				this.meshMuscoli3d.children[n].userData.matAdd = '';
				let mat = this.MAT.materialMuscoli3d;
				let matches = this.meshMuscoli3d.children[n].name.match(rgMat);
				if(matches){
					mat = eval("MODELLO.MAT.materialMuscoli3d"+matches[1]);
					this.meshMuscoli3d.children[n].userData.matAdd = matches[1];
				}
				this.meshMuscoli3d.children[n].material = mat;
				this.meshMuscoli3d.children[n].name = this.meshMuscoli3d.children[n].name.replace(rgMat,"");
			}
			this.meshMuscoli3d.name = 'Muscoli3d';
			ANATOMIA.add( this.meshMuscoli3d );
			MODELLO.op('Muscoli3d',MENU.getOp('Muscoli3d')); // ri-setto al cambio del modello
			
			/* elenco muscoli3d */
			let arrayMuscoli3d = [],
				htmlMuscoli3d = '';
			if(this.meshMuscoli3d.children.length > 0){
				for(let o in MODELLO.meshMuscoli3d.children){
					arrayMuscoli3d.push({
						muscolo3d: MODELLO.meshMuscoli3d.children[o].name,
						nome: TXT("Muscolo_"+MODELLO.meshMuscoli3d.children[o].name)
					});
				}
				arrayMuscoli3d.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				for(let o in arrayMuscoli3d){
					htmlMuscoli3d += '<p id="Muscolo_'+arrayMuscoli3d[o].muscolo3d+'" onMouseOver="MODELLO.isolaMuscolo3d(this,\'over\');" onMouseOut="MODELLO.isolaMuscolo3d(this,\'out\');" onClick="MODELLO.isolaMuscolo3d(this);">'+stripslashes(arrayMuscoli3d[o].nome)+'</p>';
				}
				document.getElementById("p_muscoli3d").classList.add("livelli_listed");
			}
			document.getElementById("el_muscoli3d").innerHTML = __(htmlMuscoli3d,'');

			this.MAT.mappaMuscoli3d();
			
		}else{
			muscoli3d = new THREE.Group();
			muscoli3d.name = 'MUSCOLI 3D';
			ANATOMIA.add( muscoli3d );
		}


		if(globals.modello.livelli.indexOf("legamenti") > -1){
			obj_legamenti = JSON.parse(LZString.decompressFromBase64(obj_legamenti));
			let loader = new THREE.ObjectLoader(); // LEGAMENTI
			this.meshLegamenti = loader.parse( obj_legamenti );
			for(let n=0;n<this.meshLegamenti.children.length;n++){
				this.meshLegamenti.children[n].userData.matAdd = '';
				let mat = this.MAT.materialLegamenti;
				let matches = this.meshLegamenti.children[n].name.match(rgMat);
				if(matches){
					mat = eval("MODELLO.MAT.materialLegamenti"+matches[1]);
					this.meshLegamenti.children[n].userData.matAdd = matches[1];
				}
				this.meshLegamenti.children[n].material = mat;
				this.meshLegamenti.children[n].name = this.meshLegamenti.children[n].name.replace(rgMat,"");
			}
			this.meshLegamenti.name = 'Legamenti';
			ANATOMIA.add( this.meshLegamenti );
			MODELLO.op('Legamenti',MENU.getOp('Legamenti')); // ri-setto al cambio del modello
			
			/* elenco legamenti */
			let arrayLegamenti = [],
				htmlLegamenti = '';
			if(this.meshLegamenti.children.length > 0){
				for(let o in MODELLO.meshLegamenti.children){
					arrayLegamenti.push({
						legamento: MODELLO.meshLegamenti.children[o].name,
						nome: TXT("Legamento_"+MODELLO.meshLegamenti.children[o].name)
					});
				}
				arrayLegamenti.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				for(let o in arrayLegamenti){
					htmlLegamenti += '<p id="Legamento_'+arrayLegamenti[o].legamento+'" onMouseOver="MODELLO.isolaLegamento(this,\'over\');" onMouseOut="MODELLO.isolaLegamento(this,\'out\');" onClick="MODELLO.isolaLegamento(this);">'+stripslashes(arrayLegamenti[o].nome)+'</p>';
				}
				document.getElementById("p_legamenti").classList.add("livelli_listed");
			}
			document.getElementById("el_legamenti").innerHTML = __(htmlLegamenti,'');
			
		}else{
			legamenti = new THREE.Group();
			legamenti.name = 'LEGAMENTI';
			ANATOMIA.add( legamenti );
		}


		if(globals.modello.livelli.indexOf("vasi") > -1){
			obj_vasi = JSON.parse(LZString.decompressFromBase64(obj_vasi));
			
			let loader = new THREE.ObjectLoader(); // VASI
			this.meshVasi = loader.parse( obj_vasi );
			for(let n=0;n<this.meshVasi.children.length;n++){
				this.meshVasi.children[n].userData.matAdd = '';
				let mat = MODELLO.MAT.materialVasi;
				if(eval("MODELLO.MAT.material"+this.meshVasi.children[n].name.replace(rgMat,""))){
					mat = eval("MODELLO.MAT.material"+this.meshVasi.children[n].name);
				}
				let matches = this.meshVasi.children[n].name.match(rgMat);
				if(matches){
					mat = eval("MODELLO.MAT.materialVasi"+matches[1]);
					this.meshVasi.children[n].userData.matAdd = matches[1];
				}
				this.meshVasi.children[n].material = mat;
				this.meshVasi.children[n].name = this.meshVasi.children[n].name.replace(rgMat,"");
			}
			this.meshVasi.name = 'Vasi';
			ANATOMIA.add( this.meshVasi );

			MODELLO.op('Vasi',MENU.getOp('Vasi')); // ri-setto al cambio del modello
			
			/* elenco organi */
			let arrayVasi = [],
				htmlVasi = '';
			if(this.meshVasi.children.length > 0){
				for(let o in MODELLO.meshVasi.children){
					arrayVasi.push({
						vaso: MODELLO.meshVasi.children[o].name,
						nome: TXT("Vaso_"+MODELLO.meshVasi.children[o].name)
					});
				}
				arrayVasi.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				for(let o in arrayVasi){
					htmlVasi += '<p id="Vaso_'+arrayVasi[o].vaso+'" onMouseOver="MODELLO.isolaVaso(this,\'over\');" onMouseOut="MODELLO.isolaVaso(this,\'out\');" onClick="MODELLO.isolaVaso(this)">'+stripslashes(arrayVasi[o].nome)+'</p>';
				}
				document.getElementById("p_vasi").classList.add("livelli_listed");
			}
			document.getElementById("el_vasi").innerHTML = __(htmlVasi,'');
		}else{
			vasi = new THREE.Group();
			vasi.name = 'VASI';
			ANATOMIA.add( vasi );
		}


		
		if(globals.modello.livelli.indexOf("pelle") > -1){ // lasciare per ultima per le trasparenze
			obj_pelle = JSON.parse(LZString.decompressFromBase64(obj_pelle));
			
			let loader = new THREE.ObjectLoader(); // PELLE
			this.meshPelle = loader.parse( obj_pelle );
			this.meshPelle.name = "PELLE";
			this.meshPelle.userData.isMeshAree = true;
			for(let n=0;n<this.meshPelle.children.length;n++){
				this.meshPelle.children[n].material = this.MAT["materialPelle"+MODELLO.tipoPelle];
				this.imgsAtt[n] = null;
			}
			ANATOMIA.add( this.meshPelle );
			MODELLO.op('Pelle',MENU.getOp('Pelle')); // ri-setto al cambio del modello

			if(globals.modello.livelli.indexOf("aree") > -1){
				this.MAT.mappaAree();
				if(areasView){
					areasView = false;
					MODELLO.swArea(2);
				}else{
					MODELLO.precarArea();
				}
			}
			/* elenco aree */
			let arrayAree_ORECCHIO = [],
				arrayAree_TESTA = [],
				arrayAree_COLLO = [],
				arrayAree_TORSO = [],
				arrayAree_ARTO_SUPERIORE = [],
				arrayAree_ARTO_INFERIORE = [],
				htmlAree = '';
			if(MODELLO.MAT.masks != null){
				for(let o in MODELLO.MAT.masks){
					eval("arrayAree_"+MODELLO.MAT.masks[o].zona).push({
						area: o,
						nome: TXT("Muscolo_"+o)
					});
				}
				
				// ordino alfabeticamente
				arrayAree_ORECCHIO.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				arrayAree_TESTA.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				arrayAree_COLLO.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				arrayAree_TORSO.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				arrayAree_ARTO_SUPERIORE.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
				arrayAree_ARTO_INFERIORE.sort(function(a,b){
					return a.nome.localeCompare(b.nome);
				});
					
				if(arrayAree_TESTA.length){
					htmlAree += '<i>'+stripslashes(TXT("Zona_TESTA"))+'</i><div onMouseLeave="MODELLO.isolaArea(this,\'out\');">';
					for(let o in arrayAree_TESTA){
						htmlAree += '<p id="Muscolo_'+arrayAree_TESTA[o].area+'" onClick="MODELLO.isolaArea(this)" onMouseOver="MODELLO.isolaArea(this,\'over\');">'+stripslashes(arrayAree_TESTA[o].nome)+'</p>';
					}
					htmlAree += '</div>';
				}
				if(arrayAree_ORECCHIO.length){
					htmlAree += '<i>'+stripslashes(TXT("Zona_ORECCHIO"))+'</i><div onMouseLeave="MODELLO.isolaArea(this,\'out\');">';
					for(let o in arrayAree_ORECCHIO){
						htmlAree += '<p id="Muscolo_'+arrayAree_ORECCHIO[o].area+'" onClick="MODELLO.isolaArea(this)" onMouseOver="MODELLO.isolaArea(this,\'over\');">'+stripslashes(arrayAree_ORECCHIO[o].nome)+'</p>';
					}
					htmlAree += '</div>';
				}
				if(arrayAree_COLLO.length){
					htmlAree += '<i>'+stripslashes(TXT("Zona_COLLO"))+'</i><div onMouseLeave="MODELLO.isolaArea(this,\'out\');">';
					for(let o in arrayAree_COLLO){
						htmlAree += '<p id="Muscolo_'+arrayAree_COLLO[o].area+'" onClick="MODELLO.isolaArea(this)" onMouseOver="MODELLO.isolaArea(this,\'over\');">'+stripslashes(arrayAree_COLLO[o].nome)+'</p>';
					}
					htmlAree += '</div>';
				}
				if(arrayAree_TORSO.length){
					htmlAree += '<i>'+stripslashes(TXT("Zona_TORSO"))+'</i><div onMouseLeave="MODELLO.isolaArea(this,\'out\');">';
					for(let o in arrayAree_TORSO){
						htmlAree += '<p id="Muscolo_'+arrayAree_TORSO[o].area+'" onClick="MODELLO.isolaArea(this)" onMouseOver="MODELLO.isolaArea(this,\'over\');">'+stripslashes(arrayAree_TORSO[o].nome)+'</p>';
					}
					htmlAree += '</div>';
				}
				if(arrayAree_ARTO_SUPERIORE.length){
					htmlAree += '<i>'+stripslashes(TXT("Zona_ARTO_SUPERIORE"))+'</i><div onMouseLeave="MODELLO.isolaArea(this,\'out\');">';
					for(let o in arrayAree_ARTO_SUPERIORE){
						htmlAree += '<p id="Muscolo_'+arrayAree_ARTO_SUPERIORE[o].area+'" onClick="MODELLO.isolaArea(this)" onMouseOver="MODELLO.isolaArea(this,\'over\');">'+stripslashes(arrayAree_ARTO_SUPERIORE[o].nome)+'</p>';
					}
					htmlAree += '</div>';
				}
				if(arrayAree_ARTO_INFERIORE.length){
					htmlAree += '<i>'+stripslashes(TXT("Zona_ARTO_INFERIORE"))+'</i><div onMouseLeave="MODELLO.isolaArea(this,\'out\');">';
					for(let o in arrayAree_ARTO_INFERIORE){
						htmlAree += '<p id="Muscolo_'+arrayAree_ARTO_INFERIORE[o].area+'" onClick="MODELLO.isolaArea(this)" onMouseOver="MODELLO.isolaArea(this,\'over\');">'+stripslashes(arrayAree_ARTO_INFERIORE[o].nome)+'</p>';
					}
					htmlAree += '</div>';
				}
				document.getElementById("p_aree").classList.add("livelli_listed");
			}
			if(globals.modello.livelli.indexOf("aree")>-1 && (globals.modello.areaName=='Muscles' || globals.modello.areaName=='Aree'))document.getElementById("el_aree").innerHTML = __(htmlAree);
		}else{
			MODELLO.swArea(2);
		}
		
		
		
		// GUIDE (legenda e pin aree)
		this.meshAree = new THREE.Group();
		this.meshAree.name = "pins_aree";
		this.meshAree.visible = (areasView && !SET) ? true : false;
		if(obj_guide){
			obj_guide = JSON.parse(LZString.decompressFromBase64(obj_guide));
			let loader = new THREE.ObjectLoader();
			this.meshGuide =  loader.parse( obj_guide );
			this.meshGuide.name = 'GUIDE';
			for(let n=0;n<this.meshGuide.children.length;n++){
				this.meshGuide.children[n].material = MODELLO.MAT.lineGuideSel;
				this.meshGuide.children[n].visible = false;
				if(this.meshGuide.children[n].name.indexOf("Muscolo_") > -1){
						
					let array = this.meshGuide.children[n].geometry.attributes.position.array;
					
					//if(!globals.modello.muscles3d){
						let geometry = new THREE.SphereGeometry( 0.05, 8, 8 ),
							pin = new THREE.Mesh( geometry, this.MAT.pinAreaTrasp );
						pin.position.set(array[0],array[1],array[2]);
						pin.name="PIN_"+this.meshGuide.children[n].name;
						this.meshAree.add( pin );
					//}
					
					let geometry2 = new THREE.SphereGeometry( 0.01, 8, 8 ),
						pin2 = new THREE.Mesh( geometry2, this.MAT.pinArea );
					pin2.position.set(array[0],array[1],array[2]);
					//pin2.name="PIN_"+this.meshGuide.children[n].name;
					this.meshAree.add( pin2 );
					
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
		ANATOMIA.add( this.meshAree ); 
		this.removePrecarArea();

		
		manichino.add( ANATOMIA );
					
		// scarico la memoria
		obj_pelle=[];
		obj_ossa=[];
		obj_muscoli3d=[];
		obj_legamenti=[];
		obj_visceri=[];
		obj_vasi=[];
		Muscle_Head='';
		Muscle_Limbs='';
		Muscle_Torso='';
		for(let n=0;n<globals.modello.imports.length;n++){
			document.getElementById("scripts").removeChild(IMPORTER.jss[n]);
		}
		
		
		
		// riseleziono i pezzi (organi, ossa, muscoli e legamenti) selezionati su un altro manichino
		let pezziSelezionati = JSON.parse(JSON.stringify(globals.pezziSelezionati));
		globals.pezziSelezionati = [];
		for(let e in pezziSelezionati){
			if(document.getElementById(pezziSelezionati[e])){
				if(pezziSelezionati[e].indexOf("Organo_") == 0)MODELLO.isolaOrgano(document.getElementById(pezziSelezionati[e]));
				if(pezziSelezionati[e].indexOf("Vaso_") == 0)MODELLO.isolaVaso(document.getElementById(pezziSelezionati[e]));
				if(pezziSelezionati[e].indexOf("Osso_") == 0)MODELLO.isolaOsso(document.getElementById(pezziSelezionati[e]));
				if(pezziSelezionati[e].indexOf("Legamento_") == 0)MODELLO.isolaLegamento(document.getElementById(pezziSelezionati[e]));
				if(pezziSelezionati[e].indexOf("Muscolo_") == 0){
					if(globals.modello.muscle3d)MODELLO.isolaMuscolo3d(document.getElementById(pezziSelezionati[e]));
					else MODELLO.isolaArea(document.getElementById(pezziSelezionati[e]));
				}
			}
		}
		
		MODELLO.filtraAnatomia();
		
		if(!smartMenu){
			if(	SCHEDA.classeAperta != 'scheda_A' &&
				SCHEDA.classeAperta != 'scheda_B' ){
					if(!inizio)MENU.visModello(true);
			}else{
				MENU.visModello();
			}
		}
		
		if(globals.set.cartella){
			if(SET)SET._init();
			else{
				let cartella = globals.set.cartella;
				globals.set.cartella = '';
				caricaSet( cartella, globals.set.setSel );
				return;
			}
		}else centro();
		
		nasLoader();
		
		manichinoCaricato=true;
		raycastDisable=false;
		
		MODELLO.op('Pelle',1);
		if(inizio || getVar("demo")){
			if(globals.openMap && globals.mapOpened && !globals.set.cartella){
				postApreSet = true;
				caricaSet(globals.mapOpened,document.getElementById("p_"+globals.mapOpened)); // riapro il set al caricamento
			}
			if(getVar("demo")=='anatomymap'){
				visLoader('');
				MODELLO.swArea();
				setTimeout(function(){
					nasLoader();
				},300);
			}else if(getVar("demo")){
				if(getVar("demo")=='acupointsmap')caricaSet('meridiani_cinesi');
				if(getVar("demo")=='shiatsumap')caricaSet('meridiani_shiatsu');
				if(getVar("demo")=='auriculomap')caricaSet('auricologia');
				if(getVar("demo")=='reflexologymap')caricaSet('reflessologia_plantare');
			}else{
				setTimeout( function(){
					if(!globals.set.cartella)GUIDA.visFumetto("guida_generica");
				}, 1000 );
				
				if(!__(localStorage.firstAccess)){
					localStorage.firstAccess = 'true';
					
					localStorage.areasView = '1';
					localStorage.modelPosition = JSON.stringify({ x: 0, y: -0.7, z: 0 });
					localStorage.modelRotation = JSON.stringify({ x: -0.1, y: 0.9, z: 0 });
					localStorage.modelZoom = '10.5';
					localStorage.opPelle = MENU.getOp("Pelle");
					localStorage.opMuscoli3d = MENU.getOp("Muscoli3d");
					localStorage.opOssa = MENU.getOp("Ossa");
					localStorage.opLegamenti = MENU.getOp("Legamenti");
					localStorage.opVisceri = MENU.getOp("Visceri");
					localStorage.opVasi = MENU.getOp("Vasi");
				}
				let position = JSON.parse(localStorage.modelPosition),
					rotation = JSON.parse(localStorage.modelRotation),
					zoom = parseFloat(localStorage.modelZoom);
				if( (localStorage.areasView == '1' && !areasView) || 
					(localStorage.areasView != '1' && areasView))MODELLO.swArea();
				
				
				if(parseFloat(localStorage.opPelle)<0.2)localStorage.opPelle = 1;
				if(parseFloat(localStorage.opMuscoli3d)<0.2)localStorage.opMuscoli3d = 1;
				if(parseFloat(localStorage.opOssa)<0.2)localStorage.opOssa = 1;
				if(parseFloat(localStorage.opLegamenti)<0.2)localStorage.opLegamenti = 1;
				if(parseFloat(localStorage.opVisceri)<0.2)localStorage.opVisceri = 1;
				if(parseFloat(localStorage.opVasi)<0.2)localStorage.opVasi = 1;
				
				let opPelle = parseFloat(localStorage.opPelle),
					opMuscoli3d = parseFloat(localStorage.opMuscoli3d),
					opOssa = parseFloat(localStorage.opOssa),
					opLegamenti = parseFloat(localStorage.opLegamenti),
					opVisceri = parseFloat(localStorage.opVisceri),
					opVasi = parseFloat(localStorage.opVasi);
				
				panEndZero = { x: 0, y: 0, z: 0 };
				panEnd = position;
				normalizeRotation();
				rotateEnd = rotation;
				zoomEnd = zoom;
				camera.position.set(0,0,22);
				camera.lookAt(camera.position);
				MENU.disBtnCentro();
				MODELLO.op("Vasi",opVasi);
				MODELLO.op("Visceri",opVisceri);
				MODELLO.op("Legamenti",opLegamenti);
				MODELLO.op("Ossa",opOssa);
				MODELLO.op("Muscoli3d",opMuscoli3d);
				MODELLO.op("Pelle",opPelle);
			}
		}
		if(!inizio)zoomEnd = globals.modello.minZoom;

		if(globals.modello.cartella == 'orecchio' && MODELLO.tipoPelle){
			MODELLO.cambiaTipoPelle(''); // metto la pelle chiare se si tratta dell'orecchio
		}
		document.getElementById("pulsanti_modello").classList.add('modelloScelto');
		document.getElementById("contBtnModello").classList.remove("nas");
		inizio = false;
	},
	
	creaPunto: function(){
		let pointBase = new THREE.MeshStandardMaterial( {
			color: 0xCC0000,
			roughness:1,
			transparent: true,
			depthWrite: false
		}),
			geometryPallino = new THREE.SphereGeometry( 0.02, 5, 5 ),
			pallino = new THREE.Mesh( geometryPallino, pointBase );
			pallino.name = 'pallino';
		ANATOMIA.add( pallino );

		let vector = manichinoCont.worldToLocal(MODELLO.posOver);
		pallino.position.set(	vector.x,
								vector.y,
								vector.z);
		
		/* manichinoCont.updateMatrix();
		let matrix = manichinoCont.matrix;
		scene.getObjectByName("pallino").applyMatrix(matrix); */
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
				for(let i in ANATOMIA.children){
					var pass= 0;
					if(MENU.getOp("Muscoli3d") > 0 && ANATOMIA.children[i].name.toLowerCase()=='muscoli3d')pass++;
					if(MENU.getOp("Ossa") > 0 && ANATOMIA.children[i].name.toLowerCase()=='ossa')pass++;
					if(MENU.getOp("Legamenti") > 0 && ANATOMIA.children[i].name.toLowerCase()=='legamenti')pass++;
					if(MENU.getOp("Visceri") > 0 && ANATOMIA.children[i].name.toLowerCase()=='visceri')pass++;
					if(MENU.getOp("Vasi") > 0 && ANATOMIA.children[i].name.toLowerCase()=='vasi')pass++;

					if(MODELLO.editor){
						if(MENU.getOp("Pelle") > 0 && ANATOMIA.children[i].name.toLowerCase()=='pelle')pass++;
					}else{
						if(MENU.getOp("Aree") > 0.6 && areasView && !MODELLO.areaSel)pass = 0;
						if(MENU.getOp("Aree") > 0 && areasView && ANATOMIA.children[i].name.toLowerCase()=='pins_aree')pass++;
						if(MENU.getOp("Pelle") == 1 && !areasView)pass = 0;
						if(ANATOMIA.children[i].name.toLowerCase()=='pelle')pass = 0;
					}
					if(	pass ){
						var intersects = raycaster.intersectObject( ANATOMIA.children[i] );
						if ( intersects.length > 0 ){
							for(l in intersects)ints.push(intersects[l]);
						}
						if(ANATOMIA.children[i].type=='Group'){
							for(let g in ANATOMIA.children[i].children){
								var intersects = raycaster.intersectObject( ANATOMIA.children[i].children[g] );
								if ( intersects.length > 0 ){
									for(l in intersects){
										if(intersects[l].object.name.indexOf("NERVO")==-1 || globals.modello.cartella!='orecchio'){
											ints.push(intersects[l]);
										}
									}
								}
							}
						}
					}
				}
			}
			objOver = null;
			if(ints.length){
				var near = ints[0];
				for(l in ints){
					if(ints[l].distance<near.distance)near=ints[l];
				}
				objOver=near.object;
				MODELLO.posOver=near.point;
			}
			if(objOver){
				var addType = '';
				var pass = true;
				var nome = objOver.name
				var gruppo = scene.getObjectByName( nome ).parent.name;
				if(gruppo == 'Visceri')nome = 'Organo_'+nome;
				if(gruppo == 'Vasi')nome = 'Vaso_'+nome;
				if(gruppo == 'Ossa')nome = 'Osso_'+nome;
				if(gruppo == 'Muscoli3d')nome = 'Muscolo_'+nome;
				if(gruppo == 'Legamenti')nome = 'Legamento_'+nome;
				if(MENU.getOp("Pelle") == 1 && !areasView)pass = false;
				if(MENU.getOp("Aree") > 0.6 && areasView && !MODELLO.areaSel)pass = false;
				
				if(gruppo == 'pins_aree'){				
					nome = nome.replace("PIN_","");		
					nome = nome.replace("_SX","");
					nome = nome.replace("_DX","");
					if(nome.indexOf("_(")){
						pN=nome.split("_(");
						nome = pN[0];
					}
					addType=TXT(""+__(globals.modello.areaName,'Area'))+" ";
					pass=true;
				}
				let nomeTT = nome;
				if(nomeTT.substr(nomeTT.length-3,3)=='_SX')nomeTT = nomeTT.replace("_SX","");
				if(nomeTT.substr(nomeTT.length-3,3)=='_DX')nomeTT = nomeTT.replace("_DX","");
				txtTT = addType+stripslashes(TXT(""+nomeTT));
				// verifico le autorizzazioni
				if((DB.login.data.auths.indexOf("anatomy_full")==-1 || !LOGIN.logedin()) && !globals.AnatomyFREE){
					if(	nome.split("_")[0]!='Osso' ){
						if(	nome.split("_")[0]=='Organo' && 
							nome.substr(7,nome.length-7)!='CUORE' )pass = false;
						if(	nome.split("_")[0]=='Area' && 
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
			if(!ints.length)MODELLO.posOver=null;
			make=true;
		}
		return make;
	},
	_onClick: function(event){
		if(event.button != 0 && !touchable)return;
		if(this.INTERSECTED){
			if(this.INTERSECTED.indexOf("Osso_") > -1)MODELLO.isolaOsso(document.getElementById(this.INTERSECTED),'',true);
			if(this.INTERSECTED.indexOf("Legamento_") > -1)MODELLO.isolaLegamento(document.getElementById(this.INTERSECTED),'',true);
			if(this.INTERSECTED.indexOf("Organo_") > -1)MODELLO.isolaOrgano(document.getElementById(this.INTERSECTED),'',true);
			if(this.INTERSECTED.indexOf("Vaso_") > -1)MODELLO.isolaVaso(document.getElementById(this.INTERSECTED),'',true);
			if(this.INTERSECTED.indexOf("Muscolo_") > -1){
				if(globals.modello.muscles3d)MODELLO.isolaMuscolo3d(document.getElementById(this.INTERSECTED),'',true);
				else MODELLO.isolaArea(document.getElementById(this.INTERSECTED),'',true);
			}
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
	precarArea: function(){
		for(let m=0;m<MODELLO.MAT.materialAree.length;m++){
			let gProvv = new THREE.SphereGeometry( 0.01, 0, 0 ),
				g = new THREE.Mesh( gProvv, MODELLO.MAT.materialAree[m]); 
			g.material.opacity = 0;
			g.name = 'preM'+m;
			g.depthTest = false;
			g.position.y = 1;
			manichino.add( g );
		}
	},
	removePrecarArea: function(){
		for(let m=0;m<MODELLO.MAT.materialAree.length;m++){
			manichino.remove( manichino.getObjectByName('preM'+m) );
		}
	},
	swArea: function( forza=false ){ // cambia la visione pelle/muscoli
		if((forza == '1' && areasView) || (forza == '2' && !areasView))return;
		MODELLO.removePrecarArea();
		areasView=!areasView;
		localStorage.areasView = (areasView) ? '1' : '';
		if(MODELLO.meshPelle.children[0].material.name.indexOf('pelle') > -1 || forza == true){
			// AREE
			for(let n=0;n<MODELLO.meshPelle.children.length;n++){
				MODELLO.meshPelle.children[n].material = MODELLO.MAT.materialAree[n];
				if(SET?.areas50 && areasView){
					MODELLO.meshPelle.children[n].material.color = new THREE.Color( 0.55, 0.52, 0.5 );
					MODELLO.meshPelle.children[n].material.emissive = new THREE.Color( 0.35, 0.35, 0.35 );
				}else{
					MODELLO.meshPelle.children[n].material.color = new THREE.Color( 1, 1, 1 );
					MODELLO.meshPelle.children[n].material.emissive = new THREE.Color( 0, 0, 0 );
				}
			}
			document.getElementById("i_aree").classList.add("btnSel");
			document.getElementById("p_pelle").classList.add("disattLiv");
			document.getElementById("p_liv_pelle").classList.add("disattLiv");
			document.getElementById("p_aree").classList.remove("disattLiv");
			document.getElementById("p_liv_aree").classList.remove("disattLiv");
			document.getElementById("slideAree").classList.add("slideOn");
			MENU.setOp("Aree", MENU.getOp('Aree'));
			MODELLO.op("Aree",MENU.getOp('Aree'));
			if(!SET)this.meshAree.visible = true;
		}else{
			//PELLE
			for(let n=0;n<MODELLO.meshPelle.children.length;n++){
				MODELLO.meshPelle.children[n].material = MODELLO.MAT["materialPelle"+MODELLO.tipoPelle];
			}
			document.getElementById("i_aree").classList.remove("btnSel");
			document.getElementById("p_pelle").classList.remove("disattLiv");
			document.getElementById("p_liv_pelle").classList.remove("disattLiv");
			document.getElementById("p_aree").classList.add("disattLiv");
			document.getElementById("p_liv_aree").classList.add("disattLiv");
			document.getElementById("slideAree").classList.remove("slideOn");
			MENU.setOp("Pelle", MENU.getOp('Pelle'));
			MODELLO.op("Pelle",MENU.getOp('Pelle'));
			this.meshAree.visible = false;
		}
		try{
			SET._setLineMaterials();
		}catch(err){}
		if(!areasView && document.getElementById("fr_aree").className.indexOf("frOpened") > -1){
			MENU.swElAree(true);
		}
		MENU.aggiornaIconeModello();
	},
	
	
	op: function(t,o){ // opacità del livello
		if(manichinoCaricato && eval("MODELLO.mesh"+t)){
			if(MODELLO.isolamento != null)MODELLO.isolamento = null;
			let t2 = t;
			if(t == 'Pelle' || t == 'Aree')MODELLO.opAtt = o;
			if(t == 'Aree'){
				t = 'Pelle';
				MODELLO.MAT.pinArea.opacity = o * 0.8;
				MODELLO.MAT.pinAreaTrasp.opacity = o * 0.3;
				MODELLO.MAT.pinAreaDemo.opacity = o * 0.3;
			}
			let v = o==0 ? 'false' : 'true';
			eval("MODELLO.mesh"+t+".visible="+v);
			for(let n=0;n<eval("MODELLO.mesh"+t+".children.length");n++){
				if( eval("MODELLO.mesh"+t+".children["+n+"].material.name")!='materiale visceri evi' &&
					eval("MODELLO.mesh"+t+".children["+n+"].material.name").indexOf('organoSel')==-1 &&
					eval("MODELLO.mesh"+t+".children["+n+"].material.name")!='organoDis' )eval("MODELLO.mesh"+t+".children[n].material.opacity = o");
			}
			if(t=='Pelle' && o==1 && (!MODELLO.areaSel || !MODELLO.areaAtt)){
				MODELLO.MAT.materialMuscoli3d.visible = false;
				MODELLO.MAT.materialOssa.visible = false;
				MODELLO.MAT.materialLegamenti.visible = false;
				MODELLO.MAT.materialVisceri.visible = false;
				MODELLO.MAT.materialVasi.visible = false;
				MODELLO.MAT.materialOrganoSel.visible = false;
			}else{
				MODELLO.MAT.materialMuscoli3d.visible = true;
				MODELLO.MAT.materialOssa.visible = true;
				MODELLO.MAT.materialLegamenti.visible = true;
				MODELLO.MAT.materialVisceri.visible = true;
				MODELLO.MAT.materialVasi.visible = true;
				MODELLO.MAT.materialOrganoSel.visible = true;
			}
			MENU.setOp(t2, o);
			localStorage["op"+t]=o;
			// gestisco i pins
			if(globals.pezziSelezionati.length){
				let els = document.getElementById("legende").getElementsByTagName("div");
				for(let e=0;e<els.length;e++){
					let idContr = els[e].id;
					if( 
						(
							t2 == 'Aree' && els[e].id.indexOf("Muscolo_") > -1 && o < 0.2
						) || (
							( ( t2 == 'Pelle' && o > 0.95 ) || ( t2 == 'Aree' && o > 0.95 ) ) &&
							( idContr.indexOf("Osso_") > -1 || idContr.indexOf("Organo_") > -1 || idContr.indexOf("Legamento_") > -1 || idContr.indexOf("Area_") > -1 || idContr.indexOf("Vaso_") > -1)
						) || (
							t2 == 'Visceri' && els[e].id.indexOf("Organo_") > -1 && o == 0
					   	) ||(
							t2 == 'Vasi' && els[e].id.indexOf("Vaso_") > -1 && o == 0
						) || (
							t2 == 'Ossa' && els[e].id.indexOf("Osso_") > -1 && o == 0
					   	) || (
							t2 == 'Muscoli3d' && els[e].id.indexOf("Muscolo_") > -1 && o == 0
					   	) || (
							t2 == 'Legamenti' && els[e].id.indexOf("Legamento_") > -1 && o == 0
						) || (
						 	t2 == 'Aree' && els[e].id.indexOf("Muscolo_") > -1 && o == 0
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
		try{
			SET._setLineMaterials();
			SET._applyLineMethod();
		}catch(err){};
	},
	opw: function( event, livello ){
		event.stopPropagation();
		let livAtt = MENU.getOp(livello);
		livAtt = Math.round(livAtt*25) / 25;
		if(typeof(livAtt)=='NaN')livaAtt = 0;
		if(livello=='Aree')MODELLO.swArea(1);
		if(livello=='Pelle')MODELLO.swArea(2);
		if ( event.deltaY > 0 ) {
			if(livAtt-0.04 >= 0)MODELLO.op( livello, livAtt-0.04 );
		} else {
			if(livAtt+0.04 <= 1)MODELLO.op( livello, livAtt+0.04 );
		}
		MENU.aggiornaIconeModello();
	},
	slw: function( event, livello ){
		SLIDER.demolt = 2;
		let sliderDestCont = document.getElementById('s_'+livello),
			sliderDest = sliderDestCont.getElementsByTagName('div')[0],
			modelloAperto = document.getElementById("pulsanti_modello").classList.contains("visSch");
		if(!modelloAperto){
			document.getElementById("pulsanti_modello").style.opacity = 0;
			document.getElementById("pulsanti_modello").classList.add("visSch");
		}
		SLIDER.iniziaSlide(event,sliderDest,true);
		if(!modelloAperto){
			document.getElementById("pulsanti_modello").classList.remove("visSch");
			document.getElementById("pulsanti_modello").style.opacity = 1;
		}
		let x = touchable ? event.touches[ 0 ].pageX : event.clientX,
			y = touchable ? event.touches[ 0 ].pageY : event.clientY,
			w = 0,
			anatomyOp = document.getElementById("pulsanti_modello").classList.contains("visSch");
		
		if(!anatomyOp)document.getElementById("pulsanti_modello").classList.add("visSch");
		w = sliderDestCont.scrollWidth / SLIDER.demolt;
		if(!anatomyOp)document.getElementById("pulsanti_modello").classList.remove("visSch");

		//if(livello=='pelle' || !document.getElementById("el_"+livello).innerHTML)w = 240 / SLIDER.demolt;
		let posSlider = MENU.getOp(livello)*(w - 12),
			posCont = MENU.getOp(livello)*(w - 12) + 17;
		if(smartMenu){
			document.getElementById("sliderAnatomia").style.height = (w+34) + 'px';
		}else{
			document.getElementById("sliderAnatomia").style.width = (w+22) + 'px';
		}
		document.getElementById("sliderAnatomia").classList.add("visSch");
		
		let sliderDiv = document.getElementById("sliderAnatomia").querySelector(".slider"),
			sliderBtn = sliderDiv.getElementsByTagName("div")[0];
		
		if(smartMenu){
			sliderBtn.style.marginTop = (SLIDER.maxVal/SLIDER.demolt-posSlider) + 'px';
			let left = (x - 20);
			if(left<0)left = 0;
			document.getElementById("sliderAnatomia").style.left = left + 'px';
			document.getElementById("sliderAnatomia").style.top = (y - ( SLIDER.maxVal/SLIDER.demolt - posCont)-40) + 'px';
		}else{
			sliderBtn.style.marginLeft = posSlider + 'px';
			document.getElementById("sliderAnatomia").style.left = (x - posCont) + 'px';
			document.getElementById("sliderAnatomia").style.top = (y - 16) + 'px';
		}
		if(livello!='pelle' && livello!='aree'){
			let l = 'Pelle';
			if(areasView)l = 'Aree';
			if(MENU.getOp(l.toLowerCase()) > 0.6){
				MODELLO.op(l,0.6);
			}
		}
	},
	filtraAnatomia: function(){
		let vis = true,
			mat = "MODELLO.MAT.pinAreaTrasp";
		if((DB.login.data.auths.indexOf("anatomy_full")==-1 || !LOGIN.logedin()) && !globals.AnatomyFREE){
			vis = false;
			mat = "MODELLO.MAT.pinAreaDemo";
		}
		
		if(ANATOMIA){
			if(MODELLO.meshVisceri){
				for(let o in MODELLO.meshVisceri.children){
					if(MODELLO.meshVisceri.children[o].name != 'CUORE'){
						MODELLO.meshVisceri.children[o].visible = vis;
					}
				}
			}
			let nArea = -1;
			for(let m in ANATOMIA.children){
				if(__(ANATOMIA.children[m].userData.isMeshAree))nArea = m;
			}	
			if(nArea>-1){
				for(let m in ANATOMIA.children[nArea].children){
					if(ANATOMIA.children[nArea].children[m].name){
						if(ANATOMIA.children[nArea].children[m].name.indexOf("PETTORALE")==-1){
							ANATOMIA.children[nArea].children[m].visible = vis;
							if(ANATOMIA.children[nArea].children[m*1+1])ANATOMIA.children[nArea].children[m*1+1].visible = vis;
						}else{
							ANATOMIA.children[nArea].children[m].material = eval(mat);
						}
					}
				}
			}
		}
		let VI = document.getElementById("el_visceri").getElementsByTagName("p");
		for(let i in VI){
			if(VI[i].id){
				if(!vis && VI[i].id!='Organo_CUORE'){
					VI[i].classList.add("lockedItem");
				}else{
					VI[i].classList.remove("lockedItem");
				}
			}
		}
		let MU = document.getElementById("el_aree").getElementsByTagName("p");
		for(let m in MU){
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
		let els = document.getElementById("legende").getElementsByTagName("div");
		for(let e=0;e<els.length;e++){
			let obj = scene.getObjectByName( els[e].dataset.idObj ),
				pos1 = toScreenPosition2( obj, 0 ),
				pos2 = toScreenPosition2( obj, 1 ),
				centr = true,
				x,
				y;
			
			if(centr){
				// disposizione CENTRATA
				let spY = 0;
				spY = els[e].scrollHeight / 2;
				x = pos2.x - (els[e].scrollWidth / 2);
				y = (pos2.y + spY )- els[e].scrollHeight;
			}else{
				// disposizione LATERALE
				x = pos2.x;
				y = pos2.y - (els[e].scrollHeight / 2 );
				if(pos2.x < pos1.x)x -= els[e].scrollWidth;
			}
			
			els[e].style.left = parseInt(x)+traslStage + 'px';
			els[e].style.top = parseInt(y) + 'px';
		}
	},
	swGuide: function( n, vis, noCentra=false ){
		if(smartMenu){
			MODELLO.popolaSmartMenu(n);
			return;
		}
		if(MODELLO.meshGuide){
			for(let g in MODELLO.meshGuide.children){
				if(MODELLO.meshGuide.children[g].name.indexOf(n) == 0){
					MODELLO.meshGuide.children[g].visible = vis;
					let nome = MODELLO.meshGuide.children[g].name,
						idObj = nome,
						txt = n,
						leg;
					if(nome.indexOf("(") > -1){
						let pNome = nome.split("("),
							pNome2 = pNome[1].split(")");
						nome = pNome2[0];
						txt = nome;
					}
					if(vis){
						// aggiungo le legende
						leg = document.createElement('div');
						leg.id = 'LEG_'+nome;
						leg.dataset.idObj = idObj;
						
						let addTxt = '';
						if(txt.indexOf("_SX") > -1){
							txt = txt.replace("_SX","");
						}
						if(txt.indexOf("_DX") > -1){
							txt = txt.replace("_DX","");
						}
						let html = TXT(""+txt);
						if(addTxt)html += " ("+TXT(""+addTxt)+")";
						leg.innerHTML = stripslashes(html);
						leg.onclick = function(){
							MODELLO.visContextMenu(n,this);
						};
						document.getElementById("legende").appendChild(leg);
						if(typeof(scene.getObjectByName( "centerPoint" )) == 'undefined'){
							if(!noCentra)MODELLO.centraAnatomia(idObj);
						}
					}else{
						leg = document.getElementById('LEG_'+nome);
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
		let txt = '',
			noIsola = true,
			pN = n.split("_"),
			id = leg.id.substr(4,leg.id.length-4);
		if(id.substr(id.length-3,3)=='_SX' || id.substr(id.length-3,3)=='_DX')id=id.substr(0,id.length-3);
		try{
			let els = MODELLO.MAT.masks[ id.substr(id.indexOf("_")+1,id.length-id.indexOf("_")-1) ].masks;
			for(let e=0;e<els.length;e++){
				if(els[e] != '')noIsola=false;
			}
		}catch(error){
			noIsola = false;
		};
		let fnc = pN[0];
		if(fnc=='Muscolo'){
			if(globals.modello.muscles3d)fnc += '3d';
			else fnc = 'Area';
		}
		if(DB_anatomia[id])txt += '<div class="s" onClick="MODELLO.caricaAnatomia(\''+id+'\',true);">'+TXT("ApriScheda")+'</div>';
		txt += '<div class="c" onClick="MODELLO.centraAnatomia(\''+leg.dataset.idObj+'\');">'+TXT("CentraDaQui")+'</div>';
		let isola = 'MODELLO.isola'+fnc+'(document.getElementById(\''+n+'\'))';
		txt += '<div class="d" onClick="'+isola+';">'+TXT("Deseleziona")+'</div>';
		if(globals.pezziSelezionati.length > 1)txt += '<div class="a" onClick="MENU.chiudiAllSelected();'+isola+';">'+TXT("DeselezionaAltri")+'</div>';
		if(MODELLO.isolamento == null && !noIsola)txt += '<div class="i" onClick="MENU.chiudiAllSelected();'+isola+';MODELLO.isolaAnatomia(\''+fnc+'\',\''+leg.dataset.idObj+'\');">'+TXT("Isola")+'</div>';
		let x = tCoord(leg);
		document.getElementById("context_menu").classList.add("tooltipVis");
		document.getElementById("context_menu").innerHTML=txt;
		if(x + document.getElementById("context_menu").scrollWidth > WF())x = WF() - document.getElementById("context_menu").scrollWidth;
		if(x < 0)x = 0;
		document.getElementById("context_menu").style.left=x+'px';
		document.getElementById("context_menu").style.top=(tCoord(leg,"y")+leg.scrollHeight)+'px';
		window.addEventListener("mouseup", MODELLO.nasContextMenu, false);
		MODELLO.contextOpened = true;
	},
	popolaSmartMenu: function(n){ //  visualizza il menu contestuale dell'anatomia per smart
		if(noAnimate)return;
		let txt = '',
			pN = n.split("_"),
			noIsola = true;
		try{
			let els = MODELLO.MAT.masks[ n.substr(n.indexOf("_")+1,n.length-n.indexOf("_")-1) ].masks;
			for(let e=0;e<els.length;e++){
				if(els[e] != '')noIsola=false;
			}
		}catch(error){
			noIsola = false;
		};
		let fnc = pN[0];
		if(fnc=='Muscolo'){
			if(globals.modello.muscles3d)fnc += '3d';
			else fnc = 'Area';
		}
		//txt += '<span class="s_'+pN[0]+'">'+TXT(n)+'</span>';
		txt += '<div id="cont_scheda_anatomia"></div>';
		txt += '<div class="btns_anatomia">';
		let isola = 'MODELLO.isola'+fnc+'(document.getElementById(\''+n+'\'))';
		//if(DB_anatomia[n])txt += '<div class="s" onClick="MODELLO.caricaAnatomiaSmart(\''+n+'\');">'+TXT("ApriScheda")+'</div>';
		txt += '<div class="d" onClick="'+isola+';document.getElementById(\'btnsModello\').innerHTML=\'\';document.getElementById(\'btnsModello\').classList.remove(\'vis\');document.getElementById(\'pulsanti_modello\').classList.remove(\'schedaOpened\');document.getElementById(\'pulsanti_modello\').classList.remove(\'schedaVuota\');">'+TXT("Deseleziona")+'</div>';
		//if(MODELLO.isolamento == null && !noIsola)
		txt += '<div class="i" id="btnIsola" onClick="MODELLO.swIsolaAnatomia(\''+fnc+'\',\''+n+'\');">'+TXT("Isola")+'</div>';
		txt += '</div>';
		document.getElementById("btnsModello").innerHTML=txt;
		document.getElementById("btnsModello").classList.add("vis");
		document.getElementById("label_modello_smart").innerHTML=TXT(n);
		document.getElementById("label_modello_smart").className = 's_'+pN[0];
		//document.getElementById("livelli_cont").querySelector(".frOpened")?.click();
		MODELLO.caricaAnatomiaSmart(n);
		let el = null,
			els = ANATOMIA.getObjectByName("GUIDE").children;
		for(e in els){
			if(els[e].name.indexOf(globals.pezziSelezionati[0])>-1 && !el)el = els[e].name;
		}
		if(el)MODELLO.centraAnatomia(el);
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
	caricaAnatomiaSmart: function( n, forza=false ){
		if(document.getElementById("pulsanti_modello").classList.contains("schedaOpened") || forza){
			document.getElementById("pulsanti_modello").classList.remove("schedaOpened");
			document.getElementById("pulsanti_modello").classList.remove("schedaVuota");
			document.getElementById("cont_scheda_anatomia").innerHTML='';
			return;
		}
		raycastDisable = false;
		document.getElementById("pulsanti_modello").classList.add("schedaOpened");
		if(!__(DB_anatomia[n]?.Descrizione)){
			document.getElementById("cont_scheda_anatomia").innerHTML='';
			document.getElementById("pulsanti_modello").classList.add("schedaVuota");
		}else{
			document.getElementById("cont_scheda_anatomia").innerHTML=DB_anatomia[n].Descrizione;
		}
	},
	caricaAnatomia: function( n, espansa ){
		let titolo = DB_anatomia[n].Titolo,
			html = '<div class="descrAnatomia';
		if(!__(DB_anatomia[n].baseImg,false))html += ' noBaseImg';
		html += '"><h1>'+titolo+'</h1>'+DB_anatomia[n].Descrizione+'</div>';
		// dettaglio
		if(__(DB_anatomia[n].baseImg,false)){
			let im = n;
			if(typeof(DB_anatomia[n].baseImg)=='string')im = DB_anatomia[n].baseImg;
			html += '<div class="dettaglioAnatomia" style="background-image:url(img/anatomia/'+im+'.jpg)"><img src="img/anatomia/'+im+'.jpg"></div>';
		}
		raycastDisable = false;
		
		let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'models.anatomy\')">' +
							TXT("ReferenceGuide") +
						'</div>';
						
		SCHEDA.caricaScheda(	titolo,
								html,
								"",
								"tab_anatomia", 
								false, 
								espansa,
								'',
								btnAdd,
								'anatomy_'+n );
		MODELLO.schSel = n;
	},
	centraAnatomia: function(name){
		let pt = scene.getObjectByName( name ).geometry.attributes.position.array;
		MENU.attBtnCentro();
		panEndZero = { x: 0-pt[0], y: 0-pt[1], z: 0-pt[2] };
		panEnd = { x: 0, y: 0, z: 0 };
		if(manichinoCont.position.z<15)zoomEnd = 15;
		normalizeRotation();
		
		let g = new THREE.SphereGeometry( 0.02, 1, 1 ),
			p = new THREE.Mesh( g, MODELLO.MAT.pointTrasp );
		p.position.set(pt[0],pt[1],pt[2]);
		p.name='centerPoint';
		p.userData = { "obj": name };
		manichino.add( p );
		raycastDisable = false;
	},
	swIsolaAnatomia: function(tipo,idObj){
		if(!MODELLO.isolamento){
			MODELLO.isolaAnatomia(tipo,idObj);
			document.getElementById("btnIsola").classList.add("flag");
		}else{
			var exMI = clone(MODELLO.isolamento);
			if(exMI.Visceri!=NaN)MODELLO.op('Visceri',exMI.Visceri);
			if(exMI.Vasi!=NaN)MODELLO.op('Vasi',exMI.Vasi);
			if(exMI.Ossa!=NaN)MODELLO.op('Ossa',exMI.Ossa);
			if(exMI.Muscoli3D!=NaN)MODELLO.op('Muscoli3d',exMI.Muscoli3D);
			if(exMI.Legamenti!=NaN)MODELLO.op('Pelle',exMI.Legamenti);
			if(exMI.Pelle!=NaN)MODELLO.op('Pelle',exMI.Pelle);
			document.getElementById("btnIsola").classList.remove("flag");
		}
	},
	isolaAnatomia: function(tipo,idObj){
		let opVisceri = MENU.getOp('Visceri'),
			opVasi = MENU.getOp('Vasi'),
			opOssa = MENU.getOp('Ossa'),
			opMuscoli3d = MENU.getOp('Muscoli3d'),
			opLegamenti = MENU.getOp('Legamenti'),
			opPelle = MENU.getOp('Pelle');
		MODELLO.op('Visceri',0.05);
		MODELLO.op('Vasi',0.05);
		MODELLO.op('Ossa',0.05);
		MODELLO.op('Muscoli3d',0.05);
		MODELLO.op('Legamenti',0.05);
		if(!areasView || tipo != 'Area')MODELLO.op('Pelle',0.05);
		else MODELLO.op('Pelle',1);
		MODELLO.isolamento = {
			"idObj": idObj,
			"Visceri": opVisceri,
			"Vasi": opVasi,
			"Ossa": opOssa,
			"Muscoli3d": opMuscoli3d,
			"Legamenti": opLegamenti,
			"Pelle": opPelle,
			"areasView": areasView
		};
	},
	annullaIsolamento: function(){
		if(typeof(scene.getObjectByName( "centerPoint" )) != 'undefined'){ // ricentro il manichino
			let exPt = scene.getObjectByName( "centerPoint" );
			
			// ricentro il manichino
			exPt.updateMatrixWorld();
			let vector = exPt.geometry.vertices[3].clone();
			vector.applyMatrix4( exPt.matrixWorld );
			manichino.position.set( 0, 0, 0 );
			
			render();
			exPt.updateMatrixWorld();
			let vector2 = exPt.geometry.vertices[3].clone();
			vector2.applyMatrix4( exPt.matrixWorld );
			manichinoCont.position.x = manichinoCont.position.x - (vector2.x-vector.x);
			manichinoCont.position.y = manichinoCont.position.y - (vector2.y-vector.y);
			manichinoCont.position.z = manichinoCont.position.z - (vector2.z-vector.z);
			render();
			manichino.remove( exPt );
		}
		if(MODELLO.isolamento == null)return;
		let opVisceri = MODELLO.isolamento.Visceri,
			opVasi = MODELLO.isolamento.Vasi,
			opOssa = MODELLO.isolamento.Ossa,
			opMuscoli3d = MODELLO.isolamento.Muscoli3d,
			opLegamenti = MODELLO.isolamento.Legamenti,
			opPelle = MODELLO.isolamento.Pelle;
		if(!areasView && MODELLO.isolamento.areasView)MODELLO.swArea();
		MODELLO.isolamento = null;
		MODELLO.op('Visceri', opVisceri);
		MODELLO.op('Vasi', opVasi);
		MODELLO.op('Ossa', opOssa);
		MODELLO.op('Muscoli3d', opMuscoli3d);
		MODELLO.op('Legamenti', opLegamenti);
		MODELLO.op('Pelle', opPelle);
	},
	eviPin: function( n, vis ){
		for(let g in MODELLO.meshGuide.children){
			if(MODELLO.meshGuide.children[g].name.indexOf(n) == 0){
				MODELLO.meshGuide.children[g].visible = vis;
				
				let nome = MODELLO.meshGuide.children[g].name,
					txt = n;
				if(nome.indexOf("(") > -1){
					let pNome = nome.split("("),
						pNome2 = pNome[1].split(")");
					nome = pNome2[0];
					txt = nome;
				}
				
			}
		}
	},
	swPins: function(){
		if(!smartMenu){
			document.getElementById("legende").classList.toggle("nasPins");
			document.getElementById("p_pins").classList.toggle("pinsNo");
			MODELLO.meshGuide.visible = !MODELLO.meshGuide.visible;
		}
	},

	isolaOrgano: function( el, modo='', noCentra=false ){
		if(smartMenu && globals.pezziSelezionati.length && el.id!=globals.pezziSelezionati[0]){
			MODELLO.caricaAnatomiaSmart(el.id,true);
			document.getElementById(globals.pezziSelezionati[0]).click();
		}
		if(smartMenu && !document.getElementById("pulsanti_modello").classList.contains("visSch"))MENU.visModello();
		if(!modo)MODELLO.annullaIsolamento();
		let organo = el.id.replace("Organo_","");
		if(MODELLO.open_x_translate && !modo){try{MODELLO.caricaAnatomia(el.id,true);}catch(err){}};

		// verifico le autorizzazioni
		if((DB.login.data.auths.indexOf("anatomy_full")==-1 || !LOGIN.logedin()) && !globals.AnatomyFREE){
			if(	organo != 'CUORE' ){
				if(!modo)ALERT(TXT("MsgNoAnatomy"));
				return;
			}
		}
		// --------------------------
		
		for(let n=0;n<MODELLO.meshVisceri.children.length;n++){
			if(MODELLO.meshVisceri.children[n].name == organo){
				if(MODELLO.meshVisceri.children[n].material.name != 'organoSel'){
					if(modo == 'over'){
						MODELLO.meshVisceri.children[n].material = MODELLO.MAT.materialVisceriOver;
					}else if(modo == 'out'){
						let mat = MODELLO.MAT.materialVisceri;
						if(eval("MODELLO.MAT.material"+MODELLO.meshVisceri.children[n].name)){
							mat = eval("MODELLO.MAT.material"+MODELLO.meshVisceri.children[n].name);
						}
						MODELLO.meshVisceri.children[n].material = mat;
					}else{
						MODELLO.meshVisceri.children[n].material = MODELLO.MAT.materialOrganoSel;
						let t = 'Pelle';
						if(areasView)t = 'Aree';
						if(MENU.getOp(t) > 0.8){
							if(MODELLO.areaSel)MODELLO.op(t,0.95);
							else MODELLO.op(t,0.4);
							MENU.aggiornaIconeModello();
						}
						MENU.addSelected(el,'V');
						MODELLO.swGuide("Organo_"+organo,true, noCentra);
						if(WF() < 600)MENU.chiudiMenu();
					}
				}else if(!modo){
					let mat = eval("MODELLO.MAT.materialVisceri"+MODELLO.meshVisceri.children[n].userData.matAdd);
					if(eval("MODELLO.MAT.material"+MODELLO.meshVisceri.children[n].name)){
						mat = eval("MODELLO.MAT.material"+MODELLO.meshVisceri.children[n].name);
					}
					MODELLO.meshVisceri.children[n].material = mat;
					MENU.removeSelected(el);
					MODELLO.swGuide("Organo_"+organo,false);
					if(el.id == MODELLO.schSel)SCHEDA.scaricaScheda();
					overInterfaccia = false;
				}
			}
		}
		if(!modo)el.classList.toggle("p_viscSel");
		MENU.verSelected();
	},

	isolaVaso: function( el, modo='', noCentra=false ){
		if(smartMenu && globals.pezziSelezionati.length && el.id!=globals.pezziSelezionati[0]){
			MODELLO.caricaAnatomiaSmart(el.id,true);
			document.getElementById(globals.pezziSelezionati[0]).click();
		}
		if(smartMenu && !document.getElementById("pulsanti_modello").classList.contains("visSch"))MENU.visModello();
		if(!modo)MODELLO.annullaIsolamento();
		let vaso = el.id.replace("Vaso_","");
		if(MODELLO.open_x_translate && !modo){try{MODELLO.caricaAnatomia(el.id,true);}catch(err){}};
		
		for(let n=0;n<MODELLO.meshVasi.children.length;n++){
			if(MODELLO.meshVasi.children[n].name == vaso){
				if(MODELLO.meshVasi.children[n].material.name != 'organoSel'){
					if(modo == 'over'){
						MODELLO.meshVasi.children[n].material = MODELLO.MAT.materialVasiOver;
					}else if(modo == 'out'){
						let mat = MODELLO.MAT.materialVasi;
						if(eval("MODELLO.MAT.material"+MODELLO.meshVasi.children[n].name)){
							mat = eval("MODELLO.MAT.material"+MODELLO.meshVasi.children[n].name);
						}
						MODELLO.meshVasi.children[n].material = mat;
					}else{
						MODELLO.meshVasi.children[n].material = MODELLO.MAT.materialOrganoSel;
						let t = 'Pelle';
						if(areasView)t = 'Aree';
						if(MENU.getOp(t) > 0.8){
							if(MODELLO.areaSel)MODELLO.op(t,0.95);
							else MODELLO.op(t,0.4);
							MENU.aggiornaIconeModello();
						}
						MENU.addSelected(el,'V');
						MODELLO.swGuide("Vaso_"+vaso,true, noCentra);
						if(WF() < 600)MENU.chiudiMenu();
					}
				}else if(!modo){
					let mat = eval("MODELLO.MAT.materialVasi"+MODELLO.meshVasi.children[n].userData.matAdd);
					if(eval("MODELLO.MAT.material"+MODELLO.meshVasi.children[n].name)){
						mat = eval("MODELLO.MAT.material"+MODELLO.meshVasi.children[n].name);
					}
					MODELLO.meshVasi.children[n].material = mat;
					MENU.removeSelected(el);
					MODELLO.swGuide("Vaso_"+vaso,false);
					if(el.id == MODELLO.schSel)SCHEDA.scaricaScheda();
					overInterfaccia = false;
				}
			}
		}
		if(!modo)el.classList.toggle("p_viscSel");
		MENU.verSelected();
	},
	
	isolaOsso: function( el, modo='', noCentra=false ){
		if(smartMenu && globals.pezziSelezionati.length && el.id!=globals.pezziSelezionati[0]){
			MODELLO.caricaAnatomiaSmart(el.id,true);
			document.getElementById(globals.pezziSelezionati[0]).click();
		}
		if(smartMenu && !document.getElementById("pulsanti_modello").classList.contains("visSch"))MENU.visModello();
		if(!modo)MODELLO.annullaIsolamento();
		let osso = el.id.replace("Osso_","");
		if(MODELLO.open_x_translate && !modo){try{MODELLO.caricaAnatomia(el.id,true);}catch(err){}};
		
		for(let n=0;n<MODELLO.meshOssa.children.length;n++){
			if(MODELLO.meshOssa.children[n].name == osso){
				if(MODELLO.meshOssa.children[n].material.name != 'organoSel'){
					if(modo == 'over'){
						MODELLO.meshOssa.children[n].material = eval("MODELLO.MAT.materialOssaOver"+MODELLO.meshOssa.children[n].userData.matAdd);
					}else if(modo == 'out'){
						MODELLO.meshOssa.children[n].material = eval("MODELLO.MAT.materialOssa"+MODELLO.meshOssa.children[n].userData.matAdd);
					}else{
						MODELLO.meshOssa.children[n].material = MODELLO.MAT.materialOrganoSel;
						let t = 'Pelle';
						if(areasView)t = 'Aree';
						if(MENU.getOp(t) > 0.8){
							if(MODELLO.areaSel)MODELLO.op(t,0.95);
							else MODELLO.op(t,0.4);
							MENU.aggiornaIconeModello();
						}
						MENU.addSelected(el,'O');
						MODELLO.swGuide("Osso_"+osso,true, noCentra);
						if(WF() < 600)MENU.chiudiMenu();
					}
				}else if(!modo){
					MODELLO.meshOssa.children[n].material = eval("MODELLO.MAT.materialOssa"+MODELLO.meshOssa.children[n].userData.matAdd);
					MENU.removeSelected(el);
					MODELLO.swGuide("Osso_"+osso,false);
					if(el.id == MODELLO.schSel)SCHEDA.scaricaScheda();
				}
			}
		}
		if(!modo)el.classList.toggle("p_ossaSel");
		MENU.verSelected();
	},

	isolaMuscolo3d: function( el, modo='', noCentra=false ){
		if(smartMenu && globals.pezziSelezionati.length && el.id!=globals.pezziSelezionati[0]){
			MODELLO.caricaAnatomiaSmart(el.id,true);
			document.getElementById(globals.pezziSelezionati[0]).click();
		}
		if(smartMenu && !document.getElementById("pulsanti_modello").classList.contains("visSch"))MENU.visModello();
		if(!modo)MODELLO.annullaIsolamento();
		let muscolo3d = el.id.replace("Muscolo_","");
		if(MODELLO.open_x_translate && !modo){try{MODELLO.caricaAnatomia(el.id,true);}catch(err){}};
		
		for(let n=0;n<MODELLO.meshMuscoli3d.children.length;n++){
			if(MODELLO.meshMuscoli3d.children[n].name == muscolo3d){
				if(MODELLO.meshMuscoli3d.children[n].material.name != 'organoSel'+MODELLO.meshMuscoli3d.children[n].userData.matAdd){
					if(modo == 'over'){
						MODELLO.meshMuscoli3d.children[n].material = eval("MODELLO.MAT.materialMuscoli3dOver"+MODELLO.meshMuscoli3d.children[n].userData.matAdd);
					}else if(modo == 'out'){
						MODELLO.meshMuscoli3d.children[n].material = eval("MODELLO.MAT.materialMuscoli3d"+MODELLO.meshMuscoli3d.children[n].userData.matAdd);
					}else{
						MODELLO.meshMuscoli3d.children[n].material = eval("MODELLO.MAT.materialMuscoli3dSel"+MODELLO.meshMuscoli3d.children[n].userData.matAdd);
						let t = 'Pelle';
						if(areasView)t = 'Aree';
						if(MENU.getOp(t) > 0.8){
							if(MODELLO.areaSel)MODELLO.op(t,0.95);
							else MODELLO.op(t,0.4);
							MENU.aggiornaIconeModello();
						}
						MENU.addSelected(el,'M');
						MODELLO.swGuide("Muscolo_"+muscolo3d,true, noCentra);
						if(WF() < 600)MENU.chiudiMenu();
					}
				}else if(!modo){
					MODELLO.meshMuscoli3d.children[n].material = eval("MODELLO.MAT.materialMuscoli3d"+MODELLO.meshMuscoli3d.children[n].userData.matAdd);
					MENU.removeSelected(el);
					MODELLO.swGuide("Muscolo_"+muscolo3d,false);
					if(el.id == MODELLO.schSel)SCHEDA.scaricaScheda();
					if(!globals.pezziSelezionati.length){
						overInterfaccia = false;
						raycastDisable = false;
					}
				}
			}
		}
		if(!modo)el.classList.toggle("p_muscoli3dSel");
		MENU.verSelected();
	},
	
	isolaLegamento: function( el, modo='', noCentra=false ){
		if(smartMenu && globals.pezziSelezionati.length && el.id!=globals.pezziSelezionati[0]){
			MODELLO.caricaAnatomiaSmart(el.id,true);
			document.getElementById(globals.pezziSelezionati[0]).click();
		}
		if(smartMenu && !document.getElementById("pulsanti_modello").classList.contains("visSch"))MENU.visModello();
		if(!modo)MODELLO.annullaIsolamento();
		let legamento = el.id.replace("Legamento_","");
		if(MODELLO.open_x_translate && !modo){try{MODELLO.caricaAnatomia(el.id,true);}catch(err){}};
		
		for(let n=0;n<MODELLO.meshLegamenti.children.length;n++){
			if(MODELLO.meshLegamenti.children[n].name == legamento){
				if(MODELLO.meshLegamenti.children[n].material.name != 'organoSel'){
					if(modo == 'over'){
						MODELLO.meshLegamenti.children[n].material = eval("MODELLO.MAT.materialLegamentiOver"+MODELLO.meshLegamenti.children[n].userData.matAdd);
					}else if(modo == 'out'){
						MODELLO.meshLegamenti.children[n].material = eval("MODELLO.MAT.materialLegamenti"+MODELLO.meshLegamenti.children[n].userData.matAdd);
					}else{
						MODELLO.meshLegamenti.children[n].material = MODELLO.MAT.materialOrganoSel;
						let t = 'Pelle';
						if(areasView)t = 'Aree';
						if(MENU.getOp(t) > 0.8){
							if(MODELLO.areaSel)MODELLO.op(t,0.95);
							else MODELLO.op(t,0.4);
							MENU.aggiornaIconeModello();
						}
						MENU.addSelected(el,'L');
						MODELLO.swGuide("Legamento_"+legamento,true, noCentra);
						if(WF() < 600)MENU.chiudiMenu();
					}
				}else if(!modo){
					MODELLO.meshLegamenti.children[n].material = eval("MODELLO.MAT.materialLegamenti"+MODELLO.meshLegamenti.children[n].userData.matAdd);
					MENU.removeSelected(el);
					MODELLO.swGuide("Legamento_"+legamento,false);
					if(el.id == MODELLO.schSel)SCHEDA.scaricaScheda();
				}
			}
		}
		if(!modo)el.classList.toggle("p_legamentiSel");
		MENU.verSelected();
	},
	
	isolaArea: function( el, modo='', noCentra=false ){
		if(smartMenu && globals.pezziSelezionati.length && el.id!=globals.pezziSelezionati[0]){
			MODELLO.caricaAnatomiaSmart(el.id,true);
			document.getElementById(globals.pezziSelezionati[0]).click();
		}
		if(smartMenu && !document.getElementById("pulsanti_modello").classList.contains("visSch"))MENU.visModello();
		if(!areasView || MENU.wheeling || this.areaBlock)return;
		MODELLO.areaAtt = el;
		if(!modo)MODELLO.annullaIsolamento();
		if(!modo)visLoader('');
		if(modo == 'out'){
			if(!MODELLO.areaSel){
				MODELLO.tutteAree();
				return;
			}
		}
		let area = '',
			desel = false;
		if(el.id)area = el.id.replace("Muscolo_","");
		if(MODELLO.open_x_translate && !modo){try{MODELLO.caricaAnatomia(el.id,true);}catch(err){}};
		
		// verifico le autorizzazioni
		if((DB.login.data.auths.indexOf("anatomy_full")==-1 || !LOGIN.logedin()) && !globals.AnatomyFREE){
			if(	area != 'PETTORALE' ){
				if(!modo)ALERT(TXT("MsgNoAnatomy"));
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
		for(let m=0;m<MODELLO.MAT.materialAree.length;m++){
			let IMG = '';
			if(area){
				IMG = decomprA(MODELLO.MAT.masks[area].masks[m]);
				if(!modo && m==0){
					if(!desel)MODELLO.swGuide("Muscolo_"+area,true, noCentra);
					else MODELLO.swGuide("Muscolo_"+area,false);
				}
			}
			if(!IMG)IMG = decomprA(MODELLO.MAT.maskVuota);
			IMG = 'data:image/jpeg;base64,' + IMG;
			if(!modo)MODELLO.areaBlock = MODELLO.MAT.materialAree.length;
			if(!desel)MODELLO.mergeImages( m, IMG, modo, el );
			else MODELLO.diffImages( m, IMG, modo, el );
		}
		if(!modo){
			if(!desel){
				MENU.addSelected(el,'M');
				el.classList.toggle("p_viscSel");
			}else{
				MENU.removeSelected(el);
				if(el.id == MODELLO.schSel)SCHEDA.scaricaScheda();
			}
			MODELLO.areaSel = false;
			for(let m in globals.pezziSelezionati){
				if(globals.pezziSelezionati[m].indexOf("Muscolo_") > -1)MODELLO.areaSel = true;
			}
		}
		MODELLO.op("Aree",1);
		MENU.verSelected();
		MODELLO.verOpArea();
	},
	verOpArea: function(){
		if(SET?.areas50 && areasView){
			for(let n=0;n<MODELLO.meshPelle.children.length;n++){
				if(!MODELLO.areaSel){
					MODELLO.meshPelle.children[n].material.color = new THREE.Color( 0.55, 0.52, 0.5 );
					MODELLO.meshPelle.children[n].material.emissive = new THREE.Color( 0.35, 0.35, 0.35 );
				}else{
					MODELLO.meshPelle.children[n].material.color = new THREE.Color( 1, 1, 1 );
					MODELLO.meshPelle.children[n].material.emissive = new THREE.Color( 0, 0, 0 );
				}
			}
		}
	},
	tutteAree: function(){
		for(let m=0;m<MODELLO.MAT.materialAree.length;m++){
			MODELLO.MAT.materialAree[m].alphaMap = null;
			MODELLO.meshPelle.children[m].material.alphaMap = null;
			MODELLO.meshPelle.children[m].material.needsUpdate = true;
			MODELLO.imgsAtt[m] = null;
		}
		if(MODELLO.areaSel){
			let tot = globals.pezziSelezionati.length,
				n=-1;
			for(let m=0;m<tot;m++){
				n++;
				if(globals.pezziSelezionati[0].indexOf("Muscolo_") > -1){
					MODELLO.swGuide(globals.pezziSelezionati[n],false);
					MENU.removeSelected(document.getElementById(globals.pezziSelezionati[n]));
					n--;
					if(WF() < 600)MENU.chiudiMenu();
				}
			}
			MODELLO.areaSel = false;
			MODELLO.areaAtt = null;
		}
		MENU.verSelected();
	},
	mergeImages: function( m, IMG, modo, el, globalCompositeOperation = 'lighten' ){
		let i2 = MODELLO.imgsAtt[m];
		if(!i2)MODELLO.setAlphaMap( m, IMG, modo ); // se non c'era ancora alphaMap
		else{ // se devo fondere le mappe alpha
			if(!modo || modo == 'over'){
				let c=document.createElement("canvas");
				c.width = 1024;
				c.height = 1024;
				let ctx=c.getContext("2d");
				ctx.globalCompositeOperation = globalCompositeOperation;
				let imageObj1 = new Image();
				imageObj1.src = IMG;
				let imageObj2 = new Image();
				imageObj1.onload = function() {
				   ctx.drawImage(imageObj1, 0, 0, 1024, 1024);
				   imageObj2.src = i2;
				   imageObj2.onload = function() {
					  ctx.drawImage(imageObj2, 0, 0, 1024, 1024);
					  if(MODELLO.areaAtt == el)MODELLO.setAlphaMap( m, c.toDataURL("image/jpeg"), modo );
				   }
				}
			}else MODELLO.setAlphaMap( m, i2, modo );
		}
	},
	setAlphaMap: function( m, IMG, modo ){
		let imgs = Array();
		imgs[m] = new Image();
		imgs[m].src =  IMG;
		if(!modo)MODELLO.imgsAtt[m] = IMG;
		else MODELLO.imgsProvv[m] = IMG;
		MODELLO.MAT.mask[m] = new THREE.Texture();
		MODELLO.MAT.mask[m].image = imgs[m];
		imgs[m].n = m;
		imgs[m].onload = function() {
			let m = this.n;
			try{
				MODELLO.MAT.mask[m].needsUpdate = true;
				MODELLO.MAT.materialAree[m].alphaMap = MODELLO.MAT.mask[m];
				MODELLO.meshPelle.children[m].material.alphaMap = MODELLO.MAT.mask[m];
				MODELLO.meshPelle.children[m].material.needsUpdate = true;
				if(!modo){
					MODELLO.areaBlock --;
					if(!MODELLO.areaBlock)nasLoader();
					if(!MODELLO.areaSel)MODELLO.tutteAree();
				}
			} catch(err){};
		};
	},
	diffImages: function( m, IMG, modo, el ){
		let c=document.createElement("canvas");
		c.width = 1024;
		c.height = 1024;
				
		let ctx = c.getContext("2d"),
			img = new Image();
		img.src = IMG;
		
		img.onload = function() {
			ctx.drawImage(img, 0, 0, 1024, 1024);
			let imgData = ctx.getImageData(0, 0, c.width, c.height);
			for (let i = 0; i < imgData.data.length; i += 4) {
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
		SCHEDA.scaricaScheda();
		MENU.chiudiAllSelected();
		let tipoAnat = '';
		if(tipo == 'Osso')tipoAnat = 'ossa';
		if(tipo == 'Muscolo')tipoAnat = 'muscoli3d';
		if(tipo == 'Legamento')tipoAnat = 'legamenti';
		if(tipo == 'Organo')tipoAnat = 'visceri';
		if(tipo == 'Vaso')tipoAnat = 'vasi';
		if(tipo == 'area'){
			tipoAnat = 'aree';
			tipo = 'Muscolo';
			if(MODELLO.meshPelle.children[0].material.name.indexOf('pelle') > -1)MODELLO.swArea(true);
		}
		if(globals.pezziSelezionati.indexOf(ELEM) == -1){
			document.getElementById("el_"+tipoAnat+"_cont").getElementsByTagName("p")[tipo+"_"+ELEM].click();
		}
		RICERCHE.historyGlobal();
	},
	cambiaTipoPelle: function( tipo ){
		if(globals.modello.cartella == 'orecchio' && tipo){
			ALERT(TXT("NoCambioPelle"));
			return;
		}
		MODELLO.tipoPelle = tipo;
		localStorage.tipoPelle = tipo;
		let els = document.getElementById("skinSel").getElementsByTagName("span");
		for(let i = 0; i<els.length; i++){
			els[i].classList.remove("cSel");
		}
		if(localStorage.tipoPelle == '')els[0].classList.add("cSel");
		if(localStorage.tipoPelle == '_mulatta')els[1].classList.add("cSel");
		if(localStorage.tipoPelle == '_nera')els[2].classList.add("cSel");
		if(globals.modello.cartella){
			for(let p in scene.getObjectByName('PELLE').children){
				scene.getObjectByName('PELLE').children[p].material = MODELLO.MAT["materialPelle"+MODELLO.tipoPelle];
			}
		}
	}
	
};

