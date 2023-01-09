
MODELLO.MAT = {
	//materialPelle: null,
	//materialOssa: null,
	//materialVisceri: null,
	//materialOrganoSel: null,
	materialMuscoli: [],
	colsVisceri: [
		"#84a8fc",
		"#F0A095",//"#ffcc7f",
		"#84a8fc"
	],
	colsPelle: [
		"#a58f7f",
		"#a58f7f",
		"#a3897d"
	],
	
	
	materialPelle: new THREE.MeshStandardMaterial( { // PELLE
		name: "materiale pelle",
		color: new THREE.Color( 0.65, 0.56, 0.5 ),
		flatShading:false,
		transparent:true,
		roughness:0.5,
		metalness:0,
		side: 3
	} ),
	materialPelle_mulatta: new THREE.MeshStandardMaterial( { // PELLE
		name: "materiale pelle",
		color: new THREE.Color( 0.45, 0.37, 0.3 ),
		flatShading:false,
		transparent:true,
		roughness:0.475,
		metalness:0,
		side: 3
	} ),
	materialPelle_nera: new THREE.MeshStandardMaterial( { // PELLE
		name: "materiale pelle",
		color: new THREE.Color( 0.32, 0.27, 0.23 ),
		flatShading:false,
		transparent:true,
		roughness:0.45,
		metalness:0,
		side: 3
	} ),
	materialOssa: new THREE.MeshStandardMaterial( { // OSSA
		name: "materiale ossa",
		color: new THREE.Color( 1, 1, 1 ),
		flatShading:false,
		transparent:true,
		opacity:1,//0.6,
		roughness:1,
		metalness: 0.4,
		side: 3
	} ),
	materialOssaOver: new THREE.MeshStandardMaterial( { // OSSA rollOVER
		color: new THREE.Color( 1, 0.9, 0.8 ),
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness: 0.4,
		side: 3
	} ),
	materialVisceri: new THREE.MeshStandardMaterial( { // VISCERI
		name: "materiale visceri",
		color: new THREE.Color( 0.52, 0.66, 0.99 ),
		flatShading:false,
		transparent:true,
		opacity:1,
		roughness:1,
		side: 3
	} ),
	
	
	
	materialNERVO_TRIGEMINO: new THREE.LineBasicMaterial( {
		color: new THREE.Color( 1, 0.6, 0 ),
		depthFunc: 3,
		transparent: true,
		opacity:0.3
	} ),
	materialNERVO_VAGO: new THREE.LineBasicMaterial( {
		color: new THREE.Color( 0, 0.45, 0.8 ),
		depthFunc: 3,
		transparent: true,
		opacity:0.3
	} ),
	materialNERVO_OCCIPITALE: new THREE.LineBasicMaterial( {
		color: new THREE.Color( 0.9, 0.2, 0 ),
		depthFunc: 3,
		transparent: true,
		opacity:0.3
	} ),
	
	
	
	materialVisceriEvi: new THREE.MeshStandardMaterial( { // VISCERI EVI
		name: "materiale visceri evi",
		color: new THREE.Color( 0.52, 0.66, 0.99 ),
		flatShading:false,
		transparent:true,
		opacity:1,
		roughness:1,
		side: 3,
		depthFunc: 1
	} ),
	/*materialVisceri_1: new THREE.MeshStandardMaterial( { // VISCERI
		name: "materiale visceri",
		color: new THREE.Color( 0.3, 0.8, 1 ),
		flatShading:false,
		transparent:true,
		opacity:0.6,
		roughness:1,
		side: 3
	} ),*/
	materialVisceriOver: new THREE.MeshStandardMaterial( { // VISCERI rollOVER
		color: new THREE.Color( 0.6, 0.4, 0.5 ),
		flatShading:false,
		transparent:true,
		roughness:1,
		side: 3
	} ),
	materialOrganoSel: new THREE.MeshStandardMaterial( { // ORGANO O OSSO SELEZIONATO
		color:  new THREE.Color( 0.9, 0.2, 0.5 ),
		flatShading:false,
		transparent:false,
		opacity:1,
		roughness:0.8,
		metalness:0.4,
		side: 2,
		depthFunc: 0,
		depthTest:true,
		needsUpdate: true,
		name: "organoSel"
	} ),
	materialVisceriDis: new THREE.MeshStandardMaterial( { // VISCERI
		name: "organoDis",
		color: new THREE.Color( 0.52, 0.66, 0.99 ),
		flatShading:false,
		transparent:true,
		opacity:0.3,
		roughness:1,
		side: 3
	} ),
	lineGuideSel: new THREE.LineBasicMaterial( {
		/*color: new THREE.Color( 0.9, 0.2, 0.5 ),*/
		color: new THREE.Color( 1, 1, 1 ),
		depthFunc: 1,
		transparent: true,
		/*opacity:0.6,*/
		opacity:0.3
	} ),
	pointTrasp: new THREE.MeshStandardMaterial( { // OSSA rollOVER
		color: new THREE.Color( 1, 1, 1 ),
		transparent: true,
		opacity:0
	} ),
	pinMuscolo: new THREE.MeshStandardMaterial( { // PIN DEI MUSCOLI
		name: "pin muscoli",
		/*color: new THREE.Color( 0.89, 0.56, 0.42 ),*/
		/*color: new THREE.Color( 0.96, 0.56, 0.32 ),*/
		color: new THREE.Color( 1, 1, 1 ),
		flatShading:false,
		transparent:true,
		opacity:0.5,
		roughness:1,
		side: 3
	} ),
	pinMuscoloTrasp: new THREE.MeshStandardMaterial( { // PIN TRASPARENTI DEI MUSCOLI (PER IL CLICK)
		color: new THREE.Color( 0, 0, 0 ),
		roughness:1, 
		premultipliedAlpha: true,
		side: 3,
		metalness: 0,
		transparent:true, 
		opacity: 0.2, 
		visible:true,
		depthFunc: 3,
		depthWrite: false
	} ),
	pinMuscoloDemo: new THREE.MeshStandardMaterial( { // PIN TRASPARENTI DEI MUSCOLI (PER IL CLICK)
		color: new THREE.Color( 0, 0, 0 ),
		emissive: new THREE.Color( 0, 0, 1 ),
		roughness:1, 
		premultipliedAlpha: true,
		side: 3,
		metalness: 0,
		transparent:true, 
		opacity: 0.4, 
		visible:true,
		depthFunc: 3,
		depthWrite: false
	} )
}
