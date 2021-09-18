var PH = {
	// resize img con canvas
	nImg: '',
	makeBig: false,
	file: null,
	img: null,
	res: null,
	overMan: false,
	xMouseIni: 0,
	yMouseIni: 0,
	xMouseAtt: 0,
	yMouseAtt: 0,
	orDim: 0,
	oldDim: 0,
	maxDim: 0,
	newLeft: 0,
	newTop: 0,
	img_wOr: 0,
	img_hOr: 0,
	functPH: null,
	isResizing: false,
	encodeImageFileAsURL: function( element, resizable, makeBig, functPH ) {
		if(typeof(functPH) == 'undefined')var functPH = '';
		if(typeof(resizable) == 'undefined')var resizable = false;
		if(typeof(makeBig) == 'undefined')var makeBig = false;
		PH.functPH = functPH;
		PH.makeBig = makeBig;
		PH.file = element;
		file = element.files[0];
		var reader = new FileReader();
		reader.onloadend = function() {
			PH.img = document.getElementById("img_PH");
			PH.img.style.width = '';
			PH.img.style.height = '';
			PH.img.onload = function(){
				if(resizable){
					PH.res = null;
					PH.modify();
					visLoader();
					window.addEventListener("resize", PH.resizeW, false);
					if(mouseDetect){
						document.getElementById("img_man").addEventListener("mousedown", PH.inizioResizeCrop, false);
						document.getElementById("img_resizer").addEventListener("mousedown", PH.inizioMoveCrop, false);
					}else{
						document.getElementById("img_man").addEventListener("touchstart", PH.inizioResizeCrop, false);
						document.getElementById("img_resizer").addEventListener("touchstart", PH.inizioMoveCrop, false);
					}
					document.getElementById("photo").classList.add("visPHop");
				}else{
					PH.salva();
				}
			};
			PH.img.src = reader.result;
		}
		reader.readAsDataURL(file);
		if(!resizable)document.getElementById("photo").classList.add("nasPH");
		document.getElementById("photo").classList.add("visPH");
	},
	
	inizioResizeCrop: function(event){
		PH.isResizing = true;
		if(mouseDetect){
			event.preventDefault();
			PH.xMouseIni = event.clientX;
			PH.yMouseIni = event.clientY;
		}else{	
			PH.xMouseIni = event.targetTouches[0].pageX;
			PH.yMouseIni = event.targetTouches[0].pageY;
		}	
		PH.orDim = document.getElementById("img_resizer").scrollWidth;
		if(mouseDetect){
			document.addEventListener("mouseup", PH.fineResizeCrop, false);
			document.addEventListener("mousemove", PH.moveResizeCrop, false);
		}else{
			document.addEventListener("touchend", PH.fineResizeCrop, false);
			document.addEventListener("touchmove", PH.moveResizeCrop, false);
		}
	},
	moveResizeCrop: function(event){
		if(mouseDetect){
			event.preventDefault();
			PH.xMouseAtt = event.clientX;
			PH.yMouseAtt = event.clientY;
		}else{	
			PH.xMouseAtt = event.targetTouches[0].pageX;
			PH.yMouseAtt = event.targetTouches[0].pageY;
		}	
		var diffW = PH.xMouseIni - PH.xMouseAtt;
		var diffH = PH.yMouseIni - PH.yMouseAtt;
		var diff = diffW;
		if(diffH>diffW)diff=diffH;
		var newDim = PH.orDim - diff;
		
		var dimDef = (PH.img_hOr * document.getElementById("img_resizer").scrollHeight) / PH.img.scrollHeight;
		
		//console.log(PH.oldDim + " - " + newDim)
		if(newDim < PH.oldDim){
			if(dimDef < 200)newDim = (200 * PH.img.scrollHeight) / PH.img_hOr;
		}
		if(newDim > PH.maxDim)newDim = PH.maxDim;
		
		var nW = PH.img.scrollWidth;
		var nH = PH.img.scrollHeight;
		if(newDim + PH.getRes().left > nW)newDim = nW - PH.getRes().left;
		if(newDim + PH.getRes().top > nH)newDim = nH - PH.getRes().top;
		
		PH.oldDim = newDim;
		PH.setRes({ dim: newDim });
		document.getElementById("img_resizer").style.width = newDim + 'px';
		document.getElementById("img_resizer").style.height = newDim + 'px';
	},
	fineResizeCrop: function( event ){
		if(mouseDetect)event.preventDefault();
		else event.stopPropagation();	
		if(mouseDetect){
			document.removeEventListener("mouseup", PH.fineResizeCrop, false);
			document.removeEventListener("mousemove", PH.moveResizeCrop, false);
		}else{
			document.removeEventListener("touchend", PH.fineResizeCrop, false);
			document.removeEventListener("touchmove", PH.moveResizeCrop, false)
		}
		PH.isResizing = false;
	},
	
	

	inizioMoveCrop: function( event ){
		if(PH.overMan)return;
		if(mouseDetect){
			event.preventDefault();
			PH.xMouseIni = event.clientX;
			PH.yMouseIni = event.clientY;
		}else{
			event.stopPropagation();	
			PH.xMouseIni = event.targetTouches[0].pageX;
			PH.yMouseIni = event.targetTouches[0].pageY;
		}
		PH.orDim = document.getElementById("img_resizer").scrollWidth;
		if(mouseDetect){
			document.addEventListener("mouseup", PH.fineMoveCrop, false);
			document.addEventListener("mousemove", PH.moveMoveCrop, false);
		}else{
			document.addEventListener("touchend", PH.fineMoveCrop, false);
			document.addEventListener("touchmove", PH.moveMoveCrop, false);
		}
	},
	moveMoveCrop: function( event ){
		if(PH.isResizing){
			if(touchable){
				document.removeEventListener("touchend", PH.fineMoveCrop, false);
				document.removeEventListener("touchmove", PH.moveMoveCrop, false);
			}
			return;
		}
		if(mouseDetect){
			event.preventDefault();
			PH.xMouseAtt = event.clientX;
			PH.yMouseAtt = event.clientY;
		}else{	
			PH.xMouseAtt = event.targetTouches[0].pageX;
			PH.yMouseAtt = event.targetTouches[0].pageY;
		}	
		var diffW = PH.xMouseIni - PH.xMouseAtt;
		var diffH = PH.yMouseIni - PH.yMouseAtt;
		
		PH.newLeft = PH.getRes().left - diffW;
		PH.newTop = PH.getRes().top - diffH;
		
		//console.log(PH.newLeft)
		var nW = PH.img.scrollWidth;
		var nH = PH.img.scrollHeight;
		var dimCrop = document.getElementById("img_resizer").scrollWidth;
		
		if(PH.newLeft < 0)PH.newLeft = 0;
		if(PH.newTop < 0)PH.newTop = 0;
		
		if(PH.newLeft + dimCrop > nW-4)PH.newLeft = nW - 4 - dimCrop;
		if(PH.newTop + dimCrop > nH-4)PH.newTop = nH - 4 - dimCrop;
		
		document.getElementById("img_resizer").style.marginLeft = PH.newLeft + 'px';
		document.getElementById("img_resizer").style.marginTop = (PH.newTop - nH) + 'px';
	},
	fineMoveCrop: function( event ){
		if(mouseDetect)event.preventDefault();
		else event.stopPropagation();	
		PH.setRes({
			left: PH.newLeft,
			top: PH.newTop
		});
		if(mouseDetect){
			document.removeEventListener("mouseup", PH.fineMoveCrop, false);
			document.removeEventListener("mousemove", PH.moveMoveCrop, false);
		}
		if(touchable){
			document.removeEventListener("touchend", PH.fineMoveCrop, false);
			document.removeEventListener("touchmove", PH.moveMoveCrop, false);
		}
	},
	
	
	setRes: function( obj ){
		var rapp = PH.img_wOr / PH.img.scrollWidth;
		if(typeof(obj.dim) != 'undefined'){
			PH.res.dim = obj.dim * rapp;
		}
		if(typeof(obj.left) != 'undefined'){
			PH.res.left = obj.left * rapp;
		}
		if(typeof(obj.top) != 'undefined'){
			PH.res.top = obj.top * rapp;
		}
	},
	getRes: function(){
		var rapp = PH.img_wOr / PH.img.scrollWidth;
		return {
			left: PH.res.left / rapp,
			top: PH.res.top / rapp,
			dim: PH.res.dim / rapp
		}
	},
	resizeW: function(){
		var rapp = PH.img.width / PH.img.height;
		var rappW = WF() / (HF()-40);
		var nW = 0;
		var nH = 0;
		PH.maxDim = '';
		
		if(rappW > rapp){ // fisso il verticale
			nH = HF()-100;
			nW = nH * rapp;
			PH.maxDim = nW;
		}else{
			nW = WF()-40;
			nH = nW / rapp;
			PH.maxDim = nH;
		}
		if(rapp > 1){ // fisso il verticale
			PH.maxDim = nH;
		}else{
			PH.maxDim = nW;
		}
		document.getElementById("photo").style.width = (nW+20)+'px';
		document.getElementById("photo").style.height = (nH+60)+'px';
		document.getElementById("photo").style.marginLeft = "-" + parseInt((nW + 20) / 2) + 'px';
		document.getElementById("photo").style.marginTop = "-" + parseInt((nH + 60) / 2) + 'px';
		PH.img.style.width = (nW)+'px';
		PH.img.style.height = (nH)+'px';
		PH.img.style.display = 'block';
		
		if(!PH.res){
			PH.res = {};
			PH.setRes({
				dim: PH.maxDim,
				left: (nW - PH.maxDim) /2,
				top: (nH - PH.maxDim) /2
			});
		}
		
		document.getElementById("img_resizer").style.width = (PH.getRes().dim) + 'px';
		document.getElementById("img_resizer").style.height = (PH.getRes().dim) + 'px';
		document.getElementById("img_resizer").style.marginLeft = PH.getRes().left + 'px';
		document.getElementById("img_resizer").style.marginTop = (PH.getRes().top - nH) + 'px';
	},
	modify: function(img){
		PH.img_wOr = PH.img.width;
		PH.img_hOr = PH.img.height;
		PH.resizeW();
	},
	chiudi: function(){
		window.removeEventListener("resize", PH.resizeW, false);
		document.getElementById("photo").classList.remove("visPH");
		document.getElementById("photo").classList.remove("visPH2");
		document.getElementById("photo").classList.remove("nasPH");
		PH.img.src="";
		PH.res = null;
		PH.img.onload = null;
		PH.file.value = '';
		PH.file = null;
		PH.functPH = null;
		PH.makeBig = false;
		nasLoader();
	},
	salva: function(){
		if(!PH.res)PH.modify(); // se non ridimensiono
		var obj = {
			imgMini: PH.returnImageConverted(),
			imgBig: (PH.makeBig) ? PH.returnImageConverted( true ) : ''
		};
		eval(PH.functPH+"('"+JSON.stringify(obj)+"')");
		PH.chiudi();
	},
	returnImageConverted: function( isBig ){
		if(typeof(isBig) == 'undefined')var isBig = false;
		var maxDim = 1000;
		
		var canvas = document.getElementById("img_CV");
		if(!isBig){
			canvas.width = 200;
			canvas.height = 200;
		}else{
			if(PH.img_wOr > PH.img_hOr){
				canvas.height = maxDim;
				canvas.width = canvas.height * (PH.img_wOr / PH.img_hOr);
			}else{
				canvas.width = maxDim;
				canvas.height = canvas.width * (PH.img_hOr / PH.img_wOr);
			}
		}
		//console.log(canvas.width+" - "+canvas.height);
		var ctx = canvas.getContext("2d");
			
		// nuovo oggetto immagine per la copia
		var oc = document.createElement('canvas'),
		octx = oc.getContext('2d');
		
		// ridimensiono il canvas per mettere l'immagine originale
		if(!isBig){
			oc.width = PH.img_wOr;
			oc.height = PH.img_hOr;
		}else{
			oc.width = canvas.width;
			oc.height = canvas.height;
		}
		octx.drawImage(PH.img, 0, 0, oc.width, oc.height);
		
		// taglio il canvas
		if(!isBig)ctx.drawImage(oc, PH.res.left, PH.res.top, PH.res.dim, PH.res.dim, 0, 0, 200, 200 );
		else ctx.drawImage(oc, 0, 0, oc.width, oc.height, 0, 0, oc.width, oc.height );
		
		base64 = canvas.toDataURL('image/jpeg', 60);
		return base64;
	}
}