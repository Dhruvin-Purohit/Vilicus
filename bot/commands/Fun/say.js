const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')

module.exports = class Say extends Command {
    constructor() {
        super('say', {
            aliases: ['say'],
            typing: true,
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Make the bot say whatever you want!',
                usage: 'message'
            },
            args: [
                {
                    id: 'what',
                    match: 'content',
                    prompt: {
                        start: 'What do you want me to say?'
                    }
                }
            ]
        })
    }
    exec(message, { what}) {
        return message.channel.send(what, { disableMentions: 'everyone' })
    }
}