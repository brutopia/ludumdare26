GAME.addScreen('act', (function(){

	that = {

	}

	var heading, title;
	var mousePressed;
	var soundtrack;
	var h,t,next, sound;

	function startSoundtrack(){
				soundtrack = new Howl({
		  				urls: sound,
		  				loop: true,
					}).fadeIn(0.5, 5000);
			}

	that.init = function(){
		GAME.stage.setBackgroundColor(0x101010);
		title = GAME.hudManager.addHud('hud-actTitle', GAME.renderer.width-30, 125, 0, 130, 'title');
		heading = GAME.hudManager.addHud('hud-act', GAME.renderer.width-30, 30, 0, 100, 'act');

		
		switch(GAME.STATE.act){

			case 2:
				h = "";
				t = "Fin";
				next = undefined;
				sound = undefined;
			break;

			case 1:
				h = "";
				t = "The Zone";
				next = 'zone1';
				sound = ['sound/ambient.mp3','sound/ambient.ogg',];
			break;

			default:
				h = "A minimalist adventure";
				t = "Stalker";
				next = 'prezone1';
				sound = ['sound/ambient.mp3','sound/ambient.ogg',];
			break;
		}
		
		if(sound){
			if(soundtrack){
				console.log(soundtrack);
				soundtrack.fadeOut(0, 300, startSoundtrack);
			}
			else{
				startSoundtrack();
			}
			
		}

		heading.textContent = heading.innerText = h;
		title.textContent = title.innerText = t;
		if(next){
			setTimeout(function(){

				mousePressed = INPUT.addCallback('onmousedown', function (){
					INPUT.removeCallback('onmousedown', mousePressed);
					GAME.showScreen(next);
				});}, 500);
		}

	},


	that.exit = function(){
		// Huds cleaned up by game object
	}

	return that;
	
}()));