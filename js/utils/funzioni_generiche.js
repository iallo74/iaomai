
function tCoord(obj,q){
	let c=0,
		L='Left';
	if(q=='y')L='Top';
	if(brw_OPERA){
		if(L=='Left')c=obj.getBoundingClientRect().left;
		else c=obj.getBoundingClientRect().top;
	}else{
		c+=eval("obj.offset"+L);
		while(obj=obj.offsetParent){c+=eval("obj.offset"+L);}	
	}
	return c;
}

function tPixel(t,c){
	let txt=eval("t.style."+c);
	txt=txt.substr(0,txt.length-2);
	return txt*1;
}

function getPropCSS(el,prop){ // estrae una proprietà dagli STILI
	txt=window.getComputedStyle(el).getPropertyValue(prop);
	txt=txt.substr(0,txt.length-2);
	return txt*1;
}

function WF(){
	if(document.body.clientWidth)return document.body.clientWidth;
	else return window.innerWidth;
}

function HF(){
	if(document.body.clientHeight)return document.body.clientHeight;
	else return window.innerHeight;
}

function visToolTip(txt){
	if(touchable)return;
	document.getElementById("tooltip").classList.add("tooltipVis");
	document.getElementById("tooltip").innerHTML=txt;
	let x = mouse.xAbs+15;
	if(x + document.getElementById("tooltip").scrollWidth > WF())x = WF() - document.getElementById("tooltip").scrollWidth;
	document.getElementById("tooltip").style.left=x+'px';
	document.getElementById("tooltip").style.top=(mouse.yAbs+20)+'px';
}

function nasToolTip(){
	document.getElementById("tooltip").classList.remove("tooltipVis");
	document.getElementById("tooltip").innerHTML='';
	document.getElementById("tooltip").style.left='-500px';
	document.getElementById("tooltip").style.top='-500px';
}

function visLoader( txt='', cls='' ){
	document.getElementById("loader").classList.remove("noLoader");
	if(cls)document.getElementById("loader").classList.add(cls);
	document.getElementById("loader").dataset.cls = cls;
	document.getElementById("loader").getElementsByTagName("div")[0].innerHTML = txt;
}

function nasLoader(){
	document.getElementById("fileBig").classList.add("noLoader");
	document.getElementById("pdfBig").classList.add("noLoader");
	document.getElementById("frPdf").src = '';
	document.getElementById("fileBig").style.backgroundImage = '';
	document.getElementById("loader").classList.add("noLoader");
	if(document.getElementById("loader").dataset.cls){
		document.getElementById("loader").classList.remove(document.getElementById("loader").dataset.cls);
		document.getElementById("loader").dataset.cls = '';
	}
	document.getElementById("loader").getElementsByTagName("div")[0].innerHTML='';
}
function applicaLoading( el, style='',txt='' ){
	let loading = document.createElement("DIV");
	loading.innerHTML = txt;
	loading.className='loading';
	if(el.id == "scheda_testo")loading.className += ' loadingScheda';
	if(style)loading.className+=' '+style;
	loading.id='LL'+el.className;
	if(!document.getElementById(loading.id))el.appendChild(loading); 	
}
function rimuoviLoading( el ){
	let id='LL'+el.className;
	if(document.getElementById(id))document.getElementById(id).remove();
	if(document.getElementById("LL"))document.getElementById("LL").remove();
}

function getVar(n){ // legge una variabile nella querystring
	if(location.search){
		let vDef='';
		str=location.search.substr(1,location.search.length-1);
		pQ=str.split("&");
		if(pQ.length>1){
			for(l=0;l<pQ.length;l++){
				pV=pQ[l].split("=");
				if(pV[0]==n)vDef=pV[1];
			}
		}else{
			pV=str.split("=");
			if(pV[0]==n)vDef=pV[1];
		}
		return vDef;
	}
}

