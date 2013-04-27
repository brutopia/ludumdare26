LOADING = (function(){
	var that = {};
	if(!GAME.renderer.gl){
		console.log("WebGL was not supported, so falling back on 2D canvas.");
	}

	var progress_bar;
	var hudManager;
	var animationRequest;
	that.load = function(futureScreen){
		GAME.stage.setBackgroundColor(0xaa0000);

		hudManager = new HUD(document.getElementById('hud'));
		var loadingSign = hudManager.addHud('hud-loading', GAME.renderer.width, 140, 0, (GAME.renderer.height / 2) -70, 'loading');
		loadingSign.textContent = loadingSign.innerText ="LOADING";

		// Load the image for the loader screen
		var announcement = PIXI.Sprite.fromImage("img/loading.png");
		announcement.anchor.x = announcement.anchor.y = 0.5;
		announcement.position.x = GAME.renderer.width/2.0;
		announcement.position.y =  GAME.renderer.height/2.0;
		GAME.stage.addChild(announcement);
		
		// Main loop
		(function animate() {
			animationRequest = requestAnimationFrame(animate);
			GAME.renderer.render(GAME.stage);
		})();

		// Make  progress bar visible and download assets
		progress_bar = document.getElementById("progress-bar");
		progress_bar.style.display="block";
		progress_bar.value = 0;


		var preloadQueue = new createjs.LoadQueue();
		var preloadingAssets = GAME.preloadingManifest();
		for(s in GAME.scenes){
			if(s.preloadedAssets){
				preloadingAssets += s.preloadedAssets;
			}
		}
	 	
	 	preloadQueue.addEventListener("progress", handleProgress);
		preloadQueue.addEventListener("complete", handleComplete);

		preloadQueue.loadManifest(preloadingAssets);
		
		function handleProgress(p) {
			progress_bar.value = p.loaded/p.total * 100;
		}

		function handleComplete() {
			cancelAnimationFrame(animationRequest);
			

			setTimeout(function(){
				hudManager.removeHud('hud-loading');
				progress_bar.style.display = "none";
				GAME.stage.setBackgroundColor(0x000000);
				GAME.showScreen('act');
			}, 3000 );
		}

	}

	return that;
}());