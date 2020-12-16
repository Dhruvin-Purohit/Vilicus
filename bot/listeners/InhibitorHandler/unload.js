const { Listener } = require('discord-akairo')

module.exports = class InhibitorUnLoad extends Listener {
    constructor() {
        super("inhibitorunload", {
            emitter: "InhibitorHandler",
            event: "remove",
            category: "InhibitorHandler"
        })
    }

    exec(inhibitor) {
        console.log(`[ Inhibitor Handler ] - Unloaded ${inhibitor}`)
    }
}