function removeA(arr) { // per rimuovere un oggetto da un array
    let what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function radians_to_degrees(radians){ // trasforma in gradi un radian
  let pi = Math.PI;
  return radians * (180/pi);
}

function getFullDataTS(d){ // legge la data completa
	let opzioni = {  
		year: "numeric",
		month: "long",  
		day: "numeric"  
	}; 
	d=new Date(d*1000);
	let s=globals.siglaLingua.substr(0,2)+"-"+globals.siglaLingua.substr(0,2).toUpperCase();
	return d.toLocaleDateString(s,opzioni);
	
}

function getDataTS(d){ // legge la data breve
	d=new Date(d*1000);
	let dd=LINGUE.formatDate;
	return dd.replace(/%D/,d.getDate()).replace(/%M/,d.getMonth()+1).replace(/%Y/,d.getFullYear());
	
}
function getOraTS(d){ // legge l'ora
	d=new Date(d*1000);
	let s=globals.siglaLingua.substr(0,2)+"-"+globals.siglaLingua.substr(0,2).toUpperCase();
	return d.toLocaleTimeString(s);
}

function twoDigits( number ){
	return ("0" + number).slice(-2);
}

Date.prototype.addDays = function(days) { // aggiunge una funzione per sommare un giorno a un altro
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var sort_by = function(field, reverse, primer){ // ordina un elenco
   let key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field].toUpperCase();};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}
function sortObject(o){
	return Object.keys(o).sort().reduce(
		(obj, key) => { 
			obj[key] = o[key]; 
			return obj;
		}, 
		{}
	);
}
function removeByAttr(arr, attr, value){
    let i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 
           arr.splice(i,1);
       }
    }
    return arr;
}

function initChangeDetection(form) {
	SCHEDA.formModificato = false;
	SCHEDA.form = document[form];
	document.getElementById("scheda").classList.add("schForm");
	Array.from( SCHEDA.form ).forEach(el => el.dataset.origValue = el.value);
	SCHEDA.verPosScheda();
}
function endChangeDetection() {
	SCHEDA.formModificato = false;
	SCHEDA.form = null;
}
function formHasChanges() {
	//SCHEDA.formModificato = false;
	if(SCHEDA.form){
		if(Array.from( SCHEDA.form ).some(el => 'origValue' in el.dataset && el.dataset.origValue !== el.value)){
			SCHEDA.formModificato = true;
		}
	}
}
function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
function __( txt, def='' ){
	if(typeof(txt) == 'undefined')txt = def;
	return txt;
}
function toJson( txt, deflt=[] ){
	if(typeof(txt) != 'object'){
		if(txt.substr(0,1)!="{" && txt.substr(0,1)!="[")txt='';
		if(txt)txt = JSON.parse(txt);
		else txt = deflt;
	}
	return txt;
}
function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

