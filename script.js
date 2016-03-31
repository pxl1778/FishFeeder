'use strict';

window.onload = init;

var game;
var graphics;
var isMouseDown = false;
var fishArr = [];
var fish;
var fish1;
var circles = [];
var puddles = [];
var food = [];
var prevMouse;
var music;
var foodEat;
var foodPlop;
var foodGroup;
var fishGroup;
var size = 1;
var text;

var WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ["Gloria Hallelujah"]
    }

};


function init(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, '');

    game.state.add("boot", bootState);
    game.state.add("game", gameState);
    game.state.add("tutorial", tutorialState);
    
    game.state.start("game");

}