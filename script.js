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
	storePics: [],
	deadFish: [false, false, false, false],
	prevMouse: undefined,
	music: undefined,
	foodEat: undefined, 
	foodPlop: undefined,
	foodGroup: undefined,
	fishGroup: undefined,
	bubbleParticles: undefined,
	money: 0,
	soundEffectsOn: true,
	text: undefined,
	overlay: false,
	pause: false,
	graphicOverlay: undefined,
	xClose:undefined,
	foodType: "food1",
	closeTut: undefined,
	tutback: undefined,
	storeArr: [false, false, false, false, false, false],
	multiplier: 1,
	zen : false,
	keySpace: false,
	clickedStore: false,
	pausetext: undefined,

	WebFontConfig : {

		//  'active' means all requested fonts have finished loading
		//  We set a 1 second delay before calling 'createText'.
		//  For some reason if we don't the browser cannot render the text the first time it's created.

		active: function() { this.game.time.events.add(Phaser.Timer.SECOND, this); },
	
		//  The Google Fonts we want to load (specify as many as you like in the array)
		google: {
		families: ["Gloria Hallelujah"]
		}
	},

	
	//Adds necessary values to the poops
	initializePoop : function(thisPoop, index, fIndex)
	{
		thisPoop.width = 15;
		thisPoop.height = thisPoop.width * 1.5;
		thisPoop.arrIndex = index;
		thisPoop.fishIndex = fIndex;
		if(app.main.deadFish[fIndex])
		{
			thisPoop.fishIndex = 0;
			app.main.fishArr[0].poopArr.push(thisPoop);
			thisPoop.arrIndex = app.main.fishArr[0].poopArr.length-1;
			app.main.deadFish[fIndex] = false;
		}
		
		//Physics
		app.main.game.physics.arcade.enable(thisPoop);
		thisPoop.body.collideWorldBounds = true;
		thisPoop.body.gravity.y = 20;
		thisPoop.body.maxVelocity.setTo(0, 12);
		thisPoop.body.bounce.setTo(1, 1);
		
		//Gets rid of the poop and rewards the player
		thisPoop.cleanPoop = function(){
			if(app.main.game.input.activePointer.isDown && app.main.isMouseDown == false && !app.main.deadFish[thisPoop.fishIndex])
			{
				thisPoop.destroy();
				app.main.fishArr[thisPoop.fishIndex].poopArr.splice(thisPoop.arrIndex, 1);
				for(var i=thisPoop.arrIndex; i<app.main.fishArr[thisPoop.fishIndex].poopArr.length; i++)
				{
					app.main.fishArr[thisPoop.fishIndex].poopArr[i].arrIndex --;
				}
				//balancing how much money depending on food
				app.main.money += app.main.fishArr[thisPoop.fishIndex].value * app.main.multiplier;
			}
			if(app.main.deadFish[thisPoop.fishIndex])
			{
				app.main.deadFish[thisPoop.fishIndex] = false;
				thisPoop.destroy();
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
	initializeFish : function(thisFish, v)
	{
		app.main.game.physics.arcade.enable(thisFish);//adding the body component
		thisFish.body.collideWorldsBounds = true;
		thisFish.body.bounce.setTo(.9, .9);
		thisFish.seekForce = new Phaser.Point(0, 0); //initializing seek force
		thisFish.seekTarget = new Phaser.Point(thisFish.x, thisFish.y); //initializing default seek target
		thisFish.maxForce = 80; //max force applied
		thisFish.width = 20;
		thisFish.height = thisFish.width * (12/7);
		thisFish.arrIndex = app.main.fishArr.length - 1;
		thisFish.poopArr = [];
		thisFish.value = v;
		thisFish.size = Math.floor(thisFish.width) /10;
		thisFish.canPoop = true;
		
		//Displays the fish
		thisFish.display = function(){
			app.main.graphics.beginFill(0xFF0000);
			app.main.graphics.lineStyle(0x000000, 0);
			app.main.graphics.drawRect(thisFish.x, thisFish.y, thisFish.width, thisFish.height);
		}
		
		//updates the physics and forces
		thisFish.update = function(){
			thisFish.body.acceleration = new Phaser.Point(0, 0);
			thisFish.seek();
			thisFish.applyForce();
			thisFish.body.velocity = Phaser.Point.add(thisFish.body.velocity, thisFish.body.acceleration);
			thisFish.angle = (Math.atan2(thisFish.body.velocity.y, thisFish.body.velocity.x)*180/Math.PI) + 90;
			thisFish.size = Math.floor(thisFish.width) / 10;
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
				app.main.fishArr[thisFish.arrIndex].width++;
				app.main.fishArr[thisFish.arrIndex].body.width++;
				app.main.fishArr[thisFish.arrIndex].height = app.main.fishArr[thisFish.arrIndex].width * (12/7);
				app.main.fishArr[thisFish.arrIndex].body.height++;
				app.main.foodEat = app.main.game.sound.play('foodEat');
				app.main.foodEat.volume -= 0.3;
			}
			//pooping
			if(thisFish.canPoop)
			{
				app.main.game.time.events.add(Phaser.Timer.SECOND * 4, thisFish.takeAPoop, this);
				thisFish.canPoop = false;
			}
			if(app.main.zen)
				{
					if(thisFish.size < 2.0)
					{
						thisFish.width = 20;
					}
					if(thisFish.size > 6.0)
					{
						thisFish.width = 60;
					}
				}
			//death
			if(thisFish.size < 1.0 || thisFish.size > 10.0)
			{
				if(!app.main.zen)
				{
					if(thisFish.value == 10)
					{
						app.main.fishtwo.setText("$50");
						app.main.storeArr[3] = false;
					}
					if(thisFish.value == 20)
					{
						app.main.fishthree.setText("$500");
						app.main.storeArr[4] = false;
					}
					if(thisFish.value == 100)
					{
						app.main.fishfour.setText("$1000");
						app.main.storeArr[5] = false;
					}
					app.main.deadFish[thisFish.arrIndex] = true;
					for(var i=0; i<thisFish.poopArr.length; i++)
					{
						thisFish.poopArr[i].destroy();
					}
					app.main.fishArr[thisFish.arrIndex].destroy();
					app.main.fishArr.splice(thisFish.arrIndex, 1);
					for(var i=thisFish.arrIndex; i<app.main.fishArr.length; i++)
					{
						app.main.fishArr[i].arrIndex -= 1;
						for(var j=0; j<app.main.fishArr[i].poopArr.length; j++)
						{
							app.main.fishArr[i].poopArr[j].fishIndex -= 1;
						}
					}
				}
				
			}
		}
		
		//periodically shrinks the fish
		thisFish.shrink = function(){
			if(!app.main.overlay)
			{
				thisFish.width --;
				thisFish.height = thisFish.width * (12/7);
			}
			app.main.game.time.events.add(Phaser.Timer.SECOND * 4, thisFish.shrink, this);
		}
		
		//The fish takes a poop every 4 seconds where it currently is
		thisFish.takeAPoop = function(){
			if(!app.main.zen)
			{
				if(app.main.overlay ==false)
				{
					thisFish.poopArr.push(app.main.poopGroup.create(thisFish.x, thisFish.y, "poop"));
					app.main.initializePoop(thisFish.poopArr[thisFish.poopArr.length-1], thisFish.poopArr.length-1, thisFish.arrIndex);
				}
				thisFish.canPoop = true;
			}
		}
		
		//starting the shrinking
		app.main.game.time.events.add(Phaser.Timer.SECOND * 4, thisFish.shrink, this);
		
		//adds forces to move towards the seekTarget
		thisFish.seek = function(){
			if(app.main.food.length > 0 && !app.main.overlay) //making sure there isn't an undefined target
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
		
			//applies forces to the fish
			thisFish.applyForce = function()
			{
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
	//Adding volume slider
	document.getElementById("audioVol").onchange = function(e){
		app.main.game.sound.volume = e.target.value;
		document.getElementById("audioVolSpan").innerHTML = e.target.value;
	};
	
	//Adding Sound Effects toggle
	document.getElementById("soundEffects").onchange = function(e){
		app.main.soundEffectsOn = e.target.checked;
	};
	
    app.main.game = new Phaser.Game(800, 600, Phaser.AUTO, '');
	
	//sets game states
	app.main.game.state.add("boot", bootState);
    app.main.game.state.add("game", gameState);
    app.main.game.state.add("tutorial", tutorialState);
    app.main.game.state.add("flushed", flushedState);
	app.main.game.state.add("zen", zenState);
    app.main.game.state.start("boot");
}