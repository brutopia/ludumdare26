GAME.addScreen('prezone1', (function(){
	var dialogue, dialogueDiv;
	var wifeSprite;

	var descriptions = {
			bridge: {	
				start: {exit:1},
				1: {line: "This bridge is your only chance of getting into the Zone. It has been kept open as part of outgoing transports for a covert military project. Which is also why you are here today. To your left is the pathway to the train tracks on the bridge.",},
			},

			city: {	
				start: {exit:1},
				1: {line: 'Most of Stockholm was shut down after the Visitation. It is no longer what it used to be.'},
			},

			water: {	
				start: {exit:1},
				1: {line: "The water in Stockholm was among the cleanest in the world. One could take a sip of it without becoming sick. Unfortunately it has become deadly poisonous (and slightly brownish). Don't drink it."},
			},

			properGoodbye: {	
				start: {exit:1},
				1: {line: "You should probably say your farewells. Make sure you've said everything that is important to her before leaving."},
			},
		}


	that = {
		background: {img:'img/pre-zone1.png', scrollin:'left', },
		sprites: ['img/wife.png'],
		hotspots: [
			{top:{x:0,y:0}, bottom:{x:150,y:400}, title:'Exit to the Zone', callback: function(){
				if(GAME.PLAYER.talkedToWife){
					GAME.STATE.act=1; GAME.showScreen('act');
				}
				else{
					GAME.showStory(descriptions.properGoodbye);
				}
			}},
			{top:{x:500,y:60}, bottom:{x:900,y:260}, callback: function(){
				GAME.showStory(descriptions.bridge);
			}},
			{top:{x:920,y:220}, bottom:{x:1024,y:270}, callback: function(){
				GAME.showStory(descriptions.city);
			}},
			{top:{x:720,y:280}, bottom:{x:1024,y:380}, callback: function(){
				GAME.showStory(descriptions.water);
			}},
			{top:{x:180,y:185}, bottom:{x:325,y:400}, callback: function(){
				GAME.showDialogue(wifeDialogue, "img/wife.png");
			}},
		],
	}


	var storyLines = {	
				start:  {line: 'The pre-zone.Your palms are sweaty and your heart is racing. But you need the money.', exit:1},
					1:  {line: 'Laid out in front of you is the only way into the Zone: the freightway. Since the incident, all other passages have either been permanently blocked or are heavily guarded by armed military personnel.', exit:2},
					2:  {line: 'Your wife is here to say farewell. This might very well be the very last time you ever see her.'},
				};


	var wifeLines = {	
				start:  {line: 'Be careful out there.', exit:1},
					1:  {line: 'Please...', exit:2},
					2:  {line: 'come back alive.'},
				};

	var wifeDialogue = {	start: {exit:1},
							1: {line: "I'm so worried", exit:10, div: 'hud-dialogue'},
						10: {options:[11,12,13,14], div: 'hud-character'},
						
						11: {line:'Ask about last night', exit:111, condition: function(){return !GAME.PLAYER.knows.lastNight}, div: 'hud-character'},
							111: {line:'What about it?', options:[1111,1112], div: 'hud-dialogue'},
						1111: {line:'Nevermind...', div: 'hud-character', exit:10},
						1112: {line:'Apologize', div: 'hud-character', exit:11112},
							11112: {line:"It's ok. I know it wasn't your fault.", div: 'hud-dialogue', exit:10, pre:function(){GAME.PLAYER.knows.lastNight=true;}},

						12: {line:'Ask about daughter', exit:121, div: 'hud-character', condition:function(){return GAME.PLAYER.knows.lastNight}},
							121: {line:'Mika is sick. She needs you.', exit:10, div: 'hud-dialogue', pre:function(){GAME.PLAYER.talkedToWife=true}},

						13: {line:'Ask about the Zone', exit:131, div: 'hud-character'},
							131: {line:'Last time you went in there, you came back with nothing.', exit:132, div:'hud-dialogue'},
							132: {line:"I wouldn't let you go in there if it wasn't for Mika. She really needs you now. Don't fail her.", exit:10, div: 'hud-dialogue'},
						
						14: {line:'Leave for the Zone', div: 'hud-character'},

					31: {line: 'Your wife gets annoyed with you and turns away.'},
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