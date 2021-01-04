const { Command } = require('discord-akairo')

module.exports = class extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite'],
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'You can\'t inivte the bot anyways.'
            }
        })
    }
    async exec(message) {
        const invitelink = await this.client.generateInvite(['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'VIEW_CHANNEL'])
        message.channel.send(`[Invite Link](${invitelink} "Bot Invite Link")\nThat invite link does not work due to The bot being Semi-Private, [read this for more info](https://github.com/statch/Vilicus/....needs_more_work... "Why is the bot semi-private?\nwhat to do now?")`)
    }
}