var PH = {
	
	nImg: '',
	openedImg: -1,
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
	galleryOnline: [],
	oldGallery: [],
	overCestino: false,
	maxFiles: 15,
	idU: -1,
	actionClick: '',
	selected: [],
	listaEstensioni: [	"image/jpeg",
						"image/png",
						"image/webp" ],
	listaEstensioniFiles: [	"application/pdf" ],
	maxFileSize: 20*1000*1000, // 20MB
	
	encodeImageFileAsURL: function( element, resizable=false, makeBig=false, functPH='', listaEstensioni ) { // trasforma l'immagine in base64
		/* let verSize = false; */
		if(typeof(listaEstensioni) == 'undefined'){
			listaEstensioni = PH.listaEstensioni;
			if(LOGIN.logedin() && !resizable){
				listaEstensioni = listaEstensioni.concat(PH.listaEstensioniFiles);
			}
		}
		let ext = "";
		for(let e in listaEstensioni){
			ext += listaEstensioni[e].toUpperCase().split("/")[1]+", ";
		}
		ext = ext.substr(0,ext.length-2);
		PH.functPH = functPH;
		PH.makeBig = makeBig;
		PH.file = element;
		file = element.files[0];
		
		if(listaEstensioni.indexOf(file.type)==-1){
			ALERT(TXT("FileNonConsentito").replace("[listaEstensioni]",ext));
			return;
		}
		if(file.size > PH.maxFileSize && PH.listaEstensioniFiles.indexOf(file.type)>-1){
			ALERT(TXT("DimensioneNonConsentita").replace("[maxSize]",PH.maxFileSize*.000001).replace("[size]",ArrotondaEuro(file.size*.000001)));
			return;
		}
		let reader = new FileReader();
		if(PH.listaEstensioniFiles.indexOf(file.type)==-1){
			// se è un'immagine
			reader.onloadend = function() {
				PH.img = document.getElementById("img_PH");
				PH.img.style.width = '';
				PH.img.style.height = '';
				PH.img.onload = function(){
					if(resizable){
						PH.res = null;
						PH.modify();
						visLoader();
						document.getElementById("img_draw_tools").classList.add("nasRes");
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
		}else{
			// se è un file diverso
			if(CONN.retNoConn()){
				// se c'è connessione
				reader.onloadend = function() {
					// carico il file sul server
					let d = new Date()*1
					
					CONN.caricaUrl(	"putFile.php",
									"b64=1&JSNPOST="+encodeURIComponent(window.btoa(JSON.stringify({
										idFile: d,
										e: file.type.split("/")[1], // pdf
										F: reader.result,
										n: file.name
									}))),
									"PH.salvaFile");
				}
				reader.readAsDataURL(file);
			}else return;
		}
		if(!resizable)document.getElementById("photo").classList.add("nasPH");
		document.getElementById("photo").classList.add("visPH");
	},
	
	inizioResizeCrop: function(event){ // inizia a intercettare il ridimensionamento del ritaglio
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
	moveResizeCrop: function(event){ // intercetta il ridimensionamento del ritaglio
		if(mouseDetect){
			event.preventDefault();
			PH.xMouseAtt = event.clientX;
			PH.yMouseAtt = event.clientY;
		}else{	
			PH.xMouseAtt = event.targetTouches[0].pageX;
			PH.yMouseAtt = event.targetTouches[0].pageY;
		}	
		let diffW = PH.xMouseIni - PH.xMouseAtt,
			diffH = PH.yMouseIni - PH.yMouseAtt,
			diff = diffH>diffW ? diffH : diffW,
			newDim = PH.orDim - diff,
			dimDef = (PH.img_hOr * document.getElementById("img_resizer").scrollHeight) / PH.img.scrollHeight,
			nW = PH.img.scrollWidth,
			nH = PH.img.scrollHeight;
		
		//console.log(PH.oldDim + " - " + newDim)
		if(newDim < PH.oldDim){
			if(dimDef < 200)newDim = (200 * PH.img.scrollHeight) / PH.img_hOr;
		}
		if(newDim > PH.maxDim)newDim = PH.maxDim;
		if(newDim + PH.getRes().left > nW)newDim = nW - PH.getRes().left;
		if(newDim + PH.getRes().top > nH)newDim = nH - PH.getRes().top;
		
		PH.oldDim = newDim;
		PH.setRes({ dim: newDim });
		document.getElementById("img_resizer").style.width = newDim + 'px';
		document.getElementById("img_resizer").style.height = newDim + 'px';
	},
	fineResizeCrop: function( event ){ // smette il ridimensionamento del ritaglio
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
	
	

	inizioMoveCrop: function( event ){ // inizia a intercettare lo spostamento del ritaglio
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
	moveMoveCrop: function( event ){ // intercetta lo spostamento del ritaglio
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
		let diffW = PH.xMouseIni - PH.xMouseAtt,
			diffH = PH.yMouseIni - PH.yMouseAtt,
			nW = PH.img.scrollWidth,
			nH = PH.img.scrollHeight,
			dimCrop = document.getElementById("img_resizer").scrollWidth;
		
		PH.newLeft = PH.getRes().left - diffW;
		PH.newTop = PH.getRes().top - diffH;
		
		if(PH.newLeft < 0)PH.newLeft = 0;
		if(PH.newTop < 0)PH.newTop = 0;
		
		if(PH.newLeft + dimCrop > nW-4)PH.newLeft = nW - 4 - dimCrop;
		if(PH.newTop + dimCrop > nH-4)PH.newTop = nH - 4 - dimCrop;
		
		document.getElementById("img_resizer").style.marginLeft = PH.newLeft + 'px';
		document.getElementById("img_resizer").style.marginTop = (PH.newTop - nH) + 'px';
	},
	fineMoveCrop: function( event ){ // smetter lo spostamento del ritaglio
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
		let rapp = PH.img_wOr / PH.img.scrollWidth;
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
		let rapp = PH.img_wOr / PH.img.scrollWidth;
		return {
			left: PH.res.left / rapp,
			top: PH.res.top / rapp,
			dim: PH.res.dim / rapp
		}
	},
	resizeW: function(){
		let rapp = PH.img.width / PH.img.height,
			rappW = WF() / (HF()-40),
			nW = 0,
			nH = 0;
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
		
		document.getElementById("img_resizer").classList.remove("nasRes");
		document.getElementById("img_resizer").style.width = (PH.getRes().dim) + 'px';
		document.getElementById("img_resizer").style.height = (PH.getRes().dim) + 'px';
		document.getElementById("img_resizer").style.marginLeft = PH.getRes().left + 'px';
		document.getElementById("img_resizer").style.marginTop = (PH.getRes().top - nH) + 'px';
	},
	modify: function(img){ // ridimensiona l'immagine
		PH.img_wOr = PH.img.width;
		PH.img_hOr = PH.img.height;
		PH.resizeW();
	},
	draw: function(img){ // disegna sull'immagine
		PH.img_wOr = PH.img.width;
		PH.img_hOr = PH.img.height;
		let rapp = PH.img.width / PH.img.height,
			rappW = WF() / (HF()-40),
			nW = 0,
			nH = 0;
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
		DW._init();
	},
	chiudi: function(){ // chiude 
		if(DW.initialized)DW.clearDraw();
		window.removeEventListener("resize", PH.resizeW, false);
		document.getElementById("photo").classList.remove("visPH");
		document.getElementById("photo").classList.remove("visPH2");
		document.getElementById("photo").classList.remove("nasPH");
		document.getElementById("img_pulsanti").classList.remove("editable");
		if(PH.img)PH.img.src="";
		PH.res = null;
		if(PH.img)PH.img.onload = null;
		if(PH.file){
			PH.file.value = '';
			PH.file = null;
		}
		PH.functPH = null;
		PH.makeBig = false;
		nasLoader();
	},
	salva: function(){ // salva l'immagine che si sta caricando (e nel caso ritaliando)
		if(!PH.res)PH.modify(); // se non ridimensiono
		let imgMini = PH.returnImageConverted(),
			obj = {
				imgMini: imgMini,
				imgBig: (PH.makeBig) ? PH.returnImageConverted( true ) : '',
				fileType: imgMini.split("data:")[1].split(";")[0]
			};
		eval(PH.functPH+"('"+JSON.stringify(obj)+"')");
		PH.chiudi();
	},
	salvaFile: function( txt ){
		let obj = JSON.parse(txt);
		eval(PH.functPH+"('"+JSON.stringify(obj)+"')");
		PH.chiudi();
	},
	returnImageConverted: function( isBig=false ){ // restituisce l'immagine conveertita in base64
		let maxDim = 1000,
			canvas = document.getElementById("img_CV");
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
		let ctx = canvas.getContext("2d"),
			oc = document.createElement('canvas'), // nuovo oggetto immagine per la copia
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
		
		let quality = .3;
		if(isBig)quality = .8;
		base64 = canvas.toDataURL('image/jpeg', quality); // converto tutto in JPG
		return base64;
	},
	
	
	// gallery
	caricaGallery: function( vis=false, idU='', dett=false, hideNoCont=false ){ // carica la gallery in contGallery
		let HTML = '',
			totFiles = 0,
			afterFunct = '';
		if(!idU)idU = DB.login.data.idUtente;
		PH.idU = idU;
		if(PH.galleryProvvisoria.length){
			for(let i in PH.galleryProvvisoria){
				totFiles++;
				let src = '',
					cls = '',
					name = '',
					locale = false;
				if(__(PH.galleryProvvisoria[i].nuova)){
					locale = true;
					src = PH.galleryProvvisoria[i].imgMini;
				}
				if(!locale){
					for(let f in DB.files.data){
						if(DB.files.data[f].idFile == PH.galleryProvvisoria[i].idFile){
							if(DB.files.data[f].imgMini){
								locale = true;
								src = DB.files.data[f].imgMini;
								name = __(DB.files.data[f].name);
							}
						}
					}
				}
				if(__(PH.galleryProvvisoria[i].imgMini)){
					if(!src && PH.galleryProvvisoria[i].imgMini.indexOf("data:")!=0)src = PH.galleryProvvisoria[i].imgMini;
				}
				let isFile = false;
				if(src && src.indexOf("data:")!=0){
					isFile = true;
					type = src;
					src = 'img/ext/'+src+'Big.jpg';
				}
				if(!locale){
					if(CONN.getConn()){
						// se connesso a internet la scarico
						afterFunct += "CONN.caricaUrl(	'"+"getImgGallery.php','n="+i+"&iU="+PH.idU+"&idFile="+PH.galleryProvvisoria[i].idFile+"','PH.scriviFile');";
					}else{
						cls='noConn';
					}
				}
				
				HTML += '<div>' +
						'	<div id="gall_'+i+'"' +
						'		  class="' +
								  ((cls) ? cls : '') +
							  	  ((locale) ? 'fileLocale' : '') + '">' +
						'		<div class="imgEl"' +
						'			 data-id="'+PH.galleryProvvisoria[i].idFile+'"' +
									 ((src) ? ' style="background-image:url(\''+src+'\');"' : '') +
						'			 onClick="';
						
				if(!PH.actionClick){
					HTML += 'if(!PH.overCestino)';
					if(!isFile)HTML += 'PH.fullPhoto('+i+','+locale+');';
					else HTML += 'PH.openFile('+i+',\'\',type);';
				}else HTML += PH.actionClick;
				HTML += '"';
				if(name)HTML += ' title="'+htmlEntities(name)+'"';
				HTML += '>';
				if(!PH.actionClick){
					HTML += 
						'			<img class="gall_full"' +
						'			 	 src="img/ico_';
					if(!isFile)HTML += 'fullscreen';
					else HTML += 'dwnl';
					HTML += '.png">';
				}else HTML += '<img src="img/spuntaB.png"/>';
				if(!vis)HTML += 
						'			<img class="gall_del"' +
						'			 	 src="img/ico_cestinoB.png"' +
						'			 	 onMouseOver="PH.overCestino=true;"' +
						'			 	 onMouseOut="PH.overCestino=false;"' +
						'			 	 onClick="PH.eliminaFile('+i+');">';
				HTML += '		</div>' +
						'	</div>';
				let Dida = __(PH.galleryProvvisoria[i].Dida);
				if(vis && Dida)HTML +='	<span class="noDefault DidaFile">'+Dida+'</span>';
				if(!vis)HTML += H.r({	t: "t",	
								name: "Dida"+i,	
								value: Dida,
								classRiga: "DidaFile",
								classCampo: 'TitTrattDx noDefault',
								label: TXT("InserisciDida"),
								noLabel: true,
								keyupCampo: 'H.auto_height(this);' });
				if(dett && !PH.actionClick){
					HTML += '<div class="dettagliFile"><b>'+TXT("DettagliGallery")+'</b><br>' +
							TXT("DimensioniGallery")+': <span id="dim'+i+'">...</span><br>' +
							TXT("DataGallery")+': <span id="dt'+i+'">...</span><br><br>' +
							TXT("UbicazioneGallery")+': <span id="ub'+i+'">...</span><br>' +
							'</div>';
				}
				HTML += '</div>';
			}
			document.getElementById("contGallery"+((PH.actionClick)?'Ar':'')).classList.add("galleryFull");
			document.getElementById("contGallery"+((PH.actionClick)?'Ar':'')).innerHTML = HTML;
			if(!vis){
				setTimeout( function(){
					PH.resizeDida();
				}, 500);
			}
			if(dett && !PH.actionClick){
				setTimeout( function(){
					let procs = [];
					for(let s in sets){
						let siglaProc = sets[s].siglaProc,
							nome = sets[s].nome;
						if(!procs[siglaProc] && typeof(siglaProc)!='undefined')procs[siglaProc] = [];
						if(typeof(procs[siglaProc])!='undefined'){
							if(procs[siglaProc].indexOf(nome)==-1)procs[siglaProc].push(nome);
						}
					}
					n=-1;
					for(let f in DB.files.data){
						if(__(DB.files.data[f].frv,false)==(LOGIN._frv()=='frv')){
							n++;
							let dim = DB._getStringMemorySize(IMPORTER.COMPR(DB.files.data[f].imgMini));
							if(dim<1000*1000){
								dimTxt = parseInt(dim/(1000))+"KB";
							}else{
								dimTxt = ArrotondaEuro(dim/(1000*1000))+"MB";
							}
							document.getElementById('dim'+n).innerHTML = dimTxt;
							document.getElementById('dt'+n).innerHTML =  getDataTS(parseInt(DB.files.data[f].idFile.split("_")[1]/1000));
							
							
							let ubicazione = "",
								u = 0;
							for(let p in DB.pazienti.data){
								// verifico nel paziente
								let gallery =  __(DB.pazienti.data[p].gallery,[]);
								if(gallery.length){
									for(let g in gallery){
										if(DB.files.data[f].idFile == gallery[g].idFile){
											u++;
											ubicazione += "<p><b>"+u+"</b> ) <i>"+TXT("EtClienteGallery")+"</i> "+DB.pazienti.data[p].Nome+" "+DB.pazienti.data[p].Cognome + '</p>';
										}
									}
								}
								// verifico nei trattamenti
								for(t in DB.pazienti.data[p].trattamenti){
									if(DB.pazienti.data[p].trattamenti[t].gallery){
										let gallery =  clone(DB.pazienti.data[p].trattamenti[t].gallery);
										if(gallery.length){
											for(let g in gallery){
												if(DB.files.data[f].idFile == gallery[g].idFile){
													let tit = DB.pazienti.data[p].trattamenti[t].TitoloTrattamento;
													if(!tit)tit = '...';
													u++;
													ubicazione += "<p><b>"+u+"</b> ) <i>"+TXT("EtTrattamentoGallery")+"</i> "+DB.pazienti.data[p].Nome+" "+DB.pazienti.data[p].Cognome + ' &gt; ' + tit + '</p>';
												}
											}
										}
									}
								}
							}
							for(let p in DB.procedure.data){
								// verifico nella procedura
								let gallery =  __(DB.procedure.data[p].gallery,[]);
								if(gallery.length){
									for(let g in gallery){
										if(DB.files.data[f].idFile == gallery[g].idFile){
											u++;
											ubicazione += "<p><b>"+u+"</b> ) <i>"+TXT("EtProceduraGallery")+" ("+procs[DB.procedure.data[p].app]+")</i> "+DB.procedure.data[p].NomeProcedura + '</p>';
										}
									}
								}
							}
							if(!ubicazione)ubicazione = TXT("NoUbGallery");
							document.getElementById('ub'+n).innerHTML = '<br>'+ubicazione;
						}
					}
				}, 500);
			}
		}
		if(!totFiles){
			document.getElementById("contGallery"+((PH.actionClick)?'Ar':'')).classList.remove("galleryFull");
			if(!hideNoCont)HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes")+'...' +
					'</div>';
		}else{
			setTimeout( function(){
				if(__(DB.files.update,false)){
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files)).then(function(){ // salvo il DB
						DB.files.update = false;
					});
				}
			}, 5000);
		}
		if(!vis){
			if(totFiles < PH.maxFiles)document.getElementById('p_add_dett').style.display = 'block';
			else document.getElementById('p_add_dett').style.display = 'none';
			document.getElementById('totFiles').innerHTML = totFiles;
		}
				
		document.getElementById("contGallery"+((PH.actionClick)?'Ar':'')).innerHTML = HTML;
		if(afterFunct)eval(afterFunct);
	},
	resizeDida: function(){ // ridimensiona il campo dida in base al testo digitato
		for(let i in PH.galleryProvvisoria){
			H.auto_height(document.getElementById('Dida'+i));
		}
	},
	scriviFile: function( res ){ // scrive la miniatura
		res = JSON.parse( res );
		let presente = false;
		for(let f in DB.files.data){
			if(res.idFile == DB.files.data[f].idFile){
				presente = f;
			}
		}
		for(let f in PH.galleryProvvisoria){
			if(res.idFile == PH.galleryProvvisoria[f].idFile && __(PH.galleryProvvisoria[f].imported,false)){
				presente = f;
				console.log("OK")
			}
		}
		if(!presente){
			if(PH.galleryOnline.indexOf(res.idFile)==-1){
				DB.files.data.push({
					idFile: res.idFile,
					imgMini: res.imgMini,
					name: res.name
				});
				DB.files.update = true;
			}
		}else{
			if(!__(DB.files.data[presente].imgMini)){
				DB.files.data[presente].imgMini = res.imgMini;
				DB.files.update = true;
			}
		}
		if(document.getElementById("gall_"+res.n)){
			if(res.imgMini)document.getElementById("gall_"+res.n).getElementsByTagName('div')[0].style.backgroundImage='url(\''+res.imgMini+'\')';
		}
	},
	selezionaFile: function( element ){ // seleziona i files che si carica con il pulsante carica files
		PH.encodeImageFileAsURL( element, false, true, 'PH.aggiungiFile' );
	},
	aggiungiFile: function( obj ){ // carica un nuova file nella gallery
		obj = JSON.parse(obj);
		let d = new Date()*1;
		/* let nuova = true; */
		if(__(obj.idFile)){
			d = obj.idFile;
		}
		let JSNPUSH = {	idFile: "file_"+d,
						imgMini: obj.imgMini,
						imgBig: obj.imgBig,
						nuova: true }
						console.log(JSNPUSH)
		PH.galleryProvvisoria.push(JSNPUSH);
		PH.caricaGallery();
		SCHEDA.formModificato = true;
	},
	eliminaFile: function( f ){ // elimina il file dalla gallery
		CONFIRM.vis(	TXT("ChiediEliminaFile"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));

			PH.galleryProvvisoria.splice(f,1);
			
			PH.caricaGallery();
			SCHEDA.formModificato = true;
		}});
	},
	eliminaFileOnline: function( idFile ){ // elimina il file dalla gallery online
		CONFIRM.vis(	TXT("ChiediEliminaFile"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			CONN.caricaUrl(	'delImgGallery.php',
							'iU='+PH.idU+'&idFile='+idFile,
							'PH.car_gallery_online');
			
		}});
	},
	fullPhoto: function( i, locale, elenco = PH.galleryProvvisoria ){ // elabora la richiesta di mostrare il file BIG
		locale = false;
		let pass = true;
		if(__(elenco[i].nuova)){
			locale = true;
			src = elenco[i].imgBig;
		}
		if(!locale){
			for(let f in DB.files.data){
				if(DB.files.data[f].idFile == elenco[i].idFile){
					if(DB.files.data[f].imgBig){
						locale = true;
						src = DB.files.data[f].imgBig;
					}
				}
			}
		}
		//if(!locale)pass = CONN.retNoConn();
		if(pass){
			visLoader("");
			PH.openedImg = i;
			if(!locale && CONN.getConn()){
				idU = PH.idU;
				if(LOGIN._frv())idU = 'frv';
				CONN.caricaUrl(	'getImgGallery.php',
								'big=1&n='+i+'&iU='+idU+'&idFile='+elenco[i].idFile,
								'PH.scriviPhotoBig');
			}else{
				let locale = false;
				if(__(elenco[i].nuova)){
					locale = true;
					files = elenco[i];
				}
				if(!locale){
					for(let f in DB.files.data){
						if(DB.files.data[f].idFile == elenco[i].idFile){
							files = DB.files.data[f];
						}
					}
				}
				PH.scriviPhotoBig( JSON.stringify(files) );
			}
		}
	},
	chiudiFoto: function(){
		PH.openedImg = -1;
		nasLoader();
		document.getElementById("editFileBig").classList.remove("visSch");
	},
	openFile: function( i, elenco = PH.galleryProvvisoria	, fileType ){ // apro il file online
		if(!CONN.retNoConn())return;
		if(!elenco)elenco = PH.galleryProvvisoria;	
		if(fileType=='pdf' && !android)PH.visPdfBig(CONN.APIfolder+"getFile.php?inline=1&c="+DB.login.data.TOKEN+localStorage.UniqueId+elenco[i].idFile.replace("file_","")+DB.login.data.idUtente);
		else CONN.openUrl(CONN.APIfolder+"getFile.php?c="+DB.login.data.TOKEN+localStorage.UniqueId+elenco[i].idFile.replace("file_","")+DB.login.data.idUtente);
	},
	scriviPhotoBig: function( res ){ // scrive il file BIG
		res = JSON.parse( res );
		let lowRes = false,
			urlImg = res.imgBig;
		if(!urlImg || urlImg=='404'){
			for(let f in DB.files.data){
				if(DB.files.data[f].idFile == res.idFile){
					urlImg = DB.files.data[f].imgMini;
					lowRes = true;
				}
			}
		}
		document.getElementById("file_alert").classList.remove("visSch");
		document.getElementById("editFileBig").classList.toggle("visSch",SCHEDA.form);
		document.getElementById("fileBig").classList.remove("noLoader");
		document.getElementById("fileBig").style.backgroundImage='url(\''+urlImg+'\')';
		if(lowRes){
			if(!CONN.getConn())msg = TXT("AlertImgLowNoConn");
			else msg = TXT("AlertImgLow");
			document.getElementById("file_alert").classList.add("visSch");
			document.getElementById("editFileBig").classList.remove("visSch");
			document.getElementById("file_alert").innerHTML = stripslashes(msg);
		}
	},	
	visPdfBig: function( url ){ // visualizza il PDF in iframe
		document.getElementById("pdfBig").classList.remove("noLoader");
		document.getElementById("frPdf").src = url;
	},	
	
	car_gallery: function(){ // carica la scheda dei files del menu ARCHIVI
		// verifico le autorizzazioni
		if(!DB.login.data.auths.length){
			setTimeout(function(){
				ALERT(TXT("MsgFunzioneSoloPay"));
			},100);
			return;
		}
		// --------------------------
		let space = DB._getStringMemorySize(IMPORTER.COMPR(DB.files)),
			spaceAvail = (45*1000*1000 - DB.__sizeDb),
			perc = (space*100) / spaceAvail,
			spaceTxt = '<b>';
		if(space<1000*1000){
			spaceTxt += parseInt(space/(1000))+"KB";
		}else{
			spaceTxt += ArrotondaEuro(space/(1000*1000))+"MB";
		}
		spaceTxt += '</b> ('+parseInt(perc)+'%)'
		
		let number = DB.files.data.length,
			HTML = 	'<p>'+htmlEntities(TXT("SpiegazioneGallery"))+'</p>' +
					'<div>'+htmlEntities(TXT("NumberGallery"))+': <b>'+number+'</b><br>' +
					htmlEntities(TXT("SpaceGallery"))+': '+spaceTxt+'</div>' +
					'<div id="perc_cont"><div style="width:'+perc+'%"></div></div>';
		
		
		
		let btnAdd = '';
		btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.suppliers.overview\')">' +
						TXT("ReferenceGuide") +
					'</div>';
		
		// GALLERY
		HTML += '<div id="contGallery" class="contGallery">'+TXT("Caricamento")+'...</div>';
		HTML += '<div class="sezioneTrattamenti divEspansa "' +
		'	  style="' +
		'	  border-top: none !important;' +
		'	  height:20px;' +
		'	  margin-top:20px;' +
		'	  padding: 0px;' +
		'	  background-color: rgba(0,0,0,0.15);"></div>';
		let cont = '<div id="contGalleryOnline" class="contGallery">'+TXT("Caricamento")+'...</div>';
		
		HTML += H.sezione({
			label: TXT("GalleryCestinate"),
			nome: 'filescestinati',
			aperta: false,
			html: cont
					});	
		
		SCHEDA.caricaScheda(	stripslashes(TXT("ElFiles")),
								HTML,
								'PH.chiudiGallery();',
								'scheda_gallery',
								false,
								true,
								false,
								btnAdd );
								
		PH.car_gallery_local();
		PH.car_gallery_online();
	},
	car_gallery_local: function(){ // legge la lista dei file locali
		PH.galleryProvvisoria = [];
		for(let f in DB.files.data){
			if(__(DB.files.data[f].frv,false)==(LOGIN._frv()=='frv'))PH.galleryProvvisoria.push({ idFile: DB.files.data[f].idFile, Dida: '' });
		}
		PH.caricaGallery(true,'',true);
	},
	car_gallery_online: function(){ // legge la lsta dei files online
		if(CONN.getConn() && LOGIN.logedin()!=''){
			CONN.caricaUrl(	'getImgGallery_GLOBAL.php','b64=1&iU='+DB.login.data.idUtente+'&online=1&&JSNPOST='+window.btoa(encodeURIComponent(JSON.stringify([]))),'PH.car_gallery_online_post');
		}else PH.car_gallery_online_post('');
	},
	car_gallery_online_post: function( res ){ // carica la gallery in contGalleryOnline
		HTML = '';
		PH.galleryOnline = [];
		if(res){
			let files = JSON.parse(res);
			for(let f=files.length-1;f>=0;f--){
				presente = false;
				for(let i in DB.files.data){
					if(DB.files.data[i].idFile == files[f].idFile)presente = true;
				}
				if(presente)files.splice(f,1);
			}
			PH.galleryOnline = files;
		}
		if(PH.galleryOnline.length){
			for(let f in PH.galleryOnline){
				let src = PH.galleryOnline[f].imgMini,
					isFile = false,
					type = '';
				if(src && src.indexOf("data:")!=0){
					isFile = true;
					type = src;
					src = 'img/ext/'+src+'Big.jpg';
				}
				HTML += '<div ' + ((!PH.actionClick)?'class="fileMini"':'')+'>' +
						'	<div id="gall_'+f+'">' +
						'		<div class="imgEl"' +
						'			 data-id="'+PH.galleryOnline[f].idFile+'"' +
						'			 data-type="'+type+'"' +
						'			 style="background-image:url(\''+src+'\');"' +
						'	 		 onClick="';
				if(!PH.actionClick){
					HTML += 'if(!PH.overCestino)';
					if(!isFile)HTML += 'PH.fullPhoto('+f+',false,PH.galleryOnline);';
					else HTML += 'PH.openFile('+f+',PH.galleryOnline,type);';
				}else HTML += PH.actionClick;
				HTML += '"';
				if(__(PH.galleryOnline[f].name))HTML += ' title="'+htmlEntities(PH.galleryOnline[f].name)+'"';
				HTML += '>';
				if(!PH.actionClick){
					HTML += 
						'			<img class="gall_full"' +
						'			 	 src="img/ico_';
					if(!isFile)HTML += 'fullscreen';
					else HTML += 'dwnl';
					HTML += '.png">';
				}else HTML += '<img src="img/spuntaB.png"/>';
				
				HTML += 
						'			<img class="gall_del"' +
						'			 	 src="img/ico_cestinoB.png"' +
						'			 	 onMouseOver="PH.overCestino=true;"' +
						'			 	 onMouseOut="PH.overCestino=false;"' +
						'			 	 onClick="PH.eliminaFileOnline(\''+PH.galleryOnline[f].idFile+'\');">';
						
				HTML += '		</div>' +
						'	</div>' +
						'</div>';
				
			}
		}else if(CONN.getConn()){
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes")+'...' +
					'</div>';
		}else{
			HTML += '<div class="noConn"' +
					'	  style="height:100px;border-radius:8px;background-size:contain !important;">' +
					'</div>';
		}
		document.getElementById("contGallery"+((PH.actionClick)?'Ar':'')+"Online").innerHTML = HTML;
	},
	chiudiGallery: function(){ // chiamata alla chiusura della scheda files
		if(!SCHEDA.schedaAperta)PH.galleryProvvisoria = [];
		PH.actionClick = '';
	},
	
	apriArchives: function(){ // apre il popup degli archivi
		PH.oldGallery = PH.galleryProvvisoria;
		document.getElementById("listsArchives").innerHTML = 
			'<div id="contGalleryAr" class="contGallery vis">'+TXT("Caricamento")+'</div>' +
			'<div id="contGalleryArOnline" class="contGallery">'+TXT("Caricamento")+'</div>';
		PH.actionClick = "PH.selFile(this)";
		document.getElementById("btnArImport").getElementsByTagName("span")[0].innerHTML = '0';
		document.getElementById("btnArImport").classList.remove("act");
		PH.car_gallery_local();
		PH.car_gallery_online();
	},
	chiudiArchives: function(){ // richiamato alla chiusura del popup degli archivi
		PH.actionClick = '';
		document.getElementById("listsArchives").innerHTML = '';
		if(PH.oldGallery.length){
			PH.galleryProvvisoria = PH.oldGallery;
			PH.oldGallery = [];
		}
	},
	selArchive: function( online ){ // seleziona l'archivio (locale o online) nel popup di scelta file
		document.getElementById("contArchives").classList.toggle("online",online);
	},
	selFile: function( el ){ // seleziona un file nel popup di scelta file
		el.classList.toggle("sel");
		let els = document.getElementById("listsArchives").querySelectorAll(".sel");
		document.getElementById("btnArImport").getElementsByTagName("span")[0].innerHTML = els.length;
		document.getElementById("btnArImport").classList.toggle("act",(els.length));
	},
	importaFile: function(){ // importa o nella gallery della scheda aperta
		let els = document.getElementById("listsArchives").querySelectorAll(".sel");
		if(!els.length)return;
		newGallery = PH.oldGallery;
		for(let e=0;e<els.length;e++){
			let JSNPUSH = {	
				idFile: els[e].dataset.id,
				imported: true
			};
			if(els[e].dataset.type)JSNPUSH.imgMini = els[e].dataset.type;
			newGallery.push(JSNPUSH);
		}
		MENU.visArchives();
		PH.galleryProvvisoria = newGallery;
		PH.caricaGallery();
		SCHEDA.formModificato = true;
	},

	screenShot: function(){ // acquisisce lo screenshot del manichino
		let srcCanvas = document.getElementById("container").getElementsByTagName("canvas")[0],
			destinationCanvas = document.createElement("canvas");
		destinationCanvas.width = srcCanvas.width;
		destinationCanvas.height = srcCanvas.height;

		let destCtx = destinationCanvas.getContext('2d');

		//create a rectangle with the desired color
		destCtx.fillStyle = "#FFFFFF";
		destCtx.fillRect(0,0,srcCanvas.width,srcCanvas.height);

		//draw the original canvas onto the destination canvas
		destCtx.drawImage(srcCanvas, 0, 0);

		//finally use the destinationCanvas.toDataURL() method to get the desired output;
		base64 = destinationCanvas.toDataURL('image/jpeg', .8);
		return base64;
	},
	aggiungiScreenshot: function( obj ){ // aggiunge lo screenshot alla gallery
		PH.img.src = DW.destImg.src;
		let imgMini = PH.returnImageConverted();
		obj = {
			imgMini: imgMini,
			imgBig: (PH.makeBig) ? PH.returnImageConverted( true ) : '',
			fileType: imgMini.split("data:")[1].split(";")[0]
		};
		PH.aggiungiFile( JSON.stringify(obj) );
	},
	editImg: function( screenshot = false ){ // acquisisce lo screenshot del manichino e lo apre in disegno
		if(!globals.modello.cartella && screenshot)return;
		PH.functPH = screenshot ? "PH.aggiungiScreenshot" : "PH.sostImg";
		PH.makeBig = true;
		PH.img = document.getElementById("img_PH");
		PH.img.style.width = '';
		PH.img.style.height = '';
		PH.img.onload = function(){
			PH.res = null;
			PH.draw();
			PH.img.style.width = PH.img.width;
			PH.img.style.width = PH.img.height;
			visLoader("");
			document.getElementById("img_resizer").classList.add("nasRes");
			document.getElementById("img_pulsanti").classList.add("editable");
			document.getElementById("img_draw_tools").classList.remove("nasRes");
			document.getElementById("photo").classList.add("visPHop");
		};
		let el = document.getElementById("fileBig");
		PH.img.src = screenshot ? PH.screenShot() : el.style.backgroundImage.replace('url("','').replace('")','');
		el.classList.add("noLoader");
		el.style.backgroundImage = '';
		document.getElementById("photo").classList.add("visPH");
		document.getElementById("img_draw_undo").classList.remove("active");
	},
	aggiungiScreenshot: function( obj ){ // aggiunge lo screenshot alla gallery
		PH.img.src = DW.destImg.src;
		let imgMini = PH.returnImageConverted();
		obj = {
			imgMini: imgMini,
			imgBig: (PH.makeBig) ? PH.returnImageConverted( true ) : '',
			fileType: imgMini.split("data:")[1].split(";")[0]
		};
		PH.aggiungiFile( JSON.stringify(obj) );
	},
	sostImg: function(){ // acquisisce lo screenshot del manichino e lo apre in disegno
		PH.img.src = DW.destImg.src;
		let imgMini = PH.returnImageConverted();
		PH.galleryProvvisoria[PH.openedImg].imgMini = imgMini;
		PH.galleryProvvisoria[PH.openedImg].imgBig = PH.returnImageConverted( true );
		document.getElementById("gall_"+PH.openedImg).getElementsByTagName("div")[0].style.backgroundImage = 'url("'+imgMini+'")';
		PH.chiudiFoto();
	}
	
}

