const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");

const gameBlock = 20; //一格格子的大小
const row = gameBoard.height / gameBlock;  //400/20 = 20
const column = gameBoard.width / gameBlock;  //400/20 = 20

//初始化蛇身座標，蛇身一開始只有4個位置
let snake = [];
snake[0] = {
  x: 80,
  y: 0,
};

snake[1] = {
  x: 60,
  y: 0,
};

snake[2] = {
  x: 40,
  y: 0,
};

snake[3] = {
  x: 20,
  y: 0,
};

for (let i = 0; i < snake.length; i++) {
  if (i == 0) {
    ctx.fillStyle = "red";
  } else
    ctx.fillStyle = "gray";

  // 填滿蛇身 x,y 為蛇身的座標, gameBlock 為一格格子的 width height
  ctx.fillRect(snake[i].x, snake[i].y, gameBlock, gameBlock);
  ctx.strokeStyle = "white";
  ctx.strokeRect(snake[i].x, snake[i].y, gameBlock, gameBlock);
}
