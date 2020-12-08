import 'discord-akairo'
import { Command } from 'discord-akairo'
import { Role } from 'discord.js'
import { MessageEmbed } from 'discord.js'
import { Message, GuildEmoji } from 'discord.js'

export default class Emoji extends Command{
    public constructor() {
        super("emoteinfo", {
            aliases: ["emoteinfo", "emojiinfo"],
            editable: false,
            typing: true,
            category: "info",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Get emote info",
                usage: "< emoji >"
            },
            args: [
                {
                    id: "emoji",
                    type: "emoji",
                    prompt: {
                        start: "What emote would you like to get info of"
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { emoji }: { emoji: GuildEmoji}): Promise<Message> {

        /**
         * Embed declarations
         */
        const you_have_nothing_else_to_do_other_than_get_info_on_emotes = new MessageEmbed()
        .addField(`❯ ID`, `\`${emoji.id}\``, true)
        .addField(`❯ Name`, `\`${emoji.name}\``, true)
        .addField(`❯ URL`, `[Click Here](${emoji.url} "Emote URL")`, true)
        .addField(`❯ Abstract form`, `\`<${emoji.animated ? "a" : "" }:${emoji.name}:${emoji.id}>\``)
        .setThumbnail(emoji.url || ``)
        .setColor(message.guild?.me?.displayHexColor || "yellow")
        .addField(`❯ Roles`, `${emoji.roles.cache.array().map((r: Role) => `${r}`).join(`\n`) || `@everyone`}`, true)
        .addField(`❯ Created by`, `${(await emoji.fetchAuthor()).tag || `Unknown`}`, true)
        .addField(`❯ Created at`, `${new Date(emoji.createdTimestamp).getDate()}-${new Date(emoji.createdTimestamp).getMonth()}-${new Date(emoji.createdTimestamp).getFullYear()}`, true)
        .addField(`❯ Animated`, `${emoji.animated ? "Yes" : "No"}`, true)
        .addField(`\u200b`, `\u200b`, true)
        if (emoji.guild != message.guild) {
            you_have_nothing_else_to_do_other_than_get_info_on_emotes.addField(`❯ Emoji's Server's ID`, `\`${emoji.guild.id}`)
        }

        /**
         * Result
         */
        return message.channel.send(you_have_nothing_else_to_do_other_than_get_info_on_emotes)
    }
}