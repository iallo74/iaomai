
var MODULO_PUNTI = { // extend SET

	PUNTI_free: [  ],
	caricaPunti: function(){
		let n = 0,
			elencoPunti = '',
			puntiElenco = [];
		for(let muscolo in DB.set.punti){
			if(__(DB.set.punti[muscolo])){
				let siglaPunto = SET.getFirstPoint(muscolo);
				puntiElenco.push({
					siglaPunto: siglaPunto,
					muscolo: muscolo,
					NomePunto: DB.set.punti[muscolo].NomePunto,
					settore: DB.set.punti[muscolo].settore
				});
			}
		}
		puntiElenco.sort(sort_by("NomePunto", false));

		for(let settore in DB.set.settori){
			elencoPunti += '<div class="settori" id="apr_'+settore+'" onClick="SET.swSettori(this,'+settore+');">'+DB.set.settori[settore]+'</div><span id="e_'+settore+'" class="elencoPunti">';
			for(a=0;a<puntiElenco.length;a++){
				if(puntiElenco[a].settore == settore){
					let siglaPunto = puntiElenco[a].siglaPunto,
						muscolo = puntiElenco[a].muscolo;
					n++;
					
					// verifico le autorizzazioni
					let addLock =	(!SET.verFreePunti(muscolo)) ? ' lockedItem' : '';
					// --------------------------
					elencoPunti+='<p>'+this.scriviPunto(muscolo,true,true,'')+'</p>';
				}
			}
			elencoPunti += '</span>';
		}		
		document.getElementById("lista_punti").innerHTML = '<div class="lista listaPunti">'+elencoPunti+'</div>';
	},
	startSmPress: function( el ){
		SET.smPressed = el;
		SET.smActive = !el.classList.contains("elencoSel");
		window.addEventListener("touchmove", SET.moveSmPress,{ passive: false });
		window.addEventListener("touchend", SET.endSmPress,true);
	},
	moveSmPress: function( event ){
		event.preventDefault();
		let mX = event.targetTouches[0].pageX,
			mY = event.targetTouches[0].pageY,
			els = document.getElementById("meridianiSmart_cont").getElementsByTagName("div");
		for(e=0;e<els.length;e++){
			let x = tCoord(els[e]),
				y = tCoord(els[e],'y'),
				w = els[e].scrollWidth,
				h = els[e].scrollHeight;
			if(	mX>=x && 
				mX<=x+w && 
				mY>=y && 
				mY<=y+h &&
				els[e]!=SET.smPressed &&
				els[e].classList.contains("elencoSel")!=SET.smActive ){
					SET.accendiGruppo(els[e].id.replace("sm",""),true);
			}
		}
		if(SET.smPressed.classList.contains("elencoSel")!=SET.smActive){
			SET.accendiGruppo(SET.smPressed.id.replace("sm",""),true);
		}
	},
	endSmPress: function(){
		window.removeEventListener("touchmove", SET.moveSmPress,{ passive: false });
		window.removeEventListener("touchend", SET.endSmPress,true);
		SET.smPressed=false;
		SET.smActive=false;
	},
	eviMeridiano: function( m, b ){
		if(touchable)return;
		// evidenzia il meridiano al passaggio del mouse
		if(!MERIDIANI[m].meridianoAcceso){
			if(b)SET.coloraMeridiano(m,'Over','Over');
			else SET.coloraMeridiano(m,'','Base');
		}
	},
	swSettori: function( el, m ){
		// mostra/nasconde l'elenco dei punti di un settore
		if(!document.getElementById("e_"+m).classList.contains("visElPt")){
			document.getElementById("e_"+m).classList.add("visElPt");
			el.classList.add("frSw");
		}else{
			document.getElementById("e_"+m).classList.remove("visElPt")
			el.classList.remove("frSw");
		}
	},
	verFreePunti: function( n ){
		return !(SET.PUNTI_free.indexOf(n)==-1 && (SET.blur || !LOGIN.logedin()));
	}
	
}