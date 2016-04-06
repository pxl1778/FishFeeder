'use strict';
var app = app || {};
var Circle = function(x, y, red, green, blue){
	this.x = x;
	this.y = y;
	this.position = new Phaser.Point(x, y);
	this.r = red;
	this.g = green;
	this.b = blue;
	this.radius = 0;
	this.opacity = 70;
	this.maxRadius = 150;
	this.growSpeed = 2;
}	
	Circle.prototype.display = function(){
		if(this.radius < this.maxRadius)
		{
			this.radius += this.growSpeed;
			var decimalOpacity = this.opacity;
			decimalOpacity *=.01;
			if(decimalOpacity < 0)
			{
				decimalOpacity = 0;
			}
            app.main.graphics.lineStyle(5, 0x000000, 0);
			app.main.graphics.beginFill(Phaser.Color.getColor(this.r, this.g, this.b), decimalOpacity);
			app.main.graphics.drawCircle(this.x, this.y, this.radius);
			this.opacity -= 1-(this.growSpeed * .01);
		}
		
	}
