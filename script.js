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
var foodEat;
var foodPlop;
var foodGroup;
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
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

        function preload () {
			//  Load the Google WebFont Loader script
			game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
			game.load.audio('back', 'audio/background.mp3');
			game.load.audio('foodEat', 'audio/snap.mp3');
			game.load.audio('foodPlop', 'audio/plop.mp3');
						
        }

        function create () {  
             graphics = game.add.graphics(0, 0);
             fish = game.add.sprite(0, 0);
             prevMouse = new Phaser.Point(game.input.x, game.input.y);
             initializeFish(fish);

             // music.loop = true;
             music = this.sound.play('back');
			 music.volume -= 0.3;
                       
            foodGroup = game.add.group();
            foodGroup.enableBody = true;
            foodGroup.physicsBodyType = Phaser.Physics.ARCADE;
            
            
           // var style = { font: "30px Gloria Hallelujah", fill: "#fff", align: "left"};
			text = game.add.text(120, 30, "Fish Size: " + "cm");
			
			text.anchor.set(.5);
			text.font = "Gloria Hallelujah";
			text.fontSize = 30;
			text.fill = '#fff';
			console.log(size);
            
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
            size = fish.width /10;
            text.setText("Fish Size: " + size +"cm");
       
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
                     foodEat = game.sound.play('foodEat');
                     foodEat.volume -= 0.3;
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
                foodPlop = game.sound.play('foodPlop');
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