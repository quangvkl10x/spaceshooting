function bullet(){
	this.x=0;
	this.y=0;
	this.fly= function(){
		this.y-=scl;
	}
}
function ship(){
	this.ammo= [];
	this.ammo[0]=new bullet();
	this.total=1;
	this.x=350;
	this.y=500;
	this.ammo[this.total-1].x=this.x;
	this.ammo[this.total-1].y=this.y;
	this.xgo=0;
	this.ygo=0;
	this.go = function(x,y){
		this.xgo=x*scl;
		this.ygo=y*scl;
	}
	this.update = function(){
		var tempx=this.x+this.xgo;
		var tempy=this.y+this.ygo;
		if (tempx<690 && tempx>0) this.x=tempx;
		if (tempy<690 && tempy>0) this.y=tempy;
	}
	this.show = function (){
		rect(this.x,this.y,scl,scl);
		rect(this.x,this.y+scl,scl,scl);
		rect(this.x-scl,this.y+scl,scl,scl);
		rect(this.x+scl,this.y+scl,scl,scl);
		var temp = this.ammo.filter(function(value){ return value.y>0});
		this.ammo= temp;
		this.total=this.ammo.length;
		for (var i=0;i<this.total;i++){
			this.ammo[i].fly();
			rect(this.ammo[i].x,this.ammo[i].y,scl,scl);
		}
	}
}