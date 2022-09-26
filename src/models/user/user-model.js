const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    address : {
        type : String,
    },
    phone : {
        type : String
    },
    birthdate : {
        type : String
    },
    avatar : {
        type : String
    },
    cloudinary_id : {
        type : String
    },
    passwordResetCode : {
        type:Number
    },
    isVerified : {
        type : Boolean,
        default : false
    },
}, 
{ timestamps : true}
)

module.exports = mongoose.model("User", userSchema)