import 'discord-akairo'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'
import fn from '../../utils/functions'

export default class Uptime extends Command{
    public constructor() {
        super("uptime", {
            aliases: ["uptime"],
            editable: false,
            typing: true,
            category: "misc",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Check the bot's uptime"
            }
        })
    }

    public async exec(message: Message): Promise<Message> {

        /**
         * Embed Declarations
         */
        const i_swear_if_you_dont_do_something = new MessageEmbed()
        .setDescription(`**Uptime** : \`${fn.cleanTime(this.client.uptime || 0)}\``)

        /**
         * Result
         */
        return message.channel.send(i_swear_if_you_dont_do_something)
    }
}