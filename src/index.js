import mongoose from 'mongoose';
import {DBname} from "./constants.js"

import express from 'express';
const app=express();

import dotenv from "dotenv";
import connectDB from './db/dbs.js';
dotenv.config();

import cors from 'cors'

app.use(cors())




// ( async ()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DBname}`)
//        console.log(' yes connected')

//     }catch(error){
//         console.log("mongodb conn failed",error)
//         process.exit(1)

//     }

// })()
connectDB()
.then(()=>{

    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server lis on port ${process.env.PORT}`)

    })

})
.catch((error)=>{
    console.log('failed connection oops',error)
})


app.use(express.json({limit:'16kb'}))

app.use(express.urlencoded({limit:'16kb'}))

app.use(express.static('public'))

//app.use(cookieParser())









