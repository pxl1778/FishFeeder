'use strict';

window.onload = init;

var game;
var graphics;
var isMouseDown = false;
var fish;
var circles = [];

function init(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        function preload () {

        }

        function create () {
             graphics = game.add.graphics(0, 0);
             fish = game.add.sprite(0, 0);
             initializeFish(fish);
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
		}
        
        //method to display all of the objects
        function displayAll(){
            graphics.clear();
            graphics.beginFill(0xAADDFF);
            graphics.lineStyle(5, 0x000000, 1);
            graphics.drawRect(0, 0, 800, 600);
            for(var i=0; i<circles.length; i++)
            {
                circles[i].display();
            }
            fish.display();
        }
}