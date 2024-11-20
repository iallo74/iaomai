var PURCHASES  = {
	
	productId: '',
	product_list: [],
	list_view: true,
	initiated: false,
	orderState: '',
    idBuying: '',
	convenzione: '',
	
	init: function(){ // inizializza il catalogo
		PURCHASES.product_list = [];
		for(let s in sets){
			if(sets[s].abbs){
				let el = {
						folder: s,
						title: sets[s].nome,
						pageStore: sets[s].pageStore,
						owned: false,
						abbs: []
					}
				for(let m in sets[s].abbs){
					let abb = sets[s].abbs[m];
					el.abbs.push({
						type: m,
						idStore: (window.store) ? ((android) ? abb.idGoogle : abb.idApple) : abb.idPc,
						price: ''
					});
				}
				PURCHASES.product_list.push(el);
			}
		}
		PURCHASES.initStore();
	},
	
	updateProducts: function(){
		if(PURCHASES.product_list.length){
			for(let p in PURCHASES.product_list){
				if(PURCHASES.product_list[p].folder == elenco.auths[p])PURCHASES.product_list[p].owned;
			}
			PURCHASES.productList();
		}
	},
	initStore: function(){ // inizializza l'acquisto
		PURCHASES.initiated = true;
		if(window?.CdvPurchase?.store)window.store = window.CdvPurchase.store;
		if(window.store){
			store.error(function(error) {
				console.log('ERROR ' + error.code + ': ' + error.message);
			});
			let regs = [];
			for(let id in PURCHASES.product_list){
				for(let m in PURCHASES.product_list[id].abbs){
					regs.push({
						id:    PURCHASES.product_list[id].abbs[m].idStore,
						type:  store.PAID_SUBSCRIPTION,
						platform: android ? "android-playstore" : "ios-appstore"
					});
				}
			}
			store.register(regs);
			store.when()
				.productUpdated(product => PURCHASES.makeProductList(product))
				.approved(transaction => PURCHASES.finishPurchase(transaction));
			store.initialize();
		}else{
			PURCHASES.getPrices();
		}
	},
	showProduct: function( id, type ){ // mostra il prodotto
		PURCHASES.list_view = false;
		PURCHASES.productId = id;
		let p;
		if(window.store)p = store.get(PURCHASES.productId);
		else p = PURCHASES.getProdById(PURCHASES.productId);
		PURCHASES.viewProduct(p, type);
	},
	purchaseLicense: function( id, type ){ // acquista la licenza
		if(window.store){
			if(!android){ // ritardo per apple
				let el = document.getElementById('contPurchases');
				let preHTML = el.innerHTML;
				el.classList.add("ini");
				el.innerHTML = '';
				setTimeout(function(){
					el.classList.remove("ini");
					el.innerHTML = preHTML;
				},7000,preHTML);
			}
            PURCHASES.idBuying = id;
			store.get(PURCHASES.productId)?.getOffer()?.order();
		}else{
			let tk = encodeURIComponent(window.btoa(LOGIN.logedin() + MD5(DB.login.data.idUtente.toString()))),
				fl = encodeURIComponent(window.btoa(PURCHASES.getProdById(PURCHASES.productId).folder)),
				idP = (PURCHASES.convenzione) ? PURCHASES.convenzione.idPartner : '0';
			CONN.openUrl(convLangPath(CONN.urlStore)+"in_app_purchase_subs?tk="+tk+"&mp="+fl+"&type="+type+"&idP="+idP+"&lang="+LINGUE.getSigla2());
			
		}
	},
	finishPurchase: function(p){
		if(!p.products[0].id)return;
		if(p.products[0].id = PURCHASES.idBuying){
			PURCHASES.idBuying = '';

			p.finish();
			let pr = PURCHASES.getProdById(p.products[0].id),
				price = store.get(p.products[0].id).offers[0].pricingPhases[0].price;
			CONN.caricaUrl(	"purchases_activate.php",
							"folder="+pr.folder+"&price="+price+"&siglaLingua="+globals.siglaLingua+"&transactionId="+encodeURIComponent(btoa(p.transactionId))+"&purchaseToken="+encodeURIComponent(btoa(p.nativePurchase.purchaseToken))+"&productId="+p.products[0].id,
							"PURCHASES.ret_activate");
		}
	},
	ret_activate: function( txt ){
		if(txt=='404'){
			ALERT("An error has occurred");
		}else{
			DB.login.data.auths.push(txt);
			PURCHASES.productList();
		}
	},
	
	// visualizzazioni
	viewProduct: function( product, type ){ // scrive la scheda del prodotto
		if(window.store){	
			if(product.state=='requested')PURCHASES.orderState = 'requested';
			if(PURCHASES.orderState == 'requested' && product.state=='approved'){
				PURCHASES.orderState = '';
    			PURCHASES.finishPurchase( product );
			}
		}
		if(PURCHASES.list_view)return;
		if(!LOGIN.logedin()){
			ALERT(TXT("AlertNoLogPuchase"));
			return;
		}
		let visRet = true,
			loaded = true,
			canPurchase = true,
			owned = false,
			loadingPurchase = false,
			folder = '',
			price = 0,
			typeAbb = TXT("sub_"+type);
		if(!price)TXT("AccediAlloStore");
		if(window.store){
			price = product.offers[0].pricingPhases[0].price;
			if(product.state == 'requested' || product.state == 'initiated')visRet = false;
			loaded = product.loaded;
			canPurchase = product.canPurchase;
			if(!owned)owned = product.owned;
			if(product.state == 'requested' || product.state == 'initiated')loadingPurchase = true;
			if(product.price)price = product.price;
			folder = PURCHASES.getProdById(product.id).folder;
		}else{
			for(let m in product.abbs){
				if(product.abbs[m].type == type)price = product.abbs[m].price;
			}
			folder = product.folder;
		}
		
		if(!owned)owned = (DB.login.data.auths.indexOf(folder)>-1) ? true : false;
		let info = '<div id="copertinaPurchase" style="background-image:url(img/sf_copertine.png),url(sets/'+folder+'/img/copertina.png);"></div>' +
					'<b id="titLicenze"><img src="sets/'+folder+'/img/logoMenu.png"> '+product.title+'</b><br/>' +
					typeAbb+'<br/>' +
						price+'<br/>';
		let button = '';
		if(canPurchase){
			button = '';
			if(!window.store && type=='m'){
				button += '<div class="promoEuro inDett"><b>'+TXT("PrimoMese1Euro")+'*</b><br>(*) '+TXT("NotePrimoMese1Euro").replace("[mappa]",product.title)+'</div>';
			}
			if(visRet)button += '<div class="ann" onClick="PURCHASES.abbsList();">'+TXT("Annulla")+'</div> ';
			button += '<div class="btn" onClick="PURCHASES.purchaseLicense(\''+PURCHASES.productId+'\',\''+type+'\')">'+TXT("AbbonatiOra")+'</div>';
		}else if(owned){
			button = '<div>'+TXT("Abbonato")+'</div>';
		}else if(loadingPurchase){
			button = '<div><img src="img/loadingWhite2.gif" id="imgLoadingPurchase">'+stripslashes(TXT("CaricamentoAcquisto"))+'...</div>';
		}
		let el = document.getElementById('contPurchases');
		el.classList.remove("ini");
		el.innerHTML = info + '<div class="btn_cont">' + button + '</div>';
	},
	getProdById: function( idStore ){ // ottiene un prodotto tramite ID
		let el = null;
		for(let id in PURCHASES.product_list){
			for(let m in PURCHASES.product_list[id].abbs){
				if(PURCHASES.product_list[id].abbs[m].idStore == idStore)el = PURCHASES.product_list[id];
			}
		}
		return el;
	},
	makeProductList: function( product ){ // crea la lista prodotti (solo per Cordova)
		if(!PURCHASES.list_view)return;
		let el = PURCHASES.getProdById(product.id);
		el.title = product.title;
		el.price = product.pricing?.price;
		el.owned = product.owned;
		PURCHASES.abbsList();
	},
	productList: function( id ){ // elenca i prodotti
		PURCHASES.list_view = true;
		let folder = PURCHASES.product_list[id].folder,
			html =  '<div class="torna" onClick="PURCHASES.abbsList();">'+TXT("TornaProdotti")+'</div>' +
					'<div id="copertinaPurchase" style="background-image:url(img/sf_copertine.png),url(sets/'+folder+'/img/copertina.png);"></div>' +
					'<b id="titLicenze"><img src="sets/'+folder+'/img/logoMenu.png"> '+PURCHASES.product_list[id].title+'</b><br/>';
						
		for(let m in PURCHASES.product_list[id].abbs){
			let html_provv = '',
				idStore = PURCHASES.product_list[id].abbs[m].idStore,
				type = PURCHASES.product_list[id].abbs[m].type,
				price = PURCHASES.product_list[id].abbs[m].price,
				pass = true,
				corsoInConv = (PURCHASES.convenzione) ? PURCHASES.convenzione.folders.indexOf(folder)>-1 : false;
			
			if( (PURCHASES.convenzione && type=="a") || (!PURCHASES.convenzione && type=="ac") )pass = false;
			if(!corsoInConv){
				if(type=="a")pass = true;
				if(type=="ac")pass = false;
			}
			
			if(	PURCHASES.product_list[id].title && PURCHASES.product_list[id].title!='undefined' && pass ){
				if(window.store){
					let p = store.get(idStore);
					price = p.offers[0].pricingPhases[0].price;
				}
				html_provv += 	'<div class="acqOk'+((type=='ac')?' acq_conv':'')+'" style="margin-top:15px;"><div class="tit">' +
								'</div>' +
								(type=='ac' ? '<div id="label_prezzo_conv">'+TXT("PrezzoInConvenzione")+'</div>' : '') +
								'<div class="btn buy" onClick="PURCHASES.showProduct(\''+idStore+'\',\''+type+'\');">'+TXT("sub_"+type.substr(0,1))+': <b>'+price+' / '+TXT("add_"+type.substr(0,1))+'</b></div>' +
								'</div>';
				if(!window.store && type=='m'){
					html_provv += '<div class="promoEuro"><b>'+TXT("PrimoMese1Euro")+'*</b><br>(*) '+TXT("NotePrimoMese1Euro").replace("[mappa]",PURCHASES.product_list[id].title)+'</div>';
				}
				html_provv += 	'<span class="sep"></span>';
				html += html_provv;
			}
		}
		html += '<div style="margin:10px 0;">'+TXT("RinnovoAutomatico")+'</div>' +
				'</div>';
		let el = document.getElementById('contPurchases');
		el.classList.remove("ini");
		el.innerHTML = html;
	},
	abbsList: function(){ // elenca i prodotti
		PURCHASES.list_view = true;
		let addApple = (!onlineVersion && (iPad || iPhone || isMacUA)) ? 'Apple' : '',
			html =  '',
	    	html_ok = '',
	    	html_no = '';

		html += '<div id="descrLicenze">' +
					TXT("DescrPurchase") +
				'</div>';
		if(!PURCHASES.convenzione){
			html +=	'<div><b>'+TXT("HaiConvenzione")+'</b></div>' +
					'<div id="ins_cod_conv">' +
					'	<div>' +
					'		<input type="text" id="CodiceConvenzione" placeholder="'+TXT("InserisciCodice")+'" onClick="PURCHASES.visConv();">' +
					'		<div onClick="PURCHASES.verConv();">'+TXT("APPLICA")+'</div>' +
					'	</div>' +
					'</div>';
		}else{
			html +=	'<div id="ins_cod_conv"><span><span onClick="PURCHASES.delConv();"></span>'+TXT("ConvenzioneAttiva")+': '+PURCHASES.convenzione.convenzione+'</span></div>';
		}
		//html +=	'<div><img src="img/storesSystems'+addApple+'.png"></div>';
		html +=	'<div id="prList">';
		for(let id in PURCHASES.product_list){
			if(PURCHASES.product_list[id].title && PURCHASES.product_list[id].title!='undefined'){
				let html_provv = '',
					title = PURCHASES.product_list[id].title,
					folder = PURCHASES.product_list[id].folder,
					owned = false,
					addTit = '';
				if(LOGIN.logedin()!='')owned = (DB.login.data.auths.indexOf(folder)>-1) ? true : false;
				if(PURCHASES.convenzione && !owned){
					if(PURCHASES.convenzione.folders.indexOf(folder)>-1)addTit = ' tit_conv';
				}
				html_provv += 	'<div' +
								(!owned ? ' class="acqOk"' : '') +
								'><div class="tit'+addTit+'">' +
								'<img src="sets/'+folder+'/img/logoNero.png">' +
								'<b>'+title+'</b>' +
								'</div>'+
								(owned ? '<span>'+TXT("Abbonato")+'</span>' : '<div class="btn buy" onClick="PURCHASES.productList(\''+id+'\');">'+TXT("SCOPRI")+'</div>') +
								'</div>';
				if(owned)html_ok += html_provv;
				else html_no += html_provv;
			}
		}
		html += html_ok + html_no +
				'</div>';
		let el = document.getElementById('contPurchases');
		el.classList.remove("ini");
		el.innerHTML = html;
	},
	
	// reperimento prezzi da DB
	getPrices: function(){	
		CONN.caricaUrl(	"purchases_getprices.php",
						"",
						"PURCHASES.ret_getPrices");
	},
	ret_getPrices: function( txt ){
		if(txt=='404'){
			ALERT("An error has occurred");
		}else{
			let prices = JSON.parse( txt );
			for(let p in prices){
				if(p.indexOf(' a')>-1){
					prices[p.replace(" a"," ac")] = (prices[p]*.8).toFixed(2);
				}
			}
			for(let p in PURCHASES.product_list){
				for(let e in prices){
					if(	PURCHASES.product_list[p].folder == e.split(" ")[0] ){
						for(let m in PURCHASES.product_list[p].abbs){
							if(e.split(" ")[1] == PURCHASES.product_list[p].abbs[m].type)PURCHASES.product_list[p].abbs[m].price =  prices[e]+getValuta();
						}
						
					}
				}
			}
			PURCHASES.abbsList();
		}
	},
	visConv: function(){
		document.getElementById("ins_cod_conv").classList.add("att");
	},
	verConv: function(){
		CONN.caricaUrl(	"purchases_verConv.php",
						"code="+encodeURIComponent(btoa(document.getElementById("CodiceConvenzione").value)),
						"PURCHASES.ret_verConv");
	},
	ret_verConv: function( txt ){
		if(txt=='404'){
			ALERT("An error has occurred");
		}else{
			let json = JSON.parse(txt);
			console.log(json)
			if(json.convenzione){
				PURCHASES.convenzione = json;
				PURCHASES.abbsList();
			}else{
				ALERT(TXT("ConvenzioneNonTrovata"));
			}
		}
	},
	delConv: function(){
		PURCHASES.convenzione = '';
		PURCHASES.abbsList();
	}
	
}

