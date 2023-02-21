const date = require('date-and-time')
const mongoose = require('mongoose')
const users = mongoose.Schema({
    
    firstName:{
        type:String,
        required: [true, "your first name is required"],
        trim:true
    },
    lastName:{
        type:String,
        required:[true, "your last name is required"],
        trim:true
    },
    sex:{
        type:String,
        required:[true, "sex is required"],
        trim:true
    },
    DOB:{
        type: Date
    },
    city:{
        type:String,
        default:'Addis Ababa',
        trim:true
    },
    Kabala:{
        type:String,
        trim:true
    },
    homeNum:{
        type:String,
        trim:true,
        default: "new"
    },
    education:{
        type:String,
        trime:true
    },
    phoneNumber1:{
        type:String,
        trime:true
    },
    phoneNumber2:{
        type:String,
        trime:true
    },
    subcity:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:[true, "email is required"],
        trim:true
    },
    passWorde:{
        type:String,
        required:[true, "password is required"],
        trim:true
    },
    imgPublicKey:{
        type:String,
        default: null
    },
    status:{
        type:String,
        default: "user"
    },
})

module.exports = mongoose.model('users', users)