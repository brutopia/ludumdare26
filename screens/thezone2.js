GAME.addScreen('zone2', (function(){
	var charSprite;

	var descriptions = {
			turret: {	
				start: {exit:1},
				1: {line: "An automated turret. Fuck around and be instantly killed.",},
			},

			camera: {	
				start: {exit:1},
				1: {line: "Cameras using image recognition techniques that feed data as input to the automated turrets. Andrei really doesn't have to lift a finger in case an uninvited guest needs to be taken care of.",},
			},

			gates: {	
				start: {exit:1},
				1: {line: "Electrified fences.",},
			},

			backdrop: {	
				start: {exit:1},
				1: {line: "On the other side of the gate you can make out the huge vegetation that has grown from ground zero. The Visitation created an eternal spring, with strange plants flowering all year around.",},
			},

			booth: {	
				start: {exit:1},
				1: {line: "That booth is probably were Andrei sits around all day and consumes all his 'gifts'. Vodka, cigars, perhaps even real meat made from animal flesh.",},
			},
		}


	that = {
		background: {img:'img/zone2.png'},
		sprites: ['img/andrei2.png', "img/andrei.png", "img/andrei3.png"],
		hotspots: [

			{top:{x:840,y:220}, bottom:{x:1024,y:400}, callback: function(){
				GAME.showDialogue(dialogueLines3);
			}},

			{top:{x:100,y:320}, bottom:{x:600,y:400}, title:'Exit to the train tracks', callback: function(){
				GAME.showScreen('zone1');
			}},

			{top:{x:0,y:30}, bottom:{x:80,y:400}, title:'Exit to the back entrance', callback: function(){
				GAME.showScreen('zone3');
			}},

			{top:{x:220,y:30}, bottom:{x:300,y:100}, callback: function(){
				GAME.showStory(descriptions.turret);
			}},

			{top:{x:340,y:130}, bottom:{x:380,y:160}, callback: function(){
				GAME.showStory(descriptions.camera);
			}},

			{top:{x:500,y:70}, bottom:{x:570,y:120}, callback: function(){
				GAME.showStory(descriptions.camera);
			}},

			{top:{x:750,y:80}, bottom:{x:820,y:310}, callback: function(){
				GAME.showStory(descriptions.booth);
			}},

			{top:{x:100,y:190}, bottom:{x:330,y:290}, callback: function(){
				GAME.showStory(descriptions.gates);
			}},

			{top:{x:430,y:160}, bottom:{x:530,y:260}, callback: function(){
				GAME.showStory(descriptions.backdrop);
			}},


		],
	}


	var dialogueLines = {	
							start: {exit:1},
							1: {line: "Halt you scumbag or I will instantly gun you down.", exit:2, div: 'hud-dialogue'},
							2: {line: "Did you press that button? Don't think you can come waltzing in here uninvited...", exit:3, div: 'hud-dialogue'},
							3: {line: "... unless you come with gifts, old pal!",  div: 'hud-dialogue'},
							

				};


	var dialogueLines2 = {	
							start: {exit:4},
							4: {line: "Andrei. Always as happy. ",  div: 'hud-character', exit:5},
							5: {line: "Must be the poisonous fumes in here. ",  div: 'hud-character', },

				};


	var dialogueLines3 = {	
							start: {exit:1},
							1: {line: "So my friend, what do you have for me today?", options:[21,22,23], div:'hud-dialogue'},
							11: {line: "Anything else?", options:[21,22,2201,23], div:'hud-dialogue'},
								21: {line: "Some cigarettes", exit: 211,  div: 'hud-character'},
							211: {line: "Don't you know that inhaling poisonous fumes is hazardous to your health?", exit:212, div: 'hud-dialogue'},
							212: {line: "I kid! Give me one.", exit:11, div: 'hud-dialogue'},
								22: {line: "Cash", exit:221,  div: 'hud-character', condition:function(){return !GAME.PLAYER.knows.andreisAttituteCash}},						
							221: {line: "Unless you have a substantial amount for me, you better rethink.", exit:11, div: 'hud-dialogue', pre: function(){GAME.PLAYER.knows.andreisAttituteCash=true;}},	
								23: {line: "Nothing", exit:231,  div:'hud-character'},
							231: {line: "What kind of friend are you anyway?", div: 'hud-dialogue'},

								2201: {line: "Cash", exit:222,  div: 'hud-character'},
							222: {line: "How much did you say you have?", options:[30, 31], div: 'hud-dialogue'},
								30: {line: "Alot", exit: 301,  div: 'hud-character'},
							301: {line: "That's not what I hear.", exit: 11,  div: 'hud-dialogue'},
								31: {line: "Not much", exit: 32,  div: 'hud-character'},
							32: {line: "That's what I thought.", exit: 33,  div: 'hud-dialogue'},
							33: {line: "Let me make you a deal instead.", options: [331,332],  div: 'hud-dialogue', pre:function(){GAME.PLAYER.knows.aboutDealWithAndrei=true;}},
								331: {line: "Yes", exit:3311, div: 'hud-character'},
								3311: {line: "What kind of deal are we talking about?", exit:3312, div: 'hud-character'},
								3312: {line: "Friends share brotherly.", exit:3313, div: 'hud-dialogue'},
								3313: {line: "Let's say that one friend was to find some very valuable artefact...", exit:3314, div: 'hud-dialogue'},
								3314: {line: "perhaps even one that belongs to someone else. Like the Institute.", exit:3315, div: 'hud-dialogue'},
								3315: {line: "Come to think of it, some might even refer to it as stealing a very valuable artefact.", exit:3316, div: 'hud-dialogue'},
								3316: {line: "In that case the other friend would of course protect the first one.", exit:3317, div: 'hud-dialogue'},
								3317: {line: "And if that other friend was in need of money, the first friend, whom he so brotherly protected...", exit:3318, div: 'hud-dialogue'},
								3318: {line: "would of course share half of whatever price he got for the valuable artefact.", exit:3319, div: 'hud-dialogue'},
								3319: {line: "Do we understand each other?", options:[3320,3321], div: 'hud-dialogue'},
									3320: {line: "Yes", exit:33201, div: 'hud-character'},
										33201: {line: "Good then. You may enter...", exit:33202, div: 'hud-dialogue', pre: function(){GAME.PLAYER.dealWithAndrei=true;}},
										33202: {line: "As soon as you have payed me 5000 credits upfront."},
									3321: {line: "No", exit:231, div: 'hud-character'},

								332: {line: "No", exit:231, div: 'hud-character'},

				};


	that.init = function(){
		if(!GAME.STATE.hasVisitedZone2){
			GAME.STATE.hasVisitedZone2 = true;

			GAME.showDialogue(dialogueLines, "img/andrei2.png", function(){
				GAME.showDialogue(dialogueLines2, "img/andrei.png", function(){
					addAndrei();
				});
			});
		}
		else{
			addAndrei();
			GAME.setActive();
		}
	}

	function addAndrei(){
		charSprite = PIXI.Sprite.fromImage('img/andrei3.png');
		charSprite.anchor.x = charSprite.anchor.y = 1.0;
		charSprite.position.x = 1024;
		charSprite.position.y =  400;
		GAME.stage.addChild(charSprite);
	}

	that.animate = function(){
	}

	that.exit = function(){
		GAME.stage.removeChild(charSprite);
	}

	function debug(){

	}

	return that;
	
}()));