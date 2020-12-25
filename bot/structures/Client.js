const ak = require('discord-akairo')
const config = require('./../config.json')
const bl = require('../data/blacklist.json')
const { User } = require('discord.js')

require('./GuildDB')
require('./Discord.js/Guild')

require('./UserDB')
require('./Discord.js/User')

class VilicusClient extends ak.AkairoClient {
    constructor(Config) {
        super({
            ownerID: config.bot.ownerids
        })
        this.ListenerHandler = new ak.ListenerHandler(this, {
            directory: './listeners'
        })
        this.CommandHandler = new ak.CommandHandler(this, {
            directory: './commands',
            prefix: message => message.guild ? message.guild.db.gdb.prefix : config.bot.prefix,
            allowMention: true,
            blockBots: true,
            blockClient: true,
            commandUtil: true,
            argumentDefaults: {
            prompt: {
                modifyStart: (_, str) => `${str}\n\nType \`stop\` to stop the command.`,
                retry: `Try again...`,
                timeout: `Looks like you decided to Ignore me. I can't wait for you all day long can I?`,
                ended: `You failed too many times, no more trying again now.`,
                cancel: `Okay stopped the command.`,
                cancelWord: 'stop',
                retries: 3,
                time: 3e4
                }
            },
            automateCategories: true
        })
        this.InhibitorHandler = new ak.InhibitorHandler(this, {
            directory: './inhibitors',
            automateCategories: true
        })
        this.Config = Config

        this.token = config.bot.token

        this.bsapi = config.api.bs

        this.cocapi = config.api.coc

        this.crapi = config.api.cr

        this.ghapi = config.api.gh

        this.fn = require('../utils/functions')

        this.basecolor = config.bot.basecolor

        this.blacklist = bl.id

    }

    /**
     * @param {User} user
     */
    isBlacklisted(user) {
        if(this.isOwner(user)) return false
        else if(this.blacklist.includes(user.id)) return true
        else return false
    }

    async _init() {
        this.CommandHandler.useListenerHandler(this.ListenerHandler)
        this.CommandHandler.useInhibitorHandler(this.InhibitorHandler)
        this.ListenerHandler.setEmitters({
            CommandHandler: this.CommandHandler,
            ListenerHandler: this.ListenerHandler,
            InhibitorHandler: this.InhibitorHandler,
            process
        })
        this.CommandHandler.loadAll()
        this.InhibitorHandler.loadAll()
        this.ListenerHandler.loadAll()

    }

    async start() {
        await this._init()
        return this.login(this.token)
    }
}

module.exports = VilicusClient
