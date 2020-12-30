const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const { TextChannel } = require('discord.js')

module.exports = class extends Command {
    constructor() {
        super('updates', {
            aliases: ['updates', 'followupdates', 'announcements', 'news'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_WEBHOOKS'],
            userPermissions: ['MANAGE_WEBHOOKS'],
            description: {
                content: 'Follow our official announcement channel to be up-to-date with our announcements, any major updates will be annonced (you would not want to miss ot on these)',
                usage: '< Channel >'
            },
            args: [
                {
                    id: 'chn',
                    type: 'channel',
                    default: (message) => message.channel
                }
            ]
        })
    }
    async exec(message, { chn }) {
        if(!chn instanceof TextChannel) return message.util.send('Woah dude you gotta give a valid Text Channel')
        if(!chn.permissionsFor(message.member).has('MANAGE_WEBHOOKS')) return message.util.send('Don\' try to break my perms system, you don\'t have Manage Webhooks permission for that channel')
        try {
            await this.client.channels.cache.get("790898665636102186").addFollower(chn, 'Wants to be aware of important stuff, Let\'s Go')
            return message.util.send('Done!')
        } catch (err) {
            this.client.emit("error", err, message, this)
        }
    }
}