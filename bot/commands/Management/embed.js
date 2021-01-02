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
                    id: 'rawJson',
                    type: 'string'
                },
                {
                    id: 'embedTitle',
                    match: 'option',
                    flag: 'title='
                },
                {
                    id: 'embedDesc',
                    match: 'option',
                    flag: 'desc='
                },
                /*{
                    id: 'embedThumb',
                    match: 'option',
                    flag: 'thumb='
                },*/
                {
                    id: 'embedColor',
                    match: 'option',
                    flag: 'color='
                },
                /*{
                    id: 'embedImage',
                    match: 'option',
                    flag: 'image='
                },*/
                {
                    id: 'embedFoot',
                    match: 'option',
                    flag: 'foot='
                }//ToDO: Add support for fields
            ]
        })
    }

    async exec(message, { rawJson, embedTitle, embedDesc, embedThumb, embedColor, embedImage, embedFoot }) {
        if(!embedTitle && !embedDesc && !embedThumb && !embedColor && !embedImage && !embedFoot && !rawJson) {
            let embed = this.client.util.embed()
            .setTitle(`Title`)
            .setDescription(`Description`)
            //.setThumbnail(`Random Example Thumbnail link here`)
            .setColor(`#00ff00`)
            //.setImage(`Random Image link here`)
            .setFooter(`Footer`)//Thumbnail: ${dmd.code `thumb=thumbnail_url`}\n//Image: ${dmd.code `image=image_url`}\n
            let content = `${dmd.bold `Embed Generator`}\nUse options to make embeds!\nTitle: ${dmd.code `title=Title`}\nDescription: ${dmd.code `description=Description`}\nColor: ${dmd.code `color=#00ff00`}\nFooter: ${dmd.code `foot=Footer`}\n\n${dmd.bold `Tip:`}\nUse ${dmd.code `"`} at the end and start of options to allow whitespaces! (Example: ${dmd.code `desc="Description with spaces"`})\n\n${dmd.bold `Example Command:`} ${dmd.codeblock `${this.handler.prefix(message)}embed titile=Title desc=Description color=#00ff00 foot=Footer`}${dmd.bold `Example Command Result:`}`

            return message.util.send({
                content: content,
                embed: embed
                })
        /*} else if(!embedTitle && !embedDesc && !embedThumb && !embedColor && !embedImage && !embedFoot && rawJson) {//Had to be like this ;-;
            return message.util.send({
                embed: rawJson.toJSON()
            })//I highly doubt this will error//As expected that error'd and had to be commented out for now*/
        } else {
            let embed = this.client.util.embed()
            if(embedTitle) embed.setTitle(embedTitle)
            if(embedDesc) embed.setDescription(embedDesc)
            if(embedColor) embed.setColor(embedColor)
            //if(embedThumb) embed.setThumbnail(embedThumb)
            //if(embedImage) embed.setImage(embedImage)
            if(embedFoot) embed.setFooter(embedFoot)

            return message.util.send(embed)
        }
    }
}