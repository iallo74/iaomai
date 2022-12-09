
var FEEDBACK = {
	//
	inviaFeedback: function(){ // invia il feedback
		if(CONN.retNoConn()){
		
			if(verifica_form(document.feedbackForm)){
				applicaLoading(document.getElementById("feedback"));
				var JSNPOST={	"Oggetto": document.feedbackForm.Oggetto.value,
								"Messaggio": document.feedbackForm.Messaggio.value,
								"Nominativo": document.feedbackForm.Nominativo.value,
								"Email": document.feedbackForm.Email.value };
								
				CONN.caricaUrl(	"feedback.php",
								"b64=1&JSNPOST="+window.btoa(encodeURIComponent(JSON.stringify(JSNPOST))),
								function(txt){
									// conferma l'invio di un feedback
									rimuoviLoading(document.getElementById("feedback"))
									var err=false;
									if(txt.substr(0,3)!='404'){
										var ris=JSON.parse(txt);
										if(ris.Conferma=='1'){
											ALERT(TXT("FeedbackInviato"));
											document.feedbackForm.Nominativo.value = "";
											document.feedbackForm.Email.value = "";
											document.feedbackForm.Oggetto.value = "";
											document.feedbackForm.Messaggio.value = "";
											MENU.chiudiMenu();
										}else err=true;
									}else err=true;
									if(err)ALERT(TXT("FeedbackErrore"));
								} );
				
			}
		}
	}

	
}