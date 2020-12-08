import 'discord-akairo';
import { ListenerHandler } from 'discord-akairo';
import { CommandHandler } from 'discord-akairo';
import { AkairoClient } from 'discord-akairo';
import { ownerIDs, prefix } from './Config'
import { Message } from 'discord.js'

declare module 'discord-akairo' {
    interface AkairoClient {
        cmdHandler: CommandHandler;
        eventHandler: ListenerHandler;
    }
}

interface clientOptions {
    token?: string;
    ownerIDs?: string[];
}

export default class Client extends AkairoClient {
    public config: clientOptions;
    public eventHandler: ListenerHandler = new ListenerHandler(this, {
        directory: './listeners'
    })
    public cmdHandler: CommandHandler = new CommandHandler(this, {
        directory: './commands',
        prefix: prefix,
        ignoreCooldown: ownerIDs,
        ignorePermissions: ownerIDs,
        allowMention: true,
        blockBots: true,
        blockClient: true,
        commandUtil: true,
        argumentDefaults: {
            prompt: {
                modifyStart: (_: Message, str: string): string => `${str}\n\nType \`stop\` to stop the command`,
                retry: `Try again...`,
                timeout: `Alright then Ignore me even i don't have enough free time to keep waiting for you`,
                ended: `You have exceeded the maximum amount of retries...`,
                cancel: `Alright then Stopped the command`,
                cancelWord: 'stop',
                retries: 3,
                time: 3e4
            },
            otherwise: ""
        }
    })

    public constructor (config: clientOptions) {
        super({
            ownerID: ownerIDs,
        })
        this.config = config;
    }

    private async _init(): Promise<void> {
        this.cmdHandler.useListenerHandler(this.eventHandler)
        this.eventHandler.setEmitters({
            cmdHandler: this.cmdHandler,
            eventHandler: this.eventHandler,
            process
        })

        this.cmdHandler.loadAll()

        this.eventHandler.loadAll()
    }

    public async start(): Promise<string> {
        await this._init()
        return this.login(this.config.token)
    }
}