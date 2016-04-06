"use strict";
var app = app || {};

var bootState = {
	create: function(){
		app.main.game.physics.startSystem(Phaser.Physics.Arcade);
				
	var loadingTitle = app.main.game.add.text(400, 200, "Welcome to Aquatic Parenting!");
		loadingTitle.anchor.set(.5);
        loadingTitle.font = "Gloria Hallelujah";
        loadingTitle.fontSize = 40;
        loadingTitle.fill = '#fff';
       
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
	}

}