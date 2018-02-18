'use strict';
class Snake {

  constructor(ctx, width, height, res, x , y){
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.res = res;
    this.x = x;
    this.y = y;
    this.size = 3;
    this.direction = 0;
    this.locationX = [this.x, this.x + this.res, this.x + (2 * this.res)];
    this.locationY = [this.y, this.y, this.y]
    console.log(this.historyX);
    console.log(this.historyY);
    console.log("size " + this.size);
  }
  draw(){
    this.ctx.beginPath();
    this.ctx.beginPath();
    this.ctx.lineWidth="4";
    this.ctx.strokeStyle="black";
    this.ctx.fillStyle="lightgray";
    this.ctx.rect(this.x, this.y, this.res, this.res);
    this.ctx.fill();
    this.ctx.stroke();
    for(var i = 1; i < this.size ; i++){
      this.ctx.beginPath();
      this.ctx.beginPath();
      this.ctx.lineWidth="4";
      this.ctx.strokeStyle="black";
      this.ctx.fillStyle="gray";
      this.ctx.rect(this.locationX[i], this.locationY[i], this.res, this.res);
    //  console.log(this.x + " " + this.y);
      this.ctx.fill();
      this.ctx.stroke();
    }

  }
  move(direction){
    this.direction = direction;
    var oldX = this.x;
    var oldY = this.y;


    if(direction === 1){//yukarı
      this.y = this.y - this.res;
      if(this.y < 0){
        this.y = this.height - this.res;
      }
    }else if (direction === 2){//saga
      this.x = this.x + this.res;
      if(this.x > this.width - this.res){
        this.x = 0 ;
      }
    }else if (direction === 3){//asagı
      this.y = this.y + this.res;
      if(this.y > this.height - this.res){
        this.y = 0 ;
      }
    }else if (direction === 4){//sola
      this.x = this.x - this.res;
      if(this.x < 0){
        this.x = this.width - this.res;
      }
    }

            for(var i = this.size ; i > 0 ; i--){
              this.locationX[i] = this.locationX[i -1];
              this.locationY[i] = this.locationY[i -1];
            }
            this.locationX[0] = this.x;
            this.locationY[0] = this.y;
            this.locationX[1] = oldX;
            this.locationY[1] = oldY;



  //  console.log(this.locationX);
  }
  eat(food){
    if(food.getX() === this.x && food.getY() === this.y){

      var x;
      var y;
       if(this.direction === 1){
          x = this.locationX[this.size];
          y = this.locationY[this.size] + (this.res );
        }
        else if(this.direction === 2){
          x = this.locationX[this.size] - (this.res);
          y = this.locationY[this.size];
        }
        else if(this.direction === 3){
          x = this.locationX[this.size];
          y = this.locationY[this.size] - (this.res) ;
        }
        else if(this.direction === 4){
          x = this.locationX[this.size] + (this.res);
          y = this.locationY[this.size];
        }
      this.locationX[this.size + 1] = x;
      this.locationY[this.size + 1] = y;
        this.size ++;
      console.log(this.size);
      return true;

    }
  }
  dead(){
    var dead = false;
    for(var i = 1; i < this.size; i++){
      if(this.x === this.locationX[i] && this.y === this.locationY[i]){
         dead = true;
      }
    }
    return dead;
  }
}
