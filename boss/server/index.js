require('dotenv').config(); 
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/boss', {useNewUrlParser: true , useUnifiedTopology: true },()=>{
    console.log('DB connected!')
})

const bossRouters = require('./routers/boosRouters')
const app = express() ; 


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',bossRouters)


const PORT = 3020 ; 

app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}`)
})