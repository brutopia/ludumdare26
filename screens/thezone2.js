GAME.addScreen('zone2', (function(){
	var descriptions = {
		
		}


	that = {
		background: {img:'img/zone2.png'},
		sprites: ['img/andrei2.png', 'img/andrei2.png'],
		hotspots: [
		],
	}


	var dialogueLines = {	
							start: {exit:1},
							1: {line: "Halt you scumbag or I will instantly gun you down.", exit:2, div: 'hud-dialogue'},
							2: {line: "Don't think you can come waltzing in here uninvited...", exit:3, div: 'hud-dialogue'},
							3: {line: "... unless you come with gifts, old pal!", exit:3, div: 'hud-dialogue', img: 'img/andrei.png'},

				};



	that.init = function(){
		GAME.showDialogue(dialogueLines, "img/andrei2.png");
	}

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));