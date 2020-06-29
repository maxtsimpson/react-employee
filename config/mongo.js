require('dotenv').config()

const mongoose = require('mongoose')
mongoose.set('debug', true)

module.exports = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
})