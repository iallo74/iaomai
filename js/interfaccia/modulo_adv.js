
var ADV = {
	
	name: '',
	vis: function( json, name ){
		if(__(localStorage["noADV"+name])=='true')return;
		visLoader();
		document.getElementById("adv").style.display = 'block';
		let msg = JSON.parse(atob(json));
		document.getElementById("txtAdv").innerHTML = msg[globals.siglaLingua];
		ADV.name = name;
	},
	nas: function(){
		nasLoader();
		document.getElementById("adv").style.display = 'none';
		document.getElementById("txtAdv").innerHTML = '';
		if(document.getElementById("noADV").checked)localStorage["noADV"+ADV.name] = true;
	},

}