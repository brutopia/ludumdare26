GAME.addScreen('postbox', (function(){
	var descriptions = {
			sign: {	
				start: {exit:1},
				1: {line: "The sign is blank.",},
			},

			letter: {	
				start: {exit:1},
				1: {line: "There is a blank sheet of paper inside.", options:[2,3]},
				2: {line: "Put it back.", exit:21},
					21: {line: "This is absurd."},
				3: {line: "Read it anyway", exit:31},
					31: {line: "You stare at the letter", exit:32},
					32: {line: "...", exit:33},
					33: {line: "You can see it now.", exit:34},
					34: {line: "It's a letter from your wife.", exit:35},
					35: {line: "Your dead wife..."},
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
			{top:{x:530,y:180}, bottom:{x:610,y:194}, callback: function(){
				GAME.showStory(descriptions.sign);
			}},

			{top:{x:485,y:105}, bottom:{x:627,y:162}, callback: function(){
				GAME.showStory(descriptions.letter);
			}},

			{top:{x:380,y:148}, bottom:{x:415,y:178}, callback: function(){
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