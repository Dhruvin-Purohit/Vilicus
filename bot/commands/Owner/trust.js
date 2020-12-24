const { Command } = require('discord-akairo')
const emojis = require('../../utils/emojis.json')

module.exports = class extends Command {
    constructor() {
        super('trust', {
            ownerOnly: true,
            aliases: ['trust', 'settrusted'],
            clientPermissions: ['ADD_REACTIONS', 'SEND_MESSAGES'],
            description: {
                content: 'Sets a given user as trusted',
                usage: '< User >'
            },
            args: [
                {
                    id:'who',
                    type: 'user',
                    prompt: "Which User?"
                }
            ]
        })
    }

    async exec(message, { who }) {

        if(who.trusted) return message.channel.send(`${who.tag} is already a trusted user.`)
        who.trusted = true
        await who.save
        message.react(emojis.discord.CheckMark)

    }
}
