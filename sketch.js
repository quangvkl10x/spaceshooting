let scl=10;
let player=new ship();
let enemy=[];
enemy[0]=new ship();
let total_enemy=1;
let dead=0;
let shownEnemy= new Array(110).fill(false);
let ifend=0;
let supply_hp=new bullet();
let bosses=new boss();
function setup(){
	frameRate(30);
	for (let bad of enemy){
		bad.x=Math.floor(Math.random()*1000);
		bad.y=Math.floor(Math.random()*100);
		bad.y=bad.y - bad.y%scl+scl;
		bad.x=bad.x - bad.x%scl+scl;
		bad.shot.x=bad.x;
		bad.shot.y=bad.y;
		shownEnemy[bad.y]=true;

	}
	createCanvas(1200,710);
	setInterval(add,player.total*200);
}
function add(){
		player.total++;
		player.ammo[player.total-1]=new bullet();
		player.ammo[player.total-1].x=player.x;
		player.ammo[player.total-1].y=player.y-scl;
		clearInterval(add);
}
function keyPressed(){
	if (keyCode == UP_ARROW){
		player.go(0,0);
	}
	else if(keyCode == DOWN_ARROW){
		player.go(0,0);
	}
	else if(keyCode == LEFT_ARROW){
		player.go(-1,0);
	}
	else if (keyCode == RIGHT_ARROW){
		player.go(1,0);
	}
}
function draw(){
	background(50);
	fill(255);
	player.update();
	player.showPlayer();
	dead=0;
	ifend=0;
	for (let bad of enemy){
		fill(255);
		if (bad.hp>0){
		bad.showEnemy();
		if (bad.shot.hurt(player)){
			bad.shot.y+=500;
		}
		}
		else {
			fill(50);
			stroke(50);
			bad.showEnemy();
			ifend++;
			if (bad.shot.hurt(player)){
				bad.shot.y+=500;
			}
			if (bad.shot.y>700)
				ifend--;
			dead++;
		}
	}
	if (dead==total_enemy && ifend==0)
	{
		total_enemy++;
		shownEnemy= new Array(500).fill(false);
		enemy[total_enemy-1]=new ship();
		dead=0;
		for (let bad of enemy){
		bad.hp=5;
		bad.x=Math.floor(Math.random()*1000);
		bad.y=Math.floor(Math.random()*100);
		bad.y=bad.y - bad.y%scl+scl;
		bad.x=bad.x - bad.x%scl+scl;
		if (shownEnemy[bad.y] || (bad.y==bosses.y) || (bad.y==bosses.y+scl)) 
			{
				bad.y=Math.floor(Math.random()*100);
				bad.y=bad.y - bad.y%scl+scl;
			}
		else shownEnemy[bad.y]=true;
		bad.shot.x=bad.x;
		bad.shot.y=bad.y;
		}
	}
	if (player.hp < 1)
	{
		alert("YOU LOSE!!");
		location.reload();
	}
	for (let i=1;i<=player.hp;i++){
		fill(255,0,0);
		rect(1200-i*scl,700,scl,scl);
	}
	if (total_enemy%5==0) bosses.show();
}
