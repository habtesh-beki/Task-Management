const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE;

mongoose.connect(DB, {

}).then(() => {  console.log('DB connection successfull')})

const PORT =process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log(`The server is listening on the port ${PORT}`)
})


