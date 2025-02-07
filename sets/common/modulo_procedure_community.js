
var MODULO_PROCEDURE_COMMUNITY = { // extend SET
	
	swNotificabile: function( idProcedura ){
		if(CONN.retNoConn()){
			let JSNPOST={	"idProcedura": idProcedura*1 };
			
			CONN.caricaUrl(	"community_swnot_commenti.php",
							"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
							"SET.setNotificabile");
		}
	},
	setNotificabile: function( notificabile ){
		if(notificabile != '404' && typeof(notificabile)!='undefined' && document.getElementById("notificaCommenti")){
			let elNot = document.getElementById("notificaCommenti");
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
			let JSNPOST={	"idProcedura": idProcedura*1 };
			
			CONN.caricaUrl(	"community_proc_commenti.php",
							"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
						"SET.scrivi_commenti");
		}else{
			document.getElementById("contCommenti").style.display='none';
		}
	},
	scrivi_commento: function( el, reply=false ){
		let HTML = 
			'<div class="commRG';
		if(reply)HTML += ' commReply'
		HTML +=	
			'" id="comm_'+el.idCommento+'">' +
			'	<div class="commSX">' +
			'	<span class="commAvatar';
		/*if(el.avatar){// && CONN.getConn()){
			HTML += '" style="background-image:url(\'' + el.avatar+'\');';*/
			
		let dt = new Date().getTime();
		if(CONN.getConn()){
			HTML += '" style="background-image:url(' + CONN.APIfilesFolder+'getAvatarMini.php?idU='+el.idUtente+'&t='+dt+');';
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
		let commentiProcedura = txt.commenti,
			elNot = document.getElementById("notificaCommenti"),
			presente=false,
			HTML = '',
			totComm = commentiProcedura.length;
		SET.setNotificabile(txt.notificabile);
		commentiProcedura.sort(sort_by("DataCommento", true, parseInt));
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
			let JSNPOST={	"idProcedura": document.formCommenti.idProcedura.value*1,
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
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			if(CONN.getConn()){
				let JSNPOST={	"idCommento": idCommento*1 };
				
				CONN.caricaUrl(	"community_proc_commenti_el.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								"SET.resEl_commento");
			}						
		}});
	},
	resEl_commento: function(txt){
		if(txt=='404'){
			
		}else{
			let res = JSON.parse(txt);
			document.getElementById("comm_"+res.idCommento).remove();	
		}
	},
	attivaCommento: function( idProcedura, idCommento='', reply=0 ){
		SET.disattivaCommento();
		let TIT = TXT("AddCommento"),
			classCommento = '';
		if(idCommento){
			if(reply){
				TIT = TXT("ReplyCommento");
				classCommento = 'replyCommento';
			}else{
				TIT = TXT("ModCommento");
				classCommento = 'modCommento';
			}
		}
		let HTML =
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
		/* let err=false,
			record_tot=0; */
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
		CONN.retRealNoConn().then(isOnline => {
			if(isOnline){
				/* if(CONN.getConn()) */applicaLoading(document.querySelector(".listaProcedure"));
				SET.idProcCommOp=-1;
				SET.elProcCommOp=null;
				//retNoFree();
				/* CONN.retNoConn(); */
								
				let JSNPOST={	"idLinguaRic": 1,
								"parolaRic": "",
								"parolaRicCrypt": "",
								"prefRic": "",
								"app": globals.set.siglaProc,
								"record": 0 };
								
				if(document.formRicProc){
					JSNPOST={	"idLinguaRic": document.formRicProc.idLinguaRic.value*1,
									"parolaRic": document.formRicProc.parolaRic.value,
									"parolaRicCrypt": document.formRicProc.parolaRic.value,
									"prefRic": document.formRicProc.prefRic.value,
									"app": globals.set.siglaProc,
									"record": document.formRicProc.record.value*1 };
				}			
								

				CONN.caricaUrl(	"community_elenco.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								"SET.confermaCommunity");
			}
		});
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
		let JSNPOST={	"idProcedura": Q_idProc*1 };
		
		CONN.caricaUrl(	"community_proc.php",
						"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
						"SET.confermaProceduraCommunity");
		return false;
	},
	confermaCommunity: function( txt ){
		let err=false,
			record_tot=0,
			record_vis=0,
			record=0,	
			presente=false,
			kRic = -1,
			HTML = '';
		if(txt.substr(0,3)!='404'){
			if(txt=='vuoto')SET.community_elenco=[];
			else{
				if(debug)console.log(txt)
				let elenco = JSON.parse(txt);
				record_tot = elenco.record_tot;
				record_vis = elenco.record_vis;
				record = elenco.record;
				SET.community_elenco=elenco.dati;
				HTML = '',
				pagine_tot = parseInt(record_tot/record_vis);
				if(record_tot/record_vis>pagine_tot)pagine_tot++;
				//let pagina_attuale=parseInt(record/record_vis);
	
				if(record_tot>0){	
				
					if(pagine_tot>1 && record>0)
						HTML += '<span class="frPrec"' +
								'     onClick="document.formRicProc.record.value=\''+(record-record_vis)+'\';' +
								'	     	   SET.caricaCommunity();"></span>';
					
					for(let k in SET.community_elenco){
						let idProcedura = SET.community_elenco[k].idProcedura*1,
							Condiviso = SET.community_elenco[k].Condiviso*1,
							NomeProcedura = SET.community_elenco[k].NomeProcedura,
							DataCreazione = SET.community_elenco[k].DataCreazione*1,
							Preferito = SET.community_elenco[k].Preferito*1,
							visto = SET.community_elenco[k].visto*1,
							Pseudonimo = SET.community_elenco[k].Pseudonimo;
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
					
					presente = true;
				}
			}
			if(!presente)HTML = '<div class="noResults">'+TXT("NoResProcedure")+'...</div>';
			HTML = '<div class="lista listaProcedure">'+HTML+'</div>';
		
			let HTML_pre =	SET.intestazioneProcedure(false) +
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
			
			document.getElementById("lista_procedure").innerHTML = HTML_pre + HTML;
			
			
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