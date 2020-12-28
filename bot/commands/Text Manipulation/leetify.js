const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const leet = require('../../assets/letter-maps.json')
const dmd = require('discord-md-tags')

module.exports = class Leetify extends Command{
    constructor() {
        super("leetify", {
            aliases: ["leetify"],
            editable: false,
            typing: true,
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "l3371fy given text",
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

        if (!stuff) return message.util.send(`You need to put in some actual text there in order for me to l3371fy it.`)

        function Leetify(text) {
            for(let i = 0; i < text.length; i++) {
                if (leet.leet[text[i]]) {
                    text[i] = leet.leet[text[i]]
                }
            }
            return text
        }
        stuff = stuff.toLowerCase()
        stuff = stuff.split('')

        let leeted = Leetify(stuff)
        leeted = leeted.join('')

        const embed = new MessageEmbed()
        .setAuthor(`L337 63n3r470r`)
        .setDescription(dmd.codeblock() `${leeted}`)

        return message.util.send(embed)

    }
}