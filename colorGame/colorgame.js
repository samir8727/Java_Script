var num=6;

var color               = generateColor(num);
var squares             = document.querySelectorAll(".square");
var colorDisplay        = document.getElementById("h2");
var matchConformaton    = document.querySelector(".matchCoformation");
var reset               = document.querySelector(".reset");
var button              = document.querySelectorAll("button");
var topBar              = document.querySelector("#topBar");
var easy                = document.querySelector(".menu1");
var hard                = document.querySelector(".menu2") ;        

var pickedColor=pickColor(num);//randomly picked a color through this function
var clickedColor="";
colorDisplay.textContent=pickedColor;


//mouse click events on icon 
easy.addEventListener("click",function(){
    num=3;//new seted variable for easy mode game
    color=generateColor(num);
    
    pickedColor=pickColor(num);//pickColor is also take cmd to generate num between 3
    
    colorDisplay.textContent=pickedColor;
    for(var i=0;i<squares.length;i++){
        if(color[i])
        squares[i].style.backgroundColor=color[i];
        else
            squares[i].style.display="none";//this hiden blocks where for color is not avilable
    }
});
hard.addEventListener("click",function(){
  num=6;//new seted variable for easy mode game
    color=generateColor(num);
    
    pickedColor=pickColor(num);//pickColor is also take cmd to generate num between 3
    
    colorDisplay.textContent=pickedColor;
    for(var i=0;i<squares.length;i++){
        squares[i].style.backgroundColor=color[i];
       squares[i].style.display="block";//it showing all hiden block
    };
    
});


//if the reset button is clicked then this function is move on
reset.addEventListener("click",function(){
   
    //reset the square color;
    color = generateColor(num);
    //take new picked color fro pick color function;
    pickedColor=pickColor(num);
    //displaying the reset color on top
    colorDisplay.textContent=pickedColor;
    //duplicateing the privious code once again run a for loop to change the color
    for(var i=0;i<squares.length;i++){
        squares[i].style.backgroundColor=color[i];
        
        
        
    }
    reset.textContent="New Colors";
})




//mouse over events on icons when mouse over on icon its turn to green
//when Mouse out its turn to asusual white;
for(var i=0;i<button.length;i++){
    button[i].addEventListener("mouseover",function(){
        this.style.backgroundColor="green";
        this.style.color="white";
    });
     button[i].addEventListener("mouseout",function(){
        this.style.backgroundColor="white";
         this.style.color="#5d3ae5";
    });
    button[i].addEventListener("click",function(){
        this.style.backgroundColor="red";
        this.style.color="black";
    });
    
}



    for(var i=0;i<squares.length;i++){
        //add initial color to squares
        squares[i].style.backgroundColor=color[i];
        //add click listiner to squares
        squares[i].addEventListener("click",function(){
            //grab color of clicked square
          clickedColor = this.style.backgroundColor;
            //alert(clickedColor);
            //compare color to pick color
           if(clickedColor === pickedColor){
                matchConformaton.textContent="CORRECT";
                matchConformaton.classList.add("highlight");
                reset.textContent="Play Again?";
                colorChange(clickedColor);
                topBar.style.backgroundColor=clickedColor;
                //gameover=true;
           }
            else{
                this.style.backgroundColor="black";
                matchConformaton.textContent="TRY AGAIN";
                matchConformaton.classList.add("highlight");
            }
        });

    };
    


function colorChange(color){
    for(var i=0;i<squares.length;i++){
        squares[i].style.backgroundColor=color;
    }
}

function pickColor(num){
    var rand = Math.trunc(Math.random()*num);
    return color[rand];
}

function generateColor(num){
    //generate a EmpteyArray
    var array=[];
    //add iteams in array
    for(var i=0; i< num; i++){
        //add random color to array so we need to write a functon that 
        //generatr random color;
        array.push(randomColor());
    }
    return array;
};


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




















