import 'discord-akairo'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class Ping extends Command{
    public constructor() {
        super("eval", {
            aliases: ["eval"],
            editable: false,
            typing: true,
            category: "owner",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Evaluate some piece of ~~shit~~ code",
                usage: "eval < code >",
                examples: [
                    "eval message.author"
                ]
            },
            ownerOnly: true,
            args: [
                {
                    id: "typeofcode",
                    type: (_: Message, str: string): null | string => {
                        if (str && ["ts", "js"].includes(str)) return str;
                        else return null;
                    },
                    default: "js",
                    prompt: {
                        start: "What should i evaluate?(you have 45 seconds)",
                        retry: "Try again..",
                        timeout: 4.5e4
                    }
                },
                {
                    id: "code",
                    type: "content",
                    match: "option"
                }
            ]
        })
    }

    public exec(message: Message, { typeofcode, code }: { typeofcode: string , code: string}): Promise<Message> {

        const embed = new MessageEmbed()
        .setDescription(`\`\`\`${typeofcode || ""}\n${eval(code)}\`\`\``)
        return message.channel.send(embed)

    }
}