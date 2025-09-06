import mongoose from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const videoschema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true})

videoschema.plugin(mongooseAggregatePaginate)

export const video=mongoose.model('video',videoschema)