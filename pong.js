let playerSpeed = 5;
let saveSpeed = 6;
let delay = 1500;
let playing = false;
let win = false;

function setup(){

	let width = 800;
	let height = 500;
	createCanvas(width ,height);

	player1 = new Player(0 + 2 * 10, (height - 70) / 2);
	player2 = new Player(width - 2 * 10, (height - 70) / 2);
	ball = new Ball(width / 2, height / 2);
	ball.reset();
	setTimeout(function(){cont();}, delay);
}



function draw() {
if(playing){
	draw_background();
	//Draw players and ball
	ball.move();
	ball.show();
	//let num = ball.speed;
	//ball.show(num.map(5.5, 9, 0, 255)); //Ball gets more red as it's speed increases.
	player1.move();
	player2.move();
	player1.show();
	player2.show();

	if(ball.x <= player1.x && (ball.y < player1.y || ball.y > player1.y + 70)){ //Check for ball out of bounds on Player 1 (left) side
		player2.score += 1
		ball.reset();
		setTimeout(function(){cont();}, delay);
	}
	if(ball.x >= player2.x && (ball.y < player2.y || ball.y > player2.y + 70)){ //Check for ball out of bounds on Player 2 (right) side
		player1.score += 1
		ball.reset();
		setTimeout(function(){cont();}, delay);
	}

	//Check for collision
	collision(player1, player2, ball);

	if(player1.score == 10 || player2.score == 10){
		pWin();
	}

}//End of if(playing)
else if(!win){
	background(0) //Refresh the screen.
	stroke(0, 204, 0);
	fill(0, 204, 0);
	strokeWeight(2);
	textAlign(CENTER);
	textSize(34);
	text('PONG', width / 2, height / 4);
	text('PRESS ENTER TO CONTINUE', width / 2, height / 2);
	noStroke();
}

}// End of draw

function keyPressed(){
	if(keyCode == ENTER) //Start or stop the game.
		playing = !playing
	if(playing){
		if(keyCode == UP_ARROW){
			player2.v = -1 * playerSpeed;
		}
		if(keyCode == DOWN_ARROW){
			player2.v = 1 * playerSpeed;
		}
	}
}

function keyTyped(){
	
	if(playing){
		if(key == 'w' || key == 'W'){
			player1.v = -1 * playerSpeed;
		}
		if(key == 's' || key == 'S'){
			player1.v = 1 * playerSpeed;
		}
	}
}

function keyReleased(){
	if(playing){
		if(key == 'w' || key == 'W' || key == 's' || key == 'S'){
			player1.v = 0;
		}
		if(keyCode == UP_ARROW || keyCode == DOWN_ARROW){
			player2.v = 0;
		}
	}
}

function pWin(){
	
	win = true;
	playing = false;
	stroke(0)

	background(0);
	if(player1.score == 10)
		text('Player 1 wins!', width / 2, height / 2);
	else{
		text('Player 2 wins!', width / 2, height / 2);
	}
}

function collision(playerA, playerB, ball){
	if(ball.x <= playerA.x + playerA.w && ball.y >= playerA.y && ball.y <= playerA.y + playerA.h){ //Collided with player 1
		ball.reverse();
	}
	if(ball.x >= playerB.x && ball.y >= playerB.y && ball.y <= playerB.y + playerB.h){ //Collided with player 2
		ball.reverse();
	}
}
function cont(){
	ball.speed = saveSpeed;
	ball.xv = Math.random() < 0.5 ? -1 : 1;
	ball.yv = Math.random() < 0.5 ? -1 : 1;
}
function draw_background(){
	background(0) //Refresh the screen.
	fill(255);

	//Draw the scores
	stroke(255);
	textFont('monospace');
	text(player1.score, (width / 2) - 10 * 2, 70 / 2);
	text(player2.score, (width / 2) + 10 * 2, 70 / 2);
	//Draw the divider
	stroke(255)
	rect((width / 2) - (10 / 4), 0, 10 / 2, height);
}
/*Number.prototype.map = function (in_min, in_max, out_min, out_max) {
	//https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
	return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}*/ //Might use this later to change the color of the ball based on its speed.