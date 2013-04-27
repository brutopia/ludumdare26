GAME.addScreen('prezone1', (function(){
	
	var titleDiv;

	that = {
		title: 'The Pre-Zone',
		background: {img:'img/pre-zone1.png', scrollin:'left', title:'The Pre-Zone'},
		sprites: ['img/pre-zone1.png'],
		hotspots: [
			{	top:{x:0,y:0}, 
				bottom:{x:100,y:100}, 
				callback: function(){GAME.STATE.act=2; GAME.showScreen('intro');} },

			{top:{x:500,y:240}, bottom:{x:1024,y:480}, callback:function(){dialogue.play();}},
		],
	}

	that.init = function(){
		
	},

	that.animate = function(){

	}

	that.exit = function(){
		
	}

	function debug(){

	}

	return that;
	
}()));