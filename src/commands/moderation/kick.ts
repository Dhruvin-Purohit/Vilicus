import 'discord-akairo'
import { Command } from 'discord-akairo'
import { GuildMember } from 'discord.js'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class Kick extends Command{
    public constructor() {
        super("kick", {
            aliases: ["kick"],
            editable: false,
            typing: true,
            channel: "guild",
            category: "moderation",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS"],
            userPermissions: ["KICK_MEMBERS"],
            description: {
                content: "Kick a member from the server",
                usage: "< member > [ reason ]"
            },
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: "What member would you like to kick?"
                    }
                },
                {
                    id: "reason",
                    match: "rest",
                    default: "No reason Provided!"
                }
            ]
        })
    }

    public async exec(message: Message, { member, reason }: { member: GuildMember, reason: string }) {
        /**
         * Constant Declarations
         */
        if (reason.length > 480) reason = `${reason.substring(0, 480)}...`

        /**
         * Embed Declarations
         */
        const dont_drink_and_discord = new MessageEmbed()
        .setDescription(`😅 ${member} You can't **Kick** yourself`)
        .setColor(message.member?.displayHexColor || message.guild!.me?.displayHexColor || "#000000")

        const this_is_what_happens_when_u_r_on_drugs = new MessageEmbed()
        .setDescription(`😅 ${message.member} You can't **Kick** someone with an equal or higher role`)
        .setColor(message.member?.displayHexColor || message.guild!.me?.displayHexColor || "#000000")

        const why_bully_me = new MessageEmbed()
        .setDescription(`😞 You can't Kick me with that command`)

        const that_person_is_a_bigger_retard = new MessageEmbed()
        .setDescription(`😠 ${message.member} You can't **Kick** the server owner`)
        .setColor(message.member?.displayHexColor || message.guild!.me?.displayHexColor || "#000000")

        const retired_retard = new MessageEmbed()
        .setDescription(`☺️ ${message.member} That member is not Kickable`)
        .setColor(message.member?.displayHexColor || message.guild!.me?.displayHexColor || "#000000")

        const prove_that_u_not_on_drugs = new MessageEmbed()
        .setDescription(`${message.member}, Are you sure you want to **Kick** ${member.displayName}?(\`y\`/\`n\`)`)
        .addField(`Reason:`, reason)
        .setFooter(`⚠️Warning⚠️\nThey will not be able to rejoin the server again unless they get an invite`)

        const why_would_you_even_do_that = new MessageEmbed()
        .addField(`Done!`, `${message.member},\n${member} has now been Kicked!`)
        .setColor(message.member?.displayHexColor || message.guild!.me?.displayHexColor || "#000000")
        .addField(`Reason:`, reason)

        const u_r_possibly_high = new MessageEmbed()
        .setDescription(`😒 I was pretty sure you were going to cancel`)

        /**
         * Checks
         */
        if (member && member === message.member) return message.channel.send(dont_drink_and_discord)
        if (member.roles.highest.position >= message.member!.roles.highest.position) return message.channel.send(this_is_what_happens_when_u_r_on_drugs)
        if (member === message.guild!.owner) return message.channel.send(that_person_is_a_bigger_retard)
        if (member && member === message.guild!.me) return message.channel.send(why_bully_me)
        if (!member.kickable) return message.channel.send(retired_retard)

        /**
         * Confitmation
         */
        const confirmation = new Promise(async resolve => { 
            await message.channel.send(prove_that_u_not_on_drugs)
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
        await member.kick(`${message.member!.id}: ${reason}`)
        return message.channel.send(why_would_you_even_do_that)

        } else {
        
        /**
         * Result
         */
        return message.channel.send(u_r_possibly_high)

        }

    }
}