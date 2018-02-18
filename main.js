$(function() {
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  var speed = 300;
  var level = 1;
  var width = 660;
  var height = 660;
  var direction = 0;
  var gameStart = false;
  var keychangable = true;
  var gameInfo = document.getElementById("gameInfo");
  console.log(height);
  console.log(width);
  var res = 60;
  var score = 0;
  var alreadybonus = false;
  var imgRed = new Image(60,60);
  imgRed.src = './img/redapple.png';
  var imgGreen = new Image(60,60);
  imgGreen.src = './img/greenapple.png';
  var food = new Food(ctx, width, height, res, Math.floor((Math.random() * 10) + 1) * res , Math.floor((Math.random() * 10) + 1)* res, "blue", imgRed);
  var foodbonus = null;
  var snake = new Snake(ctx, width, height, res, width/2 - 30, height/2 - 30);
  for(var i = 0; i < width; i = i + res){
    for(var j = 0; j < height; j = j + res){
      ctx.strokeStyle="black";
      ctx.rect(i, j, res, res);
      console.log()
      ctx.stroke();
    }
  }
  document.addEventListener('keypress', function(e){
    console.log(direction);
    if(keychangable){
      if(event.keyCode === 119){//yukarı
        if(direction !== 3){
          direction = 1;
          keychangable = false;
        }
        gameStart = true;

      }else if (event.keyCode === 100){//saga
        if(direction === 0) {
          direction = 0;
        }else if (direction === 4){
          direction = 4;
        }else{
          direction = 2;
          gameStart = true;
          keychangable = false;
        }

      }else if (event.keyCode === 115){//asagı
        if(direction !== 1){
            direction = 3;
            keychangable = false;
        }

        gameStart = true;
      }else if (event.keyCode === 97){//sola
        if(direction !== 2){
          direction = 4;
          keychangable = false;
        }
        gameStart = true;
      }
    }

    else if (event.keyCode === 32){//sola
      gameStart = false;
      for(var i = 0; i < width; i = i + res){
        for(var j = 0; j < height; j = j + res){
          ctx.fillStyle="white";
          ctx.rect(i, j, res, res);
          ctx.fill();
        }
      }
      snake = new Snake(ctx, width, height, res, width/2 - 30, height/2 - 30);
      food = new Food(ctx, width, height, res, Math.floor((Math.random() * 10) + 1) * res , Math.floor((Math.random() * 10) + 1)* res, "blue", imgRed);
      score = 0;
      direction = 0;
      level = 1;
      speed = 300;
      snake.draw();
      food.draw();
    }
    console.log(gameStart);
})
snake.draw();
food.draw();
if(foodbonus != null){
  foodbonus.draw();
}
console.log("gamestart" + gameStart);

function playGame(){
  console.log(speed);
  if(gameStart && !snake.dead()){
    for(var i = 0; i < width; i = i + res){
      for(var j = 0; j < height; j = j + res){
        ctx.fillStyle="white";
        ctx.rect(i, j, res, res);
        ctx.fill();
      }
    }
    if(Math.floor(score/20) === level){
      level ++;
      console.log("level " + level + " speed " + speed);
      speed = speed / 1.3 ;
    }
    snake.move(direction);
    food.draw();
    if(foodbonus != null){
      foodbonus.draw();
    }
    snake.draw();


    if(snake.eat(food)){
      var ok = false;
      while(!ok){
        var randX =  Math.floor((Math.random() * 10) + 1) * res;
        var randY =  Math.floor((Math.random() * 10) + 1) * res;
        var ok1 = false;
        for(var i = 0; i < snake.locationX.length; i++){
          if(randX === snake.locationX[i] && randY === snake.locationY[i]){
            ok1 = true;
          }
        }

        if(ok1){
          ok = false;
        }else{
          ok = true;
        }

      }
      food = new Food(ctx, width, height, res, randX , randY, "blue", imgRed);
      score ++;
      if(score % 1 === 0 ){
        ok = false;
        while(!ok){
           randX =  Math.floor((Math.random() * 10) + 1) * res;
           randY =  Math.floor((Math.random() * 10) + 1) * res;
           ok1 = false;
          for(var i = 0; i < snake.locationX.length; i++){
            if(randX === snake.locationX[i] && randY === snake.locationY[i]){
              ok1 = true;
            }
          }

          if(ok1){
            ok = false;
          }else{
            if(randX === food.getX() && randY === food.getY()){
              ok =false;
            }else{
              ok = true;
            }

          }

        }
        foodbonus = new Food(ctx, width, height, res, randX, randY, "black", imgGreen);

         foodbonus.draw();
           setInterval(() => {
             foodbonus = null;
           }, 30000);
         console.log("bonus food");
      }

    }
    if(foodbonus !== null){
      if(snake.eat(foodbonus)){
        score = score + 5;
        foodbonus = null;

      }
    }

    gameInfo.innerHTML = "Iyi oyunlar <br> Skor: " + score ;
    setTimeout(playGame, speed);
  }else if (!gameStart){
    gameInfo.innerHTML = "Baslamak icin W A S D <br>  -";
    setTimeout(playGame, speed);
  }else if(snake.dead()){
    gameInfo.innerHTML = "Oyun bitti skorun: "+ score + "<br> Yeni oyun icin SPACE" ;
    setTimeout(playGame, speed);
  }
  keychangable = true;
}


playGame();


});
