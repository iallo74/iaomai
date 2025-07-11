var H = {
	noAutoGen: ' autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"',
	sl: '<span class="nb">/</span>',
	imgSyncro: function(){
		let HTML = '';
		if(LOGIN.reg()){
			HTML = '';
			/*HTML = 	'<img src="img/ico_connessioneAssente.png"' +//alertmini.png"' +
					'width="11"' +
					'height="18"' +
					'align="middle' +
					'class="alertMini" ' +
					'style="vertical-align: middle;' +
					'		margin-top: -1px;' +
					'		margin-right: 5px;"' +
					'title="'+TXT("ElementoNonSincronizzato")+'">';*/
		}
		return HTML;
	},
	//target: (window.cordova && window.cordova.platformId !== 'windows') ? '_system': '_blank',
	target: (isCordova) ? '_system': '_blank',
	chr10: String.fromCharCode(10),
	chr13: String.fromCharCode(13),
	tab: String.fromCharCode(9),
	spunta: '&#10004;',
	ics: '&#10005;',
	elCombo: null,
	comboOver: false,
	etichetteProvvisorie: [],
	r: function( obj ){ // crea riga di un FORM
		/*
			parametri di obj:
			- name // *obbligatorio
			- value // *obbligatorio
			- label
			- ver
			- idRiga
			- classRiga
			- styleRiga
			- opts
			- classCampo
			- styleRiga
			- labelOut
			- maxChars
		*/
		
		// controllo i valori
		if(	typeof(obj.label) == 'undefined' &&
			obj.t != 'h' &&
			obj.t != 'v' )obj.label = convertMisure(TXT(""+obj.name));
		if(typeof(obj.idRiga) == 'undefined')obj.idRiga = '';
		if(typeof(obj.label) == 'undefined')obj.label = '';
		if(typeof(obj.noLabel) == 'undefined')obj.noLabel = false;
		if(typeof(obj.classCampo) == 'undefined')obj.classCampo = '';
		if(typeof(obj.styleCampo) == 'undefined')obj.styleCampo = '';
		if(typeof(obj.keyupCampo) == 'undefined')obj.keyupCampo = '';
		if(typeof(obj.clickCampo) == 'undefined')obj.clickCampo = '';
		if(typeof(obj.focusCampo) == 'undefined')obj.focusCampo = '';
		if(typeof(obj.classRiga) == 'undefined')obj.classRiga = '';
		if(typeof(obj.styleRiga) == 'undefined')obj.styleRiga = '';
		if(typeof(obj.onChange) == 'undefined')obj.onChange = '';
		if(typeof(obj.azCancella) == 'undefined')obj.azCancella = '';
		if(typeof(obj.azModifica) == 'undefined')obj.azModifica = '';
		if(typeof(obj.labelOut) == 'undefined')obj.labelOut = '';
		if(typeof(obj.maxChars) == 'undefined')obj.maxChars = '';
		
		if(typeof(obj.ver) == 'undefined')obj.ver = '';
		else obj.ver = '@|'+obj.label+'|'+obj.ver;
		let id = obj.name;
		if(obj.ver)id = obj.ver;
		let addCampo = '';
		if(obj.classCampo)addCampo += ' class="'+obj.classCampo+'"';
		if(obj.styleCampo)addCampo += ' style="'+obj.styleCampo+'"';
		if(obj.keyupCampo)addCampo += ' onKeyUp="'+obj.keyupCampo+'"';
		if(obj.clickCampo)addCampo += ' onClick="'+obj.clickCampo+'"';
		if(obj.focusCampo)addCampo += ' onFocus="'+obj.focusCampo+'"';
		
		let html = '';
		
		// inizializzo la riga
		if(obj.t != 'h'){
			html += '<div';
			if(obj.idRiga)html += ' id="'+obj.idRiga+'"';
			if(obj.classRiga)html += ' class="'+obj.classRiga+'"';
			if(obj.styleRiga)html += ' style="'+obj.styleRiga+'"';
			html += '>';
		}
		
		// compongo il contenuto della riga
		switch(obj.t){
			
			case "r": // text
				if(obj.azModifica)html += 
						'<img src="img/ico_modifica_mini2.png"' +
						' 	  width="22"' +
						'	  height="22"' +
						'	  style="margin-left: -18px;' +
						'	  		 cursor: pointer;' +
						'	 		 background-color: #CCC;' +
						'	  		 border-radius: 11px;' +
						'	  		 margin-top: -5px;' +
						'	  		 float: left;' +
						'	  		 margin-right: -10px;"' +
						'	  align="absmiddle"' +
						'	  onClick="'+obj.azModifica+';"' +
						'	  data-value="'+htmlEntities(obj.label)+'"' +
						'	  class="occhio">';
				if(obj.label && !obj.noLabel){
					if(obj.labelOut)tgLab = 'em';
					else tgLab = 'i';
					html += '<'+tgLab+'>'+htmlEntities(obj.label)+':</'+tgLab+'> ';
				}
				html += '<input type="text"'+
						'		name="'+obj.name+'"'+
						'		id="'+htmlEntities(id)+'"'+
						'		value="'+htmlEntities(obj.value)+'"'+
						'		data-pre-value="'+htmlEntities(obj.value)+'"' +
						'		placeholder="'+htmlEntities(obj.label)+'"';
				if(obj.maxChars)html += '		maxlength="'+obj.maxChars+'"'	
				if(id.indexOf("|tel")>-1 || id.indexOf("|cell")>-1)html += 
						'		onKeyUp="return H.keyTelefono(this,'+(id.indexOf("|cell")>-1)+');"';
						
				html += 		addCampo+H.noAutoGen+'>';
				if(obj.azCancella)html += 
						'<img src="img/ico_cestino.png"' +
						'	  width="16"' +
						'	  height="16"' +
						'	  align="absmiddle"' +
						'	  style="margin-left: -24px;cursor:pointer;opacity:0.5;"' +
						'	  title="Elimina"' +
						'	  onclick="'+obj.azCancella+';"' +
						'	  class="occhio">';
   				break;
			
			case "s": // select
				if(obj.label && !obj.noLabel)html += '<i class="vis">'+htmlEntities(obj.label)+':</i>';
				html += '<select name="'+obj.name+'" id="'+id+'"';
				if(obj.onChange)html += ' onChange="SCHEDA.formModificato=true;'+obj.onChange+'"';
				html += addCampo+'>'+H.chr10;
				for(let o in obj.opts){
					html+='<option value="'+o+'"';
					if(obj.value==o)html+=' SELECTED';
					html+=">"+htmlEntities(obj.opts[o])+'</option>';
				}
				html += '</select>'+H.chr10;
   				break;
				
			case "t": // textarea
				if(obj.label && !obj.noLabel)html += '<em style="line-height:25px;">'+htmlEntities(obj.label)+':</em>';
				if(obj.noLabel)addCampo += ' placeholder="'+htmlEntities(obj.label)+'"';
				html += '<textarea name="'+obj.name+'" id="'+id+'"'+addCampo+'>'+htmlEntities(obj.value)+'</textarea>'+H.chr10;
   				break;
				
			case "h": // hidden
				html += '<input name="'+htmlEntities(obj.name)+'" type="hidden" id="'+htmlEntities(obj.name)+'" value="'+htmlEntities(obj.value)+'" />'+H.chr10;
   				break;
				
			case "d": // data
				if(!obj.noLabel)html += '<i class="vis">'+obj.label+':</i> ';
				
				let giorno = '',
					mese = '',
					anno = '',
					Data = obj.value;
				if(Data){
					Data = new Date(Data*1000);
					giorno = Data.getDate();
					mese = Data.getMonth()+1;
					anno = Data.getFullYear();
				}
				
				html +=	'<div class="date" id="'+obj.name+'">'+
						'	<input type="text"' +
						'		   class="campoData giorno"' +
						'		   id="giorno'+obj.name+'"' +
						'		   name="giorno'+obj.name+'"' +
						'		   value="'+giorno+'"' +
						'		   data-pre-value="'+giorno+'"' +
						'		   maxlength="2"' +
						'		   onKeyUp="return H.keyData(event,this);"' +
						'		   onBlur="return H.blurCampo(event,this);">'+
						'	<span>/</span>'+
						'	<input type="text"' +
						'		   class="campoData mese"' +
						'		   id="mese'+obj.name+'"' +
						'		   name="mese'+obj.name+'"' +
						'		   value="'+mese+'"' +
						'		   data-pre-value="'+mese+'"' +
						'		   maxlength="2"' +
						'		   onKeyUp="return H.keyData(event,this);"' +
						'		   onBlur="return H.blurCampo(event,this);">'+
						'	<span>/</span>'+
						'	<input type="text"' +
						'		   class="campoData anno"' +
						'		   id="anno'+obj.name+'"' +
						'		   name="'+obj.name+'"' +
						'		   value="'+anno+'"' +
						'		   data-pre-value="'+anno+'"' +
						'		   maxlength="4"' +
						'		   onKeyUp="return H.keyData(event,this);"' +
						'		   onBlur="return H.blurCampo(event,this);">'+
						'</div>';
   				break;
				
				
			case "c": // checkbox
				html += '<input type="checkbox"'+
						'		name="'+obj.name+'"'+
						'		id="'+htmlEntities(id)+'"'+
						'		value="1"' +
						'		'+(obj.value*1 ? 'CHECKED':'0')+'>';
						
				if(obj.label && !obj.noLabel)html += '<span>'+htmlEntities(obj.label)+'</span> ';
   				break;
				
			case "v": // riga vuota
				html += '';
   				break;
				
		}
		
		// termino la riga
		if(obj.t != 'h')html += '</div>'+H.chr10;
		
		return html;
	},
	
	blurCampo: function( event, el ){
		if (el.value*1 == 0){ 
			el.value = '';
			el.dataset.preValue = '';
			return false;
		}
	},
	
	auto_height: function( elem ){ // ridimensiona un elemento textarea dinamicamente
		elem.style.height = "1px";
		elem.style.height = (elem.scrollHeight)+"px";
	},
	
	keyData: function( event, el ){
		let id = el.parentElement.id,
			giorno=document.getElementById("giorno" + id).value,
			mese=document.getElementById("mese" + id).value,
			anno=document.getElementById("anno" + id).value,
			maxGiorni = 31,
			errore = false;
		if( mese*1 > 0 && anno*1 > 0 ){
			let d = new Date(anno*1,mese*1,0);
			maxGiorni = d.getDate();	
		}
		let Filtro = /^[\d]+$/;
		if(!el.value.trim()){
			el.value = '';
			el.dataset.preValue = '';
			return false;
		}
		if ( !Filtro.test(el.value) || // non è un numero
			 el.value.lentgh > el.maxLength || // è troppo lungo per il campo (2 o 4 caratteri)
			 (el.classList.contains("giorno") && el.value*1 > maxGiorni) // è un giorno ed è oltre il 31 (o maxGiorni)
			 ){ 
			 
			if(el.classList.contains("giorno") && el.value*1 > maxGiorni)el.value = maxGiorni;
			else el.value = el.dataset.preValue;
			
			return false;
		}
		//if(el.dataset.preValue == el.value)errore = true;
		el.dataset.preValue = el.value;
		SCHEDA.formModificato=true;
		if( el.classList.contains("mese") ){ // se sto modificando mese
			if(	giorno*1 > 0 && // c'è il giorno
				anno*1 > 0 && // c'è l'anno
				giorno*1 > maxGiorni // e il giorno è oltre il maxGiorni
				){
					document.getElementById("giorno" + id).value = maxGiorni;
					document.getElementById("giorno" + id).dataset.preValue = maxGiorni;
					errore = true;
			}
			if( el.value*1 > 12 ){
					el.value = 12;
					el.dataset.preValue = 12;
					errore = true;
			}
		}
		if( el.classList.contains("anno") ){ // se sto modificando anno
			if(	giorno*1 > 0 && // c'è il giorno
				mese*1 > 0 && // c'è il mese
				giorno*1 > maxGiorni // e il giorno è oltre il maxGiorni
				){
					document.getElementById("giorno" + id).value = maxGiorni;
					document.getElementById("giorno" + id).dataset.preValue = maxGiorni;
					errore = true;
			}
		}
		if( !errore && !isNaN(event.key*1)){
			if(el.classList.contains("giorno") && giorno.length==2){
				document.getElementById("mese" + id).focus();
				document.getElementById("mese" + id).select();
			}
			if(el.classList.contains("mese") && mese.length==2){
				document.getElementById("anno" + id).focus();
				document.getElementById("anno" + id).select();
			}
		}
	},
	verData: function( id, notNull=false ){ 
		let giorno = document.getElementById("giorno" + id).value,
			mese = document.getElementById("mese" + id).value,
			anno = document.getElementById("anno" + id).value,
			i = 0,
			m = 0;
		if(giorno.trim()*1)i++;
		if(mese.trim()*1)i++;
		if(anno.trim()*1)i++;
		if(notNull)m = -1;
		if(i>m && i<3){
			// data non valida
			ALERT(TXT("dataNonCorretta").replace("[d]",TXT(""+id)));
			return false;
		}else{
			return true;
		}
	},
	
	keyTelefono: function( el, cell ){
		cell = __(cell);
		if(!cell)Filtro = /^[\d\+\.\s]+$/;
		else Filtro = /^\+[\d\.\s]*$/;
		if(!el.value.trim()){
			el.value = '';
			el.dataset.preValue = '';
			return false;
		}
		if ( !Filtro.test(el.value) ){ 
			el.value = el.dataset.preValue;
			return false;
		}
		el.dataset.preValue = el.value;
		SCHEDA.formModificato=true;
	},
	
	keyPrezzo: function( el ){
		if(!el.dataset.preValue)el.dataset.preValue = el.dataset.origValue;
		let Filtro = /^[\d]+[\.,]{0,1}[\d]*$/;
		if(!el.value.trim()){
			el.value = '';
			el.dataset.preValue = '';
			return false;
		}
		if ( !Filtro.test(el.value) ){ 
			el.value = el.dataset.preValue;
			return false;
		}
		el.dataset.preValue = el.value;
	},
	
	keyIntero: function( el ){
		if(!el.dataset.preValue)el.dataset.preValue = el.dataset.origValue;
		Filtro = /^[\d]+$/;
		if(!el.value.trim()){
			el.value = '';
			el.dataset.preValue = '';
			return false;
		}
		if ( !Filtro.test(el.value) ){ 
			el.value = el.dataset.preValue;
			return false;
		}
		el.dataset.preValue = el.value;
	},
	
	creaCombo: function( el, lista=[]){
		if(lista.length && !H.elCombo){
			
			if(H.elCombo)H.rimuoviCombo();
			H.elCombo = el;
			
			let HTML = '';
			let sch = document.getElementById("scheda_testo");
			for(l in lista){
				if(lista[l].trim())HTML += 
					'<span onMouseUp="H.selComboVal(this);"' +
					'	   onMouseOver="H.overCombo();"' +
					'	   onMouseOut="H.outCombo();"' +
					'	   class="comboElVis">'+htmlEntities(lista[l])+'</span>';
			}
			if(!HTML)return;
			document.getElementById("combo").innerHTML = HTML;
			setTimeout( function(){
				sch.addEventListener("scroll", H.rimuoviCombo, false);
				window.addEventListener("mouseup", H.rimuoviCombo, false);
			},200);
			H.elCombo.addEventListener("keyup", H.filtraCombo, false);
			H.elCombo.addEventListener("mouseover", H.overCombo, false);
			H.elCombo.addEventListener("mouseout", H.outCombo, false);
			H.overCombo();
			H.riposCombo();
			H.filtraCombo();
			H.visCombo();
		}
	},
	rimuoviCombo: function(){
		if(!H.comboOver || touchable){
			H.nasCombo();
			let sch = document.getElementById("scheda_testo");
			sch.removeEventListener("scroll", H.rimuoviCombo);
			window.removeEventListener("mouseup", H.rimuoviCombo);
			if(H.elCombo){
				H.elCombo.removeEventListener("keyup", H.filtraCombo);
				H.elCombo.removeEventListener("mouseover", H.overCombo, false);
				H.elCombo.removeEventListener("mouseout", H.outCombo, false);
				H.elCombo = null;
			}
		}
	},
	blurCombo: function(){
		H.elCombo.parentElement.removeChild(document.getElementById("combo"));
		H.elCombo.removeEventListener("keyup", H.filtraCombo, false);
		H.elCombo.removeEventListener("blur", H.blurCombo, false);
		H.elCombo = null;
	},
	riposCombo: function(){
		let sch = document.getElementById("scheda_testo");
		document.getElementById("combo").style.top = (	tCoord(H.elCombo,'y') - 
														tCoord(document.getElementById("scheda"),'y') -
														sch.scrollTop +
														H.elCombo.scrollHeight ) + 'px';
		document.getElementById("combo").style.left = 	tCoord(H.elCombo) -
														tCoord(sch) + 'px';
	},
	filtraCombo: function( event ){
		if(event){
			if(event.keyCode == 13 || event.keyCode == 27){
				H.outCombo();
				H.rimuoviCombo();
				return;
			}
		}
		let val = H.elCombo.value.toLowerCase(),
			els = document.getElementById("combo").getElementsByTagName("span"),
			pres = false;
		for(let e=0;e<els.length;e++){
			if(els[e].innerText.toLowerCase().indexOf(val)==-1)els[e].classList.remove("comboElVis");
			else{
				els[e].classList.add("comboElVis");
				pres = true;
			}
		}
		if(pres)H.visCombo();
		else H.nasCombo();
	},
	selComboVal: function( el ){
		H.elCombo.value = el.innerText;
		H.elCombo.dispatchEvent(new KeyboardEvent('keyup',  {'keyCode':13}));
		H.comboOver = false;
		if(!touchable)H.rimuoviCombo();
	},
	overCombo: function( el ){
		H.comboOver = true;
	},
	outCombo: function( el ){
		H.comboOver = false;
	},
	visCombo: function(){
		document.getElementById("combo").style.display = 'block';
	},
	nasCombo: function(){
		document.getElementById("combo").style.display = 'none';
	},
	getElencoDB: function( db, campo ){
		let EL = [];	
		for(let p in db){
			if( db[p][campo.name].trim() &&
				EL.indexOf(db[p][campo.name]) == -1 &&
				db[p].Cancellato*1 != 1)EL.push(db[p][campo.name]);
		}
		EL.sort()
		return EL;
	},
	getElenco: function( elenco, campo ){
		let EL = [];	
		for(let e in elenco){
			if(EL.indexOf(elenco[e]) == -1)EL.push(elenco[e]);
		}
		return EL;
	},
	
	sezione: function( obj ){
		/*
			parametri obj:
			- nome (string)
			- label (string)
			- aperta (boolean)
			- img (string)
			- html (string)
			- etichette (boolean)
			- addFunct (string)
		
		*/
		if( localStorage.getItem("op_"+obj.nome) )obj.aperta = true;
		let img = obj.nome,
			HTML = '';
		if(obj.img)img = obj.img;
		HTML += '<div id="sez_cont_'+obj.nome+'"' +
				'	  class="sezioneTrattamenti divEspansa'+(!__(obj.aperta) ? ' sezioneChiusa' : '' )+'">' +	
				'	<em class="labelMobile labelTrattamenti"' +
				'  		onClick="H.swSezione(this);';
		if(obj.addFunct)HTML += obj.addFunct;
		HTML += '">';
		if(obj.img !== null)HTML += 
				'		<img class="icoLabel"' +
				'			 src="img/ico_'+img+'.png">';
		HTML += 		obj.label +
				'	</em>' +	
				'	<div id="cont_'+obj.nome+'">' +
				'		<div class="l"></div>';
		if(obj.html)HTML += obj.html;
		else HTML += '<i style="opacity:0.7;padding:20px;display: block;">'+TXT("NoRes")+'</i>';
		if(obj.etichette){
			// sezione ETICHETTE
			HTML +=
				'			<div id="contEtichette_'+obj.nome+'">' +
				'			</div>' +
				'			<div id="cont_label_add_'+obj.nome+'"' +
				'				 class="cont_label_add">' +
				'				<input type="text"' +
				'					   id="label_add_'+obj.nome+'"' +
				'					   class="label_add"' +
				'					   placeholder="'+htmlEntities(stripslashes(TXT("EtichettaSpiegazione")))+'"' +
				'					   onKeyup="H.filtraEtichetta(\''+obj.nome+'\',this);"'+H.noAutoGen+'/>' +
				'				<span id="label_close"' +
				'					  onClick="H.nasAggiungiEtichetta(\''+obj.nome+'\');">' +
				'				</span>' +
				'				<div class="p_label_add"' +
				'					 onClick="H.aggiungiEtichetta(\''+obj.nome+'\',this);">' +
									TXT("Nuovo") +
				'				</div>' +
				'				<div class="p_label_ann"' +
				'					 onClick="H.annullaEtichetta(\''+obj.nome+'\');">' +
									TXT("Annulla") +
				'				</div>' +
				'				<div class="elencoEtichette"' +
				'					 id="elencoEtichette_'+obj.nome+'">' +
				'				</div>' +
				'				<div class="l"></div>' +
				'			</div>' +
				'			<div class="cont_p_paz_label" id="cont_p_paz_label_'+obj.nome+'">' +
				'				<div id="p_paz_label_'+obj.nome+'"' +
				'					 class="p_paz_label"' +
				'					 onclick="H.visAggiungiEtichetta(\''+obj.nome+'\');">' +
									htmlEntities(TXT("EtichettaBtn")) +
				'				</div>'+
				'			</div>';	
		}
		HTML += '		<div class="l_a"></div>' +
				'	</div>' +
				'</div>';
		return HTML;
	},
	
	
	
	
	
	
	// etichette aggiuntive delle anagrafiche (clienti e fornitori)
	caricaEtichette: function( sezione ){ // carica le etichette personalizzate del paziente
		let HTML='';
		if(H.etichetteProvvisorie.length>0){
			for(let p in H.etichetteProvvisorie){
				if(H.etichetteProvvisorie[p].sezione == sezione){
					HTML += H.r({	t: "r", 
									name: "CSTMZ_"+H.etichetteProvvisorie[p].NomeEtichetta,
									value: H.etichetteProvvisorie[p].ValoreEtichetta,
									label: H.etichetteProvvisorie[p].NomeEtichetta,
									classCampo: "styled",
									keyupCampo: "H.aggiornaEtichette(this);",
									azCancella: "H.eliminaEtichetta("+p+");",
									azModifica: "H.modificaEtichetta(this,'"+sezione+"');",
									clickCampo: 'H.creaCombo(this,H.getElenco(H.getValoriEtichetta(this,\''+sezione+'\'),this));',
									focusCampo: 'H.creaCombo(this,H.getElenco(H.getValoriEtichetta(this,\''+sezione+'\'),this));' });
				}
			}
		}
		document.getElementById('contEtichette_'+sezione).innerHTML = HTML;
	},
	visAggiungiEtichetta: function( sezione ){
		document.getElementById('cont_label_add_'+sezione).style.display = 'block';
		document.getElementById('cont_p_paz_label_'+sezione).style.display = 'none';
		if(mouseDetect)document.getElementById('label_add_'+sezione).focus();
		H.popolaEtichette(sezione);
	},
	nasAggiungiEtichetta: function( sezione ){
		document.getElementById('cont_label_add_'+sezione).style.display = 'none';
		document.getElementById('cont_p_paz_label_'+sezione).style.display = 'inline-block';
		document.getElementById('elencoEtichette_'+sezione).classList.remove("visSch");
	},
	aggiungiEtichetta: function( sezione, el ){ // aggiunge un'etichetta personalizzata al paziente
		let txt=document.getElementById("label_add_"+sezione).value,
			pass = true,
			oldValue = '';
		if(txt.trim()=='')pass=false;
		if(document.getElementById("label_add_"+sezione).dataset.oldValue){ // verifico se è in modifica con oldValue
			oldValue = document.getElementById("label_add_"+sezione).dataset.oldValue;
		}
		let els = document.getElementById("elencoEtichette_"+sezione).getElementsByClassName("elMod");
		for(let e in els){
			if(els[e].dataset){
				let val = els[e].dataset.value.toLowerCase();
				if(	val.trim() == txt.toLowerCase().trim() && !oldValue ){
					H.selezionaEtichetta(e,sezione);
					return;
				}
			}
		}
		// verifico doppione
		if(!oldValue){
			for(let e in H.etichetteProvvisorie){
				if(	txt.trim() == H.etichetteProvvisorie[e]["NomeEtichetta"] && 
					sezione == H.etichetteProvvisorie[e]["sezione"]){
					ALERT(TXT("erroreDuplicazioneElemento"))
					return;
				}
			}
		}
		let id=0;
		if(pass){
			
			JSNPUSH={	"idEtichetta": id*1,
						"NomeEtichetta": txt.trim(),
						"ValoreEtichetta": "",
						"sezione": sezione };
			
			if(!oldValue){
				SCHEDA.formModificato = true;
				if(H.etichetteProvvisorie=='')H.etichetteProvvisorie=[];
				H.etichetteProvvisorie.push(JSNPUSH);
				H.caricaEtichette(sezione);
			}else{
				if(oldValue!=txt){
					let modificato = false,
						DataModifica = DB.pazienti.lastSync+1,
						PZ = [ DB.pazienti.data, DB.fornitori.data];
					for(let d in PZ){
						for(let p in PZ[d]){
							let etichette = toJson(PZ[d][p].etichette),
								etMod = false;
							if(etichette.length){
								for(let e in etichette){
									if(	etichette[e].NomeEtichetta == oldValue &&
										etichette[e].sezione == sezione ){
										etichette[e].NomeEtichetta = txt.trim();
										modificato = true;
										etMod = true;
									}
								}
							}
							if(etMod){
								PZ[d][p].DataModifica = DataModifica;
								PZ[d][p].etichette = etichette;
							}
						}
					}
					for(let p in H.etichetteProvvisorie){
						if(H.etichetteProvvisorie[p].NomeEtichetta == oldValue){
							H.etichetteProvvisorie[p].NomeEtichetta = txt;
						}
					}
					H.popolaEtichette(sezione);
					H.caricaEtichette(sezione);
					if(modificato){
						applicaLoading(document.getElementById("scheda_testo"));
						applicaLoading(document.getElementById("elenchi_lista"));
						Promise.all([
							localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)),
							localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori))
						]).then(function(){
							LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
												'rimuoviLoading(document.getElementById("elenchi_lista"));' );
						});
					}
				}
			}
			document.getElementById("label_add_"+sezione).value='';
			if(!oldValue)H.nasAggiungiEtichetta(sezione);
			if(mouseDetect && !oldValue)document.getElementById("CSTMZ_"+txt).focus();
		}
		H.popolaEtichette(sezione);
		H.caricaEtichette(sezione);
		if(oldValue)H.annullaEtichetta(sezione);
	},
	aggiornaEtichette: function( el ){
		let etichetta = el.id.replace("CSTMZ_","");
		for(let e in H.etichetteProvvisorie){
			if(H.etichetteProvvisorie[e].NomeEtichetta == etichetta){
				H.etichetteProvvisorie[e].ValoreEtichetta = el.value;
			}
		}
	},
	eliminaEtichetta: function( n ){ // elimina un'etichetta personalizzata del paziente
		let sezione = H.etichetteProvvisorie[n].sezione;
		H.etichetteProvvisorie.splice(n, 1); 
		H.caricaEtichette(sezione);
		H.popolaEtichette(sezione);
		H.annullaEtichetta(sezione);
		SCHEDA.formModificato = true;
	},
	getEtichette: function( sezione, elenchi ){ // restituisce l'elenco globale delle etichette personalizzate
		elenchi = __(elenchi,[ DB.pazienti.data, DB.fornitori.data]); 
		sezione = __(sezione);
		let ETICHETTE = [],
			PZ = elenchi;
		for(let d in PZ){
			for(let p in PZ[d]){
				let etichette = toJson(__(PZ[d][p].etichette,[]));
				if(etichette.length){
					for(t in etichette){
						if(!__(etichette[t].sezione))etichette[t].sezione='aggiuntive';
						let pass = true;
						for(T in ETICHETTE){
							if(ETICHETTE[T]==etichette[t].NomeEtichetta)pass = false;
						}
						if(sezione){
							if(etichette[t].sezione!=sezione)pass = false;
						}
						if(pass)ETICHETTE.push(etichette[t].NomeEtichetta);
					}
				}
			}
		}
		if(sezione && etichette_campi[sezione].length){
			for(let e in etichette_campi[sezione]){
				let etichetta = etichette_campi[sezione][e][globals.siglaLingua];
				let pass = true;
				for(T in ETICHETTE){
					if(ETICHETTE[T]==etichetta)pass = false;
				}
				if(pass)ETICHETTE.push(etichetta);
			}
		}
		return ETICHETTE;
	},
	selezionaEtichetta: function( t, sezione ){
		let id=0;
		let globalEtichette = H.getEtichette(sezione);
		JSNPUSH={	"idEtichetta": id*1,
					"NomeEtichetta": globalEtichette[t].trim(),
					"ValoreEtichetta": "",
					"sezione": sezione };
			
		SCHEDA.formModificato = true;
		if(H.etichetteProvvisorie=='')H.etichetteProvvisorie=[];
		H.etichetteProvvisorie.push(JSNPUSH);
		H.caricaEtichette(sezione);
		document.getElementById("label_add_"+sezione).value='';
		H.nasAggiungiEtichetta(sezione);
		if(mouseDetect)document.getElementById("CSTMZ_"+globalEtichette[t]).focus();
		H.annullaEtichetta(sezione);
	},
	popolaEtichette: function( sezione ){
		let HTML = '',
			globalEtichette = H.getEtichette(sezione);
		for(t in globalEtichette){
			let pass = true;
			for(let e in H.etichetteProvvisorie){
				if(H.etichetteProvvisorie[e].NomeEtichetta == globalEtichette[t])pass = false;
			}
			if(pass)HTML += '<div id="label_'+sezione+'_'+t+'">' +
							'	<div class="labelElenco"' +
							'		 onClick="H.selezionaEtichetta('+t+',\''+sezione+'\');">' +
									htmlEntities(globalEtichette[t]) +
							'	</div>' +
							'	<div class="elMod"' +
							'		 data-value="'+htmlEntities(globalEtichette[t])+'"' +
							'		 onClick="H.modificaEtichetta(this,\''+sezione+'\');"></div>' +
							'</div>';
		}
		document.getElementById("elencoEtichette_"+sezione).innerHTML = HTML;
		document.getElementById("elencoEtichette_"+sezione).style.display = 'block';
		if(!HTML)document.getElementById("elencoEtichette_"+sezione).style.display = 'none';
	},
	getValoriEtichetta: function( campo, sezione ){ // restituisce l'elenco globale dei valori delle etichette personalizzate
		let etichetta = campo.name.replace("CSTMZ_",""),
			VALORI = [],
			PZ = [ DB.pazienti.data, DB.fornitori.data ];
		for(let d in PZ){
			for(let p in PZ[d]){
				let etichette = toJson(__(PZ[d][p].etichette,[]));
				if(typeof(etichette)=='string')etichette = JSON.parse(etichette)
				if(etichette.length){
					for(t in etichette){
						 if(etichetta==etichette[t].NomeEtichetta){
							if(	VALORI.indexOf(etichette[t].ValoreEtichetta)==-1 &&
								etichette[t].sezione==sezione ){
								VALORI.push(etichette[t].ValoreEtichetta);
							}
						 }
					}
				}
			}
		}
		return VALORI;
	},
	swSezione: function( el ){
		let sezione = el.parentElement.id.split("_")[2],
			op = el.parentElement.classList.contains('sezioneChiusa') ? '1' : '';
		el.parentElement.classList.toggle('sezioneChiusa');
		localStorage.setItem("op_"+sezione,op);
	},
	scriviEtichette: function( sezione ){
		let HTML = '';
		for(let p in etichette){
			if(etichette[p].sezione == sezione){
				HTML += '<div><i>'+htmlEntities(etichette[p].NomeEtichetta)+':</i> ' + htmlEntities(etichette[p].ValoreEtichetta)+'</div>';
			}
		}
		return HTML;
	},
	modificaEtichetta: function( el, sezione ){
		H.visAggiungiEtichetta(sezione);
		let valore = el.dataset.value,
			cont = document.getElementById("cont_label_add_"+sezione),
			campo = cont.getElementsByTagName("input")[0],
			pulsanteModifica = cont.getElementsByTagName("div")[0],
			pulsanteAnnulla = cont.getElementsByTagName("div")[1];
		campo.value = valore;
		campo.dataset.oldValue = valore;
		pulsanteModifica.dataset.oldName = pulsanteModifica.innerHTML;
		pulsanteModifica.innerHTML = htmlEntities(TXT("Modifica"));
		pulsanteAnnulla.classList.add("visBtn");
		cont.classList.add("modEl");
		campo.focus();
	},
	annullaEtichetta: function( sezione ){
		let cont = document.getElementById("cont_label_add_"+sezione),
			campo = cont.getElementsByTagName("input")[0],
			pulsanteModifica = cont.getElementsByTagName("div")[0],
			pulsanteAnnulla = cont.getElementsByTagName("div")[1];
		campo.value = '';
		campo.dataset.oldValue = '';
		if(pulsanteModifica.dataset.oldName)pulsanteModifica.innerHTML = pulsanteModifica.dataset.oldName;
		pulsanteModifica.dataset.oldName = '';
		cont.classList.remove("modEl");
		pulsanteAnnulla.classList.remove("visBtn");
	},
	filtraEtichetta: function( sezione, el ){
		if(event.keyCode==13){
			el.blur();
			H.aggiungiEtichetta(sezione,el);
		}else{
			let elenco = document.getElementById("elencoEtichette_"+sezione),
				els = elenco.getElementsByClassName("elMod"),
				campo = document.getElementById("label_add_"+sezione),
				oldValue = campo.dataset.oldValue;
			if(typeof(oldValue)=='undefined')oldValue = '';
			if(oldValue==''){
				let txt = campo.value.toLowerCase().trim(),
					presenti = false;
				for(let e in els){
					if(els[e].dataset){
						if(els[e].dataset.value.toLowerCase().indexOf(txt)>-1 || txt==''){
							els[e].parentElement.style.display = 'block';
							presenti = true;
						}else{
							els[e].parentElement.style.display = 'none';
						}
					}
				}
				if(presenti)elenco.style.display = 'block';
				else elenco.style.display = 'none';
			}
		}
	},
	
	
	// gestione dei menu a icona (es. mezzo su trattamento 
	selTT: function( n, id, html ){ // crea il menu
		H.removeTT();
		let tt = document.createElement("span"),
			el = document.getElementById(id+n);
		el.classList.add("tt_on");
		tt.id = 'tt_mezzival';
		tt.dataset.n = n;
		tt.dataset.on = '0';
		tt.dataset.el = id;
		tt.onmouseenter = function(){
			this.dataset.on = '1';
		};
		tt.onmouseleave = function(){
			this.dataset.on = '0';
		};
		tt.innerHTML += html;
		document.getElementById("scheda_testo").appendChild(tt);
		document.getElementById("scheda_testo").addEventListener("scroll",H.removeTT,false);
		document.addEventListener("mouseup",H.removeTT,false);
		H.riposTT();
	},
	removeTT: function(){ // rimuove il menu
		if(!document.getElementById("tt_mezzival"))return;
		let tt = document.getElementById("tt_mezzival");
		if(tt.dataset.on=='0'){
			let el = document.getElementById(tt.dataset.el+tt.dataset.n);
			el.classList.remove("tt_on");
			document.getElementById("scheda_testo").removeChild(tt);
			document.getElementById("scheda_testo").removeEventListener("scroll",H.removeTT,false);
			document.removeEventListener("mouseup",H.removeTT,false);
		}
	},
	riposTT: function(){ // riposizione il menu
		let tt = document.getElementById("tt_mezzival"),
			el = document.getElementById(tt.dataset.el+tt.dataset.n);
		tt.style.top = (tCoord(el,'y') - tCoord(document.getElementById("scheda"),'y') - document.getElementById("scheda_testo").scrollTop + 27)+'px';
		tt.style.left = (tCoord(el) - tCoord(document.getElementById("scheda")) - 18)+'px';
	},
	
}