const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const { MessageEmbed } = require('discord.js')

module.exports = class TopInvites extends Command {
    constructor() {
        super('topinvites', {
            aliases: ['topinvites', 'mostinvites'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'View the top 10 invites in the server!'
            },
            channel: 'guild'
        })
    }

    async exec(message) {
        const invites = await message.guild.fetchInvites()
        if(!invites || invites.length < 1) return message.util.send(`There are no invites..`)
        const good = invites.filter(i => i.uses > 0).sort((a, b) => b.uses - a.uses).first(10)
        if(!good || good.length < 1) return message.util.send(`None of the invites have been used..`)
        const embed = new MessageEmbed()
        .setTitle(`${dmd.bold `# {rank}`} {inviter} - ${dmd.code `{invite-code}`} - ${dmd.code `{invite-uses}`}`)
        .setDescription(good.map(i => `${dmd.bold `#${good.indexOf(i) + 1}`} ${i.inviter} - ${dmd.code `${i.code}`} - ${dmd.code `${i.uses.toLocaleString()}`}`))

        return message.util.send(embed)
    }
}