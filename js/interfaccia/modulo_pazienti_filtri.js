
var PAZIENTI_FILTRI = {
	maxInvii: 100,
	maxInviiMese: 1000,
	coda: 0,
	inviiMensili: 0,
	parametriFiltri:[],
	
	// FILTRI E STATISTICHE
	car_filtri: function(){
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
						
			if(typeof(salvato) == 'undefined')var salvato = false;
			endChangeDetection( "formMod" );
			SCHEDA.formModificato = false;
			
			MENU.nasMM();
			
			// COMPONGO GLI ELENCHI
			var PZ = [];
			for(p in DB.pazienti.data){
				var P = clone(DB.pazienti.data[p]);
				if(	PAZIENTI.pazientiFiltrati.length && 
					PAZIENTI.pazientiFiltrati.indexOf(p*1)==-1 )P.Cancellato = 1;
				PZ.push(P);
			}
			
			var totPazienti = 0;
			var etichette = H.getEtichette('',[ DB.pazienti.data ]);
			var tags = PAZIENTI.getTags();
			var medicine = PAZIENTI.getElementi('medicine');
			var allergie = PAZIENTI.getElementi('allergie');
			var patologie = PAZIENTI.getElementi('patologie');
			var interventi = PAZIENTI.getElementi('interventi');
			var stats = {
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
			for(s in sessi){
				if(!stats.generi[s])stats.generi[s] = [];
				for(p in PZ){
					if(PZ[p].sesso == s && !PZ[p].Cancellato*1){
						if(stats.generi[s].indexOf(p*1)==-1)stats.generi[s].push(p*1);
					}
				}
			}
			// fasce di età
			var annoAttuale=new Date().getFullYear();
			for(p in PZ){
				if(!PZ[p].Cancellato*1){
					var decina = -1;
					if(PZ[p].DataNascita!='0000-00-00'){
						var AnnoNascita = PZ[p].DataNascita.split("-")[0]*1;
						var etaPaziente = (annoAttuale - AnnoNascita)+"";
						if(etaPaziente.length==1)decina="0";
						else decina=etaPaziente.substr(0,1);
					}
					if(!stats.fasce_eta[decina])stats.fasce_eta[decina] = [];
					if(stats.fasce_eta[decina].indexOf(p*1)==-1)stats.fasce_eta[decina].push(p*1);
				}
			}
			// professioni | province | socials
			for(p in PZ){
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
				var vuote = stats.provenienze[""];
				delete stats.provenienze[""];
				stats.provenienze[""] = vuote;
			}
			if(stats.professioni[""]){
				var vuote = stats.professioni[""];
				delete stats.professioni[""];
				stats.professioni[""] = vuote;
			}
			if(stats.province[""]){
				var vuote = stats.province[""];
				delete stats.province[""];
				stats.province[""] = vuote;
			}
			if(stats.socials[""]){
				var vuote = stats.socials[""];
				delete stats.socials[""];
				stats.socials[""] = vuote;
			}
			// etichette
			for(e in etichette){
				if(etichette[e]){
					if(!stats.etichette[etichette[e]])stats.etichette[etichette[e]] = {};
					for(p in PZ){
						if(!PZ[p].Cancellato*1){
							var et = __(PZ[p].etichette,[]);
							//if(typeof(et)=='string')et=JSON.parse(et)
							var pass = false;
							for(f in et){
								var etichetta = et[f].NomeEtichetta;
								var valore = et[f].ValoreEtichetta;
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
			for(p in PZ){
				if(!PZ[p].Cancellato*1){
					var tg = __(PZ[p].tags,[]);
					//if(typeof(tg)=='string')tg=JSON.parse(tg)
					for(t in tg){
						var tag = tg[t].NomeTag;
						if(!stats.tags[tag])stats.tags[tag] = [];
						if(stats.tags[tag].indexOf(p*1)==-1)stats.tags[tag].push(p*1);
					}
				}
			}
			
			// medicine
			for(p in PZ){
				if(!PZ[p].Cancellato*1){
					var md = __(PZ[p].medicine,[]);
					//if(typeof(md)=='string')md=JSON.parse(md)
					for(m in md){
						var medicina = md[m].NomeMedicina;
						if(!stats.medicine[medicina])stats.medicine[medicina] = [];
						if(stats.medicine[medicina].indexOf(p*1)==-1)stats.medicine[medicina].push(p*1);
					}
				}
			}
			
			// allergie
			for(p in PZ){
				if(!PZ[p].Cancellato*1){
					var al = __(PZ[p].allergie,[]);
					//if(typeof(al)=='string')al=JSON.parse(al)
					for(a in al){
						var allergia = al[a].NomeAllergia;
						if(!stats.allergie[allergia])stats.allergie[allergia] = [];
						if(stats.allergie[allergia].indexOf(p*1)==-1)stats.allergie[allergia].push(p*1);
					}
				}
			}
			
			// patologie
			for(p in PZ){
				if(!PZ[p].Cancellato*1){
					var pt = __(PZ[p].patologie,[]);
					//if(typeof(pt)=='string')pt=JSON.parse(pt)
					for(t in pt){
						var patologia = pt[t].NomePatologia;
						if(!stats.patologie[patologia])stats.patologie[patologia] = [];
						if(stats.patologie[patologia].indexOf(p*1)==-1)stats.patologie[patologia].push(p*1);
					}
				}
			}
			
			// interventi
			for(p in PZ){
				if(!PZ[p].Cancellato*1){
					var int = __(PZ[p].interventi,[]);
					//if(typeof(int)=='string')int=JSON.parse(int)
					for(i in int){
						var intervento = int[i].NomeIntervento;
						if(!stats.interventi[intervento])stats.interventi[intervento] = [];
						if(stats.interventi[intervento].indexOf(p*1)==-1)stats.interventi[intervento].push(p*1);
					}
				}
			}
			
			// sintomi
			for(p in PZ){
				if(!PZ[p].Cancellato*1){
					for(t in PZ[p].trattamenti){
						var TR = PZ[p].trattamenti[t];
						if(!TR.Cancellato*1){
							var si = TR.sintomi;
							if(!si)si = '[]';
							si = JSON.parse(si);
							for(s in si){
								var sintomo = si[s].NomeSintomo;
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
			console.log(stats)
			var titolo = stripslashes(Lingua(TXT_FiltroPazienti));	
			var HTML = '';
			var noRes = '...';
			HTML += '<div id="pazienti_stats">' +
					'	<h1>'+htmlEntities(titolo)+'</h1>';	
			
			if(!totPazienti){
				HTML += '<div class="noResults">'+htmlEntities(Lingua(TXT_NoResPaziente))+'</div>';
			}else{
				
				HTML += 
					'<div id="toolsStats"' +
						  (PAZIENTI.pazientiFiltrati.length ? '' : ' style="display:none;"') +
					'>' +
					'	<div>' +
							/*htmlEntities(Lingua(TXT_PazientiFiltrati)) +*/
					'		<div class="btn_invia" onClick="this.blur();PAZIENTI.cancellaFiltri();">' +
								htmlEntities(Lingua(TXT_AnnullaFiltri)) +
					'		</div>' +
					'		<div class="btn_frdx"' +
					'			 style="float:right;"' +
					'			 onClick="PAZIENTI.car_marketing();">' +
								htmlEntities(Lingua(TXT_StrumentiMarketing)) +
					'		</div>' +
					'	</div>' +	
					'	<div id="parametri_filtri">' +
					'<h2>'+htmlEntities(Lingua(TXT_FiltriApplicati))+'</h2>';
				var htmlParametri = '';
				if(PAZIENTI.parametriFiltri.length){	
					for(p in PAZIENTI.parametriFiltri){
						htmlParametri += '<p><i>'+PAZIENTI.parametriFiltri[p].cat+':</i><span>';
						for(e in PAZIENTI.parametriFiltri[p].elems){
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
						'	<p>'+htmlEntities(Lingua(TXT_TotalePazienti))+': <b>'+totPazienti+'</b></p>' +
						'	<div class="rgStats">' +
						'		<div class="etStats">' +
						'			<i>'+htmlEntities(Lingua(TXT_FasceEta))+':</i> ';
				if(!PAZIENTI.pazientiFiltrati.length)HTML +=
						'			<span><input type="checkbox"' +
						'							   onClick="PAZIENTI.statsSelAll(this);"' +
						'							   data-dis="true"></span> ';
				HTML +=	'		</div>' +
						'		<div>' +
						'			<table>';
				var tot = 0;
				for(f in stats.fasce_eta){
					tot += stats.fasce_eta[f].length;
				}
				
				for(f in stats.fasce_eta){
					var label = (f*10)+'-'+((f*1+1)*10-1);
					var cls = 'statsBarre';
					if(f==-1){
						label = noRes;
						cls += ' statsVuoto';
					}
					if(!label){
						label = noRes;
						cls += ' statsVuoto';
					}
					var perc = (stats.fasce_eta[f].length*100) / totPazienti;
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
							'					   data-cat="'+Lingua(TXT_FasceEta)+'"' +
							'					   data-elem="'+label+'"></td>';
					HTML += '		</tr>';
				}
				HTML += '		</table>' +
						'	</div>' +
						'</div>' +
				
						// generi
						'<div class="rgStats">' +
						'	<div class="etStats">' +
						'		<i>'+htmlEntities(Lingua(TXT_Generi))+':</i> ';
				if(!PAZIENTI.pazientiFiltrati.length)HTML +=
						'			<span><input type="checkbox"' +
						'							   onClick="PAZIENTI.statsSelAll(this);"' +
						'							   data-dis="true"></span> ';
				HTML +=	'	</div>' +
						'	<div>' +
						'		<table>';
				var tot = 0;
				for(g in stats.generi){
					tot += stats.generi[g].length;
				}
				for(g in stats.generi){
					var label = sessi[g];
					var cls = 'statsBarre';
					if(!label){
						label = noRes;
						cls += ' statsVuoto';
					}
					var perc = (stats.generi[g].length*100) / tot;
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
							'					   data-cat="'+Lingua(TXT_Generi)+'"' +
							'					   data-elem="'+label+'"></td>';
					HTML += '		</tr>';
				}
				HTML += '		</table>' +
						'	</div>' +
						'</div>' +
				
						// professioni
						'<div class="rgStats">' +
						'	<div class="etStats">' +
						'		<i>'+htmlEntities(Lingua(TXT_Professioni))+':</i> ';
				if(!PAZIENTI.pazientiFiltrati.length)HTML +=
						'			<span><input type="checkbox"' +
						'							   onClick="PAZIENTI.statsSelAll(this);"' +
						'							   data-dis="true"></span> ';
				HTML +=	'	</div>' +
						'	<div>' +
						'		<table>';
				
				var tot = 0;
				for(p in stats.professioni){
					tot += stats.professioni[p].length;
				}
				for(p in stats.professioni){
					var label = p;
					var cls = 'statsBarre';
					if(!label){
						label = noRes;
						cls += ' statsVuoto';
					}
					var perc = (stats.professioni[p].length*100) / tot;
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
							'					   data-cat="'+Lingua(TXT_Professioni)+'"' +
							'					   data-elem="'+label+'"></td>';
					HTML += '		</tr>';
				}
				HTML += '		</table>' +
						'	</div>' +
						'</div>' +
				
						// provenienze
						'<div class="rgStats">' +
						'	<div class="etStats">' +
						'		<i>'+htmlEntities(Lingua(TXT_Provenienze))+':</i> ';
				if(!PAZIENTI.pazientiFiltrati.length)HTML +=
						'			<span><input type="checkbox"' +
						'							   onClick="PAZIENTI.statsSelAll(this);"' +
						'							   data-dis="true"></span> ';
				HTML +=	'	</div>' +
						'	<div>' +
						'		<table>';
				
				var tot = 0;
				for(p in stats.provenienze){
					tot += stats.provenienze[p].length;
				}
				for(p in stats.provenienze){
					var label = p;
					var cls = 'statsBarre';
					if(!label){
						label = noRes;
						cls += ' statsVuoto';
					}
					var perc = (stats.provenienze[p].length*100) / tot;
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
							'					   data-cat="'+Lingua(TXT_Provenienze)+'"' +
							'					   data-elem="'+label+'"></td>';
					HTML += '		</tr>';
				}
				HTML += '		</table>' +
						'	</div>' +
						'</div>' +
				
						// province
						'<div class="rgStats">' +
						'	<div class="etStats">' +
						'		<i>'+htmlEntities(Lingua(TXT_Province))+':</i> ';
				if(!PAZIENTI.pazientiFiltrati.length)HTML +=
						'			<span><input type="checkbox"' +
						'							   onClick="PAZIENTI.statsSelAll(this);"' +
						'							   data-dis="true"></span> ';
				HTML +=	'	</div>' +
						'	<div>' +
						'		<table>';
				var tot = 0;
				for(p in stats.province){
					tot += stats.province[p].length;
				}
				for(p in stats.province){
					var label = p;
					var cls = 'statsBarre';
					if(!label){
						label = noRes;
						cls += ' statsVuoto';
					}
					var perc = (stats.province[p].length*100) / tot;
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
							'					   data-cat="'+Lingua(TXT_Province)+'"' +
							'					   data-elem="'+label+'"></td>';
					HTML +=	'		</tr>';
				}
				HTML += '		</table>' +
						'	</div>' +
						'</div>' +
				
						// socials
						'<div class="rgStats">' +
						'	<div class="etStats">' +
						'		<i>'+htmlEntities(Lingua(TXT_Social))+':</i> ';
				if(!PAZIENTI.pazientiFiltrati.length)HTML +=
						'			<span><input type="checkbox"' +
						'							   onClick="PAZIENTI.statsSelAll(this);"' +
						'							   data-dis="true"></span> ';
				HTML += '	</div>' +
						'	<div>' +
						'		<table>';
						
						
				var tot = 0;
				for(p in stats.socials){
					tot += stats.socials[p].length;
				}
				for(p in stats.socials){
					var label = p;
					var cls = 'statsBarre';
					if(!label){
						label = noRes;
						cls += ' statsVuoto';
					}
					var perc = (stats.socials[p].length*100) / tot;
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
							'					   data-cat="'+Lingua(TXT_Social)+'"' +
							'					   data-elem="'+label+'"></td>';
					HTML += '		</tr>';
				}
				HTML += '		</table>' +
						'	</div>' +
						'</div>';
				
				for(e in stats.etichette){
					var HTML_provv = '';
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
					var tot = 0;
					for(p in stats.etichette[e]){
						tot += stats.etichette[e][p].length;
					}
					//stats.etichette[e][""] = totPazienti - tot;
							
					stats.etichette[e] = sortObject(stats.etichette[e]);
					var totEt = 0;
					for(p in stats.etichette[e]){
						totEt++;
						var label = p;
						var cls = 'statsBarre';
						if(p==-1){
							label = noRes;
							cls += ' statsVuoto';
						}
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						var perc = (stats.etichette[e][p].length*100) / totPazienti;
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
							'			<i>'+htmlEntities(Lingua(TXT_Tags))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML += '		</div>' +
							'		<div>' +
							'			<table>';
					var tot = 0;
					for(p in stats.tags){
						tot += stats.tags[p].length;
					}
					for(p in stats.tags){
						var label = p;
						var cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						var perc = (stats.tags[p].length*100) / totPazienti;
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
						'								   data-cat="'+Lingua(TXT_Tags)+'"' +
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
							'			<i>'+htmlEntities(Lingua(TXT_Medicine))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML += '		</div>' +
							'		<div>' +
							'			<table>';
					var tot = 0;
					for(p in stats.medicine){
						tot += stats.medicine[p].length;
					}
					for(p in stats.medicine){
						var label = p;
						var cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						var perc = (stats.medicine[p].length*100) / totPazienti;
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
						'								   data-cat="'+Lingua(TXT_Medicine)+'"' +
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
							'			<i>'+htmlEntities(Lingua(TXT_Allergie))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML += '		</div>' +
							'		<div>' +
							'			<table>';
					var tot = 0;
					for(p in stats.allergie){
						tot += stats.allergie[p].length;
					}
					for(p in stats.allergie){
						var label = p;
						var cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						var perc = (stats.allergie[p].length*100) / totPazienti;
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
						'								   data-cat="'+Lingua(TXT_Allergie)+'"' +
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
							'			<i>'+htmlEntities(Lingua(TXT_Patologie))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML +=	'		</div>' +
							'		<div>' +
							'			<table>';
					var tot = 0;
					for(p in stats.patologie){
						tot += stats.patologie[p].length;
					}
					for(p in stats.patologie){
						var label = p;
						var cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						var perc = (stats.patologie[p].length*100) / totPazienti;
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
						'								   data-cat="'+Lingua(TXT_Patologie)+'"' +
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
							'			<i>'+htmlEntities(Lingua(TXT_Interventi))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML += '		</div>' +
							'		<div>' +
							'			<table>';
					var tot = 0;
					for(p in stats.interventi){
						tot += stats.interventi[p].length;
					}
					for(p in stats.interventi){
						var label = p;
						var cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						var perc = (stats.interventi[p].length*100) / totPazienti;
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
						'								   data-cat="'+Lingua(TXT_Interventi)+'"' +
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
							'				<i>'+htmlEntities(Lingua(TXT_Sintomi))+':</i> ';
					if(!PAZIENTI.pazientiFiltrati.length)HTML +=
							'			<span><input type="checkbox"' +
							'							   onClick="PAZIENTI.statsSelAll(this);"' +
							'							   data-dis="true"></span> ';
					HTML +=	'		</div>' +
							'			<div>' +
							'				<table>';
					var tot = 0;
					for(p in stats.sintomi){
						tot += stats.sintomi[p].length;
					}
					for(p in stats.sintomi){
						var label = p;
						var cls = 'statsBarre';
						if(!label){
							label = noRes;
							cls += ' statsVuoto';
						}
						var perc = (stats.sintomi[p].length*100) / totPazienti;
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
						'								   data-cat="'+Lingua(TXT_Sintomi)+'"' +
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
			'		 class="formBtn noPrint">' +
			'		<div class="btn_invia"' +
			'			 onClick="PAZIENTI.statsFiltra(true);">' +
						htmlEntities(Lingua(TXT_ApplicaFiltri)) +
			'		</div>' +
			'	</div>' +
			'	<div id="marketingTools_btns"' +
			'		 class="visSch">' +
			'		<div style="height:30px;"></div>' +
			'		<div style="text-align:right;">' +
			'			<div class="btn_frdx"' +
			'				 onClick="PAZIENTI.car_marketing();">' +
							htmlEntities(Lingua(TXT_StrumentiMarketing)) +
			'			</div>' +
			'		</div>' +
			'	</div>';
				
			SCHEDA.caricaScheda(	titolo,
									HTML,
									'PAZIENTI.annullaFiltri();',
									'scheda_stats',
									false,
									true );
			
			document.getElementById("paz_ricerca").value = '';
			PAZIENTI.filtra();
			document.getElementById("scheda_testo").scrollTo(0,0)		
		}});
	},
	statsFiltra: function( applica ){
		if(typeof(applica) == 'undefined')var applica = false;
		var els = document.getElementById("pazienti_stats").getElementsByTagName("input");
		var elenco = [];
		PAZIENTI.parametriFiltri = [];
		var checks = false;
		for(e in els){
			if(__(els[e].dataset)){
				var dis = __(els[e].dataset.dis);
				if(els[e].checked && dis!='true'){
					checks = true;
					elencoLoc = JSON.parse(els[e].value);
					var presente = -1;
					for(p in PAZIENTI.parametriFiltri){
						if(PAZIENTI.parametriFiltri[p].cat==els[e].dataset.cat)presente = p;
					}
					if(presente==-1)PAZIENTI.parametriFiltri.push({"cat": els[e].dataset.cat, "elems": [ els[e].dataset.elem ] });
					else PAZIENTI.parametriFiltri[p].elems.push(els[e].dataset.elem);
					for(f in elencoLoc){
						if(elenco.indexOf(elencoLoc[f])==-1)elenco.push(elencoLoc[f])
					}
				}
			}
		}
		if(checks)document.getElementById("rgApplicaFiltri").classList.add("visSch");
		else document.getElementById("rgApplicaFiltri").classList.remove("visSch");
		var cls = "op50";
		if(applica)cls = "nasPaz";
		
		for(p in DB.pazienti.data){
			if(!DB.pazienti.data[p].Cancellato*1){
				document.getElementById("paziente_"+p).classList.add(cls);
			}
		}
		if(elenco.length){
			for(e in elenco){
				document.getElementById("paziente_"+elenco[e]).classList.remove(cls);
			}
			SCHEDA.comprimiElenco();
		}else{
			for(p in DB.pazienti.data){
				if(!DB.pazienti.data[p].Cancellato*1){
					document.getElementById("paziente_"+p).classList.remove(cls);
				}
			}
			SCHEDA.espandiElenco();
		}
		if(applica){
			SCHEDA.espandiElenco();
			PAZIENTI.pazientiFiltrati = elenco;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){
				// salvo il DB
			});
			document.getElementById("paz_filtrati").style.display = 'inline-block';
			document.getElementById("scheda_testo").scrollTo(0,0)
			PAZIENTI.car_filtri();
		}
	},
	statsSelAll: function( el ){
		var els = el.parentElement.parentElement.parentElement.getElementsByTagName("table")[0].getElementsByTagName("input");
		var full = el.checked;
		for(e in els)els[e].checked = full;
		PAZIENTI.statsFiltra();
	},
	annullaFiltri: function(){
		try{
			for(p in DB.pazienti.data){
				if(!DB.pazienti.data[p].Cancellato*1){
					document.getElementById("paziente_"+p).classList.remove("op50");
				}
			}
		}catch(err){}
	},
	cancellaFiltri: function(){
		PAZIENTI.pazientiFiltrati = [];
		PAZIENTI.parametriFiltri = [];
		document.getElementById("scheda_testo").scrollTo(0,0);
		PAZIENTI.car_filtri();
		document.getElementById("paz_filtrati").style.display = 'none';
		for(p in DB.pazienti.data){
			if(!DB.pazienti.data[p].Cancellato*1){
				document.getElementById("paziente_"+p).classList.remove("nasPaz");
				document.getElementById("paziente_"+p).classList.remove("op50");
			}
		}
	},
	
	
	// STRUMENTI di MARKETING
	car_marketing: function(){ // index strumenti di marketing
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
						
			MENU.nasMM();
			var titolo = Lingua(TXT_StrumentiMarketing);
			var HTML =
			'<div>' +
			'	<h1>'+htmlEntities(titolo)+'</h1>' +
			'	<div style="padding-bottom:20px;">' +
					htmlEntities(Lingua(TXT_MarketingSpiegazione)) +
			'	</div>' +
			'	<div id="marketingTools_btns"' +
			'		 class="visSch">' +
			'		<div>' +
			'			<div class="btn_invia"' +
			'				 onClick="PAZIENTI.dwnl_emails();">' +
							htmlEntities(Lingua(TXT_InviaEmailPazienti)) +
			'			</div>' +
			'		</div>' +
			'		<div>' +
			'			<div class="btn_invia btn_dis"' +
			//'				 onClick="PAZIENTI.componiSms();"'+
			'>' +
							htmlEntities(Lingua(TXT_InviaSmsPazienti)) +
			'			</div>' +
			'		</div>' +
			'		<div style="text-align:right;">' +
			'			<div class="btn_frdx"' +
			'				 onClick="PAZIENTI.car_filtri();">' +
							htmlEntities(Lingua(TXT_FiltroPazienti)) +
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'</div>';
			SCHEDA.caricaScheda(	titolo,
									HTML,
									'',
									'scheda_marketing',
									false,
									true );
		}});
	},
	
	dwnl_emails: function(){ // scarica le email dal server
		if(DB.login.data.auths.indexOf("clients_full")==-1 || !LOGIN.logedin()){
			ALERT(Lingua(TXT_MsgFunzioneSoloPay));
			return;
		}
		if(!LOGIN.logedin()){
			ALERT(Lingua(TXT_ErroreUtenteNonConnesso), true);
			return;
		}
		if(CONN.retNoConn()){
			CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
							!SCHEDA.verificaSchedaRet(),
							arguments ).then(function(pass){if(pass){
							var v = getParamNames(CONFIRM.args.callee.toString());
							for(i in v)eval(getArguments(v,i));
					applicaLoading(document.getElementById("scheda_testo"));
					CONN.caricaUrl(	"marketing_email_elenco.php",
									"b64=1&SL="+globals.siglaLingua.toUpperCase(),
									"PAZIENTI.car_emails");
			}});
		}
	},
	car_emails: function( txt ){ // carica elenco emails
		if(txt == '404'){
			ALERT(Lingua(TXT_ErroreGenerico));
		}else{
			var msgs = JSON.parse(txt);
			var elencoMsg = msgs.messaggi;
			PAZIENTI.coda = msgs.coda*1;
			PAZIENTI.inviiMensili = msgs.inviiMensili*1;
			elencoMsg.sort(sort_by("DataInvio",true,parseInt));
			var titolo = Lingua(TXT_EmailPazienti);
			var HTML = 
			'<div>' +
			'	<div class="btn_frsx menuMarketing"' +
			'		 onClick="PAZIENTI.car_marketing();">' +
					htmlEntities(Lingua(TXT_StrumentiMarketing)) +
			'	</div>' +
			'	<h1>' +
					htmlEntities(titolo) +
			'	</h1>' +
			'	<div id="marketingElenchi"' +
			'		 class="divEspansa">' +
			'		<div id="marketingElenchi_btns">' +
			'			<div class="btn_invia"' +
			'				 onClick="PAZIENTI.componiEmail();">' +
							htmlEntities(Lingua(TXT_Componi).toUpperCase()) +
			'			</div>' +
			'		</div>' +
			'		<div id="marketingElenchi_head">' +
			'			<div>' +
							htmlEntities(Lingua(TXT_Oggetto)) +
			'			</div>' +
			'			<div>' +
							htmlEntities(Lingua(TXT_DataInvio)) +
			'			</div>' +
			'		</div>' +
			'		<div id="marketingElenchi_list">';
			if(elencoMsg.length){
				for(e in elencoMsg){
					var stato = '';
					var DataInvio = elencoMsg[e].DataInvio*1;
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
							htmlEntities(Lingua(TXT_NoRes)) +
						'</div>';
			}
			HTML +=	'</div>';
			'	</div>';
			
			SCHEDA.caricaScheda(	titolo,
									HTML,
									'',
									'scheda_marketing',
									false,
									true );
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
			var msg = {
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
		var titolo = Lingua(TXT_ComponiEmailPazienti);
		var HTML =
		'	<div id="marketingEmail_cnt">' +
		'		<div class="btn_frsx menuMarketing"' +
		'			 onClick="PAZIENTI.dwnl_emails();">' +
					htmlEntities(Lingua(TXT_EmailPazienti)) +
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
						label: Lingua(TXT_Oggetto),
						classCampo: 'styled',
						value: msg.Oggetto }) +
				H.r({	t: "t", 
						name: "MessaggioMarketing",
						label: "",
						value: msg.Messaggio}) +
		'				<div id="btnInvioEmail">';
		if(msg.idMessaggio)HTML +=
		'					<div class="p_paz_el"' +
		'						 onClick="PAZIENTI.eliminaEmail('+msg.idMessaggio+');">' +
								htmlEntities(Lingua(TXT_Elimina)) +
		'					</div>';
		HTML +=
		'					<div class="submitBtn"' +
		'						 onClick="PAZIENTI.anteprimaEmail();">' +
								htmlEntities(Lingua(TXT_AnteprimaEmail)).toUpperCase() +
		'					</div>' +
		'					<div class="submitBtn"' +
		'						 onClick="PAZIENTI.salvaEmail();">' +
								htmlEntities(Lingua(TXT_Salva)).toUpperCase() +
		'					</div>' +
		'				</div>' +
		'				<input type="hidden" name="idMessaggio" id="idMessaggio" value="'+msg.idMessaggio+'">' +
		'			</div>' +	
		'			<div id="marketingEmail_anteprima">' +	
		'			</div>' +	
		'		</form>' +	
		'	</div>' +	
		'</div>';
		SCHEDA.caricaScheda(	titolo,
								HTML,
								'',
								'scheda_marketing',
								false,
								true );
		initChangeDetection( "formMod" );
		if(mouseDetect)document.formMod.OggettoMarketing.focus();
	},
	anteprimaEmail: function(){ // visualizza l'anteprima della mail
		if(!document.formMod.OggettoMarketing.value.trim() || !document.formMod.MessaggioMarketing.value.trim()){
			ALERT(Lingua(TXT_MsgComponiEmail));
			return;
		}
		var HTML = '';
		var nEmail = PAZIENTI.get_nEmail(true); // numero delle mail nei pazientifiltrati
		var nPaz = PAZIENTI.get_nEmail(); // numero delle mail nei pazientifiltrati
		HTML += '<div>' +
				'	<div id="anteprimaOggetto">' +
						'<i>'+htmlEntities(Lingua(TXT_Oggetto))+'</i>: <b>'+htmlEntities(document.formMod.OggettoMarketing.value)+'</b>' +
				'	</div>' +
				'	<div id="anteprimaCorpo"' +
				'		 class="divEspansa">' +
						htmlEntities(document.formMod.MessaggioMarketing.value).replace(/\n/g, "<br>").replace(/\s/g,"&nbsp;") +
				'		<div id="anteprimaPiede">' +
				'			<div style="background-image:url(\'' + CONN.APIfolder+'../../__files_utenti/immagini/'+DB.login.data.idUtente+'/__avatar.jpg\');">' +
				'			</div>' +
				'			<i>'+htmlEntities(DB.login.data.Nominativo)+'</i><br>' +
							htmlEntities(DB.login.data.Email) +
				'		</div>' +
				'	</div>' +
				'	<div id="marketingEmail_dests">' +
				'		<i class="vis">'+htmlEntities(Lingua(TXT_Destinatari))+'</i>: ' +
				'		<select id="tipoLista"' +
				'				onChange="PAZIENTI.calcCoda();PAZIENTI.verTotDest();">' +
				'			<option value="tutti">' +
								htmlEntities(Lingua(TXT_DestinatariTutti))+' ('+nPaz+')' +
							'</option>' +
				'			<option value="filtrati"'+(nEmail ? '' : ' disabled')+'>'+
								htmlEntities(Lingua(TXT_DestinatariFiltrati))+' ('+nEmail+')' +
							'</option>' +
				'		</select>' +
				'	</div>' +
				'	<div id="alertCoda">' +
				'	</div>' +
				'	<div id="anteprimaBtns">' +
				'		<div class="submitBtn annullaBtn"' +
				'			 onClick="PAZIENTI.tornaEmail();">' +
							htmlEntities(Lingua(TXT_Annulla)).toUpperCase() +
				'		</div>' +
				'		<div class="submitBtn"' +
				'			 id="anteprimaInvia"' +
				'			 onClick="PAZIENTI.inviaEmail();">' +
							htmlEntities(Lingua(TXT_Invia)).toUpperCase() +
				'		</div>' +
				'		<div class="submitBtn"' +
				'			 onClick="PAZIENTI.salvaEmail();">' +
							htmlEntities(Lingua(TXT_Salva)).toUpperCase() +
				'		</div>' +
				'	</div>' +
				'</div>';
		document.getElementById("marketingEmail_anteprima").innerHTML = HTML;
		document.getElementById("marketingEmail_anteprima").classList.add("visSch");
		document.getElementById("marketingEmail_componi").classList.remove("visSch");
		document.getElementById("scheda").classList.remove("schForm");
		document.getElementById("marketingEmail_tit").innerHTML = htmlEntities(Lingua(TXT_AnteprimaEmailPazienti));
		PAZIENTI.calcCoda();
		PAZIENTI.verTotDest();
	},
	calcCoda: function(){
		/*var nEmail = PAZIENTI.get_nEmail(true); // numero delle mail nei pazientifiltrati
		var nPaz = PAZIENTI.get_nEmail(); // numero delle mail in tutti i pazienti
		var nAdd = 0;
		var inviiCoda = PAZIENTI.coda;
		var inviiMensili = PAZIENTI.inviiMensili;
		if(document.getElementById("tipoLista").value == 'filtrati')nAdd = nEmail;
		else nAdd = nPaz;
		var partiCoda = (PAZIENTI.coda + nAdd) / 20;
		var timeCoda = (partiCoda * 120); // moltiplico per i secondi di una parte (120)
		var txtAttenzione = '';
		if(timeCoda > (3600 * 24)){
			// attesa magggiore di 1 giorno
			txtAttenzione = Lingua(TXT_AlertCodaGiorno);
		}else if(timeCoda > 7200){
			// attesa maggiore di x ore
			var x = parseInt(timeCoda/3600);
			txtAttenzione = Lingua(TXT_AlertCodaOre).replace(/\[n\]/g,x);
		}else if(timeCoda > 3600){
			// attesa maggiore di 1 ora
			txtAttenzione = Lingua(TXT_AlertCodaOra);
		}else if(timeCoda > 1200){
			// attesa maggiore di 20 minuti
			txtAttenzione = Lingua(TXT_AlertCoda20min);
		}
		if(txtAttenzione)document.getElementById("alertCoda").style.display = 'block';
		else document.getElementById("alertCoda").style.display = 'none';
		document.getElementById("alertCoda").innerHTML = txtAttenzione;*/
	},
	verTotDest: function(){
		var nEmail = PAZIENTI.get_nEmail(true); // numero delle mail nei pazientifiltrati
		var nPaz = PAZIENTI.get_nEmail(); // numero delle mail in tutti i pazienti
		var n = 0;
		if(document.getElementById("tipoLista").value == 'filtrati')n = nEmail;
		else n = nPaz;
		var txtAttenzione = '';
		var disattivaInvio = false;
		if(n > PAZIENTI.maxInvii){
			disattivaInvio = true;
			txtAttenzione = Lingua(TXT_AlertMaxMsgVolta).replace(/\[n\]/g,PAZIENTI.maxInvii);
		}
		if(PAZIENTI.inviiMensili > PAZIENTI.maxInviiMese){
			disattivaInvio = true;
			txtAttenzione = Lingua(TXT_AlertMaxMsgMese).replace(/\[n\]/g,PAZIENTI.maxInviiMese);
		}
		if(disattivaInvio)document.getElementById("anteprimaInvia").classList.add('btn_dis');
		else document.getElementById("anteprimaInvia").classList.remove('btn_dis');
		if(txtAttenzione)document.getElementById("alertCoda").style.display = 'block';
		else document.getElementById("alertCoda").style.display = 'none';
		document.getElementById("alertCoda").innerHTML = txtAttenzione;
	},
	vis_email: function( msg ){ // carica elenco emails
		var msg = JSON.parse(msg);
		var titolo = Lingua(TXT_EmailPazienti);
		var HTML = 
		'<div>' +
		'	<div class="btn_frsx menuMarketing"' +
		'		 onClick="PAZIENTI.dwnl_emails();">' +
				htmlEntities(Lingua(TXT_EmailPazienti)) +
		'	</div>' +
		'	<h1>' +
				htmlEntities(msg.Oggetto) +
		'	</h1>' +
		'	<div id="anteprimaCorpo"' +
		'		 class="divEspansa">' +
				htmlEntities(msg.Messaggio).replace(/\n/g, "<br>").replace(/\s/g,"&nbsp;") +
		'		<div id="anteprimaPiede">' +
		'			<div style="background-image:url(\'' + CONN.APIfolder+'../../__files_utenti/immagini/'+DB.login.data.idUtente+'/__avatar.jpg\');">' +
		'			</div>' +
		'			<i>'+htmlEntities(DB.login.data.Nominativo)+'</i><br>' +
					htmlEntities(DB.login.data.Email) +
		'		</div>' +
		'	</div>' +
		'	<div id="destinatari"' +
		'		 class="divEspansa">' +
		'		<i>'+htmlEntities(Lingua(TXT_DataInvio))+':</i> '+getFullDataTS(msg.DataInvio*1)+" ("+getOraTS(msg.DataInvio*1)+")" +
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
					Lingua(TXT_Destinatari)+' ('+msg.lista.length+')' +
		'		</em>' +
		'		<div id="contDests">';
		for(d in msg.lista){
			HTML += msg.lista[d].Nominativo+" - "+ msg.lista[d].Email + "<br>";
		}
		HTML +=
		'		</div>' +
		'	</div>' +
		'	<div class="p_paz_el"' +
		'		 style="margin-top:10px;"' +
		'		 onClick="PAZIENTI.eliminaEmail('+msg.idMessaggio+');">' +
				htmlEntities(Lingua(TXT_Elimina)) +
		'	</div>' +
		'</div>';
		
		SCHEDA.caricaScheda(	titolo,
								HTML,
								'',
								'scheda_marketing',
								false,
								true );
	},
	get_nEmail: function( lista ){
		if(typeof(lista) == 'undefined')var lista = '';
		var nEmail = 0;
		if(lista){
			for(e in PAZIENTI.pazientiFiltrati){
				var PZ = DB.pazienti.data[PAZIENTI.pazientiFiltrati[e]];
				if(PZ.Email.trim())nEmail++;
			}
		}else{
			for(p in DB.pazienti.data){
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
		document.getElementById("marketingEmail_tit").innerHTML = htmlEntities(Lingua(TXT_ComponiEmailPazienti));
	},
	salvaEmail: function(){ // invia la mail
		if(CONN.retNoConn()){
			if(!document.formMod.OggettoMarketing.value.trim() || !document.formMod.MessaggioMarketing.value.trim()){
				ALERT(Lingua(TXT_MsgComponiEmail));
				return;
			}
			var JSNPOST = {
				idMessaggio: document.formMod.idMessaggio.value,
				Oggetto: document.formMod.OggettoMarketing.value,
				Messaggio: document.formMod.MessaggioMarketing.value
			}
			
			applicaLoading(document.getElementById("scheda_testo"))
			CONN.caricaUrl(	"marketing_email_salva.php",
							"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
							function(txt){
								rimuoviLoading(document.getElementById("scheda_testo"));
								SCHEDA.formModificato = false;
								endChangeDetection();
								if(txt.substr(0,3)!='404')PAZIENTI.dwnl_emails();
								else ALERT(Lingua(TXT_EmailErroreS));
							} );
		}
	},
	inviaEmail: function(){ // invia la mail
		if(document.getElementById("anteprimaInvia").classList.contains('btn_dis'))return;
		if(CONN.retNoConn()){
			CONFIRM.vis( Lingua(TXT_ChiediInvioEmail) ).then(function(pass){if(pass){
				var lista = [];
				if(document.getElementById("tipoLista").value=='filtrati'){
					for(e in PAZIENTI.pazientiFiltrati){
						var PZ = DB.pazienti.data[PAZIENTI.pazientiFiltrati[e]];
						if(PZ.Email.trim()){
							lista.push({
									Nominativo:  PZ.Nome+" "+PZ.Cognome,
									Email:  PZ.Email
								});
						}
					}
				}else{
					for(p in DB.pazienti.data){
						var PZ = DB.pazienti.data[p];
						if(PZ.Email.trim() && !PZ.Cancellato*1){
							lista.push({
									Nominativo:  PZ.Nome+" "+PZ.Cognome,
									Email:  PZ.Email
								});
						}
					}
				}
				var JSNPOST = {
						lista: lista,
						idMessaggio: document.formMod.idMessaggio.value,
						Oggetto: document.formMod.OggettoMarketing.value,
						Messaggio: document.formMod.MessaggioMarketing.value
					}
					
				applicaLoading(document.getElementById("scheda_testo"))
				CONN.caricaUrl(	"marketing_email_invia.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								function(txt){
									rimuoviLoading(document.getElementById("scheda_testo"))
									SCHEDA.formModificato = false;
									endChangeDetection();
									if(txt.substr(0,3)!='404'){
										ALERT(Lingua(TXT_EmailInviata));
										PAZIENTI.dwnl_emails();
									}else ALERT(Lingua(TXT_EmailErrore));
								} );
			}});
		}
	},
	eliminaEmail: function( idMessaggio ){ // invia la mail
		if(CONN.retNoConn()){
			CONFIRM.vis( Lingua(TXT_ChiediEliminaEmail) ).then(function(pass){if(pass){
				applicaLoading(document.getElementById("scheda_testo"))
				CONN.caricaUrl(	"marketing_email_elimina.php",
								"b64=1&idMessaggio="+idMessaggio,
								function(txt){
									rimuoviLoading(document.getElementById("scheda_testo"))
									SCHEDA.formModificato = false;
									endChangeDetection();
									if(txt.substr(0,3)!='404'){
										PAZIENTI.dwnl_emails();
										//ALERT(Lingua(TXT_EmailEliminata));
									}else ALERT(Lingua(TXT_EmailErrore));
								} );
			}});
		}
	}
}