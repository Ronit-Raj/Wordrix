let cursor=-1;
let answer=""
let newWord=false
let currentGuess=[]
document.addEventListener("DOMContentLoaded",function(){
    game();
});

function game(){
    cursor=-1;
    console.log("game");
    
    document.addEventListener("keydown",(event)=>{
        let k=event.key;

        if(cursor%6==5){
            if(k==="Enter"){
                newWord=true;
                cursor+=(cursor<36?1:0);
                check();
            }
            else if(k==="Backspace"){
                document.getElementById(`cell${cursor}`).textContent=" ";
                cursor-=(cursor>=0?1:0);
                currentGuess.pop();
            }
        }
        else if(cursor%6==0 ){
            if(k==="Backspace"){
                currentGuess.pop();
                document.getElementById(`cell${cursor}`).textContent=" ";
            }
            else if((k.toLowerCase()!=k.toUpperCase()) && k.length===1){
                document.getElementById(`cell${cursor}`).textContent=k.toUpperCase();
                newWord=true;
                currentGuess.push(k);
                cursor+=(cursor<36?1:0);
            }
        }
        else{
            if((k.toLowerCase()!=k.toUpperCase()) && k.length===1){
                cursor+=(cursor<36 && !newWord?1:0);
                newWord=false;
                document.getElementById(`cell${cursor}`).textContent=k.toUpperCase();
                currentGuess.push(k);
            }
            else if(k==="Backspace"){
                document.getElementById(`cell${cursor}`).textContent=" ";
                cursor-=(cursor>=0?1:0);
                currentGuess.pop();
            }
        }
    })
}
function check(){
    console.log(currentGuess);
    currentGuess=[]
}