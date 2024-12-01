var PURCHASES  = {
	
	productId: '',
	product_list: [],
	list_view: true,
	initiated: false,
	orderState: '',
    idBuying: '',
	convenzione: '',
	abbs_owned: [],
	transaction: '',
	firstMonth: '1€',
	cycles: 1,
	
	init: function(){ // inizializza il catalogo
		PURCHASES.verAbbs();
		PURCHASES.product_list = [];
		for(let s in sets){
			if(sets[s].abbs && !sets[s].locked){
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
						idPc: abb.idPc,
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
			store.update();
			store.when('app.iaomai.app')
				.approved(transaction => {
					transaction.finish();
				});
			store.error(function(error) {
				//console.log('ERROR ' + error.code + ': ' + error.message);
				PURCHASES.idBuying = '';
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
				.approved(transaction => PURCHASES.verifyTransaction(transaction))
				.verified(receipt => PURCHASES.finishPurchase(receipt));
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
			PURCHASES.transaction = '';
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
				idP = (PURCHASES.convenzione) ? PURCHASES.convenzione.idPartner : '0',
				pr1 = (PURCHASES.abbs_owned.indexOf(PURCHASES.getProdById(PURCHASES.productId).folder)==-1/* && type=='m'*/) ? PURCHASES.firstMonth : '',
				idPc = PURCHASES.getIdPc(id);
			CONN.openUrl(convLangPath(CONN.urlStore)+"in_app_purchase_subs?idPc="+idPc+"&tk="+tk+"&mp="+fl+"&type="+type+"&idP="+idP+"&pr1="+pr1+"&lang="+LINGUE.getSigla2());
			PURCHASES.verAbbs();
			PURCHASES.abbsList();
		}
	},
	verifyTransaction: function(transaction){
		if (!transaction) {
			return Promise.reject(new Error('Transazione non valida.'));
		}
		if(transaction.state=='finished')return;
		if(!transaction.products[0].id)return;
		PURCHASES.transaction = transaction;
		return transaction.verify();
	},
	finishPurchase: finishPurchase = function(receipt){
		let p = PURCHASES.transaction;
		try {
			receipt.finish();
		} catch (err) {
			PURCHASES.idBuying = '';
			return;
		}
		if(!PURCHASES.idBuying)return;
		if(p.products[0].id == PURCHASES.idBuying){
			
			let pr = PURCHASES.getProdById(p.products[0].id),
				priceFT = '',
				price = store.get(p.products[0].id).offers[0].pricingPhases[store.get(p.products[0].id).offers[0].pricingPhases.length-1].price,
				idP = '';
			if(store.get(p.products[0].id).offers[0].pricingPhases.length>1){
				priceFT = store.get(p.products[0].id).offers[0].pricingPhases[0].price;
			}
			let idPc = PURCHASES.getIdPc(PURCHASES.idBuying);
			PURCHASES.idBuying = '';
			if(p.transactionId != receipt.sourceReceipt.transactions[android?0:receipt.sourceReceipt.transactions.length-1].transactionId)return;

			let purchaseToken = '',
				transactionId = '';
			if(android){
				purchaseToken= p.nativePurchase.purchaseToken
				transactionId = p.transactionId;
			}else{
				purchaseToken = receipt.sourceReceipt.transactions[receipt.sourceReceipt.transactions.length-1].originalTransactionId;
				transactionId = receipt.sourceReceipt.transactions[receipt.sourceReceipt.transactions.length-1].transactionId;
			}
			if(PURCHASES.convenzione)idP = PURCHASES.convenzione.idPartner;
			
			CONN.caricaUrl(	"purchases_activate_from_stores.php",
							"idPc="+idPc+"&folder="+pr.folder+"&price="+price+"&priceFT="+priceFT+"&idP="+idP+"&siglaLingua="+globals.siglaLingua+"&transactionId="+encodeURIComponent(btoa(transactionId))+"&purchaseToken="+encodeURIComponent(btoa(purchaseToken))+"&productId="+p.products[0].id,
							"PURCHASES.ret_activate");
		}
	},
	ret_activate: function( txt ){
		if(txt=='404'){
			ALERT("An error has occurred");
		}else{
			DB.login.data.auths.push(txt);
			//PURCHASES.productList();
			PURCHASES.verAbbs();
			PURCHASES.abbsList();
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
			priceFT = '',
			cycles = 0,
			title = '',
			typeAbb = TXT("sub_"+type);
		if(!price)TXT("AccediAlloStore");
		if(window.store){
			//price = product.offers[0].pricingPhases[0].price;
			price = product.offers[0].pricingPhases[product.offers[0].pricingPhases.length-1].price;
			if(product.offers[0].pricingPhases.length>1){
				priceFT = product.offers[0].pricingPhases[0].price;
				cycles = product.offers[0].pricingPhases[0].billingCycles;
			}
			if(product.state == 'requested' || product.state == 'initiated')visRet = false;
			loaded = product.loaded;
			canPurchase = product.canPurchase;
			if(!owned)owned = product.owned;
			if(product.state == 'requested' || product.state == 'initiated')loadingPurchase = true;
			if(product.price)price = product.price;
			folder = PURCHASES.getProdById(product.id).folder;
			title = PURCHASES.getProdById(product.id).title;
		}else{
			for(let m in product.abbs){
				if(product.abbs[m].type == type)price = product.abbs[m].price;
			}
			folder = product.folder;
			if(/*type=='m' && */PURCHASES.firstMonth){
				priceFT = PURCHASES.firstMonth;
				cycles = PURCHASES.cycles;
			}
			title = product.title;
		}
		
		if(!owned)owned = (DB.login.data.auths.indexOf(folder)>-1) ? true : false;
		let info = '<div id="copertinaPurchase" style="background-image:url(img/sf_copertine.png),url(sets/'+folder+'/img/copertina.png);"></div>' +
					'<b id="titLicenze"><img src="sets/'+folder+'/img/logoMenu.png"> '+title+'</b><br/>' +
					typeAbb+'<br/>' +
						price+'<br/>';
		let button = '';
		if(canPurchase){
			button = '';
			if(/* type=='m' &&  */PURCHASES.abbs_owned.indexOf(folder)==-1 && priceFT){
				let txtMesi = TXT("PrimoMese1Euro").replace("[price]",priceFT);
				if(cycles>1)txtMesi = TXT("PrimiXMesiXEuro").replace("[price]",priceFT).replace("[n]",cycles);
				button += '<div class="promoEuro inDett"><b>'+txtMesi+'*</b><br>(*) '+TXT("NotePrimoMese1Euro").replace("[mappa]",product.title)+'</div>';
			}
			if(visRet)button += '<div class="ann" onClick="PURCHASES.abbsList();">'+TXT("Annulla")+'</div> ';
			button += '<div class="btn" onClick="PURCHASES.purchaseLicense(\''+PURCHASES.productId+'\',\''+type+'\')">'+TXT("AbbonatiOra")+'</div>';
		}else if(owned){
			button = '<div>'+TXT("Abbonato")+'</div>';
		}else if(loadingPurchase){
			button = '<div><img src="img/loading_newB.gif" id="imgLoadingPurchase" style="width:25px;">'+stripslashes(TXT("CaricamentoAcquisto"))+'...</div>';
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
	getIdPc: function( idStore ){ // ottiene un prodotto tramite ID
		let idPc = null;
		for(let id in PURCHASES.product_list){
			for(let m in PURCHASES.product_list[id].abbs){
				if(PURCHASES.product_list[id].abbs[m].idStore == idStore)idPc = PURCHASES.product_list[id].abbs[m].idPc;
			}
		}
		return idPc ;
	},
	makeProductList: function( product ){ // crea la lista prodotti (solo per Cordova)
		if(!PURCHASES.list_view)return;
		let el = PURCHASES.getProdById(product.id);
		//el.title = product.title;
		el.price = product.pricing?.price;
		el.owned = product.owned;
		PURCHASES.abbsList();
	},
	productList: function( id ){ // elenca i prodotti
		PURCHASES.list_view = true;
		let folder = PURCHASES.product_list[id].folder,
			ast = false,
			html =  '<div class="torna" onClick="PURCHASES.abbsList();">'+TXT("TornaProdotti")+'</div>' +
					'<div id="copertinaPurchase" style="background-image:url(img/sf_copertine.png),url(sets/'+folder+'/img/copertina.png);"></div>' +
					'<b id="titLicenze"><img src="sets/'+folder+'/img/logoMenu.png"> '+PURCHASES.product_list[id].title+'</b><br/>';
						
		for(let m in PURCHASES.product_list[id].abbs){
			let html_provv = '',
				idStore = PURCHASES.product_list[id].abbs[m].idStore,
				type = PURCHASES.product_list[id].abbs[m].type,
				price = PURCHASES.product_list[id].abbs[m].price,
				priceFT = '',
				cycles = 0,
				pass = true,
				corsoInConv = (PURCHASES.convenzione) ? PURCHASES.convenzione.folders.indexOf(folder)>-1 : false;
			
			if( (PURCHASES.convenzione && type=="a") || (!PURCHASES.convenzione && type=="ac") )pass = false;
			if(!corsoInConv){
				if(type=="a")pass = true;
				if(type=="ac")pass = false;
			}
			
			if(	PURCHASES.product_list[id].title && PURCHASES.product_list[id].title!='undefined' && pass ){
				let priceFT = '',
					cycles = '';
				if(window.store){
					let p = store.get(idStore);
					//price = p.offers[0].pricingPhases[0].price;
					price = p.offers[0].pricingPhases[p.offers[0].pricingPhases.length-1].price;
					priceFT = '';
					cycles = 0;
					if(p.offers[0].pricingPhases.length>1){
						priceFT = p.offers[0].pricingPhases[0].price;
						cycles =  p.offers[0].pricingPhases[0].billingCycles;
					}
					
				}else if(/*type=='m' && */PURCHASES.firstMonth){
					priceFT = PURCHASES.firstMonth;
					cycles = PURCHASES.cycles;
				}
				html_provv += 	'<div class="acqOk'+((type=='ac')?' acq_conv':'')+'" style="margin-top:15px;"><div class="tit">' +
								'</div>' +
								(type=='ac' ? '<div id="label_prezzo_conv">'+TXT("PrezzoInConvenzione")+'</div>' : '') +
								'<div class="btn buy" onClick="PURCHASES.showProduct(\''+idStore+'\',\''+type+'\');">'+TXT("sub_"+type.substr(0,1))+': <b>'+price+' / '+TXT("add_"+type.substr(0,1))+'</b></div>' +
								'</div>';
				if(/* type=='m' &&  */PURCHASES.abbs_owned.indexOf(folder)==-1 && priceFT){
					let txtMesi = TXT("PrimoMese1Euro").replace("[price]",priceFT);
					html_provv += '<div class="promoEuro"><b>'+txtMesi+'*</b></div>';
					ast = true;
				}
				html_provv += 	'<span class="sep"></span>';
				html += html_provv;
			}
		}
		if(ast)html += '<div>(*) '+TXT("NotePrimoMese1Euro").replace("[mappa]",PURCHASES.product_list[id].title)+'</div>';
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
			let obj=JSON.parse( txt ),
				prices = obj.prices;
			PURCHASES.firstMonth = obj.firstMonth ? obj.firstMonth +getValuta() : '';
			PURCHASES.cycles = obj.cycles;
			for(let p in prices){
				if(p.indexOf(' a')>-1){
					prices[p.replace(" a"," ac")] = (prices[p]*.8).toFixed(2);
				}
			}
			for(let p in PURCHASES.product_list){
				for(let e in prices){
					if(	PURCHASES.product_list[p].folder == e.split(" ")[0] ){
						for(let m in PURCHASES.product_list[p].abbs){
							if(e.split(" ")[1] == PURCHASES.product_list[p].abbs[m].type)PURCHASES.product_list[p].abbs[m].price = prices[e]+getValuta();
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
	},
	verAbbs: function(){
		CONN.caricaUrl(	"purchases_verAbbs.php",
			"",
			"PURCHASES.ret_verAbbs");
	},
	ret_verAbbs: function( txt ){
		if(txt!='404'){
			let json = JSON.parse(txt);
			PURCHASES.abbs_owned = json;
		}
	},
	
}

