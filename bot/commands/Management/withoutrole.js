const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const { MessageEmbed } = require('discord.js')
const fn = require('../../utils/functions')

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
                },
                {
                    id: 'page',
                    type: 'number',
                    default: 1
                }
            ],
            description: {
                "content": "Lists all members without a given role",
                "usage": "< Role > [ page ]"
            }
        })
    }
    async exec(message, { role, page }) {
        const member = await message.guild.members.fetch()
        let nope = member.filter(m => !m.roles.cache.has(role.id))
        if(!nope.size > 0) return message.util.send(new MessageEmbed({description: '😂 Everyone has that role!', color: role.hexColor}))
        else if(nope.size < 11) {
            return message.util.send(new MessageEmbed({title: `List`, description: `${nope.map(m => `${dmd.bold `${m.user.tag} - `}${dmd.code `${m.id}`}`).join(`\n`)}\n\nThe above member(s) don't have the ${role} role`, footer: `requested by ${message.author.tag}`, color: role.hexColor}))
        } else {
            let paged = fn.paginate(nope.map(m => `${dmd.bold `${m.user.tag} - `}${dmd.code `${m.id}`}`), page)
            if(!paged.pages || paged.pages.length <= 0) return message.util.send(`${message.author}, page ${dmd.code `${paged.page}`} doesn't exist you fool, ${paged.totalPages ? `${Number(paged.totalPages) === 1 ? `There is only ${dmd.code `1`} page` : `There are only ${dmd.code `${paged.totalPages}`} pages`}` : `There is no page for you`}`)
            const embed = new MessageEmbed()
            .setTitle(`List`)
            .setDescription(paged.pages.map(m => `${m}`).join(`\n`) + `\n\nThe above member(s) don't have the ${role} role`)
            .setFooter(`requested by ${message.author.tag} - Showing page ${paged.page}/${paged.totalPages}`)
            .setColor(role.hexColor)
            return message.util.send(embed)
        }
    }
}