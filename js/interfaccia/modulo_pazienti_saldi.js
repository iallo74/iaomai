
var PAZIENTI_SALDI = {
	// SALDI
	caricaSaldi: function( Q_resta ){ // elenco saldi del paziente
		if(PAZIENTI.idCL>-1){
			Q_resta = __(Q_resta,false); // prefefinito
			
			var PZ = DB.pazienti.data[PAZIENTI.idCL];
			var HTML='';
			HTML += '<div class="lista listaSaldi">';
			var vuoto=true;
			var DaSaldare=Saldato=0;
			if(typeof(PZ.saldi)!='undefined'){
				cloneSALDI = clone(PZ.saldi);
				for(p in cloneSALDI){
					cloneSALDI[p].p = p;
				}
				cloneSALDI.sort(sort_by("DataSaldo", true, parseInt));
				for(p in cloneSALDI){
					var SA = cloneSALDI[p];
					if(!PAZIENTI.saldoOp)SA.md5='';
					if(!SA.Cancellato){
						HTML += '<div class="base"' +
								'	  id="btn_saldo_'+SA.p+'"' +
								'	  onClick="PAZIENTI.car_saldo(\''+p+'\',this);">';
						if(SA.DataModifica*1>DB.pazienti.lastSync)HTML += H.imgSyncro();
						HTML += getDataTS(SA.DataSaldo)+' - &euro; '+ArrotondaEuro(SA.ValoreSaldo) +
								'</div>';
						vuoto=false;
						Saldato+=SA.ValoreSaldo;
					}
				}
			}
	
			if(vuoto)HTML += '<p class="noResults">'+Lingua(TXT_NoResSaldi)+'...</div>';
			HTML += '</div>';
			
			
			if(typeof(PZ.trattamenti)!='undefined'){
				for(p in PZ.trattamenti){
					var TR = PZ.trattamenti[p];
					if(!TR.Cancellato && typeof(TR.CostoTrattamento)!='undefined')DaSaldare+=TR.CostoTrattamento;
				}
			}
			var RIS=DaSaldare-Saldato;
			var HTML_pre = '';
			HTML_pre += PAZIENTI.intestazionePaziente("s");
			HTML_pre += '<div class="menuElenchi"' +
						'	  onClick="MENU.visMM(\'add_saldo\');">' +
						'</div>' +
						'<p id="add_saldo">' +
						'	<i class="elMenu"' +
						'	   title="'+htmlEntities(Lingua(TXT_AggiungiSaldo))+'"' +
						'	   onclick="PAZIENTI.car_saldo();">' +
						'		<img src="img/ico_saldiB_add.png"' +
						'			 class="noBG"' +
						'			 align="absmiddle">' +
						'		<span>'+htmlEntities(Lingua(TXT_AggiungiSaldo))+'</span>' +
						'	</i>' +
						'</p>';
			if(RIS>0){
				HTML_pre += '<p id="totSaldi">' +
							'	<i>'+htmlEntities(Lingua(TXT_AncoraSaldare))+':</i> ' +
							'	<span';
				if(RIS<0)HTML_pre += ' style="background-color:#F00;' +
									 '		  padding-left:4px;' +
									 '		  padding-right:4px;' +
									 '		  border-radius:4px;"';
				HTML_pre += '>&euro; '+ArrotondaEuro(RIS) +
							'	</span>' +
							'</p>';
			}
			HTML = HTML_pre + HTML;
			
			document.getElementById("lista_pazienti").innerHTML = HTML;
			
			if(typeof(Q_resta) == 'number')SCHEDA.btnSel = document.getElementById("btn_saldo_"+Q_resta);
			if(Q_resta>-1 && SCHEDA.btnSel){
				try{
					SCHEDA.btnSel = document.getElementById(SCHEDA.btnSel.id);
					SCHEDA.btnSel.classList.add("elencoSel");
					SCHEDA.btnSel.click();
					if(typeof(Q_resta) == 'number' && Q_resta>-1)setTimeout(function(){ SCHEDA.msgSalvataggio(); }, 200 );
				}catch(err){}
			}
			
		}
		return false;
	},
	car_saldo: function( Q_idSaldo, btn ){ // scheda del saldo
		CONFIRM.vis(	Lingua(TXT_UscireSenzaSalvare),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
						Q_idSaldo = __(Q_idSaldo,-1); // prefefinito
			
			MENU.nasMM();
			var idSaldo=0;
			var MotivoSaldo='';
			var RicevutaSaldo='';
			var ValoreSaldo=0;
			var DataSaldo=0;
			var PZ = DB.pazienti.data[PAZIENTI.idCL];
			if(Q_idSaldo>-1){
				var SA = PZ.saldi[Q_idSaldo];
				for(i in PZ.saldi)PZ.saldi[i].md5='';
				idSaldo=SA.idSaldo*1;
				MotivoSaldo=SA.MotivoSaldo;
				RicevutaSaldo= __(SA.RicevutaSaldo);
				ValoreSaldo=SA.ValoreSaldo*1;
				DataSaldo=SA.DataSaldo*1;
				SA.md5=PAZIENTI.pazSelMD5;
				
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){
					// salvo il DB
				});
			}else{
				DataSaldo = new Date()*1;
				DataSaldo /= 1000;
			}
			var HTML='';
			if(typeof(DB.login.data.Intestazione)=='undefined')DB.login.data.Intestazione='';
			Intestazione = htmlEntities(DB.login.data.Intestazione);
			while(Intestazione.indexOf(H.chr10)>-1)Intestazione = Intestazione.replace(H.chr10,'<br>');
			IntestazioneCliente = PZ.Nome+" "+PZ.Cognome+'<br>'+PZ.Indirizzo+'<br>'+PZ.CAP+' '+PZ.Citta;
			if(PZ.Provincia)IntestazioneCliente += ' ('+PZ.Provincia+')';
			IntestazioneCliente += '<br>';
			
			
			HTML += '<form id="formMod"' +
					'	   name="formMod"' +
					'	   method="post"' +
					'	   onSubmit="return false;">' +
					'	<div style="min-height:100px;"' +
					'	   	 id="saldi_cont">' +
					'	   	<div class="schSx">' +
					'	   		<div id="contInt"' +
					'	   	 		 style="line-height:normal;">';
			if(Intestazione != '')HTML += 
					'				<div style="margin-top:10px;' +
					'			   	 		    line-height:normal;' +
					'			   	 		    font-style:italic;' +
					'			   	 		    font-size:11px">' +
									Lingua(TXT_per) + " " + IntestazioneCliente +
					'				</div>';
			HTML += '			</div>' +
					'		</div>' +
					'		<div class="schDx">';
					// Campi nascosti
					
			HTML += H.r({	t: "h", name: "stessa",		value: '1' 					});
			HTML += H.r({	t: "h", name: "idSaldo",	value: (idSaldo*1) 			});
			HTML += H.r({	t: "h", name: "idSL",		value: Q_idSaldo 			});
			HTML += H.r({	t: "h", name: "md5",		value: PAZIENTI.pazSelMD5 	});
			
			HTML += H.r({	t: "d",
							name: "DataSaldo",
							value: DataSaldo,
							label: Lingua(TXT_Data),
							idRiga: 'dataSaldo' });
			
			
			HTML += H.r({	t: "r",
							name: "RicevutaSaldo",
							value: RicevutaSaldo,
							label: Lingua(TXT_RicevutaNumero),
							classCampo: "RicTrattDx",
							styleRiga: "text-align:right;",
							classRiga: "div_saldi" });
			
			HTML += '		</div>';
					
			
			HTML += H.r({	t: "t",
							name: "MotivoSaldo",
							noLabel: true,
							value: MotivoSaldo,
							classCampo: "TitTrattDx",
							styleRiga: "text-align:right;",
							classRiga: "div_saldi" });
			
			
			HTML += H.r({	t: "r",
							name: "ValoreSaldo",
							value: (ValoreSaldo) ? ArrotondaEuro(ValoreSaldo) : '',
							label: Lingua(TXT_ValoreSaldo)+" €",
							ver: "1|0|num",
							classCampo: "CostoTrattDx",
							keyupCampo: "H.keyPrezzo(this);",
							styleRiga: "text-align:right;",
							classRiga: "div_saldi" });
							
			HTML += '		<span id="btn_stampa" class="stampaBtn noPrint" onclick="SCHEDA.stampaScheda({});">'+Lingua(TXT_StampaRicevuta)+'</span>' +
					'	</div>';
			
			// pulsanti SALVA, ANNULLA e ELIMINA
			HTML += SCHEDA.pulsantiForm( 	Q_idSaldo>-1 ? 'PAZIENTI.el_saldo('+Q_idSaldo+')':"",
											"SCHEDA.scaricaScheda();", 
											"if(H.verData(\'DataSaldo\',true))PAZIENTI.mod_saldo();" );
			
			HTML += '</form>';
			
			if(Q_idSaldo>-1)titoloDef=TXT_RicevutaSaldo;
			else titoloDef=TXT_InserisciSaldo;
			
			SCHEDA.caricaScheda(	stripslashes(Lingua(titoloDef)),
									HTML, 
									'PAZIENTI.chiudiSaldo();', 
									'scheda_saldo', 
									false, 
									true, 
									btn );
			initChangeDetection( "formMod" );
			
			SCHEDA.formModificato = false;
			if(mouseDetect)document.formMod.ValoreSaldo.focus();
			PAZIENTI.saldoOp = true;
		}});
	},
	mod_saldo: function(){ // salva il saldo
		if(PAZIENTI.idCL>-1){
			var PZ = DB.pazienti.data[PAZIENTI.idCL];
			if(!ControllaNumero(document.formMod.ValoreSaldo,stripslashes(Lingua(TXT_ValoreSaldo))))return;
			var DataModifica = DB.pazienti.lastSync+1;
			DataSaldo=new Date(	document.formMod.annoDataSaldo.value*1,
								document.formMod.meseDataSaldo.value*1-1,
								document.formMod.giornoDataSaldo.value*1);
			DataSaldo=DataSaldo.getTime();
			DataSaldo=parseInt(DataSaldo/1000);
			JSNPUSH={	"idSaldo": document.formMod.idSaldo.value*1,
						"MotivoSaldo": document.formMod.MotivoSaldo.value,
						"RicevutaSaldo": document.formMod.RicevutaSaldo.value,
						"DataSaldo": DataSaldo*1,
						"DataModifica": parseInt(DataModifica),
						"ValoreSaldo": parseFloat(document.formMod.ValoreSaldo.value.replace(",","."))*1,
						"Cancellato": 0,
						"frv": (LOGIN._frv()!='') };
						if(debug)console.log(JSNPUSH)
			if(!PZ.saldi)PZ.saldi=[];
			if(document.formMod.idSL.value*1>-1){
				PZ.saldi[document.formMod.idSL.value*1]=JSNPUSH;
				pDef=document.formMod.idSL.value*1;
			}else{
				PZ.saldi.push(JSNPUSH);
				pDef=PZ.saldi.length-1;
			}
			if(document.formMod.Intestazione){
				DB.login.data.Intestazione=document.formMod.Intestazione.value;
				localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login)).then(function(){
					// salvo il DB
				});
			}
			endChangeDetection();
			SCHEDA.formModificato = false;
			applicaLoading(document.querySelector(".listaSaldi"));
			applicaLoading(document.getElementById("scheda_testo"));
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				LOGIN.sincronizza( 	'rimuoviLoading(document.querySelector(".listaSaldi"));'+
									'rimuoviLoading(document.getElementById("scheda_testo"));'+
									'SCHEDA.scaricaScheda(true);'/* +
									'PAZIENTI.caricaSaldi('+pDef+')'*/ );
			});
		}
		return false;
	},
	el_saldo: function( Q_idSaldo ){ // elimina il saldo
		CONFIRM.vis(	Lingua(TXT_ChiediEliminaSaldo),
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(i in v)eval(getArguments(v,i));
			
			var PZ = DB.pazienti.data[PAZIENTI.idCL];
			var DataModifica = DB.pazienti.lastSync+1;
			PZ.DataModifica=parseInt(DataModifica);
			PZ.saldi[Q_idSaldo].DataModifica=parseInt(DataModifica);
			PZ.saldi[Q_idSaldo].Cancellato=1;
			endChangeDetection();
			SCHEDA.formModificato = false;
			applicaLoading(document.querySelector(".listaSaldi"));
			applicaLoading(document.getElementById("scheda_testo"));
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				LOGIN.sincronizza( 'PAZIENTI.caricaSaldi();SCHEDA.scaricaScheda();' );
			});
		}});
	},
	chiudiSaldo: function(){ // funzione richiamata alla chiusura del saldo
		SCHEDA.formModificato = false;
		PAZIENTI.saldoOp = false;
	}
}