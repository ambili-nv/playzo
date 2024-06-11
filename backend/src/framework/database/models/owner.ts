import mongoose from 'mongoose'

const ownerSchema = new mongoose.Schema({
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
        enum:["owner"],
        default:"owner"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

export default mongoose.model("Owner",ownerSchema)