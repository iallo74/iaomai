

// colori
SET.COL = {
	sel: 0xFF0000,
	selInt: 0xCC7F7F,
	musc: 0xFF0000,
	basePT: 0x7F7F7F,
	basePTmusc: 0xFFEE22,// 0x55FF55,
	base: 0x637281,
	over: 0xFFFFFF,
	overPT: 0x33AAFF,
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

function cloneMAT(mat,par){
	let matCloned = mat.clone();
	matCloned.setValues(par);
	return matCloned;
}


// LINEE
SET.MAT = {
	opPoint: 1,
	opPointContr: 0.3,
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
		opacity: 0.25,
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
	mappaApplicata: false,
	
	MAT_torso_muscoli: null,
	MAT_head_muscoli: null,
	MAT_limbs_muscoli: null,
	textureTorsoB_muscoli: null,
	textureHeadB_muscoli: null,
	textureLimbsB_muscoli: null,
	imgBianca: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIzOTE1ODk5NEE3NTExRUZBN0M0ODA4OEJDNzk3RjM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIzOTE1ODlBNEE3NTExRUZBN0M0ODA4OEJDNzk3RjM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjM5MTU4OTc0QTc1MTFFRkE3QzQ4MDg4QkM3OTdGMzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjM5MTU4OTg0QTc1MTFFRkE3QzQ4MDg4QkM3OTdGMzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz537wtIAAACAUlEQVR42uzTQREAAAjDMOZf9HijgURC75q2A1/FABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGwAAGwABgADAAGAAMAAYAA4ABwABgADAAGAAMAAYAA4ABwABgADAAGAAMAAYAA4ABwABgADAAGAAMAAYAA4ABwABgADAAGAAMAAYAA4ABwABgADAAGAAMAAYAA4ABwABgADAABgADgAHAAGAAMAAYAAwABgADgAHAAGAAMAAYAAwABgADgAHAAGAAMAAYAAwABgADgAHAAGAAMAAYAAwABgADgAHAAGAAMAAYAAwABgADgAHAAGAAMAAYAAwABgADgAEwgAEwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADIABVMAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAOAAcAAYAAwABgADAAGAAPAtQIMADai/h9awvPwAAAAAElFTkSuQmCC',
	img50: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgxODc3RkJENEE5MTExRUZBOUNBOUYzQUVCQTA5ODlFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgxODc3RkJFNEE5MTExRUZBOUNBOUYzQUVCQTA5ODlFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODE4NzdGQkI0QTkxMTFFRkE5Q0E5RjNBRUJBMDk4OUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODE4NzdGQkM0QTkxMTFFRkE5Q0E5RjNBRUJBMDk4OUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5HTI4NAAACYElEQVR42uzUQQEAMAjEsDH/BlFzGMABiYQ+Wkn6ASd9CcAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAwAAAAwAMADAAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMADAAAADAAwAMAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAMAAAAMADAAwAGAzAgwA8FEF1n85PigAAAAASUVORK5CYII=",
	merges: {},
	iniMappeMuscoli: function(){
		let imgTorso= new Image(),
			imgHead= new Image(),
			imgLimbs= new Image();
		SET.MAT.MAT_torso_muscoli = new THREE.Texture(),
		SET.MAT.MAT_head_muscoli = new THREE.Texture(),
		SET.MAT.MAT_limbs_muscoli = new THREE.Texture();
		SET.MAT.textureTorsoB_muscoli = new THREE.Texture(),
		SET.MAT.textureHeadB_muscoli = new THREE.Texture(),
		SET.MAT.textureLimbsB_muscoli = new THREE.Texture();
		
		imgTorso.src = Muscle_Torso;
		SET.MAT.MAT_torso_muscoli.image = imgTorso;
		imgTorso.onload = (function() {
			SET.MAT.MAT_torso_muscoli.needsUpdate = true;
		});

		imgHead.src = Muscle_Head;
		SET.MAT.MAT_head_muscoli.image = imgHead;
		imgHead.onload = (function() {
			SET.MAT.MAT_head_muscoli.needsUpdate = true;
		});

		imgLimbs.src = Muscle_Limbs;
		SET.MAT.MAT_limbs_muscoli.image = imgLimbs;
		imgLimbs.onload = (function() {
			SET.MAT.MAT_limbs_muscoli.needsUpdate = true;
		});

		let imageTorsoB = new Image(),
			imageHeadB = new Image(),
			imageLimbsB = new Image();

		imageTorsoB.src = Muscle_Torso_bump;
		SET.MAT.textureTorsoB_muscoli.image = imageTorsoB;
		imageTorsoB.onload = function() {
			SET.MAT.textureTorsoB_muscoli.needsUpdate = true;
		};

		imageHeadB.src =  Muscle_Head_bump;
		SET.MAT.textureHeadB_muscoli.image = imageHeadB;
		imageHeadB.onload = function() {
			SET.MAT.textureHeadB_muscoli.needsUpdate = true;
		};

		imageLimbsB.src =  Muscle_Limbs_bump;
		SET.MAT.textureLimbsB_muscoli.image = imageLimbsB;
		imageLimbsB.onload = function() {
			SET.MAT.textureLimbsB_muscoli.needsUpdate = true;
		};
	},
	applicaMappa: function( nPunto='' ){
		if((!__(MAPPA.textures[nPunto]) && nPunto!='') || (nPunto=='' && !SET.MAT.mappaApplicata) || !globals.modello.cartella)return;
		SET.MAT.mappaApplicata = (nPunto!='');

		let MAT_torso = null,
			MAT_head = null,
			MAT_limbs = null,
			textureTorsoB = null,
			textureHeadB = null,
			textureLimbsB = null,
			imageTorsoB = new Image(),
			imageHeadB = new Image(),
			imageLimbsB = new Image(),
			imgProvv = '';

		if(nPunto==''){
			MAT_torso = SET.MAT.MAT_torso_muscoli,
			MAT_head = SET.MAT.MAT_head_muscoli,
			MAT_limbs = SET.MAT.MAT_limbs_muscoli;
			MODELLO.MAT.materialAree[1].map = MAT_torso;
			MODELLO.MAT.materialAree[2].map = MAT_head;
			MODELLO.MAT.materialAree[3].map = MAT_limbs;
		}else{
			SET.MAT.mergeImages(nPunto,1);
		}
		if(nPunto==''){
			textureTorsoB = SET.MAT.textureTorsoB_muscoli,
			textureHeadB = SET.MAT.textureHeadB_muscoli,
			textureLimbsB = SET.MAT.textureLimbsB_muscoli;
		}else{
			textureTorsoB = new THREE.Texture(),
			textureHeadB = new THREE.Texture(),
			textureLimbsB = new THREE.Texture(),
			
			imageTorsoB.src =  SET.MAT.imgBianca;
			textureTorsoB.image = imageTorsoB;
			imageTorsoB.onload = function() {
				textureTorsoB.needsUpdate = true;
			};

			imageHeadB.src =  SET.MAT.imgBianca;
			textureHeadB.image = imageHeadB;
			imageHeadB.onload = function() {
				textureHeadB.needsUpdate = true;
			};

			imageLimbsB.src =  SET.MAT.imgBianca;
			textureLimbsB.image = imageLimbsB;
			imageLimbsB.onload = function() {
				textureLimbsB.needsUpdate = true;
			};
		}

		MODELLO.MAT.materialAree[1].bumpMap = textureTorsoB;
		MODELLO.MAT.materialAree[2].bumpMap = textureHeadB;
		MODELLO.MAT.materialAree[3].bumpMap = textureLimbsB;
		MODELLO.swArea(1);
		setTimeout(function(){MODELLO.op('Pelle',1);},500);
	},
	mergeImages: function(nPunto, zona){
		let c=document.createElement("canvas"),
			img=MAPPA.textures[nPunto][globals.modello.cartella],
			zone = {
				1: "Torso",
				2: "Head",
				3: "Limbs"
			};
		c.width = 1024;
		c.height = 1024;
		let ctx=c.getContext("2d");
		ctx.globalCompositeOperation = "lighten";
		let imageObj1 = new Image();
		imageObj1.src = eval("Muscle_"+zone[zona]);
		let imageObj2 = new Image();
		imageObj1.onload = function() {
			ctx.drawImage(imageObj1, 0, 0, 1024, 1024);
			imageObj2.src = SET.MAT.img50;
			imageObj2.onload = function() {
				ctx.drawImage(imageObj2, 0, 0, 1024, 1024);
				ctx.globalCompositeOperation = "multiply";
				imageObj1.src = c.toDataURL("image/jpeg");
				imageObj1.onload = function() {
					ctx.drawImage(imageObj1, 0, 0, 1024, 1024);
					imageObj2.src = (img[zone[zona].toLowerCase()] == 'void') ? SET.MAT.imgBianca : img[zone[zona].toLowerCase()];
					imageObj2.onload = function() {
						ctx.drawImage(imageObj2, 0, 0, 1024, 1024);

						SET.MAT.merges[zone[zona]] = c.toDataURL("image/jpeg");
						if(zona<3){
							setTimeout(function(){SET.MAT.mergeImages( nPunto, zona+1 );},10);
						}else{
							let MAT = {};

							for(let e=1;e<=3;e++){
								let imgDest = new Image(),
									MAT_dest = new THREE.Texture();
								imgDest.src = SET.MAT.merges[zone[e]];
								MAT_dest.image = imgDest;
								imgDest.onload = (function() {
									MAT_dest.needsUpdate = true;
								});
								MAT[e] = MAT_dest;
							}
							for(let e=1;e<=3;e++){
								let gProvv = new THREE.SphereGeometry( 0.01, 0, 0 ),
									g = new THREE.Mesh( gProvv, MAT[e]); 
								g.material.opacity = 0;
								g.name = 'preM'+m;
								g.depthTest = false;
								g.position.y = 1;
								manichino.add( g );
							}
							setTimeout(function(){
								for(let e=1;e<=3;e++){
									MODELLO.MAT.materialAree[e].map = MAT[e];
								}
								MODELLO.removePrecarArea();
							},200);
						}
					}
				}
			}
		}
	},
	
};

SET._setLineMaterials = function(){
	let col3 = areasView ? SET.COL.basePTmusc : SET.COL.basePT;
	SET.MAT.pointBase.color.setHex(col3);
}