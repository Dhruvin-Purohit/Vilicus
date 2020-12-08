import 'discord-akairo'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class AllRoles extends Command{
    public constructor() {
        super("allroles", {
            aliases: ["allroles", "listroles"],
            editable: false,
            channel: "guild",
            typing: true,
            category: "misc",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "View All roles of the server"
            }
        })
    }

    public exec(message: Message): Promise<Message> {
        /**
         * Format will not be followed because this command is of minimal length
         */
        if (message.guild?.roles && message.guild.roles.cache.size >= 2) {//remove the everyone role from here

        const heck_yeah_another_stupid_yet_good_command = new MessageEmbed()
        .setDescription(message.guild.roles.cache.map(r => r).join(`\n`))

        return message.channel.send(heck_yeah_another_stupid_yet_good_command)
        }
        else {

        const bitch_make_some_roles = new MessageEmbed()
        .setDescription(`Actually there is no role in this server...`)

        return message.channel.send(bitch_make_some_roles)
        }
    }
}