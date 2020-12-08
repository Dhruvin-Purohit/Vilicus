import 'discord-akairo'
import { Command } from 'discord-akairo'
import { GuildMember } from 'discord.js'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'
import * as perms from '../../assets/permssions.json'

export default class Ping extends Command{
    public constructor() {
        super("userinfo", {
            aliases: ["userinfo", "memberinfo", "whotheheck", "whotheheckis"],
            editable: false,
            typing: true,
            category: "info",
            channel: "guild",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Get info on a member",
                usage: "[ member ]"
            },
            args: [
                {
                    id: "whotheheck",
                    type: "member",
                    default: (message: Message) => message.member
                }
            ]
        })
    }

    public async exec(message: Message, { whotheheck }: { whotheheck: GuildMember }): Promise<Message> {
        //ToDO make it accept bot member and user
        //so that it even works in dms + can fetch more info using an if statement to check it's instance
        //Will also provide more versatility
        /**
         * Constant Declarations
         */
        let user = whotheheck.user
        let member = whotheheck
        let highestrole
        let now = new Date()
        let flags = (await user.fetchFlags()).toArray()
        let flag_notation = {
            DISCORD_EMPLOYEE: "Discord Employee",
            DISCORD_PARTNER: "Partnered Server Owner",
            BUGHUNTER_LEVEL_1: "Bug Hunter [Level 1]",
            BUGHUNTER_LEVEL_2: "Bug Hunter [Level 2]",
            HYPESQUAD_EVENTS: "HypeSquad Events",
            HOUSE_BRAVERY: "House of Bravery",
            HOUSE_BRILLIANCE: "House of Brilliance",
            HOUSE_BALANCE: "House of Balance",
            EARLY_SUPPORTER: "Early Supporter",
            TEAM_USER: "Team User",
            SYSTEM: "System",
            VERIFIED_BOT: "Verified Bot",
            VERIFIED_DEVELOPER: "Early Verified Bot Developer"
          }//ToDO : Get emote for EACH of there (None shall be missed.)
        /**
         * This Check needs to go here to filter the everyone role from highest role (it's not a role after all)
         */
        if (member.roles.highest.id === message.guild!.id) highestrole = null
        else highestrole = member.roles.highest

        /**
         * Embed Declarations
         */
        const how_the_heck = new MessageEmbed()
        .addField(`❯ User Info`,
        `User: ${user}
        Username: \`${user.username}\`
        Discriminator: \`#${user.discriminator}\`
        Tag: \`${user.tag}\`
        ID: \`${user.id}\`
        Created At: \`${new Date(user.createdTimestamp).getDate()}-${new Date(user.createdTimestamp).getMonth()}-${new Date(user.createdTimestamp).getFullYear()}\`
        Avatar URL: [Click Here](${user.displayAvatarURL({dynamic: true, size: 1024})} "User's Avatar URL")
        Bot: \`${user.bot ? "Yes" : "No"}\`
        System: \`${user.system ? "Yes" : "No"}\`
        `)
        //This had to come here for the cool look it gives
        if (flags.length > 0) {
            how_the_heck.addField(`❯ Badges:`, flags.map(f => `\`${flag_notation[f]}\``).join(`\n`))
        }
        how_the_heck.addField(`❯ Member Info`,
        `Nickname: \`${member.nickname || member.user.username}\`
        Booster: ${member.premiumSince ? `\`Yes\`\nBoosting Since: \`${member.premiumSince}\`` : "`No`"}
        Joined At: \`${member.joinedTimestamp ? `${new Date(member.joinedTimestamp).getDate()}-${new Date(member.joinedTimestamp).getMonth()}-${new Date(member.joinedTimestamp).getFullYear()}` : `${now.getDate}-${now.getMonth}-${now.getFullYear}`}\`${highestrole ? `\nHighest Role: ${highestrole}` : ""}${member.roles.color ? `\nColor Role: ${member.roles.color}` : ""}${member.displayHexColor ? `\nDisplay Color: \`${member.displayHexColor}\``  : ""}`)
        .setColor(member.displayHexColor || "#000000")
        .setThumbnail(user.displayAvatarURL({dynamic: true, size: 4096}))
        //Noice
        /**
         * Checks
         */
        if (member.permissions) {
            if (member.hasPermission("ADMINISTRATOR")) how_the_heck.addField(`❯ Permissions:`, "`Administrator`", true)
            else how_the_heck.addField(`❯ Permissions:`, `\`${(member.permissions.toArray().map((p: string) => perms[p])).join(`, `)}\``, true)
        }
        if (member.roles.cache.size > 1) {
            how_the_heck.addField(`❯ Roles:`, `${member.roles.cache.map(r => r).filter(r => r.id != message.guild!.id).sort((a, b) => b.position - a.position).join(`\n`)}`, true)
        }

        /**
         * Finished Result
         */
        return message.channel.send(how_the_heck)
    }
}