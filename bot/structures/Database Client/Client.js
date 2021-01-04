const GuildModel = require('../Schemas/GuildSchema')

module.exports = class Client {
    constructor() {
        this.gdb = GuildModel
    }

}