const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const dmd = require('discord-md-tags')

module.exports = class extends Command {
    constructor() {
        super('lock', {
            aliases: ['lock'],
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
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        }, rsn)
        await chn.updateOverwrite(this.client.user, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
        })

        await message.react('🔒')
        const embed = new MessageEmbed()
        .setTitle(`🔒 This channel is locked 🔒`)
        .setDescription(`${dmd.bold `Reason: `}${rsn}`)
        .setFooter(`Locked by: ${message.author.tag}`)
        chn.send(embed)
    }
}
