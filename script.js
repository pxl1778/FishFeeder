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

function init(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, '');

    game.state.add("boot", bootState);
    game.state.add("game", gameState);
    game.state.add("tutorial", tutorialState);
    
    game.state.start("game");

}