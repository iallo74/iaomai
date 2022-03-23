
var DISPOSITIVI = {

	carica: function( txt ){
		var HTML = '<div id="dispositivi_descr">'+htmlEntities(Lingua(TXT_MaxDispositiviConnessi))+'</div>';
		var elenco = JSON.parse(txt);
		var devs1 = devs2 = type1 = type2 = time1 = time2 = plt1 = plt2 = '';
		console.log(elenco)
		if(elenco.DeviceInfo)devs1 = JSON.parse(window.atob(elenco.DeviceInfo));
		if(elenco.DeviceInfo2)devs2 = JSON.parse(window.atob(elenco.DeviceInfo2));
		if(parseInt(elenco.LastConn))time1 = "<br><i>"+Lingua(TXT_UltimaConnessione)+"</i>: "+getDataTS(elenco.LastConn);
		if(parseInt(elenco.LastConn2))time2 = "<br><i>"+Lingua(TXT_UltimaConnessione)+"</i>: "+getDataTS(elenco.LastConn2);
		
		if(devs1.appType=='APP')type1 = 'APP';
		else if(devs1.browser)type1 = 'Online: <img src="img/ico_browser_'+devs1.browser.toLowerCase()+'.png"> '+devs1.browser;
		if(devs2.appType=='APP')type2 = 'APP';
		else if(devs2.browser)type2 = 'Online: <img src="img/ico_browser_'+devs2.browser.toLowerCase()+'.png"> '+devs2.browser;
		if(devs1.platform){
			if(devs1.platform.toLowerCase().replace(" ","").indexOf("android")>-1)plt1 = 'android';
			if(devs1.platform.toLowerCase().replace(" ","").indexOf("macos")>-1)plt1 = 'macos';
			if(devs1.platform.toLowerCase().replace(" ","").indexOf("windows")>-1)plt1 = 'windows';
			if(devs1.platform.toLowerCase().replace(" ","").indexOf("ios")>-1)plt1 = 'macos';//'ios';
			if(devs1.platform.toLowerCase().replace(" ","").indexOf("linux")>-1)plt1 = 'linux';
		}
		if(devs2.platform){
			if(devs2.platform.toLowerCase().replace(" ","").indexOf("android")>-1)plt2 = 'android';
			if(devs2.platform.toLowerCase().replace(" ","").indexOf("macos")>-1)plt2 = 'macos';
			if(devs2.platform.toLowerCase().replace(" ","").indexOf("windows")>-1)plt2 = 'windows';
			if(devs2.platform.toLowerCase().replace(" ","").indexOf("ios")>-1)plt2 = 'macos';//'ios';
			if(devs2.platform.toLowerCase().replace(" ","").indexOf("linux")>-1)plt2 = 'linux';
		}
		
		HTML += '<div class="elsDispositivi'+ ((devs1.type.toLowerCase()!='computer') ? ' dispMobile"' : '') +'"' +
				'	  style="background-image:url(img/ico_os_'+plt1+'.png),url(img/ico_'+devs1.type.toLowerCase()+'.png);">' +
				'	<span class="btn_invia btn_logout_mini"' +
				'	 	   onClick="DISPOSITIVI.disconnetti(\''+elenco.UniqueId+'\');"></span>' +
					devs1.type + " " + devs1.platform + "<br>" + type1 + " " + time1 +
				'</div>' +
				'<div class="elsDispositivi'+ ((devs2.type.toLowerCase()!='computer') ? ' dispMobile"' : '') +'"' +
				'	  style="background-image:url(img/ico_os_'+plt2+'.png),url(img/ico_'+devs2.type.toLowerCase()+'.png);">' +
				'	<span class="btn_invia btn_logout_mini"' +
				'	 	   onClick="DISPOSITIVI.disconnetti(\''+elenco.UniqueId2+'\');"></span>' +
					devs2.type + " " + devs2.platform + "<br>" + type2 + " " + time2 +
				'</div>';
			
		document.getElementById("contDispositivi").innerHTML = HTML;
	},
	
	disconnetti: function( UniqueId ){
		CONN.caricaUrl(	"logout_device.php",
						"USR="+encodeURIComponent(DB.login.data.UsernameU) +
						"&ui_dev="+encodeURIComponent(UniqueId),
						"DISPOSITIVI.ret_disconnetti");
	},
	
	ret_disconnetti: function( txt ){
		if(txt == 'ok'){
			ALERT(Lingua(TXT_MsgLogoutDevices));
			MENU.chiudiMenu();
			MENU.visLogin();
		}else{
			ALERT(Lingua(TXT_ErrLogoutDevices));
		}
	}
	
}