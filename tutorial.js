"use strict";
var app = app || {};

var tutorialState = {
	
	create: function(){
	var tutTitle = app.main.game.add.text(400, 75, "How To Parent 101:");
		tutTitle.anchor.set(.5);
        tutTitle.font = "Gloria Hallelujah";
        tutTitle.fontSize = 40;
        tutTitle.fill = '#fff';
        
    var instruction1 = app.main.game.add.text(300, 205, "~ Mouse click to feed");
		instruction1.anchor.set(.5);
        instruction1.font = "Gloria Hallelujah";
        instruction1.fontSize = 40;
        instruction1.fill = '#fff';
        
     //Make an image of pretty rules?


	}
}