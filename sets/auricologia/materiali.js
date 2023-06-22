

// colori
SET.COL = {
	nero: 0x000000,
	
	sel: 0xFF0000,
	musc: 0x33FF00, // 0x000000;
	basePT: 0x666666,//0x8899AA,
	//basePT_CIN: 0x0b830b,//0xc97c30,//0xbe8842,
	basePT_CIN: 0xbc580d,
	basePT_EUR: 0x5c8fa8,
	base: 0x637281,
	over: 0xFFFFFF,
	overPT: 0x999999,//0xAABBCC,
	//overPT_CIN: 0x349234,//0xda9f67,//0xdfb57f,
	overPT_CIN: 0xc5784d,
	overPT_EUR: 0x99BBCC,
	notePT: 0xffd000,
	notePTSel: 0xff9900,
	notePTemissive: 0x333300,
	
	selAR: 0xFF0000,
	baseAR: 0x333333,
	//baseAR_CIN: 0x0b830b,//0xab551b,//0x7e5726,
	baseAR_CIN: 0x792f03,
	baseAR_EUR: 0x0a6da0,
	overAR: 0x666666,
	//overAR_CIN: 0x349234,//0xa7663b,//0x9c784a,
	overAR_CIN: 0xbc6d31,
	overAR_EUR: 0x428fb7,
	
	eviAR: 0x5ba4e4,
	eviPT: 0x0066BF,
	eviPTemissive: 0x000040,
	vuotoPT: 0x000000,
	vuotoPTemissive: 0x191933,
	pienoPT: 0x000000,
	pienoPTemissive: 0xFF5900,
	dolorePT: 0x990000,
	dolorePTemissive: 0xff00a8,
	
	
	
	
	biancoPT: 0xFFFFFF,
	gialloPT: 0xFFCC00,
	guide: 0xFFFFFF,
	group: 0x0066BF,
	LM: 0x008800,//0x0066BF,
	needle: 0xFFFFFF,
	note: 0xFFAA00,
	schNeutro: 0x0000FF,
	schPieno: 0xFF0000,
	schVuoto: 0x00FF00
}

function cloneMAT(mat,par){
	var matCloned = mat.clone();
	matCloned.setValues(par);
	return matCloned;
}


