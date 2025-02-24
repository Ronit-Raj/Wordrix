let currentLine=0
let currentCell=0
let answer=null
let dict=null
let running=true
let currentGuess=[]
let wordLen=6
let allowedGuess=6
const backendURL='https://wordle-d60u.onrender.com'

document.addEventListener("DOMContentLoaded",async function(){
    drawGameDiv(wordLen,allowedGuess)
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
    if(!running)
        return
    if(k==="Enter"){
        if (currentCell==wordLen) {
            if(validWord()){
                currentLine+=(currentLine<allowedGuess);
                currentCell=0;
                checkGuess() //to handle coloring of the cells 
                currentGuess=[]; // clear
            }
            else{
                triggerSnackbar()
            } 
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
        if(currentCell<wordLen){
            document.getElementById(`l${currentLine}c${currentCell}`).textContent=k.toUpperCase();
            currentGuess.push(k.toLowerCase());
            currentCell++;
        }
    }
}

function triggerSnackbar(){
    let warning=document.getElementById('wrong-word-snackbar')
    warning.classList.remove('hidden')
    warning.classList.add('animate-explode')
    setTimeout(() => {
        warning.classList.add('hidden')
    }, 1000);
}

function gameLoop(){
    document.addEventListener("keydown",(event)=>{
        let k=event.key
        updateDIV(k)
    });
}

function validWord(){
    let cg=""
    for (let i = 0; i < wordLen; i++) {
        cg=cg.concat(currentGuess[i])
    }
    
    if(dict.includes(cg)){
        console.log(cg);
        return true;
    }
    else{
        return false;
    }
}
/*
handles coloring of cells also trigers pop-ups in case
of winning or losing
*/
function checkGuess(){
    answerCopy=[...answer]
    let matched=0
    for (let i = 0; i < wordLen; i++) {
        if(currentGuess[i]===answerCopy[i]){
            document.getElementById(`l${currentLine-1}c${i}`).classList.remove('bg-gray-500');
            document.getElementById(`l${currentLine-1}c${i}`).classList.add('bg-green-500');
            answerCopy[i]='!';
            matched++;
        }
    }

    for (let i = 0; i < wordLen; i++) {
        //
        for(let j=0;j<wordLen;j++){
            if(document.getElementById(`l${currentLine-1}c${i}`).classList.contains('bg-gray-500')){
                if(currentGuess[i]===answerCopy[j]){
                    document.getElementById(`l${currentLine-1}c${i}`).classList.remove('bg-gray-500');
                    document.getElementById(`l${currentLine-1}c${i}`).classList.add('bg-orange-500');
                    answerCopy[j]='!';
                }
            }
        }
    }

    if(matched===answerCopy.length){
        showPopUp('win')        
    }
    if(currentLine===allowedGuess){
        showPopUp('loose')
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
                b.setAttribute('class','bg-gray-500 sm:w-14 w-8 sm:h-12 h-14 shadow-sm shadow-gray-200 text-white font-bold text-xl rounded-b-lg flex align-middle justify-center')
            else if(keys[i][j]=='BK'){
                b.setAttribute('class','bg-gray-500 sm:w-20 w-14 sm:h-12 h-14 shadow-sm shadow-gray-200 text-white font-bold text-xl rounded-b-lg  flex align-middle justify-center')
                b.innerHTML=''
                let bkIcon=document.createElement('img')
                bkIcon.setAttribute('src','backspace.svg')
                bkIcon.setAttribute('class','w-10 h-10')
                b.appendChild(bkIcon)
            }
            else{
                b.setAttribute('class','bg-gray-500 sm:w-20 w-14 sm:h-12 h-14 shadow-sm shadow-gray-200 text-white font-bold text-xl rounded-b-lg  flex align-middle justify-center')
                b.innerHTML=''
                let doneIcon=document.createElement('img')
                doneIcon.setAttribute('src','done.svg')
                doneIcon.setAttribute('class','w-10 h-10')
                b.appendChild(doneIcon)
            }
            b.addEventListener('pointerdown',(event)=>{
                let k=null
                if(keys[i][j]==='ENT')
                    k='Enter'
                else if(keys[i][j]==='BK'){
                    k="Backspace"
                }else
                    k=keys[i][j]
                updateDIV(k)
            })
            c.appendChild(b)
        }
        
    }

}
function reload(){
    location.reload()
}
function showPopUp(type){
    let grid=document.getElementById('grid-parent');
    let keyboard=document.getElementById('keyboard');
    let popUp=document.getElementById(`${type}-popup`);
    popUp.classList.remove('hidden');
    grid.classList.add('blur-sm')
    keyboard.classList.add('blur-sm')
    running=false
}
function closePopUp(type){
    let grid=document.getElementById('grid-parent');
    let keyboard=document.getElementById('keyboard');
    let popUp=document.getElementById(`${type}-popup`);
    popUp.classList.add('hidden');
    grid.classList.remove('blur-sm')
    keyboard.classList.remove('blur-sm')
    running=false
}