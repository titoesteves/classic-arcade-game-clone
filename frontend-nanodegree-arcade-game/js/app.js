// Enemies our player must avoid
var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = s;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    this.reset();
    for(var i = 0; i < allEnemies.length; i++){
        if(allEnemies[i].x === player.x && allEnemies[i].y === player.y){
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.reset = function() {
    if (allEnemies[0].x > 500) {
        allEnemies[0].x = 0,
        allEnemies[0].y = 60,
        allEnemies[0].speed = 200;
    }
    else if (allEnemies[1].x > 500) {
        allEnemies[1].x = 0,
        allEnemies[1].y = 145,
        allEnemies[1].speed = 250;
    }
    else if (allEnemies[2].x > 500) {
        allEnemies[2].x = 0,
        allEnemies[2].y = 230,
        allEnemies[2].speed = 300;
    }    
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
    var Player = function(x, y, s){
        this.x = x;
        this.y = y;
        this.speed = s;
        this.sprite = 'images/char-boy.png';
        this.handleInput = function(key){
            if (key === "left" && this.x > 0){
                this.x-= 100;
            }
            else if (key === "right" && this.x < 355){
                this.x+= 100;
            }
            else if (key === "up" && this.y > 55){
                this.y-= 85;
            }
            else if (key === "down" && this.y < 400){
                this.y+= 85;
            }
        };
    };

    Player.prototype.update = function(dt){
        if (this.y < 0){
                this.reset();
            }
    };

    Player.prototype.reset = function() {
        this.x = 200, this.y = 400;
    };


// Draw the player on the screen, required method for game
        Player.prototype.render = function() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
    var allEnemies = [];
    var i = 0, x = 0, y = 60, s = 150;
    for(i ; i < 3; i++, x+=180, y+= 85, s+=10){
        allEnemies.push(new Enemy(x, y, s));
    }   

    var player = new Player(200, 400, 200);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
