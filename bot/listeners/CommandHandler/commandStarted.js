const { Listener } = require('discord-akairo')
const dmd = require('discord-md-tags')
const config = require('../../config.json')

module.exports = class extends Listener {
    constructor() {
        super('commandstarted', {
            emitter: 'commandHandler',
            event: 'commandStarted'
        })
    }

    async exec(message, command, args) {
        const commandlogs = this.client.channels.cache.get(config.channels.command)

        const embed = this.client.util.embed()
        .setColor(this.client.basecolor)
        .setThumbnail(message.guild ? message.gild.iconURL({
            dynamic: true
        }) : message.author.displayAvatarURL({
            dynamic: true
        }))
        .setDescription(`${dmd.bold `${message.author.tag}`}(${message.author.id}) used ${dmd.bold `${command}`}${message.guild ? `in ${message.guild.name}` : `in DMs`}`)
        .setFooter(`${args ? args : '\u200b'}`)

        commandlogs.send(embed)
    }
}