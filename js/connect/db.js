
var DB = {
	
	// i DB
	set: [],
	login: [],
	pazienti: [],
	ricerche: [],
	lingueProcedure: {
		"1": "ITA",
		"2": "ENG",
		"3": "ESP",
		"4": "DEU",
		"5": "FRA",
		"6": "POR" },
	coloriTags: [
		"FFFFFF",
		"fbd7d7",
		"e4fbd7",
		"fbf5d7",
		"d7f5fb",
		"d7dafb"
	],
	TXT: {},
	INT: {
		valute: {},
		paesi: {},
		misure: {
			"cm": {
				"i": "cm",
				"a": "inch"
			},
			"kg": {
				"i": "kg",
				"a": "lbs"
			}
			
		}
	},
	__sizeDb: 0,
	__nDb: 0,
	dbs: [
		"DB.pazienti",
		"DB.fornitori",
		"DB.servizi",
		"DB.procedure",
		"DB.note",
		"DB.ricerche",
		"DB.login",
		"DB.files",
		"DB.appuntamenti",
		"DB.annotazioni",
		"FILES" ],
	
	// i metodi
	_pulisciFRV: function( jsn ){
		for(let i in jsn){
			if(jsn[i].frv)delete jsn[i].frv;
			for(let  l in jsn[i]){
				if(typeof(jsn[i][l])=='object'){
					for(let u in jsn[i][l]){
						if(jsn[i][l][u].frv)jsn[i][l][u].frv=false;
					}
				}
			}
		}
		return jsn;
	},
	_reset: function(){
		var pazientiBase = filesBase = serviziBase = fornitoriBase = [];
		if(typeof(localStorage.dbInizializzato) == 'undefined'){
			pazientiBase = archiviDemo[globals.siglaLingua].pazienti;
			serviziBase = archiviDemo[globals.siglaLingua].servizi;
			fornitoriBase = archiviDemo[globals.siglaLingua].fornitori;
			filesBase = archiviDemo.files;
		}
		PAZIENTI.idCL = -1
		DB.set = [];
		DB.pazienti = {
			lastSync: 0,
			data: pazientiBase
		};
		DB.fornitori = {
			lastSync: 0,
			data: fornitoriBase
		};
		DB.servizi = {
			lastSync: 0,
			data: serviziBase
		};
		DB.files = {
			lastSync: 0,
			data: filesBase
		};
		/*if(filesBase.length){
			for(let f in DB.files.data){
				DB.files.data[f].imgBig = DB.files.data[f].imgMini;
			}
		}*/
		DB.ricerche = {
			lastSync: 0,
			data: []
		};
		DB.notifiche = {
			lastSync: 0,
			data: []
		};
		DB.note = {
			lastSync: 0,
			data: []
		};
		DB.procedure = {
			lastSync: 0,
			data: []
		};
		DB.appuntamenti = {
			lastSync: 0,
			data: []
		};
		DB.annotazioni = {
			lastSync: 0,
			data: []
		};
		
		if(typeof(localStorage.dbInizializzato) == 'undefined'){
			Promise.all([
				localPouchDB.setItem(MD5("DBfrv.pazienti"), IMPORTER.COMPR(DB.pazienti)),
				localPouchDB.setItem(MD5("DBfrv.files"), IMPORTER.COMPR(DB.files)),
				localPouchDB.setItem(MD5("DBfrv.fornitori"), IMPORTER.COMPR(DB.fornitori)),
				localPouchDB.setItem(MD5("DBfrv.servizi"), IMPORTER.COMPR(DB.servizi))
			]).then(function(){
				PAZIENTI.caricaPazienti();
				FORNITORI.caricaFornitori();
				SERVIZI.caricaServizi();
			});
		}else{
			PAZIENTI.caricaPazienti();
			FORNITORI.caricaFornitori();
			SERVIZI.caricaServizi();
		}
		localStorage.dbInizializzato = '1';
	},
	_verDbSize: function(){
		DB.__nDb = 0;
		DB.__sizeDb = 0;
		for(let d=0;d<DB.dbs.length;d++){
			localPouchDB.getItem(MD5(DB.dbs[d])).then(function(dbCont){
				if(typeof(dbCont) != 'undefined')DB.__sizeDb += DB._getStringMemorySize(dbCont);
				DB.__nDb++;
				if(DB.__nDb == DB.dbs.length){
					DB._resDbSize();
				}
			});
		}
	},
	_resDbSize: function(){
		// controllo l'occupazione dello spazio del DB al di sopra dei 45MB
		console.log("Totale spazio DB: "+DB.__sizeDb);
		if(DB.__sizeDb>45*1000*1000){
		   // invio un alert a noi
		}
	},
	_getStringMemorySize: function( _string ) {
        "use strict";
        var codePoint, accum = 0;
        for(var stringIndex=0, endOfString=_string.length; stringIndex<endOfString; stringIndex++) {
            codePoint = _string.charCodeAt( stringIndex );
            if( codePoint < 0x100 ) {
                accum += 1;
                continue;
            }
            if( codePoint < 0x10000 ) {
                accum += 2;
                continue;
            }
            if( codePoint < 0x1000000 ) {
                accum += 3;
            } else {
                accum += 4;
            }
        }
        return accum * 2;
    }
};
