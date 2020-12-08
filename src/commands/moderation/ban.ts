import 'discord-akairo'
import { Command } from 'discord-akairo'
import { GuildMember } from 'discord.js'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class Ban extends Command{
    public constructor() {
        super("ban", {
            aliases: ["ban"],
            editable: false,
            typing: true,
            channel: "guild",
            category: "moderation",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"],
            description: {
                content: "Ban a member from the server",
                usage: "< member > [ reason ]"
            },
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: "What member would you like to ban?"
                    }
                },
                {
                    id: "reason",
                    match: "rest",
                    default: "No reason Provided!"
                },
            ]
        })
    }

    public async exec(message: Message, { member, reason, daysz }: { member: GuildMember, reason: string, daysz: number }) {
        
        /**
         * Constant Declarations
         */
        if (reason.length > 480) reason = `${reason.substring(0, 480)}...`

        /**
         * Embed Declarations
         */
        const u_have_stupid_or_wat = new MessageEmbed()
        .setDescription(`😅 ${member} You can't **Ban** yourself`)
        .setColor(message.member?.displayHexColor || message.guild!.me?.displayHexColor || "#000000")

        const u_will_get_urself_banned_one_day = new MessageEmbed()
        .setDescription(`😅 ${message.member} You can't **Ban** someone with an equal or higher role`)
        .setColor(message.member?.displayHexColor || message.guild!.me?.displayHexColor || "#000000")

        const why_bully_me = new MessageEmbed()
        .setDescription(`😞 You can't Ban me using that command`)

        const thats_not_how_discord_works_u_retard = new MessageEmbed()
        .setDescription(`😠 ${message.member} You can't **Ban** the server owner`)
        .setColor(message.member?.displayHexColor || message.guild!.me?.displayHexColor || "#000000")

        const retired_retard = new MessageEmbed()
        .setDescription(`☺️ ${message.member} That member is not Banable`)
        .setColor(message.member?.displayHexColor || message.guild!.me?.displayHexColor || "#000000")

        const confirm_this_or_u_r_gay = new MessageEmbed()
        .setDescription(`${message.member}, Are you sure you want to **Ban** ${member}?(\`y\`/\`n\`)`)
        .addField(`Reason:`, reason)
        .setFooter(`⚠️Warning⚠️\nThey will not be able to rejoin until they are unbanned`)

        const should_have_read_the_rules = new MessageEmbed()
        .addField(`Done!`, `${message.member},\n${member} has now been Banned!`)
        .addField(`Reason:`, reason)
        .setColor(message.member?.displayHexColor || message.guild!.me?.displayHexColor || "#000000")

        const u_retard_stop_dicking_around = new MessageEmbed()
        .setDescription(`😒 I was pretty sure you were going to cancel`)

        /**
         * Checks
         */
        if (member && member === message.member) return message.channel.send(u_have_stupid_or_wat)
        if (member.roles.highest.position >= message.member!.roles.highest.position) return message.channel.send(u_will_get_urself_banned_one_day)
        if (member === message.guild!.owner) return message.channel.send(thats_not_how_discord_works_u_retard)
        if (member && member === message.guild!.me) return message.channel.send(why_bully_me)
        if (!member.bannable) return message.channel.send(retired_retard)

        /**
         * Confitmation
         */
        const confirmation = new Promise(async resolve => { 
            await message.channel.send(confirm_this_or_u_r_gay)
            await message.channel.awaitMessages(m => m.author.id == message.author.id && ["y", "n", "yes", "no"].includes(m.content.toLowerCase()), {
                max: 1,
            })
            .then(collection => ["y", "yes"].includes(collection.first()?.cleanContent?.toLowerCase() ?? "") ? resolve(true) : resolve(false))
            .catch(() => resolve(false))
        })

        /**
         * Possibly Cool Stuff
         */
        if (await confirmation) {

        /**
         * Result
         */
        await member.ban({reason: `${message.member!.id}: ${reason}`, days: daysz})
        return message.channel.send(should_have_read_the_rules)

        } else {

        /**
         * Result
         */
        return message.channel.send(u_retard_stop_dicking_around)
        }

    }
}