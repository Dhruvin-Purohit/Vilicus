import 'discord-akairo'
import { Listener } from 'discord-akairo'
import { TextChannel } from 'discord.js'
import { Guild } from 'discord.js'
import { MessageEmbed } from 'discord.js'
import { logchannelid } from '../../Config'

export default class Msg extends Listener {
    public constructor() {
        super("guildCreate", {
            emitter: "client",
            event: "guildCreate",
            category: "client"
        })
    }

    public exec(guild: Guild) {

        const u_do_u = new MessageEmbed()
        .setDescription(`<:join:784391624889073694> **Server Joined**`)
        .addField(`Server`, `Name - ${guild.name}
        ID - \`${guild.id}\``, true)
        .addField(`Info`, `Owner - ${guild.owner} \`${guild.ownerID}\`
        Members - \`${guild.members.cache.size}\``, true)
        .setThumbnail(`${guild.iconURL({dynamic: true})}`)

        let logs = this.client.channels.cache.get(logchannelid) as TextChannel
        logs.send(u_do_u)

        const channel = guild.channels.cache.get((guild.channels.cache.filter(c => c.type === 'text').map(c => c.id))[0]) as TextChannel
        const sup = new MessageEmbed()
        .setDescription(`My prefix is \`${this.client.cmdHandler.prefix}\`
        Do \`${this.client.cmdHandler.prefix}help\` to see all available commands`)
        .setFooter(`❤️ Thank you for inviting me`)

        try {
            channel?.send(sup)
        } catch {
            //ik misisng perms so why do nything at first!
        }
    }
}