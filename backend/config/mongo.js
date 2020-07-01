require('dotenv').config()

const mongoose = require('mongoose')
mongoose.set('debug', true)

console.log(`connnecting to: ${process.env.MONGO_URI}`)

module.exports = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})