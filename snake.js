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

 // snakes init
 let snake = [];
 snake[0] = {
                x : 9*box,
                y : 10*box
            }
 let snake2 = [];
 snake2[0] = {
                x : 12*box,
                y : 13*box
            }            

// food init
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// scores
let score = 0;
let score2 = 0;

// directions init
let d;
let d2;

// game start
document.addEventListener("keydown", getDirection);
// control the snake
function getDirection(e){
    // snake 1
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

    // snake 2
    if (e.keyCode == 65 && d2 != "RIGHT"){
        d2 = "LEFT";
    }
    else if (e.keyCode == 87 && d2 != "DOWN"){
        d2 = "UP";
    }
    else if (e.keyCode == 68 && d2 != "LEFT"){
        d2 = "RIGHT";
    }
    else if (e.keyCode == 83 && d2 != "UP"){
        d2 = "DOWN";
    }
}
// result flags
let sWon = false;
let s2Won = false;

// detect snake collion with itself
function selfCollision(head, snake, snake2 = false){
    if (snake.length <= 1) return false;
    for(let i=0; i<snake.length; i++){
        if(head.x == snake[i].x && head.y == snake[i].y){
            if (snake2) sWon = true;
            else s2Won = true;
            return true;
        }
    }
    return false;
}
// detect player collision
function playerCollision(snake1, snake2, head1, head2){
    if (snake1.length <= 1 && snake2.length <=1) return false;
    for(let i=0; i<snake1.length; i++){
        if(head2.x == snake1[i].x && head2.y == snake1[i].y){
            if (i == 0){
                return true;
            }
            sWon = true;
            return true;
        }
    }
    for(let i=0; i<snake2.length; i++){
        if(head1.x == snake2[i].x && head1.y == snake2[i].y){
            if (i == 0){
                return true;
            }
            s2Won = true;
            return true;
        }
    }
    return false;
}
// detect collision with wall
function wallCollision(head, snake2 = false){
    if (head.x < box || head.x > 17*box || head.y < 3*box || head.y > 17*box){
        if (snake2) sWon = true;
        else s2Won = true;
        return true;
    }
    return false;
}

 // draw 
 function draw(){
     // draw the play area
     ctext.drawImage(area, 0 , 0);
     
     // draw the snakes
     for(let i = 0; i < snake.length; i++){
        ctext.fillStyle = (i == 0) ? "green" : "white";
        ctext.fillRect(snake[i].x, snake[i].y, box, box);

        ctext.strokeStyle = "red";
        ctext.strokeRect(snake[i].x, snake[i].y, box, box);
     }
     for(let i = 0; i < snake2.length; i++){
        ctext.fillStyle = (i == 0) ? "orange" : "yellow";
        ctext.fillRect(snake2[i].x, snake2[i].y, box, box);

        ctext.strokeStyle = "red";
        ctext.strokeRect(snake2[i].x, snake2[i].y, box, box);
     }

     // draw the food
     ctext.drawImage(foodI, food.x, food.y);

     // old head positions
     snakeX = snake[0].x;
     snakeY = snake[0].y;
     snake2X = snake2[0].x;
     snake2Y = snake2[0].y;

     // compute new head positions
     if (d == "LEFT") snakeX -= box;
     if (d == "UP") snakeY -= box;
     if (d == "RIGHT") snakeX += box;
     if (d == "DOWN") snakeY += box;
     if (d2 == "LEFT") snake2X -= box;
     if (d2 == "UP") snake2Y -= box;
     if (d2 == "RIGHT") snake2X += box;
     if (d2 == "DOWN") snake2Y += box;

     // new head positions
     let newHead = {
        x : snakeX,
        y : snakeY
     }
     let newHead2 = {
        x : snake2X,
        y : snake2Y
     } 

     // game over condition
     if (wallCollision(newHead) || selfCollision(newHead, snake) ||
        wallCollision(newHead2, true) || selfCollision(newHead2, snake2, true) ||
        playerCollision(snake, snake2, newHead, newHead2)){
        ctext.fillStyle = "black";
        ctext.font = "42px italic";
         if (sWon){
            ctext.fillText('Green Head Won!', 4*box, 4.5*box);
         }else if(s2Won){
            ctext.fillText('Orange Head Won!', 4*box, 4.5*box);
         }else{
            ctext.fillText('DRAW!', 8*box, 4.5*box);
         }
         clearInterval(game);
     }

     // snake eats the food
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
     if (snake2X == food.x && snake2Y == food.y){
        score2 ++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
     }
     else{
        snake2.pop();
     }

     // add new head to front
     snake.unshift(newHead);
     snake2.unshift(newHead2);

     // display score
     ctext.fillStyle = "white";
     ctext.font = "42px italic";
     ctext.fillText('P1: ', 2*box, 1.5*box);
     ctext.fillText(score, 4*box, 1.5*box);
     ctext.fillText('P2: ', 5*box, 1.5*box);
     ctext.fillText(score2, 7*box, 1.5*box);


 }
 // call draw() every 0.x secs
 let game = setInterval(draw, 300);
   