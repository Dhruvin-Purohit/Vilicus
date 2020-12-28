const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const vapor = require('../../assets/letter-maps.json')

module.exports = class Vaporwave extends Command{
    constructor() {
        super("vaporwave", {
            aliases: ["vaporwave"],
            editable: false,
            typing: true,
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "ｖ ａ ｐ ｏ ｒ ｗ ａ ｖ ｅ given text",
                usage: "< text >"
            },
            args: [
                {
                    id: "stuff",
                    match: "rest"
                }
            ]
        })
    }

    async exec(message, { stuff }) {

        if (!stuff) return message.util.send(`You need to put in some actual text there in order for me to ｖ ａ ｐ ｏ ｒ ｗ ａ ｖ ｅ it.`)

        function Vapor(text) {
            for(let i = 0; i < text.length; i++) {
                if (vapor.vaporwave[text[i]]) {
                    text[i] = vapor.vaporwave[text[i]]
                }
            }
            return text
        }
        stuff = stuff.toLowerCase()
        stuff = stuff.split('')

        let vapored = Vapor(stuff)
        vapored = vapored.join('')

        const embed = new MessageEmbed()
        .setDescription(`\`\`\`${vapored}\`\`\``)

        return message.util.send(embed)

    }
}