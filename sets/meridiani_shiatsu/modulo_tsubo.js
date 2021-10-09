
var MODULO_TSUBO = { // extend SET
	note: [],
	caricaTsubo: function( siglaMeridiano, nTsubo, ritorno ){
		// verifico le autorizzazioni
		if(SET.MERIDIANI_free.indexOf(siglaMeridiano)==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin())){
			ALERT(Lingua(TXT_MsgContSoloPay));
			return;
		}
		// --------------------------
		var nTsubo2 = (nTsubo+1)+"";
		if(nTsubo2.length == 1)nTsubo2 = "0"+nTsubo2;
		var titolo = DB.set.meridiani[siglaMeridiano].tsubo[nTsubo].NomeTsubo;
		var meridiano = DB.set.meridiani[siglaMeridiano];
		var coordZoom = __(DB.mtc.meridiani[siglaMeridiano].tsubo[nTsubo].coordZoom);
		var imgZoom = __(DB.mtc.meridiani[siglaMeridiano].tsubo[nTsubo].imgZoom);
		var TS = meridiano.tsubo[nTsubo];
		var cartella = DB.mtc.meridiani[siglaMeridiano].cartella;
		var HTML = "<h1>"+htmlEntities(titolo)+"</h1>";
		var HTML_simboli = '';
		
		// noMoxa
		if(DB.set.meridiani[siglaMeridiano].noMoxa)HTML_simboli += 	'<div style="background-image:url(sets/meridiani_shiatsu/img/nomoxa.png);"' +
										'	  class="simboliTsubo"></div>';
		
		// noGravidanza
		if(DB.set.meridiani[siglaMeridiano].noGravidanza && globals.modello.cartella == 'donna')HTML_simboli += '<div style="background-image:url(sets/meridiani_shiatsu/img/nogravidanza.png);" class="simboliTsubo"></div>';
		
		
		if( ritorno && 
			document.getElementById("scheda_testo").innerHTML.indexOf("formMod") > -1 && 
			SCHEDA.classeAperta != "tab_tsubo" ){
				
			// pulsante per la scelta del punto su trattamenti e procedure
			var az = '';
			var txt = '';
			var cls = '';
			var stesso = false;
			var tsuboNuovo = (nTsubo+1)+"."+siglaMeridiano;
			if( SCHEDA.classeAperta == 'scheda_procedura' ){
				if(SET.pMod > -1){
					var tsuboOr = SET.dettagliProvvisori[SET.pMod].DescrizioneDettaglio;
					if( tsuboOr == tsuboNuovo)stesso = true;
					else{
						// cambia il punto
						txt = Lingua(TXT_SostituisciTsubo).replace("[t]",tsuboOr);
						az = "SET.setTsuboFrm();";
					}
				}else{
					// aggiungi il punto alla procedura
					txt = Lingua(TXT_AggiungiTsuboProc);
					az = "SET.aggiungiDettaglio('P','"+tsuboNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}
			}
			if( SCHEDA.classeAperta == 'scheda_A' || SCHEDA.classeAperta == 'scheda_B' ){
				if(SET.pMod > -1){
					var pP = PAZIENTI.puntiProvvisori[SET.pMod];
					var tsuboOr = pP.n+"."+pP.m;
					if(tsuboOr == tsuboNuovo)stesso = true;
					else{
						// cambia il punto
						txt = Lingua(TXT_SostituisciTsubo).replace("[t]",tsuboOr);
						az = "SET.setTsuboFrm();";
					}
				}else{
					// aggiungi il punto al trattamento
					txt = Lingua(TXT_AggiungiTsuboTratt);
					az = "PAZIENTI.aggiungiPuntoTrattamento('"+tsuboNuovo+"');SCHEDA.torna();";
					cls = 'spAdd';
				}
			}
			
			if(!stesso)HTML_simboli += 	'<div id="spSch" class="'+cls+'" onClick="'+az+'">' +
										htmlEntities(txt) +
										'</div>';
										
			else HTML_simboli += 	'<div id="spStesso">'+
									htmlEntities(Lingua(TXT_TsuboSelezionato)) +
									'</div>';
		}
		if(HTML_simboli)HTML += '<div>'+HTML_simboli+'</div>';
		
		HTML += DB.set.meridiani[siglaMeridiano].tsubo[nTsubo].AzioniTsubo;
		
		
		imgDettaglio='';
		posPunti='';
		var wCont = 370;
		var marginLeft = 0;
		if(touchable && smartphone){
			wCont = WF()-40;
			marginLeft = 20;
		}
		var rp = wCont/370;
		if(coordZoom.length>1){
			var pC=coordZoom.split("|");
			for(pu in pC){
				pC2=pC[pu].split(",");
				posPunti+='<img src="sets/common/mtc/img/zoom/punto.png" width="'+parseInt(43*rp)+'" height="'+parseInt(40*rp)+'" style="position:absolute;left:'+parseInt((pC2[0]-7)*rp-marginLeft)+'px;top:'+parseInt((pC2[1]-7)*rp)+'px;">';
			}
		}
		if(imgZoom)imgDettaglio='<div style="position:relative;width:370px;"><img src="sets/common/mtc/img/zoom/'+imgZoom+'" border="0" width="370" id="imgDettTsubo">'+posPunti+'</div>';
		
		
		
		// ideogramma
		HTML = 	'<img 	src="sets/common/mtc/img/txt_meridiani/'+siglaMeridiano+'/tsubo_'+nTsubo2+'.png"' +
				'		class="ideogrammaTsubo">'+HTML+imgDettaglio;
		
		
		
		// annotazione
		var TestoAnnotazione = '';
		if(SET.verificaNota(siglaMeridiano+"."+nTsubo2)){
			TestoAnnotazione += SET.leggiNota( cartella, nTsubo2 );
		}
		HTML +=  '<p id="annotazioni_label"><b>'+htmlEntities(Lingua(TXT_Note))+'</b></p>';
		if(!ritorno || !SCHEDA.formModificato){
			// FORM
			HTML += '<div id="annotazioni_cont">' +
					'	<form 	id="formAnnotazioni" name="formAnnotazioni" method="post" onSubmit="return false;">' +
					'		<input name="stessa" type="hidden" id="stessa" value="1" />' +
					'		<input name="siglaMeridiano" type="hidden" id="siglaMeridiano" value="'+siglaMeridiano+'" />' +
					'		<input name="nTsubo" type="hidden" id="nTsubo" value="'+nTsubo+'" />' +
					'		<textarea  	id="TestoAnnotazione"' +
					'					name="TestoAnnotazione"' +
					'					onKeyDown="document.getElementById(\'pulsantiAnnotazione\').style.display=\'block\';"' +
					'					placeholder="'+Lingua(TXT_Annotazioni)+'">' + TestoAnnotazione + '</textarea>' +
					'	</form>' +
					'</div>' +
					'<div id="pulsantiAnnotazione">' +
					'	<div 	id="p_sch_salva"' +
					'			onClick="if(verifica_form(document.formAnnotazioni))SET.mod_nota( \''+cartella+'\', \''+(nTsubo+1)+'\' );">' +
						Lingua(TXT_Salva) +
					'	</div>' +
					'</div><div class="l"></div>';
		}else{
			if(TestoAnnotazione){
				HTML += '<divstyle="padding:15px;background-color:#ecdea3;">'+ TestoAnnotazione+'</div>';
			}else{
				HTML += '<div class="noResults">'+ htmlEntities(Lingua(TXT_NessunaAnnotazione))+'</div>';
			}
		}
		
		if(SCHEDA.classeAperta == 'scheda_meridiano'){
			// verifico che il meridiano aperto sia lo stesso altrimenti cambio la scheda secondaria
			if(SET.mAtt != siglaMeridiano){
				ritorno = '';
			}
		}
		
		var ptSel = SET.ptSel;
		SET.ptSel = null;
		SCHEDA.caricaScheda(titolo,HTML,"if(SET.ptSel)SET.chiudiTsubo()","tab_tsubo",ritorno);
		SET.convSigleScheda();
		SET.ptSel = ptSel;
		if(!ritorno || !SCHEDA.formModificato)initChangeDetection( "formAnnotazioni" );
		
		if(ritorno && !SCHEDA.libera.stato)SCHEDA.nasScheda();
		
		document.getElementById("frSchSu").onclick = '';
		document.getElementById("frSchGiu").onclick = '';
		
		
		var classFr = '';
		
		if(!SCHEDA.scheda2Aperta){
			var nTsuboGiu = (nTsubo)+"";
			if(nTsuboGiu.length == 1)nTsuboGiu = "0"+nTsuboGiu;
			var nTsuboSu = (nTsubo+2)+"";
			if(nTsuboSu.length == 1)nTsuboSu = "0"+nTsuboSu;
			// evidenzio i pulsanti su e giù
			
			if(nTsubo*1 > 0){ // attiva giù
				classFr += "frGiu ";
				document.getElementById("frSchGiu").onclick = function(){
					SET.apriTsubo(siglaMeridiano+"."+nTsuboGiu,'');
				};
			}
			if(nTsubo*1 < meridiano.tsubo.length-1){ // attiva su
				classFr += "frSu ";
				document.getElementById("frSchSu").onclick = function(){
					SET.apriTsubo(siglaMeridiano+"."+nTsuboSu,'');
				};
			}
		}
		document.getElementById("frSch").className = classFr;
	},
	mod_nota: function( Q_nome_meridiano, Q_p ){	 // salva la nota di uno tsubo
		var nota_salvata=false;
		var DataModifica = DB.note.lastSync+1;
		var pDef=-1;
		var Q_TestoAnnotazione = document.getElementById("TestoAnnotazione").value;
		for (p in DB.note.data) {
			if(DB.note.data.length && typeof(DB.note.data[p].meridiano)=='undefined')DB.note.data.splice(p,p);
			else if(DB.note.data[p].meridiano==Q_nome_meridiano && DB.note.data[p].numeroTsubo==Q_p && SET.verNotaCli(p)){
				DB.note.data[p].TestoAnnotazione=Q_TestoAnnotazione;
				DB.note.data[p].DataModifica=parseInt(DataModifica);
				nota_salvata=true;
				pDef=p;
			}
		}
		if(!nota_salvata && Q_TestoAnnotazione.trim()!=''){
			var idPaziente=-1;
			if(PAZIENTI.idCL>-1)idPaziente=PAZIENTI.idPaziente;
			console.log(idPaziente)
			JSNPUSH={	"TestoAnnotazione": Q_TestoAnnotazione,
						"meridiano": Q_nome_meridiano,
						"numeroTsubo": Q_p*1,
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
			LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
								'document.getElementById("pulsantiAnnotazione").style.display="none";' );
			SET.leggiNote();
		});
	},
	verNotaCli: function( p ){
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
	leggiNota: function( mr, pt ){
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
	leggiNote: function(){
		SET.evidenziaNote(false);
		SET.note = [];
		if(DB.note){
			for(n in DB.note.data){
				var pass =false;
				if(DB.note.data[n].idPaziente > -1){
					if(DB.note.data[n].idPaziente == PAZIENTI.idPaziente)pass=true;
				}else{
					if(DB.note.data[n].idCL == PAZIENTI.idCL)pass=true;
				}
				if(pass){
					var mr ='';
					var pt = DB.note.data[n].numeroTsubo + "";
					if(pt.length == 1)pt='0'+pt;
					mr = SET.leggiSiglaMeridiano(DB.note.data[n].meridiano);
					if(DB.note.data[n].TestoAnnotazione.trim()!='')SET.note.push(mr+"."+pt);
				}
			}	
		}
		SET.evidenziaNote(true);
	},
	evidenziaNote: function( az ){
		for(n in SET.note){
			var pP = SET.note[n].split(".");
			for(m in SETS.children){
				if(SETS.children[m].name.substr(0,5) == 'PT_'+pP[0]){
					for(p in SETS.children[m].children){
						if(SETS.children[m].children[p].name.substr(0,5)==SET.note[n]){
							var mr = SETS.children[m].children[p].name.substr(0,2);
							var mat = SET.MAT.pointBase;
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
	verificaNota: function( n ){
		return SET.note.indexOf(n)>-1;
	},
	leggiSiglaMeridiano: function( cartella ){
		for(k in DB.set.meridiani){
			if(DB.mtc.meridiani[k].cartella == cartella)return k;
		}
	},
	azRicercaTsubo: function( pt ){
		SET.apriTsubo(pt);
		evidenziaParola();
	}
}