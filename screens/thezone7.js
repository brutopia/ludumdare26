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
				start:  {line: "You decend down the dark staircase.", exit:1},
				1:  {line: "The artefact you've been looking for is near at hand.", exit:2},
				2:  {line: "Your wife is dead.", exit:3},
				3:  {line: "Mika is dead.", exit:4},
				4:  {line: "At the end of these steps you will find what makes it all worth it.", exit:5},
				5:  {pre:function(){
					setTimeout( function(){GAME.showScreen('house');}, 5000);
				}},
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