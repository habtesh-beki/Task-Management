const express = require('express')
const taskController = require('./../Controller/taskController')
const userController = require('./../Controller/userController')


const router = express.Router()

router.route('/')
.get(userController.protectData ,taskController.getAllTask)
.post(taskController.createTask)

//
router.route('/:id')
.get(taskController.getTask)
.delete(
    userController.protectData,
    userController.restrictTo("admin","guide"),
    taskController.deleteTask)
.patch(taskController.updateTask)

module.exports = router;