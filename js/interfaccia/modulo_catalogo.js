
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
					//linkSet = 'MENU.visElencoSets(\''+cartella+'\');';
					linkSet = '';
					addClass = ' class="lockedMap"';
				}


				HTML_elenco += 	'<div style="background-image: url(sets/'+cartella+'/img/logoNero.png), '+ ((sets[cartella].locked) ? ' none, url(img/ico_clessidraBlu.png)' : 'url(img/frDxB.png), none') +';"' +
								addClass +
								'	  onClick="'+linkSet+'">' +
									htmlEntities(sets[cartella].nome) +
									( (sets[cartella].locked) ? "<span>"+TXT("PrestoInArrivo")+"</span>" : "" ) +
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
							 	htmlEntities(TXT("SetAcquistato")) +
							 '</span></span>';
			}
			var ChiediInfo = htmlEntities(TXT("ComeAttivare"));
			if(sets[cartella].locked && sets[cartella].dataPubblicazione){
				var aaaa = sets[cartella].dataPubblicazione.split("-")[0]*1;
				var mm = sets[cartella].dataPubblicazione.split("-")[1]*1;
				HTML_cont += '<span class="pubblSet">' +
							 '	<i>'+htmlEntities(TXT("DataPubblicazione"))+'</i><br>' +
							 	DB.TXT.base.nomiMesi[globals.siglaLingua][mm-1]+" "+aaaa +
							 '</span>';
				ChiediInfo = htmlEntities(TXT("ChiediInfo"));
			}
			HTML_cont += '<span class="btnSet">';
			if(	!sets[cartella].locked && globals.set.cartella != cartella &&
				sets[cartella].opening ){
				HTML_cont += '<span class="btn_invia"' +
							 '		onClick="caricaSet(\''+cartella+'\',this);">';
				if(DB.login.data.auths.indexOf(cartella)==-1 || !LOGIN.logedin())HTML_cont += htmlEntities(TXT("ApriDemo").toUpperCase());
				else HTML_cont += htmlEntities(TXT("ApriSet").toUpperCase());
				HTML_cont += '</span>';
			}else if(globals.set.cartella == cartella)HTML_cont += '<span class="setOpened">' + htmlEntities(TXT("SetAperto").toUpperCase()) + '</span>';
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
					 			htmlEntities(stripslashes(TXT("SpiegazioneSetsTit"))) +
					 '		</h2>' +
					 '		<p>' +
					 			htmlEntities(stripslashes(TXT("SpiegazioneSetsTxt"))) +
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
					 '					   id="@|'+htmlEntities(TXT("Nominativo"))+'|1|0"' +
					 '					   placeholder="'+htmlEntities(TXT("Nominativo"))+'">' +
					 '				<input type="email"' +
					 '					   name="Email"' +
					 '					   id="@|'+htmlEntities(TXT("Email"))+'|1|0|@"' +
					 '					   placeholder="'+htmlEntities(TXT("Email"))+'">' +
					 '				<div class="btns">' +
					 '					<div class="btn_invia"' +
					 '						 onClick="CATALOGO.inviaRichiesta();">' +
					 						htmlEntities(TXT("InviaRichiesta")) +
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
	}
}
