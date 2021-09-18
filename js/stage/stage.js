
var camera, scene, renderer;
var manichino, ANATOMIA, SETS;
var SET = null;
var obj_guide = null;
var mouse, raycaster;
var manichinoCaricato=false;
var clock = new THREE.Clock();
var smothingView = true;
var raycastDisable = false;
var muscleView = false;
var jss = [];
var elAtt = null;
var overLegenda = false;
var overInterfaccia = false;
var rotateEnd=panEnd=panEndZero=zoomEnd=null;
var rotateStart=panStart=panStartZero=zoomStart=null;
var noAnimate = true;
var postApreSet = false;
/*var colori = [ 
	"#333",
	"#076baa",
	"#eae3d3"
];*/
var inizio = true;


function init() {
	
	if(!localStorage.colore)localStorage.colore = 2;
	selCol(localStorage.colore);
	// SCENE
	scene = new THREE.Scene();
	scene.userData.BGcolorPrint = new THREE.Color( 0xffffff );
	//document.body.style.backgroundColor = colori[localStorage.colore];
	document.body.classList.add("bodyStyled"+localStorage.colore);
	//scene.userData.BGcolorScreen = new THREE.Color( colori[localStorage.colore] );
	scene.background = null;//scene.userData.BGcolorScreen;
	
	// CAMERA
	camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 100 );
	camera.position.set( 0, 0, 22 );
	camera.lookAt(camera.position);
	
	// LUCE AMBIENTE
	var ambientLight = new THREE.AmbientLight( 0xffffff, 0.6 );
	scene.add( ambientLight );
	
	// LUCE SULLA CAMERA
	var pointLight = new THREE.PointLight( 0xffffff, 0.3 );
	scene.add( camera );
	camera.add( pointLight );
	
	// LUCE 1 (verticale dall'alto)
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.3 );
	directionalLight.position.set( 17, 9, 30 );
	scene.add( directionalLight );
	
	// LUCE 2 (destra)
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.3 );
	directionalLight.position.set( 20, 1, 0 );
	scene.add( directionalLight );
	
	// LUCE 3 (sinistra)
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
	directionalLight.position.set( -100, 9, 30 );
	scene.add( directionalLight );
	
	if(!isTablet){
		// LUCE 4 (posteriore sinistra)
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
		directionalLight.position.set( -100, 9, -530 );
		scene.add( directionalLight );
	}
	
	
	// RAYCASTING
	raycaster = new THREE.Raycaster();
	raycaster.linePrecision = 3;
	mouse = new THREE.Vector2();
	
	// RENDER
	canvas = document.querySelector('#container');
	//renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true  } );
	renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true, preserveDrawingBuffer: true  } );
	renderer.setClearColor(0x000000, 0);
	
	var aspectRatio = window.devicePixelRatio;
	if(isTablet)aspectRatio/=2;
	//aspectRatio = 1;
	renderer.setPixelRatio( aspectRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
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

	//manichinoCaricato=true;
	
	// inserisco i controlli sul manichino (pan e rotate)
	controlsM = new THREE.ObjectControls( manichinoCont, renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'mouseup', onClick, false );
	if(!touchable){
		var els = document.getElementById("interfaccia").getElementsByTagName("div");
		var tE=els.length;
		for(e=0;e<tE;e++){
			els[e].addEventListener("mouseover",function(){raycastDisable=true;},false);
			els[e].addEventListener("mouseout",function(){raycastDisable=false;},false);
		}
	}
	nasLoader();
	//var modello = 'donna';
	//if(localStorage.modello)modello = localStorage.modello;
	
	// setto la donna al primo accesso
	//if(typeof(localStorage.modello) == 'undefined')localStorage.modello = "donna"; // apertura automatica all'inizio
	if(tipoApp == 'AM' || tipoApp == 'AM_light'){
		if(!localStorage.modello || typeof(localStorage.modello)=='undefined'){
			localStorage.modello = 'uomo';
		}
		modello = localStorage.modello;
	}
	if(localStorage.modello && globals.memorizza)caricaModello(localStorage.modello);
	else{
		document.getElementById("logo_inizio").style.display = 'none';
		document.getElementById("poweredby_inizio").style.display = 'none';
		scaricaModello();
		//if(!smartMenu){
			setTimeout( function(){
				GUIDA.visFumetto("guida_generica");
			}, 1000 );
		//}
	}
}


