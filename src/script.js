let currentLine=0
let currentCell=0
let answer='attack'
let currentGuess=[]

document.addEventListener("DOMContentLoaded",function(){
    gameLoop();
});

function gameLoop(){
    document.addEventListener("keydown",(event)=>{
        let k=event.key

        if(k==="Enter"){
            if (currentCell==6) {
                currentLine+=(currentLine<6);
                currentCell=0;
                checkGuess()
                currentGuess=[]; // clear 
            }
        }
        else if(k==="Backspace"){
            if (currentCell>=0) {
                currentCell-=(currentCell>0);
                document.getElementById(`l${currentLine}c${currentCell}`).textContent=' ';
                currentGuess.pop();
            }
        }
        else if((k.toLowerCase()!=k.toUpperCase()) && k.length==1){
            if(currentCell<6){
                document.getElementById(`l${currentLine}c${currentCell}`).textContent=k.toUpperCase();
                currentGuess.push(k.toLowerCase());
                currentCell++;
            }
        }
    });
}

function checkGuess(){
    let answerCopy=[...answer]

    for (let i = 0; i < 6; i++) {
        if(currentGuess[i]===answerCopy[i]){
            document.getElementById(`l${currentLine-1}c${i}`).classList.remove('bg-gray-500');
            document.getElementById(`l${currentLine-1}c${i}`).classList.add('bg-green-500');
            answerCopy[i]='!';
        }
    }

    for (let i = 0; i < 6; i++) {
        //
        for(let j=0;j<6;j++){
            if(document.getElementById(`l${currentLine-1}c${i}`).classList.contains('bg-gray-500')){
                if(currentGuess[i]===answerCopy[j]){
                    document.getElementById(`l${currentLine-1}c${i}`).classList.remove('bg-gray-500');
                    document.getElementById(`l${currentLine-1}c${i}`).classList.add('bg-orange-500');
                    answerCopy[j]='!';
                }
            }
        }
    }
}