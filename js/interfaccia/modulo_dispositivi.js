var DISPOSITIVI = {

	carica: function( txt ){
		let HTML = '<div id="dispositivi_descr">'+htmlEntities(TXT("MaxDispositiviConnessi"))+'</div>',
			elenco = JSON.parse(txt);
		for(c in elenco.connections){
			let EL = elenco.connections[c],
				devs = type = time = plt = '';
			if(EL.DeviceInfo)devs = JSON.parse(window.atob(EL.DeviceInfo));
			if(parseInt(EL.LastConn))time1 = "<br><i>"+TXT("UltimaConnessione")+"</i>: "+getDataTS(EL.LastConn);
			if(devs.appType=='APP')type = 'APP';
			else if(devs.browser)type = 'Online: <img src="img/ico_browser_'+devs.browser.toLowerCase()+'.png"> '+devs.browser;
			else type = 'WEB APP';
			if(devs.platform){
				if(devs.platform.toLowerCase().replace(" ","").indexOf("android")>-1)plt = 'android';
				if(devs.platform.toLowerCase().replace(" ","").indexOf("macos")>-1)plt = 'macos';
				if(devs.platform.toLowerCase().replace(" ","").indexOf("macintosh")>-1)plt = 'macos';
				if(devs.platform.toLowerCase().replace(" ","").indexOf("windows")>-1)plt = 'windows';
				if(devs.platform.toLowerCase().replace(" ","").indexOf("ios")>-1)plt = 'macos';//'ios';
				if(devs.platform.toLowerCase().replace(" ","").indexOf("linux")>-1)plt = 'linux';
			}
			HTML += '<div class="elsDispositivi'+ ((devs.type.toLowerCase()!='computer') ? ' dispMobile"' : '') +'"' +
				'	  style="background-image:url(img/ico_os_'+plt+'.png),url(img/ico_'+devs.type.toLowerCase()+'.png);">' +
				'	<span class="btn_invia btn_logout_mini"' +
				'	 	   onClick="DISPOSITIVI.disconnetti(\''+EL.UniqueId+'\');"></span>' +
					devs.type + " " + devs.platform + "<br>" + type + " " + time +
				'</div>';
		}
		document.getElementById("contDispositivi").innerHTML = HTML;
	},
	
	disconnetti: function( UniqueId ){
		document.getElementById("dispositivi").classList.add("blur");
		CONN.caricaUrl(	"logout_device.php",
						"USR="+encodeURIComponent(DB.login.data.UsernameU) +
						"&ui_dev="+encodeURIComponent(UniqueId),
						"DISPOSITIVI.ret_disconnetti");
	},
	
	ret_disconnetti: function( txt ){
		if(txt == 'ok'){
			//ALERT(TXT("MsgLogoutDevices"));
			//MENU.chiudiMenu();
			//MENU.visLogin();
			LOGIN.getLogin();
		}else{
			nasLoader("");
			ALERT(TXT("ErrLogoutDevices"));
		}
	}
	
}