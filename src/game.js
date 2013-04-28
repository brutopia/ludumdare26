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
	var story, storyDiv, rootHudDiv;
	var currentHotspots;
	var charSprite;

	that.stage = new PIXI.Stage(0x00ff00);
	that.renderer = PIXI.autoDetectRenderer(width, height);
	that.debug = false;
	that.hudManager;
	that.STATE = {act:0,};
	that.PLAYER = {knows:{},};
	

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
		rootHudDiv = document.getElementById('hud');
		that.hudManager = new HUD(rootHudDiv);

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
				localStorage.setItem("player", JSON.stringify(that.PLAYER));
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
				var playerState = JSON.parse(localStorage.getItem("player"));
				 
				if(gameState){
					var r = confirm("Found a saved state. Would you like to continue your previous game?");
					if(r){
						that.STATE = gameState;
						that.PLAYER = playerState || {knows:{}};
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
				manifest.push(that.screens[s].background.img);
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

		currentHotspots = [];
		if(s.hotspots){
			for(i in s.hotspots){
				var hs = s.hotspots[i];
				that.addHotspot(hs, 'hotspot'+i);
			}
		
		}

		// Ready to initialize screen... unless the background is scrolling in
		if(!scrolling){
			screenReady(s);
		}

		// Reset animation loop
		cancelAnimationFrame(animationRequest);

		var lastTime;
		// Main loop
		(function animate(timestamp) {
			var timeDelta = timestamp-lastTime;
			// Scroll background
			if(scrolling){
				var scrollinTime = 7000;

				// Only left scrollins for now
				if(s.background.scrollin === 'left' && background.position.x < GAME.renderer.width + 512 && timestamp && timeDelta){
					background.position.x += (timeDelta/scrollinTime * 512);
				}
				else if(background.position.x >= GAME.renderer.width + 512){
					scrolling = false;
					that.setActive();
					screenReady(s);
				}
				lastTime = timestamp;
			}

			// Call the scene animation
			if(s.animate){
				s.animate();
			}

			animationRequest = requestAnimationFrame(animate);
			GAME.renderer.render(GAME.stage);
		})();

		if(mouseCallback){
			mouseCallback = INPUT.removeCallback('onmousedown', mouseCallback);
		}
	
		if(GAME.debug){
			initDebug(s);
		}
	}

	function screenReady(s){
		if(s.title){
			showTitle(s.title);
		}
		if(s.init){
			s.init();
		}
	}


	that.showDialogue = function(lines, characterImage, callback){
		var characterDiv = GAME.hudManager.addHud('hud-character', 600, 80, 70, 255 , 'options');
		characterDiv.style.display = 'none';
		characterDiv.height = 'auto';

		var dialogueDiv = GAME.hudManager.addHud('hud-dialogue', 400,60, 270, 120 , 'dialogue');
		dialogueDiv.style.display = 'none';
		dialogueDiv.height = 'auto';

		story = new Dialogue(lines,dialogueDiv,characterDiv);

		if(characterImage){
			charSprite = PIXI.Sprite.fromImage(characterImage);
			charSprite.anchor.x = charSprite.anchor.y = 1.0;
			charSprite.position.x = 990;
			charSprite.position.y =  340;
			GAME.stage.addChild(charSprite);
		}

		that.setInactive();
		story.play(function(){
			dialogueFinished();
			if(callback){
				try{
					callback();
				}catch(e){
					console.log(e);
				}
			}
		});
	}

	function dialogueFinished(){
		if(charSprite){
			GAME.stage.removeChild(charSprite);
		}
		charSprite = null;
		GAME.hudManager.removeHud('hud-character');
		GAME.hudManager.removeHud('hud-dialogue');
		that.setActive();
	}

	that.showStory = function(lines, callback){
		storyDiv = GAME.hudManager.addHud('hud-story', Math.floor(GAME.renderer.width*0.66), 80, 0, GAME.renderer.height - 160, 'story');
		story = new Dialogue(lines,storyDiv,storyDiv);

		that.setInactive();
		story.play(function(){
			storyFinished();
			if(callback){
				try{
					callback();
				}catch(e){
					console.log(e);
				}
			}
		});
	}

	function storyFinished(){
		GAME.hudManager.removeHud('hud-story');
		that.setActive();
	}

	that.addHotspot = function(hs, id){
		var newDiv = GAME.hudManager.addHud(id, hs.bottom.x-hs.top.x, hs.bottom.y-hs.top.y, hs.top.x, hs.top.y, 'non-clickable');
		hs.div = newDiv;

		// Wrap value in closure
		(function(hs){
			newDiv.onmousedown = function(){ 
				if(interactive){
					hs.callback();
				}
			}
		}(hs));
		currentHotspots.push(hs);
	}

	that.setActive = function(){
		interactive = true;
		for(hs in currentHotspots){
			currentHotspots[hs].div.className = 'clickable';
			if(currentHotspots[hs].title){
				currentHotspots[hs].div.title = currentHotspots[hs].title;
			}
		}
	}

	that.setInactive = function(){
		interactive = false;
		for(hs in currentHotspots){
			currentHotspots[hs].div.className = 'non-clickable';
			if(currentHotspots[hs].div.title){
				delete currentHotspots[hs].div.removeAttribute('title')
			}
		}
	}

	function showTitle(title){
		titleDiv = GAME.hudManager.addHud('hud-title', 1024, 20, 0, 10, 'img-title');
		titleDiv.style.width = '100%';
		titleDiv.innerText = titleDiv.textContent = title;
		setTimeout(function(){titleDiv.style.display = "none";}, 3500);
	}

	return that;
}(1024,400));

