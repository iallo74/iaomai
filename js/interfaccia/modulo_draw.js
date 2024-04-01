var DW = {
	lineWidth:0,
	isMousedown: false,
	points: [],
	firstPointMultiplier: 0,
	startWidth: 1,
	endWidth: 2,
	drawColor: '#000',
	drawStyle: 'linear', // o smoth
	isPencil: false,
	strokeHistory: [],
	canvas: null,
	context: null,
	initialied: false,
	xCanvas: 0,
	yCanvas: 0,
	destImg: null,

	_init: function( image ){ // inizializza il canvas del disegno
		if(!this.initialized){
			this.canvas = document.getElementById("img_CV");
			for(const ev of ["touchstart", "mousedown"]) {
				this.canvas.addEventListener(ev, function (e) {
					DW.drawStart(e);
				});
			}
			for(const ev of ['touchmove', 'mousemove']) {
				this.canvas.addEventListener(ev, function (e) {
					DW.drawMove(e);
				});
			}
			for(const ev of ['touchend', 'touchleave', 'mouseup']) {
				this.canvas.addEventListener(ev, function (e) {
					DW.drawEnd();
				});
			}
			window.addEventListener("resize", function(){
				DW.xCanvas = tCoord(DW.canvas);
				DW.yCanvas = tCoord(DW.canvas,'y');
			});
			this.detectProperties();
			this.initialized = true;
		}
		document.querySelector(".cont_canvasImmagine").classList.add("canvas_big");
		//let ctx = this.canvas.getContext('2d');
		this.context = this.canvas.getContext('2d');
		this.canvas.width = this.canvas.scrollWidth;
		this.canvas.height = this.canvas.scrollHeight;
		this.context.drawImage(PH.img, 0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
		this.xCanvas = tCoord(this.canvas);
		this.yCanvas = tCoord(this.canvas,'y');
		this.destImg=new Image();
		this.destImg.src = PH.img.src;
		this.strokeHistory = [];
	},
	drawStart: function( e ){ // touch, mouse o pencil down
		let pressure = 0.1;
		let x, y;
		if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
			if (e.touches[0]["force"] > 0) {
				pressure = e.touches[0]["force"];
			}
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;
			if(e.touches[0]["force"] !== "undefined")this.isPencil = true;
		}else{
			if(this.isPencil)return;
			pressure = 1.0
			x = e.pageX;
			y = e.pageY;

		}
		x -= this.xCanvas;
		y -= this.yCanvas;
		if(this.drawStyle == 'linear')pressure = 1.0;
		this.isMousedown = true;
		this.lineWidth = Math.log(pressure + this.firstPointMultiplier) * this.startWidth;
		this.context.lineWidth = this.lineWidth; // pressure * 50;
		let drawColor = this.drawColor;
		let lineWidth = this.lineWidth;
		this.points.push({ x, y, lineWidth, drawColor });
		this.drawOnCanvas(this.points);
	},
	drawMove: function( e ){ // touch, mouse o pencil move
		if(!this.isMousedown) return;
		e.preventDefault();
		let pressure = 0.1;
		let x, y;
		if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
			if (e.touches[0]["force"] > 0) {
				pressure = e.touches[0]["force"]*3;
			}
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;
		}else{
			if(this.isPencil)return;
			pressure = 1.0;
			x = e.pageX;
			y = e.pageY;
		}
		x -= this.xCanvas;
		y -= this.yCanvas;
		if(this.drawStyle == 'linear')pressure = 1.0;
		// smoothen line width
		if(this.drawStyle == 'linear')this.lineWidth = (Math.log(pressure + 1) * this.endWidth);
		else this.lineWidth = (Math.log(pressure + 1) * this.endWidth * 0.2 + this.lineWidth * 0.8)
		let drawColor = this.drawColor;
		let lineWidth = this.lineWidth;
		this.points.push({ x, y, lineWidth, drawColor });
		this.drawOnCanvas(this.points);
	},
	drawEnd: function(){ // touch, mouse o pencil up
		this.isMousedown = false;
		this.strokeHistory.push([...this.points]);
		this.points = [];
		this.lineWidth = 0;
		this.destImg.src = this.canvas.toDataURL('image/jpeg', 1);
		document.getElementById("img_draw_undo").classList.add("active");
	},
	drawOnCanvas: function( stroke ){ // disegna
		this.context.strokeStyle = 'black';
		this.context.lineCap = 'round';
		this.context.lineJoin = 'round';
		this.context.strokeStyle = this.drawColor;
		const l = stroke.length - 1;
		const point = stroke[l];
		if(point.drawColor)this.context.strokeStyle = point.drawColor;
		if(stroke.length >= 3) {
			const xc = (stroke[l].x + stroke[l - 1].x) / 2;
			const yc = (stroke[l].y + stroke[l - 1].y) / 2;
			this.context.lineWidth = stroke[l - 1].lineWidth;
			this.context.quadraticCurveTo(stroke[l - 1].x, stroke[l - 1].y, xc, yc);
			this.context.stroke();
			this.context.beginPath();
			this.context.moveTo(xc, yc);
		}else{
			this.context.lineWidth = point.lineWidth;
			this.context.beginPath();
			this.context.moveTo(point.x, point.y);
			this.context.stroke();
		}
	},
	undoDraw: function(){ // annulla l'ultimo segno
		this.strokeHistory.pop();
		// this.context.clearRect(0, 0, canvas.width, canvas.height) // per svuotare con il bianco
		this.context.drawImage(PH.img, 0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
		this.strokeHistory.map(function(stroke) {
			if(DW.strokeHistory.length === 0)return;
			DW.context.beginPath();
			let strokePath = [];
			stroke.map(function(point){
				strokePath.push(point),
				DW.drawOnCanvas(strokePath);
			});
		});
		document.getElementById("img_draw_undo").classList.toggle("active",DW.strokeHistory.length);
		this.destImg.src = this.canvas.toDataURL('image/jpeg', 1);
	},
	clearDraw: function(){ // cancella il disegno e ripristina lo screenshot
		this.strokeHistory.pop();
		this.points = [];
		this.context.clearRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
	},
	showDrawDims: function(){ // visualizza le dimensioni disponibili
		document.getElementById("img_draw_dims").classList.toggle("opened");
	},
	showDrawCols: function(){ //visualizza la tavolozza
		document.getElementById("img_draw_cols").classList.toggle("opened");
	},
	setDrawWidth: function( el ){ // setta la dimensione
		this.endWidth = +el.dataset.value;
		this.drawStyle = 'linear';
		this.detectProperties();
	},
	setDrawColor: function( el ){ // setta il colore
		this.drawColor = el.dataset.value;
		this.detectProperties();
	},
	setDrawStyle: function( el ){ // setta lo stile (linear o smoth)
		this.drawStyle = el.dataset.value;
		this.endWidth = 12;
		this.detectProperties();
	},
	detectProperties: function(){ // legge le proprietà del disegno
		let els;
		els = document.getElementById("img_draw_tools").getElementsByTagName("span");
		for(let e=0;e<els.length;e++){
			if(els[e].dataset.value){
				els[e].classList.remove("elSel");
			}
		}
		els = document.getElementById("img_draw_dims").getElementsByTagName("span");
		for(let e=0;e<els.length;e++){
			if(els[e].dataset.value){
				if(els[e].dataset.value!='smoth'){
					els[e].classList.toggle("elSel",this.endWidth==+els[e].dataset.value && this.drawStyle!='smoth');
				}else{
					els[e].classList.toggle("elSel",this.drawStyle=='smoth');
				}
			}
		}
		els = document.getElementById("img_draw_cols").getElementsByTagName("span");
		for(let e=0;e<els.length;e++){
			if(els[e].dataset.value){
				els[e].classList.toggle("elSel",this.drawColor==els[e].dataset.value);
			}
		}
	}
	

}