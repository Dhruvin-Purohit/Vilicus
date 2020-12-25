const { Listener } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const dmd = require('discord-md-tags')

module.exports = class extends Listener {
    constructor() {
        super('messageupdate', {
            emitter: "client",
            event: "messageUpdate"
        })
    }
    exec(oldMessage, newMessage) {
        if(newMessage.author.bot) return
        if(newMessage.guild.db.gdb.msglog) {
            if(newMessage.content != oldMessage.content) {
            let oldMessageContent = oldMessage.content
            if(oldMessage.content.length > 120) oldMessageContent = oldMessage.content.slice(0, 120) + '...'
            
            let newMessageContent = newMessage.content
            if(newMessage.content.length > 120) newMessageContent = oldMessage.content.slice(0, 120) + '...'
            
            const embed = new MessageEmbed()
            .setDescription(`${dmd.bold `[Message by ${newMessage.author.tag} in #${newMessage.channel.name} edited](${newMessage.url} "Jump to the Message")`}`)
            .addField(`Before:`, oldMessageContent || "\u200b")
            .addField(`After:`, newMessageContent || "\u200b")

            if(oldMessage.attachments.first()) embed.setFooter(`The message had an attachment which could not be loaded!`)
            try{
            newMessage.guild.channels.cache.get(newMessage.guild.db.gdb.msglog).send(embed)
            } catch {
                //HaHa MiSsInG PeRmS
            }
        }
        }

    }
}