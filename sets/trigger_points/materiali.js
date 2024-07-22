

// colori
SET.COL = {
	sel: 0xFF0000,
	selInt: 0xCC7F7F,
	musc: 0xFF0000,
	lineMusc: 0x575454,
	basePT: 0x7F7F7F,
	basePTmusc: 0x55FF55,
	base: 0x637281,
	over: 0xFFFFFF,
	overPT: 0xAABBCC,
	notePT: 0xffd000,
	notePTSel: 0xff9900,
	notePTemissive: 0x333300,
	
	
	/* VERSIONE CON PALLINI BLU */
	eviPT: 0x0066BF,
	eviPTemissive: 0x000040,
	vuotoPT: 0x000000,
	vuotoPTemissive: 0x191933,
	pienoPT: 0x000000,
	pienoPTemissive: 0xFF5900,
	dolorePT: 0x990000,
	dolorePTemissive: 0xff00a8,
	
	sel2: 0x0072ff,
	sel3: 0xbf870f,
	sel4: 0x3a8a05,
	sel5: 0x940692,
	
	selMT: 0x0090ff,
	
	biancoPT: 0xFFFFFF,
	gialloPT: 0xFFCC00,
	guide: 0xFFFFFF,
	note: 0xFFAA00,
	schNeutro: 0x0000FF,
	schPieno: 0xFF0000,
	schVuoto: 0x00FF00,
	contrastMethod: false
}

SET.colsElementi = {
	"none": 0x1762AE,
	"legno": 0x007700,
	"fuoco":0xFF0000,
	"fuoco_supplementare":0x990000,
	"terra":0xCC6600,
	"aria":0xFFFFFF,
	"acqua":0x000000
}
SET.colsElementiAreasView = {
	"none": 0x0F82F7,
	"legno": 0x4CE600,
	"fuoco":0xFF0000,
	"fuoco_supplementare":0x990000,
	"terra":0xFCCC03,
	"aria":0xFFFFFF,
	"acqua":0x000000
}

function cloneMAT(mat,par){
	let matCloned = mat.clone();
	matCloned.setValues(par);
	return matCloned;
}


