const { Command } = require('discord-akairo')
const emojis = require('../../utils/emojis.json')

module.exports = class extends Command {
    constructor() {
        super("bsunsave", {
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS'],
            description: {
                content: 'Unsaves your brawl stars player tag from the database',
                usage: '< Player Tag >'
            },
            prefix: 'bs',
            aliases: ['unsave'],
            typing: true,
            args: [
                {
                    id: 'tag',
                    type: 'string'
                }
            ]
        })
    }

    async exec(message, { tag }) {
        if(!tag) return message.channel.send(`No player tag provided`)
        let tagrgx = /^#?[0-9A-Z]/i
        if(!tagrgx.test(tag)) return message.channel.send(`Invalid player tag provided!`)
        if(tag.startsWith('#')) tag = tag.slice(1)//Big brain
        if(!message.author.db.udb.bs.includes(tag)) return message.channel.send(`Provided tag is not linked, hence cannot be unlinked`)
        message.athor.db.udb.bs = fn.drop(message.author.db.udb.bs, tag)
        return message.react(emojis.discord.CheckMark)
    }
}