const { Command } = require('discord-akairo')
const dmd = require('discord-md-tags')
const emojis = require('../../utils/emojis.json')

module.exports = class Update extends Command {
    constructor() {
        super('update', {
            aliases: ['update'],
            typing: true,
            clientPermissions: ['SEND_MESSAGES'],
            description: {
                content: 'Update the bot'
            },
            ownerOnly: true
        })
    }
    async exec(message) {
    
        let msg = await message.util.send(`${emojis.discord.Analytics} ${dmd.code `Stage 1.`} ${dmd.bold `Update started...`}`)

        msg = await msg.edit(`${emojis.discord.Analytics} ${dmd.code `Stage 2.`} Unloading and Loading all ${dmd.code `Inhibitors`} now`)
        await this.client.InhibitorHandler.removeAll()
        await this.client.InhibitorHandler.loadAll()
        msg = await msg.edit(`${emojis.discord.Analytics} ${dmd.code `Stage 3.`} Unloading and Loading all ${dmd.code `Listeners`} now`)
        await this.client.ListenerHandler.removeAll()
        await this.client.ListenerHandler.loadAll()
        msg = await msg.edit(`${emojis.discord.Analytics} ${dmd.code `Stage 4.`} Unloading and Loading all ${dmd.code `Commands`} now`)
        await this.client.CommandHandler.removeAll()
        await this.client.CommandHandler.loadAll()
        msg = await msg.edit(`${emojis.discord.Analytics} ${dmd.code `Stage 5.(final)`} Reloading ${dmd.code `everything`} now`)
        await this.client.InhibitorHandler.reloadAll()
        await this.client.ListenerHandler.reloadAll()
        await this.client.CommandHandler.reloadAll()
        await msg.edit(`${emojis.discord.Information} ${dmd.code `Done!`} ${dmd.bold `Update Complete`}`)

    }
}