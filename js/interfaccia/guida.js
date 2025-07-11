var GUIDA = {
	nGuida: '',
	overFumetto: false,
	overChiudi: false,
	tmFumetto: null,
	init: function( n ){
		let els = document.getElementById("guida"+n).getElementsByClassName("guida_el");
		for(let n=0;n<els.length;n++){
			let nav = document.createElement('div');
			nav.className = 'guida_nav';
			let html = '<span class="guida_btn_';
			if(n>0)html +='sx" onClick="GUIDA.vai('+(n-1)+');';
			else html +='void';
			html +='"></span>';
			html += '<span>'+(n+1)+' / '+els.length+'</span><span class="guida_btn_';
			if(n<els.length-1)html +='dx" onClick="GUIDA.vai('+(n+1)+');';
			else html +='void';
			html +='"></span>';
			html += '<span class="guidaChiudi" onClick="GUIDA.chiudi();"></span>';
			nav.innerHTML = html;
			els[n].appendChild(nav);
			if(els[n].dataset.tipo == 'guida'){
				let tech = touchable ? 'gesture' : 'mouse';
				els[n].style.backgroundImage = 'url(img/guida-'+tech+'-'+globals.siglaLingua+'.png)';
			}
		}
	},
	play: function( n ){
		SCHEDA.chiudiElenco();
		GUIDA.nGuida = n;
		document.getElementById("guida_cont").className = "guidaVis";
		setTimeout(function(){document.getElementById("guida_cont").style.opacity = 1;},300);
		GUIDA.vai(0);
	},
	chiudi: function(){
		document.getElementById("guida_cont").className = '';
	},
	vai: function( g ){
		let els = document.getElementById("guida"+GUIDA.nGuida).getElementsByClassName("guida_el");
		for(let n=0;n<els.length;n++){
			document.getElementById("guida_cont").classList.remove("guida"+GUIDA.nGuida+n);
		}
		document.getElementById("guida_cont").classList.add("guida"+GUIDA.nGuida+g);
	},
	visFumetto: function( n, forza=false, noFr=false ){
		if(n=='guida_generica' && !__(localStorage["flag_guida_generica"+verApp])){
			localStorage["flag_guida_generica"+verApp]="true";
			delete(localStorage.no_guida_generica);
		}
		if(GUIDA.fumettoAperto=='guida_generica')return;
		let noGuida = (__(localStorage.getItem("no_"+n),"false"));
		if(!noGuida || forza){
			if(GUIDA.fumettoAperto){
				document.getElementById(GUIDA.fumettoAperto).classList.remove("vis","visSch","noFr");
			}
			clearTimeout(GUIDA.tmFumetto);
			document.getElementById("no_guida").dataset.name = "no_"+n;
			document.getElementById("no_guida").checked = noGuida;
			if(!document.getElementById(n)){
				document.getElementById('guida_def').className = 'fumetti '+n;
				document.getElementById('fumetti_titolo').innerHTML = guide[n].titolo[globals.siglaLingua];
				if(typeof(guide[n].reference)!='undefined'){
					if(guide[n].reference){
						let reference = guide[n].reference;
						if(globals.set.cartella)reference = reference.replace("[set]",globals.set.cartella);
						document.getElementById("guida_def").querySelector(".btnReference").onclick = function(){
							REF.open(reference);
						}
					}
					document.getElementById("guida_def").querySelector(".btnReference").style.display = 'inline-block';
				}else{
					document.getElementById("guida_def").querySelector(".btnReference").style.display = 'none';
				}
				
				
				document.getElementById('fumetti_testo').innerHTML = guide[n].testo[globals.siglaLingua].replace(/\n/g, "<br>");
				n='guida_def';
			}
			document.getElementById(n).classList.add("visSch");
			if(noFr)document.getElementById(n).classList.add("noFr");
			setTimeout( function(n){
				document.getElementById(n).classList.add("vis");
			},200, n);
			GUIDA.fumettoAperto = n;
			if(n!='guida_generica')window.addEventListener("mouseup", GUIDA.nasFumetto, false);
			else{
				let HTML_elenco = 	'';
				for(let cartella in sets){
					if(	cartella != 'anatomy_full' &&
						cartella != 'clients_full'){
						let linkSet = 'caricaSet(\''+cartella+'\',this,\''+sets[cartella].modelli[0]+'\');MENU.visSets();';
						if(cartella == globals.set.cartella)linkSet = 'SCHEDA.apriElenco(\'set\')';
						if(!sets[cartella].locked){
							HTML_elenco += 	'<div onClick="'+linkSet+'" id="btnGuida_'+cartella+'">' +
											'<div><img src="sets/'+cartella+'/img/logoNero.png"></div>' +
											htmlEntities(sets[cartella].nome) +
											'<br><span>' + htmlEntities(sets[cartella].sottotitolo) + '</span>' +
										'</div>';
						}
					}
				}
				document.getElementById("guida_generica_sets").innerHTML = HTML_elenco;
			}
			document.getElementById("container").addEventListener("touchstart", GUIDA.nasFumetto, false);
			document.getElementById("interfaccia").addEventListener("touchstart", GUIDA.nasFumetto, false);
		}
	},
	nasFumetto: function(forza=true){
		if(GUIDA.fumettoAperto=='guida_generica' && !forza)return;
		if(GUIDA.fumettoAperto && (!GUIDA.overFumetto || GUIDA.overChiudi || forza)){
			document.getElementById(GUIDA.fumettoAperto).classList.remove("vis");
			document.getElementById(GUIDA.fumettoAperto).classList.remove("noFr");
			GUIDA.tmFumetto = setTimeout( function(){
				if(GUIDA.fumettoAperto){
					document.getElementById(GUIDA.fumettoAperto).classList.remove("visSch");
					GUIDA.fumettoAperto = '';
				}
			},400);
			window.removeEventListener("mouseup", GUIDA.nasFumetto, false);
			document.getElementById("container").removeEventListener("touchstart", GUIDA.nasFumetto, false);
			document.getElementById("interfaccia").removeEventListener("touchstart", GUIDA.nasFumetto, false);
			if(GUIDA.fumettoAperto=='guida_generica' && document.getElementById("no_guida_generica").checked)GUIDA.noVis(document.getElementById("no_guida_generica"));
		}
	},
	noVis: function( el ){
		localStorage.setItem(document.getElementById("no_guida").dataset.name,el.checked);
	},
	swGuide: function( el ){
		if(el.checked){
			delete(localStorage.no_guida_generica);
			document.getElementById("no_guida_generica").checked = false;
		}else{
			localStorage.no_guida_generica = 'true';
			document.getElementById("no_guida_generica").checked = true;
		}
	},
	showNow: function( el ){
		MENU.chiudiMenu();
		GUIDA.visFumetto("guida_generica",true);
	},
	visGuida: function( id ){
		document.getElementById(id).style.display = 'block';
		document.getElementById("btn_"+id).style.display = 'none';
	},
	nasGuida: function( id ){
		document.getElementById(id).style.display = 'none';
		document.getElementById("btn_"+id).style.display = 'inline-block';
	},
}



