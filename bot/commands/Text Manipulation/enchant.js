const { Command } = require('discord-akairo')
const minecraft = require('../../assets/letter-maps.json')
const dmd = require('discord-md-tags')

module.exports = class Enchant extends Command{
    constructor() {
        super("enchant", {
            aliases: ["enchant"],
            editable: false,
            typing: true,
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Enchant given text",
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

        if (!stuff) return message.util.send(`You need to put in some actual text there in order for me to enchant it.`)

        function Enchant(text) {
            for(let i = 0; i < text.length; i++) {
                if (minecraft.enchant[text[i]]) {
                    text[i] = minecraft.enchant[text[i]]
                }
            }
            return text
        }
        stuff = stuff.toLowerCase()
        stuff = stuff.split('')
        let enchanted = Enchant(stuff)
        enchanted = enchanted.join('')

        return message.util.send(`${dmd.codeblock("js") `${enchanted}`}`)

    }
}
