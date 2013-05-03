GAME.addScreen('postbox', (function(){
	var wifeDialogue = {	start: {exit:1},
							1: {line: "I'm so worried", exit:2, div: 'hud-dialogue'},
							2: {line: "You have changed since you started going to the Zone.", exit:3, div: 'hud-dialogue'},
							3: {line: "It's not worth it. You can be happy without it. And without me.", exit:4, div: 'hud-dialogue'},
							4: {line: "What kind of pleasure do you get from going here?", div: 'hud-dialogue', exit:5},
							5: {line: "It's not real you know. None of it is.", exit:6, div: 'hud-dialogue'},
							6: {line: "I am not. Mika is not. That boat of ours is not. We don't own a beautiful house together.", exit:7, div: 'hud-dialogue'},
							7: {line: "It's not real.", exit:8, div: 'hud-dialogue'},
							8: {line: "Not even that room is real. You dream of it giving you salvation. That's why you keep it locked in your mind,", exit:9, div: 'hud-dialogue'},
							9: {line: "You're afraid that it will lead you to what you really came here for...", div: 'hud-dialogue', pre:function(){GAME.PLAYER.knows.aboutZoneRealityField=true;}},
						
				};

	var descriptions = {
			sign: {	
				start: {exit:1},
				1: {line: "The sign is blank.",},
			},

			letter: {	
				start: {exit:1},
				1: {line: "There is a blank sheet of paper inside.", options:[2,3]},
				2: {line: "Put it back.", exit:21},
					21: {line: "This is absurd. Who would leave a blank piece of paper in an empty mailbox that hasn't been used for years? Located in an infected Zone!"},
				3: {line: "Read it anyway", exit:31, condition:function(){return GAME.PLAYER.knows.aboutTheLetterInThePostbox;}},
					31: {line: "You stare at the letter", exit:32, pre:function(){GAME.PLAYER.readsLetter=true;}},
					32: {line: "...", exit:33},
					33: {line: "You can see it now.", exit:34},
					34: {line: "It's a letter from your wife.", exit:35},
					35: {line: "Your dead wife...", exit:36},
					36: {line: "Or did you ever have a wife?"},
			},

			button: {	
				start: {exit:1},
				1: {line: "The button looks ominous.", options:[2,3]},
				2: {line: "Leave it alone."},
				3: {line: "Push it.", exit:31},
					31: {line: "You push the button.", exit:32, pre:function(){GAME.STATE.buttonPressed=true;}},
					32: {line: "Nothing happens.", exit:33},
					33: {line: "Seemingly."},
			},
		}


	that = {
		background: {img:'img/postbox.png'},
		sprites: [],
		hotspots: [
			{top:{x:530,y:180}, bottom:{x:610,y:194}, title:'Read Sign', callback: function(){
				GAME.showStory(descriptions.sign);
			}},

			{top:{x:485,y:105}, bottom:{x:627,y:162}, title:'Look Inside', callback: function(){
				GAME.showStory(descriptions.letter, function(){
					if(GAME.PLAYER.readsLetter){
						GAME.showDialogue(wifeDialogue, "img/wife.png");
						GAME.PLAYER.readsLetter=false;
					}
				});
			}},

			{top:{x:380,y:148}, bottom:{x:415,y:178}, title:'Look at Button', callback: function(){
				GAME.showStory(descriptions.button);
			}},
			{top:{x:0,y:260}, bottom:{x:1024,y:400}, title: 'Exit to back entrance', callback: function(){
				GAME.showScreen('zone3');
			}},
		],
	}

	that.init = function(){
		GAME.setActive();
	}

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));