const { Command } = require('discord-akairo')
const emojis = require('../../utils/emojis.json')

module.exports = class CacheReset extends Command {
    constructor() {
        super('cachereset', {
            aliases: ['cachereset', 'resetcache'],
            clientPermissions: ['ADD_REACTIONS'],
            ownerOnly: true,
            args: [
                {
                    id: 'what',
                    type: 'string',
                    match: 'restContent'
                }
            ],
            description: {
                content: 'Reset Cache of a specific file',
                usage: '< file path >'
            }
        })
    }

    async exec(message, { what }) {
        if(!what) return message.util.send(`Can't reset cache of nothing, sorry not sorry.`)
        const file = await require.resolve(`${what}`)
        if(!file) return message.util.send(`Can't reset cache of something that does not exist, sorry not sorry.`)
        await delete require.cache[file]
        return message.react(emojis.discord.CheckMark)
    }
}