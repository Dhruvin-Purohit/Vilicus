const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const { MessageEmbed } = require('discord.js')
const fn = require('../../utils/functions')

module.exports = class Guilds extends Command {
    constructor() {
        super('guilds', {
            aliases: ['guilds', 'servers'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS'],
            ownerOnly: true,
            description: {
                content: 'Get a full list of servers vilicus is in!',
                usage: '[ page ]'
            },
            args: [{
                id: 'page',
                type: 'number',
                default: 1
            }]
        })
    }
    async exec(message, { page }) {
        let guilds = this.client.guilds.cache

        if(guilds.size < 11) {
            const embed = new MessageEmbed()
            .setTitle('Guilds List')
            .setDescription(guilds.sort((a, b) => a.members.cache.size - b.members.cache.size).map(m => `${m} - ${dmd.bold `(${m.id})`}`))
            return message.channel.send(embed)
        } else {
            let paged = fn.paginate(guilds.sort((a, b) => a.members.cache.size - b.members.cache.size).map(m => `${m} - ${dmd.bold `(${m.id})`}`), page)
            if(!paged.pages || paged.pages.length <= 0) return message.channel.send(`${message.author}, page ${dmd.code `${paged.page}`} doesn't exist you fool, ${paged.totalPages ? `${Number(paged.totalPages) === 1 ? `There is only ${dmd.code `1`} page` : `There are only ${dmd.code `${paged.totalPages}`} pages`}` : `There is no page for you`}`)
            const embed = new MessageEmbed()
            .setTitle('Guild List')
            .setDescription(paged.pages.map(m => `${m}`).join(`\n`))
            .setFooter(`Showing page ${paged.page}/${paged.totalPages}`)
            return message.channel.send(embed)
        }
    }
}