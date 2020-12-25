const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const dmd = require('discord-md-tags')

module.exports = class extends Command {
    constructor() {
        super('unlock', {
            aliases: ['unlock'],
            clientPermissions: ['MANAGE_CHANNELS', 'SEND_MESSAGES'],
            userPermissions: ['MANAGE_CHANNELS'],
            description: {
                content: 'Locks a particular channel',
                usage: '[ Channel ] [ reason ]'
            },
            args: [
                {
                    id: 'chn',
                    type: 'channel',
                    default: (message) => message.channel
                },
                {
                    id: 'rsn',
                    type: 'string',
                    match: 'rest',
                    default: 'No reason provided!'
                }
            ]
        })
    }

    async exec(message, { chn, rsn }) {
        await chn.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: null,
            ADD_REACTIONS: null
        }, rsn)

        await message.react('🔓')
    }
}