// LINEE
SET.MAT = {
	opArea: 0.4,
	opAreaOn: 0.65,
	opAreaSel: 0.85,
	opAreaEvi: 0.55,
	opAreaEviOn: 0.76,
	opAreaEviSel: 1,
	opLine: 0.6,
	opLineContr: 0.2,
	opPoint: 1,
	opPointContr: 0.3,
	line: new THREE.LineBasicMaterial( {
		color: SET.COL.nero,
		transparent: false,
		opacity:0.5
	} ),
	lineGroup: new THREE.LineBasicMaterial( {
		color: SET.COL.group,
		transparent: false,
		opacity:0.5
	} ),
	lineLM: new THREE.LineBasicMaterial( {
		color: SET.COL.LM,
		transparent: false,
		opacity:0.5
	} ),
	lineNeedle: new THREE.LineBasicMaterial( {
		color: SET.COL.needle,
		transparent: false,
		opacity:0.5
	} ),
	lineGuide: new THREE.LineBasicMaterial( {
		color: SET.COL.guide,
		transparent: true,
		opacity:0.6
	} ),
	
	lines: [],
	
	// PUNTI
	pointBase: new THREE.MeshStandardMaterial( {
		name: "Point Base",
		color: SET.COL.basePT,
		roughness:1,
		transparent: true
	}),
	pointBaseCIN: new THREE.MeshStandardMaterial( {
		name: "Point Base CIN",
		color: SET.COL.basePT_CIN,
		roughness:1,
		transparent: true
	}),
	pointBaseEUR: new THREE.MeshStandardMaterial( {
		name: "Point Base EUR",
		color: SET.COL.basePT_EUR,
		roughness:1,
		transparent: true
	}),
	pointOver: new THREE.MeshStandardMaterial( {
		name: "Point Over",
		color: SET.COL.overPT,
		roughness:1,
		transparent: true
	}),
	pointOverCIN: new THREE.MeshStandardMaterial( {
		name: "Point Over CIN",
		color: SET.COL.overPT_CIN,
		roughness:1,
		transparent: true
	}),
	pointOverEUR: new THREE.MeshStandardMaterial( {
		name: "Point Over EUR",
		color: SET.COL.overPT_EUR,
		roughness:1,
		transparent: true
	}),
	pointNote: new THREE.MeshStandardMaterial( {
		name: "Point Note",
		color: SET.COL.notePT,
		emissive: SET.COL.notePTemissive,
		roughness:1,
		transparent: true
	}),
	pointTrasp: new THREE.MeshStandardMaterial( {
		name: "Point Trasp",
		roughness:1, 
		premultipliedAlpha: true, // per visualizzare il colore sul fondo scuro
		side: 2, // per visualizzare il colore sul fondo scuro
		metalness: 0, // per visualizzare il colore sul fondo scuro
		transparent:true, 
		opacity: 0, 
		visible:false,
		depthWrite: false // !!!! per le trasparenze del pulse (senza i pallini vengono tagliati
	} ),
	pointOn: new THREE.MeshStandardMaterial( {
		name: "Point On",
		color: SET.COL.sel,
		roughness:1,
		transparent: true
	}),
	pointSel: new THREE.MeshStandardMaterial( {
		name: "SEL",
		color: SET.COL.sel, /* 0xFFFFFF */
		roughness:1,
		transparent: true
	}),
	pointSelNote: new THREE.MeshStandardMaterial( {
		name: "SEL note",
		color: SET.COL.notePTSel,
		emissive: SET.COL.notePTemissive,
		roughness:1,
		transparent: true
	}),
	pointSel2: new THREE.MeshStandardMaterial( {
		name: "SEL 2",
		side: 3,
		color: 0xFFFFFF, /* COLsel, */
		roughness:1,
		transparent: true,
		blending: 2,
		opacity: 0.2,
		visible: false
	}),
	pointEvi: new THREE.MeshStandardMaterial( {
		color: SET.COL.eviPT,
		emissive: SET.COL.eviPTemissive,
		depthWrite: false,
		roughness:1,
		transparent: true,
		opacity: 0.5
	}),
	pointPieno: new THREE.MeshStandardMaterial( {
		color: SET.COL.pienoPT,
		emissive: SET.COL.pienoPTemissive,
		depthWrite: false,
		roughness:1,
		transparent: true,
		opacity: 0.6
	}),
	pointVuoto: new THREE.MeshStandardMaterial( {
		color: SET.COL.vuotoPT,
		emissive: SET.COL.vuotoPTemissive,
		depthWrite: false,
		roughness:1,
		transparent: true,
		opacity: 0.4
	}),
	pointDolore: new THREE.MeshStandardMaterial( {
		color: SET.COL.dolorePT,
		emissive: SET.COL.dolorePTemissive,
		depthWrite: false,
		roughness:1,
		transparent: true,
		opacity: 0.4
	}),
	pointBianco: new THREE.MeshStandardMaterial( {
		color: SET.COL.biancoPT,
		emissive: SET.COL.biancoPT,
		roughness:1,
		transparent: true,
		opacity: 0.6
	}),
	
	
	areaBase: new THREE.MeshStandardMaterial( {
		name: "materiale Area",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.baseAR,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	areaBaseEUR: new THREE.MeshStandardMaterial( {
		name: "materiale Area EUR",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.baseAR_EUR,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	areaBaseCIN: new THREE.MeshStandardMaterial( {
		name: "materiale Area CIN",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.baseAR_CIN,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	areaOver: new THREE.MeshStandardMaterial( {
		name: "materiale Area OVER",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.overAR,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	areaOverEUR: new THREE.MeshStandardMaterial( {
		name: "materiale Area OVER EUR",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.overAR_EUR,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	areaOverCIN: new THREE.MeshStandardMaterial( {
		name: "materiale Area OVER CIN",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.overAR_CIN,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	
	areaSel: new THREE.MeshStandardMaterial( {
		name: "materiale Area SEL",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.selAR,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.45
	}),
	areaOverSel: new THREE.MeshStandardMaterial( {
		name: "materiale Area SEL",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.selAR,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.65
	}),
	
	areaEvi: new THREE.MeshStandardMaterial( {
		name: "materiale Area EVI",
		color: SET.COL.eviPT,
		emissive: SET.COL.eviPTemissive,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.7
	}),
	areaOverEvi: new THREE.MeshStandardMaterial( {
		name: "materiale Area EVI OVER",
		color: SET.COL.eviAR,
		emissive: SET.COL.eviPTemissive,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.7
	}),
	
	
	materialAree: new THREE.MeshStandardMaterial( {
		name: "mappa aree",
		flatShading:false,
		color: new THREE.Color( 1, 1, 1 ),
		transparent:true,
		roughness:0.7,
		side: 3,
		needsUpdate: true,
		bumpScale: 0.006
	} ),
	mappe: {},
	mappaAree: function( ini=false ){
		// carico tutte le mappe
		nImg = 0;
		var els = GEOMETRIE.mappe;
		for(e=0;e<els.length;e++){
			var imageEar = new Image();
			imageEar.src = els[e].img;
			SET.MAT.mappe[els[e].name] = new THREE.Texture();
			SET.MAT.mappe[els[e].name].image = imageEar;
			imageEar.onload = (function() {
				SET.MAT.mappe[els[e].name].needsUpdate = true;
			})(els[e]);
			if(__(els[e].imgFlip,'')){
				var imageEarFlip = new Image();
				imageEarFlip.src = els[e].imgFlip;
				SET.MAT.mappe[els[e].name+"Flip"] = new THREE.Texture();
				SET.MAT.mappe[els[e].name+"Flip"].image = imageEarFlip;
				imageEarFlip.onload = (function() {
					SET.MAT.mappe[els[e].name+"Flip"].needsUpdate = true;
				})(els[e]);
			}
		}
		if(ini)SET.MAT.applicaMappa(localStorage.imgMappa,ini);
	},
	applicaMappa: function( id, ini ){
		if(!globals.modello.cartella)return;
		var el = SET.MAT.mappe[id];
		if(MODELLO.flip){
			if(SET.MAT.mappe[id+"Flip"])el = SET.MAT.mappe[id+"Flip"];
		}
		el.needsUpdate = true;
		MODELLO.MAT.materialMuscoli[0].map = el;
		MODELLO.swMuscle(1);
		if(globals.modello.cartella && ini)setTimeout(function(){MODELLO.op('Pelle',1);},500);
	},
	setAlphaMap: function( zona, act ){
		var pass = false;
		if(!globals.modello.cartella)return;
		if(act == 'clic'){
			if(SET.maskAtt){
				document.getElementById("zone_"+SET.maskAtt).classList.remove("selectedZone");
				if(zona != SET.maskAtt){
					SET.maskAtt = zona;
					act = 'over';
					pass = true;
				}else SET.maskAtt = '';
			}else SET.maskAtt = zona;
			if(SET.maskAtt){
				document.getElementById("e_legenda").classList.add("legendaSelected");
				document.getElementById("zone_"+SET.maskAtt).classList.add("selectedZone");
			}else document.getElementById("e_legenda").classList.remove("legendaSelected");
		}
		if(!SET.maskAtt || pass){
			if(act == 'over'){
				var IMG = 'data:image/jpeg;base64,' + GEOMETRIE.masks[zona];
				var img = Array();
				img = new Image();
				img.src =  IMG;
				var mask = new THREE.Texture();
				mask.image = img;
				img.n = zona;
				img.onload = function() {
					var zona = this.n;
					try{
						mask.needsUpdate = true;
						MODELLO.MAT.materialMuscoli[0].alphaMap = mask;
						MODELLO.meshPelle.children[0].material.alphaMap = mask;
						MODELLO.meshPelle.children[0].material.needsUpdate = true;
					} catch(err){};
				};
			}
			if(act == 'out'){
				MODELLO.MAT.materialMuscoli[0].alphaMap = null;
				MODELLO.meshPelle.children[0].material.alphaMap = null;
				MODELLO.meshPelle.children[0].material.needsUpdate = true;
			}
		}
	}
}