const express = require('express')
const taskController = require('./../Controller/taskController')


const router = express.Router()

router.route('/')
.get(taskController.getAllTask)
.post(taskController.createTask)

router.route('/:id')
.get(taskController.getTask)
.delete(taskController.deleteTask)
.patch(taskController.updateTask)

module.exports = router;