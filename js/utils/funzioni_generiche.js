
function tCoord(obj,q){
	var c=0;
	var L='Left';
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
	var txt=eval("t.style."+c);
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
	var x = mouse.xAbs+15;
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

function visLoader( txt, cls ){
	if(typeof(cls)=='undefined')var cls = '';
	document.getElementById("loader").classList.remove("noLoader");
	if(cls)document.getElementById("loader").classList.add(cls);
	document.getElementById("loader").dataset.cls = cls;
	document.getElementById("loader").getElementsByTagName("div")[0].innerHTML=txt;
}

function nasLoader(){
	document.getElementById("fotoBig").classList.add("noLoader");
	document.getElementById("pdfBig").classList.add("noLoader");
	document.getElementById("frPdf").src = '';
	document.getElementById("fotoBig").style.backgroundImage = '';
	document.getElementById("loader").classList.add("noLoader");
	if(document.getElementById("loader").dataset.cls){
		document.getElementById("loader").classList.remove(document.getElementById("loader").dataset.cls);
		document.getElementById("loader").dataset.cls = '';
	}
	document.getElementById("loader").getElementsByTagName("div")[0].innerHTML='';
}
function applicaLoading( el, style ){
	if(typeof(style) == 'undefined')var style = '';
	var loading = document.createElement("DIV");
	loading.className='loading';
	if(el.id == "scheda_testo")loading.className += ' loadingScheda';
	if(style)loading.className+=' '+style;
	loading.id='LL'+el.className;
	if(!document.getElementById(loading.id))el.appendChild(loading); 	
}
function rimuoviLoading( el ){
	var id='LL'+el.className;
	if(document.getElementById(id))document.getElementById(id).remove();
	if(document.getElementById("LL"))document.getElementById("LL").remove();
}

function getVar(n){ // legge una variabile nella querystring
	if(location.search){
		var vDef='';
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
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function radians_to_degrees(radians){ // trasforma in gradi un radian
  var pi = Math.PI;
  return radians * (180/pi);
}

function getFullDataTS(d){ // legge la data completa
	var opzioni = {  
		year: "numeric",
		month: "long",  
		day: "numeric"  
	}; 
	d=new Date(d*1000);
	var s=globals.siglaLingua.substr(0,2)+"-"+globals.siglaLingua.substr(0,2).toUpperCase();
	return d.toLocaleDateString(s,opzioni);
	
}

function getDataTS(d){ // legge la data breve
	d=new Date(d*1000);
	var dd=LINGUE.formatDate;
	return dd.replace(/%D/,d.getDate()).replace(/%M/,d.getMonth()+1).replace(/%Y/,d.getFullYear());
	
}
function getOraTS(d){ // legge l'ora
	d=new Date(d*1000);
	var s=globals.siglaLingua.substr(0,2)+"-"+globals.siglaLingua.substr(0,2).toUpperCase();
	return d.toLocaleTimeString(s);
}

Date.prototype.addDays = function(days) { // aggiunge una funzione per sommare un giorno a un altro
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var sort_by = function(field, reverse, primer){ // ordina un elenco
   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field].toUpperCase()};

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
    var i = arr.length;
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
	SCHEDA.form = document.getElementById( form );
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
function __( txt, def ){
	if(typeof(def) == 'undefined') var def = '';
	if(typeof(txt) == 'undefined')var txt = def;
	return txt;
}
function toJson( txt ){
	if(typeof(txt) != 'object'){
		if(txt.substr(0,1)!="{" && txt.substr(0,1)!="[")txt='';
		if(txt)txt = JSON.parse(txt);
		else txt = [];
	}
	return txt;
}
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
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
function visDebug(){
	MENU.chiudiMenu();
	document.getElementById("cont_debug_db_cont").classList.add("visSch");
	document.getElementById("cont_debug_db").classList.add("loading");
	setTimeout(function(){
		var JSNTXT = JSON.stringify(DB);
		//console.log(JSNTXT);
		document.getElementById("cont_debug_db").innerHTML = JSNTXT;
		document.getElementById("cont_debug_db").classList.remove("loading");
	},800);
}
function nasDebug(){
	document.getElementById("cont_debug_db_cont").classList.remove("visSch");
	document.getElementById("cont_debug_db").innerHTML = "";
}