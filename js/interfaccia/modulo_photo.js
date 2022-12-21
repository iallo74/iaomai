var PH = {
	
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
	galleryProvvisoria: [],
	overCestino: false,
	maxFoto: 15,
	idU: -1,
	
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
		
		var quality = .3;
		if(isBig)quality = .8;
		base64 = canvas.toDataURL('image/jpeg', quality);
		return base64;
	},
	
	
	// gallery
	caricaGallery: function( vis, idU, dett ){ // carica la gallery
		var HTML='';
		var totFoto = 0;
		var afterFunct = '';
		if(typeof(vis)=='undefined')var vis = false;
		if(typeof(dett)=='undefined')var dett = false;
		if(typeof(idU)=='undefined')var idU = '';
		if(!idU)idU = DB.login.data.idUtente;
		PH.idU = idU;
		if(PH.galleryProvvisoria.length){
			for(i in PH.galleryProvvisoria){
				totFoto++;
				var src = '';
				var cls = '';
				var locale = false;
				if(__(PH.galleryProvvisoria[i].nuova)){
					locale = true;
					src = PH.galleryProvvisoria[i].imgMini;
				}
				if(!locale){
					for(f in DB.foto.data){
						if(DB.foto.data[f].idFoto == PH.galleryProvvisoria[i].idFoto){
							if(DB.foto.data[f].imgMini){
								locale = true;
								src = DB.foto.data[f].imgMini;
							}
						}
					}
				}
				if(!locale){
					if(CONN.getConn()){
						// se connesso a internet la scarico
						afterFunct += "CONN.caricaUrl(	'getImgGallery.php','n="+i+"&iU="+PH.idU+"&idFoto="+PH.galleryProvvisoria[i].idFoto+"','PH.scriviFoto');";
					}else{
						cls='noConn';
					}
				}
				HTML += '<div>' +
						'	<div id="gall_'+i+'"' +
						'		  class="' +
								  ((cls) ? cls : '') +
							  	  ((locale) ? 'fotoLocale' : '') + '">' +
						'		<div' +
									((src) ? ' style="background-image:url(\''+src+'\');"' : '') +
						'	 		  onClick="if(!PH.overCestino)PH.fullFoto('+i+','+locale+');">' +
						'			<img class="gall_full"' +
						'			 	 src="img/ico_fullscreen.png">';
				if(!vis)HTML += 
						'			<img class="gall_del"' +
						'			 	 src="img/ico_cestinoB.png"' +
						'			 	 onMouseOver="PH.overCestino=true;"' +
						'			 	 onMouseOut="PH.overCestino=false;"' +
						'			 	 onClick="PH.eliminaFoto('+i+');">';
				HTML += '		</div>' +
						'	</div>';
				var Dida = __(PH.galleryProvvisoria[i].Dida);
				if(vis && Dida)HTML +='	<p class="noDefault">'+Dida+'</p>';
				if(!vis)HTML += H.r({	t: "t",	
								name: "Dida"+i,	
								value: Dida,
								classRiga: "DidaFoto",
								classCampo: 'TitTrattDx noDefault',
								label: TXT("InserisciDida"),
								noLabel: true,
								keyupCampo: 'H.auto_height(this);' });
				if(dett){
					HTML += '<div class="dettagliFoto"><b>'+TXT("DettagliGallery")+'</b><br>' +
							TXT("DimensioniGallery")+': <span id="dim'+i+'">...</span><br>' +
							TXT("UbicazioneGallery")+': <span id="ub'+i+'">...</span><br>' +
							'</div>';
				}
				HTML += '</div>';
			}
			document.getElementById('contGallery').classList.add("galleryFull");
			document.getElementById('contGallery').innerHTML = HTML;
			if(!vis){
				setTimeout( function(){
					PH.resizeDida();
				}, 500);
			}
			if(dett){
				setTimeout( function(){
					for(f in DB.foto.data){
						
						var dim = DB.getStringMemorySize(IMPORTER.COMPR(DB.foto.data[f].imgMini));
						if(dim<1000*1000){
							dimTxt = parseInt(dim/(1000))+"KB";
						}else{
							dimTxt = ArrotondaEuro(dim/(1000*1000))+"MB";
						}
						document.getElementById('dim'+f).innerHTML = dimTxt;
						
						
						var ubicazione = "";
						for(p in DB.pazienti.data){
							// verifico nel paziente
							var gallery =  __(DB.pazienti.data[p].gallery,'[]');
							if(!gallery)gallery='[]';
							gallery = JSON.parse(gallery);
							if(gallery.length){
								for(g in gallery){
									if(DB.foto.data[f].idFoto == gallery[g].idFoto)ubicazione += DB.pazienti.data[p].Nome+" "+DB.pazienti.data[p].Cognome + '<br>';
								}
							}
							// verifico nei trattamenti
							for(t in DB.pazienti.data[p].trattamenti){
								if(DB.pazienti.data[p].trattamenti[t].gallery){
									var gallery =  JSON.parse(DB.pazienti.data[p].trattamenti[t].gallery);
									if(gallery.length){
										for(g in gallery){
											if(DB.foto.data[f].idFoto == gallery[g].idFoto)ubicazione += DB.pazienti.data[p].Nome+" "+DB.pazienti.data[p].Cognome + ' &gt; ' + DB.pazienti.data[p].trattamenti[t].TitoloTrattamento + '<br>';
										}
									}
								}
							}
						}
						if(!ubicazione)ubicazione = TXT("NoUbGallery");
						document.getElementById('ub'+f).innerHTML = ubicazione;
					}
				}, 500);
			}
		}
		if(!totFoto){
			document.getElementById('contGallery').classList.remove("galleryFull");
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes")+'...' +
					'</div>';
		}else{
			setTimeout( function(){
				if(__(DB.foto.update,false)){
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".foto"), IMPORTER.COMPR(DB.foto)).then(function(){ // salvo il DB
						DB.foto.update = false;
					});
				}
			}, 5000);
		}
		if(!vis){
			if(totFoto < PH.maxFoto)document.getElementById('p_add_dett').style.display = 'block';
			else document.getElementById('p_add_dett').style.display = 'none';
			document.getElementById('totFoto').innerHTML = totFoto;
		}
		document.getElementById('contGallery').innerHTML = HTML;
		if(afterFunct)eval(afterFunct);
	},
	resizeDida: function(){
		for(i in PH.galleryProvvisoria){
			H.auto_height(document.getElementById('Dida'+i));
		}
	},
	scriviFoto: function( res ){
		res = JSON.parse( res );
		var presente = false;
		for(f in DB.foto.data){
			if(res.idFoto == DB.foto.data[f].idFoto){
				presente = f;
			}
		}
		if(!presente){
			DB.foto.data.push({
				idFoto: res.idFoto,
				imgMini: res.imgMini
			});
			DB.foto.update = true;
		}else{
			if(!__(DB.foto.data[presente].imgMini)){
				DB.foto.data[presente].imgMini = res.imgMini;
				DB.foto.update = true;
			}
		}
		if(document.getElementById("gall_"+res.n)){
			if(res.imgMini)document.getElementById("gall_"+res.n).getElementsByTagName('div')[0].style.backgroundImage='url(\''+res.imgMini+'\')';
		}
	},
	selezionaFoto: function( element ){
		PH.encodeImageFileAsURL( element, false, true, 'PH.aggiungiFoto' );
	},
	aggiungiFoto: function( obj ){
		obj = JSON.parse(obj);
		var d = new Date()*1
		var JSNPUSH = {	idFoto: "foto_"+d,
						imgMini: obj.imgMini,
						imgBig: obj.imgBig,
						nuova: true }
		PH.galleryProvvisoria.push(JSNPUSH);
		PH.caricaGallery();
		SCHEDA.formModificato = true;
	},
	eliminaFoto: function( f ){
		CONFIRM.vis(	TXT("ChiediEliminaFoto"),
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));

			PH.galleryProvvisoria.splice(f,1);
			
			PH.caricaGallery();
			SCHEDA.formModificato = true;
		}});
	},
	fullFoto: function( i, locale ){
		var locale = false;
		if(__(PH.galleryProvvisoria[i].nuova)){
			locale = true;
			src = PH.galleryProvvisoria[i].imgBig;
		}
		if(!locale){
			for(f in DB.foto.data){
				if(DB.foto.data[f].idFoto == PH.galleryProvvisoria[i].idFoto){
					if(DB.foto.data[f].imgBig){
						locale = true;
						src = DB.foto.data[f].imgBig;
					}
				}
			}
		}
		var pass = true;
		//if(!locale)pass = CONN.retNoConn();
		if(pass){
			visLoader("");
			if(!locale && CONN.getConn()){
				CONN.caricaUrl(	'getImgGallery.php',
								'big=1&n='+i+'&iU='+PH.idU+'&idFoto='+PH.galleryProvvisoria[i].idFoto,
								'PH.scriviFotoBig');
			}else{
				var locale = false;
				if(PH.galleryProvvisoria[i].nuova){
					locale = true;
					src = PH.galleryProvvisoria[i].imgBig;
				}
				if(!locale){
					for(f in DB.foto.data){
						if(DB.foto.data[f].idFoto == PH.galleryProvvisoria[i].idFoto){
							foto = DB.foto.data[f];
						}
					}
				}
				PH.scriviFotoBig( JSON.stringify(foto) );
			}
		}
	},
	scriviFotoBig: function( res ){
		res = JSON.parse( res );
		var lowRes = false;
		var urlImg = res.imgBig;
		if(!urlImg || urlImg=='404'){
			for(f in DB.foto.data){
				if(DB.foto.data[f].idFoto == res.idFoto){
					urlImg = DB.foto.data[f].imgMini;
					lowRes = true;
				}
			}
		}
		document.getElementById("foto_alert").classList.remove("visSch");
		document.getElementById("fotoBig").classList.remove("noLoader");
		document.getElementById("fotoBig").style.backgroundImage='url(\''+urlImg+'\')';
		if(lowRes){
			if(!CONN.getConn())msg = TXT("AlertImgLowNoConn");
			else msg = TXT("AlertImgLow");
			document.getElementById("foto_alert").classList.add("visSch");
			document.getElementById("foto_alert").innerHTML = stripslashes(msg);
		}
	},
	
	car_gallery: function(){
		var space = DB.getStringMemorySize(IMPORTER.COMPR(DB.foto));
		var spaceAvail = (45*1000*1000 - DB.sizeDb);
		var perc = (space*100) / spaceAvail;
		var spaceTxt = '<b>';
		if(space<1000*1000){
			spaceTxt += parseInt(space/(1000))+"KB";
		}else{
			spaceTxt += ArrotondaEuro(space/(1000*1000))+"MB";
		}
		spaceTxt += '</b> ('+parseInt(perc)+'%)'
		
		var number = DB.foto.data.length;
		var HTML = 	'<p>'+htmlEntities(TXT("SpiegazioneGallery"))+'</p>' +
					'<div>'+htmlEntities(TXT("NumberGallery"))+': <b>'+number+'</b><br>' +
					htmlEntities(TXT("SpaceGallery"))+': '+spaceTxt+'</div>' +
					'<div id="perc_cont"><div style="width:'+perc+'%"></div></div>';
		
		PH.galleryProvvisoria = [];
		for(f in DB.foto.data){
			PH.galleryProvvisoria.push({ idFoto: DB.foto.data[f].idFoto, Dida: '' });
		}
		
		var btnAdd = '';
		btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.suppliers.overview\')">' +
						TXT("ReferenceGuide") +
					'</div>';
		
		// GALLERY
		HTML += '<div id="contGallery"></div>';
		
		SCHEDA.caricaScheda(	stripslashes(TXT("ElFoto")),
								HTML,
								'PH.chiudiGallery();',
								'scheda_gallery',
								false,
								true,
								false,
								btnAdd );
								
		PH.caricaGallery(true,'',true);
	}
}