function HUD(rootElement){
	if(!rootElement){
		throw 'Root element must be given';
	}
	if(rootElement.style.position !== 'relative'){
		throw 'Root element must have a relative position';
	}

	var that = {
		huds:{},
		defaultPosition: {},
	};

	that.defaultPosition.x = that.defaultPosition.y = '0px';
	that.defaultColor = '#fff';
	

	that.addHud = function(id, width, height, x, y, cssClass){
		if(!id ||  x === undefined || y === undefined){
			throw "Missing arguments";
		}

		var div = document.createElement('div');
		div.id = id;
		div.style.position = "absolute";

		if(height){
			div.style.height = height + "px";
		}

		if(width){
			div.style.width = width + "px";
		}
		
		div.style.left =  x + "px" || that.defaultPosition.x;
		div.style.top = y + "px" || that.defaultPosition.y;
		div.className = cssClass;

		rootElement.appendChild(div);
		that.huds[id] = div;
		return div;
	}

	that.removeHud = function(id){
		delete that.huds[id];
		return (hud=document.getElementById(id)).parentNode.removeChild(hud);
	}

	that.clear = function(){
		rootElement.innerHTML = '';
	}

	return that;
}