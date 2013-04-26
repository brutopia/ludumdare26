INPUT = (function(){
	that = {};
	var callbacks = {};

	that.addCallback = function(eventType, c){
		// New eventtype
		if(!callbacks[eventType]){
			callbacks[eventType] = [c]
			
			var f = function(){
					// Loop through all event callbacks
					for(var i in callbacks[eventType]){
						try{
							callbacks[eventType][i].apply(this, arguments);
						}catch(e){
							console.log("Could not run input callback " + callbacks[eventType][i] + " Error message was: " + e);
						}
					}
			}

			if(eventType === 'onmousedown'){
				document.onmousedown = f;
			}
			else{
				Mousetrap.bind(eventType, f);
			}

			return 0;
		}
		else{
			var newIndex = callbacks[eventType].length; // Index after last in array
			callbacks[eventType][newIndex] = c;
			return newIndex;
		}
	} 

	that.removeCallback = function(eventType, id){
		delete callbacks[eventType][id];
		return null;
	}

	Mousetrap.bind('b r u t o p i a', cheat);

	function cheat(e){
		console.log("Stop trying to cheat!");
	}

	return that;
}());