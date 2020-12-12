const { Command } = require('discord-akairo')
const { exec } = require('child_process')
const emojis = require('../../utils/emojis.json')

module.exports = class Exec extends Command{
    constructor() {
        super("exec", {
            aliases: ["exec", "sh", "bash", "execute", "cmd", "powershell"],
            editable: false,
            typing: true,
            category: "owner",
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS"],
            description: {
                content: "Execute stuff directly onto the terminal",
                usage: "< code >",
                examples: [
                    "git pull",
                    "npm i discord-akairo"
                ]
            },
            ownerOnly: true,
            args: [
                {
                    id: "stuff",
                    match: "content",
                    prompt: {
                        start: "What shall i execute?",
                        retry: "Try again...",
                        time: 4.5e4
                    }
                }
            ]
        })
    }

    async exec(message, { stuff }) {

        message.channel.send(`**Input:**\n\`\`\`powershell\n${stuff}\`\`\``)
        exec(stuff, async (e, stdout, stderr) => {
          if (stdout.length + stderr.length > 984) {
                message.channel.send(`Console Log Exceeds 2000 Characters...`)
          } else {
            if (stdout) {
                message.channel.send(`**Output:**\n\`\`\`powershell\n${stdout}\`\`\``)
            }
            if (stderr) {
                message.channel.send(`**Error(s):**\n\`\`\`powershell\n${stderr}\`\`\``)
            }
            if (!stderr && !stdout) {
                message.react(emojis.discord.CheckMark)
            }
          }
          if (e) {
              message.channel.send(`**Error:**\n\`\`\`powershell\n${e}\`\`\``)
          }
          })
        }
        
    }

