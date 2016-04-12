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

function reboot(item) {
   
     item =  app.main.game.state.start("boot");

}

function restart(item)
{
	item =  app.main.game.state.start("game");
}
