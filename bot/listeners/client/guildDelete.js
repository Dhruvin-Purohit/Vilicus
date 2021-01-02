const { Listener } = require('discord-akairo')
const config = require('../../config.json')
const emojis = require('../../utils/emojis.json')
const dmd = require('discord-md-tags')
const { MessageEmbed } = require('discord.js')
const GuildModel = require('../../structures/Database/GuildDatabase')

module.exports = class extends Listener {
    constructor() {
        super('guilddelete', {
            emitter: 'client',
            event: 'guildDelete'
        })
    }

    async exec(guild) {

        await GuildModel.findOneAndDelete({
            id: guild.id
        })

        const embed = new MessageEmbed()
        .setTitle(`${emojis.other.leave} Left ${guild.name}`)
        .addField(`Info:`, `ID: ${dmd.code `${guild.id}`}\nOwner: ${guild.owner}(${dmd.code `${guild.ownerID}`})\nMembers: ${guild.members.cache.size}`)
        .setThumbnail(`${guild.iconURL({dynamic: true})}`)
        try {
            this.client.channels.cache.get(config.channels.other).send(embed)
        } catch {
            //HaHa MiSsInG PeRmS
        }
    }
}