import 'discord-akairo'
import { Message } from 'discord.js';
import { Listener, Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js';
import * as permissions from '../../assets/permssions.json'

export default class Cooldown extends Listener {
    public constructor() {
        super("missingPermissions", {
            emitter: "cmdHandler",
            event: "missingPermissions",
            category: "command"
        })
    }

    public exec(message: Message, command: Command, type: string, missing: any): Promise<Message> {

        let perm = missing.map((p: string) => permissions[p])

        if (type === 'client') {
        const embed = new MessageEmbed()
        .setAuthor(`Missing Permssions`)
        .setDescription(`${message.author} I need the \`${(perm.map((p: string) => ` ${p}`)).toString().slice(1)}\` Permission(s) to run the ${command} Command`)
        return message.channel.send(embed)
        }
        else if (type === 'user') {
            const embedtoo = new MessageEmbed()
            .setAuthor(`Missing Permissions`)
            .setDescription(`${message.author} You need the \`${(perm.map((p: string) => ` ${p}`)).toString().slice(1)}\` Permission to run the ${command} Command`)
            return message.channel.send(embedtoo)
        }
        else {
            return message.channel.send(`That is sus and is not supposed to happen...(maybe it is an error)`)
        }
    }
}