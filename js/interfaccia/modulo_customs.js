
var CUSTOMS = {
	
	/*
	ISTRUZIONI per creare contenuti custom:
	- creare un file .js in 030_iaomai/__customContents (es. 6.js) dove il numero (6) è l'idPartner per il quale si vuole fornire il contenuto custom.
	*/

	_conts: {},
	_init: function(){},
	_end: function(){},
	addContent: function( codice, HTML ){
		if(!CUSTOMS._conts[globals.set.cartella])return HTML;
		if(!CUSTOMS._conts[globals.set.cartella][codice])return HTML;
		let el = CUSTOMS._conts[globals.set.cartella][codice];
		let txt = '';
		if(el){
			if(el.conts[globals.siglaLingua])txt = el.conts[globals.siglaLingua];
			else if(el.conts["eng"])txt = el.conts["eng"];
			else if(el.conts["ita"])txt = el.conts["ita"];
		}
		switch(el.position){
			case 'before':
				HTML = txt + HTML;
				break;
			case 'after':
				HTML += txt;
				break;
			case 'sostitution':
				HTML = txt;
				break;
		}
		return HTML;
	}
}