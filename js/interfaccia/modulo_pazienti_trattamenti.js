var PAZIENTI_TRATTAMENTI = {
	
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
	caricaTrattamenti: function( Q_resta=false, ev = -1 ){ // elenco trattamenti
		if(PAZIENTI.idCL>-1){
			var PZ = DB.pazienti.data[PAZIENTI.idCL];
			var cloneTRATTAMENTI = clone(PZ.trattamenti);
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
			var n=0;
			var o=0;
			var cartOpened = false;
			for(let i in cloneTRATTAMENTI){
				var TR = cloneTRATTAMENTI[i];
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
			var vuoto=true;
			
			for(let c in PAZIENTI.cicli){
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
								
								if(cloneTRATTAMENTI[p].DataModifica>DB.pazienti.lastSync){
									mdT=true;
									HTMLProvv += H.imgSyncro();
								}
								
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
					var cartAperta = this.aperture[NomeCiclo];
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
							'     		 margin-right: 5px;">';
					
					if(DataModAn>DB.pazienti.lastSync || mdT)HTML += H.imgSyncro();
					
					HTML+='<b class="nomeCiclo">'+htmlEntities(NomeCiclo)+'</b>';
					NC = NomeCiclo;	
					
					HTML+='</span><div class="trattElenco" id="ciclo_'+c+'"';
					if(!(cartAperta))HTML+=' style="display:none;"';
					HTML+='>';
					
					if(!presente)HTMLProvv+='<div class="noResults">'+TXT("NoResTrattamento")+'...</div>';
					var InfoAn= '';
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
							'	<i onclick="PAZIENTI.swMenuCiclo('+elAn+',this);" class="eliminaBtn elMenu">' +
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
					if(DataModAn>DB.pazienti.lastSync)HTML += H.imgSyncro();
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
					//SCHEDA.scaricaScheda(true); // CHIUDE LA SCHEDA DOPO IL SALVATAGGIO
					//SCHEDA.btnSel.click(); // riapre il trattamento dopo il salvataggio
					if(typeof(Q_resta) == 'number' && Q_resta>-1)setTimeout(function(){ SCHEDA.msgSalvataggio(); }, 200 );
				}catch(err){}
			}
		}
	},
	car_trattamento: function( Q_idTratt, btn, LabelCiclo, an, idCiclo, trasforma ){ // scheda del trattamento
		if(DRAGGER.moved)return;
		if(typeof(Q_idTratt)=='undefined')var Q_idTratt=-1;
		if(typeof(LabelCiclo)=='undefined')var LabelCiclo='';
		if(typeof(an)=='undefined')var an=false;
		if(typeof(trasforma)=='undefined')var trasforma=false;

		// verifico le autorizzazioni
		if(Q_idTratt==-1 && !LabelCiclo){ // solo se è anamnesi
			var cicliTot = 0;
			for(let c in PAZIENTI.cicli){
				if(PAZIENTI.cicli[c].Tipo == 'C')cicliTot++;
			}
			var maxCicli = PAZIENTI.maxCicli;
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
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
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
			var puntiMTC=[];
			var puntiAuricolari=[];
			var puntiPlantari=[];
			var puntiNamikoshi=[];
			var TimeTrattamento=0;
			var CostoTrattamento=0;
			var ordine=0;
			var sintomi=[];
			var meridiani=[];
			var gallery=[];
			var TipoTrattamento='B';
			var oraInizio=-1;
			var oraFine=-1;
			PAZIENTI.modificaSaldo=false;
			PAZIENTI.saldoOp=false;
			if((LabelCiclo=='' && Q_idTratt==-1) || an)TipoTrattamento='A';
			
			for(let i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
				DB.pazienti.data[PAZIENTI.idCL].trattamenti[i].md5='';
			}
			if(Q_idTratt>-1){
				var TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt];
				oraInizio=10;
				oraFine=11;
				TR.id_interno=Q_idTratt;
				TR.md5=PAZIENTI.pazSelMD5;
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti));
				idTrattamento=TR.idTrattamento*1;
				TitoloTrattamento=TR.TitoloTrattamento;
				TestoTrattamento=TR.TestoTrattamento;
				Prescrizione=__(TR.Prescrizione);
				ordine=__(TR.ordine,0);
				meridiani=toJson(__(TR.meridiani,[]));
				puntiMTC=__(TR.puntiMTC,[]);
				puntiAuricolari=toJson(__(TR.puntiAuricolari,[]));
				puntiPlantari=toJson(__(TR.puntiPlantari,[]));
				puntiNamikoshi=toJson(__(TR.puntiNamikoshi,[]));
				sintomi=toJson(__(TR.sintomi,[]));
				gallery=toJson(__(TR.gallery,[]));
				
				TimeTrattamento=(TR.TimeTrattamento*1)/1000;
				if(typeof(TR.TipoTrattamento)!='undefined')TipoTrattamento=TR.TipoTrattamento;
				if(typeof(TR.LabelCiclo)!='undefined')LabelCiclo=TR.LabelCiclo;
				if(typeof(TR.CostoTrattamento)!='undefined')CostoTrattamento=TR.CostoTrattamento*1;
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
			
			var sintomiCiclo = PAZIENTI.getSintomiCiclo(LabelCiclo);
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
			var TimeAgenda = TimeTrattamento;
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
			PAZIENTI.namikoshiProvvisori=clone(puntiNamikoshi);
			PAZIENTI.sintomiProvvisori=clone(sintomi);
			PAZIENTI.meridianiProvvisori=clone(meridiani);
			PH.galleryProvvisoria=gallery;
			var HTML='';
			// GUIDA
			if(TipoTrattamento == 'A' && Q_idTratt<0){
				ordine = PAZIENTI.cicli.length-1;
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
									htmlEntities(TXT("GuidaCicloTit")) +
						'		</h2>' +
						'		<p>' +
									htmlEntities(TXT("GuidaCiclo")).replace(/\n/g,"<br>") +
						'		</p>' +
						'	</div>';
				if(!__(localStorage.getItem("no_guida_ciclo")))HTML += 
						'	<span class="noVisPiu"' +
						'		  style="display: inline-block;">' +
								htmlEntities(TXT("NonVisualizzarePiu")) +
						'		<input type="checkbox"' +
						'			   id="no_guida_ciclo"' +
						'			   name="no_guida_ciclo"' +
						'			   value="1"' +
						'			   onClick="GUIDA.noVis(this);">' +
						'	</span>';
				HTML += '</div>';
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
				if(!TestoTrattamento)TestoTrattamento={	"AnamnesiMotivo":"",
										"AnamnesiDiagnosiOccidentale":"",
										"AnamnesiDiagnosiMTC":"" };
				else TestoTrattamento=JSON.parse(TestoTrattamento);
				AnamnesiMotivo=TestoTrattamento.AnamnesiMotivo;
				AnamnesiDiagnosiOccidentale=TestoTrattamento.AnamnesiDiagnosiOccidentale;
				AnamnesiDiagnosiMTC=TestoTrattamento.AnamnesiDiagnosiMTC;
				
				var LC='';
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
								'		   onClick="PAZIENTI.vis_anamnesi();">'+htmlEntities(TXT("Anamnesi_e_Diagnosi"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')))+'</div></div>' +
								'<div style="display:none;"' +
								'	  id="anamnesi_cont">'; // nascondo tutto se è un nuovo ciclo
				}
				HTML += H.r({	t: "t",	
								name: "AnamnesiMotivo",	
								value: AnamnesiMotivo,
								label: TXT("AnamnesiMotivo"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')),
								noLabel: true,
								classCampo: "okPlaceHolder" });		
			}
			var TXT_DT=TXT("Data");
			if(TimeTrattamento*1>(oggi*1)/1000)TXT_DT=TXT("DataProgrammata");
			
			if(!TimeTrattamento)var DT='... '+htmlEntities(TXT("ScegliData"));
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
								styleRiga: "text-align:right;" }) +
								
						H.r({	t: "t",	
								name: "TestoTrattamento",	
								value: TestoTrattamento,
								noLabel: true,
								classCampo: "okPlaceHolder",
								styleCampo: "margin-bottom:10px;" });
				
				var TXT_P = TXT("PuntiMTC");
				var TXT_M = TXT("MeridianiTrattamento");
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
						'			 src="img/ico_diagnosi'+(globals.set.cartella=='meridiani_shiatsu'?'_shiatsu':'')+'.png">' +
								TXT("Diagnosi"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')) +
						'	</em>' +	
						'	<div id="contDiagnosi" style="min-height:240px;">'+
						'		<div class="l"></div>' +
						'		<div class="schDx">' +
						H.r({	t: "t",	
								name: "AnamnesiDiagnosiOccidentale",	
								value: AnamnesiDiagnosiOccidentale,
								label: TXT("AnamnesiDiagnosiOccidentale"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')),
								styleCampo: "margin-bottom:10px;" }) +
						'		</div>' +
						'		<div class="schSx">' +
						H.r({	t: "t",	
								name: "AnamnesiDiagnosiMTC",	
								value: AnamnesiDiagnosiMTC,
								label: TXT("AnamnesiDiagnosiMTC"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')),
								styleCampo: "margin-bottom:10px;" }) +
						'		</div>' +
						'		<div class="l"></div>' +
						'	</div>' +
						'</div>';
				
				var TXT_P = TXT("PuntiAnamnesi");
				var TXT_M = TXT("MeridianiAnamnesi");
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
			
			
			// SINTOMI
			HTML += '<div id="tratt_cont_sintomi"' +
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
							TXT_P+' (<span id="totPunto"></span>)' +
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
							TXT_M+' (<span id="totMeridiani"></span>)' +
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
			
			if(nuovoCiclo)HTML += '</div>';		 // nascondo tutto se è un nuovo ciclo
			HTML += '</form>';
			
			var azElimina = Q_idTratt>-1 ? 'PAZIENTI.el_trattamento('+Q_idTratt+')':"";
			var btnAdd = '';
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
			//H.verData();
			
			if(TipoTrattamento=='A' || !LabelCiclo)PAZIENTI.popolaSintomi();
			PAZIENTI.caricaDettagliSet(); // carico le schede dei singoli sets
			PAZIENTI.caricaSintomi();
			//PH.caricaGallery( Q_idTratt );
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
		var HTML = '';
		var html_licenzaNonPermette = '<div class="labelModificaCon">'+htmlEntities(TXT("LicenzaNonPermette"))+'</div>';
		if( globals.set.cartella == 'meridiani_cinesi' ||
			(globals.set.cartella == 'meridiani_shiatsu' && (LOGIN.verModule("CIN") || LOGIN.verModule("light"))) ){
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
		var HTML = '';
		if( globals.set.cartella == 'meridiani_shiatsu' && (LOGIN.verModule("NMK") || LOGIN.verModule("light"))){
			HTML+=
				'	<div id="p_add_dett"' +
				'		 class="noPrint">' +
				'		<div id="grpNmk"' +
				'		    class="p_paz_gruppo"' +
				'		    onClick="PAZIENTI.gruppoPunti(\'N\');">' +
							htmlEntities(TXT("AggiungiPunti")) +
				'		</div>' +
				'	</div>';
		}else if(LOGIN.logedin() && (LOGIN.verModule("NMK") || LOGIN.verModule("light"))){
			HTML += '<div class="labelModificaCon">'+htmlEntities(TXT("ModificaCon"))+'<br><span onClick="caricaSet(\'meridiani_shiatsu\',this);"><img src="sets/meridiani_shiatsu/img/logoNero.png" width="25" height="25"> ShiatsuMap</span></div>';
		}else{
			HTML += html_licenzaNonPermette;
		}
		document.getElementById("tratt_btns_namikoshi").innerHTML = HTML;
		PAZIENTI.caricaNamikoshiTrattamento();
		
		// MERIDIANI
		var HTML = '';
		if( globals.set.cartella == 'meridiani_cinesi' || 
			(globals.set.cartella == 'meridiani_shiatsu' && (LOGIN.verModule("CIN") || LOGIN.verModule("MAS") || LOGIN.verModule("light"))) ){
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
		var HTML = '';
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
		var HTML = '';
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
	},
	apriSpostaTrattamento: function( Q_idTratt){
		applicaLoading(document.getElementById("scheda_testo"),'vuoto');
		var HTML =  '<div id="titCartelle">'+htmlEntities(TXT("SpostaIn"))+'<span onClick="PAZIENTI.chiudiSpostaTrattamento();"></span></div>' +
					'<div id="elencoCartelle">';
		for(let c in PAZIENTI.cicli){
			if(PAZIENTI.cicli[c].NomeCiclo != document.formMod.LabelCiclo.value){
				HTML += '	<div onClick="PAZIENTI.spostaTrattamento(this);"' +
						'		 data-id="'+PAZIENTI.cicli[c].p+'">'+PAZIENTI.cicli[c].NomeCiclo+'</div>';
			}
		}
		HTML += 	'</div>';
		var cont = document.getElementById("gruppoPunti_cont");
		cont.innerHTML = HTML;
		cont.scrollTo(0,0);
		var w = (document.getElementById("scheda_testo").scrollWidth-60);
		var l = 30;
		var maxW = 400;
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
	spostaTrattamento: function( el ){
		document.getElementById("label_ciclo").innerHTML = '<span>'+htmlEntities(el.innerText)+'</span>';
		document.formMod.LabelCiclo.value = el.innerText;
		document.formMod.idCiclo.value = el.dataset.id;
		PAZIENTI.chiudiSpostaTrattamento();
	},
	chiudiSpostaTrattamento: function(){
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
	moveTratt: function( el, cont){
		if(!cont)return;
		if(el.dataset.typeDrag != cont.dataset.typeDrag)return;
		var idTrattamento = el.id.split("_")[2];
		var label = cont.getElementsByTagName("span")[0];
		var idCiclo = label.id.split("_")[1];
		var LabelCiclo = PAZIENTI.cicli[idCiclo].NomeCiclo;
		CONFIRM.vis(	TXT("ChiediSpostaTrattamento").replace("[cartella]",LabelCiclo),
						false, 
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
						
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[idTrattamento].LabelCiclo = LabelCiclo;
			
			if(document.formMod){
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
				LOGIN.sincronizza(	'PAZIENTI.caricaTrattamenti();' +
									'rimuoviLoading(document.querySelector(".listaTrattamenti"));' );
				
			});
		}});
	},
	moveCiclo: function( el, cont ){
		if(!cont)return;
		if(el==cont.getElementsByTagName("span")[0])return;
		var elMoved = parseInt(el.id.split("_")[1]);
		var elTarget = parseInt(cont.getElementsByTagName("span")[0].id.split("_")[1]);
		var o = 0;
		var PZ =  DB.pazienti.data[PAZIENTI.idCL];
		var TRS =PZ.trattamenti;
		var DataModifica = DB.pazienti.lastSync+1;
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
			LOGIN.sincronizza('PAZIENTI.caricaTrattamenti(false,'+elTarget+');');
			
		});
	},
	mod_trattamento: function(){ // salva il tratamento
		if(PAZIENTI.idCL>-1){
			stopAnimate(true);
			visLoader(TXT("SalvataggioInCorso"),'loadingLight');
			if(!ControllaNumero(document.formMod.CostoTrattamento,stripslashes(TXT("Costo"))))return;
			if(agenda.oraFine>-1)agenda.conferma();
			LabelCiclo=document.formMod.LabelCiclo.value;
			TipoTrattamento=document.formMod.TipoTrattamento.value;
			var DataModifica = DB.pazienti.lastSync+1;
			
			// pulisco i sintomi
			for(let s in PAZIENTI.sintomiProvvisori){
				delete(PAZIENTI.sintomiProvvisori[s].nuovo);
			}
			if(TipoTrattamento=='A'){ // verifico non ci sia già LabelCiclo
				LabelCiclo_C=document.formMod.LabelCiclo_C.value;
				var presente=false;
				var vercopia=true;
				for(let i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
					var TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[i];
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
				if(PAZIENTI.sintomiEliminati.length){
					var TRS = DB.pazienti.data[PAZIENTI.idCL].trattamenti;
					for(let d in PAZIENTI.sintomiEliminati){
						for(t in TRS){
							var mod = false;
							var sint = __(TRS[t].sintomi,[]);
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
			//var f = 0;
			var GA = PH.galleryProvvisoria;
			for(let i in GA){
				GA[i].Dida = document.getElementById("Dida"+i).value;
				if(typeof(GA[i].imgMini) != 'undefined' && GA[i]!=null && GA[i].imgMini!=null){
					
					// salvo l'immagine nel DB locale
					DB.files.data.push({
						idFile: GA[i].idFile,
						imgMini: GA[i].imgMini,
						imgBig: GA[i].imgBig,
						frv: (LOGIN._frv()!='')
					});
					var NG = {
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
							"puntiMTC": PAZIENTI.puntiProvvisori,
							"puntiAuricolari": PAZIENTI.auriculoProvvisori,
							"puntiPlantari": PAZIENTI.reflexProvvisori,
							"puntiNamikoshi": PAZIENTI.namikoshiProvvisori,
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
					LOGIN.sincronizza(	'startAnimate();' +
										'nasLoader();' +
										'PAZIENTI.caricaTrattamenti('+pDef+');' +
										"PAZIENTI.car_trattamento("+pDef+", document.getElementById('btn_trattamento_"+pDef+"'));" +
										'LOGIN.pulisciGallery();' );
					
				});
			});
		}
		return false;
	},
	el_trattamento: function( Q_idTratt ){
		// elimina il trattamento
		var TXT_EL_AL=TXT("ChiediEliminaTrattamento");
		if(DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].TipoTrattamento=='A'){
			TXT_EL_AL=TXT("ChiediEliminaCiclo");
		}
		CONFIRM.vis(	TXT_EL_AL,
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));

			stopAnimate(true);
			visLoader(TXT("SalvataggioInCorso"),'loadingLight');
			var DataModifica = DB.pazienti.lastSync+1;
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].Cancellato=1;
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].md5='';
			DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].DataModifica=parseInt(DataModifica);
			DB.pazienti.data[PAZIENTI.idCL].DataModifica=parseInt(DataModifica);
			
			// se è un'anamnesi cancello tutto il ciclo
			if(DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].TipoTrattamento=='A'){
				for(let i in DB.pazienti.data[PAZIENTI.idCL].trattamenti){
					var TR = DB.pazienti.data[PAZIENTI.idCL].trattamenti[i];
					if(TR.LabelCiclo==DB.pazienti.data[PAZIENTI.idCL].trattamenti[Q_idTratt].LabelCiclo){
						TR.DataModifica=parseInt(DataModifica);
						TR.Cancellato=1;
					}
				}
			}
		
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				LOGIN.sincronizza(	'PAZIENTI.caricaTrattamenti();' + 
									'nasLoader();' +
									'SCHEDA.scaricaScheda();' +
									'LOGIN.pulisciGallery();' );
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
			for(let p in PAZIENTI.sintomiProvvisori){
				totSintomi++;
				var addStyle = (__(PAZIENTI.sintomiProvvisori[p].nuovo)) ? ' style="border-left: 3px solid #b500ff;"' : '';
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
				for(let s in PAZIENTI.sintomiProvvisori){
					if(txt.trim() == PAZIENTI.sintomiProvvisori[s].NomeSintomo){
						ALERT(TXT("erroreDuplicazioneElemento"))
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
						for(let p in PZS){
							if(PZS.Cancellato!=1){
								var TRS = PZS[p].trattamenti;
								var pzMod = false;
								for(t in TRS){
									if(TRS.Cancellato!=1 && TRS[t].sintomi.length){
										var sintomi = clone(TRS[t].sintomi);
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
								LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
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
		var add = document.formMod.TipoTrattamento.value;
		if(document.formMod.idCiclo.value=='-1' && add!='A')add = '';
		CONFIRM.vis(	TXT("ChiediEliminaSintomo" + add),
						__(PAZIENTI.sintomiProvvisori[n].nuovo,false), // bypass
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
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
		var SINTOMI = [];
		var PZ = DB.pazienti.data;
		for(let p in PZ){
			var TR = PZ[p].trattamenti;
			for(t in TR){
				var sintomi = __(TR[t].sintomi,[]);
				if(sintomi.length){
					for(let s in sintomi){
					   var pass = true;
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
		if(typeof(id)=='undefined')var id=0;
		var globalSintomi = PAZIENTI.getSintomi();
		JSNPUSH={	"idSintomo": id*1,
					"NomeSintomo": globalSintomi[t].NomeSintomo,
					"score": -1,
					"nuovo": true };
			
		SCHEDA.formModificato = true;
		if(PAZIENTI.sintomiProvvisori=='')PAZIENTI.sintomiProvvisori=[];
		PAZIENTI.sintomiProvvisori.push(JSNPUSH);
		var posEl = PAZIENTI.sintomiEliminati.indexOf(globalSintomi[t].NomeSintomo);
		if(posEl>-1) PAZIENTI.sintomiEliminati.splice(posEl,1);
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
		if(!HTML)HTML = '<div class="noResults">' + htmlEntities(TXT("NoResSintomi")) + '</div>';
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
		pulsanteModifica.innerHTML = htmlEntities(TXT("Modifica"));
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
	
	// ciclo
	car_ciclo: function( LabelCiclo, btn ){ // al clic carica il RIEPILOGO del ciclo di trattamenti
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			MENU.nasMM();
			var valori=[];
			PAZIENTI.cicOp=true;
			var HTML0=HTML='';
			HTML0 += '<div id="schedaCiclo">';
			if(LabelCiclo!='0')HTML0+='<h1>'+htmlEntities(LabelCiclo)+'</h1>';
			else HTML0+='<h1>'+htmlEntities(TXT("CicloSenzaNome"))+'</h1>';
			HTML0+='<p><i>Cliente:</i> '+htmlEntities(DB.pazienti.data[PAZIENTI.idCL].Nome+" "+DB.pazienti.data[PAZIENTI.idCL].Cognome)+'</p>';
			// ELENCO I TRATTAMENTI DELLA CARTELLA LabelCiclo
			var n=-1;
			var TRS_clone = clone(DB.pazienti.data[PAZIENTI.idCL].trattamenti);
			var TRS = [];			
			for(let i=TRS_clone.length-1;i>=0;i--){
			   if(	TRS_clone[i].LabelCiclo==LabelCiclo && 
					( (	TRS_clone[i].TimeTrattamento>0 && TRS_clone[i].TimeTrattamento<=new Date()/1000) || 
						TRS_clone[i].TipoTrattamento=='A') )TRS.push(TRS_clone[i]);
			}
			TRS.sort(sort_by("TipoTrattamento", false));
			var f = 0;
			for(let i in TRS){
				if(TRS[i].TipoTrattamento=='A')TRS[i].p = f;
			}
			TRS.sort(sort_by("TimeTrattamento", false, parseInt));
			for(let i in TRS){
				f++;
				if(TRS[i].TipoTrattamento!='A')TRS[i].p = f;
			}
			TRS.sort(sort_by("p", false, parseInt));
			var sintomiCiclo = PAZIENTI.getSintomiCiclo(LabelCiclo);
			for(let s in sintomiCiclo){
				valori[s]=[];
				valori[s].NomeSintomo=sintomiCiclo[s].NomeSintomo;
			}
			for(let i in TRS){
				var TR = TRS[i];
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
						var TXT_P=TXT("Punto");
						var TXT_M=TXT("MeridianiTrattamento");
						
					}else{
						if(!TestoTrattamento)TestoTrattamento={"AnamnesiMotivo":"","AnamnesiDiagnosiOccidentale":"","AnamnesiDiagnosiMTC":""};
						else TestoTrattamento=JSON.parse(TestoTrattamento);
						AnamnesiMotivo=TestoTrattamento.AnamnesiMotivo;
						AnamnesiDiagnosiOccidentale=TestoTrattamento.AnamnesiDiagnosiOccidentale;
						AnamnesiDiagnosiMTC=TestoTrattamento.AnamnesiDiagnosiMTC;
						if(AnamnesiMotivo)HTML+='<p><i>'+htmlEntities(TXT("AnamnesiMotivo"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')))+':</i><br>'+htmlEntities(AnamnesiMotivo).replace(/\n/g, '<br>')+'</p>';
						if(AnamnesiDiagnosiOccidentale)HTML+='<p><i>'+htmlEntities(TXT("AnamnesiDiagnosiOccidentale"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')))+':</i><br>'+htmlEntities(AnamnesiDiagnosiOccidentale).replace(/\n/g, '<br>')+'</p>';
						if(AnamnesiDiagnosiMTC)HTML+='<p><i>'+htmlEntities(TXT("AnamnesiDiagnosiMTC"+(globals.set.cartella=='meridiani_shiatsu'?'Shiatsu':'')))+':</i><br>'+htmlEntities(AnamnesiDiagnosiMTC).replace(/\n/g, '<br>')+'</i></p>';
						var TXT_P=TXT("PuntiAnamnesi");
						var TXT_M=TXT("MeridianiAnamnesi");
					}
					for(v in valori){
						var score = -1;
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
						HTML+='<div class="app_report_sch"> ';
						HTML+='<br><i>'+TXT_P+':</i> ';
						HTML+='<div id="puntiCiclo">';
						for(let p in puntiMTC){
							nPunto=puntiMTC[p].n;
							siglaMeridiano=puntiMTC[p].m;
							valutazione=__(puntiMTC[p].e);
							mezzo=__(puntiMTC[p].z);
							descrizione=__(puntiMTC[p].t);
							siglaPunto=__(puntiMTC[p].s);
							if(!siglaPunto)siglaPunto = nPunto+'.'+siglaMeridiano;
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
							HTML += '<b>'+siglaPunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+chr10;
						}
						HTML+='</div>';
						HTML+='</div>';
					}
					if(puntiNamikoshi.length){
						HTML+='<div class="app_report_sch"> ';
						HTML+='<br><i>'+TXT("PuntiNamikoshi")+':</i> ';
						HTML+='<div id="puntiCiclo">';
						for(let p in puntiNamikoshi){
							nomePunto=puntiNamikoshi[p].s;
							valutazione=__(puntiNamikoshi[p].e);
							mezzo=__(puntiNamikoshi[p].z);
							descrizione=__(puntiNamikoshi[p].t);
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
							HTML += '<b>'+nomePunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+chr10;
						}
						HTML+='</div>';
						HTML+='</div>';
					}
					if(puntiAuricolari.length){
						HTML+='<div class="app_report_sch"> ';
						HTML+='<br><i>'+TXT_P+':</i> ';
						HTML+='<div id="puntiCiclo">';
						for(let p in puntiAuricolari){
							nomePunto=puntiAuricolari[p].n;
							valutazione=__(puntiAuricolari[p].e);
							mezzo=__(puntiAuricolari[p].z);
							descrizione=__(puntiAuricolari[p].t);
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
							HTML += '<b>'+nomePunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+chr10;
						}
						HTML+='</div>';
						HTML+='</div>';
					}
					if(puntiPlantari.length){
						HTML+='<div class="app_report_sch"> ';
						HTML+='<br><i>'+TXT_P+':</i> ';
						HTML+='<div id="puntiCiclo">';
						for(let p in puntiPlantari){
							nomePunto=puntiPlantari[p].n;
							valutazione=__(puntiPlantari[p].e);
							mezzo=__(puntiPlantari[p].z);
							descrizione=__(puntiPlantari[p].t);
							
							HTML += '<span class="tsb"><img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -2px;margin-right: -2px;"> ';
							HTML += '<b>'+nomePunto+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
							if(descrizione)HTML += ' <span style="font-style:italic;">'+htmlEntities(descrizione)+'</span>';
							HTML += '</span> '+chr10;
						}
						HTML+='</div>';
						HTML+='</div>';
					}
					if(meridiani.length){
						HTML+='<div class="app_report_sch"> ';
						HTML+='<br><i>'+TXT_M+':</i> ';
						HTML+='<div id="meridianiCiclo">';
						for(let m in meridiani){
							NomeMeridiano=meridiani[m].NomeMeridiano;
							siglaMeridiano=meridiani[m].siglaMeridiano;
							valutazione=__(meridiani[m].valEnergetica);
							descrizione=__(meridiani[m].descrizione);
							
							HTML += 	'<span class="tsb">' +
										'<b>'+NomeMeridiano+'</b>';
							if(valutazione)HTML += '<img src="img/ico_PV'+valutazione+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;">';
							if(descrizione)HTML += ' '+descrizione;
							HTML += '</span>'+chr10;
						}
						HTML+='</div>';
						HTML+='</div>';
					}
				}
			}
			HTML2=HTML;
			HTML='';
			if(valori.length>0){
				HTML+='<hr><h2>'+htmlEntities(TXT("ScoresSintomi"))+'</h2>';
				HTML+='<div id="graficoCont">';
				var tot=0;
				for(let d in valori[0]){
					if(d!='NomeSintomo')tot++;
				}
				tot--;
				var Wg=WF()-505;
				if(WF()<1024)Wg=WF()-120;
				if(WF()<510)Wg=WF()-80;
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
			SCHEDA.caricaScheda( stripslashes(TXT("SchedaCiclo")), HTML, '', 'scheda_Riepi', false, true, btn );
		}});
	},
	swMenuCiclo: function( idTrattQ, btn ){
		var forza = false
		if(typeof(idTrattQ)=='undefined' && typeof(btn)=='undefined')forza = true;
		if(PAZIENTI.mnOver)return;
		if(!document.getElementById("menuCiclo") && !forza){
			PAZIENTI.mnOver = false;
			PAZIENTI.mn = document.createElement('div');
			PAZIENTI.mn.id = "menuCiclo";
			PAZIENTI.mn.style.top = (tCoord(btn,'y')-20) + 'px';
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
		var RET='';
		var pos='';
		var xPre=yPre=-1;
		var st=(100/12);
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
		var stp = 96 / tot;
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
		var linee = punti = '';
		n=0;
		
		for(let d in dati){ // grafico (linee e punti)
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
			for(let s=0;s<svgs.length;s++){
				var circles=svgs[s].getElementsByTagName("circle");
				for(let c=0;c<circles.length;c++){
					if(circles[c].dataset.data*1==Data*1)circles[c].setAttribute("class","statEvi");
				}
			}
		}
	},
	desPallStat: function( Data ){ // deseleziona i pallini delle statistiche al passaggio del mouse
		if(PAZIENTI.cicOp && document.getElementById("graficoCont")){
			var svgs=document.getElementById("graficoCont").getElementsByTagName("svg");
			for(let s=0;s<svgs.length;s++){
				var circles=svgs[s].getElementsByTagName("circle");
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
