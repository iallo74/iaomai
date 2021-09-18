var CONN = {
	VERSIONE: 1,
	APIfolder: 'https://www.corpomentespirito.it/__stream/app/030_iaomai/__API/V1/',
	linkPrivacy: 'https://www.iaomai.app/privacy',
	caricaUrl: function(url, qs, funzione){ // carica un URL
		if(typeof(qs)=='undefined')var qs='';
		if(CONN.getConn()){
			var x;
			if(typeof XMLHttpRequest!="undefined"){
				x=new XMLHttpRequest();
			}else{
				try{
					x=new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch(e){
					try{
						x=new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch(e){
						x=null;
					}
				}
			}
			if(x){
				x.onreadystatechange=function(){
					if(x.readyState===4){
						if(x.response){
							//if(x.response.substr(0,1)=='<')ALERT(Lingua(TXT_ErroreCaricamento));
							
							eval(funzione)(x.response);
						}
					}
				}
				var tm = Number(new Date());
				if(qs)qs+='&';
				qs+="tm="+tm;
				x.open("POST", CONN.APIfolder+url, true);
				//console.log(CONN.APIfolder+url);
				x.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=uft-8;");
				//x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; ');
				if(qs.indexOf("TK=D6G-w34rgV")==-1)x.setRequestHeader("Authorization", LOGIN.getLS('TOKEN'));
				x.onerror = function () {
					console.log("Non più connesso");
					eval(funzione)();
				};
				x.send(qs);
			}
			return false;
		}
	},
	getConn: function(){ // verifica la connessione a internet
		return navigator.onLine;
	},
	retNoConn: function(){ // avvisa della connessione assente
		if(!CONN.getConn()){
			ALERT(Lingua(TXT_ConnessioneAssente));
			return false;
		}else return true;
	}
};
