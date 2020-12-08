import 'discord-akairo'
import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import fn from '../../utils/functions'

export default class Roll extends Command{
    public constructor() {
        super("roll", {
            aliases: ["roll", "diceroll", "dice"],
            editable: false,
            typing: true,
            category: "fun",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Roll a dice",
                usage: "[ number of sides ]"
            },
            args: [
                {
                    id: "num",
                    type: "number",
                    default: 6
                }
            ],
            cooldown: 10000
        })
    }

    public exec(message: Message, { num }: { num: number }): Promise<Message> {
        /**
         * Constant Declarations
         */
        num = Math.ceil(num)

        /**
         * Check
         */
        if (num < 3) return message.channel.send(`Well you can't roll a dice with less than 3 sides...`)
        let me = fn.random(1, num)
        
        return message.channel.send(`\`${me}\``)
    }
}