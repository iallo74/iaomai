

THREE.ObjectControls = function ( object, domElement ) {

	this.object = object;

	//this.domElement = ( domElement !== undefined ) ? domElement : document;
	this.domElement = document;
	if(touchable)this.domElement = domElement;

	// "target" sets the location of focus, where the object orbits around
	this.target = new THREE.Vector3();

	// ROTAZIONE PERSONALIZZATA MESH
	this.mouseButtons = { LEFT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.RIGHT };
	this.ROTATE=false;
	this.PAN=false;
	this.ZOOM=false;
	this.xIni=-1;
	this.yIni=-1;
	this.xEnd=-1;
	this.yEnd=-1;
	this.sIni=-1;
	this.xAtt=-1;
	this.yAtt=-1;
	this._xIni=-1;
	this._yIni=-1;
	this._zIni=-1;
	this._sIni=-1;
	this.minZoom=0;
	this.maxZoom=20;
	this.panLimits={ 
		x:[-1.76,1.76],
		y:[-3,4.26]
	};
	this._ZPR=false;
	this._MM=true;
	this._premuto=false;
	this._inMovimento=false;
	var scope = this;
	
	// MOUSE
	function onMouseDown2( event ) {
		if(noAnimate)return;
		if(!overInterfaccia){
			//try{SET.desIntersected();}catch(err){console.log(err)}
			event.preventDefault();
			MODELLO.nasContextMenu();
			scope._ZPR=false;
			scope._premuto=true;
			nasToolTip();
			this.xIni=event.clientX;
			this.yIni=event.clientY;
			scope.domElement.focus ? scope.domElement.focus() : window.focus();
			if( event.button ==  scope.mouseButtons.LEFT){
				if ( event.ctrlKey || event.metaKey || event.shiftKey )return;
				else{
					this.ROTATE=true;
					this._xIni=object.rotation._x;
					this._yIni=object.rotation._y;
				}
			}
			if( event.button ==  scope.mouseButtons.RIGHT){
				if ( event.ctrlKey || event.metaKey || event.shiftKey )return;
				else{
					this.PAN=true;
					this._xIni=object.position.x;
					this._yIni=object.position.y;
					this._zIni=object.position.z;
				}
			}
		}
	}
	
	this.touchInterval = null;
	function startInteractionTimer(){
		scope._MM=true;
		clearInterval(scope.touchInterval);
		scope.touchInterval = setInterval(function(){
			scope._MM=false;
			console.log("_MM=false");
		}, 6000);
	}
	function onMouseMove2( event ) {
		//if(!overInterfaccia){
			//event.preventDefault();
		if(noAnimate)return;
		
		if(this.ROTATE || this.PAN){
			try{SET.desIntersected();}catch(err){}
			startInteractionTimer();
			
			if(this.ROTATE){
				MENU.attBtnCentro();
				scope._ZPR=true;
				scope._inMovimento=true;
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
				var deltaX = this.xIni - event.clientX ;
				var deltaY = this.yIni - event.clientY ;
				var left = 0-(2 * Math.PI * deltaX / element.clientWidth) ;
				var up =0-(1 * Math.PI * deltaY / element.clientHeight) ;
				var xTarget=this._xIni+up;
				var yTarget=this._yIni+left;
				rotateEnd = { x: xTarget, y: yTarget, z: 0 };
				MODELLO.INTERSECTED=null;
				try{ SET.INTERSECTED=null; }catch(err){}
				nasToolTip();
				renderer.domElement.style.cursor='default';
			}
			if(this.PAN){
				MENU.attBtnCentro();
				scope._ZPR=true;
				scope._inMovimento=true;
				var r = 1.3;
				
				// riduttore in base alla vicinanza
				var a = ( scope.object.position.x * (22-this._zIni) ) / 22;
				if(a)r = (a*r) / scope.object.position.x;
				// --------------------------------
				
				var deltaX = ((this.xIni - event.clientX) / 100) * r;
				var deltaY = ((this.yIni - event.clientY) / 100) * r ;
				
				var xTarget = this._xIni-deltaX;
				var yTarget = this._yIni+deltaY;
				
				var x0 = scope.panLimits.x[0]-manichino.position.x/2;
				var x1 = scope.panLimits.x[1]-manichino.position.x/2;
				var y0 = scope.panLimits.y[0]-manichino.position.y/2;
				var y1 = scope.panLimits.y[1]-manichino.position.y/2;
				
				if(xTarget<x0)xTarget=x0;
				if(xTarget>x1)xTarget=x1;
				if(yTarget<y0)yTarget=y0;
				if(yTarget>y1)yTarget=y1;
				
				panEnd = { x: xTarget, y: yTarget, z: this._zIni };
				MODELLO.INTERSECTED=null;
				try{ SET.INTERSECTED=null; }catch(err){}
				nasToolTip();
				renderer.domElement.style.cursor='default';
			}
		}
		//}
	}
	function onMouseUp2( event ) {
		if(noAnimate)return;
		//if(!smothingView)scope._MM = false;
		clearInterval(scope.touchInterval);
		scope.touchInterval = null;
		setTimeout(function(){scope._MM = true;},100);
		this.xEnd = event.clientX;
		this.yEnd = event.clientY;
		
		scope._premuto=false;
		if(!scope.domElement._inMovimento)scope._ZPR=false;
		if(scope.domElement.ROTATE)scope.domElement.ROTATE=false;	
		if(scope.domElement.PAN)scope.domElement.PAN=false;
		saveRotationPosition();
	}
	function onMouseWheel( event ) {
		if ( this.PAN || this.ROTATE || overInterfaccia || noAnimate)return;
		//event.preventDefault();
		event.stopPropagation();
		if(!touchable){
			//scope._ZPR=true;
			scope._inMovimento=true;
		}
		nasToolTip();
		if ( event.deltaY < 0 ) {
			zoom( 1 );
		} else {
			zoom( -1 );
		}
		MENU.attBtnCentro();
		MODELLO.nasContextMenu();
	}
	function zoom( incr ) {
		if(noAnimate)return;
		var scaleAtt=manichinoCont.position.z;
		var step=2 - ( scaleAtt / ( scope.maxZoom - scope.minZoom ) ) * 1.9;
		scaleAtt+=incr*step
		if(scaleAtt<scope.minZoom)scaleAtt=scope.minZoom;
		if(scaleAtt>scope.maxZoom)scaleAtt=scope.maxZoom;
		
		var diff = scaleAtt-manichinoCont.position.z;
		var preX = manichinoCont.position.x;
		var preY = manichinoCont.position.y;
		var preZ = manichinoCont.position.z;
		var newZ = preZ + diff;
		localStorage.modelZoom = newZ;
		manichinoCont.position.set( preX , preY ,newZ );
		zoomEnd = null;
		zoomStart = null;
		clearInterval(scope.touchInterval);
		scope.touchInterval = null;
		setTimeout(function(){scope._MM = true;},100);
		//zoomEnd = scaleAtt;
	}
	function onContextMenu( event ) {
		event.preventDefault();
		return;
	}
	scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );
	scope.domElement.addEventListener( 'mousedown', onMouseDown2, false );
	scope.domElement.addEventListener( 'mouseup', onMouseUp2, false );
	scope.domElement.addEventListener( 'mousemove', onMouseMove2, false );
	//scope.domElement.addEventListener( 'wheel', onMouseWheel, false );
	scope.domElement.addEventListener( 'wheel', (e) => {
          if(e.ctrlKey){
			  e.preventDefault();
		  }else{
			  onMouseWheel( e );
		  }
        }, {
            "passive": false
        });


		
	// TOUCH
	function handleTouchStartRotate( event ) {
		if(noAnimate)return;
		this.xIni=event.touches[ 0 ].pageX;
		this.yIni=event.touches[ 0 ].pageY;
		this.xAtt=event.touches[ 0 ].pageX;
		this.yAtt=event.touches[ 0 ].pageY;
		this._xIni=object.rotation._x;
		this._yIni=object.rotation._y;
	}
	function handleTouchStartDollyPan( event ) {
		if(noAnimate)return;
		this.xIni = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
		this.yIni = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );
		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
		this.sIni=Math.sqrt( dx * dx + dy * dy );
		this._xIni=object.position.x;
		this._yIni=object.position.y;
		this._zIni=object.position.z;
	}
	function handleTouchMoveRotate( event ) {
		if(noAnimate)return;
		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
		this.xAtt=event.touches[ 0 ].pageX;
		this.yAtt=event.touches[ 0 ].pageY;
		var deltaX = this.xIni - this.xAtt ;
		var deltaY = this.yIni - this.yAtt ;
		//if(Math.abs(deltaX) > 10 && Math.abs(deltaY) > 10){
		if(Math.abs(deltaX) > 1 && Math.abs(deltaY) > 1){
			var left = 0-(2 * Math.PI * deltaX / element.clientWidth) ;
			var up =0-(1 * Math.PI * deltaY / element.clientHeight) ;
			var xTarget=this._xIni+up;
			var yTarget=this._yIni+left;
			rotateEnd = { x: xTarget, y: yTarget, z: 0 };
			/*mouse.x=this.xAtt;
			mouse.y=this.yAtt;*/
			
		const rect = renderer.domElement.getBoundingClientRect();
		mouse.x = ( ( event.targetTouches [0].pageX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
		mouse.y = - ( ( event.targetTouches [0].pageY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
			//mouse.x = + (event.targetTouches [0] .pageX / window.innerWidth) * 2 + -1;
			//mouse.y = - (event.targetTouches [0] .pageY / window.innerHeight) * 2 + 1;	
			
			MODELLO.INTERSECTED=null;
			try{ SET.INTERSECTED=null; }catch(err){}
			nasToolTip();
			renderer.domElement.style.cursor='default';
		}
	}
	function handleTouchMoveDollyPan( event ) {
		if(noAnimate)return;
		var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
		var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );
			var r = 0.4;
			
			// riduttore in base alla vicinanza
			var a = ( scope.object.position.x * (22-this._zIni) ) / 22;
			if(a)r = (a*r) / scope.object.position.x;
			// --------------------------------
		var deltaX = ((this.xIni - x) /50) *r ;
		var deltaY = ((this.yIni - y) /50) *r ;
		//if(Math.abs(deltaX) > 10 && Math.abs(deltaY) > 10){
			var dist = Math.sqrt(this.xIni - x)*(this.yIni - y) ;
			
			
			var xTarget = this._xIni-deltaX;
			var yTarget = this._yIni+deltaY;
			if(xTarget<scope.panLimits.x[0])xTarget=scope.panLimits.x[0];
			if(xTarget>scope.panLimits.x[1])xTarget=scope.panLimits.x[1];
			if(yTarget<scope.panLimits.y[0])yTarget=scope.panLimits.y[0];
			if(yTarget>scope.panLimits.y[1])yTarget=scope.panLimits.y[1];
				
			panEnd = { x: xTarget, y: yTarget, z: this._zIni };
			
			if(typeof(dist)!='NaN'){ // con TOUCH o pan o zoom
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				var distance = Math.sqrt( dx * dx + dy * dy );
				var nDist=(this.sIni-distance)/22;
				var scaleAtt=this._zIni-nDist;
				if(scaleAtt<scope.minZoom)scaleAtt=scope.minZoom;
				if(scaleAtt>scope.maxZoom)scaleAtt=scope.maxZoom;
				zoomEnd=scaleAtt;
			}
			MODELLO.INTERSECTED=null;
			try{ if(Math.abs(deltaX) > 10 && Math.abs(deltaY) > 10)SET.INTERSECTED=null; }catch(err){}
			nasToolTip();
			renderer.domElement.style.cursor='default';
		//}
	}
	function handleTouchEnd( event ) {
		if(noAnimate)return;
		event.preventDefault();
		if( Math.abs(this.xAtt-this.xIni) < 10 && Math.abs(this.yAtt-this.yIni) < 10 ){
			onClick();
		}
		saveRotationPosition();
	}
	function onTouchStart( event ) {
		if(noAnimate)return;
		event.preventDefault();
		//if(overInterfaccia)return;
		MENU.attBtnCentro();
		MODELLO.nasContextMenu();
		MENU.chiudiMenu();
		switch ( event.touches.length ) {
			case 1:	// one-fingered touch: rotate
				handleTouchStartRotate( event );
				this.ROTATE=true;
				
		const rect = renderer.domElement.getBoundingClientRect();
		mouse.x = ( ( event.targetTouches[0].pageX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
		mouse.y = - ( ( event.targetTouches[0].pageY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
				//mouse.x = + (event.targetTouches [0] .pageX / window.innerWidth) * 2 + -1;
				//mouse.y = - (event.targetTouches [0] .pageY / window.innerHeight) * 2 + 1;
				//console.log(mouse)
				
				//console.log(mouse)
				try{SET._render();}catch(err){CONSOLE._log(err)}
				
				break;
			case 2:	// two-fingered touch: pan & dolly
				handleTouchStartDollyPan( event );
				this.PAN=true;
				break;
			default:
				this.ROTATE=false;
				this.PAN=false;
		}
	}
	function onTouchMove( event ) {
		if(noAnimate)return;
		event.preventDefault();
		event.stopPropagation();
		MENU.attBtnCentro();
		switch ( event.touches.length ) {
			case 1: // one-fingered touch: rotate
				if (!this.ROTATE ) return;
				handleTouchMoveRotate( event );
				break;
			case 2: // two-fingered touch: pan & dolly
				if (!this.PAN ) return;
				handleTouchMoveDollyPan( event );
				break;
			default:
				this.ROTATE=false;
				this.PAN=false;
		}
	}
	function onTouchEnd( event ) {
		if(noAnimate)return;
		handleTouchEnd( event );
		this.ROTATE=false;
		this.PAN=false;
	}
	scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
	scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
	scope.domElement.addEventListener( 'touchmove', onTouchMove, false );	


};

THREE.ObjectControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.ObjectControls.prototype.constructor = THREE.ObjectControls;
Object.defineProperties( THREE.ObjectControls.prototype, {
	
});