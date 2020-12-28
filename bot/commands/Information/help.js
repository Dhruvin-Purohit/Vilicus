const { Command } = require('discord-akairo');
const emojis = require('../../utils/emojis.json')
const dmd = require('discord-md-tags')
const { MessageEmbed } = require('discord.js');
const permissions = require('../../assets/permissions.json')
const fn = require('../../utils/functions')

module.exports = class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            typing: true,
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
            description: {
                content: 'Get help on the bot...',
                usage: '[ Command ]'
            },
            args: [
                {
                    id: 'command'
                }
            ]
        })
    }
    async exec(message, { command }) {
    let prefix = this.handler.prefix(message)

    if(!command) {

        const embed = new MessageEmbed()
        .setTitle(`Help menu`)
        .setColor(this.client.basecolor)
        .setFooter(`${prefix}help [ Command ]`)

        let cat_map = {
            Information: emojis.discord.Information,
            Management: emojis.discord.Role,
            Miscellaneous: emojis.discord.Mention,
            Owner: emojis.discord.ServerOwner,
            'Text Manipulation': emojis.discord.Edit
        }
        let def = emojis.discord.Help

		for (const category of this.handler.categories.values()) {
            let something;

			if (this.client.isOwner(message.author)) something = `${cat_map[category.id] || def} ${this.handler.categories.get(category.id)}`;
            else {
                if(category.id.toLowerCase() === 'owner') something
                else something = `${cat_map[category.id] || def} ${this.handler.categories.filter((c) => c.id.toLowerCase() != 'owner' ).get(category.id)}`;
        }

            if (something) embed.addField(something, `${category.map(cmd => dmd.code `${cmd.aliases[0]}`).join(' ')}`);
        }
        return message.util.send(embed)
    } else {
        if(command.ownerOnly && !this.client.isOwner(message.author)) return message.util.send(`${message.author}, Command ${dmd.code `${command}`} doesn't exist you fool`)
        let cmd = this.handler.findCommand(command)
        if(!cmd) return message.util.send(you_fool)
        else {
            let title;
            if(cmd.description.usage){
                title = dmd.code `${cmd.aliases[0]} ${cmd.description.usage}`
            } else {
                title = dmd.code `${cmd.aliases[0]}`
            }

            const embed = new MessageEmbed()
			.setColor(this.client.basecolor)
            .setTitle(title)
            .addField(`${emojis.discord.Category_Create} Category`, cmd.category.id || '\u200b')
			.addField(`${emojis.discord.Rich_Presence} Description`, dmd.codeblock() `${cmd.description.content || '\u200b'}`)
            .setFooter('The values within < > are neccessary whereas the ones within [ ] are optional')
            .setThumbnail(message.client.user?.displayAvatarURL({
                dynamic: true,
                format: 'png',
            }))

		if (cmd.aliases.length > 1) embed.addField(` Aliases`, dmd.code `${cmd.aliases.join('` `')}`, true);
		if (cmd.description.examples?.length)
			embed.addField(
				`${emojis.discord.Information} Examples`,
				`${cmd.aliases[0]} ${cmd.description.examples.join(`\`\n\`${cmd.aliases[0]} `)}`,
				true,
            );
        if (cmd.cooldown && cmd.cooldown > 0)
            embed.addField(
                `${emojis.discord.Slowmode} Cooldown`,
                dmd.code `${fn.cleanTime(cmd.cooldown)}`
            )
            if (cmd.userPermissions) {
                embed.addField(`${emojis.discord.Preferences} User Permissions required`, `${((cmd.userPermissions).map((p) => dmd.code `${permissions[p]}`)).join(", ").toString() || 'None'}`, true)
                }
            if (cmd.clientPermissions) {
                embed.addField(`${emojis.discord.Application} Bot Permissions required`, `${((cmd.clientPermissions).map((p) => dmd.code `${permissions[p]}`).join(", ").toString()) || 'None'}`, true)
                }
            if (cmd.prefix != prefix) {
                embed.addField(`${emojis.discord.Reply}Override Prefix`, dmd.code `${cmd.prefix}`)
            }
        return message.util.send(embed);
        }
    }
    }
}
