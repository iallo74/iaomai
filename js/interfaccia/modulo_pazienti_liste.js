var PAZIENTI_LISTE = {
	
	caricaSintomi: function(){ // carica i punti del trattamento
		let HTML = '',
			totSintomi = 0,
			selectScoreHTML = 	'<select onChange="PAZIENTI.ricSintomiTratt([p],this);" class="scoreSelect">' +
								'	<option value="-1"></option>' +
								'	<option value="0">0</option>' +
								'	<option value="1">1</option>' +
								'	<option value="2">2</option>' +
								'	<option value="3">3</option>' +
								'	<option value="4">4</option>' +
								'	<option value="5">5</option>' +
								'	<option value="6">6</option>' +
								'	<option value="7">7</option>' +
								'	<option value="8">8</option>' +
								'	<option value="9">9</option>' +
								'	<option value="10">10</option>' +
								'</select>';
		if(PAZIENTI.sintomiProvvisori.length>0){
			for(let p in PAZIENTI.sintomiProvvisori){
				totSintomi++;
				let addStyle = (__(PAZIENTI.sintomiProvvisori[p].nuovo)) ? ' style="border-left: 3px solid #b500ff;"' : '';
				HTML += '<div data-id="'+PAZIENTI.sintomiProvvisori[p].idSintomo+'"'+addStyle+'>' +
						'	<span>' +
								htmlEntities(PAZIENTI.sintomiProvvisori[p].NomeSintomo) +
						'		<img src="img/ico_modifica_anag.png"' +
						'			 class="ico_mod_label noPrint"' +
						'			 data-value="'+htmlEntities(PAZIENTI.sintomiProvvisori[p].NomeSintomo)+'"' +
						'		 	 onClick="PAZIENTI.modificaSintomo(this);">' +
						'	</span>' +
						'	<img src="img/ico_cestino.png"' +
						'		 title="'+TXT("DelDett")+'"' +
						'		 onClick="PAZIENTI.eliminaSintomo('+p+');"' +
						'		 class="occhio noPrint">' +
							selectScoreHTML.replace('value="'+PAZIENTI.sintomiProvvisori[p].score+'"',
													'value="'+PAZIENTI.sintomiProvvisori[p].score+'" SELECTED').replace("[p]",p) +
						'</div>';
			}
		}else{
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes")+'...' +
					'</div>';
		}
		document.getElementById('totSintomi').innerHTML = totSintomi;
		document.getElementById('contSintomi').innerHTML = HTML;
	},
	ricSintomiTratt: function(n,el){ // ricarica i sintomi del trattamento (dopo un'azione es. elimina o nuovo)
		PAZIENTI.sintomiProvvisori[n].score=el.value*1;
		PAZIENTI.caricaSintomi();
		SCHEDA.formModificato = true;
	},
	aggiungiSintomo: function(){ // aggiunge un singolo punto al trattamento
		let id=0,
			el = document.getElementById("paz_add"),
			txt = el.value;
		if(txt.trim()!=''){
			let pass = txt.trim()=='' ? false : true,
				oldValue = '';
			if(el.parentElement.getElementsByTagName("div")[0].dataset.oldName){ // verifico se è in modifica con oldValue
				oldValue = el.parentElement.getElementsByTagName("input")[0].dataset.oldValue;
			}
			let els = document.getElementById("elencoSintomi").getElementsByClassName("elMod");
			for(let e in els){
				if(els[e].dataset){
					let val = els[e].dataset.value.toLowerCase();
					if(	val.trim() == txt.toLowerCase().trim() && !oldValue){
						PAZIENTI.selezionaSintomo(e);
						return;
					}
				}
			}
			
			// verifico doppione
			if(!oldValue){
				for(let s in PAZIENTI.sintomiProvvisori){
					if(txt.trim() == PAZIENTI.sintomiProvvisori[s].NomeSintomo){
						ALERT(TXT("erroreDuplicazioneElemento"))
						return;
					}
				}
			}
			let id = 0;
			if(pass){
				JSNPUSH={	"idSintomo": id*1,
							"NomeSintomo": txt.trim(),
							"score": 0 };
				if(!oldValue){
					SCHEDA.formModificato = true;
					PAZIENTI.sintomiProvvisori.push(JSNPUSH);
					PAZIENTI.caricaSintomi();
				}else{
					if(oldValue!=txt){
						let DataModifica = DB.pazienti.lastSync+1,
							modificato = false,
							PZS = clone(DB.pazienti.data);
						for(let p in PZS){
							if(PZS.Cancellato!=1){
								let TRS = PZS[p].trattamenti,
									pzMod = false;
								for(t in TRS){
									if(TRS.Cancellato!=1 && TRS[t].sintomi.length){
										let sintomi = clone(TRS[t].sintomi);
										for(let s in sintomi){
											if(sintomi[s].NomeSintomo==oldValue){
												sintomi[s].NomeSintomo=txt;
												modificato = true;
												pzMod = true;
											}
										}
										if(pzMod)DB.pazienti.data[p].trattamenti[t].sintomi = sintomi;
									}
								}
								if(pzMod)DB.pazienti.data[p].DataModifica = DataModifica;
							}
						}

						for(let p in PAZIENTI.sintomiProvvisori){
							if(PAZIENTI.sintomiProvvisori[p]["NomeSintomo"]== oldValue){
								PAZIENTI.sintomiProvvisori[p] = JSNPUSH;
							}
						}
						if(!el.parentElement.getElementsByTagName("div")[0].dataset.oldName){
							if(PAZIENTI.sintomiProvvisori=='')PAZIENTI.sintomiProvvisori=[];
							PAZIENTI.sintomiProvvisori.push(JSNPUSH);
						}
						PAZIENTI.popolaSintomi();
						PAZIENTI.caricaSintomi();
						if(modificato){
							applicaLoading(document.getElementById("scheda_testo"));
							applicaLoading(document.getElementById("elenchi_lista"));
							localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
								SYNCRO.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
													'rimuoviLoading(document.getElementById("elenchi_lista"));' );
							});
						}
					}
				}
			}
			document.getElementById("paz_add").value='';
		}
		PAZIENTI.popolaSintomi();
		PAZIENTI.caricaSintomi();
		if(oldValue)PAZIENTI.annullaSintomo();
	},
	eliminaSintomo: function( n ){ // elimina un sintomo del trattamento
		let add = document.formMod.TipoTrattamento.value;
		if(document.formMod.idCiclo.value=='-1' && add!='A')add = '';
		CONFIRM.vis(	TXT("ChiediEliminaSintomo" + add),
						__(PAZIENTI.sintomiProvvisori[n].nuovo,false), // bypass
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			PAZIENTI.sintomiEliminati.push(PAZIENTI.sintomiProvvisori[n].NomeSintomo);
			PAZIENTI.sintomiProvvisori.splice(n, 1); 
			PAZIENTI.caricaSintomi();
			PAZIENTI.popolaSintomi();
			PAZIENTI.annullaSintomo();
			SCHEDA.formModificato = true;
		}});
	},
	getSintomi: function(){ // restituisce l'elenco globale dei sintomi
		let SINTOMI = [],
			PZ = DB.pazienti.data;
		for(let p in PZ){
			let TR = PZ[p].trattamenti;
			for(t in TR){
				let sintomi = __(TR[t].sintomi,[]);
				if(sintomi.length){
					for(let s in sintomi){
					   let pass = true;
					   for(let S in SINTOMI){
						   if(SINTOMI[S].NomeSintomo==sintomi[s].NomeSintomo){
							  pass = false;
						   }
					   }
					   if(pass)SINTOMI.push(sintomi[s]);
					}
				}
			}
		}
		SINTOMI.sort(sort_by("NomeSintomo",false))
		return SINTOMI;
	},
	getSintomiCiclo: function( cartella, idCL=-1 ){
		let SINTOMI = [];
		let nomiSintomi = [];
		if(idCL==-1)idCL = PAZIENTI.idCL;
		if(cartella){
			for(let t in DB.pazienti.data[idCL].trattamenti){
				if(idCL==28)console.log(cartella+"=="+DB.pazienti.data[idCL].trattamenti[t].LabelCiclo)
				if(cartella == DB.pazienti.data[idCL].trattamenti[t].LabelCiclo){	
					let ss = clone(toJson(__(DB.pazienti.data[idCL].trattamenti[t].sintomi,[])));
					for(let s in ss){
						if(nomiSintomi.indexOf(ss[s].NomeSintomo)==-1){
							let sintomo = ss[s];
							sintomo.score = -1;
							SINTOMI.push(sintomo);
							nomiSintomi.push(sintomo.NomeSintomo);
						}
					}
				}
			}
		}
		return SINTOMI;
	},
	visAggiungiSintomo: function(){
		document.getElementById('cont_label_add_sintomi').style.display = 'block';
		document.getElementById('p_paz_label_sintomi').style.display = 'none';
		if(mouseDetect)document.getElementById('paz_add').focus();
		PAZIENTI.popolaSintomi();
	},
	nasAggiungiSintomo: function(){
		document.getElementById('cont_label_add_sintomi').style.display = 'none';
		document.getElementById('p_paz_label_sintomi').style.display = 'inline-block';
		document.getElementById("elencoSintomi").classList.remove("visSch");
	},
	selezionaSintomo: function( t ){
		let id=0;
		let globalSintomi = PAZIENTI.getSintomi();
		JSNPUSH={	"idSintomo": id*1,
					"NomeSintomo": globalSintomi[t].NomeSintomo,
					"score": -1,
					"nuovo": true };
			
		SCHEDA.formModificato = true;
		if(PAZIENTI.sintomiProvvisori=='')PAZIENTI.sintomiProvvisori=[];
		PAZIENTI.sintomiProvvisori.push(JSNPUSH);
		let posEl = PAZIENTI.sintomiEliminati.indexOf(globalSintomi[t].NomeSintomo);
		if(posEl>-1) PAZIENTI.sintomiEliminati.splice(posEl,1);
		PAZIENTI.caricaSintomi();
		document.getElementById("paz_add").value='';
		PAZIENTI.nasAggiungiSintomo();
		PAZIENTI.annullaSintomo();
	},
	popolaSintomi: function(){
		let HTML = '',
			globalSintomi = PAZIENTI.getSintomi();
		for(t in globalSintomi){
			let pass = true;
			for(let e in PAZIENTI.sintomiProvvisori){
				if(PAZIENTI.sintomiProvvisori[e].NomeSintomo == globalSintomi[t].NomeSintomo)pass = false;
			}
			if(pass)HTML += '<div id="sintomo">' +
							'	<div class="labelElenco"' +
							'		 onClick="PAZIENTI.selezionaSintomo('+t+');">' +
									htmlEntities(globalSintomi[t].NomeSintomo) +
							'	</div>' +
							'	<div class="elMod"' +
							'		 data-value="'+htmlEntities(globalSintomi[t].NomeSintomo)+'"' +
							'		 onClick="PAZIENTI.modificaSintomo(this);"></div>' +
							'</div>';
		}
		if(!HTML)HTML = '<div class="noResults">' + htmlEntities(TXT("NoResSintomi")) + '</div>';
		document.getElementById("elencoSintomi").innerHTML = HTML;
	},
	modificaSintomo: function( el ){
		PAZIENTI.visAggiungiSintomo();
		let valore = el.dataset.value,
			cont = document.getElementById("cont_label_add_sintomi"),
			campo = cont.getElementsByTagName("input")[0],
			pulsanteModifica = cont.getElementsByTagName("div")[0],
			pulsanteAnnulla = cont.getElementsByTagName("div")[1];
		campo.value = valore;
		campo.dataset.oldValue = valore;
		pulsanteModifica.dataset.oldName = pulsanteModifica.innerHTML;
		pulsanteModifica.innerHTML = htmlEntities(TXT("Modifica"));
		pulsanteAnnulla.classList.add("visBtn");
		cont.classList.add("modEl");
		campo.focus();
	},
	annullaSintomo: function(){
		let cont = document.getElementById("cont_label_add_sintomi"),
			campo = cont.getElementsByTagName("input")[0],
			pulsanteModifica = cont.getElementsByTagName("div")[0],
			pulsanteAnnulla = cont.getElementsByTagName("div")[1];
		campo.value = '';
		campo.dataset.oldValue = '';
		if(pulsanteModifica.dataset.oldName)pulsanteModifica.innerHTML = pulsanteModifica.dataset.oldName;
		pulsanteModifica.dataset.oldName = '';
		cont.classList.remove("modEl");
		pulsanteAnnulla.classList.remove("visBtn");
	},
	filtraSintomi: function(el){
		let val = el.value.trim().toLowerCase();
		if(event.keyCode==13){
			el.blur();
			PAZIENTI.aggiungiSintomo();
		}else{
			let elenco = document.getElementById("elencoSintomi"),
				els = elenco.getElementsByClassName("elMod"),
				campo = document.getElementById("paz_add"),
				oldValue = campo.dataset.oldValue;
			if(typeof(oldValue)=='undefined')oldValue = '';
			if(oldValue==''){
				
				let els = document.getElementById("elencoSintomi").getElementsByTagName("div");
				for(let e in els){
					if(els[e].innerText){
						let cont=els[e].innerText.toLowerCase();
						if(cont.indexOf(val)>-1 || !val)els[e].style.display = 'block';
						else els[e].style.display = 'none';
					}
				}
			}
		}
	},
	
	// tags
	caricaTags: function(){ // carica i tags del paziente
		let HTML='';
		if(PAZIENTI.tagsProvvisori.length>0){
			for(let p in PAZIENTI.tagsProvvisori){
				HTML += '<div class="rgTagsMod"' +
						'	  data-id="'+PAZIENTI.tagsProvvisori[p].idTag+'">' +
						'	<span class="tag"' +
						'		  style="background-color:#'+PAZIENTI.tagsProvvisori[p].colore+';">' +
						'		<img src="img/ico_modifica_mini.png"' +
						'			 width="22"' +
						'			 height="22"' +
						'			 style="margin-right: -5px;' +
						'		  		    cursor: pointer;"' +
						'			 align="absmiddle"' +
						'			 onClick="PAZIENTI.modificaTag(this);"' +
						'			 data-value="'+htmlEntities(PAZIENTI.tagsProvvisori[p].NomeTag)+'"' +
						'			 data-colore="'+PAZIENTI.tagsProvvisori[p].colore+'"' +
						'			 class="occhio">' +
								htmlEntities(PAZIENTI.tagsProvvisori[p].NomeTag) +
						'	</span>' +
						'	<img src="img/ico_cestino.png"' +
						'		 width="16"' +
						'		 height="16"' +
						'		 align="absmiddle"' +
						'		 style="float:right;' +
						'		 		margin:11px;' +
						'		 		cursor:pointer;' +
						'		 		opacity:0.5;"' +
						'		 title="'+TXT("DelDett")+'"' +
						'		 onClick="PAZIENTI.eliminaTag('+p+');"' +
						'		 class="occhio">' +
						'</div>';
			}
		}else{
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes")+'...' +
					'</div>';
		}
		document.getElementById('contTags').innerHTML = HTML;
	},
	aggiungiTag: function( el ){ // aggiunge un tag al paziente
		let txt = document.getElementById("tag_add").value,
			colore = document.getElementById("tag_col").dataset.colore,
			pass = txt.trim()=='' ? false : true,
			oldValue = oldColor = '';
		if(el.parentElement.getElementsByTagName("input")[0].dataset.oldValue){ // verifico se è in modifica con oldValue
			oldValue = el.parentElement.getElementsByTagName("input")[0].dataset.oldValue;
			oldColor = document.getElementById("tag_col").dataset.oldColor;
		}
		let els = document.getElementById("elencoTags").getElementsByClassName("elMod");
		for(let e in els){
			if(els[e].dataset){
				let val = els[e].dataset.value.toLowerCase();
				if(	val.trim() == txt.toLowerCase().trim() && !oldValue ){
					PAZIENTI.selezionaTag(e);
					return;
				}
			}
		}
		// verifico doppione
		if(!oldValue){
			for(t in PAZIENTI.tagsProvvisori){
				if(txt.trim() == PAZIENTI.tagsProvvisori[t]["NomeTag"]){
					ALERT(TXT("erroreDuplicazioneElemento"))
					return;
				}
			}
		}
		let id = 0;
		if(pass){
			
			JSNPUSH={	"idTag": id*1,
						"NomeTag": txt.trim(),
						"colore": colore };
			
			if(!oldValue){
				SCHEDA.formModificato = true;
				
				if(PAZIENTI.tagsProvvisori=='')PAZIENTI.tagsProvvisori=[];
				PAZIENTI.tagsProvvisori.push(JSNPUSH);
				PAZIENTI.caricaTags();
			}else{
				if(oldValue!=txt || oldColor!=colore){
					let DataModifica = DB.pazienti.lastSync+1,
						PZ = DB.pazienti.data,
						modificato = false;
					for(let p in PZ){
						let tags = toJson(PZ[p].tags),
							tgMod = false;
						if(tags.length){
							for(t in tags){
								if(tags[t].NomeTag == oldValue){
									tags[t] = JSNPUSH;
									modificato = true;
									tgMod = true;
								}
							}
						}
						if(tgMod){
							PZ[p].DataModifica = DataModifica;
							PZ[p].tags = tags;
						}
					}
					for(let p in PAZIENTI.tagsProvvisori){
						if(PAZIENTI.tagsProvvisori[p].NomeTag == oldValue){
							PAZIENTI.tagsProvvisori[p] = JSNPUSH;
						}
					}
					PAZIENTI.popolaTags();
					PAZIENTI.caricaTags();
					if(modificato){
						applicaLoading(document.getElementById("scheda_testo"));
						applicaLoading(document.getElementById("elenchi_lista"));
						localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
							SYNCRO.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
												'rimuoviLoading(document.getElementById("elenchi_lista"));' );
						});
					}
				}
			}
			document.getElementById("tag_add").value='';
			document.getElementById("tag_col").style.backgroundColor = '#FFFFFF';
			document.getElementById("tag_col").dataset.colore = 'FFFFFF';
		}
		PAZIENTI.popolaTags();
		PAZIENTI.caricaTags();
		if(oldValue)PAZIENTI.annullaTag();
	},
	eliminaTag: function(n){ // elimina un tag del paziente
		PAZIENTI.tagsProvvisori.splice(n, 1); 
		PAZIENTI.caricaTags();
		PAZIENTI.popolaTags();
		PAZIENTI.annullaTag();
		SCHEDA.formModificato = true;
	},
	cambiaColTag: function( el ){ // elimina un tag del paziente
		let oldCol = el.dataset.colore,
			cSel = -1;
		for(let c=0;c<DB.coloriTags.length;c++){
			if(DB.coloriTags[c]==oldCol)cSel = c+1;
		}
		if(cSel==DB.coloriTags.length)cSel = 0;
		newCol = DB.coloriTags[cSel];
		el.dataset.colore = newCol;
		el.style.backgroundColor = "#"+newCol;
	},
	getTags: function(){ // restituisce l'elenco globale dei tags
		let TAGS = [],
			PZ = DB.pazienti.data;
		for(let p in PZ){
			let tags = toJson(PZ[p].tags);
			if(tags.length){
				for(t in tags){
				   let pass = true;
				   for(T in TAGS){
					   if(TAGS[T].NomeTag==tags[t].NomeTag){
						  pass = false;
					   }
				   }
				   if(pass)TAGS.push(tags[t]);
				}
			}
		}
		return TAGS;
	},
	selezionaTag: function( t=0 ){
		let globalTags = PAZIENTI.getTags();
		JSNPUSH={	"idTag": -1,
					"NomeTag": globalTags[t].NomeTag.trim(),
					"colore": globalTags[t].colore };
			
		SCHEDA.formModificato = true;
		if(PAZIENTI.tagsProvvisori=='')PAZIENTI.tagsProvvisori=[];
		PAZIENTI.tagsProvvisori.push(JSNPUSH);
		PAZIENTI.caricaTags();
		PAZIENTI.popolaTags();
		PAZIENTI.annullaTag();
	},
	popolaTags: function(){
		let HTML = '',
			globalTags = PAZIENTI.getTags();
		for(t in globalTags){
			let pass = true;
			for(let e in PAZIENTI.tagsProvvisori){
				if(PAZIENTI.tagsProvvisori[e].NomeTag == globalTags[t].NomeTag)pass = false;
			}
			if(pass)HTML += '<div id="tag'+t+'">' +
							'	<div class="tagElenco"' +
							'		 onClick="PAZIENTI.selezionaTag('+t+');">' +
							'		<span class="tag tagMini"' +
							'	   		  style="background-color:#'+globalTags[t].colore+';">' +
							'		</span>' +
									htmlEntities(globalTags[t].NomeTag) +
							'	</div>' +
							'	<div class="elMod"' +
							'		 data-colore="'+globalTags[t].colore+'"' +
							'		 data-value="'+htmlEntities(globalTags[t].NomeTag)+'"' +
							'		 onClick="PAZIENTI.modificaTag(this);"></div>' +
							'</div>';
		}
		document.getElementById("elencoTags").innerHTML = HTML;
		if(HTML)document.getElementById("elencoTags").style.display = 'block';
		else document.getElementById("elencoTags").style.display = 'none';
	},
	modificaTag: function( el ){
		valore = el.dataset.value;
		document.getElementById("tag_add").value = valore;
		document.getElementById("tag_add").dataset.oldValue = valore;
		let pulsanteModifica = document.getElementById("cont_tag_add").getElementsByTagName("div")[1],
			pulsanteAnnulla = document.getElementById("cont_tag_add").getElementsByTagName("div")[0];
		pulsanteModifica.dataset.oldName = pulsanteModifica.innerHTML;
		pulsanteModifica.innerText = htmlEntities(TXT("Modifica"));
		document.getElementById("tag_col").style.backgroundColor = '#'+el.dataset.colore;
		document.getElementById("tag_col").dataset.colore = el.dataset.colore;
		document.getElementById("tag_col").dataset.oldColor = el.dataset.colore;
		document.getElementById("cont_tag_add").classList.add("modEl");
		document.getElementById('tag_add').focus();
		pulsanteAnnulla.classList.add("visBtn");
	},
	annullaTag: function(){
		let pulsanteModifica = document.getElementById("cont_tag_add").getElementsByTagName("div")[1],
			pulsanteAnnulla = document.getElementById("cont_tag_add").getElementsByTagName("div")[0];
		document.getElementById("tag_add").value = '';
		document.getElementById("tag_add").dataset.oldValue = '';
		if(pulsanteModifica.dataset.oldName)pulsanteModifica.innerHTML = pulsanteModifica.dataset.oldName;
		pulsanteModifica.dataset.oldName = '';
		document.getElementById("tag_col").style.backgroundColor = '#FFFFFF';
		document.getElementById("tag_col").dataset.colore = 'FFFFFF';
		document.getElementById("tag_col").dataset.oldColor = '';
		document.getElementById("cont_tag_add").classList.remove("modEl");
		pulsanteAnnulla.classList.remove("visBtn");
	},
	filtraTag: function(el){
		if(event.keyCode==13){
			el.blur();
			PAZIENTI.aggiungiTag(el);
		}else{
			let elenco = document.getElementById("elencoTags"),
				els = elenco.getElementsByClassName("elMod"),
				campo = document.getElementById("tag_add"),
				oldValue = campo.dataset.oldValue;
			if(typeof(oldValue)=='undefined')oldValue = '';
			if(oldValue==''){
				let txt = campo.value.toLowerCase().trim(),
					presenti = false;
				for(let e in els){
					if(els[e].dataset){
						if(els[e].dataset.value.toLowerCase().indexOf(txt)>-1 || txt==''){
							els[e].parentElement.style.display = 'block';
							presenti = true;
						}else{
							els[e].parentElement.style.display = 'none';
						}
					}
				}
				if(presenti)elenco.style.display = 'block';
				else elenco.style.display = 'none';
			}
		}
	},
	
	// elementi (medicine, allergie, patologie e interventi)
	defElemento: function( tipo ){
		let obj = {};
		if(tipo=='medicine'){
			obj.el = "Medicina";
			obj.els = "Medicine";
			obj.ELS = PAZIENTI.medicineProvvisorie;
		}
		if(tipo=='allergie'){
			obj.el = "Allergia";
			obj.els = "Allergie";
			obj.ELS = PAZIENTI.allergieProvvisorie;
		}
		if(tipo=='patologie'){
			obj.el = "Patologia";
			obj.els = "Patologie";
			obj.ELS = PAZIENTI.patologieProvvisorie;
		}
		if(tipo=='interventi'){
			obj.el = "Intervento";
			obj.els = "Interventi";
			obj.ELS = PAZIENTI.interventiProvvisori;
		}
		return obj;
	},
	caricaElementi: function( tipo ){ // carica gli elementi di un elenco
		obj = PAZIENTI.defElemento( tipo );
		let HTML ='';
		if(obj.ELS.length>0){
			for(let p in obj.ELS){
				HTML += '<div class="rg'+obj.els+'Mod"' +
						'	  data-id="'+obj.ELS[p]["id"+obj.el]+'">' +
						'	<span class="'+obj.el.toLowerCase()+'">' +
						'		<img src="img/ico_modifica_mini.png"' +
						'			 width="22"' +
						'			 height="22"' +
						'			 style="margin-right: -5px;' +
						/* '		  		    margin-top: -2px;' + */
						'		  		    float: right;' +
						'		  		    cursor: pointer;"' +
						'			 align="absmiddle"' +
						'			 onClick="PAZIENTI.modificaElemento(this,\''+tipo+'\');"' +
						'			 data-value="'+htmlEntities(obj.ELS[p]["Nome"+obj.el])+'"' +
						'			 class="occhio">' +
								htmlEntities(obj.ELS[p]["Nome"+obj.el]) +
						'	</span>' +
						'	<img src="img/ico_cestino.png"' +
						'		 width="16"' +
						'		 height="16"' +
						'		 align="absmiddle"' +
						'		 style="float:right;' +
						'		 		margin:11px;' +
						'		 		cursor:pointer;' +
						'		 		opacity:0.5;"' +
						'		 title="'+TXT("DelDett")+'"' +
						'		 onClick="PAZIENTI.eliminaElemento('+p+',\''+tipo+'\');"' +
						'		 class="occhio">' +
						'</div>';
			}
		}else{
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						TXT("NoRes")+'...' +
					'</div>';
		}
		document.getElementById('cont'+obj.els).innerHTML = HTML;
	},
	aggiungiElemento: function( tipo, el ){ // aggiunge un elemento a un elenco
		let obj = PAZIENTI.defElemento( tipo ),
			txt=document.getElementById(obj.el.toLowerCase()+"_add").value,
			/* global = PAZIENTI.getElementi(tipo), */
			pass = txt.trim()=='' ? false : true,
			oldValue = '';
		if(el.parentElement.getElementsByTagName("div")[1].dataset.oldName){ // verifico se è in modifica con oldValue
			oldValue = el.parentElement.getElementsByTagName("input")[0].dataset.oldValue;
		}
		let els = document.getElementById("elenco"+obj.els).getElementsByClassName("elMod");
		for(let e in els){
			if(els[e].dataset){
				let val = els[e].dataset.value.toLowerCase();
				if(	val.trim() == txt.toLowerCase().trim() && !oldValue){
					PAZIENTI.selezionaElemento(e, tipo);
					return;
				}
			}
		}
		let id = 0;
		if(pass){
			JSNPUSH={};
			JSNPUSH["id"+obj.el] = id*1;
			JSNPUSH["Nome"+obj.el] = txt.trim();
			
			let EL = null;
			if(tipo=='medicine'){
				EL = PAZIENTI.medicineProvvisorie;
				PAZIENTI.nasElementi('medicina');
			}
			if(tipo=='allergie'){
				EL = PAZIENTI.allergieProvvisorie;
				PAZIENTI.nasElementi('allergia');
			}
			if(tipo=='patologie'){
				EL = PAZIENTI.patologieProvvisorie;
				PAZIENTI.nasElementi('patologia');
			}
			if(tipo=='interventi'){
				EL = PAZIENTI.interventiProvvisori;
				PAZIENTI.nasElementi('intervento');
			}
			// verifico doppione
			if(!oldValue){
				for(let e in EL){
					if(txt.trim() == EL[e]["Nome"+obj.el]){
						ALERT(TXT("erroreDuplicazioneElemento"))
						return;
					}
				}
			}
			if(!oldValue){
				SCHEDA.formModificato = true;
				EL.push(JSNPUSH);
				PAZIENTI.caricaElementi(tipo);
			}else{
				if(oldValue!=txt){
					let DataModifica = DB.pazienti.lastSync+1,
						modificato = false,
						PZ = DB.pazienti.data;
					for(let p in PZ){
						let elenco = toJson(PZ[p][tipo]),
							pzMod = false;
						if(elenco.length){
							for(let e in elenco){
								if(elenco[e]["Nome"+obj.el] == oldValue){
									elenco[e] = JSNPUSH;
									modificato = true;
									pzMod = true;
								}
							}
						}
						if(pzMod){
							PZ[p].DataModifica = DataModifica;
							PZ[p][tipo] = elenco;
						}
					}
					for(let p in EL){
						if(EL[p]["Nome"+obj.el]== oldValue){
							EL[p] = JSNPUSH;
						}
					}
					PAZIENTI.popolaElementi(tipo);
					PAZIENTI.caricaElementi(tipo);
					if(modificato){
						applicaLoading(document.getElementById("scheda_testo"));
						applicaLoading(document.getElementById("elenchi_lista"));
						localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
							SYNCRO.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
												'rimuoviLoading(document.getElementById("elenchi_lista"));' );
						});
					}
				}
			}
			document.getElementById(obj.el.toLowerCase()+"_add").value='';
		}
		PAZIENTI.popolaElementi(tipo);
		PAZIENTI.caricaElementi(tipo);
		if(oldValue)PAZIENTI.annullaElemento(tipo);
	},
	eliminaElemento: function( n, tipo){ // elimina un elemento da un elenco
		obj = PAZIENTI.defElemento( tipo );
		obj.ELS.splice(n, 1); 
		PAZIENTI.caricaElementi(tipo);
		PAZIENTI.popolaElementi(tipo);
		PAZIENTI.annullaElemento(tipo);
		SCHEDA.formModificato = true;
	},
	getElementi: function( tipo ){ // restituisce l'elenco globale degli elementi di un elenco
		obj = PAZIENTI.defElemento( tipo );
		let LISTA = [],
			PZ = DB.pazienti.data;
		for(let p in PZ){
			let elenco = toJson(PZ[p][tipo]);
			if(elenco.length){
				for(let e in elenco){
				   let pass = true;
				   for(let M in LISTA){
					   if(LISTA[M]["Nome"+obj.el]==elenco[e]["Nome"+obj.el]){
						  pass = false;
					   }
				   }
				   if(pass)LISTA.push(elenco[e]);
				}
			}
		}
		LISTA.sort(sort_by("Nome"+obj.el,false));
		return LISTA;
	},
	selezionaElemento: function( m, tipo ){ // seleziona un elemento dallo storico degli elementi
		let obj = PAZIENTI.defElemento( tipo ),
			global = PAZIENTI.getElementi(tipo),
			id=0;
		JSNPUSH={}
		JSNPUSH["id"+obj.el] = id*1;
		JSNPUSH["Nome"+obj.el] = global[m]["Nome"+obj.el].trim();
		SCHEDA.formModificato = true;
		if(tipo=='medicine'){
			PAZIENTI.medicineProvvisorie.push(JSNPUSH);
			PAZIENTI.nasElementi('medicina');
		}
		if(tipo=='allergie'){
			PAZIENTI.allergieProvvisorie.push(JSNPUSH);
			PAZIENTI.nasElementi('allergia');
		}
		if(tipo=='patologie'){
			PAZIENTI.patologieProvvisorie.push(JSNPUSH);
			PAZIENTI.nasElementi('patologia');
		}
		if(tipo=='interventi'){
			PAZIENTI.interventiProvvisori.push(JSNPUSH);
			PAZIENTI.nasElementi('intervento');
		}
		PAZIENTI.caricaElementi(tipo);
		PAZIENTI.popolaElementi(tipo);
		PAZIENTI.annullaElemento(tipo);
	},
	popolaElementi: function( tipo ){ // popola lo storico degli elementi
		let obj = PAZIENTI.defElemento( tipo ),
			global = PAZIENTI.getElementi(tipo),
			HTML = '';
		for(let m in global){
			let pass = true;
			for(let e in obj.ELS){
				if(obj.ELS[e]["Nome"+obj.el] == global[m]["Nome"+obj.el])pass = false;
			}
			if(pass)HTML += '<div id="elemento_'+tipo+'_'+m+'">' +
							'	<div class="'+tipo+'Elenco"' +
							'		 onClick="PAZIENTI.selezionaElemento('+m+',\''+tipo+'\');">' +
									htmlEntities(global[m]["Nome"+obj.el]) +
							'	</div>' +
							'	<div class="elMod"' +
							'		 data-value="'+htmlEntities(global[m]["Nome"+obj.el])+'"' +
							'		 onClick="PAZIENTI.modificaElemento(this,\''+tipo+'\');"></div>' +
							'</div>';
		}
		document.getElementById("elenco"+obj.els).innerHTML = HTML;
		if(HTML)document.getElementById("elenco"+obj.els).style.display = 'block';
		else document.getElementById("elenco"+obj.els).style.display = 'none';
	},
	modificaElemento: function( el, tipo ){
		let obj = PAZIENTI.defElemento( tipo ),
			valore = el.dataset.value,
			cont = document.getElementById("cont_"+obj.el.toLowerCase()+"_add"),
			campo = cont.getElementsByTagName("input")[0],
			pulsanteAnnulla = cont.getElementsByTagName("div")[0],
			pulsanteModifica = cont.getElementsByTagName("div")[1];
		campo.value = valore;
		campo.dataset.oldValue = valore;
		pulsanteModifica.dataset.oldName = pulsanteModifica.innerHTML;
		pulsanteModifica.innerHTML = htmlEntities(TXT("Modifica"));
		pulsanteAnnulla.classList.add("visBtn");
		cont.classList.add("modEl");
		campo.focus();
	},
	annullaElemento: function( tipo ){
		let obj = PAZIENTI.defElemento( tipo ),
			cont = document.getElementById("cont_"+obj.el.toLowerCase()+"_add"),
			campo = document.getElementById(obj.el.toLowerCase()+"_add"),
			pulsanteAnnulla = campo.parentElement.getElementsByTagName("div")[0],
			pulsanteModifica = campo.parentElement.getElementsByTagName("div")[1];
		campo.value = '';
		campo.dataset.oldValue = '';
		if(pulsanteModifica.dataset.oldName)pulsanteModifica.innerHTML = pulsanteModifica.dataset.oldName;
		pulsanteModifica.dataset.oldName = '';
		pulsanteAnnulla.classList.remove("visBtn");
		cont.classList.remove("modEl");
	},
	filtraElemento: function( tipo, el ){
		if(event.keyCode==13){
			el.blur();
			PAZIENTI.aggiungiElemento(tipo, el);
		}else{
			let obj = PAZIENTI.defElemento( tipo ),
				elenco = document.getElementById("elenco"+obj.els),
				els = elenco.getElementsByClassName("elMod"),
				campo = document.getElementById(obj.el.toLowerCase()+"_add"),
				oldValue = campo.dataset.oldValue;
			if(typeof(oldValue)=='undefined')oldValue = '';
			if(oldValue==''){
				let txt = campo.value.toLowerCase().trim(),
					presenti = false;
				for(let e in els){
					if(els[e].dataset){
						if(els[e].dataset.value.toLowerCase().indexOf(txt)>-1 || txt==''){
							els[e].parentElement.style.display = 'block';
							presenti = true;
						}else{
							els[e].parentElement.style.display = 'none';
						}
					}
				}
				if(presenti)elenco.style.display = 'block';
				else elenco.style.display = 'none';
			}
		}
	},
	visElementi: function( tipo ){
		document.getElementById('cont_'+tipo+'_add').style.display = 'block';
		document.getElementById('cont_p_paz_label_'+tipo).style.display = 'none';
	},
	nasElementi: function( tipo ){
		document.getElementById('cont_'+tipo+'_add').style.display = 'none';
		document.getElementById('cont_p_paz_label_'+tipo).style.display = 'block';
	}
	
}
