GAME.addScreen('zone5', (function(){
	var charEggs;

	var descriptions = {
			tree: {	
				start: {exit:1},
				1: {line: "The trees have lost all their leaves. They have gained some orange moss though.",},
			},
		}


	that = {
		background: {img:'img/zone5.png'},
		sprites: [],
		hotspots: [
			{top:{x:800,y:185}, bottom:{x:855,y:225}, callback: function(){
				GAME.showScreen('eggs');
			}},

			{top:{x:200,y:180}, bottom:{x:310,y:220}, callback: function(){
				GAME.showScreen('boat');
			}},

			{top:{x:530,y:150}, bottom:{x:600,y:275}, callback: function(){
				GAME.showStory(descriptions.tree);
			}},

			{top:{x:700,y:250}, bottom:{x:1024,y:400}, title:'Exit to train tracks', callback: function(){
				GAME.showScreen('zone1');
			}},
		],
	}


	var storyLines = {	
				start:  {line: "These parts seem perfect for finding some Witch's Jelly. ", exit:1},
				1:  {line: "These parts seem perfect for finding some Witch's Jelly. ", exit:2},
				2:  {line: "That is not why you are here though.", exit:3},
				3:  {line: "On your left hand side you see something that looks like a stranded boat."},
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