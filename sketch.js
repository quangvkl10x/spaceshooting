function setup(){
	frameRate(30);
	createCanvas(700,700);
	setInterval(add,s.total*200);
}
var s=new ship();
function add(){
		s.total++;
		s.ammo[s.total-1]=new bullet();
		s.ammo[s.total-1].x=s.x;
		s.ammo[s.total-1].y=s.y-scl;
		clearInterval(add);
		console.log(s.total);	
}
var scl=10;
function keyPressed(){
	if (keyCode == UP_ARROW){
		s.go(0,-1);
	}
	else if(keyCode == DOWN_ARROW){
		s.go(0,1);
	}
	else if(keyCode == LEFT_ARROW){
		s.go(-1,0);
	}
	else if (keyCode == RIGHT_ARROW){
		s.go(1,0);
	}
}
function draw(){
	background(50);
	fill(255);
	
	s.update();
	s.show();
}