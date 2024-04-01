var PAZIENTI_FILTRI = { // extend PAZIENTI
	maxInvii: 100,
	maxInviiMese: 1000,
	coda: 0,
	inviiMensili: 0,
	parametriFiltri:[],
	
	// FILTRI E STATISTICHE
	car_filtri: function( aggiorna ){
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
						
			if(typeof(aggiorna) == 'undefined')aggiorna = false;
			endChangeDetection( "formMod" );
			SCHEDA.formModificato = false;
			
			MENU.nasMM();
			
			// COMPONGO GLI ELENCHI
			let PZ = [];
			for(let p in DB.pazienti.data){
				let P = clone(DB.pazienti.data[p]);
				if(	PAZIENTI.pazientiFiltrati.length && 
					PAZIENTI.pazientiFiltrati.indexOf(p*1)==-1 )P.Cancellato = 1;
				PZ.push(P);
			}
			
			let totPazienti = 0,
				etichette = H.getEtichette('',[ DB.pazienti.data ]),
				stats = {
					generi: {},
					fasce_eta: {},
					province: {},
					socials: {},
					professioni: {},
					provenienze: {},
					etichette: {},
					tags: {},
					medicine: {},
					allergie: {},
					patologie: {},
					interventi: {},
					sintomi: {}
				};
			// generi
			for(let s in sessi){
				if(!stats.generi[s])stats.generi[s] = [];
				for(let p in PZ){
					if(PZ[p].sesso == s && !PZ[p].Cancellato*1){
						if(stats.generi[s].indexOf(p*1)==-1)stats.generi[s].push(p*1);
					}
				}
			}
			// fasce di età
			let annoAttuale=new Date().getFullYear();
			for(let p in PZ){
				if(!PZ[p].Cancellato*1){
					let decina = -1;
					if(PZ[p].DataNascita!='0000-00-00'){
						let AnnoNascita = PZ[p].DataNascita.split("-")[0]*1,
							etaPaziente = (annoAttuale - AnnoNascita)+"";
						if(etaPaziente.length==1)decina="0";
						else decina=etaPaziente.substr(0,1);
					}
					if(!stats.fasce_eta[decina])stats.fasce_eta[decina] = [];
					if(stats.fasce_eta[decina].indexOf(p*1)==-1)stats.fasce_eta[decina].push(p*1);
				}
			}
			// professioni | province | socials
			for(let p in PZ){
				if(!PZ[p].Cancellato*1){
					if(!stats.provenienze[PZ[p].Provenienza])stats.provenienze[PZ[p].Provenienza] = [];
					if(!stats.professioni[PZ[p].Professione])stats.professioni[PZ[p].Professione] = [];
					if(!stats.province[PZ[p].Provincia])stats.province[PZ[p].Provincia] = [];
					if(!stats.socials[PZ[p].Social])stats.socials[PZ[p].Social] = [];
					
					if(stats.provenienze[PZ[p].Provenienza].indexOf(p*1)==-1)stats.provenienze[PZ[p].Provenienza].push(p*1);
					if(stats.professioni[PZ[p].Professione].indexOf(p*1)==-1)stats.professioni[PZ[p].Professione].push(p*1);
					if(stats.province[PZ[p].Provincia].indexOf(p*1)==-1)stats.province[PZ[p].Provincia].push(p*1);
					if(stats.socials[PZ[p].Social].indexOf(p*1)==-1)stats.socials[PZ[p].Social].push(p*1);
					totPazienti++;
				}
			}
			
			if(stats.provenienze[""]){
				let vuote = stats.provenienze[""];
				delete stats.provenienze[""];
				stats.provenienze[""] = vuote;
			}
			if(stats.professioni[""]){
				let vuote = stats.professioni[""];
				delete stats.professioni[""];
				stats.professioni[""] = vuote;
			}
			if(stats.province[""]){
				let vuote = stats.province[""];
				delete stats.province[""];
				stats.province[""] = vuote;
			}
			if(stats.socials[""]){
				let vuote = stats.socials[""];
				delete stats.socials[""];
				stats.socials[""] = vuote;
			}
			// etichette
			for(let e in etichette){
				if(etichette[e]){
					if(!stats.etichette[etichette[e]])stats.etichette[etichette[e]] = {};
					for(let p in PZ){
						if(!PZ[p].Cancellato*1){
							let et = __(PZ[p].etichette,[]),
								pass = false;
							//if(typeof(et)=='string')et=JSON.parse(et)
							for(let f in et){
								let etichetta = et[f].NomeEtichetta,
									valore = et[f].ValoreEtichetta;
								if(etichetta == etichette[e]){
									if(!stats.etichette[etichetta][valore])stats.etichette[etichetta][valore] = [];
									if(stats.etichette[etichetta][valore].indexOf(p*1)==-1)stats.etichette[etichetta][valore].push(p*1);
									pass = true;
								}
							}
							if(!pass){
								valore = '';
								if(!stats.etichette[etichette[e]][valore])stats.etichette[etichette[e]][valore] = [];
								if(stats.etichette[etichette[e]][valore].indexOf(p*1)==-1)stats.etichette[etichette[e]][valore].push(p*1);
							}
						}
					}
				}
			}
			
			// tags
			for(let p in PZ){
				if(!PZ[p].Cancellato*1){
					let tg = __(PZ[p].tags,[]);
					for(t in tg){
						let tag = tg[t].NomeTag;
						if(!stats.tags[tag])stats.tags[tag] = [];
						if(stats.tags[tag].indexOf(p*1)==-1)stats.tags[tag].push(p*1);
					}
				}
			}
			
			// medicine
			for(let p in PZ){
				if(!PZ[p].Cancellato*1){
					let md = __(PZ[p].medicine,[]);
					for(let m in md){
						let medicina = md[m].NomeMedicina;
						if(!stats.medicine[medicina])stats.medicine[medicina] = [];
						if(stats.medicine[medicina].indexOf(p*1)==-1)stats.medicine[medicina].push(p*1);
					}
				}
			}
			
			// allergie
			for(let p in PZ){
				if(!PZ[p].Cancellato*1){
					let al = __(PZ[p].allergie,[]);
					for(a in al){
						let allergia = al[a].NomeAllergia;
						if(!stats.allergie[allergia])stats.allergie[allergia] = [];
						if(stats.allergie[allergia].indexOf(p*1)==-1)stats.allergie[allergia].push(p*1);
					}
				}
			}
			
			// patologie
			for(let p in PZ){
				if(!PZ[p].Cancellato*1){
					let pt = __(PZ[p].patologie,[]);
					for(t in pt){
						let patologia = pt[t].NomePatologia;
						if(!stats.patologie[patologia])stats.patologie[patologia] = [];
						if(stats.patologie[patologia].indexOf(p*1)==-1)stats.patologie[patologia].push(p*1);
					}
				}
			}
			
			// interventi
			for(let p in PZ){
				if(!PZ[p].Cancellato*1){
					let int = __(PZ[p].interventi,[]);
					for(let i in int){
						let intervento = int[i].NomeIntervento;
						if(!stats.interventi[intervento])stats.interventi[intervento] = [];
						if(stats.interventi[intervento].indexOf(p*1)==-1)stats.interventi[intervento].push(p*1);
					}
				}
			}
			
			// sintomi
			for(let p in PZ){
				if(!PZ[p].Cancellato*1){
					for(t in PZ[p].trattamenti){
						let TR = PZ[p].trattamenti[t];
						if(!TR.Cancellato*1){
							let si = TR.sintomi;
							for(let s in si){
								let sintomo = si[s].NomeSintomo;
								if(!stats.sintomi[sintomo])stats.sintomi[sintomo] = [];
								if(stats.sintomi[sintomo].indexOf(p*1)==-1)stats.sintomi[sintomo].push(p*1);
							}
						}
					}
				}
			}
			
			// riordino alfabeticamente
			stats.provenienze = sortObject(stats.provenienze);
			stats.professioni = sortObject(stats.professioni);
			stats.province = sortObject(stats.province);
			stats.etichette = sortObject(stats.etichette);
			stats.tags = sortObject(stats.tags);
			stats.medicine = sortObject(stats.medicine);
			stats.allergie = sortObject(stats.allergie);
			stats.patologie = sortObject(stats.patologie);
			stats.interventi = sortObject(stats.interventi);
			stats.sintomi = sortObject(stats.sintomi);
			//console.log(stats)
			if(!aggiorna){
				// se SCRIVO LA LISTA
				let titolo = stripslashes(TXT("FiltroPazienti")),	
					HTML = '',
					noRes = '...';
				HTML += '<div id="pazienti_stats">' +
						'	<h1>'+htmlEntities(titolo)+'</h1>';	
				
				if(!totPazienti){
					HTML += '<div class="noResults">'+htmlEntities(TXT("NoResPaziente"))+'</div>';
				}else{
					
					HTML += 
						'<div id="toolsStats"' +
							  (PAZIENTI.pazientiFiltrati.length ? '' : ' style="display:none;"') +
						'>' +
						'	<div>' +
						'		<div class="btn_invia" onClick="this.blur();PAZIENTI.cancellaFiltri();">' +
									htmlEntities(TXT("AnnullaFiltri")) +
						'		</div>' +
						'		<div id="marketingTools_btns_in"' +
						'			 class="btn_frdx"' +
						'			 style="float:right;"' +
						'			 onClick="PAZIENTI.car_marketing();">' +
									htmlEntities(TXT("StrumentiMarketing")) +
						'		</div>' +
						'	</div>' +	
						'	<div id="parametri_filtri">' +
						'<h2>'+htmlEntities(TXT("FiltriApplicati"))+'</h2>';
					let htmlParametri = '';
					if(PAZIENTI.parametriFiltri.length){	
						for(let p in PAZIENTI.parametriFiltri){
							htmlParametri += '<p><i>'+PAZIENTI.parametriFiltri[p].cat+':</i><span>';
							for(let e in PAZIENTI.parametriFiltri[p].elems){
								htmlParametri += '<u>'+PAZIENTI.parametriFiltri[p].elems[e]+'</u>';
							}
							htmlParametri += '</span></p>';
						}
					}
					HTML += htmlParametri;
					HTML +=
						'	</div>' +	
						'</div>';
					
					// FILTRI
					HTML += '<div id="contStats">' +
							'	<p>'+htmlEntities(TXT("TotalePazienti"))+': <b>'+totPazienti+'</b></p>' +
							'	<div class="rgStats">' +
							'		<div class="etStats">' +
							'			<i>'+htmlEntities(TXT("FasceEta"))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML +=	'		</div>' +
							'		<div>' +
							'			<table>';
					let tot = 0;
					for(let f in stats.fasce_eta){
						tot += stats.fasce_eta[f].length;
					}
					
					for(let f in stats.fasce_eta){
						let label = (f*10)+'-'+((f*1+1)*10-1),
							cls = 'statsBarre';
						if(f==-1){
							label = noRes;
							cls += ' statsVuoto';
						}
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						let perc = (stats.fasce_eta[f].length*100) / totPazienti;
						HTML += '		<tr>' +
								'			<td><div>'+label+'</div></td>' +
								'			<td class="'+cls+'">' +
								'				<span style="width:'+perc+'%;"></span>' +
								'			</td>' +
								'			<td class="nPazStats"><b>'+stats.fasce_eta[f].length+'</b></td>';
						if(!PAZIENTI.pazientiFiltrati.length)HTML += 
								'			<td><input type="checkbox"' +
								'					   onClick="PAZIENTI.statsFiltra();"' +
								'					   value="'+JSON.stringify(stats.fasce_eta[f])+'"' +
								'					   data-et="fasce_eta"' +
								'					   data-cat="'+TXT("FasceEta")+'"' +
								'					   data-elem="'+label+'"></td>';
						HTML += '		</tr>';
					}
					HTML += '		</table>' +
							'	</div>' +
							'</div>' +
					
							// generi
							'<div class="rgStats">' +
							'	<div class="etStats">' +
							'		<i>'+htmlEntities(TXT("Generi"))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML +=	'	</div>' +
							'	<div>' +
							'		<table>';
					tot = 0;
					for(let g in stats.generi){
						tot += stats.generi[g].length;
					}
					for(let g in stats.generi){
						let label = sessi[g],
							cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						let perc = (stats.generi[g].length*100) / tot;
						HTML += 	'	<tr>' +
								'			<td><div>'+label+'</div></td>' +
								'			<td class="'+cls+'">' +
								'				<span style="width:'+perc+'%;"></span>' +
								'			</td>' +
								'			<td class="nPazStats"><b>'+stats.generi[g].length+'</b></td>';
						if(!PAZIENTI.pazientiFiltrati.length)HTML += 
								'			<td><input type="checkbox"' +
								'					   onClick="PAZIENTI.statsFiltra();"' +
								'					   value="'+JSON.stringify(stats.generi[g])+'"' +
								'					   data-et="generi"' +
								'					   data-cat="'+TXT("Generi")+'"' +
								'					   data-elem="'+label+'"></td>';
						HTML += '		</tr>';
					}
					HTML += '		</table>' +
							'	</div>' +
							'</div>' +
					
							// professioni
							'<div class="rgStats">' +
							'	<div class="etStats">' +
							'		<i>'+htmlEntities(TXT("Professioni"))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML +=	'	</div>' +
							'	<div>' +
							'		<table>';
					
					tot = 0;
					for(let p in stats.professioni){
						tot += stats.professioni[p].length;
					}
					for(let p in stats.professioni){
						let label = p,
							cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						let perc = (stats.professioni[p].length*100) / tot;
						HTML += '		<tr>' +
								'			<td><div>'+label+'</div></td>' +
								'			<td class="'+cls+'">' +
								'				<span style="width:'+perc+'%;"></span>' +
								'			</td>' +
								'			<td class="nPazStats"><b>'+stats.professioni[p].length+'</b></td>';
						if(!PAZIENTI.pazientiFiltrati.length)HTML += 
								'			<td><input type="checkbox"' +
								'					   onClick="PAZIENTI.statsFiltra();"' +
								'					   value="'+JSON.stringify(stats.professioni[p])+'"' +
								'					   data-et="professioni"' +
								'					   data-cat="'+TXT("Professioni")+'"' +
								'					   data-elem="'+label+'"></td>';
						HTML += '		</tr>';
					}
					HTML += '		</table>' +
							'	</div>' +
							'</div>' +
					
							// provenienze
							'<div class="rgStats">' +
							'	<div class="etStats">' +
							'		<i>'+htmlEntities(TXT("Provenienze"))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML +=	'	</div>' +
							'	<div>' +
							'		<table>';
					
					tot = 0;
					for(let p in stats.provenienze){
						tot += stats.provenienze[p].length;
					}
					for(let p in stats.provenienze){
						let label = p,
							cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						let perc = (stats.provenienze[p].length*100) / tot;
						HTML += '		<tr>' +
								'			<td><div>'+label+'</div></td>' +
								'			<td class="'+cls+'">' +
								'				<span style="width:'+perc+'%;"></span>' +
								'			</td>' +
								'			<td class="nPazStats"><b>'+stats.provenienze[p].length+'</b></td>';
						if(!PAZIENTI.pazientiFiltrati.length)HTML += 
								'			<td><input type="checkbox"' +
								'					   onClick="PAZIENTI.statsFiltra();"' +
								'					   value="'+JSON.stringify(stats.provenienze[p])+'"' +
								'					   data-et="provenienze"' +
								'					   data-cat="'+TXT("Provenienze")+'"' +
								'					   data-elem="'+label+'"></td>';
						HTML += '		</tr>';
					}
					HTML += '		</table>' +
							'	</div>' +
							'</div>' +
					
							// province
							'<div class="rgStats">' +
							'	<div class="etStats">' +
							'		<i>'+htmlEntities(TXT("Province"))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML +=	'	</div>' +
							'	<div>' +
							'		<table>';
					tot = 0;
					for(let p in stats.province){
						tot += stats.province[p].length;
					}
					for(let p in stats.province){
						let label = p,
							cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						let perc = (stats.province[p].length*100) / tot;
						HTML += '		<tr>' +
								'			<td><div>'+label+'</div></td>' +
								'			<td class="'+cls+'">' +
								'				<span style="width:'+perc+'%;"></span>' +
								'			</td>' +
								'			<td class="nPazStats"><b>'+stats.province[p].length+'</b></td>';
						if(!PAZIENTI.pazientiFiltrati.length)HTML += 
								'			<td><input type="checkbox"' +
								'					   onClick="PAZIENTI.statsFiltra();"' +
								'					   value="'+JSON.stringify(stats.province[p])+'"' +
								'					   data-et="province"' +
								'					   data-cat="'+TXT("Province")+'"' +
								'					   data-elem="'+label+'"></td>';
						HTML +=	'		</tr>';
					}
					HTML += '		</table>' +
							'	</div>' +
							'</div>' +
					
							// socials
							'<div class="rgStats">' +
							'	<div class="etStats">' +
							'		<i>'+htmlEntities(TXT("Social"))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML += '	</div>' +
							'	<div>' +
							'		<table>';
							
							
					tot = 0;
					for(let p in stats.socials){
						tot += stats.socials[p].length;
					}
					for(let p in stats.socials){
						let label = p,
							cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						let perc = (stats.socials[p].length*100) / tot;
						HTML += '		<tr>' +
								'			<td><div>'+label+'</div></td>' +
								'			<td class="'+cls+'">' +
								'				<span style="width:'+perc+'%;"></span>' +
								'			</td>' +
								'			<td class="nPazStats"><b>'+stats.socials[p].length+'</b></td>';
						if(!PAZIENTI.pazientiFiltrati.length)HTML += 
								'			<td><input type="checkbox"' +
								'					   onClick="PAZIENTI.statsFiltra();"' +
								'					   value="'+JSON.stringify(stats.socials[p])+'"' +
								'					   data-et="socials"' +
								'					   data-cat="'+TXT("Social")+'"' +
								'					   data-elem="'+label+'"></td>';
						HTML += '		</tr>';
					}
					HTML += '		</table>' +
							'	</div>' +
							'</div>';
					
					for(let e in stats.etichette){
						let HTML_provv = '';
						HTML_provv += 	'<div class="rgStats">' +
										'	<div class="etStats">' +
										'		<i>'+htmlEntities(e)+':</i> ';
						if(!PAZIENTI.pazientiFiltrati.length)HTML_provv +=
										'			<span><input type="checkbox"' +
										'							   onClick="PAZIENTI.statsSelAll(this);"' +
										'							   data-dis="true"></span> ';
						HTML_provv +=	'	</div>' +
										'	<div>' +
										'		<table>';
						tot = 0;						for(let p in stats.etichette[e]){
							tot += stats.etichette[e][p].length;
						}
						//stats.etichette[e][""] = totPazienti - tot;
								
						stats.etichette[e] = sortObject(stats.etichette[e]);
						let totEt = 0,
							label;
						for(let p in stats.etichette[e]){
							totEt++;
							label = p,
								cls = 'statsBarre';
							if(p==-1){
								label = noRes;
								cls += ' statsVuoto';
							}
							if(!label){
								label = noRes;
								cls += ' statsVuoto';
							}
							let perc = (stats.etichette[e][p].length*100) / totPazienti;
							HTML_provv += 	'		<tr>' +
											'			<td><div>'+label+'</div></td>' +
											'			<td class="'+cls+'">' +
											'				<span style="width:'+perc+'%;"></span>' +
											'			</td>' +
											'			<td class="nPazStats"><b>'+stats.etichette[e][p].length+'</b></td>';
							if(!PAZIENTI.pazientiFiltrati.length)HTML_provv += 
											'			<td><input type="checkbox"' +
											'					   onClick="PAZIENTI.statsFiltra();"' +
											'					   value="'+JSON.stringify(stats.etichette[e][p])+'"' +
											'					   data-et="etichette"' +
											'					   data-cat="'+htmlEntities(e)+'"' +
											'					   data-elem="'+label+'"></td>';
							HTML_provv += 	'		</tr>';
						}
						HTML_provv += 	'		</table>' +
										'	</div>' +
										'</div>';		
						if(totEt>1 || label != noRes)HTML += HTML_provv;
					}
					
					
					// tags
					if(stats.tags && JSON.stringify(stats.tags)!='{}'){
						HTML += '	<div class="rgStats">' +
								'		<div class="etStats">' +
								'			<i>'+htmlEntities(TXT("Tags"))+':</i> ';
						if(!PAZIENTI.pazientiFiltrati.length)HTML +=
								'			<span><input type="checkbox"' +
								'							   onClick="PAZIENTI.statsSelAll(this);"' +
								'							   data-dis="true"></span> ';
						HTML += '		</div>' +
								'		<div>' +
								'			<table>';
						tot = 0;
						for(let p in stats.tags){
							tot += stats.tags[p].length;
						}
						for(let p in stats.tags){
							let label = p,
								cls = 'statsBarre';
							if(!label){
								label = noRes;
								cls += ' statsVuoto';
							}
							let perc = (stats.tags[p].length*100) / totPazienti;
							HTML += 
							'					<tr>' +
							'						<td><div>'+label+'</div></td>' +
							'						<td class="'+cls+'">' +
							'							<span style="width:'+perc+'%;"></span>' +
							'							</td>' +
							'						<td class="nPazStats"><b>'+stats.tags[p].length+'</b></td>';
							if(!PAZIENTI.pazientiFiltrati.length)HTML += 
							'						<td><input type="checkbox"' +
							'								   onClick="PAZIENTI.statsFiltra();"' +
							'								   value="'+JSON.stringify(stats.tags[p])+'"' +
							'								   data-et="tags"' +
							'								   data-cat="'+TXT("Tags")+'"' +
							'								   data-elem="'+label+'"></td>';
							HTML += 
							'					</tr>';
						}
						HTML +=	
							'				</table>' +
							'			</div>' +
							'		</div>';
					}
					
					// medicine
					if(stats.medicine && JSON.stringify(stats.medicine)!='{}'){
						HTML += '	<div class="rgStats">' +
								'		<div class="etStats">' +
								'			<i>'+htmlEntities(TXT("Medicine"))+':</i> ';
						if(!PAZIENTI.pazientiFiltrati.length)HTML +=
								'			<span><input type="checkbox"' +
								'							   onClick="PAZIENTI.statsSelAll(this);"' +
								'							   data-dis="true"></span> ';
						HTML += '		</div>' +
								'		<div>' +
								'			<table>';
						tot = 0;
						for(let p in stats.medicine){
							tot += stats.medicine[p].length;
						}
						for(let p in stats.medicine){
							let label = p,
								cls = 'statsBarre';
							if(!label){
								label = noRes;
								cls += ' statsVuoto';
							}
							let perc = (stats.medicine[p].length*100) / totPazienti;
							HTML += 
							'					<tr>' +
							'						<td><div>'+label+'</div></td>' +
							'						<td class="'+cls+'">' +
							'							<span style="width:'+perc+'%;"></span>' +
							'							</td>' +
							'						<td class="nPazStats"><b>'+stats.medicine[p].length+'</b></td>';
							if(!PAZIENTI.pazientiFiltrati.length)HTML += 
							'						<td><input type="checkbox"' +
							'								   onClick="PAZIENTI.statsFiltra();"' +
							'								   value="'+JSON.stringify(stats.medicine[p])+'"' +
							'								   data-et="medicine"' +
							'								   data-cat="'+TXT("Medicine")+'"' +
							'								   data-elem="'+label+'"></td>';
							HTML += 
							'					</tr>';
						}
						HTML +=	
							'				</table>' +
							'			</div>' +
							'		</div>';
					}
					
					
					// allergie
					if(stats.allergie && JSON.stringify(stats.allergie)!='{}'){
						HTML += '	<div class="rgStats">' +
								'		<div class="etStats">' +
								'			<i>'+htmlEntities(TXT("Allergie"))+':</i> ';
						if(!PAZIENTI.pazientiFiltrati.length)HTML +=
								'			<span><input type="checkbox"' +
								'							   onClick="PAZIENTI.statsSelAll(this);"' +
								'							   data-dis="true"></span> ';
						HTML += '		</div>' +
								'		<div>' +
								'			<table>';
						tot = 0;
						for(let p in stats.allergie){
							tot += stats.allergie[p].length;
						}
						for(let p in stats.allergie){
							let label = p,
								cls = 'statsBarre';
							if(!label){
								label = noRes;
								cls += ' statsVuoto';
							}
							let perc = (stats.allergie[p].length*100) / totPazienti;
							HTML += 
							'					<tr>' +
							'						<td><div>'+label+'</div></td>' +
							'						<td class="'+cls+'">' +
							'							<span style="width:'+perc+'%;"></span>' +
							'							</td>' +
							'						<td class="nPazStats"><b>'+stats.allergie[p].length+'</b></td>';
							if(!PAZIENTI.pazientiFiltrati.length)HTML += 
							'						<td><input type="checkbox"' +
							'								   onClick="PAZIENTI.statsFiltra();"' +
							'								   value="'+JSON.stringify(stats.allergie[p])+'"' +
							'								   data-et="allergie"' +
							'								   data-cat="'+TXT("Allergie")+'"' +
							'								   data-elem="'+label+'"></td>';
							HTML += 
							'					</tr>';
						}
						HTML +=	
							'				</table>' +
							'			</div>' +
							'		</div>';
					}
					
					// patologie
					if(stats.patologie && JSON.stringify(stats.patologie)!='{}'){
						HTML += '	<div class="rgStats">' +
								'		<div class="etStats">' +
								'			<i>'+htmlEntities(TXT("Patologie"))+':</i> ';
						if(!PAZIENTI.pazientiFiltrati.length)HTML +=
								'			<span><input type="checkbox"' +
								'							   onClick="PAZIENTI.statsSelAll(this);"' +
								'							   data-dis="true"></span> ';
						HTML +=	'		</div>' +
								'		<div>' +
								'			<table>';
						tot = 0;
						for(let p in stats.patologie){
							tot += stats.patologie[p].length;
						}
						for(let p in stats.patologie){
							let label = p,
								cls = 'statsBarre';
							if(!label){
								label = noRes;
								cls += ' statsVuoto';
							}
							let perc = (stats.patologie[p].length*100) / totPazienti;
							HTML += 
							'					<tr>' +
							'						<td><div>'+label+'</div></td>' +
							'						<td class="'+cls+'">' +
							'							<span style="width:'+perc+'%;"></span>' +
							'							</td>' +
							'						<td class="nPazStats"><b>'+stats.patologie[p].length+'</b></td>';
							if(!PAZIENTI.pazientiFiltrati.length)HTML += 
							'						<td><input type="checkbox"' +
							'								   onClick="PAZIENTI.statsFiltra();"' +
							'								   value="'+JSON.stringify(stats.patologie[p])+'"' +
							'								   data-et="patologie"' +
							'								   data-cat="'+TXT("Patologie")+'"' +
							'								   data-elem="'+label+'"></td>';
							HTML += 
							'					</tr>';
						}
						HTML +=	
							'				</table>' +
							'			</div>' +
							'		</div>';
					}
					
					// interventi
					if(stats.interventi && JSON.stringify(stats.interventi)!='{}'){
						HTML += '	<div class="rgStats">' +
								'		<div class="etStats">' +
								'			<i>'+htmlEntities(TXT("Interventi"))+':</i> ';
						if(!PAZIENTI.pazientiFiltrati.length)HTML +=
								'			<span><input type="checkbox"' +
								'							   onClick="PAZIENTI.statsSelAll(this);"' +
								'							   data-dis="true"></span> ';
						HTML += '		</div>' +
								'		<div>' +
								'			<table>';
						tot = 0;
						for(let p in stats.interventi){
							tot += stats.interventi[p].length;
						}
						for(let p in stats.interventi){
							let label = p,
								cls = 'statsBarre';
							if(!label){
								label = noRes;
								cls += ' statsVuoto';
							}
							let perc = (stats.interventi[p].length*100) / totPazienti;
							HTML += 
							'					<tr>' +
							'						<td><div>'+label+'</div></td>' +
							'						<td class="'+cls+'">' +
							'							<span style="width:'+perc+'%;"></span>' +
							'							</td>' +
							'						<td class="nPazStats"><b>'+stats.interventi[p].length+'</b></td>';
							if(!PAZIENTI.pazientiFiltrati.length)HTML += 
							'						<td><input type="checkbox"' +
							'								   onClick="PAZIENTI.statsFiltra();"' +
							'								   value="'+JSON.stringify(stats.interventi[p])+'"' +
							'								   data-et="interventi"' +
							'								   data-cat="'+TXT("Interventi")+'"' +
							'								   data-elem="'+label+'"></td>';
							HTML += 
							'					</tr>';
						}
						HTML +=	
							'				</table>' +
							'			</div>' +
							'		</div>';
					}
						
							// sintomi
					if(stats.sintomi && JSON.stringify(stats.sintomi)!='{}'){
						HTML +=	'		<div class="rgStats">' +
								'			<div class="etStats">' +
								'				<i>'+htmlEntities(TXT("Sintomi"))+':</i> ';
						if(!PAZIENTI.pazientiFiltrati.length)HTML +=
								'			<span><input type="checkbox"' +
								'							   onClick="PAZIENTI.statsSelAll(this);"' +
								'							   data-dis="true"></span> ';
						HTML +=	'		</div>' +
								'			<div>' +
								'				<table>';
						tot = 0;
						for(let p in stats.sintomi){
							tot += stats.sintomi[p].length;
						}
						for(let p in stats.sintomi){
							let label = p,
								cls = 'statsBarre';
							if(!label){
								label = noRes;
								cls += ' statsVuoto';
							}
							let perc = (stats.sintomi[p].length*100) / totPazienti;
							HTML += 
							'					<tr>' +
							'						<td><div>'+label+'</div></td>' +
							'						<td class="'+cls+'">' +
							'							<span style="width:'+perc+'%;"></span>' +
							'							</td>' +
							'						<td class="nPazStats"><b>'+stats.sintomi[p].length+'</b></td>';
							if(!PAZIENTI.pazientiFiltrati.length)HTML += 
							'						<td><input type="checkbox"' +
							'								   onClick="PAZIENTI.statsFiltra();"' +
							'								   value="'+JSON.stringify(stats.sintomi[p])+'"' +
							'								   data-et="sintomi"' +
							'								   data-cat="'+TXT("Sintomi")+'"' +
							'								   data-elem="'+label+'"></td>';
							HTML += 
							'					</tr>';	
						}
						HTML +=	
							'				</table>' +
							'			</div>' +
							'		</div>' +
							'	</div>' + 
							'</div>';
					}
				}
				HTML += 
				'	<div id="rgApplicaFiltri"' +
				'		 class="noPrint">' +
				'		<div class="btn_invia"' +
				'			 onClick="PAZIENTI.statsFiltra(true);">' +
							htmlEntities(TXT("ApplicaFiltri")) +
				'		</div>' +
				'	</div>' +
				'	<div id="marketingTools_btns"' +
				'		 class="visSch">' +
				'		<div style="height:30px;"></div>' +
				'		<div style="text-align:right;">' +
				'			<div class="btn_frdx"' +
				'				 onClick="PAZIENTI.car_marketing();">' +
								htmlEntities(TXT("StrumentiMarketing")) +
				'			</div>' +
				'		</div>' +
				'	</div>';
				
				let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.patients.filters\')">' +
									TXT("ReferenceGuide") +
								'</div>';
							
				SCHEDA.caricaScheda(	titolo,
										HTML,
										'PAZIENTI.annullaFiltri();',
										'scheda_stats',
										false,
										true,
										'',
										btnAdd );
				
				document.getElementById("paz_ricerca").value = '';
				PAZIENTI.filtra();
				document.getElementById("scheda_testo").scrollTo(0,0);
			}/* else{
				// se AGGIORNO
				 let elenco = [];
				for(let p in PAZIENTI.parametriFiltri){
					for(let e in PAZIENTI.parametriFiltri[p].elems){
						let pazProvv = [],
							elem = PAZIENTI.parametriFiltri[p].elems[e],
							pazienti = stats[PAZIENTI.parametriFiltri[p].et][elem];
						for(let z in pazienti){
							if(elenco.indexOf(pazienti[z])==-1)elenco.push(pazienti[z]);
							if(pazProvv.indexOf(pazienti[z])==-1)pazProvv.push(pazienti[z]);
						}
						PAZIENTI.parametriFiltri[p].pazienti = pazProvv;
					}
				}
				PAZIENTI.pazientiFiltrati = elenco; 
				for(let p in DB.pazienti.data){
					if(!DB.pazienti.data[p].Cancellato*1){
						document.getElementById("paziente_"+p).classList.add("nasPaz");
					}
				}
				if(elenco.length){
					for(let e in elenco){
						document.getElementById("paziente_"+elenco[e]).classList.remove("nasPaz");
					}
				}
			} */
		}});
	},
	statsFiltra: function( applica = false ){
		let els = document.getElementById("pazienti_stats").getElementsByTagName("input"),
			elenco = [];
		PAZIENTI.parametriFiltri = [];
		let checks = false;
		for(let e in els){
			if(__(els[e].dataset)){
				let dis = __(els[e].dataset.dis);
				if(els[e].checked && dis!='true'){
					checks = true;
					elencoLoc = JSON.parse(els[e].value);
					let presente = -1;
					for(let p in PAZIENTI.parametriFiltri){
						if(PAZIENTI.parametriFiltri[p].cat==els[e].dataset.cat)presente = p;
					}
					if(presente==-1)PAZIENTI.parametriFiltri.push({"cat": els[e].dataset.cat, "et": els[e].dataset.et, "elems": [ els[e].dataset.elem ], "pazienti": elencoLoc });
					else PAZIENTI.parametriFiltri[presente].elems.push(els[e].dataset.elem);
					for(let f in elencoLoc){
						if(elenco.indexOf(elencoLoc[f])==-1)elenco.push(elencoLoc[f])
					}
				}
			}
		}
		if(checks)document.getElementById("rgApplicaFiltri").classList.add("visSch");
		else document.getElementById("rgApplicaFiltri").classList.remove("visSch");
		let cls = "op50";
		if(applica)cls = "nasPaz";
		for(let p in DB.pazienti.data){
			if(!DB.pazienti.data[p].Cancellato*1){
				document.getElementById("paziente_"+p).classList.add(cls);
			}
		}
		if(elenco.length){
			for(let e in elenco){
				document.getElementById("paziente_"+elenco[e]).classList.remove(cls);
			}
			SCHEDA.comprimiElenco();
		}else{
			for(let p in DB.pazienti.data){
				if(!DB.pazienti.data[p].Cancellato*1){
					document.getElementById("paziente_"+p).classList.remove(cls);
				}
			}
			SCHEDA.espandiElenco();
		}
		if(applica){
			SCHEDA.espandiElenco();
			PAZIENTI.pazientiFiltrati = elenco;
			document.getElementById("paz_filtrati").style.display = 'inline-block';
			document.getElementById("scheda_testo").scrollTo(0,0)
			PAZIENTI.car_filtri();
		}
	},
	statsSelAll: function( el ){
		let els = el.parentElement.parentElement.parentElement.getElementsByTagName("table")[0].getElementsByTagName("input"),
			full = el.checked;
		for(let e in els)els[e].checked = full;
		PAZIENTI.statsFiltra();
	},
	annullaFiltri: function(){
		try{
			for(let p in DB.pazienti.data){
				if(!DB.pazienti.data[p].Cancellato*1){
					document.getElementById("paziente_"+p).classList.remove("op50");
				}
			}
		}catch(err){}
	},
	cancellaFiltri: function( noCar=false ){
		PAZIENTI.pazientiFiltrati = [];
		PAZIENTI.parametriFiltri = [];
		document.getElementById("scheda_testo").scrollTo(0,0);
		if(!noCar)PAZIENTI.car_filtri();
		document.getElementById("paz_filtrati").style.display = 'none';
		for(let p in DB.pazienti.data){
			if(!DB.pazienti.data[p].Cancellato*1){
				document.getElementById("paziente_"+p).classList.remove("nasPaz");
				document.getElementById("paziente_"+p).classList.remove("op50");
			}
		}
	},
	
	
	// STRUMENTI di MARKETING
	car_marketing: function(){ // index strumenti di marketing
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
						
			MENU.nasMM();
			let titolo = TXT("StrumentiMarketing"),
				HTML =
			'<div>' +
			'	<h1>'+htmlEntities(titolo)+'</h1>' +
			'	<div style="padding-bottom:20px;">' +
					htmlEntities(TXT("MarketingSpiegazione")) +
			'	</div>' +
			'	<div id="marketingTools_btns"' +
			'		 class="visSch">' +
			'		<div>' +
			'			<div class="btn_invia"' +
			'				 onClick="PAZIENTI.dwnl_emails();">' +
							htmlEntities(TXT("InviaEmailPazienti")) +
			'			</div>' +
			'		</div>' +
			'		<div>' +
			'			<div class="btn_invia btn_dis"' +
			//'				 onClick="PAZIENTI.componiSms();"'+
			'>' +
							htmlEntities(TXT("InviaSmsPazienti")) +
			'			</div>' +
			'		</div>' +
			'		<div style="text-align:right;">' +
			'			<div class="btn_frdx"' +
			'				 onClick="PAZIENTI.car_filtri();">' +
							htmlEntities(TXT("FiltroPazienti")) +
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'</div>';
			
			let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.patients.marketing\')">' +
								TXT("ReferenceGuide") +
							'</div>';
						
			SCHEDA.caricaScheda(	titolo,
									HTML,
									'',
									'scheda_marketing',
									false,
									true,
									'',
									btnAdd );
		}});
	},
	
	dwnl_emails: function(){ // scarica le email dal server
		if(DB.login.data.auths.indexOf("clients_full")==-1 || !LOGIN.logedin()){
			ALERT(TXT("MsgFunzioneSoloPay"));
			return;
		}
		if(!LOGIN.logedin()){
			ALERT(TXT("ErroreUtenteNonConnesso"), true);
			return;
		}
		if(CONN.retNoConn()){
			CONFIRM.vis(	TXT("UscireSenzaSalvare"),
							!SCHEDA.verificaSchedaRet(),
							arguments ).then(function(pass){if(pass){
							let v = getParamNames(CONFIRM.args.callee.toString());
							for(let i in v)eval(getArguments(v,i));
					applicaLoading(document.getElementById("scheda_testo"));
					CONN.caricaUrl(	"marketing_email_elenco.php",
									"b64=1&SL="+globals.siglaLingua.toUpperCase(),
									"PAZIENTI.car_emails");
			}});
		}
	},
	car_emails: function( txt ){ // carica elenco emails
		if(txt == '404'){
			ALERT(TXT("ErroreGenerico"));
		}else{
			let msgs = JSON.parse(txt),
				elencoMsg = msgs.messaggi,
				titolo = TXT("EmailPazienti");
			PAZIENTI.coda = msgs.coda*1;
			PAZIENTI.inviiMensili = msgs.inviiMensili*1;
			elencoMsg.sort(sort_by("DataInvio",true,parseInt));
			let HTML = '<div>' +
			'	<div class="btn_frsx menuMarketing"' +
			'		 onClick="PAZIENTI.car_marketing();">' +
					htmlEntities(TXT("StrumentiMarketing")) +
			'	</div>' +
			'	<h1>' +
					htmlEntities(titolo) +
			'	</h1>' +
			'	<div id="marketingElenchi"' +
			'		 class="divEspansa">' +
			'		<div id="marketingElenchi_btns">' +
			'			<div class="btn_invia"' +
			'				 onClick="PAZIENTI.componiEmail();">' +
							htmlEntities(TXT("Componi").toUpperCase()) +
			'			</div>' +
			'		</div>' +
			'		<div id="marketingElenchi_head">' +
			'			<div>' +
							htmlEntities(TXT("Oggetto")) +
			'			</div>' +
			'			<div>' +
							htmlEntities(TXT("DataInvio")) +
			'			</div>' +
			'		</div>' +
			'		<div id="marketingElenchi_list">';
			if(elencoMsg.length){
				for(let e in elencoMsg){
					let stato = '',
						DataInvio = elencoMsg[e].DataInvio*1;
					if(DataInvio != 9999999999){
						stato = 'inviata';
						DataInvio = getDataTS(DataInvio*1);
					}else DataInvio = '-';
					HTML +=
						'<div onClick="PAZIENTI.dwnl_email(\''+elencoMsg[e].idMessaggio+'\');"' +
						'	 class="email_'+stato+'">' +
						'	<div>' +
								htmlEntities(elencoMsg[e].Oggetto) +
						'	</div>' +
						'	<div>' +
								htmlEntities(DataInvio) +
						'	</div>' +
						'</div>';
				}
			}else{
				HTML +=	'<div class="noResults">' +
							htmlEntities(TXT("NoRes")) +
						'</div>';
			}
			HTML +=	'</div>';
			'	</div>';
			
			let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.services.marketing\')">' +
								TXT("ReferenceGuide") +
							'</div>';
						
			SCHEDA.caricaScheda(	titolo,
									HTML,
									'',
									'scheda_marketing',
									false,
									true,
									'',
									btnAdd );
		}
	},
	dwnl_email: function( idMessaggio ){ // scarica le email dal server
		if(CONN.retNoConn()){
			applicaLoading(document.getElementById("scheda_testo"));
			CONN.caricaUrl(	"marketing_email_leggi.php",
							"b64=1&idMessaggio="+idMessaggio+"&SL="+globals.siglaLingua.toUpperCase(),
							"PAZIENTI.componiEmail");
		}
	},
	componiEmail: function( msg ){ // compone una email
		if(typeof(msg) == 'undefined'){
			msg = {
				idMessaggio: '',
				Oggetto: '',
				Messaggio: '',
				DataInvio: 0
			};
		}else{
			msg = JSON.parse(msg);
			PAZIENTI.coda = msg.coda*1;
			PAZIENTI.inviiMensili = msg.inviiMensili*1;
		}
		if(msg.DataInvio*1 > 0){
			PAZIENTI.vis_email(JSON.stringify(msg));
			return;
		}
		let titolo = TXT("ComponiEmailPazienti"),
			HTML =
		'	<div id="marketingEmail_cnt">' +
		'		<div class="btn_frsx menuMarketing"' +
		'			 onClick="PAZIENTI.dwnl_emails();">' +
					htmlEntities(TXT("EmailPazienti")) +
		'		</div>' +
		'		<h1 id="marketingEmail_tit">' +
					htmlEntities(titolo) +
		'		</h1>' +
		'		<div id="marketingEmail_componi"' +
		'			 class="visSch">' +
		'			<form id="formMod"' +
		'				   name="formMod"' +
		'				   method="post"' +
		'				   onSubmit="return false;">' +
				H.r({	t: "r",
						name: "OggettoMarketing",
						label: TXT("Oggetto"),
						classCampo: 'styled',
						value: msg.Oggetto }) +
				H.r({	t: "t", 
						name: "MessaggioMarketing",
						label: "",
						value: msg.Messaggio}) +
		'				<div id="btnInvioEmail">' +
		'					<div class="submitBtn"' +
		'						 onClick="PAZIENTI.anteprimaEmail();">' +
								htmlEntities(TXT("AnteprimaEmail")) +
		'					</div>' +
		'					<div class="submitBtn"' +
		'						 onClick="PAZIENTI.salvaEmail();">' +
								htmlEntities(TXT("Salva")) +
		'					</div>' +
		'				</div>' +
		'				<input type="hidden" name="idMessaggio" id="idMessaggio" value="'+msg.idMessaggio+'">' +
		'			</div>' +	
		'			<div id="marketingEmail_anteprima">' +	
		'			</div>' +	
		'		</form>' +	
		'	</div>' +	
		'</div>';
		
		let btnAdd =	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.patients.marketing\')">' +
							TXT("ReferenceGuide") +
						'</div>';
		if(msg.idMessaggio) btnAdd += 	'<div class="p_paz_el_menu"' +
									  	' 	onClick="PAZIENTI.eliminaEmail('+msg.idMessaggio+');">' +
											htmlEntities(TXT("Elimina")) +
										'</div>';
										
		SCHEDA.caricaScheda(	titolo,
								HTML,
								'',
								'scheda_marketing',
								false,
								true,
								'',
								btnAdd );
		initChangeDetection( "formMod" );
		if(mouseDetect)document.formMod.OggettoMarketing.focus();
	},
	anteprimaEmail: function(){ // visualizza l'anteprima della mail
		if(!document.formMod.OggettoMarketing.value.trim() || !document.formMod.MessaggioMarketing.value.trim()){
			ALERT(TXT("MsgComponiEmail"));
			return;
		}
		let HTML = '',
			nEmail = PAZIENTI.get_nEmail(true), // numero delle mail nei pazientifiltrati
			nPaz = PAZIENTI.get_nEmail(); // numero delle mail nei pazientifiltrati
		HTML += '<div>' +
				'	<div id="anteprimaOggetto">' +
						'<i>'+htmlEntities(TXT("Oggetto"))+'</i>: <b>'+htmlEntities(document.formMod.OggettoMarketing.value)+'</b>' +
				'	</div>' +
				'	<div id="anteprimaCorpo"' +
				'		 class="divEspansa">' +
						htmlEntities(document.formMod.MessaggioMarketing.value).replace(/\n/g, "<br>").replace(/\s/g," ") +
				'		<div id="anteprimaPiede">' +
				'			<div style="background-image:url(\'' + CONN.FILESfolder+DB.login.data.idUtente+'/__avatar.jpg\');">' +
				'			</div>' +
				'			<i>'+htmlEntities(DB.login.data.Nominativo)+'</i><br>' +
							htmlEntities(DB.login.data.Email) +
				'		</div>' +
				'	</div>' +
				'	<div id="marketingEmail_dests">' +
				'		<i class="vis">'+htmlEntities(TXT("Destinatari"))+'</i>: ' +
				'		<select id="tipoLista"' +
				'				onChange="PAZIENTI.calcCoda();PAZIENTI.verTotDest();">' +
				'			<option value="tutti">' +
								htmlEntities(TXT("DestinatariTutti"))+' ('+nPaz+')' +
							'</option>' +
				'			<option value="filtrati"'+(nEmail ? '' : ' disabled')+'>'+
								htmlEntities(TXT("DestinatariFiltrati"))+' ('+nEmail+')' +
							'</option>' +
				'		</select>' +
				'	</div>' +
				'	<div id="alertCoda">' +
				'	</div>' +
				'	<div id="anteprimaBtns">' +
				'		<div class="submitBtn annullaBtn"' +
				'			 onClick="PAZIENTI.tornaEmail();">' +
							htmlEntities(TXT("Annulla")).toUpperCase() +
				'		</div>' +
				'		<div class="submitBtn"' +
				'			 id="anteprimaInvia"' +
				'			 onClick="PAZIENTI.inviaEmail();">' +
							htmlEntities(TXT("Invia")).toUpperCase() +
				'		</div>' +
				'		<div class="submitBtn"' +
				'			 onClick="PAZIENTI.salvaEmail();">' +
							htmlEntities(TXT("Salva")).toUpperCase() +
				'		</div>' +
				'	</div>' +
				'</div>';
		document.getElementById("marketingEmail_anteprima").innerHTML = HTML;
		document.getElementById("marketingEmail_anteprima").classList.add("visSch");
		document.getElementById("marketingEmail_componi").classList.remove("visSch");
		document.getElementById("scheda").classList.remove("schForm");
		document.getElementById("marketingEmail_tit").innerHTML = htmlEntities(TXT("AnteprimaEmailPazienti"));
		PAZIENTI.calcCoda();
		PAZIENTI.verTotDest();
	},
	calcCoda: function(){
		/*let nEmail = PAZIENTI.get_nEmail(true), // numero delle mail nei pazientifiltrati
			nPaz = PAZIENTI.get_nEmail(), // numero delle mail in tutti i pazienti
			nAdd = 0,
			inviiCoda = PAZIENTI.coda,
			inviiMensili = PAZIENTI.inviiMensili;
		if(document.getElementById("tipoLista").value == 'filtrati')nAdd = nEmail;
		else nAdd = nPaz;
		let partiCoda = (PAZIENTI.coda + nAdd) / 20,
			timeCoda = (partiCoda * 120), // moltiplico per i secondi di una parte (120)
			txtAttenzione = '';
		if(timeCoda > (3600 * 24)){
			// attesa magggiore di 1 giorno
			txtAttenzione = TXT("AlertCodaGiorno");
		}else if(timeCoda > 7200){
			// attesa maggiore di x ore
			let x = parseInt(timeCoda/3600);
			txtAttenzione = TXT("AlertCodaOre").replace(/\[n\]/g,x);
		}else if(timeCoda > 3600){
			// attesa maggiore di 1 ora
			txtAttenzione = TXT("AlertCodaOra");
		}else if(timeCoda > 1200){
			// attesa maggiore di 20 minuti
			txtAttenzione = TXT("AlertCoda20min");
		}
		if(txtAttenzione)document.getElementById("alertCoda").style.display = 'block';
		else document.getElementById("alertCoda").style.display = 'none';
		document.getElementById("alertCoda").innerHTML = txtAttenzione;*/
	},
	verTotDest: function(){
		let nEmail = PAZIENTI.get_nEmail(true), // numero delle mail nei pazientifiltrati
			nPaz = PAZIENTI.get_nEmail(), // numero delle mail in tutti i pazienti
			n = 0,
			txtAttenzione = '',
			disattivaInvio = false;
		if(document.getElementById("tipoLista").value == 'filtrati')n = nEmail;
		else n = nPaz;
		if(n > PAZIENTI.maxInvii){
			disattivaInvio = true;
			txtAttenzione = TXT("AlertMaxMsgVolta").replace(/\[n\]/g,PAZIENTI.maxInvii);
		}
		if(PAZIENTI.inviiMensili > PAZIENTI.maxInviiMese){
			disattivaInvio = true;
			txtAttenzione = TXT("AlertMaxMsgMese").replace(/\[n\]/g,PAZIENTI.maxInviiMese);
		}
		if(disattivaInvio)document.getElementById("anteprimaInvia").classList.add('btn_dis');
		else document.getElementById("anteprimaInvia").classList.remove('btn_dis');
		if(txtAttenzione)document.getElementById("alertCoda").style.display = 'block';
		else document.getElementById("alertCoda").style.display = 'none';
		document.getElementById("alertCoda").innerHTML = txtAttenzione;
	},
	vis_email: function( msg ){ // carica elenco emails
		msg = JSON.parse(msg),
			titolo = TXT("EmailPazienti"),
			HTML = 
		'<div>' +
		'	<div class="btn_frsx menuMarketing"' +
		'		 onClick="PAZIENTI.dwnl_emails();">' +
				htmlEntities(TXT("EmailPazienti")) +
		'	</div>' +
		'	<h1>' +
				htmlEntities(msg.Oggetto) +
		'	</h1>' +
		'	<div id="anteprimaCorpo"' +
		'		 class="divEspansa">' +
				htmlEntities(msg.Messaggio).replace(/\n/g, "<br>").replace(/\s/g,"&nbsp;") +
		'		<div id="anteprimaPiede">' +
		'			<div style="background-image:url(\'' + CONN.FILESfolder+DB.login.data.idUtente+'/__avatar.jpg\');">' +
		'			</div>' +
		'			<i>'+htmlEntities(DB.login.data.Nominativo)+'</i><br>' +
					htmlEntities(DB.login.data.Email) +
		'		</div>' +
		'	</div>' +
		'	<div id="destinatari"' +
		'		 class="divEspansa">' +
		'		<i>'+htmlEntities(TXT("DataInvio"))+':</i> '+getFullDataTS(msg.DataInvio*1)+" ("+getOraTS(msg.DataInvio*1)+")" +
		'		</div>' +
		'	</div>' +
		
		
		// destinatari
		'	<div id="marketing_cont_destinarai"' +
		'		  class="sezioneTrattamenti divEspansa sezioneChiusa">' +
		'		<em class="labelMobile labelTrattamenti"' +
		'			style="line-height: 24px;"' +
		'			onClick="parentElement.classList.toggle(\'sezioneChiusa\');">' +
		'			<img class="icoLabel"' +
		'			     src="img/ico_communityN.png">' +
					TXT("Destinatari")+' ('+msg.lista.length+')' +
		'		</em>' +
		'		<div id="contDests">';
		for(let d in msg.lista){
			HTML += msg.lista[d].Nominativo+" - "+ msg.lista[d].Email + "<br>";
		}
		HTML +=
		'		</div>' +
		'	</div>' +
		'	<div class="link_del"' +
		'		 style="margin-top:10px;"' +
		'		 onClick="PAZIENTI.eliminaEmail('+msg.idMessaggio+');">' +
				htmlEntities(TXT("Elimina")) +
		'	</div>' +
		'</div>';
		
		let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.patients.marketing\')">' +
							TXT("ReferenceGuide") +
						'</div>';
		
		SCHEDA.caricaScheda(	titolo,
								HTML,
								'',
								'scheda_marketing',
								false,
								true,
								'',
								btnAdd );
	},
	get_nEmail: function( lista='' ){
		let nEmail = 0;
		if(lista){
			for(let e in PAZIENTI.pazientiFiltrati){
				let PZ = DB.pazienti.data[PAZIENTI.pazientiFiltrati[e]];
				if(PZ.Email.trim())nEmail++;
			}
		}else{
			for(let p in DB.pazienti.data){
				if(DB.pazienti.data[p].Email.trim())nEmail++;
			}
		}
		return nEmail;
	},
	tornaEmail: function(){ // torna a comporre la mail
		document.getElementById("marketingEmail_anteprima").innerHTML = '';
		document.getElementById("marketingEmail_anteprima").classList.remove("visSch");
		document.getElementById("marketingEmail_componi").classList.add("visSch");
		document.getElementById("scheda").classList.add("schForm");
		document.getElementById("marketingEmail_tit").innerHTML = htmlEntities(TXT("ComponiEmailPazienti"));
	},
	salvaEmail: function(){ // invia la mail
		if(CONN.retNoConn()){
			if(!document.formMod.OggettoMarketing.value.trim() || !document.formMod.MessaggioMarketing.value.trim()){
				ALERT(TXT("MsgComponiEmail"));
				return;
			}
			stopAnimate(true);
			visLoader(TXT("SalvataggioInCorso"),'loadingLight');
			let JSNPOST = {
				idMessaggio: document.formMod.idMessaggio.value,
				Oggetto: document.formMod.OggettoMarketing.value,
				Messaggio: document.formMod.MessaggioMarketing.value
			}
			
			CONN.caricaUrl(	"marketing_email_salva.php",
							"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
							function(txt){
								startAnimate();
								nasLoader();
								SCHEDA.formModificato = false;
								endChangeDetection();
								if(txt.substr(0,3)!='404')PAZIENTI.dwnl_emails();
								else ALERT(TXT("EmailErroreS"));
							} );
		}
	},
	inviaEmail: function(){ // invia la mail
		if(document.getElementById("anteprimaInvia").classList.contains('btn_dis'))return;
		if(CONN.retNoConn()){
			CONFIRM.vis( TXT("ChiediInvioEmail") ).then(function(pass){if(pass){
				stopAnimate(true);
				visLoader(TXT("SalvataggioInCorso"),'loadingLight');
				let lista = [];
				if(document.getElementById("tipoLista").value=='filtrati'){
					for(let e in PAZIENTI.pazientiFiltrati){
						let PZ = DB.pazienti.data[PAZIENTI.pazientiFiltrati[e]];
						if(PZ.Email.trim()){
							lista.push({
									Nominativo:  PZ.Nome+" "+PZ.Cognome,
									Email:  PZ.Email
								});
						}
					}
				}else{
					for(let p in DB.pazienti.data){
						let PZ = DB.pazienti.data[p];
						if(PZ.Email.trim() && !PZ.Cancellato*1){
							lista.push({
									Nominativo:  PZ.Nome+" "+PZ.Cognome,
									Email:  PZ.Email
								});
						}
					}
				}
				let JSNPOST = {
						lista: lista,
						idMessaggio: document.formMod.idMessaggio.value,
						Oggetto: document.formMod.OggettoMarketing.value,
						Messaggio: document.formMod.MessaggioMarketing.value
					}
					
				CONN.caricaUrl(	"marketing_email_invia.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								function(txt){
									startAnimate();
									nasLoader();
									SCHEDA.formModificato = false;
									endChangeDetection();
									if(txt.substr(0,3)!='404'){
										ALERT(TXT("EmailInviata"));
										PAZIENTI.dwnl_emails();
									}else ALERT(TXT("EmailErrore"));
								} );
			}});
		}
	},
	eliminaEmail: function( idMessaggio ){ // invia la mail
		if(CONN.retNoConn()){
			CONFIRM.vis( TXT("ChiediEliminaEmail") ).then(function(pass){if(pass){
				stopAnimate(true);
				visLoader(TXT("SalvataggioInCorso"),'loadingLight');
				CONN.caricaUrl(	"marketing_email_elimina.php",
								"b64=1&idMessaggio="+idMessaggio,
								function(txt){
									startAnimate();
									nasLoader();
									SCHEDA.formModificato = false;
									endChangeDetection();
									if(txt.substr(0,3)!='404'){
										PAZIENTI.dwnl_emails();
										//ALERT(TXT("EmailEliminata"));
									}else ALERT(TXT("EmailErrore"));
								} );
			}});
		}
	}
}