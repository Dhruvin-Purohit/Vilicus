const { Command, Argument } = require('discord-akairo')
const dmd = require('discord-md-tags')
const { Role } = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { GuildMember } = require('discord.js')
const permissions = require('../../assets/permissions.json')

module.exports = class Permissions extends Command {
    constructor() {
        super('permissions', {
            aliases: ['permissions', 'perms'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            channel: 'guild',
            args: [
                {
                    id: 'rm',
                    type: Argument.union('role', 'member'),
                    default: (message) => message.member
                }
            ]
        })
    }
    exec(message, { rm }) {
        if(rm instanceof GuildMember) {
            let perms = rm.permissions.toArray().map(p => `* ${permissions[p]}`).sort()
            perms = perms.join("\n")

            const embed = new MessageEmbed()
            .setTitle(`${rm === message.author ? `Your` : `${rm.nickname}'s`} permissions`)
            .setDescription(dmd.codeblock('md') `${perms || 'None!'}`)
            .setThumbnail(rm.user.displayAvatarURL({dynamic: true}))
            .setColor(rm.displayHexColor)

            return message.util.send(embed)
        } else if (rm instanceof Role) {
            let perms = rm.permissions.toArray().map(p => `* ${permissions[p]}`).sort()
            perms = perms.join(`\n`)

            const embed = new MessageEmbed()
            .setTitle(`${rm.name} role's permissions`)
            .setDescription(dmd.codeblock('md') `${perms || 'None!'}`)
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setColor(rm.hexColor)
            
            message.util.send(embed)
        }
    }
}