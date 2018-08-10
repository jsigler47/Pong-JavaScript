
var pWidth = 10;
var pHeight = 70;
var ballSize = 20;
var playerSpeed = 5
var ballSpeed = 6; //Initial value
var saveSpeed = ballSpeed;
var start = false;

function setup(){

	var width = 800;
	var height = 500;
  createCanvas(width ,height);

  player1 = new player(0 + 2 * pWidth, (height - pHeight) / 2);
  player2 = new player(width - 2 * pWidth, (height - pHeight) / 2);

  ball1 = new ball(width / 2, height / 2);

  ball1.xv = Math.random() < 0.5 ? -1 : 1; //Ball will go in any direction at start.
  ball1.yv = Math.random() < 0.5 ? -1 : 1;
}


function draw() {

  background(0) //Refresh the screen.

//Move Player2
if(start){

  fill(255); //Reset fill for players and divider
  //Draw the scores
  stroke(255);
  textFont('monospace')
  text(player1.score, (width / 2) - pWidth * 2, pHeight / 2);
  text(player2.score, (width / 2) + pWidth * 2, pHeight / 2);
  stroke(0)

  if(player2.y > 0 && player2.y < height){ //Player 2 is within boundaries
  	var save = player2.y
  	player2.y += player2.v;
  	if(player2.y <= 0 || player2.y >= height - pHeight){
  		player2.y = save;
  	}
  }
//Move Player1
  if(player1.y > 0 && player1.y < height){ //Player 1 is within boundaries
  	var save = player1.y
  	player1.y += player1.v;
  	if(player1.y <= 0 || player1.y >= height - pHeight){
  		player1.y = save;
  	}
  }
//Draw the players
	stroke(0);
	rect(player1.x, player1.y, pWidth, pHeight); 
	rect(player2.x - 1, player2.y, pWidth, pHeight); 

//Draw the divider
	stroke(255)
 	rect((width / 2) - (pWidth / 4), 0, pWidth / 2, height);

//Move the ball
	// x-axis movement and scoring
	if(ball1.x >= 0 && ball1.x <= width){ //Ball is in bounds
	  	ball1.x += ball1.xv * ballSpeed; //Move the ball

	  	if(ball1.x <= player1.x && (ball1.y < player1.y || ball1.y > player1.y + pHeight)){ //Check for ball out of bounds on Player 1 (left) side
	  		player2.score += 1
	  		resetBall();
	  	}
	  	if(ball1.x >= player2.x && (ball1.y < player2.y || ball1.y > player2.y + pHeight)){ //Check for ball out of bounds on Player 2 (right) side
	  		player1.score += 1
	  		resetBall();
	  	}
	 }
	//Check for collision
	if(ball1.x <= player1.x + pWidth && ball1.y >= player1.y && ball1.y <= player1.y + pHeight){ //Collided with player 1
		ball1.xv = -ball1.xv; //Reverse the direction
		ball.yv = random(-1, 1);
		ball1.x += ball1.xv * ballSpeed;
		ballSpeed += .3; //Increase ball speed.
	}
	if(ball1.x >= player2.x && ball1.y >= player2.y && ball1.y <= player2.y + pHeight){ //Collided with player 2
		ball1.xv = -ball1.xv; //Reverse the direction
		ball.yv = random(-1, 1);
		ball1.x += ball1.xv * ballSpeed;
		ballSpeed += .3;
	}
	// Y-axis movement
	if(ball1.y >= 0 && ball1.y <= height){ //Ball is in bounds
		ball1.y += ball1.yv * ballSpeed;
	}
	// Check for collision
	else if(ball1.y > height){ //Ball hit floor
		ball1.yv = -ball1.yv;
		ball1.y = height;
	}
	else if(ball1.y < 0){ //Ball hit ceiling
		ball1.yv = -ball1.yv;
		ball1.y = 0;
	}
  //Draw the ball
  fill(0, 255, 0); //Color of the ball
  ellipse(ball1.x, ball1.y, ballSize);

}//End of if(start)
else{
	stroke(0, 204, 0);
	fill(0, 204, 0);
	strokeWeight(2);
	textAlign(CENTER);
	textSize(34);
	text('PONG', width / 2, height / 4);
	text('PRESS ENTER TO CONTINUE', width / 2, height / 2);
	noStroke();
}
}

function keyPressed(){
	if(keyCode == ENTER)
		start = !start
	if(start){
		if(keyCode == UP_ARROW){
			player2.v = -1 * playerSpeed;
		}
		if(keyCode == DOWN_ARROW){
			player2.v = 1 * playerSpeed;
		}
	}
}

function keyTyped(){
	
	if(start){
		if(key == 'w' || key == 'W'){
			player1.v = -1 * playerSpeed;
		}
		if(key == 's' || key == 'S'){
			player1.v = 1 * playerSpeed;
		}
	}
}

function keyReleased(){
	if(start){
		if(key == 'w' || key == 'W' || key == 's' || key == 'S'){
			player1.v = 0;
		}
		if(keyCode == UP_ARROW || keyCode == DOWN_ARROW){
			player2.v = 0;
		}
	}
}

function resetBall(){ //Reset ball after point is scored.
		//Stop the balls movement and center it
		ball1.x = width / 2;
	  	ball1.y = height / 2;
		ball1.xv = 0;
		ball1.yv = 0;

		setTimeout(cont, 1500); // Pause.

		function cont(){
	  		ballSpeed = saveSpeed;
	  		ball1.xv = Math.random() < 0.5 ? -1 : 1;
	  		ball1.yv = Math.random() < 0.5 ? -1 : 1;
		}



}