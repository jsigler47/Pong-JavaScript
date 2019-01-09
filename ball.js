class Ball {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.speed = 6;
		this.xv = 0; //X velocity
		this.yv = 0; //Y velocity
		this.ballSize = 20;
	}
	move(){
		// Y-axis movement
		if(this.y >= 0 && this.y <= height){ //Ball is in bounds
			this.y += this.yv * this.speed;
		}
		// Check for collision
		else if(this.y > height){ //Ball hit floor
			this.yv = -this.yv;
			this.y = height;
		}
		else if(this.y < 0){ //Ball hit ceiling
			this.yv = -this.yv;
			this.y = 0;
		}
		this.x += this.xv * this.speed;

	}
	show(){
		  //Draw the ball
		stroke(0);
		console.log(num);
  		fill(0, 255, 0); //Color of the ball
  		ellipse(this.x, this.y, this.ballSize);
	}
	reset(){
		//Stop the balls movement and center it
		this.x = width / 2;
	  	this.y = height / 2;
		this.xv = 0;
		this.yv = 0;
	}
	reverse(){
		this.xv = -this.xv; //Reverse the direction
		this.yv = random(-1, 1);
		this.x += this.xv * this.speed;
		this.speed += .3; //Increase ball speed.
	}
}