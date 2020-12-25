const { Command } = require('discord-akairo')

module.exports = class extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            clientPermissions: ['BAN_MEMBERS', 'SEND_MESSAGES'],
            userPermissions: ['BAN_MEMBERS'],
            description: {
                content: 'Ban a particular user from this server',
                usage: '< Member >'
            },
            channel: 'guild',
            args: [
                {
                    id: 'who',
                    type: 'member',
                    prompt: {
                        start: 'Whom to ban?'
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
        if(who === message.member) return message.channel.send(`${message.author}, you cannot ban yourself`)
        if(who.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`${message.author}, you fool, you cannot ban someone with a higher or equal role`)
        if(!who.kickable) return message.channel.send(`I cannot ban that member.`)
        if(rsn.length > 480) rsn = rsn.slice(0, 480) + '...'

        await who.ban({reason: rsn})

        return message.channel.send(`Done`)
    }
}