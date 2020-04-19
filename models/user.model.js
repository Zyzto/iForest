const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName : {
        type : String , 
        required : true
    },
    lastName : {
        type : String , 
        required : true
    },
    email : {
        type : String , 
        required : true
    },
    password : {
        type : String , 
        required : true
    },
    isAdmin: {
        type: Boolean,
        default: false
      },
      plants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant"
    }],
    savePlants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant"
    }],

} , {timestamps : true})
const User = mongoose.model('user'  ,userSchema)
module.exports = User