const { Listener } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const emojis = require('../../utils/emojis.json')

module.exports = class clientError extends Listener {
    constructor() {
        super("clienterror", {
            emitter: "client",
            event: "error",
            category: "client"
        })
    }

    exec(error, message, command) {

        const token = this.client.token?.split('').join('[^]{0,2}');
        const rev = this.client.token?.split('').reverse().join('[^]{0,2}');
        const tokenRegex = new RegExp(`${token}|${rev}`, 'g');

        const embedtoo = new MessageEmbed()
        .setDescription(`${emojis.discord.Preferences} We encountered and error with that command, You can report it [here](https://discord.gg/rqj2xnr3jK "Support Server")`)
        .setFooter(`I have already logged it!`)

        const embed = new MessageEmbed()
        .setTitle(`**${emojis.basic.error}Error:**`)
        .setDescription(`\`\`\`js\n${error.toString().replace(tokenRegex, "TOKEN")}\n\n\n${error.stack?.toString().replace(tokenRegex, "TOKEN")}\`\`\``)
        .addField("Message Content:", `**${message?.content.replace(tokenRegex, "**TOKEN**")}**`, true)
        .addField("Ran By:", `- ${message?.author.tag}\n- ${message?.author}\n- ${message?.author.id}`, true)
        .addField("Ran in:", `- ${message.guild || 'dms(atleast not in server)'}\n- ${message?.guild?.id ?? 'N/A'}`, true)
        .addField("Command:", `${command || `Not Defined`}`, true)
        .addField("Type:", "Client (client side) error", true)
        .addField(`\u200b`, `\u200b`, true)

        const errchannel = this.client.channels.cache.get(config.channels.error)
        if (!config.bot.ownerids.includes(message?.author.id)) {
            try {
                message?.channel.send(embedtoo)
            } catch {
                //HaHa MiSsInG PeRmS
            }
        } else {
            try {
                message?.react(emojis.basic.error)
            } catch {
                //HaHa MiSsInG PeRmS
            }
        }
        return errchannel.send(embed)
    }
}