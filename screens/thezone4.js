GAME.addScreen('zone4', (function(){
	var descriptions = {
		
		}


	that = {
		background: {img:'img/zone4.png'},
		sprites: [],
		hotspots: [
			
		],
	}


	var storyLines = {	
				start:  {line: 'These factories have been here since before the Visitation. For some reason they seem to still be active.'},
				};



	that.init = function(){
		if(!GAME.STATE.hasVisitedZone4){
			GAME.STATE.hasVisitedZone4 = true;
			GAME.showStory(storyLines, function(){});
		}
		else{
			GAME.setActive();
		}
	}

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));