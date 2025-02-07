var AI = {
	endpoint: false,
	aiEndPoint: '',
	gettoniAI: {
		usati: 0,
		totali: 0
	},
	
	get_gettoni: function( endpoint ){
		CONN.retRealNoConn().then(isOnline => {
			if(isOnline){
				AI.endpoint = endpoint;
				visLoader('');
				CONN.caricaUrl(	"diagnosi_gettoni.php",
								"",
								"AI.res_gettoni");
			}
		});
	},
	res_gettoni: function( res ){
		AI.gettoniAI = JSON.parse(res);
		AI.popup();
	},
	popup: function( purchase=false ){
		let endpoint = AI.endpoint;
		AI.endpoint = false;
		if(CONN.retNoConn()){
			AI.aiEndPoint = endpoint;
			MENU.visAI();
			if(endpoint){
				let gettoniRestanti = AI.gettoniAI.totali-AI.gettoniAI.usati;
				if(gettoniRestanti>0){
					let conteggio = TXT("ConteggioGettoniAI");
					conteggio = conteggio.replace("[r]",'<b>'+gettoniRestanti+'</b>')
					conteggio = conteggio.replace("[u]",AI.gettoniAI.usati);
					conteggio = conteggio.replace("[t]",AI.gettoniAI.totali);
					document.getElementById("txtAI").innerHTML = 	'<div id="cont_gettoniAI">'+conteggio+'</div>'+TXT("SpiegazioneAI");
					document.getElementById("cont_selectAI").innerHTML = 	H.r({	t: "s", 
																					name: "modelloDiagnosi",
																					value: "",
																					opts: {
																						"mtc": "MTC",
																						"shiatsu": "Shiatsu"
																					},
																					styleRiga: "display:inline-block;",
																					label: "Tipo" });
					document.getElementById("ai").classList.remove("disclaimer");
					document.getElementById("ai").classList.remove("purchaseTokens");
				}else{
					document.getElementById("txtAI").innerHTML = '<div id="cont_gettoniAI_err">'+TXT("GettoniFiniti")+'</div>';
					document.getElementById("ai").classList.add("purchaseTokens");
				}
			}else{
				if(!purchase){
					document.getElementById("txtAI").innerHTML = TXT("DisclaimerAI");
					document.getElementById("ai").classList.add("disclaimer");
				}else{
					document.getElementById("txtAI").innerHTML = '<div id="cont_gettoniAI_err"><div>'+TXT("GettoniFiniti")+'</div>';
					document.getElementById("ai").classList.add("purchaseTokens");
				}
			}
		}
	},
	request: function(){
		CONN.retRealNoConn().then(isOnline => {
			if(isOnline){
				MENU.chiudiMenu();
				AI.diagnosi_request();
			}
		});
	},
	purchase: function(){
		CONN.openUrl(convLangPath(CONN.urlAItokens)+"?p="+MD5(DB.login.data.TOKEN+(DB.login.data.idUtente*123))+(DB.login.data.idUtente*45));
	},
	diagnosi_request: function(){
		let anamnesi = '',
			modello = document.getElementById("modelloDiagnosi").value;
		if(document.getElementById("Anamnesi"))anamnesi = document.getElementById("Anamnesi").value;
		else{
			anamnesi += H.chr10+TXT("DiagnosiMTC")+H.chr10+document.getElementById("DiagnosiMTC").value +
						H.chr10+TXT("DiagnosiOccidentale")+H.chr10+document.getElementById("DiagnosiOccidentale").value;
		}
		let JSNPOST = {
			anamnesi: anamnesi,
			sesso: DB.pazienti.data[PAZIENTI.idCL].sesso,
			siglaLingua: globals.siglaLingua.toLowerCase(),
			moduli: [],
			sintomi: [],
			patologie: [],
			allergie: [],
			interventi: [],
			medicine: [],
			modello: modello
		};
		for(s in PAZIENTI.sintomiProvvisori){
			if(PAZIENTI.sintomiProvvisori[s].score>-1){
				JSNPOST.sintomi.push({
					"sintomo": PAZIENTI.sintomiProvvisori[s].NomeSintomo,
					"score": PAZIENTI.sintomiProvvisori[s].score
				});
			}
		}
		for(let m in PAZIENTI.moduliProvvisori){
			let el = {
					title: '',
					data: []
				},
				dts = 0;
			if(typeof(PAZIENTI.moduliProvvisori[m].id)=='string'){
				el.title = moduliValutazione.modelli[PAZIENTI.moduliProvvisori[m].id].title[globals.siglaLingua];
			}else{
				el.title = PAZIENTI.moduliProvvisori[m].title;
			}
			for(let d in PAZIENTI.moduliProvvisori[m].data){
				let dt = {};
				if(typeof(PAZIENTI.moduliProvvisori[m].id)=='string'){
					dt.t = moduliValutazione.modelli[PAZIENTI.moduliProvvisori[m].id].data[d].t;
					dt.d = moduliValutazione.modelli[PAZIENTI.moduliProvvisori[m].id].data[d].d[globals.siglaLingua];
					dt.r = __(PAZIENTI.moduliProvvisori[m].data[d].r);
					if(moduliValutazione.modelli[PAZIENTI.moduliProvvisori[m].id].data[d].l && !dt.r)dt.r=0;
					if(typeof(dt.r)=='number'){
						let lista = moduliValutazione.modelli[PAZIENTI.moduliProvvisori[m].id].data[d].l;
						if(typeof(lista)=='string')lista = moduliValutazione.liste[lista];
						dt.r = lista[dt.r][globals.siglaLingua];
					}
				}else{
					dt.t = PAZIENTI.moduliProvvisori[m].data[d].t;
					dt.d = PAZIENTI.moduliProvvisori[m].data[d].d;
					dt.r =  __(PAZIENTI.moduliProvvisori[m].data[d].r);
				}
				if(dt.r || dt.t=='e')el.data.push(dt);
				if(dt.t=='e')delete(dt.r)
				if(dt.r)dts++;
			}
			if(dts)JSNPOST.moduli.push(el);
		}
		for(p in DB.pazienti.data[PAZIENTI.idCL].patologie){
			JSNPOST.patologie.push(DB.pazienti.data[PAZIENTI.idCL].patologie[p].NomePatologia);
		}
		for(p in DB.pazienti.data[PAZIENTI.idCL].allergie){
			JSNPOST.allergie.push(DB.pazienti.data[PAZIENTI.idCL].allergie[p].NomeAllergia);
		}
		for(p in DB.pazienti.data[PAZIENTI.idCL].interventi){
			JSNPOST.interventi.push(DB.pazienti.data[PAZIENTI.idCL].interventi[p].NomeIntervento);
		}
		for(p in DB.pazienti.data[PAZIENTI.idCL].medicine){
			JSNPOST.medicine.push(DB.pazienti.data[PAZIENTI.idCL].medicine[p].NomeMedicina);
		}
		if(!PAZIENTI.sintomiProvvisori && !document.getElementById("Anamnesi").value.trim()){
			ALERT(TXT("NoDataAI"));
			return;
		}
		visLoader(TXT("ElaborazioneInCorso"));
		CONN.caricaUrl(	"diagnosi.php",
						"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST)))+"&NominativoPaziente="+window.btoa(encodeURIComponent(DB.pazienti.data[PAZIENTI.idCL].Nome+" "+DB.pazienti.data[PAZIENTI.idCL].Cognome)),
						"AI.diagnosi_response");
	},
	diagnosi_response: function( json ){
		if(typeof(json)=='undefined'){
			ALERT(TXT("ErroreConnessione"));
			nasLoader();
			return false;
		}
		let res = JSON.parse(json);
		if(res.esito.substr(0,5)=='ERROR'){
			ALERT(TXT("ErroreGenerico"));
		}else if(res.esito=='NO_DATA'){
			ALERT(TXT("NoDataAI"));
		}else if(res.esito=='TOKEN_FINISH'){
			AI.popup(true);
		}else{
			let re1b = /[\*]{2}([^\*]+)[\*]{2}/g,
				re1i = /[\*]{1}([^\*]+)[\*]{1}/g,
				re2 = /[#]{4} ([^\n]+)\n/g,
				re3 = /[#]{3} ([^\n]+)\n/g,
				re5 = /[#]{2} ([^\n]+)\n/g,
				re6 = /[#]{1} ([^\n]+)\n/g,
				ren = /\n/g,
				html = res.response;
			html = html.replace(re1b,"<b>$1</b>");
			html = html.replace(re1i,"<i>$1</i>");
			html = html.replace(re2,"<h4>$1</h4>");
			html = html.replace(re3,"<h3>$1</h3>");
			html = html.replace(re5,"<h3>$1</h3>");
			html = html.replace(re6,"<h4>$1</h4>");
			html = html.replace(ren,"<br>");
			document.getElementById("diagnosiAI").innerHTML = html;
			document.getElementById("contDiagnosiMTC").classList.add("fullAI");
			AI.diagnosi_swPoints();
			SCHEDA.formModificato = true;
		}
		nasLoader();
		PAZIENTI.aiEndPoint = '';
	},
	diagnosi_delete: function(){
		CONFIRM.vis(	TXT("ChiediEliminaDiagnosi"),
						false, 
						arguments ).then(function(pass){if(pass){
						let v = getParamNames(CONFIRM.args.callee.toString());
						for(let i in v)eval(getArguments(v,i));
			document.getElementById("diagnosiAI").innerHTML = '';
			document.getElementById("contDiagnosiMTC").classList.remove("fullAI");
			SCHEDA.formModificato = true;
		}});
	},
	diagnosi_addPoints: function(){
		let punti = AI.diagnosi_verPoints();
		if(punti.length){
			PAZIENTI.tipoGruppo = 'P';
			PAZIENTI.aggiungiGruppoTrattamento(punti);
		}else ALERT(TXT("PuntiTuttiPresenti"));
	},
	diagnosi_verPoints: function(){
		let html = document.getElementById("diagnosiAI").innerHTML,
			re = /[A-Z]{2}\.[0-9]{1,2}/g,
			els = html.match(re),
			punti = [];
		for(e in els){
			let pP = els[e].split("."),
				pass = true;
			for(p in PAZIENTI.puntiProvvisori){
				if(parseInt(PAZIENTI.puntiProvvisori[p].n)==parseInt(pP[1]) && PAZIENTI.puntiProvvisori[p].m==pP[0])pass=false;
			}
			if(pass)punti.push(pP[1]+"."+pP[0]+"..");
		}
		return punti;
	},
	diagnosi_swPoints: function(){
		if(!document.getElementById('tratt_cont_punti').getElementsByClassName("diagnosiAzione")[0])return;
		document.getElementById('tratt_cont_punti').getElementsByClassName("diagnosiAzione")[0].classList.toggle("nas",!AI.diagnosi_verPoints().length);
	}
}