const mongoose = require('mongoose')
const config = require('../config.json')

module.exports = UserDBConnection = mongoose.createConnection(config.db.user, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 5,
    connectTimeoutMS: 10000,
    family:4
})

UserDBConnection.Promise = global.Promise

UserDBConnection.on('connected', () => {
    console.log(`[ Mongoose ] - User Database Connected!`)
})

UserDBConnection.on('disconnected', () => {
    console.log(`[ Mongoose ] - User Database Disconnected!`)
})

UserDBConnection.on('err', (err) => {
    console.log(`[ Mongoose ] - User Database Error!\n\n${err}`)
})
