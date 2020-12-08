import 'discord-akairo'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class Clapify extends Command{
    public constructor() {
        super("Clapify", {
            aliases: ["clapify", "clap", "claptext"],
            editable: false,
            typing: true,
            category: "fun",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Don't 👏 ask 👏 me 👏 to 👏describe 👏 this",
                usage: "< Arguements to *clap* with >"
            },
            args: [
                {
                    id: "args",
                    match: "rest",
                }
            ]
        })
    }

    public exec(message: Message, { args }: { args: string }): Promise<Message> {

        /**
         * Constant Declaration
         */
        let i_clap

        /**
         * Embeds Declaration
         */
        const claps_where = new MessageEmbed()
        .setDescription(`Give 👏 me 👏 something`)

        /**
         * Checks
         */
        if (!args) return message.channel.send(claps_where)

        /**
         * Calculations or whatever you call it
         */
        if (args.split(" ").length === 1) i_clap = args[0].split(" ").join(" 👏 ")
        else i_clap = args.split(" ").join(" 👏 ")

        /**
         * Result
         * This Embed needs to be here.
         */
        
        const me_clap = new MessageEmbed()
        .setDescription(i_clap)

        return message.channel.send(me_clap)
    }
}