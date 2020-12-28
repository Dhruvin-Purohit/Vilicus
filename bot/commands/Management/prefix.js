const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')

module.exports = class extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD'],
            description: {
                content: 'Change the prefix of vilicus for this server',
                usage: '< New prefix >'
            },
            args: [
                {
                    id: "newpre",
                    type: "string",
                    prompt: {
                        start: 'What shall the new prefix be?'
                    }
                }
            ]
        })
    }
    async exec(message, { newpre }) {
        if(newpre === message.guild.db.gdb.prefix) return message.util.send(`${message.author}, you fool, ${newpre} is already the prefix`)

        message.guild.db.gdb.prefix = newpre
        await message.guild.db.gdb.save()
        message.util.send(`The prefix for this server has been updated successfully!\nThe new prefix is ${dmd.code `${newpre}`}.`)

    }
}