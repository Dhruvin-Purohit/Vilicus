const { Inhibitor } = require('discord-akairo')

module.exports = class Blacklist extends Inhibitor {
    constructor() {
        super('blacklist', {
            type: 'post',//run only on commands so still will trigger ghost pings and all
            reason: `${message.author.tag} is blacklisted`,
            priority: 7//highest, i plan to keep 7 priorities for now
        })
    }
    exec(message) {
        if(this.client.isOwner(message.author)) return false
        else if(this.client.blacklist.inculdes(message.author.id)) return true
        else return false
    }
}