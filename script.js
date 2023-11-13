const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid; // for knowing current status of game ..is we need to give more turns to player or game finish 

const winningPositions = [ // kon kon position se jeet skte hai
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6],
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";    // starting mei current player - X rhega
    gameGrid = ["","","","","","","","",""];   // and Saari cell empty rhegi

    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";    // box ko empty kr denge new game button pr click krte hee
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });

       newGameBtn.classList.remove("active");
     // Current player-X ko UI par dikhane ke liye value render krni padegi
       gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame(); // calling above function

/* Now chuke grid(box) pr click krne se kuch nhi aa rha to saare boxes ke uppar Event Listener lgana chahiye and note that if kisi box pr click kr diya to wo click box ko unclickable krdena hai taake value change naa ho phir */
// SWAP TURN FUNCTION
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


/* CHECK GAME OVER FUNCTION */
function checkGameOver(){
    let answer="";  // jeeta kon pta nhi so empty

    //iterate on winning position --> teeno position pr kya same value hai if yes then win declared
    winningPositions.forEach((position) => {      
         //all 3 boxes should be non-empty and exactly same in value 
         if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
                   //check if winner is X
                   if(gameGrid[position[0]] === "X")
                   answer = "X";
                   else{
                   answer = "O";
                  } 

                //disable pointer events
                 boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                // Now we know X/O is a winner so uss boxes pr green color mark krne honge
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });
      
     // It means we have a winner so we need to show status who is winner and new game button ko activate krege 
     if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return; // if any player win so return it
     }

       //We know, NO Winner Found, let's check whether there is tie
       let fillCount = 0;
       gameGrid.forEach((box) => {
       if(box !== "" )
        fillCount++;
    });

      //board is Filled, game is TIE
      if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}



/* HANDLE CLICK FUNCTION */
function handleClick(index){
    if(gameGrid[index] === "" ){ // agar box empty hai if yes then we processed
        boxes[index].innerText = currentPlayer;  // box ke under X ya 0 aa gya and ye wali line UI mei change krti hai
        gameGrid[index] = currentPlayer;   // aur ye wali line initGame() mei jo gameGrid likha hai usme change krti hai
        boxes[index].style.pointerEvents = "none"; // jis cell mei value chala gya usme cursor:pointer ko rokne ke liye we use this
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener('click', () =>{
        handleClick(index);   // index is cell number taake hum pta lga ske ki kon sa box tick hua hai and exact box ka class bna skege
    })
});

/* NEW GAME BUTTON PR EVENT LISTENER--> jbb bhi new game pr click kr rhe to game starting se aa jati hai so we can say it call initgame() function */
newGameBtn.addEventListener("click", initGame);