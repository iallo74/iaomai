setTimeout(
    function(){
        if(DB.login.data.idUtente=='1'){
            if(!onlineVersion){
				
				/*
				
				NOTE
				- Mettere a "true" la produzione
				- Decommentare i css e i js
				- Per gli aggiornamenti remoti degli scripts utilizzare i nomi dei files
				- Inserire tutto in un modulo PURCHASE
				- Gestire la conferma di acquisto
				*/
				
				
				// da mettere in html
                var divPurchase = document.createElement('div');
                divPurchase.id = 'purchaseDiv';
                divPurchase.className = 'ini';
                document.body.appendChild(divPurchase);
				// ------------------
				
				// da togliere
				//sets.anatomy_full.idApple = 'AM22';
				sets.meridiani_cinesi.idApple = 'TM22';
				sets.meridiani_shiatsu.idApple = 'SM22';
				sets.auricologia.idApple = 'AU23';
				sets.clients_full.idApple = 'SP22';
				//sets.anatomy_full.idGoogle = 'am22';
				sets.meridiani_cinesi.idGoogle = 'tm22';
				sets.meridiani_shiatsu.idGoogle = 'sm22';
				sets.auricologia.idGoogle = 'au23';
				sets.clients_full.idGoogle = 'sp22';
				CONN.urlStore = 'https://www.iaomai.app/[lang]/iaomai/';
				DB.TXT.base.LicenzaIllimitata = {
					ita: "Licenza illimitata",
					eng: "Unlimited license",
					esp: "Licencia illimitada"
				}
				DB.TXT.base.LicenzeIllimitate = {
					ita: "Licenze illimitate",
					eng: "Unlimited licenses",
					esp: "Licencias illimitadas"
				}
				DB.TXT.base.DescrPurchase = {
					ita: "Acquista una licenza illimitata ad una mappa tematica, e avrai per sempre tutte le funzionalità a tua disposizione su tutti i tuoi dispositivi.",
					eng: "Buy an unlimited license to a thematic map, and you'll always have all the features at your disposal on all your devices.",
					esp: "Compra una licencia ilimitada a un mapa temático, y tendrás para siempre todas las funcionalidades a tu disposición en todos tus dispositivos."
				}
				DB.TXT.base.AlertNoLogPuchase = {
					ita: "Per poter acquistare una licenza devi essere loggato. Esegui il login o registrati gratuitamente.",
					eng: "You must be logged in to purchase a license. Login or register for free.",
					esp: "Para poder comprar una licencia debe iniciar sesión. Inicie sesión o regístrese de forma gratuita."
				}
				DB.TXT.base.AccediAlloStore = {
					ita: "Accedi allo store online",
					eng: "Access the online store",
					esp: "Accede a la tienda online"
				}
				DB.TXT.base.ListaMappe = {
					ita: "Lista prodotti",
					eng: "Products list",
					esp: "Lista de productos"
				}
				DB.TXT.base.CompraOra = {
					ita: "COMPRA ORA",
					eng: "BUY NOW",
					esp: "COMPRA AHORA"
				}
				DB.TXT.base.CaricamentoAcquisto = {
					ita: "Caricamento dell'acquisto",
					eng: "Loading of the purchase",
					esp: "Carga de la compra"
				}
				DB.TXT.base.Acquistato = {
					ita: "Acquistato",
					eng: "Bought",
					esp: "Adquirido"
				}
				// -----------
				
				// da spostare fuori
				for(s in sets){
					if((!android && sets[s].idApple) || (android && sets[s].idGoogle)){
						if(android)idStore = sets[s].idGoogle;
						else idStore = sets[s].idApple;
						product_list.push({
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
                initStore();//document.addEventListener('deviceready', initStore);
				// -----------------
            }
        }
    }, 2000
);
var productId = '';
var product_list = [];
var list_view = true;
var nProd = 0;
var idLoaded= [];
var log = '';
function initStore() {
	if(window.store){
		store.error(function(error) {
			console.log('ERROR ' + error.code + ': ' + error.message);
		});
		for(let id in product_list){
			store.register({
				id:    product_list[id].idStore,
				type:  store.NON_CONSUMABLE
			});
			store.when(product_list[id].idStore).loaded(makeProductList);
			store.when(product_list[id].idStore).updated(refreshProductUI);
			store.when(product_list[id].idStore).approved(function(p) {
				p.verify();
			});
			store.when(product_list[id].idStore).verified(finishPurchase);
		}
		store.refresh();
	}else{
		productList();
	}
}
function showProduct( id ){
    list_view = false;
    productId = id;
    var p;
	if(window.store)p = store.get(productId);
	else p = getProdById(productId);
    refreshProductUI(p);
}
function purchaseLicense() {
    if(window.store)store.order(productId);
	else{
		CONN.openUrl(CONN.urlStore.replace("[lang]",globals.siglaLingua.substr(0,2))+"overview_"+getProdById(productId).pageStore+".php");
	}
}
function finishPurchase(p) {
    p.finish();
	
	// GESTIRE LA CONFERMA
	
	
	
}
function refreshProductUI(product){
    if(list_view)return;
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
    var info = '<div class="ret_cont">';
	if(visRet)info += '<div class="retProds" onCLick="productList();">&laquo; '+TXT("ListaMappe")+'</div>';
	info += '</div>';
    var button = '...';
    if(loaded){
        info += '<b>'+product.title+'</b><br/>' +
                product.description+'<br/>' +
                price+'<br/>';
    }
    var button = '';
    if(canPurchase){
        button = '<div class="btn" onclick="purchaseLicense()">'+TXT("CompraOra")+'</div>';
    }else if(owned){
        button = '<div>'+TXT("Acquistato")+'</div>';
    }else if(loadingPurchase){
		button = '<div><img src="img/loadingWhite2.gif" id="imgLoadingPurchase">'+stripslashes(TXT("CaricamentoAcquisto"))+'...</div>';
	}
    var el = document.getElementById('purchaseDiv');
    el.classList.remove("ini");
    el.innerHTML = info + '<div class="btn_cont">' + button + '</div>';
}
function getProdById( idStore ){
    var el = null;
    for(let id in product_list){
        if(product_list[id].idStore == idStore)el = product_list[id];
    }
    return el;
}
function makeProductList(product){
    if(!list_view)return;
	var el = getProdById(product.id);
	el.title = product.title;
	el.price = product.price;
	el.owned = product.owned;
    productList();
}
function getFolderProduct( idStore ){
	for(let id in product_list){
		if(product_list[id].idStore==idStore)return product_list[id].folder;
	}
}
function productList(){
    list_view = true;
    var html =  '<div id="titLicenze">'+TXT("LicenzeIllimitate")+'</div><div id="descrLicenze">' +
				TXT("DescrPurchase") +
				'</div><div id="prList">';

    for(let id in product_list){
        if(product_list[id].title && product_list[id].title!='undefined'){
            var idStore = product_list[id].idStore;
            var title = product_list[id].title;
            var price = product_list[id].price;
            var folder = product_list[id].folder;
            var owned = product_list[id].owned;
	    	if(!owned && LOGIN.logedin()!='')owned = (DB.login.data.auths.indexOf(folder)>-1) ? true : false;
            html += '<div';
		    if(!owned)html += ' class="acqOk" onClick="showProduct(\''+idStore+'\');"';
		    html += '><div class="tit">';
		    html += '<img src="sets/'+folder+'/img/logoMenuN.png">';
		    html += title + '</div><div class="price">';
            if(!owned)html += price;
            html += '</div>';
            if(owned)html += '<span>'+TXT("Acquistato")+'</span>';
            html += '</div>';
        }
    }
    html += '</div>';
    var el = document.getElementById('purchaseDiv');
	el.classList.remove("ini");
    el.innerHTML = html;
}