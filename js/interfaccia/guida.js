var GUIDA = {
	nGuida: '',
	overFumetto: false,
	overChiudi: false,
	tmFumetto: null,
	init: function( n ){
		var els = document.getElementById("guida"+n).getElementsByClassName("guida_el");
		for(n=0;n<els.length;n++){
			var nav = document.createElement('div');
			nav.className = 'guida_nav';
			var html = '<span class="guida_btn_';
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
				var tech = 'mouse';
				if(touchable)tech = 'gesture';
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
		var els = document.getElementById("guida"+GUIDA.nGuida).getElementsByClassName("guida_el");
		for(n=0;n<els.length;n++){
			document.getElementById("guida_cont").classList.remove("guida"+GUIDA.nGuida+n);
		}
		document.getElementById("guida_cont").classList.add("guida"+GUIDA.nGuida+g);
	},
	visFumetto: function( n ){
		if(localStorage.getItem("no_"+n) != 'true'){
			if(GUIDA.fumettoAperto){
				document.getElementById(GUIDA.fumettoAperto).classList.remove("vis");
				document.getElementById(GUIDA.fumettoAperto).classList.remove("visSch");
				document.getElementById(GUIDA.fumettoAperto).classList.remove("noFr");
			}
			clearTimeout(GUIDA.tmFumetto);
			document.getElementById("no_guida").dataset.name = "no_"+n;
			document.getElementById("no_guida").checked = false;
			if(!document.getElementById(n)){
				document.getElementById('guida_def').className = 'fumetti '+n;
				document.getElementById('fumetti_titolo').innerHTML = guide[n].titolo[globals.siglaLingua];
				document.getElementById('fumetti_testo').innerHTML = guide[n].testo[globals.siglaLingua].replace(/\n/g, "<br>");
				n='guida_def';
			}
			document.getElementById(n).classList.add("visSch");
			if(document.getElementById('elenchi').classList.contains("schExp") && SCHEDA.menu_to3)document.getElementById(n).classList.add("noFr");
			setTimeout( function(n){
				document.getElementById(n).classList.add("vis");
			},200, n);
			GUIDA.fumettoAperto = n;
			window.addEventListener("mouseup", GUIDA.nasFumetto, false);
			document.getElementById("container").addEventListener("touchstart", GUIDA.nasFumetto, false);
			document.getElementById("interfaccia").addEventListener("touchstart", GUIDA.nasFumetto, false);
		}
	},
	nasFumetto: function(){
		if(GUIDA.fumettoAperto && (!GUIDA.overFumetto || GUIDA.overChiudi)){
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
		}
	},
	noVis: function( el ){
		localStorage.setItem(document.getElementById("no_guida").dataset.name,el.checked);
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