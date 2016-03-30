/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new empty object literal
var app = app || {};


window.onload = function(){
	console.log("window.onload called");
	app.main.init();
}

window.onblur = function(){
     console.log("blur at " + Date());
     app.main.paused = true;
     // stop the animation loop
     cancelAnimationFrame(app.main.animationID);
     // call update() once so that our paused screen gets drawn
     app.main.update();
};
window.onfocus = function(){
     console.log("focus at " + Date());
     // stop the animation loop, just in case it's running
     cancelAnimationFrame(app.main.animationID);
     app.main.paused = false;
     // restart the loop
     app.main.update();
};