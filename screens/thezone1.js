GAME.addScreen('zone1', (function(){
	var descriptions = {
			train: {	
				start: {exit:1},
				1: {line: "These carts are old as dirt. I wonder what they carry with them on their way out of the Zone.",},
			},

			city: {	
				start: {exit:1},
				1: {line: "Whoever was left in the city after the Visitation is surely not alive any longer.",},
			},

			exit: {	
				start: {exit:1},
				1: {line: "This way leads to the heavily guarderd walls surrounding the Zone.",},
			},
		}


	that = {
		title: 'Zone 4312 - Contaminated Area',
		background: {img:'img/zone1.png'},
		sprites: [],
		hotspots: [
			{top:{x:800,y:0}, bottom:{x:1024,y:400}, title:'Exit to the gate', callback: function(){
				if(GAME.PLAYER.knows.zoneExit1){
					GAME.showScreen('zone2');
				}
				else{
					GAME.showStory(descriptions.exit);
					GAME.PLAYER.knows.zoneExit1 = true;
				}
			}},
			
			{top:{x:375,y:50}, bottom:{x:585,y:340}, callback: function(){
				GAME.showStory(descriptions.train);
			}},

			{top:{x:0,y:160}, bottom:{x:170,y:220}, callback: function(){
				GAME.showStory(descriptions.city);
			}},
		],
	}


	var storyLines = {	
				start:  {line: 'Your ride in on the train was far from comfortable. It was undercover though.', exit:1},
					1:  {line: 'These old train tracks are being used for transporting artefacts out of the zone. The military must have gotten information from the Institute about something important.'},
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