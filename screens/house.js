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
				2:  {line: "Your wife. Mika. Your house. Your boat.", exit:3},
				3:  {line: "It's all real."},
				};



	that.init = function(){
		GAME.showStory(storyLines, function(){
			GAME.STATE.act=2;
			GAME.showScreen('act');
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