var DW = {
	lineWidth:0,
	isMousedown: false,
	points: [],
	firstPointMultiplier: 0,
	startWidth: 1,
	endWidth: 2,
	drawColor: '#000',
	drawStyle: 'linear', // o smoth
	isPencil: false,
	strokeHistory: [],
	canvas: null,
	context: null,
	initialied: false,
	xCanvas: 0,
	yCanvas: 0,
	destImg: null,

	_init: function( image ){ // inizializza il canvas del disegno
		if(!this.initialized){
			this.canvas = document.getElementById("img_CV");
			for(const ev of ["touchstart", "mousedown"]) {
				this.canvas.addEventListener(ev, function (e) {
					DW.drawStart(e);
				});
			}
			for(const ev of ['touchmove', 'mousemove']) {
				this.canvas.addEventListener(ev, function (e) {
					DW.drawMove(e);
				});
			}
			for(const ev of ['touchend', 'touchleave', 'mouseup']) {
				this.canvas.addEventListener(ev, function (e) {
					DW.drawEnd();
				});
			}
			window.addEventListener("resize", function(){
				DW.xCanvas = tCoord(DW.canvas);
				DW.yCanvas = tCoord(DW.canvas,'y');
			});
			this.detectProperties();
			this.initialized = true;
		}
		document.querySelector(".cont_canvasImmagine").classList.add("canvas_big");
		//let ctx = this.canvas.getContext('2d');
		this.context = this.canvas.getContext('2d');
		this.canvas.width = this.canvas.scrollWidth;
		this.canvas.height = this.canvas.scrollHeight;
		this.context.drawImage(PH.img, 0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
		this.xCanvas = tCoord(this.canvas);
		this.yCanvas = tCoord(this.canvas,'y');
		this.destImg=new Image();
		this.destImg.src = PH.img.src;
		this.strokeHistory = [];
	},
	drawStart: function( e ){ // touch, mouse o pencil down
		let pressure = 0.1;
		let x, y;
		if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
			if (e.touches[0]["force"] > 0) {
				pressure = e.touches[0]["force"];
			}
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;
			if(e.touches[0]["force"] !== "undefined")this.isPencil = true;
		}else{
			if(this.isPencil)return;
			pressure = 1.0
			x = e.pageX;
			y = e.pageY;

		}
		x -= this.xCanvas;
		y -= this.yCanvas;
		if(this.drawStyle == 'linear')pressure = 1.0;
		this.isMousedown = true;
		this.lineWidth = Math.log(pressure + this.firstPointMultiplier) * this.startWidth;
		this.context.lineWidth = this.lineWidth; // pressure * 50;
		let drawColor = this.drawColor;
		let lineWidth = this.lineWidth;
		this.points.push({ x, y, lineWidth, drawColor });
		this.drawOnCanvas(this.points);
	},
	drawMove: function( e ){ // touch, mouse o pencil move
		if(!this.isMousedown) return;
		e.preventDefault();
		let pressure = 0.1;
		let x, y;
		if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
			if (e.touches[0]["force"] > 0) {
				pressure = e.touches[0]["force"]*3;
			}
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;
		}else{
			if(this.isPencil)return;
			pressure = 1.0;
			x = e.pageX;
			y = e.pageY;
		}
		x -= this.xCanvas;
		y -= this.yCanvas;
		if(this.drawStyle == 'linear')pressure = 1.0;
		// smoothen line width
		if(this.drawStyle == 'linear')this.lineWidth = (Math.log(pressure + 1) * this.endWidth);
		else this.lineWidth = (Math.log(pressure + 1) * this.endWidth * 0.2 + this.lineWidth * 0.8)
		let drawColor = this.drawColor;
		let lineWidth = this.lineWidth;
		this.points.push({ x, y, lineWidth, drawColor });
		this.drawOnCanvas(this.points);
	},
	drawEnd: function(){ // touch, mouse o pencil up
		this.isMousedown = false;
		this.strokeHistory.push([...this.points]);
		this.points = [];
		this.lineWidth = 0;
		this.destImg.src = this.canvas.toDataURL('image/jpeg', 1);
		document.getElementById("img_draw_undo").classList.add("active");
	},
	drawOnCanvas: function( stroke ){ // disegna
		this.context.strokeStyle = 'black';
		this.context.lineCap = 'round';
		this.context.lineJoin = 'round';
		this.context.strokeStyle = this.drawColor;
		const l = stroke.length - 1;
		const point = stroke[l];
		if(point.drawColor)this.context.strokeStyle = point.drawColor;
		if(stroke.length >= 3) {
			const xc = (stroke[l].x + stroke[l - 1].x) / 2;
			const yc = (stroke[l].y + stroke[l - 1].y) / 2;
			this.context.lineWidth = stroke[l - 1].lineWidth;
			this.context.quadraticCurveTo(stroke[l - 1].x, stroke[l - 1].y, xc, yc);
			this.context.stroke();
			this.context.beginPath();
			this.context.moveTo(xc, yc);
		}else{
			this.context.lineWidth = point.lineWidth;
			this.context.beginPath();
			this.context.moveTo(point.x, point.y);
			this.context.stroke();
		}
	},
	undoDraw: function(){ // annulla l'ultimo segno
		this.strokeHistory.pop();
		// this.context.clearRect(0, 0, canvas.width, canvas.height) // per svuotare con il bianco
		this.context.drawImage(PH.img, 0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
		this.strokeHistory.map(function(stroke) {
			if(DW.strokeHistory.length === 0)return;
			DW.context.beginPath();
			let strokePath = [];
			stroke.map(function(point){
				strokePath.push(point),
				DW.drawOnCanvas(strokePath);
			});
		});
		document.getElementById("img_draw_undo").classList.toggle("active",DW.strokeHistory.length);
		this.destImg.src = this.canvas.toDataURL('image/jpeg', 1);
	},
	clearDraw: function(){ // cancella il disegno e ripristina lo screenshot
		this.strokeHistory.pop();
		this.points = [];
		this.context.clearRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
	},
	showDrawDims: function(){ // visualizza le dimensioni disponibili
		document.getElementById("img_draw_dims").classList.toggle("opened");
	},
	showDrawCols: function(){ //visualizza la tavolozza
		document.getElementById("img_draw_cols").classList.toggle("opened");
	},
	setDrawWidth: function( el ){ // setta la dimensione
		this.endWidth = +el.dataset.value;
		this.drawStyle = 'linear';
		this.detectProperties();
	},
	setDrawColor: function( el ){ // setta il colore
		this.drawColor = el.dataset.value;
		this.detectProperties();
	},
	setDrawStyle: function( el ){ // setta lo stile (linear o smoth)
		this.drawStyle = el.dataset.value;
		this.endWidth = 12;
		this.detectProperties();
	},
	detectProperties: function(){ // legge le proprietà del disegno
		let els;
		els = document.getElementById("img_draw_tools").getElementsByTagName("span");
		for(let e=0;e<els.length;e++){
			if(els[e].dataset.value){
				els[e].classList.remove("elSel");
			}
		}
		els = document.getElementById("img_draw_dims").getElementsByTagName("span");
		for(let e=0;e<els.length;e++){
			if(els[e].dataset.value){
				if(els[e].dataset.value!='smoth'){
					els[e].classList.toggle("elSel",this.endWidth==+els[e].dataset.value && this.drawStyle!='smoth');
				}else{
					els[e].classList.toggle("elSel",this.drawStyle=='smoth');
				}
			}
		}
		els = document.getElementById("img_draw_cols").getElementsByTagName("span");
		for(let e=0;e<els.length;e++){
			if(els[e].dataset.value){
				els[e].classList.toggle("elSel",this.drawColor==els[e].dataset.value);
			}
		}
	}
	

}