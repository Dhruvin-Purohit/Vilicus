"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("discord-akairo");
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
const functions_1 = tslib_1.__importDefault(require("../../utils/functions"));
const permissions = tslib_1.__importStar(require("../../assets/permssions.json"));
class Help extends discord_akairo_1.Command {
    constructor() {
        super("help", {
            aliases: ["help"],
            editable: false,
            typing: true,
            category: "misc",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            description: {
                content: "Get Help on the bot",
                usage: "[ command ]",
                examples: [
                    "ping"
                ]
            },
            args: [
                {
                    id: "cmd",
                    type: "commandAlias",
                    match: "content",
                    default: null,
                }
            ]
        });
    }
    exec(message, { cmd }) {
        /**
         * Most of the code after this is from
         * https://github.com/Naval-Base/yuudachi/blob/master/src/bot/commands/util/help.ts
         * Thanks to them for this wonderful piece of code
         * (c) iCrawl
         */
        /**
         * all the owner proofing has been done by me
         */
        /**
         * I don't want to rewrite this atm bcz i am lazy
         */
        const prefix = (this.client.cmdHandler.prefix);
        if (!cmd) {
            if (!this.client.isOwner(message.author)) {
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`Help Menu`)
                    .setColor("#000000")
                    .setFooter(`${prefix}help [ command ] for further info on that command`)
                    .setThumbnail(message.client.user.displayAvatarURL({
                    dynamic: true,
                    format: 'png',
                }));
                for (const category of this.handler.categories.filter((category) => category.id != 'owner').values()) {
                    embed.addField(`❯ ${functions_1.default.Capitalize(category.id)}`, `${category
                        .filter((cmd) => cmd.aliases.length > 0)
                        .map((cmd) => `\`${cmd.aliases[0]}\``)
                        .join(' ')}`);
                }
                return message.channel.send(embed);
            }
            else {
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`Help Menu`)
                    .setColor("#000000")
                    .setFooter(`${prefix}help [ command ] for further info on that command`)
                    .setThumbnail(message.client.user.displayAvatarURL({
                    dynamic: true,
                    format: 'png',
                }));
                for (const category of this.handler.categories.values()) {
                    embed.addField(`❯ ${functions_1.default.Capitalize(category.id)}`, `${category
                        .filter((cmd) => cmd.aliases.length > 0)
                        .map((cmd) => `\`${cmd.aliases[0]}\``)
                        .join(' ')}`);
                }
                return message.channel.send(embed);
            }
        }
        if (!this.client.isOwner(message.author)) {
            if (!cmd.ownerOnly) {
                let title;
                if (cmd.description.usage) {
                    title = `\`${cmd.aliases[0]} ${cmd.description.usage}\``;
                }
                else {
                    title = `\`${cmd.aliases[0]}\``;
                }
                const embed = new discord_js_1.MessageEmbed()
                    .setColor("#000000")
                    .setTitle(title)
                    .addField('❯ Category', functions_1.default.Capitalize(cmd.category.id) || '\u200b')
                    .addField('❯ Description', cmd.description.content || '\u200b')
                    .setFooter(`The values within < > are neccessary\nThe values within [ ] are optional`)
                    .setThumbnail(message.client.user.displayAvatarURL({
                    dynamic: true,
                    format: 'png',
                }));
                if (cmd.aliases.length > 1)
                    embed.addField('❯ Aliases', `\`${cmd.aliases.join('` `')}\``, true);
                if (cmd.description.examples?.length)
                    embed.addField('❯ Examples', `\`${cmd.aliases[0]} ${cmd.description.examples.join(`\`\n\`${cmd.aliases[0]} `)}\``, true);
                if (cmd.cooldown && cmd.cooldown > 0)
                    embed.addField('❯ Cooldown', `\`${functions_1.default.cleanTime(cmd.cooldown)}\``);
                if (cmd.userPermissions) {
                    embed.addField('❯ User Permissions required', `\`${(cmd.userPermissions.map((p) => permissions[p])).map((p) => ` ${p}`).toString().slice(1) || 'None'}\``, true);
                }
                if (cmd.clientPermissions) {
                    embed.addField('❯ Bot Permissions required', `\`${(cmd.clientPermissions.map((p) => permissions[p])).map((p) => ` ${p}`).toString().slice(1) || 'None'}\``, true);
                }
                return message.channel.send(embed);
            }
            else {
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`Help Menu`)
                    .setColor("#000000")
                    .setFooter(`${prefix}help [ command ] for further info on that command`)
                    .setThumbnail(message.client.user.displayAvatarURL({
                    dynamic: true,
                    format: 'png',
                }));
                for (const category of this.handler.categories.filter((category) => category.id != 'owner').values()) {
                    embed.addField(`❯ ${functions_1.default.Capitalize(category.id)}`, `${category
                        .filter((comd) => comd.aliases.length > 0)
                        .map((comd) => `\`${comd.aliases[0]}\``)
                        .join(' ')}`);
                }
                return message.channel.send(embed);
            }
        } /*after this it is owner*/
        else {
            //The Fuck i had to make this big shit just to remove that extra space from title
            let title;
            if (cmd.description.usage) {
                title = `\`${cmd.aliases[0]} ${cmd.description.usage}\``;
            }
            else {
                title = `\`${cmd.aliases[0]}\``;
            }
            const embed = new discord_js_1.MessageEmbed()
                .setColor("#000000")
                .setTitle(title)
                .addField('❯ Category', functions_1.default.Capitalize(cmd.category.id) || '\u200b')
                .addField('❯ Description', cmd.description.content || '\u200b')
                .setFooter(`The values within < > are neccessary\nThe values within [ ] are optional`)
                .setThumbnail(message.client.user.displayAvatarURL({
                dynamic: true,
                format: 'png',
            }));
            if (cmd.aliases.length > 1)
                embed.addField('❯ Aliases', `\`${cmd.aliases.join('` `')}\``, true);
            if (cmd.description.examples?.length)
                embed.addField('❯ Examples', `\`${cmd.aliases[0]} ${cmd.description.examples.join(`\`\n\`${cmd.aliases[0]} `)}\``, true);
            if (cmd.cooldown && cmd.cooldown > 0)
                embed.addField('❯ Cooldown', `\`${functions_1.default.cleanTime(cmd.cooldown)}\``);
            if (cmd.userPermissions) {
                embed.addField('❯ User Permissions required', `\`${(cmd.userPermissions.map((p) => permissions[p])).map((p) => ` ${p}`).toString().slice(1) || 'None'}\``, true);
            }
            if (cmd.clientPermissions) {
                embed.addField('❯ Bot Permissions required', `\`${(cmd.clientPermissions.map((p) => permissions[p])).map((p) => ` ${p}`).toString().slice(1) || 'None'}\``, true);
            }
            return message.channel.send(embed);
        }
    }
}
exports.default = Help;
//# sourceMappingURL=help.js.map