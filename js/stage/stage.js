
var camera, scene, renderer,
	manichino, ANATOMIA, SETS,
	SET = null,
	obj_guide = null,
	obj_guide_fisse = null,
	mouse, raycaster, mouse_lb,
	manichinoCaricato=false,
	clock = new THREE.Clock(),
	smothingView = true,
	raycastDisable = false,
	areasView = false,
	jss = [],
	elAtt = null,
	overLegenda = false,
	overInterfaccia = false,
	rotateEnd=panEnd=panEndZero=zoomEnd=null,
	rotateStart=panStart=panStartZero=zoomStart=null,
	noAnimate = true,
	postApreSet = false,
	ctrl_pressed = false,
	ctrl_fixed = false,
	inizio = true;


function init() {
	if(typeof(localStorage.colore)=='undefined')localStorage.colore = 1;//2;
	if(typeof(localStorage.fondino)=='undefined')localStorage.fondino = 'rachide';
	if(typeof(localStorage.textSize)=='undefined')localStorage.textSize = '';
	if(typeof(localStorage.tipoPelle)=='undefined')localStorage.tipoPelle = '';

	selCol(localStorage.colore);
	selSf(localStorage.fondino);
	// SCENE
	scene = new THREE.Scene();
	scene.userData.BGcolorPrint = new THREE.Color( 0xffffff );
	document.body.classList.add("bodyStyled"+localStorage.colore);
	document.body.classList.add("sf_"+localStorage.fondino);
	scene.background = null;
	
	// CAMERA
	camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 100 );
	camera.position.set( 0, 0, 22 );
	camera.lookAt(camera.position);
	
	// LUCE AMBIENTE
	let ambientLight = new THREE.AmbientLight( 0xffffff, 0.6 );
	scene.add( ambientLight );
	
	// LUCE SULLA CAMERA
	let pointLight = new THREE.PointLight( 0xffffff, 0.3 );
	scene.add( camera );
	camera.add( pointLight );
	
	// LUCE 1 (verticale dall'alto)
	let directionalLight1 = new THREE.DirectionalLight( 0xffffff, 0.3 );
	directionalLight1.position.set( 17, 9, 30 );
	scene.add( directionalLight1 );
	
	// LUCE 2 (destra)
	let directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.3 );
	directionalLight2.position.set( 20, 1, 0 );
	scene.add( directionalLight2 );
	
	// LUCE 3 (sinistra)
	let directionalLight3 = new THREE.DirectionalLight( 0xffffff, 0.4 );
	directionalLight3.position.set( -100, 9, 30 );
	scene.add( directionalLight3 );
	
	if(!isTablet){
		// LUCE 4 (posteriore sinistra)
		directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
		directionalLight.position.set( -100, 9, -530 );
		scene.add( directionalLight );
	}
	
	
	// RAYCASTING
	raycaster = new THREE.Raycaster();
	raycaster.linePrecision = 3;
	mouse = new THREE.Vector2();
	
	// RENDER
	canvas = document.querySelector('#container');
	renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true, preserveDrawingBuffer: true  } );
	renderer.setClearColor(0x000000, 0);
	
	let aspectRatio = window.devicePixelRatio;
	//if(isTablet)aspectRatio/=2;
	renderer.setPixelRatio( aspectRatio );
	renderer.setSize( canvas.width, canvas.height );
	renderer.sortObjects = false; // lasciare per la questione delle trasparenze
	
	document.getElementById("container").appendChild( renderer.domElement );
	
	// raggruppo tutto
	manichino = new THREE.Group();
				
	// contenitore del manichino (utilizzato per la gestione del PIVOT)
	manichinoCont = new THREE.Group();
	manichinoCont.add( manichino );
	manichinoCont.scale.set(0.5,0.5,0.5 );
	manichinoCont.position.set(0,0.7,0);
	scene.add( manichinoCont );
	controlsM = new THREE.ObjectControls( manichinoCont, renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'mouseup', onClick, false );
	if(!touchable){
		let els = document.getElementById("interfaccia").getElementsByTagName("div");
		let tE=els.length;
		for(let e=0;e<tE;e++){
			els[e].addEventListener("mouseover",function(){raycastDisable=true;},false);
			els[e].addEventListener("mouseout",function(){raycastDisable=false;},false);
		}
	}
	nasLoader();
	document.getElementById("logo_inizio").style.display = 'none';
	
	setTimeout( function(){
		if(!__(localStorage.firstAccess)){
			localStorage.modello = 'donna';
			localStorage.open3d = 'true';
		}
		
		let noOpen = !LOGIN.logedin() && smartMenu && inizio;
		
		if(localStorage.modello && globals.open3d && !getVar("demo") && !noOpen)caricaModello(localStorage.modello);
		else if(globals.openMap && globals.mapOpened && !noOpen)caricaSet(globals.mapOpened);
		else{
			inizio = false;
			scaricaModello();
			if(getVar("demo")){
				if(	getVar("demo")=='anatomymap' || 
					getVar("demo")=='acupointsmap' ||
					getVar("demo")=='shiatsumap')cambiaModello('donna');
				if(getVar("demo")=='auriculomap' )caricaModello('orecchio');
				if(getVar("demo")=='reflexologymap' )caricaModello('piedi');
				if(getVar("demo")=='pazienti'){
					setTimeout(function(){
						SCHEDA.apriElenco('base');
					},1000);
				}
			}else{
				setTimeout( function(){
					if(!LOGIN.verMonoApp())GUIDA.visFumetto("guida_generica");
				}, 1000 );
				if(mouseDetect && touchDetect && !__(localStorage.pointerType,"")){
					setTimeout( function(){
						ALERT(TXT("PointerTypeAlert")+"\n\n"+TXT("noVisPiu")+'<input type="checkbox" id="no_guida" name="no_guida" value="1" onclick="setPointerType((this.checked) ? \'TOUCH\' : \'\' );">' );
					}, 3000 );
				}
			}
		}
	},500);
	onWindowResize();
	
	if(mouseDetect){
		window.addEventListener("keydown", 	keyDownStage, false);
		window.addEventListener("keyup", 	keyUpStage, false);
		window.addEventListener("mousemove", 	moveMouseStage, false);
	}

	// evito il raycast sugli oggetti
	function eviRay(ev){
		ev.stopPropagation();
		mouse.x = -1;
		mouse.y = -1;
	}
	let btn = document.getElementById("btnsModello");
	btn.addEventListener('mousedown', eviRay);
	btn.addEventListener('mouseup', eviRay);
	btn.addEventListener('click', eviRay);
	btn.addEventListener('touchstart', eviRay);
	btn.addEventListener('touchmove', eviRay);
	btn.addEventListener('touchend', eviRay);

	// ridefinisco i minZoom
	if(WF()<500){
		modelli.orecchio.minZoom = 0;
		modelli.piedi.minZoom = 4;
	}
}

