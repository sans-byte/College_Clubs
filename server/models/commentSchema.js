const mongoose = require("mongoose");


const commentSchema = mongoose.Schema({
    author: {
        id :{
            // TODO : insert author's id at the time of creation :- object refrence.
            type:Number,
            required:true,
            ref: "User",
        },
        userName:{
            type:String,
            required:true,
        }
    },
    text : {
        type: String,
        required : true,
    }
});

module.exports = mongoose.model("Comment",commentSchema);