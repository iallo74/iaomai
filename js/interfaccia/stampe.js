var STAMPE = {

	stampaStage: function(){
		if(!DB.login.data.auths.length){
			setTimeout(function(){
				ALERT(TXT("MsgFunzioneSoloPay"));
			},100);
			return;
		}
		// --------------------------
		MENU.visStampa();
		document.body.classList.add("bodyStampa");
		let rapp = window.innerWidth / window.innerHeight,
			bw = 28,
			bh = 21,
			h = window.innerHeight+210,
			w = (window.innerHeight * (bw+10) ) / bh;
		if(rapp > bw/bh ){
			w = window.innerWidth;
			h = (window.innerWidth * bh ) / (bw+2);
		}
		camera.aspect =  w / h;
		camera.updateProjectionMatrix();
		renderer.setSize( w, h );
		render();
		setTimeout(function(){
			//console.log(Canvas2Img());
			document.getElementById("container").getElementsByTagName("canvas")[0].style.marginLeft = '-400px';
			if(isMac)document.documentElement.style.position = 'relative'; // aggiunto per MAC
			window.print();
			if(isMac)document.documentElement.style.position = 'fixed';
			document.body.classList.remove("bodyStampa");
			onWindowResize();
			setTimeout(function(){MENU.chiudiMenu();},500);
		},500);
	},
	
	stampaScheda: function( obj ){
		if(document.getElementById("menuScheda").className.indexOf("visSch")>-1)SCHEDA.swMenuScheda();
		// verifico le autorizzazioni
		if(!DB.login.data.auths.length){
			setTimeout(function(){
				ALERT(TXT("MsgFunzioneSoloPay"));
			},100);
			return;
		}
		// --------------------------
		document.getElementById("stampa").classList.toggle("visSch");
		let d = new Date(),
			annoAtt=d.getFullYear(),
			cartaIntestata = false,
			TITOLO_PAGINA = document.title,
			nScheda = (SCHEDA.scheda2Aperta ? "2" : ""),
			titolo = document.getElementById("scheda_titolo").innerHTML,
			corpo = document.getElementById("scheda_testo"+nScheda).querySelector(".scheda_stampa").outerHTML;
		if(	typeof(obj)!='undefined'){
			cartaIntestata = true;
			titolo = '';

			if(JSON.stringify(obj)!='{}')TITOLO_PAGINA = htmlEntities(obj.titolo)+" "+htmlEntities(TXT("per"))+" "+htmlEntities(obj.intestazione);

			let dati = '<p>'+htmlEntities(TXT("per"))+' '+htmlEntities(obj.intestazione) + '</p>' + 
						'<p>'+htmlEntities(obj.corpo).replace(/\n/g,'<br>') + '</p>' + 
						'<p style="padding-left:50px;padding-top:50px;"><i>' + TXT("Data") + ':</i> ' + getFullDataTS(d/1000) + '<br><br>' +
						'<i style="font-size:15px;">' + DB.login.data.Nominativo + '</i></p>';
						
			if(JSON.stringify(obj)!='{}'){
				titolo = TITOLO_PAGINA;
				corpo = dati;
			}else{
				titolo = document.getElementById("scheda_titolo").innerHTML;
				corpo = document.getElementById("scheda_testo"+nScheda).querySelector(".scheda_stampa").outerHTML;
			}
		}
		
		let HTML_styles = '',
			lks = document.head.getElementsByTagName("link");
		for(l in lks){
			if(lks[l]){
				if(lks[l].type=="text/css")HTML_styles+=lks[l].outerHTML;
			}
		}
		lks = document.getElementById("scripts").getElementsByTagName("link");
		for(l in lks){
			if(lks[l]){
				if(lks[l].type=="text/css")HTML_styles+=lks[l].outerHTML;
			}
		}
		HTML_styles = HTML_styles.replace(/\?v=[\d]+"/g,'"').replace(/\ id="[^"]+"/g,'');
		
		let HTML = 
				'<html class="htmlStampa">' +
				'	<head>' +
				'		<script language="Javascript">' +
				'			var caricato = false;' +
				'			setTimeout(function(){' +
				'				parent.STAMPE.convImgsFrame();' +
				'				setTimeout(function(){' +
				'					window.print();' +
				'					parent.document.getElementById("stampa").classList.toggle("visSch");' +
				'				},2000);' +
				//'				window.close();' +
				'			},1000);' +
				'		</script>' +
						HTML_styles +
				'		<title>' +
				'			'+TITOLO_PAGINA+'' +
				'		</title>' +
				'	</head>' +
				'	<body style="background:#FFF;" class="bodyStampa">';
		if(!cartaIntestata)HTML += 
				'		<div style="margin-bottom:10px;' +
				//'					border-bottom:1px solid #DDD;' +
				'					width:100%;">'+
		 		'			<table width="100%"' +
				'				   id="testataStampa"' +
				'				   cellpadding="10"' +
				'				   cellspacing="0"' +
				'				   border="0">' +
				'				<tr>' +
				'				   	<td align="right"' +
				'				   		valign="middle"' +
				'				   		style="font-size:11px;opacity:0.7;">' +
				'				   		&copy;'+annoAtt+' iáomai&#8482; | All rights reserved' +
				'				   	</td>' +
				'				</tr>' +
				'			</table>' +
				'		</div>';
		else{
			let logo = __(DB.login.data.logoAzienda);
			HTML += '<div style="' +
					'text-align:left;' +
					'border-bottom:1px solid #DDD;margin-bottom:20px;">';
					(logo ? '<img src="'+logo+'" style="height:80px;float:left;margin-right:10px;">' : '') +
					'<span style="display:inline-block;font-size:11px;">' + DB.login.data.Intestazione.replace(/\n/gi,"<br>") + '</span>' +
					'<div class="l" style="margin-bottom:20px;"></div></div>';
		}
		HTML += '		<div id="cont">';
		if(titolo && corpo.indexOf("<h1")==-1)HTML +=
				'			<h1 style="font-size: 35px;' +
				'			   		   font-weight: normal;' +
				'			   		   text-align: left;' +
				'			   		   margin-top: 0px;' +
				'			   		   display: inline-block;' +
				'			   		   width: calc(100% - 20px);">' +
								titolo +
				'			</h1>';
		HTML += '			<div id="scheda"' +
				'			   	 style="display:block;' +
				'			   	 		position:relative;"' +
				'			   	 class="schLibera sch_Max800 scheda_paziente schForm contStampa">' +
				'				<div id="scheda_cont"' +
				'			   	 	 style="display:block;' +
				'			   	 	  		box-shadow:none !important;' +
				'			   	 	  		background-color:#FFF;">' +
				'			   		<div id="scheda_testo"' +
				'			   	 	  	 style="background-color:#FFF;' +
				'			   	 	  			display:block;' +
				'			   	 	  			height:auto;' +
				'			   	 	  			overflow:visible;' +
				'			   	 	  			text-align: left;' +
				'			   	 	  			border-top: none;">' +
										corpo +
				'					</div>' +
				'				</div>' +
				'			</div>' +
				'		</div>' +
				'	</body>' +
				'</html>';
		frStampa = document.getElementById("stampaFrame").contentWindow;
		frStampa.document.open('text/html');
		frStampa.document.write(HTML);
	},
	
	// Funzione per sostituire un background-image con un tag img
	convertBackgroundToImg: function(targetElement) {

		//if (!(targetElement instanceof Element)) {
		//   console.error("L'elemento passato non è un nodo DOM valido.");
		//   return;
		//}

		// Ottieni lo stile calcolato del div
		let computedStyle = window.getComputedStyle(targetElement);

		// Estrai il background-image e rimuovi `url("...")`
		let backgroundImage = computedStyle.backgroundImage;
		if (!backgroundImage || backgroundImage === "none") {
			//console.warn("Nessuna immagine di sfondo trovata");
			return;
		}
		let imageUrl = backgroundImage.replace(/url\(["']?(.*?)["']?\)/, '$1');
			imageUrl = imageUrl.replace("(&quot;","").replace("&quot;)","");
			imageUrl = imageUrl.replace('("','').replace('")','');
		if(imageUrl.indexOf("loadingBlack")>-1)return;
		if(!imageUrl)return;
		// Crea il tag <img>
		let imgElement = document.createElement("img");
		imgElement.src = imageUrl;
		imgElement.classList.add("background-img-replacement");

		// Assicura che il div abbia `position: relative` o `absolute`
		if (computedStyle.position === "static") {
			targetElement.style.position = "relative";
		}

		// Configura posizione base dell'img
		imgElement.style.position = "absolute";
		imgElement.style.top = "0";
		imgElement.style.left = "0";
		imgElement.style.zIndex = imageUrl.indexOf("avatar")>-1 ? "0" : "1"; // Ora è sopra tutti gli elementi

		// Gestisce `background-size`
		let bgSize = computedStyle.backgroundSize;

		if (bgSize === "cover") {
			imgElement.style.width = "100%";
			imgElement.style.height = "100%";
			imgElement.style.objectFit = "cover"; 
		} else if (bgSize === "contain") {
			imgElement.style.width = "100%";
			imgElement.style.height = "100%";
			imgElement.style.objectFit = "contain";
		} else if (bgSize.includes("px") || bgSize.includes("%")) {
			let [sizeX, sizeY] = bgSize.split(" ");
			imgElement.style.width = sizeX;
			imgElement.style.height = sizeY || "auto"; // Auto per mantenere le proporzioni
		} else {
			imgElement.style.width = "auto";
			imgElement.style.height = "auto";
		}

		// **Gestione precisa del background-position**
		let bgPosition = computedStyle.backgroundPosition.split(" ");
		let posX = bgPosition[0] || "50%";
		let posY = bgPosition[1] || "50%";

		// Converti valori di posizione in percentuali (se servono)
		const positionMap = {
			"left": "0%", "center": "50%", "right": "100%",
			"top": "0%", "bottom": "100%"
		};

		posX = positionMap[posX] || posX;
		posY = positionMap[posY] || posY;

		imgElement.style.objectPosition = `${posX} ${posY}`;
		if(posX=='100%'){
			imgElement.style.left = 'auto';
			imgElement.style.right = '0';
		}else if(posX!="50%")imgElement.style.marginLeft = "-"+posX;
		if(posY=='100%'){
			imgElement.style.top = 'auto';
			imgElement.style.bottom = '0';
		}else if(posY!="50%")imgElement.style.marginTop = "-"+posY;
		imgElement.style.opacity = 1;
		
		// Aggiungi l'immagine al div
		targetElement.appendChild(imgElement);

		// Rimuovi il background-image originale
		targetElement.style.backgroundImage = "none";
		targetElement.style.overflow = 'hidden';
		// Aggiorna l'immagine quando la finestra viene ridimensionata
		window.addEventListener("resize", () => {
			let computedStyle = window.getComputedStyle(targetElement);
			imgElement.style.width = computedStyle.width;
			imgElement.style.height = computedStyle.height;
		});
	},

	convImgsFrame: function(){
		if(document.getElementById("formMod"))STAMPE.syncFormValuesToIframe("#formMod", "stampaFrame");
		var divs = document.getElementById("stampaFrame").contentWindow.document.getElementsByTagName("div");
		for(d in divs){
			if(typeof(divs[d])=='object'){
				if(!divs[d]?.classList?.contains("noPrint"))STAMPE.convertBackgroundToImg(divs[d]);
			}
		}
	},


	syncFormValuesToIframe: function(formSelector, frameId) {
		let form = document.querySelector(formSelector);
		let iframe = document.getElementById(frameId);

		if (!form || !iframe) {
			console.error("Form o iframe non trovati.");
			return;
		}

		let iframeDocument = iframe.contentWindow.document;
		let iframeForm = iframeDocument.querySelector(formSelector);

		if (!iframeForm) {
			console.error("Il form non esiste nell'iframe.");
			return;
		}

		// **1️ Trova tutti gli input, textarea e select**
		let originalInputs = form.querySelectorAll("input, textarea, select");
		let iframeInputs = iframeForm.querySelectorAll("input, textarea, select");

		// **2️ Aggiorna solo i valori nei campi corrispondenti**
		originalInputs.forEach((input, index) => {
			if (iframeInputs[index]) {
				if (input.type === "checkbox" || input.type === "radio") {
					iframeInputs[index].checked = input.checked;
				} else {
					iframeInputs[index].value = input.value;
				}
			}
		});
	}
}
