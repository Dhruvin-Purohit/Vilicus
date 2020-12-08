import 'discord-akairo'
import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import fn from '../../utils/functions'

export default class Draw extends Command{
    public constructor() {
        super("choose", {
            aliases: ["choose"],
            editable: false,
            typing: true,
            category: "fun",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Make the bot choose between things",
                usage: "< Arguements to choose from >"
            },
            args: [
                {
                    id: "args",
                    match: "rest",
                }
            ]
        })
    }

    public exec(message: Message, { args }: { args: string}): Promise<Message> {

        /**
         * This check has to go first with it's respective text
         */
        const give_something_to_choose_from = `Next time when you run this command, give me some options to choose from`
        if (!fn.cleanArray(args.split(" "))) return message.channel.send(give_something_to_choose_from)
        
        /**
         * Texts look better than embeds
         */
        const thats_what_i_choose_if_u_dont_give_me_choices = `Well i chose \`${fn.cleanArray(args.split(" "))[0]}\` as you did not give me any other choice`
        const its_my_choice = `\`${fn.choice(fn.cleanArray(args.split(" ")))}\``

        /**
         * Checks and result
         */
        if(fn.cleanArray(args.split(" ")).length === 1) return message.channel.send(thats_what_i_choose_if_u_dont_give_me_choices)
        else return message.channel.send(its_my_choice)

    }
}