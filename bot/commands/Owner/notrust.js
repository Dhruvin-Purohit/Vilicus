const { Command } = require('discord-akairo')
const emojis = require('../../utils/emojis.json')

module.exports = class extends Command {
    constructor() {
        super('notrust', {
            ownerOnly: true,
            aliases: ['notrust', 'nottrusted'],
            clientPermissions: ['ADD_REACTIONS', 'SEND_MESSAGES'],
            description: {
                content: 'Sets a given user as not trusted',
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

        if(!who.db.udb.trusted) return message.channel.send(`${who.tag} is already a non trusted user.`)
        who.db.udb.trusted = false
        await who.db.udb.save
        message.react(emojis.discord.CheckMark)

    }
}
