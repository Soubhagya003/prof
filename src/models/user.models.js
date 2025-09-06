import mongoose from 'mongoose'

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true

    },
     email:{
        type:String,
        required:true,
        unique:true,
       // index:true

    },
     fullname:{
        type:String,
        required:true,
       

    },
      watchhistory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'video'

    },
    password:{
        type:String,
        //ref:'video'

    },
    refreshtoken:{
        type:String,
    },



},{timestamps:true})


//pre -> hook

userschema.pre("save",async function (next){// not ()=> but function () cuz ()=> dont know "this"
  

    if(!this.isModified("password")) return next();

    
   this.password=bcrypt.hash(this.password,10)//10 rounds
   next()

})

userschema.methods.ispasswordcorrect = async function(password){

   return await bcrypt.compare(password,this.password) // returns true false

}

userschema.methods.getaccesstoken = async function(){

    return jwt.sign(
        {
        //payload

        _id:this._id,
        email:this.email,
        username:this.username
        },
        process.env.ACCESS_TOKEN,
        {
            expiresin:process.env.ACCESS_TOKEN_EXPIRY
        }


    )

}

userschema.methods.getrefreshtoken = async function(){

    return jwt.sign(
        {
        //payload

        _id:this._id,
        
        },
        process.env.REFRESH_TOKEN,
        {
            expiresin:process.env.REFRESH_TOKEN_EXPIRY
        }


    )

}



export const User=mongoose.model('User',userschema);

