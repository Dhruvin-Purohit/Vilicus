import 'discord-akairo'
import 'discord.js'
import { Command } from 'discord-akairo'
import { Listener } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from 'discord.js'
import { Argument } from 'discord-akairo'

export default class Reload extends Command{
    public constructor() {
        super("reload", {
            aliases: ["reload"],
            editable: false,
            typing: true,
            category: "owner",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Reload a command or a listener",
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
                        start: "What do you want me to reload?(you have 45 seconds)",
                        retry: "Try again...",
                        time: 4.5e4
                    }
                }
            ],
            ownerOnly: true,
        })
    }

    public async exec(message: Message, { stuff }: { stuff: Command | Listener}): Promise<Message> {

        try{
            await stuff.reload()
        }
        catch(err){
            const embed = new MessageEmbed()
            .addField(`Error Reloading ${stuff.id}`, err)
            await message.channel.send(embed)
        }
        
        const embed = new MessageEmbed()
        .setAuthor(`${stuff.id} has been Reloaded Successfully`)
        return message.channel.send(embed)

    }

}