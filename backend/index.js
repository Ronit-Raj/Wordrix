const express =require('express');
const app=express();
const fs=require('fs');
const { type } = require('os');
const port=8000;
const cors=require('cors')
const frontend='https://wonderful-blancmange-8cae92.netlify.app/*'
let dictFile='dict5.json' //default values 
let noOfLetters=5 //default values 

var words=null

app.use(cors({
    origin:[frontend,'http://localhost:5500'],
    methods:'GET'
}))

function readDict(){
    dict=fs.readFileSync(dictFile,'utf-8');
    words=JSON.parse(dict)
}
app.listen(port,()=>{
    console.log(`listning on port${port}`);
})

//getting the no of letters from the dict route because it 
//is the first route to be called by the front-end 
app.get('/dict',(req,res)=>{
    noOfLetters=req.query.letters
    dictFile=`dict${noOfLetters}.json`
    readDict()

    res.statusCode=200
    res.send(dict);
})
app.get('/game',(req,res)=>{
    var size=words.length
    var ans={
        "answer":words[Math.floor(Math.random()*size)]
    }
    res.statusCode=200
    res.json(ans)
})