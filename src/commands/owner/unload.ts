import 'discord-akairo'
import 'discord.js'
import { Command } from 'discord-akairo'
import { Listener } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from 'discord.js'
import { Argument } from 'discord-akairo'

export default class Unload extends Command{
    public constructor() {
        super("unload", {
            aliases: ["unload"],
            editable: false,
            typing: true,
            category: "owner",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Unload a command or a listener",
                usage: "< command | listener >",
                examples: [
                    "ping",
                    "cmdError"
                ]
            },
            args: [
                {
                    id: "stuff",
                    type: Argument.union("command", "listener"),
                    prompt: {
                        start: "What do you want me to unload?(you have 45 seconds)",
                        retry: "Try again...",
                        time: 4.5e4
                    }
                }
            ],
            ownerOnly: true,
        })
    }

    public async exec(message: Message, { stuff }: { stuff: Command | Listener}): Promise<Message> {

        const confirmation = new Promise(async resolve => { 
            await message.channel.send(`Are sure you want to unload ${stuff.id}?(\`y\`/\`n\`)`) //Fuck these slashes
            await message.channel.awaitMessages(m => m.author.id == message.author.id && ["y", "n", "yes", "no"].includes(m.content.toLowerCase()), {
                max: 1,
                time: 4.5e4,
                errors: [ "time" ]
            })
            .then(collection => ["y", "yes"].includes(collection.first()?.cleanContent?.toLowerCase() ?? "") ? resolve(true) : resolve(false))
            .catch(() => resolve(false))
        })
        if (await confirmation) {
        try{
            await stuff.remove()
        }
        catch(err){
            const embed = new MessageEmbed()
            .addField(`Error Unloading ${stuff.id}`, err)
            await message.channel.send(embed)
        }
        
        const embed = new MessageEmbed()
        .setAuthor(`${stuff.id} has been Unloaded Successfully`)
        return message.channel.send(embed)
        } else {
            return message.channel.send("I was pretty sure you were going to cancel")
        }

    }

}