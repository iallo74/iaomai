
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
		
		let titolo = DB.set.punti[siglaPunto].NomePunto;
		for(a in DB.set.aree){
			if(DB.set.aree[a].siglaPunto == siglaPunto)titolo = siglaPunto+". "+titolo;
		}
		let HTML = "<h1>"+htmlEntities(titolo)+"</h1>",
			HTML_simboli = '',
			type = '',
			master = false,
			lato = '',
			system = '';
		
		if(GEOMETRIE.gruppi.FN.punti.indexOf(siglaPunto)>-1)type = 'FN';
		else type = 'NR';
		if(GEOMETRIE.gruppi.MASTER.punti.indexOf(siglaPunto)>-1)master = true;
		
		let els = scene.getObjectByName("PTs"+SET.phase).children;
		for(let e in els){
			if(els[e].name == "PT"+siglaPunto){
				lato = els[e].userData.lato;
				system = els[e].userData.system;
			}
		}
		els = scene.getObjectByName("ARs"+SET.phase).children;
		for(let e in els){
			if(els[e].name == "AR"+siglaPunto){
				lato = els[e].userData.lato;
				system = els[e].userData.system;
			}
		}
		
		let HTML_setting_text = '',
			HTML_setting_symb = '';
		if(type=='FN'){
			HTML_setting_text += '- '+TXT("Setting_FN")+'<br>';
			HTML_setting_symb += '<b>'+TXT("Symb_FN")+'</b>';
		}
		if(type=='NR'){
			HTML_setting_text += '- '+TXT("Setting_NR")+'<br>';
			HTML_setting_symb += '<b>'+TXT("Symb_NR")+'</b>';
		}
		if(lato=='SX'){
			HTML_setting_text += '- '+TXT("Setting_SX")+'<br>';
			HTML_setting_symb += '<b>'+TXT("Symb_SX")+'</b>';
		}
		if(lato=='DX'){
			HTML_setting_text += '- '+TXT("Setting_DX")+'<br>';
			HTML_setting_symb += '<b>'+TXT("Symb_DX")+'</b>';
		}
		if(system==''){
			HTML_setting_text += '- '+TXT("Setting_INT")+'<br>';
			HTML_setting_symb += '<b>'+TXT("Symb_INT")+'</b>';
		}
		if(system=='EUR'){
			HTML_setting_text += '- '+TXT("Setting_EUR")+'<br>';
			HTML_setting_symb += '<b>'+TXT("Symb_EUR")+'</b>';
		}
		if(system=='CIN'){
			HTML_setting_text += '- '+TXT("Setting_CIN")+'<br>';
			HTML_setting_symb += '<b>'+TXT("Symb_CIN")+'</b>';
		}
		if(master){
			HTML_setting_text += '- '+TXT("Setting_MASTER")+'<br>';
			HTML_setting_symb += '<b>'+TXT("Symb_MASTER")+'</b>';
		}
		
		if(HTML_setting_text)HTML += '<div id="setting_point" onClick="SET.swSettingPoint();">'+HTML_setting_symb+'<div id="setting_point_text">'+HTML_setting_text+'</div></div>';
		
		
		if( ritorno && 
			document.getElementById("scheda_testo").innerHTML.indexOf("formMod") > -1 && 
			SCHEDA.classeAperta != "tab_punti" ){
				
			// pulsante per la scelta del punto su trattamenti e procedure
			let az = '',
				txt = '',
				cls = '',
				stesso = false,
				puntoNuovo = siglaPunto;
			if( SCHEDA.classeAperta == 'scheda_procedura' ){
				if(SET.puntiEvidenziati.indexOf(puntoNuovo)==-1){
					// aggiungi il punto alla procedura
					txt = TXT("AggiungiPuntoProc");
					az = "SET.aggiungiDettaglio('A','"+puntoNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}else stesso = true;
			}
			if( SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B' ){
				if(SET.puntiEvidenziati.indexOf(puntoNuovo)==-1){
					// aggiungi il punto al trattamento
					txt = TXT("AggiungiPuntoTratt");
					az = "PAZIENTI.aggiungiAuriculoTrattamento('"+puntoNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}else stesso = true;
			}
			
			if(!stesso)HTML_simboli += 	'<div id="spSch" class="'+cls+'" onClick="'+az+'">' +
										htmlEntities(txt) +
										'</div>';
										
			else HTML_simboli += 	'<div id="spStesso">'+
									htmlEntities(TXT("PuntoSelezionato")) +
									'</div>';
		}
		if(HTML_simboli)HTML += '<div>'+HTML_simboli+'</div>';
		
		
		// aggiungo contenuto custom
		HTML += CUSTOMS.addContent("punti_"+siglaPunto,SET.convPuntiScheda(DB.set.punti[siglaPunto].AzioniPunto,true));
		
		//HTML += SET.convPuntiScheda(DB.set.punti[siglaPunto].AzioniPunto,true);
		
		
		
		// elenco le patolige incluse
		let elenco = [];
		for(let x1 in DB.set.schede){
			for(let x2 in DB.set.schede[x1]){
				for(let x3 in DB.set.schede[x1][x2]){
					for(let x4 in DB.set.schede[x1][x2][x3].p){
						let el = DB.set.schede[x1][x2][x3].p[x4];
						if(typeof(el)=='string'){
							if(DB.set.schede[x1][x2][x3].p[x4].indexOf(siglaPunto) >- 1){
								for(let p in DB.set.patologie){
									if(DB.set.patologie[p].scheda == x1){
										if(elenco.indexOf(p)==-1)elenco.push(p);
									}
								}
							}
						}else{
							if(typeof(el.length)=='undefined')el = el.p;
							for(let x5 in el){
								if(el[x5].indexOf(siglaPunto) >- 1){
									for(let p in DB.set.patologie){
										if(DB.set.patologie[p].scheda == x1){
											if(elenco.indexOf(p)==-1)elenco.push(p);
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		
		
		
		if(elenco.length){
			HTML += '<div id="patologiePunti">' +
					'	<div onClick="this.parentElement.classList.toggle(\'vis\');">'+TXT("Patologie")+'</div>';
			for(let e in elenco){
				HTML += '<p onClick="SET.apriPatologia(\''+elenco[e]+'\',document.getElementById(\'btn_patologia_'+elenco[e]+'\'));"><span>• '+DB.set.patologie[elenco[e]].NomePatologia+'</span></p>';
			}
			HTML += '</div>';
		}
		


		HTML = '<div class="translatable">'+HTML+'</div>';
		
		
		// annotazione
		let TestoAnnotazione = '',
			hidePunto = '0',
			cartella = "auricolo";
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
		
		
		let ptSel = SET.ptSel;
		SET.ptSel = null;
		
		let btnAdd = 	'<div class="p_paz_ref_menu" onClick="REF.open(\'sets.auricologia.pointsmap\')">' +
							TXT("ReferenceGuide") +
						'</div>';
		if(!ritorno)btnAdd += '<div id="hide_point" onClick="SET.swHidePunto(\''+siglaPunto+'\');"></div>';
		
		let finalFunct = '';
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
		if(!ritorno)SET.setHideButton(siglaPunto);
		SET.ptSel = ptSel;
		if(!ritorno || !SCHEDA.formModificato)initChangeDetection( "formAnnotazioni" );
		
		if(ritorno && !SCHEDA.aggancio.tipo == 'libera')SCHEDA.nasScheda();
	},
	mod_nota: function( siglaPunto ){ // salva la nota di un punto
		let nota_salvata=false;
		let DataModifica = DB.note.lastSync+1,
			pDef=-1,
			Q_TestoAnnotazione = document.getElementById("TestoAnnotazione").value;
		for (p in DB.note.data) {
			if(DB.note.data.length && typeof(DB.note.data[p].meridiano)=='undefined')DB.note.data.splice(p,p);
			else if(DB.note.data[p].meridiano=='auricolo' && DB.note.data[p].numeroPunto==siglaPunto && SET.verNotaCli(p)){
				DB.note.data[p].TestoAnnotazione=Q_TestoAnnotazione;
				DB.note.data[p].DataModifica=parseInt(DataModifica);
				nota_salvata=true;
				pDef=p;
			}
		}
		if(!nota_salvata /* && Q_TestoAnnotazione.trim()!='' */){
			let idPaziente=-1;
			if(PAZIENTI.idCL>-1)idPaziente=PAZIENTI.idPaziente;
			JSNPUSH={	"TestoAnnotazione": Q_TestoAnnotazione,
						"meridiano": "auricolo",
						"numeroPunto": siglaPunto,
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
	leggiNota: function( mr, pt ){ // legge la nota sul cliente
		let TestoAnnotazione = '',
			hidePunto = '0';
		for(let n in DB.note.data){
			let pass =false;
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
	leggiNote: function(){ // estrae l'elenco delle note
		SET.evidenziaNote(false);
		SET.note = [];
		if(DB.note){
			for(let n in DB.note.data){
				if(DB.note.data[n].app=='AUR'){
					let pass =false;
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
					if(DB.note.data[n].hidePunto=='1'){
						SET.setHide3D(DB.note.data[n].numeroPunto,'1');
					}
				}
			}	
		}
		SET.evidenziaNote(true);
	},
	evidenziaNote: function( az ){ // evidenzia le note con il colore giallo sul modello 3D
		for(let n in SET.note){
			let PT = __(manichino.getObjectByName("PT"+SET.note[n]),null);
			if(PT && typeof(PT)!='undefined'){
				let mat = SET.MAT.pointBase;
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
	verificaNota: function( siglaPunto ){ // verifica l'esistenza di una nota sul punto
		return SET.note.indexOf(siglaPunto)>-1;
	},
	swHidePunto: function( siglaPunto ){
		let nota_salvata = false,
			hidePunto = '0',
			DataModifica = DB.note.lastSync+1;
		for(let nota of DB.note.data){
			if(siglaPunto == nota.numeroPunto && nota.meridiano=='auriculo' &&  nota.idCL==-1 && nota.app=='AUR'){
				if(__(nota.hidePunto,'0')=='1')nota.hidePunto = '0';
				else{
					nota.hidePunto = '1';
					hidePunto = '1';
				}
				nota.DataModifica = DataModifica;
				nota_salvata = true;
			}
		}
		if(!nota_salvata){
			DB.note.data.push({
				TestoAnnotazione: "",
				app: "AUR",
				hidePunto: "1",
				idCL: -1,
				idPaziente: -1,
				meridiano: "auriculo",
				numeroPunto: siglaPunto,
				DataModifica: DataModifica
			});
			hidePunto = '1';
		}
		applicaLoading(document.getElementById("scheda_testo"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".note"), IMPORTER.COMPR(DB.note)).then(function(){ // salvo il DB
			LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'SET.setHide3D(\''+siglaPunto+'\',\''+hidePunto+'\');' +
								'SCHEDA.swMenuScheda();' );
		});
	},
	setHide3D: function( siglaPunto, hidePunto ){
		let phs = ["","2","3"];
		for(let ph in phs){
			let els = scene.getObjectByName("PTs"+phs[ph]).children;
			for(let e in els){
				if(els[e].name.indexOf("PT"+siglaPunto)==0 || els[e].name.indexOf("_PT"+siglaPunto)==0){
					els[e].userData.hidePunto = hidePunto;
					els[e].visible = (hidePunto=='0');
				}
			}
			els = scene.getObjectByName("LNs"+phs[ph]).children;
			for(let e in els){
				if(els[e].name.indexOf("AG"+siglaPunto)==0){
					els[e].userData.hidePunto = hidePunto;
					els[e].visible = (hidePunto=='0');
				}
			}
			els = scene.getObjectByName("ARs"+phs[ph]).children;
			for(let e in els){
				if(els[e].name.indexOf("AR"+siglaPunto)==0){
					els[e].userData.hidePunto = hidePunto;
					els[e].visible = (hidePunto=='0');
				}
			}
		}
		document.getElementById("ts_"+siglaPunto).classList.toggle("hide_point_list",(hidePunto=='1'))
		if(hidePunto=='0')SET.setHideButton(siglaPunto);
		else SCHEDA.scaricaScheda();
	},
	setHideButton: function( siglaPunto ){
		document.getElementById("hide_point").className = 'p_hide_point';
		document.getElementById("hide_point").innerHTML = TXT("NascondiPunto");
		for(let nota of DB.note.data){
			if(siglaPunto == nota.numeroPunto && nota.meridiano=='auriculo' &&  nota.idCL==-1 && nota.app=='AUR'){
				if(__(nota.hidePunto,'0')=='1'){
					document.getElementById("hide_point").className = 'p_show_point';
					document.getElementById("hide_point").innerHTML = TXT("MostraPunto");
				}
			}
		}
	},
	ptToStr: function( nPunto ){
		nPunto = nPunto+"";
		if(nPunto.length == 1)nPunto = "00"+nPunto;
		if(nPunto.length == 2)nPunto = "0"+nPunto;
		return nPunto;
	},
	azRicercaPunto: function( pt ){ // apre la scheda del p dalla ricerca globale
		SET.apriPunto("PT"+pt);
		evidenziaParola();
		RICERCHE.nascondiGlobal(true); // lasciare qui
	}
}