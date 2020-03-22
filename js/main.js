//this method of hit detection might not have been the best way to do hit dectection, but for the assignment is was compatible
//because the objects are not dynamically created and the colors are specified before hand
//Canvas
const canvas = document.querySelector('#canvas1');
canvas.width = 800;
canvas.height = 460;
const ctx = canvas.getContext('2d');

ctx.font = "100px Helvetica";
ctx.fillStyle = "blue";
ctx.fillText("C",canvas.width/2-200,405);
ctx.fillStyle = "green";
ctx.fillText("O",canvas.width/2-130,415);
ctx.fillStyle = "red";
ctx.fillText("L",canvas.width/2-55,405);
ctx.fillStyle = "red";
ctx.fillText("O",canvas.width/2+0,405);
ctx.fillStyle = "green";
ctx.fillText("R",canvas.width/2+75,415);
ctx.fillStyle = "blue";
ctx.fillText("S",canvas.width/2+140,405);
ctx.font = "30px Helvetica";
ctx.fillStyle = "brown";
ctx.textAlign = "center";
ctx.fillText("Click on shape to PLAY",canvas.width/2,445);

//Empty Object For Storing Other Objects
const colorsHash = {};

let radius = 60;

//Cricle objects without ColorHashs
// x : y is the starting position, radius is radius of circle, color is color
// id is the main part of each object, not only  does is say what color the object represents but it is used as a string for the audio and also the display text
const xPositionsGain = 150; 
const yCirclePosition = 220;
const circles = [
    {id: ' Yellow', x: 100+xPositionsGain*0, y: yCirclePosition, radius: radius, color: 'rgb(255,255,0)'}, 
    {id: ' Green', x: 100+xPositionsGain*1, y: yCirclePosition, radius: radius, color: 'rgb(0,128,0)'},
    {id: ' Blue', x: 100+xPositionsGain*2, y: yCirclePosition, radius: radius, color: 'rgb(0,0,255)'},
    {id: ' Brown', x: 100+xPositionsGain*3, y: yCirclePosition, radius: radius, color: 'rgb(165,42,42)'},
    {id: ' Pink', x: 100+xPositionsGain*4, y: yCirclePosition, radius: radius, color: 'rgb(255,192,203)'},
];

//for each color object created, 

circles.forEach(circle => {	
  while(true) {
    if (!colorsHash[circle.color]) {colorsHash[circle.color] = circle;     return;}
  }});

//for each circle object created, draws cirles into the canvas and the hit canvas but uses the user color on the canvas and uses the colorkey for the hit canvas
circles.forEach(circle => {
    //draws cirles into the canvas  uses the user color for color
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = circle.color;
  ctx.fill();
});

function Text(text) {
  ctx.font = "100px Helvetica";
  ctx.fillStyle = text;
  ctx.textAlign = "center";
  ctx.fillText(text,canvas.width/2,100);
  setTimeout(() => ctx.clearRect(0,0,canvas.width,105), 6300);
}

//creates an event listener
canvas.addEventListener('click', (e) => {
  const mousePos = {
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop
  };

  // grabs the image color in 1 pixel on the canvas at the position of the mouse click
  const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
  
  //seperates the color of the rgba
  const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  // console.log(color);
  
  //finds the property with the name that is specifid in color
  const shape = colorsHash[color];

  //if shapes is active the alert its id
  if (shape) {
    Text(shape.id);
    var audio = new Audio("audio/Color"+shape.id+".mp3");
    audio.play();
  }
 });

// //Sets Music Default Volume
document.querySelector("#background-music").volume = 0.1;