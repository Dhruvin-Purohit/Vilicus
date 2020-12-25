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
    exec(oldmessage, newmessage) {
        if(newmessage.author.bot) return
        if(newmessage.guild.db.gdb.msglog) {
            if(newmessage.content != oldmessage.content)
            const embed = new MessageEmbed()
            .setTitle(`[Message by ${newmessage.author.tag} in #${newmessage.channel.name} edited](${newmessage.url} "Jump to the Message")`)
            .setDescription(`${dmd.bold `Before:`}\n${oldmessage.content || "\u200b"}\n${dmd.bold `After:`}\n${newmessage.content || "\u200b"}`)
            if(oldmessage.attachments.first()) embed.setFooter(`The message had an attachment which could not be loaded!`)
            try{
            newmessage.guild.channels.cache.get(newmessage.guild.db.gdb.msglog).send(embed)
            } catch {
                //HaHa MiSsInG PeRmS
            }
        }

    }
}