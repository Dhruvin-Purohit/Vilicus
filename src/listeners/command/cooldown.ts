import 'discord-akairo'
import { Message } from 'discord.js';
import { Listener, Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js';
import fn from '../../utils/functions'

export default class Cooldown extends Listener {
    public constructor() {
        super("cooldown", {
            emitter: "cmdHandler",
            event: "cooldown",
            category: "command"
        })
    }

    public exec(message: Message, command: Command, cooldown: number): Promise<Message> {
        const embed = new MessageEmbed()
        .setAuthor(`Too Quick`)
        .setDescription(`${message.author} Can you not wait for \`${fn.cleanTime(cooldown) ? `${fn.cleanTime(cooldown)}` : `${cooldown}ms`}\` before using ${command.aliases[0]} Command again?`)
        return message.channel.send(embed)
    }
}