const { Guild } = require("discord.js");
const config = require('../../config.json')
const GuildModel = require('../Schemas/GuildSchema')

module.exports = class db {
    /**
     * The Guild to get database values for
     * @param {Guild}
     */
    constructor(Guild) {
        (async() => {
            this.gdb = await GuildModel.findOne({
                id: Guild.id
            }) || new GuildModel({
                id: Guild.id
            })
            })()

    }

    get prefix() {
        return this.gdb.prefix || config.bot.prefix
    }

    async dropdb() {
        await GuildModel.findOneAndDelete({
            id: Guild.id
        })
    }
}