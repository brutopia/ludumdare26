GAME.addScreen('eggs', (function(){
	var descriptions = {
		
		}


	that = {
		background: {img:'img/eggs.png'},
		sprites: [],
		hotspots: [
			
		],
	}


	var storyLines = {	
				start:  {line: "These artifacts are egg shaped and give off a very strong odor.", exit:1},
				1:  {line: "These artifacts are egg shaped and give off a very strong odor.", exit:2},
				2:  {line: "Much like yourself.", exit:3},
				3:  {line: "There is no telling if these were laid by an animal or made otherwise.", exit:4},
				4:  {line: "They are too heavy to carry with you, so you make a mental note to pick them up on your way back. They might very well be worth something on the black market."},
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