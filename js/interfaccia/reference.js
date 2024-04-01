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
		document.getElementById("reference_tree").innerHTML=
			'<div id="ref_tree">' +
			REF.cont(DB.reference) +
			'</div>';
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
		localStorage.fixTree = __(localStorage.fixTree) ? '' : '1';
		document.getElementById("reference_cont").classList.toggle("fix", localStorage.fixTree=='1' );
	}
}