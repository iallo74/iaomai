var lastSync = 0;
var BACKUPS = {
	//
	cont: null,
	titleProvv: '',
	fileProvv: '',
	bkpProvv: null,
	maxBackups: 5,
	totBackups: 0,
	car_backups: function(){
		document.getElementById("contBackups").classList.remove("noConn");
		document.getElementById("contBackups").classList.remove("dbBig");
		document.getElementById("toolsBackups").style.display = 'block';
		document.getElementById("titBackups").style.display = 'none';
		applicaLoading(document.getElementById("contBackups"));
		if(CONN.getConn()){
			CONN.caricaUrl(	"sincro_backups_elenco.php",
							"",
							"BACKUPS.caricaBackups");
		}else{
			BACKUPS.caricaBackups('[]');
		}
	},
	caricaBackups: function( bkps ){
		BACKUPS.bkpProvv = null;
		var HTML = '';
		if(CONN.getConn()){
			if(!bkps)bkps = [];
			else bkps = JSON.parse(bkps);
			BACKUPS.totBackups = bkps.length;
			if(BACKUPS.totBackups){
				for(let n in bkps){
					var title = bkps[n].title;
					var file = bkps[n].name.split(".")[0];
					var d = file.split("-")[1]*1;
					
					HTML += '<div class="elsBackups"' +
							'	  onClick="BACKUPS.downloadBackup(\''+file+'\');">';
					HTML += getFullDataTS(d)+" - "+getOraTS(d);
					if(title)HTML += " ("+htmlEntities(title)+")";
					HTML += '</div>';
				}
			}else HTML += '<div class="noResults">'+htmlEntities(TXT("BackupsNessuno"))+'</div>';
		}else{
			document.getElementById("contBackups").classList.add("noConn");
		}
		document.getElementById("contBackups").innerHTML = HTML;
	},
	downloadBackup: function( file ){
		BACKUPS.fileProvv = file;
		applicaLoading(document.getElementById("contBackups"));
		CONN.caricaUrl(	"sincro_backups_download.php",
						"f="+encodeURIComponent(file),
						"BACKUPS.vis_backup");
	},
	vis_backup: function( bkp ){
		document.getElementById("contBackups").classList.remove("noConn");
		document.getElementById("contBackups").classList.add("dbBig");
		document.getElementById("toolsBackups").style.display = 'none';
		document.getElementById("titBackups").style.display = 'block';
		//console.log(bkp)
		
		BACKUPS.bkpProvv = JSON.parse(bkp);
		BACKUPS.bkpProvv.JSNPOST = JSON.parse(decodeURIComponent(window.atob( BACKUPS.bkpProvv.JSNPOST )));
		
		
		var d = BACKUPS.fileProvv.split(".")[0].split("-")[1]*1;
		
		var HTML = '';
		HTML += '<h1>'+BACKUPS.bkpProvv.title+'</h1>' +
				'<p>'+getFullDataTS(d)+" - "+getOraTS(d)+'</p>' +
				'<div>' +
				'	<div class="btn_annulla" onClick="BACKUPS.el_backup();">' +
				'		<img src="img/ico_cestino.png" style="vertical-align:middle;"> ' +
						htmlEntities(TXT("EliminaBackup")) +
				'	</div>' +
				'	<div class="btn_invia" onClick="BACKUPS.ripristinaBackup_pre();">' +
						htmlEntities(TXT("RipristinaBackup")) +
				'	</div>' +
				'</div>';
		
		rimuoviLoading(document.getElementById("contBackups"));
		document.getElementById("contBackups").innerHTML = HTML;
	},
	conf_backup: function( txt ){
		if(txt.substr(0,3) == '404'){
			ALERT(TXT("BackupErrore"));
			return false;
		}else{
			//console.log(txt)
			ALERT(TXT("BackupCreato"));
			BACKUPS.car_backups();
		}
	},
	
	creaBackup: function(){
		if(BACKUPS.totBackups >= BACKUPS.maxBackups){
			ALERT(TXT("maxBackups").replace("[n]",BACKUPS.maxBackups));
			return;
		}
		if(CONN.retNoConn()){
			document.getElementById("contBackups").classList.remove("noConn");
			document.getElementById("contBackups").classList.add("dbBig");
			document.getElementById("toolsBackups").style.display = 'none';
			document.getElementById("titBackups").style.display = 'block';
			
			var HTML = '';
			HTML += '<h1>'+htmlEntities(TXT("CreaBackup"))+'</h1>' +
					'<div>' +
					'	<div>' +
					'		<input type="text"' +
					'			   name="nomeBackup"' +
					'			   id="nomeBackup"' +
					'			   placeholder="'+htmlEntities(TXT("NomeBackup"))+'">' +
					'	</div>' +
					'	<div class="btn_invia" onClick="BACKUPS.inviaBackup();">' +
							htmlEntities(TXT("CreaBackup")) +
					'	</div>' +
					'</div>';
			
			
			rimuoviLoading(document.getElementById("contBackups"));
			document.getElementById("contBackups").innerHTML = HTML;
			if(mouseDetect)document.getElementById("nomeBackup").focus();
		}
	},
	
	inviaBackup: function(){
		if(CONN.retNoConn()){
			BACKUPS.titleProvv = document.getElementById("nomeBackup").value.trim();
			if(BACKUPS.titleProvv=='')return;
			document.getElementById("contBackups").classList.add("dbBig");
			applicaLoading(document.getElementById("contBackups"));
			LOGIN.globalSync('remoto');
		}
	},
	
	el_backup: function(){
		CONFIRM.vis( TXT("ChiediEliminaBackup") ).then(function(pass){if(pass){
			applicaLoading(document.getElementById("contBackups"));
			if(CONN.retNoConn()){
				CONN.caricaUrl(	"sincro_backups_elimina.php",
								"f="+BACKUPS.fileProvv,
								"BACKUPS.car_backups");
			}
		}});
	},
	
	ripristinaBackup_pre: function(){
		CONFIRM.vis(	TXT("ChiediRipristinaBackup") ).then(function(pass){if(pass){
			setTimeout( function(){
				CONFIRM.vis(	TXT("SicuroRipristinaBackup") ).then(function(pass){if(pass){
					// prima di ripristinare il backup sincronizzo con il server per verificare l'ultimo lastSync e salvare la versione attuale
					applicaLoading(document.getElementById("contBackups"));
					LOGIN.sincronizza(	'BACKUPS.ripristinaBackup()' );
					
				}});
			},500 );
		}});
	},
	ripristinaBackup: function(){
		DB.pazienti.lastSync = 0;
		DB.note.lastSync = 0;
		DB.procedure.lastSync = 0;
		//DB.ricerche.lastSync = 0;
		BACKUPS.bkpProvv.JSNPOST.lastSync = lastSync;
		var txt = JSON.stringify(BACKUPS.bkpProvv.JSNPOST);
		LOGIN.retGlobalSyncro(txt);
	},
	ripristinoTerminato: function(){
		localPouchDB.getItem(MD5("DB"+LOGIN._frv()+".note")).then(function(dbCont){ // leggo il DB
			DB.note = IMPORTER.DECOMPR(dbCont);
			try{
				SET.leggiNote();
			}catch(err){}
			MENU.chiudiMenu();
			ALERT(TXT("BackupRipristinato"));
		});
	}
	
}