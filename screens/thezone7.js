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

				5: {line: "You take a deep breath and start walking down the stairs.", pre:function(){GAME.STATE.choice='descend';}},

				6: {line: "It is not worth it..", pre:function(){GAME.STATE.choice='turnaround';}, exit:7},
				2: {line: "Nothing of this is real."},

				};



	that.init = function(){
		GAME.showStory(storyLines, function(){
			if(GAME.STATE.choice!=='descend'){
				GAME.STATE.act=2; GAME.showScreen('act');
			}
			else{
				GAME.showScreen('house');
			}
		});
	}

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));