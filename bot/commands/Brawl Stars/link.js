const { Command } = require('discord-akairo')
const fetch = require('node-fetch')
const dmd = require('discord-md-tags')

module.exports = class extends Command {
    constructor() {
        super('bslink', {
            prefix: 'bs',
            aliases: ['link'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD'],
            description: {
                content: 'Links a given brawl stars club to the discord server',
                usage: '< Club Tag >'
            },
            args: [
                {
                    id: 'tag',
                    type: 'string'
                }
            ],
            cooldown: 10e4
        })
    }

    async exec(message, { tag }) {
        if(message.guild.db.gdb.bsclub) return message.util.send(`One Club is already linked to this server, unlink that and try again`)
        if(!tag) return message.util.send(`No Club tag provided`)
        let tagrgx = /^#?[0-9A-Z]/i
        if(!tagrgx.test(tag)) return message.util.send(`Invalid Club tag provided`)
        if(tag.startsWith('#')) tag = tag.slice(1)
        try {//if that does not work i will change the clubs club //I hate that i don't have internet
            const res = await fetch(`https://bsproxy.royaleapi.dev/v1/clubs/%23${tag}`, { headers: {'Authorization': `Bearer ${this.client.bsapi}`}});
            const stats = await res.json();

            if (!stats.reason) {

                message.guild.db.gdb.bsclub = tag
                await message.guild.db.gdb.save()
                return message.util.send(`${message.author}, The Brawl Stars club,\n${dmd.bold `${stats.name}`}(${stats.tag}) has been linked to this discord server successfully`)

            } else if (res.status === 404) {
                return message.util.send(`Next time when you run the command, give me an actually valid Brawl Stars club tag!`)
            } else {
                return message.util.send(`Something Unknown happened,\n${dmd.bold `${emojis.basic.error}Error`}:\n${stats.reason}  | ${stats.message}`)
            }
        } catch (err) {
            this.client.emit("error", err, message, this)
        }
    }
}