// CARICAMENTO DEI MODELLI
function caricaModello( cartella ){
	// verifico le autorizzazioni
	if(tipoApp == 'AM_light' && cartella!='uomo'){
		setTimeout(function(){
			ALERT(Lingua(TXT_MsgModelloSoloPay));
		},100);
		return;
	}
	// --------------------------
	
	visLoader("");
	startAnimate()
	scaricaModello();
	noAnimate = false;
	animate();
	globals.modello=JSON.parse(JSON.stringify(modelli[cartella]));
	globals.modello.cartella=cartella;
	visLoader(globals.modello.txtLoading);
	var imports = clone(globals.modello.imports);
	for(i in imports)imports[i]='modelli/'+cartella+'/'+imports[i];
	imports.push("modelli/"+globals.siglaLingua+".js");
	IMPORTER.importaFiles( 	0, 
							imports, 
							'MODELLO._init();MENU.aggiornaIconeModello();', 
							document.getElementById("scripts") );

	var els = document.getElementById("p1").getElementsByTagName("div");
	for(var e=0;e<els.length;e++){
		els[e].classList.remove("btnSel");
	}
	document.getElementById("p_stampa").style.display = 'block';
	document.getElementById("p_"+cartella).classList.add("btnSel");
	localStorage.modello = globals.modello.cartella;
	document.body.classList.add('bodyModello');
	document.getElementById("p_centro").classList.add("visBtn");
	document.getElementById("p_piuma").classList.add("visBtn");
	if(mouseDetect)document.getElementById("nav").classList.add("visBtn");
}
function scaricaModello( esci ){
	var elencoSel = SCHEDA.elencoSel;
	var notInit = false;
	if(globals.set.cartella)notInit = true;
	scaricaSet(notInit);
	
	obj_guide = null;
	MENU.chiudiAllSelected();
	manichino.remove(ANATOMIA);
	document.getElementById("p_stampa").style.display = 'none';
	document.getElementById("el_ossa").innerHTML = '';
	document.getElementById("el_visceri").innerHTML = '';
	document.getElementById("el_muscoli").innerHTML = '';
	
	document.getElementById("p_ossa").classList.remove("livelli_listed");
	document.getElementById("p_visceri").classList.remove("livelli_listed");
	document.getElementById("p_muscoli").classList.remove("livelli_listed");
	
	document.getElementById("p_pelle").classList.remove("visSch");
	document.getElementById("p_ossa").classList.remove("visSch");
	document.getElementById("p_visceri").classList.remove("visSch");
	document.getElementById("p_muscoli").classList.remove("visSch");
	
	document.getElementById("p_pelle").classList.remove("visBtn");
	document.getElementById("p_ossa").classList.remove("visBtn");
	document.getElementById("p_visceri").classList.remove("visBtn");
	document.getElementById("p_muscoli").classList.remove("visBtn");
	document.getElementById("p_rifletti").classList.remove("visBtn");
	document.getElementById("p_centro").classList.remove("visBtn");
	document.getElementById("p_piuma").classList.remove("visBtn");
	if(mouseDetect)document.getElementById("nav").classList.remove("visBtn");
	
	document.getElementById("el_ossa_cont").classList.remove("elOpened");
	document.getElementById("el_visceri_cont").classList.remove("elOpened");
	document.getElementById("el_muscoli_cont").classList.remove("elOpened");
	
	document.getElementById("fr_ossa").classList.remove("frOpened");
	document.getElementById("fr_visceri").classList.remove("frOpened");
	document.getElementById("fr_muscoli").classList.remove("frOpened");
	
	document.getElementById("pulsanti_modello").classList.remove('modelloScelto');
	document.body.classList.remove('bodyModello');
	
	if(globals.modello.cartella){
		document.getElementById("p_"+globals.modello.cartella).classList.remove("btnSel");
		globals.initModello();
		localStorage.modello = "";
	}
	noAnimate = true;
	render( true );
	if(smartMenu && elencoSel && !globals.set.cartella)SCHEDA.apriElenco('base');
}
function cambiaModello( cartella ){
	if(typeof(cartella) == 'undefined')var cartella='';
	var chiedi = false;
	var ChiediUscitaSet = ''
	if(globals.set.cartella!=''){
		if(sets[globals.set.cartella].modelli.indexOf(cartella)==-1){
			if(!cartella){
				ChiediUscitaSet = Lingua(TXT_ChiediUscitaSet1).replace("[NomeSet]",globals.set.nome);
			}else{
				ChiediUscitaSet = Lingua(TXT_ChiediUscitaSet2).replace("[NomeSet]",globals.set.nome);
			}
			chiedi = true;
		}
	}
	CONFIRM.vis(	ChiediUscitaSet,
					!chiedi,
					arguments ).then(function(pass){if(pass){
					var v = getParamNames(CONFIRM.args.callee.toString());
					for(i in v)eval(getArguments(v,i));
		if(chiedi){
			caricaSet(globals.set.cartella);
			muscleView=false;
		}
		if(cartella){			
			if(cartella==globals.modello.cartella)return;
			MENU.chiudiAllSelected();
			MENU.chEls();
			if(muscleView)MODELLO.swMuscle(2);
			MODELLO.removePrecarMuscle();
			globals.modello.cartella=cartella;
			caricaModello(globals.modello.cartella);
		}else{
			scaricaModello();
		}
	}});
}


