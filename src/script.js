let currentLine=0
let currentCell=0
let answer=null
let dict=null
let currentGuess=[]
const backendURL='http://localhost:8000'

document.addEventListener("DOMContentLoaded",async function(){
    drawGameDiv(6,6)
    drawKeyboard()
    let dictResponse=await fetch(`${backendURL}/dict`);
    if(dictResponse.ok){
        dict=await dictResponse.json();        
    }
    else{
        console.log(`/dict call failed ${dictResponse.status}`);
    }
    let answerResponse=await fetch(`${backendURL}/game`);
    if (!answerResponse.ok) {
        console.log(`/game call failed ${answer.status}`);
    }
    
    let answerJson=await answerResponse.json()
    answer=answerJson.answer
    console.log(answer);
    gameLoop();
});

function updateDIV(k){
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
}

function gameLoop(){
    document.addEventListener("keydown",(event)=>{
        let k=event.key
        updateDIV(k)
    });
}

function validWord(){
    let cg=""
    for (let i = 0; i < 6; i++) {
        cg=cg.concat(currentGuess[i])
    }
    
    if(dict.includes(cg)){
        console.log(cg);
        return true;
    }
    else{
        window.alert('invalid word');
        return false;
    }
}
function checkGuess(){
    answerCopy=[...answer]
    if(!validWord())
        return
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
function drawGameDiv(row,col){
    parent=document.getElementById("grid-parent")
    parent.innerHTML=""
    rowDiv=null
    for(let i=0;i<row;i++){
        rowDiv=document.createElement("div")
        rowDiv.setAttribute("id",i)
        rowDiv.setAttribute("class","flex gap-1")
        for(let j=0;j<col;j++){
            div=document.createElement("div")
            div.setAttribute("id",`l${i}c${j}`)
            div.setAttribute("class","bg-gray-500  w-12 h-12 rounded-md text-center text-white text-4xl font-bold ")
            rowDiv.appendChild(div)
        }
        parent.appendChild(rowDiv)
    }
}
function drawKeyboard(){
    let keys=[['Q','W','E','R','T','Y','U','I','O','P'],
              ['A','S','D','F','G','H','J','K','L'],
              ['ENT','Z','X','C','V','B','N','M','BK']]
    for (let i = 0; i < keys.length; i++) {
        let c=document.getElementById(`keyr${i+1}`)
        for (let j = 0; j < keys[i].length; j++) {
            let b=document.createElement('div')
            b.innerHTML=keys[i][j]
            if(keys[i][j]!='BK' && keys[i][j]!='ENT')
                b.setAttribute('class','bg-gray-500 sm:w-14 w-8 h-12 r text-white font-bold text-xl rounded-sm flex align-middle justify-center')
            else
            b.setAttribute('class','bg-gray-500 sm:w-21 w-13 h-12  text-white font-bold text-xl rounded-sm  flex align-middle justify-center')

            b.addEventListener('pointerdown',(event)=>{
                let k=null
                if(keys[i][j]==='ENT')
                    k='Enter'
                else if(keys[i][j]==='BK')
                    k="Backspace"
                else
                    k=keys[i][j]
                updateDIV(k)
            })
            c.appendChild(b)
        }
        
    }

}