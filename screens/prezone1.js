GAME.addScreen('prezone1', (function(){
	var talkedToWife = false;

	var descriptions = {
			bridge: {	
				start: {exit:1},
				1: {line: 'This bridge is your only chance of getting into the Zone. It has been kept open for unofficial military transports.'},
			},

			city: {	
				start: {exit:1},
				1: {line: 'Most of Stockholm was shut down after the Visitation. It is no longer what it used to be.'},
			},

			water: {	
				start: {exit:1},
				1: {line: "The water in Stockholm was among the cleanest in the world. One could take a sip of it without becoming sick. Unfortunately it has become deadly poisonous (and slightly brownish). Don't drink it."},
			},
		}


	that = {
		title: 'Neo-Stockholm: The DMZ',
		background: {img:'img/pre-zone1.png', scrollin:'left', title:'The Pre-Zone'},
		sprites: ['img/inna.png'],
		hotspots: [
			{top:{x:0,y:0}, bottom:{x:150,y:400}, title:'Exit to the Zone', callback: function(){
				if(talkedToWife){
					GAME.STATE.act=1; GAME.showScreen('act');
				}
			}},
			{top:{x:500,y:60}, bottom:{x:900,y:260}, callback: function(){
				GAME.showStory(descriptions.bridge)
			}},
			{top:{x:920,y:220}, bottom:{x:1024,y:270}, callback: function(){
				GAME.showStory(descriptions.city)
			}},
			{top:{x:720,y:280}, bottom:{x:1024,y:380}, callback: function(){
				GAME.showStory(descriptions.water)
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


	that.init = function(){
		var wifeSprite = PIXI.Sprite.fromImage("img/inna.png");

		wifeSprite.anchor.x = wifeSprite.anchor.y = 1.0;
		wifeSprite.position.x = 990;
		wifeSprite.position.y =  340;
		
		var optionsDiv = GAME.hudManager.addHud('hud-character', 600, 80, 70, 255 , 'options');
		optionsDiv.style.display = 'none';
		
		var dialogueDiv = GAME.hudManager.addHud('hud-dialogue', 400,60, 270, 120 , 'dialogue');
		dialogueDiv.style.display = 'none';

		var dialogue = new Dialogue(wifeLines,dialogueDiv,optionsDiv)

		GAME.showStory(storyLines, function(){
			GAME.stage.addChild(wifeSprite);

			GAME.setInactive();
			dialogue.play(function(){
				dialogueDiv.style.display='none'; 
				GAME.stage.removeChild(wifeSprite);
				GAME.setActive();
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