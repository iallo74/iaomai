var LINGUE = {

	newInst: false,
	formatDate: '',
	init: function(){
		if(typeof(localStorage.siglaLingua)=='undefined')this.newInst=true;
		var NLS={
			"1":"ita",
			"2":"eng",
			"3":"esp" };
		globals.siglaLingua='eng';
		if(!localStorage.getItem("siglaLingua")){ // OK localStorage
			for(p in NLS){
				if(this.linguaBrowser()==NLS[p].substring(0,2)){
					localStorage.setItem("siglaLingua",NLS[p]);
				}
			}
		}
		var gC=localStorage.getItem("siglaLingua"); // OK localStorage
		if(typeof(gC)!='undefined' && gC!='')globals.siglaLingua=gC;
		
		
		var lDef=getVar('idNL');
		if(lDef){
			globals.siglaLingua=lDef;
			localStorage.setItem("siglaLingua",globals.siglaLingua); // OK localStorage
		}
		
		
		this.formatDate='%D/%M/%Y';
		if(globals.siglaLingua=="eng")this.formatDate='%M/%D/%Y';
		
		var tags=["td","table","p","span","div","b","font","li","ul","strong","em","u","span"];
		for(tg=0;tg<tags.length;tg++){
			var coll=document.getElementsByTagName(tags[tg]);
			for(k=0; k<coll.length;k++){
				this.convTitle(coll[k]);
				this.convHTML(coll[k]);
			}
		}
		coll=document.getElementsByTagName("input");
		for(k=0; k<coll.length;k++)this.convTitle(coll[k]);
	},
	convTitle: function(element){
		if(element.title.substr(0,6)=='{{TXT_'){
			txt=eval(element.title);
			if(debug)console.log(txt);
			var testo = eval(txt.substr(2,txt.length-4)+"['"+globals.siglaLingua+"']");
			element.title=txt.replace(/\{\{TXT_[^\}\}]+\}\}/i, testo);
		}
	},
	convHTML: function(element){
		if(element.innerHTML.indexOf('{{TXT_')>-1){
			var str = element.innerHTML;
			var txt='';
			while(txt=/\{\{TXT_[^\}\}]+\}\}/.exec(str)){
				txt=txt+"";
				var testo = eval(txt.substr(2,txt.length-4)+"['"+globals.siglaLingua+"']");
				testo = testo.replace(/\n/g,"<br>");
				testo = testo.replace(/\[#\]/g,'<img src="img/spunta.png" height="16" style="vertical-align:middle;margin-left:5px;margin-top:-1px;margin-bottom:2px;">');
				testo = testo.replace(/\[§\]/g,nomeApp);
				testo = testo.replace(/\[\*\]/g,'<img src="img/p_impostazioniN.png" height="22" style="vertical-align: middle;margin-top: -11px;margin-bottom: -8px;margin-left: -4px;">');
				testo = testo.replace(/(iáomai)/g,"<b>iáomai</b>");
				testo = testo.replace('[IAOMAI]','<img src="img/logo_iaomai_mini.png" style="display:inline-block;vertical-align:middle;width:80px;">');
				element.innerHTML = str.replace(/\{\{TXT_[^\}\}]+\}\}/i, testo);
				str = element.innerHTML;
			}
		}
		if(element.innerHTML == '{{[§]}}')element.innerHTML = nomeApp;
	},
	
	linguaBrowser: function(){ // legge la lingua di default del browser
		var l_lang = "it";
		
		// Sospesa momentaneamente perché siam pronti col solo italiano
		
		/*if (navigator.userLanguage)  l_lang = navigator.userLanguage;
		else if (navigator.language)  l_lang = navigator.language;*/
		return l_lang.substring(0,2);
	}
};

function addslashes(str) {
	str = str.replace(/\\/g, '\\\\');
	str = str.replace(/\'/g, '\\\'');
	str = str.replace(/\"/g, '\\"');
	str = str.replace(/\0/g, '\\0');
	return str;
}
 
function stripslashes(str) {
	str = str.replace(/\\'/g, '\'');
	str = str.replace(/\\"/g, '"');
	str = str.replace(/\\0/g, '\0');
	str = str.replace(/\\\\/g, '\\');
	return str;
}

function htmlEntities(str) {
	return stripslashes(String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/(iáomai)/g,"<b>iáomai</b>"));
}
function htmlRev(str) {
	return String(str).replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"');
}
function Lingua(txt){
	return addslashes(txt[globals.siglaLingua].replace(/\[§\]/g,nomeApp));
}

function doHighlight( html, parola, cls ){
	var t1 = '<font class="'+cls+'">';
	var t2 = '</font>';
	var txt = "";
	var i = -1;
	var lcParola = parola.toLowerCase();
	var lcHtml = html.toLowerCase();
	console.log(parola)
	while(html.length > 0){
		i = lcHtml.indexOf(lcParola, i+1);
		if(i < 0){
			txt += html;
			html = "";
		}else{
			if (html.lastIndexOf(">", i) >= html.lastIndexOf("<", i)) {
				if (lcHtml.lastIndexOf("/script>", i) >= lcHtml.lastIndexOf("<script", i)) {
					txt += html.substring(0, i) + t1 + html.substr(i, parola.length) + t2;
					html = html.substr(i + parola.length);
					lcHtml = html.toLowerCase();
					i = -1;
				}
			}
		}
	}
	return txt;
}
function evidenziaParola( el, parola ){
	if(typeof(el) == 'undefined')var el = document.getElementById("scheda_testo");
	if(typeof(parola) == 'undefined')var parola = document.getElementById("parolaGlobal").value;
	parola = htmlEntities( parola );
	if(typeof(frase)=='undefined')var frase = false;
	var searchArray = [];
	var html = el.innerHTML;
	var searchArray = [parola];
	var searchArray2 = parola.split(" ");
	var cls = 'fraseEvi';
	if(searchArray2.length == 1)cls = 'parolaEvi';
	for (i=0;i<searchArray.length;i++){
		html = doHighlight( html, searchArray[i], cls );
	}
	if(searchArray2.length > 1){
		for (i=0;i<searchArray2.length;i++){
			html = doHighlight( html, searchArray2[i], 'parolaEvi' );
		}
	}
	el.innerHTML = html;
	return true;
}