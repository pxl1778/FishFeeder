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
	poop: [],
	prevMouse: undefined,
	music: undefined,
	foodEat: undefined, 
	foodPlop: undefined,
	foodGroup: undefined,
	fishGroup: undefined,
	bubbleParticles: undefined,
	size : 1, 
	money: 0,
	soundEffectsOn: true,
	text: undefined,
	overlay: false,
	pause: false,
	graphicOverlay: undefined,
	xClose:undefined,
	foodType: "food1",

	clickedStore: false,

	WebFontConfig : {

		//  'active' means all requested fonts have finished loading
		//  We set a 1 second delay before calling 'createText'.
		//  For some reason if we don't the browser cannot render the text the first time it's created.
		//active: function() { this.game.time.events.add(Phaser.Timer.SECOND, this); },
		active: function() { this.game.time.events.add(Phaser.Timer.SECOND, this); },
	
		//  The Google Fonts we want to load (specify as many as you like in the array)
		google: {
		families: ["Gloria Hallelujah"]
		}
	},

	
	//Adds necessary values to the poops
	initializePoop : function(thisPoop, index)
	{
		thisPoop.width = 15;
		thisPoop.height = thisPoop.width * 1.5;
		thisPoop.arrIndex = index;
		
		//Physics
		app.main.game.physics.arcade.enable(thisPoop);
		thisPoop.body.collideWorldBounds = true;
		thisPoop.body.gravity.y = 20;
		thisPoop.body.maxVelocity.setTo(0, 12);
		thisPoop.body.bounce.setTo(1, 1);
		
		//Gets rid of the poop and rewards the player
		thisPoop.cleanPoop = function(){
			if(app.main.game.input.activePointer.isDown && app.main.isMouseDown == false)
			{
				app.main.poop[thisPoop.arrIndex].destroy();
				app.main.poop.splice(thisPoop.arrIndex, 1);
				for(var i=thisPoop.arrIndex; i<app.main.poop.length; i++)
				{
					app.main.poop[i].arrIndex --;
				}
				app.main.money ++;
			}
			app.main.isMouseDown = true;
			
		}
		
		//Adds cleanPoop to input when poop is clicked
		thisPoop.inputEnabled = true;
		thisPoop.events.onInputDown.add(thisPoop.cleanPoop, this);
		
		//Displays the poop
		thisPoop.display = function(){
			app.main.graphics.beginFill(0x694D20);
			app.main.graphics.lineStyle(0x000000, 0);
			app.main.graphics.drawRect(thisPoop.x, thisPoop.y, thisPoop.width, thisPoop.height);
		}
		
		
	},
	
	//Adds necesary values to the fish
	initializeFish : function(thisFish)
	{
		app.main.game.physics.arcade.enable(thisFish);//adding the body component
		thisFish.body.collideWorldsBounds = true;
		thisFish.body.bounce.setTo(.9, .9);
		thisFish.seekForce = new Phaser.Point(0, 0); //initializing seek force
		thisFish.seekTarget = new Phaser.Point(thisFish.x, thisFish.y); //initializing default seek target
		thisFish.maxForce = 80; //max force applied
		thisFish.width = 20;
		thisFish.height = thisFish.width * (12/7);
		
		//Displays the fish
		thisFish.display = function(){
			app.main.graphics.beginFill(0xFF0000);
			app.main.graphics.lineStyle(0x000000, 0);
			app.main.graphics.drawRect(thisFish.x, thisFish.y, thisFish.width, thisFish.height);
		}
		
		//updates the physics and forces
		thisFish.update = function(){
			if(app.main.overlay ==false){
			thisFish.body.acceleration = new Phaser.Point(0, 0);
			thisFish.seek();
			thisFish.applyForce();
			thisFish.body.velocity = Phaser.Point.add(thisFish.body.velocity, thisFish.body.acceleration);
			thisFish.angle = (Math.atan2(thisFish.body.velocity.y, thisFish.body.velocity.x)*180/Math.PI) + 90;
			if(Math.abs(app.main.game.physics.arcade.distanceBetween(thisFish.position, thisFish.seekTarget)) < thisFish.height && app.main.food.length > 0)
			{
				//particle
				app.main.bubbleParticles.x = app.main.food[0].x;
				app.main.bubbleParticles.y = app.main.food[0].y;
				app.main.bubbleParticles.start(true, 5000, null, 7);
				//removing food
				app.main.food[0].destroy();
				app.main.food.splice(0, 1);
				//fish grows
				app.main.fishArr[0].width++;
				app.main.fishArr[0].body.width++;
				app.main.fishArr[0].height++;
				app.main.fishArr[0].body.height++;
				app.main.foodEat = app.main.game.sound.play('foodEat');
				app.main.foodEat.volume -= 0.3;
			}
		}
		}
		
		//The fish takes a poop every 4 seconds where it currently is
		thisFish.takeAPoop = function(){
			if(app.main.overlay ==false)
			{
			app.main.poop.push(app.main.poopGroup.create(thisFish.x, thisFish.y, "poop"));
			app.main.initializePoop(app.main.poop[app.main.poop.length-1], app.main.poop.length-1);
			app.main.game.time.events.add(Phaser.Timer.SECOND * 4, thisFish.takeAPoop, this);
			}
		}
		app.main.game.time.events.add(Phaser.Timer.SECOND * 4, thisFish.takeAPoop, this);
		//adds forces to move towards the seekTarget
		thisFish.seek = function(){
			if(app.main.overlay ==false){
			if(app.main.food.length > 0) //making sure there isn't an undefined target
			{
				thisFish.seekTarget = app.main.food[0].position;
			}
			else if (Math.abs(app.main.game.physics.arcade.distanceBetween(thisFish.position, thisFish.seekTarget)) < thisFish.height)
			{
				thisFish.seekTarget = new Phaser.Point(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600));
			}
			var temp = Phaser.Point.subtract(thisFish.seekTarget, thisFish.body.position);
			temp.clamp(-thisFish.maxForce, thisFish.maxForce);
			thisFish.seekForce = Phaser.Point.subtract(temp, thisFish.body.velocity);
		}
		
		//applies forces to the fish
		thisFish.applyForce = function(){
			thisFish.body.acceleration = Phaser.Point.add(thisFish.body.acceleration, thisFish.seekForce);
		}
		}	
	},
	
	//adds necessary values to the food objects
	initializeFood : function(thisFood, _foodType)
	{
		thisFood.foodType = _foodType;
		thisFood.width = 15;
		thisFood.height = 15;
		
		//setting physics for the food
		app.main.game.physics.arcade.enable(thisFood);
		thisFood.body.collideWorldBounds = true;
		thisFood.body.gravity.y = 10;
		thisFood.body.maxVelocity.setTo(0, 8);
		thisFood.body.bounce.setTo(0.5, 0.5);
		
		//displays the food on the screen
		thisFood.display = function()
		{
			if(this.foodType == "basic")
			{
				app.main.graphics.beginFill(0x000000, 1);
				app.main.graphics.lineStyle(0x000000, 0);
				app.main.graphics.drawRect(this.position.x-(thisFood.width/2), this.position.y-(thisFood.height/2), thisFood.width, thisFood.height);
			}
		}
	}
}

function init(){
    app.main.game = new Phaser.Game(800, 600, Phaser.AUTO, '');
	
	app.main.game.state.add("boot", bootState);
    app.main.game.state.add("game", gameState);
    app.main.game.state.add("tutorial", tutorialState);
    app.main.game.state.start("boot");
}