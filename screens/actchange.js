GAME.addScreen('act', (function(){

	that = {

	}

	var heading, title;
	var mousePressed;
	var soundtrack;
	that.init = function(){
		GAME.stage.setBackgroundColor(0x101010);

		heading = GAME.hudManager.addHud('hud-act', GAME.renderer.width-30, 30, 0, 100, 'act');
		title = GAME.hudManager.addHud('hud-actTitle', GAME.renderer.width-30, 125, 0, 130, 'title');

		var h,t,next, sound;
		switch(GAME.STATE.act){


			case 3:
				h = "Act III";
				t = "The Husband";
				next = 'screen2';
			break;

			case 2:
				h = "Act II";
				t = "The Father";
				next = 'screen2';
			break;

			case 0:
				h = "Prelude";
				t = "Enter the Zone";
				next = 'prezone1';
			break;

			default:
				h = "Act I";
				t = "The Stalker";
				next = 'prezone2';
			break;
		}
		
		if(sound){
			console.log("Sound!");
			if(soundtrack){
				console.log(soundtrack);
				soundtrack.fadeOut(0, 300, startSoundtrack);
			}
			else{
				startSoundtrack();
			}

			function startSoundtrack(){
				soundtrack = new Howl({
		  				urls: sound,
		  				loop: true,
					}).fadeIn(0.5, 5000);
			}
		}

		heading.textContent = heading.innerText = h;
		title.textContent = title.innerText = t;

		setTimeout(function(){
			mousePressed = INPUT.addCallback('onmousedown', function (){
				INPUT.removeCallback('onmousedown', mousePressed);
				GAME.showScreen(next);
			});}, 3000);

	},


	that.exit = function(){
		// Huds cleaned up by game object
	}

	return that;
	
}()));