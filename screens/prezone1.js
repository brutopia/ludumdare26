GAME.addScreen('prezone1', (function(){
	var descriptions = {
			bridge: {	
				start: {exit:1},
				1: {line: 'This bridge is your only chance of getting into the Zone. It has been kept open for unofficial military transports.'},
			}
		}


	that = {
		title: 'Neo-Stockholm: The DMZ',
		background: {img:'img/pre-zone1.png', scrollin:'left', title:'The Pre-Zone'},
		sprites: ['img/pre-zone1.png'],
		hotspots: [
			{top:{x:0,y:0}, bottom:{x:100,y:100}, callback: function(){GAME.STATE.act=1; GAME.showScreen('act');} },
			{top:{x:500,y:60}, bottom:{x:900,y:260}, callback: function(){
				GAME.showStory(descriptions.bridge)}
			},
		],
	}


	var storyLines = {	
				start:  {line: 'The pre-zone. Your palms are sweaty and your heart is racing. But you need the money.', exit:1},
					1:  {line: 'Laid out in front of you is the only way into the Zone: the freightway. Since the incident, all other passages have either been permanently blocked or are heavily guarded by armed military personnel.', exit:2},
					2:  {line: 'Your wife is here to say farewell. This might very well be the very last time you ever see her.'},
				};




	that.init = function(){
		console.log("Printing some story");
		GAME.showStory(storyLines);
	},

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));