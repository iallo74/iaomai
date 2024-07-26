var LICENZE  = {
	
	demo: false,
	
	// VISUALIZZAZIONE LICENZE
	rowLicenza: function( label, valore, classe='' ){
		return	'<div class="rowLicenza '+classe+'">'	+
				'	<div>'+label+'</div>' +
				'	<div>'+valore+'</div>' +
				'</div>'+H.chr10;
	},
	appLicenza: function( app, img ){
		return	'<div class="rowLicenza appLicenza">'	+
				(img?('	<img src="'+img+'">'):'&nbsp;') +
				' '+app +
				'</div>'+H.chr10;
	},
	visLicenza: function( name, cond){
		let spunta = '<b style="color:#0b8dca;">'+H.spunta+'</b>',
			ics = '<b style="color:#C00;">'+H.ics+'</b>';
		if(!cond && name!='ShiatsuMap Light')LICENZE.demo = true;
		return (cond?spunta:ics)+'<span'+(cond?'':' style="color:#888;"')+'> '+name+'</span><br>';
	},
	red: function( html ){
		return '<span style="color:#a4542a;">'+html+'</span>';
	},

	visLicenses: function(){
		let HTML = '',
			ok = false,
			spunta = '<b style="color:#0b8dca;">'+H.spunta+'</b>',
			ics = '<b style="color:#C00;">'+H.ics+'</b>';


		let okCIN = LOGIN.logedin() && LOGIN.verAuth("meridiani_shiatsu") && LOGIN.verModule("CIN");
		let okMAS = LOGIN.logedin() && LOGIN.verAuth("meridiani_shiatsu") && LOGIN.verModule("MAS");
		let okNMK = LOGIN.logedin() && LOGIN.verAuth("meridiani_shiatsu") && LOGIN.verModule("NMK");
		let okLGT = LOGIN.logedin() && LOGIN.verAuth("meridiani_shiatsu") && LOGIN.verModule("light");
		
		HTML += '<div class="listLicenze">';
		if(LOGIN.logedin()){
			HTML += 
			TXT("Lic_PossessoLicenze")+':<div>' +
			LICENZE.visLicenza('AcupointsMap',(LOGIN.logedin() && LOGIN.verAuth("meridiani_cinesi"))) +
			LICENZE.visLicenza('ShiatsuMap PRO '+TXT("Lic_Cinesi"),(LOGIN.logedin() && okCIN)) +
			LICENZE.visLicenza('ShiatsuMap PRO Masunaga',(LOGIN.logedin() && okMAS)) +
			LICENZE.visLicenza('ShiatsuMap PRO Namikoshi',(LOGIN.logedin() && okNMK)) +
			LICENZE.visLicenza('ShiatsuMap Light',(LOGIN.logedin() && okLGT)) +
			LICENZE.visLicenza('AuriculoMap',(LOGIN.logedin() && LOGIN.verAuth("auricologia"))) +
			LICENZE.visLicenza('ReflexologyMap',(LOGIN.logedin() && LOGIN.verAuth("reflessologia_plantare"))) +
			LICENZE.visLicenza('TriggerpointsMap',(LOGIN.logedin() && LOGIN.verAuth("trigger_points"))) +
			LICENZE.visLicenza(TXT("Lic_SchedarioPazienti"),(LOGIN.logedin() && LOGIN.verAuth("clients_full"))) +
			'</div>';
		}else{
			HTML += '<span id="demoVersion" style="display:block;">'+TXT("Lic_FreeVersion")+'</span>';
		}
		HTML += '</div>' +
				'<div class="txtFeatures">';
		if(LICENZE.demo)HTML +=
				'	<div id="buyLicense"><div onClick="MENU.visPurchases(true);">'+TXT("AcquistaLicenza")+'</div></div>';
		HTML += '	<div>'+TXT("Lic_ElencaCaratteristiche")+'</div>' +
				'</div>';
		
		

		// AcupointsMap
		ok = LOGIN.logedin() && LOGIN.verAuth("meridiani_cinesi");
		HTML +=	
		LICENZE.appLicenza( 'AcupointsMap', 'sets/meridiani_cinesi/img/logoMenu.png' ) +
		LICENZE.rowLicenza( TXT("Lic_PercorsiMeridiani3D"), 			ok?spunta			:this.red(TXT("Lic_rene")) ) +
		LICENZE.rowLicenza( TXT("Lic_SchedeAgopunti"), 					ok?spunta			:this.red('14 ('+TXT("Lic_rene")+')') ) +
		LICENZE.rowLicenza( TXT("Lic_Patologie"), 						ok?spunta			:this.red('19') ) +
		LICENZE.rowLicenza( TXT("Lic_Approfondimenti"), 				ok?spunta			:this.red(TXT("Lic_estratto")) ) +
		LICENZE.rowLicenza( TXT("Lic_AggiuntaAgopunti"), 				ok?spunta			:ics );

		// ShiatsuMap PRO Cinesi
		ok = LOGIN.logedin() && LOGIN.verAuth("meridiani_shiatsu") && (LOGIN.verModule("CIN") || LOGIN.verModule("light"));
		HTML +=	
		LICENZE.appLicenza( 'ShiatsuMap', 'sets/meridiani_shiatsu/img/logoMenu.png' ) +
		LICENZE.rowLicenza( TXT("Lic_SchedeTsubo"), 					ok?spunta			:this.red('14 ('+TXT("Lic_rene")+')') ) +
		LICENZE.rowLicenza( TXT("Lic_DettagliAnatomici"), 				okCIN?spunta		:ics ) +
		LICENZE.rowLicenza( TXT("Lic_PronunciaCinese"), 				okCIN?spunta		:ics );

		// ShiatsuMap PRO Masunaga
		ok = LOGIN.logedin() && LOGIN.verAuth("meridiani_shiatsu") && (LOGIN.verModule("MAS") || LOGIN.verModule("light"));
		HTML +=	
		LICENZE.rowLicenza( TXT("Lic_EstensioniMasunaga"), 				ok?spunta			:this.red(TXT("Lic_rene")) );

		// ShiatsuMap PRO Namikoshi
		ok = LOGIN.logedin() && LOGIN.verAuth("meridiani_shiatsu") && (LOGIN.verModule("NMK") || LOGIN.verModule("light"));
		let okALL = okCIN||okMAS||okNMK;
		HTML +=	
		LICENZE.rowLicenza( TXT("Lic_ZoneNamikoshi"),					ok?spunta			:this.red('7') ) +
		LICENZE.rowLicenza( TXT("Lic_DisegniPosizioni"), 				okNMK?spunta		:ics );

		HTML +=	
		LICENZE.rowLicenza( TXT("Lic_ProtocolliMTC"),					okCIN?spunta		:this.red('6') ) +
		LICENZE.rowLicenza( TXT("Lic_ProtocolliMasunaga"),				okMAS?spunta		:this.red('6') ) +
		LICENZE.rowLicenza( TXT("Lic_ProtocolliNamikoshi"),				okNMK?spunta		:this.red('3') ) +
		LICENZE.rowLicenza( TXT("Lic_Approfondimenti"), 				okALL?spunta		:this.red(TXT("Lic_estratto")) ) +
		LICENZE.rowLicenza( TXT("Lic_AggiuntaPuntiMTC"),				okCIN?spunta		:ics ) +
		LICENZE.rowLicenza( TXT("Lic_AggiuntaAreeNamikoshi"),			okNMK?spunta		:ics ) +
		LICENZE.rowLicenza( TXT("Lic_AggiuntaMeridiani"),				okMAS?spunta		:ics );
		
		// AuriculoMap
		ok = LOGIN.logedin() && LOGIN.verAuth("auricologia");
		HTML +=	
		LICENZE.appLicenza( 'AuriculoMap', 'sets/auricologia/img/logoMenu.png' ) +
		LICENZE.rowLicenza( TXT("Lic_PuntiAree"), 						ok?spunta			:this.red('19') ) +
		LICENZE.rowLicenza( TXT("Lic_SchedePunti"), 					ok?spunta			:this.red('19') ) +
		LICENZE.rowLicenza( TXT("Lic_Settori"), 						spunta ) +
		LICENZE.rowLicenza( TXT("Lic_FiltriAree"), 						spunta ) +
		LICENZE.rowLicenza( TXT("Lic_ProtocolliTerapeutici"), 			ok?spunta			:this.red('5') ) +
		LICENZE.rowLicenza( TXT("Lic_Approfondimenti"), 				ok?spunta			:this.red(TXT("Lic_estratto")) ) +
		LICENZE.rowLicenza( TXT("Lic_AggiuntaPunti"), 					ok?spunta			:ics );
		
		// ReflexologyMap
		ok = LOGIN.logedin() && LOGIN.verAuth("reflessologia_plantare");
		HTML +=	
		LICENZE.appLicenza( 'ReflexologyMap', 'sets/reflessologia_plantare/img/logoMenu.png' ) +
		LICENZE.rowLicenza( TXT("Lic_MappaAree"),						ok?spunta			:this.red(TXT("Lic_osteoarticolare")) ) +
		LICENZE.rowLicenza( TXT("Lic_SchedeAree"), 						ok?spunta			:this.red(TXT("Lic_osteoarticolare")) ) +
		LICENZE.rowLicenza( TXT("Lic_FiltriApparati"), 					spunta ) +
		LICENZE.rowLicenza( TXT("Lic_ProtocolliTrattamento"),			ok?spunta			:ics ) +
		LICENZE.rowLicenza( TXT("Lic_Approfondimenti"), 				ok?spunta			:this.red(TXT("Lic_estratto")) ) +
		LICENZE.rowLicenza( TXT("Lic_AggiuntaAree"), 					ok?spunta			:ics );
		
		// TriggerpointsMap
		ok = LOGIN.logedin() && LOGIN.verAuth("trigger_points");
		HTML +=	
		LICENZE.appLicenza( 'TriggerpointsMap', 'sets/trigger_point/img/logoMenu.png' )/*  +
		LICENZE.rowLicenza( TXT("Lic_PuntiAree"), 						ok?spunta			:this.red('19') ) +
		LICENZE.rowLicenza( TXT("Lic_SchedePunti"), 					ok?spunta			:this.red('19') ) +
		LICENZE.rowLicenza( TXT("Lic_Settori"), 						spunta ) +
		LICENZE.rowLicenza( TXT("Lic_FiltriAree"), 						spunta ) +
		LICENZE.rowLicenza( TXT("Lic_ProtocolliTerapeutici"), 			ok?spunta			:this.red('5') ) +
		LICENZE.rowLicenza( TXT("Lic_Approfondimenti"), 				ok?spunta			:this.red(TXT("Lic_estratto")) ) +
		LICENZE.rowLicenza( TXT("Lic_AggiuntaPunti"), 					ok?spunta			:ics ) */;
		
		// Shedario pazienti
		ok = LOGIN.logedin() && LOGIN.verAuth("clients_full");
		HTML +=	
		LICENZE.appLicenza( TXT("Lic_SchedarioPazienti"), 'sets/clients_full/img/logoMenu.png' )  +
		LICENZE.rowLicenza( TXT("Lic_NumeroPazienti"),					ok?spunta			:this.red(15) ) +
		LICENZE.rowLicenza( TXT("Lic_ProtezionePassword"),				ok?spunta			:ics ) +
		LICENZE.rowLicenza( TXT("Lic_Fornitori"),						ok?spunta			:this.red(5) ) +
		LICENZE.rowLicenza( TXT("Lic_PacchettiSedute"),					ok?spunta			:this.red(5) );


		// Caratteristiche generiche
		ok = LOGIN.logedin();
		okPAZ = LOGIN.logedin() && LOGIN.verAuth("clients_full");;
		HTML +=	
		LICENZE.appLicenza( TXT("Lic_CaratteristicheGeneriche"), '' ) +
		LICENZE.rowLicenza( TXT("Lic_ProcedurePersonali"),				ok?spunta			:this.red('1') ) +
		LICENZE.rowLicenza( TXT("Lic_TraduzioneAutomatica"),			ok?spunta			:ics ) +
		LICENZE.rowLicenza( TXT("Lic_BackupDati"),						ok?spunta			:ics ) +
		LICENZE.rowLicenza( TXT("Lic_NotifichePersonalizzate"),			ok?spunta			:ics );

		document.getElementById("contLicenze").innerHTML = HTML;
	}
	
}