function keyDownStage( event ){
	if(event.keyCode==17 || ctrl_fixed){
		ctrl_pressed = true;
		if(	globals.set.cartella && 
			globals.modello.cartella &&
			(MODELLO.opAtt<1 || areasView) ){
			document.getElementById("lb_anatomy").style.opacity = 0.6;
			window.addEventListener("mousemove", moveLB, false);
			moveLB();
			if(scene.getObjectByName('pins_aree') && areasView){
				scene.getObjectByName('pins_aree').visible = true;
			}
		}
	}
}
function keyUpStage( event ){
	if(event.keyCode==17 && !ctrl_fixed){
		ctrl_pressed = false;
		if(	globals.set.cartella && 
			globals.modello.cartella &&
			(MODELLO.opAtt<1 || areasView) ){
			document.getElementById("lb_anatomy").style.opacity = 0;
			document.getElementById("lb_anatomy").style.left = "-500px";
			document.getElementById("lb_anatomy").style.top = "-500px";
			window.removeEventListener("mousemove", moveLB, false);
			if(scene.getObjectByName('pins_aree') && areasView){
				scene.getObjectByName('pins_aree').visible = false;
			}
		}
	}
}
function moveMouseStage( event ){
	mouse_lb = {
		x: event.clientX,
		y: event.clientY
	};
	if(overInterfaccia){
		mouse_lb = {
			x: -500,
			y: -500
		};
	}
}
function moveLB(){
	document.getElementById("lb_anatomy").style.left = (mouse_lb.x+9)+"px";
	document.getElementById("lb_anatomy").style.top = (mouse_lb.y-7)+"px";
}

