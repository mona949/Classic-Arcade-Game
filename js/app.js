'use strict';
//Enemy class 
var Enemy = function(x, y, speed) {
	this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.width = 40;
	this.height = 30;
	var randomSpeed = (Math.random() * (500 - 100) + 100);
	this.speed = randomSpeed;
};
Enemy.prototype.update = function(dt) {
	if(this.x <= 505) {
		this.x += this.speed * dt;
	} else {
		this.x = -2;
	}
};
// Draw the enemy on the screen
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Player = function(x, y) {
	this.sprite = 'images/char-horn-girl.png';
	this.x = 200;
	this.y = 400;
	this.width = 30;
	this.height = 30;
};
Player.prototype.update = function() {
	if(this.x < 0) {
		this.x = 0;
	}
     // Check for collisions with the bugs
	for(var i = 0; i < 3; i++) {
		if(((this.y < allEnemies[i].y + 72) && (this.y + 72 > allEnemies[i].y) && this.x < allEnemies[i].x + 72) && (this.x + 72 > allEnemies[i].x)) {
			this.reset();
		}
	}
};
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
	if(key === 'left') {
		if(this.x > 0) {
			this.x = this.x - 100;
		}
	} else if(key === 'right') {
		if(this.x < 400) {
			this.x = this.x + 100;
		}
	} else if(key === 'up') {
		if(this.y > 0) {
			this.y = this.y - 80;
		}
	} else if(key === 'down') {
		if(this.y < 380) {
			this.y = this.y + 80;
		}
	}
	if(this.y <= 0) {
		this.reset();
		alert('you made it!');
	}
};
//Reset player to beginning position
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
};
var allEnemies = [];
for(var i = 0; i < 3; i++) {
	var enemyY = 65 + 80 * i;
	var enemyX = Math.floor(Math.random() * 30);
	var enemySpeed = 50 + Math.floor(Math.random() * 150);
	allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
}
var player = new Player();
//  This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});