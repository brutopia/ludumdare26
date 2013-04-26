function Dialogue(d, div, optsDiv){
	that = {};
	
	var textDelay = 10000;
	var timeout;
	var current;
	var waiting = false;

	var callbackId = INPUT.addCallback('onmousedown', mousePressed);
	function mousePressed(e){
		window.clearTimeout(timeout);
		if(waiting===true){
			waiting = false;
			forward();
		}
	}

	function forward(){
		window.clearTimeout(timeout);
		waiting = false;

		div.style.display = "block";
		div.innerHTML = '';
	
		if(current){
			
			// If there is a pre-function
			if(typeof current.pre === 'function'){
				try{
					current.pre();
				}catch(e){
					console.log("Dialogue callback failed with error " + e);
				}
			}


			// If there is a text line
			if(typeof current.line === 'string'){
				var x = document.getElementById(current.div) || div;
				say(current.line, x);
				
			}
	
			// If there are answer options
			if(current.options){
				writeOptions(d, current.options);
			}
			else{
				if(current.exit){
					current = d[current.exit];
					waiting = true;
					//timeout = setTimeout(forward, textDelay);
				}
				else{
					INPUT.removeCallback('onmousedown', mousePressed);
					current = undefined;
				}
			}

		}
	}

	function say(line, x){
		div.style.display = "none";
		optsDiv.style.display = "none";

		x.style.display = "block";
		x.textContent = x.innerText = current.line;
	}

	function writeOptions(dialogue, options){
		optsDiv.innerHTML = '';
		optsDiv.style.display = "block";

		for(var i=0;i<options.length;i++){
			var current = dialogue[options[i]];

			// Check if condition is met
			if(current.condition){

				if(!current.condition()){
					continue;
				}
			}

			var option = document.createElement('div');
			option.className = "line";
			option.id = options[i];
			
			// We wrap the current exit value in a closure and return a callback function
			option.onmousedown = (function(c){
				return function(){
					if(c.post){
						c.post();
					}
					selectExit(c);
					optsDiv.innerHTML = '';
					optsDiv.style.display = "none";
				}
			}(current)); 

			option.textContent = option.innerText ="> " + current.line;
			optsDiv.appendChild(option);
		}
	}

	function selectExit(e){
		current = e;
		forward();
	}

	that.play = function(){
		GAME.interactive = false;
		current = d.start;
		waiting = false;
		forward();
	}

	that.stop = function(){
		GAME.interactive = true;
		INPUT.removeCallback('onmousedown', callbackId);
	}

	return that;
}