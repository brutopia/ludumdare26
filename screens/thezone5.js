GAME.addScreen('zone5', (function(){
	var charEggs;

	var descriptions = {
			path: {	
			},
		}


	that = {
		background: {img:'img/zone5.png'},
		sprites: [],
		hotspots: [
			{top:{x:800,y:185}, bottom:{x:855,y:225}, callback: function(){
				GAME.showScreen('eggs');
			}},
		],
	}


	var storyLines = {	
				start:  {line: "These parts seem perfect for finding some Witch's Jelly. ", exit:1},
				1:  {line: "That is not why you are here though.", exit:2},
				2:  {line: "On your left hand side you see something that looks like a stranded boat."},
				};



	that.init = function(){
		if(!GAME.STATE.hasVisitedZone5){
			GAME.STATE.hasVisitedZone5 = true;
			GAME.showStory(storyLines, function(){});
		}
		else{
			GAME.setActive();
		}

		charEggs = PIXI.Sprite.fromImage('img/eggs.png');
		charEggs.anchor.x = charEggs.anchor.y = 1.0;
		charEggs.position.x = 1024;
		charEggs.position.y =  400;
		
	}

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));