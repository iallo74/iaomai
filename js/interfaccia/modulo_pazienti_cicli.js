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
					TestoTrattamento=TR.TestoTrattamento;
					Prescrizione=__(TR.Prescrizione);
					puntiMTC=__(TR.puntiMTC,[]);
					puntiAuricolari=__(TR.puntiAuricolari,[]);
					puntiPlantari=__(TR.puntiPlantari,[]);
					puntiNamikoshi=__(TR.puntiNamikoshi,[]);
					meridiani = __(TR.meridiani,[]);
					sintomi=__(TR.sintomi,[]);
					
					TipoTrattamento=TR.TipoTrattamento;
					if(debug)console.log(i+" - "+TipoTrattamento+" - "+TitoloTrattamento)
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
					let TXT_P;
					if(TipoTrattamento!='A'){
						HTML+='<h3>'+data+'</h3><p class="labelCicli"><i>'+htmlEntities(TitoloTrattamento)+'</i></p>';
						HTML+='<p>'+htmlEntities(TestoTrattamento).replace(/\n/g, '<br>')+'</p>';
						TXT_P=TXT("Punto");
						TXT_M=TXT("MeridianiTrattamento");
						
					}else{
						if(!TestoTrattamento)TestoTrattamento={"AnamnesiMotivo":"","AnamnesiDiagnosiOccidentale":"","AnamnesiDiagnosiMTC":""};
						else TestoTrattamento=JSON.parse(TestoTrattamento);
						AnamnesiMotivo=TestoTrattamento.AnamnesiMotivo;
						AnamnesiDiagnosiOccidentale=TestoTrattamento.AnamnesiDiagnosiOccidentale;
						AnamnesiDiagnosiMTC=TestoTrattamento.AnamnesiDiagnosiMTC;
						if(AnamnesiMotivo)HTML+='<p><i>'+htmlEntities(TXT("AnamnesiMotivo"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')))+':</i><br>'+htmlEntities(AnamnesiMotivo).replace(/\n/g, '<br>')+'</p>';
						if(AnamnesiDiagnosiOccidentale)HTML+='<p><i>'+htmlEntities(TXT("AnamnesiDiagnosiOccidentale"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')))+':</i><br>'+htmlEntities(AnamnesiDiagnosiOccidentale).replace(/\n/g, '<br>')+'</p>';
						if(AnamnesiDiagnosiMTC)HTML+='<p><i>'+htmlEntities(TXT("AnamnesiDiagnosiMTC"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')))+':</i><br>'+htmlEntities(AnamnesiDiagnosiMTC).replace(/\n/g, '<br>')+'</i></p>';
						TXT_P=TXT("PuntiAnamnesi");
						TXT_M=TXT("MeridianiAnamnesi");
					}
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
								'<br><i>'+TXT_P+':</i> ' +
								'<div id="puntiCiclo">';
						for(let p in puntiMTC){
							nPunto = puntiMTC[p].n;
							siglaMeridiano = puntiMTC[p].m;
							valutazione = __(puntiMTC[p].e);
							mezzo = __(puntiMTC[p].z);
							descrizione = __(puntiMTC[p].t);
							siglaPunto = __(puntiMTC[p].s);
							if(!siglaPunto)siglaPunto = nPunto+'.'+siglaMeridiano;
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ' +
									'<b>'+siglaPunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
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
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ' +
									'<b>'+nomePunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+H.chr10;
						}
						HTML += '</div>' +
								'</div>';
					}
					if(puntiAuricolari.length){
						HTML += '<div class="app_report_sch"> ' +
								'<br><i>'+TXT_P+':</i> ' +
								'<div id="puntiCiclo">';
						for(let p in puntiAuricolari){
							nomePunto=puntiAuricolari[p].n;
							valutazione=__(puntiAuricolari[p].e);
							mezzo=__(puntiAuricolari[p].z);
							descrizione=__(puntiAuricolari[p].t);
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ' +
									'<b>'+nomePunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+H.chr10;
						}
						HTML += '</div>' +
								'</div>';
					}
					if(puntiPlantari.length){
						HTML += '<div class="app_report_sch"> ' +
								'<br><i>'+TXT_P+':</i> ' +
								'<div id="puntiCiclo">';
						for(let p in puntiPlantari){
							nomePunto=puntiPlantari[p].n;
							valutazione=__(puntiPlantari[p].e);
							mezzo=__(puntiPlantari[p].z);
							descrizione=__(puntiPlantari[p].t);
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ' +
									'<b>'+nomePunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+H.chr10;
						}
						HTML += '</div>' +
								'</div>';
					}
					if(meridiani.length){
						HTML += '<div class="app_report_sch"> ' +
								'<br><i>'+TXT_M+':</i> ' +
								'<div id="meridianiCiclo">';
						for(let m in meridiani){
							NomeMeridiano=meridiani[m].NomeMeridiano;
							siglaMeridiano=meridiani[m].siglaMeridiano;
							valutazione=__(meridiani[m].valEnergetica);
							descrizione=__(meridiani[m].descrizione);
							
							HTML += 	'<span class="tsb">' +
										'<b>'+NomeMeridiano+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
							if(descrizione)HTML += ' '+descrizione;
							HTML += '</span>'+H.chr10;
						}
						HTML += '</div>' +
								'</div>';
					}
				}
			}
			HTML2 = HTML;
			HTML = '';
			if(valori.length>0){
				HTML+='<hr><h2>'+htmlEntities(TXT("ScoresSintomi"))+'</h2>';
				HTML+='<div id="graficoCont">';
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
	swMenuCiclo: function( idTrattQ, btn ){
		let forza = false
		if(typeof(idTrattQ)=='undefined' && typeof(btn)=='undefined')forza = true;
		if(PAZIENTI.mnOver)return;
		if(!document.getElementById("menuCiclo") && !forza){
			PAZIENTI.mnOver = false;
			PAZIENTI.mn = document.createElement('div');
			PAZIENTI.mn.id = "menuCiclo";
			PAZIENTI.mn.style.top = ((tCoord(btn,'y')-15)-(HF()-SCHEDA.hOpened)) + 'px';
			PAZIENTI.mn.className = "visSch";
			PAZIENTI.mn.innerHTML = '<div class="p_paz_el_menu"' +
									'	  onclick="PAZIENTI.el_trattamento('+idTrattQ+');"' +
									'	  onMouseOver="PAZIENTI.mnOver = true;"' +
									'	  onMouseOut="PAZIENTI.mnOver = false;">' +
										TXT("EliminaCartella") +
									'</div>';
			document.getElementById("lista_pazienti").appendChild(PAZIENTI.mn);
			window.addEventListener("mouseup", PAZIENTI.swMenuCiclo, false);
		}else{
			document.getElementById("lista_pazienti").removeChild(PAZIENTI.mn);
			window.removeEventListener("mouseup", PAZIENTI.swMenuCiclo, false);
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
