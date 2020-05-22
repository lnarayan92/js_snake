// get canvas and set context
const canv = document.getElementById("snake");
const ctext = canv.getContext("2d");

 // set unit
 const box = 32;

 // load imgs
 const area = new Image();
 area.src = 'images/area_1.png';

 const foodI = new Image();
 foodI.src = 'images/food.png';

 // snake
 let snake = [];
 snake[0] = {
                x : 9*box,
                y : 10*box
            }    

// food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// score
let score = 0;

let d;
// control the snake
document.addEventListener("keydown", getDirection);
function getDirection(e){
    if (e.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
    }
    else if (e.keyCode == 38 && d != "DOWN"){
        d = "UP";
    }
    else if (e.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
    }
    else if (e.keyCode == 40 && d != "UP"){
        d = "DOWN";
    }
}

// detect snake collion with itself
function collision(head, snake){
    for(let i=0; i<snake.length; i++){
        if(head.x == snake[i].x && head.y == snake[i].y){
            return true;
        }
    }
    return false;
}

 // draw 
 function draw(){
     // draw the play area
     ctext.drawImage(area, 0 , 0);
     
     // draw the snake
     for(let i = 0; i < snake.length; i++){
        ctext.fillStyle = (i == 0) ? "green" : "white";
        ctext.fillRect(snake[i].x, snake[i].y, box, box);

        ctext.strokeStyle = "red";
        ctext.strokeRect(snake[i].x, snake[i].y, box, box);
     }

     // draw the food
     ctext.drawImage(foodI, food.x, food.y);

     // old head position
     snakeX = snake[0].x;
     snakeY = snake[0].y;
     // compute new head position
     if (d == "LEFT") snakeX -= box;
     if (d == "UP") snakeY -= box;
     if (d == "RIGHT") snakeX += box;
     if (d == "DOWN") snakeY += box;
     // if snake eats the food
     if (snakeX == food.x && snakeY == food.y){
        // increment score
        score ++;
        // generate new food position 
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // do not remove tail
     }
     else{
        // remove the tail
        snake.pop();
     }
     // new head position
     let newHead = {
        x : snakeX,
        y : snakeY
    }  
     // game over condition
     if (snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)){
         clearInterval(game);
     }
     // add new head to front 
     snake.unshift(newHead);

     // display score
     ctext.fillStyle = "white";
     ctext.font = "42px italic";
     ctext.fillText(score, 3*box, 1.5*box);


 }

 let game = setInterval(draw, 200);