const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const fetch = require('node-fetch')
const emojis = require('../../utils/emojis.json')

module.exports = class extends Command {
    constructor() {
        super("bssave", {
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS'],
            description: {
                content: 'Saves your brawl stars player tag to the database',
                usage: '< Player Tag >'
            },
            prefix: 'bs',
            aliases: ['save'],
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
        if(message.author.db.udb.bs.includes(tag)) return message.channel.send(`That player tag is already linked to your account.`)
        if(message.author.db.udb.bs.length >= 3) return message.channel.send(`${message.author}, You cannot save more than ${message.author.db.udb.bs.length} player tags.`)
        try {
            const res = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${tag}`, { headers: {'Authorization': `Bearer ${this.client.bsapi}`}});
            const stats = await res.json();
            if (!stats.reason) {

                message.author.db.udb.bs.push(tag)
                await message.author.db.udb.save()
                return message.channel.send(`${message.author}, Your Brawl Stars Account,\n${dmd.bold `${stats.name}`}(${stats.tag}) has been linked to your account successfully`)
              
            } else if (res.status === 404) {
                return message.channel.send(`Next time when you run the command, give me an actually valid Brawl Stars player tag!`)
            } else {
                return message.channel.send(`Something Unknown happened,\n${dmd.bold `${emojis.basic.error}Error`}:\n${stats.reason}  | ${stats.message}`)
            }
        } catch (err) {
            this.client.emit("error", err, message, this)
        }
    }
}