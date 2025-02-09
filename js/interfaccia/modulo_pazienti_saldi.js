var PAZIENTI_SALDI = { // extend PAZIENTI
	// SALDI
	caricaSaldi: function( Q_resta ){
		// elenco saldi del paziente
		if(PAZIENTI.idCL>-1){
			Q_resta = __(Q_resta,false); // prefefinito
			
			let PZ = DB.pazienti.data[PAZIENTI.idCL],
				HTML='',
				vuoto=true,
				DaSaldare=Saldato=0;
			if(typeof(PZ.saldi)!='undefined'){
				cloneSALDI = clone(PZ.saldi);
				for(let p in cloneSALDI){
					cloneSALDI[p].p = p;
				}
				cloneSALDI.sort(sort_by("DataSaldo", true, parseInt));
				for(let p in cloneSALDI){
					let SA = cloneSALDI[p];
					if(!PAZIENTI.saldoOp)SA.md5='';
					if(!SA.Cancellato){
						HTML += '<div class="base"' +
								'	  id="btn_saldo_'+SA.p+'"' +
								'	  onClick="PAZIENTI.car_saldo(\''+SA.p+'\',this);">' +
								getDataTS(SA.DataSaldo)+' - '+getValuta()+' '+ArrotondaEuro(SA.ValoreSaldo) +
								'</div>';
						vuoto=false;
						Saldato+=SA.ValoreSaldo;
					}
				}
			}
			
			
			if(typeof(PZ.trattamenti)!='undefined'){
				for(let p in PZ.trattamenti){
					let TR = PZ.trattamenti[p];
					if(!TR.Cancellato && typeof(TR.CostoTrattamento)!='undefined')DaSaldare+=TR.CostoTrattamento;
				}
			}
			let RIS = DaSaldare-Saldato;
			let HTML_provv = 	'<p id="totSaldi">' +
								'	<i>'+htmlEntities(TXT("AncoraSaldare"))+':</i> ' +
								'	<span';
			if(RIS<0)HTML_provv += 	' style="background-color:#F00;' +
									'		  padding-left:4px;' +
									'		  padding-right:4px;' +
									'		  border-radius:4px;"';
			HTML_provv += 	'>'+getValuta()+' '+ArrotondaEuro(RIS) +
							'	</span>' +
							'</p>';
			if(vuoto){
				HTML += HTML_provv + '<p class="noResults lista listaSaldi">'+TXT("NoResSaldi")+'...</div>';
			}else{
				HTML = '<div class="lista listaSaldi">' + HTML_provv + HTML + '</div>';
			}
			
			
			let HTML_pre = '';
			HTML_pre += PAZIENTI.intestazionePaziente("s");
			HTML_pre += '<div class="menuElenchi"' +
						'	  onClick="MENU.visMM(\'add_saldo\');">' +
						'</div>' +
						'<p id="add_saldo">' +
						'	<i class="elMenu"' +
						'	   title="'+htmlEntities(TXT("AggiungiSaldo"))+'"' +
						'	   onclick="PAZIENTI.car_saldo();">' +
						'		<span>'+htmlEntities(TXT("AggiungiSaldo"))+'</span>' +
						'	</i>' +
						'</p>';
			
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
	car_saldo: function( Q_idSaldo, btn, salvato ){
		// scheda del saldo
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(),
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
						Q_idSaldo = __(Q_idSaldo,-1); // prefefinito
			
			MENU.nasMM();
			let idSaldo = 0,
				MotivoSaldo = '',
				RicevutaSaldo = '',
				ValoreSaldo = 0,
				DataSaldo = 0,
				PZ = DB.pazienti.data[PAZIENTI.idCL];
			if(Q_idSaldo>-1){
				let SA = PZ.saldi[Q_idSaldo];
				for(let i in PZ.saldi)PZ.saldi[i].md5='';
				idSaldo=SA.idSaldo*1;
				MotivoSaldo=SA.MotivoSaldo;
				RicevutaSaldo= __(SA.RicevutaSaldo);
				ValoreSaldo=SA.ValoreSaldo*1;
				DataSaldo=SA.DataSaldo*1;
				SA.md5=PAZIENTI.pazSelMD5;
				
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti));
			}else{
				DataSaldo = new Date()*1;
				DataSaldo /= 1000;
			}
			let HTML='';
			if(typeof(DB.login.data.Intestazione)=='undefined')DB.login.data.Intestazione='';
			Intestazione = htmlEntities(DB.login.data.Intestazione);
			IntestazioneCliente = PZ.Nome+" "+PZ.Cognome+H.chr10+PZ.Indirizzo+H.chr10+PZ.CAP+' '+PZ.Citta;
			if(PZ.Provincia)IntestazioneCliente += ' ('+PZ.Provincia+')';
			IntestazioneCliente += H.chr10;
			IntestazioneCliente = htmlEntities(IntestazioneCliente);
			while(IntestazioneCliente.indexOf(H.chr10)>-1)IntestazioneCliente = IntestazioneCliente.replace(H.chr10,'<br>');
			
			
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
									TXT("per") + " " + IntestazioneCliente +
					'				</div>';
			HTML += '			</div>' +
					'		</div>' +
					'		<div class="schDx">' +

					// Campi nascosti
					H.r({	t: "h", name: "stessa",		value: '1' 					}) +
					H.r({	t: "h", name: "idSaldo",	value: (idSaldo*1) 			}) +
					H.r({	t: "h", name: "idSL",		value: Q_idSaldo 			}) +
					H.r({	t: "h", name: "md5",		value: PAZIENTI.pazSelMD5 	}) +
			
					H.r({	t: "d",
							name: "DataSaldo",
							value: DataSaldo,
							label: TXT("Data"),
							idRiga: 'dataSaldo' }) +
			
					H.r({	t: "r",
							name: "RicevutaSaldo",
							value: RicevutaSaldo,
							label: TXT("RicevutaNumero"),
							classCampo: "RicTrattDx",
							styleRiga: "text-align:right;",
							classRiga: "div_saldi" }) +
			
					'		</div>' +
					
			
					H.r({	t: "t",
							name: "MotivoSaldo",
							noLabel: true,
							value: MotivoSaldo,
							classCampo: "TitTrattDx",
							styleRiga: "text-align:right;",
							classRiga: "div_saldi" }) +
			
			
					H.r({	t: "r",
							name: "ValoreSaldo",
							value: (ValoreSaldo) ? ArrotondaEuro(ValoreSaldo) : '',
							label: TXT("ValoreSaldo")+" "+getValuta(),
							ver: "1|0|num",
							classCampo: "CostoTrattDx",
							keyupCampo: "H.keyPrezzo(this);",
							styleRiga: "text-align:right;",
							classRiga: "div_saldi" }) +
							
					'		<span id="btn_stampa" class="stampaBtn noPrint" onclick="SCHEDA.stampaScheda({});">'+TXT("StampaRicevuta")+'</span>' +
					'	</div>' +
					
					// pulsanti SALVA, ANNULLA e ELIMINA
					SCHEDA.pulsantiForm( 	Q_idSaldo>-1 ? 'PAZIENTI.el_saldo('+Q_idSaldo+')':"",
											"SCHEDA.scaricaScheda();", 
											"if(H.verData(\'DataSaldo\',true))PAZIENTI.mod_saldo();" ) +
			
					'</form>';
			
			let azElimina = Q_idSaldo>-1 ? 'PAZIENTI.el_saldo('+Q_idSaldo+')' : "",
				btnAdd = '';
			if(azElimina){
				btnAdd += '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+TXT("EliminaScheda")+'</div>';
			}
			btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'archives.patients.receipts\')">' +
							TXT("ReferenceGuide") +
						'</div>';
			
			if(Q_idSaldo>-1)titoloDef=TXT("RicevutaSaldo");
			else titoloDef=TXT("InserisciSaldo");
			
			SCHEDA.caricaScheda(	stripslashes(titoloDef),
									HTML, 
									'PAZIENTI.chiudiSaldo('+idSaldo+');', 
									'scheda_saldo', 
									false, 
									true, 
									btn,
									btnAdd );
			initChangeDetection( "formMod" );
			
			SCHEDA.formModificato = false;
			if(mouseDetect)document.formMod.ValoreSaldo.focus();
			PAZIENTI.saldoOp = true;
			if(salvato)SCHEDA.msgSalvataggio();
			
			// verifico che non sia già aperta da qualcun altro e intanto la blocco
			LOGIN.verifyLocked("saldi",idSaldo);
			
		}});
	},
	mod_saldo: function(){
		// salva il saldo
		if(PAZIENTI.idCL>-1){
			stopAnimate(true);
			visLoader(TXT("SalvataggioInCorso"),'loadingLight');
			let PZ = DB.pazienti.data[PAZIENTI.idCL];
			if(!ControllaNumero(document.formMod.ValoreSaldo,stripslashes(TXT("ValoreSaldo"))))return;
			let DataModifica = DB.pazienti.lastSync+1;
			DataSaldo=new Date(	document.formMod.annoDataSaldo.value*1,
								document.formMod.meseDataSaldo.value*1-1,
								document.formMod.giornoDataSaldo.value*1);
			DataSaldo=DataSaldo.getTime();
			DataSaldo=parseInt(DataSaldo/1000);
			DateSaldo = DataSaldo ? formatDate(DataSaldo*1000) : '';
			JSNPUSH={	"idSaldo": document.formMod.idSaldo.value*1,
						"MotivoSaldo": document.formMod.MotivoSaldo.value,
						"RicevutaSaldo": document.formMod.RicevutaSaldo.value,
						"DataSaldo": DataSaldo*1,
						"DateSaldo": DateSaldo,
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
				localPouchDB.setItem(MD5("DB.login"), IMPORTER.COMPR(DB.login));
			}
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				SYNCRO.sincronizza( 	'PAZIENTI.car_saldo('+pDef+',document.getElementById("btn_saldo_'+pDef+'"),true);' +
									'if(smartMenu)SCHEDA.scaricaScheda(true);' +/* CHIUSURA DOPO SALVATAGGIO da SMART*//* +*/
									'PAZIENTI.caricaSaldi('+pDef+');' +
									'startAnimate();' +
									'nasLoader();' );
			});
		}
		return false;
	},
	el_saldo: function( Q_idSaldo ){
		// elimina il saldo
		CONFIRM.vis(	TXT("ChiediEliminaSaldo"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
						
			stopAnimate(true);
			visLoader(TXT("SalvataggioInCorso"),'loadingLight');
			
			let PZ = DB.pazienti.data[PAZIENTI.idCL],
				DataModifica = DB.pazienti.lastSync+1;

			PZ.DataModifica=parseInt(DataModifica);
			PZ.saldi[Q_idSaldo].DataModifica=parseInt(DataModifica);
			PZ.saldi[Q_idSaldo].Cancellato=1;
			endChangeDetection();
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
				SYNCRO.sincronizza( 	'PAZIENTI.caricaSaldi();' +
									'SCHEDA.scaricaScheda();' +
									'nasLoader();' +
									'startAnimate();' );
			});
		}});
	},
	chiudiSaldo: function( idSaldo ){
		// funzione richiamata alla chiusura del saldo
		SCHEDA.formModificato = false;
		PAZIENTI.saldoOp = false;
			
		// tolgo il blocco online dall'elemento
		if(typeof(idSaldo)!='undefined')LOGIN.closeLocked("saldi",idSaldo);
	}
}