var agendaOp=false;
var agenda = {
	appuntamenti:[],
	orarioDef:null,
	elBut:null,
	elCont:null,
	msgContinua:'<i class="txtSel" style="margin-top:2px;">'+stripslashes(TXT("FinoAlle"))+'</i>',
	btnConferma:'<button onClick="agenda.conferma();">'+stripslashes(TXT("Conferma"))+'</button><button onClick="agenda.annulla();">'+TXT("Annulla")+'</button>',
	txtConferma:"",
	imgSpunta:'<img src="img/f_spunta.png" width="20" height="20" align="right">',
	elemento:null,
	oIor:-1,
	oFor:-1,
	gIor:-1,
	lastSel:-1,
	DataPartenza:-1,
	oraMin: 0,
	oraMax: 24,
	init:function(){
		this.oraInizio=-1;
		this.oraFine=-1;
		this.giornoInizio=-1;
		this.giornoFine=-1;
		this.elInizio=null;
		this.elFine=null;
		this.orarioDef=null;
		SCHEDA.verRedim();
	},
	keyup: function( event ){
		if(event.keyCode==27){
			if(agenda.lastSel>-1){
				if(agenda.oraInizio>-1 && agenda.oraFine==-1){
					var dvs=document.getElementById("day_"+agenda.giornoInizio).getElementsByTagName("div");
					var st=false;
					for(let k=agenda.oraInizio;k<=agenda.lastSel;k+=0.5){
						if( dvs[(k-agenda.oraMin)*2+2].className.indexOf('timeFull')>-1)st=true;
						if(!st){
							dvs[(k-agenda.oraMin)*2+2].className='';
							dvs[(k-agenda.oraMin)*2+2].getElementsByTagName("span")[1].innerHTML='';
						}
					}
				}
				agenda.lastSel=-1
			}
			agenda.init();
			document.removeEventListener("keyup", agenda.keyup, false );
		}
	},
	selOra:function( h, g ){
		if(this.oraFine != h || this.giornoFine != g){
			if(this.oraInizio>-1 && this.oraFine>-1){
				this.orarioDef=null;
				if(document.getElementById("day_"+this.giornoInizio) && this.oraInizio>=this.oraMin && this.oraInizio<=this.oraMax){
					document.getElementById("day_"+this.giornoInizio).getElementsByTagName("div")[(this.oraInizio-this.oraMin)*2+2].getElementsByTagName("span")[1].innerHTML='';
					document.getElementById("day_"+this.giornoInizio).getElementsByTagName("div")[(this.oraFine-this.oraMin)*2+2].getElementsByTagName("span")[1].innerHTML='';
					for(let k=this.oraInizio;k<=this.oraFine;k+=0.5){
						document.getElementById("day_"+this.giornoInizio).getElementsByTagName("div")[(k-this.oraMin)*2+2].className='';
					}
				}
				this.init();
			}
			if(h<this.oraInizio || this.giornoInizio!=g || this.oraInizio==-1){
				document.addEventListener("keyup", agenda.keyup, false );
				if(this.elInizio){
					this.elInizio.className='';
					if(document.getElementById("day_"+this.giornoInizio))document.getElementById("day_"+this.giornoInizio).getElementsByTagName("div")[(this.oraInizio-this.oraMin)*2+2].getElementsByTagName("span")[1].innerHTML='';
				}
				this.oraInizio=h;
				this.giornoInizio=g;
				this.elInizio=document.getElementById("day_"+g).getElementsByTagName("div")[(h-this.oraMin)*2+2];
				this.elInizio.className='hSel';
				document.getElementById("day_"+g).getElementsByTagName("div")[(this.oraInizio-this.oraMin)*2+2].getElementsByTagName("span")[1].innerHTML=this.msgContinua;
			}else{
				document.removeEventListener("keyup", agenda.keyup, false );
				this.oraFine=h;
				this.giornoFine=g;
				this.elFine=document.getElementById("day_"+g).getElementsByTagName("div")[(h-this.oraMin)*2+2];
				
				if(this.retFunct==null){
					this.conferma();
				}else{
					pass=true;
					for(let k=this.oraInizio;k<=this.oraFine;k+=0.5){
						var row = document.getElementById("day_"+g).getElementsByTagName("div")[(k-this.oraMin)*2+2];
						if(row.className.indexOf('timeFull')>-1){
							if(pass)this.oraFine=k-0.5;
							pass=false;
						}
						if(pass)document.getElementById("day_"+g).getElementsByTagName("div")[(k-this.oraMin)*2+2].className='hSel';
					}
					this.lastSel=this.oraFine;
					document.getElementById("day_"+g).getElementsByTagName("div")[(this.oraInizio-this.oraMin)*2+2].getElementsByTagName("span")[1].innerHTML='';
					oI=this.oraInizio+"";
					if(oI.indexOf(".")>-1)oI=oI.substr(0,oI.indexOf("."))+":30";
					else oI=oI+":00";
					
					oF=(this.oraFine+0.5)+"";
					if(oF.indexOf(".")>-1)oF=oF.substr(0,oF.indexOf("."))+":30";
					else oF=oF+":00";
					this.txtConferma='<i class="nCAg">'+oI+" - "+oF+"?</i> ";
					document.getElementById("day_"+g).getElementsByTagName("div")[(this.oraFine-this.oraMin)*2+2].getElementsByTagName("span")[1].innerHTML=this.txtConferma+this.btnConferma;
				}
			}
		}
	},
	conferma:function(){
		if(this.lastSel==-1)this.lastSel = this.oraFine;
		this.orarioDef = {
			data: this.giornoInizio,
			oraInizio: this.oraInizio,
			oraFine: this.lastSel+0.5
		}
		document.getElementById("day_"+this.giornoInizio).getElementsByTagName("div")[(this.oraFine-this.oraMin)*2+2].getElementsByTagName("span")[1].innerHTML=this.imgSpunta;
		if(this.retFunct){
			eval(this.retFunct+"('"+JSON.stringify(this.orarioDef)+"',agenda.elBut)");
			this.chiudi();
		}else{
			agenda.modificaAppuntamento();
		}
	},
	modificaAppuntamento: function( d, a ){
		var TestoAppuntamento = "";
		var idCli = -1;
		var idPaziente = -1;
		var idApp = -1;
		var idAppuntamento = -1;
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
		}
		
		applicaLoading(document.getElementById("ag"));
		document.getElementById("cont_sceltaAppuntamento").classList.add("visSch");
		var HTML = '<p><b>'+TXT("AggiungiAppuntamento")+'</b></p>';
		oI=this.orarioDef.oraInizio+"";
		if(oI.indexOf(".")>-1)oI=oI.substr(0,oI.indexOf("."))+":30";
		else oI=oI+":00";
		
		oF=(this.orarioDef.oraFine)+"";
		if(oF.indexOf(".")>-1)oF=oF.substr(0,oF.indexOf("."))+":30";
		else oF=oF+":00";
		var txtData = TXT("AggiungiAppuntamentoDati");
		txtData = txtData.replace("[g]",getDataTS(this.orarioDef.data/1000));
		txtData = txtData.replace("[1]",oI);
		txtData = txtData.replace("[2]",oF);
		HTML += '<p>'+txtData+'</p>' +
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
				'</span><span class="submitBtn salvaBtn" onClick="agenda.scegli();">' +
					htmlEntities(TXT("Salva")) +
				'</span></p>';
		document.getElementById("cont_sceltaAppuntamento").innerHTML = HTML;
		this.popolaScelta(idCli,idPaziente);
		if(idCli>-1 || idPaziente>-1)agenda.swClientiApp();
	},
	eliminaAppuntamento: function( idApp ){
		CONFIRM.vis(	TXT("ChiediEliminaAppuntamento"),
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			DB.appuntamenti.data[idApp].Cancellato = 1;
			DB.appuntamenti.data[idApp].DataModifica = DB.appuntamenti.lastSync+1;
			var postAction = 'MENU.visAgenda('+(agenda.DataPartenza*1)+',true);';
			agenda.chiudiScelta();
			applicaLoading(document.getElementById("ag"));
			localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)).then(function(){ // salvo il DB
				LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("ag"));' +
									postAction );
			});
		}});
	},
	swClientiApp: function(){
		document.getElementById("app_cliente").classList.toggle("visSch");
		document.getElementById("app_cliente_btn").classList.toggle("visSch");
	},
	popolaScelta: function( Q_id=-1, Q_idPaziente=-1 ){
		if(Q_idPaziente){
			for(let p in DB.pazienti.data){
				if(DB.pazienti.data[p].idPaziente*1==Q_idPaziente*1)Q_id=p*1;
			}
		}
		var HTML = '';
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
	convertiTrattamento: function(){
		CONFIRM.vis(	TXT("ChiediConvertire"),
						false,
						arguments ).then(function(pass){if(pass){
						var v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			var DataModifica = DB.pazienti.lastSync+1;
			JSNPUSH={	"idTrattamento": 0,
						"TitoloTrattamento": document.getElementById("TestoAppuntamento").value,
						"TimeTrattamento": parseInt(document.getElementById("dataAppuntamento").value)/1000,
						"oraInizio": document.getElementById("oraInizioAppuntamento").value*1,
						"oraFine": document.getElementById("oraFineAppuntamento").value*1,
						"TestoTrattamento": '',
						"Prescrizione": '',
						"puntiTsuboMap": "[]",
						"puntiAuriculoMap": "[]",
						"puntiNamikoshi": "[]",
						"sintomi": "[]",
						"meridiani": "[]",
						"gallery": "[]",
						"DataCreazione": parseInt(DataModifica),
						"DataModifica": parseInt(DataModifica),
						"LabelCiclo": "",
						"TipoTrattamento": "B",
						"CostoTrattamento": 0,
						"Cancellato": 0,
						"frv": (LOGIN._frv()!='') };
			var idTratt = DB.pazienti.data[document.getElementById("idCli").value*1].trattamenti.length;
			DB.pazienti.data[document.getElementById("idCli").value*1].trattamenti.push(JSNPUSH);
			DB.appuntamenti.data[document.getElementById("idApp").value*1].Cancellato = 1;
			DB.appuntamenti.data[document.getElementById("idApp").value*1].DataModifica = DB.appuntamenti.lastSync+1;
			
			var postAction = 	'SCHEDA.apriElenco(\'base\');' +
								'SCHEDA.selElenco(\'pazienti\');' +
								'PAZIENTI.selPaziente('+(document.getElementById("idCli").value*1)+');' +
								'setTimeout( function(){' +
								'	PAZIENTI.car_trattamento('+idTratt+',document.getElementById("btn_trattamento_'+idTratt+'"),"",false,-1);' +
								'},200)';
								
			document.getElementById("cont_sceltaAppuntamento").style.opacity = 0;
			Promise.all([
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)),
				localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti))
			]).then(function(){
				LOGIN.sincronizza(	'MENU.visAgenda();' +
									postAction );
			});
		}});
	},
	filtraClienti: function(){
		var parola = document.getElementById("app_ricerca_testo").value.toLowerCase().trim();
		var els = document.getElementById("app_elenco").getElementsByTagName("div");
		for(e=0;e<els.length;e++){
			if(!els[e].classList.contains("app_top") && els[e].id!='app_ricerca'){
				if(els[e].innerText.toLowerCase().indexOf(parola)>-1 || !parola){
					els[e].style.display = 'block';
				}else{
					els[e].style.display = 'none';
				}
			}
		}
	},
	scegli: function(){
		if(	!document.getElementById("TestoAppuntamento").value.trim() && 
			document.getElementById("idCli").value=='-1'){
			ALERT(stripslashes(TXT("ErroreTestoApp")));
			return;
		}
		var DataModifica = DB.appuntamenti.lastSync+1;
		var DataCreazione = 0;
		if(document.getElementById("idApp").value!='-1')DataCreazione = DB.appuntamenti.data[document.getElementById("idApp").value*1].DataCreazione;
		if(!DataCreazione)DataCreazione = DataModifica;
		if(agenda.orarioDef){
			TimeAppuntamento = agenda.orarioDef.data;
			oraInizio = agenda.orarioDef.oraInizio;
			oraFine = agenda.orarioDef.oraFine;
		}else if(document.getElementById("idApp").value){
			var pP = document.getElementById("idApp").value.split("|");
			var TimeAppuntamento = pP[0]*1;
			var oraInizio = pP[1]*1;
			var oraFine = pP[2]*1;
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
			// appuntamento esistente
			for(let p in DB.appuntamenti.data){
				if(	TimeAppuntamento == DB.appuntamenti.data[p].TimeAppuntamento && 
					oraInizio == DB.appuntamenti.data[p].oraInizio &&
					oraFine == DB.appuntamenti.data[p].oraFine ){
						DB.appuntamenti.data[p]=JSNPUSH;
					}
			}
		}else{
			// nuovo appuntamento
			DB.appuntamenti.data.push(JSNPUSH);
		}
		var postAction = 'MENU.visAgenda('+(agenda.DataPartenza*1)+',true);';
		agenda.chiudiScelta();
		applicaLoading(document.getElementById("scheda_testo"));
		localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".appuntamenti"), IMPORTER.COMPR(DB.appuntamenti)).then(function(){ // salvo il DB
			LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("ag"));' +
								postAction );
		});
	},
	chiudiScelta: function(){
		rimuoviLoading(document.getElementById("ag"));
		document.getElementById("cont_sceltaAppuntamento").classList.remove("visSch");
		document.getElementById("cont_sceltaAppuntamento").innerHTML = '';
		this.annulla(true);
	},
	popolaCalendario:function( Y, M ){
		var HTML = '<div id="calCont">';
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
				'	 	  onClick="agenda.popolaCalendario('+Y2+','+M2+')">' +
				'		<svg><polyline points="20.875,31.75 9.125,20 20.875,8.25 "/></svg>' +
				'	</div>' +
				'		<div class="calMese">' +
							DB.TXT.base.nomiMesi[globals.siglaLingua][d.getMonth()].toUpperCase()+" "+d.getFullYear() +
							//d.toLocaleDateString(s,{month:"long"}).toUpperCase()+" "+d.getFullYear() +
				'		</div>' +
				'	<div id="calNext"' +
				'		  onClick="agenda.popolaCalendario('+Y1+','+M1+')">' +
				'		<svg><polyline points="9.125,31.75 20.875,20 9.125,8.25 "/></svg>' +
				'	</div>' +
				'</div>';
		var s=globals.siglaLingua.substr(0,2)+"-"+globals.siglaLingua.substr(0,2).toUpperCase();
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
		var gT=0;
		for(let t = d.getMonth(); d.getMonth() === t; ){
			if(d.getDate()==1){
				var dd=d.getDay();
				if(dd==0)dd=7;
				for(r=1;r<dd;r++){
					HTML += '<div class="calInact"></div>';
					gT++;
				}
			}
			HTML += '<div onClick="agenda.popolaAgenda(new Date('+(d*1)+'),agenda.elemento);"';
			if(d*1==this.giornoInizio*1)HTML+=' class="hSel"';
			
			var pieno=0;
			for(let h=16;h<44;h++){
				for(a in this.appuntamenti[d*1]){
					if(	h*0.5>=this.appuntamenti[d*1][a].timeInizio && 
						h*0.5<this.appuntamenti[d*1][a].timeFine){
						pieno++;
					}
				}
			}
			var limite = 20;
			var perc=((100*pieno)/28);
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
		//HTML += '</div></div>';
		this.elemento.querySelector(".contCal").innerHTML = HTML;
		
		if(this.retFunct!=null)applicaLoading(document.getElementById("scheda_testo"),'vuoto');
		else applicaLoading(document.getElementById("ag"),'vuoto');
		this.elemento.querySelector(".contCal").classList.add("visSch");
		SWIPE.dismis();
		SWIPE.init('calCont','document.getElementById(\'calPre\').click();','document.getElementById(\'calNext\').click();');
	},
	chiudiCalendario: function(){
		if(this.retFunct!=null)rimuoviLoading(document.getElementById("scheda_testo"),'vuoto');
		else rimuoviLoading(document.getElementById("ag"),'vuoto');
		this.elemento.querySelector(".contCal").classList.remove("visSch");
		this.elemento.querySelector(".contCal").innerHTML = '';
		SWIPE.init('agendaPlaceHolder','document.getElementById(\'agendaPre\').click();','document.getElementById(\'agendaNext\').click();');
	},
	popolaAgenda:function( DataPartenza, elemento ){
		var icoUtente = '<img src="img/ico_utenteN.png" style="width: 16px;vertical-align: middle;margin-top: -3px;">';
		var valScroll = 0;
		var d = new Date();
		valScroll = d.getHours();
		
		this.DataPartenza=DataPartenza;
		this.elemento=elemento;
		if(this.oraInizio>-1 && this.oraFine==-1){
			this.oraInizio=-1;
			this.elInizio=null;
		}
		var DataPartenza = new Date(DataPartenza.getFullYear(), DataPartenza.getMonth(), DataPartenza.getDate(), 0,0,0,0);
		
				
		var d=DataPartenza;
		giorno=d.getDate();
		var s=globals.siglaLingua.substr(0,2)+"-"+globals.siglaLingua.substr(0,2).toUpperCase();
		mese=DB.TXT.base.nomiMesi[globals.siglaLingua][d.getMonth()].toLowerCase();//d.toLocaleString(s, { month: 'long' });
		anno=d.getFullYear();
		nomeGiorno=d.getDay();
		festivo=false;
		if(d.getDay()==0 || d.getDay()==6)festivo=true;
		var dd=LINGUE.formatDate.replace(/\//," ").replace(/\//," ");
		
		
		var HTML = '<div id="agendaCont">'+
				'	</span>' +
				'	<div id="agendaTesta">' +
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
				'	<div class="agendaOre"' +
				'		 id="agOr0">';
		for(let h=this.oraMin;h<this.oraMax;h++){
			act='onClick="agenda.selOra('+h+','+(d*1)+');"';
			cnt='';
			cls='';
			clsG='';
			for(a in this.appuntamenti[d*1]){
				if(	h>=this.appuntamenti[d*1][a].timeInizio && 
					h<this.appuntamenti[d*1][a].timeFine){
					var TestoAppuntamento = __(this.appuntamenti[d*1][a].TestoAppuntamento);
					if(h==this.appuntamenti[d*1][a].timeInizio){
						cnt=TestoAppuntamento;
						/*if(this.appuntamenti[d*1][a].timeFine-this.appuntamenti[d*1][a].timeInizio == 0.5 || !cnt){
							//cnt += ' <i class="nTAg">'+icoUtente+this.appuntamenti[d*1][a].Nominativo+'</i>';
							cnt += ' <i class="nTAg">'+htmlEntities(TXT("TrattamentoSenzaNome"))+'</i>';
						}*/
						if(this.appuntamenti[d*1][a].timeFine-this.appuntamenti[d*1][a].timeInizio == 0.5){
							cnt += ' <i class="nTAg">'+icoUtente+this.appuntamenti[d*1][a].Nominativo+'</i>';
						}
					}
					if(	this.appuntamenti[d*1][a].Nominativo && 
						h-0.5==this.appuntamenti[d*1][a].timeInizio){
						cnt='<i class="nTAg">'+icoUtente+this.appuntamenti[d*1][a].Nominativo+'</i>';
					}
					var add_clsG = '';
					if(__(this.appuntamenti[d*1][a].idApp,-1)>-1)add_clsG='Gen';
					clsG=' class="timeFull'+add_clsG+'"';
					if(h+0.5==this.appuntamenti[d*1][a].timeFine)clsG=' class="timeFull'+add_clsG+' brdBtm"';
					if(this.retFunct!=null)act='';
					else act='onClick="agenda.gestisciAppuntamento('+(d*1)+','+a+');"';
				}
			}
			if(d*1==this.gIor && this.gIor>-1 && h>=this.oIor && h-0.5<this.oFor){
				clsG += ' style="background-color:#feedba;"';
			}
			if(d*1==this.giornoInizio && this.giornoInizio>-1){
				if(this.oraInizio > -1)valScroll = this.oraInizio;
				if(h>=this.oraInizio && h-0.5<this.oraFine){
					clsG+=' class="hSel"';
					if(!this.orarioDef){
						if(h==this.oraInizio && this.oraFine==-1)cnt = this.msgContinua;
						if(h==this.oraFine)cnt = this.txtConferma+this.btnConferma;
					}else if(h==this.oraFine)cnt = this.imgSpunta;
				}
			}
			HTML += '<div'+clsG+' onMouseOver="agenda.rollOver('+(h)+','+(d*1)+',this)"' +
					'			  onMouseOut="agenda.rollOut('+(h)+','+(d*1)+',this);">' +
					'	<span>'+h+'</span><span '+act+cls+'>'+cnt+'</span>' +
					'</div>';
					
			act='onClick="agenda.selOra('+(h+0.5)+','+(d*1)+');"';
			cnt='';
			cls='';
			clsG='';
			for(a in this.appuntamenti[d*1]){
				if(	h+0.5>=this.appuntamenti[d*1][a].timeInizio && 
					h+0.5<this.appuntamenti[d*1][a].timeFine){
					var TestoAppuntamento = __(this.appuntamenti[d*1][a].TestoAppuntamento);
					if(h+0.5==this.appuntamenti[d*1][a].timeInizio){
						cnt=TestoAppuntamento;
						/*if(this.appuntamenti[d*1][a].timeFine-this.appuntamenti[d*1][a].timeInizio == 0.5 || !cnt){
							//cnt += ' <i class="nTAg">'+icoUtente+this.appuntamenti[d*1][a].Nominativo+'</i>';
							cnt += ' <i class="nTAg">'+htmlEntities(TXT("TrattamentoSenzaNome"))+'</i>';
						}*/
						if(this.appuntamenti[d*1][a].timeFine-this.appuntamenti[d*1][a].timeInizio == 0.5){
							cnt += ' <i class="nTAg">'+icoUtente+this.appuntamenti[d*1][a].Nominativo+'</i>';
						}
					}
					if(	this.appuntamenti[d*1][a].Nominativo && 
						h==this.appuntamenti[d*1][a].timeInizio){
						cnt='<i class="nTAg">'+icoUtente+this.appuntamenti[d*1][a].Nominativo+'</i>';
					}
					var add_clsG = '';
					if(__(this.appuntamenti[d*1][a].idApp,-1)>-1)add_clsG='Gen';
					clsG=' class="timeFull'+add_clsG+'"';
					if(h+1==this.appuntamenti[d*1][a].timeFine)clsG=' class="timeFull'+add_clsG+' brdBtm"';
					if(this.retFunct!=null)act='';
					else act='onClick="agenda.gestisciAppuntamento('+(d*1)+','+a+');"';
				}
			}
			if(d*1==this.gIor && this.gIor>-1 && h+0.5>=this.oIor && h<this.oFor){
				clsG+=' style="background-color:#feedba;"';
			}
			if(d*1==this.giornoInizio && this.giornoInizio>-1){
				if(h+0.5>=this.oraInizio && h<this.oraFine){
					clsG+=' class="hSel"';
					if(!this.orarioDef){
						if(h+0.5==this.oraInizio && this.oraFine==-1)cnt=this.msgContinua;
						if(h+0.5==this.oraFine)cnt=this.txtConferma+this.btnConferma;
					}else if(h+0.5==this.oraFine)cnt=this.imgSpunta;
				}
			}
			if((clsG.indexOf("timeFull")==-1 && clsG.indexOf("timeFullGen")==-1) || h+0.5==this.oraFine){
				if(!cls)cls=' class="brdBtmSp"';
				else cls = cls.replace('="','="brdBtmSp ');
			}
			HTML += '<div'+clsG+' onMouseOver="agenda.rollOver('+(h+0.5)+','+(d*1)+',this)"' +
					'			  onMouseOut="agenda.rollOut('+(h+0.5)+','+(d*1)+',this);">' +
					'	<span class="brdBtmSp"></span><span '+act+cls+'>'+cnt+'</span>' +
					'</div>';
		}
		HTML += '</div></div>';
		HTML += '</div></div><div class="contCal"></div>';
		this.elemento.innerHTML=HTML;
		elemento.className='agOp';
		document.getElementById("agendaPre").onclick=function(){
			agenda.popolaAgenda(DataPartenza.addDays(-1),elemento);
		};
		document.getElementById("agendaNext").onclick=function(){
			agenda.popolaAgenda(DataPartenza.addDays(1),elemento);
		};
		agenda.chiudiCalendario();
		if(valScroll)document.getElementById("agOr0").scrollTo(0,valScroll * 40 - 30);
	},
	annulla:function( mod ){
		var dvs=document.getElementById("day_"+agenda.giornoInizio).getElementsByTagName("div");
		for(let k=agenda.oraInizio;k<=agenda.oraFine;k+=0.5){
			if(dvs[(k-agenda.oraMin)*2+2].className.indexOf('timeFull')==-1){
				dvs[(k-agenda.oraMin)*2+2].className='';
				dvs[(k-agenda.oraMin)*2+2].getElementsByTagName("span")[1].innerHTML='';
			}
		}
		setTimeout( function(mod){
			if(!mod){
				dvs[(k-agenda.oraInizio)*2+2].className='';
				dvs[(k-agenda.oraInizio)*2+2].getElementsByTagName("span")[1].innerHTML='';
			}
			agenda.init();
		}, 200, mod);
	},
	rollOver:function( h, d, el ){
		var ro=true;
		da_aT=TXT("dalle")+" ";
		var hT=h+"";
		if(hT.indexOf(".")>-1)hT=parseInt(h)+":30";
		else hT=h+":00";
		if(this.oraInizio>-1 && this.oraFine==-1){
			if(d*1==this.giornoInizio){
				da_aT=TXT("alle")+" ";
				hT=h+"";
				if(hT.indexOf(".")>-1)hT=parseInt(h+1)+":00";
				else hT=h+":30";
				if(h<this.oraInizio)ro=false;
			}
			if(d==this.giornoInizio){
				var dvs=document.getElementById("day_"+d).getElementsByTagName("div");
				var st=false;
				for(let k=this.oraInizio;k<=h;k+=0.5){
					if(dvs[(k-this.oraMin)*2+2].className.indexOf('timeFull')>-1){
						st=true;
						ro=false;
					}
					if(!st){
						dvs[(k-this.oraMin)*2+2].className='selProvv';
						this.lastSel=k;
					}
				}
			}
		}
		if((el.className=='' || (el.className=='selProvv' && h>this.oraInizio)) && ro){
			el.getElementsByTagName('span')[1].innerHTML=da_aT+hT;
		}
	},
	rollOut:function( h, d, el ){
		if((el.className=='' || el.className=='selProvv') && (h!=this.oraInizio || d!=this.giornoInizio)){
			el.getElementsByTagName('span')[1].innerHTML='';
		}
		if(this.lastSel>-1){
			if(this.oraInizio>-1 && this.oraFine==-1){
				var dvs=document.getElementById("day_"+this.giornoInizio).getElementsByTagName("div");
				var st=false;
				for(let k=this.oraInizio+0.5;k<=this.lastSel;k+=0.5){
					if(dvs[(k-this.oraMin)*2+2].className.indexOf('timeFull')>-1)st=true;
					if(!st)dvs[(k-this.oraMin)*2+2].className='';
				}
			}
			this.lastSel=-1
		}
	},
	apri:function( DataPartenza, elemento, funct, el, Q_idTratt ){
		agendaOp=true;
		// creo l'oggetto appuntamenti
		this.retFunct=funct;
		this.elBut=el;
		this.elCont=elemento;
		var d=null;
		if(el.dataset.d)d=JSON.parse(el.dataset.d);
		this.init();
		this.appuntamenti=[];
		if(d){
			this.orarioDef=d;
			this.giornoInizio=d.data;
			this.giornoFine=d.data;
			this.oraInizio=d.oraInizio;
			this.oraFine=d.oraFine-0.5;
			if(this.oraFine<-1)this.oraFine=-1;
			this.oIor=this.oraInizio;
			this.oFor=this.oraFine;
			this.gIor=this.giornoInizio;
		}
		for(let i in DB.pazienti.data){
			for(t in DB.pazienti.data[i].trattamenti){
				if(!DB.pazienti.data[i].trattamenti[t].Cancellato){
					if(!this.appuntamenti[DB.pazienti.data[i].trattamenti[t].TimeTrattamento*1000])this.appuntamenti[DB.pazienti.data[i].trattamenti[t].TimeTrattamento*1000]=[];
					if(typeof(DB.pazienti.data[i].trattamenti[t].oraInizio)!='undefined')oraInizio=DB.pazienti.data[i].trattamenti[t].oraInizio;
					if(oraInizio<this.oraMin)oraInizio=this.oraMin+2;
					if(typeof(DB.pazienti.data[i].trattamenti[t].oraFine)!='undefined')oraFine=DB.pazienti.data[i].trattamenti[t].oraFine; 
					if(oraFine<this.oraMin)oraFine=this.oraMin+3;
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
		for(let i in DB.appuntamenti.data){
			if(!DB.appuntamenti.data[i].Cancellato){
				if(!this.appuntamenti[DB.appuntamenti.data[i].TimeTrattamento])this.appuntamenti[DB.appuntamenti.data[i].TimeTrattamento]=[];
				if(typeof(DB.appuntamenti.data[i].oraInizio)!='undefined')oraInizio=DB.appuntamenti.data[i].oraInizio;
				if(oraInizio<this.oraMin)oraInizio=this.oraMin+2;
				if(typeof(DB.appuntamenti.data[i].oraFine)!='undefined')oraFine=DB.appuntamenti.data[i].oraFine; 
				if(oraFine<this.oraMin)oraFine=this.oraMin+3;
				var idCli = DB.appuntamenti.data[i].idCli;
				var Nominativo = '';
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
	chiudi:function(){
		this.orarioDef=null;
		agendaOp=false;
		agenda.init();
		this.elCont.className='';
		setTimeout(function(){if(!agendaOp)agenda.elCont.innerHTML='';},600);
		SWIPE.dismis();
	},
	gestisciAppuntamento: function( d, a ){
		if(this.oraInizio>-1)return;
		var app = this.appuntamenti[d*1][a*1];
		if(	typeof(app.idCL) != 'undefined' && 
			typeof(app.idTratt) != 'undefined'){
			PAZIENTI.selPaziente(app.idCL);
			idTratt = app.idTratt;
			setTimeout( function(){ 
				document.getElementById("btn_trattamento_"+idTratt).click();
				var cartella = document.getElementById("btn_trattamento_"+idTratt).parentElement.parentElement;
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
	}
}