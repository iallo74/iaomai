<!--
var SWIPE = {
	xIni: -1,
	xAtt: -1,
	verso: '',
	box: '',
	functIndietro: '',
	functAvanti: '',
	init: function( box, functAvanti, functIndietro ){
		SWIPE.box = box;
		SWIPE.functIndietro = functIndietro;
		SWIPE.functAvanti = functAvanti;
		document.getElementById(SWIPE.box).addEventListener("touchstart", SWIPE.start, false );
	},
	dismis: function(){
		if(SWIPE.box){
			document.getElementById(SWIPE.box).removeEventListener("touchstart", SWIPE.start, false );
			SWIPE.box = '';
			SWIPE.functIndietro = '';
			SWIPE.functAvanti = '';
		}
	},
	start: function(event){
		var x = event.touches[ 0 ].pageX;
		var el = document.getElementById(SWIPE.box);
		var limitLeft = tCoord(el);
		var limitRight = tCoord(el)+el.scrollWidth;
		if(x>=limitLeft && x<=limitRight){
			SWIPE.xIni = x;
			//var W = WF();
			var W = limitRight - limitLeft;
			var area = parseInt(W/3);
			if(SWIPE.xIni<area+limitLeft || SWIPE.xIni>(W-area)+limitLeft){
				document.addEventListener("touchmove", SWIPE.move, false );
				document.addEventListener("touchend", SWIPE.end, false );
				if(SWIPE.xIni>=limitLeft && SWIPE.xIni<limitLeft+area)SWIPE.verso = 'R';
				else SWIPE.verso = 'L';
			}
		}
	},
	move: function(event){
		SWIPE.xAtt = event.touches[ 0 ].pageX;
	},
	end: function(event){
		var diff = Math.abs(SWIPE.xAtt - SWIPE.xIni);
		if(SWIPE.xAtt==-1)diff = 0;
		if(diff > 50){
			if(SWIPE.xIni<SWIPE.xAtt && SWIPE.verso=='R')eval(SWIPE.functAvanti);
			if(SWIPE.xIni>SWIPE.xAtt && SWIPE.verso=='L')eval(SWIPE.functIndietro);
		}
		document.removeEventListener("touchmove", SWIPE.move, false );
		document.removeEventListener("touchend", SWIPE.end, false );
		SWIPE.xIni = -1;
		SWIPE.xAtt = -1;
		SWIPE.verso = '';
	}
}
//-->