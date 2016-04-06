'use strict';

window.onload = init;
var app = app || {};

app.main = {  
	game: undefined,
	graphics: undefined,
	isMouseDown: false,
	fishArr: [],
	circles: [],
	puddles: [],
	food: [],
	prevMouse: undefined,
	music: undefined,
	foodEat: undefined, 
	foodPlop: undefined,
	foodGroup: undefined,
	fishGroup: undefined,
	size : 1, 
	text: undefined,

	WebFontConfig : {

		//  'active' means all requested fonts have finished loading
		//  We set a 1 second delay before calling 'createText'.
		//  For some reason if we don't the browser cannot render the text the first time it's created.
		active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
	
		//  The Google Fonts we want to load (specify as many as you like in the array)
		google: {
		families: ["Gloria Hallelujah"]
		}
	}
}

function init(){
    app.main.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

    app.main.game.state.add("boot", bootState);
    app.main.game.state.add("game", gameState);
    app.main.game.state.add("tutorial", tutorialState);
    app.main.game.state.start("game");
	
	

}