// CARICAMENTO DEI MODELLI
function caricaModello( cartella ){
	if(IMPORTER.importing)return;
	manichino.remove( SETS );
	visLoader("");
	startAnimate();
	scaricaModello();
	noAnimate = false;
	animate();
	globals.modello=JSON.parse(JSON.stringify(modelli[cartella]));
	globals.modello.cartella=cartella;
	visLoader(globals.modello.txtLoading);
	let imports = clone(globals.modello.imports);
	for(let i in imports)imports[i]='modelli/'+cartella+'/'+imports[i];
	imports.push("modelli/lang_"+LINGUE.getLinguaCont('anatomy_full')+".js");
	IMPORTER.importaFiles( 	0, 
							imports, 
							'MODELLO._init();MENU.aggiornaIconeModello();', 
							document.getElementById("scripts") );
	document.body.classList.add(globals.modello.cartella);
	if(__(globals.modello.areaName,''))document.body.classList.add(__(globals.modello.areaName,''));
	let els = document.getElementById("p1").getElementsByTagName("div");
	for(let e=0;e<els.length;e++){
		els[e].classList.remove("btnSel");
	}
	document.getElementById("p_stampa").style.display = 'block';
	document.getElementById("p_"+cartella).classList.add("btnSel");
	localStorage.modello = globals.modello.cartella;
	document.body.classList.add('bodyModello');
	document.getElementById("p_centro").classList.add("visBtn");
	if(mouseDetect)document.getElementById("nav").classList.add("visBtn");
}
function scaricaModello( esci ){
	try{SET._scaricaModello();}catch(err){};
	let elencoSel = SCHEDA.elencoSel;
	if(globals.modello.cartella && MODELLO.flip)MODELLO.rifletti();
	obj_guide = null;
	manichinoCaricato = false;
	MENU.chiudiAllSelected();
	manichino.remove(ANATOMIA);
	document.getElementById("p_stampa").style.display = 'none';
	document.getElementById("el_ossa").innerHTML = '';
	document.getElementById("el_visceri").innerHTML = '';
	document.getElementById("el_vasi").innerHTML = '';
	document.getElementById("el_aree").innerHTML = '';
	document.getElementById("el_muscoli3d").innerHTML = '';
	document.getElementById("el_legamenti").innerHTML = '';
	
	document.getElementById("p_ossa").classList.remove("livelli_listed");
	document.getElementById("p_visceri").classList.remove("livelli_listed");
	document.getElementById("p_vasi").classList.remove("livelli_listed");
	document.getElementById("p_aree").classList.remove("livelli_listed");
	document.getElementById("p_muscoli3d").classList.remove("livelli_listed");
	document.getElementById("p_legamenti").classList.remove("livelli_listed");
	
	document.getElementById("p_pelle").classList.remove("visSch");
	document.getElementById("p_ossa").classList.remove("visSch");
	document.getElementById("p_visceri").classList.remove("visSch");
	document.getElementById("p_vasi").classList.remove("visSch");
	document.getElementById("p_aree").classList.remove("visSch");
	document.getElementById("p_muscoli3d").classList.remove("visSch");
	document.getElementById("p_legamenti").classList.remove("visSch");
	
	document.getElementById("p_liv_pelle").classList.remove("visBtn");
	document.getElementById("p_liv_ossa").classList.remove("visBtn");
	document.getElementById("p_liv_visceri").classList.remove("visBtn");
	document.getElementById("p_liv_vasi").classList.remove("visBtn");
	document.getElementById("p_liv_aree").classList.remove("visBtn");
	document.getElementById("p_liv_muscoli3d").classList.remove("visBtn");
	document.getElementById("p_liv_legamenti").classList.remove("visBtn");
	
	document.getElementById("p_pelle").classList.remove("visBtn");
	document.getElementById("p_ossa").classList.remove("visBtn");
	document.getElementById("p_visceri").classList.remove("visBtn");
	document.getElementById("p_vasi").classList.remove("visBtn");
	document.getElementById("p_aree").classList.remove("visBtn");
	document.getElementById("p_muscoli3d").classList.remove("visBtn");
	document.getElementById("p_legamenti").classList.remove("visBtn");
	document.getElementById("p_rifletti").classList.remove("visBtn");
	document.getElementById("p_centro").classList.remove("visBtn");
	//document.getElementById("p_piuma").classList.remove("visBtn");
	if(mouseDetect)document.getElementById("nav").classList.remove("visBtn");
	
	document.getElementById("el_ossa_cont").classList.remove("elOpened");
	document.getElementById("el_visceri_cont").classList.remove("elOpened");
	document.getElementById("el_vasi_cont").classList.remove("elOpened");
	document.getElementById("el_aree_cont").classList.remove("elOpened");
	document.getElementById("el_muscoli3d_cont").classList.remove("elOpened");
	document.getElementById("el_legamenti_cont").classList.remove("elOpened");
	
	document.getElementById("fr_ossa").classList.remove("frOpened");
	document.getElementById("fr_visceri").classList.remove("frOpened");
	document.getElementById("fr_vasi").classList.remove("frOpened");
	document.getElementById("fr_aree").classList.remove("frOpened");
	document.getElementById("fr_muscoli3d").classList.remove("frOpened");
	document.getElementById("fr_legamenti").classList.remove("frOpened");
	
	document.getElementById("pulsanti_modello").classList.remove('modelloScelto');
	document.body.classList.remove('bodyModello');
	if(globals.modello.cartella){
		document.body.classList.remove(globals.modello.cartella);
		if(__(globals.modello.areaName,''))document.body.classList.remove(__(globals.modello.areaName,''));
		document.getElementById("p_"+globals.modello.cartella).classList.remove("btnSel");
		globals.initModello();
		localStorage.modello = "";
	}
	try{SETS.visible = false;}catch(err){}
	noAnimate = true;
	render( true );
	if(smartMenu && elencoSel && !globals.set.cartella)SCHEDA.apriElenco('base');
}
function cambiaModello( cartella ){
	let chiedi = false,
		ChiediUscitaSet = ''
	if(globals.set.cartella!='' && cartella){
		if(sets[globals.set.cartella].modelli.indexOf(cartella)==-1){
			if(!cartella){
				ChiediUscitaSet = TXT("ChiediUscitaSet1").replace("[NomeSet]",globals.set.nome);
			}else{
				ChiediUscitaSet = TXT("ChiediUscitaSet2").replace("[NomeSet]",globals.set.nome);
			}
			chiedi = true;
		}
	}
	CONFIRM.vis(	ChiediUscitaSet,
					!chiedi,
					arguments ).then(function(pass){if(pass){
					let v = getParamNames(CONFIRM.args.callee.toString());
					for(let i in v)eval(getArguments(v,i));
		if(typeof(cartella)=='undefined')cartella ='';
		if(chiedi){
			scaricaSet();
		}
		if(cartella){		
			if(cartella==globals.modello.cartella)return;
			if(globals.modello.cartella){
				document.body.classList.remove(globals.modello.cartella);	
				if(__(globals.modello.areaName,''))document.body.classList.remove(__(globals.modello.areaName,''));	
			}
			MENU.chiudiAllSelected();
			MENU.chEls();
			MODELLO.swArea(2);
			MODELLO.removePrecarArea();
			globals.modello.cartella=cartella;
			caricaModello(globals.modello.cartella);
		}else{
			scaricaModello();
			MENU.visModello(true);
		}
	}});
}


