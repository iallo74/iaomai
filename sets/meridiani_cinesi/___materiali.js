

// colori
SET.COL = {
	sel: 0xFF0000,
	musc: 0x33FF00, // 0x000000;
	basePT: 0x8899AA,
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

var imageDisc = new Image();
imageDisc.src =  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY4Q0MyMDFFRTcwMTExRUJCMzhBOEI3ODM4N0M3MjNFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY4Q0MyMDFGRTcwMTExRUJCMzhBOEI3ODM4N0M3MjNFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjhDQzIwMUNFNzAxMTFFQkIzOEE4Qjc4Mzg3QzcyM0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjhDQzIwMURFNzAxMTFFQkIzOEE4Qjc4Mzg3QzcyM0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4nvy3fAAAE+UlEQVR42sxXS0skVxS+/VK71W4fYzrYIuL7mYkkrQE1ajRBweWQoFv3CgZGQ9ZZJmShKC51M8T8hWhwYSKDRlFEg0MUX4ktavtou+1Xzlfc07lWqlEnA5mCj6qurrrfd75z7r2nhPifD9NrPm+R4N9xQlSCf78xASYJGyGFkEZIldcW+QyIbwkhQlBeh6WQ+H8RYJbEDoKT4AJ6e3vra2trK210WCwWQQhvbGxsTk5O/kb/+yUuCAEpJPZYASZJjmizCO6enp6PCZ/X1NQ8zc7OdqSlpYmUlBRhtVqF2WzWXgqFQoHt7e3VmZmZHyYmJubp1l+Ec+lKzMgNUxJyi4w6r7S0tHZwcPDruro6b1ZWlsjMzBR2u11Q8Alyk8mkIR6Pi1gsJqLRqFhfX385NDT0zdLS0jqN45NuRPUiLAYCcC+d8G57e3vn8PDw91VVVWW5ublCFcAOQAiAVEAQzhCVl5fn6erq6jw9Pd1dW1vzyfqI3CcAXtpheUdHx2cDAwPfFRQUOEHucrlERkaGUK1nMgZcUK/pWUdTU1PnycnJNok4kqm444JFZz0qO7eiouIDIv/W4/E4c3JyhNPpTJBztEzG9jPUe1pEZrOV6qaRUvHy8PDwVKmHRMSqAOT9nf7+/uf5+flPQJyenv4vYpXgTvH8Q5pICd6jdDwZGRl5jrElh8lIAKabs7u7u628vLwRxMh1amqqNghXuhGxXgQ7oYqorKxs7Ovra5PT2aYXwPZnNTc3P3M4HBoxco1BtKUtHn/0Msv1gDEggurqCzmtU9kFVYCdis1dVFT0IVc35xPkPMUevMQqTjBo7HpKh1uuL3cEaItOQ0PDexS5TZ3fKvljRaguABSYjab2+1KAxm1VZkMKVX0ZW86288Kir/b7asHIEQRGHCXKPhJRHbBQ9C71JZDrATHAQ2pCFcnPU2G7JPkdBxIPqVHrozci4FTpDx5LFcxpVA8WgMRGb25u/OFwWHshEokkzkaDYzCucLXomICfwfsAxsU5EAj45WoYUwVo+/nR0dErPHh7e5t4kRcfvUNyG9aukznEAbAA2i3F3t7eK9kvRNVZADXBxcXFFVIYxoOAKoSt5N8A/sfADKP/cCZnNVxfX4fn5+dX1OXYqrRQwbOzs+Pd3d0V2ni8eIEXIraVCxHW89moDtT8B4NBjZwCE9QrrNDGdCwFxPUCsF2eLSwsvCguLvZi/cdqiKnDg+IaZxBicHVT0tcB/ocDIKbIxcXFhZibm3sBDskV1++GuGHa2dm5oN2rnjYij37X48iMFid1irL1IAfx+fm51qCMj4+Pyi4pYCSAayF+cHDwR3V19aeUArsanT4VqtV85vzD9svLS418f3//ZHR0dISak99lvxhN1pCAIUIvBUj5XklJySdEbGVSJlEjBiGuQQog5xy53+8XPp8vODU19dXy8vKCbM1CyRoSFgAXwqTaR4q3qSP6iFJhV9cFtpmBGQNiAPm+urrSyNGATE9Pj1Dl/yStv9F3yJYkqygsClEq/tzc3PzF7XaXUVHmq1OMpyrAVc7FBvKtra2lsbGxL1dXV39V8h57nbY8G51Ma2trm9frfUabyVNqVhzcE/L0gyskIkDOrdJ68uPs7OzPdPtYVv2j2vJ7P0xaWlrqCwsLq6lAubMJ0/qxQVa/sQ+Tt+bTLJkYc5KP09hDSN+q428BBgCEFFoyGbcGoQAAAABJRU5ErkJggg==';
var textureDisc = new THREE.Texture();
textureDisc.image = imageDisc;
imageDisc.onload = function() {
	textureDisc.needsUpdate = true;
};
//SET.MAT.materialDisc.map = textureDisc;

// LINEE
SET.MAT = {
	opLine: 0.6,
	opLineContr: 0.2,
	opPoint: 1,
	opPointContr: 0.3,
	dotMaterial:  new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.basePT
	} ),
	lineSel: new THREE.LineBasicMaterial( {
		color:SET.COL.sel,
		transparent: true,
		opacity:0.6,
		depthFunc: 1
	} ),
	lineYang: new THREE.LineBasicMaterial( {
		color:SET.COL.base,
		transparent: true,
		opacity:0.6,
		depthWrite: false
	} ),
	lineYin: new THREE.LineDashedMaterial( {
		color: SET.COL.base,
		scale: 10,
		dashSize: 1,
		gapSize: .5,
		transparent: true,
		opacity:0.6,
		depthWrite: false
	} ),
	lineGuide: new THREE.LineBasicMaterial( { // meridiani YANG
		color: SET.COL.guide,
		transparent: true,
		opacity:0.6
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
	
	// PUNTI
	pointBase: new THREE.MeshStandardMaterial( {
		color: SET.COL.basePT,
		roughness:1,
		transparent: true,
		depthWrite: false
	}),
	pointBaseD:  new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.basePT,
		depthWrite: false
	} ),
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
	})
};
if(!mouseDetect){
// PUNTI
	SET.MAT.pointBase = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.basePT,
		transparent: true,
		depthWrite: false
	});
	SET.MAT.pointBaseD = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.basePT,
		depthWrite: false
	} );
	SET.MAT.pointOver = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.overPT,
		transparent: true
	});
	SET.MAT.pointNote = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.notePT,
		transparent: true
	});
	/*SET.MAT.pointTrasp = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		premultipliedAlpha: true, // per visualizzare il colore sul fondo scuro
		side: 2, // per visualizzare il colore sul fondo scuro
		metalness: 0, // per visualizzare il colore sul fondo scuro
		transparent:true, 
		opacity: 0, 
		visible:false,
		depthWrite: false // !!!! per le trasparenze del pulse (senza i pallini vengono tagliati
	} );*/
	SET.MAT.pointOn = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.sel,
		transparent: true
	});
	SET.MAT.pointSel = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.sel, /* 0xFFFFFF */
		transparent: true
	});
	SET.MAT.pointSelNote = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.notePTSel,
		transparent: true
	});
	SET.MAT.pointSel2 = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		side: 3,
		color: 0xFFFFFF,
		transparent: true,
		blending: 2,
		opacity: 0.2,
		visible: false
	}),
	/*SET.MAT.pointEvi = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.eviPT,
		depthWrite: false,
		transparent: true,
		opacity: 0.5
	});
	SET.MAT.pointPieno = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.pienoPT,
		depthWrite: false,
		transparent: true,
		opacity: 0.6
	});
	SET.MAT.pointVuoto = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.vuotoPT,
		depthWrite: false,
		transparent: true,
		opacity: 0.4
	});
	SET.MAT.pointDolore = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.dolorePT,
		depthWrite: false,
		transparent: true,
		opacity: 0.4
	});*/
	SET.MAT.pointBianco = new THREE.PointsMaterial( {
		size: 0.2,
		map: textureDisc,
		alphaTest: 0.5,
		sizeAttenuation: true,
		color: SET.COL.biancoPT,
		transparent: true,
		opacity: 0.6
	});	
}

