
var MODULO_PATOLOGIE = { // extend SET
	
	PATOLOGIE_free: [ 12, 18, 26, 46, 104 ],
	
	caricaPatologie: function(){ // carica l'elenco delle patologie
		let crtOp = -1,
			contPatologie = 
						'<div id="add_pat"' +
						'>'+
						'	<input id="pat_ricerca"' +
						'		   onKeyUp="SET.filtraPatologie();"' +
						'		   class="okPlaceHolder"' +
						'		   placeholder="'+htmlEntities(TXT("CercaPatologia"))+'"'+H.noAutoGen+'>' +
						'</div>' +
						'<div class="lista listaPatologie">';
		
		// lista				
		for(let p in DB.set.patologie){
			
			// verifico le autorizzazioni
			let addLock =	(!SET.verFreePatologia(p*1)) ? ' lockedItem' : '';
			// --------------------------
						
			contPatologie +=	'<div id="btn_patologia_'+p+'"' +
								'     class="base'+addLock+((p==SET.patOp)?' elencoSel':'')+'"' +
								'     onClick="SET.apriPatologia(\''+p+'\',this);">' +
									DB.set.patologie[p].NomePatologia +
								'</div>';
		}
		
		
		contPatologie += '</div>';
		document.getElementById("lista_patologie").innerHTML = contPatologie;
		if(crtOp>-1){
			document.getElementById("btn_apparati_cart_"+crtOp).parentElement.classList.add("cartellaAperta");
		}
	},
	apriPatologia: function( n, btn ){ // apre la scheda della patologia
		// verifico le autorizzazioni
		if(!SET.verFreePatologia(n*1)){
			ALERT(TXT("MsgContSoloPay"),true,true);
			return;
		}
		// --------------------------
		
		let NomePatologia = DB.set.patologie[n].NomePatologia,
			apparati = DB.set.patologie[n].apparati,
			html = 	"<h1>"+htmlEntities(NomePatologia)+"</h1>" +
		
		// aggiungo contenuto custom
		CUSTOMS.addContent("patologie_"+n,SET.convPuntiScheda(DB.set.patologie[n].TestoPatologia));


		let ritorno = false;
		if(	document.getElementById("scheda").querySelector(".formBtn") &&
			document.getElementById("scheda").classList.contains("visSch") &&
			SCHEDA.verificaSchedaRet() )ritorno = "document.getElementById('scheda').classList.remove('scheda_patologia')";
		
		let btnAdd = 	'';
			
		SCHEDA.caricaScheda(	NomePatologia,
								html,
								'SET.ripristinaVisibili();' +
								'SET.chiudiPatologia();' +
								'SET.annullaEvidenziaPunto();',
								'scheda_patologia',
								ritorno,
								true,
								btn,
								btnAdd,
								globals.set.cartella+'_patologie_'+n );
								SET.evidenziaPunto();
		
		SET.ripristinaVisibili();
		let els = SETS.children[0].children;
		for(let e in els){
			if(apparati.indexOf(els[e].userData.apparato)==-1 && els[e].material.name.indexOf("EVI")==-1)els[e].visible = false;
			if(apparati.indexOf(els[e].userData.apparato)>-1 || els[e].material.name.indexOf("EVI")>-1){
				els[e].material.opacity = SET.MAT.opAreaPat;
				if(SET.apparatiPats.indexOf(parseInt(els[e].userData.apparato))==-1)SET.apparatiPats.push(els[e].userData.apparato);
			}
		}
	},
	ripristinaVisibili: function(){
		let els = SETS.children[0].children;
		for(let e in els){
			els[e].visible = true;
		}
		SET.apparatiPats = [];
		SET.MAT.areaEvi.opacity = SET.MAT.opAreaEvi;
	},
	chiudiPatologia: function(){
		SET.patOp = -1;
	},
	filtraPatologie: function( event ){ // filtra le patologie tramite campo di testo
		let parola = document.getElementById("pat_ricerca").value.trim();
		for(let p in DB.set.patologie){
			if(DB.set.patologie[p].NomePatologia.toLowerCase().indexOf(parola.toLowerCase()) == -1){
				document.getElementById("btn_patologia_"+p).classList.add("nasPazRic");
			}else{
				document.getElementById("btn_patologia_"+p).classList.remove("nasPazRic");
			}
		}
		if(parola)document.getElementById("pat_ricerca").classList.add("filtro_attivo");
		else document.getElementById("pat_ricerca").classList.remove("filtro_attivo");
	},
	swListType: function(){
		if(__(localStorage.listPatType)!='category')localStorage.listPatType = 'category';
		else localStorage.listPatType = 'list';
		SET.caricaPatologie();
	},
	azRicercaPatologie: function( p ){ // apre la scheda della patologia dalla ricerca globale
		SCHEDA.apriElenco('set');
		SET.apriPatologia( p, document.getElementById('btn_patologia_'+p));
		SCHEDA.selElenco('patologie');
		evidenziaParola();
		RICERCHE.nascondiGlobal();
		SCHEDA.individuaElemento( "btn_patologia_"+p, "listaPatologie" );
	},
	verFreePatologia: function( p ){
		return !(SET.PATOLOGIE_free.indexOf(parseInt(p))==-1 && (DB.login.data.auths.indexOf(globals.set.cartella)==-1 || !LOGIN.logedin()));
	}
}