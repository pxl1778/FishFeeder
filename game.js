"use strict";

var gameState = {
	
	preload: function(){
		game.load.audio('back', 'audio/background.mp3');
		game.load.audio('foodEat', 'audio/snap.mp3');
		game.load.audio('foodPlop', 'audio/plop.mp3');
	},
	
	create: function(){
		graphics = game.add.graphics(0, 0);
		prevMouse = new Phaser.Point(game.input.x, game.input.y);

		music = this.sound.play('back');
		music.volume -= 0.3;
        music.loop = true;
		music = game.sound.play('background');
        
        // var style = { font: "30px Gloria Hallelujah", fill: "#fff", align: "left"};
        text = game.add.text(120, 30, "Fish Size: " + "cm");
        
        text.anchor.set(.5);
        text.font = "Gloria Hallelujah";
        text.fontSize = 30;
        text.fill = '#fff';
        console.log(size);
			
		foodGroup = game.add.group();
		foodGroup.enableBody = true;
		foodGroup.physicsBodyType = Phaser.Physics.ARCADE;
        fishGroup = game.add.group();
        fishGroup.enableBody = true;
        fishGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        fishArr.push(fishGroup.create(0, 0));
        fishArr.push(fishGroup.create(150, 234));
        for(var i=0; i<fishArr.length; i++)
        {
            initializeFish(fishArr[i]);
        }
	},
	
	update: function(){
		this.displayAll();
        this.manageCircles();
        for(var i=0; i<fishArr.length; i++)
        {
            fishArr[i].update();
        }
        this.checkFoodCollision();
        this.click();
        prevMouse = new Phaser.Point(game.input.x, game.input.y);
        size = fishArr[0].width /10;
        text.setText("Fish Size: " + size +"cm");
	},
	
	//method to display all of the objects
    displayAll: function(){
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
            for(var i=0; i<fishArr.length; i++)
            {
                fishArr[i].display();
            }
        },
        
        checkFoodCollision: function(){
            for(var i=0; i<food.length; i++)
            {
                for(var j=0; j<fishArr.length; j++)
                {
                    if(game.physics.arcade.collide(fishArr[j], food[i]))
                    {
                        food.splice(i, 1);
                        fishArr[j].width++;
                        fishArr[j].body.width++;
                        fishArr[j].height++;
                        fishArr[j].body.height++;
                        foodEat = game.sound.play('foodEat');
                        foodEat.volume -= 0.3;
                    }
                }
            }
        },
        
        manageCircles: function(){
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
                this.createPuddle();
            }
        },
        
        click: function(){
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

	},
	
	createPuddle: function(){
                 puddles.push(new Circle(game.input.x, game.input.y, 195, 245, 255));
             }
	
}