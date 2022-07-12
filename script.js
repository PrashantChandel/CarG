/*jshint esversion: 6 */
const score=document.querySelector('.score');
const startscreen=document.querySelector('.startscreen');
const gamearea=document.querySelector('.gamearea');
let engine=new Audio();
engine.src="engine.wav";
let crash=new Audio();
crash.src="crash.mp3";
startscreen.addEventListener('click',start);
let player={
  speed:10,
  score:0,
};
let keys=
{
  ArrowUp:false,
  ArrowDown:false,
  ArrowLeft:false,
  ArrowRight:false,
};
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
function keyDown(e)
{
  //console.log(e.key);
  keys[e.key]=true;
  //console.log(keys);
}
function keyUp(e)
{
  //console.log(e.key);
  keys[e.key]=false;
  //console.log(keys);
}
function moveLines()
{
  let lines=document.querySelectorAll('.lines');
  lines.forEach(function(item){
    if(item.y>=667)
    {
    item.y=item.y-750;
    }
        item.y=item.y+player.speed;
        item.style.top=item.y+"px";
  });
}
function isCollide(a,b)
{
  aRect=a.getBoundingClientRect();
  bRect=b.getBoundingClientRect();
  return !(aRect.top>bRect.bottom || aRect.left>bRect.right || aRect.right<bRect.left ||aRect.bottom<bRect.top);
}
function endGame()
{
  crash.play();
  player.start=false;

  startscreen.classList.remove('hide');
  let s=player.score+1;
  startscreen.innerHTML="Game Over <br> Your score is :"+s+"<br> Press here to restart the game";


}
function moveEnemy(car)
{
  let enemies=document.querySelectorAll('.enemy');
  enemies.forEach(function(item){
    if(isCollide(car,item))
    {
        console.log("HIT");
        endGame();
    }
    if(item.y>=667)
    {
    item.y=-300;
    item.style.left=Math.floor(Math.random()* 350)+"px";
    }

        item.y=item.y+player.speed;
        item.style.top=item.y+"px";
  });
}
function gamePlay()
{
  //console.log("Devansh");
  let car=document.querySelector('.car');
  let road=gamearea.getBoundingClientRect();
  //console.log(road);
  if(player.start)
  {
  moveLines();
  moveEnemy(car);
  if(keys.ArrowUp && player.y>(road.top+130))
  {
    player.y=player.y-player.speed;
  }
  if(keys.ArrowDown && player.y<(460))
  {
    player.y=player.y+player.speed;
  }
  if(keys.ArrowLeft && player.x>0)
  {
    player.x=player.x-player.speed;
  }
  if(keys.ArrowRight && player.x<350)
  {
    player.x=player.x+player.speed;
  }
  car.style.top=player.y+"px";
  car.style.left=player.x+"px";
  window.requestAnimationFrame(gamePlay);
  console.log(player.score);
  player.score=player.score+1;
  score.innerText="Score:"+player.score;
  }
}
function randomColor()
{
  function c()
  {
    let hex=Math.floor(Math.random()*256).toString(16);
    return (("0"+String(hex)).substr(-2));
  }
  return "#"+c()+c()+c();
}
function start()
{
  // /gamearea.classList.remove('hide');
  engine.play();
  startscreen.classList.add('hide');
  gamearea.innerHTML="";
  score.classList.remove('hide');
  player.start=true;
  player.score=0;
  window.requestAnimationFrame(gamePlay);
  for(let i=0;i<5;i++)
  {
  let roadline=document.createElement('div');
  roadline.setAttribute('class','lines');
  roadline.y=i*150;
  roadline.style.top=roadline.y+"px";
  gamearea.appendChild(roadline);
  }
  let car=document.createElement('div');
  car.setAttribute('class','car');
  gamearea.appendChild(car);
  player.x=car.offsetLeft;
  player.y=car.offsetTop;
  //console.log(car.offsetTop);
  //console.log(car.offsetLeft);

  for(let i=0;i<3;i++)
  {
  let enemyCar=document.createElement('div');
  enemyCar.setAttribute('class','enemy');
  enemyCar.y=((i+1)*350)*-1;
  enemyCar.style.top=enemyCar.y+"px";
  enemyCar.style.backgroundColor=randomColor();
  var url = "car2.png";
  enemyCar.style.backgroundImage = `url(${url})`;
  enemyCar.style.backgroundRepeat = "no-repeat";
  enemyCar.style.backgroundSize = "100% 100%  ";
  enemyCar.style.left=Math.floor(Math.random()* 350)+"px";
  gamearea.appendChild(enemyCar);
  }
}
