const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')
const dmd = require('discord-md-tags')

//will do this later for now just leaving it
//https://cdn.starlist.pro/map/Hard-Rock-Mine.png?v=1//use this later (will need a json map but gonna be EZ + no ratelimits so yeah)
/*module.exports*/ = class Map extends Command {
    constructor() {
        super("map", {
            prefix: 'bs',
            aliases: ['map'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES'],
            args: [
                {
                    id: 'map',
                    type: 'string',
                    match: 'restContent'
                }
            ],
            description: {
                content: `Get image of a brawl stars map!\nAdd ${dmd.code `Duo`} at the end in case of Duo Showdown maps\n`,
                usage: '< Map Name >'
            }
        })
    }

    async exec(message, { map }) {
        if(!map) return message.channel.send(`You need to give me a map name smh my head`)
        map = map.toLowerCase()
        const thing = await fetch(`https://raw.githubusercontent.com/Vilicus-Bot/Vilicus/rewrite/assets/bs/maps/${encodeURIComponent(map)}.png`)
        .then(res => res)
        .catch((err) => this.client.emit('error', err))

        if(!thing || thing.status === 404) return message.channel.send(`You need to give me a ${dmd.bold `valid`} map name smh my head`)
        const embed = new MessageEmbed()
        .setTitle(map)
        .setImage(`${thing.url}`)
        .setFooter(`Image Credits: Star List`)
        return message.channel.send(embed)
    }
}