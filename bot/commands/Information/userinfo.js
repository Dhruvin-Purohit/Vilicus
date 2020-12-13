const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const { MessageEmbed } = require('discord.js')
const emojis = require('../../utils/emojis.json')

module.exports = class Userinfo extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'memberinfo', 'whois'],
            typing: true,
            channel: 'guild',
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: {
                content: 'Get information about a member',
                usage: '[ member ]'
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: (message) => message.member
                }
            ]
        })
    }
    async exec(message, { member }) {
        let user = member.user
        let flags_map = {
            DISCORD_EMPLOYEE: `${emojis.old.Discord_employee} \`Discord Employee\``,
            DISCORD_PARTNER: `${emojis.old.Discord_partner} \`Partnered Server Owner\``,
            BUGHUNTER_LEVEL_1: `${emojis.old.Bughunter_level_1} \`Bug Hunter [Level 1]\``,
            BUGHUNTER_LEVEL_2: `${emojis.old.Bughunter_level_2} \`Bug Hunter [Level 2]\``,
            HYPESQUAD_EVENTS: `${emojis.old.Hypesquad_Events} \`HypeSquad Events\``,
            HOUSE_BRAVERY: `${emojis.old.Hypesquad_Bravery} \`House of Bravery\``,
            HOUSE_BRILLIANCE: `${emojis.old.Hypesquad_Brilliance} \`House of Brilliance\``,
            HOUSE_BALANCE: `${emojis.old.Hypesquad_Balance} \`House of Balance\``,
            EARLY_SUPPORTER: `${emojis.old.Early_supporter} \`Early Supporter\``,
            TEAM_USER: `${emojis.old.Team_user} \`Team User\``,
            SYSTEM: `${emojis.old.Empty} \`System\``,
            VERIFIED_BOT:`${emojis.old.Empty} \`Verified Bot\``,
            VERIFIED_DEVELOPER: `${emojis.old.Early_verified_developer} \`Early Verified Bot Developer\``
          }
        let now = new Date()
        let joined = member.joinedAt || now
        let created = user.createdAt || now
        let flags = (await user.fetchFlags()).toArray()
        let highest_role

        if (member.roles.highest.id === message.guild.id) highest_role = null
        else highest_role = member.roles.highest

        const embed = new MessageEmbed()
        .addField(`${user.tag}`, `${emojis.discord.ID}ID: ${dmd.code `${user.id}`}\n${emojis.discord.Attachment}Avatar: [Click Here](${user.displayAvatarURL({dynamic: true, size: 4096})} "Avatar Link")\n${emojis.discord.Calendar}Joined At: ${dmd.code `${joined.getDate()}-${joined.getMonth()}-${joined.getFullYear()}`}\n${emojis.discord.Calendar}Joined At: ${dmd.code `${joined.getDate()}-${joined.getMonth()}-${joined.getFullYear()}`}\n${emojis.discord.Calendar}Created At: ${dmd.code `${created.getDate()}-${created.getMonth()}-${created.getFullYear()}`}\n${emojis.discord.Boost}Booster: ${member.premiumSince ? `\`Yes\`\n${emojis.discord.Boost}Boosting Since: \`${member.premiumSince}\`` : "`No`"}${highest_role ? `\n${emojis.discord.Role}Highest Role: ${highest_role}\n${emojis.discord.ID}└ID: ${dmd.code `${highest_role.id}`}\n${emojis.old.Empty}└Color: ${dmd.code `${highest_role.hexColor}`}\n${emojis.old.Empty}└Position: ${dmd.code `${highest_role.position}`}` : ""}\n${emojis.old.Empty}Display Color: ${dmd.code `${member.displayHexColor}`}`)
        if(flags) embed.addField(`Badges:`, flags.map(f => flags_map[f]).join(`\n`))
        embed.setColor(member.displayHexColor)
        .setThumbnail(user.displayAvatarURL({dynamic: true, size: 4096}))

        return message.channel.send(embed)
    }
}