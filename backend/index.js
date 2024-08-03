require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const generateImage = require('./routes/getImageRoute')
const app = express();

app.use(express.json());
 
 app.use('/api',(req,res)=>res.send("Hello"))
 app.use('/api/gen',generateImage)

app.listen(4000,()=>{
    console.log("Server is listening on port 4000")
})