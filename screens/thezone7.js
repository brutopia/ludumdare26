GAME.addScreen('zone7', (function(){
	var descriptions = {
		
		}


	that = {
		background: {img:'img/zone7.png'},
		sprites: [],
		hotspots: [
			
		],
	}


	var storyLines = {	
				start:  {line: "The dark staircase lies in front of you...", options:[1,2]},
				1: {line: "Descend", exit:5},
				2: {line: "Turn around", exit:6},

				5:  {pre:function(){GAME.showScreen('house');}},

				6:  {pre:function(){GAME.STATE.act=2; GAME.showScreen('act');}},

				};



	that.init = function(){
		GAME.showStory(storyLines, function(){});
	}

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));