// CARICAMENTO DEI SETS
function caricaSet( cartella, el ){
	//if(DB.login.data.auths.indexOf(cartella) == -1)return;
	startAnimate();
	if(el)postApreSet = true;
	if(cartella == globals.set.cartella){
		// CHIUDE il set aperto
		if(globals.set.setSel)globals.set.setSel.classList.remove("btnSetSel");
		scaricaSet();
		localStorage.set = '';
		document.getElementById("pulsanti_set").classList.remove("setAperto");
		if(!smartMenu)SCHEDA.chiudiElenco();
		document.getElementById("p_sets").classList.add("visSch");
		MENU.visSets();
	}else{
		// APRE un set
		scaricaSet();
		if(!smartMenu)SCHEDA.chiudiElenco();
		visLoader("");
		MENU.chiudiMenu();
		globals.set=JSON.parse(JSON.stringify(sets[cartella]));
		globals.set.cartella = cartella;
		globals.set.setSel = el;
		var modelli = filtraModelli(cartella);
		if(modelli.indexOf(globals.modello.cartella) == -1){
			caricaModello(modelli[0]);
			return;
		}
		globals.set.imports.push(globals.siglaLingua+".js");
		visLoader(globals.set.txtLoading);
		var imports = clone(globals.set.imports);
		for(i in imports)imports[i]='sets/'+cartella+'/'+imports[i];
		IMPORTER.importaFiles(	0,
								imports,
								'SET._init();MENU.aggiornaIconeModello();',
								document.getElementById("scripts") );
		
		if(el)el.classList.add("btnSetSel");
		MODELLO.meshMuscoli.visible = false;
		//centro();
		localStorage.set = globals.set.cartella;
		document.getElementById("pulsanti_set").classList.add("setAperto");
		document.getElementById("pulsanti_modello").classList.add('modelloScelto');
	}
	try{
		SET.leggiNote();
	}catch(err){}
}
function scaricaSet(notInit){
	try{SET._scaricaSet();}catch(err){};
	manichino.remove(SETS);
	overInterfaccia=false;
	render( true );
	SCHEDA.scaricaScheda();
	if(typeof(notInit) == 'undefined')var notInit = false;
	if(!notInit){
		if(SETS){
			var els = document.getElementById("scripts").getElementsByTagName("script");
			while(els.length)document.getElementById("scripts").removeChild(els[0]);
			var els = document.getElementById("scripts").getElementsByTagName("link");
			while(els.length)document.getElementById("scripts").removeChild(els[0]);
			document.getElementById("divs").innerHTML = '';
		}
		
		SCHEDA.elencoSelSet = '';
		if(globals.set.cartella)SCHEDA.scaricaElenco();
		SCHEDA.scaricaBtns();
		SET = null;
		DB.set = [];
		globals.initSet();
		if(smartMenu)SCHEDA.chiudiElenco();
	}
	if(muscleView)MODELLO.meshMuscoli.visible = true;
	MENU.aggiornaIconeModello();
}

