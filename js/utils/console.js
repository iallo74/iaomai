var CONSOLE = {
	jss: [],
	imports: [],
	div: null,
	creata: false,
	crea: function(){
 		this.div = document.createElement('div');
 		this.div.id = "console";
		this.div.innerHTML='<div id="console_tit"><div onClick="CONSOLE.apriConsole();">&lt;/&gt; Console:</div><span id="console_close" onClick="CONSOLE.chiudiConsole();">CHIUDI</span><span id="console_refresh" onClick="CONSOLE.refreshScripts();">refresh</span></div><div id="console_log"></div><div id="console_command"><input type="text" name="command" id="command"></div>';
		document.body.appendChild(this.div);
		/*window.onerror = function (msg, url, lineNo, columnNo, error) {
		  log(msg+" "+error);
		  return false;
		}*/
		document.getElementById("command").addEventListener("keydown", function(event) {
			if (event.key === "Enter") {
				CONSOLE.verConsoleInvio();
				event.preventDefault();
			}
		});
		this.creata=true;
		//this.apriConsole();
	},
	_log: function( msg, fromCMD=false ){
		if(this.creata){
			let logHTML='';
			logHTML+='<b';
			if(!fromCMD)logHTML+=' style="opacity:0;"';
			logHTML+='>&gt;</b> ';
			logHTML+=msg+'<br>';
			document.getElementById("console_log").innerHTML+=logHTML;
		}
	},
	apriConsole: function(){
		document.getElementById("console").classList.add("consoleOpened");
		if(!touchable)document.getElementById("command").focus();
	},
	chiudiConsole: function(){
		document.getElementById("console").classList.remove("consoleOpened");
	},
	refreshScripts: function(){
		visLoader("Refresh scripts...");
		this.chiudiConsole();
		this.jss = [];
		let pattern='',
			pH = location.href.split("/");
		for(e=0;e<pH.length-1;e++){
			pattern+=pH[e]+"/";
		}
		let els = document.getElementById("scriptsBase").getElementsByTagName("script");
		for(e=0;e<els.length;e++){
			this.imports.push(els[e].src.replace(pattern,''));
		}
		els = document.head.getElementsByTagName("script");
		for(e=0;e<els.length;e++){
			this.imports.push(els[e].src.replace(pattern,''));
		}
		els = document.head.getElementsByTagName("link");
		for(e=0;e<els.length;e++){
			this.imports.push(els[e].href.replace(pattern,''));
		}
		if(this.imports.length)this.importScriptsRefreshed(0);
		else ALERT("Nessun file da aggiornare!");
	},
	importScriptsRefreshed: function(n){
		let tI = this.imports.length;
		if(this.imports[n].indexOf("console.js")>-1)n++;
		if(this.imports[n].substr(this.imports[n].length-2,2)=='js'){
			this.jss[n] 	= document.createElement('script');
			this.jss[n].type 	= 'text/javascript';
			this.jss[n].async 	= true;
			this.jss[n].src 	= this.imports[n]+'?t='+Date.now();
		}
		if(this.imports[n].substr(this.imports[n].length-3,3)=='css'){
			this.jss[n] 	= document.createElement('link');
			this.jss[n].type 	= 'text/css';
			this.jss[n].rel= 'stylesheet';
			this.jss[n].async 	= true;
			this.jss[n].href 	= this.imports[n]+'?t='+Date.now();
		}
		this.jss[n].onload 	= function(){
			n++;
			if(n==tI){
				top.location.reload();
			}else{
				CONSOLE.importScriptsRefreshed(n);
			}
		}
		document.getElementById("scripts").appendChild(this.jss[n]);
	},
	verConsoleInvio: function(e){
		let js = document.getElementById("command").value;
		if(js.trim().length==0)return;
		document.getElementById("command").value='';
		this._log(js,true);
		eval(js);
	}
}