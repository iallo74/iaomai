var SLIDER = {
	mL_Ini: 0,
	mT_Ini: 0,
	xIni: 0,
	xAtt: 0,
	yIni: 0,
	yAtt: 0,
	maxVal: 0,
	demolt: 1, // demoltiplicatore per il selettore rapido di anatomia
	livelloSel: '',
	slider: null,
	slider_btn: null,
	type: '',
	iniziaSlide: function(event,el,smart=''){
		event.preventDefault();
		livello=el.parentElement.parentElement.id.replace("p_","");
		if(el.parentElement.parentElement.className.indexOf("disattLiv") > -1){
			if(livello == 'pelle' && areasView)MODELLO.swArea(2);
			if(livello == 'aree' && !areasView)MODELLO.swArea(1);
		}
		SLIDER.type = smart ? 'smart' : '';
		SLIDER.livelloSel = livello;
		SLIDER.slider = document.getElementById("p_"+SLIDER.livelloSel).getElementsByClassName("slider")[0];
		SLIDER.slider_btn = document.getElementById("p_"+SLIDER.livelloSel).getElementsByClassName("slider_btn")[0];
		SLIDER.maxVal = SLIDER.slider.scrollWidth-SLIDER.slider_btn.scrollWidth;
		if(!touchable){
			document.body.addEventListener("mouseup",SLIDER.arrestaSlide,false);
			document.body.addEventListener("mousemove",SLIDER.moveSlider,false);
			document.body.addEventListener("mouseleave",SLIDER.arrestaSlide,false);
		}else{
			document.body.addEventListener("touchend", SLIDER.arrestaSlide, false );
			document.body.addEventListener("touchmove", SLIDER.moveSlider, false );	
		}

		let preVis = document.getElementById("pulsanti_modello").classList.contains("visSch");
		document.getElementById("pulsanti_modello").classList.add("visSch");
		let sl_cont = el.parentElement,
			type = sl_cont.id.replace("s_",""),
			maxSl = sl_cont.scrollWidth - el.scrollWidth;
		//if(type=='aree')type="pelle";
		let perc = MENU.getOp(type.charAt(0).toUpperCase() + type.slice(1)),
			mL = maxSl*perc;
		document.getElementById("pulsanti_modello").classList.toggle("visSch",preVis);

		SLIDER.mL_Ini = parseInt(mL);
		SLIDER.mT_Ini = parseInt(mL);
		
		if(touchable){
			try{
				SLIDER.xIni = event.touches[ 0 ].pageX;
				SLIDER.yIni = event.touches[ 0 ].pageY;
			}catch(err){};
		}else{
			SLIDER.xIni = event.clientX;
			SLIDER.yIni = event.clientY;
		}
		if(WF()<600)document.getElementById("pulsanti_modello").classList.add("pLight");
		raycastDisable = true;
		if(SET)SET._applyLineMethod();
	},
	moveSlider: function(event){
		event.preventDefault();
		SLIDER.xAtt = touchable ? event.touches[ 0 ].pageX : event.clientX;
		SLIDER.yAtt = touchable ? event.touches[ 0 ].pageY : event.clientY;
		let diffX = SLIDER.xAtt - SLIDER.xIni,
			diffY = SLIDER.yAtt - SLIDER.yIni,
			mL = SLIDER.mL_Ini/SLIDER.demolt + diffX,
			mT = SLIDER.mT_Ini/SLIDER.demolt - diffY;
		if(mL<0)mL = 0;
		if(mT<0)mT = 0;
		if(mL>SLIDER.maxVal/SLIDER.demolt)mL = SLIDER.maxVal/SLIDER.demolt;
		if(mT>SLIDER.maxVal/SLIDER.demolt)mT = SLIDER.maxVal/SLIDER.demolt;
		if(SLIDER.type=='smart' && smartMenu){
			SLIDER.slider_btn.style.marginLeft = (mT*SLIDER.demolt)+'px';
		}else{
			SLIDER.slider_btn.style.marginLeft = (mL*SLIDER.demolt)+'px';
		}
		let btnSlideAnat = document.getElementById("sliderAnatomia").querySelector(".slider").getElementsByTagName("div")[0];
		if(!SLIDER.type || !smartMenu){
			if(!smartMenu)btnSlideAnat.style.marginLeft = (mL)+'px';
			perc=(mL/SLIDER.maxVal)*SLIDER.demolt;
		}else{
			btnSlideAnat.style.marginTop = ((SLIDER.maxVal/SLIDER.demolt)-mT)+'px';
			perc=(mT/SLIDER.maxVal)*SLIDER.demolt;
		}
		if(smartMenu){
			document.getElementById("ttAnatomia").classList.add("visSch");
			document.getElementById("ttAnatomia").innerHTML = parseInt(perc*100)+'%';
			document.getElementById("ttAnatomia").style.left = (tCoord(document.getElementById("sliderAnatomia"))+5)+'px';
			document.getElementById("ttAnatomia").style.top = (tCoord(document.getElementById("sliderAnatomia"),'y')+document.getElementById("sliderAnatomia").scrollHeight-mT)+'px';
		}
		
		let l = SLIDER.livelloSel.substr(0,1).toUpperCase()+SLIDER.livelloSel.substr(1,SLIDER.livelloSel.length-1);
		MODELLO.op(l,perc);
		raycastDisable = true;
	},
	arrestaSlide: function(){
		if(!touchable){
			document.body.removeEventListener("mouseup",SLIDER.arrestaSlide,false);
			document.body.removeEventListener("mousemove",SLIDER.moveSlider,false);
			document.body.removeEventListener("mouseleave",SLIDER.arrestaSlide,false);
		}else{
			document.body.removeEventListener("touchend", SLIDER.arrestaSlide, false );
			document.body.removeEventListener("touchmove", SLIDER.moveSlider, false );	
		}
		document.getElementById("sliderAnatomia").classList.remove("visSch");
		SLIDER.sliderSel = '';
		SLIDER.slider = null;
		SLIDER.slider_btn = null;
		document.getElementById("pulsanti_modello").classList.remove("pLight");
		raycastDisable = false;
		SLIDER.demolt = 1;
		if(smartMenu){
			document.getElementById("ttAnatomia").classList.remove("visSch");
			document.getElementById("ttAnatomia").innerHTML = '';
			document.getElementById("ttAnatomia").style.top = '-500px';
		}
	}
}