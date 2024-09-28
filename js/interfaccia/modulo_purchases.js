var PURCHASES  = {
	
	productId: '',
	product_list: [],
	list_view: true,
	initiated: false,
	orderState: '',
    idBuying: '',
	
	init: function(){ // inizializza il catalogo
		PURCHASES.product_list = [];
		for(let s in sets){
			for(let m in sets[s].modls){
				if((!android && sets[s].modls[m].idApple) || (android && sets[s].modls[m].idGoogle)){
					if(android)idStore = sets[s].modls[m].idGoogle;
					else idStore = sets[s].modls[m].idApple;
					PURCHASES.product_list.push({
						idStore: idStore,
						folder: s,
						title: sets[s].nome,
						name: __(sets[s].modls[m].name,''),
						code: __(sets[s].modls[m].code,''),
						description: TXT("LicenzaIllimitata"),
						price: '',
						owned: false,
						pageStore: sets[s].pageStore
						});
				}
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
				regs.push({
					id:    PURCHASES.product_list[id].idStore,
					type:  store.NON_CONSUMABLE,
					platform: android ? "android-playstore" : "ios-appstore"
				});
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
	showProduct: function( id ){ // mostra il prodotto
		PURCHASES.list_view = false;
		PURCHASES.productId = id;
		let p;
		if(window.store)p = store.get(PURCHASES.productId);
		else p = PURCHASES.getProdById(PURCHASES.productId);
		PURCHASES.viewProduct(p);
	},
	purchaseLicense: function( id ){ // acquista la licenza
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
				md = encodeURIComponent(window.btoa(PURCHASES.getProdById(PURCHASES.productId).code));
			CONN.openUrl(convLangPath(CONN.urlStore)+"in_app_purchase?tk="+tk+"&mp="+fl+"&md="+md);
			
		}
	},
	finishPurchase:function(p){
		if(!p.products[0].id)return;
        if(p.products[0].id = PURCHASES.idBuying){
            PURCHASES.idBuying = '';
		    p.finish();
		    let pr = PURCHASES.getProdById(p.products[0].id);
		    CONN.caricaUrl(	"purchases_activate.php",
							"folder="+pr.folder+"&module="+__(pr.code,'')+"&price="+pr.price+"&siglaLingua="+globals.siglaLingua,
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
	viewProduct: function( product ){ // scrive la scheda del prodotto
		console.log(product)
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
			code = product.code,
			nameModule = __(product.name,'');
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
			price = product.price;
			folder = product.folder;
		}
		
		if(!owned)owned = (DB.login.data.auths.indexOf(folder)>-1 && (!code || DB.login.data.modls.indexOf(code))) ? true : false;
		let info = '<div id="copertinaPurchase" style="background-image:url(sets/'+folder+'/img/copertina.png);"></div>' +
					'<b id="titLicenze"><img src="sets/'+folder+'/img/logoMenuN.png"> '+product.title+' '+nameModule+'</b><br/>' +
						product.description+'<br/>' +
						price+'<br/>';
		let button = '';
		if(canPurchase){
			button = '';
			if(visRet)button += '<div class="ann" onClick="PURCHASES.productList();">'+TXT("Annulla")+'</div> ';
			button += '<div class="btn" onClick="PURCHASES.purchaseLicense(\''+PURCHASES.productId+'\')">'+TXT("CompraOra")+'</div>';
		}else if(owned){
			button = '<div>'+TXT("Acquistato")+'</div>';
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
			if(PURCHASES.product_list[id].idStore == idStore)el = PURCHASES.product_list[id];
		}
		return el;
	},
	makeProductList: function( product ){ // crea la lista prodotti (solo per Cordova)
		if(!PURCHASES.list_view)return;
		let el = PURCHASES.getProdById(product.id);
		el.title = product.title;
		el.price = product.pricing?.price;
		el.owned = product.owned;
		PURCHASES.productList();
	},
	productList: function(){ // elenca i prodotti
		PURCHASES.list_view = true;
		let addApple = (!onlineVersion && (iPad || iPhone || isMacUA)) ? 'Apple' : '',
			html =  '<div id="descrLicenze">' +
					TXT("DescrPurchase") +
					'</div><div><img src="img/storesSystems'+addApple+'.png"></div><div id="prList">',
	    	html_ok = '',
	    	html_no = '';
		for(let id in PURCHASES.product_list){
			if(PURCHASES.product_list[id].title && PURCHASES.product_list[id].title!='undefined'){
				let html_provv = '',
					idStore = PURCHASES.product_list[id].idStore,
					title = PURCHASES.product_list[id].title,
					price = PURCHASES.product_list[id].price,
					folder = PURCHASES.product_list[id].folder,
					code = PURCHASES.product_list[id].code,
					nameModule = PURCHASES.product_list[id].name,
					owned = PURCHASES.product_list[id].owned;
				if(!owned && LOGIN.logedin()!='')owned = (DB.login.data.auths.indexOf(folder)>-1 && (!code || LOGIN.verModule(code))) ? true : false;
				html_provv += 	'<div' +
								(!owned ? ' class="acqOk"' : '') +
								'><div class="tit'+(nameModule?' module':'')+'">' +
								'<img src="sets/'+folder+'/img/logoNero.png">' +
								'<b>'+title+'</b>' +
								(nameModule ? '<br>- '+nameModule : '') +
								'</div><div class="price">' +
								(!owned ? price : '') +
								'</div>' +
								(owned ? '<span>'+TXT("Acquistato")+'</span>' : '<div class="btn buy" onClick="PURCHASES.showProduct(\''+idStore+'\');">'+TXT("ACQUISTA")+'</div>') +
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
			for(let p in PURCHASES.product_list){
				for(let e in prices){
					if(	PURCHASES.product_list[p].folder == e.split(" ")[0] &&
						(!e.split(" ")[1] || e.split(" ")[1]==PURCHASES.product_list[p].code) )PURCHASES.product_list[p].price =  prices[e]+getValuta();
				}
			}
			PURCHASES.productList();
		}
	}
	
}

