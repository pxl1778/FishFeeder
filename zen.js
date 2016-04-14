"use strict";
var app = app || {};

var zenState = {
    created : false,
	preload: function(){
		app.main.game.load.audio('back', 'audio/background.mp3');
		app.main.game.load.audio('foodEat', 'audio/snap.mp3');
		app.main.game.load.audio('foodPlop', 'audio/plop.mp3');
        app.main.game.load.image("tankbackground", "images/FishTank.png");
        app.main.game.load.image("bubble", "images/bubble.png");
        app.main.game.load.image("poop", "images/poop.png");
        app.main.game.load.image("tutbackground", "images/tutorial.png");

        app.main.game.load.image("store", "images/storeicon.png", 100,100);
        //app.main.game.load.image("tutorialbutton", "images/tutorialicon.png", 100,100);
        app.main.game.load.image("food1", "images/food1.png", 100,100);
        app.main.game.load.image("food2", "images/food2.png",100,100);
        app.main.game.load.image("food3", "images/food3.png");
        app.main.game.load.image("food4", "images/food4.png");
        app.main.game.load.spritesheet("fish1", "images/fish1spritesheet.png", 70, 120, 5);
        app.main.game.load.spritesheet("fish2", "images/fish2spritesheet.png", 70, 120, 5);
        app.main.game.load.spritesheet("fish3", "images/fish3spritesheet.png", 70, 120, 5);
        app.main.game.load.spritesheet("fish4", "images/fish4spritesheet.png", 70, 120, 5);
        this.created = false;
	},
    bubbleParticles: undefined,
	
	create: function(){
        app.main.zen = true;
        app.main.game.add.sprite(0, 0, "tankbackground");
		app.main.graphics = app.main.game.add.graphics(0, 0);
		app.main.prevMouse = new Phaser.Point(app.main.game.input.x, app.main.game.input.y); //Tracking the mouse position
        var store = app.main.game.add.sprite(690, 10, "store");
        //var tutorialbutton = app.main.game.add.sprite(690, 120,"tutorialbutton");
        
        //particles
        app.main.bubbleParticles = app.main.game.add.emitter(0, 0, 70);
        app.main.bubbleParticles.makeParticles("bubble");
        app.main.bubbleParticles.gravity = -300;
        app.main.bubbleParticles.maxParticleSpeed.set(0, 10);
        app.main.bubbleParticles.setRotation(0, 0);
        app.main.bubbleParticles.setScale(.5, .5);
        
        //music
		app.main.music = this.sound.play('back');
		app.main.music.volume -= 0.3;
        app.main.music.loop = true;
		app.main.music = app.main.game.sound.play('background');
        app.main.music.volume = .5;
        
               
		
        //Setting up physics for game objects
		app.main.foodGroup = app.main.game.add.group();
		app.main.foodGroup.enableBody = true;
		app.main.foodGroup.physicsBodyType = Phaser.Physics.ARCADE;
        app.main.fishGroup = app.main.game.add.group();
        app.main.fishGroup.enableBody = true;
        app.main.fishGroup.physicsBodyType = Phaser.Physics.ARCADE;
        app.main.poopGroup = app.main.game.add.group();
        app.main.poopGroup.enableBody = true;
        app.main.poopGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        
        //initializing the fish
        app.main.fishArr.push(app.main.fishGroup.create(0, 0, "fish1"));
        app.main.fishArr[0].animations.add("swim1");
        app.main.fishArr[0].play("swim1", 10, true);
        app.main.fishArr[0].anchor.setTo(.5, .5);
        for(var i=0; i<app.main.fishArr.length; i++)
        {
            app.main.initializeFish(app.main.fishArr[i], 1);
        }
        this.created = true;
        
        
        //store
        store.inputEnabled = true;
        store.events.onInputDown.add(storeOpen, this);

       
		//instructions
		//tutorialbutton.inputEnabled = true;
        //tutorialbutton.events.onInputDown.add(tutorialScreen, this);
        
        //exit button
        app.main.xClose = app.main.game.add.text(50, 20, "<-");
   		app.main.xClose.anchor.set(.5);
        app.main.xClose.font = "Gloria Hallelujah";
        app.main.xClose.fontSize = 50;
        app.main.xClose.fill = '#fff';
        
        app.main.xClose.inputEnabled = true;
		app.main.xClose.events.onInputOver.add(over, this);
		app.main.xClose.events.onInputOut.add(out, this);
		app.main.xClose.events.onInputDown.add(reboot, this);
	},
	
	update: function(){
        if(this.created)
        {
            this.displayAll(); //Displays all of the objects in the scene
            this.manageCircles(); //Deals with drawing the circle special effects
            for(var i=0; i<app.main.fishArr.length; i++)
            {
                app.main.fishArr[i].update(); //updating every fish that might be on the screen
            }
            
            this.checkFoodCollision(); //Checks if the fish has collided with the food
            this.click(); //Checks for clicking to feed the fish
            
            app.main.prevMouse = new Phaser.Point(app.main.game.input.x, app.main.game.input.y); //recording the mouse pos
        }
	},
	
	//method to display all of the objects
    displayAll: function(){
            app.main.graphics.clear();
            app.main.graphics.lineStyle(5, 0x000000, 1);
            app.main.graphics.drawRect(0, 0, 800, 600);
            for(var i=0; i<app.main.puddles.length; i++)
            {
                app.main.puddles[i].display();
            }
            for(var i=0; i<app.main.circles.length; i++)
            {
                app.main.circles[i].display();
            }
            // for(var i=0; i<app.main.food.length; i++)
            // {
            //     app.main.food[i].display();
            // }
            // for(var i=0; i<app.main.fishArr.length; i++)
            // {
            //     app.main.fishArr[i].display();
            // }
            // for(var i=0; i<app.main.poop.length; i++)
            // {
            //     app.main.poop[i].display();
            // }
        },
        
        //Checks whether or not the fish is colliding with the food.
        checkFoodCollision: function(){
            for(var i=0; i<app.main.food.length; i++)
            {
                for(var j=0; j<app.main.fishArr.length; j++)
                {
                    if(app.main.game.physics.arcade.collide(app.main.fishArr[j], app.main.food[i]))
                    {
                        //particle
                        app.main.bubbleParticles.x = app.main.food[i].x;
                        app.main.bubbleParticles.y = app.main.food[i].y;
                        app.main.bubbleParticles.start(true, 5000, null, 7);
                        //removing food
                        app.main.food[i].destroy();
                        app.main.food.splice(i, 1);
                        //fish grows
                        app.main.fishArr[j].width++;
                        app.main.fishArr[j].body.width++;
                        app.main.fishArr[j].height = app.main.fishArr[j].width * (12/7);
                        app.main.fishArr[j].body.height++;
                        if(app.main.soundEffectsOn)
                        {
                            app.main.foodEat = app.main.game.sound.play('foodEat');
                        }
                        app.main.foodEat.volume -= 0.3;
                        
                    }
                }
            }
        },
        
        //Draws puddles on the screen when the mouse moves
        manageCircles: function(){
            for(var i=0; i<app.main.circles.length; i++)
            {
                if(app.main.circles[i].opacity < 0)
                {
                    app.main.circles.splice(i, 1);
                }
            }
            
            for(var i=0; i<app.main.puddles.length; i++)
            {
                if(app.main.puddles[i].opacity < 0)
                {
                    app.main.puddles.splice(i, 1);
                }
            }
            
            if(app.main.prevMouse.x != app.main.game.input.x && app.main.prevMouse.y != app.main.game.input.y)
            {
                app.main.puddles.push(new Circle(app.main.game.input.x, app.main.game.input.y, 195, 245, 255));
            }
        },
        
        //Called every frame, checks if the player is clicking to leave food.
        click: function(){
	        if(app.main.overlay == false){
            if(app.main.game.input.activePointer.isDown && app.main.isMouseDown == false)
            {
                app.main.isMouseDown = true;
                if(app.main.soundEffectsOn)
                {
                    app.main.foodPlop = app.main.game.sound.play('foodPlop');                   
                }
                app.main.circles.push(new Circle(app.main.game.input.x, app.main.game.input.y, Math.floor(Math.random() * 186 + 70), Math.floor(Math.random() * 186 + 70), Math.floor(Math.random() * 186 + 70)));
                app.main.food.push(app.main.foodGroup.create(app.main.game.input.x, app.main.game.input.y, app.main.foodType));
                app.main.initializeFood(app.main.food[app.main.food.length -1], "basic");
                
            }
            //Making sure you can only click once.
            if(app.main.game.input.activePointer.isUp)
            {
                app.main.isMouseDown = false;
            }
		}
	}
	
}