var REF = {
	level: null,
	levelTxt: '',
	elSel: null,
	frSel: [],
	opened: false,
	open: function( level = 'overview' ){
		if(typeof(localStorage.fixTree)=='undefined')localStorage.fixTree = '1'; // setto FIX di default
		if(document.getElementById("menuScheda").className.indexOf("visSch")>-1)SCHEDA.swMenuScheda();
		document.getElementById("reference_cont").classList.add("visSch");
		if(localStorage.fixTree=='1')document.getElementById("reference_cont").classList.add("fix");
		document.getElementById("reference_cont").classList.remove("mini");
		if(REF.opened){
			REF.navigate(level);
			return;
		}
		REF.levelTxt = level;
		REF.opened = true;
		if(!document.getElementById('js_lingue_reference_'+globals.siglaLingua+'_js')){
			IMPORTER.importaFiles( 0, ['js/lingue/reference_'+globals.siglaLingua+'.js'], 'REF.tree();', document.head );	
		}else REF.tree();
	},
	minify: function(){
		document.getElementById("reference_cont").classList.add("mini");
	},
	magnify: function(){
		document.getElementById("reference_cont").classList.remove("mini");
	},
	close: function(){
		document.getElementById("reference_cont").classList.remove("visSch");
		document.head.removeChild(document.getElementById('js_lingue_reference_'+globals.siglaLingua+'_js'));
		REF.level = null;
		REF.levelTxt = '';
		REF.elSel = null;
		REF.frSel = [];
		REF.opened = false;
	},
	navigate: function( level ){
		if(REF.levelTxt == level && REF.level)return;
		if(typeof(level)!='undefined')REF.levelTxt = level;
		if(REF.elSel){
			REF.elSel.classList.remove("refSel");
			REF.elSel = null;
		}
		if(REF.frSel!=[]){
			for(let f in REF.frSel)REF.frSel[f].classList.remove("frSel");
			REF.frSel = [];
		}
		REF.explode();
		level = REF.levelTxt;
		if(level.indexOf(".")>-1){
			let pL = level.split(".");
			level = '';
			for(l in pL)level += ".cont."+pL[l];
		}else{
			if(level)level = '.cont.'+level;
			else level = '.cont.overview';
		}
		REF.level = eval('DB.reference'+level);
		let cont = REF.level.cont;
		if(!cont)cont = '<i style="opacity:0.7;">'+TXT("NoRes")+'</i>';
		let nav = '';
		if(REF.elSel){
			let pL = REF.elSel.dataset.level.split("."),
				el = DB.reference.cont;
			if(pL.length>1){
				for(let e=0;e<pL.length-1;e++){
					nav += el[pL[e]].title;
					if(e<pL.length-2)nav += ' &gt; ';
					el = el[pL[e]].cont;
				}
				nav = '<div id="barra_nav">'+nav+'</div>';
			}
		}
		document.getElementById("reference").innerHTML = nav+'<h2>'+REF.level.title+'</h2>'+cont;
		document.getElementById("reference").scrollTo(0,0);
		if(WF()<540)document.getElementById("reference_cont").classList.remove("opTree");
		if(!__(localStorage.fixTree))document.getElementById("reference_cont").classList.remove("opTree");
	},
	cont: function( level, p='' ){
		if(p)p += '.';
		let html = '';
		for(let i in level.cont){
			let l = p+i,
				pL = l.split(".");
			if(typeof(level.cont[i].cont)=='object'){
				html += '<div class="fr lv'+(pL.length-1)+'">' +
						'	<a onClick="REF.sw(this);">'+level.cont[i].title+'</a>' +
						'	<div class="cn">'+REF.cont(level.cont[i],l)+'</div>' +
						'</div>';
			}else{
				html += '<div class="lk lv'+(pL.length-1)+'">' +
						'	<a onClick="REF.navigate(\''+l+'\');"' +
						'	   data-level="'+l+'"' +
						'>'+level.cont[i].title+'</a>' +
						'</div>';
			}
		}
		return html;
	},
	tree: function(){
		let html = 	'<div id="ref_tree">' +
					REF.cont(DB.reference) +
					'</div>';
		document.getElementById("reference_tree").innerHTML = html;
		document.getElementById("reference_cont").classList.remove("opTree");
		REF.navigate();
	},
	sw: function( el ){
		el.parentElement.classList.toggle("op");
	},
	explode: function(){
		let els = document.getElementById("ref_tree").getElementsByTagName("a");
		for(let e in els){
			if(els[e].dataset){
				if(__(els[e].dataset.level) && els[e].dataset.level == REF.levelTxt){
					els[e].classList.add("refSel");
					REF.elSel = els[e];
				}
			}
		}
		if(!REF.elSel)return;
		let el = REF.elSel;
		while(el.parentElement.id!='ref_tree'){
			el = el.parentElement;
			if(el.classList.contains("fr")){
				REF.frSel.push(el);
				el.classList.add("op");
				el.classList.add("frSel");
			}
		}
		GUIDA.nasFumetto(true);
	},
	swTree: function(){
		document.getElementById("reference_cont").classList.toggle("opTree");
	},
	fixTree: function(){
		if(__(localStorage.fixTree))localStorage.fixTree = '';
		else localStorage.fixTree = '1';
		document.getElementById("reference_cont").classList.toggle("fix", (localStorage.fixTree=='1'));
	}
}