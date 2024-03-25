var COMMUNITY = {
	
	verifica: function(){
		if(LOGIN.getLS("Pseudonimo")=='' || LOGIN.getLS("CondizioniCommunity")!='1'){
			document.formCommunity.PseudonimoN.value = LOGIN.getLS("UsernameU");
			MENU.visCommunity();
			return false;
		}else return true;
	},
	attiva: function(){ // attiva le preferenze della community
		//retNoFree();
		CONN.retNoConn();
		regMod=PSD='';
		if(document.formCommunity.okRegComm){
			regMod=(document.formCommunity.okRegComm.checked)?1:0;
			PSD=document.formCommunity.PseudonimoN.value;
		}
		let JSNPOST={	"PseudonimoN": PSD,
						"okRegComm": regMod*1 };
		
		CONN.caricaUrl(	"community_att.php",
						"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
						'MENU.chiudiMenu();COMMUNITY.conferma');
		return false;
	},
	conferma: function( txt ){
		console.log(txt)
		elenco=JSON.parse(txt);
		if(elenco.err=='1'){
			ALERT(TXT("ErrorePseudonimo"));
		}else{
			if(elenco.okRegComm=='1')LOGIN.setLS("CondizioniCommunity","1");
			if(elenco.PseudonimoN!='')LOGIN.setLS("Pseudonimo",elenco.PseudonimoN);
		}
		return false;
	}
	
}