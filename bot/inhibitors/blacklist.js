/*const { Inhibitor } = require('discord-akairo')

module.exports = class Blacklist extends Inhibitor {
    constructor() {
        super('blacklist', {
            type: 'post',//run only on commands so still will trigger ghost pings and all
            reason: 'blacklisted',
            priority: 7//highest, i plan to keep 7 priorities for now
        })
    }
    exec(message) {
        if(this.client.isBlacklisted(message.author)) return false
        else return true
    }
}*/