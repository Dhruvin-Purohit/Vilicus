const { Listener } = require('discord-akairo')
const config = require('../../config.json')
const emojis = require('../../utils/emojis.json')
const dmd = require('discord-md-tags')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Listener {
    constructor() {
        super('guildcreate', {
            emitter: 'client',
            event: 'guildCreate'
        })
    }

    async exec(guild) {
        
        const embed = new MessageEmbed()
        .setTitle(`${emojis.other.join} Joined ${guild.name}`)
        .addField(`Info:`, `ID: ${dmd.code `${guild.id}`}\nOwner: ${guild.owner}(${dmd.code `${guild.ownerID}`})\nMembers: ${guild.members.cache.size}`)
        .setThumbnail(`${guild.iconURL({dynamic: true})}`)
        try {
            this.client.channels.cache.get(config.channels.other).send(embed)
        } catch {
            //HaHa MiSsInG PeRmS
        }

        const newembed = new MessageEmbed()
        .setTitle(`Thanks for inviting me ❤️`)
        .setDescription(`My prefix is ${dmd.code `${this.client.CommandHandler.prefix}`},\nDo ${dmd.code `${this.client.CommandHandler.prefix}help`} for help`)
        try {
            guild.channels.cache.get(guild.channels.cache.first()).send(newembed)
        } catch {
            //HaHa MiSsInG PeRmS
        }
    }
}