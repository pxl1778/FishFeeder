"use strict";
var app = app || {};

var gameState = {
	
	preload: function(){
		app.main.game.load.audio('back', 'audio/background.mp3');
		app.main.game.load.audio('foodEat', 'audio/snap.mp3');
		app.main.game.load.audio('foodPlop', 'audio/plop.mp3');
	},
    created : false,
    
	
	create: function(){
		app.main.graphics = app.main.game.add.graphics(0, 0);
		app.main.prevMouse = new Phaser.Point(app.main.game.input.x, app.main.game.input.y);

		app.main.music = this.sound.play('back');
		app.main.music.volume -= 0.3;
        app.main.music.loop = true;
		app.main.music = app.main.game.sound.play('background');
        
        // var style = { font: "30px Gloria Hallelujah", fill: "#fff", align: "left"};
        app.main.text = app.main.game.add.text(120, 30, "Fish size: " + "cm");
        
        app.main.text.anchor.set(.5);
        app.main.text.font = "Gloria Hallelujah";
        app.main.text.fontSize = 30;
        app.main.text.fill = '#fff';
			
		app.main.foodGroup = app.main.game.add.group();
		app.main.foodGroup.enableBody = true;
		app.main.foodGroup.physicsBodyType = Phaser.Physics.ARCADE;
        app.main.fishGroup = app.main.game.add.group();
        app.main.fishGroup.enableBody = true;
        app.main.fishGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        app.main.fishArr.push(app.main.fishGroup.create(0, 0));
        console.log(app.main.fishArr.length);
        for(var i=0; i<app.main.fishArr.length; i++)
        {
            initializeFish(app.main.fishArr[i]);
        }
        this.created = true;
	},
	
	update: function(){
        if(this.created)
        {
            this.displayAll();
            this.manageCircles();
            for(var i=0; i<app.main.fishArr.length; i++)
            {
                app.main.fishArr[i].update();
            }
            this.checkFoodCollision();
            this.click();
            app.main.prevMouse = new Phaser.Point(app.main.game.input.x, app.main.game.input.y);
            if(app.main.fishArr.length > 0)
            {
                app.main.size = app.main.fishArr[0].width /10;
            }
            app.main.text.setText("Fish size: " + app.main.size +"cm");
        }
	},
	
	//method to display all of the objects
    displayAll: function(){
            app.main.graphics.clear();
            app.main.graphics.beginFill(0xAADDFF);
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
            for(var i=0; i<app.main.food.length; i++)
            {
                app.main.food[i].display();
            }
            for(var i=0; i<app.main.fishArr.length; i++)
            {
                app.main.fishArr[i].display();
            }
        },
        
        checkFoodCollision: function(){
            for(var i=0; i<app.main.food.length; i++)
            {
                for(var j=0; j<app.main.fishArr.length; j++)
                {
                    if(app.main.game.physics.arcade.collide(app.main.fishArr[j], app.main.food[i]))
                    {
                        app.main.food.splice(i, 1);
                        app.main.fishArr[j].width++;
                        app.main.fishArr[j].body.width++;
                        app.main.fishArr[j].height++;
                        app.main.fishArr[j].body.height++;
                        app.main.foodEat = app.main.game.sound.play('foodEat');
                        app.main.foodEat.volume -= 0.3;
                    }
                }
            }
        },
        
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
                this.createPuddle();
            }
        },
        
        click: function(){
            if(app.main.game.input.activePointer.isDown && app.main.isMouseDown == false)
            {
                app.main.isMouseDown = true;
                app.main.foodPlop = app.main.game.sound.play('foodPlop');
                app.main.circles.push(new Circle(app.main.game.input.x, app.main.game.input.y, Math.floor(Math.random() * 186 + 70), Math.floor(Math.random() * 186 + 70), Math.floor(Math.random() * 186 + 70)));
                app.main.food.push(app.main.foodGroup.create(app.main.game.input.x, app.main.game.input.y));
                initializeFood(app.main.food[app.main.food.length -1], "basic");
            }
            //Making sure you can only click once.
            if(app.main.game.input.activePointer.isUp)
            {
                app.main.isMouseDown = false;
            }

	},
	
	createPuddle: function(){
                 app.main.puddles.push(new Circle(app.main.game.input.x, app.main.game.input.y, 195, 245, 255));
             }
	
}