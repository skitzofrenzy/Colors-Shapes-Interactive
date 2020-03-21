//First Canvas
const canvas = document.querySelector('#canvas1');
canvas.width = window.innerWidth;
canvas.height = 500;
const ctx = canvas.getContext('2d');

//Second Canvas For Color Hit Detection
const hitCanvas = document.createElement('canvas');
hitCanvas.width = window.innerWidth;
hitCanvas.height = 500;
const hitCtx = hitCanvas.getContext('2d');

//Empty Object For Storing Other Objects
const colorsHash = {};

//Random Color Function
function getRandomColor() {
 const r = Math.round(Math.random() * 255);
 const g = Math.round(Math.random() * 255);
 const b = Math.round(Math.random() * 255);
 return `rgb(${r},${g},${b})`;
}


let radius = 60;

//Cricle objects without ColorHashs
const circles = [
    {id: ' Yellow', x: 100, y: 250, radius: radius, color: 'yellow'}, 
    {id: ' Green', x: 240, y: 250, radius: radius, color: 'green'},
    {id: ' Blue', x: 380, y: 250, radius: radius, color: 'blue'}
];

//for each color object created, Gets a random color saves it to colorkey and creates an object and names it using the colorkey and inside the colorket object is stored the new circle object with an additional variable colorkey.

circles.forEach(circle => {
	while(true) {
        // Gets a random color saves it to colorkey
     const colorKey = getRandomColor();
     //if colorhash is empty
     if (!colorsHash[colorKey]) {
        circle.colorKey = colorKey;
        colorsHash[colorKey] = circle;
        return;
     }
  }
});

//for each circle object created, draws cirles into the canvas and the hit canvas but uses the user color on the canvas and uses the colorkey for the hit canvas
circles.forEach(circle => {
    //draws cirles into the canvas  uses the user color for color
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = circle.color;
  ctx.fill();
  //draws on the hit canvas uses the colorkey for color
  hitCtx.beginPath();
  hitCtx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
  hitCtx.fillStyle = circle.colorKey;
  hitCtx.fill();
});

//useless function that compares color
function hasSameColor(color, shape) {
  return shape.color === color;
}

function Text(text) {
  ctx.font = "100px Helvetica";
  ctx.fillStyle = text;
  ctx.fillText(text,canvas.width/2,100);
  setTimeout(() => {
    ctx.clearRect(canvas.width/2,0,350,110);
  }, 6300);
}

//creates an event listener
canvas.addEventListener('click', (e) => {
  const mousePos = {
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop
  };

  // grabs the image on the hit canvas at the position of the mouse click
  const pixel = hitCtx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
  const pixel2 = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
  
  //seperates the color of the rgba
  const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
  const color2 = `rgb(${pixel2[0]},${pixel2[1]},${pixel2[2]})`;
  console.log(color2);
  
  //saves the color into 
  const shape = colorsHash[color];

  //if shapes is active the alert its id
  if (shape) {
    Text(shape.id);
    
    
    var audio = new Audio("audio/Color"+shape.id+".mp3");
     audio.play();
  }
 });

 
// function AudioFile(color) {
//     console.log("audio/Color"+color+".mp3")
//     var audio = new Audio("audio/Color"+color+".mp3");
//     audio.play();
// }


// var canvas = document.querySelector("#canvas1");
// // console.log(canvas)
// var canvasWidth = 1280;
// var canvasHeight = 500;
// canvas.width = window.innerWidth;
// canvas.height = canvasHeight;

// var ctx = canvas.getContext("2d");

// var mouse = {
//     x:undefined,
//     y:undefined
// }

// addEventListener("mousemove",(event) => {
//     // console.log(event);
//     mouse.x = event.x;
//     mouse.y = event.y;
// });

// // var rect_x = 50;
// // var rect_y = 50;
// // var rect_width = 200;
// // var rect_height = 50;



// function randomArr(Array) {
//     return Math.floor(Math.random() * Array.length)
// }

// // ctx.fillStyle = color_arr[color_pick];
// // ctx.fillRect(rect_x,rect_y,rect_width,rect_height);

// function randomIntFromRange(min,max){
//     return Math.floor(Math.random()* (max-min +1)+min)
// }

// function DistanceFormula(x1,y1,x2,y2) {
//     const xDist = x2-x1;
//     const yDist = y2-y1;

//     return Math.sqrt(Math.pow(xDist,2)+Math.pow(yDist,2));
// }

// let aplay = 0;

// function MyCircle(x,y,radius,color){
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
    
//     this.Draw = () => {
//         ctx.beginPath();
//         ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
//         ctx.stroke();
//         ctx.fillStyle = color;
//         ctx.fill();
//         ctx.closePath();
//     };

//     this.Update = () => {
//         this.Draw();
        
//         if (DistanceFormula(mouse.x,mouse.y,this.x,this.y) < radius) {
//             console.log("collid"+color);
//             // AudioFile(color);
//         }
//     };
// }

// var iterations = 4;
// let objects;
// var color_arr = [" Orange"," Green"," Blue", " Brown", " Pink"];

// function Init() {
//     objects = [];    

//     for (let i = 0; i < iterations; i++) {  
//         var radius = 80;
//         let circle_x = randomIntFromRange(radius,canvas.width-radius);
//         let circle_y = randomIntFromRange(radius,canvas.height- radius);
//         objects.push(new MyCircle(circle_x,circle_y,radius,color_arr[i]));
        
//         if (i !== 0) {
//             console.log(i);
//             for (let j = 0; j < objects.length; j++) {
//                 if (DistanceFormula(circle_x,circle_y,objects[j].x,objects[j].x)-radius*2 < 0) { 
//                     circle_x = randomIntFromRange(radius,canvas.width-radius);
//                     circle_y = randomIntFromRange(radius,canvas.height-radius);
//                     console.log(j);
//                     j = -1;
//                 }
//             }
//         }//if i !== 0 END
//     }//for iterations END
//     for (let i = 0; i < objects.length; i++) {
//         objects[i].Update();
//         // console.log(objects[i].color);
//         // objects[i].addEventListener("click",AudioFile(objects[i]).color);  
//     }
// }//END Init


// // function Animate() {
// //     requestAnimationFrame(Animate);
// //     ctx.clearRect(0,0,canvas.width,canvas.height);
// //     // ctx.fillText("HTML CANVAS",mouse.x,mouse.y);
// //     for (let i = 0; i < objects.length; i++) {
// //         objects[i].Update();  
// //     }
// // }
    
// Init();
// // Animate();
// // MyCircle.addEventListener("mouseover",function(event){
// //             console.log(event);
// //             if (event.x == this.x){ console.log("touch")}
// //         if (event.y == this.y){ console.log("touch")}
// //         });

// // var shapeArray=[];

// // for (let i = 0; i < iterations; i++) {
// //     console.log(canvas.height);
// //     var radius = 80;
// //     var circle_x = Math.random() * (canvas.width-radius*2) + radius;
// //     var circle_y = Math.random() * (canvas.height-radius*2) + radius;
// //     shapeArray.push(new MyCircle(circle_x,circle_y,radius,color_arr[i]));
// // }




// function MouseOver() {
//     console.log("wowo");
// }

// //Sets Music Default Volume
document.querySelector("#background-music").volume = 0.0;