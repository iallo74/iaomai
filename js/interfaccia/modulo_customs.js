
var CUSTOMS = {
	
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