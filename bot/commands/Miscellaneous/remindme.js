const { Command } = require('discord-akairo')
const fn = require('../../utils/functions')
const ms = require('ms');

module.exports = class extends Command {
    constructor() {
        super('remindme', {
            aliases: ['remindme', 'rm'],
            clientPermissions: ['SEND_MESSAGES'],
            cooldown: 10e4,
            description: {
                content: 'Reminds you after the given time!',
                usage: '< time > < message >'
            },
            args: [
                {
                    id: 'tem',
                    type: 'string',
                    prompt: {
                        start: 'When to remind?'
                    }
                },
                {
                    id: 'what',
                    match: 'rest',
                    prompt: {
                        start: `What to remind?`
                    }
                },
                {
                    id: 'maybenotindms',
                    match: 'flag',
                    flag: '*nodm'
                }
            ]
        })
    }
    
    async exec(message, { tem, what, maybenotindms }) {
        let time = ms(tem)
        if(!time) return message.util.send(`Given Time is invalid!`)
        message.util.send(`Alright, I will remind you in ${ms(time)} about ${what}`)
        await fn.wait(time)
        if(maybenotindms) {
            try {
                message.channel.send(`${message.author}, you wanted me to remind you about ${what}`)//not util
            } catch {}
        } else {
            try {
                message.author.send(`You wanted me to remind you about ${what}`)
            } catch {
                try {
                    message.channel.send(`${message.author}, you wanted me to remind you about ${what}`)//not util
                } catch {}
            }
        }
    }
}