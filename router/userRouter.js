const express = require('express')
const userController = require('./../Controller/userController')
const router = express.Router();

router.post('/signup', userController.signUp)

router.route('/')
.get(userController.getAllUser)
.post(userController.createUser)

router.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser)

module.exports = router;
