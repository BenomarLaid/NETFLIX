import mongoose, { Types } from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        Type: String,
        required:true,
        uniqe:true,
    },
    email: {
        type:String,
        required:true,
        uniqe:true,
    },
    password: {
        type: String,
        required:true,
    },
    Image: {
        type: String,
        default:""
    },
    searchHistory:{
        type:Array,
        default:[]
    }
})

const user = mongoose.model('User', userSchema);