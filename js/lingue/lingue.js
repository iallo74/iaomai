var LINGUE = {

	newInst: false,
	formatDate: '',
	NLS: {
		"1": {
			sigla: "ita",
			sigla2: "it",
			text: "Italiano"
		},
		"2": {
			sigla: "eng",
			sigla2: "en",
			text: "English",
			ai: true
		},
		"3": {
			sigla: "esp",
			sigla2: "es",
			text: "Español",
			ai: true
		},
		"4": {
			sigla: "fra",
			sigla2: "fr",
			text: "Français",
			ai: true
		},
		"5": {
			sigla: "por",
			sigla2: "pt",
			text: "Português",
			ai: true
		},
		"6": {
			sigla: "deu" ,
			sigla2: "de" ,
			text: "Deutsch",
			ai: true
		}
	},
	googleLangSel: '',
	googleLanguages: [],
	init: function(){
		if(typeof(localStorage.siglaLingua)=='undefined')this.newInst=true;
		globals.siglaLingua='eng';
		if(!localStorage.getItem("siglaLingua")){ // OK localStorage
			for(let p in LINGUE.NLS){
				if(this.linguaBrowser()==LINGUE.NLS[p].sigla.substring(0,2)){
					localStorage.setItem("siglaLingua",LINGUE.NLS[p].sigla);
				}
			}
		}
		var gC=localStorage.getItem("siglaLingua"); // OK localStorage
		if(typeof(gC)!='undefined' && gC!='')globals.siglaLingua=gC;
		
		
		this.formatDate='%D/%M/%Y';
		if(globals.siglaLingua=="eng")this.formatDate='%M/%D/%Y';
		
		var tags=["td","table","p","span","div","b","font","li","ul","strong","em","u","span"];
		for(tg=0;tg<tags.length;tg++){
			var coll=document.getElementsByTagName(tags[tg]);
			for(let k=0; k<coll.length;k++){
				this.convTitle(coll[k]);
				this.convHTML(coll[k]);
			}
		}
		coll=document.getElementsByTagName("input");
		for(let k=0; k<coll.length;k++)this.convTitle(coll[k]);
		
		// POPOLO in popup info-lingue e il menu delle lingue
		var aiPres = false;
			htmlInt = '',
			htmlSel = '',
			htmlNote = '',
			html = 	'<div id="tabLingue">' +
					'<div><div></div>';
		for(let l in LINGUE.NLS){
			html += '<div>'+LINGUE.NLS[l].sigla+'</div>';
			htmlInt += '<div>';
			if(__(LINGUE.NLS[l].ai)){
				htmlInt += '<b class="ai">*</b>';
				aiPres = true;
			}
			htmlInt += '</div>';
			htmlSel += '<option value="'+LINGUE.NLS[l].sigla+'"';
			if(LINGUE.NLS[l].sigla == globals.siglaLingua)htmlSel += ' SELECTED';
			htmlSel += '>'+LINGUE.NLS[l].text+'</option>';
		}
		html += 	'</div>' +
					'<div id="lInt">' +
					'    <div>Interfaccia</div>' + htmlInt +
					'</div>' +
					'<i class="tdLabel">'+TXT("contenuti")+'</i>';
		for(let s in sets){
			if(__(sets[s].lingueCont,[]).length){
				html += '<div><div>'+sets[s].nome+'</div>';
				for(let l in LINGUE.NLS){
					html += '<div';
					if(sets[s].lingueCont.indexOf(LINGUE.NLS[l].sigla)>-1)html += ' class="lok"';
					html += '>';
					if(sets[s].lingueCont.indexOf(LINGUE.NLS[l].sigla)>-1 && LINGUE.NLS[l].sigla != 'ita'){
						html += '<b class="ai">*</b>';
						aiPres = true;
					}
					html += '</div>';
				}
				html += '</div>';	
			}
		}
		if(aiPres){
			htmlNote += '<b class="ai">*</b> '+TXT("noteAi");
		}
		if(htmlNote)html += 	'	<div class="noteInfoLingua">'+htmlNote+'</div>';
		html += 	'	<div class="selectInfoLingua"><select onChange="cambiaLingua(this.value);">'+
						htmlSel +
					'	</div>' +
					'</div>';
		document.getElementById("contInfolingue").innerHTML = html;
		document.getElementById("lingueSelect").innerHTML = htmlSel;
	},
	convTitle: function(element){
		if(element.title.substr(0,6)=='{{TXT_'){
			txt=eval(element.title);
			if(debug)console.log(txt);
			
			var testo = '';
			var strBase = __(DB.TXT.base[txt.substr(6,txt.length-8)],'');
			var strSet = __(DB.TXT.set[txt.substr(6,txt.length-8)],'');
			if(strBase){
				testo = strBase[globals.siglaLingua];
				if(!testo)testo = strBase["eng"];
			}
			if(strSet){
				testo = strSet[globals.siglaLingua];
				if(!testo)testo = strSet["eng"];
			}
			
			testo = LINGUE.convPaziente(testo);
			
			element.title=txt.replace(/\{\{TXT_[^\}\}]+\}\}/i, testo);
		}
	},
	convHTML: function(element){
		if(element.innerHTML.indexOf('{{TXT_')>-1){
			var str = element.innerHTML;
			var txt='';
			while(txt=/\{\{TXT_[^\}\}]+\}\}/.exec(str)){
				txt=txt+"";
				var testo = '';
				
				var strBase = __(DB.TXT.base[txt.substr(6,txt.length-8)],'');
				var strSet = __(DB.TXT.set[txt.substr(6,txt.length-8)],'');
				if(strBase){
					testo = strBase[globals.siglaLingua];
					if(!testo)testo = strBase["eng"];
				}
				if(strSet){
					testo = strSet[globals.siglaLingua];
					if(!testo)testo = strSet["eng"];
				}
				testo = testo.replace(/\n/g,"<br>");
				testo = testo.replace(/\[#\]/g,'<img src="img/spunta.png" height="16" style="vertical-align:middle;margin-left:5px;margin-top:-1px;margin-bottom:2px;">');
				testo = testo.replace(/\[§\]/g,nomeApp);
				testo = testo.replace(/\[\*\]/g,'<img src="img/p_impostazioniN.png" height="22" style="vertical-align: middle;margin-top: -11px;margin-bottom: -8px;margin-left: -4px;">');
				testo = testo.replace(/(iáomai)/g,"<b>iáomai</b>");
				testo = testo.replace('[IAOMAI]','<img src="img/logo_iaomai_mini.png" style="display:inline-block;vertical-align:middle;width:80px;">');
				testo = testo.replace(/\{/g,"<b>").replace(/\}/g,"</b>")
				testo = LINGUE.convPaziente(testo);
				element.innerHTML = str.replace(/\{\{TXT_[^\}\}]+\}\}/i, testo);
				str = element.innerHTML;
			}	
		}
		if(element.innerHTML == '{{[§]}}')element.innerHTML = nomeApp;
	},
	
	linguaBrowser: function(){ // legge la lingua di default del browser
		var l_lang = "it";
		
		// Sospesa momentaneamente perché siam pronti col solo italiano
		
		if (navigator.userLanguage)  l_lang = navigator.userLanguage;
		else if (navigator.language)  l_lang = navigator.language;
		return l_lang.substring(0,2);
	},
	convPaziente: function( str ){
		var cartOp = '';
		if(__(globals.set))cartOp = __(globals.set.cartella);
		if(__(localStorage.noMedico) || cartOp=='meridiani_shiatsu'){
			//var dest = (__(localStorage.noMedico)=='shiatsu')?"S":"C";
			var dest = (__(localStorage.noMedico)=='shiatsu' || 
						cartOp=='meridiani_shiatsu' ) ? "S" : "C";
			
			var re = new RegExp(DB.TXT.base["_Cliente_P"][globals.siglaLingua], 'g');
			str = str.replace(re,DB.TXT.base["_Cliente_"+dest][globals.siglaLingua]);
			
			var re = new RegExp(DB.TXT.base["_Clienti_P"][globals.siglaLingua], 'g');
			str = str.replace(re,DB.TXT.base["_Clienti_"+dest][globals.siglaLingua]);
			
			var re = new RegExp(DB.TXT.base["_cliente_P"][globals.siglaLingua], 'g');
			str = str.replace(re,DB.TXT.base["_cliente_"+dest][globals.siglaLingua]);
			
			var re = new RegExp(DB.TXT.base["_clienti_P"][globals.siglaLingua], 'g');
			str = str.replace(re,DB.TXT.base["_clienti_"+dest][globals.siglaLingua]);
			
			var re = new RegExp(DB.TXT.base["_un_ciclo_P"][globals.siglaLingua], 'g');
			str = str.replace(re,DB.TXT.base["_un_ciclo_"+dest][globals.siglaLingua]);
			
			var re = new RegExp(DB.TXT.base["_il_ciclo_P"][globals.siglaLingua], 'g');
			str = str.replace(re,DB.TXT.base["_il_ciclo_"+dest][globals.siglaLingua]);
			
			var re = new RegExp(DB.TXT.base["_Ciclo_P"][globals.siglaLingua], 'g');
			str = str.replace(re,DB.TXT.base["_Ciclo_"+dest][globals.siglaLingua]);
			
			var re = new RegExp(DB.TXT.base["_ciclo_P"][globals.siglaLingua], 'g');
			str = str.replace(re,DB.TXT.base["_ciclo_"+dest][globals.siglaLingua]);
			
			var re = new RegExp(DB.TXT.base["_cicli_P"][globals.siglaLingua], 'g');
			str = str.replace(re,DB.TXT.base["_cicli_"+dest][globals.siglaLingua]);
			
		}
		return str;
	},
	getLinguaCont: function( folder ){
		var linguaRet = globals.siglaLingua;
		if(sets[folder].lingueCont.indexOf(globals.siglaLingua)==-1){
			if(sets[folder].lingueCont.indexOf('eng')==-1)linguaRet = 'ita';
			else linguaRet = 'eng';
		}
		return linguaRet;
	},
	getSigla2: function(){
		for(let n in LINGUE.NLS){
			if(LINGUE.NLS[n].sigla == localStorage.siglaLingua)return LINGUE.NLS[n].sigla2;
		}
	},
	getGoogleLanguages: function(){
		if(!CONN.getConn() || !LOGIN.logedin())return;
		if(!LINGUE.googleLanguages.length){
			CONN.caricaUrl(	"translate_languages.php",
							"lang_or="+LINGUE.getSigla2(), //encodeURIComponent(
							"LINGUE.resGoogleLanguages");
		}
	},
	resGoogleLanguages: function( txt ){
		if(txt!='404'){
			var languages = JSON.parse( txt );
			for(let l in languages){
				var addAlph = '2_';
				for(let n in LINGUE.NLS){
					if(LINGUE.NLS[n].sigla2 == l){
						if(!__(LINGUE.NLS[n].ai))addAlph = '0_';
						else addAlph = '1_';
					}
				}
				var json = {
					sigla: l,
					alph: addAlph + languages[l],
					name: languages[l]
				}
				if(LINGUE.googleLanguages.indexOf(json)==-1)LINGUE.googleLanguages.push(json);
			}
			LINGUE.googleLanguages.sort(sort_by("alph"));
		}
	},
	googleTranslate: function( lang, codice ){
		if(!CONN.retNoConn()){
			LINGUE.resetGoogleTranslate();
			return;
		}
		if(!LOGIN.logedin()){
			
			return;
		}
		var elText = document.getElementById("scheda_testo"),
			txt = SCHEDA.htmlOr;
		if(SCHEDA.scheda2Aperta){
			txt = SCHEDA.htmlOr2;
			elText = document.getElementById("scheda_testo2");
		}
		applicaLoading( elText );
		JSNPOST = {
			codice: codice,
			lang_or: LINGUE.getSigla2(),
			lang_dest: lang,
			text: txt
		}
		LINGUE.googleLangSel = lang;
		
		CONN.caricaUrl(	"translate.php",
						"JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
						"LINGUE.resGoogleTranslate");
	},
	resGoogleTranslate: function( txt ){
		if(txt.substr(0,3)!='404'){
			var jsn = JSON.parse(txt);
			var elText = document.getElementById("scheda_testo");
			if(SCHEDA.scheda2Aperta)elText = document.getElementById("scheda_testo2");
			//elText.classList.add("translated");
			elText.querySelector(".translatable").innerHTML = '<div class="translate_note">'+jsn.txt_note+'<span onClick="LINGUE.annGoogleTranslate();">'+jsn.txt_cancel+'</span></div>' + jsn.txt_dest;
			rimuoviLoading( elText );
			eval(SCHEDA.addFunct);
			SCHEDA.addFunct = null;
			elText.querySelector(".scheda_stampa").style.opacity = 1;
		}
	},
	annGoogleTranslate: function(){
		LINGUE.googleLangSel = '';
		document.getElementById("scheda_testo").querySelector(".translatable").innerHTML = SCHEDA.htmlOr;
		if(document.getElementById("scheda_testo2").querySelector(".translatable"))document.getElementById("scheda_testo2").querySelector(".translatable").innerHTML = SCHEDA.htmlOr2;
		LINGUE.resetGoogleTranslate();
	},
	resetGoogleTranslate: function(){
		var langsEl = document.getElementById("languages").options;
		for(let e=0;e<langsEl.length;e++){
			if(langsEl[e].value==LINGUE.getSigla2()){
				document.getElementById("languages").selectedIndex=e;
			}
		}
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
	var str = txt[globals.siglaLingua];
	if(!str)str = txt["eng"];
	return addslashes(str.replace(/\[§\]/g,nomeApp));
}
function TXT(txt){
	var str = '';
	var strBase = __(DB.TXT.base[txt],'');
	var strSet = __(DB.TXT.set[txt],'');
	if(strBase){
		str = strBase[localStorage.siglaLingua];
		if(!str)str = strBase["eng"];
	}
	if(strSet){
		str = strSet[localStorage.siglaLingua];
		if(!str)str = strSet["eng"];
	}
	str = addslashes(str.replace(/\[§\]/g,nomeApp));
	str = LINGUE.convPaziente(str);
	return str;
}
function convLangPath( path ){
	var langs = {
		"ita": "it",
		"eng": "en",
		"esp": "es"
	};
	return path.replace("[lang]",langs[globals.siglaLingua]);
}

function doHighlight( html, parola, cls ){
	var t1 = '<font class="'+cls+'">';
	var t2 = '</font>';
	var txt = "";
	var i = -1;
	var lcParola = parola.toLowerCase();
	var lcHtml = html.toLowerCase();
	//console.log(parola)
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
function evidenziaParola( el = document.getElementById("scheda_testo"), parola = document.getElementById("parolaGlobal").value ){
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
function setTextSize( n ){
	localStorage.textSize = n;
	document.body.classList.remove("fontMID");
	document.body.classList.remove("fontBIG");
	document.body.classList.remove("fontMAG");
	if(n)document.body.classList.add("font"+n);
	if(document.getElementById("a_"+n)){
		var els = document.getElementById("sizeSel").getElementsByTagName("b");
		for(let i = 0; i<els.length; i++){
			if(localStorage.textSize == els[i].dataset.value)els[i].classList.add("a_SEL");
			else els[i].classList.remove("a_SEL");
		}
	}
}