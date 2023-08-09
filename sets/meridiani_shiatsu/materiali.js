

// colori
SET.COL = {
	sel: 0xFF0000,
	musc: 0x33FF00, // 0x000000;
	lineMusc: 0x99B2CC,
	basePT: 0x7F7F7F, // 0x8899AA (vecchio)	
	basePTmusc: 0xFFFFFF,
	base: 0x637281,
	over: 0xFFFFFF,
	overPT: 0xAABBCC,
	notePT: 0xffd000,
	notePTSel: 0xff9900,
	notePTemissive: 0x333300,
	
	/*eviPT: 0x0066FF,
	pienoPT: 0x009900,
	vuotoPT: 0xCC0000,*/
	
	/*eviPT: 0x0000FF,
	eviPTemissive: 0x0000FF,*/
	
	
	/* VERSIONE CON PALLINI BLU */
	eviPT: 0x0066BF,
	eviFR: 0x000088,
	eviPTemissive: 0x000040,
	vuotoPT: 0x000000,
	vuotoPTemissive: 0x191933,
	pienoPT: 0x000000,
	pienoPTemissive: 0xFF5900,
	dolorePT: 0x990000,
	dolorePTemissive: 0xff00a8,
	
	
	/* VERSIONE CON PALLINI ROSSI */
	/*
	eviPT: 0xFF0000,
	eviPTemissive: 0x000000,
	vuotoPT: 0xFF6600,
	vuotoPTemissive: 0x000000,
	pienoPT: 0x991999,
	pienoPTemissive: 0x000000,
	*/
	
	
	
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
	"none": 0x006699,
	"legno": 0x009900,
	"fuoco":0xFF0000,
	"fuoco_supplementare":0x990000,
	"terra":0xFF8800,
	"aria":0xFFFFFF,
	"acqua":0x000000
}

function cloneMAT(mat,par){
	var matCloned = mat.clone();
	matCloned.setValues(par);
	return matCloned;
}


