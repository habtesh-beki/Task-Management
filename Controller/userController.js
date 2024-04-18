const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./../model/userModel')
const {promisify} = require('util')

const createToken = (id) => {
  return  jwt.sign({id},process.env.SECRETE_TOKEN,{expiresIn:process.env.TOKEN_EXPIRES_IN})
}

exports.signUp = async (req, res) => {
 try{
 const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confiremPassword: req.body.confiremPassword,
    role:req.body.role
 });
 const token = createToken(newUser._id)

 res.status(201).json({
    status:'success',
    token,
    data:{
        newUser
    }
 })
 }catch(err){
 res.status(400).json({
    status:'fail',
    message:err
 })
 }
}

exports.logIn = async (req, res) => {
    try{
       const {email , password} = req.body; 
    if(!email || !password){
        res.status(400).json({
            status:'fail',
            message:'please insert email or password'
        })
    }
 const  user =await User.findOne({email}).select('+password')
 const correctPass =await user.correctPassword(password , user.password)

 if(!user || !correctPass){
    res.status(400).json({
        status:'fail',
        message:'please insert correct password or email'
    })
 }
    //  console.log(user)
      const token = createToken(user._id);
      res.status(201).json({
        status:'success',
        token,
      })  
    }catch(err){
  res.status(400).json({
    status:'fail',
    message:err
  })
    } 
}

exports.protectData =async (req, res, next) => {
let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
   token = req.headers.authorization.split(' ')[1];
}
if(!token){
    res.status(400).json({
        status:'fail',
        message:'please insert the token'
    })
}
const decoded =await promisify(jwt.verify)(token , process.env.SECRETE_TOKEN)
const currentUser = await User.findOne(decoded._id);
if(!currentUser){
    res.status(400).json({
        status:'fail',
        message:'There is no user in this token'
    })
}
req.user = currentUser;
next();
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
     console.log(req.user.role)
        if(!roles.includes(req.user.role)){
        res.status(403).json({
            status:'fail',
            message:'you are not allowed to perform this action'
        })
        }
     next();
    }

}

exports.forgetPassword = (req, res ) => {

    next()
}

exports.getAllUser =async (req, res) => {
    try{
    const users =await User.find()
   res.status(201).json({
    status:'success',
    data:{
        users
    }
   })
    }catch(err){
    res.status(400).json({
        status:"fail",
        message:err
    })
    }
}
exports.createUser =async (req, res) => {
    try{
        const newUser =await Task.create(req.body)
        res.status(201).json({
         status:'success',
        message:'success'
        })
         }catch(err){
         res.status(400).json({
             status:"fail",
             message:err
         })
         }
}



exports.getUser =async (req, res) => {
    try{
        const newUser =await Task.findById(req.params.id)
        res.status(201).json({
         status:'success',
        message:'success'
        })
         }catch(err){
         res.status(400).json({
             status:"fail",
             message:err
         })
         }
}

exports.updateUser =async (req, res) => {
    try{
        const newUser =await Task.findByIdAndUpdate(req.params.id)
        res.status(201).json({
         status:'success',
        message:'success'
        })
         }catch(err){
         res.status(400).json({
             status:"fail",
             message:err
         })
     }
}

exports.deleteUser =async (req, res) => {
    try{
        await Task.findByIdAndDelete(req.params.id)
        res.status(201).json({
         status:'success',
        data:null
        })
         }catch(err){
         res.status(400).json({
             status:"fail",
             message:err
         })
     }
}