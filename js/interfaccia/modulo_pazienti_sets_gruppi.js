var PAZIENTI_SETS_GRUPPI = { // extend PAZIENTI
	
	// importazione GRUPPI di punti, meridiani e auriculopunti
	gruppoPunti: function( tipo = 'P' ){ // costruisce il JSON dei gruppi punti (all'apertura del trattamento)
		PAZIENTI.tipoGruppo = tipo;
		applicaLoading(document.getElementById("scheda_testo"));
		document.getElementById("LL").onclick = function(){PAZIENTI.swGruppoPunti();};
		
		PAZIENTI.elencoGruppoPunti = {};
		PAZIENTI.elencoGruppoPunti.titolo = "";
		PAZIENTI.elencoGruppoPunti.contenuto = [];
		PAZIENTI.elencoGruppoPunti.livello = 1;
		let presenti = false;
		
		// punti da MERIDIANI
		if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='M' || PAZIENTI.tipoGruppo=='A' || PAZIENTI.tipoGruppo=='R'){
			EL = {};
			EL.contenuto = [];
			if(PAZIENTI.tipoGruppo=='P')EL.livello = 2;
			else EL.livello = 3;
			EL.parent = PAZIENTI.elencoGruppoPunti;
			let n = -1;
			if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='M'){
				EL.titolo = TXT("MeridianiTrattamento");
				for(let m in DB.set.meridiani){
					// verifico le autorizzazioni
					if(SET.verFreeMeridiani(m) && m!='NK'){
						n++;
						if(PAZIENTI.tipoGruppo=='P' && (globals.set.cartella=='meridiani_cinesi' || m!='EX')){ // punti
							EL.contenuto[n] = {};
							EL.contenuto[n].titolo = DB.set.meridiani[m].NomeMeridiano;
							EL.contenuto[n].contenuto = [];
							EL.contenuto[n].livello = 3;
							EL.contenuto[n].parent = EL;

							let myObj = DB.set.meridiani[m].punti,
								keys = 	Object.keys(myObj),
								len = keys.length;
							keys.sort();		
							for (let i=0; i<len; i++) {	
								let pm = keys[i];
								if(DB.set.meridiani[m].punti[pm].NomePunto){
									let pt = DB.set.meridiani[m].punti[pm].NomePunto.split(". ")[0];
									EL.contenuto[n].contenuto.push(pt);
								}
							}	
						}
						if(PAZIENTI.tipoGruppo=='M'){ // meridiani
							if(m!='EX')EL.contenuto.push(m);
						}
					}
					// --------------------------
				}
			}
			if(PAZIENTI.tipoGruppo=='A' || PAZIENTI.tipoGruppo=='R'){ // auricolo-punti
				let puntiElenco = [];
				for(let siglaPunto in DB.set.punti){
					// verifico le autorizzazioni
					if(SET.verFreePunti(siglaPunto)){ // verifico le autorizzazioni
						if(__(DB.set.punti[siglaPunto])){
							puntiElenco.push({
								siglaPunto: siglaPunto,
								NomePunto: DB.set.punti[siglaPunto].NomePunto
							});
						}
					}
					// --------------------------
				}
				puntiElenco.sort(sort_by("NomePunto", false));
				
				if(PAZIENTI.tipoGruppo=='A')EL.titolo = TXT("PuntiAuriculo");
				if(PAZIENTI.tipoGruppo=='R')EL.titolo = TXT("PuntiReflex");
				for(a in puntiElenco){
					if(puntiElenco[a].NomePunto){
						EL.contenuto.push(puntiElenco[a].siglaPunto);
					}
				}
			}
			PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
		}
		
		// solo Namikoshi
		if(PAZIENTI.tipoGruppo=='N'){
			EL = {};
			EL.contenuto = [];
			EL.livello = 3;
			EL.parent = PAZIENTI.elencoGruppoPunti;
			/* let n = -1; */
			EL.titolo = TXT("PuntiNamikoshi");

			let myObj = DB.set.meridiani['NK'].punti,
				keys = 	Object.keys(myObj),
				len = keys.length;
			keys.sort();		
			
			for (let i=0; i<len; i++) {	
				let pm = keys[i];
				if(DB.set.meridiani['NK'].punti[pm].NomePunto){
					let pP = DB.set.meridiani['NK'].punti[pm].siglaPunto.split("-");
					//EL.contenuto.push(pP[1]+"."+pP[0]+"."+DB.set.meridiani['NK'].punti[pm].siglaPunto);
					EL.contenuto.push(pP[1]+"."+pP[0]);
				}
			}
			PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
		}
		
		// punti da TEORIA
		for(t in DB.set.teoria){
			if(!__(DB.set.teoria[t].noList)){
				EL = {};
				EL.titolo = DB.set.teoria[t].TitoloSezione;
				EL.contenuto = [];
				EL.livello = 2;
				EL.parent = PAZIENTI.elencoGruppoPunti;
				for(let i in DB.set.teoria[t].contenuti){
					EL2 = {};
					EL2.titolo = DB.set.teoria[t].contenuti[i].TitoloTeoria;
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					// scansiono il testo
					let txtTeo=DB.set.teoria[t].contenuti[i].TestoTeoria;
					if(PAZIENTI.tipoGruppo=='P' ||
					   PAZIENTI.tipoGruppo=='N')re = /\[\.[0-9]{1,2}\.[A-Z]{2}[\.*]+\]/ig;
					if(PAZIENTI.tipoGruppo=='M')re = /\[\.[A-Z]{2}\.\]/ig;
					if(PAZIENTI.tipoGruppo=='A')re = /\[\.[0-9]{3}\.\]/ig;
					if(PAZIENTI.tipoGruppo=='R')re = /\[\.[0-9]{3}\.\]/ig;
					let result = txtTeo.match(re);
					for(let k in result){
						let pP = result[k].split(".");
						PT=pP[1];
						if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N')PT += '.'+pP[2];
						if(EL2.contenuto.indexOf(PT)===-1 && 
						   ((PAZIENTI.tipoGruppo=='P' && pP[2]!='NK') || (PAZIENTI.tipoGruppo=='N' && pP[2]=='NK')) ){
							let pass = true;
							
							// verifico le autorizzazioni
							if(PAZIENTI.tipoGruppo=='M')pass = SET.verFreeMeridiani(PT)
							else pass = SET.verFreePunti(PT);
							// --------------------------
							
							if(pass){
								EL2.contenuto.push(PT);
								presenti = true;
							}
						}
					}
					if(PAZIENTI.tipoGruppo=='A' || PAZIENTI.tipoGruppo=='R'){
						let gr = DB.set.teoria[t].contenuti[i].gruppo;
						if(gr){
							let punti = GEOMETRIE.gruppi[gr].punti;
							for(let k in punti){
								let PT = punti[k];
								// verifico le autorizzazioni
								if(SET.verFreePunti(PT)){
									if(EL2.contenuto.indexOf(PT)===-1){
										EL2.contenuto.push(PT);
										presenti = true;
									}
								}
								// --------------------------
							}
						}
					}
					//if(puntiTeoGroup){
					if(EL2.contenuto.length){
						EL.contenuto[i] = EL2;
					}
				}
				//if(HTML_provv && t*1>0){
				if(EL.contenuto.length && t*1>0){
					PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
				}
			}
		}
		
		// punti da PROCEDURE
		if(DB.procedure){
			EL = {};
			EL.titolo = TXT("Procedure");
			EL.contenuto = [];
			EL.livello = 2;
			EL.parent = PAZIENTI.elencoGruppoPunti;
			
			let PRS = clone(DB.procedure.data);
			PRS.sort(sort_by("NomeProcedura", false));
			presenti=false;
			for(let p in PRS){
				if(!PRS[p].Cancellato){
					EL2 = {};
					EL2.titolo = PRS[p].NomeProcedura;
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					// scansiono i dettagli
					for(let i in PRS[p].dettagliProcedura){
						let DT = PRS[p].dettagliProcedura[i];
						if(DT.TipoDettaglio==PAZIENTI.tipoGruppo){
							if(DT.DescrizioneDettaglio.length>1){
								EL2.contenuto.push(DT.DescrizioneDettaglio);
							}
						}
					}
					if(EL2.contenuto.length){
						EL.contenuto[p] = EL2;
						presenti=true;
					}
				}
			}
			if(presenti){
				PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
			}
		}
		setTimeout(function(){
			if(CONN.getConn() && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
				// carico i preferiti della community
				let JSNPOST={	"idLinguaRic": 0,
								"parolaRic": "",
								"parolaRicCrypt": "",
								"prefRic": "1",
								"record": 0 };
				
				CONN.caricaUrl(	"community_elenco.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								"PAZIENTI.caricaPuntiPreferiti" );
			}else PAZIENTI.caricaPuntiPatologie();
		}, 500 );
	},
	caricaPuntiPreferiti: function(txt){ // importa i punti delle procedure preferite nella community
		/* let err=false,
			record_tot=0,
			presente=false; */
		if(txt.substr(0,3) != '404' && txt != 'vuoto'){
			
			
			if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N' || PAZIENTI.tipoGruppo=='A' || PAZIENTI.tipoGruppo=='R'){ // DA RIVEDERE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<|!!!!!!!!!!!!!!!!
				
				
				EL = {};
				EL.titolo = TXT("CommunityPreferiti");
				EL.contenuto = [];
				EL.livello = 2;
				EL.parent = PAZIENTI.elencoGruppoPunti;
				let presenti = false,
					preferiti = JSON.parse(txt);
				for(let p in preferiti.dati){
					EL2 = {};
					EL2.titolo = preferiti.dati[p].NomeProcedura+' ('+htmlEntities(preferiti.dati[p].Pseudonimo);
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					if(preferiti.dati[p].elencoPunti.length>1){
						let elenco = preferiti.dati[p].elencoPunti.split("|");
						if(PAZIENTI.tipoGruppo=='M')elenco = preferiti.dati[p].elencoMeridiani.split("|");
						for(let pr in elenco){
							let PT = elenco[pr];
							if(PT){
								EL2.contenuto.push(PT);
								presenti=true;
							}
						}
					}
					EL.contenuto[p] = EL2;
				}
				PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
			}
		}
		PAZIENTI.caricaPuntiPatologie();
	},
	caricaPuntiPatologie: function(){ // importa i punti delle schede patologie 
		let totPatologie = 0;
		EL = {};
		EL.titolo = TXT("Patologie");
		EL.contenuto = [];
		EL.livello = 2;
		EL.parent = PAZIENTI.elencoGruppoPunti;
		for(let i in DB.set.patologie){
			// verifico le autorizzazioni
			if(SET.verFreePatologia(i)){
				EL2 = {};
				EL2.titolo = DB.set.patologie[i].NomePatologia;
				EL2.contenuto = [];
				EL2.livello = 3;
				EL2.parent = EL;
				// scansiono il testo
				let txtPat = DB.set.patologie[i].TestoPatologia;
				if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N')re = /\[\.[0-9]{1,2}\.[A-Z]{2}[\.*]+\]/ig;
				if(PAZIENTI.tipoGruppo=='M')re = /\[\.[A-Z]{2}\.\]/ig;
				if(PAZIENTI.tipoGruppo=='A'){
					let list = SET.getListPointPat(i);
					for(l in list){
						if(SET.verFreePunti(list[l])){ // verifico le autorizzazioni
							EL2.contenuto.push(list[l]);
						}
					}
					re = /\[\.[0-9]{3}\.\]/ig;
				}
				if(PAZIENTI.tipoGruppo=='R')re = /\[\.[0-9]{3}\.\]/ig;
				let result = txtPat.match(re);
				for(let k in result){
					let pP = result[k].split(".");
					let PT = pP[1];
					if(PAZIENTI.tipoGruppo=='P' || PAZIENTI.tipoGruppo=='N')PT += '.'+pP[2];
					if(EL2.contenuto.indexOf(PT)==-1){
						let pass = true;
						
						// verifico le autorizzazioni
						if(PAZIENTI.tipoGruppo=='M')pass = SET.verFreeMeridiani(PT)
						else pass = SET.verFreePunti(PT);
						// --------------------------
						
						if(pass && 
							((PAZIENTI.tipoGruppo=='P' && pP[2]!='NK') ||
							 (PAZIENTI.tipoGruppo=='N' && pP[2]=='NK') || PAZIENTI.tipoGruppo=='A' || PAZIENTI.tipoGruppo=='R'))EL2.contenuto.push(PT);
					}
				}
				if(EL2.contenuto.length){
					EL.contenuto[i] = EL2; 
					totPatologie += EL2.contenuto.length;
				}
			}
			// ---------------------------
		}
		if(totPatologie)PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
		PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoPunti;
		PAZIENTI.swGruppoPunti();
	},
	swGruppoPunti: function(){ // visualizza/nasconde il menu del gruppo punti in un trattamento
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
			PAZIENTI.popolaGruppoPunti();
		}else{
			document.getElementById("LL").onclick = '';
			rimuoviLoading(document.getElementById("scheda_testo"));
			document.getElementById("gruppoPunti_cont").classList.remove("visSch");
		}
	},
	popolaGruppoPunti: function(){ // popola il menu dei gruppi di punti in base al JSON creato
		let HTML = '',
			txt = htmlEntities(TXT("ImportaPunti"));
		if(PAZIENTI.tipoGruppo=='M')txt = htmlEntities(TXT("ImportaMeridiani"));
		HTML += '<div class="gr_tit">' +
					txt +
				'	<span onClick="PAZIENTI.swGruppoPunti();">' +
				'</span>' +
				'</div>';
		if(PAZIENTI.elencoGruppoAtt.livello>1){
			let titRet = htmlEntities(PAZIENTI.elencoGruppoAtt.titolo);
			HTML += '<div class="gr_ret">' +
					'	<div class="gr_ret_img" onClick="PAZIENTI.swGrLabel(-1);"></div>' +
					'	<div class="gr_ret_txt">'+titRet+'</div>' +
					'	<input id="gr_ret_ric" onKeyUp="PAZIENTI.filtraGruppoPunti();">' +
					'</div>';
		}
		HTML += '<div class="gr_'+(PAZIENTI.elencoGruppoAtt.livello-1)+'">';
		for(let k in PAZIENTI.elencoGruppoAtt.contenuto){
			if(PAZIENTI.elencoGruppoAtt.livello<3){
				HTML += '<div class="gr_btn"' +
						'	  id="gr_btn_'+k+'"' +
						'	  onClick="PAZIENTI.swGrLabel('+k+');">' +
							PAZIENTI.elencoGruppoAtt.contenuto[k].titolo +
						'</div>';
			}else{
				HTML += PAZIENTI.ptGruppo(PAZIENTI.elencoGruppoAtt.contenuto[k],'ch_'+k);
			}
		}
		HTML += '</div>';
		if(PAZIENTI.elencoGruppoAtt.livello==3){
			HTML += '<div class="gr_imp">'+
					'	<span id="grSelAll" onClick="PAZIENTI.ptGruppoSelAll(this);">' +
							htmlEntities(TXT("SelezionaTutti")) +
					'	</span>' +
					'	<span id="grImporta" onClick="PAZIENTI.ptGruppoImporta();">' +
							htmlEntities(TXT("Importa")) +
					'	</span>';
			let mzs = [];
			if( globals.set.cartella=='meridiani_cinesi' || 
				globals.set.cartella=='meridiani_shiatsu' )mzs = PAZIENTI.mezziSet.P;
			if(globals.set.cartella=='auricologia')mzs = PAZIENTI.mezziSet.A;
			if(globals.set.cartella=='reflessologia_plantare')mzs = PAZIENTI.mezziSet.R;
			if(mzs.length && PAZIENTI.mezziSet[PAZIENTI.tipoGruppo].length){
				HTML += '	<span class="separatorePulsanti"></span><div id="tt_mezzival3">';
				for(let m in mzs){
					HTML += '<span style="background-image:url(img/mezzo_'+mzs[m]+'.png);"' +
							'	   onClick="PAZIENTI.cambiaGZ(\''+mzs[m]+'\');"' +
							'	   data-mezzo="'+mzs[m]+'"';
					if(!__(localStorage["mezzoDefault"+globals.set.cartella]) && m==0)HTML += ' class="mzSel"';
					if(localStorage["mezzoDefault"+globals.set.cartella]==mzs[m])HTML += ' class="mzSel"';
					HTML += '	   title="'+htmlEntities(PAZIENTI.mezzi[mzs[m]])+'"></span>';
				}
				HTML += '</div>';
				if(__(localStorage["mezzoDefault"+globals.set.cartella]))PAZIENTI.mezzoProvvisorio = __(localStorage["mezzoDefault"+globals.set.cartella]);
			}
			HTML += '</div>';
		}
		document.getElementById("gruppoPunti_cont").innerHTML = HTML;
		document.getElementById("gruppoPunti_cont").classList.toggle("addOpts",(PAZIENTI.tipoGruppo!='M'));
		document.getElementById("gruppoPunti_cont").scrollTo(0,0);
		if(document.getElementById("gr_ret_ric"))document.getElementById("gr_ret_ric").focus();
	},
	filtraGruppoPunti: function(){
		let tag = 'div',
			lista = '.gr_1',
			cont = document.getElementById("gruppoPunti_cont"),
			val = document.getElementById("gr_ret_ric").value.toLowerCase().trim(),
			tags = document.querySelector(lista)?.getElementsByTagName(tag);
		if(cont.getElementsByClassName("gr_2").length){
			tag = 'label';
			lista = '.gr_2';
			tags = document.querySelector(lista)?.getElementsByTagName(tag);
		}
		for(t=0;t<tags.length;t++){
			let txt = tags[t].innerText+"";
			if(txt.toLowerCase().indexOf(val)>-1 || !val)tags[t].classList.remove("hide");
			else{
				//if(tag=='label')tags[t].getElementsByTagName("input")[0].checked = false;
				tags[t].classList.add("hide");
			}
		}
	},
	swGrLabel: function( k ){ // cambia il livello di visualizzazione del menu dei gruppi di punti
		if(PAZIENTI.overAll)return;
		if(k>-1)PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoAtt.contenuto[k];
		else PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoAtt.parent;
		PAZIENTI.popolaGruppoPunti();
	},
	ptGruppo: function( PT, n ){ // scrive la riga del punto da selezionare nel menu dei gruppi di punti
		let pP = PT.split("."),
			HTML = '',
			nPunto = '',
			mer = pP[0],
			siglaPT;
		if(pP[1]){
			mer = pP[1];
			nPunto = SET.ptToStr(pP[0]);
		}
		if(PAZIENTI.tipoGruppo=='A' || PAZIENTI.tipoGruppo=='R')pP[1]='';
		if((pP[0] && __(DB.set?.meridiani?.[mer])) || !pP[1]){
			HTML += '<label class="gr_3"' +
					'		for="'+n+'">' +
					'	<input type="checkbox"' +
					'		   id="'+n+'"' +
					'		   value="'+PT+'"';
			if(PAZIENTI.tipoGruppo=='P' || (PAZIENTI.tipoGruppo=='N' && __(DB.set.meridiani[mer].punti[nPunto]))){
				siglaPT = __(DB.set.meridiani[mer].punti[nPunto].siglaPunto,nPunto+"."+SET.convSigla(mer));
				if(mer=='EX')HTML += '		   data-sigla-punto="'+siglaPT+'"';
				if(mer=='NK')HTML += '		   data-sigla-punto="'+DB.set.meridiani[mer].punti[nPunto].NomePunto+'"';
			}
			HTML += '>';
			if(PAZIENTI.tipoGruppo=='P'){
				HTML +=	'<b>'+siglaPT+'.</b>' +
						'<i>'+DB.set.meridiani[mer].punti[nPunto].NomePunto.replace(PT+".","")+'</i>';
			}
			if(PAZIENTI.tipoGruppo=='N' && __(DB.set.meridiani[mer].punti[nPunto])){
				HTML +=	'<b>'+DB.set.meridiani[mer].punti[nPunto].NomePunto+'</b>';
			}
			if(PAZIENTI.tipoGruppo=='M'){
				HTML +=	DB.set.meridiani[pP[0]].NomeMeridiano;
			}
			if(PAZIENTI.tipoGruppo=='A' || PAZIENTI.tipoGruppo=='R'){
				HTML +=	DB.set.punti[pP[0]].NomePunto;
			}
			HTML +=	'</label>';
		}
		return HTML;
	},
	ptGruppoSelAll: function( el ){ // seleziona tutti i punti visualizzati del menu dei gruppi di punti
		let els = el.parentElement.parentElement.getElementsByTagName("input"),
			sel = '';
		for(let e in els){
			if(els[e].type=='checkbox'){
				if(!els[e].parentElement.classList.contains("hide")){
					if(sel==''){
						if(els[e].checked)sel = false;
						else sel = true;
					}
					els[e].checked = sel;
				}else els[e].checked = false;
			}
		}
	},
	ptGruppoImporta: function(){ // importa il gruppo dei punti nel trattamento
		let isProc = (document.getElementById("scheda").classList.contains("scheda_procedura")),
			els = document.getElementById("gruppoPunti_cont").getElementsByTagName("input");
		let punti = [];
		for(let e in els){
			if(els[e].checked && els[e].type=='checkbox'){
				let punto = els[e].value;
				if(	globals.set.cartella == 'meridiani_cinesi' ||
					globals.set.cartella == 'meridiani_shiatsu' ){
						punto += ".";
						if(els[e].dataset.siglaPunto)punto += els[e].dataset.siglaPunto;
					}
				punto += "."+PAZIENTI.mezzoProvvisorio;
				punti.push(punto);
			}
		}
		if(punti.length){
			if(!isProc)PAZIENTI.aggiungiGruppoTrattamento(punti);
			else SET.aggiungiGruppoProcedura(punti);
			PAZIENTI.swGruppoPunti();
			PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoPunti;
		}else ALERT(TXT("ErroreImportaPunti"));
	},
	evidenziaAggiunti: function( cont, n ){ // evidenzia in blu i punti aggiunti
		let els = cont.getElementsByClassName("rgProcMod");
		for(let e=els.length-1;e>=0;e--){
			if(n>0){
				els[e].classList.add("aggiunti");
				n--;
			}
		}
		setTimeout(function(cont){
			if(cont){
				let els = cont.getElementsByClassName("rgProcMod");
				for(let e=els.length-1;e>=0;e--){
					els[e].classList.remove("aggiunti");
				}
			}
		},4000,cont);
	},
	cambiaGZ: function( mezzo, setDefault=false ){ // cambia il mezzo sui punti aggiunti da popup
		if(setDefault)localStorage["mezzoDefault"+globals.set.cartella] = mezzo;
		else PAZIENTI.mezzoProvvisorio = mezzo;
		let tt_cont = document.getElementById("tt_mezzival3")
		if(document.getElementById("impset").classList.contains("visSch"))tt_cont = document.getElementById("tt_mezzival2");
		let els = tt_cont.getElementsByTagName("span");
		for(let e=0;e<els.length;e++){
			els[e].classList.toggle("mzSel",(els[e].dataset.mezzo == mezzo));
		}
		PAZIENTI.verMezzo(mezzo);
	}

}