import 'discord-akairo'
import 'discord.js'
import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { User } from 'discord.js'

export default class DM extends Command{
    public constructor() {
        super("dm", {
            aliases: ["dm"],
            editable: false,
            typing: true,
            category: "owner",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Send DM to a user..",
                usage: "< user > < message >",
                examples: [
                    "767992139850055702 Hi"
                ]
            },
            ownerOnly: true,
            args: [
                {
                    id: "user",
                    type: "user",
                    prompt: {
                        start: "Which User do i send DM to?(you have 45 seconds)",
                        retry: "Try again...",
                        time: 4.5e4
                    }
                },
                {
                    id: "msg",
                    match: "rest",
                    prompt: {
                        start: "What should the message be?",
                        retry: "Try again...",
                        time: 4.5e4
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { user, msg }: { user: User,msg: string }): Promise<Message> {
        const confirmation = new Promise(async resolve => { 
            await message.channel.send(`Are sure you want to dm that to ${user.tag}?(\`y\`/\`n\`)`) //Fuck these slashes
            await message.channel.awaitMessages(m => m.author.id == message.author.id && ["y", "n", "yes", "no"].includes(m.content.toLowerCase()), {
                max: 1,
                time: 4.5e4,
                errors: [ "time" ]
            })
            .then(collection => ["y", "yes"].includes(collection.first()?.cleanContent?.toLowerCase() ?? "") ? resolve(true) : resolve(false))
            .catch(() => resolve(false))
        })
        if (await confirmation) {
        await message.client.users.cache.get(user.id)?.send(msg)
        return message.channel.send("Done👍🏻")
        }
        else {
            return message.channel.send("I was pretty sure you were going to cancel")
        }
    }

}