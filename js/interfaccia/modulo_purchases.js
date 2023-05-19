var PURCHASES  = {
	
	
	productId: '',
	product_list: [],
	list_view: true,
	
	init: function(){
		/*
		
		NOTE
		- Gestire la conferma di acquisto
		
		*/
		
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
		//document.addEventListener('deviceready', PURCHASES.initStore);
	},
	
	initStore: function(){
		if(window.store){
			store.error(function(error) {
				console.log('ERROR ' + error.code + ': ' + error.message);
			});
			for(let id in PURCHASES.product_list){
				store.register({
					id:    PURCHASES.product_list[id].idStore,
					type:  store.NON_CONSUMABLE
				});
				store.when(PURCHASES.product_list[id].idStore).loaded(PURCHASES.makeProductList);
				store.when(PURCHASES.product_list[id].idStore).updated(PURCHASES.refreshProductUI);
				store.when(PURCHASES.product_list[id].idStore).approved(function(p) {
					p.verify();
				});
				store.when(PURCHASES.product_list[id].idStore).verified(PURCHASES.finishPurchase);
			}
			store.refresh();
		}else{
			PURCHASES.productList();
		}
	},
	showProduct: function( id ){
		PURCHASES.list_view = false;
		PURCHASES.productId = id;
		var p;
		if(window.store)p = store.get(PURCHASES.productId);
		else p = PURCHASES.getProdById(PURCHASES.productId);
		PURCHASES.refreshProductUI(p);
	},
	purchaseLicense: function(){
		if(window.store)store.order(PURCHASES.productId);
		else{
			CONN.openUrl(CONN.urlStore.replace("[lang]",globals.siglaLingua.substr(0,2))+"overview_"+PURCHASES.getProdById(PURCHASES.productId).pageStore+".php");
		}
	},
	finishPurchase:function(p) {
		p.finish();
		
		// GESTIRE LA CONFERMA
		
		
		
	},
	refreshProductUI: function( product ){
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
		var price = TXT("AccediAlloStore");
		if(window.store){
			if(product.state == 'requested' || product.state == 'initiated')visRet = false;
			loaded = product.loaded;
			canPurchase = product.canPurchase;
			if(!owned)owned = product.owned;
			if(product.state == 'requested' || product.state == 'initiated')loadingPurchase = true;
			if(product.price)price = product.price;
		}
		if(!owned)owned = (DB.login.data.auths.indexOf(product.folder)>-1) ? true : false;
		var info = '';
		info += '<div id="copertinaPurchase" style="background-image:url(sets/'+product.folder+'/img/copertina.png);"></div>';
		var button = '...';
		if(loaded){
			info += '<b id="titLicenze"><img src="sets/'+product.folder+'/img/logoMenuN.png"> '+product.title+'</b><br/>' +
					product.description+'<br/>' +
					price+'<br/>';
		}
		var button = '';
		if(canPurchase){
			button = '';
			if(visRet)button += '<div class="ann" onCLick="PURCHASES.productList();">'+TXT("Annulla")+'</div> ';
			button += '<div class="btn" onclick="PURCHASES.purchaseLicense()">'+TXT("CompraOra")+'</div>';
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
		var el = null;
		for(let id in PURCHASES.product_list){
			if(PURCHASES.product_list[id].idStore == idStore)el = PURCHASES.product_list[id];
		}
		return el;
	},
	makeProductList: function( product ){
		if(!PURCHASES.list_view)return;
		var el = PURCHASES.getProdById(product.id);
		el.title = product.title;
		el.price = product.price;
		el.owned = product.owned;
		PURCHASES.productList();
	},
	productList: function(){
		PURCHASES.list_view = true;
		var html =  '<div id="descrLicenze">' +
					TXT("DescrPurchase") +
					'</div><div><img src="img/storesSystems.png"></div><div id="prList">';
	    var html_ok = '';
	    var html_no = '';
		for(let id in PURCHASES.product_list){
			if(PURCHASES.product_list[id].title && PURCHASES.product_list[id].title!='undefined'){
				var html_provv = '';
				var idStore = PURCHASES.product_list[id].idStore;
				var title = PURCHASES.product_list[id].title;
				var price = PURCHASES.product_list[id].price;
				var folder = PURCHASES.product_list[id].folder;
				var owned = PURCHASES.product_list[id].owned;
				if(!owned && LOGIN.logedin()!='')owned = (DB.login.data.auths.indexOf(folder)>-1) ? true : false;
				html_provv += '<div';
				if(!owned)html_provv += ' class="acqOk" onClick="PURCHASES.showProduct(\''+idStore+'\');"';
				html_provv += '><div class="tit">';
				html_provv += '<img src="sets/'+folder+'/img/logoNero.png">';
				html_provv += title + '</div><div class="price">';
				if(!owned)html_provv += price;
				html_provv += '</div>';
				if(owned)html_provv += '<span>'+TXT("Acquistato")+'</span>';
				else html_provv += '<div class="btn buy">'+TXT("ACQUISTA")+'</div>';
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
	}
	
}