
var CATALOGO = {
	//
	scriviListaSets: function(){
		var HTML_elenco = 	'';
		for(cartella in sets){
			if(	cartella != 'anatomy_full' &&
				cartella != 'clients_full'){
				var addClass = '';
				var linkSet = 'caricaSet(\''+cartella+'\',this);MENU.visSets();';
				if(cartella == globals.set.cartella)linkSet = 'SCHEDA.apriElenco(\'set\')';
				if(sets[cartella].locked){
					linkSet = 'MENU.visElencoSets(\''+cartella+'\');';
					addClass = ' class="lockedMap"';
				}


				HTML_elenco += 	'<div style="background-image: url(sets/'+cartella+'/img/logoNero.png), '+ ((sets[cartella].locked) ? ' none, url(img/work.png)' : 'url(img/frDxB.png), none') +';"' +
								addClass +
								'	  onClick="'+linkSet+'">' +
									htmlEntities(sets[cartella].nome) +
									( (sets[cartella].locked) ? "<span>work in progress</span>" : "" ) +
								'</div>';
			}
		}
		document.getElementById("sets_elenco").innerHTML = HTML_elenco;
	},
	scriviElencoSets: function( set ){
		var HTML_elenco = 	'';
		var HTML_cont = '';
		var HTML_imgs = '';
		for(cartella in sets){
			HTML_elenco += 	'<div id="e_'+cartella+'"' +
							' 	  style="background-image:url(sets/'+cartella+'/img/logoNero.png);"' +
							' 	  onClick="CATALOGO.selSet(this);">' +
							'</div>';

			HTML_cont += '<div id="p_'+cartella+'"' +
						 ' 		style="display:none;background-image:';
			if(sets[cartella].locked)HTML_cont += 'url(img/work.png),';
			else HTML_cont += 'none,';
			HTML_cont += 'url(sets/'+cartella+'/img/logoBig.png);';
			//if(globals.set.cartella == cartella)HTML_cont += ' class="setOpened"';
			HTML_cont += '">';
			if(DB.login.data.auths.indexOf(cartella)>-1 && LOGIN.logedin()){
				HTML_cont += '<span class="costoSet"><span class="btn_acquistato">' +
							 	htmlEntities(Lingua(TXT_SetAcquistato)) +
							 '</span></span>';
			}
			var ChiediInfo = htmlEntities(Lingua(TXT_ComeAttivare));
			if(sets[cartella].locked && sets[cartella].dataPubblicazione){
				var aaaa = sets[cartella].dataPubblicazione.split("-")[0]*1;
				var mm = sets[cartella].dataPubblicazione.split("-")[1]*1;
				HTML_cont += '<span class="pubblSet">' +
							 '	<i>'+htmlEntities(Lingua(TXT_DataPubblicazione))+'</i><br>' +
							 	nomiMesi[globals.siglaLingua][mm-1]+" "+aaaa +
							 '</span>';
				ChiediInfo = htmlEntities(Lingua(TXT_ChiediInfo));
			}
			HTML_cont += '<span class="btnSet">';
			if(	!sets[cartella].locked && globals.set.cartella != cartella &&
				sets[cartella].opening ){
				HTML_cont += '<span class="btn_invia"' +
							 '		onClick="caricaSet(\''+cartella+'\',this);">';
				if(DB.login.data.auths.indexOf(cartella)==-1 || !LOGIN.logedin())HTML_cont += htmlEntities(Lingua(TXT_ApriDemo).toUpperCase());
				else HTML_cont += htmlEntities(Lingua(TXT_ApriSet).toUpperCase());
				HTML_cont += '</span>';
			}else if(globals.set.cartella == cartella)HTML_cont += '<span class="setOpened">' + htmlEntities(Lingua(TXT_SetAperto).toUpperCase()) + '</span>';
			HTML_cont += '	</span>';
			if(DB.login.data.auths.indexOf(cartella)==-1 || !LOGIN.logedin()){
				HTML_cont += '<span class="costoSet"><span class="btn_info"' +
							 '		onClick="CATALOGO.infoSet(\''+cartella+'\');">' +
							 	ChiediInfo +
							 '</span></span>';
			}
			HTML_cont += '	<span class="titSet">' +
						 '		<b>'+sets[cartella].nome+'</b><br>' +
						 '		<i>'+sets[cartella].sottotitolo+'</i>' +
						 '	</span>' +
						 '	<span class="txtSet">' +
								htmlEntities(stripslashes(sets[cartella].descrizione)).replace(/\n/g,"<br>").replace("[anatomy_full]",'<img src="sets/anatomy_full/img/logoBianco.png" class="imgSetDesc"> <i>'+sets.anatomy_full.nome+'</i>').replace("[clients_full]",'<img src="sets/clients_full/img/logoBianco.png" class="imgSetDesc"> <i>'+sets.clients_full.nome+'</i>') +
						 '	</span>' +
						 '</div>';
			HTML_imgs += '<img src="sets/'+cartella+'/img/logoNero.png"' +
						 '	   onClick="this.classList.toggle(\'imgSetSel\');"' +
						 '	   id="i_'+cartella+'">';
		}

		HTML_elenco += 	'<div id="e_info"' +
						' 	  style="background-image:url(sets/info/img/logoNero.png);"' +
						' 	  onClick="CATALOGO.selSet(this);">' +
						'</div>';

		HTML_cont += '<div id="p_info"' +
					 '	   style="display:none;">' +
					 '	<div>' +
					 '		<h2>' +
					 			htmlEntities(stripslashes(Lingua(TXT_SpiegazioneSetsTit))) +
					 '		</h2>' +
					 '		<p>' +
					 			htmlEntities(stripslashes(Lingua(TXT_SpiegazioneSetsTxt))) +
					 '		</p>' +
					 '		<form name="attivazioneForm"' +
					 '		  	  id="attivazioneForm"' +
					 '		  	  method="post"' +
					 '		  	  onSubmit="return false;">' +
					 '			<div>' +
					 '				<p id="imgsSets">Sets: ' +
					 					HTML_imgs +
					 '				</p>' +
					 '				<input type="text"' +
					 '					   name="Nominativo"' +
					 '					   id="@|'+htmlEntities(Lingua(TXT_Nominativo))+'|1|0"' +
					 '					   placeholder="'+htmlEntities(Lingua(TXT_Nominativo))+'">' +
					 '				<input type="email"' +
					 '					   name="Email"' +
					 '					   id="@|'+htmlEntities(Lingua(TXT_Email))+'|1|0|@"' +
					 '					   placeholder="'+htmlEntities(Lingua(TXT_Email))+'">' +
					 '				<div class="btns">' +
					 '					<div class="btn_invia"' +
					 '						 onClick="CATALOGO.inviaRichiesta();">' +
					 						htmlEntities(Lingua(TXT_InviaRichiesta)) +
					 '					</div>' +
					 '				</div>' +
					 '			</div>' +
					 '		</form>' +
					 '	</div>' +
					 '</div>';

		document.getElementById("contSets").innerHTML = '<div id="setElenco">' +
															HTML_elenco +
														'</div>' +
														'<div id="setCont">' +
															HTML_cont +
														'</div>';
		if(!set)set = 'anatomy_full';
		CATALOGO.selSet(document.getElementById("e_"+set));
	},
	selSet: function( el ){
		if(CATALOGO.setSel){
			var cartella = CATALOGO.setSel.id.substr(2,CATALOGO.setSel.id.length-2);
			CATALOGO.setSel.style.backgroundImage = 'url(sets/'+cartella+'/img/logoNero.png)';
			CATALOGO.setSel.classList.remove("setSel");
			document.getElementById("p_"+cartella).style.display = 'none';
		}
		var cartella = el.id.substr(2,el.id.length-2);
		el.style.backgroundImage = 'url(sets/'+cartella+'/img/logoBlu.png)';
		el.classList.add("setSel");
		document.getElementById("p_"+cartella).style.display = 'block';
		CATALOGO.setSel = el;
	},
	infoSet: function( cartella ){
		var ims = document.getElementById("imgsSets").getElementsByTagName("img");
		for(i=0;i<ims.length;i++){
			ims[i].classList.remove("imgSetSel");
		}
		document.getElementById("i_"+cartella).classList.add("imgSetSel");
		CATALOGO.selSet(document.getElementById("e_info"));
	},
	inviaRichiesta: function(){
		var pass = false;
		var ims = document.getElementById("imgsSets").getElementsByTagName("img");
		for(i=0;i<ims.length;i++){
			if(ims[i].classList.contains("imgSetSel"))pass=true;
		}
		if(!pass){
			ALERT(Lingua(TXT_ErroreNessunSet))
			return;
		}
		if(verifica_form(document.getElementById("attivazioneForm"))){
			var sets = " - ";
			var ims = document.getElementById("imgsSets").getElementsByTagName("img");
			for(i=0;i<ims.length;i++){
				if(ims[i].classList.contains("imgSetSel"))sets += ims[i].id.replace("i_","")+" - ";
			}
			applicaLoading(document.getElementById("p_info"))
			var JSNPOST={	"Oggetto": "Richiesta attivazione set ("+globals.siglaLingua+")",
							"Messaggio": "Vorrei informazioni sui set: "+sets,
							"Nominativo": document.attivazioneForm.Nominativo.value,
							"Email": document.attivazioneForm.Email.value };

			CONN.caricaUrl(	"feedback.php",
							"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
							function(txt){
								// conferma l'invio di un feedback
								rimuoviLoading(document.getElementById("p_info"))
								var err=false;
								if(txt.substr(0,3)!='404'){
									var ris=JSON.parse(txt);
									if(ris.Conferma=='1'){
										ALERT(Lingua(TXT_FeedbackInviato));
										document.feedbackForm.Nominativo.value = "";
										document.feedbackForm.Email.value = "";
										document.feedbackForm.Oggetto.value = "";
										document.feedbackForm.Messaggio.value = "";
									}else err=true;
								}else err=true;
								if(err)ALERT(Lingua(TXT_FeedbackErrore));
							} );
		}
	}

}
