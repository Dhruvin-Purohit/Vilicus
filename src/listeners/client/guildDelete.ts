import 'discord-akairo'
import { Listener } from 'discord-akairo'
import { TextChannel } from 'discord.js'
import { Guild } from 'discord.js'
import { MessageEmbed } from 'discord.js'
import { logchannelid } from '../../Config'

export default class Msg extends Listener {
    public constructor() {
        super("guildDelete", {
            emitter: "client",
            event: "guildDelete",
            category: "client"
        })
    }

    public exec(guild: Guild) {

        const u_do_u = new MessageEmbed()
        .setDescription(`<:leave:784391764034977862> **Server Left**`)
        .addField(`Server`, `Name - \`${guild.name}\`
        ID - \`${guild.id}\``, true)
        .addField(`Info`, `Owner - ${guild.owner} \`${guild.ownerID}\`
        Members - \`${guild.members.cache.size}\``, true)
        .setThumbnail(`${guild.iconURL({dynamic: true})}`)

        let logs = this.client.channels.cache.get(logchannelid) as TextChannel
        logs.send(u_do_u)

    }
}