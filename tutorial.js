"use strict";
var app = app || {};

var tutorialState = {
	
	preload: function(){
        app.main.game.load.image("tutbackground", "images/tutorial.png");
 
	},
	
	create: function(){
		app.main.game.add.sprite(0, 0, "tutbackground");
		app.main.graphics = app.main.game.add.graphics(0, 0);
        
        var back = app.main.game.add.text(755, 580, "Back");
		back.anchor.set(.5);
        back.font = "Gloria Hallelujah";
        back.fontSize = 35;
        back.fill = '#fff';
        
    
	 	back.inputEnabled = true;
		back.events.onInputOver.add(over, this);
		back.events.onInputOut.add(out, this);
		back.events.onInputDown.add(backStart, this);

	}
}
function over(item) {
	//changes color over hover
    item.fill = "#2196F3";

}

function out(item) {
	//changes color on out
    item.fill = "#ffffff";

}

function backStart(item) {
   	//on click sets game back to boot
     item =  app.main.game.state.start("boot");

}
