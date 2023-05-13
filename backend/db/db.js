const mongoose = require('mongoose');

const db = async ()=>{
    try{
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected')
    }catch(error){
        console.log("Database connection Error")
    }
}

module.exports = {db}