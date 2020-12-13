const { Command } = require('discord-akairo')

module.exports = class DM extends Command{
    constructor() {
        super("dm", {
            aliases: ["dm"],
            editable: false,
            typing: true,
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Send DM to a user...",
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

    async exec(message, { user, msg }) {
        const confirmation = new Promise(async resolve => { 
            await message.channel.send(`Are sure you want to dm that to ${user.tag}?(\`y\`/\`n\`)`)
            await message.channel.awaitMessages(m => m.author.id == message.author.id && ["y", "n", "yes", "no"].includes(m.content.toLowerCase()), {
                max: 1,
                time: 4.5e4,
                errors: [ "time" ]
            })
            .then(collection => ["y", "yes"].includes(collection.first()?.cleanContent?.toLowerCase() ?? "") ? resolve(true) : resolve(false))
            .catch(() => resolve(false))
        })
        if (await confirmation) {
            try {
                await message.client.users.cache.get(user.id)?.send(msg)
                return message.channel.send("Done👍🏻")
            } catch {
                return message.channel.send(`Couldn't send dm👎🏻`)
            }
        }
        else {
            return message.channel.send("I was pretty sure you were going to cancel")
        }
    }

}