let cursor=0;
let answer=""
document.addEventListener("DOMContentLoaded",function(){
    game()
});

function game(){
    cursor=0;
    console.log("game");
    
    document.addEventListener("keydown",(event)=>{
        let k=event.key;

        if(cursor%6===5 && k.toLowerCase()!=k.toUpperCase() && k.length===1 ){
            document.getElementById(`cell${cursor}`).textContent=k.toUpperCase();
        }
        else if((k.toLowerCase()!=k.toUpperCase()) && k.length===1){
            document.getElementById(`cell${cursor}`).textContent=k.toUpperCase();
            cursor+=(cursor<36?1:0);
        }
        else if(k==="Backspace"){
            cursor-=(cursor>0?1:0);
            document.getElementById(`cell${cursor}`).textContent=" ";
        }
        else if(k==="Enter" && cursor%6===5){
            cursor+=(cursor<36?1:0);
        }
    })
}
