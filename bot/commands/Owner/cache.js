const { Command } = require('discord-akairo');
const emojis = require('../../utils/emojis.json')

module.exports = class Cache extends Command {
    constructor() {
        super('cache', {
            aliases: ['cache'],
            typing: true,
            channel: 'guild',
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS'],
            description: {
                content: 'Caches a given guild or the current guild...',
                usage: '[ guild ]'
            },
            ownerOnly: true,
            args: [
                {
                    id: 'guild',
                    match: 'content',
                    type: 'guild',
                    default: (message) => message.guild
                }
            ]
        })
    }
    async exec(message, { guild }) {
        await guild.members.fetch()
        message.react(emojis.discord.CheckMark)
    }
}