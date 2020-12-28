const { Command } = require('discord-akairo')

module.exports = class extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            clientPermissions: ['KICK_MEMBERS', 'SEND_MESSAGES'],
            userPermissions: ['KICK_MEMBERS'],
            description: {
                content: 'Kick a particular user from this server',
                usage: '< Member >'
            },
            channel: 'guild',
            args: [
                {
                    id: 'who',
                    type: 'member',
                    prompt: {
                        start: 'Whom to kick?'
                    }
                },
                {
                    id: 'rsn',
                    type: 'string',
                    match: 'rest',
                    default: 'No reason provided!'
                }
            ]
        })
    }

    async exec(message, { who, rsn }) {
        if(who === message.member) return message.util.send(`${message.author}, you cannot kick yourself`)
        if(who.roles.highest.position >= message.member.roles.highest.position) return message.util.send(`${message.author}, you fool, you cannot kick someone with a higher or equal role`)
        if(!who.kickable) return message.util.send(`I cannot kick that member.`)
        if(rsn.length > 480) rsn = rsn.slice(0, 480) + '...'

        await who.kick(rsn)

        return message.util.send(`Done`)
    }
}