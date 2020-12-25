const { Listener } = require('discord-akairo')
const fn = require('../../utils/functions')

module.exports = class extends Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        })
    }

    exec() {
        console.log(`${this.client.user?.tag}: Huh?`)
        this.client.user?.setActivity({
            type: fn.choice(['COMPETING',/*'WATCHING',*/'PLAYING'/*,'LISTENING'*/]),
            name: fn.choice(['Clash of clans', 'CLash Royale', 'Brawl Stars'])
        })
    }
}