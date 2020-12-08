import 'discord-akairo'
import 'discord.js'
import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { performance } from 'perf_hooks'

export default class AwaitEval extends Command{
    public constructor() {
        super("awaiteval", {
            aliases: ["awaiteval"],
            editable: false,
            typing: true,
            category: "owner",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Await and Evaluate some piece of ~~shit~~ code",
                usage: "< code >",
                examples: [
                    "message.channel.send(\"Hi!\")"
                ]
            },
            ownerOnly: true,
            args: [
                {
                    id: "code",
                    match: "content",
                    prompt: {
                        start: "What should i await and evaluate?(you have 45 seconds)",
                        retry: "Try again...",
                        time: 4.5e4
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { code }: { code: string }): Promise<Message> {

        let t1 = performance.now()
        let evalled = await eval(code)
        let t2 = performance.now()

        let tt = t2 - t1
        return message.channel.send(`*Evaluated in ${tt}ms*\n\`\`\`ts\n${evalled}\`\`\``)
        
    }

}