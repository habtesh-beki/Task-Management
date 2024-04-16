const express = require('express')
const mongoose = require('mongoose')
const User = require('./../model/userModel')

exports.signUp = async (req, res) => {
 try{
 const newUser = await User.create(req.body);
 res.status(201).json({
    status:'success',
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

exports.getAllUser =async (req, res) => {
    try{
    const user =await User.find()
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