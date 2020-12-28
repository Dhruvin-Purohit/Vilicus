const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const fn = require('../../utils/functions')

module.exports = class Choose extends Command {
    constructor() {
        super("choose", {
            aliases: ["choose"],
            typing: true,
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Let Vilicus make choices!",
                usage: "< Options >"
            },
            args: [
                {
                    id: "args",
                    match: "rest",
                }
            ]
        })
    }

    async exec(message, { args }) {
        if (!args) return message.util.send(`Next time when you run this command, give me some options to choose from`)
        if(fn.cleanArray(args.split(" ")).length === 1) return message.util.send(`I guess i will just go with ${dmd.bold `${fn.cleanArray(args.split(" "))[0]}`} as there seems to be no other option`)
        else return message.util.send("I chose" + dmd.bold `${fn.choice(fn.cleanArray(args.split(" ")))}`)
    }
}