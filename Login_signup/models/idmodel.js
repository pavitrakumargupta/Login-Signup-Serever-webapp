const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express=require('express')
 

// acessing config file
dotenv.config({ path: "$__dirname/../config.env" });
const app=express()

 

// raplacing the password in config file witha actual password
const DB = process.env.DATABASE.replace(
'<PASSWORD>',
process.env.DATABASE_PASSWORD
);

// creating a mongoose connection 
mongoose
   .connect(DB, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then(() => {
     console.log('DB connection suceesfull!');
   });


const idSheema= new mongoose.Schema({
    username: String,
    id: String,
    phnNo:  Number,
    course: String,
    branch: String,
    semester: Number,
    password: String,
    type: {
      type:String,
      default:'dayScholar'
    },
  })

  // creating and exportins ids 
const ids=mongoose.model('id',idSheema)
module.exports=ids