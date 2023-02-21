
const mongodb = require('mongoose')


const driver = mongodb.Schema({
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
        trim:true
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
        trim:true
    },
    passWorde:{
        type:String,
        trim:true
    },
    imgPublicKey:{
        type:String,
        default: null
    },
    paylode:{
        type:Array
    },
    carAs:{
        type:String
    },
    userRecord:{
        delivries:{
            type:Number
        },
        delivriStatas:{
            type:Array
        }
    },
    
})

module.exports = mongodb.model("driver", driver) 