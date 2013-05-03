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

			{top:{x:100,y:320}, bottom:{x:600,y:400}, title:'Exit to the train tracks', callback: function(){
				GAME.showScreen('zone1');
			}},

			{top:{x:0,y:30}, bottom:{x:80,y:400}, title:'Exit to the back entrance', callback: function(){
				GAME.showScreen('zone3');
			}},

			{top:{x:220,y:30}, bottom:{x:300,y:100}, title:'Look at Turret', callback: function(){
				GAME.showStory(descriptions.turret);
			}},

			{top:{x:340,y:130}, bottom:{x:380,y:160}, title:'Look at Security Camera', callback: function(){
				GAME.showStory(descriptions.camera);
			}},

			{top:{x:500,y:70}, bottom:{x:570,y:120}, title:'Look at Security Camera', callback: function(){
				GAME.showStory(descriptions.camera);
			}},

			{top:{x:750,y:80}, bottom:{x:820,y:310}, title:'Look at Booth', callback: function(){
				GAME.showStory(descriptions.booth);
			}},

			{top:{x:100,y:190}, bottom:{x:330,y:290}, title:'Look at Gate', callback: function(){
				GAME.showStory(descriptions.gates);
			}},

			{top:{x:430,y:160}, bottom:{x:530,y:260}, title:'Look outisde', callback: function(){
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
							start: {exit:9},
							9: {line: "So my friend, what can I do for you today?", div:'hud-dialogue', exit:1},
							1: {options:[11,12,13,14,15,100], div:'hud-character'},
								11: {line: "Tell Andrei that Boris sent you", div:'hud-character', exit:111},
									111: {line: "Boris told me that you could help me get access to the Room. Is that right?", div:'hud-character', exit:112},
									112: {line: "Sure, sure...", div:'hud-dialogue', exit:113},
									113: {line: "But everything comes at a price.", div:'hud-dialogue', exit:1, pre:function(){GAME.PLAYER.knows.andreiWantsMoney=true;}},

								12: {line: "Ask about the Room", div:'hud-character', exit:121},
									121: {line: "Is it true what they say about it?", div:'hud-character', exit:122},
									122: {line: "What do they say about it?", options:[123], div:'hud-dialogue'},
									123: {line: "Nevermind", div:'hud-character', exit:1},

								13: {line: "Ask about the price", div:'hud-character', exit:131, condition:function(){return GAME.PLAYER.knows.andreiWantsMoney;}},
									131: {line: "So what is the going price today?", div:'hud-character', exit:132},
									132: {line: "100,000 credits", div:'hud-dialogue', options:[1321,1322,1323]},
										1321: {line: "That's ridiculous!", div:'hud-character', exit:13211},
										1322: {line: "No way.", div:'hud-character', exit:13211},
											13211: {line: "Have it your way...", div:'hud-dialogue', exit:1},
										1323: {line: "I don't have that kind of money. Yet.", div:'hud-character', exit:13211},
											13221: {line: "Unfortunately the price is not negotiable.", div:'hud-dialogue', exit:1},

								14: {line: "Initiate small talk", div:'hud-character', exit:141, condition:function(){return GAME.PLAYER.knows.andreiWantsMoney && !GAME.PLAYER.knows.andreiAnnoyed;}},
									141: {line: "Why are you bothering me?", div:'hud-dialogue', exit:1, pre:function(){GAME.PLAYER.knows.andreiAnnoyed=true;}},

								15: {line: "Small talk some more", div:'hud-character', exit:151, condition:function(){return GAME.PLAYER.knows.andreiAnnoyed;}},
									151: {line: "Ha! You cheap bastard. Do you think you can talk me into lowering my rates?", div:'hud-dialogue', exit:152},
									152: {line: "I'll have you know that people come begging to give me their money.", div:'hud-dialogue', exit:153},
									153: {line: "Aren't you supposed to go hang around that wreck of a boat down by the tracks?", div:'hud-dialogue', exit:154, pre:function(){GAME.PLAYER.knows.aboutBoat=true;}},
									154: {line: "As you usually do.", div:'hud-dialogue', exit:155},
									155: {line: "Sometimes I think you come here for the hallucinations rather than for the business.", div:'hud-dialogue', exit:1},

								100: {line: "Leave", div:'hud-character'},

				};


	that.init = function(){

		var andreiHotspot = {top:{x:840,y:220}, bottom:{x:1024,y:400}, title:'Talk to Andrei', callback: function(){
				GAME.showDialogue(dialogueLines3);
			}}

		if(!GAME.STATE.hasVisitedZone2 && GAME.STATE.buttonPressed){
			GAME.STATE.hasVisitedZone2 = true;

			GAME.showDialogue(dialogueLines, "img/andrei2.png", function(){
				GAME.showDialogue(dialogueLines2, "img/andrei.png", function(){
					addAndrei();
					GAME.addHotspot(andreiHotspot, 2134);
				});
			});
		}
		else{
			if(GAME.STATE.buttonPressed){
				addAndrei();
				GAME.addHotspot(andreiHotspot, 2134);
			}
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
		if(charSprite && GAME.STATE.buttonPressed){
			GAME.stage.removeChild(charSprite);
		}
	}

	function debug(){

	}

	return that;
	
}()));