const { Listener } = require('discord-akairo')
const dmd = require('discord-md-tags')
const config = require('../../../config.json')

module.exports = class extends Listener {
    constructor() {
        super('commandstarted', {
            emitter: 'CommandHandler',
            event: 'commandStarted'
        })
    }

    async exec(message, command, args) {
        const commandlogs = this.client.channels.cache.get(config.channels.command)

        const embed = this.client.util.embed()
        .setColor(this.client.basecolor)
        .setThumbnail(message.guild ? message.guild.iconURL({
            dynamic: true
        }) : message.author.displayAvatarURL({
            dynamic: true
        }))
        .setDescription(`${dmd.bold `${message.author.tag}`} used ${dmd.bold `${command}`} ${message.guild ? `in ${dmd.bold `${message.guild.name}`}` : `in ${dmd.bold `DMs`}`}\n\n${dmd.bold `User ID: `}${message.author.id}\n\n${message.guild ? `${dmd.bold `Guild ID: `}${message.guild.id}` : "\u200b"}`)
        .setFooter(`${message ? message : '\u200b'}`)
        try {
        commandlogs.send(embed)
        } catch {
            //No
        }
    }
}