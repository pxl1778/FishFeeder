"use strict";
var app = app || {};

var flushedState = {
	
	preload: function(){
		app.main.game.load.image("endground", "images/gameover.png");

	},
	create: function(){
		app.main.game.physics.startSystem(Phaser.Physics.Arcade);
	
		app.main.game.add.sprite(0, 0, "endground");	
		app.main.graphics = app.main.game.add.graphics(0, 0);
		
		var home = app.main.game.add.text(170, 300, "Home");
			home.anchor.set(.5);
			home.font = "Gloria Hallelujah";
			home.fontSize = 40;
			home.fill = '#fff';
			
		var tryagain = app.main.game.add.text(630, 300, "Again");
			tryagain.anchor.set(.5);
			tryagain.font = "Gloria Hallelujah";
			tryagain.fontSize = 40;
			tryagain.fill = '#fff';
		
		home.inputEnabled = true;
		home.events.onInputOver.add(over, this);
		home.events.onInputOut.add(out, this);
		home.events.onInputDown.add(reboot, this);
		
		tryagain.inputEnabled = true;
		tryagain.events.onInputOver.add(over, this);
		tryagain.events.onInputOut.add(out, this);
		tryagain.events.onInputDown.add(restart, this);

	}
}


function over(item) {

    item.fill = "#2196F3";

}

function out(item) {

    item.fill = "#ffffff";

}

//Sets the screen back to the main screen
function reboot() {
    app.main.game.state.start("boot");
    app.main.zen = false;
	app.main.fishArr = [];
	app.main.circles = [];
	app.main.puddles = [];
	app.main.food = [];
	app.main.poop = [];
	app.main.deadFish = [false, false, false, false];
	app.main.music = undefined;
	app.main.foodEat = undefined;
	app.main.foodPlop = undefined;
	app.main.foodGroup = undefined;
	app.main.fishGroup = undefined;
	app.main.bubbleParticles = undefined;
	app.main.money = 0;
	app.main.text = undefined;
	app.main.overlay = false;
	app.main.pause = false;
	app.main.graphicOverlay = undefined;
	app.main.xClose = undefined;
	app.main.foodType = "food1";
	app.main.closeTut = undefined;
	app.main.tutback = undefined;
	app.main.storeArr = [false, false, false, false, false, false];
	app.main.multiplier = 1;
}

function restart()
{
	//Restarts the whole game
	app.main.game.state.start("game");
	app.main.zen = false;
	app.main.fishArr = [];
	app.main.circles = [];
	app.main.puddles = [];
	app.main.food = [];
	app.main.poop = [];
	app.main.deadFish = [false, false, false, false];
	app.main.music = undefined;
	app.main.foodEat = undefined;
	app.main.foodPlop = undefined;
	app.main.foodGroup = undefined;
	app.main.fishGroup = undefined;
	app.main.bubbleParticles = undefined;
	app.main.money = 0;
	app.main.text = undefined;
	app.main.overlay = false;
	app.main.pause = false;
	app.main.graphicOverlay = undefined;
	app.main.xClose = undefined;
	app.main.foodType = "food1";
	app.main.closeTut = undefined;
	app.main.tutback = undefined;
	app.main.storeArr = [false, false, false, false, false, false];
	app.main.multiplier = 1;
}


