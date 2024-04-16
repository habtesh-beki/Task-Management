const mongoose = require('mongoose')
const validator = require("validator")
// const { validate } = require('./taskModel')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'the user must have name']
    },
    email:{
     type:String,
    validate:[validator.isEmail],
    required:[true, 'the user must have an email']
    },
     role:{
        type:String,
        enum:['guide', 'user','admin'],
        default:'user'
    },
    password:{
        type:String,
        required:[true, 'the user must have a password'],
        minlength:8
    },
   
    confiremPassword:{
        type:String,
        required:[true, 'you have to confirm the password'],
        validate:{
            validator: function(value){
            return value === this.password;
        }},
        message:'the password not the same'
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User;