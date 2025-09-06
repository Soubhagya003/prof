import mongoose from  'mongoose'
import express from 'express'
import {DBname} from '../constants.js'

const connectDB= async ()=>{
    try{

        await mongoose.connect(`${process.env.MONGODB_URL}/${DBname}`)
        console.log('success')



    }catch(error){
        console.log('conn failed bruh',error)
        process.exit(1)
    }
} 

export default connectDB

