const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const { MessageEmbed } = require('discord.js')

module.exports = class WithoutRoles extends Command {
    constructor() {
        super('withoutroles', {
            aliases: ['withoutroles'],
            channel: 'guild',
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
            description: {
                "content": "Lists all members in the server without any roles"
            }
        })
    }
    async exec(message) {
        const member = await message.guild.members.fetch()
        let nope = member.filter(m => m.roles.cache.size === 1)
        if(!nope.size > 0) return message.channel.send(new MessageEmbed({description: '😮 Everyone has atleast 1 role!'}))
        else return message.channel.send(new MessageEmbed({title: `List`, description: `${nope.map(m => `${dmd.bold `${m.user.tag} - `}${dmd.code `${m.id}`}`).join(`\n`)}\n\nThe above member(s) don't have any roles`, footer: `requested by ${message.author.tag}`}))
    }
}