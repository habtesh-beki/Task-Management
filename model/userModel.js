const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require('bcryptjs')
// const { validate } = require('./taskModel')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'the user must have name']
    },
    email:{
     type:String,
    validate:[validator.isEmail],
    required:[true, 'the user must have an email'],
    unique:true
    },
     role:{
        type:String,
        default:'user',
        enum:['guide', 'user','admin'] 
    },
    password:{
        type:String,
        required:[true, 'the user must have a password'],
        minlength:8,
        select:false
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
userSchema.pre('save',async function(){
     this.password =await bcrypt.hash(this.password , 12)
     this.confiremPassword = undefined;
})

userSchema.methods.correctPassword = function(originalPassword , userInsertPassword){
    return bcrypt.compare(originalPassword, userInsertPassword)
}

const User = mongoose.model('User', userSchema)
module.exports = User;