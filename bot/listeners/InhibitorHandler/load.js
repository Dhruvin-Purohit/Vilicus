const { Listener } = require('discord-akairo')

module.exports = class InhibitorLoad extends Listener {
    constructor() {
        super("inhibitorload", {
            emitter: "InhibitorHandler",
            event: "load",
            category: "InhibitorHandler"
        })
    }

    exec(inhibitor, isReload) {
        if (!isReload) return console.log(`[ Inhibitor Handler ] - Loaded ${inhibitor}`)
        else return console.log(`[ Inhibitor Handler ] - Reloaded ${inhibitor}`)
    }
}