import 'discord-akairo'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'
import fn from '../../utils/functions'

export default class Draw extends Command{
    public constructor() {
        super("draw", {
            aliases: ["draw"],
            editable: false,
            typing: true,
            category: "fun",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Draw a Random card from a deck",
            }
        })
    }

    public exec(message: Message): Promise<Message> {
        /**
         * Constant Declaration
         */
        let base = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
        let modifier = ["♠️", "♥️", "♣️", "♦️"]
        let i_had_to_do_this_for_embed_colors = fn.choice(modifier)
        let color

        /**
         * Checks
         */
        if (i_had_to_do_this_for_embed_colors === "♣️" || "♠️") {
            color = "#000000"
        }
        else {
            color = "#ff0000"
        }

        /**
         * Embed Declarations (After Checks because rn checks define color of embeds)
         */
        const do_something_other_than_discord_u_retard = new MessageEmbed()
        .setAuthor(`I Drew`)
        .setDescription(`**${fn.choice(base)}${i_had_to_do_this_for_embed_colors}**`)
        .setColor(color)

        return message.channel.send(do_something_other_than_discord_u_retard)
        
    }
}