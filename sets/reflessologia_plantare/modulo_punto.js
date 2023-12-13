
var MODULO_PUNTO = { // extend SET

	note: [],
	
	caricaPunto: function( siglaPunto, ritorno ){ //  carica la scheda del punto
		// verifico le autorizzazioni
		if(!SET.verFreePunti(siglaPunto)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			SET.chiudiPunto();
			return;
		}
		// --------------------------
		
		var titolo = DB.set.aree[siglaPunto].NomePunto;
		for(a in DB.set.aree){
			if(DB.set.aree[a].siglaPunto == siglaPunto)titolo = siglaPunto+". "+titolo;
		}
		var HTML = "<h1>"+htmlEntities(titolo)+"</h1>";
		
		var apparato = DB.set.aree[siglaPunto].apparato;
		HTML += '<div class="label_apparato app'+apparato+'"><span>'+DB.set.apparati[apparato]+'</span></div><br><br>';
		
		
		if( ritorno && 
			document.getElementById("scheda_testo").innerHTML.indexOf("formMod") > -1 && 
			SCHEDA.classeAperta != "tab_punti" ){
				
			// pulsante per la scelta del punto su trattamenti e procedure
			var az = '';
			var txt = '';
			var cls = '';
			var stesso = false;
			var puntoNuovo = siglaPunto;
			if( SCHEDA.classeAperta == 'scheda_procedura' ){
				if(SET.puntiEvidenziati.indexOf(puntoNuovo)==-1){
					// aggiungi il punto alla procedura
					txt = TXT("AggiungiPuntoProc");
					az = "SET.aggiungiDettaglio('R','"+puntoNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}else stesso = true;
			}
			if( SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B' ){
				if(SET.puntiEvidenziati.indexOf(puntoNuovo)==-1){
					// aggiungi il punto al trattamento
					txt = TXT("AggiungiPuntoTratt");
					az = "PAZIENTI.aggiungiReflexTrattamento('"+puntoNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}else stesso = true;
			}
		}
		
		
		// aggiungo contenuto custom
		HTML += CUSTOMS.addContent("punti_"+siglaPunto,SET.convPuntiScheda(DB.set.aree[siglaPunto].AzioniPunto,true));
		
		


		HTML = '<div class="translatable">'+HTML+'</div>';
		
		
		// annotazione
		var TestoAnnotazione = '',
			hidePunto = '0',
			cartella = "reflex";
		if(SET.verificaNota(siglaPunto)){
			let ar = SET.leggiNota( cartella, siglaPunto*1 );
			TestoAnnotazione = ar[0];
			hidePunto = ar[1];
		}
		HTML +=  '<p id="annotazioni_label"><b>'+htmlEntities(TXT("Note"))+'</b></p>';
		if(!ritorno || !SCHEDA.formModificato){
			// FORM
			HTML += '<div id="annotazioni_cont">' +
					'	<form 	id="formAnnotazioni" name="formAnnotazioni" method="post" onSubmit="return false;">' +
					'		<input name="stessa" type="hidden" id="stessa" value="1" />' +
					'		<input name="siglaPunto" type="hidden" id="siglaPunto" value="'+siglaPunto+'" />' +
					'		<textarea  	id="TestoAnnotazione"' +
					'					name="TestoAnnotazione"' +
					'					onKeyDown="document.getElementById(\'pulsantiAnnotazione\').style.display=\'block\';"' +
					'					placeholder="'+TXT("Annotazioni")+'">' + TestoAnnotazione + '</textarea>' +
					'	</form>' +
					'</div>' +
					'<div id="pulsantiAnnotazione">' +
					'	<div 	id="p_sch_salva"' +
					'			onClick="if(verifica_form(document.formAnnotazioni))SET.mod_nota( \''+(siglaPunto)+'\' );">' +
						TXT("Salva") +
					'	</div>' +
					'</div><div class="l"></div>';
		}else{
			if(TestoAnnotazione){
				HTML += '<div style="padding:15px;background-color:#ecdea3;">'+ TestoAnnotazione+'</div>';
			}else{
				HTML += '<div class="noResults">'+ htmlEntities(TXT("NessunaAnnotazione"))+'</div>';
			}
		}
		
		
		var ptSel = SET.ptSel;
		SET.ptSel = null;
		
		var btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.reflessologia_plantare.pointsmap\')">' +
							TXT("ReferenceGuide") +
						'</div>';
		
		var finalFunct = '';
		if(!ritorno || !SCHEDA.formModificato)finalFunct += 'initChangeDetection( "formAnnotazioni");';
						
		SCHEDA.caricaScheda(	titolo,
								HTML,
								"if(SET.ptSel)SET.chiudiPunto()",
								"tab_punti",
								ritorno,
								false,
								'',
								btnAdd,
								globals.set.cartella+'_punti_'+"_"+siglaPunto,
								finalFunct );
		SET.settaOverPunto();
		SET.ptSel = ptSel;
		if(!ritorno || !SCHEDA.formModificato)initChangeDetection( "formAnnotazioni" );
		
		if(ritorno && !SCHEDA.aggancio.tipo == 'libera')SCHEDA.nasScheda();
	},
	mod_nota: function( siglaPunto ){ // salva la nota di un punto
		let nota_salvata=false;
		var DataModifica = DB.note.lastSync+1;
		var pDef=-1;
		var Q_TestoAnnotazione = document.getElementById("TestoAnnotazione").value;
		for (p in DB.note.data) {
			if(DB.note.data.length && typeof(DB.note.data[p].meridiano)=='undefined')DB.note.data.splice(p,p);
			else if(DB.note.data[p].meridiano=='reflex' && DB.note.data[p].numeroPunto==siglaPunto && SET.verNotaCli(p)){
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
						"meridiano": "reflex",
						"numeroPunto": siglaPunto,
						"idPaziente": idPaziente*1,
						"idCL": PAZIENTI.idCL*1,
						"app": "RFX",
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
	leggiNote: function(){ // estrae l'elenco delle note
		SET.note = [];
		if(DB.note){
			for(let n in DB.note.data){
				if(DB.note.data[n].app=='RFX'){
					var pass =false;
					if(DB.note.data[n].idPaziente > -1){
						if(DB.note.data[n].idPaziente == PAZIENTI.idPaziente)pass=true;
					}else{
						if(DB.note.data[n].idCL == PAZIENTI.idCL)pass=true;
					}
					if(pass){
						if(DB.note.data[n].TestoAnnotazione.trim()!=''){
							SET.note.push(DB.note.data[n].numeroPunto);
						}
					}
				}
			}	
		}
	},
	leggiNota: function( mr, pt ){ // legge la nota sul cliente
		var TestoAnnotazione = '',
			hidePunto = '0';
		for(let n in DB.note.data){
			var pass =false;
			if(DB.note.data[n].idPaziente > -1){
				if(DB.note.data[n].idPaziente == PAZIENTI.idPaziente)pass=true;
			}else{
				if(DB.note.data[n].idCL == PAZIENTI.idCL)pass=true;
			}
			if(pass){
				if( DB.note.data[n].meridiano == mr && DB.note.data[n].numeroPunto == pt ){
					TestoAnnotazione = DB.note.data[n].TestoAnnotazione;
					hidePunto = __(DB.note.data[n].hidePunto,'0');
				}
			}
		}	
		return [TestoAnnotazione,hidePunto];
	},
	verificaNota: function( siglaPunto ){ // verifica l'esistenza di una nota sul punto
		return SET.note.indexOf(siglaPunto)>-1;
	},
	azRicercaPunto: function( pt ){ // apre la scheda del p dalla ricerca globale
		SET.apriPunto(pt);
		evidenziaParola();
		RICERCHE.nascondiGlobal(true); // lasciare qui
	}
}