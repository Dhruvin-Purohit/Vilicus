const { Command } = require('discord-akairo');
const emojis = require('../../utils/emojis.json')
const dmd = require('discord-md-tags')
const util = require('util')

module.exports = class Eval extends Command {
    constructor() {
        super('asynceval', {
            aliases: ['asynceval'],
            typing: true,
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Basically eval command but with an async function so i can use await',
                usage: '< code >'
            },
            ownerOnly: true,
            args: [
                {
                    id: 'code',
                    match: 'content',
                    prompt: {
                        start: "What to evaluate?",
                        time: 4.5e4
                    }
                }
            ]
        })
    }
    async exec(message, { code }) {
        
        try {
            let t1 = new Date()
            let evalled = await eval("(async () => {" + code + "})()")
            let t2 = new Date()
            let tt = t2 - t1
            if (typeof evalled !== 'string') evalled = util.inspect(evalled, { depth: 0 });
            return message.util.send(`*Evaluated in ${tt}ms*\n${dmd.codeblock('js') `${evalled}` }`)
        } catch(err) {
            return message.util.send(`${emojis.basic.error}**Error:**\n${dmd.codeblock('js') `${err}`}`)
        }
       
    }
}