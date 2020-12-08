import 'discord-akairo'
import { Listener } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from "discord.js"

export default class Msg extends Listener {
    public constructor() {
        super("message", {
            emitter: "client",
            event: "message",
            category: "client"
        })
    }

    public exec(message: Message) {
        if (!message.author.bot && message.content === `<@${this.client.user!.id}>` || message.content === `<@!${this.client.user!.id}>`) {
            
            const yes_its_me = new MessageEmbed()
            .setDescription(`My Prefix here is \`${this.client.cmdHandler.prefix}\`.`)
            .setFooter(`Do ${this.client.cmdHandler.prefix}help for more help`)

            message.channel.send(yes_its_me)
        }
    }
}