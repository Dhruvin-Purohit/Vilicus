const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const emojify = require('../../assets/letter-maps.json')
const dmd = require('discord-md-tags')

module.exports = class Emojify extends Command{
    constructor() {
        super("emojify", {
            aliases: ["emojify"],
            editable: false,
            typing: true,
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "🇪 🇲 🇴 🇯 🇮 🇫 🇾 given text",
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

        if (!stuff) return message.util.send(`You need to put in some actual text there in order for me to 🇪 🇲 🇴 🇯 🇮 🇫 🇾 it.`)

        function Emojify(text) {
            for(let i = 0; i < text.length; i++) {
                if (emojify.emoji[text[i]]) {
                    text[i] = emojify.emoji[text[i]]
                }
            }
            return text
        }
        stuff = stuff.toLowerCase()
        stuff = stuff.split('')

        let emojied = Emojify(stuff)
        emojied = emojied.join('')

        const embed = new MessageEmbed()
        .setAuthor(`🇪 🇲 🇴 🇯 🇮 🇫 🇮 🇪 🇷`)
        .setDescription(emojied)

        return message.util.send(embed)

    }
}