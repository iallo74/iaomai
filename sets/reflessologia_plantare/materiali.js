

// colori
SET.COL = {
	nero: 0x000000,
	
	col1: 0x0858b1,
	col2: 0xffffff,
	col3: 0xff4C00,
	col4: 0x930cca,
	col5: 0x4c3560,
	col6: 0x846a47,
	col7: 0x2dac0b,
	col8: 0xffcc2f,
	col9: 0x66cccc,


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
	opAreaWhenSel: 0.2,
	opAreaWhenSelOn: 0.37,
	
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
	
	
	
	
	area1Base: new THREE.MeshStandardMaterial( {
		name: "materiale APPARATO OSTEO-ARTICOLARE",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col1,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	area2Base: new THREE.MeshStandardMaterial( {
		name: "materiale SISTEMA MUSCOLARE",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col2,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	area3Base: new THREE.MeshStandardMaterial( {
		name: "materiale SISTEMA CARDIO-CIRCOLATORIO",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col3,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	area4Base: new THREE.MeshStandardMaterial( {
		name: "materiale SISTEMA LINFATICO",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col4,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	area5Base: new THREE.MeshStandardMaterial( {
		name: "materiale APPARATO RESPIRATORIO",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col5,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	area6Base: new THREE.MeshStandardMaterial( {
		name: "materiale APPARATO DIGERENTE",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col6,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	area7Base: new THREE.MeshStandardMaterial( {
		name: "materiale APPARATO UROGENITALE",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col7,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	area8Base: new THREE.MeshStandardMaterial( {
		name: "materiale SISTEMA NERVOSO",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col8,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),
	area9Base: new THREE.MeshStandardMaterial( {
		name: "materiale SISTEMA ENDOCRINO",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col9,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.4
	}),

	
	area1Over: new THREE.MeshStandardMaterial( {
		name: "materiale APPARATO OSTEO-ARTICOLARE over",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col1,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.65
	}),
	area2Over: new THREE.MeshStandardMaterial( {
		name: "materiale SISTEMA MUSCOLARE over",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col2,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.65
	}),
	area3Over: new THREE.MeshStandardMaterial( {
		name: "materiale SISTEMA CARDIO-CIRCOLATORIO over",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col3,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.65
	}),
	area4Over: new THREE.MeshStandardMaterial( {
		name: "materiale SISTEMA LINFATICO over",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col4,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.65
	}),
	area5Over: new THREE.MeshStandardMaterial( {
		name: "materiale APPARATO RESPIRATORIO over",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col5,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.65
	}),
	area6Over: new THREE.MeshStandardMaterial( {
		name: "materiale APPARATO DIGERENTE over",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col6,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.65
	}),
	area7Over: new THREE.MeshStandardMaterial( {
		name: "materiale APPARATO UROGENITALE over",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col7,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.65
	}),
	area8Over: new THREE.MeshStandardMaterial( {
		name: "materiale SISTEMA NERVOSO over",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col8,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.65
	}),
	area9Over: new THREE.MeshStandardMaterial( {
		name: "materiale SISTEMA ENDOCRINO over",
		color: new THREE.Color( 0, 0, 0 ),
		emissive: SET.COL.col9,
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.65
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
	
}