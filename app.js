const express = require('express');
const morgan = require('morgan')

const app = express();

const taskRouter = require('./router/taskRouter');
const userRouter = require('./router/userRouter');
// const { json } = require('body-parser');

app.use(express.json())
app.use((req, res, next) => {
    console.log('Hello from the middelware 👋')
    next()
})

app.use(morgan('dev'))

app.use('/api/h1/task', taskRouter);
app.use('/api/h1/user', userRouter);

module.exports = app;