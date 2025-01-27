let currentLine=0
let currentCell=0

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
            }
        }
        else if(k==="Backspace"){
            if (currentCell>=0) {
                currentCell-=(currentCell>0);
                document.getElementById(`l${currentLine}c${currentCell}`).textContent=' ';
            }
        }
        else if((k.toLowerCase()!=k.toUpperCase()) && k.length==1){
            if(currentCell<6){
                document.getElementById(`l${currentLine}c${currentCell}`).textContent=k.toUpperCase();
                currentCell++;
            }
        }
    });
}