SET.MAT.lineYangInt = cloneMAT(SET.MAT.lineYang,{opacity:0.3, depthFunc: 1, visible: false});
SET.MAT.lineYangOver = cloneMAT(SET.MAT.lineYang,{color: SET.COL.over});
SET.MAT.lineYangIntOver = cloneMAT(SET.MAT.lineYangInt,{color: SET.COL.over, depthFunc: 1, visible: false});
	
SET.MAT.lineYinInt = cloneMAT(SET.MAT.lineYin,{opacity:0.3, depthFunc: 1, visible: false});
SET.MAT.lineYinOver = cloneMAT(SET.MAT.lineYin,{color: SET.COL.over});
SET.MAT.lineYinIntOver = cloneMAT(SET.MAT.lineYinInt,{color: SET.COL.over, depthFunc: 1, visible: false});

SET._setLineMaterials = function(){
	for(elemento in SET.colsElementi){
		
		var col =  SET.colsElementi[elemento];
		if( SET.COL.contrastMethod){
			if(!muscleView)col =  SET.COL.sel;
			else col =  SET.COL.musc;
		}
		depthFunc = 3;
		if(MODELLO.opAtt<1)depthFunc = 1;
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
			transparent: true,
			depthFunc: depthFunc
		});
	}
}
	
SET._setLineTrasp = function(depthFunc){
	
	for(elemento in SET.colsElementi){
	
		SET.MAT.lineOn[elemento].depthFunc = depthFunc;
		SET.MAT.lineIntOn[elemento].depthFunc = depthFunc;
		
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
	if(SET.meridianiSecondariAccesi.length){
		SET.MAT.lineYang.depthFunc = 3;
		SET.MAT.lineYin.depthFunc = 3;
	}
		
}