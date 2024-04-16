const express = require('express');
const Task = require('./../model/taskModel')


exports.getAllTask =async (req, res) => {
   const task =await Task.find();
   try{
    res.status(201).json({
        message:'success',
        data:{
            task
        }
    })
   }catch(err){
     res.status(400).json({
        status:'fail',
        message:err
     })
   }
}
exports.getTask =async (req, res ) => {
  try{
   const task =await Task.findById(req.params.id)
   res.status(201).json({
    status:'success',
    data:{
        task
    }
   })
  }catch(err){
   res.status(400).json({
    status:'fail',
    message:err
   })
  }
}

exports.createTask =async (req, res) => {
    const newTask =await Task.create(req.body);
   try{
    res.status(200).json({
        status:'success',
        data:{
            newTask
        }
    })
   }catch(err){
     res.status(400).json({
        status:'fail',
        message:err
     })
   }
}

exports.deleteTask =async (req, res) => {
  try{
  await  Task.findByIdAndDelete(req.params.id)
      res.status(201).json({
        status:'success',
        data:null
      })
        }catch(err){
     res.status(400).json({
        status:'fail',
        message:err
     })
   }
}

exports.updateTask =async (req, res) => {
   try{
const task = await Task.findByIdAndUpdate(req.params.id, req.body,{
  new:true,
})
res.status(200).json({
    status:'success',
    data:{
        task
    }
})
   }catch(err){
    res.status(400).json({
       status:'fail',
        message:err 
    })
   }
}