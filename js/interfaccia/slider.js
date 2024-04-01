var SLIDER = {
	mIni: 0,
	xIni: 0,
	xAtt: 0,
	maxVal: 0,
	demolt: 1, // demoltiplicatore per il selettore rapido di anatomia
	livelloSel: '',
	slider: null,
	slider_btn: null,
	iniziaSlide: function(event,el){
		event.preventDefault();
		livello=el.parentElement.parentElement.id.replace("p_","");
		if(el.parentElement.parentElement.className.indexOf("disattLiv") > -1){
			if(livello == 'pelle' && areasView)MODELLO.swArea(2);
			if(livello == 'aree' && !areasView)MODELLO.swArea(1);
			//return;
		}
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
		let mL = "0"+SLIDER.slider_btn.style.marginLeft.replace("px","")+"";
		SLIDER.mIni = parseInt(mL);
		if(touchable){
			try{ SLIDER.xIni = event.touches[ 0 ].pageX; }catch(err){};
		}else SLIDER.xIni = event.clientX;
		if(WF()<600)document.getElementById("pulsanti_modello").classList.add("pLight");
		raycastDisable = true;
		if(SET)SET._applyLineMethod();
	},
	moveSlider: function(event){
		event.preventDefault();
		SLIDER.xAtt = touchable ? event.touches[ 0 ].pageX : event.clientX;
		let diffX = SLIDER.xAtt - SLIDER.xIni,
			mL = SLIDER.mIni/SLIDER.demolt + diffX;
		if(mL<0)mL = 0;
		if(mL>SLIDER.maxVal/SLIDER.demolt)mL = SLIDER.maxVal/SLIDER.demolt;
		SLIDER.slider_btn.style.marginLeft = (mL*SLIDER.demolt)+'px';
		let btnSlideAnat = document.getElementById("sliderAnatomia").querySelector(".slider").getElementsByTagName("div")[0];
		btnSlideAnat.style.marginLeft = (mL)+'px';
		perc=(mL/SLIDER.maxVal)*SLIDER.demolt;
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
	}
}