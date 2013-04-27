GAME.addScreen('prezone1', (function(){
	
	var story, storyDiv;

	that = {
		title: 'Neo-Stockholm: The DMZ',
		background: {img:'img/pre-zone1.png', scrollin:'left', title:'The Pre-Zone'},
		sprites: ['img/pre-zone1.png'],
		hotspots: [
			{	top:{x:0,y:0}, 
				bottom:{x:100,y:100}, 
				callback: function(){GAME.STATE.act=2; GAME.showScreen('intro');} },

			{top:{x:500,y:240}, bottom:{x:1024,y:480}, callback:function(){dialogue.play();}},
		],
	}


	var storyLines = {	
				start:  {line: 'Laid out in front of you is the only way into the Zone: the freightway. Since the incident, all other passages have either been permanently blocked or are heavily guarded by armed military personnel.', exit:1},
					1:	{line: 'Your wife is here to say farewell. This might very well be the very last time you ever see her.', exit:'end'},
				end:{pre:function(){storyDiv.style.display = 'none'; story.stop();}}
			};



	that.init = function(){
		setTimeout(function(){
			storyDiv = GAME.hudManager.addHud('hud-story', Math.floor(GAME.renderer.width*0.66), 80, 0, GAME.renderer.height - 160, 'story');
			story = new Dialogue(storyLines, storyDiv, storyDiv);
			story.play();
		}, 12000);
	},

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));