import 'discord-akairo'
import { Message, TextChannel } from 'discord.js';
import { Listener, Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js';
import '../../Config'
import { errorlogid, ownerIDs } from '../../Config';

export default class clientError extends Listener {
    public constructor() {
        super("clienterror", {
            emitter: "client",
            event: "error",
            category: "client"
        })
    }

    public exec(error: Error, message: Message, command: Command): Promise<Message> {

        const token = this.client.token?.split('').join('[^]{0,2}');
        const rev = this.client.token?.split('').reverse().join('[^]{0,2}');
        const tokenRegex = new RegExp(`${token}|${rev}`, 'g');

        const embedtoo = new MessageEmbed()
        .setDescription(`There is an Error with that command`)
        .setFooter(`Report that to ${message.client.users.cache.get(ownerIDs[0])?.username}`)

        const embed = new MessageEmbed()
        .setAuthor(`Error:`)
        .setDescription(`\`\`\`ts\n${error.toString().replace(tokenRegex, "TOKEN")}\n\n\n${error.stack?.toString().replace(tokenRegex, "TOKEN")}\`\`\``)
        .addField("Message Content:", `**${message.content.replace(tokenRegex, "**TOKEN**")}**`, true)
        .addField("Ran By:", `- ${message.author.tag}\n- ${message.author}\n- ${message.author.id}`, true)
        .addField("Ran in:", `- ${message.guild || 'dms(atleast not in server)'}\n- ${message.guild?.id ?? 'N/A'}`, true)
        .addField("Command:", command, true)
        .addField("Type:", "Client (client side) error", true)
        .addField(`\u200b`, `\u200b`, true)
        const errchannel = message.client.channels.cache.get(errorlogid) as TextChannel
        try {
        message.channel.send(embedtoo)
        } catch {
            //HaHa MiSsInG PeRmS
        }
        return errchannel.send(embed)
    }
}