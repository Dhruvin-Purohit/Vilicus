const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const { MessageEmbed } = require('discord.js')

module.exports = class WithRole extends Command {
    constructor() {
        super('withrole', {
            aliases: ['withrole'],
            channel: 'guild',
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
            args: [
                {
                    id: 'role',
                    type: 'role',
                    prompt: {
                        start: 'What role?'
                    }
                }
            ]
        })
    }
    async exec(message, { role }) {
        const member = await message.guild.members.fetch()
        let nope = member.filter(m => m.roles.cache.has(role.id))
        if(!nope.size > 0) return message.channel.send(new MessageEmbed({description: '😂 No one actually has that role', color: role.hexColor}))
        else return message.channel.send(new MessageEmbed({title: `List`, description: `${nope.map(m => `${dmd.bold `${m.user.tag} - `}${dmd.code `${m.id}`}`).join(`\n`)}\n\nThe above member(s) have the ${role} role`, footer: `requested by ${message.author.tag}`, color: role.hexColor}))
    }
}