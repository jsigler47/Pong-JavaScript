class Player {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.v = 0;
		this.score = 0;
		this.w = 10
		this.h = 70
	}
	move(){
		if(this.y > 0 && this.y < height){ //Player is within boundaries
			var save = this.y
			this.y += this.v;
			if(this.y <= 0 || this.y >= height - this.h){
				this.y = save;
			}
  		}
	}
	show(){
		stroke(0);
		fill(255);
		rect(this.x, this.y, this.w, this.h);
	}
}