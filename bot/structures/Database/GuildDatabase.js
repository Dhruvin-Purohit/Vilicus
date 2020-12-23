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
            }, (err, g) => {
                if(err) Guild.client.emit("error", err)
    
                if(!g) {
                    const newG = new GuildModel({
                        id: Guild.id
                    })
                    newG.save()
                    .then(res => console.log(res))
                    .catch(err => Guild.client.emit("error", err))
                }
            })
            })()

    }

    get prefix() {
        return this.gdb.prefix || config.bot.prefix
    }
}