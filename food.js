function initializeFood(thisFood, _foodType)
{
	
	
	thisFood.foodType = _foodType;
	thisFood.width = 10;
	thisFood.height = 10;
	app.main.game.physics.arcade.enable(thisFood);
	
	thisFood.body.collideWorldBounds = true;
	thisFood.body.gravity.y = 10;
	thisFood.body.maxVelocity.setTo(0, 8);
	thisFood.body.bounce.setTo(0.5, 0.5);
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

