var H = {
	noAutoGen: ' autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"',
	sl: '<span class="nb">/</span>',
	imgSyncro: function(){
		var HTML = '';
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
					'title="'+Lingua(TXT_ElementoNonSincronizzato)+'">';*/
		}
		return HTML;
	},
	target: (window.cordova && window.cordova.platformId !== 'windows') ? '_system': '_blank',
	chr10: String.fromCharCode(10),
	chr13: String.fromCharCode(13),
	tab: String.fromCharCode(9),
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
			obj.t != 'v' )obj.label = Lingua(eval("TXT_"+obj.name));
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
		var id = obj.name;
		if(obj.ver)id = obj.ver;
		var addCampo = '';
		if(obj.classCampo)addCampo += ' class="'+obj.classCampo+'"';
		if(obj.styleCampo)addCampo += ' style="'+obj.styleCampo+'"';
		if(obj.keyupCampo)addCampo += ' onKeyUp="'+obj.keyupCampo+'"';
		if(obj.clickCampo)addCampo += ' onClick="'+obj.clickCampo+'"';
		if(obj.focusCampo)addCampo += ' onFocus="'+obj.focusCampo+'"';
		
		var html = '';
		
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
						'		onKeyUp="return H.keyTelefono(this,'+(id.indexOf("|cell")>-1)+');"'/* +
						'		onBlur="return H.blurTelefono(this,'+(id.indexOf("|cell")>-1)+');"'*/;
						
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
				for(o in obj.opts){
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
				
				var giorno = '',
					mese = '',
					anno = '';
				var Data = obj.value;
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
	
	keyData: function( event, el ){
		var id = el.parentElement.id;
		var giorno=document.getElementById("giorno" + id).value;
		var mese=document.getElementById("mese" + id).value;
		var anno=document.getElementById("anno" + id).value;
		var maxGiorni = 31;
		var errore = false;
		if( mese*1 > 0 && anno*1 > 0 ){
			var d = new Date(anno*1,mese*1,0);
			var maxGiorni=d.getDate();	
		}
		Filtro = /^[\d]+$/;
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
	verData: function( id, notNull ){ 
		if(typeof(notNull) == 'undefined')var notNull = false;
		var giorno=document.getElementById("giorno" + id).value;
		var mese=document.getElementById("mese" + id).value;
		var anno=document.getElementById("anno" + id).value;
		var i=0;
		if(giorno.trim()*1)i++;
		if(mese.trim()*1)i++;
		if(anno.trim()*1)i++;
		var m = 0;
		if(notNull)m = -1;
		if(i>m && i<3){
			// data non valida
			ALERT(Lingua(TXT_dataNonCorretta).replace("[d]",Lingua(eval("TXT_"+id))));
			return false;
		}else{
			return true;
		}
	},
	
	keyTelefono: function( el, cell ){
		var cell = __(cell);
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
		Filtro = /^[\d]+[\.,]{0,1}[\d]*$/;
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
	
	creaCombo: function( el, lista){
		if(typeof(lista) == 'undefined')var lista = [];
		if(lista.length){
			
			if(H.elCombo)H.rimuoviCombo();
			H.elCombo = el;
			
			var HTML = '';
			var sch = document.getElementById("scheda_testo");
			for(l in lista){
				HTML += '<span onMouseUp="H.selComboVal(this);"' +
						'	   onMouseOver="H.overCombo();"' +
						'	   onMouseOut="H.outCombo();"' +
						'	   class="comboElVis">'+htmlEntities(lista[l])+'</span>';
			}
			
			document.getElementById("combo").innerHTML = HTML;
			sch.addEventListener("scroll", H.rimuoviCombo, false);
			/*window.addEventListener("wheel", function(){
				H.comboOver=false;
				H.rimuoviCombo();
			}, false);*/
			window.addEventListener("mouseup", H.rimuoviCombo, false);
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
		if(!H.comboOver){
			H.nasCombo();
			document.getElementById("scheda_testo").removeEventListener("scroll", H.rimuoviCombo);
			window.removeEventListener("wheel", H.rimuoviCombo);
			window.removeEventListener("mouseup", H.rimuoviCombo);
			H.elCombo.removeEventListener("mouseup", H.filtraCombo);
			H.elCombo.removeEventListener("mouseover", H.overCombo, false);
			H.elCombo.removeEventListener("mouseout", H.outCombo, false);
		}
	},
	blurCombo: function(){
		H.elCombo.parentElement.removeChild(document.getElementById("combo"));
		H.elCombo.removeEventListener("keyup", H.filtraCombo, false);
		H.elCombo.removeEventListener("blur", H.blurCombo, false);
		H.elCombo = null;
	},
	riposCombo: function(){
		var sch = document.getElementById("scheda_testo");
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
		var val = H.elCombo.value.toLowerCase();
		var els = document.getElementById("combo").getElementsByTagName("span");
		var pres = false;
		for(e=0;e<els.length;e++){
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
		H.rimuoviCombo();
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
		var EL = [];	
		for(p in db){
			if( db[p][campo.name].trim() &&
				EL.indexOf(db[p][campo.name]) == -1 &&
				db[p].Cancellato*1 != 1)EL.push(db[p][campo.name]);
		}
		EL.sort()
		return EL;
	},
	getElenco: function( elenco, campo ){
		var EL = [];	
		for(e in elenco){
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
		
		*/
		if( localStorage.getItem("op_"+obj.nome) )obj.aperta = true;
		var img = obj.nome;
		if(obj.img)img = obj.img;
		var HTML = '';
		HTML += '<div id="sez_cont_'+obj.nome+'"' +
				'	  class="sezioneTrattamenti divEspansa'+(!__(obj.aperta) ? ' sezioneChiusa' : '' )+'">' +	
				'	<em class="labelMobile labelTrattamenti"' +
				'  		onClick="H.swSezione(this);">' +
				'		<img class="icoLabel"' +
				'			 src="img/ico_'+img+'.png">' +
						obj.label +
				'	</em>' +	
				'	<div id="cont_'+obj.nome+'">' +
				'		<div class="l"></div>' +
							obj.html;
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
				'					   placeholder="'+htmlEntities(stripslashes(Lingua(TXT_EtichettaSpiegazione)))+'"' +
				'					   onKeyup="H.filtraEtichetta(\''+obj.nome+'\',this);"'+H.noAutoGen+'/>' +
				'				<div class="p_label_add"' +
				'					 onClick="H.aggiungiEtichetta(\''+obj.nome+'\',this);">' +
									Lingua(TXT_Nuovo) +
				'				</div>' +
				'				<span id="label_close"' +
				'					  onClick="H.nasAggiungiEtichetta(\''+obj.nome+'\');">' +
				'				</span>' +
				'				<div class="elencoEtichette"' +
				'					 id="elencoEtichette_'+obj.nome+'">' +
				'				</div>' +
				'				<div class="l"></div>' +
				'			</div>' +
				'			<div id="cont_p_paz_label_'+obj.nome+'"' +
				'				 style="height: 35px;padding-top: 5px;">' +
				'				<div id="p_paz_label_'+obj.nome+'"' +
				'					 class="p_paz_label"' +
				'					 onclick="H.visAggiungiEtichetta(\''+obj.nome+'\');">' +
									htmlEntities(Lingua(TXT_EtichettaBtn)) +
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
		var HTML='';
		if(H.etichetteProvvisorie.length>0){
			for(p in H.etichetteProvvisorie){
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
		var txt=document.getElementById("label_add_"+sezione).value;
		var globalEtichette = H.getEtichette(sezione);
		var pass = true;
		if(txt.trim()=='')pass=false;
		var oldValue = '';
		if(document.getElementById("label_add_"+sezione).dataset.oldValue){ // verifico se è in modifica con oldValue
			oldValue = document.getElementById("label_add_"+sezione).dataset.oldValue;
		}
		var els = document.getElementById("elencoEtichette_"+sezione).getElementsByClassName("elMod");
		for(e in els){
			if(els[e].dataset){
				var val = els[e].dataset.value.toLowerCase();
				if(	val.trim() == txt.toLowerCase().trim() && !oldValue ){
					H.selezionaEtichetta(e,sezione);
					return;
				}
			}
		}
		var id=0;
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
					var modificato = false;
					var DataModifica = DB.pazienti.lastSync+1;
					var PZ = [ DB.pazienti.data, DB.fornitori.data];
					for(d in PZ){
						for(p in PZ[d]){
							var etichette = toJson(PZ[d][p].etichette);
							var etMod = false;
							if(etichette.length){
								for(e in etichette){
									if(	etichette[e].NomeEtichetta == oldValue &&
										etichette[e].sezione == sezione ){
										etichette[e].NomeEtichetta = txt;
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
					for(p in H.etichetteProvvisorie){
						if(H.etichetteProvvisorie[p].NomeEtichetta == oldValue){
							H.etichetteProvvisorie[p].NomeEtichetta = txt;
						}
					}
					H.popolaEtichette(sezione);
					H.caricaEtichette(sezione);
					if(modificato){
						applicaLoading(document.getElementById("scheda_testo"));
						applicaLoading(document.getElementById("elenchi_lista"));
						localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".pazienti"), IMPORTER.COMPR(DB.pazienti)).then(function(){ // salvo il DB
							localPouchDB.setItem(MD5("DB"+LOGIN._frv()+".fornitori"), IMPORTER.COMPR(DB.fornitori)).then(function(){ // salvo il DB
								LOGIN.sincronizza(	'rimuoviLoading(document.getElementById("scheda_testo"));' +
													'rimuoviLoading(document.getElementById("elenchi_lista"));' );
							});
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
		var etichetta = el.id.replace("CSTMZ_","");
		for(e in H.etichetteProvvisorie){
			if(H.etichetteProvvisorie[e].NomeEtichetta == etichetta){
				H.etichetteProvvisorie[e].ValoreEtichetta = el.value;
			}
		}
	},
	eliminaEtichetta: function( n ){ // elimina un'etichetta personalizzata del paziente
		var sezione = H.etichetteProvvisorie[n].sezione;
		H.etichetteProvvisorie.splice(n, 1); 
		H.caricaEtichette(sezione);
		H.popolaEtichette(sezione);
		SCHEDA.formModificato = true;
	},
	getEtichette: function( sezione, elenchi ){ // restituisce l'elenco globale delle etichette personalizzate
		var sezione = __(sezione);
		var elenchi = __(elenchi,[ DB.pazienti.data, DB.fornitori.data]); 
		var ETICHETTE = [];
		var PZ = elenchi;
		for(d in PZ){
			for(p in PZ[d]){
				var etichette = toJson(__(PZ[d][p].etichette,[]));
				if(etichette.length){
					for(t in etichette){
						if(!__(etichette[t].sezione))etichette[t].sezione='aggiuntive';
						var pass = true;
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
			for(e in etichette_campi[sezione]){
				var etichetta = etichette_campi[sezione][e][globals.siglaLingua];
				var pass = true;
				for(T in ETICHETTE){
					if(ETICHETTE[T]==etichetta)pass = false;
				}
				if(pass)ETICHETTE.push(etichetta);
			}
		}
		return ETICHETTE;
	},
	selezionaEtichetta: function( t, sezione ){
		if(typeof(id)=='undefined')var id=0;
		var globalEtichette = H.getEtichette(sezione);
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
		var HTML = '';
		var globalEtichette = H.getEtichette(sezione);
		for(t in globalEtichette){
			var pass = true;
			for(e in H.etichetteProvvisorie){
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
		var etichetta = campo.name.replace("CSTMZ_","");
		var VALORI = [];
		var PZ = [ DB.pazienti.data, DB.fornitori.data ];
		for(d in PZ){
			for(p in PZ[d]){
				var etichette = toJson(__(PZ[d][p].etichette,[]));
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
		var sezione = el.parentElement.id.split("_")[2];
		el.parentElement.classList.toggle('sezioneChiusa');
		var op = el.parentElement.classList.contains('sezioneChiusa') ? '' : '1';
		localStorage.setItem("op_"+sezione,op);
	},
	scriviEtichette: function( sezione ){
		var HTML = '';
		for(p in etichette){
			if(etichette[p].sezione == sezione){
				HTML += '<div><i>'+htmlEntities(etichette[p].NomeEtichetta)+':</i> ' + htmlEntities(etichette[p].ValoreEtichetta)+'</div>';
			}
		}
		return HTML;
	},
	modificaEtichetta: function( el, sezione ){
		H.visAggiungiEtichetta(sezione);
		var valore = el.dataset.value;
		var cont = document.getElementById("cont_label_add_"+sezione);
		var campo = cont.getElementsByTagName("input")[0];
		var pulsante = cont.getElementsByTagName("div")[0];
		campo.value = valore;
		campo.dataset.oldValue = valore;
		pulsante.dataset.oldName = pulsante.innerHTML;
		pulsante.innerHTML = htmlEntities(Lingua(TXT_Modifica));
		cont.classList.add("modEl");
		campo.focus();
	},
	annullaEtichetta: function( sezione ){
		var cont = document.getElementById("cont_label_add_"+sezione);
		var campo = document.getElementById(obj.el.toLowerCase()+"_add");
		var el = cont.getElementsByTagName("div")[0];
		campo.value = '';
		campo.dataset.oldValue = '';
		if(el.dataset.oldName)el.innerHTML = el.dataset.oldName;
		el.dataset.oldName = '';
		cont.classList.remove("modEl");
	},
	filtraEtichetta: function( sezione, el ){
		if(event.keyCode==13)H.aggiungiEtichetta(sezione,el);
		else{
			var elenco = document.getElementById("elencoEtichette_"+sezione);
			var els = elenco.getElementsByClassName("elMod");
			var campo = document.getElementById("label_add_"+sezione);
			var oldValue = campo.dataset.oldValue;
			if(typeof(oldValue)=='undefined')oldValue = '';
			if(oldValue==''){
				var txt = campo.value.toLowerCase().trim();
				var presenti = false;
				for(e in els){
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
		var tt = document.createElement("span");
		var el = document.getElementById(id+n);
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
		var tt = document.getElementById("tt_mezzival");
		if(tt.dataset.on=='0'){
			var el = document.getElementById(tt.dataset.el+tt.dataset.n);
			el.classList.remove("tt_on");
			document.getElementById("scheda_testo").removeChild(tt);
			document.getElementById("scheda_testo").removeEventListener("scroll",H.removeTT,false);
			document.removeEventListener("mouseup",H.removeTT,false);
		}
	},
	riposTT: function(){ // riposizione il menu
		var tt = document.getElementById("tt_mezzival");
		var el = document.getElementById(tt.dataset.el+tt.dataset.n);
		tt.style.top = (tCoord(el,'y') - tCoord(document.getElementById("scheda"),'y') - document.getElementById("scheda_testo").scrollTop + 27)+'px';
		tt.style.left = (tCoord(el) - tCoord(document.getElementById("scheda")) - 18)+'px';
	},
	
}