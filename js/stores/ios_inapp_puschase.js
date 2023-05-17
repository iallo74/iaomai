document.addEventListener('deviceready', initStore);

function initStore() {
	
	// controlla che il plugin sia caricato
    if (!window.store) { 
        console.log('Store not available');
        return;
    }

    store.register({ //  registra il prodotto
        id:    'TM22',
        type:   store.NON_CONSUMABLE
    });

    store.error(function(error) { // impostiamo il gestore degli errori
        console.log('ERROR ' + error.code + ': ' + error.message);
    });
    
	// gestisco gli stati
	store.when('TM22').updated( refreshProductUI ); // aggiorna lo stato canPurchase del prodotto	
	store.when('TM22').approved( function(p) {
		p.verify();
	});
	store.when('TM22').verified(finishPurchase);
	
    store.refresh(); // eseguiamo il REFRESH iniziale
}
	
/*

 N.B. creare un DIV con id TM22-purchase

*/
	
function refreshProductUI(product){
	var info = product.loaded // controlla se il prodotto è stato caricato
		? 'title: '+product.title+'<br/>' +
		  'desc: '+product.description+'<br/>' +
		  'price: '+product.price+'<br/>'
		: 'Retrieving info...';
	var button = product.canPurchase // aggiunge il pulsante BUY NOW
		 ? '<button onclick="purchase('+product.id+')">Buy Now!</button>'
		 : '';
	var el = document.getElementById(product.id+'-purchase');
	el.htmlContent = info + button;
}


function purchase( id ) {
	// ESEGUE L'ACQUISTO
    store.order(id);
}

function finishPurchase( p ) {
	
	// GESTISCE LA CONCLUSIONE DELL'ACQUISTO
   /* window.localStorage.goldCoins += 10;
    refreshGoldCoinsUI();*/
	alert("Prodotto acquistato!");
    p.finish();
}
