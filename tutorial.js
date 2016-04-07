"use strict";
var app = app || {};

var tutorialState = {
	
	create: function(){
		
		 //Make an image of pretty rules?
	var tutTitle = app.main.game.add.text(400, 75, "How To Parent 101:");
		tutTitle.anchor.set(.5);
        tutTitle.font = "Gloria Hallelujah";
        tutTitle.fontSize = 40;
        tutTitle.fill = '#1565C0';
        
    var instruction1 = app.main.game.add.text(300, 205, "~ Mouse click to feed");
		instruction1.anchor.set(.5);
        instruction1.font = "Gloria Hallelujah";
        instruction1.fontSize = 40;
        instruction1.fill = '#fff';
        
        var back = app.main.game.add.text(700, 550, "Back");
		back.anchor.set(.5);
        back.font = "Gloria Hallelujah";
        back.fontSize = 40;
        back.fill = '#fff';
        
    
	 	back.inputEnabled = true;
		back.events.onInputOver.add(over, this);
		back.events.onInputOut.add(out, this);
		back.events.onInputDown.add(backStart, this);

	}
}
function over(item) {

    item.fill = "#2196F3";

}

function out(item) {

    item.fill = "#ffffff";

}

function backStart(item) {
   
     item =  app.main.game.state.start("boot");

}
