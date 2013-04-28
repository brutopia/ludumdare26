GAME.addScreen('zone3', (function(){
	var descriptions = {
		
		}


	that = {
		background: {img:'img/'},
		sprites: [],
		hotspots: [
		],
	}


	var storyLines = {	
				start:  {line: ''},

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