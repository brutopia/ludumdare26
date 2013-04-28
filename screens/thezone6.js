GAME.addScreen('zone6', (function(){
	var descriptions = {
		
		}


	that = {
		background: {img:'img/zone6.png'},
		sprites: [],
		hotspots: [
			
		],
	}


	var storyLines = {	
				start:  {line: "You are clearly not the first intruder in the Zone. Stalkers range from vandals, to pure bred bounty hunters...", exit:1},
				1:  {line: "much like yourself."},
				};



	that.init = function(){
		if(!GAME.STATE.hasVisitedZone6){
			GAME.STATE.hasVisitedZone6 = true;
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