// LINEE
SET.MAT = {
	opLine: 0.5,
	opLineContr: 0.2,
	opPoint: 1,
	opPointContr: 0.3,
	lineWidth: 0.002,
	lineSel: new THREE.LineMaterial( {
		name: "lineSel",
		color: SET.COL.sel,
		transparent: true,
		linewidth: 0.002,
		dashed: false,
		depthFunc: 1
	} ),
	lineYang: new THREE.LineMaterial( {
		name: "lineYang",
		color: SET.COL.base,
		transparent: true,
		linewidth: 0.002,
		dashed: false
	} ),
	lineYin: new THREE.LineMaterial( {
		name: "lineYin",
		color: SET.COL.base,
		transparent: true,
		linewidth: 0.002,
		dashed: true,
		defines: {
			USE_DASH: ""
		},
		needsUpdate: true,
		dashScale: 10,
		dashSize: 1,
		gapSize:0.5,
		dashSize: 1,
		gapSize:0.5
	} ),
	
	lineGuide: new THREE.LineMaterial( {
		name: "lineGuide",
		color: SET.COL.guide,
		transparent: true,
		linewidth: 0.0015,
		dashed: false,
		depthFunc: 3
	} ),
	
	lineYangOn: [],
	lineYinOn: [],
	lineYangIntOn: [],
	lineYinIntOn: [],
	
	// PUNTI
	pointBase: new THREE.MeshStandardMaterial( {
		name: "pointBase",
		color: SET.COL.basePT,
		roughness:1,
		transparent: true,
		depthWrite: false
	}),
	pointOver: new THREE.MeshStandardMaterial( {
		name: "pointOver",
		color: SET.COL.overPT,
		roughness:1,
		transparent: true
	}),
	pointNote: new THREE.MeshStandardMaterial( {
		name: "pointNote",
		color: SET.COL.notePT,
		emissive: SET.COL.notePTemissive,
		roughness:1,
		transparent: true
	}),
	pointTrasp: new THREE.MeshStandardMaterial( {
		name: "pointTrasp",
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
		name: "pointOn",
		color: SET.COL.sel,
		roughness:1,
		transparent: true
	}),
	pointSel: new THREE.MeshStandardMaterial( {
		name: "pointSel",
		color: SET.COL.sel, /* 0xFFFFFF */
		roughness:1,
		transparent: true
	}),
	pointSelInt: new THREE.MeshStandardMaterial( {
		name: "pointSelInt",
		color: SET.COL.sel, /* 0xFFFFFF */
		roughness:1,
		depthFunc:1,
		transparent: true
	}),
	pointSelNote: new THREE.MeshStandardMaterial( {
		name: "pointSelNote",
		color: SET.COL.notePTSel,
		emissive: SET.COL.notePTemissive,
		roughness:1,
		transparent: true
	}),
	pointSelNoteInt: new THREE.MeshStandardMaterial( {
		name: "pointSelNoteInt",
		color: SET.COL.notePTSel,
		emissive: SET.COL.notePTemissive,
		roughness:1,
		depthFunc:1,
		transparent: true
	}),
	pointSel2: new THREE.MeshStandardMaterial( {
		name: "pointSel2",
		side: 3,
		color: 0xFFFFFF,
		roughness:1,
		transparent: true,
		blending: 2,
		opacity: 0.2,
		visible: false
	}),
	pointEvi: new THREE.MeshStandardMaterial( {
		name: "pointEvi",
		color: SET.COL.eviPT,
		emissive: SET.COL.eviPTemissive,
		depthWrite: false,
		roughness:1,
		transparent: true,
		opacity: 0.5
	}),
	pointPieno: new THREE.MeshStandardMaterial( {
		name: "pointPieno",
		color: SET.COL.pienoPT,
		emissive: SET.COL.pienoPTemissive,
		depthWrite: false,
		roughness:1,
		transparent: true,
		opacity: 0.6
	}),
	pointVuoto: new THREE.MeshStandardMaterial( {
		name: "pointVuoto",
		color: SET.COL.vuotoPT,
		emissive: SET.COL.vuotoPTemissive,
		depthWrite: false,
		roughness:1,
		transparent: true,
		opacity: 0.4
	}),
	pointDolore: new THREE.MeshStandardMaterial( {
		name: "pointDolore",
		color: SET.COL.dolorePT,
		emissive: SET.COL.dolorePTemissive,
		depthWrite: false,
		roughness:1,
		transparent: true,
		opacity: 0.4
	}),
	pointBianco: new THREE.MeshStandardMaterial( {
		name: "pointBianco",
		color: SET.COL.biancoPT,
		emissive: SET.COL.biancoPT,
		roughness:1,
		transparent: true,
		opacity: 0.6
	})
};

SET.MAT.lineYang.uniforms.opacity.value = SET.MAT.opLine;
SET.MAT.lineYin.uniforms.opacity.value = SET.MAT.opLine;
SET.MAT.lineGuide.uniforms.opacity.value = SET.MAT.opLine;
SET.MAT.lineSel.uniforms.opacity.value = SET.MAT.opLine;

SET.MAT.lineYangInt = cloneMAT(SET.MAT.lineYang,{color:SET.COL.selInt, depthFunc: 1, visible: false});
SET.MAT.lineYangOver = cloneMAT(SET.MAT.lineYang,{color: SET.COL.over});
SET.MAT.lineYangIntOver = cloneMAT(SET.MAT.lineYangInt,{color: SET.COL.over, depthFunc: 1, visible: false});
	
SET.MAT.lineYinInt = cloneMAT(SET.MAT.lineYin,{color:SET.COL.selInt, depthFunc: 1, visible: false});
SET.MAT.lineYinOver = cloneMAT(SET.MAT.lineYin,{color: SET.COL.over});
SET.MAT.lineYinIntOver = cloneMAT(SET.MAT.lineYinInt,{color: SET.COL.over, depthFunc: 1, visible: false});

