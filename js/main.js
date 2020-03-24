//this method of hit detection might not have been the best way to do hit dectection, but for the assignment is was compatible
//because the objects are not dynamically created and the colors are specified before hand
//Canvas 1
const canvas = document.querySelector('#canvas1');
canvas.width = 800;
canvas.height = 460;
const ctx = canvas.getContext('2d');

CanvasTitle1();




// Canvas 3
const canvasTri = document.querySelector('#canvas3');
canvasTri.width = 800;
canvasTri.height = 120;
const ctxTri = canvasTri.getContext('2d');


//Empty Object For Storing Other Objects
const colorsHash = {};
//Iterations is a major part of code, it tells the program how many circles to push out
let iterations = 3;
let radius = 70;

//Cricle objects without ColorHashs
// x : y is the starting position, radius is radius of circle, color is color
// id is the main part of each object, not only  does is say what color the object represents but it is used as a string for the audio and also the display text
const xPositionsGain = 150; 
const yCirclePosition = 220;
const circles = [
    {id: ' Yellow', x: 100, y: yCirclePosition, radius: radius, color: 'rgb(255,255,0)'}, 
    {id: ' Green', x: 100, y: yCirclePosition, radius: radius, color: 'rgb(0,128,0)'},
    {id: ' Blue', x: 100, y: yCirclePosition, radius: radius, color: 'rgb(0,0,255)'},
    {id: ' Brown', x: 100, y: yCirclePosition, radius: radius, color: 'rgb(165,42,42)'},
    {id: ' Pink', x: 100, y: yCirclePosition, radius: radius, color: 'rgb(255,192,203)'},
];

//for each color object created, if colorhash doesnt have a property as the coresponding circle color then, create one
for (let index = 0; index < iterations; index++) {
  while(true) {
    if (!colorsHash[circles[index].color]) {colorsHash[circles[index].color] = circles[index];     break;}
  }
}

