const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')

module.exports = new class Say extends Command {
    constructor() {
        super('say', {
            clientPermissions: ['SEND_MESSAGES'],
            typing: true,
            description: {
                content: 'Make the bot say whatever you want!',
                usage: '[ channel ] message'
            },
            args: [
                {
                    id: 'chn',
                    type: 'channel',
                    default: (message) => message.channel
                },
                {
                    id: 'what',
                    prompt: {
                        start: 'What do you want me to say?'
                    }
                }
            ]
        })
    }
    exec(message, { chn, what}) {
        if (chn.type != 'text' || !chn.viewable) return message.channel.send(`Invalid or Inaccessable channel provided`)
        if(!chn.permissionsFor(message.guild.me).has(['SEND_MESSAGES'])) return message.channel.send(`I do not have permission to ${dmd.code `Send Messages`} in that channel`)
        if(!this.client.isOwner(message.author) || !chn.permissionsFor(message.member).has(['SEND_MESSAGES'])) return message.channel.send(`You do not have ${dmd.code `Send Messages`} permission in that channel`)
        return chn.send(what, { disableMentions: 'everyone' })
    }
}