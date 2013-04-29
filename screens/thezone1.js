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

			water: {	
				start: {exit:1},
				1: {line: "The water is fizzing. It is partly Witch's Jelly. If one were to take a bath, instant loss of limbs would be to expect.",},
			},

			exit: {	
				start: {exit:1},
				1: {line: "This way leads to the heavily guarderd walls surrounding the Zone.",},
			},

			notReady: {	
				start: {exit:1},
				1: {line: "There is a pathway down to the water, but you really should try to get into that military complex first.",},
			},
		}


	that = {
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

			{top:{x:0,y:230}, bottom:{x:200,y:320}, callback: function(){
				GAME.showStory(descriptions.water);
			}},

			{top:{x:250,y:150}, bottom:{x:350,y:330}, title:'Exit to water', callback: function(){
				if(GAME.PLAYER.knows.aboutBoat){
					GAME.showScreen('zone5');
				}
				else{
					GAME.showStory(descriptions.notReady);
				}
			}},
		],
	}


	var storyLines = {	
				start:  {line: "You step off the freight train where you've kept hidden for what feels like forever.", exit:1},
					1:  {line: "The sleep you got cannot be described as a good night's worth. In fact, the Zone makes one's dreams vivid and long lasting so waking up is always somewhat troubling.", exit:2},
					2:  {line: "Now that you finally are here, it won't be long until you get what you want and can leave this horrid place for good.", exit:3},
					3:  {line: "Conveniently located to your right is the military complex."},
				};



	that.init = function(){
		if(!GAME.STATE.hasVisitedZone1){
			GAME.STATE.hasVisitedZone1 = true;
			GAME.showStory(storyLines, function(){});
		}
		else{
			GAME.setActive();
		}
	}

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));