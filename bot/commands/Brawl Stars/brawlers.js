const { Command } = require('discord-akairo')
const fetch = require('node-fetch')
const dmd = require('discord-md-tags')
const emojis = require('../../utils/emojis.json')
const { MessageEmbed } = require('discord.js')
const fn = require('../../utils/functions')

module.exports = class extends Command {
    constructor() {
        super('bsbrawlers', {
            aliases: ['brawler', 'brawlers'],
            prefix: 'bs',
            clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES'],
            typing: true,
            args: [
                {
                    id: 'tag',
                    type: 'string'
                }
            ],
            description: {
                content: 'Get brawl stars brawlers of a given player tag or of linked account',
                usage: '[ Player tag ]'
            },
            cooldown: 4.5e4
        })
    }

    async exec(message, { tag }) {
        if(!tag) {
        if(!message.author.db.bstag || message.author.db.bstag.length < 1) return message.channel.send(`No Linked account found. Link account and try again`)
        //add that trusted check here after getting starlist api key.
        try {
            const res = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${message.author.db.bstag[0]}`, { headers: {'Authorization': `Bearer ${this.client.bsapi}`}});
            const stats = await res.json()

            if(res.status ===404) return message.channel.send(`The player tag linked to your account is incorrect do change that later.`)
            if(res.status === 200) {
            let brawlers = []
            let i
            for (i = 0; i < stats.brawlers.length; i++ ) {
                brawlers.push(stats.brawlers[i])
            }
            const paginator = new fn.Pageinator(message, stats.name, brawlers, (b) => `Name: ${dmd.code `${b.name}`}\nPower Level: ${dmd.code `${b.power}`}\nRank: ${dmd.code `${b.rank}`}\nTrophies: ${dmd.code `${b.trophies}`}\nHighest Trophies: ${dmd.code `${b.highestTrophies}`}${b.gadgets.length ? `\nGadgets: ${dmd.code `${b.gadgets.map((m) => m.name).join(`, `)}`}` : ``}${b.starPowers.length ? `\nStar Power(s): ${dmd.code `${b.starPowers.map((m) => m.name).join(`, `)}`}` : `` }`, 1, "#" + stats.nameColor.slice(4))

            //paginator.generate()
            } else {
                return message.channel.send(`Something Strange happened kindly report it,\n${dmd.bold `${emojis.basic.error}Error`}:\n${stats.reason}  | ${stats.message}`)
            }
        } catch(err) {
            this.client.emit('error', err, message, this)
        }
        } else {
            let tagrgx = /^#?[0-9A-Z]/i
            if(!tagrgx.test(tag)) return message.channel.send(`Invalid player tag provided!`)
            if(tag.startsWith('#')) tag = tag.slice(1)
        try {
            const res = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${tag}`, { headers: {'Authorization': `Bearer ${this.client.bsapi}`}});
            const stats = await res.json()
    
            if(res.status ===404) return message.channel.send(`Invalid player tag provided!`)
            if(res.status === 200) {
                let brawlers = []
                let i
                for (i = 0; i < stats.brawlers.length; i++ ) {
                    brawlers.push(stats.brawlers[i])
                }
                const embed = new MessageEmbed()
                .setTitle(`${stats.name}'s Bralwers`)
                .setDescription(`${brawlers.map((b) => `Name: ${dmd.code `${b.name}`}\nPower Level: ${dmd.code `${b.power}`}\nRank: ${dmd.code `${b.rank}`}\nTrophies: ${dmd.code `${b.trophies}`}\nHighest Trophies: ${dmd.code `${b.highestTrophies}`} ${b.gadgets.length ? `\nGadgets: ${dmd.code `${b.gadgets.map((m) => m.name).join(`, `)}`}` : ``} ${b.starPowers ? `Star Power(s): ${dmd.code `${b.starPowers.map((m) => m.name).join(`, `)}`}` : `` }`).join(`\n`)}`)
                .setColor("#" + stats.nameColor.slice(4))
                return message.channel.send(embed)
            } else {
                    return message.channel.send(`Something Strange happened kindly report it,\n${dmd.bold `${emojis.basic.error}Error`}:\n${stats.reason}  | ${stats.message}`)
                }
            } catch(err) {
                this.client.emit('error', err, message, this)
            }
        
        }
    }
}