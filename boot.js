"use strict";
var app = app || {};

var bootState = {
	preload: function() {
		app.main.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
			console.log("Font loadted");
	},
	
	create: function(){
		app.main.game.physics.startSystem(Phaser.Physics.Arcade);
		
				
	 app.main.game.stage.backgroundColor = "0xAADDFF";
		
	var loadingTitle = app.main.game.add.text(400, 200, "Welcome to Aquatic Parenting!");
		loadingTitle.anchor.set(.5);
        loadingTitle.font = 'Gloria Hallelujah';
        loadingTitle.fontSize = 40;
        loadingTitle.fill = '#1565C0';
       
    var playGame = app.main.game.add.text(400, 350, "Start Parenting");
		playGame.anchor.set(.5);
        playGame.font = 'Gloria Hallelujah';
        playGame.fontSize = 30;
        playGame.fill = '#fff';
        console.log("font" + playGame.font);
        
    var tutorialScreen = app.main.game.add.text(400, 450, "Parent Handbook");
		tutorialScreen.anchor.set(.5);
        tutorialScreen.font = 'Gloria Hallelujah';
        tutorialScreen.fontSize = 30;
		tutorialScreen.fill = '#fff';
		
		// Start parenting hover and change game state
		playGame.inputEnabled = true;
		playGame.events.onInputOver.add(over, this);
		playGame.events.onInputOut.add(out, this);
	    playGame.events.onInputDown.add(startParenting, this);
	
		//Tutorial hover and change game state
		tutorialScreen.inputEnabled = true;
		tutorialScreen.events.onInputOver.add(over, this);
		tutorialScreen.events.onInputOut.add(out, this);
		tutorialScreen.events.onInputDown.add(instructions, this);
	},
	
	WebFontConfig : {

		//  'active' means all requested fonts have finished loading
		//  We set a 1 second delay before calling 'createText'.
		//  For some reason if we don't the browser cannot render the text the first time it's created.
		active: function() { game.time.events.add(Phaser.Timer.SECOND, this); },
	
		//  The Google Fonts we want to load (specify as many as you like in the array)
		google: {
		families: ["Gloria Hallelujah"]
		}
	}

}


function over(item) {

    item.fill = "#2196F3";

}

function out(item) {

    item.fill = "#ffffff";

}

function startParenting(item) {
   
     item =  app.main.game.state.start("game");

}


function instructions(item) {
   
     item =  app.main.game.state.start("tutorial");

}

 

