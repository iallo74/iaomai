
var MODULO_PROCEDURE = { // extend SET
	
	dettagliProvvisori: [],
	idProcCommProvv: -1,
	idProcCommOp: -1,
	elProcCommOp: null,
	community_elenco: [],
	tipoProc: '',
	procSel: -1,
	procOp: false,
	ricComm: {
		parolaRic: '',
		idLinguaRic: 0,
		prefRic: '0'
	},
	commSel: '',
	
	intestazioneProcedure: function( Q_tue){
		var HTML = '';
		HTML += '<p class="trattBtns" style="margin-top:10px;"><span id="procBtnTue" ';
		if(Q_tue)HTML += 'class="selBtn" ';
		else HTML += 'onClick="SET.car_procedure(-1,1);"';
		HTML += '>'+TXT("Tue").toUpperCase()+'</span> <span id="procBtnComm" ';
		if(!Q_tue)HTML += 'class="selBtn" ';
		else HTML += 'onClick="SET.caricaCommunity();"';
		HTML += '>'+TXT("Community").toUpperCase()+'</span></p>';
		return HTML;
	},
	car_procedure: function( Q_idProc='', Q_tue='' ){ // elenco delle procedure
		if(Q_idProc+''=='')Q_idProc=-1;
		if(Q_tue*1==0){
			SET.caricaCommunity();
			return;
		}
		var HTML =	'';
			
		var presente=false;
		
		//if(typeof(DB.procedure.data) != 'undefined')DB.procedure.data.sort(sort_by("NomeProcedura", false));
		
		if(typeof(DB.procedure.data) != 'undefined'){
			var clonePROCEDURE = clone(DB.procedure.data);
			for (p in clonePROCEDURE) {
				clonePROCEDURE[p].p = p;
			}
			clonePROCEDURE.sort(sort_by("NomeProcedura", false));
		}else clonePROCEDURE = [];
		for (p in clonePROCEDURE) {
			PR = clonePROCEDURE[p];
			if(!PR.Cancellato && __(PR.app)==globals.set.siglaProc){
				HTML += '<div id="btn_procedura_'+PR.p+'" class="base';
				if(Q_idProc*1==PR.p*1)HTML += ' elencoSel';
				if(Q_tue){
					if(PR.Condiviso*1==1)HTML += ' procCond';
					else HTML += ' procNotCond';
				}
				HTML += '" onClick="SET.car_procedura('+PR.p;
				if(!Q_tue)HTML += ',false,true';
				else HTML += ',false,false';
				HTML += ',this);">';
				
				if(PR.DataModifica>DB.procedure.lastSync)HTML += H.imgSyncro();
				HTML+=htmlEntities(PR.NomeProcedura);
				
				DataCreazione=getDataTS(PR.DataCreazione);
				if(!Q_tue)HTML += '<br><span>'+PR.Pseudonimo+' ('+DataCreazione+')</span>';
				HTML += '</div>';
				presente = true;
			}
		}
		if(!presente)HTML='<div class="noResults">'+TXT("NoResProcedure")+'...</div>';
		HTML = '<div class="lista listaProcedure">'+HTML+'</div>';
		
		HTML = 	SET.intestazioneProcedure(Q_tue) +
				'<div class="menuElenchi"' +
				'	  onClick="MENU.visMM(\'add_proc\');">' +
				'</div>' +
				'<p id="add_proc">' +
				'	<input id="proc_ricerca"' +
				'			onKeyUp="SET.filtraProcedure();"' +
				'			class="okPlaceHolder"' +
				'			placeholder="'+htmlEntities(TXT("CercaProcedura"))+'"'+H.noAutoGen+'>' +
				'	<i class="elMenu"' +
				'	   onclick="SET.mod_procedura();"' +
				'	   id="addProcedura"' +
				'	   title="'+TXT("AggiungiProcedura")+'">' +
				/*'		<span>'+TXT("AggiungiProcedura")+'</span>' +*/
				'	</i>' +
				'</p>' + HTML;
		
		document.getElementById("lista_procedure").innerHTML=HTML;
		if(Q_idProc>-1)SCHEDA.btnSel = document.getElementById("btn_procedura_"+Q_idProc);
	},
	filtraProcedure: function( event ){
		var parola = document.getElementById("proc_ricerca").value.trim();
		for(let p in DB.procedure.data){
			if(DB.procedure.data[p].NomeProcedura.toLowerCase().indexOf(parola.toLowerCase()) == -1){
				document.getElementById("btn_procedura_"+p).classList.add("nasPazRic");
			}else{
				document.getElementById("btn_procedura_"+p).classList.remove("nasPazRic");
			}
		}
		if(parola)document.getElementById("proc_ricerca").classList.add("filtro_attivo");
		else document.getElementById("proc_ricerca").classList.remove("filtro_attivo");
	},
	car_procedura: function( Q_idProc, Q_resta, Q_community, btn ){ // visualizza la scheda della procedura
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(), 
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			if(typeof(Q_idProc)=='undefined')var Q_idProc=-1;
			if(typeof(Q_resta)=='undefined')var Q_resta=false;
			if(typeof(Q_community)=='undefined')var Q_community=false;
			if(typeof(btn)=='undefined')var btn=null;
			
			var idProcedura=0;
			var idUtenteProcedura=0;
			var Autore=''; // solo community
			var NomeProcedura='';
			var dettagliProcedura=[];
			//var commentiProcedura=[];
			var DataCreazione=0;
			var DataModifica=0;
			var Preferito=0; // solo community
			var Condiviso=0;
			var gallery='[]';
			if(!Q_community){
				if(Q_idProc>-1){
					var PR = DB.procedure.data[Q_idProc];
					PR.i_interno=Q_idProc;
					idProcedura=PR.idProcedura*1;
					Autore=TXT("Tu");
					idLinguaProcedura=PR.idLinguaProcedura*1;
					NomeProcedura=PR.NomeProcedura;
					dettagliProcedura=PR.dettagliProcedura;
					DataCreazione=PR.DataCreazione*1;
					DataModifica=PR.DataModifica*1;
					Condiviso=PR.Condiviso*1;
					idUtenteProcedura = DB.login.data.idUtente*1;
					gallery=__(PR.gallery,'[]');
				}
			}else{
				for(let p in SET.community_elenco){
					if(SET.community_elenco[p].idProcedura*1==Q_idProc*1){
						var PR = SET.community_elenco[p];
						idProcedura=PR.idProcedura*1;
						idUtenteProcedura=PR.idUtenteProcedura*1;
						Autore=PR.Pseudonimo;
						idLinguaProcedura=PR.idLinguaProcedura*1;
						NomeProcedura=PR.NomeProcedura;
						dettagliProcedura=PR.dettagliProcedura;
						DataCreazione=PR.DataCreazione*1;
						DataModifica=PR.DataModifica*1;
						Preferito=PR.Preferito*1;
						Condiviso=PR.Condiviso*1;
						gallery=__(PR.gallery,'[]');
					}
				}
			}
			if(!gallery)gallery='[]';
			gallery=JSON.parse(gallery);
			PH.galleryProvvisoria=gallery;
			if(Preferito*1==1)TXT_AggiungiPreferitiDEF=TXT("EliminaPreferiti");
			else TXT_AggiungiPreferitiDEF=TXT("AggiungiPreferiti");
			
			var HTML = '';
			HTML += '<h1>'+htmlEntities(NomeProcedura)+'</h1>' +
					'<div id="mdProc">' +
		
					// AUTORE E DATA
					'	<div class="p_sch_label2">' +
					'	<span class="commAvatar';
			var dt = new Date().getTime();
			//if(CONN.getConn() && idUtenteProcedura)HTML += '" style="background-image:url(' + CONN.APIfolder+'getAvatarMini.php?idU='+idUtenteProcedura+'&t='+dt+');';
			if(CONN.getConn())HTML += '" style="background-image:url(' + CONN.APIfolder+'getAvatarMini.php?idU='+idUtenteProcedura+'&t='+dt+');';
			else HTML += ' commNoAvatar"';
			HTML +=	'"></span>' +
					'		<b>' + Autore + '</b>'+((DataModifica>1)?' ('+getDataTS(DataModifica)+')':'') +
					'	</div>' +
					'	<div class="p_sch_tools">';
			
			
			if(!Q_community){ // azioni se la procedura è dell'utente
				// AZIONI
				HTML += 
					'		<span id="modProc"' +
					'			  onClick="SET.mod_procedura('+Q_idProc+');""' +
					'			  class="noPrint">' +
								htmlEntities(TXT("modifica")) +
					'		</span>' +
					'		<div class="p_sch_' + ((Condiviso!=1)? 'no_' : '') +'cond"' +
					'			 onClick="SET.swCond('+Q_idProc+');"' +
					'			 title="'+TXT("Condividi")+'"></div>';
			}else{
				// PREFERITI
				HTML += 
					'		<div id="prefProcBtn" class="p_sch_' + ((Preferito!=1) ? 'no_' : '') + 'pref"' +
					'		  	 onClick="SET.swPref('+Q_idProc+',this);"' +
					'		  	 title="'+TXT("AggiungiPreferitiDEF")+'">' +
					'		</div>';
			}
			HTML += '	</div>' +
					'	<div class="l"' +
					'		 style="border-bottom:1px solid rgba(0,0,0,0.2);">' +
					'	</div>' +
					'</div>';
					
			// elenco dei dettagli procedura
			var presente=false;
			var n = -1;
			
			for(let p in dettagliProcedura){
				if(!dettagliProcedura[p].Cancellato){
					n++;
					TipoDettaglio=dettagliProcedura[p].TipoDettaglio;
					DescrizioneDettaglio=dettagliProcedura[p].DescrizioneDettaglio;
					OrdineDettaglio=dettagliProcedura[p].OrdineDettaglio*1;
					
					
					var nTsubo='';
					var siglaMeridiano='';
					var siglaTsubo='';
					var mezzo='';
					if(TipoDettaglio=='P' || TipoDettaglio=='A'){	
						if(DescrizioneDettaglio){
							if(DescrizioneDettaglio.indexOf(".")>-1){
								pP=DescrizioneDettaglio.split(".");
								if(TipoDettaglio=='P'){
									nTsubo=pP[0];
									siglaMeridiano=pP[1];
									siglaTsubo=__(pP[2]);
									mezzo=__(pP[3]);
								}
								if(TipoDettaglio=='A'){
									siglaTsubo=pP[0];
									mezzo=__(pP[1]);
								}
							}else{
								if(TipoDettaglio=='P')nTsubo=DescrizioneDettaglio;
								if(TipoDettaglio=='A')siglaTsubo=DescrizioneDettaglio;
							}
						}
					}
					
					HTML += '<div class="rgProc_'+TipoDettaglio+'"';
					if(!n && (TipoDettaglio=='P' || TipoDettaglio=='A'))HTML += ' style="margin-top:15px;"';
					HTML += '>';
					if(TipoDettaglio=='T')HTML += '<b>';
					if(TipoDettaglio=='T' || TipoDettaglio=='D'){
						while(DescrizioneDettaglio.indexOf(H.chr10)>-1){
							DescrizioneDettaglio=DescrizioneDettaglio.replace(H.chr10,'<br>');
						}
						HTML+=DescrizioneDettaglio;
					}
					if(TipoDettaglio=='P'){
						if(!siglaTsubo)siglaTsubo = nTsubo+"."+siglaMeridiano;
						if(nTsubo && siglaMeridiano){
							HTML += '<span class="pallinoPat';
							if(typeof(DB.set.meridiani[siglaMeridiano])=='undefined')HTML += ' ptNoSel';
							HTML += '"';
							if(typeof(DB.set.meridiani[siglaMeridiano])!='undefined')HTML += ' onClick="SET.selTsubo(\''+nTsubo+"|"+siglaMeridiano+'\')"';
							
							var txt = siglaTsubo;
							if(siglaMeridiano=='NK')txt = DB.set.meridiani.NK.tsubo[nTsubo*1-1].NomeTsubo
							
							HTML += '>'+txt+'</span>';
						}
					}
					if(TipoDettaglio=='M'){
						var siglaMeridiano = DescrizioneDettaglio.split(".")[0]
						HTML += '<span class="rgProcMod dettMeridiano' +
								(MERIDIANI[siglaMeridiano].meridianoAcceso ? ' p_'+MERIDIANI[DescrizioneDettaglio].elemento : '') +
								'"' +
								'	   id="tr_p'+siglaMeridiano+'"' +
								'	   style="cursor:pointer;"' +
								'	   onMouseOver="SET.eviMeridiano(\''+siglaMeridiano+'\',true)"' +
								'	   onMouseOut="SET.eviMeridiano(\''+siglaMeridiano+'\',false)"' +
								'	   onClick="SET.accendiMeridiano(\''+siglaMeridiano+'\',true)">'+
								'	<span class="meridProc">' +
										DB.set.meridiani[siglaMeridiano].NomeMeridiano +
								'	</span>'
								'</span>';
					}
					if(TipoDettaglio=='A' && siglaTsubo){
						var NomeTsubo = DB.set.punti[siglaTsubo].NomeTsubo;
						HTML += '[.'+siglaTsubo+'.]';
					}
					if(mezzo)HTML += '<img src="img/mezzo_'+mezzo+'.png" class="noMod" style="vertical-align: middle;margin-top: -3px;margin-left: 5px;">';
					if(TipoDettaglio=='T')HTML += '</b>';
					HTML += '</div>';
					presente=true;
				}
			}
			if(!presente){
				HTML +=
					'	<div class="noResults" style="height:100px;">'+TXT("NoRes")+'...</div>';
			}
			// GALLERY
			HTML += '<div id="contGallery" class="contGallery"></div>';
			
			
			// COMMENTI
			if(idProcedura && CONN.getConn() && LOGIN.logedin()){	
				if(typeof(commentiProcedura)=='undefined')commentiProcedura=[];
				HTML += 
					'	<div id="contCommenti">' +
					'		<div class="sezioneTrattamenti divEspansa"' +
					'			 style="background:transparent !important;' +
					'					border-top:none !important;' +
					'					padding: 0px;' +
					'					margin-top: 20px;"></div>' +
					'		<div class="procCommenti sezioneTrattamenti divEspansa sezioneChiusa">' +
					'			<em id="labelCommenti"' +
					'				onClick="parentElement.classList.toggle(\'sezioneChiusa\');"' +
					'				class="labelMobile labelTrattamenti"' +
					'				style="display:block;">' +
					'				<img class="icoLabel" src="img/ico_commenti.png">' +
								TXT("Commenti")+' (<span id="numeroCommenti">...</span>)' +
					'			</em>' +
					'			<div id="elencoCommenti">' +
					'				<div id="notificaCommenti"' +
					'					 onClick="SET.swNotificabile('+idProcedura+');">' +
					'				</div>' +
					'				<div id="placeholderCommento"' +
					'				 	 class="placeholderCommento"></div>' +
					'				<div id="p_add_comm"' +
					'					 onClick="if(COMMUNITY.verifica())SET.attivaCommento('+idProcedura+');">' +
									TXT("AddCommento") +
					'				</div>' +
					'				<div style="clear:both;height:10px;"></div>' +
									// ELENCO COMMENTI
					'				<div id="commenti">' +
					'				</div>' +
					'			</div>' +
					'		</div>'; +
					'	</div>';
			}
			HTML += '</div>';
			if(globals.set.siglaProc=='AUR')HTML = SET.convPuntiScheda(HTML); // <<<<<<<<<<< VERIFICARE
			if(SCHEDA.btnSel && Q_resta)SCHEDA.btnSel=null;
			var btnAdd = '';
			var azElimina = (Q_idProc>-1 && !Q_community) ? 'SET.el_procedura('+Q_idProc+');':'';
			if(azElimina){
				btnAdd += '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+TXT("EliminaScheda")+'</div>';
			}
			btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.procedures\')">' +
							TXT("ReferenceGuide") +
						'</div>';
			SCHEDA.caricaScheda( 	NomeProcedura,
									HTML,
									'SET.annullaEvidenziaTsubo();' +
									((!globals.set.siglaProc)?'SET.spegniMeridiani(true);':''),
									'scheda_procedura',
									false,
									true,
									btn,
									btnAdd );
			PH.caricaGallery(true,idUtenteProcedura);
			if(!globals.set.siglaProc)SET.convSigleScheda();
			SET.evidenziaTsubo(HTML);
			if(!globals.set.siglaProc)SET.evidenziaMeridiani(HTML);
			if(idProcedura)SET.car_commenti(idProcedura);
			if(Q_resta){
				if(btn){
					btn.innerHTML = htmlEntities(NomeProcedura);
					btn.classList.remove( Condiviso ? "procNotCond" : "procCond" );
					btn.classList.add( Condiviso ? "procCond" : "procNotCond" );
					SET.procOp=true;
					SET.procSel=Q_idProc;
				}else{
					SET.car_procedure(Q_idProc,1);
				}
			}
			if(Q_community){
				document.getElementById("procComm"+Q_idProc).className = document.getElementById("procComm"+Q_idProc).className.replace("New","");
			}
		}});
	},
	swCond: function( Q_idProc=-1 ){ // setta sì/no le condizioni della community
		if((DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(TXT("MsgFunzioneSoloPay"));
			return false;
		}
		if(!COMMUNITY.verifica())return;
		var DataModifica = DB.procedure.lastSync+1;
		if(DB.procedure.data[Q_idProc].Condiviso==1)DB.procedure.data[Q_idProc].Condiviso=0;
		else DB.procedure.data[Q_idProc].Condiviso=1;
		DB.procedure.data[Q_idProc].DataModifica = DataModifica;
		applicaLoading(document.querySelector(".listaProcedure"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure)).then(function(){ // salvo il DB
			LOGIN.sincronizza(	'rimuoviLoading(document.querySelector(".listaProcedure"));' +
								'SET.car_procedura('+Q_idProc+',1,0);');
		});
	},
	swPref: function( Q_idProc='', el ){ // setta sì/no come preferita una procedura della community
		var Q_pref=0;
		if(el.classList.contains("p_sch_pref"))Q_pref=1;
		
		//retNoFree();
		CONN.retNoConn();
	
		var JSNPOST={	"idLinguaRic": document.formRicProc.idLinguaRic.value*1,
						"parolaRic": document.formRicProc.parolaRic.value,
						"parolaRicCrypt": document.formRicProc.parolaRic.value,
						"prefRic": document.formRicProc.prefRic.value,
						"record": document.formRicProc.record.value*1,
						"idProcPref": Q_idProc*1,
						"modPref": Q_pref*1	};
		
		CONN.caricaUrl(	"community_elenco.php",
						"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
						"SET.confermaSwPref");
						
		if(Q_pref){
			SCHEDA.btnSel.classList.remove("procPref");
			document.getElementById("prefProcBtn").classList.remove("p_sch_pref");
			document.getElementById("prefProcBtn").classList.add("p_sch_no_pref");
		}else{
			SCHEDA.btnSel.classList.add("procPref");
			document.getElementById("prefProcBtn").classList.remove("p_sch_no_pref");
			document.getElementById("prefProcBtn").classList.add("p_sch_pref");
		}
		for(let f in SET.community_elenco){
			if(SET.community_elenco[i].idProcedura == Q_idProc){
				if(Q_pref=='1')SET.community_elenco[i].Preferito = '0';
				else SET.community_elenco[i].Preferito = '1';
			}
		}
		return false;
	},
	confermaSwPref: function( txt ){
		if(txt.substr(0,3)=='404')ALERT(TXT("ProcedureErrore"));
	},
	mod_procedura: function( Q_idProc=-1, Q_pre ){ // scheda di modifica della procedura
		// verifico le autorizzazioni
		if(Q_idProc.toString()=='')Q_idProc=-1;
		var maxProcedure = 1;
		if(LOGIN.reg() && LOGIN.logedin()){
			if(DB.login.data.auths.indexOf(globals.set.cartella)>-1)maxProcedure = -1;
		}
		if(maxProcedure>-1 && Q_idProc==-1){
			var tProc = 0;
			var app = '';
			if(globals.set.cartella=='auricologia')app = 'AUR';
			for(let c in DB.procedure.data){
				if(DB.procedure.data[c].Cancellato*1==0 && __(DB.procedure.data[c].app) == app)tProc++;
			}
			if(tProc >= maxProcedure){
				ALERT(TXT("MsgMaxProcedure"));
				return;
			}
		}
		// --------------------------
		
		CONFIRM.vis(	TXT("UscireSenzaSalvare"),
						!SCHEDA.verificaSchedaRet(), 
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			if(typeof(Q_idProc)=='undefined')var Q_idProc=-1;
			if(Q_idProc.toString()=='')Q_idProc=-1;
			if(typeof(Q_pre)=='undefined')var Q_pre=0; // <<<< FORSE DA TOGLIERE
			
			MENU.nasMM();
			
			var idProcedura=0;
			var idLinguaProcedura=0;
			var NomeProcedura='';
			var dettagliProcedura='';
			var Condiviso=0;
			var gallery='[]';
		
			if(Q_idProc>-1){
				var PR = DB.procedure.data[Q_idProc];
				idProcedura=PR.idProcedura*1;
				idLinguaProcedura=PR.idLinguaProcedura*1;
				NomeProcedura=PR.NomeProcedura;
				dettagliProcedura=PR.dettagliProcedura;
				Condiviso=PR.Condiviso*1;
				gallery=__(PR.gallery,'[]');
			}
			
			if(!dettagliProcedura)dettagliProcedura=[];
			SET.dettagliProvvisori=JSON.parse(JSON.stringify(dettagliProcedura));
			var siglaLinguaProcedura='';
			if(idLinguaProcedura)siglaLinguaProcedura=DB.lingueProcedure[idLinguaProcedura];
			if(!gallery)gallery='[]';
			gallery=JSON.parse(gallery);
			PH.galleryProvvisoria=gallery;
			
			var HTML = '';
			// intestazione se la procedura è dell'utente
			//if(frv)HTML+=box_frv3;
			HTML += '<form id="formMod" name="formMod" method="post" onSubmit="return SET.verFormProc();"><div>';
			
			// Lingua della procedura
			HTML += '	<div id="divLinguaModProc">' +
					'		<div id="linguaModProc">' +
					'			<select name="idLinguaProcedura"' +
					'				    id="idLinguaProcedura"' +
					'		  			onChange="this.blur();">';
			for(let p in DB.lingueProcedure){
				HTML += 
						'			<option value="'+p+'"';
									if(siglaLinguaProcedura==DB.lingueProcedure[p])HTML+=' SELECTED';
									HTML+='>&nbsp;&nbsp;&nbsp;&nbsp;'+DB.lingueProcedure[p]+'</option>';
			}
			HTML += '			</select>' +
					'		</div>' +
					'	</div>';
			
			// Nome Procedura
			HTML += H.r({	t: "r",
							name: "NomeProcedura",	
							value: NomeProcedura,	
							ver: '1|0',
							classCampo: 'styled' });
			
			// Campi nascosti
			HTML += H.r({	t: "h",	name: "stessa",			value: '1' 			});
			HTML += H.r({	t: "h",	name: "az",				value: '' 			});
			HTML += H.r({	t: "h",	name: "tipoDett",		value: '' 			});
			HTML += H.r({	t: "h",	name: "idDett",			value: '' 			});
			HTML += H.r({	t: "h",	name: "idProcedura",	value: idProcedura 	});
			HTML += H.r({	t: "h",	name: "idProc",			value: Q_idProc 	});
			HTML += H.r({	t: "h",	name: "Condiviso",		value: Condiviso 	});
			
			// segnaposto DETTAGLI
			HTML += '	<div style="font-style:italic;padding-top:20px;padding-bottom:5px;">'+
						TXT("DettagliProcedura")+
						':</div>';
			HTML += '	<div id="dettagliCont" class="'+globals.set.siglaProc+'"></div>';
			
			// pulsanti di aggiunta opzioni
			HTML += '	<div class="p_sch_label">' +
							TXT("Aggiungi")+':' +
					'	</div>' +
					'	<div id="p_add_dett">' +
					'		<div>' +
					'			<div class="p_sch_tit"' +
					'				 onClick="SET.aggiungiDettaglio(\'T\');">' +
									TXT("Titoletto") +
					'			</div>' +
					'			<div class="p_sch_descr"' +
					'				 onClick="SET.aggiungiDettaglio(\'D\');">' +
									TXT("Descrizione") +
					'			</div>';
			if(!globals.set.siglaProc)HTML += 
					// tsubo
					'			<div id="grpPt"' +
					'			    class="p_proc_gruppo"' +
					'			    onClick="PAZIENTI.gruppoPunti(\'P\');">' +
									htmlEntities(TXT("Punto")) +
					'			</div>' +
			
					// meridiani
					'			<div id="grpMrd"' +
					'				 class="p_proc_meridiani"' +
					'				 onClick="PAZIENTI.gruppoPunti(\'M\');">' +
									htmlEntities(TXT("AggiungiMeridiano")) +
									/*SET.elencoMeridiani(TXT("AggiungiMeridiano")) +*/
					'			</div>';
			else HTML +=
					// punti auricolari
					'			<div id="grpPt"' +
					'			    class="p_proc_gruppo"' +
					'			    onClick="SET.aggiungiDettaglio(\'A\');">' +
									TXT("Punto") +
					'			</div>';
					
			HTML +=	'		</div>' +
					'		<div class="l sepH"></div>' +
					'	</div>';
			if(!globals.set.siglaProc)HTML +=	
					'	<div id="gruppoPunti_cont">' +
							/*PAZIENTI.gruppoPunti() +*/
					'	</div>';
			
			// GALLERY
			var cont = '	<div id="contGallery"' +
						'		 class="divEspansa contGallery">' +
						'	</div>' +
						'	<div id="p_add_dett"' +
						'		 style="margin-top: 0px;">' +
						'		<input type="file"' +
						'			   id="fotoProvv_FL"' +
						'			   class="p_paz_foto"' +
						'		       onChange="PH.selezionaFoto(this);">' +
						'		<span id="addFoto">' +
									TXT("AggiungiFoto") +
						'		</span>' +
						'		<span class="p_paz_choose"' +
						'		      onClick="MENU.visArchives();"></span>' +
						'		<span id="chooFoto">' +
									TXT("ScegliFoto") +
						'		</span>' +
						'	</div>';
					
			HTML += H.r({	t: "h", name: "totFoto",	value: "0" });
			HTML += H.sezione({
				label: TXT("Gallery"),
				nome: 'files',
				html: cont
						});	
						
						
			
			// pulsanti SALVA e ANNULLA
			HTML += SCHEDA.pulsantiForm( 	"",
											"SET.annullaProc();", 
											"SET.salvaProcedura();" );
			
			HTML += '	<div class="l"></div>';
			HTML += '</form>';
			
			var titDef=TXT("ModificaProcedura");
			if(Q_idProc==-1)titDef=TXT("CreaProcedura");
			
			var btnAdd = '';
			var azElimina = (Q_idProc>-1) ? 'SET.el_procedura('+Q_idProc+');':'';
			if(azElimina){
				btnAdd += '<div class="p_paz_el_menu" onClick="'+azElimina+'">'+TXT("EliminaScheda")+'</div>';
			}
			btnAdd += 	'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.procedures\')">' +
							TXT("ReferenceGuide") +
						'</div>';
							
			SCHEDA.caricaScheda(	titDef,
									HTML, 
									'SET.chiudiProcedura('+idProcedura+');', 
									'scheda_procedura', 
									false, 
									true, 
									SCHEDA.btnSel,
									btnAdd );
			
			if(typeof(DB.procedure.data.dettagliProcedura)!='undefined'){
				SET.dettagliProvvisori=JSON.parse(JSON.stringify(DB.procedure.data.dettagliProcedura));
			}
			SET.caricaDettagli();
			PH.caricaGallery();
			
			initChangeDetection( "formMod" ); // lasciare dopo caricaDettagli
			
			if(!touchable)document.formMod.NomeProcedura.focus();
			
			// verifico che non sia già aperta da qualcun altro e intanto la blocco
			LOGIN.verifyLocked("procedure",idProcedura);
		}});
	},
	chiudiProcedura: function( idProcedura ){ // alla chiusura della modifica della procedura
		SET.annullaEvidenziaTsubo();
		if(!globals.set.siglaProc)SET.spegniMeridiani(true);
		endChangeDetection();
		SCHEDA.formModificato = false;
			
		// tolgo il blocco online dall'elemento
		if(typeof(idProcedura)!='undefined')LOGIN.closeLocked("procedure",idProcedura);
	},
	salvaProcedura: function(){ // salva una procedura
		stopAnimate(true);
		visLoader(TXT("SalvataggioInCorso"),'loadingLight');
		var DataModifica = DB.procedure.lastSync+1;
		if(!document.formMod.idProc.value*1>-1)DataCreazione=DataModifica;	
		
		// salvo le immagini
		var GA = PH.galleryProvvisoria;
		for(let i in GA){
			GA[i].Dida = document.getElementById("Dida"+i).value;
			if(typeof(GA[i].imgMini) != 'undefined' && GA[i]!=null && GA[i].imgMini!=null){
				
				// salvo l'immagine nel DB locale
				DB.foto.data.push({
					idFoto: GA[i].idFoto,
					imgMini: GA[i].imgMini,
					imgBig: GA[i].imgBig,
					frv: (LOGIN._frv()!='')
				});
				var NG = {
					idFoto: GA[i].idFoto,
					Dida: GA[i].Dida
				}
				GA[i] = NG;
			}
			delete(GA[i].imported);
		}
		
		
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".foto"), IMPORTER.COMPR(DB.foto)).then(function(){
			JSNPUSH={	"idProcedura": document.formMod.idProcedura.value*1,
						"idLinguaProcedura": document.formMod.idLinguaProcedura.value*1,
						"NomeProcedura": document.formMod.NomeProcedura.value,
						"gallery": JSON.stringify(GA),
						"dettagliProcedura": SET.dettagliProvvisori,
						"DataModifica": parseInt(DataModifica),
						"DataCreazione": parseInt(DataCreazione),
						"app": globals.set.siglaProc,
						"Condiviso": document.formMod.Condiviso.value*1,
						"Cancellato": 0,
						"frv": (LOGIN._frv()!='') };
						
			if(document.formMod.idProc.value*1>-1){
				DB.procedure.data[document.formMod.idProc.value*1]=JSNPUSH;
				Q_idProc=document.formMod.idProc.value*1;
			}else{
				DB.procedure.data.push(JSNPUSH);
				for(let k in DB.procedure.data){
					if(DB.procedure.data[k].DataCreazione==DataModifica)Q_idProc=k;
				}
			}
			endChangeDetection()
			SCHEDA.formModificato = false;
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure)).then(function(){
				// salvo il DB
				LOGIN.sincronizza(	'startAnimate();' +
									'nasLoader();' +
									'SET.car_procedura('+Q_idProc+',1,0);' );
				
			});
		});
		return false;
	},
	el_procedura: function( Q_idProc ){ // elimina una procedura
		CONFIRM.vis(	TXT("VerElProc"),
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			
			stopAnimate(true);
			visLoader(TXT("SalvataggioInCorso"),'loadingLight');
			var DataModifica = DB.procedure.lastSync+1;
			DB.procedure.data[Q_idProc].DataModifica=parseInt(DataModifica);
			DB.procedure.data[Q_idProc].Cancellato=1;
			if(SET.tipoProc=='Tue')addT=1;
			else addT=0;
			SET.tipoProc='';
			/*applicaLoading(document.querySelector(".listaProcedure"));
			applicaLoading(document.getElementById("scheda_testo"));*/
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".procedure"), IMPORTER.COMPR(DB.procedure)).then(function(){ // salvo il DB
				LOGIN.sincronizza(	'startAnimate();' +
									'nasLoader();' +
									'SET.car_procedure(\''+addT+'\',1)'	);
				SCHEDA.scaricaScheda();
			});
		}});
	},
	modNumPunti: function(frm,n){
		var mr=eval("document."+frm+".mr_"+n);
		var punto=eval("document."+frm+".pt_"+n);
		var maxL=punto.options.length;
		for(a=maxL;a>=0;a--){
			punto.options[a]=null;
		}
		var mrProc=new Array();
		for(let k in DB.set.meridiani){
			mrProc[k]=DB.set.meridiani[k].tsubo.length;
		}
		for(a=mrProc[mr.value];a>=1;a--){
			punto.options[a]=new Option('',encodeURIComponent(a),false,false);
			punto.options[a].innerHTML=a;
		}
		punto.options[0]=null;
		if(mr.options[0].value=='')mr.options[0]=null;
		document.getElementById("ico_vis"+n).style.display="inline";
	},
	annullaProc: function(){ // annulla le modifiche alla procedura
		if(document.formMod.idProc.value.trim()*1>-1)SET.car_procedura(document.formMod.idProc.value.trim(),1,0,SCHEDA.btnSel);
		else SCHEDA.scaricaScheda();
	},
	verFormProc: function(){
		if(document.formMod.az.value=='')return false;
		else return true;
	},
	aggiungiGruppoProcedura: function( punti ){ // importa un gruppo di punti
		var pP=punti.split("|");			
		for(let p=0;p<pP.length-1;p++)SET.aggiungiDettaglio(PAZIENTI.tipoGruppo,pP[p],0);
		PAZIENTI.evidenziaAggiunti(document.getElementById('dettagliCont'),pP.length-1);
	},
	azRicercaProcedure: function( p, id=-1, comm=false ){ // apre la scheda della procedura dalla ricerca globale
		if(p == -1 && id > -1){
			for(let d in DB.procedure.data){
				if(id*1 == DB.procedure.data[d].idProcedura)p = d;
			}
		}
		if(comm){
			SET.idProcCommProvv = id;
		}else{
			SET.car_procedura( p,false,comm,document.getElementById('btn_procedura_'+p) );
		}
		SCHEDA.selElenco('procedure');
		if(comm)SET.caricaCommunity();
		//evidenziaParola();
		RICERCHE.nascondiGlobal();
		if(!comm){
			SCHEDA.individuaElemento( "btn_procedura_"+p, "listaProcedure" );
		}
	},
	
	// DETTAGLI
	caricaDettagli: function( eviUltimo ){ // carica i dettagli della procedura
		var HTML = '<div class="rgProcMod"></div>'; // serve lasciarlo per il drag&drop
		var presente = false;
		var nD = -1;
		var txareas = ''; // per il resize su tochable
		var OrdineDettaglio = -1
		var tsuboProvvisoriProc = [];
		var meridianiProvvisoriProc = [];
		
		if(globals.set.siglaProc=='AUR'){
			var puntiElenco = [];
			for(let siglaTsubo in DB.set.punti){
				if(__(DB.set.punti[siglaTsubo])){
					puntiElenco.push({
						siglaTsubo: siglaTsubo,
						NomeTsubo: DB.set.punti[siglaTsubo].NomeTsubo
					});
				}
			}
			puntiElenco.sort(sort_by("NomeTsubo", false));
		}
		
		for(let p in SET.dettagliProvvisori){
			var DT = SET.dettagliProvvisori[p];
			OrdineDettaglio++;
			if(!DT.Cancellato){
				TipoDettaglio=DT.TipoDettaglio;
				DescrizioneDettaglio=DT.DescrizioneDettaglio;
				nD++;
				
				HTML += '<div id="rg'+p+'"' +
						'	  class="rgProcMod' +
						((TipoDettaglio=='P') ? ' dettPunto': '') +
						((TipoDettaglio=='M') ? ' dettMeridiano': '') +
						((TipoDettaglio=='A') ? ' dettPunto': '') +
						'"';
				if(mouseDetect && TipoDettaglio=='P'){
					HTML += 
						'	  onMouseOver="SET.overTsubo(this,true);"'+
						'	  onMouseOut="SET.overTsubo(this,false);"';
				}
				if(mouseDetect && TipoDettaglio=='A' && DescrizioneDettaglio){
					HTML += 
						'	  onMouseOver="SET.overTsubo(\'_PT'+DescrizioneDettaglio+'\',true);"'+
						'	  onMouseOut="SET.overTsubo(\'_PT'+DescrizioneDettaglio+'\',false);"';
				}
				if(mouseDetect && TipoDettaglio=='M'){
					HTML += 
						'	  onMouseOver="SET.eviMeridiano(document.getElementById(\'mr_'+p+'\').value,true);"'+
						'	  onMouseOut="SET.eviMeridiano(document.getElementById(\'mr_'+p+'\').value,false);"';
				}
				HTML += '><div class="grabElement'+((TipoDettaglio=='T' || TipoDettaglio=='D') ? ' rgLabel' : '')+'"' +
						'	   data-drag-class="lbProc"' +
						'	   data-drag-family="proc"' +
						'	   data-drag-type="move">' +
				
						'	<div class="grabBtn"' +
						'	     onMouseDown="DRAGGER.startDrag(this.parentElement,\'SET.spostaDettaglio\');"' +
						'	     onTouchStart="DRAGGER.startDrag(this.parentElement,\'SET.spostaDettaglio\');"></div>';
				
				// pulsantini gestione dettagli
				HTML += '	<div class="delProcDett"' +
						'	     onClick="SET.eliminaDettaglio(\''+p+'\');"' +
						'	     title="'+TXT("DelDett")+'">' +
						'	</div>';
				if(TipoDettaglio=='T' || TipoDettaglio=='D')
				HTML += '	<i>' +
							(TipoDettaglio=='T' ? TXT("Titolo") : '') +
							(TipoDettaglio=='D' ? TXT("Descrizione") : '') +
						'	</i>';
						
				HTML += '	<input type="hidden"' +
						'		   id="or_'+p+'"' +
						'		   name="or_'+p+'"' +
						'		   value="'+OrdineDettaglio+'" />';
						
				HTML += '	<input type="hidden"' +
						'		   id="ti_'+p+'"' +
						'		   name="ti_'+p+'"' +
						'		   value="'+TipoDettaglio+'" />';
				
				
				
				if(TipoDettaglio=='P' || TipoDettaglio=='A'){	
				
					var nTsubo='';
					var siglaMeridiano='';
					var siglaTsubo='';
					var mezzo='';
					if(DescrizioneDettaglio){
						if(DescrizioneDettaglio.indexOf(".")>-1){
							pP=DescrizioneDettaglio.split(".");
							if(TipoDettaglio=='P'){
								nTsubo=pP[0]*1;
								siglaMeridiano=pP[1];
								siglaTsubo=__(pP[2]);
								mezzo=__(pP[3]);
							}
							if(TipoDettaglio=='A'){
								siglaTsubo=pP[0];
								mezzo=__(pP[1]);
							}
						}else{
							if(TipoDettaglio=='P')nTsubo=DescrizioneDettaglio;
							if(TipoDettaglio=='A')siglaTsubo=DescrizioneDettaglio;
						}
					}
					
					
					// mezzo
					var addMezzoTit = '';
					if(mezzo)addMezzoTit = ': '+PAZIENTI.mezzi[mezzo];
					HTML += '	<span id="ico_PZ'+p+'"' +
							'	      class="mezzoPunto"' +
							'	      onClick="PAZIENTI.selMezzo('+p+',\''+TipoDettaglio+'\',true);">' +
							'		<img src="img/mezzo_'+mezzo+'.png"' +
							'	  	     width="20"' +
							'	  	     height="20"' +
							'	  	     align="absmiddle"' +
							'	  	     title="'+htmlEntities(TXT("PZDett"))+'"'+
							'	  	     class="occhio valEn"> ' +
							'	</span>';
				}
				
						
				// dettagli
				if(TipoDettaglio=='T')
					HTML += 
						'	<input type="text"' +
						'		   class="dettProcText"' +
						'		   id="de_'+p+'"' +
						'		   name="de_'+p+'"' +
						'		   onKeyUp="SET.aggiornaDettaglio(this);"' +
						'		   value="';
				
				if(TipoDettaglio=='D')
					HTML += 
						'	<textarea id="de_'+p+'"' +
						'		 	  name="de_'+p+'"' +
						'			  onKeyUp="SET.aggiornaDettaglio(this);">';
						txareas+=p+'|';
						
				if(TipoDettaglio=='T' || TipoDettaglio=='D')
					HTML += htmlEntities(DescrizioneDettaglio);
					
				if(TipoDettaglio=='P'){
					tsuboProvvisoriProc.push( DescrizioneDettaglio );
					if(typeof(DB.set.meridiani[siglaMeridiano])=='undefined'){
						var siglaTsubo = __(siglaTsubo, nTsubo+"."+siglaMeridiano);
						HTML += '<span class="ptNo">'+siglaTsubo+'</span>';
					}else{
						HTML += 
							'	<select name="mr_'+p+'"' +
							'		    id="mr_'+p+'"' +
							'		    onChange="this.blur();SET.modNumPunti(\'formMod\','+p+');' +
							'		    		  SET.ritOverTsubo(\'dettagliCont\','+p+');" class="selectTratt">';
						
						var totPunti=0;
						if(siglaMeridiano=='')HTML +=
							'		<option value="">- '+TXT("ScegliMeridiano")+' -</option>';
							
						for(let k in DB.set.meridiani){
							
							// verifico le autorizzazioni
							if(SET.verFreeMeridiani(k)){
								HTML += 
								'		<option value="'+k+'"';
								if(siglaMeridiano==k){
									HTML += ' SELECTED';
									totPunti=DB.set.meridiani[k].tsubo.length;
								}
								HTML += '>'+SET.convSigla(k);
								if(WF()>=509)HTML += ' &nbsp; ('+DB.set.meridiani[k].NomeMeridiano+')';
								HTML += '</option>';
							}
							// --------------------------
						}
						HTML += '	</select>';
						HTML += '	<select class="numPoints"' +
								' 			name="pt_'+p+'"' +
								' 			id="pt_'+p+'"' +
								' 			onChange="SET.ritOverTsubo(\'dettagliCont\','+p+');this.blur();">';
						
						for(let n=1;n<=totPunti;n++){
							var siglaTsubo = n;
							if(__(DB.set.meridiani[siglaMeridiano].tsubo[n-1].siglaTsubo)){
								siglaTsubo = __(DB.set.meridiani[siglaMeridiano].tsubo[n-1].siglaTsubo);
								siglaTsubo = siglaTsubo.substr(3,siglaTsubo.length-3);
							}
							HTML += '	<option value="'+n+'"';
							if(nTsubo==n)HTML += ' SELECTED';
							HTML += '>'+siglaTsubo+'</option>';
						}
						HTML += '	</select>';
						HTML += '	<img src="img/ico_vedi.png"' +
								' 		 width="16"' +
								' 		 height="16"' +
								' 		 align="absmiddle"' +
								' 		 id="ico_vis'+p+'"' +
								' 		 style="' + ((siglaMeridiano=='') ? 'display:none;':'') +
								'				margin-left:10px;' +
								'				cursor:pointer;' +
								'				margin-top: -5px;""' +
								' 		 class="occhio"' +
								' 		 title="'+TXT("VisualizzaPunto")+'"' +
								' 		 onClick="SET.selTsuboMod('+p+')">'; // ???????
					}
				}
				
				if(TipoDettaglio=='M'){
					meridianiProvvisoriProc.push( DescrizioneDettaglio );
					HTML += 
						'	<select name="mr_'+p+'"' +
						'		    id="mr_'+p+'"' +
						'			class="selectTratt"' +
						'		    onChange="SET.aggiornaDettaglio(this);"' +
						'			onClick="SET.eviMeridiano(this.value,false);">';
					
					var totPunti=0;
						
					for(let k in DB.set.meridiani){
						// verifico le autorizzazioni
						if(SET.verFreeMeridiani(k)){
							if(k!='EX'){
								HTML += 
								'		<option value="'+k+'"';
								if(DescrizioneDettaglio==k){
									HTML += ' SELECTED';
									totPunti=DB.set.meridiani[k].tsubo.length;
								}
								HTML += '>'+SET.convSigla(k);
								if(WF()>=509)HTML += ' &nbsp; ('+DB.set.meridiani[k].NomeMeridiano+')';
								HTML += '</option>';
							}
						}
						// --------------------------
					}
					HTML += '	</select>';
				}
				if(TipoDettaglio=='A'){
					tsuboProvvisoriProc.push( DescrizioneDettaglio );
					HTML += '	<select class="numPoints"' +
							' 			name="pt_'+p+'"' +
							' 			id="pt_'+p+'"' +
							' 			onChange="SET.ritOverTsubo(\'dettagliCont\','+p+');this.blur();"><option></option>';
					
					for(a=0;a<puntiElenco.length;a++){
						// verifico le autorizzazioni
						if(SET.verFreePunti(puntiElenco[a].siglaTsubo)){
							HTML += '	<option value="'+puntiElenco[a].siglaTsubo+'"';
							if(siglaTsubo==puntiElenco[a].siglaTsubo)HTML += ' SELECTED';
							HTML += '>'+puntiElenco[a].NomeTsubo+'</option>';
						}
						// --------------------------
					}
					HTML += '	</select>' +
							'	<img src="img/ico_vedi.png"' +
							' 		 width="16"' +
							' 		 height="16"' +
							' 		 align="absmiddle"' +
							' 		 id="ico_vis'+p+'"' +
							' 		 style="margin-left:5px;' +
							'				cursor:pointer;' +
							'				margin-top: -5px;""' +
							' 		 class="occhio"' +
							' 		 title="'+TXT("VisualizzaPunto")+'"' +
							' 		 onClick="SET.selTsuboMod(document.getElementById(\'pt_'+p+'\').value,'+p+')">'; 
				}
				
				if(TipoDettaglio=='T')HTML += '">';
				if(TipoDettaglio=='D')HTML += '</textarea>';
				HTML +='</div></div>';
				presente=true;
			}
		}
		if(!presente)HTML += '<div class="noResults" style="height:50px;">'+TXT("NoRes")+'...</div>';
		document.getElementById("dettagliCont").innerHTML=HTML;
		try{
			SET.evidenziaTsuboMod( tsuboProvvisoriProc );
			if(!globals.set.siglaProc)ET.evidenziaMeridianiMod( meridianiProvvisoriProc );
		}catch(err){}
		if(eviUltimo){
			if(TipoDettaglio=='P')eval("document.formMod.mr_"+p+".focus()");
			else if(TipoDettaglio=='A')eval("document.formMod.pt_"+p+".focus()");
			else if(TipoDettaglio!='M')eval("document.formMod.de_"+p+".focus()");
		}
	},
	aggiungiDettaglio: function( t, c='', u=1 ){ // aggiunge un dettaglio vuoto alla proceura
		PAZIENTI.mezzoProvvisorio
		SET.topAdd = tCoord(document.getElementById("p_add_dett"),'y');
		//SET.salvaDettagli();
		var maxOrd=0;
		var DataModifica = DB.procedure.lastSync+1;
		for(let p in SET.dettagliProvvisori){
			if(SET.dettagliProvvisori[p].OrdineDettaglio>maxOrd)maxOrd=SET.dettagliProvvisori[p].OrdineDettaglio;
		}
		JSNPUSH={ 	"TipoDettaglio": t,
					"DescrizioneDettaglio": c,
					"DataModifica": DataModifica,
					"OrdineDettaglio": maxOrd+1,
					"Cancellato": 0,
					"frv": (LOGIN._frv()!='') };
		SET.dettagliProvvisori.push(JSNPUSH);
		SET.caricaDettagli(u);
		SCHEDA.formModificato = true;
		if(SET.topAdd)document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+(tCoord(document.getElementById("p_add_dett"),'y')-SET.topAdd));
		SET.topAdd = null;
	},
	eliminaDettaglio: function( n ){ // elimina un dettaglio dalla procedura
		SET.dettagliProvvisori[n].Cancellato=1;
		o=0;
		for(let p in SET.dettagliProvvisori){
			SET.dettagliProvvisori[p].OrdineDettaglio=o;
			o++;
		}
		SET.caricaDettagli();
		SCHEDA.formModificato = true;
	},
	spostaDettaglio: function( elMove, elTarget ){
		if(	!elTarget ||
			elMove.parentElement==elTarget)return;
		var fromIndex = parseInt(elMove.parentElement.id.split("rg")[1]);
		var toIndex = parseInt(elTarget.id.split("rg")[1]);
		var arr2 = SET.dettagliProvvisori.splice(fromIndex, 1)[0];
		SET.dettagliProvvisori.splice(toIndex,0,arr2);
		for(let d in SET.dettagliProvvisori){
			SET.dettagliProvvisori[d].OrdineDettaglio = d;
		}
		SET.caricaDettagli();
		SCHEDA.formModificato = true;
	},
	aggiornaDettaglio: function( el ){
		var pId = el.id.split("_");
		var n = pId[1];
		var DP = SET.dettagliProvvisori[n].DescrizioneDettaglio.split(".");
		var val = el.value;
			if(document.getElementById("pt_"+n)){
			if(!globals.set.siglaProc){
				var mer = document.getElementById("mr_"+n).value;
				var nTsubo = document.getElementById("pt_"+n).value;
				if(nTsubo.length == 1)nTsubo='0'+nTsubo;
				val = nTsubo+"."+mer;
				var sg = val.replace(/\./g,"-");
				if(__(DB.set.meridiani[mer].tsubo[nTsubo*1-1].siglaTsubo)){
					sg = __(DB.set.meridiani[mer].tsubo[nTsubo*1-1].siglaTsubo);
				}
				val += "."+sg+"."+__(DP[2])+"."+__(DP[3]);
			}
			if(globals.set.siglaProc=='AUR'){
				val = document.getElementById("pt_"+n).value+"."+__(DP[1]);
			}
		}
		SET.dettagliProvvisori[parseInt(pId[1])].DescrizioneDettaglio = val;
		SCHEDA.formModificato = true;
	},
	
	// COMMUNITY
	swNotificabile: function( idProcedura ){
		if(CONN.retNoConn()){
			var JSNPOST={	"idProcedura": idProcedura*1 };
			
			CONN.caricaUrl(	"community_swnot_commenti.php",
							"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
							"SET.setNotificabile");
		}
	},
	setNotificabile: function( notificabile ){
		if(notificabile != '404' && typeof(notificabile)!='undefined'){
			var elNot = document.getElementById("notificaCommenti");
			if(notificabile*1){
				elNot.innerHTML = htmlEntities(TXT("DisattivaNotificheProcedura"));
				elNot.classList.remove("notificheDisattivate");
			}else{
				elNot.innerHTML = htmlEntities(TXT("AttivaNotificheProcedura"));
				elNot.classList.add("notificheDisattivate");
			}	
		}
	},
	car_commenti: function( idProcedura ){
		if(CONN.getConn()){
			var JSNPOST={	"idProcedura": idProcedura*1 };
			
			CONN.caricaUrl(	"community_proc_commenti.php",
							"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
						"SET.scrivi_commenti");
		}else{
			document.getElementById("contCommenti").style.display='none';
		}
	},
	scrivi_commento: function( el, reply=false ){
		var HTML = 
			'<div class="commRG';
		if(reply)HTML += ' commReply'
		HTML +=	
			'" id="comm_'+el.idCommento+'">' +
			'	<div class="commSX">' +
			'	<span class="commAvatar';
		/*if(el.avatar){// && CONN.getConn()){
			HTML += '" style="background-image:url(\'' + el.avatar+'\');';*/
			
		var dt = new Date().getTime();
		if(CONN.getConn()){
			HTML += '" style="background-image:url(' + CONN.APIfolder+'getAvatarMini.php?idU='+el.idUtente+'&t='+dt+');';
		}else HTML += ' commNoAvatar"';
		HTML +=
			'"></span>' +
			'		<b>'+el.Pseudonimo+'</b>' +
			'		<span>'+getDataTS(el.DataCommento)+' ' +
							getOraTS(el.DataCommento)+'</span>' +
			'	</div>' +
			'	<div class="commDX"' +
			'		 id="TestoCommento_'+el.idCommento+'">' +
					el.TestoCommento +
			'	</div>' +
			'	<div id="placeholderCommento_'+el.idCommento+'"' +
			'		 class="placeholderCommento"></div>' +
			'	<div class="l"></div>';
			
		HTML_btns = '';
			
		if(!reply)HTML_btns +=
			'		<span onClick="SET.attivaCommento( '+el.idProcedura+', '+el.idCommento+', 1 );">' +
						htmlEntities(TXT("Rispondi")) +
			'		</span>';
		if(el.idUtente == DB.login.data.idUtente){
			HTML_btns +=
			'		<span onClick="SET.attivaCommento( '+el.idProcedura+', '+el.idCommento+' );">' +
						htmlEntities(TXT("Modifica")) +
			'		</span>' +
			'		<span onClick="SET.el_commento('+el.idCommento+');">' +
						htmlEntities(TXT("Elimina")) +
			'		</span>';
		}
		
		if(HTML_btns)HTML += '<div class="commTL">' + HTML_btns + '</div>';
			
		if(el.risposte){
			if(el.risposte.length){
				HTML += '<div class="commRS">'+htmlEntities(TXT("Risposte"))+':</div>';
				for(let c in el.risposte){
					HTML += SET.scrivi_commento(el.risposte[c],true);
				}
			}
		}
			
		HTML +=	
			'</div>';
		return HTML;
	},
	scrivi_commenti: function( txt ){
		if(txt=='vuota' || txt.substr(0,3)=='404' || typeof(txt)=='undefined')txt = '{"commenti":[]}';
		txt = JSON.parse(txt);
		var commentiProcedura = txt.commenti;
		var elNot = document.getElementById("notificaCommenti");
		SET.setNotificabile(txt.notificabile);
		var presente=false;
		var HTML = '';
		commentiProcedura.sort(sort_by("DataCommento", true, parseInt));
		var totComm = commentiProcedura.length;
		for(let p in commentiProcedura){
			HTML += SET.scrivi_commento(commentiProcedura[p]);
			if(commentiProcedura[p].risposte)totComm += commentiProcedura[p].risposte.length;
			presente=true;
		}
		if(!presente){
			HTML += 
			'<div class="noResults" style="height:100px;">'+TXT("NoComm")+'...</div>';
		}
		if(document.getElementById("commenti")){
			document.getElementById("commenti").innerHTML = HTML;
			document.getElementById("numeroCommenti").innerHTML = totComm;
		}
	},
	ins_commento: function( idProcedura, idCommento=0, reply=0 ){ // inserisce un commento ad una procedura condivisa
		//retNoFree();
		if(CONN.retNoConn() && LOGIN.logedin() && verifica_form(document.formCommenti)){
			var JSNPOST={	"idProcedura": document.formCommenti.idProcedura.value*1,
							"idCommento": document.formCommenti.idCommento.value*1,
							"reply": document.formCommenti.reply.value*1,
							"TestoCommento": addslashes(document.formCommenti.TestoCommento.value) };
			console.log(JSNPOST)
			applicaLoading(document.getElementById("scheda_testo"));
			CONN.caricaUrl(	"community_ins_comm.php",
							"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
							'rimuoviLoading(document.getElementById("scheda_testo"));' +
							'SET.confermaCommentiProcedure');
			return false;
		}
	},
	confermaCommentiProcedure: function( txt ){
		elenco=JSON.parse(txt);
		if(elenco.err=='1'){
			ALERT(TXT("ErrorePseudonimo"));
		}
		SET.disattivaCommento();
		SET.commSel = '';
		SET.car_commenti(elenco.idProcedura);
	},
	el_commento: function( idCommento ){
		CONFIRM.vis(	TXT("ChiediEliminaCommento"),
						false, 
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			if(CONN.getConn()){
				var JSNPOST={	"idCommento": idCommento*1 };
				
				CONN.caricaUrl(	"community_proc_commenti_el.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								"SET.resEl_commento");
			}						
		}});
	},
	resEl_commento: function(txt){
		if(txt=='404'){
			
		}else{
			console.log(txt)
			var res = JSON.parse(txt);
			document.getElementById("comm_"+res.idCommento).remove();	
		}
	},
	attivaCommento: function( idProcedura, idCommento='', reply=0 ){
		SET.disattivaCommento();
		var TIT = TXT("AddCommento");
		var classCommento = '';
		if(idCommento){
			if(reply){
				TIT = TXT("ReplyCommento");
				classCommento = 'replyCommento';
			}else{
				TIT = TXT("ModCommento");
				classCommento = 'modCommento';
			}
		}
		var HTML =
			'<form id="formCommenti"' +
			'      class="'+classCommento+'"' +
			'      name="formCommenti"' +
			'      method="post"' +
			'      onSubmit="return false;">' +
			'	<h2>' +
					htmlEntities(TIT) +
			'	</h2>' +
			'	<input name="idProcedura"' +
			'	       type="hidden"' +
			'	       id="idProcedura"' +
			'	       value="'+idProcedura+'" />' +
			'	<input name="idCommento"' +
			'	       type="hidden"' +
			'	       id="idCommento"' +
			'	       value="'+idCommento+'" />' +
			'	<input name="reply"' +
			'	       type="hidden"' +
			'	       id="reply"' +
			'	       value="'+reply+'" />' +
			'	<textarea id="@|'+TXT("TestoMessaggio")+'|1|0"' +
			'	          name="TestoCommento">';
			if(idCommento && !reply)HTML += htmlEntities(document.getElementById("TestoCommento_"+idCommento).innerText.trim());
		HTML +=
			'</textarea>' + // non mettere i tab prima
			
			'	<div id="pulsantiProcedura">' +
			'		<div id="p_sch_salva"' +
			'	         onClick="SET.ins_commento();">' +
					TXT("Invia") +
			'		</div>' +
			'		<div id="p_sch_annulla"' +
			'	         onClick="SET.disattivaCommento();">' +
						TXT("Annulla") +
			'		</div>' +
			'	</div>' +
			'	<div class="l"></div>' +
			'</form>';
		SET.commSel = idCommento;
		if(!idCommento){
			document.getElementById("placeholderCommento").innerHTML = HTML;
			document.getElementById("p_add_comm").style.display='none';
		}else{
			document.getElementById("placeholderCommento_"+idCommento).innerHTML = HTML;
		}
	},
	disattivaCommento: function(){
		if(SET.commSel){
			if(document.getElementById("placeholderCommento_"+SET.commSel)){
				document.getElementById("placeholderCommento_"+SET.commSel).innerHTML = '';
			}
		}else{
			document.getElementById("placeholderCommento").innerHTML = '';
			document.getElementById("p_add_comm").style.display='block';
		}
	},
	confermaProceduraCommunity: function( txt ){
		var err=false;
		var record_tot=0;
		if(txt.substr(0,3)!='404'){
			//console.log(txt)
			elenco='';
			if(txt!='vuoto')elenco=JSON.parse(txt);
			else elenco=[];
			SET.community_elenco[SET.idProcCommOp].dettagliProcedura=elenco.dettagli;
			SET.community_elenco[SET.idProcCommOp].commentiProcedura=elenco.commenti;
		}
		SET.car_procedura(	SET.community_elenco[SET.idProcCommOp].idProcedura,
							false,
							true,
							SET.elProcCommOp);
	},
	caricaCommunity: function(){ // carica l'elenco delle procedure
		if(CONN.getConn())applicaLoading(document.querySelector(".listaProcedure"));
		SET.idProcCommOp=-1;
		SET.elProcCommOp=null;
		//retNoFree();
		CONN.retNoConn();
						
		var JSNPOST={	"idLinguaRic": 1,
						"parolaRic": "",
						"parolaRicCrypt": "",
						"prefRic": "",
						"app": globals.set.siglaProc,
						"record": 0 };
						
		if(document.formRicProc){
			var JSNPOST={	"idLinguaRic": document.formRicProc.idLinguaRic.value*1,
							"parolaRic": document.formRicProc.parolaRic.value,
							"parolaRicCrypt": document.formRicProc.parolaRic.value,
							"prefRic": document.formRicProc.prefRic.value,
							"app": globals.set.siglaProc,
							"record": document.formRicProc.record.value*1 };
		}			
						

		CONN.caricaUrl(	"community_elenco.php",
						"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
						"SET.confermaCommunity");
		return false;
	},
	caricaProceduraCommunity: function( Q_idProc, k, el ){ // carica una procedura condivisa per la visualizzazione
		//retNoFree();
		if(!LOGIN.logedin()){
			ALERT(TXT("ErroreUtenteNonConnesso"), true);
			return;
		}
		CONN.retNoConn();
		SET.idProcCommOp=k;
		SET.elProcCommOp=el;
		//loadingScheda('Procedura');
		var JSNPOST={	"idProcedura": Q_idProc*1 };
		
		CONN.caricaUrl(	"community_proc.php",
						"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
						"SET.confermaProceduraCommunity");
		return false;
	},
	confermaCommunity: function( txt ){
		var err=false;
		var record_tot=0;
		var presente=false;
		var kRic = -1;
		if(txt.substr(0,3)!='404'){
			if(txt=='vuoto')SET.community_elenco=[];
			else{
				if(debug)console.log(txt)
				elenco=JSON.parse(txt);
				record_tot=elenco.record_tot;
				record_vis=elenco.record_vis;
				record=elenco.record;
				SET.community_elenco=elenco.dati;
				var HTML='';
				
				var pagine_tot=parseInt(record_tot/record_vis);
				if(record_tot/record_vis>pagine_tot)pagine_tot++;
				var pagina_attuale=parseInt(record/record_vis);
	
				if(record_tot>0){	
				
					if(pagine_tot>1 && record>0)
						HTML += '<span class="frPrec"' +
								'     onClick="document.formRicProc.record.value=\''+(record-record_vis)+'\';' +
								'	     	   SET.caricaCommunity();"></span>';
					
					for(let k in SET.community_elenco){
						idProcedura=SET.community_elenco[k].idProcedura*1;
						Condiviso=SET.community_elenco[k].Condiviso*1;
						NomeProcedura=SET.community_elenco[k].NomeProcedura;
						DataCreazione=SET.community_elenco[k].DataCreazione*1;
						Preferito=SET.community_elenco[k].Preferito*1;
						visto=SET.community_elenco[k].visto*1;
						Pseudonimo=SET.community_elenco[k].Pseudonimo;
						Condiviso=1;
						HTML += '<div class="base cnmty';
						if(Preferito!=0)HTML+=' procPref';
						if(!visto)HTML+='New';
						HTML += '" 	  id="procComm'+idProcedura+'"' +
								' 	  onClick="SET.caricaProceduraCommunity('+idProcedura+','+k+',this);">' +
									htmlEntities(NomeProcedura)+'<br>' +
								'	<span>'+Pseudonimo+' ('+getDataTS(DataCreazione)+')</span>' +
								'</div>';
						if(	SET.idProcCommProvv > -1 &&
							SET.idProcCommProvv==idProcedura){ // se arrivo dalle ricerche
							kRic = k;
						}
					}
					if(pagine_tot>1 && record+record_vis<record_tot)
						HTML += '<span class="frSucc"' +
								'     onClick="document.formRicProc.record.value=\''+(record+record_vis)+'\';' +
								'     		   SET.caricaCommunity();">' +
								'</span>';
					HTML += '<span class="lastComm"></span>';
					
					presente=true;
				}
			}
			if(!presente)HTML = '<div class="noResults">'+TXT("NoResProcedure")+'...</div>';
			HTML = '<div class="lista listaProcedure">'+HTML+'</div>';
		
			var HTML_pre =	SET.intestazioneProcedure(false) +
							'<div id="filtroCond">';
			HTML_pre += 	'	<div id="p_swRicComm"' +
							'		 onClick="document.getElementById(\'filtroCond\').classList.toggle(\'vis\');">' +
							'		<img src="img/chMenu.png"' +
							'			 width="30"' +
							'			 id="chiudiRicComm">' +
							'	</div>';
			HTML_pre += 	'	<form name="formRicProc"' +
							'		  method="post"' +
							'		  onSubmit="return SET.setRicComm();">' +
							'		<input name="parolaRic"' +
							'		  	   type="text"' +
							'		  	   id="parolaRic"'+H.noAutoGen+'>' +
							'		<div id="prefFiltroCond"' +
							'		  	 onClick="SET.swRicPref();"' +
							'		  	 title="'+TXT("FiltroPreferiti")+'">' +
							'		</div>' +
							'		<div id="lingueFiltroCond"' +
							'		  	 title="'+TXT("FiltroLingue")+'">' +
							'			<select name="idLinguaRic"' +
							'		  	 	    id="idLinguaRic"' +
							'		  	 	    onChange="SET.verLinguaRic();">' +
							'		  		<option></option>';
			for(let p in DB.lingueProcedure){
				HTML_pre += '				<option value="'+p+'">'+DB.lingueProcedure[p]+'</option>';
			}
			HTML_pre += 	'			</select>' +
							'		</div>' +
							'		<input type="hidden"' +
							'			   name="ric"' +
							'			   id="ric"' +
							'			   value="1">' +
							'		<input type="hidden"' +
							'			   name="prefRic"' +
							'			   id="prefRic"' +
							'			   value="">' +
							'		<input type="hidden"' +
							'			   name="record"' +
							'			   id="record"' +
							'			   value="">' +
							'		<div id="p_elRicProc"' +
							'			 onClick="SET.elRicProc();">' +
							'		</div>' +
							'	</form>' +
							'</div>';
							
			HTML = HTML_pre + HTML;
			
			document.getElementById("lista_procedure").innerHTML=HTML;
			
			
			vElProc=parent.document.getElementById("eviProc");
			document.getElementById("filtroCond").style.display='block';
			if(document.formRicProc.parolaRic.value || document.formRicProc.prefRic.value || document.formRicProc.idLinguaRic.selectedIndex>0){
				document.getElementById("p_elRicProc").style.display='inline';
				document.getElementById("parolaRic").className='ricProcAtt';
			}else{
				document.getElementById("p_elRicProc").style.display='none';
				document.getElementById("parolaRic").className='';
			}
			document.formRicProc.record.value='';
			
			
			SET.writeRicComm();

		}else err=true;
		if(err){
			rimuoviLoading(document.querySelector(".listaProcedure"));
			if(LOGIN.logedin()){
				ALERT(TXT("ProcedureErrore"));
			}else{
				ALERT(TXT("ErroreUtenteNonConnesso"), true);
			}
		}
		if(SET.idProcCommProvv > -1){ // per le ricerche dalle notifiche, carico la procedura
			console.log(SET.idProcCommProvv)
			console.log(kRic)
			SET.caricaProceduraCommunity( SET.idProcCommProvv, kRic, document.getElementById("procComm"+SET.idProcCommProvv) );
			//SET.idProcCommProvv = -1;
		}
	},
	swRicPref: function(){
		if(document.formRicProc.prefRic.value!='1'){
			document.formRicProc.prefRic.value='1';
			document.getElementById("prefFiltroCond").className='okPref';
		}else{
			document.formRicProc.prefRic.value='';
			document.getElementById("prefFiltroCond").className='';
		}
		SET.setRicComm();
	},
	verLinguaRic: function(){
		if(document.formRicProc.idLinguaRic.selectedIndex>0){
			document.getElementById("lingueFiltroCond").className='okLing';
		}else{
			document.getElementById("lingueFiltroCond").className='';
		}
		document.formRicProc.idLinguaRic.blur();
		SET.setRicComm();
	},
	setRicComm: function(){
		document.getElementById("filtroCond").classList.remove("vis");
		SET.ricComm	= {
			parolaRic: document.getElementById("parolaRic").value,
			idLinguaRic: document.formRicProc.idLinguaRic.selectedIndex,
			prefRic: document.formRicProc.prefRic.value!='1'?"0":"1"
		}
		applicaLoading(document.querySelector(".listaProcedure"));
		SET.caricaCommunity();
		return false;
	},
	writeRicComm: function(){
		document.getElementById("parolaRic").value = SET.ricComm.parolaRic;
		document.formRicProc.idLinguaRic.selectedIndex = SET.ricComm.idLinguaRic;
		document.formRicProc.prefRic.value = SET.ricComm.prefRic;
		
		if(document.formRicProc.prefRic.value=='1')document.getElementById("prefFiltroCond").className='okPref';
		else document.getElementById("prefFiltroCond").className='';
		
		if(document.formRicProc.idLinguaRic.selectedIndex>0)document.getElementById("lingueFiltroCond").className='okLing';
		else document.getElementById("lingueFiltroCond").className='';
	}
}