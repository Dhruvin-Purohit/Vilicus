const { Command } = require('discord-akairo')
const { exec } = require('child_process')
const emojis = require('../../utils/emojis.json')
const dmd = require('discord-md-tags')

module.exports = class Exec extends Command{
    constructor() {
        super("exec", {
            aliases: ["exec", "sh", "bash", "execute", "cmd", "powershell"],
            editable: false,
            typing: true,
            clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "ADD_REACTIONS", 'USE_EXTERNAL_EMOJIS'],
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

        message.util.send(`${dmd.bold `Input:`}\n${dmd.codeblock('powershell') `${stuff}`}`)
        exec(stuff, async (e, stdout, stderr) => {
          if (stdout.length + stderr.length > 984) {
                message.util.send(`Console Log Exceeds 2000 Characters...`)
          } else {
            if (stdout) {
                message.util.send(`${dmd.bold `Output:`}\n${dmd.codeblock('powershell') `${stdout}`}`)
            }
            if (stderr) {
                message.util.send(`${dmd.bold `Error:`}\n${dmd.codeblock('powershell') `${stderr}`}`)
            }
            if (!stderr && !stdout) {
                message.react(emojis.discord.CheckMark)
            }
          }
          if (e) {
              message.util.send(`${dmd.bold `Error:`}\n${dmd.codeblock('powershell') `${e}`}`)//diff than stderr
          }
          })
        }
        
    }

