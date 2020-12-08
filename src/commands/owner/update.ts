import 'discord-akairo'
import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { exec } from "child_process"
import 'util'

export default class Update extends Command{
    public constructor() {
        super("update", {
            aliases: ["update"],
            editable: false,
            typing: true,
            ownerOnly: true,
            category: "owner",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS"],
            description: {
                content: "Basically Update the bot"
            }
        })
    }

    public async exec(message: Message){

        //Most of this code is await spam

        /**
         * Will Use this commented out part when bot is hosted, not needed atm
         */
        /*await exec("git pull", async (e, stdout, stderr) => {
            message.channel.send(`**Input:**\n\`\`\`powershell\ngit pull\`\`\``)
            if (stdout.length + stderr.length > 984) {
                  message.channel.send(`Console Log Exceeds 2000 Characters...`)
            } else {
              if (stdout) {
                  message.channel.send(`**Output:**\n\`\`\`powershell\n${stdout}\`\`\``)
              }
              if (stderr) {
                  message.channel.send(`**Error(s):\n\`\`\`powershell\n${stderr}\`\`\``)
              }
              if (!stderr && !stdout) {
                  message.react("✔️")
              }
            }
            if (e) {
                message.channel.send(`**Error:**\n\`\`\`\n${e}\`\`\``)
            } 
        })*/

    
            exec("tsc", async (e, stdout, stderr) => {

            await message.channel.send(`Compiling TypeScript...`)
            if (stdout.length + stderr.length > 984) {
                  await message.channel.send(`Console Log Exceeds 2000 Characters...`)
            } else {
              if (stdout) {
                  await message.channel.send(`**Output:**\n\`\`\`powershell\n${stdout}\`\`\``)
              }
              if (stderr) {
                  await message.channel.send(`**Error(s):\n\`\`\`powershell\n${stderr}\`\`\``)
              }
              if (!stderr && !stdout) {
                  await message.channel.send(`No **Output** or **Error** moving ahead...`)
              }
            }
            if (e) {
                await message.channel.send(`**Error:**\n\`\`\`\n${e}\`\`\``)
            }
                message.channel.send(`TypeScript Copilation complete going ahead now...`)
                await this.client.cmdHandler.removeAll()
                await this.client.cmdHandler.loadAll()
                await message.channel.send(`All \`Commands\` unloaded and loaded, loading \`Listeners\` now...`)

                await this.client.eventHandler.removeAll()
                await this.client.eventHandler.loadAll()
                await message.channel.send(`All \`Listeners\` unloaded and loaded, \`Reloading everything\` now...`)

                await this.client.cmdHandler.reloadAll()
                await this.client.eventHandler.reloadAll()
                await message.channel.send(`\`Update\` Complete 👍🏻`)
            })


        
    }
}