// CARICAMENTO DEI SETS
function caricaSet( cartella, el, forzaModello='' ){
	if(IMPORTER.importing)return;
	let daScheda = (SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B' );
	if(globals.modello.cartella)startAnimate();
	if(el)postApreSet = true;
	if(cartella == globals.set.cartella){
		// CHIUDE il set aperto
		if(globals.set.setSel)globals.set.setSel.classList.remove("btnSetSel");
		scaricaSet();
		if(	!daScheda )MENU.visSets();
	}else{
		// APRE un set
		centro();
		scaricaSet();
		if(!daScheda){
			if(!smartMenu)SCHEDA.chiudiElenco();
			MENU.chiudiMenu();
		}
		visLoader("");
		globals.set=JSON.parse(JSON.stringify(sets[cartella]));
		globals.set.cartella = cartella;
		globals.set.setSel = el;
		if(areasView)MODELLO.swArea();
		let modelli = filtraModelli(cartella);
		if(modelli.indexOf(globals.modello.cartella) == -1 && globals.modello.cartella)forzaModello = modelli[0];
		
		if(forzaModello && forzaModello!=globals.modello.cartella){
			caricaModello(forzaModello);
			return;
		}
		visLoader(globals.set.txtLoading);
		let imports = clone(globals.set.imports);
		for(let i in imports){
			if(imports[i].indexOf("/")==-1)imports[i]='sets/'+cartella+'/'+imports[i];
			imports[i]=imports[i].replace("[lang]",LINGUE.getLinguaCont(cartella));
		}

		IMPORTER.importaFiles(	0,
								imports,
								'SET._init();MENU.aggiornaIconeModello();if(smartMenu && document.getElementById("sets").classList.contains("visSch")){SCHEDA.chiudiElenco();MENU.visSets();}',
								document.getElementById("scripts") );
		if(el)el.classList.add("btnSetSel");
		if(globals.modello.cartella){
			if(MODELLO.meshAree)MODELLO.meshAree.visible = false;
			document.getElementById("pulsanti_modello").classList.add('modelloScelto');
		}
		localStorage.set = globals.set.cartella;
		document.getElementById("pulsanti_set").classList.add("setAperto");
		document.getElementById("btns_set").classList.add("visBtn");
		document.body.classList.add('bodySet');
		document.body.classList.add('body_'+globals.set.cartella);
		updateModels();
	}
	try{
		SET.leggiNote();
	}catch(err){}
	if(globals.openMap){
		globals.mapOpened = globals.set.cartella;
		localStorage.mapOpened = globals.set.cartella;
	}
	MENU.updateNaming();
}
function scaricaSet( notInit=false ){
	let daScheda = (SCHEDA.classeAperta == 'scheda_A' ||
					SCHEDA.classeAperta == 'scheda_B');
	CUSTOMS._end();
	document.body.classList.remove('body_'+globals.set.cartella);
	try{SET._scaricaSet();}catch(err){};
	RICERCHE.annullaGlobal();
	if(	!daScheda )SCHEDA.scaricaScheda();
	manichino.remove(SETS);
	overInterfaccia=false;
	render( true );
	if(	!daScheda )SCHEDA.scaricaScheda();
	if(!notInit){
		if(SETS){
			let els = document.getElementById("scripts").getElementsByTagName("script");
			while(els.length)document.getElementById("scripts").removeChild(els[0]);
			els = document.getElementById("scripts").getElementsByTagName("link");
			while(els.length)document.getElementById("scripts").removeChild(els[0]);
			document.getElementById("divs").innerHTML = '';
		}
		
		SCHEDA.elencoSelSet = '';
		if(globals.set.cartella)SCHEDA.scaricaElenco();
		SCHEDA.scaricaBtns();
		SET = null;
		DB.set = [];
		DB.TXT.set = {};
		globals.initSet();
		if(smartMenu && !daScheda)SCHEDA.chiudiElenco();
	}
	if(areasView)MODELLO.meshAree.visible = true;
	MENU.aggiornaIconeModello();
	localStorage.set = '';
	document.getElementById("pulsanti_set").classList.remove("setAperto");
	document.getElementById("btns_set").classList.remove("visBtn");
	if(!smartMenu && !daScheda)SCHEDA.chiudiElenco();
	document.getElementById("p_sets").classList.add("visSch");
	document.body.classList.remove('bodySet');
	updateModels();
	GUIDA.nasFumetto();
	if(	daScheda ){
		setTimeout(function(){ SCHEDA.apriElenco('base'); },200 );
		PAZIENTI.caricaDettagliSet();
	}
	globals.mapOpened = '';
	localStorage.mapOpened = '';
	MENU.updateNaming();
}
function chiudiSet(){
	let procOp = document.getElementById("scheda").classList.contains("scheda_procedura");
	let auths = [];
	for(a in DB.login.data.auths){
		if(DB.login.data.auths[a]!='anatomy_full')auths.push(DB.login.data.auths[a]);
	}
	CONFIRM.vis(	TXT("ChiediEsciMappa").replace("[mappa]",globals.set.nome), auths.length>1 ).then(function(pass){if(pass){
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet() && !procOp, 
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			if(procOp){
				SCHEDA.formModificato = false;
				endChangeDetection();
			}
			if(globals.set.cartella=='auricologia' && areasView)MODELLO.swArea();
			caricaSet(globals.set.cartella,document.getElementById('p_'+globals.set.cartella));
			if(procOp)setTimeout(function(){
				SCHEDA.scaricaScheda()
				document.getElementById("sc").dataset.funct = '';
			},500);
			
			if(areasView){
				MODELLO.swArea(2);
				MODELLO.swArea(1);
			}
		}});
	}});
}
function updateModels(){
	let html = '';
	for(m in globals.set.modelli){
		html += '<span id="st_'+globals.set.modelli[m]+'" onClick="cambiaModello(\''+globals.set.modelli[m]+'\');"></span>';
	}
	document.getElementById("modelsCont").innerHTML = html;
}

