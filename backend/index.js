const express =require('express');
const app=express();
const fs=require('fs');
const { type } = require('os');
const port=8000;
const cors=require('cors');
const { json } = require('stream/consumers');
const frontend='https://wonderful-blancmange-8cae92.netlify.app'

//dict4.json dict5.json dict6.json and dict7.json contains the 
//most common words they will be used for selecting the answers 
app.use(cors({
    origin:frontend,
    methods:'GET'
}))

app.listen(port,()=>{
    console.log(`listning on port${port}`);
})

//send the entire dataset of words to check if the 
//guess is valid 
app.get('/dict',(req,res)=>{
    let noOfLetters=req.query.letters
    let dictFile=`dictComplete${noOfLetters}.json`
    fs.readFile(dictFile,'utf-8',(err,data)=>{
        if(err){
            console.log('error in reading complete dictionary');
            console.log(err);
        }
        res.statusCode=200
        res.send(data);
    })

})

//but only use the most common words as answer
app.get('/game',(req,res)=>{
    let noOfLetters=req.query.letters
    let dictFile=`dict${noOfLetters}.json`
    fs.readFile(dictFile,'utf-8',(err,data)=>{
        if(err){
            console.log('error in reading answer dictionary');
            console.log(err)
        }
        let words=JSON.parse(data)
        let size=words.length
        let ans={
            "answer":words[Math.floor(Math.random()*size)]
        }
        res.statusCode=200
        res.json(ans)
    })
})