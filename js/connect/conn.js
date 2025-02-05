var CONN = {
	VERSIONE: 1,
	APIfolder: 'https://www.iaomai.it/___API/app/V1.8/',
	APIfilesFolder: 'https://files.iaomai.app/___API/V4/',
	FILESfolder: 'https://files.iaomai.app/__files_utenti/files/',
	urlStore: 'https://www.iaomai.app/[lang]/iaomai/',
	urlAItokens: 'https://www.iaomai.app/[lang]/iaomai/tokens',
	linkPrivacy: 'https://www.iaomai.app/[lang]/info/privacy.php',
	linkCondizioni: 'https://www.iaomai.app/[lang]/iaomai/service_conditions',
	linkReqPwd: 'https://www.iaomai.app/[lang]/account/password',
	linkAppStore: 'https://apps.apple.com/it/app/i%C3%A1omai/id1588705898',
	linkPlayStore: 'https://play.google.com/store/apps/details?id=app.iaomai.app',
	online: true,
	
	chunkSize: 1024 * 1024, // 1MB
	totalChunks: 0,
	totalBytesLoaded: 0,

	caricaUrl: function( url, qs = '', funzione, apiFolder = CONN.APIfolder ){ // carica un API url e richiama la funzione
		if(CONN.getConn()){
			let x;
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
							CONN.online = true;
							eval(funzione)(x.response);
						}
					}
				}
				let tm = Number(new Date());
				if(qs)qs+='&';
				qs+="tm="+tm;
				if(typeof(DB)!='undefined')qs+="&ui="+encodeURIComponent(window.btoa(__(localStorage.UniqueId)));
				x.open("POST", apiFolder+url, true);
				x.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=uft-8;");
				if(qs.indexOf("TK=D6G-w34rgV")==-1)x.setRequestHeader("Authorization", LOGIN.getLS('TOKEN'));
				
				x.onerror = function () {
					console.log("Errore da chiamata API");
					CONN.online = false;
					eval(funzione)();
				};
				x.send(qs);
			}
			return false;
		}
	},

	getRealConn: async function(){
		if(!navigator.onLine)return false; // Se già risulta offline, evitiamo la richiesta
		try{
            const response = await fetch(CONN.APIfolder+"checker_di_connessione.php", {
                method: "POST"
            });
            return response.ok || response.status === 200;
        }catch(error){
            return false; // Se fallisce la richiesta, non c'è connessione reale
        }
	},


	getConn: function(){ // verifica la connessione a internet
		return navigator.onLine;
	},
	retNoConn: function(){ // avvisa della connessione assente
		if(!CONN.getConn()){
			ALERT(TXT("ConnessioneAssente"));
			return false;
		}else return true;
	},
	openUrl: function( url ){ // apre un URL nel browser i sistema
		if(isCordova)window.open(url,'_system');
		else window.open(url,'_blank');
	},



	uploadChunk: function( url, chunkNumber, file, tmp_name, final_funct ) {
		const start = chunkNumber * CONN.chunkSize;
		const end = start + CONN.chunkSize >= file.size ? file.size : start + CONN.chunkSize;
		const chunk = file.slice(start, end);
		const formData = new FormData();
		formData.append('chunk', chunk, `${tmp_name+"."+file.name.split(".")[1]}.part${chunkNumber}.tot${(CONN.totalChunks-1)}`);
		return fetch(url+"?UniqueId="+localStorage.UniqueId+"&idUtente="+DB.login.data.idUtente+"&filename="+encodeURIComponent(btoa(file.name)),{
				method: 'POST',
				headers: {
					'Authorization': LOGIN.getLS('TOKEN')
				},
				body: formData
			})
		.then(response => {
			if(!response.ok){
				throw new Error('Errore durante il caricamento del chunk');
			}
			return response.json();
		})
		.then(data => {
			if(data.success){
				CONN.totalBytesLoaded += CONN.chunkSize;
				let perc = parseInt((chunkNumber*100)/(CONN.totalChunks-1));
				if(CONN.totalChunks==1)perc=100;
				document.getElementById("perc_chunk").innerHTML = perc;
				if (chunkNumber === CONN.totalChunks - 1) {
					eval(final_funct)(data);
				}else{
					return CONN.uploadChunk(url,chunkNumber + 1,file,tmp_name,final_funct);
				}
			}else{
				PH.msgQuotaVideoExeded(JSON.stringify(data));
			}
		})
		.catch(error => {
			console.error('Errore durante il caricamento del chunk:', error);
		});
	},
	corsCMS: function (msg){
		setTimeout(function(){
			document.getElementById("frVideo").contentWindow.postMessage(msg, "https://www.iaomai.it");
		},100);
	}

};
