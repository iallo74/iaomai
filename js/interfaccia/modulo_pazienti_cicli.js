var PAZIENTI_CICLI = { // extend PAZIENTI
	
	// ciclo
	car_ciclo: function( LabelCiclo, btn ){ // al clic carica il RIEPILOGO del ciclo di trattamenti
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			MENU.nasMM();
			let valori = [],
				HTML0 = '<div id="schedaCiclo">',
				HTML = '';
			PAZIENTI.cicOp=true;
			if(LabelCiclo!='0')HTML0+='<h1>'+htmlEntities(LabelCiclo)+'</h1>';
			else HTML0+='<h1>'+htmlEntities(TXT("CicloSenzaNome"))+'</h1>';
			HTML0+='<p><i>Cliente:</i> '+htmlEntities(DB.pazienti.data[PAZIENTI.idCL].Nome+" "+DB.pazienti.data[PAZIENTI.idCL].Cognome)+'</p>';
			// ELENCO I TRATTAMENTI DELLA CARTELLA LabelCiclo
			let n=-1,
				TRS_clone = clone(DB.pazienti.data[PAZIENTI.idCL].trattamenti),
				TRS = [];			
			for(let i=TRS_clone.length-1;i>=0;i--){
			   if(	TRS_clone[i].LabelCiclo==LabelCiclo && 
					( (	TRS_clone[i].TimeTrattamento>0 && TRS_clone[i].TimeTrattamento<=new Date()/1000) || 
						TRS_clone[i].TipoTrattamento=='A') )TRS.push(TRS_clone[i]);
			}
			TRS.sort(sort_by("TipoTrattamento", false));
			let f = 0;
			for(let i in TRS){
				if(TRS[i].TipoTrattamento=='A')TRS[i].p = f;
			}
			TRS.sort(sort_by("TimeTrattamento", false, parseInt));
			for(let i in TRS){
				f++;
				if(TRS[i].TipoTrattamento!='A')TRS[i].p = f;
			}
			TRS.sort(sort_by("p", false, parseInt));
			let sintomiCiclo = PAZIENTI.getSintomiCiclo(LabelCiclo);
			for(let s in sintomiCiclo){
				valori[s]=[];
				valori[s].NomeSintomo=sintomiCiclo[s].NomeSintomo;
			}
			for(let i in TRS){
				let TR = TRS[i];
				if(TR.Cancellato==0 && TR.LabelCiclo==LabelCiclo){
					n++;
					idTrattamento=TR.idTrattamento*1;
					TitoloTrattamento=TR.TitoloTrattamento;
					NoteTrattamento=TR.NoteTrattamento;
					//moduli=__(TR.moduli,{});
					Anamnesi=TR.Anamnesi;
					DiagnosiOccidentale=TR.DiagnosiOccidentale;
					DiagnosiMTC=TR.DiagnosiMTC;
					Prescrizione=__(TR.Prescrizione);
					ConsiderazioniOperatore=__(TR.ConsiderazioniOperatore);
					ConsiderazioniPaziente=__(TR.ConsiderazioniPaziente);
					puntiMTC=__(TR.puntiMTC,[]);
					puntiAuricolari=__(TR.puntiAuricolari,[]);
					puntiPlantari=__(TR.puntiPlantari,[]);
					puntiNamikoshi=__(TR.puntiNamikoshi,[]);
					puntiTrigger=__(TR.puntiTrigger,[]);
					diagnosiAI=__(TR.diagnosiAI,[]);
					meridiani = __(TR.meridiani,[]);
					sintomi=__(TR.sintomi,[]);
					
					TipoTrattamento=TR.TipoTrattamento;
					TimeTrattamento=TR.TimeTrattamento*1;
					Data=TimeTrattamento;
					if(!TimeTrattamento)TimeTrattamento=new Date()/1000;
					
					TimeTrattamento = new Date(TimeTrattamento*1);
					// DATA
					let data = '';
					if(n)data += '<b style="color: #eaa21d;font-size:inherit;">'+n+')</b> ';
					
					giorno=TimeTrattamento.getDate();
					mese=TimeTrattamento.getMonth()+1;
					anno=TimeTrattamento.getFullYear();
					if(Data)data += getFullDataTS(Data);
					else data += '-';
					
					if(i>0)HTML += '<hr>';
					if(TipoTrattamento!='A')HTML+='<h3>'+data+'</h3><p class="labelCicli"><i>'+htmlEntities(TitoloTrattamento)+'</i></p>';

					//anamnesi
					if(Anamnesi)HTML+='<p><i>'+htmlEntities(TXT("Anamnesi"+(PAZIENTI.isHolistic()?'Shiatsu':'')))+':</i><br>'+htmlEntities(Anamnesi).replace(/\n/g, '<br>')+'</p>';

					// modulo valutazione
					/*if(moduli){
						for(d in moduli){
							HTML+='<p><i>'+htmlEntities(moduli[d].d)+':</i><br>'+htmlEntities(moduli[d].r)+'</p>';
						}
					}*/


					// diagnosi
					if(DiagnosiOccidentale)HTML+='<p><i>'+htmlEntities(TXT("DiagnosiOccidentale"+(PAZIENTI.isHolistic()?'Shiatsu':'')))+':</i><br>'+htmlEntities(DiagnosiOccidentale).replace(/\n/g, '<br>')+'</p>';
					if(DiagnosiMTC)HTML+='<p><i>'+htmlEntities(TXT("DiagnosiMTC"+(PAZIENTI.isHolistic()?'Shiatsu':'')))+':</i><br>'+htmlEntities(DiagnosiMTC).replace(/\n/g, '<br>')+'</i></p>';
					for(v in valori){
						let score = -1;
						for(let s in sintomi){
							if(valori[v].NomeSintomo==sintomi[s].NomeSintomo)score = sintomi[s].score
						}
						valori[v][i]={
							"p": TR.p,
							"Data": Data,
							"score": score
						}
					}
					if(puntiMTC.length){
						HTML += '<div class="app_report_sch"> ' +
								'<br><i>'+TXT("PuntiMTC")+':</i> ' +
								'<div id="puntiCiclo">';
						for(let p in puntiMTC){
							nPunto = puntiMTC[p].n;
							siglaMeridiano = puntiMTC[p].m;
							valutazione = __(puntiMTC[p].e);
							mezzo = __(puntiMTC[p].z);
							descrizione = __(puntiMTC[p].t);
							siglaPunto = __(puntiMTC[p].s);
							if(!siglaPunto)siglaPunto = nPunto+'.'+siglaMeridiano;
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;margin-left: -3px;"> ' +
									'<b>'+siglaPunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+H.chr10;
						}
						HTML +=	'</div>' +
								'</div>';
					}
					if(puntiNamikoshi.length){
						HTML += '<div class="app_report_sch"> ' +
								'<br><i>'+TXT("PuntiNamikoshi")+':</i> ' +
								'<div id="puntiCiclo">';
						for(let p in puntiNamikoshi){
							nomePunto=puntiNamikoshi[p].s;
							valutazione=__(puntiNamikoshi[p].e);
							mezzo=__(puntiNamikoshi[p].z);
							descrizione=__(puntiNamikoshi[p].t);
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;margin-left: -3px;"> ' +
									'<b>'+nomePunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+H.chr10;
						}
						HTML += '</div>' +
								'</div>';
					}
					if(puntiAuricolari.length){
						HTML += '<div class="app_report_sch"> ' +
								'<br><i>'+TXT("PuntiAuriculo")+':</i> ' +
								'<div id="puntiCiclo">';
						for(let p in puntiAuricolari){
							nomePunto=puntiAuricolari[p].n;
							valutazione=__(puntiAuricolari[p].e);
							mezzo=__(puntiAuricolari[p].z);
							descrizione=__(puntiAuricolari[p].t);
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;margin-left: -3px;"> ' +
									'<b>'+nomePunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+H.chr10;
						}
						HTML += '</div>' +
								'</div>';
					}
					if(puntiPlantari.length){
						HTML += '<div class="app_report_sch"> ' +
								'<br><i>'+TXT("PuntiReflex")+':</i> ' +
								'<div id="puntiCiclo">';
						for(let p in puntiPlantari){
							nomePunto=puntiPlantari[p].n;
							valutazione=__(puntiPlantari[p].e);
							mezzo=__(puntiPlantari[p].z);
							descrizione=__(puntiPlantari[p].t);
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;margin-left: -3px;"> ' +
									'<b>'+nomePunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+H.chr10;
						}
						HTML += '</div>' +
								'</div>';
					}
					if(puntiTrigger.length){
						HTML += '<div class="app_report_sch"> ' +
								'<br><i>'+TXT("PuntiTrigger")+':</i> ' +
								'<div id="puntiCiclo">';
						for(let p in puntiTrigger){
							nomePunto=puntiTrigger[p].n;
							valutazione=__(puntiTrigger[p].e);
							mezzo=__(puntiTrigger[p].z);
							descrizione=__(puntiTrigger[p].t);
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;margin-left: -3px;"> ' +
									'<b>'+nomePunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+H.chr10;
						}
						HTML += '</div>' +
								'</div>';
					}
					if(meridiani.length){
						HTML += '<div class="app_report_sch"> ' +
								'<br><i>'+TXT("MeridianiTrattamento")+':</i> ' +
								'<div id="meridianiCiclo">';
						for(let m in meridiani){
							NomeMeridiano=meridiani[m].NomeMeridiano;
							siglaMeridiano=meridiani[m].siglaMeridiano;
							valutazione=__(meridiani[m].valEnergetica);
							descrizione=__(meridiani[m].descrizione);
							
							HTML += 	'<span class="tsb">' +
										'<b>'+NomeMeridiano+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod">';
							if(descrizione)HTML += ' '+descrizione;
							HTML += '</span>'+H.chr10;
						}
						HTML += '</div>' +
								'</div>';
					}
					if(NoteTrattamento)HTML+='<p><i>'+htmlEntities(TXT("NoteTrattamento"))+':</i><br>'+htmlEntities(NoteTrattamento).replace(/\n/g, '<br>')+'</p>';
					if(ConsiderazioniOperatore)HTML+='<p><i>'+htmlEntities(TXT("ConsiderazioniOperatore"))+':</i><br>'+htmlEntities(ConsiderazioniOperatore).replace(/\n/g, '<br>')+'</p>';
					if(ConsiderazioniPaziente)HTML+='<p><i>'+htmlEntities(TXT("ConsiderazioniPaziente"))+':</i><br>'+htmlEntities(ConsiderazioniPaziente).replace(/\n/g, '<br>')+'</p>';
				}
			}
			HTML2 = HTML;
			HTML = '';
			if(valori.length>0){
				HTML += '<hr><h2>'+htmlEntities(TXT("ScoresSintomi"))+'</h2>';
				HTML += '<div id="graficoCont">';
				let tot=0;
				for(let d in valori[0]){
					if(d!='NomeSintomo')tot++;
				}
				tot--;
				let Wg = WF()-505,
					Hg = 50,
					step = Wg/tot;
				if(WF()<1024)Wg = WF()-120;
				if(WF()<510)Wg = WF()-80;

				HTML += '<div class="graficoDate"><div class="graficoEtichetta"></div><div class="graficoDati">';
				let totvals = valori[0].length;
				for(v in valori[0]){
					if(v!='NomeSintomo'){
						let pD = getDataTS(valori[0][v]["Data"]).split("/"),
							data = twoDigits(pD[0])+"."+twoDigits(pD[1]);//+"."+pD[2].substr(2,2);
						if(v==0)data = '<img src="img/ico_trattamentiN.png">';
						HTML += '<div><div>'+data+'</div></div>';
					}
				}
				HTML += '</div></div>';

				for(v in valori){
					HTML+='<div class="grafico"><div class="graficoEtichetta">'+htmlEntities(valori[v].NomeSintomo)+'</div><div class="graficoDati">';
					HTML+=PAZIENTI.scriviGrafico(valori[v],Wg,Hg,step,tot);
					HTML+='</div></div>';
				}
				HTML+='</div><div class="l"></div>';
			}
			HTML = HTML0+HTML+HTML2+'</div>';
			SCHEDA.caricaScheda( stripslashes(TXT("SchedaCiclo")), HTML, '', 'scheda_Riepi', false, true, btn );
		}});
	},
	swMenuCiclo: function( idTrattQ, idCiclo, btn ){
		let forza = false,
			forzaSmart = false;
		if(typeof(idTrattQ)=='undefined' && typeof(btn)=='undefined')forza = true;
		if(PAZIENTI.mnOver)return;
		
		if(touchable && PAZIENTI.mn?.dataset.idciclo!=idCiclo+"" && typeof(PAZIENTI.mn?.dataset.idciclo)!='undefined'){
			forzaSmart = true;
			PAZIENTI.mn.parentElement.removeChild(PAZIENTI.mn);
			PAZIENTI.mn = null;
		}
		
		if((!document.getElementById("menuCiclo") && !forza) || forzaSmart){
			let top = tCoord(btn,'y')-136
			if(smartMenu)top -= HF()-SCHEDA.hOpened;
			PAZIENTI.mnOver = false;
			PAZIENTI.mn = document.createElement('div');
			PAZIENTI.mn.id = "menuCiclo";
			PAZIENTI.mn.dataset.idciclo = idCiclo;
			PAZIENTI.mn.style.top = top + 'px';
			PAZIENTI.mn.className = "visSch";
			PAZIENTI.mn.innerHTML = '<div class="p_paz_el_menu"' +
									'	  onclick="PAZIENTI.el_trattamento('+idTrattQ+');"' +
									'	  onMouseOver="PAZIENTI.mnOver = true;"' +
									'	  onMouseOut="PAZIENTI.mnOver = false;">' +
										TXT("EliminaCartella") +
									'</div>';
			document.getElementById("ciclo_"+idCiclo).appendChild(PAZIENTI.mn);
			if(!touchable)window.addEventListener("mouseup", PAZIENTI.swMenuCiclo, false);
		}else{
			PAZIENTI.mn.parentElement.removeChild(PAZIENTI.mn)
			if(!touchable)window.removeEventListener("mouseup", PAZIENTI.swMenuCiclo, false);
			PAZIENTI.mn = null;
		}
	},
	
	// riepilogo
	scriviGrafico: function( dati, Wg, Hg, step, tot ){
		let RET = '',
			pos = '',
			xPre = yPre=-1,
			st = 100/12;
		RET += 	'<svg width="100%"' +
				'	  height="'+(Hg+10)+'"' +
				'	  class="chart">';
		for(let y=1;y<=11;y++){ // linee orizzontali
			RET += '<line fill="none"' +
				'		  class="lineY"' +
				'		  stroke-miterlimit="10"' +
				'		  x1="2%"' +
				'		  y1="'+(y*st)+'%"' +
				'		  x2="98%"' +
				'		  y2="'+(y*st)+'%"/>';
		}
		let stp = 96 / tot;
		if(!tot)stp = 0;
		for(let x=0;x<=tot;x++){ // linee verticali
			RET += '<line fill="none"' +
				'		  class="lineX"' +
				'		  stroke-miterlimit="10"' +
				'		  x1="'+((x*stp)+2)+'%"' +
				'		  y1="'+st+'%"' +
				'		  x2="'+((x*stp)+2)+'%"' +
				'		  y2="'+(100-st)+'%"/>';
		}
		let linee = punti = '';
		n=0;
		
		for(let d in dati){ // grafico (linee e punti)
			if(d!='NomeSintomo'){
				pos=-1;
				y=-1;
				if(dati[d].score>-1){
					pos = (stp*n) + 2;
					let y=((11-dati[d].score)*st);
					if(xPre>-1)linee += '<line fill="none"' +
										'	   stroke="#0074d9"' +
										'	   stroke-width="1.5"' +
										'	   x1="'+xPre+'%"' +
										'	   y1="'+yPre+'%"' +
										'	   x2="'+pos+'%"' +
										'	   y2="'+y+'%" />';
					punti += 	'<circle data-data="'+dati[d].Data+'"' +
								'	     data-p="'+dati[d].p+'"' +
								'	     cx="'+pos+'%"' +
								'	     cy="'+y+'%"' +
								'	     r="3"' +
								'	     stroke="none"' +
								'	     stroke-width="0"' +
								'	     fill="#0074d9" />';
					xPre=pos;
					yPre=y;
				}else{
					xPre=-1;
					yPre=-1;
				}
				n++;
			}
		}
		RET+=linee+punti+'</svg>';
		return RET;
	},
	eviPallStat: function( Data ){ // evidenzia i pallini delle statistiche al passaggio del mouse su un trattamento
		if(PAZIENTI.cicOp && document.getElementById("graficoCont")){
			let svgs=document.getElementById("graficoCont").getElementsByTagName("svg");
			for(let s=0;s<svgs.length;s++){
				let circles=svgs[s].getElementsByTagName("circle");
				for(let c=0;c<circles.length;c++){
					if(circles[c].dataset.data*1==Data*1)circles[c].setAttribute("class","statEvi");
				}
			}
		}
	},
	desPallStat: function( Data ){ // deseleziona i pallini delle statistiche al passaggio del mouse
		if(PAZIENTI.cicOp && document.getElementById("graficoCont")){
			let svgs=document.getElementById("graficoCont").getElementsByTagName("svg");
			for(let s=0;s<svgs.length;s++){
				let circles=svgs[s].getElementsByTagName("circle");
				for(let c=0;c<circles.length;c++){
					if(circles[c].dataset.data*1==Data*1)circles[c].setAttribute("class","")
				}
			}
		}
	},
	setCartOp: function( el ){
		if(el.parentElement.querySelector(".nomeCiclo")){
			this.aperture[el.parentElement.querySelector(".nomeCiclo").innerText] = el.parentElement.classList.contains("cartellaAperta");
		}
	}
	
}
