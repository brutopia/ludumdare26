var GAME = (function (width, height) {
	var that = {};
	var currentScene;
	var currentScreen;
	var animationRequest;
	var mouseCallback;
	var background;
	var scrolling;
	var interactive = true;
	var datGui;
	var story, storyDiv;

	that.stage = new PIXI.Stage(0x00ff00);
	that.renderer = PIXI.autoDetectRenderer(width, height);
	that.debug = false;
	that.hudManager;
	that.STATE = {act:1,};
	

	function initDebug(s){
		if(!datGui){
			datGui = new dat.GUI();
		}
		if(background){
	  		datGui.add(background.position, 'x');
	  		datGui.add(background.position, 'y');
  		}
	}

	that.init = function () {
		that.hudManager = new HUD(document.getElementById('hud'));

		// Restore saved game state
		that.load();
	}

	that.screens = {};
	that.addScreen = function (name, code) {
		that.screens[name] = code;
	};
	that.getScreen = function (name) {
		return that.screens[name];
	};

	that.persist = function(){
		try{
			if(window.localStorage){
				localStorage.setItem("game", JSON.stringify(that.STATE));
			}
		}
		catch(e){
			console.log(e);
		}
	};

	that.load = function(){
		try{
			if(window.localStorage){
				 var gameState = JSON.parse(localStorage.getItem("game"));
				 
				if(gameState){
					var r = confirm("Found a saved state. Would you like to continue your previous game?");
					if(r){
						that.STATE = gameState;
					}
				}
				 
			}
		}
		catch(e){
			console.log(e);
		}
	};

	that.preloadingManifest = function () {
		var manifest = [];
		for(s in that.screens){
			if(that.screens[s].background){
				manifest.push(that.screens[s].background);
			}
			if(that.screens[s].sprites){
				manifest = manifest.concat(that.screens[s].sprites);
			}
		}
		return manifest;
	};

	that.showScreen = function (futureScreen) {
		that.persist();
		for (var i=0;i<that.stage.children.length;i++) {
			that.stage.removeChild(that.stage.children[i]);
		}

		that.hudManager.clear();

		if(currentScreen && that.screens[currentScreen].exit){
			try{
				that.screens[currentScreen].exit();
				background = null;
			}
			catch(e){
				console.log("Failed to exit screen gracefully " + e);
			}
		}

		currentScreen = futureScreen;
		var s = that.screens[currentScreen];

		// Draw background
		if(s.background && s.background.img){
			background = PIXI.Sprite.fromImage(s.background.img);
			
			// Should the scene come scrolling in?
			if(s.background.scrollin){
				if(s.background.scrollin === 'left'){
					background.anchor.x = 1;
					background.position.x = GAME.renderer.width;
				}
				else{
					background.anchor.x = 0;
					background.position.x = 0;
				}
				scrolling = true;
				that.setInactive();
			}
			else{
				background.anchor.x = 0.5;
				background.position.x = GAME.renderer.width/2.0;
			}
		
			background.anchor.y = 0.5;
			background.position.y =  GAME.renderer.height/2.0;
			GAME.stage.addChild(background);
		}

		// Reset animation loop
		cancelAnimationFrame(animationRequest);


		// Main loop
		(function animate(timestamp) {
			// Scroll background
			if(scrolling){
				var scrollinTime = 10000;

				// Only left scrollins for now
				if(s.background.scrollin === 'left' && background.position.x < GAME.renderer.width + 512 && timestamp){
					background.position.x = GAME.renderer.width + (timestamp/scrollinTime * 512);
				}
				else if(background.position.x >= GAME.renderer.width + 512){
					scrolling = false;
					that.setActive();
					if(s.title){
						showTitle(s.title);
					}
				}
			}

			// Call the scene animation
			if(s.animate){
				s.animate();
			}

			animationRequest = requestAnimationFrame(animate);
			GAME.renderer.render(GAME.stage);
		})();


		if(s.init){
			s.init();
		}

		if(mouseCallback){
			mouseCallback = INPUT.removeCallback('onmousedown', mouseCallback);
		}

		if(s.hotspots){
			for(i in s.hotspots){
				var hs = s.hotspots[i];
				var newDiv = GAME.hudManager.addHud('hotspot'+i, hs.bottom.x-hs.top.x, hs.bottom.y-hs.top.y, hs.top.x, hs.top.y, 'hotspot');
				// Wrap value in closure
				(function(hs){
					newDiv.onmousedown = function(){ 
						console.log(hs);
						if(interactive){
							hs.callback();
						}
					}
				}(hs));
			}
		
		}

	
		if(GAME.debug){
			initDebug(s);
		}
	}

	that.showStory = function(lines){
		storyDiv = GAME.hudManager.addHud('hud-story', Math.floor(GAME.renderer.width*0.66), 80, 0, GAME.renderer.height - 160, 'story');
		story = new Dialogue(lines,storyDiv,storyDiv);

		that.setInactive();
		story.play(storyFinished);
	}

	function storyFinished(){
		GAME.hudManager.removeHud('hud-story');
		that.setActive();
	}

	that.setActive = function(){
		interactive = true;
	}

	that.setInactive = function(){
		interactive = false;
	}

	function showTitle(title){
		titleDiv = GAME.hudManager.addHud('hud-title', 170, 20, 0, 30, 'img-title');
		titleDiv.style.width = 'auto';
		titleDiv.innerText = titleDiv.textContent = title;
		setTimeout(function(){titleDiv.style.display = "none";}, 8000);
	}

	return that;
}(1024,400));

