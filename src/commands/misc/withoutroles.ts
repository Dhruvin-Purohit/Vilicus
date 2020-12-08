import 'discord-akairo'
import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class WithRole extends Command{
    public constructor() {
        super("withoutroles", {
            aliases: ["withoutroles"],
            editable: false,
            typing: true,
            channel: "guild",
            category: "misc",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "List all members who have no roles"
            }
        })
    }

    public async exec(message: Message) {

        /**
         * Fetch Everyone
         */
        await message.guild?.members.fetch()

        /**
         * Constant Declarations and Checks
         */
        let board_of_retards = await message.guild?.members.fetch()
        board_of_retards = board_of_retards?.filter(m => m.roles.cache.size === 1)

        /**
         * More Checks And Embeds
         */

        if (board_of_retards && board_of_retards.size > 0 ) {

        /**
         * Embed
         */
        const all_of_u_r_retards = new MessageEmbed()
        .addField(`List:`, `${board_of_retards?.map(m => `**${m.user.tag} - **${m.user.id}`).join(`\n`)}\n\nThe above user(s) do not have any roles`)
        .setFooter(`requested by ${message.author.tag}`)

        /**
         * Result
         */
        return message.channel.send(all_of_u_r_retards)
        } else {

        /**
         * Embed
         */
        const u_just_a_lonely_bitch = new MessageEmbed()
        .setDescription(`😮 Looks like everyone has roles`)

        /**
         * Result
         */
        return message.channel.send(u_just_a_lonely_bitch)

        }
        }
    }
