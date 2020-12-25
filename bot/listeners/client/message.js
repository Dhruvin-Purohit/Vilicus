const { Listener } = require('discord-akairo')
const dmd = require('discord-md-tags')
module.exports = class extends Listener {
    constructor() {
        super('message', {
            emitter: "client",
            event: "message",
            category: "client"
        })
    }
    exec(message) {
        if(!this.client.isBlacklisted(message.author) && !message.author.bot && message.content === `<@${this.client.user?.id}>` || message.content === `<@!${this.client.user?.id}>`) {
            try {
                message.channel.send(dmd.bold `My prefix is \`${this.client.CommandHandler.prefix}\``)
            } catch {
                //HaHaMiSsInG PeRmIsSiOnS
            }
        }
    }
}