const mongoose = require('mongoose')
const config = require('../config.json')

module.exports = GuildDBConnection = mongoose.createConnection(config.db.guild, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 5,
    connectTimeoutMS: 10000,
    family:4
})

GuildDBConnection.Promise = global.Promise

GuildDBConnection.on('connected', () => {
    console.log(`[ Mongoose ] - Guild Database Connected!`)
})

GuildDBConnection.on('disconnected', () => {
    console.log(`[ Mongoose ] - Guild Database Disconnected!`)
})

GuildDBConnection.on('err', (err) => {
    console.log(`[ Mongoose ] - Guild Database Error!\n\n${err}`)
})
