const { Command, Argument } = require('discord-akairo')
const dmd = require('discord-md-tags')
const { GuildEmoji } = require('discord.js')
const { VoiceChannel } = require('discord.js')
const { CategoryChannel } = require('discord.js')
const { StoreChannel } = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { GuildChannel } = require('discord.js')
const { GuildMember } = require('discord.js')
const { Guild } = require('discord.js')
const emojis = require('../../utils/emojis.json')

module.exports = class extends Command {
    constructor() {
        super('info', {
            aliases: ['info', 'information'],
            typing: true,
            channel: 'guild',
            description: {
                content: 'Advanced info command.',
                usage: '< Guild | Member | Role | Channel | Emoji >'
            },
            args: [
                {
                    id: 'what',
                    type: Argument.union('guild', 'member', 'role', 'channel', 'emoji'),
                    default: (message) => message.guild
                }
            ]
        })
    }

    async exec(message, { what }) {
        if(what instanceof Guild) {
            if(!what.available) return message.util.send('Provided guild is not available')
            let features = {
                ANIMATED_ICON: "Animated Icon",
                BANNER: "Banner",
                COMMERCE: "Commerce",
                COMMUNITY: "Community",
                DISCOVERABLE: "Discoverable",
                FEATURABLE: "Featurable",
                INVITE_SPLASH: "Invite Splash",
                MEMBER_VERIFICATION_GATE_ENABLED: "Membership Screening Enabled",
                NEWS: "News",
                PARTNERED: "Partnered",
                PREVIEW_ENABLED: "Preview Enabled",
                RELAY_ENABLED: "Relay Enabled",
                VANITY_URL: "Vanity URL",
                VERIFIED: "Verified",
                VIP_REGIONS: "VIP Regions",
                WELCOME_SCREEN_ENABLED: "Welcome Screen Enabled"
            }
            let explicit = {
                DISABLED: "Don't scan any media content",
                MEMBERS_WITHOUT_ROLES: "Scan media content from members without a role",
                ALL_MEMBERS: "Scan media content from all members"
            }
            let verif = {
                NONE: "Unrestricted",
                LOW: "Must have a verified email on their Discord account",
                MEDIUM: "Must also be registered on Discord for longer than 5 minutes",
                HIGH: "Must also be a member of this server for longer than 5 minutes",
                VERY_HIGH: "Must have a verified phone on their discord account"
            }
            const embed = new MessageEmbed()
            .setTitle(`${what.name}`)
            .setDescription(`${what.description || '\u200b'}`)
            .addField('Guild Information', `Owner:${what.owner}${what.members.cache.size ? `\nMembers: ${dmd.code `${what.members.cache.size}`}` : ``}${what.channels.cache.size ? `\nChannels: ${dmd.code `${what.channels.cache.filter((c) => c.type != 'category').size}`}` : ``}${what.roles.cache.size ? `\nRoles: ${dmd.code `${what.roles.cache.size}`}` : ``}${what.emojis.cache.size ? `\nEmojis: ${dmd.code `${what.emojis.cache.size}`}` : ``}${what.premiumSubscriptionCount > 0 ? `\nBoosts: ${dmd.code `${what.premiumSubscriptionCount}`}` : ``}${what.premiumTier > 0 ? `\nBoost Level: ${dmd.code `${what.premiumTier}`}` : ``}`, true)
            if (what.features.length > 0) embed.addField(`Features`, `${what.features.map(f => features[f]).join(`\n`)}`, true)
            if (what.db.gdb.bsclub || what.db.gdb.crclan || what.db.gdb.cocclan) {
            embed
            .addField(`In-game info`, `${what.db.gdb.bsclub ? `Brawl Stars Club: ${dmd.code `#${what.db.gdb.bsclub}`}` : ``}${what.db.gdb.cocclan ? `\nClash of Clans Clan: ${dmd.code `#${what.db.gdb.cocclan}`}` : ``}${what.db.gdb.crclan ? `\nClash Royale Clan: ${dmd.code `#${what.db.gdb.crclan}`}` : ``}`, true)
            }
            embed
            .addField('Additional Info', `Region: ${dmd.code `${what.region}`}\nExplicit Content Filter: ${dmd.code `${explicit[what.explicitContentFilter]}`}\nVerification Level: ${dmd.code `${verif[what.verificationLevel]}`}`, true)
            .setThumbnail(what.iconURL(
                {
                    dynamic: true
            }
            ))
            .setImage(what.bannerURL())
            .setColor(this.client.basecolor)
            return message.util.send(embed)
        } else if (what instanceof GuildMember) {
            let user = what.user
            let member = what
            let flags_map = {//ToDo use dmd instead of own formatting
                DISCORD_EMPLOYEE: `${emojis.old.Discord_employee} \`Discord Employee\``,
                DISCORD_PARTNER: `${emojis.old.Discord_partner} \`Partnered Server Owner\``,
                BUGHUNTER_LEVEL_1: `${emojis.old.Bughunter_level_1} \`Level 1 Bug Hunter\``,
                BUGHUNTER_LEVEL_2: `${emojis.old.Bughunter_level_2} \`Level 2 Bug Hunter\``,
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
            let premiumsince = member.premiumSince
            let flags = (await user.fetchFlags()).toArray()
            let highest_role

            if (member.roles.highest.id === message.guild.id) highest_role = null
            else highest_role = member.roles.highest

            const embed = new MessageEmbed()
            .addField(`${user.tag}`, `${emojis.discord.ID}ID: ${dmd.code `${user.id}`}\n${emojis.discord.Attachment}Avatar: [Click Here](${user.displayAvatarURL({dynamic: true, size: 4096})} "Avatar Link")\n${emojis.discord.Calendar}Joined At: ${dmd.code `${joined.getDate()}-${joined.getMonth()}-${joined.getFullYear()}`}\n${emojis.discord.Calendar}Created At: ${dmd.code `${created.getDate()}-${created.getMonth()}-${created.getFullYear()}`}\n${emojis.discord.Boost}Booster: ${member.premiumSince ? `\`Yes\`\n${emojis.old.Empty}└${emojis.discord.Boost}Since: ${dmd.code `${premiumsince.getDate()}-${premiumsince.getMonth()}-${premiumsince.getFullYear()}`}` : "`No`"}${highest_role ? `\n${emojis.discord.Role}Highest Role: ${highest_role}\n${emojis.old.Empty}└${emojis.discord.ID}ID: ${dmd.code `${highest_role.id}`}\n${emojis.old.Empty}└${emojis.old.Color}Color: ${dmd.code `${highest_role.hexColor}`}\n${emojis.old.Empty}└${emojis.old.Position}Position: ${dmd.code `${highest_role.position}`}` : ""}${member.roles.color ? `\n${emojis.old.Color}Color Role: ${member.roles.color}\n${emojis.old.Empty}└${emojis.discord.Text_Channel}Color Hex: ${dmd.code `${member.displayHexColor}`}` : ``}`)
            if(flags) embed.addField(`Badges:`, flags.map(f => flags_map[f]).join(`\n`))
            embed.setColor(member.displayHexColor)
            .setThumbnail(user.displayAvatarURL({dynamic: true, size: 4096}))

            return message.util.send(embed)

        } else if (what instanceof Role) {
            const embed = new MessageEmbed()

        } else if (what instanceof GuildChannel) {

            if (what instanceof TextChannel) {

            } else if (what instanceof VoiceChannel) {

            } else if (what instanceof NewsChannel) {
                
            } else if (what instanceof StoreChannel) {
                
            } else if (what instanceof CategoryChannel) {

            }

        } else if (what instanceof GuildEmoji) {
            const embed = new MessageEmbed()
            //remove emoji author from this it needs stupid manage-emojis perms
        } else return undefined

    }
}