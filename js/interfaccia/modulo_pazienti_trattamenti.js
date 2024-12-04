var PAZIENTI_TRATTAMENTI = { // extend PAZIENTI
	
	mn: null, // il menu contestuale dei cicli
	mnOver: false, // il menu contestuale dei cicli
	 
	// TRATTAMENTI
	vis_add: function( daPiu='' ){
		if(!document.getElementById("menuDesktop").classList.contains("visSch")){
			document.getElementById("menuDesktop").classList.add("visSch");
			document.addEventListener("mouseup",PAZIENTI.vis_add);
		}else{
			document.getElementById("menuDesktop").classList.remove("visSch");
			document.removeEventListener("mouseup",PAZIENTI.vis_add);
		}
	},
	vis_anamnesi: function(){ // visualizza/nasconde la scheda preliminare nella creazione di una cartella
		let btn = document.getElementById("anamnesi_btn"),
			cont = document.getElementById("anamnesi_cont");
		if(!btn.classList.contains("anaVis")){
			cont.style.display = 'block';
			btn.classList.add('anaVis');
		}else{
			cont.style.display = 'none';
			btn.classList.remove('anaVis');
		}
	},
	caricaTrattamenti: function( Q_resta=false, ev = -1 ){ // elenco trattamenti
		if(PAZIENTI.idCL>-1){
			let PZ = DB.pazienti.data[PAZIENTI.idCL],
				cloneTRATTAMENTI = clone(PZ.trattamenti);
			for(let p in cloneTRATTAMENTI){
				cloneTRATTAMENTI[p].p = p;
			}
			cloneTRATTAMENTI.sort(sort_by("TimeTrattamento", true, parseInt));
			
			// CREO CARTELLE e TRATTAMENTI SINGOLI E ORDINO PER DATA ULTIMO ELEMENTO
			PAZIENTI.cicli = [];
			PAZIENTI.cicli.push({
				NomeCiclo: TXT("TrattamentiSingoli"),
				Tipo: 'V',
				ordine: -1,
				UltimaModifica: 99999999999,
				p: -1
			});
			let o=0,
				cartOpened = false;
			for(let i in cloneTRATTAMENTI){
				let TR = cloneTRATTAMENTI[i];
				if(!PAZIENTI.trattOp)TR.md5='';
				if(TR.Cancellato==0 && TR.TipoTrattamento=='A'){
					esiste=false;
					for(let c in PAZIENTI.cicli){
						if(PAZIENTI.cicli[c].NomeCiclo == TR.LabelCiclo)esiste=true;
					}
					if(!esiste && TR.LabelCiclo){ // ciclo
						ordine = __(TR.ordine,o++);
						PAZIENTI.cicli.push({  "NomeCiclo": TR.LabelCiclo, 
											   "UltimaModifica": TR.TimeTrattamento*1,
											   "Tipo": "C",
											   "ordine": ordine,
											   "p": TR.p*1 });
					}
				}
			}
			PAZIENTI.cicli.sort(sort_by("ordine", false, parseInt));
			//--------------------------------
			
			let HTML='';
			HTML += PAZIENTI.intestazionePaziente("t");
			
			HTML += '<div class="menuElenchi"' +
					'	  onClick="MENU.visMM(\'add_ciclo\');">' +
					'</div>' +
					'<p id="add_ciclo">' +
					'	<i class="elMenu"' +
					'	   id="addServizioMenu"' +
					'	   onclick="SERVIZI.sel_servizi();">' +
					'		<img src="img/ico_servizioB.png"' +
					'			 class="noBG"' +
					'			 align="absmiddle">' +
					'		<span>'+htmlEntities(TXT("ScegliServizio"))+'</span>' +
					'	</i>' +
					'	<i class="elMenu"' +
					'	   title="'+htmlEntities(TXT("AggiungiCiclo"))+'"' +
					'	   onclick="PAZIENTI.car_trattamento();">' +
					'		<img src="img/ico_cicliB_add.png"' +
					'			 class="noBG"' +
					'			 align="absmiddle">' +
					'		<span>'+htmlEntities(TXT("AggiungiCiclo"))+'</span>' +
					'	</i>' +
					'</p>';
					
			HTML += '<div class="lista listaTrattamenti';
			if(typeof(Q_resta) == 'number' && Q_resta > -1)HTML += ' cont_cartellaAperta';
			HTML += '">';
			let vuoto=true;
			
			for(let c in PAZIENTI.cicli){
				vuoto=false;
				HTMLProvv  = '';
				if(PAZIENTI.cicli[c].Tipo == 'C' || PAZIENTI.cicli[c].Tipo == 'V'){
					NomeCiclo=PAZIENTI.cicli[c].NomeCiclo;
					if(typeof(PAZIENTI.aperture[NomeCiclo]) != 'undefined' && PAZIENTI.aperture[NomeCiclo])cartOpened = true;
					
					let HTMLProvv = '',
						elAn = -1,
						DataAn = '',
						DataMod = '',
						DataModAn = '',
						presente = false,
						pr=0;
					cloneTRATTAMENTI.sort(sort_by("TipoTrattamento", false));
					
					for(let p in cloneTRATTAMENTI){
						if( (cloneTRATTAMENTI[p].LabelCiclo==NomeCiclo || 
							(PAZIENTI.cicli[c].Tipo == 'V' && !cloneTRATTAMENTI[p].LabelCiclo)) && 
							!cloneTRATTAMENTI[p].Cancellato ){
								
							Data=cloneTRATTAMENTI[p].TimeTrattamento;
							DataMod=cloneTRATTAMENTI[p].DataModifica;
							if(Data){
								pD=getDataTS(Data).split("/");
								if(pD.length>1){
									dataCorta =	'<font style="font-family:Arial !important;' +
												'      font-size:11px !important;">' +
													pD[0]+H.sl+pD[1]+H.sl+pD[2].substr(2,2) +
												'</font>';
								}else{
									dataCorta =	'<font style="font-family:Arial !important;' +
												'      font-size:11px !important;">' +
													pD +
												'</font>';
								}
								data=pD[0]+H.sl+pD[1]+H.sl+pD[2].substr(2,2);
							}else{
								data = '';
								dataCorta =	'';
							}
							if(cloneTRATTAMENTI[p].TipoTrattamento!='A'){ // trattamenti
								HTMLProvv+='<div id="btn_trattamento_'+cloneTRATTAMENTI[p].p+'" class="cart_els';
								pr++;
								
								if(cloneTRATTAMENTI[p].TimeTrattamento*1000>Date.now())HTMLProvv+=' timer';
								if(!cloneTRATTAMENTI[p].TimeTrattamento)HTMLProvv+=' timerNo';
								
								HTMLProvv+=	'"' +
											' onMouseDown="DRAGGER.startDrag(this,\'PAZIENTI.moveTratt\',this.parentElement.parentElement);"' +
											' onTouchStart="DRAGGER.startDrag(this,\'PAZIENTI.moveTratt\',this.parentElement.parentElement);"' +
											' data-drag-class="lbTrattamento"' +
											' data-drag-family="trattamento"' +
											' data-drag-type="child"';
								if(!touchable)HTMLProvv +=	' onMouseOver="PAZIENTI.eviPallStat('+Data+');"' +
															' onMouseOut="PAZIENTI.desPallStat('+Data+');"';
								HTMLProvv += ' onClick="PAZIENTI.car_trattamento('+cloneTRATTAMENTI[p].p+',this,\'\',false,'+elAn+');">'; // trattamento
								
								HTMLProvv+= data +
											' <span style="color:rgba(255,255,255,0.5);">-</span> ';
								if(cloneTRATTAMENTI[p].TitoloTrattamento)HTMLProvv += htmlEntities(cloneTRATTAMENTI[p].TitoloTrattamento);
								else HTMLProvv += '...';
								
								HTMLProvv += '</div>';
								presente=true;
							}else{ // anamnesi
								elAn=cloneTRATTAMENTI[p].p;
								dataAn=dataCorta;
								DataAn=Data;
								DataModAn=DataMod;
							}
						}
					}
					
					HTML+='<div class="cartella'+((ev==c)?' eviCiclo':'');
					if(PAZIENTI.cicli[c].Tipo == 'V')HTML += ' cartellaSingoli';
					let cartAperta = this.aperture[NomeCiclo];
					if(typeof(cartAperta)=='undefined')cartAperta=false;
					if(this.aperture[NomeCiclo])HTML+=' cartellaAperta';
					HTML+='" onTouchStart="SCHEDA.setCartella(this);"' +
							'	   data-drag-family="trattamento"' +
							'	   data-drag-type="cont"><div class="menuElenchi"' +
							'	   onClick="MENU.visMM(\'trattTools_'+elAn+'\');">' +
							'</div><span id="cl_'+c+'"' +
							'      onClick="SCHEDA.swCartella(this);' +
							'      			PAZIENTI.setCartOp(this);"';
					if(PAZIENTI.cicli[c].Tipo != 'V')HTML+=
							'	   data-drag-class="lbCiclo"' +
							'	   data-drag-family="ciclo"' +
							'	   data-drag-type="move"' +
							'	   onMouseDown="DRAGGER.startDrag(this,\'PAZIENTI.moveCiclo\');"' +
							'	   onTouchStart="DRAGGER.startDrag(this,\'PAZIENTI.moveCiclo\');"';
							
					HTML+='>';
					
					
					HTML +=	'<img src="img/cartellaClinicaG.png"' +
							'     style="width:32px;' +
							'     		 margin:-10px;' +
							'     		 margin-right: 5px;">' +
							'<b class="nomeCiclo">'+htmlEntities(NomeCiclo)+'</b>';

					NC = NomeCiclo;	
					
					HTML+='</span><div class="trattElenco" id="ciclo_'+c+'"';
					if(!(cartAperta))HTML+=' style="display:none;"';
					HTML+='>';
					
					if(!presente)HTMLProvv+='<div class="noResults">'+TXT("NoResTrattamento")+'...</div>';
					let InfoAn= '';
					if(DataAn)InfoAn +=	'<img src="img/ico_agendaM2.png">'+getDataTS(DataAn);
					
					HTML +=	'<div class="trattTools"' +
							'	  id="trattTools_'+elAn+'">' +
							'	<i class="addTrattBtn elMenu"' +
							'	   id="add_tratt_'+elAn+'"' +
							'	   title="'+htmlEntities(TXT("AggiungiTrattamento"))+'"';
					if(PAZIENTI.cicli[c].Tipo == 'C')HTML += // aggiungo in ciclo
							'	   onclick="PAZIENTI.car_trattamento( -1,' +
							'	     	  							  null,' +
							'	     	  							  \''+addslashes(PAZIENTI.cicli[c].NomeCiclo)+'\',' +
							'	     	  							  false,' +
							'	     	  							  '+elAn+');"';
					else HTML += ' onclick="PAZIENTI.car_trattamento( -2);"'; // aggiungo in trattamenti singoli
					HTML += '></i>';
					if(PAZIENTI.cicli[c].Tipo == 'C'){ // escludo dai trattamenti singoli
						HTML +=
							'	<i class="riepilogoBtn elMenu"' +
							'		title="'+htmlEntities(TXT("SchedaCiclo"))+'"' +
							'		onclick="PAZIENTI.car_ciclo(\''+addslashes(PAZIENTI.cicli[c].NomeCiclo)+'\',this);">' +
							'		<span>'+htmlEntities(TXT("SchedaCiclo"))+'</span>' +
							'	</i>' +
							'	<i onclick="PAZIENTI.swMenuCiclo('+elAn+','+c+',this);" class="eliminaBtn elMenu">' +
							'		<svg viewBox="0 0 24 32">' +
							'			<circle cy="11"></circle>' +
							'			<circle cy="18"></circle>' +
							'			<circle cy="25"></circle>' +
							'		</svg>' +
							'	</i>';
					}
					HTML += '</div>';
					if(PAZIENTI.cicli[c].Tipo == 'C'){ // escludo dai trattamenti singoli
						HTML +=
							'<div 	class="anamnesiBtn elMenu"' +
							'		id="btn_trattamento_'+elAn+'"';
					if(!touchable)HTML += ' onMouseOver="PAZIENTI.eviPallStat('+DataAn+');"' +
										  ' onMouseOut="PAZIENTI.desPallStat('+DataAn+');"';
					HTML += ' 	   onclick="PAZIENTI.car_trattamento(\''+elAn+'\',this,\''+NC+'\',true);">'; // anamnesi
					
					HTML += '	<span>'+htmlEntities(TXT("SchedaAnamnesi"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')))+'</span>' +
							'</div>';
					}
					HTML += HTMLProvv +
							'</div></div>';
				}
			}
			if(vuoto)HTML += '<p class="noResults lista listaTrattamenti">'+TXT("NoResTrattamento")+'...</div>';
			HTML += '</div>';

			document.getElementById("lista_pazienti").innerHTML = HTML;
			
			if(ev>-1){
				setTimeout(function(){document.getElementById("cl_"+ev).parentElement.classList.remove("eviCiclo")},2000);
			}
			
			if(cartOpened)document.querySelector(".listaTrattamenti").classList.add("cont_cartellaAperta");
			if(typeof(Q_resta) == 'number')SCHEDA.btnSel = document.getElementById("btn_trattamento_"+Q_resta);
			if(Q_resta>-1 && SCHEDA.btnSel){
				try{
					SCHEDA.btnSel = document.getElementById(SCHEDA.btnSel.id);
					SCHEDA.btnSel.classList.add("elencoSel");
					SCHEDA.btnSel.parentElement.parentElement.classList.add("cartellaAperta");
					if(typeof(Q_resta) == 'number' && Q_resta>-1)setTimeout(function(){ SCHEDA.msgSalvataggio(); }, 200 );
				}catch(err){}
			}
		}
	},
	car_trattamento: function( Q_idTratt, btn, LabelCiclo, an, idCiclo, trasforma ){ // scheda del trattamento
		if(DRAGGER.moved)return;
		if(typeof(Q_idTratt)=='undefined')Q_idTratt=-1;
		if(typeof(LabelCiclo)=='undefined')LabelCiclo='';

		// verifico le autorizzazioni
		if(Q_idTratt==-1 && !LabelCiclo){ // solo se è anamnesi
			let cicliTot = 0;
			for(let c in PAZIENTI.cicli){
				if(PAZIENTI.cicli[c].Tipo == 'C')cicliTot++;
			}
			let maxCicli = PAZIENTI.maxCicli;
			if(LOGIN.reg() && LOGIN.logedin()){
				if(DB.login.data.auths.indexOf("clients_full")>-1)maxCicli = -1;
			}
			if(maxCicli>-1){
				if(cicliTot >= maxCicli && !document.body.classList.contains("pplhd")){
					ALERT(TXT("MsgMaxCicli").replace("[n]",(maxCicli==-1?"":maxCicli)));
					return;
				}
			}
		}
		// --------------------------
		
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(), 
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			MENU.nasMM();
			if(typeof(Q_idTratt)=='undefined')Q_idTratt=-1;
			if(typeof(idCiclo)=='undefined')idCiclo=-1;
			if(typeof(LabelCiclo)=='undefined')LabelCiclo='';
			if(typeof(an)=='undefined')an=false;
			if(typeof(btn)=='undefined')btn=null;
			
			let nuovoCiclo = Q_idTratt==-1 && idCiclo==-1 ? true : false,
				idTrattamento=0,
				TitoloTrattamento='',
				NoteTrattamento='',
				moduli=[],
				Anamnesi='',
				DiagnosiOccidentale='',
				DiagnosiMTC='',
				Prescrizione='',
				ConsiderazioniOperatore='',
				ConsiderazioniPaziente='',
				puntiMTC=[],
				puntiAuricolari=[],
				puntiPlantari=[],
				puntiNamikoshi=[],
				puntiTrigger=[],
				diagnosiAI='',
				TimeTrattamento=0,
				CostoTrattamento=0,
				ordine=0,
				sintomi=[],
				meridiani=[],
				gallery=[],
				TipoTrattamento='B',
				oraInizio=-1,
				oraFine=-1;
			PAZIENTI.modificaSaldo=false;
			PAZIENTI.saldoOp=false;
			if((LabelCiclo=='' && Q_idTratt==-1) || an)TipoTrattamento='A';
			
			for(let i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
				DB.pazienti.data[PAZIENTI.idCL].trattamenti[i].md5='';
			}
			if(Q_idTratt>-1){
				let TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt];
				oraInizio=120;
				oraFine=132;
				TR.id_interno=Q_idTratt;
				TR.md5=PAZIENTI.pazSelMD5;
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti));
				idTrattamento=TR.idTrattamento*1;
				TitoloTrattamento=TR.TitoloTrattamento;
				NoteTrattamento=TR.NoteTrattamento;
				moduli=__(TR.moduli,[]);
				Anamnesi=TR.Anamnesi;
				DiagnosiOccidentale=__(TR.DiagnosiOccidentale);
				DiagnosiMTC=__(TR.DiagnosiMTC);
				Prescrizione=__(TR.Prescrizione);
				ConsiderazioniOperatore=__(TR.ConsiderazioniOperatore);
				ConsiderazioniPaziente=__(TR.ConsiderazioniPaziente);
				ordine=__(TR.ordine,0);
				meridiani=toJson(__(TR.meridiani,[]));
				puntiMTC=__(TR.puntiMTC,[]);
				puntiAuricolari=toJson(__(TR.puntiAuricolari,[]));
				puntiPlantari=toJson(__(TR.puntiPlantari,[]));
				puntiNamikoshi=toJson(__(TR.puntiNamikoshi,[]));
				puntiTrigger=toJson(__(TR.puntiTrigger,[]));
				diagnosiAI=__(TR.diagnosiAI);
				sintomi=toJson(__(TR.sintomi,[]));
				gallery=toJson(__(TR.gallery,[]));
				
				TimeTrattamento=(TR.TimeTrattamento*1)/1000;
				if(typeof(TR.TipoTrattamento)!='undefined')TipoTrattamento=TR.TipoTrattamento;
				if(typeof(TR.LabelCiclo)!='undefined')LabelCiclo=TR.LabelCiclo;
				if(typeof(TR.CostoTrattamento)!='undefined')CostoTrattamento=TR.CostoTrattamento*1;
				if(typeof(TR.oraInizio)!='undefined')oraInizio=TR.oraInizio*1;
				if(typeof(TR.oraFine)!='undefined')oraFine=TR.oraFine*1;
				if(oraInizio<agenda.oraMin)oraInizio=agenda.oraMin+24;
				if(oraFine<agenda.oraMin)oraFine=agenda.oraMin+36;
				if(!TipoTrattamento)TipoTrattamento='B';
				if(trasforma){
					TipoTrattamento = 'A';
					LabelCiclo = TitoloTrattamento;
					TitoloTrattamento = '';
					DiagnosiOccidentale='';
					DiagnosiMTC='';
				}
			}else if(agenda.orarioDef){
				TimeTrattamento = agenda.orarioDef.data/1000000;
				oraInizio = agenda.orarioDef.oraInizio;
				oraFine = agenda.orarioDef.oraFine;
				agenda.init();
			}
			
			let sintomiCiclo = PAZIENTI.getSintomiCiclo(LabelCiclo);
			if(sintomiCiclo.length){
				for(let s in sintomiCiclo){
					for(let i in sintomi){
						if(sintomi[i].NomeSintomo == sintomiCiclo[s].NomeSintomo){
							sintomiCiclo[s].score = sintomi[i].score;
						}
					}
				}
				sintomi = sintomiCiclo;
			}
			
			
			agenda.init();
			let TimeAgenda = TimeTrattamento;
			if(!TimeTrattamento){
				TimeAgenda=new Date(oggi/1000);
				oraInizio = -1;
				oraFine = -1;
			}else{
				TimeTrattamento=new Date(TimeTrattamento*1000);
				TimeAgenda = TimeTrattamento;
			}
			PAZIENTI.sintomiEliminati=[];
			PAZIENTI.puntiProvvisori=clone(puntiMTC);
			PAZIENTI.auriculoProvvisori=clone(puntiAuricolari);
			PAZIENTI.reflexProvvisori=clone(puntiPlantari);
			PAZIENTI.triggerProvvisori=clone(puntiTrigger);
			PAZIENTI.namikoshiProvvisori=clone(puntiNamikoshi);
			PAZIENTI.sintomiProvvisori=clone(sintomi);
			PAZIENTI.meridianiProvvisori=clone(meridiani);
			PAZIENTI.moduliProvvisori=clone(moduli);
			PH.galleryProvvisoria=gallery;
			let HTML='';
			// GUIDA
			if(TipoTrattamento == 'A' && Q_idTratt<0){
				ordine = PAZIENTI.cicli.length-1;
				HTML += '<div style="text-align: right;"><div class="guide_scheda_btn"' +
						'	  id="btn_guida_ciclo"' +
						'	  onClick="GUIDA.visGuida(\'guida_ciclo\')">?</div></div>' +
						'<div class="guide_scheda"' +
						'	  id="guida_ciclo"' +
						'	  style="display:none">' +
						'	<div class="guide_chiudi"' +
						'		 onClick="GUIDA.nasGuida(\'guida_ciclo\');"></div>' +
						'	<div>' +
						'		<h2>' +
									htmlEntities(TXT("GuidaCicloTit")) +
						'		</h2>' +
						'		<p>' +
									htmlEntities(TXT("GuidaCiclo")).replace(/\n/g,"<br>") +
						'		</p>' +
						'	</div>' +
						'</div>';
			}
			
			if(TipoTrattamento != 'A'){
				HTML +=	'<div id="label_ciclo"';
				if(Q_idTratt>-1)HTML += ' class="label_ciclo_cambia noPrint" onClick="PAZIENTI.apriSpostaTrattamento('+Q_idTratt+');"';
				HTML += '><span>';
				if(LabelCiclo)HTML +=	htmlEntities(LabelCiclo);
				else HTML += htmlEntities(TXT("TrattamentiSingoli"));
				HTML +=	'</span></div>';
			}
			HTML +=	'<form id="formMod" name="formMod" method="post" onSubmit="return false;"';
			if(TipoTrattamento!='A'){
				HTML+=' style="background:url(img/f_';
				if(Q_idTratt>-1){
					if(TimeTrattamento*1>(oggi*1)/1000 || !TimeTrattamento)HTML+='timer';
					else HTML+='spunta';
				}else HTML+='new';
				HTML+='.png) no-repeat;"';
			}
			HTML+='>';
			
			// campi nascosti
			HTML += H.r({	t: "h", name: "stessa",				value: "1" 					}) +
					H.r({	t: "h", name: "idTrattamento",		value: idTrattamento*1 		}) +
					H.r({	t: "h", name: "idTratt",			value: Q_idTratt 			}) +
					H.r({	t: "h", name: "idCiclo",			value: idCiclo	 			}) +
					H.r({	t: "h", name: "md5",				value: PAZIENTI.pazSelMD5 	}) +
					H.r({	t: "h", name: "TimeTrattamento",	value: TimeTrattamento*1 	}) +
					H.r({	t: "h", name: "oraInizio",			value: oraInizio 			}) +
					H.r({	t: "h", name: "oraFine",			value: oraFine 				}) +
					H.r({	t: "h", name: "LabelCicloOr",		value: LabelCiclo 			}) +
					H.r({	t: "h", name: "ordine",				value: ordine 				});
			
			if(TipoTrattamento!='A'){
				HTML += H.r({	t: "h", name: "TipoTrattamento",	value: "B" 				}) +
						H.r({	t: "h", name: "LabelCiclo",			value: LabelCiclo 		});
			}else{
				
				let LC='';
				if(Q_idTratt==-1 && !LabelCiclo){
					if(an)LC=TXT("CicloTrattamenti");
				}else LC=LabelCiclo;
				HTML += H.r({	t: "h", name: "TipoTrattamento",	value: "A" 				}) +
						H.r({	t: "h", name: "LabelCiclo_C",		value: LabelCiclo 		}) +
						H.r({	t: "r",	
								name: "LabelCiclo",	
								value: LC,
								ver: '1|0',
								label: TXT("Ciclo"),
								classCampo: 'styled' }) +
						H.r({	t: "h",
								name: "TitoloTrattamento",
								value: TXT("Anamnesi"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')) });
				if(nuovoCiclo){
					HTML +=  	'<div style="text-align:right;"><div id="anamnesi_btn"' +
								'		   onClick="PAZIENTI.vis_anamnesi();">'+htmlEntities(TXT("SchedaAnamnesi"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')))+'</div></div>' +
								'<div style="display:none;"' +
								'	  id="anamnesi_cont">'; // nascondo tutto se è un nuovo ciclo
				}
			}
			let TXT_DT=TXT("Data");
			if(TimeTrattamento*1>(oggi*1)/1000)TXT_DT=TXT("DataProgrammata");
			
			let DT;
			if(!TimeTrattamento)DT='... '+htmlEntities(TXT("ScegliData"));
			else{
				oI = parseInt(oraInizio/12)+':'+twoDigits((oraInizio%12)*5)+"";
				oF = parseInt(oraFine/12)+':'+twoDigits((oraFine%12)*5)+"";
				DT="<b>"+getFullDataTS(TimeTrattamento)+"</b> ("+oI+" - "+oF+")";
			}
			let TM = {
				data: TimeAgenda*1000,
				oraInizio: oraInizio,
				oraFine: oraFine
			}
			agenda.opened = false;
			let separatore = 
					'<div class="sezioneTrattamenti divEspansa"'+
					'     style="background:transparent !important;'+
					'		     border-top:none !important;'+
					'			 padding: 0px;">'+
					'</div>';
			if(TipoTrattamento!='A' || (TipoTrattamento=='A' && oraInizio>-1)){		
				// AGENDA
				HTML +=	
					'<div id="dataTratt" class="labelSx">' +
					'	<i class="vis">'+TXT_DT+':</i>' +
					'	<div onClick="	PAZIENTI.swAgenda('+(TimeAgenda*1000)+',' +
					'						document.getElementById(\'agendaPlaceHolder\'),' +
					'						\'PAZIENTI.selData\',this,'+Q_idTratt+');" ' + 
					'						data-d=\''+JSON.stringify(TM)+'\'' +
					'	     id="dataTxt">' +
							DT +
					'	</div>' +
					'</div>' +
					'<div id="agendaPlaceHolder"' +
					'	  style="height:1px !important;' +
					' 			 margin-bottom: 0px;">' +
					'</div>' +
					'<div class="l" style="height:1px !important;"></div>' +
			
					// costo e saldo
					H.r({	t: "r",	
								name: "CostoTrattamento",	
								value: (CostoTrattamento) ? ArrotondaEuro(CostoTrattamento) : '',
								ver: '0|0|num',
								label: TXT("Costo")+' '+getValuta(),
								keyupCampo: "H.keyPrezzo(this);",
								classCampo: 'CostoTrattDx prezzi',
								classRiga: "labelSx",
								styleRiga: "text-align:right;" });
			}else{
				HTML += H.r({	t: "h", name: "CostoTrattamento",		value: CostoTrattamento*1 		});
			}
			if(TipoTrattamento!='A'){
				HTML += H.r({	t: "r",	
								name: "TitoloTrattamento",	
								value: TitoloTrattamento,
								label: TXT("Etichetta"),
								classCampo: 'TitTrattDx',
								classRiga: "labelSx",
								styleRiga: "text-align:right;" });
			}

			

			HTML += '<div class="labelTrattamento noBorder">'+TXT("labelRaccoltaDati")+'</div>';	
			

			// DATI PAZIENTE

			// dati generici
			let PZ = DB.pazienti.data[PAZIENTI.idCL],
				DataNascita = 0,
				HTML_generici = '';
			if(PZ.DataNascita!='0000-00-00')DataNascita = new Date(PZ.DataNascita);
			if(DataNascita){
				let eta = oggi.getFullYear() - DataNascita.getFullYear();
				HTML_generici += 
					'		<div>'+
					'			<span>'+htmlEntities(TXT("Eta"))+':</span> '+eta+
					'		</div>';
			}
			if(PZ.Professione){
				HTML_generici += 
					'		<div>'+
					'			<span>'+htmlEntities(TXT("Professione"))+':</span> '+PZ.Professione+
					'		</div>';
			}
			etichette = toJson(PZ.etichette);
			H.etichetteProvvisorie = clone(etichette);
			HTML_generici += H.scriviEtichette('aggiuntive').replace(/<i>/g,"<span>").replace(/<\/i>/g,"</span>");

			let HTML_ana = '';
			if(PZ.Altezza.trim()){
				HTML_ana += '<div><span>'+htmlEntities(convertMisure(TXT("Altezza")))+':</span> ' + htmlEntities(PZ.Altezza) + '</div>';
			}
			if(PZ.Peso.trim()){
				HTML_ana += '<div><span>'+htmlEntities(convertMisure(TXT("Peso")))+':</span> ' + htmlEntities(PZ.Peso) + '</div>';
			}

			PAZIENTI.medicineProvvisorie = clone(PZ.medicine);
			PAZIENTI.allergieProvvisorie = clone(PZ.allergie);
			PAZIENTI.patologieProvvisorie = clone(PZ.patologie);
			PAZIENTI.interventiProvvisori = clone(PZ.interventi);
			obj = PAZIENTI.defElemento( 'medicine' );
			if(obj.ELS.length>0){
				
				HTML_ana +=	'	<div class="rgAnag rgMedicine">' +
						'			<div>';
				for(let p in obj.ELS){
					HTML_ana += '<span class="tag" style="background-color:#FFF;">' +
								htmlEntities(obj.ELS[p].NomeMedicina) +
							'</span>';
				}
				HTML_ana += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
			}
			
			
			obj = PAZIENTI.defElemento( 'allergie' );
			if(obj.ELS.length>0){
				
				HTML_ana+=	'	<div class="rgAnag rgAllergie">' +
						'			<div>';
				for(let p in obj.ELS){
					HTML_ana += '<span class="tag" style="background-color:#FFF;">' +
								htmlEntities(obj.ELS[p].NomeAllergia) +
							'</span>';
				}
				HTML_ana += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
			}
			
			
			obj = PAZIENTI.defElemento( 'patologie' );
			if(obj.ELS.length>0){
				
				HTML_ana +=	'	<div class="rgAnag rgPatologie">' +
						'			<div>';
				for(let p in obj.ELS){
					HTML_ana += '<span class="tag" style="background-color:#FFF;">' +
								htmlEntities(obj.ELS[p].NomePatologia) +
							'</span>';
				}
				HTML_ana += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
			}
			
			
			obj = PAZIENTI.defElemento( 'interventi' );
			if(obj.ELS.length>0){
				
				HTML_ana +=	'	<div class="rgAnag rgInterventi">' +
						'			<div>';
				for(let p in obj.ELS){
					HTML_ana += '<span class="tag" style="background-color:#FFF;">' +
								htmlEntities(obj.ELS[p].NomeIntervento) +
							'</span>';
				}
				HTML_ana += '			</div>' +
						'		<div class="l"></div>' +
						'	</div>';
			}

			
			if(HTML_generici || HTML_ana){
				HTML += '<div id="tratt_cont_datipaziente"' +
						'	  class="sezioneTrattamenti divEspansa '+ 
								((localStorage.getItem("op_datipaziente")) ? '' : 'sezioneChiusa') +
								'">' +	
						'	<em class="labelMobile labelTrattamenti"' +
						'  		onClick="H.swSezione(this);">' +
						'		<img class="icoLabel"' +
						'			 src="img/ico_aggiuntive.png">' +
									TXT("DatiPaziente"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')) +
						'	</em>' +
						'	<div id="contDatipaziente">';
				if(HTML_generici)HTML += 
						'		<div id="datiGenericiPaziente">' +
						HTML_generici +
						'		</div>';
				if(HTML_ana)HTML += 
						'		<div id="datiAnamnesiPaziente">' +
									HTML_ana +
						'		</div>';
				HTML += '	</div>' +
						'</div>';
			}



					// ANAMNESI
			HTML += '<div id="tratt_cont_anamnesi"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
							((localStorage.getItem("op_anamnesi")) ? '' : 'sezioneChiusa') +
							'">' +	
					'	<em class="labelMobile labelTrattamenti"' +
					'  		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'			 src="img/ico_anamnesi.png">' +
								TXT("Anamnesi"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')) +
					'	</em>' +
					'	<div id="contAnamnesi">'+
					H.r({	t: "t",	
							name: "Anamnesi",	
							value: Anamnesi,
							noLabel: true,
							styleCampo: "margin-bottom:10px;margin-top:8px;" }) +
					'	</div>' +
					'	<div id="modulo"'+(Object.keys(moduli).length?' class="moduloFull"':'')+
					//' style="display:none;"' + // MOMENTANEAMENTE NASCOSTO
					'>' +
					'		<div id="modulo_cont"></div>' +
					'		<div id="moduli_titolo">'+TXT("ElSchedeAnamnesi")+'</div>' +
					'		<div id="modulo_btn_cont">' +
					'			<img src="img/ico_timer_mini.png" style="height:20px;margin-right:10px;vertical-align:middle;" title="'+TXT("TimerModuliFree")+'">' +
					'			<div id="modulo_btn" onClick="PAZIENTI.swImportaModuli();">'+TXT("ImportaModulo")+'</div>' +
					'			<div id="modulo_crea" onClick="MODULI.car_modulo(-1,false,true);">'+TXT("CreaNuovo")+'</div>' +
					'		</div>' +
					'	</div>' +
					'</div>' +


					// SINTOMI
					'<div id="tratt_cont_sintomi"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_sintomi")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em class="labelMobile labelTrattamenti"' +
					'  		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'			 src="img/ico_sintomi.png">' +
							TXT("Sintomi")+' (<span id="totSintomi"></span>)'+
					'	</em>' +
					'	<div id="contSintomi"></div>' +
					
					'<div id="cont_label_add_sintomi"' +
					'	  class="cont_label_add">' +
					'	<input type="text"' +
					'		   id="paz_add"' +
					'		   placeholder="'+htmlEntities(stripslashes(TXT("SintomoSpiegazione")))+'"' +
					'		   autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"' +
					'		   onKeyup="PAZIENTI.filtraSintomi(this);"/>' +
					'	<div class="p_label_add"' +
					'		 onClick="PAZIENTI.aggiungiSintomo();">' +
							TXT("Aggiungi") +
					'	</div>' +
					'	<div class="p_label_ann"' +
					'		 onClick="PAZIENTI.annullaSintomo();">' +
							TXT("Annulla") +
					'	</div>' +
					'	<span id="label_close"' +
					'		  onClick="PAZIENTI.nasAggiungiSintomo();">' +
					'	</span>' +
					'	<div id="elencoSintomi">' +
					'	</div>' +
					'	<div class="l"></div>' +
					'</div>' +
					'<div class="cont_p_paz_label noPrint">' +
					'	<div class="p_paz_label"' +
					'		 id="p_paz_label_sintomi"' +
					'			 onclick="PAZIENTI.visAggiungiSintomo();">' +
							htmlEntities(TXT("AggiungiSintomo")) +
					'	</div>'+
					'</div>' +

					'	<div class="l_a"></div>' +
					'</div>' +
			
					// GALLERY
					'<div id="tratt_cont_gallery"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_gallery")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em class="labelMobile labelTrattamenti"' +
					'		onClick="H.swSezione(this);PH.resizeDida();">' +
					'		<img class="icoLabel"' +
					'		     src="img/ico_foto.png">' +
							TXT("Gallery")+' (<span id="totFiles"></span>)' +
					'	</em>' +
					'	<div id="contGallery"' +
					'		 class="divEspansa contGallery">' +
					'	</div>' +
					'	<div id="p_add_dett"' +
					'		 class="noPrint"' +
					'		 style="margin-top: 0px;">' +
					'		<input type="file"' +
					'			   id="fileProvv_FL"' +
					'			   class="p_paz_file"' +
					'		       onChange="PH.selezionaFile(this);">' +
					'		<span id="addFile">' +
								TXT("AggiungiFile") +
					'		</span>' +
					'		<span class="p_paz_screenshot"' +
					'		      onClick="PH.editImg(true);"></span>' +
					'		<span id="screenShot">' +
								TXT("ScreenShot") +
					'		</span>' +
					'		<span class="p_paz_choose"' +
					'		      onClick="MENU.visArchives();"></span>' +
					'		<span id="chooFile">' +
								TXT("ScegliFile") +
					'		</span>' +
					'	</div>' +
					'</div>';
			
			HTML += '<div id="tratt_cont_diagnosi"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
					((localStorage.getItem("op_diagnosi")) ? '' : 'sezioneChiusa') +
					'">' +	
					'	<em class="labelMobile labelTrattamenti"' +
					'  		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'			 src="img/ico_diagnosi'+(globals.set.cartella=='meridiani_shiatsu'?'_shiatsu':'')+'.png">' +
							TXT("Diagnosi"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')) +
					'	</em>'+	
					
					// DIAGNOSI
					'	<div id="contDiagnosiMTC" class="contDiagnosiAI'+(diagnosiAI?' fullAI':'')+'">'+
					'		<div class="spiegazioneAI"><div class="requestAI" onClick="AI.get_gettoni(true);">'+TXT("DiagnosiAI")+'</div></div>'+
					'		<div class="diagnosiAI">'+
					'			<div class="diagnosiAI_txt" id="diagnosiAI">'+diagnosiAI+'</div>'+
					'			<div class="diagnosiBtns">'+
					'				<img src="img/ico_disclaimer.png" class="disclaimerAI" title="'+TXT("DisclaimerAI")+'" onClick="AI.popup();"/>'+
					'				<div class="diagnosiAzione" onClick="AI.diagnosi_addPoints();">'+TXT("DiagnosiAddPoints")+'</div>'+
					'				<img class="diagnosiCancella" src="img/ico_cestino.png" width="16" height="16" align="absmiddle" title="'+TXT("Elimina")+'" onclick="AI.diagnosi_delete();" class="cestino">'+
					'			</div>'+
					'		</div>'+
					'	</div>'+
					'	<div id="contDiagnosi" style="min-height:240px;">'+
					'		<div class="l"></div>' +
					'		<div class="schDx">' +
					H.r({	t: "t",	
							name: "DiagnosiOccidentale",	
							value: DiagnosiOccidentale,
							label: TXT("DiagnosiOccidentale"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')),
							styleCampo: "margin-bottom:10px;" }) +
					'		</div>' +
					'		<div class="schSx">' +
					H.r({	t: "t",	
							name: "DiagnosiMTC",	
							value: DiagnosiMTC,
							label: TXT("DiagnosiMTC"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')),
							styleCampo: "margin-bottom:10px;" }) +
					'		</div>' +
					'		<div class="l"></div>' +
					'	</div>'+
					'</div>';
					
			HTML += '<div class="labelTrattamento" id="labelTrattamento">'+TXT("labelTrattamento")+'</div>' +

					// POPUP di caricamento punti e meridiani
					'<div id="gruppoPunti_cont"></div>' +
			
					// PUNTI MTC
					'<div id="tratt_cont_punti"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_punti")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em id="label_puntiMTC"' +
					'		class="labelMobile labelTrattamenti"' +
					'		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'		     src="img/ico_punti.png">' +
					TXT("PuntiMTC")+' (<span id="totPunto"></span>)' +
					'	</em>' +
					'	<div id="puntiMTC">' +
					'	</div>' +
					'	<div id="tratt_btns_punti"' +
					'		 class="noPrint"></div>' +
					'</div>' +
			
					// PUNTI NAMIKOSHI
					'<div id="tratt_cont_namikoshi"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_namikoshi")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em id="label_puntiNamikoshi"' +
					'		class="labelMobile labelTrattamenti"' +
					'		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'		     src="img/ico_namikoshi.png">' +
							TXT("PuntiNamikoshi")+' (<span id="totNamikoshi"></span>)' +
					'	</em>' +
					'	<div id="puntiNamikoshi">' +
					'	</div>' +
					'	<div id="tratt_btns_namikoshi"' +
					'		 class="noPrint"></div>' +
					'</div>' +
			
					// MERIDIANI
					'<div id="tratt_cont_meridiani"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_meridiani")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em id="label_meridianiMTC"' +
					'		class="labelMobile labelTrattamenti"' +
					'		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'		     src="img/ico_meridiani.png">' +
					TXT("MeridianiTrattamento")+' (<span id="totMeridiani"></span>)' +
					'	</em>' +
					'	<div id="meridianiMTC">' +
					'	</div>' +
					'	<div id="tratt_btns_meridiani"' +
					'		 class="noPrint"></div>' +
					'</div>' +
			
					// AURICULO
					'<div id="tratt_cont_auriculo"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_auriculo")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em id="label_puntiAuricolari"' +
					'		class="labelMobile labelTrattamenti"' +
					'		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'		     src="img/ico_auriculo.png">' +
							TXT("PuntiAuriculo")+' (<span id="totAuriculo"></span>)' +
					'	</em>' +
					'	<div id="puntiAuricolari">' +
					'	</div>' +
					'	<div id="tratt_btns_auriculo"' +
					'		 class="noPrint"></div>' +
					'</div>' +
			
					// REFLEX
					'<div id="tratt_cont_reflex"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_reflex")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em id="label_puntiPlantari"' +
					'		class="labelMobile labelTrattamenti"' +
					'		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'		     src="img/ico_reflex.png">' +
							TXT("PuntiReflex")+' (<span id="totReflex"></span>)' +
					'	</em>' +
					'	<div id="puntiPlantari">' +
					'	</div>' +
					'	<div id="tratt_btns_reflex"' +
					'		 class="noPrint"></div>' +
					'</div>' +
			
					// TRIGGER
					'<div id="tratt_cont_trigger"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_trigger")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em id="label_puntiTrigger"' +
					'		class="labelMobile labelTrattamenti"' +
					'		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'		     src="img/ico_trigger.png">' +
							TXT("PuntiTrigger")+' (<span id="totTrigger"></span>)' +
					'	</em>' +
					'	<div id="puntiTrigger">' +
					'	</div>' +
					'	<div id="tratt_btns_trigger"' +
					'		 class="noPrint"></div>' +
					'</div>' +

					// NOTE TRATTAMENTO
					'<div id="tratt_cont_notetrattamento"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
							((localStorage.getItem("op_notetrattamento")) ? '' : 'sezioneChiusa') +
							'">' +	
					'	<em class="labelMobile labelTrattamenti"' +
					'  		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'			 src="img/ico_notetrattamento.png">' +
							TXT("NoteTrattamento") +
					'	</em>' +
					'	<div id="contNotetrattamento">'+
					H.r({	t: "t",	
							name: "NoteTrattamento",	
							value: NoteTrattamento,
							noLabel: true,
							styleCampo: "margin-bottom:10px;margin-top:8px;" }) +
					'	</div>' +
					'</div>' +
					
					'<div class="labelTrattamento">'+TXT("labelConsiderazioniFineTrattamento")+'</div>' +

					// CONSIDERAZIONI
					'<div id="tratt_cont_considerazioni"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
							((localStorage.getItem("op_considerazioni")) ? '' : 'sezioneChiusa') +
							'">' +	
					'	<em class="labelMobile labelTrattamenti"' +
					'  		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'			 src="img/ico_considerazioni.png">' +
							TXT("Considerazioni") +
					'	</em>' +

					'	<div id="contConsiderazioni" style="min-height:240px;">'+
					'		<div class="l"></div>' +
					'		<div class="schDx">' +
					H.r({	t: "t",	
							name: "ConsiderazioniOperatore",	
							value: ConsiderazioniOperatore,
							label: TXT("ConsiderazioniOperatore"),
							styleCampo: "margin-bottom:10px;" }) +
					'		</div>' +
					'		<div class="schSx">' +
					H.r({	t: "t",	
							name: "ConsiderazioniPaziente",	
							value: ConsiderazioniPaziente,
							label: TXT("ConsiderazioniPaziente"),
							styleCampo: "margin-bottom:10px;" }) +
					'		</div>' +
					'		<div class="l"></div>' +
					'	</div>' +
					'</div>' +

					// PRESCRIZIONE
					'<div id="tratt_cont_prescrizione"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
							((localStorage.getItem("op_prescrizione")) ? '' : 'sezioneChiusa') +
							'">' +	
					'	<em class="labelMobile labelTrattamenti"' +
					'  		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'			 src="img/ico_prescrizione.png">' +
							TXT("Prescrizione"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')) +
					'	</em>' +	
					'	<img src="img/ico_stampa.png"' +
					'		 id="stampa_prescr"' +
					'		 class="noPrint"' +
					'		 onClick="SCHEDA.stampaScheda({\'titolo\':\''+addslashes(htmlEntities(TXT("Prescrizione")))+'\',\'corpo\':document.formMod.Prescrizione.value,\'intestazione\':DB.pazienti.data[PAZIENTI.idCL].Nome+\' \'+DB.pazienti.data[PAZIENTI.idCL].Cognome});">' +	
					'	<div id="contPrescrizione">'+
					H.r({	t: "t",	
							name: "Prescrizione",	
							value: Prescrizione,
							noLabel: true,
							styleCampo: "margin-bottom:10px;margin-top:8px;" }) +
					'	</div>' +
					'</div>';
					
			if(nuovoCiclo)HTML += '</div>';		 // nascondo tutto se è un nuovo ciclo
			HTML += '</form>';

			HTML += '<div id="cont_sceltaAppuntamento">' +
					'</div>';
			
			let azElimina = Q_idTratt>-1 ? 'PAZIENTI.el_trattamento('+Q_idTratt+')' : "",
				btnAdd = '';
			if(azElimina){
				btnAdd += 	'<div class="p_paz_el_menu" onClick="'+azElimina+'">' +
								((TipoTrattamento=='A') ? TXT("EliminaCartella") : TXT("EliminaScheda")) +
					     	'</div>';
			}
			btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.patients.treatments\')">' +
							TXT("ReferenceGuide") +
					    '</div>';
			
			// pulsanti SALVA, ANNULLA e ELIMINA
			HTML += SCHEDA.pulsantiForm( 	Q_idTratt>-1 ? 'PAZIENTI.el_trattamento('+Q_idTratt+')':"",
											"SCHEDA.scaricaScheda();", 
											"PAZIENTI.mod_trattamento();" );
			
			HTML+='<div class="l"></div>';
			
			if(Q_idTratt>-1 || an){
				if(TipoTrattamento=='A')titoloDef=TXT("SchedaAnamnesi"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':''));
				else titoloDef=TXT("ModificaTrattamento");
			}else{
				if(TipoTrattamento=='A')titoloDef=TXT("CicloTrattamenti");
				else titoloDef=TXT("CreaTrattamento");
			}
			
			SCHEDA.caricaScheda(	stripslashes(titoloDef),
									HTML,
									'PAZIENTI.chiudiTrattamento('+idTrattamento+');',
									'scheda_'+TipoTrattamento,
									false,
									true,
									btn,
									btnAdd );
			if(mouseDetect){
				if(TipoTrattamento!='A')document.formMod.TitoloTrattamento.focus();
				else document.formMod.LabelCiclo.focus();
			}
			
			if(TipoTrattamento=='A' || !LabelCiclo)PAZIENTI.popolaSintomi();
			PAZIENTI.caricaDettagliSet(); // carico le schede dei singoli sets
			PAZIENTI.caricaSintomi();
			PAZIENTI.popolaModuli();
			PH.caricaGallery();
			PAZIENTI.trattOp = true;
			initChangeDetection( "formMod" );
			SCHEDA.formModificato = false;
			
			// verifico che non sia già aperta da qualcun altro e intanto la blocco
			LOGIN.verifyLocked("trattamenti",idTrattamento);
			
		}});
	},
	caricaDettagliSet: function(){ // carica i dettagli trattamento dei singoli set
		// PUNTI
		let HTML = '',
			html_licenzaNonPermette = '<div class="labelModificaCon labelNoLicenza" onClick="MENU.visLicenze();">'+TXT("LicenzaNonPermette")+'</div>';
		if( globals.set.cartella == 'meridiani_cinesi' ||
			(globals.set.cartella == 'meridiani_shiatsu' && LOGIN.verModule("CIN")) ){
			HTML+=
				'	<div id="p_add_dett"' +
				'		 class="noPrint">' +
				'		<div id="grpPt"' +
				'		    class="p_paz_gruppo"' +
				'		    onClick="PAZIENTI.gruppoPunti(\'P\');">' +
							htmlEntities(TXT("AggiungiPunti")) +
				'		</div>' +
				'	</div>';
		}else if(LOGIN.logedin() && (LOGIN.verModule("CIN") || LOGIN.verAuth('meridiani_cinesi'))){
			HTML += '<div class="labelModificaCon">'+htmlEntities(TXT("ModificaCon"))+'<br>';
			if(LOGIN.verAuth('meridiani_cinesi'))HTML += '<span onClick="caricaSet(\'meridiani_cinesi\',this);"><img src="sets/meridiani_cinesi/img/logoNero.png" width="25" height="25"> AcupointsMap</span>';
			if(LOGIN.verModule("CIN") && LOGIN.verAuth('meridiani_cinesi'))HTML += ' o ';
			if(LOGIN.verModule("CIN"))HTML += '<span onClick="caricaSet(\'meridiani_shiatsu\',this);"><img src="sets/meridiani_shiatsu/img/logoNero.png" width="25" height="25"> ShiatsuMap</span>';
			HTML += '</div>';
		}else{
			HTML += html_licenzaNonPermette;
		}
		document.getElementById("tratt_btns_punti").innerHTML = HTML;
		PAZIENTI.caricaPuntiTrattamento();
		
		// PUNTI NAMIKOSHI
		HTML = '';
		if( globals.set.cartella == 'meridiani_shiatsu' && LOGIN.verModule("NMK") ){
			HTML+=
				'	<div id="p_add_dett"' +
				'		 class="noPrint">' +
				'		<div id="grpNmk"' +
				'		    class="p_paz_gruppo"' +
				'		    onClick="PAZIENTI.gruppoPunti(\'N\');">' +
							htmlEntities(TXT("AggiungiPunti")) +
				'		</div>' +
				'	</div>';
		}else if(LOGIN.logedin() && LOGIN.verModule("NMK")){
			HTML += '<div class="labelModificaCon">'+htmlEntities(TXT("ModificaCon"))+'<br><span onClick="caricaSet(\'meridiani_shiatsu\',this);"><img src="sets/meridiani_shiatsu/img/logoNero.png" width="25" height="25"> ShiatsuMap</span></div>';
		}else{
			HTML += html_licenzaNonPermette;
		}
		document.getElementById("tratt_btns_namikoshi").innerHTML = HTML;
		PAZIENTI.caricaNamikoshiTrattamento();
		
		// MERIDIANI
		HTML = '';
		if( globals.set.cartella == 'meridiani_cinesi' || 
			(globals.set.cartella == 'meridiani_shiatsu' && (LOGIN.verModule("CIN") || LOGIN.verModule("MAS"))) ){
			HTML+=
				'	<div id="p_add_dett">' +
				'		<div id="grpMrd"' +
				'		    class="p_paz_meridiani"' +
				'		    onClick="PAZIENTI.gruppoPunti(\'M\');">' +
							htmlEntities(TXT("AggiungiMeridiani")) +
				'		</div>' +
				'	</div>';
		}else if(LOGIN.logedin() && (LOGIN.verModule("CIN") || LOGIN.verModule("MAS") || LOGIN.verAuth('meridiani_cinesi'))){
			HTML += '<div class="labelModificaCon">'+htmlEntities(TXT("ModificaCon"))+'<br>';
			if(LOGIN.verAuth('meridiani_cinesi'))HTML += '<span onClick="caricaSet(\'meridiani_cinesi\',this);"><img src="sets/meridiani_cinesi/img/logoNero.png" width="25" height="25"> AcupointsMap</span>';
			if((LOGIN.verModule("CIN") || LOGIN.verModule("MAS")) && LOGIN.verAuth('meridiani_cinesi'))HTML += ' o ';
			if(LOGIN.verModule("CIN") || LOGIN.verModule("MAS"))HTML += '<span onClick="caricaSet(\'meridiani_shiatsu\',this);"><img src="sets/meridiani_shiatsu/img/logoNero.png" width="25" height="25"> ShiatsuMap</span>';
			HTML += '</div>';
		}else{
			HTML += html_licenzaNonPermette;
		}
		document.getElementById("tratt_btns_meridiani").innerHTML = HTML;
		PAZIENTI.caricaMeridianiTrattamento();
		
		// AURICOLO-PUNTI
		HTML = '';
		if( globals.set.cartella == 'auricologia' ){
			HTML+=
				'	<div id="p_add_dett"' +
				'		 class="noPrint">' +
				'		<div id="grpAur"' +
				'		    class="p_paz_gruppo"' +
				'		    onClick="PAZIENTI.gruppoPunti(\'A\');">' +
							htmlEntities(TXT("AggiungiPunti")) +
				'		</div>' +
				'	</div>';
		}else if(LOGIN.logedin() && LOGIN.verAuth('auricologia')){
			HTML += '<div class="labelModificaCon">'+htmlEntities(TXT("ModificaCon"))+'<br><span onClick="caricaSet(\'auricologia\',this);"><img src="sets/auricologia/img/logoNero.png" width="25" height="25"> AuriculoMap</span></div>';
		}else{
			HTML += html_licenzaNonPermette;
		}
		document.getElementById("tratt_btns_auriculo").innerHTML = HTML;
		PAZIENTI.caricaAuriculoTrattamento();
		
		// AREE PIEDE
		HTML = '';
		if( globals.set.cartella == 'reflessologia_plantare' ){
			HTML+=
				'	<div id="p_add_dett"' +
				'		 class="noPrint">' +
				'		<div id="grpRfx"' +
				'		    class="p_paz_gruppo"' +
				'		    onClick="PAZIENTI.gruppoPunti(\'R\');">' +
							htmlEntities(TXT("AggiungiAree")) +
				'		</div>' +
				'	</div>';
		}else if(LOGIN.logedin() && LOGIN.verAuth('reflessologia_plantare')){
			HTML += '<div class="labelModificaCon">'+htmlEntities(TXT("ModificaCon"))+'<br><span onClick="caricaSet(\'reflessologia_plantare\',this);"><img src="sets/reflessologia_plantare/img/logoNero.png" width="25" height="25"> ReflexologyMap</span></div>';
		}else{
			HTML += html_licenzaNonPermette;
		}
		document.getElementById("tratt_btns_reflex").innerHTML = HTML;
		PAZIENTI.caricaReflexTrattamento();

		// PUNTI-TRIGGER
		HTML = '';
		if( globals.set.cartella == 'trigger_points' ){
			HTML+=
				'	<div id="p_add_dett"' +
				'		 class="noPrint">' +
				'		<div id="grpTrp"' +
				'		    class="p_paz_gruppo"' +
				'		    onClick="PAZIENTI.gruppoPunti(\'O\');">' +
							htmlEntities(TXT("AggiungiPunti")) +
				'		</div>' +
				'	</div>';
		}else if(LOGIN.logedin() && LOGIN.verAuth('trigger_points')){
			HTML += '<div class="labelModificaCon">'+htmlEntities(TXT("ModificaCon"))+'<br><span onClick="caricaSet(\'trigger_points\',this);"><img src="sets/trigger_points/img/logoNero.png" width="25" height="25"> TriggerpointsMap</span></div>';
		}else{
			HTML += html_licenzaNonPermette;
		}
		document.getElementById("tratt_btns_trigger").innerHTML = HTML;
		PAZIENTI.caricaTriggerTrattamento();


	},
	apriSpostaTrattamento: function( Q_idTratt){ // fa comparire l'elemento fluttuante che sposta un elemento
		applicaLoading(document.getElementById("scheda_testo"),'vuoto');
		let HTML =  '<div id="titCartelle">'+htmlEntities(TXT("SpostaIn"))+'<span onClick="PAZIENTI.chiudiSpostaTrattamento();"></span></div>' +
					'<div id="elencoCartelle">';
		for(let c in PAZIENTI.cicli){
			if(PAZIENTI.cicli[c].NomeCiclo != document.formMod.LabelCiclo.value){
				HTML += '	<div onClick="PAZIENTI.spostaTrattamento(this);"' +
						'		 data-id="'+PAZIENTI.cicli[c].p+'">'+PAZIENTI.cicli[c].NomeCiclo+'</div>';
			}
		}
		HTML += 	'</div>';
		let cont = document.getElementById("gruppoPunti_cont"),
			w = (document.getElementById("scheda_testo").scrollWidth-60),
			l = 30,
			maxW = 400;
		cont.innerHTML = HTML;
		cont.scrollTo(0,0);
		if(w>maxW){
			w = maxW;
			l = (document.getElementById("scheda").scrollWidth/2-maxW/2);
		}
		cont.style.left = l+"px";
		cont.style.width = w+"px";
		cont.style.top = '118px';
		cont.classList.add("cartelle");
		cont.classList.add("visSch");
	},
	spostaTrattamento: function( el ){ // sposta il trattamento
		document.getElementById("label_ciclo").innerHTML = '<span>'+htmlEntities(el.innerText)+'</span>';
		document.formMod.LabelCiclo.value = el.innerText;
		document.formMod.idCiclo.value = el.dataset.id;
		PAZIENTI.chiudiSpostaTrattamento();
	},
	chiudiSpostaTrattamento: function(){ // chiude l'elemento fluttuante che sposta l'elemento
		document.getElementById("gruppoPunti_cont").classList.remove("visSch");
		document.getElementById("gruppoPunti_cont").classList.remove("cartelle");
		rimuoviLoading(document.getElementById("scheda_testo"));
	},
	chiudiTrattamento: function( idTrattamento ){ // funzione chiamata alla chiusura del trattamento
		try{
			SET.annullaEvidenziaPunto();
			SET.spegniMeridiani(true);
		}catch(err){}
		SCHEDA.formModificato = false;
		PAZIENTI.trattOp = false;
			
		// tolgo il blocco online dall'elemento
		LOGIN.closeLocked("trattamenti",idTrattamento);
	},
	moveTratt: function( el, cont){ // onmove: sposta il trattamento
		if(!cont)return;
		if(el.dataset.typeDrag != cont.dataset.typeDrag)return;
		let idTrattamento = el.id.split("_")[2],
			label = cont.getElementsByTagName("span")[0],
			idCiclo = label.id.split("_")[1],
			LabelCiclo = PAZIENTI.cicli[idCiclo].NomeCiclo,
			DataModifica = DB.pazienti.lastSync+1;
		CONFIRM.vis(	TXT("ChiediSpostaTrattamento").replace("[cartella]",LabelCiclo),
						false, 
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
						
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[idTrattamento].LabelCiclo = LabelCiclo;
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[idTrattamento].DataModifica = DataModifica;
			DB.pazienti.data[PAZIENTI.idCL].DataModifica = DataModifica;
			
			if(document.formMod?.idTratt){
				if(document.formMod.idTratt.value && document.formMod.idTratt.value*1 == idTrattamento*1){
					diffLabel = (document.formMod.LabelCiclo.value != document.formMod.LabelCiclo.dataset.origValue);
					diffId = (document.formMod.idCiclo.value != document.formMod.idCiclo.dataset.origValue);
					document.formMod.LabelCiclo.value = LabelCiclo;
					document.formMod.idCiclo.value = idCiclo;
					if(!diffLabel)document.formMod.LabelCiclo.dataset.origValue = document.formMod.LabelCiclo.value;
					if(!diffId)document.formMod.idCiclo.dataset.origValue = document.formMod.idCiclo.value;
					if(document.getElementById("label_ciclo"))document.getElementById("label_ciclo").getElementsByTagName("span")[0].innerHTML = LabelCiclo;
				}
			}
			applicaLoading(document.querySelector(".listaTrattamenti"));
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				SYNCRO.sincronizza(	'PAZIENTI.caricaTrattamenti();' +
									'rimuoviLoading(document.querySelector(".listaTrattamenti"));' );
				
			});
		}});
	},
	moveCiclo: function( el, cont ){ // onmove: sposta la cartella
		if(!cont)return;
		if(el==cont.getElementsByTagName("span")[0])return;
		let elMoved = parseInt(el.id.split("_")[1]),
			elTarget = parseInt(cont.getElementsByTagName("span")[0].id.split("_")[1]),
			o = 0,
			PZ =  DB.pazienti.data[PAZIENTI.idCL],
			TRS =PZ.trattamenti,
			DataModifica = DB.pazienti.lastSync+1;
		for(let c in PAZIENTI.cicli){
			if(PAZIENTI.cicli[c].Tipo == 'C' && parseInt(c)!=elMoved){
				if(parseInt(c)!=elMoved){
					o++;
					if(parseInt(c)==elTarget &&  DRAGGER.pushPos == 'before'){
						TRS[PAZIENTI.cicli[elMoved].p].ordine = o;
						TRS[PAZIENTI.cicli[elMoved].p].DataModifica = DataModifica;
						PAZIENTI.cicli[elMoved].ordine = o;
						o++;
					}
					TRS[PAZIENTI.cicli[c].p].ordine = o;
					TRS[PAZIENTI.cicli[c].p].DataModifica = DataModifica;
					PAZIENTI.cicli[c].ordine = o;
					if(parseInt(c)==elTarget &&  DRAGGER.pushPos == 'after'){
						o++;
						TRS[PAZIENTI.cicli[elMoved].p].ordine = o;
						TRS[PAZIENTI.cicli[elMoved].p].DataModifica = DataModifica;
						PAZIENTI.cicli[elMoved].ordine = o;
					}
				}
			}
		}
		PZ.DataModifica = DataModifica;
		PAZIENTI.caricaTrattamenti(false,elTarget);
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
			SYNCRO.sincronizza('PAZIENTI.caricaTrattamenti(false,'+elTarget+');');
			
		});
	},
	mod_trattamento: function(){ // salva il tratamento
		if(PAZIENTI.idCL>-1){
			stopAnimate(true);
			visLoader(TXT("SalvataggioInCorso"),'loadingLight');
			if(!ControllaNumero(document.formMod.CostoTrattamento,stripslashes(TXT("Costo"))))return;
			//if(agenda.oraFine>-1)agenda.conferma();
			LabelCiclo=document.formMod.LabelCiclo.value;
			TipoTrattamento=document.formMod.TipoTrattamento.value;
			let DataModifica = DB.pazienti.lastSync+1;
			
			if(agenda.opened)document.getElementById("dataTxt").click();

			// pulisco i sintomi
			for(let s in PAZIENTI.sintomiProvvisori){
				delete(PAZIENTI.sintomiProvvisori[s].nuovo);
			}
			if(TipoTrattamento=='A'){ // verifico non ci sia già LabelCiclo
				LabelCiclo_C=document.formMod.LabelCiclo_C.value;
				let presente=false;
				for(let i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
					let TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[i];
					if(	TR.Cancellato==0 && TR.LabelCiclo==LabelCiclo && (
							document.formMod.idTratt.value*1==-1 || 
							htmlEntities(TR.LabelCiclo )!=LabelCiclo_C)
						)presente=true;
				}
				if(presente && document.formMod.LabelCicloOr.value == ''){
					ALERT(TXT("CicloPresente"));
					return;
				}
				if(LabelCiclo!=LabelCiclo_C && document.formMod.idTratt.value*1>-1){ // se cambio il nome del ciclo, lo cambio a tutti i trattamenti
					for(let i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
						let TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[i];
						if(TR.LabelCiclo=='0'){
							TR.LabelCiclo='';
						}
						if(TR.LabelCiclo==LabelCiclo_C){
							TR.LabelCiclo=LabelCiclo;
							TR.DataModifica=DataModifica;
						}
					}
					PAZIENTI.aperture[LabelCiclo] = PAZIENTI.aperture[LabelCiclo_C];
				}
			}else{
				if(PAZIENTI.sintomiEliminati.length){
					let TRS = DB.pazienti.data[PAZIENTI.idCL].trattamenti;
					for(let d in PAZIENTI.sintomiEliminati){
						for(t in TRS){
							let mod = false,
								sint = __(TRS[t].sintomi,[]);
							for(let s in sint){
								if(sint[s].NomeSintomo == PAZIENTI.sintomiEliminati[d]){
									sint.splice(s,1);
									mod = true;
								}
							}
							if(mod)TRS[t].sintomi = sint;
						}
					}
					PAZIENTI.sintomiEliminati = [];
				}
			}
			
			

			// salvo le immagini
			let GA = PH.galleryProvvisoria;
			for(let i in GA){
				GA[i].Dida = document.getElementById("Dida"+i).value;
				if(typeof(GA[i].imgMini) != 'undefined' && GA[i]!=null && GA[i].imgMini!=null){
					
					// salvo l'immagine nel DB locale
					DB.files.data.push({
						idFile: GA[i].idFile,
						imgMini: GA[i].imgMini,
						imgBig: GA[i].imgBig,
						type: GA[i].type,
						frv: (LOGIN._frv()!='')
					});
					let NG = {
						idFile: GA[i].idFile,
						Dida: GA[i].Dida
					}
					GA[i] = NG;
					//f++;
				}
				delete(GA[i].imported);
			}
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".files"), IMPORTER.COMPR(DB.files)).then(function(){
				PAZIENTI.ricPuntiTratt();
				JSNPUSH={	"idTrattamento": document.formMod.idTrattamento.value*1,
							"TitoloTrattamento": document.formMod.TitoloTrattamento.value,
							"NoteTrattamento": document.formMod.NoteTrattamento.value,
							"TimeTrattamento": document.formMod.TimeTrattamento.value*1,
							"moduli": PAZIENTI.moduliProvvisori,
							"oraInizio": document.formMod.oraInizio.value*1,
							"oraFine": document.formMod.oraFine.value*1,
							"Anamnesi": document.formMod.Anamnesi.value,
							"DiagnosiOccidentale": document.formMod.DiagnosiOccidentale.value,
							"DiagnosiMTC": document.formMod.DiagnosiMTC.value,
							"Prescrizione": document.formMod.Prescrizione.value,
							"ConsiderazioniOperatore": document.formMod.ConsiderazioniOperatore.value,
							"ConsiderazioniPaziente": document.formMod.ConsiderazioniPaziente.value,
							"puntiMTC": PAZIENTI.puntiProvvisori,
							"puntiAuricolari": PAZIENTI.auriculoProvvisori,
							"puntiPlantari": PAZIENTI.reflexProvvisori,
							"puntiNamikoshi": PAZIENTI.namikoshiProvvisori,
							"puntiTrigger": PAZIENTI.triggerProvvisori,
							"diagnosiAI": document.getElementById("diagnosiAI").innerHTML,
							"sintomi": PAZIENTI.sintomiProvvisori,
							"meridiani": PAZIENTI.meridianiProvvisori,
							"gallery": GA,
							"DataModifica": parseInt(DataModifica),
							"LabelCiclo": LabelCiclo,
							"TipoTrattamento": TipoTrattamento,
							"CostoTrattamento": parseFloat(document.formMod.CostoTrattamento.value.replace(",","."))*1,
							"ordine": parseInt(document.formMod.ordine.value),
							"Cancellato": 0,
							"frv": (LOGIN._frv()!='') };
							
				if(!DB.pazienti.data[PAZIENTI.idCL].trattamenti)DB.pazienti.data[PAZIENTI.idCL].trattamenti=[];
				if(document.formMod.idTratt.value*1>-1){
					DB.pazienti.data[PAZIENTI.idCL].trattamenti[document.formMod.idTratt.value*1]=JSNPUSH;
					pDef=document.formMod.idTratt.value*1;
				}else{
					DB.pazienti.data[PAZIENTI.idCL].trattamenti.push(JSNPUSH);
					pDef=DB.pazienti.data[PAZIENTI.idCL].trattamenti.length-1;
				}
				endChangeDetection();
				SCHEDA.formModificato = false;
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
					SYNCRO.sincronizza(	'startAnimate();' +
										'nasLoader();' +
										'PAZIENTI.caricaTrattamenti('+pDef+');' +
										"PAZIENTI.car_trattamento("+pDef+", document.getElementById('btn_trattamento_"+pDef+"'));" +
										'SYNCRO.pulisciGallery();' );
					
				});
			});
		}
		return false;
	},
	el_trattamento: function( Q_idTratt ){ // elimina il trattamento
		// elimina il trattamento
		let TXT_EL_AL=TXT("ChiediEliminaTrattamento");
		if(DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].TipoTrattamento=='A'){
			TXT_EL_AL=TXT("ChiediEliminaCiclo");
		}
		CONFIRM.vis(	TXT_EL_AL,
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));

			stopAnimate(true);
			visLoader(TXT("SalvataggioInCorso"),'loadingLight');
			let DataModifica = DB.pazienti.lastSync+1;
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].Cancellato=1;
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].md5='';
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].DataModifica=parseInt(DataModifica);
			DB.pazienti.data[PAZIENTI.idCL].DataModifica=parseInt(DataModifica);
			
			// se è un'anamnesi cancello tutto il ciclo
			if(DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].TipoTrattamento=='A'){
				for(let i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
					let TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[i];
					if(TR.LabelCiclo==DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].LabelCiclo){
						TR.DataModifica=parseInt(DataModifica);
						TR.Cancellato=1;
					}
				}
			}
		
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				SYNCRO.sincronizza(	'PAZIENTI.caricaTrattamenti();' + 
									'startAnimate();' +
									'nasLoader();' +
									'SCHEDA.scaricaScheda();' +
									'SYNCRO.pulisciGallery();' );
			});
		}});
	},
	swAgenda: function( data, elemento, funct, el, Q_idTratt ){ // apre e chiude l'agenda in un trattamento
		if(!data)data=oggi;
		else data=new Date(data);
		if(el.dataset.d){
			let D=JSON.parse(el.dataset.d);
			if(typeof(D.data)!='undefined')data=new Date(D.data);
		}
		if(!agenda.opened){
			agenda.apri(data,elemento,funct,el,Q_idTratt);
			document.getElementById("dataTxt").className='dataOp';
		}else{
			agenda.chiudi();
			document.getElementById("dataTxt").className='';
		}
	},
	selData: function( txt, el, cancella=false){
		JSN=JSON.parse(txt);
		if(cancella)JSN.data = 0;
		else JSN.data /= 1000;
		if(debug)console.log(JSN)
		SCHEDA.formModificato=true;
		el.dataset.d=txt;
		document.formMod.TimeTrattamento.value=JSN.data*1;
		document.formMod.oraInizio.value=JSN.oraInizio;
		document.formMod.oraFine.value=JSN.oraFine;
		let DT = '... '+htmlEntities(TXT("ScegliData"));
		if(JSN.oraInizio>-1){
			oraInizio=parseInt(JSN.oraInizio/12)+":"+twoDigits(parseInt(JSN.oraInizio%12)*5);
			oraFine=parseInt(JSN.oraFine/12)+":"+twoDigits(parseInt(JSN.oraFine%12)*5);
			DT = "<b>"+getFullDataTS(JSN.data)+"</b> ("+oraInizio+" - "+oraFine+")";
		}
		document.getElementById("dataTxt").innerHTML=DT;
	},
	
	// ricerca
	azRicercaTrattamenti: function( p, d ){ // azione di ricerca
		PAZIENTI.deselPaziente();
		PAZIENTI.selPaziente(p);
		SCHEDA.apriElenco('base');
		SCHEDA.selElenco('pazienti');
		let LabelCiclo = '',
			idCiclo = -1;
		setTimeout(function(){
			let t = DB.pazienti.data[PAZIENTI.idCL].trattamenti[d],
				btn = document.getElementById('btn_trattamento_'+d);
			el = btn;
			if(t.TipoTrattamento=='A'){
				LabelCiclo = t.LabelCiclo;
				
			}
			while(!el.classList.contains("trattElenco"))el = el.parentElement;
			let pE = el.id.split("_");
			idCiclo = pE[1]*1;
			
			PAZIENTI.car_trattamento( d,btn,LabelCiclo,true,idCiclo);
			SCHEDA.getCartella(document.getElementById('ciclo_'+idCiclo)).classList.add("cartellaAperta");
			RICERCHE.nascondiGlobal();
		},200, d);
	}
	
}