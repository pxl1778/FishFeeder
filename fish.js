'use script';

function initializeFish(thisFish)
{
	game.physics.arcade.enable(thisFish);//adding the body component
	thisFish.body.collideWorldsBounds = true;
	thisFish.body.bounce.setTo(.9, .9);
	thisFish.seekForce = new Phaser.Point(0, 0); //initializing seek force
	thisFish.seekTarget = new Phaser.Point(thisFish.x, thisFish.y); //initializing default seek target
	thisFish.maxForce = 80; //max force applied
	thisFish.width = 10;
	thisFish.height = 10;
	
	//Displays the fish
	thisFish.display = function(){
		graphics.beginFill(0xFF0000);
		graphics.lineStyle(0x000000, 0);
		graphics.drawRect(thisFish.x, thisFish.y, thisFish.width, thisFish.height);
	}
	
	//updates the physics and forces
	thisFish.update = function(){
		thisFish.body.acceleration = new Phaser.Point(0, 0);
		thisFish.seek();
		thisFish.applyForce();
		thisFish.body.velocity = Phaser.Point.add(thisFish.body.velocity, thisFish.body.acceleration);
		if(Math.abs(game.physics.arcade.distanceBetween(thisFish.position, thisFish.seekTarget)) < 10 && food.length > 0)
		{
			food.splice(0, 1);
		}
	}
	
	//adds forces to move towards the seekTarget
	thisFish.seek = function(){
		if(food.length > 0) //making sure there isn't an undefined target
		{
			thisFish.seekTarget = food[0].position;
		}
		else if (Math.abs(game.physics.arcade.distanceBetween(thisFish.position, thisFish.seekTarget)) < 15)
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