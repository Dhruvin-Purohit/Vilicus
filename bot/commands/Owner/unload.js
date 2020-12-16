const { Command, Argument } = require('discord-akairo')
const dmd = require('discord-md-tags')
const emojis = require('../../utils/emojis.json')

module.exports = class Unload extends Command {
    constructor() {
        super('unload', {
            aliases: ['unload'],
            ownerOnly: true,
            typing: true,
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS'],
            description: {
                content: 'Unload a command or a listener',
                usage: '< Command | Listener | Inhibitor >'
            },
            args: [
                {
                    id: 'things',
                    type: Argument.union('command', 'listener', 'inhibitor'),
                    prompt: {
                        start: 'What do i unload',
                        time: 4.5e4
                    }
                }
            ]
        })
    }
    async exec(message, { things }) {
        try{
            await things.remove()
            message.react(emojis.discord.CheckMark)
        }
        catch(err){
            const embed = new MessageEmbed()
            .addField(`Error Unloading ${stuff.id}`, dmd.codeblock('powershell') `${err}`)
            await message.channel.send(embed)
        }
    }
}