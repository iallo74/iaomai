var PURCHASES  = {
	
	productId: '',
	product_list: [],
	list_view: true,
	initiated: false,
	orderState: '',
	
	init: function(){
		// inizializza il catalogo
		for(s in sets){
			if((!android && sets[s].idApple) || (android && sets[s].idGoogle)){
				if(android)idStore = sets[s].idGoogle;
				else idStore = sets[s].idApple;
				PURCHASES.product_list.push({
					idStore: idStore,
					folder: s,
					title: sets[s].nome,
					description: TXT("LicenzaIllimitata"),
					price: '',
					owned: false,
					pageStore: sets[s].pageStore
					});
			}
		}
		PURCHASES.initStore();
	},
	
	updateProducts: function(){
		if(PURCHASES.product_list.length){
			for(var p in PURCHASES.product_list){
				if(PURCHASES.product_list[p].folder == elenco.auths[e])PURCHASES.product_list[p].owned;
			}
			PURCHASES.productList();
		}
	},
	initStore: function(){
		// inizializza l'acquisto
		PURCHASES.initiated = true;
		if(window.store){
			store.error(function(error) {
				console.log('ERROR ' + error.code + ': ' + error.message);
			});
			for(var id in PURCHASES.product_list){
				store.register({
					id:    PURCHASES.product_list[id].idStore,
					type:  store.NON_CONSUMABLE
				});
				store.when(PURCHASES.product_list[id].idStore).loaded(PURCHASES.makeProductList);
				store.when(PURCHASES.product_list[id].idStore).updated(PURCHASES.viewProduct);
				store.when(PURCHASES.product_list[id].idStore).approved(function(p) {
					p.verify();
				});
				store.when(PURCHASES.product_list[id].idStore).verified(PURCHASES.finishPurchase);
			}
			store.refresh();
		}else{
			PURCHASES.getPrices();
		}
	},
	showProduct: function( id ){
		// mostra il prodotto
		PURCHASES.list_view = false;
		PURCHASES.productId = id;
		var p;
		if(window.store)p = store.get(PURCHASES.productId);
		else p = PURCHASES.getProdById(PURCHASES.productId);
		PURCHASES.viewProduct(p);
	},
	purchaseLicense: function(){
		// acquista la licenza
		if(window.store)store.order(PURCHASES.productId);
		else{
			var tk = encodeURIComponent(window.btoa(LOGIN.logedin() + MD5(DB.login.data.idUtente)));
			var fl = encodeURIComponent(window.btoa(PURCHASES.getProdById(PURCHASES.productId).folder));
			CONN.openUrl(convLangPath(CONN.urlStore)+"in_app_purchase?tk="+tk+"&mp="+fl);
			
		}
	},
	finishPurchase:function(p){
		p.finish();
		//if(p.state == 'approved' || p.state == 'owned'){
			var pr = PURCHASES.getProdById(p.id);
			CONN.caricaUrl(	"purchases_activate.php",
							"folder="+pr.folder+"&price="+pr.price+"&siglaLingua="+globals.siglaLingua,
							"PURCHASES.ret_activate");
			
		//}
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
	viewProduct: function( product ){
		// scrive la scheda del prodotto
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
		var visRet = true;
		var loaded = true;
		var canPurchase = true;
		var owned = false;
		var loadingPurchase = false;
		var price = product.price;
		var folder = '';
		if(!price)TXT("AccediAlloStore");
		if(window.store){
			if(product.state == 'requested' || product.state == 'initiated')visRet = false;
			loaded = product.loaded;
			canPurchase = product.canPurchase;
			if(!owned)owned = product.owned;
			if(product.state == 'requested' || product.state == 'initiated')loadingPurchase = true;
			if(product.price)price = product.price;
			folder = PURCHASES.getProdById(product.id).folder;
		}else{
			folder = product.folder;
		}
		if(!owned)owned = (DB.login.data.auths.indexOf(folder)>-1) ? true : false;
		var info = '<div id="copertinaPurchase" style="background-image:url(sets/'+folder+'/img/copertina.png);"></div>';
		var button = '...';
		if(loaded){
			info += '<b id="titLicenze"><img src="sets/'+folder+'/img/logoMenuN.png"> '+product.title+'</b><br/>' +
					product.description+'<br/>' +
					price+'<br/>';
		}
		var button = '';
		if(canPurchase){
			button = '';
			if(visRet)button += '<div class="ann" onClick="PURCHASES.productList();">'+TXT("Annulla")+'</div> ';
			button += '<div class="btn" onClick="PURCHASES.purchaseLicense()">'+TXT("CompraOra")+'</div>';
		}else if(owned){
			button = '<div>'+TXT("Acquistato")+'</div>';
		}else if(loadingPurchase){
			button = '<div><img src="img/loadingWhite2.gif" id="imgLoadingPurchase">'+stripslashes(TXT("CaricamentoAcquisto"))+'...</div>';
		}
		var el = document.getElementById('contPurchases');
		el.classList.remove("ini");
		el.innerHTML = info + '<div class="btn_cont">' + button + '</div>';
	},
	getProdById: function( idStore ){
		// ottiene un prodotto tramite ID
		var el = null;
		for(var id in PURCHASES.product_list){
			if(PURCHASES.product_list[id].idStore == idStore)el = PURCHASES.product_list[id];
		}
		return el;
	},
	makeProductList: function( product ){
		// crea la lista prodotti (solo per Cordova)
		if(!PURCHASES.list_view)return;
		var el = PURCHASES.getProdById(product.id);
		el.title = product.title;
		el.price = product.price;
		el.owned = product.owned;
		PURCHASES.productList();
	},
	productList: function(){
		// elenco i prodotti
		PURCHASES.list_view = true;
		var addApple = (!onlineVersion && (iPad || iPhone || isMacUA)) ? 'Apple' : '';
		var html =  '<div id="descrLicenze">' +
					TXT("DescrPurchase") +
					'</div><div><img src="img/storesSystems'+addApple+'.png"></div><div id="prList">';
	    var html_ok = '';
	    var html_no = '';
		for(var id in PURCHASES.product_list){
			if(PURCHASES.product_list[id].title && PURCHASES.product_list[id].title!='undefined'){
				var html_provv = '';
				var idStore = PURCHASES.product_list[id].idStore;
				var title = PURCHASES.product_list[id].title;
				var price = PURCHASES.product_list[id].price;
				var folder = PURCHASES.product_list[id].folder;
				var owned = PURCHASES.product_list[id].owned;
				if(!owned && LOGIN.logedin()!='')owned = (DB.login.data.auths.indexOf(folder)>-1) ? true : false;
				html_provv += '<div';
				if(!owned)html_provv += ' class="acqOk"';
				html_provv += '><div class="tit">';
				html_provv += '<img src="sets/'+folder+'/img/logoNero.png">';
				html_provv += title + '</div><div class="price">';
				if(!owned)html_provv += price;
				html_provv += '</div>';
				if(owned)html_provv += '<span>'+TXT("Acquistato")+'</span>';
				else html_provv += '<div class="btn buy" onClick="PURCHASES.showProduct(\''+idStore+'\');">'+TXT("ACQUISTA")+'</div>';
				html_provv += '</div>';
				if(owned)html_ok += html_provv;
				else html_no += html_provv;
			}
		}
		html += html_ok + html_no;
		html += '</div>';
		var el = document.getElementById('contPurchases');
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
			var prices = JSON.parse( txt );
			for(p in PURCHASES.product_list){
				for(e in prices){
					if(PURCHASES.product_list[p].folder == e)PURCHASES.product_list[p].price =  prices[e]+"€";
				}
			}
			PURCHASES.productList();
		}
	}
	
}

