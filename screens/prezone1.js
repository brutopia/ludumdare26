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
				1: {line: "You should probably say your farewells. Make sure you've said everything that is important to her before leaving. Perhaps even look around a bit by clicking the background."},
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


	var wifeDialogue = {
						start: {exit:1},
						1: {line: 'Be careful out there.', exit:2},
						2: {line: 'Please...', exit:3},
						3: {line: 'come back alive.', exit:4},
						4: {options:[41,42,43], div: 'hud-character'},
							41: {line:"Comfort her", div: 'hud-character', exit:411},
								411: {line:"Don't worry honey. It will be fine. I'll be back before you know it", div: 'hud-character', exit:5},
							
							42: {line:"Tell her to stay strong", div: 'hud-character', exit:421},
								421: {line:"Stop that. I've done this tons of times before. ", div: 'hud-character', exit:5},
							
							43: {line:"Be cold", div: 'hud-character', exit:431},
								431: {line:"I'll survive.", div: 'hud-character', exit:5},
						
						5: {options:[52,53,51,54], div: 'hud-character'},

							51: {line:"Tell her you have to leave for the Zone", div: 'hud-character', exit:511, condition:function(){return !GAME.PLAYER.jobExplain}},
								511: {line:"I have to finish this last job. It will bring in the big bucks, and we can repair that boat of ours.", div: 'hud-character', exit:512},
								512: {line:"Just think about it - you, me and Mika, out in the unpolluted water on a beautiful summer day.", div: 'hud-character', exit:513},
								513: {line:"You say that every time...", div: 'hud-dialogue', exit:514},
								514: {line:"and yet there always seems to be one last job to be done.", div: 'hud-dialogue', exit:515},
								515: {line:"Aren't all your stalker friends upset with you stealing all their work from them?", div: 'hud-dialogue', pre:function(){GAME.PLAYER.jobExplain=true;}, exit:5},

							52: {line:"Ask her how your daughter is", div: 'hud-character', exit:521},
								521: {line:"How is Mika doing her first year in school?", div: 'hud-character', exit:522},
								522: {line:"It seems like forever since I saw her. All this work is killing me.", div: 'hud-character', exit:523},
								523: {line:"Mika is fine.", div: 'hud-dialogue', exit:524},
								524: {line:"She asks for her dad alot though...", div: 'hud-dialogue', exit:5},

							53: {line:"Explain why this job is different", div: 'hud-character', exit:531, condition:function(){return GAME.PLAYER.jobExplain}},
								531: {line:"Boris tells me that the military has left The room wide open. Only Andrei is standing guard.", div: 'hud-character', exit:532},
								532: {line:"And he will look the other way if you bribe him with as much as a pack of cigarettes.", div: 'hud-character', exit:533},
								533: {line:"Or at the very least some non-syntetic meat.", div: 'hud-character', exit:534},
								534: {line:"If you say so...", div: 'hud-dialogue', exit:5, pre:function(){GAME.PLAYER.talkedToWife=true;}},

							54: {line:"Leave", div: 'hud-character', exit:541, condition:function(){return GAME.PLAYER.talkedToWife}},
								541: {line:"I guess I'll be going then...", div: 'hud-character', exit:542},
								541: {line:"Be careful out there.", div: 'hud-dialogue'},


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