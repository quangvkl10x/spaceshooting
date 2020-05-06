function bullet(){
	this.x=0;
	this.y=0;
	this.origin=0;
	this.flyup= function(){
		this.y-=scl;
	}
	this.flydown= function(){
		this.y+=scl;
	}
	this.brk=true;
	this.hurt= function(guy){
	if ((this.x==guy.x+scl && dist(this.x,this.y,guy.x+scl,guy.y+scl)<=scl) || (this.x==guy.x-scl && dist(this.x,this.y,guy.x-scl,guy.y+scl)<=scl))
		{
			this.brk=false;
			guy.hp--;
			return true;
		}
		if (dist(this.x,this.y,guy.x,guy.y)<=scl || dist(this.x,this.y,guy.x,guy.y+scl)<=scl)
		{
			this.brk=false;
			guy.hp--;
			return true;
		}
		return false;
	}
}
function ship(){
	this.ammo= [];
	this.ammo[0]=new bullet();
	this.total=1;
	this.hp=5;
	this.x=600;
	this.y=680;
	this.ammo[this.total-1].x=this.x;
	this.ammo[this.total-1].y=this.y;
	this.xgo=0;
	this.ygo=0;
	this.go = function(x,y){
		this.xgo=x*scl;
		this.ygo=y*scl;
	}
	this.update = function(){
		let tempx=this.x+this.xgo;
		let tempy=this.y+this.ygo;
		if (tempx<1190 && tempx>0) this.x=tempx;
		if (tempy<690 && tempy>300) this.y=tempy;
	}
	this.showPlayer = function (){
		fill(1,243,245);
		rect(this.x,this.y,scl,scl);
		rect(this.x,this.y+scl,scl,scl);
		rect(this.x-scl,this.y+scl,scl,scl);
		rect(this.x+scl,this.y+scl,scl,scl);
		let temp = this.ammo.filter(function(value){ return value.y>=0});
		this.ammo= temp;
		this.total=this.ammo.length;
		for (let i=0;i<this.total;i++){
			let x=this.ammo[i].x;
			let y=this.ammo[i].y;
			for (let bad of enemy){
				if (bad.hp>0){
						if (this.ammo[i].hurt(bad)){
							y-=scl;
							rect(x,y,scl,scl);
						}
					}
			}
			if (this.ammo[i].brk) rect(x,y,scl,scl);
			this.ammo[i].flyup();
		}
	}
	this.shot=new bullet();
	this.shot.x=this.x;
	this.shot.y=this.y;
	this.showEnemy = function (){
		rect(this.x,this.y,scl,scl);
		rect(this.x,this.y-scl,scl,scl);
		rect(this.x-scl,this.y-scl,scl,scl);
		rect(this.x+scl,this.y-scl,scl,scl);	
		if (this.shot.y>700 && this.hp>0)
		{
			this.shot.x=this.x;
			this.shot.y=this.y;
			this.shot.brk=true;
		}
		this.shot.flydown();
		if (this.shot.brk){
			fill(255);
			rect(this.shot.x,this.shot.y,scl,scl);
		}
	}
}
function boss(){
	this.x=400;
	this.y=100;
	this.shot=[];
	for (let i=0;i<5;i++)
		this.shot[i]=new bullet();
	for (let i=0;i<this.shot.length;i++){
				this.shot[i].x=this.x;
				this.shot[i].y=this.y;
				this.shot[i].brk=true;
			}
	console.log(this.shot,this.y);
	this.show= function(){
		this.d=4*scl;
		rect(this.x,this.y,scl,scl,scl/2);
		rect(this.x+scl,this.y-scl,scl,scl,scl/2);
		rect(this.x-scl,this.y-scl,scl,scl,scl/2);
		rect(this.x+scl*2,this.y-scl*2,scl,scl,scl/2);
		rect(this.x-scl*2,this.y-scl*2,scl,scl,scl/2);
		rect(this.x-scl,this.y-scl*3,scl,scl,scl/2);
		rect(this.x+scl,this.y-scl*3,scl,scl,scl/2);
		rect(this.x-scl*2,this.y-scl*4,scl,scl,scl/2);
		rect(this.x+scl*2,this.y-scl*4,scl,scl,scl/2);
		rect(this.x-scl*3,this.y-scl*4,scl,scl,scl/2);
		rect(this.x+scl*3,this.y-scl*4,scl,scl,scl/2);
		rect(this.x-scl*4,this.y-scl*5,scl,scl,scl/2);
		rect(this.x+scl*4,this.y-scl*5,scl,scl,scl/2);
		rect(this.x-scl*5,this.y-scl*5,scl,scl,scl/2);
		rect(this.x+scl*5,this.y-scl*5,scl,scl,scl/2);
		for (let i=0;i<this.shot.length;i++){
			if (this.shot[i].y>=700){
				this.shot[i].x=this.x;
				this.shot[i].y=this.y;
				if (i==this.shot.length-1) this.d=0;
				this.shot[i].brk=true;
			}
			else this.shot[i].flydown();
			this.shot[i].y-=this.d;
			console.log(i,this.shot[i].x,this.shot[i].y);
			this.shot[i].x = this.shot[i].x-this.d;
			if (this.shot[i].brk)
				if (this.shot[i].hurt(player))
				this.shot[i].brk=false;
			if (this.shot[i].brk)
			rect(this.shot[i].x,this.shot[i].y,scl,scl);
			this.shot[i].x = this.shot[i].x+this.d*2;
			this.shot[i].brk=true;
			if (this.shot[i].brk)
				if (this.shot[i].hurt(player))
				this.shot[i].brk=false;
			if (this.shot[i].brk)
			rect(this.shot[i].x,this.shot[i].y,scl,scl);
			this.shot[i].x-=this.d;
			this.shot[i].y+=this.d;
			this.d=this.d-scl;
		}
	}
}
