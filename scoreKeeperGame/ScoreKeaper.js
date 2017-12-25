var player1=document.getElementById("b1");
var player2=document.getElementById("b2");
var reset=document.getElementById("b3");
var p1Display=document.getElementById("span1");
var p2Display=document.getElementById("span2");
var playingTo=document.getElementById("spanp");
var inputBox=document.querySelector("#input");
var h1=document.getElementById("h2");
 
var p1Score=0;
var p2Score=0;
var gameOver=false;
var gameWin=5;



player1.addEventListener("click",function(){
    if(!gameOver){
        p1Score++;
        if(p1Score===gameWin){
            p1Display.style.color="green";
            h1.classList.toggle("notifay");
            h1.textContent="Player 1 is win the match";
            gameOver=true;
        }
    }
   
    p1Display.textContent=p1Score;
})

player2.addEventListener("click",function(){
     if(!gameOver){
        p2Score++;
        if(p2Score===gameWin){
             p2Display.style.color="green";
             h1.classList.toggle("notifay");
             h1.textContent="Player 2 is win the match";
            gameOver=true;
        }
    }
    
    p2Display.textContent=p2Score;
})

inputBox.addEventListener("change",function(){
    gameWin=Number(inputBox.value);
    playingTo.textContent=gameWin;
    reset();
});

reset.addEventListener("click",function(){
   reset();
})

var reset=function(){
     p1Score=0;
    p2Score=0;
    p1Display.textContent=p1Score;
    p2Display.textContent=p2Score;
    p1Display.style.color="black";
    p2Display.style.color="black";
    gameOver=false;
    h1.textContent="Score";
    h1.classList.toggle("notifay");
};


//..................................................

var lis=document.querySelectorAll("li");

    for(var i=0;i<lis.length;i++){
        lis[i].addEventListener("mouseover",function(){
            this.classList.toggle("selected");
        });
        lis[i].addEventListener("mouseout",function(){
            this.classList.toggle("unselect");
        });
        lis[i].addEventListener("click",function(){
            this.classList.toggle("done");
        })
        
    };







