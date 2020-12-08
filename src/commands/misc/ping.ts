import 'discord-akairo'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class Ping extends Command{
    public constructor() {
        super("ping", {
            aliases: ["ping"],
            editable: false,
            typing: true,
            category: "misc",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Check the bot's Latency and API Latency"
            }
        })
    }

    public async exec(message: Message): Promise<Message> {

        /**
         * Embed Declarations
         */
        let do_something_productive_u_piece_of_shit = new MessageEmbed()
        .setAuthor("🏓Pinging...")
        .addField("API Latency:", `\`${this.client.ws.ping}ms\``)

        const msg = await message.channel.send(do_something_productive_u_piece_of_shit)
        do_something_productive_u_piece_of_shit = new MessageEmbed()
        .setAuthor("🏓Pong!")
        .addField("Latency:", `\`${Math.floor(msg.createdTimestamp - ((message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp))}\`ms`, true)
        .addField("API Latency:", `\`${this.client.ws.ping}ms\``, true)

        return msg.edit(do_something_productive_u_piece_of_shit)
    }
}