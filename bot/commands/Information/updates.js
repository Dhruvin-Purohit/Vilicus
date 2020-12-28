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
        if(!chanel instanceof TextChannel) return message.channel.send('Woah dude you gotta give a valid Text Channel')
        try {
            await this.client.channels.cache.get("get id and put here").addFollower(chn, 'Wants to be aware of important stuff, Let\'s Go')
            return message.channel.send('Done!')
        } catch (err) {
            this.client.emit("error", err, message, this)
        }
    }
}