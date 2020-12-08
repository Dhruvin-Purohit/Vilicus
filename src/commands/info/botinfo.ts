import 'discord-akairo'
import * as djs from 'discord.js'
import * as da from 'discord-akairo'
import * as ts from 'typescript'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'
import fn from '../../utils/functions'
import * as os from 'os'

export default class BotInfo extends Command{
    public constructor() {
        super("botinfo", {
            aliases: ["botinfo"],
            editable: false,
            typing: true,
            category: "info",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Get the bot's stats info etc",
            }
        })
    }

    public exec(message: Message): Promise<Message> {

    /**
     * Embed Declarations
     */
    const embed = new MessageEmbed()
    .addField("❯ Statistics",
    `Users: \`${this.client.users.cache.size}\`
    Servers: \`${this.client.guilds.cache.size}\`
    Uptime: \`${fn.cleanTime(this.client.uptime || 0) || `${this.client.uptime}ms`}\`
    Latency: \`${this.client.ws.ping}ms\`
    Average Server Size: \`${(this.client.users.cache.size / this.client.guilds.cache.size).toFixed(2)}\``)
    .addField("❯ Technical Statistics",
    `OS Version: \`${os.version}\`
    Total Memory: \`${(((os.totalmem() / 1024) / 1024) / 1204).toFixed(2)} GB\`
    Free Memory: \`${(((os.freemem() / 1024) / 1024) / 1204).toFixed(2)} GB\`
    Platform: \`${os.platform}\`
    Node JS Version: \`${process.version}\`
    Discord.js Version: \`${djs.version}\`
    Discord Akairo Version: \`${da.version}\`
    Typescript Version: \`${ts.version}\``)
    .setFooter(`The Above stats are cached stats and the actual stats may vary`)

    /**
     * Result
     */
    return message.channel.send(embed)
    }
}