MODELLO.MAT.mappaMuscoli3d = function(){
	
	let imageFoot = new Image();
	imageFoot.src =  Muscle_Foot;
	let textureFoot = new THREE.Texture();
	textureFoot.image = imageFoot;
	imageFoot.onload = function() {
		textureFoot.needsUpdate = true;
	};
	MODELLO.MAT.materialMuscoli3dFoot.map = textureFoot;
	MODELLO.MAT.materialMuscoli3dSelFoot.map = textureFoot;
	MODELLO.MAT.materialMuscoli3dOverFoot.map = textureFoot;

	let imageLeg = new Image();
	imageLeg.src =  Muscle_Leg;
	let textureLeg = new THREE.Texture();
	textureLeg.image = imageLeg;
	imageLeg.onload = function() {
		textureLeg.needsUpdate = true;
	};
	MODELLO.MAT.materialMuscoli3dLeg.map = textureLeg;
	MODELLO.MAT.materialMuscoli3dSelLeg.map = textureLeg;
	MODELLO.MAT.materialMuscoli3dOverLeg.map = textureLeg;
	
	
}