var debugTimes = 0;
function incrDebug(){
	debugTimes++;
	setTimeout(function(){debugTimes--;},3000);
	if(debugTimes>=5)visDebug();
}
function visDebug(){ // mostra il DB in JSON in una finestra
	MENU.chiudiMenu();
	document.getElementById("cont_debug_db_cont").classList.add("visSch");
	document.getElementById("cont_debug_db").classList.add("loading");
	setTimeout(function(){
		let JSNTXT = JSON.stringify(DB);
		//console.log(JSNTXT);
		document.getElementById("cont_debug_db").innerHTML = JSNTXT;
		document.getElementById("cont_debug_db").classList.remove("loading");
	},800);
}
function nasDebug(){
	document.getElementById("cont_debug_db_cont").classList.remove("visSch");
	document.getElementById("cont_debug_db").innerHTML = "";
}
function indexOfSimilar(base, search) {
    // Normalizza, rimuove i diacritici e converte in minuscolo
    const normalizeBase = base.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normalizeSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    // Utilizza indexOf con le stringhe normalizzate
    return normalizeBase.indexOf(normalizeSearch);
}
function padTwoDigits(num) {
    return num.toString().padStart(2, '0');
}
function formatDate(timestamp) {
    return new Intl.DateTimeFormat('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date(timestamp)).split('/').reverse().join('-');
}
/* function getRomeTimestamp(date = new Date()) {
    const romeDate = getRomeDate(date);
    return romeDate.getTime();
}
function getRomeDate(date = new Date()) {
    const romeDateStr = date.toLocaleString('sv-SE', { timeZone: 'Europe/Rome' }).replace(' ', 'T');
    const romeDate = new Date(romeDateStr + 'Z');
    return romeDate;
}
function diffTimezone(){
    // Ottiene l'offset locale in minuti (JavaScript lo restituisce con segno inverso)
    const localOffsetMinutes = new Date().getTimezoneOffset();

    // Ottiene l'offset di Roma in minuti utilizzando `Intl.DateTimeFormat`
    const romeOffsetMinutes = new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' });
    
    // Creiamo una data nel fuso orario di Roma e otteniamo il suo offset
    const romeDate = new Date();
    const romeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Rome',
        timeZoneName: 'short'
    }).formatToParts(romeDate);

    // Estrarre il valore dell'offset da "GMT+1" o "GMT+2"
    const romeOffsetString = romeFormatter.find(part => part.type === 'timeZoneName').value;
    const romeOffsetHours = parseInt(romeOffsetString.replace("GMT", ""), 10);

    // Calcola la differenza tra il fuso orario locale e Roma
    const localOffsetHours = -localOffsetMinutes / 60; // Convertiamo minuti in ore

    return localOffsetHours - romeOffsetHours;
}
function convTZ(date){
	return date - 3600*diffTimezone();
}
function reConvTZ(date){
	return date + 3600*diffTimezone();
} */

// Funzione per sostituire un background-image con un tag img
function convertBackgroundToImg(targetElement) {

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
}
/* function convertBackgroundToImg(targetElement) {
    let computedStyle = window.getComputedStyle(targetElement);

    // Ottieni il background-image
    let backgroundImage = computedStyle.backgroundImage;
    if (!backgroundImage || backgroundImage === "none") return;

    let imageUrl = backgroundImage.replace(/url\(["']?(.*?)["']?\)/, '$1');
    imageUrl = imageUrl.replace("(&quot;","").replace("&quot;)","").replace('("','').replace('")','');
    if(imageUrl.indexOf("loadingBlack")>-1) return;
    if(!imageUrl) return;

    // Crea il tag <img>
    let imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.classList.add("background-img-replacement");

    // Assicura che il div abbia `position: relative`
    if (computedStyle.position === "static") {
        targetElement.style.position = "relative";
    }

    // Configura posizione base dell'img
    imgElement.style.position = "absolute";
    imgElement.style.zIndex = imageUrl.indexOf("avatar") > -1 ? "0" : "1";

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
        imgElement.style.height = sizeY || "auto"; 
    } else {
        imgElement.style.width = "auto";
        imgElement.style.height = "auto";
    }

    // **Gestione precisa del background-position**
    let bgPosition = computedStyle.backgroundPosition.split(" ");
    let posX = bgPosition[0] || "50%";
    let posY = bgPosition[1] || "50%";

    // Converti valori di posizione in percentuali
    const positionMap = {
        "left": "0%", "center": "50%", "right": "100%",
        "top": "0%", "bottom": "100%"
    };

    posX = positionMap[posX] || posX;
    posY = positionMap[posY] || posY;

    // **Correzione per tutte le posizioni**
    if (posX === "0%") {
        imgElement.style.left = "0";
        imgElement.style.right = "auto";
    } else if (posX === "100%") {
        imgElement.style.left = "auto";
        imgElement.style.right = "0";
    } else {
        imgElement.style.left = `calc(${posX} - (${imgElement.style.width} / 2))`;
        imgElement.style.right = "auto";
    }

    if (posY === "0%") {
        imgElement.style.top = "0";
        imgElement.style.bottom = "auto";
    } else if (posY === "100%") {
        imgElement.style.top = "auto";
        imgElement.style.bottom = "0";
    } else {
        imgElement.style.top = `calc(${posY} - (${imgElement.style.height} / 2))`;
        imgElement.style.bottom = "auto";
    }

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
} */

function convImgsFrame(){
	if(document.getElementById("formMod"))syncFormValuesToIframe("#formMod", "stampaFrame");
	var divs = document.getElementById("stampaFrame").contentWindow.document.getElementsByTagName("div");
	for(d in divs){
		if(typeof(divs[d])=='object'){
			if(!divs[d]?.classList?.contains("noPrint"))convertBackgroundToImg(divs[d]);
		}
	}
}


function syncFormValuesToIframe(formSelector, frameId) {
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

