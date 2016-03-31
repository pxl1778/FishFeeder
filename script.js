'use strict';

window.onload = init;

var game;
var graphics;
var isMouseDown = false;
var fish;
var circles = [];
var puddles = [];
var food = [];
var prevMouse;
var music;
var foodGroup

function init(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


        function preload () {
			game.load.audio(
			'background'
			[
				'audio/background.mp3',
				'audio/background.ogg'
			]);
			
        }

        function create () {  
             graphics = game.add.graphics(0, 0);
             fish = game.add.sprite(0, 0);
             prevMouse = new Phaser.Point(game.input.x, game.input.y);
             initializeFish(fish);
             music = game.sound.play('background');
             
            foodGroup = game.add.group();
            foodGroup.enableBody = true;
            foodGroup.physicsBodyType = Phaser.Physics.ARCADE;
            
        }
        
        function createPuddle(){
                 puddles.push(new Circle(game.input.x, game.input.y, 195, 245, 255));
             }
             
        function update() {
            displayAll();
            manageCircles();
            fish.update();
            click();
            checkFoodCollision();
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
            for(var i=0; i<food.length; i++)
            {
                food[i].display();
            }
            fish.display();
        }
        
        function checkFoodCollision(){
            for(var i=0; i<food.length; i++)
            {
                 if(game.physics.arcade.collide(fish, food[i]))
                 {
                     food.splice(i, 1);
                     fish.width++;
                     fish.body.width++;
                     fish.height++;
                     fish.body.height++;
                 }
            }
        }
        
        function manageCircles(){
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
        }
        
        function click(){
            if(game.input.activePointer.isDown && isMouseDown == false)
            {
                isMouseDown = true;
                circles.push(new Circle(game.input.x, game.input.y, Math.floor(Math.random() * 186 + 70), Math.floor(Math.random() * 186 + 70), Math.floor(Math.random() * 186 + 70)));
                food.push(foodGroup.create(game.input.x, game.input.y));
                initializeFood(food[food.length -1], "basic");
            }
            //Making sure you can only click once.
            if(game.input.activePointer.isUp)
            {
                isMouseDown = false;
            }

	}   
}