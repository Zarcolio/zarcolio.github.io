$(function(){
  
	//var canvasObjs = [], lineStyle = 'grey', eyeStyle = 'white', irisStyle='rgb(128,40,40)', speed = 0.2;
	var canvasObjs = [], lineStyle = 'grey', eyeStyle = 'white', irisStyle='rgb(141, 207, 247)', speed = 0.2;

	function drawEye(canvasObj) {
		if(Math.abs(canvasObj.lcx - canvasObj.ncx) < 1 && Math.abs(canvasObj.lcy - canvasObj.ncy) < 1) return;
		var tcx = canvasObj.ncx * speed + canvasObj.lcx * (1 - speed),
			tcy = canvasObj.ncy * speed + canvasObj.lcy * (1 - speed)	,
			ctx = canvasObj.context;
		// draw large circle, fill to clear
		ctx.fillStyle = eyeStyle;
		ctx.strokeStyle = lineStyle;
		ctx.beginPath();
		ctx.arc(canvasObj.w/2, canvasObj.h/2, canvasObj.rBig, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.stroke();
		// draw iris
		ctx.fillStyle = irisStyle;
		ctx.beginPath();
		ctx.arc(tcx, tcy, canvasObj.rLittle, 0, Math.PI * 2, false);
		ctx.fill();
		
		canvasObj.lcx = tcx;
		canvasObj.lcy = tcy;
	}

	$('.canvasEye').each(function() {
		var canvasDom = this, canvasObj = {};
		canvasObj.w = canvasDom.width; 
		canvasObj.h = canvasDom.height;
		canvasObj.abs_cx = canvasObj.w/2 + canvasDom.offsetLeft;
		canvasObj.abs_cy = canvasObj.h/2 + canvasDom.offsetTop;
		
		canvasObj.rBig = Math.min(canvasObj.w, canvasObj.h) * 0.45;
		canvasObj.rLittle = Math.min(canvasObj.w, canvasObj.h) * 0.2;
		canvasObj.lcx = canvasObj.ncx = canvasObj.w/2; 
		canvasObj.lcy = canvasObj.h/2;
		canvasObj.ncy = canvasObj.h/2 + (canvasObj.rBig - canvasObj.rLittle);
		
		canvasObj.context = canvasDom.getContext('2d');
		
		canvasObjs.push(canvasObj);
		setInterval(function() {drawEye(canvasObj);}, 20);
	});

	document.onmousemove = function(ev) {
		var x = ev.pageX; var y = ev.pageY;
		
		$.each(canvasObjs, function(index, canvasObj) {
			var angle = Math.atan2(y - canvasObj.abs_cy, x - canvasObj.abs_cx);
			canvasObj.ncx = canvasObj.w/2 + (canvasObj.rBig - canvasObj.rLittle) * Math.cos(angle);
			canvasObj.ncy = canvasObj.h/2 + (canvasObj.rBig - canvasObj.rLittle) * Math.sin(angle);
		});
	};

});
	