//for each circle object created, draws cirles into the canvas and the hit canvas but uses the user color on the canvas and uses the colorkey for the hit canvas
for (let index = 0; index < iterations; index++) {
  ctx.beginPath();
  ctx.arc(circles[index].x+xPositionsGain*index, circles[index].y, circles[index].radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = circles[index].color;
  ctx.fill();
}

//creates an event listener
canvas.addEventListener('click', (e) => {
  console.log(e);
  const mousePos = {
    x: e.pageX - canvas.offsetLeft,
    y: e.pageY - canvas.offsetTop
  };
  console.log(mousePos);
  

  // grabs the image color in 1 pixel on the canvas at the position of the mouse click
  const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
  
  //seperates the color of the rgba
  const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  // console.log(color);
  
  //finds the property with the name that is specifid in color
  const circle = colorsHash[color];

  //if circles is active the alert its id
  if (circle) {
    Text(circle.id,circle.id,ctx,canvas,6400);
    var audio = new Audio("audio/Color"+circle.id+".mp3");
    audio.play();
  }
 });


 //Code for Circle/circle Color Title
 function Text(text,textColor,canvasContext,canvasSelected,timer) {
  canvasContext.font = "90px Helvetica";
  canvasContext.fillStyle = textColor;
  canvasContext.textAlign = "center";
  canvasContext.fillText(text,canvasSelected.width/2,100);
  setTimeout(() => canvasContext.clearRect(0,0,canvasSelected.width,100+19), timer);
}

 //Code For Color Title and Sub-Title
 function CanvasTitle1() {
  ctx.font = "100px Helvetica";
  ctx.fillStyle = "rgb(0,1,255)";
  ctx.fillText("C",canvas.width/2-200,405);
  ctx.fillStyle = "rgb(0,128,1)";
  ctx.fillText("O",canvas.width/2-130,415);
  ctx.fillStyle = "rgb(255,128,0)";
  ctx.fillText("L",canvas.width/2-55,405);
  ctx.fillStyle = "rgb(255,128,0)";
  ctx.fillText("O",canvas.width/2+0,405);
  ctx.fillStyle = "rgb(0,128,1)";
  ctx.fillText("R",canvas.width/2+75,415);
  ctx.fillStyle = "rgb(0,1,255)";
  ctx.fillText("S",canvas.width/2+140,405);
  ctx.font = "30px Helvetica";
  ctx.fillStyle = "brown";
  ctx.textAlign = "center";
  ctx.fillText("Click on a circle to PLAY",canvas.width/2,445);
}



// //Sets Music Default Volume
document.querySelector("#background-music").volume = 0.03;





//  ++++++++++++++++++       CanvasDou BEGIN  +++++++++++++++++++++++++++++++++++++++
// Canvas 2
const canvasDou = document.querySelector('#canvas2');
canvasDou.width = 420;
canvasDou.height = 600;
const ctxDou = canvasDou.getContext('2d');
CanvasTitle2();

const shapes = [];

// Add event listener for `click` events.
canvasDou.addEventListener('click', function(e) {
    const mousePos = {
          x: e.pageX - canvasDou.offsetLeft,
          y: e.pageY - canvasDou.offsetTop
        };
    console.log(mousePos.x, mousePos.y);
    shapes.forEach((shape) => {
        if (mousePos.y > shape.top && mousePos.y < shape.top + shape.height &&mousePos.x > shape.left &&mousePos.x < shape.left + shape.width) {
            console.log(shape.id);
            // alert('clicked an shape'+shape.id);
            var audio = new Audio("audio/Shape"+shape.id+".mp3");
            audio.play();
            Text(shape.id,shape.color,ctxDou,canvasDou,1000);
        }
    });
}, false);


const width = canvasDou.width/2-10,
height = 205-10;

// Add shape.
shapes.push(
  {
    colour: '#05EFFF',
    width: width,
    height: height,
    top: 120,
    left: 5,
    id:" Square",
    draw: function() {
      ctxDou.beginPath();
      ctxDou.lineWidth = "4";
      ctxDou.strokeStyle = "black";
      ctxDou.rect(this.left+20,this.top+20,160,160);
      ctxDou.stroke();
      ctxDou.closePath();
    }
  },
  {
    colour: '#f5E22F',
    width: width,
    height: height,
    top: 120,
    left: 210,
    id:" Triangle",
    draw: function() {
      ctxDou.beginPath();
      ctxDou.moveTo(this.left+30,this.top+30);      
      ctxDou.lineTo(240,290);      
      ctxDou.lineTo(380,290);      
      ctxDou.closePath();
      ctxDou.stroke();
    }
  },
  {
    colour: '#f3345F',
    width: width,
    height: height,
    top: 320,
    left: 5,
    id:" Circle",
    radius:80,
    draw: function() {
      ctxDou.beginPath();
      ctxDou.arc(this.left+20+this.radius,this.top+100,this.radius,Math.PI*2,0,false);     
      ctxDou.closePath();
      ctxDou.stroke();
    }
  },
  {
    colour: '#00E700',
    width: width,
    height: height,
    top: 320,
    left: 210,
    id:" Rectangle",
    draw: function() {
      ctxDou.beginPath();
      ctxDou.strokeStyle = "black";
      ctxDou.rect(this.left+20,this.top+50,160,100);
      ctxDou.stroke();
      ctxDou.closePath();
    }
  }
);

// Render shapes.
shapes.forEach((shape) => {
    ctxDou.fillStyle = shape.colour;
    ctxDou.fillRect(shape.left, shape.top, shape.width, shape.height);
    shape.draw();
});

//Code For Color Title and Sub-Title
function CanvasTitle2() {
  ctxDou.font = "50px Helvetica";
  ctxDou.fillStyle = "rgb(0,1,255)";
  ctxDou.fillText("S",canvasDou.width/2-120,555);
  ctxDou.fillStyle = "rgb(0,128,1)";
  ctxDou.fillText("H",canvasDou.width/2-85,560);
  ctxDou.fillStyle = "rgb(255,128,0)";
  ctxDou.fillText("A",canvasDou.width/2-45,555);
  ctxDou.fillStyle = "rgb(255,128,0)";
  ctxDou.fillText("P",canvasDou.width/2-10,555);
  ctxDou.fillStyle = "rgb(0,128,1)";
  ctxDou.fillText("E",canvasDou.width/2+25,560);
  ctxDou.fillStyle = "rgb(0,1,255)";
  ctxDou.fillText("S",canvasDou.width/2+60,555);
  ctxDou.font = "30px Helvetica";
  ctxDou.fillStyle = "brown";
  ctxDou.textAlign = "center";
  ctxDou.fillText("Click on a shapes to PLAY",canvasDou.width/2,585);
}
//  ++++++++++++++++++       CanvasDou END  +++++++++++++++++++++++++++++++++++++++++