SET._setLineMaterials = function(){

	for(let elemento in SET.colsElementi){
		
		let col = areasView ? SET.colsElementiAreasView[elemento] : SET.colsElementi[elemento],
			col3 = SET.COL.basePT,
			col4 = SET.COL.base;
		if( SET.COL.contrastMethod){
			if(!areasView)col =  SET.COL.sel;
			else col =  SET.COL.musc;
		}
		if(areasView){
			col3 = SET.COL.basePTmusc;
			col4 = SET.COL.lineMusc;
		}
		
		SET.MAT.pointBase.color.setHex(col3);
		SET.MAT.lineYang.color.setHex(col4);
		SET.MAT.lineYin.color.setHex(col4);
		depthFunc = 3;
		if(MODELLO.opAtt<1)depthFunc = 1;

		SET.MAT.lineYangOn[elemento] = new THREE.LineMaterial( {

			name: "lineYangOn["+elemento+"]",
			color: new THREE.Color(col),
			transparent: true,
			linewidth: SET.MAT.lineWidth,
			dashed: false
	
		} );

		SET.MAT.lineYinOn[elemento] = new THREE.LineMaterial( {

			name: "lineYinOn["+elemento+"]",
			color: new THREE.Color(col),
			transparent: true,
			linewidth: SET.MAT.lineWidth,
			dashed: true,
			defines: {
				USE_DASH: ""
			},
			needsUpdate: true,
			dashScale: 10,
			dashSize: 1,
			gapSize:0.5
	
		} );
		SET.MAT.lineYangIntOn[elemento] = new THREE.LineMaterial( {

			name: "lineYangIntOn["+elemento+"]",
			color: new THREE.Color(col),
			transparent: true,
			depthFunc: depthFunc,
			linewidth: SET.MAT.lineWidth,
			dashed: false
	
		} );
		SET.MAT.lineYangIntOn[elemento].uniforms.opacity.value = 0.3;


		SET.MAT.lineYinIntOn[elemento] = new THREE.LineMaterial( {

			name: "lineYinIntOn["+elemento+"]",
			color: new THREE.Color(col),
			transparent: true,
			depthFunc: depthFunc,
			linewidth: SET.MAT.lineWidth,
			dashed: true,
			defines: {
				USE_DASH: ""
			},
			needsUpdate: true,
			dashScale: 10,
			dashSize: 1,
			gapSize:0.5
	
		} );
		SET.MAT.lineYinIntOn[elemento].uniforms.opacity.value = 0.3;
	}
	SET.MAT.lineYangInt.linewidth = SET.MAT.lineWidth;
	SET.MAT.lineYangOver.linewidth = SET.MAT.lineWidth;
	SET.MAT.lineYangIntOver.linewidth = SET.MAT.lineWidth;
		
	SET.MAT.lineYinInt.linewidth = SET.MAT.lineWidth;
	SET.MAT.lineYinOver.linewidth = SET.MAT.lineWidth;
	SET.MAT.lineYinIntOver.linewidth = SET.MAT.lineWidth;
}
	
SET._setResolution = function(){
	let w = canvas.scrollWidth/canvas.scrollHeight;
	for(let elemento in SET.colsElementi){
		SET.MAT.lineYangOn[elemento].resolution.set( w,1 );
		SET.MAT.lineYinOn[elemento].resolution.set( w,1 );
		SET.MAT.lineYangIntOn[elemento].resolution.set( w,1 );
		SET.MAT.lineYinIntOn[elemento].resolution.set( w,1 );
		
	}
		
	
	SET.MAT.lineYang.resolution.set( w,1 );
	SET.MAT.lineYangInt.resolution.set( w,1 );
	SET.MAT.lineYangOver.resolution.set( w,1 );
	SET.MAT.lineYangIntOver.resolution.set( w,1 );
	SET.MAT.lineYin.resolution.set( w,1 );
	SET.MAT.lineYinInt.resolution.set( w,1 );
	SET.MAT.lineYinOver.resolution.set( w,1 );
	SET.MAT.lineYinIntOver.resolution.set( w,1 );
}