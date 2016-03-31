function initializeFood(thisFood, _foodType)
{
	thisFood.foodType = _foodType;
	thisFood.width = 10;
	thisFood.height = 10;
	game.physics.arcade.enable(thisFood);
	
	thisFood.display = function()
	{
		if(this.foodType == "basic")
		{
			graphics.beginFill(0x000000, 1);
			graphics.lineStyle(0x000000, 0);
			graphics.drawRect(this.position.x-(thisFood.width/2), this.position.y-(thisFood.height/2), thisFood.width, thisFood.height);
		}
	}
}

