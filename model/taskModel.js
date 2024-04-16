const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
 name:{
    type:String,
    required:[true, 'the task must have a name'],
 },
 status:{
    type:String,
    enum:['pendding', 'in progress', 'commplate'],
    default:'pendding'
 },
 dueDate:Date,
 Discription:{
    type:String,
    required:[true , 'the task must have a discription']
 },
 priority:{
    type:String,
    enum:['high', 'meddium','low'],
    default:'meddium'
 },
 Attachement:{
    type:String,
 }
})
const Task = mongoose.model('Task', taskSchema)
module.exports = Task;