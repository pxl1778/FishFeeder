"use strict";
var app = app || {};

var bootState = {
	create: function(){
		app.main.game.physics.startSystem(Phaser.Physics.Arcade);
				
	 app.main.game.stage.backgroundColor = "0xAADDFF";
				
	var loadingTitle = app.main.game.add.text(400, 200, "Welcome to Aquatic Parenting!");
		loadingTitle.anchor.set(.5);
        loadingTitle.font = "Gloria Hallelujah";
        loadingTitle.fontSize = 40;
        loadingTitle.fill = '#1565C0';
       
    var playGame = app.main.game.add.text(400, 350, "Start Parenting");
		playGame.anchor.set(.5);
        playGame.font = "Gloria Hallelujah";
        playGame.fontSize = 30;
        playGame.fill = '#fff';
        
    var tutorialScreen = app.main.game.add.text(400, 450, "Parent Handbook");
		tutorialScreen.anchor.set(.5);
        tutorialScreen.font = "Gloria Hallelujah";
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

