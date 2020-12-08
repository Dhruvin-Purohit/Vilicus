import 'discord-akairo'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'
import fn from '../../utils/functions'

export default class Ping extends Command{
    public constructor() {
        super("bettertime", {
            aliases: ["bettertime", "converttime", "cleantime"],
            editable: false,
            typing: true,
            category: "utility",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Converts time in milliseconds into a user friendly format",
                usage: "< milliseconds >"
            },
            args: [
                {
                    id: "ms",
                    type: "number",
                    prompt: {
                        start: "Input time in Milliseconds",
                        retry: "That doesn't look like a valid number.."
                    }
                }
            ]
        })
    }

    public exec(message: Message, { ms }: { ms: number }): Promise<Message> {

        /**
         * Constant Declatarations
         */
        let i_am_proud_of_this_function = fn.cleanTime(ms)

        /**
         * Embeds
         */
        const thats_too_cool = new MessageEmbed()
        .addField("Done!",`\`${ms}ms\` is same as \`${fn.cleanTime(ms)}\``)

        const thats_too_less_man = new MessageEmbed()
        .addField("Done!", `Listen, \`${ms}ms\` is less than \`1001ms\` so it's value will be less than \`1s\``)

        /**
         * Checks
         */
        if (i_am_proud_of_this_function) {

        /**
         * Result
         */
        return message.channel.send(thats_too_cool)

        } else {

        /**
         * Result
         */
        return message.channel.send(thats_too_less_man)

        }
    }
}