function cambiaLingua(nLingua){
	let l = location.href,
		urlPagina=l.substr(l.lastIndexOf("/")+1).split(/[?#]/)[0],
		FL=''
	if(forzalogin)FL='?FL=1';
	localStorage.siglaLingua = nLingua
	location.replace(urlPagina);
}


// FILTRI SET
function filtraSets(modello){
	let res = []
	for(let s in sets){
		if(sets[s].modelli.indexOf(modello) != -1)res.push(s);
	}
	return res;
}
function filtraModelli(cartella){
	let res = []
	try{res = sets[cartella].modelli;}catch(err){}
	return res;
}

// GESTORI EVENTI
var stopOnResize = false,
	traslStage = 0;
function onWindowResize(){
	if(stopOnResize)return;
	let w = window.innerWidth,
		s = window.innerWidth,
		h = window.innerHeight;
	if(SCHEDA.aggancio.tipo == 'lato'){
		if(document.getElementById("elenchi_cont").classList.contains("visSch"))s -= document.getElementById("elenchi_cont").scrollWidth;
		if(document.getElementById("scheda").classList.contains("visSch"))s -= document.getElementById("scheda").scrollWidth;
		traslStage =((w - s) / 2);
		
	}else{
		traslStage = 0;
	}
	document.getElementById("container").getElementsByTagName("canvas")[0].style.marginLeft = traslStage + "px";
	if(smartMenu && !document.body.classList.contains("nasSch"))h -= 64;
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
	renderer.setSize( w, h );
	render();
}
function onMouseMove( event ) {
	if(!overInterfaccia){
		event.preventDefault();
		const rect = renderer.domElement.getBoundingClientRect();
		mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
		mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
		mouse.xAbs = event.clientX;
		mouse.yAbs = event.clientY;
	}
}

function render(forza=false) {
	let make;
	if(globals.set.cartella && !ctrl_pressed && !ctrl_fixed){
		try{
			make = SET._render();
		}catch(err){
			if(!SET){
				make = true;
				make = MODELLO._render();
			}
		}
	}else{
		make = true;
		make = MODELLO._render();
	}
	if(make || forza){
		renderer.render( scene, camera );
		MODELLO.riposLegenda();
	}
}
function animate() {
	if(!noAnimate){
		requestAnimationFrame( animate );
		try{ SET._animate(); }catch(err){ if(SET)console.log(err); };
		if(rotateEnd!=null){
			if(!rotateStart)rotateStart = Date.now();
			let coeff = !smothingView ? 1 : 0.2,
				diffX = (rotateEnd.x-manichinoCont.rotation.x)*coeff,
				diffY = (rotateEnd.y-manichinoCont.rotation.y)*coeff,
				diffZ = (rotateEnd.z-manichinoCont.rotation.z)*coeff;
			manichinoCont.rotation.set( manichinoCont.rotation.x+diffX, manichinoCont.rotation.y+diffY, manichinoCont.rotation.z+diffZ );
			if(diffX<0.001 && diffX>-0.001 && diffY<0.001 && diffY>-0.001 && diffZ<0.001 && diffZ>-0.001){
				rotateEnd=null;
				let end = Date.now();
				if(end-rotateStart>5000)smothingView=false;
				rotateStart=null;
				if(!controlsM._premuto)normalizeRotation();
				if(!controlsM._premuto){
					controlsM._ZPR=false;
					controlsM._inMovimento=false;
					saveRotationPosition();
				}
			}
		}
		if(panEnd!=null){
			if(!panStart)panStart = Date.now();
			let coeff = !smothingView ? 1 : 0.2,
				diffX = (panEnd.x-manichinoCont.position.x)*coeff,
				diffY = (panEnd.y-manichinoCont.position.y)*coeff,
				diffZ = (panEnd.z-manichinoCont.position.z)*coeff;
			manichinoCont.position.set(manichinoCont.position.x+diffX, manichinoCont.position.y+diffY, manichinoCont.position.z);
			if(diffX<0.001 && diffX>-0.001 && diffY<0.001 && diffY>-0.001){
				panEnd=null;
				let end = Date.now();
				if(end-panStart>5000)smothingView=false;
				panStart=null;
				if(!controlsM._premuto){
					controlsM._ZPR = false;
					controlsM._inMovimento = false;
					saveRotationPosition();
				}
			}
		}
		if(panEndZero!=null){
			if(!panStartZero)panStartZero = Date.now();
			let coeff = !smothingView ? 1 : 0.2,
				diffX = (panEndZero.x-manichino.position.x)*coeff,
				diffY = (panEndZero.y-manichino.position.y)*coeff,
				diffZ = (panEndZero.z-manichino.position.z)*coeff;
			manichino.position.set( manichino.position.x+diffX, manichino.position.y+diffY, manichino.position.z+diffZ );
			if(diffX<0.001 && diffX>-0.001 && diffY<0.001 && diffY>-0.001){
				panEndZero=null;
				let end = Date.now();
				if(end-panStartZero>5000)smothingView=false;
				panStartZero=null;
				if(!controlsM._premuto){
					controlsM._ZPR = false;
					controlsM._inMovimento = false;
					saveRotationPosition();
				}
			}
		}
		if(zoomEnd!=null){
			if(!zoomStart)zoomStart = Date.now();
			let coeff = !smothingView ? 1 : 0.2,
				diff = (zoomEnd-manichinoCont.position.z)*coeff,
				preX = manichinoCont.position.x,
				preY = manichinoCont.position.y,
				preZ = manichinoCont.position.z,
				newZ = preZ + diff;
			manichinoCont.position.set( preX , preY ,newZ );
			if(diff<0.001 && diff>-0.001){
				zoomEnd=null;
				let end = Date.now();
				if(end-zoomStart>5000)smothingView=false;
				zoomStart=null;
				controlsM._ZPR=false;
				controlsM._inMovimento = false;
				localStorage.modelZoom = manichinoCont.position.z;
			}
		}
		render();
	}
}
function saveRotationPosition(){
	localStorage.modelRotation = JSON.stringify({
		x: manichinoCont.rotation.x,
		y: manichinoCont.rotation.y,
		z: manichinoCont.rotation.z });
	localStorage.modelPosition = JSON.stringify({
		x:manichinoCont.position.x,
		y:manichinoCont.position.y,
		z:manichinoCont.position.z} );
}
var tmaNoAn = null;
function swAnimate(){
	if(!noAnimate){
		stopAnimate( true );
	}else{
		startAnimate();
	}
}
function verAnimate(){
	if(smartMenu){
		if(	/* (
				(	document.getElementById("elenchi").classList.contains("visSch") ||
					document.getElementById("scheda").classList.contains("visSch")
				) && !document.body.classList.contains("nasSch")
			) ||  */
			document.getElementById("sets").classList.contains("visSch") || 
			document.getElementById("schedaGlobal").classList.contains("visSch") || 
			document.getElementById("ag").classList.contains("visSch") || 
			document.getElementById("impostazioni").classList.contains("visSch") ||
			document.getElementById("login").classList.contains("visSch") ||
			document.getElementById("feedback").classList.contains("visSch") ||
			document.getElementById("colori").classList.contains("visSch") ||
			document.getElementById("notifiche").classList.contains("visSch") ||
			document.getElementById("backups").classList.contains("visSch") ||
			document.getElementById("registrazione").classList.contains("visSch") ||
			document.getElementById("community").classList.contains("visSch") ||
			document.getElementById("impset").classList.contains("visSch") ||
			document.getElementById("photo").classList.contains("visSch") ||
			document.getElementById("versione").classList.contains("visSch") ){
			if(!noAnimate)stopAnimate( true );
			return;
		}else if(globals.modello.cartella && noAnimate){
			startAnimate();
		}
	}
}
setInterval( function(){ verAnimate(); }, 200 );
function stopAnimate( subito ){
	if(typeof(subito) == 'undefined'){ // interrompe l'animazione dopo un minuto e mezzo
		tmaNoAn = setTimeout(function(){
			noAnimate=true;
			document.getElementById("legende").classList.add("noAnimate");
			document.getElementById("container").style.opacity = 0.4;
			//document.getElementById("p_piuma").classList.add("piumaAtt");
		},1500);
	}else{ // oppure subito
		noAnimate=true;
		document.getElementById("legende").classList.add("noAnimate");
		document.getElementById("container").style.opacity = 0.4;
		//document.getElementById("p_piuma").classList.add("piumaAtt");
		//document.getElementById("p_piuma").getElementsByTagName("i")[0].innerHTML = htmlEntities(TXT("_3DinPausa"));
	}
}
function startAnimate(){
	if(noAnimate){
		if(tmaNoAn)clearTimeout(tmaNoAn);
		noAnimate=false;
		animate();
		document.getElementById("legende").classList.remove("noAnimate");
		document.getElementById("container").style.opacity = 1;
		//document.getElementById("p_piuma").classList.remove("piumaAtt");
		//document.getElementById("p_piuma").getElementsByTagName("i")[0].innerHTML = htmlEntities(TXT("Pausa3D"));
	}
}
function normalizeRotation(){
	let newX=(manichinoCont.rotation.x-((Math.PI*2)*parseInt(manichinoCont.rotation.x/(Math.PI*2)))),
		newY=(manichinoCont.rotation.y-((Math.PI*2)*parseInt(manichinoCont.rotation.y/(Math.PI*2))));
	if(newX>Math.PI)newX = 0 - (Math.PI - ( newX - Math.PI ));
	if(newY>Math.PI)newY = 0 - (Math.PI - ( newY - Math.PI ));
	if(newX<0-Math.PI)newX = (Math.PI - ( (0-newX) - Math.PI ));
	if(newY<0-Math.PI)newY = (Math.PI - ( (0-newY) - Math.PI ));
	manichinoCont.rotation.set( newX, newY, 0 );
}
function onClick(){
	if(globals.set.cartella && !ctrl_pressed && !ctrl_fixed){
		try{
			SET._onClick(event);
		}catch(err){
			if(SET)console.log(err)
			else MODELLO._onClick(event);
		}
	}else{
		MODELLO._onClick(event);
	}
}
function centro(){ // riporta al centro
	let centro = __(globals.modello.centro,{ x: 0, y: 0.7, z: 0 }),
		zoom = centro.z;
	if(!centro.z)zoom = 0.5;
	if(smartMenu && document.getElementById("meridianiSmart_ico") && document.getElementById("meridianiSmart_ico")?.classList.contains("visSch"))centro.x = -0.4;
	panEndZero = { x: 0, y: 0, z: 0 };
	panEnd = centro;
	normalizeRotation();
	rotateEnd = { x: 0, y: 0, z: 0 };
	zoomEnd = zoom;
	camera.position.set(0,0,22);
	camera.lookAt(camera.position);
	MENU.disBtnCentro();
}
function verMinZoom(){
	if(__(globals.modello.minZoom))return globals.modello.minZoom;
	else return controlsM.minZoom;
}
function verMaxZoom(){
	if(__(globals.modello.maxZoom))return globals.modello.maxZoom;
	else return controlsM.maxZoom;
}
function zoom(n){
	let zoomAtt = Math.round(manichinoCont.position.z)+n*2;
	if(zoomAtt<verMinZoom())zoomAtt=verMinZoom();
	if(zoomAtt>verMaxZoom())zoomAtt=verMaxZoom();
	zoomEnd = zoomAtt;
	localStorage.modelZoom = zoomEnd;
}
function Canvas2Img(){
	return renderer.domElement.toDataURL();
}
function toScreenPosition( obj, camera ){ // funzione per individuare la posizione sullo schermo di un oggetto
    let vector = new THREE.Vector3(),
		widthHalf = 0.5*renderer.context.canvas.scrollWidth,
		heightHalf = 0.5*renderer.context.canvas.scrollHeight;
    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return { 
        x: vector.x,
        y: vector.y
    };
}
function toScreenPosition2( obj, n ){ // il punto "n" della geometria nello schermo
	if(typeof(obj) == 'undefined')return;
	let vector = new THREE.Vector3(),
	widthHalf = 0.5*renderer.context.canvas.scrollWidth,
		heightHalf = 0.5*renderer.context.canvas.scrollHeight;
	
	obj.updateMatrixWorld();
	vector.x = obj.geometry.attributes.position.array[0 + (n * 3)];
	vector.y = obj.geometry.attributes.position.array[1 + (n * 3)];
	vector.z = obj.geometry.attributes.position.array[2 + (n * 3)];
	vector.applyMatrix4( obj.matrixWorld );
	vector.project(camera);
	vector.x = ( vector.x * widthHalf ) + widthHalf;
	vector.y = - ( vector.y * heightHalf ) + heightHalf;

	return { 
		x: vector.x,
		y: vector.y
	};
}
function selCol(n){
	if(localStorage.colore)document.body.classList.remove('bodyStyled'+localStorage.colore);
	localStorage.colore = n;
	let els = document.getElementById("colSel").getElementsByTagName("span");
	for(let i = 0; i<els.length; i++){
		if(localStorage.colore == 2-i)els[i].classList.add("cSel");
		else els[i].classList.remove("cSel");
	}
	document.body.classList.add('bodyStyled'+localStorage.colore);
	MODELLO.MAT.materialVisceri.color = new THREE.Color( MODELLO.MAT.colsVisceri[localStorage.colore] );
	MODELLO.MAT.materialPelle.color = new THREE.Color( MODELLO.MAT.colsPelle[localStorage.colore] );
}
function selSf(n){
	if(localStorage.fondino)document.body.classList.remove('sf_'+localStorage.fondino);
	localStorage.fondino = n;
	let els = document.getElementById("sfSelect").options;
	for(let i = 0; i<els.length; i++){
		if(localStorage.fondino == els[i].value)document.getElementById("sfSelect").selectedIndex = i;
	}
	document.body.classList.add('sf_'+localStorage.fondino);
}
function getCenterPoint( mesh ){ // trova il punto centrale di una mesh
    let geometry = mesh.geometry,
		center = new THREE.Vector3();
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter( center );
    return center;
}


function setPointerType( type ){
	if(	(type == 'MOUSE' && !mouseDetect) || 
		(type == 'TOUCH' && !touchDetect) || 
		!(mouseDetect && touchDetect) )return;
	localStorage.pointerType = type;
	let els = document.getElementById("pointerSel").getElementsByTagName("b");
	els[0].classList.remove("a_SEL");
	els[1].classList.remove("a_SEL");
	if(__(localStorage.pointerType,'') == 'MOUSE'){
		els[0].classList.add("a_SEL");
		touchable = false;
		document.body.classList.remove("touch");
	}else{
		els[1].classList.add("a_SEL");
		touchable = true;
		document.body.classList.add("touch");
	}
}
	
function get_memOpen3d(){
	document.getElementById("mem_open3d").checked = globals.open3d;
}
function set_memOpen3d(){
	globals.open3d = document.getElementById("mem_open3d").checked;
	localStorage.open3d = globals.open3d;
}
function get_memOpenMap(){
	document.getElementById("mem_openMap").checked = globals.openMap;
}
function set_memOpenMap(){
	globals.openMap = document.getElementById("mem_openMap").checked;
	localStorage.openMap = globals.openMap;
}