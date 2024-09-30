var agenda = {

	opened: false,
	appuntamenti: [],
	orarioDef: null,
	elBut: null,
	elCont: null,
	elemento: null,
	contCal: null,
	calFunct: null,
	DataPartenza: -1,
	oraMin: 0,
	oraMax: 24,
	zIndex: 10,
	inTratt: false, // indica che l'agenda è aperta in un trattamento
	elDrag: null,
	moved: false,
	posIni: -1,
	posAtt: -1,
	posDiff: 0,
	heightIni: 0,
	tipoDrag: '',
	tt: null,
	db: null,
	newInizio: -1,
	newFine: -1,
	scrollY: -1,
	tm: null,
	tmGlobal: null,
	provv: {
		oraInizio: -1,
		oraFine: -1
	},
	elTimeList: null,
	elTimeSel: null,
	overTimeBox: null,
	minStep: 1, // durata minima dell'appuntamento in step da 5 minuti (1 = 5min, 2 = 10min)

	init: function(){
		this.oraInizio=-1;
		this.oraFine=-1;
		this.giornoInizio=-1;
		this.giornoFine=-1;
		this.elInizio=null;
		this.elFine=null;
		this.orarioDef=null;
		this.inTratt = false;
		this.newInizio = -1;
		this.newFine = -1;
		SCHEDA.verRedim();
	},
	selOra: function( h, g ){
		if(this.oraFine != h || this.giornoFine != g){
			this.oraInizio = h;
			this.giornoInizio = g;
			this.oraFine = h+12;
			this.giornoFine = g;
			this.elFine = document.getElementById("day_"+g).getElementsByTagName("div")[(h-this.oraMin)*2+24];
			
			if(this.retFunct==null){
				this.orarioDef = {
					data: this.giornoInizio,
					oraInizio: this.oraInizio,
					oraFine: this.oraFine
				}
				if(this.retFunct){
					eval(this.retFunct+"('"+JSON.stringify(this.orarioDef)+"',agenda.elBut)");
					this.chiudi();
				}else{
					agenda.modificaAppuntamento();
				}
			}else{
				if(!document.getElementById("inLavorazione"))this.modificaOrarioTrattamento();
			}
		}
	},
	modificaAppuntamento: function( d, a ){ // modifica l'appuntamento
		let TestoAppuntamento = "",
			idCli = -1,
			idPaziente = -1,
			idApp = -1,
			idAppuntamento = -1,
			tit = TXT("AggiungiAppuntamento");
		if(typeof(a)!='undefined'){
			TestoAppuntamento = this.appuntamenti[d][a].TestoAppuntamento;
			idCli = __(this.appuntamenti[d][a].idCli,-1);
			idPaziente = __(this.appuntamenti[d][a].idPaziente,-1);
			if(!idCli)idCli = -1;
			if(!idPaziente)idPaziente = -1;
			idApp = this.appuntamenti[d][a].idApp;
			idAppuntamento = this.appuntamenti[d][a].idAppuntamento;
			this.orarioDef = {
				data: this.appuntamenti[d][a].data,
				oraInizio: this.appuntamenti[d][a].timeInizio,
				oraFine: this.appuntamenti[d][a].timeFine
			}
			agenda.giornoInizio = this.appuntamenti[d][a].data;
			agenda.oraInizio = this.appuntamenti[d][a].timeInizio;
			agenda.oraFine = this.appuntamenti[d][a].timeFine;
			tit = TXT("ModificaAppuntamento")
		}
		applicaLoading(document.getElementById("ag"));
		document.getElementById("cont_sceltaAppuntamento").classList.add("visSch");
		let HTML = '<p><b>'+tit+'</b></p>';
		let txtData = '<img src="img/ico_agendaM.png" style="vertical-align:middle;"> ';


		txtData += '<span id="dataAgenda" onClick="agenda.swCal(\'cont_sceltaAppuntamento\',\'agenda.aggiornaDataAppuntamento\');">'+getDataTS(this.orarioDef.data/1000)+'</span>';




		let timeBox = 
			'<input class="inputTimeBox"' +
			'		id="[id]"' +
			'		value="[value]"' +
			'		data-t="[t]"' +
			'		placeholder="hh : mm"' +
			'		onFocus="agenda.visTime(this);"' +
			'		onKeyUp="agenda.verTime(this);"' +
			'		onKeyDown="agenda.memTime(this);"' +
			'		onMouseOver="agenda.overTimeBox=this;"' +
			'		onMouseOut="agenda.overTimeBox=null;"' +
			H.noAutoGen + '/>';
			
		txtData += 
			'<img src="img/ico_time.png" width="18" height="18" onClick="agenda.selTime(this);" id="icoTime"/>' +
			timeBox.replace("[id]","time1").replace("[value]",agenda.tToTime(this.orarioDef.oraInizio)).replace("[t]",this.orarioDef.oraInizio) +
			'<img src="img/frTime.png" width="24" height="30" id="frTime"/>' +
			timeBox.replace("[id]","time2").replace("[value]",agenda.tToTime(this.orarioDef.oraFine)).replace("[t]",this.orarioDef.oraFine) +
			'<input type="hidden" name="oI" id="oI" value="'+this.orarioDef.oraInizio+'">' +
			'<input type="hidden" name="oF" id="oF" value="'+this.orarioDef.oraFine+'">';

		HTML += '<p>'+txtData+'</p>' +
				'<div class="contCal" id="calAppuntamento"></div>' +
				'<div id="app_generico"' +
				'	  class="visSch">' +
				'	<div>' +
				'		<input id="TestoAppuntamento"' +
				'			   name="TestoAppuntamento"' +
				'			   class="okPlaceHolder"' +
				'			   type="text"' +
				'			   placeholder="'+htmlEntities(TXT("GenericoAppSpiegazione")) +'"' +
				'			   value="'+htmlEntities(TestoAppuntamento)+'">' +
				'		<input id="idApp"' +
				'			   name="idApp"' +
				'			   type="hidden"' +
				'			   value="'+idApp+'">' +
				'		<input id="idAppuntamento"' +
				'			   name="idAppuntamento"' +
				'			   type="hidden"' +
				'			   value="'+idAppuntamento+'">' +
				'		<input id="idCli"' +
				'			   name="idCli"' +
				'			   type="hidden"' +
				'			   value="'+idCli+'">' +
				'		<input id="idPaziente"' +
				'			   name="idPaziente"' +
				'			   type="hidden"' +
				'			   value="'+idPaziente+'">' +
				'		<input id="oraInizioAppuntamento"' +
				'			   name="oraInizioAppuntamento"' +
				'			   type="hidden"' +
				'			   value="'+agenda.oraInizio+'">' +
				'		<input id="oraFineAppuntamento"' +
				'			   name="oraFineAppuntamento"' +
				'			   type="hidden"' +
				'			   value="'+agenda.oraFine+'">' +
				'		<input id="dataAppuntamento"' +
				'			   name="dataAppuntamento"' +
				'			   type="hidden"' +
				'			   value="'+agenda.giornoInizio+'">' +
				'	</div>' +
				'</div>' +
				'<p id="app_cliente_btn"' +
				'	  class="visSch">' +
				'	<span class="btnSw"' +
				'		  onClick="agenda.swClientiApp();">' +
						htmlEntities(TXT("AppuntamentoCliente")) +
				'	</span>' +
				'</p>' +
				'<div id="app_cliente">' +
				'	<div id="app_ricerca">' +
				'		<input id="app_ricerca_testo"' +
				'			   class="okPlaceHolder"' +
				'			   onKeyUp="agenda.filtraClienti();"' +
				'			   placeholder="'+htmlEntities(TXT("ClientiAppSpiegazione"))+'">' +
				'		<img src="img/chMenu.png"' +
				'			 class="chCliApp"' +
				'			 onClick="agenda.swClientiApp();">' +
				'	</div>' +
				'	<div id="app_elenco">' +
				'	</div>' +
				'		<img src="img/chMenuB.png"' +
				'			 id="chCliApp_scelto"' +
				'			 class="chCliApp"' +
				'			 onClick="agenda.popolaScelta();agenda.swClientiApp();">';
		if(idApp>-1)HTML +=
				'	<div class="converti"' +
				'		  onClick="agenda.convertiTrattamento();">' +
						htmlEntities(TXT("AppuntamentoConverti")) +
				'	</div>';
		HTML += '</div>';
		if(idApp>-1)HTML +=
				'<p><span id="app_elimina" onClick="agenda.eliminaAppuntamento('+idApp+');">' +
					htmlEntities(TXT("EliminaAppuntamento")) +
				'</span></p>';
		HTML += '<p style="text-align:right;margin-bottom: 0px;"><span class="submitBtn annullaBtn" onClick="agenda.chiudiScelta();">' +
					htmlEntities(TXT("Annulla")) +
				'</span><span class="submitBtn salvaBtn" onClick="agenda.salvaAppuntamento();">' +
					htmlEntities(TXT("Salva")) +
				'</span></p>';
		document.getElementById("cont_sceltaAppuntamento").innerHTML = HTML;
		this.popolaScelta(idCli,idPaziente);
		if(idCli>-1 || idPaziente>-1)agenda.swClientiApp();
	},
	eliminaAppuntamento: function( idApp ){ // elimina l'appuntamento
		CONFIRM.vis(	TXT("ChiediEliminaAppuntamento"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			DB.appuntamenti.data[idApp].Cancellato = 1;
			DB.appuntamenti.data[idApp].DataModifica = DB.appuntamenti.lastSync+1;
			let postAction = 'MENU.visAgenda('+(agenda.DataPartenza*1)+',true);';
			agenda.chiudiScelta();
			applicaLoading(document.getElementById("ag"));
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)).then(function(){ // salvo il DB
				SYNCRO.sincronizza(	'rimuoviLoading(document.getElementById("ag"));' +
									postAction );
			});
		}});
	},
	aggiornaDataAppuntamento: function( val ){
		document.getElementById("dataAppuntamento").value = val*1;
		document.getElementById("dataAgenda").innerHTML = getDataTS(val*1/1000);
		agenda.orarioDef.data = val*1;
		agenda.chiudiCalendario();
	},
	swClientiApp: function(){ // mostra nasconde la lista clienti
		document.getElementById("app_cliente").classList.toggle("visSch");
		document.getElementById("app_cliente_btn").classList.toggle("visSch");
	},
	popolaScelta: function( Q_id=-1, Q_idPaziente=-1 ){ // popola il popup di modifica di un appuntameno
		if(Q_idPaziente){
			for(let p in DB.pazienti.data){
				if(DB.pazienti.data[p].idPaziente*1==Q_idPaziente*1)Q_id=p*1;
			}
		}
		let HTML = '';
		if(Q_id == -1){
					'<div class="app_top"></div>';
			for(let p in DB.pazienti.data){
				if(DB.pazienti.data[p].Cancellato*1!=1){
					HTML += '<div onClick="agenda.popolaScelta('+p+','+DB.pazienti.data[p].idPaziente+');">' +
								htmlEntities(DB.pazienti.data[p].Nome+" "+DB.pazienti.data[p].Cognome) +
							'</div>';
				}
			}
			document.getElementById("app_cliente").classList.remove( 'clienteScelto');
			document.getElementById("TestoAppuntamento").placeholder = stripslashes(TXT("GenericoAppSpiegazione"));
		}else{
			HTML += '<div class="torna"' +
					'	  onClick="agenda.popolaScelta();">' +
						htmlEntities(DB.pazienti.data[Q_id].Nome+" "+DB.pazienti.data[Q_id].Cognome) +
					'</div>';
			document.getElementById("app_cliente").classList.add( 'clienteScelto');
			document.getElementById("TestoAppuntamento").placeholder = stripslashes(TXT("GenericoAppLabel"));
		}
		document.getElementById("app_elenco").innerHTML = HTML;
		document.getElementById("app_elenco").scrollTo(0,0);
		if(Q_id == -1 && mouseDetect)document.getElementById("app_ricerca_testo").focus();
		document.getElementById("idCli").value = Q_id;
		document.getElementById("idPaziente").value = Q_idPaziente;
	},
	convertiTrattamento: function(){ // converte l'elemento d'agenda in appuntamento
		CONFIRM.vis(	TXT("ChiediConvertire"),
						false,
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			let DataModifica = DB.pazienti.lastSync+1;
			JSNPUSH={	"idTrattamento": 0,
						"TitoloTrattamento": document.getElementById("TestoAppuntamento").value,
						"NoteTrattamento": '',
						"jsonValutazione": {},
						"TimeTrattamento": parseInt(document.getElementById("dataAppuntamento").value)/1000,
						"oraInizio": document.getElementById("oraInizioAppuntamento").value*1,
						"oraFine": document.getElementById("oraFineAppuntamento").value*1,
						"Anamnesi": '',
						"DiagnosiOccidentale": '',
						"DiagnosiMTC": '',
						"Prescrizione": '',
						"ConsiderazioniOperatore": '',
						"ConsiderazioniPaziente": '',
						"puntiMTC": [],
						"puntiAuricolari": [],
						"puntiNamikoshi": [],
						"puntiTrigger": [],
						"diagnosiAI": "",
						"sintomi": [],
						"meridiani": [],
						"gallery": [],
						"DataCreazione": parseInt(DataModifica),
						"DataModifica": parseInt(DataModifica),
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 0,
						"Cancellato": 0,
						"frv": (LOGIN._frv()!='') };
			let idTratt = DB.pazienti.data[document.getElementById("idCli").value*1].trattamenti.length;
			DB.pazienti.data[document.getElementById("idCli").value*1].trattamenti.push(JSNPUSH);
			DB.appuntamenti.data[document.getElementById("idApp").value*1].Cancellato = 1;
			DB.appuntamenti.data[document.getElementById("idApp").value*1].DataModifica = DB.appuntamenti.lastSync+1;
			
			/* let postAction = 	'SCHEDA.apriElenco(\'base\');' +
								'SCHEDA.selElenco(\'pazienti\');' +
								'PAZIENTI.selPaziente('+(document.getElementById("idCli").value*1)+');' +
								'setTimeout( function(){' +
								'	PAZIENTI.car_trattamento('+idTratt+',document.getElementById("btn_trattamento_'+idTratt+'"),"",false,-1);' +
								'},200)'; */
								
			document.getElementById("cont_sceltaAppuntamento").style.opacity = 0;
			Promise.all([
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)),
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti))
			]).then(function(){
				SYNCRO.sincronizza(	'agenda.popolaAgenda(new Date(agenda.DataPartenza),agenda.contCal,agenda.calFunct);' );
			});
		}});
	},
	filtraClienti: function(){ // filtra i clienti del popup di modifica dell'appuntamento
		let parola = document.getElementById("app_ricerca_testo").value.toLowerCase().trim(),
			els = document.getElementById("app_elenco").getElementsByTagName("div");
		for(let e=0;e<els.length;e++){
			if(!els[e].classList.contains("app_top") && els[e].id!='app_ricerca'){
				if(els[e].innerText.toLowerCase().indexOf(parola)>-1 || !parola){
					els[e].style.display = 'block';
				}else{
					els[e].style.display = 'none';
				}
			}
		}
	},
	salvaAppuntamento: function(){ // conferma e salva l'elemento in agenda
		if(	!document.getElementById("TestoAppuntamento").value.trim()/*  && 
			document.getElementById("idCli").value=='-1' */){
			ALERT(stripslashes(TXT("ErroreTestoApp")));
			return;
		}
		let DataModifica = DB.appuntamenti.lastSync+1,
			DataCreazione = 0;
		if(document.getElementById("idApp").value!='-1')DataCreazione = DB.appuntamenti.data[document.getElementById("idApp").value*1].DataCreazione;
		if(!DataCreazione)DataCreazione = DataModifica;
		let TimeAppuntamento = 0,
			oraInizio = 0,
			oraFine = 0;
		if(agenda.orarioDef){
			TimeAppuntamento = agenda.orarioDef.data;
			oraInizio = agenda.orarioDef.oraInizio;
			oraFine = agenda.orarioDef.oraFine;
		}else if(document.getElementById("idApp").value){
			let pP = document.getElementById("idApp").value.split("|");
			TimeAppuntamento = pP[0]*1;
			oraInizio = pP[1]*1;
			oraFine = pP[2]*1;
		}
		
		JSNPUSH={ 	"TestoAppuntamento": document.getElementById("TestoAppuntamento").value,
					"TimeAppuntamento": TimeAppuntamento,
					"oraInizio": oraInizio,
					"oraFine": oraFine,
					"DataModifica": parseInt(DataModifica),
					"DataCreazione": parseInt(DataCreazione),
					"idAppuntamento": parseInt(document.getElementById("idAppuntamento").value),
					"idCli": parseInt(document.getElementById("idCli").value),
					"idPaziente": parseInt(document.getElementById("idPaziente").value),
					"Cancellato": 0,
					"frv": (LOGIN._frv()!='') };
					
		if(document.getElementById("idApp").value!='-1'){
			DB.appuntamenti.data[ +document.getElementById("idApp").value ]=JSNPUSH;
		}else{
			// nuovo appuntamento
			DB.appuntamenti.data.push(JSNPUSH);
		}
		let postAction = 'MENU.visAgenda('+TimeAppuntamento+',true);';
		agenda.scrollY = document.getElementById("agCont").scrollTop;
		agenda.chiudiScelta();
		applicaLoading(document.getElementById("ag"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)).then(function(){ // salvo il DB
			SYNCRO.sincronizza(	'rimuoviLoading(document.getElementById("ag"));' +
								postAction );
		});
	},
	chiudiScelta: function( noAnnulla=false ){ // chiude il popup di modifica dell'appuntamento
		rimuoviLoading(document.getElementById("ag"));
		document.getElementById("cont_sceltaAppuntamento").classList.remove("visSch");
		document.getElementById("cont_sceltaAppuntamento").innerHTML = '';
	},
	swCal: function( id, funct ){ // apre e chiude il calendario nelle schede appuntamento e trattamento
		if(agenda.contCal==agenda.elemento)agenda.popolaCalendario( agenda.DataPartenza.getFullYear(), agenda.DataPartenza.getMonth(), document.getElementById(id), funct );
		else agenda.chiudiCalendario();
	},
	popolaCalendario: function( Y, M, cont=agenda.elemento, funct=null ){ // popola il calendario
		agenda.contCal = cont;
		agenda.calFunct = funct;
		let HTML = '<div id="calCont">';
		Y1=Y;
		M1=M+1;
		if(M1==12){
			M1=0;
			Y1++;
		}
		Y2=Y;
		M2=M-1;
		if(M2<0){
			M2=11;
			Y2--;
		}
		if(M==12){
			M=0;
			Y++;
		}
		d=new Date(Y,M,1,0,0,0,0);
		d.setDate(d.getDate());
		HTML +=	'<div class="chiudiCal"' +
				'	  onClick="agenda.chiudiCalendario();"></div>' +
				'<div id="calTesta">' +
				'	<div id="calPre"' +
				'	 	  onClick="agenda.popolaCalendario('+Y2+','+M2+',agenda.contCal,agenda.calFunct)">' +
				'		<svg><polyline points="20.875,31.75 9.125,20 20.875,8.25 "/></svg>' +
				'	</div>' +
				'		<div class="calMese">' +
							DB.TXT.base.nomiMesi[globals.siglaLingua][d.getMonth()].toUpperCase()+" "+d.getFullYear() +
				'		</div>' +
				'	<div id="calNext"' +
				'		  onClick="agenda.popolaCalendario('+Y1+','+M1+',agenda.contCal,agenda.calFunct)">' +
				'		<svg><polyline points="9.125,31.75 20.875,20 9.125,8.25 "/></svg>' +
				'	</div>' +
				'</div>';
		HTML += '<div class="calCont">'	+
				'	<div class="calInt">';
		for(let g=1;g<=7;g++){
			gg=g;
			if(gg==7)gg=0;
			HTML += '	<div' + ((g>5) ? ' class="festivo"' : '') + '>'+
							DB.TXT.base.nomiGiorni[globals.siglaLingua][gg].substr(0,3).toUpperCase() +
					'	</div>';
		}
		HTML += '	</div>' +
				'	<div class="calGiorni">';
		let gT=0;
		for(let t = d.getMonth(); d.getMonth() === t; ){
			if(d.getDate()==1){
				let dd=d.getDay();
				if(dd==0)dd=7;
				for(r=1;r<dd;r++){
					HTML += '<div class="calInact"></div>';
					gT++;
				}
			}
			HTML += '<div onClick="';
			if(agenda.contCal==agenda.elemento)HTML += 'agenda.popolaAgenda(new Date('+(d*1)+'),agenda.contCal,agenda.calFunct);';
			else HTML += agenda.calFunct+'(new Date('+(d*1)+'));';
			HTML += '"';
			if(d*1==this.giornoInizio*1)HTML+=' class="hSel"';
			
			let pieno=0;
			for(let h=0;h<288;h++){
				for(a in this.appuntamenti[d*1]){
					if(	h>=this.appuntamenti[d*1][a].timeInizio && 
						h<this.appuntamenti[d*1][a].timeFine){
						pieno++;
					}
				}
			}
			let limite = 20,
				perc=((100*pieno)/288);
			if(perc)perc = (limite + (((100-limite)*perc)/100))/100;
			HTML += ' style="border-bottom:4px solid rgba(255,101,36,'+perc+');"'
			HTML += '>'+d.getDate()+'</div>';
			d.setDate(d.getDate() + 1);
				gT++;
		}
		while(gT<42){
			HTML += '<div class="calInact"></div>';	
			gT++;
		}
		HTML += '</div>';
		agenda.contCal.querySelector(".contCal").innerHTML = HTML;
		
		if(this.retFunct!=null)applicaLoading(document.getElementById("scheda_testo"),'vuoto');
		else applicaLoading(document.getElementById("ag"),'vuoto');
		agenda.contCal.querySelector(".contCal").classList.add("visSch");
		SWIPE.dismis();
		SWIPE.init('calCont','calCont','document.getElementById(\'calPre\').click();','document.getElementById(\'calNext\').click();');
	},
	chiudiCalendario: function(){ // chiude il calendario
		if(agenda.contCal==agenda.elemento){
			if(this.retFunct!=null)rimuoviLoading(document.getElementById("scheda_testo"),'vuoto');
			else rimuoviLoading(document.getElementById("ag"),'vuoto');
		}
		agenda.contCal.querySelector(".contCal").classList.remove("visSch");
		agenda.contCal.querySelector(".contCal").innerHTML = '';
		SWIPE.init('agendaPlaceHolder','agendaOre','document.getElementById(\'agendaPre\').click();','document.getElementById(\'agendaNext\').click();');
		agenda.contCal = agenda.elemento;
		agenda.calFunct = null;
	},
	popolaAgenda:function( DataPartenza, elemento ){ // popola l'agenda
		let icoUtente = '<img src="img/ico_utenteN.png" style="width: 16px;vertical-align: middle;margin-top: -3px;">',
			d = new Date();
		
		this.DataPartenza = DataPartenza;
		this.elemento = elemento;
		if(this.oraInizio>-1 && this.oraFine==-1){
			this.oraInizio=-1;
			this.elInizio=null;
		}
		DataPartenza = new Date(DataPartenza.getFullYear(), DataPartenza.getMonth(), DataPartenza.getDate(), 0,0,0,0);
		
		d = DataPartenza;
		giorno=d.getDate();
		mese=DB.TXT.base.nomiMesi[globals.siglaLingua][d.getMonth()].toLowerCase();
		anno=d.getFullYear();
		nomeGiorno=d.getDay();
		festivo=false;
		if(d.getDay()==0 || d.getDay()==6)festivo=true;
		let dd=LINGUE.formatDate.replace(/\//," ").replace(/\//," ");
		
		
		let HTML = 
				'<div id="agendaCont">'+
				'	<div id="agendaTesta">' + // calendario e frecce
				'		<div id="agendaPre">' +
				'			<svg><polyline points="20.875,31.75 9.125,20 20.875,8.25 "/></svg>' +
				'		</div>' +
				'		<div class="agendaInt'+(festivo ? ' agendaFestivo' : '')+'"' +
				'			 onClick="agenda.popolaCalendario( agenda.DataPartenza.getFullYear(),' +
				'											   agenda.DataPartenza.getMonth());">' +
				'			<p>'+htmlEntities(DB.TXT.base.nomiGiorni[globals.siglaLingua][nomeGiorno])+'</p>' +
				'			<p>' +
								dd.replace(/%D/,'<span class="agendaGiorno">'+giorno+'</span>').replace(/%M/,mese).replace(/%Y/,anno) +
								'<img src="img/frGiuB_mini.png">' +
							'</p>' +
				'		</div>' +
				'		<div id="agendaNext">' +
				'			<svg><polyline points="9.125,31.75 20.875,20 9.125,8.25 "/></svg>' +
				'		</div>' +
				'	</div>' +
				'	<div id="agenda">';
		HTML += '<div class="agendaCol"' +
				'	  id="day_'+(d*1)+'">' +
				'	<div></div>' +
				'	<div class="agendaOre"' + // contenitore delle ore
				'		 id="agOr0">';
		for(let h=this.oraMin;h<this.oraMax;h++){ // elenco le ore
			HTML += '<div>' +
					'	<span>'+h+'</span><span onClick="agenda.selOra('+(h*12)+','+(d*1)+');"></span>' +
					'</div>' +
					'<div>' +
					'	<span class="brdBtmSp"></span><span onClick="agenda.selOra('+(h*12+6)+','+(d*1)+');"></span>' +
					'</div>';
		}

		let occ = [],
			maxLiv = 0;
		for(let o=0;o<288;o++)occ[o]=0;

		for(a in this.appuntamenti[d*1]){
			let add_clsG = ''
				id = '',
				scost = 30,
				maxStep = 0,
				height = 0,
				lavorata = false,
				cnt = __(this.appuntamenti[d*1][a].TestoAppuntamento);

			if(	this.appuntamenti[d*1][a].Nominativo){
				cnt += ' <i class="nTAg">'+icoUtente+this.appuntamenti[d*1][a].Nominativo+'</i>';
			}

			if(__(this.appuntamenti[d*1][a].idApp,-1)>-1)add_clsG+='Gen';
			if(__(this.appuntamenti[d*1][a].inLavorazione)){
				id=' id="inLavorazione"';
				lavorata = true;
			}
			for(let o=this.appuntamenti[d*1][a].timeInizio;o<this.appuntamenti[d*1][a].timeFine;o++){
				if(occ[o]>maxStep)maxStep=occ[o];
				occ[o]++;
			}
			if(maxStep>maxLiv)maxLiv = maxStep;
			scost += maxStep*20+2;
			height = ((4*(this.appuntamenti[d*1][a].timeFine-this.appuntamenti[d*1][a].timeInizio))-2);
			if(height<16)height=16;
			HTML += '<div class="elApp elAppSt timeFull'+add_clsG+'"' +
					id +
					'	  data-liv="'+maxStep+'"' +
					'	  data-ini="'+this.appuntamenti[d*1][a].timeInizio+'"' +
					'	  data-fin="'+this.appuntamenti[d*1][a].timeFine+'"' +
					'	  style="width: calc(100% - '+(scost+2)+'px);'+
					'			 left:'+scost+'px;' +
					'			 top:'+((this.appuntamenti[d*1][a].timeInizio*4)-1)+'px;"' +
					(!document.getElementById("scheda").classList.contains("visSch") ? '	  onMouseOver="if(!agenda.moved){agenda.zIndex++;this.style.zIndex=agenda.zIndex;}"' : '') +
					'	  data-id="'+(__(this.appuntamenti[d*1][a].idTratt,'')==''?__(this.appuntamenti[d*1][a].idApp,'0'):this.appuntamenti[d*1][a].idTratt)+'"' +
					'	  data-idcl="' +(__(this.appuntamenti[d*1][a].idCL,'')?this.appuntamenti[d*1][a].idCL:'')+'">' +
					'	<span style="height:'+height+'px;"' +
					'	  	  onMouseDown="agenda.startDrag(this.parentElement,\'drag\');"' +
					'	  	  onTouchStart="agenda.startDrag(this.parentElement,\'drag\');"' +
						(!this.retFunct ? ' onClick="agenda.gestisciAppuntamento('+(d*1)+','+a+');"' : '')+'>' +
							cnt +
					'	</span>' +
					'	<span class="resizer_cont">';
			if(!document.getElementById("scheda").classList.contains("visSch"))HTML += 
					'		<span onMouseDown="agenda.startDrag(this.parentElement.parentElement,\'resize\');"' +
					'	  	  	  onTouchStart="agenda.startDrag(this.parentElement.parentElement,\'resize\');"></span>';
			HTML += '	</span>' +
					'</div>';
		}


		// aggiungo l'elemento provvisorio
		if(this.inTratt){
			if(parseInt(document.getElementById("TimeTrattamento").value)==this.DataPartenza.getTime()/1000){
				let scost = 30,
					maxStep = 4,
					oraInizio = parseInt(document.getElementById("oraInizio").value),
					oraFine = parseInt(document.getElementById("oraFine").value),
					cnt = '<img src="img/ico_time.png" width="18" height="18" style="margin-top:-3px;margin-right:5px;vertical-align:middle;"><i id="ttLav">' +
						(parseInt(oraInizio/12)+':'+twoDigits(parseInt(oraInizio%12)*5)) + " - "+
						(parseInt(oraFine/12)+':'+twoDigits(parseInt(oraFine%12)*5)) +
					'</i>';
				scost += maxStep*20+2;
				if(document.getElementById("oraInizio").value!='-1'){
					HTML +=
						'<div class="elApp"' +
						'	  id="inLavorazione"' +
						'	  style="width: calc(100% - 30px);' +
						'			 left:20px;' +
						'			 top:'+((oraInizio*4)-1)+'px;">' +
						'	<span style="height:'+(4*(oraFine-oraInizio)-3)+'px;"' +
						'	  	  onMouseDown="agenda.startDrag(this.parentElement,\'drag\');"' +
						'	  	  onTouchStart="agenda.startDrag(this.parentElement,\'drag\');"' +
						' 		  onClick="agenda.modificaOrarioTrattamento(true);">' +
								cnt +
						'	</span>' +
						'	<span class="resizer_cont">' +
						'		<span onMouseDown="agenda.startDrag(this.parentElement.parentElement,\'resize\');"' +
						'	  	  	  onTouchStart="agenda.startDrag(this.parentElement.parentElement,\'resize\');"></span>' +
						'	</span>' +
						'</div>';
				}
			}
		}

		// linea rossa del momento attuale
		let adesso = new Date();
		if(	agenda.DataPartenza.getFullYear()==adesso.getFullYear() &&
			agenda.DataPartenza.getMonth()==adesso.getMonth() &&
			agenda.DataPartenza.getDate()==adesso.getDate()){
			
			let pos = ((adesso.getHours()*60 + adesso.getMinutes())/5*4);
			HTML += '<div id="lineaAdesso"style="top:'+pos+'px;"><span></span></div>';
		}

		HTML += '</div></div>';
		HTML += '</div></div><div class="contCal" id="calAgenda"></div>';


		this.elemento.innerHTML=HTML;
		elemento.className='agOp';
		document.getElementById("agendaPre").onclick=function(){
			agenda.popolaAgenda(DataPartenza.addDays(-1),elemento);
		};
		document.getElementById("agendaNext").onclick=function(){
			agenda.popolaAgenda(DataPartenza.addDays(1),elemento);
		};
		agenda.chiudiCalendario();
		if(document.getElementById("inLavorazione")){
			document.querySelector('.agendaCol').scrollTop = tCoord(document.getElementById("inLavorazione"),'y')-250;
			document.querySelector('.agendaCol').classList.add("lavorata");
		}else if(agenda.scrollY>-1){
			document.getElementById("agCont").scrollTo(0,agenda.scrollY);
			//agenda.scrollY = 0;
		}else{
			if(document.getElementById("lineaAdesso")){
				document.getElementById('agCont').scrollTop = tCoord(document.getElementById("lineaAdesso"),'y')-250;
			}
		}
		
		// controllo e setto i rientri per non far coprire completamente gli appuntamenti
		let els = document.querySelector(".agendaCol").getElementsByClassName("elAppSt");
		for(let e=0;e<els.length;e++){
			let ini = parseInt(els[e].dataset.ini),
				fin = parseInt(els[e].dataset.fin)
				maxRie = 0;
			for(let n=ini;n<=fin;n++){
				if(occ[n]>maxRie)maxRie = occ[n];
			}
			if(maxRie)maxRie--;
			if(maxRie)els[e].style.width = 'calc(100% - '+(34+(maxRie*20))+'px)';
		}


	},
	verGlobal: function(){ // verifiche ogni minuto sull'agenda
		 // verifica che sia in corso un appuntamento
		let adesso = new Date(),
			adessoStr = adesso.getFullYear()+"-"+adesso.getMonth()+"-"+adesso.getDate(),
			oggi = new Date(adesso.getFullYear()+"-"+(adesso.getMonth()+1)+"-"+adesso.getDate()),
			adessoTime = adesso*1,
			act = false;

		// verifico i trattamenti
		for(let i in DB.pazienti.data){
			for(let t in DB.pazienti.data[i].trattamenti){
				if(!DB.pazienti.data[i].trattamenti[t].Cancellato){
					let time = new Date(DB.pazienti.data[i].trattamenti[t].TimeTrattamento*1000);
						timeStr = time.getFullYear()+"-"+time.getMonth()+"-"+time.getDate();
					if(	adessoStr==timeStr &&
						adesso*1>=oggi*1+DB.pazienti.data[i].trattamenti[t].oraInizio*5*60*1000 &&
						adesso*1<oggi*1+DB.pazienti.data[i].trattamenti[t].oraFine*5*60*1000){
						act = true;
					}
				}
			}
		}

		// verifico gli appuntamenti generici
		/* for(let i in DB.appuntamenti.data){
			if(!DB.appuntamenti.data[i].Cancellato){
				let time = new Date(DB.appuntamenti.data[i].TimeAppuntamento);
					timeStr = time.getFullYear()+"-"+time.getMonth()+"-"+time.getDate();
				if(	adessoStr==timeStr &&
					adesso*1>=oggi*1+DB.appuntamenti.data[i].oraInizio*5*60*1000 &&
					adesso*1<oggi*1+DB.appuntamenti.data[i].oraFine*5*60*1000){
					act = true;
				}
			}
		} */
		document.getElementById("notificaAgenda").classList.toggle("pallinoAgenda", act);

		// risistema la posizione della linea rossa
		if(document.getElementById("lineaAdesso")){
			let adesso = new Date(),
				pos = ((adesso.getHours()*60 + adesso.getMinutes())/5*4);
			document.getElementById("lineaAdesso").style.top = pos+'px';
			if(agenda.DataPartenza.getDate()!=adesso.getDate()){
				document.querySelector(".agendaOre").removeChild(document.getElementById("lineaAdesso"));
			}
		}
	},
	apri:function( DataPartenza, elemento, funct, el, Q_idTratt=-1 ){ // apre e compone l'agenda
		
		this.opened = true;
		this.inTratt = false;
		
		// creo l'oggetto appuntamenti
		this.retFunct=funct;
		this.elBut=el;
		this.elCont=elemento;
		agenda.contCal = elemento;
		let d = null;
		if(el.dataset.d)d=JSON.parse(el.dataset.d);
		this.init();
		if(Q_idTratt!=-1)this.inTratt = true;
		this.appuntamenti=[];
		if(d){
			this.orarioDef=d;
			this.giornoInizio=d.data;
			this.giornoFine=d.data;
			this.oraInizio=d.oraInizio;
			this.oraFine=d.oraFine-0.5;
			if(this.oraFine<-1)this.oraFine=-1;
		}
		
		// popolo agenda.appuntamenti con i trattamenti
		for(let i in DB.pazienti.data){
			for(let t in DB.pazienti.data[i].trattamenti){
				if(!DB.pazienti.data[i].trattamenti[t].Cancellato){
					if(!this.appuntamenti[DB.pazienti.data[i].trattamenti[t].TimeTrattamento*1000])this.appuntamenti[DB.pazienti.data[i].trattamenti[t].TimeTrattamento*1000]=[];
					let oraInizio = -1,
						oraFine = -1;
					if(typeof(DB.pazienti.data[i].trattamenti[t].oraInizio)!='undefined')oraInizio=DB.pazienti.data[i].trattamenti[t].oraInizio;
					if(oraInizio<this.oraMin)oraInizio=this.oraMin+24;
					if(typeof(DB.pazienti.data[i].trattamenti[t].oraFine)!='undefined')oraFine=DB.pazienti.data[i].trattamenti[t].oraFine; 
					if(oraFine<this.oraMin)oraFine=this.oraMin+36;
					JSNPUSH = {
						"idCL": i,
						"idTratt": t,
						"TestoAppuntamento": DB.pazienti.data[i].trattamenti[t].TitoloTrattamento,
						"Nominativo": DB.pazienti.data[i].Nome+" "+DB.pazienti.data[i].Cognome,
						"timeInizio": oraInizio,
						"timeFine": oraFine
					}
					if(!(PAZIENTI.idCL==i && t==Q_idTratt))this.appuntamenti[DB.pazienti.data[i].trattamenti[t].TimeTrattamento*1000].push(JSNPUSH);
				}
			}
		}

		// popolo agenda.appuntamenti con gli appuntamenti
		for(let i in DB.appuntamenti.data){
			if(!DB.appuntamenti.data[i].Cancellato){
				if(!this.appuntamenti[DB.appuntamenti.data[i].TimeTrattamento])this.appuntamenti[DB.appuntamenti.data[i].TimeTrattamento]=[];
				let oraInizio = -1,
					oraFine = -1;
				if(typeof(DB.appuntamenti.data[i].oraInizio)!='undefined')oraInizio=DB.appuntamenti.data[i].oraInizio;
				if(oraInizio<this.oraMin)oraInizio=this.oraMin+24;
				if(typeof(DB.appuntamenti.data[i].oraFine)!='undefined')oraFine=DB.appuntamenti.data[i].oraFine; 
				if(oraFine<this.oraMin)oraFine=this.oraMin+36;
				let idCli = DB.appuntamenti.data[i].idCli,
					Nominativo = '';
				if(!idCli){
					for(let p in DB.pazienti.data){
						if(DB.pazienti.data[p].idPaziente*1==DB.appuntamenti.data[i].idPaziente*1)idCli = p;
					}
				}
				if(DB.pazienti.data[idCli])Nominativo = DB.pazienti.data[idCli].Nome+" "+DB.pazienti.data[idCli].Cognome
				JSNPUSH = {
					"TestoAppuntamento": DB.appuntamenti.data[i].TestoAppuntamento,
					"data": DB.appuntamenti.data[i].TimeAppuntamento,
					"timeInizio": oraInizio,
					"timeFine": oraFine,
					"idApp": i*1,
					"idAppuntamento": DB.appuntamenti.data[i].idAppuntamento*1,
					"idCli": idCli,
					"Nominativo": Nominativo,
					"idPaziente": DB.appuntamenti.data[i].idPaziente
				}
				if(!this.appuntamenti[DB.appuntamenti.data[i].TimeAppuntamento])this.appuntamenti[DB.appuntamenti.data[i].TimeAppuntamento] = []
				this.appuntamenti[DB.appuntamenti.data[i].TimeAppuntamento].push(JSNPUSH);
			}
		}
		this.popolaAgenda(DataPartenza,elemento);
		elemento.className='agOp';
	},
	chiudi:function(){ // chiude l'agenda
		this.orarioDef = null;
		this.opened = false;
		agenda.init();
		this.elCont.className = '';
		setTimeout(function(){if(!agenda.opened)agenda.elCont.innerHTML='';},600);
		SWIPE.dismis();
	},
	gestisciAppuntamento: function( d, a ){ // a seconda che sia un apuntamento o un trattamento reindirizza
		if(this.oraInizio>-1 || agenda.moved)return;
		let app = this.appuntamenti[d*1][a*1];
		if(	typeof(app.idCL) != 'undefined' && 
			typeof(app.idTratt) != 'undefined'){
			PAZIENTI.selPaziente(app.idCL);
			idTratt = app.idTratt;
			setTimeout( function(){ 
				document.getElementById("btn_trattamento_"+idTratt).click();
				let cartella = document.getElementById("btn_trattamento_"+idTratt).parentElement.parentElement;
				if(cartella.classList.contains("cartella")){
					PAZIENTI.setCartOp(cartella.getElementsByTagName("span")[0]);
					SCHEDA.swCartella(cartella.getElementsByTagName("span")[0]);
				}
				MENU.chiudiMenu();
				SCHEDA.apriElenco('base');
				SCHEDA.selElenco('pazienti');
			},200, idTratt);
		}else if(typeof(app.TestoAppuntamento) != 'undefined'){
			this.modificaAppuntamento( d, a );
		}
	},
	modificaOrarioTrattamento: function( mod=false ){ // modifica l'orario del trattamento
		if(agenda.moved)return;
		applicaLoading(document.getElementById("scheda_testo"));
		document.getElementById("cont_sceltaAppuntamento").classList.add("visSch");
		let HTML = '<p><b>'+TXT("OrarioTrattamento")+'</b></p>',
			oraInizio = parseInt(document.getElementById("oraInizio").value),
			oraFine = parseInt(document.getElementById("oraFine").value),
			d = parseInt(document.getElementById("TimeTrattamento").value)*1000;
		if(!mod){
			oraInizio = this.oraInizio;
			oraFine = oraInizio+12;
			d = agenda.giornoInizio;
		}
		let txtData = '<img src="img/ico_agendaM.png" style="vertical-align:middle;"> ';

		txtData += '<span id="dataAgenda" onClick="agenda.swCal(\'cont_sceltaAppuntamento\',\'agenda.aggiornaDataTrattamento\');">'+getDataTS(d/1000)+'</span> ';



		
		let timeBox = 
			'<input class="inputTimeBox"' +
			'		id="[id]"' +
			'		value="[value]"' +
			'		data-t="[t]"' +
			'		placeholder="hh : mm"' +
			'		onFocus="agenda.visTime(this);"' +
			'		onKeyUp="agenda.verTime(this);"' +
			'		onKeyDown="agenda.memTime(this);"' +
			'		onMouseOver="agenda.overTimeBox=this;"' +
			'		onMouseOut="agenda.overTimeBox=null;"' +
			H.noAutoGen + '/>';
			
		txtData += 
			'<img src="img/ico_time.png" width="18" height="18" onClick="agenda.selTime(this);" id="icoTime"/>' +
			timeBox.replace("[id]","time1").replace("[value]",agenda.tToTime(oraInizio)).replace("[t]",oraInizio) +
			'<img src="img/frTime.png" width="24" height="30" id="frTime"/>' +
			timeBox.replace("[id]","time2").replace("[value]",agenda.tToTime(oraFine)).replace("[t]",oraFine) +
			'<input type="hidden" name="oI" id="oI" value="'+oraInizio+'">' +
			'<input type="hidden" name="oF" id="oF" value="'+oraFine+'">';

		txtData += '<input type="hidden" id="dT" name="dT" value="'+d+'">';


		HTML += '<p>'+txtData+'</p>' +
				'<div class="contCal" id="calTrattamento"></div>' +
				'<div id="app_generico"' +
				'	  class="visSch">' +
				'</div>' +
				'<p style="text-align:right;margin-bottom: 0px;"><span id="cancellaOrario" onClick="agenda.scegliOrarioTrattamento(true);"></span><span class="submitBtn annullaBtn" id="annullaOrario" onClick="agenda.chiudiScelta(true);">' +
					htmlEntities(TXT("Annulla")) +
				'</span><span class="submitBtn salvaBtn" onClick="agenda.scegliOrarioTrattamento();">' +
					htmlEntities(TXT("Salva")) +
				'</span></p>';
		document.getElementById("cont_sceltaAppuntamento").innerHTML = HTML;
		document.getElementById("cont_sceltaAppuntamento").style.left = ((tCoord(document.getElementById("scheda_testo"))+document.getElementById("scheda_testo").scrollWidth/2)-200)+'px';
	},
	aggiornaDataTrattamento: function( val ){ // setta la data del trattamento
		document.getElementById("dT").value = val*1;
		document.getElementById("dataAgenda").innerHTML = getDataTS(val*1/1000);
		agenda.chiudiCalendario();
	},
	scegliOrarioTrattamento: function( cancella=false ){ // setta l'orario del trattamento
		this.orarioDef = {
			data: parseInt(document.getElementById("dT").value),//this.DataPartenza.getTime(),
			oraInizio: cancella ? -1 : parseInt(document.getElementById("oI").value),
			oraFine: cancella ? -1 : parseInt(document.getElementById("oF").value)
		};
		eval(this.retFunct+"('"+JSON.stringify(this.orarioDef)+"',agenda.elBut,"+(cancella?"true":"false")+")");
		agenda.chiudiScelta();
		document.getElementById("dataTxt").click();
		if(!cancella){
			setTimeout(function(){
				document.getElementById("dataTxt").click();
			},400);
		}
	},
	verOrari: function( el ){ // verifica che oraInizio sia prima di oraFine
		let oI = parseInt(document.getElementById("oI").value),
			oF = parseInt(document.getElementById("oF").value),
			errore = false;
		if((el.id=='oI' && oI>oF-3) || (el.id=='oF' && oF<oI+3))errore = true;
		if(errore){
			ALERT("Non puoi inserire appuntamenti minori di 15 minuti");
			oF = oI+3;
			document.getElementById("oF").value = oF;
		}
		if(agenda.orarioDef){
			agenda.orarioDef.oraInizio = oI;
			agenda.orarioDef.oraFine = oF;
		}
	},
	startDrag: function( el, tipo ){ // inizia a spostare l'appuntamento
		if(document.getElementById("scheda").classList.contains("visSch") && el.id!='inLavorazione')return;
		if(touchable && !event.touches){
			agenda.oraInizio = -1;
			return;
		}
		agenda.elDrag = el;
		agenda.tipoDrag = tipo;
		agenda.posIni = touchable ? event.touches[ 0 ].pageY : event.clientY;
		agenda.posAtt = agenda.posIni;
		agenda.posDiff = 0;
		agenda.heightIni = el.getElementsByTagName("span")[0].scrollHeight;
		if(agenda.inTratt){
			agenda.provv.oraInizio = parseInt(document.getElementById("oraInizio").value);
			agenda.provv.oraFine = parseInt(document.getElementById("oraFine").value);
		}
		if(!touchable){
			window.addEventListener("mouseup", agenda.stopDrag ,false);
			window.addEventListener("mousemove", agenda.moveDrag ,false);
		}else{
			window.addEventListener("touchend", agenda.stopDrag ,false);
			window.addEventListener("touchmove", agenda.moveDrag ,false);
		}
		agenda.tm = setTimeout(function(){
			agenda.attDrag(true);
		},600);
	},
	attDrag: function( forza=false ){
		if((Math.abs(agenda.posDiff)>2 && !agenda.tt) || forza){
			clearTimeout(agenda.tm);
			agenda.tm = null;
			agenda.moved = true;
			if(!agenda.inTratt){
				agenda.tt = document.createElement('div');
				agenda.tt.id = 'ttAgenda';
				agenda.elDrag.appendChild(agenda.tt);
			}else{
				agenda.tt = document.getElementById("ttLav");
			}
			agenda.elDrag.classList.add("eviDrag");
			agenda.elDrag.classList.add("evi_"+agenda.tipoDrag);
			if(touchable){
				document.body.classList.add("noScroll");
				if(!agenda.inTratt)document.getElementById("agCont").classList.add("noScroll");
				else{
					document.querySelector(".agendaCol").classList.add("noScroll");
					document.getElementById("scheda_testo").classList.add("noScroll");
				}
			}
		}
		if(agenda.moved && agenda.tt){
			let id = agenda.elDrag.dataset.id,
				idCL = agenda.elDrag.dataset.idcl;
			if(idCL)agenda.db = DB.pazienti.data[idCL].trattamenti[id];
			else{
				if(!agenda.inTratt)agenda.db = DB.appuntamenti.data[id];
				else agenda.db = agenda.provv;
			}
			let diffOre = agenda.db.oraFine-agenda.db.oraInizio;
			if(agenda.tipoDrag=='drag'){
				agenda.newInizio = agenda.db.oraInizio+Math.round(agenda.posDiff/4);
				agenda.newFine = agenda.newInizio + diffOre;
			}
			if(agenda.tipoDrag=='resize'){
				agenda.newInizio = agenda.db.oraInizio;
				agenda.newFine = agenda.newInizio + parseInt(agenda.elDrag.scrollHeight/4);
				if(touchable){
					if(!agenda.inTratt)agenda.newFine-=2;
					else agenda.newFine-=3;
				}
				if(agenda.elDrag.id=='inLavorazione')agenda.newFine += 1;
			}
			agenda.tt.innerHTML = parseInt(agenda.newInizio/12)+":"+twoDigits(parseInt(agenda.newInizio%12)*5)+" - " +
								  parseInt(agenda.newFine/12)+":"+twoDigits(parseInt(agenda.newFine%12)*5);
		}
	},
	moveDrag: function( event ){ // sposta appuntamento
		if(touchable && !agenda.moved)agenda.stopDrag();
		if(!agenda.moved && touchable)return;
		agenda.posAtt = touchable ? event.changedTouches[ 0 ].pageY : event.clientY;
		agenda.posDiff = agenda.posAtt-agenda.posIni;
		if(agenda.tipoDrag=='drag'){
			if(parseInt(agenda.elDrag.style.top.replace("px",""))+agenda.posDiff<=0){
				agenda.posDiff = (0-parseInt(agenda.elDrag.style.top.replace("px","")));
			}
			if(parseInt(agenda.elDrag.style.top.replace("px",""))+agenda.posDiff>1152-agenda.elDrag.scrollHeight){
				agenda.posDiff = 1152-parseInt(agenda.elDrag.style.top.replace("px",""))-agenda.elDrag.scrollHeight;
			}
			agenda.elDrag.style.marginTop = agenda.posDiff+'px';
		}
		if(agenda.tipoDrag=='resize'){
			if(parseInt(agenda.elDrag.style.top.replace("px",""))+agenda.elDrag.scrollHeight>1152){
				agenda.posDiff = 1152-parseInt(agenda.elDrag.style.top.replace("px",""))-agenda.heightIni;
			}
			let newHeight = agenda.heightIni+agenda.posDiff;
			if(newHeight<16)newHeight = 16;
			agenda.elDrag.getElementsByTagName("span")[0].style.height = newHeight+'px';
		}
		agenda.attDrag();
	},
	stopDrag: function( event='' ){ // fissa appuntamento
		if(event)agenda.posAtt = touchable ? event.changedTouches[ 0 ].pageY : event.clientY;	
		if(!touchable){
			window.removeEventListener("mouseup", agenda.stopDrag ,false);
			window.removeEventListener("mousemove", agenda.moveDrag ,false);
		}else{
			window.removeEventListener("touchend", agenda.stopDrag ,false);
			window.removeEventListener("touchmove", agenda.moveDrag ,false);
			document.body.classList.remove("noScroll");
			if(!agenda.inTratt)document.getElementById("agCont").classList.remove("noScroll");
			else{
				document.querySelector(".agendaCol").classList.remove("noScroll");	
				document.getElementById("scheda_testo").classList.remove("noScroll");
			}	
		}
		clearTimeout(agenda.tm);
		agenda.tm = null;
		setTimeout(function(){
			if(!agenda.inTratt && agenda.tt)agenda.elDrag.removeChild(agenda.tt);
			agenda.elDrag.classList.remove("eviDrag");
			agenda.elDrag.classList.remove("evi_"+agenda.tipoDrag);
			agenda.elDrag = null;
			agenda.db = null;
			agenda.tt = null;
			agenda.tipoDrag = '';
			agenda.posIni = -1;
			agenda.posAtt = -1;
			agenda.heightIni = -1;
			agenda.newInizio = -1;
			agenda.newFine = -1;
			agenda.moved = false;
		},200);
		if(agenda.moved && !(agenda.db.oraInizio==agenda.newInizio && agenda.db.oraFine==agenda.newFine)){
			// aggiorno l'appuntamento
			applicaLoading(document.getElementById("ag"));
			agenda.db.oraInizio = agenda.newInizio;
			agenda.db.oraFine = agenda.newFine;
			
			if(!agenda.inTratt){
				agenda.scrollY = document.getElementById("agCont").scrollTop;
				let postAction = 'rimuoviLoading(document.getElementById("ag"));agenda.verGlobal();/* MENU.visAgenda('+(agenda.DataPartenza*1)+',true); */';
				if(agenda.elDrag.dataset.idcl){
					agenda.db.DataModifica = DB.pazienti.lastSync+1;
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
						SYNCRO.sincronizza(	postAction );
					});
				}else{
					agenda.db.DataModifica = DB.appuntamenti.lastSync+1;
					localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)).then(function(){ // salvo il DB
						SYNCRO.sincronizza(	postAction );
					});
				}
			}else{
				document.getElementById("oraInizio").value = agenda.provv.oraInizio;
				document.getElementById("oraFine").value = agenda.provv.oraFine;
				agenda.orarioDef.oraInizio = agenda.provv.oraInizio;
				agenda.orarioDef.oraFine = agenda.provv.oraFine;
				let ripos = agenda.provv.oraInizio * 4;
				agenda.elDrag.style.top = ripos+'px';
				let resize = (agenda.provv.oraFine-agenda.provv.oraInizio) * 4 - 4;
				agenda.elDrag.getElementsByTagName("span")[0].style.height = resize+'px';
				agenda.elDrag.style.marginTop = '0px';
				eval(agenda.retFunct+"('"+JSON.stringify(agenda.orarioDef)+"',agenda.elBut)");
			}
		}else{
			// riporta in posizione iniziale
			agenda.elDrag.style.marginTop = '0px';
			agenda.elDrag.getElementsByTagName("span")[0].style.height = agenda.heightIni+'px';
		}
	},

	/* TIME BOXES */
	timeToT: function( time ){ // converte il time (hh:mm) in unità di tempo
		let pT = time.split(":");
		return parseInt(pT[0]*12+pT[1]/5);
	},
	tToTime: function( t ){ // converte l'unità di tempo in time
		let o = parseInt(t/12),
			m = twoDigits((t%12) * 5);
		return o+":"+m;
	},
	selTime: function( el ){ // al focus sul campo time
		el.focus();
	},
	visTime: function( el ){ // visualizza la lista degli orari al clic sul time
		if(agenda.elTimeSel != el && agenda.elTimeSel){
			agenda.nasTime(el);
		}
		if(agenda.elTimeList)document.body.removeChild(agenda.elTimeList);
		agenda.elTimeSel = el;
		if(!touchable)el.select();
		el.classList.add('sel');
		agenda.elTimeList = document.createElement('div');
		agenda.elTimeList.id = "elTimeList";
		agenda.elTimeList.style.top = (tCoord(el,'y')+el.scrollHeight+4)+'px';
		agenda.elTimeList.style.left = tCoord(el)+'px';
		agenda.elTimeList.onmouseover = function(){
			agenda.overTimeBox = agenda.elTimeSel;
		}
		agenda.elTimeList.onmouseout = function(){
			agenda.overTimeBox = null;
		}
		let ini = 0
			fin = 289,
			altra = null;	
		/* if(el.id=="time1"){
			altra = document.getElementById("time2");
			if(altra.dataset.t)fin = parseInt(altra.dataset.t)-agenda.minStep;
		}else{
			altra = document.getElementById("time1");
			if(altra.dataset.t)ini = parseInt(altra.dataset.t)+agenda.minStep;
		} */
		if(el.id=="time2"){
			altra = document.getElementById("time1");
			if(altra.dataset.t)ini = parseInt(altra.dataset.t)+agenda.minStep;
		}
		if(ini<0)ini=0;
		if(fin>289)fin=289;
		if(el.id=="time1")fin = 285;
		for(let t=ini;t<fin;t++){
			let o = parseInt(t/12),
				m = twoDigits((t%12) * 5);
				agenda.elTimeList.innerHTML +='<span onMouseDown="agenda.setTime(this,'+t+');">'+o+":"+m+'</span>';
		}
		document.body.appendChild(agenda.elTimeList);
		el.dataset.inivalue = el.value;
		//el.placeholder = el.value;
		el.value = '';
		setTimeout(function(){window.addEventListener("mouseup",agenda.nasTime);},200);
		agenda.verTime(agenda.elTimeSel);
	},
	nasTime: function( el ){ // al blur sul campo time setta i valori e chiude la lista
		if(agenda.overTimeBox==agenda.elTimeSel)return;
		agenda.elTimeSel.classList.remove('sel');
		document.body.removeChild(agenda.elTimeList);
		window.removeEventListener("mouseup",agenda.nasTime);
		let Filtro = /^[0-9]{1,2}\:[0-9]{1}[05]{1}$/;
		agenda.elTimeSel.classList.toggle("error",!Filtro.test(agenda.elTimeSel.value));

		let t = '';
		if(agenda.elTimeSel.value && !agenda.elTimeSel.classList.contains("error")){
			t = agenda.timeToT(agenda.elTimeSel.value);
		}
		//if(agenda.timeToT(document.getElementById("time1").value)>agenda.timeToT(document.getElementById("time2").value)-3)agenda.elTimeSel.classList.add("error");
		agenda.elTimeSel.dataset.t = t;
		if(agenda.timeToT(document.getElementById("time1").value)>agenda.timeToT(document.getElementById("time2").value)-agenda.minStep){
			document.getElementById("time2").dataset.t = parseInt(document.getElementById("time1").dataset.t)+agenda.minStep;
			document.getElementById("time2").value = agenda.tToTime(parseInt(document.getElementById("time1").dataset.t)+agenda.minStep);
		}
		if(agenda.elTimeSel.id=='time1')document.getElementById("oI").value = agenda.elTimeSel.dataset.t;
		if(agenda.elTimeSel.id=='time2')document.getElementById("oF").value = agenda.elTimeSel.dataset.t;
		agenda.verOrari(agenda.elTimeSel);
		if(agenda.elTimeSel.classList.contains("error")){
			agenda.elTimeSel.value = agenda.elTimeSel.dataset.inivalue;
			agenda.elTimeSel.classList.remove("error");
		}
		agenda.elTimeSel.dataset.inivalue = '';
		agenda.elTimeList = null;
		agenda.elTimeSel = null;
	},
	memTime: function( el ){ // memorizza in dataset il valore del campo
		el.dataset.mem = el.value;
	},
	verTime: function( el ){ // verifica il formato di time
		let els = agenda.elTimeList.getElementsByTagName("span"),
			visibili = 0,
			h = smartMenu ? 40 : 30;
		el.value = el.value.replace(".",":");
		let Filtro1 = /^[0-9]{1,2}$/,
			Filtro2 = /^[0-9]{1,2}\:$/,
			Filtro3 = /^[0-9]{1,2}\:[0-9]{1}[05]{0,1}$/,
			Filtro4 = /^[0-9]{1,2}\:[0-9]{1}[05]{1}$/;
		if(	el.value.trim() &&
			!Filtro1.test(el.value) && 
			!Filtro2.test(el.value) && 
			!Filtro3.test(el.value) )el.value = el.dataset.mem;
		
		for(let e=0;e<els.length;e++){
			if(els[e].innerHTML.indexOf(el.value)==-1){
				els[e].classList.add("hidden");
			}else{
				els[e].classList.remove("hidden");
				visibili++;
			}
		}
		agenda.elTimeSel.classList.toggle("error",	!visibili ||
													!Filtro4.test(el.value) || 
													agenda.timeToT(document.getElementById("time1").value)>agenda.timeToT(document.getElementById("time2").value)-agenda.minStep );


		if(visibili<5)agenda.elTimeList.style.height = (h*visibili)+'px';
		else agenda.elTimeList.style.height = (h*5)+'px';
		if(event.keyCode==13){
			agenda.overTimeBox = null;
			agenda.elTimeSel.blur();
			agenda.nasTime(agenda.elTimeSel);
		}
	},
	setTime: function( el, t ){ // al clic sulla voce nella lista orari
		agenda.overTimeBox = null;
		agenda.elTimeSel.value = el.innerHTML;
		agenda.elTimeSel.dataset.t = t;
		agenda.nasTime(agenda.elTimeSel);
	}

}