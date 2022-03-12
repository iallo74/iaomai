
var PAZIENTI_TRATTAMENTI = {
	mezzi: {
		"": Lingua(TXT_Mezzo),
		"ago": Lingua(TXT_MezzoAgo),
		"moxa": Lingua(TXT_MezzoMoxa),
		"coppetta": Lingua(TXT_MezzoCoppetta),
		"diapason": Lingua(TXT_MezzoDiapason),
		"luce": Lingua(TXT_MezzoLuce),
		"dito": Lingua(TXT_MezzoDito)
	},
	elencoGruppoPunti: {},
	elencoGruppoAtt: {},
	tipoGruppo: '', // M (meridiani) o P (punti)
	 
	// TRATTAMENTI
	vis_add: function( daPiu ){
		if(typeof(daPiu) == 'undefined')var daPiu='';
		if(!document.getElementById("menuDesktop").classList.contains("visSch")){
			document.getElementById("menuDesktop").classList.add("visSch");
			document.addEventListener("mouseup",PAZIENTI.vis_add);
		}else{
			document.getElementById("menuDesktop").classList.remove("visSch");
			document.removeEventListener("mouseup",PAZIENTI.vis_add);
		}
	},
	vis_anamnesi: function(){
		var btn = document.getElementById("anamnesi_btn");
		var cont = document.getElementById("anamnesi_cont");
		if(!btn.classList.contains("anaVis")){
			cont.style.display = 'block';
			btn.classList.add('anaVis');
		}else{
			cont.style.display = 'none';
			btn.classList.remove('anaVis');
		}
	},
	caricaTrattamenti: function( Q_resta ){ // elenco trattamenti
		if(PAZIENTI.idCL>-1){
			if(typeof(Q_resta) == 'undefined')var Q_resta = false;
			var PZ = DB.pazienti.data[PAZIENTI.idCL];
			var cloneTRATTAMENTI = clone(PZ.trattamenti);
			for(p in cloneTRATTAMENTI){
				cloneTRATTAMENTI[p].p = p;
			}
			cloneTRATTAMENTI.sort(sort_by("TimeTrattamento", true, parseInt));
			
			// CREO CARTELLE e TRATTAMENTI SINGOLI E ORDINO PER DATA ULTIMO ELEMENTO
			PAZIENTI.cicli = [];
			PAZIENTI.cicli.push({
				NomeCiclo: Lingua(TXT_TrattamentiSingoli), // >>>>>>  da tradurre!!!;
				Tipo: 'V',
				UltimaModifica: 99999999999,
				p: -1
			});
			var n=0;
			var cartOpened = false;
			for(i in cloneTRATTAMENTI){
				var TR = cloneTRATTAMENTI[i];
				if(!PAZIENTI.trattOp)TR.md5='';
				if(TR.Cancellato==0){
					esiste=false;
					for(c in PAZIENTI.cicli){
						if(PAZIENTI.cicli[c].NomeCiclo == TR.LabelCiclo)esiste=true;
					}
					if(!esiste && TR.LabelCiclo){ // ciclo
						PAZIENTI.cicli.push({  "NomeCiclo": TR.LabelCiclo, 
											   "UltimaModifica": TR.TimeTrattamento*1,
											   "Tipo": "C",
											   "p": TR.p*1 });
					}
					/*if(!TR.LabelCiclo){ // trattamento singolo
						PAZIENTI.cicli[n++]={  "TitoloTrattamento": TR.TitoloTrattamento, 
											   "UltimaModifica": TR.TimeTrattamento*1,
											   "Tipo": "T",
											   "p": TR.p*1 };
					}*/
				}
			}
			for(c in PAZIENTI.cicli){
				for(i in cloneTRATTAMENTI){
					var TR = cloneTRATTAMENTI[i];
					if(PAZIENTI.cicli[c].NomeCiclo == TR.LabelCiclo && TR.Cancellato == 0){
						if(TR.TimeTrattamento*1 > PAZIENTI.cicli[c].UltimaModifica*1){
							//PAZIENTI.cicli[c].UltimaModifica = TR.TimeTrattamento*1;
						}
					}
				}
			}
			PAZIENTI.cicli.sort(sort_by("UltimaModifica", true, parseInt));
			//--------------------------------
			
			var HTML='';
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
					'		<span>'+htmlEntities(Lingua(TXT_ScegliServizio))+'</span>' +
					'	</i>' +
					/*'	<i class="elMenu"' +
					'	   title="'+htmlEntities(Lingua(TXT_AggiungiTrattamento))+'"' +
					'	   onclick="PAZIENTI.car_trattamento(-2);">' +
					'		<img src="img/ico_trattamentoB_add.png"' +
					'			 class="noBG"' +
					'			 align="absmiddle">' +
					'		<span>'+htmlEntities(Lingua(TXT_AggiungiTrattamento))+'</span>' +
					'	</i>' +*/
					'	<i class="elMenu"' +
					'	   title="'+htmlEntities(Lingua(TXT_AggiungiCiclo))+'"' +
					'	   onclick="PAZIENTI.car_trattamento();">' +
					'		<img src="img/ico_cicliB_add.png"' +
					'			 class="noBG"' +
					'			 align="absmiddle">' +
					'		<span>'+htmlEntities(Lingua(TXT_AggiungiCiclo))+'</span>' +
					'	</i>' +
					'</p>';
					
			HTML += '<div class="lista listaTrattamenti';
			if(typeof(Q_resta) == 'number' && Q_resta > -1)HTML += ' cont_cartellaAperta';
			HTML += '">';
			if(typeof(cloneTRATTAMENTI)!='undefined'){
				//cloneTRATTAMENTI.sort(sort_by("TimeTrattamento", false, parseInt));
			}
			var vuoto=true;
			
			for(c in PAZIENTI.cicli){
				vuoto=false;
				HTMLProvv  = '';
				if(PAZIENTI.cicli[c].Tipo == 'C' || PAZIENTI.cicli[c].Tipo == 'V'){
					NomeCiclo=PAZIENTI.cicli[c].NomeCiclo;
					if(typeof(PAZIENTI.aperture[NomeCiclo]) != 'undefined' && PAZIENTI.aperture[NomeCiclo])cartOpened = true;
					
					var HTMLProvv = '';
					var elAn=-1;
					var dataAn=DataAn=DataMod=DataModAn=CostoAn='';
					var presente=mdT=false;
					var pr=0;
					cloneTRATTAMENTI.sort(sort_by("TipoTrattamento", false));
					
					for(p in cloneTRATTAMENTI){
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
								
								HTMLProvv+='" id="cr_'+cloneTRATTAMENTI[p].p+'"';
								if(!touchable)HTMLProvv +=	' onMouseOver="PAZIENTI.eviPallStat('+Data+');"' +
															' onMouseOut="PAZIENTI.desPallStat('+Data+');"';
								HTMLProvv += ' onClick="PAZIENTI.car_trattamento('+cloneTRATTAMENTI[p].p+',this,\'\',false,'+elAn+');">'; // trattamento
								
								if(cloneTRATTAMENTI[p].DataModifica>DB.pazienti.lastSync){
									mdT=true;
									HTMLProvv += H.imgSyncro();
								}
								
								HTMLProvv+=data;
								HTMLProvv += ' <span style="color:rgba(255,255,255,0.5);">-</span> ';
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
					
					HTML+='<div class="cartella';
					if(PAZIENTI.cicli[c].Tipo == 'V')HTML += ' cartellaSingoli';
					var cartAperta = this.aperture[NomeCiclo];
					if(typeof(cartAperta)=='undefined')cartAperta=false;
					if(this.aperture[NomeCiclo])HTML+=' cartellaAperta';
					HTML+='" onTouchStart="SCHEDA.setCartella(this);"><div class="menuElenchi"' +
						'	  onClick="MENU.visMM(\'trattTools_'+elAn+'\');">' +
						'</div><span id="cl_'+c+'"' +
							'      onClick="SCHEDA.swCartella(this);' +
							'      			PAZIENTI.setCartOp(this);">';
					
					
					HTML +=	'<img src="img/cartellaClinicaG.png"' +
							'     style="width:32px;' +
							'     		 margin:-10px;' +
							'     		 margin-right: 5px;">';
					
					if(DataModAn>DB.pazienti.lastSync || mdT)HTML += H.imgSyncro();
					
					HTML+='<b class="nomeCiclo">'+htmlEntities(NomeCiclo)+'</b>';
					NC = NomeCiclo;	
					
					//if(dataAn)HTML+=' <i style="opacity:0.6;">('+dataAn+')</i>';
					HTML+='</span><div class="trattElenco" id="ciclo_'+c+'"';
					if(!(cartAperta))HTML+=' style="display:none;"';
					HTML+='>';
					
					if(!presente)HTMLProvv+='<div class="noResults">'+Lingua(TXT_NoResTrattamento)+'...</div>';
					var InfoAn= '';
					if(DataAn)InfoAn +=	'<img src="img/ico_agendaM2.png">'+getDataTS(DataAn);
					
					HTML +=	'<div class="trattTools"' +
							'	  id="trattTools_'+elAn+'">' +
							/*'	<i class="infoCiclo">'+InfoAn+'</i>' +*/
							'	<i class="addTrattBtn elMenu"' +
							'	   id="add_tratt_'+elAn+'"' +
							'	   title="'+htmlEntities(Lingua(TXT_AggiungiTrattamento))+'"';
					if(PAZIENTI.cicli[c].Tipo == 'C')HTML += // aggiungo in ciclo
							'	   onclick="PAZIENTI.car_trattamento( -1,' +
							'	     	  							  null,' +
							'	     	  							  \''+addslashes(PAZIENTI.cicli[c].NomeCiclo)+'\',' +
							'	     	  							  false,' +
							'	     	  							  '+elAn+');"';
					else HTML += ' onclick="PAZIENTI.car_trattamento( -2);"'; // aggiungo in trattamenti singoli
					HTML += '>' +
							/*'		<img src="img/ico_trattamento_ins.png"' +
							'			 class="noBG"' +
							'			 align="absmiddle">'*/
							'	</i>';
					if(PAZIENTI.cicli[c].Tipo == 'C'){ // escludo dai trattamenti singoli
						HTML +=
							'	<i class="riepilogoBtn elMenu"' +
							'		title="'+htmlEntities(Lingua(TXT_SchedaCiclo))+'"' +
							'		onclick="PAZIENTI.car_ciclo(\''+addslashes(PAZIENTI.cicli[c].NomeCiclo)+'\',this);">' +
							'		<span>'+htmlEntities(Lingua(TXT_SchedaCiclo))+'</span>' +
							'	</i>';
					}
					HTML += '</div>';
					if(PAZIENTI.cicli[c].Tipo == 'C'){ // escludo dai trattamenti singoli
						HTML +=
							'<div 	class="anamnesiBtn elMenu"' +
							'		id="btn_trattamento_'+elAn+'"' +
							'		title="'+htmlEntities(Lingua(TXT_SchedaAnamnesi))+'"';
					if(!touchable)HTML += ' onMouseOver="PAZIENTI.eviPallStat('+DataAn+');"' +
										  ' onMouseOut="PAZIENTI.desPallStat('+DataAn+');"';
					HTML += ' 	   onclick="PAZIENTI.car_trattamento(\''+elAn+'\',this,\''+NC+'\',true);">'; // anamnesi
					if(DataModAn>DB.pazienti.lastSync)HTML += H.imgSyncro();
					HTML += '	<span>'+htmlEntities(Lingua(TXT_SchedaAnamnesi))+'</span>' +
							'</div>';
					}
					HTML += HTMLProvv +
							'</div></div>';
				}/*else{
					var TR = PZ.trattamenti[PAZIENTI.cicli[c].p];
					if( !TR.Cancellato ){
						data = '';
						if(TR.TimeTrattamento){
							pD=getDataTS(TR.TimeTrattamento).split("/");
							data=pD[0]+H.sl+pD[1]+H.sl+pD[2].substr(2,2);
						}
						if(	TR.TimeTrattamento*1000>Date.now() ){
							data =	'<font style="background-color:#c5831f !important;' +
									'      padding:3px;border-radius:8px;' +
									'	   color:#FFF;">' +
									'	<img src="img/ico_timer.png"' +
									'		 align="absmiddle"> <b style="color:#FFF;">' +
										data +
									'</b></font>';
						}else if(	!TR.TimeTrattamento ){
							data =	'<font style="padding:3px;">' +
									'	<img src="img/ico_timerNoB.png"' +
									'		 align="absmiddle"' +
									'		 style="background-color: rgba(255,255,255,0.7);' +
									'		 padding: 5px;' +
									'		 margin-top: -2px;' +
									'		 margin-left: -5px;' +
									'		 border-radius: 9px;">' +
									'</font>';
						}else data = '<b>'+data+'</b>';
						HTMLProvv+=	'<div id="btn_trattamento_'+PAZIENTI.cicli[c].p+'"' +
									'	  class="frdxtratt"' +
									'	  id="cr_'+PAZIENTI.cicli[c].p+'"' +
									'	  onClick="PAZIENTI.car_trattamento('+PAZIENTI.cicli[c].p+',this,\'\',false,-1);">';
						
						if(TR.DataModifica>DB.pazienti.lastSync){
							mdT=true;
							HTMLProvv += H.imgSyncro();
						}
						HTMLProvv+=data;
						HTMLProvv += ' <span style="color:rgba(0,0,0,0.5);">-</span> ';
						if(TR.TitoloTrattamento)HTMLProvv += htmlEntities(TR.TitoloTrattamento);
						else HTMLProvv += '...';
						
						HTMLProvv += '</div>';
					}	
					HTML += HTMLProvv;
				}*/
			}
			if(vuoto)HTML += '<p class="noResults">'+Lingua(TXT_NoResTrattamento)+'...</div>';
			HTML += '</div>';

			document.getElementById("lista_pazienti").innerHTML = HTML;
			
			if(cartOpened)document.querySelector(".listaTrattamenti").classList.add("cont_cartellaAperta");
			if(typeof(Q_resta) == 'number')SCHEDA.btnSel = document.getElementById("btn_trattamento_"+Q_resta);
			if(Q_resta>-1 && SCHEDA.btnSel){
				try{
					SCHEDA.btnSel = document.getElementById(SCHEDA.btnSel.id);
					SCHEDA.btnSel.classList.add("elencoSel");
					SCHEDA.scaricaScheda(true);
					//SCHEDA.btnSel.click(); // riapre il trattamento dopo il salvataggio
					if(typeof(Q_resta) == 'number' && Q_resta>-1)setTimeout(function(){ SCHEDA.msgSalvataggio(); }, 200 );
				}catch(err){}
			}
		}
	},
	car_trattamento: function( Q_idTratt, btn, LabelCiclo, an, idCiclo, trasforma ){ // scheda del trattamento
		if(typeof(Q_idTratt)=='undefined')var Q_idTratt=-1;
		if(typeof(LabelCiclo)=='undefined')var LabelCiclo='';
		if(typeof(an)=='undefined')var an=false;
		if(typeof(trasforma)=='undefined')var trasforma=false;
		// verifico le autorizzazioni
		
		if(Q_idTratt==-1 && !LabelCiclo){ // solo se è anamnesi
			var cicliTot = 0;
			for(c in PAZIENTI.cicli){
				if(PAZIENTI.cicli[c].Tipo == 'C')cicliTot++;
			}
			var maxCicli = 1;
			if(LOGIN.reg() && LOGIN.logedin()){
				if(DB.login.data.auths.indexOf("clients_full")>-1)maxCicli = -1;
			}
			if(maxCicli>-1){
				if(cicliTot >= maxCicli){
					ALERT(Lingua(eval("TXT_MsgMaxCicli")));
					return;
				}
			}
		}
		// --------------------------
		
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(), 
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			
			MENU.nasMM();
			if(typeof(Q_idTratt)=='undefined')var Q_idTratt=-1;
			if(typeof(idCiclo)=='undefined')var idCiclo=-1;
			if(typeof(LabelCiclo)=='undefined')var LabelCiclo='';
			if(typeof(an)=='undefined')var an=false;
			if(typeof(btn)=='undefined')var btn=null;
			
			var nuovoCiclo = false;
			if(Q_idTratt==-1 && idCiclo==-1)nuovoCiclo = true;
			
			var idTrattamento=0;
			var TitoloTrattamento='';
			var TestoTrattamento='';
			var Prescrizione='';
			var puntiTsuboMap='';
			var TimeTrattamento=0;
			var CostoTrattamento=0;
			var sintomi=[];
			var meridiani=[];
			var gallery=[];
			var sintomiCiclo=[];
			var sintomiModello=[];
			var TipoTrattamento='B';
			var oraInizio=-1;
			var oraFine=-1;
			PAZIENTI.modificaSaldo=false;
			PAZIENTI.saldoOp=false;
			if((LabelCiclo=='' && Q_idTratt==-1) || an)TipoTrattamento='A';
			
			for(i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
				DB.pazienti.data[PAZIENTI.idCL].trattamenti[i].md5='';
			}
			if(Q_idTratt>-1){
				var TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt];
				oraInizio=10;
				oraFine=11;
				TR.id_interno=Q_idTratt;
				TR.md5=PAZIENTI.pazSelMD5;
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){
					// salvo il DB
				});
				idTrattamento=TR.idTrattamento*1;
				TitoloTrattamento=TR.TitoloTrattamento;
				TestoTrattamento=TR.TestoTrattamento;
				Prescrizione=__(TR.Prescrizione);
				meridiani=__(TR.meridiani);
				
				TimeTrattamento=(TR.TimeTrattamento*1)/1000;
				if(typeof(TR.TipoTrattamento)!='undefined')TipoTrattamento=TR.TipoTrattamento;
				if(typeof(TR.LabelCiclo)!='undefined')LabelCiclo=TR.LabelCiclo;
				if(typeof(TR.CostoTrattamento)!='undefined')CostoTrattamento=TR.CostoTrattamento*1;
				if(typeof(TR.puntiTsuboMap)=='string')puntiTsuboMap=TR.puntiTsuboMap;
				if(typeof(TR.sintomi)=='string')sintomi=TR.sintomi;
				if(typeof(TR.gallery)=='string')gallery=TR.gallery;
				if(typeof(TR.oraInizio)!='undefined')oraInizio=TR.oraInizio*1;
				if(typeof(TR.oraFine)!='undefined')oraFine=TR.oraFine*1;
				if(oraInizio<agenda.oraMin)oraInizio=agenda.oraMin+2;
				if(oraFine<agenda.oraMin)oraFine=agenda.oraMin+3;
				if(!TipoTrattamento)TipoTrattamento='B';
				if(trasforma){
					TipoTrattamento = 'A';
					LabelCiclo = TitoloTrattamento;
					TitoloTrattamento = '';
					TestoTrattamento=JSON.stringify({	"AnamnesiMotivo": TestoTrattamento,
														"AnamnesiDiagnosiOccidentale": "",
														"AnamnesiDiagnosiMTC": "" });
				}
			}else if(agenda.orarioDef){
				TimeTrattamento = agenda.orarioDef.data/1000000;
				oraInizio = agenda.orarioDef.oraInizio;
				oraFine = agenda.orarioDef.oraFine;
				agenda.init();
			}
			
			if(puntiTsuboMap!='')puntiTsuboMap=JSON.parse(puntiTsuboMap);
			else puntiTsuboMap=[];
			if(sintomi!='')sintomi=JSON.parse(sintomi);
			else sintomi=[];
			if(meridiani!='')meridiani=JSON.parse(meridiani);
			else meridiani=[];
			if(gallery!='')gallery=JSON.parse(gallery);
			else gallery=[];
			
			if(idCiclo>-1){// || Q_idTratt>-1){
				var CI = DB.pazienti.data[PAZIENTI.idCL].trattamenti[idCiclo];
				if(CI.sintomi){
					sintomiModello=JSON.parse(CI.sintomi);
					var sintomiNuovi=JSON.parse(JSON.stringify(sintomiModello));
					if(TipoTrattamento!='A' && typeof(sintomiModello)=='object'){
						// se è un trattamento ricostruisco i sintomi in base al modello
						var n=-1;
						for(s in sintomiModello){
							sintomiNuovi[s]=sintomiModello[s];
							var score=-1;
							for(t in sintomi){
								if(sintomiModello[s].NomeSintomo==sintomi[t].NomeSintomo){
									score=sintomi[t].score;
								}
							}
							sintomiNuovi[s].score=score;
						}
						sintomi=JSON.parse(JSON.stringify(sintomiNuovi));
					}
				}
			}
			agenda.init();
			var TimeAgenda = TimeTrattamento;
			if(!TimeTrattamento){
				TimeAgenda=new Date(oggi/1000);
				oraInizio = -1;
				oraFine = -1;
			}else{
				TimeTrattamento=new Date(TimeTrattamento*1000);
				TimeAgenda = TimeTrattamento;
			}
			PAZIENTI.puntiProvvisori=puntiTsuboMap;
			PAZIENTI.sintomiProvvisori=sintomi;
			PAZIENTI.meridianiProvvisori=meridiani;
			PAZIENTI.galleryProvvisoria=gallery;
			var HTML='';
			
			// GUIDA
			if(TipoTrattamento == 'A' && Q_idTratt<0){
				HTML += '<div class="guide_scheda_btn"' +
						'	  id="btn_guida_ciclo"' +
						'	  onClick="GUIDA.visGuida(\'guida_ciclo\')"';
				if(!__(localStorage.getItem("no_guida_ciclo")))HTML += ' style="display:none"';
				HTML += '>?</div>';
				
				HTML += '<div class="guide_scheda"' +
						'	  id="guida_ciclo"';
				if(__(localStorage.getItem("no_guida_ciclo")))HTML += ' style="display:none"';
				HTML += '>' +
						'	<div class="guide_chiudi"' +
						'		 onClick="GUIDA.nasGuida(\'guida_ciclo\');"></div>' +
						'	<div>' +
						'		<h2>' +
									htmlEntities(Lingua(TXT_GuidaCicloTit)) +
						'		</h2>' +
						'		<p>' +
									htmlEntities(Lingua(TXT_GuidaCiclo)).replace(/\n/g,"<br>") +
						'		</p>' +
						'	</div>';
				if(!__(localStorage.getItem("no_guida_ciclo")))HTML += 
						'	<span class="noVisPiu"' +
						'		  style="display: inline-block;">' +
								htmlEntities(Lingua(TXT_NonVisualizzarePiu)) +
						'		<input type="checkbox"' +
						'			   id="no_guida_ciclo"' +
						'			   name="no_guida_ciclo"' +
						'			   value="1"' +
						'			   onClick="GUIDA.noVis(this);">' +
						'	</span>';
				HTML += '</div>';
			}
			
			if(TipoTrattamento != 'A' && LabelCiclo)HTML +=	'<div class="label_ciclo">'+htmlEntities(LabelCiclo)+'</div>';
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
					H.r({	t: "h", name: "LabelCicloOr",		value: LabelCiclo 			});
			
			if(TipoTrattamento!='A'){
				HTML += H.r({	t: "h", name: "TipoTrattamento",	value: "B" 				}) +
						H.r({	t: "h", name: "LabelCiclo",			value: LabelCiclo 		});
			}else{
				if(!TestoTrattamento)TestoTrattamento={	"AnamnesiMotivo":"",
										"AnamnesiDiagnosiOccidentale":"",
										"AnamnesiDiagnosiMTC":"" };
				else TestoTrattamento=JSON.parse(TestoTrattamento);
				AnamnesiMotivo=TestoTrattamento.AnamnesiMotivo;
				AnamnesiDiagnosiOccidentale=TestoTrattamento.AnamnesiDiagnosiOccidentale;
				AnamnesiDiagnosiMTC=TestoTrattamento.AnamnesiDiagnosiMTC;
				
				var LC='';
				if(Q_idTratt==-1 && !LabelCiclo){
					if(an)LC=Lingua(TXT_CicloTrattamenti);
				}else LC=LabelCiclo;
				HTML += H.r({	t: "h", name: "TipoTrattamento",	value: "A" 				}) +
						H.r({	t: "h", name: "LabelCiclo_C",		value: LabelCiclo 		}) +
						H.r({	t: "r",	
								name: "LabelCiclo",	
								value: LC,
								ver: '1|0',
								label: Lingua(TXT_Ciclo),
								classCampo: 'styled' }) +
						H.r({	t: "h",	name: "TitoloTrattamento",	value: Lingua(TXT_Anamnesi) });
						
				if(nuovoCiclo){
					HTML +=  	'<div><div id="anamnesi_btn"' +
								'		   onClick="PAZIENTI.vis_anamnesi();">'+htmlEntities(Lingua(TXT_Anamnesi_e_Diagnosi))+'</div></div>' +
								'<div style="display:none;"' +
								'	  id="anamnesi_cont">'; // nascondo tutto se è un nuovo ciclo
				}
				HTML += H.r({	t: "t",	
								name: "AnamnesiMotivo",	
								value: AnamnesiMotivo,
								noLabel: true,
								classCampo: "okPlaceHolder" });
			}
			var TXT_DT=TXT_Data;
			if(TimeTrattamento*1>(oggi*1)/1000)TXT_DT=TXT_DataProgrammata;
			
			if(!TimeTrattamento)var DT='... '+htmlEntities(Lingua(TXT_ScegliData));
			else{
				oI=oraInizio+"";
				if(oI.indexOf(".")>-1)oI=oI.substr(0,oI.indexOf("."))+":30";
				else oI=oI+":00";
				oF=oraFine+"";
				if(oF.indexOf(".")>-1)oF=oF.substr(0,oF.indexOf("."))+":30";
				else oF=oF+":00";
				DT="<b>"+getFullDataTS(TimeTrattamento)+"</b> ("+oI+" - "+oF+")";
			}
			var TM = {
				data: TimeAgenda*1000,
				oraInizio: oraInizio,
				oraFine: oraFine
			}
			agendaOp=false;
			
			var separatore = 
					'<div class="sezioneTrattamenti divEspansa"'+
					'     style="background:transparent !important;'+
					'		     border-top:none !important;'+
					'			 padding: 0px;">'+
					'</div>';
			if(TipoTrattamento!='A' || (TipoTrattamento=='A' && oraInizio>-1)){		
				// AGENDA
				HTML+=	
					'<div id="dataTratt" class="labelSx">' +
					'	<i class="vis">'+Lingua(TXT_DT)+':</i>' +
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
								label: Lingua(TXT_Costo)+' €',
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
								label: Lingua(TXT_Etichetta),
								classCampo: 'TitTrattDx',
								classRiga: "labelSx",
								styleRiga: "text-align:right;" }) +
								
						H.r({	t: "t",	
								name: "TestoTrattamento",	
								value: TestoTrattamento,
								noLabel: true,
								classCampo: "okPlaceHolder",
								styleCampo: "margin-bottom:10px;" });
				
				var TXT_P=TXT_Tsubo;
				var TXT_M=TXT_MeridianiTrattamento;
				HTML += separatore;
				
			}else{
				HTML += separatore.replace('padding: 0px;','padding: 5px;') +
						'<div id="tratt_cont_diagnosi"' +
						'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_diagnosi")) ? '' : 'sezioneChiusa') +
						'">' +	
						'	<em class="labelMobile labelTrattamenti"' +
						'  		onClick="H.swSezione(this);">' +
						'		<img class="icoLabel"' +
						'			 src="img/ico_diagnosi.png">' +
								Lingua(TXT_Diagnosi) +
						'	</em>' +	
						'	<div id="contDiagnosi" style="min-height:240px;">'+
						'		<div class="l"></div>' +
						'		<div class="schDx">' +
						H.r({	t: "t",	
								name: "AnamnesiDiagnosiOccidentale",	
								value: AnamnesiDiagnosiOccidentale,
								styleCampo: "margin-bottom:10px;" }) +
						'		</div>' +
						'		<div class="schSx">' +
						H.r({	t: "t",	
								name: "AnamnesiDiagnosiMTC",	
								value: AnamnesiDiagnosiMTC,
								styleCampo: "margin-bottom:10px;" }) +
						'		</div>' +
						'		<div class="l"></div>' +
						'	</div>' +
						'</div>';
				
				var TXT_P=TXT_PuntiAnamnesi;
				var TXT_M=TXT_MeridianiAnamnesi;
			}
			
			// PRESCRIZIONE
			HTML += 
				'<div id="tratt_cont_prescrizione"' +
				'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_prescrizione")) ? '' : 'sezioneChiusa') +
						'">' +	
				'	<em class="labelMobile labelTrattamenti"' +
				'  		onClick="H.swSezione(this);">' +
				'		<img class="icoLabel"' +
				'			 src="img/ico_prescrizione.png">' +
						Lingua(TXT_Prescrizione) +
				'	</em>' +	
				'	<img src="img/ico_stampa.png"' +
				'		 id="stampa_prescr"' +
				'		 onClick="SCHEDA.stampaScheda({\'titolo\':\''+addslashes(htmlEntities(Lingua(TXT_Prescrizione)))+'\',\'corpo\':document.formMod.Prescrizione.value,\'intestazione\':DB.pazienti.data[PAZIENTI.idCL].Nome+\' \'+DB.pazienti.data[PAZIENTI.idCL].Cognome});">' +	
				'	<div id="contPrescrizione">'+
				H.r({	t: "t",	
						name: "Prescrizione",	
						value: Prescrizione,
						noLabel: true,
						styleCampo: "margin-bottom:10px;margin-top:8px;" }) +
				'	</div>' +
				'</div>';
			
			
			// SINTOMI
			HTML += '<div id="tratt_cont_sintomi"' +
						  //(((TipoTrattamento == 'B' && !PAZIENTI.sintomiProvvisori.length) && LabelCiclo) ? ' style="display:none;"' : '') +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_sintomi")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em class="labelMobile labelTrattamenti"' +
					'  		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'			 src="img/ico_sintomi.png">' +
							Lingua(TXT_Sintomi)+' (<span id="totSintomi"></span>)'+
					'	</em>' +
					'	<div id="contSintomi"' +
							 //((TipoTrattamento!='A') && LabelCiclo ? ' class="sintomiTratt"' : '') +
					'>' +
					'	</div>' +
					
					'<div id="cont_label_add_sintomi"' +
					'	  class="cont_label_add">' +
					'	<input type="text"' +
					'		   id="paz_add"' +
					'		   placeholder="'+htmlEntities(stripslashes(Lingua(TXT_SintomoSpiegazione)))+'"' +
					'		   autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"' +
					'		   onKeyup="PAZIENTI.filtraSintomi(this);"/>' +
					'	<div class="p_label_add"' +
					'		 onClick="PAZIENTI.aggiungiSintomo();">' +
							Lingua(TXT_Aggiungi) +
					'	</div>' +
					'	<div class="p_label_ann"' +
					'		 onClick="PAZIENTI.annullaSintomo();">' +
							Lingua(TXT_Annulla) +
					'	</div>' +
					'	<span id="label_close"' +
					'		  onClick="PAZIENTI.nasAggiungiSintomo();">' +
					'	</span>' +
					'	<div id="elencoSintomi">' +
					'	</div>' +
					'	<div class="l"></div>' +
					'</div>' +
					'<div class="cont_p_paz_label">' +
					'	<div class="p_paz_label"' +
					'		 id="p_paz_label_sintomi"' +
					'			 onclick="PAZIENTI.visAggiungiSintomo();">' +
							htmlEntities(Lingua(TXT_AggiungiSintomo)) +
					'	</div>'+
					'</div>' +

					'	<div class="l_a"></div>' +
					'</div>' +
					
					// POPUP di caricamento punti e meridiani
					'<div id="gruppoPunti_cont"></div>' +
			
			// TSUBO
					'<div id="tratt_cont_punti"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_punti")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em id="label_puntiTsuboMap"' +
					'		class="labelMobile labelTrattamenti"' +
					'		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'		     src="img/ico_tsubo.png">' +
							Lingua(TXT_P)+' (<span id="totTsubo"></span>)' +
					'	</em>' +
					'	<div id="puntiTsuboMap">' +
					'	</div>' +
					'	<div id="tratt_btns_punti"></div>' +
					'</div>' +
			
			// MERIDIANI
					'<div id="tratt_cont_meridiani"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_meridiani")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em id="label_meridianiTsuboMap"' +
					'		class="labelMobile labelTrattamenti"' +
					'		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'		     src="img/ico_meridiani.png">' +
							Lingua(TXT_M)+' (<span id="totMeridiani"></span>)' +
					'	</em>' +
					'	<div id="meridianiTsuboMap">' +
					'	</div>' +
					'	<div id="tratt_btns_meridiani"></div>' +
					'</div>' +
			
			// GALLERY
					'<div id="tratt_cont_gallery"' +
					'	  class="sezioneTrattamenti divEspansa '+ 
						((localStorage.getItem("op_gallery")) ? '' : 'sezioneChiusa') +
						'">' +
					'	<em class="labelMobile labelTrattamenti"' +
					'		onClick="H.swSezione(this);">' +
					'		<img class="icoLabel"' +
					'		     src="img/ico_foto.png">' +
							Lingua(TXT_Gallery)+' (<span id="totFoto"></span>)' +
					'	</em>' +
					'	<div id="contGallery"' +
					'		 class="divEspansa">' +
					'	</div>' +
					'	<div id="p_add_dett"' +
					'		 style="margin-top: 0px;">' +
					'		<input type="file"' +
					'			   id="fotoProvv_FL"' +
					'			   class="p_paz_foto"' +
					'		       onChange="PAZIENTI.selezionaFoto(this);">' +
					'		<span id="addFoto">' +
								Lingua(TXT_AggiungiFoto) +
					'		</span>' +
					'	</div>' +
					'</div>';
			
			if(nuovoCiclo)HTML += '</div>';		 // nascondo tutto se è un nuovo ciclo
			HTML += '</form>';
			
			var azElimina = Q_idTratt>-1 ? 'PAZIENTI.el_trattamento('+Q_idTratt+')':"";
			var btnAdd = '';
			if(azElimina){
				btnAdd = '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+Lingua(TXT_EliminaScheda)+'</div>';
			}
			
			// pulsanti SALVA, ANNULLA e ELIMINA
			HTML += SCHEDA.pulsantiForm( 	Q_idTratt>-1 ? 'PAZIENTI.el_trattamento('+Q_idTratt+')':"",
											"SCHEDA.scaricaScheda();", 
											"PAZIENTI.mod_trattamento();" );
			
			HTML+='<div class="l"></div>';
			
			
			if(!LabelCiclo && Q_idTratt>-1){
				HTML += '<div style="text-align:right;">' +
						'	<div onClick="PAZIENTI.trasformaTrattamento('+Q_idTratt+');"' +
						'		  id="btnTrasf">' +
								htmlEntities(Lingua(TXT_TrasformaTrattamento)) +
						'	</div>' +
						'</div>' +
						'<div class="l"></div>';
			}
			
			if(Q_idTratt>-1 || an){
				if(TipoTrattamento=='A')titoloDef=TXT_SchedaAnamnesi;
				else titoloDef=TXT_ModificaTrattamento;
			}else{
				if(TipoTrattamento=='A')titoloDef=TXT_CicloTrattamenti;//titoloDef=TXT_CreaCiclo;
				else titoloDef=TXT_CreaTrattamento;
			}
			
			
			SCHEDA.caricaScheda(	stripslashes(Lingua(titoloDef)),
									HTML,
									'PAZIENTI.chiudiTrattamento();',
									'scheda_'+TipoTrattamento,
									false,
									true,
									btn,
									btnAdd );
			if(mouseDetect){
				if(TipoTrattamento!='A')document.formMod.TitoloTrattamento.focus();
				else document.formMod.LabelCiclo.focus();
			}
			//H.verData();
			
			if(TipoTrattamento=='A' || !LabelCiclo)PAZIENTI.popolaSintomi();
			PAZIENTI.caricaDettagliSet(); // carico le schede dei singoli sets (TsuboMap, ShiatsuMap, ecc)
			PAZIENTI.caricaSintomi();
			PAZIENTI.caricaGalleryTrattamento( Q_idTratt );
			PAZIENTI.trattOp = true;
			initChangeDetection( "formMod" );
			SCHEDA.formModificato = false;
		}});
	},
	caricaDettagliSet: function(){ // carica i dettagli trattamento dei singoli set
		
		// PUNTI
		var HTML = '';
		if( globals.set.cartella == 'meridiani_cinesi' ||
			globals.set.cartella == 'meridiani_shiatsu' ){
			HTML+=
				'	<div id="p_add_dett">' +
				'		<div id="grpPt"' +
				'		    class="p_paz_gruppo"' +
				'		    onClick="PAZIENTI.gruppoPunti(\'P\');">' +
							htmlEntities(Lingua(TXT_AggiungiPunti)) +
				'		</div>' +
				'	</div>';
		}else{
			HTML += '<div class="labelModificaCon">'+htmlEntities(Lingua(TXT_ModificaCon))+'<br><span onClick="caricaSet(\'meridiani_cinesi\',this);"><img src="sets/meridiani_cinesi/img/logoNero.png" width="25" height="25"> TsuboMap</span> o <span onClick="caricaSet(\'meridiani_shiatsu\',this);"><img src="sets/meridiani_shiatsu/img/logoNero.png" width="25" height="25"> ShiatsuMap</span></div>';
		}
		document.getElementById("tratt_btns_punti").innerHTML = HTML;
		PAZIENTI.caricaPuntiTrattamento();
		
		// MERIDIANI
		var HTML = '';
		if( globals.set.cartella == 'meridiani_cinesi' || 
			globals.set.cartella == 'meridiani_shiatsu' ){
			HTML+=
				'	<div id="p_add_dett">' +
				'		<div id="grpMrd"' +
				'		    class="p_paz_meridiani"' +
				'		    onClick="PAZIENTI.gruppoPunti(\'M\');">' +
							htmlEntities(Lingua(TXT_AggiungiMeridiani)) +
				'		</div>' +
				'	</div>';
		}else{
			HTML += '<div class="labelModificaCon">'+htmlEntities(Lingua(TXT_ModificaCon))+'<br><span onClick="caricaSet(\'meridiani_cinesi\',this);"><img src="sets/meridiani_cinesi/img/logoNero.png" width="25" height="25"> TsuboMap</span> o <span onClick="caricaSet(\'meridiani_cinesi\',this);"><img src="sets/meridiani_shiatsu/img/logoNero.png" width="25" height="25"> ShiatsuMap</span></div>';
		}
		document.getElementById("tratt_btns_meridiani").innerHTML = HTML;
		PAZIENTI.caricaMeridianiTrattamento();
	},
	trasformaTrattamento: function( Q_idTratt){
		if(DB.login.data.auths.indexOf("clients_full")==-1){
			ALERT(Lingua(TXT_MsgFunzioneSoloPay));
			return;
		}
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(), 
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			endChangeDetection();
			SCHEDA.formModificato = false;
			PAZIENTI.car_trattamento(Q_idTratt, document.getElementById("btn_trattamento_"+Q_idTratt), '', true, -1, true);
		}});
	},
	chiudiTrattamento: function(){ // funzione chiamata alla chiusura del trattamento
		try{
			SET.annullaEvidenziaTsubo();
		}catch(err){}
		SCHEDA.formModificato = false;
		PAZIENTI.trattOp = false;
	},
	mod_trattamento: function(){ // salva il tratamento
		if(PAZIENTI.idCL>-1){
			if(!ControllaNumero(document.formMod.CostoTrattamento,stripslashes(Lingua(TXT_Costo))))return;
			if(agenda.oraFine>-1)agenda.conferma();
			LabelCiclo=document.formMod.LabelCiclo.value;
			TipoTrattamento=document.formMod.TipoTrattamento.value;
			var DataModifica = DB.pazienti.lastSync+1;
			
			if(TipoTrattamento=='A'){ // verifico non ci sia già LabelCiclo
				LabelCiclo_C=document.formMod.LabelCiclo_C.value;
				var presente=false;
				var vercopia=true;
				for(i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
					var TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[i];
					if(	TR.Cancellato==0 && TR.LabelCiclo==LabelCiclo && (
							document.formMod.idTratt.value*1==-1 || 
							htmlEntities(TR.LabelCiclo )!=LabelCiclo_C)
						)presente=true;
				}
				if(presente && document.formMod.LabelCicloOr.value == ''){
					ALERT(Lingua(TXT_CicloPresente));
					return;
				}
				if(LabelCiclo!=LabelCiclo_C && document.formMod.idTratt.value*1>-1){ // se cambio il nome del ciclo, lo cambio a tutti i trattamenti
					for(i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
						var TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[i];
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
				if(document.formMod.idCiclo.value*1>-1){
					// verifico i sintomi
					var TRS = DB.pazienti.data[PAZIENTI.idCL].trattamenti;
					var sintomiCiclo = JSON.parse(TRS[document.formMod.idCiclo.value*1].sintomi);
					for(s in PAZIENTI.sintomiProvvisori){
						// per ogni sintomo verifico che esista anche nel modello
						var esiste = false;
						for(sc in sintomiCiclo){
							if(PAZIENTI.sintomiProvvisori[s].NomeSintomo == sintomiCiclo[sc].NomeSintomo){
								esiste = true;
							}
						}
						if(!esiste){ // se non esiste lo aggiungo
							var sintomo = clone(PAZIENTI.sintomiProvvisori[s]);
							sintomo.score = -1;
							sintomiCiclo.push(sintomo);
						}
					}
					for(sc in sintomiCiclo){
						// per ogni sintomo del modello verifico che esista anche nel trattamento
						var esiste = false;
						for(s in PAZIENTI.sintomiProvvisori){
							if(PAZIENTI.sintomiProvvisori[s].NomeSintomo == sintomiCiclo[sc].NomeSintomo){
								esiste = true;
							}
						}
						if(!esiste){ // se non esiste lo cancello dal modello
							sintomiCiclo.splice(sc,1);
						}
					}
					TRS[document.formMod.idCiclo.value*1].sintomi = JSON.stringify(sintomiCiclo);
				}
			}
			
			

			// salvo le immagini
			var f = 0;
			var GA = PAZIENTI.galleryProvvisoria;
			for(i in GA){
				if(typeof(GA[i].imgMini) != 'undefined' && GA[i]!=null && GA[i].imgMini!=null){
					
					// salvo l'immagine nel DB locale
					DB.foto.data[f] = {
						idFoto: GA[i].idFoto,
						imgMini: GA[i].imgMini,
						imgBig: GA[i].imgBig,
						frv: (LOGIN._frv()!='')
					}
					var NG = {
						idFoto: GA[i].idFoto
					}
					GA[i] = NG;
					f++;
				}
			}
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".foto"), IMPORTER.COMPR(DB.foto)).then(function(){
				PAZIENTI.ricPuntiTratt();
				if(TipoTrattamento=='A'){
					TestoTrattamento={};
					TestoTrattamento.AnamnesiMotivo=document.formMod.AnamnesiMotivo.value;
					TestoTrattamento.AnamnesiDiagnosiOccidentale=document.formMod.AnamnesiDiagnosiOccidentale.value;
					TestoTrattamento.AnamnesiDiagnosiMTC=document.formMod.AnamnesiDiagnosiMTC.value;
					TestoTrattamento=JSON.stringify(TestoTrattamento);
				}else TestoTrattamento=document.formMod.TestoTrattamento.value;
				JSNPUSH={	"idTrattamento": document.formMod.idTrattamento.value*1,
							"TitoloTrattamento": document.formMod.TitoloTrattamento.value,
							"TimeTrattamento": document.formMod.TimeTrattamento.value*1,
							"oraInizio": document.formMod.oraInizio.value*1,
							"oraFine": document.formMod.oraFine.value*1,
							"TestoTrattamento": TestoTrattamento,
							"Prescrizione": document.formMod.Prescrizione.value,
							"puntiTsuboMap": JSON.stringify(PAZIENTI.puntiProvvisori),
							"sintomi": JSON.stringify(PAZIENTI.sintomiProvvisori),
							"meridiani": JSON.stringify(PAZIENTI.meridianiProvvisori),
							"gallery": JSON.stringify(GA),
							"DataModifica": parseInt(DataModifica),
							"LabelCiclo": LabelCiclo,
							"TipoTrattamento": TipoTrattamento,
							"CostoTrattamento": parseFloat(document.formMod.CostoTrattamento.value.replace(",","."))*1,
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
				applicaLoading(document.querySelector(".listaTrattamenti"));
				applicaLoading(document.getElementById("scheda_testo"));
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
					LOGIN.sincronizza(	'rimuoviLoading(document.querySelector(".listaTrattamenti"));'+
										'rimuoviLoading(document.getElementById("scheda_testo"));'+
										'PAZIENTI.pulisciGallery('+pDef+');' );
					//SCHEDA.scaricaScheda();
					
				});
			});
		}
		return false;
	},
	pulisciGallery: function( pDef ){
		if(CONN.getConn() && LOGIN.logedin()){
			for(i in PAZIENTI.galleryProvvisoria){
				PAZIENTI.galleryProvvisoria[i].imgBig = '';
				PAZIENTI.galleryProvvisoria[i].imgMini = '';
				PAZIENTI.galleryProvvisoria[i].online = true;
			}
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[pDef].gallery = JSON.stringify(PAZIENTI.galleryProvvisoria);
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				PAZIENTI.caricaTrattamenti(pDef);
			});
		}else PAZIENTI.caricaTrattamenti(pDef);
	},
	el_trattamento: function( Q_idTratt ){ // elimina il trattamento
		var TXT_EL_AL=TXT_ChiediEliminaTrattamento;
		if(DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].TipoTrattamento=='A'){
			TXT_EL_AL=TXT_ChiediEliminaCiclo;
		}
		CONFIRM.vis(	Lingua(TXT_EL_AL),
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			
			var DataModifica = DB.pazienti.lastSync+1;
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].Cancellato=1;
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].md5='';
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].DataModifica=parseInt(DataModifica);
			DB.pazienti.data[PAZIENTI.idCL].DataModifica=parseInt(DataModifica);
			
			// se è un'anamnesi cancello tutto il ciclo
			if(DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].TipoTrattamento=='A'){
				for(i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
					var TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[i];
					if(TR.LabelCiclo==DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].LabelCiclo){
						TR.DataModifica=parseInt(DataModifica);
						TR.Cancellato=1;
					}
				}
			}
		
			endChangeDetection();
			SCHEDA.formModificato = false;
			applicaLoading(document.querySelector(".listaTrattamenti"));
			applicaLoading(document.getElementById("scheda_testo"));
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				LOGIN.sincronizza(	"PAZIENTI.caricaTrattamenti();SCHEDA.scaricaScheda();" );
			});
		}});
	},
	swAgenda: function( data, elemento, funct, el, Q_idTratt ){ // apre e chiude l'agenda in un trattamento
		if(!data)data=oggi;
		else data=new Date(data);
		if(el.dataset.d){
			var D=JSON.parse(el.dataset.d);
			if(typeof(D.data)!='undefined')data=new Date(D.data);
		}
		if(!agendaOp){
			agenda.apri(data,elemento,funct,el,Q_idTratt);
			document.getElementById("dataTxt").className='dataOp';
		}else{
			agenda.chiudi();
			document.getElementById("dataTxt").className='';
		}
	},
	selData: function(txt,el){
		JSN=JSON.parse(txt);
		JSN.data/=1000;
		if(debug)console.log(JSN)
		oraInizio=JSN.oraInizio+"";
		if(oraInizio.indexOf(".")>-1)oraInizio=oraInizio.substr(0,oraInizio.indexOf("."))+":30";
		else oraInizio=oraInizio+":00";
		
		oraFine=JSN.oraFine+"";
		if(oraFine.indexOf(".")>-1)oraFine=oraFine.substr(0,oraFine.indexOf("."))+":30";
		else oraFine=oraFine+":00";
		SCHEDA.formModificato=true;
		el.dataset.d=txt;
		document.formMod.TimeTrattamento.value=JSN.data*1;
		document.formMod.oraInizio.value=JSN.oraInizio;
		document.formMod.oraFine.value=JSN.oraFine;
		document.getElementById("dataTxt").innerHTML="<b>"+getFullDataTS(JSN.data)+"</b> ("+oraInizio+" - "+oraFine+")";
	},
	
	// tsubo
	modNumPunti: function( frm, n ){ // al cambio di tsubo o meridiano
		var mr=eval("document."+frm+".mr_"+n);
		if(typeof(DB.set.meridiani[mr])!='undefined'){
			var punto=eval("document."+frm+".pt_"+n);
			var maxL=punto.options.length;
			for(a=maxL;a>=0;a--){
				punto.options[a]=null;
			}
			var mrProc=new Array();
			for(k in DB.set.meridiani){
				mrProc[k]=DB.set.meridiani[k].tsubo.length;
			}
			for(a=mrProc[mr.value];a>=1;a--){
				punto.options[a]=new Option('',encodeURIComponent(a),false,false);
				var siglaTsubo = a;
				if(DB.set.meridiani[mr.value].tsubo[a-1].siglaTsubo){
					siglaTsubo = DB.set.meridiani[mr.value].tsubo[a-1].siglaTsubo;
					siglaTsubo = siglaTsubo.substr(3,siglaTsubo.length-3);
				}
				punto.options[a].innerHTML=siglaTsubo;
			}
			punto.options[0]=null;
			if(mr.options[0].value=='')mr.options[0]=null;
			document.getElementById("ico_vis"+n).style.display="inline";
		}
		PAZIENTI.ricGroup(frm,n);
	},
	ricGroup: function( frm, n ){
		var mr=eval("document."+frm+".mr_"+n+".value");
		var pt=eval("document."+frm+".pt_"+n+".value");
		var de=eval("document."+frm+".de_"+n+".value");
		if(DB.set.meridiani[mr]){
			var siglaTsubo = __(DB.set.meridiani[mr].tsubo[pt*1-1].siglaTsubo, pt+"."+mr);
			eval("document."+frm+".hd_"+n+'.value="'+siglaTsubo+'"');
		}
		
		var hd=eval("document."+frm+".hd_"+n+".value");
		if(pt.length == 1)pt = "0"+pt;
		var elenco = '';
		for(p in PAZIENTI.puntiProvvisori){
			if(p*1 == n*1){
				PAZIENTI.puntiProvvisori[p].n = pt*1;
				PAZIENTI.puntiProvvisori[p].m = mr;
				PAZIENTI.puntiProvvisori[p].t = de;
				PAZIENTI.puntiProvvisori[p].s = siglaTsubo;
			}
			elenco += PAZIENTI.puntiProvvisori[p].n+'.'+PAZIENTI.puntiProvvisori[p].m;
			if(PAZIENTI.puntiProvvisori[p].e)elenco += '.'+PAZIENTI.puntiProvvisori[p].e;
			elenco += '|';
		}
		
		try{
			//startAnimate();
			SET.evidenziaTsuboMod(elenco.substr(0,elenco.length-1).split("|"));
			//stopAnimate(true);
		}catch(err){}
	},
	caricaPuntiTrattamento: function(){ // carica i punti del trattamento
		document.getElementById('puntiTsuboMap').style.display = 'block';
		document.getElementById('label_puntiTsuboMap').style.display = 'block';
		var elenco = '';
		var HTML = '';
		var totTsubo = 0;
		if( globals.set.cartella == 'meridiani_cinesi' || 
			globals.set.cartella == 'meridiani_shiatsu' ){
			if(PAZIENTI.puntiProvvisori.length){
				for(p in PAZIENTI.puntiProvvisori){
					totTsubo++;
					nTsubo=PAZIENTI.puntiProvvisori[p].n*1;
					siglaMeridiano=PAZIENTI.puntiProvvisori[p].m;
					valutazione=__(PAZIENTI.puntiProvvisori[p].e);
					mezzo=__(PAZIENTI.puntiProvvisori[p].z);
					descrizione=__(PAZIENTI.puntiProvvisori[p].t);
					siglaTsubo=__(PAZIENTI.puntiProvvisori[p].s);
					if(!siglaTsubo)siglaTsubo = nTsubo+'.'+siglaMeridiano;
					
					totPunti=0;
					HTML += '<div class="rgProcMod rgMod dettPunto"' +
							'	  id="rg_'+p+'"';
					if(mouseDetect)HTML += 	' onMouseOver="SET.overTsubo(this,true);"' +
											' onMouseOut="SET.overTsubo(this,false);"';
					HTML += '>' +
							'	<img src="img/ico_cestino.png"' +
							'		 width="16"' +
							'		 height="16"' +
							'		 align="absmiddle"' +
							'		 id="ico_vis'+p+'"' +
							'		 style="margin:10px;' +
							'		  		margin-left:0px;' +
							'		  		cursor:pointer;' +
							'		  		opacity:0.5;' +
							'		  		float:right;"' +
							'		 title="'+Lingua(TXT_DelDett)+'"' +
							'		 onClick="PAZIENTI.eliminaPuntoTrattamento('+p+')"' +
							'		 class="occhio">';
					
					// mezzo
					var addMezzoTit = '';
					if(mezzo)addMezzoTit = ': '+PAZIENTI.mezzi[mezzo];
					HTML += '	<span id="ico_PZ'+p+'"' +
							'	      class="mezzoPunto"' +
							'	      onClick="PAZIENTI.selPZ('+p+');">' +
							'		<img src="img/mezzo_'+mezzo+'.png"' +
							'	  	     width="20"' +
							'	  	     height="20"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(Lingua(TXT_PZDett))+'"'+//+addMezzoTit)+'"' +
							'	  	     class="occhio valEn"> ' +
							'	</span>';
							
					
					
					// siglaTsubo (.s in puntiProvvisori)
					HTML += '<input type="hidden" id="hd_'+p+'" name="hd_'+p+'" value="'+siglaTsubo+'">';
					
					// verifico che esista il meridiano (es. EX su ShiatsuMap)
					if(typeof(DB.set.meridiani[siglaMeridiano])=='undefined'){
						HTML += '<span class="ptNo">'+siglaTsubo+'</span>' +
								'<input type="hidden" id="mr_'+p+'" name="mr_'+p+'" value="'+siglaMeridiano+'">' +
								'<input type="hidden" id="pt_'+p+'" name="pt_'+p+'" value="'+nTsubo+'">';
					}else{
						// meridiano
						HTML += '	<select name="mr_'+p+'"' +
								'	     	 id="mr_'+p+'"' +
								'	     	 onChange="this.blur();' +
								'	     	 		   PAZIENTI.modNumPunti(\'formMod\','+p+');"' +
								'	     	 class="selectTratt">' +
								'<option value="">' +
								'</option>';
						for(k in DB.set.meridiani){
							HTML+='<option value="'+k+'"';
							if(siglaMeridiano==k){
								HTML+=' SELECTED';
								totPunti=DB.set.meridiani[k].tsubo.length;
							}
							HTML+=	'>'+SET.convSigla(k) +
									'</option>';
						}
						HTML += '	</select>';
						
						// punto
						HTML +=	'	<select class="numPoints"' +
								'	     	 name="pt_'+p+'"' +
								'	     	 id="pt_'+p+'"' +
								'	     	 onChange="this.blur();' +
								'	     	 		   SCHEDA.formModificato=true;' +
								'	     	 		   PAZIENTI.ricGroup(\'formMod\','+p+');">';
						for(n=1;n<=totPunti;n++){
							var siglaTsubo = n;
							if(DB.set.meridiani[siglaMeridiano].tsubo[n-1].siglaTsubo){
								siglaTsubo = DB.set.meridiani[siglaMeridiano].tsubo[n-1].siglaTsubo;
								siglaTsubo = siglaTsubo.substr(3,siglaTsubo.length-3);
							}
							HTML += '<option value="'+n+'"';
							if(nTsubo==n)HTML += ' SELECTED';
							HTML += '>'+siglaTsubo+'</option>';
						}
						HTML += '	</select>';
					
						// icona visualizzazione
						HTML += '	<img src="img/ico_vedi.png"' +
								'	     width="16"' +
								'	     height="16"' +
								'	     align="absmiddle"' +
								'	     id="ico_vis'+p+'"' +
								'	     style="';
						if(siglaMeridiano=='')HTML += '		display:none;';
						HTML += '				margin-left:5px;' +
								'				margin-right:7px;' +
								'				margin-top: -4px;' +
								'				cursor:pointer;"' +
								'		 class="occhio"' +
								'		 title="'+htmlEntities(Lingua(TXT_VisualizzaPunto))+'"' +
								'		 onClick="SET.selTsuboMod('+p+');">';
					}
					
					
					
					
					// valutazione energetica
					HTML += '	<span id="ico_PV'+p+'"' +
							'	      class="valPunto"' +
							'	      onClick="PAZIENTI.selPV('+p+');">'+
							'		<img src="img/ico_PV'+valutazione+'.png"' +
							'	  	     width="16"' +
							'	  	     height="16"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(Lingua(TXT_PVDett))+'"' +//+' '+Lingua(eval("TXT_Valutazione"+valutazione)))+'"' +
							'	  	     class="occhio valEn"> ' +
							'	</span>';
					
					HTML += '<input id="de_'+p+'"' +
							' 		name="de_'+p+'"' +
							' 		class="textPuntoTratt okPlaceHolder"' +
							' 		value="'+htmlEntities(descrizione)+'"' +
							' 		placeholder="'+htmlEntities(Lingua(TXT_SpiegazionePuntoTratt))+'"' +
							'		onBlur="PAZIENTI.modNumPunti(\'formMod\','+p+');"'+H.noAutoGen+'>';
					HTML += '</div>';
					elenco += PAZIENTI.puntiProvvisori[p].n+'.'+PAZIENTI.puntiProvvisori[p].m;
					if(PAZIENTI.puntiProvvisori[p].e)elenco += '.'+PAZIENTI.puntiProvvisori[p].e;
					elenco += '|';
				}
				HTML +=	'<div style="clear:both;height:1px;"></div>';
			}
		}else{
			if( PAZIENTI.puntiProvvisori.length ){
				var HTML_noMod = '';
				for(p in PAZIENTI.puntiProvvisori){
					nTsubo=PAZIENTI.puntiProvvisori[p].n*1;
					siglaMeridiano=PAZIENTI.puntiProvvisori[p].m;
					valutazione=__(PAZIENTI.puntiProvvisori[p].e);
					mezzo=__(PAZIENTI.puntiProvvisori[p].z);
					descrizione=__(PAZIENTI.puntiProvvisori[p].t);
					siglaTsubo=__(PAZIENTI.puntiProvvisori[p].s);
					if(!siglaTsubo)siglaTsubo = nTsubo+'.'+siglaMeridiano;
					HTML_noMod += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
					HTML_noMod += '<b>'+siglaTsubo+'</b>';
					if(valutazione)HTML_noMod += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
					if(descrizione)HTML_noMod += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
					HTML_noMod += '</span> ';
					elenco += nTsubo+'.'+siglaMeridiano;
					if(valutazione)elenco += '.'+valutazione;
					elenco += '|';
				}
				totTsubo = PAZIENTI.puntiProvvisori.length;
				HTML = '<span style="margin-bottom: 15px;display: inline-block;">'+HTML_noMod+'</span>';
			}/*else if( DB.login.data.auths.indexOf("meridiani_cinesi")==-1 && 
					  DB.login.data.auths.indexOf("meridiani_shiatsu")==-1 ){
				document.getElementById('puntiTsuboMap').style.display = 'none';
				document.getElementById('tratt_cont_punti').style.display = 'none';
			}*/
		}
		if(!totTsubo){
			totTsubo=0;
			
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						Lingua(TXT_NoRes) +'...' +
					'</div>';
		}
		document.getElementById('totTsubo').innerHTML = totTsubo;
		document.getElementById('puntiTsuboMap').innerHTML=HTML;
		try{SET.evidenziaTsuboMod(elenco.substr(0,elenco.length-1).split("|"));}catch(err){}
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	ricPuntiTratt: function(){ // ricarica i punti del trattamento (dopo un'azione es. elimina o nuovo)
		if(	PAZIENTI.puntiProvvisori.length && 
			(globals.set.cartella == 'meridiani_cinesi' || globals.set.cartella == 'meridiani_shiatsu') ){
			var puntiProvvisori='';
			for(p in PAZIENTI.puntiProvvisori){
				var im=document.getElementById("ico_PV"+p).getElementsByTagName("img")[0].src;
				if(im.indexOf("ico_PV.")!==-1)imPV='';
				else if(im.indexOf("ico_PVV.")!==-1)imPV='V';
				else if(im.indexOf("ico_PVP.")!==-1)imPV='P';
				else imPV='D';
				PAZIENTI.puntiProvvisori[p].n = document.getElementById('pt_'+p).value*1;
				PAZIENTI.puntiProvvisori[p].m = document.getElementById('mr_'+p).value;
				PAZIENTI.puntiProvvisori[p].s = document.getElementById('hd_'+p).value;
				PAZIENTI.puntiProvvisori[p].e = imPV;
				var n=0;
				for(m in DB.set.meridiani){
					if(DB.set.meridiani[m].siglaMeridiano==document.getElementById('mr_'+p).value){
						n=(document.getElementById('pt_'+p).value*1+DB.set.meridiani[m].iniMerid*1)-1;
					}
				}
			}
		}
	},
	aggiungiPuntoTrattamento: function( PT ){ // aggiunge un singolo punto al trattamento
		if(typeof(PT)=='undefined')var PT='0.';
		PAZIENTI.ricPuntiTratt();
		var n = PT.split(".")[0]*1;
		var siglaMeridiano = PT.split(".")[1];
		var siglaTsubo = __(DB.set.meridiani[siglaMeridiano].tsubo[n-1].siglaTsubo, PT);
		PAZIENTI.puntiProvvisori.push({
			n: n,
			m: siglaMeridiano,
			e: '',
			z: '',
			t: '',
			s: siglaTsubo
		});
		PAZIENTI.caricaPuntiTrattamento();
		SCHEDA.formModificato = true;
	},
	aggiungiGruppoTrattamento: function( punti ){ // importa un gruppo di punti
		PAZIENTI.topAdd = tCoord(document.getElementById("p_add_dett"),'y');
		SCHEDA.formModificato=true;
		if(PAZIENTI.tipoGruppo=='P')PAZIENTI.ricPuntiTratt();
		var pP=punti.split("|");
		var presenti=false;
		var pass=true;
		var totAggiunti = 0;
		for(var p=0;p<pP.length-1;p++){
			// verifico che non ci sia già
			pass=true;
			if(PAZIENTI.tipoGruppo=='P'){
				for(k in PAZIENTI.puntiProvvisori){
					if(	PAZIENTI.puntiProvvisori[k].n == pP[p].split(".")[0]*1 && 
						PAZIENTI.puntiProvvisori[k].m == pP[p].split(".")[1]){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					var n = pP[p].split(".")[0]*1;
					var siglaMeridiano = pP[p].split(".")[1];
					var siglaTsubo = __(DB.set.meridiani[siglaMeridiano].tsubo[n-1].siglaTsubo, pP[p]);
					PAZIENTI.puntiProvvisori.push({
						n: n,
						m: siglaMeridiano,
						e: '',
						z: '',
						t: '',
						s: siglaTsubo
					});
					totAggiunti++;
				}
			}else{
				for(k in PAZIENTI.meridianiProvvisori){
					if(PAZIENTI.meridianiProvvisori[k].siglaMeridiano == pP[p]){
						pass=false;
						presenti=true;
					}
				}
				if(pass){
					PAZIENTI.aggiungiMeridianoTrattamento(pP[p]);
					totAggiunti++;
				}
			}
		}
		if(presenti){
			if(PAZIENTI.tipoGruppo=='P')ALERT(Lingua(TXT_PuntiPresenti));
			else ALERT(Lingua(TXT_MeridianiPresenti));
		}
		if(totAggiunti){
			if(PAZIENTI.tipoGruppo=='P'){
				PAZIENTI.caricaPuntiTrattamento();
				PAZIENTI.evidenziaAggiunti(document.getElementById('puntiTsuboMap'),totAggiunti);
			}else{
				PAZIENTI.caricaMeridianiTrattamento();
				PAZIENTI.evidenziaAggiunti(document.getElementById('meridianiTsuboMap'),totAggiunti);
			}
		}
	},
	eliminaPuntoTrattamento: function( n ){ // elimina un punto del trattamento
		PAZIENTI.ricPuntiTratt();
		PAZIENTI.puntiProvvisori.splice(n,1);
		PAZIENTI.caricaPuntiTrattamento();
		SCHEDA.formModificato = true;
	},
	cambiaPV: function( n, m ){ // cambia la valutazione energetica su un punto
		var el = document.getElementById("ico_PV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		/*el.title = htmlEntities(Lingua(TXT_PVDett)+' '+Lingua(eval("TXT_Valutazione"+m)));*/
		SET.overTsubo(document.getElementById("pt_"+n).parentElement,false);
		PAZIENTI.puntiProvvisori[n].e = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricGroup("formMod",n);
		SET.overTsubo(document.getElementById("pt_"+n).parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	cambiaPZ: function( n, m ){ // cambia il mezzo su un punto
		var el = document.getElementById("ico_PZ"+n);
		el.getElementsByTagName("img")[0].src='img/mezzo_'+m+'.png';
		SET.overTsubo(document.getElementById("pt_"+n).parentElement,false);
		/*var addMezzoTit = '';
		if(m)addMezzoTit = ': '+PAZIENTI.mezzi[m];
		el.title = htmlEntities(Lingua(TXT_PZDett)+addMezzoTit);*/
		PAZIENTI.puntiProvvisori[n].z = m;
		SCHEDA.formModificato = true;
		PAZIENTI.ricGroup("formMod",n);
		SET.overTsubo(document.getElementById("pt_"+n).parentElement,true);
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	selPV: function( n ){
		var html = '';
		var pvs = [ '', 'V', 'P', 'D' ];
		for(m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaPV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(Lingua(eval("TXT_Valutazione"+pvs[m])))+'"></span>';
		}
		H.selTT(n,"ico_PV",html);
	},
	selPZ: function( n ){
		var html = '';
		for(m in PAZIENTI.mezzi){
			html += '<span style="background-image:url(img/mezzo_'+m+'.png);"' +
					'	   onClick="PAZIENTI.cambiaPZ('+n+',\''+m+'\');"' +
					'	   title="'+htmlEntities(PAZIENTI.mezzi[m])+'"></span>';
		}
		H.selTT(n,"ico_PZ",html);
	},
	
	// importazione GRUPPI di punti e meridiani
	gruppoPunti: function( tipo ){ // costruisce il JSON dei gruppi punti (all'apertura del trattamento)
		if(typeof(tipo)=='undefined')var tipo = 'P';
		PAZIENTI.tipoGruppo = tipo;
		applicaLoading(document.getElementById("scheda_testo"));
		document.getElementById("LL").onclick = function(){PAZIENTI.swGruppoPunti();};
		
		PAZIENTI.elencoGruppoPunti = {};
		PAZIENTI.elencoGruppoPunti.titolo = "";
		PAZIENTI.elencoGruppoPunti.contenuto = [];
		PAZIENTI.elencoGruppoPunti.livello = 1;
		var presenti = false;
		
		// punti da MERIDIANI
		
		EL = {};
		EL.titolo = Lingua(TXT_MeridianiTrattamento);
		EL.contenuto = [];
		if(PAZIENTI.tipoGruppo=='P')EL.livello = 2;
		else EL.livello = 3;
		EL.parent = PAZIENTI.elencoGruppoPunti;
		var n = -1;
		for(i in DB.set.meridiani){
			n++;
			if(PAZIENTI.tipoGruppo=='P'){ // punti
				EL.contenuto[n] = {};
				EL.contenuto[n].titolo = DB.set.meridiani[i].NomeMeridiano;
				EL.contenuto[n].contenuto = [];
				EL.contenuto[n].livello = 3;
				EL.contenuto[n].parent = EL;
				for(pm in DB.set.meridiani[i].tsubo){
					if(DB.set.meridiani[i].tsubo[pm].NomeTsubo){
						var pP=DB.set.meridiani[i].tsubo[pm].NomeTsubo.split(". ");
						EL.contenuto[n].contenuto.push(pP[0]);
					}
				}	
			}else{ // meridiani
				if(i!='EX')EL.contenuto.push(i);
			}
		}
		PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
		
		// punti da TEORIA
		for(t in DB.set.teoria){
			if(!__(DB.set.teoria[t].noList)){
				EL = {};
				EL.titolo = DB.set.teoria[t].TitoloSezione;
				EL.contenuto = [];
				EL.livello = 2;
				EL.parent = PAZIENTI.elencoGruppoPunti;
				for(i in DB.set.teoria[t].contenuti){
					EL2 = {};
					EL2.titolo = DB.set.teoria[t].contenuti[i].TitoloTeoria;
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					// scansiono il testo
					var txtTeo=DB.set.teoria[t].contenuti[i].TestoTeoria;
					
					if(PAZIENTI.tipoGruppo=='P')re = /\[\.[0-9]{1,2}\.[A-Z]{2}\.\]/ig;
					else re = /\[\.[A-Z]{2}\.\]/ig;
					var result = txtTeo.match(re);
					for(k in result){
						var pP = result[k].split(".");
						PT=pP[1];
						if(PAZIENTI.tipoGruppo=='P')PT += '.'+pP[2];
						if(EL2.contenuto.indexOf(PT)===-1){
							EL2.contenuto.push(PT);
							presenti = true;
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
			EL.titolo = Lingua(TXT_Procedure);
			EL.contenuto = [];
			EL.livello = 2;
			EL.parent = PAZIENTI.elencoGruppoPunti;
						
			var presenti=false;
			for(p in DB.procedure.data){
				if(!DB.procedure.data[p].Cancellato){
					EL2 = {};
					EL2.titolo = DB.procedure.data[p].NomeProcedura;
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					// scansiono i dettagli
					for(i in DB.procedure.data[p].dettagliProcedura){
						var DT = DB.procedure.data[p].dettagliProcedura[i];
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
			if(CONN.getConn()){
				// carico i preferiti della community
				var JSNPOST={	"idLinguaRic": 0,
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
		var err=false;
		var record_tot=0;
		var presente=false;
		if(txt.substr(0,3) != '404' && txt != 'vuoto'){
			
			
			if(PAZIENTI.tipoGruppo=='P'){ // DA RIVEDERE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<|!!!!!!!!!!!!!!!!
				
				
				EL = {};
				EL.titolo = Lingua(TXT_CommunityPreferiti);
				EL.contenuto = [];
				EL.livello = 2;
				EL.parent = PAZIENTI.elencoGruppoPunti;
				var presenti = false;
				var preferiti = JSON.parse(txt);
				for(p in preferiti.dati){
					EL2 = {};
					EL2.titolo = preferiti.dati[p].NomeProcedura+' ('+htmlEntities(preferiti.dati[p].Pseudonimo);
					EL2.contenuto = [];
					EL2.livello = 3;
					EL2.parent = EL;
					if(preferiti.dati[p].elencoPunti.length>1){
						var elenco = preferiti.dati[p].elencoPunti.split("|");
						if(PAZIENTI.tipoGruppo=='M')elenco = preferiti.dati[p].elencoMeridiani.split("|");
						for(pr in elenco){
							var PT = elenco[pr];
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
		EL = {};
		EL.titolo = Lingua(TXT_Patologie);
		EL.contenuto = [];
		EL.livello = 2;
		EL.parent = PAZIENTI.elencoGruppoPunti;
		for(i in DB.set.patologie){
			EL2 = {};
			EL2.titolo = DB.set.patologie[i].NomePatologia;
			EL2.contenuto = [];
			EL2.livello = 3;
			EL2.parent = EL;
			// scansiono il testo
			var txtPat=DB.set.patologie[i].TestoPatologia;
			if(PAZIENTI.tipoGruppo=='P')re = /\[\.[0-9]{1,2}\.[A-Z]{2}\.\]/ig;
			else re = /\[\.[A-Z]{2}\.\]/ig;
			var result = txtPat.match(re);
			for(k in result){
				var pP = result[k].split(".");
				PT = pP[1];
				if(PAZIENTI.tipoGruppo=='P')PT += '.'+pP[2];
				if(EL2.contenuto.indexOf(PT)==-1){
					EL2.contenuto.push(PT);
				}
			}
			if(EL2.contenuto.length){
				EL.contenuto[i] = EL2; 
			}
		}
		PAZIENTI.elencoGruppoPunti.contenuto.push(EL);
		PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoPunti;
		PAZIENTI.swGruppoPunti();
	},
	swGruppoPunti: function(){ // visualizza/nasconde il menu del gruppo punti in un trattamento
		if(!document.getElementById("gruppoPunti_cont").classList.contains("visSch")){
			rimuoviLoading(document.getElementById("scheda_testo"));
			applicaLoading(document.getElementById("scheda_testo"),'vuoto');
			document.getElementById("LL").onclick = function(){PAZIENTI.swGruppoPunti();};
			var w = (document.getElementById("scheda_testo").scrollWidth-60);
			var l = 30;
			var maxW = 400;
			if(w>maxW){
				w = maxW;
				l = (document.getElementById("scheda").scrollWidth/2-maxW/2);
			}
			document.getElementById("gruppoPunti_cont").style.left = l+"px";
			document.getElementById("gruppoPunti_cont").style.width = w+"px";
			/*document.getElementById("gruppoPunti_cont").style.top = (document.getElementById("scheda").scrollHeight/2-70)+"px";*/
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
		var HTML = '';
		var txt = htmlEntities(Lingua(TXT_ImportaPunti));
		if(PAZIENTI.tipoGruppo=='M')txt = htmlEntities(Lingua(TXT_ImportaMeridiani));
		HTML += '<div class="gr_tit">' +
					txt +
				'	<span onClick="PAZIENTI.swGruppoPunti();">' +
				'</span>' +
				'</div>';
		if(PAZIENTI.elencoGruppoAtt.livello>1){
			var titRet = htmlEntities(PAZIENTI.elencoGruppoAtt.titolo);
			HTML += '<div class="gr_ret">' +
					'	<div class="gr_ret_img" onClick="PAZIENTI.swGrLabel(-1);"></div>' +
					'	<div class="gr_ret_txt">'+titRet+'</div>' +
					'	<input id="gr_ret_ric" onKeyUp="PAZIENTI.filtraGruppoPunti();">' +
					'</div>';
		}
		HTML += '<div class="gr_'+(PAZIENTI.elencoGruppoAtt.livello-1)+'">';
		for(k in PAZIENTI.elencoGruppoAtt.contenuto){
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
					'	<span onClick="PAZIENTI.ptGruppoSelAll(this);">' +
							htmlEntities(Lingua(TXT_SelezionaTutti)) +
					'	</span>' +
					'	<span onClick="PAZIENTI.ptGruppoImporta();">' +
							htmlEntities(Lingua(TXT_Importa)) +
					'	</span>' +
					'</div>';
		}
		document.getElementById("gruppoPunti_cont").innerHTML = HTML;
		document.getElementById("gruppoPunti_cont").scrollTo(0,0);
		if(document.getElementById("gr_ret_ric"))document.getElementById("gr_ret_ric").focus();
	},
	filtraGruppoPunti: function(){
		var tag = 'div';
		var lista = '.gr_1';
		var cont = document.getElementById("gruppoPunti_cont");
		if(cont.getElementsByClassName("gr_2").length){
			tag = 'label';
			lista = '.gr_2';
		}
		var val = document.getElementById("gr_ret_ric").value.toLowerCase().trim();
		var tags = document.querySelector(lista).getElementsByTagName(tag);
		for(t=0;t<tags.length;t++){
			var txt = tags[t].innerText+"";
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
		var pP = PT.split(".");
		var HTML = 	
				'<label class="gr_3"' +
				'		for="'+n+'">' +
				'	<input type="checkbox"' +
				'		   id="'+n+'"' +
				'		   value="'+PT+'">';
		if(PAZIENTI.tipoGruppo=='P'){
			var siglaPT = __(DB.set.meridiani[pP[1]].tsubo[pP[0]*1-1].siglaTsubo,pP[0]+"."+SET.convSigla(pP[1]));
			HTML +=	'<b>'+siglaPT+'.</b>' +
					'<i>'+DB.set.meridiani[pP[1]].tsubo[pP[0]*1-1].NomeTsubo.replace(PT+".","")+'</i>';
		}else{
			HTML +=	DB.set.meridiani[PT].NomeMeridiano;
		}
		HTML +=	'</label>';
		return HTML;
	},
	ptGruppoSelAll: function( el ){ // seleziona tutti i punti visualizzati del menu dei gruppi di punti
		var els = el.parentElement.parentElement.getElementsByTagName("input");
		var sel = '';
		//if(els[0].checked)sel = false
		for(e in els){
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
		var els = document.getElementById("gruppoPunti_cont").getElementsByTagName("input");
		var punti = '';
		for(e in els){
			if(els[e].checked && els[e].type=='checkbox')punti += els[e].value+"|";
		}
		if(punti){
			if(!document.getElementById("scheda").classList.contains("scheda_procedura")){
				PAZIENTI.aggiungiGruppoTrattamento(punti);
			}else SET.aggiungiGruppoProcedura(punti);
			PAZIENTI.swGruppoPunti();
			PAZIENTI.elencoGruppoAtt = PAZIENTI.elencoGruppoPunti;
		}else ALERT(Lingua(TXT_ErroreImportaPunti));
	},
	evidenziaAggiunti: function( cont, n ){
		var els = cont.getElementsByClassName("rgProcMod");
		for(e=els.length-1;e>=0;e--){
			if(n>0){
				els[e].classList.add("aggiunti");
				n--;
			}
		}
		setTimeout(function(cont){
			if(cont){
				var els = cont.getElementsByClassName("rgProcMod");
				for(e=els.length-1;e>=0;e--){
					els[e].classList.remove("aggiunti");
				}
			}
		},4000,cont);
	},
	
	
	
	
	// meridiani
	caricaMeridianiTrattamento: function(){ // carica i punti del trattamento
		document.getElementById('meridianiTsuboMap').style.display = 'block';
		document.getElementById('label_meridianiTsuboMap').style.display = 'block';
		var modificabile = false;
		if( globals.set.cartella == 'meridiani_cinesi' ||
			globals.set.cartella == 'meridiani_shiatsu' ){
			modificabile = true;
		}/*else{
			if( !PAZIENTI.meridianiProvvisori.length &&
				DB.login.data.auths.indexOf("meridiani_cinesi")==-1 && 
				DB.login.data.auths.indexOf("meridiani_shiatsu")==-1 ){
				document.getElementById('meridianiTsuboMap').style.display = 'none';
				document.getElementById('tratt_cont_meridiani').style.display = 'none';
			}
		}*/
		var HTML = '';
		if(PAZIENTI.meridianiProvvisori.length){
			for(m in PAZIENTI.meridianiProvvisori){
				var m2 = __(PAZIENTI.meridianiProvvisori[m].valEnergetica);
				var descrizione = __(PAZIENTI.meridianiProvvisori[m].descrizione);
				HTML += '<div class="rgProcMod ';
				if(modificabile)HTML += 'rgMod ';
				HTML += 'dettMeridiano';
				if(typeof(MERIDIANI) != 'undefined'){
					if(MERIDIANI[PAZIENTI.meridianiProvvisori[m].siglaMeridiano].meridianoAcceso){
						HTML += ' p_'+MERIDIANI[PAZIENTI.meridianiProvvisori[m].siglaMeridiano].elemento;
					}
				}
				HTML += '"' +
						//' id="rg_'+m+'"';
						' id="tr_p'+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'">';
				if(modificabile){
					HTML +=
						
						'	<img src="img/ico_cestino.png"' +
						'		 width="16"' +
						'		 height="16"' +
						'		 align="absmiddle"' +
						'		 id="ico_vis'+p+'"' +
						'		 style="cursor: pointer !important;' +
						'				opacity: 0.5;' +
						'				float: right;' +
						'				margin: 8px;"' +
						'		 title="'+Lingua(TXT_DelDett)+'"' +
						'		 onMouseOver="PAZIENTI.overCestino=true;"' +
						'		 onMouseOut="PAZIENTI.overCestino=false;"' +
						'		 onClick="PAZIENTI.eliminaMeridianoTrattamento('+m+')"' +
						'		 class="occhio">';
				}
				HTML += '	<span';
				if(modificabile){
					HTML += ' class="meridModif"' +
							' style="cursor:pointer;"' +
							' onClick="if(!PAZIENTI.overCestino)SET.accendiMeridiano(\''+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\',true);"';
					if(mouseDetect){
						HTML += ' onMouseOver="SET.eviMeridiano(\''+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\',true);"' +
								' onMouseOut="SET.eviMeridiano(\''+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\',false);"';
					}
				}
				HTML += '>' +
								PAZIENTI.meridianiProvvisori[m].NomeMeridiano;
				if(descrizione && !modificabile)HTML += ', <font style="font-style:italic;">'+htmlEntities(descrizione)+'</font>';
				HTML += '		<span id="ico_MV'+m+'"' +
						'		      class="valPunto valMerid"';
				if(modificabile)HTML +=
						'			  onMouseOver="PAZIENTI.overCestino=true;"' +
						'			  onMouseOut="PAZIENTI.overCestino=false;"' +
						'		      onClick="PAZIENTI.selMV('+m+',\'tr_p'+PAZIENTI.meridianiProvvisori[m].siglaMeridiano+'\');"';
				else HTML += '		  style="cursor:default !important;"';
				HTML += '>' +
						'			<img src="img/ico_PV'+m2+'.png"' +
						'		  	     width="16"' +
						'		  	     height="16"' +
						'		  	     align="absmiddle"' +
						'		  	     title="'+ htmlEntities(Lingua(TXT_PVDett))+'"' +//+' '+Lingua(eval("TXT_Valutazione"+m2)));+'"' +
						'		  	     class="occhio valEn"> ' +
						'  		 	<b>' +
										Lingua(eval("TXT_Valutazione"+m2)) +
						'			</b>' +
						'		</span>' +
						'	</span>';
					
				if(modificabile)HTML +=
							'<input id="dm_'+m+'"' +
							' 		name="dm_'+m+'"' +
							' 		class="textMeridianoTratt okPlaceHolder"' +
							' 		value="'+htmlEntities(descrizione)+'"' +
							' 		placeholder="'+htmlEntities(Lingua(TXT_SpiegazioneMeridianoTratt))+'"' +
							'		onBlur="PAZIENTI.meridianiProvvisori['+m+'].descrizione=this.value;"'+H.noAutoGen+'>';
				
				HTML += '</div>';
			}
			if(!modificabile)HTML +='<p style="height:5px;"></p>';
		}else{
			HTML +=	'<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						Lingua(TXT_NoRes) +'...' +
					'</div>';
		}
		document.getElementById('totMeridiani').innerHTML = PAZIENTI.meridianiProvvisori.length;
		document.getElementById('meridianiTsuboMap').innerHTML=HTML;
		
		if(PAZIENTI.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-PAZIENTI.topAdd));
		PAZIENTI.topAdd = null;
	},
	aggiungiMeridianoTrattamento: function( siglaMeridiano ){ // aggiunge un singolo punto al trattamento;
		JSNPUSH = {
			siglaMeridiano: siglaMeridiano,
			NomeMeridiano: DB.set.meridiani[siglaMeridiano].NomeMeridiano,
			valEnergetica: ""
		}
		var presente = false;
		for(m in PAZIENTI.meridianiProvvisori){
			if(PAZIENTI.meridianiProvvisori[m].siglaMeridiano == siglaMeridiano)presente = true;
		}
		if(!presente)PAZIENTI.meridianiProvvisori.push(JSNPUSH);
		SCHEDA.formModificato = true;
		PAZIENTI.caricaMeridianiTrattamento();
		document.getElementById("grpMrd").selectedIndex = 0;
	},
	eliminaMeridianoTrattamento: function( n ){ // elimina un punto del trattamento
		PAZIENTI.meridianiProvvisori.splice(n, 1); 
		PAZIENTI.caricaMeridianiTrattamento();
		SCHEDA.formModificato = true;
	},
	cambiaMV: function( n, m ){ // cambia la valutazione energetica su un punto
		var el = document.getElementById("ico_MV"+n);
		el.getElementsByTagName("img")[0].src='img/ico_PV'+m+'.png';
		/*el.title = htmlEntities(Lingua(TXT_PVDett)+' '+Lingua(eval("TXT_Valutazione"+m)));*/
		PAZIENTI.meridianiProvvisori[n].valEnergetica = m;
		SCHEDA.formModificato = true;
		document.getElementById("tt_mezzival").dataset.on='0';
		H.removeTT();
	},
	selMV: function( n ){
		var html = '';
		var pvs = [ '', 'V', 'P', 'D' ];
		for(m=0;m<pvs.length;m++){
			html += '<span style="background-image:url(img/ico_PV'+pvs[m]+'.png);"' +
					'	   onClick="PAZIENTI.cambiaMV('+n+',\''+pvs[m]+'\');"' +
					'	   title="'+htmlEntities(Lingua(eval("TXT_Valutazione"+pvs[m])))+'"></span>';
		}
		H.selTT(n,"ico_MV",html);
	},
	
	// sintomi
	caricaSintomi: function(){ // carica i punti del trattamento
		var HTML='';
		var totSintomi = 0;
		var selectScoreHTML = 	'<select onChange="PAZIENTI.ricSintomiTratt([p],this);" class="scoreSelect">' +
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
			for(p in PAZIENTI.sintomiProvvisori){
				totSintomi++;
				HTML += '<div data-id="'+PAZIENTI.sintomiProvvisori[p].idSintomo+'">' +
						'	<span>' +
								htmlEntities(PAZIENTI.sintomiProvvisori[p].NomeSintomo) +
						'		<img src="img/ico_modifica_anag.png"' +
						'			 class="ico_mod_label"' +
						'			 data-value="'+htmlEntities(PAZIENTI.sintomiProvvisori[p].NomeSintomo)+'"' +
						'		 	 onClick="PAZIENTI.modificaSintomo(this);">' +
						'	</span>' +
						'	<img src="img/ico_cestino.png"' +
						'		 title="'+Lingua(TXT_DelDett)+'"' +
						'		 onClick="PAZIENTI.eliminaSintomo('+p+');"' +
						'		 class="occhio">' +
							selectScoreHTML.replace('value="'+PAZIENTI.sintomiProvvisori[p].score+'"',
													'value="'+PAZIENTI.sintomiProvvisori[p].score+'" SELECTED').replace("[p]",p) +
						'</div>';
			}
		}else{
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						Lingua(TXT_NoRes)+'...' +
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
		if(typeof(id)=='undefined')var id=0;
		var el = document.getElementById("paz_add");
		var txt = el.value;
		if(txt.trim()!=''){
			var global = PAZIENTI.sintomiProvvisori;
			var pass = true;
			if(txt.trim()=='')pass=false;
			var oldValue = '';
			if(el.parentElement.getElementsByTagName("div")[0].dataset.oldName){ // verifico se è in modifica con oldValue
				oldValue = el.parentElement.getElementsByTagName("input")[0].dataset.oldValue;
			}
			var els = document.getElementById("elencoSintomi").getElementsByClassName("elMod");
			for(e in els){
				if(els[e].dataset){
					var val = els[e].dataset.value.toLowerCase();
					if(	val.trim() == txt.toLowerCase().trim() && !oldValue){
						PAZIENTI.selezionaSintomo(e);
						return;
					}
				}
			}
			
			// verifico doppione
			if(!oldValue){
				for(s in PAZIENTI.sintomiProvvisori){
					if(txt.trim() == PAZIENTI.sintomiProvvisori[s].NomeSintomo){
						ALERT(Lingua(TXT_erroreDuplicazioneElemento))
						return;
					}
				}
			}
			var id = 0;
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
						var DataModifica = DB.pazienti.lastSync+1;
						var modificato = false;
						var PZS = clone(DB.pazienti.data);
						for(p in PZS){
							if(PZS.Cancellato!=1){
								var TRS = PZS[p].trattamenti;
								var pzMod = false;
								for(t in TRS){
									if(TRS.Cancellato!=1 && TRS[t].sintomi!='[]'){
										var sintomi = JSON.parse(TRS[t].sintomi);
										for(s in sintomi){
											if(sintomi[s].NomeSintomo==oldValue){
												sintomi[s].NomeSintomo=txt;
												modificato = true;
												pzMod = true;
											}
										}
										if(pzMod)DB.pazienti.data[p].trattamenti[t].sintomi = JSON.stringify(sintomi);
									}
								}
								if(pzMod)DB.pazienti.data[p].DataModifica = DataModifica;
							}
						}

						for(p in PAZIENTI.sintomiProvvisori){
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
								LOGIN.sincronizza(	'/*noRic*/' +
													'rimuoviLoading(document.getElementById("scheda_testo"));' +
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
	eliminaSintomo: function( n ){ // elimina un punto del trattamento
		PAZIENTI.sintomiProvvisori.splice(n, 1); 
		PAZIENTI.caricaSintomi();
		PAZIENTI.popolaSintomi();
		PAZIENTI.annullaSintomo();
		SCHEDA.formModificato = true;
	},
	getSintomi: function(){ // restituisce l'elenco globale dei sintomi
		var SINTOMI = [];
		var PZ = DB.pazienti.data;
		for(p in PZ){
			var TR = PZ[p].trattamenti;
			for(t in TR){
				var sintomi = TR[t].sintomi;
				if(!sintomi)sintomi = "[]";
				sintomi = JSON.parse(sintomi)
				if(sintomi.length){
					for(s in sintomi){
					   var pass = true;
					   for(S in SINTOMI){
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
		if(typeof(id)=='undefined')var id=0;
		var globalSintomi = PAZIENTI.getSintomi();
		JSNPUSH={	"idSintomo": id*1,
					"NomeSintomo": globalSintomi[t].NomeSintomo,
					"score": 0 };
			
		SCHEDA.formModificato = true;
		if(PAZIENTI.sintomiProvvisori=='')PAZIENTI.sintomiProvvisori=[];
		PAZIENTI.sintomiProvvisori.push(JSNPUSH);
		PAZIENTI.caricaSintomi();
		document.getElementById("paz_add").value='';
		PAZIENTI.nasAggiungiSintomo();
		PAZIENTI.annullaSintomo();
	},
	popolaSintomi: function(){
		var HTML = '';
		var globalSintomi = PAZIENTI.getSintomi();
		for(t in globalSintomi){
			var pass = true;
			for(e in PAZIENTI.sintomiProvvisori){
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
		if(!HTML)HTML = '<div class="noResults">' + htmlEntities(Lingua(TXT_NoResSintomi)) + '</div>';
		document.getElementById("elencoSintomi").innerHTML = HTML;
	},
	modificaSintomo: function( el ){
		PAZIENTI.visAggiungiSintomo();
		var valore = el.dataset.value;
		var cont = document.getElementById("cont_label_add_sintomi");
		var campo = cont.getElementsByTagName("input")[0];
		var pulsanteModifica = cont.getElementsByTagName("div")[0];
		var pulsanteAnnulla = cont.getElementsByTagName("div")[1];
		campo.value = valore;
		campo.dataset.oldValue = valore;
		pulsanteModifica.dataset.oldName = pulsanteModifica.innerHTML;
		pulsanteModifica.innerHTML = htmlEntities(Lingua(TXT_Modifica));
		pulsanteAnnulla.classList.add("visBtn");
		cont.classList.add("modEl");
		campo.focus();
	},
	annullaSintomo: function(){
		var cont = document.getElementById("cont_label_add_sintomi");
		var campo = cont.getElementsByTagName("input")[0];
		var pulsanteModifica = cont.getElementsByTagName("div")[0];
		var pulsanteAnnulla = cont.getElementsByTagName("div")[1];
		campo.value = '';
		campo.dataset.oldValue = '';
		if(pulsanteModifica.dataset.oldName)pulsanteModifica.innerHTML = pulsanteModifica.dataset.oldName;
		pulsanteModifica.dataset.oldName = '';
		cont.classList.remove("modEl");
		pulsanteAnnulla.classList.remove("visBtn");
	},
	filtraSintomi: function(el){
		var val = el.value.trim().toLowerCase();
		if(event.keyCode==13){
			el.blur();
			PAZIENTI.aggiungiSintomo();
		}else{
			var elenco = document.getElementById("elencoSintomi");
			var els = elenco.getElementsByClassName("elMod");
			var campo = document.getElementById("paz_add");
			var oldValue = campo.dataset.oldValue;
			if(typeof(oldValue)=='undefined')oldValue = '';
			if(oldValue==''){
				
				var els = document.getElementById("elencoSintomi").getElementsByTagName("div");
				for(e in els){
					if(els[e].innerText){
						var cont=els[e].innerText.toLowerCase();
						if(cont.indexOf(val)>-1 || !val)els[e].style.display = 'block';
						else els[e].style.display = 'none';
					}
				}
			}
		}
	},
	
	// gallery
	caricaGalleryTrattamento: function(){
		if(typeof(DB.foto) == 'undefined'){
			localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".foto")).then(function(dbCont){ // leggo il DB NOTE
				DB.foto = JSON.parse(dbCont);
				PAZIENTI.caricaGalleryTrattamento_post();
			});
		}else{
			PAZIENTI.caricaGalleryTrattamento_post();
		}
	},
	caricaGalleryTrattamento_post: function(){ // carica i punti del trattamento
		var HTML='';
		var totFoto = 0;
		var afterFunct = '';
		if(PAZIENTI.galleryProvvisoria.length){
			for(i in PAZIENTI.galleryProvvisoria){
				totFoto++;
				var src = '';
				var cls = '';
				var locale = false;
				if(PAZIENTI.galleryProvvisoria[i].nuova){
					locale = true;
					src = PAZIENTI.galleryProvvisoria[i].imgMini;
				}
				if(!locale){
					for(f in DB.foto.data){
						if(DB.foto.data[f].idFoto == PAZIENTI.galleryProvvisoria[i].idFoto){
							if(DB.foto.data[f].imgMini){
								locale = true;
								src = DB.foto.data[f].imgMini;
							}
						}
					}
				}
				if(!locale){
					if(CONN.getConn()){
						// se connesso a internet la scarico
						afterFunct += "CONN.caricaUrl(	'getImgGallery.php','n="+i+"&iU="+DB.login.data.idUtente+"&idFoto="+PAZIENTI.galleryProvvisoria[i].idFoto+"','PAZIENTI.scriviFoto');";
					}else{
						cls='noConn';
					}
				}
				HTML += '<div id="gall_'+i+'"' +
						'	  class="' +
							  ((cls) ? cls : '') +
						  	  ((locale) ? 'fotoLocale' : '') + '">' +
						'	<div' +
								((src) ? ' style="background-image:url(\''+src+'\');"' : '') +
						' 		  onClick="if(!PAZIENTI.overCestino)PAZIENTI.fullFoto('+i+','+locale+');">' +
						'		<img class="gall_full"' +
						'		 	 src="img/ico_fullscreen.png">' +
						'		<img class="gall_del"' +
						'		 	 src="img/ico_cestinoB.png"' +
						'		 	 onMouseOver="PAZIENTI.overCestino=true;"' +
						'		 	 onMouseOut="PAZIENTI.overCestino=false;"' +
						'		 	 onClick="PAZIENTI.eliminaFoto('+i+');">' +
						'	</div>' +
						'</div>';
			}
			document.getElementById('contGallery').classList.add("galleryFull");
			document.getElementById('contGallery').innerHTML = HTML;
		}
		if(!totFoto){
			document.getElementById('contGallery').classList.remove("galleryFull");
			HTML += '<div class="noResults"' +
					'	  style="padding-left:30px;">' +
						Lingua(TXT_NoRes)+'...' +
					'</div>';
		}
		if(totFoto < PAZIENTI.maxFoto)document.getElementById('p_add_dett').style.display = 'block';
		else document.getElementById('p_add_dett').style.display = 'none';
		document.getElementById('totFoto').innerHTML = totFoto;
		document.getElementById('contGallery').innerHTML = HTML;
		if(afterFunct)eval(afterFunct);
	},
	scriviFoto: function( res ){
		res = JSON.parse( res )
		if(document.getElementById("gall_"+res.n)){
			if(res.imgMini)document.getElementById("gall_"+res.n).getElementsByTagName('div')[0].style.backgroundImage='url(\''+res.imgMini+'\')';
		}
	},
	selezionaFoto: function( element ){
		PH.encodeImageFileAsURL( element, false, true, 'PAZIENTI.aggiungiFoto' );
	},
	aggiungiFoto: function( obj ){
		obj = JSON.parse(obj);
		var d = new Date()*1
		var JSNPUSH = {	idFoto: "foto_"+d,
						imgMini: obj.imgMini,
						imgBig: obj.imgBig,
						nuova: true }
		PAZIENTI.galleryProvvisoria.push(JSNPUSH);
		PAZIENTI.caricaGalleryTrattamento();
		SCHEDA.formModificato = true;
	},
	eliminaFoto: function( f ){
		CONFIRM.vis(	Lingua(TXT_ChiediEliminaFoto),
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));

			PAZIENTI.galleryProvvisoria.splice(f,1);
			
			PAZIENTI.caricaGalleryTrattamento();
			SCHEDA.formModificato = true;
		}});
	},
	fullFoto: function( i, local ){
		var pass = true;
		if(!local)pass = CONN.retNoConn();
		if(pass){
			visLoader("");
			if(!local)CONN.caricaUrl(	'getImgGallery.php',
										'big=1&n='+i+'&iU='+DB.login.data.idUtente+'&idFoto='+PAZIENTI.galleryProvvisoria[i].idFoto,
										'PAZIENTI.scriviFotoBig');
			else{
				var locale = false;
				if(PAZIENTI.galleryProvvisoria[i].nuova){
					locale = true;
					src = PAZIENTI.galleryProvvisoria[i].imgBig;
				}
				if(!locale){
					for(f in DB.foto.data){
						if(DB.foto.data[f].idFoto == PAZIENTI.galleryProvvisoria[i].idFoto){
							src = DB.foto.data[f].imgBig;
						}
					}
				}
				PAZIENTI.scriviFotoBig( JSON.stringify({imgBig:src}) );
			}
		}
	},
	scriviFotoBig: function( res ){
		res = JSON.parse( res );
		document.getElementById("fotoBig").classList.remove("noLoader");
		document.getElementById("fotoBig").style.backgroundImage='url(\''+res.imgBig+'\')';
	},
	
	// ciclo
	car_ciclo: function( LabelCiclo, btn ){ // al clic carica il RIEPILOGO del ciclo di trattamenti
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			
			MENU.nasMM();
			var valori=[];
			PAZIENTI.cicOp=true;
			//puntiGroup='|';
			var HTML0=HTML='';
			HTML0 += '<div id="schedaCiclo">';
			if(LabelCiclo!='0')HTML0+='<h1>'+htmlEntities(LabelCiclo)+'</h1>';
			else HTML0+='<h1>'+htmlEntities(Lingua(TXT_CicloSenzaNome))+'</h1>';
			HTML0+='<p><i>Cliente:</i> '+htmlEntities(DB.pazienti.data[PAZIENTI.idCL].Nome+" "+DB.pazienti.data[PAZIENTI.idCL].Cognome)+'</p>';
			// ELENCO I TRATTAMENTI DELLA CARTELA LabelCiclo
			var n=-1;
			var TRS = clone(DB.pazienti.data[PAZIENTI.idCL].trattamenti);
			TRS.sort(sort_by("TipoTrattamento", false));
			for(i in TRS){
				TRS[i].p = i;
			}
			for(i in TRS){
				var TR = TRS[i];
				if(TR.Cancellato==0 && TR.LabelCiclo==LabelCiclo){// && TR.TimeTrattamento*1000<=Date.now()){
					n++;
					idTrattamento=TR.idTrattamento*1;
					TitoloTrattamento=TR.TitoloTrattamento;
					TestoTrattamento=TR.TestoTrattamento;
					Prescrizione=__(TR.Prescrizione);
					puntiTsuboMap=JSON.parse(__(TR.puntiTsuboMap,"[]"));
					sintomi=JSON.parse(__(TR.sintomi,"{}"));
					meridiani = TR.meridiani;
					if(!meridiani)meridiani = "{}";
					meridiani=JSON.parse(__(meridiani,"{}"));
					TipoTrattamento=TR.TipoTrattamento;
					if(debug)console.log(i+" - "+TipoTrattamento+" - "+TitoloTrattamento)
					TimeTrattamento=TR.TimeTrattamento*1;
					Data=TimeTrattamento;
					if(!TimeTrattamento)TimeTrattamento=new Date()/1000;
					
					TimeTrattamento=new Date(TimeTrattamento*1);
					// DATA
					var data='';
					if(n)data+='<b style="color: #eaa21d;font-size:inherit;">'+n+')</b> ';
					
					giorno=TimeTrattamento.getDate();
					mese=TimeTrattamento.getMonth()+1;
					anno=TimeTrattamento.getFullYear();
					if(Data)data+=getFullDataTS(Data);
					else data+='-';
					
					if(i>0)HTML+='<hr>';
					if(TipoTrattamento!='A'){
						HTML+='<h3>'+data+'</h3><p class="labelCicli"><i>'+htmlEntities(TitoloTrattamento)+'</i></p>';
						HTML+='<p>'+htmlEntities(TestoTrattamento).replace(/\n/g, '<br>')+'</p>';
						//var TXT_P=TXT_PuntiTrattamento;
						var TXT_P=TXT_Tsubo;
						for(v in valori){
							score=-1;
							for(s in sintomi){
								if(valori[v].NomeSintomo==sintomi[s].NomeSintomo){
									score=sintomi[s].score;
								}
							}
							valori[v][i]={
								"p": TR.p,
								"Data": Data,
								"score": score
							}
						}
						
					}else{
						if(!TestoTrattamento)TestoTrattamento={"AnamnesiMotivo":"","AnamnesiDiagnosiOccidentale":"","AnamnesiDiagnosiMTC":""};
						else TestoTrattamento=JSON.parse(TestoTrattamento);
						AnamnesiMotivo=TestoTrattamento.AnamnesiMotivo;
						AnamnesiDiagnosiOccidentale=TestoTrattamento.AnamnesiDiagnosiOccidentale;
						AnamnesiDiagnosiMTC=TestoTrattamento.AnamnesiDiagnosiMTC;
						//HTML+='<h3>'+htmlEntities(Lingua(TXT_Anamnesi))+'</h3>'+data;
						if(AnamnesiMotivo)HTML+='<p><i>'+htmlEntities(Lingua(TXT_AnamnesiMotivo))+':</i><br>'+htmlEntities(AnamnesiMotivo).replace(/\n/g, '<br>')+'</p>';
						if(AnamnesiDiagnosiOccidentale)HTML+='<p><i>'+htmlEntities(Lingua(TXT_AnamnesiDiagnosiOccidentale))+':</i><br>'+htmlEntities(AnamnesiDiagnosiOccidentale).replace(/\n/g, '<br>')+'</p>';
						if(AnamnesiDiagnosiMTC)HTML+='<p><i>'+htmlEntities(Lingua(TXT_AnamnesiDiagnosiMTC))+':</i><br>'+htmlEntities(AnamnesiDiagnosiMTC).replace(/\n/g, '<br>')+'</i></p>';
						var TXT_P=TXT_PuntiAnamnesi;
						for(s in sintomi){
							valori[s]=[];
							valori[s].NomeSintomo=sintomi[s].NomeSintomo;
							valori[s][i]={
								"p": TR.p,
								"Data": Data,
								"score": sintomi[s].score
							};
						}
						sintomiModello=JSON.parse(JSON.stringify(sintomi));
					}
					if(puntiTsuboMap.length){
						HTML+='<i>'+Lingua(TXT_P)+':</i> ';
						HTML+='<div id="puntiCiclo"><img src="img/pallinoPat.png" width="12" height="12" align="absmiddle"> ';
						for(p in puntiTsuboMap){
							nTsubo=puntiTsuboMap[p].n*1;
							siglaMeridiano=puntiTsuboMap[p].m;
							valutazione=__(puntiTsuboMap[p].e);
							mezzo=__(puntiTsuboMap[p].z);
							descrizione=__(puntiTsuboMap[p].t);
							siglaTsubo=__(puntiTsuboMap[p].s);
							
							if(mezzo)HTML +='<img src="img/mezzo_'+mezzo+'.png"' +
											'	  width="20"' +
											'	  height="20"' +
											'	  align="absmiddle"' +
											'	  class="occhio valEn">';
							
							HTML += '<b>'+nTsubo+'.'+siglaMeridiano+'</b>';
							if(valutazione)HTML += ' <img src="img/ico_PV'+valutazione+'.png" width="12" height="12" align="absmiddle">';
							if(descrizione)HTML += ' '+descrizione;
							if(p<puntiTsuboMap.length-1)HTML += '<br>';
						}
						HTML+='</div>';
					}
					if(meridiani.length){
						HTML+='<br><i>'+Lingua(TXT_MeridianiTrattamento)+':</i> ';
						HTML+='<div id="meridianiCiclo">';
						for(m in meridiani){
							NomeMeridiano=meridiani[m].NomeMeridiano;
							siglaMeridiano=meridiani[m].siglaMeridiano;
							valEnergetica=__(meridiani[m].valEnergetica);
							descrizione=__(meridiani[m].descrizione);
							
							HTML += 	'<span>' +
										'<b>'+NomeMeridiano+'</b>';
							if(descrizione)HTML += ' '+descrizione;
							if(p<puntiTsuboMap.length-1)HTML += '</span><br>';
						}
						HTML+='</div>';
					}
				}
				
			}
			HTML2=HTML;
			HTML='';
			if(valori.length>0){
				if(debug)console.log(valori)
				HTML+='<hr><h2>'+htmlEntities(Lingua(TXT_ScoresSintomi))+'</h2>';
				HTML+='<div id="graficoCont">';
				var tot=0;
				for(d in valori[0]){
					if(d!='NomeSintomo')tot++;
				}
				tot--;
				var Wg=WF()-505;
				if(WF()<1024)Wg=WF()-120;
				if(WF()<510)Wg=WF()-80;
				if(debug)console.log(Wg);
				var Hg=50;
				var step=Wg/tot;
				for(v in valori){
					HTML+='<div class="grafico"><div class="graficoEtichetta">'+htmlEntities(valori[v].NomeSintomo)+'</div><div class="graficoDati">';
					HTML+=PAZIENTI.scriviGrafico(valori[v],Wg,Hg,step,tot);
					HTML+='</div></div>';
				}
				HTML+='</div><div class="l"></div>';
			}
			HTML=HTML0+HTML+HTML2+'</div>';
			
			SCHEDA.caricaScheda( stripslashes(Lingua(TXT_SchedaCiclo)), HTML, '', 'scheda_Riepi', false, true, btn );
		}});
	},
	
	// riepilogo
	scriviGrafico: function( dati, Wg, Hg, step, tot ){
		var RET='';
		var pos='';
		var xPre=yPre=-1;
		var st=(100/12);
		RET += 	'<svg width="100%"' +
				'	  height="'+(Hg+10)+'"' +
				'	  class="chart">';
		for(y=1;y<=11;y++){ // linee orizzontali
			RET += '<line fill="none"' +
				'		  class="lineY"' +
				'		  stroke-miterlimit="10"' +
				'		  x1="2%"' +
				'		  y1="'+(y*st)+'%"' +
				'		  x2="98%"' +
				'		  y2="'+(y*st)+'%"/>';
		}
		var stp = 96 / tot;
		for(x=0;x<=tot;x++){ // linee verticali
			RET += '<line fill="none"' +
				'		  class="lineX"' +
				'		  stroke-miterlimit="10"' +
				'		  x1="'+((x*stp)+2)+'%"' +
				'		  y1="'+st+'%"' +
				'		  x2="'+((x*stp)+2)+'%"' +
				'		  y2="'+(100-st)+'%"/>';
		}
		var linee = punti = '';
		n=0;
		
		for(d in dati){ // grafico (linee e punti)
			if(d!='NomeSintomo'){
				pos=-1;
				y=-1;
				if(dati[d].score>-1){
					pos = (stp*n) + 2;
					var y=((11-dati[d].score)*st);
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
			var svgs=document.getElementById("graficoCont").getElementsByTagName("svg");
			for(s=0;s<svgs.length;s++){
				var circles=svgs[s].getElementsByTagName("circle");
				for(c=0;c<circles.length;c++){
					if(circles[c].dataset.data*1==Data*1)circles[c].setAttribute("class","statEvi");
				}
			}
		}
	},
	desPallStat: function( Data ){ // deseleziona i pallini delle statistiche al passaggio del mouse
		if(PAZIENTI.cicOp && document.getElementById("graficoCont")){
			var svgs=document.getElementById("graficoCont").getElementsByTagName("svg");
			for(s=0;s<svgs.length;s++){
				var circles=svgs[s].getElementsByTagName("circle");
				for(c=0;c<circles.length;c++){
					if(circles[c].dataset.data*1==Data*1)circles[c].setAttribute("class","")
				}
			}
		}
	},
	setCartOp: function( el ){
		if(el.parentElement.querySelector(".nomeCiclo")){
			this.aperture[el.parentElement.querySelector(".nomeCiclo").innerText] = el.parentElement.classList.contains("cartellaAperta");
		}
	},
	
	// ricerca
	azRicercaTrattamenti: function( p, d ){ // azione di ricerca
		PAZIENTI.deselPaziente();
		PAZIENTI.selPaziente(p);
		SCHEDA.apriElenco('base');
		SCHEDA.selElenco('pazienti');
		var LabelCiclo = '';
		var idCiclo = -1;
		setTimeout(function(){
			var t = DB.pazienti.data[PAZIENTI.idCL].trattamenti[d];
			var btn = document.getElementById('btn_trattamento_'+d);
			el = btn;
			if(t.TipoTrattamento=='A'){
				LabelCiclo = t.LabelCiclo;
				
			}
				while(!el.classList.contains("trattElenco"))el = el.parentElement;
				var pE = el.id.split("_");
				idCiclo = pE[1]*1;
			
			PAZIENTI.car_trattamento( d,btn,LabelCiclo,true,idCiclo);
			SCHEDA.getCartella(document.getElementById('ciclo_'+idCiclo)).classList.add("cartellaAperta");
			RICERCHE.nascondiGlobal();
		},200, d);
	}
}