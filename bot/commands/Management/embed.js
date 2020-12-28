const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')

module.exports = class extends Command {
    constructor() {
        super('embed', {
            aliases: ['embed', 'generateembed', 'makeembed'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            userPermissions: ['EMBED_LINKS'],
            description: {
                content: 'Generate an embed!',
                usage: '[ Options ]'
            },
            args: [
                {
                    id: 'embedTitle',
                    match: 'option',
                    flag: 'titile='
                },
                {
                    id: 'embedDesc',
                    match: 'option',
                    flag: 'desc='
                },
                {
                    id: 'embedThumb',
                    match: 'option',
                    flag: 'thumb='
                },
                {
                    id: 'embedColor',
                    match: 'option',
                    flag: 'color='
                },
                {
                    id: 'embedImage',
                    match: 'option',
                    flag: 'image='
                },
                {
                    id: 'embedFoot',
                    match: 'option',
                    flag: 'foot='
                }//ToDO: Add support for fields
            ]
        })
    }

    async exec(message, { embedTitle, embedDesc, embedThumb, embedColor, embedImage, embedFoot }) {
        if(!embedTitle && !embedDesc && !embedThumb && !embedColor && !embedImage && !embedFoot) {
            this.client.util.embed()
            .setTitle(`Title`)
            .setDescription(`Description`)
            .setThumbnail(`Random Example Thumbnail link here`)
            .setColor(`#00ff00`)
            .setImage(`Random Image link here`)
            .setFooter(`Footer`)
            let content = `${dmd.bold `Embed Generator`}\nUse options to make embeds!\nTitle: ${dmd.code `title=Title`}\nDescription: ${dmd.code `description=Description`}\nThumbnail: ${dmd.code `thumb=thumbnail_url`}\nColor: ${dmd.code `color=#00ff00`}\nImage: ${dmd.code `image=image_url`}\nFooter: ${dmd.code `title=Footer`}\n\nExample Command: ${this.handler.prefix(message)}embed titile=Title desc=Description thumb=thumbnail_url color=#00ff00 image=image_url footer=Footer\n\nExample Command Result:`

            return message.util.send({
                content: content,
                embed: embed
                })
        } else {
            const embed = this.client.util.embed()
            if(embedTitle) embed.setTitle(embedTitle)
            if(embedDesc) embed.setDescription(embedDesc)
            if(embedColor) embed.setColor(embedColor)
            if(embedThumb) embed.setThumbnail(embedThumb)
            if(embedImage) embed.setImage(embedImage)
            if(embedFoot) embed.setFooter(embedFoot)

            return message.util.send(embed)
        }
    }
}