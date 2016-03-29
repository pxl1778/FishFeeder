'use strict';

window.onload = init;

var game;
var graphics;
var isMouseDown = false;
var fish;
var circles = [];
var puddles = [];
var prevMouse;

function init(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        function preload () {

        }

        function create () {
             graphics = game.add.graphics(0, 0);
             fish = game.add.sprite(0, 0);
             prevMouse = new Phaser.Point(game.input.x, game.input.y);
             initializeFish(fish);
        }
        
        function createPuddle(){
                 puddles.push(new Circle(game.input.x, game.input.y, 195, 245, 255));
             }
             
        function update() {
            displayAll();
            
            //Removing circles from the array when they're not visible
            for(var i=0; i<circles.length; i++)
            {
                if(circles[i].opacity < 0)
                {
                    circles.splice(i, 1);
                }
            }
            
            for(var i=0; i<puddles.length; i++)
            {
                if(puddles[i].opacity < 0)
                {
                    puddles.splice(i, 1);
                }
            }
            
            if(prevMouse.x != game.input.x && prevMouse.y != game.input.y)
            {
                createPuddle();
            }
            
            fish.update();
            //Clicking event
            if(game.input.activePointer.isDown && isMouseDown == false)
            {
                isMouseDown = true;
                circles.push(new Circle(game.input.x, game.input.y, Math.floor(Math.random() * 186 + 70), Math.floor(Math.random() * 186 + 70), Math.floor(Math.random() * 186 + 70)));
            }
            //Making sure you can only click once.
            if(game.input.activePointer.isUp)
            {
                isMouseDown = false;
            }
            prevMouse = new Phaser.Point(game.input.x, game.input.y);
		}
        
        //method to display all of the objects
        function displayAll(){
            graphics.clear();
            graphics.beginFill(0xAADDFF);
            graphics.lineStyle(5, 0x000000, 1);
            graphics.drawRect(0, 0, 800, 600);
            for(var i=0; i<puddles.length; i++)
            {
                puddles[i].display();
            }
            for(var i=0; i<circles.length; i++)
            {
                circles[i].display();
            }
            fish.display();
        }
}