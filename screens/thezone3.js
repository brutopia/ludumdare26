GAME.addScreen('zone3', (function(){
	var manhole;

	var descriptions = {
			door: {	
				start: {exit:1},
				1: {line: "The door is locked.",},
			},
			stairs: {	
				start: {exit:1},
				1: {line: "The steps are corroded.",},
			},
			sign1: {	
				start: {exit:1},
				1: {line: "The sign reads: 'Authorized personnel only.'",},
			},
			sign2: {	
				start: {exit:1},
				1: {line: "The sign reads: 'To the laboratory.'", exit:2},
				2: {line: 'Must have been there since before the Visitation. God knows what these facilities are used for nowadays.'},
			},
			sign3: {	
				start: {exit:1},
				1: {line: "The sign reads: 'Parkering forbjuden.'", exit:2},
				2: {line: 'Too bad you never learnt Swedish. Then again, very few Swedish speaking people are alive any longer.'},
			},
			windows: {	
				start: {exit:1},
				1: {line: "The windows are enforced. And even if they weren't, they're too small to fit in. It would be impossible to get in to the building this way.",},
			},
			postbox: {	
				start: {exit:1},
				1: {line: "There is a postbox on the wall.",},
			},
		}


	that = {
		background: {img:'img/zone3.png'},
		sprites: [],
		hotspots: [
			{top:{x:525,y:75}, bottom:{x:605,y:250}, title:'Exit through the back door', callback: function(){
				if(GAME.PLAYER.knows.aboutZoneRealityField){
					GAME.showScreen('zone7');
				}
				else{
					GAME.showStory(descriptions.door);
				}
			}},
			{top:{x:530,y:40}, bottom:{x:610,y:70}, callback: function(){
				GAME.showStory(descriptions.sign2);
			}},
			{top:{x:760,y:190}, bottom:{x:790,y:215}, callback: function(){
				GAME.showStory(descriptions.sign3);
			}},

			{top:{x:630,y:185}, bottom:{x:690,y:210}, callback: function(){
				GAME.showStory(descriptions.sign1);
			}},
			{top:{x:750,y:75}, bottom:{x:875,y:140}, callback: function(){
				GAME.showStory(descriptions.windows);
			}},
			{top:{x:950,y:120}, bottom:{x:1024,y:400}, title: 'Exit to front gate', callback: function(){
				GAME.showScreen('zone2');
			}},
			{top:{x:900,y:198}, bottom:{x:917,y:223}, callback: function(){
				GAME.showStory(descriptions.postbox, function(){GAME.showScreen('postbox');});
			}},

		],
	}


	var storyLines = {	
				start:  {line: "This seems to be a back entrance into what used to be the factory complex but now is a military one."},

				};



	that.init = function(){
		if(!GAME.STATE.hasVisitedZone3){
			GAME.STATE.hasVisitedZone3 = true;
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