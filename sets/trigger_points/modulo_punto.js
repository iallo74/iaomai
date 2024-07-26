;
var MODULO_PUNTO = { // extend SET

	note: [],
	
	caricaPunto: function( nPunto, ritorno ){ // apre la scheda di un punto
		// verifico le autorizzazioni
		if(!SET.verFreePunti(nPunto)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		
		let muscolo = SET.getMuscle(nPunto),
			HTML = '',
			HTML_simboli = '',
			titolo = DB.set.punti[muscolo].NomePunto,
			azioni = DB.set.punti[muscolo].AzioniPunto,
			punti = DB.set.punti[muscolo].punti;
	

		HTML += '<h1>'+titolo+'</h1>';
		
		/* HTML += '<div id="imgPunto"';
		if(muscolo)HTML += ' style="background-image:url(\'sets/trigger_points/img/punti/'+muscolo+'-min.png\');"';
		HTML += '>'; */

		if( ritorno && 
			document.getElementById("scheda_testo").innerHTML.indexOf("formMod") > -1 && 
			SCHEDA.classeAperta != "tab_punti" ){
				
			// pulsante per la scelta del punto su trattamenti e procedure
			let az = '',
				txt = '',
				cls = '',
				stesso = false,
				puntoNuovo = nPunto;
			if( SCHEDA.classeAperta == 'scheda_procedura' ){
				if(SET.pMod > -1){
					let puntoOr = SET.dettagliProvvisori[SET.pMod].DescrizioneDettaglio;
					if( puntoOr == puntoNuovo)stesso = true;
					else{
						// cambia il punto
						txt = TXT("SostituisciPunto").replace("[t]",puntoOr);
						az = "SET.setPuntoFrm();";
					}
				}else{
					// aggiungi il punto alla procedura
					txt = TXT("AggiungiPuntoProc");
					az = "SET.aggiungiDettaglio('P','"+puntoNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}
			}
			if( SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B' ){
				if(SET.pMod > -1){
					let pP = PAZIENTI.puntiProvvisori[SET.pMod],
						puntoOr = pP.n+"."+pP.m;
					if(puntoOr == puntoNuovo)stesso = true;
					else{
						// cambia il punto
						txt = TXT("SostituisciPunto").replace("[t]",puntoOr);
						az = "SET.setPuntoFrm();";
					}
				}else{
					// aggiungi il punto al trattamento
					txt = TXT("AggiungiPuntoTratt");
					az = "PAZIENTI.aggiungiTriggerTrattamento('"+puntoNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}
			}
			
			if(!stesso)HTML_simboli += 	'<div id="spSch" class="'+cls+'" onClick="'+az+'">' +
										htmlEntities(txt) +
										'</div>';
										
			else HTML_simboli += 	'<div id="spStesso">'+
									htmlEntities(TXT("PuntoSelezionato")) +
									'</div>';
		}
		if(HTML_simboli)HTML += '<div class="cont_simboliPunto">'+HTML_simboli+'</div>';
		
		HTML += SET.convPuntiScheda(azioni,true);

		HTML += '<div id="imgPunto"';
		if(muscolo)HTML += ' style="background-image:url(\'sets/trigger_points/img/punti/'+muscolo+'-min.png\');"';
		HTML += '>';
		if(Object.keys(punti).length>1){
			HTML += '<b>'+TXT("Settori")+'</b><br><div id="punti_sel_cont">';
			for(let p in punti){
				HTML += '<div';
				if(p==nPunto)HTML += ' class="sel"';
				else HTML += ' onClick="SET.apriPunto('+p+',false);"';
				HTML += '>'+punti[p]+'</div><br>';
			}
			HTML += '</div>';
		}
		HTML += '</div>';
		HTML += '<div id="note_utilizzo">Utilizza lo schema qui sopra per scegliere e visualizzare i punti e il modello 3D per visualizzare le aree di dolore riferito.</div>';
		// aggiungo contenuto custom
		HTML = CUSTOMS.addContent("trigger_point_"+nPunto,HTML);
		
		
		
		// annotazione
		let TestoAnnotazione = '';
		//if(SET.verificaNota(nPunto)){
			TestoAnnotazione = SET.leggiNota( nPunto );
		//}
		HTML +=  '<p id="annotazioni_label"><b>'+htmlEntities(TXT("Note"))+'</b></p>';
		if(!ritorno || !SCHEDA.formModificato){
			// FORM
			HTML += '<div id="annotazioni_cont">' +
					'	<form 	id="formAnnotazioni" name="formAnnotazioni" method="post" onSubmit="return false;">' +
					'		<input name="stessa" type="hidden" id="stessa" value="1" />' +
					'		<input name="siglaPunto" type="hidden" id="siglaPunto" value="'+nPunto+'" />' +
					'		<textarea  	id="TestoAnnotazione"' +
					'					name="TestoAnnotazione"' +
					'					onKeyDown="document.getElementById(\'pulsantiAnnotazione\').style.display=\'block\';"' +
					'					onFocus="H.focusTextarea();"' +
					'					onBlur="H.blurTextarea();"' +
					'					placeholder="'+TXT("Annotazioni")+'">' + TestoAnnotazione + '</textarea>' +
					'	</form>' +
					'</div>' +
					'<div id="pulsantiAnnotazione">' +
					'	<div 	id="p_sch_salva"' +
					'			onClick="if(verifica_form(document.formAnnotazioni))SET.mod_nota( \''+nPunto+'\' );">' +
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
		let ptSel = SET.ptSel;
		SET.ptSel = null;
		
		let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.trigger_points.pointsmap\')">' +
							TXT("ReferenceGuide") +
						'</div>';
		
		let finalFunct = '';
		if(!ritorno || !SCHEDA.formModificato)finalFunct += 'initChangeDetection( "formAnnotazioni");';

		SCHEDA.caricaScheda(	titolo,
								HTML,
								"SWIPE.dismis();if(SET.ptSel)SET.chiudiPunto();",
								"tab_punti",
								ritorno,
								false,
								'',
								btnAdd,
								globals.set.cartella+'_punto_'+nPunto,
								finalFunct );
		
		SCHEDA.gestVisAnatomia(true);
		SET.settaOverPunto();
		SET.ptSel = ptSel;
		if(ritorno && !SCHEDA.aggancio.tipo == 'libera')SCHEDA.nasScheda();
		
	},
	
	mod_nota: function( Q_p ){ // salva la nota di un punto
		let nota_salvata = false,
			DataModifica = DB.note.lastSync+1,
			pDef = -1,
			Q_TestoAnnotazione = document.getElementById("TestoAnnotazione").value;
		for (p in DB.note.data) {
			if(DB.note.data.length && typeof(DB.note.data[p].meridiano)=='undefined')DB.note.data.splice(p,p);
			else if(DB.note.data[p].meridiano=="trigger" && DB.note.data[p].numeroPunto==Q_p && SET.verNotaCli(p)){
				DB.note.data[p].TestoAnnotazione=Q_TestoAnnotazione;
				DB.note.data[p].DataModifica=parseInt(DataModifica);
				nota_salvata=true;
				pDef=p;
			}
		}
		if(!nota_salvata){
			let idPaziente=-1;
			if(PAZIENTI.idCL>-1)idPaziente=PAZIENTI.idPaziente;
			JSNPUSH={	"TestoAnnotazione": Q_TestoAnnotazione,
						"meridiano": "trigger",
						"numeroPunto": Q_p,
						"idPaziente": idPaziente*1,
						"idCL": PAZIENTI.idCL*1,
						"DataModifica": parseInt(DataModifica) };
			DB.note.data.push(JSNPUSH);
			pDef=DB.note.data.length-1;
		}
		
		endChangeDetection();
		SCHEDA.formModificato = false;
		applicaLoading(document.getElementById("scheda_testo"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note)).then(function(){ // salvo il DB
			SYNCRO.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'document.getElementById("pulsantiAnnotazione").style.display="none";' );
			SET.leggiNote();
		});
	},
	verNotaCli: function( p ){ // verifica che ci sia una nota per il cliente attivo
		let pass=true;
		if(PAZIENTI.idCL>-1){
			pass=false;
			let idPaziente=DB.pazienti.data[PAZIENTI.idCL].idPaziente*1;
			if(idPaziente){
				if(DB.pazienti.data[PAZIENTI.idCL].Cancellato*1!=1)pass=(DB.note.data[p].idPaziente*1==idPaziente);
				else pass=false;
			}else pass=(PAZIENTI.idCL*1==DB.note.data[p].idCL*1);
		}else pass=(DB.note.data[p].idPaziente*1==-1);
		return pass;
	},
	leggiNota: function( pt ){ // restituisce il testo della nota
		let TestoAnnotazione = '';
		for(let n in DB.note.data){
			let pass =false;
			if(DB.note.data[n].idPaziente > -1){
				if(DB.note.data[n].idPaziente == PAZIENTI.idPaziente)pass=true;
			}else{
				if(DB.note.data[n].idCL == PAZIENTI.idCL)pass=true;
			}
			if(pass){
				if( DB.note.data[n].meridiano == 'trigger' && DB.note.data[n].numeroPunto == pt ){
					TestoAnnotazione = DB.note.data[n].TestoAnnotazione;
				}
			}
		}	
		return TestoAnnotazione;
	},
	leggiNote: function(){ // crea l'elenco delle note e le evidenzia dul modello
		SET.evidenziaNote(false);
		SET.note = [];
		if(DB.note){
			for(let n in DB.note.data){
				if(DB.note.data[n].app=='TRP'){
					let pass =false;
					if(DB.note.data[n].idPaziente > -1){
						if(DB.note.data[n].idPaziente == PAZIENTI.idPaziente)pass=true;
					}else{
						if(DB.note.data[n].idCL == PAZIENTI.idCL)pass=true;
					}
					if(pass){
						let pt = DB.note.data[n].numeroPunto + "";
						if(DB.note.data[n].TestoAnnotazione.trim()!='')SET.note.push(pt);
					}
				}
			}	
		}
		SET.evidenziaNote(true);
	},
	evidenziaNote: function( az ){ // evidenzia le note sul manichino
		for(let n in SET.note){
			let pP = SET.note[n].split(".");
			for(let m in SETS.children){
				if(SETS.children[m].name.substr(0,5) == 'PT_'+pP[0]){
					for(let p in SETS.children[m].children){
						if(SETS.children[m].children[p].name.substr(0,5)==SET.note[n]){
							let mr = SETS.children[m].children[p].name.substr(0,2),
								mat = SET.MAT.pointBase;
							if(MERIDIANI[mr].meridianoAcceso)mat = SET.MAT.pointSel;
							if(az){
								mat = SET.MAT.pointNote;
								if(MERIDIANI[mr].meridianoAcceso)mat = SET.MAT.pointSelNote;
							}
							
							SETS.children[m].children[p].material = mat;
							SETS.children[m].children[p].userData.nota = az;
						}
					}
				}
			}
		}
	},
	verificaNota: function( n ){ // verifica che ci sia una nota sul punto
		return SET.note.indexOf(n)>-1;
	},
	splitPoint: function( siglaPunto ){
		// elaborare il nome del punto
		let pp = siglaPunto.split("_");
		return {nPunto: pp[0],lato: pp[1]};
	},
	getMuscle: function( siglaPunto ){
		let els = scene.getObjectByName("PT").children,
			muscolo = '';
		for(let e in els){
			if(els[e].name.indexOf(siglaPunto)==0){
				muscolo = els[e].userData.muscolo;
			}
		};
		return muscolo;
	},
	getFirstPoint: function( muscolo ){
		let nPunto = '';
		for(p in DB.set.punti[muscolo].punti){
			if(!nPunto)nPunto = p;
		}
		return nPunto;
	},
	ptToStr: function( nPunto ){
		nPunto = nPunto+"";
		if(nPunto.length == 1)nPunto = "00"+nPunto;
		if(nPunto.length == 2)nPunto = "0"+nPunto;
		return nPunto;
	},
	azRicercaPunto: function( pt ){ // apre la scheda del punto dalla ricerca globale
		SET.apriPunto(pt);
		evidenziaParola();
		RICERCHE.nascondiGlobal(true); // lasciare qui
	}
}