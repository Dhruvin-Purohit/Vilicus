const { Listener } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const dmd = require('discord-md-tags')

module.exports = class MessageDelete extends Listener {
    constructor() {
        super('messagedelete', {
            emitter: "client",
            event: "messageDelete",
            category: "client"
        })
    }
    exec(message) {
        if(message.author.bot) return

        if(message.mentions.members.filter(m => !m.user.bot).filter(m => m.id != message.author.id).size > 0 || message.mentions.roles.filter(m => !m.managed).size > 0) {

            const embed = new MessageEmbed()
            .setTitle(`${dmd.bold `Ghost Tag!`}`)
            .addField(`User:`, `${message.author} (${message.author.id})`)
            .addField(`Message:`, message.content)
            .setColor(message.guild.me.displayHexColor)

            message.channel.send(embed)
        }
    }
}