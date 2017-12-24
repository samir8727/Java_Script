var canvas;
var context;
var clear;
var dragging=false;
var dragStartLocation;
var snapshot;
var lineWidth;
var displayLineWidth;
var lineCap;
var canvasBackgroundColor;
var eraser;


function randomColor(){
    //generate red between 0 to 255;
    var r = Math.trunc(Math.random()*256);
    //generate green between 0 to 255;
    var g=Math.trunc(Math.random()*256);
     //generate blue between 0 to 255;
    var b=Math.trunc(Math.random()*256);
    //rgb(255, 67, 155)
    return "rgb("+ r +", " + g +", "+ b+")";
};

function getCanvarsePosition(event){
    var x=(event.clientX-canvas.getBoundingClientRect().left);
    var y=(event.clientY-canvas.getBoundingClientRect().top);
    
    return {x: x,y: y};
}

function takeSnapshot(){
    snapshot=context.getImageData(0 ,0, canvas.width, canvas.height);
}

function restoreSnapshot(){
    context.putImageData(snapshot, 0, 0);
}

function drawLine(position){
    context.beginPath();
    context.moveTo(dragStartLocation.x,dragStartLocation.y);
    context.lineTo(position.x,position.y);
}

function drawCircle(position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
}

function drawTraiangle(position) {
    var index;
    var sides=3;
    var angle=0;
    var coordinates = [];
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
        

    for (index = 0; index < sides; index++) {
        coordinates.push({x: position.x + radius * Math.cos(angle), y: position.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }
    context.closePath();    
    
}

function drawPolygon(position, sides , angle) {
    var index;
    var coordinates = [];
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
        

    for (index = 0; index < sides; index++) {
        coordinates.push({x: position.x + radius * Math.cos(angle), y: position.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }
    context.closePath();    
}


function dragStart(event){
    dragging = true ;
    dragStartLocation=getCanvarsePosition(event);
    takeSnapshot();
}


function drag(event){
    //console.log(getCanvarsePosition(event));
    var position;
    if(dragging===true){
        restoreSnapshot();
        position=getCanvarsePosition(event);
        draw(position,"polygon");
       
        
    }
}

function dragStop(event){
    //console.log(getCanvarsePosition(event));
    var position;
    dragging=false;
    restoreSnapshot();
    position=getCanvarsePosition(event);
    draw(position,"polygon");
    
}

function draw(position,shape){
    var nameDisplay=document.getElementById("name");
    var fillBox=document.querySelector("#fillBox");
    shape=document.querySelector("input[type='radio'][name='shape']:checked").value;
    var sides=document.querySelector("#polygonSides").value;
    var angle=document.querySelector("#polygonAngle").value;
    var displaySidesValue=document.getElementById("sidesValue");
    var displayAngleValue=document.getElementById("angleValue");
    
    var fillColorInput=document.querySelector("input[type='radio'][name='fillColor']:checked").value;
    var FillChooseColor=document.querySelector("#fillColor").value;
    
    var stokeColorInput=document.querySelector("input[type='radio'][name='stokeColor']:checked").value;
    var stokeChooeColor=document.querySelector("#stokeColor").value;
    
    lineCap=document.querySelector("input[type='radio'][name='lineCap']:checked").value;
    context.lineCap = lineCap;
    
    displaySidesValue.textContent=sides;
    displaySidesValue.style.color="blue";
    displayAngleValue.textContent=angle;
    displayAngleValue.style.color="blue";
   
    if(shape === "circle")
        drawCircle(position);
    if(shape === "line")
        drawLine(position)
    if(shape === "triAngle")
        drawTraiangle(position);
    if(shape === "polygon")
        drawPolygon(position, sides ,angle * Math.PI / 180);
    
    if(fillBox.checked){
        if(fillColorInput === "automatc"){
            context.fillStyle=randomColor();
            context.fill();
            nameDisplay.style.color=(randomColor())
        }
        if(fillColorInput === "manual"){
            context.fillStyle= FillChooseColor;
            context.fill();
            nameDisplay.style.color= FillChooseColor;
        }
        if(stokeColorInput === "automatc"){
            context.strokeStyle= randomColor();
            context.stroke();
        }
        if(stokeColorInput === "manual" ){
            context.strokeStyle= stokeChooeColor;
            context.stroke();
        }
        
    }
    else{
        if(stokeColorInput === "automatc"){
            context.strokeStyle= randomColor();
            context.stroke();
            nameDisplay.style.color=(randomColor());
        }
        if(stokeColorInput === "manual"){
            context.strokeStyle= stokeChooeColor;
            context.stroke();
            nameDisplay.style.color=stokeChooeColor;
        }
    }
}


function changeLineWidth(){
    context.lineWidth=this.value;
    event.stopPropagation();
    displayLineWidth.textContent=this.value;
    
    
}

function changeBackGroundColor(){
    context.save();
    context.fillStyle=document.getElementById("canvasColor").value;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function clearScreen(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}



function init(){
    canvas=document.querySelector("#canvas");
    lineWidth=document.querySelector("#linewidth");
    displayLineWidth=document.getElementById("lineWidthValue");
    displayLineWidth.style.color="blue";
    canvasBackgroundColor=document.querySelector("#canvasColor");
    clear=document.querySelector("#clear");
    
    context=canvas.getContext("2d");
    

    canvas.addEventListener("mousedown",dragStart,false);
    canvas.addEventListener("mousemove",drag,false);
    canvas.addEventListener("mouseup",dragStop,false);
    lineWidth.addEventListener("input",changeLineWidth,false);
    canvasBackgroundColor.addEventListener("input",changeBackGroundColor,false);
    clear.addEventListener("click",clearScreen,false);
   
   //to change clear button color according to mouse move
   //this is for mouse over event
    clear.addEventListener("mouseover",function(){  
    	//mouse over on buttot then its turn to green background
        this.style.backgroundColor="green"; 
        //letters are turn to white
        this.style.color="white";		
        
    });
     clear.addEventListener("mouseout",function(){
        this.style.backgroundColor="white";
         this.style.color="#5d3ae5";
    });
    clear.addEventListener("click",function(){
        this.style.backgroundColor="red";
        this.style.color="black";
    });
    
    
}

window.addEventListener('load',init,false);