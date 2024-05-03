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
			nav.innerHTML = '<span class="guida_btn_' +
							(n>0 ? 'sx" onClick="GUIDA.vai('+(n-1)+');' : 'void') +
							'"></span>' +
							'<span>'+(n+1)+' / '+els.length+'</span><span class="guida_btn_' +
							(n<els.length-1 ? 'dx" onClick="GUIDA.vai('+(n+1)+');' : 'void') +
							'"></span>' +
							'<span class="guidaChiudi" onClick="GUIDA.chiudi();"></span>';
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
		setTimeout( function(){
			document.getElementById("guida_cont").style.opacity = 1;
		}, 300 );
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
											'<br>';
							//				htmlEntities(sets[cartella].sottotitolo) + '';
							if(DB.login.data.auths.indexOf(cartella)>-1)HTML_elenco += 	'<span class="licensed_label">'+TXT("LicensedVersion")+'</span>';
							else HTML_elenco += 	'<span class="demo_ver_label">'+TXT("DemoVersion")+'</span>';
							HTML_elenco += 	'</div>';
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