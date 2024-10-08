var PAZIENTI_MODULI = { // extend PAZIENTI
	
	// moduli valutazione
	swImportaModuli: function(){ // visualizza/nasconde il menu dell'elenco moduli da improtare
		if(!document.getElementById("gruppoPunti_cont").classList.contains("visSch")){
			rimuoviLoading(document.getElementById("scheda_testo"));
			applicaLoading(document.getElementById("scheda_testo"),'vuoto');
			document.getElementById("LL").onclick = function(){PAZIENTI.swGruppoPunti();};
			let w = (document.getElementById("scheda_testo").scrollWidth-60),
				l = 30,
				maxW = 400;
			if(w>maxW){
				w = maxW;
				l = (document.getElementById("scheda").scrollWidth/2-maxW/2);
			}
			document.getElementById("gruppoPunti_cont").style.left = l+"px";
			document.getElementById("gruppoPunti_cont").style.width = w+"px";
			document.getElementById("gruppoPunti_cont").style.top = '118px';
			document.getElementById("gruppoPunti_cont").classList.add("visSch");
			let HTML = '',
				txt = htmlEntities(TXT("ImportaModulo"));
			HTML += '<div class="gr_tit">' +
						txt +
					'	<span onClick="PAZIENTI.swImportaModuli();">' +
					'</span>' +
					'</div>' +
					'<div class="gr_1">';
			for(m in moduliValutazione.modelli){
				let pass = true;
				for(let p in PAZIENTI.moduliProvvisori){
					if(PAZIENTI.moduliProvvisori[p].id == m)pass=false;
				}
				if(pass)HTML += '<label class="gr_3"' +
								'	  	for="gr_btn_'+m+'">' +
								'	<input 	type="checkbox"' +
								'			id="gr_btn_'+m+'"' +
								'			value="'+m+'"' +
								'			data-type="system">' +
								'	<b>'+moduliValutazione.modelli[m].title[globals.siglaLingua]+'</b>' +
								'</label>';
			}
			HTML += '<i id="tuoiModuli" class="tagDomanda">'+TXT("TuoiModuli")+'</i>';
			for(m in DB.moduli.data){
				let pass = true;
				for(let p in PAZIENTI.moduliProvvisori){
					if(PAZIENTI.moduliProvvisori[p].id == m)pass=false;
				}
				if(pass)HTML += '<label class="gr_3"' +
								'	  	for="gr_btn_'+m+'">' +
								'	<input 	type="checkbox"' +
								'			id="gr_btn_'+m+'"' +
								'			value="'+m+'"' +
								'			data-type="custom">' +
								'	<b>'+DB.moduli.data[m].NomeModulo+'</b>' +
								'</label>';
			}
			if(!DB.moduli.data.length)HTML += '<i>'+TXT("NoRes")+'</i>'
			HTML += '</div>';
			if(DB.moduli.data.length)HTML += '<div class="gr_imp"><span id="grImporta" onclick="PAZIENTI.importaModuli();">'+TXT("Importa").toUpperCase()+'</span></div>';
			document.getElementById("gruppoPunti_cont").innerHTML = HTML;


		}else{
			document.getElementById("LL").onclick = '';
			rimuoviLoading(document.getElementById("scheda_testo"));
			document.getElementById("gruppoPunti_cont").classList.remove("visSch");
		}
	},
	importaModuli: function(){ // importa un modulo di valutazione della scheda trattamento
		let els = document.getElementById("gruppoPunti_cont").getElementsByTagName("input"),
			errVuoto = false;
		for(let e in els){
			if(els[e].checked){
				let m = els[e].value;
				if(els[e].dataset.type=='custom'){
					if(!DB.moduli.data[m].jsonModulo.length){
						errVuoto = true
					}else{
						PAZIENTI.moduliProvvisori.push({
							"id": parseInt(m),
							"title": DB.moduli.data[m].NomeModulo,
							"data": DB.moduli.data[m].jsonModulo
						});
					}
				}else{
					let data = moduliValutazione.modelli[m].data;
					for(d in data){
						if(data[d].d){
							data[d].d = data[d].d[globals.siglaLingua]
						}
						if(data[d].l){
							for(l in data[d].l){
								data[d].l[l] = data[d].l[l][globals.siglaLingua]
							}
						}
					}
					PAZIENTI.moduliProvvisori.push({
						"id": m,
						"title": moduliValutazione.modelli[m].title[globals.siglaLingua],
						"data": data
					});
				}
			}
		}
		if(errVuoto)ALERT(TXT("erroreModuloVuoto"));
		PAZIENTI.popolaModuli();
		PAZIENTI.swImportaModuli();
		SCHEDA.formModificato = true;
	},
	popolaModuli: function(){
		let HTML = '',
			functs = [];
		for(m=0;m<PAZIENTI.moduliProvvisori.length;m++){
			let MDL = PAZIENTI.moduliProvvisori[m];
			HTML += '<div class="moduli">'+
					'	<div class="modulo_tit">'+MDL.title+'</div>' +
					'	<div class="modulo_del" onClick="PAZIENTI.rimuoviModulo('+m+');">'+TXT("RimuoviModulo")+'</div>';
			if(m)HTML += '	<div class="modulo_moveup" onClick="PAZIENTI.spostaModulo('+m+');">'+TXT("SpostaModulo")+'</div>';
			if(typeof(PAZIENTI.moduliProvvisori[m].id)=='number'){ // moduli custom
				for(d in PAZIENTI.moduliProvvisori[m].data){
					if(MDL.data[d].t=='e'){
						HTML += '<div class="domandeModuli etichetteModuli"><i class="tagDomanda">'+MDL.data[d].d+'</i></div>';
					}
					if(MDL.data[d].t=='d'){
						HTML += '<div class="domandeModuli"><i class="tagDomanda">'+MDL.data[d].d+'</i>' +
								H.r({	t: "r",
										name: "risposta"+d,
										value: MDL.data[d]?.r ? MDL.data[d].r : "",
										noLabel: true,
										classCampo: "okPlaceHolder styled tagDomanda",
										idRiga: 'dm_'+m+'_'+d,
										keyupCampo: 'PAZIENTI.updateDomanda(this);' }) +
								'</div>';
					}
				}
			}else{ // moduli si sistema
				HTML += moduliValutazione.modelli[PAZIENTI.moduliProvvisori[m].id].html;
				let matches = [...HTML.matchAll(/\[([\d,]+)\]/g)].map(match => match[1]);
				for(e in matches){
					let mt = matches[e].split(","),
						d = parseInt(mt[0]), // il numero d'ordine in data
						el = PAZIENTI.moduliProvvisori[m].data[d], // l'elemento in data
						sost = '',
						r = el?.r ? el.r : '';
					switch(el.t){
						case "e":
							sost = '<div class="domandeModuli etichetteModuli"><i class="tagDomanda">'+el.d+'</i></div>';
							break;
						case "c":
							let funct = '';
							if(moduliValutazione.modelli[PAZIENTI.moduliProvvisori[m].id]?.funct){
								funct = PAZIENTI.moduliProvvisori[m].id;
								functs.push(PAZIENTI.moduliProvvisori[m].id);
							}
							sost = '<div class="domandeModuli"><label for="risposta'+m+"_"+d+'">' +
									H.r({	t: "c",
											name: "risposta"+m+"_"+d,
											value: r,
											label: el.d,
											idRiga: 'dm_'+m+'_'+d,
											dataCampo: el?.v ? ' data-v="'+el.v+'"' : '',
											clickCampo: 'PAZIENTI.updateDomanda(this,\''+funct+'\')' }) +
									'</label></div>';
							break;
						case "d":
							sost = '<div class="domandeModuli"><i class="tagDomanda">'+el.d+'</i>' +
									H.r({	t: "r",
											name: "risposta"+d,
											value: r,
											noLabel: true,
											classCampo: "okPlaceHolder styled tagDomanda",
											idRiga: 'dm_'+m+'_'+d,
											keyupCampo: 'PAZIENTI.updateDomanda(this)' }) +
									'</div>';
							break;
						case "s":
							let opts = el.l;
							if(typeof(opts)=='string'){
								let els = moduliValutazione.liste[opts];
								opts = [];
								for(let e in els){
									let txt = typeof(els[e])=='object' ? els[e][globals.siglaLingua] : els[e];
									opts.push(txt);
								}
							}
							sost = '<div class="domandeModuli"><i class="tagDomanda">'+el.d+'</i>' +
									H.r({	t: "s",
											name: "risposta"+d,
											value: r,
											opts: opts,
											classCampo: "okPlaceHolder styled tagDomanda",
											idRiga: 'dm_'+m+'_'+d,
											onChange: 'PAZIENTI.updateDomanda(this)' }) +
									'</div>';
							break;
						case "r":
							sost = 	'<label for="risposta'+d+'_'+mt[1]+'" id="dm_'+m+'_'+d+'">' +
									'	<input 	type="radio"' +
									'			name="risposta'+d+'"' +
									'			id="risposta'+d+'_'+mt[1]+'"' +
									'			value="'+el.l[mt[1]]+'"' +
									'			'+(r==el.l[mt[1]] ? 'CHECKED':'') +
									'			onClick="PAZIENTI.updateDomanda(this);">' +
									'	<span>' +
											el.l[mt[1]]+
									'	</span>';
									'</span>';
							break;
					}
					HTML = HTML.replace("["+matches[e]+"]",sost);
				}
			}
			HTML += '</div>';
		}
		document.getElementById("modulo_cont").innerHTML = HTML;
		if(functs.length){ // eseguo tutte le funzioni
			for(f in functs){
				moduliValutazione.modelli[functs[f]].funct();
			}
		}
	},
	rimuoviModulo: function( m ){ // rimuove il modulo dalla scheda di trattamento
		CONFIRM.vis(	TXT("chiediRimuoviModulo"),
						false, 
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			PAZIENTI.moduliProvvisori.splice(m,1);
			PAZIENTI.popolaModuli();
			SCHEDA.formModificato = true;
		}});
	},
	spostaModulo: function( n ){ // rimuove il modulo dalla scheda di trattamento
		let el1 = clone(PAZIENTI.moduliProvvisori[n])
		el2 = clone(PAZIENTI.moduliProvvisori[n-1])
		PAZIENTI.moduliProvvisori[n]=clone(el2)
		PAZIENTI.moduliProvvisori[n-1]=clone(el1)
		PAZIENTI.popolaModuli();
		SCHEDA.formModificato = true;
	},
	updateDomanda: function( el, funct=null ){
		let pM = el.parentElement.id.split("_")
			m = parseInt(pM[1]),
			d = parseInt(pM[2]),
			r = '';
		switch(el.type){
			case "radio":
				r = document.querySelector('input[name="'+el.name+'"]:checked').value;
				break;
			case "checkbox":
				r = "1";
				break;
			default:
				r = el.value;
				if(document.getElementById("risposta1").tagName=='SELECT')r = parseInt(r);
				break;
		}
		PAZIENTI.moduliProvvisori[m].data[d].r = r;
		SCHEDA.formModificato = true;
		if(funct)moduliValutazione.modelli[funct].funct();
	}
	
}