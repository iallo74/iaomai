var SWIPE = {
	xIni: -1,
	yIni: -1,
	xAtt: -1,
	yAtt: -1,
	verso: '',
	box: '',
	box_move: '',
	functIndietro: '',
	functAvanti: '',
	functChiudi: '',
	closeCondition: '',
	init: function( box, box_move, functAvanti, functIndietro, functChiudi='', closeCondition='true' ){
		SWIPE.box = box;
		SWIPE.box_move = box_move;
		SWIPE.functIndietro = functIndietro;
		SWIPE.functAvanti = functAvanti;
		SWIPE.functChiudi = functChiudi;
		SWIPE.closeCondition = closeCondition;
		document.getElementById(SWIPE.box).addEventListener("touchstart", SWIPE.start, false );
	},
	dismis: function(){
		if(SWIPE.box){
			document.getElementById(SWIPE.box).removeEventListener("touchstart", SWIPE.start, false );
			SWIPE.box = '';
			SWIPE.box_move = '';
			SWIPE.functIndietro = '';
			SWIPE.functAvanti = '';
			SWIPE.functChiudi = '';
			SWIPE.closeCondition = '';
		}
	},
	start: function(event){
		let x = event.touches[ 0 ].pageX,
			y = event.touches[ 0 ].pageY,
			el = document.getElementById(SWIPE.box),
			limitLeft = tCoord(el),
			limitRight = limitLeft+el.scrollWidth,
			limitTop = tCoord(el,'y'),
			limitBottom = limitTop+el.scrollHeight;
		if(x>=limitLeft && x<=limitRight && y>=limitTop && y<=limitBottom){
			SWIPE.xIni = x;
			if(eval(SWIPE.closeCondition))SWIPE.yIni = y;
			let W = limitRight - limitLeft,
				area = parseInt(W/3);
			document.addEventListener("touchmove", SWIPE.move, false );
			document.addEventListener("touchend", SWIPE.end, false );
			if(SWIPE.xIni<area+limitLeft || SWIPE.xIni>(W-area)+limitLeft){
				if(SWIPE.xIni>=limitLeft && SWIPE.xIni<limitLeft+area)SWIPE.verso = 'R';
				else SWIPE.verso = 'L';
			}
		}
	},
	move: function(event){
		if(agenda.moved)return;
		SWIPE.xAtt = event.touches[ 0 ].pageX;
		SWIPE.yAtt = event.touches[ 0 ].pageY;
		let el = document.getElementById(SWIPE.box).getElementsByClassName(SWIPE.box_move)[0],
			op = 1-Math.abs((SWIPE.xAtt-SWIPE.xIni)/200);
		if(op<0.3)op=0.3;
		if(op>1)op=1;
		el.style.marginLeft = (SWIPE.xAtt-SWIPE.xIni)+'px';
		el.style.opacity = op;
	},
	end: function(event){
		let el = document.getElementById(SWIPE.box).getElementsByClassName(SWIPE.box_move)[0];
		el.style.marginLeft = '0px';
		el.style.opacity = 1;
		let diffX = Math.abs(SWIPE.xAtt - SWIPE.xIni),
			diffY = SWIPE.yAtt - SWIPE.yIni;
		if(SWIPE.xAtt==-1)diffX = 0;
		if(diffX > 50){
			if(SWIPE.xIni<SWIPE.xAtt && SWIPE.verso=='R')eval(SWIPE.functAvanti);
			if(SWIPE.xIni>SWIPE.xAtt && SWIPE.verso=='L')eval(SWIPE.functIndietro);
		}else if(diffY> 100 && SWIPE.yAtt>-1 && SWIPE.yIni>-1){
			eval(SWIPE.functChiudi);
		}
		document.removeEventListener("touchmove", SWIPE.move, false );
		document.removeEventListener("touchend", SWIPE.end, false );
		SWIPE.xIni = -1;
		SWIPE.yIni = -1;
		SWIPE.xAtt = -1;
		SWIPE.yAtt = -1;
		SWIPE.verso = '';
	}
}