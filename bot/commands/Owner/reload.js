const { Command, Argument } = require('discord-akairo')
const dmd = require('discord-md-tags')
const emojis = require('../../utils/emojis.json')

module.exports = class Reload extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            ownerOnly: true,
            clientPermissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS'],
            description: {
                content: 'Reload a command or a listener',
                usage: '< Command | Listener | Inhibitor >'
            },
            args: [
                {
                    id: 'things',
                    type: Argument.union('command', 'listener', 'inhibitor'),
                    prompt: {
                        start: 'What do i reload',
                        time: 4.5e4
                    }
                }
            ]
        })
    }
    async exec(message, { things }) {
        try{
            await things.reload()
            message.react(emojis.discord.CheckMark)
        }
        catch(err){
            const embed = new MessageEmbed()
            .addField(`Error Reloading ${stuff.id}`, dmd.codeblock('powershell') `${err}`)
            await message.util.send(embed)
        }
    }
}