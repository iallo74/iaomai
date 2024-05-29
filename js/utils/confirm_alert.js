var CONFIRM = {
	conferma: null,
    interval: null,
	bypass: false,
	style: '',
	txtBtnConf: '',
	args: '',
	type: '',
    vis: function ( domanda, bypass=false, args=false, style=false, txtBtnConf=TXT("si") ) {
		// azzero prima di avviare
		clearInterval(CONFIRM.interval);
		CONFIRM.conferma = null;
		CONFIRM.bypass = false;

      	this.bypass = bypass;
		this.args = args;
		if(!this.bypass){
			CONFIRM.type = 'confirm';
			document.getElementById("CNF_titolo").innerHTML = stripslashes(domanda).replace(/\n/g,"<br>");
			document.getElementById("CNF").classList.add("visCNF");
			if(style){
				document.getElementById("CNF").classList.add(style);
				CONFIRM.style = style;
			}
			document.getElementById("CNF_si").innerHTML =  stripslashes(txtBtnConf);
			setTimeout(function(){
				document.getElementById("CNF_dialog").classList.add("visCNF_dialog");
				document.getElementById("CNF").classList.add("opCNF");
			},50);
			document.getElementById("CNF").classList.remove("alert");
			window.addEventListener("keyup", CONFIRM.keyAlert, false );
		}
		return new Promise(function(resolve, reject){
			CONFIRM.interval = setInterval(function() {
				if(!CONFIRM.bypass){
					if (CONFIRM.conferma === true) {
						resolve(true);
						CONFIRM.nascondi();
					}else if(CONFIRM.conferma === false) {
						resolve(false);
						CONFIRM.nascondi();
					}
				}else{
					resolve(true);
					CONFIRM.nascondi(true);
				}
			});            
		});
    },
    resolve: function () {
        this.conferma = true;
    },
    reject: function () {
        this.conferma = false;
    },
	nascondi: function( bypass=false ){
		clearInterval(CONFIRM.interval);
		CONFIRM.conferma = null;
		CONFIRM.bypass = false;
		if(bypass)return;
		document.getElementById("CNF_dialog").classList.remove("visCNF_dialog");
		document.getElementById("CNF").classList.remove("opCNF");
		if(CONFIRM.style){
			document.getElementById("CNF").classList.remove(CONFIRM.style);
			CONFIRM.style = '';
		}
		setTimeout(function(){
			if(!CONFIRM.type){
				document.getElementById("CNF").classList.remove("visCNF");
				document.getElementById("CNF").classList.remove("CNF_login");
				document.getElementById("CNF").classList.remove("CNF_purchase");
				document.getElementById("CNF").classList.remove("CNF_licenses");
				document.getElementById("CNF_titolo").innerHTML = '';
			}
		}, 500, bypass);
		window.removeEventListener("keyup", CONFIRM.keyAlert, false );
		CONFIRM.type = '';
    },
	keyAlert: function( event ){
		if(event.keyCode==13){
			if(CONFIRM.type == 'confirm')CONFIRM.resolve();
			if(CONFIRM.type == 'alert')CONFIRM.nascondi();
		}
		if(event.keyCode==27){
			CONFIRM.nascondi();
		}
	}
}
function ALERT( msg, login=false, purchase=false, licenses=false ){
	CONFIRM.type = 'alert';
	document.getElementById("CNF_titolo").innerHTML = stripslashes(msg.replace(/\n/g,"<br>"));
	document.getElementById("CNF").classList.add("visCNF");
	if(login)document.getElementById("CNF").classList.add("CNF_login");
	if(purchase)document.getElementById("CNF").classList.add("CNF_purchase");
	if(licenses)document.getElementById("CNF").classList.add("CNF_licenses");
	document.getElementById("CNF_lg").classList.toggle("nasLG",LOGIN.logedin());
	setTimeout(function(){
		document.getElementById("CNF_dialog").classList.add("visCNF_dialog");
		document.getElementById("CNF").classList.add("opCNF");
	},50);
	document.getElementById("CNF").classList.add("alert");
	setTimeout(function(){window.addEventListener("keyup", CONFIRM.keyAlert, false );},500);
}

// Funzioni per il controllo del passaggio degli argomenti
function getParamNames(funct) {
	let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
		ARGUMENT_NAMES = /([^\s,]+)/g,
		fnStr = funct.toString().replace(STRIP_COMMENTS, ''),
		result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
	if(result === null)result = [];
	return result;
	v = g ? a : b;
}
function getArguments( v, i ){
	txt = v[i] + " = CONFIRM.args["+i+"]";
	return txt;
}
function getNameFunct(me){
    me = me.callee.toString();
    me = me.substr('function '.length);      
    me = me.substr(0, me.indexOf('('));
    return me;
}