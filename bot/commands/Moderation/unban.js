const { Command } = require('discord-akairo')

module.exports = class extends Command {
    constructor() {
        super('unban', {
            aliases: ['unban'],
            clientPermissions: ['BAN_MEMBERS', 'SEND_MESSAGES'],
            userPermissions: ['BAN_MEMBERS'],
            description: {
                content: 'Unban a particular user from this server',
                usage: '< Member >'
            },
            channel: 'guild',
            args: [
                {
                    id: 'who',
                    type: 'user',
                    prompt: {
                        start: 'Whom to unban?'
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
        let bans = await message.guild.fetchBans()
        let ohw = bans.get(who.id)
        if(!ohw) return message.util.send(`${message.author}, you fool, ${who.tag} is not banned`)
        ohw = ohw.user
        if(rsn.length > 480) rsn = rsn.slice(0, 480) + '...'

        await message.guild.members.unban(ohw, rsn)

        return message.util.send(`Done`)
    }
}