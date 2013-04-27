function Dialogue(d, div, optsDiv){
	that = {};
	
	var current;
	var waiting = false;
	var callback;

	var callbackId;
	function mousePressed(e){
		if(waiting===true){
			console.log("Dialogue mouse pressed");
			waiting = false;
			forward();
		}
	}

	function forward(){
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
				}
				else{
					// We're on the last line
					current = undefined;
					waiting = true;
				}
			}

		}else{
			if(callback){
				try{
					callback();
					console.log("Calling back ");
				}catch(e){
					console.log(e);
				}
				calback = null;
			}
			INPUT.removeCallback('onmousedown', callbackId);
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

	that.play = function(c){
		callbackId = INPUT.addCallback('onmousedown', mousePressed);
		callback= c;
		current = d.start;
		waiting = false;
		forward();
	}

	return that;
}