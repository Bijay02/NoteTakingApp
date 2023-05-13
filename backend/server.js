const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {db}= require('./db/db');
const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use('/users',userRouter)
app.use('/api/notes', noteRouter)


//Listen Server
const PORT = process.env.PORT;

app.get('/',(req, resp)=>{
    resp.send("Tjis is Notes Api")
})

const server =()=>{
    db()
app.listen(PORT,()=>{
    console.log('Server is running on port:', PORT)
})
}

server();