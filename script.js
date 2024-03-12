const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
// getContext("2d") 是JS內建的函式，用來建立畫布
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


let snakeX = snake[0].x;
let snakeY = snake[0].y;

// 蛇預設移動的方向
let direction = "Right";
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    if (direction !== "Left") {
      direction = "Right";
    }
  } else if (e.key === "ArrowLeft") {
    if (direction !== "Right") {
      direction = "Left";
    }
  } else if (e.key === "ArrowUp") {
    if (direction !== "Down") {
      direction = "Up";
    }
  } else if (e.key === "ArrowDown") {
    if (direction !== "Up") {
      direction = "Down";
    }
  }
})

let food = {
  x: null,
  y: null,
};

function generateFood() {
  let overlap;
  do {
    overlap = false;
    food.x = Math.floor(Math.random() * column) * gameBlock;
    food.y = Math.floor(Math.random() * row) * gameBlock;
    // 檢查食物是否生成在蛇身上
    snake.forEach(function(part) {
      if (part.x == food.x && part.y == food.y) {
        overlap = true;
      }
    });
  } while (overlap); // 如果食物生成在蛇身上，重新生成
}

function drawFood() {
  ctx.fillStyle = "green";
  ctx.fillRect(food.x, food.y, gameBlock, gameBlock);
  ctx.strokeStyle = "white";
  ctx.strokeRect(food.x, food.y, gameBlock, gameBlock);
};

function draw() {
  // 每次畫圖之前，確認蛇有沒有咬到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(game);
      alert("遊戲結束");
      return;
    }
  }
  // 每次重置畫布，才不會讓蛇的殘影留在畫布上
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);

  drawFood();

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


  // 蛇移動
  if (direction == "Right") {
    snakeX += gameBlock;
  } else if (direction == "Left") {
    snakeX -= gameBlock;
  } else if (direction == "Up") {
    snakeY -= gameBlock;
  } else if (direction == "Down") {
    snakeY += gameBlock;
  }

  // 穿越牆壁從另一邊出現
  if (snakeX < 0) {
    snakeX = gameBoard.width - gameBlock;
  } else if (snakeX >= gameBoard.width) {
    snakeX = 0;
  };

  if (snakeY < 0) {
    snakeY = gameBoard.height - gameBlock;
  } else if (snakeY >= gameBoard.height) {
    snakeY = 0;
  };


  // 吃到食物
  if (snakeX == food.x && snakeY == food.y) {
    snake.push({ x: food.x, y: food.y });
    generateFood();
    drawFood();
  } else {
    snake.pop();
    snake.unshift({ x: snakeX, y: snakeY });
  }


}

generateFood();
let game = setInterval(draw, 100);
