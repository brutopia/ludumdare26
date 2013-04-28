GAME.addScreen('zone2', (function(){
	var descriptions = {
		
		}


	that = {
		background: {img:'img/zone2.png'},
		sprites: ['img/andrei2.png', "img/andrei.png", "img/andrei3.png"],
		hotspots: [

			{top:{x:840,y:220}, bottom:{x:1024,y:400}, callback: function(){
				GAME.showDialogue(dialogueLines3);
			}},

		],
	}


	var dialogueLines = {	
							start: {exit:1},
							1: {line: "Halt you scumbag or I will instantly gun you down.", exit:2, div: 'hud-dialogue'},
							2: {line: "Don't think you can come waltzing in here uninvited...", exit:3, div: 'hud-dialogue'},
							3: {line: "... unless you come with gifts, old pal!",  div: 'hud-dialogue'},
							

				};


	var dialogueLines2 = {	
							start: {exit:4},
							4: {line: "Andrei. Always as happy. ",  div: 'hud-character', exit:5},
							5: {line: "Must be the poisonous fumes in here. ",  div: 'hud-character', },

				};


	var dialogueLines3 = {	
							start: {exit:1},
							1: {line: "Andrei. Always as happy. ",  div: 'hud-character', exit:2},
							2: {line: "Must be the poisonous fumes. ",  div: 'hud-character', },

				};


	that.init = function(){
		GAME.showDialogue(dialogueLines, "img/andrei2.png", function(){
			GAME.showDialogue(dialogueLines2, "img/andrei.png", function(){
				charSprite = PIXI.Sprite.fromImage('img/andrei3.png');
				charSprite.anchor.x = charSprite.anchor.y = 1.0;
				charSprite.position.x = 1024;
				charSprite.position.y =  400;
				GAME.stage.addChild(charSprite);
			});
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