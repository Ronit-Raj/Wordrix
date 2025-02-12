const express =require('express');
const app=express();
const fs=require('fs');
const { type } = require('os');
const port=8000;
const dictFile='dict2.json'

var words=null

function readDict(){
    dict=fs.readFileSync(dictFile,'utf-8');
    words=JSON.parse(dict)
    
}
app.listen(port,()=>{
    console.log(`listning on port${port}`);
    readDict()
})
app.get('/dict',(req,res)=>{
    res.statusCode=200
    res.send(dict);
})
app.get('/game',(req,res)=>{
    var size=words.length
    var ans=words[Math.floor(Math.random()*size)]
    res.statusCode=200
    res.send(ans)
})