const { Listener } = require('discord-akairo')
const dmd = require('discord-md-tags')

module.exports = class extends Listener {
    constructor() {
        super('guildmemberremove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        })
    }

    async exec(member) {
        
    }
}