'use strict';
class Food {

  constructor(ctx, width, height, res, x , y, color, img){
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.res = res;
    this.x = x;
    this.y = y;
    this.color = color;
    this.img = img
  }
  draw(){;
      // this.ctx.beginPath();
      // this.ctx.lineWidth="4";
      // this.ctx.fillStyle= this.color;
      // this.ctx.beginPath();
      // this.ctx.arc(this.x + this.res/2,this.y + this.res/2,this.res /3,0,2*Math.PI);
      // this.ctx.fill();
      this.ctx.drawImage(this.img, this.x, this.y, 60, 60);

  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
}
