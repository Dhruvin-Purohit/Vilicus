const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const { MessageEmbed } = require('discord.js')

module.exports = class WithoutRole extends Command {
    constructor() {
        super('withoutrole', {
            aliases: ['withoutrole'],
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
            ],
            description: {
                "content": "Lists all members without a given role",
                "usage": "< Role >"
            }
        })
    }
    async exec(message, { role }) {
        const member = await message.guild.members.fetch()
        let nope = member.filter(m => !m.roles.cache.has(role.id))
        if(!nope.size > 0) return message.channel.send(new MessageEmbed({description: '😂 Everyone has that role!', color: role.hexColor}))
        else return message.channel.send(new MessageEmbed({title: `List`, description: `${nope.map(m => `${dmd.bold `${m.user.tag} - `}${dmd.code `${m.id}`}`).join(`\n`)}\n\nThe above member(s) don't have the ${role} role`, footer: `requested by ${message.author.tag}`, color: role.hexColor}))
    }
}