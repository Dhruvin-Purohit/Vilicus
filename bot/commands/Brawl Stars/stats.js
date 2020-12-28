const { Command } = require('discord-akairo')
const fetch = require('node-fetch')
const dmd = require('discord-md-tags')
const emojis = require('../../utils/emojis.json')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor() {
        super('bsstats', {
            aliases: ['stats', 'statistics', 'profile'],
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
                content: 'Get brawl stars stats of a given player tag or of linked account',
                usage: '[ Player tag ]'
            },
            cooldown: 10e4
        })
    }

    async exec(message, { tag }) {
        if(!tag) {
        if(!message.author.db.bstag || message.author.db.bstag.length < 1) return message.util.send(`No Linked account found. Link account and try again`)
        //add that trusted check here after getting starlist api key.
        try {
            const res = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${message.author.db.bstag[0]}`, { headers: {'Authorization': `Bearer ${this.client.bsapi}`}});
            const stats = await res.json()

            if(res.status ===404) return message.util.send(`The player tag linked to your account is incorrect do change that later.`)
            if(res.status === 200) {
                let brawlers = []
                let i
                for (i = 0; i < stats.brawlers.length; i++ ) {
                    brawlers.push(dmd.code `${stats.brawlers[i].name}`)
                }
                const embed = new MessageEmbed()
                .setTitle(`${stats.name}`)
                .addField(`Profile`, `Name: ${dmd.code `${stats.name}`}\nTag: ${dmd.code `${stats.tag}`}\nExperience Level: ${dmd.code `${stats.expLevel}`}\nTrophies: ${dmd.code `${stats.trophies || 0}/${stats.highestTrophies || 0}`}\nPower Play Points: ${dmd.code `${stats.powerPlayPoints || 0}/${stats.highestPowerPlayPoints}`}`, true)
                .addField(`Victories`, `3v3: ${dmd.code `${stats['3vs3Victories'] || 0}`}\nDuo: ${dmd.code `${stats.duoVictories || 0}`}\nSolo: ${dmd.code `${stats.soloVictories || 0}`}\nTotal: ${dmd.code `${stats.soloVictories + stats.duoVictories + stats["3vs3Victories"]}`}`, true)
                if(stats.club) {
                embed.addField(`Club`, `Name:${dmd.code `${stats.club.name}`}\nTag: ${dmd.code `${stats.club.tag}`}`, true)
                }
                embed.addField(`Brawlers`, `${brawlers.join(`, `)}`)
                .setColor("#" + stats.nameColor.slice(4))
                return message.util.send(embed)
            } else {
                return message.util.send(`Something Strange happened kindly report it,\n${dmd.bold `${emojis.basic.error}Error`}:\n${stats.reason}  | ${stats.message}`)
            }
        } catch(err) {
            this.client.emit('error', err, message, this)
        }
        } else {
            let tagrgx = /^#?[0-9A-Z]/i
            if(!tagrgx.test(tag)) return message.util.send(`Invalid player tag provided!`)
            if(tag.startsWith('#')) tag = tag.slice(1)
        try {
            const res = await fetch(`https://bsproxy.royaleapi.dev/v1/players/%23${tag}`, { headers: {'Authorization': `Bearer ${this.client.bsapi}`}});
            const stats = await res.json()
    
            if(res.status ===404) return message.util.send(`Invalid player tag provided!`)
            if(res.status === 200) {
                let brawlers = []
                let i
                for (i = 0; i < stats.brawlers.length; i++ ) {
                    brawlers.push(dmd.code `${stats.brawlers[i].name}`)
                }
                const embed = new MessageEmbed()
                .setTitle(`${stats.name}`)
                .addField(`Profile`, `Name: ${dmd.code `${stats.name}`}\nTag: ${dmd.code `${stats.tag}`}\nExperience Level: ${dmd.code `${stats.expLevel}`}\nTrophies: ${dmd.code `${stats.trophies || 0}/${stats.highestTrophies || 0}`}\nPower Play Points: ${dmd.code `${stats.powerPlayPoints || 0}/${stats.highestPowerPlayPoints}`}`, true)
                .addField(`Victories`, `3v3: ${dmd.code `${stats['3vs3Victories'] || 0}`}\nDuo: ${dmd.code `${stats.duoVictories || 0}`}\nSolo: ${dmd.code `${stats.soloVictories || 0}`}\nTotal: ${dmd.code `${stats.soloVictories + stats.duoVictories + stats["3vs3Victories"]}`}`, true)
                if(stats.club) {
                embed.addField(`Club`, `Name:${dmd.code `${stats.club.name}`}\nTag: ${dmd.code `${stats.club.tag}`}`, true)
                }
                embed.addField(`Brawlers`, `${brawlers.join(`, `)}`)
                .setColor("#" + stats.nameColor.slice(4))
                return message.util.send(embed)
                } else {
                    return message.util.send(`Something Strange happened kindly report it,\n${dmd.bold `${emojis.basic.error}Error`}:\n${stats.reason}  | ${stats.message}`)
                }
            } catch(err) {
                this.client.emit('error', err, message, this)
            }
        
        }
    }
}