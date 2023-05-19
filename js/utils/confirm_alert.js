var CONFIRM = {
	conferma: null,
    interval: null,
	bypass: false,
	args: '',
	type: '',
    vis: function ( domanda, bypass, args ) {
		// azzero prima di avviare
		clearInterval(CONFIRM.interval);
		CONFIRM.conferma = null;
		CONFIRM.bypass = false;
		
		if(typeof(bypass) == 'undefined')var bypass = false;
		if(typeof(args) == 'undefined')var args = false;
      	this.bypass = bypass;
		this.args = args;
		if(!this.bypass){
			CONFIRM.type = 'confirm';
			document.getElementById("CNF_titolo").innerHTML = stripslashes(domanda).replace(/\n/g,"<br>");
			document.getElementById("CNF").classList.add("visCNF");
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
	nascondi: function( bypass ){
		if(typeof(bypass) == 'undefined')var bypass = false;
		clearInterval(CONFIRM.interval);
		CONFIRM.conferma = null;
		CONFIRM.bypass = false;
		if(bypass)return;
		document.getElementById("CNF_dialog").classList.remove("visCNF_dialog");
		document.getElementById("CNF").classList.remove("opCNF");
		setTimeout(function(){
			if(!CONFIRM.type){
				document.getElementById("CNF").classList.remove("visCNF");
				document.getElementById("CNF").classList.remove("CNF_login");
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
function ALERT( msg, login, purchase ){
	if(typeof(login) == 'undefined')var login = false;
	if(typeof(purchase) == 'undefined')var purchase = false;
	CONFIRM.type = 'alert';
	document.getElementById("CNF_titolo").innerHTML = stripslashes(msg.replace(/\n/g,"<br>"));
	document.getElementById("CNF").classList.add("visCNF");
	if(login)document.getElementById("CNF").classList.add("CNF_login");
	if(purchase)document.getElementById("CNF").classList.add("CNF_purchase");
	setTimeout(function(){
		document.getElementById("CNF_dialog").classList.add("visCNF_dialog");
		document.getElementById("CNF").classList.add("opCNF");
	},50);
	document.getElementById("CNF").classList.add("alert");
	setTimeout(function(){window.addEventListener("keyup", CONFIRM.keyAlert, false );},500);
}

// Funzioni per il controllo del passaggio degli argomenti
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(funct) {
	var fnStr = funct.toString().replace(STRIP_COMMENTS, '');
	var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
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