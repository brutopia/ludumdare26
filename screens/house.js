GAME.addScreen('house', (function(){
	var descriptions = {
		
		}


	that = {
		background: {img:'img/house.png'},
		sprites: [],
		hotspots: [
			
		],
	}


	var storyLines = {	
				start:  {exit:1},
				1:  {line: "The Zone gives you all you decide to take.", exit:2},
				2:  {line: "Your house.", exit:3},
				3:  {line: "Your boat.", exit:4},
				4:  {line: "Mika.", exit:5},
				5:  {line: "Your wife.", exit:6},
				6:  {line: "They are all as real as they have ever been."},
				};



	that.init = function(){
		console.log("Starting dialogue");
		GAME.showStory(storyLines, function(){GAME.STATE.act=2;	GAME.showScreen('act');});

		
	}

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));