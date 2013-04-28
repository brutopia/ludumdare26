GAME.addScreen('boat', (function(){
	var descriptions = {
		
		}


	that = {
		background: {img:'img/boat.png'},
		sprites: [],
		hotspots: [
			
		],
	}


	var storyLines = {	
				start:  {exit:1},
				1:  {line: "The boat seems to have been stranded here.", exit:2},
				2:  {line: "Much like yourself.", exit:22},
				22:  {exit:3},
				3:  {line: "You remember having a boat once. One you used to take for a ride with your wife and daughter every June.", exit:4},
				4:  {line: "You remember your wife is dead.", exit:5},
				5:  {line: "You remember she died while pregnant.", exit:6},
				6:  {line: "You remember who got her killed...", },

				};



	that.init = function(){
		GAME.showStory(storyLines, function(){GAME.showScreen('zone5');});
	}

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));