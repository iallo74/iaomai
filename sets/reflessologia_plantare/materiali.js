

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
	col9: 0x33b2b2,
	
	selAR: 0xFF0000,
	overAR: 0x666666,
	
	eviAR: 0x5ba4e4,
	eviPT: 0x0066BF,
	eviPTemissive: 0x000040,
	
	guide: 0xFFFFFF
}

function cloneMAT(mat,par){
	let matCloned = mat.clone();
	matCloned.setValues(par);
	return matCloned;
}


// LINEE
SET.MAT = {
	opArea: 0.4,
	opAreaPat: 0.4,
	opAreaOn: 0.65,
	opAreaWhenSel: 0.2,
	opAreaWhenSelOn: 0.37,
	
	opAreaSel: 0.85,
	opAreaEvi: 0.7,
	opAreaEviOn: 0.76,
	opAreaEviSel: 1,
	opLine: 0.6,
	opLineContr: 0.2,
	
	line: new THREE.LineBasicMaterial( {
		color: SET.COL.nero,
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
		opacity: 0.8
	}),
	
}