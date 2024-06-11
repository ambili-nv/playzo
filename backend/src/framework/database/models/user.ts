import mongoose from 'mongoose'

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["user"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

export default mongoose.model("User",userSchema)