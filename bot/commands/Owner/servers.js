const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')

module.exports = class Guilds extends Command {
    constructor() {
        super('guilds', {
            aliases: ['guilds', 'servers'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS'],
            ownerOnly: true,
            description: {
                content: 'Get a full list of servers vilicus is in!'
            }
        })
    }
    async exec(message) {
        let guilds = this.client.guilds.cache
        const embed = new MessageEmbed()
        .setTitle('Guilds List')
        .setDescription(guilds.map(m => `${m} - ${dmd.bold `(${m.id})`}`))
        return message.channel.send(embed)
    }
}