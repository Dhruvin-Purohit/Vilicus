import 'discord-akairo'
import 'discord.js'
import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { MessageEmbed } from 'discord.js'

export default class Reload extends Command{
    public constructor() {
        super("reloadall", {
            aliases: ["reloadall"],
            editable: false,
            typing: true,
            category: "owner",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Reload everything"
            },
            ownerOnly: true,
        })
    }

    public async exec(message: Message): Promise<Message> {

        await this.client.cmdHandler.reloadAll()
        await this.client.eventHandler.reloadAll()
        const embed = new MessageEmbed()
        .setAuthor(`Reloaded Everything`)
        return message.channel.send(embed)
    }

}