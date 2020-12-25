const { Listener } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const dmd = require('discord-md-tags')

module.exports = class extends Listener {
    constructor() {
        super('messagebulkdelete', {
            emitter: 'client',
            event: 'messageBulkDelete'
        })
    }

    exec(msgs) {
        let message = msgs.first()
        if(message.guild.db.gdb.msglog) {
            const embed = new MessageEmbed()
            .setTitle(`${dmd.code `${msgs.size}`} messages in #${message.channel} were deleted.`)
            //ToDo try and fetch audits for who did them
            try {
                this.client.channels.cache.get(message.guild.db.gdb.msglog).send(embed)
            } catch {
                //HaHa MiSsInG PeRmS
            }
        }
    }
}