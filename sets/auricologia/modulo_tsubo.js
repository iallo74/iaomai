
var MODULO_TSUBO = { // extend SET

	note: [],
	
	caricaTsubo: function( siglaTsubo, ritorno ){ //  carica la scheda del punto
		// verifico le autorizzazioni
		if(SET.PUNTI_free.indexOf(siglaTsubo)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(TXT("MsgContSoloPay"));
			SET.chiudiTsubo();
			return;
		}
		// --------------------------
		var titolo = DB.set.punti[siglaTsubo].NomeTsubo;
		for(a in DB.set.aree){
			if(DB.set.aree[a].siglaTsubo == siglaTsubo)titolo = siglaTsubo+". "+titolo;
		}
		var HTML = "<h1>"+htmlEntities(titolo)+"</h1>";
		var HTML_simboli = '';
		
		var type = '',
			master = false,
			lato = '',
			system = '';
		
		if(GEOMETRIE.gruppi.FN.punti.indexOf(siglaTsubo)>-1)type = 'FN';
		else type = 'NR';
		if(GEOMETRIE.gruppi.MASTER.punti.indexOf(siglaTsubo)>-1)master = true;
			
		var els = scene.getObjectByName("PTs"+SET.phase).children;
		for(e in els){
			if(els[e].name == "PT"+siglaTsubo){
				lato = els[e].userData.lato;
				system = els[e].userData.system;
			}
		}
		var els = scene.getObjectByName("ARs"+SET.phase).children;
		for(e in els){
			if(els[e].name == "AR"+siglaTsubo){
				lato = els[e].userData.lato;
				system = els[e].userData.system;
			}
		}
		var HTML_setting_text = '';
		var HTML_setting_symb = '';
		if(type=='FN'){
			HTML_setting_text += '- '+TXT("Setting_FN")+"<br>";
			HTML_setting_symb += '<b>FN</b>';
		}
		if(type=='NR'){
			HTML_setting_text += '- '+TXT("Setting_NR")+"<br>";
			HTML_setting_symb += '<b>NR</b>';
		}
		if(lato=='SX'){
			HTML_setting_text += '- '+TXT("Setting_SX")+"<br>";
			HTML_setting_symb += '<b>SX</b>';
		}
		if(lato=='DX'){
			HTML_setting_text += '- '+TXT("Setting_DX")+"<br>";
			HTML_setting_symb += '<b>DX</b>';
		}
		if(system==''){
			HTML_setting_text += '- '+TXT("Setting_INT")+"<br>";
			HTML_setting_symb += '<b>INT</b>';
		}
		if(system=='EUR'){
			HTML_setting_text += '- '+TXT("Setting_EUR")+"<br>";
			HTML_setting_symb += '<b>EUR</b>';
		}
		if(system=='CIN'){
			HTML_setting_text += '- '+TXT("Setting_CIN")+"<br>";
			HTML_setting_symb += '<b>CIN</b>';
		}
		if(master){
			HTML_setting_text += '- '+TXT("Setting_MASTER")+"<br>";
			HTML_setting_symb += '<b>MASTER</b>';
		}
		
		if(HTML_setting_text)HTML += '<div id="setting_point" onClick="SET.swSettingPoint();">'+HTML_setting_symb+'<div id="setting_point_text">'+HTML_setting_text+'</div></div>';
		
		
		if( ritorno && 
			document.getElementById("scheda_testo").innerHTML.indexOf("formMod") > -1 && 
			SCHEDA.classeAperta != "tab_tsubo" ){
				
			// pulsante per la scelta del punto su trattamenti e procedure
			var az = '';
			var txt = '';
			var cls = '';
			var stesso = false;
			var tsuboNuovo = siglaTsubo;
			if( SCHEDA.classeAperta == 'scheda_procedura' ){
				if(SET.pMod != ''){
					if( SET.pMod == tsuboNuovo)stesso = true;
					else{
						// cambia il punto
						txt = TXT("SostituisciTsubo").replace("[t]",SET.pMod);
						az = "SET.setTsuboFrm();";
					}
				}else{
					// aggiungi il punto alla procedura
					txt = TXT("AggiungiTsuboProc");
					az = "SET.aggiungiDettaglio('P','"+tsuboNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}
			}
			if( SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B' ){
				if(SET.pMod > -1){
					var tsuboOr = '';
					var tsuboOrNome = '';
					for(a in PAZIENTI.auriculoProvvisori){
						if(PAZIENTI.auriculoProvvisori[a].s = SET.pMod){
							tsuboOr = PAZIENTI.auriculoProvvisori[a].s;
							tsuboOrNome = PAZIENTI.auriculoProvvisori[a].n;
						}
					}
					if(tsuboOr == tsuboNuovo)stesso = true;
					else{
						// cambia il punto
						txt = TXT("SostituisciTsubo").replace("[t]",tsuboOrNome);
						az = "SET.setTsuboFrm();";
					}
				}else{
					// aggiungi il punto al trattamento
					txt = TXT("AggiungiTsuboTratt");
					az = "PAZIENTI.aggiungiPuntoTrattamento('"+tsuboNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}
			}
			
			if(!stesso)HTML_simboli += 	'<div id="spSch" class="'+cls+'" onClick="'+az+'">' +
										htmlEntities(txt) +
										'</div>';
										
			else HTML_simboli += 	'<div id="spStesso">'+
									htmlEntities(TXT("TsuboSelezionato")) +
									'</div>';
		}
		if(HTML_simboli)HTML += '<div>'+HTML_simboli+'</div>';
		
		HTML += SET.convPuntiScheda(DB.set.punti[siglaTsubo].AzioniTsubo,true);
		
		// elenco le patolige incluse
		var elenco = [];
		for(p in DB.set.patologie){
			var regexp = /\[\.[^\]]+\.\]/ig;
			var pts = DB.set.patologie[p].TestoPatologia.match(regexp);
			for(i in pts){
				if(pts[i]=='[.'+siglaTsubo+'.]'){
					var JSNPUSH = {"p": p, "NomePatologia": DB.set.patologie[p].NomePatologia} 
					
					if(elenco.indexOf(JSNPUSH)==-1)elenco.push(JSNPUSH);
				}
			}
		}
		if(elenco.length){
			HTML += '<div id="patologieTsubo">' +
					'	<div onClick="this.parentElement.classList.toggle(\'vis\');">'+TXT("Patologie")+'</div>';
			for(e in elenco){
				HTML += '<p onClick="SET.apriPatologia(\''+elenco[e].p+'\',document.getElementById(\'btn_patologia_'+elenco[e].p+'\'));"><span>• '+elenco[e].NomePatologia+'</span></p>';
			}
			HTML += '</div>';
		}
		
		
		
		// annotazione
		var TestoAnnotazione = '';
		var cartella = "auricolo";
		if(SET.verificaNota(siglaTsubo)){
			TestoAnnotazione += SET.leggiNota( cartella, siglaTsubo*1 );
		}
		HTML +=  '<p id="annotazioni_label"><b>'+htmlEntities(TXT("Note"))+'</b></p>';
		if(!ritorno || !SCHEDA.formModificato){
			// FORM
			HTML += '<div id="annotazioni_cont">' +
					'	<form 	id="formAnnotazioni" name="formAnnotazioni" method="post" onSubmit="return false;">' +
					'		<input name="stessa" type="hidden" id="stessa" value="1" />' +
					'		<input name="siglaTsubo" type="hidden" id="siglaTsubo" value="'+siglaTsubo+'" />' +
					'		<textarea  	id="TestoAnnotazione"' +
					'					name="TestoAnnotazione"' +
					'					onKeyDown="document.getElementById(\'pulsantiAnnotazione\').style.display=\'block\';"' +
					'					placeholder="'+TXT("Annotazioni")+'">' + TestoAnnotazione + '</textarea>' +
					'	</form>' +
					'</div>' +
					'<div id="pulsantiAnnotazione">' +
					'	<div 	id="p_sch_salva"' +
					'			onClick="if(verifica_form(document.formAnnotazioni))SET.mod_nota( \''+(siglaTsubo)+'\' );">' +
						TXT("Salva") +
					'	</div>' +
					'</div><div class="l"></div>';
		}else{
			if(TestoAnnotazione){
				HTML += '<divstyle="padding:15px;background-color:#ecdea3;">'+ TestoAnnotazione+'</div>';
			}else{
				HTML += '<div class="noResults">'+ htmlEntities(TXT("NessunaAnnotazione"))+'</div>';
			}
		}
		
		
		var ptSel = SET.ptSel;
		SET.ptSel = null;
		
		var btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.auricologia.pointsmap\')">' +
							TXT("ReferenceGuide") +
						'</div>';
						
		SCHEDA.caricaScheda(	titolo,
								HTML,
								"if(SET.ptSel)SET.chiudiTsubo()",
								"tab_tsubo",
								ritorno,
								false,
								'',
								btnAdd);
		SET.settaOverTsubo();
		SET.ptSel = ptSel;
		if(!ritorno || !SCHEDA.formModificato)initChangeDetection( "formAnnotazioni" );
		
		if(ritorno && !SCHEDA.aggancio.tipo == 'libera')SCHEDA.nasScheda();
	},
	mod_nota: function( siglaTsubo ){ // salva la nota di uno tsubo
		var nota_salvata=false;
		var DataModifica = DB.note.lastSync+1;
		var pDef=-1;
		var Q_TestoAnnotazione = document.getElementById("TestoAnnotazione").value;
		for (p in DB.note.data) {
			if(DB.note.data.length && typeof(DB.note.data[p].meridiano)=='undefined')DB.note.data.splice(p,p);
			else if(DB.note.data[p].meridiano=='auricolo' && DB.note.data[p].numeroTsubo==siglaTsubo && SET.verNotaCli(p)){
				DB.note.data[p].TestoAnnotazione=Q_TestoAnnotazione;
				DB.note.data[p].DataModifica=parseInt(DataModifica);
				nota_salvata=true;
				pDef=p;
			}
		}
		if(!nota_salvata && Q_TestoAnnotazione.trim()!=''){
			var idPaziente=-1;
			if(PAZIENTI.idCL>-1)idPaziente=PAZIENTI.idPaziente;
			JSNPUSH={	"TestoAnnotazione": Q_TestoAnnotazione,
						"meridiano": "auricolo",
						"numeroTsubo": siglaTsubo,
						"idPaziente": idPaziente*1,
						"idCL": PAZIENTI.idCL*1,
						"app": "AUR",
						"DataModifica": parseInt(DataModifica) };
			DB.note.data.push(JSNPUSH);
			pDef=DB.note.data.length-1;
		}
		
		endChangeDetection();
		SCHEDA.formModificato = false;
		applicaLoading(document.getElementById("scheda_testo"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note)).then(function(){ // salvo il DB
			LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'document.getElementById("pulsantiAnnotazione").style.display="none";' );
			SET.leggiNote();
		});
	},
	swSettingPoint: function(){ // switcha la scheda di spiegazione delle sigle (EUR, CIN, INT, ecc)
		document.getElementById("setting_point").classList.toggle("vis");
	},
	verNotaCli: function( p ){ // verifica che ci sia una nota per il cliente attivo
		var pass=true;
		if(PAZIENTI.idCL>-1){
			pass=false;
			var idPaziente=DB.pazienti.data[PAZIENTI.idCL].idPaziente*1;
			if(idPaziente){
				if(DB.pazienti.data[PAZIENTI.idCL].Cancellato*1!=1)pass=(DB.note.data[p].idPaziente*1==idPaziente);
				else pass=false;
			}else pass=(PAZIENTI.idCL*1==DB.note.data[p].idCL*1);
		}else pass=(DB.note.data[p].idPaziente*1==-1);
		return pass;
	},
	leggiNota: function( mr, pt ){ // legge la nota sul cliente
		var TestoAnnotazione = '';
		for(n in DB.note.data){
			var pass =false;
			if(DB.note.data[n].idPaziente > -1){
				if(DB.note.data[n].idPaziente == PAZIENTI.idPaziente)pass=true;
			}else{
				if(DB.note.data[n].idCL == PAZIENTI.idCL)pass=true;
			}
			if(pass){
				if( DB.note.data[n].meridiano == mr && DB.note.data[n].numeroTsubo == pt ){
					TestoAnnotazione = DB.note.data[n].TestoAnnotazione;
				}
			}
		}	
		return TestoAnnotazione;
	},
	leggiNote: function(){ // estrae l'elenco delle note
		SET.evidenziaNote(false);
		SET.note = [];
		if(DB.note){
			for(n in DB.note.data){
				if(DB.note.data[n].app=='AUR'){
					var pass =false;
					if(DB.note.data[n].idPaziente > -1){
						if(DB.note.data[n].idPaziente == PAZIENTI.idPaziente)pass=true;
					}else{
						if(DB.note.data[n].idCL == PAZIENTI.idCL)pass=true;
					}
					if(pass){
						if(DB.note.data[n].TestoAnnotazione.trim()!=''){
							SET.note.push(DB.note.data[n].numeroTsubo);
						}
					}
				}
			}	
		}
		SET.evidenziaNote(true);
	},
	evidenziaNote: function( az ){ // evidenzia le note con il colore giallo sul modello 3D
		for(n in SET.note){
			var PT = __(manichino.getObjectByName("PT"+SET.note[n]),null);
			if(PT && typeof(PT)!='undefined'){
				var mat = SET.MAT.pointBase;
				if(this.ptSel==PT)mat = SET.MAT.pointSel;
				if(az){
					mat = SET.MAT.pointNote;
					if(this.ptSel==PT)mat = SET.MAT.pointSelNote;
				}
				PT.material = mat;
				PT.userData.nota = az;
			}
		}
	},
	verificaNota: function( siglaTsubo ){ // verifica l'esistenza di una nota sul punto
		return SET.note.indexOf(siglaTsubo)>-1;
	},
	azRicercaTsubo: function( pt ){ // apre la scheda dello tsubo dalla ricerca globale
		SET.apriTsubo("PT"+pt);
		evidenziaParola();
	}
}