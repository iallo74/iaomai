var DRAGGER = {
	// spostamento elementi
	elDrag: null,
	elCont: null,
	overEl: null,
	moved: false,
	posIni: {x: -1, y: -1},
	posAtt: {x: -1, y: -1},
	diffIni: {x: 0, y: 0},
	funct: '',
	tmAtt: null,
	tmScroll: null,
	att: false,
	pushPos: '',
	overPH: false,
	startDrag: function( el, funct, cont ){
		if(DRAGGER.elDrag){
			DRAGGER.elDrag = null;
			return;
		}
		DRAGGER.posIni.x = touchable ? event.touches[ 0 ].pageX : event.clientX;
		DRAGGER.posIni.y = touchable ? event.touches[ 0 ].pageY : event.clientY;
		let target = el;
		while(target.tagName!='HTML' && target.id!="scheda_testo"){
			target = target.parentElement;
		}
		if(touchable && target.tagName!='HTML'){
			try{
				if(	!document.elementFromPoint(DRAGGER.posIni.x,DRAGGER.posIni.y).classList.contains("grabElement") && 
					!document.elementFromPoint(DRAGGER.posIni.x,DRAGGER.posIni.y).classList.contains("grabBtn")){
					return;
				}
			}catch(error){}
		}
		DRAGGER.posAtt = DRAGGER.posIni;
		document.getElementById("lb_move").classList.add("visSch");
		document.getElementById("lb_move").classList.add(el.dataset.dragClass);
		
		if(!touchable){
			window.addEventListener("mouseup", DRAGGER.stopDrag ,false);
			window.addEventListener("mousemove", DRAGGER.moveDrag ,false);
		}else{
			window.addEventListener("touchend", DRAGGER.stopDrag ,false);
			window.addEventListener("touchmove", DRAGGER.moveDrag ,{ passive: false });
		}
		DRAGGER.diffIni = {
			x: DRAGGER.posIni.x-(tCoord(el)+(el.scrollWidth*.5)),
			y: DRAGGER.posIni.y-(tCoord(el,'y')+(el.scrollHeight*.5))
		}
		if(touchable){
			DRAGGER.tmAtt = setTimeout(function(){
				DRAGGER.att = true;
				DRAGGER.posLB();
				document.getElementById("scheda_testo").classList.add("noScroll");
				document.querySelector(".listaTrattamenti ")?.classList.add("noScroll");
			},1000);
		}else DRAGGER.att = true;
		DRAGGER.elDrag = el;
		DRAGGER.funct = funct;
		DRAGGER.elCont = cont;
	},
	moveDrag: function( event ){
		if(!DRAGGER.att){
			if(!touchable)return;
			else{
				clearTimeout(DRAGGER.tmAtt);
				DRAGGER.stopDrag();
				return;
			}
		}
		if(typeof(event)!='undefined'){
			DRAGGER.posAtt = {
				x: touchable ? event.changedTouches[ 0 ].pageX : event.clientX,
				y: touchable ? event.changedTouches[ 0 ].pageY : event.clientY
			}
		}
		if(	!DRAGGER.moved && 
			Math.abs(DRAGGER.posAtt.x-DRAGGER.posIni.x)<10 && 
			Math.abs(DRAGGER.posAtt.y-DRAGGER.posIni.y)<10)return;
		document.getElementById("lb_move").classList.remove("visSch");
		DRAGGER.posLB();
		try{
			if(document.elementFromPoint(DRAGGER.posAtt.x,DRAGGER.posAtt.y).id=='lb_placeholder'){
				document.getElementById("lb_move").classList.add("visSch");
				return;
			}
		}catch(error){ return; }
		if(DRAGGER.elDrag.dataset.dragType=='child')DRAGGER.elDrag.style.opacity = 0.5;
		if(DRAGGER.elDrag.dataset.dragType=='move')DRAGGER.elDrag.parentElement.classList.add("grabed");
		DRAGGER.moved = true;
		DRAGGER.outDrag();
		target = document.elementFromPoint(DRAGGER.posAtt.x,DRAGGER.posAtt.y);
		if(target){
			if(DRAGGER.elDrag.dataset.dragType=='child'){
				while(target.tagName!='HTML' && !(__(target.dataset.dragFamily) == __(DRAGGER.elDrag.dataset.dragFamily) && target.dataset.dragType == 'cont')){
					target = target.parentElement;
				}
			}
			if(DRAGGER.elDrag.dataset.dragType=='move'){
				while(target.tagName!='HTML' && !(__(target.dataset.dragFamily) == __(DRAGGER.elDrag.dataset.dragFamily) && target.dataset.dragType == 'move')){
					target = target.parentElement;
				}
			}
		}
		document.getElementById("lb_move").classList.add("visSch");
		if(target){
			if(target.tagName!='HTML'){
				if(DRAGGER.elDrag.dataset.dragType=='child'){
					DRAGGER.overDrag(target);
				}
				if(DRAGGER.elDrag.dataset.dragType=='move'){
					DRAGGER.pushDrag(target.parentElement);
				}
			}
		}
		if(touchable){
			clearInterval(DRAGGER.tmScoll);
			DRAGGER.tmScoll = null;
			if(DRAGGER.posAtt.y>window.innerHeight-50){
				if(!DRAGGER.tmScoll)DRAGGER.tmScoll = setInterval(function(){
					if(DRAGGER.att){
						document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop+20);
						DRAGGER.moveDrag();
					}
				},100);
			}
			if(DRAGGER.posAtt.y<tCoord(document.getElementById("scheda_testo"),'y')+50){
				if(!DRAGGER.tmScoll)DRAGGER.tmScoll = setInterval(function(){
					if(DRAGGER.att){
						document.getElementById("scheda_testo").scrollTo(0,document.getElementById("scheda_testo").scrollTop-20);
						DRAGGER.moveDrag();
					}
				},100);
			}
		}
	},
	posLB: function(){
		if(!DRAGGER.att)return;
		let l = DRAGGER.posAtt.x-35,
			t = DRAGGER.posAtt.y-50;
		if(touchable){
			l -= 35;
			t -= 40;
		}
		document.getElementById("lb_move").style.left = l + 'px';
		document.getElementById("lb_move").style.top = t + 'px';
	},
	noScroll: function(e){
		e.preventDefault();
	},
	stopDrag: function( event ){
		if(DRAGGER.att){
			DRAGGER.posAtt = {
				x: touchable ? event.changedTouches[ 0 ].pageX : event.clientX,
				y: touchable ? event.changedTouches[ 0 ].pageY : event.clientY
			}
		}
		if(!touchable){
			window.removeEventListener("mouseup", DRAGGER.stopDrag ,false);
			window.removeEventListener("mousemove", DRAGGER.moveDrag ,false);
		}else{
			clearTimeout(DRAGGER.tmScroll);
			DRAGGER.tmScroll = null;
			document.getElementById("scheda_testo").classList.remove("noScroll");
			document.querySelector(".listaTrattamenti ")?.classList.remove("noScroll");
			window.removeEventListener("touchend", DRAGGER.stopDrag ,false);
			window.removeEventListener("touchmove", DRAGGER.moveDrag ,false);
		}
		document.getElementById("lb_move").classList.remove("visSch");
		document.getElementById("lb_move").classList.remove(DRAGGER.elDrag.dataset.dragClass);
		document.getElementById("lb_move").style.left = '-500px';
		document.getElementById("lb_move").style.top = '-500px';
		if(DRAGGER.elDrag.dataset.dragType=='child')DRAGGER.elDrag.style.opacity = 1;
		if(DRAGGER.elDrag.dataset.dragType=='move')DRAGGER.elDrag.parentElement.classList.remove("grabed");
		clearTimeout(DRAGGER.tmAtt);
		DRAGGER.tmAtt = null;
		if(DRAGGER.moved){
			if(DRAGGER.moved)eval(DRAGGER.funct + "(DRAGGER.elDrag,DRAGGER.overEl)");
			if(DRAGGER.overEl)DRAGGER.overEl.classList.remove("overDrag");
			DRAGGER.outDrag();
			DRAGGER.elDrag = null;
			DRAGGER.elCont = null;
			DRAGGER.overEl = null;
			DRAGGER.att = false;
			DRAGGER.moved = false;
			//DRAGGER.pushPos = '';
			DRAGGER.posIni = {x: -1, y: -1};
			DRAGGER.posAtt = {x: -1, y: -1};
			DRAGGER.diffIni = {x: 0, y: 0};
			DRAGGER.funct = '';
		}
	},
	overDrag: function( el ){
		if(DRAGGER.moved && el!=DRAGGER.elCont){
			DRAGGER.overEl = el;
			DRAGGER.overEl.classList.add("overDrag");
		}
	},
	pushDrag: function( el ){
		if(DRAGGER.moved && el!=DRAGGER.elCont){
			DRAGGER.overEl = el;
			let t = 0,
				ST = 0,
				b = 3,
				a = 1;
			target = DRAGGER.overEl.parentElement;
			while(target.tagName!='HTML' && target.id!="scheda_testo"){
				target = target.parentElement;
			}
			if(target.tagName!='HTML'){
				ST = document.getElementById("scheda_testo").scrollTop;
				t = 1;
				if(target.parentElement.parentElement.classList.contains("scheda_procedura")){
					t = 3;
					b = 8;
					a = 3;
				}
			}else{
				ST = document.querySelector(".listaTrattamenti").scrollTop;
				if(smartphone){
					b += 2;
				}
			}
			if(DRAGGER.posAtt.y < (tCoord(DRAGGER.overEl,'y')+(DRAGGER.overEl.scrollHeight*.5)-ST)){
				DRAGGER.pushPos = 'before';
				t += tCoord(el,'y')-b-ST;
			}else{
				DRAGGER.pushPos = 'after';
				t += tCoord(el,'y')+el.scrollHeight-a-ST;
			}
			DRAGGER.overEl.classList.add("pushDrag_"+DRAGGER.pushPos);
			document.getElementById("lb_placeholder").classList.add("visSch");
			document.getElementById("lb_placeholder").style.left = tCoord(el)+5 + 'px';
			document.getElementById("lb_placeholder").style.top = t + 'px';
			document.getElementById("lb_placeholder").style.width = (el.scrollWidth-10) + 'px';
			if(t<tCoord(document.getElementById("scheda_testo"),'y'))document.getElementById("lb_placeholder").classList.remove("visSch");
		}
	},
	outDrag: function(){
		if(DRAGGER.moved && DRAGGER.overEl && !DRAGGER.overPH){
			DRAGGER.overEl.classList.remove("overDrag");
			DRAGGER.overEl.classList.remove("pushDrag_before");
			DRAGGER.overEl.classList.remove("pushDrag_after");
			DRAGGER.overEl = null;
			document.getElementById("lb_placeholder").classList.remove("visSch");
			document.getElementById("lb_placeholder").style.left = '-500px';
			document.getElementById("lb_placeholder").style.top = '-500px';
		}
	}
}