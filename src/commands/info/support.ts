import 'discord-akairo'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class Support extends Command{
    public constructor() {
        super("support", {
            aliases: ["support"],//HaHa TyPoS
            editable: false,
            typing: true,
            category: "info",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Join the Support Server"
            }
        })
    }

    public async exec(message: Message) {

        /**
         * Embed Declarations
         */
        let this_is_the_best_thing_u_did_in_ur_life = new MessageEmbed()
        .setAuthor("Need more help with the bot?")
        .setDescription(`Join the support server [here](https://discord.gg/rqj2xnr3jK "ngl One of the best servers i am in")`)

        return message.util?.send(this_is_the_best_thing_u_did_in_ur_life)
    }
}