// LINEE
SET.MAT = {
	opLine: 0.6,
	opLineContr: 0.2,
	opPoint: 1,
	opPointContr: 0.3,
	lineYang: new THREE.LineBasicMaterial( {
		color: SET.COL.base,
		transparent: true,
		opacity:0.6
	} ),
	lineYin: new THREE.LineDashedMaterial( {
		color: SET.COL.base,
		scale: 10,
		dashSize: 1,
		gapSize: .5,
		transparent: true,
		opacity:0.6
	} ),
	lineGuide: new THREE.LineBasicMaterial( {
		color: SET.COL.guide,
		transparent: true,
		opacity:0.6
	} ),
	lineFrecce: new THREE.LineBasicMaterial( {
		color: SET.COL.eviPT,
		transparent: true,
		opacity:0.8
	} ),
	lineFrecceEvi: new THREE.LineBasicMaterial( {
		color: SET.COL.eviFR,
		transparent: true,
		opacity:0.8
	} ),
	lineOn_: new THREE.ShaderMaterial( {
		uniforms: {
			dashSize: {value: 0.2},
			gapSize: {value: 0.3},
			dotSize: {value: 0.2},
			opacity: {value: 1.0},
			verso: {value: -1.0 }, // added uniform
			time: {value: 0} // added uniform
		}
	} ),
	vertexShader: 'attribute float lineDistance;varying float vLineDistance;void main() {vLineDistance = lineDistance;vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );gl_Position = projectionMatrix * mvPosition;}',
	fragmentShader: 'uniform vec3 diffuse;uniform float opacity;uniform float time;uniform float verso; uniform float dashSize;uniform float gapSize;uniform float dotSize;varying float vLineDistance;void main() {float totalSize = dashSize + gapSize;float modulo = mod( vLineDistance + (time*verso), totalSize );float dotDistance = dashSize + (gapSize * .5) - (dotSize * .5);if ( modulo > dashSize && mod(modulo, dotDistance) > dotSize ) {discard;}gl_FragColor = vec4( diffuse, opacity );}',
	
	lineOn: [],
	lineIntOn: [],
	lineOnMAS: [],
	lineIntOnMAS: [],
	lineOnMASYin: [],
	lineIntOnMASYin: [],
	
	// PUNTI
	pointBase: new THREE.MeshStandardMaterial( {
		color: SET.COL.basePT,
		roughness:1,
		transparent: true
	}),
	pointOver: new THREE.MeshStandardMaterial( {
		color: SET.COL.overPT,
		roughness:1,
		transparent: true
	}),
	pointNote: new THREE.MeshStandardMaterial( {
		color: SET.COL.notePT,
		emissive: SET.COL.notePTemissive,
		roughness:1,
		transparent: true
	}),
	pointTrasp: new THREE.MeshStandardMaterial( {
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
		color: SET.COL.sel,
		roughness:1,
		transparent: true
	}),
	pointSel: new THREE.MeshStandardMaterial( {
		color: SET.COL.sel, /* 0xFFFFFF */
		roughness:1,
		transparent: true
	}),
	pointSelNote: new THREE.MeshStandardMaterial( {
		color: SET.COL.notePTSel,
		emissive: SET.COL.notePTemissive,
		roughness:1,
		transparent: true
	}),
	pointSel2: new THREE.MeshStandardMaterial( {
		side: 3,
		color: 0xFFFFFF, /* COLsel, */
		roughness:1,
		transparent: true,
		blending: 2,
		opacity: 0.2,
		visible: false
	}),
	pointSel2NK: new THREE.MeshStandardMaterial( {
		side: 3,
		color: 0xFFFFFF, /* COLsel, */
		roughness:1,
		transparent: true,
		blending: 2,
		opacity: 0.1,
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
	areas: new THREE.MeshStandardMaterial( { // PELLE
		name: "materiale VAL",
		color: new THREE.Color( 0, 0, 0 ),
		flatShading:false,
		transparent:true,
		roughness:1,
		metalness:0.3,
		side: 3,
		opacity: 0.2
	})
};

SET.MAT.lineYangInt = cloneMAT(SET.MAT.lineYang,{opacity:0.3});
SET.MAT.lineYangOver = cloneMAT(SET.MAT.lineYang,{color: SET.COL.over});
SET.MAT.lineYangIntOver = cloneMAT(SET.MAT.lineYangInt,{color: SET.COL.over});
	
SET.MAT.lineYinInt = cloneMAT(SET.MAT.lineYin,{opacity:0.3});
SET.MAT.lineYinOver = cloneMAT(SET.MAT.lineYin,{color: SET.COL.over});
SET.MAT.lineYinIntOver = cloneMAT(SET.MAT.lineYinInt,{color: SET.COL.over});

SET._setLineMaterials = function(){
	for(elemento in SET.colsElementi){
		
		var col =  SET.colsElementi[elemento];
		var col2 = col;
		if( SET.COL.contrastMethod){
			if(!muscleView)col =  SET.COL.sel;
			else col =  SET.COL.musc;
		}
		var col3 = SET.COL.basePT;
		var col4 = SET.COL.base;
		if(muscleView){
			col3 = SET.COL.basePTmusc;
			col4 = SET.COL.lineMusc;
		}
		
		SET.MAT.pointBase.color.setHex(col3);
		SET.MAT.lineYang.color.setHex(col4);
		SET.MAT.lineYin.color.setHex(col4);

		SET.MAT.lineOn[elemento] = new THREE.ShaderMaterial( {
			uniforms: {
				diffuse: {value:  new THREE.Color(col)},
				dashSize: {value: 0.2},
				gapSize: {value: 0.3},
				dotSize: {value: 0.2},
				opacity: {value: 1.0},
				verso: {value: -1.0 },
				time: {value: 0}
			},
			vertexShader: SET.MAT.vertexShader,
			fragmentShader: SET.MAT.fragmentShader,
			transparent: true
		});
		SET.MAT.lineIntOn[elemento] = new THREE.ShaderMaterial( {
			uniforms: {
				diffuse: {value:  new THREE.Color(col)},
				dashSize: {value: 0.2},
				gapSize: {value: 0.3},
				dotSize: {value: 0.2},
				opacity: {value: 0.3},
				verso: {value: -1.0 },
				time: {value: 0}
			},
			vertexShader: SET.MAT.vertexShader,
			fragmentShader: SET.MAT.fragmentShader,
			transparent: true
		});

		SET.MAT.lineOnMAS[elemento] = new THREE.LineBasicMaterial( {
			color: new THREE.Color(col2),
			transparent: true,
			opacity: 1
		});
		SET.MAT.lineOnMASYin[elemento] = new THREE.LineDashedMaterial( {
			color: new THREE.Color(col2),
			transparent: true,
			opacity: 1,
			scale: 10,
			dashSize: 1,
			gapSize: .5
		});
		SET.MAT.lineIntOnMAS[elemento] = new THREE.LineBasicMaterial( {
			color: new THREE.Color(col2),
			transparent: true,
			opacity: 0.3
		});
		SET.MAT.lineIntOnMASYin[elemento] = new THREE.LineDashedMaterial( {
			color: new THREE.Color(col2),
			transparent: true,
			opacity: 0.3,
			scale: 10,
			dashSize: 1,
			gapSize: .5
		});
	}
}
	
SET._setLineTrasp = function(depthFunc){
	
	for(elemento in SET.colsElementi){
	
		SET.MAT.lineOn[elemento].depthFunc = depthFunc;
		SET.MAT.lineIntOn[elemento].depthFunc = depthFunc;
		SET.MAT.lineOnMAS[elemento].depthFunc = depthFunc;
		SET.MAT.lineIntOnMAS[elemento].depthFunc = depthFunc;
		
	}
		
	SET.MAT.lineYang.depthFunc = depthFunc;
	SET.MAT.lineGuide.depthFunc = depthFunc;
	
	SET.MAT.lineYang.depthFunc = depthFunc;
	SET.MAT.lineYangInt.depthFunc = depthFunc;
	SET.MAT.lineYangOver.depthFunc = depthFunc;
	SET.MAT.lineYangIntOver.depthFunc = depthFunc;
	SET.MAT.lineYin.depthFunc = depthFunc;
	SET.MAT.lineYinInt.depthFunc = depthFunc;
	SET.MAT.lineYinOver.depthFunc = depthFunc;
	SET.MAT.lineYinIntOver.depthFunc = depthFunc;
		
}