function cambiaLingua(nLingua){
	var l = location.href;
	var urlPagina=l.substr(l.lastIndexOf("/")+1).split(/[?#]/)[0];
	var FL=''
	if(forzalogin)FL='1';
	location.replace(urlPagina+"?idNL="+nLingua+"&FL="+FL);
}


// FILTRI SET
function filtraSets(modello){
	var res = []
	for(s in sets){
		if(sets[s].modelli.indexOf(modello) != -1)res.push(s);
	}
	return res;
}
function filtraModelli(cartella){
	var res = []
	try{res = sets[cartella].modelli;}catch(err){}
	return res;
}

// GESTORI EVENTI
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}
function onMouseMove( event ) {
	if(!overInterfaccia){
		event.preventDefault();
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		mouse.xAbs = event.clientX;
		mouse.yAbs = event.clientY;
	}
}

function render(forza) {
	if(typeof(forza)=='undefined')var forza=false;
	try{
		make = SET._render();
	}catch(err){
		if(!SET){
			make = true;
			make = MODELLO._render();
		}
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
			var coeff = 0.2;
			if(!smothingView)coeff = 1;
			var diffX = (rotateEnd.x-manichinoCont.rotation.x)*coeff;
			var diffY = (rotateEnd.y-manichinoCont.rotation.y)*coeff;
			var diffZ = (rotateEnd.z-manichinoCont.rotation.z)*coeff;
			manichinoCont.rotation.set( manichinoCont.rotation.x+diffX, manichinoCont.rotation.y+diffY, manichinoCont.rotation.z+diffZ );
			if(diffX<0.001 && diffX>-0.001 && diffY<0.001 && diffY>-0.001 && diffZ<0.001 && diffZ>-0.001){
				rotateEnd=null;
				var end = Date.now();
				if(end-rotateStart>5000)smothingView=false;
				rotateStart=null;
				if(!controlsM._premuto){
					controlsM._ZPR=false;
					controlsM._inMovimento=false;
				}
			}
		}
		if(panEnd!=null){
			if(!panStart)panStart = Date.now();
			var coeff = 0.2;
			if(!smothingView)coeff = 1;
			var diffX = (panEnd.x-manichinoCont.position.x)*coeff;
			var diffY = (panEnd.y-manichinoCont.position.y)*coeff;
			var diffZ = (panEnd.z-manichinoCont.position.z)*coeff;
			manichinoCont.position.set( manichinoCont.position.x+diffX, manichinoCont.position.y+diffY, manichinoCont.position.z );
			if(diffX<0.001 && diffX>-0.001 && diffY<0.001 && diffY>-0.001){
				panEnd=null;
				var end = Date.now();
				if(end-panStart>5000)smothingView=false;
				panStart=null;
				if(!controlsM._premuto){
					controlsM._ZPR = false;
					controlsM._inMovimento = false;
				}
			}
		}
		if(panEndZero!=null){
			if(!panStartZero)panStartZero = Date.now();
			var coeff = 0.2;
			if(!smothingView)coeff = 1;
			var diffX = (panEndZero.x-manichino.position.x)*coeff;
			var diffY = (panEndZero.y-manichino.position.y)*coeff;
			var diffZ = (panEndZero.z-manichino.position.z)*coeff;
			manichino.position.set( manichino.position.x+diffX, manichino.position.y+diffY, manichino.position.z+diffZ );
			if(diffX<0.001 && diffX>-0.001 && diffY<0.001 && diffY>-0.001){
				panEndZero=null;
				var end = Date.now();
				if(end-panStartZero>5000)smothingView=false;
				panStartZero=null;
				if(!controlsM._premuto){
					controlsM._ZPR = false;
					controlsM._inMovimento = false;
				}
			}
		}
		if(zoomEnd!=null){
			if(!zoomStart)zoomStart = Date.now();
			var coeff = 0.2;
			if(!smothingView)coeff = 1;
			var diff = (zoomEnd-manichinoCont.position.z)*coeff;
			var preX = manichinoCont.position.x;
			var preY = manichinoCont.position.y;
			var preZ = manichinoCont.position.z;
			var newZ = preZ + diff;
			manichinoCont.position.set( preX , preY ,newZ );
			if(diff<0.001 && diff>-0.001){
				zoomEnd=null;
				var end = Date.now();
				if(end-zoomStart>5000)smothingView=false;
				zoomStart=null;
				controlsM._ZPR=false;
				controlsM._inMovimento = false;
			}
		}
		render();
	}
}
var tmaNoAn = null;
function swAnimate(){
	if(!noAnimate){
		stopAnimate( true );
	}else{
		startAnimate();
	}
}
function stopAnimate( subito ){
	if(typeof(subito) == 'undefined'){ // interrompe l'animazione dopo un minuto e mezzo
		tmaNoAn = setTimeout(function(){
			noAnimate=true;
			document.getElementById("container").style.opacity = 0.4;
			document.getElementById("p_piuma").classList.add("piumaAtt");
		},1500);
	}else{ // oppure subito
		noAnimate=true;
		document.getElementById("container").style.opacity = 0.4;
		document.getElementById("p_piuma").classList.add("piumaAtt");
		document.getElementById("p_piuma").getElementsByTagName("i")[0].innerHTML = htmlEntities(Lingua(TXT_3DinPausa));
	}
}
function startAnimate(){
	if(noAnimate){
		if(tmaNoAn)clearTimeout(tmaNoAn);
		noAnimate=false;
		animate();
		document.getElementById("container").style.opacity = 1;
		document.getElementById("p_piuma").classList.remove("piumaAtt");
		document.getElementById("p_piuma").getElementsByTagName("i")[0].innerHTML = htmlEntities(Lingua(TXT_Pausa3D));
	}
}
function normalizeRotation(){
	var newX=(manichinoCont.rotation.x-((Math.PI*2)*parseInt(manichinoCont.rotation.x/(Math.PI*2))));
	var newY=(manichinoCont.rotation.y-((Math.PI*2)*parseInt(manichinoCont.rotation.y/(Math.PI*2))));
	if(newX>Math.PI)newX = 0 - (Math.PI - ( newX - Math.PI ));
	if(newY>Math.PI)newY = 0 - (Math.PI - ( newY - Math.PI ));
	if(newX<0-Math.PI)newX = (Math.PI - ( (0-newX) - Math.PI ));
	if(newY<0-Math.PI)newY = (Math.PI - ( (0-newY) - Math.PI ));
	manichinoCont.rotation.set( newX, newY, 0 );
}
function onClick(){
	try{
		SET._onClick(event);
	}catch(err){
		if(SET)console.log(err)
		else MODELLO._onClick(event);
	}
}
function centro(){ // riporta al centro
	panEndZero = { x: 0, y: 0, z: 0 };
	panEnd = { x: 0, y: 0.7, z: 0 };
	normalizeRotation();
	rotateEnd = { x: 0, y: 0, z: 0 };
	zoomEnd = 0.5;
	camera.position.set(0,0,22);
	camera.lookAt(camera.position);
	MENU.disBtnCentro();
	
	//document.getElementById("logo_inizio").style.display = 'none'; // solo per la prima volta
}
function zoom(n){
	var zoomAtt = Math.round(manichinoCont.position.z)+n*2;
	if(zoomAtt<controlsM.minZoom)zoomAtt=controlsM.minZoom;
	if(zoomAtt>controlsM.maxZoom)zoomAtt=controlsM.maxZoom;
	zoomEnd = zoomAtt;
}
function Canvas2Img(){
	return renderer.domElement.toDataURL();
}
function toScreenPosition(obj, camera){ // funzione per individuare la posizione sullo schermo di un oggetto
    var vector = new THREE.Vector3();

    var widthHalf = 0.5*renderer.context.canvas.scrollWidth;
    var heightHalf = 0.5*renderer.context.canvas.scrollHeight;
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
function toScreenPosition2(obj, n){ // il punto "n" della geometria nello schermo
	if(typeof(obj) == 'undefined')return;
	var widthHalf = 0.5*renderer.context.canvas.scrollWidth;
	var heightHalf = 0.5*renderer.context.canvas.scrollHeight;
	   
	obj.updateMatrixWorld();
	
	var vector = new THREE.Vector3();
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
	var els = document.getElementById("colSel").getElementsByTagName("span");
	for(i = 0; i<els.length; i++){
		if(i == localStorage.colore)els[i].classList.add("cSel");
		else els[i].classList.remove("cSel");
	}
	document.body.classList.add('bodyStyled'+localStorage.colore);
	MODELLO.MAT.materialVisceri.color = new THREE.Color( MODELLO.MAT.colsVisceri[localStorage.colore] );
	MODELLO.MAT.materialPelle.color = new THREE.Color( MODELLO.MAT.colsPelle[localStorage.colore] );
}


