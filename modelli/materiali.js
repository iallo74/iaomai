
MODELLO.MAT = {
	//materialPelle: null,
	//materialOssa: null,
	//materialVisceri: null,
	//materialOrganoSel: null,
	materialAree: [],
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
		name: "materiale pelle mulatta",
		color: new THREE.Color( 0.45, 0.37, 0.3 ),
		flatShading:false,
		transparent:true,
		roughness:0.475,
		metalness:0,
		side: 3
	} ),
	materialPelle_nera: new THREE.MeshStandardMaterial( { // PELLE
		name: "materiale pelle nera",
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
		name: "materiale ossa over",
		color: new THREE.Color( 1, 1, 1 ),
		color: new THREE.Color( 1, 0.9, 0.8 ),
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness: 0.4,
		side: 3
	} ),
	
	materialOssaCartilagini: new THREE.MeshStandardMaterial( { // CARTILAGINI
		name: "materiale cartilagini",
		color: new THREE.Color( 0.89, 0.89, 0.99 ),
		flatShading:false,
		transparent:true,
		opacity:0.6,//0.6,
		roughness:1,
		metalness: 0.4,
		side: 3
	} ),
	materialOssaOverCartilagini: new THREE.MeshStandardMaterial( { // CARTILAGINI rollOVER
		name: "materiale cartilagini over",
		color: new THREE.Color( 0.92, 0.92, 1 ),
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness: 0.4,
		side: 3
	} ),
	/* materialOssaLegamenti: new THREE.MeshStandardMaterial( { // LEGAMENTI
		name: "materiale legamenti",
		color: new THREE.Color( 0.89, 0.99, 0.93 ),
		flatShading:false,
		transparent:true,
		opacity:1,//0.6,
		roughness:1,
		metalness: 0.4,
		side: 3
	} ), */
	materialLegamenti: new THREE.MeshStandardMaterial( { // LEGAMENTI
		name: "materiale legamenti",
		/* color: new THREE.Color( 0.89, 0.99, 0.93 ), */
		color: new THREE.Color( 0.55, 0.8, 0.65 ),
		flatShading:false,
		transparent:true,
		opacity:1,//0.6,
		roughness:1,
		metalness: 0.4,
		side: 3
	} ),
	materialLegamentiOver: new THREE.MeshStandardMaterial( { // LEGAMENTI rollOVER
		name: "materiale legamenti over",
		color: new THREE.Color( 1, 0.9, 0.8 ),
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness: 0.4,
		side: 3
	} ),

	materialMuscoli3d: new THREE.MeshStandardMaterial( { // MUSCOLI 3D
		name: "materiale muscoli 3d",
		flatShading:false,
		color: new THREE.Color( 1, 1, 1 ),
		transparent:true,
		roughness:0.7,
		side: 3,
		needsUpdate: true,
		bumpScale: 0.006
	} ),
	materialMuscoli3dLeg: new THREE.MeshStandardMaterial( { // MUSCOLI 3D LEG
		name: "materiale muscoli 3d Leg",
		flatShading:false,
		color: new THREE.Color( 1, 1, 1 ),
		transparent:true,
		roughness:0.7,
		side: 3,
		needsUpdate: true,
		bumpScale: 0.006
	} ),
	materialMuscoli3dFoot: new THREE.MeshStandardMaterial( { // MUSCOLI 3D FOOT
		name: "materiale muscoli 3d Foot",
		flatShading:false,
		color: new THREE.Color( 1, 1, 1 ),
		transparent:true,
		roughness:0.7,
		side: 3,
		needsUpdate: true,
		bumpScale: 0.006
	} ),


	materialMuscoli3dOver: new THREE.MeshStandardMaterial( { // MUSCOLI 3D rollOVER
		name: "materiale muscoli 3d over",
		color: new THREE.Color( 1, 0.9, 0.8 ),
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness: 0.4,
		side: 3
	} ),
	materialMuscoli3dOverLeg: new THREE.MeshStandardMaterial( { // MUSCOLI 3D rollOVER LEG
		name: "materiale muscoli 3d over Leg",
		flatShading:false,
		color: new THREE.Color( 1, 1, 1 ),
		emissive: new THREE.Color( 0.2, 0.2, 0.2 ),
		transparent:true,
		roughness:0.7,
		side: 3,
		needsUpdate: true,
		bumpScale: 0.006
	} ),
	materialMuscoli3dOverFoot: new THREE.MeshStandardMaterial( { // MUSCOLI 3D rollOVER FOOT
		name: "materiale muscoli 3d over Foot",
		flatShading:false,
		color: new THREE.Color( 1, 1, 1 ),
		emissive: new THREE.Color( 0.2, 0.2, 0.2 ),
		transparent:true,
		roughness:0.7,
		side: 3,
		needsUpdate: true,
		bumpScale: 0.006
	} ),

	materialMuscoli3dSelLeg: new THREE.MeshStandardMaterial( { // MUSCOLI 3D Sel LEG
		name: "materiale muscoli 3D Sel LEG",
		flatShading:false,
		color: new THREE.Color( 1, 1, 1 ),
		emissive: new THREE.Color( 0.3, 0, 0.4 ),
		transparent:false,
		roughness:0.7,
		side: 2,
		depthFunc: 0,
		depthTest:true,
		needsUpdate: true,
		bumpScale: 0.006,
		opacity: 1,
		//depthFunc: 1
	} ),



	
	materialMuscoli3dSelFoot: new THREE.MeshStandardMaterial( { // MUSCOLI 3D Sel FOOT
		name: "materiale muscoli 3D Sel FOOT",
		flatShading:false,
		color: new THREE.Color( 1, 1, 1 ),
		emissive: new THREE.Color( 0.3, 0, 0.4 ),
		transparent:false,
		roughness:0.7,
		side: 2,
		depthFunc: 0,
		depthTest:true,
		needsUpdate: true,
		bumpScale: 0.006,
		opacity: 1,
		//depthFunc: 1
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


	materialVasi: new THREE.MeshStandardMaterial( { // VASI
		name: "materiale vasi e nervi",
		color: new THREE.Color( 0.52, 0.66, 0.99 ),
		flatShading:false,
		transparent:true,
		opacity:1,
		roughness:1,
		side: 3
	} ),

	materialVasiArterie: new THREE.MeshStandardMaterial( { // ARTERIE
		name: "materiale arterie",
		color: new THREE.Color( 0.2, 0.5, 0.99 ),
		flatShading:false,
		transparent:true,
		opacity:1,
		roughness:1,
		side: 3
	} ),
	materialVasiVene: new THREE.MeshStandardMaterial( { // VENE
		name: "materiale vene",
		color: new THREE.Color( 0.99, 0.2, 0.2 ),
		flatShading:false,
		transparent:true,
		opacity:1,
		roughness:1,
		side: 3
	} ),
	materialVasiLinfa: new THREE.MeshStandardMaterial( { // VASI LINFATICI
		name: "materiale linfa",
		color: new THREE.Color( 0.2, 0.6, 0.2 ),
		flatShading:false,
		transparent:true,
		opacity:1,
		roughness:1,
		side: 3
	} ),
	materialVasiNervi: new THREE.MeshStandardMaterial( { // NERVI
		name: "materiale nervi",
		color: new THREE.Color( 0.99, 0.8, 0 ),
		flatShading:false,
		transparent:true,
		opacity:1,
		roughness:1,
		side: 3
	} ),
	
	
	
	materialNERVO_TRIGEMINO: new THREE.LineBasicMaterial( {
		name: "materiale nervo trigemino",
		color: new THREE.Color( 1, 0.6, 0 ),
		depthFunc: 3,
		transparent: true,
		opacity:0.3
	} ),
	materialNERVO_VAGO: new THREE.LineBasicMaterial( {
		name: "materiale nervo vago",
		color: new THREE.Color( 0, 0.45, 0.8 ),
		depthFunc: 3,
		transparent: true,
		opacity:0.3
	} ),
	materialNERVO_OCCIPITALE_MINORE: new THREE.LineBasicMaterial( {
		name: "materiale nervo occipitale minore",
		color: new THREE.Color( 0.9, 0.2, 0 ),
		depthFunc: 3,
		transparent: true,
		opacity:0.3
	} ),
	materialNERVO_GRANDE_AURICOLARE: new THREE.LineBasicMaterial( {
		name: "materiale nervo grande auricolare",
		color: new THREE.Color( 0, 0.7, 0.3 ),
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
	materialVisceriOver: new THREE.MeshStandardMaterial( { // VISCERI rollOVER
		name: "materiale visceri over",
		color: new THREE.Color( 0.6, 0.4, 0.5 ),
		flatShading:false,
		transparent:true,
		roughness:1,
		side: 3
	} ),
	
	materialVasiEvi: new THREE.MeshStandardMaterial( { // VASI EVI
		name: "materiale vasi evi",
		color: new THREE.Color( 0.52, 0.66, 0.99 ),
		flatShading:false,
		transparent:true,
		opacity:1,
		roughness:1,
		side: 3,
		depthFunc: 1
	} ),
	materialVasiOver: new THREE.MeshStandardMaterial( { // VASI rollOVER
		name: "materiale vasi over",
		color: new THREE.Color( 0.6, 0.4, 0.5 ),
		flatShading:false,
		transparent:true,
		roughness:1,
		side: 3
	} ),
	materialOrganoSel: new THREE.MeshStandardMaterial( { // ORGANO, OSSO, VASO o LAGAMENTO SELEZIONATO
		name: "materiale organo sel",
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
		name: "materiale visceri DIS",
		color: new THREE.Color( 0.52, 0.66, 0.99 ),
		flatShading:false,
		transparent:true,
		opacity:0.3,
		roughness:1,
		side: 3
	} ),
	lineGuideSel: new THREE.LineBasicMaterial( {
		name: "materiale guide Sel",
		/*color: new THREE.Color( 0.9, 0.2, 0.5 ),*/
		color: new THREE.Color( 1, 1, 1 ),
		depthFunc: 1,
		transparent: true,
		/*opacity:0.6,*/
		opacity:0.3
	} ),
	pointTrasp: new THREE.MeshStandardMaterial( { // OSSA rollOVER
		name: "materiale punto trasparente",
		color: new THREE.Color( 1, 1, 1 ),
		transparent: true,
		opacity:0
	} ),
	pinArea: new THREE.MeshStandardMaterial( { // PIN DELLE AREE
		name: "materiale pin aree",
		/*color: new THREE.Color( 0.89, 0.56, 0.42 ),*/
		/*color: new THREE.Color( 0.96, 0.56, 0.32 ),*/
		color: new THREE.Color( 1, 1, 1 ),
		flatShading:false,
		transparent:true,
		opacity:0.5,
		roughness:1,
		side: 3
	} ),
	pinAreaTrasp: new THREE.MeshStandardMaterial( { // PIN TRASPARENTI DELLE AREE (PER IL CLICK)
		name: "materiale pin area trasparente",
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
	pinAreaDemo: new THREE.MeshStandardMaterial( { // PIN TRASPARENTI DELLE AREE (PER IL CLICK)
		name: "materiale pin area demo",
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
