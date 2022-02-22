const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema({
    user:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    },
    gender:{
        type:String,
        required:true,
    },
    date_of_birth:{
        type:Date,
        required:true,
    },
    interest:{
        type:String,
    },
    college:{
        type:String,
    },
    website:{
        type:String,
    },
    linkdln:{
        type:String,
    },
    github:{
        type:String,
    },
    resume:{
        type:Buffer,
        required:true,
    }
})