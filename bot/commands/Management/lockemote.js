const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')

module.exports = class LockEmote extends Command {
    constructor() {
        super("lockemote", {
            aliases: ["lockemote", "lockemoji"],
            editable: false,
            typing: true,
            channel: "guild",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            userPermissions: ["MANAGE_EMOJIS", "MANAGE_ROLES"],
            description: {
                content: "Lock an emote to a certain role",
                usage: "< emoji > < role >"
            },
            args: [
                {
                    id: "emoji",
                    type: "emoji",
                    prompt: {
                        start: "What emote would you like to lock?"
                    }
                },
                {
                    id: "role",
                    type: "role",
                    prompt: {
                        start: "What role would you like to lock that emoji with?"
                    }
                }
            ]
        })
    }

    async exec(message, { emoji , role }) {
        if (!(emoji.guild.id === message.guild?.id)) return message.reply("I can't do anything with emotes from other servers")

        const confirembed = new MessageEmbed()
        .setTitle("Are you sure you want to lock this emote to that role?(`y`/`n`)")
        .addField("Emoji:", emoji, true)
        .addField("Role:", role, true)
        .setFooter(`⚠️Warning⚠️\nThat emote will be locked to that specific role\n(not even the server owner can access it without that role)`)
        .setColor(message.guild.me?.displayHexColor)
        
        const doneembed = new MessageEmbed()
        .addField(`🔒Emote Locked🔒`, `${emoji} is now locked to ${role}`)
        .setFooter(`Note: You might have to reload discord for changes to take place`)
        .setColor(message.guild.me?.displayHexColor)
        
        const cancelledembed = new MessageEmbed()
        .setDescription("😒 I was pretty sure you were going to cancel")
        .setColor(message.guild.me?.displayHexColor)

        const confirmation = new Promise(async resolve => { 
            await message.util.send(confirembed)
            await message.util.awaitMessages(m => m.author.id == message.author.id && ["y", "n", "yes", "no"].includes(m.content.toLowerCase()), {
                max: 1,
            })
            .then(collection => ["y", "yes"].includes(collection.first()?.cleanContent?.toLowerCase() ?? "") ? resolve(true) : resolve(false))
            .catch(() => resolve(false))
        })

        if (await confirmation) {
            await emoji.roles.set([role])
            return message.util.send(doneembed)
        } else {
            return message.util.send(cancelledembed)
        }
    }
}